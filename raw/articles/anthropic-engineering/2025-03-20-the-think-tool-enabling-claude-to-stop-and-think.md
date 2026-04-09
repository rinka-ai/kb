---
id: article-2025-03-20-claude-think-tool
type: source
title: "The 'think' tool: Enabling Claude to stop and think in complex tool use situations"
author: Anthropic
publisher: Anthropic
url: https://www.anthropic.com/engineering/claude-think-tool
date_published: 2025-03-20
date_added: 2026-04-09
tags: [tool-use, reasoning, extended-thinking, policies]
status: processed
quality: high
summary: Anthropic introduces a dedicated 'think' tool that lets Claude insert a focused reasoning step during tool-use loops, improving policy following and multi-step decision-making in complex environments.
related: [tool-use, reasoning, extended-thinking, policies]
---

# The 'think' tool: Enabling Claude to stop and think in complex tool use situations

## Source Metadata

- Author: Anthropic
- Published: 2025-03-20
- Publisher: Anthropic
- URL: https://www.anthropic.com/engineering/claude-think-tool

## TL;DR

Anthropic presents the think tool as a lightweight way to create extra deliberation during a tool-use trajectory, especially when the agent needs to interpret intermediate tool results or make careful sequential decisions.

## Key Claims

- Some tool-use scenarios benefit from explicit intermediate reflection.
- A dedicated think step is different from pre-response extended thinking.
- Policy-heavy and sequential decision environments are strong use cases for the pattern.

## Important Details

- Anthropic later added a note saying extended thinking is now preferred in many cases.
- The think tool is aimed at mid-trajectory reasoning, not only pre-response planning.
- The post ties the approach to better policy following and tool-use consistency.

## Entities

- Concepts: think tool, extended thinking, sequential decisions, policy-heavy environments

## My Notes

- This is an important design pattern even if the specific product feature evolves.

## Open Questions

- When should explicit reasoning tools be modeled as tools versus built into the harness?

## Related

- [[tool-use]]
- [[reasoning]]
- [[context-engineering]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
