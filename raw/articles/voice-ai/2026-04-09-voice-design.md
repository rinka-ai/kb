---
id: article-2026-04-09-voice-design
type: source
title: "Voice Design"
path: raw/articles/voice-ai/2026-04-09-voice-design.md
author: Unknown
publisher: elevenlabs.io
url: https://elevenlabs.io/docs/creative-platform/voices/voice-design
date_published: 
date_added: 2026-04-09
tags: [voice-ai, elevenlabs, voice-design, text-to-speech]
status: processed
quality: high
summary: "ElevenLabs' Voice Design guide treats voice creation as a prompting problem, showing how accent, persona, emotion, pacing, and audio-quality descriptors shape generated voices from text instructions."
related: [voice-ai, elevenlabs, voice-design, text-to-speech]
---

# Voice Design

## Source Metadata

- Path: raw/articles/voice-ai/2026-04-09-voice-design.md
- Author: Unknown
- Published: Unknown
- Publisher: elevenlabs.io
- URL: https://elevenlabs.io/docs/creative-platform/voices/voice-design

## TL;DR

A guide on how to craft voices from a text prompt.

## Key Claims

- A guide on how to craft voices from a text prompt.
- Overview
Voice Design helps creators fill the gaps when the exact voice they are looking for isn’t available in the Voice Library.
- Prompting guide
The prompt is the foundation of your voice.
- Example:
Native Spanish, español europeo (sin rasgos de español latinoamericano).

## Important Details

- Source captured from elevenlabs.io.
- Section heading: Overview
- Section heading: Prompting guide
- Section heading: Recommended prompt format
- Section heading: Common pitfalls to avoid
- Section heading: Audio Quality

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
- [[voice-design]]
- [[text-to-speech]]

## Source Text

Overview
Voice Design helps creators fill the gaps when the exact voice they are looking for isn’t available in the Voice Library. If you can’t find a suitable voice for your project, you can create one. Voice Design is best for quick exploration and iteration, and output quality can vary depending on your prompt and use case. If you need the most consistent, production-ready quality, Professional Voice Clones (PVC) are currently the highest quality voices on our platform - so if there is a PVC available in our library that fits your needs, we recommend using it instead.
You can find Voice Design by heading to Voices -> My Voices -> Add a new voice -> Voice Design in the ElevenLabs app or via the API.
When you hit generate, we’ll generate three voice options for you. The only charge for using voice design is the number of credits to generate your preview text, which you are only charged once even though we are generating three samples for you. You can see the number of characters that will be deducted in the “Text to preview” text box.
After generating, you’ll have the option to select and save one of the generations, which will take up one of your voice slots.

Prompting guide
The prompt is the foundation of your voice. It tells the model what kind of voice you’re trying to create — everything from the accent and character-type to the gender and vibe of the voice. A well-crafted prompt can be the difference between a generic voice and one that truly fits your vision. In general, more descriptive and granular prompts tend to yield more accurate and nuanced results. The more detail you provide — including age, gender, tone, accent, pacing, emotion, style, and more - the better the model can interpret and deliver a voice that feels intentional and tailored.
However, sometimes short and simple prompts can also work, especially when you’re aiming for a more neutral or broadly usable voice. For example, “A calm male narrator” might give you exactly what you need without going into detail — particularly if you’re not trying to create a very specific character or style. The right level of detail depends on your use case. Are you building a fantasy character? A virtual assistant? A tired New Yorker in her 60s with a dry sense of humor? The more clearly you define it in your prompt, the closer the output will be to what you’re imagining.
Recommended prompt format
For consistent results, structure your prompt using this format:

Example:
Native Spanish, español europeo (sin rasgos de español latinoamericano). Female, 35–40. Ok quality. Persona: operadora de soporte confiable. Emotion: reassuring, attentive, confident. Smooth, natural timbre with gentle intonation, forward proximity, and a noise-free signal. Delivers updates at a relaxed pace with clear emphasis on helpful information, projecting empathy and professionalism.
Common pitfalls to avoid

