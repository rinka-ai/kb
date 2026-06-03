---
id: concept-managed-agents
type: concept
title: Managed Agents
tags: [agents, infrastructure, sessions, sandboxes, architecture]
source_count: 17
summary: Managed agents decouple model reasoning from durable runtime interfaces for sessions, runs, approvals, tools, credentials, entrypoints, and state.
canonical_for: [managed agents, hosted agent runtimes, resumable approvals, decoupling the brain from the hands]
review_status: reviewed
last_reviewed: 2026-06-03
review_due: 2026-06-20
confidence: "0.87"
---

# Managed Agents

## Summary

Managed agents are agent systems built around durable interfaces for state, execution, interruption, credentials, and orchestration so the implementation can change as models and harness techniques improve. Anthropic's Managed Agents post makes the core shape explicit: session logs, harnesses, and sandboxes should be separable interfaces, with model-context management treated as a replaceable harness concern rather than the durable source of truth. The newer runtime and protocol additions make that architecture more concrete: durable workflows, resumable approvals, explicit run/thread boundaries, stable external APIs, brokered credentials, and reusable entrypoint adapters matter as much as the model loop itself. Hermes adds a personal-agent version: one runtime can sit behind terminal, messaging, editor, cron, API, library, and batch surfaces while sharing provider routing, memory, skills, sessions, tools, and delivery paths. MemWal adds the user-owned memory surface: managed agents should be able to use durable memory without trapping all state inside the runtime vendor's database.

## Core Idea

- The brain should not be tightly coupled to a single execution environment.
- Session state should survive harness crashes and context-window limits as a durable event log, not merely as whatever is currently inside model context.
- Run lifecycle should be explicit enough to pause, resume, stream, cancel, and inspect work.
- Execution environments and tools should be provisioned only when needed.
- Security improves when credentials are kept outside model-controlled sandboxes.
- Wallet custody and paid API credentials should be managed as platform capabilities with policies and logs, not as secrets copied into each agent process.
- The same core agent logic should be able to sit behind chat threads, webhooks, or direct UI and API surfaces when session identity and scope are handled explicitly.
- Human approval should behave like a resumable runtime boundary, not an ad hoc prompt detour.
- Provider credentials, fallback models, and credential pools should be runtime-managed surfaces rather than hard-coded into each entrypoint.
- Long-term memory should be portable across clients and agents when the user owns the account, delegate keys, and namespace policy.
- Meta-harness design is about being strict on interfaces around the model while leaving room for future harness implementations to change.

## Design Shape

- `thread` or `session`: durable append-only state and history
- `run`: one execution with status, streaming, and resume semantics
- `entrypoint adapter`: Slack thread, webhook, UI, or API surface that binds a request to session identity and scope
- `harness` or workflow engine: orchestration loop around the model
- `sandbox` or tool: execution environment for actions
- `credential broker`: the layer that holds real secrets and exposes only scoped capability handles to the runtime
- `wallet/signing broker`: the layer that holds private keys, evaluates policy envelopes, queues approvals, and records transaction evidence before value moves
- `store`: long-term memory and artifacts outside the hot path
- `approval gate`: operator checkpoint that can resume work without losing context
- `channel adapter`: terminal, messaging, editor, API, scheduler, or batch surface that binds work to the same underlying runtime contracts
- `memory capability`: scoped access to a durable store through delegate keys, namespaces, restore semantics, and retrieval/write policy
- `session query interface`: bounded reads over prior event slices so the harness can reconstruct relevant context without irreversible compaction being the only memory path

## Why It Matters

- prevents stale harness assumptions from becoming architectural constraints
- supports recovery and resumability
- clarifies concurrency, replay, and operator intervention behavior
- reduces unnecessary startup latency
- enables faster startup because execution environments can be provisioned lazily; Anthropic reports roughly 60% lower p50 TTFT and more than 90% lower p95 TTFT after decoupling brain and hands
- makes “many brains, many hands” architectures more natural
- lets the same agent runtime serve interactive and background modes without forking the whole system
- creates safer boundaries for tools and real-world side effects

## Tensions

- general interfaces vs task-specific optimization
- durable recoverability vs minimal overhead
- externalized state vs model-local working context
- rich tool ecosystems vs context and selection overhead
- framework convenience vs protocol-level portability

## Source Notes

- [[2026-04-09-scaling-managed-agents-decoupling-the-brain-from-the-hands]]
- [[2026-04-09-context-engineering-sessions-memory]]
- [[2026-04-09-agentic-file-system]]
- [[2025-07-18-context-engineering-for-ai-agents-lessons-from-building-manus]]
- [[2026-04-10-model-context-protocol]]
- [[2026-04-12-temporal-ai-cookbook]]
- [[2026-04-12-durable-mcp-weather-server]]
- [[2026-04-12-langgraph-durable-execution-persistence-and-human-in-the-loop]]
- [[2026-04-12-openai-agents-sdk-sessions-handoffs-and-human-in-the-loop]]
- [[2026-04-12-google-adk-runtime-event-loop-and-workflow-agents]]
- [[2026-04-12-agent-protocol]]
- [[2026-04-17-browserbase-enterprise-security]]
- [[2026-04-17-browserbase-functions]]
- [[2026-04-17-browserbase-bb-internal-agent-full-architecture-synthesis]]
- [[2026-05-20-steward]]
- [[2026-05-20-hermes-agent]]
- [[2026-05-20-memwal]]
