---
id: article-2026-07-02-coordinated-sniper-cohorts-on-pump-fun
type: source
title: "Coordinated Sniper Cohorts on Pump.fun: Detection of 1,012 Persistent Wallet Rings and a Contamination-Adjusted Estimate of Coordination-Specific First-Hour Buyer-Flow Lift"
path: raw/articles/arxiv/2026-07-02-coordinated-sniper-cohorts-on-pump-fun.md
author: Arati Uday Kamat
publisher: arXiv.org
url: https://arxiv.org/abs/2607.02795
date_published: 2026-07-02
date_added: 2026-08-07
tags: [solana, market-microstructure, market-manipulation, token-launchpads, wallet-clustering, causal-inference, defi, papers]
status: active
quality: medium
summary: "A single-author Solana pump.fun study detects 1,012 persistent co-firing wallet cohorts across 166,098 launches and shows that a naive +130.9% coordination effect collapses to a contamination-adjusted +16.1% buyer-count lift with a null SOL-inflow effect, making it as much a lesson in on-chain causal measurement as a manipulation finding."
related: [onchain-market-manipulation, token-launchpad-microstructure, proprietary-automated-market-makers]
---

# Coordinated Sniper Cohorts on Pump.fun: Detection of 1,012 Persistent Wallet Rings and a Contamination-Adjusted Estimate of Coordination-Specific First-Hour Buyer-Flow Lift

## Source Metadata

- Path: raw/articles/arxiv/2026-07-02-coordinated-sniper-cohorts-on-pump-fun.md
- Author: Arati Uday Kamat
- Published: 2026-07-02 (v1); 2026-08-03 (v3, current)
- Publisher: arXiv.org
- URL: https://arxiv.org/abs/2607.02795
- PDF: https://arxiv.org/pdf/2607.02795v3
- DOI: https://doi.org/10.48550/arXiv.2607.02795
- Companion dataset: https://doi.org/10.5281/zenodo.20978741

## TL;DR

The paper asks whether persistent coordinated wallets *causally* raise first-hour buyer flow on Solana's pump.fun bonding-curve marketplace. It detects 1,012 persistent cohorts that systematically co-fire as early buyers, then spends most of its effort destroying its own headline number. The naive pooled contrast is +130.9%; roughly half of that is arithmetic contamination from counting the cohort's own buys in the outcome, and most of the rest is absorbed by matching on launch quality. What survives is a +16.1% first-30-minute buyer-count lift and a SOL-inflow effect indistinguishable from zero. The most transferable contribution is the measurement discipline, not the effect size.

## Key Claims

- Persistent coordinated wallet rings are detectable at scale on pump.fun: 1,012 cohorts spanning 2,965 addresses, with cohort sizes from 2 to 12 wallets.
- Detection is two-stage: intra-launch extraction of a first-buyer window, then cross-launch surfacing of persistent cohorts using union-find over a co-occurrence graph.
- The naive same-universe pooled contrast of +130.9% is mostly an artifact. Excluding cohort wallets' own buyer events from the outcome drops it to +63.9%.
- After 1:1 nearest-neighbour propensity-score matching on ten launch-quality covariates, the coordination-specific effect is a first-30-minute buyer-count lift of +16.1% (95% CI [+13.0%, +19.4%]) across 5,419 matched pairs.
- The corresponding SOL-inflow lift is +6.3% (95% CI [-0.5%, +15.1%]) and is not distinguishable from zero. Coordination attracts *counts* of buyers more clearly than it attracts *capital*.
- The paper's own activity-matched placebo is biased: across 100 seeds it produced a median lift of +189.6%, above zero and above the real estimate in 100 out of 100 seeds. The author keeps it as a bias diagnostic rather than as validation.
- 382 of the 5,419 treated launches (7.0%) had zero non-cohort buyers in the first 30 minutes — coordination sometimes attracts no external flow at all.
- The framing is deliberately borrowed from established literature: Kyle (1985) on informed order flow and Meiklejohn et al. (2013) on wallet clustering.

## Important Details

- Data: 1,578,333 buyer observations from 166,098 launches over 13.4 days, 2026-06-11 to 2026-06-25.
- Matching design cites Rosenbaum and Rubin (1983) and uses a 0.2-SD caliper on ten launch-quality covariates. The abstract does not enumerate the ten covariates; read the PDF before reusing the specification.
- v3 is a major revision made in response to a "BCRA critique + 360-audit". The contamination-adjusted estimate replaces the naive headline, the placebo is reframed as a bias diagnostic, and the title itself was changed to foreground contamination adjustment.
- The released artifact `RED-COHORT-2026-v1` (CC-BY-4.0) contains the full cohort catalogue, detection code, the PSM script, and robustness artefacts.
- Subjects: Trading and Market Microstructure (q-fin.TR, primary), Computational Finance (q-fin.CP), Statistical Finance (q-fin.ST).
- 30 pages, 8 figures.
- The observation window is short — 13.4 days — so cohort persistence is established within a fortnight, not across a market cycle.
- Single-author preprint. The self-critical revision history is a positive signal about method, not a substitute for peer review.

## Entities

- People: Arati Uday Kamat; Albert S. Kyle (cited, 1985); Sarah Meiklejohn et al. (cited, 2013); Paul Rosenbaum and Donald Rubin (cited, 1983)
- Platforms: Solana, pump.fun
- Methods: union-find over co-occurrence graphs, propensity-score matching, nearest-neighbour caliper matching, contamination-adjusted estimation, activity-matched placebo
- Artifacts: RED-COHORT-2026-v1, Zenodo 10.5281/zenodo.20978741

