---
id: article-2025-09-29-effective-context-engineering
type: source
title: "Effective context engineering for AI agents"
author: Anthropic
publisher: Anthropic
url: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
date_published: 2025-09-29
date_added: 2026-04-09
tags: [context-engineering, agents, long-context, mcp]
status: processed
quality: high
summary: Anthropic reframes prompt engineering as the narrower predecessor of context engineering, arguing that capable agents require active curation of tools, history, external data, and evolving state across turns.
related: [context-engineering, long-context, context-rot, mcp]
---

# Effective context engineering for AI agents

## Source Metadata

- Author: Anthropic
- Published: 2025-09-29
- Publisher: Anthropic
- URL: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents

## TL;DR

Context engineering is presented here as the broader discipline of selecting and maintaining the right tokens around an agent, not just writing a better prompt.

## Key Claims

- Prompt engineering is too narrow for long-running agents.
- Context is a finite resource that must be curated across turns.
- Tools, history, MCP, and external data all belong in the context-engineering problem.

## Important Details

- Anthropic explicitly contrasts prompt engineering with context engineering.
- The post ties context engineering to steerability and reliable agent behavior.
- Context rot is used as a key motivation for more disciplined curation.

## Entities

- Concepts: context engineering, prompt engineering, context rot, steerability
- Protocols: MCP

## My Notes

- This is one of the canonical references for the term in the product-engineering sense.

## Open Questions

- What explicit context-engineering layers should our own KB expose?

## Related

- [[context-engineering]]
- [[context-rot]]
- [[mcp]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
