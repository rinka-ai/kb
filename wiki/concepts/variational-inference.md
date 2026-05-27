---
id: concept-variational-inference
type: concept
title: Variational Inference
tags: [probability, variational-inference, approximate-inference, latent-variable-models, machine-learning]
source_count: 4
summary: Variational inference turns difficult probabilistic inference into optimization by fitting a tractable approximation to an intractable posterior.
canonical_for: [variational inference, approximate inference, ELBO, variational methods]
review_status: reviewed
last_reviewed: 2026-05-18
review_due: 2026-08-18
confidence: "0.78"
---

# Variational Inference

## Summary

Variational inference is the optimization-based answer to hard posterior inference. Instead of sampling indefinitely or computing an exact posterior, it chooses a tractable family of approximate distributions and optimizes the member that best fits the target.

## Core Ideas

- The posterior is often too expensive to compute exactly.
- A variational family defines which approximations are allowed.
- The optimization objective usually trades tractability against fidelity to the true posterior.
- Variational methods connect probabilistic modeling to gradient-based optimization and deep generative models.
- The approximation can be biased by the variational family, so a clean objective does not guarantee faithful uncertainty.

## KB Payoff

- [[probabilistic-machine-learning]] needs this page for approximate inference.
- [[generative-modeling]] uses variational ideas in latent-variable models such as VAEs.
- [[optimization-for-ml]] explains why inference can become an optimization problem.

## Source Notes

- [[2026-05-18-probabilistic-machine-learning-introduction]]
- [[2026-05-18-probabilistic-machine-learning-advanced-topics]]
- [[2026-05-18-deep-learning-goodfellow-bengio-courville]]
- [[2026-05-18-understanding-deep-learning]]

## Related

- [[probabilistic-inference]]
- [[optimization-for-ml]]
- [[generative-modeling]]
- [[deep-learning]]
