---
id: concept-agent-harnesses
type: concept
title: Agent Harnesses
tags: [agents, harnesses, infrastructure, orchestration, tools, code-execution, scaffolding]
source_count: 33
summary: Agent harnesses are the non-model execution layer that assembles context, runs tools, enforces policy, brokers credentials, persists artifacts, attributes failures, and turns agent loops into deployable AI systems.
canonical_for: [agent harnesses, orchestration layer, agent tooling]
review_status: reviewed
last_reviewed: 2026-06-12
review_due: 2026-07-12
confidence: "0.90"
---

# Agent Harnesses

## Summary

Agent harnesses are the orchestration layer around the model loop: they assemble context, run tools, manage resets and handoffs, enforce approval boundaries, broker credentials, and persist artifacts. The ML systems textbook layer adds that a harness is also deployment infrastructure: it must handle lifecycle, latency, throughput, monitoring, rollback, governance, and return on compute when an agent becomes a production system. The newer source set sharpens three linked ideas: a harness is everything around the model that makes it useful, durable value should usually live in external memory/skills/protocols rather than inside the loop, and harness ownership increasingly determines memory ownership and portability. The resolver pattern adds a practical corollary: thin harnesses stay effective when routing tables tell them what to load instead of forcing every rule into the always-on prompt. Goose adds a strong implementation example of this layering in practice: provider abstraction, unified extension loading, session persistence, inspection hooks, and multiple product surfaces can still share one core harness. Hermes extends that example into a personal-agent operating environment: CLI, messaging gateway, ACP editor mode, cron, API, batch runner, memory, skills, provider routing, terminal backends, browser/computer-use, and trajectory generation all route through one runtime. MemWal adds the external-memory integration case: a harness can auto-recall before prompt assembly and auto-capture after turns while still delegating durable storage, encryption, restore, and ownership to a separate memory control plane. Flue adds the compact TypeScript sandbox-agent version: a small `init/session/prompt/skill/task/shell` API can be very ergonomic, but context discovery, request validation, observability, and run durability must become explicit contracts for the harness to stay portable across sandbox targets. The Claude Code design-space paper adds the clearest production case study so far: model judgment can remain flexible when a deterministic harness owns permissioning, context management, extensibility, delegation boundaries, and append-oriented state. Steward adds the custody-control-plane case: when agents can spend money or call paid APIs, the harness should route those actions through vaults, policy engines, approval queues, proxy gateways, and audit logs rather than handing the runtime raw keys. iii adds the backend-convergence version of the same idea: when functions, triggers, and workers are the shared substrate, the agent harness and backend infrastructure become one execution plane rather than two systems glued together. AHE adds the empirical self-evolution pattern: harness components become file-level, evidence-backed, revertible artifacts whose edits are paired with explicit predictions and checked against the next evaluation round. The LIFE survey broadens that idea to agent teams: the harness needs trace structure that can attribute failures across roles, messages, tools, topology, and repair attempts. The agentic-search paper adds the retrieval version of the same claim: changing harnesses or tool-result delivery can move accuracy as much as changing the retriever, so "retrieval" in agents is retrieval-plus-orchestration rather than an isolated module. Verifiable-skills work adds the security version of that artifact view: the harness should load skills through a manifest, verification, capability-gate, HITL, and audit-log path rather than trusting skill text because it came from a known origin. ContextLattice adds the memory-gateway version: the harness should define when agents preflight, retrieve, write checkpoints, disclose degraded memory, and re-check recency. Cognee adds the memory-control-plane version: a harness can store skills, skill runs, memory entries, traces, feedback, retrieval settings, and improvement proposals in one graph-backed substrate while preserving explicit routing and apply boundaries. Learn Harness Engineering adds the curriculum-grade operating model: coding-agent reliability can be decomposed into instructions, state, verification, scope, and lifecycle artifacts, then tested through weak-versus-strong project harnesses. The Dynamic Workflows digest adds the per-task generated-harness version: Claude can write a workflow script that fans out subagents, routes model effort, verifies results, and loops until a coded stop condition is met. Wang's vertical-agent article adds the domain-tooling version: the harness should own compressed read wrappers, consequence-reporting write diffs, deferred spec/tool caches, and raw-reference escape hatches because those runtime surfaces determine agent accuracy. The durable-orchestration source adds a topology boundary: the harness should expose stable execution primitives so ReAct loops, planners, routers, and subagent crews can change without replacing the whole control plane.

