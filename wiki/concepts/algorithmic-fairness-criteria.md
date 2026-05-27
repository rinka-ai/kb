---
id: concept-algorithmic-fairness-criteria
type: concept
title: Algorithmic Fairness Criteria
tags: [fairness, machine-learning, classification, bias, accountability]
source_count: 3
summary: Algorithmic fairness criteria formalize non-discrimination goals such as independence, separation, and sufficiency, but these criteria can conflict and do not settle legitimacy by themselves.
canonical_for: [algorithmic fairness criteria, demographic parity, equalized odds, sufficiency, separation]
review_status: reviewed
last_reviewed: 2026-05-18
review_due: 2026-08-18
confidence: "0.82"
---

# Algorithmic Fairness Criteria

## Summary

Algorithmic fairness criteria translate social concerns into statistical constraints on predictions, outcomes, or errors across groups. The core warning from the fairness text is that these criteria are useful but incomplete: they can conflict, depend on measurement choices, and cannot decide legitimacy alone.

## Core Ideas

- Independence asks predictions or decisions to be independent of protected group membership.
- Separation asks predictions to have equal error behavior conditional on true outcomes.
- Sufficiency asks outcomes to be similarly calibrated across groups.
- Criteria can be mathematically incompatible when base rates differ.
- Group fairness does not automatically guarantee individual fairness, recourse, or legitimacy.
- Choosing a fairness criterion is a normative and institutional decision, not only a technical one.

## KB Payoff

- [[fairness-and-ml]] gets its statistical-criteria layer.
- [[ai-validation-and-assurance]] can treat fairness criteria as candidate properties to test.
- [[agent-security]] can include discrimination and recourse risk in the safety surface.

## Source Notes

- [[2026-05-18-fairness-and-machine-learning]]
- [[2026-05-18-probabilistic-machine-learning-advanced-topics]]
- [[2026-05-18-algorithms-for-validation]]

## Related

- [[fairness-and-ml]]
- [[causal-fairness-and-feedback-loops]]
- [[ai-validation-and-assurance]]
- [[monitoring-drift-and-feedback]]
