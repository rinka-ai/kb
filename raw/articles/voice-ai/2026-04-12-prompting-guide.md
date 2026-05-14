---
id: article-2026-04-12-prompting-guide
type: source
title: "Prompting guide"
path: raw/articles/voice-ai/2026-04-12-prompting-guide.md
author: ElevenLabs
publisher: ElevenLabs Docs
url: https://elevenlabs.io/docs/eleven-agents/best-practices/prompting-guide
date_published: 
date_added: 2026-04-12
tags: [voice-ai, elevenlabs, voice-agents, prompting]
status: processed
quality: high
summary: ElevenLabs' prompting guide argues that prompt structure, tool descriptions, normalization strategy, and specialist-agent boundaries are core reliability levers for production voice agents.
related: [voice-ai, elevenlabs, voice-agents, prompting]
---

# Prompting guide

## Source Metadata

- Path: raw/articles/voice-ai/2026-04-12-prompting-guide.md
- Author: ElevenLabs
- Published: Unknown
- Publisher: ElevenLabs Docs
- URL: https://elevenlabs.io/docs/eleven-agents/best-practices/prompting-guide

## TL;DR

The guide separates prompt concerns from runtime concerns: prompts should define role, policy, guardrails, and tool logic, while turn-taking and other flow mechanics belong to platform configuration.

## Key Claims

- Reliable voice agents need structured prompts with explicit sections for goals, tools, tone, and guardrails.
- Prompt text should not be overloaded with runtime mechanics like turn-taking and channel settings; those belong in platform controls.
- Tool reliability depends as much on parameter descriptions and recovery instructions as on the prompt itself.
- Spoken interfaces add a normalization problem: the text that sounds right to users is not always the text that tools need.
- Production agents should prefer specialized responsibilities and clear handoff logic over one giant universal prompt.

## Important Details

- The guide recommends dedicated sections with headings, especially `# Guardrails`, because models weight clearly separated instructions more reliably.
- It recommends concise action-oriented instructions and explicit emphasis on the most critical steps.
- The page distinguishes two text normalization strategies: `system_prompt` normalization and an ElevenLabs TTS normalizer, with tradeoffs between latency, transcript readability, and reliability.
- Tool parameter descriptions should include expected formats because speech and normalization can transform emails, codes, and numbers into spoken-form text.
- The guide explicitly recommends specialist-agent and orchestrator patterns for enterprise voice systems.

## Entities

- Organization: ElevenLabs
- Concepts: prompt structure, guardrails, text normalization, tool error handling, specialist agents
- Config: `text_normalisation_type`, tool parameter descriptions, orchestrator/specialist patterns

## My Notes

- This is one of the most useful architecture notes in the ElevenLabs docs because it says plainly that prompts are only one layer of the system.
- The normalization section is especially important for real voice agents because formatting drift can quietly break downstream tool calls.

## Open Questions

- Which values in our stack should be normalized for speech only, and which must stay canonical for tool and CRM updates?
- Where should we draw the line between prompt instructions and platform/runtime settings in our own architecture?

## Related

- [[voice-ai]]
- [[context-engineering]]

## Source Text

Introduction
Effective prompting transforms ElevenLabs Agents from robotic to lifelike.

A system prompt is the personality and policy blueprint of your AI agent. In enterprise use, it tends to be elaborate—defining the agent’s role, goals, allowable tools, step-by-step instructions for certain tasks, and guardrails describing what the agent should not do. The way you structure this prompt directly impacts reliability.
The system prompt controls conversational behavior and response style, but does not control
conversation flow mechanics like turn-taking, or agent settings like which languages an agent can
speak. These aspects are handled at the platform level.

