---
id: concept-voice-dictation
type: concept
title: Voice Dictation
tags: [voice-dictation, dictation, wispr-flow, speech-to-text, commands]
source_count: 5
summary: Voice dictation systems optimize for fast cursor-level text entry and editing, which makes them a distinct product shape from conversational voice agents.
canonical_for: [voice dictation, dictation interfaces, command mode, wispr flow]
review_status: reviewed
last_reviewed: 2026-06-03
review_due: 2026-07-03
confidence: "0.79"
---

# Voice Dictation

## Summary

Voice dictation products are not just smaller voice agents. They are optimized for high-frequency text entry and editing inside existing applications, where latency, hotkey ergonomics, cursor placement, and privacy posture matter more than full dialogue orchestration. In agentic engineering, the listener being an LLM changes the tolerance profile: partial, messy, or self-correcting speech can still be useful when the model can resolve intent against project context.

## Product Shape

- speak into any text field rather than hold a full conversation
- use command mode or edit commands for local text transformations
- bias toward immediate insertion and low friction over deep agent planning
- learn personal vocabulary and recurring terms over time
- for agent work, capture high-bandwidth intent quickly and let the model normalize false starts or incomplete phrasing against context

## Design Priorities

- hotkey and cursor interaction must feel instantaneous
- transcription should preserve formatting and editing intent
- command surfaces need to map spoken instructions into concrete text operations
- privacy posture matters because dictation is often used on sensitive personal content
- physical capture conditions still matter: microphone placement, shared-office etiquette, and mobile app switching can dominate theoretical model quality

## Source Notes

- [[2026-04-09-what-is-flow]]
- [[2026-04-09-starting-your-first-dictation]]
- [[2026-04-09-how-to-use-command-mode]]
- [[2026-04-09-privacy-mode-data-retention]]
- [[2026-06-02-every-agentic-engineering-hack-i-know]]
