---
id: article-2026-08-04-people-ai-guidebook
type: source
title: "People + AI Guidebook"
path: raw/articles/hci-research/2026-08-04-people-ai-guidebook.md
author: Google People + AI Research
publisher: Google PAIR
url: https://pair.withgoogle.com/guidebook/
date_published:
date_added: 2026-08-04
tags: [human-centered-ai, product-design, human-ai-interaction, mixed-initiative, user-control, mental-models, trust, explainability, graceful-failure, evaluation, privacy, accessibility]
status: active
quality: high
summary: "Google PAIR's living practitioner guide organizes human-centered AI product work around user value, mental models, feedback and control, graceful failure, calibrated trust, and data/model evaluation; its guidance is broad and actionable, but much of the underlying Google research is proprietary and not independently inspectable."
related: [human-centered-ai-product-design, ai-interface-design, ai-agent-evals, fairness-and-ml, workflows]
---

# People + AI Guidebook

## Source Metadata

- Path: raw/articles/hci-research/2026-08-04-people-ai-guidebook.md
- Author/organization: Google People + AI Research (PAIR)
- Published: Unknown; this is a living web guide and the inspected build cites material through 2025.
- Publisher: Google PAIR
- Canonical URL: https://pair.withgoogle.com/guidebook/
- Evidence type: first-party, institutionally maintained practitioner guidance with worksheets, patterns, references, and product case studies.
- Verification: the live canonical page and its same-origin application bundle were fetched on 2026-08-04. The HTML response was 205,486 bytes with SHA-256 `8390ed5fc76902b7b8add3103e02773cbebb5860faa32ffc64df9cbfb5b27bd5`; the 3,392,304-byte main application bundle had SHA-256 `318525000294c21987b7f405efadd0bcddb372d79a4f24cf4f4d5579148d7237`.
- Acquisition note: `bun run kb:ingest --url https://pair.withgoogle.com/guidebook/` selected the initial root path and append-only ingest-log entry, but the client-rendered site yielded no extracted body. The current official application bundle was therefore inspected for chapter text, topic descriptions, patterns, references, and case-study labels. The endpoint-selected note was relocated into this collection and normalized without inventing a publication date.
- Copyright note: this note paraphrases the guide and preserves only the ingester's exact extraction result under `## Source Text`; it does not archive Google's multi-megabyte application bundle or reproduce the guide wholesale.

## TL;DR

The guide treats an AI product as a changing human-model system, not a model wrapped in a chat box. Start with a user problem for which AI adds distinctive value; choose automation versus augmentation deliberately; specify how the system should respond across inputs and outcomes; help people form and revise realistic mental models; make feedback consequential and control granular; design a path forward when the system fails; explain for a concrete user purpose rather than for completeness; and evaluate user benefit, behavior, safety, disparities, and post-launch change alongside technical performance. Its strongest durable contribution is an end-to-end product workflow. Its weakest evidentiary point is that the dozens of Google studies said to inform the recommendations are proprietary, so individual prescriptions are not backed by inspectable methods or effect sizes on the page.

## Key Claims

- AI should be used only where a real user problem intersects with a capability that adds distinctive value; model availability is not itself a product need.
- Automation and augmentation change both tasks and human roles. Teams should select and stage the autonomy level rather than defaulting to maximum automation.
- Flexible generative journeys need explicit interaction policies: anticipated input classes, response boundaries, escalation behavior, and safe ways for people to navigate variable outcomes.
- Mental models require lifecycle support. Products should establish capabilities and limitations, introduce AI in stages, allow safe exploration, and help people revise expectations as system behavior changes.
- Human-AI use becomes a bidirectional feedback loop. Products should distinguish explicit and implicit user feedback from system feedback, show what feedback affects, and retain controls that let people steer or configure the experience.
- Failure is part of normal AI operation. Teams should identify failure sources and give users enough context and non-automated fallback to continue when output is wrong or low quality.
- Trust should be calibrated to actual capability and context, not maximized. Explanations, provenance, confidence displays, and progressive disclosure are useful only when they answer a real user question without implying certainty the system does not have.
- Product evaluation should begin with user benefit and combine technical performance, behavior, safety, utility, pre-launch testing, post-launch observation, and disaggregated analysis for disparities and unintended consequences.

## Important Details

### Product problem, users, context, and AI role

- **Problem:** teams can ship technically capable AI that does not solve a user need, changes work without redesigning responsibility, creates misleading expectations, collects unusable feedback, or leaves people stranded after predictable failures.
- **Users/context:** cross-functional AI product teams and the people affected by predictions, recommendations, generation, personalization, or automation across consumer and professional products.
- **AI role:** infer, recommend, generate, personalize, or act with variable quality; the guide explicitly supports both augmentation and automation rather than prescribing one universal role.
- **Human-control model:** mixed initiative. People should be able to explore safely, steer outcomes, compare alternatives, configure the AI experience, supervise automation, take over after failure, and understand how their feedback or data changes future behavior.
- **Interaction flow:** identify a user need and suitable AI strength → choose augmentation/automation level → define interaction and failure policies → prototype with representative data → establish and update mental models → expose steering, feedback, and privacy controls → explain where useful → provide recovery/fallback → evaluate user benefit and system behavior before and after launch.

### Evidence and reputation

