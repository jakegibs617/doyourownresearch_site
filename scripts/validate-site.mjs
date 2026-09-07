import { createHash } from "node:crypto";
import { readFile, access } from "node:fs/promises";
import { constants } from "node:fs";
import { resolve, dirname } from "node:path";
import vm from "node:vm";
import { buildSite } from "./build-site.mjs";

const root = resolve(import.meta.dirname, "..");
const failures = [];
const checks = [];

// Pages a reviewer checks for before believing a publication is accountable.
const TRUST_PAGES = ["about.html", "contact.html", "editorial-standards.html"];

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
    "privacy.html",
    ...TRUST_PAGES,
    "ads.txt",
    "CNAME",
    ".nojekyll",
    "robots.txt",
    "sitemap.xml",
    "assets/css/site.css",
    "assets/data/reports.js",
    "assets/data/narration.js",
    "assets/js/site.js",
    "assets/js/report.js",
    "assets/js/narration-content.js",
    "assets/js/read-aloud.js",
    "assets/js/ads.js",
    "assets/data/ads-config.js",
    "assets/img/favicon.svg",
    "assets/img/social-preview.png",
    "assets/img/social-preview-v2.png",
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

// Mirrors the renderers' escaping so report prose can be searched for in the built markup.
function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
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
  for (const path of ["assets/js/site.js", "assets/js/report.js", "assets/js/narration-content.js", "assets/js/read-aloud.js", "assets/js/ads.js", "assets/data/ads-config.js", "assets/data/narration.js"]) {
    const source = await readFile(resolve(root, path), "utf8");
    try {
      new vm.Script(source, { filename: path });
      pass(`JavaScript syntax: ${path}`);
    } catch (error) {
      fail(`${path} syntax error: ${error.message}`);
    }
  }
}

async function validateReadAloud() {
  const [html, renderer, controller, css, privacy] = await Promise.all([
    readFile(resolve(root, "report.html"), "utf8"),
    readFile(resolve(root, "assets/js/report.js"), "utf8"),
    readFile(resolve(root, "assets/js/read-aloud.js"), "utf8"),
    readFile(resolve(root, "assets/css/site.css"), "utf8"),
    readFile(resolve(root, "privacy.html"), "utf8")
  ]);

  const controllerScript = html.indexOf('src="assets/js/read-aloud.js"');
  const contentScript = html.indexOf('src="assets/js/narration-content.js"');
  const rendererScript = html.indexOf('src="assets/js/report.js"');
  if (controllerScript < 0) fail("report.html must load assets/js/read-aloud.js");
  else if (contentScript < 0 || contentScript > controllerScript) fail("report.html must load narration-content.js before read-aloud.js");
  else if (rendererScript < 0 || controllerScript > rendererScript) fail("report.html must load read-aloud.js before report.js");

  const rendererExpectations = [
    [/data-read-aloud-controls/, "a read-aloud control mount"],
    [/data-read-aloud-toggle/, "a read-aloud toggle"],
    [/data-read-aloud-stop/, "a read-aloud stop control"],
    [/data-read-aloud-status/, "a live read-aloud status"],
    [/data-read-aloud-voice/, "a narration voice label"],
    [/data-speech-segment/, "explicit narration segments"],
    [/DYOR_READ_ALOUD\?\.init/, "read-aloud initialization"],
    [/DYOR_NARRATION/, "recorded narration configuration"]
  ];
  rendererExpectations.forEach(([pattern, label]) => {
    if (!pattern.test(renderer)) fail(`assets/js/report.js must contain ${label}`);
  });

  if (!/speechSynthesis/.test(controller) || !/SpeechSynthesisUtterance/.test(controller)) {
    fail("read-aloud.js must feature-detect the browser speech synthesis interfaces");
  }
  if (!/selectPreferredVoice/.test(controller) || !/en-US/.test(controller)) {
    fail("read-aloud.js must prefer an installed American English narration voice");
  }
  if (!/recording/.test(controller) || !/timeupdate/.test(controller) || !/HTMLAudioElement|host\.Audio/.test(controller)) {
    fail("read-aloud.js must support timed recorded narration");
  }
  if (!/\.read-aloud-controls/.test(css) || !/\.is-being-read/.test(css)) {
    fail("site.css must style the read-aloud controls and current narration segment");
  }
  if (!/browser or device speech service/i.test(privacy)) {
    fail("privacy.html must disclose the browser or device speech service");
  }

  if (failures.length === 0) pass("read-aloud control, narration markers, and disclosure");
}

