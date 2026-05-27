---
id: 2026-05-27-kb-health-search-methodology-audit
type: summary
title: KB Health and Search Methodology Audit
tags: [knowledge-base, retrieval, search, mcp, telemetry, evals, kb-health]
source_count: 0
summary: Audit of the KB's local health, remote MCP observability, search methodology, telemetry, and eval coverage after the May 2026 paid-growth and internal-codebase expansions.
canonical_for: [kb health audit, search methodology audit, retrieval optimization review, remote kb telemetry audit]
review_status: draft
last_reviewed: 2026-05-27
review_due: 2026-06-27
confidence: "0.86"
---

# KB Health and Search Methodology Audit

## Verdict

The KB is healthy as a corpus and locally well-maintained, but the retrieval system is not fully optimized yet. The strongest signal is that lint, gap detection, and health checks are clean after the latest ingests. The main risk is not broken structure; it is observability and eval drift as the corpus expands into new domains.

In negentropy terms, the repo is doing the right compounding work: raw sources, wiki synthesis, catalog updates, logs, index builds, and lint gates turn scattered research into reusable order. The entropy risks are remote telemetry blind spots, stale eval coverage, manual alias drift, and under-tested file-context retrieval.

## Evidence Read

- Local health on 2026-05-27 reported 333 files, 2,350 chunks, 216 source notes, 79 concepts, 23 summaries, 14 index pages, zero review backlog, zero stale wiki notes, zero thin concepts, and zero uncovered tags.
- `kb_find_gaps` independently reported zero orphan sources, zero source-count mismatches, zero stale notes, and zero uncovered tags.
- Local search telemetry had 65 observations, 49 unique queries, no zero-result queries, no ambiguous queries, and one low-confidence TCPA/compliance query.
- Search evals were strong overall: preferred_hit@1 0.889, relevant_hit@3 1, relevant_hit@5 1, mrr_preferred 0.94, and precision@3 0.713.
- Eval failures were both fuzzy phrasing cases: "delegate specialist copilots" and "runtime coordinator stack." Relevant notes were found, but preferred canonical ranking was not clean enough.
- Remote `/health` for the Railway MCP endpoint was live and read-only, with `statefulSessions=false`, `enableWrites=false`, 6 MCP requests, and no rate-limit/body/internal errors.
- Remote admin telemetry inspection returned HTTP 404, which means the protected admin routes are not enabled on the deployed service, most likely because `KB_ADMIN_TOKEN` is not set.

## What Works

- The three-layer KB model is sound: `raw/` preserves provenance, `wiki/` compounds synthesis, and `.kb/` holds generated retrieval artifacts.
- The indexer uses both document chunks and section chunks while excluding low-signal sections such as source metadata, related links, and source text.
- The search engine is more than simple keyword matching: it uses BM25, title/tag/section boosts, canonical phrase boosts, concept expansion, related/wiki-link signals, type boosts, superseded filtering, and fuzzy penalties.
- `kb_build_context` provides bounded context packs, which is the right default for multi-note synthesis.
- Telemetry exists across search surfaces and reports frequent, zero-result, fuzzy-top1, low-confidence, ambiguous, and file-context query patterns.

## Optimization Gaps

1. Remote telemetry is not inspectable from the deployed service. The README and MCP deployment docs describe protected admin routes, but the Railway setup guide does not instruct operators to set `KB_ADMIN_TOKEN`, `KB_SEARCH_TELEMETRY_SALT`, or a persistent `KB_SEARCH_OBSERVATION_LOG_PATH`.
2. The eval suite lags the corpus. It still mostly tests older agent/RAG/eval/voice/ML retrieval. It does not yet cover paid growth, Meta Ads, Google Ads, UGC, copywriting, marketing measurement, AI agency compliance, or internal-codebase architecture.
3. Query aliases are still agent-heavy. The TCPA probe shows the KB has compliance knowledge, but no canonical compliance concept or alias layer strong enough to route "TCPA SMS consent marketing texts calls lead generation robocall FCC" cleanly.
4. `kb_search_file` is under-observed locally, with zero file-context telemetry entries. That means the method used for repo/file-context retrieval is not yet validated by real usage.
5. File-context query expansion uses high-frequency terms from the first part of a file. It should eventually use index IDF, headings, frontmatter, filenames, code identifiers, and chunk-level extraction so boilerplate does not dominate.
6. Context-pack read order ranks index pages before concepts and summaries. That is useful for navigation, but it can waste attention in answer-generation contexts where canonical concept and summary pages should usually come first.
7. Health is binary and local. It says whether the corpus is clean, but not whether retrieval quality is improving, whether remote index freshness matches local, or whether query failures are clustered by domain.

