---
id: 2026-06-22-lamis-mukta-learning-while-you-sleep-beyond-memory-to-dreaming
type: source
title: "Lamis Mukta — Learning while you sleep: Beyond memory to dreaming"
path: raw/articles/user-provided/2026-06-22-lamis-mukta-learning-while-you-sleep-beyond-memory-to-dreaming.md
author: Lamis Mukta
publisher: AI Native Dev / Tessl
url: https://www.youtube.com/watch?v=tTcxVv8HHNw
date_published: 2026-06-22
date_added: 2026-07-25
tags: [agent-memory, context-engineering, continual-learning, memory-consolidation, dreaming, multi-agent-systems, managed-agents, agent-harnesses]
status: active
quality: high
summary: Lamis Mukta presents a production architecture that combines agent-managed file-backed memory with deterministic versioning, concurrency, permission, attribution, and portability controls, then adds an asynchronous “dreaming” pass that uses cross-session evidence to verify, reorganize, prune, and enrich memory.
related: [agent-memory, context-engineering, agent-harnesses, multi-agent-systems, managed-agents, agent-security, 2026-07-25-agent-memory-dreaming-production-pattern]
---

# Lamis Mukta — Learning while you sleep: Beyond memory to dreaming

## Source Metadata

- Path: raw/articles/user-provided/2026-06-22-lamis-mukta-learning-while-you-sleep-beyond-memory-to-dreaming.md
- Speaker: Lamis Mukta, Member of Technical Staff on Anthropic's Applied AI team
- Event: AI Native DevCon, “The Context Window” stage
- Event date: 2026-06-01
- Video publisher: AI Native Dev / Tessl
- Video upload date: 2026-06-22
- Video URL: https://www.youtube.com/watch?v=tTcxVv8HHNw
- Video duration: approximately 31 minutes 58 seconds
- Event description: Early memory implementations enabled context management and movement toward continual learning; the talk covers current bottlenecks and introduces “dreaming,” a second-order process that periodically prunes and curates memory.
- Caption archive: 944 English auto-caption cues covering the full recording, including audience Q&A, preserved literally in `## Source Text`.
- Image archive: 15 user-supplied PNG screenshots under `raw/images/user-provided/2026-07-25-learning-while-you-sleep-dreaming/`, mapped to the user-supplied video timestamps below.
- Integrity note: all 15 archived PNGs were copied byte-for-byte and verified against the originals with SHA-256 checksums.

## TL;DR

Raw model intelligence does not compound by itself because each task otherwise begins from a cold start and organization-specific knowledge does not emerge merely from a larger model. Mukta's proposed stack starts with the simple primitives that already work—`CLAUDE.md`, progressively disclosed skills, markdown files, ordinary filesystem search, and autonomous agent writes—then adds deterministic production controls for versioning, optimistic concurrency, attribution, permission scopes, and portability. That still leaves in-band memory with divided attention, session-local visibility, hidden cross-agent patterns, duplication, and staleness. “Dreaming” addresses those limits as a periodic, out-of-band batch process: clone the current memory store, attach selected full session transcripts and tool metadata, fan analysis out to subagents, aggregate recurring evidence, and propose a verified, reorganized, enriched successor store for review or acceptance. The result is a two-speed memory system: fast in-band updates for immediate learning plus slower cross-session consolidation for fleet-level learning.

## Key Claims

- Intelligence alone does not compound: without memory, task 50 is no better informed than task 1, and domain-specific organizational competence does not automatically appear in a more capable base model.
- Simple human-readable markdown remains a strong memory format because both people and agents can inspect, search, and edit it with ordinary filesystem tools.
- `CLAUDE.md`-style always-loaded context is effective but eventually creates context bloat.
- Memory tools improve autonomy by letting the live agent decide when and what to read, write, or edit in-band.
- Skills add procedural memory and progressive disclosure: the agent first sees short frontmatter, then loads the detailed procedure only when relevant.
- The talk's stated state of the art is a memory directory containing files that agents read and write with ordinary file and search tools, rather than a rigid bespoke memory API.
- Productionizing shared memory requires deterministic controls around the model: version history, author/session/time attribution, rollback, content-hash concurrency checks, scoped permissions, and a portable API.
- In-band memory cannot optimize fleet learning on its own because the task agent divides attention between the current task and future memory quality, sees only its own session, misses patterns across sessions and agents, and leaves duplicates or stale notes behind.
- “Dreaming” is a second-order memory process: a periodic batch job with the dedicated objective and token budget of curating memory outside live task execution.
- A dreaming job should examine complete session evidence, including user/agent messages, tool calls, skill use, and other metadata—not merely final answers.
- A production dreaming pass can clone the current store, assign one subagent per transcript/session, let subagents read and write the output store, and use an orchestrator to decide which recurring patterns justify durable changes.
- Proposed changes should carry supporting transcript examples, prevalence statistics, and rationale so a human can accept or reject them.
- Permissioning must compose across both layers: a dreaming job should receive only transcripts whose access scope matches the target memory store.
- Proven deterministic primitives belong in the harness. Model autonomy should choose semantic memory content, while hashing, versioning, attribution, and permission enforcement should be programmatic.
- The cost of an offline dreaming pass can be offset when better memory reduces repeated errors, token usage, latency, and the number of attempts required for downstream tasks; the talk does not provide enough experimental detail to establish general ROI.

## Important Details

### Evolution of the memory stack

1. **Single-file memory (`CLAUDE.md`)** — small, always-loaded, human-editable context that strongly steers the agent, but grows into context bloat.
2. **Memory as a tool** — agent-controlled `read`, `write`, and `edit` operations during a session; autonomy works well, but maintenance competes with task execution.
3. **Skills as procedural memory** — compact frontmatter routes selection and the full `SKILL.md` loads on demand, allowing deep process guidance without preloading every procedure.
4. **Agent-managed memory directory** — markdown files plus ordinary search/read/write tools; indexes and search provide progressive disclosure while the agent decides what is worth retaining.

### Production controls

- **Versioning and attribution:** every write should retain the author, agent/session identity, time, evidence context, and full history needed to inspect or roll back the change.
- **Optimistic concurrency:** take a content hash before drafting, recheck immediately before writing, reject on mismatch, reload the new head, redraft, and retry.
- **Permissioning:** shared organizational knowledge can be read-only while an agent's working memory remains read-write; intermediate team and project scopes need explicit policies.
- **Portability:** the memory representation should remain ordinary files behind a standalone API so it can move across agents and product surfaces.
- These are deliberately conventional software-engineering primitives. The talk argues that the harness should implement them deterministically instead of asking the model to recreate database behavior.

### Reported production outcomes and evidence limits

- One slide reports **97% fewer first-pass errors**, with a customer quote also claiming **27% lower cost** and **34% lower latency**.
- A second customer quote reports **30% faster verification** in a document-verification pipeline because cross-session memory retained recurring issues.
- A third quote says managed memory infrastructure let the team focus on the product instead of building memory infrastructure.
- The slide anonymizes the organizations and does not disclose task definitions, baselines, sample sizes, measurement windows, or methodology. Treat all figures as self-reported customer outcomes presented by the speaker, not independently validated general benchmarks.

### Why in-band memory reaches its limits

- **Split focus:** the live agent must trade current-task quality and latency against future memory maintenance.
- **Patterns are obscured:** one session cannot see systematic failures across many sessions, agents, environments, or teams.
- **Memories go stale:** duplicates can disagree and obsolete notes can remain confidently wrong.
- The school analogy separates students doing work, teachers reviewing individual submissions, and a head teacher seeing curriculum-wide patterns. Dedicated review capacity plus wider visibility is the motivation for a second-order process.

### Dreaming architecture

- Input: the current memory store plus selected agent-session transcripts.
- Evidence: the full interaction record, including messages, tool calls, skill use, tool configuration failures, and other performance-relevant metadata.
- Execution: periodically run an orchestrator that deploys subagents—illustrated as one per session—to inspect the evidence and read/write a cloned output memory store.
- Aggregation: the orchestrator reviews subagent findings and promotes only sufficiently prevalent patterns.
- Output: an updated memory state with missing lessons added, stale or irrelevant entries removed, contradictions verified, duplicates consolidated, and structure reorganized.
- Review surface: proposed edits include transcript examples, prevalence statistics, and an explanation of why the evidence warrants a memory change; a person can accept or reject individual changes.
- Steering: organizations can specify which kinds of patterns matter, which do not, and how the memory/dreaming agents should curate their domain.
- The immediate in-band path and periodic dreaming path are complementary: in-band writes reduce time-to-learning for the next session, while dreaming adds broad visibility and dedicated consolidation capacity.

### Examples used in the talk

- If every geography student misses a topic, the batch reviewer can infer that the curriculum/memory store lacks the relevant knowledge and add it.
- If many math answers fail because calculators are configured for radians instead of degrees, the reviewer can diagnose a recurring tool-configuration error from tool-call traces.
- If all agents overuse em dashes, the system can promote an organization-wide style preference rather than waiting for every agent to learn it independently.

### Q&A clarifications

- Mukta says the presented architecture underlies the memory infrastructure of Anthropic's managed-agent offering and points to a memory and dreaming API in Claude Managed Agents as the out-of-box option discussed in the talk.
- Dreaming need not ingest every transcript from a time range. The caller chooses which transcripts to attach, so transcript selection can mirror the target store's permission set.
- The boundary between autonomy and infrastructure is explicit: semantic judgment may remain agentic, but mature primitives such as hashing, versioning, and access control should be codified in the harness.

## Entities

- Person: Lamis Mukta
- Organizations: Anthropic, AI Native Dev, Tessl
- Products and systems: Claude Code, `CLAUDE.md`, Claude Managed Agents, managed-agent memory API, dreaming API
- Architecture components: memory store, session transcripts, orchestrator, subagents, output memory store, content hashes, version history, permission scopes
- Concepts: context engineering, continual learning, file-backed memory, procedural memory, progressive disclosure, in-band memory, out-of-band consolidation, optimistic concurrency, attribution, verification, memory curation, fleet learning

## My Notes

