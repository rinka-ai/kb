---
id: concept-agent-skills
type: concept
title: Agent Skills
tags: [agents, skills, context-engineering]
source_count: 26
summary: Agent skills are reusable procedural capability modules that package task-specific guidance, examples, scripts, setup state, hooks, and verification habits while keeping invocation, evidence, and mutation boundaries explicit.
canonical_for: [agent skills, procedural skills]
review_status: reviewed
last_reviewed: 2026-06-04
review_due: 2026-07-04
confidence: "0.84"
---

# Agent Skills

## Summary

Agent skills are reusable capability modules that teach an agent how to approach recurring classes of tasks without hard-coding those procedures into the harness. In this KB, the strongest recent pattern is that skills externalize procedural expertise best when they are progressively disclosed, carry clear constraints, and specify what good looks like more than brittle step-by-step choreography. At scale, that depends on resolver surfaces that keep skills discoverable without loading all of them all the time, and in some systems on permission layers that decide which skills are even reachable for a given invocation. AHE adds a boundary condition: skills are only one evolvable harness component, and gains may live more strongly in tools, middleware, or memory than in procedural text. A newer security framing treats runtime-loaded skills as supply-chain artifacts: signatures and registries establish provenance, but behavioral trust requires explicit verification before irreversible capabilities can stop asking for HITL approval. The Cognee bundle adds a useful counterweight to an overly clean taxonomy: skills can be treated as procedural memories backed by run evidence and improvement proposals, as long as the runtime keeps storage, routing, review, and apply semantics explicit. Hermes adds the personal-agent loop: skills can be progressively disclosed, user-editable, agentskills.io-compatible, and subject to background improvement, but that turns mutation policy and protected-skill boundaries into part of the runtime contract. Van Horn adds the practitioner heuristic: if an agent workflow is performed more than twice, consider turning it into a skill after checking that the repeated shape is real. The Claude use-case digest adds the user-facing version: once a workflow's grouping, inputs, output format, and review policy are stable, save it as a skill, shortcut, project instruction, or scheduled Cowork task. Matt Pocock's skills repo adds a practitioner implementation pattern: package ordinary engineering discipline into small invoked skills that force feedback loops, domain-language alignment, vertical slices, durable briefs, and architecture vocabulary. Lieberman's content-machine digest adds a domain example: a skill directory can mirror a creator's actual process, with separate skills for idea mining, research, interviewing, production, refinement, review, repurposing, and learning. Anthropic's Claude Code skills article adds the org-scale version: skills should fit a clean category, focus on gotchas and verification, use the filesystem for progressive disclosure, include setup/memory/scripts/hooks only when they earn their keep, and be distributed or measured through repo skills, plugins, marketplaces, and usage hooks. Learn Harness Engineering adds a meta-skill example: `harness-creator` packages harness creation and auditing as templates, references, scripts, eval cases, and a structural validator. The Dynamic Workflows digest adds a workflow-to-skill packaging path: once a generated workflow proves useful, save it as a reusable skill template with its script and rubric nearby.

## What They Are

- reusable task-specific guidance that sits between generic model competence and raw tool access
- distinct from prompts, which are momentary instructions
- distinct from generic factual memory, even though a skill can be understood as procedural memory
- distinct from tool schemas, which define interfaces and safety boundaries

## Design Patterns

- keep a lightweight registry or manifest always available, then load full skills only on trigger match
- support both filesystem and built-in skill discovery so skills stay reachable without forcing all of them into the hot path
- make skill reachability portable across sandbox types; if one deployment target bundles skills while another expects them in the sandbox filesystem, users will experience the same skill as present or absent depending on runtime accident
- include procedures, heuristics, and hard constraints together
- prefer examples and destination criteria over brittle micromanaged steps
- let skills accumulate local knowledge or rewrite hooks, but update them conservatively
- when skills are evolved automatically, pair each update with evidence, expected fixes, and at-risk regressions
- escalate repeated local failures into broader semantic lessons when they reveal system-wide constraints
- keep machine-readable manifests or trigger registries so large skill libraries stay mostly off-context until needed
- maintain explicit resolver entries or strong description fields so existing skills remain reachable by natural user phrasing
- couple skill reachability to permission scope or invocation mode when background jobs should not load the same playbooks as interactive sessions
- treat signatures, registries, and clearances as provenance signals rather than proof that a skill's behavior matches its manifest
- freeze loaded skill content and verification levels at bootstrap; route any skill mutation through an audited irreversible operation and re-verify the resulting artifact before reuse
- record skill-run outcomes with task text, selected skill, score, feedback, and tool trace so future improvements are evidence-backed
- generate reviewable skill-improvement proposals before mutating stored procedures
- load skill bodies progressively: expose names and descriptions during routing, then fetch the full procedure only after the agent selects the skill
- distinguish mutable user skills from read-only external skill directories and protected skills, especially when the runtime can create or improve skills after a task
- promote a workflow to a skill only after repeated use reveals stable inputs, outputs, constraints, and review criteria
- categorize skills by the work they actually perform; mixed-purpose skills are harder for the model to select and follow
- prioritize product verification skills when agent output quality is the bottleneck; use scripts, browser drivers, TTY drivers, videos, and programmatic assertions where useful
- make the gotchas section the living center of a skill, fed by observed failure cases rather than generic reminders
- write skill descriptions as trigger rules for the model, not as marketing summaries for humans
- keep setup state explicit in config files and ask for missing configuration when a skill would otherwise target the wrong surface
- use skill-local memory only when prior executions materially affect the next run, such as delta-aware standups or recurring reports
- scope hooks to the skill when the guardrail is too opinionated or disruptive to keep always on
- measure opened or used skills so popular, under-triggering, and stale skills can be improved from evidence
- copy the shape of a known-good skill when creating a new one, but rewrite the actual procedure around the local task rather than cloning another domain's assumptions
- when a skill is created from an ad hoc workflow, preserve the triage rubric and handoff target as much as the prompt text; otherwise the next run reproduces prose without the operating discipline
- prefer skills that improve a real feedback loop, such as reproduction, tests, issue triage, architecture review, or user interrogation, over skills that merely change tone
- keep setup/configuration skills separate from task skills; missing configuration is a hard dependency only when output would otherwise target the wrong tracker, label, or document surface
- when a skill creates repo structure, include templates and deterministic validation scripts so the result is inspectable outside the chat turn
- label structural benchmarks clearly so users do not confuse artifact presence with observed agent effectiveness
- package saved workflow files as adaptable templates, not rigid scripts to run verbatim regardless of task context
- include workflow rubrics, stop conditions, budget guidance, and privilege boundaries when a skill launches multi-agent orchestration
- for content and research skills, encode routing rules for missing information so the skill asks for facts, stories, or numbers instead of fabricating specificity

