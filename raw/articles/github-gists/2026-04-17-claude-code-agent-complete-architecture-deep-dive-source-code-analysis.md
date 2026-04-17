---
id: article-2026-04-17-claude-code-agent-complete-architecture-deep-dive-source-code-analysis
type: source
title: "Claude Code Agent — Complete Architecture Deep Dive (source code analysis)"
path: raw/articles/github-gists/2026-04-17-claude-code-agent-complete-architecture-deep-dive-source-code-analysis.md
author: Unknown
publisher: GitHub Gist
url: https://gist.github.com/yanchuk/0c47dd351c2805236e44ec3935e9095d
date_published: 
date_added: 2026-04-17
tags: [claude-code, agent-harnesses, context-engineering, permissions, subagents, tool-orchestration]
status: processed
quality: medium
summary: Reverse-engineered teardown of Claude Code's runtime loop, tool orchestration, compaction stack, permission system, and subagent architecture, most useful as a source of reusable harness patterns.
related: [claude-code, agent-harnesses, context-engineering, managed-agents, multi-agent-systems, agent-security]
---

# Claude Code Agent — Complete Architecture Deep Dive (source code analysis)

## Source Metadata

- Path: raw/articles/github-gists/2026-04-17-claude-code-agent-complete-architecture-deep-dive-source-code-analysis.md
- Author: Unknown
- Published: Unknown
- Publisher: Gist
- URL: https://gist.github.com/yanchuk/0c47dd351c2805236e44ec3935e9095d

## TL;DR

This teardown treats Claude Code as a layered agent runtime where most reusable engineering leverage sits in the harness and infrastructure: a streaming async-generator loop, concurrency-aware tool execution, cache-aware prompt structure, progressive compaction, explicit retry paths, and isolated subagents.

## Key Claims

- Claude Code is better understood as a multi-layer runtime than a single chat loop: weights, context, harness, and infrastructure all matter.
- The core execution loop is a streaming `async function*` that yields events as they arrive instead of buffering work behind a blocking loop.
- Tool orchestration is deliberate rather than uniform: read-only tools run in parallel, mutating tools run serially, and some tools can start mid-stream before the model response finishes.
- Context management is treated as an explicit systems problem through prompt-cache boundaries, tool-result budgets, and multiple compaction strategies.
- Error handling is built into the state machine with different recovery paths for overload, rate limits, auth failures, and context overflow.
- Subagents are isolated execution contexts with bounded permissions, working directories, and coordination surfaces rather than lightweight prompt branches.
- The most reusable ideas are the control surfaces and layering decisions, not the exact thresholds, file paths, or model choices mentioned in the teardown.

## Important Details

- Source captured from `gist.github.com` as a reverse-engineered architecture write-up rather than an official Anthropic design note.
- The loop description emphasizes five recurring concerns per turn: setup and budgeting, model invocation, recovery and compaction, tool execution, and continuation or stop decisions.
- Tool execution is split by concurrency class, with read-heavy work parallelized and mutating work serialized to avoid races.
- Large tool outputs are budgeted and can be spilled to disk with a short preview left in context.
- Prompt composition is described as cache-aware, with a stable static prefix kept above a dynamic boundary and volatile context pushed later in the request.
- Context compaction is presented as a ladder from cheap micro-compaction to heavier summarization or collapse only when needed.
- Permission handling, hooks, and plugins are framed as first-class runtime surfaces rather than prompt-only conventions.
- Subagent orchestration includes isolation, abort propagation, and durable coordination through filesystem-backed task artifacts.

## Entities

- People: yanchuk
- Companies: Anthropic, GitHub
- Tools: Claude Code, Bun, Ink, GrowthBook, MCP, tmux
- Concepts: agent harnesses, context compaction, prompt caching, permission pipelines, subagents, tool orchestration

## My Notes

- This is a useful pattern source for harness engineering even if some implementation details may drift as Claude Code evolves.
- The strongest portable patterns are generator-based loops, cheap-first compaction, cache-stable prompt layout, concurrency-aware tool scheduling, and explicit recovery states.
- Exact retry thresholds, token numbers, model fallbacks, and internal file paths should be treated as product-specific details rather than general laws.

## Open Questions

- Which of these runtime patterns also recur in non-Claude agent systems strongly enough to deserve their own concept pages?
- Should the KB add a dedicated synthesis page on agent runtime loops and tool orchestration, distinct from the broader `[[claude-code]]` concept?
- Which parts of the teardown are architectural signals versus temporary implementation details that may change quickly?

## Related

- [[claude-code]]
- [[agent-harnesses]]
- [[context-engineering]]
- [[managed-agents]]
- [[multi-agent-systems]]
- [[agent-security]]

## Source Text

A comprehensive analysis of the Claude Code CLI agent source code.
Covers every subsystem: core loop, memory, orchestration, permissions, UI, MCP, skills, and more.
Includes ASCII diagrams, design patterns, and ideas for building agent orchestrator systems.

High-Level Overview
Core Execution Loop
Context & Memory Management
Agent Orchestration & Multi-Agent System
Tool System
Permission & Safety System
Hook System
Skill & Plugin System
MCP (Model Context Protocol) Integration
Terminal UI (Ink/React)
Streaming & API Layer
State Management
Key Design Patterns & Ideas for Agent Systems
File Reference Map

1. High-Level Overview
Claude Code is a terminal-native AI coding agent built with:

Runtime: Bun (fast JS/TS runtime)
UI Framework: Ink (React renderer for terminals) with custom extensions
Language: TypeScript (strict, compiled)
Architecture: Event-driven, streaming, generator-based agent loop
Model: Claude API (Anthropic) with multi-provider support (1P, Bedrock, Vertex)

Streaming-first
Generator functions yield events as they arrive — never batch

Tool-use loop
Model proposes tool calls, agent executes, feeds results back

Layered context
System prompt + CLAUDE.md memory + conversation + compaction

Permission-gated
Every tool call passes through a multi-layer permission pipeline

Feature-gated
GrowthBook flags control feature rollout with dead-code elimination

Multi-agent
Coordinator spawns workers, agents spawn sub-agents, teams communicate

