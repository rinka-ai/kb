---
id: article-2026-04-13-beir-a-heterogenous-benchmark-for-zero-shot-evaluation-of-information-retrieval-models
type: source
title: "BEIR: A Heterogenous Benchmark for Zero-shot Evaluation of Information Retrieval Models"
path: raw/articles/arxiv/2026-04-13-beir-a-heterogenous-benchmark-for-zero-shot-evaluation-of-information-retrieval-models.md
author: Unknown
publisher: arXiv.org
url: https://arxiv.org/abs/2104.08663
date_published:
date_added: 2026-04-13
tags: [retrieval, benchmarks, beir, papers]
status: processed
quality: medium
summary: "Abstract page for arXiv paper 2104.08663: BEIR: A Heterogenous Benchmark for Zero-shot Evaluation of Information Retrieval Models"
related: [retrieval, benchmarks, beir, papers]
---

# BEIR: A Heterogenous Benchmark for Zero-shot Evaluation of Information Retrieval Models

## Source Metadata

- Path: raw/articles/arxiv/2026-04-13-beir-a-heterogenous-benchmark-for-zero-shot-evaluation-of-information-retrieval-models.md
- Author: Unknown
- Published: Unknown
- Publisher: arXiv.org
- URL: https://arxiv.org/abs/2104.08663

## TL;DR

BEIR is a heterogeneous zero-shot retrieval benchmark showing that strong lexical baselines remain competitive and that robustness differs sharply across retriever families.

## Key Claims

- BEIR broadens retrieval evaluation beyond narrow homogeneous datasets by benchmarking across many task types and domains.
- BM25 is a stronger zero-shot baseline than many teams assume, especially when dense methods are not tuned for the target domain.
- Late interaction and reranking are strong on average, but they trade off more compute for quality.

## Important Details

- The benchmark covers 18 publicly available datasets and compares lexical, sparse, dense, late-interaction, and reranking systems.
- The paper is especially useful for explaining why retrieval evaluation should include out-of-domain robustness instead of only in-domain wins.
- Accepted at NeurIPS 2021 Dataset and Benchmark Track.

## Entities

- People: Nandan Thakur, Nils Reimers, Andreas Rücklé, et al.
- Companies: UKP Lab, TU Darmstadt, Hugging Face
- Tools: BEIR, BM25, dense retrievers, rerankers
- Concepts: Zero-shot retrieval, robustness, benchmark diversity

## My Notes

- This is a primary source for why retrieval quality in this KB should be measured across query shapes instead of only on one convenient benchmark.
- It also supports keeping lexical retrieval in the stack instead of assuming embeddings should dominate by default.

## Open Questions

- Which BEIR-style query families should our own retrieval eval set imitate?
- Where should this KB prefer cheaper lexical baselines over more expensive dense or late-interaction methods?

## Related

- [[rag]]
- [[embeddings]]
- [[benchmark-integrity]]
- [[arxiv]]

## Source Text

View PDF
            Abstract:Existing neural information retrieval (IR) models have often been studied in homogeneous and narrow settings, which has considerably limited insights into their out-of-distribution (OOD) generalization capabilities. To address this, and to facilitate researchers to broadly evaluate the effectiveness of their models, we introduce Benchmarking-IR (BEIR), a robust and heterogeneous evaluation benchmark for information retrieval. We leverage a careful selection of 18 publicly available datasets from diverse text retrieval tasks and domains and evaluate 10 state-of-the-art retrieval systems including lexical, sparse, dense, late-interaction and re-ranking architectures on the BEIR benchmark. Our results show BM25 is a robust baseline and re-ranking and late-interaction-based models on average achieve the best zero-shot performances, however, at high computational costs. In contrast, dense and sparse-retrieval models are computationally more efficient but often underperform other approaches, highlighting the considerable room for improvement in their generalization capabilities. We hope this framework allows us to better evaluate and understand existing retrieval systems, and contributes to accelerating progress towards better robust and generalizable systems in the future. BEIR is publicly available at this https URL.

Comments:
          Accepted at NeurIPS 2021 Dataset and Benchmark Track

Information Retrieval (cs.IR); Artificial Intelligence (cs.AI); Computation and Language (cs.CL)

Cite as:
          arXiv:2104.08663 [cs.IR]

(or
              arXiv:2104.08663v4 [cs.IR] for this version)

https://doi.org/10.48550/arXiv.2104.08663

Submission history From: Nandan Thakur [view email]                  [v1]
        Sat, 17 Apr 2021 23:29:55 UTC (2,441 KB)
            [v2]
        Wed, 28 Apr 2021 13:59:17 UTC (2,442 KB)
            [v3]
        Tue, 7 Sep 2021 20:33:14 UTC (3,482 KB)
    [v4]
        Thu, 21 Oct 2021 01:18:28 UTC (3,482 KB)