- The strongest contribution is not the “dreaming” metaphor itself; offline memory consolidation already appears in adjacent sources. The novel production synthesis is the combination of file-native memory, database-grade harness controls, permission-aligned transcript selection, cross-session/fleet evidence, prevalence thresholds, and inspectable proposals.
- “Second-order” is the clearer description used on the slide and in most of the talk: memory updates context, while dreaming updates the memory process's output. The event page calls it a “second derivative process,” which appears to be marketing shorthand rather than a mathematical claim.
- This architecture should not be read as unrestricted self-modification. The proposed workflow clones the input store, produces reviewable changes with evidence, and lets the deployer choose acceptance policy.
- The talk distinguishes semantic agency from deterministic infrastructure well: agents decide what evidence means; the harness enforces concurrency, provenance, permissions, and rollback.
- Permission-aware transcript selection is essential. A fleet-wide dreaming job that can see sessions beyond the target memory's authority would become a cross-tenant or cross-role data-exfiltration path.
- The auto-caption track contains obvious transcription errors, including “Lamish,” “contacts windows,” and “Cloud Managed Agents.” Those errors remain untouched in `## Source Text`; the curated sections use the verified name Lamis Mukta, “context windows,” and Claude Managed Agents.
- The screenshots are more authoritative than the captions for exact slide wording and customer metrics. The video/captions are more authoritative for spoken qualifications and Q&A.

## Open Questions

- What objective or evaluation decides whether a dreaming pass improved the memory store rather than merely rewriting it?
- How are conflicts between subagent proposals, existing high-authority memories, and newer transcripts resolved?
- What prevalence threshold is appropriate for promotion, and how should rare but catastrophic failures be handled?
- Does the output store pass automated regression evals before replacing the current store?
- How are PII, secrets, prompt-injection payloads, and cross-tenant data filtered before transcripts reach dreaming subagents?
- Which updates can be applied automatically, and which require human review?
- What are the retention, rollback, and audit policies for input transcripts, rejected proposals, and prior memory versions?
- How much of the reported 97% / 30% performance uplift is attributable to memory content versus the managed harness and domain-specific workflow design?
- What is the cost break-even point for dreaming at different session volumes, agent error rates, and memory churn rates?
- How does the system prevent overfitting a shared memory store to frequent tasks while degrading rare workflows or minority user preferences?

## Related

- [[agent-memory]]
- [[context-engineering]]
- [[agent-harnesses]]
- [[multi-agent-systems]]
- [[managed-agents]]
- [[agent-security]]
- [[2026-04-16-agentic-stack]]
- [[2026-05-01-agent-memory-engineering-nicolas-bustamante-user-provided-brief]]
- [[2026-07-25-agent-memory-dreaming-production-pattern]]

## Slide Assets

All paths are repository-relative. Text below is a searchable transcription/description; the PNG remains the visual source of truth.

1. **01:39 — title:** `raw/images/user-provided/2026-07-25-learning-while-you-sleep-dreaming/01-01m39s-title.png` — “Learning while you Sleep: Beyond Memory to Dreaming”; Lamis Mukta; Member of Technical Staff · Anthropic.
2. **01:45 — agenda:** `raw/images/user-provided/2026-07-25-learning-while-you-sleep-dreaming/02-01m45s-agenda.png` — context engineering so far; the state of the art in memory today (`CLAUDE.md`, skills, and an agent-managed memory directory); dreaming as out-of-band consolidation between sessions.
3. **02:28 — bottleneck 01:** `raw/images/user-provided/2026-07-25-learning-while-you-sleep-dreaming/03-02m28s-intelligence-does-not-compound.png` — “Intelligence alone doesn't compound”: cold start, domain-specific knowledge, and no improvement from task 1 to task 50 without memory.
4. **03:41 — memory evolution:** `raw/images/user-provided/2026-07-25-learning-while-you-sleep-dreaming/04-03m41s-memory-evolution.png` — `CLAUDE.md` single-file memory → memory tools (`memory_read`, `memory_write`, `memory_edit`) → skills as procedural memory → agent-read/written files in `memory/`.
5. **08:45 — lessons so far:** `raw/images/user-provided/2026-07-25-learning-while-you-sleep-dreaming/05-08m45s-memory-lessons.png` — format: markdown/human-readable context; reading: progressive loading through frontmatter and search; writing: agent autonomy over what is worth keeping.
6. **08:58 — bottleneck 02:** `raw/images/user-provided/2026-07-25-learning-while-you-sleep-dreaming/06-08m58s-production-bottlenecks.png` — concurrent writes, lost attribution, and stale/mixed organizational versus working-memory scopes.
7. **10:30 — production reports:** `raw/images/user-provided/2026-07-25-learning-while-you-sleep-dreaming/07-10m30s-production-results.png` — anonymized customer statements reporting 97% fewer first-pass errors, 27% lower cost, 34% lower latency, 30% faster verification, and more product focus.
8. **12:10 — multi-agent production design:** `raw/images/user-provided/2026-07-25-learning-while-you-sleep-dreaming/08-12m10s-multi-agent-system.png` — read-only organizational conventions versus read-write team memory; permissioning and file/API portability across agent sessions.
9. **14:18 — bottleneck 03:** `raw/images/user-provided/2026-07-25-learning-while-you-sleep-dreaming/09-14m18s-in-band-limits.png` — split focus, cross-session/cross-agent patterns obscured, and stale or contradictory memories.
10. **15:28 — versioning and concurrency:** `raw/images/user-provided/2026-07-25-learning-while-you-sleep-dreaming/10-15m28s-versioning-concurrency.png` — attributed version history with rollback plus a content-SHA-256 precondition enforced in the harness.
11. **18:19 — introducing dreaming:** `raw/images/user-provided/2026-07-25-learning-while-you-sleep-dreaming/11-18m19s-introducing-dreaming.png` — “A second-order process”; a batch process running out of band with the single objective of curating memory.
12. **19:08 — how dreaming works:** `raw/images/user-provided/2026-07-25-learning-while-you-sleep-dreaming/12-19m08s-how-dreaming-works.png` — daily session transcripts plus the current memory state enter a periodic batch process, producing new insights and organized structure for the next day's sessions.
13. **21:58 — inside a dreaming pass:** `raw/images/user-provided/2026-07-25-learning-while-you-sleep-dreaming/13-21m58s-dreaming-pass.png` — clone `$MEM` to `$MEM_OUT`; an orchestrator assigns one subagent per session transcript; subagents read/write the output store to reorganize it.
14. **24:30 — unified memory system:** `raw/images/user-provided/2026-07-25-learning-while-you-sleep-dreaming/14-24m30s-unified-memory-system.png` — real-time in-band agent updates coexist with periodic out-of-band dreaming that verifies, organizes, and enriches team memory.
15. **25:34 — takeaways:** `raw/images/user-provided/2026-07-25-learning-while-you-sleep-dreaming/15-25m34s-takeaways.png` — do the simple thing that works; design permissioning/versioning/concurrency/portability for many long-running agents; add out-of-band dreaming to consolidate memory between sessions.

## Source Text

The block below preserves all 944 cues returned by the video's English auto-caption track. Each line records the cue's exact start offset, duration, language tag, and caption text returned by the transcript endpoint. No spelling, grammar, speaker-label, or recognition errors have been corrected.

