---
id: concept-agent-protocols
type: concept
title: Agent Protocols
tags: [agents, protocols, tool-use, mcp, tools]
source_count: 11
summary: Agent protocols define the typed interaction layer around tools, approvals, threads, and runtime state so agent systems stay inspectable and portable.
canonical_for: [mcp, model context protocol, agent protocol]
review_status: reviewed
last_reviewed: 2026-04-18
review_due: 2026-05-18
confidence: "0.85"
---

# Agent Protocols

## Summary

Agent protocols are the governance and interface layer around agent action. They define what can be called, under what conditions, with what approval semantics, and how execution state should be represented across runs, threads, tools, and long-term stores. The stronger source set here makes a useful distinction explicit: skills say how to approach work, while protocols define the interaction structure, typed surfaces, and non-negotiable boundaries that must survive composition and runtime swaps. Goose adds practical evidence that these surfaces include not only tool schemas but also request identifiers, replayable event streams, extension metadata, and explicit inspection stages before execution. Recent work also sharpens a second distinction: invocation-centric protocols explain how agents call tools or communicate, while mutation-governance protocols additionally define how prompts, tools, memory, and other runtime resources can be versioned, updated, evaluated, and rolled back safely.

## Core Surfaces

- tool schemas with typed arguments, preconditions, side effects, and blocked targets
- permission tiers for always-allowed, approval-required, and never-allowed actions
- delegation rules for when work can be handed to other agents or runtimes
- runtime contracts for runs, threads, streams, cancellation, and memory stores
- request and event identities that let clients reconnect to in-flight work safely
- lifecycle hooks that enforce policy before and after tool execution
- resource lifecycle, version lineage, and rollback semantics when runtime components can change over time
- portability surfaces that let memory, tools, and approvals survive framework changes

## Why They Matter

- prevent capability from being confused with authorization
- make tool use more portable across models and harnesses
- reduce hidden prompt logic and implicit safety assumptions
- centralize enforcement so composed skills do not create governance gaps
- expose inspectable contracts for operators, developers, and external integrations
- give multi-harness systems a stable interaction layer instead of relying on prompt-only convention
- make self-repair and tool evolution inspectable instead of burying them in ad hoc reflection code

## Enforcement Patterns

- enforce risky boundaries in hooks or protocol surfaces, not only inside skills
- keep approval logic explicit and resumable rather than treating it as a prompt detour
- use schemas and metadata to support introspection, routing, and safer automation
- stack multiple pre-execution inspectors when needed so security, egress, repetition, and approvals do not collapse into one boolean check
- log protocol decisions so memory can learn which paths fail, stall, or require escalation

## Tensions

- portability vs platform-specific convenience
- automation vs approval fatigue
- expressive interfaces vs schema sprawl
- centralized policy enforcement vs local flexibility inside skills
- connectivity-first protocols vs mutation-governance protocols

## Source Notes

- [[2026-04-16-externalization-in-llm-agents-a-unified-review-of-memory-skills-protocols-and-harness-engineering]]
- [[2026-04-16-autogenesis-a-self-evolving-agent-protocol]]
- [[2026-04-16-the-anatomy-of-an-agent-harness]]
- [[2026-04-16-agentic-stack]]
- [[2026-04-16-ai-agent-stack-builders-guide-av1dlive]]
- [[2026-04-12-agent-protocol]]
- [[2026-04-10-model-context-protocol]]
- [[2026-03-25-claude-code-auto-mode]]
- [[2026-04-09-scaling-managed-agents-decoupling-the-brain-from-the-hands]]
- [[2025-11-24-introducing-advanced-tool-use-on-the-claude-developer-platform]]
- [[2026-04-17-goose]]
