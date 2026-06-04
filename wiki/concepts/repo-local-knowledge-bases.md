---
id: concept-repo-local-knowledge-bases
type: concept
title: Repo-Local Knowledge Bases
tags: [knowledge-bases, repo-knowledge, coding-agents, markdown, obsidian, project-memory]
source_count: 5
summary: Repo-local knowledge bases are committed project-memory layers that help coding agents and humans reuse product, codebase, design, decision, progress, verification, and handoff knowledge without rereading the whole source tree.
canonical_for: [repo-local knowledge base, project knowledge vault, codebase knowledge vault, repository memory]
review_status: reviewed
last_reviewed: 2026-06-04
review_due: 2026-07-04
confidence: "0.83"
---

# Repo-Local Knowledge Bases

## Summary

A repo-local knowledge base is a committed project-memory layer inside or next to a codebase. It preserves product truth, codebase conventions, design rules, raw snapshots, decision records, glossary entries, loadouts, progress state, verification evidence, and activity logs so future agents and humans can orient without rereading every file. It differs from private agent memory because it is inspectable, versioned, and shared with the repo.

Conformis is the clearest local example: `conformis-knowledge/` is part of the done condition for substantive work. Aya provides the complementary caution: the shared AI research KB is useful during development, but the runtime product knowledge surface must remain tenant-owned agency content, not the internal architecture KB. Learn Harness Engineering adds the coding-agent operating version: repo files should carry startup readiness, feature state, progress, handoff, clean-state evidence, and verifier commands so fresh sessions can resume without reconstructing state from chat.

## When It Helps

- The repo has domain concepts a generic agent will not infer safely.
- Design, product, compliance, or architecture decisions matter across sessions.
- The codebase contains patterns that are easy to break by copying a generic framework example.
- Agents need bounded lookup paths: index first, glossary second, loadout third, grep only when needed.
- Raw sources or dated snapshots need preservation, but current product truth needs synthesis.
- Fresh coding-agent sessions need a reliable answer to what is running, what passed, what is blocked, and what the next active feature is.

## Recommended Shape

- `index.md` catalog of every page.
- `log.md` append-only history of ingests and substantive updates.
- `raw/` immutable source snapshots.
- Topic folders for product/domain, codebase, design, operations, and meta/schema.
- `_index.md` pages per folder.
- Glossary or alias map for quick lookup.
- Loadouts for recurring task types.
- Templates for source, concept, pattern, decision, and entity pages.
- Feature state, progress, handoff, and clean-state artifacts when the repo is used by coding agents across sessions.
- Clear rule for when a code change requires a knowledge update.

## Boundaries

- A repo-local KB is not a replacement for tests, lint rules, schemas, or package boundaries.
- It should not store secrets or mutable environment values.
- It should not turn raw source into an unreviewed rewriting surface; raw snapshots stay immutable.
- It should not be auto-expanded wholesale into every agent context. Index and glossary routing matter.
- It should distinguish development knowledge from runtime product knowledge, especially in multi-tenant or privacy-sensitive products.
- It should not let project-state files become unverified optimism; completion state needs evidence and runnable checks.

## Related

- [[personal-knowledge-bases]]
- [[research-workflows]]
- [[codebase-architecture]]
- [[internal-engineering-conventions]]
- [[context-engineering]]

## Source Notes

- [[2026-05-27-conformis]]
- [[2026-05-27-aya]]
- [[2026-04-08-llm-knowledge-bases]]
- [[2026-05-09-contextlattice]]
- [[2026-06-04-walkinglabs-learn-harness-engineering]]
- [[2026-05-27-aya-conformis-internal-codebase-patterns]]
