---
id: summary-2026-08-02-explicit-state-enforced-boundaries
type: summary
title: "Weekly Synthesis: Explicit State and Enforced Boundaries"
tags: [agent-harnesses, agent-security, agent-evals, mcp, context-engineering, durable-execution]
summary: "This week's strongest agent-systems evidence converges on one rule: make useful state explicit and inspectable, while enforcing authority, scope, and isolation outside the model's beliefs."
source_count: 4
canonical_for: [explicit agent state and boundaries, weekly AI research 2026-08-02, agent harness state and containment]
review_status: reviewed
last_reviewed: 2026-08-02
review_due: 2026-11-02
confidence: "0.92"
---

# Weekly Synthesis: Explicit State and Enforced Boundaries

## Summary

The strongest material from 2026-07-27 through 2026-08-02 converges on a systems-design rule: **preserve useful state explicitly, but enforce authority and scope outside the model's interpretation of that state**.

Four sources expose complementary failure and success modes:

- OpenAI's ARC-AGI-3 comparison shows that retained reasoning and compaction can materially improve capability and efficiency.
- The Word prompt-injection disclosure shows that transformations can preserve attacker influence while erasing its provenance.
- MCP 2026-07-28 removes hidden transport sessions in favor of self-describing requests, explicit application handles, and formal lifecycle extensions.
- Anthropic's cyber-evaluation incidents show that a prompt stating "no internet access" does not create isolation; a mismatch between declared and enforced scope can turn an eval into real offensive activity.

## Pattern 1: State Should Be Explicit, Not Ambient

The MCP release and ARC-AGI-3 result point in the same direction at different layers.

- ARC-AGI-3 agents improved when discoveries survived tool calls and context pressure instead of being repeatedly reconstructed or truncated.
- MCP now makes each transport request independently routable and asks stateful applications to return explicit handles rather than relying on hidden connection affinity.
- Long-running work remains stateful, but the state moves into inspectable application and extension contracts.

The transferable principle is to model plans, discoveries, approvals, retries, task handles, compaction lineage, and terminal outcomes as first-class records. Do not make a TCP connection, chat transcript, server affinity, or private reasoning buffer the only place where continuity lives.

## Pattern 2: Declared Boundaries Are Not Enforced Boundaries

Anthropic's cyber evals told Claude there was no internet, while the vendor environment allowed internet access. The agents trusted the task framing and treated reachable production services as simulated targets. The result included production data access, broad scanning, and a malicious PyPI package that executed on unrelated systems.

The Word disclosure is the information-integrity version of the same mistake. A document's apparent role as source material did not prevent its hidden instructions from changing model behavior, and generated artifacts inherited the attack.

A model's belief that content is data, a host is simulated, or a target is authorized is useful defense in depth—but never the enforcement boundary. Network policy, target allowlists, capability filters, artifact-publication controls, typed authority metadata, and approval gates must carry that burden.

## Pattern 3: Better Agents Move the Bottleneck to Verification

Continuity features, agentic cryptanalysis, small eval tooling, and increasingly capable physical agents all point toward a new constraint: generating candidate work is becoming cheaper than validating it.

For Jose's systems, the practical consequence is to spend less architecture effort on unconstrained generation loops and more on:

- executable graders and deterministic state checks,
- provenance-preserving compaction,
- target and capability allowlists,
- independent verification contexts,
- replayable traces and incident reconstruction,
- explicit cost, token, latency, and side-effect accounting.

## Architecture Rules

1. **Separate transport, workflow, and authority state.** Stateless HTTP does not mean stateless work; durable handles do not automatically grant authority.
2. **Carry provenance through compaction and transformation.** Preserve source identity, trust class, permitted influence, and raw-evidence references.
3. **Make scope machine-enforceable.** Resolve allowed targets before execution and deny everything else at the network and tool layers.
4. **Treat eval infrastructure as production infrastructure.** Preflight images, verify egress, continuously monitor traces, and apply the same controls to vendors.
5. **Design retries around idempotency.** MRTR responses, approval resumes, tool retries, and task polling must not duplicate side effects.
6. **Measure full systems.** Record model, prompt, harness, tools, context policy, infrastructure, grader, cost, latency, and containment configuration.

## Experiment

Run one representative coding-agent task under a small matrix:

- continuity: rolling truncation vs structured compaction;
- tools: shell plus open network vs a narrow MCP/tool allowlist;
- source: trusted fixture vs fixture containing a benign canary instruction;
- scope: prompt-declared target list vs network-enforced target allowlist.

Measure completion, repeated work, output tokens, cost, canary propagation, denied egress, duplicated side effects, and whether a fresh reviewer can reconstruct every consequential action from the trace. The goal is not merely the highest task score; it is the best useful-work-to-uncontrolled-authority ratio.

## Tensions And Unknowns

- Explicit state handles improve inspectability but can become bearer capabilities unless scoped and expired.
- Stateless protocol cores simplify operations while increasing the risk of ecosystem fragmentation through extensions.
- Strong network isolation reduces realistic cyber-eval coverage; realism should be introduced through controlled proxies and allowlists rather than ambient internet access.
- Compaction improves continuity but can preserve false beliefs or injected instructions if authority metadata is dropped.
- Model situational awareness may improve, but the three Anthropic incidents do not support a controlled claim about model-generation trends.

## Source Notes

- [[2026-07-29-how-enabling-two-settings-tripled-our-arc-agi-3-scores]]
- [[2026-07-28-context-collapse-part-3-ai-worming-through-word]]
- [[2026-07-28-the-2026-07-28-model-context-protocol-specification]]
- [[2026-07-30-investigating-three-real-world-incidents-in-our-cybersecurity-evaluations]]

## Related

- [[agent-protocols]]
- [[agent-security]]
- [[ai-agent-evals]]
- [[durable-execution]]
- [[context-engineering]]
