---
id: article-2026-04-12-client-tools
type: source
title: "Client tools"
path: raw/articles/voice-ai/2026-04-12-client-tools.md
author: ElevenLabs
publisher: ElevenLabs Docs
url: https://elevenlabs.io/docs/eleven-agents/customization/tools/client-tools
date_published: 
date_added: 2026-04-12
tags: [voice-ai, elevenlabs, voice-agents, tools, client-tools]
status: ingested
quality: medium
summary: Empower your assistant to trigger client-side operations.
related: [voice-ai, elevenlabs, voice-agents, tools, client-tools]
---

# Client tools

## Source Metadata

- Path: raw/articles/voice-ai/2026-04-12-client-tools.md
- Author: ElevenLabs
- Published: Unknown
- Publisher: ElevenLabs Docs
- URL: https://elevenlabs.io/docs/eleven-agents/customization/tools/client-tools

## TL;DR

Empower your assistant to trigger client-side operations.

## Key Claims

- Empower your assistant to trigger client-side operations.
- Client tools enable your assistant to execute client-side functions.
- Overview
Applications may require assistants to interact directly with the user’s environment.
- Triggering UI events: Allow an assistant to trigger browser events, such as alerts, modals or notifications.

## Important Details

- Source captured from elevenlabs.io.
- Section heading: Overview
- Section heading: Guide
- Section heading: Prerequisites
- Section heading: Create a new client-side tool
- Section heading: Register the client tool in your code

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
- [[tools]]
- [[client-tools]]

## Source Text

Client tools enable your assistant to execute client-side functions. Unlike server-side tools, client tools allow the assistant to perform actions such as triggering browser events, running client-side functions, or sending notifications to a UI.

Overview
Applications may require assistants to interact directly with the user’s environment. Client-side tools give your assistant the ability to perform client-side operations.
Here are a few examples where client tools can be useful:

Triggering UI events: Allow an assistant to trigger browser events, such as alerts, modals or notifications.
Interacting with the DOM: Enable an assistant to manipulate the Document Object Model (DOM) for dynamic content updates or to guide users through complex interfaces.

To perform operations server-side, use
server-tools instead.
Guide
Prerequisites

An ElevenLabs account
A configured ElevenLabs Conversational Agent (create one here)

1Create a new client-side toolNavigate to your agent dashboard. In the Tools section, click Add Tool. Ensure the Tool Type is set to Client. Then configure the following:SettingParameterNamelogMessageDescriptionUse this client-side tool to log a message to the user’s client.Then create a new parameter message with the following configuration:SettingParameterData TypeStringIdentifiermessageRequiredtrueDescriptionThe message to log in the console. Ensure the message is informative and relevant.2Register the client tool in your codeUnlike server-side tools, client tools need to be registered in your code.Use the following code to register the client tool:1from elevenlabs import ElevenLabs2from elevenlabs.conversational_ai.conversation import Conversation, ClientTools34def log_message(parameters):5    message = parameters.get("message")6    print(message)78client_tools = ClientTools()9client_tools.register("logMessage", log_message)1011conversation = Conversation(12    client=ElevenLabs(api_key="your-api-key"),13    agent_id="your-agent-id",14    client_tools=client_tools,15    # ...16)1718conversation.start_session()The tool and parameter names in the agent configuration are case-sensitive and must match those registered in your code.3TestingInitiate a conversation with your agent and say something like:
Log a message to the console that says Hello World
You should see a Hello World log appear in your console.4Next stepsNow that you’ve set up a basic client-side event, you can:
Explore more complex client tools like opening modals, navigating to pages, or interacting with the DOM.
Combine client tools with server-side webhooks for full-stack interactions.
Use client tools to enhance user engagement and provide real-time feedback during conversations.

Passing client tool results to the conversation context
When you want your agent to receive data back from a client tool, ensure that you tick the Wait for response option in the tool configuration.

Once the client tool is added, when the function is called the agent will wait for its response and append the response to the conversation context.
1def get_customer_details():2    # Fetch customer details (e.g., from an API or database)3    customer_data = {4        "id": 123,5        "name": "Alice",6        "subscription": "Pro"7    }8    # Return the customer data; it can also be a JSON string if needed.9    return customer_data1011client_tools = ClientTools()12client_tools.register("getCustomerDetails", get_customer_details)1314conversation = Conversation(15    client=ElevenLabs(api_key="your-api-key"),16    agent_id="your-agent-id",17    client_tools=client_tools,18    # ...19)2021conversation.start_session()
In this example, when the agent calls getCustomerDetails, the function will execute on the client and the agent will receive the returned data, which is then used as part of the conversation context. The values from the response can also optionally be assigned to dynamic variables, similar to server tools. Note system tools cannot update dynamic variables.
Troubleshooting
Tools not being triggered
Ensure the tool and parameter names in the agent configuration match those registered in your code.
View the conversation transcript in the agent dashboard to verify the tool is being executed.
Console errors
Open the browser console to check for any errors.
Ensure that your code has necessary error handling for undefined or unexpected parameters.

Best practices
Name tools intuitively, with detailed descriptions
If you find the assistant does not make calls to the correct tools, you may need to update your tool names and descriptions so the assistant more clearly understands when it should select each tool. Avoid using abbreviations or acronyms to shorten tool and argument names.
You can also include detailed descriptions for when a tool should be called. For complex tools, you should include descriptions for each of the arguments to help the assistant know what it needs to ask the user to collect that argument.
Name tool parameters intuitively, with detailed descriptions
Use clear and descriptive names for tool parameters. If applicable, specify the expected format for a parameter in the description (e.g., YYYY-mm-dd or dd/mm/yy for a date).
Consider providing additional information about how and when to call tools in your assistant’s
system prompt
Providing clear instructions in your system prompt can significantly improve the assistant’s tool calling accuracy. For example, guide the assistant with instructions like the following:

Provide context for complex scenarios. For example:

LLM selection
When using tools, we recommend picking high intelligence models like GPT-4o mini or Claude 3.5
Sonnet and avoiding Gemini 1.5 Flash.
It’s important to note that the choice of LLM matters to the success of function calls. Some LLMs can struggle with extracting the relevant parameters from the conversation.
