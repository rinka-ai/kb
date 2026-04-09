---
id: article-2026-04-09-steering-text-to-speech-for-more-dynamic-audio-generation
type: source
title: "Steering Text-to-Speech for more dynamic audio generation"
path: raw/articles/voice-ai/2026-04-09-steering-text-to-speech-for-more-dynamic-audio-generation.md
author: Unknown
publisher: cookbook.openai.com
url: https://cookbook.openai.com/examples/voice_solutions/steering_tts
date_published: 
date_added: 2026-04-09
tags: [voice-ai, text-to-speech, style-control, audio, openai-cookbook]
status: processed
quality: high
summary: "OpenAI's Cookbook example shows how audio chat completions can steer delivery style, tone, and accent more flexibly than traditional fixed-voice TTS endpoints."
related: [voice-ai, text-to-speech, style-control, audio, openai-cookbook]
---

# Steering Text-to-Speech for more dynamic audio generation

## Source Metadata

- Path: raw/articles/voice-ai/2026-04-09-steering-text-to-speech-for-more-dynamic-audio-generation.md
- Author: Unknown
- Published: Unknown
- Publisher: cookbook.openai.com
- URL: https://cookbook.openai.com/examples/voice_solutions/steering_tts

## TL;DR

This Cookbook note argues that good AI voices need more than a voice ID. When you generate audio through chat completions, you can instruct style, accent, tone, and delivery, which makes voice behavior a prompting and product-design problem rather than a static TTS setting.

## Key Claims

- Traditional TTS endpoints are good at stable voice rendering but weak at fine-grained control over delivery style.
- Audio chat completions make voice output more steerable by accepting instructions about tone, accent, pacing, and audience.
- Voice quality should be evaluated in context: the right delivery depends on the application, not just on selecting a single preferred voice.
- Prompting becomes part of voice design when the model can shape how the audio is spoken.

## Important Details

- The article contrasts a standard `audio.speech.create` flow with a chat-completions flow that emits audio.
- The example shows a children's-learning use case where a British accent and child-friendly delivery are specified in the system instructions.
- The practical takeaway is that application-specific delivery can be embedded directly in the prompt rather than outsourced to a separate prosody layer.

## Entities

- Company: OpenAI
- Products and APIs: audio speech API, chat completions, gpt-4o-audio-preview, tts-1-hd
- Concepts: style steering, accent control, delivery prompts, dynamic TTS

## My Notes

- This is a strong source for the claim that "voice" is partly prompt engineering once the stack supports instruction-following audio generation.
- It complements the SSML docs by showing a model-native alternative to explicit markup control.

## Open Questions

- When is prompt-based style steering stable enough for production voice identity?
- How should teams test for drift when prompt instructions carry part of the voice spec?

## Related

- [[voice-ai]]
- [[text-to-speech]]
- [[style-control]]
- [[audio]]
- [[openai-cookbook]]

## Source Text

Steering Text-to-Speech for more dynamic audio generation
Our traditional TTS APIs don’t have the ability to steer the voice of the generated audio. For example, if you wanted to convert a paragraph of text to audio, you would not be able to give any specific instructions on audio generation.
With audio chat completions, you can give specific instructions before generating the audio. This allows you to tell the API to speak at different speeds, tones, and accents. With appropriate instructions, these voices can be more dynamic, natural, and context-appropriate.
Traditional TTS
Traditional TTS can specify voices, but not the tone, accent, or any other contextual audio parameters.
from openai import OpenAI
client = OpenAI()

tts_text = """
Once upon a time, Leo the lion cub woke up to the smell of pancakes and scrambled eggs.
His tummy rumbled with excitement as he raced to the kitchen. Mama Lion had made a breakfast feast!
Leo gobbled up his pancakes, sipped his orange juice, and munched on some juicy berries.
"""

speech_file_path = "./sounds/default_tts.mp3"
response = client.audio.speech.create(
    model="tts-1-hd",
    voice="alloy",
    input=tts_text,
)

response.write_to_file(speech_file_path)
Chat Completions TTS
With chat completions, you can give specific instructions before generating the audio. In the following example, we generate a British accent in a learning setting for children. This is particularly useful for educational applications where the voice of the assistant is important for the learning experience.
import base64

speech_file_path = "./sounds/chat_completions_tts.mp3"
completion = client.chat.completions.create(
    model="gpt-4o-audio-preview",
    modalities=["text", "audio"],
    audio={"voice": "alloy", "format": "mp3"},
    messages=[
        {
            "role": "system",
            "content": "You are a helpful assistant that can generate audio from text. Speak in a British accent and enunciate like you're talking to a child.",
        },
        {
            "role": "user",
            "content": tts_text,
        }
    ],
)

mp3_bytes = base64.b64decode(completion.choices[0].message.audio.data)
with open(speech_file_path, "wb") as f:
    f.write(mp3_bytes)

speech_file_path = "./sounds/chat_completions_tts_fast.mp3"
completion = client.chat.completions.create(
    model="gpt-4o-audio-preview",
    modalities=["text", "audio"],
    audio={"voice": "alloy", "format": "mp3"},
    messages=[
        {
            "role": "system",
            "content": "You are a helpful assistant that can generate audio from text. Speak in a British accent and speak really fast.",
        },
        {
            "role": "user",
            "content": tts_text,
        }
    ],
)

mp3_bytes = base64.b64decode(completion.choices[0].message.audio.data)
with open(speech_file_path, "wb") as f:
    f.write(mp3_bytes)
Chat Completions Multilingual TTS
We can also generate audio in different language accents. In the following example, we generate audio in a specific Spanish Uruguayan accent.
completion = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {
            "role": "system",
            "content": "You are an expert translator. Translate any text given into Spanish like you are from Uruguay.",
        },
        {
            "role": "user",
            "content": tts_text,
        }
    ],
)
translated_text = completion.choices[0].message.content
print(translated_text)

speech_file_path = "./sounds/chat_completions_tts_es_uy.mp3"
completion = client.chat.completions.create(
    model="gpt-4o-audio-preview",
    modalities=["text", "audio"],
    audio={"voice": "alloy", "format": "mp3"},
    messages=[
        {
            "role": "system",
            "content": "You are a helpful assistant that can generate audio from text. Speak any text that you receive in a Uruguayan spanish accent and more slowly.",
        },
        {
            "role": "user",
            "content": translated_text,
        }
    ],
)

mp3_bytes = base64.b64decode(completion.choices[0].message.audio.data)
with open(speech_file_path, "wb") as f:
    f.write(mp3_bytes)
Había una vez un leoncito llamado Leo que se despertó con el aroma de panqueques y huevos revueltos. Su pancita gruñía de emoción mientras corría hacia la cocina. ¡Mamá León había preparado un festín de desayuno! Leo devoró sus panqueques, sorbió su jugo de naranja y mordisqueó algunas bayas jugosas.

The ability to steer the voice of the generated audio opens up a lot of possibilities for richer audio experiences. There are many use cases such as:

Enhanced Expressiveness: Steerable TTS allows adjustments in tone, pitch, speed, and emotion, enabling the voice to convey different moods (e.g., excitement, calmness, urgency).
Language learning and education: Steerable TTS can mimic accents, inflections, and pronunciation, which is beneficial for language learners and educational applications where accurate intonation and emphasis are critical.
Contextual Voice: Steerable TTS adapts the voice to fit the content’s context, such as formal tones for professional documents or friendly, conversational styles for social interactions. This helps create more natural conversations in virtual assistants and chatbots.
