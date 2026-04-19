---
id: article-2026-04-16-autogenesis
type: source
title: "Autogenesis: A Self-Evolving Agent Protocol"
path: raw/articles/arxiv/2026-04-16-autogenesis-a-self-evolving-agent-protocol.md
author: Wentao Zhang
publisher: arXiv.org
url: https://arxiv.org/abs/2604.15034
date_published: 2026-04-16
date_added: 2026-04-18
tags: [agents, protocols, self-evolution, tool-use, memory, papers]
status: processed
quality: medium
summary: A protocol proposal for self-evolving agent systems that separates evolvable resources from the closed-loop operators that inspect, update, evaluate, and commit changes.
related: [agent-protocols, agent-harnesses, agent-tools, agent-memory, llm-agents]
---

# Autogenesis: A Self-Evolving Agent Protocol

## Source Metadata

- Path: raw/articles/arxiv/2026-04-16-autogenesis-a-self-evolving-agent-protocol.md
- Author: Wentao Zhang
- Published: 2026-04-16
- Publisher: arXiv.org
- URL: https://arxiv.org/abs/2604.15034

## TL;DR

Autogenesis argues that self-evolving agent systems need a protocol layer for controlled mutation, not only connectivity. Its two-layer design separates a resource substrate that models prompts, agents, tools, environments, and memory as versioned resources from a self-evolution layer that reflects, improves, evaluates, and commits updates with rollback and auditability.

## Key Claims

- Existing protocols such as MCP and A2A mainly standardize invocation and communication, but do not natively govern lifecycle management, version lineage, rollback, and controlled state mutation across heterogeneous agent resources.
- Self-evolving agents work better when the evolvable substrate is separated from the optimization logic that proposes and applies changes.
- Prompts, agents, tools, environments, and memory should be exposed as protocol-registered resources with explicit state, lifecycle operations, and versioned interfaces.
- Closed-loop self-improvement should be operatorized through stages such as reflect, select, improve, evaluate, and commit so updates remain auditable and reversible.
- A system built on this protocol can improve over static baselines across reasoning, tool-use, and coding benchmarks by evolving different resource types at inference time.

## Important Details

- The protocol is split into RSPL, which defines the evolvable resource substrate, and SEPL, which defines the closed-loop update interface.
- RSPL treats resources as passive objects that cannot self-modify directly; higher layers mediate all observation and mutation.
- The paper explicitly places native scripts, MCP tools, and agent skills inside the same tool-resource family, making them candidates for retrieval, refinement, and reuse through one registry.
- The experiments isolate different mutation targets by benchmark: prompt and solution refinement on GPQA and AIME, tool evolution on GAIA, and iterative solution refinement on LeetCode.
- The appendix includes a useful protocol comparison table contrasting Autogenesis with A2A and MCP on lifecycle operations, versioning and rollback, registry and retrieval, contract generation, and closed-loop evolution.

## Entities

- People: Wentao Zhang
- Concepts: self-evolving agents, protocol-registered resources, lifecycle management, version lineage, rollback, closed-loop optimization
- Systems: Autogenesis Protocol, AGP, RSPL, SEPL, Autogenesis System, AGS, MCP, A2A, GAIA, GPQA, AIME, LeetCode

## My Notes

- The most reusable contribution for this KB is the distinction between connectivity protocols and mutation-governance protocols.
- This complements the current `agent-protocols` concept page more than it replaces it, because the paper is about self-evolving systems specifically rather than general production agent APIs.
- The empirical section is broad enough to preserve, but the most durable value here is the vocabulary and framing, not the raw leaderboard claims.
- Because this is a fresh single-author arXiv preprint and I did not verify a public implementation alongside it, I would treat it as a strong design proposal rather than settled protocol canon.

## Open Questions

- Which parts of RSPL and SEPL would survive contact with production agent runtimes that already expose runs, threads, tools, and stores through their own protocols?
- How much of the reported improvement comes from the protocol abstraction itself versus the added reflection loops and benchmark-specific scaffolding?
- What guardrails would be needed to prevent unsafe or misleading self-modification when prompts, tools, and memory can all be mutated at runtime?

## Related

- [[agent-protocols]]
- [[agent-harnesses]]
- [[agent-tools]]
- [[agent-memory]]
- [[llm-agents]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
