---
id: concept-learning-theory
type: concept
title: Learning Theory
tags: [machine-learning, learning-theory, generalization, pac-learning, model-selection]
source_count: 5
summary: Learning theory explains when empirical learning should generalize, using sample complexity, hypothesis-class capacity, risk decomposition, and regularization rather than training loss alone.
canonical_for: [learning theory, generalization, PAC learning, sample complexity]
review_status: reviewed
last_reviewed: 2026-05-18
review_due: 2026-08-18
confidence: "0.80"
---

# Learning Theory

## Summary

Learning theory is the part of ML that asks why a learner trained on finite data should perform well on unseen data. For this KB, it is the missing bridge between model behavior and evidence: PAC learning, VC dimension, Rademacher complexity, model selection, regularization, and cross-validation give language for generalization instead of treating benchmark scores as magic.

## Core Ideas

- Generalization is the target; empirical fit is only evidence.
- Hypothesis classes differ in capacity, and capacity controls how much data and regularization they need.
- Risk decomposes into approximation, estimation, and optimization errors.
- Cross-validation, structural risk minimization, and regularization are model-selection tools, not mere workflow rituals.
- Distribution shift and data assumptions decide whether a guarantee is meaningful.

## Why It Improves This KB

- [[ai-agent-evals]] needs learning-theory language for overfitting, contamination, and benchmark saturation.
- [[deep-learning]] needs a bridge between training behavior and generalization.
- [[research-workflows]] should treat evidence quality and hypothesis class as part of durable synthesis.

## Child Concepts

- [[generalization-and-model-selection]]

## Source Notes

- [[2026-05-18-foundations-of-machine-learning]]
- [[2026-05-18-probabilistic-machine-learning-introduction]]
- [[2026-05-18-probabilistic-machine-learning-advanced-topics]]
- [[2026-05-18-understanding-deep-learning]]
- [[2026-05-18-deep-learning-goodfellow-bengio-courville]]

## Related

- [[ai-agent-evals]]
- [[deep-learning]]
- [[optimization-for-ml]]
- [[probabilistic-machine-learning]]
- [[generalization-and-model-selection]]
