---
id: article-2026-06-03-dynamic-workflows-claude-code-ingest
type: source
title: "Tweet Ingest: How to master Dynamic Workflows in Claude Code"
path: raw/articles/user-provided/2026-06-03-dynamic-workflows-claude-code-ingest.md
author: "Codez (@0xCodez)"
publisher: X
url: https://x.com/0xcodez/status/2062127385923776831
date_published: 2026-06-03
date_added: 2026-06-04
tags: [claude-code, dynamic-workflows, workflows, agent-harnesses, subagents, agent-skills, agent-security, evals]
status: active
quality: medium
summary: "Practitioner X digest presenting Claude Code Dynamic Workflows as model-written JavaScript harnesses for parallel, long-running, adversarial, and structured tasks, with six orchestration patterns and cost/security cautions."
related: [claude-code, workflows, agent-harnesses, agent-skills, agent-security, ai-agent-evals, context-engineering]
---

# Tweet Ingest: How to master Dynamic Workflows in Claude Code

## Source Metadata

- Path: raw/articles/user-provided/2026-06-03-dynamic-workflows-claude-code-ingest.md
- Local source file: `/Users/josemanuelcerqueira/Downloads/dynamic-workflows-claude-code-ingest.md`
- Author: Codez (@0xCodez)
- Published: 2026-06-03
- Publisher: X
- URL: https://x.com/0xcodez/status/2062127385923776831
- Source packet metadata: 12:00 PM · Jun 3, 2026 · 850.2K views; 22 replies, 105 reposts, 607 likes, 2.1K bookmarks.
- Verification checked: Anthropic's official May 28, 2026 blog post "Introducing dynamic workflows in Claude Code" confirms that dynamic workflows launched in research preview, use model-written orchestration scripts, coordinate parallel subagents, can be started by asking for a workflow or by enabling `ultracode`, may consume substantially more tokens, and save progress for interrupted runs.
- Verification boundary: the six-pattern taxonomy, 14-step roadmap, image transcriptions, and claims about what "9 out of 10 builders" have tried are from the X digest and should be treated as practitioner synthesis, not official Anthropic documentation.

## TL;DR

This source frames Claude Code Dynamic Workflows as Claude writing a task-specific JavaScript harness on demand. The digest's strongest reusable lesson is when to move from a single Claude Code session to an orchestrated workflow: long-running work, parallelizable lists, adversarial verification, large migrations, root-cause investigations, triage, sorting, lightweight evals, and other tasks where one context window or one self-verifying agent breaks down.

The operating patterns are useful even if individual product details change: classify-and-act, fan-out-and-synthesize, adversarial verification, generate-and-filter, tournament comparison, and loop-until-done. The source also names the main cautions: workflows can burn too many tokens, should not replace routine sessions, need explicit goals and budgets, should quarantine untrusted input, and should be saved as skills only after the shape works.

## Key Claims

- A Dynamic Workflow is a per-task harness that Claude writes, rather than a static prompt chain the user manually runs.
- Dynamic Workflows are best for long-running, parallel, highly structured, or adversarial tasks where one context window degrades.
- The feature gives subagents separate context windows, model choices, and isolation levels.
- Workflows structurally address agentic laziness, self-preferential verification bias, and goal drift by separating work across isolated agents and deterministic orchestration code.
- `parallel()` is a fan-out barrier; `pipeline()` streams items through stages without waiting for all items at each stage.
- Classify-and-act helps route heterogeneous work and spend more capable models only where complexity demands it.
- Fan-out-and-synthesize works when a task has many independent items and needs one merged result.
- Adversarial verification separates the worker from the checker and is most useful for claim-checking, code review, and quality gates.
- Generate-and-filter delays commitment by producing multiple candidates and then scoring, deduping, or verifying them.
- Tournament comparison is better than absolute scoring when ranking many items or making taste-heavy judgments.
- Loop-until-done fits tasks with unknown work volume, such as debugging, bug hunts, and pattern mining.
- `/goal`, `/loop`, and explicit token budgets are practical controls for cost and completion behavior.
- Any workflow that reads untrusted public/user content needs a quarantine pattern: read-only agents summarize/classify; trusted actor agents operate only on structured summaries.
- Working workflows can be saved locally and later shipped as skills, with the workflow file treated as a reusable template rather than a rigid script.

