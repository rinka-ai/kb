---
id: article-2026-04-12-simulate-conversations
type: source
title: "Simulate Conversations"
path: raw/articles/voice-ai/2026-04-12-simulate-conversations.md
author: ElevenLabs
publisher: ElevenLabs Docs
url: https://elevenlabs.io/docs/eleven-agents/guides/simulate-conversation
date_published:
date_added: 2026-04-12
tags: [voice-ai, elevenlabs, voice-agents, simulation]
status: ingested
quality: medium
summary: Learn how to test and evaluate your ElevenLabs agent with simulated conversations
related: [voice-ai, elevenlabs, voice-agents, simulation]
---

# Simulate Conversations

## Source Metadata

- Path: raw/articles/voice-ai/2026-04-12-simulate-conversations.md
- Author: ElevenLabs
- Published: Unknown
- Publisher: ElevenLabs Docs
- URL: https://elevenlabs.io/docs/eleven-agents/guides/simulate-conversation

## TL;DR

Learn how to test and evaluate your ElevenLabs agent with simulated conversations

## Key Claims

- Learn how to test and evaluate your ElevenLabs agent with simulated conversations
- Overview
The ElevenLabs Agents API allows you to simulate and evaluate text-based conversations with your AI agent.
- An agent configured in ElevenLabs Agents (create one here)
Your ElevenLabs API key, which you can create in the dashboard
- Implementing a Simulation Testing Workflow
1Identify initial evaluation parametersSearch through your agent’s conversation history and find instances where your agent has underperformed.

## Important Details

- Source captured from elevenlabs.io.
- Section heading: Overview
- Section heading: Prerequisites
- Section heading: Implementing a Simulation Testing Workflow
- Section heading: Identify initial evaluation parameters
- Section heading: Simulate the conversation via the SDK

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
- [[simulation]]

## Source Text

Overview
The ElevenLabs Agents API allows you to simulate and evaluate text-based conversations with your AI agent. This guide will teach you how to implement an end-to-end simulation testing workflow using the simulate conversation endpoints (batch and streaming), enabling you to granularly test and improve your agent’s performance to ensure it meets your interaction goals.
Prerequisites

An agent configured in ElevenLabs Agents (create one here)
Your ElevenLabs API key, which you can create in the dashboard

