---
id: summary-2026-06-12-vertical-agent-context-hierarchy-kb-upgrades
type: summary
title: Vertical Agent Context Hierarchy KB Upgrades
tags: [vertical-agents, context-engineering, agent-tools, agent-harnesses, agent-skills]
summary: "BrainsAndTennis's vertical-agent article is best preserved as a task-distribution compression pattern: put hot-path domain operations in tightly engineered L1 context, load curated specs on demand as L2, and keep complete raw API references reachable through L3 search skills."
source_count: 1
canonical_for: [vertical agent context hierarchy, good vertical agent, task distribution compression, L1 L2 L3 agent context]
review_status: draft
last_reviewed: 2026-06-12
review_due: 2026-07-12
confidence: "0.79"
---

# Vertical Agent Context Hierarchy KB Upgrades

## Summary

The BrainsAndTennis vertical-agent article is best preserved as a practitioner pattern for domain-specific agent performance: a strong vertical agent compresses its real task distribution into prompts, tools, specs, skills, and raw references. The claim usefully reframes context engineering away from "how do we fit more into the window?" toward "which knowledge belongs at which access tier for this domain?"

The spreadsheet-agent example matters because it makes the tiers concrete. The hot path is not just documented; it is implemented as compressed, consequence-reporting wrappers. Occasional capabilities are discoverable through curated English specs. Rare capabilities are not ignored; they remain reachable through raw API references plus a small skill that teaches the agent how to search them.

## Durable Pattern

- **L1: hot-path wrappers.** Always-resident context should cover the operations on the steep part of the task distribution. These operations deserve disproportionate engineering: token-compressed observations, explicit contracts, and feedback that tells the model what changed and what looks wrong.
- **L2: curated misses.** Important-but-occasional capabilities should be one discovery step away. The artifact should teach canonical recipes and footguns, not merely list signatures.
- **L3: complete escape hatch.** The raw substrate can stay off-context if the agent has a short map for mining it. Completeness and bounded search matter more than elegance.
- **Tool surface as context budget.** A small code-mediated tool can sometimes outperform a large overlapping tool menu because it collapses tool choice into "write code" while preserving compositional reach behind the tool.
- **Tool results as semantic compression.** Reads and writes are not neutral API calls. Their model-facing return values are context artifacts that can preserve labels, formulas, styles, diffs, and warnings at a fraction of raw dump size.

## KB Impact

- [[context-engineering]] gets a sharper allocation rule: optimize context placement against the task distribution, not against abstract context size.
- [[agent-tools]] gets a concrete code-mediated tool pattern: one `execute_code` surface can front many domain APIs when safety and ergonomics allow it.
- [[agent-harnesses]] gets another example of the harness owning context assembly and observation shaping, not just orchestration.
- [[agent-skills]] gets a clean L3 use case: a short skill that maps a huge raw API reference into bounded grep/search procedures.
- [[resolvers]] gets a useful framing for vertical-agent routing: route hot, occasional, and rare capabilities differently rather than making every capability always resident.

## Cautions

- The Shortcut accuracy and hedge-fund deployment claims are practitioner claims from the source, not independent benchmark evidence.
- The one-tool pattern is not universal. Domains with irreversible side effects, approvals, payments, custody, or external messaging may need separate model-facing tools to preserve safety and auditability.
- The L1/L2/L3 promotion boundary should be empirical. A capability should move upward only when usage frequency, error cost, or latency justifies always-on context.
- The article's spreadsheet examples are unusually strong because spreadsheet APIs are code-friendly and structured. Less regular domains may need richer resolvers, retrieval, and human review.

## Source Notes

- Source note: [[2026-06-11-building-a-good-vertical-agent]]
- User-provided local capture: `/Users/josemanuelcerqueira/.codex/attachments/90e9f919-43ce-422d-a588-0bde0b9fabab/pasted-text.txt`

## Related

- [[context-engineering]]
- [[agent-tools]]
- [[agent-harnesses]]
- [[agent-skills]]
- [[resolvers]]
