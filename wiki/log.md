---
id: wiki-log
type: log
title: Wiki Operations Log
summary: Append-only chronological record of ingest, query, lint, refresh, and maintenance events.
---

# Wiki Operations Log

Append-only. Newest entries at the **bottom**. Entry header format:

```
## [YYYY-MM-DD] <op> | <subject>
```

where `<op>` ∈ `ingest | query | lint | refresh | sync | note`. Body is 1–4 bullets covering files touched, wiki pages updated, and anything future-you would want to recall. Do not rewrite past entries — correct via a new entry instead.

See `AGENTS.md` → Agent Workflows for when to append. The master catalog of wiki pages is [[index]].

---

## [2026-05-14] note | LLM Wiki pattern adoption

- Rewrote `AGENTS.md` to cover the full LLM Wiki schema: three layers, wiki frontmatter (concept/summary), roles of `wiki/index.md` and `wiki/log.md`, cross-linking convention, and ingest/query/lint agent workflows.
- Created `wiki/index.md` as the master human-readable catalog: 32 concepts, 16 summaries, 9 sub-indexes, 17 source collections.
- Created `wiki/log.md` (this file) as the append-only ops log.
- Set `.obsidian/app.json` `attachmentFolderPath` to `raw/images/` so clipped images land in the canonical raw images directory.
- Schema-conformance pass on existing files: `bun run kb:lint` passed with zero warnings; no source-article fixes were required. The only lint adjustments were in `AGENTS.md` and `wiki/index.md` where example wiki-link placeholders were converted to prose so they no longer triggered dangling-link warnings.
- `bun run kb:refresh` rebuilt `.kb/index.json` cleanly: 223 markdown files / 1590 chunks. Health: review_backlog=0, stale_wiki=0, uncovered_tags=19.
- `bun test` passed 92/92 — MCP and HTTP server suites unaffected by this turn's edits.
- Updated `README.md` to surface `wiki/index.md` and `wiki/log.md` alongside the existing `wiki/index/` description so the new top-level files don't get lost.

## [2026-05-14] note | Schema audit + Obsidian-graph case-collision cleanup

