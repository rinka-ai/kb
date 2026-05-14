---
id: article-2026-04-12-conversation-flow
type: source
title: "Conversation flow"
path: raw/articles/voice-ai/2026-04-12-conversation-flow.md
author: ElevenLabs
publisher: ElevenLabs Docs
url: https://elevenlabs.io/docs/eleven-agents/customization/conversation-flow
date_published: 
date_added: 2026-04-12
tags: [voice-ai, elevenlabs, voice-agents, turn-taking, realtime]
status: processed
quality: high
summary: ElevenLabs treats timeouts, filler speech, interruptions, and turn eagerness as core runtime controls for voice agents, with concrete settings that trade off latency, naturalness, and information safety.
related: [voice-ai, elevenlabs, voice-agents, turn-taking, realtime]
---

# Conversation flow

## Source Metadata

- Path: raw/articles/voice-ai/2026-04-12-conversation-flow.md
- Author: ElevenLabs
- Published: Unknown
- Publisher: ElevenLabs Docs
- URL: https://elevenlabs.io/docs/eleven-agents/customization/conversation-flow

## TL;DR

Conversation flow is a runtime control plane for voice agents: it determines when the agent speaks, waits, fills silence, yields, or refuses interruption.

## Key Claims

- Voice-agent behavior depends heavily on runtime turn-taking settings, not only on prompt quality.
- Silence handling, interruption policy, and response eagerness should vary by use case rather than being fixed globally.
- Soft timeouts can preserve naturalness when model latency is variable by inserting brief filler speech.
- Some flows should permit interruption for natural dialogue, while others should disable interruption so critical information is delivered completely.

## Important Details

- Turn timeout waits 1 to 30 seconds before prompting after silence and should be tuned to the cognitive load of the task.
- Soft timeout can trigger a filler phrase after 0.5 to 8.0 seconds while the LLM is still generating a response.
- Filler speech can be static or LLM-generated, but the docs recommend avoiding promises about exact waiting time.
- Interruptions are a configurable client event and should usually be enabled for natural dialogue but disabled for legal or safety-critical delivery.
- Turn eagerness has `eager`, `normal`, and `patient` modes and can be adjusted dynamically through workflows.

## Entities

- Organization: ElevenLabs
- Concepts: turn timeout, soft timeout, interruptions, turn eagerness, filler speech
- Modes: eager, normal, patient

## My Notes

- This is one of the clearest sources for why prompt tuning alone does not fix voice UX.
- It is especially relevant to phone and support agents where latency, silence, and interruption policy shape trust as much as the content of the answer.

## Open Questions

- Which of our use cases should run with patient turn-taking because accuracy matters more than speed?
- Where do we need non-interruptible delivery for compliance, legal, or payment-related speech?

## Related

- [[voice-ai]]

## Source Text

Overview
Conversation flow settings determine how your assistant handles periods of user silence, interruptions during speech, and turn-taking behavior. These settings help create more natural conversations and can be customized based on your use case.

Turn timeout
Turn timeout determines how long your assistant waits during periods of user silence before prompting for a response.
Configuration
Turn timeout settings can be configured in the agent’s Advanced tab under Turn Timeout.
The timeout duration is specified in seconds and determines how long the assistant will wait in silence before prompting the user. Turn timeouts must be between 1 and 30 seconds.

Choose an appropriate timeout duration based on your use case. Shorter timeouts create more
responsive conversations but may interrupt users who need more time to respond, leading to a less
natural conversation.
Best practices

Set shorter timeouts (5-10 seconds) for casual conversations where quick back-and-forth is expected
Use longer timeouts (10-30 seconds) when users may need more time to think or formulate complex responses
Consider your user context - customer service may benefit from shorter timeouts while technical support may need longer ones

Soft timeout
Soft timeout provides immediate audio feedback when the LLM takes longer than expected to generate a response. Instead of awkward silence while waiting, your agent speaks a brief filler phrase like “Hmm…” or “Let me think…” to maintain natural conversational flow.
This feature is useful for:

Complex queries requiring longer LLM processing
Handling variable latency from LLM providers
Creating more human-like conversations with natural thinking pauses

When the user finishes speaking, the system starts generating an LLM response
A timer begins based on the configured timeout duration
If the LLM response arrives before the timeout, no filler is spoken
If the timeout is reached before the LLM responds:

The configured filler message is spoken immediately
The agent continues waiting for the actual response
Once ready, the agent speaks the full LLM response

