---
id: article-2026-04-12-agent-testing
type: source
title: "Agent Testing"
path: raw/articles/voice-ai/2026-04-12-agent-testing.md
author: ElevenLabs
publisher: ElevenLabs Docs
url: https://elevenlabs.io/docs/eleven-agents/customization/agent-testing
date_published:
date_added: 2026-04-12
tags: [voice-ai, elevenlabs, voice-agents, testing]
status: ingested
quality: medium
summary: Build confidence in your agent's behavior with automated testing
related: [voice-ai, elevenlabs, voice-agents, testing]
---

# Agent Testing

## Source Metadata

- Path: raw/articles/voice-ai/2026-04-12-agent-testing.md
- Author: ElevenLabs
- Published: Unknown
- Publisher: ElevenLabs Docs
- URL: https://elevenlabs.io/docs/eleven-agents/customization/agent-testing

## TL;DR

Build confidence in your agent's behavior with automated testing

## Key Claims

- Build confidence in your agent's behavior with automated testing
- The agent testing framework enables you to move from slow, manual phone calls to a fast, automated, and repeatable testing process.
- Overview
The framework consists of two complementary testing approaches:
- Scenario Testing (LLM Evaluation) - Validates conversational abilities and response quality
Tool Call Testing - Ensures proper tool usage and parameter validation
Simulation Testing - Runs end-to-end, multi-turn conversations with a simulated user

## Important Details

- Source captured from elevenlabs.io.
- Section heading: Video Walkthrough
- Section heading: Overview
- Section heading: Scenario Testing (LLM Evaluation)
- Section heading: Creating a Scenario Test
- Section heading: Define the scenario

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
- [[testing]]

## Source Text

The agent testing framework enables you to move from slow, manual phone calls to a fast, automated, and repeatable testing process. Create comprehensive test suites that verify both conversational responses and tool usage, ensuring your agents behave exactly as intended before deploying to production.
Video Walkthrough

Overview
The framework consists of two complementary testing approaches:

Scenario Testing (LLM Evaluation) - Validates conversational abilities and response quality
Tool Call Testing - Ensures proper tool usage and parameter validation
Simulation Testing - Runs end-to-end, multi-turn conversations with a simulated user

Both test types can be created from scratch or directly from existing conversations, allowing you to quickly turn real-world interactions into repeatable test cases.
Scenario Testing (LLM Evaluation)
Scenario testing evaluates your agent’s conversational abilities by simulating interactions and assessing responses against defined success criteria.
Creating a Scenario Test

1Define the scenarioCreate context for the text. This can be multiple turns of interaction that sets up the specific scenario you want to evaluate. Our testing framework currently only supports evaluating a single next step in the conversation. For simulating entire conversations, see our simulate conversation endpoint and conversation simulation guide.Example scenario:2Set success criteriaDescribe in plain language what the agent’s response should achieve. Be specific about the
expected behavior, tone, and actions.Example criteria:
The agent should acknowledge the customer’s frustration with empathy
The agent should offer to investigate the duplicate charge
The agent should provide clear next steps for cancellation or resolution
The agent should maintain a professional and helpful tone
3Provide examplesSupply both success and failure examples to help the evaluator understand the nuances of your
criteria.Success Example:
“I understand how frustrating duplicate charges can be. Let me look into this right away for you. I can see there were indeed two charges this month - I’ll process a refund for the duplicate charge immediately. Would you still like to proceed with cancellation, or would you prefer to continue once this is resolved?”
Failure Example:
“You need to contact billing department for refund issues. Your subscription will be cancelled.”
4Run the testExecute the test to simulate the conversation with your agent. An LLM evaluator compares the
actual response against your success criteria and examples to determine pass/fail status.
Creating Tests from Conversations
Transform real conversations into test cases with a single click. This powerful feature creates a feedback loop for continuous improvement based on actual performance.

When reviewing call history, if you identify a conversation where the agent didn’t perform well:

Click “Create test from this conversation”
The framework automatically populates the scenario with the actual conversation context
Define what the correct behavior should have been
Add the test to your suite to prevent similar issues in the future

Tool Call Testing
Tool call testing verifies that your agent correctly uses tools and passes the right parameters in specific situations. This is critical for actions like call transfers, data lookups, or external integrations.
Creating a Tool Call Test

