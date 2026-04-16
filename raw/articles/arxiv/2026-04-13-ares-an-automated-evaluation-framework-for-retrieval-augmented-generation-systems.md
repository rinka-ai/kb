---
id: article-2026-04-13-ares-an-automated-evaluation-framework-for-retrieval-augmented-generation-systems
type: source
title: "ARES: An Automated Evaluation Framework for Retrieval-Augmented Generation Systems"
path: raw/articles/arxiv/2026-04-13-ares-an-automated-evaluation-framework-for-retrieval-augmented-generation-systems.md
author: Unknown
publisher: arXiv.org
url: https://arxiv.org/abs/2311.09476
date_published:
date_added: 2026-04-13
tags: [rag, evaluation, ares, papers]
status: ingested
quality: medium
summary: "Abstract page for arXiv paper 2311.09476: ARES: An Automated Evaluation Framework for Retrieval-Augmented Generation Systems"
related: [rag, evaluation, ares, papers]
---

# ARES: An Automated Evaluation Framework for Retrieval-Augmented Generation Systems

## Source Metadata

- Path: raw/articles/arxiv/2026-04-13-ares-an-automated-evaluation-framework-for-retrieval-augmented-generation-systems.md
- Author: Unknown
- Published: Unknown
- Publisher: arXiv.org
- URL: https://arxiv.org/abs/2311.09476

## TL;DR

Abstract page for arXiv paper 2311.09476: ARES: An Automated Evaluation Framework for Retrieval-Augmented Generation Systems

## Key Claims

- Abstract page for arXiv paper 2311.09476: ARES: An Automated Evaluation Framework for Retrieval-Augmented Generation Systems
- View PDF
    HTML (experimental)
            Abstract:Evaluating retrieval-augmented generation (RAG) systems traditionally relies on hand annotations for input queries, passages to retrieve, and responses to generate.
- Computation and Language (cs.CL); Artificial Intelligence (cs.AI); Information Retrieval (cs.IR)
- Cite as:
          arXiv:2311.09476 [cs.CL]

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

- [[rag]]
- [[evaluation]]
- [[ares]]
- [[papers]]

## Source Text

View PDF
    HTML (experimental)
            Abstract:Evaluating retrieval-augmented generation (RAG) systems traditionally relies on hand annotations for input queries, passages to retrieve, and responses to generate. We introduce ARES, an Automated RAG Evaluation System, for evaluating RAG systems along the dimensions of context relevance, answer faithfulness, and answer relevance. By creating its own synthetic training data, ARES finetunes lightweight LM judges to assess the quality of individual RAG components. To mitigate potential prediction errors, ARES utilizes a small set of human-annotated datapoints for prediction-powered inference (PPI). Across eight different knowledge-intensive tasks in KILT, SuperGLUE, and AIS, ARES accurately evaluates RAG systems while using only a few hundred human annotations during evaluation. Furthermore, ARES judges remain effective across domain shifts, proving accurate even after changing the type of queries and/or documents used in the evaluated RAG systems. We make our code and datasets publicly available on Github.

Computation and Language (cs.CL); Artificial Intelligence (cs.AI); Information Retrieval (cs.IR)

Cite as:
          arXiv:2311.09476 [cs.CL]

(or
              arXiv:2311.09476v2 [cs.CL] for this version)

https://doi.org/10.48550/arXiv.2311.09476

Submission history From: Jon Saad-Falcon [view email]                  [v1]
        Thu, 16 Nov 2023 00:39:39 UTC (520 KB)
    [v2]
        Sun, 31 Mar 2024 20:58:46 UTC (658 KB)
