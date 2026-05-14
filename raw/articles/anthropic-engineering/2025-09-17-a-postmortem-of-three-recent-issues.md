---
id: article-2025-09-17-postmortem-three-recent-issues
type: source
title: "A postmortem of three recent issues"
path: raw/articles/anthropic-engineering/2025-09-17-a-postmortem-of-three-recent-issues.md
author: Anthropic
publisher: Anthropic
url: https://www.anthropic.com/engineering/a-postmortem-of-three-recent-issues
date_published: 2025-09-17
date_added: 2026-04-09
tags: [reliability, infrastructure, model-serving, postmortem]
status: processed
quality: high
summary: Anthropic details three infrastructure bugs that intermittently degraded Claude response quality, emphasizing that serving quality depends on rigorous cross-platform validation and transparent incident analysis.
related: [reliability, infrastructure, ai-agent-evals, model-serving]
---

# A postmortem of three recent issues

## Source Metadata

- Path: raw/articles/anthropic-engineering/2025-09-17-a-postmortem-of-three-recent-issues.md
- Author: Anthropic
- Published: 2025-09-17
- Publisher: Anthropic
- URL: https://www.anthropic.com/engineering/a-postmortem-of-three-recent-issues

## TL;DR

This is a rare deep operational postmortem that treats model quality degradation as an infrastructure problem, not only a modeling problem.

## Key Claims

- Infrastructure bugs can degrade perceived model quality in subtle and uneven ways.
- Platform equivalence and routing correctness are hard at large scale.
- Transparency matters when issues affect user trust in system quality.

## Important Details

- Anthropic attributes the incidents to three separate infrastructure bugs.
- The post emphasizes mixed hardware deployment and the complexity of maintaining equivalence.
- One issue involved misrouting some requests to servers configured for a different context setup.

## Entities

- Concepts: routing bugs, platform equivalence, postmortems, infrastructure quality
- Platforms: AWS Trainium, NVIDIA GPUs, Google TPUs

## My Notes

- This belongs in the KB because it widens "AI quality" to include serving infrastructure.

## Open Questions

- How should eval results be annotated when infra quality may distort output quality?

## Related

- [[durable-execution]]
- [[benchmark-integrity]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
