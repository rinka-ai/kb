---
id: concept-generative-modeling
type: concept
title: Generative Modeling
tags: [generative-models, deep-learning, latent-variable-models, diffusion, probabilistic-modeling]
source_count: 5
summary: Generative modeling learns data distributions or simulators, connecting latent-variable models, autoregressive models, VAEs, GANs, flows, and diffusion models.
canonical_for: [generative models, generative modeling, VAEs, GANs, diffusion models, normalizing flows]
review_status: reviewed
last_reviewed: 2026-05-18
review_due: 2026-08-18
confidence: "0.81"
---

# Generative Modeling

## Summary

Generative modeling asks a model to learn how data could have been produced. In the textbooks, generative models connect classical probabilistic modeling with modern deep learning: latent variables, autoregressive factorization, variational autoencoders, GANs, normalizing flows, diffusion models, and energy-based views.

## Core Ideas

- A generative model represents a distribution over observations, not only a discriminative boundary.
- Latent variables explain hidden factors behind observed data.
- Autoregressive models decompose generation into conditional prediction steps.
- VAEs combine latent-variable modeling with variational inference.
- GANs frame generation as an adversarial learning problem.
- Normalizing flows use invertible transformations for tractable density modeling.
- Diffusion models learn to reverse a corruption or noise process.

## KB Payoff

- [[deep-learning]] needs this page for modern model families.
- [[probabilistic-machine-learning]] explains the uncertainty and latent-variable foundations.
- [[ml-systems-engineering]] adds serving, cost, and deployment constraints for generative systems.

## Source Notes

- [[2026-05-18-understanding-deep-learning]]
- [[2026-05-18-deep-learning-goodfellow-bengio-courville]]
- [[2026-05-18-probabilistic-machine-learning-introduction]]
- [[2026-05-18-probabilistic-machine-learning-advanced-topics]]
- [[2026-05-18-machine-learning-systems-vol2]]

## Related

- [[deep-learning]]
- [[probabilistic-machine-learning]]
- [[variational-inference]]
- [[neural-network-architectures]]
