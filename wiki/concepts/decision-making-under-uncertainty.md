---
id: concept-decision-making-under-uncertainty
type: concept
title: Decision-Making Under Uncertainty
tags: [decision-making, uncertainty, probabilistic-reasoning, planning, pomdp]
source_count: 5
summary: Decision-making under uncertainty connects probability, utility, planning, belief states, and sequential consequences into one action-oriented framework.
canonical_for: [decision-making under uncertainty, planning under uncertainty, POMDPs, belief states]
review_status: reviewed
last_reviewed: 2026-05-18
review_due: 2026-08-18
confidence: "0.83"
---

# Decision-Making Under Uncertainty

## Summary

Decision-making under uncertainty is the missing bridge between prediction and action. It asks what to do when state, dynamics, outcomes, and other agents are uncertain. For this KB, it gives agent design a more precise model of belief, utility, planning, observations, and downstream consequences.

## Core Ideas

- Predictions become useful when connected to utilities and actions.
- Bayesian networks and probabilistic inference model uncertain worlds.
- MDPs model fully observed sequential decisions; POMDPs model hidden state and belief updates.
- Planning can be exact, approximate, online, offline, model-based, or model-free.
- State uncertainty makes memory and observation policy part of decision quality.
- Model uncertainty separates not knowing the state from not knowing the dynamics.

## KB Payoff

- [[agent-memory]] can treat some memory as belief state rather than fact storage.
- [[reasoning]] can separate prediction, utility, and policy selection.
- [[ai-agent-evals]] can score action quality and risk, not only answer correctness.

## Child Concepts

- [[markov-decision-processes]]
- [[pomdps-and-belief-states]]
- [[planning-and-online-decision-making]]

## Source Notes

- [[2026-05-18-algorithms-for-decision-making]]
- [[2026-05-18-decision-making-under-uncertainty]]
- [[2026-05-18-probabilistic-machine-learning-introduction]]
- [[2026-05-18-probabilistic-machine-learning-advanced-topics]]
- [[2026-05-18-reinforcement-learning-an-introduction]]

## Related

- [[probabilistic-machine-learning]]
- [[reinforcement-learning]]
- [[agent-memory]]
- [[reasoning]]
- [[markov-decision-processes]]
- [[pomdps-and-belief-states]]
- [[planning-and-online-decision-making]]
