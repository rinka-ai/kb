---
id: article-2025-04-16-a-midsummer-memes-dream-market-manipulations-in-the-meme-coin-ecosystem
type: source
title: "A Midsummer Meme's Dream: Investigating Market Manipulations in the Meme Coin Ecosystem"
path: raw/articles/arxiv/2025-04-16-a-midsummer-memes-dream-market-manipulations-in-the-meme-coin-ecosystem.md
author: Alberto Maria Mongardini, Alessandro Mei
publisher: arXiv.org
url: https://arxiv.org/abs/2507.01963
date_published: 2025-04-16
date_added: 2026-08-07
tags: [market-manipulation, meme-coins, wash-trading, solana, ethereum, market-microstructure, defi, papers]
status: active
quality: high
summary: "A cross-chain study of 34,988 meme coins across Ethereum, BNB Smart Chain, Solana, and Base finds that 82.8% of tokens returning over 100% show artificial-growth manipulation, defines Liquidity Pool-Based Price Inflation as a new low-cost technique, and shows profit-extraction schemes typically follow an earlier artificial-growth phase."
related: [onchain-market-manipulation, token-launchpad-microstructure]
---

# A Midsummer Meme's Dream: Investigating Market Manipulations in the Meme Coin Ecosystem

## Source Metadata

- Path: raw/articles/arxiv/2025-04-16-a-midsummer-memes-dream-market-manipulations-in-the-meme-coin-ecosystem.md
- Authors: Alberto Maria Mongardini (Sapienza University of Rome; Technical University of Denmark), Alessandro Mei (Sapienza University of Rome)
- Published: 2025-04-16 (v1); 2026-01-02 (v2, current)
- Publisher: arXiv.org
- URL: https://arxiv.org/abs/2507.01963
- PDF: https://arxiv.org/pdf/2507.01963v2
- HTML: https://arxiv.org/html/2507.01963v2
- DOI: https://doi.org/10.48550/arXiv.2507.01963

## TL;DR

The broadest cross-chain manipulation census in the KB: 34,988 meme coins across four chains. Its central finding is that outsized returns are a manipulation signal rather than a performance signal — among tokens returning over 100%, 82.8% carry evidence of artificial growth. It also names a technique the literature had not isolated: Liquidity Pool-Based Price Inflation, where a purchase measured in tens of dollars moves price dramatically because the pool is thin enough to be pushed. The paper's most structurally interesting claim is sequencing: wash trading and LPI are not endpoints, they are the setup phase for later pump-and-dumps and rug pulls.

## Key Claims

- Meme coins derive value from community sentiment rather than utility, which is precisely what makes fabricated evidence of interest effective.
- Among high-return tokens (>100%), 82.8% show evidence of artificial growth strategies designed to create a misleading appearance of market interest.
- Liquidity Pool-Based Price Inflation (LPI) is defined here as a distinct manipulation: small strategic purchases against a thin pool trigger dramatic price increases. The median investment across 40 identified LPI tokens was $54.
- Manipulations are sequential, not independent. Profit-extraction schemes — pump and dumps, rug pulls — typically follow an earlier artificial-growth phase.
- 62.9% of profit-extraction tokens had undergone prior artificial growth; for delisted tokens that figure rises to 86.67%.
- 287 tokens showed wash trading, identified through three separate detection techniques.
- 60 tokens experienced pump-and-dump operations, of which 61.67% had prior artificial growth.
- Economic impact: over 17,000 victimised addresses with realised losses exceeding $9.3 million.
- The authors conclude that dramatic gains in this segment are "often driven by coordinated efforts rather than natural market dynamics."

## Important Details

- Scope: 34,988 tokens across Ethereum, BNB Smart Chain, Solana, and Base, tracked in a three-month longitudinal analysis. Data collected around mid-October 2024.
- Sources combined aggregators (CoinMarketCap, CoinGecko), DEX surfaces (DexScreener, CoinSniper), and blockchain explorers, followed by name-based classification and address validation.
- Detection used statistical anomaly analysis, transaction-level examination via Dune Analytics, and OHLCV analysis at daily and hourly granularity.
- Section structure: Introduction; Related Work; Methodology; Tokenomics and Price Growth; Artificial Growth Strategies; Profit Extraction Manipulations; Discussion; Conclusion and Future Work.
- Price data was unavailable for 11,119 tokens lacking active liquidity pools, so prevalence figures are likely underestimates.
- The authors state they used conservative detection thresholds to minimise false positives, which again biases toward undercounting.
- Subjects: Trading and Market Microstructure (q-fin.TR, primary); Computers and Society (cs.CY); Statistical Finance (q-fin.ST).
- Dating note: the arXiv identifier is 2507 (July 2025 announcement) but the API reports a v1 submission timestamp of 2025-04-16. This note uses the v1 timestamp for `date_published`; v2 landed 2026-01-02.
- The absolute counts for specific manipulations (287 wash-trading, 40 LPI, 60 pump-and-dump) are small relative to the 34,988-token corpus. The 82.8% headline applies to the high-return subset, not to the corpus.

