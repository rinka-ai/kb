---
id: concept-agent-security
type: concept
title: Agent Security
tags: [security, prompt-injection, sandboxing, approvals, agents, adversarial-evals, autonomy, credentials, wallets]
source_count: 18
summary: Agent security is a systems problem spanning prompt injection, zero-trust identity, authorization, sandbox boundaries, secret placement, wallet custody, memory privacy, tool restriction, skill supply-chain trust, validation, fairness, and adversarial evaluation rather than a single prompting trick.
canonical_for: [agent security, prompt injection, sandboxing, approval policies, adversarial agent evals]
review_status: reviewed
last_reviewed: 2026-08-02
review_due: 2026-10-30
confidence: "0.88"
---

# Agent Security

## Summary

Agent security is a systems problem spanning prompt injection, zero-trust identity, authorization, sandbox boundaries, tool restriction, secret placement, wallet custody, memory privacy, skill supply-chain trust, validation, fairness, and adversarial evaluation rather than a single prompting trick. The Copilot-for-Word disclosure adds an artifact-propagation threat: indirect prompt injection can copy itself into generated documents, laundering attacker influence into internal-looking artifacts that remain dangerous after the original source disappears. The current source set points toward a practical security stack: explicit approval semantics, constrained execution environments, least-privilege tool access, credentials kept outside model-controlled runtimes when possible, policy-bounded signing paths for money movement, privacy-aware memory storage, and evals that measure useful work under attack instead of only benign task success. The textbook layer broadens the safety frame: secure AI systems also need explicit properties, falsification searches, governance, fairness checks, and monitoring for socio-technical harm. A newer skill-security framing adds that reusable skills themselves should be treated as untrusted runtime-loaded artifacts until their declared behavior has been verified. Hermes adds a useful trust-model correction from a real agent runtime: approvals, redaction, skill scans, and tool allowlists are valuable heuristics, but OS-level isolation is the load-bearing containment boundary against adversarial model behavior. MemWal adds the memory-privacy version of the same discipline: encrypted durable storage and onchain delegate control are meaningful, but default relayer plaintext handling remains a trust boundary. Anthropic's zero-trust ebook adds the deployable maturity model: cryptographic agent identity, short-lived scoped credentials, least agency, identity-based isolation, protected memory, and AI-speed defensive operations are now baseline controls rather than nice-to-have hardening. The Dynamic Workflows digest adds a topology-level prompt-injection defense: untrusted content should be read and summarized by low-privilege agents, while high-privilege actors operate only on structured summaries.

## Threat Surfaces

- untrusted external content can steer reasoning or tool choices through prompt injection
- generated or edited artifacts can inherit attacker-controlled instructions from source documents and become new carriers across trusted workflows
- missing cryptographic agent identity creates an attribution gap where tool calls, memory writes, and incidents cannot be tied to a specific agent instance
- excessive permission prompts create fatigue, but removing them blindly creates wider blast radius
- weak sandboxing turns ordinary model mistakes into filesystem, network, or credential incidents
- live credentials inside model-reachable processes turn arbitrary-code execution into secret exfiltration risk
- static API keys, shared service accounts, and long-lived secrets are especially brittle because AI-assisted attackers can find and reuse them quickly
- wallet private keys and paid API credentials inside agent environments turn prompt injection or dependency compromise into direct financial or account-abuse risk
- tool sets that are broader than the task surface make both benign mistakes and attacks easier
- skills can act as persistent prompt-injection or supply-chain surfaces when a runtime infers trust from origin, signature, or registry membership alone
- dynamic workflows can multiply an injection or over-permissioning mistake across many subagents if raw untrusted content reaches privileged stages
- plugins, skills, hooks, MCP subprocesses, code execution, and gateway adapters can run outside the narrow terminal-tool sandbox unless the entire agent process is wrapped
- persistent memory can leak sensitive facts through plaintext relayers, local delegate credentials, embeddings, metadata, overbroad namespaces, or stale delegate keys even when stored blobs are encrypted
- provenance can collapse across transformations, causing internal-looking documents to receive more trust than their least-trusted contributing source
- automated decisions can create legitimacy, recourse, discrimination, and feedback-loop failures even when the narrow prompt-injection surface is controlled
- evaluation sandboxes can become offensive infrastructure when actual egress differs from prompt-declared scope, especially when fictional names resolve to real systems or generated artifacts reach public registries

## Defensive Patterns

