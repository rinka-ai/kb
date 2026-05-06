---
id: article-2026-05-01-skills-as-verifiable-artifacts
type: source
title: "Skills as Verifiable Artifacts: A Trust Schema and a Biconditional Correctness Criterion for Human-in-the-Loop Agent Runtimes"
path: raw/articles/arxiv/2026-05-01-skills-as-verifiable-artifacts.md
author: Alfredo Metere
publisher: arXiv.org
url: https://arxiv.org/abs/2605.00424
date_published: 2026-05-01
date_added: 2026-05-06
tags: [agents, skills, security, human-in-the-loop, capability-gating, audit-logs, supply-chain, papers]
status: processed
quality: medium
summary: A May 2026 arXiv proposal arguing that agent skills should be treated as untrusted supply-chain artifacts until verified, with manifest verification levels, capability gates, HITL policy, and audit-log correctness checks.
related: [agent-skills, agent-security, agent-harnesses, agent-protocols, agent-tools, llm-agents]
---

# Skills as Verifiable Artifacts: A Trust Schema and a Biconditional Correctness Criterion for Human-in-the-Loop Agent Runtimes

## Source Metadata

- Path: raw/articles/arxiv/2026-05-01-skills-as-verifiable-artifacts.md
- Author: Alfredo Metere
- Published: 2026-05-01
- Publisher: arXiv.org
- URL: https://arxiv.org/abs/2605.00424
- PDF: https://arxiv.org/pdf/2605.00424
- Code: https://github.com/metereconsulting/enclawed

## TL;DR

This paper argues that agent skills should be treated like untrusted supply-chain artifacts, not merely helpful prompt files. Its central pattern is to separate provenance from behavioral verification: signatures, registries, and clearances can identify or authorize a skill, but they do not prove that its runtime effects match its manifest. The proposed runtime therefore loads skills with explicit verification levels, gates irreversible capabilities through HITL when verification is absent or insufficient, and checks whether observed side effects match the approved-and-executed audit log.

## Key Claims

- A skill is untrusted code until verified; signature, clearance, or registry origin should not be treated as behavioral trust.
- Human-in-the-loop approval on every irreversible call is the safe default for unverified skills, but it becomes operationally unsustainable at scale.
- Verification should be an offline/bootstrap-time process that writes an explicit verification level into the skill manifest before the runtime accepts external input.
- Loaded skills should be immutable during a session; any attempted mutation should be treated as an irreversible, audited operation that produces a new artifact requiring re-verification.
- A capability gate should make HITL policy a function of the loaded skill's verification level and declared capabilities.
- The proposed biconditional correctness criterion says observable side effects must correspond exactly to approved-and-executed audit-log records.
- The contribution is intended to be model- and harness-agnostic, assuming only that the runtime can interpose on typed tool dispatch.

## Important Details

- The skill schema models a skill as manifest, content, and detached signature. Mandatory manifest fields include a classification label, declared capabilities, signer, monotone version, and verification level.
- Verification levels are a fixed enum: `unverified`, `declared`, `tested`, and `formal`. The paper intentionally rejects continuous trust scores because they are harder to audit and revoke.
- The capability vocabulary distinguishes side-effect classes such as network egress, filesystem reads, reversible writes, irreversible writes, named tool invocation, process spawning, publishing, payment, and schema mutation.
- The reversible/irreversible split is load-bearing. Reversible effects can run through a transaction buffer; irreversible effects must pass through request, decide, execute, and audit states.
- Broker policies include deny-all, policy-file, interactive human approval, and webhook delegation.
- The biconditional criterion catches gate bypass, audit forgery, approved-but-failed host calls without proper records, and wrong-target execution.
- The criterion does not catch read-only exfiltration, time-of-check/time-of-use races, or cases where an approved action overlaps with a separate malicious effect on the same target.
- The proposed adversarial-ensemble evaluation uses agents biased toward destructive operations, a fixed corpus, deterministic corpus hashes, and audit-log comparison rather than LLM judgment.
- The paper abstracts runtime guidelines from the `enclawed` reference implementation, including locked trust roots, clearance-bounded signing, hash-chained audit logs, deny-by-default boundaries, an egress guard, DLP scanner, HITL controller, checkpointable session state, and transaction buffering.
- Treat the implementation evidence cautiously: the paper is a fresh arXiv v1 and the reference repository is very young, so this note should inform architecture/security framing more than settled empirical claims.

