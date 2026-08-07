---
id: summary-2026-07-31-kery-beyond-hermes-evidence-locked-financial-agent
type: summary
title: Kery Beyond Hermes — An Evidence-Locked Financial Agent
tags: [financial-agents, vertical-agents, agent-harnesses, agent-security, durable-execution, context-engineering, agent-tools, ai-agent-evals]
summary: Kery can exceed Hermes in a high-assurance financial domain by preserving its deterministic authority boundary while adding an iterative read-only evidence loop, durable runs, provenance-preserving context, progressive disclosure, and finance-specific evaluation.
source_count: 2
canonical_for: [Kery agent architecture, evidence-locked financial agent, Kery Hermes comparison]
review_status: reviewed
last_reviewed: 2026-07-31
review_due: 2026-10-31
confidence: "0.88"
---

# Kery Beyond Hermes — An Evidence-Locked Financial Agent

## Verdict

Kery already has the more important half of a financial agent: the model is structurally separated from policy, approval, signing, execution, and settlement. Hermes is substantially ahead on the other half: iterative reasoning, tool use, context management, durable run controls, provider operations, session UX, progressive discovery, and observability.

The right target is not “Hermes plus wallets.” It is an **evidence-locked financial reasoning runtime** with a Pi-shaped typed core, Hermes-shaped operational maturity, and Kery's stronger authority boundary.

## Pi As The Core-Shape Counterweight

Pi Agent was also inspected at commit `ab366ebe94cacd419d986be454f12b1b9913aaca`. Its reusable core is much closer to the implementation shape Kery should prefer: a 792-line typed agent loop plus explicit message, provider, tool, context-transform, streaming-event, steering, follow-up, cancellation, and sequential/parallel execution contracts.

Pi shows that iterative tool use does not require a Hermes-sized mutable core. Its `transformContext` and `convertToLlm` boundaries keep application messages separate from provider messages; its event stream represents message and tool progress; and its before/after tool hooks provide explicit execution boundaries.

Pi's own README also states that it has no built-in permission system and runs with the launching process's permissions. Kery should adopt Pi's small composable loop shape, not its coding-agent shell/filesystem authority.

## Current Core Comparison

| Capability | Kery today | Hermes v0.19.1 | Direction |
| --- | --- | --- | --- |
| Authority boundary | Strong structural separation; model emits strict untrusted proposals and cannot reach execution packages | Broad general-agent tools; relies on OS isolation as the real adversarial boundary | Preserve Kery's boundary |
| Agent loop | One provider completion followed by strict proposal parsing | Iterative tool loop with budgets, concurrency, interruption, steering, retries, and fallback | Add a bounded read-only loop |
| Tools | A strict read-only registry exists but is not integrated into the production turn | Large registry/toolset ecosystem with tiered discovery | Integrate only snapshot/evidence tools |
| Context | Complete history is sent until a hard 400,000-byte rejection | Stable prompt prefix, compression, session search, usage and context breakdown | Add token-aware, provenance-preserving context |
| Sessions and runs | Sessions and messages exist; the HTTP request owns the turn | Resume, branch, rewind, interrupt, steer, usage, recovery, multiple client protocols | Add a durable run state machine |
| Provider operations | Simple provider interface; no tools, streaming, usage, retries, or explicit fallback policy | Multiple provider modes, credential pools, auxiliary models, fallback, streaming, cache handling | Add typed responses and explicit pinned transitions |
| Events and traces | Small ordered in-process lifecycle event set and SSE | Rich tool/run/delegation events, trajectories, monitoring, OTLP | Persist typed events and export outside the runtime |
| Learning and skills | Proposal-first, administrator-reviewed, versioned, isolated from authorization | Powerful mutable memory/skills and background review | Kery is safer; add eval gates and provenance |
| Automation | Durable SQLite jobs, leases, history, model pinning, and fail-closed drift behavior | Cron, gateways, fresh sessions, background work | Kery is already strong; connect it to durable runs |
| Code shape | Small typed TypeScript modules with enforced dependency edges | Successful but complex Python core with several multi-thousand-line god files | Preserve small state machines and ports |

## Kery's Existing Advantages

- Strict Zod proposal variants reject unknown and cross-variant fields.
- `packages/agent-runtime` cannot import wallets, venues, storage, channels, or transaction infrastructure.
- Learning and skills can shape reasoning but cannot enter deterministic authorization.
- The control plane independently observes state, screens mandates, evaluates policy, simulates, binds approvals to exact digests, reserves, executes, verifies settlement, records receipts, and reconciles.
- Missing integrations fail closed instead of substituting simulation or invented success.
- Automation pins provider/model identity and fails closed on drift.
- The codebase treats model output as untrusted input rather than as an authorization decision.

These are not limitations to relax. They are the foundation on which the more capable runtime should be built.

## Kery's Core Gaps

### 1. The tool registry is an unused safety skeleton