- enforce the highest-risk boundaries in runtime policy and sandbox layers, not only in prompts
- prefer controls that make an attack impossible over controls that merely make it tedious
- assign unique cryptographic identities to agent instances and carry those identities through logs, access requests, tool calls, and incident traces
- prefer least-privilege tool access and narrower toolsets where tasks allow it
- extend least privilege into least agency: restrict what each tool can do, how often, where, and under which delegated authority
- model approval as an explicit resumable state transition instead of an informal chat detour
- keep real credentials behind brokers, vaults, or network injection layers rather than exposing them directly inside agent sandboxes
- route wallet signing and paid API access through policy-aware vault/proxy layers with approval queues and audit logs
- replace static tool credentials with short-lived identity-provider-issued tokens, per-agent credentials, JIT access, ABAC, and hardware-bound credentials for sensitive workloads
- scope permissions and allowed capabilities by invocation source or job intent when tasks arrive through different channels
- quarantine untrusted support tickets, bug reports, feedback, scraped pages, and third-party API output in read-only workflow stages
- propagate source identity, trust level, permitted influence, and transformation lineage through generated artifacts; do not let a transformation automatically increase authority
- constrain source documents to an information role rather than an instruction role, and require auditable diffs or explicit policy transitions before generated artifacts enter trusted workflows
- pass only structured summaries from untrusted-reader agents into privileged actor agents that can edit code, open PRs, or call side-effecting tools
- pair tool permissioning with network or domain allowlists when the environment can reach the open web
- pair autonomy improvements with stronger isolation, monitoring, and post-hoc review surfaces
- treat skill packages as untrusted by default; use explicit verification levels to decide when irreversible actions can avoid per-call HITL approval
- keep audit logs strong enough to reconcile approved-and-executed actions with observed side effects after a run
- distinguish accident-prevention heuristics from security boundaries; use whole-process isolation when the agent ingests untrusted web, email, multi-user channel, plugin, or MCP content
- distinguish cryptographic ownership from operational confidentiality; if a relayer embeds, encrypts, decrypts, or reranks plaintext, the relayer operator is in the trust envelope
- make credential deletion and credential revocation separate UX paths when local agent clients store long-lived delegate keys
- treat defensive agents as high-blast-radius systems too: let them collect evidence and draft triage, but gate containment, disclosure, and customer-communication decisions through explicit human authority
- preflight every evaluation image and vendor environment with deterministic egress tests, explicit target allowlists, continuous network/transcript monitoring, and incident-response ownership; never use a system-prompt claim as evidence of isolation
- include public registries, scanners, and accidental consumers in blast-radius models when an agent can publish packages or other executable artifacts

## Evaluation Standards

- evaluate utility under attack, not only clean-environment success
- measure dwell time, alert coverage, behavioral conformance, and detection speed for production agents
- use state-based or deterministic checks when security properties are concrete
- check gate correctness by comparing observed side effects against approved-and-executed audit records when the runtime controls the relevant corpus
- treat adversarial robustness as part of system quality, not as a separate research toy
- revisit defenses regularly because both attacks and normal agent capabilities change quickly
- define safety properties explicitly, then test, falsify, monitor, and revise them as the deployed environment changes

## Tensions

- autonomy vs safety guarantees
- approval fatigue vs over-broad execution permissions
- product claims about policy-enforced signing vs the actual implementation boundary, especially when policy is API-path enforced rather than enforced by a separate signer process
- narrow task-specific defenses vs general enterprise hardening
- security evaluation realism vs benchmark simplicity
- terminal-backend isolation vs whole-process wrapping when the agent runtime itself loads plugins, skills, hooks, and subprocesses
- encrypted source storage vs plaintext processing in relayers, middleware, and memory tool adapters
- automation speed vs human accountability in agentic SOAR and incident response
- quarantine fidelity vs missing important context when privileged agents receive summaries rather than raw untrusted material
- useful document synthesis vs preserving enforceable authority boundaries between user intent, source data, and generated artifacts
- realistic offensive evaluation vs the possibility that reachable real infrastructure is mistaken for the simulated task world

## Source Notes

- [[2026-05-01-skills-as-verifiable-artifacts]]
- [[2026-04-10-agentdojo-a-dynamic-environment-to-evaluate-prompt-injection-attacks-and-defenses-for-llm-agents]]
- [[2026-04-10-agentdojo]]
- [[2026-03-25-claude-code-auto-mode]]
- [[2025-10-20-beyond-permission-prompts-making-claude-code-more-secure-and-autonomous]]
- [[2026-01-09-demystifying-evals-for-ai-agents]]
- [[2026-01-21-designing-ai-resistant-technical-evaluations]]
- [[2026-04-17-browserbase-enterprise-security]]
- [[2026-04-17-browserbase-bb-internal-agent-full-architecture-synthesis]]
- [[2026-05-18-algorithms-for-validation]]
- [[2026-05-18-fairness-and-machine-learning]]
- [[2026-05-20-steward]]
- [[2026-05-20-hermes-agent]]
- [[2026-05-20-memwal]]
- [[2026-05-27-zero-trust-for-ai-agents]]
- [[2026-06-03-dynamic-workflows-claude-code-ingest]]
- [[2026-07-28-context-collapse-part-3-ai-worming-through-word]]
- [[2026-07-30-investigating-three-real-world-incidents-in-our-cybersecurity-evaluations]]
