---
id: article-2026-05-31-aya-conformis-latest-commits
type: source
title: "Aya And Conformis Latest Commit Lessons"
path: raw/articles/internal-codebases/2026-05-31-aya-conformis-latest-commits.md
author: Aya and Conformis
publisher: Local repositories
url:
date_published: 2026-05-31
date_added: 2026-05-31
tags: [internal-codebases, aya, conformis, frontend, nextjs, react, i18n, react-doctor, ui-patterns, knowledge-vault]
status: active
quality: medium
summary: "Latest Aya and Conformis commits show a useful maturity pattern: trim operator UI noise, prefetch intentful rows, persist product semantics, migrate infrastructure behind tests, and turn repeated React quality expectations into repository gates."
related: [codebase-architecture, internal-engineering-conventions, ai-interface-design, repo-local-knowledge-bases, 2026-05-31-aya-conformis-latest-commit-lessons]
superseded_by:
---

# Aya And Conformis Latest Commit Lessons

## Source Metadata

- Path: raw/articles/internal-codebases/2026-05-31-aya-conformis-latest-commits.md
- Author: Aya and Conformis
- Published: 2026-05-31
- Publisher: Local repositories
- URL:
- Local repos inspected: `/Users/josemanuelcerqueira/Desktop/aya` and `/Users/josemanuelcerqueira/Desktop/conformis`
- Aya branch inspected: `codex/vertical-tenant-modularity`
- Conformis branch inspected: `codex/next-intl-migration`
- Working tree note: Aya had a large staged/uncommitted verticalization and knowledge-vault draft set; Conformis had an unrelated local modification in `conformis-knowledge/.obsidian/graph.json`. This note records committed history plus one explicit Aya draft note read for context.
- Verification attempted: source inspection only; tests were not run.
- Explicitly excluded: secrets, generated caches, tenant data, call transcripts, and full private source dumps.

## TL;DR

Aya's latest meaningful commits are mostly operator-experience and product-semantics improvements: remove duplicate attention UI, prefetch row destinations on intent, stop leaking raw IDs into normal UI, and persist a normalized `latest_intent` on leads. Conformis' latest commits are mostly infrastructure and quality-system improvements: complete a `next-intl` migration, keep static/metadata files out of the Next proxy, enforce React Doctor in CI, and document the quality gate in the repo-local vault.

The shared lesson is that mature internal apps improve by turning observed friction into small durable rules: user-facing labels over IDs, prefetch only where the operator has shown intent, normalized product facts over repeated event inference, narrow middleware matchers, migration smoke tests, and quality gates that future agents must read.

## Key Claims

- Aya commit `246da85` removed a duplicate calls attention badge and kept the header stats focused on Today and Routed counts.
- Aya commit `9951b7f` added `router.prefetch()` on mouse enter and focus for calls, leads, and listings rows while keeping real links from auto-prefetching by default.
- Aya commits `02098b9` and `b233461` replaced raw ID fallbacks in quick search and lead lists with human-readable unknown labels, phone numbers, or emails.
- Aya commit `c5e4a12` added a normalized `leads.latest_intent` column, a DB check constraint, a backfill migration, API projection support, and transactional writes from request completion.
- The caller-intent write prefers the fixed wire-side `caller_intent` identifier over tenant question-answer data, so the lead row still updates when a tenant has no INTENT qualifying question.
- Conformis commits `884c38f` and `0b75bda` moved from a custom typed message module to `next-intl` request config, JSON message catalogs, `NextIntlClientProvider`, `getTranslations`, and `useTranslations`.
- Conformis commit `6ad1b8f` tightened the Next proxy matcher to leave static assets and file-based metadata endpoints alone, with smoke-test coverage.
- Conformis commit `42557f7` pinned `react-doctor`, added local and CI scripts, added a GitHub workflow, updated the PR template, and made the React quality convention mandatory agent reading.
- Aya already has a draft vault note, `aya-knowledge/design/conformis-design-lessons.md`, whose core point is to copy Conformis' design-knowledge operating model, not its visual language.

## Important Details

