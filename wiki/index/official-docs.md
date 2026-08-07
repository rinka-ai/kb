---
id: index-official-docs
type: index
title: Official Docs
summary: Official language, runtime, framework, protocol, platform, and compliance documentation used to ground implementation and architecture decisions.
---

# Official Docs

## Overview

This index groups official documentation added to strengthen the KB's coverage of language/runtime boundaries, architecture, protocol surfaces, memory operations, and secure side effects.

## By Theme

- Go language, idioms, and production-server review:
  [[2026-08-01-effective-go]]
- Rust language, memory safety, and async foundations:
  [[2026-08-01-rust-std-pin-module]]
  [[2026-08-02-rustonomicon-send-and-sync]]
  [[2026-08-03-tokio-select]]
  [[2026-08-04-rust-reference-undefined-behavior]]
  [[2026-08-05-rust-reference-subtyping-and-variance]]
  [[2026-08-06-rust-reference-implementations]]
  [[2026-08-07-rust-reference-destructors]]
- TypeScript language, runtime, and package boundaries:
  [[2026-08-01-typescript-modules-reference]]
  [[2026-08-02-typescript-narrowing]]
  [[2026-08-03-typescript-type-compatibility]]
  [[2026-08-04-typescript-conditional-types]]
  [[2026-08-05-typescript-mapped-types]]
  [[2026-08-06-typescript-template-literal-types]]
  [[2026-08-07-typescript-generics]]
- Durable execution and workflow runtimes:
  [[2026-04-12-temporal-ai-cookbook]]
  [[2026-04-12-durable-mcp-weather-server]]
  [[2026-04-12-langgraph-durable-execution-persistence-and-human-in-the-loop]]
  [[2026-04-12-google-adk-runtime-event-loop-and-workflow-agents]]
- Sessions, approvals, and handoffs:
  [[2026-04-12-openai-agents-sdk-sessions-handoffs-and-human-in-the-loop]]
- Protocol surfaces:
  [[2026-04-12-agent-protocol]]
  [[2026-07-28-the-2026-07-28-model-context-protocol-specification]]
- Operational memory tooling:
  [[2026-04-12-langmem]]
- Payment security and managed side effects:
  [[2026-04-12-stripe-integration-security-guide]]
  [[2026-04-12-stripe-checkout-how-checkout-works]]
- Outbound deliverability and platform constraints:
  [[2026-04-18-gmail-email-sender-guidelines]]
  [[2026-04-18-gmail-postmaster-tools-dashboards]]
  [[2026-04-18-yahoo-sender-best-practices]]
  [[2026-04-18-can-spam-act-compliance-guide-for-business]]
  [[2026-04-18-linkedin-user-agreement]]
  [[2026-04-18-linkedin-crawling-terms-and-conditions]]
  [[2026-04-18-ico-business-to-business-marketing]]

## Why This Collection Matters

- These sources make the KB less dependent on papers and engineering blogs for architecture decisions.
- They describe the actual runtime and operational surfaces teams implement against in production.
- They are especially useful when mapping abstract agent concepts onto specific system boundaries.
- They also ground outbound-agent design in official sender requirements, platform rules, and legal guidance instead of vendor folklore.
- The TypeScript track uses official language references to connect static types to runtime loading, package APIs, declaration files, and real workspace graphs.
- Its type-system track separates runtime admission from static narrowing, models lifecycle states as discriminated unions, and uses exhaustive handling only where the application owns a closed vocabulary.
- Its compatibility track treats structural typing as both a composition mechanism and a public-API risk: callback variance, domain identity, declaration truth, strict settings, and package-level type tests must be owned explicitly.
- Its conditional-type track treats generic branching as a public input-output relation: inference and union distribution must be deliberate, runtime behavior must match erased declarations, and downstream checker cost must be measured rather than assumed.
- Its mapped-type track derives bounded property projections from domain-owned vocabularies while keeping modifiers, key remapping/filtering, declaration amplification, runtime realization, and checker cost explicit.
- Its template-literal track derives bounded string protocols while keeping union cross-products, key/payload inference, non-locale-aware casing intrinsics, runtime realization, and ahead-of-time generation limits explicit.
- Its generic-API track preserves caller-visible type relations through inference, minimal constraints, deliberate parameter scope/defaults, structurally emergent variance, packed declarations, and separate runtime admission.
- The Rust track starts from the Reference, standard library, Rustonomicon, and first-party Tokio contracts: implementation ownership and coherence, lifetime subtyping and variance, undefined behavior and validity, pinning, thread transfer, shared access, cancellation ownership, same-task multiplexing, spawned-child lifetime, drop scopes, temporary lifetime extension, and process-level cleanup limits remain separate review dimensions.
- The Go track separates durable core-language idioms from historical advice and production concerns such as cancellation, error chains, bounded concurrency, dependency limits, graceful lifecycle, and repository-specific contracts.
- The MCP track now separates stateless transport from explicit application state, while grounding routing, caching, authorization, extensions, and deprecation in the current protocol release.

## Related

- [[managed-agents]]
- [[agent-memory]]
- [[llm-agents]]
- [[payment-integrations]]
- [[typescript-module-systems]]
- [[typescript-control-flow-narrowing]]
- [[typescript-structural-compatibility]]
- [[typescript-conditional-types]]
- [[typescript-mapped-types]]
- [[typescript-template-literal-types]]
- [[typescript-generic-api-design]]
- [[rust-pinning-and-address-sensitive-types]]
- [[rust-send-sync-and-thread-safety]]
- [[rust-async-cancellation-and-select]]
- [[rust-unsafe-validity-and-undefined-behavior]]
- [[rust-lifetime-subtyping-and-variance]]
- [[rust-trait-coherence-and-implementation-ownership]]
- [[rust-destructors-drop-scopes-and-resource-lifecycle]]
- [[effective-go-for-production-servers]]
- [[agent-protocols]]
