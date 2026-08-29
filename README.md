# Do Your Own Research — public site

The public, static publishing surface for reports produced by the
`doyourownresearch` research engine (private repository). It is
designed for GitHub Pages and will be served from
[`doyourownresearch.me`](https://doyourownresearch.me).

## Product direction

**One-sentence vision:** Let a genuinely uncertain reader reconstruct why a
conclusion survived without asking them to trust another authority summary.

The site is not a report dashboard or an AI-answer feed. Every published story
should read as a visual investigation whose verdict, if there is one, arrives
after the provenance, competing explanations, tests, evidence, contradictions,
and uncertainty.

The intended reader moves from:

> “Here is another conclusion I am expected to trust.”

to:

> “I can see the question, what would have disproved each explanation, which
> evidence was checked, what remains uncertain, and where I disagree.”

### Editorial principles

1. **Transcript before verdict.** Show how the question moved through the
   method; do not lead with an authority claim.
2. **Evidence stays near the claim.** A reader should never hunt through a
   bibliography to discover what supports a sentence.
3. **Confidence shows its ingredients.** Display origin families, supporting
   passages, unresolved provenance, and counter-evidence—not a decorative score.
4. **Uncertainty is content.** Limitations and open questions belong in the
   primary reading path.
5. **Progressive disclosure.** The story should be readable in minutes and
   auditable for hours.
6. **The archive earns attention.** Publish fewer, reconstructable reports
   rather than a stream of topical summaries.

### Anti-goals

- Do not become a generic news or blog theme.
- Do not publish plausible placeholder verdicts before the upstream research is
  complete.
- Do not reduce reports to a single confidence badge.
- Do not hide methodology, citations, contradictory evidence, or unknowns in
  secondary tabs.
- Do not require a JavaScript framework or private backend to read a report.

## Structure

```text
.
├── index.html                 # landing page and archive
├── report.html                # reusable long-form report renderer
├── assets/
│   ├── css/site.css           # complete visual system
│   ├── data/reports.js        # static publication data
│   ├── img/                   # code-native visual assets
│   ├── js/                    # landing/report interactions
│   └── reports/               # raw run transcripts, published unedited
├── scripts/validate-site.mjs  # dependency-free content/site checks
├── CNAME                      # GitHub Pages custom domain
└── .github/workflows/pages.yml
```

`assets/data/reports.js` is intentionally plain data. It is the seam between
the upstream research pipeline and the publication renderer. The first entry is
a clearly labeled method note based on the project’s accepted design decisions;
it is not presented as an empirical research report.

## Local development

No installation or build step is required.

```bash
python3 -m http.server 4173
```

Open <http://127.0.0.1:4173>. Validate the publication contract with:

```bash
npm test
```

## Publishing a report

The landing archive renders from `assets/data/reports.js`, so a new report is a
data entry plus a sitemap line—no HTML edit.

1. Add one entry to `window.DYOR_REPORTS` in `assets/data/reports.js`, including
   a `cover` (`index`, `serial`, `lines`, `footer`) and a `cardLine`. The entry
   with `featured: true` becomes the cover on the landing page; every other
   published entry renders as an archive card.
2. Keep the upstream run ID and source/evidence identities in the entry. For
   `kind: "report"`, every source needs its snapshot `digest` so quotations stay
   checkable against the bytes that were stored.
3. Use `kind: "report"` only for a completed, publishable dossier. Use
   `method-note` or `field-note` for editorial material.
4. Commit the raw run transcript to `assets/reports/` and point `transcript.href`
   at it. The validator fails if the file is missing.
5. Every `chapter.visual.type` must have a renderer in `assets/js/report.js`—the
   validator checks this, because an unknown type renders a blank figure.
6. Add the report URL to `sitemap.xml`.
7. Run `npm test` and review both pages at desktop and mobile widths.
8. Push `main`. The Pages workflow publishes the repository as a static site.

The upstream publication adapter should eventually serialize the final
`ResearchState`, findings, confidence inputs, limitations, and open questions
into this data shape. Until those final pipeline stages exist, the site should
remain honest about what is a report and what is a note about the method.

## Activating `doyourownresearch.me`

The repository is ready, but the domain still needs to be connected to GitHub
Pages outside the codebase:

1. In **Repository settings → Pages**, select **GitHub Actions** as the source,
   enter `doyourownresearch.me` as the custom domain, and save it. GitHub ignores
   a repository `CNAME` file for custom Actions deployments, so the Settings
   value is the authoritative one; the checked-in file documents the intended
   domain and preserves branch-deployment compatibility.
2. At the DNS provider, create four `A` records for `@`:

   ```text
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

3. Recommended: create a `www` `CNAME` pointing directly to
   `jakegibs617.github.io` so GitHub can redirect `www` to the apex domain.
4. Once DNS and the certificate have propagated, enable **Enforce HTTPS** in
   the Pages settings.

Avoid wildcard DNS records for this domain. GitHub recommends domain
verification and warns that wildcard records increase takeover risk.
