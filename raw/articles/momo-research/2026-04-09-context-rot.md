---
id: article-2026-04-09-context-rot
type: source
title: Context Rot
author: momo personal assistant
publisher: GitHub
url: https://github.com/momo-personal-assistant/momo-research/blob/main/Context%20Rot.md
date_published:
date_added: 2026-04-09
tags: [context-rot, long-context, evaluation, retrieval]
status: processed
quality: medium
summary: Comprehensive note on Chroma's context rot research, emphasizing that long-context degradation is universal, semantic, and worsened by distractors rather than solved by simple needle-in-a-haystack benchmarks.
related: [context-rot, context-engineering, long-context, evaluations]
---

# Context Rot

## Source Metadata

- Author: momo personal assistant
- Published: Unknown
- Publisher: GitHub
- URL: https://github.com/momo-personal-assistant/momo-research/blob/main/Context%20Rot.md

## TL;DR

This note argues that long-context failure is more subtle than standard retrieval benchmarks suggest: performance degrades as input grows, especially when the task requires semantic understanding or filtering among similar distractors.

## Key Claims

- Needle-in-a-haystack style evaluation overstates long-context competence.
- Context length hurts even simple tasks when semantic inference is required.
- Similar-but-wrong distractors are a major source of model failure.
- Coherent long documents are not always easier for models than shuffled ones.

## Important Details

- The note summarizes experiments over 18 models from Anthropic, OpenAI, Google, and Alibaba.
- It covers needle-question similarity, distractor analysis, needle-haystack similarity, and haystack structure.
- The reported pattern is that low semantic similarity and multiple distractors sharply reduce accuracy in longer contexts.
- The note also highlights different failure styles across model families, including hallucination tendencies.

## Entities

- Source: Chroma Research
- Concepts: context rot, NIAH, NoLiMa, distractors, long-context evaluation
- Model families: Claude, GPT, Gemini, Qwen

## My Notes

- This is a foundational import because it explains why "just keep more in context" is not a sufficient memory strategy.
- It also suggests our KB should track evaluation conditions and distractor sensitivity, not just headline benchmark scores.

## Open Questions

- How can our KB summarize papers in a way that preserves semantic cues without overloading context?
- Which of our future agent workflows are most vulnerable to distractor-heavy long contexts?

## Related

- [[context-rot]]
- [[context-engineering]]
- [[long-context]]
- [[evaluations]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
