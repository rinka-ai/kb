---
id: article-2026-06-28-explain-diff-skill
type: source
title: explain-diff
path: raw/articles/github-repos/2026-06-28-explain-diff-skill.md
author: Geoffrey Litt
publisher: GitHub Gist
url: https://gist.github.com/geoffreylitt/a29df1b5f9865506e8952488eac3d524
date_published: 2026-06-28
date_added: 2026-07-29
tags: [agent-skills, agentic-coding, code-review, html-artifacts, notion, quizzes, explanations]
status: active
quality: medium
summary: A compact agent skill that turns a code diff, branch, or pull request into a background-first explainer with intuition, conceptual code walkthroughs, diagrams, and a five-question comprehension quiz in HTML or Notion.
related: [2026-07-29-understanding-is-the-new-bottleneck, agent-skills, claude-code, workflows, context-engineering]
superseded_by:
---

# explain-diff

## Source Metadata

- Path: raw/articles/github-repos/2026-06-28-explain-diff-skill.md
- Author: Geoffrey Litt
- Publisher: GitHub Gist
- Created: 2026-06-28
- Last checked: 2026-07-29
- URL: https://gist.github.com/geoffreylitt/a29df1b5f9865506e8952488eac3d524
- Files: `explain-diff-html.md`, `explain-diff-notion.md`

## TL;DR

The gist encodes an educational code-review artifact as a reusable skill. It asks the agent to explore surrounding code, teach relevant background, explain the core intuition with examples and diagrams, walk through the implementation in a conceptual order, and end with five medium-difficulty comprehension questions. One variant produces a self-contained HTML page; the other creates a collaborative Notion page.

## Key Claims

- The useful unit for explaining a change is not a file-ordered diff but a pedagogically ordered narrative.
- Background and intuition should precede implementation detail.
- Interactive or visual examples can make data flow, UI behavior, and system boundaries easier to understand.
- Five medium-difficulty questions can reveal whether the reader understood the substance rather than merely recognizing the diff.
- A self-contained HTML artifact can provide richer explanation and interaction than Markdown while remaining portable.

## Important Details

- The HTML variant requires a single responsive file with inline CSS and JavaScript, a table of contents, semantic HTML diagrams, example data, callouts, and preserved whitespace for code.
- The Notion variant replaces custom quiz interaction with toggle blocks and relies on Notion MCP tools for creation.
- The original skill does not bind the explainer to a commit SHA, define invalidation when the diff changes, or specify a risk threshold for when the artifact is worth generating.
- Gist commenters identified answer leakage when the correct option is consistently longer or appears in a predictable position; a later community revision added balanced/randomized answer positions and plausible distractors.
- Another commenter proposed a stable renderer that accepts structured content instead of regenerating boilerplate on every run. That separation would make presentation, accessibility, answer-order, and offline validation more deterministic.
- A security commenter noted the prompt-injection risk of treating an untrusted diff as instructions and of emitting executable HTML. The original skill does not include an explicit trust-boundary or escaping policy beyond code-block whitespace guidance.

## Entities

- People: Geoffrey Litt
- Organizations: GitHub, Notion
- Artifacts: `explain-diff-html`, `explain-diff-notion`
- Concepts: agent skills, HTML artifacts, code explanation, retrieval quiz, literate code diff, prompt injection, deterministic rendering

## My Notes

- The skill is a strong prototype, not yet a production review gate.
- Its most reusable structure is `Background → Intuition → Code → Quiz`; output destination is secondary.
- A local production version should generate a typed content specification, render it through a fixed audited template, escape all code-derived content, forbid network dependencies, validate interactions, and attach the explained commit/diff identity.
- Multiple-choice recognition should not be the only comprehension signal. At least one question should require a short explanation, prediction, or transfer to a new case before answers are revealed.
- Explanations should be evidence-linked to inspected code, tests, and configuration, and should say when an inference is not directly supported.

## Open Questions

- How often does the skill trigger correctly from natural requests, and when does it generate unnecessary artifacts?
- Can a fixed renderer preserve the expressiveness of one-off diagrams without allowing unsafe code-derived HTML or JavaScript?
- Which quiz format best predicts operational understanding: multiple choice, free response, code tracing, failure prediction, or teach-back?
- How should collaborative comments and corrections feed back into the explainer or the repository's durable documentation?

## Related

- [[2026-07-29-understanding-is-the-new-bottleneck]]
- [[2026-07-29-understanding-gates-for-agentic-workflows]]
- [[agent-skills]]
- [[claude-code]]
- [[workflows]]
- [[context-engineering]]
- [[agent-security]]

