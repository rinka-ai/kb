---
id: article-2026-06-04-walkinglabs-learn-harness-engineering
type: source
title: "walkinglabs/learn-harness-engineering"
path: raw/articles/github-repos/2026-06-04-walkinglabs-learn-harness-engineering.md
author: Walking Labs
publisher: GitHub
url: https://github.com/walkinglabs/learn-harness-engineering
date_published:
date_added: 2026-06-04
tags: [agent-harnesses, harness-engineering, coding-agents, repo-local-knowledge-bases, context-engineering, workflows, verification, agent-skills, github-repos]
status: active
quality: high
summary: "walkinglabs/learn-harness-engineering is a multilingual course repo that turns coding-agent reliability into a five-subsystem harness discipline: instructions, state, verification, scope, and lifecycle."
related: [agent-harnesses, context-engineering, repo-local-knowledge-bases, workflows, agent-skills, ai-agent-evals, durable-execution, internal-engineering-conventions]
---

# walkinglabs/learn-harness-engineering

## Source Metadata

- Path: raw/articles/github-repos/2026-06-04-walkinglabs-learn-harness-engineering.md
- Author: Walking Labs
- Published: Unknown
- Publisher: GitHub
- URL: https://github.com/walkinglabs/learn-harness-engineering
- Inspected revision: `a8b9c9ba4ee8c470d5b51092ec682e761a3363a5` on 2026-06-04.
- Files read: all 2,124 tracked files were read mechanically by checksum, totaling 8,928,918 bytes.
- File mix: 1,405 Markdown, 357 TypeScript, 111 TSX, 85 JSON, 71 text, 40 shell scripts, 17 JavaScript, 15 HTML, 9 PNG, 5 MJS, 2 YAML/YML, 2 Python, plus single CSS, MTS, `.en`, and `.gitignore` files.
- Top-level distribution: 1,584 files in `docs/`, 477 in `projects/`, 35 in `skills/`, 14 `docs-readme` files, 6 scripts, 2 GitHub workflow files, and top-level repository files.
- Duplicate-content scan: 77 duplicate hash groups covering 626 files, mostly repeated translated/course scaffolding and project artifacts.
- Semantic reading focus: canonical English course docs, lecture code examples, project READMEs and source trees, the capstone solution, `skills/harness-creator`, scripts, workflows, and representative localized/documentation copies.
- Binary files: 9 PNG screenshots under `docs/public/screenshots/readme/`.
- Verification attempted: repository source inspection, all-file checksum read, `harness-creator` structural validation for the repo root and Project 06 solution, and the Project 06 structural benchmark. No dependency install, docs build, Electron runtime test, or real before/after agent-session replay was run.
- Internal validation results: repo root scored 32/100 under the harness validator because the teaching site itself is not a fully harnessed coding workspace; `projects/project-06/solution` scored 72/100 with instructions and verification strong, scope as bottleneck, and eval coverage 10/10.

## TL;DR

`walkinglabs/learn-harness-engineering` is a course, reference library, project set, and skill package for making coding agents reliable by engineering the environment around the model. Its core model is simple and reusable: a coding-agent harness has five subsystems, namely instructions, state, verification, scope, and lifecycle.

The repo is valuable to this KB because it converts the harness-engineering thesis into inspectable artifacts: lectures, runnable examples, weak-versus-strong project harnesses, templates, a capstone Electron app, validator scripts, benchmark scripts, and a `harness-creator` skill. The user asked to read every file; all tracked files at the inspected commit were read by checksum, while synthesis here focuses on the canonical English course and repeated artifact patterns rather than duplicating every translation.

## Key Claims

- Strong models still fail when the harness leaves requirements vague, conventions implicit, setup undocumented, verification weak, and session state trapped in chat history.
- A prompt file alone is not a harness. The harness is everything outside model weights that shapes context, tools, state, verification, scope, and handoff.
- The repository should become the system of record for coding-agent work because repo-tracked files are inspectable, versioned, searchable, and portable across fresh sessions.
- Root agent instructions should be short routing documents, not encyclopedic manuals. Deeper context belongs in linked docs, templates, scripts, and feature/state files.
- Long-running agent work needs durable state files such as progress logs, feature lists, handoff notes, quality documents, and clean-state checklists.
- Initialization is a separate phase from implementation. A reliable session first proves that the app can start, tests can run, current state is visible, and the next feature is known.
- Scope control should be externalized through a feature list with one active item, explicit states, verification commands, evidence, dependencies, and done criteria.
- Completion should depend on executable evidence, not the agent's self-assessment. End-to-end checks, architecture boundary checks, and system-level confirmation are stronger than syntax-only proof.
- Runtime and process observability belong inside the harness: logs, traces, sprint contracts, evaluator rubrics, quality documents, and cleanup scanners reduce redundant diagnosis.
- A clean handoff is part of done. Every session should leave build/test state, verified progress, blockers, changed files, next steps, and cleanup evidence for the next session.
- Harnesses should be simplified over time. As models improve or failure modes disappear, remove artifacts that no longer earn their maintenance cost.
- Course-internal numeric claims, such as higher completion rates or lower startup time, are useful hypotheses but should not be promoted as independent empirical proof without checking their cited evidence.

