(function () {
  "use strict";

  document.documentElement.classList.add("js");

  const reportRoot = document.querySelector("#report-content");
  const reports = Array.isArray(window.DYOR_REPORTS) ? window.DYOR_REPORTS : [];

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function formatDate(value) {
    const date = new Date(`${value}T12:00:00`);
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    }).format(date);
  }

  function reportTitle(title) {
    const words = title.trim().split(/\s+/);
    const last = words.pop();
    return `${escapeHtml(words.join(" "))}<br><em>${escapeHtml(last)}</em>`;
  }

  function renderVisual(visual, chapterNumber) {
    if (!visual || !visual.type) return "";
    const label = `<div class="visual-label"><span>FIG. ${escapeHtml(chapterNumber)}</span><span>${escapeHtml(visual.type.replaceAll("-", " "))}</span></div>`;

    if (visual.type === "verdict-shift") {
      const columns = [
        { title: "The shortcut", items: visual.before },
        { title: "The transcript", items: visual.after }
      ];
      return `${label}<div class="visual-verdict-shift">${columns.map((column) => `
        <div class="verdict-column">
          <h3>${escapeHtml(column.title)}</h3>
          <ol>${column.items.map((item, index) => `<li>${String(index + 1).padStart(2, "0")} / ${escapeHtml(item)}</li>`).join("")}</ol>
        </div>`).join("")}</div>`;
    }

    if (visual.type === "origin-map") {
      return `${label}<div class="visual-origin-map">
        <div class="origin-node origin-node--source">${escapeHtml(visual.origin)}</div>
        <div class="origin-branches">${visual.branches.map((branch) => `<span>${escapeHtml(branch)}</span>`).join("")}</div>
        <div class="origin-node origin-conclusion">${escapeHtml(visual.conclusion)}</div>
      </div>`;
    }

    if (visual.type === "probe") {
      const fields = [
        ["01 / CONDITION", visual.condition],
        ["02 / PREDICTION", visual.prediction],
        ["03 / VENUE", visual.venue]
      ];
      return `${label}<div class="visual-probe">
        <div class="probe-fields">${fields.map(([fieldLabel, content]) => `<div class="probe-field"><span>${escapeHtml(fieldLabel)}</span><p>${escapeHtml(content)}</p></div>`).join("")}</div>
        <div class="probe-outcomes">${visual.outcomes.map((outcome) => `<div class="probe-outcome probe-outcome--${escapeHtml(outcome.tone)}"><strong>${escapeHtml(outcome.label)}</strong><span>${escapeHtml(outcome.note)}</span></div>`).join("")}</div>
      </div>`;
    }

    if (visual.type === "condition-chain") {
      return `${label}<div class="visual-condition-chain"><div class="condition-chain">${visual.items.map((item, index) => `
        <div class="condition-item condition-item--${escapeHtml(item.state.replaceAll(" ", "-"))}">
          <span>${String(index + 1).padStart(2, "0")}</span><strong>${escapeHtml(item.label)}</strong><span class="condition-state">${escapeHtml(item.state)}</span>
        </div>`).join("")}</div></div>`;
    }

    if (visual.type === "confidence-ledger") {
      return `${label}<div class="visual-confidence-ledger">
        <div class="ledger-inputs">${visual.inputs.map((input) => `<div class="ledger-input"><strong>${escapeHtml(input.value)}</strong><span>${escapeHtml(input.label)}</span></div>`).join("")}</div>
        <div class="ledger-output"><span>Derived confidence</span><strong>${escapeHtml(visual.output)}</strong></div>
        <p class="ledger-note">${escapeHtml(visual.note)}</p>
      </div>`;
    }

    if (visual.type === "report-layers") {
      return `${label}<div class="visual-report-layers">${visual.layers.map((layer) => `<div class="report-layer"><strong>${escapeHtml(layer.label)}</strong><span>${escapeHtml(layer.detail)}</span></div>`).join("")}</div>`;
    }

    if (visual.type === "scope-boundary") {
      const column = (columnLabel, items, modifier) => `
        <div class="boundary-column boundary-column--${modifier}">
          <h3>${escapeHtml(columnLabel)}</h3>
          <ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </div>`;
      return `${label}<div class="visual-scope-boundary">
        <div class="boundary-columns">
          ${column(visual.askedLabel, visual.asked, "asked")}
          ${column(visual.excludedLabel, visual.excluded, "excluded")}
        </div>
        <p class="boundary-note">${escapeHtml(visual.note)}</p>
      </div>`;
    }

    if (visual.type === "hypothesis-roster") {
      const rows = visual.items.map((item) => `
        <div class="roster-row">
          <div class="roster-row__head">
            <span class="roster-id">${escapeHtml(item.id)}</span>
            <p class="roster-claim">${escapeHtml(item.claim)}</p>
          </div>
          <p class="roster-falsifier"><span>Falsified by</span>${escapeHtml(item.falsifier)}</p>
          <div class="roster-counts" role="list" aria-label="Bearing counts for ${escapeHtml(item.id)}">
            ${item.counts.map((count, index) => `<div class="roster-count${count > 0 ? " is-live" : ""}" role="listitem"><b>${escapeHtml(visual.scale[index])}</b><span>${escapeHtml(count)}</span></div>`).join("")}
          </div>
        </div>`).join("");
      return `${label}<div class="visual-hypothesis-roster"><div class="visual-rows">${rows}</div><p class="roster-note">${escapeHtml(visual.note)}</p></div>`;
    }

    if (visual.type === "attack-log") {
      const rows = visual.items.map((item, index) => `
        <div class="attack-row attack-row--${escapeHtml(item.outcome)}">
          <span class="attack-index">${String(index + 1).padStart(2, "0")}</span>
          <span class="attack-target">${escapeHtml(item.target)}</span>
          <p class="attack-looked">${escapeHtml(item.looked)}</p>
          <span class="attack-outcome">${item.outcome === "returned" ? "RETURNED" : "EMPTY"}</span>
        </div>`).join("");
      return `${label}<div class="visual-attack-log"><div class="visual-rows">${rows}</div><p class="attack-footer">${escapeHtml(visual.footer)}</p></div>`;
    }

    if (visual.type === "prevalence-ladder") {
      const bars = visual.items.map((item) => `
        <div class="ladder-row${item.composite ? " ladder-row--composite" : ""}">
          <div class="ladder-value"><strong>${escapeHtml(item.value)}</strong><i>%</i></div>
          <div class="ladder-track"><span style="width:${Math.max(1, Math.min(100, Number(item.value)))}%"></span></div>
          <p class="ladder-wording">${escapeHtml(item.wording)}</p>
          <span class="ladder-source">${escapeHtml(item.source)}</span>
        </div>`).join("");
      return `${label}<div class="visual-prevalence-ladder"><div class="visual-rows">${bars}</div><p class="ladder-note">${escapeHtml(visual.note)}</p></div>`;
    }

    if (visual.type === "finding-attack") {
      const panel = (panelData, modifier, meta) => `
        <div class="fa-panel fa-panel--${modifier}">
          <div class="fa-panel__meta">
            <span>${escapeHtml(panelData.label)}</span>
            <span class="fa-panel__tag">${escapeHtml(panelData.status || panelData.kind)}</span>
          </div>
          <p class="fa-panel__text">${escapeHtml(panelData.text)}</p>
          <span class="fa-panel__id">${escapeHtml(panelData.id)}</span>
          ${meta ? `<p class="fa-panel__note">${escapeHtml(meta)}</p>` : ""}
        </div>`;
      return `${label}<div class="visual-finding-attack">
        <div class="visual-rows">
          ${panel(visual.finding, "finding", visual.finding.meta)}
          <div class="fa-joint" aria-hidden="true"><span>↓</span></div>
          ${panel(visual.attack, "attack", "")}
        </div>
        <div class="fa-failure">
          <span>${escapeHtml(visual.failureLabel)}</span>
          <p>${escapeHtml(visual.failure)}</p>
        </div>
      </div>`;
    }

    if (visual.type === "timeline") {
      const rows = visual.items.map((item) => `
        <div class="tl-row${item.tone ? ` tl-row--${escapeHtml(item.tone)}` : ""}">
          <span class="tl-date">${escapeHtml(item.date)}</span>
          <div class="tl-body">
            <strong>${escapeHtml(item.label)}</strong>
            <p>${escapeHtml(item.detail)}</p>
          </div>
        </div>`).join("");
      return `${label}<div class="visual-timeline"><div class="visual-rows">${rows}</div><p class="tl-note">${escapeHtml(visual.note)}</p></div>`;
    }

    if (visual.type === "lineage-chain") {
      const rows = visual.items.map((item, index) => `
        <div class="lc-row">
          <span class="lc-index">${String(index + 1).padStart(2, "0")}</span>
          <div class="lc-body">
            <div class="lc-head"><strong>${escapeHtml(item.actor)}</strong><span class="lc-date">${item.date ? escapeHtml(item.date) : "date not stated"}</span></div>
            <p>${escapeHtml(item.added)}</p>
          </div>
        </div>`).join("");
      return `${label}<div class="visual-lineage-chain"><div class="visual-rows">${rows}</div><p class="lc-note">${escapeHtml(visual.note)}</p></div>`;
    }

    if (visual.type === "score-breakdown") {
      const rows = visual.components.map((component) => `
        <div class="score-row${component.value > 0 ? " is-scored" : ""}">
          <div class="score-row__head"><strong>${escapeHtml(component.label)}</strong><span>${escapeHtml(component.value)} / ${escapeHtml(component.max)}</span></div>
          <div class="score-track"><span style="width:${Math.max(0, Math.min(100, (Number(component.value) / Number(component.max)) * 100))}%"></span></div>
          <p>${escapeHtml(component.note)}</p>
        </div>`).join("");
      return `${label}<div class="visual-score-breakdown">
        <div class="visual-rows">
          ${rows}
          <div class="score-sum"><span>${escapeHtml(visual.subtotalLabel)}</span><strong>${escapeHtml(visual.subtotal)}</strong></div>
          <p class="score-cap">${escapeHtml(visual.capLabel)}</p>
        </div>
        <div class="score-total">
          <div><span>Evidence score</span><strong>${escapeHtml(visual.total)}</strong></div>
          <div><span>Computed confidence</span><strong>${escapeHtml(visual.confidence)}</strong></div>
        </div>
        <p class="score-note">${escapeHtml(visual.note)}</p>
      </div>`;
    }

    return "";
  }

  function renderChapter(chapter) {
    const body = chapter.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
    const quote = chapter.pullquote ? `<blockquote class="chapter-pullquote">${escapeHtml(chapter.pullquote)}</blockquote>` : "";
    return `<section class="report-chapter" id="${escapeHtml(chapter.id)}" data-report-section>
      <div class="chapter-grid">
        <div class="chapter-number">${escapeHtml(chapter.number)} / ${String(chapter.number).padStart(2, "0")}</div>
        <div class="chapter-copy">
          <p class="eyebrow">${escapeHtml(chapter.eyebrow)}</p>
          <h2>${escapeHtml(chapter.title)}</h2>
          <p class="chapter-lead">${escapeHtml(chapter.lead)}</p>
          ${body}${quote}
        </div>
        <figure class="chapter-visual" aria-label="${escapeHtml(chapter.visual?.type?.replaceAll("-", " ") || "Chapter visual")}">
          ${renderVisual(chapter.visual, chapter.number)}
        </figure>
      </div>
    </section>`;
  }

  function renderReport(report) {
    const chapterLinks = report.chapters.map((chapter) => `<a href="#${escapeHtml(chapter.id)}" data-index-link="${escapeHtml(chapter.id)}">${escapeHtml(chapter.number)} ${escapeHtml(chapter.eyebrow)}</a>`).join("");
    const stats = report.stats.map((stat) => `<div class="report-stat"><strong>${escapeHtml(stat.value)}</strong><span>${escapeHtml(stat.label)}</span></div>`).join("");
    const principles = report.principles.map((principle, index) => `<li><span>${String(index + 1).padStart(2, "0")}</span><strong>${escapeHtml(principle)}</strong></li>`).join("");
    const limitations = report.limitations.map((limitation, index) => `<li><span>L${String(index + 1).padStart(2, "0")}</span><strong>${escapeHtml(limitation)}</strong></li>`).join("");
    const sources = report.sources.map((source) => `<article class="source-item">
      <span class="source-item__number">${escapeHtml(source.number)}</span>
      <div>
        <div class="source-item__publisher">${escapeHtml(source.publisher)}${source.tier ? ` <i>/ ${escapeHtml(source.tier)}</i>` : ""}</div>
        <h3 class="source-item__title">${escapeHtml(source.title)}</h3>
      </div>
      <div class="source-item__body">
        <p class="source-item__note">${escapeHtml(source.note)}</p>
        ${source.digest ? `<p class="source-item__digest"><span>Snapshot digest</span><code>${escapeHtml(source.digest)}</code></p>` : ""}
      </div>
      <a class="source-item__link" href="${escapeHtml(source.href)}" target="_blank" rel="noreferrer" aria-label="Open ${escapeHtml(source.title)}">↗</a>
    </article>`).join("");

    const principlesHeading = report.principlesHeading || { eyebrow: "Report standard", title: "What every public dossier must preserve." };
    const sourcesHeading = report.sourcesHeading || { eyebrow: "Source record", title: "Read the decisions behind the design." };
    const sourcesNote = report.sourcesNote ? `<p class="endmatter-note">${escapeHtml(report.sourcesNote)}</p>` : "";
    const transcript = report.transcript ? `<a class="transcript-link" href="${escapeHtml(report.transcript.href)}">
      <span class="transcript-link__label">Full record</span>
      <strong>${escapeHtml(report.transcript.label)}</strong>
      <p>${escapeHtml(report.transcript.note)}</p>
      <i aria-hidden="true">↗</i>
    </a>` : "";

    reportRoot.innerHTML = `<article class="report-document" data-report-slug="${escapeHtml(report.slug)}">
      <header class="report-hero">
        <div class="report-hero__meta">
          <span>${escapeHtml(report.issue)} / ${escapeHtml(report.label)}</span>
          <span>${escapeHtml(formatDate(report.publishedAt))} / ${escapeHtml(report.readMinutes)} min read</span>
        </div>
        <div class="report-hero__main">
          <div>
            <span class="report-hero__label">${escapeHtml(report.label)} / Public record</span>
            <h1>${reportTitle(report.title)}</h1>
          </div>
          <div class="report-hero__side">
            <p class="report-hero__deck">${escapeHtml(report.deck)}</p>
            <div class="report-hero__detail"><span>${escapeHtml(report.tags.join(" / "))}</span><span>Updated ${escapeHtml(formatDate(report.updatedAt))}</span></div>
          </div>
        </div>
      </header>

      <aside class="report-disclosure" aria-label="Publication disclosure">
        <strong>Disclosure / ${escapeHtml(report.kind)}</strong><p>${escapeHtml(report.disclosure)}</p>
      </aside>

      <nav class="report-index" aria-label="Report chapters">
        <div class="report-index__inner">
          <a href="#overview" data-index-link="overview">Overview</a>${chapterLinks}
          <a href="#limitations" data-index-link="limitations">Limitations</a>
          <a href="#sources" data-index-link="sources">Sources</a>
          <button type="button" data-share-report>Share <span aria-hidden="true">↗</span></button>
        </div>
      </nav>

      <section class="report-intro" id="overview" data-report-section>
        <div class="report-question">
          <div class="report-question__label">The question / Q</div>
          <blockquote>${escapeHtml(report.question)}</blockquote>
        </div>
        <div class="report-answer">
          <div class="report-answer__label">The short answer / A</div>
          <p>${escapeHtml(report.answer)}</p>
        </div>
        <div class="report-stats">${stats}</div>
      </section>

      <section class="report-thesis" aria-label="Thesis">
        <div class="report-thesis__meta"><span>${escapeHtml(report.thesis.label)}</span><span class="report-thesis__status">${escapeHtml(report.thesis.status)}</span></div>
        <blockquote>${escapeHtml(report.thesis.statement)}</blockquote>
      </section>

      <div class="report-body"><div class="report-chapters">${report.chapters.map(renderChapter).join("")}</div></div>

      <div class="report-endmatter">
        <section class="endmatter-section" id="principles" data-report-section>
          <header class="endmatter-heading"><p class="eyebrow">${escapeHtml(principlesHeading.eyebrow)}</p><h2>${escapeHtml(principlesHeading.title)}</h2></header>
          <ol class="principle-list">${principles}</ol>
        </section>
        <section class="endmatter-section" id="limitations" data-report-section>
          <header class="endmatter-heading"><p class="eyebrow">Limitations / unknowns</p><h2>What this note does not establish.</h2></header>
          <ol class="limitation-list">${limitations}</ol>
        </section>
        <section class="endmatter-section" id="sources" data-report-section>
          <header class="endmatter-heading"><p class="eyebrow">${escapeHtml(sourcesHeading.eyebrow)}</p><h2>${escapeHtml(sourcesHeading.title)}</h2></header>
          ${sourcesNote}
          <div class="sources-list">${sources}</div>
          ${transcript}
        </section>
      </div>

      <section class="report-next">
        <div class="report-next__inner">
          <p class="eyebrow">${escapeHtml(report.next.eyebrow)}</p>
          <div>
            <h2>${escapeHtml(report.next.title)}</h2>
            <p>${escapeHtml(report.next.body)}</p>
            <div class="report-share-panel">
              <button class="button button--dark" type="button" data-share-report><span>Share this ${escapeHtml(report.kind === "report" ? "dossier" : "note")}</span><i aria-hidden="true">↗</i></button>
              ${report.transcript ? `<a class="text-link" href="${escapeHtml(report.transcript.href)}">Check the work yourself <span aria-hidden="true">↗</span></a>` : ""}
              <a class="text-link" href="index.html#reports">Return to the archive <span aria-hidden="true">↗</span></a>
              <span class="report-share-status" aria-live="polite" data-share-status></span>
            </div>
          </div>
        </div>
      </section>
    </article>`;
  }

  function setMetadata(report) {
    document.title = `${report.title} — Do Your Own Research`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", report.deck);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogTitle) ogTitle.setAttribute("content", report.title);
    if (ogDescription) ogDescription.setAttribute("content", report.deck);
    document.querySelector("[data-report-issue]")?.replaceChildren(document.createTextNode(report.issue));

    const canonicalUrl = `https://doyourownresearch.me/report.html?report=${encodeURIComponent(report.slug)}`;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = canonicalUrl;
  }

  function initReadingProgress() {
    const progress = document.querySelector("[data-reading-progress]");
    if (!progress) return;
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const value = total > 0 ? Math.min(100, Math.max(0, (window.scrollY / total) * 100)) : 0;
      progress.style.width = `${value}%`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
  }

  function initSectionTracking() {
    if (!("IntersectionObserver" in window)) return;
    const sections = [...document.querySelectorAll("[data-report-section]")];
    const links = [...document.querySelectorAll("[data-index-link]")];
    const byId = new Map(links.map((link) => [link.dataset.indexLink, link]));
    const visible = new Map();

    const updateActive = () => {
      const candidates = [...visible.entries()].filter(([, isVisible]) => isVisible).map(([id]) => id);
      const id = candidates.at(-1);
      links.forEach((link) => link.classList.toggle("is-active", link === byId.get(id)));
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => visible.set(entry.target.id, entry.isIntersecting));
      updateActive();
    }, { rootMargin: "-10% 0px -70% 0px", threshold: 0 });

    sections.forEach((section) => observer.observe(section));
  }

  function fallbackCopy(value) {
    const input = document.createElement("textarea");
    input.value = value;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.append(input);
    input.select();
    const copied = document.execCommand("copy");
    input.remove();
    return copied;
  }

  function setShareStatus(message) {
    document.querySelectorAll("[data-share-status]").forEach((node) => {
      node.textContent = message;
      window.setTimeout(() => { node.textContent = ""; }, 3500);
    });
  }

  function initShare(report) {
    document.querySelectorAll("[data-share-report]").forEach((button) => {
      button.addEventListener("click", async () => {
        const shareData = { title: report.title, text: report.deck, url: window.location.href };
        try {
          if (navigator.share) {
            await navigator.share(shareData);
            setShareStatus("Shared.");
            return;
          }
          if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(window.location.href);
          } else if (!fallbackCopy(window.location.href)) {
            throw new Error("Copy failed");
          }
          setShareStatus("Link copied.");
        } catch (error) {
          if (error?.name !== "AbortError") setShareStatus("Copy the URL from your address bar.");
        }
      });
    });
  }

  function setYear() {
    document.querySelectorAll("[data-year]").forEach((node) => {
      node.textContent = String(new Date().getFullYear());
    });
  }

  const requestedSlug = new URLSearchParams(window.location.search).get("report");
  const report = reports.find((entry) => entry.slug === requestedSlug) || (!requestedSlug ? reports.find((entry) => entry.featured) : null);

  if (!reportRoot) return;
  if (!report) {
    reportRoot.innerHTML = `<section class="report-error"><p class="eyebrow">Unknown report</p><h1>This report is not in the public record.</h1><a class="button button--dark" href="index.html#reports"><span>Return to the archive</span><i aria-hidden="true">↗</i></a></section>`;
    document.title = "Report not found — Do Your Own Research";
    return;
  }

  renderReport(report);
  setMetadata(report);
  setYear();
  initReadingProgress();
  initSectionTracking();
  initShare(report);
})();
