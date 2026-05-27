---
id: concept-policy-gradients-and-actor-critic
type: concept
title: Policy Gradients And Actor-Critic
tags: [reinforcement-learning, policy-gradient, actor-critic, control]
source_count: 5
summary: Policy gradients and actor-critic methods optimize policies directly, often using value estimates as variance-reducing critics.
canonical_for: [policy gradients, actor critic, policy optimization, direct policy search]
review_status: reviewed
last_reviewed: 2026-05-18
review_due: 2026-08-18
confidence: "0.79"
---

# Policy Gradients And Actor-Critic

## Summary

Policy-gradient methods optimize the policy itself rather than only learning a value table. Actor-critic methods combine an actor that selects actions with a critic that estimates value or advantage, reducing variance and improving learning signals.

## Core Ideas

- Direct policy search optimizes action-selection behavior.
- Policy-gradient estimators use sampled returns to estimate how parameters affect expected reward.
- Baselines and critics reduce variance without changing the target objective.
- Actor-critic methods split policy learning and value estimation.
- Policy optimization can be sensitive to reward scale, exploration, approximation error, and update size.

## KB Payoff

- [[reinforcement-learning]] needs this page for modern control methods.
- [[optimization-for-ml]] connects policy search to stochastic optimization.
- [[multi-agent-reinforcement-learning]] uses policy optimization under strategic interaction and decentralized execution constraints.

## Source Notes

- [[2026-05-18-reinforcement-learning-an-introduction]]
- [[2026-05-18-algorithms-for-decision-making]]
- [[2026-05-18-multi-agent-reinforcement-learning]]
- [[2026-05-18-understanding-deep-learning]]
- [[2026-05-18-probabilistic-machine-learning-advanced-topics]]

## Related

- [[reinforcement-learning]]
- [[optimization-for-ml]]
- [[temporal-difference-and-value-learning]]
- [[multi-agent-reinforcement-learning]]
