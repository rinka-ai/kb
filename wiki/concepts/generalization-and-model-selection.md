---
id: concept-generalization-and-model-selection
type: concept
title: Generalization And Model Selection
tags: [machine-learning, generalization, model-selection, regularization, learning-theory]
source_count: 5
summary: Generalization and model selection explain how to choose models that perform beyond the training set by managing capacity, validation evidence, and regularization.
canonical_for: [generalization, model selection, regularization, cross-validation, overfitting]
review_status: reviewed
last_reviewed: 2026-05-18
review_due: 2026-08-18
confidence: "0.82"
---

# Generalization And Model Selection

## Summary

Generalization is the reason machine learning is not just curve fitting. A model that minimizes training loss can still fail if the hypothesis class is too flexible, the validation protocol is weak, or the deployment distribution differs from the data used to choose it. Model selection is the practical discipline that turns this into choices about capacity, regularization, cross-validation, and held-out evidence.

## Core Ideas

- Training error is evidence, not the final target.
- Generalization depends on the data distribution, hypothesis class, loss, sample size, and model-selection procedure.
- The estimation/approximation tradeoff is central: simpler models can underfit, while more flexible models can overfit.
- Regularization controls the effective hypothesis class, not only the numerical size of parameters.
- Cross-validation estimates out-of-sample behavior but can still be misused if it leaks preprocessing, tuning, or repeated selection.
- Benchmark overfitting is the agent-eval version of the same problem.

## KB Payoff

- [[learning-theory]] gives the formal frame.
- [[deep-learning]] needs this page to avoid treating scale as a substitute for generalization reasoning.
- [[ai-agent-evals]] can use this page when discussing benchmark saturation, contamination, and eval-aware systems.

## Source Notes

- [[2026-05-18-foundations-of-machine-learning]]
- [[2026-05-18-probabilistic-machine-learning-introduction]]
- [[2026-05-18-understanding-deep-learning]]
- [[2026-05-18-deep-learning-goodfellow-bengio-courville]]
- [[2026-05-18-machine-learning-systems-vol1]]

## Related

- [[learning-theory]]
- [[ai-agent-evals]]
- [[deep-learning]]
- [[falsification-and-robustness-testing]]
