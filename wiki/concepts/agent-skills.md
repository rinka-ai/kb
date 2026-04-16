---
id: concept-agent-skills
type: concept
title: Agent Skills
tags: [agents, skills, context-engineering]
source_count: 9
summary: Agent skills are reusable procedural capability modules that package task-specific guidance without collapsing it into raw prompts, memory, or tools.
canonical_for: [agent skills, procedural skills]
review_status: reviewed
last_reviewed: 2026-04-16
review_due: 2026-05-16
confidence: "0.84"
---

# Agent Skills

## Summary

Agent skills are reusable capability modules that teach an agent how to approach recurring classes of tasks without hard-coding those procedures into the harness or pretending they belong in long-term memory. In this KB, the strongest recent pattern is that skills externalize procedural expertise best when they are progressively disclosed, carry clear constraints, and specify what good looks like more than brittle step-by-step choreography.

## What They Are

- reusable task-specific guidance that sits between generic model competence and raw tool access
- distinct from prompts, which are momentary instructions
- distinct from memory, which stores facts, lessons, or prior episodes
- distinct from tool schemas, which define interfaces and safety boundaries

## Design Patterns

- keep a lightweight registry or manifest always available, then load full skills only on trigger match
- include procedures, heuristics, and hard constraints together
- prefer examples and destination criteria over brittle micromanaged steps
- let skills accumulate local knowledge or rewrite hooks, but update them conservatively
- escalate repeated local failures into broader semantic lessons when they reveal system-wide constraints
- keep machine-readable manifests or trigger registries so large skill libraries stay mostly off-context until needed

## Failure Modes

- loading every skill all the time and wasting context budget
- writing procedural skills that the model follows literally even when the world changed
- letting stale skills survive API or workflow drift
- confusing skills with tools, memory, or project context
- keeping important safety lessons trapped inside one skill instead of promoting them globally
- describing exact choreography when the skill should really communicate outcomes, examples, and fences

## Source Notes

- [[2026-04-16-externalization-in-llm-agents-a-unified-review-of-memory-skills-protocols-and-harness-engineering]]
- [[2026-04-16-the-anatomy-of-an-agent-harness]]
- [[2026-04-16-good-and-bad-harness-engineering]]
- [[2026-04-16-agentic-stack]]
- [[2026-04-16-ai-agent-stack-builders-guide-av1dlive]]
- [[2025-11-13-skills-explained-how-skills-compares-to-prompts-projects-mcp-and-subagents]]
- [[2025-11-19-how-to-create-skills-key-steps-limitations-and-examples]]
- [[2025-11-12-improving-frontend-design-through-skills]]
- [[2026-04-12-agent-workflow-memory]]
