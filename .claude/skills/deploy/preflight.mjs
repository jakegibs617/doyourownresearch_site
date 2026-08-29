#!/usr/bin/env node
// Publication checks that scripts/validate-site.mjs does not cover.
// Run from the repository root: node .claude/skills/deploy/preflight.mjs
import { readFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import vm from "node:vm";

const root = process.cwd();
const problems = [];
const notes = [];

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(await readFile(resolve(root, "assets/data/reports.js"), "utf8"), sandbox, {
  filename: "assets/data/reports.js",
  timeout: 2000
});
const site = sandbox.window.DYOR_SITE;
const reports = sandbox.window.DYOR_REPORTS ?? [];
const sitemap = await readFile(resolve(root, "sitemap.xml"), "utf8");

const published = reports.filter((r) => r.status === "published");

// 1. Every published entry is reachable from the sitemap, and vice versa.
const inSitemap = new Set([...sitemap.matchAll(/\?report=([a-z0-9-]+)/g)].map((m) => m[1]));
for (const report of published) {
  if (!inSitemap.has(report.slug)) problems.push(`sitemap.xml is missing ${report.slug} (${report.issue})`);
}
for (const slug of inSitemap) {
  if (!published.some((r) => r.slug === slug)) problems.push(`sitemap.xml points at unpublished slug: ${slug}`);
}

// 2. Transcripts must be committed, not merely present on disk.
let tracked = new Set();
try {
  tracked = new Set(execFileSync("git", ["ls-files"], { encoding: "utf8" }).split("\n"));
} catch {
  notes.push("git ls-files unavailable; skipped the transcript tracking check");
}
if (tracked.size) {
  for (const report of published) {
    const href = report.transcript?.href;
    if (href && !tracked.has(href)) problems.push(`transcript not committed, will 404 in production: ${href}`);
  }
}

// 3. The teased next issue number must be ahead of everything published.
const issueNumbers = published
  .map((r) => Number.parseInt(String(r.issue).replace(/\D+/g, ""), 10))
  .filter(Number.isFinite);
const highest = issueNumbers.length ? Math.max(...issueNumbers) : 0;
const next = Number.parseInt(String(site?.archiveNext?.number ?? ""), 10);
if (!Number.isFinite(next)) problems.push("site.archiveNext.number is not a number");
else if (next <= highest) problems.push(`site.archiveNext.number is ${site.archiveNext.number}, but ${String(highest).padStart(3, "0")} is already published`);

// 4. Counts the copy claims — reported, never guessed at.
const counts = published.reduce((acc, r) => ({ ...acc, [r.kind]: (acc[r.kind] ?? 0) + 1 }), {});
notes.push(`published: ${Object.entries(counts).map(([k, v]) => `${v} ${k}`).join(", ")}`);
notes.push(`archiveState reads: ${JSON.stringify(site?.archiveState)} — confirm it matches the line above`);
notes.push(`featured: ${published.filter((r) => r.featured).map((r) => `${r.issue} ${r.slug}`).join(", ") || "none"}`);

notes.forEach((n) => console.log(`  · ${n}`));
if (problems.length) {
  console.error(`\n✗ deploy preflight found ${problems.length} problem(s):`);
  problems.forEach((p) => console.error(`  ✗ ${p}`));
  process.exit(1);
}
console.log("\n✓ deploy preflight passed");