Master Architecture Diagram
┌─────────────────────────────────────────────────────────────────────────┐
│                         CLAUDE CODE CLI                                 │
│                                                                         │
│  ┌──────────┐  ┌────────────┐  ┌──────────┐  ┌──────────────────────┐  │
│  │  main.tsx │─▶│ init()     │─▶│ launchRe │─▶│  <App>               │  │
│  │ (entry)   │  │ (bootstrap)│  │ pl()     │  │   └─ <REPL>          │  │
│  └──────────┘  └────────────┘  └──────────┘  │       └─ PromptInput  │  │
│                                               │       └─ Messages    │  │
│  ┌──────────────────────────────────────────┐ └──────────────────────┘  │
│  │           QueryEngine (per session)       │                          │
│  │  ┌──────────────────────────────────┐     │                          │
│  │  │  query() — async generator loop  │     │                          │
│  │  │  ┌────────────────────────────┐  │     │                          │
│  │  │  │ queryModelWithStreaming()  │  │     │                          │
│  │  │  │  ├─ Build system prompt    │  │     │                          │
│  │  │  │  ├─ Normalize messages     │  │     │                          │
│  │  │  │  ├─ Stream API response    │  │     │                          │
│  │  │  │  └─ Yield events           │  │     │                          │
│  │  │  └────────────────────────────┘  │     │                          │
│  │  │  ┌────────────────────────────┐  │     │                          │
│  │  │  │ runTools() orchestration   │  │     │                          │
│  │  │  │  ├─ Permission check       │  │     │                          │
│  │  │  │  ├─ Hook execution         │  │     │                          │
│  │  │  │  ├─ Concurrent/serial exec │  │     │                          │
│  │  │  │  └─ Yield tool results     │  │     │                          │
│  │  │  └────────────────────────────┘  │     │                          │
│  │  │  ┌────────────────────────────┐  │     │                          │
│  │  │  │ Compaction (auto/micro)    │  │     │                          │
│  │  │  │  ├─ Token budget tracking  │  │     │                          │
│  │  │  │  ├─ Auto-compact trigger   │  │     │                          │
│  │  │  │  └─ Message summarization  │  │     │                          │
│  │  │  └────────────────────────────┘  │     │                          │
│  │  └──────────────────────────────────┘     │                          │
│  └───────────────────────────────────────────┘                          │
│                                                                         │
│  ┌──────────────┐ ┌────────────┐ ┌───────────┐ ┌────────────────────┐  │
│  │ Tool Registry │ │ Permission │ │ Hook      │ │ MCP Clients        │  │
│  │ (40+ tools)   │ │ Engine     │ │ Engine    │ │ (stdio/sse/ws/sdk) │  │
│  └──────────────┘ └────────────┘ └───────────┘ └────────────────────┘  │
│                                                                         │
│  ┌──────────────┐ ┌────────────┐ ┌───────────┐ ┌────────────────────┐  │
│  │ Skill Loader  │ │ Plugin Mgr │ │ Analytics │ │ State Store        │  │
│  │ (fs/bundled/  │ │ (builtin/  │ │ (OTel +   │ │ (AppState +        │  │
│  │  mcp/managed) │ │  market)   │ │  1P logs) │ │  React contexts)   │  │
│  └──────────────┘ └────────────┘ └───────────┘ └────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘

2. Core Execution Loop
The Agent Loop (Heart of the System)
The entire agent is a streaming async generator loop. The model produces text and tool calls; the agent executes tools and feeds results back until the model stops.
┌─────────────────────────────────────────────────────────┐
│                    query() Generator                     │
│                                                          │
│   User message                                           │
│       │                                                  │
│       ▼                                                  │
│   ┌──────────────────────┐                               │
│   │ queryModelWithStream │◄──────────────────────┐       │
│   │ ing() — call API     │                       │       │
│   └──────────┬───────────┘                       │       │
│              │                                   │       │
│              ▼                                   │       │
│   ┌──────────────────────┐                       │       │
│   │ Stream events:       │                       │       │
│   │  • text deltas       │──▶ yield to UI        │       │
│   │  • thinking deltas   │                       │       │
│   │  • tool_use blocks   │                       │       │
│   └──────────┬───────────┘                       │       │
│              │                                   │       │
│              ▼                                   │       │
│   ┌──────────────────────┐     ┌──────────────┐ │       │
│   │ Has tool_use blocks? │─YES─▶ runTools()   │ │       │
│   └──────────┬───────────┘     │  ├─ check    │ │       │
│              │                 │  │  perms     │ │       │
│              NO                │  ├─ execute   │ │       │
│              │                 │  └─ yield     │ │       │
│              ▼                 │    results    │ │       │
│   ┌──────────────────────┐    └──────┬────────┘ │       │
│   │ stop_reason =        │           │          │       │
│   │  "end_turn" or       │           ▼          │       │
│   │  "max_tokens"        │    ┌──────────────┐  │       │
│   └──────────┬───────────┘    │ Append tool  │  │       │
│              │                │ results to   │──┘       │
│              ▼                │ messages[]   │          │
│         DONE — return        └──────────────┘          │
│                                                          │
│   Compaction check runs after each API round:            │
│   if tokens > threshold → autoCompact() or microCompact()│
└─────────────────────────────────────────────────────────┘

Key Components
QueryEngine (src/QueryEngine.ts) — One per conversation session:

Holds mutable message history, abort controller, usage tracking, file cache
submitMessage(userInput) — entry point for each user turn
Coordinates the full cycle: input → API → tools → compaction → next turn

query() (src/query.ts) — The async generator:

Yields StreamEvent | Message as they arrive
Manages max-output-tokens recovery (retries up to 3 times)
Handles token budget tracking per turn
Triggers compaction when approaching context limits

queryModelWithStreaming() (src/services/api/claude.ts) — API call builder:

Assembles system prompt, tools, messages, beta headers
Applies prompt caching breakpoints
Handles streaming response parsing
Tracks cache hits/misses, token usage

Startup Sequence
main.tsx
  ├─ startupProfiler.checkpoint('start')
  ├─ init() [entrypoints/init.ts]
  │   ├─ enableConfigs() — validate settings
  │   ├─ applySafeEnvVars() — pre-trust env setup
  │   ├─ setupGracefulShutdown()
  │   ├─ initUpstreamProxy() — CCR proxy if needed
  │   └─ preconnect to API
  ├─ loadAuth() — OAuth/API key
  ├─ loadGrowthBook() — feature flags
  ├─ checkQuota()
  ├─ getSystemContext() — git status, branch info
  ├─ getUserContext() — CLAUDE.md files, date
  ├─ getAllBaseTools() — tool registry
  ├─ getCommands() — slash commands + skills
  └─ launchRepl()
       └─ <App> → <REPL> → PromptInput + Messages

