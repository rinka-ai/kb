---
id: summary-2026-06-03-agentic-engineering-practitioner-stack
type: summary
title: Agentic Engineering Practitioner Stack
tags: [agentic-engineering, claude-code, codex, workflows, skills, personal-knowledge-bases, voice-dictation]
summary: "Van Horn's agentic-engineering field report is useful as an operator-stack snapshot: plan-first artifacts, research-before-planning, parallel agent sessions, voice/raw-context capture, notes as agent memory, reusable skills, agent-native CLIs, and human taste as the bottleneck."
source_count: 7
canonical_for: [agentic engineering stack, plan-first agentic coding, Claude Code Codex workflow, agentic engineering hacks]
review_status: draft
last_reviewed: 2026-06-03
review_due: 2026-07-03
confidence: "0.78"
---

# Agentic Engineering Practitioner Stack

## Summary

Matt Van Horn's June 2026 agentic-engineering digest is worth keeping as a live operator-stack snapshot rather than as universal doctrine. It puts a concrete workflow around several patterns the KB already tracks: plan artifacts, human review bottlenecks, skills, personal memory, rich review surfaces, and agent tools. The strongest durable claim is that high-leverage agent work is not "ask for code"; it is an artifact loop: research, plan, run, verify, review, and then convert repeated moves into reusable skills or tools.

## Durable Pattern

- Start with external context before planning: recent search, issue URLs, screenshots, transcripts, prior notes, or codebase conventions.
- Convert fuzzy intent into a plan artifact with acceptance criteria before execution.
- Let multiple agent sessions run bounded work in parallel, but keep the human responsible for taste, risk, prioritization, and final review.
- Preserve prior plans and notes as a personal knowledge base so each future plan can inherit local context.
- Promote repeated workflows into skills only after the task recurs enough to prove the procedure is real.
- Use review surfaces that match the audience: Markdown or repo files for durable specs, HTML/Proof-style artifacts for colleagues who need a readable commentable view.
- Treat agent-native CLIs and browser-session handoff as powerful tool surfaces that require explicit credential, audit, and side-effect boundaries.

## Caveats

- Permission-bypass and YOLO-mode advice is a personal speed tradeoff, not a security baseline. It should be read against [[2026-05-31-zero-trust-ai-agents-kb-upgrades]] and [[2026-05-24-the-orchestration-tax]].
- The source is a user-provided digest of an X article. It preserves a concrete practitioner account, but it is not controlled evidence that the full stack improves quality.
- The "do not read the plan" stance is too strong as a general rule. It can work for low-risk throughput loops, but critical changes still need human inspection and tests.
- The social warning belongs in the canonical takeaway: more agent output can become worse if it outpaces user demand, human review capacity, or ordinary life constraints.

## KB Updates Made

- Strengthened [[claude-code]] with a plan-first, multi-engine operator pattern.
- Strengthened [[workflows]] with research-plan-build as an artifact loop.
- Strengthened [[agent-skills]] with the "anything repeated more than twice becomes a skill" practitioner heuristic.
- Strengthened [[personal-knowledge-bases]] with notes and prior plans as an agent-facing memory substrate.
- Strengthened [[voice-dictation]] with the LLM-aware dictation distinction.
- Strengthened [[agent-tools]] with agent-native CLIs and browser-session auth as high-leverage but high-risk tool surfaces.

## Source Notes

- [[2026-06-02-every-agentic-engineering-hack-i-know]]
- [[2025-04-18-claude-code-best-practices-for-agentic-coding]]
- [[2026-04-06-how-and-when-to-use-subagents-in-claude-code]]
- [[2026-05-08-using-claude-code-the-unreasonable-effectiveness-of-html]]
- [[2026-05-09-mnimiy-claude-md-12-rules]]
- [[2026-05-20-hermes-agent]]
- [[2026-05-24-the-orchestration-tax]]

## Related

- [[claude-code]]
- [[workflows]]
- [[agent-skills]]
- [[personal-knowledge-bases]]
- [[agent-tools]]
