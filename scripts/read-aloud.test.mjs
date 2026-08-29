import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import vm from "node:vm";

const source = await readFile(resolve(import.meta.dirname, "../assets/js/read-aloud.js"), "utf8");

function loadApi() {
  const listeners = new Map();
  const timers = [];
  const window = {
    document: { documentElement: { lang: "en" } },
    addEventListener(type, listener) { listeners.set(type, listener); },
    removeEventListener(type, listener) {
      if (listeners.get(type) === listener) listeners.delete(type);
    },
    setInterval(callback, delay) {
      timers.push({ callback, delay, cleared: false });
      return timers.length;
    },
    clearInterval(handle) {
      const timer = timers[handle - 1];
      if (timer) timer.cleared = true;
    },
    // Drive every live timer callback n times, standing in for elapsed wall clock.
    tick(times = 1) {
      for (let round = 0; round < times; round += 1) {
        timers.filter((timer) => !timer.cleared).forEach((timer) => timer.callback());
      }
    },
    timers
  };
  const context = vm.createContext({ console, window });
  new vm.Script(source, { filename: "assets/js/read-aloud.js" }).runInContext(context);
  return { api: window.DYOR_READ_ALOUD, listeners, window };
}

function textNode(value) {
  return { nodeType: 3, nodeValue: value };
}

function element(children = [], options = {}) {
  const classes = new Set();
  return {
    nodeType: 1,
    childNodes: children,
    dataset: options.dataset || {},
    hidden: options.hidden || false,
    scrolledIntoView: [],
    scrollIntoView(config) { this.scrolledIntoView.push(config); },
    classList: {
      add(value) { classes.add(value); },
      remove(value) { classes.delete(value); },
      contains(value) { return classes.has(value); }
    },
    matches(selector) {
      return (options.speechSkip && selector.includes("data-speech-skip")) ||
        (options.ariaHidden && selector.includes("aria-hidden='true'"));
    }
  };
}

class FakeControl {
  constructor() {
    this.hidden = false;
    this.dataset = {};
    this.textContent = "";
    this.attributes = new Map();
    this.listeners = new Map();
  }

  setAttribute(name, value) { this.attributes.set(name, value); }
  addEventListener(type, listener) { this.listeners.set(type, listener); }
  removeEventListener(type, listener) {
    if (this.listeners.get(type) === listener) this.listeners.delete(type);
  }
  click() { this.listeners.get("click")?.(); }
}

function controlsFixture() {
  const controls = new FakeControl();
  controls.hidden = true;
  const toggle = new FakeControl();
  const stop = new FakeControl();
  stop.hidden = true;
  const label = new FakeControl();
  const icon = new FakeControl();
  const status = new FakeControl();
  const nodes = new Map([
    ["[data-read-aloud-toggle]", toggle],
    ["[data-read-aloud-stop]", stop],
    ["[data-read-aloud-label]", label],
    ["[data-read-aloud-icon]", icon],
    ["[data-read-aloud-status]", status]
  ]);
  controls.querySelector = (selector) => nodes.get(selector) || null;
  return { controls, icon, label, status, stop, toggle };
}

class FakeUtterance {
  constructor(text) {
    this.text = text;
    this.lang = "";
  }
}

class FakeSynth {
  constructor(voices = []) {
    this.cancelCalls = 0;
    this.pauseCalls = 0;
    this.paused = false;
    this.resumeCalls = 0;
    this.spoken = [];
    this.current = null;
    this.voices = voices;
    this.pending = false;
  }

  get speaking() { return this.current !== null; }

  getVoices() { return this.voices; }

  // Chrome's failure mode: the engine goes silent without firing onend or onerror,
  // so a queue chained on those callbacks stalls forever.
  goSilentWithoutNotifying() { this.current = null; }

  speak(utterance) {
    this.spoken.push(utterance.text);
    this.current = utterance;
    utterance.onstart?.();
  }

  cancel() {
    this.cancelCalls += 1;
    this.current = null;
  }

  pause() {
    this.pauseCalls += 1;
    this.paused = true;
  }

  resume() {
    this.resumeCalls += 1;
    this.paused = false;
  }

  finishCurrent() {
    const utterance = this.current;
    this.current = null;
    utterance?.onend?.();
  }
}

test("splitText preserves words while limiting utterance size", () => {
  const { api } = loadApi();
  const input = "First sentence is deliberately short. Second sentence has enough words to require another speech chunk without losing any content.";
  const chunks = [...api.splitText(input, 48)];

  assert.ok(chunks.length > 1);
  assert.ok(chunks.every((chunk) => chunk.length <= 48));
  assert.equal(chunks.join(" "), input);
});

