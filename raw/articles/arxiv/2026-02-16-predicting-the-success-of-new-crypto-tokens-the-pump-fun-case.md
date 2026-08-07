---
id: article-2026-02-16-predicting-the-success-of-new-crypto-tokens-the-pump-fun-case
type: source
title: "Predicting the success of new crypto-tokens: the Pump.fun case"
path: raw/articles/arxiv/2026-02-16-predicting-the-success-of-new-crypto-tokens-the-pump-fun-case.md
author: Giulio Marino, Manuel Naviglio, Francesco Tarantelli, Fabrizio Lillo
publisher: arXiv.org
url: https://arxiv.org/abs/2602.14860
date_published: 2026-02-16
date_added: 2026-08-07
tags: [solana, market-microstructure, token-launchpads, bonding-curves, market-manipulation, meme-coins, defi, papers]
status: active
quality: high
summary: "An econophysics study of 655,770 September 2025 pump.fun launches finds a 0.63% graduation rate, identifies speed of bonding-curve accumulation as the strongest success predictor, shows high bot-share reduces graduation odds, and reports that 92.22% of sufficiently active tokens exhibit detectable dump events."
related: [token-launchpad-microstructure, onchain-market-manipulation, proprietary-automated-market-makers]
---

# Predicting the success of new crypto-tokens: the Pump.fun case

## Source Metadata

- Path: raw/articles/arxiv/2026-02-16-predicting-the-success-of-new-crypto-tokens-the-pump-fun-case.md
- Authors: Giulio Marino (Dipartimento di Fisica "E. Fermi", Università di Pisa; INFN Sezione di Pisa), Manuel Naviglio (Scuola Normale Superiore, Pisa), Francesco Tarantelli (Dipartimento di Matematica, Università di Bologna), Fabrizio Lillo (Scuola Normale Superiore, Pisa)
- Published: 2026-02-16
- Publisher: arXiv.org
- URL: https://arxiv.org/abs/2602.14860
- PDF: https://arxiv.org/pdf/2602.14860v1
- HTML: https://arxiv.org/html/2602.14860v1
- DOI: https://doi.org/10.48550/arXiv.2602.14860

## TL;DR

This is the base-rate paper for bonding-curve token launches. Of 655,770 tokens created on pump.fun in September 2025, only 4,338 graduated to a real liquidity pool — a 0.63% success rate. The authors model graduation probability conditional on virtual SOL accumulated in the bonding curve plus behavioural covariates, and find that *how fast* liquidity accumulates dominates every other predictor. Counter to the intuition that bots manufacture success, high bot-share launches graduate less often. The paper also documents that pre-graduation dumping is the norm rather than the exception.

## Key Claims

- Graduation — migration from the virtual bonding curve to a real on-chain liquidity pool — is a clean, platform-defined success label, and it is extremely rare: 4,338 of 655,770 tokens, or 0.63%.
- Conditioning graduation probability on structural and behavioural variables, rather than on accumulated virtual SOL alone, significantly improves predictive power.
- Speed of accumulation is the strongest single predictor. Reaching a given virtual-SOL level in fewer trades implies a much higher graduation probability than reaching it slowly.
- High bot-share markets show systematically lower graduation likelihood beyond intermediate bonding-curve stages. The authors read this as algorithmic flow lacking sustained commitment.
- Most conditional probability curves sit below the naive buy-and-hold breakeven threshold (vSol²/115²), except at advanced bonding-curve stages. Buying early is a negative-expectancy trade under their simplified model.
- 92.22% of tokens with at least 30 swaps display a detectable dump event.
- The depth discontinuity at migration actively incentivises selling before graduation, so pre-graduation dumping is a structural feature of the mechanism, not only a behavioural one.
- Top creators show improved performance at high virtual-SOL levels but limited predictive power overall; historically profitable traders provide a modest, non-monotonic uplift.

## Important Details

