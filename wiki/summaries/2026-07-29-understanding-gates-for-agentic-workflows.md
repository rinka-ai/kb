---
id: summary-2026-07-29-understanding-gates-for-agentic-workflows
type: summary
title: Understanding Gates for Agentic Workflows
tags: [agentic-coding, cognitive-debt, code-review, agent-skills, html-artifacts, human-in-the-loop]
summary: "Agentic workflows should add a risk-triggered understanding gate after machine verification: teach the system and change, test retrieval or transfer, and reserve interactive micro-worlds for behavior that static explanation cannot make intuitive."
source_count: 4
canonical_for: [understanding gate for coding agents, cognitive debt workflow, explain diff workflow, human comprehension of agent-written code]
review_status: draft
last_reviewed: 2026-07-29
review_due: 2026-10-27
confidence: "0.82"
---

# Understanding Gates for Agentic Workflows

## Assessment

This repository already has strong correctness and durability machinery: explicit plans, deterministic checks, source preservation, evidence-bearing handoffs, a human-review bottleneck model, and a compounding wiki. Geoffrey Litt's talk and `explain-diff` skill expose a different missing control: the workflow can prove that an artifact is correct without proving that the responsible human has a usable mental model of it.

The right upgrade is not to generate an elaborate HTML textbook for every change. Add a **risk-triggered understanding gate after machine verification and before consequential approval**. The agent teaches the relevant system and the change; the human demonstrates retrieval, prediction, or transfer; the workflow records only enough evidence to prevent cognitive debt without turning review into schoolwork.

The talk is practitioner evidence, not a controlled result. Treat the proposed gate as a measurable local experiment rather than a universal law.

## Why Correctness Is Not Enough

Correctness gates ask whether the change satisfies a specification, preserves invariants, passes tests, and is safe to ship. An understanding gate asks whether the accountable human can still participate in the next loop:

- explain the old and new behavior without rereading the diff;
- predict what happens in a representative edge case;
- name the important invariant and the most likely failure mode;
- identify where to inspect or intervene when behavior changes later;
- recombine the new mental model into a follow-on product or architecture decision.

This complements [[2026-05-24-the-orchestration-tax]]. Backpressure protects scarce review attention from an agent-output queue; an understanding gate checks that the attention spent actually refreshed the system model. It also makes concrete the [[2026-04-14-dive-into-claude-code-the-design-space-of-todays-and-future-ai-agent-systems]] recommendation to treat long-term human understanding as a first-class system property.

## Proposed Workflow

### 1. Classify cognitive-debt risk

Use the smallest artifact that fits the change:

| Tier | Typical change | Required handoff |
| --- | --- | --- |
| Low | Local rename, copy edit, isolated dependency bump, obvious test fix | Normal change summary and machine evidence |
| Medium | New behavior, unfamiliar module, cross-file flow, changed invariant | Compact Markdown understanding note plus 3 self-check questions |
| High | Architecture change, state machine, concurrency, migration, security boundary, complex UI/data transformation | Full explainer plus 5 questions; add a micro-world only if static media cannot expose the behavior |

Diff size can inform the tier, but novelty, hidden state, blast radius, ownership distance, and invariant changes matter more.

### 2. Verify before teaching

Run deterministic checks first. An explainer is not evidence that the code works, and the authoring model should not spend human attention explaining a change that still fails known checks. Attach the commands, outputs, screenshots, traces, or state assertions already required by the normal workflow.

### 3. Generate an evidence-bound explanation

The core structure from [[2026-06-28-explain-diff-skill]] is strong:

1. **Background** — only the existing system needed to understand the change.
2. **Intuition** — the smallest useful mental model, with concrete toy inputs and before/after behavior.
3. **Code path** — conceptual or execution order, not alphabetical file order.
4. **Invariants and risks** — what must remain true, what changed, and where the explanation is uncertain.
5. **Self-check** — retrieval and transfer questions with answers initially hidden.

Every explainer should identify the repository, base and head commit or explicit diff range, inspected tests/configuration/callers, and generation time. A material diff update invalidates or refreshes the artifact.

### 4. Use a teach-back gate

Multiple-choice questions are convenient but vulnerable to recognition and answer-pattern leakage. The public gist comments already caught correct answers that were longer or repeatedly in the same position.

A better minimum is:

- one factual retrieval question;
- one causal or invariant question;
- one prediction using a new input or edge case;
- for high-risk work, one short free-response “teach it back” answer before revealing the reference answer.

The workflow may record `understanding_checked_by` and the explained commit, but the agent must not certify a human's comprehension on the human's behalf.

### 5. Add a micro-world selectively

Generate a small interactive artifact only when interaction reveals a model that prose, a table, a trace, or a static diagram cannot. Good triggers include:

