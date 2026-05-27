---
id: article-2026-05-09-contextlattice
type: source
title: "ContextLattice"
path: raw/articles/github-repos/2026-05-09-contextlattice.md
author: sheawinkler
publisher: GitHub
url: https://github.com/sheawinkler/contextlattice
date_published:
date_added: 2026-05-09
tags: [agent-memory, context-engineering, retrieval, mcp, agent-harnesses, knowledge-bases, provenance]
status: processed
quality: high
summary: ContextLattice is a local-first memory and context orchestration system whose useful KB lessons center on explicit agent memory contracts, staged retrieval, context packs with grounding and citations, topic rollups, write-path hygiene, and retrieval lifecycle metadata.
related: [agent-memory, context-engineering, agent-harnesses, agent-tools]
---

# ContextLattice

## Source Metadata

- Path: raw/articles/github-repos/2026-05-09-contextlattice.md
- Author: sheawinkler
- Published: Unknown
- Publisher: GitHub
- URL: https://github.com/sheawinkler/contextlattice
- Inspected revision: `e9a4d0c` on 2026-05-09
- Code read: `README.md`, `AGENTS.md`, `docs/human_agent_instruction_playbook.md`, `services/gateway-go/**`, `services/orchestrator/app.py`, `services/orchestrator/tests/test_orchestrator_retrieval.py`, `crates/**`, and `proto/contextlattice_engine.proto`.
- Verification attempted: Rust crate tests passed with `cargo test --manifest-path crates/Cargo.toml`. Go tests could not run because `go` was not installed. Python tests could not run because `pytest` was not installed.
- License note: the README says Business Source License 1.1, but the checked-in `LICENSE` file contains Apache 2.0 text. Treat this as a reason to borrow ideas rather than source code unless the license ambiguity is resolved.

## TL;DR

ContextLattice is useful to this KB less as a drop-in system and more as an operational memory design case study. Its core move is to make agent memory a contract: agents should preflight, search scoped memory before work, request a bounded context pack for broad tasks, write checkpoints during execution, re-check recency before final output, and continue gracefully when retrieval is degraded. The repo is heavy and product-shaped, but its context pack, topic rollup, staged retrieval, grounding, citation, and write-policy patterns map well onto this markdown KB.

## Key Claims

- A durable memory system needs an agent-facing operating contract, not just a database.
- `AGENTS.md` defines a concrete loop: scoped `memory/search`, broader retry on empty or degraded results, `memory/context-pack` for broad work, checkpoint writes, final recency retrieval, neighbor recall, and continuation handling.
- Context packs are a better active-context handoff format than raw search dumps because they carry facts, numeric facts, citations, result rows, warnings, retrieval mode, and agent identity.
- Staged retrieval separates fast sources from slow sources, returns useful partial results early, and exposes pending or unavailable continuation sources.
- Topic rollups bridge raw event history and query-time retrieval by compiling topic paths, recent activity, unique files, raw refs, file partitions, numeric facts, and short inferences.
- Retrieval output should carry lifecycle state such as `ready`, `pending`, `degraded`, returned sources, pending sources, failed sources, timed-out sources, and next actions.
- Write-path policy matters: telemetry-like and low-value operational records should not pollute durable semantic retrieval lanes by default.
- Ranking benefits from explainable adjustments: source weights, source-quality multipliers, lexical overlap, numeric match or miss, lifecycle reuse/recency, code-context proximity, low-value suppression, and cross-source consensus.
- Retrieval quality should have eval fixtures, including recall@k, MRR, and numeric exactness for verbatim values.
- The implementation is broader than the core idea: Docker profiles, Go gateway, Python orchestrator, Rust crates, dashboard, many storage lanes, billing, installers, and operational scripts are not all necessary for a markdown KB.

## Important Details

- `README.md` frames ContextLattice as private-by-default memory and context orchestration with unified read/write contracts, durable fanout, staged retrieval, Go/Rust hot-path ownership, and local-first deployment.
- `AGENTS.md` is a strong memory contract document. It pins endpoint identity, preflight, read/write order, degraded-memory behavior, async continuation, task orchestration endpoints, and numeric-copy discipline.
- `services/gateway-go/memory_context_pack.go` builds context packs by forcing `include_grounding=true`, clipping facts and summaries, preserving numeric facts, rendering citations, and copying topic rollup raw refs into provenance rows.
- `services/gateway-go/main.go` implements staged retrieval: resolve sources, classify fast versus slow lanes, run fast sources first, decide whether slow fallback is needed, schedule async continuation, expose warnings, and include source summaries and retrieval debug metadata.
- `services/orchestrator/app.py` has an older and broader version of the same retrieval pipeline, including query expansion, auto-escalation, source quality snapshots, lifecycle observations, code-context adjustments, low-value suppression, pathway caching, fail-open continuation, and recall evaluation.
- `services/orchestrator/app.py` also constructs topic rollups from memory history. Each topic tracks event counts, recent counts, unique files, latest timestamp, summary snippets, numeric facts, children, and file partitions.
- `services/gateway-go/write_policy.go` normalizes write payloads across legacy and v1 endpoints, enforces required project/file/content fields, carries agent/session/tags metadata, and identifies telemetry-like writes from topic prefixes, file patterns, and markers.
- `services/gateway-go/metadata_contract.go` records coverage of agent id, session id, tags, and created-at fields so the memory contract can be monitored instead of only documented.
- `services/gateway-go/continuation_durable.go` persists deferred continuation jobs as JSON with source, reason, stream token, fingerprint, base request, headers, timestamps, attempts, and retry state.
- `services/orchestrator/tests/test_orchestrator_retrieval.py` is unusually informative: it tests grounded context packs, rollup raw refs, numeric exactness, lifecycle pending sources, low-value telemetry suppression, source quality, and topic rollup behavior.
- The Rust crates are currently small migration scaffolds: codec serialization/checksum, in-memory graph neighbors, and simple retrieval fusion/hybrid retrieval tests. They validate the direction but are not the most valuable part of the repo.

