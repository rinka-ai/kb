---
id: article-2026-08-01-jupiter-developers
type: source
title: "Jupiter Developers"
path: raw/articles/jupiter/2026-08-01-jupiter-developers.md
author: Unknown
publisher: Jupiter Developers
url: https://dev.jup.ag/docs/swap/routing/dex-integration
date_published: 
date_added: 2026-08-01
tags: [prop-amm, solana, jupiter, routing, integration]
status: active
quality: medium
summary: "Jupiter's DEX integration docs define the gate into Metis routing — a forkable SDK implementing the Jupiter AMM Interface plus code-health, audit, traction, and backer review — and specify the cryptographic signer that lets a venue verify a swap really came from the Jupiter retail frontend."
related: [proprietary-automated-market-makers, 2026-08-01-proprietary-amm-expert-handbook, 2026-08-01-solana-s-proprietary-amm-revolution, 2026-08-01-understanding-proprietary-amms]
---

# Jupiter Developers

## Source Metadata

- Path: raw/articles/jupiter/2026-08-01-jupiter-developers.md
- Author: Unknown
- Published: Unknown
- Publisher: Jupiter Developers
- URL: https://dev.jup.ag/docs/swap/routing/dex-integration

## TL;DR

This is the primary-source specification of the gate every Solana prop AMM must pass to reach retail flow. Two things matter beyond the boilerplate. First, integration is explicitly permissioned and judged on code health, audit, traction, and backers — and Jupiter requires the right to fork the venue's SDK so it can guarantee maintenance. Second, the docs specify how a venue verifies that a swap genuinely originated from the Jupiter frontend: a dedicated Jupiter-held signer co-signs every frontend swap, so the "non-toxic retail flow" that prop AMMs quote tightly against is cryptographically attestable rather than inferred.

## Key Claims

- Integration into the Metis routing engine is permissioned. Jupiter states it must be "more cautious" as the DEX population grows and will prioritise venues that benefit its users.
- Four stated prerequisites: code health, a security audit, demonstrated traction, and reputable or verifiable team and backers.
- The venue must supply a DEX SDK implementing the Jupiter AMM Interface.
- Jupiter requires the ability to fork that SDK, which it justifies as guaranteeing maintenance, support, and bug fixes for integrated DEXs.
- Trades originating from the jup.ag frontend are characterised by Jupiter itself as retail, non-toxic order flow.
- To make that flow verifiable rather than assumed, the Jupiter frontend attaches a dedicated signer to every swap transaction and signs with it.
- The frontend signer address is `sighWH8KaiT7QhtV4w29ReVF8kG6D5yG3EQP1KYyGVF`.
- Detection procedure: check the transaction's account keys for that address as a signer and confirm a valid signature is present. Jupiter holds the private key, so a valid signature can only have been produced by the Jupiter frontend.
- The stated purpose of this attestation is commercial: a prop AMM that can identify the flow "can quote it tighter spreads with confidence."

## Important Details

- Canonical URL is `https://dev.jup.ag/docs/swap/routing/dex-integration`; it redirects to `developers.jup.ag`.
- Documentation sections surrounding this page: Swap, Meta-Aggregator, Router, Advanced.
- The page states no fee for integration; the cost is the review process and the SDK fork requirement.
- No date is published on the page, so `date_published` is left empty. Treat the signer address and prerequisites as current-as-of the 2026-08-01 capture, not as permanent.
- This is first-party vendor documentation, so it is authoritative on the mechanism and unreliable on whether the gatekeeping is applied neutrally.

## Entities

- Companies: Jupiter
- Systems: Metis routing engine, Jupiter Core Engine, Jupiter AMM Interface, jup.ag frontend
- Identifiers: Jupiter frontend signer `sighWH8KaiT7QhtV4w29ReVF8kG6D5yG3EQP1KYyGVF`
- Concepts: permissioned integration, SDK fork requirement, retail flow attestation, toxic versus non-toxic order flow, spread tightening

