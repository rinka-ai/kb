---
id: article-2026-04-12-post-call-webhooks
type: source
title: "Post-call webhooks"
path: raw/articles/voice-ai/2026-04-12-post-call-webhooks.md
author: ElevenLabs
publisher: ElevenLabs Docs
url: https://elevenlabs.io/docs/eleven-agents/workflows/post-call-webhooks
date_published:
date_added: 2026-04-12
tags: [voice-ai, elevenlabs, voice-agents, webhooks, telephony]
status: processed
quality: high
summary: ElevenLabs' post-call webhook docs define the handoff from live conversation to downstream systems, with authenticated delivery of transcripts, analysis, audio, and call-failure events for CRM and stateful workflows.
related: [voice-ai, elevenlabs, voice-agents, webhooks, telephony]
---

# Post-call webhooks

## Source Metadata

- Path: raw/articles/voice-ai/2026-04-12-post-call-webhooks.md
- Author: ElevenLabs
- Published: Unknown
- Publisher: ElevenLabs Docs
- URL: https://elevenlabs.io/docs/eleven-agents/workflows/post-call-webhooks

## TL;DR

Post-call webhooks are the bridge from live voice interaction into business systems, analytics, memory, and follow-up automation.

## Key Claims

- Voice systems need an explicit post-call event surface to connect live calls with business workflows and memory systems.
- Webhook consumers should treat payload formats as evolving contracts and parse them defensively.
- Security for voice webhooks should include both HMAC verification and IP-based controls when needed.
- Call-end events are not only for analytics; they are also useful for CRM updates, stateful memory, and telephony failure handling.

## Important Details

- The docs define three webhook types: `post_call_transcription`, `post_call_audio`, and `call_initiation_failure`.
- Transcription webhooks include transcript, metadata, analysis results, and conversation initiation data.
- Audio webhooks send base64 MP3 data and may be delivered with chunked transfer encoding.
- Call initiation failure payloads distinguish Twilio and SIP metadata, which matters for operational debugging.
- HMAC verification is the primary authentication mechanism, and the docs also publish static egress IPs for allowlisting.
- Webhooks are auto-disabled after persistent failures, and HIPAA-mode delivery does not support retries on failure.

## Entities

- Organization: ElevenLabs
- Event types: `post_call_transcription`, `post_call_audio`, `call_initiation_failure`
- Concepts: HMAC verification, chunked delivery, CRM sync, stateful conversations, telephony failure telemetry

## My Notes

- This is a strong architecture source because it defines the boundary between the realtime conversation loop and downstream application logic.
- The most reusable pattern is to treat the live call as one system and the post-call webhook pipeline as another, with durable state crossing between them.

## Open Questions

- Which webhook payloads do we actually need to persist, and which should be reduced or redacted before storage?
- How should we map post-call state into CRM, analytics, and long-term memory without duplicating sensitive data?

## Related

- [[voice-ai]]
- [[elevenlabs]]
- [[voice-agents]]
- [[webhooks]]
- [[telephony]]

## Source Text

Overview
Post-call Webhooks allow you to receive detailed information about a call after analysis is complete. When enabled, ElevenLabs will send a POST request to your specified endpoint with comprehensive call data.
ElevenLabs supports three types of post-call webhooks:

Transcription webhooks (post_call_transcription): Contains full conversation data including transcripts, analysis results, and metadata
Audio webhooks (post_call_audio): Contains minimal data with base64-encoded audio of the full conversation
Call initiation failure webhooks (call_initiation_failure): Contains information about failed call initiation attempts including failure reasons and metadata

Migration Notice: Enhanced Webhook Format
Important: Post-call transcription webhooks will be migrated to include additional fields for
enhanced compatibility and consistency, ensure your endpoint can handle the extra fields.
What’s Changing
Post-call transcription webhooks will be updated to match the same format as the GET Conversation response. The webhook data object will include three additional boolean fields:

has_audio: Boolean indicating whether the conversation has any audio available
has_user_audio: Boolean indicating whether user audio is available for the conversation
has_response_audio: Boolean indicating whether agent response audio is available for the conversation

Migration Requirements
To ensure your webhook handlers continue working after the migration:

Update your webhook parsing logic to handle these three new boolean fields
Test your webhook endpoints with the new field structure before August 15th, 2025
Ensure your JSON parsing can gracefully handle additional fields without breaking