## Core Responsibilities

- build the active context from durable artifacts and recent state
- separate instructions, state, verification, scope, and lifecycle so failures have distinct repair levers
- make lifecycle, latency, throughput, monitoring, rollback, and governance visible when the agent leaves prototype mode
- define the non-model scaffolding: prompts, tools, bundled infrastructure, orchestration, and hooks
- define context-loading semantics explicitly so project instructions, skills, roles, memory, and sandbox files do not disappear when the deployment target changes
- define how tool results enter the model loop, including when to inject results inline, write them to files, summarize them, or require explicit follow-up reads
- route tool calls and execution events through policy hooks
- separate model reasoning from enforcement so the model can choose actions while the runtime remains responsible for authority, safety, and auditability
- broker high-risk credentials, wallet signing, paid API calls, spend limits, and approval queues outside the model-controlled process
- unify built-in and external tool surfaces behind one extension runtime so the loop sees one capability plane
- route tasks to the right skill, memory surface, or filing rule through explicit registries or resolvers
- define the memory operating loop explicitly: preflight, scoped retrieval, broader fallback, context-pack loading, checkpoint writes, final recency checks, and degraded-mode reporting
- define external memory integration explicitly: when to auto-recall, when to auto-capture, how to namespace, how to filter injection, and how to handle restore or credential failures
- define memory maintenance stages explicitly: feedback weighting, session promotion, trace promotion, enrichment, global-summary updates, and session-cache sync
- present the same core runtime through multiple entrypoint adapters such as chat, webhook, and UI surfaces without forking orchestration semantics
- present the same runtime through terminal, messaging, editor, scheduler, API, library, and batch surfaces while keeping permissions, memory, and session semantics coherent
- unify agent and backend execution primitives when agents, services, queues, schedulers, sandboxes, and browser workers can all register the same callable units
- manage resets, resumptions, handoffs, and structured logs
- make initialization, clean handoff, and restartability explicit parts of the agent lifecycle
- manage active run lifecycle controls such as status, cancellation, scheduling, event waits, and inspection
- expose steps, event waits, retries, cancellation, scheduling, and traces as durable primitives when agents run in the background
- expose prompts, tools, middleware, skills, sub-agents, and memory as inspectable components when the harness itself is meant to improve over time
- expose model-written workflow scripts, subagent plans, intermediate outputs, verification stages, and stop conditions when orchestration is generated dynamically
- expose skill-run feedback and improvement proposals as first-class artifacts when memory evidence can amend procedural playbooks
- bind feature progress to behavior, verification commands, status, evidence, and dependencies rather than unstructured "mostly done" notes
- preserve cross-agent trace identities for roles, messages, handoffs, tool calls, and verification steps so failures can be attributed instead of merely observed
- verify and freeze loaded skills at bootstrap, then enforce declared capabilities through runtime gates rather than trusting prompt text to police itself
- keep the hot-path loop lightweight enough to swap models or runtimes without rewriting the whole system
- treat executable verification and clean-state evidence as the authority for completion, not the model's self-report
- support code-mediated tool orchestration when large tool loops should run outside active model context but still through a bounded tool RPC surface
- engineer high-frequency domain operations as compressed, consequence-reporting wrappers because those outputs are active context, not neutral API plumbing
- maintain deferred capability caches for curated specs and tool schemas so occasional abilities stay reachable without bloating every prompt
- expose a complete raw-reference path plus search skill for long-tail capabilities when wrappers and curated specs are insufficient
- persist outputs into files, stores, or thread surfaces instead of letting them die inside the loop

## Thin Conductor Pattern

