---
id: summary-2026-07-27-kb-freshness-and-primary-source-refresh
type: summary
title: KB Freshness and Primary-Source Refresh
tags: [knowledge-base, kb-health, freshness, acquisition, protocols, observability, evals, compliance]
summary: A July 2026 maintenance cycle separated calendar age from source drift, re-tiered the full review backlog, and closed primary-source gaps in A2A, GenAI observability, tool-agent evaluation, lead compliance, and AI sales coaching.
source_count: 9
canonical_for: [july 2026 kb health audit, kb freshness policy, current kb acquisition priorities, primary source refresh]
review_status: reviewed
last_reviewed: 2026-07-27
review_due: 2026-10-25
confidence: "0.93"
---

# KB Freshness and Primary-Source Refresh

## Verdict

The KB needed a focused stale audit, not a broad repair. Before this cycle, lint and retrieval evaluation were already healthy, and all 79 overdue concept/summary pages were calendar-overdue rather than contradicted by newer linked evidence. The maintenance problem was an undifferentiated 30-day review clock that treated stable historical syntheses like active protocols and vendor products.

The KB also benefited from targeted ingestion, not indiscriminate volume. Nine primary sources closed identifiable provenance gaps:

- agent-to-agent interoperability: [[2026-05-28-agent2agent-a2a-protocol-v1-0-1]]
- GenAI and MCP observability: [[2026-07-25-opentelemetry-generative-ai-semantic-conventions]]
- policy-constrained tool-agent evaluation: [[2024-06-17-tau-bench-tool-agent-user-interaction]] and [[2026-07-22-tau2-bench-v1-0-1]]
- function-calling evaluation: [[2025-07-13-berkeley-function-calling-leaderboard]] and [[2026-04-12-berkeley-function-calling-leaderboard-v4]]
- lead-generation and AI-voice compliance: [[2016-09-01-ftc-follow-the-lead]] and [[2024-02-08-fcc-ai-generated-voices-tcpa]]
- experimental AI sales coaching: [[2020-10-14-ai-coaches-for-sales-agents]]

## Health Model Upgrade

Freshness now has three distinct signals:

- **missing metadata** — the page cannot be governed because review state is absent;
- **source drift** — linked evidence is newer than the page review and should be handled first;
- **calendar overdue** — the page reached a scheduled checkpoint without newer linked evidence.

Review windows are tiered:

- 45 days for fast-moving products, protocols, security, compliance, and platforms;
- 90 days for operational concepts and decision guides;
- 180 days for stable theory, historical teardowns, and bounded assessments.

`last_reviewed` now represents an actual check of claims, provenance, contradictions, and source counts. A review does not promote a draft automatically. Deliberately narrow pages may use `coverage_status: intentionally-thin` with an explicit scope note; count mismatches and freshness checks still apply.

## Audit Outcome

- All 79 formerly overdue pages were reviewed against their summaries, tags, linked-source dates, and declared source counts.
- No page had linked-source drift at baseline.
- Review status was preserved: drafts remain drafts where evidence is incomplete.
- [[obsidian]] is explicitly bounded and intentionally thin rather than attracting low-value ingestion.
- The stricter three-source gap check now reports no unjustified thin concepts.
- All nine new sources are linked from concepts; none are orphaned.
- Declared concept source counts match linked source notes.
- [[agent-observability]] is now a canonical concept instead of leaving telemetry scattered across harness and managed-agent pages.

## What The New Sources Change

### Protocols

A2A supplies a pinned primary source for agent discovery and collaboration. Agent Cards, tasks, messages, artifacts, streaming, and push notifications create a cross-runtime interface while preserving agent opacity. A2A complements MCP's agent-to-tool/context role; neither protocol supplies complete authorization, delegation, or trust policy.

### Observability

OpenTelemetry's dedicated GenAI conventions provide a portable trace vocabulary across model clients, agent invocation, retrieval, tools, and MCP. The operational rule is metadata-first telemetry: prompts, responses, tool payloads, and retrieved documents are sensitive and require explicit redaction, sampling, access, and retention controls.

### Evals

τ-bench/τ2 and BFCL cover different layers. BFCL tests tool-call structure, parallelism, abstention, state, memory, live data, and format sensitivity. τ-bench tests whether policy-constrained dialogue and tool use leave the environment and user communication in the correct state, including repeated-run and voice-interaction quality. Production eval portfolios need both local tool correctness and end-to-end outcome checks.

### Commercial Workflows

FTC and FCC primary sources make “possession is not permission” explicit for database reactivation. Provenance, disclosure, suppression, channel, purpose, jurisdiction, and consent evidence belong before scoring or outreach. The sales-coaching paper adds experimental support for segmented feedback and AI-human coaching while warning against overload and top-performer aversion.

## MCP Release Constraint

As of 2026-07-27, the latest final MCP specification is `2025-11-25`. `2026-07-28-RC` is a release candidate, not the final specification. The existing MCP source note records this status, but the KB should ingest and compare the final `2026-07-28` release only after it is actually published.

## Next Acquisition Rules

Do not ingest broadly just to increase note count. The next source should satisfy at least one of these:

- it is a final specification or versioned artifact that changes a canonical protocol;
- it provides independent replication or production evidence for a heavily used claim;
- it closes a legal, security, or operational decision gap for a workflow being deployed;
- it is the full primary paper behind a claim currently supported only by an abstract;
- repeated search telemetry shows a real retrieval gap that aliases or synthesis cannot solve.

Near-term watch items are the final MCP `2026-07-28` specification, stable releases of OpenTelemetry GenAI conventions, independent A2A deployment evidence, benchmark validation across simulators and live environments, current jurisdiction-specific outreach rules, and full-method access to the AI sales-coaching study.

## Related

- [[agent-protocols]]
- [[agent-observability]]
- [[ai-agent-evals]]
- [[benchmark-integrity]]
- [[database-reactivation]]
- [[sales-coaching-gpt]]
- [[2026-04-10-kb-acquisition-priorities]]
- [[2026-05-27-kb-health-search-methodology-audit]]
