---
id: sales-coaching-gpt
type: concept
title: Sales Coaching GPT
tags: [business-strategy, ai-agency, local-business, sales, evals, workflows]
source_count: 2
summary: "A sales-coaching GPT turns consultation recordings or transcripts into rubric-based feedback so local businesses can improve close rate with a standardized, auditable sales process."
canonical_for: [sales coaching GPT, AI sales coaching, sales call grading, sales script rubric, consultation coaching]
review_status: draft
last_reviewed: 2026-05-27
review_due: 2026-06-27
confidence: "0.64"
---

# Sales Coaching GPT

## Summary

The sales-coaching GPT is the least generic pillar in the Middleton offer. Instead of only delivering more leads, the agency helps the client convert the leads by grading consultations against a standard process. The valuable pattern is not "upload calls to AI." It is a coaching loop: define the sales process, collect call evidence, score against a rubric, produce specific feedback, and track whether close rate improves.

This is an eval-like workflow for human sales behavior. It needs calibration, privacy controls, and outcome tracking or it will become theatrical feedback.

## Required Inputs

- A standard sales script or consultation process for the niche.
- A stage-by-stage rubric: discovery, diagnosis, goal clarity, offer fit, objection handling, close, and next steps.
- Example calls or transcripts that represent strong, weak, and borderline execution.
- Consent and disclosure rules for recording, transcription, storage, and coaching use.
- CRM outcome data so feedback can be tied to show rate, close rate, revenue, churn, and refunds.

## Output Shape

- Overall call score and stage-level scores.
- Evidence snippets or paraphrased moments supporting each score.
- Missed questions, weak transitions, unclear claims, and unhandled objections.
- Recommended next practice drill or script revision.
- Manager summary that separates rep behavior from lead quality, offer fit, and price fit.
- Trends across calls, not only one-call judgments.

## Rubric Dimensions

- Rapport: short, human, and not allowed to consume the call.
- Diagnosis: quantified funnel, revenue, costs, staffing, current process, and constraints.
- Problem clarity: buyer understands what is leaking and why it matters.
- Goal clarity: measurable target, timeline, and consequence of no change.
- Pillar fit: each proposed module maps to a real diagnosed gap.
- Proof discipline: claims match evidence, niche, and compliance constraints.
- Objection handling: identifies whether the issue is value, trust, authority, timing, or cash.
- Close clarity: next steps, agreement, onboarding, payment, and handoff are unambiguous.

## Guardrails

- Do not score calls without permission to record and process them.
- Do not let the model invent buyer intent. Feedback should cite observable behavior.
- Do not use one "perfect" script across niches without adapting the economics and buying motion.
- Do not optimize for aggressive closing if the buyer is not a fit.
- Do not treat the model score as truth until it is calibrated against expert review and business outcomes.

## Evidence And Authority

- Evidence status: this topic is mainly transcript-derived. The sales-coaching GPT is plausible as a workflow/eval pattern, but the Middleton video does not independently verify that the model's scores improve close rate.
- AI governance authority: [NIST AI RMF 1.0](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10) is the outside-KB governance anchor: define intended use, manage risk, evaluate trustworthiness, and monitor deployed AI systems.
- Sales coaching evidence: [Salesforce State of Sales 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/reports/sales/salesforce-state-of-sales-report-2026.pdf) is vendor research, but it supports the practical relevance of sales coaching agents, data quality, security concerns, roleplay, and manager-review constraints.
- Internal authority: [[ai-agent-evals]] supplies the KB-specific evaluation discipline: define rubric criteria, preserve evidence, calibrate model judgment, and measure outcomes rather than accepting a score as ground truth.
- Compliance boundary: call recording, transcription, storage, and coaching use need jurisdiction-specific consent and privacy review before deployment. The KB does not yet have a dedicated call-recording compliance source.
- Validation standard: treat the first version as an expert-reviewed coaching assistant. Promote it only after its feedback correlates with human manager review and sales outcomes across enough calls.

## Related

- [[ai-agency-sales-process]]
- [[local-business-ai-acquisition-system]]
- [[speed-to-lead-and-missed-call-recovery]]
- [[ai-agent-evals]]
- [[workflows]]
- [[ai-agency-strategy]]

## Source Notes

- [[2026-02-27-how-i-made-25m-selling-just-one-ai-system]]
- [[2026-04-22-ai-business-zero-employees-jp-middleton]]
- [[2026-05-27-ai-aristotle-agency-build-plan]]
- [[ai-agency-strategy]]
- [[ai-agent-evals]]
