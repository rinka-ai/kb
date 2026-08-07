---
id: token-launchpad-microstructure
type: concept
title: "Token Launchpad Microstructure"
tags: [token-launchpads, bonding-curves, solana, market-microstructure, meme-coins, defi]
summary: "Bonding-curve launchpads convert token creation into a sub-1% lottery whose outcome is best predicted by accumulation velocity, and whose migration step creates a depth discontinuity that makes pre-graduation dumping structurally rational."
source_count: 3
canonical_for: [bonding curve launchpad, pump.fun graduation, token launch base rates, accumulation velocity]
review_status: reviewed
last_reviewed: 2026-08-07
review_due: 2026-11-07
confidence: "0.80"
---

# Token Launchpad Microstructure

## Summary

A bonding-curve launchpad bootstraps liquidity along a deterministic price curve and promotes a token to a real on-chain pool once enough capital accumulates. That promotion — graduation — is a platform-defined success label, which makes these venues unusually clean to study: the outcome is observable, the population is complete, and the mechanism is public.

## Mechanism

```text
token creation (permissionless, near-zero cost)
        ↓
virtual bonding curve accumulates vSol
        ↓
threshold reached → graduation
        ↓
migration to real on-chain liquidity pool
```

The migration step introduces a **depth discontinuity**. Liquidity conditions change abruptly at graduation, and that discontinuity incentivises selling before the transition. Pre-graduation dumping is therefore a structural property of the mechanism, not only a behavioural failing of participants.

## Base Rates

Of 655,770 tokens created on pump.fun in September 2025, 4,338 graduated — **0.63%**. Any claim about launchpad tokens that does not begin from a sub-1% base rate is assuming survivorship. Separately, 92.22% of tokens reaching at least 30 swaps show a detectable dump event.

## What Predicts Graduation

- **Accumulation velocity dominates.** Reaching a given vSol level in fewer trades implies a substantially higher graduation probability than reaching it slowly. This is a velocity signal rather than a size signal, and it is computable in real time.
- **Bot share is negative.** High bot-share launches graduate less often beyond intermediate curve stages, read as algorithmic flow lacking sustained commitment. Note the instrument is coarse: bots are identified by transaction routing, not behaviour.
- **Creator and trader identity are weak.** Prolific creators help only at high vSol; historically profitable traders give a modest, non-monotonic uplift. Both suffer small-sample support.
- Conditioning on these behavioural variables measurably beats conditioning on accumulated vSol alone.

## Expected Value

Most conditional graduation-probability curves sit **below** the naive buy-and-hold breakeven threshold (vSol²/115²), except at advanced curve stages. Early purchase is negative-expectancy under this simplified model — and the model excludes protocol and gas fees, so the real threshold is worse.

## Relationship To Manipulation

Launchpads are the cheapest available venue for manufacturing apparent demand, so launch microstructure and [[onchain-market-manipulation]] are the same subject viewed from two ends. Coordinated cohorts lift first-30-minute buyer counts by a contamination-adjusted +16.1%, while bot-heavy flow *reduces* graduation odds. Early attention and eventual success are distinct outcomes and move in opposite directions under algorithmic flow.

## Generalisation Limits

Every quantitative result here is pump.fun-specific, drawn from single-month or fortnight windows. The 0.63% rate reflects that platform's curve parameterisation. Transfer to other launchpads is explicitly unvalidated by the source work.

## Source Notes

- [[2026-02-16-predicting-the-success-of-new-crypto-tokens-the-pump-fun-case]]
- [[2026-07-02-coordinated-sniper-cohorts-on-pump-fun]]
- [[2025-04-16-a-midsummer-memes-dream-market-manipulations-in-the-meme-coin-ecosystem]]

## Open Questions

- Does the negative bot-share effect survive a behavioural bot classifier rather than a routing-based one?
- Are accumulation velocity and sniper-cohort co-firing measuring the same underlying phenomenon from two directions?
- How much of the 92.22% dump prevalence is mechanical exit ahead of the depth discontinuity versus coordinated extraction?
- Does cohort persistence extend beyond a 13.4-day window, or are rings continuously re-formed under fresh addresses?
- What curve parameterisation, if any, would remove the incentive to exit before migration?
