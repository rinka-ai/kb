---
id: marketing-measurement
type: concept
title: Marketing Measurement
tags: [paid-growth, marketing-measurement, attribution, incrementality, experiments, roas]
source_count: 5
summary: Marketing measurement separates optimization, attribution, funnel quality, and causal incrementality so paid growth decisions are not overfit to platform dashboards.
canonical_for: [marketing measurement, incrementality, conversion lift, ROAS, attribution, paid media measurement]
review_status: draft
last_reviewed: 2026-05-27
review_due: 2026-06-27
confidence: "0.82"
---

# Marketing Measurement

## Summary

Marketing measurement is the discipline of asking the right question with the right method. A campaign can look good in a platform dashboard and still be non-incremental; a creative can have high CTR and still produce low-quality leads; a lift study can be unbiased and still too noisy for a small account.

## Four Questions

- Operations: Is the campaign delivering, spending, and tracking correctly?
- Optimization: Which signals help the platform find better converters?
- Funnel quality: Are clicks becoming qualified leads, purchases, retention, or revenue?
- Incrementality: What happened because of the ads that would not have happened otherwise?

Confusing these questions creates fake confidence.

## Platform Metrics

Meta and Google dashboards are useful for pacing, diagnostics, creative comparison, and optimization. They are not a complete causal measurement system.

Useful dashboard reads:

- CPM, CPC, CTR, hook rate, thumb-stop rate
- conversion rate by landing page
- cost per lead or purchase
- asset and combination reports
- conversion event quality
- funnel-stage dropoff
- creative fatigue signals

But attribution can over-credit ads that reached people who would have converted anyway.

## Incrementality

Google Conversion Lift and Meta lift-style measurement use treatment and holdback logic to estimate causal lift. The clean idea is simple: compare people or geographies eligible to see ads with comparable people or geographies held back from ads.

The hard part is power. Lewis and Rao show that even large advertising experiments can have wide ROI confidence intervals because purchase behavior is noisy relative to per-person ad cost.

## Practical Protocol

For small teams:

- keep event tracking clean before interpreting creative tests
- separate prospecting, retargeting, and branded search reads
- compare platform data with CRM, ecommerce, or revenue data
- use holdout or geo tests when spend and volume permit
- treat dashboard ROAS as directional, not truth
- log test hypotheses before launch
- avoid killing creative before enough conversion lag has passed

## Related

- [[paid-growth]]
- [[meta-ads]]
- [[google-ads]]
- [[performance-creative]]
- [[content-creation-strategy]]

## Source Notes

- [[2026-05-27-meta-performance-5]]
- [[2026-05-27-meta-conversions-api]]
- [[2026-05-27-google-conversion-lift]]
- [[2026-05-27-lewis-rao-advertising-measurement-roi]]
- [[2026-05-27-cmi-b2b-content-marketing-2025]]