- The Aya prefetch pattern is intent-scoped. Rows call `prefetch(href)` on `onMouseEnter` and `onFocus`; hidden `<Link>` anchors use `prefetch={false}` so the list does not eagerly prefetch every row.
- The Aya row navigation code preserves keyboard access and avoids invalid nested anchors by using `role="link"` on rows/cards plus explicit handlers and real hidden anchors where table semantics need them.
- The UI cleanup commits reinforce the product rule that operator surfaces should show names, summaries, dates, statuses, phone numbers, emails, and consequences; raw identifiers belong in diagnostics or deep links.
- The caller-intent persistence commit puts the lead denormalization inside the same transaction as request completion, so a downstream failure rolls the lead update back with the request/event/outbox work.
- Conformis' next-intl migration kept the existing cookie-backed locale switch instead of changing URL shape, then used smoke tests that read source files to lock the migration contract.
- The migration completed in two stages: first register `createNextIntlPlugin` and request config, then split the message catalog into `messages/en.json` and `messages/pt.json`, add module typing, and convert server/client call sites.
- The proxy fix uses a matcher that excludes `.*\\..*`, covering favicon, icons, robots, manifests, sitemaps, and public file paths rather than maintaining a brittle filename list.
- React Doctor became a system, not a one-off cleanup: scripts, CI, PR checklist, AGENTS.md, a repo-local convention page, and a local skill all point at the same gate.
- The Conformis quality gate uses `--fail-on warning`, so warning-level diagnostics are treated as unacceptable regressions.

## Entities

- Aya repo: `/Users/josemanuelcerqueira/Desktop/aya`
- Aya latest merge commit: `fb0512ab8fa0ccc3003d5d82cd8feac9d1344182` (`[codex] Remove duplicate Calls attention badge`)
- Aya meaningful commits inspected: `246da859e483d2574ff6271516c4c91a1283760f`, `9951b7fe1d922c2443bdd6b043a4ddc2bf01a7e8`, `02098b981a1b082655dba7863358b8feb71e338c`, `b23346143632915278332e7014b1b0c380d879a4`, `c5e4a1223a3eaa7ce0dd1bd360e67e8a422b2c2f`
- Conformis repo: `/Users/josemanuelcerqueira/Desktop/conformis`
- Conformis latest commit: `0b75bda3060e45d7b024979e2a81a0697e609446` (`feat(web): complete next-intl migration`)
- Conformis meaningful commits inspected: `884c38fca7dd8077573d5ae9435410c7ac0c2a3d`, `6ad1b8f4e8a9665bdcc7b5846ea1ad7e5f804636`, `42557f7e464e78b5c6e6af6a026f3d9eb240913a`, `4265df55a2c7dd0da8e648598716218fc8a7e2bc`, `2cd099c627751ce16456e98a9c176f445a0c678a`
- Aya files inspected: `apps/web/src/components/calls-header-stats.tsx`, `apps/web/src/components/call-receipts-list.tsx`, `apps/web/src/components/leads-list.tsx`, `apps/web/src/components/properties-workspace.tsx`, `apps/web/src/components/command-palette.tsx`, `packages/db/src/requests/events.ts`, `packages/db/src/leads/schema/leads.ts`, `apps/api/src/routes/tenants/leads/projection.ts`, `apps/web/src/lib/operator-labels.ts`, `aya-knowledge/design/conformis-design-lessons.md`
- Conformis files inspected: `apps/web/next.config.ts`, `apps/web/src/i18n/request.ts`, `apps/web/src/i18n/server.ts`, `apps/web/src/i18n/catalogs.ts`, `apps/web/src/i18n/format.ts`, `apps/web/src/i18n/next-intl.d.ts`, `apps/web/src/lib/audit-plan-mutations.ts`, `apps/web/src/proxy.ts`, `.github/workflows/react-doctor.yml`, `.github/pull_request_template.md`, `AGENTS.md`, `conformis-knowledge/codebase/conventions/react-quality.md`

## My Notes

- Aya should consider copying Conformis' quality-gate operating model more than any individual Conformis component style. The useful transfer is "make recurring expectations executable and retrievable."
- Aya's prefetch commits are a good example of performance work that is tied to interaction semantics. It improves perceived speed without turning every table row into an eager network cost.
- The caller-intent commit is the strongest product-data lesson: if a field is a stable operator concept, normalize it at the write boundary instead of reconstructing it across projections forever.
- Conformis' next-intl migration shows a safe migration shape for framework infrastructure: install the framework, preserve old behavior, add smoke tests for wiring, then migrate call sites.
- The proxy matcher fix is a reminder that middleware should be treated as a public-route surface. Overmatching metadata and public files creates confusing failures outside ordinary page tests.
- The React Doctor gate is valuable because it joins agent instructions, docs, scripts, CI, and PR ritual. Any one of those alone would drift.