## Important Details

- The top-level `README.md` presents the course as project-based harness engineering: build environment, state, verification, control, and lifecycle mechanisms around coding agents.
- The canonical course has 12 lectures. The arc moves from failure diagnosis, harness definition, repository-as-record, instruction splitting, continuity, initialization, scope boundaries, feature-list primitives, premature victory, E2E testing, observability, and clean handoff.
- Lecture 02 is the conceptual center: the harness is not the prompt, but the non-model execution environment that makes model capability reliable.
- Lecture 03 uses an ACID-like analogy for repo state: atomic commits, consistency through verification predicates, isolation through branches/progress files, and durability through git-tracked files.
- Lecture 04 argues for progressive disclosure: a short `AGENTS.md` or `CLAUDE.md` should route to deeper documents instead of carrying every rule in always-on context.
- Lecture 06 frames startup readiness around four questions: can the agent start the app, run checks, see current progress, and choose the next task.
- Lecture 08 treats `feature_list.json` or equivalent structured feature state as a harness primitive. Each item should carry behavior, verification command, and current state.
- Lecture 09 externalizes completion judgment with layered termination checks: static/syntax, runtime behavior, and system-level confirmation.
- Lecture 10 turns review findings and architectural constraints into executable rules, especially around Electron process boundaries.
- Lecture 11 separates runtime observability from process observability. The capstone uses structured logs, task traces, sprint contracts, and evaluator rubrics.
- Lecture 12 treats cleanup as part of the harness: quality document, clean-state checklist, benchmark comparison, cleanup scanner, and simplification loop.
- The projects create a ladder from weak prompt-only baselines to agent-readable workspaces, multi-session continuity, runtime feedback, evaluator role separation, and a capstone harness.
- Project 05 compares single-role, generator-plus-evaluator, and planner-plus-generator-plus-evaluator variants. The reported scores are course artifacts, not external benchmark evidence.
- Project 06 is the capstone: an Electron personal knowledge-base app with document import, indexing, citation-based Q&A, runtime observability, restartable repo state, benchmark scripts, cleanup scanner, quality document, evaluator rubric, and harness ablation framing.
- The capstone app architecture is conventional and agent-readable: Electron main owns filesystem/services/IPC, preload exposes a namespaced API, React renderer owns UI, shared types define IPC channels, and services handle persistence, documents, indexing, Q&A, and logging.
- `skills/harness-creator` is the most reusable artifact in the repo. It packages the five-subsystem model into a skill with templates, scripts, references, evals, and a structural validator.
- `harness-creator` scripts use Node built-ins and can create `AGENTS.md` or `CLAUDE.md`, `feature_list.json`, `progress.md`, `init.sh`, and `session-handoff.md`.
- `validate-harness.mjs` scores instructions, state, verification, scope, and lifecycle structurally. Its own README warns that structural checks do not replace real before/after agent-session tests.
- The skill references are broader than the course templates: memory persistence, context engineering, tool registry and permission safety, multi-agent coordination, lifecycle bootstrap, skill runtime, and gotchas.
- The gotchas reference is especially useful because it names hidden failure modes: memory caps, instruction priority, extraction race windows, per-call concurrency classification, permission side effects, context cache invalidation, hook trust, fork explosion, eviction races, tight skill-listing budgets, and orphaned memory topic files.
- The VitePress site is multilingual and includes many translated copies. The KB should treat English as the canonical source for synthesis unless a localization task specifically asks for cross-language comparison.
- The repo includes GitHub Pages and PDF-release workflows, Playwright/PDF scripts, README screenshot capture, and Uzbek orthography cleanup scripts.

## Entities

