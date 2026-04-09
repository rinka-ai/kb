---
id: article-2024-12-19-building-effective-agents
type: source
title: "Building effective agents"
path: raw/articles/anthropic-engineering/2024-12-19-building-effective-agents.md
author: Anthropic
publisher: Anthropic
url: https://www.anthropic.com/engineering/building-effective-agents
date_published: 2024-12-19
date_added: 2026-04-09
tags: [agents, workflows, scaffolding, design-patterns]
status: processed
quality: high
summary: Anthropic argues that effective agent systems usually come from simple composable patterns rather than heavy frameworks, and carefully distinguishes workflow-style orchestration from more autonomous agents.
related: [agents, workflows, scaffolding, context-engineering]
---

# Building effective agents

## Source Metadata

- Path: raw/articles/anthropic-engineering/2024-12-19-building-effective-agents.md
- Author: Anthropic
- Published: 2024-12-19
- Publisher: Anthropic
- URL: https://www.anthropic.com/engineering/building-effective-agents

## TL;DR

This is one of Anthropic's foundational agent design essays: start simple, distinguish workflows from agents, and only add complexity when the task really demands it.

## Key Claims

- Many successful agent systems rely on simple composable patterns.
- Workflows and agents are different architectures with different tradeoffs.
- Complexity should be earned by task requirements, not added by default.

## Important Details

- Anthropic separates predefined workflow code paths from model-directed agents.
- The post is explicitly cautious about cost and latency tradeoffs.
- Frameworks are treated as helpful but potentially obscuring abstractions.

## Entities

- Concepts: workflows, agents, composability, abstraction cost

## My Notes

- This is a strong canonical source for "simple systems first" in agent design.

## Open Questions

- Which parts of our own KB tooling should remain workflow-like rather than agentic?

## Related

- [[agents]]
- [[workflows]]
- [[context-engineering]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