## Important Details

- The X digest attributes the feature launch to May 28, 2026; Anthropic's official blog confirms that date.
- The digest says workflows can be started by asking Claude to create one or with `ultracode`; Anthropic's blog confirms both paths.
- Anthropic's official post says dynamic workflows are a research preview and can consume substantially more tokens than a typical Claude Code session.
- The digest claims the default Claude Code harness works for most coding tasks, and workflows should be reserved for classes where context, parallelism, or adversarial review matters.
- The digest's "static vs dynamic" distinction is useful: static workflows are generic; dynamic workflows can inspect the actual code/task context and adapt the orchestration plan.
- The "quarantine" pattern is the highest-security lesson: agents exposed to untrusted content should not have privileged tools.
- The source explicitly warns against common waste patterns: using workflows for ordinary tasks, omitting token budgets, letting one agent verify itself, confusing `parallel()` with `pipeline()`, skipping `/goal` on looped workflows, sorting with absolute scores, and failing to save successful workflows.
- Image transcriptions add visual summaries of use cases, tournament ranking, the `agent()` API, token-budget/effort UI, quarantine architecture, and packaging workflows as skills.

## Entities

- Source author: Codez (@0xCodez)
- Referenced Anthropic employee tweet: cat (@_catwu)
- Product surface: Claude Code Dynamic Workflows
- Trigger/control terms: `workflow`, `ultracode`, `/goal`, `/loop`, explicit token budgets
- Core API names in the digest: `agent()`, `parallel()`, `pipeline()`
- Patterns: classify-and-act, fan-out-and-synthesize, adversarial verification, generate-and-filter, tournament, loop-until-done, quarantine, save-as-skill
- Use cases: migrations, deep research, verification, sorting, memory/rule adherence, root-cause investigation, triage, exploration/taste, lightweight evals
- Related skill packaging path: `~/.claude/skills/deep-verify/`

## My Notes

- This is useful as an operating-pattern source, not as a stable API reference. Official docs should be checked before relying on version numbers, availability, plan support, or exact menu labels.
- The biggest conceptual update is "workflow as harness Claude writes." That belongs in [[agent-harnesses]] and [[workflows]] because it moves orchestration from the user's prompt sequence into generated code.
- The digest sharpens the role of adversarial verification in [[ai-agent-evals]]: a separate checker with a clean context is not just a quality trick but a structural bias control.
- The quarantine section belongs in [[agent-security]] because it turns prompt-injection defense into workflow topology: raw untrusted content stays with read-only agents, while privileged actors see summaries only.
- The save-as-skill section is useful for [[agent-skills]], with the caveat that workflow files should be treated as templates the model can adapt, not scripts to run blindly.
- The source's tone is promotional and includes unverified adoption claims. Preserve the patterns, but do not promote engagement numbers or "9 out of 10 builders" as evidence.

## Open Questions

- What exact workflow API surface is documented in official Claude Code docs, and how stable are `agent()`, `parallel()`, and `pipeline()` as of future releases?
- How does Claude Code expose workflow scripts, logs, intermediate state, and permissions for audit?
- What budget controls are enforceable by the runtime versus merely prompt guidance?
- How should saved dynamic workflows be versioned, reviewed, and permission-scoped when packaged as skills?
- Can the quarantine pattern be enforced mechanically in Claude Code, or does it depend on the generated workflow respecting prompt instructions?

## Related

- [[claude-code]]
- [[workflows]]
- [[agent-harnesses]]
- [[agent-skills]]
- [[agent-security]]
- [[ai-agent-evals]]
- [[context-engineering]]
- Official Anthropic blog checked during ingest: https://claude.com/blog/introducing-dynamic-workflows-in-claude-code

## Source Text

