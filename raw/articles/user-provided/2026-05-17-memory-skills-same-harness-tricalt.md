---
id: article-2026-05-17-memory-skills-same-harness-tricalt
type: source
title: "Memory Isn't a Plugin. Skills Aren't a Plugin. They're the Same Harness."
path: raw/articles/user-provided/2026-05-17-memory-skills-same-harness-tricalt.md
author: Vasilije Markovic (@tricalt)
publisher: X
url: https://x.com/tricalt/status/2055876832797581406
date_published: 2026-05-17
date_added: 2026-05-18
tags: [agents, memory, skills, harnesses, world-models, cognee]
status: active
quality: medium
summary: A product-thread thesis arguing that memory and skills should be treated as one evolving harness/world-model layer, with skills as procedural memories and memory as the observation substrate that improves them.
related: [agent-memory, agent-skills, agent-harnesses, context-engineering]
---

# Memory Isn't a Plugin. Skills Aren't a Plugin. They're the Same Harness.

## Source Metadata

- Path: raw/articles/user-provided/2026-05-17-memory-skills-same-harness-tricalt.md
- Author: Vasilije Markovic (@tricalt)
- Published: 2026-05-17
- Publisher: X
- URL: https://x.com/tricalt/status/2055876832797581406
- Source capture: user-provided full thread text in chat on 2026-05-18.
- Social context reported by user: 47.1K views, 469 likes, 53 retweets, 7 replies.

## TL;DR

The thread argues that memory and skills are not separate plugin categories but two views of the same agent harness or world model. Memory records what the agent observes, skills codify repeatable procedures from those observations, and both should evolve through a control loop rather than sit as static files or isolated APIs.

## Key Claims

- Memory APIs are too narrow if they only expose storage or recall; useful memory must influence skill routing and action.
- Skills are not static markdown files in dynamic environments because they silently decay as tools, schemas, and workflows change.
- A skill is a procedural memory: it records that some sequence of actions produced a task outcome in the past and may do so again.
- Memory observes the world, while skills codify parts of that observed world into executable rules.
- A winning harness treats memory, skills, compaction, session context, tools, and user preferences as one aggregate world model.
- Cognee is presented as an implementation direction where skills and memory share graph nodes, and skill-run feedback can produce skill-improvement proposals.

## Important Details

- The thread names Sarah Wooders and Harrison Chase as adjacent sources for the claim that memory is not a plugin but part of the harness.
- It frames the world model as the aggregate context the harness loads before deciding the next step: codebase layout, tool schemas, file system state, recent conversation, preferences, and skill files.
- It restates the skill-maintenance loop as Observe -> Inspect -> Amend -> Evaluate.
- It argues there should be no clean line between memory and skills because skills improve by reading memory and memory improves by amending attached skills.
- The concrete Cognee example uses `cognee.remember(SkillRunEntry(...), skill_improvement={...})` to record a skill run and optionally generate an improvement proposal.
- A repo check on 2026-05-18 found supporting implementation elements (`SkillRunEntry`, `Skill`, `SkillRun`, and `SkillImprovementProposal`) but did not find an exact `SkillChangeEvent` class name in the inspected `topoteretes/cognee` main branch.

## Entities

- People: Vasilije Markovic (@tricalt), Sarah Wooders, Harrison Chase
- Project: Cognee
- Concepts: memory as harness, skills as procedural memory, world model, self-improving skills, skill decay, graph memory, compaction as memory operation
- API elements named in source: `cognee.remember`, `SkillRunEntry`, `skill_improvement`

## My Notes

- This is worth keeping because it pushes against the KB's current clean separation between [[agent-memory]] and [[agent-skills]].
- The best version of the claim is not that skills and memory are literally identical, but that production systems need a shared maintenance and evaluation loop across both surfaces.
- The thread is product-adjacent and promotional, so it should be treated as a design thesis rather than empirical proof.
- The strongest KB update is to add a tension: separating memory and skills clarifies ownership, but too much separation can hide the feedback loop that turns observed failures into revised procedures.
- The source pairs especially well with [[2026-05-18-cognee]] because the repository grounds part of the implementation claim, while also showing that the named event mechanism in the tweet may not map one-to-one to current code.

