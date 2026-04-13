---
id: article-2026-04-13-from-local-to-global-a-graph-rag-approach-to-query-focused-summarization
type: source
title: "From Local to Global: A Graph RAG Approach to Query-Focused Summarization"
path: raw/articles/arxiv/2026-04-13-from-local-to-global-a-graph-rag-approach-to-query-focused-summarization.md
author: Unknown
publisher: arXiv.org
url: https://arxiv.org/abs/2404.16130
date_published: 
date_added: 2026-04-13
tags: [rag, graphrag, summarization, papers]
status: ingested
quality: medium
summary: "Abstract page for arXiv paper 2404.16130: From Local to Global: A Graph RAG Approach to Query-Focused Summarization"
related: [rag, graphrag, summarization, papers]
---

# From Local to Global: A Graph RAG Approach to Query-Focused Summarization

## Source Metadata

- Path: raw/articles/arxiv/2026-04-13-from-local-to-global-a-graph-rag-approach-to-query-focused-summarization.md
- Author: Unknown
- Published: Unknown
- Publisher: arXiv.org
- URL: https://arxiv.org/abs/2404.16130

## TL;DR

Abstract page for arXiv paper 2404.16130: From Local to Global: A Graph RAG Approach to Query-Focused Summarization

## Key Claims

- Abstract page for arXiv paper 2404.16130: From Local to Global: A Graph RAG Approach to Query-Focused Summarization
- Computation and Language (cs.CL); Artificial Intelligence (cs.AI); Information Retrieval (cs.IR)
- Cite as:
          arXiv:2404.16130 [cs.CL]
- (or
              arXiv:2404.16130v2 [cs.CL] for this version)

## Important Details

- Source captured from arxiv.org.
- Section heading: quick links
- Section heading: Submission history
- Section heading: Access Paper:
- Section heading: References & Citations
- Section heading: BibTeX formatted citation

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
- [[graphrag]]
- [[summarization]]
- [[papers]]

## Source Text

View PDF
    HTML (experimental)
            Abstract:The use of retrieval-augmented generation (RAG) to retrieve relevant information from an external knowledge source enables large language models (LLMs) to answer questions over private and/or previously unseen document collections. However, RAG fails on global questions directed at an entire text corpus, such as "What are the main themes in the dataset?", since this is inherently a query-focused summarization (QFS) task, rather than an explicit retrieval task. Prior QFS methods, meanwhile, do not scale to the quantities of text indexed by typical RAG systems. To combine the strengths of these contrasting methods, we propose GraphRAG, a graph-based approach to question answering over private text corpora that scales with both the generality of user questions and the quantity of source text. Our approach uses an LLM to build a graph index in two stages: first, to derive an entity knowledge graph from the source documents, then to pregenerate community summaries for all groups of closely related entities. Given a question, each community summary is used to generate a partial response, before all partial responses are again summarized in a final response to the user. For a class of global sensemaking questions over datasets in the 1 million token range, we show that GraphRAG leads to substantial improvements over a conventional RAG baseline for both the comprehensiveness and diversity of generated answers.

Computation and Language (cs.CL); Artificial Intelligence (cs.AI); Information Retrieval (cs.IR)

Cite as:
          arXiv:2404.16130 [cs.CL]

(or
              arXiv:2404.16130v2 [cs.CL] for this version)

https://doi.org/10.48550/arXiv.2404.16130

Submission history From: Darren Edge [view email]                  [v1]
        Wed, 24 Apr 2024 18:38:11 UTC (6,306 KB)
    [v2]
        Wed, 19 Feb 2025 10:49:41 UTC (6,322 KB)
