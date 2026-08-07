---
id: concept-claude-code
type: concept
title: Claude Code
tags: [claude-code, agentic-coding, skills, hooks, subagents, workflows, html-artifacts]
source_count: 19
summary: Claude Code is best understood as an agentic coding operating environment with explicit surfaces for permissions, context management, tool orchestration, hooks, MCP tools, skills, delegated work, append-oriented session state, reviewable collaboration artifacts, and practical product-building workflows.
canonical_for: [claude code, agentic coding, claude code hooks, claude code subagents, claude code skills]
review_status: reviewed
last_reviewed: 2026-08-07
review_due: 2026-09-12
confidence: "0.90"
---

# Claude Code

## Summary

Claude Code is best understood as an agentic coding operating environment rather than a single chat loop. The strongest sources converge on a few stable surfaces: permission handling, verification loops, context management, tool orchestration, hooks, MCP-based tool access, reusable skills, deliberate delegation to subagents, and rich artifacts for human review. The newer teardown-style source sharpens the runtime picture further: quality comes less from a single giant prompt than from a harness with evented control flow, cache-aware context assembly, explicit recovery logic, and bounded delegated work. The arXiv design-space study adds a more formal lens: Claude Code gives the model broad local judgment inside a deterministic harness that enforces policy, manages context, preserves auditability, and keeps the human in authority. The business-strategy transcript adds a practical product-building lens: Claude Code can help mine mechanisms, write simulations, and implement features, but market selection, feasibility filtering, and pricing remain human-owned judgment. The Van Horn practitioner digest adds the operator-stack version: plan artifacts, voice input, parallel terminal sessions, raw context, Codex handoffs, and human taste form a repeatable working loop around the runtime. Matt Pocock's skills repo adds the craft-operating version: reusable skills should encode feedback loops, domain-language checks, issue-tracker contracts, and architecture review language, while project setup skills should remain separate from ordinary task skills. Anthropic's internal skills article sharpens Claude Code's extension model: skills are one of the most-used extension points, and the highest-leverage ones often package product verification, gotchas, scripts, setup state, on-demand hooks, and marketplace distribution rather than prose alone. The Dynamic Workflows digest adds a new orchestration surface: for broad, parallel, adversarial, or long-running work, Claude Code can move from one chat loop into a model-written workflow harness that coordinates subagents and verification steps outside the main context. Anthropic's Claude 5 context-engineering article adds the model-generation migration: Claude Code reportedly removed over 80% of its system prompt for Opus 5 and Fable 5 without measurable coding-eval loss, relying more on local judgment, expressive interfaces, deferred tools, skills, auto-memory, and rich references. Geoffrey Litt's talk and `explain-diff` skill add a human-capability surface: background-first explainers, retrieval or transfer questions, and selective micro-worlds can check whether the accountable human still understands agent-written code well enough to participate in the next design loop, not merely approve the current diff.

## Core Surfaces

- permissions and approval policies determine how much autonomy is safe in a given repository or runtime
- context management keeps long sessions from degrading as tasks accumulate weight
- tool orchestration decides what can run in parallel, what must serialize, and how large results should be represented back to the model
- the runtime loop is evented and streaming rather than a blocking request-response wrapper
- hooks automate repeated checks, policy enforcement, and dynamic context injection
- skills package reusable tactics and project conventions beyond one-off prompt text
- skills can be folders with instructions, references, scripts, assets, configuration, state, and hooks rather than standalone prompt files
- MCP tools expose structured external capabilities without hard-coding them into prompts
- subagents create parallel or fresh-context workstreams when the main session would become overloaded; they run inside the session and return a summary to the caller
- agent teams are a separate, coarser surface: independent sessions with peer-to-peer messaging and a shared task list, priced at one full instance per teammate, and currently experimental and disabled by default
- skills and subagents are orthogonal rather than opposed: a skill can run in isolated context with `context: fork`, and a subagent can preload named skills through its `skills:` field, so content reuse and execution isolation are separate choices
- dynamic workflows create task-specific orchestration scripts for long-running, parallel, or adversarial work where a single context window is the bottleneck
- HTML artifacts can serve as richer review surfaces for specs, diffs, prototypes, reports, and one-off editing interfaces when Markdown would hide structure or interaction
- understanding artifacts can teach the relevant system, establish intuition before implementation detail, and test retrieval or transfer separately from machine correctness checks
- plan artifacts can become the handoff boundary between research, execution, verification, and fresh sessions
- auto-memory provides a separate cross-session context surface, reducing pressure to turn `CLAUDE.md` into a mixed repo-instruction and personal-memory store
- `claude doctor` / `/doctor` provides a product-level path for auditing and rightsizing repo instructions and skills

