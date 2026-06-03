---
id: article-2026-06-04-mattpocock-skills
type: source
title: "mattpocock/skills"
path: raw/articles/github-repos/2026-06-04-mattpocock-skills.md
author: Matt Pocock
publisher: GitHub
url: https://github.com/mattpocock/skills
date_published:
date_added: 2026-06-04
tags: [agent-skills, coding-agents, claude-code, engineering-workflows, tdd, debugging, github-repos]
status: active
quality: high
summary: "Matt Pocock's skills repo packages practical software-engineering discipline into composable agent skills: diagnosis, domain-language grilling, TDD, prototype loops, issue triage, durable briefs, and architecture deepening."
related: [agent-skills, internal-engineering-conventions, codebase-architecture, claude-code, research-workflows]
---

# mattpocock/skills

## Source Metadata

- Path: raw/articles/github-repos/2026-06-04-mattpocock-skills.md
- Author: Matt Pocock
- Published: Unknown
- Publisher: GitHub
- URL: https://github.com/mattpocock/skills
- Inspected revision: `aaf2453fbdfe7a15c07f11d861224f34ab4b53cb` on 2026-06-03.
- Latest commit metadata from clone: author Matt Pocock, commit date 2026-05-31, subject `Refine teaching skill documentation to enhance clarity and interactivity of explainers`.
- GitHub metadata checked 2026-06-03: `mattpocock/skills`, 116370 stars, 10193 forks, updated 2026-06-03.
- Files inspected: all 72 non-`.git` files, including README, plugin manifest, root context, ADR, stable engineering skills, productivity skills, misc skills, personal skills, in-progress skills, deprecated skills, out-of-scope notes, and helper scripts.
- Verification attempted: source inspection only; no skill installer or repo tests were run for the source repository.

## TL;DR

`mattpocock/skills` is useful to this KB as a concrete practitioner repo for agentic software-engineering workflow design. Its strongest contribution is not a new tool or model technique; it is the compression of durable engineering habits into small agent skills: build a feedback loop before debugging, ask clarifying questions against project language, write one behavior test at a time, slice plans vertically, write issues as durable behavior contracts, and review architecture through module depth and locality.

This repo should be ingested as one source note, not as separate source notes for every skill. The stable engineering skills are worth synthesizing; the personal, in-progress, deprecated, and setup-specific folders are useful context but should not become canonical guidance here without adaptation.

## Key Claims

- Agent skills are most useful when they package repeatable engineering procedure rather than generic motivational advice.
- Debugging should start by constructing a fast, deterministic feedback loop before hypothesizing about causes.
- Domain language matters for agentic development because concise shared terms reduce repeated explanation and improve names, tests, issues, and architectural proposals.
- `CONTEXT.md`-style glossaries and small ADRs can be produced lazily during planning instead of created as heavy upfront documentation.
- TDD works best as vertical red-green-refactor slices: one behavior test, minimal implementation, then repeat.
- Good tests verify behavior through public interfaces and should survive internal refactors.
- Issue and PRD writing for agents should avoid brittle file paths and line numbers, and should describe current behavior, desired behavior, key interfaces, acceptance criteria, and out-of-scope boundaries.
- Architecture review can be framed around module depth: a deep module has high leverage behind a small interface; a shallow module exposes complexity without earning locality.
- Prototype code should answer a named question, expose state, run with one command, and then be deleted or absorbed.
- Rejected enhancement requests can become a small `.out-of-scope/` knowledge base so future triage does not re-litigate the same scope decisions.
- The setup skill is intentionally repo-configuring and should not be copied into this KB unchanged because this repository already treats `AGENTS.md` as its canonical agent-instruction schema.

## Important Details