<!-- TRANSCRIPT_CUES_START -->
[00:00:00.000 | 3760 ms | en] Welcome back.
[00:00:01.280 | 5160 ms | en] And we have another wonderful session
[00:00:03.760 | 6040 ms | en] with a topic that is very deep to my
[00:00:06.440 | 5920 ms | en] heart, sleep. And
[00:00:09.800 | 4520 ms | en] I'd love to welcome Lamish from
[00:00:12.360 | 3040 ms | en] Anthropic to the stage. Please, a warm
[00:00:14.320 | 2710 ms | en] welcome
[00:00:15.400 | 3650 ms | en] for our next talk.
[00:00:17.030 | 2020 ms | en] >> [applause]
[00:00:23.280 | 3160 ms | en] >> Hey everyone.
[00:00:24.600 | 3640 ms | en] Great to see you all today and hope
[00:00:26.440 | 5760 ms | en] you're all having a wonderful day so far
[00:00:28.240 | 5440 ms | en] here at AI DevCon. I certainly am.
[00:00:32.200 | 3360 ms | en] I hope that your contacts windows are
[00:00:33.680 | 3480 ms | en] not too full and you have a bit of space
[00:00:35.560 | 3840 ms | en] for a little bit more information about
[00:00:37.160 | 3760 ms | en] context.
[00:00:39.400 | 3560 ms | en] By way of introduction, my name is
[00:00:40.920 | 3480 ms | en] Lamish. I'm a member of technical staff
[00:00:42.960 | 4120 ms | en] at Anthropic.
[00:00:44.400 | 4560 ms | en] I work on our applied AI team and this
[00:00:47.080 | 4280 ms | en] is a team which sits between research,
[00:00:48.960 | 4560 ms | en] product and go-to-market. So we do a
[00:00:51.360 | 4280 ms | en] mixture of working on internal projects
[00:00:53.520 | 5120 ms | en] as well as directly with customers who
[00:00:55.640 | 5160 ms | en] are building agents at the frontier.
[00:00:58.640 | 4480 ms | en] Me specifically, I work with startups
[00:01:00.800 | 3759 ms | en] and founders, many of whom I'm sure are
[00:01:03.120 | 3080 ms | en] in this room today.
[00:01:04.559 | 3241 ms | en] And I think I have the best seat in the
[00:01:06.200 | 3120 ms | en] house because
[00:01:07.800 | 3960 ms | en] these are the users that are constantly
[00:01:09.320 | 4280 ms | en] pushing us right up against the boundary
[00:01:11.760 | 3320 ms | en] of what is possible with models and
[00:01:13.600 | 4960 ms | en] products today.
[00:01:15.080 | 5680 ms | en] And as such, we just get to like ride
[00:01:18.560 | 4880 ms | en] the exponential together.
[00:01:20.760 | 4680 ms | en] One thing that constantly comes up, as
[00:01:23.440 | 4840 ms | en] I'm sure you're all aware, is what it
[00:01:25.440 | 4840 ms | en] really takes to take the raw model
[00:01:28.280 | 5040 ms | en] intelligence that we have today and
[00:01:30.280 | 4560 ms | en] translate that into durable, scalable,
[00:01:33.320 | 3640 ms | en] useful products.
[00:01:34.840 | 3880 ms | en] And one of the main levers that we have
[00:01:36.960 | 3800 ms | en] in order to do this is context
[00:01:38.720 | 4880 ms | en] engineering, which will be the focus of
[00:01:40.760 | 2840 ms | en] my talk today.
[00:01:44.280 | 5640 ms | en] So on this journey, I want to quickly do
[00:01:47.880 | 4120 ms | en] a recap of where context engineering has
[00:01:49.920 | 4600 ms | en] gone in the past year. It's a space
[00:01:52.000 | 4120 ms | en] that's completely blown up.
[00:01:54.520 | 2960 ms | en] And through that, we'll kind of distill
[00:01:56.120 | 3160 ms | en] the primitives that have proven to be
[00:01:57.480 | 4160 ms | en] really useful, some stuff that has been
[00:01:59.280 | 3920 ms | en] a little bit less useful.
[00:02:01.640 | 3200 ms | en] Secondly, we'll talk about what the
[00:02:03.200 | 4000 ms | en] state of the art is for memory
[00:02:04.840 | 4839 ms | en] management today.
[00:02:07.200 | 4360 ms | en] And thirdly, and and in particular with
[00:02:09.679 | 3401 ms | en] that, we'll talk about not just what
[00:02:11.560 | 2760 ms | en] nice theoretical principles are, but
[00:02:13.080 | 3600 ms | en] what it takes to actually build these
[00:02:14.320 | 3920 ms | en] systems in production.
[00:02:16.680 | 3279 ms | en] And then finally, we'll talk about where
[00:02:18.240 | 3840 ms | en] this will go on the path to continual
[00:02:19.959 | 5921 ms | en] learning, and in particular touching on
[00:02:22.080 | 3800 ms | en] a paradigm called dreaming.
[00:02:27.040 | 3880 ms | en] So,
[00:02:28.240 | 4520 ms | en] we said this before, and
[00:02:30.920 | 3000 ms | en] models we release new models all the
[00:02:32.760 | 2600 ms | en] time, they are more and more
[00:02:33.920 | 3000 ms | en] intelligent.
[00:02:35.360 | 3360 ms | en] But when it comes to actually deploying
[00:02:36.920 | 4840 ms | en] these models in your agents, in your
[00:02:38.720 | 4560 ms | en] environments, in your organization,
[00:02:41.760 | 4000 ms | en] the intelligence alone is not going to
[00:02:43.280 | 3920 ms | en] compound because they need this context
[00:02:45.760 | 3640 ms | en] that helps them perform the specific
[00:02:47.200 | 4400 ms | en] tasks that you need them to.
[00:02:49.400 | 3800 ms | en] In particular, a lot of this context is
[00:02:51.600 | 3920 ms | en] often kind of orthogonal to the model
[00:02:53.200 | 4680 ms | en] intelligence, right? Like,
[00:02:55.520 | 3920 ms | en] the newest model, we just released one,
[00:02:57.880 | 3160 ms | en] um isn't going to neces- isn't going to
[00:02:59.440 | 3720 ms | en] out of the box know exactly what it
[00:03:01.040 | 3360 ms | en] takes to succeed in your organization
[00:03:03.160 | 2240 ms | en] and with the tasks that you want them
[00:03:04.400 | 3440 ms | en] to.
[00:03:05.400 | 4400 ms | en] And so, it's a really great investment
[00:03:07.840 | 3160 ms | en] to work on the context engineering part
[00:03:09.800 | 1760 ms | en] because this
[00:03:11.000 | 2519 ms | en] uh
[00:03:11.560 | 3640 ms | en] over time has the effect of multiplying
[00:03:13.519 | 3321 ms | en] the intelligence even as models get
[00:03:15.200 | 2759 ms | en] smarter.
[00:03:16.840 | 2679 ms | en] So, I'm sure you'll all be familiar with
[00:03:17.959 | 3681 ms | en] these problems. It's like agents not
[00:03:19.519 | 3921 ms | en] knowing their way around a code base or
[00:03:21.640 | 3400 ms | en] knowing enough about your own user
[00:03:23.440 | 2400 ms | en] preferences.
[00:03:25.040 | 2640 ms | en] Um
[00:03:25.840 | 4280 ms | en] And then additionally, like you don't
[00:03:27.680 | 4040 ms | en] have the effect where agents are better
[00:03:30.120 | 3119 ms | en] at the task the next time they perform
[00:03:31.720 | 4160 ms | en] it. So, they they might not learn from
[00:03:33.239 | 4081 ms | en] their mistakes, um and as such,
[00:03:35.880 | 3480 ms | en] you don't have this uh continual
[00:03:37.320 | 4960 ms | en] learning effect. So,
[00:03:39.360 | 2920 ms | en] just to recap
[00:03:42.959 | 5521 ms | en] uh where we've got so far on this
[00:03:45.680 | 5480 ms | en] journey of context engineering.
[00:03:48.480 | 4400 ms | en] At Anthropic, we like to say do the
[00:03:51.160 | 3120 ms | en] simple thing that works.
[00:03:52.880 | 3440 ms | en] And this is a timeline that's only
[00:03:54.280 | 3360 ms | en] really spans the past year, and where we
[00:03:56.320 | 3360 ms | en] started
[00:03:57.640 | 4160 ms | en] was with these Claude MD files that we
[00:03:59.680 | 3240 ms | en] launched with Claude code.
[00:04:01.800 | 3040 ms | en] And what we learned from this was that
[00:04:02.920 | 3600 ms | en] it was kind of unreasonably effective.
[00:04:04.840 | 4119 ms | en] Like this markdown file that just gives
[00:04:06.520 | 4040 ms | en] the agent a couple of instructions about
[00:04:08.959 | 3521 ms | en] maybe your way around the code base, the
[00:04:10.560 | 3520 ms | en] organization, um your own user
[00:04:12.480 | 3479 ms | en] preferences.
[00:04:14.080 | 3240 ms | en] That injected into the beginning of the
[00:04:15.959 | 3441 ms | en] model context at the beginning of a
[00:04:17.320 | 3479 ms | en] session was so good at steering it
[00:04:19.400 | 3080 ms | en] towards the things that mattered and
[00:04:20.799 | 3361 ms | en] helping it navigate
[00:04:22.480 | 3400 ms | en] and align its actions towards your
[00:04:24.160 | 3280 ms | en] preferences.
[00:04:25.880 | 3600 ms | en] However, we also learned a couple of
[00:04:27.440 | 3680 ms | en] things about what doesn't work here. So,
[00:04:29.480 | 3120 ms | en] when we're injecting this at the
[00:04:31.120 | 3720 ms | en] beginning at the beginning of the
[00:04:32.600 | 5240 ms | en] session into context, we obviously start
[00:04:34.840 | 4480 ms | en] to run into problems where you get
[00:04:37.840 | 3360 ms | en] problems with context bloat, like what
[00:04:39.320 | 3640 ms | en] happens when this file with very
[00:04:41.200 | 5920 ms | en] important preferences gets very, very
[00:04:42.960 | 5280 ms | en] long. Um how do I manage that over time?
[00:04:47.120 | 2160 ms | en] And so, we went back to the drawing
[00:04:48.240 | 2640 ms | en] board and thought about like ways that
[00:04:49.280 | 3560 ms | en] we could improve this.
[00:04:50.880 | 4039 ms | en] Separately though, what was true was
[00:04:52.840 | 4320 ms | en] that having just a very simple markdown
[00:04:54.919 | 3801 ms | en] file, which is human readable, which
[00:04:57.160 | 5120 ms | en] your agent can write to, which you can
[00:04:58.720 | 5800 ms | en] write to, is really, really effective.
[00:05:02.280 | 4840 ms | en] So, a second avenue that we investigated
[00:05:04.520 | 5600 ms | en] was these memory tools.
[00:05:07.120 | 5799 ms | en] And this is interesting because it leans
[00:05:10.120 | 5799 ms | en] into this idea of, okay, what happens if
[00:05:12.919 | 5241 ms | en] we let agents autonomously manage their
[00:05:15.919 | 4601 ms | en] own memory systems. So, we let them
[00:05:18.160 | 4640 ms | en] decide when they read, when they write,
[00:05:20.520 | 5000 ms | en] um and when they update memories.
[00:05:22.800 | 4200 ms | en] And this is all happening in band, which
[00:05:25.520 | 4240 ms | en] means that it's within the context of a
[00:05:27.000 | 5400 ms | en] session. So, during a session, a agent
[00:05:29.760 | 3880 ms | en] is thinking about like what might be
[00:05:32.400 | 4120 ms | en] interesting to pull from memory, what
[00:05:33.640 | 3920 ms | en] might be interesting to write to memory.
[00:05:36.520 | 3160 ms | en] So,
[00:05:37.560 | 3440 ms | en] autonomy proved to work really well in
[00:05:39.680 | 2200 ms | en] this case.
[00:05:41.000 | 2560 ms | en] Um
[00:05:41.880 | 3160 ms | en] and over time, we've kind of developed
[00:05:43.560 | 3200 ms | en] that into systems where we're even less
[00:05:45.040 | 3560 ms | en] opinionated about what these tools need
[00:05:46.760 | 4080 ms | en] to look like and I'll touch on that in a
[00:05:48.600 | 3960 ms | en] second.
[00:05:50.840 | 2760 ms | en] So, the next uh
[00:05:52.560 | 2840 ms | en] the next stop on this journey was
[00:05:53.600 | 3440 ms | en] skills, which I'm sure you've heard a
[00:05:55.400 | 4240 ms | en] bunch about today.
[00:05:57.040 | 4160 ms | en] And what this solves is
[00:05:59.640 | 3840 ms | en] this problem of the like ever-growing
[00:06:01.200 | 6080 ms | en] context. So, we have this really clever
[00:06:03.480 | 6600 ms | en] idea of um progressive disclosure.
[00:06:07.280 | 4200 ms | en] The way I like to think about it is um
[00:06:10.080 | 3880 ms | en] actually first on skill what skills are
[00:06:11.480 | 4480 ms | en] good at, it's processes where you have
[00:06:13.960 | 3320 ms | en] like a procedural workflow. So,
[00:06:15.960 | 4240 ms | en] something where you have an opinion
[00:06:17.280 | 4680 ms | en] about how the process works end to end
[00:06:20.200 | 3160 ms | en] that you want the agent to follow.
[00:06:21.960 | 3800 ms | en] Um and what's very clever is that the
[00:06:23.360 | 4040 ms | en] agent only looks at this front matter a
[00:06:25.760 | 4040 ms | en] couple of sentences at the top of the
[00:06:27.400 | 4280 ms | en] file before loading the skill.
[00:06:29.800 | 3360 ms | en] But you can still load as much detail as
[00:06:31.680 | 4280 ms | en] you want into the main body of the file.
[00:06:33.160 | 4680 ms | en] So, you're able to at the same time have
[00:06:35.960 | 3880 ms | en] very deep levels of detail
[00:06:37.840 | 3400 ms | en] whilst not overloading the model's
[00:06:39.840 | 3160 ms | en] context.
[00:06:41.240 | 4679 ms | en] And the way I like to think about it is
[00:06:43.000 | 5520 ms | en] as if I'd had a bookshelf in my room and
[00:06:45.919 | 4481 ms | en] every time someone talks to me um I can
[00:06:48.520 | 3600 ms | en] kind of scan and look at my list of
[00:06:50.400 | 3600 ms | en] books and see if any of the titles might
[00:06:52.120 | 3280 ms | en] be relevant to the conversation and kind
[00:06:54.000 | 3560 ms | en] of pick that off the shelf and read it
[00:06:55.400 | 3480 ms | en] when I need to. So, for example, if
[00:06:57.560 | 3040 ms | en] someone walked up to me and started
[00:06:58.880 | 3360 ms | en] speaking to me in French and I noticed
[00:07:00.600 | 3240 ms | en] that I have a French dictionary, I could
[00:07:02.240 | 3440 ms | en] pull that out and it would give me
[00:07:03.840 | 3760 ms | en] context kind of loaded during the
[00:07:05.680 | 4200 ms | en] conversation that would help me
[00:07:07.600 | 3640 ms | en] um without me having paid attention in
[00:07:09.880 | 2840 ms | en] like seven years of French classes at
[00:07:11.240 | 2960 ms | en] school and having that all loaded into
[00:07:12.720 | 3720 ms | en] my context already.
[00:07:14.200 | 4160 ms | en] So, this was a really really great
[00:07:16.440 | 3920 ms | en] innovation.
[00:07:18.360 | 4640 ms | en] But one bottleneck potentially with it
[00:07:20.360 | 4240 ms | en] is that it's still kind of driven by
[00:07:23.000 | 3400 ms | en] humans and agents together. So, you're
[00:07:24.600 | 3560 ms | en] still even if you're using your agents
[00:07:26.400 | 3560 ms | en] to write the skills with you, you're
[00:07:28.160 | 4680 ms | en] still being quite opinionated about like
[00:07:29.960 | 4720 ms | en] what things need skills.
[00:07:32.840 | 4160 ms | en] So, that takes me to the final step on
[00:07:34.680 | 3960 ms | en] this path, which is what we perceive to
[00:07:37.000 | 2815 ms | en] be state of art for memory systems
[00:07:38.640 | 1360 ms | en] today.
[00:07:39.815 | 3465 ms | en] >> [snorts]
[00:07:40.000 | 4880 ms | en] >> And what we have done and yeah, what we
[00:07:43.280 | 3960 ms | en] think is best practice,
[00:07:44.880 | 3840 ms | en] is modeling these memory systems just as
[00:07:47.240 | 3000 ms | en] file systems.
[00:07:48.720 | 3600 ms | en] So, this kind of aggregates a couple of
[00:07:50.240 | 3480 ms | en] the learnings from this path. So, file
[00:07:52.320 | 4360 ms | en] systems are great. You can just fill
[00:07:53.720 | 5000 ms | en] them up with markdown. Um agents are
[00:07:56.680 | 4080 ms | en] actually just very good at using normal
[00:07:58.720 | 3920 ms | en] file system tools like bash and grep.
[00:08:00.760 | 4160 ms | en] So, just let them search over the file
[00:08:02.640 | 3880 ms | en] system, rather than being opinionated
[00:08:04.920 | 3840 ms | en] about the specific tools that they
[00:08:06.520 | 4680 ms | en] should use to read and write to memory.
[00:08:08.760 | 4000 ms | en] Um and then yeah, that that search kind
[00:08:11.200 | 3719 ms | en] of mirrors this idea of progressive
[00:08:12.760 | 4080 ms | en] disclosure. You can index these memory
[00:08:14.919 | 3761 ms | en] systems really well, so that agents can
[00:08:16.840 | 3400 ms | en] intelligently search over them. And
[00:08:18.680 | 3480 ms | en] that's where we have kind of got to so
[00:08:20.240 | 3360 ms | en] far.
[00:08:22.160 | 3160 ms | en] So, just a
[00:08:23.600 | 4600 ms | en] recap the key learnings from that
[00:08:25.320 | 4040 ms | en] format. Markdown is great um for reading
[00:08:28.200 | 2480 ms | en] memories.
[00:08:29.360 | 3040 ms | en] You know, [snorts] allow the memories to
[00:08:30.680 | 4600 ms | en] grow large, but
[00:08:32.400 | 5199 ms | en] give agents tools to quickly index and
[00:08:35.280 | 4080 ms | en] search for what's relevant. And finally,
[00:08:37.599 | 4441 ms | en] like give agents autonomy when they're
[00:08:39.360 | 3239 ms | en] writing to memories.
[00:08:42.040 | 1800 ms | en] >> [snorts]
[00:08:42.599 | 2681 ms | en] >> And if you were to go out and build this
[00:08:43.840 | 3920 ms | en] system, it would work really well. You
[00:08:45.280 | 3800 ms | en] would have the feeling of continual
[00:08:47.760 | 3800 ms | en] learning because your agents would get
[00:08:49.080 | 5920 ms | en] better at the individual um whatever
[00:08:51.560 | 3440 ms | en] individual tasks you're doing.
[00:08:55.520 | 3880 ms | en] However,
[00:08:56.960 | 4760 ms | en] as with everything, this very neat idea
[00:08:59.400 | 5240 ms | en] runs into some problems when you try and
[00:09:01.720 | 4920 ms | en] scale it to production. So, we have and
[00:09:04.640 | 4480 ms | en] I we have a concept for
[00:09:06.640 | 4800 ms | en] theoretically what works. And when we
[00:09:09.120 | 4600 ms | en] then think about scaling these to
[00:09:11.440 | 3960 ms | en] production in environments where we have
[00:09:13.720 | 3880 ms | en] many agents collaborating at the same
[00:09:15.400 | 6280 ms | en] time, where they run over very long
[00:09:17.600 | 5520 ms | en] periods of time, um and where
[00:09:21.680 | 3159 ms | en] potentially these like code bases get
[00:09:23.120 | 3480 ms | en] really complicated, all manner of
[00:09:24.839 | 4201 ms | en] problems start to arise. And we've seen
[00:09:26.600 | 4800 ms | en] these in production time and time again.
[00:09:29.040 | 4320 ms | en] So, one a couple things just to like,
[00:09:31.400 | 3800 ms | en] yeah, spark your imagination.
[00:09:33.360 | 4000 ms | en] Think about multiple agents trying to
[00:09:35.200 | 4760 ms | en] write to a memory file at the same time.
[00:09:37.360 | 4080 ms | en] How do you manage that? Think about one
[00:09:39.960 | 3640 ms | en] agent running into a problem and
[00:09:41.440 | 4360 ms | en] deciding to like write to the
[00:09:43.600 | 3640 ms | en] organizational worldwide contacts which
[00:09:45.800 | 3600 ms | en] every other agent is currently reading
[00:09:47.240 | 4120 ms | en] from. Like if something was incorrect
[00:09:49.400 | 4720 ms | en] there, that would scale to all of your
[00:09:51.360 | 3920 ms | en] agents and be pretty disastrous.
[00:09:54.120 | 2560 ms | en] Um
[00:09:55.280 | 3280 ms | en] and think about when you have humans and
[00:09:56.680 | 3800 ms | en] agents collaborating on on memory
[00:09:58.560 | 4600 ms | en] contacts together. Like how do you keep
[00:10:00.480 | 3880 ms | en] track of what's going on?
[00:10:03.160 | 3120 ms | en] The final problem is that memories can
[00:10:04.360 | 4280 ms | en] go stale, of course. Something that was
[00:10:06.280 | 4440 ms | en] relevant in the past uh might not be
[00:10:08.640 | 3400 ms | en] relevant today or maybe it was written
[00:10:10.720 | 3560 ms | en] incorrectly
[00:10:12.040 | 4080 ms | en] or even maliciously injected by someone
[00:10:14.280 | 3560 ms | en] trying to uh
[00:10:16.120 | 3680 ms | en] prompt inject your agents to write bad
[00:10:17.840 | 4280 ms | en] things to memory. So, you have to have a
[00:10:19.800 | 3800 ms | en] lot of guardrails in place to make sure
[00:10:22.120 | 3440 ms | en] that these
[00:10:23.600 | 5000 ms | en] nice autonomous memory systems actually
[00:10:25.560 | 3040 ms | en] work in production.
[00:10:29.600 | 4720 ms | en] And so, I'm going to talk through a
[00:10:31.280 | 4560 ms | en] couple of key principles that we use
[00:10:34.320 | 3920 ms | en] when designing memory systems in
[00:10:35.840 | 3720 ms | en] production to make sure that we do get
[00:10:38.240 | 4440 ms | en] to use all of those nice effects that
[00:10:39.560 | 5800 ms | en] we've talked that we've spoken about.
[00:10:42.680 | 4200 ms | en] So, the very first thing is versioning.
[00:10:45.360 | 3280 ms | en] So, when you're designing any kind of
[00:10:46.880 | 3542 ms | en] memory system, you need to be able to
[00:10:48.640 | 1920 ms | en] store versions
[00:10:50.422 | 2178 ms | en] >> [snorts]
[00:10:50.560 | 3440 ms | en] >> to keep track of what's going on,
[00:10:52.600 | 3480 ms | en] to allow you to roll back should you
[00:10:54.000 | 4240 ms | en] need to if uh a new update isn't
[00:10:56.080 | 3600 ms | en] particularly good. Um [snorts]
[00:10:58.240 | 3560 ms | en] Additionally, you probably want to think
[00:10:59.680 | 4440 ms | en] about like what context was this update
[00:11:01.800 | 4039 ms | en] based on. So, which agent session, which
[00:11:04.120 | 3120 ms | en] transcript
[00:11:05.839 | 3121 ms | en] resulted in me wanting to make this
[00:11:07.240 | 3240 ms | en] update.
[00:11:08.960 | 2960 ms | en] Um
[00:11:10.480 | 2760 ms | en] And additionally, like you might want to
[00:11:11.920 | 3800 ms | en] track like who did it, which agent,
[00:11:13.240 | 4320 ms | en] which human, etc., etc.
[00:11:15.720 | 3920 ms | en] So, this is really important. The second
[00:11:17.560 | 3200 ms | en] thing is concurrency.
[00:11:19.640 | 2440 ms | en] So, we've talked about, okay, what
[00:11:20.760 | 3520 ms | en] happens when I deploy thousands of
[00:11:22.080 | 3920 ms | en] agents all working off the same memory
[00:11:24.280 | 4680 ms | en] system.
[00:11:26.000 | 6360 ms | en] And the solution that we've adopted here
[00:11:28.960 | 5600 ms | en] is to have this hashing system. So, when
[00:11:32.360 | 5440 ms | en] an agent decides that it wants to write
[00:11:34.560 | 5360 ms | en] an update to a memory, it takes a hash.
[00:11:37.800 | 4760 ms | en] It then drafts its edit. And then,
[00:11:39.920 | 5000 ms | en] before it writes the update, it takes
[00:11:42.560 | 4320 ms | en] another hash. If those two things do not
[00:11:44.920 | 4040 ms | en] match, then the agent cannot write it
[00:11:46.880 | 3803 ms | en] because it means that some update was
[00:11:48.960 | 1800 ms | en] made in the meantime.
[00:11:50.683 | 1997 ms | en] >> [snorts]
[00:11:50.760 | 3480 ms | en] >> And in order to handle that, the agent
[00:11:52.680 | 3360 ms | en] repulls the memory,
[00:11:54.240 | 3200 ms | en] drafts its new update, and then tries to
[00:11:56.040 | 2800 ms | en] commit this again.
[00:11:57.440 | 2840 ms | en] So, these are the kinds of just
[00:11:58.840 | 4840 ms | en] engineering practices that allow you to
[00:12:00.280 | 4520 ms | en] scale multi-agent architectures, um
[00:12:03.680 | 3800 ms | en] scale memory to these kinds of
[00:12:04.800 | 2680 ms | en] architectures.
[00:12:09.560 | 5680 ms | en] Another couple key principles. So,
[00:12:11.440 | 6200 ms | en] permissioning is really important.
[00:12:15.240 | 5040 ms | en] When you have large memory bases,
[00:12:17.640 | 4440 ms | en] you probably have a mixture of top-level
[00:12:20.280 | 4200 ms | en] organizational-wide knowledge. It might
[00:12:22.080 | 4000 ms | en] be like your key, uh like what your
[00:12:24.480 | 3320 ms | en] organization is trying to achieve, or
[00:12:26.080 | 5600 ms | en] key principles about the code base,
[00:12:27.800 | 5360 ms | en] which you've really carefully curated.
[00:12:31.680 | 3480 ms | en] All the way down to the level of like a
[00:12:33.160 | 3840 ms | en] scratchpad for an agent, where it writes
[00:12:35.160 | 3000 ms | en] down its working memory,
[00:12:37.000 | 3160 ms | en] and [snorts] it's very like
[00:12:38.160 | 2960 ms | en] individualized. And all the way in
[00:12:40.160 | 2360 ms | en] between, you could have things for
[00:12:41.120 | 3360 ms | en] specific organizations or
[00:12:42.520 | 3319 ms | en] cross-sections.
[00:12:44.480 | 2960 ms | en] And so, it's really important that you
[00:12:45.839 | 4481 ms | en] have guardrails when it comes to
[00:12:47.440 | 4840 ms | en] permissioning uh these memories. So,
[00:12:50.320 | 4040 ms | en] like I said, you wouldn't want one agent
[00:12:52.280 | 4120 ms | en] to just decide that it should update the
[00:12:54.360 | 4040 ms | en] organization-wide context, probably. You
[00:12:56.400 | 3480 ms | en] might want that as read-only. However,
[00:12:58.400 | 3200 ms | en] for its own scratchpad, you would want
[00:12:59.880 | 2959 ms | en] it to have write access.
[00:13:01.600 | 3720 ms | en] Um
[00:13:02.839 | 5161 ms | en] and yeah, yeah, that's that's
[00:13:05.320 | 4519 ms | en] permissioning. Um
[00:13:08.000 | 4000 ms | en] A final thing, which is kind of
[00:13:09.839 | 4641 ms | en] peripheral, but still really important
[00:13:12.000 | 5440 ms | en] when you design memory systems,
[00:13:14.480 | 2960 ms | en] is portability.
[00:13:18.160 | 4560 ms | en] So,
[00:13:19.880 | 5480 ms | en] your curation of your memory systems is
[00:13:22.720 | 4360 ms | en] going to be so important like throughout
[00:13:25.360 | 4920 ms | en] the future. This is really, really
[00:13:27.080 | 6440 ms | en] important organization, user, or like
[00:13:30.280 | 4440 ms | en] work task specific context. And so, it's
[00:13:33.520 | 3120 ms | en] likely that if you're putting a lot of
[00:13:34.720 | 4040 ms | en] effort into curating this,
[00:13:36.640 | 4520 ms | en] you want it to be accessible across
[00:13:38.760 | 2619 ms | en] potentially multiple product surfaces,
[00:13:41.160 | 480 ms | en] um
[00:13:41.379 | 1701 ms | en] >> [snorts]
[00:13:41.640 | 3720 ms | en] >> and
[00:13:43.080 | 3800 ms | en] access accessible by multiple systems.
[00:13:45.360 | 3280 ms | en] So, designing it in a way with a clean
[00:13:46.880 | 5120 ms | en] API in which it's portable and you can
[00:13:48.640 | 4640 ms | en] access it is really important.
[00:13:52.000 | 2200 ms | en] And
[00:13:53.280 | 3560 ms | en] so, when you put all these things
[00:13:54.200 | 4480 ms | en] together, we have the kind of
[00:13:56.840 | 4000 ms | en] learnings we have from allowing agents
[00:13:58.680 | 4520 ms | en] to creatively manage their memory, and
[00:14:00.840 | 4720 ms | en] then these production level guardrails
[00:14:03.200 | 5000 ms | en] that allow them to like reasonably use
[00:14:05.560 | 4160 ms | en] all of those principles in practice.
[00:14:08.200 | 4640 ms | en] And when you do this, you get very
[00:14:09.720 | 4520 ms | en] effective results. So, just sharing here
[00:14:12.840 | 3960 ms | en] a couple of learnings from what we've
[00:14:14.240 | 4840 ms | en] seen deploying these large-scale memory
[00:14:16.800 | 3600 ms | en] systems in production.
[00:14:19.080 | 3800 ms | en] And
[00:14:20.400 | 4640 ms | en] for example, we see you get better
[00:14:22.880 | 4280 ms | en] accuracy, so you have this effect where
[00:14:25.040 | 3800 ms | en] the second time the agent does the task,
[00:14:27.160 | 3640 ms | en] it actually does it better
[00:14:28.840 | 4560 ms | en] with higher results
[00:14:30.800 | 4080 ms | en] because it's noted all of those memories
[00:14:33.400 | 3320 ms | en] about what went wrong.
[00:14:34.880 | 4480 ms | en] Secondly, that then has second-order
[00:14:36.720 | 4720 ms | en] effects on the speed and latency, sorry,
[00:14:39.360 | 3720 ms | en] speed and cost of your
[00:14:41.440 | 3760 ms | en] agents running because they're then
[00:14:43.080 | 4680 ms | en] spending fewer tokens, they can be more
[00:14:45.200 | 4560 ms | en] easily one-shot these tasks because they
[00:14:47.760 | 3320 ms | en] actually know what they're doing.
[00:14:49.760 | 3200 ms | en] And you'll see that it across all sorts
[00:14:51.080 | 3720 ms | en] of different processes, um agents are
[00:14:52.960 | 4920 ms | en] just able to do the task better and
[00:14:54.800 | 5200 ms | en] faster. Finally, having this
[00:14:57.880 | 3520 ms | en] process where your agents are starting
[00:15:00.000 | 2600 ms | en] to autonomously write their own
[00:15:01.400 | 4320 ms | en] memories,
[00:15:02.600 | 4960 ms | en] frees up capacity and context for you as
[00:15:05.720 | 3680 ms | en] product developers potentially to focus
[00:15:07.560 | 3320 ms | en] on product wins while you know that the
[00:15:09.400 | 3640 ms | en] agents are doing this kind of
[00:15:10.880 | 4360 ms | en] self-learning, continual learning loop
[00:15:13.040 | 4520 ms | en] in the background. And yeah, once that
[00:15:15.240 | 6040 ms | en] infrastructure is set up really well,
[00:15:17.560 | 5600 ms | en] this this works very symbiotically.
[00:15:21.280 | 3240 ms | en] Um
[00:15:23.160 | 4320 ms | en] as ever,
[00:15:24.520 | 5680 ms | en] we do then reach a new bottleneck.
[00:15:27.480 | 3760 ms | en] And this specifically is about in-band
[00:15:30.200 | 2880 ms | en] memory.
[00:15:31.240 | 4520 ms | en] So, in-band memory, as I mentioned
[00:15:33.080 | 5240 ms | en] before, is when agents are writing to
[00:15:35.760 | 5320 ms | en] and reading from memory within a
[00:15:38.320 | 5000 ms | en] specific session. So, if you think about
[00:15:41.080 | 3960 ms | en] Claude code, for example, um when you
[00:15:43.320 | 3800 ms | en] like spin up a new session,
[00:15:45.040 | 4400 ms | en] it's it's largely like focusing on that
[00:15:47.120 | 4320 ms | en] specific context when it's reading to
[00:15:49.440 | 4120 ms | en] reading and writing from memory.
[00:15:51.440 | 3720 ms | en] Um and this just architecturally or
[00:15:53.560 | 3720 ms | en] philosophically
[00:15:55.160 | 3560 ms | en] has limitations in the general like
[00:15:57.280 | 3000 ms | en] agent fleets continual learning
[00:15:58.720 | 3760 ms | en] objectives.
[00:16:00.280 | 3920 ms | en] There's two two main reasons why.
[00:16:02.480 | 4480 ms | en] First of all, is that you have this
[00:16:04.200 | 4600 ms | en] inherent split of focus and resources.
[00:16:06.960 | 4840 ms | en] So, you're asking an agent to complete a
[00:16:08.800 | 5520 ms | en] task, but at the same time, you're also
[00:16:11.800 | 4120 ms | en] asking it to invest in memory curation,
[00:16:14.320 | 2840 ms | en] which would help it perform better in a
[00:16:15.920 | 3480 ms | en] future run.
[00:16:17.160 | 3920 ms | en] So, when you put these things together,
[00:16:19.400 | 3400 ms | en] it's just a very difficult optimization
[00:16:21.080 | 3160 ms | en] problem, because how much capacity
[00:16:22.800 | 3280 ms | en] should an agent put into like helping
[00:16:24.240 | 3560 ms | en] future versions of itself versus doing
[00:16:26.080 | 3759 ms | en] the task that you actually asked it to
[00:16:27.800 | 3240 ms | en] do.
[00:16:29.839 | 3601 ms | en] And also, there's like other effects
[00:16:31.040 | 5280 ms | en] like latency, for example.
[00:16:33.440 | 5760 ms | en] The second thing is that the agents just
[00:16:36.320 | 5400 ms | en] have an inherent visibility limitation.
[00:16:39.200 | 4720 ms | en] So, they only have the context of what's
[00:16:41.720 | 3880 ms | en] going on in their session.
[00:16:43.920 | 2960 ms | en] As such, they just won't see patterns
[00:16:45.600 | 3280 ms | en] that happen across sessions. So, when
[00:16:46.880 | 3520 ms | en] you get frustrated that your agent keeps
[00:16:48.880 | 2760 ms | en] making the same mistake over sessions,
[00:16:50.400 | 3680 ms | en] it just doesn't understand how
[00:16:51.640 | 4760 ms | en] frustrating that is, because it has a
[00:16:54.080 | 3640 ms | en] new context window in each of those.
[00:16:56.400 | 2400 ms | en] Secondly, when you're running multiple
[00:16:57.720 | 2640 ms | en] fleets of agents in different
[00:16:58.800 | 3440 ms | en] environments,
[00:17:00.360 | 3680 ms | en] you these single agents just don't have
[00:17:02.240 | 4240 ms | en] the context of what other failures other
[00:17:04.040 | 3760 ms | en] agents are running into.
[00:17:06.480 | 3400 ms | en] So, for these two reasons, we introduced
[00:17:07.800 | 3399 ms | en] this concept of some out-of-band memory
[00:17:09.880 | 4079 ms | en] curation,
[00:17:11.199 | 5640 ms | en] and this helps to make these problems go
[00:17:13.959 | 6161 ms | en] away. And just to introduce an analogy
[00:17:16.839 | 5360 ms | en] for why this in theory should work,
[00:17:20.120 | 3360 ms | en] I'd like you to think about a school,
[00:17:22.199 | 3561 ms | en] for example, where you have lots of
[00:17:23.480 | 4640 ms | en] students that submit a lot of work,
[00:17:25.760 | 3800 ms | en] and you also have uh
[00:17:28.120 | 3680 ms | en] teachers that mark it and a head teacher
[00:17:29.560 | 3520 ms | en] that reviews everything.
[00:17:31.800 | 3280 ms | en] This is a a system that we have in the
[00:17:33.080 | 3720 ms | en] real world for good reason, and it's
[00:17:35.080 | 4240 ms | en] because when you have certain
[00:17:36.800 | 4120 ms | en] individuals that have dedicated capacity
[00:17:39.320 | 3280 ms | en] for helping people learn, that's really
[00:17:40.920 | 3400 ms | en] effective. And when you also [snorts]
[00:17:42.600 | 4160 ms | en] have people that have visibility over
[00:17:44.320 | 3320 ms | en] the whole fleet of agents or learners,
[00:17:46.760 | 2880 ms | en] and they're [snorts] able to spot
[00:17:47.640 | 3200 ms | en] patterns and then kind of steer context,
[00:17:49.640 | 2440 ms | en] or let's say in this case the
[00:17:50.840 | 3800 ms | en] curriculum,
[00:17:52.080 | 4240 ms | en] uh that's also really effective. So,
[00:17:54.640 | 3560 ms | en] as always, we kind of look to the real
[00:17:56.320 | 4200 ms | en] world world to think about how to build
[00:17:58.200 | 4320 ms | en] these systems.
[00:18:00.520 | 3520 ms | en] Uh sorry, I also didn't touch on a final
[00:18:02.520 | 3400 ms | en] limitation, which is that memories go
[00:18:04.040 | 3840 ms | en] stale. So, you need something, some
[00:18:05.920 | 3160 ms | en] process that checks that
[00:18:07.880 | 3840 ms | en] everything that's written there is still
[00:18:09.080 | 2640 ms | en] correct.
[00:18:12.480 | 3560 ms | en] And so, we introduce this concept of
[00:18:14.880 | 3280 ms | en] dreaming,
[00:18:16.040 | 4080 ms | en] which is like a second o- second-order
[00:18:18.160 | 3080 ms | en] process over memory.
[00:18:20.120 | 3320 ms | en] So, if we think about how that's been
[00:18:21.240 | 4840 ms | en] constructed, we have the like actual
[00:18:23.440 | 4760 ms | en] context, which agents reference and is
[00:18:26.080 | 4600 ms | en] has useful information, the memory
[00:18:28.200 | 4280 ms | en] processes, which allow agents to kind of
[00:18:30.680 | 4680 ms | en] autonomously manage that context
[00:18:32.480 | 5400 ms | en] themselves, and then dreaming, which is
[00:18:35.360 | 4120 ms | en] a process that runs in batch and
[00:18:37.880 | 3680 ms | en] asynchronously
[00:18:39.480 | 4600 ms | en] with its own allocated resources to
[00:18:41.560 | 4720 ms | en] ensure that those memories themselves
[00:18:44.080 | 5760 ms | en] are effective, up-to-date, um and
[00:18:46.280 | 3560 ms | en] helping the agents learn over time.
[00:18:52.240 | 6200 ms | en] So, what does dreaming look like?
[00:18:55.800 | 5320 ms | en] Essentially, what we do
[00:18:58.440 | 6120 ms | en] is we take an existing memory store, so
[00:19:01.120 | 5640 ms | en] this is a collection of memories.
[00:19:04.560 | 4600 ms | en] We then take a bunch of sessions or
[00:19:06.760 | 5080 ms | en] transcripts from agent interactions over
[00:19:09.160 | 5200 ms | en] a period of time,
[00:19:11.840 | 4960 ms | en] and we give these together to an agent
[00:19:14.360 | 4560 ms | en] which reviews all of the transcripts,
[00:19:16.800 | 4400 ms | en] looks at the memory store, and starts to
[00:19:18.920 | 6600 ms | en] identify patterns for where there could
[00:19:21.200 | 4320 ms | en] be uplift in the memories.
[00:19:26.000 | 4800 ms | en] It then outputs a new memory store
[00:19:28.920 | 4040 ms | en] where there are proposed changes to the
[00:19:30.800 | 3760 ms | en] existing memory store.
[00:19:32.960 | 4520 ms | en] And what the agent is able to do, as I
[00:19:34.560 | 4640 ms | en] mentioned, is spend tokens on solving
[00:19:37.480 | 2840 ms | en] this problem of making agents learn
[00:19:39.200 | 3800 ms | en] better,
[00:19:40.320 | 4920 ms | en] identify patterns for where agents are
[00:19:43.000 | 4160 ms | en] consistently failing,
[00:19:45.240 | 4000 ms | en] and then propose changes for what might
[00:19:47.160 | 4080 ms | en] make a more effective memory store, such
[00:19:49.240 | 4200 ms | en] that next day when you run these agents
[00:19:51.240 | 4520 ms | en] again, they're actually feel smarter and
[00:19:53.440 | 4120 ms | en] they're running better.
[00:19:55.760 | 3200 ms | en] To go back to my analogy, just to paint
[00:19:57.560 | 3200 ms | en] some pictures of like what this could
[00:19:58.960 | 4720 ms | en] look like in practice.
[00:20:00.760 | 4720 ms | en] Let's imagine that the head teacher
[00:20:03.680 | 2880 ms | en] reviewing all these transcripts notices
[00:20:05.480 | 3160 ms | en] that
[00:20:06.560 | 3960 ms | en] every geography student has incorrectly
[00:20:08.640 | 3400 ms | en] answered a question. They're just all
[00:20:10.520 | 2960 ms | en] writing like complete garbage to this
[00:20:12.040 | 4040 ms | en] question.
[00:20:13.480 | 3720 ms | en] The teacher notices that actually, by
[00:20:16.080 | 2800 ms | en] kind of
[00:20:17.200 | 3800 ms | en] in this case, analyzing the memory
[00:20:18.880 | 3640 ms | en] store, that entire topic is missing from
[00:20:21.000 | 4360 ms | en] the curriculum. So, what the teacher is
[00:20:22.520 | 4560 ms | en] able to do is notice that pattern,
[00:20:25.360 | 3440 ms | en] look at the memory store, and suggest a
[00:20:27.080 | 3720 ms | en] new change to that curriculum such that
[00:20:28.800 | 3160 ms | en] the next day when these agents run, they
[00:20:30.800 | 3080 ms | en] now have that information that they
[00:20:31.960 | 3880 ms | en] needed.
[00:20:33.880 | 4520 ms | en] To give another example, the teacher
[00:20:35.840 | 4480 ms | en] might notice that um in a certain math
[00:20:38.400 | 4040 ms | en] exam, all of the answers are wrong in
[00:20:40.320 | 4120 ms | en] the same way. Uh all of the students are
[00:20:42.440 | 3840 ms | en] outputting radians when it's meant to be
[00:20:44.440 | 4120 ms | en] degrees. I don't know if anyone else in
[00:20:46.280 | 4880 ms | en] like GCSE maths had that problem, too.
[00:20:48.560 | 4120 ms | en] Uh but what they're able to do is give
[00:20:51.160 | 3280 ms | en] an instruction saying like this is how
[00:20:52.680 | 5000 ms | en] you should configure your calculators.
[00:20:54.440 | 5000 ms | en] And in the case of agents, that's like
[00:20:57.680 | 2720 ms | en] noticing in the transcripts that there's
[00:20:59.440 | 3480 ms | en] something wrong with the tool
[00:21:00.400 | 3760 ms | en] configuration. So, you might notice that
[00:21:02.920 | 2280 ms | en] something in the tool calls keeps
[00:21:04.160 | 3080 ms | en] failing.
[00:21:05.200 | 4280 ms | en] And what's important here is that when
[00:21:07.240 | 3520 ms | en] we look at those transcripts,
[00:21:09.480 | 2840 ms | en] we're not just looking at kind of the
[00:21:10.760 | 4080 ms | en] passes of like
[00:21:12.320 | 4680 ms | en] uh responses between agent and
[00:21:14.840 | 3480 ms | en] the system or the user. We're also
[00:21:17.000 | 3840 ms | en] really scrutinizing like those tool
[00:21:18.320 | 3760 ms | en] calls and all of the other metadata that
[00:21:20.840 | 3280 ms | en] is really central to the agent's
[00:21:22.080 | 4320 ms | en] performance.
[00:21:24.120 | 3560 ms | en] Finally, you could also notice something
[00:21:26.400 | 3560 ms | en] that's like fleet-wide or
[00:21:27.680 | 3880 ms | en] organization-wide. So, for example, like
[00:21:29.960 | 4360 ms | en] everybody's using too many m dashes and
[00:21:31.560 | 5320 ms | en] you don't like that. So, you want to
[00:21:34.320 | 4760 ms | en] add some organizational-wide
[00:21:36.880 | 3310 ms | en] um announcement or context change that
[00:21:39.080 | 1640 ms | en] says not to do that.
[00:21:40.190 | 2410 ms | en] >> [snorts]
[00:21:40.720 | 3000 ms | en] >> And so, I hope that paints a picture of
[00:21:42.600 | 2600 ms | en] like why this could be really, really
[00:21:43.720 | 5960 ms | en] effective.
[00:21:45.200 | 6840 ms | en] And now I'll just talk about how you
[00:21:49.680 | 4240 ms | en] would go about designing such a system
[00:21:52.040 | 3280 ms | en] in production.
[00:21:53.920 | 2720 ms | en] So,
[00:21:55.320 | 2720 ms | en] you have some concept of your memory
[00:21:56.640 | 3320 ms | en] store, which is a concept which is a
[00:21:58.040 | 3240 ms | en] collection of memories.
[00:21:59.960 | 3600 ms | en] Memories themselves might just be
[00:22:01.280 | 4080 ms | en] markdown files organized in this
[00:22:03.560 | 3240 ms | en] directory.
[00:22:05.360 | 4160 ms | en] You then take a number of the
[00:22:06.800 | 5680 ms | en] transcripts. And like I mentioned,
[00:22:09.520 | 4480 ms | en] that is a mixture of like the
[00:22:12.480 | 4240 ms | en] back-and-forth passes between the agents
[00:22:14.000 | 5440 ms | en] as well as metadata on tools, uh
[00:22:16.720 | 4360 ms | en] other skills they used, etc.
[00:22:19.440 | 3800 ms | en] And the way that we've designed it, we
[00:22:21.080 | 4520 ms | en] have the orchestrator deploy a fleet of
[00:22:23.240 | 4560 ms | en] sub-agents that go and analyze all those
[00:22:25.600 | 4280 ms | en] transcripts.
[00:22:27.800 | 4400 ms | en] And one point worth making here is that
[00:22:29.880 | 5280 ms | en] when you design these systems,
[00:22:32.200 | 5360 ms | en] you have the ability to steer how these
[00:22:35.160 | 4760 ms | en] agents, which both write and coordinate
[00:22:37.560 | 4200 ms | en] dreaming, go about the problem. And by
[00:22:39.920 | 4120 ms | en] steering, I mean that you're able to
[00:22:41.760 | 3640 ms | en] tell them like, "In your specific case,
[00:22:44.040 | 3000 ms | en] these are the kinds of things I think
[00:22:45.400 | 2720 ms | en] are important and relevant. These are
[00:22:47.040 | 2880 ms | en] the kinds of things that are not
[00:22:48.120 | 4200 ms | en] important and relevant." So, you do have
[00:22:49.920 | 4720 ms | en] the ability there to start to curate
[00:22:52.320 | 5760 ms | en] that memory and dreaming process
[00:22:54.640 | 5000 ms | en] to your organization specifically.
[00:22:58.080 | 3360 ms | en] And
[00:22:59.640 | 4040 ms | en] the orchestrator then reviews all of the
[00:23:01.440 | 5400 ms | en] responses from the sub-agents
[00:23:03.680 | 5760 ms | en] and it then decides like where there are
[00:23:06.840 | 5880 ms | en] prevalent enough patterns that it thinks
[00:23:09.440 | 5200 ms | en] this warrants a change in the memories.
[00:23:12.720 | 4520 ms | en] From there, it proposes individual
[00:23:14.640 | 3920 ms | en] changes to the memory store.
[00:23:17.240 | 3880 ms | en] And in our case, the way that we design
[00:23:18.560 | 4040 ms | en] this in production is
[00:23:21.120 | 3680 ms | en] the agent will additionally give you
[00:23:22.600 | 4000 ms | en] examples of transcripts where it's
[00:23:24.800 | 3920 ms | en] noticed this pattern has happened and
[00:23:26.600 | 3760 ms | en] also some stats on like how prevalent
[00:23:28.720 | 5880 ms | en] this issue is and why this warrants
[00:23:30.360 | 4240 ms | en] actually updating uh the memory store.
[00:23:35.160 | 3840 ms | en] And so all of this works really neatly.
[00:23:36.920 | 3640 ms | en] You get this output and you as the
[00:23:39.000 | 4280 ms | en] individual
[00:23:40.560 | 4720 ms | en] can decide where you want to accept
[00:23:43.280 | 4480 ms | en] changes to the memory, um where you want
[00:23:45.280 | 5600 ms | en] to reject them, etc.
[00:23:47.760 | 3120 ms | en] And this works really effectively.
[00:23:52.200 | 3680 ms | en] So together
[00:23:54.000 | 4440 ms | en] we have these two processes that run in
[00:23:55.880 | 2560 ms | en] parallel.
[00:23:58.480 | 3600 ms | en] The first is memory
[00:24:00.240 | 5760 ms | en] and these
[00:24:02.080 | 6200 ms | en] agents are using some of their uh
[00:24:06.000 | 4040 ms | en] like in-band contacts and in-band
[00:24:08.280 | 3920 ms | en] resources to write to memory where they
[00:24:10.040 | 4600 ms | en] think it's important. And this is neat
[00:24:12.200 | 4840 ms | en] because it means that in the actual next
[00:24:14.640 | 3960 ms | en] run, the next session, that agent will
[00:24:17.040 | 3520 ms | en] be better. So there's a shorter time to
[00:24:18.600 | 3840 ms | en] kind of seeing that change.
[00:24:20.560 | 3560 ms | en] But inherently these agents have
[00:24:22.440 | 3760 ms | en] competing resources when they think
[00:24:24.120 | 4800 ms | en] about what to dedicate to memory, what
[00:24:26.200 | 5520 ms | en] to dedicate to um completing the task,
[00:24:28.920 | 5640 ms | en] and additionally a lack of visibility.
[00:24:31.720 | 5240 ms | en] So on the other side, we have dreaming
[00:24:34.560 | 4760 ms | en] which is this out-of-band process.
[00:24:36.960 | 3920 ms | en] And this allows, again
[00:24:39.320 | 3200 ms | en] broader visibility and dedicated
[00:24:40.880 | 3520 ms | en] capacity
[00:24:42.520 | 4080 ms | en] i.e. token spend which is specifically
[00:24:44.400 | 4080 ms | en] directed towards helping agents learn
[00:24:46.600 | 3760 ms | en] better.
[00:24:48.480 | 2972 ms | en] And you might think okay, that sounds
[00:24:50.360 | 1320 ms | en] really expensive.
[00:24:51.452 | 1548 ms | en] >> [laughter]
[00:24:51.680 | 3080 ms | en] >> Why would I want to chuck extra
[00:24:53.000 | 3160 ms | en] resources at this?
[00:24:54.760 | 3240 ms | en] But if we kind of go back to the
[00:24:56.160 | 3960 ms | en] improvements we saw when you build
[00:24:58.000 | 4680 ms | en] effective memory stores, actually you
[00:25:00.120 | 4880 ms | en] can see a bunch of costs go down
[00:25:02.680 | 4160 ms | en] because um agents are able to one-shot
[00:25:05.000 | 3680 ms | en] things more effectively. Uh they have
[00:25:06.840 | 5760 ms | en] more information that they need
[00:25:08.680 | 3920 ms | en] in order to uh perform a task well.
[00:25:14.120 | 3480 ms | en] So, to summarize,
[00:25:18.760 | 4720 ms | en] at the very least, do the simple thing
[00:25:20.600 | 5080 ms | en] that works. Context management uh makes
[00:25:23.480 | 4240 ms | en] such a huge difference to your agent
[00:25:25.680 | 3840 ms | en] performance.
[00:25:27.720 | 4480 ms | en] Implementing things like a Claude MD
[00:25:29.520 | 4720 ms | en] file, like skills, which I'm sure you've
[00:25:32.200 | 3560 ms | en] heard about a bunch, and allowing agents
[00:25:34.240 | 3960 ms | en] to autonomously manage these systems
[00:25:35.760 | 3960 ms | en] themselves goes a really long way.
[00:25:38.200 | 4880 ms | en] Once you think about scaling those
[00:25:39.720 | 5680 ms | en] things into architectures with many
[00:25:43.080 | 4920 ms | en] agents, agents that run over a very long
[00:25:45.400 | 2600 ms | en] time,
[00:25:48.040 | 3880 ms | en] situations where you will like continue
[00:25:50.080 | 4480 ms | en] to work and develop on a workspace or
[00:25:51.920 | 5040 ms | en] code base over a long period of time,
[00:25:54.560 | 4000 ms | en] or very complex domains,
[00:25:56.960 | 3440 ms | en] you should start thinking about adding
[00:25:58.560 | 3280 ms | en] some features or some guardrails that
[00:26:00.400 | 3440 ms | en] allow those agents to manage their
[00:26:01.840 | 5520 ms | en] memory in a way that is safe,
[00:26:03.840 | 3520 ms | en] verifiable, auditable.
[00:26:08.040 | 4400 ms | en] I should also say here
[00:26:09.840 | 3720 ms | en] that whilst this kind of
[00:26:12.440 | 3240 ms | en] these kinds of practices are really
[00:26:13.560 | 4520 ms | en] effective when it comes to coding tasks,
[00:26:15.680 | 4240 ms | en] for example, this by no means is just
[00:26:18.080 | 3640 ms | en] specific to coding. Like I use memory
[00:26:19.920 | 3760 ms | en] all the time when I'm producing
[00:26:21.720 | 3320 ms | en] presentations that has context on like
[00:26:23.680 | 3360 ms | en] how I like to write things, how I like
[00:26:25.040 | 3600 ms | en] my slides, etc., etc., and that develops
[00:26:27.040 | 3400 ms | en] over time. So, this is really not coding
[00:26:28.640 | 3320 ms | en] specific.
[00:26:30.440 | 2880 ms | en] The final thing
[00:26:31.960 | 2720 ms | en] is
[00:26:33.320 | 2560 ms | en] if you really want to kind of like close
[00:26:34.680 | 3000 ms | en] the loop here,
[00:26:35.880 | 4240 ms | en] think about adding an additional
[00:26:37.680 | 4920 ms | en] out-of-band process, like dreaming, as
[00:26:40.120 | 3920 ms | en] we call it, to consolidate your memory
[00:26:42.600 | 3240 ms | en] and
[00:26:44.040 | 3720 ms | en] cut things that are no longer relevant,
[00:26:45.840 | 6000 ms | en] add things that agents are missing, and
[00:26:47.760 | 4080 ms | en] clean up and organize memory systems.
[00:26:52.520 | 4160 ms | en] So, to close,
[00:26:54.040 | 4320 ms | en] I want to say that this journey that
[00:26:56.680 | 3960 ms | en] we've been on with Context Engineering,
[00:26:58.360 | 4000 ms | en] a lot of this stuff has only happened in
[00:27:00.640 | 3400 ms | en] this past year.
[00:27:02.360 | 4000 ms | en] This is very much an open area of
[00:27:04.040 | 4640 ms | en] research and development, and one which
[00:27:06.360 | 4240 ms | en] we see huge value in the future.
[00:27:08.680 | 3600 ms | en] So we're so excited to see the kinds of
[00:27:10.600 | 3640 ms | en] things and contributions that you'll all
[00:27:12.280 | 4040 ms | en] make to this space. So I encourage you
[00:27:14.240 | 3280 ms | en] to keep thinking, keep learning, and
[00:27:16.320 | 3720 ms | en] keep dreaming.
[00:27:17.520 | 2520 ms | en] Thank you.
[00:27:20.138 | 2020 ms | en] >> [applause]
[00:27:24.280 | 4480 ms | en] >> Wonderful.
[00:27:26.080 | 4440 ms | en] Thank you, Lamis. That was great.
[00:27:28.760 | 4120 ms | en] Uh do we have any questions in the room?
[00:27:30.520 | 4880 ms | en] Oh golly gosh. I'll dive straight here
[00:27:32.880 | 5360 ms | en] first.
[00:27:35.400 | 5760 ms | en] >> Thank you. Thanks for the presentation.
[00:27:38.240 | 5080 ms | en] Um do you have any memory store
[00:27:41.160 | 3520 ms | en] implementation that you would like to
[00:27:43.320 | 2120 ms | en] suggest?
[00:27:44.680 | 1040 ms | en] >> Papers
[00:27:45.440 | 2960 ms | en] or papers?
[00:27:45.720 | 3840 ms | en] >> memory storage implementation that you
[00:27:48.400 | 3040 ms | en] would like us
[00:27:49.560 | 2920 ms | en] >> Sorry, you said papers or No.
[00:27:51.440 | 1840 ms | en] >> Any memory memory storage
[00:27:52.480 | 2040 ms | en] implementation.
[00:27:53.280 | 3120 ms | en] >> Oh, okay. Okay. That we like
[00:27:54.520 | 5400 ms | en] >> like to suggest.
[00:27:56.400 | 3520 ms | en] >> To solve what problem specifically?
[00:28:00.000 | 4320 ms | en] >> Well, one thing is put things in files
[00:28:02.360 | 4760 ms | en] that I have on my laptop. Yeah. But I
[00:28:04.320 | 6640 ms | en] think I'm looking to something more
[00:28:07.120 | 5800 ms | en] enterprisy. So what kind of solution do
[00:28:10.960 | 4160 ms | en] you suggest over there?
[00:28:12.920 | 3560 ms | en] >> Okay. Yeah. So I mean, maybe I was kind
[00:28:15.120 | 3480 ms | en] of coy in the talk because we're not
[00:28:16.480 | 5229 ms | en] allowed to make product call to actions.
[00:28:18.600 | 4560 ms | en] But given that you asked, um
[00:28:21.709 | 4051 ms | en] >> [laughter]
[00:28:23.160 | 5880 ms | en] >> we have uh a lot of this references the
[00:28:25.760 | 4160 ms | en] architecture that we used in our memory
[00:28:29.040 | 2760 ms | en] uh
[00:28:29.920 | 4160 ms | en] our memory infrastructure for our
[00:28:31.800 | 3560 ms | en] managed agent solutions. And so when I
[00:28:34.080 | 4240 ms | en] talk about these things about
[00:28:35.360 | 4520 ms | en] productionizing um memory, so everything
[00:28:38.320 | 2320 ms | en] like versioning
[00:28:39.880 | 2520 ms | en] uh
[00:28:40.640 | 3600 ms | en] hashing, etc., that's all available
[00:28:42.400 | 4520 ms | en] within our memory and dreaming API
[00:28:44.240 | 4280 ms | en] through Cloud Managed Agents. So if you
[00:28:46.920 | 2800 ms | en] did want an out-of-box solution for this
[00:28:48.520 | 3760 ms | en] kind of thing, that is where I would
[00:28:49.720 | 2560 ms | en] point you to.
[00:28:52.494 | 2266 ms | en] >> [snorts]
[00:28:53.040 | 2400 ms | en] >> Um hi.
[00:28:54.760 | 1800 ms | en] Uh
[00:28:55.440 | 2600 ms | en] the
[00:28:56.560 | 3200 ms | en] earlier on you talked about guardrails
[00:28:58.040 | 3840 ms | en] and permissions.
[00:28:59.760 | 3920 ms | en] Um and I think sure most of us have
[00:29:01.880 | 3760 ms | en] probably read the Cloud Code leak and
[00:29:03.680 | 3440 ms | en] the memory stuff. The dreaming stuff was
[00:29:05.640 | 2480 ms | en] definitely some of the most interesting
[00:29:07.120 | 3400 ms | en] in it.
[00:29:08.120 | 4240 ms | en] But [gasps] how do you scale that
[00:29:10.520 | 4240 ms | en] enterprise if you've got hundreds of
[00:29:12.360 | 4240 ms | en] users with different permission sets?
[00:29:14.760 | 3440 ms | en] How do you make sure dreaming follows
[00:29:16.600 | 2840 ms | en] those same
[00:29:18.200 | 3240 ms | en] guardrails?
[00:29:19.440 | 4360 ms | en] If it's happening out of band and the
[00:29:21.440 | 4480 ms | en] context is different compared to say the
[00:29:23.800 | 4920 ms | en] context the agent might have when a user
[00:29:25.920 | 2800 ms | en] is using it.
[00:29:28.960 | 5000 ms | en] >> So, just to check that I understand, um
[00:29:31.760 | 3760 ms | en] we have like some permissioning about
[00:29:33.960 | 4200 ms | en] what agents can access like in terms of
[00:29:35.520 | 4040 ms | en] memory. And then a separate like
[00:29:38.160 | 3920 ms | en] Yeah, so I mean I think this these
[00:29:39.560 | 4400 ms | en] things compose quite well, um
[00:29:42.080 | 3240 ms | en] because when you set up a dreaming
[00:29:43.960 | 3080 ms | en] procedure,
[00:29:45.320 | 4280 ms | en] you decide exactly which session
[00:29:47.040 | 4160 ms | en] transcripts to attach. And so, you could
[00:29:49.600 | 4720 ms | en] build a process which mirrors whatever
[00:29:51.200 | 5400 ms | en] permissioning you have on the agents. Um
[00:29:54.320 | 3720 ms | en] so, yeah. I mean, if
[00:29:56.600 | 2920 ms | en] that's to say that it's not the case
[00:29:58.040 | 2920 ms | en] that when you kind of trigger a dreaming
[00:29:59.520 | 3280 ms | en] job, it just takes like everything in a
[00:30:00.960 | 4120 ms | en] certain time period. You can configure
[00:30:02.800 | 4200 ms | en] it that way, but you can also just
[00:30:05.080 | 4240 ms | en] search over whichever transcripts have
[00:30:07.000 | 3880 ms | en] the same permission set as like
[00:30:09.320 | 2720 ms | en] whatever your memory store is and then
[00:30:10.880 | 3680 ms | en] make sure that that matches, if that
[00:30:12.040 | 2520 ms | en] makes sense.
[00:30:16.200 | 3840 ms | en] >> Hi. Thank you. This was really, really
[00:30:17.880 | 3520 ms | en] interesting. I I found it fascinating
[00:30:20.040 | 2840 ms | en] earlier when you were mentioning about
[00:30:21.400 | 2680 ms | en] like versioning, concurrency,
[00:30:22.880 | 3160 ms | en] durability, all of these all these
[00:30:24.080 | 4320 ms | en] things. At what point are we like
[00:30:26.040 | 5080 ms | en] reinventing databases from like first
[00:30:28.400 | 3001 ms | en] principles again?
[00:30:31.120 | 2040 ms | en] >> Um
[00:30:31.401 | 3159 ms | en] >> [snorts]
[00:30:33.160 | 2880 ms | en] >> yeah, this is this is an interesting
[00:30:34.560 | 3560 ms | en] point.
[00:30:36.040 | 4360 ms | en] I still think
[00:30:38.120 | 3800 ms | en] like one of the things that
[00:30:40.400 | 4600 ms | en] I think and I I this is a good reminder
[00:30:41.920 | 4920 ms | en] for me that something I didn't say. Um
[00:30:45.000 | 3600 ms | en] What we're trying to do here is like
[00:30:46.840 | 4000 ms | en] thread the needle like sorry, find the
[00:30:48.600 | 3640 ms | en] right boundary to draw between
[00:30:50.840 | 3280 ms | en] kind of letting these agents
[00:30:52.240 | 3560 ms | en] autonomously act and then also like
[00:30:54.120 | 3560 ms | en] which things should just be kind of
[00:30:55.800 | 3960 ms | en] programmatic um
[00:30:57.680 | 3200 ms | en] things that are baked into the harness.
[00:30:59.760 | 2960 ms | en] And so I think what you allude to is
[00:31:00.880 | 2960 ms | en] like
[00:31:02.720 | 2880 ms | en] first of all, we were just kind of like
[00:31:03.840 | 2920 ms | en] letting these agents write in markdown
[00:31:05.600 | 3200 ms | en] files and just like commit whatever they
[00:31:06.760 | 3440 ms | en] wanted and now we're kind of seeing
[00:31:08.800 | 2640 ms | en] having seen which primitives work really
[00:31:10.200 | 3000 ms | en] well, we're thinking about like kind of
[00:31:11.440 | 3480 ms | en] codifying that in the harness. And so
[00:31:13.200 | 3200 ms | en] when we think about like the hashing or
[00:31:14.920 | 2880 ms | en] the versioning, yeah, we are kind of
[00:31:16.400 | 2760 ms | en] going back to the software engineering
[00:31:17.800 | 3600 ms | en] principles that we've seen work well in
[00:31:19.160 | 5320 ms | en] the past but in a way that kind of
[00:31:21.400 | 5080 ms | en] autonomous agents can act and like
[00:31:24.480 | 4160 ms | en] uh can in can interact with those really
[00:31:26.480 | 4760 ms | en] effectively. So I think
[00:31:28.640 | 4160 ms | en] to to some extent like we sort of arm
[00:31:31.240 | 3240 ms | en] merging back into those practices but
[00:31:32.800 | 2800 ms | en] that's because we have enough signal now
[00:31:34.480 | 3400 ms | en] to know that those things should just be
[00:31:35.600 | 3800 ms | en] done in a very deterministic way and
[00:31:37.880 | 4080 ms | en] there's no need to reinvent the wheel. I
[00:31:39.400 | 3160 ms | en] hope that answered your question.
[00:31:41.960 | 2720 ms | en] Perfect.
[00:31:42.560 | 3520 ms | en] >> We're absolutely out of time. Thank you
[00:31:44.680 | 4800 ms | en] once again. Big round of applause for
[00:31:46.080 | 3400 ms | en] Lamis. Thank you.
[00:31:54.586 | 2020 ms | en] >> [music]
<!-- TRANSCRIPT_CUES_END -->
