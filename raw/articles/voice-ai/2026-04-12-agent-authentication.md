---
id: article-2026-04-12-agent-authentication
type: source
title: "Agent authentication"
path: raw/articles/voice-ai/2026-04-12-agent-authentication.md
author: ElevenLabs
publisher: ElevenLabs Docs
url: https://elevenlabs.io/docs/eleven-agents/customization/authentication
date_published:
date_added: 2026-04-12
tags: [voice-ai, elevenlabs, voice-agents, authentication, security]
status: ingested
quality: medium
summary: Learn how to secure access to your conversational agents
related: [voice-ai, elevenlabs, voice-agents, authentication, security]
---

# Agent authentication

## Source Metadata

- Path: raw/articles/voice-ai/2026-04-12-agent-authentication.md
- Author: ElevenLabs
- Published: Unknown
- Publisher: ElevenLabs Docs
- URL: https://elevenlabs.io/docs/eleven-agents/customization/authentication

## TL;DR

Learn how to secure access to your conversational agents

## Key Claims

- Learn how to secure access to your conversational agents
- Overview
When building conversational agents, you may need to restrict access to certain agents or conversations.
- Using signed URLs
Signed URLs are the recommended approach for client-side applications.
- Your server requests a signed URL from ElevenLabs using your API key.

## Important Details

- Source captured from elevenlabs.io.
- Section heading: Overview
- Section heading: Authentication methods
- Section heading: Using signed URLs
- Section heading: How signed URLs work
- Section heading: Generate a signed URL via the API

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
- [[authentication]]
- [[security]]

## Source Text

Overview
When building conversational agents, you may need to restrict access to certain agents or conversations. ElevenLabs provides multiple authentication mechanisms to ensure only authorized users can interact with your agents.
Authentication methods
ElevenLabs offers two primary methods to secure your conversational agents:

Using signed URLs
Signed URLs are the recommended approach for client-side applications. This method allows you to authenticate users without exposing your API key.

Your server requests a signed URL from ElevenLabs using your API key.
ElevenLabs generates a temporary token and returns a signed WebSocket URL.
Your client application uses this signed URL to establish a WebSocket connection.
The signed URL expires after 15 minutes.

Never expose your ElevenLabs API key client-side.
Generate a signed URL via the API
To obtain a signed URL, make a request to the get_signed_url endpoint with your agent ID:
1# Server-side code using the Python SDK2from elevenlabs.client import ElevenLabs3async def get_signed_url():4    try:5        elevenlabs = ElevenLabs(api_key="your-api-key")6        response = await elevenlabs.conversational_ai.conversations.get_signed_url(agent_id="your-agent-id")7        return response.signed_url8    except Exception as error:9        print(f"Error getting signed URL: {error}")10        raise
The curl response has the following format:
1{2  "signed_url": "wss://api.elevenlabs.io/v1/convai/conversation?agent_id=your-agent-id&conversation_signature=your-token"3}
Connecting to your agent using a signed URL
Retrieve the server generated signed URL from the client and use the signed URL to connect to the websocket.
1# Client-side code using the Python SDK2from elevenlabs.conversational_ai.conversation import (3    Conversation,4    AudioInterface,5    ClientTools,6    ConversationInitiationData7)8import os9from elevenlabs.client import ElevenLabs10api_key = os.getenv("ELEVENLABS_API_KEY")1112elevenlabs = ElevenLabs(api_key=api_key)1314conversation = Conversation(15  client=elevenlabs,16  agent_id=os.getenv("AGENT_ID"),17  requires_auth=True,18  audio_interface=AudioInterface(),19  config=ConversationInitiationData()20)2122async def start_conversation():23  try:24    signed_url = await get_signed_url()25    conversation = Conversation(26      client=elevenlabs,27      url=signed_url,28    )2930    conversation.start_session()31  except Exception as error:32    print(f"Failed to start conversation: {error}")
Signed URL expiration
Signed URLs are valid for 15 minutes. The conversation session can last longer, but the conversation must be initiated within the 15 minute window.
Using allowlists
Allowlists provide a way to restrict access to your conversational agents based on the origin domain. This ensures that only requests from approved domains can connect to your agent.
How allowlists work

