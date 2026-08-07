---
id: article-2026-07-15-these-90-minutes-will-change-the-way-you-use-ai
type: source
title: "These 90 Minutes Will Change the Way You Use AI"
path: raw/articles/user-provided/2026-07-15-these-90-minutes-will-change-the-way-you-use-ai.md
author: Caleb Curry
publisher: Caleb Curry / YouTube
url: https://www.youtube.com/watch?v=vLWSIGxpfYA
date_published: 2026-07-15
date_added: 2026-07-28
tags: [claude-code, agentic-coding, deterministic-gates, linting, verification, hooks, subagents, sandboxing, repo-local-knowledge, workflows]
status: active
quality: medium
summary: Caleb Curry's practitioner walkthrough argues that reliable agentic coding comes from promoting recurring instructions into architectural invariants, scripts, lint rules, tests, hooks, and scoped verification while keeping secrets and production authority outside autonomous agent environments.
related: [claude-code, agent-harnesses, workflows, internal-engineering-conventions, repo-local-knowledge-bases, multi-agent-systems, agent-security]
---

# These 90 Minutes Will Change the Way You Use AI

## Source Metadata

- Path: raw/articles/user-provided/2026-07-15-these-90-minutes-will-change-the-way-you-use-ai.md
- Local transcript: `/Users/josemanuelcerqueira/.codex/attachments/135ae8cc-01c0-435a-aa19-e8d22189cd48/pasted-text.txt`
- Local transcript SHA-256: `425f5e19be9f858ff92372c214e37eb21a4d0f7f17b66dec1c54bc4368ee4184`
- Author / channel: Caleb Curry
- Published: 2026-07-15
- Publisher: YouTube
- URL: https://www.youtube.com/watch?v=vLWSIGxpfYA
- Runtime reported by YouTube: 1:28:43
- Metadata verification: YouTube oEmbed returned the title and channel; the video page returned the publish timestamp and runtime on 2026-07-28.
- Evidence boundary: this is a first-person practitioner account with concrete implementation examples, not a controlled evaluation. Claims about quality, token savings, file-size thresholds, monitoring effectiveness, and multi-agent productivity are directional unless independently measured.
- Transcript note: the supplied timed transcript contains automated-transcription errors such as "Cloud Code," "claw.md," and "Aentic"; the source text is preserved exactly, while the extracted sections normalize obvious terms such as Claude Code, `CLAUDE.md`, and agentic.
- Reading boundary: the analytical sections of this note end at `## Related` (about 17 KB). Everything below `## Source Text` is the unedited 86 KB archival transcript. Read to `## Related` for the synthesis and verdicts; open the transcript only to check a specific quotation or timestamp.
- Canonical cross-check: [[2026-07-28-deterministic-gates-for-agentic-coding-workflows]] holds the maintained primary-source ledger. The table below is the per-claim verdict index for this source and uses a fixed verdict vocabulary: **Corroborated**, **Corroborated with caveat**, **Partially supported**, **Unverified**, **Rejected**.

## TL;DR

The video is not an authority. After cross-checking its material claims against current Claude Code documentation, Anthropic engineering sources, TypeScript, ESLint, PostgreSQL, Git, MCP, and OpenTelemetry, one compact rule survives with strong support: do not ask a non-deterministic model to repeatedly remember what software can enforce. Start with concise instructions, but move must-hold behavior into permissions, sandboxing, architecture, types, schemas, lint, tests, scripts, or deterministic command hooks. Run cheap deterministic checks first; use a scoped model verifier only for residual judgment; reserve human attention for high-consequence decisions and final product quality.

Ratcheted legacy gates, synchronization checks, specification-first multi-agent work, and state-complete visual prototypes remain plausible practitioner tactics that require local evidence; the primary sources do not establish them as universal best practices. Fixed 500/1,000-line limits, claimed token savings, large agent hierarchies, self-improving vaults, and model-based production monitoring are unverified. Passing browser cookies or ambient API keys to an agent and using bypassed permissions outside strict isolation should be rejected.

One claim in the video is factually wrong against current documentation: bypassed permissions do **not** ignore allow/deny rules. Deny rules and explicit ask rules apply in every permission mode, including `bypassPermissions`; only allow rules go inert. The hook advice built on that premise is still useful, but its stated justification is false.

## Key Claims

- LLMs are most valuable for ambiguous judgment; deterministic requirements should move into code or tooling when possible.
- Repository instruction files are useful for guidance and routing, but they are not reliable enforcement mechanisms.
- Recurring instructions should be promoted into architectural invariants, types, schemas, lint rules, scripts, tests, hooks, or other deterministic gates.
- Cheap deterministic checks should run before a model verifier so the verifier can focus on code smell, design fit, and other judgment-heavy residuals.
- Legacy projects can adopt stricter rules through a ratchet: record the current violation count, block increases, then reduce the baseline over time.
- Cross-artifact drift can be checked mechanically when API definitions, documentation, environment variables, authentication, validation, or generated interfaces must change together.
- A root `CLAUDE.md` should route the agent to scoped component, service, security, product, migration, or feature documents instead of containing the entire project.
- Skills are appropriate for reusable procedures loaded into the current task; subagents are appropriate for isolated work whose context can be compressed into a bounded result.
- Multi-agent work needs one specification as the authority, a coordinator, bounded roles, escalation thresholds, and a verifier/challenger; otherwise it becomes expensive agent bureaucracy.
- Allow/deny command rules help guide an agent away from recurring mistakes but are not a security boundary against malicious or injected behavior.
- Autonomous sessions should run in environments that cannot reach production credentials, unrelated databases, GitHub authority, or other sensitive services.
- UI flows can be prototyped as state-complete HTML/CSS/JavaScript artifacts before backend integration so visual and interaction decisions become a clearer implementation specification.
- Hooks can place deterministic scripts at lifecycle boundaries such as before tool use or at the end of an agent turn.
- Fresh-context pull-request review can reduce the bias of asking the implementation context to grade its own work.
- Human review effort should increase with the consequence and reversibility of the code or operation.

## Important Details

### Primary-source cross-check (2026-07-28)

