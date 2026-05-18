---
id: concept-planning-and-online-decision-making
type: concept
title: Planning And Online Decision-Making
tags: [planning, decision-making, reinforcement-learning, online-planning, uncertainty]
source_count: 5
summary: Planning and online decision-making choose actions by reasoning over models, simulations, beliefs, and future consequences before or during execution.
canonical_for: [planning, online planning, sequential decision-making, model-based planning]
review_status: reviewed
last_reviewed: 2026-05-18
review_due: 2026-08-18
confidence: "0.80"
---

# Planning And Online Decision-Making

## Summary

Planning uses a model of actions and consequences to choose what to do. Online decision-making performs some of that reasoning at execution time, adapting to observations, uncertainty, and resource limits. In agent systems, this helps separate planning as a decision process from "longer chain of thought" as a prompt behavior.

## Core Ideas

- A plan is useful only relative to a model, objective, and uncertainty state.
- Offline planning computes policy or value before execution.
- Online planning spends compute at decision time to adapt to the current state or belief.
- Model-based methods use transition and observation models; model-free methods learn action choices from experience.
- Planning under uncertainty often trades optimality for tractable approximations.
- Human approval and tool availability can be modeled as execution constraints.

## KB Payoff

- [[reasoning]] gets a cleaner split between deliberation, belief update, utility, and action choice.
- [[agent-harnesses]] can treat planning as a runtime capability with budget and state.
- [[decision-making-under-uncertainty]] supplies the formal frame.

## Source Notes

- [[2026-05-18-algorithms-for-decision-making]]
- [[2026-05-18-decision-making-under-uncertainty]]
- [[2026-05-18-reinforcement-learning-an-introduction]]
- [[2026-05-18-multi-agent-reinforcement-learning]]
- [[2026-05-18-probabilistic-machine-learning-advanced-topics]]

## Related

- [[decision-making-under-uncertainty]]
- [[reasoning]]
- [[agent-harnesses]]
- [[pomdps-and-belief-states]]
