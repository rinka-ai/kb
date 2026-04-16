---
id: concept-resolvers
type: concept
title: Resolvers
tags: [agents, context-engineering, routing, skills, governance]
source_count: 5
summary: Resolvers are lightweight routing layers that decide which context, skill, or filing rule an agent should load for a given task.
canonical_for: [resolver, resolvers, routing tables for context]
review_status: reviewed
last_reviewed: 2026-04-16
review_due: 2026-05-16
confidence: "0.81"
---

# Resolvers

## Summary

Resolvers are lightweight routing layers that decide what an agent should load, call, or consult for a given task before the model starts improvising. In this KB, the most useful framing is that resolvers sit between broad always-on instructions and full skill or memory payloads: they keep the hot context lean, make capabilities reachable, and turn routing into an explicit governance surface rather than an accidental side effect of prompt sprawl.

## What They Are

- a mapping from task types or content types to the right skill, document, directory, or rule set
- distinct from skills, which describe how to do the work once selected
- distinct from memory, which stores facts and prior judgments
- distinct from protocols, which define interfaces, permissions, and runtime contracts
- often implemented as small registries, descriptions, decision trees, or manifests rather than code-heavy orchestrators

## Layers

- skill resolvers map user requests to the right skill or workflow
- filing resolvers map content to the right directory, page type, or memory schema
- context resolvers decide which supporting documents or rules should load before reasoning
- sub-resolvers can live inside skills, where one selected skill still branches into different internal procedures

## Design Rules

- keep the resolver small enough to stay legible and cheap to load
- route to durable artifacts on demand instead of cramming everything into root instructions
- require writing skills to consult shared filing rules before creating pages or mutating memory
- treat trigger descriptions and manifests as first-class routing surfaces, not documentation afterthoughts
- test dispatch behavior directly with trigger evals and reachability checks
- revisit resolver entries as user phrasing, skill inventory, and memory schemas change

## Failure Modes

- giant instruction files that try to preload all knowledge instead of routing to it
- dark skills that exist but have no discoverable path from the resolver
- hardcoded local defaults inside individual skills that drift away from shared filing logic
- stale trigger descriptions that no longer match how users actually ask for work
- static routing tables that become historical artifacts rather than living control surfaces

## Why They Matter

Resolvers make context engineering operational. They help thin harnesses stay thin because the harness can load the right skill or rule only when needed. They also turn capability coverage into something testable: if a skill cannot be reached from the resolver, the system does not truly have that capability. At larger scale, the same pattern starts to look like management infrastructure: routing, escalation, filing discipline, and institutional memory expressed as compact documents the model can follow.

## Source Notes

- [[2026-04-16-resolvers-the-routing-table-for-intelligence]]
- [[2026-04-16-ai-agent-stack-builders-guide-av1dlive]]
- [[2025-11-13-skills-explained-how-skills-compares-to-prompts-projects-mcp-and-subagents]]
- [[2025-11-19-how-to-create-skills-key-steps-limitations-and-examples]]
- [[2026-04-09-context-rot]]
