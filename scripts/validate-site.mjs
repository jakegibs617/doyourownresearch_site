import { readFile, access } from "node:fs/promises";
import { constants } from "node:fs";
import { resolve, dirname } from "node:path";
import vm from "node:vm";

const root = resolve(import.meta.dirname, "..");
const failures = [];
const checks = [];

function pass(message) {
  checks.push(message);
}

function fail(message) {
  failures.push(message);
}

async function exists(path) {
  try {
    await access(resolve(root, path), constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

async function requireFiles() {
  const required = [
    "index.html",
    "report.html",
    "404.html",
    "CNAME",
    ".nojekyll",
    "robots.txt",
    "sitemap.xml",
    "assets/css/site.css",
    "assets/data/reports.js",
    "assets/js/site.js",
    "assets/js/report.js",
    "assets/img/favicon.svg",
    "assets/img/social-preview.png",
    ".github/workflows/pages.yml"
  ];

  const results = await Promise.all(required.map(async (path) => [path, await exists(path)]));
  results.forEach(([path, present]) => present ? pass(`required file: ${path}`) : fail(`missing required file: ${path}`));
}

async function loadPublicationData() {
  const source = await readFile(resolve(root, "assets/data/reports.js"), "utf8");
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  try {
    vm.runInContext(source, sandbox, { filename: "assets/data/reports.js", timeout: 1000 });
  } catch (error) {
    fail(`report data does not execute: ${error.message}`);
    return { site: null, reports: [] };
  }

  const site = sandbox.window.DYOR_SITE;
  const reports = sandbox.window.DYOR_REPORTS;
  if (!site || typeof site !== "object") fail("window.DYOR_SITE must be an object");
  if (!Array.isArray(reports)) {
    fail("window.DYOR_REPORTS must be an array");
    return { site, reports: [] };
  }
  pass(`publication data: ${reports.length} entr${reports.length === 1 ? "y" : "ies"}`);
  return { site, reports };
}

function nonEmpty(value) {
  return typeof value === "string" && value.trim().length > 0;
}

async function supportedVisualTypes() {
  const source = await readFile(resolve(root, "assets/js/report.js"), "utf8");
  const types = new Set([...source.matchAll(/visual\.type === "([a-z-]+)"/g)].map((match) => match[1]));
  if (types.size === 0) fail("could not determine supported visual types from assets/js/report.js");
  else pass(`renderer supports ${types.size} visual types`);
  return types;
}

function validateReports(site, reports, visualTypes) {
  const kinds = new Set(["report", "method-note", "field-note"]);
  const statuses = new Set(["draft", "published", "archived"]);
  const slugs = new Set();
  let featured = 0;

  if (!site?.domain || site.domain !== "doyourownresearch.me") fail("site domain must be doyourownresearch.me");
  if (!Array.isArray(site?.methodSteps) || site.methodSteps.length < 4) fail("site methodSteps must contain at least four steps");

  for (const [index, report] of reports.entries()) {
    const at = `report[${index}]`;
    const requiredStrings = ["slug", "kind", "label", "issue", "status", "publishedAt", "updatedAt", "title", "deck", "question", "answer", "disclosure"];
    requiredStrings.forEach((field) => {
      if (!nonEmpty(report[field])) fail(`${at}.${field} must be a non-empty string`);
    });

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(report.slug || "")) fail(`${at}.slug must be URL-safe kebab-case`);
    if (slugs.has(report.slug)) fail(`duplicate report slug: ${report.slug}`);
    slugs.add(report.slug);
    if (!kinds.has(report.kind)) fail(`${at}.kind must be one of ${[...kinds].join(", ")}`);
    if (!statuses.has(report.status)) fail(`${at}.status must be one of ${[...statuses].join(", ")}`);
    if (report.kind === "report" && !nonEmpty(report.runId)) fail(`${at}.runId is required for empirical reports`);
    if (report.kind !== "report" && report.runId != null) fail(`${at}.runId must be null for non-report editorial notes`);
    if (!Number.isInteger(report.readMinutes) || report.readMinutes < 1) fail(`${at}.readMinutes must be a positive integer`);
    if (report.featured) featured += 1;

    ["stats", "chapters", "principles", "limitations", "sources"].forEach((field) => {
      if (!Array.isArray(report[field]) || report[field].length === 0) fail(`${at}.${field} must be a non-empty array`);
    });

    const chapterIds = new Set();
    for (const [chapterIndex, chapter] of (report.chapters || []).entries()) {
      const chapterAt = `${at}.chapters[${chapterIndex}]`;
      ["id", "number", "eyebrow", "title", "lead"].forEach((field) => {
        if (!nonEmpty(chapter[field])) fail(`${chapterAt}.${field} must be a non-empty string`);
      });
      if (chapterIds.has(chapter.id)) fail(`${at} has duplicate chapter id: ${chapter.id}`);
      chapterIds.add(chapter.id);
      if (!Array.isArray(chapter.body) || chapter.body.length < 1 || chapter.body.some((paragraph) => !nonEmpty(paragraph))) {
        fail(`${chapterAt}.body must contain non-empty paragraphs`);
      }
      if (!nonEmpty(chapter.visual?.type)) fail(`${chapterAt}.visual.type is required`);
      else if (!visualTypes.has(chapter.visual.type)) {
        fail(`${chapterAt}.visual.type "${chapter.visual.type}" has no renderer in assets/js/report.js and would render blank`);
      }
    }

    if (!report.cover || !nonEmpty(report.cover.index) || !nonEmpty(report.cover.serial) || !nonEmpty(report.cover.footer)) {
      fail(`${at}.cover requires index, serial, and footer`);
    }
    if (!Array.isArray(report.cover?.lines) || report.cover.lines.length === 0 || report.cover.lines.some((line) => !nonEmpty(line))) {
      fail(`${at}.cover.lines must be a non-empty array of non-empty strings`);
    }
    if (!nonEmpty(report.cardLine)) fail(`${at}.cardLine must be a non-empty string`);

    if (report.transcript != null) {
      if (!nonEmpty(report.transcript.href) || !nonEmpty(report.transcript.label) || !nonEmpty(report.transcript.note)) {
        fail(`${at}.transcript requires href, label, and note`);
      }
      if (/^(?:https?:)?\/\//.test(report.transcript.href || "")) {
        fail(`${at}.transcript.href must be a local path so the record ships with the site`);
      }
    }

    for (const [sourceIndex, source] of (report.sources || []).entries()) {
      const sourceAt = `${at}.sources[${sourceIndex}]`;
      ["number", "title", "publisher", "note"].forEach((field) => {
        if (!nonEmpty(source[field])) fail(`${sourceAt}.${field} must be a non-empty string`);
      });
      if (source.href != null) {
        if (!nonEmpty(source.href)) {
          fail(`${sourceAt}.href must be omitted or a non-empty string`);
        } else {
          try {
            const url = new URL(source.href);
            if (url.protocol !== "https:") fail(`${sourceAt}.href must use HTTPS`);
          } catch {
            fail(`${sourceAt}.href must be a valid URL`);
          }
        }
      }
      if (source.digest != null && !/^[0-9a-f]{64}$/.test(source.digest)) {
        fail(`${sourceAt}.digest must be 64 lowercase hex characters`);
      }
      if (report.kind === "report" && !nonEmpty(source.digest)) {
        fail(`${sourceAt}.digest is required for empirical reports so quotations stay checkable`);
      }
    }
  }

  if (reports.length === 0) fail("at least one publication entry is required");
  if (featured !== 1) fail(`exactly one publication must be featured; found ${featured}`);
  if (failures.length === 0) pass("publication contract");
}

async function validateHtmlFile(path) {
  const source = await readFile(resolve(root, path), "utf8");
  const expectations = [
    [/<html\s+lang="en"/i, "an English lang attribute"],
    [/<title>[^<]+<\/title>/i, "a document title"],
    [/<meta\s+name="description"/i, "a meta description"],
    [/<main[\s>]/i, "a main landmark"],
    [/<h1[\s>]/i, "an h1"]
  ];

  expectations.forEach(([pattern, label]) => {
    if (!pattern.test(source)) fail(`${path} must contain ${label}`);
  });

  const localReferences = [...source.matchAll(/(?:href|src)="([^"#?]+)(?:[?#][^"]*)?"/g)]
    .map((match) => match[1])
    .filter((reference) => !/^(?:https?:|mailto:|tel:|data:)/.test(reference));

  for (const reference of localReferences) {
    if (reference.startsWith("/")) {
      fail(`${path} uses a root-relative asset that will break on project Pages: ${reference}`);
      continue;
    }
    const target = resolve(root, dirname(path), reference);
    try {
      await access(target, constants.R_OK);
    } catch {
      fail(`${path} references missing local file: ${reference}`);
    }
  }

  pass(`HTML structure and local references: ${path}`);
}

async function validateJavaScript() {
  for (const path of ["assets/js/site.js", "assets/js/report.js"]) {
    const source = await readFile(resolve(root, path), "utf8");
    try {
      new vm.Script(source, { filename: path });
      pass(`JavaScript syntax: ${path}`);
    } catch (error) {
      fail(`${path} syntax error: ${error.message}`);
    }
  }
}

async function validateSocialPreview() {
  const path = "assets/img/social-preview.png";
  const source = await readFile(resolve(root, "index.html"), "utf8");
  const expectations = [
    [/<meta\s+property="og:site_name"\s+content="Do Your Own Research">/i, "an Open Graph site name"],
    [/<meta\s+property="og:title"\s+content="[^"]+">/i, "an Open Graph title"],
    [/<meta\s+property="og:description"\s+content="[^"]+">/i, "an Open Graph description"],
    [/<meta\s+property="og:url"\s+content="https:\/\/doyourownresearch\.me\/">/i, "the canonical Open Graph URL"],
    [/<meta\s+property="og:image"\s+content="https:\/\/doyourownresearch\.me\/assets\/img\/social-preview\.png">/i, "the Open Graph preview image"],
    [/<meta\s+property="og:image:width"\s+content="1200">/i, "the Open Graph image width"],
    [/<meta\s+property="og:image:height"\s+content="627">/i, "the Open Graph image height"],
    [/<meta\s+name="twitter:card"\s+content="summary_large_image">/i, "a large Twitter card"],
    [/<meta\s+name="twitter:image"\s+content="https:\/\/doyourownresearch\.me\/assets\/img\/social-preview\.png">/i, "the Twitter preview image"]
  ];

  expectations.forEach(([pattern, label]) => {
    if (!pattern.test(source)) fail(`index.html must contain ${label}`);
  });

  const image = await readFile(resolve(root, path));
  const pngSignature = "89504e470d0a1a0a";
  if (image.subarray(0, 8).toString("hex") !== pngSignature) {
    fail(`${path} must be a PNG image`);
    return;
  }

  const width = image.readUInt32BE(16);
  const height = image.readUInt32BE(20);
  if (width !== 1200 || height !== 627) {
    fail(`${path} must be exactly 1200 × 627 pixels; found ${width} × ${height}`);
  }
  if (image.byteLength > 5_000_000) {
    fail(`${path} must be no larger than 5 MB; found ${image.byteLength} bytes`);
  }

  pass(`social preview: ${width} × ${height}, ${image.byteLength} bytes`);
}

async function validateDomain() {
  const cname = (await readFile(resolve(root, "CNAME"), "utf8")).trim();
  if (cname !== "doyourownresearch.me") fail(`CNAME must contain exactly doyourownresearch.me; got ${JSON.stringify(cname)}`);
  else pass("custom domain: doyourownresearch.me");

  const sitemap = await readFile(resolve(root, "sitemap.xml"), "utf8");
  if (!sitemap.includes("https://doyourownresearch.me/")) fail("sitemap must use the custom domain");
  else pass("sitemap custom-domain URLs");
}

async function validateTranscripts(reports) {
  for (const report of reports) {
    if (!report.transcript?.href) continue;
    if (await exists(report.transcript.href)) pass(`transcript published: ${report.transcript.href}`);
    else fail(`report ${report.slug} links a missing transcript: ${report.transcript.href}`);
  }
}

await requireFiles();
const { site, reports } = await loadPublicationData();
const visualTypes = await supportedVisualTypes();
validateReports(site, reports, visualTypes);
await validateTranscripts(reports);
await Promise.all(["index.html", "report.html", "404.html"].map(validateHtmlFile));
await validateJavaScript();
await validateSocialPreview();
await validateDomain();

if (failures.length > 0) {
  console.error(`\nSite validation failed (${failures.length}):`);
  failures.forEach((message) => console.error(`  ✗ ${message}`));
  process.exitCode = 1;
} else {
  console.log(`\nSite validation passed (${checks.length} checks).`);
  console.log(`  ${reports.length} publication entry · ${reports.reduce((sum, report) => sum + report.chapters.length, 0)} story chapters · custom domain ready`);
}
