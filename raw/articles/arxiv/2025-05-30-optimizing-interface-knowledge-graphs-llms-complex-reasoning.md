---
id: article-2025-05-30-optimizing-interface-knowledge-graphs-llms-complex-reasoning
type: source
title: "Optimizing the Interface Between Knowledge Graphs and LLMs for Complex Reasoning"
path: raw/articles/arxiv/2025-05-30-optimizing-interface-knowledge-graphs-llms-complex-reasoning.md
author: Vasilije Markovic; Lazar Obradovic; Laszlo Hajdu; Jovan Pavlovic
publisher: arXiv.org
url: https://arxiv.org/abs/2505.24478
date_published: 2025-05-30
date_added: 2026-05-18
tags: [rag, graphrag, knowledge-graphs, evaluation, hyperparameter-optimization, cognee, papers]
status: active
quality: medium
summary: A preliminary Cognee paper arguing that knowledge-graph RAG performance depends heavily on the interface layer between graph retrieval and LLM generation, with measured gains from tuning chunking, retrieval strategy, top-k, prompts, graph construction, and preprocessing.
related: [rag, agent-memory, context-engineering]
---

# Optimizing the Interface Between Knowledge Graphs and LLMs for Complex Reasoning

## Source Metadata

- Path: raw/articles/arxiv/2025-05-30-optimizing-interface-knowledge-graphs-llms-complex-reasoning.md
- Author: Vasilije Markovic; Lazar Obradovic; Laszlo Hajdu; Jovan Pavlovic
- Published: 2025-05-30
- Publisher: arXiv.org
- URL: https://arxiv.org/abs/2505.24478
- PDF checked: https://arxiv.org/pdf/2505.24478
- Related implementation: [[2026-05-18-cognee]]
- Local extraction: `/tmp/cognee-paper/2505.24478.txt` during 2026-05-18 ingest/update pass.

## TL;DR

The paper is less about agent skills and more about the retrieval/evaluation side of Cognee. Its durable point for this KB is that graph-based memory systems are not automatically good because they use a knowledge graph: quality depends on the interface between graph construction, vector search, graph traversal, prompt assembly, and LLM answering. The paper's "Dreamify" optimization loop treats the whole KG-RAG pipeline as the objective function and shows that even modest configuration tuning can change multi-hop QA scores substantially.

## Key Claims

- Knowledge-graph RAG systems have many interacting configuration choices, so default settings can underperform even when the underlying architecture is strong.
- Hyperparameter optimization can substantially improve answer quality on multi-hop question answering benchmarks.
- The best settings are dataset-specific; there is no universal chunking, retrieval, or prompt recipe.
- Exact-match and F1-style metrics only capture part of complex reasoning quality, so LLM-based evaluation can complement traditional QA metrics.
- The useful unit of optimization is the retrieval-generation interface, not just the graph database or vector store in isolation.
- Treating a modular RAG pipeline as an objective function gives a practical improvement loop without changing the architecture or retraining the model.
- Standard QA benchmarks are useful but imperfect proxies for memory-system quality because answer style, benchmark noise, and LLM-as-judge variance can dominate some score changes.

## Important Details

- The paper evaluates Cognee on multi-hop QA datasets including HotPotQA, TwoWikiMultiHopQA, and MuSiQue.
- It uses a limited train/test split for optimization experiments: 24 training instances and 12 held-out instances per dataset after manual filtering.
- The optimization space includes chunk size, retriever type, top-k context size, QA prompt template, graph extraction prompt, and task-processing method.
- Chunk size spans roughly 200-2000 tokens in the reported setup.
- Retrieval strategy compares Cognee's text-completion path against graph-completion retrieval over knowledge-graph nodes/triplets.
- Top-k ranges from 1 to 20 retrieved items.
- Task processing compares variants that include document summaries during graph construction against variants that omit summaries.
- The work uses a Tree-structured Parzen Estimator optimizer. The paper names the framework "Dreamify."
- Each benchmark-metric combination runs 50 sequential trials; each trial is a full pipeline run from corpus construction through evaluation.
- Training results improve across all reported combinations. Examples: HotPotQA correctness rises from 0.476 to 0.815; MuSiQue F1 rises from 0.145 to 0.654; TwoWikiMultiHop F1 rises from 0.148 to 0.625.
- Held-out scores remain below training in most cases but usually preserve a visible gain. TwoWikiMultiHop F1 is the exception where held-out score exceeds training.
- The paper complements GraphRAG sources in the KB by emphasizing operational tuning, not just graph construction.

