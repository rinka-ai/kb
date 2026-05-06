---
id: concept-agent-security
type: concept
title: Agent Security
tags: [security, prompt-injection, sandboxing, approvals, agents, adversarial-evals, autonomy]
source_count: 9
summary: Agent security is a systems problem spanning prompt injection, authorization, sandbox boundaries, secret placement, tool restriction, skill supply-chain trust, and adversarial evaluation rather than a single prompting trick.
canonical_for: [agent security, prompt injection, sandboxing, approval policies, adversarial agent evals]
review_status: reviewed
last_reviewed: 2026-04-17
review_due: 2026-05-17
confidence: "0.88"
---

# Agent Security

## Summary

Agent security is a systems problem spanning prompt injection, authorization, sandbox boundaries, tool restriction, secret placement, skill supply-chain trust, and adversarial evaluation rather than a single prompting trick. The current source set points toward a practical security stack: explicit approval semantics, constrained execution environments, least-privilege tool access, credentials kept outside model-controlled runtimes when possible, and evals that measure useful work under attack instead of only benign task success. A newer skill-security framing adds that reusable skills themselves should be treated as untrusted runtime-loaded artifacts until their declared behavior has been verified.

## Threat Surfaces

- untrusted external content can steer reasoning or tool choices through prompt injection
- excessive permission prompts create fatigue, but removing them blindly creates wider blast radius
- weak sandboxing turns ordinary model mistakes into filesystem, network, or credential incidents
- live credentials inside model-reachable processes turn arbitrary-code execution into secret exfiltration risk
- tool sets that are broader than the task surface make both benign mistakes and attacks easier
- skills can act as persistent prompt-injection or supply-chain surfaces when a runtime infers trust from origin, signature, or registry membership alone

## Defensive Patterns

- enforce the highest-risk boundaries in runtime policy and sandbox layers, not only in prompts
- prefer least-privilege tool access and narrower toolsets where tasks allow it
- model approval as an explicit resumable state transition instead of an informal chat detour
- keep real credentials behind brokers, vaults, or network injection layers rather than exposing them directly inside agent sandboxes
- scope permissions and allowed capabilities by invocation source or job intent when tasks arrive through different channels
- pair tool permissioning with network or domain allowlists when the environment can reach the open web
- pair autonomy improvements with stronger isolation, monitoring, and post-hoc review surfaces
- treat skill packages as untrusted by default; use explicit verification levels to decide when irreversible actions can avoid per-call HITL approval
- keep audit logs strong enough to reconcile approved-and-executed actions with observed side effects after a run

## Evaluation Standards

- evaluate utility under attack, not only clean-environment success
- use state-based or deterministic checks when security properties are concrete
- check gate correctness by comparing observed side effects against approved-and-executed audit records when the runtime controls the relevant corpus
- treat adversarial robustness as part of system quality, not as a separate research toy
- revisit defenses regularly because both attacks and normal agent capabilities change quickly

## Tensions

- autonomy vs safety guarantees
- approval fatigue vs over-broad execution permissions
- narrow task-specific defenses vs general enterprise hardening
- security evaluation realism vs benchmark simplicity

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
