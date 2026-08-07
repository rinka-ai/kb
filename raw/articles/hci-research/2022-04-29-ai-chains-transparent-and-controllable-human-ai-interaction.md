---
id: 2022-04-29-ai-chains-transparent-and-controllable-human-ai-interaction
type: source
title: "AI Chains: Transparent and Controllable Human-AI Interaction by Chaining Large Language Model Prompts"
path: raw/articles/hci-research/2022-04-29-ai-chains-transparent-and-controllable-human-ai-interaction.md
author: Tongshuang Wu; Michael Terry; Carrie J. Cai
publisher: ACM CHI Conference on Human Factors in Computing Systems
url: https://doi.org/10.1145/3491102.3517582
date_published: 2022-04-29
date_added: 2026-08-02
tags: [human-ai-interaction, hci, interaction-design, mixed-initiative, generative-ai, prompt-chaining, human-control, transparency, prototyping, evaluation, accessibility]
status: active
quality: high
summary: A CHI 2022 within-subjects study found that an editable visual chain of scoped LLM calls improved task outcomes and users' perceived transparency, control, collaboration, and cognitive support versus a single-prompt sandbox, while adding complexity and constraining exploration.
related: [ai-interface-design, workflows, ai-agent-evals, ai-assisted-creative-ideation, 2019-05-02-guidelines-for-human-ai-interaction]
---

# AI Chains: Transparent and Controllable Human-AI Interaction by Chaining Large Language Model Prompts

## Source Metadata

- Path: raw/articles/hci-research/2022-04-29-ai-chains-transparent-and-controllable-human-ai-interaction.md
- Authors: Tongshuang Wu (University of Washington; work conducted as a Google intern), Michael Terry (Google Research), and Carrie J. Cai (Google Research)
- Venue: CHI 2022, peer-reviewed full paper, 22 pages
- ACM DOI: https://doi.org/10.1145/3491102.3517582
- Canonical acquisition URL: https://arxiv.org/abs/2110.01691
- arXiv version inspected: v3, submitted 2022-03-17; the first version was submitted 2021-10-04
- Full paper inspected from: https://arxiv.org/pdf/2110.01691
- Inspection record: PDF was 2,761,394 bytes, SHA-256 `f3d6154c002ff00cca3478f722eebd14ed41536d478c8927d19d9dbd127f1872`; local `pdftotext -layout` extraction produced 1,981 lines. The endpoint-captured abstract remains unchanged in `## Source Text`; the full copyrighted paper is linked rather than reproduced.

## TL;DR

The paper treats interaction structure—not a better model—as the design intervention. Its prototype exposes a complex task as a visual chain of small LLM operations and editable intermediate data. In a 20-person within-subjects study against a single-textbox sandbox using the same LaMDA model, participants rated chaining as more transparent, controllable, collaborative, and supportive of thinking; blinded raters preferred chained results in 85% and 80% of paired comparisons. The benefit was not free: chains took slightly longer without a significant time difference, nine participants described greater complexity or a steeper learning curve, and rigid decomposition could obscure the whole task or suppress useful exploration.

## Key Claims

### Empirical findings

- Twenty participants completed one of two tasks—constructive peer-review rewriting or personalized English-French travel flashcards—with both the chain interface and a sandbox. Interface order was counterbalanced, the underlying 137B-parameter non-dialog LaMDA model was identical, and each condition had working default prompts.
- On seven-point self-report scales, chaining scored higher for support in thinking through the task (6.0 vs. 3.6, `p < .001`), control (6.2 vs. 4.5, `p < .001`), collaboration (5.7 vs. 4.6, `p = .04`), transparency (5.4 vs. 3.8, `p = .002`), and matching the task goal (6.0 vs. 5.0, `p = .002`).
- Two condition-blind raters independently preferred chained outputs in 85% and 80% of participant-level comparisons. This is paired preference evidence on two bounded text tasks, not a universal quality measure.
- Participants repeatedly ran the model without editing less often in chains than in the sandbox (36% vs. 51%, `p = .001`) and curated existing outputs more often (77% vs. 41%, `p < .001`).
- Completion time was 14.6 ± 5.4 minutes with chaining and 12.4 ± 4.0 minutes in the sandbox; the reported difference was not statistically significant (`p = .278`).
- Smaller visible steps supported expectation calibration, parallel strategy comparison, local reruns, preservation of accepted intermediate work, and debugging by “unit-testing” a suspected stage and observing downstream propagation.

### Source claims and design interpretation

