---
id: article-2026-04-18-how-to-build-a-1m-yr-gtm-team-with-claude-opus-4-7-user-provided-summary
type: source
title: "How to Build a $1M/yr GTM Team with Claude Opus 4.7 (user-provided summary)"
path: raw/articles/user-provided/2026-04-18-how-to-build-a-1m-yr-gtm-team-with-claude-opus-4-7-user-provided-summary.md
author: Levi Munneke
publisher: User-provided summary
url:
date_published: 2026-04-17
date_added: 2026-04-18
tags: [outbound, gtm, prospecting, sales-automation, claude-code]
status: processed
quality: medium
summary: A practical but marketing-heavy outbound workflow that uses structured business context, source discovery, scraper generation, AI-assisted sequence drafting, and TAM math to operationalize outreach with Claude.
related: [outbound, gtm, prospecting, sales-automation, claude-code]
---

# How to Build a $1M/yr GTM Team with Claude Opus 4.7 (user-provided summary)

## Source Metadata

- Path: raw/articles/user-provided/2026-04-18-how-to-build-a-1m-yr-gtm-team-with-claude-opus-4-7-user-provided-summary.md
- Author: Levi Munneke
- Published: 2026-04-17
- Publisher: User-provided summary
- URL: None

## TL;DR

This summary describes an outbound workflow that uses Claude as a context-aware operations layer across business-context setup, unconventional data-source discovery, scraper generation, draft messaging, and TAM/infrastructure planning. The strongest ideas are workflow decomposition and context discipline; the weakest parts are the hype, missing evals, and underplayed compliance constraints.

## Key Claims

- A structured business context pack improves downstream outbound outputs.
- Differentiated data sources matter more than relying on saturated lead databases.
- Scrapers, copy drafts, and TAM math can all be driven from prompt sequences.
- Human review should remain in the loop before launch, even when the model does most of the drafting.

## Important Details

- The workflow starts by generating a `/business-context` folder with targeted templates for ICP, offer, positioning, past wins, and tooling.
- It then asks the model to rank alternative prospect-data sources by volume, quality, scrape-ability, uniqueness, and signal strength.
- For the chosen source, the post proposes generating a production Python scraper with dedupe, retry, logging, testing, and cron scheduling.
- Messaging is split into short cold-email drafts and a higher-touch LinkedIn sequence for the top 10% of accounts.
- The final planning step is explicit infrastructure math: inbox counts, domain counts, LinkedIn accounts, send volume, cost, and warmup assumptions.
- The piece repeatedly frames the system as "the model does the work; you review and launch."

## Entities

- Person: Levi Munneke
- Systems: Claude Code
- Concepts: outbound automation, TAM coverage, prospect sourcing, scraper generation, AI-assisted copy

## My Notes

- The most valuable pattern here is not "Claude replaces a GTM team," but "break the motion into context-rich, inspectable subproblems with clear artifacts."
- The post is useful as an implementation sketch, but it is not evidence for the revenue outcomes it claims and it largely ignores platform policy, deliverability telemetry, and legal nuance.

## Open Questions

- Which parts of this workflow should remain deterministic software rather than agentic prompting?
- What is the right evaluation framework for outbound systems beyond meetings booked or reply counts?

## Related

- [[claude-code]]
- [[workflows]]
- [[2026-04-18-outbound-ai-agent-kb-upgrades]]

## Source Text

How to Build a $1M/yr GTM Team with Claude Opus 4.7
Author: Levi Munneke (@levikmunneke), Apr 17, 2026
Premise: A system of training documents, prompts, and SOPs that turns Claude Opus 4.7 into a team of A-player GTM engineers. Combines the author's outbound knowledge (from sending 1M+ emails) with knowledge of your business to produce an outbound motion. Every step is a prompt. Every prompt inherits context from the previous step. The model does the work; you review and launch.
Step 1 — The Knowledge Base
Claude Code is only as smart as the context you give it. Install Claude Code and build a /business-context folder. Prompt:

i'm setting up claude code to run an outbound automation system. before anything else, build me a /business-context folder with 5 files:

icp.md (who we sell to)
offer.md (what we deliver and the outcome)
positioning.md (why us, objections, who we're not for)
past-wins.md (top 10 closed clients, how we found them, what triggered the buy)
tools.md (sending stack, crm, enrichment, anything we'll interface with)

for each file, output a template with only the questions whose answers will actually change what you output downstream. no generic marketing fluff. keep it tight.

Claude writes the templates; you fill them in. Every later prompt inherits this context.
Step 2 — Have Claude Find Your Data Pool
Avoid Apollo/ZoomInfo/Lusha (same data everyone else uses). Prompt:

read /business-context completely. based on my icp and past wins, identify 10 data sources where these prospects exist that most of my competitors aren't using. for each source, tell me:

estimated volume of matching prospects in my tam
data quality - what fields can i extract
scrape-ability - public / paid / api / rate-limited
uniqueness - roughly how many competitors are using this source
signal strength - what can I infer about buyer intent from someone appearing here

output as a ranked table. prioritize sources with public data, high volume, and low competitor saturation. flag anything legally grey.

Example sources Claude returns: Google Maps (~265M listings, near-zero competition in many local niches), niche subreddits where your ICP posts pain, niche directories (bar associations, chambers of commerce, trade groups), podcast guest lists, specific LinkedIn groups, GitHub repos (if selling to devs), conference attendee lists. Pick the top 2–3 your competitors haven't touched — that's your data moat.
Step 3 — Claude Builds a Contacts Scraper
Prompt:

build me a production python scraper for [chosen data source]. requirements:

pull these fields: company name, decision maker name, email, phone, website, industry, location, [custom field 1], [custom field 2]
output to a date-stamped csv
deduplicate against a master.db sqlite file that persists across runs so i never pull the same contact twice
handle rate limiting with exponential backoff
retry transient failures, log permanent failures to errors.log
include a --dry-run flag
write pytest unit tests for the parsing logic

set it up to run on a daily cron. test with 100 records, show me the output, fix any bugs, then tell me when it's production-ready.

Claude iterates on edge cases. Output: a scraper producing 500–2,000 fresh contacts per run. For Google Maps, Claude wires up RapidAPI's business data API with a website contact finder. For niche directories, Claude writes a Playwright script handling pagination, cookie walls, and basic bot detection. Runs on a 4 AM cron; fresh leads by morning. Look at API platforms for more unique data.
Step 4 — Claude Drafts the Sequences
Most AI outbound fails because people let Claude write the whole email (sounds like a bot, deliverability dies, ~0.2% reply rates). Instead: Claude drafts, you edit for voice.
Email prompt:

read /business-context. draft a 2-email cold sequence targeting [icp]. angle: [specific signal we're scraping for, e.g. "just hired 5+ sales people in the last 90 days"]. constraints:

under 75 words per email
subject line under 4 words

write 5 variants of each email. flag any spam trigger words. tell me which variant you'd ship and why.

LinkedIn prompt (top 10% only):

now write the linkedin version of this sequence only for the top 10% of the list. dream accounts, highest fit. 3 touches:

profile view + connection request with a personalized note under 200 characters, no pitch
day 3 after acceptance: value message, open-ended, no pitch
day 7: soft pitch tied to the same angle as the email sequence

match the tone of the email copy so a prospect who sees both feels like one person reached out. 3 variants per touch.

Two channels, coordinated, grounded in your business context.
Step 5 — TAM Coverage Math
Prompt:

my tam is approximately 30,000 companies. i want to touch every single one via email in 90 days, and the top 10% via linkedin. calculate the infrastructure i need. factors:

2 email touches per contact over 90 days
3 linkedin touches per top 10% prospect over 90 days
email deliverability target 90%+
20 emails per inbox per day
50 linkedin actions per account per day (25 messages, 25 inmails)
new inboxes need 2 weeks warmup before full volume

output: domains needed, inboxes needed, linkedin accounts needed, daily send volume per channel, monthly cost (domains + inboxes + sales nav + sending platform), total touches delivered, cost per touch. sanity-check the numbers.

With Instantly or Smartlead (~$97) plus Claude and VPS costs, you're under $600/mo to touch the entire TAM every 90 days at a 10:1 email-to-LinkedIn ratio.
Why the 10-to-1 Split Matters
Email = coverage layer (every TAM company, low cost per touch, scales). LinkedIn = precision layer (top 10% dream accounts, 3 highly personalized touches written by you and polished by Claude). Hitting a dream account on both builds name recognition — that familiarity closes deals weeks later when the right pain hits. Volume where volume works; precision where precision works.
7-Day Deployment

Day 1: Fill in business-context files. Install Claude Code.
Day 2: Run the data pool research prompt. Pick top 2 sources.
Day 3: Claude builds scrapers. Test with 100 contacts.
Day 4: Email infrastructure — buy domains & inboxes, warm in Instantly.
Day 5: Run sequence prompts. Edit for voice. Load into Instantly.
Day 6: Configure LinkedIn accounts (alt accs or team). Filter 10% list.
Day 7: Test sends at low volume. Monitor deliverability. Fix edge cases.
Week 2+: Scale volume daily. First meetings booked within 10 days.
Month 3: Entire TAM touched. You know what messaging works. Booking 40–80 calls/month.
Month 6: $500k–$1M pipeline from a system built in a week, running on a model cheaper than a monthly Starbucks habit.

System Implementation / CTA
The model, prompts, and playbook are ready. Author offers a done-for-you build (DM "OPUS") or a call at cal.com/leviwelch/30min.
