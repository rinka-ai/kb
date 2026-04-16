---
id: article-2026-04-12-retention
type: source
title: "Retention"
path: raw/articles/voice-ai/2026-04-12-retention.md
author: ElevenLabs
publisher: ElevenLabs Docs
url: https://elevenlabs.io/docs/eleven-agents/customization/privacy/retention
date_published: 
date_added: 2026-04-12
tags: [voice-ai, elevenlabs, voice-agents, privacy, retention]
status: processed
quality: medium
summary: Control how long your agent retains conversation history and recordings.
related: [voice-ai, elevenlabs, voice-agents, privacy, retention]
---

# Retention

## Source Metadata

- Path: raw/articles/voice-ai/2026-04-12-retention.md
- Author: ElevenLabs
- Published: Unknown
- Publisher: ElevenLabs Docs
- URL: https://elevenlabs.io/docs/eleven-agents/customization/privacy/retention

## TL;DR

Control how long your agent retains conversation history and recordings.

## Key Claims

- Control how long your agent retains conversation history and recordings.
- Control how long your agent retains conversation history and recordings.Retention settings allow you to configure how long your conversational agent stores conversation transcripts and audio recordings.
- Any number of days (e.g., 30, 90, 365)
Unlimited retention by setting the value to -1
Scheduled deletion by setting the value to 0
- The retention settings apply separately to:

## Important Details

- Source captured from elevenlabs.io.
- Section heading: Overview
- Section heading: Modifying retention settings
- Section heading: Prerequisites
- Section heading: Access retention settings
- Section heading: Update retention period

## Entities

- People: Unknown
- Companies: Unknown
- Tools: Unknown
- Concepts: Unknown

## My Notes

- Imported automatically by `bun run kb:ingest`.
- Review and refine the structured sections before relying on this note heavily.

## Open Questions

- What claims in this source matter most for the current knowledge base?
- Which concept pages should link back to this note?

## Related

- [[voice-ai]]
- [[elevenlabs]]
- [[voice-agents]]
- [[privacy]]
- [[retention]]

## Source Text

Control how long your agent retains conversation history and recordings.Retention settings allow you to configure how long your conversational agent stores conversation transcripts and audio recordings. These settings help you comply with data privacy regulations.
Overview
By default, ElevenLabs retains conversation data for 2 years. You can modify this period to:

Any number of days (e.g., 30, 90, 365)
Unlimited retention by setting the value to -1
Scheduled deletion by setting the value to 0

The retention settings apply separately to:

Conversation transcripts: Text records of all interactions
Audio recordings: Voice recordings from both the user and agent

For GDPR compliance, we recommend setting retention periods that align with your data processing
purposes. For HIPAA compliance, retain records for a minimum of 6 years.
Modifying retention settings
Prerequisites

An ElevenLabs account
A configured ElevenLabs Conversational Agent (create one here)

Follow these steps to update your retention settings:
1Access retention settingsNavigate to your agent’s settings and select the “Advanced” tab. The retention settings are located in the “Data Retention” section.2Update retention period
Enter the desired retention period in days
Choose whether to apply changes to existing data
Click “Save” to confirm changes
When modifying retention settings, you’ll have the option to apply the new retention period to existing conversation data or only to new conversations going forward.
Reducing the retention period may result in immediate deletion of data older than the new
retention period if you choose to apply changes to existing data.
