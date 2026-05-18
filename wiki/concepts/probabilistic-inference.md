---
id: concept-probabilistic-inference
type: concept
title: Probabilistic Inference
tags: [probability, bayesian-inference, graphical-models, uncertainty, machine-learning]
source_count: 6
summary: Probabilistic inference updates uncertain beliefs from evidence, giving ML systems a language for hidden state, missing data, latent variables, and calibrated decisions.
canonical_for: [probabilistic inference, Bayesian inference, posterior inference, uncertainty estimation]
review_status: reviewed
last_reviewed: 2026-05-18
review_due: 2026-08-18
confidence: "0.83"
---

# Probabilistic Inference

## Summary

Probabilistic inference is the process of updating beliefs about unknown quantities after seeing evidence. In the textbook layer it is the common substrate for Bayesian networks, latent-variable models, missing data, belief states, uncertainty estimates, and decision-making under uncertainty.

## Core Ideas

- A probability model separates assumptions, observations, hidden variables, and predictions.
- Bayesian inference updates prior beliefs into posterior beliefs after evidence.
- Exact inference is often intractable, which is why sampling, variational methods, message passing, and approximations matter.
- Graphical models encode conditional independence so inference can exploit structure.
- In deployed AI systems, uncertainty estimates are only useful if downstream decisions know how to use them.

## KB Payoff

- [[agent-memory]] can represent some memory as belief updates rather than static facts.
- [[decision-making-under-uncertainty]] depends on inference before action selection.
- [[rag]] can distinguish retrieved evidence from the model's belief about what the evidence supports.

## Source Notes

- [[2026-05-18-probabilistic-machine-learning-introduction]]
- [[2026-05-18-probabilistic-machine-learning-advanced-topics]]
- [[2026-05-18-algorithms-for-decision-making]]
- [[2026-05-18-decision-making-under-uncertainty]]
- [[2026-05-18-deep-learning-goodfellow-bengio-courville]]
- [[2026-05-18-distributional-reinforcement-learning]]

## Related

- [[probabilistic-machine-learning]]
- [[pomdps-and-belief-states]]
- [[decision-making-under-uncertainty]]
- [[monte-carlo-and-sampling]]
- [[variational-inference]]