test("collectSegments skips digests and decorative content", () => {
  const { api } = loadApi();
  const segment = element([
    textNode("Source one"),
    element([textNode("0123456789abcdef")], { speechSkip: true }),
    element([textNode("arrow")], { ariaHidden: true }),
    textNode("Source note")
  ]);
  const root = { querySelectorAll: () => [segment] };

  assert.deepEqual(
    [...api.collectSegments(root)].map((item) => item.text),
    ["Source one Source note"]
  );
});

test("selectPreferredVoice chooses a British woman's voice instead of the first UK voice", () => {
  const { api } = loadApi();
  const voices = [
    { name: "Daniel", lang: "en-GB" },
    { name: "Samantha", lang: "en-US" },
    { name: "Flo (English (UK))", lang: "en_GB" },
    { name: "Shelley (English (UK))", lang: "en-GB" }
  ];

  assert.equal(api.selectPreferredVoice(voices), voices[2]);
  assert.equal(api.selectPreferredVoice([{ name: "Daniel", lang: "en-GB" }]), null);
});

test("utterances use the preferred British English voice", () => {
  const { api, window } = loadApi();
  const fixture = controlsFixture();
  const root = { querySelectorAll: () => [element([textNode("Read this.")])] };
  const voice = { name: "Flo (English (UK))", lang: "en-GB" };
  const synth = new FakeSynth([voice]);
  const controller = api.init({ root, controls: fixture.controls, host: window, synth, Utterance: FakeUtterance });

  controller.start();

  assert.equal(synth.current.voice, voice);
  assert.equal(synth.current.lang, "en-GB");
  assert.equal(fixture.status.textContent, "Reading the report aloud with Flo (English (UK)).");
});

test("controller starts, pauses, resumes, stops, and finishes cleanly", () => {
  const { api, listeners, window } = loadApi();
  const fixture = controlsFixture();
  const speechElement = element([textNode("A report sentence.")]);
  const root = { querySelectorAll: () => [speechElement] };
  const synth = new FakeSynth();
  const controller = api.init({
    root,
    controls: fixture.controls,
    host: window,
    synth,
    Utterance: FakeUtterance
  });

  assert.ok(controller);
  assert.equal(fixture.controls.hidden, false);
  assert.equal(fixture.label.textContent, "Read aloud");

  fixture.toggle.click();
  assert.equal(controller.state, "speaking");
  assert.equal(fixture.label.textContent, "Pause");
  assert.equal(fixture.stop.hidden, false);
  assert.deepEqual(synth.spoken, ["A report sentence."]);
  assert.equal(speechElement.classList.contains("is-being-read"), true);

  fixture.toggle.click();
  assert.equal(controller.state, "paused");
  assert.equal(fixture.label.textContent, "Resume");
  assert.equal(synth.pauseCalls, 1);

  fixture.toggle.click();
  assert.equal(controller.state, "speaking");
  assert.equal(synth.resumeCalls, 1);

  fixture.stop.click();
  assert.equal(controller.state, "idle");
  assert.equal(fixture.stop.hidden, true);
  assert.equal(speechElement.classList.contains("is-being-read"), false);
  assert.equal(fixture.status.textContent, "Report narration stopped.");

  fixture.toggle.click();
  synth.finishCurrent();
  assert.equal(controller.state, "idle");
  assert.equal(fixture.status.textContent, "Finished reading the report.");

  fixture.toggle.click();
  listeners.get("pagehide")?.();
  assert.equal(controller.state, "idle");
  assert.equal(fixture.status.textContent, "");
});

test("controller resets after a real synthesis error", () => {
  const { api, window } = loadApi();
  const fixture = controlsFixture();
  const root = { querySelectorAll: () => [element([textNode("Read this.")])] };
  const synth = new FakeSynth();
  const controller = api.init({ root, controls: fixture.controls, host: window, synth, Utterance: FakeUtterance });

  controller.start();
  synth.current.onerror({ error: "synthesis-failed" });

  assert.equal(controller.state, "idle");
  assert.equal(fixture.status.textContent, "This browser could not continue reading the report.");
});

test("controller resets when the active utterance is canceled externally", () => {
  const { api, window } = loadApi();
  const fixture = controlsFixture();
  const root = { querySelectorAll: () => [element([textNode("Read this.")])] };
  const synth = new FakeSynth();
  const controller = api.init({ root, controls: fixture.controls, host: window, synth, Utterance: FakeUtterance });

  controller.start();
  synth.current.onerror({ error: "canceled" });

  assert.equal(controller.state, "idle");
  assert.equal(fixture.status.textContent, "Report narration stopped.");
});

