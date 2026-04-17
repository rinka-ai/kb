---
id: article-2026-04-16-ai-agent-stack-builders-guide-av1dlive
type: source
title: "AI Agent Stack - Builder's Guide (by @Av1dlive)"
path: raw/articles/2026-04-16-ai-agent-stack-builders-guide-av1dlive.md
author: Av1dlive
publisher: User-provided analysis
url:
date_published:
date_added: 2026-04-16
tags: [agents, memory, skills, protocols, harnesses, context-engineering]
status: processed
quality: medium
summary: A builder-oriented architecture note arguing that durable agent value should live in external memory, skills, and protocols, with the harness kept deliberately thin.
related: [agent-memory, agent-skills, agent-protocols, agent-harnesses, context-engineering, managed-agents]
---

# AI Agent Stack - Builder's Guide (by @Av1dlive)

## Source Metadata

- Path: raw/articles/2026-04-16-ai-agent-stack-builders-guide-av1dlive.md
- Author: Av1dlive
- Published: Unknown
- Publisher: User-provided analysis
- URL: Unknown

## TL;DR

The note argues that durable agent value should live in external memory, reusable skills, explicit protocols, and a git-tracked "brain" repo rather than in the harness or the model itself. It proposes a thin conductor that assembles context, routes tools, runs hooks, and persists state into markdown and JSON artifacts so the harness or model can be swapped without losing the accumulated system.

## Key Claims

- The most important part of an agent stack is not the model, but the external infrastructure around it.
- Memory, skills, and protocols should be treated as separate modules with different update and retrieval policies.
- The harness should stay thin and mostly orchestrate file reads, tool calls, logs, and hooks.
- Memory should be split into working, episodic, semantic, and personal layers rather than stored as one undifferentiated pile.
- Decision memory should be explicit enough to stop the agent from re-debating settled architecture choices.
- `build_context` is the critical function because context assembly determines what the model can reason over at all.
- Skills should use progressive disclosure so only matched skills load into context.
- Skills work best when they specify procedures, heuristics, constraints, and examples rather than brittle step-by-step micromanagement.
- Governance belongs in explicit protocols such as permissions tiers, tool schemas, and lifecycle hooks rather than being hidden inside prompts.
- Protocols, not individual skills, should own hard boundaries like blocked targets, approval gates, and unsafe compositions.
- Failures should be amplified into learning via reflection, salience scoring, and periodic consolidation.

## Important Details

- The proposed repo-native stack centers on a `.agent/` directory containing memory, skills, protocols, harness hooks, and tools.
- The concrete layout is split into `harness/`, `memory/`, `skills/`, `protocols/`, and `tools/`, with the harness treated as a replaceable adapter around the durable files.
- `AGENTS.md` is framed as a short root map that tells the harness what to read first and what hard rules always apply.
- `DECISIONS.md` is treated as an architectural decision record layer that prevents re-debating settled choices.
- The memory system is explicitly partitioned into `working/`, `episodic/`, `semantic/`, and `personal/`, with representative files such as `WORKSPACE.md`, `AGENT_LEARNINGS.jsonl`, `LESSONS.md`, and `PREFERENCES.md`.
- The described `build_context` order is: personal preferences plus active workspace, truncated semantic lessons, top episodic entries by salience, progressively loaded matched skills, then short safety-critical permissions.
- The reference conductor is described with concrete budget knobs such as `MAX_CONTEXT_TOKENS=128000`, `RESERVED_FOR_REASONING=40000`, and a small `max_tokens` response budget for the model call.
- Salience scoring is based on age, pain, importance, and capped recurrence count rather than pure recency or embeddings.
- `on_failure.py` is presented as a specialized hook that increases the visibility of failures by assigning high pain scores and triggering rewrites after repeated problems.
- The failure loop uses a threshold of three failures in fourteen days to escalate a skill from ordinary failure logging into rewrite territory.
- A nightly "dream cycle" consolidates episodic memory into semantic memory, archives stale working context, and commits the result.
- The upgraded dream cycle also detects recurring patterns, promotes lessons above a salience threshold, archives low-salience old entries instead of deleting them, and snapshots stale workspaces.
- The skills system uses a lightweight `_index.md` plus machine-readable `_manifest.jsonl` to support trigger-based loading and composition.
- Skills can self-rewrite after repeated use or failure, but only when evidence is clear; repeated local failures should sometimes be promoted into global lessons.
- The protocol layer includes tool schemas, permissions tiers, delegation rules, and pre/post hooks for enforcement and logging.
- Tool schemas are described as carrying required args, preconditions, side effects, approval requirements, and blocked targets so enforcement lives outside skill prose.
- The note uses a strong governance heuristic: if a new hire should not do something unsupervised, the agent should not either.
- The note explicitly warns about positive feedback loops that can amplify bad lessons into bad skills unless decay and human review act as circuit breakers.

