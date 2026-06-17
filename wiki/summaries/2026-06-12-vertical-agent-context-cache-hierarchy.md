---
id: summary-2026-06-12-vertical-agent-context-cache-hierarchy
type: summary
title: Vertical Agent Context Cache Hierarchy
tags: [agents, vertical-agents, context-engineering, agent-tools, agent-skills, code-execution]
summary: "Peter Wang's vertical-agent article is best preserved as a design rule: encode the domain task distribution into L1 always-resident wrappers, L2 fetched specs/tool schemas, and L3 raw-reference escape hatches so the model stays accurate without bloated context."
source_count: 1
canonical_for: [vertical agent context hierarchy, agent context cache hierarchy, faithful compression of task distribution]
review_status: reviewed
last_reviewed: 2026-06-12
review_due: 2026-07-12
confidence: "0.78"
---

# Vertical Agent Context Cache Hierarchy

## Summary

Peter Wang's "Building a Good Vertical Agent" is useful because it turns a vague agent-building question into an allocation rule: a strong vertical agent is a faithful compression of its task distribution. The agent should spend always-on context only on the common path, keep occasional capabilities one discovery step away, and preserve a complete raw escape hatch for the long tail.

The concrete hierarchy:

- **L1:** Always-resident, high-frequency operations. These should be aggressively engineered, token-compressed, and consequence-reporting because every task pays their cost.
- **L2:** Important-but-occasional capabilities. These should be curated English specs, gotcha-aware recipes, or deferred tool schemas that cost zero tokens until fetched.
- **L3:** Rare long-tail capabilities. These should live in complete raw references paired with a small skill that teaches the agent how to search the reference in a bounded number of calls.

## Patterns Worth Keeping

- Treat context quality as a product performance lever: missing context causes guessing, while bloated context hides the signal.
- Use one code-execution substrate when many overlapping tools would confuse tool selection and force too much schema into the prompt.
- Make common read operations return semantically compressed views, not raw dumps. In the spreadsheet example, formula aliasing, row/column labels, and style grouping turn a large sheet region into a compact model-readable artifact.
- Make common write operations return structured diffs plus triage. The agent needs to know not only what changed but which changes likely went wrong.
- Write L2 specs as recipes that encode domain gotchas, not just signatures. The pivot-table example matters because it includes ordering, runtime enum problems, and layout-suspension details.
- Treat deferred tools as a session-scoped cache: fetch schema/info once, mark it resident, then allow execution.
- Keep raw APIs available even when they are not ergonomic. The escape hatch prevents the agent from compromising when wrappers or curated specs do not cover the user request.

## Editorial Caution

The article's claims about Shortcut's accuracy and hedge-fund deployment are self-reported practitioner evidence. The KB should preserve the architecture pattern without treating those commercial claims as validated benchmarks.

## Source Notes

- [[2026-06-11-building-good-vertical-agent]]
