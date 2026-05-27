---
id: concept-payment-integrations
type: concept
title: Payment Integrations
tags: [payments, stripe, checkout, pci, webhooks, security, wallets, agents]
source_count: 3
summary: Payment and value-transfer integrations should keep sensitive collection, credentials, and signing authority inside managed or policy-enforced surfaces while completing business logic from verified events.
canonical_for: [payment integrations, stripe checkout, pci-safe payments, agent payments, agent wallets]
review_status: reviewed
last_reviewed: 2026-05-20
review_due: 2026-06-20
confidence: "0.78"
---

# Payment Integrations

## Summary

Payment and value-transfer integrations should minimize security scope by keeping raw payment-data collection, private keys, and sensitive credentials inside managed or policy-enforced surfaces. The common pattern is to represent work through durable session, transaction, or approval objects, then resume business logic only from verified backend events or policy-approved signing results.

## Core Pattern

- create a provider-managed session or tokenized payment surface
- send the user through hosted or embedded checkout owned by the payment platform
- persist the session identifier and fulfillment state on the application side
- complete side effects from verified webhook events rather than client redirects alone
- for agent wallets, route signing through a custody layer that can evaluate spending, address, chain, rate, and approval policies before any transaction is signed

## Security Boundaries

- keep raw card data out of application servers whenever possible
- keep wallet private keys and API credentials out of model-controlled agent runtimes whenever possible
- use TLS end to end for browser and server traffic
- verify webhook signatures and treat replay protection as part of the architecture
- enforce CSP and minimize third-party JavaScript on payment pages
- store only non-sensitive payment metadata in the application domain
- distinguish application-level policy checks from cryptographic custody boundaries; if the signer will sign anything an API process requests, the API process remains part of the trusted computing base

## Agent-System Implications

- agents should trigger narrow payment workflows, not improvise low-level payment orchestration
- payment tools should return session handles or statuses rather than expose sensitive primitives
- fulfillment logic belongs in deterministic backend workflows with idempotent retries
- managed payment surfaces are often the safest way to keep model-driven systems away from PCI-heavy boundaries
- on-chain agent payments need the same discipline: policy envelopes, approval queues, transaction records, and audit trails should mediate value transfer
- proxy-mediated paid API calls can treat API spend like a payment surface: the agent receives a capability path, while the broker handles credentials, metering, spend checks, and logging

## Source Notes

- [[2026-04-12-stripe-checkout-how-checkout-works]]
- [[2026-04-12-stripe-integration-security-guide]]
- [[2026-05-20-steward]]
