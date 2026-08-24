(function () {
  "use strict";

  window.DYOR_SITE = {
    name: "Do Your Own Research",
    domain: "doyourownresearch.me",
    repository: "https://github.com/jakegibs617/doyourownresearch",
    publicationRepository: "https://github.com/jakegibs617/doyourownresearch_site",
    strapline: "Research you can take apart.",
    archiveState: "The archive begins with the method.",
    methodSteps: [
      {
        number: "01",
        label: "Bound the question",
        detail: "Define the population, period, geography, terms, and what is deliberately out of scope."
      },
      {
        number: "02",
        label: "Compete explanations",
        detail: "Give the leading story a real opponent and name what would disprove each one."
      },
      {
        number: "03",
        label: "Freeze the evidence",
        detail: "Store and hash source snapshots so every quotation can be checked against the bytes actually read."
      },
      {
        number: "04",
        label: "Attack the leader",
        detail: "Run a separate, separately budgeted falsification pass against the explanation currently winning."
      },
      {
        number: "05",
        label: "Show the uncertainty",
        detail: "Derive confidence from the evidence ledger and publish limitations, contradictions, and open questions."
      }
    ]
  };

  window.DYOR_REPORTS = [
    {
      slug: "why-the-verdict-comes-last",
      kind: "method-note",
      label: "Method note",
      issue: "NOTE 001",
      status: "published",
      featured: true,
      publishedAt: "2026-08-23",
      updatedAt: "2026-08-23",
      readMinutes: 7,
      runId: null,
      title: "Why the verdict comes last.",
      shortTitle: "The verdict comes last",
      deck: "How to investigate a contested claim without asking the reader to trust one more authority.",
      cardLine: "A design note on provenance, pre-registered tests, and conclusions that can survive inspection.",
      question: "How do you investigate a contested claim when distrust of authority is part of the claim itself?",
      answer: "Publish the path, not just the destination. Lead with where the claim came from, state what it predicts before searching, test those predictions, and let the reader reach the verdict after the evidence.",
      disclosure: "This is a design note about the DYOR method, not an empirical research report.",
      accent: "lime",
      tags: ["Method", "Contested claims", "Provenance"],
      scope: {
        audience: "The genuinely uncertain reader—and the person who may revisit a claim quietly later.",
        focus: "The publication design for contested claims where institutional authority is itself disputed.",
        excluded: "A claim that the method has been empirically proven to change minds. That evidence is contested and this note does not pretend otherwise."
      },
      stats: [
        { value: "7", label: "accepted design decisions" },
        { value: "18", label: "stages in the full method" },
        { value: "0", label: "verdicts before the work" }
      ],
      thesis: {
        label: "The design decision",
        statement: "The public output is a method transcript. A verdict may appear at the end, but it cannot do the work of the evidence that precedes it.",
        status: "design rationale"
      },
      chapters: [
        {
          id: "trust-problem",
          number: "01",
          eyebrow: "The trust problem",
          title: "A verdict is only persuasive if the reader already accepts the referee.",
          lead: "Opening with “unsupported, confidence high” repeats the structure that made the question contested in the first place: an institution asks the reader to accept its conclusion.",
          body: [
            "That shortcut works when the reader already grants the institution. It fails precisely where DYOR is intended to help: a claim arrives wrapped in distrust, and another summary cannot dissolve that distrust by sounding more certain.",
            "The useful output is therefore not a better pronouncement. It is a path the reader can walk: origin, retelling, prediction, test, observation, contradiction, and only then conclusion. The reader should be able to locate the exact step where their own judgment diverges."
          ],
          pullquote: "Make the reasoning inspectable enough that disagreement has an address.",
          visual: {
            type: "verdict-shift",
            before: ["VERDICT", "confidence badge", "sources below"],
            after: ["PROVENANCE", "PREDICTIONS", "TESTS", "EVIDENCE", "VERDICT"]
          }
        },
        {
          id: "provenance",
          number: "02",
          eyebrow: "Follow the claim",
          title: "Start with provenance, because repetition can impersonate corroboration.",
          lead: "A claim seen on hundreds of sites may still descend from one original statement. Host count tells you how far it traveled, not how many independent observations support it.",
          body: [
            "The dossier reconstructs where the claim originated and what each retelling added or dropped. Sources collapse by their earliest identifiable origin, not by domain. Four hundred paraphrases of one blog post still count as one origin family.",
            "This is more than citation hygiene. It changes confidence. Untraced provenance cannot silently become independence, so sources with unknown origins never raise the confidence level and cap it at moderate."
          ],
          visual: {
            type: "origin-map",
            origin: "1 original statement",
            branches: ["News recap", "Video retelling", "Forum thread", "Newsletter", "400 URLs"],
            conclusion: "1 origin family"
          }
        },
        {
          id: "preregister",
          number: "03",
          eyebrow: "Decide before looking",
          title: "Write down what the claim predicts before running the search.",
          lead: "A failed search means something only if the expected observation and the place it should appear were named in advance.",
          body: [
            "For every required condition, DYOR registers a probe: what should be findable if the explanation is true, and where a researcher should be able to find it. Only after registration can the probe resolve to found, not found, or unsearchable.",
            "The distinction matters. Not found can become evidence of absence when the test was genuinely diagnostic. Unsearchable is not a negative result; it means the test could not be run. Collapsing those outcomes would reward a hypothesis for evidence nobody was able to look for."
          ],
          visual: {
            type: "probe",
            condition: "A required condition the explanation depends on",
            prediction: "The specific trace that should exist if it holds",
            venue: "The named place where that trace should be visible",
            outcomes: [
              { label: "FOUND", tone: "positive", note: "Evidence resolves back to stored bytes" },
              { label: "NOT FOUND", tone: "negative", note: "Potential evidence of absence" },
              { label: "UNSEARCHABLE", tone: "neutral", note: "No verdict on the condition" }
            ]
          }
        },
        {
          id: "conditions",
          number: "04",
          eyebrow: "Expose the burden",
          title: "A large claim is often a stack of smaller conditions hiding inside one sentence.",
          lead: "The data existed. The people involved knew. Nobody spoke. The oversight process failed. The records disappeared. Every condition must hold, but the claim usually presents them as one seamless story.",
          body: [
            "DYOR enumerates those conditions instead of inventing a probability for the whole claim. Each condition gets its own subquestion and can receive its own probe.",
            "This makes the weakest link visible. It also avoids false precision: a narrated prior moves the argument onto the number, while a named condition gives the reader something concrete to inspect."
          ],
          visual: {
            type: "condition-chain",
            items: [
              { label: "Condition A", state: "supported" },
              { label: "Condition B", state: "supported" },
              { label: "Condition C", state: "weak link" },
              { label: "Condition D", state: "unknown" }
            ]
          }
        },
        {
          id: "confidence",
          number: "05",
          eyebrow: "No narrated certainty",
          title: "Confidence is computed from a ledger, not typed into a paragraph.",
          lead: "A badge can hide the thing a reader most needs to know: whether ten citations represent ten independent origins or one story repeated ten times.",
          body: [
            "The confidence assessment stores its inputs: supporting passages, distinct origin families, untraced sources, and whether counter-evidence was found. The level is derived from those ingredients.",
            "The public report should show the ingredients beside the level. The reader can then disagree with a source, an origin link, or an evidentiary bearing without having to reject a mysterious score."
          ],
          visual: {
            type: "confidence-ledger",
            inputs: [
              { value: "03", label: "supporting passages" },
              { value: "02", label: "distinct origins" },
              { value: "01", label: "untraced source" },
              { value: "YES", label: "counter-evidence found" }
            ],
            output: "MODERATE",
            note: "Illustrative inputs—not a finding from a live report."
          }
        },
        {
          id: "public-output",
          number: "06",
          eyebrow: "The publication promise",
          title: "A report should be fast to read and slow to exhaust.",
          lead: "The first pass gives the question, scope, current state of knowledge, key findings, and uncertainty. Every important claim then opens into the evidence and reasoning beneath it.",
          body: [
            "Progressive disclosure is not a way to hide complexity. It is how a public site respects both readers: the person who needs the shape of the answer and the person who wants to reconstruct it from the source ledger.",
            "Finished reports will carry the full chain: bounded question, definitions, competing explanations, pre-registered probes, source provenance, verified excerpts, evidentiary bearings, contradictions, findings typed as observed or inferred, derived confidence, limitations, and open questions."
          ],
          pullquote: "Readable in minutes. Auditable for hours.",
          visual: {
            type: "report-layers",
            layers: [
              { label: "01 / READ", detail: "Question, answer, findings, uncertainty" },
              { label: "02 / INSPECT", detail: "Competing explanations, tests, contradictions" },
              { label: "03 / AUDIT", detail: "Passages, snapshots, provenance, source ledger" }
            ]
          }
        }
      ],
      principles: [
        "The transcript leads; the verdict waits.",
        "A finding names whether it is observed, inferred, hypothesized, or unknown.",
        "Every quotation resolves to a stored, content-hashed source snapshot.",
        "Evidence is scored against every live explanation—including the ones it damages.",
        "What the research could not establish is part of the report."
      ],
      limitations: [
        "This note describes accepted product and methodology decisions; it does not demonstrate that the method changes beliefs.",
        "The upstream research system is still implementing its 18-stage design. Finished empirical dossiers are not yet being published here.",
        "Some beliefs serve identity or community functions. Better evidence may not be the mechanism that changes them."
      ],
      sources: [
        {
          number: "01",
          title: "Design decisions for the contested claim",
          publisher: "Do Your Own Research repository",
          href: "https://github.com/jakegibs617/doyourownresearch/blob/main/docs/contested-claims.md",
          note: "Accepted decisions on transcript-first output, probes, provenance, confidence, and scope."
        },
        {
          number: "02",
          title: "Deep-research methodology",
          publisher: "Do Your Own Research repository",
          href: "https://github.com/jakegibs617/doyourownresearch/blob/main/idea.md",
          note: "The 18-stage process and traceable output structure."
        },
        {
          number: "03",
          title: "Structural constraints and implementation status",
          publisher: "Do Your Own Research repository",
          href: "https://github.com/jakegibs617/doyourownresearch/blob/main/README.md",
          note: "The system’s falsification, snapshot, evidence, and confidence guarantees."
        }
      ],
      next: {
        eyebrow: "What comes next",
        title: "The first empirical report will ship when the complete reasoning chain can ship with it.",
        body: "No plausible placeholder verdicts. No report card without the evidence ledger. Until then, the site will document the method and build the publication contract in public."
      }
    }
  ];
})();
