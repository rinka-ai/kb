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
status: ingested
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

Abstract page for arXiv paper 2212.10496: Precise Zero-Shot Dense Retrieval without Relevance Labels

## Key Claims

- Abstract page for arXiv paper 2212.10496: Precise Zero-Shot Dense Retrieval without Relevance Labels
- View PDF
            Abstract:While dense retrieval has been shown effective and efficient across tasks and languages, it remains difficult to create effective fully zero-shot dense retrieval systems when no relevance label is available.
- Information Retrieval (cs.IR); Computation and Language (cs.CL)
- Cite as:
          arXiv:2212.10496 [cs.IR]

## Important Details

- Source captured from arxiv.org.
- Section heading: quick links
- Section heading: Submission history
- Section heading: Access Paper:
- Section heading: References & Citations
- Section heading: 1 blog link

## Entities

- People: Unknown
- Companies: Unknown
- Tools: Unknown
- Concepts: Unknown

## My Notes

- Imported automatically by `bun run kb:ingest`.
- Review and refine the structured sections before relying on this note heavily.

## Open Questions

- What claims in this source matter most for the current knowledge base?
- Which concept pages should link back to this note?

## Related

- [[retrieval]]
- [[hyde]]
- [[dense-retrieval]]
- [[papers]]

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