Benefits After Migration
Once the migration is complete:

Unified data model: Webhook responses will match the GET Conversation API format exactly
SDK compatibility: Webhook handlers can be provided in the SDK and automatically stay up-to-date with the GET response model

Enabling post-call webhooks
Post-call webhooks can be enabled for all agents in your workspace through the ElevenAgents settings page.

Post call webhooks must return a 200 status code to be considered successful. Webhooks that
repeatedly fail are auto disabled if there are 10 or more consecutive failures and the last
successful delivery was more than 7 days ago or has never been successfully delivered.
For HIPAA compliance, if a webhook fails we can not retry the webhook.
Authentication
It is important for the listener to validate all incoming webhooks. Webhooks currently support authentication via HMAC signatures. Set up HMAC authentication by:

Securely storing the shared secret generated upon creation of the webhook
Verifying the ElevenLabs-Signature header in your endpoint using the SDK

The JavaScript SDK exposes constructEvent; the Python SDK exposes construct_event with rawBody, sig_header, and secret (these are not named payload / signature in Python). Both verify the signature, validate the timestamp, and parse the JSON payload.
PythonJavaScriptExample webhook handler using FastAPI:1from dotenv import load_dotenv2from fastapi import FastAPI, Request3from fastapi.responses import JSONResponse4from elevenlabs.client import ElevenLabs5import os67load_dotenv()89app = FastAPI()10elevenlabs = ElevenLabs(11    api_key=os.getenv("ELEVENLABS_API_KEY"),12)1314WEBHOOK_SECRET = os.getenv("WEBHOOK_SECRET")1516@app.post("/webhook")17async def receive_message(request: Request):18    payload = await request.body()19    signature = request.headers.get("elevenlabs-signature")2021    try:22        event = elevenlabs.webhooks.construct_event(23            rawBody=payload.decode("utf-8"),24            sig_header=signature,25            secret=WEBHOOK_SECRET,26        )27    except Exception as e:28        return JSONResponse(content={"error": "Invalid signature"}, status_code=401)2930    # construct_event returns a dict (parsed JSON), not an object with attributes31    if event.get("type") == "post_call_transcription":32        print(f"Received transcription: {event.get('data')}")3334    return {"status": "received"}
IP whitelisting
For additional security, you can whitelist the following static egress IPs from which ElevenLabs requests originate:
RegionIP AddressUS (Default)34.67.146.145US (Default)34.59.11.47EU35.204.38.71EU34.147.113.54Asia35.185.187.110Asia35.247.157.189
If you are using a data residency region then the following IPs will be used:
RegionIP AddressEU Residency34.77.234.246EU Residency34.140.184.144India Residency34.93.26.174India Residency34.93.252.69
If your infrastructure requires strict IP-based access controls, adding these IPs to your firewall allowlist will ensure you only receive requests from ElevenLabs’ systems.
These static IPs are used across all ElevenLabs services including webhooks and MCP server
requests, and will remain consistent.
Using IP whitelisting in combination with HMAC signature validation provides multiple layers of
security.
Webhook response structure
ElevenLabs sends three distinct types of post-call webhooks, each with different data structures:
Transcription webhooks (post_call_transcription)
Contains comprehensive conversation data including full transcripts, analysis results, and metadata.
Top-level fields
FieldTypeDescriptiontypestringType of event (always post_call_transcription)dataobjectConversation data using the ConversationHistoryCommonModel structureevent_timestampnumberWhen this event occurred in unix time UTC
Data object structure
The data object contains:
FieldTypeDescriptionagent_idstringThe ID of the agent that handled the callconversation_idstringUnique identifier for the conversationstatusstringStatus of the conversation (e.g., “done”)user_idstringUser identifier if availabletranscriptarrayComplete conversation transcript with turnsmetadataobjectCall timing, costs, and phone detailsanalysisobjectEvaluation results and conversation summaryconversation_initiation_client_dataobjectConfiguration overrides and dynamic variables
As of August 15th, 2025, transcription webhooks will include the has_audio, has_user_audio,
and has_response_audio fields to match the GET Conversation
response format exactly. Prior to this date, these fields
are not included in webhook payloads.
Audio webhooks (post_call_audio)
Contains minimal data with the full conversation audio as base64-encoded MP3.
Top-level fields
FieldTypeDescriptiontypestringType of event (always post_call_audio)dataobjectMinimal audio dataevent_timestampnumberWhen this event occurred in unix time UTC
Data object structure
The data object contains only:
FieldTypeDescriptionagent_idstringThe ID of the agent that handled the callconversation_idstringUnique identifier for the conversationfull_audiostringBase64-encoded string containing the complete conversation audio in MP3 format
Audio webhooks contain only the three fields listed above. They do NOT include transcript data,
metadata, analysis results, or any other conversation details.
Call initiation failure webhooks (call_initiation_failure)
Contains information about telephony call initiation attempts, including failure reasons and telephony-provider metadata.
Call initiation failure webhook events are sent when a call fails to initiate due to connection
errors, user declining the call, or user not picking up. If a call goes to voicemail or is picked
up by an automated service, no call initiation failure webhook is sent as the call was
successfully initiated.
Top-level fields
FieldTypeDescriptiontypestringType of event (always call_initiation_failure)dataobjectCall initiation failure dataevent_timestampnumberWhen this event occurred in unix time UTC
Data object structure
The data object contains:
FieldTypeDescriptionagent_idstringThe ID of the agent that was assigned to handle the callconversation_idstringUnique identifier for the conversationfailure_reasonstringThe failure reason (“busy”, “no-answer”, “unknown”)metadataobjectAdditional data provided by the telephony provider.
Metadata object structure
The metadata object structure varies depending on whether the outbound call was made via Twilio or via SIP trunking. The object includes a type field that distinguishes between the two, and a body field containing provider-specific details.
SIP metadata (type: "sip"):
FieldTypeRequiredDescriptiontypestringYesProvider type (always sip)bodyobjectYesSIP-specific call failure information
The body object for SIP metadata contains:
FieldTypeRequiredDescriptionfrom_numbernumberYesThe phone number of the party that initiated the call.to_numbernumberYesThe phone number of the called party.sip_status_codenumberYesSIP response status code (e.g., 486 for busy)error_reasonstringYesHuman-readable error descriptioncall_sidstringYesSIP call session identifiertwirp_codestringNoTwirp error code if applicablesip_statusstringNoSIP status text corresponding to the status code
Twilio metadata (type: "twilio"):
FieldTypeRequiredDescriptiontypestringYesProvider type (always twilio)bodyobjectYesTwilio StatusCallback body containing call details, documented here
Example webhook payloads
Transcription webhook example
1{2  "type": "post_call_transcription",3  "event_timestamp": 1739537297,4  "data": {5    "agent_id": "xyz",6    "conversation_id": "abc",7    "status": "done",8    "user_id": "user123",9    "transcript": [10      {11        "role": "agent",12        "message": "Hey there angelo. How are you?",13        "tool_calls": null,14        "tool_results": null,15        "feedback": null,16        "time_in_call_secs": 0,17        "conversation_turn_metrics": null18      },19      {20        "role": "user",21        "message": "Hey, can you tell me, like, a fun fact about 11 Labs?",22        "tool_calls": null,23        "tool_results": null,24        "feedback": null,25        "time_in_call_secs": 2,26        "conversation_turn_metrics": null27      },28      {29        "role": "agent",30        "message": "I do not have access to fun facts about Eleven Labs. However, I can share some general information about the company. Eleven Labs is an AI voice technology platform that specializes in voice cloning and text-to-speech...",31        "tool_calls": null,32        "tool_results": null,33        "feedback": null,34        "time_in_call_secs": 9,35        "conversation_turn_metrics": {36          "convai_llm_service_ttfb": {37            "elapsed_time": 0.370424701017327638          },39          "convai_llm_service_ttf_sentence": {40            "elapsed_time": 0.555118144955486141          }42        }43      }44    ],45    "metadata": {46      "start_time_unix_secs": 1739537297,47      "call_duration_secs": 22,48      "cost": 296,49      "deletion_settings": {50        "deletion_time_unix_secs": 1802609320,51        "deleted_logs_at_time_unix_secs": null,52        "deleted_audio_at_time_unix_secs": null,53        "deleted_transcript_at_time_unix_secs": null,54        "delete_transcript_and_pii": true,55        "delete_audio": true56      },57      "feedback": {58        "overall_score": null,59        "likes": 0,60        "dislikes": 061      },62      "authorization_method": "authorization_header",63      "charging": {64        "dev_discount": true65      },66      "termination_reason": ""67    },68    "analysis": {69      "evaluation_criteria_results": {},70      "data_collection_results": {},71      "call_successful": "success",72      "transcript_summary": "The conversation begins with the agent asking how Angelo is, but Angelo redirects the conversation by requesting a fun fact about 11 Labs. The agent acknowledges they don't have specific fun facts about Eleven Labs but offers to provide general information about the company. They briefly describe Eleven Labs as an AI voice technology platform specializing in voice cloning and text-to-speech technology. The conversation is brief and informational, with the agent adapting to the user's request despite not having the exact information asked for."73    },74    "conversation_initiation_client_data": {75      "conversation_config_override": {76        "agent": {77          "prompt": null,78          "first_message": null,79          "language": "en"80        },81        "tts": {82          "voice_id": null83        }84      },85      "custom_llm_extra_body": {},86      "dynamic_variables": {87        "user_name": "angelo"88      }89    }90  }91}
Audio webhook example
1{2  "type": "post_call_audio",3  "event_timestamp": 1739537319,4  "data": {5    "agent_id": "xyz",6    "conversation_id": "abc",7    "full_audio": "SUQzBAAAAAAA...base64_encoded_mp3_data...AAAAAAAAAA=="8  }9}
Call initiation failure webhook examples
Twilio metadata example
1{2  "type": "call_initiation_failure",3  "event_timestamp": 1759931652,4  "data": {5    "agent_id": "xyz",6    "conversation_id": "abc",7    "failure_reason": "busy",8    "metadata": {9      "type": "twilio",10      "body": {11        "Called": "+441111111111",12        "ToState": "",13        "CallerCountry": "US",14        "Direction": "outbound-api",15        "Timestamp": "Wed, 08 Oct 2025 13:54:12 +0000",16        "CallbackSource": "call-progress-events",17        "SipResponseCode": "487",18        "CallerState": "WA",19        "ToZip": "",20        "SequenceNumber": "2",21        "CallSid": "CA8367245817625617832576245724",22        "To": "+441111111111",23        "CallerZip": "98631",24        "ToCountry": "GB",25        "CalledZip": "",26        "ApiVersion": "2010-04-01",27        "CalledCity": "",28        "CallStatus": "busy",29        "Duration": "0",30        "From": "+11111111111",31        "CallDuration": "0",32        "AccountSid": "AC37682153267845716245762454a",33        "CalledCountry": "GB",34        "CallerCity": "RAYMOND",35        "ToCity": "",36        "FromCountry": "US",37        "Caller": "+11111111111",38        "FromCity": "RAYMOND",39        "CalledState": "",40        "FromZip": "12345",41        "FromState": "WA"42      }43    }44  }45}
SIP metadata example
1{2  "type": "call_initiation_failure",3  "event_timestamp": 1759931652,4  "data": {5    "agent_id": "xyz",6    "conversation_id": "abc",7    "failure_reason": "busy",8    "metadata": {9      "type": "sip",10      "body": {11        "from_number": "+441111111111",12        "to_number": "+11111111111",13        "sip_status_code": 486,14        "error_reason": "INVITE failed: sip status: 486: Busy here (SIP 486)",15        "call_sid": "d8e7f6a5-b4c3-4d5e-8f9a-0b1c2d3e4f5a",16        "sip_status": "Busy here",17        "twirp_code": "unavailable"18      }19    }20  }21}
Audio webhook delivery
Audio webhooks are delivered separately from transcription webhooks and contain only the essential fields needed to identify the conversation along with the base64-encoded audio data.
Audio webhooks can be enabled or disabled using the “Send audio data” toggle in your webhook
settings. This setting can be configured at both the workspace level (in ElevenAgents settings)
and at the agent level (in individual agent webhook overrides).
Streaming delivery
Audio webhooks are delivered as streaming HTTP requests with the transfer-encoding: chunked header to handle large audio files efficiently.
Processing audio webhooks
Since audio webhooks are delivered via chunked transfer encoding, you’ll need to handle streaming data properly:
1import base642import json3from aiohttp import web45async def handle_webhook(request):67    # Check if this is a chunked/streaming request8    if request.headers.get("transfer-encoding", "").lower() == "chunked":9        # Read streaming data in chunks10        chunked_body = bytearray()11        while True:12            chunk = await request.content.read(8192)  # 8KB chunks13            if not chunk:14                break15            chunked_body.extend(chunk)1617        # Parse the complete payload18        request_body = json.loads(chunked_body.decode("utf-8"))19    else:20        # Handle regular requests21        body_bytes = await request.read()22        request_body = json.loads(body_bytes.decode('utf-8'))2324    # Process different webhook types25    if request_body["type"] == "post_call_transcription":26        # Handle transcription webhook with full conversation data27        handle_transcription_webhook(request_body["data"])28    elif request_body["type"] == "post_call_audio":29        # Handle audio webhook with minimal data30        handle_audio_webhook(request_body["data"])31    elif request_body["type"] == "call_initiation_failure":32        # Handle call initiation failure webhook33        handle_call_initiation_failure_webhook(request_body["data"])3435    return web.json_response({"status": "ok"})3637def handle_audio_webhook(data):38    # Decode base64 audio data39    audio_bytes = base64.b64decode(data["full_audio"])4041    # Save or process the audio file42    conversation_id = data["conversation_id"]43    with open(f"conversation_{conversation_id}.mp3", "wb") as f:44        f.write(audio_bytes)4546def handle_call_initiation_failure_webhook(data):47    # Handle call initiation failure events48    agent_id = data["agent_id"]49    conversation_id = data["conversation_id"]50    failure_reason = data.get("failure_reason")51    metadata = data.get("metadata", {})5253    # Log the failure for monitoring54    print(f"Call failed for agent {agent_id}, conversation {conversation_id}")55    print(f"Failure reason: {failure_reason}")5657    # Access provider-specific metadata58    provider_type = metadata.get("type")59    body = metadata.get("body", {})60    if provider_type == "sip":61        print(f"SIP status code: {body.get('sip_status_code')}")62        print(f"Error reason: {body.get('error_reason')}")63    elif provider_type == "twilio":64        print(f"Twilio CallSid: {body.get('CallSid')}")65        print(f"Call status: {body.get('CallStatus')}")6667    # Update your system with the failure information68    # e.g., mark lead as "call_failed" in CRM
Audio webhooks can be large files, so ensure your webhook endpoint can handle streaming requests
and has sufficient memory/storage capacity. The audio is delivered in MP3 format.
Use cases
Automated call follow-ups
Post-call webhooks enable you to build automated workflows that trigger immediately after a call ends. Here are some practical applications:
CRM integration
Update your customer relationship management system with conversation data as soon as a call completes:
1// Example webhook handler2app.post('/webhook/elevenlabs', async (req, res) => {3  // HMAC validation code45  const { data } = req.body;67  // Extract key information8  const userId = data.metadata.user_id;9  const transcriptSummary = data.analysis.transcript_summary;10  const callSuccessful = data.analysis.call_successful;1112  // Update CRM record13  await updateCustomerRecord(userId, {14    lastInteraction: new Date(),15    conversationSummary: transcriptSummary,16    callOutcome: callSuccessful,17    fullTranscript: data.transcript,18  });1920  res.status(200).send('Webhook received');21});
Stateful conversations
Maintain conversation context across multiple interactions by storing and retrieving state:

