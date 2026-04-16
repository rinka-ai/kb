---
id: article-2026-04-12-personalization
type: source
title: "Personalization"
path: raw/articles/voice-ai/2026-04-12-personalization.md
author: ElevenLabs
publisher: ElevenLabs Docs
url: https://elevenlabs.io/docs/eleven-agents/customization/personalization
date_published: 
date_added: 2026-04-12
tags: [voice-ai, elevenlabs, voice-agents, personalization]
status: processed
quality: medium
summary: Learn how to personalize your agent's behavior using dynamic variables and overrides.
related: [voice-ai, elevenlabs, voice-agents, personalization]
---

# Personalization

## Source Metadata

- Path: raw/articles/voice-ai/2026-04-12-personalization.md
- Author: ElevenLabs
- Published: Unknown
- Publisher: ElevenLabs Docs
- URL: https://elevenlabs.io/docs/eleven-agents/customization/personalization

## TL;DR

Learn how to personalize your agent's behavior using dynamic variables and overrides.

## Key Claims

- Learn how to personalize your agent's behavior using dynamic variables and overrides.
- Learn how to personalize your agent's behavior using dynamic variables and overrides.Overview
Personalization allows you to adapt your agent’s behavior for each individual user, enabling more natural and contextually relevant conversations.
- Dynamic Variables - Inject runtime values into prompts and messages
Overrides - Completely replace system prompts or messages
Twilio Integration - Personalize inbound call experiences via webhooks

## Important Details

- Source captured from elevenlabs.io.
- Section heading: Overview
- Section heading: Personalization Methods
- Section heading: Conversation Initiation Client Data Structure
- Section heading: Choosing the Right Approach
- Section heading: Learn More

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
- [[personalization]]

## Source Text

Learn how to personalize your agent's behavior using dynamic variables and overrides.Overview
Personalization allows you to adapt your agent’s behavior for each individual user, enabling more natural and contextually relevant conversations. ElevenLabs offers multiple approaches to personalization:

Dynamic Variables - Inject runtime values into prompts and messages
Overrides - Completely replace system prompts or messages
Twilio Integration - Personalize inbound call experiences via webhooks

Conversation Initiation Client Data Structure
The conversation_initiation_client_data object defines what can be customized when starting a conversation:
1{2  "type": "conversation_initiation_client_data",3  "conversation_config_override": {4    "agent": {5      "prompt": {6        "prompt": "overriding system prompt"7      },8      "first_message": "overriding first message",9      "language": "en"10    },11    "tts": {12      "voice_id": "voice-id-here"13    }14  },15  "custom_llm_extra_body": {16    "temperature": 0.7,17    "max_tokens": 10018  },19  "dynamic_variables": {20    "string_var": "text value",21    "number_var": 1.2,22    "integer_var": 123,23    "boolean_var": true24  },25  "user_id": "your_custom_user_id"26}
System dynamic variables (those prefixed with system__) cannot be sent or overridden in the
client initiation payload. Only custom dynamic variables can be set via the dynamic_variables
field.
Choosing the Right Approach
MethodBest ForImplementationDynamic Variables
Inserting user-specific data into templated content - Maintaining consistent agent
behavior with personalized details - Personalizing tool parameters
Define variables with {{ variable_name }} and pass values at runtimeOverrides
Completely changing agent behavior per user - Switching languages or voices - Legacy
applications (consider migrating to Dynamic Variables)
Enable specific override permissions in security settings and pass complete replacement
content
Learn More
