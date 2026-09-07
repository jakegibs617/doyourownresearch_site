/*
 * Static site build.
 *
 * Every publication is served from its own address at reports/<slug>/index.html, with the
 * whole article, its title, its description and its canonical link present in the bytes a
 * crawler receives. The markup comes from the browser renderers themselves — report.js and
 * site.js publish their pure halves on window, and this script evaluates those files in a
 * node:vm context and calls them — so the static output and the client output cannot drift.
 *
 * The generated files are committed. GitHub Pages deploys the repository as it stands and
 * runs no build step, so scripts/validate-site.mjs re-runs this build in memory and fails
 * the test suite if what is committed is stale.
 *
 *   node scripts/build-site.mjs
 */

import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { constants } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = resolve(import.meta.dirname, "..");
const ORIGIN = "https://doyourownresearch.me";
const SOCIAL_IMAGE = `${ORIGIN}/assets/img/social-preview-v2.png`;

// The browser files the build evaluates, in the order report.html loads them.
const BROWSER_SCRIPTS = [
  "assets/data/reports.js",
  "assets/data/narration.js",
  "assets/js/narration-content.js",
  "assets/js/report.js",
  "assets/js/site.js"
];

// Standing pages that belong in the sitemap when they exist. About, contact and the
// editorial standards arrive in a separate change; a missing file is simply skipped.
const STATIC_PAGES = [
  { path: "about.html", priority: "0.5" },
  { path: "contact.html", priority: "0.4" },
  { path: "editorial-standards.html", priority: "0.5" },
  { path: "privacy.html", priority: "0.3" }
];

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Report titles are written as sentences. A trailing full stop reads as a typo in a tab.
function headline(title) {
  return String(title).trim().replace(/\.$/, "");
}

function reportUrl(report) {
  return `${ORIGIN}/reports/${report.slug}/`;
}

