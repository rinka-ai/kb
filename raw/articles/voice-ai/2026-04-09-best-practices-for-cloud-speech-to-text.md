---
id: article-2026-04-09-best-practices-for-cloud-speech-to-text
type: source
title: "Best practices for Cloud Speech-to-Text"
path: raw/articles/voice-ai/2026-04-09-best-practices-for-cloud-speech-to-text.md
author: Unknown
publisher: Google Cloud Documentation
url: https://cloud.google.com/speech-to-text/docs/best-practices
date_published: 
date_added: 2026-04-09
tags: [voice-ai, speech-to-text, audio-quality, google-cloud, input]
status: processed
quality: medium
summary: Learn the best practices on providing speech data to the Cloud Speech-to-Text API for better efficiency and accuracy.
related: [voice-ai, speech-to-text, audio-quality, google-cloud, input]
---

# Best practices for Cloud Speech-to-Text

## Source Metadata

- Path: raw/articles/voice-ai/2026-04-09-best-practices-for-cloud-speech-to-text.md
- Author: Unknown
- Published: Unknown
- Publisher: Google Cloud Documentation
- URL: https://cloud.google.com/speech-to-text/docs/best-practices

## TL;DR

Learn the best practices on providing speech data to the Cloud Speech-to-Text API for better efficiency and accuracy.

## Key Claims

- Learn the best practices on providing speech data to the Cloud Speech-to-Text API for better efficiency and accuracy.
- Enable spoken punctuation and spoken emoji
- Specify word-level accuracy confidence levels
- Improve transcription with model adaptation

## Important Details

- Source captured from cloud.google.com.
- Section heading: Sampling rate
- Section heading: Frame size
- Section heading: Audio preprocessing
- Section heading: Request configuration
- Section heading: What's next

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
- [[speech-to-text]]

## Source Text

Enable spoken punctuation and spoken emoji

Specify word-level accuracy confidence levels

Improve transcription with model adaptation

This document contains recommendations on how to provide speech data to the
Speech-to-Text API. These guidelines are designed for greater efficiency
and accuracy as well as reasonable response times from the service. Use of the
Speech-to-Text API works best when data sent to the service is within the parameters
described in this document.

If you follow these guidelines and don't get the results you expect from the
API, see Troubleshooting & Support.

For optimal results...
      If possible, avoid...

Capture audio with a sampling rate of 16,000 Hz or higher.
      Lower sampling rates may reduce accuracy. However, avoid re-sampling. For example, in telephony the native rate is commonly 8000 Hz, which is the rate that should be sent to the service.

Use a lossless codec to record and transmit audio. FLAC or LINEAR16 is recommended.
      Using mp3, mp4, m4a, mu-law, a-law or other lossy codecs during recording or transmission may reduce accuracy. If your audio is already in an encoding not supported by the API, transcode it to lossless FLAC or LINEAR16. If your application must use a lossy codec to conserve bandwidth, we recommend the AMR_WB or OGG_OPUS codecs, in that preferred order.

The recognizer is designed to ignore background voices and noise without additional noise-canceling. However, for optimal results, position the microphone as close to the user as possible, particularly when background noise is present.
      Excessive background noise and echoes may reduce accuracy, especially if a lossy codec is also used.

If you are capturing audio from more than one person, and each person is recorded on a separate channel, send each channel separately to get the best recognition results. However, if all speakers are mixed in a single channel recording, send the recording as is.
      Multiple people talking at the same time, or at different volumes may be interpreted as background noise and ignored.

Use word and phrase hints to add names and terms to the vocabulary and to boost the accuracy for specific words and phrases.
      The recognizer has a very large vocabulary, however terms and proper names that are out-of-vocabulary will not be recognized.

If possible, set the sampling rate of the audio source to 16000 Hz.

For headerless codecs, use the
explicit_decoding_config
setting in
RecognitionConfig to set sample_rate_hertz to match the native sample rate of the audio source
(instead of re-sampling).

For codecs with a header, use the
auto_decoding_config
setting in
RecognitionConfig to automatically choose the correct sampling rate.

Streaming recognition recognizes live audio as it is captured from a microphone
or other audio source. The audio stream is split into frames and sent in
consecutive StreamingRecognizeRequest messages. Any frame size is acceptable.
Larger frames are more efficient, but add latency. A 100-millisecond frame size
is recommended as a good tradeoff between latency and efficiency.

It's best to provide audio that is as clean as possible by using a good quality
and well-positioned microphone. However, applying noise-reduction signal
processing to the audio before sending it to the service typically reduces
recognition accuracy. The service is designed to handle noisy audio.

Position the microphone as close as possible to the person that is
speaking, particularly when background noise is present.
Avoid audio clipping.
Do not use automatic gain control (AGC).
All noise reduction processing should be disabled.
Listen to some sample audio. It should sound clear, without distortion or
unexpected noise.

Make sure that you accurately describe the audio data sent with your request
to the Speech-to-Text API. Ensuring that the
RecognitionConfig
for your request describes the correct sampleRateHertz, encoding, and that
you are using a
Recognizer
with the correct language_codes and model will result in the most accurate
transcription and billing for your request.

Use client libraries to transcribe audio using your favorite programming language.
  Learn how to transcribe short audio files.
  Learn how to transcribe streaming audio.
  Learn how to transcribe long audio files.

Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License, and code samples are licensed under the Apache 2.0 License. For details, see the Google Developers Site Policies. Java is a registered trademark of Oracle and/or its affiliates.
  Last updated 2026-04-02 UTC.

[[["Easy to understand","easyToUnderstand","thumb-up"],["Solved my problem","solvedMyProblem","thumb-up"],["Other","otherUp","thumb-up"]],[["Hard to understand","hardToUnderstand","thumb-down"],["Incorrect information or sample code","incorrectInformationOrSampleCode","thumb-down"],["Missing the information/samples I need","missingTheInformationSamplesINeed","thumb-down"],["Other","otherDown","thumb-down"]],["Last updated 2026-04-02 UTC."],[],[]]
