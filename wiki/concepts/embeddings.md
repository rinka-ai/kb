---
id: concept-embeddings
type: concept
title: Embeddings
tags: [embeddings, retrieval, dense-retrieval, openai]
source_count: 7
summary: Embeddings turn text into vector representations for similarity search and clustering, but in this KB they matter mainly as one retriever component inside a broader retrieval pipeline.
canonical_for: [embeddings, vector search, dense retrieval]
review_status: reviewed
last_reviewed: 2026-05-16
review_due: 2026-06-16
confidence: "0.82"
---

# Embeddings

## Summary

Embeddings turn text into vector representations for similarity search and clustering, but in this KB they matter mainly as one retriever component inside a broader retrieval pipeline. The strongest current lesson is not “use embeddings everywhere,” but that dense retrieval, lexical retrieval, query expansion, and reranking should be treated as complementary choices with different strengths. The agentic-search comparison adds a practical caution: dense retrieval's semantic breadth can be helpful early, but in agent loops it can also surface topical false friends and lose to precise lexical search when answers are licensed by literal spans.

## What They Are Good For

- semantic similarity search when exact lexical overlap is weak
- dense retrieval over large corpora
- clustering and nearest-neighbor exploration over documents or chunks
- retrieval pipelines where semantic recall matters before reranking

## Important Boundaries

- embeddings are not the same thing as a full RAG system
- dense retrieval can underperform strong lexical baselines in zero-shot settings
- dense retrieval performance in agent systems depends on the harness, model, query-refinement behavior, result delivery path, and whether the task rewards paraphrase recovery or exact evidence recovery
- query expansion methods like HyDE can improve dense retrieval without supervised labels
- contextual enrichment and reranking often matter as much as the embedding model itself

## Source Notes

- [[2026-04-13-vector-embeddings-openai-api]]
- [[2026-04-13-question-answering-using-embeddings-based-search]]
- [[2026-04-13-dense-passage-retrieval-for-open-domain-question-answering]]
- [[2026-04-13-precise-zero-shot-dense-retrieval-without-relevance-labels]]
- [[2024-09-19-introducing-contextual-retrieval]]
- [[2026-04-13-assistants-file-search-openai-api]]
- [[2026-05-14-is-grep-all-you-need-how-agent-harnesses-reshape-agentic-search]]
