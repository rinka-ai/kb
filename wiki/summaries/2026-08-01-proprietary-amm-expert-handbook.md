---
id: 2026-08-01-proprietary-amm-expert-handbook
type: summary
title: "Proprietary AMMs: Expert Handbook"
tags: [prop-amm, automated-market-makers, solana, market-microstructure, mev, routing, execution-quality, defi]
summary: "An evidence-ranked expert handbook on proprietary AMMs: dealer theory, CFMM mathematics, LVR, Solana architecture and venues, routing, MEV, execution measurement, security, and due diligence."
source_count: 4
canonical_for: [proprietary AMMs, prop AMMs, Solana prop AMMs, proprietary automated market makers]
review_status: reviewed
last_reviewed: 2026-08-01
review_due: 2026-10-01
confidence: "0.88"
---

# Proprietary AMMs: Expert Handbook

**Research cutoff:** 2026-08-01  
**Primary case study:** Solana  
**Audience:** protocol engineers, quantitative researchers, market makers, routers, auditors, investors, and technically serious users  
**Depth:** book-chapter length; designed to progress from first principles to production diligence

## Reader contract

This handbook is exhaustive in breadth, not omniscient about closed systems. A proprietary AMM is partly a black box by design. The handbook separates four evidence classes:

- **Documented:** first-party documentation, deployed labels/state, canonical source code, or protocol specifications.
- **Observed or reported:** reproducible onchain analysis or a named research report, always bound to its measurement window.
- **Design recommendation:** a reference architecture, formula, control, or test—not a claim about an undisclosed implementation.
- **Unknown or disputed:** a material claim for which public evidence is incomplete, contradictory, or too weak.

X posts are used as dated first-party statements, methodological leads, and disputed claims. They are not promoted to independent proof merely because Grok found them. Market-share figures are historical snapshots unless a live query and methodology are both preserved.

## Executive thesis

A prop AMM is best understood as an **automated principal dealer embedded in an adversarial settlement network**, not simply as a novel reserve curve. Its operator commits capital, continuously estimates fair value, skews quotes against inventory, prices information toxicity and hedge cost, publishes enough state for deterministic atomic execution, and distributes liquidity through routers.

```text
private market-data + risk model
              ↓
compact, frequently refreshed onchain parameters
              ↓
deterministic public execution against principal inventory
              ↓
aggregator competition, transaction landing, hedging, reconciliation
```

This can reduce stale quotes, broad passive inventory exposure, and loss-versus-rebalancing, but exchanges them for active-model, oracle, updater, key-custody, router, validator, censorship, centralization, and disclosure risks.

### Seven invariants an expert should retain

1. **Venue identity, operator identity, architecture, and market share are separate claims.** A Jupiter label proves integration identity, not ownership or hidden pricing logic.
2. **Onchain settlement is not practical transparency.** A closed executable can be observable and deterministic while remaining difficult to audit or reproduce.
3. **The offchain quote is not the fill.** Best execution requires quote age, state sequence, transaction fit, landing probability, all fees, failures, and markouts.
4. **The router is part of the market.** Caller-specific pricing, private integrations, simulation freshness, split routing, and ownership conflicts change flow allocation.
5. **The validator is part of the pricing loop.** Ordering or censoring oracle updates can create stale-quote extraction and vertical-integration advantages.
6. **Volume and tight spreads do not prove profitability, solvency, safety, or welfare.** Reconciled P&L, tail markouts, failures, hedge costs, and authorities matter.
7. **LVR is necessary but insufficient.** A production comparison must include executable hedging, fees/tips, MEV, funding/borrow, impact, and outages.

## Contents and provenance

- **Part I:** current Solana landscape, named venues, programs, timeline, public code, reported shares, and disputed attributions.
- **Part II:** dealer microstructure, CFMM math, concentrated liquidity, LVR, MEV, JIT, dynamic fees, auctions, intents, and empirics.
- **Part III:** production architecture, Jupiter integration, quote/fill equivalence, inventory, landing, measurement, security, and diligence.
- **Part IV:** dated X evidence register.
- **Part V:** integrated conclusions and expert study program.

Primary archived notes:

- [[2026-08-01-understanding-proprietary-amms]] — Solana Foundation explainer.
- [[2026-08-01-jupiter-developers]] — Jupiter Metis integration contract.
- [[2026-08-01-solana-s-proprietary-amm-revolution]] — Helius investigation.
- [[2026-08-01-propamms-and-the-next-chapter-of-permissionless-market-structure]] — Jump Crypto study.

The handbook additionally preserves more than one hundred unique URLs spanning papers, code, docs, dashboards, talks, and dated X posts. Bibliography presence does not imply equal authority.

## Part I — Solana proprietary-AMM landscape

**Research cutoff:** 2026-08-01  
**Scope:** Solana proprietary automated market makers (“prop AMMs”), adjacent routers/aggregators, disclosed architecture, market-share claims, public code/data, and unresolved attribution questions.

### Executive findings

- **“Prop AMM” is an ecosystem term, not a formal Solana protocol category.** The most useful operational definition is a venue that:
  1. trades principal/operator-controlled inventory rather than permissionless LP capital;
  2. derives executable pricing from an actively updated proprietary model rather than a fixed reserve curve;
  3. settles atomically through an onchain program; and
  4. generally reaches users through aggregators rather than a standalone retail UI.
- The strongest primary explainer is Solana Foundation contributor Brian Li’s January 2026 article. It describes an offchain predictive model that publishes minimal state onchain, with the program computing quotes from price, volatility, counterparty/aggregator identity, recent flow, and update freshness.
- **The currently verifiable Solana set is at least:** HumidiFi, SolFi/SolFi V2, ZeroFi, TesseraV, GoonFi V2, Obric V2, BisonFi, and Aquifer. Jupiter’s live program-label endpoint recognizes each. That proves integration/identity, but not operator identity or every architectural claim.
- **HumidiFi, SolFi, and TesseraV are the most consequential named venues in published research.** Chorus One reported HumidiFi at almost 65% of recent SOL–USDC volume and prop AMMs collectively at roughly 65% of Solana DEX volume in December 2025. These are time-window- and methodology-dependent historical observations, not permanent market shares.
- **Prop AMMs are intentionally opaque.** Solana Foundation stated in January 2026 that all Solana prop AMMs then operating were closed source. LimeChain’s later open-source tooling confirms that many programs remain deliberately obfuscated and must be quoted by transaction simulation rather than locally decoded state.
- **Jupiter, Titan, and DFlow are routing/execution layers, not automatically prop AMMs.**
  - Jupiter exposes labels and routes to prop-AMM programs.
  - Titan calls itself a **meta-DEX aggregator** and operates its own router, Argos.
  - DFlow offers a unified Solana trading API and open-sourced Clearpools, a conditional-liquidity Whirlpools fork. DFlow should not be described simply as a prop AMM.
- **Flow segmentation is a core and controversial feature.** LimeChain’s simulator finds that some venues provide different rates depending on which whitelisted router invokes them. DFlow’s Clearpools explicitly supports “flow segmentation.” This makes “best price” partly dependent on router identity and execution path.
- **Validator/MEV interaction is structural, not incidental.** Prop AMMs depend on timely price updates. The Solana Foundation explainer highlights risks from leader-controlled update ordering or censorship and connects this problem to Application-Controlled Execution.
- Public evidence supports a timeline beginning no later than **2024**:
  - Obric V2 program-data activity: April 2024.
  - SolFi: October 2024.
  - ZeroFi: December 2024.
  - HumidiFi: May 2025.
  - TesseraV: June 2025.
  - Aquifer: June 2025.
  - SolFi V2: August 2025.
  - BisonFi: November 2025.
  - GoonFi V2: December 2025.
  
  These are earliest signatures found on each current program-data account, **not guaranteed launch dates**.

---

### 1. Terminology and classification

#### Recommended handbook definition

> A **proprietary AMM** is an onchain principal-liquidity venue whose operator actively controls inventory and derives executable prices from a proprietary, frequently updated model, rather than exposing a passive, permissionless reserve curve.

This distinguishes a prop AMM from:

| Venue type | Pricing | Capital | User access |
|---|---|---|---|
| Constant-product AMM | Deterministic reserve curve | Usually public LPs | Direct or aggregator |
| CLAMM/DLMM | LP-selected ranges/bins | Usually public LPs | Direct or aggregator |
| Order book | Explicit orders with price/time mechanics | Individual makers | Direct or aggregator |
| RFQ | Per-request signed quote | Designated makers | RFQ router |
| Prop AMM | Model-based executable function/state | Usually operator principal | Predominantly aggregator |
| Meta-aggregator | Compares routers/aggregators | None necessarily | Direct API/UI |

#### Terminology caveats

- **“Dark AMM” / “dark exchange”** is common in analytics and journalism, but potentially misleading:
  - transactions and settlement are public;
  - the “dark” element is usually unpublished pricing logic, private source code, absent public LP interface, or restricted quote access—not hidden execution.
- **“Oracle-based AMM”** is too broad. A public LP AMM can use an oracle without becoming proprietary.
- **“PMM”** can mean “proactive market maker” in other protocols. Avoid treating PMM and proprietary AMM as universal synonyms.
- **“Prop DEX”** is colloquial. Some programs offer AMM-like atomic execution without a conventional retail exchange surface.
- A venue should not qualify merely because its source code is closed. Proprietary control of liquidity and active model-based quoting are the more important characteristics.

#### Source support

Brian Li’s Solana Foundation article says prop AMMs:

- maintain a predictive price model offchain;
- continuously send market prices or other minimal inputs onchain;
- express liquidity programmatically;
- can consider price, volatility, caller/aggregator, recent trades, and state freshness;
- generally rely on operator-supplied rather than permissionless liquidity.

**Recommended use:** canonical conceptual explanation, while labeling its claims as an ecosystem-author explanation rather than a protocol specification.

---

### 2. Architecture reconstructed from disclosed evidence

A generalized Solana prop-AMM stack looks like:

1. **Offchain market data and risk engine**
   - fair-value estimate or predictive price;
   - volatility;
   - inventory;
   - hedge venue state;
   - flow toxicity/caller identity.
2. **Low-cost state publication**
   - operator sends compact parameters to Solana, potentially multiple times per slot.
3. **Onchain quote/swap function**
   - transaction simulation evaluates the current program state;
   - the same program performs atomic settlement against principal inventory.
4. **Router integration**
   - Jupiter, DFlow, Titan, OKX, or another caller simulates the program;
   - route optimizer compares the resulting output against other venues.
5. **Transaction landing**
   - user signs a composed transaction;
   - priority fees, validator scheduling, and update ordering affect realized execution.
6. **Inventory management and hedging**
   - inventory can be rebalanced onchain or hedged externally.

#### What is directly supported

- Solana Foundation: compact onchain updates and fully programmable quote logic.
- Chorus One: “onchain quoting engine connected to an offchain risk model,” with inventory, volatility, and hedging inputs.
- LimeChain Magnus: many programs are deliberately obfuscated; it obtains quotes by simulating the deployed program in a sandbox.
- LimeChain `pmm-sim`: quotes can vary with caller identity; it supports spoofed Jupiter, DFlow, Titan, and OKX router calls.
- DFlow Clearpools: explicitly supports conditional liquidity/flow segmentation.

#### Important correction

Chorus One describes quotes as “fully auditable onchain.” This should be used cautiously. Settlement and executable behavior can be observed or reverse engineered, but Solana Foundation simultaneously describes these systems as closed-source black boxes. **Deterministic execution is not the same as practical auditability.**

---

### 3. Verified program registry

The following labels were returned by Jupiter’s live `program-id-to-label` API on 2026-08-01.

| Jupiter label | Program ID | Earliest current program-data signature found | Evidentiary status |
|---|---|---:|---|
| HumidiFi | `9H6tua7jkLhdm3w8BvgpTn5LZNU7g4ZynDmCiNN3q6Rp` | 2025-05-23 | High confidence venue identity |
| SolFi | `SoLFiHG9TfgtdUXUjWAxi3LtvYuFyDLVhBWxdMZxyCe` | 2024-10-07 | High |
| SolFi V2 | `SV2EYYJyRz2YhfXwXnhNAevDEui5Q6yrfyo13WtupPF` | 2025-08-07 | High |
| ZeroFi | `ZERor4xhbUycZ6gb9ntrhqscUcZmAbQDjEAtCf4hbZY` | 2024-12-12 | High |
| GoonFi V2 | `goonuddtQRrWqqn5nFyczVKaie28f3kDkHWkHtURSLE` | 2025-12-11 | High |
| TesseraV | `TessVdML9pBGgG9yGks7o4HewRaXVAMuoVj4x83GLQH` | 2025-06-12 | High |
| Obric V2 | `obriQD1zbpyLz95G5n7nJe6a4DPjpFwa5XYPoNm113y` | 2024-04-27 | High |
| BisonFi | `BiSoNHVpsVZW2F7rx2eQ59yQwKxzU5NvBcmKshCSUypi` | 2025-11-05 | High |
| BisonFi Predict | `2DNbzPochEcyCcWMbL4d9S3u9QqQEj5bbe6cSZFvKsbh` | Not separately traced | Identity high; function unclear |
| Aquifer | `AQU1FRd7papthgdrwPTTq5JacJh8YtwEXaBfKU3bTz45` | 2025-06-26 | High |

All examined principal program accounts were upgradeable Solana programs owned by `BPFLoaderUpgradeab1e11111111111111111111111`.

**Caveat:** earliest program-data-account signature is a lower-bound artifact for the current deployment lineage. It may represent deployment, initialization, an upgrade-buffer action, or another management transaction. It is not proof of first trading activity.

---

### 4. Entity-by-entity evidence assessment

### HumidiFi

#### Verified

- Jupiter recognizes the current program as HumidiFi.
- LimeChain supports HumidiFi swap v1, v2, and v3 and publishes local simulation adapters.
- Chorus One treats it as a leading prop AMM and reported:
  - almost 65% of recent SOL–USDC volume;
  - approximately 0.4–1.6 bps across most tested SOL trade sizes;
  - about 5 bps at a $1 million clip;
  - approximately 11–16 bps on mid-sized TRUMP trades.
- An official Solana YouTube recording is titled **“Breakpoint 2025: Product Keynote: HumidiFi (Kevin Pang).”**
- Solana Foundation links a Lightspeed episode titled **“How HumidiFi Became Solana’s Largest Prop AMM.”**

#### Operator attribution

Chorus One states that HumidiFi is operated by **Temporal**. This is credible but was not corroborated on Temporal’s current public site, which describes itself as a Solana R&D/HFT infrastructure firm but does not mention HumidiFi on its main or team pages.

**Status:** **Credible secondary attribution, not independently confirmed in the checked Temporal pages.**

#### Unknown/disputed

- Exact ownership and corporate structure.
- Source code and precise curve.
- Whether caller-specific pricing remains enabled for all routes.
- Current volume share as of 2026-08-01.
- Historical journalism tying the venue to particular individuals or firms should not be promoted to fact without documentary corroboration.

### SolFi / SolFi V2

#### Verified

- Jupiter labels both V1 and V2 programs.
- SolFi is one of the earliest identifiable programs in the current set.
- LimeChain supports SolFi V2 simulation and routing.
- Chorus One reports SolFi among the prominent model-based venues and includes it in SOL, BTC, and TRUMP execution analysis.
- Blockworks published **“Ellipsis Labs claims credit for mysterious top Solana DEX”** on 2025-05-01.

#### Operator attribution

Chorus One states that SolFi was developed by **Ellipsis Labs**. The Blockworks headline independently supports Ellipsis claiming the venue, although the article itself was inaccessible behind Cloudflare in this research environment.

**Status:** **High-confidence attribution, but cite Blockworks as reporting and Chorus One as secondary confirmation.**

#### Unknown

- Public technical documentation for SolFi itself.
- V1/V2 migration policy and current activity split.
- Full source or formal audit.
- Exact relationship between SolFi’s deployed logic and Ellipsis’s open-source Phoenix work.

### TesseraV

#### Verified

- Jupiter labels the current program TesseraV.
- LimeChain supports TesseraV simulations.
- Chorus One includes Tessera among leading prop AMMs and reports approximately 1.3–3 bps for tested SOL clips.
- `tessera.so` was live at research time but exposed no clear public AMM documentation in the accessible rendered page.

#### Operator attribution

Chorus One says TesseraV is run by **Wintermute**.

**Status:** **Credible research attribution but not corroborated by an official Wintermute announcement located in this pass. Do not state as conclusively proven ownership.**

#### Name-collision warning

A separate 2026 “Tessera” tokenized-private-equity business appeared in search results. It should not be conflated with TesseraV, the Solana liquidity program, absent proof of a relationship.

### ZeroFi

#### Verified

- Jupiter labels the program ZeroFi.
- LimeChain supports it.
- Chorus One treats it as a prop AMM and reports approximately 1.3–3 bps for tested SOL clips and 11–18 bps for smaller TRUMP trades.
- Program-data activity dates to December 2024.

#### Operator

**Unknown.** No reliable official operator statement was found.

### Obric V2

#### Verified

- Jupiter labels the Solana program Obric V2.
- LimeChain supports Obric V2 swaps, including USDC–USDT.
- Current public site claims “Concentrated Liquidity Without Compromise.”

#### Caveat

The public `obric.xyz` documentation and JavaScript primarily concern an older Aptos “smart liquidity” product. This does not establish the architecture of Solana Obric V2. The Solana program’s prop-AMM status is supported mainly by Jupiter labeling and independent simulation tooling, not by current official protocol documentation.

**Recommended handbook wording:** “A Jupiter-integrated, closed/opaque Solana venue generally grouped with prop AMMs by reverse-engineering tooling; its accessible official documentation is stale or addresses a different deployment.”

### GoonFi / GoonFi V2

#### Verified

- Jupiter labels GoonFi V2.
- LimeChain supports GoonFi.
- Program-data activity for the current V2 lineage begins in December 2025.

#### Unknown

- Operator.
- Whether an older GoonFi program remains active.
- Architecture, public docs, audit, and capital source.
- Claims that GoonFi is closed or affiliated with another firm remain unverified.

### BisonFi / BisonFi Predict

#### Verified

- Jupiter labels both BisonFi and BisonFi Predict.
- LimeChain simulates BisonFi and identifies distinct markets.
- Current principal program-data activity begins November 2025.

#### Unknown

- Operator and purpose of the separate “Predict” program.
- Architecture, source, audit, and production market share.
- A community repository attributes it to “$FWDind”; this was not corroborated and should not be used as fact.

### Aquifer

#### Verified

- Jupiter labels Aquifer.
- Current program-data activity begins June 2025.
- A public reverse-engineering repository exists, but it is unofficial.

#### Unknown

- Operator.
- Official site/docs.
- Market share and supported pairs.
- Decompiled or reconstructed code should be labeled third-party reverse engineering, not source disclosure.

---

### 5. Routers, aggregators, and execution infrastructure

### Jupiter

**Classification:** Router/aggregator, not itself one prop AMM.

#### Primary evidence

Jupiter’s public label endpoint maps the named programs to venue labels:

- `https://lite-api.jup.ag/swap/v1/program-id-to-label`
- `https://api.jup.ag/swap/v1/program-id-to-label`

Jupiter’s GitHub organization publishes:

- `jupiter-amm-interface`
- `jupiter-amm-implementation`
- `jupiter-swap-api-client`

The generic interface and client are open, but this does **not** mean each proprietary venue’s implementation or pricing model is open source.

#### Structural role

- discovers and simulates venue outputs;
- constructs multi-hop/split transactions;
- grants de facto distribution to venues;
- maintains labels and integrations that function as an important public registry.

#### Governance concern

Solana Foundation notes that prop-AMM integration is not currently permissionless: a venue generally must work with an aggregator, while external integrators may be unable to derive quotes without private adapters or simulation.

