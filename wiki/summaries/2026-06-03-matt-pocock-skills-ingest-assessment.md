---
id: summary-2026-06-03-matt-pocock-skills-ingest-assessment
type: summary
title: Matt Pocock Skills Ingest Assessment
tags: [agent-skills, coding-agents, engineering-workflows, claude-code, tdd, debugging]
summary: "Matt Pocock's skills repo is worth a targeted repo-level ingest for agentic engineering workflow design, especially diagnosis, domain-language grilling, TDD, issue triage, and architecture deepening; the subsequent ingest preserved it as one GitHub-repo source note rather than copying every skill wholesale."
source_count: 1
canonical_for: [matt pocock skills ingest assessment, mattpocock skills, skills for real engineers]
review_status: draft
last_reviewed: 2026-06-03
review_due: 2026-07-03
confidence: "0.84"
---

# Matt Pocock Skills Ingest Assessment

## Summary

`mattpocock/skills` was worth a targeted repo-level ingest, not a per-file bulk ingest. The durable value is the way the repo packages ordinary software-engineering discipline into small, composable agent skills: clarify the domain language, build feedback loops, test through public interfaces, slice work vertically, keep issue briefs durable, and use architecture reviews to deepen shallow modules.

The assessment inspected all 72 non-`.git` files from `mattpocock/skills` at commit `aaf2453fbdfe7a15c07f11d861224f34ab4b53cb` dated `2026-05-31`. The approved follow-up preserved the repository as [[2026-06-04-mattpocock-skills]].

## What Is Worth Keeping

- `diagnose`: feedback loop first, then reproduce, rank falsifiable hypotheses, instrument one variable at a time, fix, regression-test, and clean up debug probes.
- `grill-with-docs`: an interview loop that converts fuzzy requirements into a domain glossary and tiny ADRs, while checking claims against code.
- `tdd`: vertical red-green-refactor cycles, one behavior at a time, with tests through public interfaces rather than implementation details.
- `improve-codebase-architecture`: a compact vocabulary for architecture review: module, interface, implementation, depth, seam, adapter, leverage, and locality.
- `prototype`: throwaway prototypes should answer a named question, surface state, run with one command, and be deleted or absorbed after the lesson is captured.
- `to-issues`, `to-prd`, and `triage`: issue work should be sliced vertically, written as durable behavior contracts, and avoid brittle file-path or line-number instructions.
- `.out-of-scope/`: rejected feature requests can become a tiny repo-local knowledge base so future triage does not re-litigate old decisions.

## What Not To Preserve Wholesale

- Do not ingest the deprecated, in-progress, and personal folders as canonical guidance. They are useful as design history, but the repo itself marks them as non-promoted or rough.
- Do not add `setup-matt-pocock-skills` here unmodified. It writes an `Agent skills` block and `docs/agents/` conventions, while this repo already treats `AGENTS.md` as the canonical instruction schema.
- Do not copy the `obsidian-vault`, `scaffold-exercises`, `migrate-to-shoehorn`, or `setup-pre-commit` skills into this repo as general development guidance. They are too setup-specific or already covered by local conventions.
- Do not promote `caveman` as a default communication mode. It is useful as an opt-in compression trick, but conflicts with the repo's accuracy and explanation standards if made ambient.

## Skill Recommendation

If adding exactly one Matt Pocock skill for better development, add or adapt `diagnose` first. It is the best fit because it complements the current KB and Codex workflow without needing new repo configuration, issue-tracker labels, or a separate documentation schema.

The second-best candidate is an adapted `grill-with-docs`, but only if its `CONTEXT.md` and ADR assumptions are mapped into this repo's existing wiki and `AGENTS.md` model. Add it as an explicit user-invoked planning skill, not as a default mode.

`tdd` is also useful, but this environment already has strong verification habits and several React/code-quality skills. `diagnose` fills a clearer gap: disciplined debugging when a bug or performance regression appears.

## Full Ingest Recommendation

The full ingest preserved one targeted source note under `raw/articles/github-repos/` and synthesized the stable engineering skills into:

- [[agent-skills]]
- [[internal-engineering-conventions]]
- [[codebase-architecture]]
- [[claude-code]]
- [[research-workflows]]

The ingest did not store every skill as a separate source note. One repo-level source note plus this compact assessment is enough.

## Source Notes

- GitHub repository: https://github.com/mattpocock/skills
- Inspected commit: `aaf2453fbdfe7a15c07f11d861224f34ab4b53cb`
- Source note: [[2026-06-04-mattpocock-skills]]

## Related

- [[agent-skills]]
- [[internal-engineering-conventions]]
- [[codebase-architecture]]
- [[claude-code]]
- [[research-workflows]]
