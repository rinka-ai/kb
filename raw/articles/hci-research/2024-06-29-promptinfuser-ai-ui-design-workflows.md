---
id: 2024-06-29-promptinfuser-ai-ui-design-workflows
type: source
title: "PromptInfuser: How Tightly Coupling AI and UI Design Impacts Designers' Workflows"
path: raw/articles/hci-research/2024-06-29-promptinfuser-ai-ui-design-workflows.md
author: Savvas Petridis; Michael Terry; Carrie J. Cai
publisher: ACM DIS
url: https://arxiv.org/abs/2310.15435
date_published: 2024-06-29
date_added: 2026-08-05
tags: [hci, human-ai-interaction, ui-prototyping, design-tools, mixed-initiative, design-workflows, figma, evaluation]
status: active
quality: high
summary: A DIS 2024 within-subjects study with 14 professional designers found that embedding live LLM prompts in Figma mockups supported tandem AI-and-UI iteration, exposed output-layout incompatibilities, and improved several perceived prototyping outcomes, while adding connection friction and possible context-switching cost.
related: [ai-interface-design, human-centered-ai-product-design, ai-agent-evals, 2022-04-29-ai-chains-transparent-and-controllable-human-ai-interaction]
superseded_by:
---

# PromptInfuser: How Tightly Coupling AI and UI Design Impacts Designers' Workflows

## Source Metadata

