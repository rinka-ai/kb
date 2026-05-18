---
id: concept-temporal-difference-and-value-learning
type: concept
title: Temporal Difference And Value Learning
tags: [reinforcement-learning, temporal-difference, value-functions, q-learning]
source_count: 5
summary: Temporal-difference and value-learning methods update value estimates from bootstrapped predictions rather than waiting for complete returns.
canonical_for: [temporal difference learning, TD learning, Q-learning, value learning]
review_status: reviewed
last_reviewed: 2026-05-18
review_due: 2026-08-18
confidence: "0.81"
---

# Temporal Difference And Value Learning

## Summary

Temporal-difference learning bridges Monte Carlo return estimation and dynamic programming. Instead of waiting for a full episode, TD methods update value estimates from immediate reward plus another learned estimate of future value.

## Core Ideas

- Bootstrapping updates an estimate using another estimate.
- TD errors measure surprise between predicted and observed one-step outcomes.
- Q-learning estimates action values for control.
- SARSA updates action values under the behavior policy.
- Eligibility traces mix short and longer credit assignment.
- Function approximation makes value learning scalable but can destabilize learning.
- Distributional TD methods update return distributions rather than scalar values.

## KB Payoff

- [[reinforcement-learning]] needs this page for the core value-learning family.
- [[distributional-reinforcement-learning]] extends the same idea to distributions.
- [[agent-memory]] can use TD as a contrast to file-backed recall: TD stores compressed learned value, not inspectable provenance.

## Source Notes

- [[2026-05-18-reinforcement-learning-an-introduction]]
- [[2026-05-18-distributional-reinforcement-learning]]
- [[2026-05-18-algorithms-for-decision-making]]
- [[2026-05-18-multi-agent-reinforcement-learning]]
- [[2026-05-18-probabilistic-machine-learning-advanced-topics]]

## Related

- [[reinforcement-learning]]
- [[markov-decision-processes]]
- [[policy-gradients-and-actor-critic]]
- [[distributional-reinforcement-learning]]
