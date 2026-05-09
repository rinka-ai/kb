---
id: concept-agent-skills
type: concept
title: Agent Skills
tags: [agents, skills, context-engineering]
source_count: 16
summary: Agent skills are reusable procedural capability modules that package task-specific guidance without collapsing it into raw prompts, memory, or tools.
canonical_for: [agent skills, procedural skills]
review_status: reviewed
last_reviewed: 2026-05-09
review_due: 2026-06-09
confidence: "0.84"
---

# Agent Skills

## Summary

Agent skills are reusable capability modules that teach an agent how to approach recurring classes of tasks without hard-coding those procedures into the harness or pretending they belong in long-term memory. In this KB, the strongest recent pattern is that skills externalize procedural expertise best when they are progressively disclosed, carry clear constraints, and specify what good looks like more than brittle step-by-step choreography. At scale, that depends on resolver surfaces that keep skills discoverable without loading all of them all the time, and in some systems on permission layers that decide which skills are even reachable for a given invocation. AHE adds a boundary condition: skills are only one evolvable harness component, and gains may live more strongly in tools, middleware, or memory than in procedural text. A newer security framing treats runtime-loaded skills as supply-chain artifacts: signatures and registries establish provenance, but behavioral trust requires explicit verification before irreversible capabilities can stop asking for HITL approval.

## What They Are

- reusable task-specific guidance that sits between generic model competence and raw tool access
- distinct from prompts, which are momentary instructions
- distinct from memory, which stores facts, lessons, or prior episodes
- distinct from tool schemas, which define interfaces and safety boundaries

## Design Patterns

- keep a lightweight registry or manifest always available, then load full skills only on trigger match
- support both filesystem and built-in skill discovery so skills stay reachable without forcing all of them into the hot path
- make skill reachability portable across sandbox types; if one deployment target bundles skills while another expects them in the sandbox filesystem, users will experience the same skill as present or absent depending on runtime accident
- include procedures, heuristics, and hard constraints together
- prefer examples and destination criteria over brittle micromanaged steps
- let skills accumulate local knowledge or rewrite hooks, but update them conservatively
- when skills are evolved automatically, pair each update with evidence, expected fixes, and at-risk regressions
- escalate repeated local failures into broader semantic lessons when they reveal system-wide constraints
- keep machine-readable manifests or trigger registries so large skill libraries stay mostly off-context until needed
- maintain explicit resolver entries or strong description fields so existing skills remain reachable by natural user phrasing
- couple skill reachability to permission scope or invocation mode when background jobs should not load the same playbooks as interactive sessions
- treat signatures, registries, and clearances as provenance signals rather than proof that a skill's behavior matches its manifest
- freeze loaded skill content and verification levels at bootstrap; route any skill mutation through an audited irreversible operation and re-verify the resulting artifact before reuse

## Failure Modes

- loading every skill all the time and wasting context budget
- writing procedural skills that the model follows literally even when the world changed
- letting stale skills survive API or workflow drift
- confusing skills with tools, memory, or project context
- making skill discovery depend on hidden filesystem assumptions that differ between local, virtual, hosted, and container sandboxes
- keeping important safety lessons trapped inside one skill instead of promoting them globally
- describing exact choreography when the skill should really communicate outcomes, examples, and fences
- building dark skills that technically exist but have no practical path from the resolver
- over-crediting skills for improvements that actually came from tool, middleware, or memory changes
- treating signed or registry-delivered skills as trusted without behavioral verification
- allowing an agent to mutate loaded skill content in-session and silently change what "verified" means

## Source Notes

- [[2026-05-01-skills-as-verifiable-artifacts]]
- [[2026-04-16-externalization-in-llm-agents-a-unified-review-of-memory-skills-protocols-and-harness-engineering]]
- [[2026-04-16-the-anatomy-of-an-agent-harness]]
- [[2026-04-16-good-and-bad-harness-engineering]]
- [[2026-04-16-agentic-stack]]
- [[2026-04-16-ai-agent-stack-builders-guide-av1dlive]]
- [[2025-11-13-skills-explained-how-skills-compares-to-prompts-projects-mcp-and-subagents]]
- [[2025-11-19-how-to-create-skills-key-steps-limitations-and-examples]]
- [[2025-11-12-improving-frontend-design-through-skills]]
- [[2026-04-12-agent-workflow-memory]]
- [[2026-04-16-resolvers-the-routing-table-for-intelligence]]
- [[2026-04-17-goose]]
- [[2026-04-17-browserbase-skills]]
- [[2026-04-17-browserbase-bb-internal-agent-full-architecture-synthesis]]
- [[2026-04-28-agentic-harness-engineering-observability-driven-automatic-evolution-of-coding-agent-harnesses]]
- [[2026-05-02-flue]]
