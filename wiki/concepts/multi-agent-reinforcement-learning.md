---
id: concept-multi-agent-reinforcement-learning
type: concept
title: Multi-Agent Reinforcement Learning
tags: [multi-agent, reinforcement-learning, game-theory, stochastic-games, coordination]
source_count: 4
summary: Multi-agent reinforcement learning studies learning agents in shared environments where strategic interaction, nonstationarity, coordination, communication, and partial observability matter.
canonical_for: [multi-agent reinforcement learning, MARL, stochastic games, multi-agent RL]
review_status: reviewed
last_reviewed: 2026-05-18
review_due: 2026-08-18
confidence: "0.80"
---

# Multi-Agent Reinforcement Learning

## Summary

Multi-agent reinforcement learning is not the same thing as LLM subagents. MARL studies agents that learn in shared environments where other learners change the dynamics. The core models are games, stochastic games, and partially observable stochastic games; the core difficulties are nonstationarity, coordination, communication, credit assignment, and decentralized execution.

## Core Ideas

- Other agents make the environment strategic and often nonstationary.
- Game theory supplies equilibrium and interaction models.
- Stochastic games generalize MDPs to multiple decision-makers.
- Partial observability introduces beliefs, communication, and decentralized information.
- Centralized training/decentralized execution separates learning access from deployment access.
- Evaluation needs interaction-aware baselines and learning curves.

## KB Payoff

- [[multi-agent-systems]] should clearly separate MARL from LLM-agent orchestration.
- [[reinforcement-learning]] provides the single-agent base.
- [[decision-making-under-uncertainty]] provides the belief/planning base.

## Source Notes

- [[2026-05-18-multi-agent-reinforcement-learning]]
- [[2026-05-18-algorithms-for-decision-making]]
- [[2026-05-18-decision-making-under-uncertainty]]
- [[2026-05-18-distributional-reinforcement-learning]]

## Related

- [[multi-agent-systems]]
- [[reinforcement-learning]]
- [[decision-making-under-uncertainty]]
- [[distributional-reinforcement-learning]]