3. Context & Memory Management
The Context Window Problem
Claude has a finite context window (200K tokens default, 1M with extended). Claude Code must manage this carefully across long sessions with many tool calls.
Multi-Layer Memory Architecture
┌─────────────────────────────────────────────────────┐
│                 CONTEXT WINDOW                       │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │ SYSTEM PROMPT (fixed per session)              │  │
│  │  ├─ Base CLI instructions                      │  │
│  │  ├─ Tool descriptions (non-deferred)           │  │
│  │  ├─ MCP server instructions                    │  │
│  │  └─ Mode-specific guidance                     │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │ USER CONTEXT (injected as system-reminder)     │  │
│  │  ├─ CLAUDE.md hierarchy (project memory)       │  │
│  │  │    /etc/claude-code/CLAUDE.md  (global)     │  │
│  │  │    ~/.claude/CLAUDE.md         (user)       │  │
│  │  │    ./CLAUDE.md                 (project)    │  │
│  │  │    ./.claude/CLAUDE.md         (project)    │  │
│  │  │    ./.claude/rules/*.md        (project)    │  │
│  │  │    ./CLAUDE.local.md           (local)      │  │
│  │  ├─ Git status (branch, recent commits)        │  │
│  │  └─ Current date                               │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │ CONVERSATION MESSAGES                          │  │
│  │  ├─ [Compact boundary — summary of older msgs] │  │
│  │  ├─ User message                               │  │
│  │  ├─ Assistant message (text + tool_use)         │  │
│  │  ├─ Tool results                               │  │
│  │  ├─ User message                               │  │
│  │  ├─ Assistant message                          │  │
│  │  └─ ... (growing with each turn)               │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │ RESERVED FOR OUTPUT                            │  │
│  │  └─ ~20K tokens for model response             │  │
│  └────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘

Compaction Strategies (4 Layers)
The system has four distinct compaction strategies, activated progressively:
Token usage ──────────────────────────────────────────▶

0%              80%        85%        90%       98%
│               │          │          │          │
│  Normal       │ Micro-   │ Auto-    │ Session  │ BLOCK
│  operation    │ compact  │ compact  │ memory   │ (hard
│               │ (clear   │ (full    │ compact  │  stop)
│               │  old     │  summary │ (extract │
│               │  tool    │  of old  │  to      │
│               │  results)│  msgs)   │  memory) │

Clears old tool results: [Old tool result content cleared]
Targets: FileRead, Bash, Grep, Glob, WebSearch, WebFetch, FileEdit, FileWrite
Time-based: clears results older than a configurable threshold
Minimal information loss — only raw tool output is removed

Triggers at ~167K tokens (200K context - 20K output reserve - 13K buffer)
Pipeline:

Execute pre-compact hooks
Strip images from old messages
Send older messages to model for summarization
Replace summarized section with compact boundary marker
Re-inject critical context (skills, attachments)
Execute post-compact hooks

Circuit breaker: max 3 consecutive failures before giving up

3. Session Memory Compact (Experimental)

Extracts key information into persistent session memory
Preserves at least 10K tokens, caps at 40K tokens
Maintains API invariants (tool_use/tool_result pairs)

Triggered by API's prompt_too_long error
Truncates oldest message groups
Retries with reduced context

Persistent Memory (memdir)
~/.claude/projects/<project-slug>/memory/
├── MEMORY.md           ◄── Index file (max 200 lines)
│                           One-line pointers to memory files
├── user_role.md        ◄── User type: role, preferences
├── feedback_testing.md ◄── Feedback type: behaviors to repeat/avoid
├── project_auth.md     ◄── Project type: ongoing work context
└── reference_docs.md   ◄── Reference type: external system pointers

Each memory file has frontmatter:
---
name: User Role
description: Senior engineer, prefers terse responses
type: user
---

User is a senior backend engineer with 10 years Go experience.
New to the React frontend in this repo.
Token Counting & Budgeting

API token count
Exact
Slow (API call)
Pre-compaction decisions

characters / 4
~85%
Instant
New message estimation

characters / 2
~85% for JSON
Instant
JSON-heavy content

Fixed 2000 tokens
N/A
Instant
Images/documents

Max entries: 100 files
Max size: 25MB total
Key: Normalized absolute path
Tracks: content, timestamp, partial view flag, raw content for edits
Purpose: Dedup reads, change detection, Edit/Write validation

4. Agent Orchestration & Multi-Agent System
Agent Spawning Architecture
Claude Code supports three levels of multi-agent execution:
┌────────────────────────────────────────────────────────────────┐
│  Level 1: SUB-AGENT (AgentTool)                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Main agent spawns a child via AgentTool                  │  │
│  │  • Isolated file cache (cloned from parent)              │  │
│  │  • Independent AbortController (async) or shared (sync)  │  │
│  │  • Own transcript recording (JSONL sidechain)            │  │
│  │  • Filtered tool pool (per agent definition)             │  │
│  │  • Returns result as text to parent                      │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
│  Level 2: COORDINATOR MODE (multi-worker)                      │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ CLAUDE_CODE_COORDINATOR_MODE=1                           │  │
│  │  • System prompt rewritten for orchestration             │  │
│  │  • Workers spawned via AgentTool with restricted tools   │  │
│  │  • XML task-notification protocol for results            │  │
│  │  • Coordinator aggregates and responds to user           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
│  Level 3: TEAM MODE (persistent teams)                         │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ TeamCreateTool creates named teams                       │  │
│  │  • Team file persisted to ~/.claude/teams/{name}.json    │  │
│  │  • InProcessTeammates run as async tasks in same process │  │
│  │  • SendMessageTool routes messages between teammates     │  │
│  │  • Shared scratchpad filesystem for knowledge exchange   │  │
│  │  • Structured shutdown protocol (request → approve)      │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────┘

Agent Isolation Mechanisms
┌─ Parent Agent ──────────────────────────────────────────────┐
│  context: { messages, fileCache, tools, abortCtrl }         │
│                                                              │
│  AgentTool.call({ prompt, subagent_type, ... })              │
│      │                                                       │
│      ▼                                                       │
│  ┌─ Child Agent ─────────────────────────────────────────┐  │
│  │  agentId:       unique UUID (agent-xyz)               │  │
│  │  fileCache:     CLONED (isolated reads)               │  │
│  │  abortCtrl:     NEW (async) or SHARED (sync)          │  │
│  │  tools:         FILTERED by agent definition          │  │
│  │  systemPrompt:  OVERRIDDEN per agent type             │  │
│  │  messages:      FRESH (only prompt) or FORKED (full)  │  │
│  │  transcript:    SEPARATE file on disk                 │  │
│  │  worktree:      OPTIONAL git worktree isolation       │  │
│  └───────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘

Fork Sub-Agent (Prompt Cache Optimization)
A brilliant optimization: when spawning multiple agents from the same context, fork them to maximize API prompt cache hits:
Parent conversation (100K tokens cached):
  [...history..., assistant(tool_use_1, tool_use_2, tool_use_3)]

Fork Child A:                           Fork Child B:
  [...history...,                         [...history...,
   assistant(tool_use_1,2,3),              assistant(tool_use_1,2,3),
   user(placeholder, placeholder,          user(placeholder, placeholder,
        placeholder,                            placeholder,
        "Research auth bugs")]                  "Fix the CSS layout")]

▲ Same prefix = cache HIT               ▲ Same prefix = cache HIT
  Only the final directive differs         Only the final directive differs

Inter-Agent Communication
┌─────────────┐    SendMessageTool     ┌─────────────┐
│  Leader      │──────────────────────▶│  Worker A    │
│  Agent       │                       │  (in-process)│
│              │◀──────────────────────│              │
│              │   task-notification    │              │
│              │                       └─────────────┘
│              │    SendMessageTool     ┌─────────────┐
│              │──────────────────────▶│  Worker B    │
│              │                       │  (in-process)│
│              │◀──────────────────────│              │
│              │   task-notification    │              │
└─────────────┘                        └─────────────┘

Communication methods:
  1. In-process: queuePendingMessage() → pendingUserMessages[]
  2. File-based:  writeToMailbox() → JSON file on disk (for tmux/remote)
  3. Broadcast:   to="*" → iterates all team members
  4. Shutdown:    shutdown_request → shutdown_response (approve/reject)

Task Lifecycle
                    ┌─────────┐
                    │ pending │
                    └────┬────┘
                         │ start
                         ▼
                    ┌─────────┐
              ┌─────│ running │─────┐
              │     └────┬────┘     │
              │          │          │
         abort│     done │     error│
              │          │          │
              ▼          ▼          ▼
         ┌────────┐ ┌─────────┐ ┌────────┐
         │ killed │ │completed│ │ failed │
         └────────┘ └─────────┘ └────────┘

Task types:
  • local_bash          — Background shell command
  • local_agent         — Background sub-agent
  • remote_agent        — Remote bridge session
  • in_process_teammate — Team member in same process
  • local_workflow      — Workflow script execution
  • monitor_mcp        — MCP server monitoring
  • dream              — Background memory consolidation

Dream Task (Memory Consolidation)
A unique concept: the dream task runs in the background to consolidate session learnings:
Session active → user idle → DreamTask spawns
  ├─ Reviews recent session transcripts
  ├─ Identifies patterns, decisions, preferences
  ├─ Updates MEMORY.md and memory files
  └─ Completes silently (no user disruption)

DreamTaskState:
  phase: 'starting' | 'updating'
  sessionsReviewing: number
  filesTouched: string[]        ◄── Tracks which files were modified
  turns: DreamTurn[]            ◄── Max 30 turns of activity
  priorMtime: number            ◄── For rollback on kill

5. Tool System
Tool Architecture
┌─────────────────────────────────────────────────────────────┐
│                      TOOL REGISTRY                           │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Core Tools (always loaded)                          │    │
│  │  BashTool, FileReadTool, FileEditTool, FileWriteTool│    │
│  │  GlobTool, GrepTool, AgentTool, SkillTool           │    │
│  │  TaskCreate/Get/Update/List/Output/Stop             │    │
│  │  EnterPlanMode, ExitPlanMode, WebFetch, WebSearch   │    │
│  │  ToolSearchTool, SendMessageTool                    │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Feature-Gated Tools                                 │    │
│  │  if KAIROS:        SendUserFile, PushNotification   │    │
│  │  if MONITOR_TOOL:  MonitorTool                      │    │
│  │  if COORDINATOR:   TeamCreate, TeamDelete           │    │
│  │  if AGENT_TRIGGERS:CronCreate, CronDelete, CronList│    │
│  │  if WORKFLOW:      WorkflowTool                     │    │
│  │  if WEB_BROWSER:   WebBrowserTool                   │    │
│  │  if HISTORY_SNIP:  SnipTool                         │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Deferred Tools (loaded via ToolSearchTool)          │    │
│  │  MCP tools (all)                                    │    │
│  │  Tools with shouldDefer=true                        │    │
│  │  NOT deferred: ToolSearch itself, AgentTool         │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Dynamic MCP Tools                                   │    │
│  │  Discovered at runtime from connected MCP servers   │    │
│  │  Names normalized: mcp__{server}__{tool}            │    │
│  │  Schemas fetched on demand via ToolSearchTool       │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘

Tool Interface
interface Tool {
  name: string
  description: string
  inputJSONSchema: JSONSchema           // Zod-validated input

call(input, context): Promise<Result> // Core execution
  validateInput?(input): ValidationResult
  checkPermissions?(input, context): PermissionResult

isConcurrencySafe(input): boolean     // Can run in parallel?
  isReadOnly?: boolean                  // No side effects?
  isEnabled?(): boolean                 // Feature-gated?
  shouldDefer?: boolean                 // Lazy-load schema?
  alwaysLoad?: boolean                  // Override deferral?
}
Tool Execution Orchestration
Model returns: [tool_use_A (Read), tool_use_B (Read), tool_use_C (Edit)]

Step 1: Partition into batches by concurrency safety:
  Batch 1: [A: Read ✓, B: Read ✓]  — both isConcurrencySafe
  Batch 2: [C: Edit ✗]             — needs exclusive access

Step 2: Execute batches:
  Batch 1: Run A and B in PARALLEL (up to 10 concurrent)
  Batch 2: Run C SERIALLY (after batch 1 completes)

Step 3: Sibling error handling:
  If A errors during parallel execution:
    → siblingAbortController.abort()
    → B gets cancelled with "parallel tool call errored"
    → Both results returned (error + cancelled)

Deferred Tool Loading (ToolSearchTool)
Why defer? With 100+ MCP tools, loading all schemas into the system prompt wastes tokens. Instead:
System prompt contains:
  "The following deferred tools are available via ToolSearch:
   mcp__slack__send_message
   mcp__github__create_pr
   mcp__jupyter__execute
   ..."                              ◄── Names only, no schemas

Model needs to use Slack:
  1. Model calls: ToolSearch({ query: "select:mcp__slack__send_message" })
  2. ToolSearch returns: full JSON Schema for the tool
  3. Model can now call: mcp__slack__send_message({ channel, text })

Search algorithm:
  • "select:X,Y,Z"    → exact name match (direct)
  • "+slack send"      → require "slack" in name, rank by "send"
  • "notebook jupyter" → keyword scoring with weights:
      exact name part match: +12 (MCP) / +10 (regular)
      substring match:        +6 / +5
      searchHint match:       +4
      description match:      +2

6. Permission & Safety System
Permission Pipeline
Every tool call passes through this pipeline before execution:
Tool call arrives
       │
       ▼
┌──────────────┐    ┌────────────┐
│ Check mode   │───▶│ bypass     │──▶ ALLOW (skip all checks)
│              │    │ Permissions │
│              │    └────────────┘
│              │    ┌────────────┐
│              │───▶│ dontAsk    │──▶ DENY (block all)
└──────┬───────┘    └────────────┘
       │
       ▼
┌──────────────┐
│ Apply rules  │
│  1. Deny     │──▶ if matched → DENY
│  2. Allow    │──▶ if matched → ALLOW
│  3. Ask      │──▶ if matched → prompt user
└──────┬───────┘
       │ no rule matched
       ▼
┌──────────────┐
│ Auto-mode?   │──YES──▶ LLM classifier
│ (TRANSCRIPT  │         │
│  CLASSIFIER) │         ├─ allowlisted tool? → ALLOW
│              │         ├─ classifier says safe? → ALLOW
│              │         └─ classifier says unsafe? → DENY
│              │             (with denial tracking:
│              │              >3 consecutive or >20 total
│              │              → fall back to ASK)
└──────┬───────┘
       │ not auto-mode
       ▼
┌──────────────┐
│ Mode-specific│
│  default     │──▶ ASK user
│  acceptEdits │──▶ ALLOW file edits in cwd, ASK others
│  plan        │──▶ pause and show plan
└──────────────┘

acceptEdits
>>
Auto-allow file edits in cwd

plan
?
Pause between tool calls for review

bypassPermissions
!
Skip all checks (dangerous)

auto
A
LLM classifier decides (feature-gated)

Safety Mechanisms
┌─────────────────────────────────────────────────────────┐
│                    SAFETY LAYERS                         │
│                                                          │
│  1. Dangerous File Protection                            │
│     .gitconfig, .bashrc, .zshrc, .mcp.json blocked      │
│     Case-insensitive normalization prevents bypasses     │
│                                                          │
│  2. Dangerous Command Detection                          │
│     Bash patterns: rm -rf, git push --force, DROP TABLE  │
│     Auto-mode strips: python, node, bash, npm run, etc.  │
│                                                          │
│  3. Bypass Permissions Killswitch                        │
│     GrowthBook feature gate can disable bypass mode      │
│     Checked at startup, re-checked after /login          │
│                                                          │
│  4. Auto-Mode Circuit Breaker                            │
│     Live Statsig gate can disable auto-mode              │
│     Once circuit-broken, cannot re-enter auto mode       │
│                                                          │
│  5. Denial Tracking                                      │
│     >3 consecutive denials → fall back to ASK            │
│     >20 total denials → fall back to ASK                 │
│                                                          │
│  6. Skill Scope Narrowing                                │
│     Editing .claude/skills/X/ → offer "allow this skill" │
│     instead of broad .claude/ write access               │
│                                                          │
│  7. MCP Shell Block                                      │
│     MCP-sourced skills NEVER execute shell commands       │
│     (prevents remote code execution via untrusted skills) │
└─────────────────────────────────────────────────────────┘

7. Hook System
Hook Architecture
Hooks are user-defined actions that fire at lifecycle events. They're the extensibility backbone of Claude Code.
┌──────────────────────────────────────────────────────────────┐
│                       HOOK EVENTS                             │
│                                                               │
│  Session Lifecycle:                                           │
│    SessionStart ──▶ fires on startup/resume/clear/compact     │
│    Stop         ──▶ fires before Claude concludes response    │
│                                                               │
│  User Input:                                                  │
│    UserPromptSubmit ──▶ fires when user submits               │
│                        exit code 2 = BLOCK submission         │
│                                                               │
│  Tool Lifecycle:                                              │
│    PreToolUse     ──▶ fires before tool execution             │
│                      exit code 2 = BLOCK with stderr msg      │
│    PostToolUse    ──▶ fires after successful execution        │
│    PostToolUseFail──▶ fires after failed execution            │
│                                                               │
│  Agent Lifecycle:                                             │
│    SubagentStart  ──▶ fires when sub-agent spawns             │
│    SubagentStop   ──▶ fires when sub-agent completes          │
│                                                               │
│  Task Lifecycle:                                              │
│    TaskCreated    ──▶ fires when new task registered          │
│    TaskCompleted  ──▶ fires when task reaches terminal state  │
│                                                               │
│  Other:                                                       │
│    PermissionDenied ──▶ fires when auto-mode denies           │
│    ConfigChange     ──▶ fires when settings change            │
│    CwdChanged       ──▶ fires when working directory changes  │
│    FileChanged      ──▶ fires when a watched file changes     │
│    Notification     ──▶ fires when notification is sent       │
└──────────────────────────────────────────────────────────────┘

Hook Types
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│   Command   │     │    Prompt    │     │    Agent     │
│   Hook      │     │    Hook      │     │    Hook      │
│             │     │              │     │              │
│ Shell cmd   │     │ LLM evaluates│     │ Full agent   │
│ (bash/zsh)  │     │ condition    │     │ with tools   │
│             │     │ (Haiku model)│     │              │
│ Exit codes: │     │ Returns:     │     │ Timeout: 60s │
│  0 = ok     │     │  {ok: true}  │     │ No recursion │
│  2 = block  │     │  {ok: false, │     │ (hooks       │
│  N = error  │     │   reason}    │     │  cleared)    │
└─────────────┘     └──────────────┘     └──────────────┘

┌──────────────┐     ┌──────────────┐
     │    HTTP      │     │   Function   │
     │    Hook      │     │   Hook       │
     │              │     │              │
     │ HTTP request │     │ TS callback  │
     │ to endpoint  │     │ (in-memory)  │
     │              │     │              │
     │ JSON body    │     │ Session-only │
     │ with context │     │ (not saved)  │
     └──────────────┘     └──────────────┘

userSettings
~/.claude/settings.json
User

projectSettings
.claude/settings.json
Project

localSettings
.claude/settings.local.json
Local

flagSettings
GrowthBook dynamic config
Remote

policySettings
Enterprise MDM policy
Admin

sessionHook
Runtime function hook
Session

builtinHook
Compiled into binary
Built-in

8. Skill & Plugin System
Skill Loading Pipeline
┌────────────────────────────────────────────────────────────┐
│                    SKILL SOURCES                            │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐ │
│  │   Bundled     │  │  Filesystem  │  │  MCP Servers     │ │
│  │   (compiled)  │  │  (user dirs) │  │  (runtime)       │ │
│  │              │  │              │  │                  │ │
│  │  /loop       │  │ ~/.claude/   │  │  MCP server      │ │
│  │  /claude-api │  │  skills/     │  │  exposes skills   │ │
│  │  /schedule   │  │  my-skill/   │  │  as tool_use      │ │
│  │  /simplify   │  │   SKILL.md   │  │  prompts          │ │
│  │  /remember   │  │              │  │                  │ │
│  │  ...16+ more │  │ ./.claude/   │  │                  │ │
│  │              │  │  skills/     │  │                  │ │
│  └──────┬───────┘  │  proj-skill/ │  └────────┬─────────┘ │
│         │          │   SKILL.md   │           │           │
│         │          └──────┬───────┘           │           │
│         │                 │                   │           │
│         ▼                 ▼                   ▼           │
│  ┌─────────────────────────────────────────────────────┐  │
│  │              getCommands() — unified registry        │  │
│  │  Deduplication: realpath() canonical comparison      │  │
│  │  Priority: managed > project > user > bundled        │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │  Plugins      │  │  Managed     │                        │
│  │  (marketplace)│  │  (enterprise)│                        │
│  │              │  │              │                        │
│  │ Installed to │  │ Policy-      │                        │
│  │ ~/.claude/   │  │ controlled   │                        │
│  │ plugins/     │  │ skills       │                        │
│  └──────────────┘  └──────────────┘                        │
└────────────────────────────────────────────────────────────┘

Skill Frontmatter (Configuration)
---
name: "My Skill"
description: "What this skill does"
when_to_use: "When user asks to X"
arguments: ["target", "options"]
argument-hint: "<target> [options]"
allowed-tools: [Read, Grep, Glob]
user-invocable: true
disable-model-invocation: false
model: "opus"
context: "fork"                    ◄── Inline (expand in place) or fork (sub-agent)
agent: "code-reviewer"             ◄── Agent type for forked execution
effort: "high"                     ◄── Token budget hint
paths: ["src/**/*.ts"]             ◄── Only activate when these files are edited
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: "command"
          command: "validate.sh"