# Tweet Ingest: "How to master Dynamic Workflows in Claude Code"

**Source:** https://x.com/0xcodez/status/2062127385923776831
**Author:** Codez (@0xCodez)
**Posted:** 12:00 PM · Jun 3, 2026 · 850.2K Views
**Engagement:** 22 replies · 105 reposts · 607 likes · 2.1K bookmarks

---

## Main text

How to master Dynamic Workflows in Claude Code: 6 patterns and 14 steps Anthropic engineers actually [use].

Most Claude Code users still write their workflows by hand. They chain prompts, copy outputs, paste them into the next prompt, fix what went wrong, repeat.

9 out of 10 builders haven't tried Dynamic Workflows even once, even though they shipped two weeks ago.

They write 50 prompts when one workflow would do. This is the 14-step roadmap and the 6 patterns Anthropic's own engineers actually use — for migrations, research, sorting, root-cause, triage, and evals.

Follow my Substack to get fresh AI alpha: movez.substack.com

Dynamic Workflows shipped in Claude Code on May 28, 2026. The default Claude Code harness is built for coding — and that works well for most coding tasks. But there are classes of work where one context window starts to break down: long-running, massively parallel, highly structured, or adversarial.

For those, Anthropic used to build custom harnesses themselves (Research, Code Review, agent teams). With Dynamic Workflows, Claude writes that harness for you on the fly, custom-built for your task, in JavaScript.

14 steps. 6 patterns. One workflow instead of fifty prompts.

---

## Part 1 · The Mental Model

### 01. A workflow is a harness Claude writes.

The default Claude Code harness has Claude plan and execute in the same context window. For most coding work, this is great. For long-running, parallel, or adversarial work, it breaks down.

A Dynamic Workflow is Claude writing its own custom harness for the task — a JavaScript file with a few special functions that spawn and coordinate subagents, plus standard JavaScript (Math, JSON, Array) to process the data flowing between them.

> **Embedded quoted tweet — cat (@_catwu), May 28** (349 replies · 1.1K reposts · 7.7K likes · 1.6M views):
> "Excited to share our most powerful new Claude Code feature: dynamic workflows! Mention 'workflow' in a prompt and Claude will dynamically create an orchestration plan that it strictly follows, allowing you to confidently trust that every stage happens in the right order even [Show more]"

Three things this gives you that the default harness cannot:

- **Per-agent isolation.** Each subagent gets its own context window with one focused goal. No cross-contamination.
- **Per-agent model choice.** The workflow picks which model each subagent uses — Opus for hard reasoning, Haiku for cheap exploration, Sonnet for the middle.
- **Per-agent isolation level.** Worktree (isolated git checkout) or remote (no checkout). The workflow decides what each agent needs.

Start one by either asking Claude directly ("make a workflow that…") or with the trigger word `ultracode`. If a workflow is interrupted — user action, terminal quit — resuming the session picks up where it left off.

### 02. The 3 failure modes workflows solve.

To know when a workflow is the right tool, you have to know what it fixes. The longer Claude works on a complex task in a single context window, the more it becomes susceptible to three specific failure modes — named directly in the Anthropic launch writing:

- **Agentic laziness** — Claude stops before finishing a complex, multi-part task and declares done after partial progress. Addresses 20 of the 50 items in a security review and calls the rest "handled."
- **Self-preferential bias** — Claude prefers its own results when asked to verify or judge them against a rubric. A verifier with skin in the game can't be a fair verifier.
- **Goal drift** — the gradual loss of fidelity to the original objective across many turns, especially after compaction. Each summarization step is lossy. "Don't do X" constraints quietly disappear at turn 47.

A workflow solves all three structurally: separate Claudes with their own contexts, focused goals, and isolated state. If your task suffers from any of these patterns — that's the signal to reach for a workflow.

### 03. Static vs Dynamic workflows.

You may have already built static workflows using the Claude Agent SDK or `claude -p` — coordinating multiple Claude Code instances together.