When a call starts, pass in your user id as a dynamic variable.
When a call ends, set up your webhook endpoint to store conversation data in your database, based on the extracted user id from the dynamic_variables.
When the user calls again, you can retrieve this context and pass it to the new conversation into a {{previous_topics}} dynamic variable.
This creates a seamless experience where the agent “remembers” previous interactions

1// Store conversation state when call ends2app.post('/webhook/elevenlabs', async (req, res) => {3  // HMAC validation code45  const { data } = req.body;6  const userId = data.metadata.user_id;78  // Store conversation state9  await db.userStates.upsert({10    userId,11    lastConversationId: data.conversation_id,12    lastInteractionTimestamp: data.metadata.start_time_unix_secs,13    conversationHistory: data.transcript,14    previousTopics: extractTopics(data.analysis.transcript_summary),15  });1617  res.status(200).send('Webhook received');18});1920// When initiating a new call, retrieve and use the state21async function initiateCall(userId) {22  // Get user's conversation state23  const userState = await db.userStates.findOne({ userId });2425  // Start new conversation with context from previous calls26  return await elevenlabs.startConversation({27    agent_id: 'xyz',28    conversation_id: generateNewId(),29    dynamic_variables: {30      user_name: userState.name,31      previous_conversation_id: userState.lastConversationId,32      previous_topics: userState.previousTopics.join(', '),33    },34  });35}