## Design Lens

- the central architecture question is not "how smart is the model?" but where model judgment stops and deterministic harness responsibility begins
- permissions are a product surface for human authority and safety, not just a security wrapper around shell access
- context management, deferred tool loading, skills, hooks, and MCP form a layered extension stack with different context costs
- append-oriented transcripts and session artifacts favor resume, fork, rewind, and audit over direct query power
- Claude Code's repository-scoped CLI design should not be treated as the universal agent architecture; persistent gateways such as OpenClaw move trust, memory, and extension boundaries outward

## Practical Patterns

- give the agent clear ways to verify work with tests, linting, and file inspection
- keep repo instructions short, durable, and operational instead of writing giant prompt manifests
- treat repo instructions as behavioral controls for observed failure modes; keep rules that prevent real mistakes and avoid turning self-reported metrics into canonical evidence
- keep the most stable prompt sections cache-friendly and inject volatile context as late as possible
- use cheap-first compaction and only escalate to summarization or collapse when lighter tactics fail
- classify tools by concurrency and side-effect risk at definition time rather than improvising per turn
- treat retries, context overflow, and auth failures as explicit loop states with tailored recovery paths
- encode recurring team rules into hooks or skills when they should be enforced repeatedly
- invest in verification skills when quality regressions are expensive; Anthropic reports these had the most measurable internal quality impact
- use on-demand hooks for temporary high-friction safeguards such as destructive-operation blockers or edit freezes
- distribute skills as repo-local `.claude/skills` for small teams, and prefer plugin marketplaces with setup flows as skill count and team size grow
- treat skill usage telemetry as part of the operating loop so under-triggering or stale skills are visible
- delegate breadth-first research and bounded side tasks, not the critical path by default
- treat permissions and sandboxing as product surfaces, not as annoying interruptions around “real” work
- use HTML artifacts for dense visual or interactive collaboration, while keeping durable canonical knowledge in more diffable source formats when long-term maintenance matters
- trigger code explainers by cognitive-debt risk rather than diff size alone; bind them to a commit or diff range and refresh them when the explained state changes
- require the human to answer retrieval, prediction, or teach-back questions when comprehension is a review precondition; the agent must not certify the human's understanding on the human's behalf
- use micro-worlds for stateful, spatial, temporal, concurrent, or migration behavior only when interaction reveals a model that a trace, table, or static diagram does not
- for commercial product work, use Claude Code to generate options, simulations, and implementation scaffolding, then test against domain data and business metrics before treating a mechanism as real
- keep repository instructions portable enough that the team can move between coding models when cost, rate limits, or capability change
- for non-trivial work, use a plan-first loop only when the plan creates checkable criteria and reusable context, not as ceremony
- use parallel Claude/Codex sessions as throughput tools only when the human can still inspect the critical path and reject low-quality work
- raw transcripts, screenshots, issue URLs, and prior plans can be better pre-plan context than premature summaries, provided the agent is asked to extract against concrete acceptance criteria
- install broad workflow skills only when their repo setup assumptions match the project; otherwise adapt the useful procedure into the local `AGENTS.md` and KB conventions
- use a dedicated diagnosis skill for bugs and regressions so the agent constructs a repro loop before editing
- use dynamic workflows when the task needs fan-out, adversarial verification, loop-until-done behavior, tournament comparison, or model routing; keep ordinary edits in a normal session
- set hard goals and token budgets for workflow runs so the generated harness does not expand silently
- quarantine untrusted tickets, bug reports, scraped content, and user feedback in read-only workflow stages before any privileged actor agent sees the result
- keep `CLAUDE.md` lightweight: state repository purpose briefly, prioritize non-obvious gotchas, omit facts visible in the filesystem, and route specialized verification to skills
- remove duplicate tool guidance from the system prompt when the tool description or schema is the authoritative interface
- prefer local-fit criteria such as surrounding comment density, naming, and idiom over global stylistic prohibitions that are false for legitimate tasks
- treat context simplification as a model-versioned migration with representative and tail-risk evaluation, not as a universal deletion pass
- use code, tests, HTML artifacts, mockups, and rubrics as task references when they carry intent more precisely than a prose plan
- when an instruction addresses a recurring observable failure, ask whether architecture, types, lint, tests, a synchronization script, or a lifecycle hook can enforce it before adding more `CLAUDE.md` prose
- use stop or tool-lifecycle hooks for deterministic checks only when their frequency matches the cost; keep semantic review in a separate, scoped verifier or fresh pull-request context
- treat command allow/deny rules as workflow guidance, not containment; autonomous sessions should be unable to reach production credentials, unrelated databases, or repository authority by construction
- do not assume bypassed permissions erase the rule layer: deny rules and explicit ask rules apply in every mode, only allow rules go inert, and a `PreToolUse` hook adds a programmable check whose decision still cannot override a deny or ask rule
- treat auto memory as the auditable home for cross-session learnings: machine-local markdown, a bounded index loaded per session, and readable, editable, and deletable through `/memory`, which is what an agent-written "self-improving" knowledge store should look like before it is trusted