- Repository: `walkinglabs/learn-harness-engineering`
- Organization/author: Walking Labs
- Course title: Learn Harness Engineering
- Core subsystems: instructions, state, verification, scope, lifecycle
- Main skill: `skills/harness-creator`
- Key harness artifacts: `AGENTS.md`, `CLAUDE.md`, `feature_list.json`, `progress.md`, `claude-progress.md`, `init.sh`, `session-handoff.md`, `clean-state-checklist.md`, `quality-document.md`, `evaluator-rubric.md`
- Course technologies: VitePress, Mermaid, Playwright, pdf-lib, Electron, React, TypeScript
- Project ladder: baseline versus minimal harness, agent-readable workspace, multi-session continuity, runtime feedback and scope control, evaluator loops, capstone harness
- Capstone app services: `PersistenceService`, `DocumentService`, `IndexingService`, `QaService`, `Logger`
- Reusable patterns: repository as system of record, progressive disclosure, feature-state machine, pass-state gating, WIP=1, executable definition of done, structured logs, quality document, cleanup scanner, harness ablation

## My Notes

- This source is the clearest curriculum-grade artifact for [[agent-harnesses]] currently in the KB. Existing sources explain why harnesses matter; this one shows the teaching sequence and file artifacts that make the pattern concrete.
- The five-subsystem model is useful because it prevents harness discussions from collapsing into "write a better prompt." It gives separate repair levers for cold start, state drift, weak verification, scope sprawl, and failed handoff.
- The repo-local KB overlap is strong. The course's "repository as system of record" is the coding-agent version of this KB's own schema: raw sources, wiki synthesis, indexes, and log history.
- The feature-list primitive is worth preserving because it joins planning, scheduling, verification, and handoff into one machine-readable artifact.
- The best reusable operational rule is "add the smallest artifact that fixes the observed failure mode." It keeps harness engineering from becoming documentation sprawl.
- The `harness-creator` skill is useful as a meta-harness artifact: it makes harness creation, assessment, references, and eval coverage portable across coding-agent runtimes.
- The internal validator's result on Project 06 is informative but also a reminder that structural validators can miss naming variants and cannot prove real agent reliability by themselves.
- The multilingual breadth is useful for course distribution, but from a KB standpoint most localized copies are not independent evidence.

## Open Questions

- Should this KB adopt a dedicated `harness-creator` skill, or are the repo's existing `AGENTS.md`, ingest workflow, and validation scripts already sufficient?
- Should `feature_list.json` become a first-class task-state artifact in this research repo, or would it add friction to a source-ingest workflow that is already log/index driven?
- Which of the course's numeric claims trace to OpenAI, Anthropic, or internal experiments, and which are illustrative course claims?
- Can the capstone benchmark be adapted into a real before/after agent-session eval for this KB's own ingest and coding workflows?
- Should repo-local KB pages gain a standard "startup readiness" or "clean handoff" checklist derived from this source?

## Related

- [[agent-harnesses]]
- [[context-engineering]]
- [[repo-local-knowledge-bases]]
- [[workflows]]
- [[agent-skills]]
- [[ai-agent-evals]]
- [[durable-execution]]
- [[internal-engineering-conventions]]
- [[2026-06-04-learn-harness-engineering-kb-upgrades]]

## Source Text

Selected source text and anchors inspected:

- `README.md`: course framing, quick start, five-subsystem model, 12 lectures, 6 projects, and capstone scope.
- `CLAUDE.md`: VitePress structure, multilingual docs rule, project layout, and English-as-source-of-truth guidance.
- `package.json`: docs build, preview, PDF export, screenshot, and lecture-run scripts.
- `.github/workflows/deploy-pages.yml`: GitHub Pages build and deployment flow.
- `.github/workflows/release-course-pdfs.yml`: course PDF artifact and release workflow.
- `docs/.vitepress/config.mts`: multilingual VitePress configuration, navigation, sidebars, Mermaid, and base path.
- `docs/en/index.md`: course welcome and harness-learning overview.
- `docs/en/lectures/lecture-01-why-capable-agents-still-fail/index.md`: capability gap, harness-induced failure, verification gap, diagnostic loop, and definition-of-done framing.
- `docs/en/lectures/lecture-02-what-a-harness-actually-is/index.md`: prompt file versus harness, repo as source of truth, and five-subsystem model.
- `docs/en/lectures/lecture-03-why-the-repository-must-become-the-system-of-record/index.md`: knowledge visibility gap, fresh-session test, knowledge decay, and ACID analogy.
- `docs/en/lectures/lecture-04-why-one-giant-instruction-file-fails/index.md`: instruction bloat, low signal-to-noise, root file as router, and progressive disclosure.
- `docs/en/lectures/lecture-05-why-long-running-tasks-lose-continuity/index.md`: state persistence, compaction versus reset, progress logs, and handoff routines.
- `docs/en/lectures/lecture-06-why-initialization-needs-its-own-phase/index.md`: startup readiness checklist, initialization phase, and clean checkpoint commit.
- `docs/en/lectures/lecture-07-why-agents-overreach-and-under-finish/index.md`: WIP=1, externalized scope surface, and verified completion rate.
- `docs/en/lectures/lecture-08-why-feature-lists-are-harness-primitives/index.md`: feature list as scheduler, verifier, handoff reporter, and progress tracker primitive.
- `docs/en/lectures/lecture-09-why-agents-declare-victory-too-early/index.md`: external completion judgment, worker/checker split, and three-layer termination.
- `docs/en/lectures/lecture-10-why-end-to-end-testing-changes-results/index.md`: full-pipeline verification, executable architecture rules, and agent-oriented error messages.
- `docs/en/lectures/lecture-11-why-observability-belongs-inside-the-harness/index.md`: runtime logs, task traces, sprint contracts, and evaluator rubrics.
- `docs/en/lectures/lecture-12-why-every-session-must-leave-a-clean-state/index.md`: clean state, quality document, cleanup loop, and harness simplification.
- `docs/en/resources/reference/method-map.md`: failure-mode-to-artifact map for cold start, scope sprawl, premature completion, fragile startup, weak handoff, and subjective review.
- `docs/en/resources/openai-advanced/index.md`: opinionated repository shape derived from OpenAI harness-engineering guidance.
- `docs/en/resources/templates/*`: reusable `AGENTS.md`, `CLAUDE.md`, feature list, progress, init, handoff, clean-state, quality, and evaluator templates.
- `docs/en/projects/*/index.md`: six-project progression from weak baseline through capstone harness.
- `projects/project-06/solution/AGENTS.md`: capstone startup workflow, Electron boundaries, structured logging, and definition of done.
- `projects/project-06/solution/CLAUDE.md`: quick-reference IPC channels, architecture rules, and feature-addition workflow.
- `projects/project-06/solution/feature_list.json`: capstone feature-state surface.
- `projects/project-06/solution/docs/ARCHITECTURE.md`: Electron main/preload/renderer/service boundaries.
- `projects/project-06/solution/docs/PRODUCT.md`: product scope for personal knowledge-base app.
- `projects/project-06/solution/docs/RELIABILITY.md`: runtime reliability and harness expectations.
- `projects/project-06/solution/src/main/*`: main-process services, IPC registration, document import, indexing, mock Q&A, persistence, and structured logging.
- `projects/project-06/solution/src/preload/*`: namespaced bridge for renderer-safe APIs.
- `projects/project-06/solution/src/renderer/*`: React UI, panels, state, and user-facing app workflow.
- `projects/project-06/solution/src/shared/types.ts`: shared document, chunk, log, feedback, answer, and IPC types.
- `projects/project-06/solution/scripts/benchmark.sh`: capstone benchmark entrypoint.
- `projects/project-06/solution/scripts/cleanup-scanner.sh`: cleanup and maintainability scanner.
- `projects/project-06/solution/scripts/check-architecture.sh`: Electron architecture-boundary checks.
- `skills/harness-creator/SKILL.md`: skill trigger, five-subsystem model, create/audit/report workflows, references, design rules, and deliverable checklist.
- `skills/harness-creator/README.md`: install, scripts, what the skill creates, structural-score boundary, and file layout.
- `skills/harness-creator/scripts/create-harness.mjs`: scaffolds a minimal harness from templates and detected verification commands.
- `skills/harness-creator/scripts/validate-harness.mjs`: structural scoring for the five harness subsystems.
- `skills/harness-creator/scripts/run-benchmark.mjs`: structural benchmark plus eval-coverage report.
- `skills/harness-creator/scripts/lib/harness-utils.mjs`: project detection, verification-command inference, scoring, and report helpers.
- `skills/harness-creator/evals/evals.json`: ten eval cases covering minimal harness creation, continuity, assessment, verification, memory taxonomy, tool safety, context budget, multi-agent coordination, bootstrap, and scripted validation.
- `skills/harness-creator/references/context-engineering-pattern.md`: context budget, progressive disclosure, and context-cache discipline.
- `skills/harness-creator/references/memory-persistence-pattern.md`: instruction memory, auto-memory, topic files, and two-step save invariant.
- `skills/harness-creator/references/tool-registry-pattern.md`: tool safety, permission classification, and concurrency policy.
- `skills/harness-creator/references/multi-agent-pattern.md`: coordinator/worker/reviewer boundaries and ownership rules.
- `skills/harness-creator/references/lifecycle-bootstrap-pattern.md`: startup, handoff, hooks, and long-running work.
- `skills/harness-creator/references/skill-runtime-pattern.md`: skills as procedural memory with progressive disclosure.
- `skills/harness-creator/references/gotchas.md`: non-obvious harness failure modes.
