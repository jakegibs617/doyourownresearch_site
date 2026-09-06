(function (global) {
  "use strict";

  function normalizeText(value) {
    return String(value ?? "").replace(/\s+/g, " ").trim();
  }

  function addSegment(segments, id, text) {
    const normalized = normalizeText(text);
    if (normalized) segments.push({ id, text: normalized });
  }

  function collectVisualValues(value, parts, key = "") {
    if (value === null || value === undefined || key === "type" || key === "tone" || key === "composite") return;
    if (Array.isArray(value)) {
      value.forEach((item) => collectVisualValues(item, parts));
      return;
    }
    if (typeof value === "object") {
      Object.entries(value).forEach(([childKey, childValue]) => collectVisualValues(childValue, parts, childKey));
      return;
    }
    if (typeof value === "boolean") return;
    const text = normalizeText(value);
    if (text) parts.push(text);
  }

  function visualText(visual, chapterNumber) {
    if (!visual?.type) return "";
    const parts = [`Figure ${chapterNumber}. ${String(visual.type).replaceAll("-", " ")}`];
    collectVisualValues(visual, parts);
    return `${parts.join(". ")}.`;
  }

  function segmentsForReport(report) {
    const segments = [];
    addSegment(segments, "hero:title", report.title);
    addSegment(segments, "hero:deck", report.deck);
    addSegment(segments, "disclosure", `Disclosure. ${report.disclosure}`);
    addSegment(segments, "overview:question", `The question. ${report.question}`);
    addSegment(segments, "overview:answer", `The short answer. ${report.answer}`);
    report.stats.forEach((stat, index) => addSegment(segments, `overview:stat:${index}`, `${stat.value}. ${stat.label}.`));
    addSegment(segments, "overview:thesis", `Thesis. ${report.thesis.statement}`);

    report.chapters.forEach((chapter) => {
      const prefix = `chapter:${chapter.id}`;
      addSegment(segments, `${prefix}:title`, `Chapter ${chapter.number}. ${chapter.title}`);
      addSegment(segments, `${prefix}:lead`, chapter.lead);
      chapter.body.forEach((paragraph, index) => addSegment(segments, `${prefix}:body:${index}`, paragraph));
      if (chapter.pullquote) addSegment(segments, `${prefix}:pullquote`, chapter.pullquote);
      addSegment(segments, `${prefix}:visual`, visualText(chapter.visual, chapter.number));
    });

    const principlesTitle = report.principlesHeading?.title || "What every public dossier must preserve.";
    addSegment(segments, "principles:title", principlesTitle);
    report.principles.forEach((principle, index) => addSegment(segments, `principles:item:${index}`, `Principle ${index + 1}. ${principle}`));

    addSegment(segments, "limitations:title", "What this note does not establish.");
    report.limitations.forEach((limitation, index) => addSegment(segments, `limitations:item:${index}`, `Limitation ${index + 1}. ${limitation}`));

    const sourcesTitle = report.sourcesHeading?.title || "Read the decisions behind the design.";
    addSegment(segments, "sources:title", sourcesTitle);
    if (report.sourcesNote) addSegment(segments, "sources:note", report.sourcesNote);
    report.sources.forEach((source, index) => {
      const tier = source.tier ? ` ${source.tier}.` : "";
      addSegment(
        segments,
        `sources:item:${index}`,
        `Source ${source.number}. ${source.publisher}.${tier} ${source.title}. ${source.note}`
      );
    });

    return segments;
  }

  global.DYOR_NARRATION_CONTENT = Object.freeze({
    normalizeText,
    segmentsForReport,
    visualText
  });
})(typeof window === "object" ? window : globalThis);