---

Your skill instructions here...
Use ${ARG1} for first argument.
Run shell with !` command here `.
Reference skill dir with ${CLAUDE_SKILL_DIR}.
Skill Execution Modes
┌─ INLINE (default) ──────────────────────────┐
│                                              │
│  /my-skill arg1 arg2                         │
│       │                                      │
│       ▼                                      │
│  getPromptForCommand(args, context)          │
│       │                                      │
│       ├─ Substitute ${ARG} placeholders      │
│       ├─ Execute !` shell ` blocks           │
│       ├─ Replace ${CLAUDE_SKILL_DIR}         │
│       └─ Return content blocks               │
│              │                               │
│              ▼                               │
│  Content injected into current conversation  │
│  (model sees it as part of the turn)         │
└──────────────────────────────────────────────┘

┌─ FORKED (context: "fork") ──────────────────┐
│                                              │
│  /my-skill arg1 arg2                         │
│       │                                      │
│       ▼                                      │
│  executeForkedSkill()                        │
│       │                                      │
│       ├─ Create agentId                      │
│       ├─ Build prompt from skill markdown    │
│       └─ runAgent({                          │
│            agentDefinition,                  │
│            promptMessages: [skillPrompt],    │
│            model: skill.model,               │
│            effort: skill.effort              │
│          })                                  │
│              │                               │
│              ▼                               │
│  Sub-agent runs independently                │
│  with its own context and budget             │
│  Returns result text to parent               │
└──────────────────────────────────────────────┘