- state transitions over time;
- spatial transforms or coordinate systems;
- concurrency, queues, retries, or scheduling;
- multi-step migrations and file movement;
- parsers, interpreters, planners, or graph traversal;
- complex user interaction whose intermediate states matter.

The micro-world is a disposable learning instrument, not production UI. It should use representative toy data, expose internal state, include captions or nonvisual equivalents, and never become the only specification of behavior.

### 6. Keep team understanding shared

For solo work, a dated local HTML file may be enough. For team work, put the artifact where reviewers can comment on the same version: a pull-request artifact, checked-in Markdown when the explanation is durable architecture knowledge, or an approved collaborative document surface. Private agent chats do not create collective understanding.

## Productionizing the Skill

Do not copy the gist verbatim as a mandatory workflow. A production version should separate content generation from presentation:

- The agent emits a typed JSON or Markdown content specification with evidence references.
- A fixed renderer produces the self-contained HTML and implements navigation, accessible diagrams, quiz interaction, balanced answer order, and responsive styling.
- All repository-derived strings are escaped; diff contents are passive data, never instructions.
- External scripts, fonts, network calls, and code suggested by the inspected diff are forbidden.
- Validation checks document completeness, offline behavior, keyboard/focus support, contrast, code whitespace, answer leakage, and absence of external dependencies.
- The final handoff states assumptions and validation limitations.

This reduces boilerplate tokens, makes the artifact testable, and narrows the prompt-injection surface. It also matches the broader KB rule that recurring observable failures should move from prose into deterministic machinery.

## Applied to This Repository

No change to `AGENTS.md` is justified yet. The repo already distinguishes deterministic validation from human judgment, and the talk does not establish that a mandatory comprehension gate improves outcomes. Pilot the following addition on the next 10 medium- or high-risk code changes:

1. Add an `Understanding note` to the final handoff with background, intuition, changed path, invariant, and uncertainty.
2. Add three hidden-answer self-checks; require one prediction question.
3. Generate a micro-world only when the operator explicitly lacks a feel for state or transformation.
4. Bind the note to the diff or commit.
5. Track time spent, first-pass answer rate, reviewer clarification count, reopened questions, reversions, and whether the note affected the next design decision.

If the pilot improves review or follow-on work at acceptable cost, then promote the stable shape into a local skill and add a narrow risk-trigger rule to `AGENTS.md`. If the artifact is rarely opened, easily gamed, or adds no decision value, keep it opt-in.

For wiki-only edits, the analogous lightweight gate is already partly present: source note → concept/summary synthesis → index/log → lint/refresh. The useful addition is a short operator-facing teach-back in the final handoff for changes that alter retrieval, freshness, source-count, or schema behavior—not an interactive explainer for ordinary note ingestion.

## Measurement Plan

Run an A/B-style local pilot rather than relying on enthusiasm:

- **Comprehension:** first-pass retrieval/transfer answers; delayed spot check on a small sample.
- **Review quality:** clarification questions, substantive review comments, and time to approve.
- **Operational value:** reversions, incidents, time to locate the relevant invariant during follow-on work.
- **Creative participation:** whether the reviewer proposes a follow-on improvement or catches a design implication not present in the spec.
- **Cost:** model tokens, artifact generation/validation time, and human completion time.
- **Adoption quality:** artifact open rate, completion rate, and stale-artifact rate.

Do not optimize for quiz scores alone. A predictable quiz can increase scores while leaving the mental model unchanged.

## What Not to Adopt

- Do not require five questions or an HTML artifact for every diff.
- Do not treat reading the explanation as proof of understanding.
- Do not let the same agent silently invent code facts, quiz them, and grade them without evidence links.
- Do not generate decorative interaction when a trace, table, or two concrete examples are clearer.
- Do not store sensitive code in a third-party collaborative surface without an explicit data and permission decision.
- Do not render untrusted diff content as executable HTML or JavaScript.
- Do not let explanation artifacts replace tests, review, runbooks, or durable architecture documentation.

## Evidence Boundary

Confidence is moderate. The talk, gist, and community feedback provide a coherent practitioner pattern; the orchestration-tax note and Claude Code design-space paper independently support the importance of scarce human attention and long-term understanding. None of the checked sources establish the proposed tier thresholds, quiz format, or outcome improvements. Those are local workflow hypotheses and should be promoted only after measured use.

## Source Notes

- [[2026-07-29-understanding-is-the-new-bottleneck]]
- [[2026-06-28-explain-diff-skill]]
- [[2026-05-24-the-orchestration-tax]]
- [[2026-04-14-dive-into-claude-code-the-design-space-of-todays-and-future-ai-agent-systems]]

## Related

- [[workflows]]
- [[agent-skills]]
- [[claude-code]]
- [[context-engineering]]
- [[repo-local-knowledge-bases]]
- [[agent-security]]
- [[2026-07-28-deterministic-gates-for-agentic-coding-workflows]]