- Verified frontmatter schema match: every key used across the 33 concept and 16 summary pages (`canonical_for, confidence, id, last_reviewed, review_due, review_status, source_count, summary, tags, title, type`) is documented in `AGENTS.md`. No drift.
- Verified backlinks: every wiki link in `wiki/index.md` resolves to an existing markdown file in the vault — Obsidian's backlinks panel will populate from each concept/summary page back to `wiki/index.md`.
- Fixed two case-collision orphans that produced twin nodes in Obsidian's graph view: replaced 8 occurrences of the bare-lowercase `agents` wiki-link with `llm-agents` and 4 occurrences of `security` with `agent-security` across raw articles' `## Related` sections. Original intent (the topic, not the schema/policy files at repo root) is preserved.
- Extended `src/core/lint.ts`: added `checkWikiIndexCoverage` (every wiki page must be listed in `wiki/index.md`) and `checkCaseCollisionWikiLinks` (warn when a wiki-link slug doesn't case-sensitively resolve but does case-insensitively, indicating a near-collision orphan). Both rules run for all files including raw articles.
- Wired `src/core/ingest/log.ts` into `ingestSource()`: every non-dry-run ingest now appends an `## [YYYY-MM-DD] ingest | <title>` entry to `wiki/log.md` automatically, so the log stays current without manual maintenance.
- Added focused unit test for the new catalog-coverage lint rule.
- Full `bun run check` gate: biome clean, typecheck clean, 93/93 tests pass, `kb:refresh` rebuilt 1590 chunks from 223 files.

## [2026-05-14] note | Orphan-node cleanup across raw articles

- Eliminated all remaining unresolved wiki links across the repo. Repo-wide scan now returns **zero** unresolved Obsidian-style wiki link references — the graph view will no longer display ghost/placeholder nodes for tag-style refs.
- Built a curated mapping of ~100 dangling slug aliases to canonical wiki pages and applied it across `raw/articles/`. Examples: `memory` → `agent-memory`; `evals` / `evaluation` → `ai-agent-evals`; `retrieval` / `dense-retrieval` / `crag` / `self-rag` / `colbert` / `beir` / `ragas` / `hyde` / `graphrag` → `rag`; `mcp` / `protocols` → `agent-protocols`; `tool-use` / `tools` / `client-tools` / `server-tools` → `agent-tools`; `harnesses` → `agent-harnesses`; `frameworks` → `agent-frameworks`; `subagents` / `parallel-agents` → `multi-agent-systems`; `agentic-coding` / `claude-md` / `hooks` → `claude-code`; voice topic family (`voice-agents`, `elevenlabs`, `audio`, `realtime`, `telephony`, `twilio`, `sip`, etc.) → `voice-ai`; `transcription` → `speech-to-text`; `voice-cloning` / `voice-design` → `synthetic-voices`; `prompt-injection` / `sandboxes` / `privacy` / `retention` / `policy` / `governance` → `agent-security`.
- Removed 14 vague-tag slugs that had no good canonical (`azure`, `google-cloud`, `analytics`, `case-studies`, `frontend`, `visual-specs`, `design`, `architecture`, `onboarding`, `product-overview`, `technical-interviews`, `input`, `webhooks`, `testing`) — those belong in frontmatter `tags:`, not as wiki-link bullets.
- Deduplicated bullets in 82 raw articles where two distinct original slugs mapped to the same canonical (e.g. a file with both `voice-agents` and `voice-ai` ended up with two `[[voice-ai]]` bullets; only one is kept now).
- Touched 104 raw article files in total.
- Full `bun run check` gate green: biome clean, typecheck clean, 93/93 tests pass, `kb:refresh` rebuilt 1591 chunks from 223 files.
- Net effect for Obsidian graph view: every concept page now collects all the inbound edges that were previously scattered across orphan ghost nodes. Concept pages like `agent-memory`, `rag`, `agent-security`, and `voice-ai` become substantially more central hubs in the graph.

## [2026-05-14] note | Configure Obsidian to ignore node_modules / .git / .kb / .github / evals

- Cause of duplicate README/Readme clusters in the graph view: Obsidian was indexing all 520 markdown files including the 153 README/Readme/readme files inside `node_modules/` (and identical case variants across npm packages).
- Set `userIgnoreFilters` in `.obsidian/app.json` to: `node_modules/`, `.git/`, `.kb/`, `.github/`, `evals/`, `**/*.bak-*`. Vault drops from 520 → 234 visible markdown files. No basename collisions remain in the visible set.
- Obsidian must be reloaded (Cmd-P → "Reload app without saving", or quit + reopen) for the filter to take effect.

## [2026-05-14] note | Remove personal project references

- Deleted two summary pages dedicated to a personal project (filenames redacted from this log).
- Stripped 12 raw articles of inline applicability bullets to that project: removed each related bullet from `## My Notes` and `## Open Questions` sections only. Headings, source text, frontmatter, and unrelated bullets are all preserved. Files touched: `agent-protocol.md`, `durable-mcp-weather-server.md`, `google-adk-runtime-event-loop-and-workflow-agents.md`, `langgraph-durable-execution-persistence-and-human-in-the-loop.md`, `langmem.md`, `openai-agents-sdk-sessions-handoffs-and-human-in-the-loop.md`, `stripe-checkout-how-checkout-works.md`, `stripe-integration-security-guide.md`, `temporal-ai-cookbook.md` (official-docs); `agent-workflow-memory.md`, `mem1-learning-to-synergize-memory-and-reasoning-for-efficient-long-horizon-agents.md`, `memagent-reshaping-long-context-llm-with-multi-conv-rl-based-memory-agent.md` (arxiv).
- Patched `wiki/index.md` Summaries section and `wiki/index/home.md` Recent Summaries list to drop the deleted page links.
- Final repo-wide sweep: zero remaining personal-project references. Lint passes.

## [2026-05-14] note | Orphan-node audit and fix

- Built a wiki-link connection graph across the visible vault and flagged every node with zero inbound and/or zero outbound wiki links.
- Before fix: 11 fully disconnected nodes (`docs/*.md` × 5 operator guides; repo-root governance files: `README.md`, `AGENTS.md`, `CLAUDE.md`, `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`) + 1 zero-outbound summary (`2026-04-13-rag-acquisition-priorities.md`).
- Operator docs and repo-root governance are legitimately not wiki content — they exist for CI, GitHub display, and Codex/Claude schema reading. Decision: hide them from the Obsidian vault rather than force fake graph links. Extended `.obsidian/app.json` `userIgnoreFilters` to also exclude `docs/` and each repo-root meta file by name.
- Added a `## Source Notes` section to `2026-04-13-rag-acquisition-priorities.md` listing the 13 cited papers and the related `[[rag]]` concept page as proper Obsidian wiki links. The summary now has 14 outbound edges (was 0).
- After fix: visible vault drops to 221 markdown files (the pure knowledge graph) and contains **zero** fully-disconnected nodes, **zero** zero-inbound nodes, and **zero** zero-outbound nodes.
- Hubs after the fix (degree, in+out): `context-engineering` 72, `voice-ai` 71, `index` (master catalog) 59, `llm-agents` 59, `agent-memory` 59, `agent-harnesses` 58, `managed-agents` 49, `ai-agent-evals` 48, `rag` 46, `home` 45. These match the actual research focus of the KB.

## [2026-05-14] note | Reader Discipline — prevent LLM auto-fan-out on wiki links

- Established that MCP tools never auto-expand Obsidian-style wiki-link references at the protocol level; the only risk is an LLM choosing to fetch every link it sees.
- Tightened tool descriptions in `src/mcp/tools/` so every MCP client gets the message: `kb_read_note` now states that wiki-link references inside a returned note are NOT auto-expanded and that `kb_build_context` is the right multi-note entrypoint; `kb_search` says "Do not fetch every linked note; pick the most relevant 1-3."; `kb_build_context` is positioned as the bounded multi-note entrypoint ("caps fan-out and keeps token usage predictable").
- Added a "Reader Discipline" section to `AGENTS.md` codifying the consumption pattern for sessions working in this repo: read frontmatter `summary` first, stop at `## Related` / `## Source Notes` unless needed, prefer `kb_build_context` over chained `kb_read_note` for multi-note synthesis.
- No code logic changed — tools still return one slice per call. The change is informational, but it lands directly in tool descriptions which every MCP client sees on `tools/list`.

## [2026-05-16] ingest | Is Grep All You Need? How Agent Harnesses Reshape Agentic Search
- Source note: `raw/articles/arxiv/2026-05-14-is-grep-all-you-need-how-agent-harnesses-reshape-agentic-search.md`
- Index not rebuilt this run (`--no-refresh`).

## [2026-05-16] ingest | Agentic grep vs vector retrieval paper propagation
- Refined the arXiv source note for `[[2026-05-14-is-grep-all-you-need-how-agent-harnesses-reshape-agentic-search]]` with structured claims, limitations, entities, and concept links.
- Updated concept pages: `[[rag]]`, `[[embeddings]]`, `[[agent-harnesses]]`, `[[context-engineering]]`, `[[agent-memory]]`, `[[ai-agent-evals]]`, and `[[context-rot]]`.
- Updated `[[arxiv]]` and the master `[[index]]` source collection count for the new arXiv source.
- Ran `bun run kb:refresh`; index rebuilt with 1579 chunks from 222 markdown files, with no lint failures reported.

## [2026-05-16] ingest | Beyond Individual Intelligence multi-agent LIFE survey
- Added source note `[[2026-05-14-beyond-individual-intelligence-multi-agent-life-survey]]` for arXiv:2605.14892, focused on collaboration, failure attribution, and self-evolution in LLM-based multi-agent systems.
- Created `[[multi-agent-failure-attribution]]` as a draft concept page covering attribution targets, method families, and the repair loop.
- Updated concept pages: `[[multi-agent-systems]]`, `[[ai-agent-evals]]`, `[[agent-harnesses]]`, and `[[agent-protocols]]`.
- Updated `[[arxiv]]` and the master `[[index]]`; ran `bun run kb:refresh`, which rebuilt 1595 chunks from 224 markdown files with no lint failures.

## [2026-05-18] query | AI textbook corpus KB improvement audit
- Extracted full text from every official AI/ML textbook download in `/Users/josemanuelcerqueira/Desktop/mit-ai-books/` into `_extracted_text/`; processed PDFs plus the HTML-only Goodfellow and Distributional RL mirrors.
- Built local extraction artifacts: `MANIFEST.md` with per-book word counts and `CORPUS_TOPIC_MAP.md` with per-book topic signals plus a wiki-vs-corpus gap check.
- Added `[[2026-05-18-ai-textbook-kb-improvement-map]]` and updated the master `[[index]]`.
- Main finding: the KB is strong on agent systems but thin on ML foundations, probability, optimization, deep learning, RL, fairness, validation, and ML systems engineering.

## [2026-05-18] ingest | Official AI/ML textbook corpus
- Added 16 compact source notes under `raw/articles/textbooks/`, covering every downloaded official PDF/HTML artifact while keeping full book text in the local official cache rather than copying it into markdown.
- Added the `[[textbooks]]` sub-index and 11 concept pages: `[[learning-theory]]`, `[[optimization-for-ml]]`, `[[probabilistic-machine-learning]]`, `[[deep-learning]]`, `[[reinforcement-learning]]`, `[[decision-making-under-uncertainty]]`, `[[ml-systems-engineering]]`, `[[ai-validation-and-assurance]]`, `[[fairness-and-ml]]`, `[[multi-agent-reinforcement-learning]]`, and `[[distributional-reinforcement-learning]]`.
- Propagated textbook-backed ideas into existing concepts: `[[agent-memory]]`, `[[multi-agent-systems]]`, `[[ai-agent-evals]]`, `[[agent-harnesses]]`, `[[rag]]`, `[[embeddings]]`, `[[agent-security]]`, and `[[reasoning]]`.
- Updated `[[index]]` and `[[home]]`; ran `bun run kb:refresh`, rebuilding 1760 chunks from 251 markdown files.

## [2026-05-18] ingest | AI/ML textbook second-layer digestion
- Added 19 granular concept pages for the textbook ideas most likely to recur in queries: generalization/model selection, probabilistic inference, Monte Carlo, variational inference, neural training, architectures, generative modeling, bandits, MDPs, TD/value learning, policy gradients, POMDPs, planning, ML lifecycle, scaling/compute economics, monitoring/drift, falsification, fairness criteria, and causal feedback loops.
- Wired the new pages into parent concepts including `[[learning-theory]]`, `[[probabilistic-machine-learning]]`, `[[deep-learning]]`, `[[reinforcement-learning]]`, `[[decision-making-under-uncertainty]]`, `[[ml-systems-engineering]]`, `[[ai-validation-and-assurance]]`, and `[[fairness-and-ml]]`.
- Updated `[[index]]`, `[[home]]`, and `[[textbooks]]` so the detailed layer is navigable from the main catalog and the textbook collection; ran `bun run kb:refresh`, rebuilding 1863 chunks from 270 markdown files, and `bun run kb:lint` passed with no warnings.

## [2026-05-18] lint | Query telemetry and KB health cleanup
- Confirmed the telemetry log did not contain the user's expected 2026-05-17 zero-result query; root cause was likely an unobserved path because stdio MCP did not record search telemetry and one-off zero-result queries were hidden by the repeated-query report threshold.
- Updated search telemetry so stdio MCP records observations by default and `kb:search-report` surfaces zero-result queries after one observation.
- Tightened gap detection by counting index/summary pages as coverage surfaces and adding aliases for already-covered tags; refreshed reviewed wiki metadata that was stale after the textbook ingest.
- Ran `bun run kb:refresh`, `bun run kb:lint`, `bun run biome:check`, `bun run typecheck`, and the test suite; health is now `review_backlog=0 stale_wiki=0 uncovered_tags=0`.

## [2026-05-18] lint | Local search telemetry
- Added local CLI search telemetry for `bun run kb:search` so local query gaps are recorded alongside MCP search observations.
- Local observations write to the ignored `.kb/telemetry/search-observations.ndjson` path by default; users can disable with `KB_SEARCH_TELEMETRY_ENABLED=false` or override the path with `KB_SEARCH_OBSERVATION_LOG_PATH`.
- Added a CLI integration test that writes to a temporary observation log and verifies a one-off zero-result local query is captured with `transport: cli`.

## [2026-05-18] ingest | Cognee memory-skill harness bundle
- Added source notes for the Vasilije Markovic memory/skills harness thread, arXiv:2505.24478 on KG-to-LLM interface optimization, and the `topoteretes/cognee` repo at inspected commit `8b0d687`.
- Added `[[2026-05-18-cognee-memory-skills-kb-upgrades]]` to preserve the cross-source synthesis: skills can be procedural memories backed by run evidence and proposals, but typed review/apply boundaries still matter.
- Updated `[[agent-memory]]`, `[[agent-skills]]`, `[[agent-harnesses]]`, and `[[rag]]`; updated the master catalog plus `[[home]]`, `[[arxiv]]`, and `[[github-repos]]`.
- Noted an implementation caveat: the current Cognee repo supports `SkillRunEntry`, `Skill`, `SkillRun`, and `SkillImprovementProposal`, but no exact `SkillChangeEvent` symbol was found in the inspected branch.
- Ran `bun run kb:refresh`; health is `review_backlog=0 stale_wiki=0 uncovered_tags=0`.

## [2026-05-18] refresh | Cognee paper and code deep dive
- Expanded the Cognee arXiv note with Dreamify optimization details, train/hold-out setup, result-table takeaways, and Appendix A architecture notes.
- Expanded the Cognee repo note with `cognify`, `search`, `recall`, `improve`, retriever taxonomy, agent-memory decorator, feedback weighting, global context index, eval framework, and test-backed skill mutation behavior.
- Strengthened `[[agent-memory]]`, `[[rag]]`, `[[context-engineering]]`, `[[ai-agent-evals]]`, `[[agent-harnesses]]`, and `[[agent-skills]]` with reusable patterns: memory control planes, KG-to-LLM interface tuning, session-to-graph promotion, evidence-linked feedback, and proposal-first skill mutation.
- Ran `bun run kb:refresh`; final health is `review_backlog=0 stale_wiki=0 uncovered_tags=0`.

## [2026-05-20] ingest | Steward agent wallet infrastructure
- Added source note `[[2026-05-20-steward]]` for `Steward-Fi/steward` at inspected commit `158e696`, focused on agent wallet custody, policy-gated signing, credential proxying, auth, approvals, and audit logs.
- Created `[[agent-wallet-infrastructure]]` as a draft concept for policy-bounded agent spending and credential use.
- Updated `[[agent-security]]`, `[[payment-integrations]]`, `[[agent-tools]]`, `[[managed-agents]]`, and `[[agent-harnesses]]`; updated `[[github-repos]]`, `[[home]]`, and the master `[[index]]`.
- Noted a security caveat from Steward's own ADR/threat model: v1 policy enforcement is an API-path invariant before vault calls, not a separate cryptographic signer-process boundary.
- Ran `bun run kb:refresh`; lint passed, with two pre-existing stale summary review dates still reported in health.

## [2026-05-20] ingest | Hermes Agent runtime
- Added source note `[[2026-05-20-hermes-agent]]` for `NousResearch/hermes-agent` at inspected commit `edb2d91`, focused on the self-improving personal-agent runtime: memory, skills, gateway, ACP, cron, toolsets, code execution, browser/computer-use, MCP, and trajectories.
- Added synthesis `[[2026-05-20-hermes-agent-runtime-patterns-from-source-teardown]]` to preserve reusable runtime lessons across [[agent-harnesses]], [[agent-frameworks]], [[agent-memory]], [[agent-skills]], [[agent-tools]], [[agent-protocols]], [[context-engineering]], [[durable-execution]], [[web-agents]], and [[computer-use]].
- Updated related concept pages plus `[[github-repos]]`, `[[home]]`, and the master `[[index]]`.
- Noted Hermes' own security caveat: approval gates, redaction, tool allowlists, and skill scans are heuristics; OS-level isolation is the real containment boundary for adversarial inputs.
- Ran `bun run kb:refresh` and `bun run kb:lint`; lint passed, with the same two pre-existing stale summary review dates still reported in health.

## [2026-05-20] ingest | MemWal encrypted agent memory
- Added source note `[[2026-05-20-memwal]]` for `MystenLabs/MemWal` at inspected commit `e5b98ca`, focused on encrypted Walrus-backed memory, Sui delegate keys, namespaces, SDK/MCP/OpenClaw integrations, relayer trust, restore, and semantic recall.
- Added synthesis `[[2026-05-20-memwal-encrypted-agent-memory-source-teardown]]` to preserve the user-owned encrypted-memory pattern and its trust-boundary cautions.
- Updated `[[agent-memory]]`, `[[agent-security]]`, `[[agent-tools]]`, `[[agent-protocols]]`, `[[managed-agents]]`, `[[agent-harnesses]]`, `[[context-engineering]]`, `[[rag]]`, and `[[personal-knowledge-bases]]`; updated `[[github-repos]]`, `[[home]]`, and the master `[[index]]`.
- Noted the main caveat: default relayer mode sees plaintext for embedding/encryption/decryption, while self-hosting, TEE deployment, or manual client flow changes the trust posture.
- Ran `bun run kb:refresh` and `bun run kb:lint`; lint passed, with the same two pre-existing stale summary review dates still reported in health.

## [2026-05-20] lint | stale summary review cleanup
- Reviewed `[[2026-04-19-openai-agents-js-runtime-patterns-from-source-teardown]]` and `[[2026-04-20-akitaonrails-blog-durable-lessons]]`; no content changes were needed, only review metadata refresh.
- Updated both summaries' `last_reviewed` to 2026-05-20 and `review_due` to 2026-06-20 so the canonical layer no longer reports stale wiki notes.

## [2026-05-21] query | Hermes enterprise readiness market analysis
- Added `2026-05-21-hermes-enterprise-readiness-market-analysis` after a ten-agent market analysis of why Hermes is not yet an enterprise standard and what would make it enterprise-ready.
- Captured the main synthesis: Hermes has strong runtime breadth, but enterprise adoption depends on identity, governance, whole-process isolation, tool/skill supply-chain controls, auditability, support, compliance evidence, and measured workflow ROI.
- Added MemWal/Walrus/Sui conclusions: user-owned memory and verifiable artifacts strengthen Hermes' wedge, while Sui's May 20, 2026 announcement is gasless supported stablecoin transfers rather than free stablecoin balances.
- Updated the master `[[index]]`; ran `bun run kb:refresh`.

## [2026-05-21] note | retract Hermes market-analysis filing
- Retracted `2026-05-21-hermes-enterprise-readiness-market-analysis` after the user clarified the Hermes enterprise discussion was idea mining, not material to preserve as a wiki summary.
- Removed the page from `wiki/summaries/` and from the master `[[index]]`.
- Future speculative market-analysis/subagent synthesis should stay in chat unless the user explicitly asks to preserve it in the KB.

## [2026-05-21] ingest | AI SaaS business strategy source
- Added `[[2026-05-21-saas-million-arr-clairvo]]` under `raw/articles/business-strategy/` from a user-provided transcript about a Claude Code-built AI power dialer reaching claimed million-dollar ARR.
- Created `[[ai-saas-strategy]]`, `[[2026-05-21-ai-saas-million-arr-lessons]]`, and the `[[business-strategy]]` sub-index to start a durable business-strategy layer.
- Updated `[[claude-code]]`, `[[workflows]]`, `[[agent-frameworks]]`, and `[[enterprise-agent-deployment-failure-modes]]` with the commercial lessons: payable pain, mechanism mining, simulation-to-live validation, value-based pricing, model-agnostic coding, and high-touch moats.
- Ran `bun run kb:refresh`; health was clean with `review_backlog=0 stale_wiki=0 uncovered_tags=0`.

## [2026-05-25] query | AI interface design lessons
- Added `[[ai-interface-design]]` to preserve the general design lesson from the Conformis local vault: AI-designed interfaces should prioritize job clarity, calm density, explicit state, trust, and repeated use over visual novelty.
- Connected the synthesis to `[[2025-11-12-improving-frontend-design-through-skills]]`, which explains why models drift toward generic frontend defaults without targeted design context.

## [2026-05-25] ingest | Uniswap interface UI/UX source teardown
- Added source note `[[2026-05-25-uniswap-interface]]` for `Uniswap/interface` at inspected commit `b8dbf44`, focused on frontend UI/UX source organization across `apps/web`, `apps/mobile`, `apps/extension`, `packages/ui`, `packages/uniswap`, and related infrastructure packages.
- Added synthesis `[[2026-05-25-uniswap-interface-ui-ux-source-teardown]]` to preserve reusable 10/10 UI/UX patterns: shared design primitives, cross-platform domain flows, typed transaction state, telemetry, feature gates, localization, lint guardrails, Storybook, Playwright, Anvil, snapshots, and Maestro performance flows.
- Updated `[[ai-interface-design]]`, `[[github-repos]]`, `[[home]]`, and the master `[[index]]`.
- Ran `bun run kb:refresh`; health was clean with `review_backlog=0 stale_wiki=0 uncovered_tags=0`.

## [2026-05-27] ingest | JP Middleton AI agency video
- Added `[[2026-02-27-how-i-made-25m-selling-just-one-ai-system]]` under `raw/articles/business-strategy/` from the YouTube transcript for JP Middleton's AI agency offer video, and connected the adjacent `[[2026-04-22-ai-business-zero-employees-jp-middleton]]` source already present in the same collection.
- Created `[[ai-agency-strategy]]` and `[[2026-05-27-ai-aristotle-agency-build-plan]]` so the KB can serve as the operating memory for building the described agency model.
- Updated `[[ai-saas-strategy]]`, `[[enterprise-agent-deployment-failure-modes]]`, `[[workflows]]`, `[[business-strategy]]`, `[[home]]`, and the master `[[index]]`.
- Added external research checks for speed-to-lead, Google local ranking/reviews, FTC review-incentive guidance, and FCC TCPA consent constraints.
- Cleaned related freshness/source-count metadata surfaced by `kb_find_gaps` so the post-ingest health report stays actionable.
- Ran `bun run kb:refresh` and `kb_find_gaps`; final health was clean with `review_backlog=0 stale_wiki=0 uncovered_tags=0`.

## [2026-05-27] refresh | AI agency KB enrichment
- Added `[[2026-04-22-ai-business-zero-employees-jp-middleton]]` from the user-provided transcript and fixed the related link in `[[2026-02-27-how-i-made-25m-selling-just-one-ai-system]]` back to the existing agency build-plan summary.
- Strengthened `[[ai-agency-strategy]]` and `[[2026-05-27-ai-aristotle-agency-build-plan]]` with current external guardrails: Lead Response Management speed-to-lead research, BrightLocal 2026 review behavior, Google review/local-ranking policies, FTC review and lead-generation guidance, and FCC TCPA/AI voice consent constraints.
- Noted the TCPA nuance for future agency work: the stricter FCC one-to-one consent rule was vacated/deleted, but prior express written consent for telemarketing calls/texts and consent sensitivity for AI voice calls remain core constraints.
- Ran `bun run kb:refresh`; index rebuilt with 2055 chunks from 293 markdown files and health was clean with `review_backlog=0 stale_wiki=0 uncovered_tags=0`.

## [2026-05-27] ingest | Meta and Google ads paid-growth research
- Added 23 source notes under `raw/articles/paid-growth/` covering Meta Performance 5, Advantage+ creative, creator/partnership ads, Reels, Advertising Standards, Conversions API, Google Performance Max, responsive search ads, ABCD video creative, people-first content, misrepresentation policy, Conversion Lift, FTC endorsement disclosure, Demand Curve, CXL, Motion, Billo, CMI, Sprout, Lewis/Rao, and Meta AdLlama.
- Created the core paid-growth wiki layer: `[[paid-growth]]`, `[[meta-ads]]`, `[[google-ads]]`, `[[performance-creative]]`, `[[ugc-ads]]`, `[[copywriting]]`, `[[content-creation-strategy]]`, and `[[marketing-measurement]]`.
- Added synthesis `[[2026-05-27-meta-google-ads-creative-content-kb-expansion]]` and sub-index `[[paid-growth-sources]]`, then wired both into `[[index]]` and `[[home]]`.

## [2026-05-27] lint | dangling AI interface link cleanup
- Removed a dangling `ai-saas-strategy` related-link from `[[ai-interface-design]]`; the target concept page is not present on `main`.
- Reproduced the failing CI lint locally and reran the repo quality gate after the cleanup.

## [2026-05-27] sync | PR 52 conflict resolution
- Merged the `main` lint history with the PR's AI agency ingest log entries.
- Restored the `[[ai-saas-strategy]]` relationship from `[[ai-interface-design]]` because PR 52 adds that target concept page.

## [2026-05-27] ingest | Aya and Conformis internal codebases
- Added internal-codebase source notes `[[2026-05-27-aya]]` and `[[2026-05-27-conformis]]`, explicitly excluding secrets, env files, caches, generated artifacts, and full private source dumps.
- Added synthesis `[[2026-05-27-aya-conformis-internal-codebase-patterns]]` plus new concepts `[[codebase-architecture]]`, `[[internal-engineering-conventions]]`, and `[[repo-local-knowledge-bases]]`.
- Updated `[[ai-interface-design]]`, `[[personal-knowledge-bases]]`, `[[research-workflows]]`, `[[home]]`, `[[internal-codebases]]`, and the master `[[index]]`.

## [2026-05-27] query | KB health and search methodology audit
- Added `[[2026-05-27-kb-health-search-methodology-audit]]` after reviewing local health, `kb_find_gaps`, search telemetry, retrieval evals, representative probe queries, remote `/health`, remote admin route availability, deployment docs, and search/indexing internals.
- Findings: corpus health is clean, remote MCP is live/read-only, paid-growth and internal-codebase retrieval are strong, but remote telemetry is not inspectable because admin routes returned 404 and eval coverage has not caught up to the newest clusters.
- Recommended improvements: enable protected persistent remote telemetry, add corpus/index freshness to remote health, expand retrieval evals for paid growth/compliance/internal codebase queries, add domain aliases, improve `kb_search_file`, and prefer concept/summary notes before index notes in context-pack read order.

## [2026-05-27] refresh | KB health/search audit remediation
- Implemented the audit follow-ups from `[[2026-05-27-kb-health-search-methodology-audit]]`: `/health` now reports privacy-safe index freshness (availability, `generatedAt`, `schemaVersion`, `fileCount`, `chunkCount`, stale-vs-newest-markdown) plus `searchTelemetryEnabled`/`telemetryHashingConfigured`/`adminTelemetryConfigured` readiness, never exposing salt or token values and never rebuilding the index.
- Added paid-growth retrieval aliases (Meta/Google ads, UGC/creator, CAPI/conversions API, PMax, RSA, incrementality/lift, TCPA/FCC/robocall/SMS/consent) and made `topTermsFromFile`/`topTermsFromText` IDF-aware when an index is supplied, so `kb_search_file`/text context favors discriminating terms.
- Ordered concept and summary notes before index pages in context-pack read order; documented `KB_SEARCH_OBSERVATION_LOG_PATH` (persistent volume), `KB_SEARCH_TELEMETRY_SALT`, `KB_ADMIN_TOKEN`, and the admin search-report/export endpoints in `docs/railway.md`.
- Expanded `evals/search-gold.json` to 45 cases (Meta/UGC creative, CAPI, Google PMax/RSA, incrementality, TCPA/compliance, internal codebase/methodology) and fixed the two prior failures legitimately (added `runtime coordinator`/`agent stack` canonical phrases to `[[agent-frameworks]]`; widened the multi-agent copilots relevant set to genuinely-relevant orchestration sources). `bun run kb:refresh`, `kb:eval` (all pass), `biome:write`, `typecheck`, and `bun test` (96 pass) are green.

## [2026-05-27] ingest | AI agency Meta ad screenshot checklist
- Added `[[2026-05-27-winning-meta-ad-copy-ai-agency-ads]]` from the user-provided screenshot and archived the original image under `raw/images/user-provided/2026-05-27-winning-meta-ad-copy-ai-agency-ads/`.
- Created `[[2026-05-27-ai-agency-meta-ad-checklist]]` as the reusable playbook for proper AI-agency Meta ads: niche call-out, legible AI mechanism, appointment/result outcome, high-contrast creative, and proof/trust descriptions.
- Updated `[[meta-ads]]`, `[[performance-creative]]`, `[[copywriting]]`, `[[paid-growth]]`, `[[ai-agency-strategy]]`, `[[paid-growth-sources]]`, `[[home]]`, and the master `[[index]]`.
- Noted the core guardrail: "ChatGPT Plugin," ROI, booked-appointment, and success-story claims should only be used when accurate, substantiated, policy-safe, and matched on the landing page.

## [2026-05-27] ingest | AI agency Meta ad four-surface framework
- Added `[[2026-05-27-effective-meta-ads-ai-agency-framework]]` from the second user-provided screenshot and archived the original image under `raw/images/user-provided/2026-05-27-effective-meta-ads-ai-agency-framework/`.
- Strengthened `[[2026-05-27-ai-agency-meta-ad-checklist]]` with the four-surface model: ad copy creates relevance, creative stops the scroll and conveys the AI angle, headline compresses urgency and niche fit, and description adds proof/trust when visible.
- Updated `[[meta-ads]]`, `[[performance-creative]]`, `[[copywriting]]`, `[[paid-growth]]`, and `[[paid-growth-sources]]`.

## [2026-05-27] refresh | JP Middleton AI agency section extraction
- Split the core Middleton AI-agency sections into topic pages: `[[local-business-ai-acquisition-system]]`, `[[database-reactivation]]`, `[[review-referral-automation]]`, `[[speed-to-lead-and-missed-call-recovery]]`, `[[sales-coaching-gpt]]`, `[[ai-agency-sales-process]]`, and `[[ai-agency-paid-ads-process]]`.
- Enriched each topic with workflow steps, metrics, failure modes, compliance/proof guardrails, and links back to the source transcript plus adjacent paid-growth and agency-strategy synthesis.
- Updated `[[ai-agency-strategy]]`, `[[2026-05-27-ai-aristotle-agency-build-plan]]`, `[[business-strategy]]`, and the master `[[index]]` so the extracted topics are navigable.

## [2026-05-27] refresh | AI agency topic external-source enrichment
- Added outside-KB source anchors to the extracted AI-agency topic pages: FTC review guidance/rule Q&A, FTC CAN-SPAM, FTC lead-generation guidance, FCC TCPA/AI voice/consent materials, Google Business Profile review/local-ranking policy, Meta Advertising Standards/Performance/CAPI, HBS/HBR and InsideSales speed-to-lead sources, BrightLocal 2026 review survey, NIST AI RMF, Salesforce State of Sales 2026, HBR solution-sales context, and Lewis/Rao advertising-measurement research.
- Clarified source strength by separating official policy/regulatory sources from vendor/practitioner research and from Middleton's self-reported operator evidence.
- Updated `[[2026-05-27-ai-aristotle-agency-build-plan]]` with the expanded external-source inventory for future agency validation work.

## [2026-05-27] lint | AI agency topic health cleanup
- Corrected `source_count` metadata on the seven extracted AI-agency concept pages so counts match linked source notes rather than external web references.
- Updated the TCPA/compliance search eval to treat the new dedicated `[[database-reactivation]]` and `[[speed-to-lead-and-missed-call-recovery]]` pages as preferred retrieval targets.

## [2026-05-30] ingest | Pavlo website agency operator transcript
- Added `[[2026-05-29-how-he-makes-500k-mo-selling-websites]]` from the user-provided YouTube transcript, preserving the source text and adding a video-time index for package, pricing, margin, team, acquisition, upsell, and AI-fulfillment sections.
- Added `[[2026-05-30-website-agency-operator-playbook]]` as the durable synthesis: low-ticket contractor website wedge, cold outbound as sales skill acquisition, post-sale upsells, sales/CSM systems, and AI-assisted fulfillment after manual process learning.
- Updated `[[ai-agency-strategy]]`, `[[local-business-ai-acquisition-system]]`, `[[review-referral-automation]]`, `[[speed-to-lead-and-missed-call-recovery]]`, `[[ai-agency-sales-process]]`, `[[ai-agency-paid-ads-process]]`, `[[ai-saas-strategy]]`, `[[2026-05-27-ai-aristotle-agency-build-plan]]`, `[[business-strategy]]`, `[[home]]`, and the master `[[index]]`.
- Noted cautions: margin/client/ad-spend claims are self-reported; the false-referral cold-call opener, pressure closing, cold SMS, and review-gating-style funnel should not become approved scripts without compliance-safe redesign.

## [2026-05-30] ingest | Aya + Conformis app-template / design-system blueprint
- Added `[[2026-05-30-aya-conformis-app-template-design-system]]` (internal-codebases): combined frontend/design-system teardown of `desktop/aya` and `desktop/conformis` — shared Next 16 / React 19 / React Query 5.100.9 / lucide 1.14.0 baseline, token-first CSS-variable design systems, role-driven component set, server-seed + React Query data routing, and accessibility/motion/state-grammar rules. No secrets or large code copied; durable lessons + selected anchors only.
- Added `[[2026-05-30-app-template-design-system-blueprint]]` (summary): the retrieve-before-you-build blueprint future agents should read before creating a new app/feature — default stack, starter token contract, UI component minimum set, density/responsive/a11y/motion/data-routing/state rules, anti-patterns, how to prompt coding agents, and an authoritative resources inventory (Next.js App Router, React, Tailwind v4, WCAG 2.2, WAI-ARIA APG, MDN, web.dev CWV, W3C Design Tokens CG, IBM Carbon, Material 3, Apple HIG).
- Updated `[[internal-codebases]]` sub-index (new source + synthesis bullets) and the master `[[index]]` (Summaries entry; `internal-codebases` collection count 2 → 3).
- Did not modify Aya or Conformis, and did not touch `.obsidian/graph.json`.

## [2026-05-30] ingest | Aya + Conformis backend-stack / patterns blueprint
- Added `[[2026-05-30-aya-conformis-backend-stack-patterns]]` (internal-codebases): combined backend teardown of `desktop/aya` and `desktop/conformis` — Bun/Hono/TypeScript services, Postgres/Drizzle persistence, Redis coordination, explicit `Deps` envelopes, provider adapters/gateways, domain stores/sinks, transaction contexts, outbox/idempotency policies, boundary validation, encrypted storage, and test-support quarantine. No secrets, tenant data, call transcripts, or large code copied.
- Added `[[2026-05-30-backend-stack-patterns-blueprint]]` (summary): retrieve-before-you-build backend blueprint for future app/API/worker/provider work — default stack, package shape, route/runtime/dependency rules, persistence boundaries, webhook ingress, queues/outbox/idempotency decision rules, security baseline, verification rules, anti-patterns, coding-agent prompt constraints, and authoritative resources.
- Updated `[[internal-codebases]]` sub-index (new backend source + synthesis bullets) and the master `[[index]]` (Summaries entry; `internal-codebases` collection count 3 → 4).
- Did not modify Aya or Conformis, and left the pre-existing `.obsidian/graph.json` change untouched.

## [2026-05-30] enrich | Design-system source library for AI-built apps
- Added `[[2026-05-30-refero-component-theme-source-library]]` under `raw/articles/design-systems/`: Refero Styles as an AI-agent taste/DESIGN.md reference lane, shadcn/ui and Radix as implementation lanes, Tailwind Plus/Catalyst as license-sensitive Tailwind recipes, and Carbon/Primer/Polaris/Atlassian/GOV.UK/USWDS/Apple/Material as calibration sources.
- Added `[[2026-05-30-component-theme-source-library]]` as the retrieve-before-you-build component/theme source map: choose one implementation lane, use Refero before prompting, map every borrowed pattern into local tokens/components, verify license before copying, and reject mixed styled systems.
- Updated `[[2026-05-30-app-template-design-system-blueprint]]`, `[[ai-interface-design]]`, `[[design-systems]]`, `[[home]]`, and the master `[[index]]` so future app builds retrieve the source library alongside the Aya/Conformis blueprint.

## [2026-05-30] query | Conformis latest cleanup-helper commit lessons
- Inspected latest Conformis commit `2cd099c627751ce16456e98a9c176f445a0c678a` (`refactor: centralize cleanup helpers`) from `/Users/josemanuelcerqueira/Desktop/conformis`; left the unrelated `.obsidian/graph.json` working-tree change untouched.
- Added `[[2026-05-30-conformis-cleanup-helpers-commit]]` as an internal-codebase source note covering central Postgres error classification, JSON payload conversion, Next API response helpers, audit-universe schema re-export facades, and focused smoke tests.
- Updated `[[2026-05-30-backend-stack-patterns-blueprint]]`, `[[2026-05-27-aya-conformis-internal-codebase-patterns]]`, `[[internal-codebases]]`, and the master `[[index]]`.

## [2026-05-31] query | Aya and Conformis latest commit lessons
- Inspected latest committed history in `/Users/josemanuelcerqueira/Desktop/aya` and `/Users/josemanuelcerqueira/Desktop/conformis`; treated Aya's large staged/uncommitted verticalization work and Conformis' `.obsidian/graph.json` change as separate local state.
- Added `[[2026-05-31-aya-conformis-latest-commits]]` as an internal-codebase source note covering Aya row prefetch, no raw IDs in operator UI, persisted caller intent, Conformis next-intl migration, proxy matcher hardening, and React Doctor gate enforcement.
- Added `[[2026-05-31-aya-conformis-latest-commit-lessons]]` as the durable synthesis and updated `[[2026-05-27-aya-conformis-internal-codebase-patterns]]`, `[[internal-codebases]]`, and the master `[[index]]`.

## [2026-05-31] ingest | Addy Osmani orchestration tax
- Added `[[2026-05-24-the-orchestration-tax]]` under the new `addy-osmani` collection, preserving the canonical AddyOsmani.com source URL and article text.
- Updated `[[multi-agent-systems]]`, `[[workflows]]`, `[[llm-agents]]`, and `[[enterprise-agent-deployment-failure-modes]]` with the human-review bottleneck, Amdahl's Law, backpressure, batching, and cognitive-surrender lessons.
- Added `[[addy-osmani]]` as a collection sub-index and updated `[[home]]` plus the master `[[index]]`.

## [2026-05-31] ingest | pmarca AI custom prompt
- Added `[[2026-05-04-pmarca-ai-custom-prompt]]` under `raw/articles/user-provided/`, preserving the user-provided prompt text and noting X fetch limitations.
- Added `[[ai-instruction-design]]` as the reusable concept for always-on assistant instruction design: truth over approval, evidence policy, uncertainty, direct disagreement, and context discipline.
- Added `[[2026-05-31-ai-custom-instruction-profile]]` as the portable distilled profile for reuse across ChatGPT, coding agents, repo instructions, and skills.
- Updated `[[context-engineering]]`, `[[internal-engineering-conventions]]`, `[[user-provided]]`, `[[home]]`, and the master `[[index]]`.

## [2026-05-31] ingest | Claude zero trust for AI agents ebook
- Added `[[2026-05-27-zero-trust-for-ai-agents]]` under `raw/articles/claude-blog/`, preserving the extracted PDF source text and linking the Claude blog landing page.
- Added `[[2026-05-31-zero-trust-ai-agents-kb-upgrades]]` as the reusable synthesis for cryptographic agent identity, least agency, MCP/tool authorization, memory integrity, sandboxing, and agentic SOAR.
- Updated `[[agent-security]]`, `[[agent-tools]]`, `[[agent-protocols]]`, `[[agent-memory]]`, `[[ai-validation-and-assurance]]`, and `[[enterprise-agent-deployment-failure-modes]]`.
- Updated `[[claude-blog]]`, `[[home]]`, and the master `[[index]]`.

## [2026-05-31] ingest | Zack Paid Meta ads creative fatigue framework
- Added `[[2026-05-31-zackpaid-meta-ads-creative-fatigue-framework]]` under `raw/articles/paid-growth/`, preserving the user-provided X thread text and noting that the status date was inferred from the X snowflake timestamp.
- Updated `[[performance-creative]]`, `[[meta-ads]]`, `[[paid-growth]]`, and `[[copywriting]]` with the angle/execution/avatar fatigue diagnosis model, the three-format-before-killing-an-angle heuristic, and the creative intelligence log pattern.
- Updated `[[paid-growth-sources]]` and the master `[[index]]`; treated the post as low-authority practitioner evidence, with self-reported case-study claims left in the raw source rather than promoted as verified performance proof.

## [2026-06-02] query | Graphed vs Aristotle and Pavlo methods
- Compared Graphed's AI marketing agent offer against the KB's AI Aristotle and Pavlo agency patterns.
- Added `[[2026-06-02-graphed-ai-agents-aristotle-pavlo-comparison]]` as a durable summary and updated `wiki/index.md`.
- Key conclusion: Graphed is Aristotle-like as an integrated marketing-ops agent system, but it is not a literal Pavlo low-ticket local-business wedge.
- Ran `bun run kb:refresh`; index rebuild succeeded and health reported pre-existing stale wiki signals.

## [2026-06-02] query | AI search optimization build read
- Answered whether the Ahrefs AI-search optimization findings justify building a product or service.
- Added `[[2026-06-02-ai-search-optimization-build-read]]` as a durable synthesis and updated `wiki/index.md`.
- Key conclusion: build the execution/source-influence layer, not a generic AI visibility dashboard, schema helper, or undifferentiated blog generator.

## [2026-06-02] query | Anthropic financial-services repo ingest assessment
- Cloned and inspected `anthropics/financial-services` at `120a31dcede4affa1d771cbf286a63ee331f92a4`, including README, plugin manifests, vertical skills, agent prompts, managed-agent cookbooks, subagent schemas, helper scripts, partner plugins, and Microsoft 365 install tooling.
- Added `[[2026-06-02-anthropic-financial-services-ingest-assessment]]` as the durable go/no-go assessment and updated `wiki/index.md`.
- Key conclusion: worth a targeted ingest for finance-domain Claude skills, managed-agent least-privilege patterns, MCP connector maps, and enterprise Office deployment; note that the inspected core `.mcp.json` is malformed after the Box addition.

## [2026-06-03] ingest | Matt Van Horn agentic engineering hacks digest
- Added `[[2026-06-02-every-agentic-engineering-hack-i-know]]` under `raw/articles/user-provided/`, preserving the user-provided digest and noting that a stable canonical X URL was not present in the attachment.
- Added `[[2026-06-03-agentic-engineering-practitioner-stack]]` as the durable synthesis: plan-first artifacts, research-before-planning, parallel Claude/Codex sessions, voice/raw-context capture, notes as agent memory, reusable skills, agent-native CLIs, and human taste/review as the bottleneck.
- Updated `[[claude-code]]`, `[[workflows]]`, `[[agent-skills]]`, `[[personal-knowledge-bases]]`, `[[voice-dictation]]`, `[[agent-tools]]`, `[[user-provided]]`, `[[home]]`, and the master `[[index]]`.
- Caveat: permission-bypass, browser-session auth, and agent-native real-world CLIs are treated as personal-risk tradeoffs, not KB security defaults.

## [2026-06-03] ingest | Anthropic Managed Agents repair
- Promoted the existing `[[2026-04-09-scaling-managed-agents-decoupling-the-brain-from-the-hands]]` note from first-pass metadata into a proper archival source note with the Anthropic article text preserved and publication date corrected to 2026-04-08.
- Refreshed `[[managed-agents]]` with the source's sharper session-log, meta-harness, credential-boundary, and TTFT claims.
- Updated `[[anthropic-engineering]]` collection notes to reflect 22 imported Engineering posts and this targeted repair.

## [2026-06-03] ingest | Claude use cases full digest
- Added `[[2026-06-03-claude-use-cases-full-digest]]` under `raw/articles/user-provided/`, converting the local HTML digest into a structured source note while preserving all 94 rendered use cases and their Claude resource URLs.
- Added `[[2026-06-03-claude-use-cases-workflow-map]]` as the durable synthesis: Claude use cases as task boundaries, required context, product surfaces, output artifacts, follow-up actions, and approval/troubleshooting cues.
- Updated `[[workflows]]`, `[[agent-tools]]`, `[[agent-skills]]`, `[[computer-use]]`, `[[web-agents]]`, `[[enterprise-agent-deployment-failure-modes]]`, `[[user-provided]]`, `[[home]]`, and the master `[[index]]`.
- Caveat: treated the digest as product/use-case packaging evidence, not independent proof of reliability, ROI, or compliance readiness.

## [2026-06-03] query | Matt Pocock skills ingest assessment
- Cloned and inspected `mattpocock/skills` at commit `aaf2453fbdfe7a15c07f11d861224f34ab4b53cb`, covering all 72 non-`.git` files across stable, misc, personal, in-progress, deprecated, setup, and out-of-scope areas.
- Added `[[2026-06-03-matt-pocock-skills-ingest-assessment]]` as the durable go/no-go assessment and updated the master `[[index]]`.
- Key conclusion: worth a targeted repo-level ingest for diagnosis, domain-language grilling, TDD, issue triage, prototype, and architecture-deepening workflows; do not copy the setup skill here unmodified because this repo already has a canonical `AGENTS.md` schema.
- Recommended adding/adapting `diagnose` first if only one Matt Pocock skill is adopted for better development.

## [2026-06-04] ingest | Matt Pocock skills repo
- Added `[[2026-06-04-mattpocock-skills]]` under `raw/articles/github-repos/`, preserving a repo-level source note for the inspected `mattpocock/skills` commit rather than one note per skill file.
- Updated `[[agent-skills]]`, `[[internal-engineering-conventions]]`, `[[codebase-architecture]]`, `[[claude-code]]`, and `[[research-workflows]]` with diagnosis, domain-language grilling, vertical TDD, durable issue briefs, out-of-scope notes, and architecture-deepening vocabulary.
- Updated `[[github-repos]]`, `[[home]]`, the master `[[index]]`, and the earlier `[[2026-06-03-matt-pocock-skills-ingest-assessment]]` to point at the full source note.
- Caveat: did not copy `setup-matt-pocock-skills` into this repo because its `CONTEXT.md`/ADR/docs-agent assumptions overlap with this repo's canonical `AGENTS.md` and wiki schema.

## [2026-06-04] ingest | Alex Lieberman content machine
- Added `[[2026-06-03-alex-lieberman-content-machine]]` under `raw/articles/user-provided/`, preserving the user-provided X digest and noting that the tweet ID decodes to 2026-06-03T20:35:27Z while X did not expose clean source text during ingest.
- Added `[[2026-06-04-ai-native-content-machine]]` as the durable synthesis: human first/final mile, skillized middle steps, raw source preservation, critique routing, platform-native derivatives, and final-edit learning loops as creator memory.
- Updated `[[content-creation-strategy]]`, `[[workflows]]`, `[[agent-skills]]`, `[[agent-memory]]`, `[[context-engineering]]`, `[[personal-knowledge-bases]]`, `[[user-provided]]`, `[[home]]`, and the master `[[index]]`.
- Ran `bun run kb:refresh`; index rebuild succeeded with health reporting `review_backlog=0`, `stale_wiki=10`, and `uncovered_tags=1`.

## [2026-06-04] ingest | Lessons from building Claude Code: How we use skills
- Source note: `raw/articles/2026-06-02-lessons-from-building-claude-code-how-we-use-skills.md`
- Index rebuilt: 3277 chunks.

## [2026-06-04] ingest | Claude Code skills lessons repair and synthesis
- Replaced the first-pass generic source note with `[[2026-06-03-lessons-from-building-claude-code-how-we-use-skills]]` under `raw/articles/claude-blog/`, correcting the publication date to 2026-06-03 and preserving the full article body, including the opening "What are skills?" section.
- Updated `[[agent-skills]]`, `[[claude-code]]`, `[[context-engineering]]`, `[[internal-engineering-conventions]]`, and `[[workflows]]` with Anthropic's nine skill categories, verification-skill emphasis, gotchas, filesystem progressive disclosure, setup/memory, on-demand hooks, marketplace distribution, composition, and usage measurement.
- Updated `[[claude-blog]]`, `[[home]]`, and the master `[[index]]`; noted that the earlier autogenerated log entry points at the now-removed first-pass path.
- Ran `bun run kb:refresh`; final index rebuild succeeded with `3305` chunks from `377` markdown files and health reporting `review_backlog=0`, `stale_wiki=8`, and `uncovered_tags=1`.

## [2026-06-04] ingest | walkinglabs learn-harness-engineering repo
- Added `[[2026-06-04-walkinglabs-learn-harness-engineering]]` under `raw/articles/github-repos/`, recording that all 2,124 tracked files at commit `a8b9c9ba4ee8c470d5b51092ec682e761a3363a5` were read by checksum and summarizing the canonical English course, projects, capstone app, scripts, templates, and `harness-creator` skill.
- Added `[[2026-06-04-learn-harness-engineering-kb-upgrades]]` as the durable synthesis: five-subsystem harnesses, repo-as-system-of-record, feature-list state, executable verification, observability, clean handoff, and structural-validator cautions.
- Updated `[[agent-harnesses]]`, `[[context-engineering]]`, `[[repo-local-knowledge-bases]]`, `[[workflows]]`, `[[agent-skills]]`, `[[ai-agent-evals]]`, `[[durable-execution]]`, and `[[internal-engineering-conventions]]`.
- Updated `[[github-repos]]`, `[[home]]`, and the master `[[index]]`; source-internal validation noted Project 06 solution at `72/100` structurally and the repo root at `32/100`, without treating those scores as external performance proof.

## [2026-06-04] refresh | walkinglabs learn-harness-engineering repo
- Ran `bun run kb:refresh` after the ingest; index rebuild succeeded with `3319` chunks from `379` markdown files.
- Health reported `review_backlog=0`, `stale_wiki=8`, and `uncovered_tags=1`.

## [2026-06-04] ingest | Claude Code Dynamic Workflows X digest
- Added `[[2026-06-03-dynamic-workflows-claude-code-ingest]]` under `raw/articles/user-provided/`, preserving the local Markdown packet from `/Users/josemanuelcerqueira/Downloads/dynamic-workflows-claude-code-ingest.md`.
- Checked Anthropic's official May 28, 2026 Dynamic Workflows launch post during ingest; core feature/date/`ultracode`/token-cost/research-preview claims are confirmed there, while the six-pattern taxonomy remains practitioner synthesis from the X digest.
- Added `[[2026-06-04-claude-code-dynamic-workflows-operating-patterns]]` as durable synthesis for classify-and-act, fan-out-and-synthesize, adversarial verification, generate-and-filter, tournament comparison, loop-until-done, quarantine, and save-as-skill patterns.
- Updated `[[claude-code]]`, `[[workflows]]`, `[[agent-harnesses]]`, `[[agent-skills]]`, `[[agent-security]]`, `[[ai-agent-evals]]`, `[[context-engineering]]`, `[[user-provided]]`, `[[home]]`, and the master `[[index]]`.

## [2026-06-04] refresh | Claude Code Dynamic Workflows X digest
- Ran `bun run kb:refresh` after the ingest; index rebuild succeeded with `3352` chunks from `381` markdown files.
- Health reported `review_backlog=0`, `stale_wiki=7`, and `uncovered_tags=1`.

## [2026-06-05] refresh | KB content maintenance pass
- Reviewed and refreshed stale wiki pages: `[[agent-protocols]]`, `[[ai-validation-and-assurance]]`, `[[codebase-architecture]]`, `[[enterprise-agent-deployment-failure-modes]]`, `[[research-workflows]]`, `[[2026-05-02-flue-sandbox-agent-framework-source-teardown]]`, and `[[2026-06-03-matt-pocock-skills-ingest-assessment]]`.
- Folded newer source implications from `[[2026-05-27-zero-trust-for-ai-agents]]`, `[[2026-06-03-claude-use-cases-full-digest]]`, and `[[2026-06-04-mattpocock-skills]]` into the concept layer without creating new pages.
- Added telemetry-backed canonical phrases to `[[resolvers]]`, `[[managed-agents]]`, `[[voice-ai]]`, `[[google-ads]]`, and `[[2026-06-03-claude-use-cases-workflow-map]]` so current low-confidence search examples route to existing canonical pages.

## [2026-06-12] ingest | Peter Wang vertical-agent context hierarchy
- Added `[[2026-06-11-building-good-vertical-agent]]` under `raw/articles/user-provided/`, preserving the attached article text and treating Shortcut deployment/accuracy claims as self-reported practitioner evidence.
- Added `[[2026-06-12-vertical-agent-context-cache-hierarchy]]` as the durable synthesis: vertical agents should encode their domain task distribution into L1 hot-path wrappers, L2 fetched specs/tool schemas, and L3 raw-reference escape hatches.
- Updated `[[context-engineering]]`, `[[agent-tools]]`, `[[agent-skills]]`, `[[agent-harnesses]]`, `[[llm-agents]]`, `[[user-provided]]`, `[[home]]`, and the master `[[index]]`.

## [2026-06-17] ingest | Kevin polished UI with Claude article
- Added `[[2026-06-16-polished-ui-with-claude]]` under `raw/articles/user-provided/`, preserving the user-provided capture and recording the public X article/status URLs.
- Updated `[[ai-interface-design]]` with the reusable lesson that AI UI taste should be externalized as exact interaction constraints, not vague aesthetic prompts.
- Updated `[[2026-05-30-app-template-design-system-blueprint]]` with motion-token, tactile-state, drag/snap, reveal, FLIP, reduced-motion, and numeric prompting guidance.
- Treated the source as practitioner craft guidance rather than controlled evidence that the exact easing/shadow values are universal defaults.

## [2026-06-17] ingest | Apple HIG and IBM Carbon design-system sources
- Added `[[2026-06-17-apple-human-interface-guidelines]]` and `[[2026-06-17-carbon-design-system]]` under `raw/articles/design-systems/`, preserving official source metadata and linked source maps without copying full proprietary documentation.
- Updated `[[2026-05-30-component-theme-source-library]]` and `[[2026-05-30-app-template-design-system-blueprint]]` with Apple as platform-interaction calibration and Carbon as enterprise design-system / agent-context calibration.
- Updated `[[ai-interface-design]]` with Carbon for AI patterns around AI labeling, explainability, and revert states, plus Apple HIG retrieval guidance for platform-heavy UI work.
- Updated `[[design-systems]]` and the master `[[index]]`; treated both sources as official calibration references, not visual skins to clone.

## [2026-06-20] query | loop-engineer-template ingest assessment
- Inspected `JayZeeDesign/loop-engineer-template` at commit `a2267355209713a2184eaeef3b276ec680219d2b`, focusing on its five Claude Code skills, `ship-change.js` workflow, and `domains/signals/docs` loop-memory schema.
- Added `[[2026-06-20-loop-engineer-template-ingest-assessment]]` and updated the master `[[index]]`.
- Recommendation: worth a selective repo-level source note if collecting practical harness templates, but do not copy the skills wholesale or replace this KB's existing `AGENTS.md` / `wiki/` schema.

## [2026-07-25] ingest | Lamis Mukta agent-memory dreaming talk
- Added `[[2026-06-22-lamis-mukta-learning-while-you-sleep-beyond-memory-to-dreaming]]`, preserving all 944 timed English auto-caption cues, the complete Q&A, source metadata, evidence qualifications, and a searchable slide ledger.
- Archived and checksum-verified all 15 user-supplied screenshots under `raw/images/user-provided/2026-07-25-learning-while-you-sleep-dreaming/`, mapped to the supplied video timestamps.
- Added `[[2026-07-25-agent-memory-dreaming-production-pattern]]` and updated `[[agent-memory]]`, `[[agent-harnesses]]`, `[[context-engineering]]`, `[[multi-agent-systems]]`, `[[managed-agents]]`, and `[[agent-security]]`.
- Updated `[[user-provided]]`, `[[home]]`, and the master `[[index]]`; treated the anonymized 97% / 30% / cost / latency figures as self-reported customer outcomes rather than general benchmarks.

## [2026-07-25] ingest | Claude 5 context-engineering rules
- Added `[[2026-07-24-the-new-rules-of-context-engineering-for-claude-5-generation-models]]` under `raw/articles/claude-blog/`, preserving the full readable article, all four canonical figure URLs, diagram-only information, and the six “then → now” transitions.
- Added `[[2026-07-25-claude-5-context-engineering-rules]]`, distinguishing model-dependent prompt simplification from durable placement rules and enforceable safety boundaries.
- Updated `[[context-engineering]]`, `[[claude-code]]`, `[[agent-skills]]`, `[[agent-tools]]`, `[[agent-harnesses]]`, `[[ai-instruction-design]]`, `[[context-rot]]`, `[[repo-local-knowledge-bases]]`, `[[internal-engineering-conventions]]`, and `[[agent-memory]]`.
- Updated `[[claude-blog]]`, `[[home]]`, and the master `[[index]]`; treated the “over 80%” prompt reduction and no-measurable-loss result as an official but under-specified internal practitioner claim.

## [2026-07-25] refresh | Claude 5 context-engineering rules
- Ran `bun run kb:refresh`; the final index rebuild succeeded with `3460` chunks from `391` markdown files and KB lint passed with no warnings.
- `kb_find_gaps` reported no orphan sources, unreviewed ingests, thin concepts, source-count mismatches, review backlog, or uncovered tags; `79` unrelated wiki pages are past their pre-existing review-due dates.
- Retrieval verification ranked the new source note first and `[[2026-07-25-claude-5-context-engineering-rules]]` second for a Claude 5 context-engineering query.

## [2026-07-25] refresh | Lamis Mukta agent-memory dreaming talk
- Ran `bun run kb:refresh` against the combined workspace; the index rebuilt successfully with `3460` chunks from `391` markdown files and KB lint passed with no warnings.
- Verified transcript preservation programmatically: `944/944` timed caption cues match the fetched English track exactly, with zero missing or altered cues; all `15/15` archived screenshots are byte-identical to the supplied originals.
- Targeted metadata, required-heading, whitespace, and wiki-link checks passed; the new synthesis ranks first and the source note second for the dreaming / out-of-band memory-consolidation query.
- Health reported `review_backlog=0`, `stale_wiki=79`, and `uncovered_tags=0`; the stale pages are the repository's pre-existing review backlog, not ingest defects.

## [2026-07-27] query | AI-native organization execution platform spec
- Added `[[2026-07-27-ai-native-organization-execution-platform-spec]]`, a product-level specification for an idea → Goal Contract → durable execution → permission-filtered status → GitHub pull-request platform, synthesized from `26` existing source notes plus `[[2026-07-25-agent-memory-dreaming-production-pattern]]` and `[[2026-07-25-claude-5-context-engineering-rules]]`.
- Corrected the premise that one product can safely handle every AI workflow; recommended an opinionated kernel (Goal Contract, runs, approvals, capabilities, evidence, PR handoff) plus workflow packs and tiered connectors, per the audit-gap / over-LLMing / agent-sprawl failure modes in `[[enterprise-agent-deployment-failure-modes]]`.
- Recorded Multica as an optional execution-runtime and task-source adapter with an external `multica.ai` documentation URL in a separate labeled section; it is not a KB source note and is excluded from `source_count`.
- Kept `review_status: draft`, separated evidence-backed architecture from product speculation, and restated that the dreaming performance figures are self-reported anonymized customer outcomes rather than benchmarks; no concept page, source note, or `raw/` file was modified.
- Second revision after Codex review: added an `Out-Of-Box Organization Bootstrap` section specifying an admin-guided durable setup run (connect → read-only discovery → inert draft artifacts → connector permission tests and sandbox dry-run Goal Contract → owner approval, version pinning, activation), plus a `Consolidation Setup And Activation` subsection making dreaming setup automated but promotion governed: permission-matched trace scopes, retention/redaction, evidence threshold with dormant-by-default behavior, pre-consolidation eval baseline including rare workflows, cost/frequency ceilings, scheduled and event triggers, candidate clone with evidence ledger and human gate, canary, rollback, and pause/disable. Added acceptance criteria `11` and `12`; kept consolidation in Phase 2 because it depends on evidence accumulated in Phases 0–1.
- Revision after Codex review: added a current-landscape subsection covering Linear's agent app users, project/issue context, MCP, code intelligence, and Claude Code / Codex coding sessions alongside Multica's human-agent board and local runtimes, concluding the product must not compete as another issue tracker or agent board and naming its defensible kernel; added the official Linear and GitHub App permissions URLs to External Sources; corrected "one-shot" to mean one approved Goal Contract version / approval cycle that may require several approvers, with no merge or deploy authority. `source_count` stays `26`; no external URL is counted.

## [2026-07-27] lint | evidence-aware freshness and stale review
- Split freshness failures into missing metadata, calendar overdue, and linked-source drift; health and audit reports now expose calendar and drift counts separately.
- Added 45/90/180-day review tiers plus an explicit, documented `intentionally-thin` coverage status that does not suppress source-count or freshness checks.
- Reviewed all `79` formerly overdue concept and summary pages: none had newer linked evidence, statuses were preserved, and the queue closed at `review_backlog=0`, `calendar_overdue=0`, and `source_drift=0`.
- Strict three-source gap analysis now reports `0` unjustified thin concepts, `1` intentionally bounded concept (`[[obsidian]]`), `0` count mismatches, and `0` uncovered tags.

## [2026-07-27] ingest | protocols, observability, evals, compliance, and coaching
- Added pinned primary sources for A2A v1.0.1, OpenTelemetry GenAI semantic conventions, τ-bench/τ2, and BFCL; created `[[agent-observability]]` and updated the protocol, multi-agent, harness, managed-agent, tool, eval, benchmark, voice, and monitoring concepts.
- Added FTC lead-generation and FCC AI-voice/TCPA sources to `[[database-reactivation]]`, plus randomized-field-experiment evidence to `[[sales-coaching-gpt]]`; only the public sales-paper abstract was accessible, so full methods and effect sizes remain an open verification item.
- Added `[[2026-07-27-kb-freshness-and-primary-source-refresh]]`, the `[[academic-papers]]` collection index, and updated the master catalog, landing page, and affected source indexes.
- Recorded that MCP `2026-07-28-RC` is not the final release; the latest final remained `2025-11-25` on 2026-07-27, so no false final-release source was created.

## [2026-07-27] refresh | primary-source and freshness audit
- Expanded retrieval evaluation from `45` to `52` cases with A2A, OpenTelemetry GenAI, τ-bench, BFCL, FCC AI voice, AI sales coaching, and freshness-policy queries.
- `bun run kb:audit` passed with `404` indexed Markdown files, `3592` chunks, no lint or health gaps, and all `52/52` retrieval cases passing.
- Retrieval metrics after the refresh: `preferred_hit@1=0.942`, `relevant_hit@3=1`, `relevant_hit@5=1`, `mrr_preferred=0.971`, and `precision@3=0.769`.

## [2026-07-28] ingest | Caleb Curry deterministic-gates coding workflow
- Added `[[2026-07-15-these-90-minutes-will-change-the-way-you-use-ai]]`, preserving the supplied 1:28:43 timed transcript byte-for-byte and recording verified YouTube title, channel, publication date, runtime, and transcript checksum.
- Added `[[2026-07-28-deterministic-gates-for-agentic-coding-workflows]]`: recurring failures should move from prose into architecture or ratcheted deterministic gates, with model verification reserved for semantic residue and human review weighted by consequence.
- Updated `[[internal-engineering-conventions]]`, `[[agent-harnesses]]`, `[[workflows]]`, `[[claude-code]]`, `[[repo-local-knowledge-bases]]`, `[[multi-agent-systems]]`, and `[[agent-security]]`, plus `[[user-provided]]`, `[[home]]`, and the master `[[index]]`.
- Treated fixed file-size thresholds, productivity claims, model-only monitoring, permission bypass, cookie handoff, and large agent hierarchies as practitioner advice requiring local evidence or stronger controls—not KB defaults.

## [2026-07-28] refresh | deterministic-gates coding workflow
- `bun run kb:refresh` built `3618` chunks from `406` Markdown files with `review_backlog=0`, `stale_wiki=0`, and `uncovered_tags=0`.
- `bun run kb:audit` passed all `52/52` retrieval cases with no lint, freshness, source-count, thin-concept, drift, or uncovered-tag failures.
- Targeted retrieval ranked `[[2026-07-28-deterministic-gates-for-agentic-coding-workflows]]` first, the Caleb Curry source second, and `[[internal-engineering-conventions]]` third.
- Recomputed the archived source-text SHA-256 after indexing; it still matches the supplied transcript exactly.

## [2026-07-28] refresh | primary-source cross-check of Caleb Curry workflow claims
- Reclassified the video as a practitioner hypothesis source rather than authority and added a claim-by-claim ledger using current Claude Code docs plus primary Anthropic, TypeScript, ESLint, PostgreSQL, Git, MCP, and OpenTelemetry material.
- Corroborated the guidance-versus-enforcement distinction, deterministic command hooks, skills/subagent context split, strict typing/custom lint capability, and permission-plus-sandbox defense in depth.
- Qualified ratcheted legacy gates, tenant adapters, worktrees, MCP endpoint mirroring, and multi-agent bundles; primary sources support parts of the mechanisms but not the video's general performance claims or exact workflow.
- Marked fixed file-size thresholds, drastic token savings, self-learning-vault gains, and model-only monitoring as unverified; rejected browser-cookie/ambient-key handoff and permission bypass outside strict fail-closed isolation.

## [2026-07-28] lint | independent recheck of Caleb Curry ledger against current Claude Code docs
- Corrected a factual error the first pass left unclassified: the video claims bypassed permissions ignore allow/deny rules, leaving hooks as the only restriction. Current `permission-modes` documentation says deny and explicit ask rules apply in every mode including `bypassPermissions`, and only allow rules go inert; the hook advice survives but its stated premise does not. Recorded as a **Rejected** ledger row in `[[2026-07-15-these-90-minutes-will-change-the-way-you-use-ai]]`, as a rejected bullet in `[[2026-07-28-deterministic-gates-for-agentic-coding-workflows]]`, and as defensive-pattern lines in `[[claude-code]]` and `[[agent-security]]`.
- Strengthened the multi-agent verdict from "not validated" to counter-evidence for the coding case, citing the ~15× multi-agent and ~4× single-research-agent token multipliers and the "fewer truly parallelizable tasks than research" conclusion. Anchored both figures in `[[2025-06-13-how-we-built-our-multi-agent-research-system]]`, whose extracted sections had not recorded them, so the claim is locally traceable; that note's uncopied `## Source Text` was left untouched and `source_count` values are unchanged everywhere.
- Distinguished agent teams from subagents across the summary, `[[claude-code]]`, and `[[multi-agent-systems]]`: independent sessions, peer-to-peer messaging, shared task list, one full instance per teammate, experimental and disabled by default. The video's bundle/sub-orchestrator pattern is mapped as an approximation of that surface, not as subagent behavior.
- Added current nuance that a skill can run isolated via `context: fork` and a subagent can preload skills via `skills:`, and contrasted the unverified "self-learning vault" with shipped auto memory as its auditable, machine-local counterpart.
- Retiered the summary to the 45-day fast-moving tier (`review_due: 2026-09-11`) because its load-bearing claims are platform behavior. Left `[[multi-agent-systems]]`, `[[agent-harnesses]]`, `[[workflows]]`, `[[internal-engineering-conventions]]`, and `[[repo-local-knowledge-bases]]` on the 90-day operational tier: their subject matter is durable orchestration and convention design, so AGENTS.md does not require the vendor-product tier; the volatile product specifics live in `[[claude-code]]` and `[[agent-security]]`, which are already at 45 days.
- Readability: added a reading-boundary line to the source metadata marking that analysis ends at `## Related` (~17 KB) and the archival transcript below is ~86 KB, and normalized the ledger to a fixed five-term verdict vocabulary (Corroborated, Corroborated with caveat, Partially supported, Unverified, Rejected) so it can be filtered mechanically. No cross-check table was duplicated; the summary remains canonical.
- Verified the archived `## Source Text` is byte-identical to the supplied transcript rather than trusting the recorded hash: the section equals the attachment exactly plus one terminating newline, which the attachment lacks. The recorded SHA-256 is the hash of the local transcript file and still matches it.

## [2026-07-29] ingest | understanding gates for agentic workflows
- Added `[[2026-07-29-understanding-is-the-new-bottleneck]]`, preserving the complete user-supplied transcript, and `[[2026-06-28-explain-diff-skill]]`, preserving both public gist variants.
- Added `[[2026-07-29-understanding-gates-for-agentic-workflows]]`: use a risk-triggered comprehension gate after deterministic verification, bind explanations to a code state, require real human retrieval or teach-back, and reserve micro-worlds for behavior static media cannot expose well.
- Updated `[[claude-code]]`, `[[agent-skills]]`, and `[[workflows]]`, plus `[[user-provided]]`, `[[github-repos]]`, `[[home]]`, and the master `[[index]]`.
- Kept the recommendation as a measured pilot rather than changing `AGENTS.md`: the talk and skill are coherent practitioner evidence, but they do not establish outcome improvements or universal thresholds.

## [2026-07-29] refresh | understanding gates for agentic workflows
- `bun run kb:refresh` built `3656` chunks from `409` Markdown files with no review backlog, stale wiki pages, source drift, thin concepts, source-count mismatches, orphan sources, or uncovered tags.
- `bun run kb:audit` passed all `52/52` retrieval cases: `preferred_hit@1=0.942`, `relevant_hit@3=1`, `mrr_preferred=0.971`, and `precision@3=0.769`.
- `kb_find_gaps` returned no actionable gaps after the new `explanations` and `quizzes` tags were covered by `[[agent-skills]]`.

## [2026-07-29] ingest | domain-specific agent composition
- Added `[[2026-06-28-the-future-is-domain-specific-agents]]`, preserving the user-supplied timed transcript and recording that its final roughly 23 seconds are missing from the attachment.
- Added `[[domain-specific-agents]]`: specialize when context, tools, state, authority, and evaluation form a stable boundary; measure the coordinator and every handoff rather than treating a smaller worker prompt as end-to-end efficiency.
- Updated `[[multi-agent-systems]]`, `[[context-engineering]]`, `[[agent-tools]]`, `[[llm-agents]]`, `[[agent-security]]`, `[[agent-frameworks]]`, and `[[agent-harnesses]]`, plus `[[user-provided]]`, `[[home]]`, and the master `[[index]]`.
- Kept the talk's “80% efficiency,” `137×` model-cost, and 2026 token-price trend figures as underspecified speaker-reported claims rather than KB planning constants.

## [2026-07-29] refresh | domain-specific agent composition
- `bun run kb:refresh` built `3674` chunks from `411` Markdown files with no review backlog, stale wiki pages, source drift, or uncovered tags.
- `bun run kb:audit` completed successfully, and `kb_find_gaps` reported `0` orphan sources, `0` unreviewed ingests, `0` thin concepts, `0` source-count mismatches, and `0` uncovered tags.
- Targeted retrieval ranked `[[domain-specific-agents]]` first, `[[2026-06-28-the-future-is-domain-specific-agents]]` second, and `[[agent-tools]]` third for the tool-versus-specialist decision query.
- Verified the archived source text is byte-identical to the supplied `33,512`-byte transcript plus one terminating newline; the recorded SHA-256 remains `e553a0feb774ec550c7d5f99c1f00184a89fd75dd61f6afc3196b1602f39fda6`.

## [2026-07-29] ingest | evidence-gated harnesses and skill ablation
- Added `[[2026-05-30-how-i-deleted-95-percent-of-my-agent-skills-and-got-better-results]]`, preserving the complete supplied 17:20 timed transcript and recording the verified YouTube title, speaker, channel, premiere date, and transcript checksum.
- Extended `[[2026-07-28-deterministic-gates-for-agentic-coding-workflows]]` with a completion-evidence contract and a context-change ablation protocol instead of creating a duplicative summary.
- Updated `[[agent-harnesses]]`, `[[agent-skills]]`, `[[ai-agent-evals]]`, `[[agent-memory]]`, and `[[workflows]]`, plus `[[user-provided]]` and the master `[[index]]`.
- Treated the 10,000→553 lines, 68→6 minutes, and 77%→97% figures as under-specified practitioner results; clarified that a hash detects later artifact changes but does not prove execution unless trusted capture binds it to the current task and code state.

## [2026-07-29] refresh | evidence-gated harnesses and skill ablation
- `bun run kb:refresh` completed without lint warnings, review backlog, stale pages, source drift, thin concepts, source-count mismatches, or uncovered tags.
- `bun run kb:audit` passed all `52/52` retrieval cases with `preferred_hit@1=0.942`, `relevant_hit@3=1`, `mrr_preferred=0.971`, and no search-eval failures.
- MCP `kb_find_gaps` reported `0` orphan sources, unreviewed ingests, thin concepts, review backlog items, stale pages, source drift, and uncovered tags.
- Targeted retrieval ranked `[[2026-07-28-deterministic-gates-for-agentic-coding-workflows]]` first and the new Nick Nisi source second; the archived source text remains byte-identical to the supplied `22,032`-byte transcript plus one terminating newline.

## [2026-07-29] sync | Railway egress + thin-client API-gateway branch
- Filed `[[2026-06-08-railway-egress-thin-client-api-gateway]]` under `wiki/summaries/` as internal decision rationale, not an external-source ingest.
- Captured Railway egress-not-ingress billing, private-network versus public-proxy cost/latency, the serverless-to-single-region-Postgres anti-pattern, and the thin-client API-gateway topology.
- Merged the legacy topic branch into `main` and updated `[[home]]` plus the master `[[index]]`; no concept pages were touched because this topic is adjacent infrastructure guidance rather than core AI/agent synthesis.

## [2026-07-30] ingest | How enabling two settings tripled our scores on the ARC-AGI-3 benchmark
- Source note: `raw/articles/2026-07-30-how-enabling-two-settings-tripled-our-scores-on-the-arc-agi-3-benchmark.md`
- Index rebuilt: 3405 chunks.

## [2026-07-30] ingest | Context Collapse, Part 3 - AI Worming through Word
- Source note: `raw/articles/2026-07-28-context-collapse-part-3-ai-worming-through-word.md`
- Index rebuilt: 3413 chunks.

## [2026-07-30] synthesize | Daily AI brief — harness continuity and document-borne prompt injection
- Refined and moved the OpenAI source to `raw/articles/openai/2026-07-29-how-enabling-two-settings-tripled-our-arc-agi-3-scores.md`; preserved the captured source text and added verified metadata, structured claims, caveats, and links to `[[ai-agent-evals]]` and `[[context-engineering]]`.
- Refined and moved the coordinated-disclosure source to `raw/articles/security-research/2026-07-28-context-collapse-part-3-ai-worming-through-word.md`; preserved the captured source text and added the author, disclosure evidence, trust-laundering implications, and links to `[[agent-security]]`.
- Added `[[2026-07-30-harness-context-continuity-and-trust-boundaries]]`, synthesizing the shared lesson that continuity is both a capability primitive and a security boundary.
- Added the `[[openai]]` and `[[security-research]]` collection indexes and updated the master `[[index]]`.

## [2026-07-30] lint | Daily AI brief knowledge promotion
- `bun run kb:refresh` and `bun run kb:lint` passed with no warnings.
- `bun run kb:report --json` found no orphan source notes, temporary ingested notes, thin concepts, source-count mismatches, review backlog, or uncovered tags.
- Retrieval checks ranked the new primary source, synthesis, and updated canonical concept pages for both ARC-AGI-3 context-policy and document-borne prompt-injection queries.
- Exact content and filename searches confirmed that the mistakenly added unrelated material had been removed.

## [2026-07-31] ingest | Guidelines for Human-AI Interaction - Microsoft Research
- Source note: `raw/articles/2019-01-10-guidelines-for-human-ai-interaction-microsoft-research.md`
- Index not rebuilt this run (`--no-refresh`).

## [2026-07-31] refresh | Guidelines for Human-AI Interaction curation
- Curated and relocated the autogenerated capture to `raw/articles/hci-research/2019-05-02-guidelines-for-human-ai-interaction.md`, preserving its `## Source Text` while adding the verified CHI/DOI metadata, 18-guideline lifecycle, study method, evidence limits, and practical evaluation pattern.
- Updated `[[ai-interface-design]]` with expectation-setting, bounded automation, wrong-state recovery, local-versus-global controls, and post-change evaluation; updated `[[fairness-and-ml]]` with diverse interaction-layer review and explicit limits.
- Added the `[[hci-research]]` collection index and updated the master `[[index]]`; semantic and exact-title/URL/author searches found no prior copy of the paper.
- Validation and final Git disposition are reported by the 2026-07-31 daily design-with-AI run.

## [2026-07-31] ingest | Hermes Agent v0.19.1 Source Teardown
- Source note: `raw/articles/github-repos/2026-07-31-hermes-agent-v0-19-1-source-teardown.md`
- Index not rebuilt this run (`--no-refresh`).

## [2026-07-31] synthesize | Hermes v0.19.1 and Kery's evidence-locked financial-agent direction
- Curated the ingested Hermes source against commit `f3cda0ceb18d8ba7465a6d223098ef0e56c8fee1` and marked the May v0.14.0 teardown as superseded without deleting its provenance.
- Supplementally inspected Pi Agent at `ab366ebe94cacd419d986be454f12b1b9913aaca` as the smaller typed-loop counterweight to Hermes's broad operating environment.
- Added `[[2026-07-31-kery-beyond-hermes-evidence-locked-financial-agent]]`, separating Hermes patterns to adopt, adapt, and reject for a high-assurance financial runtime.
- Updated seven canonical concept pages: `[[agent-frameworks]]`, `[[managed-agents]]`, `[[durable-execution]]`, `[[agent-harnesses]]`, `[[agent-tools]]`, `[[agent-protocols]]`, and `[[agent-skills]]`.
- Updated the GitHub-repos collection index and master index.

## [2026-07-31] lint | Hermes v0.19.1 and Kery synthesis
- `bun run kb:refresh` rebuilt 3,490 chunks from 396 Markdown files; `bun run kb:lint` passed with no warnings.
- `bun run kb:report --json` found no orphan sources, temporary ingested notes, thin concepts, source-count mismatches, review backlog, or uncovered tags. The repository still reports 82 pre-existing stale wiki pages.
- Retrieval checks ranked the new Hermes source first for the current-runtime query and the Kery synthesis first for the evidence-locked financial-agent query.
- Kery's full `bun run verify` passed independently; focused composed-app probes still identify HTTP error paths that the current suite does not cover.

## [2026-07-31] refine | Configurable automatic skill evolution

- Refined the Kery architecture plan with an installation-level `skills.updateMode`: `automatic`, `review`, or `disabled`.
- Automatic mode reuses the canonical proposal validation and transactional acceptance path; deletion, conflicts, Metis release mutation, and rebase conflicts remain review-only.
- Added decision provenance, immutable before/after history, batched notification, rollback, mutation-rate limits, and next-run activation as required safeguards.

## [2026-08-01] ingest | TypeScript modules reference

- Curated the official TypeScript Team modules reference as `[[2026-08-01-typescript-modules-reference]]`, preserving the endpoint-captured `## Source Text` while correcting provenance, status, metadata, and collection placement.
- Created `[[typescript-module-systems]]` for host-matched module resolution, type/runtime boundaries, declarations, package export maps, workspace topology, consumer tests, and transfer limits across Node, Bun, and bundlers.
- Updated `[[codebase-architecture]]`, `[[internal-engineering-conventions]]`, `[[2026-05-30-backend-stack-patterns-blueprint]]`, `[[official-docs]]`, and the master `[[index]]`; exact URL/title and semantic searches found no prior TypeScript module-resolution source.
- The ingester's preceding autogenerated entry records its temporary root path; curation retained the endpoint-selected note and moved it to the repository's established `official-docs` collection before validation.

## [2026-08-01] ingest | Documentation - Modules - Reference
- Source note: `raw/articles/2026-08-01-documentation-modules-reference.md`
- Index not rebuilt this run (`--no-refresh`).

## [2026-08-01] note | TypeScript ingest log path correction

- The autogenerated ingest entry immediately above records the endpoint's temporary path at acquisition time; the curated active note now lives at `raw/articles/official-docs/2026-08-01-typescript-modules-reference.md` as `[[2026-08-01-typescript-modules-reference]]`.
- The earlier curation entry appears before the autogenerated line because both edits landed during the same run; this bottom entry is the canonical final-path correction.

## [2026-08-01] ingest | std::pin - Rust
- Source note: `raw/articles/2026-08-01-std-pin-rust.md`
- Index rebuilt: 3520 chunks.

## [2026-08-01] refresh | Rust pinning and address-sensitive types
- Curated and relocated the endpoint capture to `raw/articles/official-docs/2026-08-01-rust-std-pin-module.md` as `[[2026-08-01-rust-std-pin-module]]`, preserving its complete `## Source Text`; the autogenerated entry above records the temporary acquisition path.
- Created `[[rust-pinning-and-address-sensitive-types]]` around the lifecycle contract, ownership and trait boundaries, structural projection, pinned destruction, async implications, unsafe invariants, performance rationale, and transfer limits.
- Updated `[[official-docs]]` and the master `[[index]]`; exact URL/content and semantic searches found no prior Rust pinning source or concept.
- Selected the official Rust standard-library documentation because it identifies itself as the source of truth for unsafe `Pin` interface implementers; no product repository, branch, commit, or PR was inspected or changed.

## [2026-08-01] ingest | Homogenization Effects of Large Language Models on Human Creative Ideation
- Source note: `raw/articles/2026-08-01-homogenization-effects-of-large-language-models-on-human-creative-ideation.md`
- Index not rebuilt this run (`--no-refresh`).

## [2026-08-01] refresh | AI-assisted creative ideation and collective homogenization

- Curated and relocated the endpoint capture to `raw/articles/hci-research/2024-06-22-homogenization-effects-of-large-language-models-on-human-creative-ideation.md`, preserving its `## Source Text`; the autogenerated entry above records the temporary acquisition path.
- Added `[[ai-assisted-creative-ideation]]` around intent elicitation, inferential distance, human ownership, portfolio-level convergence, provenance, accessibility, and a practical evidence-to-evaluation workflow.
- Updated `[[ai-interface-design]]`, `[[ai-agent-evals]]`, `[[hci-research]]`, `[[home]]`, and the master `[[index]]`; exact title, DOI, arXiv URL, author, and semantic-overlap searches found no prior copy.
- Evidence boundary: the peer-reviewed within-subjects study analyzed 33 people using 2023 ChatGPT 3.5 in short laboratory tasks; proposed mitigations remain design hypotheses, and the paper's elaboration p-value is internally inconsistent.

## [2026-08-01] ingest | understanding-proprietary-amms
- Source note: `raw/articles/solana/2026-08-01-understanding-proprietary-amms.md`
- Index not rebuilt this run (`--no-refresh`).

## [2026-08-01] ingest | Jupiter Developers
- Source note: `raw/articles/jupiter/2026-08-01-jupiter-developers.md`
- Index not rebuilt this run (`--no-refresh`).

## [2026-08-01] ingest | Solana’s Proprietary AMM Revolution
- Source note: `raw/articles/helius/2026-08-01-solana-s-proprietary-amm-revolution.md`
- Index not rebuilt this run (`--no-refresh`).

## [2026-08-01] ingest | PropAMMs and the Next Chapter of Permissionless Market Structure
- Source note: `raw/articles/jump-crypto/2026-08-01-propamms-and-the-next-chapter-of-permissionless-market-structure.md`
- Index not rebuilt this run (`--no-refresh`).

## [2026-08-01] ingest | Effective Go
- Source note: `raw/articles/official-docs/2026-08-01-effective-go.md`
- Index not rebuilt this run (`--no-refresh`).

## [2026-08-01] synthesize | Effective Go applied to the Zappx server

- Curated the official Go Project source as [[2026-08-01-effective-go]], preserving its complete ingested `## Source Text` and recording the HTTP snapshot size, line coverage, and SHA-256 provenance.
- Added [[effective-go-for-production-servers]] to reconcile durable core-language idioms with modern Go, explicit lifecycle/dependency bounds, and repository-owned architecture.
- Added [[2026-08-01-effective-go-applied-to-zappx-server]], a 60-entry lesson matrix over the current Zappx Go backend with line-level evidence, modern corrections, validation limits, and prioritized runtime/product risks.
- Updated [[official-docs]] and the master [[index]]. The product repositories remained read-only; known wallet durability/capacity requirements are distinguished from findings directly attributable to the language review.

## [2026-08-01] lint | Effective Go source and Zappx application matrix

- Targeted `gray-matter` parsing passed for the new source, concept, summary, official-docs index, master index, and append-only log; all new wiki links resolve and `git diff --check` reports no whitespace errors.
- A live heading comparison matched the official page's 60 heading-level entries exactly and the application table contains exactly 60 numbered rows.
- `bun run kb:refresh` is blocked before indexing by the pre-existing untracked `raw/articles/helius/2026-08-01-solana-s-proprietary-amm-revolution.md`, whose generated unquoted `summary` is invalid YAML. That unrelated source was present before this task and remains untouched.
- The local Rollify environment has no Go toolchain, so Go formatting, vet, static analysis, build, race, and integration gates were documented from CI but not claimed as executed branch evidence.

## [2026-08-02] ingest | Documentation - Narrowing
- Source note: `raw/articles/2026-08-02-documentation-narrowing.md`
- Index not rebuilt this run (`--no-refresh`).

## [2026-08-02] ingest | TypeScript narrowing and exhaustive domain states

- Curated and relocated the official TypeScript Team handbook capture to `raw/articles/official-docs/2026-08-02-typescript-narrowing.md` as [[2026-08-02-typescript-narrowing]], preserving the endpoint-captured `## Source Text`; the autogenerated entry above records its temporary acquisition path.
- Added [[typescript-control-flow-narrowing]] around runtime evidence, flow-sensitive types, discriminated unions, custom-predicate trust, boundary validation, exhaustive handling, package/API ownership, tests, performance limits, and open-versus-closed vocabularies.
- Updated [[codebase-architecture]], [[internal-engineering-conventions]], [[2026-05-30-backend-stack-patterns-blueprint]], [[typescript-module-systems]], [[official-docs]], and the master [[index]].
- Deduplication found no prior canonical URL, exact title, source note, or semantic treatment of TypeScript control-flow narrowing; the adjacent modules source covers the package/runtime graph rather than state refinement.

## [2026-08-02] ingest | Send and Sync - The Rustonomicon
- Source note: `raw/articles/2026-08-02-send-and-sync-the-rustonomicon.md`
- Index not rebuilt this run (`--no-refresh`).

## [2026-08-02] refresh | Rust Send, Sync, and thread-safety boundaries

- Curated and relocated the endpoint capture to `raw/articles/official-docs/2026-08-02-rustonomicon-send-and-sync.md` as [[2026-08-02-rustonomicon-send-and-sync]], preserving its complete `## Source Text`; the autogenerated entry above records the temporary acquisition path.
- Added [[rust-send-sync-and-thread-safety]] around ownership transfer, shared-reference capabilities, auto-trait derivation, hidden aliases, conditional generic bounds, FFI ownership, and destructor thread affinity; connected the independent thread-transfer proof to [[rust-pinning-and-address-sensitive-types]].
- Updated [[official-docs]] and the master [[index]]. Exact URL/title searches and semantic retrieval found no prior Send/Sync source; the adjacent pinning source explicitly left thread transfer out of scope.
- Evidence boundary: the Rustonomicon is first-party Rust Project advanced guidance, but this educational chapter ends with an explanatory TODO and its `Carton` allocator is a proof sketch rather than production FFI guidance.

## [2026-08-02] ingest | The 2026-07-28 Model Context Protocol Specification
- Source note: `raw/articles/official-docs/2026-07-28-the-2026-07-28-model-context-protocol-specification.md`
- Index not rebuilt this run (`--no-refresh`).

## [2026-08-02] ingest | Investigating three real-world incidents in our cybersecurity evaluations
- Source note: `raw/articles/anthropic-engineering/2026-07-30-investigating-three-real-world-incidents-in-our-cybersecurity-evaluations.md`
- Index not rebuilt this run (`--no-refresh`).

## [2026-08-02] ingest | Weekly AI research — explicit state and enforced boundaries

- Curated [[2026-07-28-the-2026-07-28-model-context-protocol-specification]] and [[2026-07-30-investigating-three-real-world-incidents-in-our-cybersecurity-evaluations]], preserving both ingested `## Source Text` sections while replacing first-pass metadata and extraction with verified claims, caveats, entities, and canonical links.
- Added [[2026-08-02-explicit-state-and-enforced-boundaries-weekly]] to synthesize the MCP and cyber-eval evidence with the week's already-ingested ARC-AGI-3 and document-borne prompt-injection sources.
- Updated [[agent-protocols]], [[durable-execution]], [[agent-security]], [[ai-agent-evals]], [[official-docs]], [[anthropic-engineering]], [[home]], and the master [[index]].
- Deduplication: exact URL/title searches and KB retrieval found the official MCP repository but not this specification release, and found adjacent eval/security sources but not Anthropic's incident report; the OpenAI harness and Word injection items were already represented and were not re-ingested.

## [2026-08-02] ingest | AI Chains: Transparent and Controllable Human-AI Interaction by Chaining Large Language Model Prompts
- Source note: `raw/articles/2026-08-02-ai-chains-transparent-and-controllable-human-ai-interaction-by-chaining-large-language-model-prompts.md`
- Index not rebuilt this run (`--no-refresh`).

## [2026-08-02] refresh | AI Chains and inspectable human-AI workflows

- Curated and relocated the endpoint capture to `raw/articles/hci-research/2022-04-29-ai-chains-transparent-and-controllable-human-ai-interaction.md` as [[2022-04-29-ai-chains-transparent-and-controllable-human-ai-interaction]], preserving the acquired `## Source Text` and inspecting the complete CHI 2022 paper separately.
- Updated [[ai-interface-design]], [[workflows]], [[ai-agent-evals]], [[hci-research]], and the master [[index]] with editable intermediate artifacts, local-versus-global steering, branch comparison, rerun-from-stage recovery, sandbox-to-structure progressive disclosure, and full-interaction evaluation.
- Deduplication by canonical URL, DOI/title, authors, AI Chains system name, and semantic retrieval found adjacent human-AI lifecycle and creative-homogenization sources but no prior copy or equivalent treatment of editable LLM chains.
- Evidence boundary: the within-subjects study covered 20 employees, two short text tasks, and one 2021-era model; accessibility and privacy were not evaluated, the accessibility application was only a case study, and increased structure also introduced complexity and constrained exploration.

## [2026-08-03] ingest | Documentation - Type Compatibility
- Source note: `raw/articles/2026-08-03-documentation-type-compatibility.md`
- Index not rebuilt this run (`--no-refresh`).

## [2026-08-03] ingest | TypeScript structural compatibility and API soundness

- Curated and relocated the official TypeScript Team handbook capture to `raw/articles/official-docs/2026-08-03-typescript-type-compatibility.md` as [[2026-08-03-typescript-type-compatibility]], preserving its endpoint-captured `## Source Text`; the autogenerated entry above records the temporary acquisition path.
- Added [[typescript-structural-compatibility]] around structural assignability, callback variance, generic participation, nominal islands, runtime admission, declaration/package ownership, executable type tests, performance evidence limits, and semantic substitutability.
- Updated [[codebase-architecture]], [[internal-engineering-conventions]], [[typescript-control-flow-narrowing]], [[typescript-module-systems]], [[official-docs]], and the master [[index]].
- Deduplication by canonical URL, exact title/team, and semantic retrieval found no prior source or canonical treatment; the existing narrowing and module pages cover flow-sensitive state consumption and package loading rather than assignability itself.

## [2026-08-03] ingest | Tokio select and async cancellation ownership

- Curated and relocated the first-party Tokio tutorial capture to `raw/articles/official-docs/2026-08-03-tokio-select.md` as [[2026-08-03-tokio-select]], preserving the endpoint-captured `## Source Text`; the autogenerated entry records the temporary root path selected during acquisition.
- Added [[rust-async-cancellation-and-select]] around drop cancellation, same-task borrowed multiplexing, spawned-child ownership, pinned operation identity across loops, partial progress, fairness, error boundaries, and executable cancellation checks.
- Updated [[rust-pinning-and-address-sensitive-types]], [[rust-send-sync-and-thread-safety]], [[official-docs]], and the master [[index]].
- Deduplication by canonical URL, Tokio/select identifiers, exact content search, and semantic retrieval found no prior source or canonical cancellation treatment; the pinning and Send/Sync pages explicitly left cancellation ownership unresolved.

## [2026-08-03] ingest | Select
- Source note: `raw/articles/2026-08-03-select.md`
- Index not rebuilt this run (`--no-refresh`).

## [2026-08-03] note | Tokio select ingest path correction

- The autogenerated ingest entry immediately above records the acquisition-time path; the curated active note now lives at `raw/articles/official-docs/2026-08-03-tokio-select.md` as [[2026-08-03-tokio-select]].
- The curation entry appears before the autogenerated line because both writes landed during the same run; this bottom entry is the canonical final-path correction.

## [2026-08-03] ingest | PromptCharm mixed-initiative generative editing

- Curated and relocated the endpoint capture to `raw/articles/hci-research/2024-05-11-promptcharm-multimodal-prompting-and-refinement.md` as [[2024-05-11-promptcharm-multimodal-prompting-and-refinement]], preserving its acquired `## Source Text`; the endpoint wrote its staging note but failed during index rebuild because its generated unquoted summary contained a colon.
- Updated [[ai-interface-design]], [[ai-assisted-creative-ideation]], [[ai-agent-evals]], [[hci-research]], and the master [[index]] with explanation-action pairings, semantic versus spatial control, accepted-region preservation, exploration/exploitation modes, progressive previews, version recovery, and full-loop evaluation.
- Deduplication by canonical arXiv URL, DOI/title, authors, PromptCharm system name, and semantic overlap found adjacent lifecycle, editable-chain, and homogenization studies but no prior copy or equivalent multimodal steering treatment.
- Evidence boundary: CHI 2024 peer-reviewed system research with two 12-person within-subjects studies, but short novice-only tasks, one 2022-era diffusion model, bundled features, self-rated open-ended quality, and no accessibility, privacy, provenance, copyright, artist-consent, or homogenization evaluation.

## [2026-08-04] ingest | Documentation - Conditional Types
- Source note: `raw/articles/2026-08-04-documentation-conditional-types.md`
- Index not rebuilt this run (`--no-refresh`).

## [2026-08-04] ingest | TypeScript conditional types and public generic relations

- Curated and relocated the official TypeScript Team handbook capture to `raw/articles/official-docs/2026-08-04-typescript-conditional-types.md` as [[2026-08-04-typescript-conditional-types]], preserving the endpoint-captured `## Source Text`; the autogenerated entry above records its acquisition path.
- Added [[typescript-conditional-types]] around structural branch tests, true-branch refinement, `infer`, deliberate union distribution, type/runtime alignment, declaration ownership, consumer fixtures, checker performance, and lifecycle limits.
- Updated [[typescript-structural-compatibility]], [[typescript-control-flow-narrowing]], [[typescript-module-systems]], [[codebase-architecture]], [[internal-engineering-conventions]], [[2026-05-30-backend-stack-patterns-blueprint]], [[official-docs]], and the master [[index]].
- Deduplication by canonical URL, exact title/team, content search, and semantic retrieval found no prior source or canonical treatment; existing TypeScript notes cover module graphs, runtime narrowing, and structural assignability rather than generic type-level input-output transforms.
- Evidence boundary: this first-party handbook chapter defines core semantics but provides no recursion limit, compiler/editor benchmark, declaration-emit study, runtime validation, or cross-version inference guarantee; those require package-specific executable evidence.

## [2026-08-04] ingest | Behavior considered undefined - The Rust Reference
- Source note: `raw/articles/2026-08-04-behavior-considered-undefined-the-rust-reference.md`
- Index not rebuilt this run (`--no-refresh`).

## [2026-08-04] refresh | Rust unsafe validity and undefined behavior

- Curated and relocated the endpoint capture to `raw/articles/official-docs/2026-08-04-rust-reference-undefined-behavior.md` as [[2026-08-04-rust-reference-undefined-behavior]], preserving its complete `## Source Text`; the autogenerated entry above records the acquisition-time path.
- Added [[rust-unsafe-validity-and-undefined-behavior]] around sound safe surfaces, pointer and allocation requirements, aliasing, immediate type validity, traits, FFI, cancellation/destruction paths, tooling layers, performance evidence, and change amplification.
- Updated [[rust-pinning-and-address-sensitive-types]], [[rust-send-sync-and-thread-safety]], [[rust-async-cancellation-and-select]], [[official-docs]], and the master [[index]].
- Deduplication by canonical URL, exact title, content search, and semantic retrieval found no prior source or canonical UB/validity treatment; evidence is first-party but explicitly non-exhaustive, with aliasing, union validity, parts of pointer validity, and runtime assumptions still unsettled.

## [2026-08-04] ingest | People + AI Guidebook
- Source note: `raw/articles/2026-08-04-people-ai-guidebook.md`
- Index rebuilt: 4046 chunks.

## [2026-08-04] refresh | Google PAIR human-centered AI product design lifecycle

- Curated and relocated the endpoint-selected staging note to `raw/articles/hci-research/2026-08-04-people-ai-guidebook.md` as [[2026-08-04-people-ai-guidebook]]; the client-rendered landing page yielded no body, so its exact `No source text extracted.` result remains immutable while the current official HTML/application bundle was inspected separately and recorded with byte counts and SHA-256 provenance.
- Added [[human-centered-ai-product-design]] to connect validated user need, autonomy and interaction policies, layered control, mental models, graceful recovery, accessibility/privacy, and pre/post-launch evaluation into one product contract; updated [[ai-interface-design]], [[ai-agent-evals]], [[hci-research]], and the master [[index]].
- Deduplication by canonical URL, title, Google PAIR organization, guidebook identity, product examples, and semantic retrieval found no prior source; [[2019-05-02-guidelines-for-human-ai-interaction]] is complementary peer-reviewed interaction guidance rather than a duplicate of this broader product lifecycle.
- Evidence boundary: this is high-reputation first-party practitioner guidance with public references, worksheets, patterns, and cases, but the dozens of Google studies said to inform it are proprietary and individual recommendations do not expose consistent samples, methods, effect sizes, or causal outcome evidence.

## [2026-08-05] ingest | Documentation - Mapped Types
- Source note: `raw/articles/2026-08-05-documentation-mapped-types.md`
- Index not rebuilt this run (`--no-refresh`).

## [2026-08-05] ingest | TypeScript mapped types and derived API projections

- Curated and relocated the official TypeScript Team handbook capture to `raw/articles/official-docs/2026-08-05-typescript-mapped-types.md` as [[2026-08-05-typescript-mapped-types]], preserving its endpoint-captured `## Source Text`; the autogenerated entry above records the acquisition-time path.
- Added [[typescript-mapped-types]] around owned key vocabularies, modifiers, key remapping/filtering, runtime erasure, declaration/package ownership, lifecycle composition, executable type/runtime tests, checker performance, and change amplification.
- Updated [[typescript-conditional-types]], [[typescript-structural-compatibility]], [[typescript-module-systems]], [[internal-engineering-conventions]], [[official-docs]], and the master [[index]].
- Deduplication by canonical URL, exact title/team, content search, and semantic retrieval found no prior source or canonical mapped-type treatment; the adjacent conditional-types source covers branch relations rather than property-set projection.

## [2026-08-05] ingest | Subtyping and variance - The Rust Reference
- Source note: `raw/articles/2026-08-05-subtyping-and-variance-the-rust-reference.md`
- Index not rebuilt this run (`--no-refresh`).

## [2026-08-05] refresh | Rust lifetime subtyping and variance

- Curated and relocated the Rust Reference capture to `raw/articles/official-docs/2026-08-05-rust-reference-subtyping-and-variance.md` as [[2026-08-05-rust-reference-subtyping-and-variance]], preserving its endpoint-captured `## Source Text`; the autogenerated entry above records the acquisition-time path.
- Added [[rust-lifetime-subtyping-and-variance]] around outlives-based subtyping, higher-ranked lifetime substitution, covariance, contravariance, invariance, representation-derived API boundaries, unsafe marker obligations, compile-time enforcement, and transfer limits.
- Updated [[rust-unsafe-validity-and-undefined-behavior]], [[rust-send-sync-and-thread-safety]], [[official-docs]], and the master [[index]].
- Deduplication by canonical URL, exact title, `PhantomData`/HRTB identifiers, content search, and semantic retrieval found no prior Rust variance source or canonical treatment; adjacent Rust pages cover pinning, auto traits, cancellation, and UB rather than lifetime substitution itself.

## [2026-08-05] ingest | PromptInfuser: How Tightly Coupling AI and UI Design Impacts Designers' Workflows
- Source note: `raw/articles/hci-research/2026-08-05-promptinfuser-how-tightly-coupling-ai-and-ui-design-impacts-designers-workflows.md`
- Index not rebuilt this run (`--no-refresh`).

## [2026-08-05] refresh | PromptInfuser behavioral AI-UI prototyping

- Curated and relocated the endpoint capture to `raw/articles/hci-research/2024-06-29-promptinfuser-ai-ui-design-workflows.md` as [[2024-06-29-promptinfuser-ai-ui-design-workflows]], preserving its acquired `## Source Text`; the autogenerated entry above records the acquisition-time staging path.
- Updated [[ai-interface-design]], [[human-centered-ai-product-design]], [[ai-agent-evals]], [[hci-research]], and the master [[index]] with medium-fidelity behavioral prototypes, tandem AI/UI iteration, output-layout contract testing, sandboxing, accessibility/privacy requirements, and full-loop evaluation.
- Deduplication by arXiv URL, DOI/title, authors, PromptInfuser system name, and semantic retrieval found adjacent editable-chain and generative-steering studies but no prior copy or equivalent treatment of coupling live model behavior to UI mockups.
- Evidence boundary: DIS 2024 peer-reviewed within-subjects research with 14 professional designers and short search tasks at one technology company; most positive outcomes were perceptions, while objective quality, end-user usability, accessibility, privacy, safety, and longitudinal effects were not evaluated.

## [2026-08-06] ingest | Documentation - Template Literal Types
- Source note: `raw/articles/2026-08-06-documentation-template-literal-types.md`
- Index not rebuilt this run (`--no-refresh`).

## [2026-08-06] ingest | TypeScript template literal types and bounded string protocols

- Curated and relocated the official TypeScript Team handbook capture to `raw/articles/official-docs/2026-08-06-typescript-template-literal-types.md` as [[2026-08-06-typescript-template-literal-types]], preserving its endpoint-captured `## Source Text`; the autogenerated entry above records the acquisition-time path.
- Added [[typescript-template-literal-types]] around bounded string vocabularies, union cross-products, key/payload inference, runtime erasure, package declarations, lifecycle ownership, non-locale-aware casing intrinsics, executable tests, and ahead-of-time generation limits.
- Updated [[typescript-mapped-types]], [[typescript-conditional-types]], [[typescript-module-systems]], [[official-docs]], and the master [[index]].
- Deduplication by canonical URL, exact title/team, content search, and semantic retrieval found no prior source or canonical template-literal treatment; the adjacent mapped-types source mentions template-derived key names but does not cover patterned inference, Cartesian expansion, intrinsic implementation, or generation limits.

## [2026-08-06] ingest | Implementations - The Rust Reference
- Source note: `raw/articles/2026-08-06-implementations-the-rust-reference.md`
- Index not rebuilt this run (`--no-refresh`).

## [2026-08-06] refresh | Rust trait coherence and implementation ownership

- Curated and relocated the endpoint capture to `raw/articles/official-docs/2026-08-06-rust-reference-implementations.md` as [[2026-08-06-rust-reference-implementations]], preserving its complete `## Source Text`; the autogenerated entry above records the acquisition-time staging path.
- Added [[rust-trait-coherence-and-implementation-ownership]] around crate-graph extension authority, overlap, orphan rules, fundamental wrappers, constrained generic parameters, blanket-impl semver risk, unsafe-trait limits, and multi-crate compile-time enforcement.
- Updated [[rust-lifetime-subtyping-and-variance]], [[official-docs]], and the master [[index]]; exact URL/title, orphan/coherence identifiers, content search, and semantic retrieval found no prior source or canonical treatment.
- Evidence boundary: the Rust Reference is first-party language documentation, but this chapter does not fully specify specialization, negative impls, sealed traits, auto-trait leakage, trait-solver internals, performance, or the complete Cargo semver policy.

## [2026-08-06] refresh | Why Johnny Can’t Prompt and behavioral prompt evaluation

- Curated [[2023-04-19-why-johnny-can-t-prompt-how-non-ai-experts-try-and-fail-to-design-llm-prompts]] from the complete CHI 2023 paper; canonical DOI ingestion hit ACM's HTTP 403 challenge, so the archived open-access ACM PDF was extracted locally and passed through `kb:ingest --file`, retaining the endpoint-selected path and restoring the pre-ingest line/page structure after flattening.
- Updated [[ai-interface-design]], [[human-centered-ai-product-design]], [[ai-instruction-design]], [[ai-agent-evals]], [[hci-research]], and the master [[index]] with instruction scope, paired prompt/output comparison, representative cases, human-usable regression workflows, rollback, accessibility, privacy, and full-loop evaluation.
- Deduplication by DOI, exact title, authors, BotDesigner system name, and semantic retrieval found adjacent prompt-chain, behavioral-prototype, and human-AI lifecycle sources but no prior copy or equivalent treatment of non-expert prompt-testing behavior.
- Evidence boundary: peer-reviewed CHI qualitative research with ten early-adopter-skewed participants, one bounded chatbot task, interviewer interventions, one 2022-era model, and no causal scaffold, accessibility, privacy, longitudinal, or production evaluation.

## [2026-08-06] ingest | Why Johnny Can’t Prompt: How Non-AI Experts Try (and Fail) to Design LLM Prompts
- Source note: `raw/articles/hci-research/2023-04-19-why-johnny-can-t-prompt-how-non-ai-experts-try-and-fail-to-design-llm-prompts.md`
- Index not rebuilt this run (`--no-refresh`).

## [2026-08-06] note | Why Johnny Can’t Prompt final-path and curation state

- The autogenerated entry immediately above records the endpoint-selected final source path after local-file acquisition; the earlier refresh entry records the completed curation and concept propagation performed in the same run.
- The active note uses the canonical DOI, preserves the restored complete PDF extraction under `## Source Text`, and remains uncommitted pending dedicated-worktree validation and promotion.

## [2026-08-06] lint | Why Johnny Can’t Prompt source-metadata path

- Added the canonical `Path` bullet to the source note's `## Source Metadata` after the first validation surfaced the omission; no claims or preserved `## Source Text` content changed.

## [2026-08-06] lint | Why Johnny Can’t Prompt path formatting correction

- Removed Markdown code delimiters from the `Path` value after validation showed that the linter compares the literal metadata value to the repository-relative path; the canonical path and source content are unchanged.

## [2026-08-07] ingest | Documentation - Generics
- Source note: `raw/articles/2026-08-07-documentation-generics.md`
- Index not rebuilt this run (`--no-refresh`).

## [2026-08-07] ingest | TypeScript generic API design

- Curated and relocated the official TypeScript Team handbook capture to `raw/articles/official-docs/2026-08-07-typescript-generics.md` as [[2026-08-07-typescript-generics]], preserving its endpoint-captured `## Source Text`; the autogenerated entry above records the acquisition-time path.
- Added [[typescript-generic-api-design]] around relation-preserving inference, minimal constraints, parameter scope and defaults, structural variance, runtime erasure, declaration ownership, packed-consumer tests, and measured checker performance.
- Updated [[typescript-structural-compatibility]], [[typescript-conditional-types]], [[typescript-mapped-types]], [[official-docs]], and the master [[index]].
- Deduplication by canonical URL, exact title/team, content search, and semantic retrieval found no prior generic-foundations source or canonical treatment; adjacent sources use generics for compatibility and transformations but do not cover parameter placement, defaults, constructor relations, or the narrow limits of variance annotations.

## [2026-08-07] ingest | Destructors - The Rust Reference
- Source note: `raw/articles/2026-08-07-destructors-the-rust-reference.md`
- Index not rebuilt this run (`--no-refresh`).

## [2026-08-07] refresh | Rust destructors, drop scopes, and resource lifecycle

- Curated and relocated the endpoint capture to `raw/articles/official-docs/2026-08-07-rust-reference-destructors.md` as [[2026-08-07-rust-reference-destructors]], preserving its complete `## Source Text`; the autogenerated entry above records the acquisition-time staging path.
- Added [[rust-destructors-drop-scopes-and-resource-lifecycle]] around initialized ownership, nested scope versus field order, syntax-sensitive temporary lifetimes, async cancellation, unsafe/manual-drop invariants, explicit completion, tooling, performance, and process-abort limits.
- Updated [[rust-async-cancellation-and-select]], [[rust-pinning-and-address-sensitive-types]], [[rust-unsafe-validity-and-undefined-behavior]], [[official-docs]], and the master [[index]].
- Deduplication by canonical URL, exact title, `Drop`/drop-scope/temporary-lifetime identifiers, content search, and semantic retrieval found no prior destructor source or canonical treatment; the source is first-party Rust Project language documentation, but supplies no rustc implementation study, crate graph, production benchmark, or guarantee that destructors always run.

## [2026-08-07] ingest | Onchain launch manipulation: three arXiv papers

- Source notes: [[2026-07-02-coordinated-sniper-cohorts-on-pump-fun]] (arXiv:2607.02795v3), [[2026-02-16-predicting-the-success-of-new-crypto-tokens-the-pump-fun-case]] (arXiv:2602.14860v1), and [[2025-04-16-a-midsummer-memes-dream-market-manipulations-in-the-meme-coin-ecosystem]] (arXiv:2507.01963v2), all under `raw/articles/arxiv/`.
- Added concepts [[onchain-market-manipulation]] and [[token-launchpad-microstructure]], plus the cross-source synthesis [[2026-08-07-onchain-launch-manipulation-and-measurement]]; updated [[proprietary-automated-market-makers]] with an adjacent-concepts link, [[arxiv]], and the master [[index]].
- Metadata was taken from the arXiv Atom API rather than page scraping, after a scrape reported a v1 date for 2507.01963 that conflicted with its identifier. The API confirms v1 2025-04-16 with a 2507 (July 2025) identifier; the note records both. Abstracts are stored verbatim from the API, including a note that arXiv's abstract renderer substitutes "this http URL" for "Pump.fun" in 2602.14860.
- Deduplication by canonical URL, arXiv identifier, exact title, and content/semantic search found no prior manipulation, launchpad, or bonding-curve source; the nearest existing coverage is the prop-AMM cluster, which treats order flow as genuine and is now cross-linked rather than merged.
- Incidental fix: [[proprietary-automated-market-makers]] and [[2026-08-01-proprietary-amm-expert-handbook]] were present in the working tree as uncommitted in-flight work but absent from the master [[index]]; both were added so the cross-links from this ingest resolve. `arxiv` collection count updated 29 to 32.
- Tension recorded rather than resolved: coordinated cohorts raise first-30-minute buyer counts while high bot-share launches graduate less often. Different outcomes at different horizons, from two studies using incompatible bot/cohort detection instruments.

## [2026-08-07] lint | Full wiki health pass: 81 overdue pages reviewed

- Cleared every mechanical health category. `kb:lint` now passes with no warnings; `orphans`, `ingested`, `source_count` mismatches, `review_backlog`, `stale_wiki`, and `uncovered_tags` are all zero.
- Lint fix: six untracked `raw/articles/official-docs/` notes wrapped their `- Path:` bullet in backticks, which `checkSourceMetadataPath` compares literally. Backticks removed from the Effective Go, rust-std-pin, TypeScript modules, Rustonomicon send/sync, TypeScript narrowing, and Rust subtyping/variance notes.
- `source_count` corrected on [[codebase-architecture]] (10 to 9) and [[internal-engineering-conventions]] (13 to 12); both had counted a linked summary as a source.
- Uncovered tags resolved by tagging the pages that already cover them, not by inventing pages: `hci`/`human-control`/`mental-models` on [[human-centered-ai-product-design]], `hci`/`explainability` on [[ai-interface-design]], `market-structure` on [[proprietary-automated-market-makers]].
- Curated the four `status: ingested` prop-AMM notes that were still raw `kb:ingest` output with scraped meta descriptions as TL;DRs, "Unknown" entities, and boilerplate My Notes/Open Questions. [[2026-08-01-solana-s-proprietary-amm-revolution]], [[2026-08-01-understanding-proprietary-amms]], [[2026-08-01-jupiter-developers]], and [[2026-08-01-propamms-and-the-next-chapter-of-permissionless-market-structure]] now carry real claims, details, entities, notes, and questions; their `related` lists pointed at tag names rather than note slugs and were repointed. Also fixed the solana.com note's slug-as-title.
- Reviewed all 81 overdue concept and summary pages by reading each one. Content held in every case; no page was found to contain a false claim. Review cadence normalized to the repo's current 3-month interval (many pages still carried the older 1-month cadence and were re-lapsing immediately).
- Promoted 35 pages from `review_status: draft` to `reviewed` after reading them; no drafts remain in the wiki. The 35th, [[paid-growth-sources]], is an index page whose `review_due` had also lapsed but which the `stale_wiki` metric never counts, because `findKbGaps` only runs review analysis over `concept` and `summary` types. Index pages with review metadata are currently invisible to that check.
- Recurring structural defect found and fixed across the agency/business cluster: concept pages were listed under `## Source Notes` alongside real sources. Corrected in [[ai-agency-paid-ads-process]], [[ai-agency-sales-process]], [[database-reactivation]], [[local-business-ai-acquisition-system]], [[review-referral-automation]], [[sales-coaching-gpt]], [[speed-to-lead-and-missed-call-recovery]], [[2026-05-02-agent-memory-architecture-kb-upgrades]], [[2026-05-21-ai-saas-million-arr-lessons]], [[2026-05-27-ai-aristotle-agency-build-plan]], [[2026-05-30-website-agency-operator-playbook]], and [[2026-06-02-graphed-ai-agents-aristotle-pavlo-comparison]]. Links were moved to `## Related`, never dropped.
- Stale-content corrections: [[2026-04-10-kb-acquisition-priorities]] presented an April corpus snapshot (59 sources) in present tense against today's 273, now marked as historical; [[2026-05-27-kb-health-search-methodology-audit]] listed three open recommendations of which two have shipped (`deployGitSha()` in `src/http/handlers/health.ts`, and `bun run kb:audit`); [[2026-06-02-anthropic-financial-services-ingest-assessment]] recommended a high-priority ingest that was never performed and is now flagged as outstanding.
- Two genuine gaps recorded rather than papered over: no compliance/outbound-guardrails concept exists despite TCPA/FTC/CAN-SPAM/FCC citations being duplicated across five pages, and the `anthropics/financial-services` ingest remains undone.
- Four thin concepts remain and are accurately flagged: [[effective-go-for-production-servers]], [[rust-destructors-drop-scopes-and-resource-lifecycle]], [[rust-lifetime-subtyping-and-variance]], and [[rust-trait-coherence-and-implementation-ownership]] each rest on one primary doc. Clearing that flag needs new sources, not more cross-links.

## [2026-08-07] sync | Merge origin/main into the health-pass branch

- The local checkout was based on `9a19e3b` (2026-06-20) while `origin/main` had advanced to `c88b131` (2026-07-29): 14 commits including the July consolidation, the A2A/Claude 5/OpenTelemetry/dreaming/domain-specific-agent ingests, and a Dependabot batch. 97 files conflicted.
- Resolved as a union throughout. Neither side was a superset: the local line carried the Rust/TypeScript clusters, the prop-AMM notes, and the 2026-08-07 arXiv ingest and health pass; the remote carried its own July ingests. Nothing was discarded.
- 79 files conflicted only on review frontmatter. Rule applied: `review_status` and `last_reviewed` from whichever side reviewed later, `review_due`/`confidence`/`source_count` from the remote where the local side had never edited them. The remote's per-page cadence tiers (roughly 6 weeks, 3 months, 6 months) were preserved in place of the uniform 3-month normalisation from earlier today, because they encode deliberate intent.
- 18 files needed content synthesis. 55 fragments unique to the local side were re-inserted after their local predecessor sentence and then verified present by an automated check; `wiki/log.md` was merged chronologically (remote 07-25..07-29, then local 07-30..08-07, 85 entries, order asserted).
- One defect introduced and fixed during the merge: the union duplicated a near-identical Hermes sentence in [[agent-protocols]] because the two sides' wording differed slightly. Kept the richer local variant. A prefix-similarity scan confirmed no other duplicate sentences or repeated wiki links across the merged files.
- Corrected 12 `source_count` values that the union invalidated, using the indexer's resolved counts rather than arithmetic, and recounted every `raw/articles/` collection in the master [[index]] — four collections (`helius`, `jump-crypto`, `jupiter`, `solana`) had never been listed and `user-provided` was one short.
- Adopted the remote's `coverage_status: intentionally-thin` convention where it applied, and synced two master-index descriptions to the concept summaries they had drifted from.
- Post-merge: 476 files, 4,603 chunks, lint clean, `review_backlog`, `stale_wiki`, `uncovered_tags`, orphans, ingested, and `source_count` mismatches all zero. Thin concepts now report 8 rather than 4 because the remote's threshold and its new single-source language pages both changed; the flag remains accurate.