## Open Questions

- Should the KB eventually add a first-class `world-models` concept page, or is this still better covered under [[agent-memory]], [[context-engineering]], and [[agent-harnesses]]?
- What governance is needed when memory can amend skill procedures and skills can write new memory?
- How should systems distinguish a one-off failed run from evidence strong enough to rewrite a reusable procedure?

## Related

- [[agent-memory]]
- [[agent-skills]]
- [[agent-harnesses]]
- [[context-engineering]]
- [[2026-05-18-cognee]]
- [[2025-05-30-optimizing-interface-knowledge-graphs-llms-complex-reasoning]]

## Source Text

Tweet by Vasilije (@tricalt) — May 17, 2026 · 47.1K views · 469 likes · 53 retweets · 7 replies

Hook: "Memory isn't a plugin. Skills aren't a plugin. They're the same harness."

Body:

Memory APIs are not a viable product category, and skill systems are just markdown. We've been saying it for a while.

@sarahwooders and @hwchase17 made the case last month that memory isn't a plugin and that it is the harness instead.

I made the same argument earlier, from the other side. We argued in a post that got 1.7M views that skills aren't static files. Skills degrade silently in dynamic environments. They need a loop — Observe → Inspect → Amend → Evaluate.

Both arguments are in essence about the same harness. A world model.

Treat skills and memory as the same harness

A world model is whatever the agent is aware of and what it uses to predict the next action it should take. In an agent harness, it is a broad state of all things you touch: the codebase layout, the tool schemas, the file system, the last 20 turns of conversation and the user's preferences.

The world model is the entire aggregate of context that the harness loads to decide the next step.

You can look at memory as a broad harness and skill as a specific one.

Is skill a subset of memory?

Skills are the part that records what to do. A SKILL.md is a procedure-level claim: "to do task T, run steps X, Y, Z."

Skills extend memory with a practical ability to do N tasks. Skills are a compressed procedure. It says "the world has responded to X, Y, Z by producing T in the past, and probably will again."

Memory observes the world while skills codifies it into a rule.

We've extended cognee to store skills and memory in the same store. Self-improvement runtime and agentic retriever share the same graph nodes.

How Cognee handles it?

cognee.remember("skills/") now lets you ingest skills with one line.

Inside Cognee a SkillChangeEvent emits memory events when skill changes. The skill is a memory node that evolves, is traceable, and controllable.

Skills improve by reading their memory. Memory improves by amending the skills attached to it. There's no clean line between them because there should not be one.

We have recently organized a hackathon where users built 21 LLM Knowledge Wikis in 3 hours using Cognee and Redis as session store!

And they did so because improving skills and memory is trivial in our new API:

```python
proposal_result = await cognee.remember(
    SkillRunEntry(
        selected_skill_id=skill_to_improve,
        task_text="Review the current skill",
        result_summary="Review missed boundary bug.",
        success_score=score,
        feedback=-1.0 if score < 0.7 else 1.0,
    ),
    dataset_name=DATASET,
    session_id=SESSION,
    skill_improvement={
        "skill_name": skill_to_improve,
        "apply": False,
        "score_threshold": 0.9,
    },
)
```

How self-improvement works for Skills added to Cognee

Conclusion

Every world model outside board games is permanently misspecified. The harness's job isn't to fix the schema. It's to run a controller on top of one that's wrong by construction. Cognee is that controller, and skill self-improvement is the first step.

It doesn't matter if you use a memory api, skills, or an agent md file. Even compaction strategies are part of the same play.

It is the same world model.

The harness that wins treats memory and skills as one comprehensive world model from the start.

Imho, if your memory system can't route a skill, it's not memory, let alone a world model.

Try it out yourself, Cognee is open-source.
