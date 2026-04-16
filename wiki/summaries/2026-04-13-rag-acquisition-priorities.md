---
id: summary-2026-04-13-rag-acquisition-priorities
type: summary
title: RAG Acquisition Priorities
tags: [rag, retrieval, acquisition, knowledge-base]
---

# RAG Acquisition Priorities

## Summary

The KB currently understands RAG mostly through contextual retrieval, long-context failure, and knowledge-base workflow notes. That is a useful starting point, but it leaves major provenance gaps around the canonical RAG architecture, the main retriever families, adaptive retrieval, and evaluation. The best next additions are the sources that let the KB reason about RAG as a system, not just as a product feature or a chunking trick.

## Status Update (2026-04-13)

The full priority set from this note has now been added to the KB:

- foundation and retriever papers: RAG, DPR, BEIR, ColBERTv2, and HyDE
- adaptive and corrective variants: Self-RAG and CRAG
- evaluation papers: Ragas and ARES
- global-synthesis architecture: GraphRAG
- practical implementation references: OpenAI File Search, the OpenAI Embeddings Guide, and the embeddings QA cookbook example

This note now serves mainly as a rationale and preferred reading order for the RAG cluster.

## Current Gaps

- the foundational paper lineage behind retrieve-then-generate
- strong primary sources on dense, late-interaction, and zero-shot retrieval
- evaluation sources that separate retrieval quality from answer quality
- adaptive and corrective RAG patterns for deciding when and how to retrieve
- sources for corpus-level or global questions where naive top-k passage retrieval breaks down

## Highest-Priority Additions

| Priority | Add | Type | Why it improves the KB |
| --- | --- | --- | --- |
| 1 | [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401) | paper | Canonical RAG paper. Gives the KB the original architecture, terminology, and motivation around combining parametric and non-parametric memory. |
| 2 | [Dense Passage Retrieval for Open-Domain Question Answering](https://arxiv.org/abs/2004.04906) | paper | Foundational dense retriever source. Useful for separating retriever design from generator design instead of collapsing everything into "RAG." |
| 3 | [BEIR: A Heterogenous Benchmark for Zero-shot Evaluation of Information Retrieval Models](https://arxiv.org/abs/2104.08663) | benchmark paper | High-value benchmark source for retrieval quality. Especially useful because it shows BM25 remains a strong baseline and that late interaction and reranking matter. |
| 4 | [ColBERTv2: Effective and Efficient Retrieval via Lightweight Late Interaction](https://arxiv.org/abs/2112.01488) | paper | Gives the KB a practical late-interaction retrieval line, which sits between single-vector dense retrieval and full reranking. |
| 5 | [Precise Zero-Shot Dense Retrieval without Relevance Labels](https://arxiv.org/abs/2212.10496) | paper | HyDE is one of the cleanest query-expansion style improvements for zero-shot retrieval and pairs well with existing KB interest in query-aware context construction. |
| 6 | [Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection](https://arxiv.org/abs/2310.11511) | paper | Strong addition for adaptive retrieval. Helps the KB think beyond fixed top-k retrieval toward deciding when retrieval is needed and whether evidence was actually useful. |
| 7 | [Corrective Retrieval Augmented Generation](https://arxiv.org/abs/2401.15884) | paper | Robustness-oriented source for low-quality retrieval cases. Good counterpart to contextual retrieval because it focuses on error handling after retrieval, not only before it. |
| 8 | [Ragas: Automated Evaluation of Retrieval Augmented Generation](https://arxiv.org/abs/2309.15217) | evaluation paper | Gives the KB a reference-free evaluation framework for retrieval and generation quality without requiring exhaustive human labels. |
| 9 | [ARES: An Automated Evaluation Framework for Retrieval-Augmented Generation Systems](https://arxiv.org/abs/2311.09476) | evaluation paper | Stronger evaluation complement to Ragas because it adds judge calibration and prediction-powered inference instead of relying only on raw automated scores. |
| 10 | [From Local to Global: A Graph RAG Approach to Query-Focused Summarization](https://arxiv.org/abs/2404.16130) | paper | Important because it addresses a failure mode already visible in this KB: some questions are global synthesis questions, not local passage retrieval questions. |

## Practical Docs To Add After The Core Papers

- [OpenAI File Search](https://developers.openai.com/api/docs/assistants/tools/file-search)
  - Useful hosted retrieval reference with concrete defaults for chunking, chunk overlap, ranking, and keyword-plus-semantic search.
- [OpenAI Embeddings Guide](https://developers.openai.com/api/docs/guides/embeddings)
  - Good practical source for embedding-based retrieval basics and the operational assumptions behind similarity search.
- [Question answering using embeddings-based search](https://developers.openai.com/cookbook/examples/question_answering_using_embeddings)
  - Archived, but still a useful minimal reference for a search-then-ask pipeline and a good contrast with heavier managed retrieval stacks.

## Suggested Ingest Order

- start with the foundation and benchmark layer: RAG, DPR, BEIR
- then add retrieval quality upgrades: ColBERTv2 and HyDE
- then add adaptive and corrective patterns: Self-RAG and CRAG
- then add evaluation: Ragas and ARES
- then add the global-synthesis case: GraphRAG
- finally add the practical hosted-doc references so the KB has at least one up-to-date implementation viewpoint alongside the papers