- Dataset: 655,770 tokens created in September 2025, with an observation period spanning 2025-09-01 to 2025-10-01, reconstructed from on-chain transactions.
- The conditioning variable set covers virtual SOL (vSol) locked in the bonding curve, bot-like versus manual trading shares, the number of trades needed to reach given vSol thresholds, participation by historically profitable traders, and the identity of prolific token creators.
- Section structure: Introduction; The Solana blockchain; The Pump.fun platform; The Dataset; Descriptive statistics; Conditional graduation probability; Prediction variables; Pump & Dump of the tokens; Conclusions.
- Bot identification relies on transaction routing — on-chain program calls versus the web interface — rather than behavioural clustering. This is a coarser instrument than the wallet-clustering approach used by the sniper-cohort paper.
- Statistical support for top-creator conditioning is limited by small sample sizes.
- Pump-leg detection is deferred; the authors detect dumps but not the coordinated accumulation that precedes them, citing wallet-linkage complexity.
- The breakeven analysis deliberately uses a simplified buy-and-hold strategy and ignores protocol and gas fees.
- Results are specific to pump.fun; generalisation to other launchpads is explicitly left unvalidated.
- Subject: Statistical Finance (q-fin.ST).
- Fabrizio Lillo is an established market-microstructure researcher, which raises the prior on the econometrics being sound.

## Entities

- People: Giulio Marino, Manuel Naviglio, Francesco Tarantelli, Fabrizio Lillo
- Institutions: Università di Pisa, INFN Sezione di Pisa, Scuola Normale Superiore Pisa, Università di Bologna
- Platforms: Solana, pump.fun
- Concepts: bonding curve, graduation, virtual SOL (vSol), depth discontinuity, conditional graduation probability, buy-and-hold breakeven, bot share, pump and dump

## My Notes

- The 0.63% graduation rate is the number to anchor on. Any claim about launchpad tokens that does not start from a sub-1% success base rate is quietly assuming survivorship.
- "Fewer trades to the same vSol" as the dominant predictor is a velocity signal, not a size signal. It says concentrated conviction beats diffuse accumulation — and it is measurable in real time, which makes it the most operationally useful finding here.
- The bot-share result is the genuinely surprising one and it cuts against the sniper-cohort paper's framing. Coordination may lift early buyer counts (Kamat) while bot-heavy flow lowers eventual graduation (this paper). Those are compatible — early flow and eventual success are different outcomes — but the tension is worth holding explicitly.
- The breakeven finding is the practical bottom line: for almost the whole bonding curve, the conditional probability of graduation does not justify the purchase. The mechanism is not merely risky, it is negative-expectancy for the average early buyer.
- Routing-based bot detection is a real weakness. A sophisticated actor using the web interface is classified as manual, which would attenuate exactly the effect the paper measures.

## Open Questions

- Does the negative bot-share effect survive a behavioural bot classifier instead of a routing-based one?
- The velocity predictor and the sniper-cohort result both key on early concentrated buying. Are they measuring the same underlying phenomenon from two directions?
- How much of the 92.22% dump prevalence is mechanical — the depth discontinuity making pre-graduation exit rational — versus coordinated extraction?
- Does the vSol²/115² breakeven threshold hold once protocol and gas fees are included, or does the negative expectancy widen materially?
- Do the graduation dynamics transfer to other bonding-curve launchpads, or is the 0.63% rate a pump.fun-specific artifact of its parameterisation?

## Related

- [[token-launchpad-microstructure]]
- [[onchain-market-manipulation]]
- [[proprietary-automated-market-makers]]
- [[2026-07-02-coordinated-sniper-cohorts-on-pump-fun]]
- [[2025-04-16-a-midsummer-memes-dream-market-manipulations-in-the-meme-coin-ecosystem]]

## Source Text

Title: Predicting the success of new crypto-tokens: the Pump.fun case

Authors: Giulio Marino, Manuel Naviglio, Francesco Tarantelli, Fabrizio Lillo

Submitted: 16 February 2026

Abstract: We study the dynamics of token launched on Pump.fun, a Solana-based launchpad platform, to identify the determinants of the token success. Pump.fun employs a bonding curve mechanism to bootstrap initial liquidity possibly leading to graduation to the on-chain market, which can be seen as a token success. We build predictive models of the probability of graduation conditional on the current amount of Solana locked in the bonding curve and a set of explanatory variables that capture structural and behavioral aspects of the launch process. Conditioning the graduation probability on these variables significantly improves its predictive power, providing insights into early-stage market behavior, speculative and manipulative dynamics, and the informational efficiency of bonding-curve-based token launches.

Note on the abstract text: arXiv's abstract page renders the string "Pump.fun" as "this http URL" because its linkifier treats it as a URL. The abstract above restores the platform name as it appears in the paper and in the arXiv API metadata.

Subjects: Statistical Finance (q-fin.ST)

Cite as: arXiv:2602.14860 [q-fin.ST]

DOI: https://doi.org/10.48550/arXiv.2602.14860

Submission history: [v1] Mon, 16 Feb 2026 15:53:13 UTC

Full PDF not copied locally. Use the arXiv page and PDF URL above for the complete paper.
