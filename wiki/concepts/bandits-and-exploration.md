---
id: concept-bandits-and-exploration
type: concept
title: Bandits And Exploration
tags: [reinforcement-learning, bandits, exploration, sequential-decision-making]
source_count: 4
summary: Bandits isolate the exploration-exploitation tradeoff by forcing agents to choose between actions with uncertain payoffs before full state dynamics enter the problem.
canonical_for: [bandits, multi-armed bandits, exploration exploitation, contextual bandits]
review_status: reviewed
last_reviewed: 2026-05-18
review_due: 2026-08-18
confidence: "0.81"
---

# Bandits And Exploration

## Summary

Bandit problems are the simplest useful version of learning through action. An agent repeatedly chooses among actions with uncertain payoffs, balancing exploration of poorly known actions against exploitation of actions believed to be good.

## Core Ideas

- Exploration gathers information that may improve future decisions.
- Exploitation uses current estimates to maximize immediate reward.
- Action-value estimates can be updated incrementally.
- Nonstationary bandits require tracking changing payoffs.
- Optimistic initialization and uncertainty bonuses encourage exploration.
- Contextual bandits add observed features without the full state-transition structure of MDPs.

## KB Payoff

- [[reinforcement-learning]] uses bandits as the entry point to exploration.
- [[decision-making-under-uncertainty]] can use bandits as a minimal action-under-uncertainty model.
- [[agent-harnesses]] can borrow the tradeoff when deciding whether a live system should explore new tools or exploit known workflows.

## Source Notes

- [[2026-05-18-reinforcement-learning-an-introduction]]
- [[2026-05-18-algorithms-for-decision-making]]
- [[2026-05-18-decision-making-under-uncertainty]]
- [[2026-05-18-probabilistic-machine-learning-advanced-topics]]

## Related

- [[reinforcement-learning]]
- [[markov-decision-processes]]
- [[decision-making-under-uncertainty]]
- [[policy-gradients-and-actor-critic]]