## Open Questions

- Should Aya add a React Doctor gate before the staged verticalization work lands, or wait until the web app settles after tenant vertical routing?
- Should Aya move to `next-intl`, or is its current small custom dictionary still cheaper than migration overhead?
- Should Aya's draft `aya-knowledge/` vault be committed as part of the verticalization work, and should it use Conformis-style loadouts for UI and data-routing tasks?
- Should the AI research KB promote "intent-scoped prefetch" and "no raw IDs in operator UI" into `[[ai-interface-design]]`?
- Should Conformis' source-reading smoke tests eventually be replaced by behavior-level tests for next-intl wiring, or are source guards intentional because the contract is architectural?

## Related

- [[codebase-architecture]]
- [[internal-engineering-conventions]]
- [[ai-interface-design]]
- [[repo-local-knowledge-bases]]
- [[2026-05-27-aya]]
- [[2026-05-27-conformis]]
- [[2026-05-30-conformis-cleanup-helpers-commit]]
- [[2026-05-31-aya-conformis-latest-commit-lessons]]

## Source Text

Selected source text and code anchors inspected (no secrets or large private code copied):

- Aya `git log --max-count=12`: latest merge wrappers include `[codex] Remove duplicate Calls attention badge`, `[codex] Add intent prefetch for workbench rows`, `[codex] Avoid ID fallbacks in quick search`, `[codex] Remove lead UID from list`, and `[codex] Persist lead caller intent`.
- Aya `246da85`: `apps/web/src/components/calls-header-stats.tsx` changed 50 lines, removing the attention badge and leaving `StatTile` values for today and routed counts.
- Aya `9951b7f`: `apps/web/src/components/call-receipts-list.tsx`, `leads-list.tsx`, and `properties-workspace.tsx` added `useRouter().prefetch` on row hover/focus.
- Aya `02098b9`: quick-search call and lead items stopped falling back to raw IDs and now use localized unknown-caller / unknown-lead labels.
- Aya `b233461`: the leads list stopped rendering `shortId(lead.id)` under the lead identity and instead shows phone/email as secondary human context when present.
- Aya `c5e4a12`: `packages/db/src/leads/schema/leads.ts` added `latest_intent` with a check constraint based on `CALLER_INTENTS`.
- Aya `c5e4a12`: `packages/db/src/requests/events.ts` added `resolveLatestCallerIntent`, preferring wire `caller_intent` and falling back to stamped qualifying-answer `intent`, then writing the lead row inside the request-completion transaction.
- Aya draft note `aya-knowledge/design/conformis-design-lessons.md`: says Aya should borrow Conformis' design-knowledge operating model and loadouts, not Conformis' electric-blue visual language or GRC vocabulary.
- Conformis `git log --max-count=12`: latest commits include `feat(web): complete next-intl migration`, `feat(web): migrate i18n to next-intl`, `fix(web): skip metadata in Next proxy`, `chore: enforce react doctor gate`, `fix(web): keep react doctor at 100`, and `refactor: centralize cleanup helpers`.
- Conformis `884c38f`: `apps/web/next.config.ts` registers `createNextIntlPlugin("./src/i18n/request.ts")`; `apps/web/src/i18n/server.ts` keeps cookie-backed locale resolution while `getRequestLocale()` reads through next-intl.
- Conformis `0b75bda`: `apps/web/src/i18n/messages.ts` was split into `messages/en.json` and `messages/pt.json`, `catalogs.ts` imports both, and `next-intl.d.ts` types `Locale` and `Messages`.
- Conformis `0b75bda`: `apps/web/src/app/layout.tsx` uses `getTranslations({ locale, namespace: "root" })` for metadata and mounts `NextIntlClientProvider`.
- Conformis `6ad1b8f`: `apps/web/src/proxy.ts` changed the matcher to exclude `_next/static`, `_next/image`, and paths matching `.*\\..*` so static files and metadata endpoints bypass AuthKit proxy work.
- Conformis `42557f7`: root `package.json` added `doctor:react`, `doctor:react:ci`, `doctor:react:diff`, and `doctor:react:score`; `.github/workflows/react-doctor.yml` runs the gate on pull requests and `main`.
- Conformis `42557f7`: `conformis-knowledge/codebase/conventions/react-quality.md` documents React Doctor 100, `--fail-on warning`, and the requirement that agents read the page before React/Next.js work.
