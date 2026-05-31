---
id: article-2026-05-04-pmarca-ai-custom-prompt
type: source
title: "Current AI custom prompt"
path: raw/articles/user-provided/2026-05-04-pmarca-ai-custom-prompt.md
author: Marc Andreessen
publisher: X
url: https://x.com/pmarca/status/2051374498994364529
date_published: 2026-05-04
date_added: 2026-05-31
tags: [custom-instructions, prompt-engineering, anti-sycophancy, confidence-calibration, agent-instructions, context-engineering]
status: active
quality: medium
summary: Marc Andreessen's custom AI prompt is useful as a practitioner artifact for anti-sycophancy, independent estimates, calibrated uncertainty, and direct disagreement, but its maximalist persona language should be distilled before reuse.
related: [ai-instruction-design, context-engineering, internal-engineering-conventions]
---

# Current AI custom prompt

## Source Metadata

- Path: raw/articles/user-provided/2026-05-04-pmarca-ai-custom-prompt.md
- Author: Marc Andreessen
- Published: 2026-05-04
- Publisher: X
- URL: https://x.com/pmarca/status/2051374498994364529
- Source handling note: X was not directly fetchable as clean source text during review. The source text below comes from the user-provided pasted prompt; the tweet ID decodes to 2026-05-04T18:52:47Z.

## TL;DR

The prompt is worth preserving as a compact practitioner artifact on how some power users try to suppress sycophancy and force direct, calibrated answers. Its reusable value is not the "world class expert" persona, but the instruction pattern: truth over approval, independent estimates, explicit uncertainty, source verification, concise disagreement, and resistance to unsupported user pushback.

## Key Claims

- The assistant should optimize for accuracy and intellectual seriousness rather than user approval.
- The assistant should avoid validating premises, praising questions, or reflexively agreeing.
- The assistant should state disagreement directly when the user is wrong.
- The assistant should use explicit confidence levels and avoid anchoring on user-provided estimates.
- The assistant should verify facts, names, dates, citations, figures, and examples.
- The assistant should say when it does not know something instead of inventing an answer.
- The assistant should maintain a position under weak pushback and update only when given new evidence or better reasoning.

## Important Details

- The source mixes useful behavioral constraints with brittle or non-actionable persona inflation.
- "Never hallucinate" is best treated as a desired outcome, not an enforceable instruction. The more operational instruction is to separate facts from inference and verify unstable claims.
- "As long and detailed as possible" is usually a bad default because it increases noise and context cost. Depth should be conditional on complexity, stakes, or user request.
- Mandatory step-by-step explanation can produce verbosity. A better reusable rule is to show key reasoning, assumptions, checks, and uncertainty without forcing maximal trace disclosure.
- Blanket requests for no disclaimers, no ethics, and no sensitivity are weaker than task-specific relevance rules because higher-priority system, legal, medical, financial, safety, and platform constraints can still apply.

## Entities

- People: Marc Andreessen
- Platforms: X, ChatGPT, AI assistants
- Concepts: custom instructions, prompt engineering, anti-sycophancy, calibrated uncertainty, independent estimation, direct disagreement, verification, context engineering

## My Notes

- Ingested because it prompted a reusable custom-instruction profile that can travel across ChatGPT, coding agents, and project-level instruction files.
- Keep the full prompt as provenance, but reuse a distilled version that removes status theater, excessive length defaults, and impossible guarantees.
- This belongs near [[ai-instruction-design]], [[context-engineering]], and [[internal-engineering-conventions]] because it is an always-on instruction pattern, not a domain source.

## Open Questions

- Which parts of the anti-sycophancy profile are best handled by user instructions, and which should be handled by product defaults, model training, evals, or harness-level policies?
- How much directness improves accuracy before it starts creating performative contrarianism?
- Should different contexts have different tone profiles, e.g. research, coding, business strategy, personal writing, and legal/medical/financial work?

## Related

- [[ai-instruction-design]]
- [[context-engineering]]
- [[internal-engineering-conventions]]
- [[2026-05-31-ai-custom-instruction-profile]]

## Source Text

Current AI custom prompt:

You are a world class expert in all domains. Your intellectual firepower, scope of knowledge, incisive thought process, and level of erudition are on par with the smartest people in the world. Answer with complete, detailed, specific answers. Process information and explain your answers step by step. Verify your own work. Double check all facts, figures, citations, names, dates, and examples. Never hallucinate or make anything up. If you don't know something, just say so. Your tone of voice is precise, but not strident or pedantic. You do not need to worry about offending me, and your answers can and should be provocative, aggressive, argumentative, and pointed. Negative conclusions and bad news are fine. Your answers do not need to be politically correct. Do not provide disclaimers to your answers. Do not inform me about morals and ethics unless I specifically ask. You do not need to tell me it is important to consider anything. Do not be sensitive to anyone's feelings or to propriety. Make your answers as long and detailed as you possibly can.

Never praise my questions or validate my premises before answering. If I'm wrong, say so immediately. Lead with the strongest counterargument to any position I appear to hold before supporting it. Do not use phrases like "great question," "you're absolutely right," "fascinating perspective," or any variant. If I push back on your answer, do not capitulate unless I provide new evidence or a superior argument — restate your position if your reasoning holds. Do not anchor on numbers or estimates I provide; generate your own independently first. Use explicit confidence levels (high/moderate/low/unknown). Never apologize for disagreeing. Accuracy is your success metric, not my approval.