## Entities

- Concepts: externalized memory, thin conductor, progressive disclosure, decision memory, salience scoring, dream cycle, procedural memory, permissions tiers
- Artifacts: `AGENTS.md`, `DECISIONS.md`, `WORKSPACE.md`, `PREFERENCES.md`, `LESSONS.md`, `AGENT_LEARNINGS.jsonl`, `_index.md`, `_manifest.jsonl`, `pre_tool_call.py`, `post_execution.py`, `on_failure.py`
- Directories: `.agent/harness/`, `.agent/memory/`, `.agent/skills/`, `.agent/protocols/tool_schemas/`, `.agent/tools/`
- Systems: git, cron, JSONL memory logs, markdown skills, tool schemas

## My Notes

- This is one of the clearest "builder doctrine" notes in the KB because it turns memory, skills, protocols, and harnesses into separate design surfaces instead of collapsing them into generic "agent architecture."
- The strongest reusable contribution is not any single file layout, but the separation between durable artifacts and the thin runtime loop that reads them.
- The most KB-improving addition is that semantic memory is not only "lessons" but can also include explicit decision records that preserve rationale and alternatives.
- The most debatable parts are the exact salience function, the "< 200 LOC harness" heuristic, and the cron-driven dream cycle. Those feel like strong patterns, not universal rules.

## Open Questions

- Which pieces of this design should become first-class KB concepts rather than remaining inside broader memory or context-engineering pages?
- When should `DECISIONS.md`-style architectural memory be treated as its own sub-problem instead of being folded into generic semantic memory?
- What is the best counterweight to the guide's file-centric bias: more protocol-oriented sources, more managed-agent sources, or more workflow-memory sources?
- Which of the cited references should be added next as primary sources so the note can be triangulated rather than treated as standalone doctrine?

## Related

- [[agent-memory]]
- [[agent-skills]]
- [[agent-protocols]]
- [[agent-harnesses]]
- [[context-engineering]]
- [[managed-agents]]
- [[llm-agents]]

## Source Text

Deep Analysis: AI Agent Stack - Builder's Guide (by @Av1dlive)

1. Core Thesis
The central argument is: you don't need to build your own model. What you need to build is the infrastructure around the model - the memory that persists across sessions, the skills that encode how tasks should be done, and the protocols that govern what the agent can and cannot do.
The harness (the runtime loop that calls the model) should be a thin conductor. It reads files. It doesn't own them. All durable value lives in plain markdown and JSON files in a git repo - portable, inspectable, and model-agnostic.
Validation against research/best practice: This aligns with the "Externalization" paradigm described in Zhou et al. (arXiv:2604.08224) and Harrison Chase's (LangChain CEO) position that agent harnesses are becoming the dominant way to build agents, but memory must be decoupled from the harness. If your memory dies when your harness dies, you built the harness too tightly coupled. This is a sound software engineering principle - separation of concerns and dependency inversion applied to AI agent architecture.

2. The Three-Module Architecture
The entire system is built on three modules with a thin conductor orchestrating them:
Module 1: Memory (Persistence)
What the agent knows and has experienced.
Module 2: Skills (Capabilities)
How the agent performs specific tasks - encoded as markdown files with self-rewrite hooks.
Module 3: Protocols (Governance)
What the agent can and cannot do - permissions, tool schemas, delegation rules.
The Thin Conductor (Harness)
A ~200 LOC Python loop that reads files, calls tools, writes logs, and runs hooks. It does not think. It does not make decisions. It is deliberately kept small.
Validation: This mirrors established software architecture patterns - specifically the "hexagonal architecture" or "ports and adapters" pattern. The harness is the adapter layer; skills/memory/protocols are the domain logic. Keeping the harness thin ensures portability (swap Claude for GPT, swap Cursor for Claude Code) and testability.