- The source is authoritative as current Google PAIR practitioner guidance and is unusually broad: six connected areas cover user needs and success, mental models and expectations, feedback and controls, errors and graceful failures, trust and explanations, and data/model evolution.
- It includes worksheets, named patterns, references, and case studies from products such as Google Photos, Google Flights, Read Along, Tune, AutoNotes, and an internal developer-AI tool.
- The guide says its recommendations also draw on dozens of Google user-research studies and design explorations, but their details are proprietary. This supports practitioner relevance, not independent verification.
- Public references span HCI, automation, explainability, anthropomorphism, data documentation, fairness, and evaluation. The guide is a synthesis layer rather than a controlled study, standard, accessibility specification, or causal demonstration that applying its patterns improves outcomes.

### Benefits and failure modes

- **Potential benefits:** better problem selection; an explicit autonomy policy; more realistic expectations; controls matched to the scale of a correction; recoverable failure; feedback that maps to an improvement mechanism; and evaluation tied to user outcomes rather than model metrics alone.
- **Failure modes highlighted or implied:** technology-first problem framing; hidden shifts in human responsibility; over-automation; open-ended behavior without policy; anthropomorphic cues that exceed capability; collecting feedback no team can act on; confidence displays users cannot interpret; explanations that are complete but unhelpful; no manual fallback; and silent post-launch drift.
- A pattern is not proof. Case studies illustrate application choices, but they do not provide a common comparative method or establish that each choice transfers unchanged to another population, risk level, modality, or model.

### Accessibility, privacy, rights, and responsibility

- The guide includes product inclusion, representative data, disaggregated evaluation, privacy/data-setting transparency, and safe exploration. These should be requirements at problem definition and evaluation time, not a final UI review.
- Privacy controls should state what data is collected or shared, what it changes, and how preferences can be revised. A reversible trial or sandbox can let people understand value before being asked to disclose more data.
- The guide does not substitute for WCAG/WAI requirements, assistive-technology testing, data minimization and retention controls, security review, copyright/licensing analysis, or domain-specific safety and legal obligations.
- Generated assets and outputs still need provenance and rights review; the guide's general transparency patterns do not by themselves resolve training-data, attribution, or ownership questions.

### Transferable evaluation method

1. Define the target user benefit and the non-AI baseline before choosing model metrics.
2. Map the autonomy policy: what the person does, what the AI suggests, what it may execute, and how responsibility changes at each level.
3. Create representative success, uncertainty, misuse, bias, privacy, accessibility, and failure scenarios; include manual and non-generative fallbacks.
4. Evaluate the complete interaction loop, not isolated output quality: comprehension, task success, reliance, steering, comparison, correction, recovery, and ability to take over.
5. Pair aggregate performance with disaggregated and intersectional analysis; inspect who benefits, who bears errors, and which groups disappear in averages.
6. Continue after launch with behavior, safety, utility, drift, feedback quality, and capability-change checks. A model or policy update is a product-experience change even if the shell is unchanged.

## Entities

- Organizations: Google, People + AI Research (PAIR), Google Design
- Artifact: People + AI Guidebook
- Product examples: Google Photos, Google Flights, Read Along, Tune, AutoNotes, Google developer AI UX
- Concepts: human-centered AI, user needs, automation, augmentation, interaction policy, mental models, co-learning, anthropomorphism, feedback loops, steering, graceful failure, calibrated trust, explanation, confidence, privacy controls, data quality, model evolution, disaggregated evaluation

## My Notes

- **Durable synthesis:** connect product discovery to runtime control and evaluation. An AI interaction policy should become a shared artifact across research, design, engineering, safety, and evals—not remain an aspirational UX paragraph.
- **Practical workflow:** write an autonomy-and-failure table before prototyping. For every important intent, record AI role, allowed action, preview, user control, uncertainty response, fallback, logged evidence, and evaluation measure.
- **Control hierarchy:** editing one output, steering a session, changing future personalization, configuring automation, and revoking data access are different control planes. Combining them into thumbs-up/down creates false agency.
- **Trust judgment:** explanations should support a decision such as verify, edit, reject, appeal, or take over. Explanation without an available action risks becoming reassurance theater.
- **Accessibility judgment:** safe exploration must be fully operable without precise dragging, hover, color-only signals, voice-only input, or animation; otherwise the trial itself excludes users whose needs should shape the product.
- **Evidence boundary:** treat recommendations as high-quality heuristics and planning prompts. Use peer-reviewed studies, standards, representative usability research, and production measurements to validate consequential decisions.

## Open Questions

- Which guidebook patterns have measured causal effects on task success, recovery, trust calibration, or long-term reliance?
- How should interaction policies be represented so design intent can become executable authorization, preview, logging, fallback, and eval constraints?
- When do confidence displays improve decisions, and when do they merely create false numerical precision?
- How should products communicate model and policy changes without exhausting users with notices?
- Which accessibility and privacy requirements should be mandatory in every safe-exploration prototype before any user data is collected?

## Related

- [[human-centered-ai-product-design]]
- [[ai-interface-design]]
- [[ai-agent-evals]]
- [[fairness-and-ml]]
- [[workflows]]
- [[2019-05-02-guidelines-for-human-ai-interaction]]
- [[2022-04-29-ai-chains-transparent-and-controllable-human-ai-interaction]]

## Source Text

No source text extracted.
