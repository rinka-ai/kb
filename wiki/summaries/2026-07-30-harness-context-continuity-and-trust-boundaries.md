---
id: summary-2026-07-30-harness-context-continuity-trust-boundaries
type: summary
title: "The Harness Is Part of the System: Context Continuity and Trust Boundaries"
tags: [agent-harnesses, context-engineering, agent-evals, retained-reasoning, compaction, prompt-injection, provenance, ai-worms]
summary: "Retained reasoning and compaction can sharply improve agent capability and efficiency, but persistent context and generated artifacts also preserve attacker influence unless authority and provenance survive every transformation."
source_count: 2
canonical_for: [harness context continuity, propagating prompt injection, authority-aware compaction]
review_status: reviewed
last_reviewed: 2026-07-30
review_due: 2026-10-30
confidence: "0.91"
---

# The Harness Is Part of the System: Context Continuity and Trust Boundaries

## Summary

Two items from the 2026-07-30 daily AI brief expose both sides of persistent context:

1. OpenAI reports that retained reasoning plus compaction raised GPT-5.6 Sol's ARC-AGI-3 public-set score from 13.3% to 38.3% while using roughly six times fewer output tokens.
2. Håkon Måløy demonstrates that attacker-controlled instructions can persist across Copilot-assisted Word transformations, turning generated documents into new prompt-injection carriers.

The combined lesson is stronger than either source alone: **state continuity is both a capability primitive and a security boundary**. A harness should preserve discoveries, plans, and unresolved work while refusing to preserve or amplify authority that originated in untrusted data.

## Evidence From the ARC-AGI-3 Harness

The OpenAI comparison shows that benchmark outcomes depend materially on execution policy:

- The generic harness discarded reasoning after each action and used rolling truncation when context filled.
- The Responses API harness retained private reasoning and compacted prior state.
- The score increased from 13.3% to 38.3% on the public task set.
- Output-token usage fell by roughly sixfold because the model repeated less work.

This is not evidence that compaction always triples performance. The intervention bundles retained reasoning and compaction, uses one model family and benchmark, and comes from the model provider. It is, however, strong evidence that agent evaluations must report the harness as part of the evaluated system.

## Evidence From AI Worming Through Word

The coordinated disclosure extends indirect prompt injection from a one-session event into an artifact-propagation problem:

- An external document supplies both legitimate facts and hidden attacker instructions.
- Copilot interprets the instructions while drafting or editing another document.
- The generated document contains manipulated content and a copy of the attack.
- Internal reuse grants the new carrier more apparent trust even though its attacker-controlled lineage remains.
- The attack class reproduced after mitigation attempts and a model upgrade during a 144-day disclosure period.

The central failure is not simply weak filtering. It is the collapse of distinct authority classes—user instructions, source data, system policy, and generated artifacts—into one semantic channel.

## Combined Design Principle

**Preserve state without laundering authority.**

A safe context or compaction layer should retain:

- discoveries and observations,
- attempted approaches and outcomes,
- current plan and termination state,
- unresolved questions,
- evidence references and uncertainty.

It should also retain security metadata for every contribution:

- source identity,
- trust level,
- permitted influence,
- transformation lineage,
- whether content is data, instruction, policy, or generated inference.

Compression that drops these labels may improve continuity while silently converting untrusted data into durable instruction or memory.

## Architecture Implications

### Separate semantic content from authority

Store content and authority metadata separately enough that summarization cannot erase the distinction. A source document may contribute facts but must not become authorized to change goals, tools, policies, or destination artifacts.

### Make compaction inspectable and restorable

Keep references to raw events and evidence. Record what was preserved, dropped, or reclassified. For high-risk workflows, use auditable diffs between pre- and post-compaction state.

### Prevent automatic trust elevation

Generated output should inherit the minimum trust of its contributing sources unless a deliberate validation step raises it. Being produced internally is not proof of integrity.

### Constrain transformations

Prefer schemas and transformations that specify which fields a source can affect. A financial source may populate evidence fields but should not silently modify policy, instructions, or unrelated figures.

### Keep privileged action outside untrusted-reader stages

Low-privilege workers can inspect external documents and return typed summaries. Privileged actors should operate on constrained representations and explicit user intent rather than raw attacker-controlled text when possible.

## Evaluation Matrix

A complete harness evaluation should test both continuity and containment.

### Capability and efficiency

- task success rate,
- output tokens and total cost,
- repeated actions or rediscovery,
- recovery after context reset,
- long-horizon plan consistency,
- compaction fidelity.

### Security and integrity

- whether untrusted canary instructions alter behavior,
- whether injected text survives compaction or memory writes,
- whether generated artifacts reproduce attacker content,
- whether source trust and lineage survive transformations,
- whether integrity-sensitive fields change without authorization,
- whether quarantining one carrier prevents downstream reuse.

## Practical Experiment

Run one representative multi-step agent task under three state policies:

1. complete history,
2. rolling truncation,
3. structured compaction.

In every configuration, include an untrusted source containing a benign canary instruction. Measure capability, token use, repetition, and whether the canary reaches durable memory, a generated artifact, or a privileged action.

The best harness is not merely the one with the highest task score. It is the one that preserves useful state while preserving the boundaries that determine which state is allowed to influence what.

## Tensions And Unknowns

- Retained private reasoning improves continuity but can reduce portability and inspectability.
- Provider-specific harness features can improve real performance while weakening cross-model benchmark comparability.
- Strong provenance metadata adds cost and can be lost when artifacts cross applications or file formats.
- Model-based injection classifiers face the same data-versus-instruction ambiguity as the protected model.
- The ARC-AGI-3 result needs independent replication and ablation of retained reasoning versus compaction.
- Durable artifact-level provenance still lacks a broadly deployed cross-application standard.

## KB Changes

- Added the OpenAI ARC-AGI-3 source note and linked it to `[[ai-agent-evals]]` and `[[context-engineering]]`.
- Added the coordinated-disclosure source note and linked it to `[[agent-security]]`.
- Added this synthesis to connect continuity engineering with provenance-preserving security.

## Source Notes

- [[2026-07-29-how-enabling-two-settings-tripled-our-arc-agi-3-scores]]
- [[2026-07-28-context-collapse-part-3-ai-worming-through-word]]