async function exists(root, path) {
  try {
    await access(resolve(root, path), constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

// Runs the browser data and renderer files in one sandbox and hands back its window. Each
// renderer stops before its DOM bootstrap when no document exists, which is the case here.
async function loadBrowserGlobals(root) {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  for (const path of BROWSER_SCRIPTS) {
    const source = await readFile(resolve(root, path), "utf8");
    vm.runInContext(source, sandbox, { filename: path, timeout: 5000 });
  }

  const { window } = sandbox;
  if (!window.DYOR_REPORT_DOCUMENT?.build) throw new Error("assets/js/report.js did not publish window.DYOR_REPORT_DOCUMENT");
  if (!window.DYOR_ARCHIVE?.archiveCard) throw new Error("assets/js/site.js did not publish window.DYOR_ARCHIVE");
  if (!Array.isArray(window.DYOR_REPORTS)) throw new Error("assets/data/reports.js did not publish window.DYOR_REPORTS");
  return window;
}

function publishedReports(window) {
  return window.DYOR_REPORTS.filter((report) => report.status === "published");
}

function reportPage(window, report) {
  // reports/<slug>/index.html is two directories deep; every asset reference climbs back out.
  const base = "../../";
  const article = window.DYOR_REPORT_DOCUMENT.build(report, { base });
  const title = escapeHtml(`${headline(report.title)} — Do Your Own Research`);
  const description = escapeHtml(report.deck);
  const url = reportUrl(report);
  const imageAlt = escapeHtml(`${headline(report.title)} — Do Your Own Research`);

  return `<!doctype html>
<html lang="en" data-base="${base}" data-report="${escapeHtml(report.slug)}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-P4WW7R7LGK"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-P4WW7R7LGK');
    </script>
    <!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5744142489358762" crossorigin="anonymous"></script>
    <title>${title}</title>
    <meta name="description" content="${description}">
    <meta name="theme-color" content="#0d0f0f">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="Do Your Own Research">
    <meta property="og:title" content="${escapeHtml(headline(report.title))}">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="${url}">
    <meta property="og:image" content="${SOCIAL_IMAGE}">
    <meta property="og:image:secure_url" content="${SOCIAL_IMAGE}">
    <meta property="og:image:type" content="image/png">
    <meta property="og:image:width" content="2400">
    <meta property="og:image:height" content="1254">
    <meta property="og:image:alt" content="${imageAlt}">
    <meta property="article:published_time" content="${escapeHtml(report.publishedAt)}">
    <meta property="article:modified_time" content="${escapeHtml(report.updatedAt)}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(headline(report.title))}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${SOCIAL_IMAGE}">
    <meta name="twitter:image:alt" content="${imageAlt}">
    <link rel="canonical" href="${url}">
    <link rel="icon" href="${base}assets/img/favicon.svg" type="image/svg+xml">
    <link rel="stylesheet" href="${base}assets/css/site.css">
    <script src="${base}assets/data/reports.js" defer></script>
    <script src="${base}assets/data/narration.js" defer></script>
    <script src="${base}assets/data/ads-config.js" defer></script>
    <script src="${base}assets/js/ads.js" defer></script>
    <script src="${base}assets/js/narration-content.js" defer></script>
    <script src="${base}assets/js/read-aloud.js" defer></script>
    <script src="${base}assets/js/report.js" defer></script>
  </head>
  <body class="report-page">
    <a class="skip-link" href="#report-content">Skip to report</a>
    <div class="reading-progress" aria-hidden="true"><span data-reading-progress></span></div>

    <header class="site-header site-header--report" data-header>
      <a class="wordmark" href="${base}index.html" aria-label="Do Your Own Research, home">
        <svg class="wordmark__mark" viewBox="0 0 44 44" aria-hidden="true"><path d="M3 3h38v38H3z" fill="currentColor"/><path d="M12 11h7.5c8.2 0 13 4 13 11s-4.8 11-13 11H12V11Zm7.2 16.3c3.5 0 5.5-1.6 5.5-5.3s-2-5.3-5.5-5.3h-.1v10.6h.1Z" fill="var(--paper)"/><path d="m30 10 3 3-6 6-3-3 6-6Z" fill="var(--signal)"/></svg>
        <span class="wordmark__type"><strong>DO YOUR OWN</strong><span>RESEARCH</span></span>
      </a>
      <div class="report-header-label"><span data-report-issue>${escapeHtml(report.issue)}</span><i></i><span>PUBLIC EVIDENCE RECORD</span></div>
      <a class="report-close" href="${base}index.html#reports"><span>Close report</span><i aria-hidden="true">×</i></a>
    </header>

    <main id="report-content" tabindex="-1">${article}</main>

    <footer class="site-footer site-footer--report">
      <a class="wordmark wordmark--footer" href="${base}index.html" aria-label="Do Your Own Research, home">
        <svg class="wordmark__mark" viewBox="0 0 44 44" aria-hidden="true"><path d="M3 3h38v38H3z" fill="currentColor"/><path d="M12 11h7.5c8.2 0 13 4 13 11s-4.8 11-13 11H12V11Zm7.2 16.3c3.5 0 5.5-1.6 5.5-5.3s-2-5.3-5.5-5.3h-.1v10.6h.1Z" fill="var(--ink)"/><path d="m30 10 3 3-6 6-3-3 6-6Z" fill="var(--red)"/></svg>
        <span class="wordmark__type"><strong>DO YOUR OWN</strong><span>RESEARCH</span></span>
      </a>
      <p>Research you can take apart.</p>
      <nav aria-label="Footer"><a href="${base}index.html#reports">Reports</a><a href="${base}index.html#method">Method</a><a href="${base}about.html">About</a><a href="${base}editorial-standards.html">Editorial standards</a><a href="${base}contact.html">Contact</a><a href="${base}privacy.html">Privacy</a></nav>
      <div class="site-footer__bottom"><span>© <span data-year>2026</span> DYOR</span><span>The method is public. Question everything.</span><a href="#report-content">Back to top ↑</a></div>
    </footer>
  </body>
</html>
`;
}

// Swaps the contents of one <!-- build:name --> … <!-- /build:name --> region. Replacing a
// delimited region rather than appending keeps the build idempotent.
function replaceRegion(source, name, markup) {
  const open = `<!-- build:${name} -->`;
  const close = `<!-- /build:${name} -->`;
  const start = source.indexOf(open);
  const end = source.indexOf(close);
  if (start < 0 || end < 0 || end < start) {
    throw new Error(`index.html is missing the ${open} … ${close} build region`);
  }
  return `${source.slice(0, start + open.length)}\n${markup}\n          ${source.slice(end)}`;
}

async function homePage(root, window) {
  const source = await readFile(resolve(root, "index.html"), "utf8");
  const archive = window.DYOR_ARCHIVE;
  const { featured, rest } = archive.orderArchive(window.DYOR_REPORTS);
  if (!featured) throw new Error("no published report to feature on the homepage");

  const next = window.DYOR_SITE?.archiveNext;
  return [
    ["featured-report", `${archive.coverPlate(featured)}${archive.featuredSummary(featured)}`],
    ["archive-grid", rest.map(archive.archiveCard).join("")],
    ["archive-next", next ? archive.archiveNextPanel(next) : ""]
  ].reduce((html, [name, markup]) => replaceRegion(html, name, markup), source);
}

async function sitemap(root, window) {
  const reports = publishedReports(window)
    .slice()
    .sort((a, b) => String(b.publishedAt).localeCompare(String(a.publishedAt)) || a.slug.localeCompare(b.slug));

  const entries = [`  <url>
    <loc>${ORIGIN}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`];

  for (const report of reports) {
    entries.push(`  <url>
    <loc>${reportUrl(report)}</loc>
    <lastmod>${escapeHtml(report.updatedAt)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${report.kind === "report" ? "0.9" : "0.7"}</priority>
  </url>`);
  }

  for (const page of STATIC_PAGES) {
    if (!(await exists(root, page.path))) continue;
    entries.push(`  <url>
    <loc>${ORIGIN}/${page.path}</loc>
    <changefreq>yearly</changefreq>
    <priority>${page.priority}</priority>
  </url>`);
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>
`;
}

/**
 * Builds every generated file in memory and returns them as a Map of repository-relative
 * path to file contents. Nothing is written; the caller decides.
 */
export async function buildSite(root = ROOT) {
  const window = await loadBrowserGlobals(root);
  const files = new Map();

  for (const report of publishedReports(window)) {
    files.set(`reports/${report.slug}/index.html`, reportPage(window, report));
  }
  files.set("index.html", await homePage(root, window));
  files.set("sitemap.xml", await sitemap(root, window));

  return files;
}

async function main() {
  const files = await buildSite(ROOT);
  for (const [path, contents] of files) {
    const target = resolve(ROOT, path);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, contents, "utf8");
    console.log(`  wrote ${path} (${contents.length} bytes)`);
  }
  console.log(`\nBuilt ${files.size} files.`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}
