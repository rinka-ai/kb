---
id: concept-monitoring-drift-and-feedback
type: concept
title: Monitoring Drift And Feedback
tags: [ml-systems, monitoring, drift, feedback-loops, deployment]
source_count: 4
summary: Monitoring, drift, and feedback loops explain why deployed ML systems must track changing data, behavior, outcomes, and downstream effects after launch.
canonical_for: [model monitoring, data drift, feedback loops, post-deployment monitoring]
review_status: reviewed
last_reviewed: 2026-05-18
review_due: 2026-08-18
confidence: "0.80"
---

# Monitoring Drift And Feedback

## Summary

Deployed ML systems live in changing environments. Monitoring tracks whether inputs, outputs, errors, costs, latency, and user outcomes remain within expected ranges. Drift and feedback loops explain why a model that was valid at launch can become wrong, harmful, or inefficient later.

## Core Ideas

- Data drift changes the input distribution.
- Concept drift changes the relationship between inputs and targets.
- Feedback loops occur when model decisions change the future data the model observes.
- Monitoring needs both technical metrics and outcome metrics.
- Alerts should connect to rollback, retraining, human review, or policy changes.
- Fairness and safety can drift even when aggregate accuracy looks stable.

## KB Payoff

- [[ml-systems-engineering]] needs this as its post-deployment discipline.
- [[fairness-and-ml]] uses feedback loops to explain socio-technical harm.
- [[agent-harnesses]] can apply the same logic to long-running autonomous systems.

## Source Notes

- [[2026-05-18-machine-learning-systems-vol1]]
- [[2026-05-18-machine-learning-systems-vol2]]
- [[2026-05-18-fairness-and-machine-learning]]
- [[2026-05-18-algorithms-for-validation]]

## Related

- [[ml-training-serving-lifecycle]]
- [[ml-systems-engineering]]
- [[fairness-and-ml]]
- [[causal-fairness-and-feedback-loops]]
