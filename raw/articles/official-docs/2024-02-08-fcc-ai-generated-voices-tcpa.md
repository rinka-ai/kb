---
id: article-2024-02-08-fcc-ai-generated-voices-tcpa
type: source
title: "FCC Declaratory Ruling: AI-Generated Voices and the TCPA"
path: raw/articles/official-docs/2024-02-08-fcc-ai-generated-voices-tcpa.md
author: Federal Communications Commission
publisher: Federal Communications Commission
url: https://docs.fcc.gov/public/attachments/FCC-24-17A1.pdf
date_published: 2024-02-08
date_added: 2026-07-27
tags: [voice-ai, compliance, tcpa, outbound, robocalls, consent]
status: active
quality: high
summary: FCC 24-17 clarifies that AI-generated human voices count as artificial or prerecorded voice messages under the TCPA, bringing consent, identification, and opt-out obligations into AI voice outreach.
related: [database-reactivation, voice-ai, outbound, compliance]
---

# FCC Declaratory Ruling: AI-Generated Voices and the TCPA

## Source Metadata

- Path: raw/articles/official-docs/2024-02-08-fcc-ai-generated-voices-tcpa.md
- Author: Federal Communications Commission
- Published: 2024-02-08
- Publisher: Federal Communications Commission
- URL: https://docs.fcc.gov/public/attachments/FCC-24-17A1.pdf
- Citation: FCC 24-17

## TL;DR

The FCC ruled that AI-generated voices fall within the TCPA's restrictions on calls using an artificial or prerecorded voice. AI voice does not create a consent loophole: covered calls require prior express consent, with prior express written consent for telemarketing or advertising, plus applicable identification and opt-out mechanisms.

## Key Claims

- AI-generated or voice-cloned human speech is an “artificial or prerecorded voice” for TCPA purposes.
- Covered calls require prior express consent absent an applicable exemption.
- Telemarketing or advertising calls using such voices require prior express written consent.
- Existing identification and disclosure obligations continue to apply.
- The ruling enables enforcement tools already available under the TCPA rather than creating an AI-specific consent regime.

## Important Details

- The declaratory ruling is FCC 24-17.
- It addresses technologies that generate human-like voices, including voice cloning.
- Consent requirements depend on call purpose and destination; this note is not a substitute for legal review.
- Database reactivation through AI voice must treat channel authorization separately from general CRM presence or a past commercial relationship.
- The ruling concerns voice calls; text, email, and other channels have distinct legal and platform requirements.

## Entities

- Organization: U.S. Federal Communications Commission
- Law: Telephone Consumer Protection Act
- Artifact: FCC 24-17
- Concepts: artificial voice, prerecorded voice, prior express consent, prior express written consent, opt-out

## My Notes

- This is the strongest primary source for the voice-channel boundary in database-reactivation campaigns.
- Consent should be modeled as a channel-, purpose-, jurisdiction-, and time-specific entitlement rather than a single boolean.
- Systems should retain evidence supporting the entitlement and enforce suppression before an agent or dialer receives the record.

## Open Questions

- How do later FCC rules alter revocation, one-to-one consent, or recordkeeping requirements?
- Which exemptions apply to specific informational call categories?
- How should a system verify that cloned or synthesized voices are used with authorization from the represented person?

## Related

- [[database-reactivation]]
- [[voice-ai]]
- [[outbound]]
- [[compliance]]
- [[2016-09-01-ftc-follow-the-lead]]

## Source Text

The full eight-page declaratory ruling was not copied locally. Use the official FCC PDF above for the canonical text.
