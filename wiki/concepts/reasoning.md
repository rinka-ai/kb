---
id: concept-reasoning
type: concept
title: Reasoning In Agent Loops
tags: [reasoning, agents, tool-use, planning, extended-thinking]
source_count: 4
summary: Reasoning in agent loops is the deliberation layer that decides what to do next, when to gather more evidence, and when a tool result changes the plan.
canonical_for: [reasoning, reasoning and acting, react, think tool]
review_status: reviewed
last_reviewed: 2026-04-16
review_due: 2026-05-16
confidence: "0.8"
---

# Reasoning In Agent Loops

## Summary

Reasoning in agent systems is not just “think longer.” Its job is to choose the next action, update plans from new evidence, and avoid blindly executing tool chains after the world has changed. The strongest sources here point to sparse, strategically placed reasoning rather than maximal introspection everywhere.

## What Reasoning Does

- decomposes goals into the next useful step
- interprets intermediate tool results before another action fires
- revises plans when retrieved evidence contradicts the current trajectory
- helps policy-heavy tool loops avoid careless sequential mistakes

## Common Patterns

- ReAct-style interleaving of thought and action
- dedicated mid-trajectory reflection steps such as the think tool
- brief planning before branching into tools or environments
- reasoning that stays local to the decision point instead of bloating the whole trace

## Failure Modes

- treating more visible reasoning as automatically better
- reasoning without action, which can preserve hallucinations instead of correcting them
- action without reasoning, which can compound errors through long tool chains
- pushing all deliberation into the prompt when the harness could place it more surgically

## Source Notes

- [[2026-04-10-react-synergizing-reasoning-and-acting-in-language-models]]
- [[2025-03-20-the-think-tool-enabling-claude-to-stop-and-think]]
- [[2024-12-19-building-effective-agents]]
- [[2025-09-11-writing-effective-tools-for-agents-with-agents]]
