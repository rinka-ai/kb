---
id: concept-managed-agents
type: concept
title: Managed Agents
tags: [agents, infrastructure, sessions, sandboxes]
source_count: 5
---

# Managed Agents

## Summary

Managed agents are agent systems built around durable interfaces for state, execution, and orchestration so the implementation can change as models and harness techniques improve. The newer Manus and MCP additions strengthen this picture by adding two practical concerns: long-loop context discipline and stable protocol surfaces for tool ecosystems.

## Core Idea

- The brain should not be tightly coupled to a single execution environment.
- Session state should survive harness crashes and context-window limits.
- Execution environments and tools should be provisioned only when needed.
- Security improves when credentials are kept outside model-controlled sandboxes.

## Design Shape

- `session`: durable append-only event log
- `harness`: orchestration loop around the model
- `sandbox` or tool: execution environment for actions

## Why It Matters

- prevents stale harness assumptions from becoming architectural constraints
- supports recovery and resumability
- reduces unnecessary startup latency
- makes “many brains, many hands” architectures more natural

## Tensions

- general interfaces vs task-specific optimization
- durable recoverability vs minimal overhead
- externalized state vs model-local working context
- rich tool ecosystems vs context and selection overhead

## Source Notes

- [[2026-04-09-scaling-managed-agents-decoupling-the-brain-from-the-hands]]
- [[2026-04-09-context-engineering-sessions-memory]]
- [[2026-04-09-agentic-file-system]]
- [[2025-07-18-context-engineering-for-ai-agents-lessons-from-building-manus]]
- [[2026-04-10-model-context-protocol]]
