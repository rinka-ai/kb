---
id: concept-rag
type: concept
title: RAG
tags: [rag, retrieval, knowledge-bases, dense-retrieval, embeddings, graphrag, knowledge-graphs]
source_count: 26
summary: RAG is a full retrieval and evidence-assembly pipeline that combines search, representation, ranking, uncertainty, and generation rather than a synonym for vector search alone.
canonical_for: [retrieval augmented generation, graph rag, corrective rag, contextual retrieval]
review_status: reviewed
last_reviewed: 2026-05-20
review_due: 2026-06-20
confidence: "0.9"
---

# RAG

## Summary

Retrieval-augmented generation is the pattern of constructing model context at query time from external documents, then answering with that evidence in view. In this KB, RAG is best treated as a full [[context-engineering]] pipeline rather than a synonym for "vector search": chunking, lexical and semantic retrieval, ranking, compression, evidence assembly, provenance, uncertainty handling, harness behavior, and tool-result delivery all materially affect quality. The textbook layer adds useful classical grounding: retrieval quality depends on representation, nearest-neighbor geometry, ranking objectives, and uncertainty over what evidence actually supports. The agentic-search evidence strengthens the boundary condition: for literal-witness conversational memory tasks, grep-style lexical retrieval can beat vector retrieval end-to-end when the harness makes hits immediately usable, but that advantage is not stable once delivery paths and provider CLIs change. The Cognee paper and repo add the GraphRAG maintenance lesson: graph memory quality depends on tuning and evaluating the interface between graph extraction, vector search, graph projection, prompt assembly, answer style, and grading, not merely choosing a graph database. MemWal adds the encrypted-memory retrieval case: the retriever may index vectors in a rebuildable database while source text lives as encrypted blobs elsewhere, which makes restore, metadata leakage, and relayer trust part of retrieval design. The current notes also show that for modest corpora, a compiled markdown wiki or full-context prompting can still be simpler and more reliable than a heavy RAG stack.

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
- when source text is encrypted, decide what the retriever is allowed to see: plaintext, vectors only, keywords/entities, or decrypted candidates after a first-stage search
- evaluate retrievers inside the actual agent harness and delivery path, because inline results, file-backed results, and CLI shell ergonomics can change answer accuracy without changing the corpus
- evaluate retrieval quality and answer quality separately
- distinguish relevance, evidence sufficiency, source authority, and model faithfulness; a retrieved passage can be relevant but still not enough to answer

## Retriever Families

- dense retrieval gives RAG its basic retrieve-then-generate backbone, but it should not be treated as the only retrieval option
- nearest-neighbor retrieval is a representation problem as much as a database problem: the geometry of the embedding space decides which evidence is reachable
- BM25 remains a strong baseline and is often more robust than people expect in zero-shot settings
- grep-style lexical retrieval can be a strong agentic-search baseline when tasks have exact dates, preferences, IDs, or other literal witnesses, but it remains brittle to vocabulary mismatch
- late-interaction retrieval offers a practical middle ground between cheap single-vector retrieval and expensive full reranking
- query expansion patterns such as HyDE can help zero-shot retrieval when no relevance labels are available

## Variants

- Self-RAG treats retrieval as adaptive rather than mandatory, and adds self-critique to judge whether retrieved evidence helped
- CRAG focuses on what to do when retrieval quality is weak, adding a corrective step instead of assuming retrieved passages are already trustworthy
- GraphRAG is useful when the question is about corpus-level themes or global structure rather than a small number of directly relevant passages
- GraphRAG systems need interface tuning: chunking, overlap, top-k, prompt format, and generation settings can change multi-hop QA quality even when the graph substrate is unchanged
- graph-completion retrieval is a distinct shape from chunk RAG: it searches node/edge representations, projects a graph fragment, formats triplets, and then asks the LLM to answer from relational context
- global-summary retrieval can sit between local triplets and full-corpus synthesis, acting like a query-time map over graph summaries

## Evaluation

- retrieval quality and answer quality need different measurements
- reference-free evaluation frameworks can speed up iteration when human labels are scarce
- benchmark coverage matters because retrieval methods that look strong on narrow datasets may fail badly out of domain
- agentic RAG evals should report harness, model, tool-result delivery style, and distractor/noise setup alongside retriever scores
- this KB should evaluate RAG systems against both local lookup questions and broader synthesis questions
- graph-based memory systems should keep saved eval cases because the best KG-to-LLM interface is dataset- and metric-dependent
- evaluation should include answer-style sensitivity: exact match, F1, and LLM-judge correctness reward different behavior
- hyperparameter search over the full retrieval-generation path can be more informative than isolated retriever benchmarks

## When Simpler Is Better

- for small corpora, full-context prompting or a compiled wiki may be easier to maintain than a full RAG stack
- if the main job is cross-document synthesis, a curated concept page may outperform naive top-k passage stuffing
- if the task is open-ended research, just-in-time multi-step retrieval may work better than single-shot RAG
- if the corpus is personal or sensitive, the trust boundary of embedding generation and reranking may matter more than the retrieval algorithm

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
- [[2026-05-14-is-grep-all-you-need-how-agent-harnesses-reshape-agentic-search]]
- [[2026-05-18-probabilistic-machine-learning-introduction]]
- [[2026-05-18-foundations-of-machine-learning]]
- [[2025-05-30-optimizing-interface-knowledge-graphs-llms-complex-reasoning]]
- [[2026-05-18-cognee]]
- [[2026-05-20-memwal]]