## My Notes

- The durable lesson is not "coordination lifts flow by 16%". It is that on-chain effect estimates are contaminated by construction when the treated actors' own transactions are inside the outcome variable. Any detector that counts wallet activity as evidence of market interest inherits this bug.
- The gap between +130.9% and +16.1% is roughly an order of magnitude of over-claiming, produced without fraud, purely by not excluding the treatment group from the outcome. Most informal on-chain "alpha" analysis makes exactly this mistake.
- The 100/100-seed placebo failure is the most useful negative result in the paper. A placebo that always fires is not a validation instrument; the author is right to demote it rather than delete it.
- The buyer-count-versus-SOL-inflow split matters for anyone building signals: coordination is far more visible in participant counts than in capital committed. A signal trained on counts will detect coordination; a signal trained on volume mostly will not.
- 7.0% of treated launches drawing zero external buyers is a reminder that a lot of coordinated activity is talking to itself.

## Open Questions

- Which of the ten launch-quality covariates carry the matching, and how much of the remaining +16.1% survives a specification that swaps them out?
- Does cohort persistence hold beyond a 13.4-day window, or are these rings short-lived and continuously re-formed under new addresses?
- Union-find over co-occurrence collapses transitive links; how many of the 1,012 cohorts are genuine rings versus incidental co-firing by unrelated bots reacting to the same public trigger?
- Would the same contamination adjustment change published estimates in the adjacent wash-trading and pump-and-dump literature, where treated-actor volume is routinely inside the outcome?
- Is a +16.1% buyer-count lift with a null capital effect economically meaningful to anyone but the cohort itself?

## Related

- [[onchain-market-manipulation]]
- [[token-launchpad-microstructure]]
- [[proprietary-automated-market-makers]]
- [[2026-02-16-predicting-the-success-of-new-crypto-tokens-the-pump-fun-case]]
- [[2025-04-16-a-midsummer-memes-dream-market-manipulations-in-the-meme-coin-ecosystem]]

## Source Text

Title: Coordinated Sniper Cohorts on Pump.fun: Detection of 1,012 Persistent Wallet Rings and a Contamination-Adjusted Estimate of Coordination-Specific First-Hour Buyer-Flow Lift

Authors: Arati Uday Kamat

Submitted: 2 July 2026 (v1); 3 August 2026 (v3)

Abstract: Motivated by Kyle (1985) informed order flow and the Meiklejohn et al. (2013) wallet-clustering tradition, we ask whether persistent coordinated wallets causally raise first-hour buyer flow on the Solana pump.fun bonding-curve marketplace. Using 1,578,333 buyer observations from 166,098 launches over 13.4 days (2026-06-11 to 2026-06-25), a two-stage detection pipeline (intra-launch first-buyer-window extraction plus cross-launch persistent-cohort surfacing via union-find on co-occurrence graphs) identifies 1,012 persistent wallet cohorts (2 to 12 wallets, 2,965 addresses) that systematically co-fire as early buyers. Under a contamination-adjusted estimator excluding cohort wallets' own buyer events from the outcome, 1:1 nearest-neighbour propensity-score matching with a 0.2-SD caliper on ten launch-quality covariates (Rosenbaum-Rubin, 1983) yields a first-30-minute buyer-count lift of +16.1% (95% CI [+13.0%, +19.4%]) on 5,419 matched pairs; the corresponding SOL-inflow lift is +6.3% ([-0.5%, +15.1%]), not distinguishable from zero. The naive contaminated same-universe pooled contrast is +130.9%; approximately half is arithmetic contamination from cohort wallets' own buys in the outcome (dropping to +63.9% after cohort exclusion), and most of the remainder is absorbed by PSM on launch-quality covariates. A parallel activity-matched placebo across 100 seeds produces lifts with median +189.6%, above zero and above the real lift in 100/100 seeds, indicating the placebo estimator is biased; we retain it as a bias diagnostic. Of 5,419 treated launches, 382 (7.0%) had zero non-cohort buyers in the first 30 minutes. We release the full cohort catalogue, detection code, PSM script, and robustness artefacts as RED-COHORT-2026-v1 under CC-BY-4.0.

Comments: 30 pages, 8 figures. v3 = major revision (BCRA critique + 360-audit): contamination-adjusted 1:1 PSM headline (+16.1% [+13.0%, +19.4%] buyer count; +6.3% [-0.5%, +15.1%] SOL, null) replaces naive +130.9%; 100-seed placebo reframed as bias diagnostic (median +189.6%, above real lift in 100/100 seeds); title reflects contamination-adjustment framing. Companion Zenodo 10.5281/zenodo.20978741

Subjects: Trading and Market Microstructure (q-fin.TR); Computational Finance (q-fin.CP); Statistical Finance (q-fin.ST)

Cite as: arXiv:2607.02795 [q-fin.TR]

DOI: https://doi.org/10.48550/arXiv.2607.02795

Submission history: [v1] Thu, 2 Jul 2026 22:13:51 UTC; [v3] Mon, 3 Aug 2026 20:34:46 UTC

Full PDF not copied locally. Use the arXiv page and PDF URL above for the complete paper.
