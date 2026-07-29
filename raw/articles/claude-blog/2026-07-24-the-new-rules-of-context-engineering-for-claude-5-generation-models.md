---
id: article-2026-07-24-the-new-rules-of-context-engineering-for-claude-5-generation-models
type: source
title: "The new rules of context engineering for Claude 5 generation models"
path: raw/articles/claude-blog/2026-07-24-the-new-rules-of-context-engineering-for-claude-5-generation-models.md
author: Thariq Shihipar
publisher: Claude
url: https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models
date_published: 2026-07-24
date_added: 2026-07-25
tags: [claude-5, claude-code, context-engineering, system-prompts, agent-skills, agent-tools, progressive-disclosure, agent-memory, rich-references]
status: active
quality: high
summary: Anthropic reports removing over 80% of Claude Code's system prompt for Opus 5 and Fable 5 without measurable loss on its coding evaluations, then replaces older prompt-heavy practices with model judgment, interface design, progressive disclosure, concise tool descriptions, auto-memory, and richer task references.
related: [context-engineering, claude-code, agent-skills, agent-tools, agent-harnesses, ai-instruction-design, context-rot, repo-local-knowledge-bases, internal-engineering-conventions, agent-memory]
---

# The new rules of context engineering for Claude 5 generation models

## Source Metadata

- Path: raw/articles/claude-blog/2026-07-24-the-new-rules-of-context-engineering-for-claude-5-generation-models.md
- Author: Thariq Shihipar
- Published: 2026-07-24
- Publisher: Claude
- URL: https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models
- Reading time: 5 minutes
- Categories: Claude Code; Agents

## TL;DR

Anthropic says the newest Claude generation needs less prescriptive always-on context than earlier models: Claude Code removed over 80% of its system prompt for Opus 5 and Fable 5 with no measurable loss on Anthropic's coding evaluations. The proposed replacement is not “no context”; it is better placement. Product identity stays in the system prompt, repo files stay lightweight and emphasize non-obvious gotchas, conditional procedures move into progressively disclosed skills or deferred tools, tool behavior is expressed through schemas and concise descriptions, memory moves out of overloaded repo instruction files, and task-specific intent arrives through high-fidelity references such as code, tests, HTML artifacts, mockups, and rubrics.

## Key Claims

- Anthropic removed over 80% of Claude Code's system prompt for Claude Opus 5 and Claude Fable 5 with no measurable loss on its coding evaluations.
- Claude Code's older system prompt, `CLAUDE.md` files, and skills had accumulated overlapping or conflicting guidance that forced the model to reconcile rules before acting.
- Strong rules that protected against older-model failure modes can become harmful when they are false for legitimate subsets of tasks; newer models can use surrounding context and local code conventions more reliably.
- For newer models, expressive tool and file interfaces can outperform worked examples because examples may constrain exploration to the demonstrated path.
- Review, verification, rarely used tool schemas, and long skill content should load through progressive disclosure rather than occupying every request's context.
- Tool-use guidance should live once in the tool description or schema instead of being duplicated in the system prompt.
- Claude Code's auto-memory reduces the need to use `CLAUDE.md` as a catch-all memory file.
- Newer models can use richer references than simple Markdown specs, including HTML artifacts, tests, code from other repositories, and rubrics executed through verifier workflows.
- `CLAUDE.md` should briefly explain the repository, spend most of its tokens on non-obvious codebase gotchas, omit facts the model can infer from the filesystem, and route detailed verification guidance to skills.
- Skills should be lightweight, progressively disclosed, relatively unconstrained except in important areas, and encode team-, product-, or user-specific opinions and knowledge.
- When task-specific references are available, code and executable artifacts often communicate intent with higher fidelity than prose descriptions or screenshots.
- Anthropic introduced `claude doctor` / `/doctor` to help rightsize `CLAUDE.md` files and skills for these newer models.

## Important Details

- The article distinguishes a prompt from the broader assembled context, which can include the system prompt, skills, `CLAUDE.md`, memory, references, and the user's request.
- Anthropic's example of conflicting context combines “leave documentation as appropriate” in the system prompt, “do not add comments” in a skill, and “just make it work like the old one” in the user request. The figure explicitly says these are illustrative examples, not verbatim real prompts.
- The six “then → now” transitions are:
  - give Claude rules → give Claude judgment
  - give Claude examples → design interfaces
  - put it all upfront → use progressive disclosure
  - repeat yourself → simple tool descriptions
  - memory in `CLAUDE.md` files → auto-memory
  - simple specs → rich references
