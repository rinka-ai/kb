---
id: concept-agent-harnesses
type: concept
title: Agent Harnesses
tags: [agents, harnesses, infrastructure, orchestration, tools, code-execution, scaffolding]
source_count: 11
summary: Agent harnesses are the non-model execution layer that assembles context, runs tools, enforces policy, and persists artifacts around the model loop.
canonical_for: [agent harnesses, orchestration layer, agent tooling]
review_status: reviewed
last_reviewed: 2026-04-16
review_due: 2026-05-16
confidence: "0.86"
---

# Agent Harnesses

## Summary

Agent harnesses are the orchestration layer around the model loop: they assemble context, run tools, manage resets and handoffs, enforce approval boundaries, and persist artifacts. The newer source set sharpens three linked ideas: a harness is everything around the model that makes it useful, durable value should usually live in external memory/skills/protocols rather than inside the loop, and harness ownership increasingly determines memory ownership and portability. The resolver pattern adds a practical corollary: thin harnesses stay effective when routing tables tell them what to load instead of forcing every rule into the always-on prompt.

## Core Responsibilities

- build the active context from durable artifacts and recent state
- define the non-model scaffolding: prompts, tools, bundled infrastructure, orchestration, and hooks
- route tool calls and execution events through policy hooks
- route tasks to the right skill, memory surface, or filing rule through explicit registries or resolvers
- manage resets, resumptions, handoffs, and structured logs
- keep the hot-path loop lightweight enough to swap models or runtimes without rewriting the whole system
- persist outputs into files, stores, or thread surfaces instead of letting them die inside the loop

## Thin Conductor Pattern

- the harness should orchestrate, not secretly own the system's intelligence
- domain knowledge belongs in memory, skills, and protocols
- context assembly is the most important harness function because it decides what the model can reason over
- structured handoff artifacts matter more when resets are common or desirable
- open or portable harnesses matter because they preserve control over long-term memory and reduce lock-in
- resolver tables let thin harnesses load the right context on demand instead of preloading whole skill libraries

## Common Failure Modes

- putting too much logic into the harness and coupling everything to one runtime
- letting the context budget bloat before reasoning starts
- treating session history as if it were already the right active context
- hiding governance logic inside prompt text instead of enforceable runtime layers
- keeping no durable artifacts for resets, resumes, or postmortems
- outsourcing memory ownership to a closed harness and discovering too late that portability is gone

## Source Notes

- [[2026-04-16-externalization-in-llm-agents-a-unified-review-of-memory-skills-protocols-and-harness-engineering]]
- [[2026-04-16-the-anatomy-of-an-agent-harness]]
- [[2026-04-16-your-harness-your-memory]]
- [[2026-04-16-agentic-stack]]
- [[2026-04-16-good-and-bad-harness-engineering]]
- [[2026-04-16-ai-agent-stack-builders-guide-av1dlive]]
- [[2026-03-24-harness-design-for-long-running-application-development]]
- [[2026-04-09-scaling-managed-agents-decoupling-the-brain-from-the-hands]]
- [[2026-04-09-context-engineering-sessions-memory]]
- [[2025-07-18-context-engineering-for-ai-agents-lessons-from-building-manus]]
- [[2026-04-16-resolvers-the-routing-table-for-intelligence]]
