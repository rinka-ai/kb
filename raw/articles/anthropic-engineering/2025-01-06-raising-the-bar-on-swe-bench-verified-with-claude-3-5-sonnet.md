---
id: article-2025-01-06-swe-bench-sonnet
type: source
title: "Raising the bar on SWE-bench Verified with Claude 3.5 Sonnet"
author: Anthropic
publisher: Anthropic
url: https://www.anthropic.com/engineering/swe-bench-sonnet
date_published: 2025-01-06
date_added: 2026-04-09
tags: [swe-bench, agentic-coding, evals, scaffolding]
status: processed
quality: high
summary: Anthropic reports strong SWE-bench Verified performance from Claude 3.5 Sonnet and uses the post to show how much benchmark results depend on the surrounding agent scaffold, not just the underlying model.
related: [ai-agent-evals, swe-bench, agentic-coding, harnesses]
---

# Raising the bar on SWE-bench Verified with Claude 3.5 Sonnet

## Source Metadata

- Author: Anthropic
- Published: 2025-01-06
- Publisher: Anthropic
- URL: https://www.anthropic.com/engineering/swe-bench-sonnet

## TL;DR

This post treats SWE-bench as an agent benchmark and uses Claude 3.5 Sonnet's score to illustrate how scaffold design affects coding-agent performance.

## Key Claims

- SWE-bench measures the whole agent system, not only the model.
- Minimal but effective scaffolding can outperform heavier abstractions.
- Real coding tasks are a better benchmark target than interview-style coding questions.

## Important Details

- Anthropic highlights SWE-bench Verified as the cleaner subset.
- The scaffold uses a prompt, a bash tool, and an edit tool.
- The post emphasizes giving the model more control while keeping scaffolding relatively simple.

## Entities

- Benchmarks: SWE-bench, SWE-bench Verified
- Concepts: agent scaffolding, coding benchmarks, bash tool, edit tool

## My Notes

- This sits near the origin of many later Anthropic posts about harnesses and coding agents.

## Open Questions

- Which scaffold choices generalize beyond SWE-bench-like evaluation setups?

## Related

- [[ai-agent-evals]]
- [[agentic-coding]]
- [[harnesses]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
