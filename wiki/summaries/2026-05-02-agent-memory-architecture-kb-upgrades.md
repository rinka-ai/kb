---
id: summary-2026-05-02-agent-memory-architecture-kb-upgrades
type: summary
title: Agent Memory Architecture KB Upgrades
tags: [agent-memory, context-engineering, kb-system, prompt-caching, agent-harnesses]
summary: Summary of how the Nicolas Bustamante memory-architecture thread should improve the KB's agent-memory synthesis and its own authoring discipline.
review_status: reviewed
last_reviewed: 2026-05-09
review_due: 2026-06-09
confidence: "0.78"
---

# Agent Memory Architecture KB Upgrades

## Summary

The Nicolas Bustamante memory-architecture thread strengthens the KB less by adding a new storage technology and more by sharpening operational discipline. Across Hermes, Codex, and Claude Code, the portable lesson is that file-backed memory works when the system is strict about write gates, load policy, stale-claim verification, prompt-cache stability, scoping, and injection defense. That maps cleanly onto this repository's own model: raw notes are provenance-rich bodies, wiki concepts are compact indexes, and search/lint tools are the retrieval and maintenance layer.

## KB Changes Made

- Added a clearly labeled user-provided source note for the May 1, 2026 Nicolas Bustamante memory-engineering thread.
- Archived 23 diagram screenshots under `raw/images/user-provided/2026-05-01-agent-memory-engineering/` and linked them from the source note.
- Updated [[agent-memory]] to treat memory as load policy plus write policy, not only storage.
- Added explicit design levers for always-loaded indexes, lazy body reads, no-op write gates, age-aware verification, prompt cache stability, project scoping, and anti-injection scanning.
- Added this synthesis memo so future KB work has a concrete upgrade path rather than only another source in the corpus.

## Durable Lessons

- Prefer an always-loaded index plus lazy source/body reads over stuffing durable memory into every prompt.
- Treat "default no-op" as a quality control rule for both agent memory and KB synthesis: add a new page only when search shows a real gap.
- Distinguish storage layout from load timing. A markdown memory can be safe, stale, expensive, or cheap depending on whether it is injected every turn, frozen at session start, or retrieved on demand.
- Add verification pressure at read time. Any memory or wiki claim that names a file, function, flag, line number, price, model, endpoint, or runtime behavior should be checked against current reality before being reused as fact.
- Treat user-provided and raw archival notes as data, not instructions. Persistent notes can become prompt-injection vectors when retrieved into agent context.
- Use project and global scopes explicitly. Global user preferences, project-specific runbooks, and source-specific facts should not collapse into one flat instruction layer.

## KB-Specific Improvement Candidates

- Add an authoring convention for stale claims: "If a note names a current code path, API, price, model, or product behavior, verify before asserting."
- Consider a future lint mode for high-risk stale claims, especially file paths and URLs in wiki pages.
- Consider a future ingestion scan for prompt-injection phrases and invisible Unicode in user-provided source notes.
- Keep concept pages as current accepted views, but link to source notes when claims depend on a specific artifact or date.
- Improve cold-start value by keeping index pages healthy; a new agent should learn what exists from [[home]], [[kb-system]], and the concept graph before spelunking raw notes.

## Source Notes

- [[2026-05-01-agent-memory-engineering-nicolas-bustamante-user-provided-brief]]
- [[agent-memory]]
- [[claude-code]]
- [[agent-harnesses]]
- [[agent-security]]