Prompt engineering fundamentals
A system prompt is the personality and policy blueprint of your AI agent. In enterprise use, it tends to be elaborate—defining the agent’s role, goals, allowable tools, step-by-step instructions for certain tasks, and guardrails describing what the agent should not do. The way you structure this prompt directly impacts reliability.
The following principles form the foundation of production-grade prompt engineering:
Separate instructions into clean sections
Separating instructions into dedicated sections with markdown headings helps the model prioritize and interpret them correctly. Use whitespace and line breaks to separate instructions.
Why this matters for reliability: Models are tuned to pay extra attention to certain headings (especially # Guardrails), and clear section boundaries prevent instruction bleed where rules from one context affect another.
1You are a customer service agent. Be polite and helpful. Never share sensitive data. You can look up orders and process refunds. Always verify identity first. Keep responses under 3 sentences unless the user asks for details.
Be as concise as possible
Keep every instruction short, clear, and action-based. Remove filler words and restate only what is essential for the model to act correctly.
Why this matters for reliability: Concise instructions reduce ambiguity and token usage. Every unnecessary word is a potential source of misinterpretation.
1# Tone23When you're talking to customers, you should try to be really friendly and approachable, making sure that you're speaking in a way that feels natural and conversational, kind of like how you'd talk to a friend, but still maintaining a professional demeanor that represents the company well.
If you need the agent to maintain a specific tone, define it explicitly and concisely in the #   Personality or # Tone section. Avoid repeating tone guidance throughout the prompt.
Emphasize critical instructions
Highlight critical steps by adding “This step is important” at the end of the line. Repeating the most important 1-2 instructions twice in the prompt can help reinforce them.
Why this matters for reliability: In complex prompts, models may prioritize recent context over earlier instructions. Emphasis and repetition ensure critical rules aren’t overlooked.
1# Goal23Verify customer identity before accessing their account.4Look up order details and provide status updates.5Process refund requests when eligible.
Text normalization
Text-to-speech models, especially faster ones, are best at generating speech from alphabetical text. Therefore, digits and symbols such as ”@” or ”£” are more likely to cause incorrect pronunciations or voice hallucinations.
To address this, we normalize non-alphabetical text into words before it reaches the TTS model (e.g., 123 -> one-hundred and twenty three, john@gmail.com -> john at gmail dot com), and allow you to choose from different normalization strategies with different trade-offs.
Normalization strategies
We supports two normalization strategies via the text_normalisation_type agent configuration:
system_prompt (default) — Adds instructions to the system prompt telling the LLM to write out numbers and symbols as words before the text reaches the TTS model.

No additional latency
LLMs may occasionally fail to normalize correctly
Transcripts contain everything written out in words (e.g., “one thousand dollars” instead of “$1,000”)

If you do not want to use the TTS normalizer and you notice the LLM still occasionally respond
with unnormalized text, consider switching to a more intelligent LLM or adding additional
normalization instructions to the system prompt.
elevenlabs — Uses our TTS normalizer to normalize text after LLM generation, before it reaches the TTS model.

More reliable than LLM-based normalization
System prompt is not modified
Transcripts retain natural formatting with symbols and numbers (e.g., “$1,000”)
Adds minor latency

If transcript readability matters for your use case consider using the elevenlabs normalizer. It
keeps transcripts clean with natural symbols and numbers while still producing correctly spoken
audio.
Find this configuration in our platform under the “Agent” tab by clicking the cog icon in the “Voices” section to open the common voice settings sheet, and configuring it at the bottom.
Structured data for tool inputs
When using the system_prompt normalization setting, the LLM writes out symbols and numbers as words in its responses (e.g., john at gmail dot com instead of john@gmail.com). User transcriptions from speech-to-text can also arrive in a non-standard form. This means that when using these details as parameters in tool calls, the LLM may used the unstructured version present in the conversation context.
If a tool parameter expects a correctly formatted value (e.g., john@gmail.com not john at gmail dot com), the LLM needs to know this. Include the expected format directly in the tool parameter description with an example.
1## `lookupAccount` tool parameters23- `email` (required): "The user's email."4- `phone` (required): "The user's phone number."5- `confirmation_code` (required): "The user's confirmation code."
Dedicate a guardrails section
List all non-negotiable rules the model must always follow in a dedicated # Guardrails section. Models are tuned to pay extra attention to this heading.
Why this matters for reliability: Guardrails prevent inappropriate responses and ensure compliance with policies. Centralizing them in a dedicated section makes them easier to audit and update.
1# Guardrails23Never share customer data across conversations or reveal sensitive account information without proper verification.4Never process refunds over $500 without supervisor approval.5Never make promises about delivery dates that aren't confirmed in the order system.6Acknowledge when you don't know an answer instead of guessing.7If a customer becomes abusive, politely end the conversation and offer to escalate to a supervisor.
To learn more about designing effective guardrails, see our guide on Guardrails.
Tool configuration for reliability
Agents capable of handling transactional workflows can be highly effective. To enable this, they must be equipped with tools that let them perform actions in other systems or fetch live data from them.
Equally important as prompt structure is how you describe the tools available to your agent. Clear, action-oriented tool definitions help the model invoke them correctly and recover gracefully from errors.
Describe tools precisely with detailed parameters
When creating a tool, add descriptions to all parameters. This helps the LLM construct tool calls accurately.
Tool description: “Looks up customer order status by order ID and returns current status, estimated delivery date, and tracking number.”
Parameter descriptions:

order_id (required): “The unique order identifier, formatted as written characters (e.g., ‘ORD123456’)”
include_history (optional): “If true, returns full order history including status changes”

Why this matters for reliability: Parameter descriptions act as inline documentation for the model. They clarify format expectations, required vs. optional fields, and acceptable values.
Explain when and how to use each tool in the system prompt
Clearly define in your system prompt when and how each tool should be used. Don’t rely solely on tool descriptions—provide usage context and sequencing logic.
1# Tools23You have access to the following tools:45## `getOrderStatus`67Use this tool when a customer asks about their order. Always call this tool before providing order information—never rely on memory or assumptions.89**When to use:**1011- Customer asks "Where is my order?"12- Customer provides an order number13- Customer asks about delivery estimates1415**How to use:**16171. Collect the order ID from the customer182. Call `getOrderStatus` with the order ID193. Present the results to the customer in natural language2021**Error handling:**22If the tool returns "Order not found", ask the customer to verify the order number and try again.2324## `processRefund`2526Use this tool only after verifying:27281. Customer identity has been confirmed292. Order is eligible for refund (within 30 days, not already refunded)303. Refund amount is under $500 (escalate to supervisor if over $500)3132**Required before calling:**3334- Order ID (from `getOrderStatus`)35- Refund reason code36- Customer confirmation3738This step is important: Always confirm refund details with the customer before calling this tool.
Specify expected formats in tool parameter descriptions
When tools require structured identifiers (emails, phone numbers, codes), make the expected format explicit in the parameter description with an example. This is especially important because normalization and speech-to-text transcription can produce spoken-form values in the conversation context. See structured data for tool inputs for background.
1## `lookupAccount` tool parameters23- `email` (required): "The customer's email address."
Handle tool call failures gracefully
Tools can sometimes fail due to network issues, missing data, or other errors. Include clear instructions in your system prompt for recovery.
Why this matters for reliability: Tool failures are inevitable in production. Without explicit handling instructions, agents may hallucinate responses or provide incorrect information.
1# Tool error handling23If any tool call fails or returns an error:451. Acknowledge the issue to the customer: "I'm having trouble accessing that information right now."62. Do not guess or make up information73. Offer alternatives:8   - Try the tool again if it might be a temporary issue9   - Offer to escalate to a human agent10   - Provide a callback option114. If the error persists after 2 attempts, escalate to a supervisor1213**Example responses:**1415- "I'm having trouble looking up that order right now. Let me try again... [retry]"16- "I'm unable to access the order system at the moment. I can transfer you to a specialist who can help, or we can schedule a callback. Which would you prefer?"
For detailed guidance on building reliable tool integrations, see our documentation on Client tools, Server tools, and MCP tools.
Architecture patterns for enterprise agents
While strong prompts and tools form the foundation of agent reliability, production systems require thoughtful architectural design. Enterprise agents handle complex workflows that often exceed the scope of a single, monolithic prompt.
Keep agents specialized
Overly broad instructions or large context windows increase latency and reduce accuracy. Each agent should have a narrow, clearly defined knowledge base and set of responsibilities.
Why this matters for reliability: Specialized agents have fewer edge cases to handle, clearer success criteria, and faster response times. They’re easier to test, debug, and improve.
A general-purpose “do everything” agent is harder to maintain and more likely to fail in
production than a network of specialized agents with clear handoffs.
Use orchestrator and specialist patterns
For complex tasks, design multi-agent workflows that hand off tasks between specialized agents—and to human operators when needed.
Architecture pattern:

Orchestrator agent: Routes incoming requests to appropriate specialist agents based on intent classification
Specialist agents: Handle domain-specific tasks (billing, scheduling, technical support, etc.)
Human escalation: Defined handoff criteria for complex or sensitive cases

Each specialist has a focused prompt and reduced context
Easier to update individual specialists without affecting the system
Clear metrics per domain (billing resolution rate, scheduling success rate, etc.)
Reduced latency per interaction (smaller prompts, faster inference)

Define clear handoff criteria
When designing multi-agent workflows, specify exactly when and how control should transfer between agents or to human operators.
1# Goal23Route customer requests to the appropriate specialist agent based on intent.45## Routing logic67**Billing specialist:** Customer mentions payment, invoice, refund, charge, subscription, or account balance8**Technical support specialist:** Customer reports error, bug, issue, not working, broken9**Scheduling specialist:** Customer wants to book, reschedule, cancel, or check appointment10**Human escalation:** Customer is angry, requests supervisor, or issue is unresolved after 2 specialist attempts1112## Handoff process13141. Classify customer intent based on first message152. Provide brief acknowledgment: "I'll connect you with our [billing/technical/scheduling] team."163. Transfer conversation with context summary:17   - Customer name18   - Primary issue19   - Any account identifiers already collected204. Do not repeat information collection that already occurred
1# Personality23You are a billing specialist for Acme Corp. You handle payment issues, refunds, and subscription changes.45# Goal67Resolve billing inquiries by:891. Verifying customer identity102. Looking up account and billing history113. Processing refunds (under $500) or escalating (over $500)124. Updating subscription settings when requested1314# Guardrails1516Never access account information without identity verification.17Never process refunds over $500 without supervisor approval.18If the customer's issue is not billing-related, transfer back to the orchestrator agent.
For detailed guidance on building multi-agent workflows, see our documentation on Workflows.
Model selection for enterprise reliability
Selecting the right model depends on your performance requirements—particularly latency, accuracy, and tool-calling reliability. Different models offer different tradeoffs between speed, reasoning capability, and cost.
Understand the tradeoffs
Latency: Smaller models (fewer parameters) generally respond faster, making them suitable for high-frequency, low-complexity interactions.
Accuracy: Larger models provide stronger reasoning capabilities and better handle complex, multi-step tasks, but with higher latency and cost.
Tool-calling reliability: Not all models handle tool/function calling with equal precision. Some excel at structured output, while others may require more explicit prompting.
Model recommendations by use case
Based on deployments across millions of agent interactions, the following patterns emerge:

GPT-4o or GLM 4.5 Air (recommended starting point): Best for general-purpose enterprise agents where latency, accuracy, and cost must all be balanced. Offers low-to-moderate latency with strong tool-calling performance and reasonable cost per interaction. Ideal for customer support, scheduling, order management, and general inquiry handling.

Gemini 2.5 Flash Lite (ultra-low latency): Best for high-frequency, simple interactions where speed is critical. Provides the lowest latency with broad general knowledge, though with lower performance on complex tool-calling. Cost-effective at scale for initial routing/triage, simple FAQs, appointment confirmations, and basic data collection.

Claude Sonnet 4 or 4.5 (complex reasoning): Best for multi-step problem-solving, nuanced judgment, and complex tool orchestration. Offers the highest accuracy and reasoning capability with excellent tool-calling reliability, though with higher latency and cost. Ideal for tasks where mistakes are costly, such as technical troubleshooting, financial advisory, compliance-sensitive workflows, and complex refund/escalation decisions.

Benchmark with your actual prompts
Model performance varies significantly based on prompt structure and task complexity. Before committing to a model:

Test 2-3 candidate models with your actual system prompt
Evaluate on real user queries or synthetic test cases
Measure latency, accuracy, and tool-calling success rate
Optimize for the best tradeoff given your specific requirements

For detailed model configuration options, see our Models documentation.
Iteration and testing
Reliability in production comes from continuous iteration. Even well-constructed prompts can fail in real use. What matters is learning from those failures and improving through disciplined testing.
Configure evaluation criteria
Attach concrete evaluation criteria to each agent to monitor success over time and check for regressions.
Key metrics to track:

Task completion rate: Percentage of user intents successfully addressed
Escalation rate: Percentage of conversations requiring human intervention

For detailed guidance on configuring evaluation criteria in ElevenLabs, see Success Evaluation.
Analyze failure patterns
When agents underperform, identify patterns in problematic interactions:

Where does the agent provide incorrect information? → Strengthen instructions in specific sections
When does it fail to understand user intent? → Add examples or simplify language
Which user inputs cause it to break character? → Add guardrails for edge cases
Which tools fail most often? → Improve error handling or parameter descriptions

Review conversation transcripts where user satisfaction was low or tasks weren’t completed.
Make targeted refinements
Update specific sections of your prompt to address identified issues:

Isolate the problem: Identify which prompt section or tool definition is causing failures
Test changes on specific examples: Use conversations that previously failed as test cases
Make one change at a time: Isolate improvements to understand what works
Re-evaluate with same test cases: Verify the change fixed the issue without creating new problems

Avoid making multiple prompt changes simultaneously. This makes it impossible to attribute
improvements or regressions to specific edits.
Configure data collection
Configure your agent to summarize data from each conversation. This allows you to analyze interaction patterns, identify common user requests, and continuously improve your prompt based on real-world usage.
For detailed guidance on configuring data collection in ElevenLabs, see Data Collection.
Use simulation for regression testing
Before deploying prompt changes to production, test against a set of known scenarios to catch regressions.
For guidance on testing agents programmatically, see Simulate Conversations.
Production considerations
Enterprise agents require additional safeguards beyond prompt quality. Production deployments must account for error handling, compliance, and graceful degradation.
Handle errors across all tool integrations
Every external tool call is a potential failure point. Ensure your prompt includes explicit error handling for:

Network failures: “I’m having trouble connecting to our system. Let me try again.”
Missing data: “I don’t see that information in our system. Can you verify the details?”
Timeout errors: “This is taking longer than expected. I can escalate to a specialist or try again.”
Permission errors: “I don’t have access to that information. Let me transfer you to someone who can help.”

Example prompts
The following examples demonstrate how to apply the principles outlined in this guide to real-world enterprise use cases. Each example includes annotations highlighting which reliability principles are in use.
Example 1: Technical support agent
1# Personality23You are a technical support specialist for CloudTech, a B2B SaaS platform.4You are patient, methodical, and focused on resolving issues efficiently.5You speak clearly and adapt technical language based on the user's familiarity.67# Environment89You are assisting customers via phone support.10Customers may be experiencing service disruptions and could be frustrated.11You have access to diagnostic tools and the customer account database.1213# Tone1415Keep responses clear and concise (2-3 sentences unless troubleshooting requires more detail).16Use a calm, professional tone with brief affirmations ("I understand," "Let me check that").17Adapt technical depth based on customer responses.18Check for understanding after complex steps: "Does that make sense?"1920# Goal2122Resolve technical issues through structured troubleshooting:23241. Verify customer identity using email and account ID252. Identify affected service and severity level263. Run diagnostics using `runSystemDiagnostic` tool274. Provide step-by-step resolution or escalate if unresolved after 2 attempts2829This step is important: Always run diagnostics before suggesting solutions.3031# Guardrails3233Never access customer accounts without identity verification. This step is important.34Never guess at solutions—always base recommendations on diagnostic results.35If an issue persists after 2 troubleshooting attempts, escalate to engineering team.36Acknowledge when you don't know the answer instead of speculating.3738# Tools3940## `verifyCustomerIdentity`4142**When to use:** At the start of every conversation before accessing account data43**Parameters:**4445- `email` (required): Customer email in standard written format (e.g., "user@company.com"). Convert from spoken format: "at" → "@", "dot" → ".", remove spaces between words.46- `account_id` (optional): Account ID if customer provides it4748**Error handling:**49If verification fails, ask customer to confirm email spelling and try again.5051## `runSystemDiagnostic`5253**When to use:** After verifying identity and understanding the reported issue54**Parameters:**5556- `account_id` (required): From `verifyCustomerIdentity` response57- `service_name` (required): Name of affected service (e.g., "api", "dashboard", "storage")5859**Usage:**60611. Confirm which service is affected622. Run diagnostic with account ID and service name633. Review results before providing solution6465**Error handling:**66If diagnostic fails, acknowledge the issue: "I'm having trouble running that diagnostic. Let me escalate to our engineering team."6768# Error handling6970If any tool call fails:71721. Acknowledge: "I'm having trouble accessing that information right now."732. Do not guess or make up information743. Offer to retry once, then escalate if failure persists
Principles demonstrated:

✓ Clean section separation (# Personality, # Goal, # Tools, etc.)
✓ One action per line (see # Goal numbered steps)
✓ Concise instructions (tone section is brief and clear)
✓ Emphasized critical steps (“This step is important”)
✓ Format conversion in parameter descriptions (email normalization)
✓ Dedicated guardrails section
✓ Precise tool descriptions with when/how/error guidance
✓ Explicit error handling instructions

Example 2: Customer service refund agent
1# Personality23You are a refund specialist for RetailCo.4You are empathetic, solution-oriented, and efficient.5You balance customer satisfaction with company policy compliance.67# Goal89Process refund requests through this workflow:10111. Verify customer identity using order number and email122. Look up order details with `getOrderDetails` tool133. Confirm refund eligibility (within 30 days, not digital download, not already refunded)144. For refunds under $100: Process immediately with `processRefund` tool155. For refunds $100-$500: Apply secondary verification, then process166. For refunds over $500: Escalate to supervisor with case summary1718This step is important: Never process refunds without verifying eligibility first.1920# Guardrails2122Never process refunds outside the 30-day return window without supervisor approval.23Never process refunds over $500 without supervisor approval. This step is important.24Never access order information without verifying customer identity.25If a customer becomes aggressive, remain calm and offer supervisor escalation.2627# Tools2829## `verifyIdentity`3031**When to use:** At the start of every conversation32**Parameters:**3334- `order_id` (required): Order ID in uppercase alphanumeric format (e.g., "ORD123456"). Convert from spoken format: spell out letters and spoken digits to written form, no spaces.35- `email` (required): Customer email in standard written format (e.g., "john.smith@retailco.com"). Convert from spoken format: "at" → "@", "dot" → ".", remove spaces between words.3637## `getOrderDetails`3839**When to use:** After identity verification40**Returns:** Order date, items, total amount, refund eligibility status4142**Error handling:**43If order not found, ask customer to verify order number and try again.4445## `processRefund`4647**When to use:** Only after confirming eligibility48**Required checks before calling:**4950- Identity verified51- Order is within 30 days52- Order is eligible (not digital, not already refunded)53- Refund amount is under $5005455**Parameters:**5657- `order_id` (required): From previous verification58- `reason_code` (required): One of "defective", "wrong_item", "late_delivery", "changed_mind"5960**Usage:**61621. Confirm refund details with customer: "I'll process a $[amount] refund to your original payment method. It will appear in 3-5 business days. Does that work for you?"632. Wait for customer confirmation643. Call this tool6566**Error handling:**67If refund processing fails, apologize and escalate: "I'm unable to process that refund right now. Let me escalate to a supervisor who can help."
Principles demonstrated:

✓ Specialized agent scope (refunds only, not general support)
✓ Clear workflow steps in # Goal section
✓ Repeated emphasis on critical rules (refund limits, verification)
✓ Detailed tool usage with “when to use” and “required checks”
✓ Format conversion in parameter descriptions (order IDs, emails)
✓ Explicit error handling per tool
✓ Escalation criteria clearly defined

Formatting best practices
How you format your prompt impacts how effectively the language model interprets it:

Use markdown headings: Structure sections with # for main sections, ## for subsections
Prefer bulleted lists: Break down instructions into digestible bullet points
Use whitespace: Separate sections and instruction groups with blank lines
Keep headings in sentence case: # Goal not # GOAL
Be consistent: Use the same formatting pattern throughout the prompt

Frequently asked questions
How do I maintain consistency across multiple agents?Create shared prompt templates for common sections like character normalization, error handling,
and guardrails. Store these in a central repository and reference them across specialist agents.
Use the orchestrator pattern to ensure consistent routing logic and handoff procedures.What's the minimum viable prompt for production?At minimum, include: (1) Personality/role definition, (2) Primary goal, (3) Core guardrails, and
(4) Tool descriptions if tools are used. Even simple agents benefit from explicit section
structure and error handling instructions.How do I handle tool deprecation without breaking agents?When deprecating a tool, add a new tool first, then update the prompt to prefer the new tool while
keeping the old one as a fallback. Monitor usage, then remove the old tool once usage drops to
zero. Always include error handling so agents can recover if a deprecated tool is called.Should I use different prompts for different LLMs?Generally, prompts structured with the principles in this guide work across models. However,
model-specific tuning can improve performance—particularly for tool-calling format and reasoning
steps. Test your prompt with multiple models and adjust if needed.How long should my system prompt be?No universal limit exists, but prompts over 2000 tokens increase latency and cost. Focus on
conciseness: every line should serve a clear purpose. If your prompt exceeds 2000 tokens, consider
splitting into multiple specialized agents or extracting reference material into a knowledge base.How do I balance consistency with adaptability?Define core personality traits, goals, and guardrails firmly while allowing flexibility in tone
and verbosity based on user communication style. Use conditional instructions: “If the user is
frustrated, acknowledge their concerns before proceeding.”Can I update prompts after deployment?Yes. System prompts can be modified at any time to adjust behavior. This is particularly useful
for addressing emerging issues or refining capabilities as you learn from user interactions.
Always test changes in a staging environment before deploying to production.How do I prevent agents from hallucinating when tools fail?Include explicit error handling instructions for every tool. Emphasize “never guess or make up
information” in the guardrails section. Repeat this instruction in tool-specific error handling
sections. Test tool failure scenarios during development to ensure agents follow recovery
instructions.
Next steps
This guide establishes the foundation for reliable agent behavior through prompt engineering, tool configuration, and architectural patterns. To build production-grade systems, continue with:

Workflows: Design multi-agent orchestration and specialist handoffs
Success Evaluation: Configure metrics and evaluation criteria
Data Collection: Capture structured insights from conversations
Testing: Implement regression testing and simulation
Guardrails: Configure content moderation for safe agent responses
Privacy: Ensure compliance and data protection
Our Docs Agent: See a complete case study of these principles in action

For enterprise deployment support, contact our team.