1Select the toolChoose which tool you expect the agent to call in the given scenario (e.g.,
transfer_to_number, end_call, lookup_order).2Define expected parametersSpecify what data the agent should pass to the tool. You have three validation methods:Validation MethodsExact Match
The parameter must exactly match your specified value.Regex Pattern
The parameter must match a specific pattern.LLM Evaluation
An LLM evaluates if the parameter is semantically correct based on context.3Configure dynamic variablesWhen testing in development, use dynamic variable values that match those that would be actual
values in production. Example: {{ customer_name }} or {{ order_id }}4Run and validateExecute the test to ensure the agent calls the correct tool with proper parameters.
Critical Use Cases
Tool call testing is essential for high-stakes scenarios:

Emergency Transfers: Ensure medical emergencies always route to the correct number
Data Security: Verify sensitive information is never passed to unauthorized tools
Business Logic: Confirm order lookups use valid formats and authentication

Simulation Testing
Simulation testing evaluates your agent across a full, multi-turn conversation with a simulated AI user. Unlike single-turn evaluations, this test type checks whether the complete interaction reaches your defined outcome.
Simulation testing is currently in public alpha. Functionality and UI behavior may change.
Creating a Simulation Test

1Define the simulation scenarioDescribe the user’s context, intent, and behavior in natural language. The simulator uses this
scenario to drive the conversation.Example scenario:
“A tourist who is not fluent in English is trying to place an order at a restaurant.”
2Set the success conditionDefine the outcome that should count as a pass. This prompt is used to evaluate whether the
full conversation succeeded.Example success condition:
“The agent confirmed the order details, handled clarifying questions, and completed the order without misunderstandings.”
3Set max turnsChoose how long the simulation can run before stopping. Use a lower value for focused checks
and a higher value for complex workflows.
Minimum: 1
Maximum: 50
Default: 5
4Run and review the resultExecute the test and inspect the generated conversation transcript. Review the pass/fail result
against your success condition, then iterate on your prompt, tools, or agent configuration.
Optional Configuration
You can refine simulation behavior in the test configuration panel:

Environment: Select which environment to test against when your agent has multiple environments configured. If only one environment is available, this selector is hidden.
Chat history: Start from a partial conversation instead of a blank state. This is useful for testing in-progress conversations and recovery behavior.
Dynamic variables: Inject test-specific values into your agent variables (for example, user names or order IDs) without changing the base agent configuration.

Tool Mocking
Simulation tests support tool mocking so your agent can receive controlled responses during a run instead of calling live systems.
Mocking strategy

Mock none: No tools are mocked.
Mock all tools: Every mockable tool returns a mock response.
Mock selected tools: Only tools you explicitly choose are mocked.

System tools and workflow tools are never mocked.
Fallback behavior
If a mocked tool is called and no matching mock response is found, choose one of these behaviors:

Call real tool: Executes the real tool call.
Finish with error: Returns an error response from the tool instead of calling the real tool.

The fallback setting appears only when at least one tool is mocked.
Development Workflow
The framework supports an iterative development cycle that accelerates agent refinement:
1Write tests firstDefine the desired behavior by creating tests for new features or identified issues.2Test and iterateRun tests instantly without saving changes. Watch them fail, then adjust your agent’s prompts or
configuration.3Refine until passingContinue tweaking and re-running tests until all pass. The framework provides immediate feedback
without requiring deployment.4Save with confidenceOnce tests pass, save your changes knowing the agent behaves as intended.
Running Tests
Navigate to the Tests tab in your agent’s interface. From there, you can run individual tests or execute your entire test suite at once using the “Run All Tests” button.

Batch Testing and CI/CD Integration
Running Test Suites
Execute all tests at once to ensure comprehensive coverage:

Select multiple tests from your test library
Run as a batch to identify any regressions
Review consolidated results showing pass/fail status for each test

CLI Integration
Integrate testing into your development pipeline using the ElevenLabs CLI:
$# Run all tests for an agent$elevenlabs agents test <your_agent_id>
This enables:

Automated testing on every code change
Prevention of regressions before deployment
Consistent agent behavior across environments

View CLI Documentation for automated testing setup
Explore Tool Configuration to understand available tools
Read the Prompting Guide for writing testable prompts
