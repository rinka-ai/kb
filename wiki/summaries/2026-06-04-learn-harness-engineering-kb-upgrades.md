---
id: summary-2026-06-04-learn-harness-engineering-kb-upgrades
type: summary
title: Learn Harness Engineering KB Upgrades
tags: [agent-harnesses, harness-engineering, coding-agents, context-engineering, repo-local-knowledge-bases, verification]
summary: "walkinglabs/learn-harness-engineering turns harness engineering into a practical curriculum: five subsystems, repo-as-system-of-record, feature-list state, executable verification, observability, clean handoff, and a portable harness-creator skill."
source_count: 1
canonical_for: [learn harness engineering, walkinglabs harness engineering, harness engineering course, harness creator skill]
review_status: draft
last_reviewed: 2026-06-04
review_due: 2026-07-04
confidence: "0.84"
---

# Learn Harness Engineering KB Upgrades

## Summary

`walkinglabs/learn-harness-engineering` is best preserved as a practical harness-engineering curriculum and artifact kit. It reinforces this KB's existing harness thesis while making the operating model more concrete: reliable coding agents need instructions, state, verification, scope, and lifecycle artifacts that live outside chat history.

The ingest read all 2,124 tracked files at commit `a8b9c9ba4ee8c470d5b51092ec682e761a3363a5`. The durable synthesis is based mainly on the canonical English course, lecture examples, project source trees, capstone Electron app, scripts, templates, and `skills/harness-creator`.

## Durable Patterns

- Use a five-subsystem harness model: instructions, state, verification, scope, and lifecycle.
- Treat the repository as the system of record for coding-agent work. Setup, progress, feature state, verification evidence, and handoff should be inspectable files.
- Keep root agent instructions short and route to deeper docs, templates, scripts, and references through progressive disclosure.
- Split initialization from implementation. A fresh session should first prove that the app starts, tests run, progress is visible, and one next task is selected.
- Make feature lists executable state, not planning notes. Each item should have behavior, verification, status, evidence, and dependencies.
- Enforce WIP=1 unless explicit multi-agent ownership boundaries exist.
- Bind completion to evidence: unit/static checks, full-pipeline checks, architecture rules, runtime behavior, and system-level confirmation.
- Add runtime and process observability to the harness: structured logs, task traces, sprint contracts, evaluator rubrics, quality documents, and cleanup scanners.
- Treat clean handoff as part of done. The next session should not have to infer what passed, what failed, or what changed.
- Periodically simplify the harness. Artifacts that no longer prevent observed failures should be removed or merged.

## KB Changes

- [[agent-harnesses]] gets the cleanest operational model: a harness is not a prompt, but a five-subsystem execution environment around the model.
- [[context-engineering]] gets another strong progressive-disclosure example: root files route, linked artifacts carry detail, and feature/state files become context interfaces.
- [[repo-local-knowledge-bases]] gets the coding-agent version of the same thesis: repo-tracked project memory reduces cold-start rediscovery and session drift.
- [[workflows]] gets a concrete session lifecycle: initialize, select one feature, implement, verify, record evidence, hand off, and clean.
- [[agent-skills]] gets `harness-creator` as a portable skill package with templates, references, scripts, evals, and structural validation.
- [[ai-agent-evals]] gets a reminder that structural harness scoring is useful but not a substitute for real before/after agent-session testing.
- [[durable-execution]] gets the file-backed continuity version: state, handoff, and clean restart artifacts can make coding work resumable without a full durable workflow engine.
- [[internal-engineering-conventions]] gets a useful convention design rule: promote recurring failures into executable checks, templates, gotchas, or scoped docs instead of growing one giant instruction file.

## Cautions

- The repo is high-quality practitioner/course material, not neutral benchmark evidence.
- Course-internal numeric claims should be treated as hypotheses unless their cited OpenAI or Anthropic source can be verified separately.
- Multilingual copies are useful for distribution but are not independent sources for the KB.
- The `harness-creator` validator is structural. It checks whether artifacts exist and cohere; it cannot prove that agents actually complete more work in practice.
- The best local adoption path is probably selective: reuse the five-subsystem rubric and feature-state discipline before importing another full file schema.

## Source Notes

- Source note: [[2026-06-04-walkinglabs-learn-harness-engineering]]
- GitHub repository: https://github.com/walkinglabs/learn-harness-engineering
- Inspected commit: `a8b9c9ba4ee8c470d5b51092ec682e761a3363a5`

## Related

- [[agent-harnesses]]
- [[context-engineering]]
- [[repo-local-knowledge-bases]]
- [[workflows]]
- [[agent-skills]]
- [[ai-agent-evals]]
- [[durable-execution]]
- [[internal-engineering-conventions]]
