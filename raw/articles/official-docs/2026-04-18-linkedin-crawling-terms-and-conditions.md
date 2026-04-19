---
id: article-2026-04-18-linkedin-crawling-terms-and-conditions
type: source
title: "LinkedIn: Crawling Terms and Conditions"
path: raw/articles/official-docs/2026-04-18-linkedin-crawling-terms-and-conditions.md
author: LinkedIn
publisher: LinkedIn Legal
url: https://www.linkedin.com/legal/crawling-terms
date_published: 2017-05-25
date_added: 2026-04-18
tags: [linkedin, policy, scraping, automation, outbound]
status: processed
quality: high
summary: LinkedIn's crawling terms say automated crawling and indexing require explicit permission, reinforcing that LinkedIn data collection is not a default-safe source for outbound scraping.
related: [linkedin, policy, scraping, automation, outbound]
---

# LinkedIn: Crawling Terms and Conditions

## Source Metadata

- Path: raw/articles/official-docs/2026-04-18-linkedin-crawling-terms-and-conditions.md
- Author: LinkedIn
- Published: 2017-05-25
- Publisher: LinkedIn Legal
- URL: https://www.linkedin.com/legal/crawling-terms

## TL;DR

LinkedIn's separate crawling terms reinforce the user-agreement restrictions by treating automated crawling as something that requires explicit permission. That makes LinkedIn a weak default choice for a scraper-led outbound data moat unless a team has a clearly authorized path.

## Key Claims

- Automated collection of LinkedIn data is governed by a dedicated permission regime, not just generic website access.
- Crawling should be assumed disallowed unless explicitly whitelisted.
- Platform permission is a first-class part of data-source selection for outbound agents.

## Important Details

- The page says the terms govern collection of data from LinkedIn through automated means such as bots, robots, spiders, crawlers, or scrapers.
- It instructs parties seeking permission to crawl LinkedIn to apply through `whitelist-crawl@linkedin.com`.
- The terms frame automated crawling and indexing as a special case that needs LinkedIn's express approval, not as normal product usage.

## Entities

- Organization: LinkedIn
- Concepts: automated crawling, indexing, whitelisting, scraper permissions

## My Notes

- This is a useful source because it sharpens data-source selection: "rich data exists there" is not enough if the access path itself is contractually restricted.
- In the outbound context, it pushes teams toward public web sources, customer-owned data, opt-in channels, or clearly authorized datasets before they automate LinkedIn extraction.

## Open Questions

- Which source classes in the KB should be tagged as authorized, ambiguous, or restricted for agentic acquisition work?
- Should the KB start treating "data moat" and "policy-safe source" as separate evaluation dimensions?

## Related

- [[agent-security]]
- [[web-agents]]
- [[2026-04-18-outbound-ai-agent-kb-upgrades]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
