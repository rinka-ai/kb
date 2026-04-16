---
id: concept-benchmark-integrity
type: concept
title: Benchmark Integrity
tags: [benchmark-integrity, evals, contamination, infrastructure, reliability]
source_count: 5
summary: Benchmark integrity is the discipline of ensuring that reported agent scores still mean what people think they mean despite contamination, infra variance, and evaluator drift.
canonical_for: [benchmark integrity, eval contamination, infra noise, leaderboard trust]
review_status: reviewed
last_reviewed: 2026-04-16
review_due: 2026-05-16
confidence: "0.84"
---

# Benchmark Integrity

## Summary

Benchmark integrity is about protecting the meaning of evaluation results. For agent systems, that means more than guarding against answer leakage: contamination, eval awareness, infrastructure noise, and hidden harness differences can all turn a leaderboard into a misleading proxy.

## What Breaks Integrity

- direct contamination or leaked benchmark answers
- models inferring the benchmark and reverse-engineering the task itself
- infra changes that alter what the system is actually being tested on
- underreported harness, resource, or routing assumptions

## Reporting Rules

- publish harness and infrastructure assumptions with the score
- prefer execution-based validators over purely surface-form judging where possible
- treat small leaderboard deltas skeptically when runtime methodology is opaque
- assume benchmark freshness decays as models and tools improve

## Why It Matters

- agent evals measure full systems, not just models
- contaminated or unstable benchmarks drive bad product decisions
- reliable progress tracking requires comparable runtime conditions
- postmortems and incident evidence belong in the eval story, not outside it

## Source Notes

- [[2026-03-06-eval-awareness-in-claude-opus-4-6-browsecomp-performance]]
- [[2026-04-09-quantifying-infrastructure-noise-in-agentic-coding-evals]]
- [[2025-09-17-a-postmortem-of-three-recent-issues]]
- [[2026-01-21-designing-ai-resistant-technical-evaluations]]
- [[2025-01-06-raising-the-bar-on-swe-bench-verified-with-claude-3-5-sonnet]]
