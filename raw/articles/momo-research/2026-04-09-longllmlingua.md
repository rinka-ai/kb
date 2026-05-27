---
id: article-2026-04-09-longllmlingua
type: source
title: LongLLMLingua
path: raw/articles/momo-research/2026-04-09-longllmlingua.md
author: momo personal assistant
publisher: GitHub
url: https://github.com/momo-personal-assistant/momo-research/blob/main/LongLLMLingua.md
date_published:
date_added: 2026-04-09
tags: [compression, long-context, retrieval, prompt-engineering]
status: processed
quality: medium
summary: Note on LongLLMLingua, a prompt compression method that improves long-context performance by making compression question-aware and reorganizing context around relevance.
related: [compression, long-context, context-rot, retrieval]
---

# LongLLMLingua

## Source Metadata

- Path: raw/articles/momo-research/2026-04-09-longllmlingua.md
- Author: momo personal assistant
- Published: Unknown
- Publisher: GitHub
- URL: https://github.com/momo-personal-assistant/momo-research/blob/main/LongLLMLingua.md

## TL;DR

LongLLMLingua is framed here as a smarter compression strategy: compress prompts according to question relevance, move important material to attention-friendly positions, and sometimes outperform the original long prompt while using fewer tokens.

## Key Claims

- Long prompts can hurt performance rather than only increasing cost and latency.
- Question-aware compression is better than compressing context uniformly.
- Reordering documents can mitigate lost-in-the-middle effects.
- Compression and retrieval should be treated as salience management, not just token reduction.

## Important Details

- The note covers coarse-grained document scoring and fine-grained token scoring.
- It emphasizes relevance-sensitive compression ratios across different prompt regions.
- It includes subsequence recovery to restore entities after compression.
- Reported benefits include accuracy gains, lower token costs, and lower latency on long-context tasks.

## Entities

- Paper: LongLLMLingua
- Concepts: question-aware compression, contrastive perplexity, lost in the middle, subsequence recovery
- Benchmarks: NaturalQuestions, LongBench, LooGLE

## My Notes

- This is a good complement to the context rot note because it offers a constructive mitigation strategy instead of just diagnosing failure.
- It could inform future tooling for summarizing or slicing our own KB when context gets large.

## Open Questions

- Could our KB use relevance-aware compression for large synthesis tasks?
- How much of this can be approximated with simpler note ranking and excerpt selection?

## Related

- [[context-engineering]]
- [[context-rot]]
- [[rag]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
