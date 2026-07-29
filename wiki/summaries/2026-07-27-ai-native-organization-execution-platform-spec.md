---
id: 2026-07-27-ai-native-organization-execution-platform-spec
type: summary
title: AI-Native Organization Execution Platform — Product Specification
tags: [agent-harnesses, managed-agents, durable-execution, workflows, agent-security, agent-observability, agent-memory, context-engineering, enterprise-ai, product-spec, github]
summary: "A product specification for an organization execution platform where any employee turns an idea into an approved Goal Contract, agents execute it under company rules and design-system constraints through a durable planner/executor/verifier loop, everyone queries permission-filtered status over one evidence graph, and delivery lands as a normal GitHub pull request."
source_count: 26
canonical_for: [ai-native organization execution platform, goal contract, idea to pull request agent platform, org execution kernel, workflow pack architecture]
review_status: draft
last_reviewed: 2026-07-27
review_due: 2026-10-25
confidence: "0.72"
---

# AI-Native Organization Execution Platform — Product Specification

## Summary

This is a product specification for a platform that lets any employee — technical or not — move an idea through a legible pipeline: **explain → spec → pass criteria → approval → persistent goal → durable execution → shared queryable status → GitHub pull request**. The organizing move is to give the enterprise the control surfaces that software engineering already has, because those surfaces are why AI works better in engineering than elsewhere: bounded artifacts, checkable outputs, structured state, and fast review ([[enterprise-agent-deployment-failure-modes]]).

Three commitments define the product.

1. **The Goal Contract is execution truth.** Chat is an authoring surface for producing it, never the record of what was agreed.
2. **The platform is a kernel plus packs.** It owns goals, runs, approvals, capabilities, evidence, and PR handoff. Everything domain-specific arrives as a workflow pack or connector.
3. **Delivery ends in the organization's existing controls.** The platform opens a pull request. It does not merge, does not deploy, and does not weaken branch protection.

