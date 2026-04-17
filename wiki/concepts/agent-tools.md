---
id: concept-agent-tools
type: concept
title: Agent Tools
tags: [tools, tool-use, agents, code-execution, mcp]
source_count: 10
summary: Agent tools are structured action surfaces for non-deterministic systems, so they need clearer schemas, tighter ergonomics, and better orchestration boundaries than APIs built only for humans.
canonical_for: [agent tools, tool use, structured tools, code-mediated tool use]
review_status: reviewed
last_reviewed: 2026-04-17
review_due: 2026-05-17
confidence: "0.86"
---

# Agent Tools

## Summary

Agent tools are structured action surfaces for non-deterministic systems, so they need clearer schemas, tighter ergonomics, and better orchestration boundaries than APIs built only for humans. The current sources draw two especially useful distinctions: client-side versus server-side tools, and direct tool calling versus code-mediated orchestration when tool ecosystems grow large. The Browserbase-style pattern sharpens this further: the model-facing surface can stay surprisingly small when typed service packages, broker layers, or runtime helpers absorb integration sprawl behind the scenes.

## Design Principles

- make schemas explicit, narrow, and semantically meaningful
- optimize descriptions and parameters for model reliability, not only human developer taste
- keep high-risk or multi-step business logic behind durable workflow layers instead of giant tool handlers
- prefer code-mediated loops when the agent needs iteration, filtering, or orchestration across many tools
- keep the model-facing tool surface as small as possible; hide integration sprawl behind typed internal packages, brokers, or exec helpers when policy and preprocessing must stay centralized

## Tool Families

- client tools that manipulate local UI or application state
- server tools that fetch data or trigger external side effects
- MCP tools that standardize access to external context and capabilities
- programmatic tool orchestration where code becomes the control plane for large tool sets
- brokered gateway tools that front many richer integrations while exposing one controlled model-facing capability

## Failure Modes

- giant tool menus with no discovery or routing support
- vague parameter semantics that collapse under spoken, messy, or partial inputs
- embedding business logic directly into fragile tool handlers
- assuming human-friendly APIs are automatically agent-friendly

## Source Notes

- [[2025-09-11-writing-effective-tools-for-agents-with-agents]]
- [[2025-11-04-code-execution-with-mcp-building-more-efficient-agents]]
- [[2025-11-24-introducing-advanced-tool-use-on-the-claude-developer-platform]]
- [[2026-04-12-durable-mcp-weather-server]]
- [[2026-04-12-tools]]
- [[2026-04-12-client-tools]]
- [[2026-04-12-server-tools]]
- [[2026-04-16-the-anatomy-of-an-agent-harness]]
- [[2026-04-17-browserbase-functions]]
- [[2026-04-17-browserbase-bb-internal-agent-full-architecture-synthesis]]