## My Notes

- The signer mechanism is the most valuable detail in this note and it resolves an open question left by the ecosystem explainers: "non-toxic retail flow" is not a statistical guess, it is a signature check. That converts a soft market claim into a verifiable one.
- It also relocates the trust boundary. A venue quoting tighter against attested flow is trusting Jupiter's key custody and Jupiter's promise that the frontend only signs genuine retail swaps. That is a single-key dependency underpinning pricing decisions across multiple venues.
- The fork requirement is a quiet but significant term. A venue whose entire distribution depends on one aggregator must also hand that aggregator the right to fork its integration code.
- Together with the 88–99% aggregator-dependence figures in [[2026-08-01-solana-s-proprietary-amm-revolution]], this page shows the concentration is structural, not incidental: one party controls admission, maintains the integration code, and issues the attestation that determines pricing.
- Useful as the citable primary source whenever the KB asserts that Jupiter integration is permissioned or that retail flow is verifiable.

## Open Questions

- What happens to venues' quoting behaviour if the frontend signer key is rotated, compromised, or extended to non-retail surfaces?
- Are there published criteria or appeal paths for a rejected integration, or is the four-factor review entirely discretionary?
- Does the swap API path carry any attestation, or is unattested flow simply treated as potentially toxic by default?
- How many venues actually implement the signer check versus quoting tightly on aggregator identity alone?

## Related

- [[proprietary-automated-market-makers]]
- [[2026-08-01-proprietary-amm-expert-handbook]]
- [[2026-08-01-solana-s-proprietary-amm-revolution]]
- [[2026-08-01-understanding-proprietary-amms]]
- [[2026-08-01-propamms-and-the-next-chapter-of-permissionless-market-structure]]

## Source Text

Routing IntegrationRequirements and steps to integrate your DEX into the Metis routing engine, including the Jupiter AMM Interface SDK and security audit prerequisites.This guide covers how to integrate your decentralized exchange (DEX) into Jupiter’s Metis routing engine. You will need to provide a DEX SDK implementing the Jupiter AMM Interface, pass security and code health checks, and demonstrate traction.
Jupiter is one of the most widely integrated protocols, so a lot of work is involved in minimizing issues on new integrations and making each integration valuable to our users and partners. Our top priority is ensuring security and providing the best prices and the best token selection for our users, so we will focus on DEXes that will bring the most benefits to them.Integration Prerequisites
As Solana grows and more DEXes are built, we have to be more cautious in the DEXes we integrate, we look into a variety of factors.
Code health: It will help with integration and ensure maintainability in the future.
Security audit: This is important to ensure users’ funds are secure and the program is not malicious.
Traction: We look at the traction of the DEX to ensure it has market demand and is well-used.
Team and backers: This is a good indicator of the quality of the DEX if they are backed by or built by reputable or verifiable entities.

AMM Interface
To facilitate integration of your DEX into the Jupiter Core Engine:
Provide a DEX SDK that works with the Jupiter AMM Interface.
Enable us to fork your SDK, this ensures our users that we can guarantee maintenance, support for the SDK, and fix potential bugs related to integrated DEXs.

AMM Interface Code Example
More
Detect Jupiter Frontend FlowTrades that originate from the Jupiter frontend (jup.ag) are retail flow. They are non-toxic order flow and if your propAMM can identify this flow, you can quote it tighter spreads with confidence.To make that flow verifiable, the Jupiter frontend adds a dedicated signer to every swap transaction and signs the transaction with it:SignerAddressJupiter frontendsighWH8KaiT7QhtV4w29ReVF8kG6D5yG3EQP1KYyGVFTo detect Jupiter frontend flow, check the transaction’s account keys for this address as a signer and confirm its signature is present and valid. Jupiter holds the private key, so a valid signature from this address can only have been produced by the Jupiter frontend.
