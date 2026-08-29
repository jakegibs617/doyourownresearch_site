---
name: deploy
description: Use when publishing or shipping the doyourownresearch.me site — releasing a new dossier, pushing content or layout changes live to GitHub Pages, or checking whether a deploy landed.
---

# Deploy doyourownresearch.me

## Overview

This site has no build step and no staging environment. **A push to `main` is the
deploy** — `.github/workflows/pages.yml` triggers on it and publishes the repo as
a static site. There is nothing between the commit and the public page, so every
check happens before the push.

## The gate

Run all three from the repository root. Any failure stops the deploy.

| # | Command | Catches |
|---|---|---|
| 1 | `npm test` | Publication contract: required fields, one `featured`, unknown `visual.type`, missing transcript file, ad config, HTML structure, social preview dimensions |
| 2 | `node .claude/skills/deploy/preflight.mjs` | What `npm test` does not: sitemap out of sync with published slugs, a transcript present on disk but never committed, a stale `archiveNext.number` |
| 3 | Render check (below) | Horizontal overflow, blank figures, console errors, across every published page at 1440px and 375px |

### Render check

```bash
CHECK="$(git rev-parse --show-toplevel)/.claude/skills/deploy/render-check.js"
python3 -m http.server 4173 &
cd ~/.claude/plugins/cache/playwright-skill/playwright-skill/*/skills/playwright-skill
node run.js "$CHECK"
```

It reads the published slugs out of `reports.js`, so new dossiers are covered
automatically. `.ticker__track` and `.report-index__inner` scroll sideways on
purpose and are allow-listed; anything else overrunning the viewport is a real
regression. Kill the server afterwards: `pkill -f "http.server 4173"`.

## Ship it

```bash
git add -A && git commit && git push origin main
gh run watch <run-id> --exit-status          # from: gh run list --limit 1
gh api repos/jakegibs617/doyourownresearch_site/deployments --jq '.[0] | {sha:.sha[0:7], env:.environment}'
```

**Commit to `main` directly.** The usual branch-first instinct does not apply
here: a feature branch does not deploy, so branching silently ships nothing.
Say plainly in the summary that the push published the live site, so the user
can object. `git revert <sha>` backs a release out and redeploys.

## Do not claim the live page was verified

Outbound HTTPS is blocked from this sandbox. `curl https://doyourownresearch.me/`
times out at DNS, and so does `github.com` — the failure says nothing about the
site. `gh` works because it uses a different path.

A green workflow run proves the artifact deployed. It does not prove the page
renders for a visitor, and nothing available here can. Report the deployment SHA
from the API, and state that live rendering is unverified.

**Red flags — none of these is evidence the site is up:**

- "The workflow succeeded, so the site is live"
- "DNS resolves and the certificate is valid, so it must be serving"
- A `000` from curl treated as the site being down
- Any sentence claiming the published page was seen, without a screenshot of it

## When the change is a new dossier

`npm test` will not catch these. Check them by hand:

- Exactly one entry has `featured: true` — the newest run. Demote the previous one.
- `site.archiveState` prose matches the real counts; preflight prints both.
- `site.archiveNext.number` moved past the new issue number.
- The transcript is committed under `assets/reports/`, unedited.
- Both `publishedAt` and `updatedAt` are set.

Ordering between two runs published together comes from the `Fetched at`
timestamps in the transcripts, not from file order.

## Common mistakes

| Mistake | Consequence |
|---|---|
| Branching before pushing | Nothing deploys; the site is unchanged while the summary says it shipped |
| Adding a report but not a sitemap entry | Page is live but unlisted — preflight catches this |
| Leaving two entries `featured: true` | `npm test` fails |
| Enabling ads with an empty slot ID | `npm test` fails; see README for the AdSense rollout order |
| Reporting success on the workflow alone | Overstates what was verified — see the red flags above |