test("narration scrolls each segment into view so the reader can see what is being read", () => {
  const { api, window } = loadApi();
  const fixture = controlsFixture();
  const first = element([textNode("The short answer.")]);
  const second = element([textNode("A chapter paragraph.")]);
  const root = { querySelectorAll: () => [first, second] };
  const synth = new FakeSynth();
  const controller = api.init({ root, controls: fixture.controls, host: window, synth, Utterance: FakeUtterance });

  // The config object is built inside the VM context, so compare fields rather than identity.
  const scrolls = (node) => node.scrolledIntoView.map((config) => `${config.block}/${config.behavior}`);

  controller.start();
  assert.deepEqual(scrolls(first), ["center/smooth"]);
  assert.deepEqual(scrolls(second), []);

  synth.finishCurrent();
  assert.deepEqual(scrolls(second), ["center/smooth"]);
});

test("scrolling away stops the page following the narration until it is restarted", () => {
  const { api, listeners, window } = loadApi();
  const fixture = controlsFixture();
  const first = element([textNode("One.")]);
  const second = element([textNode("Two.")]);
  const root = { querySelectorAll: () => [first, second] };
  const synth = new FakeSynth();
  const controller = api.init({ root, controls: fixture.controls, host: window, synth, Utterance: FakeUtterance });

  controller.start();
  listeners.get("wheel")?.();
  synth.finishCurrent();

  assert.deepEqual(second.scrolledIntoView, [], "reader took control of the viewport");
  assert.equal(second.classList.contains("is-being-read"), true, "narration still tracks the segment");

  controller.stop();
  controller.start();
  assert.deepEqual(first.scrolledIntoView.length, 2, "restarting hands following back to the narration");
});

test("a queue that dies without firing onend is resumed by the watchdog", () => {
  const { api, window } = loadApi();
  const fixture = controlsFixture();
  const root = { querySelectorAll: () => [element([textNode("One.")]), element([textNode("Two.")])] };
  const synth = new FakeSynth();
  const controller = api.init({ root, controls: fixture.controls, host: window, synth, Utterance: FakeUtterance });

  controller.start();
  assert.deepEqual(synth.spoken, ["One."]);

  synth.goSilentWithoutNotifying();
  window.tick(1);
  assert.deepEqual(synth.spoken, ["One."], "one quiet check is not yet a stall");

  window.tick(1);
  assert.equal(controller.state, "speaking", "the watchdog keeps the session alive");
  assert.deepEqual(synth.spoken, ["One.", "One."], "the unfinished segment is spoken again");
});

test("the watchdog leaves paused and idle sessions alone", () => {
  const { api, window } = loadApi();
  const fixture = controlsFixture();
  const root = { querySelectorAll: () => [element([textNode("One.")])] };
  const synth = new FakeSynth();
  const controller = api.init({ root, controls: fixture.controls, host: window, synth, Utterance: FakeUtterance });

  window.tick(4);
  assert.deepEqual(synth.spoken, [], "an idle control never speaks on its own");

  controller.start();
  controller.pause();
  synth.goSilentWithoutNotifying();
  window.tick(4);
  assert.equal(controller.state, "paused");
  assert.deepEqual(synth.spoken, ["One."], "a paused session is not restarted");
});

test("destroying the controller clears the watchdog", () => {
  const { api, window } = loadApi();
  const fixture = controlsFixture();
  const root = { querySelectorAll: () => [element([textNode("One.")])] };
  const synth = new FakeSynth();
  const controller = api.init({ root, controls: fixture.controls, host: window, synth, Utterance: FakeUtterance });

  controller.destroy();
  assert.ok(window.timers.every((timer) => timer.cleared));
});

test("a browser that blocks narration says so and stays retryable", () => {
  const { api, window } = loadApi();
  const fixture = controlsFixture();
  const root = { querySelectorAll: () => [element([textNode("Read this.")])] };
  const synth = new FakeSynth();
  const controller = api.init({ root, controls: fixture.controls, host: window, synth, Utterance: FakeUtterance });

  controller.start();
  synth.current.onerror({ error: "not-allowed" });

  assert.equal(controller.state, "idle");
  assert.equal(fixture.status.textContent, "Your browser blocked narration. Press Read aloud again to allow it.");

  fixture.toggle.click();
  assert.equal(controller.state, "speaking", "the control still works on a second press");
});

test("unsupported speech synthesis leaves the progressive control hidden", () => {
  const { api, window } = loadApi();
  const fixture = controlsFixture();
  const root = { querySelectorAll: () => [] };

  assert.equal(api.init({ root, controls: fixture.controls, host: window }), null);
  assert.equal(fixture.controls.hidden, true);
});
