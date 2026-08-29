(function () {
  "use strict";

  const DEFAULT_MAX_CHARS = 260;
  const CANCELLATION_ERRORS = new Set(["canceled", "interrupted"]);
  const BRITISH_WOMEN = [
    "flo",
    "serena",
    "kate",
    "sonia",
    "libby",
    "google uk english female",
    "sandy",
    "shelley",
    "martha",
    "hazel",
    "susan",
    "fiona"
  ];

  function normalizeText(value) {
    return String(value ?? "").replace(/\s+/g, " ").trim();
  }

  function splitLongPart(value, maxChars) {
    const words = normalizeText(value).split(" ").filter(Boolean);
    const chunks = [];
    let current = "";

    words.forEach((word) => {
      if (word.length > maxChars) {
        if (current) chunks.push(current);
        for (let index = 0; index < word.length; index += maxChars) {
          chunks.push(word.slice(index, index + maxChars));
        }
        current = "";
        return;
      }

      const candidate = current ? `${current} ${word}` : word;
      if (candidate.length > maxChars && current) {
        chunks.push(current);
        current = word;
      } else {
        current = candidate;
      }
    });

    if (current) chunks.push(current);
    return chunks;
  }

  function splitText(value, maxChars = DEFAULT_MAX_CHARS) {
    const text = normalizeText(value);
    if (!text) return [];
    if (text.length <= maxChars) return [text];

    const sentences = text.match(/[^.!?]+(?:[.!?]+["')\]]*|$)/g)?.map(normalizeText).filter(Boolean) || [text];
    const chunks = [];
    let current = "";

    const pushPart = (part) => {
      if (part.length > maxChars) {
        if (current) {
          chunks.push(current);
          current = "";
        }
        chunks.push(...splitLongPart(part, maxChars));
        return;
      }

      const candidate = current ? `${current} ${part}` : part;
      if (candidate.length > maxChars && current) {
        chunks.push(current);
        current = part;
      } else {
        current = candidate;
      }
    };

    sentences.forEach(pushPart);
    if (current) chunks.push(current);
    return chunks;
  }

  function extractText(element) {
    const explicit = normalizeText(element?.dataset?.speechText);
    if (explicit) return explicit;

    const parts = [];
    const visit = (node) => {
      if (!node) return;
      if (node.nodeType === 3) {
        const text = normalizeText(node.nodeValue);
        if (text) parts.push(text);
        return;
      }
      if (node.nodeType !== 1) return;
      if (node.hidden || node.matches?.("[data-speech-skip], [aria-hidden='true']")) return;
      [...(node.childNodes || [])].forEach(visit);
    };

    visit(element);
    return normalizeText(parts.join(" "));
  }

  function collectSegments(root, maxChars = DEFAULT_MAX_CHARS) {
    if (!root?.querySelectorAll) return [];
    return [...root.querySelectorAll("[data-speech-segment]")].flatMap((element) =>
      splitText(extractText(element), maxChars).map((text) => ({ element, text }))
    );
  }

  function selectPreferredVoice(voices) {
    const britishVoices = [...(voices || [])].filter((voice) =>
      String(voice?.lang || "").toLowerCase().replace("_", "-").startsWith("en-gb")
    );

    for (const preferredName of BRITISH_WOMEN) {
      const voice = britishVoices.find((candidate) =>
        String(candidate?.name || "").toLowerCase().includes(preferredName)
      );
      if (voice) return voice;
    }

    return britishVoices.find((voice) => /female|woman/i.test(String(voice?.name || ""))) || null;
  }

  function init(options = {}) {
    const root = options.root;
    const controls = options.controls;
    const host = options.host || window;
    const synth = options.synth || host.speechSynthesis;
    const Utterance = options.Utterance || host.SpeechSynthesisUtterance;

    if (!root || !controls || !synth || typeof synth.speak !== "function" || typeof Utterance !== "function") {
      return null;
    }

    const toggle = controls.querySelector("[data-read-aloud-toggle]");
    const stopButton = controls.querySelector("[data-read-aloud-stop]");
    const label = controls.querySelector("[data-read-aloud-label]");
    const icon = controls.querySelector("[data-read-aloud-icon]");
    const status = controls.querySelector("[data-read-aloud-status]");
    if (!toggle || !stopButton || !label || !icon || !status) return null;

    let state = "idle";
    let queue = [];
    let queueIndex = 0;
    let generation = 0;
    let activeElement = null;
    let destroyed = false;
    let preferredVoice = null;

    const updatePreferredVoice = () => {
      preferredVoice = selectPreferredVoice(synth.getVoices?.() || []);
      return preferredVoice;
    };

    const setStatus = (message) => {
      status.textContent = message;
    };

    const renderState = () => {
      controls.dataset.state = state;
      stopButton.hidden = state === "idle";
      toggle.setAttribute("aria-label", state === "speaking" ? "Pause report narration" : state === "paused" ? "Resume report narration" : "Read report aloud");

      if (state === "speaking") {
        label.textContent = "Pause";
        icon.textContent = "Ⅱ";
      } else if (state === "paused") {
        label.textContent = "Resume";
        icon.textContent = "▶";
      } else {
        label.textContent = "Read aloud";
        icon.textContent = "▶";
      }
    };

    const setActiveElement = (element) => {
      if (activeElement === element) return;
      activeElement?.classList?.remove("is-being-read");
      activeElement = element || null;
      activeElement?.classList?.add("is-being-read");
    };

    const returnToIdle = (message) => {
      state = "idle";
      queue = [];
      queueIndex = 0;
      setActiveElement(null);
      renderState();
      setStatus(message);
    };

    const speakNext = (runGeneration) => {
      if (destroyed || runGeneration !== generation) return;
      if (queueIndex >= queue.length) {
        returnToIdle("Finished reading the report.");
        return;
      }

      const item = queue[queueIndex];
      const utterance = new Utterance(item.text);
      const voice = updatePreferredVoice();
      if (voice) utterance.voice = voice;
      utterance.lang = voice?.lang || options.language || "en-GB";

      utterance.onstart = () => {
        if (runGeneration === generation) setActiveElement(item.element);
      };
      utterance.onend = () => {
        if (runGeneration !== generation) return;
        queueIndex += 1;
        speakNext(runGeneration);
      };
      utterance.onerror = (event) => {
        if (runGeneration !== generation) return;
        generation += 1;
        returnToIdle(CANCELLATION_ERRORS.has(event?.error)
          ? "Report narration stopped."
          : "This browser could not continue reading the report.");
      };

      synth.speak(utterance);
    };

    const start = () => {
      queue = collectSegments(root, options.maxChars || DEFAULT_MAX_CHARS);
      if (queue.length === 0) {
        setStatus("No report text is available to read.");
        return;
      }

      generation += 1;
      queueIndex = 0;
      synth.cancel();
      if (synth.paused) synth.resume();
      state = "speaking";
      renderState();
      const voice = updatePreferredVoice();
      setStatus(voice ? `Reading the report aloud with ${voice.name}.` : "Reading the report aloud in British English.");
      speakNext(generation);
    };

    const pause = () => {
      synth.pause();
      state = "paused";
      renderState();
      setStatus("Report narration paused.");
    };

    const resume = () => {
      synth.resume();
      state = "speaking";
      renderState();
      setStatus(preferredVoice ? `Reading the report aloud with ${preferredVoice.name}.` : "Reading the report aloud in British English.");
    };

    const stop = (message = "Report narration stopped.") => {
      generation += 1;
      synth.cancel();
      if (synth.paused) synth.resume();
      returnToIdle(message);
    };

    const onToggle = () => {
      if (state === "speaking") pause();
      else if (state === "paused") resume();
      else start();
    };
    const onStop = () => stop();
    const onPageHide = () => stop("");

    toggle.addEventListener("click", onToggle);
    stopButton.addEventListener("click", onStop);
    host.addEventListener?.("pagehide", onPageHide);
    synth.addEventListener?.("voiceschanged", updatePreferredVoice);
    updatePreferredVoice();
    controls.hidden = false;
    renderState();

    return {
      get state() { return state; },
      start,
      pause,
      resume,
      stop,
      destroy() {
        if (destroyed) return;
        destroyed = true;
        stop("");
        toggle.removeEventListener?.("click", onToggle);
        stopButton.removeEventListener?.("click", onStop);
        host.removeEventListener?.("pagehide", onPageHide);
        synth.removeEventListener?.("voiceschanged", updatePreferredVoice);
      }
    };
  }

  window.DYOR_READ_ALOUD = Object.freeze({
    collectSegments,
    extractText,
    init,
    normalizeText,
    selectPreferredVoice,
    splitText
  });
})();