## Failure Modes

- loading every skill all the time and wasting context budget
- writing procedural skills that the model follows literally even when the world changed
- letting stale skills survive API or workflow drift
- confusing skills with tools, memory, or project context
- making skill discovery depend on hidden filesystem assumptions that differ between local, virtual, hosted, and container sandboxes
- keeping important safety lessons trapped inside one skill instead of promoting them globally
- describing exact choreography when the skill should really communicate outcomes, examples, and fences
- building dark skills that technically exist but have no practical path from the resolver
- over-crediting skills for improvements that actually came from tool, middleware, or memory changes
- treating signed or registry-delivered skills as trusted without behavioral verification
- allowing an agent to mutate loaded skill content in-session and silently change what "verified" means
- collapsing skills into memory so completely that facts, preferences, procedures, and instructions become one unsafe retrieval lane
- rewriting a durable skill from a single weak run instead of accumulating enough evidence for a proposal and review step
- recording runs for every candidate skill instead of only the skills actually opened or used
- letting background review rewrite procedural memory without clear protection, provenance, or user-level rollback expectations
- skillizing a fashionable personal trick before proving it helps repeated local work
- writing one skill that straddles multiple categories and leaves the model unsure whether it is verifying, scaffolding, deploying, or investigating
- filling a skill with obvious coding advice that consumes context without changing behavior
- treating the description as a human-facing summary, causing the resolver to miss the skill when users ask in natural language
- hiding required Slack, tracker, deployment, or data-source setup inside prose instead of explicit configuration
- letting skill marketplaces optimize for popularity without checking whether usage reflects successful behavior
- saving a vague prompt as a skill before the required context, output schema, confidence policy, and downstream side effects are known
- building a scaffolding skill whose generated files look complete but lack runnable verification or real-session evidence
- shipping a workflow skill that can fan out agents or touch privileged tools without clear budget, review, and quarantine rules
- copying another repo's setup skill wholesale when local `AGENTS.md`, docs, issue tracker, or KB schema already provide the same coordination surface
- using famous-person reviewer personas as decorative critique instead of preserving concrete scores, edits, unanswered questions, and upstream handoff requirements

## Source Notes

- [[2026-05-01-skills-as-verifiable-artifacts]]
- [[2026-04-16-externalization-in-llm-agents-a-unified-review-of-memory-skills-protocols-and-harness-engineering]]
- [[2026-04-16-the-anatomy-of-an-agent-harness]]
- [[2026-04-16-good-and-bad-harness-engineering]]
- [[2026-04-16-agentic-stack]]
- [[2026-04-16-ai-agent-stack-builders-guide-av1dlive]]
- [[2025-11-13-skills-explained-how-skills-compares-to-prompts-projects-mcp-and-subagents]]
- [[2025-11-19-how-to-create-skills-key-steps-limitations-and-examples]]
- [[2025-11-12-improving-frontend-design-through-skills]]
- [[2026-04-12-agent-workflow-memory]]
- [[2026-04-16-resolvers-the-routing-table-for-intelligence]]
- [[2026-04-17-goose]]
- [[2026-04-17-browserbase-skills]]
- [[2026-04-17-browserbase-bb-internal-agent-full-architecture-synthesis]]
- [[2026-04-28-agentic-harness-engineering-observability-driven-automatic-evolution-of-coding-agent-harnesses]]
- [[2026-05-02-flue]]
- [[2026-05-17-memory-skills-same-harness-tricalt]]
- [[2026-05-18-cognee]]
- [[2026-05-20-hermes-agent]]
- [[2026-06-02-every-agentic-engineering-hack-i-know]]
- [[2026-06-03-claude-use-cases-full-digest]]
- [[2026-06-04-mattpocock-skills]]
- [[2026-06-03-alex-lieberman-content-machine]]
- [[2026-06-03-lessons-from-building-claude-code-how-we-use-skills]]
- [[2026-06-04-walkinglabs-learn-harness-engineering]]
- [[2026-06-03-dynamic-workflows-claude-code-ingest]]
