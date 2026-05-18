---
id: concept-reinforcement-learning
type: concept
title: Reinforcement Learning
tags: [machine-learning, reinforcement-learning, mdp, policy-gradient, bandits]
source_count: 7
summary: Reinforcement learning studies agents that learn policies through interaction, delayed reward, value estimation, exploration, and sequential decision-making.
canonical_for: [reinforcement learning, RL, MDPs, policy gradient, temporal difference learning]
review_status: reviewed
last_reviewed: 2026-05-18
review_due: 2026-08-18
confidence: "0.84"
---

# Reinforcement Learning

## Summary

Reinforcement learning is the technical substrate for agents that act over time, though most LLM agents today are not RL systems in the classic sense. RL gives the KB a precise language for environments, states, actions, rewards, policies, value functions, Bellman equations, exploration, temporal-difference learning, and policy improvement.

## Core Ideas

- An RL agent learns from interaction rather than fixed input-output labels.
- Delayed reward makes credit assignment and exploration central.
- MDPs model state, action, transition, reward, and discount structure.
- Value functions and Bellman equations express recursive decision quality.
- Bandits isolate exploration-exploitation without full state dynamics.
- Monte Carlo, dynamic programming, temporal-difference learning, policy gradients, and actor-critic methods are different update families.
- Function approximation makes RL scalable but less stable and harder to validate.

## Agent-System Payoff

- [[agent-memory]] can distinguish learned internal state from external file-backed memory.
- [[multi-agent-systems]] should not conflate LLM subagents with RL agents.
- [[decision-making-under-uncertainty]] supplies the planning and belief-state counterpart to model-free RL.

## Child Concepts

- [[bandits-and-exploration]]
- [[markov-decision-processes]]
- [[temporal-difference-and-value-learning]]
- [[policy-gradients-and-actor-critic]]
- [[distributional-reinforcement-learning]]
- [[multi-agent-reinforcement-learning]]

## Source Notes

- [[2026-05-18-reinforcement-learning-an-introduction]]
- [[2026-05-18-algorithms-for-decision-making]]
- [[2026-05-18-decision-making-under-uncertainty]]
- [[2026-05-18-distributional-reinforcement-learning]]
- [[2026-05-18-multi-agent-reinforcement-learning]]
- [[2026-05-18-probabilistic-machine-learning-advanced-topics]]
- [[2026-05-18-understanding-deep-learning]]

## Related

- [[decision-making-under-uncertainty]]
- [[distributional-reinforcement-learning]]
- [[multi-agent-reinforcement-learning]]
- [[agent-memory]]
- [[bandits-and-exploration]]
- [[markov-decision-processes]]
- [[temporal-difference-and-value-learning]]
- [[policy-gradients-and-actor-critic]]