- Static workflows are generic: written once to handle every edge case. They work, but they have to be conservative.
- Dynamic Workflows are different: Claude writes *this* workflow for *this* task. The harness is tailor-made. Below is the same question handled both ways:

The reason the dynamic version wins isn't the search step — both can search. It's that the workflow gets to shape itself around your context: read your billing code, check each feature against the actual new provider docs, price at your transaction volume, and run an adversarial "why not to migrate" pass against its own emerging answer. A static harness can't do this because it doesn't know your code exists.

### 04. The core API. `agent()`, `parallel()`, `pipeline()`.

Three functions do most of the work in a workflow. Knowing them is enough to read any workflow Claude writes for you and to nudge Claude when you want a specific shape.

`parallel()` is a barrier: it fans out, then waits for everything before returning. `pipeline()` is streaming: each item flows through every stage independently.

Pick by the question: do I need all results before I can do anything next? Yes → parallel. No → pipeline (cheaper, faster overall).

### 05. Classify-and-act. Route the work before doing it.

A classifier agent decides on the type of task, then the workflow routes to different agents or behaviors based on the answer. Or a classifier runs at the end, sorting raw outputs into buckets for whatever comes next.

When this pattern earns its keep:
- The task is heterogeneous — different sub-types need different treatment.
- You want to spend the expensive model only where complexity demands it (classifier on cheap, then route to Opus only when needed).
- The decomposition of work is itself non-trivial and benefits from a model deciding the shape.

Example: "Explain how the auth module works." A classifier subagent reads the codebase first, estimates complexity, then routes the actual explanation task to Sonnet for a 10-file module or Opus for a 100-file one. The right model for the job, decided after the work is understood.

### 06. Fan-out-and-synthesize. Many small steps, one merged result.

Split a task into many smaller steps. Run an agent on each step in parallel. Synthesize the results into one answer.

The synthesize step is a barrier — it waits for every fan-out agent, then merges their structured outputs.

Why this pattern dominates in practice: it solves the "too many things at once" failure of single-context work. Each subagent sees only its piece. The orchestrator never gets distracted by 50 unrelated details. Each step benefits from its own clean window so they don't cross-contaminate.

Use this when:
- You have a clearly enumerable list of work items (50 files, 200 endpoints, 100 reviews).
- Each item is independent — no item needs another's output to begin.
- You want a single consolidated answer at the end, not a pile of partial reports.

```javascript
// Fan out: one agent per file. Barrier: wait for all.
const reviews = await parallel(
  files.map(file => () => agent(
    `Review ${file} for security issues`,
    { model: "haiku", schema: IssueList }
  ))
)

// Synthesize: one Opus agent merges everything.
const report = await agent(
  `Merge these reviews into one prioritized report:\n${JSON.stringify(reviews)}`,
  { model: "opus" }
)
```

### 07. Adversarial verification

This is the structural fix for self-preferential bias. For each spawned agent, run a separate spawned agent that adversarially verifies its output against a rubric. The verifier has never seen the original work; it can't favor it.

The pattern matters most for:
- **Claim-checking** — every factual statement in a report gets its own verifier subagent, checking against the original source.
- **Code review** — the author agent writes the fix, the reviewer agent (separate context) reviews it. Never the same Claude judging itself.
- **Quality gates** — before any artifact ships, an adversary tries to find the weakest case against it. If the adversary can't, you ship.

The pairing rule: the verifier should know only the rubric and the artifact, not who produced it. Otherwise self-preference creeps back in through hints in the prompt.

### 08. Generate-and-filter.

Generate a number of ideas on a topic, then filter them by a rubric or by verification. Dedupe duplicates. Return only the highest quality, tested ideas.

Where this pattern shines:
- **Brainstorming** — 30 product names, then a verifier kills clichés, trademark conflicts, and weak phonetics. You see 3.
- **Hypothesis generation** — 5 different approaches to a problem, then each gets scored against your constraints. The winner has earned it.
- **Solution design** — 5 different approaches to a problem, then each gets scored against your constraints. The winner has earned it.