`ToolRegistry` correctly refuses names and descriptions associated with transactions, signing, generic HTTP/RPC, policy mutation, and other escape hatches. Production `runAgentTurn`, however, performs one `provider.complete` call and never assembles or executes tools.

Kery therefore has a safe registry contract without an agentic observation loop.

### 2. The provider contract is too narrow

The provider returns a raw string. The runtime cannot represent assistant messages, tool calls, streaming deltas, finish reasons, token usage, cache reads/writes, model identity, or recoverable error classification.

### 3. Context failure is honest but abrupt

Kery sends the complete conversation and rejects it when the serialized input exceeds 400,000 bytes. This avoids silent truncation, which is good, but prevents long-running sessions and offers no token budget, compaction, retrieval, or raw-history recovery.

### 4. A session is not yet a durable run

The API provides session creation, message submission, message history, and an event stream. It lacks durable run IDs, queued/active/terminal states, cancellation endpoints, reconnection by run, branch/fork, retry lineage, status, usage, and model/snapshot identity.

The request path also does not propagate its `AbortSignal` into `runAgentTurn`, despite the runtime supporting one.

### 5. Evidence lacks first-class provenance

The controller correctly supplies sanitized values, not effectful clients. The observation schema should additionally carry evidence identity, origin, observation time, freshness, snapshot digest, connector capability, and quality metadata. Model claims and final intent proposals should cite evidence IDs.

### 6. Observability is too sparse for harness evaluation

Ordered events are a good primitive, but the current event vocabulary does not cover tool selection, tool latency, budget consumption, compaction, evidence access, model usage, fallback, retry, or reasoning-step outcomes. Events are not yet a durable trajectory.

### 7. The API contract is manually duplicated

The Elysia routes, hand-written OpenAPI document, and hand-written SDK can drift. Current inspection found a real route absent from OpenAPI. The API also lacks a run-oriented protocol.

## Target Architecture

### Evidence plane

The control plane creates an immutable `EvidenceBundle`:

- bundle and content digests
- installation, session, run, and request identity
- source connector and capability
- observed-at time and freshness/expiry policy
- normalized values
- confidence or quality metadata
- bounded handles to larger raw evidence
- explicit trust/authority label

The agent receives this bundle as values. It never receives the connector object.

### Read-only reasoning loop

The runtime executes a bounded state machine:

1. Assemble stable L1 context and the evidence catalog.
2. Call the pinned model.
3. Validate a strict assistant response.
4. If it requests an observation tool, validate input, budget, scope, and bundle identity.
5. Execute only pure reads over the immutable bundle.
6. Append a typed tool result with provenance.
7. Repeat until a strict reply, learning proposal, skill proposal, or intent proposal settles the run.

Budgets include maximum model steps, tool calls, wall time, input/output tokens, and per-tool result bytes. Concurrency is allowed only for independent pure observations.

### Progressive domain disclosure

- **L1 always resident:** mandate summary, safety invariants, intent vocabulary, run budget, and a small evidence-tool catalog.
- **L2 fetched:** relevant connector schemas, domain procedures, market conventions, policy explanations, and skills.
- **L3 raw evidence:** bounded content-addressed slices with provenance and audit access.

This adapts Hermes's tiered tool discovery and the vertical-agent context hierarchy to a finance-specific trust model.

### Provenance-preserving context

Compaction may summarize working context but must preserve:

- evidence IDs and timestamps
- trust and authority labels
- unresolved uncertainty
- rejected hypotheses and failure states
- current task, plan, and run budget
- exact intent fields already proposed
- links to the raw transcript and tool results

Compacted text is working state, not authority or a replacement source.

### Durable runs

Add a durable `AgentRun` separate from `Session` with:

- idempotent submission key
- status and terminal outcome
- pinned provider and exact model
- evidence-bundle digest
- context/compaction lineage
- step and token budgets
- retry/fallback lineage
- cancellation state
- usage and cost
- typed event cursor
- final proposal or failure

Recommended states: `queued`, `assembling_context`, `reasoning`, `awaiting_clarification`, `proposed`, `cancelled`, `failed`, and `completed`.

Approval, execution, settlement, and reconciliation remain separate deterministic control-plane workflows.

### Provider protocol

Replace raw strings with a provider-neutral response union for text, structured proposal, tool request, usage, finish reason, and provider metadata. Capability negotiation should state whether the exact model supports native tools, structured output, streaming, and usage reporting.

A provider or model fallback must be explicit. For unattended financial automation, the safest default is a new run identity or a visible fail-closed outcome, not silent continuation.

### Typed specialists, later

After the single-agent loop passes evaluation, add scoped specialist analyses for market context, risk, execution quality, accounting, compliance explanation, and adversarial review.

Each specialist receives a subset of the same immutable evidence bundle, a strict report schema, and a budget. It has no effectful tools. A deterministic coordinator combines reports and preserves disagreements. Retain multi-agent work only when measured gains exceed cost, latency, and correlated-failure penalties.

## Delivery Plan