## Entities

- People: Alberto Maria Mongardini, Alessandro Mei
- Institutions: Sapienza University of Rome, Technical University of Denmark
- Chains: Ethereum, BNB Smart Chain, Solana, Base
- Data sources: CoinMarketCap, CoinGecko, DexScreener, CoinSniper, Dune Analytics
- Concepts: wash trading, Liquidity Pool-Based Price Inflation (LPI), pump and dump, rug pull, artificial growth, profit extraction, OHLCV analysis

## My Notes

- The sequencing claim is the most valuable contribution and the most transferable to detection work. If artificial growth reliably precedes extraction, then wash-trading and LPI detectors are early-warning instruments, not just forensic ones. The 86.67% figure for delisted tokens is the strongest version of that signal.
- LPI deserves attention because of how cheap it is. A $54 median cost to manufacture a dramatic price chart means the economics of faking a signal are essentially free relative to the returns. Any system that treats a price move as evidence of interest is trivially spoofable in this segment.
- The 82.8% figure is conditioned on high returns, and that conditioning is the point: in this market, a large gain is closer to evidence of manipulation than evidence of merit. That is a genuinely useful prior inversion.
- Both stated limitations push the same direction — missing price data and conservative thresholds both undercount — so treat the reported prevalence as a floor.
- The counts of confirmed cases are small in absolute terms. The paper is stronger as evidence of *pattern and sequence* than as a precise prevalence estimate.

## Open Questions

- How much of the 11,119 excluded tokens' behaviour would change the prevalence estimates if pool-less tokens could be priced?
- Is LPI distinguishable in real time from genuine thin-market price discovery, or only in hindsight once extraction follows?
- Does the artificial-growth-then-extraction sequence hold on bonding-curve launchpads like pump.fun, where the curve rather than a liquidity pool sets early price?
- Do the three wash-trading detection techniques agree with each other, and what is the disagreement rate?
- The $9.3 million realised-loss figure covers detected schemes only; what is the plausible total once undetected manipulation is priced in?

## Related

- [[onchain-market-manipulation]]
- [[token-launchpad-microstructure]]
- [[2026-07-02-coordinated-sniper-cohorts-on-pump-fun]]
- [[2026-02-16-predicting-the-success-of-new-crypto-tokens-the-pump-fun-case]]

## Source Text

Title: A Midsummer Meme's Dream: Investigating Market Manipulations in the Meme Coin Ecosystem

Authors: Alberto Maria Mongardini, Alessandro Mei

Submitted: 16 April 2025 (v1); 2 January 2026 (v2)

Abstract: From viral jokes to a billion-dollar phenomenon, meme coins have become one of the most popular segments in cryptocurrency markets. Unlike utility-focused crypto assets like Bitcoin, meme coins derive value primarily from community sentiment, making them vulnerable to manipulation. This study presents an unprecedented cross-chain analysis of the meme coin ecosystem, examining 34,988 tokens across Ethereum, BNB Smart Chain, Solana, and Base. We characterize their tokenomics and track their growth in a three-month longitudinal analysis. We discover that among high-return tokens (>100%), an alarming 82.8% show evidence of artificial growth strategies designed to create a misleading appearance of market interest. These include wash trading and a new form of manipulation we define as Liquidity Pool-Based Price Inflation (LPI), where small strategic purchases trigger dramatic price increases. We find that profit extraction schemes, such as pump and dumps and rug pulls, typically follow initial manipulations like wash trading or LPI, indicating how early manipulations create the foundation for later exploitation. We quantify the economic impact of these schemes, identifying over 17,000 victimized addresses with realized losses exceeding $9.3 million. These findings reveal that combined manipulations are widespread among high-performing meme coins, suggesting that their dramatic gains are often driven by coordinated efforts rather than natural market dynamics.

Subjects: Trading and Market Microstructure (q-fin.TR); Computers and Society (cs.CY); Statistical Finance (q-fin.ST)

Cite as: arXiv:2507.01963 [q-fin.TR] / arXiv:2507.01963v2 [q-fin.TR]

DOI: https://doi.org/10.48550/arXiv.2507.01963

Submission history: [v1] Wed, 16 Apr 2025 13:54:42 UTC; [v2] Fri, 2 Jan 2026 09:49:45 UTC

Full PDF not copied locally. Use the arXiv page and PDF URL above for the complete paper.