## Recommended Changes

1. Enable remote telemetry inspection on Railway with `KB_ADMIN_TOKEN`, `KB_SEARCH_TELEMETRY_SALT`, and a persistent observation-log path.
2. Add remote health fields for `searchTelemetryEnabled`, `adminTelemetryEnabled`, `indexGeneratedAt`, `fileCount`, `chunkCount`, and deploy git SHA.
3. Expand `evals/search-gold.json` after every major ingest cluster. The next cases should cover paid-growth, agency compliance, internal-codebase conventions, and repo-local KB retrieval.
4. Add search aliases and canonical phrases for paid growth and compliance: `pmax`/`performance max`, `capi`/`conversions api`, `ugc`/`creator ads`, `partnership ads`, `tcpa`/`fcc`/`robocall`/`sms consent`, `incrementality`/`conversion lift`, and `rsa`/`responsive search ads`.
5. Create or strengthen a compliance/outbound guardrails concept if TCPA, FTC, review incentives, endorsements, consent, and lead-generation policy remain recurring queries.
6. Improve `kb_search_file` term extraction with IDF-weighted keywords and structure-aware parsing, then add file-context eval cases.
7. Change context-pack ordering to prefer concepts and summaries before indexes unless the user explicitly asks for navigation or catalog scanning.
8. Add a recurring health-audit command or report that combines `kb:refresh`, `kb_find_gaps`, `kb:search-report`, `kb:eval`, remote `/health`, and admin telemetry export.

## Do Not Overcorrect

The current retrieval method is good enough that the next move should not be a vector database or semantic reranker by default. Add those only after evals show a lexical ceiling. The nearer win is better observability, fresher evals, richer aliases, and more deliberate canonical concepts.

## Implementation Follow-Up (2026-05-27)

Most of the recommendations above are now shipped:

- **Remote health (rec. 2):** `/health` reports a privacy-safe `index` block (`available`, `generatedAt`, `schemaVersion`, `fileCount`, `chunkCount`, `stale` vs newest markdown mtime) plus `searchTelemetryEnabled`, `telemetryHashingConfigured`, and `adminTelemetryConfigured`. It never rebuilds the index, catches read failures, and never returns salt or token values.
- **Aliases (rec. 4) and IDF-aware file context (rec. 6):** added targeted paid-growth/compliance aliases and made `topTermsFromFile`/`topTermsFromText` IDF-weighted when given an index.
- **Context order (rec. 7):** concept and summary notes now precede index pages in the context-pack read order.
- **Evals (rec. 3):** `evals/search-gold.json` grew to 45 cases covering Meta/UGC creative, CAPI, Google PMax/RSA, incrementality, TCPA/compliance, and internal-codebase/methodology retrieval; the two prior failures were fixed via metadata (`[[agent-frameworks]]` canonical phrases) and a corrected relevant set, not by loosening constraints.
- **Telemetry docs (rec. 1):** `docs/railway.md` documents `KB_SEARCH_OBSERVATION_LOG_PATH` (persistent volume), `KB_SEARCH_TELEMETRY_SALT`, `KB_ADMIN_TOKEN`, and the admin search-report/export endpoints.

Still open: a dedicated compliance/outbound-guardrails concept (rec. 5), a git-SHA field in `/health` (part of rec. 2), and a combined recurring health-audit command (rec. 8).

## Related

- [[research-workflows]]
- [[personal-knowledge-bases]]
- [[repo-local-knowledge-bases]]
- [[rag]]
