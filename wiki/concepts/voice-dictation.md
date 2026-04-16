---
id: concept-voice-dictation
type: concept
title: Voice Dictation
tags: [voice-dictation, dictation, wispr-flow, speech-to-text, commands]
source_count: 4
summary: Voice dictation systems optimize for fast cursor-level text entry and editing, which makes them a distinct product shape from conversational voice agents.
canonical_for: [voice dictation, dictation interfaces, command mode, wispr flow]
review_status: reviewed
last_reviewed: 2026-04-16
review_due: 2026-05-16
confidence: "0.79"
---

# Voice Dictation

## Summary

Voice dictation products are not just smaller voice agents. They are optimized for high-frequency text entry and editing inside existing applications, where latency, hotkey ergonomics, cursor placement, and privacy posture matter more than full dialogue orchestration.

## Product Shape

- speak into any text field rather than hold a full conversation
- use command mode or edit commands for local text transformations
- bias toward immediate insertion and low friction over deep agent planning
- learn personal vocabulary and recurring terms over time

## Design Priorities

- hotkey and cursor interaction must feel instantaneous
- transcription should preserve formatting and editing intent
- command surfaces need to map spoken instructions into concrete text operations
- privacy posture matters because dictation is often used on sensitive personal content

## Source Notes

- [[2026-04-09-what-is-flow]]
- [[2026-04-09-starting-your-first-dictation]]
- [[2026-04-09-how-to-use-command-mode]]
- [[2026-04-09-privacy-mode-data-retention]]