- The source argues that a broadly capable but opaque model can become more usable by doing less per call: decompose the task, expose each scoped operation, preserve intermediate data, and let users edit prompts, outputs, connections, or step order.
- A chain is a mixed-initiative control surface, not merely backend orchestration. Users can intervene at three levels: a step's prompt, its intermediate output/data layer, or the global graph.
- Scoped steps can guard against model-inspired tangents and cascading errors, but structure also narrows the exploration space. Several participants preferred a sandbox for ambiguity and a chain after the goal became clear.
- The paper's two later case studies—Vega-Lite debugging and gaze-based assisted text entry—are exploratory demonstrations, not results from the controlled user study.

## Important Details

### Problem, users, context, and AI role

- Problem: one-shot prompting gives users too many undifferentiated controls, weak visibility into failure location, and no stable place to preserve or correct intermediate work on compound tasks.
- Study users: 20 technically knowledgeable non-ML practitioners from one large software company, including UX designers, linguists, software engineers, and data analysts; half had no prompting experience beyond seeing demos and half had basic prompt experience.
- Context: two short text-production tasks after a 30-minute tutorial, followed by up to 25 minutes per condition, think-aloud observation, an exit survey, and a semi-structured interview.
- AI role: the same general-purpose LLM performs scoped primitives such as extraction, classification, rewriting, splitting, composition, factual query, generation, and ideation. The human defines or edits intent, intermediate content, and graph structure.

### Human-control model and interaction flow

1. Represent the user's compound goal as a visible directed chain with named operations and typed-looking data layers.
2. Show which output feeds which later step and allow step-by-step execution rather than hiding the pipeline behind one final response.
3. Preview the actual prompt, expose operation-specific settings, and let users edit instructions locally.
4. Make intermediate results directly editable, deletable, reorderable, and reusable; accepted work can be frozen while a downstream stage is rerun.
5. Let users run parallel blocks to compare alternatives and inspect their downstream effects.
6. Gate graph-level rewiring behind an explicit edit mode because it has wider consequences than local correction.
7. Preserve a freeform lane for early ambiguity, then move into structured execution when the goal and useful decomposition are understood.

### Benefits and failures

- Benefits: finer steering, inspectable progress, local recovery, reduced “roll the dice again” behavior, better mental models, stronger perceived collaboration, and better paired task outcomes in this study.
- Failures: nine participants found the system more complex or harder to learn; four struggled to predict how a local change would affect the final result; predefined decompositions could conflict with users' mental models; structure could reduce playful exploration; decomposition can lose coherence when subproblems are interdependent; upstream errors still cascade; more calls increase latency and cost.
- Design implication: a chain UI needs overview/detail coordination, visible propagation previews, versioned intermediate artifacts, local undo, whole-run rollback, and progressive disclosure. A node graph alone is not sufficient.

### Accessibility, privacy, provenance, and rights

- The assisted-text-entry case proposes gradual abbreviation expansion for gaze users, but it was a prototype case study without disabled-user evaluation. It should not be cited as accessibility effectiveness evidence.
- The study does not evaluate keyboard access, screen readers, motor demands of graph editing, cognitive load for disabled users, multilingual quality beyond the narrow flashcard task, privacy, security, or sensitive-data retention.
- Exposed intermediate state can improve provenance and review, but it can also reveal sensitive prompts, personal data, inferred labels, or model-produced text. Production tools need retention controls, access boundaries, redaction, and clear attribution for human edits versus model generations.
- The source concerns text generation and does not evaluate copyright or licensing of generated assets. Its interaction lesson transfers to generated visual/code artifacts only if their provenance and rights are separately handled.

### Practical workflow transferred to current design work

1. Begin in a low-commitment sandbox when the problem or decomposition is genuinely ambiguous.
2. Convert a recurring successful path into 3–7 named stages, each with one observable objective and explicit input/output.
3. Expose the current prompt or instruction, intermediate artifact, model/version, status, and downstream consumers for each stage.
4. Support edit, accept/freeze, regenerate, branch/compare, undo, and rerun-from-here without destroying accepted upstream work.
5. Preview downstream changes before applying them; retain a run history so users can compare and restore versions.
6. Add deterministic validators or human checkpoints where correctness matters; visibility does not make model output true.
7. Test both sandbox and chain modes on representative tasks and failures. Measure task success, correction behavior, recovery time, inappropriate reliance, cognitive load, accessibility, latency, and cost—not satisfaction alone.

### Evaluation method and evidence level