Implementing a Simulation Testing Workflow
1Identify initial evaluation parametersSearch through your agent’s conversation history and find instances where your agent has underperformed. Use those conversations to create various prompts for a simulated user who will interact with your agent. Additionally, define any extra evaluation criteria not already specified in your agent configuration to test outcomes you may want for a specific simulated user.2Simulate the conversation via the SDKCreate a request to the simulation endpoint using the ElevenLabs SDK.1from dotenv import load_dotenv2from elevenlabs import (3    ElevenLabs,4    ConversationSimulationSpecification,5    AgentConfig,6    PromptAgent,7    PromptEvaluationCriteria8)910load_dotenv()11api_key = os.getenv("ELEVENLABS_API_KEY")12elevenlabs = ElevenLabs(api_key=api_key)1314response = elevenlabs.conversational_ai.agents.simulate_conversation(15    agent_id="YOUR_AGENT_ID",16    simulation_specification=ConversationSimulationSpecification(17        simulated_user_config=AgentConfig(18            prompt=PromptAgent(19                prompt="Your goal is to be a really difficult user.",20                llm="gpt-4o",21                temperature=0.522            )23        )24    ),25    extra_evaluation_criteria=[26        PromptEvaluationCriteria(27            id="politeness_check",28            name="Politeness Check",29            conversation_goal_prompt="The agent was polite.",30            use_knowledge_base=False31        )32    ]33)3435print(response)3Analyze the responseThe SDK provides a comprehensive JSON object that includes the entire conversation transcript and detailed analysis.Simulated Conversation: Captures each interaction turn between the simulated user and the agent, detailing messages and tool usage.1[2  ...3  {4    "role": "user",5    "message": "Maybe a little. I'll think about it, but I'm still not convinced it's the right move.",6    "tool_calls": [],7    "tool_results": [],8    "feedback": null,9    "llm_override": null,10    "time_in_call_secs": 0,11    "conversation_turn_metrics": null,12    "rag_retrieval_info": null,13    "llm_usage": null14  },15  {16    "role": "agent",17    "message": "I understand. If you want to explore more at your own pace, I can direct you to our documentation, which has guides and API references. Would you like me to send you a link?",18    "tool_calls": [],19    "tool_results": [],20    "feedback": null,21    "llm_override": null,22    "time_in_call_secs": 0,23    "conversation_turn_metrics": null,24    "rag_retrieval_info": null,25    "llm_usage": null26  },27  {28    "role": "user",29    "message": "I guess it wouldn't hurt to take a look. Go ahead and send it over.",30    "tool_calls": [],31    "tool_results": [],32    "feedback": null,33    "llm_override": null,34    "time_in_call_secs": 0,35    "conversation_turn_metrics": null,36    "rag_retrieval_info": null,37    "llm_usage": null38  },39  {40    "role": "agent",41    "message": null,42    "tool_calls": [43      {44        "type": "client",45        "request_id": "redirectToDocs_421d21e4b4354ed9ac827d7600a2d59c",46        "tool_name": "redirectToDocs",47        "params_as_json": "{\"path\": \"/docs/api-reference/introduction\"}",48        "tool_has_been_called": false,49        "tool_details": null50      }51    ],52    "tool_results": [],53    "feedback": null,54    "llm_override": null,55    "time_in_call_secs": 0,56    "conversation_turn_metrics": null,57    "rag_retrieval_info": null,58    "llm_usage": null59  },60  {61    "role": "agent",62    "message": null,63    "tool_calls": [],64    "tool_results": [65      {66        "type": "client",67        "request_id": "redirectToDocs_421d21e4b4354ed9ac827d7600a2d59c",68        "tool_name": "redirectToDocs",69        "result_value": "Tool Called.",70        "is_error": false,71        "tool_has_been_called": true,72        "tool_latency_secs": 073      }74    ],75    "feedback": null,76    "llm_override": null,77    "time_in_call_secs": 0,78    "conversation_turn_metrics": null,79    "rag_retrieval_info": null,80    "llm_usage": null81  },82  {83    "role": "agent",84    "message": "Okay, I've sent you a link to the introduction to our API reference.  It provides a good starting point for understanding our different tools and how they can be integrated. Let me know if you have any questions as you explore it.\n",85    "tool_calls": [],86    "tool_results": [],87    "feedback": null,88    "llm_override": null,89    "time_in_call_secs": 0,90    "conversation_turn_metrics": null,91    "rag_retrieval_info": null,92    "llm_usage": null93  }94  ...95]Analysis: Offers insights into evaluation criteria outcomes, data collection metrics, and a summary of the conversation transcript.1{2  "analysis": {3    "evaluation_criteria_results": {4      "politeness_check": {5        "criteria_id": "politeness_check",6        "result": "success",7        "rationale": "The agent remained polite and helpful despite the user's challenging attitude."8      },9      "understood_root_cause": {10        "criteria_id": "understood_root_cause",11        "result": "success",12        "rationale": "The agent acknowledged the user's hesitation and provided relevant information."13      },14      "positive_interaction": {15        "criteria_id": "positive_interaction",16        "result": "success",17        "rationale": "The user eventually asked for the documentation link, indicating engagement."18      }19    },20    "data_collection_results": {21      "issue_type": {22        "data_collection_id": "issue_type",23        "value": "support_issue",24        "rationale": "The user asked for help with integrating ElevenLabs tools."25      },26      "user_intent": {27        "data_collection_id": "user_intent",28        "value": "The user is interested in integrating ElevenLabs tools into a project."29      }30    },31    "call_successful": "success",32    "transcript_summary": "The user expressed skepticism, but the agent provided useful information and a link to the API documentation."33  }34}4Improve your evaluation criteriaReview the simulated conversations thoroughly to assess the effectiveness of your evaluation
criteria. Identify any gaps or areas where the criteria may fall short in evaluating the agent’s
performance. Refine and adjust the evaluation criteria accordingly to ensure they align with your
desired outcomes and accurately measure the agent’s capabilities.5Improve your agentOnce you are confident in the accuracy of your evaluation criteria, use the learnings from
simulated conversations to enhance your agent’s capabilities. Consider refining the system prompt
to better guide the agent’s responses, ensuring they align with your objectives and user
expectations. Additionally, explore other features or configurations that could be optimized, such
as adjusting the agent’s tone, improving its ability to handle specific queries, or integrating
additional data sources to enrich its responses. By systematically applying these learnings, you
can create a more robust and effective conversational agent that delivers a superior user
experience.6Continuous iterationAfter completing an initial testing and improvement cycle, establishing a comprehensive testing
suite can be a great way to cover a broad range of possible scenarios. This suite can explore
multiple simulated conversations using varied simulated user prompts and starting conditions. By
continuously iterating and refining your approach, you can ensure your agent remains effective and
responsive to evolving user needs.
Pro Tips
Detailed Prompts and Criteria
Crafting detailed and verbose simulated user prompts and evaluation criteria can enhance the effectiveness of the simulation tests. The more context and specificity you provide, the better the agent can understand and respond to complex interactions.
Mock Tool Configurations
Utilize mock tool configurations to test the decision-making process of your agent. This allows you to observe how the agent decides to make tool calls and react to different tool call results. For more details, check out the tool_mock_config input parameter from the API reference.
Partial Conversation History
Use partial conversation histories to evaluate how agents handle interactions from a specific point. This is particularly useful for assessing the agent’s ability to manage conversations where the user has already set up a question in a specific way, or if there have been certain tool calls that have succeeded or failed. For more details, check out the partial_conversation_history input parameter from the API reference.
