---
id: article-2026-04-09-privacy-mode-data-retention
type: source
title: "Privacy Mode & Data Retention"
path: raw/articles/voice-ai/2026-04-09-privacy-mode-data-retention.md
author: Unknown
publisher: docs.wisprflow.ai
url: https://docs.wisprflow.ai/articles/6274675613-privacy-mode-data-retention
date_published: 
date_added: 2026-04-09
tags: [voice-ai, wispr-flow, privacy, data-retention, security]
status: processed
quality: high
summary: "Wispr Flow's Privacy Mode note explains its zero-retention option: dictation is processed for transcription and then discarded instead of being stored or used for model training."
related: [voice-ai, wispr-flow, privacy, data-retention, security]
---

# Privacy Mode & Data Retention

## Source Metadata

- Path: raw/articles/voice-ai/2026-04-09-privacy-mode-data-retention.md
- Author: Unknown
- Published: Unknown
- Publisher: docs.wisprflow.ai
- URL: https://docs.wisprflow.ai/articles/6274675613-privacy-mode-data-retention

## TL;DR

Available on: Mac, Windows, iOS, Android
Privacy Mode ensures your dictation content is never stored on Wispr servers after

## Key Claims

- Available on: Mac, Windows, iOS, Android
Privacy Mode ensures your dictation content is never stored on Wispr servers after
- Available on: Mac, Windows, iOS, Android
Privacy Mode ensures your dictation content is never stored on Wispr servers after transcription.
- What it is
Privacy Mode enables zero data retention for your dictation content.
- When to use it
Use Privacy Mode when you want to:

## Important Details

- Source captured from docs.wisprflow.ai.
- Section heading: What it is
- Section heading: When to use it
- Section heading: How it works in Flow
- Section heading: Overview
- Section heading: Key behaviors

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
- [[voice-dictation]]
- [[agent-security]]

## Source Text

Available on: Mac, Windows, iOS, Android
Privacy Mode ensures your dictation content is never stored on Wispr servers after transcription. Audio is processed in real time and immediately discarded — nothing is retained or used for model training.

What it is
Privacy Mode enables zero data retention for your dictation content. When enabled, dictation data is processed on Wispr servers for transcription but is not retained afterward — no audio, text, or derived data is stored or used for model training.
The setting appears as a toggle in Settings → Data & Privacy. Enterprise customers can enforce it organization-wide, and HIPAA BAA users have it permanently locked on.

When to use it
Use Privacy Mode when you want to:

Ensure dictation data never persists on Wispr servers after your session ends
Meet enterprise compliance requirements for data handling
Prevent Wispr from using your transcription data for model training
Work in healthcare settings under a HIPAA BAA

How it works in Flow
Overview
When Privacy Mode is on, dictation data is processed for transcription and immediately discarded. No dictation content, audio, or derived data is stored on Wispr servers or used for model training.
Key behaviors

Cross-device sync: Privacy Mode settings sync across your devices. Changes push to the server immediately; other devices pick up the change on their next sync cycle (approximately hourly on desktop). The most recent change wins based on timestamps. If simultaneous conflicting updates occur, the server version takes precedence.
Enterprise enforcement: Privacy Mode is locked on and cannot be disabled when your organization has enabled Zero Data Retention (ZDR) or when a HIPAA Business Associate Agreement has been signed. The toggle tooltip explains why it is locked. On iOS, if the app cannot retrieve your organization's settings, Privacy Mode is automatically enabled as a safety measure.
HIPAA BAA lock: After signing the HIPAA Business Associate Agreement, Privacy Mode is permanently locked on. Signing the BAA is irreversible.
"Help improve Flow" exclusion: Privacy Mode and "Help improve Flow" are mutually exclusive — enabling one disables the other. On iOS, the "Help improve Flow" option is not available in Settings → Data & Privacy after onboarding.
Password field protection (Mac): Flow automatically detects password fields and blocks paste. A "Paste Blocked" notification appears when this occurs.
Notes privacy on iOS: For HIPAA and other data-restricted users, notes are not synced to Wispr servers, notes content is not indexed in Spotlight search, and Siri suggestions based on notes are disabled. The AI summary button on notes is also hidden. These restrictions are lifted only if your organization has note syncing explicitly enabled.

Enterprise privacy features
Enterprise users have Privacy Mode automatically enabled during onboarding. On the privacy settings screen, Privacy Mode is pre-selected and locked. On desktop, both the Privacy Mode and "Help improve Flow" toggles are disabled. On iOS, Privacy Mode is shown first and the "Help improve Flow" option is greyed out and non-interactive. A notice explains: "Your organization has chosen privacy mode."
Enterprise administrators can also control how transcription data is stored locally on user devices. When an admin has locked this setting, the Data Storage dropdown in Settings → Data & Privacy is disabled with a tooltip explaining it is managed by the organization:

Store data locally: Transcripts are stored on the device indefinitely.
Auto-delete local data every 24 hours: Transcripts are automatically deleted after 24 hours.
Never store data locally: Transcripts are never saved to the device. The History page shows a message indicating history is disabled by your organization.

Warning: Once a HIPAA BAA is signed at the organization level, the Zero Data Retention toggle cannot be disabled. Wispr may also lock the ZDR setting at the request of an organization, preventing changes without contacting Wispr support.
Local data storage (individual users)
On desktop, individual users can manage local data storage via Settings → Data & Privacy → Data Storage. The three available options are:

