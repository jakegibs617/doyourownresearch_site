import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import vm from "node:vm";

const root = resolve(import.meta.dirname, "..");
const [reportsSource, narrationSource] = await Promise.all([
  readFile(resolve(root, "assets/data/reports.js"), "utf8"),
  readFile(resolve(root, "assets/js/narration-content.js"), "utf8")
]);
const sandbox = { window: {} };
vm.createContext(sandbox);
new vm.Script(narrationSource).runInContext(sandbox);
new vm.Script(reportsSource).runInContext(sandbox);

test("every report produces stable, unique narration segments", () => {
  for (const report of sandbox.window.DYOR_REPORTS) {
    const segments = [...sandbox.window.DYOR_NARRATION_CONTENT.segmentsForReport(report)];
    assert.ok(segments.length > 20, `${report.slug} has a complete narration`);
    assert.equal(new Set(segments.map((segment) => segment.id)).size, segments.length, `${report.slug} uses unique IDs`);
    assert.ok(segments.every((segment) => segment.text.trim() === segment.text && !/\s{2,}/.test(segment.text)));
    assert.equal(segments[0].id, "hero:title");
    assert.equal(segments.at(-1).id, `sources:item:${report.sources.length - 1}`);
  }
});

test("visual narration includes the figure type and its report data", () => {
  const text = sandbox.window.DYOR_NARRATION_CONTENT.visualText({
    type: "probe",
    condition: "A condition",
    outcomes: [{ label: "Would survive", tone: "signal" }]
  }, "03");

  assert.match(text, /^Figure 03\. probe\./);
  assert.match(text, /A condition/);
  assert.match(text, /Would survive/);
  assert.doesNotMatch(text, /signal/);
});
