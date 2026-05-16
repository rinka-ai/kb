---
id: concept-agent-harnesses
type: concept
title: Agent Harnesses
tags: [agents, harnesses, infrastructure, orchestration, tools, code-execution, scaffolding]
source_count: 22
summary: Agent harnesses are the non-model execution layer that assembles context, runs tools, enforces policy, and persists artifacts around the model loop.
canonical_for: [agent harnesses, orchestration layer, agent tooling]
review_status: reviewed
last_reviewed: 2026-05-16
review_due: 2026-06-16
confidence: "0.90"
---

# Agent Harnesses

## Summary

Agent harnesses are the orchestration layer around the model loop: they assemble context, run tools, manage resets and handoffs, enforce approval boundaries, and persist artifacts. The newer source set sharpens three linked ideas: a harness is everything around the model that makes it useful, durable value should usually live in external memory/skills/protocols rather than inside the loop, and harness ownership increasingly determines memory ownership and portability. The resolver pattern adds a practical corollary: thin harnesses stay effective when routing tables tell them what to load instead of forcing every rule into the always-on prompt. Goose adds a strong implementation example of this layering in practice: provider abstraction, unified extension loading, session persistence, inspection hooks, and multiple product surfaces can still share one core harness. Flue adds the compact TypeScript sandbox-agent version: a small `init/session/prompt/skill/task/shell` API can be very ergonomic, but context discovery, request validation, observability, and run durability must become explicit contracts for the harness to stay portable across sandbox targets. The Claude Code design-space paper adds the clearest production case study so far: model judgment can remain flexible when a deterministic harness owns permissioning, context management, extensibility, delegation boundaries, and append-oriented state. iii adds the backend-convergence version of the same idea: when functions, triggers, and workers are the shared substrate, the agent harness and backend infrastructure become one execution plane rather than two systems glued together. AHE adds the empirical self-evolution pattern: harness components become file-level, evidence-backed, revertible artifacts whose edits are paired with explicit predictions and checked against the next evaluation round. The LIFE survey broadens that idea to agent teams: the harness needs trace structure that can attribute failures across roles, messages, tools, topology, and repair attempts. The agentic-search paper adds the retrieval version of the same claim: changing harnesses or tool-result delivery can move accuracy as much as changing the retriever, so "retrieval" in agents is retrieval-plus-orchestration rather than an isolated module. Verifiable-skills work adds the security version of that artifact view: the harness should load skills through a manifest, verification, capability-gate, HITL, and audit-log path rather than trusting skill text because it came from a known origin. ContextLattice adds the memory-gateway version: the harness should define when agents preflight, retrieve, write checkpoints, disclose degraded memory, and re-check recency. The durable-orchestration source adds a topology boundary: the harness should expose stable execution primitives so ReAct loops, planners, routers, and subagent crews can change without replacing the whole control plane.

## Core Responsibilities

- build the active context from durable artifacts and recent state
- define the non-model scaffolding: prompts, tools, bundled infrastructure, orchestration, and hooks
- define context-loading semantics explicitly so project instructions, skills, roles, memory, and sandbox files do not disappear when the deployment target changes
- define how tool results enter the model loop, including when to inject results inline, write them to files, summarize them, or require explicit follow-up reads
- route tool calls and execution events through policy hooks
- separate model reasoning from enforcement so the model can choose actions while the runtime remains responsible for authority, safety, and auditability
- unify built-in and external tool surfaces behind one extension runtime so the loop sees one capability plane
- route tasks to the right skill, memory surface, or filing rule through explicit registries or resolvers
- define the memory operating loop explicitly: preflight, scoped retrieval, broader fallback, context-pack loading, checkpoint writes, final recency checks, and degraded-mode reporting
- present the same core runtime through multiple entrypoint adapters such as chat, webhook, and UI surfaces without forking orchestration semantics
- unify agent and backend execution primitives when agents, services, queues, schedulers, sandboxes, and browser workers can all register the same callable units
- manage resets, resumptions, handoffs, and structured logs
- manage active run lifecycle controls such as status, cancellation, scheduling, event waits, and inspection
- expose steps, event waits, retries, cancellation, scheduling, and traces as durable primitives when agents run in the background
- expose prompts, tools, middleware, skills, sub-agents, and memory as inspectable components when the harness itself is meant to improve over time
- preserve cross-agent trace identities for roles, messages, handoffs, tool calls, and verification steps so failures can be attributed instead of merely observed
- verify and freeze loaded skills at bootstrap, then enforce declared capabilities through runtime gates rather than trusting prompt text to police itself
- keep the hot-path loop lightweight enough to swap models or runtimes without rewriting the whole system
- persist outputs into files, stores, or thread surfaces instead of letting them die inside the loop

