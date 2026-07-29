---
id: article-2026-07-29-understanding-is-the-new-bottleneck
type: source
title: Understanding Is the New Bottleneck
path: raw/articles/user-provided/2026-07-29-understanding-is-the-new-bottleneck.md
author: Geoffrey Litt
publisher: AI Engineer
url: https://www.youtube.com/watch?v=WkBPX-oDMnA
date_published:
date_added: 2026-07-29
tags: [agentic-coding, cognitive-debt, code-review, explanations, quizzes, micro-worlds, shared-understanding]
status: active
quality: medium
summary: Geoffrey Litt argues that agentic coding workflows must preserve human understanding for creative participation, using explainer artifacts, retrieval quizzes, purpose-built micro-worlds, and shared discussion spaces.
related: [claude-code, workflows, agent-skills, context-engineering, repo-local-knowledge-bases, 2026-06-28-explain-diff-skill]
superseded_by:
---

# Understanding Is the New Bottleneck

## Source Metadata

- Path: raw/articles/user-provided/2026-07-29-understanding-is-the-new-bottleneck.md
- Speaker: Geoffrey Litt, Design Engineer at Notion
- Venue: AI Engineer World's Fair 2026, Design Engineering track
- Session date: 2026-07-01
- Published: unknown
- URL: https://www.youtube.com/watch?v=WkBPX-oDMnA
- Transcript: user-supplied automatic transcript; transcription errors are preserved in `## Source Text`

## TL;DR

Litt distinguishes understanding for verification from understanding for participation. Automated checks may increasingly answer whether a change is correct, but a human needs a working mental model to form the next idea and remain a creative participant. His practical response is to make agents produce educational artifacts: background-first explanations, intuition before implementation detail, literate code walkthroughs, medium-difficulty quizzes, optional interactive micro-worlds, and shared spaces where humans and agents can discuss the same artifact.

## Key Claims

- Human understanding remains necessary even as automated correctness checking improves because understanding changes what the human can imagine and do next.
- Agent-written code can accumulate cognitive debt when the responsible human can no longer explain or manipulate the system's mental model.
- A raw diff is weak pedagogy; a useful explainer should establish background, intuition, concrete examples, and conceptual ordering before walking through code.
- A quiz can act as a speed regulator by exposing the gap between feeling familiar with an explanation and being able to retrieve or apply it.
- Small interactive simulations can build intuition for stateful, spatial, temporal, or otherwise opaque behavior that prose does not make tangible.
- Shared documents and conversations help a team build collective understanding instead of fragmenting context across private human-agent chats.

## Important Details

- Litt's `explain-diff` skill produces either a self-contained HTML artifact or a Notion page.
- The demonstrated explainer structure is background, intuition, interactive figures where useful, a conceptually ordered code walkthrough, and five medium-difficulty questions.
- His stated personal rule is not to send agent-written code for team review until he can pass the generated quiz.
- The talk explicitly warns that interactivity can become a decorative crutch; it should be used only when it provides understanding that static media cannot.
- Two micro-world examples are a timeline debugger for a Prolog interpreter and a step-through interface for a framework migration that exposes commands and file-tree changes.
- The talk's practices are practitioner evidence, not a controlled evaluation of comprehension, review quality, defect rate, or development speed.

## Entities

- People: Geoffrey Litt, Margaret-Anne Storey, Simon Willison, Andy Matuschak, Michael Nielsen, Seymour Papert, Alan Kay
- Organizations: Notion, AI Engineer
- Concepts: cognitive debt, understanding for participation, explain-diff, literate code diff, retrieval practice, micro-worlds, shared understanding, ephemeral UI

## My Notes

- The strongest workflow contribution is not “always generate HTML.” It is to add a distinct comprehension gate after machine verification and before consequential human approval.
- The gate should be risk-triggered. A short Markdown mental model is enough for most meaningful changes; interactive artifacts are justified only when behavior is difficult to understand statically.
- The talk's multiple-choice quiz should be strengthened with answer-pattern controls and at least one free-response or transfer question, because recognition can be gamed without demonstrating a usable mental model.
- An explanation is a projection of a specific code state. It should identify the commit or diff range it explains and become stale when that state changes.
- For team use, the review artifact needs comments, stable identity, and shared access. A private temporary HTML file is useful for individual learning but does not by itself create collective understanding.

## Open Questions