You configure a list of approved hostnames for your agent.
When a client attempts to connect, ElevenLabs checks if the request’s origin matches an allowed hostname.
If the origin is on the allowlist, the connection is permitted; otherwise, it’s rejected.

Configuring allowlists
Allowlists are configured as part of your agent’s authentication settings. You can specify up to 10 unique hostnames that are allowed to connect to your agent.
Example: setting up an allowlist
1from elevenlabs.client import ElevenLabs2import os3from elevenlabs.types import *45api_key = os.getenv("ELEVENLABS_API_KEY")6elevenlabs = ElevenLabs(api_key=api_key)78agent = elevenlabs.conversational_ai.agents.create(9  conversation_config=ConversationalConfig(10    agent=AgentConfig(11      first_message="Hi. I'm an authenticated agent.",12    )13  ),14  platform_settings=AgentPlatformSettingsRequestModel(15  auth=AuthSettings(16    enable_auth=False,17    allowlist=[18      AllowlistItem(hostname="example.com"),19      AllowlistItem(hostname="app.example.com"),20      AllowlistItem(hostname="localhost:3000")21      ]22    )23  )24)
Choosing an authentication method
Configure one authentication method per agent:

Use signed URLs (enable_auth) for authenticated client sessions.
Use allowlists (allowlist) for hostname-based access control.

Do not configure signed URLs and allowlists together on the same agent. Choose the method that
matches your deployment model.
Example: signed URLs only
Use enable_auth without an allowlist:
1from elevenlabs.client import ElevenLabs2import os3from elevenlabs.types import *45api_key = os.getenv("ELEVENLABS_API_KEY")6elevenlabs = ElevenLabs(api_key=api_key)78agent = elevenlabs.conversational_ai.agents.create(9  conversation_config=ConversationalConfig(10    agent=AgentConfig(11      first_message="Hi. I require a signed URL.",12    )13  ),14  platform_settings=AgentPlatformSettingsRequestModel(15    auth=AuthSettings(16      enable_auth=True17    )18  )19)
Example: allowlist only
Use allowlist without enabling signed URLs:
1from elevenlabs.client import ElevenLabs2import os3from elevenlabs.types import *45api_key = os.getenv("ELEVENLABS_API_KEY")6elevenlabs = ElevenLabs(api_key=api_key)78agent = elevenlabs.conversational_ai.agents.create(9  conversation_config=ConversationalConfig(10    agent=AgentConfig(11      first_message="Hi. I only accept approved hostnames.",12    )13  ),14  platform_settings=AgentPlatformSettingsRequestModel(15    auth=AuthSettings(16      allowlist=[17        AllowlistItem(hostname="example.com"),18        AllowlistItem(hostname="app.example.com"),19      ]20    )21  )22)
FAQ
Can I use the same signed URL for multiple users?This is possible but we recommend generating a new signed URL for each user session.What happens if the signed URL expires during a conversation?If the signed URL expires (after 15 minutes), any WebSocket connection created with that signed
url will not be closed, but trying to create a new connection with that signed URL will
fail.Can I restrict access to specific users?The signed URL mechanism only verifies that the request came from an authorized source. To
restrict access to specific users, implement user authentication in your application before
requesting the signed URL.Is there a limit to how many signed URLs I can generate?There is no specific limit on the number of signed URLs you can generate.How do allowlists handle subdomains?Allowlists perform exact matching on hostnames. If you want to allow both a domain and its
subdomains, you need to add each one separately (e.g., “example.com” and “app.example.com”).Do I need to use both authentication methods?No. Configure either signed URLs or an allowlist for each agent. For client-side
applications, signed URLs are the recommended default.What other security measures should I implement?Beyond signed URLs and allowlists, consider implementing:
User authentication before requesting signed URLs
Rate limiting on API requests
Usage monitoring for suspicious patterns
Proper error handling for auth failures
