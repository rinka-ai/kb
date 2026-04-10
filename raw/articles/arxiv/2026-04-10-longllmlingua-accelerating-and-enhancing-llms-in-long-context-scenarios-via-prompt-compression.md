---
id: article-2026-04-10-longllmlingua-accelerating-and-enhancing-llms-in-long-context-scenarios-via-prompt-compression
type: source
title: "LongLLMLingua: Accelerating and Enhancing LLMs in Long Context Scenarios via Prompt Compression"
path: raw/articles/arxiv/2026-04-10-longllmlingua-accelerating-and-enhancing-llms-in-long-context-scenarios-via-prompt-compression.md
author: Unknown
publisher: arXiv.org
url: https://arxiv.org/abs/2310.06839
date_published: 2023-10-10
date_added: 2026-04-10
tags: [compression, long-context, retrieval, prompt-compression]
status: processed
quality: high
summary: LongLLMLingua proposes question-aware prompt compression for long-context tasks, aiming to improve quality while simultaneously reducing token cost, latency, and position-bias problems.
related: [compression, long-context, retrieval, prompt-compression]
---

# LongLLMLingua: Accelerating and Enhancing LLMs in Long Context Scenarios via Prompt Compression

## Source Metadata

- Path: raw/articles/arxiv/2026-04-10-longllmlingua-accelerating-and-enhancing-llms-in-long-context-scenarios-via-prompt-compression.md
- Author: Unknown
- Published: Unknown
- Publisher: arXiv.org
- URL: https://arxiv.org/abs/2310.06839

## TL;DR

LongLLMLingua reframes prompt compression as salience management: compress according to relevance, preserve key information density, and mitigate lost-in-the-middle effects rather than only cutting tokens uniformly.

## Key Claims

- Long-context prompts suffer from cost, latency, performance degradation, and position bias, not just larger context windows.
- Compression can improve results when it increases the density and placement of key information rather than deleting blindly.
- LongLLMLingua claims quality gains together with lower token budgets across several long-context tasks.
- The approach is designed to work with existing models as a prompt-processing step rather than a model retraining method.

## Important Details

- The paper reports up to a 21.4% performance boost on NaturalQuestions with roughly 4x fewer tokens in GPT-3.5-Turbo.
- It also reports a 94.0% cost reduction on LooGLE and latency improvements of roughly 1.4x to 2.6x on 10k-token prompts compressed by 2x to 6x.
- The arXiv entry notes ACL 2024 acceptance and linked code.

## Entities

- Authors: Huiqiang Jiang and collaborators
- Benchmarks: NaturalQuestions, LooGLE
- Concepts: prompt compression, position bias, long-context optimization, salience management

## My Notes

- This is a strong primary-source complement to the repo's secondary LongLLMLingua and context-rot notes.
- It is useful whenever this KB needs to reason about compaction policies rather than only retrieval or summarization.

## Open Questions

- How much of LongLLMLingua's benefit can be approximated with simpler excerpt selection or note ranking inside this KB?
- Which parts of the method are most relevant for agent loops that must preserve restorability?

## Related

- [[compression]]
- [[long-context]]
- [[retrieval]]
- [[prompt-compression]]

## Source Text

View PDF
    HTML (experimental)
            Abstract:In long context scenarios, large language models (LLMs) face three main challenges: higher computational cost, performance reduction, and position bias. Research indicates that LLM performance hinges on the density and position of key information in the input prompt. Inspired by these findings, we propose LongLLMLingua for prompt compression towards improving LLMs' perception of the key information to simultaneously address the three challenges. Our extensive evaluation across various long context scenarios demonstrates that LongLLMLingua not only enhances performance but also significantly reduces costs and latency. For instance, in the NaturalQuestions benchmark, LongLLMLingua boosts performance by up to 21.4% with around 4x fewer tokens in GPT-3.5-Turbo, leading to substantial cost savings. It achieves a 94.0% cost reduction in the LooGLE benchmark. Moreover, when compressing prompts of about 10k tokens at ratios of 2x-6x, LongLLMLingua can accelerate end-to-end latency by 1.4x-2.6x. Our code is available at this https URL.

Comments:
          Accepted at ACL 2024

Computation and Language (cs.CL); Machine Learning (cs.LG)

Cite as:
          arXiv:2310.06839 [cs.CL]

(or
              arXiv:2310.06839v2 [cs.CL] for this version)

https://doi.org/10.48550/arXiv.2310.06839

Submission history From: Huiqiang Jiang [view email]                  [v1]
        Tue, 10 Oct 2023 17:59:58 UTC (1,417 KB)
    [v2]
        Mon, 12 Aug 2024 03:53:35 UTC (1,981 KB)