### Titan

**Classification:** Meta-aggregator plus proprietary router; not a prop AMM based on available evidence.

#### Official/company announcement

Titan’s 2025-09-18 release states:

- $7 million seed round led by Galaxy Ventures;
- over $1.5 billion in spot volume during private beta;
- meta-aggregation across major Solana routers;
- proprietary router named **Argos**;
- claimed Argos outperformed competitors in 70–75% of cases;
- Titan Prime API compares multiple router quotes using simulation infrastructure.

#### Caveat

The performance and volume numbers are company claims in a press release, not independently audited measurements. “Outperforms 75% of the time” requires a defined token universe, size distribution, latency regime, sampling method, fee treatment, and quote-to-fill comparison before it can support a handbook conclusion.

### DFlow

**Classification:** Trading/execution API, router, and conditional-liquidity infrastructure; not simply a prop AMM.

#### Primary evidence

DFlow’s current docs describe:

- one unified API over aggregated Solana liquidity;
- quote and ready-to-sign swap responses;
- streaming quotes, depth, and priority-fee data.

Its GitHub organization publishes:

- `DFlowProtocol/clearpools`
- `DFlowProtocol/dflow-amm-interface`

Clearpools describes itself as:

> “a conditional liquidity fork of Whirlpools” with “support for flow segmentation.”

Official deployment:

`C1ear1po7kcLBZiiArGMXPhGnjRZ8KxkqQ8EEskzHWmc`

#### Significance

Clearpools is unusually concrete evidence that caller/order-flow segmentation is being implemented at the AMM layer. It is adjacent to the prop-AMM phenomenon even if its Whirlpools-derived, potentially LP-based architecture means it should not automatically be placed in the same category.

### OKX and other callers

LimeChain’s simulator supports spoofing Jupiter, OKX, DFlow, and Titan caller identities and says some venues return preferential rates to whitelisted addresses.

**Interpretation:** router identity can be economically relevant input, not mere transport metadata.

---

### 6. Market share, volume, and execution-quality evidence

### Strongest located research claims

Rafal Klich’s Chorus One report, **2025-12-19**, reports:

- prop AMMs at roughly **65% of Solana DEX volume**;
- HumidiFi near **65% of recent SOL–USDC volume**;
- prop AMMs at approximately **sub-1–5 bps** on SOL;
- approximately **2–4 bps** on BTC for leading prop venues;
- sub-$100,000 prop-AMM execution competitive with cited TradFi benchmarks.

The report’s underlying venue-share source is Blockworks Research’s Solana DEX Activity dashboard. Its spread analysis adapts SEC Rule 605 logic by:

1. grouping executions in the same Solana slot;
2. calculating venue-level volume-weighted average buy and sell prices;
3. treating their difference as realized bid/ask width;
4. aggregating these values by volume.

#### Methodological caveats

- This is not true NBBO-based effective spread.
- Same-slot average buy/sell prices may incorporate intr-slot market movement.
- Venue composition and trade-size distribution can bias aggregate comparisons.
- Router fees, priority fees, failed transactions, quote expiry, slippage, and rebates may not all be represented.
- “Volume share” depends on whether:
  - aggregator instructions or underlying venue calls are counted;
  - stable-to-stable routes are included;
  - multi-hop notional is counted once or per leg;
  - wash/arbitrage/solver flow is filtered;
  - pool-type labels are historically backfilled.
- The “roughly 65%” result is a historical snapshot from 2025, not a current 2026 fact.

### Current raw data warning

DefiLlama’s live Solana DEX endpoint returned approximately **$1.70 billion** total 24-hour DEX volume at research time, but its protocol breakdown omitted most recognized prop AMMs and listed Obric V2 as zero. This demonstrates that general-purpose protocol aggregators may materially undercount private or newly decoded venues.

**Do not use DefiLlama’s venue split to infer prop-AMM share without validating adapters.**

### Dashboard inventory

| Resource | Status | Recommended use |
|---|---|---|
| Blockworks Analytics — Solana DEX Activity | Cited by Chorus One; page access restricted in this run | Venue/pool-type time series after checking methodology |
| Dune — `the_defi_report/prop-amms` | Canonical URL located; Cloudflare blocked content | Discovery only until queries are inspected |
| Dune — `solana_team/darkammsmarkedoutbyscheduler` | Page title verified; query content returned 403 | MEV/markout lead, not yet evidence |
| Sandwiched.me Experiments | Linked by Solana Foundation; Cloudflare blocked | Bid/ask depth and MEV research lead |
| Chorus One linked Dune queries by `@mostlydata` | Visual figures accessible through article, exact query URLs not extracted | Spread methodology; inspect SQL before reproduction |
| DefiLlama Solana DEX API | Accessible but incomplete for this category | Aggregate chain volume only, with caveat |

---

### 7. Emergence timeline

| Date | Event | Confidence and caveat |
|---|---|---|
| 2024-04-27 | Earliest located current Obric V2 program-data signature | Onchain fact; not necessarily launch |
| 2024-10-07 | Earliest located SolFi program-data signature | Onchain fact |
| 2024-12-12 | Earliest located ZeroFi program-data signature | Onchain fact |
| 2025-05-01 | Blockworks reports Ellipsis Labs claimed the previously mysterious top Solana DEX | Headline/index verified; article inaccessible |
| 2025-05-23 | Earliest located HumidiFi program-data signature | Onchain fact |
| 2025-06-12 | Earliest located TesseraV program-data signature | Onchain fact |
| 2025-06-26 | Earliest located Aquifer program-data signature | Onchain fact |
| 2025-07-22 | Delphi Digital publishes “The Rise of Prop AMMs on Solana” | Publication indexed; article not accessed |
| 2025-08-07 | Earliest located SolFi V2 program-data signature | Onchain fact |
| 2025-08-07 | DL News reports Solana “dark” exchanges at $6 billion | Secondary report; metric period must be checked |
| 2025-08-20 | Blockworks publishes ecosystem overview | Indexed; article inaccessible |
| 2025-09-18 | Titan public launch; company claims $1.5B private-beta volume | Primary company claim |
| 2025-09-22 | Temporal publishes ACE/AMQ research | Official Temporal source |
| 2025-11-05 | Earliest located BisonFi program-data signature | Onchain fact |
| 2025-12-11 | Earliest located GoonFi V2 program-data signature | Onchain fact |
| 2025-12-19 | Chorus One publishes execution-quality study | Accessible research |
| 2026-01-08 | Benedict Brady publishes toy prop-AMM mechanism-design walkthrough | Accessible technical commentary |
| 2026-01-20 | Solana Foundation publishes canonical ecosystem explainer | Primary ecosystem source |
| 2026-07-30 | Blockworks reports prop AMMs expanding to Base | Indexed but inaccessible; indicates model no longer Solana-only |

#### Interpretation

SolFi, ZeroFi, and Obric predate the term’s broad 2025 adoption. Public awareness accelerated after Ellipsis’s reported SolFi disclosure, followed by dedicated Delphi, Blockworks, DL News, Chorus One, and Solana Foundation coverage.

---

### 8. Validator scheduling, MEV, and execution control

#### Core issue

A prop AMM’s quote quality depends on its latest state update landing before toxic order flow. A Solana leader can influence:

- whether the update lands;
- its intra-slot ordering;
- whether a taker executes against stale state;
- which router or bundle gets preferential inclusion.

Solana Foundation explicitly describes three regimes:

1. first-come-first-served validators;
2. a prop-AMM-operated validator incentivized to favor its own updates;
3. an MEV-extracting validator that delays updates to maximize stale-quote value.

#### Application-Controlled Execution

Temporal’s official research page lists:

**“Application Controlled Execution (ACE) through Asynchronous Market Queues (AMQs)” — 2025-09-22.**

Solana Foundation connects ACE, TEEs, and Jito block building to maker protection and transaction prioritization. This is relevant because prop-AMM evolution may shift competition from curve design toward:

- update rights;
- encrypted or delayed execution;
- application-defined queues;
- validator relationships;
- block-builder policies.

#### Handbook framing

Do not treat tight displayed or simulated quotes as sufficient execution-quality proof. Quote freshness, landing probability, and route/caller eligibility should be first-class variables.

---

### 9. Public code and reverse-engineering resources

### High-value open-source resources

#### LimeChain `pmm-sim`

**URL:** https://github.com/LimeChain/pmm-sim  
**Created:** 2025-12-19  
**License:** MIT  

**Type:** Independent simulation and benchmarking framework

Supports:

- HumidiFi v1/v2/v3
- SolFi V2
- Obric V2
- ZeroFi
- TesseraV
- GoonFi
- BisonFi

Features:

- direct and router-CPI swaps;
- split and multi-route swaps;
- live account/program fetching;
- CU and rate benchmarks;
- spoofed Jupiter, OKX, DFlow, and Titan callers;
- Parquet datasets.

**Best use:** reproducible behavior, account-layout research, caller-conditioned quotes, CU profiling.

**Caveat:** Independent reverse engineering; implementation compatibility is not operator endorsement or source-level verification.

#### LimeChain `magnus`

**URL:** https://github.com/LimeChain/magnus  
**Created:** 2025-10-29  
**License:** MIT  
**Type:** Modular open-source meta-aggregator

States that most proprietary AMMs are deliberately obfuscated and simulates them through a sandbox rather than decoding local state.

**Best use:** understanding how third-party routers can integrate opaque programs.

#### DFlow Clearpools

**URL:** https://github.com/DFlowProtocol/clearpools  
**Created:** 2024-10-23  
**Type:** Official DFlow conditional-liquidity program and SDK  
**Program:** `C1ear1po7kcLBZiiArGMXPhGnjRZ8KxkqQ8EEskzHWmc`

**Best use:** concrete implementation of flow-segmented liquidity.

#### Jupiter integration repositories

- https://github.com/jup-ag/jupiter-amm-interface
- https://github.com/jup-ag/jupiter-amm-implementation
- https://github.com/jup-ag/jupiter-swap-api-client

**Best use:** generic integration contracts and router interfaces.  
**Caveat:** no named proprietary venue implementation was found in the checked `jupiter-amm-implementation` source tree.

### Unofficial reverse engineering

- `vitorpy/humidifi-explained`
- `mubarizkyc/humidifi_invoke`
- `AV0077/Dark-pools-2.0`
- `vscode1111/goonfi-v2-amm-research`
- `captorix/awesome-solana-prop-amms`

These are useful leads but should be isolated in a “community reverse engineering” appendix, not cited as operator documentation.

---

### 10. Podcasts, talks, and explainers

| Title | Publisher | URL | Evidentiary value |
|---|---|---|---|
| How HumidiFi Became Solana’s Largest Prop AMM | Lightspeed | https://www.youtube.com/watch?v=Psu4W8XCkP0 | Interview/explainer; verify speaker claims against data |
| Breakpoint 2025: Product Keynote: HumidiFi (Kevin Pang) | Solana | https://www.youtube.com/watch?v=47fzkScJyDE | High-value first-party presentation lead |
| Breakpoint 2025: Tech Talk: Ghost (Chris Chang) | Solana | https://www.youtube.com/watch?v=_VPQHv5WRP4 | Technical adjacent infrastructure; “PropAMM Technical Overview” in Solana article |
| Building a Prop AMM with Claude | Benedict Brady | https://www.benedict.dev/prop-amm | Technical toy design; not production disclosure |
| Application Controlled Execution through AMQs | Temporal | https://temporal.xyz/writing/application-controlled-execution-ace-through-asynchronous-market-queues-amqs | Official execution-layer research |

---

### 11. Disputed and unknown claims register

| Claim | Status | Reason |
|---|---|---|
| HumidiFi is operated by Temporal | **Credible but not conclusively corroborated** | Chorus One says so; current Temporal pages checked did not |
| SolFi was developed by Ellipsis Labs | **High confidence** | Chorus One plus Blockworks report of Ellipsis claiming it |
| TesseraV is run by Wintermute | **Credible but not conclusively corroborated** | Chorus One attribution; no official Wintermute source found |
| GoonFi operator identity | **Unknown** | No reliable primary source |
| ZeroFi operator identity | **Unknown** | No reliable primary source |
| BisonFi operator identity | **Unknown** | Community attribution uncorroborated |
| Aquifer operator identity | **Unknown** | Only label and reverse-engineering leads |
| Obric V2 is architecturally the same as older Obric | **Unsupported** | Accessible official docs concern Aptos |
| Prop AMMs hold 65% of current Solana DEX volume | **Historical, not current** | Chorus One’s December 2025 snapshot |
| HumidiFi has 65% of current SOL–USDC volume | **Historical, not current** | “Recently” in a December 2025 report |
| All prop AMMs remain closed source in August 2026 | **Not fully established** | True according to January 2026 Solana article; later status could change |
| “Dark pool” means trades are private | **False/misleading** | Settlement remains publicly observable |
| Titan is a prop AMM | **Not supported** | It describes itself as meta-aggregator/router |
| DFlow is a prop AMM | **Overbroad** | It is a trading API/router and operates conditional-liquidity infrastructure |
| Router-neutral best execution exists | **Disputed** | Caller-conditioned rates and private integrations undermine neutrality |

---

### 12. Prioritized bibliography

### Tier 1 — Primary or first-party technical evidence

1. **Brian Li / Solana Foundation. “Understanding Proprietary AMMs.” 2026-01-20.**  
   https://solana.com/news/understanding-proprietary-amms  
   **Type:** Official ecosystem explainer.  
   **Use:** Definition, architecture, drawbacks, validator interaction, closed-source/integration issues.  
   **Caveat:** Explanatory model, not a formal standard or audit of each venue.

2. **Jupiter. Program ID to Label API. Live endpoint.**  
   https://lite-api.jup.ag/swap/v1/program-id-to-label  
   **Type:** First-party machine-readable integration registry.  
   **Use:** Canonical current venue labels and program IDs.  
   **Caveat:** A label does not prove operator identity or architecture.

3. **DFlow. Clearpools repository.**  
   https://github.com/DFlowProtocol/clearpools  
   **Type:** Official code.  
   **Use:** Conditional liquidity and flow-segmentation implementation.  
   **Caveat:** Not necessarily a principal-capital prop AMM.

4. **DFlow documentation. “Welcome to DFlow” / API Introduction.**  
   https://pond.dflow.net/introduction  
   https://pond.dflow.net/resources/introduction  
   **Type:** Official docs.  
   **Use:** Router/API classification.

5. **Titan. “Titan Raises $7M Seed from Galaxy Ventures and Launches Publicly on Solana.” 2025-09-18.**  
   https://www.prnewswire.com/news-releases/titan-raises-7m-seed-from-galaxy-ventures-and-launches-publicly-on-solana-302560707.html  
   **Type:** Company press release.  
   **Use:** Product architecture and company claims.  
   **Caveat:** Self-reported volume/performance.

6. **Temporal. “Application Controlled Execution (ACE) through Asynchronous Market Queues (AMQs).” 2025-09-22.**  
   https://temporal.xyz/writing/application-controlled-execution-ace-through-asynchronous-market-queues-amqs  
   **Type:** Official technical research.  
   **Use:** Validator/execution-control context.

7. **LimeChain. `pmm-sim`.**  
   https://github.com/LimeChain/pmm-sim  
   **Type:** Open-source independent simulation tooling.  
   **Use:** Behavior and caller-conditioned quote reproduction.

8. **LimeChain. `magnus`.**  
   https://github.com/LimeChain/magnus  
   **Type:** Open-source independent router.  
   **Use:** Opaque-program integration architecture.

### Tier 2 — Strong analytical sources

9. **Rafal Klich / Chorus One. “Market Making, propAMMs, and Solana Execution Quality Landscape.” 2025-12-19.**  
   https://chorus.one/reports-research/market-making-propamms-and-solana-execution-quality-landscape  
   **Type:** Research report.  
   **Use:** Share, spreads, architecture, operator attributions.  
   **Caveat:** Historical window; adapted—not literal—Rule 605 methodology.

10. **Benedict Brady. “Building a Prop AMM with Claude.” 2026-01-08.**  
    https://www.benedict.dev/prop-amm  
    **Type:** Technical essay/toy model.  
    **Use:** Mechanism design and generalized curve examples.

11. **Blockworks Analytics. Solana DEX Activity.**  
    https://blockworks.com/analytics/solana/solana-dex-activity  
    **Type:** Data dashboard.  
    **Use:** Historical venue and pool-type shares.  
    **Caveat:** Inspect labels and counting methodology before citing.

### Tier 3 — Investigative and industry reporting leads

12. **Blockworks. “Ellipsis Labs claims credit for mysterious top Solana DEX.” 2025-05-01.**  
    https://blockworks.co/news/ellipsis-labs-claims-credit-mysterious-solana-dex  
    **Use:** SolFi/Ellipsis attribution.  
    **Caveat:** Article inaccessible during this run.

13. **Delphi Digital. “The Rise of Prop AMMs on Solana.” 2025-07-22.**  
    **Use:** Emergence narrative and early market mapping.  
    **Caveat:** Article inaccessible; do not quote details secondhand.

14. **DL News. “Solana’s $6bn ‘dark’ exchanges make trading more efficient — but at a cost.” 2025-08-07.**  
    **Use:** Investigative framing and industry concerns.  
    **Caveat:** Verify what “$6bn” measures.

15. **DL News. “Is this the secretive team behind $40bn Solana ‘dark’ exchange HumidiFi?” 2025-11-13.**  
    **Use:** Attribution investigation only.  
    **Caveat:** Treat identities and cumulative-volume numbers as reported claims until independently documented.

### Tier 4 — Dashboards requiring query inspection

16. https://dune.com/the_defi_report/prop-amms  
17. https://dune.com/solana_team/darkammsmarkedoutbyscheduler  
18. https://sandwiched.me/experiments

Do not cite chart values until the SQL, labels, update timestamps, and counting logic are reviewed.

---

### Recommended handbook conclusions

1. Present prop AMMs as **programmable principal market makers**, not merely “better AMMs.”
2. Separate three layers:
   - venue/program;
   - router/aggregator;
   - validator/block-building/execution control.
3. Treat venue identity, operator identity, architecture, and market share as four distinct claims with separate evidence.
4. Timestamp every volume/share statistic and preserve methodology.
5. Avoid calling all opaque venues dark pools.
6. Discuss caller-specific pricing and permissioned integration as a form of **onchain flow segmentation** analogous—but not identical—to wholesaling/PFOF.
7. Explain that onchain visibility does not guarantee practical transparency when source, quote function, and integration access remain private.
8. Include quote-to-fill quality, update freshness, landing probability, failed transaction cost, and priority fees—not only simulated output amount—in any execution comparison.

---

## Part II — Academic and market-microstructure foundations

**Research cut-off:** 2026-08-01  
**Purpose:** an expert-level map of the theory and evidence needed to analyze proprietary automated market makers (“prop AMMs”).  
**Source policy:** primary papers, peer-reviewed surveys/empirics, canonical protocol papers, and a small number of clearly labeled working papers. Versioned arXiv links identify the version inspected. Protocol documents are design specifications, not independent validation.

---

### 0. Executive thesis

A prop AMM is best understood not as a clever invariant but as an **automated dealer embedded in an adversarial, discrete-time settlement system**. Its economic problem is to quote a contingent schedule while controlling inventory, adverse selection, latency, gas, oracle, smart-contract, and block-ordering risks. The invariant is only one layer.

The central decomposition is:

\[
\boxed{\text{LP/market-maker P\&L}
= \text{spread and fees}
+ \text{inventory beta}
- \text{adverse selection/LVR}
- \text{rebalancing, gas, hedge and MEV costs}
+ \text{incentives}}
\]

A competitive prop AMM therefore needs four coupled engines:

1. **Fair value:** estimate the asset’s external or latent value and uncertainty.
2. **Quote/risk control:** transform fair value, inventory, toxicity, demand elasticity, and constraints into a curve, fee, or executable quote.
3. **Settlement/mechanism:** decide who may execute, when, in what order, and with which privacy or auction rule.
4. **Treasury/hedging:** choose capital, inventory targets, cross-venue hedges, and when to withdraw or refuse flow.

Classic dealer theory explains (1), (2), and inventory risk. CFMM theory explains deterministic state-dependent supply schedules. LVR theory isolates the cost of stale, mechanically arbitraged prices. Blockchain mechanism design explains why the right to order, observe, and backrun flow is itself valuable. No one model covers all four layers.

#### Minimal expert reading set

Read these first, in order:

1. Glosten & Milgrom (1985), Kyle (1985), Ho & Stoll (1981): information, price impact, inventory.
2. Avellaneda & Stoikov (2008): tractable inventory-aware optimal quotes.
3. Angeris et al., *An Analysis of Uniswap Markets* ([arXiv:1911.03380v7](https://arxiv.org/abs/1911.03380v7)); Uniswap v2/v3 whitepapers.
4. Angeris & Chitra, *Improved Price Oracles: CFMMs* ([arXiv:2003.10001v4](https://arxiv.org/abs/2003.10001v4)); Angeris et al., *Multi-Asset Trades via Convex Optimization* ([arXiv:2107.12484v1](https://arxiv.org/abs/2107.12484v1)).
5. Milionis, Moallemi, Roughgarden & Zhang, *Automated Market Making and LVR* ([arXiv:2208.06046v5](https://arxiv.org/abs/2208.06046v5)).
6. Heimbach, Schertenleib & Wattenhofer, *Risks and Returns of Uniswap v3 LPs* ([DOI](https://doi.org/10.1145/3558535.3559772); [arXiv:2205.08904v2](https://arxiv.org/abs/2205.08904v2)).
7. Daian et al., *Flash Boys 2.0* ([DOI](https://doi.org/10.1109/SP40000.2020.00040)); Qin et al., *SoK: Preventing Transaction Reordering Manipulations* ([DOI](https://doi.org/10.1145/3558535.3559784)).
8. Budish, Cramton & Shim, *The HFT Arms Race: Frequent Batch Auctions* ([DOI](https://doi.org/10.1093/qje/qjv027)).
9. Adams et al., *am-AMM* ([arXiv:2403.03367v4](https://arxiv.org/abs/2403.03367v4)); Bachu, Wan & Moallemi, *Quantifying Price Improvement in Order Flow Auctions* ([arXiv:2405.00537v2](https://arxiv.org/abs/2405.00537v2)).

---

### 1. What “proprietary AMM” should mean

The term is used inconsistently. A useful economic definition is:

> A **prop AMM** is a principal-liquidity strategy whose pricing, inventory allocation, fees, execution permissions, or hedging policy are actively controlled using proprietary signals or optimization, while execution is automated and often onchain.

This includes several architectures:

| Architecture | What is proprietary | Main analogue |
|---|---|---|
| Managed concentrated-liquidity LP | ranges, sizes, timing, fee tier, hedges | algorithmic dealer posting many limit orders |
| Oracle-anchored / proactive market maker | fair value, curve center, inventory target, spread | OTC dealer with skewed inventory quotes |
| Dynamic-fee CFMM | state- or signal-dependent fee | spread controller around a public supply curve |
| Auction-managed AMM | right to set fees/capture arbitrage | franchised specialist/dealer concession |
| RFQ / filler / solver | executable quote and routing | electronic market maker / internalizer |
| Intent-based hybrid | optimization over AMMs, CLOBs, private inventory | smart order router plus dealer auction |
| JIT liquidity | transaction-contingent capital | last-look or transaction-specific wholesaler |

It excludes a passive LP who merely deposits pro rata into an immutable fixed-fee pool. It may use a CFMM, but it need not: an RFQ engine or batch-auction solver is functionally an automated market maker even without a persistent invariant.

#### The important separation

- **Pricing rule:** where marginal and average execution prices come from.
- **Capital rule:** how much inventory is exposed at each state.
- **access rule:** public, allowlisted, RFQ, auction winner, hooks, or private relay.
- **timing rule:** continuous transaction order, per-block update, discrete batch, or offchain quote validity window.
- **surplus rule:** who receives spread, arbitrage, priority fees, price improvement, and solver surplus.

Many “AMM improvements” change only one rule and silently hold the others fixed.

---

### 2. Classic dealer microstructure

#### 2.1 Inventory models: why quotes skew before information enters

A dealer holds cash and risky inventory \(q\). Even with entirely uninformed order flow, random customer trades create inventory risk. Ho–Stoll and related dealership models choose bid/ask quotes to trade off expected spread revenue against the risk and financing cost of unwanted inventory.

The robust implication is not a specific formula but a sign condition:

\[
\frac{\partial \text{reservation price}}{\partial q}<0.
\]

A dealer long the risky asset lowers both bid and ask to encourage sales and discourage more purchases; a short dealer raises them. Competition, correlated inventories across securities, customer arrival elasticity, and the horizon determine spread and skew.

**Prop-AMM implication.** A symmetric invariant centered only on its own reserve ratio is not a complete dealer policy. A prop design should distinguish:

- **fair-value movement** (external information),
- **inventory skew** (desired liquidation/acquisition), and
- **curvature/depth** (price impact for size).

Changing curve center, left/right liquidity, or fee can implement the same economic skew, but they differ in path dependence and arbitrage leakage.

#### 2.2 Avellaneda–Stoikov as the bridge to algorithmic quoting

Under a Brownian midprice

\[
dS_t=\sigma dW_t,
\]

exponential utility \(U(W)=-e^{-\gamma W}\), and exponentially decreasing execution intensities \(\lambda(\delta)=Ae^{-k\delta}\), the canonical approximation gives an inventory-adjusted reservation price

\[
r_t=S_t-q_t\gamma\sigma^2(T-t)
\]

and symmetric half-spread around \(r_t\)

\[
\delta^*_t \approx \frac{1}{\gamma}\ln\!\left(1+\frac{\gamma}{k}\right)
+\frac{1}{2}\gamma\sigma^2(T-t).
\]

Thus quotes become wider with risk aversion, volatility, and horizon, while their center moves against inventory. The arrival elasticity \(k\) sets the monopoly/competition component.

**What transfers to prop AMMs**

- Dynamic fees are the analogue of spread width.
- Oracle/curve recentering is the analogue of reservation price.
- Concentrated-liquidity placement is a discretized depth schedule.
- A risk limit or withdrawal boundary replaces a dealer’s finite-horizon terminal penalty.

**What does not transfer automatically.** Onchain flow is neither independent Poisson flow nor conditionally uninformed; executions are strategically ordered, traders see deterministic state, arbitrage is endogenous, gas creates no-trade bands, and a quote may be copied atomically. A direct “plug in AS” strategy is therefore a baseline, not an equilibrium.

#### 2.3 Adverse selection: Glosten–Milgrom

In a sequential-trade model, a market maker faces informed traders with some probability and liquidity traders otherwise. Competitive bid and ask quotes satisfy zero expected profit conditional on trade direction:

\[
a=\mathbb E[V\mid \text{buy}],\qquad b=\mathbb E[V\mid \text{sell}].
\]

A buy itself is bad news for a seller; a sell is bad news for a buyer. The spread compensates for this Bayesian winner’s curse and can exist without inventory aversion or order-processing costs.

**Prop-AMM translation.** Transaction direction, size, route, gas bid, sender history, mempool timing, CEX moves, and correlated-pool state are toxicity signals. A public fixed curve cannot condition on identity or most pre-trade signals, so it systematically offers the same terms to noise and informed/arbitrage flow. Dynamic fees, private RFQ, batch auctions, or per-block oracle updates are mechanisms for recovering conditional pricing.

#### 2.4 Kyle: price impact and information incorporation

In the one-period Gaussian Kyle model, an informed trader trades against noise order \(u\); a market maker observes aggregate flow and sets price linearly. In the standard normalization,

\[
x=\beta(v-p_0),\qquad p=p_0+\lambda(x+u),
\]

with \(\beta=\sigma_u/\sigma_v\) and \(\lambda=\sigma_v/(2\sigma_u)\). More noise liquidity lowers price impact; informed traders strategically conceal information within noise.

**Prop-AMM translation.** Curvature is an explicit price-impact function, but unlike Kyle’s market maker, a vanilla CFMM does not infer value from flow—it mechanically maps inventory into price. Arbitrage against external venues performs the inference ex post. A sophisticated prop AMM should ask whether order flow itself predicts future fair value and should not confuse reserve-induced price movement with price discovery.

#### 2.5 Spread decomposition and dealer competition

Empirical microstructure decomposes spreads into order processing, inventory holding, and adverse selection. Onchain, add:

- gas and failed-transaction risk;
- state-latency and oracle risk;
- block-builder/searcher rents;
- smart-contract and bridge risk;
- hedge basis, venue credit, and withdrawal latency;
- capital/opportunity cost.

A fee is revenue only before accounting for all of these. Competition can narrow visible fees while shifting rents to priority payments, private-order-flow rebates, toxic-flow avoidance, or vertically integrated block building.

---

### 3. CFMM mathematics

#### 3.1 General trading function

A constant-function market maker holds reserves \(R\in\mathbb R_+^n\) and accepts a trade \(\Delta\) if a trading function remains on or above an invariant level:

\[
\varphi(R+\Delta)\ge \varphi(R).
\]

With differentiable \(\varphi\), local marginal prices are ratios of gradients:

\[
p_{i/j}(R)=\frac{\partial_i\varphi(R)}{\partial_j\varphi(R)}.
\]

Under monotonicity and concavity/quasiconcavity conditions, trade and routing problems can often be written as convex programs. The invariant is a **state-contingent supply schedule**, not an estimator of fundamental value.

#### 3.2 Constant product

For reserves \((x,y)\):

\[
xy=k,\qquad P\equiv \frac{y}{x}.
\]

If a trader sends \(\Delta x\) and fee fraction is \(f\), effective input is \((1-f)\Delta x\), and output is

\[
\Delta y_{\rm out}=y-\frac{k}{x+(1-f)\Delta x}.
\]

The average execution price differs from the pre-trade marginal price; without fees, the relative price impact for input \(\Delta x\) scales roughly as \(\Delta x/x\) for small trades. Deeper reserves reduce impact but expose more capital to informed flow.

For external price \(P\), an arbitraged zero-fee pool has

\[
x(P)=\sqrt{k/P},\quad y(P)=\sqrt{kP},\quad V(P)=Px(P)+y(P)=2\sqrt{kP}.
\]

Compared with holding the initial tokens when price changes by ratio \(r=P/P_0\), the familiar “impermanent loss” ratio is

\[
\mathrm{IL}(r)=\frac{2\sqrt r}{1+r}-1.
\]

This endpoint statistic omits path-dependent fees and the timing of arbitrage; LVR addresses that omission.

#### 3.3 Weighted geometric mean and stable-swap curves

Balancer-style pools use

\[
\prod_i R_i^{w_i}=k,\qquad \sum_i w_i=1,
\]

which maintains target portfolio weights under continuous arbitrage. Curve’s StableSwap combines constant-sum behavior near a peg with constant-product behavior farther away. Its amplification parameter increases near-peg depth but increases exposure if the “stable” assets cease to be substitutable.

**Prop lesson.** Curvature encodes an economic prior. Flat near-peg pricing assumes mean reversion and low fundamental divergence. It is unsafe to infer low risk from low recent volatility when depeg jump risk dominates.

#### 3.4 Concentrated liquidity as a portfolio of local limit orders

Uniswap v3 lets liquidity \(L\) operate only on \([P_a,P_b]\). Within range,

\[
x=L\left(\frac1{\sqrt P}-\frac1{\sqrt{P_b}}\right),\qquad
 y=L\left(\sqrt P-\sqrt{P_a}\right).
\]

Equivalently, the position behaves like constant product in **virtual reserves**:

\[
\left(x+\frac{L}{\sqrt{P_b}}\right)
\left(y+L\sqrt{P_a}\right)=L^2.
\]

Narrowing the range multiplies local depth per dollar, but:

- increases the probability of going out of range;
- concentrates negative gamma and arbitrage loss where active;
- creates active range-management and gas costs;
- changes inventory discontinuously at boundaries;
- turns LP selection into a game against other LPs and flow.

A v3 position is economically a strip of infinitesimal limit orders that repeatedly sells the appreciating asset and buys the depreciating asset. “Capital efficiency” is not free efficiency; it is **more exposure per unit of capital to a chosen state region**.

#### 3.5 Replication and negative gamma

Angeris et al. show that CFMM payoffs can be interpreted as derivative-replication objects. A constant-product LP value \(V(P)=2\sqrt{kP}\) is concave:

\[
V''(P)=-\frac{\sqrt{k}}{2P^{3/2}}<0.
\]

The LP is long fee income and short realized variance/gamma. Concentration reshapes where this gamma lives. This options lens is essential for hedging: delta hedging removes first-order price exposure but not gamma loss, jumps, basis, transaction costs, or endogenous fees.

#### 3.6 Fees create a no-arbitrage band

With proportional fees, small discrepancies are not worth correcting. Ignoring gas and conventions, the pool/external price ratio remains inside a fee-sized band; gas, latency, hedge cost, and competition widen or randomize it. Therefore:

- observed pool prices need not equal external prices each block;
- higher fees reduce arbitrage frequency but may increase stale-price execution and reduce noise flow;
- oracle readings from a fee-bearing pool inherit endogenous lag/manipulation properties.

#### 3.7 Routing across pools

Optimal splitting across CFMMs is a convex optimization/network-flow problem under suitable concavity assumptions. A prop router compares marginal output after pool fees, gas, bridge/settlement risk, RFQ quotes, and probability of revert. Fragmentation can improve specialization but introduces duplicated liquidity, cross-pool arbitrage, and state-race risk. A quote that is best at simulation time may not be best at inclusion time.

---

### 4. Arbitrage, price discovery, and adverse selection

#### 4.1 Arbitrage is the AMM’s price-update mechanism

A vanilla AMM does not “discover” offchain value. If an external venue moves first, arbitrageurs trade against stale pool reserves until marginal prices align net of fees and costs. The arbitrageur earns the difference; LP inventory is updated at worse prices than an instantaneous frictionless rebalancer could obtain.

This leads to three distinct claims that must not be conflated:

1. **Mechanical price response:** any trade moves the AMM price.
2. **Cross-venue price incorporation:** arbitrage imports information from another venue.
3. **Original price discovery:** AMM order flow causes the market-wide efficient price to update.

Evidence of (1) or fast convergence does not prove (3). During CEX outages or for onchain-native assets, direction can reverse; lead–lag and information-share tests are needed.

#### 4.2 LVR: the clean adverse-selection benchmark

Milionis et al. compare a CFMM LP to a self-financing “rebalancing strategy” that holds the same instantaneous inventory map but trades continuously at the external market price. For an AMM mark-to-market value \(V(P)\) and diffusion

\[
dP_t=\mu_tP_tdt+\sigma_tP_tdW_t,
\]

the instantaneous zero-fee LVR rate is the convexity drag

\[
d\mathrm{LVR}_t
= -\frac12 V''(P_t)\sigma_t^2P_t^2dt
\quad (V''<0).
\]

For constant product, this becomes

\[
d\mathrm{LVR}_t=\frac{\sigma_t^2}{8}V(P_t)dt.
\]

Interpretation: arbitrageurs capture the cost of keeping the AMM’s inventory rule aligned with a moving efficient price. Under the model, LVR is predictable from local gamma and quadratic variation; expected price drift is not the source.

A useful profitability identity is

\[
\text{LP excess P\&L vs rebalancing benchmark}
\approx \text{fees}-\mathrm{LVR}-\text{implementation costs}.
\]

#### 4.3 Why LVR is powerful—and incomplete

LVR isolates one clean mechanism, but its benchmark assumes frictionless continuous external rebalancing. It does not by itself capture:

- finite/discrete block times and random inclusion;
- proportional fee-induced no-trade regions;
- jumps and oracle latency;
- CEX spread, fees, market impact, credit, and hedge delay;
- endogenous noise demand and elasticity;
- LP range changes, deposits, withdrawals, and gas;
- price discovery originating in the AMM;
- stale or manipulable “external” prices;
- competition among arbitrageurs and priority fees;
- capital constraints and risk aversion.

The 2024 *Rebalancing-versus-Rebalancing* critique usefully warns that the benchmark can overstate an implementable alternative’s performance. The right practice is to report **LVR plus an executable hedge/rebalance benchmark**, not to discard LVR.

#### 4.4 Discrete blocks and rent allocation

In discrete time, price changes accumulate between arbitrage opportunities. Larger block intervals generally create larger stale-price jumps; the mapping from volatility to loss depends on deterministic versus random block times, fees, and auction competition. Arbitrage profit may be dissipated into gas/priority bids or captured by an integrated searcher-builder rather than retained by the first searcher. From the LP’s perspective the loss remains; from a welfare perspective, who receives it and what resources are burned both matter.

#### 4.5 Empirical evidence

Heimbach et al. find that many Uniswap v3 LP positions would have been better off simply holding, with performance highly heterogeneous by pool, range, fee tier, timing, and sophistication. Fritsch & Canidio’s onchain measurement explicitly estimates arbitrage losses and fee profitability. These studies do not imply “all LPing is unprofitable”; they reject naive fee/APR comparisons and emphasize selection, survivorship, gas, and active-management costs.

**Required measurement for a prop AMM**

- mark inventory at a defensible contemporaneous benchmark;
- separate market beta from market-making alpha;
- attribute fees by toxic versus non-toxic flow where possible;
- measure post-trade markouts at several horizons;
- include reverted transactions, priority fees, and hedge costs;
- compare to hold, passive pool, and executable rebalancing baselines;
- report inventory VaR/ES, drawdown, capital utilization, and tail scenarios;
- avoid conditioning only on surviving ranges or executed quotes.

---

### 5. Dynamic fees, oracle anchoring, and active control

#### 5.1 Fee as a state-dependent spread

A prop AMM can choose

\[
f_t=f(\widehat\sigma_t,q_t,z_t,\text{flow toxicity},\text{latency},\text{gas},\text{competition}),
\]

where \(z_t\) is pool/oracle dislocation. The fee must balance:

- revenue per uninformed trade;
- adverse-selection protection;
- demand elasticity and routing share;
- delayed arbitrage and stale-price risk;
- strategic gaming of the fee update;
- predictability and composability for routers.

The optimal fee is generally increasing in volatility/toxicity and decreasing in competitive/demand elasticity, but this comparative static can reverse when higher fees delay necessary rebalancing or drive only benign flow away.

Recent working papers formulate dynamic fees as stochastic-control problems. They are useful frontier references, not settled empirical prescriptions. Backtests must account for the strategy changing routing, arbitrage, and LP entry—the Lucas critique applies.

#### 5.2 Oracle-based and proactive market makers

An oracle-anchored AMM quotes around external fair value \(S_t\), often with inventory-dependent skew. A generic local form is

\[
p(q)=S_t\,g(q-q^*;\kappa),
\]

where \(q^*\) is target inventory and \(\kappa\) controls impact. DODO’s PMM is the canonical protocol example; UAMM is an academic proposal.

**Advantages**

- avoids paying arbitrage merely to learn a widely observable external price;
- can distinguish fair value from reserve ratio;
- can make depth adaptive and asymmetric;
- directly implements dealer-style inventory control.

**New failure modes**

- oracle staleness, manipulation, outage, and chain reorganization;
- basis risk between oracle venue/index and hedgeable execution;
- update latency that creates a free option;
- circularity when the AMM contributes to the oracle;
- governance/control risk over oracle selection;
- toxic flow immediately before updates.

A robust design specifies source aggregation, timestamp/heartbeat, confidence, deviation bounds, fallback state, circuit breaker, stale-quote cancellation, and who bears loss during disagreement. “Uses an oracle” is not a risk model.

#### 5.3 Auction-managed AMMs and arbitrage recapture

The am-AMM auctions temporary pool-manager rights. The manager can set fees and capture small-price-move arbitrage; auction rent is intended to flow back to LPs. Economically, this franchises the specialist role and converts a common-pool latency race into an ex ante auction.

Its promise depends on assumptions: contestability, censorship resistance, sufficient bidder competition, manager capitalization, enforceable permissions, and user demand response. It may recapture rent without eliminating the underlying adverse-information cost; welfare and LP P&L improve only if auction revenue plus better fees exceed manager power, implementation, and participation costs.

#### 5.4 Managed concentrated liquidity

A prop v3/v4 strategy chooses range width and asymmetry, capital, recenter timing, fee tier/hook logic, and hedging. This is a stochastic-control impulse problem with transaction costs. Key state variables are price, volatility, inventory, current range, competitors’ depth, expected flow, gas, and hedge basis.

Narrow ranges are not automatically superior: they increase fee share near spot but require more intervention and create stronger local gamma. Correct evaluation includes every inactive interval and repositioning cost.

---

### 6. JIT liquidity

A JIT LP observes or predicts a large pending swap, mints liquidity around the current price immediately before it, collects a large share of the fee, and removes liquidity immediately after—often in the same block.

#### Economics

- **Trader:** often receives more depth and less price impact.
- **Incumbent LPs:** fee share is diluted; they may nevertheless benefit if JIT depth prevents the trade from routing elsewhere or reduces inventory shock.
- **JIT LP:** takes extremely short inventory exposure but still faces ordering, revert, price, and hedge risk.
- **Protocol/welfare:** more contestable transaction-specific liquidity can improve execution, but privileged mempool/order access can centralize rents.

Capponi, Jia & Zhu show a paradox: strategic JIT entry can crowd out passive liquidity, so more potential providers may reduce equilibrium standing liquidity. The equilibrium object is not per-trade slippage alone; it includes ex ante passive-LP participation. Later strategic analyses model competition and concentrated-liquidity details.

**Prop-AMM lesson.** JIT is transaction-conditioned wholesaling. Assess it like last-look/RFQ liquidity: price improvement, fill certainty, information advantage, passive-liquidity crowd-out, and access fairness all matter. Calling every JIT event an “attack” prejudges welfare.

---

### 7. MEV, transaction ordering, and the execution supply chain

#### 7.1 MEV taxonomy around AMMs

- **Atomic arbitrage:** correct stale prices across venues.
- **Backrun:** trade after a user or oracle update.
- **Sandwich:** buy before and sell after a slippage-tolerant user, worsening execution.
- **JIT liquidity:** insert liquidity around a known swap.
- **Liquidation/order interaction:** reorder related state transitions.
- **Cross-domain MEV:** exploit asynchronous states across chains/L2s/bridges.

A prop AMM’s quote is an option granted to whoever controls inclusion. Public mempools expose order details and slippage limits; deterministic smart contracts make profit simulation easy; atomicity makes multi-leg extraction low-risk.

#### 7.2 Why slippage tolerance is not a price

A user’s minimum output is a protection limit, not permission to execute at the worst acceptable price. Sandwichers turn this private constraint into extractable surplus. Execution quality must compare the realized all-in price with a contemporaneous benchmark and feasible alternatives, not merely verify that `minOut` passed.

#### 7.3 Private order flow and vertical integration

Private RPCs, relays, builders, fillers, and wallets can protect against public-mempool attacks, but they create a new market for exclusive flow. Gupta, Pai & Resnick show how private order flow can centralize proposer-builder separation. A wholesaler with exclusive retail flow can monetize spread, backruns, and builder advantage; rebates may share surplus but do not automatically restore competition.

Governance questions:

- Is the auction visible and contestable?
- Can a wallet or solver discriminate or self-preference?
- What benchmark defines user price improvement?
- Are failed fills and quote expiries observable?
- Who retains backrun and priority surplus?
- Can users opt out without degraded service?

#### 7.4 MEV mitigation families

| Mechanism | Benefit | Residual risk |
|---|---|---|
| Commit–reveal / encrypted mempool | hides order before commitment | latency, liveness, decryption committee/trust |
| Frequent batch auction | removes within-batch time priority; uniform clearing | batch latency, tie-breaking, solver power |
| Private relay | avoids public sandwiching | relay/builder trust and flow centralization |
| RFQ | firm personalized price, low public impact | dealer selection, last look, information leakage |
| Solver/intents | competition over routes and inventory | objective ambiguity, solver collusion, settlement complexity |
| MEV redistribution / auction | returns some backrun rent | does not necessarily prevent bad execution |
| Oracle recenter / dynamic fee | reduces stale-price option | oracle and control gaming |

No mechanism “solves MEV” universally; each changes information, timing, and property rights.

---

### 8. Batch auctions, RFQ, intents, and CLOB comparisons

#### 8.1 Frequent batch auctions

Budish–Cramton–Shim diagnose continuous-time markets with discrete public information: tiny speed advantages win races, creating socially wasteful latency investment. Frequent batch auctions group orders in short intervals and clear at a uniform price, replacing continuous time priority with price competition.


Onchain batches can reduce sandwiches and coincidence-of-wants can clear user orders directly before touching AMMs. But they require a credible solver/clearing rule, tie-breaking, censorship resistance, and a treatment of gas and failed settlement. Batch size trades latency for competition and netting.

#### 8.2 RFQ

An RFQ asks dealers for signed executable quotes. A prop firm can price with its own inventory and hedge venues rather than exposing a public curve. RFQ often offers strong execution for stable, predictable retail flow and large trades, while avoiding onchain price impact until settlement.

Evaluate:

- firm quote vs indicative quote and last look;
- response and expiry latency;
- fill/reject asymmetry after market moves;
- information leakage to queried dealers;
- dealer concentration and payment for order flow;
- settlement/gas and allowance risk;
- post-trade markout and effective spread.

#### 8.3 Intents and order-flow auctions

An intent states an outcome constraint; fillers/solvers compete over how to achieve it using AMMs, CLOBs, private inventory, bridges, and netting. UniswapX and CoW Protocol are canonical examples. The mechanism can convert routing and MEV into explicit competition for user surplus.

Bachu, Wan & Moallemi provide a framework for quantifying price improvement in order-flow auctions. The crucial design choice is the benchmark: pool quote at signing, arrival mid, best public route, or realized counterfactual. A weak benchmark can make rent retention appear as improvement.

#### 8.4 CLOB versus AMM versus RFQ/batch

| Dimension | CLOB | Public CFMM | RFQ / solver / batch |
|---|---|---|---|
| Quote granularity | discrete limit orders | continuous deterministic curve | firm quotes or optimized clearing |
| Capital cancellation | can cancel, subject to latency | persistent until state/LP change | quote expiry/batch commitment |
| Information conditioning | rich private strategy | mostly public state | private inventory/signals possible |
| Price discovery | often strong with informed order flow | often imports price via arbitrage | depends on benchmark and dealers |
| Small-asset bootstrapping | requires active makers | permissionless standing liquidity | requires solver/dealer interest |
| MEV/order sensitivity | time priority/latency | high in public mempool | reduced or relocated to auctioneer/solver |
| Composability | lower synchronously | high onchain composability | settlement-specific |
| Transparency | visible book, hidden orders possible | reserves and code visible | quote selection may be opaque |

The relevant comparison is total execution cost and resilience at matched latency, trade size, and market state—not headline fee or TVL.

---

### 9. Execution quality and welfare

#### 9.1 Trader metrics

For signed trade size \(Q\), benchmark price \(P^*\), and realized all-in price \(P_{exec}\), implementation shortfall is

\[
IS=\mathrm{side}\cdot Q(P_{exec}-P^*)+\text{gas}+	ext{failed-attempt costs},
\]

where side is +1 for a buy and −1 for a sell under a consistent convention.

Report:

- quoted, realized, and effective spread;
- price impact and post-trade markouts (seconds, blocks, minutes);
- fill rate, partial fill, revert, and latency distributions;
- gas/priority/bridge costs;
- sandwich/JIT/backrun incidence;
- price improvement against a reproducible counterfactual;
- tail execution in volatility, congestion, oracle outage, and depeg regimes.

#### 9.2 LP/prop metrics

- P&L versus hold and executable rebalancing;
- fees minus LVR/arbitrage loss;
- inventory beta and hedge P&L separately;
- capital utilization and active-range time;
- gas, failed transactions, CEX fees/impact/funding;
- inventory VaR/ES and drawdown;
- flow markouts by source/route;
- return on economic capital, not displayed TVL alone.

#### 9.3 Price discovery metrics

Use lead–lag regressions, information share/component share, variance ratios, price efficiency around news, and cross-venue error correction. Correct for timestamp quality, chain inclusion time, wash trading, stale quotes, and common oracle inputs.

#### 9.4 Welfare decomposition

A useful social accounting is

\[
\text{welfare}=	ext{gains from trade}
-\text{real resource costs}
-\text{risk-bearing costs}
-\text{information/agency harms}.
\]

Transfers (spread from trader to maker, arbitrage from LP to searcher) are not automatically deadweight loss. Gas burned in races, failed transactions, excess latency investment, and foregone efficient trades are real costs. However, transfer distribution changes participation: if passive LPs cannot cover adverse selection, standing liquidity exits and future trader surplus falls.

#### 9.5 Claims that evidence does **not** support

- “AMMs eliminate intermediaries.” They automate and redistribute intermediation.
- “Arbitrage is free price discovery.” It updates prices but is paid by stale quotes/LPs.
- “Higher TVL means better execution.” Only active depth at the trade size and price matters.
- “Narrower concentrated ranges are more capital efficient.” Only conditional on staying active and after management/gamma costs.
- “Dynamic fees eliminate impermanent loss.” They may price adverse selection but alter demand and arbitrage.
- “Private flow eliminates MEV.” It can relocate MEV and create market power.
- “Batch auctions are always fair.” Fairness depends on information, solver access, tie-breaking, and surplus allocation.
- “An oracle removes arbitrage loss.” It replaces one stale-price process with an oracle-dependent one.

---

### 10. A unified prop-AMM design model

Let state be

\[
X_t=(S_t,\widehat\sigma_t,q_t,R_t,z_t,c_t,m_t,h_t),
\]

where \(S\) is fair value, \(q/R\) inventory and reserves, \(z\) toxicity/order-flow signals, \(c\) chain/gas state, \(m\) competitor liquidity, and \(h\) hedge state. Controls may be

\[
u_t=(\text{center},\text{curvature/ranges},f_t,\text{size/access},\text{hedge},\text{cancel/withdraw}).
\]

A realistic objective is

\[
\max_u\;\mathbb E\!\left[
\text{fees+spread+rebates+auction rents}
-\text{adverse-selection loss}
-\text{gas/hedge/impact}
-\text{inventory penalty}
-\text{tail/operational penalties}
\right]
\]

subject to smart-contract, capital, oracle, latency, and risk constraints. In equilibrium, user demand, competitor depth, solver entry, arbitrage, and LP capital all respond to \(u\). Static historical replay is therefore optimistic unless it simulates those responses.

#### Design checklist

1. **Value:** Which price is fair, hedgeable, manipulation-resistant, and timely?
2. **Information:** Which trades are likely informed; what may the quote condition on?
3. **Inventory:** What is target inventory; where are hard limits and liquidation paths?
4. **Curve:** What economic prior does curvature encode; where is gamma concentrated?
5. **Fee:** Is it compensating inventory, information, gas, monopoly power, or all four?
6. **Timing:** Who sees an order before commitment; who owns the backrun?
7. **Competition:** Can users/LPs/solvers contest the relevant rents?
8. **Oracle:** What happens on staleness, divergence, outage, reorg, or manipulation?
9. **Hedge:** Is the benchmark executable at size and under stress?
10. **Measurement:** Are hold, LVR, executable rebalancing, and trader execution all reported?
11. **Security:** Can atomic composability, callbacks/hooks, flash loans, or rounding violate assumptions?
12. **Governance:** Who may update strategy, fees, oracle, allowlists, and emergency state?

---

### 11. Annotated bibliography

Labels: **MUST READ** = foundational for any prop-AMM researcher; **CORE** = required for the relevant architecture; **SPECIALIST** = narrower/frontier; **PROTOCOL** = canonical specification but not independent evidence.

### 11.1 Classic market microstructure

#### **MUST READ — Ho & Stoll (1981)**
Thomas Ho and Hans R. Stoll, “Optimal Dealer Pricing under Transactions and Return Uncertainty,” *Journal of Financial Economics* 9(1), 1981. [DOI 10.1016/0304-405X(81)90020-9](https://doi.org/10.1016/0304-405X%2881%2990020-9).

- **Contribution:** dynamic dealer pricing with transaction arrivals and risky inventory; formalizes inventory-dependent bid/ask control.
- **Assumptions:** stylized stochastic returns/arrivals, utility/risk criterion, dealer control over quotes.
- **Result for prop AMMs:** inventory should shift quote center and affect spread/depth; symmetric reserve-only pricing is not risk-neutral in practice.
- **Limit:** no asymmetric information, blockchain ordering, endogenous arbitrage, gas, or public deterministic quote copying.

#### **MUST READ — Glosten & Milgrom (1985)**
Lawrence R. Glosten and Paul R. Milgrom, “Bid, Ask and Transaction Prices in a Specialist Market with Heterogeneously Informed Traders,” *Journal of Financial Economics* 14(1), 1985. [DOI 10.1016/0304-405X(85)90044-3](https://doi.org/10.1016/0304-405X%2885%2990044-3).

- **Contribution:** spread from adverse selection; zero-profit quotes equal conditional expectations after buy/sell signals.
- **Assumptions:** sequential unit trades, informed/noise trader mixture, competitive risk-neutral specialist.
- **Prop relevance:** motivates toxicity-conditioned fees/quotes and explains why uniform public terms subsidize informed flow.
- **Limit:** simplified trade sizes and information process; no inventory or strategic transaction ordering.

#### **MUST READ — Kyle (1985)**
Albert S. Kyle, “Continuous Auctions and Insider Trading,” *Econometrica* 53(6), 1985. [DOI 10.2307/1913210](https://doi.org/10.2307/1913210).

- **Contribution:** strategic informed trading, linear price impact, and gradual information revelation amid noise flow.
- **Assumptions:** Gaussian value/noise, rational expectations, stylized competitive market maker.
- **Prop relevance:** separates information inference from mechanical curvature and supplies the canonical meaning of price-impact coefficient \(\lambda\).
- **Limit:** a CFMM does not observe aggregate flow and Bayesian-update in Kyle’s manner.

#### **MUST READ — Avellaneda & Stoikov (2008)**
Marco Avellaneda and Sasha Stoikov, “High-Frequency Trading in a Limit Order Book,” *Quantitative Finance* 8(3), 2008. [DOI 10.1080/14697680701381228](https://doi.org/10.1080/14697680701381228).

- **Contribution:** tractable stochastic-control model for optimal spread and inventory skew.
- **Assumptions:** Brownian midprice, exponential utility, Poisson fills with exponential quote-distance sensitivity.
- **Prop relevance:** direct conceptual template for dynamic fee (width), oracle center (reservation value), and inventory-aware liquidity placement.
- **Limit:** fill intensities are exogenous and onchain adverse selection/MEV is absent.

#### **CORE — Budish, Cramton & Shim (2015)**
Eric Budish, Peter Cramton, and John Shim, “The High-Frequency Trading Arms Race: Frequent Batch Auctions as a Market Design Response,” *Quarterly Journal of Economics* 130(4), 2015. [DOI 10.1093/qje/qjv027](https://doi.org/10.1093/qje/qjv027).

- **Contribution:** shows continuous-time processing plus discrete information produces latency races; proposes uniform-price frequent batches.
- **Prop relevance:** theoretical foundation for batch DEXs and replacing priority competition with price competition.
- **Limit:** transplanting to blockchains requires explicit censorship, solver, gas, and settlement models.

#### **SPECIALIST — Menkveld (2013)**
Albert J. Menkveld, “High Frequency Trading and the New-Market Makers,” *Journal of Financial Markets* 16(4), 2013. [DOI 10.1016/j.finmar.2013.06.006](https://doi.org/10.1016/j.finmar.2013.06.006).

- **Contribution:** empirical anatomy of an HFT market maker and cross-venue inventory/intermediation.
- **Prop relevance:** reinforces that apparent spread income must be analyzed with inventory, venue fragmentation, and speed advantage.
- **Limit:** regulated CLOB evidence, not permissionless settlement.

### 11.2 CFMM foundations and protocol mathematics

#### **MUST READ — Angeris, Kao, Chiang, Noyes & Chitra (2019/2020)**
Guillermo Angeris, Hsien-Tang Kao, Rei Chiang, Charlie Noyes, and Tarun Chitra, “An Analysis of Uniswap Markets.” [arXiv:1911.03380v7](https://arxiv.org/abs/1911.03380v7).

- **Contribution:** formal treatment of constant-product pricing, arbitrage, and liquidity properties.
- **Assumptions:** idealized reserves/trades and external-price arbitrage.
- **Prop relevance:** baseline against which active/oracle/dynamic designs must be compared.
- **Limit:** limited strategic ordering and empirical market response.

#### **MUST READ — Angeris & Chitra (2020)**
Guillermo Angeris and Tarun Chitra, “Improved Price Oracles: Constant Function Market Makers.” [arXiv:2003.10001v4](https://arxiv.org/abs/2003.10001v4); [SSRN DOI](https://doi.org/10.2139/ssrn.3636514).

- **Contribution:** general CFMM framework and conditions relating reserves, prices, and oracle behavior.
- **Prop relevance:** establishes the mathematical object and clarifies what pool prices can and cannot safely represent.
- **Limit:** security of a practical oracle also depends on block ordering, capital, averaging window, and external dependencies.

#### **MUST READ — Angeris et al. (2021)**
Guillermo Angeris, Alex Evans, Tarun Chitra, and Stephen Boyd, “Constant Function Market Makers: Multi-Asset Trades via Convex Optimization.” [arXiv:2107.12484v1](https://arxiv.org/abs/2107.12484v1).

- **Contribution:** convex formulation for optimal multi-asset CFMM trades.
- **Assumptions:** appropriate concavity/monotonicity and known pool state.
- **Prop relevance:** foundation for routers, arbitrage engines, and constrained quote optimization.
- **Limit:** ignores uncertain inclusion, gas races, and state changes unless added explicitly.

#### **CORE — Angeris, Chitra, Evans & Lorig (2021)**
Guillermo Angeris, Tarun Chitra, Alex Evans, and Matthew Lorig, “Replicating Market Makers.” [arXiv:2103.14769v1](https://arxiv.org/abs/2103.14769v1).

- **Contribution:** maps CFMM trading functions to replicated payoff profiles.
- **Prop relevance:** makes LP delta/gamma and derivative-like exposure explicit; informs curve design and hedging.
- **Limit:** idealized continuous/arbitraged setting; practical replication has fees, jumps, and discrete hedging.

#### **CORE — Angeris, Chitra, Diamandis & Evans (2022)**
Guillermo Angeris, Tarun Chitra, Theo Diamandis, and Alex Evans, “The Geometry of Constant Function Market Makers.” [arXiv:2308.08066v1](https://arxiv.org/abs/2308.08066v1).

- **Contribution:** geometric characterization of CFMMs and duality/portfolio structure.
- **Prop relevance:** deeper design language for feasible invariants and payoff engineering.
- **Limit:** specialist mathematical reference, not an empirical strategy guarantee.

#### **CORE — Angeris, Chitra, Evans & Boyd (2022)**
“Optimal Routing for Constant Function Market Makers.” [arXiv:2204.05238v1](https://arxiv.org/abs/2204.05238v1); [ACM DOI](https://doi.org/10.1145/3490486.3538336).

- **Contribution:** efficient convex optimization of trade splitting across CFMMs.
- **Prop relevance:** canonical basis for onchain route optimization and arbitrage.
- **Limit:** production routing must add gas, quote expiry, revert probability, and private liquidity.

#### **PROTOCOL — Uniswap v2 (2020)**
Hayden Adams, Noah Zinsmeister, and Dan Robinson, *Uniswap v2 Core*. [Canonical whitepaper PDF](https://uniswap.org/whitepaper.pdf).

- **Contribution:** constant-product implementation, cumulative price oracle, flash swaps, fee mechanics.
- **Prop relevance:** implementation-level baseline.
- **Limit:** protocol-authored specification; audit/security/economic evidence must come separately.

#### **PROTOCOL — Uniswap v3 (2021)**
Hayden Adams et al., *Uniswap v3 Core*. [Canonical whitepaper PDF](https://app.uniswap.org/whitepaper-v3.pdf).

- **Contribution:** concentrated liquidity, ticks, multiple fee tiers, oracle changes.
- **Prop relevance:** exact mechanics behind managed LP strategies and JIT liquidity.
- **Limit:** capital-efficiency claims are mechanical, not proof of net LP profitability.

#### **PROTOCOL — Uniswap v4 (2024)**
Uniswap Labs, *Uniswap v4 Core*. [Canonical whitepaper PDF](https://app.uniswap.org/whitepaper-v4.pdf).

- **Contribution:** singleton, flash accounting, hooks, customizable pool behavior.
- **Prop relevance:** implementation substrate for dynamic fees, oracle logic, access controls, and custom settlement.
- **Limit:** hooks enlarge attack/governance surface; each implementation needs independent analysis.

#### **PROTOCOL — Egorov / Curve StableSwap (2019)**
Michael Egorov, *StableSwap—Efficient Mechanism for Stablecoin Liquidity*. [Canonical Curve-hosted whitepaper PDF](https://curve.fi/files/stableswap-paper.pdf).

- **Contribution:** hybrid invariant with high near-peg liquidity and constant-product tail behavior.
- **Prop relevance:** canonical example of encoding a mean-reversion/substitutability prior in curvature.
- **Limit:** amplification cannot protect against fundamental depeg; protocol-authored.

### 11.3 LP economics, LVR, and concentrated-liquidity evidence

#### **MUST READ — Milionis, Moallemi, Roughgarden & Zhang (2022/2024)**
Jason Milionis, Ciamac C. Moallemi, Tim Roughgarden, and Anthony Lee Zhang, “Automated Market Making and Loss-Versus-Rebalancing.” [arXiv:2208.06046v5](https://arxiv.org/abs/2208.06046v5).

- **Contribution:** defines LVR and links AMM loss to local gamma and realized variance relative to a continuous rebalancing benchmark.
- **Assumptions:** continuous external price diffusion, ideal arbitrage and benchmark trading; extensions discuss fees/discreteness.
- **Prop relevance:** cleanest adverse-selection accounting framework and design objective.
- **Limit:** benchmark is not necessarily executable; pair with real hedge/rebalance costs.

#### **MUST READ — Heimbach, Schertenleib & Wattenhofer (2022)**
Lioba Heimbach, Eric Schertenleib, and Roger Wattenhofer, “Risks and Returns of Uniswap V3 Liquidity Providers,” AFT 2022. [DOI](https://doi.org/10.1145/3558535.3559772); [arXiv:2205.08904v2](https://arxiv.org/abs/2205.08904v2).

- **Contribution:** empirical position-level LP returns and heterogeneity on v3.
- **Prop relevance:** demonstrates why fee APR and capital efficiency are insufficient performance metrics.
- **Limit:** chain/pool/sample period and counterfactual assumptions limit universality; strategies adapt.

#### **CORE — Fan et al. (2023)**
Zhou Fan, Francisco Marmolejo-Cossío, Daniel J. Moroz, Michael Neuder, Rithvik Rao, and David C. Parkes, “Strategic Liquidity Provision in Uniswap v3.” [arXiv:2106.12033v5](https://arxiv.org/abs/2106.12033v5); [AFT DOI](https://doi.org/10.4230/LIPIcs.AFT.2023.25).

- **Contribution:** game-theoretic analysis of range selection and LP competition.
- **Prop relevance:** liquidity placement is endogenous strategic competition, not a single-agent backtest.
- **Limit:** stylized beliefs/strategy spaces and market dynamics.

#### **CORE — Fan et al. (2022)**
Zhou Fan et al., “Differential Liquidity Provision in Uniswap v3 and Implications for Contract Design.” [arXiv:2204.00464v2](https://arxiv.org/abs/2204.00464v2).

- **Contribution:** documents/provider heterogeneity and implications of concentrated-liquidity allocation.
- **Prop relevance:** motivates segmentation between sophisticated and passive capital and better incentive design.
- **Limit:** observational identification and period-specific behavior.

#### **CORE — Fritsch & Canidio (2024)**
Robin Fritsch and Andrea Canidio, “Measuring Arbitrage Losses and Profitability of AMM Liquidity,” *The Web Conference 2024*. [DOI](https://doi.org/10.1145/3589335.3651961); [arXiv:2404.05803v2](https://arxiv.org/abs/2404.05803v2).

- **Contribution:** empirical measurement of arbitrage loss and net liquidity profitability.
- **Prop relevance:** operationalizes LVR-like accounting with onchain data.
- **Limit:** benchmark prices, MEV attribution, and offchain hedge costs remain measurement-sensitive.

#### **SPECIALIST — Willetts & Harrington (2024)**
Matthew Willetts and Christian Harrington, “Rebalancing-versus-Rebalancing: Improving the Fidelity of Loss-versus-Rebalancing.” [arXiv:2410.23404v1](https://arxiv.org/abs/2410.23404v1).

- **Contribution:** critiques frictionless LVR benchmark and proposes a more realistic comparison.
- **Prop relevance:** use alongside LVR to avoid overstating implementable alpha.
- **Limit:** alternative benchmark also requires modeling choices; does not invalidate LVR’s attribution identity.

#### **SPECIALIST — Nezlobin & Tassy (2025)**
Alex Nezlobin and Martin Tassy, “Loss-Versus-Rebalancing under Deterministic and Generalized Block-Times.” [arXiv:2505.05113v3](https://arxiv.org/abs/2505.05113v3).

- **Contribution:** extends LVR reasoning to block-time structure.
- **Prop relevance:** directly relevant to chain/L2 choice and quote-update frequency.
- **Limit:** frontier working paper; validate assumptions against actual inclusion and builder behavior.

### 11.4 MEV and ordering

#### **MUST READ — Daian et al. (2020)**
Philip Daian et al., “Flash Boys 2.0: Frontrunning in Decentralized Exchanges, Miner Extractable Value, and Consensus Instability,” IEEE S&P 2020. [DOI](https://doi.org/10.1109/SP40000.2020.00040).

- **Contribution:** identifies and measures priority gas auctions/front-running and connects DEX MEV to consensus security.
- **Prop relevance:** ordering is part of market design and P&L, not a neutral transport layer.
- **Limit:** pre-PBS Ethereum era; mechanisms evolved, core ordering economics persists.

#### **MUST READ — Qin et al. (2022)**
Kaihua Qin et al., “SoK: Preventing Transaction Reordering Manipulations in Decentralized Finance,” AFT 2022. [DOI](https://doi.org/10.1145/3558535.3559784).

- **Contribution:** taxonomy and assessment of reordering attacks and defenses.
- **Prop relevance:** design menu for public/private order handling and mitigation assumptions.
- **Limit:** fast-moving infrastructure means implementation details require current verification.

#### **CORE — Bartoletti, Chiang & Lluch-Lafuente (2022)**
Massimo Bartoletti, James Hsin-yu Chiang, and Alberto Lluch-Lafuente, “Maximizing Extractable Value from Automated Market Makers.” [arXiv:2106.01870v4](https://arxiv.org/abs/2106.01870v4); [LNCS DOI](https://doi.org/10.1007/978-3-031-18283-9_1).

- **Contribution:** formal optimization of MEV strategies against AMMs.
- **Prop relevance:** establishes that composable deterministic states admit systematic extraction.
- **Limit:** model scope and transaction set omit parts of real builder/searcher competition.

#### **CORE — Kulkarni, Diamandis & Chitra (2022)**
Kshitij Kulkarni, Theo Diamandis, and Tarun Chitra, “Towards a Theory of Maximal Extractable Value I: Constant Function Market Makers.” [arXiv:2207.11835v2](https://arxiv.org/abs/2207.11835v2).

- **Contribution:** theoretical CFMM MEV framework.
- **Prop relevance:** links market geometry and extractable value; useful for formal mechanism comparisons.
- **Limit:** theoretical abstraction; empirical rent allocation requires builder/relay data.

#### **CORE — Gupta, Pai & Resnick (2023)**
Tivas Gupta, Mallesh M. Pai, and Max Resnick, “The Centralizing Effects of Private Order Flow on Proposer-Builder Separation.” [arXiv:2305.19150v2](https://arxiv.org/abs/2305.19150v2); [AFT DOI](https://doi.org/10.4230/LIPIcs.AFT.2023.20).

- **Contribution:** models how exclusive private flow advantages builders and drives concentration.
- **Prop relevance:** private RFQ/relay protection has market-structure costs.
- **Limit:** equilibrium depends on auction and flow assumptions; monitor current PBS data.

### 11.5 JIT, dynamic fees, and managed AMMs

#### **CORE — Capponi, Jia & Zhu (2023/2025)**
Agostino Capponi, Ruizhe Jia, and Brian Zhu, “The Paradox of Just-in-Time Liquidity in Decentralized Exchanges: More Providers Can Sometimes Mean Less Liquidity.” [arXiv:2311.18164v2](https://arxiv.org/abs/2311.18164v2).

- **Contribution:** equilibrium model where JIT entry can crowd out passive liquidity and reduce standing depth.
- **Prop relevance:** evaluates ex ante participation rather than only transaction-level price impact.
- **Limit:** outcomes depend on information/timing and entry assumptions; calibrate by venue.

#### **SPECIALIST — Llacer Trotti et al. (2025)**
Bruno Llacer Trotti, Weizhao Tang, Rachid El-Azouzi, Giulia Fanti, and Daniel Sadoc Menasche, “Strategic Analysis of Just-In-Time Liquidity Provision in Concentrated Liquidity Market Makers.” [arXiv:2509.16157v2](https://arxiv.org/abs/2509.16157v2); [DOI](https://doi.org/10.4230/LIPIcs.AFT.2025.8).

- **Contribution:** strategic JIT competition in concentrated liquidity.
- **Prop relevance:** transaction-specific capital allocation and incumbent interaction.
- **Limit:** model parameters and same-block capabilities may be chain-specific.

#### **CORE — Adams, Moallemi, Reynolds & Robinson (2024/2025)**
Austin Adams, Ciamac C. Moallemi, Sara Reynolds, and Dan Robinson, “am-AMM: An Auction-Managed Automated Market Maker.” [arXiv:2403.03367v4](https://arxiv.org/abs/2403.03367v4).

- **Contribution:** auctions pool-manager rights to adapt fees and recapture arbitrage for LPs; proves higher equilibrium liquidity under stated conditions.
- **Prop relevance:** archetypal mechanism for delegating proprietary management while auctioning rents.
- **Limit:** result depends on bidder competition, censorship resistance, demand, and manager behavior.

#### **SPECIALIST — Baggiani, Herdegen & Sánchez-Betancourt (2025)**
Leonardo Baggiani, Martin Herdegen, and Leandro Sánchez-Betancourt, “Optimal Dynamic Fees in Automated Market Makers.” [arXiv:2506.02869v3](https://arxiv.org/abs/2506.02869v3); [SSRN DOI](https://doi.org/10.2139/ssrn.5278863).

- **Contribution:** stochastic-control treatment of dynamic fee choice.
- **Prop relevance:** frontier formal basis for state-dependent spreads.
- **Limit:** working paper; model demand/arbitrage responses may not identify production policy.

#### **SPECIALIST — Ghasemlu (2026)**
Farbod Ghasemlu, “Optimal Dynamic Fees for Automated Market Makers: A Stochastic Control Approach to Loss-Versus-Rebalancing.” [arXiv:2606.21769v1](https://arxiv.org/abs/2606.21769v1).

- **Contribution:** directly couples dynamic fees to LVR control.
- **Prop relevance:** latest pre-cutoff formal development.
- **Limit:** very recent v1 with no mature empirical validation; treat as research frontier.

#### **SPECIALIST — Alexander & Fritz (2024)**
Abe Alexander and Lars Fritz, “Fees in AMMs: A Quantitative Study.” [arXiv:2406.12417v2](https://arxiv.org/abs/2406.12417v2).

- **Contribution:** quantitative analysis of fee behavior/design.
- **Prop relevance:** empirical/calibration companion to formal fee models.
- **Limit:** results are data/venue/regime dependent.

#### **PROTOCOL — DODO PMM**
DODO, “Proactive Market Maker Algorithm.” [Canonical documentation](https://docs.dodoex.io/en/product/pmm-algorithm).

- **Contribution:** oracle-centered, inventory-sensitive proactive curve.
- **Prop relevance:** deployed archetype closest to a dealer-style oracle AMM.
- **Limit:** protocol-authored; oracle and economic performance need independent evidence.

#### **SPECIALIST — Im et al. (2023/2024)**
Daniel Jiwoong Im, Alexander Kondratskiy, Vincent Harvey, and Hsuan-Wei Fu, “UAMM: Price-oracle based Automated Market Maker.” [arXiv:2308.06375v2](https://arxiv.org/abs/2308.06375v2).

- **Contribution:** external-price and target-balance AMM with constant-product-like slippage.
- **Prop relevance:** formal oracle/inventory-centered alternative.
- **Limit:** claimed arbitrage elimination depends on an efficient, timely, reliable oracle.

### 11.6 Auctions, intents, and execution quality

#### **MUST READ — Bachu, Wan & Moallemi (2024)**
Brad Bachu, Xin Wan, and Ciamac C. Moallemi, “Quantifying Price Improvement in Order Flow Auctions.” [arXiv:2405.00537v2](https://arxiv.org/abs/2405.00537v2).

- **Contribution:** formal and empirical framework for OFA price improvement.
- **Prop relevance:** benchmark discipline for fillers/solvers and private prop quotes.
- **Limit:** measured improvement is only as meaningful as benchmark, timing, and sample selection.

#### **CORE — Gong, Liu & Kate (2023)**
Tiantian Gong, Zeyu Liu, and Aniket Kate, “The Case of FBA as a DEX Processing Model.” [arXiv:2302.01177v5](https://arxiv.org/abs/2302.01177v5).

- **Contribution:** applies frequent-batch-auction reasoning to DEX processing.
- **Prop relevance:** blockchain-specific bridge from Budish et al. to batch settlement.
- **Limit:** deployment assumptions about ordering/consensus and participant strategy require current validation.

#### **PROTOCOL — CoW Protocol**
CoW Protocol, “Fair Combinatorial Batch Auctions.” [Canonical documentation](https://docs.cow.fi/cow-protocol/concepts/introduction/fair-combinatorial-auction).

- **Contribution:** batch clearing with solver competition and coincidence-of-wants.
- **Prop relevance:** production model for solver-based execution and user-order netting.
- **Limit:** protocol documentation; solver concentration and realized execution need independent measurement.

#### **PROTOCOL — UniswapX (2023)**
Hayden Adams et al., *UniswapX*. [Canonical whitepaper PDF](https://uniswap.org/whitepaper-uniswapx.pdf).

- **Contribution:** Dutch-auction orders, fillers, route flexibility, and MEV/value competition.
- **Prop relevance:** principal architecture for prop fillers competing with public AMMs.
- **Limit:** performance depends on filler competition, exclusivity/decay, benchmark, and settlement conditions.

### 11.7 Surveys and broad empirical context

#### **MUST READ — Lehar & Parlour (2024)**
Alfred Lehar and Christine A. Parlour, “Decentralized Exchange: The Uniswap Automated Market Maker,” *Journal of Finance*, 2024. [DOI 10.1111/jofi.13405](https://doi.org/10.1111/jofi.13405).

- **Contribution:** characterizes liquidity-pool equilibrium, analyzes 95.8 million Uniswap interactions, compares the AMM with a centralized limit-order book, documents little long-lived arbitrage, and derives conditions under which the AMM dominates a limit market.
- **Assumptions/evidence:** equilibrium model plus a large historical Uniswap sample; venue architecture, gas, and trader composition are period-specific.
- **Prop relevance:** essential bridge between AMM theory, observed arbitrage, LP participation, and CLOB counterfactuals.
- **Limit:** fast-moving protocol versions, L2 settlement, private flow, concentrated liquidity, and endogenous strategy adoption limit direct extrapolation.

#### **CORE SURVEY — Xu, Paruch, Cousaert & Feng (2023)**
Jiahua Xu, Krzysztof Paruch, Simon Cousaert, and Yebo Feng, “SoK: Decentralized Exchanges with Automated Market Maker Protocols,” *ACM Computing Surveys*. [DOI](https://doi.org/10.1145/3570639); [arXiv:2103.12732v7](https://arxiv.org/abs/2103.12732v7).

- **Contribution:** systematic framework, protocol comparison, slippage/divergence loss, security/privacy literature.
- **Use:** broad map and terminology cross-check.
- **Limit:** survey cutoff predates much LVR/OFA/v4/frontier literature.

#### **CORE SURVEY — Schär (2021)**
Fabian Schär, “Decentralized Finance: On Blockchain- and Smart Contract-Based Financial Markets,” *Federal Reserve Bank of St. Louis Review* 103(2). [DOI](https://doi.org/10.20955/r.103.153-74).

- **Contribution:** institutional overview of DeFi stack, composability, risks.
- **Use:** situates AMMs within liquidation, lending, oracle, and governance dependencies.
- **Limit:** broad and early; not a microstructure model.

#### **CORE — Makarov & Schoar (2020)**
Igor Makarov and Antoinette Schoar, “Trading and Arbitrage in Cryptocurrency Markets,” *Journal of Financial Economics* 135(2). [DOI](https://doi.org/10.1016/j.jfineco.2019.07.001).

- **Contribution:** documents persistent cross-market crypto price dispersion and limits to arbitrage.
- **Prop relevance:** external “fair value” and frictionless cross-venue hedging cannot be assumed.
- **Limit:** mostly centralized-exchange/earlier-market evidence; mechanism still relevant.

#### **SPECIALIST — Barbon & Ranaldo (2021)**
Andrea Barbon and Angelo Ranaldo, “On the Quality of Cryptocurrency Markets: Centralized versus Decentralized Exchanges.” [arXiv:2112.07386v7](https://arxiv.org/abs/2112.07386v7).

- **Contribution:** comparative market-quality evidence across centralized and decentralized venues.
- **Prop relevance:** informs venue benchmarking and price-discovery claims.
- **Limit:** rapidly changing sample, chain costs, and DEX architecture; verify latest published version before formal citation.

---

### 12. Research agenda and unresolved questions

1. **Endogenous equilibrium:** dynamic fee/range strategies change flow routing, passive LP entry, JIT entry, and arbitrage—not captured by naive replay.
2. **Causal execution evidence:** wallet routing and private-order selection confound OFA/RFQ comparisons; randomized or quasi-experimental designs are rare.
3. **Oracle endogeneity:** onchain-native assets may lack an exogenous fair-value venue; LVR and price-discovery direction become jointly determined.
4. **Cross-domain inventory:** bridging latency and chain reorg risk make “atomic” hedging impossible across domains.
5. **Builder/solver concentration:** execution improvement and decentralization can move in opposite directions.
6. **Tail regimes:** depegs, oracle pauses, chain congestion, and CEX outages dominate solvency but are underrepresented in diffusion models.
7. **Hook composability:** customizable AMMs expand design space and attack surface; formal verification must include callback and cross-pool state.
8. **Welfare measurement:** better per-trade prices can coexist with less standing liquidity, greater censorship power, or more hidden rents.

9. **Risk-capital pricing:** few models jointly optimize user execution, LP participation, dealer solvency, and protocol revenue under realistic capital constraints.
10. **Prop strategy reproducibility:** reported alpha often omits failed actions, latency, gas bidding, private access, market impact, and survivorship.

---

### 13. Practical study path

1. Derive Ho–Stoll/Avellaneda–Stoikov reservation price and spread.
2. Derive constant-product output, IL, delta, gamma, and the \(\sigma^2V/8\) LVR rate.
3. Implement v3 amount/range equations and attribute a real LP position’s P&L.
4. Solve a multi-pool routing problem with gas and state uncertainty.
5. Reconstruct an arbitrage, sandwich, JIT mint/swap/burn, and private fill from traces.
6. Compare public AMM, managed LP, oracle PMM, RFQ, and batch auction using the same order stream.
7. Report trader shortfall, maker markouts, LP LVR, hedge costs, and welfare transfers separately.
8. Stress oracle divergence, volatility jumps, block delay, congestion, and passive-LP exit.

If a design cannot answer who estimates fair value, who bears inventory, who sees flow first, who captures rebalancing rent, and what executable benchmark proves improvement, it is not yet understood at expert level.

## Part III — Implementation, routing, MEV, measurement, security, and due diligence

**Research date:** 2026-08-01  
**Primary focus:** Solana; principles portable to other account- or contract-based chains  
**Audience:** protocol engineers, market makers, routers, auditors, risk teams, investors, and integrators

### 0. Evidence policy and terminology

A **proprietary AMM (prop AMM)** here means an on-chain swap program whose liquidity is principally the operator's capital and whose pricing/risk policy is actively updated by that operator, often with closed-source code and no public LP entry. A swap remains deterministic at execution, but the curve parameters, fair value, spread, inventory targets, and update policy may be proprietary.

This is not synonymous with a dark pool: transactions and state may be public even when source code and strategy are not. Nor is every oracle-based or protocol-owned-liquidity AMM proprietary.

**Evidence labels used below:**

- **Documented:** directly supported by a cited first-party document or public code.
- **Observed/reported:** on-chain analysis or a named practitioner report; useful, but time-bound and not proof of all implementations.
- **Design recommendation:** a proposed architecture/check, not a claim about a hidden venue.

Do **not** infer a venue's hidden formula from a few swaps, decompiled code on another chain, program size, account names, or routing share. Treat reverse engineering as a hypothesis until reproduced against broad state/size regimes and, ideally, confirmed by the operator. Helius explicitly notes that these venues are black boxes and that execution logic is not standardized [S8].

---

### 1. Executive model

A production prop AMM is best understood as five coupled systems:

1. **On-chain execution kernel** — custody, authorization, deterministic quote evaluation, token transfers, limits, invariants, and circuit breakers.
2. **State updater / risk engine** — off-chain fair value, volatility, inventory, flow quality, hedge costs, and curve parameters; signs low-cost state updates.
3. **Market-data plane** — CEX/DEX/oracle feeds, chain state, slots/leaders, block-engine and fee telemetry, with freshness and divergence controls.
4. **Distribution and execution plane** — router adapter, quote service/cache, transaction construction, simulation, priority fees, direct TPU/SWQoS/Jito/multi-path submission.
5. **Control and evidence plane** — key custody, upgrade governance, deployment, observability, accounting, replay, incident response, and independent execution-quality measurement.

A safe design assumes every boundary can fail independently. Tight spreads are not evidence of a sound system: the decisive questions are how stale quotes fail closed, how inventory loss is bounded, whether the off-chain and on-chain calculations agree, and who can change or withdraw what.

#### Canonical data path

```text
CEX books/trades ─┐
Pyth/other oracle ├─> normalized feeds -> fair-value/risk engine -> signed parameter update
On-chain venues ──┘          |                     |                         |
                         freshness/divergence   inventory/flow/vol       Solana program state
                                                                             |
Jupiter account cache -> AMM adapter update() -> deterministic quote() -> route selection
                                                              |              |
User signs route transaction -> submission paths -> leader scheduler/Jito -> atomic swap kernel
                                                              |
                           receipts/logs/state deltas -> TCA, P&L, alerts, replay, reconciliation
```

The router's off-chain quote is an indication computed from cached state, not a fill guarantee. The on-chain instruction must enforce the user's minimum output/maximum input and independently validate all state.

---

### 2. Venue comparison: where a prop AMM fits

| Venue | Price formation | Liquidity/capital | State/update cost | Main strength | Main weakness / diligence focus |
|---|---|---|---|---|---|
| Public CPMM (`xy=k`) | Passive invariant; trade moves price | Permissionless pooled LP | Very low between trades | Simple, composable, long-tail bootstrapping | Stale relative to external price; LVR/adverse selection; capital spread over curve |
| Public CLMM | LP-selected price ranges | Permissionless active/passive LP | Tick/range state; LP rebalance | Better capital efficiency near price | Out-of-range inventory, JIT liquidity, complex accounting, still public/stale |
| Prop AMM | Operator-updated fair value + proprietary curve/rules | Operator/protocol inventory | Cheap parameter update plus swap | Tight, inventory-aware, selective pricing; compact curve representation | Opaque, operator/oracle/key dependence, upgrade/censorship/conflict risk |
| CLOB (Phoenix/OpenBook) | Discrete bids/offers, price-time or venue rules | Makers post inventory | Cancel/replace many orders | Transparent depth and familiar maker control | Quote update compute/state; stale-order sniping; account complexity |
| RFQ | Maker returns signed firm/indicative quote | Maker balance/allowance | Off-chain request; on-chain settlement | Flow-aware exact size pricing; no standing stale curve | Availability/latency; maker concentration; quote leakage/last look semantics |
| Intent solver / batch auction | Solvers compete over user constraints | External venues, solver capital, CoWs | Off-chain auction; settlement | Competition and path flexibility; MEV-aware batch design | Auction/operator trust, solver centralization, latency, complex attribution |
| PMM (e.g., DODO family) | Oracle-anchored proactive curve | Usually pooled LP | Oracle + curve state | Concentrates around market price | Oracle and parameter risk; does not imply proprietary ownership/control |
| Market-maker vault | Strategy manages depositor capital | External LP/vault shares | Strategy-dependent | Outsources active making and broadens capital | Manager, valuation, withdrawal, leverage, loss socialization, and share-accounting risk |

**Economic distinction:** public AMMs expose passive capital to **loss-versus-rebalancing (LVR)** when arbitrageurs trade against stale inventory [S18]. A prop AMM tries to reduce this through active updates, flow selection, dynamic spreads, and hedging. It does not eliminate adverse selection; it converts passive mechanism risk into active model, latency, operational, and governance risk.

---

### 3. Solana on-chain architecture

#### 3.1 Recommended account graph

Use the smallest writable set possible, and separate slowly changing governance from hot market state.

- **Program / ProgramData:** executable and, if upgradeable, upgrade authority [S3]. Record deployed binary hash and ProgramData authority.
- **Global config PDA (prefer read-only during swaps):** allowed token programs, emergency mode, authority registry, global limits. Avoid a single writable global counter on every swap.
- **Market PDA per pair or direction:** mints, vault addresses, decimals, pricing parameters, fee configuration, last update slot/time, sequence, status, inventory limits, oracle policy.
- **Vault token accounts:** program-controlled inventory; bind exact mint, token program, and PDA authority.
- **Oracle/parameter state:** either embedded per market or sharded. A tiny writable account can make updates cheap, but every swap on that market contends on it.
- **Authority/role PDAs:** separate update, pause, withdraw, fee, and upgrade powers. Use distinct keys and limits.
- **Optional per-market telemetry:** cumulative volume/fees can create avoidable write contention. Prefer emitted events and off-chain indexing unless on-chain accounting is essential.

Solana requires transactions to declare account keys and read/write status up front, enabling parallel execution [S1, S10]. Therefore:

- a shared writable global account serializes otherwise unrelated markets;
- read-only config can be shared without write conflicts;
- per-market state and vaults localize contention;
- unnecessarily writable accounts increase scheduling conflict and fee/landing risk;
- duplicate liquidity exposed through multiple adapters must be identified to prevent routers from treating the same inventory as independent capacity (`underlying_liquidities` exists for this purpose in Jupiter's interface [S6]).

#### 3.2 Swap instruction contract

A minimal robust swap takes:

- exact-in or exact-out mode;
- amount and user limit (`min_out` / `max_in`);
- market and vault accounts;
- source/destination token accounts and transfer authority;
- expected mints/token programs;
- optional flow credential/referrer;
- optional expected state sequence or maximum state age.

At execution:

1. Verify program ownership, PDA seeds/bumps, account discriminators, signer/writable flags, exact mint relationships, vault authority, and supported Token/Token-2022 behavior.
2. Load price parameters; reject paused, stale, out-of-order, excessive-confidence, or cross-source-divergent state.
3. Compute the fill with checked fixed-point arithmetic and explicit rounding direction.
4. Enforce per-trade, per-market, inventory, notional, and price-deviation limits.
5. Transfer input, transfer output, and verify token deltas where token extensions can alter amounts.
6. Recheck post-trade inventory/invariant; emit compact, versioned event data.
7. Fail atomically if any assertion fails.

Never trust the off-chain adapter, router label, user-supplied amount, account ordering, or an account's address alone. The on-chain program is the security boundary.

#### 3.3 State update instruction

A parameter update should include market ID, schema/version, sequence number, source timestamp, intended validity interval, price/confidence, curve/spread/size parameters, and signer domain separation (chain ID/genesis hash + program + market + instruction type). Recommended checks:

- authorized update signer and exact role;
- strictly increasing sequence or replay-resistant nonce;
- bounded forward/backward timestamp and slot age;
- bounded per-update price/spread/size change, with a separate emergency path;
- price confidence and source divergence thresholds;
- no silent schema downgrade;
- fail-closed expiry embedded in state so a dead updater automatically stops or widens swaps.

A low-CU update is economically valuable because Jito ranks conflicting bundles by tip/CU efficiency [S11]. Helius reported one observed implementation at 143 CUs, but that is an observation about HumidiFi in August 2025, **not a universal requirement or verified architecture for other venues** [S8]. Optimize after correctness: assembly/minimal frameworks enlarge audit and tooling risk.

#### 3.4 Transaction construction

- Build compute-budget instructions before business instructions; simulate representative worst cases and set a tight CU limit plus margin.
- Versioned transactions and address lookup tables reduce key-size pressure, but every lookup adds availability/management complexity [S4]. Do not use ALTs for Jito tip accounts per Jito's guidance [S11].
- Include a recent blockhash and a clear rebuild/re-sign policy; never blindly rebroadcast expired economic decisions.
- Pre-create token accounts where possible; account creation changes locks, rent, CU, and failure modes.
- Simulate the exact message (accounts, blockhash replacement policy, signatures if checked), then understand the time-of-check/time-of-use gap [S5].
- Log quote-state slot/sequence and transaction message hash so quote/fill divergence is attributable.
- Enforce idempotency in off-chain senders and safe duplicate behavior. A duplicated swap transaction with the same signature cannot execute twice, but rebuilt/re-signed economic orders can.

---

### 4. Router and Jupiter integration

#### 4.1 Documented Metis adapter contract

Jupiter's current first-party integration guide requires code health, traction, and a security audit, and specifies the `jupiter-amm-interface` adapter [S7]. The current public Rust trait exposes, among other methods [S6]:

- `from_keyed_account` — initialize from market state;
- `get_reserve_mints` — tradable mints;
- `get_accounts_to_update` — state dependencies to fetch/cache;
- `update` — deserialize/precompute when account state changes;
- `quote` — deterministic expected in/out and fee;
- `get_swap_and_account_metas` — construct the swap variant and account metas;
- flags for dynamic accounts, exact-out, unidirectionality, active state, account length, and underlying liquidity.

**Critical first-party constraint:** Jupiter batches/caches requested accounts and may call `quote` multiple times against the same cache; it permits **no network calls anywhere in the implementation** [S7]. Put network-dependent fair-value work in the operator updater, commit the result on-chain, and make the adapter a pure function of cached chain state.

The implementation guide recommends keeping adapter logic thin, doing expensive precomputation in `update`, taking reproducible snapshots, and integration-testing that local quotes equal simulated swaps [S9].

#### 4.2 Quote consistency contract

Treat these as explicit versioned contracts:

- **SDK math = on-chain math:** same integer widths, decimal normalization, fee order, transfer-fee treatment, and rounding.
- **Snapshot consistency:** quote state sequence/slot is recorded. Define acceptable sequence drift before execution.
- **Exact-in/out behavior:** do not advertise exact-out unless inverse math, fees, and rounding are fully tested.
- **Dynamic accounts:** declare them or the router can miss tick/oracle/vault state.
- **Capacity:** quotes must cap at available vault inventory and safety buffers.
- **Accounts length/CU:** routing quality must consider transaction fit and landing cost, not output alone.
- **Error semantics:** stale/paused/unsupported must return non-routable errors, not zero or optimistic output.

Test every amount regime: 0/1 atomic unit, decimal mismatch, near fee boundary, max supported size, near-empty vault, inventory limit, stale state, exact-out inversion, Token-2022 fees/hooks, and repeated routes sharing liquidity.

#### 4.3 Routing and flow classification

A router normally compares split and multi-hop paths on expected output, but real best execution also depends on:

- quote age and predicted quote-to-land latency;
- probability of landing and reverting;
- user priority fee/tip and account contention;
- transaction account/CU limits;
- slippage and state movement across hops;
- transfer taxes/fees and ATA creation;
- duplicated underlying liquidity;
- MEV exposure and submission path.

Jupiter currently documents a dedicated frontend signer and says a prop AMM can verify the signature to identify Jupiter frontend trades as retail/non-toxic flow and quote tighter [S7]. Presence of the pubkey is insufficient; the signature must validate. This is a **Jupiter assertion about its own credential**, not proof that every credentialed trade is economically benign forever.

Flow segmentation creates governance questions:

- Is better pricing tied to verifiable channel cost/risk, or discriminatory access?
- Can credential holders sublicense or leak clean-flow status?
- What happens when the API/professional flow mimics retail?
- Can an AMM refuse wallets, regions, competitors, or sandwich-protected paths?
- Does the router disclose materially different executable prices?
- Who rotates/revokes signer credentials, and how is outage handled?

A defensible policy uses coarse, auditable risk tiers; never puts sensitive identity data on-chain; rate-limits credential abuse; and reports execution by tier without exposing individual users.

#### 4.4 Private order flow

Private RPC, direct TPU, block-engine, RFQ, and router-exclusive flow can reduce public leakage, but privacy is a trust property of the entire path. Map every party that can observe the signed transaction: wallet, RPC, relay, router, simulator, block engine, leader, logging vendor, and retry service. Document retention, rebroadcast, affiliate/searcher access, encryption, and incident history.

“Private” must not mean “not in a public mempool” only—Solana has no Ethereum-style global public mempool, yet leaders/relays can still observe and reorder flow [S10]. Wide sandwiches can span blocks if an attacker obtains order flow [S14].

---

### 5. Fair value, inventory, spreads, and hedging

This section is a **reference design**, not a description of any specific hidden venue.

#### 5.1 Fair-value pipeline

Build a normalized, timestamped book from multiple independent inputs:

- high-liquidity CEX bids/asks/trades;
- on-chain CLOB/AMM states;
- Pyth or another authenticated oracle;
- FX/stablecoin basis and bridge/wrapper conversion;
- hedge venue fees, funding, borrow, withdrawal, and chain settlement risk.

Use robust aggregation (venue-quality weights, outlier rejection, median/trimmed estimator) and preserve both event time and receive time. A nominally fresh feed can be stale economically if its source is halted or its local consumer is delayed.

Pyth's first-party best practices emphasize checking publication time/freshness and confidence rather than consuming a naked point price [S15]. Recommended defense in depth:

- maximum age by asset and volatility regime;
- maximum confidence-to-price ratio;
- cross-source divergence and stablecoin-depeg checks;
- sequence monotonicity;
- independent kill source;
- degraded mode: smaller size/wider spread before full halt;
- clock/slot sanity; no dependence on wall-clock synchronization alone.

#### 5.2 Pricing skeleton

One auditable decomposition is:

```text
fair_mid = robust_external_mid + basis_adjustment + expected_hedge_cost
half_spread = floor
            + volatility_buffer(horizon)
            + latency_uncertainty
            + adverse_selection(flow_tier)
            + hedge/liquidity cost(size)
            + model/oracle uncertainty
inventory_shift = -k * normalized_inventory       # positive base inventory lowers quotes to encourage selling base
bid/ask = fair_mid + inventory_shift ± half_spread
size_limit = min(vault buffer, hedge depth, risk limit, confidence-based cap)
```

Use nonlinear size impact and hard caps; do not rely on spread alone. The relevant horizon is decision-to-final-hedge, not merely oracle-to-swap. Calibrate from out-of-sample markouts and hedge slippage, with minimum floors that models cannot override.

#### 5.3 Toxic-flow classification

Classify based on observable economic outcomes, not identity labels. Candidate features:

- signed channel credential and submission path;
- quote age and state sequence consumed;
- size relative to displayed depth and recent volume;
- contemporaneous external price move and short-horizon volatility;
- route shape, atomic backrun/arbitrage pattern, repeated failed probes;
- realized markouts at 1 slot, 400 ms, 1 s, 5 s, 30 s, and hedge horizon;
- wallet/program features only where legally/policy appropriate and resistant to Sybil evasion.

Avoid target leakage: post-trade markout is a label for training/evaluation, not a feature available before the trade. Use time-series splits and regime holdouts. Report false-positive cost (withholding good pricing from benign flow) and evasion robustness. A dedicated signer can be one feature, never the sole solvency control.

#### 5.4 Inventory and capital

Maintain risk in common economic units across on-chain vaults, pending transactions, unsettled hedges, CEX balances, borrows, and derivatives. Required limits:

- gross/net delta by asset and correlated group;
- per-market and global notional;
- one-sided vault depletion and minimum operating balances;
- pending/unconfirmed exposure by commitment level;
- venue/custodian/bridge concentration;
- hedge position, margin, liquidation distance, funding/borrow;
- stress loss and gap risk under feed/update outage.

**Capital efficiency must include duplicated and encumbered capital.** Useful measures include volume / average usable inventory, spread revenue / inventory, risk-adjusted return on capital, inventory utilization distribution, hedge collateral ratio, and worst-case loss under simultaneous on-chain inventory move plus hedge-venue failure. Raw volume/TVL can be gamed and ignores risk.

#### 5.5 Hedging and rebalancing

Choose among immediate external hedge, threshold/band hedge, internalization of opposing flow, on-chain rebalance, inventory transfer, or derivatives. Model:

- fee/slippage/funding/borrow;
- latency and partial fill;
- basis and wrapper risk;
- transfer/withdrawal outage;
- CEX counterparty and API-key compromise;
- hedge-induced information leakage;
- liquidation and margin-call feedback loops.

Separate **trading P&L**, **inventory mark-to-market**, **hedge P&L**, **fees/tips**, **funding/borrow**, **transfers**, and **unexplained reconciliation**. A strategy can show spread revenue while losing more to adverse selection or hedge costs.

---

### 6. Account locking, fees, landing, and MEV

#### 6.1 Scheduler reality

Solana transactions predeclare locks. Non-conflicting transactions can execute in parallel; write/write and read/write intersections conflict [S1, S10]. Historical descriptions of the old thread-local scheduler should not be treated as timeless protocol guarantees. Anza introduced the central scheduler to reduce conflicting work and later reported custom scheduler prevalence and a modular scheduler-binding direction [S12, S13]. Transaction placement can vary by validator implementation [S13].

Practical implications:

- optimize the exact writable set;
- estimate fees from the actual transaction/account keys (`getRecentPrioritizationFees` accepts account addresses) [S2];
- measure by leader/client/sender, not only network average;
- a high priority fee improves incentives but is not a universal deterministic ordering guarantee;
- direct TPU sender quality depends on leader targeting, pre-connected QUIC, fanout, stake/SWQoS, RTT, and validator scheduler [S13].

Anza's transaction-landing study defines slot latency and drop rate and shows why regional/validator stratification matters; its reported numeric results are experiment-specific, not an SLA [S13].

#### 6.2 Jito bundles and auctions

Current Jito documentation states [S11]:

- a bundle contains up to **5** signed transactions;
- transactions execute sequentially and atomically, all-or-nothing, within one slot;
- bundles compete in 50 ms parallel auctions partitioned by intersecting account locking patterns;
- ordering within a conflicting auction uses tip / requested-CU efficiency;
- a returned bundle ID means received, not landed;
- bundles require a tip; high demand may require more than the documented minimum;
- Jito's `sendTransaction` skips preflight; `bundleOnly=true` provides revert-protected single-transaction bundle semantics;
- tip and native priority fee solve different paths and both may matter;
- randomizing tip accounts reduces contention;
- standalone tip transactions create “uncle bandit” risk unless state-conditional.

Applications:

- atomically update state + hedge/rebalance where all legs are yours;
- ensure a tip only pays if intended state transitions occur;
- avoid bundling unrelated user swaps unless consent, ordering, and failure coupling are explicit;
- monitor auction bid efficiency and landed/failed status separately.

Jito's `jitodontfront` account provides a block-engine-specific sandwich mitigation with strict bundle-position rules, but Jito disclaims guarantees and says it does not cover third-party ordering [S11]. Treat it as one control, not proof of MEV protection.

#### 6.3 Multi-path and MEV-protected sending

Helius Sender documents simultaneous routing across Helius/Jito/other paths, and requires both a tip and a compute-unit price for its Sender service [S14]. Its optional MEV Protect avoids validators statistically associated with sandwiches; Helius explicitly describes a tradeoff from excluding leaders [S14]. These are vendor services and claims, so benchmark independently.

Do not spray a sensitive signed transaction to every path without a leakage model. Multi-path can improve landing while expanding observers. Define cancellation/expiry, duplicated submission handling, regional failover, and which path is permitted for each flow tier.

#### 6.4 MEV and conflicts of interest

Threat actors include searchers, RPC/relay operators, routers, validator leaders, the AMM operator, update authority, and hedge venue. Consider:

- front-/back-/sandwiching and wide sandwiches;
- stale-quote atomic arbitrage;
- oracle update frontrunning or censorship;
- withholding/delaying user swaps until an operator update lands;
- self-preferencing a router-owned venue;
- selective revert/last look after learning direction;
- validator/searcher vertical integration and geographic colocation;
- exclusive order flow and credential discrimination;
- censored wallets/assets/regions;
- leakage from simulation and retry services.

Umbra explains how latency, bundles, and validator/searcher integration create centralizing forces [S10]. Mitigations include transparent routing objective, conflict policy, per-venue execution reports, quote commitments/expiry, independent TCA, reproducible route replay, disclosed ownership, and governance separation. No single “MEV-protected” endpoint resolves operator conflicts.

---

### 7. Security and failure-mode register

| Failure / abuse | Consequence | Prevent/detect/respond |
|---|---|---|
| Stale or frozen updater | Quotes picked off; inventory drain | On-chain expiry; age/confidence/divergence checks; automatic widen/halt; independent heartbeat |
| Bad fair-value source / CEX spoof | Mispricing | Multi-source robust aggregation; venue caps; confidence; independent kill source; replay evidence |
| Update signer compromise | Arbitrary prices/limits | HSM/remote signer, role isolation, bounded deltas/notional, rotation, pause multisig, anomaly alert |
| Upgrade authority compromise | Entire program/vault logic replaced | Immutable deployment or multisig + timelock + binary hash allowlist + monitored ProgramData authority |
| Vault/withdraw authority abuse | Inventory theft | PDA custody, separate withdrawal role, destination allowlist, rate/notional limits, multisig/timelock |
| Router adapter/on-chain math mismatch | Failed swaps or systematically wrong quotes | Shared math library where feasible; golden vectors; snapshot simulation; differential/fuzz testing |
| Integer/decimal/rounding bug | Free value or invariant break | Checked arithmetic; explicit round against caller; property tests across decimals and bounds |
| Account substitution / confused deputy | Drain or unauthorized CPI | owner/discriminator/PDA/mint/token-program checks; exact account relationships; no arbitrary program IDs |
| Token-2022 extension surprise | Delta mismatch/reentrancy-like hook behavior | Explicit extension allowlist; transfer-hook review; fee-aware quotes; post-transfer balance assertions |
| Shared writable hotspot | DoS, high fees, poor landing | shard per market; read-only global config; remove telemetry writes; lock-set monitoring |
| Sequence replay / rollback | Old quote parameters restored | monotonic sequence, domain-separated signatures, slot/time window, schema version |
| Slippage/min-out omission | User extraction | mandatory user limits; exact units; reject zero/unsafe defaults; quote expiry |
| Unsupported exact-out inverse | User overcharged/failures | advertise only tested mode; monotonic inverse property tests |
| Oracle manipulation via own pool | Reflexive pricing drain | never rely solely on manipulable venue; liquidity/impact-aware source weighting; TWAP where appropriate |
| Hedge API/venue outage | Unbounded delta/basis/liquidation | conservative inventory caps, backup venues, dead-man widen/halt, margin buffers |
| RPC/Geyser/shred gap | Stale state/model | sequence gap detection, redundant providers, snapshot resync, no silent failover to stale data |
| Clock/NTP fault | Bad freshness/latency | source event time + slot/sequence; monotonic local clock; multiple NTP/PTP; sanity bounds |
| Jito tip paid without strategy | Direct loss | inline conditional tip or asserted state; no naked standalone tip; status reconciliation |
| Bundle accepted but not landed | Missed hedge/update | treat ID as acknowledgement only; status + chain confirmation; expiry-aware resubmission |
| Private-flow leakage | Sandwich/adverse selection | data-flow map, contractual controls, encryption, minimal logs, canary testing, path-specific markouts |
| Flow classifier evasion/bias | Toxic fills or unfair pricing | multiple signals; false-positive/evasion tests; coarse policy; independent review |
| Pause itself abused/censored | Selective denial | objective triggers, public status/reason, dual control, bounded emergency duration, incident review |
| Program closes/migrates market | Stranded funds/routes | explicit lifecycle state, withdrawal/recovery procedure, router delist automation |

#### 7.1 Audit scope

A smart-contract audit alone is insufficient. Require:

1. on-chain program and exact deploy commit/binary reproducibility;
2. Jupiter adapter and quote SDK;
3. updater signer and message protocol;
4. fair-value/risk service, feed normalization, and failover;
5. transaction builder/sender/bundle logic;
6. vault/treasury/hedge keys and CEX permissions;
7. infrastructure/IAM/secrets/supply chain;
8. governance, upgrades, emergency procedures;
9. economic/model review and adversarial simulation;
10. router/private-flow data handling and conflicts.

Closed source may protect strategy, but it prevents ordinary public verification. Compensating controls include confidential auditor access, reproducible build attestations, on-chain authority disclosure, invariant/solvency monitors, public incident policy, and independent route/TCA measurement. An audit report is point-in-time; map it to current program binary and authorities.

---

### 8. Measurement and observability taxonomy

#### 8.1 Event schema

For every quote/update/attempt/fill/hedge, persist immutable IDs and timestamps:

- market, direction, amount, flow tier (privacy-preserving), route and split;
- source feed event/receive times, fair mid, confidence, volatility, inventory, curve version;
- on-chain state slot/sequence used by adapter and executed by swap;
- quoted in/out/fee, user limit, baseline venue quotes;
- build/simulate/sign/send/leader-target/land/processed/confirmed/finalized times;
- message hash, signature, sender paths, CU requested/used, fee, tip, writable set;
- result/error, output delta, price, post-trade inventory;
- hedge decision/order/fill/cost and P&L attribution.

Do not overwrite failed attempts. Selection bias from analyzing only landed swaps can make both latency and profitability look much better than reality.

#### 8.2 Execution-quality formulas

Let `s=+1` for a user buy of base and `s=-1` for a user sell; `P0` is an independent decision-time mid; `Px` is volume-weighted execution price; `Ph` is independent mid at horizon `h`.

- **User effective half-spread (bps):** `10,000 * s * (Px - P0) / P0`.
- **User effective spread:** twice the half-spread.
- **User markout cost at h (bps):** `10,000 * s * (Px - Ph) / P0`; positive means execution was expensive relative to the later mid.
- **Maker adverse-selection markout:** use the opposite sign or state it explicitly; never mix conventions.
- **Implementation shortfall:** signed execution cost versus price when the trading decision/intent was formed, plus fees/tips and opportunity cost of unfilled quantity.
- **Price improvement:** signed difference from a frozen, executable benchmark quote for the same size and constraints.

Always publish benchmark, clock, horizon, fee inclusion, buy/sell sign, weighting, and handling of partial/unfilled trades. Stablecoin/USD is not automatically a risk-free numeraire.

#### 8.3 Metric families

**Quote competitiveness**
- bid/ask and size ladder versus independent fair mid;
- quoted spread by size, asset, volatility, inventory, and flow tier;
- top-route and route-share probability;
- price improvement versus public CPMM/CLMM/CLOB/RFQ baselines;
- capital-normalized executable depth.

**Quote integrity**
- quote-to-simulation and quote-to-fill error (bps/units);
- stale-quote rate by state sequence drift;
- exact-in/out mismatch;
- adapter exceptions/timeouts; snapshot coverage;
- route selected but venue unavailable.

**Landing/reliability**
- attempt → accepted → landed → processed → confirmed → finalized funnels;
- drop, revert, expiry, blockhash, lock conflict, CU exhaustion, slippage failure;
- slot latency and wall latency p50/p95/p99;
- fee/tip/CU and landing elasticity;
- by leader/client/region/sender path/writable set.

**User outcomes**
- effective spread, implementation shortfall, fees/tips, markouts;
- fill rate and opportunity cost of unfilled amount;
- sandwich incidence and loss estimate;
- outcomes by size/asset/channel without survivorship bias.

**Maker economics/risk**
- gross spread revenue; adverse-selection markout; hedge slippage/fees/funding; Jito tips/priority/base fees; net trading P&L;
- inventory delta, age, utilization, turnover, VaR/stress loss, limit breaches;
- volume and net P&L per usable inventory and per CU;
- hedge completion latency and basis;
- source/venue/custodian concentration.

**MEV and market structure**
- arbitrage/backrun adjacency; bundle share/tips; failed competitive attempts;
- order-flow concentration by router/credential;
- venue and router HHI, ownership conflicts, exclusion events;
- update-before-taker ordering rate and user outcomes (without presuming manipulation).

**Security/operations**
- update heartbeat/gap/age; cross-source divergence; signer errors;
- binary/authority/config changes; vault reconciliation drift;
- RPC/feed path health; incident MTTD/MTTR; pause duration;
- unexplained P&L and token-balance reconciliation.

#### 8.4 Benchmarking rules

1. Freeze the same decision-time state; do not compare a filled prop-AMM trade with a public pool minutes later.
2. Compare executable size, route/account/CU limits, token extensions, and all fees.
3. Include failures and opportunity costs, not only successful fills.
4. Separate routing benefit from venue benefit: replay optimizer with and without the venue.
5. Prevent self-referential benchmarks: an on-chain mid moved by the evaluated trade is not independent.
6. Use paired observations and bootstrap confidence intervals; stratify by regime/size/direction.
7. Reproduce with raw signatures, state slots, code/adapter versions, and benchmark feed provenance.
8. Label counterfactuals. Historical replay cannot know alternative validator ordering or hedge market impact exactly.

Helius's latency guide recommends co-location, parallel-stream comparisons, and percentile/tail analysis; it warns that distributed systems lack a universal absolute clock and that local consumer tests are misleading [S16].


---

### 9. Simulation, backtesting, and verification

#### 9.1 Layered test stack

1. **Math unit/property tests:** monotonic output, conservation/invariant, no free round trip beyond fees, bounds, rounding, decimal permutations.
2. **Differential tests:** SDK/adapter/on-chain program over identical serialized snapshots.
3. **Program runtime tests:** LiteSVM/Mollusk/Bankrun/local validator for CPI, token extensions, account locks, and errors.
4. **Mainnet snapshot fork/replay:** real account layouts, mints, and representative routes; no live funds.
5. **Historical event replay:** reconstruct fair value and state causally using only data available at each timestamp.
6. **Agent-based/adversarial simulation:** takers, arbitrageurs, sandwichers, update races, inventory shocks, hedge outages, feed corruption.
7. **Shadow mode:** emit would-have-quoted parameters without trading; compare to live routes and markouts.
8. **Canary capital:** strict notional/asset/channel limits and automatic rollback/halt.

#### 9.2 Backtest realism checklist

- event-time ordered feeds with recorded receive latency and gaps;
- update transaction build/send/land distribution, not instantaneous updates;
- router cache cadence and route recomputation;
- Solana slot/leader/scheduler and account contention approximation;
- priority fees, Jito tips, failed transaction fees, CU/account limits;
- user limit and flow mix; classifier available at decision time only;
- hedge depth, partial fill, queue position, fees/funding, exchange outage;
- inventory/collateral transfers and confirmation delay;
- parameter/version history and kill switches;
- out-of-sample volatile/depeg/congestion regimes.

#### 9.3 Required invariants and chaos cases

- Vault token deltas equal economically authorized swap deltas after token fees.
- No successful swap exceeds user limit, market size, vault buffer, or inventory limit.
- Expired/divergent/invalid state cannot trade.
- Sequence rollback/replay fails.
- A killed updater causes a bounded, observable degraded state.
- Any single feed/RPC/sender/region/CEX failure does not create unbounded exposure.
- Pause and authority rotation work under congestion.
- Upgrade rollback/recovery is rehearsed and binary-authority monitoring alarms.
- Reconciliation reaches zero explained difference or halts at a small threshold.

---

### 10. Build plan and design checklist

#### Phase A — specification and threat model

- [ ] Define assets, flow sources, exact-in/out, max size, risk appetite, hedge venues, and regulatory policy.
- [ ] Draw trust/data/authority boundaries and enumerate every transaction observer.
- [ ] Specify integer math, curve, fees, state schema, expiry, limits, and failure behavior.
- [ ] Choose immutable vs upgradeable deployment and publish authority matrix.
- [ ] Define best-execution objective and conflicts policy before router integration.

#### Phase B — on-chain kernel

- [ ] Per-market sharded state; minimal writable lock set.
- [ ] PDA/owner/mint/token-program/discriminator validation.
- [ ] Checked arithmetic, explicit rounding, Token-2022 allowlist.
- [ ] User slippage limits plus state age/sequence/inventory/notional guards.
- [ ] Role-separated update/pause/withdraw/upgrade keys and bounded emergency actions.
- [ ] Versioned events sufficient for full reconciliation without hot telemetry writes.

#### Phase C — data and risk engine

- [ ] Multiple independent feeds; event/receive timestamps; confidence and divergence.
- [ ] Causal fair value, volatility, inventory, flow, hedge-cost decomposition.
- [ ] Hard floors/caps outside model control.
- [ ] HSM-backed domain-separated updates, monotonic sequence, key rotation.
- [ ] Dead-man widen/halt and tested feed/RPC/CEX failover.

#### Phase D — router and transaction plane

- [ ] Pure Jupiter adapter with no network calls; precompute in `update` [S7].
- [ ] Snapshot/golden/differential tests prove quote = simulated execution [S9].
- [ ] Correct dynamic accounts, exact-out flag, account length, active status, shared-liquidity ID.
- [ ] Tight CU estimation; v0/ALT strategy; pre-created accounts.
- [ ] Fee estimate from relevant writable accounts; regional leader targeting and warm connections.
- [ ] Jito/multi-path/privacy policy by flow type; conditional tips; explicit expiry/rebuild.

#### Phase E — launch and operations

- [ ] Independent smart-contract, adapter, infrastructure, key, and economic audits.
- [ ] Reproducible binary/deploy attestation; current audit-to-binary mapping.
- [ ] Shadow then canary; asset/notional caps; objective promotion gates.
- [ ] Real-time quote integrity, updater age, inventory, reconciliation, landing, and markout alerts.
- [ ] Public status/incident and router delist paths.
- [ ] Quarterly authority/tabletop/chaos review; post-upgrade re-audit triggers.

---

### 11. Due-diligence questionnaire and evidence requests

#### Ownership, governance, and conflicts

- Legal/beneficial owner, operator, market maker, router relationships, validator/searcher/relay affiliations?
- Program IDs, ProgramData accounts, upgrade authorities, timelocks, multisig thresholds and signers?
- Who can update price, pause, withdraw, change fees/limits, migrate vaults, or discriminate flow?
- Any exclusive order-flow, rebates, payment-for-order-flow, self-preference, or data-sharing agreement?
- Public policy for delisting, censorship, credentialing, incidents, and user remediation?

#### Program and custody evidence

- Source under NDA, exact deployed commit, reproducible build, binary hash, IDL/account schema?
- Audit reports and unresolved findings mapped to current deployment?
- Vault list and owner/mint/program proofs; historical withdrawals and destinations?
- Authority transaction history and live on-chain verification, not screenshots?
- Token-2022 and arbitrary-CPI policy; formal properties and fuzz coverage?

#### Strategy and model risk

- Supported assets/sizes, fair-value sources, confidence/staleness/divergence thresholds?
- Curve/spread/inventory design at the level needed to bound loss (not necessarily alpha)?
- Worst loss under updater death, 5–20% gap, stablecoin depeg, feed corruption, and hedge outage?
- Classifier features, validation, false positives, Sybil/evasion, and prohibited sensitive attributes?
- Inventory/hedge/custodian concentration and liquidation buffers?

#### Routing and execution

- Current adapter source/version; snapshot tests; quote-vs-sim/fill distributions?
- Exact router credential verification and revocation; can API flow spoof the tier?
- Route share by source and dependency on one aggregator?
- Account/CU footprint, hot writable accounts, failure reasons, p95/p99 landing by leader/path?
- Transaction observers, retention, private-flow guarantees, and leakage tests?

#### Financial and operational evidence

- Daily reconciled vault + hedge + treasury balances and unexplained-difference policy?
- P&L decomposition net of adverse selection, tips/fees, hedge costs, funding/borrow?
- Volume/inventory, stress loss, max drawdown, limit breaches, and outages?
- Feed/RPC/CEX/HSM architecture, regions, RTO/RPO, on-call and incident history?
- Independent TCA using raw signatures and frozen executable benchmarks?

#### Red flags

- Audit cannot be tied to current binary; undisclosed single-key upgrade/withdraw authority.
- “Oracle protected” with no on-chain expiry/confidence/divergence check.
- Quote quality shown only for landed/credentialed trades or only versus a later benchmark.
- Raw volume or TVL offered as profitability/capital-efficiency proof.
- Private order flow asserted without observer/retention map.
- Backtest assumes instant updates, free/instant hedges, no failures, or future information.
- Refusal to disclose authority/vault addresses or independent balance reconciliation.
- Upgradeable closed source plus no timelock, attestations, monitoring, or confidential audit.
- Router/operator common ownership without objective routing and per-venue outcome reporting.

#### Investment/integration decision gates

1. **Blocker:** custody/upgrade/price authority cannot unilaterally drain or create unbounded loss.
2. **Blocker:** stale state fails closed on-chain.
3. **Blocker:** adapter/on-chain equivalence demonstrated over reproducible snapshots.
4. **Blocker:** raw balances and P&L reconcile; no unexplained material drift.
5. **High:** stress and chaos tests bound loss under updater/feed/hedge/sender failures.
6. **High:** independent TCA includes failures and shows persistent net execution benefit.
7. **High:** order-flow/privacy/conflicts terms are documented and monitorable.
8. **Medium:** concentration in router, validators, feeds, hedge venues, and operators is acceptable.
9. **Ongoing:** every binary, authority, risk-limit, credential, and material infrastructure change triggers review.

---

### 12. Prioritized source register

Dates are publication/update dates where clearly displayed; otherwise **live, accessed 2026-08-01**. “First-party” means the protocol/provider documents its own interface or system, not that every performance claim was independently verified.

#### Tier 1 — implementation-critical primary sources

**[S1] Solana, “Accounts.”** Live first-party protocol docs.  
https://solana.com/docs/core/accounts  
Supports: account model, ownership, data, executable/state separation, declared account access. Caveat: overview; runtime/client behavior evolves.

**[S2] Solana RPC, `getRecentPrioritizationFees`.** Live first-party API reference.  
https://solana.com/docs/rpc/http/getrecentprioritizationfees  
Supports: recent prioritization fee samples, optionally for a supplied set of writable accounts. Caveat: historical observations, not landing guarantee or full fee oracle.

**[S3] Solana, “Programs.”** Live first-party protocol docs.  
https://solana.com/docs/core/programs  
Supports: executable programs, deployment and upgrade authority concepts. Caveat: verify live ProgramData/loader version on-chain.

**[S4] Solana, “Versioned Transactions.”** Live first-party docs.  
https://solana.com/docs/core/transactions/versioned-transactions  
Supports: v0 messages and address lookup tables. Caveat: transaction/account/CU limits and feature status can change.

**[S5] Solana RPC, `simulateTransaction`.** Live first-party API reference.  
https://solana.com/docs/rpc/http/simulatetransaction  
Supports: pre-execution simulation configuration and output. Caveat: simulation is state/time dependent and not a landing/fill guarantee.

**[S6] Jupiter, `jupiter-amm-interface` Rust source.** Created 2024-04-11; repository active as of 2026-07-30; first-party code.  
https://github.com/jup-ag/jupiter-amm-interface  
https://raw.githubusercontent.com/jup-ag/jupiter-amm-interface/main/src/lib.rs  
Supports: exact current trait fields/methods, quote types, account-provider model, dynamic/exact-out/unidirectional/account-length/shared-liquidity hooks. Caveat: pin crate/commit; interface changes.

**[S7] Jupiter, “Integrate DEX into Metis.”** Live first-party integration guide, accessed 2026-08-01.  
https://dev.jup.ag/docs/swap/routing/dex-integration  
Markdown: https://dev.jup.ag/docs/swap/routing/dex-integration.md  
Supports: prerequisites; no network calls in adapter; account cache/update/quote flow; current dedicated Jupiter frontend signer and signature-verification warning. Caveat: Jupiter's “retail/non-toxic” classification is its policy assertion, not a universal economic guarantee.

**[S8] Helius, “Solana’s Proprietary AMM Revolution.”** 2025-08-25; named practitioner/on-chain research.  
https://www.helius.dev/blog/solanas-proprietary-amm-revolution  
Supports/reports: prop-AMM taxonomy and examples; operator inventory; oracle-update model; Jupiter dependence; observed 143-CU HumidiFi update; reported routing/volume statistics and black-box caveats. Caveat: point-in-time analysis, some inferences/decompilation and third-party data; not official documentation of hidden venues.

**[S9] Jupiter, “Jupiter Amm Implementation.”** First-party code/testing guide.  
https://github.com/jup-ag/jupiter-amm-implementation  
Supports: thin adapter, precompute on state update, snapshot and quote-vs-simulation integration testing. Caveat: repository/example versions may lag the interface.

**[S10] Umbra Research / Ellipsis Labs + Jito Labs, “Lifecycle of a Solana Transaction” (2023-05-02) and “MEV on Solana” (2023-05-31).** Practitioner technical essays.  
https://umbraresearch.xyz/writings/lifecycle-of-a-solana-transaction  
https://umbraresearch.xyz/writings/mev-on-solana  
Supports: declared locks, historical scheduling, continuous block production, lack of global public mempool, latency/MEV/centralization analysis. Caveat: numeric shares, scheduler details, fees and Jito timings are historical; use current Anza/Jito docs for implementation.

**[S11] Jito Labs, “Low Latency Transaction Send.”** Live first-party service documentation, accessed 2026-08-01.  
https://docs.jito.wtf/lowlatencytxnsend/  
Supports: max-5 sequential atomic bundles, single-slot behavior, 50 ms local account-lock auctions, tip/CU efficiency, tips/statuses, skip-preflight behavior, `bundleOnly`, `jitodontfront`, tip-account and uncle-bandit guidance. Caveat: service behavior, limits, minimums and mitigations can change; bundle receipt is not landing; sandwich mitigation expressly not guaranteed.

**[S12] Anza, “Introducing the Central Scheduler: An Optional Feature of Agave v1.18.”** 2024-era first-party client engineering post.  
https://www.anza.xyz/blog/introducing-the-central-scheduler-an-optional-feature-of-agave-v1-18  
Supports: why lock conflicts matter and central scheduler design. Caveat: flags/defaults/performance figures are release-specific historical material.

**[S13] Anza, “Transaction Landing on TPU” and “Scheduler Bindings are Coming to Agave.”** First-party client engineering posts, live as of research date.  
https://www.anza.xyz/blog/transaction-landing-on-tpu  
https://www.anza.xyz/blog/scheduler-bindings-are-coming-to-agave  
Supports: leader targeting, QUIC preconnection/fanout, staked vs unstaked path, slot-latency/drop metrics, scheduler heterogeneity, modular custom block-packing direction. Caveat: reported experiment numbers depend on geography, load, stake and validator mix; roadmap may change.

**[S14] Helius, Sender / MEV Protect / Priority Fee API.** Live first-party vendor docs, accessed 2026-08-01.  
https://www.helius.dev/docs/sending-transactions/sender  
https://www.helius.dev/docs/sending-transactions/mev-protect  
https://www.helius.dev/docs/priority-fee-api  
Supports: Helius multi-path submission design, current tip + priority-fee requirements, vendor MEV-protect policy and tradeoff, account/transaction-aware fee estimation. Caveat: vendor claims and pricing/minimums; independently benchmark and recheck current terms.

**[S15] Pyth Network, “Price Feeds Best Practices” and Solana pull integration.** Live first-party oracle docs.  
https://docs.pyth.network/price-feeds/best-practices  
https://docs.pyth.network/price-feeds/core/use-real-time-data/pull-integration/solana  
Supports: publication time/freshness, confidence, and Solana update/consumption mechanics. Caveat: integration does not remove application-level oracle/model/manipulation risk.

**[S16] Helius, “Measuring Latency.”** Live first-party vendor methodology.  
https://www.helius.dev/docs/laserstream/guides/measuring-latency  
Supports: no universal blockchain clock, co-location, parallel-stream comparison, percentiles/tails, timestamp limitations. Caveat: aimed at Helius/Yellowstone feeds; methodology is portable, product results are not assumed.

#### Tier 2 — economic and comparative foundations

**[S17] Uniswap v3 Core whitepaper.** 2021-03; primary protocol design.  
https://app.uniswap.org/whitepaper-v3.pdf  
Supports: concentrated liquidity, range positions, ticks, oracle accumulators. Caveat: EVM/v3-specific; does not describe prop AMMs.

**[S18] Milionis, Moallemi, Roughgarden, Zhang, “Automated Market Making and Loss-Versus-Rebalancing.”** arXiv:2208.06046 (2022; revisions may follow); academic preprint.  
https://arxiv.org/abs/2208.06046  
Supports: LVR framework for passive AMM LP loss relative to rebalancing. Caveat: model assumptions and continuous-time abstractions; not direct realized-P&L proof for a venue.

**[S19] Angeris & Chitra, “Improved Price Oracles: Constant Function Market Makers.”** arXiv:1911.03380; peer-reviewed/academic lineage.  
https://arxiv.org/abs/1911.03380  
Supports: formal constant-function market-maker properties and oracle relation. Caveat: general theory, not proprietary active control.

**[S20] Ellipsis Labs, Phoenix v1 repository and docs.** Primary CLOB code/docs.  
https://github.com/Ellipsis-Labs/phoenix-v1  
Supports: Solana on-chain orderbook comparator and implementation. Caveat: check current deployment/version; repository alone does not prove operational market quality.

**[S21] CoW Protocol, intents, solvers, fair combinatorial auction, and MEV protection docs.** Live first-party comparative docs.  
https://docs.cow.fi/cow-protocol/concepts/introduction/intents  
https://docs.cow.fi/cow-protocol/concepts/introduction/solvers  
https://docs.cow.fi/cow-protocol/concepts/introduction/fair-combinatorial-auction  
https://docs.cow.fi/cow-protocol/concepts/benefits/mev-protection  
Supports: intent/solver/batch-auction alternative. Caveat: Ethereum-oriented and protocol claims should be independently measured.

**[S22] 0x, “About the RFQ System.”** Live first-party comparative docs.  
https://docs.0x.org/evm/0x-swap-api/additional-topics/about-the-rfq-system  
Supports: RFQ liquidity and settlement model. Caveat: EVM/0x-specific and current commercial access/behavior may change.

#### Tier 3 — useful design research, not hidden-venue evidence

**[S23] Umbra Research / Ellipsis Labs + Paradigm, “A Sandwich-Resistant AMM.”** 2024-07-25; practitioner design proposal.  
https://umbraresearch.xyz/writings/sandwich-resistant-amm  
Supports: slot-window application-layer construction and explicit boundary/JIT-liquidity caveats. Caveat: proposal, not evidence that a prop AMM implements it or that it prevents all sandwich forms.

**[S24] Solana transaction fee and MEV-protection cookbook pages.** Live first-party examples.  
https://solana.com/docs/core/fees  
https://solana.com/developers/cookbook/transactions/add-priority-fees  
https://solana.com/developers/cookbook/transactions/mev-protection  
Supports: base/priority fee construction and practical send patterns. Caveat: examples are not an execution SLA; reconcile with current validator/Jito behavior.

---

### 13. Bottom line

A prop AMM's edge comes from representing an actively managed willingness-to-trade curve compactly on-chain, refreshing it cheaply, distributing it through a router, and controlling inventory and flow risk faster than passive liquidity can. Its principal dangers are the same architecture in reverse: a privileged updater, opaque model, concentrated inventory, router/order-flow dependence, upgrade authority, and latency race.

The minimum credible standard is therefore not “audited program + high volume.” It is: **bounded on-chain failure behavior; pure and equivalent routing math; independently measured all-in execution; reconciled capital and P&L; hardened role-separated keys; explicit private-flow/conflict policy; and reproducible evidence that remains tied to the currently deployed binary and authorities.**

## Part IV — Dated X evidence register

**Collection method:** xAI Grok 4.5 `x_search`, run 2026-08-01 over public X posts from 2025-01-01 through the cutoff. Results were filtered for canonical URLs, named authors, explicit windows, code, dashboards, or first-party statements. Social evidence remains lower authority than deployed state, code, full methods, or operator documentation.

### First-party ecosystem and operator statements

1. **Solana Foundation — mechanism framing** — https://x.com/SolanaFndn/status/2015684042071712043 (2026-01-26). Supports the offchain predictive-model/minimal-onchain-state framing and variables such as volatility, caller metadata, and update freshness. Caveat: ecosystem explanation, not an audit.
2. **HumidiFi — restart fail-safe** — https://x.com/humidifi/status/2083246029042811160 (2026-07-31). States that pools disable across restart boundaries by comparing oracle-update slot with `LastRestartSlot`. Caveat: inspect deployed enforcement before treating a screenshot as complete.
3. **HumidiFi — builder interaction** — https://x.com/humidifi/status/2013339505307123832 (2026-01-19). Claims more landed oracle updates on Harmonic enabled tighter quotes. Caveat: self-report; later independent analysis found the advantage changed inside its sample.
4. **Ellipsis Labs — SolFi attribution** — https://x.com/ellipsis_labs/status/1999035254024355956 (2025-12-11). Publicly associates Ellipsis with `@SolFiAMM`. Caveat: not a complete ownership, audit, or migration history.
5. **Jupiter — HumidiFi snapshot** — https://x.com/JupiterExchange/status/1994141773052989819 (2025-11-27). Reports HumidiFi near 50% of Jupiter routing share and 30–40% of SOL–USD volume then. Caveat: historical self-reported snapshot.
6. **DFlow — prop AMM versus RFQ** — https://x.com/niteshnath/status/2076775127056884095 and https://x.com/niteshnath/status/2076776635089510402 (2026-07). Defines prop-AMM state as posted before a taker, unlike request-first RFQ. Caveat: industry definition; venues may differ on caller conditions, capacity, and expiry.

### Measurement and market-structure research

7. **Jump Crypto — SOL/USDC execution** — https://x.com/jump_/status/2044494127367135386 (2026-04-15), with full ingested report. For March 2026, reports median fills around 0.7 bps from best midpoint across four CEXs and compares against all-in CEX fee tiers. Caveat: participant conflict, SOL/USDC/window specificity, midpoint distance versus implementation shortfall.
8. **Blockworks — oracle ordering and markouts** — https://x.com/minnus/status/2023823017894133930 (2026-02-17). Reports update win rates over 2.82M slots and multi-horizon Jupiter-routed SOL/USDC markouts from 2026-01-26 to 2026-02-09 with epoch-aware client mapping. Caveat: closed builders, tail-sensitive means, changing advantage within sample.
9. **Blockworks — tokenized-equity benchmark** — https://x.com/minnus/status/2082176379123077447 and https://x.com/minnus/status/2082965029003898949 (2026-07-28/30). Benchmarks selected Solana trades from 2026-06-12 to 2026-07-20 against preceding SIP NBBO or Blue Ocean midpoints. Caveat: four names, small share, limited >$20k data, incomplete venue attribution.
10. **DFlow ecosystem — volume snapshot** — https://x.com/DanJablonski/status/1978115198922666485 (2025-10-14). Reports >60% of displayed Solana DEX volume from prop AMMs. Caveat: chart-backed social analysis with limited visible methodology.
11. **Anza economist — spread observation** — https://x.com/MaxResnick/status/1935742887704100991 (2025-06-19). Reports sub-1-bp Solana spot spreads, sometimes tighter than Binance. Caveat: practitioner observation without preserved panel/method.
12. **BAMservatory — reproducible concentration telemetry** — https://x.com/Moneybag_Fin/status/2070495014078280091 and https://x.com/Moneybag_Fin/status/2081880793341911271; dashboard https://rythagod.github.io/bamservatory/ and code https://github.com/RYthaGOD/bam-net. Supports public-API sampling of BAM stake topology and rollover signals. Caveat: BAM-routed stake is not all validators; all figures are snapshots.

### Disputes worth testing

13. **DFlow–Titan routing-neutrality dispute** — https://x.com/niteshnath/status/1979154662650441917 (2025-10-17). DFlow alleged state-freshness and asymmetric-access bias; Titan participants disputed/contextualized it. Research value: test same state, constraints, submission, failures, and access. Status: disputed competitive claim.
14. **Quote-to-fill degradation allegation** — https://x.com/AISystemGuy/status/2037231954496716848 (2026-03-26). Selected transaction reconstruction alleged superior route-time quotes but worse fills inside user slippage. Research value: signed snapshots, state sequence, balance deltas, same-state counterfactuals. Status: limited and contested; do not generalize.

### What X added—and did not

X strengthened public SolFi/Ellipsis attribution, exposed concrete HumidiFi restart/update concerns, surfaced markout and external-midpoint methodologies, and highlighted routing neutrality under unequal state freshness. It did not resolve all operator identities, hidden formulas, audit coverage, or live share.

## Part V — Integrated expert conclusions

### The minimum complete model

An expert or implementer must answer:

1. **Value:** fair value, timestamp, independent inputs, uncertainty, and executable hedge size.
2. **Inventory:** capital owner, targets, hard limits, pending fills, and hedge latency.
3. **Quote:** how volatility, toxicity, inventory, size, fees, and caller conditions change center, spread, depth, and expiry.
4. **State:** onchain parameters, signer, sequence, replay, staleness, divergence, restart, and schema controls.
5. **Execution:** exact adapter/onchain agreement for integers, fees, rounding, token extensions, capacity, and modes.
6. **Distribution:** router access, credentials, quote caches, simulation freshness, split routing, and ownership conflicts.
7. **Landing:** observers, fees/tips, expiry/rebuild, and leader/client outcome differences.
8. **Hedging:** basis, funding, borrow, credit, bridge, withdrawal, and outage risks.
9. **Authority:** upgrade/update/pause/withdraw/credential powers, custody, quorum, timelock, and monitoring.
10. **Evidence:** mapping of claims to current binary, authorities, raw signatures, balance deltas, failures, and frozen benchmarks.

### Practical study program

1. **Dealer theory:** derive Ho–Stoll and Avellaneda–Stoikov; explain Glosten–Milgrom and Kyle.
2. **Passive AMMs:** derive constant product, IL, delta/gamma, concentrated-liquidity amounts, and LVR; identify non-executable assumptions.
3. **Mechanism comparison:** run CPMM, CLMM, oracle PMM, prop AMM, CLOB, RFQ, JIT, OFA, and batch auction against one order stream.
4. **Solana implementation:** trace locks, updates, Jupiter snapshots, quotes, simulation, fees/Jito, settlement, logs, and reconciliation.
5. **Measurement:** build a frozen decision-time dataset and measure quote-to-fill, implementation shortfall, spreads, markouts, counterfactuals, failures, capital, hedge costs, and P&L.
6. **Adversarial review:** stress stale/forked data, CEX outage, depeg, jumps, inventory saturation, censorship, key compromise, router exclusion, token extensions, duplication, concentration, and hedge failure.

### Research agenda

- Credibly neutral update inclusion and routing under vertical integration.
- Benchmarks that isolate venue quality from router/sender/user fee choices.
- Contestable caller-conditioned pricing without sensitive identity leakage.
- Welfare accounting for better fills versus private-flow and builder concentration.
- Closed-strategy governance with reproducible deployment and evidence.
- Detection of delayed quote degradation across state/size regimes.
- Allocation of rebalancing/MEV rents without recreating exclusive wholesaling.

### Final verdict

Prop AMMs are **programmable principal market makers** using onchain settlement as the execution substrate for an actively managed dealer strategy. Their strongest case is liquid assets with reliable external price discovery, cheap state publication, aggregator flow, and robust hedging. Passive AMMs remain valuable for long-tail assets, permissionless capital formation, and transparent always-on liquidity.

The credible standard is not high volume, one audit, or a tight screenshot quote. It is:

> **bounded onchain failure behavior + equivalent router/execution math + independently measured all-in fills + reconciled capital and P&L + hardened role-separated authorities + explicit order-flow/conflict policy + evidence tied to the current binary and measurement window.**
