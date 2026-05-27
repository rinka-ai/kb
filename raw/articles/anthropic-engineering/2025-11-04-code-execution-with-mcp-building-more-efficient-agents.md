---
id: article-2025-11-04-code-execution-with-mcp
type: source
title: "Code execution with MCP: Building more efficient agents"
path: raw/articles/anthropic-engineering/2025-11-04-code-execution-with-mcp-building-more-efficient-agents.md
author: Anthropic
publisher: Anthropic
url: https://www.anthropic.com/engineering/code-execution-with-mcp
date_published: 2025-11-04
date_added: 2026-04-09
tags: [mcp, code-execution, tool-use, efficiency]
status: processed
quality: high
summary: Anthropic argues that as MCP ecosystems grow, agents should increasingly write code to interact with tools instead of directly invoking every tool through the model context.
related: [mcp, tool-use, context-engineering, programmatic-tool-calling]
---

# Code execution with MCP: Building more efficient agents

## Source Metadata

- Path: raw/articles/anthropic-engineering/2025-11-04-code-execution-with-mcp-building-more-efficient-agents.md
- Author: Anthropic
- Published: 2025-11-04
- Publisher: Anthropic
- URL: https://www.anthropic.com/engineering/code-execution-with-mcp

## TL;DR

The post argues that direct tool calling does not scale well in large MCP ecosystems because tool definitions and intermediate results consume too much context. Code execution can act as a more efficient control layer.

## Key Claims

- Direct MCP tool use becomes expensive as tool counts grow.
- Code is often a better medium for loops, filtering, and orchestration than repeated inference steps.
- Programmatic access can reduce context load while improving efficiency.

## Important Details

- Anthropic frames MCP as the de facto standard for tool connectivity.
- The post highlights both tool-definition overhead and intermediate-result overhead.
- The core recommendation is to let agents write code that calls tools rather than expose every step to the model.

## Entities

- Protocol: MCP
- Concepts: code execution, tool-definition overhead, intermediate results, orchestration

## My Notes

- This is a foundational post for any KB section on scalable tool use.

## Open Questions

- When should agents switch from direct tool use to code-mediated tool use?

## Related

- [[agent-protocols]]
- [[agent-tools]]
- [[context-engineering]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