async function validateNarrationAssets(reports) {
  const [configSource, contentSource] = await Promise.all([
    readFile(resolve(root, "assets/data/narration.js"), "utf8"),
    readFile(resolve(root, "assets/js/narration-content.js"), "utf8")
  ]);
  const sandbox = { window: { DYOR_REPORTS: reports } };
  vm.createContext(sandbox);
  vm.runInContext(contentSource, sandbox, { filename: "assets/js/narration-content.js", timeout: 1000 });
  vm.runInContext(configSource, sandbox, { filename: "assets/data/narration.js", timeout: 1000 });
  const config = sandbox.window.DYOR_NARRATION;
  if (!config || typeof config !== "object") {
    fail("assets/data/narration.js must define window.DYOR_NARRATION");
    return;
  }

  for (const [slug, narration] of Object.entries(config)) {
    const report = reports.find((candidate) => candidate.slug === slug);
    if (!report) {
      fail(`narration config references unknown report: ${slug}`);
      continue;
    }
    if (!nonEmpty(narration.audio) || !nonEmpty(narration.cues)) {
      fail(`narration config for ${slug} needs audio and cues paths`);
      continue;
    }
    if (!(await exists(narration.audio))) fail(`narration audio is missing: ${narration.audio}`);
    if (!(await exists(narration.cues))) {
      fail(`narration cues are missing: ${narration.cues}`);
      continue;
    }

    const cuePayload = JSON.parse(await readFile(resolve(root, narration.cues), "utf8"));
    const expectedSegments = sandbox.window.DYOR_NARRATION_CONTENT.segmentsForReport(report);
    const expectedFingerprint = createHash("sha256").update(JSON.stringify(expectedSegments)).digest("hex");
    const cues = cuePayload.cues;
    if (cuePayload.report !== slug) fail(`narration cue report mismatch for ${slug}`);
    if (cuePayload.voiceModel !== "kokoro-am_michael") fail(`narration for ${slug} must use kokoro-am_michael`);
    if (cuePayload.fingerprint !== expectedFingerprint) fail(`narration for ${slug} is stale; regenerate it from the current report text`);
    if (!Array.isArray(cues) || cues.length !== expectedSegments.length) {
      fail(`narration for ${slug} must have ${expectedSegments.length} timed cues`);
      continue;
    }
    cues.forEach((cue, index) => {
      if (cue.id !== expectedSegments[index].id) fail(`narration cue ${index} for ${slug} has the wrong segment ID`);
      if (!Number.isFinite(cue.start) || !Number.isFinite(cue.end) || cue.start < 0 || cue.end <= cue.start) {
        fail(`narration cue ${index} for ${slug} has invalid timing`);
      }
      if (index > 0 && cue.start < cues[index - 1].end) fail(`narration cues overlap at index ${index} for ${slug}`);
    });
    pass(`recorded narration: ${slug} · ${cues.length} cues · ${Math.round(cuePayload.duration / 60)} min`);
  }
}