This document separates evidence-backed architecture from product speculation; see [Evidence Basis And Speculation Boundary](#evidence-basis-and-speculation-boundary) before treating any section as validated.

## Premise Correction: No Platform Can Safely Own Every Workflow

The framing "a platform that handles all possible AI workflows" should be rejected. It is the failure mode the KB documents most consistently, under three names in [[enterprise-agent-deployment-failure-modes]]: the **audit gap** (building against the imagined workflow rather than the real one), **over-LLMing** (routing deterministic work through a model because the model is the exciting part), and **agent sprawl** (many local automations with no shared identity, approval, audit, or retirement path). A platform that promises universal coverage has to guess at workflows it has never observed, and every guess becomes an unowned surface with real side effects.

The correct shape is an **opinionated extensible kernel**:

| Layer | Owns | Extensible? |
|---|---|---|
| **Kernel** | Goal Contract lifecycle, run/step durability, approvals, capability grants, evidence graph, status query, PR handoff | No — fixed contracts |
| **Workflow packs** | Domain procedures: feature delivery, UI change, bugfix, doc update, data migration, research spike | Yes — first-party and org-authored |
| **Connectors** | Typed access to external systems under a capability contract | Yes — tiered by side-effect class |
| **Constitution** | Org rules, repo conventions, design-system constraints | Yes — org-owned, versioned |

Code delivery is in the kernel; everything else is a pack. A pack that cannot express its acceptance evidence in a machine-checkable form does not ship — that constraint is what stops the platform from accreting unverifiable automation. This mirrors the [[workflows]] rule that orchestration belongs in code where the shape is known, and the [[agent-skills]] rule that a workflow earns promotion to a reusable module only after repeated use reveals stable inputs, outputs, and review criteria.

## Non-Goals

- Not a replacement for the issue tracker, CI/CD, or code review. It integrates with them and preserves their authority.
- Not an autonomous merge or deploy system. No path grants an agent merge or release authority.
- Not a general RPA or browser-automation suite. Browser use is a fallback capability inside a connector, not a product pillar.
- Not a design tool. The design system is consumed as constraint, not authored here.
- Not a BI/analytics product. Status answers are execution-state answers over the evidence graph, not general business intelligence.
- Not a chat product. Conversation exists to author and interrogate contracts.
- Not a model provider. Model choice is a routing decision ([Multi-Model Portability](#multi-model-portability)).
- Not a system of record for anything another system already owns ([System-Of-Record Ownership](#system-of-record-ownership)).

## Personas And Jobs

| Persona | Technical? | Owns the decision | Primary surface |
|---|---|---|---|
| **Originator** | No | Is this idea worth specifying? | Intake, Spec Studio |
| **Spec owner / PM** | Mixed | Are the pass criteria the right ones? | Spec Studio, Goal Board |
| **Engineer** | Yes | Is this change correct and maintainable? | Run Console, PR |
| **Approver / lead** | Mixed | Should this goal run with this authority and budget? | Approvals Inbox |
| **Reviewer / CODEOWNER** | Yes | Should this merge? | GitHub (unchanged) |
| **Security & compliance owner** | Mixed | What may agents reach, and what is retained? | Constitution, Capability Registry |
| **Platform operator** | Yes | Is the platform healthy, affordable, and improving? | Observability, Metrics |

The non-technical path is deliberately bounded: originators and spec owners own idea, spec, pass criteria, and approval. They do not own code review, and merge authority never leaves CODEOWNERS.

## The Goal Contract

The **Goal Contract** is the approved, versioned artifact that authorizes execution. It is committed to the repository as well as stored in the platform, so it is diffable and reviewable in the same place as the code it governs.

```
GoalContract
  id, version, status
  intent            # plain-language statement, authored by a non-technical user
  spec              # structured requirements, acceptance-oriented
  pass_criteria[]   # each machine-checkable or explicitly human-judged
  authority         # capability grants: which connectors, which scopes
  budget            # token, wall-clock, retry, and cost ceilings
  data_scope        # which repositories, datasets, and tenants are in scope
  tool_policy       # allowed capability classes and approval tiers
  workflow_pack     # which pack executes this
  constitution_ref  # pinned constitution version
  approvals[]       # who approved which version, when, with what note
  supersedes        # prior contract version, if amended
```

**Chat is an authoring surface; the Goal Contract is execution truth.** A conversation may produce, amend, or interrogate a contract. Nothing an agent reads from chat history authorizes an action that the contract does not grant. This follows the [[agent-protocols]] principle that capability must not be confused with authorization, and the [[context-engineering]] placement rule that authority boundaries belong in schemas and gates rather than prose.

Amendment is versioning, not mutation. A material change to spec, pass criteria, authority, budget, or data scope creates a new version requiring re-approval; in-flight runs pause at the next checkpoint rather than silently adopting new terms.

### What "One-Shot" Means

"One-shot" is a property of **human authorization**, not of model execution. Precisely:

> One-shot means **one approved Goal Contract version** — a single approval cycle, which may itself require several approvers — followed by checkpointed execution that may launch many retried and independently verified steps and may pause at any number of later scoped gates.

The approval cycle is not one person's signature. A contract requiring privileged capability, elevated budget, or expanded data scope routes to every approver the constitution requires for those grants, and the contract version is `approved` only when all of them have decided. What makes it "one-shot" is that the originator does not re-litigate the goal at each step, not that authority came from a single individual.

It explicitly does **not** mean:

- one opaque model call,
- one context window,
- execution without checkpoints or verification,
- approval by the originator alone where the constitution requires additional authority,
- a blanket grant that suppresses the later scoped gates the contract defines,
- permission to merge, deploy, or take any irreversible action automatically,
- authority to exceed the contract's budget, data scope, or capability grants.

The approval cycle completes once per contract version; the system still stops at every gate the contract and constitution define, and an amendment restarts the cycle. This preserves the [[durable-execution]] property that pause, resume, and human intervention are first-class runtime behaviors rather than recovery hacks.

## System-Of-Record Ownership

Two writable masters for the same fact is the defect that makes execution platforms untrustworthy. Ownership is exclusive; everything else is a projection or a reference.

| Fact | System of record | Platform behavior |
|---|---|---|
| Goal Contract, versions, approvals | **Platform** | Authoritative; mirrored to repo as a committed artifact |
| Run, step, retry, checkpoint, budget spend | **Platform** | Authoritative |
| Approval decisions and evidence ledger | **Platform** | Authoritative, append-only |
| Code, commits, branches, PRs, checks, reviews | **GitHub** | Referenced by ID; never shadow-copied as truth |
| Roadmap and portfolio records | **Connected project tool** (when configured) | Two-way *reference* sync; platform writes only fields the org maps explicitly |
| Tokens, components, usage rules | **Design-system repo / catalog** | Read-only constraint input, pinned by version |
| Identity, roles, group membership | **Org IdP** | Read-only; platform never becomes a shadow directory |
| Secrets and credentials | **Vault / credential broker** | Platform holds handles, never material |

When no project tool is connected, the platform's roadmap view is a **derived projection** of goal state and dependencies — explicitly labeled as such — not a second planning database. The Gantt view is likewise derived; it is not hand-editable, because a hand-edited plan diverges from execution truth within days.

## Core Domain Objects

| Object | Purpose | Key fields |
|---|---|---|
| `Idea` | Pre-spec capture | author, statement, attachments, status |
| `Spec` | Structured requirements | sections, open questions, references |
| `PassCriterion` | One verifiable condition | statement, kind (`automated` \| `human`), verifier, evidence_ref |
| `GoalContract` | Authorization artifact | see above |
| `Plan` | Decomposition of a contract | steps, dependencies, estimates, pack_ref |
| `Run` | One execution of a plan | contract_version, status, budget_spent, checkpoints |
| `Step` | Durable unit inside a run | kind, inputs, outputs, retries, side_effect_class |
| `CapabilityGrant` | Scoped authority to act | connector, scope, ceiling, expiry, approval_tier |
| `Approval` | Resumable human decision | subject, requester, decider, decision, rationale, resumed_at |
| `Artifact` | Durable output | kind, uri, checksum, producing_step, visibility |
| `Evidence` | Proof attached to a claim | claim_ref, kind, source_artifact, collected_at |
| `ChangeSet` | Proposed code change | branch, commits, diff_stat, target_repo |
| `PullRequest` | GitHub handoff | external_id, url, checks, review_state |
| `Decision` | Durable rationale record | question, options, chosen, rationale, superseded_by |
| `ConstitutionRule` | Org constraint | tier, statement, enforcement, verifier |
| `WorkflowPack` | Executable procedure | steps, required capabilities, evidence contract |
| `Connector` | External system adapter | capability contracts, tier, credential binding |
| `MemoryProposal` | Candidate learning | evidence[], prevalence, diff, gate_state |

## State Machines

### Goal Contract

| From | Event | To | Guard |
|---|---|---|---|
| `draft` | spec complete | `in_review` | all pass criteria have a verifier or explicit human-judged marking |
| `in_review` | approval cycle completes | `approved` | every approver the constitution requires for the requested capability tier, budget, and data scope has granted |
| `in_review` | changes requested | `draft` | — |
| `approved` | run launched | `active` | constitution version pinned; capability grants minted |
| `active` | amendment approved | `active` (new version) | prior version marked `superseded`; in-flight runs pause at checkpoint |
| `active` | all criteria satisfied and PR merged | `delivered` | merge observed in GitHub, not asserted by an agent |
| `active` | withdrawn | `cancelled` | outstanding grants revoked |

### Run

`queued → planning → executing → (blocked_on_approval | blocked_on_input | blocked_on_external) → executing → verifying → awaiting_review → (delivered | failed | cancelled)`

Every transition writes a checkpoint. `blocked_*` states carry a machine-readable reason, the identity of whoever can unblock, and the time in state — the signal that drives the review-capacity backpressure in [Planner / Executor / Verifier](#planner--executor--verifier-architecture).

### Approval

`requested → (granted | denied | expired) → resumed`

Approval is a **resumable runtime state**, not a chat interruption ([[managed-agents]]). A granted approval carries scope and expiry; it authorizes a specific step on a specific run at a specific contract version, and does not generalize to the next occurrence.

### ChangeSet → PullRequest

`drafting → self_verified → pr_open → checks_running → (changes_requested → drafting) → approved_by_codeowner → merged_externally`

The platform's terminal state is `pr_open` with evidence attached. `merged_externally` is **observed**, never performed.

### MemoryProposal

`drafted → evidence_attached → checks_passed → evaluated → (promoted | rejected | rolled_back)`

## Primary Journeys

### A. Non-technical idea to approved Goal Contract

1. Originator describes the idea in plain language, with screenshots, links, or a recording.
2. The platform interviews for the missing decidable facts — who it is for, what changes for them, what would make it wrong — rather than generating a spec from a one-line prompt.
3. It drafts a Spec and proposes **pass criteria**, marking each as automated or human-judged. Criteria that cannot be verified are surfaced as such rather than quietly accepted.
4. It states the required authority, data scope, and budget, in plain language with the technical grant shown alongside.
5. Every approver the constitution requires for the requested authority reviews, adjusts, and decides. When the cycle completes, the Goal Contract version is committed and becomes execution truth.

The interview step is the product's answer to the **audit gap**: it forces the real workflow into the artifact before any agent runs.

### B. End-to-end feature execution

1. Planner loads the pinned constitution, repo conventions, design-system constraints, and the selected workflow pack.
2. It produces a Plan of durable steps with explicit dependencies and side-effect classes.
3. Executor works step by step in an isolated workspace, with checkpoints between control transitions.
4. Verifier runs the pass criteria — tests, lint, type checks, and for UI work the visual and accessibility evidence in [UI Feature Evidence](#ui-feature-evidence).
5. Steps requiring authority beyond the contract's grants raise an Approval and the run enters `blocked_on_approval`.
6. On success, the platform opens a PR containing the diff, the Goal Contract reference, the evidence bundle, and the unmet-criteria list if any.
7. CODEOWNERS review and merge as normal. The platform observes the merge and closes the goal.

### C. Shared status query

Any employee asks, in natural language or through a saved view: what is in flight, what is blocked and on whom, what shipped, what does the roadmap look like, what did agents actually do, what did this cost. Answers are permission-filtered and evidence-linked ([Shared Status](#observability-and-the-shared-status-surface)).

### D. Approval

Approvers work a queue, not a notification stream. Each item shows the requested capability, blast radius, the contract clause requiring approval, the evidence gathered so far, and the cost of waiting. Batched review is the default because cold context reload is the expensive part ([[workflows]]).

### E. Recovery

A failed run resumes from its last checkpoint against the same contract version. A run blocked longer than its contract's tolerance escalates. A run whose contract was amended pauses and requires re-authorization rather than adopting new terms mid-flight.

## UX And Information Architecture

Surfaces, all views over one evidence graph rather than separate products:

- **Intake** — capture with attachments; deliberately low-ceremony.
- **Spec Studio** — the interview and the drafted Spec + pass criteria side by side; diffable across versions.
- **Goal Board** — goals by state, owner, and blocking reason.
- **Run Console** — step timeline, current state, checkpoints, tool calls, budget burn, artifacts, live evidence.
- **Approvals Inbox** — batched queue with blast radius and evidence.
- **Org Status** — the query surface, with saved views for UI, feature, codebase, roadmap, goals, Gantt, and tool use. These are **views**, not modules.
- **Artifact & Evidence Browser** — every artifact traceable to the step that produced it and the claim it supports.

Design rules, applying [[ai-interface-design]]:

- Calm operational density. This is a tool people return to daily to compare rows, resolve exceptions, and approve work — optimize for the tenth session.
- Every state gets deliberate UI: empty, loading, blocked, waiting-on-you, over-budget, failed, superseded, degraded.
- One primary action per region, so it is always clear what the interface expects.
- Provenance is visible where stakes are high: what the system read, what it assumed, what it inferred.
- Inferred content is labeled and revertible; semantic color is paired with text.
- Operator-facing history is translated into timestamp, actor, action, entity, details, evidence — never raw event payloads.

## Organization Constitution And Context System

The constitution is the org's rule surface. It is versioned, and every run pins the version it executed under, so a rule change never retroactively reinterprets a completed run.

Five placement tiers, applying the instruction-placement test from [[2026-07-25-claude-5-context-engineering-rules]]:

| Tier | Contains | Enforcement |
|---|---|---|
| **Constitution** | Org-wide invariants: what agents may never do, what always needs human authority, retention and residency rules | Schemas, capability registry, gates — not prose |
| **Repo conventions** | Non-obvious local gotchas, precedence rules, routing pointers | Repo instruction file, lint, tests |
| **Design system** | Tokens, components, usage rules, accessibility baselines | Pinned catalog version + automated checks |
| **Workflow pack** | Conditional procedures for a task class | Loaded on selection, not always-on |
| **Task reference** | This goal's specific intent: mockups, tests, examples, rubrics | Attached to the contract |

The load-bearing rule, from [[context-engineering]] and [[agent-harnesses]]: **soft guidance may live in prose; hard boundaries must live in schemas, permissions, and gates.** A constitution rule that cannot name its enforcement mechanism is a preference, and is labeled as one. This also prevents the constitution from becoming the prompt-sediment warehouse that [[internal-engineering-conventions]] and [[repo-local-knowledge-bases]] both warn against — durable knowledge is preserved without all of it becoming always-loaded instruction.

## Connector And Capability Model

A connector exposes **capabilities**, never raw API access. Each capability is a typed contract:

```
Capability
  name, connector, description
  input_schema, output_schema      # expressive: enums, invariants, consequences
  side_effect_class                # read | reversible_write | irreversible_write | financial
  idempotency                      # key strategy, or explicitly none
  scope                            # resources reachable
  credential_binding               # broker handle; never material
  approval_tier                    # always | above_threshold | never_auto
  rate_and_spend_ceiling
  audit_fields                     # what is recorded on every call
```

Connector tiers: **read-only** (auto-grantable within data scope), **write-with-approval** (default for reversible writes), **privileged** (irreversible or financial; always explicit, always logged, never inherited by a subsequent run).

Design constraints, from [[agent-tools]] and [[agent-security]]:

- Keep the model-facing surface small; absorb integration sprawl behind typed internal packages and brokers.
- Credentials live in a broker. The runtime receives scoped handles, never keys.
- Validate parameters on both sides of the call.
- Prefer capability-removing controls over friction-only controls.
- Untrusted external content (tickets, feedback, scraped pages) is read in a quarantined low-privilege stage; only structured summaries reach stages that can edit code or call privileged tools.

MCP is the default protocol for tool and context access ([[agent-protocols]]), with the caveat that discovery is not authority: servers, schemas, and descriptors are treated as a supply-chain and injection surface, filtered and authenticated rather than trusted because they resolved.

### GitHub Integration

GitHub is integrated as a **least-privilege GitHub App installation**, not broad OAuth or a personal access token. The reference design requests only: contents (write, on non-protected branches), pull requests (write), checks (read), metadata (read), and members (read, for CODEOWNER resolution). It does not request admin, org, or ruleset-modification scopes.

Preserved without exception: **rulesets, protected branches, required status checks, and CODEOWNERS.** The platform has no code path that bypasses, disables, or requests exemption from any of them. If a required check fails, the run reports it as unmet evidence; it does not retry the check into passing or seek an override. Merge is performed by a human through GitHub's normal flow.

### External Current-Landscape Note: Multica

Per [multica.ai/docs/how-multica-works](https://multica.ai/docs/how-multica-works), Multica is an open-source human-and-agent task collaboration system in which a server owns workspaces, issues, and the task queue while a local daemon drives installed coding CLIs on the developer's machine.

For this specification, Multica is relevant in two bounded roles:

1. an optional **task-source adapter** — issues and queue items as an inbound origin for Ideas or Goal Contracts;
2. an optional **execution-runtime adapter** — a way to dispatch a run's coding steps to locally installed CLIs.

It is explicitly **not** the control-plane foundation: the Goal Contract, approval state, capability grants, and evidence graph remain platform-owned regardless of which execution runtime is attached. It is also not a generic SaaS connector — the daemon-drives-local-CLI model has a materially different trust and residency profile from a hosted API connector, and it belongs in the [Build vs Buy](#build-vs-buy) evaluation for the execution substrate rather than in the connector catalog. This paragraph reflects external vendor documentation reviewed on 2026-07-27; it is not a KB source note, it is not counted in `source_count`, and nothing here has been independently verified against a running installation.

### External Current-Landscape Note: What Is Already Covered

The adjacent market is not empty, and a specification that ignores it will propose work that already exists.

Per Linear's official documentation ([Agents in Linear](https://linear.app/docs/agents-in-linear), [Linear Agent](https://linear.app/docs/linear-agent), [Linear MCP](https://linear.app/docs/mcp)), Linear already provides: **agents as first-class app users** with scoped permissions and org-level guidance for how they should behave; **project and issue context** delivered to those agents; **MCP access** to the workspace; **code intelligence** linking work to repositories; and **coding sessions** in which agents — including Claude Code and Codex — are delegated issues and report progress back into the tracker. Multica, per the note above, covers the complementary shape: a human-and-agent task board with local coding runtimes driving installed CLIs.

The consequence for this product is direct: **it must not compete as another issue tracker or another agent board.** That surface is occupied by vendors with better distribution and a several-year head start on the tracker itself. Rebuilding it would be the classic mistake of shipping the visible layer while the defensible layer goes unbuilt.

What is not covered by either, and is therefore this product's defensible kernel:

| Kernel capability | Why it is not already solved |
|---|---|
| **Approved, versioned Goal Contract** | Existing tools delegate *issues*; none make the authorization artifact itself a versioned, committed, re-approvable contract that is execution truth |
| **Organization constitution and capability authorization** | Agent permissions today are workspace-scoped app permissions, not an org rule surface with typed capability grants, tiers, and enforcement mechanisms |
| **System-of-record-preserving evidence graph** | Progress is reported *into* a tracker; there is no separate evidence graph that refuses to become a second writable master |
| **Durable planner/executor/verifier** | Coding sessions are session-shaped; checkpointed runs with independent verification and replay-safe side-effect boundaries are not the unit |
| **Permission-filtered shared status** | Tracker views are project-scoped; the cross-org, ABAC-filtered, confidence-labeled, evidence-linked status answer is a different query surface |
| **Governed memory dreaming** | No gated cross-run consolidation with evidence ledger, prevalence, evaluation, and rollback |
| **Model and runtime portability** | Coding sessions are bound to specific agent integrations; task-level routing with model-versioned context bundles is not offered |

This also sharpens the integration posture. Linear-class trackers are **connectors and roadmap systems of record** under the ownership matrix, not competitors, and Multica-class runtimes are **execution adapters**. The platform should read work from them, write references back through explicitly mapped fields, and keep the Goal Contract, capability grants, approval state, and evidence graph on its own side of the boundary regardless of which tracker or runtime is attached.

These are external vendor sources reviewed on 2026-07-27. They are not KB source notes, are not counted in `source_count`, and have not been independently verified against running installations. Vendor capability sets move quickly; this comparison should be re-checked before it is used to justify a build decision.

## Out-Of-Box Organization Bootstrap

The relevant workflows must be available out of the box, which means the platform ships the **setup workflow itself** rather than a configuration manual. Bootstrap is an admin-guided **durable run** — same run machinery, checkpoints, and approval gates as any other goal, so it can be paused, resumed, inspected, and audited. Its output is a set of **draft artifacts that are inert until an owner approves them.** Nothing the bootstrap discovers becomes active policy on its own.

### Stage 1 — Connect

Admin connects, each through the capability contract in [Connector And Capability Model](#connector-and-capability-model):

| System | Required? | Initial scope |
|---|---|---|
| **IdP** | Yes | Read-only: identities, roles, groups |
| **GitHub App** | Yes | Least-privilege install per [GitHub Integration](#github-integration) |
| **CI** | Yes | Read: check definitions and results |
| **Vault / credential broker** | Yes | Handle issuance only |
| **Project tracker** (Linear-class) | Optional | Read first; write only after field mapping is approved |
| **Design-system source** | Optional | Read-only: tokens, components, usage rules |
| **Execution runtime** (hosted sandbox or Multica-class local adapter) | Optional | Dispatch scope only |

### Stage 2 — Read-Only Discovery Scan

Strictly read-only. No writes, no branches, no issues, no comments. The scan inventories:

- repositories in scope, languages, build and test commands;
- existing agent/repo instruction files and their precedence;
- **CODEOWNERS**, rulesets, protected branches, required checks;
- design tokens, components, and usage rules from the pinned catalog;
- existing goals, issues, and roadmap records in the connected tracker;
- current tooling: linters, type checkers, test runners, preview/deploy, a11y and visual-regression setup;
- observable conventions and recurring footguns.

Discovery is where the **audit gap** is closed or reproduced. The scan reports what it could not determine as explicit unknowns rather than filling them with plausible defaults.

### Stage 3 — Draft Artifacts (Inert)

Every artifact is produced as a draft with its evidence attached — which file, which setting, which observation produced it — and each is independently acceptable, editable, or rejectable:

| Draft artifact | Contents |
|---|---|
| **System-of-record map** | Proposed owner for each fact class per [System-Of-Record Ownership](#system-of-record-ownership), flagging any detected two-master conflict |
| **Constitution rules** | Each with its **enforcement mechanism** named; anything unenforceable is labeled a preference, not a rule |
| **Repo profiles** | Per repo: conventions, verification commands, review requirements, risk class |
| **Design-system constraints** | Pinned catalog version, conformance rules, blocking vs advisory |
| **Workflow-pack suggestions** | Which packs fit observed work, and which observed work no pack covers |
| **Capability grants** | Proposed default tiers per connector and repo, deny-by-default |
| **Memory scopes and retention** | Proposed scopes, retention windows, redaction rules |
| **Model-versioned context bundles** | Per-model instruction bundles per [Multi-Model Portability](#multi-model-portability) |

### Stage 4 — Verify Before Activation

- **Connector permission tests.** Each granted capability is exercised at its declared scope, and each *denied* capability is probed to confirm it actually fails closed. A grant that cannot be demonstrated is not activated.
- **End-to-end dry-run Goal Contract.** A trivial, reversible goal runs the full pipeline — plan, execute, verify, open PR — in a sandbox repository or throwaway branch. It exercises the real path, then is torn down. Failure here blocks activation.
- **Boundary assertions.** The dry run confirms that required checks, rulesets, and CODEOWNERS cannot be bypassed, that the platform stops at `pr_open`, and that budget and data-scope ceilings hold.

### Stage 5 — Approve, Pin, Activate

Owners approve the draft artifacts — the security owner owns constitution and capability drafts, engineering owners own repo profiles and design-system constraints, the platform operator owns model bundles and memory scopes. On approval, versions are **pinned** and activation is recorded as an auditable event. Re-running bootstrap later produces a **diff against the pinned set**, never a silent overwrite.

## Planner / Executor / Verifier Architecture

A deterministic skeleton with model judgment inside it — the [[workflows]] and [[agent-harnesses]] position that orchestration belongs in code while ambiguous subproblems belong to the model.

**Planner.** Reads the contract, pinned constitution, conventions, design-system constraints, and pack. Emits a Plan of durable steps with dependencies, side-effect classes, required capabilities, and per-step verification. Plans are reviewable artifacts, not proofs of correctness.

**Executor.** Runs steps in an isolated workspace. Checkpoints before and after each control transition. Isolates non-deterministic and external work behind explicit boundaries so replay is safe. Never self-grants capability.

**Verifier.** Independent of the executor — the worker does not grade its own work. Runs the contract's pass criteria and produces evidence artifacts. For criteria marked human-judged, it assembles the evidence bundle and routes to a reviewer rather than asserting a verdict.

Cross-cutting controls:

- **Quarantine stage** for untrusted input before any privileged stage.
- **Review-capacity backpressure.** Concurrent runs are capped by available human review capacity, not by compute. Unbounded fan-out converts parallelism into an unreviewed queue or quietly lowered standards ([[2026-06-04-claude-code-dynamic-workflows-operating-patterns]], and the orchestration-tax framing in [[enterprise-agent-deployment-failure-modes]]).
- **Deterministic-first.** Every model call must justify itself against a cheaper deterministic or smaller-model alternative. Routing, lookups, arithmetic, status transitions, and permission checks are code.

## Authorization, Approvals, And Least Agency

From [[agent-security]] and [[2026-05-31-zero-trust-ai-agents-kb-upgrades]]:

- Each agent instance carries a **cryptographic identity**, propagated through logs, tool calls, and incident traces.
- **Short-lived scoped credentials** from the broker; no static keys or shared service accounts in agent-reachable processes.
- **Least agency**, not merely least privilege: constrain what a capability can do, how often, where, and under whose delegated authority.
- **Human authority is non-delegable** for merge, deploy, production data mutation, external communication, spend above threshold, and constitution changes.
- Approvals are scoped, expiring, and non-generalizing.
- Every authorization decision is logged with enough identity context to reconstruct an incident.
- **Reconciliation:** observed side effects are compared against the approved-and-executed audit record. Divergence is an incident, not a log line.

## Durable Execution

Applying [[durable-execution]]:

- Explicit run identity separate from conversation identity.
- Checkpointed workflow state, not chat history, as the resume substrate.
- Replay-safe boundaries around every external call; idempotency keys where the capability supports them.
- Pause/resume as a product feature — approval waits, input waits, and external waits are normal states.
- Reconnectable event streams so clients reattach to live runs without losing execution context.
- Lifecycle controls: status, cancel, schedule, inspect, wake.
- Workspace snapshots kept **separate** from workflow state, so compute state is never the only durability record.
- Every run ends by recording what passed, what is blocked, what changed, and the exact next step — the restartability discipline from [[2026-06-04-learn-harness-engineering-kb-upgrades]].

## Memory And Governed Consolidation

Two speeds, following [[2026-07-25-agent-memory-dreaming-production-pattern]].

**Fast path (in-band).** A run writes scoped memory within its own data scope: what worked in this repo, which convention applied, which verification caught what. Immediately available to the next run in the same scope.

**Slow path (governed consolidation).** A scheduled job over permission-matched evidence:

1. freeze the input store version and clone it into a candidate;
2. select only transcripts whose tenant, role, project, and data scope match the target store — availability is not authority;
3. preserve full traces, including tool calls, errors, retries, and configuration;
4. fan out bounded review, aggregate at one decision point, estimate prevalence;
5. emit **typed proposals** with an evidence ledger: supporting runs, representative excerpts, prevalence, expected benefit;
6. run deterministic checks — schema, links, permissions, secrets/PII, injection indicators, content-hash preconditions;
7. evaluate the candidate against representative tasks, deliberately including rare and minority workflows;
8. promote or reject through the configured human gate, retaining prior versions and rollback state.

The control split is fixed: **agents propose semantic changes; the platform deterministically owns versioning, attribution, concurrency, permissioning, rollback, and promotion.** No background job writes directly to shared memory. Guarded failure modes: permission laundering, poison amplification, frequency bias erasing rare-but-important exceptions, unmeasured rewrite churn, and false consensus from duplicated upstream defects.

### Consolidation Setup And Activation

The setup is **automated out of the box; promotion stays governed.** The platform scaffolds and operates this workflow — the admin authorizes scopes and promotion policy, and never has to assemble the pipeline by hand. This continues the bootstrap run as a later, separately-approved stage rather than a distinct product.

Configured during bootstrap (drafted, inert until approved):

| Setting | Default posture |
|---|---|
| **Eligible trace scopes** | Permission-matched to the target memory store — tenant, role, project, user. Availability is never authority |
| **Retention and redaction** | Bounded retention; secrets and PII redacted before the job sees a trace, not after |
| **Minimum evidence threshold** | A floor on volume *and* distinct-run diversity before the first consolidation may run at all |
| **Pre-consolidation eval baseline** | Captured before any candidate exists, deliberately including rare and minority workflows so frequency cannot become the only objective |
| **Cost and frequency ceilings** | Max spend per pass, max passes per period; exceeding a ceiling pauses rather than truncating silently |
| **Triggers** | Scheduled cadence plus event triggers (repeated failure class, repeated correction, convention drift) |
| **Promotion policy** | Which changes need which approver; deny-by-default for anything touching constitution-adjacent memory |
| **Canary scope** | Which repo or team receives a promoted store first |

**Dormant by default.** Until the evidence threshold is met, the job is configured but does not run, and the UI says so plainly — "dormant: insufficient evidence (N of M runs)" — rather than showing a healthy-looking scheduled job that silently produces nothing. A system with too little evidence to learn safely should say so, not manufacture lessons from noise.

Each pass then follows the gated path already specified above: clone the store, attach the evidence ledger, run deterministic checks, evaluate against the pre-recorded baseline, and stop at the human gate. **The job never auto-writes shared memory** — its output is always a candidate plus a diff.

Post-gate controls: promoted stores land in the **canary scope** first and are compared against the baseline before wider rollout; **rollback** to any prior attributed version is one action and is itself audited; **pause and disable** are always available to the platform operator and take effect before the next pass rather than at the end of the current one.

Nothing here asserts that any vendor ships this as a packaged product. It is the governed batch-consolidation architecture documented in [[2026-07-25-agent-memory-dreaming-production-pattern]], specified as a setup flow.

## Observability And The Shared Status Surface

Trace model, following [[agent-observability]] and the OpenTelemetry GenAI conventions: root the trace in the originating request or schedule; make the run a parent operation containing model, retrieval, tool, approval, and handoff spans; give every run, step, tool call, artifact, and state mutation a stable identity; correlate retrieval evidence with the step that consumed it and the action it influenced; preserve causal order across async work.

Content policy is **metadata-first**. Prompts, responses, tool arguments, and retrieved documents are sensitive payloads. Structural metadata and correlation IDs by default; content capture only per-field, per-environment, per-tenant, under explicit purpose, access, and retention rules. The exporter is never a side channel around tool authorization or residency policy.

### Shared Status Answers

Every status answer — natural-language or saved view — carries four properties:

1. **Permission-filtered.** RBAC and ABAC are applied at query time against the asker's identity, resolved from the org IdP. Two people asking the same question receive different, correct answers. There is no "summary view" that leaks what the reader may not read, and absence is not distinguishable from denial in a way that leaks existence.
2. **Timestamped.** Every answer states as-of time and the freshness of each underlying projection.
3. **Confidence-labeled where inferred.** Observed facts (run state, check result, merge event) are unlabeled. Inferred ones (estimated completion, likely blocker, roll-up progress) are explicitly marked as inferred with their basis.
4. **Evidence-linked.** Every claim links to the artifact, run, step, PR, or approval that supports it. A claim with no linkable evidence is not rendered as a fact.

Saved views: UI surface state, feature status, codebase change flow, roadmap, goals, Gantt, tool use, and cost. All are projections of the same graph, so they cannot disagree.

## UI Feature Evidence

For any goal touching user interface, the following are **first-class run artifacts** and are attached to the PR handoff — not optional extras:

| Evidence | Produced by | Attached as |
|---|---|---|
| **Preview deployment** | Deploy-preview capability | URL + commit SHA + expiry |
| **Screenshots** | Headless capture per changed surface | Images, per breakpoint and theme |
| **Visual regression diff** | Baseline comparison | Diff images + changed-pixel summary + baseline ref |
| **Accessibility report** | Automated a11y run | Violations by severity, with node references |
| **Design-system conformance** | Token/component check against pinned catalog | Pass/fail per rule, with offending selectors |
| **Reduced-motion check** | Automated | Pass/fail |

A UI pass criterion without at least one of these is treated as human-judged, and the reviewer is told so explicitly. This operationalizes the [[ai-interface-design]] point that AI-built UI improves when taste is expressed as measurable constraints — named tokens, exact durations, state names, accessibility behavior — rather than adjectives, and the design-system calibration guidance in [[2026-05-30-app-template-design-system-blueprint]] and [[2026-05-30-component-theme-source-library]].

## Multi-Model Portability

- **Task-level routing.** Each step declares its capability need; the router picks a model. Swapping a model does not rewrite a workflow pack.
- **Model-versioned context bundles.** A reduced instruction set proven on a capable model is not assumed safe on a weaker one. Bundles are versioned by model capability, per [[2026-07-25-claude-5-context-engineering-rules]].
- **Interface-first.** Behavior is carried by expressive schemas, enums, and invariants rather than example-heavy prose, so contracts survive provider changes.
- **Per-model evaluation before promotion**, including tail-risk cases: destructive operations, security boundaries, and repo-specific gotchas — not only average task quality. Tool-call structure and end-state correctness are both tested, following the distinction between call-level and workflow-level tool evaluation in [[2026-04-12-berkeley-function-calling-leaderboard-v4]] and [[2026-07-22-tau2-bench-v1-0-1]].
- **Model lifecycle is normal operating condition.** Inventories, regression evals, and deprecation migration plans are platform features.

## Data, Security, And Privacy

- Single-tenant isolation per organization in v1; data scope is a contract field, enforced at query and tool boundaries.
- Residency and retention are constitution rules with deterministic enforcement.
- Secrets never enter agent-reachable processes; the broker holds material.
- Redaction happens before export, not only in the observability backend.
- Memory carries source attribution, integrity validation, retention limits, quarantine, and rollback.
- Untrusted content is quarantined before any privileged stage.
- Operator access to sensitive traces is separated from developer access and is itself logged.
- Trace reuse for evaluation requires its own consent and review gate — observing production is not the same as training on it.

## APIs And Events

Resources: `/ideas`, `/specs`, `/goal-contracts`, `/goal-contracts/{id}/versions`, `/plans`, `/runs`, `/runs/{id}/steps`, `/runs/{id}/events`, `/approvals`, `/capabilities`, `/grants`, `/artifacts`, `/evidence`, `/changesets`, `/pull-requests`, `/constitution`, `/packs`, `/connectors`, `/memory-proposals`, `/status/query`.

Event catalog (at-least-once, with idempotency keys): `idea.captured`, `spec.drafted`, `contract.submitted`, `contract.approved`, `contract.amended`, `run.started`, `run.checkpointed`, `run.blocked`, `run.resumed`, `step.completed`, `step.failed`, `capability.granted`, `capability.denied`, `approval.requested`, `approval.decided`, `artifact.produced`, `evidence.attached`, `verification.passed`, `verification.failed`, `changeset.pr_opened`, `pr.checks_completed`, `pr.merged_observed`, `budget.threshold_crossed`, `memory.proposal_drafted`, `memory.proposal_promoted`, `goal.delivered`.

Streaming is reconnectable by event ID so a client can reattach to a live run without replaying from the start.

## Acceptance Criteria

Platform-level criteria for calling the product real:

1. A non-technical employee completes idea → approved Goal Contract without engineering help.
2. Every executed action traces to a capability grant in an approved contract version.
3. No run can merge, deploy, or bypass a required check, ruleset, or CODEOWNER — verified by adversarial test, not by policy statement.
4. A killed run resumes from checkpoint against the same contract version with no duplicated side effects.
5. Status answers are permission-filtered, timestamped, confidence-labeled where inferred, and evidence-linked — verified by a differential test across two identities.
6. UI goals produce the full evidence set in [UI Feature Evidence](#ui-feature-evidence) before reaching `awaiting_review`.
7. No memory promotion occurs without evidence ledger, deterministic checks, evaluation, and the configured gate.
8. Reconciliation finds no divergence between observed side effects and the approved-and-executed audit record.
9. A model swap at the routing layer requires no workflow-pack change.
10. Every constitution rule names its enforcement mechanism or is labeled a preference.
11. **Bootstrap cannot activate without verification.** Every granted capability is demonstrated at its declared scope and every denied capability is demonstrated to fail closed; the end-to-end dry-run Goal Contract completes in a sandbox or throwaway branch, reaches `pr_open`, and proves that required checks, rulesets, and CODEOWNERS cannot be bypassed. A failed permission test or dry run blocks activation, and no bootstrap draft becomes active policy without a named owner's approval.
12. **Consolidation stays dormant until it has earned the right to run.** Below the configured evidence threshold the job does not execute and reports itself dormant with the shortfall stated; above it, no promotion reaches the shared store without evidence ledger, deterministic checks, evaluation against the pre-recorded baseline including rare workflows, and the human gate. Every promotion lands in the canary scope first, is rollback-tested to a prior attributed version, and can be paused or disabled before the next pass. Verified by an adversarial test that the job cannot write shared memory directly under any configuration.

Per-goal criteria live in the contract. Each is `automated` (with a named verifier) or `human` (with an evidence bundle). A goal cannot reach `approved` with a pass criterion that is neither.

## Failure Modes And Recovery

| Failure | Detection | Recovery |
|---|---|---|
| Contract amended mid-run | Version check at checkpoint | Pause; require re-authorization |
| Verifier passes, reviewer rejects | Review outcome | Criterion was wrong; amend contract, record Decision |
| Approval queue saturates | Blocked dwell time, queue depth | Backpressure: cap concurrent runs; batch and escalate |
| Prompt injection via ticket or scraped page | Quarantine stage, egress checks | Privileged stages see only structured summaries; incident on divergence |
| Connector schema drift | Contract validation failure | Fail closed; pack marked degraded |
| Budget exhaustion | Ceiling crossed | Pause at checkpoint; request extension with spend-to-date |
| Model deprecation | Inventory monitor | Route to fallback; run regression evals before promotion |
| Design-system version drift | Pinned catalog mismatch | Conformance check fails; surface upgrade as its own goal |
| Memory poisoning | Prevalence and injection checks; eval regression | Reject proposal; roll back; quarantine source evidence |
| Two writable masters | Sync reconciliation | Platform defers to the system of record; projection rebuilt |
| Silent quality drift | Outcome metrics + tail-risk evals | Roll back the changed surface; add the case to the eval set |

## Metrics

**Value:** idea → approved-contract latency; approved-contract → merged-PR latency; first-pass PR acceptance rate; rework rate after merge; percentage of goals originated by non-technical employees.

**Health:** blocked-run dwell time by reason; approval queue depth and age; checkpoint-resume success rate; verification pass rate before human review; reconciliation divergence count.

**Cost:** cost per delivered change; human review minutes per change; token and compute spend per goal; consolidation cost against avoided retries.

**Safety:** denied-capability rate; injection quarantine hits; audit-reconciliation gaps; time to detect a policy violation.

The trap to avoid, from [[enterprise-agent-deployment-failure-modes]]: measuring model quality or usage instead of workflow outcome. Human review and correction time count as cost.

## MVP And Phasing

**Phase 0 — Kernel (prove the spine).** The bootstrap run itself — connect, read-only discovery, draft artifacts, permission tests, dry-run Goal Contract, approve and pin — limited to IdP, GitHub App, CI, and vault. Then intake, Spec Studio, Goal Contract with versioning and approval, one workflow pack (small feature change in one repo), durable runs with checkpoints, capability registry, approvals inbox, evidence graph, PR handoff, permission-filtered status over a small view set. *Excluded:* memory consolidation, multi-repo, roadmap sync, model routing.

**Phase 1 — Packs and surfaces.** Bootstrap extended to tracker, design-system, and execution-runtime connectors, with re-run producing a diff against the pinned set. UI-change pack with the full visual/a11y evidence set, bugfix and doc packs, multi-repo scope, roadmap connector as reference sync, Gantt projection, richer status queries, review-capacity backpressure. *Excluded:* consolidation, cross-tenant.

**Phase 2 — Learning and portability.** Governed memory consolidation with human gate, canary, and rollback — deliberately last, because it needs accumulated run evidence and a stable eval baseline that Phases 0 and 1 produce. Its scopes, thresholds, ceilings, and promotion policy are drafted during bootstrap but stay dormant until then. Plus model routing and versioned context bundles, per-model tail-risk eval suites, org-authored packs, connector SDK. *Excluded:* multi-tenant hosting.

Each phase states what it excludes, so "not yet built" is never mistaken for "covered."

## Build vs Buy

| Component | Recommendation | Rationale |
|---|---|---|
| Durable workflow engine | **Buy/adopt** | Checkpointing, replay, and event waits are mature; rebuilding is undifferentiated |
| Tracing and metrics | **Buy/adopt** | OpenTelemetry GenAI conventions give portable structure |
| Identity and secrets | **Buy** | IdP + vault; never rebuild |
| VCS, CI, code review | **Buy** | GitHub; the platform integrates, never replaces |
| Design-system source | **Buy/reuse** | Pin the org's catalog; do not author |
| Model access and routing | **Buy + thin layer** | Providers plus an owned task-level router |
| Execution runtime for coding steps | **Evaluate** | Hosted sandboxes vs local-daemon-driven CLIs (see the Multica note); trust and residency profiles differ materially |
| Goal Contract, capability registry, evidence graph, status query | **Build** | This is the product |
| Workflow packs | **Build kernel packs; enable org-authored** | Domain fit cannot be bought generically |

## Risks And Open Decisions

**Risks.** Approval saturation making the platform the bottleneck it was meant to remove. Constitution sediment — rules accumulating past what anyone follows or enforces. Evidence theater, where artifacts exist but nobody reads them. Non-technical originators writing unverifiable pass criteria. Connector sprawl reintroducing agent sprawl inside the platform. Trust collapse from one bad merge, which is why merge authority never moves. Cost opacity at fleet scale.

**Open decisions.**

1. Should the Goal Contract live in the target repo or a governance repo when a goal spans several repositories?
2. What is the default review-capacity cap, and should it be per-team or per-approver?
3. Should roadmap sync ever write back, or remain read-only until a specific field mapping is demanded?
4. How much design-system conformance should be blocking versus advisory?
5. What is the minimum evidence set for a human-judged criterion to be accepted?
6. Does the execution runtime evaluation favor a hosted sandbox or a local-daemon model, and does that change the residency story enough to matter to security review?
7. How is a constitution rule retired once its enforcement mechanism is superseded?

## Evidence Basis And Speculation Boundary

**Evidence-backed architectural patterns** — drawn from the KB sources listed below, and reusable independent of this product:

- Durable execution as explicit runs, checkpoints, replay-safe boundaries, and resumable approvals.
- The managed-agents separation of session, run, harness, sandbox, credential broker, and store.
- Deterministic orchestration around model judgment, with review capacity as a modeled constraint.
- Zero-trust agent controls: cryptographic identity, short-lived scoped credentials, least agency, protected memory.
- Two-speed memory with governed, evidence-bearing, gated consolidation.
- Trace structure correlating request → agent → model → tool → artifact, with metadata-first content policy.
- Constraint budgeting and instruction placement: hard boundaries in schemas and gates, soft guidance in prose.
- The enterprise diagnosis that AI value is blocked by workflow fit, substrate, and governance rather than model capability.

**Product speculation** — my design choices, not established by any source: the Goal Contract as a committed versioned artifact; the specific kernel/pack boundary; the five-tier constitution model; the exact state machines and event catalog; the four-property status-answer contract; the UI evidence table; the phasing; the metric set; the build-vs-buy calls. These are reasoned from the patterns above but are untested.

**Calibration cautions.**

- The dreaming performance figures circulating from the source talk (error-rate, cost, latency, and verification-time improvements) are **self-reported, anonymized customer outcomes with undisclosed sample size, baseline, task definition, and evaluation design.** They are directional evidence that production memory can pay for itself. They are not benchmarks, they do not transfer to a new system, and nothing in this spec should be read as promising them.
- The "over 80% system-prompt reduction without measurable coding-eval loss" result is an official but under-specified internal practitioner claim about a specific product on specific model generations. It supports constraint budgeting; it does not license deleting safety or authorization controls.
- The enterprise-failure evidence base is survey and consultancy research with known incentive and measurement limits. It is strong on direction, weak on effect size.
- The Multica, Linear, and GitHub App descriptions are vendor and platform documentation reviewed on 2026-07-27. None has been independently verified against a running installation, and the competitive-positioning conclusions drawn from them are current-landscape judgments with a short shelf life.
- No part of this specification has been implemented or evaluated. `review_status: draft` is deliberate.

## Source Notes

- [[2026-06-22-lamis-mukta-learning-while-you-sleep-beyond-memory-to-dreaming]]
- [[2026-07-24-the-new-rules-of-context-engineering-for-claude-5-generation-models]]
- [[2026-05-27-zero-trust-for-ai-agents]]
- [[2026-04-09-scaling-managed-agents-decoupling-the-brain-from-the-hands]]
- [[2026-05-28-agent2agent-a2a-protocol-v1-0-1]]
- [[2026-07-25-opentelemetry-generative-ai-semantic-conventions]]
- [[2026-04-12-temporal-ai-cookbook]]
- [[2026-04-12-langgraph-durable-execution-persistence-and-human-in-the-loop]]
- [[2024-12-19-building-effective-agents]]
- [[2026-05-24-the-orchestration-tax]]
- [[2026-06-04-walkinglabs-learn-harness-engineering]]
- [[2026-06-03-lessons-from-building-claude-code-how-we-use-skills]]
- [[2026-06-03-dynamic-workflows-claude-code-ingest]]
- [[2026-05-01-skills-as-verifiable-artifacts]]
- [[2025-07-01-the-genai-divide-state-of-ai-in-business-2025]]
- [[2024-08-13-rand-root-causes-ai-project-failure]]
- [[2026-04-14-dive-into-claude-code-the-design-space-of-todays-and-future-ai-agent-systems]]
- [[2026-05-27-conformis]]
- [[2026-05-27-aya]]
- [[2026-06-11-building-good-vertical-agent]]
- [[2026-04-10-model-context-protocol]]
- [[2026-07-22-tau2-bench-v1-0-1]]
- [[2026-04-12-berkeley-function-calling-leaderboard-v4]]
- [[2026-05-09-durable-orchestration-agent-patterns-user-provided]]
- [[2026-06-17-carbon-design-system]]
- [[2026-05-20-steward]]

## External Sources (Not KB Source Notes)

These were consulted directly and are **not** part of `source_count`. They have no source note in `raw/` and have not been independently verified.

- Multica — "How Multica Works": <https://multica.ai/docs/how-multica-works> (reviewed 2026-07-27)
- Linear — "Agents in Linear": <https://linear.app/docs/agents-in-linear> (reviewed 2026-07-27)
- Linear — "Linear Agent": <https://linear.app/docs/linear-agent> (reviewed 2026-07-27)
- Linear — "Linear MCP": <https://linear.app/docs/mcp> (reviewed 2026-07-27)
- GitHub — "Choosing permissions for a GitHub App": <https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/choosing-permissions-for-a-github-app?apiVersion=2022-11-28> (reviewed 2026-07-27)

## Related

- [[agent-harnesses]]
- [[managed-agents]]
- [[durable-execution]]
- [[workflows]]
- [[agent-protocols]]
- [[agent-security]]
- [[agent-tools]]
- [[agent-skills]]
- [[agent-memory]]
- [[agent-observability]]
- [[context-engineering]]
- [[enterprise-agent-deployment-failure-modes]]
- [[ai-agent-evals]]
- [[ai-interface-design]]
- [[internal-engineering-conventions]]
- [[repo-local-knowledge-bases]]
- [[claude-code]]
- [[multi-agent-systems]]
- [[2026-07-25-agent-memory-dreaming-production-pattern]]
- [[2026-07-25-claude-5-context-engineering-rules]]
- [[2026-05-31-zero-trust-ai-agents-kb-upgrades]]
- [[2026-06-04-claude-code-dynamic-workflows-operating-patterns]]
- [[2026-06-04-learn-harness-engineering-kb-upgrades]]
- [[2026-05-30-app-template-design-system-blueprint]]
- [[2026-05-30-component-theme-source-library]]
- [[2026-05-30-backend-stack-patterns-blueprint]]
- [[2026-05-27-aya-conformis-internal-codebase-patterns]]
- [[2026-05-25-uniswap-interface-ui-ux-source-teardown]]
- [[2026-06-03-claude-use-cases-workflow-map]]
- [[2026-05-09-durable-orchestration-background-agents-kb-upgrades]]
