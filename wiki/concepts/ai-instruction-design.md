---
id: concept-ai-instruction-design
type: concept
title: AI Instruction Design
tags: [custom-instructions, prompt-engineering, agent-instructions, context-engineering, anti-sycophancy]
source_count: 5
summary: AI instruction design turns always-on assistant prompts into compact behavioral contracts for truthfulness, evidence handling, uncertainty, tone, tool use, and context discipline.
canonical_for: [AI custom prompt, custom AI instructions, assistant instruction design, anti-sycophancy prompt, prompt instruction design]
review_status: reviewed
last_reviewed: 2026-07-25
review_due: 2026-10-25
confidence: "0.85"
---

# AI Instruction Design

## Summary

AI instruction design is the practice of turning preferences, workflows, and reliability goals into short behavioral contracts that a model can actually follow. Strong instructions name the desired outcome, the evidence policy, the uncertainty policy, the interaction stance, and the boundaries between prompt, tool, harness, and retrieval behavior. Weak instructions rely on persona inflation, impossible guarantees, or exhaustive preference dumps.

The reusable lesson from the pmarca prompt is anti-sycophancy: optimize for accuracy rather than approval, disagree directly when the user is wrong, avoid anchoring on user-provided numbers, and use explicit confidence. The reusable lesson from repo-instruction sources is compression: a rule earns its place when it prevents a real failure mode. The reusable lesson from production prompting docs is separation: prompts should not absorb runtime mechanics, deterministic policies, or tool schemas that belong in configuration or code. Anthropic's Claude 5 guidance adds model-version evidence for that compression: Claude Code reportedly removed over 80% of its system prompt for Opus 5 and Fable 5 without measurable coding-eval loss, replacing brittle global rules with local-fit criteria and moving conditional knowledge into interfaces, skills, memory, and references.

## What Good Instructions Specify

- **Objective:** what the assistant optimizes for, such as accuracy, usefulness, user intent, or speed.
- **Evidence policy:** when to verify, cite, browse, search the repo, or say the evidence is insufficient.
- **Uncertainty policy:** how to separate facts, inferences, estimates, and unknowns.
- **Interaction stance:** how to handle disagreement, weak premises, unsupported pushback, and clarification.
- **Output shape:** default concision, when to go deep, and what level of reasoning to expose.
- **Tool boundary:** which behavior belongs in prompts versus tools, tests, schemas, config, or harness code.
- **Load policy:** which instructions are always-on and which should live in skills, resolver docs, repo files, or task prompts.

## Reusable Rules

- Prefer "truth over approval" to "be provocative." The first improves calibration; the second can create performative contrarianism.
- Prefer "separate facts from inference and verify unstable claims" to "never hallucinate." The first is actionable; the second is only an aspiration.
- Prefer "concise by default, detailed when complexity or stakes justify it" to "as long as possible."
- Prefer "show key reasoning, assumptions, checks, and uncertainty" to mandatory maximal step-by-step explanation.
- Prefer "no reflexive praise or premise validation" to a generally abrasive persona.
- Keep global custom instructions short because they occupy always-on context and compete with task evidence.
- Move reusable domain workflows into skills or project files rather than bloating the universal assistant profile.
- Prefer outcome and local-fit criteria over overbroad prohibitions; “match the surrounding code's comment density, naming, and idiom” is more generally valid than “never write multi-line comments.”
- Give each behavior one authoritative context location instead of repeating subtly different versions across system prompts, tools, skills, and user-facing instructions.
- Version instructions by model capability and test removals; rules introduced for an older model are compatibility code, not permanent truth.
- Keep hard safety and authorization boundaries in enforceable runtime layers even when soft behavioral instructions can shrink.
- Prefer schemas, tests, code, artifacts, and rubrics when they communicate constraints more precisely than prose.

## Failure Modes

- **Persona theater:** claiming universal expertise instead of giving verifiable behavior rules.
- **Impossible guarantees:** telling the model never to hallucinate without specifying verification behavior.
- **Context bloat:** forcing every task through a long, high-ceremony prompt.
- **Style over truth:** making the assistant sound aggressive when the real goal is calibrated disagreement.
- **Instruction collisions:** asking for no disclaimers, no ethics, or unlimited directness in ways that conflict with higher-priority policy, legal, medical, financial, or safety constraints.
- **Prompt overreach:** putting deterministic routing, retry, formatting, or tool policies in prose when they belong in code or schemas.
- **Compatibility sediment:** retaining instructions for older model failure modes without re-evaluating whether they now suppress valid behavior.
- **Average-score blindness:** deleting a rare but important rule because broad evaluations show no measurable loss while tail-risk cases were not isolated.
- **False minimalism:** treating a shorter prompt as the goal instead of correctly placing necessary context and enforcement.

## Source Notes

- [[2026-05-04-pmarca-ai-custom-prompt]]
- [[2026-05-09-mnimiy-claude-md-12-rules]]
- [[2026-04-12-prompting-guide]]
- [[2026-04-16-resolvers-the-routing-table-for-intelligence]]
- [[2026-07-24-the-new-rules-of-context-engineering-for-claude-5-generation-models]]

## Related

- [[context-engineering]]
- [[internal-engineering-conventions]]
- [[agent-skills]]
- [[resolvers]]
- [[2026-05-31-ai-custom-instruction-profile]]
