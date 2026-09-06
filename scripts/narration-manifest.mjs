import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import vm from "node:vm";

const root = resolve(import.meta.dirname, "..");
const args = process.argv.slice(2);
const slug = args.find((argument) => !argument.startsWith("--"));
const outputIndex = args.indexOf("--output");
const outputPath = outputIndex >= 0 ? args[outputIndex + 1] : "";

if (!slug || (outputIndex >= 0 && !outputPath)) {
  console.error("Usage: node scripts/narration-manifest.mjs <report-slug> [--output <manifest.json>]");
  process.exit(1);
}

const [reportsSource, narrationSource] = await Promise.all([
  readFile(resolve(root, "assets/data/reports.js"), "utf8"),
  readFile(resolve(root, "assets/js/narration-content.js"), "utf8")
]);

const sandbox = { window: {} };
vm.createContext(sandbox);
new vm.Script(narrationSource, { filename: "assets/js/narration-content.js" }).runInContext(sandbox);
new vm.Script(reportsSource, { filename: "assets/data/reports.js" }).runInContext(sandbox);

const report = sandbox.window.DYOR_REPORTS?.find((candidate) => candidate.slug === slug);
if (!report) {
  console.error(`Unknown report slug: ${slug}`);
  process.exit(1);
}

const segments = sandbox.window.DYOR_NARRATION_CONTENT.segmentsForReport(report);
const ids = new Set(segments.map((segment) => segment.id));
if (ids.size !== segments.length) {
  console.error(`Narration segment IDs are not unique for ${slug}`);
  process.exit(1);
}

const fingerprint = createHash("sha256").update(JSON.stringify(segments)).digest("hex");
const payload = {
  schemaVersion: 1,
  report: slug,
  title: report.title,
  voice: "Michael",
  voiceModel: "kokoro-am_michael",
  language: "en-US",
  fingerprint,
  segments
};
const json = `${JSON.stringify(payload, null, 2)}\n`;

if (outputPath) {
  await writeFile(resolve(outputPath), json, "utf8");
  console.log(`Narration manifest: ${segments.length} segments for ${slug}`);
} else {
  process.stdout.write(json);
}