The opposite of asking Claude for "the best answer." Asking for the best answer makes Claude commit early. Generate-and-filter makes Claude commit late, after every option has been challenged.

### 09. Tournament. Pairwise comparison beats absolute scoring.

Instead of dividing the work, have agents compete on it. Spawn N agents that each attempt the same task using different approaches, then judge the results in pairwise fashion until one wins.

Comparative judgment is more reliable than absolute scoring — especially for taste-based work.

Why this beats sort-by-score: trying to sort 1,000 items in one prompt fails on two fronts — quality degrades, and it won't fit in context. A tournament splits the bracket across fresh agents, each comparing just two items.

The bracket itself lives in deterministic loop code, not in context. Each comparison is fast, fair, and isolated. Same idea works for taste-based ranking: design choices, candidate selection, content prioritization.

### 10. Loop until done.

For tasks with an unknown amount of work, loop spawning agents until a stop condition is met — no new findings, no more errors in the logs, theory verified — instead of running a fixed number of passes.

This pattern is the answer to "keep going until it's actually done":
- **Flaky test debugging** — reproduce, form theories, test them, until one theory holds.
- **Bug hunting** — keep finding bugs until a full pass returns zero.
- **Mining for patterns** — cluster, identify rules, until no new clusters appear.

Pair this pattern with `/goal` to set a hard completion requirement ("don't stop until one theory works") and with `/loop` if you want the entire workflow itself to run on a recurring schedule. The bracket and the stop condition live in code; only the active iteration stays in context.

### 11. Compose patterns for real use cases. One workflow, several patterns.

The 6 patterns rarely appear alone. A real workflow composes 2–4 of them. The matrix below pairs each use case from the Anthropic launch writing with the patterns it tends to use:

