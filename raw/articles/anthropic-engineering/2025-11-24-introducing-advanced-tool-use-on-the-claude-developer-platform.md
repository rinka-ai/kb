---
id: article-2025-11-24-advanced-tool-use
type: source
title: "Introducing advanced tool use on the Claude Developer Platform"
author: Anthropic
publisher: Anthropic
url: https://www.anthropic.com/engineering/advanced-tool-use
date_published: 2025-11-24
date_added: 2026-04-09
tags: [tool-use, claude-platform, mcp, code-execution]
status: processed
quality: high
summary: Anthropic introduces three tool-use features for large tool ecosystems: Tool Search Tool, Programmatic Tool Calling, and Tool Use Examples, all aimed at reducing context load and improving tool accuracy.
related: [tool-use, mcp, code-execution, context-engineering]
---

# Introducing advanced tool use on the Claude Developer Platform

## Source Metadata

- Author: Anthropic
- Published: 2025-11-24
- Publisher: Anthropic
- URL: https://www.anthropic.com/engineering/advanced-tool-use

## TL;DR

This post extends Anthropic's tool-use story from simple direct tool calls toward dynamic discovery, code-based orchestration, and example-driven tool learning.

## Key Claims

- Unlimited or large tool libraries require dynamic discovery rather than up-front loading.
- Code execution is often a better orchestration medium than pure natural-language tool calling.
- Tool examples matter because schemas alone do not teach usage patterns.

## Important Details

- Anthropic introduces Tool Search Tool, Programmatic Tool Calling, and Tool Use Examples.
- The motivation is both token efficiency and better tool correctness.
- The post ties these features directly to MCP-heavy agent setups.

## Entities

- Concepts: tool search, programmatic tool calling, tool use examples
- Protocols: MCP

## My Notes

- This is a useful bridge between tool design and context engineering.

## Open Questions

- Which of these patterns should our KB treat as baseline for large tool ecosystems?

## Related

- [[tool-use]]
- [[context-engineering]]
- [[mcp]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
