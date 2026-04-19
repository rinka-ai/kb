---
id: article-2026-04-18-gmail-email-sender-guidelines
type: source
title: "Gmail: Email sender guidelines"
path: raw/articles/official-docs/2026-04-18-gmail-email-sender-guidelines.md
author: Google
publisher: Google Workspace Admin Help
url: https://support.google.com/mail/answer/81126?hl=en
date_published:
date_added: 2026-04-18
tags: [email, deliverability, gmail, compliance, outbound]
status: processed
quality: high
summary: Gmail's sender guidelines turn outbound deliverability into an infrastructure problem, with explicit requirements around authentication, DNS, TLS, spam rates, DMARC alignment, and one-click unsubscribe for bulk senders.
related: [email, deliverability, gmail, compliance, outbound]
---

# Gmail: Email sender guidelines

## Source Metadata

- Path: raw/articles/official-docs/2026-04-18-gmail-email-sender-guidelines.md
- Author: Google
- Published: Unknown
- Publisher: Google Workspace Admin Help
- URL: https://support.google.com/mail/answer/81126?hl=en

## TL;DR

Google's sender requirements make clear that outbound email systems are constrained by provider-level rules, not only by copy quality or sending volume. For Gmail, bulk sending requires aligned authentication, low spam rates, visible unsubscribe paths, and one-click unsubscribe support.

## Key Claims

- Deliverability depends on sender infrastructure and recipient behavior, not only message text.
- Bulk sender requirements are first-class operational constraints for outbound systems.
- Authentication and alignment are necessary for both trust and inbox placement.
- Unsubscribe handling is part of deliverability, not only legal compliance.

## Important Details

- The page says that starting February 1, 2024, all senders to personal Gmail accounts must meet baseline requirements including SPF or DKIM, valid forward and reverse DNS, TLS, RFC 5322 formatting, and spam rates below 0.3% in Postmaster Tools.
- It defines bulk senders as senders that send more than 5,000 messages per day to Gmail accounts.
- For bulk senders, Google requires SPF and DKIM, DMARC for the sending domain, and alignment between the domain in the `From:` header and either the SPF or DKIM domain.
- Marketing and subscribed messages for bulk senders must support one-click unsubscribe and include a clearly visible unsubscribe link in the message body.
- The doc recommends using DMARC reports and stronger DKIM keys, and notes that unauthenticated messages may be rejected with a `5.7.26` error.
- The guidance also warns against misleading headers, deceptive formatting, hidden content, and unclear links.

## Entities

- Organization: Google
- Systems: Gmail, Postmaster Tools
- Concepts: SPF, DKIM, DMARC, DNS, TLS, DMARC alignment, one-click unsubscribe

## My Notes

- This is one of the most important corrective sources for outbound-agent hype because it reframes email outreach as a compliance and reputation management system, not just a prompt-and-send problem.
- The practical implication is that any outbound agent should treat authentication, unsubscribe handling, and spam-rate monitoring as hard preflight checks.

## Open Questions

- Which of these sender requirements should become explicit checks in a reusable outbound-agent harness?
- Should the KB eventually capture a more detailed model of provider-specific deliverability constraints beyond Gmail and Yahoo?

## Related

- [[workflows]]
- [[agent-security]]
- [[2026-04-18-outbound-ai-agent-kb-upgrades]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