- **Migrations and refactors.** Fan-out (one agent per callsite/failing test in a worktree) → adversarial verification (a separate agent reviews each fix) → loop until done. This is the pattern Anthropic used to rewrite Bun from Zig to Rust.
- **Deep research** (the `/deep-research` skill). Fan-out (parallel web searches) → adversarial verification (each claim verified independently) → synthesize (one cited report).
- **Deep verification of a draft.** Identify all factual claims (one agent) → fan-out (one verifier per claim, each agent checks against source) → meta-verifier (checks the verifier's sources are high quality).
- **Sorting 1,000+ items.** Tournament (steps 5–9) — pairwise comparison, bucket-rank, or bracket. Comparative judgment, never absolute scoring.
- **Memory and rule adherence.** Verifier per rule (fan-out) → skeptic persona reviews the rules themselves to avoid false positives.
- **Root-cause investigation.** Generate theories from disjoint evidence (different agents read logs, files, data) → panel of verifiers and refuters for each theory → loop until one survives.
- **Triage at scale.** Classify-and-act → dedupe against existing tickets → either attempt the fix or escalate. Pair with `/loop` for continuous triage.
- **Exploration and taste** (design, naming, UI choices). Generate-and-filter (5–20 options) → tournament with a rubric → rank or pick.
- **Lightweight evals.** Run the candidate in a worktree → comparison agents grade against rubric → refine and re-grade. Same shape as a tournament but for grading, not ranking.

The right way to internalize these: identify which failure mode your current task is failing under, then pick the pattern that structurally prevents it. Drift → fan-out. Self-preference → adversarial verification. Open-ended → loop until done. Hard-to-score → tournament.

### 12. Pair with `/goal`, `/loop`, and token budgets.

Workflows can be expensive. Three controls turn them from "cool but costly" into "a tool I run unattended."

- `/goal` sets a hard completion requirement. Pair it with the loop pattern: "don't stop until one theory works." Without `/goal`, a workflow stops at a soft completion point. With `/goal`, it iterates until the actual end condition is met.
- `/loop` runs the entire workflow on a recurring schedule. Use it for workflows you want running continuously — triage, weekly research updates, recurring verification.
- **Explicit token budgets.** Tell Claude in the prompt: "use 10k tokens." This sets a cap on the workflow run. Without a cap, an ambitious workflow can balloon to 5–10× the tokens you expected.

```
> ultracode quick adversarial review of this assumption:
"moving to Postgres eliminates our shard rebalancing."
Use 5k tokens. /goal don't stop until you have either
a counterexample or three independent confirmations.
```

Quoting the Claude Code team directly: "Best practices are still developing. Dynamic workflows often use more tokens, so think carefully about when and how to use them." Most traditional coding tasks do not need a panel of 5 reviewers.

Ask yourself: does this task really need more compute? If a regular Claude Code session would finish it in five minutes, you don't need a workflow.

### 13. Use the quarantine pattern for untrusted input.

Any workflow that reads untrusted public content — support tickets, bug reports, user feedback, scraped data — needs to assume that content might contain prompt injection.

The fix: quarantine. Bar the agents that read the untrusted content from taking any high-privilege actions. Separate agents, with no exposure to the raw content, do the acting.

Any workflow that processes user-submitted content (support tickets, bug reports, customer feedback, social media), scrapes public web pages, or runs against output from a third-party API.

If the input wasn't written by you or a trusted teammate, quarantine it. A 30-line read-only reader agent costs almost nothing and removes an entire class of prompt injection risk.

### 14. Save workflows. Ship them as Skills.

Once a workflow works, save it: press `s` in the workflow menu. Saved workflows go to `~/.claude/workflows`. From there you have two paths:

- **Keep it local** — reuse it across your own projects.
- **Ship it as a Skill** — bundle the JavaScript file inside a Skill folder, reference it in SKILL.md, and anyone who installs the Skill runs the same workflow.

One practical nuance worth knowing: when you package a workflow into a Skill, prompt Claude to treat the workflow as a template, not a script to run verbatim. That leaves room for Claude to adapt the workflow shape to the specific task at hand while keeping the overall structure intact. Especially useful for workflows like "deep verification" or "triage" that need to flex per use case.

---

## The mistakes that waste tokens on workflows

- Reaching for a workflow when a regular Claude Code session would do. Most traditional coding tasks don't need a panel of 5 reviewers.
- No token budget. Ambitious workflows balloon to 5–10× what you expected without an explicit cap.
- One agent doing both the work and the verification. Self-preferential bias makes the verifier favor the worker. They must be separate.
- Treating `parallel()` and `pipeline()` as interchangeable. The barrier matters — parallel waits for all, pipeline streams.
- Skipping `/goal` on loop patterns. The workflow stops early at the first soft completion point. `/goal` forces hard completion.
- Letting untrusted content reach the actor. Quarantine isn't optional once you process anything user-submitted.
- Sorting with absolute scores. Comparative judgment is more reliable. Use a tournament.
- Never saving working workflows. Re-prompting the same shape every week. Save with `s`, ship as a Skill.

---

## Image transcriptions (9 images, in order)

**Image 1 — Header banner.** Title card reading "14 STEPS / Master Claude Dynamic Workflow / Full course for building adaptive Claude systems." Right side shows a node-graph: a pixel-robot "Lead Node — Start the flow" feeding into nodes labeled Trigger, Context, Tool Use, Decision (row 1) and Output, Reflection, Update (row 2), with a numbered step strip 9–14 along the bottom.

**Image 2 — "Where workflows shine" grid.** A 2×5 matrix of the ten work classes, each with an icon and a caption: Migrations (*one agent per file*), Research (*verified, cited reports*), Verification (*one agent per claim*), Sorting (*rank 1,000+ items*), Rules (*verifier per rule*); Root cause (*competing theories*), Triage (*classify and act*), Taste (*explore vs a rubric*), Evals (*grade vs a rubric*), Routing (*pick the model*). Footer: "Ten classes of work where one context window stops scaling, and a workflow steps in."

**Image 3 — Embedded @_catwu tweet image.** A side-by-side architecture diagram. Left "AGENT TEAMS": a single "claude" node branching down through implementer / verifiers / fixer layers of "claude" nodes. Right "DYNAMIC WORKFLOWS": a top "claude" node ("kicks off N tasks") fanning out to Task 1 / Task 2 / … / Task N columns of claude nodes, converging into a bottom "claude" node ("returns when done").

**Image 4 — Static vs Dynamic comparison.** Top prompt box: *"Should we migrate our checkout service to a new provider?"* Left "STATIC HARNESS" is a linear chain: turn into 5 web searches → fetch top results → verify → summarize → "a generic research report." Right "DYNAMIC WORKFLOW": "read our billing code (billing / webhooks / taxes)" branching to "check each feature against new provider's docs" and "price at our transaction volume," both feeding a dashed "devil's advocate: strongest case against migrating" box → "a specific recommendation."

**Image 5 — Core API code card.** Signature: `agent(prompt, opts?): Promise<string | JsonSchema>`. Code sample:
```
const bugs = await agent(
  "audit auth.ts",
  {
    schema: BugList,
    model: "haiku",
    isolation: "worktree",
    agentType: "reviewer",
  }
```
Annotations: *prompt* the agent's only input — required; *schema* JSON Schema → validated JSON output; *model* opus · sonnet · haiku, omit to inherit; *isolation* "worktree" (own checkout) or "remote"; *agentType* custom / built-in subagent. Lower section "RUN MANY — COMPOSE THE BLOCK" with two boxes:
```
parallel([ fns ])          // Fan out, run at once. Barrier — waits for all.
const all = await parallel(
  files.map(f =>
    () => agent(f)))

pipeline(items, …)         // Each item streams through every stage. No barrier.
await pipeline(items,
  x => agent(draft(x)),
  d => agent(check(d)))
```

**Image 6 — Tournament bracket.** Left "1,000 items." ROUND 1 pairings (each labeled *fresh agent*): "item 17 vs 482," "item 9 vs 731," "item 256 vs 88," "item 904 vs 3." ROUND 2: two "winner vs winner" nodes. FINAL: "last comparison" → a terminal box "Sorted: 1. item 88 / 2. item 17 / 3. item 904 / … / 1000. item 612."

**Image 7 — Token budget / `/effort` terminal screenshot.** Claude Code v2.1.154 header: "Opus 4.8 (1M context) with high effort · Claude Team", path `~/Desktop/dev/agentic-ops`. Banner: "Opus 4.8 is here! Now defaults to high effort · /effort xhigh for your hardest tasks." Shows `/model` → "Set model to Opus 4.8 (1M context) and saved as your default for new sessions," then `/effort` opening an Effort selector slider: Faster → Smarter, options **low · medium · high · xhigh · max · ultracode** (ultracode = "xhigh + workflows"). Footer: "←/→ to adjust · Enter to confirm · Esc to cancel."

**Image 8 — Quarantine pattern.** Left "The backlog" (*support tickets, bug reports, user feedback — untrusted*) → dashed red "QUARANTINE (read-only tools, no privileges)" box containing: "Reader agents — one per item (read the untrusted content, classify it)" → "Dedupe against what's already tracked" → "structured summary only." Arrow into blue "TRUSTED (high-privilege tools live here)" box: "Actor agent — acts on summaries, never raw content" → decision "fixable?" → yes "attempt fix" (*open a PR*) / no "escalate" (*to a human*). A "/loop runs cont." note on the right.

**Image 9 — Ship as a Skill.** Title "Put the workflow file inside the skill folder." Left "SKILL FOLDER":
```
~/.claude/skills/deep-verify/
├── SKILL.md
├── verify-claims.workflow.js
└── rubric.md
```
("The workflow file ships inside the skill folder, right next to SKILL.md.") Right "SKILL.md":
```
---
name: deep-verify
description: Verify every claim in a report
---
## Workflow
Run verify-claims.workflow.js to check each claim with its own subagent.
```
Footer: "Share the folder — anyone who installs the skill runs the same workflow."

---

> **Note:** The embedded @_catwu tweet and launch claims (ship dates, the "Opus 4.8" terminal, the Bun rewrite) come from the tweet itself and are not independently verified — treat them as the author's claims rather than confirmed fact.
