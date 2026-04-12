---
id: article-2026-04-12-durable-mcp-weather-server
type: source
title: "Durable MCP Weather Server"
path: raw/articles/official-docs/2026-04-12-durable-mcp-weather-server.md
author: Temporal
publisher: Temporal Docs
url: https://docs.temporal.io/ai-cookbook/hello-world-durable-mcp-server
date_published:
date_added: 2026-04-12
tags: [mcp, durable-execution, workflows, tool-use]
status: processed
quality: high
summary: Temporal's durable MCP server example shows how to keep MCP tools thin while moving multi-step business logic, retries, and external API calls into durable workflows and activities.
related: [mcp, durable-execution, workflows, tool-use]
---

# Durable MCP Weather Server

## Source Metadata

- Path: raw/articles/official-docs/2026-04-12-durable-mcp-weather-server.md
- Author: Temporal
- Published: Unknown
- Publisher: Temporal Docs
- URL: https://docs.temporal.io/ai-cookbook/hello-world-durable-mcp-server

## TL;DR

This example treats MCP tools as thin entrypoints that start durable workflows, pushing the real multi-step logic and external I/O into a runtime built for retries, crash recovery, and completion guarantees.

## Key Claims

- MCP tools should stay thin when they front multi-step operations with meaningful failure and retry semantics.
- Durable workflows are a natural place to hold business logic behind MCP tool calls.
- External API calls should live in retryable activity boundaries rather than inside the tool wrapper itself.
- Separating MCP transport from workflow execution improves reliability without changing the tool surface seen by the model.

## Important Details

- The example uses FastMCP to expose tools and Temporal Workflows to execute the underlying business logic.
- The `get_forecast` tool is implemented as a multi-step workflow that first resolves a forecast endpoint and then fetches detailed forecast data.
- The docs explicitly recommend keeping external network calls inside Temporal Activities so they inherit retries and clearer failure handling.
- The design split is clear: MCP server for tool exposure, workflow for orchestration, activities for side effects, worker for execution.
- The example uses stable workflow IDs and a task queue, reinforcing the idea that tool invocation and durable execution are distinct layers.

## Entities

- Organization: Temporal
- Systems: FastMCP, Temporal Workflows, Temporal Activities, Worker
- Concepts: thin tools, durable MCP, retries, workflow orchestration, activity boundaries

## My Notes

- This is one of the most directly useful implementation references for Mari because it mirrors the repo's own separation between tool surface and durable business logic.
- If Mari ever grows more MCP-shaped or more asynchronous tool flows, this note should be easy to reach.

## Open Questions

- Which Mari tools are still simple enough to stay inline, and which would benefit from a more explicitly durable workflow boundary?
- How much of Temporal's workflow/activity split should be treated as a general agent pattern versus a framework-specific idiom?

## Related

- [[managed-agents]]
- [[llm-agents]]
- [[mcp]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
