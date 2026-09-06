(function () {
  "use strict";

  // Generated narration is opt-in per report. Reports without an entry here
  // continue to use the reader's installed American English browser voice.
  const slugs = [
    "why-the-verdict-comes-last",
    "flat-earth-the-test-nobody-has-run",
    "illuminati-what-the-police-seized",
    "jfk-the-minute-that-came-late",
    "9-11-the-demolition-and-the-warning",
    "vaccine-sterilization-the-water-that-tested-higher",
    "moon-landing-what-the-mirrors-cannot-prove",
    "mkultra-the-caption-and-the-document"
  ];

  window.DYOR_NARRATION = Object.freeze(Object.fromEntries(slugs.map((slug) => [slug, Object.freeze({
    audio: `assets/audio/michael/${slug}.mp3`,
    cues: `assets/audio/michael/${slug}.cues.json`,
    voice: "Michael",
    language: "en-US"
  })])));
})();
