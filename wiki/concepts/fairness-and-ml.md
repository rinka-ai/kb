---
id: concept-fairness-and-ml
type: concept
title: Fairness and ML
tags: [fairness, machine-learning, causality, accountability, bias]
source_count: 6
summary: Fairness and ML is a socio-technical discipline about measurement, legitimacy, classification criteria, causality, recourse, feedback loops, and institutional context.
canonical_for: [fairness in machine learning, algorithmic fairness, ML fairness, bias and ML]
review_status: reviewed
last_reviewed: 2026-07-31
review_due: 2026-10-31
confidence: "0.84"
---

# Fairness and ML

## Summary

Fairness and ML keeps the KB honest about socio-technical risk. The strongest lesson from the textbook corpus is that fairness is not reducible to one metric or classifier constraint. Measurement, goals, groups, institutions, causality, feedback, agency, and recourse shape whether an ML system is legitimate.

## Core Ideas

- Measurement choices can encode harm before a model is trained.
- Target variables can mismatch the real institutional goal.
- Statistical non-discrimination criteria such as independence, separation, and sufficiency can conflict.
- Causal framing helps ask whether interventions change outcomes or only predictions.
- Feedback loops can make deployed models reshape the population they score.
- Recourse and agency matter because model decisions affect people, not only datasets.

## Interaction-Layer Fairness Review

[[2019-05-02-guidelines-for-human-ai-interaction]] adds a limited but practical interface-level check: inspect whether AI language and behavior match relevant social contexts without reinforcing stereotypes or exclusion. Its study also shows why a homogeneous heuristic review is weak evidence. Participants disagreed about whether bias was present in the same product categories, while other evaluators surfaced gender-role defaults, disability assumptions, and failures on non-Western names.

The transferable lesson is procedural: include disabled and culturally diverse evaluators, record concrete applications and violations, and use specialized fairness/accessibility methods where appropriate. The limitation is equally important: the paper says its guidelines only begin to address ethics. Passing an interface-level “mitigate social biases” check does not establish fair outcomes, legitimate targets, recourse, privacy, or acceptable institutional impact.

## KB Payoff

- [[agent-security]] should include social and institutional safety, not only prompt injection.
- [[ai-validation-and-assurance]] needs fairness and legitimacy properties.
- [[ml-systems-engineering]] should include governance and monitoring for disparate impact.

## Child Concepts

- [[algorithmic-fairness-criteria]]
- [[causal-fairness-and-feedback-loops]]

## Source Notes

- [[2026-05-18-fairness-and-machine-learning]]
- [[2026-05-18-machine-learning-systems-vol2]]
- [[2026-05-18-machine-learning-systems-vol1]]
- [[2026-05-18-probabilistic-machine-learning-advanced-topics]]
- [[2026-05-18-algorithms-for-validation]]
- [[2019-05-02-guidelines-for-human-ai-interaction]]

## Related

- [[agent-security]]
- [[ai-validation-and-assurance]]
- [[ml-systems-engineering]]
- [[probabilistic-machine-learning]]
- [[algorithmic-fairness-criteria]]
- [[causal-fairness-and-feedback-loops]]