Conditional Skills (Path-Filtered)
A powerful pattern: skills that only become visible after the model touches specific files:
.claude/skills/react-patterns/SKILL.md
---
paths: ["src/components/**/*.tsx", "src/hooks/**/*.ts"]
---

When model edits src/components/Button.tsx:
  1. discoverSkillDirsForPaths() walks up from Button.tsx
  2. Finds .claude/skills/react-patterns/ matches the glob
  3. Skill becomes available for the rest of the session
  4. Model can now invoke /react-patterns

Plugin System
Plugin Manifest:
  ├─ name, description, version
  ├─ skills[]          ◄── Skills bundled with the plugin
  ├─ hooks{}           ◄── Lifecycle hooks
  ├─ mcpServers{}      ◄── MCP server configurations
  └─ lspServers{}      ◄── LSP server configurations

Plugin Lifecycle:
  install → write settings intent → materialize at startup
  enable  → settings.enabledPlugins[id] = true
  disable → settings.enabledPlugins[id] = false
  update  → re-download, re-materialize

Plugin Scopes:
  managed  (admin-controlled, highest priority)
  project  (.claude/ directory)
  local    (CWD .claude/)
  user     (~/.claude/)

9. MCP (Model Context Protocol) Integration
MCP Client Architecture
┌──────────────────────────────────────────────────────────────┐
│                     MCP CLIENT LAYER                          │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐ │
│  │ stdio        │  │ SSE / HTTP   │  │ WebSocket          │ │
│  │ transport    │  │ transport    │  │ transport          │ │
│  │              │  │              │  │                    │ │
│  │ Local proc   │  │ Remote HTTP  │  │ Persistent conn    │ │
│  │ stdin/stdout │  │ EventSource  │  │ Binary frames      │ │
│  │ pipe         │  │ + auth/OAuth │  │ + TLS/proxy        │ │
│  └──────┬───────┘  └──────┬───────┘  └────────┬───────────┘ │
│         │                 │                    │             │
│         ▼                 ▼                    ▼             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                  MCP SDK Client                         │ │
│  │                                                         │ │
│  │  connectToServer()  ──▶ MCPServerConnection union:      │ │
│  │    • ConnectedMCPServer  (active, has tools/resources)  │ │
│  │    • FailedMCPServer     (error during connection)      │ │
│  │    • NeedsAuthMCPServer  (OAuth required)               │ │
│  │    • PendingMCPServer    (still connecting)             │ │
│  │    • DisabledMCPServer   (user disabled)                │ │
│  │                                                         │ │
│  │  callMcpTool()      ──▶ Execute tool on server          │ │
│  │  listTools()        ──▶ Discover available tools         │ │
│  │  listResources()    ──▶ Discover available resources     │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                               │
│  Tool name normalization:                                     │
│    Server "my-server", tool "send_message"                    │
│    → mcp__my_server__send_message                             │
│                                                               │
│  Error handling:                                              │
│    401 → McpAuthError → marks "needs-auth" (15min cache)      │
│    404 + -32001 → session expired → clear cache, retry        │
│    isError: true → McpToolCallError with _meta                │
│                                                               │
│  Timeout: 100,000,000ms (~27.8 hours) default per tool call   │
│  Auth: ClaudeAuthProvider with OAuth + token caching           │
└──────────────────────────────────────────────────────────────┘

