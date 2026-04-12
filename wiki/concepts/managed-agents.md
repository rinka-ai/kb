---
id: concept-managed-agents
type: concept
title: Managed Agents
tags: [agents, infrastructure, sessions, sandboxes]
source_count: 11
---

# Managed Agents

## Summary

Managed agents are agent systems built around durable interfaces for state, execution, interruption, and orchestration so the implementation can change as models and harness techniques improve. The newer runtime and protocol additions make that architecture more concrete: durable workflows, resumable approvals, explicit run/thread boundaries, and stable external APIs matter as much as the model loop itself.

## Core Idea

- The brain should not be tightly coupled to a single execution environment.
- Session state should survive harness crashes and context-window limits.
- Run lifecycle should be explicit enough to pause, resume, stream, cancel, and inspect work.
- Execution environments and tools should be provisioned only when needed.
- Security improves when credentials are kept outside model-controlled sandboxes.
- Human approval should behave like a resumable runtime boundary, not an ad hoc prompt detour.

## Design Shape

- `thread` or `session`: durable append-only state and history
- `run`: one execution with status, streaming, and resume semantics
- `harness` or workflow engine: orchestration loop around the model
- `sandbox` or tool: execution environment for actions
- `store`: long-term memory and artifacts outside the hot path
- `approval gate`: operator checkpoint that can resume work without losing context

## Why It Matters

- prevents stale harness assumptions from becoming architectural constraints
- supports recovery and resumability
- clarifies concurrency, replay, and operator intervention behavior
- reduces unnecessary startup latency
- makes “many brains, many hands” architectures more natural
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
