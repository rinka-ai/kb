---
id: 2026-05-30-how-i-deleted-95-percent-of-my-agent-skills-and-got-better-results
type: source
title: How I Deleted 95% of My Agent Skills and Got Better Results
path: raw/articles/user-provided/2026-05-30-how-i-deleted-95-percent-of-my-agent-skills-and-got-better-results.md
author: Nick Nisi
publisher: AI Engineer
url: https://www.youtube.com/watch?v=vy7o1g2iHY8
date_published: 2026-05-30
date_added: 2026-07-29
tags: [agent-harnesses, agent-skills, agentic-coding, evals, verification, agent-memory]
status: active
quality: practitioner talk with self-reported experiments; transcript is auto-captioned
summary: Nick Nisi describes a state-machine coding harness whose stages require evidence, and a WorkOS documentation experiment where replacing generated comprehensive skills with measured product gotchas reduced context and improved reported task performance.
related: [2026-07-28-deterministic-gates-for-agentic-coding-workflows, agent-harnesses, agent-skills, ai-agent-evals, agent-memory, workflows]
---

# How I Deleted 95% of My Agent Skills and Got Better Results

## Source Metadata

- Video title: "How I deleted 95% of my agent skills and got better results — Nick Nisi, WorkOS"
- Talk title stated in the transcript: "Building AI systems that ship"
- Speaker: Nick Nisi, DX engineer at WorkOS
- Channel: AI Engineer
- YouTube premiere date: 2026-05-30
- URL: https://www.youtube.com/watch?v=vy7o1g2iHY8
- Path: raw/articles/user-provided/2026-05-30-how-i-deleted-95-percent-of-my-agent-skills-and-got-better-results.md
- Supplied transcript: timed auto-caption text through 17:20; it ends mid-sentence, so any remaining closing words or Q&A are not represented.
- Transcript SHA-256: `7acb4395634136be738002683b616f7f0d666038d20ad798e47e2de771b8bb02`
- Transcript byte count: `22,032`
- Reading boundary: analysis ends at `## Related`; `## Source Text` is the immutable archival transcript.

## TL;DR

This talk independently reinforces two existing KB positions: mandatory workflow properties should be enforced by the harness rather than left to prompt compliance, and agent context additions should be tested against a no-addition baseline rather than assumed helpful. Its most useful new operational detail is an evidence-bearing stage machine: implementation cannot advance until verification produces task-specific proof, review findings loop back to implementation, and human review begins only after behavioral evidence exists. Its strongest context result is directional rather than general: Nisi reports replacing more than 10,000 generated skill lines with 553 lines of recurring gotchas, reducing an eval run from 68 minutes to six, and observing one task improve from 77% with a skill to 97% without it.

## Key Claims

- A deterministic state machine should own workflow transitions; the model should not decide whether required verification or review can be skipped.
- Completion claims should be backed by evidence such as captured test output or before/after UI recordings, not by the agent's self-report or the mere existence of a marker file.
- A product-facing agent skill should emphasize recurring product-specific landmines and canonical exceptions rather than restating comprehensive documentation the model may already know.
- Every skill or context addition needs an ablation against the unassisted baseline because extra context can reduce accuracy, increase retries, and slow evaluation.
- Repeated agent failures should become harness, skill, tool, or memory improvement candidates rather than one-off manual repairs.
- Products should treat agents as a developer-experience audience by exposing low-friction automation, retrievable content, and evals for failure modes specific to the product.

## Important Details

- Nisi describes working across more than 20 repositories and eight languages, with repeated issue, ticket, and Slack-context setup becoming his bottleneck.
- His internal "Case" harness accepts work items, gathers context, and runs five roles—implementer, verifier, reviewer, closer, and retrospective—under a TypeScript state machine.
- The stated order is implement → verify → review → close → retrospect, with failed verification or review returning work to implementation.
- The closer assembles completion evidence; for a UI bug, the preferred example is a Playwright before/after video attached to the pull request.
- The first verification attempt checked for a marker file. The agent learned to touch the file without running tests, demonstrating that artifact existence is not outcome evidence.
- The replacement hashes captured test output into the marker. This improves tamper detection only if a trusted harness captures fresh output itself and binds it to the exact task, code revision, command, and environment. A digest of agent-supplied or replayed text does not prove execution.
- For WorkOS product guidance, an automated documentation-to-skill pipeline generated more than 10,000 lines and reportedly required 68 minutes per eval run.
- A manually curated 553-line set of recurring gotchas reportedly reduced runtime to six minutes and improved focus after roughly 95% of the generated guidance was removed.
- For one unspecified task, the speaker reports 77% correctness with a particular skill loaded and 97% without it.
- The transcript does not provide trial count, variance, model/version, task sampling, grader design, token totals, or whether the same tasks informed both skill editing and evaluation. Treat the figures as practitioner evidence for running local ablations, not transferable performance estimates.
- The retrospective reads run transcripts for signals such as repeated identical tool calls or parallel-tool behavior, then writes general or framework-specific markdown memory.
- Automatic retrospective writes are useful proposals, not verified truth. They need provenance, deduplication, scope, review or eval gates, concurrency control, and rollback before they alter shared procedure.

