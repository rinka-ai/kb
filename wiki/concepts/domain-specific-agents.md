---
id: concept-domain-specific-agents
type: concept
title: Domain-Specific Agents
tags: [agents, domain-specific-agents, vertical-agents, specialist-agents, multi-agent-systems, context-engineering]
source_count: 4
summary: Domain-specific agents package one bounded domain's context, tools, state, policies, and execution environment into a reusable unit; they help when context and authority boundaries are real, but lose when routing and coordination overhead exceed the isolation gains.
canonical_for: [domain specific agents, domain-specific agents, vertical agents, specialist agents, agent composition]
review_status: reviewed
last_reviewed: 2026-07-29
review_due: 2026-10-27
confidence: "0.84"
---

# Domain-Specific Agents

## Summary

Domain-specific agents are bounded agent packages optimized for one stable task or integration domain. They can own a tailored prompt, focused tools, domain references, message history, state, hooks, run rules, model choice, filesystem, sandbox, and permission envelope. A coordinator treats the specialist as one capability and exchanges compact task and result messages with it instead of loading the specialist's entire domain into the coordinator's context.

The architecture combines two complementary ideas. [[2026-06-11-building-good-vertical-agent]] explains how one vertical agent should compress its task distribution into always-resident hot paths, fetched specifications, and searchable raw references. [[2026-06-28-the-future-is-domain-specific-agents]] extends the boundary outward: when a domain also has separable state, authority, tools, and evaluation criteria, package the whole vertical as a composable agent rather than another pile of context in a general assistant. Anthropic's multi-agent guidance supplies the necessary counterweight: specialization works best when domains are clearly separable and routing is unambiguous; otherwise handoffs, duplicated context, maintenance, and the coordination “telephone game” can cost more than the isolation saves.

## When Specialization Pays

- The domain carries substantial context that most parent tasks do not need.
- The tool set is coherent and narrower than the parent agent's full capability surface.
- Inputs and outputs can be expressed as a stable, testable contract.
- Credentials, network access, filesystem scope, and delegation rights can be narrowed at the same boundary.
- The specialist can be evaluated on representative domain tasks independently of the coordinator.
- Routing is unambiguous enough that the coordinator does not need the specialist's expertise merely to decide whether to call it.
- The domain benefits from a different model, latency target, cost envelope, or execution environment.
- The same specialist will be reused often enough to repay packaging, deployment, observability, and versioning costs.

## Reference Architecture

- **Coordinator:** owns the user objective, task decomposition, routing, synthesis, approval policy, and final result.
- **Specialist contract:** defines accepted task types, required context, authority envelope, output schema, evidence, errors, and escalation behavior.
- **Domain context:** keeps common instructions and wrappers resident, fetches occasional specifications on demand, and preserves a bounded raw-reference escape hatch.
- **Capability surface:** exposes only the tools, code APIs, prompts, or nested agents required by the domain.
- **Execution boundary:** supplies isolated filesystem and code execution, explicit network policy, resource limits, and scoped secret references.
- **State boundary:** distinguishes specialist-owned session state from coordinator state and shared durable records.
- **Model policy:** selects a model against measured domain quality, latency, and cost, with escalation for uncertain or long-tail cases.
- **Trace boundary:** correlates coordinator calls, specialist runs, model/tool spans, approvals, side effects, retries, and returned evidence.

## Design Rules

- Decompose by context and authority boundaries, not by job titles or an impulse to create one agent per tool.
- Keep the coordinator-to-specialist request narrow, but include success criteria, relevant state, and the authority granted for that call.
- Return compact conclusions plus inspectable evidence, not only a confident prose summary.
- Treat natural-language handoffs as convenient interfaces, not complete protocols; consequential tasks need typed results, explicit errors, versioned contracts, and durable identities.
- Count total-system cost: coordinator context, specialist prefixes, routing, summaries, retries, verification, and idle runtime all belong in the denominator.
- Evaluate routing accuracy and end-state correctness as well as specialist task accuracy.
- Do not assume a smaller model is adequate because the prompt is smaller; test the actual task distribution and define escalation behavior.
- Scope credentials, filesystem, network, and downstream delegation with the same care as the model-facing tool list.
- Keep durable orchestration primitives independent of the current specialist topology so agents can be split, merged, or replaced without rewriting the control plane.
- Prefer tool search, progressive disclosure, or one code-mediated capability surface when context inflation is the only problem and a separate stateful agent would add needless coordination.
- Avoid deep recursive hierarchies unless each boundary materially reduces context or authority and the complete trace remains debuggable.
- Version specialist packages and contracts independently, but test compatible coordinator-specialist combinations before rollout.

## Evidence Boundaries

- Anthropic reports that focused tool sets and tailored prompts can improve reliability when a general agent has too many tools or conflicting domain instructions. It also reports that multi-agent systems commonly consume more total tokens and add routing and maintenance overhead.
- ElevenLabs' voice-agent guidance supports specialization for bounded responsibilities and clear handoffs, while warning that a network of specialists is not automatically better than one well-designed agent.
- Wang's vertical-agent article supplies a detailed context-allocation pattern but reports product performance from the builder's own company.
- Schroeder's talk supplies the composition and portable-package thesis, but its token-efficiency, model-cost, and token-price figures are underspecified and self-reported. They are not KB planning constants.
- Local context reduction and total-system efficiency are different metrics. A specialist can receive a much smaller prompt while the composed system spends more tokens overall.

## Tensions

- focused context vs coordinator routing knowledge
- narrow permissions vs transitive authority through nested agents
- specialist reuse vs version and deployment overhead
- smaller worker models vs escalation frequency and long-tail failures
- compact handoffs vs lost provenance and the coordination telephone game
- local prompt savings vs total-system token and latency cost
- parallel execution vs shared-state conflicts and human review throughput
- natural-language interoperability vs typed, auditable task contracts
- portable agent packages vs environment, identity, secret, and sandbox dependencies
- deep domain expertise vs an agent roster too large to route and maintain reliably

## Source Notes

- [[2026-06-28-the-future-is-domain-specific-agents]]
- [[2026-06-11-building-good-vertical-agent]]
- [[2026-01-23-building-multi-agent-systems-when-and-how-to-use-them]]
- [[2026-04-12-prompting-guide]]
