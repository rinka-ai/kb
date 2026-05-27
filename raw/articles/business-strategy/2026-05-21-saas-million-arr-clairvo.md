---
id: article-2026-05-21-saas-million-arr-clairvo
type: source
title: "SaaS Million ARR (Clairvo) transcript"
path: raw/articles/business-strategy/2026-05-21-saas-million-arr-clairvo.md
author:
publisher: User-provided transcript
url:
date_published:
date_added: 2026-05-21
tags: [business-strategy, saas, ai-saas, claude-code, pricing, product-discovery, sales]
status: active
quality: medium
summary: User-provided transcript of a founder-style case study about using Claude Code to build and commercialize an AI-enabled power dialer, emphasizing payable pain, agent-assisted ideation, simulation, high-touch pricing, regulatory or human moats, and model-agnostic engineering.
related: [ai-saas-strategy, claude-code, workflows, enterprise-agent-deployment-failure-modes]
---

# SaaS Million ARR (Clairvo) transcript

## Source Metadata

- Path: raw/articles/business-strategy/2026-05-21-saas-million-arr-clairvo.md
- Author:
- Published:
- Publisher: User-provided transcript
- URL:

## TL;DR

This transcript argues that AI-era SaaS strategy should start with expensive operational pain, not with what is easy to build. Its reusable pattern is: find a measurable business metric, use Claude Code to generate many possible mechanisms, filter hard with human judgment, test candidates in simulation against real data, roll out in live businesses, price against value delivered, and prefer high-touch implementation moats over purely digital low-ticket products.

## Key Claims

- The power dialer reached about $1 million ARR by targeting a high-LTV, low-churn, call-heavy business problem rather than a generic software idea.
- Claude Code was used less as an inventor and more as a divergent mechanism generator, simulation builder, and implementation assistant.
- The author's product loop is problem definition, solution enumeration, human filtering, simulation, statistical/model optimization, real-world stress test, and iteration.
- Pricing was discovered by repeatedly selling at higher prices until the sales motion became difficult, rather than by relying on abstract pricing models.
- In an AI coding world, "can you build it?" matters less than "what should you build, who pays, and how much value do you capture?"
- Low-touch, low-ticket SaaS is argued to be more exposed to AI commoditization than high-touch products with implementation, relationship, regulatory, data, or workflow moats.
- The author argues that switching among agent frameworks often creates distraction and regression; stable model use and simple repo instructions can outperform framework churn.
- The codebase should stay model-agnostic so the team can switch between Claude Code, Codex, DeepSeek, Gemini, or other coding models as quality, cost, and availability change.

## Important Details

- Product: an AI-enabled power dialer for call-heavy local-service or sales organizations.
- Core metric: call pickup rate, defined in the transcript as dialed numbers that produce a live human answer within a short window.
- Mechanisms mentioned: optimal call windows, predictive pacing, simultaneous dialing, double/triple dialing, call routing, and queuing to available agents.
- Reported outcomes are self-reported and should not be treated as audited evidence: the transcript claims 50-80% improvements for clients and one Texas client growing from roughly $3 million to $5 million per month.
- The source explicitly notes that most AI-generated ideas are bad or duplicates; the value comes from mining many possibilities and filtering.
- The pricing example is $250 per seat per month; a 100-seat deal is framed as $25,000 MRR or $300,000 ARR.
- The value-capture heuristic in the transcript is that a vendor can often ask for roughly 10-15% of the value created if the value is measurable and material.
- The source uses "Claude Code," but transcript text sometimes renders it as "Cloud Code," "Claw Code," or "clog code"; this note treats those as transcript artifacts unless proven otherwise.
- The product name is inconsistently rendered in the transcript as Clairvo, Clarvo, Clarbo, and Claro.

## Entities

- Product: Clairvo / Clarvo / Clarbo / Claro
- Systems: Claude Code, Codex, DeepSeek, Gemini
- Frameworks mentioned: Hermes, OpenClaw
- Business categories: SaaS, AI SaaS, high-touch SaaS, low-touch SaaS, power dialers, local service businesses, HVAC, plumbing, roofing
- Concepts: ARR, MRR, LTV, churn, pickup rate, predictive pacing, Bayesian optimization, simulation harness, value-based pricing, regulatory moat, human implementation moat, model-agnostic codebase

## My Notes

