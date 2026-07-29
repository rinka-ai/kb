---
id: article-2026-06-28-the-future-is-domain-specific-agents
type: source
title: "The Future Is Domain-Specific Agents"
path: raw/articles/user-provided/2026-06-28-the-future-is-domain-specific-agents.md
author: Justin Schroeder
publisher: AI Engineer / YouTube
url: https://www.youtube.com/watch?v=spNAUEgq_A8
date_published: 2026-06-28
date_added: 2026-07-29
tags: [agents, domain-specific-agents, vertical-agents, multi-agent-systems, orchestration, context-engineering, agent-harnesses, agent-tools, sandboxing]
status: active
quality: medium
summary: Justin Schroeder argues for composing narrow, portable agents that each own domain-specific context, tools, state, rules, and execution boundaries instead of continually inflating one general agent's context.
related: [domain-specific-agents, multi-agent-systems, context-engineering, agent-frameworks, agent-harnesses, agent-tools, agent-security, llm-agents, 2026-06-11-building-good-vertical-agent]
---

# The Future Is Domain-Specific Agents

## Source Metadata

- Path: raw/articles/user-provided/2026-06-28-the-future-is-domain-specific-agents.md
- Local source file: `/Users/josemanuelcerqueira/.codex/attachments/d660958e-aeb7-4679-a217-0271ba751e8e/pasted-text.txt`
- Speaker: Justin Schroeder, StandardAgents
- Publisher/channel: AI Engineer
- Published: 2026-06-28
- Runtime: 30:38 (`1838` seconds)
- URL: https://www.youtube.com/watch?v=spNAUEgq_A8
- Verified title: The Future Is Domain-Specific Agents - Justin Schroeder, StandardAgents
- Transcript SHA-256: `e553a0feb774ec550c7d5f99c1f00184a89fd75dd61f6afc3196b1602f39fda6`
- Source handling note: The user-supplied timed automatic transcript is preserved verbatim in `## Source Text`, including caption errors and malformed timestamp strings.
- Completeness note: The supplied transcript ends mid-sentence at approximately `30:15`, while the video metadata reports a `30:38` runtime. The final roughly 23 seconds are not present in the attachment.
- Verification boundary: Architecture claims are practitioner evidence from a speaker building an unreleased product. The reported token-efficiency, model-cost, and token-price figures are not independently verified and do not include enough methodology to treat as benchmarks.

## TL;DR

Schroeder proposes a composition-first agent architecture. Instead of continually adding tools, skills, integrations, and domain instructions to one general agent, package each domain as a full bounded agent with its own system prompt, tools, message history, loop, hooks, rules, filesystem, sandbox, permissions, and model choice. A coordinator sends compact task messages to these agents and receives compact results.

The durable KB contribution is the boundary rule: specialize when a domain has separable context, capabilities, authority, state, and an evaluable task contract. This can reduce irrelevant context inside each worker and make model selection or capability restriction more precise. It does not automatically reduce total system cost or improve reliability, because routing, handoffs, retries, coordinator context, duplicated prefixes, and cross-agent failure propagation remain system-level costs.

## Key Claims

- Agents can be framed as deterministic software that harnesses nondeterministic model outputs in pursuit of an objective.
- Businesses build custom agents primarily because they need their own data and workflows integrated with AI.
- Production agents are difficult because orchestration, provider abstraction, durable execution, validation, stop conditions, observability, portability, and composition remain unresolved engineering concerns.
- MCP is currently most successful as a tool-distribution mechanism, but distributing tools alone does not package domain judgment, state, workflow, or runtime policy.
- Adding tools, skills, and integrations to one general agent resembles inheritance: it works initially but eventually inflates context and creates diminishing returns.
- Composition means giving each domain a complete narrow agent rather than only a tool server or documentation file, then coordinating those agents through compact natural-language task/result messages.
- Domain-specific agents may use smaller or different models when their tasks and context are sufficiently constrained.
- Narrow agents can make capability limits easier to express because each execution unit exposes fewer actions than a general-purpose agent.
- An agent package should include functions, prompts, other agents as callable capabilities, hooks, run rules, a filesystem, and sandboxed code execution.
- Domain-specific agents can be nested recursively beneath coordinator, application, asset-generation, legal, or compliance agents.
- The speaker predicts rapid growth in domain-specific-agent frameworks during late 2026 and multi-agent orchestration during 2027.

## Important Details

