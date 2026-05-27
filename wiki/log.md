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