- Path: raw/articles/hci-research/2024-06-29-promptinfuser-ai-ui-design-workflows.md
- Authors: Savvas Petridis, Michael Terry, and Carrie J. Cai
- Institution: Google Research
- Venue: ACM Designing Interactive Systems Conference 2024 (DIS '24)
- Publication date: 2024-06-29 (conference opening date; arXiv v1 submitted 2023-10-24)
- Canonical DOI: https://doi.org/10.1145/3643834.3661613
- Open-access version: https://arxiv.org/abs/2310.15435
- Official Google Research record: https://research.google/pubs/promptinfuser-how-tightly-coupling-ai-and-ui-design-impacts-designers-workflows/
- Paper inspected: 14-page arXiv v1 PDF, 989,879 bytes, SHA-256 `3bcce72f79644fa0914ccf495ce28d6a4d58348dcfbc50b176c02382fa7d99ed`
- Acquisition note: the canonical ACM page returned HTTP 403 to the repository ingester. `bun run kb:ingest --url https://arxiv.org/abs/2310.15435 --collection hci-research --no-refresh` then selected the staging note and captured the abstract page below. Curation preserved that `## Source Text` unchanged while relocating the note to the collection's publication-date convention.

## TL;DR

PromptInfuser connects editable Figma text elements to live LLM prompt inputs and outputs, creating a medium-fidelity prototype whose rough UI and rough AI behavior can evolve together. In a counterbalanced within-subjects study, 14 professional designers used PromptInfuser and a separated Figma-plus-prompt-editor workflow for two 30-minute search-application tasks. Thirteen preferred PromptInfuser, and several perceived prototyping outcomes improved significantly, but feasibility, atypical-input anticipation, and mental demand did not. The result supports testing actual model variability in the interface early—not assuming that one live demo proves production quality, accessibility, safety, or long-term workflow benefit.

## Key Claims

### Empirical findings reported by the paper

- Thirteen of 14 participants preferred PromptInfuser to the separated baseline after using both.
- After eight paired Wilcoxon tests with full Bonferroni correction, participants rated PromptInfuser significantly higher for communicating a product idea (`6.21` versus `4.64`, `p = .002`), experiencing something close to the envisioned artifact (`p = .002`), efficiently creating a realistic mockup (`p = .002`), anticipating UI issues (`p = .003`), and anticipating technical problems (`p = .005`).
- The study found no significant condition difference for understanding feasibility (`p = .11`), anticipating atypical inputs (`p = .07`), or mental demand (`p = .27`). The paper therefore does not support a blanket claim that tighter coupling reduces cognitive effort or improves every prototyping outcome.
- PromptInfuser produced a recurring loop: make a minimal UI, connect an initial prompt, test varied inputs in the mockup, observe model-output/UI incompatibilities, revise the prompt or UI, and repeat.
- The separated workflow was more sequential. Most participants designed the UI first, authored the prompt separately, then copied one or a few preferred completions into the mockup; this made idealized content easier to mistake for representative AI behavior.
- Live output in layout exposed variable text length, missing or duplicate items, output-count mismatches, weak visual hierarchy, and mismatches between free-form user input and the interface's input structure.

### Source claims and design rationale

- A useful AI prototype can occupy a **medium-fidelity** layer: as editable as a rough mockup while running rough model computation early enough to reveal interaction consequences.
- Coupling model behavior to the UI supports reflection-in-action because designers can assess the whole proposed experience rather than optimizing an ideal layout and a prompt in isolation.
- A shared live artifact may improve design critique, stakeholder communication, engineering handoff, and early user research by letting collaborators enter their own inputs and observe model outputs.
- Tight coupling should not mean permanent simultaneity. Several designers wanted to bring prompt and UI to a minimum viable state separately before joining them, reducing context switching while avoiding late integration.
- Tooling should make mappings between UI inputs, model inputs, model outputs, and UI outputs visible and easy to rewire; otherwise connection maintenance erodes low-fidelity experimentation.

## Important Details

### Problem, users, context, and AI role

- The problem is that designers can now prototype model behavior through prompts but commonly design that behavior separately from the interface in which users will experience it.
- Four professional designers informed the system's input/output mapping and three design rationales over several months. The evaluation recruited 14 professional designers at one large technology company; all had Figma experience and had written LLM prompts.
- Participants had five to 30 years of design experience, averaged 34 years old, and included three women and 11 men. The institutional and demographic concentration limits transfer.
- The AI role was dynamic text generation for two constrained search-like applications: vacation suggestions and recipe recommendations. The model was anonymized for peer review but described as promptable like GPT-3.

### Human-control model and interaction flow

- Designers author the prompt, select UI text as model input, map all or tagged parts of the completion into UI text outputs, assign the prompt to a clickable control, and test the resulting mockup with their own inputs.
- The system retains human authority over prompt wording, UI structure, connection mapping, test inputs, and whether to revise AI, UI, or both. It does not autonomously redesign or publish the interface.
- The tested flow was: sketch minimum UI → write/connect minimum prompt → invoke through the mockup → vary conventional and eccentric inputs → inspect output in context → change prompt, layout, input structure, or features → repeat.
- PromptInfuser supported text fields only. Dropdowns, radio buttons, sliders, images, tool calls, persistent state, and side effects were outside the implementation, so its control model is narrower than modern multimodal or agentic prototypes.

### Implementation and examples

- The Figma plugin represented UI-to-prompt connections visibly and updated embedded input text as the corresponding UI text changed.
- A completion could fill one element or be split across multiple elements using author-supplied attribute labels and a one-shot example. This made structured output possible without regular expressions, but it remained brittle when the model returned the wrong count or format.
- Invoking a prompt from a real button made the prototype feel more authentic than running it in a separate plugin panel.
- Concrete failures included descriptions that overflowed variable layouts, a two-item UI receiving three or four generated dishes, duplicate or missing recommendations, and free-form input producing nonsensical results such as a dish that “tastes like a memory.”

### Evaluation method and evidence level

- The main study was counterbalanced and within subjects. Participants completed a 30-minute self-guided tutorial, then two 30-minute think-aloud tasks, a questionnaire, and a semi-structured interview; total participation was one hour 45 minutes.
- Task/condition assignment was balanced. The baseline matched the observed current workflow: clickable static Figma frames plus a separate prompt-authoring interface.
- The eight seven-point measures covered idea communication, feasibility, artifact realism, UI issues, atypical inputs, technical problems, efficiency, and NASA-TLX mental demand.
- Evidence is strongest for short-term workflow behavior and participant perception under these tasks. It does not establish objective artifact quality, model reliability, usability with end users, production speed, or longitudinal team outcomes.

### Benefits, failures, and transferability

- **Benefit:** execute representative and adversarial examples inside the intended layout before high-fidelity implementation, exposing behavioral-layout contracts while they are cheap to change.
- **Benefit:** keep prompt, mappings, model output, UI, and critique in one boundary object so a design handoff includes behavior rather than only screenshots and prose.
- **Failure:** tight linkage can increase mode switching and tempt designers to optimize the experience around temporary limitations of one model version.
- **Failure:** brittle manual connections can punish experimentation; changing one input structure may require prompt restructuring and remapping.
- **Transfer:** the medium-fi pattern applies to design-to-code and agentic products when a prototype runs the real model or tool policy behind reversible mock actions. It should not trigger consequential side effects or use production data.
- **Transfer:** treat model-output shape as an interface contract with boundary cases: empty, long, malformed, duplicated, missing, refused, delayed, unsafe, biased, and unavailable outputs—not merely the happy-path sample.

### Accessibility, privacy, provenance, and responsible prototyping

- The paper did not evaluate disabled users, keyboard-only operation, screen readers, zoom, contrast, cognitive load beyond one NASA-TLX item, reduced motion, or non-text modalities.
- Text-element-only wiring excluded common accessible and structured controls. A production prototyping tool needs semantic labels, keyboard operability, non-drag mapping, textual connection views, and generated-output checks rather than assuming Figma authoring is accessible.
- The study did not report prompt/output retention, sensitive-data handling, access control, participant privacy for future live studies, output provenance, copyright, bias, or model/data disclosure.
- Early realism increases responsibility: use synthetic or consented data, label the model/version and generated output, preserve prompt/config/run provenance, sandbox network and tools, avoid irreversible effects, and provide a deterministic fallback for research sessions.

## Entities

- People: Savvas Petridis; Michael Terry; Carrie J. Cai
- Institution: Google Research
- Venue: ACM Designing Interactive Systems Conference 2024
- System: PromptInfuser
- Tools and models: Figma; Figma Plugin API; an anonymized GPT-3-like LLM; standard prompt editor
- Concepts: medium-fidelity AI prototyping; reflection-in-action; boundary objects; prompt/UI coupling; output-layout compatibility; mixed initiative; human-AI design workflows

## My Notes

### Durable practitioner interpretation

- The durable unit is a **behavioral prototype**, not a static mock plus a detached prompt. Bind a real-but-sandboxed model call to the intended input, output, error, and recovery surfaces early enough that the team can observe variability in context.
- Start separate, couple early, then alternate deliberately. Bring the user flow and model behavior to minimum viable form independently; join them before polish; use focused passes for model behavior, UI behavior, and integrated failure testing instead of forcing constant context switching.
- Define a model/UI contract before styling: accepted inputs, output schema, size/cardinality bounds, latency, refusal/error states, safety rules, provenance, manual fallback, and which accepted content must survive regeneration.
- Use a test matrix rather than hand-picked demo inputs: ordinary, boundary, adversarial, multilingual, accessibility-relevant, privacy-sensitive, malformed, empty, and repeated inputs. Record runs so a promising completion cannot stand in for the distribution.
- Keep integration reversible. Connections should be visible, diffable, cheaply rewired, and separable from the underlying prompt and component so model or layout changes do not amplify across the whole prototype.
- Evaluate the prototype with representative users after internal probing. Authentic model behavior improves research realism, but it can also expose participants to unstable, harmful, or privacy-sensitive output; moderation, consent, fallback, and facilitator controls belong in the research protocol.

## Open Questions

- When is a prompt and UI each “good enough” to couple without causing either late integration or premature fixation?
- Do integrated behavioral prototypes improve objective design quality, engineering rework, or user outcomes over weeks and teams rather than one short session?
- How should design tools represent typed input/output schemas, uncertainty, streaming, tool calls, memory, and side effects without turning rough prototyping into application programming?
- Which automation can propose or repair mappings while keeping changes previewable and reversible?
- How should behavioral prototypes generate diverse test cases without treating synthetic personas as evidence about real users?
- What accessible authoring and testing model replaces pointer-heavy canvas wiring for keyboard, screen-reader, low-vision, and motor-disabled designers?
- How can a prototype remain portable across model versions without concealing real provider-specific constraints?

## Related

- [[ai-interface-design]]
- [[human-centered-ai-product-design]]
- [[ai-agent-evals]]
- [[2022-04-29-ai-chains-transparent-and-controllable-human-ai-interaction]]
- [[2019-05-02-guidelines-for-human-ai-interaction]]
- [[2024-05-11-promptcharm-multimodal-prompting-and-refinement]]

## Source Text

View PDF
            Abstract:Prototyping AI applications is notoriously difficult. While large language model (LLM) prompting has dramatically lowered the barriers to AI prototyping, designers are still prototyping AI functionality and UI separately. We investigate how coupling prompt and UI design affects designers' workflows. Grounding this research, we developed PromptInfuser, a Figma plugin that enables users to create semi-functional mockups, by connecting UI elements to the inputs and outputs of prompts. In a study with 14 designers, we compare PromptInfuser to designers' current AI-prototyping workflow. PromptInfuser was perceived to be significantly more useful for communicating product ideas, more capable of producing prototypes that realistically represent the envisioned artifact, more efficient for prototyping, and more helpful for anticipating UI issues and technical constraints. PromptInfuser encouraged iteration over prompt and UI together, which helped designers identify UI and prompt incompatibilities and reflect upon their total solution. Together, these findings inform future systems for prototyping AI applications.

Human-Computer Interaction (cs.HC); Artificial Intelligence (cs.AI)

Cite as:
          arXiv:2310.15435 [cs.HC]

(or
              arXiv:2310.15435v1 [cs.HC] for this version)

https://doi.org/10.48550/arXiv.2310.15435

Submission history From: Savvas Petridis [view email]          [v1]
        Tue, 24 Oct 2023 01:04:27 UTC (539 KB)