local
.claude/settings.local.json
User's local-only servers

user
~/.claude/settings.json
User's global servers

project
.claude/settings.json
Team-shared servers

dynamic
Runtime registration
Programmatic servers

enterprise
MDM policy
Admin-managed servers

claudeai
Claude.ai proxy
Cloud-hosted servers

managed
Policy settings
Enterprise-managed

10. Terminal UI (Ink/React)
UI Architecture
┌─────────────────────────────────────────────────────────────┐
│  Terminal (stdout/stdin)                                      │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Ink Engine (custom React renderer)                   │   │
│  │                                                       │   │
│  │  React Fiber ──▶ Yoga Layout ──▶ Screen Buffer        │   │
│  │                   (flexbox)       (2D cell grid)       │   │
│  │                                       │               │   │
│  │                                       ▼               │   │
│  │                                  ANSI Output           │   │
│  │                                  (diff-based,          │   │
│  │                                   60fps frame loop)    │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Component Tree                                       │   │
│  │                                                       │   │
│  │  <App>                                                │   │
│  │   ├─ <FpsMetricsProvider>                             │   │
│  │   ├─ <StatsProvider>                                  │   │
│  │   ├─ <AppStateProvider>                               │   │
│  │   ├─ <NotificationsProvider>                          │   │
│  │   ├─ <VoiceProvider>                                  │   │
│  │   └─ <REPL>                     ◄── Main screen       │   │
│  │       ├─ <LogoV2>                                     │   │
│  │       ├─ <Messages>                                   │   │
│  │       │   └─ <VirtualMessageList>                     │   │
│  │       │       ├─ <UserTextMessage>                    │   │
│  │       │       ├─ <AssistantTextMessage>               │   │
│  │       │       │   └─ <StreamingMarkdown>              │   │
│  │       │       ├─ <AssistantToolUseMessage>            │   │
│  │       │       ├─ <AssistantThinkingMessage>           │   │
│  │       │       └─ <ToolUseLoader>                      │   │
│  │       └─ <PromptInput>                                │   │
│  │           ├─ <TextInput> / <VimTextInput>             │   │
│  │           ├─ <PromptInputFooter>                      │   │
│  │           │   ├─ Model selector                       │   │
│  │           │   ├─ Thinking toggle                      │   │
│  │           │   └─ Stats (tokens, cost)                 │   │
│  │           └─ <VoiceIndicator>                         │   │
│  │                                                       │   │
│  │  Dialog Overlays:                                     │   │
│  │   ├─ <PermissionRequest>                              │   │
│  │   ├─ <QuickOpenDialog>                                │   │
│  │   ├─ <GlobalSearchDialog>                             │   │
│  │   ├─ <ModelPicker>                                    │   │
│  │   └─ <ExportDialog>                                   │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘

Key UI Innovations
1. VirtualMessageList — Windowed rendering for long conversations:

Only renders visible messages + overscan buffer
Tracks scroll position and handles jump navigation
Prevents re-renders of off-screen messages

2. Streaming Markdown — Progressive rendering as tokens arrive:

Accumulates text fragments in real-time
Code blocks syntax-highlighted via HighlightedCode
Tables rendered with MarkdownTable

