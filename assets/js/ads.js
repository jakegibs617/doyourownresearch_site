(function () {
  "use strict";

  const config = window.DYOR_ADS || {};
  const CLIENT = /^ca-pub-\d{16}$/.test(config.client || "") ? config.client : "";
  const LOADER = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";

  function slotId(container) {
    return (config.slots || {})[container.dataset.adUnit] || "";
  }

  function ensureLoader() {
    if (document.querySelector(`script[src^="${LOADER}"]`)) return;
    const script = document.createElement("script");
    script.async = true;
    script.crossOrigin = "anonymous";
    script.src = `${LOADER}?client=${encodeURIComponent(CLIENT)}`;
    document.head.appendChild(script);
  }

  function mount(container) {
    if (container.dataset.adMounted === "true") return;
    const slot = slotId(container);
    if (!slot) {
      container.remove();
      return;
    }

    const label = document.createElement("span");
    label.className = "ad-slot__label";
    label.textContent = config.label || "Advertisement";

    const unit = document.createElement("ins");
    unit.className = "adsbygoogle";
    unit.style.display = "block";
    unit.dataset.adClient = CLIENT;
    unit.dataset.adSlot = slot;
    unit.dataset.adFormat = "auto";
    unit.dataset.fullWidthResponsive = "true";

    container.replaceChildren(label, unit);
    container.dataset.adMounted = "true";

    ensureLoader();
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      container.remove();
    }
  }

  function mountAds(root) {
    const scope = root || document;
    const containers = [...scope.querySelectorAll("[data-ad-slot-container]")];
    if (!CLIENT || config.enabled !== true) {
      containers.forEach((container) => container.remove());
      return;
    }
    containers.forEach(mount);
  }

  window.DYOR_ADS_MOUNT = mountAds;
  mountAds(document);
})();
