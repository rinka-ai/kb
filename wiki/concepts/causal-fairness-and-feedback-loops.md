---
id: concept-causal-fairness-and-feedback-loops
type: concept
title: Causal Fairness And Feedback Loops
tags: [fairness, causality, feedback-loops, machine-learning, socio-technical-systems]
source_count: 4
summary: Causal fairness and feedback loops focus on how model decisions intervene in the world, reshape future data, and affect agency, recourse, and institutional legitimacy.
canonical_for: [causal fairness, feedback loops, recourse, fairness feedback loops]
review_status: reviewed
last_reviewed: 2026-05-18
review_due: 2026-08-18
confidence: "0.81"
---

# Causal Fairness And Feedback Loops

## Summary

Causal fairness asks how outcomes would change under interventions, not just whether prediction statistics match across groups. Feedback loops ask how deployed model decisions reshape future behavior, data, opportunities, and labels. Together they move fairness from static metrics into socio-technical system design.

## Core Ideas

- Observed correlations can reflect structural conditions rather than individual merit.
- A target variable can be a poor proxy for the real institutional goal.
- Interventions matter: decisions change the world that future models observe.
- Feedback loops can amplify disparities even when a static test looked acceptable.
- Recourse asks whether affected people can understand and change their outcomes.
- Legitimacy depends on governance, accountability, and human agency as well as model accuracy.

## KB Payoff

- [[fairness-and-ml]] gets its causal and deployment layer.
- [[monitoring-drift-and-feedback]] can track social feedback, not only technical drift.
- [[agent-security]] can treat harmful autonomy as a broader safety issue.

## Source Notes

- [[2026-05-18-fairness-and-machine-learning]]
- [[2026-05-18-machine-learning-systems-vol2]]
- [[2026-05-18-probabilistic-machine-learning-advanced-topics]]
- [[2026-05-18-algorithms-for-validation]]

## Related

- [[fairness-and-ml]]
- [[algorithmic-fairness-criteria]]
- [[monitoring-drift-and-feedback]]
- [[ml-systems-engineering]]