## Source Text

### `explain-diff-html.md`

```markdown
---
name: explain-diff-html
description: Use when the user asks for a rich explanation of a code change, diff, branch, or PR. Produces HTML output.
---

# Explain Diff

Please make me a rich, interactive explanation of the specified code change.

It should have these sections:

- Background: Explain the existing system relevant to this change. (You should broadly explore surrounding code for this.) We don't know how much the reader already knows, so include a deep background for beginners (note that it can be skipped if the reader is already familiar), and then a more narrow background directly relevant to the change.
- Intuition: Explain the core intuition for the code change. The focus here is to explain the essence, not the full details. Use concrete examples with toy data. Use figures and diagrams liberally.
- Code: Do a high-level walkthrough of the changes to the code. Group/order the changes in an understandable way.
- Quiz: Come up with five questions that test the reader's knowledge of this PR. This should be medium difficulty, difficult enough that you actually need to understand the substance of the PR to answer them, but not gotchas. The goal is to help the reader make sure that they've actually understood. These should be presented as interactive multiple-choice questions, and when the user clicks, it tells them whether they were correct and gives feedback.

Format:

- Output a single self-contained HTML file which includes CSS and JavaScript. Make the whole thing one long page with section headers and a table of contents. Don't use tabs for the top-level structure. Basic responsive styling so you can view it on a phone is nice too. Put the file in a global place on my computer outside of the code repo, and make sure the filename always starts with today's date in `YYYY-MM-DD-` format, because it helps keep the files time-sorted and out of version control. For example: /tmp/2026-01-12-explanation-<slug>.html
- Please write with the clarity and flow of Martin Kleppmann, making it engaging and written in classic style. Transitions between sections should be smooth.
- Some tips on diagrams. Ideally, you should pick a small number of diagram families that can be reused throughout the explanation to explain various cases. Some useful kinds of diagrams:
  - A very simplified version of the UI that the user sees in the app, to explain UI changes.
  - A system diagram showing data flow or communication between components. Make sure to include example data here!
- Don't use ASCII diagrams. Always use simple HTML designs for your diagrams, HTML lists for lists of things, etc.
  - For code blocks, always use `<pre>` tags. If you use a custom styled div instead, it **must** have
    `white-space: pre-wrap` in its CSS, or the browser will collapse all newlines into a single line.
    Before saving the file, scan each code block in the HTML source and confirm its CSS includes
    `white-space: pre` or `pre-wrap`.
- Use callouts for key concepts or definitions, important edge cases, etc.
```

### `explain-diff-notion.md`

```markdown
---
name: explain-diff-notion
description: Use when the user asks for a rich explanation of a code change, diff, branch, or PR. Produces a Notion page.
---

# Explain Diff

Please make me a rich, interactive explanation of the specified code change as a Notion page.

It should have these sections:

- Background: Explain the existing system relevant to this change. (You should broadly explore surrounding code for this.) We don't know how much the reader already knows, so include a deep background for beginners (note that it can be skipped if the reader is already familiar), and then a more narrow background directly relevant to the change.
- Intuition: Explain the core intuition for the code change. The focus here is to explain the essence, not the full details. Use concrete examples with toy data. Use figures and diagrams liberally.
- Code: Do a high-level walkthrough of the changes to the code. Group/order the changes in an understandable way.
- **Quiz**: Come up with 5 questions that test the reader's knowledge of this PR. This should be medium difficulty, difficult enough that you actually need to understand the substance of the PR to answer them, but not gotchas. The goal is to help the reader make sure that they've actually understood. Each question should have some multiple choice answers with an explanation detailing why an answer is correct or incorrect. Use toggle blocks to represent this. For example:
  ```markdown
  1. Question
     ▶ Option 1
      ❌ Explanation for why it was incorrect
     ▶ Option 2
      ❌ Explanation for why it was incorrect
     ▶ Option 3
      ✅ Explanation for why it was correct
     ▶ Option 4
       ❌ Explanation for why it was incorrect
  2. Question
     ...
  ```
  
Format:

- Use the Notion MCP tools to create a new page and return the URL of the new page.
- Please write with the clarity and flow of Martin Kleppmann, making it engaging and written in classic style. Transitions between sections should be smooth.
- Some tips on diagrams. Ideally, you should pick a small number of diagram families that can be reused throughout the explanation to explain various cases. Make sure to include example data!
- Use callouts for key concepts or definitions, important edge cases, etc.
```