## Tensions

- autonomy vs approval fatigue
- reusable automation vs repo-specific local judgment
- deep single-thread context vs parallel subagent decomposition
- prompt guidance vs harness-enforced behavior
- short-term capability amplification vs long-term human understanding and codebase coherence
- Markdown durability and clean diffs vs HTML readability, visual density, and interaction
- Claude Code team practitioner claims vs empirical evidence; HTML artifact guidance is high-signal practice, not controlled proof
- provider-specific Claude Code surfaces vs model-agnostic workspace setup for teams that need to hot-swap coding agents
- permission-bypass speed vs zero-trust, credential scope, auditability, and human review capacity
- upstream skill convenience vs local instruction-schema coherence
- repo-local skill convenience vs marketplace distribution, setup flows, versioning, and context overhead
- dynamic-workflow power vs token cost, admin availability, auditability, and exact API/menu stability in a research-preview feature
- Claude 5 prompt simplification vs compatibility with older or third-party models that may still need explicit guidance
- auto-memory convenience vs provenance, scope, hidden-state, and conflict visibility
- richer references vs the diffability and long-term maintainability of simpler canonical formats
- automated correctness vs the human understanding needed for follow-on product and architecture decisions
- rich explainer generation vs review latency, artifact staleness, quiz gaming, and prompt-injection exposure from untrusted diffs

## Source Notes

- [[2026-04-14-dive-into-claude-code-the-design-space-of-todays-and-future-ai-agent-systems]]
- [[2025-04-18-claude-code-best-practices-for-agentic-coding]]
- [[2026-04-06-how-and-when-to-use-subagents-in-claude-code]]
- [[2025-12-11-claude-code-power-user-customization-how-to-configure-hooks]]
- [[2025-11-13-skills-explained-how-skills-compares-to-prompts-projects-mcp-and-subagents]]
- [[2025-11-12-improving-frontend-design-through-skills]]
- [[2025-07-23-how-anthropic-teams-use-claude-code]]
- [[2026-04-17-claude-code-agent-complete-architecture-deep-dive-source-code-analysis]]
- [[2026-05-08-using-claude-code-the-unreasonable-effectiveness-of-html]]
- [[2026-05-09-mnimiy-claude-md-12-rules]]
- [[2026-05-21-saas-million-arr-clairvo]]
- [[2026-06-02-every-agentic-engineering-hack-i-know]]
- [[2026-06-04-mattpocock-skills]]
- [[2026-06-03-lessons-from-building-claude-code-how-we-use-skills]]
- [[2026-06-03-dynamic-workflows-claude-code-ingest]]
- [[2026-07-24-the-new-rules-of-context-engineering-for-claude-5-generation-models]]
- [[2026-07-15-these-90-minutes-will-change-the-way-you-use-ai]]
- [[2026-07-29-understanding-is-the-new-bottleneck]]
- [[2026-06-28-explain-diff-skill]]
