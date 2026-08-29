(function () {
  "use strict";

  document.documentElement.classList.add("js");

  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const siteNav = document.querySelector("[data-site-nav]");
  const methodShell = document.querySelector("[data-method-shell]");
  const methodSteps = window.DYOR_SITE?.methodSteps || [];

  function setYear() {
    document.querySelectorAll("[data-year]").forEach((node) => {
      node.textContent = String(new Date().getFullYear());
    });
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function reportHref(report) {
    return `report.html?report=${encodeURIComponent(report.slug)}`;
  }

  function coverPlate(report) {
    const cover = report.cover;
    const lines = cover.lines.map((line, index) => {
      if (index < cover.lines.length - 1) return escapeHtml(line);
      const words = String(line).trim().split(/\s+/);
      const last = words.pop();
      const head = words.length ? `${escapeHtml(words.join(" "))} ` : "";
      return `${head}<em>${escapeHtml(last)}</em>`;
    }).join("<br>");

    return `<a class="report-cover" href="${escapeHtml(reportHref(report))}">
      <div class="report-cover__top"><span>${escapeHtml(report.label)}</span><span>${escapeHtml(cover.serial)}</span></div>
      <div class="report-cover__field">
        <span class="cover-index">${escapeHtml(cover.index)}</span>
        <span class="cover-orbit" aria-hidden="true"><i></i><i></i><i></i></span>
        <strong>${lines}</strong>
      </div>
      <div class="report-cover__bottom"><span>${escapeHtml(cover.footer)}</span><span class="cover-arrow" aria-hidden="true">↗</span></div>
    </a>`;
  }

  function padStat(value) {
    return /^\d$/.test(String(value)) ? `0${value}` : String(value);
  }

  function featuredSummary(report) {
    const href = escapeHtml(reportHref(report));
    const facts = (report.stats || []).map((stat) => `<div><strong>${escapeHtml(padStat(stat.value))}</strong><span>${escapeHtml(stat.label)}</span></div>`).join("");
    return `<article class="report-summary">
      <div class="report-summary__meta">
        <span>Featured / ${escapeHtml(report.issue)}</span>
        <span>${escapeHtml(report.readMinutes)} min read</span>
      </div>
      <p class="eyebrow">${escapeHtml(report.label)}</p>
      <h3><a href="${href}">${escapeHtml(report.title)}</a></h3>
      <p class="report-summary__deck">${escapeHtml(report.deck)}</p>
      <div class="report-summary__facts">${facts}</div>
      <a class="button button--outline" href="${href}"><span>Open the ${escapeHtml(report.kind === "report" ? "dossier" : "note")}</span><i aria-hidden="true">↗</i></a>
    </article>`;
  }

  function archiveCard(report) {
    return `<a class="archive-card" href="${escapeHtml(reportHref(report))}">
      <div class="archive-card__meta"><span>${escapeHtml(report.issue)}</span><span>${escapeHtml(report.readMinutes)} min</span></div>
      <h3>${escapeHtml(report.shortTitle || report.title)}</h3>
      <p>${escapeHtml(report.cardLine || report.deck)}</p>
      <span class="archive-card__more">Open ↗</span>
    </a>`;
  }

  function renderArchive() {
    const reports = (Array.isArray(window.DYOR_REPORTS) ? window.DYOR_REPORTS : [])
      .filter((report) => report.status === "published");
    if (reports.length === 0) return;

    const featured = reports.find((report) => report.featured) || reports[0];
    const featuredMount = document.querySelector("[data-featured-report]");
    if (featuredMount && featured.cover) {
      featuredMount.innerHTML = `${coverPlate(featured)}${featuredSummary(featured)}`;
    }

    const rest = reports
      .filter((report) => report !== featured)
      .sort((a, b) => String(b.publishedAt).localeCompare(String(a.publishedAt)));
    const gridMount = document.querySelector("[data-archive-grid]");
    if (gridMount) {
      if (rest.length === 0) gridMount.remove();
      else gridMount.innerHTML = rest.map(archiveCard).join("");
    }

    const next = window.DYOR_SITE?.archiveNext;
    const nextMount = document.querySelector("[data-archive-next]");
    if (nextMount && next) {
      nextMount.innerHTML = `<div class="archive-next__number">${escapeHtml(next.number)}</div>
        <div><p class="eyebrow">${escapeHtml(next.eyebrow)}</p><h3>${escapeHtml(next.title)}</h3></div>
        <p>${escapeHtml(next.body)}</p>
        <span class="status-pill">${escapeHtml(next.status)}</span>`;
    }
  }

  function initHeader() {
    if (!header) return;

    let lastStuck = false;
    const update = () => {
      const threshold = Math.min(window.innerHeight * 0.72, 700);
      const shouldStick = window.scrollY > threshold;
      if (shouldStick === lastStuck) return;
      lastStuck = shouldStick;
      header.classList.toggle("is-stuck", shouldStick);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  function closeMenu() {
    document.body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }

  function initMenu() {
    if (!menuToggle || !siteNav) return;

    menuToggle.addEventListener("click", () => {
      const opening = !document.body.classList.contains("menu-open");
      document.body.classList.toggle("menu-open", opening);
      menuToggle.setAttribute("aria-expanded", String(opening));
    });

    siteNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  function initReveals() {
    const nodes = [...document.querySelectorAll("[data-reveal]")];
    if (!nodes.length) return;

    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    nodes.forEach((node, index) => {
      if (index < 5) node.style.transitionDelay = `${Math.min(index * 70, 210)}ms`;
      observer.observe(node);
    });
  }

  function initMethod() {
    if (!methodShell || methodSteps.length === 0) return;

    const buttons = [...methodShell.querySelectorAll("[data-method-step]")];
    const numberNode = methodShell.querySelector("[data-method-number]");
    const titleNode = methodShell.querySelector("[data-method-title]");
    const detailNode = methodShell.querySelector("[data-method-detail]");
    const visualLetter = methodShell.querySelector(".method-display__visual b");
    const visualLetters = ["Q", "H", "E", "×", "?"];
    const visualLabels = ["SCOPE", "HYPOTHESES", "SNAPSHOT", "FALSIFY", "UNCERTAINTY"];

    function activate(index) {
      const step = methodSteps[index];
      if (!step) return;

      buttons.forEach((button, buttonIndex) => {
        const active = buttonIndex === index;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });
      methodShell.dataset.activeStep = String(index);
      if (numberNode) numberNode.textContent = `STEP ${step.number} / ${visualLabels[index]}`;
      if (titleNode) titleNode.textContent = step.label;
      if (detailNode) detailNode.textContent = step.detail;
      if (visualLetter) visualLetter.textContent = visualLetters[index];
    }

    buttons.forEach((button, index) => {
      button.addEventListener("click", () => activate(index));
      button.addEventListener("mouseenter", () => activate(index));
      button.addEventListener("focus", () => activate(index));
    });

    activate(0);
  }

  setYear();
  initHeader();
  initMenu();
  renderArchive();
  initReveals();
  initMethod();
})();
