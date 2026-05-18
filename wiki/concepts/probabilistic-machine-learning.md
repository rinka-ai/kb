---
id: concept-probabilistic-machine-learning
type: concept
title: Probabilistic Machine Learning
tags: [machine-learning, probability, bayesian-inference, uncertainty, graphical-models]
source_count: 6
summary: Probabilistic machine learning treats uncertainty, latent structure, missing information, and prediction as first-class modeling problems.
canonical_for: [probabilistic machine learning, Bayesian ML, uncertainty modeling, probabilistic modeling]
review_status: reviewed
last_reviewed: 2026-05-18
review_due: 2026-08-18
confidence: "0.83"
---

# Probabilistic Machine Learning

## Summary

Probabilistic ML gives the KB a language for uncertainty. Instead of treating model outputs as simple predictions, it models random variables, latent causes, parameters, observations, and decisions. This matters for agents because memory, planning, retrieval confidence, fairness, and evaluation all involve uncertainty rather than fixed facts.

## Core Ideas

- Probability is a modeling language for uncertainty, not just a scoring trick.
- Bayesian inference separates prior assumptions, evidence, posterior beliefs, and prediction.
- Graphical models encode conditional structure and make inference questions explicit.
- Latent-variable models explain hidden structure behind observed data.
- Approximate inference is central because exact reasoning is often too expensive.
- Probabilistic and deep-learning traditions now overlap through deep generative and Bayesian neural methods.

## KB Payoff

- [[agent-memory]] can borrow belief-state and uncertainty language.
- [[rag]] can represent retrieval confidence and source uncertainty more cleanly.
- [[decision-making-under-uncertainty]] and [[reinforcement-learning]] depend on probabilistic state and transition models.

## Child Concepts

- [[probabilistic-inference]]
- [[monte-carlo-and-sampling]]
- [[variational-inference]]
- [[generative-modeling]]

## Source Notes

- [[2026-05-18-probabilistic-machine-learning-introduction]]
- [[2026-05-18-probabilistic-machine-learning-advanced-topics]]
- [[2026-05-18-algorithms-for-decision-making]]
- [[2026-05-18-decision-making-under-uncertainty]]
- [[2026-05-18-deep-learning-goodfellow-bengio-courville]]
- [[2026-05-18-foundations-of-machine-learning]]

## Related

- [[decision-making-under-uncertainty]]
- [[deep-learning]]
- [[reinforcement-learning]]
- [[agent-memory]]
- [[rag]]
- [[probabilistic-inference]]
- [[monte-carlo-and-sampling]]
- [[variational-inference]]
- [[generative-modeling]]