Normal/Insert mode with motions (h/j/k/l/w/b/e)
Operators (d/c/y), text objects (iw/i"/a()
Dot-repeat, registers, find (f/F/t/T)

Hold-to-talk with waveform visualization
20+ language support via Anthropic STT endpoint
Animated cursor during recording (rainbow HSL rotation)

Screen buffer is a 2D cell grid
Each cell: character + foreground + background + styles
Diff between frames → only output changes (flicker-free)
Style pooling (interning) for memory efficiency

11. Streaming & API Layer
End-to-End Streaming Flow
User submits message
       │
       ▼
QueryEngine.submitMessage()
       │
       ▼
query() async generator starts
       │
       ▼
queryModelWithStreaming()
       │
       ├─ Build params:
       │    system prompt, tools, messages,
       │    betas, cache breakpoints,
       │    thinking config, speed mode
       │
       ├─ Call API:
       │    anthropicClient.messages.stream(params)
       │
       ▼
Stream<BetaRawMessageStreamEvent>
       │
       ├─ message_start    ──▶ Initialize message accumulator
       ├─ content_block_start ──▶ New text/tool_use/thinking block
       ├─ content_block_delta ──▶ Incremental content
       │    ├─ text_delta       ──▶ yield to UI (StreamingMarkdown)
       │    ├─ thinking_delta   ──▶ yield to UI (ThinkingMessage)
       │    └─ input_json_delta ──▶ accumulate tool input JSON
       ├─ content_block_stop  ──▶ Block complete
       ├─ message_delta       ──▶ stop_reason, final usage
       └─ message_stop        ──▶ Message complete
              │
              ▼
       Process tool_use blocks → runTools() → yield tool results
              │
              ▼
       Loop back to queryModelWithStreaming() with tool results
       (until stop_reason = "end_turn" or max_tokens recovery exhausted)

API Request Assembly
┌─────────────────────────────────────────────────────────┐
│  API Request Parameters                                  │
│                                                          │
│  model: "claude-opus-4-6-20250415"                       │
│                                                          │
│  system: [                                               │
│    { type: "text", text: "You are Claude Code..." },     │
│    { type: "text", text: "# MCP Instructions..." },      │
│    { type: "text", text: "# Environment...",             │
│      cache_control: { type: "ephemeral" } }              │
│  ]                                                       │
│                                                          │
│  messages: [                                             │
│    { role: "user",      content: [...] },                │
│    { role: "assistant", content: [...] },                │
│    ...with cache_control breakpoints                     │
│  ]                                                       │
│                                                          │
│  tools: [                                                │
│    { name: "Bash", input_schema: {...} },                │
│    { name: "Read", input_schema: {...} },                │
│    { name: "mcp__server__tool", input_schema: {...} },   │
│    ...only non-deferred tools                            │
│  ]                                                       │
│                                                          │
│  thinking: { type: "adaptive", budget_tokens: 16000 }    │
│  max_tokens: 16384                                       │
│  speed: "fast"          (if fast mode enabled)           │
│  temperature: 1         (omitted if thinking enabled)    │
│                                                          │
│  betas: [                                                │
│    "context-1m-2025-...",                                │
│    "fast-mode-2025-...",                                 │
│    "prompt-caching-2025-...",                            │
│    ...feature-gated beta headers                         │
│  ]                                                       │
│                                                          │
│  metadata: {                                             │
│    user_id: JSON({ device_id, session_id, ... })         │
│  }                                                       │
└─────────────────────────────────────────────────────────┘

Prompt Caching Strategy
Cache breakpoints inserted at message boundaries:

system[0]: base prompt
  system[1]: MCP instructions
  system[2]: environment info + cache_control: { type: "ephemeral" }  ◄── Breakpoint

messages[0..N-3]: older messages (summarized after compaction)
  messages[N-2]: cache_control breakpoint                             ◄── Breakpoint
  messages[N-1]: latest user message

When context is compacted:
  - Old messages summarized → new cache prefix
  - Cache breaks detected via checkResponseForCacheBreak()
  - TTL: 1 hour for eligible users (subscribers, ant)
  - Scope: "global" for cross-session sharing

12. State Management
AppState Architecture
┌─────────────────────────────────────────────────────────────┐
│                    AppState (DeepImmutable)                   │
│                                                              │
│  Settings:                                                   │
│    userSettings, modelSelection, permissions                 │
│                                                              │
│  UI State:                                                   │
│    expandedViews, footerSelection, modalVisibility            │
│    currentScreen, activeDialog                               │
│                                                              │
│  Conversation:                                               │
│    messages[], pendingResponse, selectedMessageIndex          │
│                                                              │
│  Tasks: (MUTABLE — for performance)                          │
│    Map<taskId, TaskState>                                     │
│    ├─ LocalShellTaskState                                    │
│    ├─ LocalAgentTaskState                                    │
│    ├─ RemoteAgentTaskState                                   │
│    ├─ InProcessTeammateTaskState                             │
│    ├─ LocalWorkflowTaskState                                 │
│    ├─ MonitorMcpTaskState                                    │
│    └─ DreamTaskState                                         │
│                                                              │
│  MCP:                                                        │
│    clients[], tools[], resources[], commands[]                │
│                                                              │
│  Plugins:                                                    │
│    enabled/disabled, installation status, errors              │
│                                                              │
│  Coordinator:                                                │
│    remoteSessionState, bridgeConnectivity, teammateList       │
│                                                              │
│  Speculation:                                                │
│    pipelinedSuggestionState (feature: SPECULATION)            │
│                                                              │
│  Agent Registry:                                             │
│    agentNameRegistry: Map<name, agentId>                     │
│    foregroundedTask: taskId | null                            │
└─────────────────────────────────────────────────────────────┘

React Context Providers
<App>
  <FpsMetricsProvider>       ◄── Frame rate monitoring
    <StatsProvider>          ◄── Token/cost tracking
      <AppStateProvider>     ◄── Main app state
        <NotificationsProvider> ◄── Toast queue
          <VoiceProvider>    ◄── Voice recording state
            <MailboxProvider>◄── Inter-agent messaging
              <ThemeProvider>◄── Terminal theme
                <REPL />

13. Key Design Patterns & Ideas for Agent Systems
Pattern 1: Generator-Based Agent Loop
The Idea: Use async generators as the core agent loop abstraction. Each yield is a checkpoint where the system can inspect state, apply policies, and update the UI.
Why generators are brilliant for agents:
  ✓ Natural pause/resume semantics
  ✓ Backpressure built-in (consumer controls pace)
  ✓ Cancellation via generator.return()
  ✓ Composable (generators can delegate to sub-generators)
  ✓ Memory-efficient (no buffering of intermediate results)
  ✓ State machine without explicit state variables

Takeaway: Build your agent loop as async function* — it's more natural than callbacks, more flexible than promises, and enables streaming, cancellation, and pause/resume for free.
Pattern 2: Progressive Context Compaction
The Idea: Don't just truncate old messages — use a multi-tier compaction strategy that preserves maximum information at each tier.
Tier 1: Micro-compact  → Clear old tool outputs (cheap, surgical)
Tier 2: Auto-compact   → Summarize old messages (moderate cost)
Tier 3: Session memory  → Extract to persistent storage (expensive)
Tier 4: Reactive        → Truncate on API error (last resort)

Each tier triggers at a different threshold.
Each tier preserves different types of information.
Circuit breakers prevent infinite retry loops.

Takeaway: Design your context management as a pipeline of increasingly aggressive strategies, not a single on/off compaction. Each stage trades different information for space.
Pattern 3: Fork Subagent for Cache Sharing
The Idea: When spawning multiple sub-agents from the same parent, construct their message histories to share a common prefix. This maximizes API prompt cache hits.
Parent: [...100K tokens of history...]
                  │
                  ├─ Child A: [...same 100K...] + "Do task A"  ◄── Cache HIT
                  ├─ Child B: [...same 100K...] + "Do task B"  ◄── Cache HIT
                  └─ Child C: [...same 100K...] + "Do task C"  ◄── Cache HIT

All children pay for ~100K cached tokens (cheap)
instead of ~100K uncached tokens each (3x expensive)

Takeaway: If your API supports prompt caching, design your multi-agent message construction to maximize shared prefixes. The savings compound with more agents.
Pattern 4: Deferred Tool Loading
The Idea: Don't load all tool schemas into the system prompt. Instead, give the model tool names and let it search for schemas on demand.
System prompt: "Available tools: slack_send, github_pr, jupyter_exec, ..."
                (names only — ~50 tokens vs ~5000 tokens for full schemas)

Model: "I need Slack. Let me search."
       → ToolSearch({ query: "select:slack_send" })
       → Returns full schema
       → Model can now call slack_send()

Takeaway: For systems with many tools (especially MCP), defer schema loading to save context space. The model is smart enough to search when it needs a tool.
Pattern 5: Permission Pipeline with Escalation
The Idea: Layer permissions from cheapest to most expensive checks:
1. Static rules (instant)     → allow/deny lists
2. Mode-based check (instant) → acceptEdits, plan, bypass
3. LLM classifier (slow)      → auto-mode AI decision
4. User prompt (blocking)      → ask the human

Each layer can short-circuit (allow or deny).
Denial tracking prevents the classifier from being too aggressive.
Circuit breakers disable problematic layers entirely.

Takeaway: Design permissions as a pipeline of escalating cost, where cheap checks happen first and expensive checks only run when cheaper ones are inconclusive.
Pattern 6: Hook-Based Extensibility
The Idea: Instead of building every feature into the core, provide lifecycle hooks that users can extend:
Core events:  SessionStart, PreToolUse, PostToolUse, Stop, ...
Hook types:   Command (shell), Prompt (LLM), Agent (full), HTTP, Function
Exit codes:   0=ok, 2=block, N=error

This enables:
  • Custom linting before file writes
  • Audit logging of all tool calls
  • Auto-formatting after edits
  • Custom approval workflows
  • Integration with external systems

Takeaway: Design your agent with lifecycle events and a hook execution engine. This turns your agent from a closed system into an extensible platform.
Pattern 7: Immutable State + Mutable Tasks
The Idea: Use deeply immutable state for UI/settings (React-friendly, predictable) but mutable state for tasks (performance-critical, frequently updated).
AppState (DeepImmutable):
  settings, UI state, messages → React can diff efficiently

Tasks (Mutable Map):
  task progress, abort controllers → Updated in hot loop
  No React re-render needed for progress ticks

Takeaway: Not everything needs to be immutable. Identify which state drives UI (make it immutable) and which state is internal bookkeeping (keep it mutable for performance).
Pattern 8: Structured Agent Communication
The Idea: Use XML-tagged structured messages for agent-to-agent communication:
<task-notification>
  <task-id>agent-xyz</task-id>
  <status>completed</status>
  <summary>Fixed the auth bug in validate.ts</summary>
  <result>Changed line 42 to handle null tokens...</result>
  <usage>
    <total_tokens>15234</total_tokens>
    <tool_uses>7</tool_uses>
    <duration_ms>23456</duration_ms>
  </usage>
</task-notification>
Takeaway: Define a structured protocol for agent communication. XML tags are model-friendly (easy to parse and generate), self-documenting, and extensible.
Pattern 9: Feature Flags with Dead Code Elimination
The Idea: Use compile-time feature flags that enable dead code elimination:
if (feature('COORDINATOR_MODE')) {
  // This entire block is removed from the binary
  // when the flag is disabled at build time
  const { runCoordinator } = require('./coordinator')
  runCoordinator()
}
Takeaway: For agent systems with many optional features, use build-time feature flags rather than runtime checks. This keeps the binary small and prevents feature interaction bugs.
Pattern 10: Scratchpad Filesystem for Agent Knowledge
The Idea: Give agents a shared filesystem area for exchanging knowledge:
~/.claude/scratchpad/
  ├─ research-findings.md    ◄── Worker A writes
  ├─ architecture-notes.md   ◄── Worker B reads
  └─ shared-context.json     ◄── All workers access

Unlike message passing:
  ✓ Persistent across agent restarts
  ✓ Random access (not sequential)
  ✓ Can store large documents
  ✓ Naturally deduplicates (overwrite)

Takeaway: For multi-agent systems, provide a shared filesystem in addition to message passing. Files are a natural, persistent, random-access knowledge store that agents already know how to use.
Pattern 11: Buddy/Companion (Engagement & Personality)
The Idea: Deterministic companion generation from user ID via seeded PRNG:
userId → hash → seeded PRNG → {
  species: "duck",     // Weighted: common 60%, rare 10%, legendary 1%
  hat: "wizard",
  eye: "✦",
  shiny: false,        // 1% chance
  stats: { DEBUGGING: 7, PATIENCE: 3, CHAOS: 9 }
}

Soul (persisted): { name: "Quackers", personality: "eager and curious" }

Takeaway: Small personality touches create emotional connection. Deterministic generation means the companion is consistent across sessions without database storage.
Summary: Architecture Principles

1
Streaming-first
Generator-based loop, never batch

2
Progressive degradation
4-tier compaction, fallback chains

3
Cache-aware design
Fork subagent, prompt caching breakpoints

4
Lazy loading
Deferred tools, dynamic imports

5
Layered security
Permission pipeline with escalation

6
Extensible platform
Hooks, skills, plugins, MCP

7
Pragmatic mutability
Immutable UI state, mutable task state

8
Structured protocols
XML notifications, typed messages

9
Feature isolation
Build-time flags, dead code elimination

10
Shared knowledge
Scratchpad filesystem, CLAUDE.md hierarchy

11
Observability
OTel spans, analytics sampling, VCR replay

12
Resilience
Circuit breakers, denial tracking, retry limits

src/main.tsx
Cold start, bootstrap, session init

src/replLauncher.tsx
React REPL bootstrapper

src/QueryEngine.ts
Per-session conversation state machine

src/query/config.ts
Per-query feature snapshot

src/query/deps.ts
Dependency injection for testing

src/query/tokenBudget.ts
Per-turn token budgeting

src/context.ts
System/user context assembly

src/utils/claudemd.ts
CLAUDE.md discovery and parsing

src/memdir/memdir.ts
Persistent memory directory system

src/history.ts
Conversation history persistence (JSONL)

src/utils/fileStateCache.ts
LRU file content cache

src/services/compact/compact.ts
Full summarization engine

src/services/compact/autoCompact.ts
Threshold logic, auto-trigger

src/services/compact/microCompact.ts
Surgical tool result clearing

src/services/compact/sessionMemoryCompact.ts
Session memory extraction

src/services/compact/apiMicrocompact.ts
Native API context management

src/tools/BashTool/
Shell command execution

src/tools/ToolSearchTool/
Deferred tool search

src/tools/SendMessageTool/
Inter-agent messaging

src/tools/TeamCreateTool/
Team management

src/services/tools/toolOrchestration.ts
Concurrent/serial tool execution

src/services/tools/StreamingToolExecutor.ts
Streaming tool pipeline

src/utils/permissions/PermissionMode.ts
Permission mode definitions

src/utils/permissions/permissions.ts
Rule matching engine

src/utils/permissions/autoModeState.ts
Auto-mode classifier state

src/utils/permissions/denialTracking.ts
Denial counting and fallback

src/utils/permissions/filesystem.ts
Dangerous file protection

src/utils/hooks/postSamplingHooks.ts
Post-sampling transformations

src/utils/hooks/sessionHooks.ts
Session lifecycle hooks

src/utils/hooks/hookHelpers.ts
Structured output enforcement

src/utils/hooks/AsyncHookRegistry.ts
Async hook tracking

src/skills/loadSkillsDir.ts
Filesystem skill loader

src/skills/bundledSkills.ts
Compiled-in skills

src/skills/mcpSkillBuilders.ts
MCP-to-skill adapter

src/plugins/builtinPlugins.ts
Built-in plugin registry

src/services/plugins/pluginLoader.ts
Plugin discovery and loading

src/services/mcp/client.ts
MCP client (connect, call, discover)

src/services/mcp/types.ts
Connection types, transport configs

src/services/mcp/auth.ts
OAuth and token management

src/services/api/claude.ts
API call construction and streaming

src/utils/stream.ts
Stream utility class

src/services/vcr.ts
HTTP stream recording/replay

src/ink/ink.tsx
Core Ink engine (60fps render loop)

src/screens/REPL.tsx
Main conversation screen

src/components/Messages.tsx
Message list container

src/components/VirtualMessageList.tsx
Windowed message rendering

src/components/PromptInput/PromptInput.tsx
Input box + footer

src/components/Markdown.tsx
Markdown + streaming renderer

src/state/AppStateStore.ts
Main state type definition

src/state/AppState.tsx
React state provider

src/coordinator/coordinatorMode.ts
Multi-worker orchestration

src/tasks/LocalAgentTask/
Background agent task

src/tasks/InProcessTeammateTask/
Team member task

src/tasks/DreamTask/
Memory consolidation task

src/bridge/replBridge.ts
Remote execution bridge

src/buddy/companion.ts
Companion sprite system

src/services/analytics/index.ts
Event logging pipeline

src/services/analytics/firstPartyEventLogger.ts
OTel-based batching

src/services/tokenEstimation.ts
Token counting strategies

Document generated from source analysis of Claude Code CLI agent.
Covers all major subsystems with architecture diagrams and design pattern analysis.
