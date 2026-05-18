---
id: concept-falsification-and-robustness-testing
type: concept
title: Falsification And Robustness Testing
tags: [validation, robustness, falsification, testing, safety]
source_count: 5
summary: Falsification and robustness testing search for counterexamples, disturbances, and failure modes instead of only estimating average benchmark performance.
canonical_for: [falsification, robustness testing, adversarial testing, validation testing]
review_status: reviewed
last_reviewed: 2026-05-18
review_due: 2026-08-18
confidence: "0.82"
---

# Falsification And Robustness Testing

## Summary

Falsification asks: can we find a case where the system violates a desired property? Robustness testing asks how behavior changes under perturbations, distribution shift, adversarial inputs, and operational stress. This is the textbook-backed upgrade to evals as scoreboards.

## Core Ideas

- Validation should specify properties before searching for failures.
- Falsification can be framed as optimization over inputs, disturbances, or scenarios.
- Fuzzing explores unexpected cases without hand-writing every test.
- Robustness includes input perturbations, model uncertainty, environment shifts, and system-level failures.
- Average success can hide rare but unacceptable failures.
- The output of falsification is evidence and counterexamples, not just a scalar score.

## KB Payoff

- [[ai-validation-and-assurance]] gets its failure-search mechanism.
- [[agent-security]] can treat prompt injection and tool misuse as property violations.
- [[ai-agent-evals]] can distinguish benchmarks from adversarial or assurance testing.

## Source Notes

- [[2026-05-18-algorithms-for-validation]]
- [[2026-05-18-machine-learning-systems-vol1]]
- [[2026-05-18-machine-learning-systems-vol2]]
- [[2026-05-18-fairness-and-machine-learning]]
- [[2026-05-18-algorithms-for-decision-making]]

## Related

- [[ai-validation-and-assurance]]
- [[ai-agent-evals]]
- [[agent-security]]
- [[generalization-and-model-selection]]
