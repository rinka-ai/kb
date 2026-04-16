---
id: article-2026-04-16-good-and-bad-harness-engineering
type: source
title: "Good and Bad Harness Engineering"
path: raw/articles/daniel-miessler/2026-04-16-good-and-bad-harness-engineering.md
author: Daniel Miessler
publisher: Daniel Miessler
url: https://danielmiessler.com/blog/good-and-bad-harness-engineering
date_published:
date_added: 2026-04-16
tags: [agents, harnesses, skills, prompting, design]
status: processed
quality: medium
summary: Daniel Miessler frames good harness engineering as telling an AI what you want rather than scripting every step of how to get there.
related: [agent-skills, agent-harnesses, context-engineering]
---

# Good and Bad Harness Engineering

## Source Metadata

- Path: raw/articles/daniel-miessler/2026-04-16-good-and-bad-harness-engineering.md
- Author: Daniel Miessler
- Published: Unknown
- Publisher: Daniel Miessler
- URL: https://danielmiessler.com/blog/good-and-bad-harness-engineering

## TL;DR

The post argues that better harnesses specify goals and success criteria more than rigid procedure. In short: tell the AI what you want, not every move you think it should make.

## Key Claims

- Good harness engineering should emphasize desired outcomes rather than detailed procedural micromanagement.
- Overly literal "do this, then that" instructions can reduce adaptability and make agent behavior brittle.
- Harnesses work better when they describe what good looks like and preserve room for the model to find the path.

## Important Details

- The page description captures the core design contrast directly: "telling your AI what you want and not how to get it."
- This source is especially relevant for skill design because it pushes against procedure-heavy templates that break as models or environments change.
- It serves as a useful editorial counterweight to builder stacks that drift toward ever larger checklists and increasingly rigid instructions.

## Entities

- People: Daniel Miessler
- Concepts: harness engineering, outcome specification, procedural brittleness
- Domains: prompting, agent design, execution scaffolding

## My Notes

- This is a compact but important supporting source for the KB's "destinations and fences, not driving directions" pattern.
- It is best used alongside more detailed sources rather than as a standalone systems blueprint.

## Open Questions

- How much procedure is still useful before a harness or skill becomes counterproductively literal?
- What is the best way to encode success criteria and constraints without smuggling in brittle choreography?

## Related

- [[agent-skills]]
- [[agent-harnesses]]
- [[context-engineering]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
