---
id: summary-2026-04-16-agent-stack-builder-guide-kb-upgrades
type: summary
title: Agent Stack Builder Guide KB Upgrades
tags: [agents, memory, skills, protocols, harnesses]
summary: Summary of how the builder guide and follow-on sources sharpen the KB around memory, skills, protocols, and harnesses.
review_status: reviewed
last_reviewed: 2026-04-16
review_due: 2026-05-16
confidence: "0.83"
---

# Agent Stack Builder Guide KB Upgrades

## Summary

The Av1dlive builder guide does not overturn the KB's current architecture views, but it exposes an asymmetry in coverage. The repo was already strong on memory and context engineering, decent on managed runtimes, and much thinner on skills, protocols, and harnesses as separate design surfaces. The main upgrade is therefore conceptual re-segmentation, not just another source note.

## What Changed In The KB

- added a source note for the builder guide itself
- added dedicated concept pages for [[agent-skills]], [[agent-protocols]], and [[agent-harnesses]]
- strengthened [[agent-memory]], [[context-engineering]], and [[llm-agents]] with the guide's four-part decomposition
- added follow-on source notes for Zhou et al. on externalization, Harrison Chase on harness-memory ownership, Vivek Trivedy on harness anatomy, Daniel Miessler on good versus bad harness engineering, and the `codejunkie99/agentic-stack` reference repo

## Why This Matters

- it makes the KB less likely to collapse everything into generic "memory" or "context"
- it gives skills and governance their own conceptual homes instead of leaving them as scattered source-note details
- it makes it easier to compare file-centric builder stacks against managed-agent, protocol-first, or framework-centric designs

## What These Follow-On Sources Improved

- the Zhou paper gives the KB a stronger theory layer for separating memory, skills, protocols, and harnesses
- Harrison Chase adds the missing memory-ownership and lock-in angle that the builder guide only implied
- Vivek Trivedy supplies the clearest definition of what a harness actually includes in practice
- Daniel Miessler strengthens the KB's preference for declarative skill and harness design over brittle choreography
- the `agentic-stack` repo gives the KB a concrete implementation counterpart rather than only architectural prose

## Remaining Gaps

- empirical comparisons between different memory and harness designs instead of mostly builder heuristics
- stronger sources on ADR-style decision memory and when design decisions should become first-class agent artifacts
- more governance-heavy sources on approvals, delegation, and unsafe composition across multiple skills or subagents

## Editorial Caution

- treat the "< 200 LOC harness" line as a heuristic, not a law
- treat the exact salience formula as an implementation pattern, not a universal retrieval policy
- treat the nightly dream cycle as one consolidation design, not the only credible memory architecture
- keep the distinction between strong builder heuristics and generalizable theory explicit
