---
id: article-2026-04-12-temporal-ai-cookbook
type: source
title: "Temporal AI Cookbook"
path: raw/articles/official-docs/2026-04-12-temporal-ai-cookbook.md
author: Temporal
publisher: Temporal Docs
url: https://docs.temporal.io/ai-cookbook
date_published:
date_added: 2026-04-12
tags: [agents, workflows, durable-execution, orchestration]
status: processed
quality: high
summary: Temporal's AI Cookbook collects implementation patterns for building reliable AI systems on durable workflows, covering tool loops, human approval, MCP servers, retries, and integrations with agent SDKs.
related: [agents, workflows, durable-execution, orchestration]
---

# Temporal AI Cookbook

## Source Metadata

- Path: raw/articles/official-docs/2026-04-12-temporal-ai-cookbook.md
- Author: Temporal
- Published: Unknown
- Publisher: Temporal Docs
- URL: https://docs.temporal.io/ai-cookbook

## TL;DR

Temporal frames production AI systems as durable workflows rather than fragile request loops, and the cookbook turns that framing into concrete recipes for tool calling, retries, human approval, MCP, and SDK-backed agents.

## Key Claims

- Long-running AI behavior should be built on a workflow substrate that survives crashes, retries, and long pauses.
- Reliable AI systems need explicit handling for tools, retries, and human approval rather than assuming a single uninterrupted run.
- Durable execution is useful not only for bespoke agents but also for MCP tools and third-party agent SDKs.
- Workflow design, not just prompt design, is a first-class concern in production agent systems.

## Important Details

- The cookbook explicitly groups recipes around prompts, tools, retries, workflow design, MCP, human-in-the-loop, and agent SDK integrations.
- The listed examples include structured outputs, basic tool-calling loops, human-in-the-loop agents, a durable MCP server, a durable agent built with the OpenAI Agents SDK, and a simple deep-research architecture.
- Temporal presents these as production-ready patterns rather than benchmark demos, which makes the collection especially relevant to application architecture.
- The page repeatedly anchors the AI material in Temporal's general durable-workflow model rather than inventing a separate "AI-only" runtime philosophy.

## Entities

- Organization: Temporal
- Systems: Temporal Workflows, Temporal Activities, Temporal AI Cookbook
- Concepts: durable execution, retries, human in the loop, tool calling, workflow design, MCP

## My Notes

- This is useful to keep because it maps durable execution onto familiar agent problems without collapsing into generic workflow marketing.
- For Mari, it matters as a catalog of operational patterns: approvals, retries, resumability, and tool orchestration are all already real concerns in the codebase.

## Open Questions

- Which Temporal patterns are conceptually useful for Mari even if Temporal itself would be too heavyweight as a runtime dependency?
- Where should this KB distinguish durable workflow engines from agent frameworks that assume a shorter-lived process model?

## Related

- [[managed-agents]]
- [[llm-agents]]
- [[context-engineering]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