3. The Full Folder Structure
.agent/
|- AGENTS.md
|- harness/
|  |- conductor.py
|  |- context_budget.py
|  `- hooks/
|     |- pre_tool_call.py
|     |- post_execution.py
|     `- on_failure.py
|- memory/
|  |- working/
|  |- episodic/
|  |- semantic/
|  |- personal/
|  `- auto_dream.py
|- skills/
|  |- _index.md
|  |- _manifest.jsonl
|  |- skillforge/SKILL.md
|  |- memory-manager/SKILL.md
|  |- git-proxy/
|  `- ...
|- protocols/
|  |- tool_schemas/
|  |- permissions.md
|  `- delegation.md
`- tools/
   |- memory_reflect.py
   |- skill_loader.py
   `- budget_tracker.py

4. The Four Critical Files
4a. AGENTS.md - The Root Config
This is the first file the harness reads. It acts as a table of contents for the agent's brain. Without it, the agent doesn't know where anything lives.

4b. DECISIONS.md - Architectural Decision Record
This prevents the agent (and you) from re-debating settled architectural choices.

4c. on_failure.py - The Failure-to-Learning Hook
This converts failures into structured learning instead of generic error logs.

4d. The Cron-Based Dream Cycle
A nightly cron job (auto_dream.py running at 3 AM) that detects recurring patterns across episodes, promotes high-salience patterns from episodic to semantic memory, archives stale working context, and git commits the result.

5. Four-Layer Memory System (Deep Dive)
Layer 1: Working Memory (Volatile)
File: memory/working/WORKSPACE.md
Purpose: Current task state - open files, partial plans, active hypotheses, execution checkpoints

Layer 2: Episodic Memory (What Happened)
File: memory/episodic/AGENT_LEARNINGS.jsonl
Purpose: Records decision points, tool calls, failures, outcomes, and reflections from prior runs

Layer 3: Semantic Memory (Abstractions)
Files: memory/semantic/LESSONS.md, DECISIONS.md, DOMAIN_KNOWLEDGE.md
Purpose: Patterns and heuristics that hold across tasks. Not tied to a specific time or place.

Layer 4: Personal Memory (User-Specific)
File: memory/personal/PREFERENCES.md
Purpose: Your preferences, conventions, recurring constraints

6. The Salience Scoring Function
python
def salience_score(entry):
    age_days = (now - fromisoformat(entry["timestamp"])).days
    pain = entry.get("pain_score", 5)
    importance = entry.get("importance", 5)
    recurrence = entry.get("recurrence_count", 1)
    return (10 - age_days * 0.3) * (pain / 10) * (importance / 10) * min(recurrence, 3)

7. The Conductor (Harness) - build_context is Everything
Priority loading order:
- Personal preferences + active workspace
- Semantic lessons
- Top 5 episodic entries by salience
- Matched skills
- Permissions

Key rule: Every fragment that enters must earn its place.

8. Skills System - Progressive Disclosure
Always loaded: skills/_index.md
On trigger match: the full SKILL.md for that specific skill loads into context.
No match: full skill files stay on disk, unloaded.

9. Core Skills That Matter Most
skillforge - the meta-skill that teaches the agent how to create new skills.
memory-manager - the skill that should be written first because it turns memory from a filing cabinet into a feedback loop.

10. Self-Rewrite Hook Template
After every 5 uses or any failure, review recent episodic entries tagged with the skill, read the skill's KNOWLEDGE.md, and update triggers, constraints, procedures, and local knowledge only when evidence is clear.

11. Protocols - The Most Skipped Layer
Tool schemas define required args, preconditions, side effects, approval requirements, and blocked targets.
permissions.md defines three tiers:
- Always allowed
- Requires approval
- Never allowed

Lifecycle hooks:
- pre_tool_call.py
- post_execution.py

12. The Six Compounding Feedback Loops
- Memory -> Skill Creation
- Skills -> Memory
- Skills -> Protocols
- Protocols -> Skills
- Memory -> Protocol Routing
- Protocols -> Memory

13. The "Bitter Lesson" for Skills
Write destinations and fences, not driving directions.
Bad: procedural micromanagement.
Better: tell the agent what good looks like, give examples, heuristics, and constraints.

14. Known Failure Modes and Solutions
- Context budget bloat
- Stale skills
- Unsafe composition
- Literal execution
- Stale workspace
- Error amplification loops

15. The 90-Day Timeline
Weeks 1-2: memory files existed but the agent wasn't reading them reliably.
Weeks 2-4: memory-manager improved recall before decisions.
Weeks 4-5: the agent started editing its own skills.
Week 8: compounding became visible.
Week 10: context bloat hit hard until progressive disclosure was added.

16. Things the Author Would Do Differently
- Write memory-manager on day one
- Separate memory layers from the start
- Keep the brain repo separate from code repos
- Start with fewer skills
- Write context-rich skills
- Build the protocol layer on day one

17. Actionable Takeaways for Your Code
Immediate:
- create `.agent/`
- write `AGENTS.md`
- write `PREFERENCES.md`
- write `permissions.md`
- build memory-manager first

Short-term:
- implement four memory layers
- add post-execution and failure hooks
- create progressive-disclosure skill registry
- build skillforge

Medium-term:
- implement auto_dream.py
- add tool schemas
- enforce permissions in pre_tool_call.py
- prefer declarative skills over procedural ones

18. References Cited in the Article
- Harrison Chase - "Your Harness, Your Memory"
- Vivek Trivedi - "The Anatomy of an Agent Harness"
- Zhou et al. - "Externalization in LLM Agents: A Unified Review of Memory, Skills, Protocols and Harness Engineering"
- Daniel Miessler - "Good and Bad Harness Engineering"
- Garry Tan - post on agent memory ownership
- github.com/codejunkie99/agentic-stack
