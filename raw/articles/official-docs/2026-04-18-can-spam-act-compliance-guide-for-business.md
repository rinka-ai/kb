---
id: article-2026-04-18-can-spam-act-compliance-guide-for-business
type: source
title: "CAN-SPAM Act: A Compliance Guide for Business"
path: raw/articles/official-docs/2026-04-18-can-spam-act-compliance-guide-for-business.md
author: Federal Trade Commission
publisher: FTC
url: https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business
date_published:
date_added: 2026-04-18
tags: [email, compliance, can-spam, outbound, policy]
status: processed
quality: high
summary: "The FTC's CAN-SPAM guide makes commercial-email rules explicit: truthful headers and subjects, clear identity, a postal address, working opt-out, prompt opt-out handling, and ongoing responsibility even when another vendor sends on your behalf."
related: [email, compliance, can-spam, outbound, policy]
---

# CAN-SPAM Act: A Compliance Guide for Business

## Source Metadata

- Path: raw/articles/official-docs/2026-04-18-can-spam-act-compliance-guide-for-business.md
- Author: Federal Trade Commission
- Published: Unknown
- Publisher: FTC
- URL: https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business

## TL;DR

The FTC guide is a reminder that outbound email systems are legal systems as well as technical ones. CAN-SPAM applies broadly to commercial email, including B2B email, and it keeps the sender responsible even when another company or platform executes the campaign.

## Key Claims

- Commercial outbound email is subject to concrete statutory requirements, not just provider preferences.
- B2B email is not exempt from CAN-SPAM.
- Working opt-out handling is mandatory and time-bounded.
- Outsourcing execution does not outsource legal responsibility.

## Important Details

- The FTC guide says CAN-SPAM applies to commercial messages and specifically notes that there is no exception for business-to-business email.
- The page requires accurate header information and non-deceptive subject lines.
- Commercial email must identify the sender, include a valid physical postal address, and provide a clear way to opt out of future marketing email.
- Opt-out requests must be honored within 10 business days, and the opt-out process cannot impose unreasonable friction.
- The guide says the law makes both the promoted company and the company actually sending the message potentially liable.
- The FTC page states that each separate email in violation can trigger penalties up to $53,088.

## Entities

- Organization: Federal Trade Commission
- Concepts: CAN-SPAM, commercial email, opt-out handling, sender liability, B2B email

## My Notes

- This is the cleanest official rebuttal to any outbound workflow that treats deliverability tooling as the only constraint surface.
- The operational implication is that suppression lists, opt-out propagation, and sender identity should live in the core system design, not in last-mile campaign ops.

## Open Questions

- Which parts of CAN-SPAM compliance should be enforced in the outbound harness itself versus audited downstream in CRM or ESP tooling?
- Should the KB include a reusable suppression-list and opt-out propagation pattern for outbound systems?

## Related

- [[workflows]]
- [[agent-security]]
- [[2026-04-18-outbound-ai-agent-kb-upgrades]]

## Source Text

Not copied locally. Use the source URL above if the full text is needed.