## Entities

- Repository: `sheawinkler/contextlattice`
- Core services: `gateway-go`, Python `orchestrator`, Rust `context_codec`, `context_engine`, `context_retrieval`
- Main APIs: `/memory/search`, `/memory/context-pack`, `/memory/write`, `/v1/retrieval/query`, `/v1/retrieval/query-with-grounding`, `/v1/memory/neighbors`, `/v1/agents/preflight`
- Retrieval lanes: `topic_rollups`, `qdrant`, `weaviate`, `postgres_pgvector`, `mindsdb`, `mongo_raw`, `letta`, `memory_bank`
- Concepts: context packs, staged retrieval, fail-open continuation, topic rollups, grounded facts, strict numeric copy, retrieval lifecycle, telemetry isolation, source-quality multipliers, recall evaluation

## My Notes

- The most portable lesson is that memory needs a read/write/use protocol. A memory store without an agent operating loop is just another backend.
- The KB should not copy the product stack. The better adaptation is a markdown-native version: source notes as raw provenance, concept pages as topic rollups, `kb_build_context` as context pack builder, `kb:search-report` as retrieval telemetry, and lint/eval as quality gates.
- ContextLattice's context pack shape is a useful upgrade target for this KB because it separates facts, numeric facts, citations, rendered result rows, warnings, and retrieval debug.
- Topic rollups are especially relevant: they preserve provenance while making a large note corpus navigable by topic path, recency, unique file count, and representative raw refs.
- The repo reinforces the earlier memory-architecture lesson: the practical win is not "vector database vs graph database." It is disciplined load policy, write policy, provenance, staleness handling, and retrieval feedback loops.
- The license inconsistency is a caution flag for direct code reuse, but it does not weaken the architectural lessons.

## Open Questions

- Should this KB add a first-class `kb:context-pack` JSON output with `facts`, `numericFacts`, `citations`, `warnings`, `result_state`, and `source_summary` fields?
- Should concept pages or index pages include generated topic-rollup metadata such as source count, recent source count, raw refs, and unresolved tensions?
- Can `kb:search-report` drive retrieval eval fixtures automatically, especially for repeated zero-result and low-confidence queries?
- Should telemetry or operational notes get a separate retrieval lane so they can inform maintenance without polluting conceptual synthesis?
- What is the smallest useful lifecycle model for KB retrieval: `ready`, `empty`, `degraded`, and `needs-broader-query`, or a richer pending/continuation state?

## Related

- [[agent-memory]]
- [[context-engineering]]
- [[agent-harnesses]]
- [[agent-tools]]
- [[2026-05-09-contextlattice-memory-context-orchestration-source-teardown]]

## Source Text

Selected source text and code anchors inspected:

- `README.md`: ContextLattice describes itself as "Private-by-default memory and context orchestration for AI agents."
- `README.md`: the listed responsibilities include unified memory contracts, durable fanout, staged retrieval, Go/Rust hot-path ownership, and local-first deployment.
- `AGENTS.md`: the required loop is search before inference, broader search on empty/degraded scoped retrieval, context pack for broad tasks, checkpoint writes, final recency retrieval, graph-neighbor recall, async continuation handling, and strict numeric copying.
- `services/gateway-go/memory_context_pack.go`: `buildContextPackResponse` forces grounding and renders a compact context pack with facts, numeric facts, citations, result rows, warnings, retrieval mode, retrieval intent, and agent id.
- `services/gateway-go/main.go`: `executeRetrieval` classifies sources into fast and slow lanes, runs fast sources first, may defer slow sources asynchronously, and returns lifecycle/source summaries with continuation metadata.
- `services/orchestrator/app.py`: `_merge_federated_rows` combines source weights, quality multipliers, lexical and numeric adjustments, lifecycle reuse/recency, code-context adjustments, low-value suppression, and consensus boosts.
- `services/orchestrator/app.py`: topic rollup helpers build topic-level search rows with event counts, recent counts, unique file counts, raw refs, file partitions, latest timestamps, numeric facts, and short summaries.
- `services/gateway-go/write_policy.go`: write policy requires project, file, and content; normalizes metadata; and routes telemetry-like writes away from general fanout.
- `services/orchestrator/tests/test_orchestrator_retrieval.py`: tests assert grounded context packs preserve strict numeric copy, citations, rollup raw refs, and topic-rollup partition references.
