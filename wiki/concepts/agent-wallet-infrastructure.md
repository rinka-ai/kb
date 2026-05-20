---
id: concept-agent-wallet-infrastructure
type: concept
title: Agent Wallet Infrastructure
tags: [agents, wallets, credentials, payments, security, policy-engine, auth]
source_count: 5
summary: Agent wallet infrastructure gives autonomous agents policy-bounded authority to sign transactions, spend money, and use paid credentials without exposing raw keys to model-controlled runtimes.
canonical_for: [agent wallets, agent wallet infrastructure, autonomous agent wallets, agent custody, agent payments]
review_status: draft
last_reviewed: 2026-05-20
review_due: 2026-06-20
confidence: "0.78"
---

# Agent Wallet Infrastructure

## Summary

Agent wallet infrastructure gives autonomous agents policy-bounded authority to sign transactions, spend money, and use paid credentials without exposing raw keys to model-controlled runtimes. The early pattern is not "give the model a wallet"; it is a custody and control plane around the agent: encrypted key storage, credential proxying, policy evaluation, approval queues, tenant identity, audit logs, and SDK/tool surfaces that return narrow handles or statuses instead of secrets. Steward is the direct wallet source; Browserbase, Stripe, and AgentDojo supply the adjacent evidence that credentials, payment surfaces, and prompt-injected tool calls need externalized control boundaries.

## Core Pattern

- store wallet private keys and third-party API credentials outside the agent process
- authenticate the agent through scoped tokens or session identity
- evaluate policy before high-risk actions such as signing, spending, or credential use
- queue actions for human approval when they exceed an auto-approve threshold but remain otherwise valid
- record transactions, policy results, approvals, proxy calls, and failures as audit evidence
- expose narrow SDK, plugin, or tool actions such as sign, transfer, check spend, list approvals, and proxy request

## Why It Matters

- prompt injection and dependency compromise become financial risks when agents can move money or call paid APIs
- ordinary `.env` secrets are too broad for long-running autonomous runtimes
- wallet custody, paid API access, and auth are converging into one agent action layer
- policy envelopes let operators define what autonomy means for a specific agent instead of relying on generic "be careful" instructions
- audit logs create the evidence needed to reconcile model intent, tool request, policy result, human approval, and external side effect

## Design Boundaries

- policy should be enforced outside prompt text and ideally outside the model-controlled runtime
- the strongest architecture separates the policy/API process from the signer process, so key custody does not fully depend on the API process being uncompromised
- if policy evaluation is only an API-path convention before the vault signs, then code execution in the API process can still bypass it
- default policy posture matters: an empty policy set that auto-approves is operationally dangerous even if useful for tests
- credential proxying generalizes beyond wallets: API calls to model providers, exchanges, RPC providers, and databases can all become metered, logged capability paths

## Open Questions

- What should be the default policy for a newly created agent wallet: deny all, low-value allowlist, or operator-defined template?
- How should agent wallet systems express policy attestations so a separate signer process can verify them?
- How should cross-framework plugins preserve the same approval and audit semantics?
- Can one spending model cover on-chain transactions, paid API calls, subscriptions, and SaaS usage?
- What evidence should an audit log retain without leaking sensitive operational metadata?

## Source Notes

- [[2026-05-20-steward]]
- [[2026-04-17-browserbase-enterprise-security]]
- [[2026-04-17-browserbase-bb-internal-agent-full-architecture-synthesis]]
- [[2026-04-12-stripe-integration-security-guide]]
- [[2026-04-10-agentdojo-a-dynamic-environment-to-evaluate-prompt-injection-attacks-and-defenses-for-llm-agents]]