- `README.md` positions the repo as "Skills For Real Engineers" and contrasts these small composable skills with heavier process-owning systems.
- The plugin manifest promotes stable skills from `skills/engineering/` and `skills/productivity/`, while excluding personal, in-progress, and deprecated folders.
- `CONTEXT.md` defines the repo's own domain language around issue trackers, issues, and triage roles.
- `docs/adr/0001-explicit-setup-pointer-only-for-hard-dependencies.md` distinguishes hard-dependency skills from soft-dependency skills. Skills that cannot work without issue-tracker mappings mention setup explicitly; diagnosis, TDD, architecture review, and zoom-out degrade gracefully.
- `diagnose` is the best single skill to add/adapt for this environment. Its six-phase loop is: build feedback loop, reproduce, hypothesize, instrument, fix with regression test, then clean up and post-mortem.
- `diagnose` treats a bug without a feedback loop as not yet debuggable. It suggests tests, HTTP scripts, CLI fixtures, browser scripts, trace replay, throwaway harnesses, fuzz/property loops, bisection, differential testing, and a structured human-in-the-loop shell template.
- `grill-with-docs` interviews the user one question at a time, checks fuzzy terms against `CONTEXT.md`, verifies user claims against code, updates the glossary inline, and offers ADRs only for hard-to-reverse, surprising, trade-off decisions.
- `improve-codebase-architecture` uses a compact glossary: module, interface, implementation, depth, seam, adapter, leverage, and locality.
- The architecture skill's deletion test asks whether deleting a suspected module removes complexity or merely spreads it across callers.
- The architecture skill's seam rule is strict: one adapter is hypothetical; two adapters make a seam real.
- `tdd` forbids horizontal "write all tests then all implementation" work. It favors tracer-bullet vertical cycles.
- `tdd` and its reference files keep tests focused on behavior through public interfaces, with mocks reserved for system boundaries.
- `prototype` has two branches: terminal prototypes for logic/state/data-model questions, and browser UI variants for layout/product-shape questions.
- `to-issues` breaks plans into tracer-bullet issues, each delivering a narrow but complete path through the relevant layers.
- `to-prd` writes PRDs from existing conversation context rather than starting another interview, but asks the user to confirm intended testing seams.
- `triage` moves issues through canonical roles, attempts reproduction for bugs before grilling, and writes durable agent briefs when work becomes `ready-for-agent`.
- `AGENT-BRIEF.md` is one of the strongest artifacts in the repo: it treats the agent brief as the authoritative contract for future AFK work, emphasizing current behavior, desired behavior, key interfaces, acceptance criteria, and out-of-scope boundaries.
- `OUT-OF-SCOPE.md` turns rejected enhancement requests into concept-level markdown files that record decision, reason, and prior requests.
- `caveman` is an opt-in compression skill. It should not be adopted as this KB's default style because the KB values concise accuracy but still needs clear citations, nuance, and maintenance notes.
- `handoff` saves a temporary handoff document outside the workspace and avoids duplicating content already captured in durable artifacts.
- `write-a-skill` mirrors the broader skill-design pattern: concise trigger description, progressive disclosure, separate reference files when needed, and scripts for deterministic repeated work.
- `git-guardrails-claude-code` is Claude-specific hook guidance for blocking dangerous git commands. This KB already has similar higher-priority safety rules in `AGENTS.md`, so the local lesson is "guardrails can live in hooks," not "copy this exact hook."
- `setup-pre-commit`, `migrate-to-shoehorn`, `scaffold-exercises`, `obsidian-vault`, and the personal writing skills are too setup-specific to promote as general KB guidance.
- Deprecated skills show design history: `ubiquitous-language` evolved into `grill-with-docs`; `request-refactor-plan` overlaps with current PRD/issue/deepening flows; `qa` overlaps with triage; `design-an-interface` is now part of architecture review.

## Entities

- Repository: `mattpocock/skills`
- Author: Matt Pocock
- Stable engineering skills: `diagnose`, `grill-with-docs`, `triage`, `improve-codebase-architecture`, `setup-matt-pocock-skills`, `tdd`, `to-issues`, `to-prd`, `zoom-out`, `prototype`
- Stable productivity skills: `caveman`, `grill-me`, `handoff`, `write-a-skill`
- Misc skills: `git-guardrails-claude-code`, `migrate-to-shoehorn`, `scaffold-exercises`, `setup-pre-commit`
- Repo-local docs: `CONTEXT.md`, `docs/adr/0001-explicit-setup-pointer-only-for-hard-dependencies.md`, `.out-of-scope/*.md`
- Concepts: feedback loop, domain glossary, ADR, TDD, tracer bullet, vertical slice, agent brief, out-of-scope knowledge base, module depth, seam, adapter, locality, leverage

## My Notes