- This is a strong seed for a business-strategy layer in the KB because it connects AI agent/coding capabilities to market selection, pricing, data access, workflow deployment, and value capture.
- Treat the revenue and client-impact numbers as claims from a marketing/video transcript, not verified facts.
- The durable lesson is not "build a power dialer"; it is "target a measurable operational bottleneck where better throughput directly maps to revenue and where deployment data can improve the product."
- The "most ideas are trash" detail is important because it keeps AI-assisted ideation grounded: large idea volume only helps when paired with domain judgment, simulation, and live validation.
- The regulatory/human moat argument matches the existing enterprise AI failure-mode page: durable value often lives in workflow integration, compliance, data, implementation, and operating ownership rather than the model call itself.
- The framework skepticism should be balanced against existing KB notes: frameworks are useful when they expose durable primitives, but harmful when teams chase novelty instead of shipping measurable product improvements.

## Open Questions

- What evidence would verify the ARR, client revenue lift, and churn claims?
- Which call-dialing mechanisms are legally or operationally constrained by telemarketing, TCPA, A2P, carrier, or platform rules?
- How much of the product's moat is data access, workflow rollout, sales relationships, compliance knowledge, or algorithmic performance?
- What is the right eval harness for business-product mechanisms where simulation gains often fail in real-world rollout?
- When does a high-touch SaaS become a service business in practice, and when is that strategically acceptable?

## Related

- [[ai-saas-strategy]]
- [[claude-code]]
- [[workflows]]
- [[agent-frameworks]]
- [[enterprise-agent-deployment-failure-modes]]
- [[2026-04-18-outbound-ai-agent-kb-upgrades]]

## Source Text