- Which change characteristics best predict cognitive-debt risk: diff size, architectural novelty, state-machine complexity, ownership distance, number of affected invariants, or reviewer unfamiliarity?
- Does passing a generated quiz predict better review comments, fewer reversions, faster incident response, or better follow-on design decisions?
- How should an explainer be invalidated or incrementally refreshed when the underlying diff changes?
- When does a micro-world repay its generation and validation cost compared with a trace, table, diagram, or debugger view?
- Should comprehension evidence stay private to avoid performative testing, or become a shared review artifact?

## Related

- [[2026-06-28-explain-diff-skill]]
- [[2026-05-24-the-orchestration-tax]]
- [[2026-04-14-dive-into-claude-code-the-design-space-of-todays-and-future-ai-agent-systems]]
- [[2026-07-29-understanding-gates-for-agentic-workflows]]
- [[claude-code]]
- [[workflows]]
- [[agent-skills]]
- [[context-engineering]]
- [[repo-local-knowledge-bases]]

## Source Text

What's up? Yeah, thank you for coming to the design engineering track at AI. Is everyone having fun?
0:1818 secondsYeah, I think this is going to be a great track, so get excited.
0:2222 secondsAll right, let's get going. Um, my name is Jeffrey Lit. I'm a design engineer at Notion currently and I'm here to drop a
0:3030 secondshot take for this room. Maybe I think it is still important for people to understand how code works.
0:3939 seconds[applause and cheering]
0:4242 secondsNow, some of you might agree, some of you might disagree. Let's actually let's do let's try a poll. I'm curious for this room. Raise your hand if you agree with that opinion.
0:5050 secondsOkay, maybe some selection bias. Any brave? Okay, raise your hand if you disagree with this opinion.
0:5555 secondsWow. Okay. We have [laughter] maybe we'll do a debate later. Yeah. I was hoping we'd be at the AI engineer conference so we'd have more B. Okay. I might be preaching to the choir here.
1:061 minute, 6 secondsYou know, I think we the reality is though we are entering an era where this is a legitimate question that people are debating, right?
1:131 minute, 13 secondsAsians are writing tons of code for us.
1:151 minute, 15 secondsThey're landing 50,000line PRs and it is getting harder to keep up. We all feel this now. I think the good news is there are
1:241 minute, 24 secondslots of ways to understand the you know the days of just reading code line by line that's not the only way anymore and what the point of this
1:331 minute, 33 secondstalk is about is I want to share with you a bunch of the practices that I use to understand the code that my agents
1:401 minute, 40 secondsare writing for me includes things like explainer docs teaching me about how my code works my agents write quizzes for
1:491 minute, 49 secondsme to to test my understanding am I still really in the loop. Am I keeping up?
1:551 minute, 55 secondsI have agents build micro worlds that I can inhabit to get this intuitive sense of how my code works that's deeper and
2:032 minutes, 3 secondsricher than just a written document. And I think all of these are really exciting new possibilities that are open opening up for AI to help us understand better,
2:122 minutes, 12 secondsnot worse. And so that's what the point of this talk is going to be about. And I hope I can leave you with some techniques that you can take home and use yourself.
2:212 minutes, 21 secondsBy the way, my timer isn't running. If you could get that running, that'd be great. So, I know if I'm blabbering.
2:282 minutes, 28 secondsOkay, but let's start. Let's back up for a sec. Before we talk about how, let's talk about why. Why bother understanding? This is again, it's a
2:362 minutes, 36 secondsquestion now, right? And I think a lot of people get this subtly wrong.
2:422 minutes, 42 secondsSo, what a lot of people think of why do humans still have to understand? They think we understand to verify. The agents do dumb stuff. We've all seen it.
2:502 minutes, 50 secondsAnd your job as the human is to keep them in line, right? Make sure they don't screw up.
2:562 minutes, 56 secondsWhen people say things like code review is the new bottleneck, I think that's the first thing that pops into people's heads is correctness checking. There's
3:063 minutes, 6 secondsthis mental model that's like, hey, the agent's going to give you something, and what's your job? It's to ask, is this correct? Now, correctness can have lots
3:143 minutes, 14 secondsof definitions. Does it match the spec doc you gave it? Does it take down production? Is it well architected?
3:213 minutes, 21 secondsBut fundamentally, those are all kind of thumbs up, thumbs down decisions, right?
3:263 minutes, 26 secondsAnd the thing is over time, we've all seen it, the agents are also able to ask these questions and they're getting better at it. You give it the right
3:343 minutes, 34 secondsverification loop and over time, this is the reality. The the role of humans in correctness checking is decreasing.
3:433 minutes, 43 secondsAnd you know what? I actually don't hate that. If I have a clear idea of what I want to do and the agent does it correctly instead of coming back to me with an incorrect thing, that's great.
3:523 minutes, 52 secondsI'm I'm into it.
3:543 minutes, 54 secondsSo then I think people extend this and say, you know what, that means as the agents get smarter and smarter and smarter, we we don't have to understand at all, right? Get out of the loop, man.
4:034 minutes, 3 secondsRun the loop. And that's where I think people miss something really important.
4:084 minutes, 8 secondsThere is a deeper reason to understand what's going on, and that's understanding to participate.
4:144 minutes, 14 secondsBecause here's the thing, it's not just one loop.
4:194 minutes, 19 secondsWhen you review what's happening and get in the loop, you come away changed. You understand something. And that understanding is what you take to the next loop and the next and the next.
4:324 minutes, 32 secondsYour understanding of what's going on is the foundation for you having that next idea and being an active creative participant in a project.
4:414 minutes, 41 secondsI think probably you've all you've all felt even before AI, you know, the difference of the kinds of ideas that someone can have when they really understand what's going on versus when
4:494 minutes, 49 secondsthere are a few layers removed are different because when you have rich conceptual structures in your head that you can fluently recombine really fast
4:564 minutes, 56 secondswithout going out to like ask some some agent or some human how it works, that gives you the ability to fluidly take
5:045 minutes, 4 secondscreative leaps. And that's the human part of the work, coming up with the next idea and the next idea. So this is actually the real reason I think
5:125 minutes, 12 secondsunderstanding matters and this is not something that we can just wash away with better agents because if we want to be active participants you still got to do this.
5:235 minutes, 23 secondsThere's a great term maybe some of you have heard called cognitive debt that I think really captures this spirit well.
5:285 minutes, 28 secondsIt's an analogy to technical debt popularized by the scholar Margaret Story. Simon Willis also blogged about it. And I love this idea because
5:365 minutes, 36 secondssimilarly to tech debt, you might get away with it for a little bit, but at some point you get burned if your understanding degrades. And maybe you felt this. I know I felt it. You're vibe
5:445 minutes, 44 secondscoding, things are going well, and then at some point you realize, wait, I have no idea what's going on. I basically can't participate anymore, right? You've built up too much cognitive debt.
5:565 minutes, 56 secondsOkay, so maybe sounds like all of you were already convinced. We agree. We need to understand.
6:026 minutes, 2 secondsBut how? Right, we don't want to live in 2023. We are using agents to move fast and it is harder and harder to keep up.
6:116 minutes, 11 secondsHow do we do it? I think to answer this question, we should actually take a step back and ask a more fundamental question, which is how do we understand stuff in general?
6:246 minutes, 24 secondsPlot twist, this is not the first time that any human has asked this question. There is a field. It's called education.
6:326 minutes, 32 secondsNow when you think education you might think of bad memories from sitting in lectures or whatever but I think we can do better. We can take inspiration from the best ideas that have ever been
6:406 minutes, 40 secondsinvented in education and use them to stay a loop and understand. So that's what this talk is about. We're going to talk about three techniques.
6:506 minutes, 50 secondsFirst explanations.
6:536 minutes, 53 secondsSo when an agent writes some code for it to explain the work to you, right? And the most naive explanation is hey here's the code diff. That's the raw change,
7:017 minutes, 1 secondthe material of what happened. But we can do, I think, much much better.
7:067 minutes, 6 secondsWhat would the best possible explanation be? Like if you sent a team away for a year to come up with a personalized curriculum just to explain this one code
7:147 minutes, 14 secondschange to you, what would that look like? I think this is a very generative question to ask.
7:207 minutes, 20 secondsSo, I've done a bunch of attempts at this. One is this skill I wrote called explain diff, which I use every day and a lot of my co-workers do as well. And I want to walk you through it.
7:307 minutes, 30 secondsSo, we're going to go through a little example here. I'm working on a video game where you draw Zen gardens, kind of de-stress, you know, could all use it these days.
7:397 minutes, 39 secondsAnd we made a code change to change the perspective of the game from top down to isometric.
7:457 minutes, 45 secondsAnd when I run my skill, it produces a code explainer doc. This can be an HTML file, it can be markdown. I like to put them in notion because I work there, but
7:527 minutes, 52 secondsalso because it's then collaborative, so my team can comment on it and talk about it. And here's how it looks.
8:008 minutesWe start with background. We do not start with what happened in this change.
8:048 minutes, 4 secondsIt starts by teaching me, hey, here's how this system works.
8:168 minutes, 16 secondsObviously, you can skip this if you already know. You can personalize it to what you already know.
8:228 minutes, 22 secondsSecond important principle is intuition before details. So before we start, you know, looking at code and stuff, it says, hey, the goal of this commit is to
8:318 minutes, 31 secondsmake the garden feel threedimensional using only 2D drawing tricks.
8:368 minutes, 36 secondsYou can think of this sort of as like a well-written commit message a little deeper. Give me examples. Give me a feel for the essence before you know you throw a bunch of code at me. Right?
8:458 minutes, 45 secondsThis, by the way, this is good teaching. This is what like good math teachers do.
8:518 minutes, 51 secondsThird, interactive figures. So where it makes sense, give me things to fiddle with and try. So with this change, it was like changing how we draw rocks. So
9:009 minutesI can drag around rocks in this little simulation and it shows me the coordinates that are happening, how the Z layers of the painting are changing.
9:079 minutes, 7 secondsThis, by the way, is actually using a new feature that motion literally launched this morning of HTML blocks in notion pages. surians can put interactive simulations into your notion pages. Pretty cool.
9:189 minutes, 18 secondsI think you have to be careful with interactivity. It can just be a crutch and it can be kind of a slop to be honest, but used tastefully. It can provide an understanding that's hard to achieve with just static pictures.
9:309 minutes, 30 secondsOkay, then we finally get to the code, right? Show me the code. But we don't just throw a list of files in order. We do what we what I call literate code
9:389 minutes, 38 secondsdiffs. Give me pros. Explain it to me in the right order. tell me before each file what's going on. And when you accumulate all this stuff, it's much
9:479 minutes, 47 secondsmuch easier to follow than just a raw div.
9:509 minutes, 50 secondsOops. In fact, I print these out and take them to the coffee shop sometimes and just read them.
9:559 minutes, 55 secondsI find it really beautifully ironic that AI is actually taking this process where I was used to be like glued to my computer, my IDE, and now I can go to the cafe and it's like I'm reading a
10:0410 minutes, 4 secondstextbook about this PR. It's really cool.
10:0810 minutes, 8 secondsOkay, so there is one problem which is that reading is hard and I am lazy.
10:1310 minutes, 13 secondsPeople are lazy. You know, there was this one time when I sent a PR to my co-orker that I thought I had read the thing. I thought I understood and she
10:2010 minutes, 20 secondsasked me the most basic question and I was like, "Oh no, I don't know. I clearly hadn't understood, right? I had
10:2710 minutes, 27 secondsfooled myself." So I thought, "How can I create a system where that never happens again?" For inspiration, I look to the work of the researcher Andy Matushak, who has
10:3610 minutes, 36 secondsthis great line, books don't work. What he means by that is it's really easy to read a book and not realize you didn't understand it. So, so he and his
10:4410 minutes, 44 secondscollaborator Michael Nielsen tried this thing where in an essay there are interactive space repetition quizzes that test whether you actually remember what you just read. And this is cool to
10:5310 minutes, 53 secondsactually keep emailing you the quiz to make sure you remember it forever. But this is nice because you cannot get through this essay without understanding it or at least without remembering it.
11:0311 minutes, 3 secondsThat's what I do with my code explainers. At the very bottom there's a quiz, five questions, medium difficulty.
11:0911 minutes, 9 secondsAnd my rule is I don't send code to uh others on my team to review unless I can pass the quiz about what my agents wrote.
11:1811 minutes, 18 secondsAnd it might sound kind of silly, but you should try it. It really is shocking the number of times this has caught me and made and made me realize I didn't understand.
11:2611 minutes, 26 secondsI think of it as sort of a speed regulator. Everything AI is speed up, speed up, speed up. There's all these incentives to go faster. How do we make sure we're not just moving at the speed of correctness, but also of
11:3511 minutes, 35 secondsunderstanding? And the quiz is that speed regulator. It's a system I can use for that.
11:4211 minutes, 42 secondsI did uh just put the skill on the internet. So yeah, photo moment. If you want the explained diff skill, uh take that QR code, try it out, make it your own. It's really simple actually.
11:5111 minutes, 51 secondsThere's two versions of that QR code.
11:5311 minutes, 53 secondsOne that outputs HTML, one that outputs notion.
11:5711 minutes, 57 secondsOkay, second technique, micro worlds. What does that mean? So, this takes inspiration from the educator Seymour
12:0412 minutes, 4 secondsPapard, real visionary who had this idea of living in mathland. And what that meant was, hey, kids learn French from living
12:1212 minutes, 12 secondsin France. Where do they go to learn math? Is there a math land where you can learn intuitively math just by being there? So he did these great things with
12:2112 minutes, 21 secondsthis is a a robot called the turtle that kids program to draw stuff. But the point isn't making robots. The point is they actually learn math by doing that
12:2912 minutes, 29 secondsprogramming. The the point isn't the robot, it's the kids that are changed.
12:3412 minutes, 34 secondsSo how could we apply this to understanding code?
12:3812 minutes, 38 secondsHere's one example. Last year I was trying to implement um for my own learning this interpreter for a programming language prologue which is think of it a little bit like a database
12:4612 minutes, 46 secondsquery language and there's all these parts of it that look like this where when you read them on Wikipedia they seem really complicated and then when you actually get what's going on it's
12:5412 minutes, 54 secondslike wait a second that wasn't that hard to understand it just felt hard when I read it that way right how could we make it click more for my brain so I had
13:0213 minutes, 2 secondsClaude make me a micro world this is a debugger ephemeral UI that was built specific specifically to visualize the
13:1013 minutes, 10 secondsinternal implementation of my programming language. What's happening here is that I'm scrubbing through a timeline that's running step by step.
13:1713 minutes, 17 secondsWhat's my interpreter doing? It's visualizing all the state at every step.
13:2013 minutes, 20 secondsSo, I can kind of open the hood and see what's going on and start feeling it, you know. And yes, I can I use this to fix bugs. I even added a little um hard
13:2913 minutes, 29 secondsto see here, but there's a commenting feature where I can leave comments for myself on the timeline so I remember what I was thinking. And I used this to
13:3713 minutes, 37 secondsfix fix narrow bugs, but also as I was fixing the bugs, I was getting a feel for the machine. Right? That's something that if you just have an agent to go fix
13:4413 minutes, 44 secondsthe bug, you don't get that peripheral vision. If you live in a micro world, you do.
13:5013 minutes, 50 secondsAnother example, um, I was migrating my personal website from one framework to another. And first thing I did, I had I said, Claude, write me a script, too. It
13:5913 minutes, 59 secondsdid this. It seemed like it worked. And I read the script and I was like, I don't know. like I just don't have a feel for what it's doing. A bunch of
14:0614 minutes, 6 secondsfiles went a bunch of places, it seems, right?
14:1014 minutes, 10 secondsSo, what I did is I said, "Hey, Claude, make me essentially a video game where I do the port myself." And the way this works is old website on the left, new
14:1714 minutes, 17 secondswebsite. I just click a button, next, next, next. And at each step, it says, "Here's the commands I'm running. Your new website's coming to life step by step. You see it?
14:2614 minutes, 26 secondsThere's actually file trees down there where you can see files moving." And it's the the result is it's kind of like if I did it manually, but I'm just
14:3414 minutes, 34 secondsclicking a button. So I'm getting some of the benefit of doing it without the pain.
14:4214 minutes, 42 secondsAnd I think the big takeaway here is agents can write code to help us understand code where the point isn't building software to ship. It's building
14:4914 minutes, 49 secondsthese little micro worlds for us. It's the math land, right? It's it's a it's a simulation of just this thing.
14:5814 minutes, 58 secondsOkay, quickly the last topic shared spaces. So far we've this has all been about me
15:0515 minutes, 5 secondssolo understanding but a lot of the time I think the challenge is actually you're working on a team and your whole team needs to understand together so you can
15:1315 minutes, 13 secondsactually jam and have creative ideas together. We think a ton about this at notion.
15:1915 minutes, 19 secondsWe believe that you know the shared understanding that exists between you and someone else is what lets you communicate effectively. Whether that's
15:2715 minutes, 27 secondsnames for parts of a system, it could be names for UI elements or concepts, right? So we we think a lot of notion about how do you make tools that enable collective understanding?
15:3715 minutes, 37 secondsSome things we're exploring. Can you have multiplayer chat threads between multiple humans and agents together? So here, you know, I might ask a product
15:4615 minutes, 46 secondsmanager on my team, hey, you know, what what are users asking for with this feature? And she might say, hey, I don't
15:5315 minutes, 53 secondsknow, let's ask a different agent. and that agent comes in and talks to us.
15:5715 minutes, 57 secondsWhat's happening here is that instead of me and my PM both talking to our own agents, we're in a shared space. We can see each other's communication. It's
16:0516 minutes, 5 secondskind of like, you know, going from one-on-one conversations to Slack channels. You know, you see more of the behavior happening together and you understand together.
16:1416 minutes, 14 secondsAlso, having documents that you can talk about together is a really powerful permanent here. You know, Claude made us a plan.
16:2116 minutes, 21 secondsWhat if I have a question about that that I want to discuss with my team? I can just leave a comment because this is in a collaborative space, not on my computer locally. And then I can ask,
16:3016 minutes, 30 secondshey, you know, what do you think about this? And my teammate can chime in and and we can talk about it right there.
16:3416 minutes, 34 secondsRight? I think having these spaces for shared discussion around ideas with our agents is really powerful for building up that collective understanding.
16:4416 minutes, 44 secondsThis, by the way, um we just launched last week the ability to bring coding agents into notion. So Claude and Cursor can now live in Notion and our team actually builds a lot of our code in notion itself.
16:5416 minutes, 54 secondsmainly because of these benefits because having in a shared space is just so valuable.
17:0117 minutes, 1 secondOkay, so we've talked about these three techniques and I want to bring it back to the beginning.
17:0617 minutes, 6 secondsYou know, I think at the beginning I said it's important for humans to still understand how the code works, right?
17:1217 minutes, 12 secondsBut I actually think it's much bigger than that.
17:1517 minutes, 15 secondsI kind of think it's just important for humans to still understand how everything works.
17:2217 minutes, 22 secondsAnd maybe you know you all agree it sounds like but this I think is being called into question now and is something we actually have to actively fight for.
17:2917 minutes, 29 secondsThe thing is this is not a new battle.
17:3217 minutes, 32 secondsIt actuallyarkens back to the very origins of our field.
17:3617 minutes, 36 secondsAlan K is one of the pioneers of personal computing co-inventor of the modern guey. And literally 50 years ago he wrote this essay that I find very
17:4417 minutes, 44 secondspreient called a personal computer for children of all ages.
17:4817 minutes, 48 secondsIt looks like two kids on iPads watching YouTube or something right. It's kind of crazy. This is 50 years ago, his vision. But that's not YouTube on the iPads.
17:5517 minutes, 55 secondsWhat he envisioned is, hey, these kids, they're playing a video game and they're modifying the code as they play it to learn physics. So the point isn't the
18:0418 minutes, 4 secondscomputer, it's the kids. The point of computers was to level us up as humans, right? And Allan has talked a lot about how it kind of feels like at some point
18:1218 minutes, 12 secondscomputers detourred a bit from that vision. But I think the exciting thing is maybe now's the time to bring that back. Here's kind of the meme version of that.
18:2318 minutes, 23 secondsI think with AI, a lot of people are waking up to, oh my gosh, code is free.
18:2818 minutes, 28 secondsWe can make ephemeral UIs, dynamic simulations to understand concepts. We can make debuggers, playgrounds, and it's like, yes, that's great. And
18:3718 minutes, 37 secondsit's actually not a new idea. Like, this was the goal all along. And so, I think the optimistic thing that I find really exciting is,
18:4518 minutes, 45 secondshey, it's still really important to understand how things work. And with the right tools and the right mindset and the right creativity, we can actually
18:5218 minutes, 52 secondsunderstand better than ever before, not less. With AI, we can kind of empower ourselves more, not just taking ourselves out of loops, but actually
19:0119 minutes, 1 secondputting ourselves more deeply in loops than we ever have before. And I think that's a really exciting prospect and I hope it's something that we all together as an industry figure out.
19:1219 minutes, 12 secondsThat's all I have for you today. Thank you so much.
