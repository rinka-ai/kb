---
id: concept-multi-agent-failure-attribution
type: concept
title: Multi-Agent Failure Attribution
tags: [agents, multi-agent, evals, diagnosis, failure-attribution]
summary: Multi-agent failure attribution identifies where, how, and why errors emerge and propagate across agent roles, steps, tools, and coordination structures so diagnoses can support repair.
source_count: 4
canonical_for: [multi-agent failure attribution, agent failure attribution, failure diagnosis in agent teams, attribution in multi-agent systems]
review_status: draft
last_reviewed: 2026-05-16
review_due: 2026-06-16
confidence: "0.74"
---

# Multi-Agent Failure Attribution

## Summary

Multi-agent failure attribution is the diagnostic layer for agent teams. It asks where an error entered the system, how it moved across agents and interaction rounds, which component or decision should be treated as the root cause, and whether the diagnosis can drive a useful repair. The important shift is from task-level pass/fail evaluation to causal evidence across roles, messages, tool calls, memory reads, orchestration decisions, and final synthesis.

## Why It Matters

- multi-agent coordination creates failure modes that do not exist in a single model loop
- downstream symptoms can hide earlier root causes, especially when agents forward incomplete or corrupted context
- reviewers, critics, and managers can improve outcomes only if their contributions remain auditable
- self-evolving systems need attribution before they can decide what to mutate safely
- eval scores become more actionable when they explain which role, tool, prompt, memory, or topology caused the miss

## Attribution Targets

- agent-level responsibility: which agent introduced or amplified the problem
- step-level responsibility: when the decisive error entered the trajectory
- interaction-level responsibility: whether a handoff, critique, routing decision, or message failed
- module-level responsibility: whether memory, planning, tool use, reflection, or verification broke down
- causal-chain responsibility: how multiple local errors propagated into a global failure

## Method Families

- data-driven methods learn recurring failure patterns from labeled trajectories or generated diagnostic data
- constraint-guided methods turn attribution into a structured diagnostic pipeline, often using judges, stage comparisons, or explicit invariants
- causal and counterfactual methods ask whether the failure would disappear if an agent, step, message, or path were changed
- repair-oriented methods are the most useful end state: attribution should produce evidence that can be verified by an intervention, not only a plausible postmortem

## Repair Loop

The strongest pattern is a loop rather than a label. Collaboration generates a trace, attribution localizes and explains the failure, repair changes a bounded part of the system, and evaluation checks both the intended fix and possible regressions. This connects multi-agent attribution to harness observability, protocol-level change manifests, and self-evolving agent systems.

## Tensions

- single-cause labels vs multi-cause failures
- concise postmortems vs raw trace fidelity
- synthetic fault injection vs realistic production traces
- attribution accuracy vs repair usefulness
- autonomous repair vs human review of structural changes
- fine-grained causal evidence vs context and storage costs

## Source Notes

- [[2026-05-14-beyond-individual-intelligence-multi-agent-life-survey]]
- [[2026-04-28-agentic-harness-engineering-observability-driven-automatic-evolution-of-coding-agent-harnesses]]
- [[2026-03-24-benchmarking-multi-agent-llm-architectures-financial-document-processing]]
- [[2026-05-14-is-grep-all-you-need-how-agent-harnesses-reshape-agentic-search]]