- The article contrasts an old TodoWrite description of approximately 9,100 characters, including when-to-use lists and worked examples, with a compact interface whose status enum is `pending | in_progress | completed` plus the invariant that only one task can be `in_progress`.
- ToolSearch is given as the concrete deferred-loading mechanism: Claude searches for full tool definitions only when a task needs them, allowing larger tool inventories without paying the context cost on every turn.
- The article's system-prompt recommendation is product-specific: invest there when building an agent harness because it tells the model what product it is operating inside and what it is doing.
- The article's `CLAUDE.md` recommendation is repo-specific: describe purpose briefly, document local gotchas such as monolithic type placement, and avoid restating obvious repository facts.
- The article's skill recommendation is conditional and opinionated: use skills as light guides to discover needed information, split long skills across files, and reserve tight constraints for genuinely important areas.
- The article's reference recommendation is task-specific: `@`-mention files, specs, mockups, artifacts, or codebases; prefer code-shaped references when they express the target more precisely.
- Rubrics are treated as executable references for taste, especially when verifier agents can use them inside dynamic workflows.
- All four source figures were inspected. Their canonical URLs are preserved below:
  - Conflict stack: https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a63620bedb2b7813b1071e2_afa90c36.png
  - Six “then → now” transitions: https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a63620bedb2b7813b107213_3979f6a1.png
  - TodoWrite interface comparison: https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a63620bedb2b7813b107216_c4fdec0d.png
  - Assembled-context layers: https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a63620bedb2b7813b10721a_836a850d.png

## Entities

- People: Thariq Shihipar
- Companies: Anthropic
- Models: Claude Opus 5, Claude Fable 5, Claude 5 generation models
- Products and tools: Claude Code, `claude doctor`, `/doctor`, ToolSearch, TodoWrite, Tasks, Skills, `CLAUDE.md`, auto-memory, artifacts, dynamic workflows, verifier agents
- Concepts: context engineering, system prompts, progressive disclosure, deferred tool loading, tool-interface design, repo instructions, rich references, rubrics, model judgment, instruction conflicts

## My Notes

- This is high-signal official practitioner evidence about Anthropic's own Claude Code prompting changes, but the headline measurement is under-specified. The article does not name the evaluations, baseline prompt size, absolute scores, confidence intervals, task mix, or whether security and rare failure modes were separately measured.
- The durable lesson is placement, not indiscriminate deletion. Safety, authorization, irreversible-action controls, and deterministic invariants still belong in enforceable harness, schema, permission, or hook layers even when soft behavioral prose can shrink.
- “Let Claude use judgment” is explicitly model-generation dependent. Teams serving mixed models should version context by capability instead of deleting constraints globally.
- “Design interfaces” does not mean examples are universally harmful. Examples remain useful when output form, taste, or edge-case semantics are otherwise ambiguous; the article's narrower claim is that unnecessary worked examples can overconstrain capable models.
- Auto-memory is a Claude Code product capability, not a universal argument for hidden or unreviewed memory writes. Scoped provenance, review, retention, and security controls remain necessary.
- The article strongly validates this KB's existing progressive-disclosure model: catalogs and lightweight instruction files route; source notes, skills, tools, references, and executable checks supply detail only when needed.
- The richest new synthesis is an instruction-placement test: keep only product identity, authority boundaries, and universally relevant behavior always on; route repo gotchas, conditional procedures, memory, and task references through narrower surfaces.

## Open Questions

- Which coding evaluations supported the “no measurable loss” claim, and did they include destructive operations, security, rare codebase conventions, and long-horizon tasks?
- How much of the result comes from Claude 5 model capability versus simultaneous improvements in tools, memory, skills, artifacts, and the Claude Code harness?
- What is the safe migration strategy for products that route across Claude 5, older Claude models, and third-party models with different instruction-following behavior?
- When do examples still improve calibration, output shape, or safety enough to justify their context cost?
- What exactly does `claude doctor` inspect, what edits can it propose or apply, and how are intentional high-priority constraints protected?
- How should auto-memory conflicts with repository instructions, user preferences, or task-specific references be surfaced and resolved?
- How should teams evaluate context simplification beyond average coding scores, especially for tail risks and instruction-conflict failures?

