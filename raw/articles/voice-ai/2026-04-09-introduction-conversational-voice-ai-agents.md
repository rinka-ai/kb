---
id: article-2026-04-09-introduction-conversational-voice-ai-agents
type: source
title: "Introduction - Conversational voice AI agents"
path: raw/articles/voice-ai/2026-04-09-introduction-conversational-voice-ai-agents.md
author: ElevenLabs
publisher: ElevenLabs Docs
url: https://elevenlabs.io/docs/conversational-ai/docs/introduction
date_published: 
date_added: 2026-04-09
tags: [voice-ai, elevenlabs, voice-agents, conversational-ai]
status: processed
quality: high
summary: "ElevenLabs positions ElevenAgents as a full voice-agent platform: model, turn-taking, tools, knowledge, deployment surfaces, and monitoring are treated as one integrated runtime rather than isolated APIs."
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

The overview page frames ElevenAgents as a full-stack voice-agent platform with distinct layers for agent configuration, deployment, monitoring, and optimization.

## Key Claims

- Voice agents should be designed as an end-to-end system, not only as model prompting plus TTS.
- ElevenAgents exposes a consistent stack for design, deployment, and monitoring rather than leaving each layer to custom glue code.
- The core runtime combines ASR, an LLM layer, TTS, and a turn-taking model.
- Product features such as knowledge bases, tools, personalization, authentication, and telephony are first-class parts of the agent architecture.

## Important Details

- The docs are organized around `configure`, `deploy`, and `monitor`, which is a useful architecture split for production voice systems.
- Configuration surfaces include prompts, conversation flow, voices, knowledge base, tools, personalization, and authentication.
- Deployment surfaces include web widgets, SDKs, WebSocket integrations, SIP trunking, Twilio, batch calling, and events.
- Monitoring surfaces include user views, transcript search, experiments, testing, conversation analysis, analytics, privacy controls, and cost optimization.
- The architecture section explicitly identifies four core runtime components: ASR, LLM, TTS, and a turn-taking model.

## Entities

- Organization: ElevenLabs
- System: ElevenAgents
- Concepts: turn-taking, voice-agent runtime, knowledge-base grounding, conversation analysis, telephony integrations
- Surfaces: tools, personalization, authentication, events, experiments

## My Notes

- This is the canonical high-level page for understanding how ElevenLabs thinks about voice agents as a product architecture.
- The most important takeaway is the platform split between build-time agent definition, deploy-time transport choices, and monitor-time evaluation and privacy controls.

## Open Questions

- Which parts of our own voice stack should be platform configuration versus application-owned orchestration?
- Where do we want to rely on ElevenLabs-native monitoring and where do we need our own evaluation/control plane?

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
