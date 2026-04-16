---
id: article-2026-04-13-colbertv2-effective-and-efficient-retrieval-via-lightweight-late-interaction
type: source
title: "ColBERTv2: Effective and Efficient Retrieval via Lightweight Late Interaction"
path: raw/articles/arxiv/2026-04-13-colbertv2-effective-and-efficient-retrieval-via-lightweight-late-interaction.md
author: Unknown
publisher: arXiv.org
url: https://arxiv.org/abs/2112.01488
date_published:
date_added: 2026-04-13
tags: [retrieval, late-interaction, colbert, papers]
status: processed
quality: medium
summary: "Abstract page for arXiv paper 2112.01488: ColBERTv2: Effective and Efficient Retrieval via Lightweight Late Interaction"
related: [retrieval, late-interaction, colbert, papers]
---

# ColBERTv2: Effective and Efficient Retrieval via Lightweight Late Interaction

## Source Metadata

- Path: raw/articles/arxiv/2026-04-13-colbertv2-effective-and-efficient-retrieval-via-lightweight-late-interaction.md
- Author: Unknown
- Published: Unknown
- Publisher: arXiv.org
- URL: https://arxiv.org/abs/2112.01488

## TL;DR

ColBERTv2 shows that late-interaction retrieval can stay highly effective while cutting storage costs substantially through compression and denoised supervision.

## Key Claims

- Late interaction remains a strong compromise between cheap single-vector retrieval and expensive full reranking.
- ColBERTv2 improves quality while reducing late-interaction storage cost by roughly 6x to 10x.
- Denoised supervision plus residual compression makes token-level retrieval more practical at scale.

## Important Details

- The paper argues that token-level matching quality is worth preserving when single-vector dense retrieval loses too much nuance.
- NAACL 2022.
- This note matters because it gives the KB a practical retriever family between BM25 and heavyweight reranking.

## Entities

- People: Omar Khattab, Keshav Santhanam, Xiang Lisa Li, et al.
- Companies: Stanford University
- Tools: ColBERTv2
- Concepts: Late interaction, residual compression, dense retrieval

## My Notes

- This is one of the clearest sources for why “dense retrieval” should not be treated as one undifferentiated category.
- Useful when comparing retriever families for this KB’s eventual hybrid search stack.

## Open Questions

- When would a ColBERT-style retriever justify its added complexity for this KB?
- Which retrieval queries here are most likely to benefit from token-level interaction instead of simpler dense search?

## Related

- [[retrieval]]
- [[rag]]
- [[embeddings]]
- [[late-interaction]]
- [[colbert]]
- [[papers]]

## Source Text

View PDF
            Abstract:Neural information retrieval (IR) has greatly advanced search and other knowledge-intensive language tasks. While many neural IR methods encode queries and documents into single-vector representations, late interaction models produce multi-vector representations at the granularity of each token and decompose relevance modeling into scalable token-level computations. This decomposition has been shown to make late interaction more effective, but it inflates the space footprint of these models by an order of magnitude. In this work, we introduce ColBERTv2, a retriever that couples an aggressive residual compression mechanism with a denoised supervision strategy to simultaneously improve the quality and space footprint of late interaction. We evaluate ColBERTv2 across a wide range of benchmarks, establishing state-of-the-art quality within and outside the training domain while reducing the space footprint of late interaction models by 6--10$\times$.

Comments:
          NAACL 2022. Omar and Keshav contributed equally to this work

Information Retrieval (cs.IR); Computation and Language (cs.CL)

Cite as:
          arXiv:2112.01488 [cs.IR]

(or
              arXiv:2112.01488v3 [cs.IR] for this version)

https://doi.org/10.48550/arXiv.2112.01488

Submission history From: Omar Khattab [view email]                  [v1]
        Thu, 2 Dec 2021 18:38:50 UTC (570 KB)
            [v2]
        Thu, 16 Dec 2021 05:34:49 UTC (573 KB)
    [v3]
        Sun, 10 Jul 2022 17:28:51 UTC (627 KB)