## Related

- [[context-engineering]]
- [[claude-code]]
- [[agent-skills]]
- [[agent-tools]]
- [[agent-harnesses]]
- [[ai-instruction-design]]
- [[context-rot]]
- [[repo-local-knowledge-bases]]
- [[internal-engineering-conventions]]
- [[agent-memory]]
- [[2025-09-29-effective-context-engineering-for-ai-agents]]
- [[2025-11-25-using-claude-md-files-customizing-claude-code-for-your-codebase]]
- [[2026-06-03-lessons-from-building-claude-code-how-we-use-skills]]
- [[2026-06-03-dynamic-workflows-claude-code-ingest]]
- [[2026-06-11-building-good-vertical-agent]]

## Source Text

I’ve written previously about how to best [prompt the newest generation of Claude 5 models](https://claude.com/blog/a-field-guide-to-claude-fable-finding-your-unknowns) and work with them iteratively to discover what you want to build.

But when you send a message to Claude, the prompt is only a small part of the context it gets. Much of your context is assembled from your system prompt, Skills, CLAUDE.md files, memory, and other sources. We call this [context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents), and it makes a big impact on the results you generate when using Claude Code or in building your own agents.

Unlike a prompt, context is used generally across many requests, so it cannot be as specific.  How do you build these general prompts and guidance for Claude, especially when you don’t know what a user’s prompt might be?

This can be surprisingly difficult as Claude’s own capabilities evolve. Most recently, we noticed a large jump in the way we prompt the newest generation of Claude models. We removed over 80% of Claude Code’s system prompt for models like Claude Opus 5 and Claude Fable 5 with no measurable loss on our coding evaluations.

Here’s what we’ve learned about prompting this new class of models, and how you can utilize it to update your context engineering. We’ve put these best practices in `claude doctor;` use the command /doctor in Claude Code to rightsize your skills, and CLAUDE.md files.

### Unhobbling Claude

Overall, we found that we were overconstraining Claude Code, both through our system prompt and in our CLAUDE.md files and skills. 

For example, when we read transcripts of our own internal usage of Claude Code, we see several conflicting messages in a single request like “leave documentation as appropriate,” or “DO NOT add comments” as our system prompt, skills, and user requests clash with each other. 

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a63620bedb2b7813b1071e2_afa90c36.png)

Generally, Claude can interpret the user’s intent to get to the right answer, but Claude must think more carefully about these overlapping and conflicting messages before deciding what to do.

And while these constraints were once needed to avoid worst case scenarios, we have since found we can delete many of them and let the model use surrounding context and judgement instead.

Additionally, Claude Code now has many more tools. Claude used to rely on CLAUDE.md as a source of memory, information, and guidance. Now we have memory, artifacts, and skills, which Claude can use to create new ways of loading and sharing context across sessions.

### Then and now

There were a number of previous context engineering best practices that had become myths. Including:.

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a63620bedb2b7813b107213_3979f6a1.png)

#### Then: Give Claude rules

#### Now: Let Claude use judgement

When we first rolled out Claude Code, we needed to be sure that Claude avoided worst case scenarios, such as deleting files. This meant we would give particularly strong guidance that might not always be true, For example, in the system prompt we used to say: 

*In code: default to writing no comments. Never write multi-paragraph docstrings or multi-line comment blocks — one short line max. Don't create planning, decision, or analysis documents unless the user asks for them — work from conversation context, not intermediate files.*

But for a certain subset of prompts, this guidance would be wrong. In the case of documentation, the user may have their own preferences, or specific parts of very complex code might need multi-line comment blocks.

Still, without these guardrails for older models, the comments Claude wrote would be incorrect in many cases and we had to accept this tradeoff. But newer models have better judgement and can handle these decisions well without explicit rules. 

In the new system prompt we say: *Write code that reads like the surrounding code: match its comment density, naming, and idiom.*

#### Then: Give Claude examples

#### Now: Design interfaces

The number one rule for tool usage was to give Claude examples on how to use them. With our newest models, we’ve found that giving examples actually constrains them to a certain exploration space. 

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a63620bedb2b7813b107216_c4fdec0d.png)

Instead of using examples, think more about the design of your tools, scripts and files- what parameters does Claude have and how can they be more expressive? 

For example, in the Todo tool example, just listing status as an enumeration between pending, in_progress, and completed, hints to Claude about how to use it. The instruction on keeping one item in_progress helps define our requested behavior.

