---
id: concept-neural-network-architectures
type: concept
title: Neural Network Architectures
tags: [deep-learning, neural-networks, transformers, convolutional-networks, graph-neural-networks]
source_count: 5
summary: Neural network architectures encode inductive biases through composition, convolution, recurrence, attention, graph structure, residual paths, and latent-variable structure.
canonical_for: [neural network architectures, CNNs, RNNs, transformers, graph neural networks]
review_status: reviewed
last_reviewed: 2026-05-18
review_due: 2026-08-18
confidence: "0.82"
---

# Neural Network Architectures

## Summary

Architecture is how a neural network encodes assumptions about the task. The textbook corpus treats architecture as more than layer count: it is the design of computation, parameter sharing, information flow, state, attention, graph structure, and generation.

## Core Ideas

- Feedforward networks compose nonlinear transformations.
- Convolutional networks use locality and weight sharing.
- Recurrent networks and sequence models process ordered state over time.
- Attention and transformers route information dynamically across tokens or elements.
- Residual paths, normalization, and skip connections improve trainability.
- Graph neural networks encode relational structure.
- Architecture choices interact with data, loss, optimization, and deployment constraints.

## KB Payoff

- [[deep-learning]] gets a reusable architecture map.
- [[ml-systems-engineering]] can connect architecture to latency, memory, and throughput.
- [[embeddings]] can be understood as learned representations produced by architecture and training.

## Source Notes

- [[2026-05-18-understanding-deep-learning]]
- [[2026-05-18-deep-learning-goodfellow-bengio-courville]]
- [[2026-05-18-probabilistic-machine-learning-advanced-topics]]
- [[2026-05-18-machine-learning-systems-vol1]]
- [[2026-05-18-machine-learning-systems-vol2]]

## Related

- [[deep-learning]]
- [[neural-network-training]]
- [[embeddings]]
- [[generative-modeling]]
