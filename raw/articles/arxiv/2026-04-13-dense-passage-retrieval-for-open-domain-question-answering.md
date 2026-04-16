---
id: article-2026-04-13-dense-passage-retrieval-for-open-domain-question-answering
type: source
title: "Dense Passage Retrieval for Open-Domain Question Answering"
path: raw/articles/arxiv/2026-04-13-dense-passage-retrieval-for-open-domain-question-answering.md
author: Unknown
publisher: arXiv.org
url: https://arxiv.org/abs/2004.04906
date_published:
date_added: 2026-04-13
tags: [retrieval, dense-retrieval, open-domain-qa, papers]
status: processed
quality: medium
summary: "Abstract page for arXiv paper 2004.04906: Dense Passage Retrieval for Open-Domain Question Answering"
related: [retrieval, dense-retrieval, open-domain-qa, papers]
---

# Dense Passage Retrieval for Open-Domain Question Answering

## Source Metadata

- Path: raw/articles/arxiv/2026-04-13-dense-passage-retrieval-for-open-domain-question-answering.md
- Author: Unknown
- Published: Unknown
- Publisher: arXiv.org
- URL: https://arxiv.org/abs/2004.04906

## TL;DR

DPR is a foundational dense retrieval paper showing that dual-encoder passage retrieval can beat BM25 on open-domain question answering benchmarks.

## Key Claims

- DPR shows that dense retrieval can be practical, not only conceptually attractive, for open-domain QA.
- A simple dual-encoder setup outperforms a strong Lucene-BM25 baseline by roughly 9% to 19% absolute in top-20 passage accuracy across evaluated datasets.
- Stronger retrieval also lifts end-to-end QA quality, making the retriever a first-class system component rather than a preprocessing detail.

## Important Details

- DPR is useful in this KB as the dense-retrieval counterpart to BM25 and later hybrid or reranking approaches.
- It anchors the original “dense retriever” lineage behind many later RAG systems.
- The paper is especially important because it separates retriever design from generator design.

## Entities

- People: Vladimir Karpukhin, Barlas Oğuz, Sewon Min, et al.
- Companies: Facebook AI
- Tools: DPR, Lucene-BM25
- Concepts: Dense retrieval, dual encoders, open-domain QA

## My Notes

- Useful source for the KB’s retrieval stack because it explains why embedding-based retrieval became foundational in open-domain QA and RAG.
- Also useful as a reminder that dense retrieval should be evaluated against lexical baselines, not only compared to weaker strawmen.

## Open Questions

- Which of this paper’s wins still survive against newer hybrid and reranking-heavy retrieval stacks?
- At what corpus sizes or query types would DPR-style retrieval actually improve this KB?

## Related

- [[retrieval]]
- [[rag]]
- [[embeddings]]
- [[dense-retrieval]]
- [[open-domain-qa]]
- [[papers]]

## Source Text

View PDF
            Abstract:Open-domain question answering relies on efficient passage retrieval to select candidate contexts, where traditional sparse vector space models, such as TF-IDF or BM25, are the de facto method. In this work, we show that retrieval can be practically implemented using dense representations alone, where embeddings are learned from a small number of questions and passages by a simple dual-encoder framework. When evaluated on a wide range of open-domain QA datasets, our dense retriever outperforms a strong Lucene-BM25 system largely by 9%-19% absolute in terms of top-20 passage retrieval accuracy, and helps our end-to-end QA system establish new state-of-the-art on multiple open-domain QA benchmarks.

Cite as:
          arXiv:2004.04906 [cs.CL]

(or
              arXiv:2004.04906v3 [cs.CL] for this version)

https://doi.org/10.48550/arXiv.2004.04906

Submission history From: Wen-Tau Yih [view email]                  [v1]
        Fri, 10 Apr 2020 04:53:17 UTC (857 KB)
            [v2]
        Sat, 2 May 2020 00:53:53 UTC (454 KB)
    [v3]
        Wed, 30 Sep 2020 21:27:13 UTC (62 KB)
