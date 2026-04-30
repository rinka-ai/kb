---
id: concept-context-rot
type: concept
title: Context Rot
tags: [context, long-context, evaluation]
source_count: 6
summary: Context rot is performance degradation caused by overly long, noisy, or repeatedly rewritten context that erodes semantic discrimination.
canonical_for: [context rot]
review_status: reviewed
last_reviewed: 2026-04-16
review_due: 2026-05-16
confidence: "0.82"
---

# Context Rot

## Summary

Context rot is the degradation in model performance as context gets longer, noisier, or repeatedly rewritten, especially when tasks require semantic discrimination rather than simple lexical lookup. Recursive Language Models add a useful empirical framing: degradation depends on task complexity, so constant-needle lookup is easier than dense aggregation or pairwise reasoning over the same token scale. In practice, the same decay can show up one layer higher when routing or resolver documents stop matching the real skill inventory and user phrasing.

## Practical Implications

- longer context is not automatically better
- distractors matter a lot
- compaction and retrieval quality shape downstream performance
- task complexity changes the effective context window
- repeated rewriting can erase useful structure
- resolver tables and trigger descriptions also rot if they are not maintained as the system changes

## Source Notes

- [[2026-04-09-context-rot]]
- [[2025-09-29-effective-context-engineering-for-ai-agents]]
- [[2026-04-09-longllmlingua]]
- [[2026-04-09-gam-vs-context-rot]]
- [[2026-04-16-resolvers-the-routing-table-for-intelligence]]
- [[2026-04-23-recursive-language-models]]