Soft timeout triggers only once per turn to prevent multiple fillers in succession.
Configuration
Soft timeout settings are available in the agent’s Advanced tab under Soft timeout.

Timeout duration
The time in seconds before the filler message is spoken while waiting for the LLM response.
SettingDescriptionDefault-1 (disabled)Range0.5 to 8.0 secondsRecommended3.0 seconds
Start with 3.0 seconds—long enough to avoid unnecessary fillers on fast responses, short enough to
prevent awkward silences.
Static message
A predefined filler phrase spoken when soft timeout triggers.
SettingDescriptionDefault"Hhmmmm...yeah."Length1–200 characters
This message supports:

Language overrides: Auto-translates to additional languages configured for your agent
Client overrides: Can be customized per-call via the SDK

LLM-generated message
When enabled, generates a contextually-appropriate filler phrase dynamically using a lightweight LLM, instead of the static message.
SettingDescriptionDefaultfalseFallbackUses static message if generation fails
The system uses recent conversation context (up to 4 messages, 1000 characters) to generate relevant fillers like “Hmm…”, “I see…”, “Understood…”, “Got it…”, or “Alright…”
A static fallback message is still required when using LLM-generated messages.
Best practices

Avoid time indicators in filler messages (e.g., “One second…”) as actual response times are unpredictable
Disable soft timeout for quick FAQ bots where responses are consistently fast

Interruptions
Interruption handling determines whether users can interrupt your assistant while it’s speaking.
Configuration
Interruption settings can be configured in the agent’s Advanced tab under Client Events.
To enable interruptions, make sure interruption is a selected client event.
Interruptions enabled

Disable interruptions when the complete delivery of information is crucial, such as legal
disclaimers or safety instructions.
Best practices for interruptions

Enable interruptions for natural conversational flows where back-and-forth dialogue is expected
Disable interruptions when message completion is critical (e.g., terms and conditions, safety information)
Consider your use case context - customer service may benefit from interruptions while information delivery may not

Turn eagerness
Turn eagerness controls how quickly your assistant responds to user input during conversation. This setting determines how eager the assistant is to take turns and start speaking based on detected speech patterns.
How it works
The assistant now includes two key improvements for more natural turn-taking:

Faster response generation - The assistant starts speaking after receiving enough words and a comma from the language model, rather than waiting for complete sentences. This reduces latency and creates more responsive conversations, especially when the assistant has longer responses.

Configurable turn eagerness - Control how quickly the assistant interprets pauses or speech patterns as opportunities to respond.

Configuration
Turn eagerness can be configured in the dashboard Agent settings or via the API. Three modes are available:

Eager - The assistant responds quickly to user input, jumping in at the earliest opportunity. Best for fast-paced conversations where immediate responses are valued.
Normal - Balanced turn-taking that works well for most conversational scenarios. The assistant waits for natural conversation breaks before responding.
Patient - The assistant waits longer before taking its turn, giving users more time to complete their thoughts. Ideal for collecting detailed information or when users need time to formulate responses.

Turn eagerness is especially powerful when combined with workflows. You can dynamically adjust the
assistant’s responsiveness based on context—making it jump in faster during casual conversation,
or wait longer when collecting sensitive information like phone numbers or email addresses.
Best practices for turn eagerness

Use Eager mode for customer service scenarios where quick responses improve user experience
Use Patient mode when collecting structured information like phone numbers, addresses, or email addresses
Use Normal mode as a default for general conversational flows
Combine with workflows to dynamically adjust turn eagerness based on conversation context
Test different settings with your specific use case to find the optimal balance

Recommended configurations
Customer service
Shorter timeouts (5-10 seconds) for responsive interactions - Enable interruptions to allow
customers to interject with questions - Eager turn eagerness for quick, responsive
conversations
Information collection
Moderate timeouts (10-15 seconds) to allow users time to gather information - Enable
interruptions for natural conversation flow - Patient turn eagerness when collecting phone
numbers, addresses, or email addresses
Legal disclaimers
Longer timeouts (15-30 seconds) to allow for complex responses - Disable interruptions to
ensure full delivery of legal information - Normal turn eagerness to maintain steady pacing
Conversational EdTech
Longer timeouts (10-30 seconds) to allow time to think and formulate responses - Enable
interruptions to allow students to interject with questions - Patient turn eagerness to give
students adequate time to respond
