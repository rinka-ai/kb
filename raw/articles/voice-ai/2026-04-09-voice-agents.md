---
id: article-2026-04-09-voice-agents
type: source
title: "Voice agents"
path: raw/articles/voice-ai/2026-04-09-voice-agents.md
author: Unknown
publisher: platform.openai.com
url: https://platform.openai.com/docs/guides/voice-agents
date_published: 
date_added: 2026-04-09
tags: [voice-ai, speech-to-speech, realtime, agents, audio]
status: processed
quality: high
summary: "OpenAI explains the main architecture choice in voice AI: direct realtime speech-to-speech for natural low-latency conversation versus chained speech-to-text, text reasoning, and text-to-speech for more explicit control."
related: [voice-ai, speech-to-speech, realtime, agents, audio]
---

# Voice agents

## Source Metadata

- Path: raw/articles/voice-ai/2026-04-09-voice-agents.md
- Author: Unknown
- Published: Unknown
- Publisher: platform.openai.com
- URL: https://platform.openai.com/docs/guides/voice-agents

## TL;DR

OpenAI frames voice-agent design around a first architecture decision: use live speech-to-speech sessions when latency and natural turn-taking matter most, or use an explicit chained pipeline when you need predictable control over transcription, reasoning, and spoken output.

## Key Claims

- Voice agents are best understood as normal agent systems with audio as the input and output surface.
- The primary design choice is between direct speech-to-speech sessions and a chained speech-to-text -> text agent -> text-to-speech pipeline.
- Speech-to-speech is the better fit for natural, low-latency conversation and interruption handling.
- Chained pipelines are the better fit when you want explicit control, auditability, or an easier path from an existing text agent.
- OpenAI's current SDK surface differs by language: TypeScript emphasizes `RealtimeAgent` and `RealtimeSession`, while Python emphasizes `VoicePipeline` for extending text agents.

## Important Details

- OpenAI describes voice as an SDK-first surface rather than something handled in Agent Builder.
- In the browser-oriented realtime path, the server creates an ephemeral client secret, the frontend creates a realtime session, and the connection runs over WebRTC or WebSocket.
- The realtime session is responsible for audio turns, interruptions, tool calls, and handoffs.
- The chained pipeline pattern keeps transcription, text reasoning, and speech generation as separate explicit steps.

## Entities

- Company: OpenAI
- Products and SDK surfaces: OpenAI Agents SDK, RealtimeAgent, RealtimeSession, VoicePipeline
- Concepts: voice agents, speech-to-speech, chained voice pipeline, live audio sessions, interruptions, handoffs

## My Notes

- This is the anchor source for the top-level architecture choice in voice AI.
- It is especially useful when deciding whether "voice" should be a thin modality layer on an existing text agent or a native realtime interaction surface.

## Open Questions

- Where do we want explicit text intermediates for observability or debugging, and where is native audio latency more important?
- How should long-running voice sessions preserve state when the interaction stays in live audio for extended periods?

## Related

- [[voice-ai]]
- [[llm-agents]]

## Source Text

Voice agents turn the same agent concepts into spoken, low-latency interactions. The key design choice is deciding whether the model should work directly with live audio or whether your application should explicitly chain speech-to-text, text reasoning, and text-to-speech.

ArchitectureBest forWhySpeech-to-speech with live audio sessionsNatural, low-latency conversationsThe model handles live audio input and output directlyChained voice pipelinePredictable workflows or extending an existing text agentYour app keeps explicit control over transcription, text reasoning, and speech output
Agent Builder doesn’t currently support voice workflows, so voice stays an SDK-first surface.

The two supported languages expose different strengths today:

In TypeScript, the fastest path to a browser-based voice assistant is a RealtimeAgent and RealtimeSession.
In Python, the simplest path to extending an existing text agent into voice is a chained VoicePipeline.

1
2
3
4
5
6
7
8
9
10
11
12
13
14
import { RealtimeAgent, RealtimeSession } from "@openai/agents/realtime";

const agent = new RealtimeAgent({
  name: "Assistant",
  instructions: "You are a helpful voice assistant.",
});

const session = new RealtimeSession(agent, {
  model: "gpt-realtime-1.5",
});

await session.connect({
  apiKey: "ek_...(ephemeral key from your server)",
});

Use the live audio API path when the interaction should feel conversational and immediate. The usual browser flow is:

Your application server creates an ephemeral client secret for the live audio session.
Your frontend creates a RealtimeSession.
The session connects over WebRTC in the browser or WebSocket on the server.
The agent handles audio turns, tools, interruptions, and handoffs inside that session.

Start with the transport docs when you need lower-level control:

Live audio API overview
Live audio API with WebRTC
Live audio API with WebSocket

Use the chained path when you want stronger control over intermediate text, existing text-agent reuse, or a simpler extension path from a non-voice workflow. In that design, your application explicitly manages:

speech-to-text
the agent workflow itself
text-to-speech

This is often the better fit for support flows, approval-heavy flows, or cases where you want durable transcripts and deterministic logic between each stage.

The voice surface changes the transport and audio loop, but the core workflow decisions are the same:

Use Using tools when the voice agent needs external capabilities.
Use Running agents when spoken workflows need streaming, continuation, or durable state.
Use Orchestration and handoffs when spoken workflows branch across specialists.
Use Guardrails and human review when spoken workflows need safety checks or approvals.
Use Integrations and observability when you need MCP-backed capabilities or want to inspect how the voice workflow behaved.

The practical rule is: choose the audio architecture first, then design the rest of the agent workflow the same way you would for text.
