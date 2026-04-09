---
id: article-2025-09-11-writing-tools-for-agents
type: source
title: "Writing effective tools for agents — with agents"
path: raw/articles/anthropic-engineering/2025-09-11-writing-effective-tools-for-agents-with-agents.md
author: Anthropic
publisher: Anthropic
url: https://www.anthropic.com/engineering/writing-tools-for-agents
date_published: 2025-09-11
date_added: 2026-04-09
tags: [tool-use, mcp, evaluations, claude-code]
status: processed
quality: high
summary: Anthropic explains how to design, test, and optimize tools for non-deterministic agents, including the use of Claude itself to evaluate and improve tool ergonomics and performance.
related: [tool-use, mcp, claude-code, ai-agent-evals]
---

# Writing effective tools for agents — with agents

## Source Metadata

- Path: raw/articles/anthropic-engineering/2025-09-11-writing-effective-tools-for-agents-with-agents.md
- Author: Anthropic
- Published: 2025-09-11
- Publisher: Anthropic
- URL: https://www.anthropic.com/engineering/writing-tools-for-agents

## TL;DR

The post treats tools as interfaces for non-deterministic systems, which means they need different design habits than normal APIs. Anthropic recommends building evals around tools and even using agents to optimize their own tool layer.

## Key Claims

- Tools for agents should be designed differently from APIs for human developers.
- Tool quality should be measured with explicit evaluations, not intuition alone.
- Claude Code can help optimize tools against those evaluations.

## Important Details

- The post covers tool selection, namespacing, context returned from tools, token efficiency, and tool descriptions.
- Anthropic frames tool ergonomics as both a performance and a clarity problem.
- MCP is a major motivating context.

## Entities

- Concepts: tool ergonomics, namespacing, tool evaluations, token-efficient responses
- Systems: Claude Code, MCP

## My Notes

- This is one of the most actionable posts in the collection for builders.

## Open Questions

- Which tool-design heuristics should become hard rules in our own agent tooling?

## Related

- [[tool-use]]
- [[mcp]]
- [[ai-agent-evals]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