Store data normally: Transcripts and polish history are kept as usual. This is the default.
Auto-delete data every 24 hours: Transcripts and polish history older than 24 hours are automatically deleted.
Never store data: All existing transcripts and polish history are immediately deleted, and no future transcripts or polish history are saved. The History page shows a message indicating that data storage is disabled, with guidance to change it in Settings → Data & Privacy.

Warning: Switching to "Auto-delete data every 24 hours" or "Never store data" triggers a confirmation dialog before the change is applied, as the action deletes existing transcripts and polish history. The policy takes effect immediately upon confirmation.
Local transcription history
Privacy Mode prevents Wispr servers from retaining your dictation data after processing, while local history storage governs what transcription records are kept on your device. These are independent settings.

Android: History is saved locally and managed automatically based on available storage (up to 100,000 entries with ≥1 GB free, 50,000 with 500 MB–1 GB, 25,000 with less than 500 MB). Both internal storage and external SD cards are considered. When the limit is reached, the oldest entries are removed.
iOS: "Auto-delete transcripts" is available in Settings → Data & Privacy (default off). When enabled, history entries older than the current day are automatically deleted each time the app comes to the foreground. Auto-delete requires you to be signed in. Transcription age is determined by when recording started — a session started before midnight but finished after is treated as the previous day.

Click the Flow icon in your menu bar (Mac) or system tray (Windows), then click Settings.
Go to Data & Privacy.
Toggle Privacy Mode on.

Open the Wispr Flow app.
Tap Settings → Data & Privacy.
Toggle Privacy Mode on.

The toggle takes effect immediately — no app restart required.

Privacy Mode is available for enterprise customers on qualifying plans. To enable it for your organization:

Contact your account representative.
Review your enterprise agreement terms.
Visit the Data Controls page for additional information.

Once enabled at the organization level, Privacy Mode applies to all users automatically.

Individual user enabling Privacy Mode
You open Settings → Data & Privacy and toggle Privacy Mode on. The "Help improve Flow" option is automatically unchecked. From this point, all dictation data is processed and immediately discarded from Wispr servers.

Individual user choosing not to store data locally (Mac or Windows)
You open Settings → Data & Privacy and set the Data Storage dropdown to "Never store data." A confirmation dialog warns that your existing transcripts and polish history will be deleted. After confirming, all local history is immediately removed and no future transcripts are saved. You can change this setting at any time from the same dropdown.

Enterprise admin enforcing zero data retention
Your organization enables ZDR through your account representative. All team members see Privacy Mode locked on in their settings — the toggle is greyed out and cannot be disabled. New members joining the organization have it pre-selected during onboarding.

HIPAA BAA user
After signing the HIPAA Business Associate Agreement, Privacy Mode is permanently locked on for your account. Dictation data is never stored on Wispr servers, meeting healthcare compliance requirements. On iOS, notes are not synced to Wispr servers, notes content does not appear in Spotlight search, and Siri suggestions based on notes are disabled.

Can I use Privacy Mode as an individual user?
Yes. Individual users can enable Privacy Mode on Mac, Windows, iOS, and Android through Settings → Data & Privacy. Enterprise-level enforcement is available on qualifying plans — contact your account representative to learn more.

Is aggregated or anonymized data retained?
Aggregated or anonymized dictation data is not retained indefinitely. This data is not used for marketing purposes, external sharing or sale, or public benchmarks without explicit customer consent.

What data is still collected when Privacy Mode is on?
Privacy Mode applies to dictation content only. Account information, usage metadata (timestamps, feature usage, session data), technical logs, and billing information may still be collected for operational purposes.

What happens to my data when my contract ends?
If Privacy Mode was enabled, no dictation data persists — none was retained in the first place. Account and operational data is deleted or returned as specified in your Data Processing Addendum (DPA), which you can request access to through our Trust Center.

Do subprocessors retain my dictation data?
When Privacy Mode is enabled, subprocessors are contractually required to adhere to zero data retention — no subprocessor retains dictation data after processing is complete.

Can my organization lock the Data Storage setting?
Yes. Enterprise admins can lock the Data Storage setting for all users in their organization. When locked, the Data Storage dropdown in Settings → Data & Privacy is disabled and a tooltip explains that the setting is managed by your organization.

Privacy Mode is available on Mac, Windows, iOS, and Android for individual users. Enterprise customers can enforce it organization-wide across all platforms.
HIPAA BAA signing is available on Mac, Windows, and iOS. It is not available on Android. Signing the BAA is irreversible and permanently locks Privacy Mode on.
Privacy Mode applies to dictation content only — account information, usage metadata, and technical logs may still be collected.
Password field protection is automatic on Mac and requires no configuration.
The Data Storage dropdown (Settings → Data & Privacy) is available on Mac and Windows. Selecting "Auto-delete data every 24 hours" or "Never store data" requires confirmation before changes are applied, as existing transcripts and polish history will be deleted.
On iOS, HIPAA and data-restricted users have notes syncing, Spotlight indexing of notes, Siri suggestions for notes, and the AI summary button on notes disabled by default. These features are available only if your organization has note syncing explicitly enabled.
For users not operating under Privacy Mode, standard retention periods apply as described in the Privacy Policy.
