---
id: article-2026-04-13-precise-zero-shot-dense-retrieval-without-relevance-labels
type: source
title: "Precise Zero-Shot Dense Retrieval without Relevance Labels"
path: raw/articles/arxiv/2026-04-13-precise-zero-shot-dense-retrieval-without-relevance-labels.md
author: Unknown
publisher: arXiv.org
url: https://arxiv.org/abs/2212.10496
date_published:
date_added: 2026-04-13
tags: [retrieval, hyde, dense-retrieval, papers]
status: processed
quality: medium
summary: "Abstract page for arXiv paper 2212.10496: Precise Zero-Shot Dense Retrieval without Relevance Labels"
related: [retrieval, hyde, dense-retrieval, papers]
---

# Precise Zero-Shot Dense Retrieval without Relevance Labels

## Source Metadata

- Path: raw/articles/arxiv/2026-04-13-precise-zero-shot-dense-retrieval-without-relevance-labels.md
- Author: Unknown
- Published: Unknown
- Publisher: arXiv.org
- URL: https://arxiv.org/abs/2212.10496

## TL;DR

HyDE improves zero-shot dense retrieval by generating a hypothetical relevant document, embedding it, and retrieving real neighbors without supervised relevance labels.

## Key Claims

- HyDE sidesteps the lack of labels in zero-shot dense retrieval by prompting a model to imagine a relevant document first.
- The hypothetical document is encoded into embedding space, where nearby real documents can be retrieved without trusting the generated text literally.
- The method outperforms Contriever and competes with fine-tuned retrievers across multiple tasks and languages.

## Important Details

- HyDE is one of the clearest examples of query expansion that stays useful even when no relevance labels exist.
- The dense bottleneck is important because it filters false details from the hypothetical document instead of treating the generated text as evidence.
- This matters to the KB because retrieval quality can improve without needing a full supervised training pipeline.

## Entities

- People: Luyu Gao, Xueguang Ma, Jimmy Lin, Jamie Callan
- Companies: Carnegie Mellon University, University of Waterloo
- Tools: HyDE, Contriever
- Concepts: Zero-shot dense retrieval, hypothetical documents, query expansion

## My Notes

- Useful source for any future retrieval upgrades that want query expansion before adding a full dense index or reranker.
- Also helps explain why generated intermediate artifacts can help retrieval without becoming trusted evidence themselves.

## Open Questions

- Would HyDE-style query expansion improve hard KB searches enough to justify the extra inference step?
- Which current failure cases here are really “query formulation” failures rather than “ranking” failures?

## Related

- [[rag]]
- [[embeddings]]
- [[arxiv]]

## Source Text

View PDF
            Abstract:While dense retrieval has been shown effective and efficient across tasks and languages, it remains difficult to create effective fully zero-shot dense retrieval systems when no relevance label is available. In this paper, we recognize the difficulty of zero-shot learning and encoding relevance. Instead, we propose to pivot through Hypothetical Document Embeddings~(HyDE). Given a query, HyDE first zero-shot instructs an instruction-following language model (e.g. InstructGPT) to generate a hypothetical document. The document captures relevance patterns but is unreal and may contain false details. Then, an unsupervised contrastively learned encoder~(e.g. Contriever) encodes the document into an embedding vector. This vector identifies a neighborhood in the corpus embedding space, where similar real documents are retrieved based on vector similarity. This second step ground the generated document to the actual corpus, with the encoder's dense bottleneck filtering out the incorrect details. Our experiments show that HyDE significantly outperforms the state-of-the-art unsupervised dense retriever Contriever and shows strong performance comparable to fine-tuned retrievers, across various tasks (e.g. web search, QA, fact verification) and languages~(e.g. sw, ko, ja).

Information Retrieval (cs.IR); Computation and Language (cs.CL)

Cite as:
          arXiv:2212.10496 [cs.IR]

(or
              arXiv:2212.10496v1 [cs.IR] for this version)

https://doi.org/10.48550/arXiv.2212.10496

Submission history From: Luyu Gao [view email]          [v1]
        Tue, 20 Dec 2022 18:09:52 UTC (7,003 KB)
