---
id: article-2026-04-09-introduction-conversational-voice-ai-agents
type: source
title: "Introduction - Conversational voice AI agents"
path: raw/articles/voice-ai/2026-04-09-introduction-conversational-voice-ai-agents.md
author: Unknown
publisher: elevenlabs.io
url: https://elevenlabs.io/docs/conversational-ai/docs/introduction
date_published: 
date_added: 2026-04-09
tags: [voice-ai, elevenlabs, voice-agents, conversational-ai]
status: ingested
quality: high
summary: "ElevenLabs positions its conversational AI stack as a full voice-agent platform combining ASR, turn-taking, TTS, LLM choice, deployment surfaces, and conversation monitoring."
related: [voice-ai, elevenlabs, voice-agents, conversational-ai]
---

# Introduction - Conversational voice AI agents

## Source Metadata

- Path: raw/articles/voice-ai/2026-04-09-introduction-conversational-voice-ai-agents.md
- Author: Unknown
- Published: Unknown
- Publisher: elevenlabs.io
- URL: https://elevenlabs.io/docs/conversational-ai/docs/introduction

## TL;DR

Learn how to build, launch, and scale agents with ElevenLabs.

## Key Claims

- Learn how to build, launch, and scale agents with ElevenLabs.
- Agents accomplish tasks through natural dialogue - from quick requests to complex, open-ended workflows.
- Platform capabilities
From design to deployment to optimization, ElevenLabs provides everything you need to build agents at scale.
- A fine-tuned Speech to Text (ASR) model for speech recognition
Your choice of language model or custom LLM
A low-latency Text to Speech (TTS) model across 5k+ voices and 70+ languages
A proprietary turn-taking model that handles conversation timing

## Important Details

- Source captured from elevenlabs.io.
- Section heading: Configure
- Section heading: Deploy
- Section heading: Monitor
- Section heading: Platform capabilities
- Section heading: Design and configure

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
- [[conversational-ai]]

## Source Text

Agents accomplish tasks through natural dialogue - from quick requests to complex, open-ended workflows. ElevenLabs provides voice-rich, expressive models, developer tools for building multimodal agents, and tools to monitor and evaluate agent performance at scale.

Platform capabilities
From design to deployment to optimization, ElevenLabs provides everything you need to build agents at scale.
Design and configure
GoalGuideDescriptionCreate conversation workflowsWorkflowsBuild multi-step workflows with visual workflow builderWrite system promptsSystem promptLearn best practices for crafting effective agent promptsSelect language modelModelsChoose from supported LLMs or bring your own custom modelControl conversation flowConversation flowConfigure turn-taking, interruptions, and timeout settingsConfigure voice & languageVoice & languageSelect from 5k+ voices across 31 languages with customization optionsAdd knowledge to agentKnowledge baseUpload documents and enable RAG for grounded responsesConnect toolsToolsEnable agents to call clients & APIs to perform actionsPersonalize each conversationPersonalizationUse dynamic variables and overrides for per-conversation customizationSecure agent accessAuthenticationImplement custom authentication for protected agent access
Connect and deploy
GoalGuideDescriptionBuild with React componentsElevenLabs UIPre-built components library for audio & agent apps (shadcn-based)Embed widget in websiteWidgetAdd a customizable web widget to any websiteBuild React web appsReact SDKVoice-enabled React hooks and componentsBuild iOS appsSwift SDKNative iOS SDK for voice agentsBuild Android appsKotlin SDKNative Android SDK for voice agentsBuild React Native appsReact Native SDKCross-platform iOS and Android with React NativeConnect via SIP trunkSIP trunkIntegrate with existing telephony infrastructureMake batch outbound callsBatch callsTrigger multiple calls programmaticallyUse Twilio integrationTwilioNative Twilio integration for phone callsBuild custom integrationsWebSocket APILow-level WebSocket protocol for custom implementationsReceive real-time eventsEventsSubscribe to conversation events and updates
Monitor and optimize
GoalGuideDescriptionList users by external IDUsersSee end users and open their conversationsSearch transcriptsSearching conversationsKeyword and semantic search in Conversation historyRun A/B testsExperimentsTest agent configuration changes with live trafficTest agent behaviorTestingCreate and run automated tests for your agentsAnalyze conversation qualityConversation analysisExtract insights and evaluate conversation outcomesTrack metrics & analyticsAnalyticsMonitor performance metrics and conversation historyConfigure data retentionPrivacySet retention policies for conversations and audioReduce LLM costsCost optimizationMonitor and optimize language model expenses
Architecture
ElevenAgents coordinates 4 core components:

A fine-tuned Speech to Text (ASR) model for speech recognition
Your choice of language model or custom LLM
A low-latency Text to Speech (TTS) model across 5k+ voices and 70+ languages
A proprietary turn-taking model that handles conversation timing