Chapter 1: SaaS Million ARR (Clairvo)
0:00Hey, so we just hit a million dollars in ARR with our SAS product, which we use Cloud Code to build. And I know a lot of people here are probably interested in using Cloud Code either independently or
0:077 secondswithin an organization to put together some sort of SAS app and then take it to market. So I figured in this video I'd run you through basically everything that we did in order to get to where we
0:1414 secondswanted to and uh also share all the learnings along the way. So what is the SAS? It's called Clarbo. It is essentially an AI enabled power dialer.
0:2323 secondsAnd just to unpack those words, what this does is it allows us to make more calls per unit time and then have more of those calls picked up on the back
0:3030 secondsend. And that works really well and is very powerful if you're in an industry that is traditionally pretty call based.
0:3636 secondsSo either you have some sort of funnel or you have inbound leads and you need to call them very quickly and at mass or uh you know you're doing like traditional cold calling or outbound
0:4343 secondscalling to try and acquire clients whom you don't have pre-existing relationships with. And so anytime you're starting any business, whether it's a SAS, ecom, you know, service company, whatever, you need to have a
0:5252 secondsvery clearly defined problem that you are trying to solve. And so I'm going to run you guys through exactly how we pick this problem later. But essentially a high level, we pick this because it has
0:5959 secondsvery high a lifetime value, meaning that a single client that we get on our service will pay us a lot of money over the course of the next few years. Uh it's very low churn because once we
1:081 minute, 8 secondsinstall it into a company, it's very unlikely that they're going to just bow out. Their whole infrastructure depends on us. And then it's also very straightforward and easy to do in a
1:161 minute, 16 secondsmarket that didn't have a lot of uh other entrance. Claude Code helped us come up with every single way. And I'll run you through a quick step byep on how to do that in a second. But just so that
1:241 minute, 24 secondswe're all clear, essentially, you know, an industry competitor might make a 100 calls an hour. These might be outbound calls to try and close some deals to strangers they've never met before. Or
1:321 minute, 32 secondsit could be inbound calls calling a list of people that opted into some offer.
1:361 minute, 36 secondsfrom those 100 calls because of dial times, connect times, people aren't present, people aren't picking up the phone from numbers they don't recognize, maybe only 40% of those will actually
1:431 minute, 43 secondspick up. So, if you think about it, right off the bat, the salesperson's making 100 calls, only 40 people are picking up. There's sort of a 2.5x drop off right there. And so, if you just do the math, you have a sales person
1:521 minute, 52 secondsworking 8 hours a day. They're capable of getting 40 pickups an hour. It's like, how many actual conversations are you having? Let's say they do that every day for a month, maybe they make 10K a
1:591 minute, 59 secondsmonth. What Clarvo does is allows you to make more calls in the front end. So, now we're capable of doing, let's say, 200 calls an hour instead. And then it also increases the fraction of people
2:072 minutes, 7 secondsthat pick up because the calls are more recognizable. We use a couple of cool cloud codebased algorithms to like uh dial multiple numbers simultaneously and
2:142 minutes, 14 secondsthen also double and triple dial if needed. Uh and then basically at the end result is you just make more money. So in our case we have more calls, we have a higher pickup rate and so there's
2:222 minutes, 22 secondssignificantly more people that are actually on the phone and uh right now we're capable of generating you know somewhere between 50 to 80% improvements to the companies that we work with. We
2:302 minutes, 30 secondstook a pretty sizable business from Texas from somewhere between $3 to $5 million per month uh which is almost uh you know double their their revenue. And so this is the sort of value proposition
Chapter 2: Mining Claude Code for Ideas
2:392 minutes, 39 secondsthat that Clarbo has. So how do you actually use Cloud here? Well, I should note that we didn't actually know how to solve this problem when we started. We actually had Claude walk us through
2:462 minutes, 46 secondsevery possible way that it knew of to improve pickup rates and increase the total number of calls we could make per unit time. And uh most of the ideas were
2:542 minutes, 54 secondsabsolute trash. But after mining claude for 200 300 ideas, a couple of them are actually pretty good. And so the process if you're interested is we literally
3:023 minutes, 2 secondssaid, "Hey, we're building insert product here." You know, it is in our case an AI power dialer for local service businesses like HVAC, plumbing,
3:103 minutes, 10 secondsroofing, etc. Our core metric to optimize is call pickup rate, which is defined as the percentage of dial numbers that result in a live human
3:183 minutes, 18 secondsanswering within say 10 seconds. So here we have the current baseline, we have the industry ceiling, and then we even had our target. So what I told us to do was spawn 10 parallel sub aents. Each
3:273 minutes, 27 secondsone should propose 10 distinct mechanisms we can use to increase pickup rate. I also want you to diverge each of these wildly. So do algorithmic, behavioral, infrastructural, regulatory,
3:353 minutes, 35 secondspsychological, timebased, identity based mechanisms. Don't self-censor for any feasibility. I'm going to do all this later. And so after it comes up with all of these ideas, and it's going to come
3:443 minutes, 44 secondsup with a lot of ideas as mentioned, what we're going to do is we're just going to take them and then verify, okay, is this like a total BS idea or is it like an okay idea? And so here we go.
3:513 minutes, 51 secondsWe now have a variety of results. uh a lot of them are hard duplicates as well.
3:553 minutes, 55 secondsBut just going top to bottom, the first is a temporal propensity model which is basically using AI to determine um an optimal call window aka when to call
4:044 minutes, 4 secondspeople. So this is legitimately something that we do at Claro. We have optimal call windows based off of average pickup times per you know time
4:114 minutes, 11 secondsof day essentially. But at the same time some of these other ideas are total BS.
4:154 minutes, 15 secondsSo weather times pickup regression. you know, can we run a regression, which is a statistical analysis on historical pickup rates versus hyper local weather?
4:234 minutes, 23 secondsUh, you know, just off the top of my my head, that's probably not going to be anywhere near as valuable as doing some sort of like call based uh on time, let's say. And so, you're going to get
4:304 minutes, 30 secondstons of ideas like these, and yeah, the majority of them are going to be junk, but you're going to find a couple that work. And so, in our case, this is literally what we did. We ideulated over
4:384 minutes, 38 secondsall of the possible ways to improve something. After you're done with that, we shortlist one of these ideas. And so, in our case, predictive pacing was actually a pretty well-known idea. It's
4:464 minutes, 46 secondsnot something we invented. Claw code definitely didn't invent, but you know, it's an idea that we wanted to explore and see, okay, what sort of alpha would there be if you know, rather than just
4:544 minutes, 54 secondscall one person, we actually call multiple people simultaneously.
4:564 minutes, 56 secondsEssentially, uh because the amount of time it takes to dial somebody is very fixed. Like if you think about it, you enter a phone number in and then you you stay on the line, it goes ding ding ding
5:055 minutes, 5 secondsding. Uh what that means is if the person doesn't pick up, you've just wasted all that time as a salesperson.
5:105 minutes, 10 secondsSo if your your goal is optimally to be more efficient, the actual optimal play is not just to call one person and have the ding ding. It's actually to call two
5:195 minutes, 19 secondspeople and have the ding ding because if one of those people doesn't pick up, well, no problem. You've taken the total amount of time it would have made to make that dial and then you connected
5:285 minutes, 28 secondswith this person anyway. Um, and so this isn't just limited to two people. We actually use an algorithmic model that specifically imbused like offsets into
5:365 minutes, 36 secondsour multiple call thing uh that is proven and we've seen it in our data to call and get picked up by the optimal
5:435 minutes, 43 secondsamount of people per unit time. Do some people pick up at the same time and then that results in kind of an a weird awkward situation. Yeah. But we also
5:515 minutes, 51 secondshave a built-in call routing so that if you know we make multiple dials here, one of them doesn't get picked up. It actually goes to an agent that might actually be available. So it's a queuing
Chapter 3: Predictive Pacing Example
5:585 minutes, 58 secondssystem which you know cloud code obviously helped us build but it all started like right here. This is the exact same approach that we used in order to figure all that out. And so uh
6:066 minutes, 6 secondsonce you have this simulation harness you know you feed it in a bunch of data on historical call times which we accumulated through our own businesses and then businesses of other people. Now
6:136 minutes, 13 secondswe have something we can run stats on and we can figure out okay what's the optimal offset for this you know batch of 50,000 calls let's say in order to determine uh you know what our what our
6:226 minutes, 22 secondsoffset needs to be. Once you're done with that, you feed it in another prompt that says, "Hey, I want you to now implement this predictive pacing simulation from the spec above. Here is
6:306 minutes, 30 secondssome historical data. I want you to optimize for these things using, in this case, basian optimization." Obviously, this is going to depend on the specific problem you're trying to solve. But what
6:376 minutes, 37 secondsI'm trying to say is we just had claude code, you know, figure out uh the ways to improve what we wanted to improve and then actually implement that in a simulated environment. Finally, you
6:466 minutes, 46 secondsbuild the thing, which in our case was this predictive pacer, and then you roll it out in real uh businesses. And you know, I think this is probably the thing that's gonna trip up a lot of people
6:546 minutes, 54 secondsbecause they don't have real like pre-existing businesses that are currently live right now that they can test things out on. And that's why data is ultimately like quite the moat. If
7:017 minutes, 1 secondyou have the data and then you also have the means to deploy something and do, you know, parallel testing, you can you can usually get through this sort of thing way faster. Okay. And that takes me to this general sort of loop. In
Chapter 4: The Product Loop
7:107 minutes, 10 secondsorder to do this sort of thing effectively, what you always start with is you start by defining a problem. And of course, you can have cloud code help you do the idea mining and the problem
7:187 minutes, 18 secondsdefinitions. That's okay. Um, but in our case, we just knew this was a problem that a lot of people were willing to pay a fair amount of money for. Then you say, "Hey Claude, how can we solve this
7:267 minutes, 26 secondsproblem?" I want you to enumerate, aka list all possible solutions to, you know, the problem of, let's say, call pickup rates. Then what you do after
7:347 minutes, 34 secondsthat is you apply your little human brain, your little sponge, and you say, "Okay, which one of these are total and which one of these are actually somewhat feasible?" And so in
7:427 minutes, 42 secondsour case, we had a short list of maybe five or six out of several hundred that were actually feasible. And you know over time we're going through the the the rest of them as well just to verify
7:517 minutes, 51 secondsif this is something that can actually add some alpha some delta to you know call pickup rates. But the vast majority of the time it's one of those things that you'll just read and you'll be like okay yeah this is obviously the one.
7:597 minutes, 59 secondsOnce we're done we design some simulations with cloud code usually based off some form of historical data and then we run a statistical model in our case the predictive pacing algorithm
8:088 minutes, 8 secondsin order to actually have that perform better. Then we iterate in some sort of simulator aka we have clog code just like change the the the parameters of our model so that it gets better and
8:168 minutes, 16 secondsbetter and better and then finally we have like a real life stress test where we actually roll it out and I mean it can fail at any step along these lines here. We've had a variety of you know
8:258 minutes, 25 secondspretty cracked out approaches that we thought were going to work really well in the sim because we saw better improvements in our stats but then when we rolled them out to real life we're like oh my god wait a second there's
8:338 minutes, 33 secondsactually this third variable here that confounds and kind of ruins everything.
8:378 minutes, 37 secondsSo, you know, it's not easy. If it was easy, you'd have everybody doing it. And if everybody was doing it, nobody would be making any money. But this is how we ideiated on the set of core features uh
Chapter 5: Pricing the SaaS
8:468 minutes, 46 secondsof Clarvo that ultimately ended up making us a fair amount of money. But the pricing is 250 bucks a month, which is not like a scientifically determined price. We started by pricing close to
8:558 minutes, 55 secondslike 100 bucks a month and we figured out that people were willing to pay for it. So then we increased the price, figured out people are still want to pay for it, increase the price. Uh, you know, I think people that are trying to
9:039 minutes, 3 secondsuse these big statistical pricing models or have AI like determine what the best price is are usually just wrong. The much easier and simpler way is just like
9:109 minutes, 10 secondspick a price and then sell it to a bunch of people and if it's easy and they say yes, then just keep increasing the price until eventually it gets hard. In general with SAS companies, there's a
9:189 minutes, 18 secondsbig spectrum of possible prices. Um, if this is our spectrum here at the very left is basically what is called um low
9:259 minutes, 25 secondstouch. Low touch SAS businesses generally speaking are like self-s serve. What that means is it's like a self-guided onboarding. There's like maybe a video from the founder. You pay
9:349 minutes, 34 secondslike 5, 10, 15, 20 bucks a month and then everything's like kind of done for you. And you know, these can be really good, but my head cannon, my my personal
9:429 minutes, 42 secondsbelief is in an era where Cloud Code and other agents are capable of whipping up basically any SAS, you know, like you got to ask yourself at a certain point
9:499 minutes, 49 secondsany business owner will be willing or able to make the trade-off of just paying money for tokens to actually just rebuild the whole thing. So rather than
9:569 minutes, 56 secondsus sort of going really cheap and really small and solving a tiny problem, we decided to go the exact opposite direction um and we ended up solving a pretty big problem kind of closer to the
10:0510 minutes, 5 secondsenterprise uh with what's called a hightouch SAS. So Claros sits sort of right around here and typically we don't just sell individual licenses. It's not
10:1210 minutes, 12 secondslike uh you know a single user can't sign up if they want to but in general we work with companies and then roll this out to a precreated team of people that are doing calling. So for instance
10:2110 minutes, 21 secondsyou know we sign a 100 seat deal at $250 a month. Well, if you think about it kind of mathematically, that's $25,000 MR, which is 300k AR. So, that's more or
10:3010 minutes, 30 secondsless what we've done. We've closed a handful of deals with sort of like mid-market uh to maybe larger businesses that operate in a variety of very callheavy industries. Only takes a
10:3810 minutes, 38 secondscouple of those people to say yes, to roll it out to their team and then make a fair amount of money. On the pricing point, my big take on a lot of this is nowadays anybody can build virtually
10:4710 minutes, 47 secondsanything. If you look at the total number of commits over time, okay, they are skyrocketing and that's because AI is doing the vast majority of the intellectual heavy lifting now. So it's
10:5610 minutes, 56 secondsno longer can you build insert software product here cuz we can all build it.
11:0011 minutesThe the the bottleneck the moat like the value that you have is what should you build and you know essentially how should you price. So what you quickly realize is that the vast majority of
11:0911 minutes, 9 secondsframeworks are total fluff. You know we tried a lot of agent frameworks for Clarvo. We tried uh Hermes, we tried OpenClaw, we tried a bunch of these
11:1811 minutes, 18 secondscontext libraries. Uh basically made like vector DBs of your memory. We probably tried like 50 different approaches. And I can definitively say
11:2611 minutes, 26 secondsfor the purposes of creating a software product that later generates revenue, basically every additional framework you use is like inversely correlated with
11:3411 minutes, 34 secondsthe amount of money you make. Because every time you jump on a different framework, you are not only distracting yourself and pulling away from like the thing that you're trying to build. Um,
11:4311 minutes, 43 secondstypically you have like regression within whatever the code base is because now the prompt is being understood or mediated a little bit differently than it was before. And for those of you guys
11:5111 minutes, 51 secondsthat don't know, regression is just where, you know, you had an approach previously that worked really well.
11:5511 minutes, 55 secondsLet's say some vanilla thing with like a small little cloud at MD, but because now you're you're doing it through a different framework, like a lot of the assumptions and memories and and and things that the model used to know about
12:0312 minutes, 3 secondsyour codebase no longer works. Uh, which is quite unfortunate. So, you know, rather than jump around a lot and try and like aim for that 100% quality uh or
12:1212 minutes, 12 secondslike 100% score uh IQ test of the model, I would rather have the model work 90% as well of like its total potential,
12:2112 minutes, 21 secondslet's say, but I'd have it work consistently and be the same every single time. The real value that I think not a lot of people understand is that,
12:2812 minutes, 28 secondsyou know, the intelligence comes from the model itself these days. It does not come from the shiny framework that wraps around it. you slapping on some new
12:3712 minutes, 37 secondsframework to, you know, the way that your your team is building on cloud code is kind of like uh people that put a fuzzy cover on their steering wheel and then they pretend that that's the reason
12:4412 minutes, 44 secondswhy their car works so good. Like obviously that's not the reason why your car works so good. Your car works good because it has wheels, it has an engine, it has a chassis, and so on and so
12:5212 minutes, 52 secondsforth. It's the craftsmanship of the person that built all of that. U but you know you because you want to be all special and and new and stuff like that.
13:0013 minutesUh put put your little fuzzy steering wheel on and they go like, "Oh yeah, this is way better." That's not a genuine improvement. That's just your subjective improvement. And so I think human beings, we want to take credit for
13:0813 minutes, 8 secondseverything, even if it's not necessarily ours. And so we do the virtual equivalent of slapping on a bunch of like fancy fuzzy covers, aka all these
13:1613 minutes, 16 secondsHermes agents and and and open claw tools and stuff like that. Um when in reality, the thing that's making the car go is is the is the base model. And so
13:2413 minutes, 24 secondsthat's why if you guys look deep into the people that actually like created a lot of these technologies like Boris Churnney for instance who's one of the creators of cloud code these people
13:3213 minutes, 32 secondstypically have like nothing of substance in their claw.md files. They have nothing in their system prompts. Uh they they're literally just using the vanilla
13:4013 minutes, 40 secondsintellect of the model. And the vanilla intellect of the model is usually for all intents and purposes pretty damn good. You'll only get marginal improvements applying one of these
13:4813 minutes, 48 secondsframeworks. And what you find is, you know, cloud code's getting so good so quickly nowadays that if there is a marginal improvement that gives you like a 5% uh plus ROI, the next generation of
13:5713 minutes, 57 secondsthe tool, maybe like 3 or 4 days later, we'll actually already include that either hardcoded into the system prompt or maybe actually just part of like the training of the model. The second thing is to pick problems that actually pay.
Chapter 6: Finding Payable Problems
14:0714 minutes, 7 secondsAnd so the idea is okay, you can build more or less anything. And so this left hand side vin diagram are all of the
14:1414 minutes, 14 secondsthings that you could build. and every green dot is a thing that you have decided to build, you're not going to make any money. What you want to do, okay, is find that small little slice of
14:2314 minutes, 23 secondsthe ven diagram on the right hand side that people will actually pay for. So these are things like red-hot problems.
14:2914 minutes, 29 secondsThey're uh industries and niches that have big budgets. It's people with pre-existing pain. And then what you want to do is you just want to focus all your time over here. And so with Claro,
14:3714 minutes, 37 secondsthat's what we did. We saw just how inefficient a lot of sales people were and how literally just getting on um a power dialer cuz this isn't a new idea
14:4514 minutes, 45 secondsof a power dialer, but we saw like the difference between not having a power dialer and then having a power dialer was like 3x effectiveness. Then we're like, okay, what if we can just make
14:5314 minutes, 53 secondsactual pre-existing power dollars even better. And we're like, okay, if we can generate even like a 2x effectiveness, we'll be able to to take a large portion of the value that we provide for
15:0115 minutes, 1 secondcompanies. And so that's that's the mo that's sort of where you need to sit if you really want to crush it in SAS nowadays. And so everything exists on this problem value spectrum. You know,
15:0915 minutes, 9 secondson the lefth hand side, you have a bunch of lukewarm problems. These are things that are nice to have, but they're not necessary to have. And this is unfortunately where probably like 90% of
15:1815 minutes, 18 secondspeople spend their time. And I'd built, you know, a bunch of demos showing you how you could put together to-do apps and simple browser extensions and simple
15:2515 minutes, 25 secondsproductivity tools and so on and so forth. But the harsh reality is you know if the problem isn't big enough to justify somebody uh you know choosing
15:3415 minutes, 34 secondsyour SAS over like building it all themselves because as mentioned software is now quite easy to build. Anybody can just uh convert tokens into product just
15:4215 minutes, 42 secondsat some sort of exchange rate. You know if it's not a big enough problem people are just going to do that and the longevity of your SAS is going to be significantly smaller than if you picked
15:5015 minutes, 50 secondslike a red hot burning problem. So in our case we picked something that is currently costing organizations millions of dollars a year. they'll pay anything to fix their to fix their pickup rates
15:5815 minutes, 58 secondsor improve it if they know that it's an option. And uh so this is more or less what what we've done. So instead of solving a you know I don't know
16:0716 minutes, 7 secondsmarketing for dog walkers where it's like the average dog walker probably makes like a thousand bucks a month or something like that you know solve a
16:1316 minutes, 13 secondscore need for a large usually mid-market and upstyle company uh people that actually have budgets and typically also have many seats that would need to
16:2216 minutes, 22 secondssubscribe to these budgets in order to solve set problem. So, as mentioned, uh we implemented this in one of our HVAC clients, and it says a year here, but it's it's literally a month. I think the
16:3016 minutes, 30 secondsAI just didn't believe me when I said it was legitimately a month. Uh and we took them basically, uh we increased their their monthly revenue by about 66%. And
16:3816 minutes, 38 secondsso, if you think about it, like what did we do? The delta there is 2 million a year in revenue. And typically the way that it works is if you solve a problem, okay, you are uh I don't want to say
16:4716 minutes, 47 secondsentitled to, but you can typically negotiate or ask for somewhere between 10 to 15% of the total amount that you are providing. And so we provide $2
16:5616 minutes, 56 secondsmillion a month to this company, 24 million a year. It is not unreasonable for us to ask for or at least be in a position where we can negotiate a tenth
17:0517 minutes, 5 secondsof that or $2.4 million a year. And so this is the sort of problem that ultimately you want to solve. You know, you want to find people that have the means to pay for uh this red-hot burning
17:1417 minutes, 14 secondsthing, but you also need the problem itself to be quite valuable. If it's not, probability of you, you know, getting anywhere with that is quite low.
Chapter 7: Human Moats Win
17:1917 minutes, 19 secondsAnother hack is to pick an industry or a SAS type that requires some form of human implementation or like human
17:2717 minutes, 27 secondsonboarding. What I mean by this is, you know, if everything that you do is entirely digital, then it is pretty
17:3517 minutes, 35 secondsreasonable to expect that in the next couple of years AI will be able to do it better than your team. And so, you know, your onboarding your tool into the
17:4317 minutes, 43 secondscompany is nowhere near as valuable as just like, hey, cloud, can you do it all for me? And I think cloud will be able to do that for most things uh fairly shortly. But the one thing that AI can't
17:5017 minutes, 50 secondscurrently do is it can't upend like regulation. you know, if um you need in our case a bunch of numbers applied for
17:5817 minutes, 58 secondsyou, you need A2P registration and that's just like a fixed thing. That's like a law. That's like a regulation.
18:0318 minutes, 3 secondsYou can't just say, "Claude, uh screw screw the ATP registration. Get me 5 million phone numbers because both for moral, ethical, and programmed in
18:1018 minutes, 10 secondsreasons, Claude will say no." But also, uh there's just no way to get the number unless you have actually go through this like pretty bureaucratic process. And so
18:1718 minutes, 17 secondswhat I mean by that is like in a future where uh there's no moat to to doing you need to look for natural moes that are created by regulatory environments in
18:2518 minutes, 25 secondsour case things like numbers for instance another great example of that is like in healthcare um everybody complains about HIPPA all the time myself included because you know it's
18:3418 minutes, 34 secondsit's quite the blocker to US healthcare implementing any sort of or building any sort of like cool transcription service will require you to like fidiously
18:4118 minutes, 41 secondsadhere to HIPPA principles and that can slow you down a lot. You need to anonymize your data and so on and so forth. But viewed it another way, that's actually a major opportunity in like an AGI world because that's the only thing
18:5118 minutes, 51 secondsthat is currently stopping us from being able to, you know, do things um legitimately having some sort of like certification, let's say, or some sort of board approval of rolling something
18:5918 minutes, 59 secondsout. And so as a as a company, as a SAS, if you could build um some form of human implementation, human onboarding, uh you know, a human responsible for
19:0819 minutes, 8 secondsmaintaining the relationship between you and the advisory board that needs to to rubber stamp the thing, then you'll go way further. And so in our case, you know, we have a bunch of relationships
19:1619 minutes, 16 secondsand connections with people that know how to do these things and facilitate them a lot faster. And that's one of the moes that I think will actually carry us forward in the next couple of years as
19:2319 minutes, 23 secondsopposed to, you know, big AI just pulverizing the vast majority of these low touch, low ticket SAS. Finally, one last tip is to make whatever your
Chapter 8: Model-Agnostic Stack
19:3019 minutes, 30 secondscodebase is model agnostic. So I know the whole point of this video is that we built it with cloud code. Um, I would say that's like 90% true. In addition to cloud code, we obviously tried a variety
19:3919 minutes, 39 secondsof other models. So we tried DeepSseek to arbitrage token costs on like constant long running 247 uh uh like restructuring and refactoring and stuff
19:4719 minutes, 47 secondslike that constant like bug fixes and and so on and uh that worked okay. We tried codeex a number of times. Um our team is increasingly using codecs just
19:5619 minutes, 56 secondsas we've run into like some um token issues and the tokconomics essentially are the main thing that that are holding us back from going all in on cloud code
20:0220 minutes, 2 seconds24/7. But also I think over the course of the next few months you'll probably see fluctuations in the quality of each of these models and the availability of
20:1020 minutes, 10 secondseach of these models because uh you know like the major AI companies are starting to get very computed because everybody on the planet earth wants one of these models now. They're realizing how
20:1820 minutes, 18 secondseconomically effective they are. And so you need to be able to just like hot swap your codebase at will from let's say like a cloud codebased project to like a codeex project. And this isn't
20:2620 minutes, 26 secondsreally that hard at all. It's just like a a little bit of friction that I think slows people down. But uh Clarvo we just made our our codebase totally model agnostic. And what that means is like
20:3420 minutes, 34 secondsyou know how cloud code has like a skills spec and it expects a quad.mmd and so on and so forth. Uh we just have like you know an agents MD, we have the
20:4120 minutes, 41 secondsagents skills spec. We have uh you know things for Gemini Gemini MD just in case at any point in time we want to hop over
20:4920 minutes, 49 secondsor maybe employ a different model to see if maybe that model can solve a problem that we're struggling with. Um you know it's just like that and anybody in our team has the ability to to do so. So the
20:5820 minutes, 58 secondsreal actionable tip here is just duplicate everything and then probably have Claude go through the specs of each of these models and just like make sure to prepare the workspace so that at any
21:0621 minutes, 6 secondspoint in time you have the ability to you know instant preload all of your system prompts and so on. And um MCP specs and then skill specs are actually
21:1421 minutes, 14 secondscurrently understood differently from like claude versus other uh platforms like not all platforms do the YAML front matter tuning for instance where they'll
21:2221 minutes, 22 secondsonly preload uh like the name and the description of the skill. Um some of them will actually load the entire thing. These are just slight little model differences that you can optimize
21:2921 minutes, 29 secondsaround that'll uh you know allow you and other people within your company to operate much faster. Okay, I hope you guys like the video. Had a lot of fun putting it together for you. Um as
21:3721 minutes, 37 secondsmentioned obligatory pitch for the SAS company that was sort of the case study for this whole video, Clarvo. If you guys want to improve your pickup rates, definitely check that out. Um because
21:4521 minutes, 45 secondsyou know, we're experimenting with with pricing and a variety of different things. Um you know, I'll add a link to the top of the description so you guys can give that a quick click and go through if you'd like. More generally,
21:5421 minutes, 54 secondsif you guys want to learn how to monetize AI, automation, and SAS apps in this way, definitely check out Maker School. It's my 90-day accountability program where I will guarantee you that
22:0222 minutes, 2 secondsyou get your first customer for an AI or automation related service within that time period, or I give you your money back. And if you guys have any ideas for future videos, or if you guys want me to
22:1022 minutes, 10 secondsrecord something on a specific topic that is trending, interesting, or just sort of stream of consciousness, feel free to let me know. I take most of my video ideas at this point from people in
22:1822 minutes, 18 secondsthe comments. Okay, thank you again for watching and I'll catch all y'all in the next