- The talk contrasts a general agent loaded with travel, Figma, Playwright, Gmail, Google Sheets, React, linting, and GitHub capabilities with separate Gmail, travel, Figma, and Sheets agents.
- A specialist is not merely a filtered tool set. In the proposed architecture it owns its own prompt, context, history, loop, and execution environment.
- The coordinator-to-specialist message is intentionally narrow, such as asking a Gmail agent to retrieve one recent message, so the specialist does not inherit the coordinator's full conversation.
- The talk reports “over 80% token efficiency” for unspecified tasks, but does not define the metric, baseline, evaluation set, failure handling, or whether coordinator and retry tokens are included.
- The talk gives a `137×` per-task cost comparison between named models, but the transcript does not provide enough pricing, task, quality, or retry detail to reproduce it.
- The talk reports that token prices rose `29%` after an IQ adjustment and `76%` without that adjustment during 2026. The underlying tracker, intelligence measure, model basket, and calculation are not identified in the transcript.
- The proposed security benefit is capability narrowing: a domain agent can be authorized only for its explicit task surface. This benefit disappears if nested agents share ambient credentials or an unrestricted execution environment.
- The proposed scaling benefit comes from treating agents as independent execution environments that can run in parallel or in different regions.
- Portability is an aspiration in the talk. A real package format would still need dependency, model, secret-reference, identity, filesystem, sandbox, network, state, observability, versioning, and task/result contracts.
- Local context reduction is not the same as total token reduction. A composed system must count the coordinator, routing, handoffs, summaries, duplicated prefixes, retries, and verification.
- The source's ending is incomplete because the supplied transcript stops mid-sentence before the video ends.

## Entities

- People: Justin Schroeder
- Organizations: StandardAgents, AI Engineer, Vercel
- Agent products/projects mentioned: Claude, Codex, OpenClaw, Hermes, Eve
- Protocols and runtimes: Model Context Protocol, Vercel AI SDK
- Integration examples: Figma, Playwright, Gmail, Google Sheets, GitHub, Salesforce, Google Workspace
- Proposed agent components: model, system prompt, functions, prompt tools, agent tools, hooks, rules, filesystem, sandboxed code execution, message history

## My Notes

- The talk fills a gap between [[2026-06-11-building-good-vertical-agent]] and [[multi-agent-systems]]. Wang explains how to compress one vertical agent's domain task distribution; Schroeder explains when to make the vertical itself a composable execution unit.
- The strongest synthesis is now captured in [[domain-specific-agents]]: specialization should follow stable context and authority boundaries, not job-title metaphors or a desire to create an agent for every tool.
- This source strengthens [[context-engineering]] by treating context partitioning across agents as an alternative to putting every capability into one prompt.
- It strengthens [[agent-tools]] by distinguishing a tool endpoint from a domain capability that also owns instructions, state, policy, and an execution loop.
- It strengthens [[agent-frameworks]] and [[agent-harnesses]] by identifying a portable specialist package shape, but the runtime still needs stable orchestration, durability, identity, and telemetry below any particular topology.
- It strengthens [[agent-security]] only conditionally: smaller capability surfaces reduce blast radius when credentials, network access, filesystem scope, and delegation rights are narrowed at the same boundary.
- The talk's agent/harness conflation is operationally understandable but analytically lossy. This KB keeps the distinction because the model-driven actor and the deterministic runtime around it have different evaluation, portability, and governance responsibilities.
- The talk's quantitative claims should remain source claims until task definitions, baselines, quality thresholds, retries, total-system accounting, and reproducible measurements are available.

## Open Questions

- Which domain boundaries are stable enough that context savings exceed routing and maintenance overhead?
- What task/result contract preserves enough evidence for the coordinator without recreating the specialist's full context?
- How should total cost be measured across the coordinator, specialists, retries, summaries, verification, and idle execution?
- When does tool search or progressive disclosure solve context inflation more cheaply than creating another agent?
- How should identities, credentials, delegation ceilings, and audit traces propagate through nested agent calls?
- What state belongs to the specialist, the coordinator, or a shared durable store?
- What package format could make a specialist portable across local, hosted, and sandboxed runtimes without bundling secrets?
- How should routing errors, conflicting specialist outputs, partial failures, and cross-agent policy disagreements be evaluated?
- Which domains actually preserve task quality on smaller models, and what escalation policy is needed for the long tail?
- Does the claimed token efficiency survive end-to-end accounting on representative workloads?

## Related

- [[domain-specific-agents]]
- [[2026-06-11-building-good-vertical-agent]]
- [[2026-01-23-building-multi-agent-systems-when-and-how-to-use-them]]
- [[multi-agent-systems]]
- [[context-engineering]]
- [[agent-frameworks]]
- [[agent-harnesses]]
- [[agent-tools]]
- [[agent-security]]
- [[llm-agents]]

## Source Text