## Entities

- People: Alfredo Metere
- Organizations: Metere Consulting, LLC
- Systems: enclawed, SKILL.md-style agent skill ecosystems
- Concepts: agent skills, supply-chain security, capability gating, human-in-the-loop approval, manifest verification, verification levels, hash-chained audit logs, Bell-LaPadula labels, biconditional correctness, irreversible side effects

## My Notes

- This belongs in the KB because it sharpens the agent-skills concept from "procedural capability module" into "runtime-loaded supply-chain artifact."
- The most reusable idea is the separation between provenance and behavioral verification. A signed skill is attributable, not necessarily safe.
- The paper gives a concrete policy shape for approval fatigue: use HITL universally for unverified irreversible actions, then relax it only for tested manifest-declared capabilities.
- The biconditional criterion is useful because it makes gate correctness post-hoc checkable with deterministic artifacts rather than model judgment.
- The bootstrap-only verification and no-runtime-mutation rules are important for self-evolving skill systems: a skill cannot rewrite what "verified" means mid-session.
- Quality should remain medium for now. The paper is timely and relevant, but it is a May 2026 arXiv v1 with a young reference implementation and limited independent validation.

## Open Questions

- How much of this schema can practical agent runtimes adopt without making ordinary skill authoring too heavy?
- Which verification procedures are realistic for text-heavy skills whose behavior depends on model interpretation?
- How should this interact with self-evolving harnesses where skills, prompts, memory, and tools can all become mutable artifacts?
- Would the biconditional criterion remain useful when side effects include network egress, payments, remote APIs, or multi-step external workflows rather than local file corpora?

## Related

- [[agent-skills]]
- [[agent-security]]
- [[agent-harnesses]]
- [[agent-protocols]]
- [[agent-tools]]
- [[llm-agents]]
- [[2026-04-16-externalization-in-llm-agents-a-unified-review-of-memory-skills-protocols-and-harness-engineering]]
- [[2026-04-28-agentic-harness-engineering-observability-driven-automatic-evolution-of-coding-agent-harnesses]]
- [[2026-04-10-agentdojo-a-dynamic-environment-to-evaluate-prompt-injection-attacks-and-defenses-for-llm-agents]]

## Source Text

ArXiv abstract page text captured during ingest:

View PDF
    HTML (experimental)
            Abstract:Agent skills -- structured packages of instructions, scripts, and references that augment a large language model (LLM) without modifying the model itself -- have moved from convenience to first-class deployment artifact. The runtime that loads them inherits the same problem package managers and operating systems have always faced: a piece of content claims a behavior; the runtime must decide whether to believe it. We argue this paper's central thesis up front: a skill is \emph{untrusted code} until it is verified, and the runtime that loads it must enforce that default rather than infer trust from a signature, a clearance, or a registry of origin. Without skill verification, a human-in-the-loop (HITL) gate must fire on every irreversible call -- which is operationally untenable and degrades into rubber-stamping at any non-trivial scale. With skill verification treated as a separate, gated process, HITL fires only for what is unverified, and the system becomes sustainable. We give a trust schema (§\ref{sec:schema}) that includes an explicit verification level on every skill manifest; a capability gate (§\ref{sec:gate}) whose HITL policy is a function of that verification level; a \emph{biconditional} correctness criterion (§\ref{sec:biconditional}) that any candidate verification procedure must satisfy on an adversarial-ensemble exercise (§\ref{sec:eval}); and a portable runtime profile (§\ref{sec:guidelines}) with ten normative guidelines abstracted from a working open-source reference implementation \cite{metere2026enclawed}. The contribution is harness- and model-agnostic; nothing here requires retraining, fine-tuning, or proprietary infrastructure.

Cryptography and Security (cs.CR); Artificial Intelligence (cs.AI); Multiagent Systems (cs.MA); Software Engineering (cs.SE)

Cite as:
          arXiv:2605.00424 [cs.CR]

(or
              arXiv:2605.00424v1 [cs.CR] for this version)

https://doi.org/10.48550/arXiv.2605.00424

arXiv-issued DOI via DataCite (pending registration)

Submission history From: Alfredo Metere [view email]          [v1]
        Fri, 1 May 2026 05:53:05 UTC (23 KB)
