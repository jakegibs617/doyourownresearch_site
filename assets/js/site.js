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
  initReveals();
  initMethod();
})();