Okay, so I'm going to be talking about domainspecific agents and why I really think that they are going to play an
0:1111 secondsunbelievably important role in the future of AI and in the future of how we build agents. To get started real quick, my name is Justin Shrader. Uh you can
0:2020 secondsfind me on XJP Shrader. And um I work at a small company called Standard Agents, which nobody's heard of right now because
0:2828 secondswe're still kind of in stealth mode. Um after this talk, if you're interested, feel free to reach out to me and uh I can let you know a little bit more.
0:3737 secondsMostly I'm known for doing a lot of different open source projects. Uh Demox, which is a great multiplexer for
0:4444 secondsall of your coding agents. Uh Aererojs, which is sort of like a UI framework, sort of like React for um the agentic
0:5151 secondsera. a bunch more that I won't get into, but you know, maybe check them out if you're interested. Okay, I think we can
0:5858 secondsall agree that the moment in time that we are in is very similar to the industrial revolution. Um, in fact, it
1:051 minute, 5 secondsmight be like an accelerated industrial revolution. Maybe it's a bigger deal, but it's certainly not smaller. I probably don't need to convince you of that if you're listening to one of these
1:131 minute, 13 secondstalks. Um, but that is the moment we find us find ourselves in. So I actually think it's helpful to go back and sort
1:201 minute, 20 secondsof look at what was the key catalyst of the industrial revolution. And ultimately it was that we learned how to
1:271 minute, 27 secondsharness energy with machines. We learned how to harness energy with machines. And what's interesting is that in this next
1:351 minute, 35 secondsera we are essentially learning to harness intelligence with agents.
1:411 minute, 41 secondsAnd agents I think can be thought of a little bit like the machine of yestery year. It's the thing that is going to
1:481 minute, 48 secondsuse the intelligence. Not so much us, but the agents. What's interesting about
1:551 minute, 55 secondsthat is I bet if I was in an actual room with you guys and and we all put up our hands. I bet a lot of you when I say
2:032 minutes, 3 secondswhat is an agent instantly have examples that pop into mind, but also probably can't pull out a definition immediately.
2:102 minutes, 10 secondsSome of you maybe can. Um, but the reality is that we haven't even coalesed on a definition of what an agent is,
2:192 minutes, 19 secondseven though we're well into the agentic era at this point. And I think that's kind of interesting. Um, here's my definition. You can feel free to agree
2:272 minutes, 27 secondswith it or not, but agents are deterministic software that harness the nondeterministic results produced by
2:352 minutes, 35 secondsmodels in pursuit of some desired objective. Now, deterministic software might make you
2:442 minutes, 44 secondsthink more like a harness. And I actually think the distinction between an agent and a harness is really pedantic, not very helpful. Um, and for
2:532 minutes, 53 secondsthe most part, in most cases, you can just conflate the two. A harness is an agent and an agent is a harness. Okay?
2:592 minutes, 59 secondsAnd for the for the purposes of this talk, we're going to go ahead and just move forward with that. I think you could probably make some good arguments for why one is the other and vice versa,
3:083 minutes, 8 secondsbut really not important right now. Now, if you did have some examples pop to mind, they might have been like Claude
3:163 minutes, 16 secondsor Codeex, um, you know, Open Claw, Hermes, but you know what's interesting is I bet if you went out onto, you know,
3:243 minutes, 24 secondsthe the streets of corporate America in any city, maybe not San Francisco, but any city in America, and you asked
3:313 minutes, 31 secondssomebody just in an office building, could you name an agent by name? I think some people are gonna get Clawed.
3:433 minutes, 43 secondsSome people might get Codeex and that's about it. I don't think hardly anybody's going to be getting Open Claw or Hermes.
3:503 minutes, 50 secondsUh and and really even Claude, I don't know that people would even know that that's an agent. These things are not
3:573 minutes, 57 secondswell understood. And yet what's so crazy is everybody is building agents. I have
4:044 minutes, 4 secondsa real estate agency down the street that's building agents. I know in like independent private insurance brokers
4:114 minutes, 11 secondsbuilding their own agents. I know Fortune 500 companies, lots of them building their own custom agents.
4:184 minutes, 18 secondsEverybody is trying to build their own custom agents. And I know people don't believe me. Uh but go talk to them. Just
4:254 minutes, 25 secondsgo talk to people. They are trying to build custom agents. And I can't help but wonder why. Nobody seems to be
4:334 minutes, 33 secondsasking this question. Why? There's already AI everywhere. You can get on chat GBT all the way down to some open
4:404 minutes, 40 secondssource model from China on some you know rickety website. There's everything in between but still people want to build custom agents and ultimately it comes
4:484 minutes, 48 secondsdown to integration. Businesses want their data properly integrated into AI.
4:554 minutes, 55 secondsThey they believe and are probably right that if they appropriately leverage AI, they're going to have these dramatic gains in their business and so on and so
5:045 minutes, 4 secondsforth. So they need to figure out how to get integrated and building their own custom agents is obviously a way to do
5:115 minutes, 11 secondsthat and it's one of the first ways that they discover um as a mechanism for doing it. The problem though is that
5:185 minutes, 18 secondsagents are really hard. You have to take very very careful care of the agentic
5:255 minutes, 25 secondsloop and make sure that it's properly orchestrated. There are a ton of different provider abstractions you need to think about. Um, fortunately there's
5:325 minutes, 32 secondssome good tools coming out around that, you know, like the the Versel AI SDK is great. Um, durable execution. You need
5:405 minutes, 40 secondsto make sure if there's faults we can pick back up. These are relatively hard problems. Um, especially if you're thinking about it at scale. And the reality is there's just tons more.
5:505 minutes, 50 secondsThere's all kinds of validations and stop conditions and so on and so forth.
5:545 minutes, 54 secondsAnd so what often happens is people do try to build their own custom agents and they sort of work as a demo but but not much more than that. Um and really it
6:036 minutes, 3 secondsturns out that it's an absolute nightmare for people. Um building robust agents is just hard. And if you go talk
6:116 minutes, 11 secondsto anybody in an IT department, they are pulling their hair out because there are so many different concerns. Um there's
6:186 minutes, 18 secondsno defined way to build an agent right now. Like actually no defined way. The closest thing maybe is uh Eve that just
6:266 minutes, 26 secondscame out from Verscell is maybe like the closest thing. Um but in reality everybody's kind of coming up with their own way to do it. Um telemetry and
6:356 minutes, 35 secondsobservability on these agents is unbelievably hard especially at scale.
6:386 minutes, 38 secondsLike if you want to know exactly what is getting transmitted on every single step of every single turn of your agent so that way you can diagnose it and
6:476 minutes, 47 secondsfine-tune it and make sure things aren't going off the rails. That is very hard to do. Uh, agents are also not portable.
6:546 minutes, 54 secondsSo, if I do get a good agent working, if I've managed to climb to the top of, you know, this mountain and I've got a good
7:017 minutes, 1 secondagent that's finally working well, well, it works well on my machine. [laughter] But if I try to pass that off to somebody else, there's a very high
7:097 minutes, 9 secondslikelihood that between all of the environment variable configurations and and system requirements and and run times, there's a good chance it's not going to run on that person's machine.
7:207 minutes, 20 secondsAnd they're not composable. So even if I get, you know, a really good chatbot working for my university, the chances
7:277 minutes, 27 secondsthat I'm going to then be able to reuse that for another thing is very, very low. I can't just easily share that. So
7:367 minutes, 36 secondswhat often happens is after a short pursuit towards agents, people kind of back away. They say, "Okay, fine. No more agents. No agents. Instead, we're
7:447 minutes, 44 secondsgoing to do the MCP thing. We've heard about this. It works." And sure enough, model context protocol, it does work.
7:527 minutes, 52 secondsAnd really, it it works pretty well to take, you know, your corporate information like Zillow's information, and then shove that into one of these
8:008 minutesreally large uh ex pre-existing agents, something like Claude or ChatGBT, which I would consider a large generalpurpose
8:098 minutes, 9 secondsagent. Um, and it and it sort of works like that. Uh, and it works okay. But if you take a look, this is actually from
8:168 minutes, 16 secondsthe MCP website. And if you take a look at what is supported in MCP clients around the world, you will notice that
8:258 minutes, 25 secondsonly one of these columns is actually filled out all the way down. And that of
8:318 minutes, 31 secondscourse is tools. So MCP has become a de facto tool distribution mechanism for
8:398 minutes, 39 secondsagents. So, if I need to get my company's tools into that other agent, then MCP is a good way to do that. It
8:488 minutes, 48 secondshas not proven to be great at providing other value yet. And frankly, tools are just not enough.
8:578 minutes, 57 secondsYou know, I I I like to joke that we didn't land a man on the moon by giving one guy a ton of tools. That's not a
9:059 minutes, 5 secondsrealistic way uh to get a really large project done.
9:119 minutes, 11 secondsSo uh you know maybe MCP is not the way but aha we have skills. We have skills and skills are great. Um I I I actually
9:209 minutes, 20 secondsdo enjoy skills. I'm sure you do too. We install them all the time for all kinds of things. And fundamentally what a skill is is a markdown file which basically works as documentation.
9:309 minutes, 30 secondsNow, interestingly, there's lots of research out there that shows that if you use very many of these, it actually makes your agent substantially worse,
9:389 minutes, 38 secondsbut they do work as documentation for various complex things. So, you know, back to the analogy of a man getting to
9:479 minutes, 47 secondsthe moon. It's a little bit like just giving this guy, you know, a ton of documentation. And the documentation's going to help, but it's not the
9:549 minutes, 54 secondsfundamental problem. So, what's the fundamental problem? Okay, let's build up a basic agent stack here. Let's start
10:0210 minutes, 2 secondswith a model. All agents start with a model. Big one, small one, doesn't matter. They start with a model. Then you have something like a system prompt
10:1110 minutes, 11 secondson top of that, which tells the model what its role in the grand universe is. Sort of like its its life objective.
10:1910 minutes, 19 secondsThen we have tools, the things that it can actually do, the effects it can take. And then skills would be layered on top of that. And then MCP would be
10:2910 minutes, 29 secondslayered on top of that. And then finally, you have all the messages from the conversation. That is roughly the stack of information that gets passed along within the runtime of an agent.
10:4110 minutes, 41 secondsAnd if you take a look here, almost all of it is context.
10:4810 minutes, 48 secondsBasically everything, the system prompt, tools, skills, all of that is stuff that ends up in the context of the agent. And
10:5610 minutes, 56 secondsso basically people are trying to solve the integration problem by working on
11:0311 minutes, 3 secondsthe context or the model. These are the two areas where we constantly see new advances. We also see you know new new
11:1211 minutes, 12 secondsthings come out like skills and in MCP um new technologies, new protocols. They are all coming out in the in the area of the context and the model.
11:2511 minutes, 25 secondsSo, how does it actually work then?
11:2811 minutes, 28 secondsWell, basically, you work at a company, you occasionally need to do some business travel. So, you've got a couple travel uh MCPs installed. You've also
11:3711 minutes, 37 secondsgot, you know, Figma and Playright installed on yours. And all of these are building up in that context layer. And then you've got some, you know, Gmail
11:4511 minutes, 45 secondsMCPS to go check your mail for you and some Google Sheets to go fill out some other uh some other uh expense reports or something like that. And then you've
11:5311 minutes, 53 secondsgot skills. You're a developer. So you've got some React fixers and llinters. This is actually I think like the number one or the number two most
12:0112 minutes, 1 secondpopular MCP server that's out there. Um maybe you've got uh Matt's grill me skill or or maybe you've got the GitHub
12:0912 minutes, 9 secondsskill. And basically what you're doing is you are inflating that context layer.
12:1412 minutes, 14 secondsAnd we have a term for this in engineering. It's called inheritance.
12:1812 minutes, 18 secondsThe idea of inheritance is you take an object and then you add more attributes to it to allow that one object to have
12:2712 minutes, 27 secondsother properties, right? And that's exactly what we are doing here with an agent. We're saying this agent is pretty
12:3512 minutes, 35 secondsgood, but if we add all of these add additional extra layers, then the agent can do stuff that it previously couldn't
12:4312 minutes, 43 secondsdo before. That is exactly what inheritance is. And the truth about inheritance is it works. It does work.
12:5112 minutes, 51 secondsThat's why these things are out there and they are working.
12:5512 minutes, 55 secondsBut there's an old saying, composition over inheritance. And it turns out this
13:0213 minutes, 2 secondsthis is as old as time. Eventually inheritance starts to break down.
13:0713 minutes, 7 secondsImagine like you know, okay, I've got five skills on uh chat GPT or on or on Claude, excuse me. And uh that works
13:1513 minutes, 15 secondspretty well. Now what if I have a hundred skills? What if I have a thousand skills? There's some point at which I get diminishing returns from
13:2313 minutes, 23 secondsadding additional context. That's that's just obvious. We all kind of understand that implicitly. So is there an
13:3013 minutes, 30 secondsalternative? Well, composition is the alternative to inheritance. It looks something like this. So like imagine we have another little agent and again
13:3813 minutes, 38 secondswe're trying to provide Figma as an as a as a thing that can be done by our primary agent. Well, what we could do is
13:4713 minutes, 47 secondshave a tiny little agent where the actual system prompt of the agent is written specifically to be a Figma agent. It knows everything about Figma.
13:5713 minutes, 57 secondsIt knows all of its all of its context, all of its API, all of the right places to click and the things to do and mouse movements to make and everything like
14:0614 minutes, 6 secondsthat. And then it has these precise tools that it needs to perform all of those actions and nothing more. Just
14:1314 minutes, 13 secondsthat. And then a very small message history which just has to do with the Figma portion of this. And then you can
14:2114 minutes, 21 secondshave more of these. You can still have your Gmail and your travel and your Google Sheets and all of that kind of stuff, but each of them is a separate
14:2814 minutes, 28 secondsisolated agent, a full agent, not just a little server with tools on it. It's a full agent with its own message history,
14:3614 minutes, 36 secondsits own agentic loop. And then above these, you have a coordinator. And the
14:4314 minutes, 43 secondscommunication mechanism for all of these small agents speaking to the larger agent above it is just English. They
14:5214 minutes, 52 secondsjust talk to each other the way a human does. So if the primary agent is saying, "Oh, I should I should check my mail to
15:0015 minutessee if there's anything about going on a trip." Well, it knows to go ask Gmail for any new uh emails about a trip.
15:0815 minutes, 8 secondsThose funnel their way back up, says, "Oh, yeah, actually there's a trip coming up to Los Angeles this weekend."
15:1515 minutes, 15 secondsAnd then it can go to our travel agent and start to make bookings. That's kind of a a rough idea of how something like this could work.
15:2615 minutes, 26 secondsAnd the reality is it does work. And we know it works because this is actually how we got to the moon. There were teams
15:3415 minutes, 34 secondsof experts. Teams of experts with faces that looked like that and faces that looked like that. Each of them with
15:4215 minutes, 42 secondsdifferent skills and capabilities and faces that looked like that. This is the Apollo 11 launch day. And look right
15:4915 minutes, 49 secondshere. There's an agent. I just found an agent sitting right there. [laughter] That brain of his is that's his LLM. And
15:5615 minutes, 56 secondshere's his tools right there on the dashboard. Those are the tools. Now, he didn't have all the tools. He just had those tools. And he was really, really,
16:0416 minutes, 4 secondsreally good at them. And then look at that mouth. That's the messages. Uh we are used to this. We can understand
16:1216 minutes, 12 secondsthis. It implicitly works. It's almost a form of biomimicry for the agentic world. um it works and I call them domain specific agents.
16:2316 minutes, 23 secondsUm I don't think I was the first person to utter the words domain specific agents. Certainly not the first person to have this idea. Um but that is what I
16:3116 minutes, 31 secondswant to talk to you about. Agents that are just targeted to very specific domain. And we over here at Standard
16:4016 minutes, 40 secondsAgents have been building this ecosystem for quite some time. So we've gotten to have a really good inside look at how they actually work. And I'm not ready to
16:4816 minutes, 48 secondscome out here and announce a product or anything like that. Um, but I can give you a little bit of a peak. First of all, they are far more token efficient.
16:5616 minutes, 56 secondsFar more token efficient. We regularly see over 80% token efficiency for any given task. Now, it's a little more
17:0517 minutes, 5 secondscomplicated because you have to define those tasks a little bit more ahead of time. But if you can have an agent portability where I can take that Gmail
17:1417 minutes, 14 secondsagent, squeeze it up and then send it to somebody else, we can create an ecosystem where we don't have to create every one of these skills and
17:2217 minutes, 22 secondscapabilities. But within that domain, you're going to get dramatic efficiency.
17:2817 minutes, 28 secondsUm, and part of the reason is if you think about the way that the context works, I don't need to have the entire
17:3517 minutes, 35 secondscontext of the conversation when I make a choice to do something. Instead, my primary coordinator level can just ask
17:4417 minutes, 44 secondsthe Gmail, uh, hey, get that last email from Debbie. And that is the totality of the context. It literally just has the
17:5117 minutes, 51 secondssystem message, its tools, and that message that came in. And so, it is then able to perform this very targeted, very
17:5917 minutes, 59 secondsspecialized, tiny little thing without all of the surrounding context.
18:0618 minutes, 6 secondsIt's also far more practical with small language models.
18:1218 minutes, 12 secondsIf you look at the difference in two models like DeepSeek uh V4 Flash and uh
18:2018 minutes, 20 secondsFable 5, the cost difference is mind-boggling. It is
18:2818 minutes, 28 seconds137 times cheaper than Fable per task.
18:3518 minutes, 35 seconds137 times. Now granted, if Deepseek V4 Flash fails over and over and over again
18:4318 minutes, 43 secondsto do the job, then not only is it going to be, you know, not that much cheaper, it's also going to be much more annoying
18:5018 minutes, 50 secondsto use it. But that's why domain specific agents are so great because you don't need to have the V4 flash do everything.
19:0019 minutesInstead, it only needs to do the tasks that have been specifically picked for it to do. And with a very minimal
19:0719 minutes, 7 secondscontext, it can execute those very faithfully. So, you get these dramatic cost reductions, not only with the token
19:1519 minutes, 15 secondsefficiency, but also because you can use much smaller language models and even non- language models. You can use image
19:2319 minutes, 23 secondsgeneration and diffusion models. You can use all kinds of other models for smaller tasks.
19:2919 minutes, 29 seconds[snorts]
19:3019 minutes, 30 secondsYou can also enforce really strict limits on the capabilities. And I think you know what I'm talking about. I'm talking about this. Uh we are all flying
19:3819 minutes, 38 secondsawfully close to the sun nowadays. We're everybody's just bypassing permissions left and right. And of course you have
19:4619 minutes, 46 secondsto because a coding agent with a big model can do anything. And so we use it to do everything.
19:5619 minutes, 56 secondsIn a world that would be powered by smaller domain specific agents, those agents can't do everything. They can only do the things that are already explicitly approved for them to do.
20:0620 minutes, 6 secondsDoesn't mean that you still can't have permissions and permission dialogues, but you are opting into a much more controlled ecosystem. And I promise you
20:1620 minutes, 16 secondswhen you explain that to Doug in IT, he it puts his heart at ease understanding the difference between
20:2420 minutes, 24 secondsthose two. [snorts] And uh fourth, these have excellent scaling characteristics because each of these agents is its own small little
20:3220 minutes, 32 secondsexecution environment. You can parallelize them. You can put them on the cloud very easily without needing like a giant VPC up there. you can run
20:4120 minutes, 41 secondsthousands of instances all at the same time um in in all kinds of regions of the world. They don't actually need to
20:4820 minutes, 48 secondsbe uh you know geographically colllocated or anything like that. Um so they have very very good scaling characteristics.
20:5720 minutes, 57 secondsUnfortunately they don't exist.
21:0021 minutesThat's the downside. [laughter] These domain specific agents don't really exist. Um not in a big public
21:0821 minutes, 8 secondsway. Um, like I said, here at Standard Agents, we have them. We are working with them on a daily basis. Um, but they
21:1621 minutes, 16 secondsare not out there in public very much yet. However, that's changing. That is going to change very quickly. We're
21:2421 minutes, 24 secondsabout halfway through 2026 and um and I'm here to make a public prediction that I think as we roll on from from
21:3221 minutes, 32 secondsthis point to the end of 2026, we are going to see a dramatic uptick in people
21:3821 minutes, 38 secondstalking about building uh domain specific agents, frameworks around them.
21:4421 minutes, 44 secondsAll kinds of things are coming down the pipe and it's not going to be a small trickle. It's it's going to accelerate
21:5121 minutes, 51 secondsrapidly and this will become a one of the main players in the agentic ecosystem and 2027 I would say is
21:5821 minutes, 58 secondsbasically the year of multi- aent orchestration. That's another word you'll start to hear a lot I think. So
22:0622 minutes, 6 secondsthat's my big bold public prediction. I was really excited just a few days ago when uh Verscell released Eve. Uh this
22:1422 minutes, 14 secondsis the first time I actually saw the term that I had been blasting out into the void come back and hit me in my own
22:2222 minutes, 22 secondsface. Uh the framework for building agents build a company brain personal assistant or domainspecific
22:2922 minutes, 29 secondsagent. So there we go. About halfway through the year we're going to start picking up steam. That's my prediction.
22:3722 minutes, 37 secondsAnd there's a number of reasons. One of them is um something that most people believe right now is that the cost of intelligence is going down. That trend
22:4622 minutes, 46 secondsreversed in 2026. Actually, uh we track this um on on a website. Uh tokens are
22:5322 minutes, 53 secondsnot getting cheaper anymore. They are actually going up even when adjusted for IQ. They're up 29% when you adjust for
23:0023 minutesIQ. Just this year, halfway through the year, we're already up 30%. And that can be caused by lots of different things.
23:0823 minutes, 8 secondsOf course, um we've got this memory crunch and and you know, probably the long-term trend over a 10-year cycle or something is that intelligence will go
23:1623 minutes, 16 secondsdown. But that does not mean that we need to be paying 137 times the cost for something that can be done just as
23:2423 minutes, 24 secondseffectively. The problem is it's harder to break those things apart. Now, if you don't account for IQ,
23:3323 minutes, 33 secondstokens are up 76% this year. Almost 100% increase in tokens just this year. Um, and we're
23:4223 minutes, 42 secondswe're not even halfway through it. So, we are really trending upwards on on token costs. So, anything we can do,
23:4923 minutes, 49 secondsespecially with large businesses, to bring that down is going to be really important. Um, the other the other use case to really consider is putting AI in
23:5723 minutes, 57 secondsfront of customers. You can't put Fable in front of a customer um unless that customer has a massive lifetime value.
24:0524 minutes, 5 secondsIt's just too expensive. So, you need to find a way to create great efficacy while being efficient. And domain
24:1324 minutes, 13 secondsspecific agents are going to be the way to do that. So, I'm going to leave you here in momentarily. Um but before I do, let's just dream a little bit. Let me
24:2224 minutes, 22 secondsdig in a little bit deeper to how an agent could be orchestrated and what an
24:2924 minutes, 29 secondsideal agent would actually look like and then I promise to leave you alone. Here we go. So remember we got that model and
24:3724 minutes, 37 secondswe got the system prompt and then at the tool layer let's break that apart a little bit. On one hand we have these like functions. This would be like an
24:4524 minutes, 45 secondsactual function that can get executed like write a file to the file system. Then we have prompts.
24:5324 minutes, 53 secondsPrompts are a lot like the system prompt, but they are smaller individual prompts that can get injected
25:0125 minutes, 1 secondand and subprompts that can you know you can run a function that actually calls an LLM. So let's say I have a main agent
25:1025 minutes, 10 secondsrunning, but I want to use nanobanana just to generate an image when I'm using GLM, you know, 5.2 as my primary. Well,
25:1925 minutes, 19 secondsyou can just have a tool that's a prompt. That would be really cool if you could do that. And then another type of tool could be another full-blown agent,
25:2825 minutes, 28 secondslike a complete other domain specific agent could just be one of the tools.
25:3325 minutes, 33 secondsSo that's the tool layer. And then you have hooks. Uh what are hooks? Well, in this ideal world, a hook might be
25:4225 minutes, 42 secondssomething that can kind of harness or change or mutate or perform side effects. So, let me give you an example.
25:5025 minutes, 50 secondsLLMs have no idea what time it is at any given point in time. Turns out a really great way to tell them what time it is
25:5725 minutes, 57 secondsis you inject an artificial message or an artificial tool call in the message history. [snorts] So, it looks like
26:0626 minutes, 6 secondssomebody just said, "Hey, what time it is?" And the other person replied, "Oh, it's 6:45 p.m. Pacific time." Pretty simple.
26:1526 minutes, 15 secondsUm, you can do that with a hook or you could fire off some side effect using a hook. So, this is an important piece of
26:2226 minutes, 22 secondsan agent. And then finally, there's there's these agent rules. And agent rules are kind of complicated. It's like
26:2926 minutes, 29 secondshow many times should one side have a turn? like can it go on for 10,000 turns
26:3626 minutes, 36 secondsuh or 10,000 steps before its turn is up? You know, there's there's all kinds of interesting little rules. You know, when it calls uh a tool, you know, is it
26:4526 minutes, 45 secondsrequired to validate the whole thing or not? You know, there all kinds of of very specific tools or or rules that
26:5226 minutes, 52 secondsthat belong to a specific agent. And altogether, if we bundled all that up, we would call that an agent. But it's kind of missing a couple things. One,
27:0127 minutes, 1 secondevery agent should really have a file system. If you've ever done this with ChatgPT or Claude or Codeex, if you just
27:1027 minutes, 10 secondsask it, you know, not inside of a project or anything like, "Hey, can you make me a PDF for my my son's birthday
27:1927 minutes, 19 secondsparty?" Well, it'll do it and it'll store it in its own little file system.
27:2527 minutes, 25 secondsSo the big labs have already realized that in order to create an effective chat interface, not to mention a big agent, it needs some sort of file
27:3227 minutes, 32 secondssystem. So every agent should have its own little sandbox file system and also every agent should have a sandboxed code
27:4127 minutes, 41 secondsexecution location. So it can write files, it can run those files and it can do that safely without exfiltrating
27:4827 minutes, 48 secondsanything, without interacting with an OS at a higher level. that needs to be baked in as a primitive to every single
27:5527 minutes, 55 secondsdomain specific agent. Okay, so let's say that that's our ideal agent. Now, let's talk about that little agent tool
28:0228 minutes, 2 secondsthere. What is that? Well, those can be sub aents, recursive sub aents. Even you could have an agent that calls a sub
28:1028 minutes, 10 secondsagent that calls sub aents that call sub aents. Um, and there could be one or there could be many of these at
28:1728 minutes, 17 secondsdifferent levels. So for example, you could have this coordinator agent that's at the very top and then you could have a Salesforce agent and that agent knows
28:2628 minutes, 26 secondsSalesforce inside and out. It knows all of its APIs. It knows has all the credentials to communicate with your Salesforce instance in all the
28:3328 minutes, 33 secondsappropriate ways. And then it needs to communicate with a Google Workspace agent. So it can do all kinds of stuff in there. It can run spreadsheets. I can
28:4128 minutes, 41 secondssay, "Hey, what are all my top uh my my top salespeople this year?" And boom, it can look in Salesforce. that can coordinate with the sub agent, create a sheet for you, send that back. Perfect.
28:5228 minutes, 52 secondsBut maybe then you need to generate some assets. So the Salesforce agent actually has another sub agent that it can talk to at any time it wants and it's amazing
29:0129 minutes, 1 secondat generating assets. Maybe that sub agent doesn't just have like, you know, codeex image generation. Maybe it has nano banana. Maybe it has an SVG
29:0929 minutes, 9 secondsgenerator. All kinds of stuff. So that way it is an amazing asset generator and perform some of its own reflection in QA.
29:1929 minutes, 19 secondsAnd then our primary agent might need a whole legal team agent just so it can check the work that's coming out of these other ones. And maybe the legal
29:2629 minutes, 26 secondsteam agent really needs a GDPR compliance agent just for those European customers. You know, the main one doesn't have all, you know, we don't
29:3429 minutes, 34 secondswant to have 45 megabytes of context just on GDPR. So we make that a separate sub aent. Uh so you know may and then
29:4329 minutes, 43 secondsmaybe the legal team also needs like an OSHA compliance agent which is also very complicated and so it has a separate one for that. You kind of get the idea. You
29:5129 minutes, 51 secondscan end up with all kinds of highly efficient small little agents that are all working together
29:5929 minutes, 59 secondsbut maintaining small minimal context windows all the way through. That's the idea behind domain specific agents. So
30:0830 minutes, 8 secondsthank you very much. I appreciate you listening to my talk. Again, uh Standard Agents is where we're working. Standard Agents.ai. You can actually sign up on
30:1530 minutes, 15 secondsthere uh for early access. Um we are slowly starting to roll this out to a few people. Um if your business is super