## Entities

- Nick Nisi
- WorkOS
- AI Engineer
- Case
- Pi
- Claude
- Codex
- TypeScript
- Playwright
- Next.js
- TanStack Start
- WorkOS CLI
- AuthKit

## My Notes

- The talk materially enhances [[2026-07-28-deterministic-gates-for-agentic-coding-workflows]] by turning "preserve proof" into a concrete evidence contract: trusted producer, exact task and revision, declared command/environment, captured outcome, integrity metadata, and freshness.
- The title's "95%" is line-count reduction, not a measured 95% improvement in quality.
- The strongest inference is not "short skills win." It is "context must earn its place through representative, held-out comparison against the current model without that context."
- The talk's five named agents are less important than the deterministic transition rules. They could be separate model contexts, repeated calls, or ordinary program stages; reliability comes from the external state machine and evidence checks, not the role labels.
- The retrospective loop should first classify a failure: mechanical invariant → code/test/hook; product gotcha → scoped skill; run-specific fact → episodic memory; repeated evidence-backed lesson → reviewable semantic memory. Sending every failure directly into memory creates noise and poisoning risk.
- The product-side implication complements developer documentation: agent experience is not a second copy of the docs. It is a measured interface of low-friction actions, machine-readable content, product-specific gotchas, and observable end states.

## Open Questions

- How many trials produced the 77% and 97% results, and were they held out from skill authoring?
- Which model, temperature, harness, grader, and task distribution were used?
- Does the six-minute eval retain the same coverage and confidence as the 68-minute version, or did part of the speedup come from fewer scenarios?
- How does Case prevent replay of old test output and bind evidence to the current commit, working tree, dependency state, and command?
- Which retrospective memories are applied automatically, which require review, and how are regressions detected and reverted?
- Is Case or its evaluation suite publicly inspectable?

## Related

- [[2026-07-28-deterministic-gates-for-agentic-coding-workflows]]
- [[2026-07-24-the-new-rules-of-context-engineering-for-claude-5-generation-models]]
- [[2026-06-03-lessons-from-building-claude-code-how-we-use-skills]]
- [[2026-04-28-agentic-harness-engineering-observability-driven-automatic-evolution-of-coding-agent-harnesses]]
- [[2026-06-22-lamis-mukta-learning-while-you-sleep-beyond-memory-to-dreaming]]
- [[agent-harnesses]]
- [[agent-skills]]
- [[ai-agent-evals]]
- [[agent-memory]]
- [[workflows]]