### Phase 0 — Repair the HTTP and contract substrate

- Fix raw-body webhook handling, malformed JSON classification, numeric configuration validation, CORS/origin semantics, and query-token SSE authentication.
- Move route inputs, parameters, outputs, and errors into declarative Elysia schemas.
- Generate OpenAPI from the route contract and generate or contract-test the SDK.
- Add OpenTelemetry through an outer adapter without changing `agent-runtime` dependencies.

Exit gate: composed-app tests cover every production route and error class; OpenAPI exactly matches the route inventory.

### Phase 1 — Introduce durable run and provider contracts

- Add `RunId`, `AgentRun`, `AgentStep`, provider response unions, usage, exact model identity, and typed failure classification.
- Persist run state and agent events.
- Add idempotent run submission, status, events, stop, usage, and capability endpoints.
- Propagate cancellation from HTTP, channels, automations, and shutdown.

Exit gate: a run survives process restart, reconnects by event cursor, cancels safely, and never replays an intent side effect.

### Phase 2 — Integrate the evidence-locked tool loop

- Extend observations into immutable evidence bundles.
- Integrate `ToolRegistry` into `runAgentTurn`.
- Add strict output schemas, result-size limits, step/tool/token/wall budgets, and pure-read concurrency rules.
- Bind every tool call and proposal to run and bundle digests.

Exit gate: no agent-runtime dependency edge reaches an effectful package; adversarial tests cannot register or reach transaction, HTTP, RPC, signer, venue, or policy-mutation tools.

### Phase 3 — Add progressive disclosure and context continuity

- Implement L1/L2/L3 domain context allocation.
- Add stable prompt-prefix assembly, token accounting, session search, and provenance-preserving compaction.
- Add branch/fork and resume semantics over durable sessions and runs.

Exit gate: long-session evaluations retain required evidence and authority labels through multiple compactions with no silent truncation.

### Phase 4 — Build the financial-agent evaluation and observability plane

- Persist redacted trajectories with trace/span IDs, evidence/tool timings, usage, and snapshot/proposal/policy/simulation digests.
- Add deterministic scenario suites for stale data, prompt injection, replay, connector failure, partial fills, reorgs, model drift, compaction, cancellation, and crash recovery.
- Report utility, intent validity, evidence coverage, unsupported claims, fail-closed correctness, attack success, latency, and cost separately.

Exit gate: every runtime or model change has a pinned before/after evaluation report and no regression in authority-boundary tests.

### Phase 5 — Strengthen governed learning and specialists

- Require evidence references, confidence, expiry, and expected impact on learning/skill proposals.
- Add one installation-level `skills.updateMode` setting:
  - `automatic` (recommended default): validated, non-destructive changes to installation-owned learned skills use the existing proposal-and-acceptance transaction automatically after the originating run settles.
  - `review`: preserve the current explicit administrator acceptance workflow.
  - `disabled`: reject model-authored skill mutations and omit mutation instructions from model context.
- Keep deletion, conflicted changes, Metis release changes, and upstream-rebase conflicts review-only in every mode.
- Record whether each decision was automatic or operator-made, retain before/after digests and immutable revisions, notify through a batched activity digest, and provide one-click rollback.
- Bound automatic mutation frequency per run and per day so a bad session cannot flood or churn the skill catalog.
- Never activate a skill midway through the run that proposed it; the next run receives the new version so prompt/context identity stays stable.
- Run offline evaluation before activation; support canary/shadow comparison and rollback.
- Add typed read-only specialists only where the evaluation suite demonstrates value.

Exit gate: automatic mode removes routine approval work without bypassing the canonical proposal validator/application transaction; no autonomous learning widens authority; every active skill has provenance, decision source, version lineage, and rollback.

## “More Advanced” Success Criteria

Kery should claim superiority only when evidence shows:

- higher valid-intent and evidence-coverage rates on financial tasks
- lower unsupported-claim and stale-evidence rates
- zero model reachability to transaction-capable surfaces
- deterministic fail-closed behavior under missing or conflicting integrations
- correct cancellation, restart, idempotency, and replay behavior
- preserved provenance through long sessions and compaction
- explicit model/provider identity for every run
- measurable gains from skills or specialists before promotion
- smaller, more testable runtime components than Hermes's current core

## Related

- [Pi Agent core at the inspected revision](https://github.com/badlogic/pi-mono/tree/ab366ebe94cacd419d986be454f12b1b9913aaca/packages/agent)
- [[2026-07-31-hermes-agent-v0-19-1-source-teardown]]
- [[2026-06-12-vertical-agent-context-cache-hierarchy]]
- [[2026-06-02-anthropic-financial-services-ingest-assessment]]
- [[agent-frameworks]]
- [[agent-harnesses]]
- [[managed-agents]]
- [[agent-tools]]
- [[agent-skills]]
- [[agent-protocols]]
- [[durable-execution]]
- [[context-engineering]]
- [[agent-security]]
- [[ai-agent-evals]]
