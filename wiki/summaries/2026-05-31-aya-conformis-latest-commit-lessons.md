---
id: summary-2026-05-31-aya-conformis-latest-commit-lessons
type: summary
title: Aya And Conformis Latest Commit Lessons
tags: [internal-codebases, aya, conformis, frontend, nextjs, react, i18n, ui-quality, repo-knowledge]
summary: "Latest Aya and Conformis commits show how small product/UI fixes and larger infrastructure migrations become reusable rules: intent-scoped prefetch, no raw IDs in operator UI, normalized product facts, narrow proxy matchers, tested i18n wiring, and executable React quality gates."
source_count: 1
canonical_for: [Aya Conformis latest commits, latest internal repo lessons, React Doctor gate lessons, next-intl migration lessons, operator UI commit lessons]
review_status: reviewed
last_reviewed: 2026-05-31
review_due: 2026-06-30
confidence: "0.82"
---

# Aya And Conformis Latest Commit Lessons

## Summary

The latest commits in `/Users/josemanuelcerqueira/Desktop/aya` and `/Users/josemanuelcerqueira/Desktop/conformis` are useful because they show two complementary kinds of compounding.

Aya is polishing the operator surface and product data model: fewer duplicate badges, faster row navigation after intent, no raw IDs in ordinary UI, and a normalized lead caller-intent field written at request completion. Conformis is hardening framework and quality infrastructure: `next-intl` migration, static/metadata proxy exclusions, React Doctor scripts/CI/docs, and repo-local quality rules.

The reusable lesson is to turn repeated friction into durable, inspectable rules. Do not just fix the row, the label, the proxy, or the migration once. Encode the rule in helpers, tests, docs, agent instructions, or knowledge-vault loadouts so the next session starts from the better pattern.

## Commit Inventory

- Aya `246da85` / merge `fb0512a`: removed a duplicate Calls attention badge and kept the calls header to Today and Routed stats.
- Aya `9951b7f` / merge `3fd8f03`: added row destination prefetch on hover/focus for calls, leads, and listings.
- Aya `02098b9` and `b233461`: removed raw ID fallbacks from quick search and lead list identity surfaces.
- Aya `c5e4a12`: persisted `leads.latest_intent` from wire-side `caller_intent` or stamped qualifying answers inside request completion.
- Conformis `884c38f` and `0b75bda`: migrated the app to `next-intl` while preserving cookie-backed locale behavior and typed message catalogs.
- Conformis `6ad1b8f`: excluded static assets and file-based metadata routes from the Next proxy matcher.
- Conformis `42557f7` and `4265df5`: turned React Doctor 100 into a repo-level quality gate with scripts, CI, PR template, AGENTS.md rules, and a vault convention page.

## Lessons

- **Prefetch after intent, not by default.** Aya's rows call `router.prefetch()` on hover/focus while disabling automatic `<Link>` prefetch on dense lists. That is a good default for operational tables: fast when the user points at a row, cheap when they are only scanning.
- **Operator UI should not leak implementation IDs.** Aya replaced IDs with unknown labels, phone/email context, and human-readable summaries. IDs stay useful for diagnostics, but normal workflow surfaces should show the thing an operator recognizes.
- **Normalize stable product semantics at write time.** `latest_intent` is a better lead-list field than repeatedly inferring the caller journey from events and question answers. The transaction boundary matters: request completion, event writes, optional outbox work, and lead denormalization should succeed or roll back together.
- **Framework migrations need behavior locks.** Conformis did not simply install `next-intl`; it kept cookie locale resolution, wired the request config through Next, moved catalogs to JSON, typed the catalog, and added smoke tests that assert the intended wiring.
- **Middleware matchers are product behavior.** The proxy fix is small but important: file-based metadata and public files must bypass AuthKit session work. Matchers deserve tests because failures show up as broken icons, manifests, robots, or Open Graph assets rather than obvious page errors.
- **Quality gates work when they are social and executable.** React Doctor became a script, CI workflow, PR checklist, AGENTS.md requirement, repo-local convention, and local skill. That combination makes the rule much harder to forget than a one-off cleanup note.
- **Copy operating models, not skins.** Aya's draft Conformis design-lessons note gets this right: borrow Conformis' pattern catalog, loadouts, and operational-surface discipline, not its blue palette, GRC vocabulary, or app-shell assumptions.

## Apply Next

- Before Aya lands its large staged verticalization work, consider adding a scoped React quality gate or at least a `doctor:react:diff`-style check for `apps/web`.
- Keep Aya's draft `aya-knowledge/` vault small and loadout-driven: design, dashboard discipline, data routing, vertical access, and voice flow are enough to start.
- Promote "no raw IDs in operator UI" and "intent-scoped row prefetch" into future app-template guidance.
- Treat next-intl as optional for Aya. The migration pattern is reusable, but the library is only worth adopting if the current custom dictionary starts creating real maintenance drag.

## Source Notes

- [[2026-05-31-aya-conformis-latest-commits]]