- The repo is a strong match for [[agent-skills]] because it demonstrates skills as compact procedural artifacts with clear trigger conditions and companion reference files.
- The reusable lesson is the workflow shape, not the exact file layout. This KB already has `AGENTS.md`, `wiki/`, `raw/`, and `wiki/log.md`; importing another setup convention would increase instruction surface without clear benefit.
- `diagnose` is the best immediate skill adoption because it does not require issue-tracker setup, domain docs, or Claude-specific hooks. It upgrades day-to-day development by forcing reproduction and falsifiable hypotheses before code changes.
- `grill-with-docs` is valuable but should be adapted carefully: this repo already uses `wiki/concepts/`, `wiki/summaries/`, and `wiki/log.md` for durable knowledge. A direct `CONTEXT.md`/`docs/adr` workflow would duplicate the KB schema.
- The architecture vocabulary is useful because it gives agents a compact language for code review and refactor discussion without drifting into generic "clean code" advice.
- The out-of-scope mini-KB is a useful pattern for issue-heavy repos: rejected ideas deserve durable memory too.
- The repo is high quality but not neutral evidence. It is one practitioner's local workflow corpus, so the KB should treat it as tested craft guidance rather than controlled empirical proof.

## Open Questions

- Should this KB grow its own `diagnose` skill derived from Matt Pocock's version, or is installing the upstream skill globally enough?
- Should `grill-with-docs` be adapted into a KB-aware skill that writes concept/log updates instead of `CONTEXT.md` and ADRs?
- Should the architecture-deepening vocabulary be merged into an existing code-review skill or kept as a separate invoked skill?
- How should agent brief templates change when the issue tracker is GitHub versus local markdown versus this KB's wiki/log structure?
- Should rejected KB-source candidates get `.out-of-scope/` style notes, or is the append-only `wiki/log.md` sufficient?

## Related

- [[agent-skills]]
- [[internal-engineering-conventions]]
- [[codebase-architecture]]
- [[claude-code]]
- [[research-workflows]]
- [[2026-06-03-matt-pocock-skills-ingest-assessment]]

## Source Text

Selected source text and anchors inspected:

- `README.md`: "Skills For Real Engineers"
- `README.md`: "small, easy to adapt, and composable"
- `README.md`: "Use them every time you want to make a change."
- `README.md`: "Invest in the design of the system every day."
- `.claude-plugin/plugin.json`: promoted skills include engineering and productivity folders, not personal, in-progress, or deprecated folders.
- `CONTEXT.md`: the repo defines "Issue tracker", "Issue", and "Triage role" as local domain language.
- `docs/adr/0001-explicit-setup-pointer-only-for-hard-dependencies.md`: setup pointers are reserved for skills where missing config makes output wrong.
- `skills/engineering/diagnose/SKILL.md`: phase one is to build a feedback loop.
- `skills/engineering/diagnose/SKILL.md`: "Build the right feedback loop, and the bug is 90% fixed."
- `skills/engineering/diagnose/SKILL.md`: hypotheses must be falsifiable and ranked before testing.
- `skills/engineering/grill-with-docs/SKILL.md`: ask one question at a time and explore the codebase when code can answer.
- `skills/engineering/grill-with-docs/CONTEXT-FORMAT.md`: `CONTEXT.md` is a glossary, not a spec.
- `skills/engineering/grill-with-docs/ADR-FORMAT.md`: an ADR can be a single paragraph.
- `skills/engineering/improve-codebase-architecture/LANGUAGE.md`: interface includes invariants, ordering constraints, errors, config, and performance facts.
- `skills/engineering/improve-codebase-architecture/LANGUAGE.md`: "One adapter means a hypothetical seam. Two adapters means a real one."
- `skills/engineering/tdd/SKILL.md`: one test, one implementation, then repeat.
- `skills/engineering/tdd/tests.md`: good tests verify observable behavior through public interfaces.
- `skills/engineering/prototype/SKILL.md`: a prototype is throwaway code that answers a question.
- `skills/engineering/to-issues/SKILL.md`: issues should be tracer-bullet vertical slices.
- `skills/engineering/triage/AGENT-BRIEF.md`: an agent brief is the authoritative specification for AFK work.
- `skills/engineering/triage/OUT-OF-SCOPE.md`: rejected enhancement requests are grouped by concept rather than issue.
