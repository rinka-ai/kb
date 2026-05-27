---
id: article-2026-04-10-longllmlingua-accelerating-and-enhancing-llms-in-long-context-scenarios-via-prompt-compression
type: source
title: "LongLLMLingua: Accelerating and Enhancing LLMs in Long Context Scenarios via Prompt Compression"
path: raw/articles/arxiv/2026-04-10-longllmlingua-accelerating-and-enhancing-llms-in-long-context-scenarios-via-prompt-compression.md
author: "Huiqiang Jiang, Qianhui Wu, Xufang Luo, Dongsheng Li, Chin-Yew Lin, Yuqing Yang, Lili Qiu"
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
- Author: Huiqiang Jiang, Qianhui Wu, Xufang Luo, Dongsheng Li, Chin-Yew Lin, Yuqing Yang, Lili Qiu
- Published: 2023-10-10
- Publisher: arXiv.org
- URL: https://arxiv.org/abs/2310.06839

## TL;DR

LongLLMLingua treats long-context compression as a salience-and-ordering problem: identify question-relevant material, reorder it to fight position bias, compress at multiple granularities, and recover subsequences that preserve exact phrasing when needed.

## Key Claims

- Long-context prompts suffer from cost, latency, performance degradation, and position bias, not just larger context windows.
- Compression can improve results when it increases the density and placement of key information rather than deleting blindly.
- Question-aware compression outperforms entropy-only compression and retrieval-only baselines because it better preserves the information most relevant to the current query.
- The approach is designed to work with existing models as a prompt-processing step rather than a model retraining method.
- The method’s strength and limitation are linked: because compression is question-aware, the same context may need to be recompressed for each new question.

## Important Details

- The paper evaluates on NaturalQuestions, LongBench, ZeroSCROLLS, MuSicQue, and LooGLE.
- The method combines four main mechanisms: question-aware coarse-to-fine compression, document reordering, dynamic compression ratios, and subsequence recovery.
- The paper reports up to a 21.4% performance boost on NaturalQuestions with roughly 4x fewer tokens in GPT-3.5-Turbo.
- It also reports a 94.0% cost reduction on LooGLE and latency improvements of roughly 1.4x to 2.6x on 10k-token prompts compressed by 2x to 6x.
- The limitations section notes that question-aware compression complicates caching and may be weaker when the context-question relationship is subtle or indirect.
- The arXiv entry notes ACL 2024 acceptance and linked code.

## Entities

- Authors: Huiqiang Jiang, Qianhui Wu, Xufang Luo, Dongsheng Li, Chin-Yew Lin, Yuqing Yang, Lili Qiu
- Benchmarks: NaturalQuestions, LongBench, ZeroSCROLLS, MuSicQue, LooGLE
- Concepts: prompt compression, position bias, document reordering, dynamic compression, subsequence recovery

## My Notes

- This is a strong primary-source complement to the repo's secondary LongLLMLingua and context-rot notes.
- It is useful whenever this KB needs to reason about compaction policies rather than only retrieval or summarization.
- The practical caveat is important for agent systems: question-aware compression improves quality but reduces easy cache reuse.

## Open Questions

- How much of LongLLMLingua's benefit can be approximated with simpler excerpt selection or note ranking inside this KB?
- Which parts of the method are most relevant for agent loops that must preserve restorability?

## Related

- [[context-engineering]]
- [[rag]]

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
