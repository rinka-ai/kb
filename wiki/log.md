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