| Video claim or pattern | Verdict | Cross-check |
| --- | --- | --- |
| `CLAUDE.md` guides but does not enforce behavior | **Corroborated** | Current [Claude Code memory docs](https://code.claude.com/docs/en/memory) explicitly say `CLAUDE.md` is context rather than enforced configuration and recommend permissions or hooks when a guarantee is required. |
| Deterministic lifecycle hooks should enforce must-run checks | **Corroborated with caveat** | The [feature overview](https://code.claude.com/docs/en/features-overview) says a hook "always fires on its event; the trigger is guaranteed" and recommends hooks for linting and unsafe-command blocking. The [hooks reference](https://code.claude.com/docs/en/hooks) states that agent hooks are experimental and that production workflows should "prefer command hooks." Determinism covers the trigger, not the outcome: hooks may also be HTTP, prompt, or agent type, and hook decisions never override deny or ask rules. |
| Skills load reusable content; subagents isolate context | **Corroborated** | The current [feature comparison](https://code.claude.com/docs/en/features-overview) describes skills as reusable content loaded into a context and subagents as isolated workers whose summary returns to the parent. The binary is now softer than the video draws it: a skill can run in isolated context with `context: fork`, and a subagent can preload skills through its `skills:` field. |
| Permission deny rules and sandboxing are different layers | **Corroborated** | The [permissions docs](https://code.claude.com/docs/en/permissions) call them complementary: permissions govern tools/resources; sandboxing provides OS-level enforcement for Bash and child processes. Read and Edit deny rules do not reach arbitrary subprocesses, and the [sandbox docs](https://code.claude.com/docs/en/sandboxing) state that sandboxing "reduces risk but is not a complete isolation boundary." |
| Bypassed permissions can be safe when isolated | **Corroborated with caveat** | The [permission-mode docs](https://code.claude.com/docs/en/permission-modes) say bypass mode offers no prompt-injection or unintended-action protection and should be used only in isolated containers/VMs/dev containers without internet access that cannot damage the host. The [sandbox docs](https://code.claude.com/docs/en/sandboxing) also warn that sandbox startup fails open by default unless `sandbox.failIfUnavailable` is enabled. |
| Bypassed permissions ignore allow/deny rules, so hooks are the only remaining restriction | **Rejected** | Factually wrong against current docs. [Permission modes](https://code.claude.com/docs/en/permission-modes) state that deny rules and explicit ask rules apply in every mode, including `bypassPermissions`, alongside org-`ask` connector tools, MCP tools marked `requiresUserInteraction`, and a root/home-directory removal circuit breaker. Only *allow* rules become inert, because everything else is already approved. `PreToolUse` hooks are still a valid restriction layer, but the video's stated reason for needing them does not hold. |
| Strict TypeScript and custom lint rules can encode checks | **Partially supported** | TypeScript says [`strict`](https://www.typescriptlang.org/tsconfig/strict) enables stronger correctness guarantees; ESLint documents [custom rules](https://eslint.org/docs/latest/extend/custom-rules). The capability holds; neither source validates the video's broad productivity or AI-code-quality claims. |
| Application adapters can enforce tenant scoping | **Partially supported** | PostgreSQL [row security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) can enforce per-row policies and default deny at the database layer. An app adapter may improve correctness but is not equivalent to a database-enforced tenant boundary, so this is not sufficient as a security conclusion. |
| Map API endpoints one-to-one into MCP tools | **Rejected** | Rejected as a design default. MCP confirms the server/tool model, but Anthropic's [tool-design guidance](https://www.anthropic.com/engineering/writing-tools-for-agents) names tools that "merely wrap existing software functionality or API endpoints" as a common error, warns that overlapping or vague tools confuse agents, and recommends task-shaped boundaries plus empirical evaluation. Endpoint mirroring is at most a quick scaffold. |
| Multi-agent bundles improve complex feature delivery | **Partially supported** | Anthropic's [multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system) supports parallel isolated contexts and an orchestrator-worker shape, while noting coordination, evaluation, reliability, and token-cost challenges. That report also supplies direct counter-evidence for the coding case: it measured multi-agent runs at roughly 15× the tokens of chat (research agents ~4×) and states that "most coding tasks involve fewer truly parallelizable tasks than research." Both figures are specific to that report's system and workload, not universal constants. |
| Worktrees can isolate parallel branches | **Partially supported** | Git's [worktree manual](https://git-scm.com/docs/git-worktree.html) confirms multiple working trees and branches; the mechanism holds but it does not establish productivity or merge-quality gains for multiple coding agents. |
| Model reasoning over production logs is a layer above observability | **Unverified** | OpenTelemetry's [GenAI conventions](https://opentelemetry.io/docs/specs/semconv/registry/attributes/gen-ai/) standardize correlated traces and warn that tool arguments/results may be sensitive. They do not establish that model triage can replace alerts, runbooks, incident thresholds, or human authority, so the video's framing is also overstated. |
| 500–1,000-line limits, drastic token savings, self-learning vault gains | **Unverified** | Unsupported by the checked primary sources. Treat these as hypotheses to test against local defect rate, task success, context use, false positives, and maintenance cost. |
| Pass browser cookies or ambient API keys to an agent | **Rejected** | Rejected as a default. This conflicts with least-privilege, scoped-credential, audit, and isolation guidance in [[2026-05-27-zero-trust-for-ai-agents]] and current Claude Code security documentation. |

### Practitioner implementation details

- The multi-tenant example moves tenant scoping into a database adapter so a query cannot simply forget the tenant predicate.
- Suggested deterministic checks include strict TypeScript, no `any`, file-size limits, no browser alerts or stray console logging, API/docs synchronization, endpoint authentication and validation, server/client import boundaries, and environment-variable completeness.
- The proposed ratchet accepts existing violations but fails a change that increases them. This is more actionable for a legacy project than requiring an immediate clean slate.
- The verifier example checks changed code against opinionated rules such as N+1 query risks after mechanically checkable rules have been removed from its scope.
- The repo vault includes component catalogs, service and security pages, operational notes, feature specifications, migrations, checklists, and architecture decisions.
- The multi-agent bundle uses planner, implementer, tester, and verifier/challenger roles under a coordinator, with questions escalated to the human when they exceed an importance threshold.
- The MCP discussion correctly distinguishes a user-facing in-product AI feature from an external agent tool surface, but the one-endpoint-to-one-tool mapping is presented as a quick starting point rather than an ideal final interface.
- The permissions section distinguishes command-deny ergonomics from stronger container isolation, although its broader bypass-permissions posture should be treated cautiously.
- The prototype example exposes all important payment-flow states through local controls before connecting real accounts, APIs, or purchase state.
- The operations section proposes model-assisted log analysis and monitoring, but it does not specify evaluation thresholds, false-positive handling, incident authority, or rollback policy.
- The final operating model uses multiple focused sessions, frequent commits, disjoint work areas or worktrees, clean-context review, and more human attention for sensitive code.

## Entities

- Caleb Curry
- Claude Code
- Codex
- `CLAUDE.md`
- Obsidian
- MCP
- OpenAPI
- TypeScript
- ESLint
- Prettier
- Playwright
- PostgreSQL
- Docker
- GitHub
- React
- Course Catalyst
- Skills
- Subagents
- Hooks
- Verifier / challenger agent

## My Notes

- The best new concept is not "use more lint." It is an instruction-to-gate promotion loop: observe repeated failure, classify whether it can be made deterministic, encode the narrowest enforceable invariant, ratchet legacy debt, then leave only irreducible judgment to model or human review.
- The cross-check supports the promotion loop only through the instruction-versus-enforcement distinction. Ratcheting is a provisional migration tactic from this practitioner source, not an independently established rule.
- The source usefully joins architecture and agent workflow design. Tenant scoping in an adapter is stronger than a prompt, while synchronization checks make documentation and configuration drift visible.
- For tenant isolation, PostgreSQL row-level security or an equivalent database policy is a stronger boundary than an application adapter alone.
- The repo-vault guidance aligns with [[repo-local-knowledge-bases]], but "self-learning" should mean reviewable, versioned updates—not silent agent-written project truth.
- The orchestration bundle reinforces [[multi-agent-systems]] only with strong limits: the specification is the authority, roles are bounded, and multi-agent breadth is justified only when it beats the coordination and review cost.
- The security section gets one crucial point right: deny rules are guidance, not containment. Whole-process isolation and keeping secrets outside the environment are the real boundary.
- It gets one mechanism wrong. The video argues hooks are needed under bypassed permissions because bypass "ignores" the built-in allow and deny rules. Current documentation says deny and explicit ask rules survive every mode, including `bypassPermissions`, and that only allow rules become inert there. Prefer the accurate framing: deny rules survive bypass but are still evaluated pre-execution against a command string, so they remain guidance; `PreToolUse` hooks add a programmable check, and OS-level isolation is what actually contains a compromised session.
- The "bundle with a sub-orchestrator" pattern is best read as an approximation of two different documented surfaces. Subagents are isolated workers inside one session that return a summary to the caller. Agent teams are separate Claude Code sessions with peer-to-peer messaging and a shared task list, at higher token cost, and they remain experimental and disabled by default. The video's bundles sit closer to agent teams than to plain subagents, so its cost and coordination observations should be mapped onto the team surface rather than treated as subagent behavior.
- The self-learning vault now has a shipped counterpart worth contrasting rather than adopting wholesale: Claude Code auto memory writes machine-local markdown under `~/.claude/projects/<project>/memory/`, loads a bounded index each session, and is auditable and editable through `/memory`. That is the reviewable version of the idea. It does not validate the video's claimed quality gains, and it is machine-local rather than a shared repo artifact, so it is not a substitute for versioned repo knowledge.
- Passing browser cookies or ambient API keys to an agent should not be normalized. Prefer scoped connectors, short-lived credentials, brokers, explicit approvals, and auditable tool schemas.
- Model-assisted monitoring is a plausible triage layer, not a replacement for deterministic alerts, correlated telemetry, runbooks, or human incident authority.
- Fixed 500- or 1,000-line thresholds are personal heuristics, not universal architecture rules. The durable rule is to identify files or modules whose size correlates with observed change risk, then validate the threshold locally.

## Open Questions

- Which recurring failures in this repository still live only in prose and have enough evidence to justify a new deterministic gate?
- How should a ratcheted gate store and review its baseline so teams cannot quietly normalize new debt?
- Which cross-file relationships should be generated from one source of truth instead of merely checked for synchronization?
- What representative tasks and tail-risk cases show that a verifier agent adds value beyond existing lint, tests, and human review?
- What is the maximum useful multi-agent breadth before coordinator and reviewer throughput dominate?
- Which Claude Code hooks and sandbox guarantees are stable in the currently deployed product version?
- How should model-assisted production monitoring be evaluated for precision, recall, latency, escalation quality, and rollback safety?

## Related

- [[claude-code]]
- [[agent-harnesses]]
- [[workflows]]
- [[internal-engineering-conventions]]
- [[repo-local-knowledge-bases]]
- [[multi-agent-systems]]
- [[agent-security]]
- [[2026-07-28-deterministic-gates-for-agentic-coding-workflows]]
- [[2024-12-19-building-effective-agents]]
- [[2025-04-18-claude-code-best-practices-for-agentic-coding]]
- [[2025-09-11-writing-effective-tools-for-agents-with-agents]]
- [[2025-06-13-how-we-built-our-multi-agent-research-system]]
- [[2026-03-25-claude-code-auto-mode]]
- [[2025-10-20-beyond-permission-prompts-making-claude-code-more-secure-and-autonomous]]
- [[2026-07-25-opentelemetry-generative-ai-semantic-conventions]]

## Source Text

Hey, what's going on? For those of you who don't know me, I'm Caleb and I have been in software engineering for like 10, 15 years, creating content here
0:07
about software programming and I have been using Cloud Code for the last 6 months. Throughout this entire time, I
0:14
have been building my own software and I'm going to teach you exactly what I learned to get a much better result from
0:22
Claude Code. And this is going to apply for many other AI tools. I kind of think of it like this.
0:31
If this is time and this is, you know, how happy you are with AI, you start off and you're like,
0:38
wow, this stuff's amazing. And then as your project gets any level of complexity, you get to the point where
0:44
you're just like, this AI stuff is garbage. I don't ever want to use it again. And I actually had that happen
0:51
where I was a few months in, I stopped using AI and was doing everything by hand. But even throughout this whole
0:57
journey, I was learning and figuring out how to get AI to work better. And then ultimately, I got to the point where I
1:03
was using these tools the way they're supposed to be used to get good results. So, I started off pretty happy being
1:08
able to generate some prototypes. Then any level of complexity caused a million bugs to show up, no consistency across
1:15
the project. Then I was able to fix all of these problems and now I'm happy again.
1:22
I also think a skill is how involved you want to be with that code because there's some trade-offs. If you're going
1:28
too heavy with claude code, you're basically vibe coding. You're going to most likely get a result that you have
1:34
less understanding of, less control over, and overall a worse product. But if you're doing way too much by hand,
1:41
it's going to slow you down a lot. You're not really getting a lot of benefit from AI. So, we're going to talk
1:46
about how to find that happy middle ground where you're invested in the project. You are actually building
1:52
something yourself and you're using Aentic AI to assist you in that process.
1:57
So, I'm going to try to keep this lesson pretty low on hype. Just going to give you facts, things that have actually helped me. If you want to get a lot of
2:05
details on this, I have put together an Aentic AI course which you can get a link down to below as well as written
2:11
notes for this lesson. So you can reference that as you watch this video and those notes are free. So this will
2:18
give you a good overview, get you pointed in a couple of directions. But if you want much more details, example
2:23
files, example workflows, how to actually set certain things up, that's where the course will come in. And if
2:28
you just want to follow along with notes for free with this lesson, that link will be down below as well. So check that out before you get started. And I'm
2:35
going to talk to you about the biggest thing, understanding where you would use an LLM. The magic of an LLM is that it's
Where Would You Use an LLM?
2:42
able to make decisions, which is something that is harder to
2:48
articulate in a script without covering every possible scenario. And I'll try not to make this too abstract, but if
2:56
you're working with an LLM, you know, chatgpt quad, it's going to be an unknown output,
3:02
it could be something good, it could be something bad. And if we were to ask it the same question, it might give us a
3:07
different answer. And this idea is called non-deterministic.
3:13
And this is basically how I'm going to frame the rest of this content.
3:20
But this is something you're going to hear a lot in computer science. And it means if you have the same input, you
3:26
could have potentially different output. That's actually one of the strengths of
3:32
the LLM. So if you use this in the right place, you're going to get a lot of benefit. But what a lot of people do is
3:39
they use an LLM, something that's non-deterministic, to do things that are deterministic,
3:50
which is the same input always giving the same output.
3:55
You want to try to identify if this is something that should take a non-deterministic solution or a
4:00
deterministic solution. If it's a deterministic solution, then we want to look into scripts, things that will give
4:08
you the same result every single time. So when you start working with something like claude or any of these AI tools,
Instruction Files
4:15
you will usually have some instruction file such as claw.md.
4:20
And this is a great place to start because you can put any custom instructions there. But the problem is that the AI interprets claw.md. So it's
4:28
not always going to give you the same exact outcome. So the cloud MD is great for instruction, but it's not ideal for
4:36
enforcing things.
4:42
And that's the biggest breakthrough I had in my journey is I was instructing
4:48
the LLM through a bunch of instructions written in MD files and they were often
4:54
not being followed or I was just getting inconsistent results. Now, you can still tell it to follow certain rules in the
5:00
CloudMD. I think that's smart, but you don't want to expect it to always be followed, and you don't want it to
5:06
always have the exact same result. So, what you want to do is as you're starting to build more and more stuff,
5:14
you'll start to get different components, different services, different rules you want the LLM to
5:22
follow, and it just becomes too much information. It's almost like imagine a
5:28
junior developer joining a team and they're given all these different rules, all these different files and they are
5:34
expected to understand everything and create the correct result. It's just not realistic. So what you want to do is you
5:40
want to instruct the LLM to convert instructions and any kind of
5:47
explanations into deterministic gates. So when I say gate here, basically it
5:53
has to pass these rules in order for the result to be successful. So how do you
5:59
actually do this? Well, in building software, it's going to be done through
6:04
linting and pairing that with verifier agents for stuff that's a little bit
6:09
harder to put into linting rules. But you'd be surprised if you ask your agent ways to make all of your rules more
6:17
deterministic and required. It can write some scripts. It can do a bunch of fancy things to prevent certain things from
6:23
happening. Some of this is just going to be built into different tools. So, for example, if you're using something like
6:29
ESLint or TypeScript, you can define the rules, but you can also have the AI
6:35
create custom stuff that gets checked with scripts. So, for example, in my project, it's a multi-tenant service. So
Multi Tenant Service
6:42
what that means is I have a database and this database services multiple
6:48
instances and then these instances serve multiple end users or end customers
6:57
and I really don't want to draw six more people. So you get the idea and the key thing here is we don't want to have any
7:03
kind of sharing of data across these different tenants. This is a common
7:08
thing for multi-tenant software. There's a couple of different ways to enforce something like this. You can do it at
7:14
the database level and you can also do it in your application code. So when I started my instruction was basically to
7:25
respect tenant scoping. This is an instruction. I'm explaining
7:30
how I want the AI to do things. But this is risky because if that is not followed
7:36
for some reason, then we might have some crossover of data. where you know we're
7:42
seeing information that really should belong to somebody else. So we definitely don't want this to happen
7:47
ever. So instead of just relying on LLM rules, we convert this into some check
7:56
by extending the database layer to basically always infuse the tenant.
8:05
This is just a simple example. And if you've never done multi-tenant software, you might be like, what is this guy even on about? But basically what I did is I
8:12
created a check where the code has to respect tenant rules. So if you have
8:18
some query like this, select everything from products
8:24
before the AI might come in here and say where tenant
8:32
is equal to some ID. Well, this is a risk because it's very easy to forget
8:38
and then you just get everything from products instead of it being scoped to that tenant. Well, we just wrote an
8:44
adapter to where that tenant is automatically attached to the query before it ever reaches the database. And
8:51
this is just a very simple example of how I enforced integrity and quality
9:01
in my app. This is just a small example, but this is something that would likely be forgotten if somebody's just vibe
9:07
coding with no insight into how things are actually working. So to summarize this idea, we want to convert as much
Convert Thinking into Deterministic Rules
9:14
thinking into deterministic rules.
9:20
Sometimes this could be tied into something such as ESLint. Other times you can just create small scripts. You
9:27
can think of them almost like tests designed to check the structure of your code. Now, there's another major benefit
9:34
of this. You don't have to write these yourself. You can ask your AI to look at your code and figure out what could be
9:41
converted into checks that will always run. And two, this is going to drastically save token usage
9:53
because running a script is cheap. asking an AI to scan your project for
9:59
any issues expensive. You know, that's not going to hurt to do every now and again, but if you want to do this on every single code change or every single
10:05
commit or on a regular basis, we want to reduce that as much as possible. However, I do still recommend pairing
10:13
this with a verifying agent. So, we will have a verifier and this is
10:19
for more opinionated checks. This is where we have all of the
10:26
thinking. And if we remove anything that could be deterministic outside from this verifier, the verifier can be much more
10:33
focused, not being distracted by things that can be basically automated with scripts. So this would be things like
10:39
checking for any kind of code smell or antiatterns,
10:45
breaking defined rules or any kind of standards that you specify. And you can package in as much
10:52
as you want in this just depending on how frequently you want to run it and the scope that it's going to check. You
10:58
know, if it's just checking pending changes, that's going to be a lot faster than if to scan your whole project. So,
11:04
I'll talk about what kinds of things you should check and how to set up a verifying agent in the Agentic AI course
11:10
if you want to know all the juicy details. So, one example would be putting all of your rules into some
11:18
document. It could be claw.md, but I like to break things out. But let's just say we have a rules file. And one of the
11:26
things it might check for would be n +1 queries. So this is a very common structure that
11:33
people will do with database queries where we retrieve data in a loop. So we retrieve a set of elements, that's the
11:40
one, and then for every single one of those elements, we make a request to the database. That is the n. And this is
11:46
just considered a bad practice because you're going to make a lot of requests to the database. So if you have something that you're having a hard time
11:53
converting into a strict rule, then you can just put it into a rule set that the
11:58
verifier checks whenever you need to execute that verifier. Now this would be defined as a sub agent.
12:06
So the way this works is you're going to have your main agent
12:12
that will initialize
12:19
the verifier whenever needed. So, it's like its own little bubble giving back
12:26
any findings to the main caller. You can kind of think of it as like a function,
12:31
but in the AI world, it has its own scoped things and we don't have to care
12:36
about all of its context. We only care about what we give it and what we get back. The whole idea here is that we're
Using Checks to Enforce Quality
12:42
actually trying to make it more difficult for code to reach production, which seems counterintuitive, right?
12:49
Because everybody's like, "Hey, let's use AI so we can get code out to production much faster, much easier."
12:56
But we want to have these checks to enforce quality in our software. And the
13:01
fact that most of these things can be automated and very easy to do, we end up getting pretty good quality
13:09
without just pushing anything we want right to a production environment. So this starts with the basics [panting]
13:21
claw.md for instructions and you could even go back earlier the frameworks and
13:27
softwares you're choosing to use. So for example, I use TypeScript instead of
13:32
JavaScript just because we get more checks up front. And then I make sure we don't allow any implicit any or even
13:39
explicit any and we have to use all of the TypeScript types so that we're
13:44
getting the most likely to be proper software down here. So choosing your
13:50
stack and any kind of tools. Then we have the claw MD any kind of linting
13:59
the verifier we can use hooks either within the AI or
14:05
within git. We can have any automated tests. We could have AI code reviews.
14:14
similar idea to the verifier here, but
14:20
this would be tied more into CI/CD. So, obviously, we can add as many steps
14:26
as we want, but you could easily add in a third-party AI to review any pull
14:33
requests. So, this is just talking about one of the important things with creating quality software with AI. If
14:40
you do every single one of these steps, the chances of your software being much higher quality is extremely high than
14:47
somebody who just opens the terminal and says, "Yo, build me something cool. Don't make any mistakes." And I don't
14:53
know if you can even tell. And I'm probably going to point this out and then you won't be able to stop noticing.
14:59
This is super in focus and this is a little bit blurry. So, I'm not trying to blame anybody, but the other day my
15:05
child ran into my camera or pulled it down, more realistically, and the lens
15:12
broke and the screen is now cracked. And I've still got it working somehow. It's
15:17
a miracle that I'm even here with you today. But the lens is loose, so it kind of leans forward. It's okay. It's not
15:24
like it's like a $3,000 camera or anything.
Linting
15:30
So, what I want to do is talk about some of the things that you can tie in with linting that will give you really good
15:37
results. I'm just going to share a few ones that'll help you get really good results for pretty much any type of project. So, I have ones that are
15:43
specific for the kind of stuff I'm doing. Again, you can have AI actually scan your code and find like the most
15:50
common pitfalls and turn those into rules. So, the sooner you do this stuff,
15:56
the better. But let's say you add in a rule,
16:02
you can have a ratcheting system where you can only ever have it go down.
16:10
So let's say you have a thousand TypeScript errors.
16:16
And if you want to know how to set this up, just go ask your LLM to set this up for you and it should be able to figure
16:21
it out. Basically, if you create new errors, it will not let you progress.
16:27
It's basically a compilation error, but the existing ones are okay. This is a
16:33
great way to protect software going forward. It's basically a way to acknowledge, hey, we have a bad past.
16:39
You know, we definitely don't want to continue down that path. So, let's set some new standards and follow those
16:46
going forward. So, if you want to just be in the best spot possible, set any of these rules up when you start. But at
16:53
this point, you might already have your project and you realize you've just been going with it without having any kind of
16:59
structure or rules. Well, you might want to look into that. So, one of them for me is actually not Typescript errors,
17:06
but a line count limit. And I actually have that set at a,000.
17:13
adjust for your preferences and the way you're designing your files and components. So, what you do might be
17:20
slightly different, but for me, I split out the styling from the actual component, allowing me to make the files
17:28
smaller. But when I started, it was all just kind of thrown together into single files. So, I have some files that are
17:33
like 4,000 lines plus. I would say many of them are like a,000 2,000. But I
17:40
think AI is going to perform best if you are in the 500 range or even up to a
17:48
thousand. I know some of these newer models work really well with larger context windows, but the smaller the
17:55
file size, the less issues you're going to experience, guaranteed, because it's better for testing. It's better for
18:01
isolating logic. It's better for seeing the entire problem right there. And
18:06
you're not just having these massive files where you change anything and something breaks. And while the idea of
18:13
refactoring is simple, right? We just break some stuff into smaller components. It's usually not that easy
18:18
in practice and you kind of have to reiece things together, retest everything, make sure everything works. Could be really time consuming. I prefer
18:25
a thousand. I think at 500 it's like you're fragmenting too much, which can also be bad. But at this point, I have
18:31
like 20 files or something that are breaking this rule. So that's why I did the ratcheting system so I'm not going
18:36
to have that issue anymore in the future. And eventually I'll refactor those to get them under the thousand. This seems like such a simple thing, but
18:42
I truly believe it'll make a massive difference if you're just creating these massive files. Put that limit on the
18:49
files because I was working on a builder and it was a few thousand lines of code
18:54
and anytime the AI would change anything, it would have some side effect
18:59
breaking something else. it was impossible to build new stuff because every change introduced a regression or
19:08
the AI was bringing back earlier features or just making stuff up
19:15
that I was not having it do. And that problem is way less common when you have
19:22
smaller file sizes and smaller testable components. And testing is its own big
19:27
thing. We're not going to get to all the details right now, but as you're building, you can instruct the AI to
19:33
break out any logic into repeatable testable functions. And this is actually
19:38
going to help your components be more stupid, dummy components, and all of the
19:44
logic being more like functions the component can call. So instead of having
19:50
this, we have the actual visual component
19:56
layer, the styling,
20:02
any kind of functionality. This can be easily tested with unit
20:07
tests. The styling can be worked on independently from the actual functionality. And the component is much
20:14
more predictable and easier to read and consume. Overall, you're just going to have a better experience in my opinion
20:21
if you can split things out into more predictable structures
20:27
instead of just doing inline styling, inline functionality, and everything just being a massive file. I'd say this
20:34
one is a game changer. If you don't want to go through a lot of work of creating massive test suites or endto-end flows
20:39
through Playright or things like that, a lowhanging fruit would be just to extract logic into functions, then add
20:46
in basic unit tests to make sure those functions are working the way you expect. Especially useful if you end up
20:54
creating reusable components. Here's a common problem. Let's say you have a page and it's using some component and
21:01
then later on you want to do the same thing somewhere else. So you have two options. You could copy
21:07
it, just duplicate the code, usually bad, unless it's just like a small thing, or
21:16
you can create an external component that can then be used in two places. So
21:22
you're basically generalizing making that component useful in multiple
21:29
places but that has the consequence of often a little bit more abstraction and maybe you'll have some conditionals in
21:35
there to make it render properly in both places and stuff like that. So generalizing and creating these
21:42
components can cause regressions where what used to work 100% of the time now
21:49
has a few bugs in it and now it's only working 95% of the time for example. So
21:55
the more tests you can tie with that component, it'll allow you to easily extract things into
22:03
separate components later if needed. and you can run the test suite to have a
22:08
confidence level that you didn't break anything. This was a big problem with me because I would build something like a
22:14
checkout modal and then I wanted to do something pretty similar in a different location and I
22:21
was like I really don't want to touch that checkout modal. I finally got everything working. It's a very
22:27
sensitive part of the app. So extracting it into a new component and making it
22:32
more general has its own risks. So I would end up duplicating it, making some small modifications for this new area of
22:40
code. Well, then the problem is I have all these variations to manage and any
22:45
core change would require a lot of changes across files because I basically had to make that change in multiple
22:51
locations and things don't stay in sync. So, I would have been able to have a much better experience if I took a more
22:57
test-driven development approach where I defined the logic and pure functions as much as possible and designed my
23:04
components from the start to be more reusable. I have like a million other static checks that I've introduced to my
23:11
project. Just a couple of other ones that I think are useful. I've structured some synchronization checks. So I have
23:19
an API layer and some documentation and some other things. And basically these
23:26
all have to be considered in sync. So if I make a change to something in the API,
23:31
it's not going to allow drift across these files. It's very similar in idea
23:37
to like a TypeScript check, but it wasn't quite as simple as just checking types. So I wrote up something custom.
23:44
Honestly, I didn't even write it. I had the AI do it because I noticed some drift and I was like, is there anything
23:49
we can do to prevent that drift from happening and it wrote up some scripts to check it? So now anytime I make any
23:56
changes, I have more integrity across all of my files. Similar idea with
24:01
endpoints. I structured it so that it is required to have authentication systems
24:07
with it. So it's not just an open route and I have it required to be validated
24:13
through a validation library. I have checks to make sure that there are no
24:19
server imports in client code. Also I have a check for environment variables
24:25
that everything that is needed for the project to run successfully is included. So that way we're not deploying and we
24:32
don't have the correct environment variables and things don't work in prod the way we would expect. This actually
24:39
helped me a couple of times where I made some small change didn't really think about it and then I went to deploy and
24:44
it was like yeah that's not going to work bud because your environment variables do not match.
24:50
So that was cool because I was like hey this random thing I introduced to protect our code actually protected our
24:57
code. Who would have thought? And then just standard stuff with like TypeScript, just being strict. So you
25:02
can often set these rules in configurations. Also any kind of formatting. So I use prettier
25:09
formatting, making sure that's enforced. Pretty much anything preI that you would want to enforce at compile time or in
25:17
CI/CD. I try to do all of that that I can and anything that I can't do that I want to be verified, I just put all of
25:25
that in a rule set that I have the verifier sub agent check for me. So the next thing I wanted to talk about is how
Components
25:31
do we get the AI to basically act good throughout its execution. And what I
25:37
have discovered to work very well is instead of putting everything inside of a claw MD, we want to create basically
25:44
an HQ of various files for the LLM to use when it needs. So this is a similar
25:51
idea of a very large file giving you garbage results. Well, if you have a cloud MD that's massive, it just dilutes
25:58
any instruction with a bunch of other junk. So what we want to do instead is create a variety of files that are
26:05
scoped to certain things. So the very first thing I would start with is a component file. Now I do a lot of stuff
26:14
in web development, front end, backend, web servers and all that junk. You might
26:20
be doing other kind of software, other kind of projects. So you might need to customize what you're talking about in these files.
26:26
But for me, I have a variety of web components that I've built or that I want to use, and I don't want the AI
26:33
creating a bunch of variations, which was a huge problem at the start because even if I would say, yo, reuse our
26:40
components. I think at one point I had the same button across the page, that was like four different variations. And
26:46
yeah, I could say, "Hey, go reuse the existing component." But having to constantly instruct to do that is
26:53
frustrating and it gets worse quality software. I think in the CloudMD I had
26:59
do not use alerts like multiple times like don't do this
27:05
and it would just continually use alerts completely ignoring my instructions. So
27:10
I think at one point I just tied that into the linting rules. No alerts. Problem solved. Same with console logs.
27:18
But that's not the point. The point is how do we get the LLM to actually follow instructions? There are a variety of
27:24
structures you could follow, but just to get you started, what I would do is use the cloud MD as more of a table of
27:30
contents for different files. So, I
27:35
downloaded Obsidian and I work with all of the MD files
27:41
through Obsidian. I originally was on notion and also I would originally just
27:47
use MD files, but I think Obsidian software helped get me the best of both
27:53
worlds where I didn't have to just use MD files in Visual Studio Code or
27:58
whatever and I didn't have to use a software like Notion which was not
28:03
native MD files I could bring into my repo. So I was able to get that notion
28:08
like experience but still just raw MD files in my repo through Obsidian. So I
28:14
just have at the core of my repo a vault folder
28:20
and this has all of my MD files. So you can think of it like this.
28:27
We have the cloud MD. In this you can just say that
28:34
instructions and vault and any other major important directions
28:40
here inside of the vault you can have things like components.m MD and what
28:47
this does is it cataloges all of the different components. So I have for example a multi select
28:56
and a select and a pageionated table
29:04
and whatever else. It doesn't really matter. I just have the AI catalog the components that I use. Basically I would
29:10
just tell it to check components MD before creating new components. I think
29:15
you could even tie into ESLint a rule to prevent the use of just plain HTML so
29:23
that you would have to use a component either something custom or something in
29:29
React and that might allow you to really enforce certain structures and certain
29:35
things even if it means you're just creating custom you know list elements or whatever it might be. That's an idea.
29:42
I haven't personally done that. But that is something you could do if
29:47
you want to make sure all of the components used throughout your app are scoped through components. And you can
29:53
customize like any of this. I think that's one of the magic things with AI is some of the stuff that I would
30:00
normally not really have an idea of how to do I can get the AI to do for me because it has a broader scope of
30:07
knowledge. So I could tell it, hey, prevent the usage of any components that
30:12
are not inside of the component directory and tie that in as a linting rule, which is enforced. So we do not
30:21
have the ability to go outside of that rule. If you need a new component, then you actually have to update that
30:28
directory. That's just an example, but I do this kind of stuff all the time where anything I want enforced, I will either
30:35
just put it at the cloud MD level if it's not like very very important or if it's very important, then I'll tie it
30:41
into linting somehow. Now, here is the next level of this idea. You structure
Self Learning AI
30:48
your vault to have the different sections or different domains in your app and you use it as self-documenting
30:56
documents. So in your cloud MD, you tell it to update these documents as needed for any important notes. And it can be
31:03
as detailed as you want it to be. I often use these not really for my own sake, but just for future conversations
31:10
with the LLM. It can refer back to any important notes and findings. So a sample structure could be having the
31:19
components MD, maybe services, and that could be a folder with [snorts] various files in it. security MD. If you don't
31:26
have a lot, then just, you know, doesn't have to be super structured and complicated.
31:36
OMD and then even potentially certain pieces of your app. So maybe you have like a
31:44
portal of some kind. So you can put anything specific to that big feature in your app. And this allows you to put
31:51
anything relevant for yourself in the future or any conversations with an LLM
31:57
in the future here for reference. This will be very important. And here's the reason why. The thing is that with AI,
32:04
we can build stuff very quickly. And this means to compete in the software
32:10
world, you will now have single developers building full software
32:16
suites. And their limitation is no longer the ability to code. The limitation is now the ability to create
32:23
good software that people actually want but a little bit zoomed in will be to
32:28
remember everything that they did for the architecture and making all the different decisions any kind of design
32:34
documents or choices that they have to go through. All of that is what I put in the vault. So, not just these random
32:41
files, but any kind of feature, specs or
32:46
information. I even have stuff on like marketing and, you know, different processes I'm in the middle of. So, you
32:53
know, migrating stuff, I'll have it documented as it goes. Anything that's like a big project, I will have it
32:59
documented as it goes so that it's not lost, I can, you know, have a checklist and just it's just more clean, right?
33:06
like we have something to anchor it against and I'm not just relying on the memory of the LLM. So I would definitely
33:14
encourage the use of a vault. Now let's talk about skills and sub aents. So
Skills and Subagents
33:19
these are two tools that are available in cloud code or probably other
33:27
LLM development tools. These are pretty similar in idea but not
33:33
exactly the same. So if you have the main chat that you are working with,
33:39
the difference between a skill and a sub agent is that the skill will bring all of the information into the main chat's
33:47
context. Whereas a sub agent manages its own context
33:56
and only has the information that's provided to it. So which one do you want to use and when? Well, with skills,
34:03
you'll put anything you tend to repeat that you want to be able to invoke throughout your sessions, put those as
34:10
skills. And then if you have some specific task that you can isolate, put
34:15
that as a sub agent. So, for example, with skills, I could create something
34:20
like design and design has all the information needed for the LLM to be
34:26
better at designing and then I can work on that in my main conversation. Whereas
34:32
a sub aent, a good one might be something dedicated to research that
34:37
goes and finds something on the internet, summarizes it, and gives it back to your main chat. The value of the sub aents is that it does not pollute
34:44
your context window over in your main chat. It does everything on its own and just gives back the results for things
34:50
that you want inside of your main context. You'll put it as a skill. So, I create a bunch of skills for various
34:56
things I want to do. And then I can just basically pick up where I left off on that idea by invoking that skill when I
35:02
start a chat. So for me, I use some design skills for web diagrams
35:09
and content planning skills to make a PR,
35:17
anything that I just want to invoke on the go whenever I'm ready and I just am fine with it being in that main chat.
35:23
For sub agents, I have stuff related to design, but a good one might be a test
35:28
writer. This is something that can be invoked as you are developing in your main window
35:34
on the side. So, it can write tests for anything you're creating. So, utilize both of those to get the best result.
Main Orchestrator
35:41
And what I've been doing recently for more complex operations is I create a set of sub aents and I'll have a main
35:48
orchestrator. So there's probably some formal design
35:53
structure you can find for this idea, but this is how I've been doing it. This is my main chat.
36:01
And then I have this main chat launch bundles.
36:08
And this is probably overkill for many things because it takes a lot longer. It uses a lot more tokens. But if I want
36:15
something that's more thorough and I don't want to have to sit and go back and forth for hours on end, I can follow
36:22
this approach and I have this all written up in a skill. So it will launch these different bundles in the
36:28
background. And what that does is it keeps this main loop free. So I can continue to chat with the main
36:35
orchestrator and it will just launch off different tasks in the background. So each one of these bundles will have a
36:41
sub orchestrator and this person or AI agent is in charge of building the full
36:46
feature end to end but it does this through delegation. So
36:52
we have a planner which actually writes the spec.
37:00
We have implement
37:09
which does the actual coding. Then we have the tester who does any testing as we
37:17
go, writing tests, making sure existing tests aren't broken. Then we have the
37:24
verifier that we've talked about slashchallenger to see if what we've
37:29
built is even what we want. Making sure it's not too complicated, it solves a
37:34
clear problem. That's all written within a single agent. And then I also have in here some other ones that are used
37:40
sometimes. So if we're working on design, I have sub agents for that to make sure it works on mobile and things
37:46
like that. So obviously that's a lot of stuff and we don't have to use every single one of those. the sub
37:52
orchestrator is in charge of doing what it feels necessary for the task, but you could say it's required, but you can
37:58
kind of think of this as building a small team to achieve some goal. So, I designed all of the structure within a
38:04
skill. I think I just called it launch or something. So, I can just say launch,
38:11
describe the task I want to build, and it will launch one of these bundles in
38:16
the background. You can also specify different models for different tasks. So if you have something that's more
38:21
thinkingheavy and you wanted to make sure everything works correctly, I would put that as you know one of these
38:28
managers or planners. So you might use Fable or something like that up here and then use some cheaper
38:34
models for the implementation whose job is really just to follow some spec. And
38:39
then throughout this skill, I've told the agents to bubble up any problems or
38:45
questions and triage how important it is that I answer them. And if it's above a
38:51
certain threshold, it will be brought up to this main orchestrator. Like I said, this is way more complicated than most
38:57
people need, but this has been very helpful for building larger things where I don't really need to be involved in all of the details. So this main chat,
39:04
all it does is it just launches new bundles and asks me important questions that will impact the design or
39:12
implementation choices. Then I've connected to that remote control. So I can just go in here, use the microphone
39:18
option. I can describe some feature, everything I want, don't want, and then I can just tell it to launch a bundle,
39:25
send it off, and it will then come back with any questions for clarifying and
39:30
writing out this spec, and it'll do that for a couple of hours sometimes. So, it's basically able to do much more work
39:37
without me having to go back and forth with it over time. This structure I would really only recommend if you are
39:42
already pretty familiar with everything we've talked about so far. And the added architecture here actually helps you and
39:47
doesn't bloat your process or your software. So that's why I put in here for the verifier and challenger to make
39:55
sure the software is very thin and not overarchitecting because I just want to be able to go in here, answer a couple of questions and have a high level of
40:02
confidence that what is built is pretty close to what I want to have as the final thing. Then I just go and check
40:09
and run through, click a couple buttons, make sure everything's good, and then I can tell it any updates. So I specified
40:15
in the skill to keep the conversations open so it doesn't kill the entire bundle when everything is done. And then
40:21
any changes, it has to like bring everything back up because anytime you're opening sub agents, you have to
40:28
give it context. So that's a way you can burn through credits as well. So there are a ton of variations of this idea.
40:34
I've seen ones where you basically build a full stack team. So you'll have like a
40:39
front end dev, a backend, a tester, and you work through orchestrating them
40:45
telling them to build features. If done right, this can be very helpful. But if it's done poorly, then it can just add a
40:52
lot of credit usage and still get you a bad result because now you have bureaucracy in your AI agents. So we
40:59
definitely don't want agents going back and forth changing each other and never being able to come to some conclusion
41:05
that is simple and lean. So I was very cautious in how I designed those sub agents. So that wasn't going to happen.
41:11
And that all ties back to the spec which is basically the authority. So most of
41:17
the questions happen upfront when we're designing the spec. And then the other agents are just designed to implement,
41:22
test, and verify that spec. So, we're basically just frontloading any design choices, any questions that we can
41:29
predict, and that helps us not have to go back and forth with the agent over time. It just works for a longer period
41:35
of time, often a couple of hours even. I'd love to get to the point where I can get it to run for, you know, 24 hours or
41:42
something, but usually it'll be an hour or two for like a smaller feature and a couple of hours for something that might
41:48
be a little bit bigger. But I probably wouldn't do this kind of structure unless you're on a max plan where you
41:54
have a reasonable amount of credits to use. So if you're on a plan and you're not utilizing all of the credits, you
42:00
can add in extra layers to use more credits and that's going to reduce your
42:05
overall input, but you're not doing it all within a single chat because that's not going to work effectively for
42:12
building larger things. So that's why I utilize sub aents. I would say the most valuable thing here is that the main
42:19
conversation loop stays open. So, it launches the bundle and then I can have it launch some other ones in parallel or
42:26
ask questions as I go. I don't have to wait for an hour or 2 hours for it to finish what it's doing. The next big
APIs and MCP
42:32
thing is APIs and MCP.
42:40
So you can think of MCP pretty similar to an API designed for agents. So for
42:47
example, with my software,
42:56
I designed an API to be able to do most of the stuff you would want to do on the
43:01
user interface, but you can do it all through code. And then I take this API
43:08
and I write an MCP wrapper. And this MCP basically bundles in instructions to an
43:15
LLM. So you can connect your agents
43:21
and make changes to your live production website, which I haven't talked about what I built at all, but this is just a
43:27
platform for hosting products and doing email marketing. all of the marketing and sales side of online business. Well,
43:35
we can just connect to course catalyst through MCP and then you can just talk
43:40
to your AI and say, "Hey, I need you to draft up a high ticket product, create some landing pages, draft up some
43:46
emails, and that's all going to be created on your live production account." This is just one example, but
43:53
the idea is you can connect everything that you do to your AI and now it's able
43:59
to interact with stuff outside of your coding window. So, if you want to get to the point where AI is managing more than
44:04
just your code, you can connect to various services through MCP. Now, some things will not have an MCP server, but
44:11
they will have an API. And honestly, an LLM can do the same exact stuff because
44:16
often with APIs, you will have some documentation
44:21
So, I designed my API with the open API spec. So, I could do everything that I
44:26
would normally do with the API, even without the MCP layer. But that's just kind of like a nice standardization. But
44:31
if you're working with something and they don't have an MCP server, but you want your AI to be able to interact with
44:37
that service, there's a chance you could just pass it an API key and it can do those things for you. Or it can write
44:43
simple scripts to do things with that API key. Heck, you might even be able to just go into your browser and grab your
44:48
cookies from the dev tools and pass that to your
44:54
AI and have it do stuff for you as well. But typically, you're going to want to
44:59
check for an MCP first. So, go to whatever service, check if they have an MCP server, then check if they have an
45:04
API, and if not, you can go old school and have the AI just interact for you using the cookies in the browser. That's
45:12
higher risk, though. the MCP, we can tie in instructions to the LLM, so it actually is able to understand how to
45:19
interact with the service APIs sometimes as well with comments or anything with
45:25
the actual interface with the API. But if you're just having it interact with a website on your behalf, it's a little
AI Features vs MCP
45:30
bit more risky. So let's just talk a little bit more about MCP and what that is actually structured like in a project
45:36
as well as differentiating it from having AI tools within your application. So let's look at this from the
45:42
perspective of a software developer, not a user. So if I'm building software,
45:47
well, I could create buttons within my application that do AI
45:57
things such as summarize documents or make
46:02
suggestions or answer certain questions, whatever it might be. For this example, let's say this button generates some
46:10
documents.
46:16
And then we can go in there and make additional edits and stuff like that. Doing everything through these AI
46:23
enhanced features. Alternatively, we could create an MCP and this MCP gives
46:29
those same capabilities. generate docs, make edits and so forth.
46:40
So there is some overlap in capabilities. Sometimes the MCP can replace some of the AI features. So for
46:47
example, in my app, I have a page builder and I started to build out within the app the ability to generate
46:54
and edit the page all from within the app. And that's still something I might end up building, but I just put that on
46:59
pause and I moved all of that capability into the MCP capabilities. But with the
47:05
MCP, this will have to interact with the user's LOM.
47:12
So, it might be a little bit more effort for the end user to get things set up versus just clicking a button or using
47:18
some AI feature in the app. But there are a lot of benefits to this as well. And one of the big reasons I decided to
47:24
go this route is because I wanted one entry way to be able to do anything within the app. And collapsing that all
47:31
within MCP made the most sense compared to sprinkling AI features throughout everywhere in the app. We will just
47:38
delegate all of that to the end users LLM and just expose certain capabilities
47:43
through MCP. So, this costs me tokens
47:54
and I have to do all of the LLM controls and setting everything up. Whereas with
48:00
MCP, the user pays tokens. So, that was one of the big reasons I wanted to do
48:07
this as well. Not because I'm cheap, it's because, well, I mean, I am. Well,
48:12
no, I'm not really. I don't am I? I wanted to be able to build a bunch of AI capabilities without having to worry too
48:19
much about the cost that it would bring me. Of course, having all of these capabilities in the app might be a nice
48:26
feature, but then we have to worry about things like, well, what if the user ends up just using these AI features in an
48:33
incorrect way, consuming way more tokens than we would initially expect, and then those costs ultimately bubble up to me.
48:41
or you know I'd have all these extra complexities of having AI credits they could use and I just didn't want to
48:47
start with that. I just wanted to keep things very simple and that's the main reason I went with the MCP route. But
48:52
there are a few situations where this really doesn't make sense. So in my app,
48:58
all of my users that I'm talking about here are people building their own sites
49:03
for products and marketing and things like that. it's very likely that they're going to want to set things up with
49:08
their LLM to be able to do a bunch of different stuff. However, their end
49:14
users, because it's a multi-tenant site, they have their own users. There's
49:19
probably a pretty low chance that all of these users are going to want to interact with the site through MCP. So,
49:26
for certain features, I will end up building the AI inside of the app. A
49:32
very simple example of this is if we have a course player, we have the video there. We might have
49:39
some notes with the video, probably exactly what you've seen if you've taken any of my courses.
49:46
And adding in some kind of AI button to bring up a chat window to ask questions
49:51
about any of the course material or cross reference with different lessons or whatever it might be. That's a nice
49:57
AI feature that doesn't really make sense to wrap into the MCP because the
50:03
end users, they just want to click that button and ask a question. They don't want to have to connect their LLM to ask
50:08
a quick question about a lesson they're watching. So, you just have to think about the end user and what the use case is going to be. But those are just some
50:15
of the pros and cons. I created everything as an MCP because it basically gives my users, these ones
50:23
here, superpowers to be able to do anything on the site through AI, which drastically improves the speed and
50:30
effectiveness to work with this app to be able to launch products, send out emails, and everything like that. So,
50:36
let's go just one layer deeper with MCP. When we're talking about MCP, you will
50:42
have the server and the client. So I as the developer am hosting the MCP server
50:49
and this is just a collection of different tools. So tools
50:55
are basically just things you can do.
51:02
Now I have a very clear one:one connection with my API and this allowed
51:09
me to create the MCP layer very simply. Instead of creating a bunch of custom tools, I just mapped my API endpoints to
51:18
tools. Is that how I'm going to keep it forever? Not entirely sure. I think at
51:23
some point I might want to create some more purpose-driven tools. But by doing
51:29
this, it allowed me to get the MCP created very quickly and still be able to do everything that I would need to do
51:34
in the app. So an example tool might be get page blocks. If we're talking about
51:43
building a landing page, this just maps to an API endpoint, but within the MCP
51:48
tool, we have a description. And this is basically context you can
51:54
feed the LLM. So it knows how to actually use get page blocks properly.
51:59
So the MCP layer is probably a bit more effective when we are working with our
52:04
app through an LLM compared to just giving it the API key because we can tie in all of these different descriptions
52:12
for the LLM to actually understand how to use everything correctly. So for small scale stuff, it can probably just
52:18
scan your API endpoints to get a pretty good idea. But if you're doing a lot of different things, then it could get
52:23
pretty bloated and we have that problem where hey, it might not know all the details of how to invoke every single
52:28
one. So we give a really good description for each of the tools and it will help the connected LLM a lot
52:35
because it doesn't have to make a bunch of guesses. There are a bunch of other magical things you can do with MCP and
52:41
benefits to it over just using an API directly. We're not going to cover everything with MCP in this lesson. It
52:48
definitely does deserve its own dedicated video in my opinion where we can explore some of the details of MCP
52:54
differentiating it from standard APIs you might already be familiar with. Let's talk briefly about permissions and
Permissions
53:01
this is a huge unlock if you do it correctly. So with claude there's an option to
53:08
dangerously skip permissions. I forget the exact wording and I'm sure other tools like codecs have something
53:14
similar. And if you do research on this, there are various ways of achieving similar results without using this exact
53:22
flag. So you can research some of those. This is basically a way to tell your LLM that it can do anything without first
53:28
asking you. I avoided using this for the longest time because when I saw people
53:34
talking about this and using it, I just assumed that this was like a bad way of
53:39
developing just letting your LLM go free and that it was extremely risky as well.
53:45
But I figured out, hey, it's actually not the command's problem. It's the
53:51
user's problem using the command incorrectly. But after constantly having
53:56
to approve things and adjust individual permissions, I was getting annoyed. So I
54:01
was like, "Hey, let's figure out how to let my AI agent run indefinitely without asking me questions." Now, it does ask
54:08
me questions, but design questions. It doesn't ask for permission to run certain commands or do certain things.
54:13
So before you just bypass all permissions, I would first recommend that you just add very common commands
54:19
to your permissions so you can allow or disallow certain things. That way you can drastically reduce the amount of
54:26
times you have to give it permission saying yeah you're allowed to do this even though you've told it that that's fine in the past because when you click
54:32
those it only lasts for that session. So if you close out a cloud code and you reopen it you have to click yes on all
54:39
of those again. So anytime you continually hit a common command you can just add it to your permissions and that
54:44
will persist between sessions. So let's talk about that idea first before we talk about bypassing all permissions and
54:50
how to do that safely. So when I started coding, I had my project and then I had
54:56
the local database. This is all local data, no production data. Now I didn't
55:02
dockerize my app, but I did run my database within Docker. And to interact
55:10
with a Postgress database, you can use psql, but I didn't want it to connect to
55:15
just any database. So I made it to use docker exec psql.
55:22
So the psql command directly would be denied. And this means that my llm could
55:30
connect to my database in docker but it could not connect to a different database directly through psql. So, it's
55:37
basically a protection that it's not going to corrupt any other databases on my system or any remote databases if I
55:44
had any of their connection strings on my local system. Now, generally, you don't want to be doing that anyways with
55:49
production databases, but this could also be testing databases or any other databases that are not on your local
55:56
system. They're somewhere else in the cloud or even just databases on your local
56:02
system that are not within Docker that you don't want this app touching. So, those are all simple examples. That's
56:09
one way you could enforce it. I was able to prevent a direct psql call. Now, obviously, that's not going to be foolproof. There's a ton of other ways
56:16
you could connect to a database. So, it's not going to prevent it from using a connection string in a script. But the
56:21
idea here is that I constantly found the LLM going to psql.
56:28
And if the LLM did not know the correct connection string to use at that moment,
56:34
it might take a guess and choose the incorrect database. So while I'm not going to protect the whole system with
56:40
that simple permission, it's just one little thing to add to help the flow so
56:45
it's always working on the right database and it's not disrupting any other databases that you might have on
56:50
your system. So for example, I had docker
56:57
Postgress and then I also had Postgress on my
57:02
local system just because I installed it locally and it was regularly trying to
57:08
use the local Postgress and not the Docker Postgress. So it also helped
57:14
guide the LLM. So I was able to choose the right database if I had to do anything with the data layer. That's
57:19
just one example. There were a lot of different commands I was using to help guide the LLM. So I had it to be more
57:25
autonomous. So for example, I would prevent any kind of DB push
57:30
where it would skip migrations.
57:38
Sometimes it would try to just apply to the database directly,
57:44
not going through this path. And that's bad because then we can have drift between the database and the migrations.
57:49
So I found after extended use it would sometimes try to do certain commands like this and I would just deny it and
57:56
then it wouldn't ever happen again. Not just that session but any session going forward because it was in the actual configuration. Some other ones you might
58:02
want to consider denying would be any kind of get reset
58:08
or anything that could be potentially destructive with version control. And I like to think of these permissions as
58:15
guidance to the LLM. But I would be cautious to treat them
58:21
like security measures.
58:29
Now, they'll definitely help with security, but the problem is there are various ways you could bypass these
58:35
rules masking the true intent of the command. So, if we happen to have a malicious AI, I'm just going to say bad
58:43
AI cuz malicious for one, way too many characters. for two. I don't even know how to spell that. So, if we had some
58:49
kind of prompt injecting attack or something like that, let's just say in theory here, we could figure out ways
58:54
around the deny rules. So, think of these as protections for you and your
59:00
AI, but don't really think of them as full security measures to prevent bad
59:05
actors. That's not really the goal here. Again, it'll definitely help with that, but there's ways around it.
59:12
That's why when you see commands pop up, it'll ask you for permission to accept them and it'll say something like this
59:20
has, you know, arbitrary bash execution or it's potentially circumventing
59:25
certain protections and you'll have to approve those manually. Almost always they're fine intent, but you just have
59:32
to understand that your deny rules are not 100% foolproof. Because of this, we
Isolated LLMs
59:37
want to have stronger isolation so that the AI cannot do something bad. So
59:43
instead of being in this situation, let's say our LLM is right here
59:48
and we have our local DB
59:55
and we also have some production DB and we have both of these connection
1:00:01
strings on the same computer. And then we just tell the LLM to choose carefully.
1:00:07
You can think of using deny rules and instructions to the LLM as this
1:00:12
structure which obviously is terrible. So what we want to do is we want to completely prevent access to anything
1:00:19
that's potentially sensitive. And that might not even be a production database. It might be version control.
1:00:28
It could be MCP servers. It could be important API keys. We have to think about these protections first before we
1:00:36
bypass permissions because you can think of bypassing permissions as erasing this wall here.
1:00:44
So the LLM is able to then go and do whatever it wants. We don't just want to instruct the LLM to choose carefully. We
1:00:51
want to actually make it impossible to screw things up by removing these things
1:00:56
altogether and only keeping what the LLM can safely
1:01:02
use there for it to use. So there are a couple of ways we can achieve this. The first one would be to dockerize or
1:01:10
isolate the LLM. There are some isolation structures
1:01:15
within cloud code you can do research on. I talk about all the details of how to set that up in the Aentic AI course,
1:01:22
but by doing that, I'm actually isolating it from having access to any of these things. So that's what I did. I
1:01:29
used a Docker container that's running Claude. And this container
1:01:36
shares them out with my main system, which is the repo.
1:01:43
So it can make changes through this mount and you could run like an
1:01:49
in-memory simple local database in that container or you could have another database container and connect these so
1:01:56
that these can communicate and with this structure now anything that's potentially sensitive I can keep outside
1:02:03
of the folder and outside of the actual container. So, for example, I might have
1:02:08
some CLIs for different services I use, and these might have keys to real accounts.
1:02:14
If you're working with any kind of cloud provider, AWS for example, you might have access to some of your
1:02:20
infrastructure in your CLI. Well, as long as those configurations are outside
1:02:25
of the repo, then this container cannot access that
1:02:31
information. So, anything that you do want cloud to be able to do, it would have to be within that repo. So another
1:02:36
example is it has that repo code but it doesn't have my GitHub credentials. It could in theory make its own commits but
1:02:44
it's not going to be able to push or pull from my private repo because it's not exposed to my GitHub credentials
1:02:51
which are outside of the repo. So it can only change the code locally and it can't do anything with my code outside
1:02:57
of my system. And what that means is for longunning tasks, autonomous AI, I do it within the container. And then anything
1:03:04
that might touch more sensitive stuff such as GitHub or any production infrastructure, I do that from cloud
1:03:11
outside of the container. And this is without bypass permissions. So I can actually see every single command that
1:03:18
could potentially harm something. So I have that structured so I can run multiple cloud instances all within
1:03:24
their own Docker container, but they work within the same repo. They share a local database container for the actual
1:03:30
running of the application, but they all have their own test database.
1:03:35
So they can run tests and do anything independently. Another great approach to improving your flows with AI is put
Identify Workflow Problems
1:03:43
within the instructions file to identify any workflow problems and improve them.
1:03:51
specifically any skill files or sub aents that you actually define and you're not
1:03:57
just creating on the fly, any document structures and so forth.
1:04:08
And what this will do, this is just added to the cloud MD, so it's not something that's, you know, guaranteed
1:04:13
to run and scan what you're doing every single moment of time. But having these
1:04:18
commands infused into your context will help the AI agent actually improve what
1:04:24
you're doing over time. You can always verify what it's changing. Of course, this goes back to the vault idea where
1:04:29
basically we have all the information about our project within that vault, but this is more talking about the actual
1:04:35
cloud infrastructure. This will just kind of keep things improved as we go. Or you could create a specific skill for
1:04:42
that and run it whenever you need or on some kind of schedule, whatever you want to do. But the idea is we want to have
1:04:48
some way to improve over time without constantly having to manually do those
1:04:54
things. But I am always looking for things to happen recurringly. So if I notice a pattern where the AI is doing
1:05:00
something funky or something isn't working quite the way I like, I will just improve those skills, I'll just instruct the LLM to take the issue we
1:05:07
just encountered and put it into our vault somewhere so that we do not run into that again. The last tip I have for
Prototyping with AI
1:05:12
you is to use AI for very fast creation of prototypes and visual examples. So
1:05:20
within my vault, and just to preface this, I am by no means a design expert
1:05:27
and I've been able to get pretty far with the help of AI to create some of these things. I spent some time upfront
1:05:33
to build a lot of this stuff to help reduce the cost later down the road. I
1:05:39
have example themes,
1:05:44
landing pages, widgets, graphics, components,
1:05:52
stuff for analytics. And I have a file that I can just open in the browser. It's just an HTML CSS
1:05:59
file. And it has all of these nested documents that I can open and click through. And these have different themes
1:06:06
and ideas behind those pages. And I basically just use these as a reference for different styles that I like for
1:06:12
certain things. So for example, I had one that was like a Patagonia vibe.
1:06:19
So mountains and like different colors. And then I used this as inspiration for designing a landing page. So anytime you
1:06:26
can anchor an instruction to examples, you're going to have much better results.
1:06:39
And I think this same idea contributed to my reintroduction and happiness with
1:06:44
AI. So at first I liked it and then I was getting annoyed, started doing stuff by hand and then things started to get
1:06:50
better down here. When I was doing it by hand, I learned certain infrastructures and approaches in much more detail and I
1:06:57
created a really good page that I could then use as a template for some of the other stuff I was creating. So now I
1:07:03
always try to anchor requests to something that's good and it makes new stuff a whole lot easier to produce. I
1:07:10
do the same idea with the designs. I have like a hundred different pages of different widgets, different themes,
1:07:15
different vibes, different ideas. And I don't use all of these pages for
1:07:20
anything except for inspiration to then design future stuff. So if I have some
1:07:26
analytics I want to show, I can just go click through these pages and find what I like. Then I can say, "Hey, design it
1:07:32
based off of this example." So you could build something like that. But what I would also recommend is just to prototype the UI very quickly, having
1:07:40
the agents create a bunch of variations. So this could be for just visual design
1:07:46
or it could be for the actual flow. And not tying this to back-end logic allows
1:07:51
you to iterate very quickly and generate a bunch of variations. This has been very very helpful for me to test
1:07:58
different user interface flows, ensuring I covered everything that needs
1:08:03
to be covered, that it looks nice, that it makes sense without having to build it out with the APIs and the backend and
1:08:09
everything like that, making it much faster to get that design and then turning this into the actual spec for
1:08:15
the behavior. Or you could actually design it to be front-end components that could just tie
1:08:21
in to different APIs. But I usually just keep it raw CSS, HTML, maybe JavaScript.
1:08:27
And sometimes I'll use actual React components to make it a little bit more engaging. But this is basically just a
1:08:32
brainstorming step to then bring that into my actual project. This is especially helpful if you have a bunch
1:08:38
of different inputs that could affect the visual state. You could create many or all of the possible paths very easily
1:08:45
with AI without having to go in there and set things up every single time. So, for example, with payment flows, that's
1:08:52
a little bit slower to implement because, you know, you have to have an account, you have to buy the product,
1:08:57
you have to put in the credit card information, and then if you want to test it again, you have to revoke that product and go through that same
1:09:03
process. Kind of a pain to test and design all at the same time. So, what I
1:09:08
did is I just had the AI do it entirely front end and give me buttons for different states. So, hey, this is a
1:09:15
person who's not logged in. This is a person who is logged in but already owns the product. This is a person who's
1:09:20
logged in but has not yet bought the product. And whatever input could affect the visual, I just had that as like a
1:09:25
separate option and then I could flow through all of the structures making sure that they looked correctly before I
1:09:30
converted that into a spec. Then once I had that spec, I would only have to test a little bit because I already got the
1:09:36
flow figured out. So hopefully that makes sense and is helpful. That's something that's helped me a lot. Being somebody who is not super amazing with
1:09:44
design and front-end skills, prototyping as much as I can up front has been tremendously helpful for me. So, you
1:09:50
guys want to know something depressing? I managed to crack my screen on my laptop a few moments ago. So, not only
1:09:57
do I have to announce the breaking of my camera equipment, but also my work machine. I did get a little bit lucky
1:10:03
with that one, though, cuz you can still kind of see the screen right now. So, as long as it doesn't go across the whole thing. And this time it was actually my
1:10:10
fault. But both of those things happening, what kind of luck is that? But speaking of breaking your camera
Hooks
1:10:18
lenses and screen and your laptop, let's talk about hooks.
1:10:27
So these are places you can tie into the life cycle of your LLM.
1:10:35
very similar to like middleware in web requests. We can tie into certain points
1:10:41
in the conversation to execute certain things. This can be used for a ton of
1:10:46
different things. What I use it for is to protect against certain executions and to enforce certain linting on every
1:10:52
single response. Now, I of course have the 30 different types of hooks memorized, but just so I don't forget
1:11:00
anything, I'm just going to reference the documentation here. Automate actions with hooks. The table below summarizes
1:11:05
when each event fires. The hook events section documents the full input schema and decision control options for each
1:11:12
one. So, there's all kinds of different settings and customizations, but the examples that they give, I'll just put a
1:11:19
couple up here so you get the idea. session start user prompt submit
1:11:29
pre-tool use sub agent start
1:11:34
and there are a ton of other ones. So I think this having a couple of these up here will help you understand a little
1:11:40
bit better. You can tie into different events in the engagement with the LLM. I
1:11:45
use this one and then there's another one stop that I use. So this is when
1:11:51
Claude finishes responding and this is before a tool is used
1:11:58
and tool is a bit vague. That's just any executable action from cloud code. So
1:12:04
this is going to intercept before any execution. And for these things you can provide extra details. So for example a
1:12:11
matcher that you could specify exactly what you want to catch. So maybe you
1:12:16
just care about bash for example. So you can tie into that and prevent certain things from happening. People will use
1:12:23
hooks to give full permissions to Claude, but prevent certain things from
1:12:28
happening. So it's a little bit different than the built-in allow and deny rules because bypass permissions
1:12:35
ignore those, but the hooks allow you to still have some restriction. So you can
1:12:40
think of the conversation as something like this. You send a message to the LLM.
1:12:48
It starts doing its thing. Maybe it edits a file, executes some scripts or
1:12:54
some bash commands, and does a bunch of work, and then it returns back to you
1:13:00
waiting for the next prompt. Well, these events here, you can tie into them, as
1:13:05
we mentioned, with the pretool hook and the post tool hook. And that's going to
1:13:11
potentially happen for multiple things within the LLM response. So it's not just a one-time thing, but then at the
1:13:17
end we have stop. So that would be here. So if you want to tie something in after
1:13:24
everything the LLM does for a single response from this prompt. So every single response you would use stop. So
1:13:32
let's go through a couple of quick examples of what you might use these hooks for. So let's first look at
1:13:37
pre-tool use. This could be to prevent anything dangerous.
1:13:43
That's the primary reason I use it. And then a postto use could be to format
1:13:50
code or do any linting of any kind. However,
1:13:56
you have to ask yourself, do you want to have this happen after every single tool use or is what you're trying to do able
1:14:04
to be postponed till the end of the response for the stop hook? So, that's
1:14:09
what I chose. So, I put some stop things instead of using post tool use. I just
1:14:15
do it at the end after the LLM is done, but it could still cause the LLM to go
1:14:20
back and change some of its work. Now, the easiest way to get started with hooks is to just think of them as
1:14:25
invoking a script. So, it's not going to be like an additional prompt you give to
1:14:31
the LLM saying something like, "Hey, make sure you format your code." No, it's a script that runs and then that
1:14:38
script's return will then be fed back into the LLM. You could, of course, tie into a Claude invocation in one of these
1:14:45
hooks. You can do that by invoking Claude with a prompt directly in the actual hook command. So instead of
1:14:52
thinking of it as an interactive Claude session, you're just passing it a single prompt. That's something you could
1:14:58
easily do. But for me, I just have a JavaScript file for pre-tool use and for
1:15:03
stop. That one is to prevent certain bad things from happening. And then the one
1:15:08
for the stop is for the ratcheting to make sure we don't introduce any new
1:15:14
things that break our linting rules. So that way the LLM is not able to produce
1:15:19
something bad. I mean the code could still suck, but it at least follows our linting rules and that's all that really
1:15:26
matters, right? Let's now talk about some strategies for debugging using Claude. I'll give you just a couple of
Debugging and Listeners
1:15:32
different things that you could do. Well, obviously you can create tests as
1:15:37
much as you can research the idea of pure functions. If
1:15:42
we can isolate some functionality that doesn't have any side effects, it can be a very effective tool to prevent
1:15:49
regressions. So a quick visual of this is say you have some row in a database
1:15:56
or just some input and then you have a function
1:16:03
And this gives you some result. This is honestly drawing this out now
1:16:09
seems kind of silly, but basically let's say you change this code and then we have the result after the change.
1:16:20
If these are the same thing, then we can have a high level of confidence that we didn't break something if we're having
1:16:27
strong enough test coverage for the different possible scenarios. Literally all I did with this diagram was to say
1:16:34
that if you change your code and you have the same result, the test works.
1:16:39
That's literally what testing is for. So, I don't think the diagram really helped now that I drew it out, but that
1:16:44
is a way you can make larger changes and have confidence that they work. They're
1:16:50
not breaking existing stuff. So, say I have some code that evaluates coupons and then I introduce some new coupon
1:16:56
type that's tied to accounts.
1:17:04
So, we need to go back and change some of the coupon evaluation logic. And now
1:17:09
I have to go through every single possible scenario where a coupon is used on my site to make sure it's still
1:17:15
working the way we would expect. That's exhausting. And doing these smoke tests
1:17:20
across a very large app can take a lot of time. So the more tests you can add,
1:17:27
the less risk there is to make these kinds of changes. So when I was starting out, I was often too intimidated to
1:17:35
touch anything that was working. So I would often intentionally tell the LLM
1:17:40
not to touch any existing code and to only add new capabilities. So I would
1:17:46
get some duplicate components or things like that or some duplicate functions and that was fine because I knew it was
1:17:52
protecting what I already had. That is basically the sloppy way of developing.
1:17:58
What we want to do instead is not repeat oursel and protect our prior behaviors
1:18:04
through tests. So the other thing that AI can be very good at is tracing
1:18:10
requests from beginning to end because it's much smarter at jumping between functions and different things. So I
1:18:16
would highly encourage that. If you are making a request to your app and getting something that you don't expect back,
1:18:23
instead of taking that error and trying to fix that specific thing, you could ask the AI to trace the entire end to
1:18:30
end from your request to the response. And that might help you be able to
1:18:35
identify where some transformation is happening that you wouldn't expect. Especially with the AI being able to run
1:18:41
its own servers and look at logs and all of these things, it's able to do quite a
1:18:46
lot without you getting involved. Reading logs is a superpower as well, especially if you can get any kind of
1:18:53
production logs to your LLM. The LLM can then basically sift through those, find any patterns, figure out connections
1:19:01
between different requests that might be causing errors. So maybe you're having
1:19:06
some things time out or you're having some issues pop up. Well, it might be able to look back to some other requests
1:19:12
and figure out, hey, you're getting some denial of service attacks or whatever it might be. I'm just kind of making stuff
1:19:18
up. The LLM is really good at this stuff because if you think of what the core of AI is, it's making associations from
1:19:26
inputs to outputs
1:19:31
where the dimensionality of the input is way too large for us humans to make the
1:19:36
associations. That's where AI is extremely talented. So anything of this
1:19:43
nature, use AI for which reading logs and debugging is something that matches
1:19:48
this very well. We have a ton of different things in the input. How can we associate inputs to the output to
1:19:55
figure out what is going on over here that's causing problems over here with the error logs. So I just wrote a skill
1:20:01
that instructed how I wanted it to read through any kind of logs and make associations. and I could pass it
1:20:08
certain requests and it'll just do it for me. Much easier than me going to have to read through a bunch of logs and
1:20:14
I can ask it arbitrary questions which is just super handy. The last thing I wanted to mention is monitors and this
Monitors
1:20:20
is a way for things to be given to your LLM in real time. So for example, an
1:20:26
event happens on your production website and you get a log, that log is forwarded
1:20:32
to your LLM and it can do any kind of debugging or figure out if it's a problem. This is how you can have
1:20:38
autonomous AI that's not just building but actually running your operations. So
1:20:44
if you want to do additional research on that, I would highly encourage it. That's probably like the next big thing I'm going to spend a lot of time on. So
1:20:51
I've already really locked in all of the building side of things. Now I want to master the operations, making it run my
1:20:58
actual software, keeping it working, making sure everything is solid. So it's basically watching and monitoring 24/7.
1:21:05
And this is a layer above regular monitoring like alerts or observability
1:21:11
that you might get with a production environment because it's not just looking for a specific thing or triggering when we have a certain number
1:21:17
of requests or a certain error. It's able to reason about the logs, think
1:21:23
through if any strange things are happening and what they might be. Last thing I got for you, and I'll try to
Approach to Building with LLMs
1:21:28
keep this one quick, the approach you take to building with LLMs. So, I think
1:21:33
you'll progress over time, starting to use it as an assistant, starting to have it actually write some code for you and
1:21:39
work back and forth, starting to have it write bigger sections and then you just review the code to then having multiple
1:21:46
things running at the same time. So, I will often have either multiple sub agent bundles running at the same time
1:21:53
or multiple windows of Claude running at the same time. So literally at points I'll have on my desktop four clawed
1:22:00
windows and I'll do different things in these different clawed windows which might
1:22:07
sound crazy but if you recall from my earlier explanation I've set it up so that a feature could potentially take an
1:22:13
hour or a couple of hours to go through the full build and be verified. So doing
1:22:20
that across four is quite easy. Or I could launch multiple bundles within a
1:22:25
single instance and not have to manage multiple windows. Whatever approach you take is totally up to you. I tend to
1:22:31
like some spread out. So I could keep one for some smaller running task, have one doing some larger features, doing
1:22:38
some research, like whatever it might be. just having the availability to jump between different things without having
1:22:44
to interrupt the flow of a certain instance because I like to keep the
1:22:50
conversations focused. Anytime you switch topics, it's really recommended to clear your context window so you're
1:22:56
not polluting the context you're working in. So if you're doing something like this, what I would recommend is frequent
1:23:02
commits so you're not just doing these massive commits. That's one of the big
1:23:07
reasons I started using pre-commit hooks which would prevent slop from being committed. But the problem with that is
1:23:14
I would end up getting these massive commits and anytime I wanted to commit I had to fix all these issues. So I just delayed it. So now what I do is I commit
1:23:21
freely. I don't care about what's committed. I only care about what's pushed to production and that's a
1:23:26
different step in my mind. So it's not an automatic transition. But you can do things like researching work trees if
1:23:34
you want isolated code for your different agents that are running. They can work on individual features and then
1:23:40
merge those into the main branch you're developing on. That's a very common approach when you want to run multiple
1:23:47
LLMs on the same codebase. Personally though, I have not done that. I just try
1:23:53
to keep whatever things that are being worked on scoped to different areas of my app. So I'll be cautious to have two
1:24:00
things working on the same type of thing at the same time. So if I'm working on
1:24:06
Slack notifications here, I'll work on the MCP layer over here and then I might
1:24:11
do some design work over here. You get the idea. I'm just giving some examples. I don't have multiple things touching
1:24:18
the same files. There might be some overlap, but it's usually smart enough to be able to figure that out. And I
1:24:23
think I have added to the instructions that I may have multiple agents running. So if there's a change in the file,
1:24:28
typically you're going to want to respect those changes because that might be a different feature that's being
1:24:34
worked on. That alone has been enough for me to avoid work trees, but I may end up exploring that if I find this
1:24:40
gets too sloppy. But for me, as a single developer working on features, it works
1:24:45
really great. Doing this approach, you might be thinking, well, that's going to produce so much code. How do you have
1:24:50
the time to like read everything? Well, for certain things that are super
1:24:56
low stakes, I don't read the code. So, for example, I have a page builder and
1:25:01
the entire rendering of that is JSON structure and it's designed that any previous versions should still render
1:25:09
properly. So, I can make any changes freely and it's not going to break anything. So, that's something I've just
1:25:15
really delegated to the LLM as well as any kind of design work. I don't touch the code. I don't review the code. I
1:25:21
just make sure the stuff looks correct. I make sure the structure of the code is okay as well, like we're using separate
1:25:27
CSS files or whatever it might be. So really, the more important the code, the more attention I give it. But right now,
1:25:33
I'm working as an operator managing these different LLMs and then bringing
1:25:39
all of that together to actually make the deployments to production. So I
1:25:44
really just review what they do. That's what's working for me right now. Like I mentioned, I go through kind of cycles.
1:25:50
Like for a while I was like, "No AI. I'm coding everything by hand." And I do have some days like that where I'm just
1:25:56
like, I'm not doing the AI development. I just want to code some stuff myself, get a feel for it before I start having
1:26:04
the AI build for me. That's a really good way to figure out the right way of doing things. So, for example, I was
1:26:10
working on something that would summarize some notes and bring it into a chat system and it was using vectorized
1:26:18
data in the database and all of this and it was relatively complex because I've never done any of that up until that
1:26:24
point. So, just saying, "Hey, AI implement this for me." I would generate a bunch of code I didn't understand. So,
1:26:30
I actually took a couple of days to do it myself. then having the AI just extend that is so much more reasonable
1:26:37
cuz I already understand the core structure and I could just review the changes. The last thing with that is I
1:26:42
have claude review PRs to go into main and I found those to be extremely
1:26:47
valuable to find any issues especially when it's not my current instance of claude because it's not going to be
1:26:53
biased by the things it did. It's a separate LLM, still clawed, but it's,
1:26:58
you know, cleared context reading the code with the intentions of finding any
1:27:03
issues. So, very similar to my verifier agent, but it's specifically tied into
1:27:08
GitHub and it works very well. So, I think all of this AI stuff is crazy. And the biggest thing is to challenge
1:27:14
yourself to raise yourself up in what you are building, not worrying about all of the little details. If you know the
1:27:21
proper standards are being followed and you can review the critical things, you can build quality software with AI.
1:27:27
Hopefully, everything we've talked about in this lesson will help you do that. Takes practice even because I think a lot of people are stuck in the mode of
1:27:33
like if I'm not coding it myself, then it's not going to be good. But just think of a software or before AI, you
1:27:41
didn't just have all developers. You'd have senior level developers, staff level developers. And the higher you go
1:27:47
up, you start thinking of bigger problems and you're doing less implementation. You're just reviewing
1:27:52
code and actually driving the features of the app. That's something that AI has unlocked for many people because we no
1:27:58
longer have to stress about all of the little details. We can focus on features and building larger software.
1:28:06
So, if you don't develop that skill, you're going to struggle and you're probably not going to get far.
Next Steps
1:28:11
So to wrap up, I just wanted to remind you I have the course down in the description. I would really recommend
1:28:17
that if you want everything we talked about in this lesson in a lot more detail with reference files and examples
1:28:22
and everything like that. Check out that course. It's in my opinion probably the best resource you could get to
1:28:28
drastically improve your effectiveness and productivity so that you can get 10 times the result when you're building
1:28:34
with AI. Other than that though, I will be posting a lot more content. So please be sure to subscribe and I will see you
1:28:39
in the next lesson. Peace out.