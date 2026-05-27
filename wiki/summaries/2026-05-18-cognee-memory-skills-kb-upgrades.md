---
id: summary-2026-05-18-cognee-memory-skills-kb-upgrades
type: summary
title: Cognee Memory-Skills KB Upgrades
tags: [agent-memory, agent-skills, cognee, rag, harnesses]
summary: The Cognee bundle reframes memory as a control plane spanning graph memory, session memory, retrieval routing, eval-driven tuning, feedback promotion, and proposal-first skill mutation.
source_count: 3
canonical_for: [cognee memory skills, skills as memory, memory skills same harness]
review_status: draft
last_reviewed: 2026-05-18
review_due: 2026-06-18
confidence: "0.78"
---

# Cognee Memory-Skills KB Upgrades

## Summary

The Cognee source bundle adds a useful correction to the KB's memory/skills taxonomy. The existing KB separates [[agent-memory]] from [[agent-skills]] to keep design surfaces clear. The new evidence says that separation should not hide the maintenance loop: skills are procedural memories, memory stores the run evidence that reveals when procedures are stale, retrieval quality depends on tuned interfaces, and the harness should expose a controlled path from observations to graph updates and skill-improvement proposals.

## What Changed

- The tweet [[2026-05-17-memory-skills-same-harness-tricalt]] contributes the thesis: memory, skills, agent files, compaction, and context assembly are all part of the harness's world model.
- The arXiv paper [[2025-05-30-optimizing-interface-knowledge-graphs-llms-complex-reasoning]] grounds the retrieval side: graph memory quality depends on evaluation and tuning of the KG-to-LLM interface, not just owning a graph. The tested knobs include chunk size, retriever type, top-k, QA prompts, graph prompts, and task preprocessing.
- The Cognee repo [[2026-05-18-cognee]] grounds the implementation side: `cognify` builds graph/vector/relational memory, `search` exposes a retriever taxonomy, `recall` routes across session/trace/graph state, `improve` promotes feedback and traces into graph memory, and agentic skill runs can produce `SkillImprovementProposal` nodes.

## Strongest Retained Claim

The durable pattern is not "memory and skills are identical." It is that production agents need one inspectable control plane where observations, procedural artifacts, retrieval choices, session traces, feedback, eval results, and improvement proposals can be evaluated together while retaining typed boundaries.

## Architecture Lessons

- Treat memory as lifecycle verbs, not only storage: remember, recall, forget, improve.
- Keep memory lanes separate even when they share infrastructure: graph facts, session QA, agent traces, feedback, skills, skill runs, and proposals have different trust and retrieval semantics.
- Route retrieval explicitly. Cognee's `SearchType` taxonomy is useful because chunk search, lexical search, graph completion, temporal search, agentic tool loops, and graph-summary completion answer different questions.
- Tie feedback to evidence actually used. Cognee updates graph weights through recorded `used_graph_element_ids`, which is a better pattern than global relevance nudges.
- Promote session state deliberately. Session Q&A and traces can become permanent graph memory, but that bridge belongs in an `improve` stage with locks, permissions, and tagging.
- Keep procedural mutation proposal-first. A low-scoring skill run should create a reviewable proposal with old procedure, proposed procedure, runs used, confidence, and rationale before anything changes.
- Add global summaries as a retrieval tier. Cognee's global context index resembles concept pages in this KB: it gives retrieval a compact map before local evidence lookup.

## Paper Lessons

- The paper's "Dreamify" loop treats the whole KG-RAG pipeline as the objective function.
- The reported experiments use 24 training and 12 held-out questions per benchmark, 50 trials per benchmark/metric pair, and benchmarks HotPotQA, TwoWikiMultiHop, and MuSiQue.
- The strongest practical lesson is not the absolute scores, but the sensitivity: chunking, prompts, retriever choice, top-k, and preprocessing shift results enough that default RAG settings are weak evidence.
- Metric choice matters. Exact match and F1 penalize answer style; LLM correctness graders reduce lexical brittleness but add judge variance.

## KB Upgrades To Steal

- Add a small query-eval fixture set for this KB: exact source lookup, numeric/date recall, concept synthesis, stale-source detection, and cross-source tension questions.
- Extend search telemetry from "bad query observed" toward "query had no result, wrong result, stale result, or right result in wrong lane."
- Treat concept pages as the KB's global context index and source notes as local evidence.
- Consider recording which source chunks support good answers so feedback can improve retrieval surfaces without rewriting the corpus.
- Keep skill-like workflows in markdown, but record run evidence and proposed edits separately before amending the canonical skill/instruction.

## Cautions

- The tweet is product-framed and should not be treated as independent empirical evidence.
- The arXiv paper supports Cognee's graph-retrieval/evaluation substrate more directly than the skill-memory unification claim.
- The repo check did not find the exact `SkillChangeEvent` symbol named in the tweet; current code is better described as graph-backed skill/run/proposal models with explicit apply semantics.
- Auto-improving skills need governance. A failed run should create a proposal, not silently rewrite the durable procedure.
- Comparative claims in `evals/README.md` need caution until raw results, environment parity, and repeated judge variance are inspected.

## Source Notes

- [[2026-05-17-memory-skills-same-harness-tricalt]]
- [[2025-05-30-optimizing-interface-knowledge-graphs-llms-complex-reasoning]]
- [[2026-05-18-cognee]]