Don’t use “accent” when you mean intonation — this can trigger unwanted dialect shifts. Instead, describe intonation, emphasis, or delivery patterns.
Avoid FX words — terms like “reverb,” “echo,” “phone,” or “tape” can negatively affect output quality.
Be explicit about language and dialect — always specify the language and regional variant in the first sentence to prevent drift.

Audio Quality
Audio quality refers to the clarity, cleanliness, and overall fidelity of the generated voice. By default, ElevenLabs aims to produce clean and natural-sounding audio — but if your project requires a specific level of quality, it’s best to explicitly include it in your prompt.
For high-quality results, you can help the model by adding a phrase such as “perfect audio quality” or “studio-quality recording” to your voice description. This helps ensure the voice is rendered with maximum clarity, minimal distortion, and a polished finish.
You can also use specific quality descriptors that provide consistent results:

Ok quality
Good quality
Very good quality
Excellent quality
Studio quality
Broadcast quality

These descriptors help achieve the highest audio quality when included in your prompt.
Including these types of phrases can sometimes reduce the accuracy of the prompt in general if the
voice is very specific or niche.
There may also be creative cases where lower audio quality is intentional, such as when simulating a phone call, old radio broadcast, or found footage. In those situations, either leave out quality descriptors entirely or explicitly include phrases like:

“Low-fidelity audio”
“Poor audio quality”
“Sounds like a voicemail”
“Muffled and distant, like on an old tape recorder”

The placement of this phrase in your prompt is flexible — it can appear at the beginning or end, though we’ve found it works well at either.
Age, Tone/Timbre and Gender
These three characteristics are the foundation of voice design, shaping the overall identity and emotional resonance of the voice. The more detail you provide, the easier it is for the AI to produce a voice that fits your creative vision — whether you’re building a believable character, crafting a compelling narrator, or designing a virtual assistant.
Age
Describing the perceived age of the voice helps define its maturity, vocal texture, and energy. Use specific terms to guide the AI toward the right vocal quality.
Useful descriptors:

“Adolscent male” / “adolescent female”
“Young adult” / “in their 20s” / “early 30s”
“Middle-aged man” / “woman in her 40s”
“Elderly man” / “older woman” / “man in his 80s”

Tone/Timbre
Refers to the physical quality of the voice, shaped by pitch, resonance, and vocal texture. It’s distinct from emotional delivery or attitude.
Common tone/timbre descriptors:

“Deep” / “low-pitched”
“Smooth” / “rich”
“Gravelly” / “raspy”
“Nasally” / “shrill”
“Airy” / “breathy”
“Booming” / “resonant”
“Light” / “thin”
“Warm” / “mellow”
“Tinny” / “metallic”

Gender
Gender often typically influences pitch, vocal weight, and tonal presence — but you can push beyond simple categories by describing the sound instead of the identity.
Examples:

“A lower-pitched, husky female voice”
“A masculine male voice, deep and resonant”
“A neutral gender — soft and mid-pitched”

Accent
Accent plays a critical role in defining a voice’s regional, cultural, and emotional identity. If your project depends on an authentic sound — whether it’s grounded in realism or stylized for character — being clear and deliberate about the desired accent is essential.
Phrase choice matters - certain terms tend to produce more consistent results. For example, “thick” often yields better results than “strong” when describing how prominent an accent should be. There is lots of trial and error to be had, and we encourage you to experiment with the wording and to be as creative and descriptive as possible.
Be careful when using the word “accent” — if you mean intonation or emphasis patterns rather than
a regional dialect, use those terms instead. Using “accent” when you mean intonation can trigger
unwanted dialect shifts.

“A middle-aged man with a thick French accent”
“A young woman with a slight Southern drawl”
“An old man with a heavy Eastern European accent”
“A cheerful woman speaking with a crisp British accent”
“A younger male with a soft Irish lilt”
“An authoritative voice with a neutral American accent”
“A man with a regional Australian accent, laid-back and nasal”

Avoid overly vague descriptors like “foreign” or “exotic” — they’re imprecise and can produce inconsistent results.
Combine accent with other traits like tone, age, or pacing for better control. E.g., “A sarcastic old woman with a thick New York accent, speaking slowly.”
For fantasy or fictional voices, you can suggest real-world accents as inspiration:

“An elf with a proper thick British accent. He is regal and lyrical.”
“A goblin with a raspy Eastern European accent.”

Pacing
Pacing refers to the speed and rhythm at which a voice speaks. It’s a key component in shaping the personality, emotional tone, and clarity of the voice. Being explicit about pacing is essential, especially when designing voices for specific use cases like storytelling, advertising, character dialogue, or instructional content.
Use clear language to describe how fast or slow the voice should speak. You can also describe how the pacing feels — whether it’s steady, erratic, deliberate, or breezy. If the pacing shifts, be sure to indicate where and why.
Examples of pacing descriptors:

“Speaking quickly” / “at a fast pace”
“At a normal pace” / “speaking normally”
“Speaking slowly” / “with a slow rhythm”
“Deliberate and measured pacing”
“Drawn out, as if savoring each word”
“With a hurried cadence, like they’re in a rush”
“Relaxed and conversational pacing”
“Rhythmic and musical in pace”
“Erratic pacing, with abrupt pauses and bursts”
“Even pacing, with consistent timing between words”
“Staccato delivery”

Text to preview
Once you’ve written a strong voice prompt, the text you use to preview that voice plays a crucial role in shaping how it actually sounds. The preview text acts like a performance script — it sets the tone, pacing, and emotional delivery that the voice will attempt to match.
To get the best results, your preview text should complement the voice description, not contradict it. For example, if your prompt describes a “calm and reflective younger female voice with a slight Japanese accent,” using a sentence like “Hey! I can’t stand what you’ve done with the darn place!!!” will clash with that intent. The model will try to reconcile that mismatch, often leading to unnatural or inconsistent results.
Instead, use sample text that reflects the voice’s intended personality and emotional tone. For the example above, something like “It’s been quiet lately… I’ve had time to think, and maybe that’s what I needed most.” supports the prompt and helps generate a more natural, coherent voice.
Additionally, we’ve found that longer preview texts tend to produce more stable and expressive results. Short phrases can sometimes sound abrupt or inconsistent, especially when testing subtle qualities like tone or pacing. Giving the model more context — a full sentence or even a short paragraph — allows it to deliver a smoother and more accurate representation of the voice.
Parameters
Loudness
Controls the volume of the Text to Preview generation, and ultimately the voice once saved.
Guidance Scale
Dictates how closely the Prompt is adhered to. Higher values will stick to the prompt more strictly, but could result in poorer audio quality if the prompt is very niche, while lower values will allow the model to be more creative at the cost of prompt accuracy. Use a lower value if the performance and audio quality is generally more important than perfectly nailing the prompt. High values are recommended when accent or tone accuracy is of paramount importance.
Attributes and Examples
Experiment with the way in which these descriptors are written. For example, “Perfect audio
quality” can also be written as “the audio quality is perfect”. These can sometimes produce
different results!
AttributeExamplesAgeYoung, younger, adult, old, elderly, in his/her 40sAccent”thick” Scottish accent, “slight” Asian-American accent, Southern American accentGenderMale, female, gender-neutral, ambiguous genderTone/Timbre/pitchDeep, warm, gravelly, smooth, shrill, buttery, raspy, nasally, throaty, harsh, robotic, etherealPacingNormal cadence, fast-paced, quickly, slowly, drawn out, calm pace, natural/conversational paceAudio QualityPerfect audio quality, audio quality is ‘ok’, poor audio qualityCharacter / ProfessionPirate, businessman, farmer, politician, therapist, ogre, godlike being, TV announcerEmotionEnergetic, excited, sad, emotional, sarcastic, dryPitchLow-pitched, high-pitched, normal pitch
Example Prompts and Text Previews
Voice TypePrompt/DescriptionText PreviewGuidance ScaleFemale Sports CommentatorA high-energy female sports commentator with a thick British accent, passionately delivering play-by-play coverage of a football match in a very quick pace. Her voice is lively, enthusiastic, and fully immersed in the action.OH MY WORD — WHAT A GOAL! She picks it up just past midfield, dances through TWO defenders like they’re not even THERE, and absolutely SMASHES it into the top corner! The goalkeeper had NO CHANCE! That is WORLD-CLASS from the young forward, and the crowd is on their FEET! This match has come ALIVE, and you can FEEL the momentum SHIFTING!25%Drill SergeantAn army drill sergeant shouting at his team of soldiers. He sounds angry and is speaking at a fast pace.LISTEN UP, you sorry lot! I didn’t come here to babysit — I came to BUILD SOLDIERS! You move when I say move, and you breathe when I say breathe! You’ve got ten seconds to fall in line or you’ll regret it!!25%Evil OgreA massive evil ogre speaking at a quick pace. He has a silly and resonant tone.”Your weapons are but toothpicks to me. [laughs] Surrender now and I may grant you a swift end. I’ve toppled kingdoms and devoured armies. What hope do you have against me?“30%Relatable British EntrepreneurExcellent audio quality. A man in his 30s to early 40s with a thick British accent speaking at a natural pace like he’s talking to a friend.[laughs] See, that’s the thing. YOU see a company, while I see… [lip smacks] I see a promise, ya know what I mean? [exhales] We don’t build just to profit, we build to, to UPLIFT! If our technology doesn’t leave the world kinder, smarter, and more connected than we found it… [sighs] then what are we even doing here?40%Southern WomanAn older woman with a thick Southern accent. She is sweet and sarcastic.”Well sugar, if all we ever do is chase titles and trophies, we’re gonna miss the whole darn point. [light chuckle] I’d rather build somethin’ that makes folks’ lives easier—and if I can do it in heels with a smile and a touch of sass, even better.”35%Movie Trailer VoiceDramatic voice, used to build anticipation in movie trailers, typically associated with action or thrillers”In a world on the brink of chaos, one hero will rise. Prepare yourself for a story of epic proportions, coming soon to the big screen.”20%Squeaky MouseA cute little squeaky mouse”I may be small, but my attitude is anything but! [giggles] Watch it, big feet, or I’ll give your toes a nibble you won’t forget!“20%Angry PirateAn angry old pirate, loud and boisterous”I’ve faced storms that would turn your hair white and sea monsters that would make your knees quake. You think you can cross Captain Blackheart and live to tell the tale?“30%New YorkerDeep, gravelly thick New York accent, tough and world-weary, often cynical”I’ve been walking these streets longer than you can imagine, kid. There’s nothing you can say or do that’ll surprise me anymore.”40%Spanish Support AgentNative Spanish, español europeo (sin rasgos de español latinoamericano). Female, 35–40. Ok quality. Persona: operadora de soporte confiable. Emotion: reassuring, attentive, confident.Smooth, natural timbre with gentle intonation, forward proximity, and a noise-free signal. Delivers updates at a relaxed pace with clear emphasis on helpful information, projecting empathy and professionalism.30%Arabic Customer ServiceNative Arabic, soft Gulf (UAE) accent influence. Female, 30–40. Excellent quality. Persona: professional customer service agent. Emotion: warm, confident, polite.Velvety timbre with a calm tone, measured pacing, and gentle intonation, maintaining close-mic proximity for a high-fidelity, artifact-free signal. Clear presence and gentle emphasis on customer-friendly phrases to ensure easy understanding.35%Polish Creative NarratorNative Polish. Male, 48–58. Excellent quality. Persona: creative dreamer. Emotion: curious, gentle, inviting.Voice is smooth and artifact-free, with a warm, engaging texture and steady pacing, delivered with natural proximity. Bright intonation and precise emphasis guide the listener through the narrative.32%Mad ScientistA voice of an eccentric scientific genius with rapid, erratic speech patterns that accelerate with excitement. His German-tinged accent becomes more pronounced when agitated. The pitch varies widely from contemplative murmurs to manic exclamations, with frequent eruptions of maniacal laughter.”I am doctor Heinrich, revolutionary genius rejected by the narrow-minded scientific establishment! Bah! They called my theories impossible, my methods unethical—but who is laughing now? (maniacal laughter) For twenty years I have perfected my creation in this mountain laboratory, harnessing energies beyond mortal comprehension! The fools at the academy will regret their mockery when my quantum destabilizer reveals the multiverse. Or perhaps new life forms… the experiment has certain unpredictable variables… FASCINATING ones!“38%
