---
id: proprietary-automated-market-makers
type: concept
title: "Proprietary Automated Market Makers"
tags: [prop-amm, automated-market-makers, solana, market-microstructure, market-structure, defi]
summary: "Proprietary AMMs are automated principal dealers combining private fair-value and inventory models with compact onchain state, deterministic settlement, and aggregator distribution."
source_count: 4
canonical_for: [proprietary AMM, prop AMM, Solana prop AMM]
review_status: reviewed
last_reviewed: 2026-08-01
review_due: 2026-10-01
confidence: "0.88"
---

# Proprietary Automated Market Makers

## Summary

A proprietary AMM is an onchain principal-liquidity venue whose operator actively controls inventory and executable pricing through a proprietary, frequently refreshed model. It is better modeled as an automated dealer than a passive reserve curve.

## Canonical Architecture

```text
market/oracle/CEX data
        ↓
offchain fair-value + inventory + toxicity + hedge engine
        ↓
signed compact onchain parameters with sequence and expiry
        ↓
deterministic atomic quote/swap kernel
        ↓
router selection → landing → hedge → reconciliation
```

## Economic Thesis

A prop AMM tries to reduce passive stale-price arbitrage and loss-versus-rebalancing with fast recentering, dynamic spreads, inventory skew, flow segmentation, and hedging. It replaces passive mechanism risk with model, latency, oracle, operational, authority, routing, and concentration risks.

## Solana Case

At the 2026-08-01 cutoff, Jupiter labels HumidiFi, SolFi/SolFi V2, ZeroFi, TesseraV, GoonFi V2, Obric V2, BisonFi, and Aquifer. Integration identity does not prove operator identity, source, audit status, or current share. Jupiter, Titan, and DFlow are routing/execution layers, not automatically prop-AMM venues.

## Measurement Standard

Judge decision-time state and all outcomes, not simulated output, successes, volume, TVL, or headline spread. Include quote-to-fill, implementation shortfall, spreads/markouts, failures, fees/tips, route counterfactuals, inventory, hedge costs, P&L, and strata by asset, size, volatility, router, sender, leader/client, and region.

## Security Standard

A program audit is insufficient. Review updater, data plane, adapter, sender, key custody, authorities, credentials, hedge venues, observability, and accounting. Stale state must fail closed; arithmetic must match; authorities must be separated; evidence must map to the current binary/window.

## Canonical Handbook

- [[2026-08-01-proprietary-amm-expert-handbook]] — full theory, landscape, implementation, X evidence, bibliography, and study path.

## Source Notes

- [[2026-08-01-understanding-proprietary-amms]]
- [[2026-08-01-jupiter-developers]]
- [[2026-08-01-solana-s-proprietary-amm-revolution]]
- [[2026-08-01-propamms-and-the-next-chapter-of-permissionless-market-structure]]

## Adjacent Concepts

Prop AMMs price inventory against flow that is assumed to be real. On low-liquidity launch venues that assumption fails: see [[onchain-market-manipulation]] for why headline volume is untrustworthy, and [[token-launchpad-microstructure]] for the venues where flow is cheapest to manufacture.

## Open Questions

- How can update inclusion and routing remain neutral under vertical integration?
- Which benchmark best isolates venue quality from routing and landing quality?
- Can closed strategies provide enough reproducible evidence for safe integration?
- How should welfare account for better fills alongside private-flow concentration?
