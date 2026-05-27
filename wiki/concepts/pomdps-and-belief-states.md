---
id: concept-pomdps-and-belief-states
type: concept
title: POMDPs And Belief States
tags: [decision-making, pomdp, belief-state, uncertainty, planning]
source_count: 5
summary: POMDPs model sequential decision-making under hidden state by replacing direct state access with observations and belief-state updates.
canonical_for: [POMDPs, partially observable Markov decision processes, belief states, hidden state planning]
review_status: reviewed
last_reviewed: 2026-05-18
review_due: 2026-08-18
confidence: "0.82"
---

# POMDPs And Belief States

## Summary

Partially observable Markov decision processes extend MDPs to settings where the agent cannot directly observe the true state. The agent receives observations and maintains a belief state: a probability distribution over possible states. This is one of the most useful textbook ideas for improving how the KB talks about agent memory.

## Core Ideas

- Hidden state means the latest observation is not enough.
- A belief state summarizes uncertainty about the world.
- Filtering updates belief after actions and observations.
- Planning can operate over belief states rather than physical states.
- POMDPs are computationally harder than MDPs because the belief space is continuous and high-dimensional.
- External memory, retrieval, and observation policy can all be seen as ways to improve belief state.

## KB Payoff

- [[agent-memory]] can distinguish provenance stores from belief estimates.
- [[decision-making-under-uncertainty]] gets its hidden-state planning model.
- [[reasoning]] can separate belief update from action selection.

## Source Notes

- [[2026-05-18-algorithms-for-decision-making]]
- [[2026-05-18-decision-making-under-uncertainty]]
- [[2026-05-18-reinforcement-learning-an-introduction]]
- [[2026-05-18-multi-agent-reinforcement-learning]]
- [[2026-05-18-probabilistic-machine-learning-advanced-topics]]

## Related

- [[decision-making-under-uncertainty]]
- [[agent-memory]]
- [[markov-decision-processes]]
- [[planning-and-online-decision-making]]