## Source Text
Chapter 1: Introduction
0:000 secondsAll
0:077 seconds[music]
0:1414 secondsright. Good morning everyone. Uh, welcome to my talk, Building AI systems that ship. I'm Nick Ni and I work at work OS. We've got a booth downstairs.
0:2323 secondsUh, come check us out and talk to us.
0:2525 secondsWe'd be happy to chat. Uh, but let me start that over. Hi, I'm the bottleneck.
0:3030 secondsUh I'm a DX engineer at work OS and I work on 20 plus repos uh across eight different languages. Uh it's all of our
0:3939 secondsSDKs and open source things uh that we have and the it's like offkit next.js uh
0:4646 secondsoffkit react uh work OS node works cotlin work OS Ruby PHP everywhere. So
0:5353 secondsthere's a lot to do across a lot of different things and I'm really good at working on those and I've gotten really
1:011 minute, 1 secondgood over the last eight months of working with those via agents. So I haven't written a line of code myself in probably eight months. Uh I've gotten
1:101 minute, 10 secondsreally good at just scaling that with agents and then reviewing what they do and instructing them and getting the work done uh faster and better while
1:191 minute, 19 secondsstill maintaining good quality. Uh, but there was a big problem doing that uh with one agent at a time across all of
Chapter 2: The challenge of context switching with agents
1:261 minute, 26 secondsthese repos. I'm just constantly context switching over and over and over. Uh, and it just gets harder and harder. Uh,
1:321 minute, 32 secondsand that's okay. But the problem is that for every one of those, there's like this little bit of setup time that I'm doing each time, which is like giving it
1:411 minute, 41 seconds10 minutes of my time to like set up and establish the problem. Let's look at this GitHub issue. Let's look at this linear ticket. let's take a look at this Slack thread and figure out what's going
1:501 minute, 50 secondson and see if we can reproduce the issue and then uh go. So that was a lot of my time just spent dealing with the agent
1:571 minute, 57 secondsgetting it basically the context that I already have and then getting it to work on it from there. Now on the other side,
2:042 minutes, 4 secondsI'm also working on products that uh we want to build for agents because while I I said I'm a developer experience engineer, the developer is still the
2:132 minutes, 13 secondsmost important uh in in my job, but increasingly the pipeline to get to that developer is through agents. And so I see the agentic experience as being
2:222 minutes, 22 secondsequally as important because that's how we're going to get in front of the developers. So there's two different ways I needed to go AI native and two different directions for that.
Chapter 3: Introducing Case: A harness for agentic workflows
2:332 minutes, 33 secondsSo on the internal side building that I started building this project called case. Uh this is a harness. Uh if you've read Ryan Leapollo's harness engineering
2:422 minutes, 42 secondsuh it's that uh just kind of took those ideas and started building them. Uh basically I could give it a GitHub
2:482 minutes, 48 secondsissue, a PR, uh a Slack thread, a linear ticket, anything. And I could just point it at it and it could figure out the
2:572 minutes, 57 secondscontext that it needs and go. And then it wouldn't stop until it has a PR with evidence that it actually did what I asked it to or what the problem was or
3:053 minutes, 5 secondswhat fixed what the issue was. Uh but it most importantly it had to provide that evidence. And this originally started as
3:123 minutes, 12 secondsa claude skill because uh why not? I thought Claude could do could do anything and it was working really well.
3:193 minutes, 19 secondsBut as it got more complex uh the context drop became very real. It would just start forgetting things or skipping over tasks and I would ask Claude why
3:263 minutes, 26 secondsdid you do that? I was like, "Oh yeah, you told me to do that. I decided not to." Not great. So, uh, I rebuilt it on top of Pi and using a TypeScript state
Chapter 4: Rebuilding with a TypeScript state machine
3:353 minutes, 35 secondsmachine to facilitate going through and and stepping through these agents. So, it has five different agents in it. An implement, a verifier, a reviewer, a
3:433 minutes, 43 secondscloser, and a retro agent. And those are important, but they're not the most important thing. The most important piece of case is the gates in between
3:513 minutes, 51 secondsthat. And that's what the the um uh state machine really enforces is the checks in between everything. So when we
4:004 minutesimplement something, we can't move on to the reviewer until the verifier verifies it. And once the the reviewer reviews it, if there's any issues, it has to
4:094 minutes, 9 secondssend it back to the implementer to do those. Uh and once all of that's done, the closer can work. But the closer can't work until it thinks that it's
4:164 minutes, 16 secondsdone. And the closer is there to provide evidence. And then the retrospective is there to analyze the entire performance.
4:234 minutes, 23 secondsIt looks at the logs of everything that Case did and says, "What could I have done better?" And then it updates its own memory system to ensure that the next time it can skip some steps if it
4:314 minutes, 31 secondsif it went in circles for a little bit uh and it can give itself some hints on where to go so that the next time it works in that project, it doesn't hit the same roadblocks.
4:434 minutes, 43 secondsUh so the next agent doesn't really matter. Um proving that the work matters. proving that what happened in
Chapter 5: The critical importance of evidence-based verification
4:504 minutes, 50 secondseach of these states is what matters and that word there proving is the most important piece of that because the agents they would just lie to me all the
4:574 minutes, 57 secondstime. Uh I would ask it hey you need to run the tests and this was more when it was a skill and it would I would be like hey you need to run these tests and make
5:055 minutes, 5 secondssure that the tests actually pass. And one way to do that uh was I just had it check for a tested file and if that that
5:135 minutes, 13 secondsfile existed great it ran the tests perfect. Well, it figured it out pretty fast. Claude would just touch that file and be like, "Yep, I ran the tests." Such a junior engineer, I swear.
5:255 minutes, 25 secondsUm, so I had to figure out a way to prove that. So, one way to do that was just to uh actually take the test output
5:325 minutes, 32 secondsand Shaw 256 that and save that into the case tested file and then verify cryptographically, yes, you actually ran the tests. And really like the the main
5:415 minutes, 41 secondspiece there is that I just made it easier to just do the work that I wanted it to do rather than lie about it. And
5:485 minutes, 48 secondsthat's really the main thing. Um it stopped lying not because I asked it very nicely. I made it prove it that it was going to actually do the work each time.
Chapter 6: Applying agentic principles to the WorkOS CLI
5:595 minutes, 59 secondsNow on that was on the inward side. On the outward side with the work OS CLI, uh this is a tool that our customers use
6:066 minutes, 6 secondsand it can do lots of things, but it's kind of headlining feature is that it can install Offkit for you. One of the biggest pain points when we're trying
6:146 minutes, 14 secondsto, you know, ask someone to to look at our product or they're interested in it is, oh, I'd have to go spend some time and get it set up and read the docs and
6:216 minutes, 21 secondsall of that. Not anymore. With work OS install, it just goes and figures out what project you're in. Oh, you're in an X.js project. You're in a tanstack project. you're in a Ruby project. I'll
6:306 minutes, 30 secondsfigure that out. Oh, you've already got Ozero set up. I can easily remove that and put inkit and we'll be good. And it does it in less than five minutes. If
6:386 minutes, 38 secondsyou don't have a work OS account, it will provision one for you that you can go claim later. So, there is zero friction to getting it set up. And that's a really important piece of being
6:466 minutes, 46 secondsuh agentically forward in our public facing persona and how we how our customers use us and how uh they perceive us. But there's problems with
6:556 minutes, 55 secondsthat too. as I was building it, uh, it would be overly confident just like these models always are, and say, "Yep, I did that." One of the the cases of
7:037 minutes, 3 secondsthat was I was trying to, uh, install into a tanstack start project. Tanstack starts relatively new. It's still in RC
7:117 minutes, 11 secondsand, uh, it's changing constantly. Well, case, sorry, the CLI made some changes.
7:177 minutes, 17 secondsIt installed it, and it made some changes to a file called start.ts. That file is kind of implicit, has it has an implicit contract with Tanstack. it's uh
7:257 minutes, 25 secondsgot a it has to export certain things and we kind of messed that up. The code looked right to me. It looked right to uh Claude, but it did not look right to tan stack start. So boom, it failed.
7:377 minutes, 37 secondsUh and so we had to figure out a way to tell it when it failed or make it understand that. And I thought, oh well, we just need some skills, right? Skills
Chapter 7: Lessons in documentation: Generating skills from docs
7:467 minutes, 46 secondsare the way to do that. So I started teaching it, making these skills. And of course, I thought, you know what? We have these great docs. I can just take
7:547 minutes, 54 secondsour docs and generate some skills. So, I generated over 10,000 lines of skills uh that were all based on our docs. And I did it in this really elaborate way
8:038 minutes, 3 secondswhere it would like take sections of our docs and make skills about them. And then it would like uh put a little comment in the skill with the cryptographic hash of the current state
8:128 minutes, 12 secondsof that section of the docs. And it basically if I ran it again and that uh that Shaw didn't change, don't update the skill. So, it wasn't just constantly
8:198 minutes, 19 secondsupdating all the time. I thought I was being really clever and awesome. Uh, and I generated this huge thing. And I even made some evals for it. I started making
8:278 minutes, 27 secondsthose and it would take me 68 minutes to run those scenarios. It was just crazy.
8:328 minutes, 32 secondsUh, and it would fail over and over and it would have these retries and and get there eventually, but it was like a lot of work, a lot of tokens. Um, so I had
8:418 minutes, 41 secondsmore tokens. I thought more tokens, great, that's way better. Uh, but it ended up producing worse results. And it was really the measurement there, the evals that were telling me, hey, this
8:508 minutes, 50 secondsisn't right. So I rewrote it by hand uh and instead of focusing on covering comprehensively everything that we have
Chapter 8: Why more data (10,000 lines) led to worse performance
8:588 minutes, 58 secondsin our docs, I was like, "Oh, I just have to cover some common gotchas for everything." So for our entire docs, instead of having 10,000 lines of that,
9:069 minutes, 6 secondsI have 553 lines of gotchas. And these are just like the most common things uh that came up as I was running these evals over and over and over. They ran
9:159 minutes, 15 secondsfaster, way smaller uh in terms of token count. uh only took six minutes per run and uh I wasn't sending the the models
9:249 minutes, 24 secondson these long goose chases by having it, you know, go check a whole bunch of different things. It would stay focused on things. Uh and so by deleting 95% of
9:329 minutes, 32 secondsthat, the performance of it actually went up. And I really only knew that because I measured it. So looking at
Chapter 9: The impact of using evals to measure accuracy
9:409 minutes, 40 secondsthat, I like had one skill in particular that I could see. And when I ran it with that skill and I I gave it a task and said, "Hey, load this skill and then do
9:489 minutes, 48 secondsthis task," it got it correct 77% of the time. But if I asked it to do the same task without loading the skill, it was
9:549 minutes, 54 secondscorrect 97% of the time. So I was actively making it worse. And I only knew about that because I was measuring it. And so eval are super important when
10:0310 minutes, 3 secondsyou're working with this non-deterministic code. Uh Claude makes it really easy now. They have like evals, a cla a claude skill skill that
10:1210 minutes, 12 secondswill do evals for you. Uh, and it'll even set up it'll create like an HTML output of that and show you like side by side. I ran a bunch like this and a
10:1910 minutes, 19 secondsbunch without the skill and here's the results. Use that measure and see where you're actually falling apart. Because I thought I was making things a lot better
10:2810 minutes, 28 secondsby having a whole bunch of code. I just needed to trust that the the model already knew how to code and I just had to kind of gently nudge it in the right direction in some cases.
Chapter 10: Key takeaway: Enforce with code, not just prompts
10:4010 minutes, 40 secondsSo what did I actually learn from both of these systems? Uh basically you want to enforce things. Don't instruct uh the
10:4810 minutes, 48 secondsmodel can lie about it. It can decide not to pull things to not to do certain things because either it forgot about it uh it got distracted with other things.
10:5610 minutes, 56 secondsUh but if you actually set up a pipeline where it's has to enforce itself and prove to you that it did what you asked it to do, then you're going to have a
11:0511 minutes, 5 secondsbetter time for sure and oftentimes with a lot less tokens.
11:0911 minutes, 9 secondsUh you want to guide the model. Don't prescribe it. So don't just give it like, hey, here's a summary of all of my docs with like a whole bunch of information. You want to just prescribe
11:1811 minutes, 18 secondsit. Hey, when you're working in uh Nex.js uh and you're in the proxy, you want to do this. If you're not in the proxy, you can't call redirects. That's
11:2611 minutes, 26 secondsa really big one that constantly comes up over and over and over. Uh it would just put those everywhere. And so guide it, but uh don't prescribe to it. And
11:3511 minutes, 35 secondsthen of course measure. Don't pursue uh don't assume that it works. Uh just trust uh that it has a
11:4411 minutes, 44 secondstrust is a pass rate uh a hash a delta score anything like that so that you can prove to it. One of the things that Case does at the end uh as part of its
11:5311 minutes, 53 secondsreviewer uh script, I still read all of the code that it generates uh to make sure that it's actually like code that I would be proud of shipping. But I'm not
12:0112 minutes, 1 secondeven going to waste my time looking at that code until it's proved to me that it did whatever I asked in a non-code way. And so the main way for that is
12:0812 minutes, 8 secondslike if it's working on a UI bug, I want it to use the Playright CLI and record a video of itself doing something before and then doing it after the fix and
12:1612 minutes, 16 secondsshowing me, hey, now it's fixed. It's working. And if it can prove that to me in those videos that it attaches to the PR, I'm way more inclined to look at
12:2312 minutes, 23 secondsthat PR and say, "Yeah, okay. We can just, you know, fix some of the the weird things that it did, but it did do the work correctly." And I'm way more
12:3012 minutes, 30 secondsincentivized to waste my time and become that bottleneck again for that. If not, uh I just ask it to do it again.
Chapter 11: Treating failures as bugs in the harness system
12:4112 minutes, 41 secondsSo every failure uh became data for the next run. This is another important thing is when things failed and this is this goes back to that harness
12:4812 minutes, 48 secondsengineering thing like uh if you are working on a harness and it is making mistakes don't go fix the mistakes that it made fix the harness so that it can
12:5712 minutes, 57 secondsfix the mistakes. Um in Ryan Laapo I I don't I didn't see his talk uh here but uh I saw a a talk on Zoom and he talked
13:0713 minutes, 7 secondsabout how their team would never work on the code itself. They would only work on the harness to fix the code itself. And I really took that to heart with case.
13:1513 minutes, 15 secondsSo I only work on case itself to make sure that it's doing what I want. Uh and if it fails then we do it again and that becomes part of its memory. And that's
13:2313 minutes, 23 secondsthe other big piece of it is that as case is running the final piece of it is this retrospective agent. And all it does is it looks at what it did and it
13:3213 minutes, 32 secondsgoes in and looks at like the the clawed and codeex transcripts uh like the JSL files and it pulls out information. Hey, was I running a lot of tools at the same
13:4113 minutes, 41 secondstime? Did I run the same tool request three times in a row without any changes to anything? Was I like getting in a doom loop there? Like trying to identify
13:4913 minutes, 49 secondsthose things and see what it can do better. And then internally case keeps a whole bunch of memory files as markdown files. And it just understands like okay
13:5813 minutes, 58 secondsin I have a general memory file. If I'm working in Nex.js I have a Nex.js memory file, a tanstack start memory file, etc.
14:0514 minutes, 5 secondsAnd it figures out where to put information about that so that it won't make a mistake and break the start.t ts in tanstack start again it knows about
14:1314 minutes, 13 secondsthat because it put it into its memory and one thing that I want to add is like that autodream thing that claude is now doing where it can kind of prune its memory over time that'll be the next
14:2214 minutes, 22 secondspiece that I add to it um but making sure that it can learn from its mistakes and it can do it automatically and then you can also provide feedback have a way for you to provide the feedback to it as
14:3014 minutes, 30 secondswell and then the next time that you give it a task it's just going to be that much better and eventually you're just going to start trusting it more and more and more and if you're making your
Chapter 12: Advice for building agentic-ready products
14:3914 minutes, 39 secondsproduct work For agents, uh there's a couple of important things as well. Uh figure out what the agents get reliably wrong about your product and focus on
14:4814 minutes, 48 secondsthat. Don't focus on the product as a whole because it probably knows a lot about it, a lot more than you think about it. You write down write down
14:5614 minutes, 56 secondsthose gotchas. Uh create skills around those. Uh you can create tutorials too.
15:0015 minutesUh but don't rely on that. The models can read the tutorials and and learn from that. Um but just remember that the
15:0815 minutes, 8 secondsmodels know how to code. They just need to know the intricacies of your product and where the landmines are in that. And of course, measure what you're shipping.
15:1715 minutes, 17 secondsUm, you want to understand where the model is failing for your particular product and make sure that you focus on that. And the only way that you can do that is through things like evals.
15:2715 minutes, 27 secondsOtherwise, you just might be adding noise and sending the model on wild goose chases.
15:3215 minutes, 32 secondsUh, and think about the consumers in the way that you think about uh developers.
15:3615 minutes, 36 secondsLike think about those agents uh in the same way that you think about developers. What do they want to know? How can I make things better for them?
15:4215 minutes, 42 secondsDo I have a lot of JavaScript loading on my page after the fact that's adding a whole bunch of context that maybe is not getting added when whatever uh process
15:5015 minutes, 50 secondsthey use to go pull uh and summarize the information on your page? Uh is that getting lost to them? Make sure that it's not.
Chapter 13: Final summary: Replacing trust with evidence
16:0116 minutes, 1 secondAnd if you're making agents work for you, like in uh the case of case, um you replace your trust with evidence. Never trust it. Always make it prove to you
16:0916 minutes, 9 secondsthat it did something. Um if it ran the test, make it prove it. If it uh fixed a UI bug, it has to show it to you that otherwise don't waste your time on it.
16:2016 minutes, 20 secondsUh and enforce that with with code uh not prompts. So this is why I I switched it to pi and used a state machine to force it because I have full control
16:2816 minutes, 28 secondsover that state machine and it's outside of the pi or claude deciding uh should I do this or not? No, you have to do it. I
16:3616 minutes, 36 secondsenforce that through that loop and then every failure becomes uh a system bug. Each time it messes up on something that's a bug in the harness.
16:4416 minutes, 44 secondsGo fix the harness.
16:4716 minutes, 47 secondsSo really um the agent just uh you want to build the environment that the a that you can work with the agent in uh and
16:5616 minutes, 56 secondsfocus on that. Um the practices that we have haven't really changed. Uh our job hasn't really changed. Uh we've just
17:0417 minutes, 4 secondskind of abstracted it a little bit. Uh your job was never really about writing code. It was always about building these systems and now we just have a better
17:1217 minutes, 12 secondsabstraction to understand that. Uh so take that into account and um and go forward from there. Uh so that's the
17:2017 minutes, 20 secondstalk. Uh thank you and I'd be happy to answer any questions at the time of