## Architecture Details From Appendix

- Cognee is described as an Extract-Cognify-Load pipeline.
- Extract ingests heterogeneous inputs such as text, images, audio, PDFs, source code, and remote sources.
- Cognify applies schema-based transformations using Pydantic models to extract entities, relations, attributes, and summaries.
- Load writes graph outputs into graph, relational, and vector stores.
- The default pipeline records metadata, deduplicates by content hash, chunks documents, extracts graph fragments with LLMs, links outputs to sources, and indexes graph plus embeddings.
- Retriever families include summary retrieval, chunk retrieval, graph-neighborhood retrieval, RAG completion, graph completion, and graph-summary completion.
- The evaluation framework has four phases: corpus construction, answer generation, evaluation, and metric aggregation.
- Evaluation supports exact match, F1, DeepEval/GEval-style correctness, contextual coverage, bootstrap confidence intervals, and dashboard output.

## Entities

- People: Vasilije Markovic, Lazar Obradovic, Laszlo Hajdu, Jovan Pavlovic
- Project: Cognee
- Benchmarks: HotPotQA, TwoWikiMultiHopQA, MuSiQue
- Methods: GraphRAG, knowledge-graph RAG, hyperparameter optimization, Optuna, Tree-structured Parzen Estimator
- Metrics: exact match, F1, LLM-based evaluation

## My Notes

- This source should mostly inform [[rag]] and [[agent-memory]], not [[agent-skills]] directly.
- Its best contribution is a retrieval-maintenance lesson: memory systems should keep saved eval cases and tune the full graph-to-context-to-answer path, because "graph memory" is not a stable product category by itself.
- It pairs well with the Cognee repo check because the repo exposes the same broad shape: configurable retrieval modes, eval adapters for HotPotQA/TwoWiki/MuSiQue, bootstrap metrics, session memory, graph memory, and improvement loops.
- The paper's small experiment size and preliminary-version caveat mean it should not be cited as strong evidence that Cognee is generally superior to other RAG stacks.
- The most portable KB idea is "interface evals": when retrieval, graph construction, prompt format, answer style, and grader all move together, optimizing only one component is misleading.
- The paper should nudge this repo toward storing retrieval eval fixtures for real KB queries, not only telemetry counts.

## Open Questions

- Which KB tasks would benefit from a saved retrieval eval suite rather than ad hoc `kb:search` checks?
- Should the KB's own `kb:search-report` evolve toward metric-backed tuning over repeated real queries?
- When does graph-based retrieval help this markdown KB beyond the simpler source-note and concept-page rollup pattern?
- Can a small set of canonical KB questions test concept-page freshness, source recall, exact numeric/date recall, and cross-source synthesis separately?
- Should query telemetry include which retrieval lane would have answered best, not only whether the query had results?

## Related

- [[rag]]
- [[agent-memory]]
- [[context-engineering]]
- [[2026-05-18-cognee]]
- [[2026-05-17-memory-skills-same-harness-tricalt]]

## Source Text

Selected source text from arXiv abstract and metadata:

- Title: "Optimizing the Interface Between Knowledge Graphs and LLMs for Complex Reasoning"
- Authors: Vasilije Markovic, Lazar Obradovic, Laszlo Hajdu, Jovan Pavlovic
- arXiv identifier: 2505.24478
- arXiv primary class: cs.AI

Abstract excerpt:

"Graph-based Retrieval-Augmented Generation (RAG) systems have emerged as a promising approach for enabling Large Language Models (LLMs) to perform complex reasoning over structured and unstructured data."

"We introduce an automated hyperparameter optimization framework for tuning the interface between Knowledge Graphs (KGs) and LLMs in GraphRAG pipelines."

"Our results demonstrate that careful optimization of the KG-LLM interface can significantly improve performance on complex multi-hop reasoning tasks."
