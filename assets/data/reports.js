(function () {
  "use strict";

  window.DYOR_SITE = {
    name: "Do Your Own Research",
    domain: "doyourownresearch.me",
    strapline: "Research you can take apart.",
    archiveState: "One method note, six research dossiers.",
    archiveNext: {
      number: "008",
      eyebrow: "Next in the archive",
      title: "The next contested claim.",
      body: "The series continues through the most widely held conspiracy theories, one run per claim, each published with its empty searches and its own score intact.",
      status: "In research"
    },
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
      featured: false,
      publishedAt: "2026-08-23",
      updatedAt: "2026-08-23",
      readMinutes: 7,
      runId: null,
      title: "Why the verdict comes last.",
      shortTitle: "The verdict comes last",
      cover: {
        index: "DYOR—001",
        serial: "001 / 2026",
        lines: ["THE", "VERDICT", "COMES LAST."],
        footer: "Provenance → predictions → tests → evidence"
      },
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
      principlesHeading: {
        eyebrow: "Report standard",
        title: "What every public dossier must preserve."
      },
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
          publisher: "Do Your Own Research method record",
          note: "Accepted decisions on transcript-first output, probes, provenance, confidence, and scope."
        },
        {
          number: "02",
          title: "Deep-research methodology",
          publisher: "Do Your Own Research method record",
          note: "The 18-stage process and traceable output structure."
        },
        {
          number: "03",
          title: "Structural constraints and implementation status",
          publisher: "Do Your Own Research method record",
          note: "The system’s falsification, snapshot, evidence, and confidence guarantees."
        }
      ],
      next: {
        eyebrow: "What comes next",
        title: "The first empirical dossier is published, and it scored itself 14 out of 100.",
        body: "Dossier 002 puts this method against a live contested claim. It reaches no verdict, prints its five empty searches as empty, and shows the arithmetic behind its own low score."
      }
    },

    {
      slug: "flat-earth-the-test-nobody-has-run",
      kind: "report",
      label: "Research dossier",
      issue: "DOSSIER 002",
      status: "published",
      featured: false,
      publishedAt: "2026-08-28",
      updatedAt: "2026-08-28",
      readMinutes: 12,
      runId: "b0892f4e-ee2d-4218-9200-0d8fa423d4fb",
      title: "Flat Earth, and the test nobody has run.",
      shortTitle: "Flat Earth",
      deck: "Five explanations, nine attacks on its own findings, five searches that came back empty — and a score of 14 out of 100, published as written.",
      cardLine: "A research run on flat-earth belief that reaches no verdict, and shows every reason it could not.",
      question: "To what extent, and among which populations, has belief in a flat Earth (as opposed to a round/globe Earth) persisted or grown in the modern era, and what factors explain its persistence?",
      answer: "Roughly 2% of Americans and 3% of Britons firmly endorse it, and the reading with the most supporting passages is that pre-existing disposition — distrust, religiosity, conspiracy mentality — underlies the belief while platforms determine its reach. But every one of the eight findings computed to a confidence of unknown, and the study that would decide between disposition and platform has not been done.",
      disclosure: "This run investigated why people hold flat-earth belief. It placed the shape of the Earth out of scope before searching, so nothing in this record bears on that question either way.",
      accent: "red",
      tags: ["Conspiracy belief", "Survey measurement", "Falsification"],
      cover: {
        index: "DYOR—002",
        serial: "002 / 2026",
        lines: ["FLAT", "EARTH", "SCORED 14/100."],
        footer: "Five explanations → nine attacks → what was left"
      },
      transcript: {
        href: "assets/reports/dyor-b0892f4e-ee2d-4218-9200-0d8fa423d4fb.md",
        label: "Read the full method transcript",
        note: "The complete 1,633-line run record: every search, every verbatim excerpt, every bearing, every snapshot digest. Published unedited so the story above can be checked against it."
      },
      scope: {
        audience: "Anyone weighing the claim — including someone who currently holds it.",
        focus: "Measured prevalence of flat-earth belief since 2015, and the competing explanations for its persistence.",
        excluded: "The shape of the Earth. The scientific validity of flat-earth versus globe-earth claims, and astronomical or geodetic evidence, were both declared out of scope before any source was read."
      },
      stats: [
        { value: "09", label: "attacks on its own findings" },
        { value: "05", label: "searches that returned nothing" },
        { value: "0/15", label: "sources traced to an origin" }
      ],
      thesis: {
        label: "The decision this run refused to make",
        statement: "There is no run-level verdict in this record, and the renderer does not invent one. What follows is what was asked, what was searched, what was read, and what each passage did to each explanation — so the adjudication stays with the reader.",
        status: "no run-level verdict"
      },
      chapters: [
        {
          id: "boundary",
          number: "01",
          eyebrow: "The boundary",
          title: "This run was never asked whether the Earth is flat.",
          lead: "The question it was given was about people: how many hold the belief, in which populations, and what explains its persistence. The shape of the Earth was placed out of scope before the first search ran.",
          body: [
            "That exclusion is written into the run's own scope. The scientific validity or factual truth of flat-earth versus globe-earth claims, and the astronomical or geodetic evidence for Earth's shape, were both named out of bounds. Nothing downstream went looking, so nothing downstream can report.",
            "It is stated first for a reason. A reader who arrived expecting to be argued at should know within one screen that this page carries no such argument. What it carries is the record of how a research run treated five competing explanations for the belief — and what happened when the run turned on itself."
          ],
          pullquote: "Nothing in this record bears on the shape of the Earth. The run never looked.",
          visual: {
            type: "scope-boundary",
            askedLabel: "What was asked",
            asked: [
              "How many people hold the belief",
              "In which populations, and where",
              "Whether it grew after 2015",
              "What explains its persistence"
            ],
            excludedLabel: "Declared out of scope",
            excluded: [
              "Whether the Earth is flat",
              "Astronomical or geodetic evidence",
              "Conspiracy belief in general",
              "Platform moderation policy"
            ],
            note: "Period: approximately 2015 to present. Geography: not bounded by default."
          }
        },
        {
          id: "explanations",
          number: "02",
          eyebrow: "Competing explanations",
          title: "Five explanations, and the sentence that would kill each one.",
          lead: "Before any source was read, the run wrote down five rival accounts of flat-earth belief — and for every one, the specific observation that would destroy it, plus where a researcher should be able to look for that observation.",
          body: [
            "This is the part that makes everything after it checkable. An explanation with no stated way to lose cannot be tested, only asserted; it absorbs every empty search as further proof of concealment. Each of these five was handed a way to lose in advance.",
            "The counts beside them are unweighted on purpose. No weighting scheme has been argued anywhere in this system, and an invented one would let a journal's prestige quietly outvote the passage itself. Twenty-eight passages declared a bearing on each explanation. H4 is worth pausing on: not one passage moved it in either direction."
          ],
          visual: {
            type: "hypothesis-roster",
            scale: ["++", "+", "0", "-", "--"],
            items: [
              {
                id: "H1",
                claim: "A sincere 1–3% minority holds the belief, and the level has been roughly stable since 2015.",
                falsifier: "Repeated survey waves with consistent wording showing a real trend in either direction.",
                counts: [0, 2, 24, 2, 0]
              },
              {
                id: "H2",
                claim: "Poll figures are inflated by trolling and contrarian answering; sincere belief is under 1%.",
                falsifier: "Validated insincerity screening that reproduces the headline rate anyway.",
                counts: [0, 1, 25, 2, 0]
              },
              {
                id: "H3",
                claim: "Belief and organised activity genuinely grew after 2015, driven by platform recommendation.",
                falsifier: "Activity flat or falling after platforms demoted the content.",
                counts: [0, 8, 19, 1, 0]
              },
              {
                id: "H4",
                claim: "The apparent growth is an artifact of new measurement and increased media coverage.",
                falsifier: "Pre-2015 measurement showing comparable prevalence when equivalent instruments existed.",
                counts: [0, 0, 28, 0, 0]
              },
              {
                id: "H5",
                claim: "Disposition drives the belief; platforms are only a distribution vector, not a root cause.",
                falsifier: "Exposure predicting new belief after controlling for distrust, epistemic style and identity.",
                counts: [0, 16, 9, 3, 0]
              }
            ],
            note: "28 passages declared a bearing on each explanation. Counts are unweighted by source tier."
          }
        },
        {
          id: "attack",
          number: "03",
          eyebrow: "Falsification",
          title: "Then a second pass went looking for evidence that the run was wrong.",
          lead: "Nine adversarial searches were run against the run's own explanations, each aimed at the observation that would break one. Four came back holding something. Five came back with nothing at all — and are printed here as nothing.",
          body: [
            "Four of the nine returned a snapshot-bound, verified counter-passage: a yield of 44%. Two of the passages they brought back damage the very reading the run would end up favouring. The other five are recorded as searches that ran and returned empty, because a blank that gets quietly dropped is indistinguishable from a search nobody performed.",
            "One caveat the run states against itself, and it matters. No probe was pre-registered. A probe states, before a search runs, what should be findable and where; only that turns an empty result into evidence of absence. Without one, none of the five blanks below counts as evidence that the thing is not there — only that this run did not find it."
          ],
          pullquote: "Five searches came back empty. They are printed as empty.",
          visual: {
            type: "attack-log",
            items: [
              { target: "H1", looked: "Survey waves tracking flat-earth belief across multiple years", outcome: "returned" },
              { target: "H1", looked: "Longitudinal polling showing changing prevalence rates", outcome: "returned" },
              { target: "H2", looked: "Studies of trolling and insincere responding in flat-earth polling", outcome: "empty" },
              { target: "H2", looked: "Interview or behavioural validation of sincere belief", outcome: "empty" },
              { target: "H3", looked: "Effect of YouTube's 2019 algorithm change on flat-earth belief", outcome: "returned" },
              { target: "H3", looked: "Declining conference attendance or membership figures", outcome: "returned" },
              { target: "H4", looked: "Pre-2015 polls measuring flat-earth belief", outcome: "empty" },
              { target: "H4", looked: "Whether belief growth preceded media coverage", outcome: "empty" },
              { target: "H5", looked: "Experimental exposure inducing belief without prior conspiratorial ideation", outcome: "empty" }
            ],
            footer: "4 of 9 adversarial searches yielded a verified counter-passage (44.44%)."
          }
        },
        {
          id: "numbers",
          number: "04",
          eyebrow: "The measured numbers",
          title: "The figures that look contradictory are measuring different questions.",
          lead: "Two per cent. Three per cent. Ten per cent. Sixty-six per cent. Published figures on flat-earth belief appear to disagree by an order of magnitude. Read with their question wording attached, they stop disagreeing.",
          body: [
            "The 2% is Americans who “resolutely” say the Earth is flat. The 3% is Britons saying it is probably or definitely true, against 93% who say it is false. The 10% is a different instrument entirely: a composite counting agreement with any of three separate claims — flat Earth, faked Moon landings, or vaccine microchips.",
            "The same graded structure appears inside a single poll. 84% of Americans say the Earth is round; a further 5% say they used to believe that and now have doubts; and only 66% of millennials hold the round-Earth answer firmly. A headline number indexes how much firmness the instrument demanded and how many claims it bundled together — not how much of the public disagrees.",
            "None of this settles whether the answers are sincere, and the run says so plainly. The claim that trolling inflates these figures received no direct test in this record. What exists is indirect: a sample recruited in person at the first Flat Earth International Conference, about 600 attendees at the third, and conventions held in Brazil, Britain and Italy. Those establish that a sincere core exists. They cannot bound what share of the 2% it accounts for."
          ],
          visual: {
            type: "prevalence-ladder",
            items: [
              { value: 2, wording: "Americans who “resolutely” say the Earth is flat", source: "YouGov US, 2018" },
              { value: 3, wording: "Britons saying it is “probably” or “definitely” true", source: "YouGov UK, 2019" },
              { value: 4, wording: "18–24s who say they believe it — the highest of any age group", source: "YouGov US, 2018" },
              { value: 10, wording: "US adults agreeing with any of three claims: flat Earth, faked Moon landings, or vaccine microchips", source: "Carsey / UNH, 2022", composite: true },
              { value: 66, wording: "Millennials who firmly believe the Earth is round", source: "YouGov US, 2018" },
              { value: 84, wording: "Americans who say the Earth is round", source: "YouGov US, 2018" }
            ],
            note: "The 10% bar is the only composite here. It counts three different beliefs, not one."
          }
        },
        {
          id: "strongest",
          number: "05",
          eyebrow: "The best-supported reading",
          title: "The strongest thing in this ledger, printed with the attack made on it.",
          lead: "One explanation collected far more supporting passages than any other: that pre-existing disposition — distrust, powerlessness, religiosity, conspiracy mentality, a hunger for meaning — underlies the belief. Sixteen passages leaned toward that explanation. Then the run attacked the finding drawn from it.",
          body: [
            "The supporting material is real. In one survey, flat-earthers were more than twice as likely as the general public to call themselves “very religious”: 52% against 20%. Measured against a national sample matched on religiosity and belief in evolution, they scored significantly higher on conspiracy mentality. They also described themselves as more skeptical and more logical than that national sample.",
            "All of it is cross-sectional and correlational. It establishes that these traits travel with the belief. It does not establish that they came first, and the finding is typed as inferred rather than observed for exactly that reason.",
            "The run's own stress test then names the weakness: the profile leans on a narrow set of overlapping review citations and small convenience samples drawn from conference attendees, which may overstate how widespread conspiratorial mentality and religious literalism are among believers generally. The condition under which the finding fails is recorded beside it, in advance, so a reader can watch for it."
          ],
          visual: {
            type: "finding-attack",
            finding: {
              label: "Finding",
              id: "fnd_84dff57408966074_00",
              status: "inferred",
              text: "The only hypothesis with converging multi-source support is that pre-existing psychological and sociological dispositions underlie flat-earth belief. All of it is cross-sectional and correlational, so it supports the existence of these drivers — not their causal priority over platform exposure.",
              meta: "15 passages cited · 3 source families · computed confidence: unknown"
            },
            attack: {
              label: "Attack on it",
              id: "stp_2bf4bf907e31310f_00",
              kind: "source dependence",
              text: "The profile relies heavily on a narrow set of overlapping review citations and small convenience samples from conference attendees, which may overstate the prevalence of conspiratorial mentality and religious literalism across the wider population of believers."
            },
            failureLabel: "Recorded failure condition",
            failure: "Representative psychometric sampling of broader flat-earth adherents indicates substantial segments whose belief is driven by social belonging or informational exposure rather than high baseline conspiracy mentality or religious literalism."
          }
        },
        {
          id: "missing-test",
          number: "06",
          eyebrow: "The open question",
          title: "The study that would settle it has not been done.",
          lead: "The dispute between disposition and platform has an obvious decisive test: does algorithmic exposure predict new belief after controlling for institutional distrust, epistemic style and identity? No evidence in this record addresses it.",
          body: [
            "The platform side reaches only as far as mechanism plausibility. One reviewed paper characterises YouTube visual arguments and Twitter written arguments as having a strong impact on belief, but reports no controls, no randomisation and no longitudinal design. YouTube's own 2019 announcement singles out “claiming the earth is flat” as content its recommender would begin demoting — which names a mechanism, but is a corporate policy statement, not a measurement of anyone's belief changing.",
            "The defensible reading is a two-stage account that neither explanation as written captures: disposition selects who is recruitable, platforms determine who is reached. That reading was itself flagged for attack, because it assumes exposure cannot generate conspiratorial thinking in someone who had none — which nobody has tested either.",
            "This is the honest shape of the answer. Not a verdict between the two, but a named, runnable experiment that nobody in this record has run."
          ],
          pullquote: "Mechanism plausibility is the highest causal criterion the platform side of this ledger reaches.",
          visual: {
            type: "condition-chain",
            items: [
              { label: "Disposition exists and is measurable", state: "supported" },
              { label: "Platform content reaches those people", state: "supported" },
              { label: "Exposure causes belief in the unpredisposed", state: "weak link" },
              { label: "Which of the two comes first", state: "unknown" }
            ]
          }
        },
        {
          id: "score",
          number: "07",
          eyebrow: "The score",
          title: "It scored itself 14 out of 100, and printed the arithmetic.",
          lead: "Eight findings were asserted. Every one of them computed to a confidence of unknown. The overall evidence score came to 14 out of 100, and the four numbers it was made from are printed beside it.",
          body: [
            "Corroboration scored zero because zero of fifteen source snapshots could be traced to an upstream origin, and provenance scored zero for the same reason. Unknown provenance is unknown independence: four hundred pages paraphrasing one blog post are one source, and a source whose origin was never established cannot be told apart from an original one.",
            "Falsification scored 17 of 20 — the counter-search genuinely ran, and genuinely returned things. Saturation scored zero: the second retrieval round found nine source families, of which seven were new, so the search was nowhere near exhausted when it stopped.",
            "The score is not a probability, and the run says so. There are no calibrated priors and no likelihood model here, and an ordinal matrix of pluses and minuses cannot honestly be converted into a percentage. A reader who rejects the weighting still has every count it was made from."
          ],
          visual: {
            type: "score-breakdown",
            components: [
              { label: "Corroboration", value: 0, max: 40, note: "0 of 15 sources traced to an origin" },
              { label: "Provenance", value: 0, max: 25, note: "unknown origin is unknown independence" },
              { label: "Falsification", value: 17, max: 20, note: "4 of 9 counter-searches returned" },
              { label: "Saturation", value: 0, max: 15, note: "7 of 9 families in round 2 were new" }
            ],
            subtotalLabel: "Components summed",
            subtotal: "17",
            capLabel: "Counter-evidence was found, which caps the unknown band",
            total: "14 / 100",
            confidence: "unknown",
            note: "Not a probability. This run holds no calibrated priors and no likelihood model."
          }
        }
      ],
      principlesHeading: {
        eyebrow: "Take this with you",
        title: "Five checks this run was held to. Use them on anything."
      },
      principles: [
        "Ask what the claim would have to look like to be wrong — and whether anyone wrote that down before they went looking.",
        "Count origins, not links. Four hundred pages repeating one source are one source.",
        "Read the question wording before the percentage. Firmness and bundling move headline numbers more than opinion does.",
        "Ask what the source says it does not state. An honest one will tell you, and most of these did.",
        "Ask whether anyone searched for the evidence that would sink it, and what came back when they did."
      ],
      limitations: [
        "Zero of fifteen source snapshots could be traced to an upstream origin, so nothing here has established independence between its sources.",
        "No probe was pre-registered. Five adversarial searches came back empty, and not one of those blanks counts as evidence of absence.",
        "The search was not saturated. Seven of the nine source families found in the second retrieval round were new, and the run stopped there.",
        "Zero of fifteen assessed sources were classified as primary data. Nothing here is a measurement itself; all of it is a description of one.",
        "Every one of the eight asserted findings computed to a confidence of unknown. That is the honest result, not a missing measurement.",
        "Four subquestions were answered by no passage at all, including cross-national variation and the disagreements between researchers.",
        "The run records no reviewer approval of any stage, and no cost or wall-clock time. Nothing here is a claim that a person checked it."
      ],
      sourcesHeading: {
        eyebrow: "Source record",
        title: "Seven snapshots, and what each one admits it does not say."
      },
      sourcesNote: "Each link is the address that was recorded, printed beside the digest of the bytes that were actually stored. The link is not a guarantee that the address still serves those bytes — the digest is the thing to check a quotation against.",
      sources: [
        {
          number: "01",
          title: "Toward a Cultural Psychology of Conspiracy Theories: A life-narrative analysis of Flat Earthers",
          publisher: "Integrative Psychological and Behavioral Science / Springer",
          tier: "peer reviewed",
          digest: "ee1ed9680f965a91cfb1013dfc9c1c31ab09326f50bd3e9c22b1652d6462029d",
          href: "https://link.springer.com/article/10.1007/s12124-024-09857-5",
          note: "Life-narratives of three self-identified Flat Earthers. Does not state inter-rater reliability, effect sizes, or any quantitative validation of its themes."
        },
        {
          number: "02",
          title: "Conspiracy theorizing and religious motivated reasoning: Why the earth ‘must’ be flat",
          publisher: "Texas Tech University institutional repository",
          tier: "technical report",
          digest: "1dd2c566f23a096b16926c5853fba58fed22a033ab04ec7e3455dfb4bd1e68f1",
          href: "https://ttu-ir.tdl.org/items/29e0c519-6e13-46ef-945d-756cb3a2cc40",
          note: "N=513 online panel against n=23 recruited at the first Flat Earth International Conference. Does not state its statistical methods, funding, or ethics approval."
        },
        {
          number: "03",
          title: "Most flat earthers consider themselves very religious",
          publisher: "YouGov US",
          tier: "technical report",
          digest: "7edbe4b0dd75baf8ca0f06b6e2769162da9e66f75f87aedd1727728973c36c3c",
          href: "https://yougov.com/en-us/articles/20510-most-flat-earthers-consider-themselves-religious",
          note: "Source of the 2%, 4%, 52%, 66% and 84% figures. States no sample size, fieldwork dates, question wording, margin of error, or weighting method."
        },
        {
          number: "04",
          title: "Which science-based conspiracy theories do Britons believe?",
          publisher: "YouGov UK",
          tier: "government institutional",
          digest: "93418c4bd61dc61ab2ca5b2e7ac5bcb6025b6ed5f422d877a99c1416d5383787",
          href: "https://yougov.com/en-gb/articles/22839-which-science-based-conspiracy-theories-do-britons",
          note: "Source of the 3% and the 93% who reject it. States no sample size, fieldwork dates, weighting method, or full question wording."
        },
        {
          number: "05",
          title: "Conspiracy vs. Science: A Survey of U.S. Public Beliefs",
          publisher: "Carsey School of Public Policy, University of New Hampshire",
          tier: "technical report",
          digest: "e636833d6b7880940684ba44f706529bb94797ec0885f90b12377ec7dfe6ffe7",
          href: "https://carsey.unh.edu/publication/conspiracy-vs-science-survey-us-public-beliefs",
          note: "Source of the composite ~10% figure. Says of its own political findings that they are new and in need of replication."
        },
        {
          number: "06",
          title: "Continuing our work to improve recommendations on YouTube",
          publisher: "YouTube Blog",
          tier: "industry commentary",
          digest: "ec438c60b54a091a715eb592bb5d75080f65ae3a69ec9c0477b02049295e2797",
          href: "https://blog.youtube/news-and-events/continuing-our-work-to-improve/",
          note: "Names flat-earth claims as content the recommender would begin demoting. Provides no data, evaluation metrics, or before-and-after comparison for the claim."
        },
        {
          number: "07",
          title: "The flat-Earth conspiracy is spreading around the globe. Does it hide a darker core?",
          publisher: "CNN",
          tier: "quality journalism",
          digest: "afcfe29532e396ed412346e62f039a9fcb02cb82064df3cee20558a5bee0bcc2",
          href: "https://www.cnn.com/2019/11/16/us/flat-earth-conference-conspiracy-theories-scli-intl",
          note: "Source of the ~600 conference attendees figure. Frames a darker organised core but presents anecdote and expert commentary rather than systematic evidence for it."
        }
      ],
      next: {
        eyebrow: "Your turn",
        title: "Now run the same five checks on whatever convinced you.",
        body: "This page reached no verdict, so there is nothing here to take on faith. The whole run is published unedited — every search, every excerpt, every digest — so the story above can be checked against the record it came from. The next dossier takes the same method to the next contested claim."
      }
    },

    {
      slug: "illuminati-what-the-police-seized",
      kind: "report",
      label: "Research dossier",
      issue: "DOSSIER 003",
      status: "published",
      featured: false,
      publishedAt: "2026-08-28",
      updatedAt: "2026-08-28",
      readMinutes: 14,
      runId: "b93368ba-e825-4eac-bc68-61622b856d40",
      title: "The Illuminati, and what the police seized in 1786.",
      shortTitle: "The Illuminati",
      deck: "Four explanations of where the New World Order narrative came from, one of them killed by the run's own counter-search, and a documentary record that runs out in 1793.",
      cardLine: "Where the New World Order story came from — traced through the archive, not adjudicated.",
      question: "What is the historical origin and content of conspiracy theories alleging that the Illuminati (or a successor secret group) is orchestrating a 'New World Order' to establish global totalitarian control, and how have these theories spread and evolved over time?",
      answer: "The Bavarian order was banned by ducal edict in 1784 and 1785, its notebooks and Weishaupt's letters were seized by police in 1786, its only continuation lapsed around 1790, and the record describes it as dead with Bode in 1793. Every later body of Illuminati literature postdates that, and the route the run could identify runs through published polemic rather than any surviving organisation. All seven findings still compute to a confidence of unknown.",
      disclosure: "This run traced where the Illuminati/New World Order narrative came from. It placed the question of whether such a group exists or operates today out of scope, so nothing here answers that. It is a history of a story, not a verdict on present-day power.",
      accent: "blue",
      tags: ["Historiography", "Provenance", "Conspiracy narrative"],
      cover: {
        index: "DYOR—003",
        serial: "003 / 2026",
        lines: ["THE", "ILLUMINATI", "1776—1793."],
        footer: "Banned → raided → reprinted → retold"
      },
      transcript: {
        href: "assets/reports/dyor-b93368ba-e825-4eac-bc68-61622b856d40.md",
        label: "Read the full method transcript",
        note: "The complete 2,007-line run record: every search, every verbatim excerpt, every bearing, every snapshot digest. Published unedited so the story above can be checked against it."
      },
      scope: {
        audience: "Anyone weighing the claim — including someone who currently holds it.",
        focus: "The origin, content and transmission of Illuminati/New World Order narratives from 1776 to the present.",
        excluded: "Whether an Illuminati or New World Order actually exists or operates today. That was declared out of scope before any source was read, and nothing here bears on it."
      },
      stats: [
        { value: "1793", label: "last year the record accounts for" },
        { value: "08", label: "attacks on its own findings" },
        { value: "0/17", label: "sources traced to an origin" }
      ],
      thesis: {
        label: "The decision this run refused to make",
        statement: "There is no run-level verdict in this record, and the renderer does not invent one. The run was not asked whether a secret elite governs the world, and it did not look. It was asked where the story came from, and it can show you what it read.",
        status: "no run-level verdict"
      },
      chapters: [
        {
          id: "boundary",
          number: "01",
          eyebrow: "The boundary",
          title: "This run was never asked whether the Illuminati exists today.",
          lead: "It was asked where the narrative came from: its origin, its content, and how it spread and changed. Whether a secret group currently runs the world was placed out of scope before the first search, and no evidence here bears on it.",
          body: [
            "That distinction is worth holding onto, because it is easy to collapse. Showing that an eighteenth-century Bavarian society was banned and its papers confiscated is not the same as showing that no powerful people ever coordinate in private. The run makes the first kind of claim. It makes no claim of the second kind at all, and a reader should refuse to let this page imply one.",
            "What it can do is follow a specific question that has an archive behind it: what happened to the organisation founded in 1776, and what is the actual route from it to the literature that invokes its name today. Both of those leave documentary traces, and traces can be checked."
          ],
          pullquote: "Nothing here says no one conspires. It says where this particular story came from.",
          visual: {
            type: "scope-boundary",
            askedLabel: "What was asked",
            asked: [
              "Where the narrative originated",
              "What it actually claims",
              "How it spread and changed",
              "Who carried it between eras"
            ],
            excludedLabel: "Declared out of scope",
            excluded: [
              "Whether an Illuminati exists today",
              "Whether a New World Order operates",
              "The order's own Enlightenment philosophy",
              "Why people believe conspiracies generally"
            ],
            note: "Period: 1776 to the present. Geography: global, focused on Europe and the United States."
          }
        },
        {
          id: "explanations",
          number: "02",
          eyebrow: "Competing explanations",
          title: "Four explanations, and the one the run killed.",
          lead: "Before any source was read, the run wrote down four rival accounts of the tradition — and for each, the observation that would destroy it. Forty-eight passages went on to declare a bearing on every one of them.",
          body: [
            "The first is the claim believers actually make: real continuity, a chain of people or documents running from 1776 to now. It ended with no supporting passages at all, seven against it, and one flatly refuting it — the only double-negative bearing anywhere in the run.",
            "The third explanation was the run's own, and the run destroyed it. H3 proposed that welding 'New World Order' to Illuminati conspiracism was a post-1990 phenomenon triggered by George H. W. Bush's Gulf War speeches. The counter-search found the exact phrase in explicitly conspiratorial use decades earlier, and H3 collected four refuting bearings. It is listed here as falsified, not quietly dropped.",
            "The fourth splits. Its strong form — that this is merely a loose family of unrelated theories sharing an eye-and-pyramid aesthetic — fails, because proponents demonstrably cross-cite each other across eras. Its weak form survives: what they share is a rhetorical template, not a doctrine."
          ],
          visual: {
            type: "hypothesis-roster",
            scale: ["++", "+", "0", "-", "--"],
            items: [
              {
                id: "H1",
                claim: "Genuine continuity: people, documents or lodges carried the real order forward into modern theories.",
                falsifier: "The order was thoroughly suppressed with no documented continuation past the 1790s.",
                counts: [0, 0, 40, 7, 1]
              },
              {
                id: "H2",
                claim: "Discursive reinvention: each era rebuilt the narrative from earlier published texts and its own anxieties.",
                falsifier: "Theorists building on each other's non-public claims or shared organisational networks.",
                counts: [0, 39, 9, 0, 0]
              },
              {
                id: "H3",
                claim: "The 'New World Order' fusion is post-1990, triggered by Bush's Gulf War speeches.",
                falsifier: "The exact phrase used conspiratorially, linked to the Illuminati, before 1990.",
                counts: [0, 3, 41, 0, 4]
              },
              {
                id: "H4",
                claim: "Overstated unity: a loose family of unrelated theories sharing only surface symbolism.",
                falsifier: "Proponents explicitly cross-referencing each other's work as one ongoing narrative.",
                counts: [1, 24, 13, 10, 0]
              }
            ],
            note: "48 passages declared a bearing on each explanation. H3 was falsified as stated by the run's own counter-search."
          }
        },
        {
          id: "record",
          number: "03",
          eyebrow: "The archive",
          title: "What the record says happened to the order that was actually founded.",
          lead: "There was a real Order of the Illuminati. It was founded in Bavaria in 1776, and the state that banned it kept paperwork. That paperwork is the reason this chapter can be specific where the rest of the tradition cannot.",
          body: [
            "Intra-Masonic disputes became complaints to the Duke of Bavaria, who issued an edict on 22 June 1784 prohibiting all secret societies not authorised by the government. The Illuminati suspended work in Bavaria and petitioned the sovereign in February 1785, claiming they were the victims of a misunderstanding. A second edict followed on 2 March 1785.",
            "Then October 1786. Police raided the house of Zwack in Munich. He had been warned and had left Bavaria, but had no time to destroy the documentation — so the police learned who had founded and directed the order, a subject on which they had until then had fairly vague information, and seized letters from Weishaupt to Zwack along with an extensive collection of notebooks. The order was, in the record's phrase, sentenced to death as an organisation. No member was executed; the longest jail term was three years.",
            "Lodges outside Bavaria suspended activity. Bode alone continued a version known as the Illuminati of Saxony, confined to the first degrees; it was not very successful and probably ceased operating in 1790. With Bode's death in 1793 the Illuminati of Bavaria also died — after which the Bavarian police received false reports of alleged revivals well into the 1810s. Every body of Illuminati literature in this record was written after that."
          ],
          pullquote: "The confiscated papers were published in 1787. This run snapshotted a copy — and cited none of it.",
          visual: {
            type: "timeline",
            items: [
              { date: "1776", label: "Founded", detail: "The Order of the Illuminati is established in Bavaria." },
              { date: "22 Jun 1784", label: "First edict", detail: "The Duke prohibits all secret associations not expressly authorised. The Illuminati suspend work in Bavaria." },
              { date: "24 Feb 1785", label: "Petition", detail: "The order petitions the sovereign, claiming it has been the victim of a misunderstanding." },
              { date: "2 Mar 1785", label: "Second edict", detail: "Duke Karl Theodor responds with a further edict." },
              { date: "Oct 1786", label: "The raid", detail: "Police raid Zwack's house in Munich and seize letters from Weishaupt plus an extensive collection of notebooks.", tone: "seizure" },
              { date: "—", label: "Dissolved", detail: "The order is “sentenced to death” as an organisation. No member is executed; the longest jail term is three years." },
              { date: "1790", label: "Saxony lapses", detail: "Bode's Illuminati of Saxony, the only continuation, probably ceases to operate." },
              { date: "1793", label: "Recorded dead", detail: "With the death of Bode, the Illuminati of Bavaria dies.", tone: "end" },
              { date: "to the 1810s", label: "False revivals", detail: "The Bavarian police receive false reports of alleged revivals.", tone: "after" }
            ],
            note: "Every later body of Illuminati literature in this ledger was written after 1793."
          }
        },
        {
          id: "lineage",
          number: "04",
          eyebrow: "The transmission",
          title: "The chain that does exist runs through print, and the villain changes every time.",
          lead: "If no organisation survived, something still connects a 1797 French polemic to a present-day internet movement. The run's answer is that the connection is bibliographic: each era read the last one and rebuilt the story around whoever it was already afraid of.",
          body: [
            "The scandal itself founded the genre. One peer-reviewed account describes the discovery of the Bavarian Illuminati as laying the foundation for the Masonic conspiracy theory that spread across Europe between 1776 and 1792, and the resulting discourse as becoming a model for later conspiracy theories. Barruel's 1797 Memoirs Illustrating the History of Jacobinism is named as the “conceptual inspiration” for the Protocols of the Elders of Zion.",
            "From there the frame stays and the contents rotate. Antisemitism blended in after the French Revolution, particularly with Barruel's dissemination of the Simonini letter in 1806. The Protocols merged the Masonic and antisemitic strains. Admiral Barry Domvile rebuilt the same world-state motif under the label “Judmas”. Mary Davison traced the plot to the Federal Reserve and the Council on Foreign Relations. Gary Allen attached “New World Order” to a secretive elite destroying national sovereignty. Milton William Cooper added extraterrestrials and a 1954 Eisenhower treaty, then later retracted that part. QAnon integrated religiosity, white supremacy and wellness culture.",
            "Same grammar every time — a hidden inner circle, a staged public government, an imminent revelation — with a different named enemy plugged into it. That recurrence is what the run reads as recombination rather than inheritance."
          ],
          visual: {
            type: "lineage-chain",
            items: [
              { date: "1797", actor: "Augustin Barruel", added: "The French Revolution recast as a Masonic-led conspiracy against the Church." },
              { date: "1806", actor: "The Simonini letter", added: "Antisemitism blends into the anti-Masonic and anti-Illuminati strands." },
              { date: "", actor: "The Protocols", added: "Masonic and antisemitic conspiracy claims merged into one fabricated document." },
              { date: "", actor: "Barry Domvile", added: "“Judmas” — the same world-state motif under a new label." },
              { date: "1966", actor: "Mary M. Davison", added: "The plot anchored to the Federal Reserve and the Council on Foreign Relations." },
              { date: "1971–87", actor: "Gary Allen", added: "“New World Order” as a secretive elite destroying national sovereignty." },
              { date: "1991", actor: "Milton William Cooper", added: "Extraterrestrials and an Eisenhower treaty — a claim he later retracted." },
              { date: "", actor: "QAnon", added: "Satanic pedophilia, white supremacy and wellness culture attached to the same frame." }
            ],
            note: "Dates appear only where this record states one. Four of these eight carry none."
          }
        },
        {
          id: "attack",
          number: "05",
          eyebrow: "Falsification",
          title: "Three of the empty searches were aimed at the explanation that won.",
          lead: "Nine adversarial searches ran against the run's own explanations. Four came back holding something. Five came back with nothing — and three of those five were hunting for evidence that would have damaged H2, the reading the run ended up favouring.",
          body: [
            "The run went looking for an organisational lineage: documentation of the Bavarian order continuing into nineteenth-century secret societies, and occult groups claiming ritual succession from it via Theodor Reuss and the Ordo Templi Orientis. It went looking for evidence that Nesta Webster worked from private insider material rather than published polemic. All three returned nothing.",
            "That is the shape a believer should want to see, and it is also where the run stops short of what it would like to say. No probe was pre-registered — no statement, written before the search, of what should be findable and where. Without one, an empty result cannot be read as evidence of absence. It distinguishes a place someone looked from a place nobody did, and no more.",
            "The four that did return include the two that killed H3, and the archive record of the suppression itself."
          ],
          pullquote: "Five searches returned nothing. Not one of those blanks proves anything, and the run says so.",
          visual: {
            type: "attack-log",
            items: [
              { target: "H1", looked: "Archival evidence on whether the order survived past the 1790s", outcome: "returned" },
              { target: "H1", looked: "Documented organisational lineage into 19th-century secret societies", outcome: "empty" },
              { target: "H2", looked: "Occult groups claiming ritual succession — Reuss, Ordo Templi Orientis", outcome: "empty" },
              { target: "H2", looked: "Whether Nesta Webster drew on private insider transmission", outcome: "empty" },
              { target: "H3", looked: "“New World Order” linked to the Illuminati in print, 1950–1989", outcome: "returned" },
              { target: "H3", looked: "Pre-1990 conspiratorial use by Allen, Carr, Fagan or the Birch Society", outcome: "returned" },
              { target: "H3", looked: "Academic historiography dating the phrase's entry into the discourse", outcome: "empty" },
              { target: "H4", looked: "Scholarship on authors synthesising earlier generations into one tradition", outcome: "empty" },
              { target: "H4", looked: "Robertson citing Webster, the Birch Society and Robison", outcome: "returned" }
            ],
            footer: "4 of 9 adversarial searches yielded a verified counter-passage (44.44%)."
          }
        },
        {
          id: "strongest",
          number: "06",
          eyebrow: "The best-supported reading",
          title: "The strongest finding, printed with the attack made on it.",
          lead: "The run's leading finding is that no organisational or insider-documentary channel existed for later literature to inherit. It is typed observed rather than inferred. Then the run named the way it could be wrong.",
          body: [
            "The attack is precise and fair: that conclusion rests on Bavarian state suppression records and police surveillance reports, and those sources can only see what the Bavarian state could see. Clandestine lodge continuity outside Bavaria, or private transmissions nobody was monitoring, would not appear in them. Absence in a police file is absence from a police file.",
            "The condition under which the finding fails was written down in advance, and it is a specific, findable thing: unbroken private lodge records or esoteric correspondence between 1793 and the 1840s linking Weishaupt's circle to nineteenth-century conspiratorial groups. If that turns up, this finding goes.",
            "The run also flags a related gap it could not close. It does not document what Robison, Webster or Birch Society writers actually worked from, so the literary-reconstruction reading rests on the absence of an organisation rather than on positive source-tracing for those authors."
          ],
          visual: {
            type: "finding-attack",
            finding: {
              label: "Finding",
              id: "fnd_251802dc982d3101_00",
              status: "observed",
              text: "The order was suppressed by ducal edicts of 1784 and 1785, its notebooks and Weishaupt–Zwack correspondence seized by police in 1786 rather than preserved by members, its only continuation lapsed around 1790, and it is described as dead with Bode in 1793 — so no organisational or insider-documentary channel existed for later literature to inherit.",
              meta: "5 passages cited · 1 source family · computed confidence: unknown"
            },
            attack: {
              label: "Attack on it",
              id: "stp_e45422fc110327b7_00",
              kind: "source dependence",
              text: "The conclusion of zero organizational or documentary continuity relies entirely on Bavarian state suppression records and police surveillance reports, which may overlook clandestine underground lodge continuity or unmonitored private transmissions outside Bavaria."
            },
            failureLabel: "Recorded failure condition",
            failure: "Archival discovery of unbroken private lodge records or esoteric correspondence between 1793 and the 1840s linking Weishaupt's circle directly to 19th-century conspiratorial groups."
          }
        },
        {
          id: "score",
          number: "07",
          eyebrow: "The score",
          title: "It scored itself 14 out of 100, on stronger findings than the last one.",
          lead: "Seven findings were asserted, four of them typed observed rather than inferred. Every one still computed to a confidence of unknown, and the evidence score came to the same 14 out of 100.",
          body: [
            "The reason is provenance, and it is the same reason as last time. Zero of seventeen source snapshots reached an upstream origin, so corroboration and provenance both scored zero regardless of how good the underlying history is. Unknown provenance is unknown independence, and the scoring will not let a well-argued reading buy its way past that.",
            "Falsification scored 17 of 20: nine counter-searches ran and four returned. Saturation scored zero — the second retrieval round found seven source families of which six were new, so the search was nowhere near exhausted.",
            "One number here is new. Exactly one of the seventeen sources was classified as primary data: the confiscated Illuminati writings themselves, published in 1787. It contributed no scored passage to any finding, so every conclusion on this page rests on secondary description of that archive rather than on the archive itself."
          ],
          visual: {
            type: "score-breakdown",
            components: [
              { label: "Corroboration", value: 0, max: 40, note: "0 of 17 sources traced to an origin" },
              { label: "Provenance", value: 0, max: 25, note: "unknown origin is unknown independence" },
              { label: "Falsification", value: 17, max: 20, note: "4 of 9 counter-searches returned" },
              { label: "Saturation", value: 0, max: 15, note: "6 of 7 families in round 2 were new" }
            ],
            subtotalLabel: "Components summed",
            subtotal: "17",
            capLabel: "Counter-evidence was found, which caps the unknown band",
            total: "14 / 100",
            confidence: "unknown",
            note: "Not a probability. This run holds no calibrated priors and no likelihood model."
          }
        }
      ],
      principlesHeading: {
        eyebrow: "Take this with you",
        title: "Five checks this run was held to. Use them on anything."
      },
      principles: [
        "Ask what the claim would have to look like to be wrong — then check whether anyone wrote that down before they went looking.",
        "Separate the historical claim from the present-day one. A record can settle what happened in 1786 and say nothing about today.",
        "Follow the citations backwards. If every source leads to the same earlier book, that is one source, not many.",
        "Watch whether the villain changes while the story stays the same. That is the signature of a template, not a discovery.",
        "Ask what the source admits it does not state. Every source on this page was made to answer that."
      ],
      limitations: [
        "Zero of seventeen source snapshots could be traced to an upstream origin, so nothing here has established independence between its sources.",
        "The only primary-data source in the ledger — the confiscated Illuminati writings published in 1787 — contributed no scored passage. Every finding rests on secondary description of the archive rather than the archive itself.",
        "Three Wikipedia articles carry substantial evidentiary weight here, and the run's own tier assessment rates one of them unsupported. Those tiers are printed beside each source below.",
        "The record contradicts itself on one date. The suppression narrative puts the police raid on Zwack's house in October 1786, while the source ledger's note on the confiscated writings refers to a 1785 seizure. Nothing in the run resolves which is right, and the timeline above follows the narrative rather than the ledger note.",
        "No probe was pre-registered. Five adversarial searches came back empty, including three aimed at the winning explanation, and not one of those blanks counts as evidence of absence.",
        "The search was not saturated. Six of the seven source families found in the second retrieval round were new, and the run stopped there.",
        "Nothing here documents what Robison, Webster or Birch Society writers actually read, so the literary-reconstruction account rests on the absence of an organisation rather than on positive source-tracing.",
        "Whether ordinary audiences — as distinct from authors — experienced this as one continuous tradition is untested. Four subquestions were answered by no passage at all.",
        "All seven asserted findings computed to a confidence of unknown. That is the honest result, not a missing measurement."
      ],
      sourcesHeading: {
        eyebrow: "Source record",
        title: "Eleven snapshots, and what each one admits it does not say."
      },
      sourcesNote: "Each link is the address that was recorded, printed beside the digest of the bytes that were actually stored. The link is not a guarantee that the address still serves those bytes — the digest is the thing to check a quotation against.",
      sources: [
        {
          number: "01",
          title: "The Illuminati, Myth and Reality. 3. The Political Turn of the Bavarian Illuminati",
          publisher: "Bitter Winter",
          tier: "expert analysis",
          digest: "43f325994b0e9a9c5278738a6881ce490a0d85812ec6452b98d8d8eacd563f05",
          href: "https://bitterwinter.org/3-the-political-turn-of-the-bavarian-illuminati/",
          note: "Source of the entire suppression timeline: the 1784 and 1785 edicts, the 1786 raid, Saxony lapsing in 1790, and the 1793 death. Cites no primary sources with footnotes, names no archives or editions consulted, and states no research methodology."
        },
        {
          number: "02",
          title: "The Bavarian Illuminati and the Construction of the Masonic Conspiracy in Enlightenment Europe (1776–1792)",
          publisher: "Kimuk / CONARE",
          tier: "peer reviewed",
          digest: "3bdb3e1dd9da2d59dd47025ffbe88ce10f84b5e7332c6cea67614cdb903c6893",
          href: "https://kimuk.conare.ac.cr/Record/PUCR_e768ecacd9c45339b73bee0358acc859",
          note: "Source of the claim that the scandal founded the genre and became a model for later theories. Only journal metadata and the abstract were available; no primary source list, archive access, funding or conflicts are stated."
        },
        {
          number: "03",
          title: "Einige Originalschriften des Illuminatenordens",
          publisher: "Source Library (the confiscated writings, published 1787)",
          tier: "primary data",
          digest: "2ea9c37014ff23113c1a902f067aaa413abbdf2ec05328241458b8d3fda668ff",
          href: "https://sourcelibrary.org/book/original-writings-of-the-order-of-the-illuminati-zwack",
          note: "The only primary-data source in the run — and it contributed no scored passage to any finding. States no authentication methodology and no provenance chain between the 1785 seizure and the 1787 publication."
        },
        {
          number: "04",
          title: "Judeo-Masonic conspiracy theory",
          publisher: "Wikipedia",
          tier: "quality journalism",
          digest: "db876124b0e9cd4f2cf0f9a04efb62398065253b44a307871ccdba75ff533e3b",
          href: "https://en.wikipedia.org/wiki/Judaeo-Masonic_conspiracy_theory",
          note: "Source of the Barruel–Simonini–Protocols–Domvile sequence. Does not disclose individual editors' identities, expertise, or vetting standards for this page."
        },
        {
          number: "05",
          title: "New World Order conspiracy theory",
          publisher: "Wikipedia",
          tier: "quality journalism",
          digest: "2b1ee31fb9627bb6561d741825d743e233663c6aa4f45a2d2241e16f98065b76",
          href: "https://en.wikipedia.org/wiki/New_World_Order_conspiracy_theory",
          note: "Source of the Davison 1966 and Allen 1971–87 datings that falsified H3. States no author, no editorial review process, and no fact-checking methodology."
        },
        {
          number: "06",
          title: "Gary Allen",
          publisher: "Wikipedia",
          tier: "quality journalism",
          digest: "249a1cafc063779744e5bcbb66ff6f7724f9180b0609c352be0b6a4d11adaf83",
          href: "https://en.wikipedia.org/wiki/Gary_Allen",
          note: "Source of the January 1987 posthumous title and the February 1974 American Opinion article. No byline; some cited sources are noted as dead links."
        },
        {
          number: "07",
          title: "Shadow government (conspiracy theory)",
          publisher: "Wikipedia",
          tier: "unsupported",
          digest: "0e6c6dc05708b9e8f49e4f8ab952f711d72ea80e698b0baf009f32baa7003979",
          href: "https://en.wikipedia.org/wiki/Shadow_government_(conspiracy)",
          note: "Source of the Cooper material. The run assessed this at the lowest tier in its hierarchy: author identities, editorial review, and the basis for including particular claims are not stated."
        },
        {
          number: "08",
          title: "When belief becomes research: conspiracist communities on the internet",
          publisher: "Frontiers in Communication",
          tier: "peer reviewed",
          digest: "635035578aa8edfb58f93511dc30a95bf4c4466953942ae848b65840de5614f6",
          href: "https://www.frontiersin.org/journals/communication/articles/10.3389/fcomm.2024.1345973/full",
          note: "Source of the QAnon material and of Barkun's superconspiracy framing. Does not state inter-rater reliability, nor how representative its two studied influencers are of the wider movement."
        },
        {
          number: "09",
          title: "His Anti-Semitic Sources",
          publisher: "Jacob Heilbrunn, The New York Review of Books",
          tier: "quality journalism",
          digest: "0b414eb287e4a2a27f51f3eb3c4d663e544fb5d995dbff58e3f76bc6bf0f36f4",
          href: "https://www.nybooks.com/articles/1995/04/20/his-anti-semitic-sources/",
          note: "Source of the cross-citation evidence that broke H4's strong form. States no methodology beyond textual comparison and no independent verification process."
        },
        {
          number: "10",
          title: "A Culture of Conspiracy",
          publisher: "Michael Barkun / University of California Press",
          tier: "expert analysis",
          digest: "d22e293b06b972251a30b40c53c570de457fa15d7e677e32d4ed5dde7830414a",
          href: "https://www.ucpress.edu/books/a-culture-of-conspiracy/paper",
          note: "A publisher's page rather than the book. States no funding, conflicts, sample boundaries, peer-review process or methodology."
        },
        {
          number: "11",
          title: "Conspiracy Con",
          publisher: "Southern Poverty Law Center",
          tier: "quality journalism",
          digest: "d65529e3df8b852b55157ef675958696bd39758aa34a18c8870642fabca399a1",
          href: "https://www.splcenter.org/resources/reports/conspiracy-con/",
          note: "Source of the observation that conspiracy-mongers very often converge on the same NWO framing. Describes no fact-checking process and no attendee numbers beyond “hundreds”."
        }
      ],
      next: {
        eyebrow: "Your turn",
        title: "The documents everyone calls secret were printed in 1787.",
        body: "That is the kind of thing you can check without trusting anyone, which is the only kind of claim this page wants to leave you with. The whole run is published unedited — every search, every excerpt, every digest. The next dossier takes the same method to the next contested claim."
      }
    },
    {
      slug: "jfk-the-minute-that-came-late",
      kind: "report",
      label: "Research dossier",
      issue: "DOSSIER 004",
      status: "published",
      featured: false,
      publishedAt: "2026-08-29",
      updatedAt: "2026-08-29",
      readMinutes: 15,
      runId: "7ed8eb44-d1cc-4261-bade-3c876b529ed3",
      title: "The JFK assassination, and the minute that came late.",
      shortTitle: "The JFK assassination",
      deck: "Five explanations, nine attacks on its own findings, eight adversarial searches that returned nothing — and one official finding of conspiracy resting on a recording made a minute after the shots.",
      cardLine: "What the record establishes about the assassination — and the two questions this run could not touch.",
      question: "What do declassified U.S. government records and the historical evidentiary record establish about who was responsible for the assassination of President John F. Kennedy and how it was carried out?",
      answer: "The 1979 finding of a probable conspiracy rests on one physical thing — the Dallas police Dictabelt — and in 1982 a National Research Council committee reported those impulses were recorded about a minute after the President was shot. The same committee that found a conspiracy also concurred that Oswald fired the two bullets that hit Kennedy. But nothing in this roster establishes that Oswald possessed and fired the rifle, and nothing in it touches whether anyone knew in advance. All thirteen findings computed to unknown.",
      disclosure: "This run asked what the official investigative record and the declassified documents establish. It is not an adjudication between conspiracy theories independent of that record, and it makes no finding about whether U.S. agencies, organized crime or foreign actors had foreknowledge — no evidence in this roster bears on that either way.",
      accent: "signal",
      tags: ["Forensics", "Official record", "Falsification"],
      cover: {
        index: "DYOR—004",
        serial: "004 / 2026",
        lines: ["THE JFK", "ASSASSINATION", "ONE MINUTE LATE."],
        footer: "One recording → one minute → what stays open"
      },
      transcript: {
        href: "assets/reports/dyor-7ed8eb44-d1cc-4261-bade-3c876b529ed3.md",
        label: "Read the full method transcript",
        note: "The complete 1,926-line run record: every search, every verbatim excerpt, every bearing, every snapshot digest. Published unedited so the story above can be checked against it."
      },
      scope: {
        audience: "Anyone weighing the claim — including someone who currently holds it.",
        focus: "What the official investigative record and the declassified documents establish about who was responsible for the assassination and how it was carried out.",
        excluded: "Films and fictionalised accounts, conspiracy theories with no substantial basis in declassified records or formal investigative findings, the political consequences of the killing, and Kennedy's biography apart from the event. Each was placed out of scope before any source was read."
      },
      stats: [
        { value: "09", label: "attacks on its own findings" },
        { value: "7/12", label: "snapshots that produced no passage" },
        { value: "0/12", label: "sources traced to an origin" }
      ],
      thesis: {
        label: "The decision this run refused to make",
        statement: "There is no run-level verdict in this record, and the renderer does not invent one. The acoustic evidence for a second gunman fails on a clock. That is not the same as clearing anyone, and every finding on this page still computes to a confidence of unknown.",
        status: "no run-level verdict"
      },
      chapters: [
        {
          id: "boundary",
          number: "01",
          eyebrow: "The boundary",
          title: "The question this run answered is narrower than the one everyone argues about.",
          lead: "It asked what declassified records and the historical evidentiary record establish about who was responsible and how the shooting was carried out. Before searching, it recorded that the question does not say which of three different arguments it means.",
          body: [
            "Those three are the mechanics — who fired, and from where; the conspiracy question — one man or several; and the credibility of the investigations themselves. Each framing changes what counts as relevant evidence and what an answer would even look like. The run wrote that down as an ambiguity rather than quietly picking one and proceeding as though the question had been clear.",
            "It then made its assumption explicit: absent further specification, it would report what the official record and the declassified documents establish, rather than adjudicating between conspiracy theories independently of that record. That assumption does a great deal of work on this page, and a reader who rejects it should discount what follows accordingly. It means the run went looking in archives — and archives are where one kind of evidence lives and another kind does not.",
            "Out of scope before any source was read: films and fictionalised accounts, every conspiracy theory without a substantial basis in declassified records or formal findings, the political and policy consequences of the assassination, other assassinations investigated by the same agencies, and Kennedy's biography apart from the event."
          ],
          pullquote: "The question does not say whether it is about the shooting, the conspiracy, or the investigations. The run said so instead of choosing.",
          visual: {
            type: "scope-boundary",
            askedLabel: "What was asked",
            asked: [
              "Who the record identifies as responsible",
              "How the shooting was carried out",
              "What each investigation concluded, and on what",
              "What the 1992 releases added"
            ],
            excludedLabel: "Declared out of scope",
            excluded: [
              "Films and fictionalised accounts",
              "Theories with no basis in the records",
              "The political consequences of the killing",
              "Kennedy's life apart from the event"
            ],
            note: "Period: 22 November 1963 to the present. Geography: the United States, centred on Dallas, with foreign contacts where the records touch them."
          }
        },
        {
          id: "explanations",
          number: "02",
          eyebrow: "Competing explanations",
          title: "Five explanations, and the one that never got tested.",
          lead: "Before any source was read, the run wrote down five rival accounts and, for each, the observation that would destroy it. Forty-four passages went on to declare a bearing on all five.",
          body: [
            "Two of the five are the argument the public has: Oswald alone, or a second gunman. The other three are where the interesting distinctions live. H3 says the second gunman is an artifact of a mistimed recording rather than a person. H5 says Oswald fired nothing at all. H4 says Oswald fired every shot and someone else knew it was coming — a conspiracy of foreknowledge with no extra rifle in Dealey Plaza.",
            "H4 is the column to look at. It collected forty-one zeros out of forty-four, three weak positives, and not one bearing against it. That is not a hypothesis the run defeated, and not one it established. It is a hypothesis nothing in the roster touched. The passages that would have touched it — intelligence files, organised-crime records, the Mexico City material — are not in this ledger, and both searches sent after them came back empty.",
            "The counts are unweighted by source tier on purpose. No weight vector has been argued anywhere in the system that produced this record, and an invented one would let a genre label quietly outvote the passages themselves."
          ],
          pullquote: "H4 collected forty-one zeros and no negative. Nothing here tested the conspiracy most people actually mean.",
          visual: {
            type: "hypothesis-roster",
            scale: ["++", "+", "0", "-", "--"],
            items: [
              {
                id: "H1",
                claim: "Oswald acted alone, firing all three shots from the sixth-floor window of the Texas School Book Depository.",
                falsifier: "Forensic, ballistic or documentary evidence establishing a shot fired from any other location, or another individual firing at the motorcade.",
                counts: [0, 17, 11, 13, 3]
              },
              {
                id: "H2",
                claim: "A second shooter, in addition to or instead of Oswald, fired at least one shot at the motorcade.",
                falsifier: "Re-analysis showing the extra impulses are not gunfire, plus no independent corroboration of a second firing position.",
                counts: [1, 11, 17, 12, 3]
              },
              {
                id: "H3",
                claim: "The second gunman is an artifact of flawed or mistimed acoustic data, not a person.",
                falsifier: "A validated analysis confirming the Dictabelt impulses are gunfire at the time and place of the assassination, correctly synchronised.",
                counts: [3, 1, 37, 3, 0]
              },
              {
                id: "H4",
                claim: "Oswald was the sole shooter, but his actions were known of, facilitated or exploited in advance by agencies, organised crime or foreign actors.",
                falsifier: "Declassified records showing no prior surveillance, contact or actionable knowledge of Oswald before 22 November 1963.",
                counts: [0, 3, 41, 0, 0]
              },
              {
                id: "H5",
                claim: "Oswald fired no shots: a patsy, misidentified, or not positioned to fire.",
                falsifier: "Ballistic matching linking the recovered rifle and cases to his possession and use, plus credible placement of him at the window.",
                counts: [0, 3, 25, 13, 3]
              }
            ],
            note: "44 passages declared a bearing on each explanation. H2's single strongest bearing is one sentence reporting the HSCA's conclusion; H3's three are the sentences that dispute it."
          }
        },
        {
          id: "acoustics",
          number: "03",
          eyebrow: "The acoustic channel",
          title: "The only official finding of conspiracy rests on a recording made a minute late.",
          lead: "The House Select Committee on Assassinations concluded in 1979 that there was a high probability that two gunmen fired at President Kennedy. The physical basis for that was one thing: acoustic analysis of a Dallas police radio channel left open during the motorcade.",
          body: [
            "In 1982 the National Research Council's Committee on Ballistic Acoustics re-examined those recordings. Its summary states that the acoustic impulses attributed to gunshots were recorded about one minute after the President had been shot and the motorcade had been instructed to go to the hospital, and therefore that reliable acoustic data do not support a conclusion that there was a second gunman. It adds that the analyses do not demonstrate a grassy-knoll shot and that there is no acoustic basis for the claim of 95% probability of such a shot.",
            "That is a timing argument, not a motive argument. Nobody has to be lying for it to work. If the impulses are a minute late, the shots cannot have produced them, and the sentence the HSCA built its conspiracy finding on has nothing physical underneath it. The run's own attack on that reasoning is printed further down, and it is a fair one.",
            "Which leaves the rest of the HSCA report standing — the part that usually gets lost. The same committee concurred with the Warren Commission that Oswald fired the two bullets that hit the President, endorsed the single-bullet trajectory, and reported that its own forensic pathology panel's conclusions were consistent with it. It reported a conspiracy it could not populate with any conspirator other than Oswald. The disagreement between the two investigations localises entirely to the acoustic channel."
          ],
          pullquote: "Nobody has to be lying for a minute to be a minute.",
          visual: {
            type: "timeline",
            items: [
              { date: "12:30 p.m.", label: "The shots", detail: "The motorcade is passing through Dealey Plaza. The President is shot and suffers a massive head wound." },
              { date: "about a minute later", label: "The impulses", detail: "The acoustic impulses later attributed to gunshots are recorded — after the motorcade has been instructed to go to the hospital.", tone: "seizure" },
              { date: "1:00 p.m.", label: "Pronounced dead", detail: "Doctors at Parkland Memorial Hospital pronounce the President dead. Dallas police arrest Lee Harvey Oswald later the same day." },
              { date: "23 Nov, 1:30 p.m.", label: "Charged", detail: "About twenty-five hours after the shooting, Oswald is charged with assassinating the President." },
              { date: "Sept 1964", label: "Warren Commission", detail: "An 888-page report with 26 volumes behind it: 552 witnesses deposed or interviewed, roughly 360 cubic feet of records." },
              { date: "1979", label: "HSCA", detail: "The committee reports a high probability that two gunmen fired and a probable conspiracy — while concurring that Oswald fired the two bullets that hit the President." },
              { date: "1982", label: "The acoustics re-examined", detail: "The Committee on Ballistic Acoustics reports the impulses postdate the shooting by about a minute, and that no acoustic basis supports the 95% figure.", tone: "end" },
              { date: "1992", label: "The JFK Act", detail: "Congress requires disclosure of the assassination records — a response, the record says, to thirty years of secrecy that led the public to believe the government had something to hide.", tone: "after" }
            ],
            note: "Times and dates appear only where this run's sources state them. The one-minute offset is the whole of the acoustic argument on this page."
          }
        },
        {
          id: "chain",
          number: "04",
          eyebrow: "Where it is exposed",
          title: "The lone-gunman case survives only if one bullet did seven wounds.",
          lead: "The single-bullet theory is not a footnote to the lone-gunman finding. It is the load-bearing wall — and this roster holds both the mechanism that supports it and the reasons three commissioners would not sign it as proven.",
          body: [
            "The arithmetic first. FBI marksmen who test-fired the recovered Carcano put the minimum for two successive well-aimed shots at about two and a quarter seconds — 41 to 42 frames of the Zapruder film at 18.3 frames per second. The Warren Commission placed Kennedy's wounding between frames 210 and 225 and Connally's no later than frame 240: a window of at most about thirty frames. If separate bullets struck the two men, one bolt-action rifle mechanically could not have delivered them. H1 therefore survives only conditional on the single bullet, exactly as its critics contend.",
            "In support: the Bethesda autopsy report describes a posterior entry above the scapula traversing the neck and exiting anteriorly, the HSCA panel read the autopsy photographs and X-rays directly and placed the entry at the first thoracic vertebra, and that panel's conclusions were reported as consistent with the theory. Against: three Commission members thought it improbable, Senator Russell asked for his opposition to be footnoted, and the word “compelling” was changed to “persuasive” before the report went out. Wecht dissented at the HSCA that the trajectory from the sixth-floor window could not intersect Connally's right armpit. And O. P. Wright, one of the men who found the bullet at Parkland, told an author in 1966 that the round he held was point-nosed, where CE 399 is round-nosed.",
            "There is a step here that the critics take and this run does not. Rejecting the single-bullet theory is not the same as finding a second gun. The Connallys rejected it all their lives while still accepting that Oswald acted alone, holding that all three shots struck occupants of the limousine. With a three-shot total and the timing constraint, discarding the single bullet redistributes the hits before it adds a shooter.",
            "And the first condition, the one that looks least controversial, is the one the run marks unsettled. Nothing in this ledger documents the firearms identification matching the recovered cartridge cases to that specific rifle, nothing documents Oswald's purchase or possession of it, nothing carries the prints or fibres from the sniper's nest, and no passage records a witness placing a man at the sixth-floor window during the shooting."
          ],
          pullquote: "Three commissioners thought it improbable. The report went out saying “persuasive”.",
          visual: {
            type: "condition-chain",
            items: [
              { label: "Oswald possessed and used the Carcano found in the Depository", state: "unknown" },
              { label: "Every wound trajectory fits the sixth-floor window", state: "supported" },
              { label: "No credible evidence puts a shot anywhere else", state: "supported" },
              { label: "One bolt-action rifle could fire them inside the observed window", state: "weak link" }
            ]
          }
        },
        {
          id: "attack",
          number: "05",
          eyebrow: "Falsification",
          title: "Ten attacks on its own explanations. Eight came back empty.",
          lead: "The run ran ten adversarial searches, each aimed at an explanation it had written down. Two returned a verified counter-passage. The other eight returned nothing — and where those eight were pointed is the most important thing on this page.",
          body: [
            "Both searches that returned were aimed at the second-shooter hypothesis: the National Academies acoustics re-analysis, and the Dealey Plaza curb mark. Everything else came back holding nothing. So the only counter-evidence this run actually obtained points in a single direction, and a reader who wants to discount the acoustic conclusion for exactly that reason has the count to do it with.",
            "Look at what the blanks were hunting. Two were the defence of the acoustics — Donald Thomas's peer-reviewed challenge to the Ramsey panel, and any replication of the Barger, Weiss and Aschkenasy echo-correlation work. Neither returned, and the one record of that literature in the ledger was stored as a page asking the reader to enable JavaScript. The acoustic conclusion above was reached without this run reading a word written for the other side.",
            "Two more were aimed at foreknowledge: declassified CIA and FBI records on Oswald's Mexico City contacts, and the HSCA and Church Committee material on organised crime. Both empty. Two more were aimed at Oswald himself: the paraffin and nitrate tests on his hands, and the rifle palm print with the FBI custody records. Both empty. That is why this ledger cannot show that Oswald fired the rifle and cannot show that anyone knew in advance — not because it found otherwise, but because no probe was pre-registered and eight searches came back with nothing to weigh."
          ],
          pullquote: "Eight blanks, and not one of them is evidence of absence. The run says so itself.",
          visual: {
            type: "attack-log",
            items: [
              { target: "H1", looked: "Medical or photographic evidence of an anterior throat entrance wound", outcome: "empty" },
              { target: "H1", looked: "Metallurgical re-examination of the fragment match to the Carcano", outcome: "empty" },
              { target: "H2", looked: "Acoustic analyses showing the Dictabelt impulses were crosstalk or mistimed", outcome: "returned" },
              { target: "H2", looked: "Whether any recovered bullet or impact mark came from a grassy-knoll shooter", outcome: "returned" },
              { target: "H3", looked: "Peer-reviewed acoustics challenging the Ramsey panel — Thomas, 2001", outcome: "empty" },
              { target: "H3", looked: "Replication of the Barger–Weiss–Aschkenasy echo correlation", outcome: "empty" },
              { target: "H4", looked: "Declassified files on intelligence foreknowledge and Mexico City", outcome: "empty" },
              { target: "H4", looked: "Organised-crime contact with, or direction over, Oswald", outcome: "empty" },
              { target: "H5", looked: "The paraffin and nitrate tests on Oswald's hands", outcome: "empty" },
              { target: "H5", looked: "The rifle palm print and the FBI custody records", outcome: "empty" }
            ],
            footer: "2 of 10 adversarial searches yielded a snapshot-bound, verified counter-passage (20.00%)."
          }
        },
        {
          id: "strongest",
          number: "06",
          eyebrow: "The best-supported reading",
          title: "The strongest finding, printed with the attack made on it.",
          lead: "The run's leading finding is that the single physical basis for the HSCA's two-gunmen conclusion is directly contradicted inside its own roster. It is typed observed rather than inferred. Then the run named the way it could be wrong, and the objection is a good one.",
          body: [
            "The attack is filed as measurement error. Rejecting the Dictabelt rests on a cross-talk synchronisation that matches the recording to a broadcast about a minute after the shooting, and that match assumes both channels ran on identical, constant-speed tape transports with no intermittent pauses and no later re-recording artifacts. Dispatch recorders in 1963 are not self-evidently that.",
            "The condition under which the finding fails was written down in advance, and it is specific and findable: a forensic acoustic analysis confirming non-linear tape slippage or unrecorded pauses on the Dallas Police dispatch recorder, shifting the true impulse timeline back by roughly sixty seconds into alignment with the Zapruder impact frames. If that turns up, the second gunman comes back with it.",
            "The run also states where the whole package stops holding. Its best-supported reading — lone-gunman shooting mechanics plus the acoustic artifact — fails under any of three named conditions: a validated re-synchronisation of the Dictabelt, confirmation that CE 399 is not the bullet recovered on the Parkland gurney, or confirmation of Wecht's geometric objection. H4, the conspiracy of foreknowledge, is unaffected by all three and stays open regardless of which way they go."
          ],
          visual: {
            type: "finding-attack",
            finding: {
              label: "Finding",
              id: "fnd_11f2ff88b3e4ea67_00",
              status: "observed",
              text: "The single physical basis on which the HSCA rested its “high probability” of two gunmen is the Dictabelt acoustic analysis, and that basis is directly contradicted in the roster: the impulses attributed to gunshots were recorded roughly a minute after the President was shot and after the motorcade had been ordered to the hospital, and the 95% probability figure for a grassy-knoll shot has no acoustic basis.",
              meta: "6 passages cited · 2 source families · computed confidence: unknown"
            },
            attack: {
              label: "Attack on it",
              id: "stp_cf0733f13601659f_00",
              kind: "measurement error",
              text: "The rejection of the Dictabelt acoustic evidence relies on cross-talk synchronisation matching the recording to a broadcast about one minute after the shooting, which assumes that both recording channels operated on identical, constant-speed tape transports without intermittent pauses or subsequent re-recording artifacts."
            },
            failureLabel: "Recorded failure condition",
            failure: "A forensic acoustic analysis confirms non-linear tape slippage or unrecorded pauses on the Dallas Police Department dispatch recorder that shifts the true impulse timeline back by approximately 60 seconds into alignment with the Zapruder film impact frames."
          }
        },
        {
          id: "score",
          number: "07",
          eyebrow: "The score",
          title: "Thirteen findings, every one unknown, and 14 out of 100.",
          lead: "Thirteen findings were asserted, four of them typed observed rather than inferred. Every one computed to a confidence of unknown, and the evidence score came to the same 14 out of 100 as the two dossiers before it — for the same reason.",
          body: [
            "Zero of twelve snapshots reached an upstream origin. Corroboration and provenance therefore both scored zero, regardless of how good the underlying history is, because unknown provenance is unknown independence and the scoring will not let a well-argued reading buy its way past that.",
            "Falsification scored 15 of 20: ten counter-searches ran and two returned. Saturation scored zero — three of the five source families found in the second retrieval round were new, and the counts on all five explanations moved when that round was added, so the search was nowhere near exhausted when it stopped.",
            "Two measurements are worse here than in the last dossier. No source in this ledger was assessed as primary data at all. And seven of the twelve snapshots produced no scored passage — including the Warren Commission Report chapter on the shots and the HSCA's own findings page, both stored, hashed, and cited by nothing. The forty-four passages came out of five documents, and two of those five carry thirty-seven of them."
          ],
          visual: {
            type: "score-breakdown",
            components: [
              { label: "Corroboration", value: 0, max: 40, note: "0 of 12 sources traced to an origin" },
              { label: "Provenance", value: 0, max: 25, note: "unknown origin is unknown independence" },
              { label: "Falsification", value: 15, max: 20, note: "2 of 10 counter-searches returned" },
              { label: "Saturation", value: 0, max: 15, note: "3 of 5 families in round 2 were new" }
            ],
            subtotalLabel: "Components summed",
            subtotal: "15",
            capLabel: "Counter-evidence was found, which caps the unknown band",
            total: "14 / 100",
            confidence: "unknown",
            note: "Not a probability. This run holds no calibrated priors and no likelihood model."
          }
        }
      ],
      principlesHeading: {
        eyebrow: "Take this with you",
        title: "Five checks this run was held to. Use them on anything."
      },
      principles: [
        "Ask what a conclusion actually rests on. An official finding of conspiracy resting on one recording is one recording, however large the report built around it.",
        "Check the clock before you check the motive. The acoustic case did not fail on politics or credibility; it failed on arriving about a minute late.",
        "Notice which side of a dispute you have actually read. If the rebuttal is in your bibliography as a title and an error page, you have heard one side.",
        "Separate “not established here” from “shown to be false”. This run cannot show Oswald fired the rifle — a fact about what it retrieved, not about him.",
        "Count how many of your sources produced anything at all. Seven of twelve here produced nothing, and a bibliography hides that completely."
      ],
      limitations: [
        "Zero of twelve source snapshots could be traced to an upstream origin, so nothing here has established independence between its sources. All thirteen asserted findings computed to a confidence of unknown.",
        "No source in the ledger was assessed as primary data. Every finding on this page rests on description of the physical and documentary record rather than on the record itself.",
        "Two sources carry almost everything: one ARRB report chapter and one Wikipedia article supply thirty-seven of the forty-four passages. That Wikipedia article is the sole source for every timing number quoted above.",
        "Seven of the twelve snapshots produced no scored passage at all — among them the Warren Commission Report chapter on the shots and the HSCA's own findings page.",
        "Three of the twelve stored snapshots are not documents at all: a university course listing retrieved by a domain-scoped search, a publisher's navigation shell where the acoustics chapter should have been, and a page asking the reader to enable JavaScript where the peer-reviewed echo-correlation analysis should have been.",
        "Both counter-searches aimed at defending the acoustic evidence returned nothing, and the one record of that defence in the ledger was unreadable. The acoustic finding here was reached without reading anything written for the other side.",
        "No probe was pre-registered. Eight of the ten adversarial searches came back empty, and not one of those blanks counts as evidence of absence.",
        "Nothing in the roster documents the ballistic match of the recovered rifle and cartridge cases to Oswald, his purchase or possession of that rifle, the prints and fibres from the sniper's nest, or any witness placing him at the window. The run records that as unsettled, not as settled either way.",
        "Nothing in the roster addresses prior surveillance of, contact with, or actionable knowledge of Oswald by U.S. agencies, organized crime or foreign intelligence. Four of the ten subquestions were answered by no passage at all.",
        "The run's only computational-ballistics source is an unreviewed preprint, and three passages from its abstract carry the entire rear-impact simulation result.",
        "The search was not saturated: three of the five source families found in the second retrieval round were new, and the run stopped there.",
        "Two of the forty-six readable passages were refused by the verbatim gate and appear nowhere in the record."
      ],
      sourcesHeading: {
        eyebrow: "Source record",
        title: "Twelve snapshots. Five of them produced every passage on this page."
      },
      sourcesNote: "Each link is the address that was recorded, printed beside the digest of the bytes that were actually stored. The link is not a guarantee that the address still serves those bytes — the digest is the thing to check a quotation against.",
      sources: [
        {
          number: "01",
          title: "Final Report of the Assassination Records Review Board, Chapter 1",
          publisher: "Assassination Records Review Board / Federation of American Scientists",
          tier: "government institutional",
          digest: "98c36e18161e163709728382003669ec299118529dba98f552b2865cad8b6591",
          href: "https://sgp.fas.org/advisory/arrb98/part03.htm",
          note: "Fourteen of the forty-four passages, including both official conclusions, the HSCA's inability to name any conspirator other than Oswald, and the fact that the Warren Commission never viewed the autopsy photographs. States no peer-review process, no internal deliberation method, and no criteria for which episodes and quotations it includes."
        },
        {
          number: "02",
          title: "Single-bullet theory",
          publisher: "Wikipedia",
          tier: "quality journalism",
          digest: "a4446e4ec55fa3611d9ee60db61f37e8d4a68aa4c1bef9cfee10ab1fabb61cc0",
          href: "https://en.wikipedia.org/wiki/Single-bullet_theory",
          note: "The heaviest source in the run: twenty-three of the forty-four passages, including every timing figure, the Wecht dissent, the CE 399 custody dispute and the witness tallies. Discloses no editor identities, no editorial review process and no peer review, and does not resolve the neutron-activation dispute it reports."
        },
        {
          number: "03",
          title: "Findings — House Select Committee on Assassinations, Part 1C",
          publisher: "National Archives",
          tier: "government institutional",
          digest: "0213c82e522b3e615341d32886c3cd4063bf3db86f265f3f8eb16b084a20402c",
          href: "https://www.archives.gov/research/jfk/select-committee-report/part-1c.html",
          note: "The HSCA's own findings page — snapshotted, assessed, and cited by no passage in the run. The run's note on it: the committee reaches a definitive probable-conspiracy conclusion on disputed acoustic evidence while acknowledging it could not identify the other gunman or the extent of the conspiracy."
        },
        {
          number: "04",
          title: "The President John F. Kennedy Assassination Records Collection",
          publisher: "National Archives",
          tier: "government institutional",
          digest: "e6843590fdc08e06802cb671347b52cd0a48800d4929a9f886b22fbadda2e7cf",
          href: "https://www.archives.gov/research/jfk",
          note: "The collection landing page — over six million pages released on a rolling basis under Executive Order 14176. Contributed no passage. States no timeline for full release and no specifics of what remains classified or redacted."
        },
        {
          number: "05",
          title: "courses [Applied Statistics and Data Mining]",
          publisher: "stat.sixthfloor.org",
          tier: "unsupported",
          digest: "8bc65dc710c362ca6e07d584528138bb19475434031e1089f0f0eab374973101",
          note: "A university course index listing lectures and labs taught from 2011 to 2025, retrieved by a search scoped to the Sixth Floor Museum's domain. It has nothing to do with the assassination. Snapshotted, hashed, assessed at the lowest tier, cited by nothing — and printed here because the run stored it. Its recorded address is plain HTTP, so it is not linked."
        },
        {
          number: "06",
          title: "Report of the Committee on Ballistic Acoustics — chapter shell",
          publisher: "National Academies Press",
          tier: "unsupported",
          digest: "1f5e07d3ac6eea8f8d0fed1e0c5b1cbaa16b3a632aa9f611ac3a7bd6f5a8362b",
          href: "https://www.nationalacademies.org/read/10264/chapter/7",
          note: "The chapter evaluating the FBI report — retrieved as site chrome. Navigation links, a login and subscription form, and a table of contents; none of the chapter's methods, data or findings are in the stored bytes."
        },
        {
          number: "07",
          title: "Computational ballistic analysis of the cranial shot to John F. Kennedy",
          publisher: "Christophe Then (preprint)",
          tier: "technical report",
          digest: "90e8ea28fe227aacae7c0b6cfa49d673079995419d87c9308f986d2e0cb8473e",
          href: "https://exa.ai/library/publication/fjbbglxztsp",
          note: "Three passages, all taken from the abstract, carrying the entire rear-impact simulation result. Listed as a preprint: no peer review, no funding statement, and no validation of the computational model against known ballistic test data."
        },
        {
          number: "08",
          title: "Warren Commission Report, Chapter 3: The Shots From the Texas School Book Depository",
          publisher: "National Archives",
          tier: "government institutional",
          digest: "c20d4389abb7c447019284e50e61b83d35bbc73d8bc6f5b8cebaf35775040425",
          href: "https://www.archives.gov/research/jfk/warren-commission-report/chapter-3.html",
          note: "Snapshotted in the second retrieval round and cited by no passage. The run's note on it: the report reaches definitive findings while acknowledging in several places that timing, angles and witness recollections were inconclusive, and that it could not determine which of three shots missed."
        },
        {
          number: "09",
          title: "Report of the Committee on Ballistic Acoustics, 1982",
          publisher: "National Research Council / National Academies",
          tier: "government institutional",
          digest: "0bbe7e472cca584dee130d93f46f54506db28c64b6535a9a91909390370ad972",
          href: "https://www.nationalacademies.org/publications/10264",
          note: "The counter-search that worked. Three passages, and every one of the run's strongest bearings for the acoustic-artifact reading. States no committee qualifications, no statistical method of its own for re-evaluating the 95% figure, no funding and no conflicts."
        },
        {
          number: "10",
          title: "Image of a bullet mark on a curb in Dealey Plaza",
          publisher: "The Sixth Floor Museum at Dealey Plaza",
          tier: "government institutional",
          digest: "66654478a2eb69dd70651d7df077361e5ac41a000173f52f9bbeb468790906b3",
          href: "https://emuseum.jfk.org/objects/11979/image-of-a-bullet-mark-on-a-curb-in-dealey-plaza",
          note: "The only independent physical trace of a stray round in the roster, documented as to location and custody only. The record does not itself establish that the mark was made by a bullet; that determination is attributed to a later FBI investigation rather than demonstrated here."
        },
        {
          number: "11",
          title: "Echo correlation analysis and the acoustic evidence in the assassination",
          publisher: "Europe PMC",
          tier: "unsupported",
          digest: "76b72a2109c88c66d0797d23f4ff43d77d60f8fe52fc45bedcb74ffcc45b107a",
          href: "https://europepmc.org/article/med/11215295",
          note: "The record for the peer-reviewed acoustic analysis that argues against this run's acoustic conclusion — stored as a page asking the reader to enable JavaScript. No abstract, no methods, no claims. The defence of the Dictabelt is in this ledger by title alone."
        },
        {
          number: "12",
          title: "[Various Reports on Paraffin and Nitrate Tests of Lee Harvey Oswald]",
          publisher: "Dallas Police Department / Portal to Texas History",
          tier: "government institutional",
          digest: "d0259e6a88888a59f3eb2bb77ce9aa1fb8b013e976dccea507a7229f44ba42ca",
          href: "https://texashistory.unt.edu/ark:/67531/metapth338281/",
          note: "Paraffin casts of Oswald's hands, tested for nitrates by the same department investigating him. Snapshotted, cited by no passage. States no examiner credentials, no testing protocol, no chain-of-custody specifics and no interpretation of what the result means."
        }
      ],
      next: {
        eyebrow: "Your turn",
        title: "A recording is dated. You can check a clock without trusting anyone.",
        body: "That is the kind of claim this page wants to leave you with — and so is its opposite: nothing here shows that Oswald fired the rifle, because the searches that would have shown it came back empty. The whole run is published unedited, every search and every digest. The next dossier takes the same method to the next contested claim."
      }
    },
    {
      slug: "9-11-the-demolition-and-the-warning",
      kind: "report",
      label: "Research dossier",
      issue: "DOSSIER 005",
      status: "published",
      featured: false,
      publishedAt: "2026-08-29",
      updatedAt: "2026-08-29",
      readMinutes: 18,
      runId: "6f519009-3f9b-4192-a2a5-75754e889d16",
      title: "The 9/11 inside-job claim is two claims.",
      shortTitle: "The 9/11 inside-job claim",
      deck: "Four explanations, ninety-five passages, seventeen attacks on its own findings — and one phrase carrying a claim this record answers alongside a claim it cannot touch.",
      cardLine: "What the ledger does to the demolition claim, what it cannot do to the foreknowledge claim, and why the counts read backwards.",
      question: "What does the available evidence indicate about the validity of claims that the September 11, 2001 attacks were orchestrated or knowingly allowed by elements of the United States government, as opposed to being carried out solely by al-Qaeda as an external terrorist attack?",
      answer: "The physical channel is one-sided. Impact and fire account for the Twin Towers, and every signature a controlled demolition would have to leave is absent or independently explained — ten passages bear strongly against active orchestration and not one bears strongly for it. The foreknowledge channel is neither one-sided nor settled: the warnings existed in volume, but the run could not establish that any of them named a time, a target and a method, and the episodes that look most like intent are described by the same witnesses in the language of negligence. All twenty-one findings computed to a confidence of unknown.",
      disclosure: "This run asked what the available evidence indicates about claims of U.S. government orchestration or foreknowledge, against the baseline of the official account. It records no run-level verdict. It makes no finding that anyone held actionable advance knowledge, and no finding that nobody did — four of its findings are questions it explicitly could not settle.",
      accent: "amber",
      tags: ["Forensics", "Foreknowledge", "Falsification"],
      cover: {
        index: "DYOR—005",
        serial: "005 / 2026",
        lines: ["THE 9/11", "INSIDE JOB", "IS TWO CLAIMS."],
        footer: "Demolition → answered · Foreknowledge → open"
      },
      transcript: {
        href: "assets/reports/dyor-6f519009-3f9b-4192-a2a5-75754e889d16.md",
        label: "Read the full method transcript",
        note: "The complete 2,865-line run record: every search, every verbatim excerpt, every bearing, every snapshot digest. Published unedited so the story above can be checked against it."
      },
      scope: {
        audience: "Anyone weighing the claim — including someone who currently holds it.",
        focus: "Public claims, investigative findings and evidentiary materials concerning the planning, execution and prior knowledge of the September 11 attacks, official and independent alike.",
        excluded: "Foreign-policy critiques that allege no complicity, the wars that followed except where they bear on motive, conspiracy theories about other events invoked for comparison, liability and compensation questions, and the psychology of why these theories persist. Each was placed out of scope before any source was read."
      },
      stats: [
        { value: "17", label: "attacks on its own findings" },
        { value: "0/11", label: "sources traced to an origin" },
        { value: "11/106", label: "excerpts refused by the verbatim gate" }
      ],
      thesis: {
        label: "The distinction the run refused to collapse",
        statement: "There is no run-level verdict in this record and the renderer does not invent one. Two different claims travel under one phrase, and this ledger answers them differently: it comes down hard against the demolition claim and cannot settle the foreknowledge claim in either direction.",
        status: "no run-level verdict"
      },
      chapters: [
        {
          id: "boundary",
          number: "01",
          eyebrow: "The boundary",
          title: "One phrase, two claims, and two different evidentiary bars.",
          lead: "The question asked what the evidence indicates about claims that the attacks were orchestrated or knowingly allowed by elements of the U.S. government. Before any search ran, the run recorded that “inside job” does not say which of those it means.",
          body: [
            "Orchestration and foreknowledge-with-inaction are not degrees of one claim. One requires participation — people placing charges, launching a missile, substituting an aircraft. The other requires only a decision not to act on something already known. They break in different places, they leave different traces, and the searches that would test them go to different archives. The run wrote that down as an ambiguity rather than quietly picking one and proceeding as though the question had been clear.",
            "It recorded two more. Whether the question wanted the truth of the claims adjudicated or a map of what has been claimed and on what basis. And what “government” names here — the administration in office in 2001, particular agencies, or an unspecified set of institutional actors, since different theories implicate different parties. Then it stated its assumption: the comparison baseline would be the official account, al-Qaeda operatives acting without U.S. foreknowledge or complicity. A reader who rejects that baseline should discount what follows accordingly.",
            "One exclusion matters more than the rest on a page like this. The psychology and sociology of why these theories persist was placed out of scope except where it bears on characterising the claims themselves. The run was not permitted to explain the belief instead of testing it."
          ],
          pullquote: "Orchestration and inaction are not degrees of one claim. They break in different places.",
          visual: {
            type: "scope-boundary",
            askedLabel: "What was asked",
            asked: [
              "What the official account concludes, and on what evidence",
              "What orchestration claims cite in support",
              "What foreknowledge claims cite in support",
              "What the structural and forensic record shows",
              "What has been declassified since 2001"
            ],
            excludedLabel: "Declared out of scope",
            excluded: [
              "Foreign-policy critiques alleging no complicity",
              "The wars that followed, except on motive",
              "Liability and compensation questions",
              "Why these theories persist and spread"
            ],
            note: "Period: the mid-1990s to the present, centred on 11 September 2001. Geography: New York, Arlington and Shanksville, with the international actors the planning touches."
          }
        },
        {
          id: "explanations",
          number: "02",
          eyebrow: "Competing explanations",
          title: "Four explanations, and the column that fills up fastest is the one to distrust.",
          lead: "Before any source was read the run wrote down four rival accounts and, for each, the observation that would destroy it. Ninety-five passages went on to declare a bearing on all four.",
          body: [
            "H1 is the official account. H2 is active orchestration — demolition, a missile, a substituted plane. H3 is LIHOP: specific actionable foreknowledge, deliberately unused. H4 says the public record is genuinely mixed in places without any of that amounting to orchestration.",
            "Read H2's row first. Nine weak positives, ten strong negatives, no strong positive at all, and sixty-nine passages that bore on it not at all. Now read H3's: forty-eight positives against eighteen negatives. On the face of the table, the foreknowledge hypothesis is doing well and the orchestration hypothesis is not.",
            "The second half of that reading does not survive chapter six. A positive bearing means the passage, if true, would support the explanation — and a passage reciting an allegation earns a positive whether or not the allegation was ever verified. Sixty of these ninety-five passages come from two compilation pages whose function is to list allegations. H1's fifty-five negatives are the same artifact seen from the other side.",
            "The counts are unweighted by source tier on purpose. No weight vector has been argued anywhere in the system that produced this record, and an invented one would let a genre label quietly outvote the passages themselves."
          ],
          pullquote: "A passage that recites an allegation scores the same as a passage that establishes one.",
          visual: {
            type: "hypothesis-roster",
            scale: ["++", "+", "0", "-", "--"],
            items: [
              {
                id: "H1",
                claim: "The attacks were planned and executed solely by al-Qaeda, with no orchestration or deliberate complicity by U.S. actors; the pre-attack failures were ordinary bureaucratic and systemic shortcomings.",
                falsifier: "Credible corroborated evidence that specific U.S. officials knowingly facilitated, funded, or withheld actionable warning of the specific plan in order to let it proceed.",
                counts: [3, 29, 8, 55, 0]
              },
              {
                id: "H2",
                claim: "Elements within the U.S. government actively planned, participated in, or executed parts of the attacks — controlled demolition of the towers or Building 7, or complicity at the Pentagon or Shanksville.",
                falsifier: "Independent forensic analysis explaining the collapses by impact and fire, with no corroborated explosive residue, no demolition seismic signature, and no credible testimony of personnel planting explosives.",
                counts: [0, 9, 69, 7, 10]
              },
              {
                id: "H3",
                claim: "Officials or agencies held specific, actionable foreknowledge beyond generalised threat warnings and deliberately allowed the attacks to proceed.",
                falsifier: "Records showing the pre-9/11 warnings lacked the specificity of time, place and method needed to act, and that the failures came from silos, resources or misjudgement rather than policy.",
                counts: [1, 48, 27, 18, 1]
              },
              {
                id: "H4",
                claim: "The public evidentiary record is genuinely mixed or incomplete in places, so neither complicity nor complete exoneration on foreknowledge can be established from open sources — even though nothing supports active orchestration.",
                falsifier: "Full declassification and independent expert consensus resolving every cited anomaly, leaving no material technical or documentary dispute open.",
                counts: [3, 57, 12, 23, 0]
              }
            ],
            note: "95 passages declared a bearing on each explanation. H2 collected ten of the strongest available negatives and not one strong positive."
          }
        },
        {
          id: "physical",
          number: "03",
          eyebrow: "The physical channel",
          title: "H2 wrote its own falsifier, and this ledger satisfies it item by item.",
          lead: "The orchestration hypothesis named the conditions that would destroy it before any source was read: collapses fully explained by impact and fire, no corroborated residue, no demolition seismic signature, no chain-of-custody physical evidence. The run went and collected each one.",
          body: [
            "The mechanism first, from NIST's own investigation summary. Impact severed and damaged support columns, dislodged the sprayed fireproofing and dispersed jet fuel across multiple floors. Bare steel at about 1,000 degrees Celsius softens to roughly a tenth of its room-temperature strength, and unprotected steel can reach the air temperature within the time those fires burned. Sagging floor trusses pulled the perimeter columns inward, and the potential energy released by the upper block exceeded what the structure below could absorb. Collapse initiated at the impact and fire floors and nowhere else, ran top-down, and took 56 minutes for WTC 2 and 102 for WTC 1 — intervals tracking impact damage and fire spread rather than a schedule.",
            "Then the signatures a demolition would have to leave. No seismic signal precedes either collapse; the spikes begin about ten seconds after initiation, consistent with debris reaching the ground. No blast or explosion below the impact floors was recorded by NIST, the NYPD, the Port Authority police or the fire department. The lateral “squibs” match air compressed ahead of the falling mass. The bright molten stream is consistent with aircraft aluminium and the lingering rubble heat with oxygen-starved smouldering. USGS dust analysis found no thermite residue.",
            "The Pentagon is a separate channel and reads the same way: hundreds of witnesses, clipped highway light poles on the approach, recovered airframe debris, DNA-identified victims, a retrieved flight recorder. The run's note on the “too small a hole” objection is that it misconstrues what a thin aluminium airliner does to a reinforced building. And the authorship of the plot is reconstructed independently of any of that — Khalid Sheikh Mohammed's proposal, the flight training, the travel, bin Laden's own acknowledgement of responsibility.",
            "The chain below is H1's, not H2's. Two of its five conditions are the ones this ledger fully supports, and they are both physical. The rest of this dossier is about the other three."
          ],
          pullquote: "Collapse initiated at the impact and fire floors and nowhere else.",
          visual: {
            type: "condition-chain",
            items: [
              { label: "The investigations are methodologically sound and not suppressing contrary evidence", state: "weak link" },
              { label: "No credible declassified material contradicts the sole-al-Qaeda attribution", state: "weak link" },
              { label: "The structural and forensic evidence fits impact and fire, not demolition", state: "supported" },
              { label: "The Pentagon and Shanksville evidence fits aircraft impact", state: "supported" },
              { label: "The documented intelligence failures are organisational rather than deliberate", state: "unknown" }
            ]
          }
        },
        {
          id: "building-seven",
          number: "04",
          eyebrow: "One building",
          title: "The live technical dispute is one building, and the decisive test was declined.",
          lead: "The disagreement among qualified people in this record is not about the Twin Towers. It is about World Trade Center 7 — and both sides of it are computer models rather than physical samples.",
          body: [
            "A four-year University of Alaska Fairbanks modelling study, released on 25 March 2020, concludes that the near-simultaneous failure of every column caused the collapse, rather than the fire-initiated local failure NIST describes. The same record notes that NIST's own simulation shows a façade distortion that does not match the observed footage. This is where H4 holds most strongly and where H2's technical falsifier has not been satisfied.",
            "The source is worth stating plainly. It is a discussion-forum request for expert input, written by a site manager who says he is not a structural engineer and is asking for opinions he lacks. The run assessed it at the lowest tier, `unsupported`. It is in this ledger because a counter-search aimed at H2 returned it, and it is the whole of the pro-UAF case here.",
            "NIST declined to test the WTC 7 debris for explosive or thermite residue, on the ground that its collapse hypothesis already accounted for the observations. The run treats that as a genuine methodological failure and then refuses to let it pay out. In its own words: the decision not to test is a fair criticism; it is not evidence that residue existed. So the gap supports the underdetermined reading and carries no affirmative weight for orchestration — which leaves H2 with no evidence in this ledger that is both physical and unrebutted. Only gaps.",
            "The run also wrote down a candidate reading it did not establish: if the WTC 7 disagreement is ever settled by physical rather than computational evidence, the decisive test is residue and metallurgical analysis of retained steel and dust under documented chain of custody — and if no such material still exists in testable form, the question stays permanently open as a matter of evidence availability rather than of unresolved physics."
          ],
          pullquote: "A test that was never run is not a test that found something.",
          visual: {
            type: "probe",
            condition: "H2 requires physical evidence at WTC 7 that impact and fire cannot explain.",
            prediction: "Residue and metallurgical analysis of retained WTC 7 steel and dust, under documented chain of custody, showing energetic material distinct from building products.",
            venue: "The retained WTC 7 debris and dust — the material NIST declined to test.",
            outcomes: [
              { label: "NOT RUN", tone: "neutral", note: "NIST held that its model already accounted for the observations" },
              { label: "NOT EVIDENCE", tone: "negative", note: "Declining to test cannot become a positive finding of residue" },
              { label: "MAYBE UNRUNNABLE", tone: "neutral", note: "If no custody-documented material survives, the gap is permanent" }
            ]
          }
        },
        {
          id: "foreknowledge",
          number: "05",
          eyebrow: "The other claim",
          title: "The warnings are not in dispute. Their specificity is.",
          lead: "The foreknowledge argument does not turn on whether warnings existed — this ledger establishes a great many. It turns on whether any of them named a time, a place and a method.",
          body: [
            "The stream in the record: at least twelve reports over seven years about aircraft used as weapons; the Phoenix memo in July 2001; the Moussaoui arrest in August; the President's Daily Brief of 6 August 2001, “Bin Ladin Determined to Strike in US”; a summer the Joint Inquiry described as the system blinking red; and liaison warnings from Italy, Jordan, Egypt, the United Kingdom, France, Israel, Algeria and the Taliban foreign minister.",
            "On the single variable that decides between the two explanations, the documented warnings are generic. Both the Commission and the Joint Inquiry characterise the failure as vagueness, unrecognised significance and non-dissemination across agencies. The run's own attack on that reading is filed as selection bias and it is a fair one: the characterisation rests on executive summaries and Commission syntheses, and compartmentalised signals intelligence from the summer of 2001 could still contain something specific. The condition under which the reading fails is written down. It has not been met here.",
            "The episodes that look most like intent are where this cuts hardest. FBI headquarters blocking the Moussaoui FISA warrant; a CIA officer blocking notification to the FBI that al-Hazmi and al-Mihdhar were inside the country; Robert Wright and John O'Neill describing shut-down al-Qaeda investigations; a curtailed inquiry into the bin Laden family; a reported change in the Attorney General's travel. Every one of those is described by the same primary witnesses in the language of negligence — Rowley on mishandling and inertia at headquarters, Grassley on the FISA application not going forward, Mueller conceding the Minneapolis warning about flying something into the World Trade Center should have been pursued more vigorously, Wright framing the shutdown as a failure to take terrorism seriously.",
            "Blocking behaviour is compatible with both explanations, and nothing in this ledger discriminates the motive behind it. That is the run's finding, and it is not a finding for either side. Two more strands stay open on the same terms: Able Danger, where the dispute is not about interpreting a shared document but about what documents exist; and the word “solely” in the official account, which a partly declassified 2012 FBI summary and the Operation Encore reporting press on from the foreign direction while the 2004 Commission findings press back."
          ],
          pullquote: "Blocking behaviour is compatible with both explanations. Nothing here discriminates the motive.",
          visual: {
            type: "timeline",
            items: [
              { date: "over seven years", label: "Aircraft as weapons", detail: "At least twelve reports reach the intelligence community about the use of aircraft as weapons." },
              { date: "July 2001", label: "The Phoenix memo", detail: "An FBI field communication flags men with extremist connections in U.S. flight training." },
              { date: "Summer 2001", label: "“The system was blinking red”", detail: "Threat reporting peaks. The Joint Inquiry later finds the intelligence community neither well organized nor equipped to act on it." },
              { date: "6 Aug 2001", label: "The President's Daily Brief", detail: "“Bin Ladin Determined to Strike in US.” Its unredacted full text and the surrounding CIA threat traffic appear nowhere in this record.", tone: "seizure" },
              { date: "Aug 2001", label: "Moussaoui arrested", detail: "Minneapolis agents seek a FISA warrant. Headquarters does not carry the application forward, and the link is missed." },
              { date: "11 Sep 2001", label: "The attacks", detail: "Four aircraft, three targets struck. The plot itself is later reconstructed from proposal through flight training and travel to bin Laden's own acknowledgement." },
              { date: "2002", label: "The Joint Inquiry", detail: "Congress reports systemic failures in watchlisting, information sharing and analysis, and notes that no one will ever know what might have happened had the connections been drawn." },
              { date: "2004", label: "The 9/11 Commission", detail: "Attributes the failure to vagueness, unrecognised significance and non-dissemination — and cannot fully explain why Phoenix, Moussaoui and CIA knowledge of two hijackers inside the country were never connected.", tone: "end" }
            ],
            note: "Dates appear only where this run's sources state them. Every item above is in the ledger, and none of them names a time, a target and a method together."
          }
        },
        {
          id: "counts",
          number: "06",
          eyebrow: "Where the passages came from",
          title: "Sixty of the ninety-five passages came from two pages whose job is to list allegations.",
          lead: "Nothing in this run weights a passage by where it came from. That makes it worth seeing where they came from.",
          body: [
            "Thirty-nine of the ninety-five were read out of one Wikipedia article, “September 11 attacks advance-knowledge conspiracy theories”, whose assessment in this same record notes that it presents claims alongside official rebuttals without weighing evidentiary strength, giving equal narrative space to unsubstantiated claims and well-documented investigative conclusions. Twenty-one more came from a personal wiki page written under a pseudonym and compiled, by its own note, with AI assistance; the run assessed it at the lowest tier. Between them, sixty-three percent of everything weighed.",
            "The technical case against demolition — the part of this record that is genuinely one-sided — rests on eight passages from a single NIST FAQ page and fifteen from a conspiracy explainer. That is why chapter two's table looks the way it does. The foreknowledge column filled up because two compilation sources enumerate dozens of allegations one at a time; the orchestration column stayed empty because the technical rebuttal is compact and the claims it answers arrive in bulk.",
            "This is not an argument that the foreknowledge hypothesis is wrong. It is an argument that its column counts claims made rather than claims established, and that reading the bare tally as a score would invert what the run actually found. The run's own net assessment says the same thing in its own words: the foreknowledge reading is unsupported as to intent, while its factual premises about the sheer volume of warning are conceded."
          ],
          pullquote: "The column filled up because a compilation page lists allegations one at a time.",
          visual: {
            type: "prevalence-ladder",
            items: [
              { value: 41, wording: "“September 11 attacks advance-knowledge conspiracy theories” — 39 passages", source: "Wikipedia" },
              { value: 22, wording: "“LIHOP_vs_MIHOP” — 21 passages, pseudonymous, AI-compiled, assessed unsupported", source: "holonhq.com" },
              { value: 16, wording: "“Was 9/11 an inside job? The evidence, examined” — 15 passages", source: "theconspiratory.com" },
              { value: 8, wording: "WTC Towers investigation FAQ — 8 passages, and the whole technical case against demolition", source: "NIST" },
              { value: 4, wording: "Operation Encore and the Saudi connection — 4 passages, returned by a counter-search", source: "ProPublica" },
              { value: 4, wording: "The SEC's pre-9/11 trading review — 4 passages, returned by a counter-search", source: "National Security Archive" },
              { value: 2, wording: "Congressional Joint Inquiry findings — 2 passages", source: "FAS mirror" },
              { value: 2, wording: "A forum request for expert input on Building 7 — 2 passages", source: "ASCE collaborate" }
            ],
            note: "Shares of the ninety-five passages that declared a bearing. Two sources carry sixty-three percent of them; the government-institutional technical record carries eight."
          }
        },
        {
          id: "attack",
          number: "07",
          eyebrow: "Falsification",
          title: "Ten attacks on its own explanations. Four came back holding something.",
          lead: "The run ran ten adversarial searches, each aimed at an explanation it had written down. Four returned a verified counter-passage — the best yield in this archive — and the six blanks are still not evidence of absence, because no probe was pre-registered.",
          body: [
            "The four that returned did real work. Against the official account: the Joint Inquiry's own findings on the withholding of information about al-Hazmi and al-Mihdhar. Against orchestration: the thread carrying the UAF Building 7 study. Against foreknowledge: the SEC's account-level trading review, which worked through 9.5 million transactions across 103 companies and six industry groups and spoke to the people responsible for the unusual trades. Against the underdetermined reading: ProPublica's account of Operation Encore and the Saudi files, which pushes back the other way.",
            "The six blanks are pointed at things worth noticing. Independent chemical analysis of the red-grey chips — the single test that would settle whether they are nanothermite or standard primer paint — came back empty. So did the Pentagon airframe forensics, the Mineta PEOC logs, the NORAD radar reconstruction, the specificity of the foreign-service warnings, and structural-engineering consensus on the NIST collapse models.",
            "One blank has a second life. A separate snapshot of the Department of Defense Inspector General's report on Able Danger was stored with the digest e3b0c442… — the SHA-256 of zero bytes. The run fetched it, hashed nothing, kept the record, and printed that everything about the source is absent because no text was supplied. The document that would decide whether Able Danger identified Mohamed Atta before the attacks is in this ledger as an empty file, and the page says so rather than quietly dropping it."
          ],
          pullquote: "The report that would settle Able Danger is in the ledger as zero bytes, and the record says so.",
          visual: {
            type: "attack-log",
            items: [
              { target: "H1", looked: "Whether withholding information on al-Hazmi and al-Mihdhar was deliberate policy rather than procedural failure", outcome: "returned" },
              { target: "H1", looked: "Whether foreign warnings from Mossad, DGSE or Egyptian intelligence carried actionable tactical detail", outcome: "empty" },
              { target: "H2", looked: "Peer review of the University of Alaska Fairbanks Building 7 finite-element model", outcome: "returned" },
              { target: "H2", looked: "Independent chemical analysis of the red-grey chips: nanothermite or epoxy primer paint", outcome: "empty" },
              { target: "H2", looked: "Flight 77 airframe forensics, recorder telemetry and light-pole trajectory", outcome: "empty" },
              { target: "H3", looked: "The SEC and FBI review of the pre-9/11 airline put options", outcome: "returned" },
              { target: "H3", looked: "PEOC and Secret Service logs fixing the referent of Cheney's order", outcome: "empty" },
              { target: "H3", looked: "The DoD Inspector General's conclusions on Able Danger and Mohamed Atta", outcome: "empty" },
              { target: "H4", looked: "Independent verification of the NIST collapse models within structural engineering", outcome: "empty" },
              { target: "H4", looked: "The 28 pages and the FBI's Operation Encore files on Saudi facilitation", outcome: "returned" }
            ],
            footer: "4 of 10 adversarial searches yielded a snapshot-bound, verified counter-passage (40.00%)."
          }
        },
        {
          id: "strongest",
          number: "08",
          eyebrow: "The best-supported reading",
          title: "The strongest finding, printed with the attack made on it.",
          lead: "The run's second finding is that every physical signature a controlled demolition would have to leave is absent or independently explained. It is typed observed rather than inferred. Then the run named the way it could be wrong, and the objection is specific enough to act on.",
          body: [
            "The attack is filed as measurement error, and it goes at the negative controls rather than at the conclusion. Ruling out thermitic material on the strength of USGS dust sampling assumes the sampling caught what mattered: the right selection of samples, enough resolution in bulk spectroscopy, and micro-chemical analysis of the distinct red-grey unreacted chips rather than of dust in aggregate. Those are real analytical limits, not rhetoric.",
            "The condition under which the finding fails was written down in advance and is findable: re-analysis of authenticated, chain-of-custody dust samples by transmission electron microscopy and energy-dispersive X-ray spectroscopy, confirming nanostructured unreacted thermitic chips distinct from standard primer paint. That is exactly the study the counter-search went looking for and did not find. Nobody has to be dishonest for this finding to be wrong; somebody has to run the assay.",
            "Seventeen attacks like this are on the record, at least one per asserted finding, each carrying its own failure condition. Nine of the sixteen asserted findings are typed observed and seven inferred. None of them was reviewed by a person: this run does not record whether any reviewer approved any gate, and the page says so rather than implying otherwise."
          ],
          visual: {
            type: "finding-attack",
            finding: {
              label: "Finding",
              id: "fnd_6752eb1991d9f2b3_01",
              status: "observed",
              text: "The specific physical signatures a controlled demolition would have to leave are absent or independently explained: no seismic signal precedes either tower's collapse, no blast below the impact floors was recorded by NIST, the NYPD, the Port Authority police or the fire department, the lateral squibs match compressed air ahead of the falling mass, the molten stream is consistent with aircraft aluminium, and USGS dust analysis found no thermite residue.",
              meta: "6 passages cited · 2 source families · computed confidence: unknown"
            },
            attack: {
              label: "Attack on it",
              id: "stp_0db0ca058759e9e3_01",
              kind: "measurement error",
              text: "The reliance on USGS dust samples to rule out thermitic materials may reflect limits in sample selection, bulk spectroscopy resolution, or the lack of micro-chemical analysis on distinct red-grey unreacted biphasic chips."
            },
            failureLabel: "Recorded failure condition",
            failure: "Re-analysis of authenticated, chain-of-custody dust samples using transmission electron microscopy and energy-dispersive X-ray spectroscopy confirms nanostructured unreacted thermitic chips distinct from standard primer paint."
          }
        },
        {
          id: "score",
          number: "09",
          eyebrow: "The score",
          title: "Sixteen findings asserted, every one unknown, and 14 out of 100.",
          lead: "Sixteen findings were asserted, nine of them typed observed rather than inferred. Every one computed to a confidence of unknown, and the evidence score came to the same 14 out of 100 as the four publications before it — for the same reason.",
          body: [
            "Zero of eleven snapshots reached an upstream origin. Corroboration and provenance therefore both scored zero regardless of how good the underlying material is, because unknown provenance is unknown independence and the scoring will not let a well-argued reading buy its way past that.",
            "Falsification scored 16 of 20 — the highest in this archive, four of ten counter-searches returning. Saturation scored zero, and this is the worst saturation measurement the series has produced: all five source families found in the second retrieval round were new, and the bearing counts on all four explanations moved when that round was added. The search was not close to exhausted when it stopped.",
            "Two measurements belong beside the score. No source in this ledger was assessed as primary data — the technical case against demolition rests on a FAQ page summarising the NCSTAR reports rather than on the reports. And eleven of the hundred and six readable passages were refused by the verbatim gate and appear nowhere in the record, the highest refusal count in the series."
          ],
          visual: {
            type: "score-breakdown",
            components: [
              { label: "Corroboration", value: 0, max: 40, note: "0 of 11 sources traced to an origin" },
              { label: "Provenance", value: 0, max: 25, note: "unknown origin is unknown independence" },
              { label: "Falsification", value: 16, max: 20, note: "4 of 10 counter-searches returned" },
              { label: "Saturation", value: 0, max: 15, note: "all 5 families in round 2 were new" }
            ],
            subtotalLabel: "Components summed",
            subtotal: "16",
            capLabel: "Counter-evidence was found, which caps the unknown band",
            total: "14 / 100",
            confidence: "unknown",
            note: "Not a probability. This run holds no calibrated priors and no likelihood model."
          }
        }
      ],
      principlesHeading: {
        eyebrow: "Take this with you",
        title: "Five checks this run was held to. Use them on anything."
      },
      principles: [
        "Split the claim before you weigh it. “Inside job” bundles a demolition claim this record answers with a foreknowledge claim it cannot settle; one verdict for both is wrong twice.",
        "Ask whether a tally counts claims made or claims established. Forty-eight positives here are mostly one compilation page listing allegations one at a time.",
        "A test that was not run found nothing. NIST declining to test the Building 7 debris is a real methodological failure and still not evidence of residue.",
        "Check whether the falsifier a theory wrote for itself has been met. On the physical channel, this one was, item by item.",
        "Notice when the same witness supplies both readings. The people who describe the blocked investigations describe them as incompetence."
      ],
      limitations: [
        "Zero of eleven source snapshots could be traced to an upstream origin, so nothing here has established independence between its sources. All twenty-one findings computed to a confidence of unknown.",
        "No source in the ledger was assessed as primary data. The technical case against controlled demolition rests on a NIST FAQ page summarising the underlying NCSTAR reports, not on those reports.",
        "Sixty of the ninety-five weighed passages come from two compilation pages — a Wikipedia article and a pseudonymous personal wiki assessed at the lowest tier — whose function is to enumerate allegations rather than adjudicate them.",
        "One of the eleven snapshots is a zero-byte file: the Department of Defense Inspector General report on Able Danger, stored with the SHA-256 digest of empty input.",
        "Another is a Senate committee index page pointing at a PDF, carrying none of the Joint Inquiry's Part Four content, and a third is a 2003 Commission hearing transcript that produced no scored passage.",
        "The case for the University of Alaska Fairbanks Building 7 model reaches this ledger only through a discussion-forum post by a self-described non-engineer asking for expert opinions he lacks.",
        "The counter-search aimed at independent chemical analysis of the WTC dust chips returned nothing. Whether the red-grey chips are thermitic or primer paint is not settled here by any analysis this run read.",
        "No probe was pre-registered. Six of the ten adversarial searches came back empty, and not one of those blanks counts as evidence of absence.",
        "Eleven of the hundred and six readable passages were refused by the verbatim gate and appear nowhere in the record.",
        "The search was not saturated: all five source families found in the second retrieval round were new, and the bearing counts on all four explanations moved when it was added.",
        "The run makes no finding about whether any U.S. official held a warning specifying the date, targets and method. It records that as a question it could not settle, alongside the undisclosed identities behind the Chicago put options, the Able Danger data, and the referent of “the orders” in Mineta's account.",
        "Official categorical denials that there were any warning signs are contradicted by the documented warning stream in this same ledger. The run holds that they should carry no weight in either direction."
      ],
      sourcesHeading: {
        eyebrow: "Source record",
        title: "Eleven snapshots. Three of them produced nothing, and one of those is empty."
      },
      sourcesNote: "Each link is the address that was recorded, printed beside the digest of the bytes that were actually stored. The link is not a guarantee that the address still serves those bytes — the digest is the thing to check a quotation against.",
      sources: [
        {
          number: "01",
          title: "September 11 attacks advance-knowledge conspiracy theories",
          publisher: "Wikipedia",
          tier: "quality journalism",
          digest: "b76137cafec5f37aa5e3d500b61ba1b07637be8e1e0503f88d2b49c280e9ee55",
          href: "https://en.wikipedia.org/wiki/September_11_attacks_advance-knowledge_conspiracy_theories",
          note: "The heaviest source in the run: thirty-nine of the ninety-five passages, including the put-option material, Able Danger, the air-defence anomalies and most of the warning stream. The run's own note on it: it presents conspiracy claims alongside official rebuttals without weighing evidentiary strength, giving equal narrative space to unsubstantiated claims and documented conclusions."
        },
        {
          number: "02",
          title: "LIHOP_vs_MIHOP",
          publisher: "holonhq.com",
          tier: "unsupported",
          digest: "8920219e3e51d32e27b964e02d363ca38d09667506264a99a833f8a4a3f9a16f",
          href: "https://holonhq.com/9_11_2001/Details/LIHOP_vs_MIHOP/",
          note: "Twenty-one passages from a personal wiki page written under a pseudonym and assembled, by its own note, with AI assistance. Assessed at the lowest tier. The run's note: it presents contested assertions as comparably documented evidence, and states no methodology for verifying claims or resolving contradictions between its sources."
        },
        {
          number: "03",
          title: "Was 9/11 an inside job? The evidence, examined",
          publisher: "theconspiratory.com",
          tier: "quality journalism",
          digest: "1a9ecab7fc0008a495199fec12fdb6c6231d95c2c322698390960ac3188c6c83",
          href: "https://theconspiratory.com/theory/september-11-inside-job",
          note: "Fifteen passages, including the Pentagon material, the plot reconstruction and both statements about the untested Building 7 debris. The run flags that its framing is more confident than the reports it cites: NIST and the Commission address engineering causation and intelligence failure, not the conspiracy theory as such."
        },
        {
          number: "04",
          title: "FAQs — NIST WTC Towers Investigation",
          publisher: "National Institute of Standards and Technology",
          tier: "government institutional",
          digest: "cab53742e53f2345bd780f29ce4f03b44f40ae47c21f1ae9ac71494a1f72cb35",
          href: "https://www.nist.gov/world-trade-center-investigation/study-faqs/wtc-towers-investigation",
          note: "Eight passages carrying the entire mechanism and every demolition signature. Behind it: 236 pieces of recovered steel, roughly 7,000 photographs and 7,000 video segments, more than 1,000 interviews, ASTM E119 floor-assembly tests and workstation fire tests. The run notes this page is an institutional summary of those reports, not the reports themselves."
        },
        {
          number: "05",
          title: "Final Report of the Congressional Joint Inquiry Into 9/11: Findings",
          publisher: "Congressional Joint Inquiry / Federation of American Scientists",
          tier: "government institutional",
          digest: "9fc6b375d9a39cb00058c14480bef363a4e4449d6a91b870c3b00b7ad1287367",
          href: "https://irp.fas.org/congress/2002_rpt/findings.html",
          note: "Two passages, returned by the counter-search against the official account. Several of its findings are redacted for national security reasons, which limits what can be checked; it acknowledges its own uncertainty, noting that no one will ever know what might have happened had the connections been drawn differently."
        },
        {
          number: "06",
          title: "Operation Encore and the Saudi Connection: A Secret History of the 9/11 Investigation",
          publisher: "ProPublica",
          tier: "quality journalism",
          digest: "8164feefcd4ed145abcf30f05d88ec887f8d36a0e3349c9989233e8ca0d4246e",
          href: "https://www.propublica.org/article/9-11-investigation-saudi-connections-operation-encore-fbi",
          note: "Four passages, returned by the counter-search against the underdetermined reading, and the source of the pressure on the word “solely”. Built on more than fifty interviews plus previously secret FBI documents. The run notes the narrative framing sometimes suggests more significance than the investigators' own sourced conclusions support."
        },
        {
          number: "07",
          title: "The SEC's pre-September 11, 2001 trading review",
          publisher: "UNREDACTED — The National Security Archive Blog",
          tier: "government institutional",
          digest: "19e459f01086dbdea62682261b27743e3a7bf6a836e8cbaa0e50326eebdb475e",
          href: "https://unredacted.com/2010/04/30/document-friday-terrorist-insider-trading-the-secs-pre-september-11-2001-trading-review/",
          note: "Four passages on the account-level review: 9.5 million transactions, 103 companies, six industry groups, seven markets, 20 August to 11 September 2001. The run notes the post does not address the insurer options activity that other studies flagged, and does not state the thresholds the SEC used for “unusual”."
        },
        {
          number: "08",
          title: "Request for Expert Input: Building 7 Model Resembling Reality",
          publisher: "ASCE Collaborate",
          tier: "unsupported",
          digest: "326d1f7981f001eca5e7d74e11aa4ee2f1ef81d3e773e1d8284be2fc9958d9fb",
          href: "https://collaborate.asce.org/discussion/request-for-expert-input-building-7-model-resembling-reality",
          note: "Two passages, and the whole of the pro-UAF case in this run. A forum post by a site manager who identifies himself as not a structural engineer and explicitly seeks expertise he lacks. It offers no analytical basis beyond inviting opinions on how three videos look."
        },
        {
          number: "09",
          title: "Declassified Version of Part Four, Joint Inquiry into Intelligence Community Activities",
          publisher: "Senate Select Committee on Intelligence",
          tier: "government institutional",
          digest: "3f55b718d99edcfeab1c603b277ee62769ac837401a679f6cf5f10db52b95943",
          href: "https://www.intelligence.senate.gov/2016/07/15/publications-declassified-version-part-four-joint-inquiry-intelligence-community-activities-and/",
          note: "The 28 pages — snapshotted as a website index pointing at a downloadable PDF. None of the report's content is in the stored bytes, and no passage in the run rests on it."
        },
        {
          number: "10",
          title: "National Commission on Terrorist Attacks Upon the United States — hearing, 23 May 2003",
          publisher: "9-11commission.gov",
          tier: "government institutional",
          digest: "55ba3d8d852eb2eceb5924d69e59cc6903ff5453747cb52f840415d047353f8f",
          href: "https://www.9-11commission.gov/archive/hearing2/9-11Commission_Hearing_2003-05-23.htm",
          note: "A public hearing transcript covering the attacks, the aviation and NORAD response, and subsequent security reform — snapshotted, assessed, and cited by no passage in the run. The run's note: the transcript does not reconcile conflicting witness accounts of the timeline or of shoot-down authority."
        },
        {
          number: "11",
          title: "Department of Defense Inspector General report on Able Danger",
          publisher: "Federation of American Scientists mirror",
          tier: "unsupported",
          digest: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
          href: "https://irp.fas.org/agency/dod/ig-abledanger.pdf",
          note: "Zero bytes. That digest is the SHA-256 of empty input, and the run's own assessment reads that everything about the source is absent because no text was supplied. The document that would settle whether Able Danger identified Mohamed Atta before the attacks is in this ledger as an empty file — printed here because the run stored it."
        }
      ],
      next: {
        eyebrow: "Your turn",
        title: "Two claims, two answers, and the run would not merge them.",
        body: "You can check a falsifier against a record without trusting anyone — H2 wrote its own, and this ledger satisfies it. You can also check what came back empty: six of ten adversarial searches, and the report that would settle Able Danger sitting in the sources as zero bytes. The whole run is published unedited, every search and every digest. The next dossier takes the same method to the next contested claim."
      }
    },
    {
      slug: "vaccine-sterilization-the-water-that-tested-higher",
      kind: "report",
      label: "Research dossier",
      issue: "DOSSIER 006",
      status: "published",
      featured: false,
      publishedAt: "2026-08-29",
      updatedAt: "2026-08-29",
      readMinutes: 14,
      runId: "115f404c-9194-4de7-81cf-5c18fd48ad6d",
      title: "The vaccine sterilization claim, and the water that tested higher.",
      shortTitle: "The vaccine sterilization claim",
      deck: "Four explanations, eight adversarial searches, and a positive result that fails on the instrument rather than on anybody's motive — from a ledger where twenty-one of twenty-five passages came out of one fact-check.",
      cardLine: "Why the tests that found a sterilising agent in tetanus vaccine were the wrong tests — and what this run still could not reach.",
      question: "What evidence exists regarding claims that the World Health Organization has used vaccination programs to covertly sterilize populations?",
      answer: "Every positive hCG signal in this record traces to an assay used outside the domain it was validated for, and every properly validated test came back negative — in one Hungarian laboratory, sterile hospital water produced a higher false-positive reading than the vaccine did. The affirmative case in this ledger is assertion and testimony with no named laboratory, assay or custody trail. But the run also found that the explanation of where the claim came from is not established here, that one Kenyan strand genuinely does not resolve, and that nothing in the ledger touches India at all. All thirteen findings computed to a confidence of unknown.",
      disclosure: "This run surveyed the evidentiary basis of specific, documented sterilization allegations against WHO-linked vaccination campaigns. It records no run-level verdict. Its reach is bounded to the Kenyan and Philippine episodes, where testing details are on the record; for Mexico, Nicaragua, Tanzania and India it holds no assay records either way.",
      accent: "teal",
      tags: ["Assay validation", "Rumour transmission", "Falsification"],
      cover: {
        index: "DYOR—006",
        serial: "006 / 2026",
        lines: ["THE WATER", "TESTED HIGHER", "THAN THE VACCINE."],
        footer: "One assay → one control → what stays open"
      },
      transcript: {
        href: "assets/reports/dyor-115f404c-9194-4de7-81cf-5c18fd48ad6d.md",
        label: "Read the full method transcript",
        note: "The complete 1,327-line run record: every search, every verbatim excerpt, every bearing, every snapshot digest. Published unedited so the story above can be checked against it."
      },
      scope: {
        audience: "Anyone weighing the claim — including a parent who has heard it and wants to know how it was checked.",
        focus: "Documented allegations that WHO-associated vaccination campaigns were used to sterilize recipients covertly, and what testing and investigation followed them.",
        excluded: "Vaccine safety concerns unrelated to fertility, consented family-planning programmes, non-WHO population policies, other vaccine-ingredient theories, and the legal and political consequences of the allegations except as evidence of their spread. Each was placed out of scope before any source was read."
      },
      stats: [
        { value: "21/25", label: "passages from a single fact-check" },
        { value: "0/6", label: "sources traced to an origin" },
        { value: "07", label: "attacks on its own findings" }
      ],
      thesis: {
        label: "Where the argument actually turns",
        statement: "There is no run-level verdict in this record and the renderer does not invent one. The claim's evidentiary core fails on a question of assay validation that has nothing to do with anyone's honesty — and the run then says plainly which parts of its own explanation it has not established.",
        status: "no run-level verdict"
      },
      chapters: [
        {
          id: "boundary",
          number: "01",
          eyebrow: "The boundary",
          title: "The question said the world. The record covers two countries.",
          lead: "The input asked about the World Health Organization sterilizing the world through vaccination. Before searching, the run wrote down that it would read “the world” as a rhetorical claim about a covert programme rather than a literal universal target, and that it would test documented allegations rather than presuppose them.",
          body: [
            "It recorded three more ambiguities. Whether “the world” means one unified global conspiracy or a set of separate national-level allegations. Whether “trying to” is a claim about institutional intent or about effects. And whether the question wanted the truth of the claim assessed or a survey of its origins and how it was investigated. It also fixed a definition that does real work later: WHO as an institutional actor, distinct from national health ministries and from other bodies that sometimes co-fund the campaigns.",
            "What that produced is narrower than the question sounds. The ledger reaches Kenya in 2014 and the Philippines in 1995 with actual testing details on the record. For Mexico, Nicaragua and Tanzania it holds only characterisations of the allegations as rumours, plus the accusing bishops' contrary assertion, with no underlying assay records either way. For India it holds nothing at all — India is named among the target countries in the hypothesis the run wrote, and no passage in the run addresses it.",
            "Out of scope before any source was read: vaccine safety concerns unrelated to fertility, voluntary family-planning programmes labelled as such, non-WHO population policies, other vaccine-ingredient theories, and the legal and political fallout of the allegations except as evidence of their spread."
          ],
          pullquote: "India is named in the hypothesis and addressed by nothing in the ledger. The run prints that as a gap, not a silence.",
          visual: {
            type: "scope-boundary",
            askedLabel: "What was asked",
            asked: [
              "Where the allegations first emerged, and what triggered them",
              "What laboratory testing was done, and by what method",
              "How WHO and health ministries responded",
              "What fact-checkers and researchers concluded",
              "What remains unresolved on either side"
            ],
            excludedLabel: "Declared out of scope",
            excluded: [
              "Vaccine safety concerns unrelated to fertility",
              "Consented family-planning programmes",
              "Other vaccine-ingredient theories",
              "Boycotts and litigation, except as spread"
            ],
            note: "Period: the 1990s to the present. Geography: global in principle; in this ledger, Kenya and the Philippines carry every testing detail."
          }
        },
        {
          id: "explanations",
          number: "02",
          eyebrow: "Competing explanations",
          title: "Four explanations, and only one of them collected a strong negative.",
          lead: "Before any source was read the run wrote down four rival accounts and, for each, the observation that would destroy it. Twenty-five passages went on to declare a bearing on all four.",
          body: [
            "H1 says there was no covert programme and the allegations came from flawed testing. H2 says anti-fertility agents really were included in at least some campaigns. H3 says the allegations descend from real historical anti-fertility vaccine research being conflated with unrelated tetanus campaigns. H4 says the pattern is driven by institutional distrust rather than by case-specific evidence.",
            "H2 is the only column carrying strong negatives: five of them, plus thirteen weak, against four weak positives and no strong positive at all. That is what it looks like when a hypothesis meets the falsifier it wrote for itself — the run's own note is that H2's affirmative case in this ledger consists entirely of assertion and testimony with no verified chain of custody.",
            "H3's column is the strange one. Eight weak positives, seventeen non-discriminating, and not a single negative in either direction. A column of zeros is not agreement; it is a hypothesis nothing in the roster touched. Chapter four is about why."
          ],
          pullquote: "A column of zeros is not agreement. It is a hypothesis nothing here tested.",
          visual: {
            type: "hypothesis-roster",
            scale: ["++", "+", "0", "-", "--"],
            items: [
              {
                id: "H1",
                claim: "The campaigns were not used to sterilize anyone; the allegations arose from flawed lab testing, misidentified antigens, chain-of-custody failures and misreading of legitimate anti-fertility research.",
                falsifier: "A verified, custody-intact WHO-linked batch containing beta-hCG conjugate, corroborated by independent replication with validated assays across multiple laboratories.",
                counts: [5, 14, 2, 4, 0]
              },
              {
                id: "H2",
                claim: "WHO, with other bodies, covertly included anti-fertility agents in vaccination campaigns in at least some documented cases, without informed consent.",
                falsifier: "Absence of any verified positive for anti-fertility agents in properly custodied samples across the investigated cases, with documented unbiased re-testing consistently negative.",
                counts: [0, 4, 3, 13, 5]
              },
              {
                id: "H3",
                claim: "The allegations stem from real historical WHO-affiliated research into hCG-based anti-fertility vaccines being conflated with unrelated tetanus toxoid campaigns.",
                falsifier: "Evidence that no such research programme existed — or, conversely, that its outputs really were deployed in the disputed campaigns rather than merely running in parallel.",
                counts: [0, 8, 17, 0, 0]
              },
              {
                id: "H4",
                claim: "The persistence of the allegations is explained by institutional distrust and a recurring template, rather than by new evidence in each case.",
                falsifier: "Evidence that allegations in different countries arose independently from case-specific local findings rather than from an imported narrative, and that trust does not predict prevalence.",
                counts: [2, 7, 15, 1, 0]
              }
            ],
            note: "25 passages declared a bearing on each explanation. H3 collected no negative bearing of any strength — and no strong positive either."
          }
        },
        {
          id: "assay",
          number: "03",
          eyebrow: "The instrument",
          title: "The positives fail on the equipment, not on anyone's honesty.",
          lead: "The Kenya Catholic Doctors Association said six samples sent to South African laboratories tested positive for hCG. The run's leading finding is that every positive signal in this record traces to an assay used outside the domain it was validated for — and that every properly validated test returned negative.",
          body: [
            "Start with what was put into the machine. Vaccine samples were sent to hospital laboratories and tested with pregnancy test kits developed for use on serum and urine — not for a tetanus toxoid vaccine containing merthiolate as a preservative and an aluminium salt as an adjuvant. Low levels of hCG-like activity duly appeared in some samples. The testing laboratories themselves recognised the results as insignificant: below the reliable detection capability of the kits, and produced by a non-specific interaction between the adjuvant and the test.",
            "Then what the laboratories were told. The staff running those analyses could not tell whether they were testing vaccine, because that was not declared to them. Kenyan hospital laboratories were running human-sample analyzers — the ones used for blood and urine pregnancy testing — and UNICEF's position in this record is that no laboratory in Kenya had the capacity to assay a non-human sample such as a vaccine for hCG at all.",
            "Then the control that settles it. When the vaccines were tested in laboratories using properly validated systems, the results showed no hCG; the low readings elsewhere were false positives. In one Hungarian laboratory, the sterile water supply from the local hospital gave a higher false-positive hCG level than the tetanus vaccine did. That is a negative control doing its job, and it does not require anyone in the story to be lying.",
            "The same signature recurs independently in the Philippines. The physician who tested six vials in 1995 — outside any official research protocol — found hCG-like substances in three of them at up to seven milli-international units per cubic centimetre, and said himself that this was insignificant: it would have mattered in the hundreds or thousands of units. That is a magnitude discrepancy, not a detection, and it was the accusing side's own witness who said so."
          ],
          pullquote: "Sterile hospital water gave a higher false-positive reading than the vaccine did.",
          visual: {
            type: "probe",
            condition: "H2 requires hCG conjugated to tetanus toxoid in a verified, custody-intact WHO-distributed batch.",
            prediction: "A validated assay for a non-human matrix, run on a declared vaccine sample, returning hCG at a level that could plausibly do anything.",
            venue: "An accredited laboratory with negative controls and a documented chain of custody from vaccination site to bench.",
            outcomes: [
              { label: "WRONG MATRIX", tone: "negative", note: "Serum and urine pregnancy kits, run on vaccine containing merthiolate and an aluminium adjuvant" },
              { label: "UNDECLARED SAMPLE", tone: "negative", note: "The Kenyan laboratories were not told what they were testing, and had no non-human-matrix capacity" },
              { label: "VALIDATED: NEGATIVE", tone: "positive", note: "Systems with controls found no hCG; sterile hospital water read higher than the vaccine" }
            ]
          }
        },
        {
          id: "template",
          number: "04",
          eyebrow: "Where the claim came from",
          title: "The claim arrived before the samples did — and the paper that would explain why is a blank page.",
          lead: "The Kenyan allegation reproduces, nearly clause for clause, a narrative already circulating two decades earlier in Mexico, Tanzania, Nicaragua and the Philippines during WHO and UNICEF tetanus campaigns. The bishops cite those countries as precedent rather than as independent local findings.",
          body: [
            "That is the pattern H4 predicts, and the run reads it as supported: an imported template supplies the hypothesis and the choice of target campaign. But the run then says H4 overreaches as stated, because at least some allegations did generate case-specific local artefacts. Samples really were collected and tested in Kenya, and independently in the Philippines. The better-supported reading is two-stage — the template supplies the suspicion, and locally generated false positives then supply what looks like case-specific confirmation. The run marks that inferred rather than observed, because it is a pattern read across passages, not a sequence anyone watched happen.",
            "Now the part that matters for anyone trying to explain the belief rather than just rebut it. H3 says the whole thing descends from real WHO-affiliated research into hCG-based anti-fertility vaccines, conflated with routine tetanus campaigns. The run could not establish that here. The only description of hCG-toxoid immunocontraception in the entire ledger comes from the accusing bishops' own statement, and the WHO and UNICEF rebuttal mentions a contraceptive vaccine only to deny that tetanus toxoid was one.",
            "The run went looking. It snapshotted the Europe PMC record for a study on a candidate antipregnancy vaccine — beta-subunit of human chorionic gonadotropin linked to tetanus toxoid — and what came back was the site's interface and navigation menu. No abstract, no methods, no results. Its counter-search for WHO Task Force documentation returned nothing, and so did its search for textual tracing of the 1990s anti-vaccine publications. So H3 currently rests on an adversarial source's account of the very research it alleges was deployed, and the run says exactly that rather than borrowing the explanation from general knowledge."
          ],
          pullquote: "The paper that would anchor the whole conflation story is in this ledger as a navigation menu.",
          visual: {
            type: "lineage-chain",
            items: [
              { date: "", actor: "A candidate antipregnancy vaccine", added: "Beta-hCG linked to tetanus toxoid — a real line of research, and the factual anchor the conflation story needs. In this ledger it is a Europe PMC landing page carrying no abstract." },
              { date: "two decades earlier", actor: "Mexico, Tanzania, Nicaragua, the Philippines", added: "Rumours that WHO and UNICEF are testing a contraceptive vaccine under the guise of tetanus toxoid. WHO calls them completely untrue and attributes them to pro-life groups." },
              { date: "Feb 1995", actor: "Dr Edmundo Villacorta", added: "Tests six Philippine vials outside any official protocol. Finds hCG-like substances in three, at up to 7 mIU/cc, and says himself it is insignificant — significance would begin in the hundreds or thousands." },
              { date: "Mar 1995", actor: "A Manila court", added: "A temporary restraining order halts the national immunisation drive after pro-life groups allege the vaccine contains abortifacient hCG." },
              { date: "Oct 2014", actor: "Catholic bishops in Kenya", added: "Assert as established fact that hCG-laced tetanus toxoid had previously been used in the Philippines, Nicaragua and Mexico — citing no test." },
              { date: "2014", actor: "The Kenya Catholic Doctors Association", added: "Says six samples sent to laboratories in South Africa tested positive for the hCG antigen. No laboratory, assay or custody trail is named anywhere in this record." },
              { date: "Dec 2016", actor: "KENAS and ILAC", added: "Audit Agriq-Quest, one of the testing companies, which loses its accreditation. The theory outlives its evidence, sustained afterwards by the accreditation loss rather than by any new positive result." }
            ],
            note: "Dates appear only where this run's sources state one. The head of this chain carries none, because the page stored for it contains no publication data."
          }
        },
        {
          id: "exposed",
          number: "05",
          eyebrow: "Where it is exposed",
          title: "One strand genuinely does not resolve, and the run refuses to close it.",
          lead: "Agriq-Quest, the company that ran analyses for the Catholic Doctors Association, alleged through counsel that the Ministry of Health withheld 13.8 million shillings because the firm refused to doctor results. The same firm then lost its accreditation after KENAS and ILAC audits, and a former employee alleged it lacked the capacity for the tests it was handling.",
          body: [
            "Read those two ways. Suppression of true positives predicts a payment dispute followed by an adverse audit. Incompetence generating false positives predicts a payment dispute followed by an adverse audit. The observable set is identical, and the run says so: this cluster discriminates between the explanations only if the audit's substantive findings and the raw instrument data are examined, and neither is in the ledger.",
            "That is why one of the run's open questions asks specifically whether the audit's cited deficiencies actually covered the hCG assays run for the Catholic Doctors Association, as opposed to unrelated capacity or procedural problems. Until that is on the record, the accreditation loss cannot do the work that both sides have asked it to do. Snopes itself supplies the third reading the run keeps live throughout: someone, somewhere, is sincere but mistaken.",
            "The chain below is the official reading's own required conditions. Two of the three hold in this ledger. The third — that health authorities re-tested from verified cold-chain samples and found nothing — is not established here: the WHO and UNICEF statement in this record is stored as an introductory snippet asserting misinformation without presenting testing or data, and no cold-chain re-test record appears anywhere in the run.",
            "The outcome evidence points the same way as the assay evidence without settling intent. Neonatal tetanus incidence fell over fifteen years in rural Kilifi, contemporaneously with the campaigns and against a real disease burden — 550 Kenyan infant deaths in 2013. The Philippine product had been in use since 1983 with no reported adverse reactions, and Kenya's head of immunization reported subsequent conceptions among vaccinated women. The run marks the attribution partial: the same study notes a concurrent rise in facility-based deliveries as an uncontrolled co-intervention, and the fertility observations are official testimony rather than cohort data."
          ],
          pullquote: "Suppression and incompetence predict the same two events. The ledger holds neither the audit findings nor the instrument data.",
          visual: {
            type: "condition-chain",
            items: [
              { label: "No independently replicated, methodologically sound result confirms beta-hCG in WHO-distributed batches", state: "supported" },
              { label: "The documented positive testing claims suffer methodological flaws", state: "supported" },
              { label: "Health authorities re-tested from verified cold-chain samples and found nothing", state: "unknown" }
            ]
          }
        },
        {
          id: "attack",
          number: "06",
          eyebrow: "Falsification",
          title: "Eight attacks on its own explanations. Six came back empty.",
          lead: "The run ran eight adversarial searches, two against each explanation. Two returned a verified counter-passage. The six blanks are not evidence of absence — no probe was pre-registered — and where they were pointed says a good deal about what this dossier can and cannot claim.",
          body: [
            "Both that returned were aimed at the covert-sterilization hypothesis, and both weakened it: the 1995 Philippine episode, which produced the physician's own account of insignificant readings, and the Kilifi neonatal tetanus study, which is the only peer-reviewed source in the entire ledger. So the counter-evidence this run actually obtained runs in one direction, and a reader who wants to discount the conclusion for that reason has the count to do it with.",
            "The two searches aimed at the official reading came back empty — peer-reviewed laboratory confirmation of beta-hCG in sealed vials, and whistleblower or internal documentation of deliberate covert deployment. Those blanks are the ones proponents would most want to fill, and the run is explicit that finding nothing there is not the same as establishing that nothing exists.",
            "The remaining four blanks are the ones that shape this page. Both searches for the historical anti-fertility research programme returned nothing, which is why the conflation explanation stays unanchored. And both searches aimed at the distrust hypothesis returned nothing: no data pairing measured institutional trust with allegation prevalence, and no archival evidence on whether the Kenyan groups began testing before or after encountering the earlier literature. The run therefore cannot show that distrust drives the pattern, and says so."
          ],
          pullquote: "The two searches for the research programme came back empty, which is why the explanation stays unanchored.",
          visual: {
            type: "attack-log",
            items: [
              { target: "H1", looked: "Peer-reviewed confirmation of beta-hCG conjugate in sealed, verified tetanus vials using validated non-serum assays", outcome: "empty" },
              { target: "H1", looked: "Leaked internal communications or whistleblower testimony of deliberate covert deployment", outcome: "empty" },
              { target: "H2", looked: "Official Philippine testing results from the 1995 tetanus toxoid investigations", outcome: "returned" },
              { target: "H2", looked: "Post-campaign fertility and birth-rate data among vaccinated Kenyan women", outcome: "returned" },
              { target: "H3", looked: "Whether WHO anti-fertility trial batches were ever manufactured or shipped alongside public tetanus supply", outcome: "empty" },
              { target: "H3", looked: "Whether the 1994–95 anti-vaccine publications cited the real research papers out of context", outcome: "empty" },
              { target: "H4", looked: "Whether the Kenyan claims began from local anomalies or from imported template literature", outcome: "empty" },
              { target: "H4", looked: "Empirical studies linking institutional distrust to sterilization-rumour uptake", outcome: "empty" }
            ],
            footer: "2 of 8 adversarial searches yielded a snapshot-bound, verified counter-passage (25.00%)."
          }
        },
        {
          id: "strongest",
          number: "07",
          eyebrow: "The best-supported reading",
          title: "The strongest finding, printed with the attack made on it.",
          lead: "The run's leading finding is that every positive signal traces to an assay used outside its validated domain, and every validated test returned negative. It is typed observed. Then the run named the way it could be wrong, and the objection is a real one.",
          body: [
            "The attack is filed as measurement error, and it inverts the argument rather than denying it. Suppose the clinical analyzers were picking up intact hCG-toxoid conjugate, and suppose the specialised diluents and extraction protocols used by the validating laboratories degraded or precipitated that conjugate. Then the validated negatives are false negatives and the crude positives were the real signal. Nothing about that requires a conspiracy; it requires a specific chemistry to be true.",
            "The failure condition was written down in advance and is testable: a demonstration, by analytical chemistry or controlled spiking experiments, that standard matrix-neutralising preparation for non-human fluids degrades hCG-toxoid conjugates, preventing detection in validated systems while leaving cross-reactive fragments detectable in direct clinical analyzers. Nothing in this ledger runs that experiment.",
            "Seven attacks like this are on the record against nine asserted findings, each with its own failure condition — including one arguing that the accreditation audits could themselves have been punitive, and one arguing that aggregate public-health outcomes cannot rule out batch-specific contamination or partial fertility effects. This run does not record whether any person reviewed any stage of it, and the page says so rather than implying otherwise."
          ],
          visual: {
            type: "finding-attack",
            finding: {
              label: "Finding",
              id: "fnd_0aacffcd6a55eb57_00",
              status: "observed",
              text: "Every positive hCG signal in the record traces to an assay used outside its validated domain, and every properly validated test returned negative: pregnancy kits designed for serum and urine were applied to vaccine containing merthiolate and an aluminium adjuvant; the testing laboratories themselves called the resulting readings insignificant and below reliable detection; and a Hungarian laboratory's sterile hospital water produced a higher false positive than the vaccine.",
              meta: "5 passages cited · 1 source family · computed confidence: unknown"
            },
            attack: {
              label: "Attack on it",
              id: "stp_a107fb0205ff6ce8_00",
              kind: "measurement error",
              text: "If the clinical analyzers were sensitive to intact hCG-tetanus toxoid conjugates that were altered, degraded or stripped out by the specialised diluents and extraction protocols used in the validating laboratories, the negative validation tests would be false negatives rather than true negatives."
            },
            failureLabel: "Recorded failure condition",
            failure: "Demonstration via analytical chemistry or controlled spiking experiments that standard matrix-neutralizing sample preparation protocols for non-human fluids degrade or precipitate hCG-toxoid conjugates, preventing detection in validated systems while leaving residual cross-reactive fragments detectable in direct clinical analyzers."
          }
        },
        {
          id: "score",
          number: "08",
          eyebrow: "The score",
          title: "Nine findings asserted, every one unknown, and 14 out of 100.",
          lead: "Nine findings were asserted, five of them typed observed rather than inferred. Every one computed to a confidence of unknown, and the evidence score came to the same 14 out of 100 as every dossier before it — for the same reason.",
          body: [
            "Zero of six snapshots reached an upstream origin, so corroboration and provenance both scored zero. That is not a comment on the quality of the underlying material; it is the scoring refusing to treat untraced sources as independent of one another.",
            "Falsification scored 15 of 20 for two of eight counter-searches returning. Saturation scored zero: the first retrieval round found a single source family, the second found four and all four were new, and the counts on all four explanations moved when that round was added. A run that quadruples its source base on the second pass has not finished looking.",
            "Two measurements make this the thinnest ledger in the archive. Twenty-one of the twenty-five weighed passages came out of one fact-check article, and four of the nine asserted findings rest on that single source family alone. And this run does not record an excerpt-verification tally at all — the field that reports how many quotations survived the verbatim gate is absent here, so this page cannot tell you what it usually can."
          ],
          visual: {
            type: "score-breakdown",
            components: [
              { label: "Corroboration", value: 0, max: 40, note: "0 of 6 sources traced to an origin" },
              { label: "Provenance", value: 0, max: 25, note: "unknown origin is unknown independence" },
              { label: "Falsification", value: 15, max: 20, note: "2 of 8 counter-searches returned" },
              { label: "Saturation", value: 0, max: 15, note: "all 4 families in round 2 were new" }
            ],
            subtotalLabel: "Components summed",
            subtotal: "15",
            capLabel: "Counter-evidence was found, which caps the unknown band",
            total: "14 / 100",
            confidence: "unknown",
            note: "Not a probability. This run holds no calibrated priors and no likelihood model."
          }
        }
      ],
      principlesHeading: {
        eyebrow: "Take this with you",
        title: "Five checks this run was held to. Use them on anything."
      },
      principles: [
        "Ask what the instrument was validated for. A pregnancy kit reading a vaccine is not a positive result; it is a kit being used outside its domain.",
        "Look for the negative control before you look at the result. Sterile hospital water reading higher than the sample tells you what the number is worth.",
        "Check the magnitude against what would matter. Seven units where hundreds would be needed is a discrepancy, not a detection — and the accusing side's own witness said so.",
        "When two stories predict the same two events, the events cannot choose between them. A payment dispute plus a failed audit is what both suppression and incompetence look like.",
        "Separate the rebuttal from the explanation. This run can say the testing was flawed and still not have established where the claim originally came from."
      ],
      limitations: [
        "Twenty-one of the twenty-five weighed passages come from a single fact-check article, and four of the nine asserted findings rest on that one source family alone.",
        "Zero of six source snapshots could be traced to an upstream origin, so nothing here has established independence between its sources. All thirteen findings computed to a confidence of unknown.",
        "No source in the ledger was assessed as primary data. The only peer-reviewed source is the Kilifi neonatal tetanus study, and it contributes one passage.",
        "The Europe PMC record for the candidate antipregnancy vaccine — the paper that would anchor the conflation explanation — was stored as the site's interface and navigation menu, with no abstract, methods or results in the bytes.",
        "The WHO and UNICEF statement on the Kenyan vaccine was stored as an introductory snippet that asserts misinformation without presenting testing, data or methodology, and no passage in the run rests on it.",
        "No probe was pre-registered. Six of the eight adversarial searches came back empty, including both searches aimed at the official reading, and not one of those blanks counts as evidence of absence.",
        "This run does not record an excerpt-verification tally, so the usual measurement of how many quotations survived the verbatim gate is missing here.",
        "The reach is bounded to Kenya and the Philippines. For Mexico, Nicaragua and Tanzania the ledger holds only characterisations of the allegations as rumours; for India it holds nothing at all.",
        "The Agriq-Quest strand is unresolved: the ledger contains neither the substantive findings of the KENAS and ILAC audit nor the raw instrument data, so the accreditation loss cannot adjudicate between suppression and incompetence.",
        "Nothing in the ledger measures institutional trust, refusal rates or allegation prevalence in any population, so the quantitative half of the distrust explanation is untested here.",
        "The outcome evidence is only partially attributable: the Kilifi study notes a concurrent rise in facility-based deliveries as an uncontrolled co-intervention, and the reports of subsequent conceptions are official testimony rather than cohort data.",
        "The search was not saturated: round one found one source family, round two found four and all four were new."
      ],
      sourcesHeading: {
        eyebrow: "Source record",
        title: "Six snapshots. One carries the dossier; three carry nothing."
      },
      sourcesNote: "Each link is the address that was recorded, printed beside the digest of the bytes that were actually stored. The link is not a guarantee that the address still serves those bytes — the digest is the thing to check a quotation against.",
      sources: [
        {
          number: "01",
          title: "Is Tetanus Vaccine Spiked with Sterilization Chemicals?",
          publisher: "Snopes",
          tier: "quality journalism",
          digest: "7ccc8d843637f4b82a4e0e40986ff4b7d959bf79b3c73ef68f9715524b049643",
          href: "https://www.snopes.com/fact-check/tetanus-vaccine-sterilization/",
          note: "Twenty-one of the twenty-five passages, and every testing detail on this page: the pregnancy kits, the undeclared samples, the Hungarian water, the bishops' statement, the accreditation loss and the payment dispute. It discloses no funding, no conflicts, no methodology beyond described archival research, and no editorial review process beyond a byline."
        },
        {
          number: "02",
          title: "Court stops use of antitetanus vaccine in immunization drive",
          publisher: "UCA News",
          tier: "quality journalism",
          digest: "2a74d37be8409ef3633f2aa2403625ba8a915e0550f75154a2498891f5d7b3f2",
          href: "https://www.ucanews.com/story-archive/?post_id=46985&post_name=%2F1995%2F03%2F20%2Fcourt-stops-use-of-antitetanus-vaccine-in-immunization-drive",
          note: "Three passages, returned by a counter-search: the Manila restraining order, the physician's own account of insignificant readings, and the joint assurance from health authorities. The run notes the gap in the story it tells — an informal test whose own author calls the result insignificant becomes the basis for halting a national immunisation drive."
        },
        {
          number: "03",
          title: "Incidence and Risk Factors for Neonatal Tetanus in Admissions to Kilifi County Hospital, Kenya",
          publisher: "PLOS One",
          tier: "peer reviewed",
          digest: "1b4e2ee4d8bcef31d12db86f28ecee21705d9cf0c5547a48135da454bbb58140",
          href: "https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0122606",
          note: "The only peer-reviewed source in the run, and it contributes one passage: neonatal tetanus incidence fell over fifteen years in rural Kenya, contemporaneously with the campaigns. Its design is observational, and the authors themselves name a competing explanation — a rising rate of facility-based delivery over the same period."
        },
        {
          number: "04",
          title: "Statement from WHO and UNICEF on the Tetanus Vaccine in Kenya",
          publisher: "World Health Organization",
          tier: "government institutional",
          digest: "2abafd99abed2d3db1ae3e3b7c75c79924ffa78b1bbcb8e419a95febdcbc2ad6",
          href: "https://www.afro.who.int/news/statement-who-and-unicef-tetanus-vaccine-kenya",
          note: "The institutional response — snapshotted as an introductory snippet rather than the full statement, and cited by no passage in the run. The run's note: it asserts misinformation about the vaccine's quality without presenting evidence, testing or data within the stored text."
        },
        {
          number: "05",
          title: "Observations on the antigenicity and clinical effects of a candidate antipregnancy vaccine: beta-subunit of human chorionic gonadotropin linked to tetanus toxoid",
          publisher: "Europe PMC",
          tier: "unsupported",
          digest: "51e1387bf7904f6bd80de4ccd064897fd104f9416f08e3e9d5f8a505f566a752",
          href: "https://europepmc.org/article/med/7418885",
          note: "The paper the whole conflation argument turns on — stored as the site's interface and navigation menu. No abstract, no methodology, no results, no sample, no funding. The record of hCG-toxoid anti-fertility research is in this ledger by title alone, which is why the run refuses to claim that explanation as established."
        },
        {
          number: "06",
          title: "The Bill Gates “Depopulation Through Forced Vaccination” Headline, Explained",
          publisher: "Snopes",
          tier: "quality journalism",
          digest: "0607be4d6d2470ea6224672e45d14c9babd70ba2d4f23ec1bf5aeebc4c911d99",
          href: "https://www.snopes.com/fact-check/bill-gates-depopulation/",
          note: "Retrieved in the first round, assessed, and cited by no passage in the run. It is printed here because the run stored it: a snapshot that contributed nothing to any finding is still part of what was read."
        }
      ],
      next: {
        eyebrow: "Your turn",
        title: "A negative control is something you can check without trusting anyone.",
        body: "Sterile water reading higher than the vaccine is the kind of fact that settles an argument without anyone having to be called a liar — and so is its limit: this run could not establish where the claim originally came from, because the paper that would explain it is in the sources as a navigation menu. The whole run is published unedited, every search and every digest. The next dossier takes the same method to the next contested claim."
      }
    },
    {
      slug: "moon-landing-what-the-mirrors-cannot-prove",
      kind: "report",
      label: "Research dossier",
      issue: "DOSSIER 007",
      status: "published",
      featured: true,
      publishedAt: "2026-08-29",
      updatedAt: "2026-08-29",
      readMinutes: 13,
      runId: "26d8b267-7df3-43b3-a759-ba003acc38c3",
      title: "The Moon landing, and what the mirrors cannot prove.",
      shortTitle: "The Moon landing hoax",
      deck: "Not one passage in this ledger bears for the hoax — and the run still says the evidence everyone reaches for proves the wrong thing.",
      cardLine: "The lasers establish that hardware is on the Moon. Something else has to establish that people put it there.",
      question: "What is the origin, content, and evidentiary basis of claims that the 1969-1972 Apollo Moon landings were staged or fabricated, and how do these claims hold up against the physical, photographic, and independent third-party evidence available?",
      answer: "Fourteen passages declared a bearing and not one of them supports fabrication. But the run's second finding is the one worth reading: laser ranging constrains the presence of hardware, not the agency that delivered it. Every precision passage is silent on who emplaced the arrays, and the Lunokhod reflectors sitting beside them are proof that robots could place working retroreflectors at the time. What actually discriminates is a Japanese orbiter's image of engine-scoured ground at the Apollo 15 site — and its 10-metre resolution cannot show a crew. All fourteen findings computed to unknown.",
      disclosure: "This run scoped itself to the evidentiary basis of the claims rather than to the sociology of who believes them. Nine of its twelve subquestions were answered by no passage at all: the photographic anomalies, the Van Allen belts, the engineering feasibility argument and the origins of the hoax literature are all absent from this ledger, and nothing here should be read as having addressed them.",
      accent: "violet",
      tags: ["Physics", "Independent verification", "Falsification"],
      cover: {
        index: "DYOR—007",
        serial: "007 / 2026",
        lines: ["THE MIRRORS", "PROVE HARDWARE.", "NOT A CREW."],
        footer: "Hardware → the lasers · Crew → something else"
      },
      transcript: {
        href: "assets/reports/dyor-26d8b267-7df3-43b3-a759-ba003acc38c3.md",
        label: "Read the full method transcript",
        note: "The complete 1,233-line run record: every search, every verbatim excerpt, every bearing, every snapshot digest. Published unedited so the story above can be checked against it."
      },
      scope: {
        audience: "Anyone weighing the claim — including someone who has been handed the laser-ranging argument and found it did not quite land.",
        focus: "The claims themselves and their evidentiary support, tested against physical, photographic and independent third-party evidence, across all six crewed landings.",
        excluded: "Uncrewed lunar missions unrelated to Apollo, the general psychology of conspiracy belief, other space-programme controversies, and Apollo engineering detail beyond what the specific claims require. Each was placed out of scope before any source was read."
      },
      stats: [
        { value: "0/14", label: "passages bearing for the hoax" },
        { value: "9/12", label: "subquestions no passage answered" },
        { value: "14/23", label: "excerpts that survived the verbatim gate" }
      ],
      thesis: {
        label: "The distinction the run insisted on",
        statement: "There is no run-level verdict in this record and the renderer does not invent one. The ledger is one-sided — nothing in it bears for fabrication. It is also narrow, and the run is explicit that its strongest evidence answers a question one step to the side of the one being argued about.",
        status: "no run-level verdict"
      },
      chapters: [
        {
          id: "boundary",
          number: "01",
          eyebrow: "The boundary",
          title: "Two questions wear the same name, and the run picked one.",
          lead: "“The Moon Landing Hoax” can mean an inquiry into whether the claims hold up, or an inquiry into who believes them and why. Those need different evidence, and the run recorded the ambiguity before choosing.",
          body: [
            "It went with the evidentiary reading: the claims and their support, tested against the physical, photographic and third-party record. It also recorded a second ambiguity — whether the question covers Apollo 11 alone or all six crewed landings — and assumed all six, because hoax arguments range across the programme.",
            "That first choice matters more than it looks, and chapter six is where the bill arrives. Having scoped itself to evidence rather than to the belief, the run then failed to retrieve anything on most of the evidence that hoax arguments actually use. It went to laser ranging and orbital imagery, and to almost nothing else.",
            "Out of scope before any source was read: uncrewed lunar missions unrelated to Apollo, conspiracy-theory psychology beyond this case, other space-programme controversies, and spacecraft engineering detail beyond what the specific claims require."
          ],
          pullquote: "The run scoped itself to the evidence, then retrieved almost none of the evidence the argument is actually about.",
          visual: {
            type: "scope-boundary",
            askedLabel: "What was asked",
            asked: [
              "Where the hoax claims came from, and what they assert",
              "What the photographic and radiation claims are, and their answers",
              "What physical evidence exists, and who has checked it independently",
              "What non-US tracking and imaging shows",
              "Which disagreements remain genuinely open"
            ],
            excludedLabel: "Declared out of scope",
            excluded: [
              "Uncrewed lunar missions unrelated to Apollo",
              "The general psychology of conspiracy belief",
              "Other space-programme controversies",
              "Apollo engineering beyond the specific claims"
            ],
            note: "Period: 1969 to 1972 for the missions; the 1970s to the present for the claims. All six crewed landings, not Apollo 11 alone."
          }
        },
        {
          id: "explanations",
          number: "02",
          eyebrow: "Competing explanations",
          title: "Three explanations, and one of them collected nothing at all.",
          lead: "Before any source was read the run wrote down three rival accounts and, for each, the observation that would destroy it. Fourteen passages went on to declare a bearing on all three.",
          body: [
            "H1 is the documented history. H2 is fabrication in whole or significant part, with the independent verification either misread or not actually independent. H3 is a claim about the claim: that the controversy is a traceable cultural narrative rather than a response to real gaps in the record.",
            "H2's row has no positive bearing of any strength. Not one of the fourteen passages, read by a run that was actively searching for material against the official account, supports fabrication. Ten bear weakly against it and two strongly. That is about as one-sided as this archive gets.",
            "H3 is the column to be careful with. Four weak positives, nine non-discriminating, one negative — and the run's own reading is that H3 is only half-testable here. Its evidentiary half is weakly supported, because the domain most often invoked in hoax argument turns out to be well-modelled and non-anomalous. Its causal half — that the phenomenon traces to a specific origin and evolved rhetorically from there — is untested, because nothing in this ledger is about the hoax literature at all."
          ],
          pullquote: "Zero passages bear for fabrication. That is a fact about this ledger before it is a fact about the Moon.",
          visual: {
            type: "hypothesis-roster",
            scale: ["++", "+", "0", "-", "--"],
            items: [
              {
                id: "H1",
                claim: "The landings occurred as documented; hoax claims come from misunderstanding the photographic and physical evidence, radiation physics and engineering, not from real gaps in the record.",
                falsifier: "Independent, non-NASA tracking, ranging or imaging data inconsistent with crewed landings in 1969–1972 — Soviet tracking logs showing no signal at the claimed times, or an absence of retroreflector returns when non-US observatories test for them.",
                counts: [2, 10, 2, 0, 0]
              },
              {
                id: "H2",
                claim: "The landings were staged or fabricated in whole or in significant part, and the evidence cited as independent verification is NASA-influenced, misinterpreted, or not independent enough to rule fabrication out.",
                falsifier: "Demonstration that the ranging returns, sample analyses and foreign tracking data are fabricated, coordinated with NASA, or explainable without crewed landings — for instance, retroreflectors delivered robotically and verified independently afterwards.",
                counts: [0, 0, 2, 10, 2]
              },
              {
                id: "H3",
                claim: "The controversy is a persistent cultural narrative with a traceable origin that evolved rhetorically over time, largely independent of any real evidentiary weakness in the Apollo record.",
                falsifier: "Identification of specific unresolved evidentiary anomalies — not rhetorical claims — that genuine investigation has failed to explain, showing the controversy has substantive rather than rhetorical origins.",
                counts: [0, 4, 9, 1, 0]
              }
            ],
            note: "14 passages declared a bearing on each explanation. H2's two strongest negatives are both the Japanese orbital imagery of the Apollo 15 site."
          }
        },
        {
          id: "lasers",
          number: "03",
          eyebrow: "The measurement still running",
          title: "The strongest evidence here is an experiment you could rerun tonight.",
          lead: "Four observatories on Earth fire short laser pulses at five retroreflector sites on the Moon, and the pulses come back. Not an archive to be trusted — a measurement, still operating, whose success depends on hardware actually sitting at fixed lunar coordinates.",
          body: [
            "The precision is the part that does the work. Early ranges carried metre-level uncertainty; within a few months of 1969 the measurement went from hundreds of metres to metres to decimetres, reached 2 cm in 1995, and is under a centimetre today. Current analyses fit modern ranges with a 9 mm weighted rms residual — 2.3 parts in a hundred billion of the distance. Half a century of lunar geophysics, geodesy and gravitational physics has been built on top of it.",
            "The arrays are also mutually distinguishable, which closes an obvious alternative. Apollo 11 and 14 each carry 100 circular corner cubes 3.8 cm across; Apollo 15 carries 300; Lunokhod 1 and 2 carry 14 larger triangular cubes whose exiting beam is hexagonal rather than circular. The Apollo returns cannot be Soviet hardware relabelled, and fabricated data would have to stay mutually consistent across four independent observatories for fifty years.",
            "This is the argument that usually ends the conversation, and on its own terms it holds. The next chapter is about the terms."
          ],
          pullquote: "Nine millimetres, from four observatories, for fifty years.",
          visual: {
            type: "timeline",
            items: [
              { date: "1969", label: "The first array", detail: "The first retroreflector is placed on the Moon. Early ranging carries metre-level uncertainty, having started at hundreds of metres." },
              { date: "early 1970", label: "Decimetres", detail: "Within a few months the measurement uncertainty falls from hundreds of metres, to metres, to decimetres." },
              { date: "1970–73", label: "Lunokhod", detail: "Soviet rovers place their own retroreflectors — 14 larger triangular cubes returning a hexagonal beam, distinguishable from the Apollo arrays and delivered without a crew.", tone: "seizure" },
              { date: "1995", label: "Two centimetres", detail: "Successive refinement across independent observatories brings the range uncertainty to 2 cm." },
              { date: "today", label: "Nine millimetres", detail: "Current analyses fit modern ranges with a 9 mm weighted rms residual, 2.3 × 10⁻¹¹ relative to the distance, from four observatories to five sites.", tone: "end" },
              { date: "half a century", label: "Downstream science", detail: "Lunar geophysics and geodesy, terrestrial geodesy and gravitational physics have all been built on the resulting data.", tone: "after" }
            ],
            note: "Every figure here is quoted from one peer-reviewed review in the ledger. No passage in it says who placed the Apollo arrays."
          }
        },
        {
          id: "agency",
          number: "04",
          eyebrow: "The step to the side",
          title: "Laser ranging constrains where the hardware is, not who carried it.",
          lead: "This is the run's second finding, and it is the reason this dossier exists. Every laser-ranging passage that carries precision information is silent about how the arrays got there.",
          body: [
            "The crew attribution in the record is real, but look at where it lives. It is descriptive prose inside the same technical reviews — “placed on the Moon in 1969 by the Apollo 11 astronauts”, “Apollo astronauts and Russian rovers deployed” — not a property of the returns. Nothing about a 9 mm residual distinguishes an array a person set down from an array something else set down. So H2's robotic-delivery variant passes through the entire laser-ranging ledger untouched.",
            "And the proof that robotic emplacement was possible at the time is sitting in the same dataset. Lunokhod 1 and 2 placed working retroreflectors without a crew, and their returns are being measured alongside the Apollo ones. The strongest evidence for the landings contains, as a component, a demonstration of the cheapest alternative to them.",
            "What the ranging record does do is narrow the claim. It moves H2 from “the returns are faked or misattributed” to “the arrays were delivered without crew” — a much more specific and much more expensive thing to assert. The run also filed an attack on its own reasoning here: corner-cube arrays might be deliverable by hard-impact penetrators or tethered deployment from orbit, and that possibility fails only if optical modelling shows the arrays need soft-landing orientation and levelling no unguided system of that era could achieve."
          ],
          pullquote: "The best evidence for the landings includes, as a component, a working demonstration of the cheapest alternative to them.",
          visual: {
            type: "probe",
            condition: "H2's surviving variant requires only that the arrays reached the lunar surface without a crew.",
            prediction: "Some property of the returns — timing, signature, geometry — that depends on how the array was delivered rather than on where it sits.",
            venue: "Fifty years of ranging solutions from four observatories to five sites.",
            outcomes: [
              { label: "NOT PRESENT", tone: "negative", note: "Every passage carrying precision information is silent on agency of delivery" },
              { label: "ATTRIBUTED, NOT MEASURED", tone: "neutral", note: "Crew placement appears as descriptive prose inside the same reviews" },
              { label: "ALTERNATIVE DEMONSTRATED", tone: "neutral", note: "Lunokhod placed working retroreflectors robotically, in the same dataset" }
            ]
          }
        },
        {
          id: "imagery",
          number: "05",
          eyebrow: "What discriminates",
          title: "A Japanese orbiter photographed ground the engine had scoured.",
          lead: "The only evidence in this ledger that bears on a landing event rather than on hardware presence came from a counter-search aimed at the fabrication hypothesis — and it came from JAXA, not NASA.",
          body: [
            "Two things, from SELENE/Kaguya. A reflectivity halo brighter than the surrounding regolith was confirmed at the Apollo 15 site and attributed to the lunar module's descent engine exhaust plume. And a 3D terrain-camera reconstruction of the same site reproduces the mountain and hill profiles in a photograph taken from the surface by the crew, AS15-82-11122HR. A plume-scoured patch is a mechanical consequence of a powered descent at that exact spot; a surface-perspective photograph matching independently derived topography is evidence that a camera was standing there.",
            "Together those refute “nothing landed there” and “the photographs were shot on Earth” — the two claims the laser ranging could not touch. They are also the only two passages in the entire run that earned the strongest available bearing against fabrication.",
            "Then the limit, which the run states as plainly as the finding. The terrain camera resolves 10 metres. Rocks are explicitly not resolvable, and a lander, equipment or a person even less so. The halo constrains that an engine fired at that location; the topographic match constrains that a camera was at that location. Neither distinguishes a crewed landing from an uncrewed powered landing carrying a camera.",
            "The chain below is H1's own required conditions — the winning hypothesis, audited. One is supported. One is the weak link. Three are simply not addressed by anything this run retrieved, including the lunar samples, which the ledger never touches at all."
          ],
          pullquote: "The camera resolves ten metres. A person is not ten metres.",
          visual: {
            type: "condition-chain",
            items: [
              { label: "Retroreflectors are detectable and have been used by non-US observatories since the 1970s", state: "supported" },
              { label: "Later non-US orbital imagery shows landing-site artifacts at the claimed coordinates", state: "weak link" },
              { label: "Soviet and other nations independently tracked Apollo signals on lunar trajectories", state: "unknown" },
              { label: "Apollo samples have been independently analysed by non-US laboratories", state: "unknown" },
              { label: "Foreign governments and observers with no incentive to corroborate nonetheless did", state: "unknown" }
            ]
          }
        },
        {
          id: "blanks",
          number: "06",
          eyebrow: "What was never reached",
          title: "Nine of twelve subquestions were answered by no passage at all.",
          lead: "The run asked itself twelve questions before searching. Three got answers. The other nine are the ones the argument is usually about.",
          body: [
            "Unanswered by any passage in this ledger: where the hoax claims originated and who the earliest proponents were; how the claims evolved; the photographic and film anomalies — shadows, lighting, flag movement, missing stars, cross-hair alignment — and their explanations; the Van Allen belt and radiation dosimetry claims; the technical feasibility arguments about Apollo-era rocketry and life support; the documentary and testimonial evidence about keeping thousands of people quiet; where the two sides disagree most sharply; which hoax claims lack a rebuttal; and what proponents still cite as unresolved.",
            "Part of that is retrieval and part is the gate. Seven adversarial searches ran and two returned. Both Soviet tracking searches came back empty, and so did the search for peer-reviewed literature identifying genuine unresolved Apollo anomalies, and the search for technical objections predating the 1976 book. Then, of the 23 readable passages the run did collect, nine were refused by the verbatim gate and appear nowhere — a 39% refusal rate, the highest in this archive.",
            "The consequence is specific rather than rhetorical. An article on the origins and persistence of the hoax narrative is sitting in this run's source list, snapshotted and assessed, and no passage was ever read out of it. That is why the run reports H3's causal half as wholly untested while the source that would test it is printed in the endmatter."
          ],
          pullquote: "The source that would answer where the claim came from is in the ledger. Nothing was read out of it.",
          visual: {
            type: "attack-log",
            items: [
              { target: "H1", looked: "Soviet deep-space tracking records showing missing or anomalous Apollo signals during lunar transit", outcome: "empty" },
              { target: "H1", looked: "Jodrell Bank or Bochum logs reporting a discrepancy between Apollo's stated trajectory and the measured signal", outcome: "empty" },
              { target: "H2", looked: "Kaguya, Chandrayaan and Chang'e imagery of the Apollo landing sites", outcome: "returned" },
              { target: "H2", looked: "Comparative isotopic analysis of Apollo samples against the Soviet robotic Luna returns", outcome: "empty" },
              { target: "H2", looked: "Declassified Soviet archives on real-time surveillance of the Apollo missions", outcome: "returned" },
              { target: "H3", looked: "Peer-reviewed literature detailing genuine unresolved physical or photographic anomalies", outcome: "empty" },
              { target: "H3", looked: "Technical objections to the landings originating from scientific sources before 1976", outcome: "empty" }
            ],
            footer: "2 of 7 adversarial searches yielded a snapshot-bound, verified counter-passage (28.57%)."
          }
        },
        {
          id: "strongest",
          number: "07",
          eyebrow: "The best-supported reading",
          title: "The strongest finding, printed with the attack made on it.",
          lead: "The run's leading finding is the laser-ranging record itself, typed observed. Then the run named the way it could be wrong, and the objection goes at the word “independent” rather than at the physics.",
          body: [
            "The attack is filed as measurement error. Ranging fits run on standard geophysical and orbital models that carry assumed coordinates and target properties. If the processing software across those four observatories shares common ephemeris models or systematic calibration baselines, then a 9 mm residual might be measuring internal model consistency rather than four independent confirmations of where the reflectors are.",
            "The failure condition was written down in advance and is a specific piece of work someone could do: independent re-analysis of the raw timing data using unconstrained orbital parameter estimators, failing to recover distinct point-source reflections at the published coordinates within the stated error bounds. Nothing in this ledger runs that re-analysis.",
            "Seven attacks are on the record against eight asserted findings, including one arguing the Apollo 15 halo could be a natural albedo anomaly from micro-meteoroid impact or dust redistribution, and one arguing that reading H3 through laser ranging is selection bias, since precision geodesy is the domain least likely to show the macroscopic anomalies skeptics point at. This run does not record whether any person reviewed any stage of it, and the page says so."
          ],
          visual: {
            type: "finding-attack",
            finding: {
              label: "Finding",
              id: "fnd_3cbe92648d08b05c_00",
              status: "observed",
              text: "Laser pulses fired from four separate Earth observatories return from five distinct lunar retroreflector sites, with modern fits reaching a 9 mm weighted rms residual and uncertainties falling from hundreds of metres in 1969 to under a centimetre today, sustained across half a century of published geophysics and gravitational physics. This is not an archival claim but a repeatable, presently rerunnable measurement whose success depends on retroreflecting hardware sitting at fixed selenographic coordinates.",
              meta: "7 passages cited · 2 source families · computed confidence: unknown"
            },
            attack: {
              label: "Attack on it",
              id: "stp_51f2c4a4c72651d2_00",
              kind: "measurement error",
              text: "Lunar laser ranging fits rely on standard geophysical and orbital models that incorporate assumed coordinates and target properties. If the processing software across observatories shares common ephemeris models or systematic calibration baselines, the high precision could reflect internal model consistency rather than purely independent verification of retroreflector coordinates."
            },
            failureLabel: "Recorded failure condition",
            failure: "Independent re-analysis of raw timing datasets using unconstrained orbital parameter estimators fails to recover distinct retroreflector point-source reflections at the specified coordinates within published error bounds."
          }
        },
        {
          id: "score",
          number: "08",
          eyebrow: "The score",
          title: "Eight findings asserted, every one unknown, and 14 out of 100.",
          lead: "Eight findings were asserted, three of them typed observed rather than inferred. Every one computed to a confidence of unknown, and the evidence score came to the same 14 out of 100 as every publication before it — for the same reason.",
          body: [
            "Zero of twelve snapshots reached an upstream origin, so corroboration and provenance both scored zero. One measurement did improve on the archive: one source of twelve was assessed as primary data — the NASA ranging dataset itself, the first primary-data source in this series. It does not move the score, because provenance and primary-data classification are separate measurements and neither repairs the other.",
            "Falsification scored 16 of 20 for two of seven counter-searches returning, and both of those returns did real work: one produced the only evidence here that bears on a landing rather than on hardware. Saturation scored zero — round one found three source families, round two found eight and all eight were new, and the counts on all three explanations moved when it was added.",
            "The measurement that most limits this page is the verbatim gate. Of 23 readable passages, nine were refused; the entire dossier rests on the fourteen that survived, and those came from just four of the twelve stored sources. Eight snapshots produced nothing at all."
          ],
          visual: {
            type: "score-breakdown",
            components: [
              { label: "Corroboration", value: 0, max: 40, note: "0 of 12 sources traced to an origin" },
              { label: "Provenance", value: 0, max: 25, note: "unknown origin is unknown independence" },
              { label: "Falsification", value: 16, max: 20, note: "2 of 7 counter-searches returned" },
              { label: "Saturation", value: 0, max: 15, note: "all 8 families in round 2 were new" }
            ],
            subtotalLabel: "Components summed",
            subtotal: "16",
            capLabel: "Counter-evidence was found, which caps the unknown band",
            total: "14 / 100",
            confidence: "unknown",
            note: "Not a probability. This run holds no calibrated priors and no likelihood model."
          }
        }
      ],
      principlesHeading: {
        eyebrow: "Take this with you",
        title: "Five checks this run was held to. Use them on anything."
      },
      principles: [
        "Ask what the measurement is actually of. Laser ranging measures where hardware is. Who put it there is a different question, and the returns do not carry it.",
        "Separate the number from the sentence beside it. The 9 mm residual is a measurement; “placed by the Apollo 11 astronauts” is prose in the same paper.",
        "Prefer evidence that is still running. This one can be rerun tonight from four observatories, which is a different kind of thing from an archive you are asked to trust.",
        "Read the resolution before you read the conclusion. Imagery that cannot resolve a rock cannot show you a crew, however well it shows the ground.",
        "Count what the search never reached. Nine of twelve questions here got no passage — including every photographic claim the argument is usually about."
      ],
      limitations: [
        "Nine of the twelve subquestions were answered by no passage at all: the origins of the hoax claims, their evolution, every photographic and film anomaly, the Van Allen radiation claims, the engineering feasibility arguments, the documentary and testimonial evidence, the sharpest points of disagreement, which claims lack rebuttals, and what proponents still cite as unresolved.",
        "Nine of the 23 readable passages were refused by the verbatim gate and appear nowhere in the record — a 39% refusal rate, the highest in this archive.",
        "Fourteen passages carry the whole dossier, and they come from four of the twelve stored sources. Eight snapshots produced no scored passage.",
        "Zero of twelve source snapshots could be traced to an upstream origin, so nothing here has established independence between its sources. All fourteen findings computed to a confidence of unknown.",
        "The laser-ranging evidence constrains the presence of hardware, not the agency that delivered it. The run states plainly that the robotic-delivery variant of the fabrication hypothesis survives that entire line of evidence untouched.",
        "Nothing in the ledger addresses lunar sample analysis, so the fabrication hypothesis's own named falsifier — that independently analysed Apollo samples are explainable without crewed landings — is entirely unaddressed here.",
        "The tracking evidence supplies capability but no measurement: one passage establishes that a Soviet station existed for tracking lunar and planetary probes, another records only that photographs of the antennas were released. Neither reports whether Apollo transmissions were received at the claimed times.",
        "The orbital imagery covers the Apollo 15 site only. Whether the same halo and topographic match exist for Apollo 11, 12, 14, 16 and 17 is undetermined on this record.",
        "The Kaguya terrain camera resolves 10 metres, so no crew-scale feature — hardware, tracks, footprints — is resolvable in it either way.",
        "No probe was pre-registered. Five of the seven adversarial searches came back empty, and not one of those blanks counts as evidence of absence.",
        "An article on the origins and persistence of the hoax narrative was snapshotted and assessed but produced no passage, which is why the run reports the cultural-origin hypothesis as wholly untested.",
        "The search was not saturated: round one found three source families, round two found eight and all eight were new."
      ],
      sourcesHeading: {
        eyebrow: "Source record",
        title: "Twelve snapshots. Four of them produced every passage on this page."
      },
      sourcesNote: "Each link is the address that was recorded, printed beside the digest of the bytes that were actually stored. The link is not a guarantee that the address still serves those bytes — the digest is the thing to check a quotation against.",
      sources: [
        {
          number: "01",
          title: "Lunar Laser Ranging Retroreflectors: Velocity Aberration and Diffraction Pattern",
          publisher: "The Planetary Science Journal / IOPscience",
          tier: "peer reviewed",
          digest: "541aa8e503d3bdecfc31714d04a9a5d28cc99225aa46c209b9cbc2d4162d287c",
          href: "https://beta.iopscience.iop.org/article/10.3847/PSJ/acbeab",
          note: "Seven of the fourteen passages, and every precision figure quoted on this page — the four observatories, the five sites, the 9 mm residual, the array descriptions that distinguish Apollo hardware from Lunokhod. Its own subject is the design of next-generation reflectors; the Apollo material is background. It reports no uncertainty bars on its simulation outputs."
        },
        {
          number: "02",
          title: "CDDIS_LLR_data",
          publisher: "NASA Open Data Portal",
          tier: "primary data",
          digest: "d37574d69bdc107324128750fda33e6b9b8cc04e9c63a80863fb251e8a6a8140",
          href: "https://data.nasa.gov/dataset/cddis-llr-data",
          note: "Three passages, and the only source in this archive so far assessed as primary data. It is also the source of the sentence the run singles out as attribution rather than measurement: “Apollo astronauts and Russian rovers deployed laser ranging retroreflector arrays.” It states no sample size, no observing-station count, no error margins and no statistical processing."
        },
        {
          number: "03",
          title: "The “halo” area around the Apollo 15 landing site observed by the Terrain Camera on SELENE (KAGUYA)",
          publisher: "JAXA",
          tier: "government institutional",
          digest: "06b175513f9ce7be8fe7e72b1cd48736754c799546f2f8bf063b02f74e99f8b3",
          href: "https://global.jaxa.jp/press/2008/05/20080520_kaguya_e.html",
          note: "Two passages — and the only two in the run that earned the strongest available bearing against fabrication. The engine-plume halo and the terrain match to AS15-82-11122HR. The run notes the framing outruns the evidence: a confirmed finding from a single qualitative image comparison at one site, with no quantitative analysis, no uncertainty and no discussion of alternative explanations for the reflectivity change."
        },
        {
          number: "04",
          title: "Breaking dishes: the space facility at Yevpatoriya",
          publisher: "The Space Review",
          tier: "quality journalism",
          digest: "ce6f0bf5b126f123e5b5defac1f2b41dc0d3a0409851b385fbb9599632d0a0b5",
          href: "https://thespacereview.com/article/5155/1",
          note: "Two passages, returned by the counter-search for Soviet surveillance of Apollo. It establishes that a station existed for tracking lunar and planetary probes, and that photographs of the antennas were released. Neither passage reports whether Apollo signals were received, which is why the run marks the tracking line unweighted for either hypothesis."
        },
        {
          number: "05",
          title: "How moon landing conspiracy theories began and why they persist today",
          publisher: "The Conversation",
          tier: "expert analysis",
          digest: "1dd0b0e03bea3e697b4f5e2f8f8533f3acf82fd6852e5b4f563ab4940f824d75",
          href: "https://theconversation.com/how-moon-landing-conspiracy-theories-began-and-why-they-persist-today-118643",
          note: "The one source that addresses where the claims came from — traced from a 1976 book through Watergate, Vietnam and the Kennedy assassination to present-day belief. Snapshotted, assessed, and cited by no passage in the run, which is why the cultural-origin hypothesis is reported as untested while its evidence sits here."
        },
        {
          number: "06",
          title: "What evidence exists of Soviet tracking or telemetry confirming the Apollo missions",
          publisher: "Factually",
          tier: "quality journalism",
          digest: "1d5d0c765543e827f14f9a05b21801e33297db9d98b46ee6851479a2c0105da6",
          href: "https://factually.co/fact-checks/science/soviet-tracking-telemetry-evidence-apollo-missions-99d399",
          note: "Contributed no passage. The run's note on it: it concludes that third-party evidence strongly supports Soviet confirmation while admitting the raw telemetry and archival data are sparsely represented and not broadly published, so the conclusion outruns the evidence cited for it."
        },
        {
          number: "07",
          title: "What Soviet and Russian archival documents detail tracking of the Apollo missions",
          publisher: "Factually",
          tier: "industry commentary",
          digest: "12db824854b399f80fb9bb87566aa1ba423e389eb3242824a7a6fa44a63181b7",
          href: "https://factually.co/fact-checks/history/soviet-russian-documents-tracking-apollo-missions-access-archives-8edb99",
          note: "Contributed no passage. It concludes that no definitive catalogue of Soviet archival tracking documents is accessible — a conclusion the run notes rests on a single search of secondary Western sources, without consulting Russian archives or specialist historians."
        },
        {
          number: "08",
          title: "Recording of Russia's lunar gatecrash attempt released",
          publisher: "Jodrell Bank Centre for Astrophysics",
          tier: "government institutional",
          digest: "03a1423425cc7b7358f13133ab392e49869e8c31e0c7640f5e08040bbd2eb9aa",
          href: "https://www.jb.man.ac.uk/news/2009/luna15-apollo11/",
          note: "Archival radio telescope recordings made at Jodrell Bank in July 1969, tracking both Apollo 11 and the Soviet Luna 15. Contributed no passage. The run notes it mixes directly observed telescope data with a secondhand rumour without distinguishing them."
        },
        {
          number: "09",
          title: "Moon landing: How Jodrell Bank tracked Apollo 11 and a Russian probe",
          publisher: "BBC News",
          tier: "quality journalism",
          digest: "fd494b85a028a596060fce22b2d69c29880cab7870a7b12329515b6f8810da2f",
          href: "https://www.bbc.co.uk/news/uk-england-manchester-49001181",
          note: "Contributed no passage. Built on recollections gathered fifty years after the events, with no documentary corroboration cited — which the run records as a limitation of the source rather than a fault of the story."
        },
        {
          number: "10",
          title: "Geodetically Anchored 0.30 m Digital Elevation Model of the Chandrayaan-3 Vikram Landing Site",
          publisher: "arXiv preprint",
          tier: "technical report",
          digest: "ca5be7d5cf494f20de87423d70ebe24e212a2d31d0410f74ac715e1c2ca19a4f",
          href: "https://arxiv.org/html/2602.14993",
          note: "Sub-metre lunar terrain modelling from Indian orbital stereo imagery — the resolution class that would settle what the 10-metre Kaguya data cannot. Snapshotted and cited by no passage. It is a preprint with no stated peer-review status."
        },
        {
          number: "11",
          title: "Apollo 17 mission anomaly report no. 1",
          publisher: "NASA Technical Reports Server",
          tier: "technical report",
          digest: "c1157e601f268659356c49b3bd75cc484139af4ea2de47b11ef3e0b80cbac275",
          href: "https://ntrs.nasa.gov/citations/19730018391",
          note: "A documented Apollo 17 telemetry anomaly: 60 channels transmitting erroneous data for about two minutes. Snapshotted and cited by nothing. The run notes the abstract asserts that causes and corrective actions were identified without giving any method detail, leaving that conclusion unverifiable from the stored bytes."
        },
        {
          number: "12",
          title: "The Truth About The Moon Landings",
          publisher: "YouTube",
          tier: "unsupported",
          digest: "36432d33eb1e78d584b364d2ce3dec8eac9b4752550ee9e161be2cea6ae56bad",
          href: "https://www.youtube.com/watch?v=fMHLvoWZfqQ",
          note: "Stored as page furniture — About, Press, Copyright, Terms, Privacy and a copyright year. No content, no argument, no claim. The run's note is that the title implies a conclusion and the gap to any supporting evidence is total. Printed here because the run stored it."
        }
      ],
      next: {
        eyebrow: "Your turn",
        title: "Ask what the measurement is of, not how precise it is.",
        body: "Nine millimetres across half a century is a real number and it settles where the hardware is. It does not settle who carried it, and this run says so instead of letting the precision do work it cannot do. The thing that would settle it is named in the open questions: sub-metre non-NASA imagery of the Apollo sites showing traverse tracks and descent-stage hardware, or failing to. The whole run is published unedited, every search and every digest."
      }
    }
  ];
})();
