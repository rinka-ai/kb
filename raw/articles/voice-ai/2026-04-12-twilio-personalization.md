---
id: article-2026-04-12-twilio-personalization
type: source
title: "Twilio personalization"
path: raw/articles/voice-ai/2026-04-12-twilio-personalization.md
author: ElevenLabs
publisher: ElevenLabs Docs
url: https://elevenlabs.io/docs/eleven-agents/phone-numbers/twilio-integration/customising-calls
date_published: 
date_added: 2026-04-12
tags: [voice-ai, elevenlabs, voice-agents, twilio, personalization]
status: processed
quality: medium
summary: Configure personalization for incoming Twilio calls using webhooks.
related: [voice-ai, elevenlabs, voice-agents, twilio, personalization]
---

# Twilio personalization

## Source Metadata

- Path: raw/articles/voice-ai/2026-04-12-twilio-personalization.md
- Author: ElevenLabs
- Published: Unknown
- Publisher: ElevenLabs Docs
- URL: https://elevenlabs.io/docs/eleven-agents/phone-numbers/twilio-integration/customising-calls

## TL;DR

Configure personalization for incoming Twilio calls using webhooks.

## Key Claims

- Configure personalization for incoming Twilio calls using webhooks.
- Configure personalization for incoming Twilio calls using webhooks.Overview
When receiving inbound Twilio calls, you can dynamically fetch conversation initiation data through a webhook.
- Use HTTPS endpoints only
Implement authentication using request headers
Store sensitive values as secrets through the ElevenLabs secrets manager
Validate the incoming request parameters

## Important Details

- Source captured from elevenlabs.io.
- Section heading: Overview
- Section heading: How it works
- Section heading: Configuration
- Section heading: Configure webhook details
- Section heading: Enable fetching conversation initiation data

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
- [[twilio]]
- [[personalization]]

## Source Text

Configure personalization for incoming Twilio calls using webhooks.Overview
When receiving inbound Twilio calls, you can dynamically fetch conversation initiation data through a webhook. This allows you to customize your agent’s behavior based on caller information and other contextual data.

When a Twilio call is received, ElevenAgents will make a webhook call to your specified endpoint, passing call information (caller_id, agent_id, called_number, call_sid) as arguments
Your webhook returns conversation initiation client data, including dynamic variables and overrides (an example is shown below)
This data is used to initiate the conversation

The system uses Twilio’s connection/dialing period to fetch webhook data in parallel, creating a
seamless experience where:
Users hear the expected telephone connection sound
In parallel, ElevenAgents fetches necessary webhook data
The conversation is initiated with the fetched data by the time the audio connection is established

Configuration
1Configure webhook detailsIn the settings page of ElevenAgents, configure the webhook URL and add any
secrets needed for authentication.Click on the webhook to modify which secrets are sent in the headers.2Enable fetching conversation initiation dataIn the “Security” tab of the agent’s page, enable fetching conversation initiation data for inbound Twilio calls, and define fields that can be overridden.3Implement the webhook endpoint to receive Twilio dataThe webhook will receive a POST request with the following parameters:ParameterTypeDescriptioncaller_idstringThe phone number of the calleragent_idstringThe ID of the agent receiving the callcalled_numberstringThe Twilio number that was calledcall_sidstringUnique identifier for the Twilio call4Return conversation initiation client dataYour webhook must return a JSON response containing the initiation data for the agent.The dynamic_variables field must contain all dynamic variables defined for the agent. Overrides
on the other hand are entirely optional. For more information about dynamic variables and
overrides see the dynamic variables and
overrides docs.An example response could be:1{2  "type": "conversation_initiation_client_data",3  "dynamic_variables": {4    "customer_name": "John Doe",5    "account_status": "premium",6    "last_interaction": "2024-01-15"7  },8  "conversation_config_override": {9    "agent": {10      "prompt": {11        "prompt": "The customer's bank account balance is $100. They are based in San Francisco."12      },13      "first_message": "Hi, how can I help you today?",14      "language": "en"15    },16    "tts": {17      "voice_id": "new-voice-id"18    }19  }20}
ElevenAgents will use the dynamic variables to populate the conversation initiation data, and the conversation will start smoothly.
Ensure your webhook responds within a reasonable timeout period to avoid delaying the call
handling.
Security

Use HTTPS endpoints only
Implement authentication using request headers
Store sensitive values as secrets through the ElevenLabs secrets manager
Validate the incoming request parameters
