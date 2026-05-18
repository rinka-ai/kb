---
id: concept-scaling-laws-and-compute-economics
type: concept
title: Scaling Laws And Compute Economics
tags: [ml-systems, scaling-laws, compute, efficiency, ai-engineering]
source_count: 3
summary: Scaling laws and compute economics help reason about capability, cost, resource allocation, efficiency, sustainability, and the limits of simply adding more compute.
canonical_for: [scaling laws, compute economics, return on compute, AI scaling]
review_status: reviewed
last_reviewed: 2026-05-18
review_due: 2026-08-18
confidence: "0.79"
---

# Scaling Laws And Compute Economics

## Summary

Scaling laws describe empirical relationships among model size, data, compute, and performance. Compute economics asks whether a capability gain is worth the resources spent. The systems textbooks add an important corrective: scaling laws are useful design tools, but they do not remove communication bottlenecks, reliability problems, governance, energy costs, or deployment constraints.

## Core Ideas

- Scaling laws can guide resource allocation but are empirical, not universal guarantees.
- Compute-optimal design balances parameters, data, and training budget.
- Return on compute matters when model gains are expensive or operationally constrained.
- Distributed training introduces communication and failure costs.
- Energy, sustainability, and infrastructure availability are system constraints.
- Scaling can break down when data quality, architecture, optimization, or deployment limits dominate.

## KB Payoff

- [[ml-systems-engineering]] gets a compute-aware design lens.
- [[agent-harnesses]] can reason about agentic workflows in cost, latency, and throughput terms.
- [[ai-agent-evals]] can report resource tradeoffs alongside scores.

## Source Notes

- [[2026-05-18-machine-learning-systems-vol2]]
- [[2026-05-18-machine-learning-systems-vol1]]
- [[2026-05-18-probabilistic-machine-learning-advanced-topics]]

## Related

- [[ml-systems-engineering]]
- [[ml-training-serving-lifecycle]]
- [[ai-agent-evals]]
- [[agent-harnesses]]
