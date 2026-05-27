---
id: article-2026-04-09-infrastructure-noise
type: source
title: "Quantifying infrastructure noise in agentic coding evals"
path: raw/articles/anthropic-engineering/2026-04-09-quantifying-infrastructure-noise-in-agentic-coding-evals.md
author: Gian Segato
publisher: Anthropic
url: https://www.anthropic.com/engineering/infrastructure-noise
date_published:
date_added: 2026-04-09
tags: [evals, agentic-coding, infrastructure, benchmarking]
status: processed
quality: high
summary: Anthropic argues that agentic coding benchmark scores can shift materially based on resource allocation and enforcement details, so infrastructure must be treated as a first-class variable in evaluation design.
related: [ai-agent-evals, agentic-coding, infrastructure, benchmarking]
---

# Quantifying infrastructure noise in agentic coding evals

## Source Metadata

- Path: raw/articles/anthropic-engineering/2026-04-09-quantifying-infrastructure-noise-in-agentic-coding-evals.md
- Author: Gian Segato
- Published: Unknown
- Publisher: Anthropic
- URL: https://www.anthropic.com/engineering/infrastructure-noise

## TL;DR

This post shows that agentic coding eval scores are not just functions of model quality. Resource headroom, enforcement policy, and runtime conditions can move benchmark results by more than the margin between leading systems.

## Key Claims

- Agentic coding evals measure a full system, not just a model.
- Resource configuration can change both reliability and what the benchmark is actually testing.
- Small leaderboard differences should be treated skeptically when infra methodology is not documented.

## Important Details

- Anthropic reports a 6 point spread on Terminal-Bench 2.0 between the strictest and loosest resource setups.
- Up to a moderate threshold, extra resources mostly reduce infra errors.
- Beyond that threshold, extra resources actively help some agents solve more tasks.

## Entities

- Benchmarks: Terminal-Bench, SWE-bench
- Concepts: infra noise, resource headroom, enforcement methodology, reproducibility

## My Notes

- This is a very useful counterweight to taking benchmark numbers too literally.

## Open Questions

- How should our KB track harness and infra assumptions alongside benchmark claims?

## Related

- [[ai-agent-evals]]
- [[claude-code]]
- [[benchmark-integrity]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
