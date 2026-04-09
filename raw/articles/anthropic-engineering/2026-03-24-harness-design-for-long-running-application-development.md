---
id: article-2026-03-24-harness-design-long-running-apps
type: source
title: "Harness design for long-running application development"
path: raw/articles/anthropic-engineering/2026-03-24-harness-design-for-long-running-application-development.md
author: Prithvi Rajasekaran
publisher: Anthropic
url: https://www.anthropic.com/engineering/harness-design-long-running-apps
date_published: 2026-03-24
date_added: 2026-04-09
tags: [harnesses, long-running-agents, agentic-coding, frontend, multi-agent]
status: processed
quality: high
summary: Anthropic describes harness patterns for long-running coding tasks, including context resets, structured handoff artifacts, and multi-agent generator-evaluator loops for both frontend quality and multi-hour autonomous development.
related: [harnesses, long-running-agents, agentic-coding, context-engineering]
---

# Harness design for long-running application development

## Source Metadata

- Path: raw/articles/anthropic-engineering/2026-03-24-harness-design-for-long-running-application-development.md
- Author: Prithvi Rajasekaran
- Published: 2026-03-24
- Publisher: Anthropic
- URL: https://www.anthropic.com/engineering/harness-design-long-running-apps

## TL;DR

This post argues that agent performance on long-running application work is dominated by harness design. Anthropic describes using resets, structured artifacts, and generator-evaluator patterns to push frontend and autonomous coding performance further.

## Key Claims

- Long-running coding quality depends heavily on harness structure, not just model quality.
- Context resets can work better than compaction when agents show context anxiety.
- Multi-agent evaluator loops help in domains with subjective quality criteria like frontend design.

## Important Details

- The post connects frontend design and autonomous coding as parallel harness problems.
- Anthropic describes generator, evaluator, and planner style agent roles.
- Structured handoff artifacts are used to bridge fresh sessions after resets.

## Entities

- Concepts: context anxiety, context resets, evaluator agents, handoff artifacts
- Domains: frontend design, long-running coding

## My Notes

- This is one of the most relevant posts for building repo-native long-horizon agent workflows.

## Open Questions

- Which handoff artifacts should our own KB workflows standardize?

## Related

- [[context-engineering]]
- [[managed-agents]]
- [[agentic-coding]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
