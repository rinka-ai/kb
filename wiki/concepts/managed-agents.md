---
id: concept-managed-agents
type: concept
title: Managed Agents
tags: [agents, infrastructure, sessions, sandboxes, architecture]
source_count: 14
summary: Managed agents decouple model reasoning from durable runtime interfaces for sessions, runs, approvals, tools, entrypoints, and state.
canonical_for: [managed agents, hosted agent runtimes, resumable approvals, decoupling the brain from the hands]
review_status: reviewed
last_reviewed: 2026-05-09
review_due: 2026-06-09
confidence: "0.87"
---

# Managed Agents

## Summary

Managed agents are agent systems built around durable interfaces for state, execution, interruption, and orchestration so the implementation can change as models and harness techniques improve. The newer runtime and protocol additions make that architecture more concrete: durable workflows, resumable approvals, explicit run/thread boundaries, stable external APIs, and reusable entrypoint adapters matter as much as the model loop itself.

## Core Idea

- The brain should not be tightly coupled to a single execution environment.
- Session state should survive harness crashes and context-window limits.
- Run lifecycle should be explicit enough to pause, resume, stream, cancel, and inspect work.
- Execution environments and tools should be provisioned only when needed.
- Security improves when credentials are kept outside model-controlled sandboxes.
- The same core agent logic should be able to sit behind chat threads, webhooks, or direct UI and API surfaces when session identity and scope are handled explicitly.
- Human approval should behave like a resumable runtime boundary, not an ad hoc prompt detour.

## Design Shape

- `thread` or `session`: durable append-only state and history
- `run`: one execution with status, streaming, and resume semantics
- `entrypoint adapter`: Slack thread, webhook, UI, or API surface that binds a request to session identity and scope
- `harness` or workflow engine: orchestration loop around the model
- `sandbox` or tool: execution environment for actions
- `credential broker`: the layer that holds real secrets and exposes only scoped capability handles to the runtime
- `store`: long-term memory and artifacts outside the hot path
- `approval gate`: operator checkpoint that can resume work without losing context

## Why It Matters

- prevents stale harness assumptions from becoming architectural constraints
- supports recovery and resumability
- clarifies concurrency, replay, and operator intervention behavior
- reduces unnecessary startup latency
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
