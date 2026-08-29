// Renders every published page at desktop and mobile and reports anything broken.
// Runs through the playwright-skill executor, which supplies `chromium`:
//   cd "$PW_SKILL_DIR" && node run.js <abs path to this file>
// Requires a local server: python3 -m http.server 4173  (override with DYOR_URL)
const TARGET_URL = process.env.DYOR_URL || 'http://127.0.0.1:4173';

// Strips that scroll horizontally on purpose. Anything else that overruns the
// viewport is a real regression.
const INTENTIONAL_SCROLLERS = ['ticker__track', 'report-index__inner'];

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 375, height: 812 },
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const failures = [];
  const consoleErrors = [];
  page.on('console', (m) => m.type() === 'error' && consoleErrors.push(m.text()));
  page.on('pageerror', (e) => consoleErrors.push('pageerror: ' + e.message));

  await page.goto(TARGET_URL + '/index.html', { waitUntil: 'networkidle' });
  const slugs = await page.evaluate(() =>
    (window.DYOR_REPORTS || []).filter((r) => r.status === 'published').map((r) => r.slug));
  const targets = [['home', '/index.html'], ...slugs.map((s) => [s, `/report.html?report=${s}`])];
  console.log(`checking ${targets.length} page(s) × ${VIEWPORTS.length} viewport(s)\n`);

  for (const [name, path] of targets) {
    for (const vp of VIEWPORTS) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(TARGET_URL + path, { waitUntil: 'networkidle' });
      await page.waitForTimeout(250);

      const r = await page.evaluate((allowed) => {
        const docW = document.documentElement.clientWidth;
        const overruns = [];
        document.querySelectorAll('body *').forEach((el) => {
          const box = el.getBoundingClientRect();
          if (box.width <= 0) return;
          if (box.right <= docW + 1 && box.left >= -1) return;
          const parent = el.parentElement?.getBoundingClientRect();
          if (parent && (parent.right > docW + 1 || parent.left < -1)) return; // report outermost only
          const cls = (el.className || '').toString();
          if (allowed.some((a) => cls.includes(a))) return;
          overruns.push(`${el.tagName.toLowerCase()}.${cls.split(' ')[0]}`);
        });
        return {
          pageScrolls: document.documentElement.scrollWidth > docW + 1,
          overruns: overruns.slice(0, 5),
          figures: document.querySelectorAll('.visual-label').length,
          emptyFigures: [...document.querySelectorAll('figure')].filter((f) => !f.innerText.trim()).length,
          h1: (document.querySelector('h1')?.innerText || '').replace(/\s+/g, ' ').trim(),
        };
      }, INTENTIONAL_SCROLLERS);

      const bad = [];
      if (r.pageScrolls) bad.push('page scrolls horizontally');
      if (r.overruns.length) bad.push('overruns viewport: ' + r.overruns.join(', '));
      if (r.emptyFigures) bad.push(`${r.emptyFigures} empty figure(s) — a visual.type with no renderer`);
      if (!r.h1) bad.push('no h1');

      const label = `${name} / ${vp.name}`;
      if (bad.length) { failures.push(`${label}: ${bad.join('; ')}`); console.log(`✗ ${label}\n    ${bad.join('\n    ')}`); }
      else console.log(`✓ ${label}  (${r.figures} figures)`);
    }
  }

  if (consoleErrors.length) {
    failures.push(`${consoleErrors.length} console error(s)`);
    console.log('\n✗ console errors:\n  ' + [...new Set(consoleErrors)].join('\n  '));
  }

  console.log(failures.length ? `\n✗ render check failed (${failures.length})` : '\n✓ render check passed');
  await browser.close();
  process.exitCode = failures.length ? 1 : 0;
})();
