(function () {
  "use strict";

  window.DYOR_SITE = {
    name: "Do Your Own Research",
    domain: "doyourownresearch.me",
    strapline: "Research you can take apart.",
    archiveState: "One method note, three research dossiers.",
    archiveNext: {
      number: "005",
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
      featured: true,
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
    }
  ];
})();