#### Then: Put it all upfront

#### Now: Use progressive disclosure

Because Claude Code was focused on coding, our system prompt included detailed information on how to do code review and verification. These were not always needed, but when they were, it was crucial information.

Since then, Claude Code has gotten very competent at using progressive disclosure- loading the right context at the right times. For example, we moved verification and code review into their own skills that Claude Code could selectively call.

But progressive disclosure is not just for skills, we also use it for tools. Some of our tools are ‘deferred loading,’ which means the agent must search for their full definitions using ToolSearch before using them. This allows us to have more tools (such as our Task tools) that don’t take up context until they’re needed.

The same can be applied to your own CLAUDE.md and Skill.md files. A common myth is that you want to make these a central repository for every known practice that you *might* run into, because Claude would not find it otherwise. Instead, [consider having a tree of files that can be loaded at the right time](https://claude.com/blog/a-harness-for-every-task-dynamic-workflows-in-claude-code).

#### Then: Repeat yourself

#### Now: Simple tool descriptions

Earlier Claude models could sometimes need repeated instructions or be more likely to listen to instructions at the end of their context window than at the start. This meant our system prompt would sometimes have references to tools in the main system prompt as well as instructions in the tool description. 

We found we could delete these repeat examples and put instructions on how to use tools in the tool descriptions rather than the system prompt.

#### Then: Memory in CLAUDE.md files

#### Now: Auto-memory

We used to encourage users to save things to Claude’s memory, by using the # hotkey to write to their [CLAUDE.md](http://claude.md) automatically. Instead, Claude now automatically saves memories that are relevant to the work and to you. 

#### Then: Simple specs

#### Now: Rich references

In plan mode, Claude Code has heavily relied on markdown files with plans. Storing these files as plans helped Claude refer to them when needed. Another similar best practice was to store specs in the codebase for Claude to refer to while working across longer projects.

But we’ve found that Claude can handle increasingly more complicated references. Instead of simple markdown files, Claude can reference HTML artifacts created by our new artifacts feature. 

You may also give Claude references in the form of code. A spec may also be a detailed test suite, or a function in a different codebase that Claude might port. 

Rubrics are another form of references. Rubrics allow Claude to try and verify your taste in a particular field (e.g. what does a good API design look like) by using [dynamic workflows](https://claude.com/blog/a-harness-for-every-task-dynamic-workflows-in-claude-code) and spinning up verifier agents with those rubrics.

### Applying this to your context

Pulling this all together, what does this look like when you assemble your context?

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a63620bedb2b7813b10721a_836a850d.png)

#### System Prompt

A system prompt is heavily tied to the product context. It tells Claude what product it’s operating in and what it’s doing. For Claude Code, you will likely never modify this, but if you are building your own agent harness, this is where you should spend a lot of time.

#### CLAUDE.md

Keep your CLAUDE.md lightweight and briefly describe what your repo is for, but spend most of the tokens on gotchas inside of the codebase. For example, you may organize your code to keep types in one monolithic file and nowhere else. Avoid stating ‘the obvious’ things Claude should know by looking at your file system or your repo.

Use progressive disclosure heavily, for example if you have several unique instructions on how to verify your work, create a verification skill and reference it from your CLAUDE.md.

#### Skills

Think of skills as lightweight guides to let Claude find information when needed. Avoid making them overconstrained, except in highly important areas. 

For long skills, try and use progressive disclosure as much as possible- divide it into many files and split them out.

It’s best when skills encode particular opinions, knowledge, or best practices that are particular to you, your team, or product. 

#### References

You can @ mention files to include them as references. References allow Claude to refer to in-depth information about the current plan. 

This might be in specs files, mockups, or even entire codebases. Generally you should prefer files that are in code as it provides clear, high-fidelity instructions to Claude in a language it knows very well. For example, a HTML mockup of a design will generally produce better results than a description of the design or a screenshot.

### Try simplifying

Across your system prompt, skills, and CLAUDE.md files, you may need to simplify just like we did. We rolled out a new command called `claude doctor,` which will help you do this automatically as well. For more details on prompting more advanced models specifically, check out our [Fable field guide](https://claude.com/blog/a-field-guide-to-claude-fable-finding-your-unknowns).

*This article was written by Thariq Shihipar, member of technical staff, Anthropic.*