async function validateSocialPreview() {
  const path = "assets/img/social-preview-v2.png";
  const source = await readFile(resolve(root, "index.html"), "utf8");
  const expectations = [
    [/<meta\s+property="og:site_name"\s+content="Do Your Own Research">/i, "an Open Graph site name"],
    [/<meta\s+property="og:title"\s+content="[^"]+">/i, "an Open Graph title"],
    [/<meta\s+property="og:description"\s+content="[^"]+">/i, "an Open Graph description"],
    [/<meta\s+property="og:url"\s+content="https:\/\/doyourownresearch\.me\/">/i, "the canonical Open Graph URL"],
    [/<meta\s+property="og:image"\s+content="https:\/\/doyourownresearch\.me\/assets\/img\/social-preview-v2\.png">/i, "the Open Graph preview image"],
    [/<meta\s+property="og:image:width"\s+content="2400">/i, "the Open Graph image width"],
    [/<meta\s+property="og:image:height"\s+content="1254">/i, "the Open Graph image height"],
    [/<meta\s+name="twitter:card"\s+content="summary_large_image">/i, "a large Twitter card"],
    [/<meta\s+name="twitter:image"\s+content="https:\/\/doyourownresearch\.me\/assets\/img\/social-preview-v2\.png">/i, "the Twitter preview image"]
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
  if (width !== 2400 || height !== 1254) {
    fail(`${path} must be exactly 2400 × 1254 pixels; found ${width} × ${height}`);
  }
  if (image.byteLength > 5_000_000) {
    fail(`${path} must be no larger than 5 MB; found ${image.byteLength} bytes`);
  }

  pass(`social preview: ${width} × ${height}, ${image.byteLength} bytes`);
}

const PUBLISHER_ID = /^ca-pub-\d{16}$/;

async function loadAdsConfig() {
  const source = await readFile(resolve(root, "assets/data/ads-config.js"), "utf8");
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  try {
    vm.runInContext(source, sandbox, { filename: "assets/data/ads-config.js", timeout: 1000 });
  } catch (error) {
    fail(`ads config does not execute: ${error.message}`);
    return null;
  }
  const config = sandbox.window.DYOR_ADS;
  if (!config || typeof config !== "object") {
    fail("assets/data/ads-config.js must define window.DYOR_ADS");
    return null;
  }
  return config;
}

async function referencedAdUnits() {
  const units = new Set();
  for (const path of ["index.html", "report.html", "404.html", "privacy.html", "assets/js/report.js"]) {
    const source = await readFile(resolve(root, path), "utf8");
    for (const match of source.matchAll(/data-ad-unit="([a-zA-Z0-9_-]+)"/g)) units.add(match[1]);
  }
  return [...units];
}

async function validateAdvertising() {
  const config = await loadAdsConfig();
  if (!config) return;

  const client = typeof config.client === "string" ? config.client : "";
  const slots = config.slots && typeof config.slots === "object" ? config.slots : {};
  const units = await referencedAdUnits();

  if (client !== "" && !PUBLISHER_ID.test(client)) {
    fail(`ads config client must be a ca-pub- publisher ID or empty; got ${JSON.stringify(client)}`);
  }

  units.forEach((unit) => {
    if (!(unit in slots)) fail(`ad container references unknown slot "${unit}"; add it to assets/data/ads-config.js`);
  });

  if (config.enabled === true) {
    if (!PUBLISHER_ID.test(client)) fail("ads are enabled but no valid ca-pub- publisher ID is configured");
    const empty = units.filter((unit) => !nonEmpty(slots[unit]));
    if (empty.length > 0) fail(`ads are enabled but these slots have no ad unit ID: ${empty.join(", ")}`);
  }

  // The <head> snippet is what Google verifies; it must agree with the config.
  if (nonEmpty(client)) {
    for (const path of ["index.html", "report.html", "404.html", "privacy.html", ...TRUST_PAGES]) {
      const source = await readFile(resolve(root, path), "utf8");
      const snippet = source.match(/adsbygoogle\.js\?client=(ca-pub-\d+)/);
      if (!snippet) fail(`${path} is missing the AdSense verification snippet`);
      else if (snippet[1] !== client) fail(`${path} loads ${snippet[1]} but ads-config.js declares ${client}`);
    }
  }

  const adsTxt = await readFile(resolve(root, "ads.txt"), "utf8");
  const records = adsTxt.split("\n").map((line) => line.trim()).filter((line) => line && !line.startsWith("#"));
  if (records.length === 0) fail("ads.txt has no seller records");
  records.forEach((record) => {
    if (!/^[a-z0-9.-]+,\s*[a-zA-Z0-9-]+,\s*(DIRECT|RESELLER)(,\s*[a-f0-9]+)?$/.test(record)) {
      fail(`ads.txt record is not a valid IAB entry: ${JSON.stringify(record)}`);
    }
  });
  if (nonEmpty(client) && !adsTxt.includes(client.replace("ca-", ""))) {
    fail(`ads.txt must authorize ${client.replace("ca-", "")}`);
  }

  pass(`advertising: ${config.enabled === true ? "enabled" : "configured, ads off"} · ${units.length} slot${units.length === 1 ? "" : "s"} · ads.txt ${records.length} record${records.length === 1 ? "" : "s"}`);
}

async function validateDomain() {
  const cname = (await readFile(resolve(root, "CNAME"), "utf8")).trim();
  if (cname !== "doyourownresearch.me") fail(`CNAME must contain exactly doyourownresearch.me; got ${JSON.stringify(cname)}`);
  else pass("custom domain: doyourownresearch.me");

  const sitemap = await readFile(resolve(root, "sitemap.xml"), "utf8");
  if (!sitemap.includes("https://doyourownresearch.me/")) fail("sitemap must use the custom domain");
  else pass("sitemap custom-domain URLs");
}

async function validateTrustPages() {
  const sitemap = await readFile(resolve(root, "sitemap.xml"), "utf8");

  for (const path of TRUST_PAGES) {
    const source = await readFile(resolve(root, path), "utf8");
    const url = `https://doyourownresearch.me/${path}`;
    const expectations = [
      [`<link rel="canonical" href="${url}">`, "a canonical link pointing at itself"],
      [`<meta property="og:url" content="${url}">`, "its own Open Graph URL"],
      ['<meta property="og:site_name" content="Do Your Own Research">', "an Open Graph site name"],
      ['<meta property="og:title"', "an Open Graph title"],
      ['<meta property="og:description"', "an Open Graph description"],
      ['<meta property="og:image"', "an Open Graph preview image"]
    ];
    expectations.forEach(([needle, label]) => {
      if (!source.includes(needle)) fail(`${path} must contain ${label}`);
    });
    if (!sitemap.includes(`<loc>${url}</loc>`)) fail(`sitemap.xml must list ${path}`);
  }

  // A reviewer reaches these pages from the footer or not at all.
  for (const path of ["index.html", "report.html", "404.html", "privacy.html", ...TRUST_PAGES]) {
    const source = await readFile(resolve(root, path), "utf8");
    for (const target of [...TRUST_PAGES, "privacy.html"]) {
      if (path === target) continue;
      if (!source.includes(`href="${target}"`)) fail(`${path} must link to ${target}`);
    }
  }

  const contact = await readFile(resolve(root, "contact.html"), "utf8");
  if (!contact.includes("mailto:contact@doyourownresearch.me")) {
    fail("contact.html must publish a reachable contact address");
  }
  if (!/correction/i.test(contact) || !/dispute|disputing/i.test(contact)) {
    fail("contact.html must state a corrections and dispute route");
  }

  const standards = await readFile(resolve(root, "editorial-standards.html"), "utf8");
  const standardsExpectations = [
    [/confidence: unknown/i, "what a confidence of unknown means"],
    [/does not mean/i, "what a confidence of unknown does not mean"],
    [/endorsement/i, "that an unresolved finding is not an endorsement"],
    [/evidence ledger/i, "the evidence ledger"],
    [/falsification/i, "the falsification pass"],
    [/verbatim/i, "the verbatim excerpt standard"],
    [/snapshot/i, "the snapshot standard"],
    [/corrections policy/i, "the corrections policy"],
    [/mailto:contact@doyourownresearch\.me/, "the corrections address"]
  ];
  standardsExpectations.forEach(([pattern, label]) => {
    if (!pattern.test(standards)) fail(`editorial-standards.html must explain ${label}`);
  });

  pass(`trust pages: ${TRUST_PAGES.join(", ")} · canonical, social, sitemap and footer links`);
}

// The Article record is what a crawler reads instead of the prose, so it has to be present in the
// renderer, well-formed once rendered, and sourced from site data rather than an invented byline.
async function validateStructuredData(site, reports) {
  const renderer = await readFile(resolve(root, "assets/js/report.js"), "utf8");
  if (!/application\/ld\+json/.test(renderer)) {
    fail("assets/js/report.js must render an application/ld+json block into the report document");
    return;
  }
  if (!/\\\\u003c/.test(renderer) || !/\\\\u0026/.test(renderer)) {
    fail("assets/js/report.js must escape <, > and & inside the JSON-LD block");
  }

  for (const field of ["headline", "description", "datePublished", "dateModified", "wordCount", "mainEntityOfPage"]) {
    if (!new RegExp(`\\b${field}:`).test(renderer)) fail(`JSON-LD is missing the ${field} property`);
  }

  for (const attribution of ["author", "publisher"]) {
    const entity = site?.[attribution];
    if (!entity || !nonEmpty(entity.name) || !nonEmpty(entity.url)) {
      fail(`window.DYOR_SITE.${attribution} must carry a name and a url`);
    }
  }

  const slugs = new Set(reports.map((report) => report.slug));
  for (const report of reports) {
    const target = report.next?.slug;
    if (!nonEmpty(target)) fail(`report ${report.slug} has no next.slug to link to`);
    else if (target === report.slug) fail(`report ${report.slug} links its next dossier to itself`);
    else if (!slugs.has(target)) fail(`report ${report.slug} links an unknown next dossier: ${target}`);
  }

  if (!/renderRelated/.test(renderer)) fail("assets/js/report.js must render a related-dossiers block");
  if (!/report-byline/.test(renderer)) fail("assets/js/report.js must render a byline in the report document");

  if (failures.length === 0) pass(`structured data: Article JSON-LD, ${reports.length} next links, tag-related dossiers`);
}

/*
 * The generated pages are committed, because GitHub Pages deploys the repository as it
 * stands and runs no build step. Re-running the build in memory and comparing it with what
 * is on disk is the only thing standing between a data edit and a stale published site.
 */
async function validateGeneratedFreshness() {
  let files;
  try {
    files = await buildSite(root);
  } catch (error) {
    fail(`site build failed: ${error.message}`);
    return [];
  }

  for (const [path, expected] of files) {
    let actual = null;
    try {
      actual = await readFile(resolve(root, path), "utf8");
    } catch {
      fail(`generated file is missing: ${path} — run npm run build and commit the result`);
      continue;
    }
    if (actual !== expected) {
      fail(`generated file is stale: ${path} — run npm run build and commit the result`);
    }
  }

  const generated = [...files.keys()].filter((path) => path.startsWith("reports/"));
  if (failures.length === 0) pass(`generated output current: ${files.size} files, ${generated.length} report pages`);
  return generated;
}

// A report is only crawlable if its own URL serves the article, its own title and its own
// canonical link before any JavaScript runs. That is the failure this whole build exists for.
async function validateReportPages(reports, generatedPages) {
  const published = reports.filter((report) => report.status === "published");
  const titles = new Map();
  const descriptions = new Map();
  // A page the build expects but nobody committed is already reported as missing above.
  const onDisk = [];
  for (const path of generatedPages) {
    if (await exists(path)) onDisk.push(path);
  }

  for (const report of published) {
    const path = `reports/${report.slug}/index.html`;
    if (!generatedPages.includes(path)) {
      fail(`published report has no static page: ${path}`);
      continue;
    }
    if (!onDisk.includes(path)) continue;

    const source = await readFile(resolve(root, path), "utf8");
    const canonical = `https://doyourownresearch.me/reports/${report.slug}/`;
    const title = source.match(/<title>([^<]+)<\/title>/i)?.[1] || "";
    const description = source.match(/<meta\s+name="description"\s+content="([^"]*)">/i)?.[1] || "";

    if (!/<article class="report-document"/.test(source)) fail(`${path} must contain the rendered article, not a JavaScript placeholder`);
    if (!source.includes(`<link rel="canonical" href="${canonical}">`)) fail(`${path} must declare its own canonical URL`);
    if (!source.includes(`<meta property="og:url" content="${canonical}">`)) fail(`${path} must declare its own Open Graph URL`);
    if (!nonEmpty(title)) fail(`${path} must contain a document title`);
    if (!nonEmpty(description)) fail(`${path} must contain a meta description`);
    if (titles.has(title)) fail(`${path} shares its title with ${titles.get(title)}`);
    if (descriptions.has(description)) fail(`${path} shares its meta description with ${descriptions.get(description)}`);
    titles.set(title, path);
    descriptions.set(description, path);

    // Chapter prose is the content AdSense reviewed and did not find. Check it is here.
    const firstParagraph = report.chapters[0]?.body[0];
    if (firstParagraph && !source.includes(escapeHtml(firstParagraph.slice(0, 60)))) {
      fail(`${path} does not contain the first chapter paragraph of ${report.slug}`);
    }
  }

  await Promise.all(onDisk.map(validateHtmlFile));

  // A crawler reading index.html must find a path to every published report.
  const home = await readFile(resolve(root, "index.html"), "utf8");
  const linked = new Set([...home.matchAll(/href="reports\/([a-z0-9-]+)\/"/g)].map((match) => match[1]));
  published.forEach((report) => {
    if (!linked.has(report.slug)) fail(`index.html has no static link to reports/${report.slug}/`);
  });

  const sitemap = await readFile(resolve(root, "sitemap.xml"), "utf8");
  if (sitemap.includes("report.html?report=")) fail("sitemap must not list query-string report URLs");
  published.forEach((report) => {
    if (!sitemap.includes(`https://doyourownresearch.me/reports/${report.slug}/`)) {
      fail(`sitemap is missing reports/${report.slug}/`);
    }
  });

  // Every URL the sitemap advertises has to exist in the repository.
  for (const match of sitemap.matchAll(/<loc>https:\/\/doyourownresearch\.me\/([^<]*)<\/loc>/g)) {
    const target = match[1] === "" ? "index.html" : match[1].endsWith("/") ? `${match[1]}index.html` : match[1];
    if (!(await exists(target))) fail(`sitemap lists a URL with no file behind it: /${match[1]}`);
  }

  if (failures.length === 0) pass(`static report pages: ${published.length} unique titles, canonicals and articles`);
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
await validateStructuredData(site, reports);
await validateTranscripts(reports);
await validateTrustPages();
await Promise.all(["index.html", "report.html", "404.html", "privacy.html", ...TRUST_PAGES].map(validateHtmlFile));
await validateJavaScript();
await validateReadAloud();
await validateNarrationAssets(reports);
await validateSocialPreview();
await validateAdvertising();
await validateDomain();
const generatedPages = await validateGeneratedFreshness();
await validateReportPages(reports, generatedPages);

if (failures.length > 0) {
  console.error(`\nSite validation failed (${failures.length}):`);
  failures.forEach((message) => console.error(`  ✗ ${message}`));
  process.exitCode = 1;
} else {
  console.log(`\nSite validation passed (${checks.length} checks).`);
  console.log(`  ${reports.length} publication entry · ${reports.reduce((sum, report) => sum + report.chapters.length, 0)} story chapters · custom domain ready`);
}
