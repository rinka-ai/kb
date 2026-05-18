---
id: concept-markov-decision-processes
type: concept
title: Markov Decision Processes
tags: [reinforcement-learning, mdp, bellman-equations, planning, decision-making]
source_count: 6
summary: Markov decision processes model sequential decisions with states, actions, transitions, rewards, policies, value functions, and Bellman equations.
canonical_for: [MDPs, Markov decision processes, Bellman equations, value functions]
review_status: reviewed
last_reviewed: 2026-05-18
review_due: 2026-08-18
confidence: "0.84"
---

# Markov Decision Processes

## Summary

Markov decision processes are the canonical model for fully observed sequential decision-making. They define states, actions, transition probabilities, rewards, policies, and value functions. Bellman equations express the recursive structure that makes dynamic programming and reinforcement learning possible.

## Core Ideas

- The Markov property says the current state contains the information needed for future prediction.
- A policy maps states to actions or action distributions.
- A value function estimates expected return from a state or state-action pair.
- Bellman equations decompose long-term value into immediate reward plus discounted future value.
- Dynamic programming assumes a known model; reinforcement learning estimates values or policies from experience.
- Function approximation extends MDP methods beyond small tabular settings.

## KB Payoff

- [[reinforcement-learning]] depends on MDPs as its central formal model.
- [[decision-making-under-uncertainty]] uses MDPs before adding hidden state and observations.
- [[distributional-reinforcement-learning]] extends Bellman reasoning from expected values to return distributions.

## Source Notes

- [[2026-05-18-reinforcement-learning-an-introduction]]
- [[2026-05-18-algorithms-for-decision-making]]
- [[2026-05-18-decision-making-under-uncertainty]]
- [[2026-05-18-distributional-reinforcement-learning]]
- [[2026-05-18-multi-agent-reinforcement-learning]]
- [[2026-05-18-probabilistic-machine-learning-advanced-topics]]

## Related

- [[reinforcement-learning]]
- [[temporal-difference-and-value-learning]]
- [[pomdps-and-belief-states]]
- [[distributional-reinforcement-learning]]
