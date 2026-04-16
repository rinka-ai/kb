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
status: processed
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

GraphRAG addresses global corpus questions by building an entity graph plus community summaries, then aggregating partial answers into a final response.

## Key Claims

- Conventional top-k RAG fails on global questions such as “what are the main themes in this corpus?”
- GraphRAG builds an entity graph and community summaries so it can answer corpus-level synthesis questions instead of only local lookup queries.
- On million-token-scale global sensemaking tasks, the approach improves answer comprehensiveness and diversity over a conventional RAG baseline.

## Important Details

- The approach has a two-stage index: graph construction over entities, then pre-generated summaries over communities of related entities.
- Query-time answering works by generating partial responses from community summaries, then aggregating them into a final answer.
- This paper is especially relevant when the KB is asked for cross-document themes rather than direct passage retrieval.

## Entities

- People: Microsoft Research GraphRAG team
- Companies: Microsoft Research
- Tools: GraphRAG
- Concepts: Query-focused summarization, entity graphs, global synthesis

## My Notes

- Important source for distinguishing “global synthesis” questions from ordinary passage retrieval questions in this KB.
- Good complement to [[rag]] because it shows when graph-shaped precomputation can outperform naive top-k context stuffing.

## Open Questions

- Which KB queries are really GraphRAG-shaped corpus synthesis problems rather than passage retrieval problems?
- When would graph-building overhead be justified for a markdown-first KB like this one?

## Related

- [[rag]]
- [[embeddings]]
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
