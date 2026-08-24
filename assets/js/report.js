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
      <div><div class="source-item__publisher">${escapeHtml(source.publisher)}</div><h3 class="source-item__title">${escapeHtml(source.title)}</h3></div>
      <p class="source-item__note">${escapeHtml(source.note)}</p>
      <a class="source-item__link" href="${escapeHtml(source.href)}" target="_blank" rel="noreferrer" aria-label="Open ${escapeHtml(source.title)}">↗</a>
    </article>`).join("");

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
          <header class="endmatter-heading"><p class="eyebrow">Report standard</p><h2>What every public dossier must preserve.</h2></header>
          <ol class="principle-list">${principles}</ol>
        </section>
        <section class="endmatter-section" id="limitations" data-report-section>
          <header class="endmatter-heading"><p class="eyebrow">Limitations / unknowns</p><h2>What this note does not establish.</h2></header>
          <ol class="limitation-list">${limitations}</ol>
        </section>
        <section class="endmatter-section" id="sources" data-report-section>
          <header class="endmatter-heading"><p class="eyebrow">Source record</p><h2>Read the decisions behind the design.</h2></header>
          <div class="sources-list">${sources}</div>
        </section>
      </div>

      <section class="report-next">
        <div class="report-next__inner">
          <p class="eyebrow">${escapeHtml(report.next.eyebrow)}</p>
          <div>
            <h2>${escapeHtml(report.next.title)}</h2>
            <p>${escapeHtml(report.next.body)}</p>
            <div class="report-share-panel">
              <button class="button button--dark" type="button" data-share-report><span>Share this note</span><i aria-hidden="true">↗</i></button>
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