- Evidence level: moderate-to-high for the comparative interaction findings in these two tasks; low for broad product transfer and the two application case studies.
- Strengths: within-subject comparison, counterbalanced order, same model in both systems, default prompts in both, interaction logs, think-aloud/interviews, and condition-blind paired output judgments.
- Limits: `n=20`, one employer, short tasks, tutorial effects, one 2021-era model, self-report outcomes, two non-expert raters, no longitudinal use, and predefined chains for most of the session. The paper does not report accessibility/privacy testing or establish whether current frontier models produce the same effect.
- Practitioner judgment: the durable mechanism is not “always use chains.” It is to match control granularity to task certainty—sandbox for discovery, inspectable staged artifacts for repeatable execution, and an easy route between them.

## Entities

- People: Tongshuang Wu; Michael Terry; Carrie J. Cai
- Organizations: University of Washington; Google Research; Google PAIR; ACM SIGCHI
- Systems and models: AI Chains prototype; Sandbox baseline; LaMDA (137B, non-dialog version); GPT-3 Playground (interaction reference); PromptChainer (related authoring work)
- Tasks and cases: constructive peer-review rewriting; personalized travel flashcards; Vega-Lite visualization debugging; gaze-based assisted text entry
- Concepts: mixed-initiative interaction; prompt chaining; task decomposition; intermediate artifacts; local and global control; transparency; debuggability; expectation calibration; branching; reversibility; progressive disclosure

## My Notes

- This paper supplies empirical evidence for a design pattern that later agent products often implement only as backend traces: expose stage boundaries as editable user artifacts, not merely developer telemetry.
- “Show the reasoning” is too vague. The more defensible control surface is observable operations, prompts/instructions, inputs, outputs, versions, and propagation—not a claim that generated rationales reveal internal model cognition.
- The study predates modern tool-using agents, but the interaction model transfers: plan/act/verify stages, tool results, approvals, and generated assets should be isolatable and replayable without forcing the user to restart the whole run.
- The result complements [[2019-05-02-guidelines-for-human-ai-interaction]]: that paper gives lifecycle heuristics; this one tests one concrete implementation of transparency, steering, local correction, and recovery.

## Open Questions

- How much chain structure should be visible by default to novices, experts, screen-reader users, and users on small screens?
- Can propagation previews accurately communicate nondeterministic downstream effects without creating false certainty?
- Which tasks lose essential coherence when decomposed, and how can a tool detect or surface that risk?
- How do editable intermediate artifacts affect trust calibration, automation bias, and skill retention over weeks rather than one session?
- When should a product expose a graph, a linear checklist, a document history, or only progressive stage summaries?
- Do current multimodal and tool-using models preserve the quality/control gains once latency, side effects, and cross-modal provenance are included?

## Related

- [[ai-interface-design]]
- [[workflows]]
- [[ai-agent-evals]]
- [[ai-assisted-creative-ideation]]
- [[2019-05-02-guidelines-for-human-ai-interaction]]

## Source Text

View PDF
            Abstract:Although large language models (LLMs) have demonstrated impressive potential on simple tasks, their breadth of scope, lack of transparency, and insufficient controllability can make them less effective when assisting humans on more complex tasks. In response, we introduce the concept of Chaining LLM steps together, where the output of one step becomes the input for the next, thus aggregating the gains per step. We first define a set of LLM primitive operations useful for Chain construction, then present an interactive system where users can modify these Chains, along with their intermediate results, in a modular way. In a 20-person user study, we found that Chaining not only improved the quality of task outcomes, but also significantly enhanced system transparency, controllability, and sense of collaboration. Additionally, we saw that users developed new ways of interacting with LLMs through Chains: they leveraged sub-tasks to calibrate model expectations, compared and contrasted alternative strategies by observing parallel downstream effects, and debugged unexpected model outputs by "unit-testing" sub-components of a Chain. In two case studies, we further explore how LLM Chains may be used in future applications

Human-Computer Interaction (cs.HC); Computation and Language (cs.CL)

Cite as:
          arXiv:2110.01691 [cs.HC]

(or
              arXiv:2110.01691v3 [cs.HC] for this version)

https://doi.org/10.48550/arXiv.2110.01691

Submission history From: Tongshuang Wu [view email]                  [v1]
        Mon, 4 Oct 2021 19:59:38 UTC (2,185 KB)
            [v2]
        Tue, 15 Feb 2022 00:58:24 UTC (4,503 KB)
    [v3]
        Thu, 17 Mar 2022 20:16:38 UTC (3,258 KB)
