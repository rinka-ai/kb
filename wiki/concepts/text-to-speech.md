---
id: concept-text-to-speech
type: concept
title: Text To Speech
tags: [text-to-speech, audio, voice-output, ssml, streaming]
source_count: 5
summary: Text-to-speech is an output design problem as much as an API call, balancing latency, style control, markup, and disclosure requirements.
canonical_for: [text to speech, voice output, speech synthesis, ssml]
review_status: reviewed
last_reviewed: 2026-04-16
review_due: 2026-05-16
confidence: "0.83"
---

# Text To Speech

## Summary

Text-to-speech turns text into spoken output, but good systems need more than a voice ID. They need a control surface for pace, tone, pronunciation, and output format, plus product rules around disclosure and consistency.

## Control Surfaces

- built-in or custom voices
- prompt-style delivery instructions for tone, pacing, and accent
- SSML or other markup for timing, pronunciation, and structure
- output-format choices for streaming, archiving, or low-latency playback

## Design Rules

- treat style as part of the interface contract, not just a cosmetic setting
- use markup when explicit pronunciation or timing guarantees matter
- choose output formats for the playback environment rather than defaulting blindly
- disclose AI-generated speech clearly to end users

## Tensions

- naturalness versus deterministic output control
- prompt steering versus markup-driven structure
- fast streaming versus richer post-processing
- expressive custom voices versus governance and cloning risk

## Source Notes

- [[2026-04-09-text-to-speech]]
- [[2026-04-09-steering-text-to-speech-for-more-dynamic-audio-generation]]
- [[2026-04-09-speech-synthesis-markup-language-ssml]]
- [[2026-04-09-voice-and-sound-with-speech-synthesis-markup-language-ssml]]
- [[2026-04-09-voice-design]]