- the harness should orchestrate, not secretly own the system's intelligence
- domain knowledge belongs in memory, skills, and protocols
- context assembly is the most important harness function because it decides what the model can reason over
- context assembly should reflect the task distribution: L1 hot-path wrappers, L2 fetched specs, and L3 raw references are harness placement decisions as much as prompt-writing decisions
- structured handoff artifacts matter more when resets are common or desirable
- open or portable harnesses matter because they preserve control over long-term memory and reduce lock-in
- resolver tables let thin harnesses load the right context on demand instead of preloading whole skill libraries
- multiple clients such as CLI, desktop, and server can remain coherent if they reuse one runtime instead of forking orchestration semantics
- permissions and session identity should usually be attached by the entrypoint adapter, not improvised inside the always-on prompt
- the right harness boundary depends on deployment context: CLI coding agents, hosted managed agents, and persistent personal-assistant gateways should not all inherit the same trust and memory model
- the thin-versus-thick harness debate can become a composition choice when runtime capabilities are registered functions and triggers instead of a separate agent layer
- self-evolving harnesses need observability at three levels: component surfaces, trajectory evidence, and decision ledgers that make each edit falsifiable
- memory and skills can share a world-model substrate, but the harness still needs typed boundaries for facts, procedures, routing decisions, and irreversible mutations
- user-owned memory services can reduce runtime lock-in, but only if the harness preserves scope, revocation, and write-review semantics instead of treating the memory provider as a magical context bucket

## Common Failure Modes

- putting too much logic into the harness and coupling everything to one runtime
- making a current agent topology load-bearing so every pattern shift becomes a rewrite
- letting the context budget bloat before reasoning starts
- treating session history as if it were already the right active context
- hiding governance logic inside prompt text instead of enforceable runtime layers
- treating `.env` wallet keys and API keys as acceptable agent infrastructure instead of moving them behind vault/proxy boundaries
- keeping no durable artifacts for resets, resumes, or postmortems
- treating a prompt file as if it were the whole harness
- letting generated workflow breadth hide cost, permissions, or audit gaps
- splitting agent retries, queue retries, HTTP timeouts, and tracing across separate control planes so failures are hard to correlate
- outsourcing memory ownership to a closed harness and discovering too late that portability is gone
- adding autonomy without adding observability, evaluation hooks, or governance surfaces for silent failures
- letting self-improvement optimize intended fixes while missing regressions caused by interactions among prompt, memory, tool, and middleware changes
- allowing signatures, registries, or clearance checks to stand in for behavioral verification of runtime-loaded skills
- letting feature state live in chat history, where fresh sessions must rediscover scope and completed work
- returning retrieved context without lifecycle state, source summaries, or warnings, leaving the model to guess whether memory is complete, partial, stale, or degraded
- auto-capturing every turn into long-term memory without deduplication, sensitivity filtering, injection checks, or user review
- evaluating a retriever outside the harness and assuming the result will transfer unchanged to provider CLIs, file-backed workflows, or different stdout/chunking conventions
- treating sandbox snapshots as a substitute for semantic execution state, leaving no clear record of completed steps or replay-safe side effects
- treating a terminal-backend sandbox as whole-process isolation when plugins, skills, MCP subprocesses, code execution, and hooks still run inside or alongside the agent process
- treating a successful local demo as a deployed ML system without monitoring, drift handling, resource budgeting, or failure recovery
- treating a raw API dump as sufficient long-tail support without wrappers, specs, search skills, or consequence-reporting feedback loops
- recording only aggregate multi-agent outcomes, leaving no way to distinguish root causes from downstream symptoms during repair
- letting a shared memory/skill substrate silently rewrite procedures without proposal review, score thresholds, or rollback evidence

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
- [[2026-05-18-machine-learning-systems-vol1]]
- [[2026-05-18-machine-learning-systems-vol2]]
- [[2026-05-14-beyond-individual-intelligence-multi-agent-life-survey]]
- [[2026-05-17-memory-skills-same-harness-tricalt]]
- [[2026-05-18-cognee]]
- [[2025-05-30-optimizing-interface-knowledge-graphs-llms-complex-reasoning]]
- [[2026-05-20-steward]]
- [[2026-05-20-hermes-agent]]
- [[2026-05-20-memwal]]
- [[2026-06-04-walkinglabs-learn-harness-engineering]]
- [[2026-06-03-dynamic-workflows-claude-code-ingest]]
- [[2026-06-11-building-good-vertical-agent]]
