---
id: concept-rag
type: concept
title: RAG
tags: [rag, retrieval, knowledge-bases]
source_count: 20
---

# RAG

## Summary

Retrieval-augmented generation is the pattern of constructing model context at query time from external documents, then answering with that evidence in view. In this KB, RAG is best treated as a full [[context-engineering]] pipeline rather than a synonym for "vector search": chunking, lexical and semantic retrieval, ranking, compression, evidence assembly, and provenance all materially affect quality. The current notes also show an important boundary condition: for modest corpora, a compiled markdown wiki or full-context prompting can still be simpler and more reliable than a heavy RAG stack.

## Where It Fits

- use RAG when the corpus is too large, too dynamic, or too private to preload directly into prompts or model weights
- use it when provenance matters and answers should stay tied to inspectable source documents
- treat it as one layer in a broader [[personal-knowledge-bases]] system that can also include curated concept pages, files, and deeper runtime research

## Common Failure Modes

- chunking strips away the local context that makes a passage retrievable
- dense retrieval alone can miss exact lexical anchors, while lexical retrieval alone can miss semantic similarity
- retrieving more text does not remove distractor risk; long noisy contexts can still degrade answer quality
- retrieval success does not guarantee faithful use of retrieved evidence during generation
- compression and caching choices can help or hurt depending on whether they preserve the information most relevant to the current query

## Practical Patterns

- combine semantic and lexical retrieval rather than treating them as substitutes
- enrich chunks with local or document-level context before indexing when raw chunks are too lossy
- retrieve broadly, then narrow with reranking, filtering, or query-aware compression
- preserve URLs, file paths, and source ids so dropped context can be reconstructed instead of irreversibly summarized
- evaluate retrieval quality and answer quality separately

## Retriever Families

- dense retrieval gives RAG its basic retrieve-then-generate backbone, but it should not be treated as the only retrieval option
- BM25 remains a strong baseline and is often more robust than people expect in zero-shot settings
- late-interaction retrieval offers a practical middle ground between cheap single-vector retrieval and expensive full reranking
- query expansion patterns such as HyDE can help zero-shot retrieval when no relevance labels are available

## Variants

- Self-RAG treats retrieval as adaptive rather than mandatory, and adds self-critique to judge whether retrieved evidence helped
- CRAG focuses on what to do when retrieval quality is weak, adding a corrective step instead of assuming retrieved passages are already trustworthy
- GraphRAG is useful when the question is about corpus-level themes or global structure rather than a small number of directly relevant passages

## Evaluation

- retrieval quality and answer quality need different measurements
- reference-free evaluation frameworks can speed up iteration when human labels are scarce
- benchmark coverage matters because retrieval methods that look strong on narrow datasets may fail badly out of domain
- this KB should evaluate RAG systems against both local lookup questions and broader synthesis questions

## When Simpler Is Better

- for small corpora, full-context prompting or a compiled wiki may be easier to maintain than a full RAG stack
- if the main job is cross-document synthesis, a curated concept page may outperform naive top-k passage stuffing
- if the task is open-ended research, just-in-time multi-step retrieval may work better than single-shot RAG

## Source Notes

- [[2024-09-19-introducing-contextual-retrieval]]
- [[2026-04-08-llm-knowledge-bases]]
- [[2026-04-12-knowledge-base]]
- [[2026-04-09-context-rot]]
- [[2026-04-09-longllmlingua]]
- [[2026-04-10-longllmlingua-accelerating-and-enhancing-llms-in-long-context-scenarios-via-prompt-compression]]
- [[2026-04-09-gam-vs-context-rot]]
- [[2026-04-13-retrieval-augmented-generation-for-knowledge-intensive-nlp-tasks]]
- [[2026-04-13-dense-passage-retrieval-for-open-domain-question-answering]]
- [[2026-04-13-beir-a-heterogenous-benchmark-for-zero-shot-evaluation-of-information-retrieval-models]]
- [[2026-04-13-colbertv2-effective-and-efficient-retrieval-via-lightweight-late-interaction]]
- [[2026-04-13-precise-zero-shot-dense-retrieval-without-relevance-labels]]
- [[2026-04-13-self-rag-learning-to-retrieve-generate-and-critique-through-self-reflection]]
- [[2026-04-13-corrective-retrieval-augmented-generation]]
- [[2026-04-13-ragas-automated-evaluation-of-retrieval-augmented-generation]]
- [[2026-04-13-ares-an-automated-evaluation-framework-for-retrieval-augmented-generation-systems]]
- [[2026-04-13-from-local-to-global-a-graph-rag-approach-to-query-focused-summarization]]
- [[2026-04-13-assistants-file-search-openai-api]]
- [[2026-04-13-vector-embeddings-openai-api]]
- [[2026-04-13-question-answering-using-embeddings-based-search]]
