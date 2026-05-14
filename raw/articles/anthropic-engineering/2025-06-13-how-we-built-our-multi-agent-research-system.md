---
id: article-2025-06-13-multi-agent-research-system
type: source
title: "How we built our multi-agent research system"
path: raw/articles/anthropic-engineering/2025-06-13-how-we-built-our-multi-agent-research-system.md
author: Anthropic
publisher: Anthropic
url: https://www.anthropic.com/engineering/multi-agent-research-system
date_published: 2025-06-13
date_added: 2026-04-09
tags: [multi-agent, research-agents, parallel-agents, search]
status: processed
quality: high
summary: Anthropic explains how its Research feature uses a lead agent plus parallel subagents to improve breadth-first exploration, compression, and answer quality on complex open-ended research tasks.
related: [multi-agent, research-agents, parallel-agents, tool-use]
---

# How we built our multi-agent research system

## Source Metadata

- Path: raw/articles/anthropic-engineering/2025-06-13-how-we-built-our-multi-agent-research-system.md
- Author: Anthropic
- Published: 2025-06-13
- Publisher: Anthropic
- URL: https://www.anthropic.com/engineering/multi-agent-research-system

## TL;DR

Anthropic argues that research is naturally multi-agent because open-ended questions benefit from parallel exploration, context separation, and later synthesis.

## Key Claims

- Multi-agent systems are especially useful for breadth-first research tasks.
- Subagents help by compressing findings from separate context windows.
- Coordination, reliability, and evaluation are major engineering challenges in multi-agent systems.

## Important Details

- Anthropic uses a lead planning agent plus parallel search subagents.
- The post highlights compression and separation of concerns as key benefits.
- Anthropic reports a strong gain over a single-agent baseline on internal research evals.

## Entities

- Concepts: lead agent, subagents, compression, breadth-first search
- Product feature: Research

## My Notes

- This is directly relevant to the kind of KB-assisted research workflow you want to build.

## Open Questions

- When is multi-agent decomposition worth the overhead in research systems?

## Related

- [[multi-agent-systems]]
- [[research-workflows]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