## Thin Conductor Pattern

- the harness should orchestrate, not secretly own the system's intelligence
- domain knowledge belongs in memory, skills, and protocols
- context assembly is the most important harness function because it decides what the model can reason over
- structured handoff artifacts matter more when resets are common or desirable
- open or portable harnesses matter because they preserve control over long-term memory and reduce lock-in
- resolver tables let thin harnesses load the right context on demand instead of preloading whole skill libraries
- multiple clients such as CLI, desktop, and server can remain coherent if they reuse one runtime instead of forking orchestration semantics
- permissions and session identity should usually be attached by the entrypoint adapter, not improvised inside the always-on prompt
- the right harness boundary depends on deployment context: CLI coding agents, hosted managed agents, and persistent personal-assistant gateways should not all inherit the same trust and memory model
- the thin-versus-thick harness debate can become a composition choice when runtime capabilities are registered functions and triggers instead of a separate agent layer
- self-evolving harnesses need observability at three levels: component surfaces, trajectory evidence, and decision ledgers that make each edit falsifiable

## Common Failure Modes

- putting too much logic into the harness and coupling everything to one runtime
- making a current agent topology load-bearing so every pattern shift becomes a rewrite
- letting the context budget bloat before reasoning starts
- treating session history as if it were already the right active context
- hiding governance logic inside prompt text instead of enforceable runtime layers
- keeping no durable artifacts for resets, resumes, or postmortems
- splitting agent retries, queue retries, HTTP timeouts, and tracing across separate control planes so failures are hard to correlate
- outsourcing memory ownership to a closed harness and discovering too late that portability is gone
- adding autonomy without adding observability, evaluation hooks, or governance surfaces for silent failures
- letting self-improvement optimize intended fixes while missing regressions caused by interactions among prompt, memory, tool, and middleware changes
- allowing signatures, registries, or clearance checks to stand in for behavioral verification of runtime-loaded skills
- returning retrieved context without lifecycle state, source summaries, or warnings, leaving the model to guess whether memory is complete, partial, stale, or degraded
- evaluating a retriever outside the harness and assuming the result will transfer unchanged to provider CLIs, file-backed workflows, or different stdout/chunking conventions
- treating sandbox snapshots as a substitute for semantic execution state, leaving no clear record of completed steps or replay-safe side effects
- recording only aggregate multi-agent outcomes, leaving no way to distinguish root causes from downstream symptoms during repair

## Source Notes

- [[2026-05-01-skills-as-verifiable-artifacts]]
- [[2026-04-14-dive-into-claude-code-the-design-space-of-todays-and-future-ai-agent-systems]]
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
- [[2026-04-17-goose]]
- [[2026-04-17-browserbase-bb-internal-agent-full-architecture-synthesis]]
- [[2026-04-28-iii]]
- [[2026-04-28-agentic-harness-engineering-observability-driven-automatic-evolution-of-coding-agent-harnesses]]
- [[2026-05-02-flue]]
- [[2026-05-09-contextlattice]]
- [[2026-05-09-durable-orchestration-agent-patterns-user-provided]]
- [[2026-05-14-is-grep-all-you-need-how-agent-harnesses-reshape-agentic-search]]
- [[2026-05-14-beyond-individual-intelligence-multi-agent-life-survey]]
