---
id: article-2026-06-02-every-agentic-engineering-hack-i-know
type: source
title: "Every Agentic Engineering Hack I Know (June 2026)"
path: raw/articles/user-provided/2026-06-02-every-agentic-engineering-hack-i-know.md
author: "Matt Van Horn (@mvanhorn)"
publisher: "X long-form article / user-provided digest"
url:
date_published: 2026-06-02
date_added: 2026-06-03
tags: [agentic-engineering, claude-code, codex, agentic-coding, workflows, skills, voice-dictation, personal-knowledge-bases, agent-tools]
status: active
quality: medium
summary: Matt Van Horn's practitioner digest describes an agentic engineering stack built around plan-first work, voice input, parallel Claude/Codex sessions, research-before-planning, notes as agent memory, reusable skills, agent-native CLIs, and explicit caution about addictive overbuilding.
related: [claude-code, workflows, agent-skills, context-engineering, personal-knowledge-bases, voice-dictation, agent-tools]
---

# Every Agentic Engineering Hack I Know (June 2026)

## Source Metadata

- Path: raw/articles/user-provided/2026-06-02-every-agentic-engineering-hack-i-know.md
- Author: Matt Van Horn (@mvanhorn)
- Published: 2026-06-02
- Publisher: X long-form article / user-provided digest
- URL:
- Local capture: /Users/josemanuelcerqueira/.codex/attachments/de32abce-0d08-4c98-813d-4c3fb68f34ca/pasted-text.txt
- Review note: the pasted attachment is a digest of the X article, not the canonical article body. A quick web search did not recover a stable canonical URL, so the source text below preserves the user-provided digest as supplied for KB provenance.

## TL;DR

This is worth ingesting as a medium-authority practitioner field report on agentic engineering. Its strongest contribution is not any one tool recommendation, but the operating model: make a plan artifact first, research before planning, run multiple agent sessions, use voice and raw transcripts to feed context, treat the human as taste/signal rather than typist, turn repeated moves into skills, and point agents at durable notes. Treat its YOLO permission and browser-session automation advice as personal-risk posture, not general safety guidance.

## Key Claims

- Agentic engineering differs from earlier vibe coding because the workflow centers planning artifacts, agent execution, and human judgment rather than one-shot prompting.
- For non-trivial work, the first artifact should be a `plan.md` with context, approach, touched files, and acceptance criteria.
- The plan artifact can matter even when the human only skims it because it forces agents to research, commit to a path, and produce checkable criteria.
- Planning applies beyond code: strategy documents, product specs, competitive analysis, and board updates can benefit from "plan for the plan" workflows.
- Voice becomes more useful when the listener is an LLM because messy, partial speech can still be interpreted against context.
- Running multiple terminal-agent sessions in parallel changes the human role from implementer to scheduler, reviewer, and taste signal.
- Research-before-planning and raw-transcript ingestion are core context moves: gather high-entropy source material before asking the agent to structure a plan.
- Durable notes and prior plans act as the user's personal agent knowledge base when exposed through a CLI/API or local filesystem.
- Repeated agent procedures should become skills so the workflow compounds across sessions.
- Agent-native CLIs and authenticated browser-session handoff expand what agents can do in real services, but also increase credential, side-effect, and supervision risk.
- The source explicitly warns about the social/addictive downside of agentic building: producing more artifacts can become detached from users and relationships.

## Important Details

- The stack described includes Compound Engineering commands (`/ce-plan`, `/ce-work`, `/ce-brainstorm`), Claude Code, Codex, cmux, Ghostty, Orca, Monologue, Wispr Flow, Apple's dictation, last30days, Granola, HyperFrames, Proof, Bear, Obsidian, gbrain, supermemory, Mosh, tmux, Hermes, OpenClaw, Printing Press, Agent Cookie, and AgentMail.
- The strongest KB fit is the "research, plan, build" loop, especially when paired with parallel sessions and durable plan artifacts.
- The source treats Codex and Claude Code as complementary engines: one can plan while the other builds, or vice versa, depending on local taste and cost.
- The "do not read the plan" claim should be interpreted narrowly: the plan artifact can guide agents, but high-risk work still needs human review and verification.
- The permission-bypass advice is presented as the author's personal speed posture. It conflicts with stricter zero-trust guidance elsewhere in the KB and should stay framed as a tradeoff.
- The Agent Cookie / Printing Press pattern is useful because it turns human-facing web services into agent-operable tools, but it raises credential scope, audit, and irreversible-action questions.
- The article's social warning is unusually important for a productivity playbook: throughput alone can become a trap if no one wants the output or if the workflow crowds out relationships.

## Entities

- People: Matt Van Horn (@mvanhorn), Kevin Rose, Michael Margolis, Kieran Klaassen, Trevin, Adi Singh, Garry Tan, Jason Calacanis, Teknium, Nikita Bier
- Projects/tools: Claude Code, Codex, Compound Engineering plugin, last30days, Printing Press, Agent Cookie, AgentMail, cmux, Ghostty, Orca, Monologue, Wispr Flow, Granola, HyperFrames, Proof, Bear, Obsidian, gbrain, supermemory, Mosh, tmux, Hermes, OpenClaw, Catbox
- Organizations/products: Every, June, Weber Grills, Lyft, Python, Go, GStack, Paperclip, Vercel Agent Browser, OpenCV, Superpowers, Emdash, Camoufox, Tesla, Instacart, ESPN, Alaska Airlines
- Concepts: agentic engineering, plan-first workflows, voice-to-LLM, parallel terminal agents, human signal, personal RAG, reusable skills, agent-native CLIs, browser-session auth, remote agent control, AI overbuilding/addiction risk

## My Notes

- Ingested because it adds a current, concrete operator stack to the KB's existing Claude Code, workflow, skills, and personal-knowledge-base clusters.
- Best durable lesson: the workflow's real unit is not a chat message, but a sequence of artifacts and sessions: research pack, plan, work run, verification, review surface, and reusable skill.
- The note reinforces an important distinction in this repo: human value shifts toward taste, risk selection, scope control, and review when agents generate lots of candidate work.
- Do not promote the permission-bypass sections as recommended default security posture. Cross-reference with zero-trust and approval/backpressure sources when using this operationally.
- The source is less authoritative than an official doc or controlled study. It is a high-signal personal field report and a useful snapshot of June 2026 agentic engineering culture.

## Open Questions

- Which parts of this stack are durable workflow primitives, and which are transient June 2026 tool fashions?
- How much agent throughput can one human review before parallelism turns into shallow approval or uninspected side effects?
- What security model can preserve the speed of agent-native CLIs and browser-session auth without giving agents ambient account authority?
- When should plan artifacts be Markdown, HTML, Proof-style review pages, or repo-local issue/spec files?
- What metrics would show that plan-first agentic engineering improves quality rather than only increasing output volume?

## Related

- [[claude-code]]
- [[workflows]]
- [[agent-skills]]
- [[personal-knowledge-bases]]
- [[voice-dictation]]
- [[agent-tools]]

## Source Text

DIGEST — "Every Agentic Engineering Hack I Know (June 2026)"
Author: Matt Van Horn (@mvanhorn) — co-founded June ("self-driving oven," acquired by @webergrills) & the company that became @Lyft. Maintains @slashlast30days (last30days, 27K stars) and @ppressdev (Printing Press, 4K+ stars).
Source: X long-form article, posted Jun 2, 2026 (~124K views).
Cover image: Title graphic in bold white text on black: "Every Agentic Engineering Hack I Know (June 2026)."
Context / framing
Three months earlier he posted "Every Claude Code Hack I Know" (913K views). @kevinrose asked which IDE to use; his answer: "No IDE. Just plan.md files and voice." What used to be called vibe coding became real around last Thanksgiving when models got good enough — now called Agentic Engineering. He credits it for shipping last30days (27K stars), Printing Press (4K+ stars), and Agent Cookie (just launched), plus becoming a top contributor to major open-source projects (Python, Go, GStack, Paperclip).
The YOLO TL;DR Hack: paste this entire article to your agent, tell it to make a plan to set up everything in it, then work the plan one hack at a time. That's his whole stack, no reading required.
The 22 hacks
1. The moment you have an idea, make a CE plan.md. Rule #1. The instant he has an idea: /ce-plan to make a plan.md — not "let me think," not "let me code." Works on images/screenshots too. Use cases: crazy product idea → /ce-plan; GitHub bug → copy issue URL, paste, /ce-plan; terminal error → Cmd+Shift+4 to screenshot, Ctrl+V to paste, /ce-plan fix this. Drop in screenshots, error messages, design mockups, Slack threads. If the idea is fuzzy, start with /ce-brainstorm, then /ce-plan once sharp. Under the hood /ce-plan fans out parallel research agents (one reads your codebase/conventions, one searches past solutions, others research external docs), consolidates into a structured plan.md (what's wrong, approach, files to touch, acceptance criteria with checkboxes, patterns from your own code). /ce-work builds the plan; if context blows up, start a new session pointed at the plan. Traditional dev is 80% coding / 20% planning — this flips it. Built on Compound Engineering plugin from @kieranklaassen and @trevin; he's now the 3rd biggest contributor. Rule: unless it's literally a one-line change, there's always a plan.md first.

HACKS: Install: /plugin marketplace add EveryInc/compound-engineering-plugin. Paste a screenshot/bug URL/error → /ce-plan → /ce-work. Fuzzy idea? /ce-brainstorm first.

2. Don't read the plan.md. He makes the plan, almost never reads it — "plans are for agents." Forcing a plan to exist makes agents research, commit to an approach, write acceptance criteria, and hit them; a coding agent with a plan ships finished work, without one it cuts corners. He skims the title, runs /ce-work, and asks inline questions instead of reading 300 lines.

HACKS: Don't read the plan. Ask inline: TLDR?, eli5 this plan, or "wait, why this approach?"

3. Use /ce-plan for your deepest non-engineering work — make a plan for the plan. /ce-plan//ce-work aren't just for code (it has a universal planning mode built in). Works for strategy docs, product specs, competitive analysis, board updates. Real example: he met Michael Margolis (former GV research partner, bullseye-customer method), then fed Margolis's book (free PDF) + a 2-hour Granola meeting transcript into Claude Code with: "/ce-plan make a plan for the plan… Do not write that document now. Writing it is the work. Right now I only want the plan for how you'll read the book, mine the transcript, and produce a great document." It spent 45 min building an epic plan. Best trick to make an LLM not lazy: ask it to plan how it'll produce the deliverable, then execute.

HACKS: Deep non-code work: /ce-plan make a plan for the plan, hand it all your context + transcript, then /ce-work.

4. Get voice-pilled. Voice-to-LLM differs from voice-to-anything because the listener understands context and fills gaps — you can mumble, trail off, restart. Setup: Mac — Monologue (from Every) or Wispr Flow (pick one, pipe speech into the focused app); he bought a gooseneck mic for the office. Phone — skip Monologue/Wispr (iOS switching is annoying); use Apple's built-in dictation (good enough since you're talking to an LLM). Honest admission: he's great with voice alone but struggles in a shared office (doesn't want to be rude whispering) — open-office voice is his weak spot.

HACKS: Mac: install Monologue or Wispr Flow. Phone: Apple dictation. Get a gooseneck mic.

5. Lots and lots of tabs in cmux. Runs 4–6 cmux tabs (sometimes more), each a separate session: one writing a plan, one building from another plan, one running last30days, one fixing a bug. He cycles between them while research/builds run. Mentions Orca (good for mobile work) and that he left Ghostty because he lost too many notifications.

HACKS: Use cmux. Keep 4–6 tabs, a different task in each.

6. Make your terminal default into Claude or Codex, not a shell. A new tab should open straight into Claude Code — no cd, no typing claude. When a new session costs one keystroke, you start more. He doesn't use folders ("your agent can find your project").

HACK (paste to agent): "Make every new terminal tab open directly into Claude Code. In ~/.config/ghostty/config, add the line command = ~/.local/bin/claude-launcher.sh without disturbing other settings. Create ~/.local/bin/claude-launcher.sh that runs claude --dangerously-skip-permissions, and when Claude exits prints a short note and drops me into an interactive login zsh. chmod +x the script. Works for both Ghostty and cmux, since cmux reads the same Ghostty config."

7. Remote-control every window, and give Claude Code/Codex an email address. Turn on remote control automatically for every session → every window reachable from the Claude mobile app (start at desk, continue on phone mid-task). Give Claude an email via AgentMail (taught by founder Adi, @adisingh): email the inbox → a fresh session opens and works on the subject/body with attachments by path. Open-sourced at github.com/mvanhorn/agentmail-to-claude-code. Three pieces: (a) a daemon watching an AgentMail inbox over WebSocket that opens a fresh Claude session per allowlisted email; (b) two terminal backends (cmux or standalone Ghostty); (c) a sender wired to a cc command in his Hermes so from his phone he runs cc <task> → lands as a session on his Mac (no VPN/SSH). The allowlist is the gate — only his own addresses; anything failing DKIM/SPF is dropped.

HACKS: Always-on remote control: add "remoteControlAtStartup": true to ~/.claude/settings.json. Give Claude an email (paste to agent): "Give Claude Code an email address using github.com/mvanhorn/agentmail-to-claude-code. Clone it, set up an AgentMail inbox, fill cc.env with my API key, the inbox, an allowlist of only my own addresses, and my terminal (cmux or Ghostty), then run the daemon and install it as a launchd job…"

8. Dangerously skip permissions (and yes I mean it). With six sessions you can't confirm every edit/command. Key setting: skipDangerousModePermissionPrompt: true (or Shift+Tab to toggle). He says YOLO over the newer "auto" mode (auto slows him down); "It's my computer. GitHub is there if I break everything." Note: when he set up a friend's Claude Code, the AI actively tried to talk the friend out of enabling this. Also a non-negotiable sound hook so you know which of six sessions finished.

HACK — paste into ~/.claude/settings.json:

json     { "permissions": { "allow": [ "WebSearch", "WebFetch", "Bash", "Read", "Write", "Edit", "Glob", "Grep", "Task", "TodoWrite" ], "deny": [], "defaultMode": "bypassPermissions" }, "skipDangerousModePermissionPrompt": true }
json     { "hooks": { "Stop": [ { "hooks": [ { "type": "command", "command": "afplay /System/Library/Sounds/Blow.aiff" } ] } ] } }

Codex YOLO — in ~/.codex/config.toml: approval_policy = "never" and sandbox_mode = "danger-full-access"; or launch one-off with codex --yolo.

9. Run most code through Codex without ever opening the Codex CLI. Claude plans, Codex builds, he never leaves Claude. Three ways to hand work to Codex: (a) Codex IDE extension (send a task, apply the result); (b) /ce-work --codex (delegates the build from inside the CE loop); (c) Printing Press Codex mode (put codex at the end of the prompt when printing a new CLI). Settings: Codex — reasoning xhigh, fast mode on, always. Claude Code — reasoning xhigh, fast mode off (fast mode bills per token on top of the $200 Max plan). Two $200 plans side by side = a second engine; he pushes big parallel builds to Codex and keeps Claude on planning/taste (some friends run it the opposite way).

HACKS: Codex: xhigh, fast mode on. Claude Code: xhigh, fast mode off. Hand work to Codex via the IDE extension, /ce-work --codex, or codex at the end of a Printing Press prompt.

10. Research before you plan: last30days. Before /ce-plan he runs /last30days first. Example: choosing between Vercel's agent-browser vs Playwright → /last30days Vercel agent browser vs Playwright returned dozens of Reddit threads, X posts, YouTube videos, HN stories in minutes (finding agent-browser uses far less context per call). He fed that into /ce-plan integrate agent-browser. last30days is open source (26K+ stars), searches Reddit, X, YouTube, TikTok, Instagram, HN, Polymarket, GitHub, and the web in parallel. Loop: research, plan, build.

HACKS: Install last30days. Before /ce-plan, run /last30days <topic>. Install a ScrapeCreators key.

11. Granola all the things — put the RAW transcript in your LLM. After a 90-min lunch with a candidate (Granola running), he pasted the full raw transcript into Claude Code: /ce-plan turn this into a product proposal. The trick is raw — don't summarize first; drop the whole messy transcript (tangents and all) and let Claude extract against your actual codebase + prior strategy plans. It one-shotted a proposal (ignored restaurant talk); the candidate now works full-time. Upgrade since March: the Printing Press Granola CLI — pull any meeting as clean structured data into a session, search across every meeting, pipe into a plan.

HACKS: Drop the raw Granola transcript into /ce-plan, don't summarize first. Install the Printing Press Granola CLI.

12. Human signal. With six agents, your job isn't to do the work — it's to be the signal. Agents supply volume; you supply taste, direction, and the react-and-redirect loop ("option two is closer but use the language from option one," "address the biggest risk," "this paragraph is too long"). The rare valuable thing is your judgment, not your typing.

HACKS: Add value by directing your agents with your brain.

13. HyperFrames for video, for all the things. HyperFrames lets him build video as HTML so an agent can write it — loop identical to code, output is an MP4 instead of a PR. Each video is a folder with a script.md (scene by scene, kinetic typography, captions). The agent renders the composition — no editor, no timeline. Launch reels made this way: Granola CLI demo, Agent Cookie launch. He drops rendered demos into PRs (e.g., one on atlas-lean, Facebook's AI research project).

[Embedded video here] — an embedded MP4 player captioned "Agent Cookie Launch Video Made in HyperFrame" (a launch reel produced via the HyperFrames script→render workflow).
HACKS: Build video in HyperFrames: write a script.md, have your agent render to MP4. Upload GIFs to catbox — they render beautifully on GitHub (PRs, READMEs, issues).

14. Your notes are your agent's knowledge base. Plans get better because Claude has access to every prior plan (compounding context), so he pointed it at his "whole brain." Tools: Bear (with the Bear CLI — a decade of notes, "personal RAG"), Obsidian (he doesn't use it but others love it; deep plugin ecosystem), gbrain (synced brain across machines/agents), supermemory (memory layer for agents — verdict pending). Shape of the hack: pick a notes tool with a CLI or API, point your agent at it.

HACKS: Point your agent at both note-takers you write in (Bear, Obsidian) and agent brains that remember (gbrain, supermemory). Pick ones with a CLI/API.

15. Work from anywhere — my Mac mini. Tools: Mosh (when you must SSH — keeps the session responsive over bad wifi/roaming; plain SSH makes Claude Code crawl). Tmux (for airplanes — SSH into the remote machine inside tmux so work runs there; reconnect and reattach after wifi drops; he's shipped features on flights home from Europe). Hermes + OpenClaw both running for autonomous remote work (Hermes = self-learning ecosystem that improves at repeated tasks; OpenClaw = breadth of agent-built skills; if you bailed on OpenClaw early, wipe and restart). Agent Cookie to keep cookies and .env's in sync between Mac mini and primary Mac.
16. Proof: for sending a plan to a colleague. A plan.md is useless to hand to a non-terminal person. Proof (from Every) closes this gap: drop a plan.md/spec into Proof, send the link, a non-terminal human reads it cleanly and comments inline, and those comments flow back into the agent loop — no pasting markdown into Slack. He loaded this very article into Proof while writing it (that's how it got reviewed), and wrote the whole article in cmux with the Proof review open alongside.

[Embedded image — "cmux and Proof working together"]: A split-screen screenshot. Left half is a cmux terminal running Claude Code: dark terminal with Bash/python output, JSON snapshots (e.g., STALE_BASE, FIND_TARGET_NOT_FOUND errors), ref-mapping/edit operations on the article itself, a "Hullaballooing… (8m 14s • 18.3k tokens)" status line, and a footer reading "bypass permissions on (shift+tab to cycle)" with an "Auto-update failed - Run /doctor" notice. Right half is the Proof editor (proofeditor.ai) in a browser tab showing the article draft as a clean document — toolbar with "Synced," "+ Add agent," "Share," "Suggesting" toggle — displaying the section "18. Write Your Own Skills" and a "Comments (1)" panel at the bottom. Illustrates writing in cmux while reviewing in Proof simultaneously.
HACKS: Share a plan: drop the .md into Proof, send the link, pull comments back into the loop.

17. Write your own skills. The biggest level-up is teaching agents tricks that stick. Anything done more than twice → a reusable skill. You don't write from scratch — point the agent at a skill that already works and have it copy the shape: "look at the Compound Engineering skill and help me make one like this for [X]." This is most of his open-source life: last30days started as a personal skill (now 26K+ stars); Printing Press is a factory for agent-native CLIs (his most-used tool, 320+ merged PRs into it); he's a top contributor to Compound Engineering. Write the skill once; every session after is faster.

HACKS: Anything you do more than twice, make a skill: "look at the Compound Engineering skill and help me make one like this for [X]."

18. Open source: contribute to the projects you love. The same loop ships everyone else's projects. Hundreds of PRs merged into Python, Go, OpenCV, Vercel's Agent Browser, OpenClaw — real features, not typo fixes. Contributor rankings: #3 on Compound Engineering, Superpowers, and Emdash; #4 on GStack and Paperclip; #6 on Vercel's Agent Browser; #2 on Camoufox. @pejmanjohn jokes that spotting his face in contributor grids is a game of "where's Waldo." The real prize is the people — jumping into Discords, meeting maintainers, making friends (great for hiring; he hired an engineer met this way).

[Embedded image — "Contributors for Superpowers"]: A GitHub-style "Contributors 32" panel (white card, bold "Contributors" header with a "32" count pill) showing a grid of ~14 circular avatars — a mix of real headshots and cartoon/illustrated avatars (including a Garfield cartoon, a cowboy-hat photo, and a blue pixel-art logo). Illustrates the contributor list of the "Superpowers" repo where he ranks #3.
Add value on X: Pay $1–3/month to subscribe to people you respect. He pays $1/month to @garrytan — when he submits a PR he can send Garry an X post and Garry gets a special "paying customer" notification. He also pays for @jason, @teknium, @Teknium.
[Embedded image — X Subscriptions screenshot]: Matt Van Horn's (@mvanhorn) X profile on the "Subscriptions" tab, showing four accounts he's subscribed to, each with a pink "Subscribed" button: Teknium (@Teknium — "Cofounder and Lead Engineer - Hermes Agent @NousResearch, prev @StabilityAI"), Nikita Bier (@nikitabier — "head of product @x"), Garry Tan (@garrytan — "President & CEO @ycombinator"), and @jason (Jason Calacanis — "Host: @twistartups… I invest in 100 startups a year"). Illustrates the "subscribe to people you respect" tip.
HACKS: Pick a daily-use tool, find one real missing thing, ship it with /ce-plan + /ce-work. Show up in the project's Discord. Pay $1–3/mo to subscribe to people you respect on X.

19. My current laptop setup. His two-year-old laptop buckled under six Claude sessions + Codex, so he upgraded to an M5 Max with 64GB RAM — but even that gets wrecked (as little as ~1 hour on battery). He "panic-bought power": carries an Anker battery brick everywhere and keeps an Anker charger in the Tesla.

HACKS: Never sleep: sudo pmset -a disablesleep 1. Carry an Anker battery brick; keep a charger in the car.

20. Printing Press: CLIs that run real life. The one hack that leaves the terminal. Printing Press is a fleet of CLIs wrapping real-world services so an agent can run errands (own project, 3.7K+ stars, built with @trevin). The piece that makes it work is auth, shipped "last night": Agent Cookie — hands a CLI your real browser session so it acts as you (no passwords, no re-auth), turning "an agent that knows about a service" into "an agent that's logged into it." A real afternoon: Tesla preheat ("preheat the car to 72" → Tesla CLI warms the car); Instacart ("add Corona to Costco on Instacart"); ESPN polling (a session watched a game and pinged only when it got close); Alaska Airlines (pulled fares/shoulder dates, checked Atmos balance, fed into /ce-plan for a booking strategy — all from a soccer field).

HACKS: Install a ready-made CLI from printingpress.dev. Auth without pain via Agent Cookie. The real hack: print your own CLI for a service you live in.

21. The honest part: AI psychosis. Agents were supposed to do the work, but every friend is working harder than ever — this is about addiction: "Building with agents is the greatest video game ever made." He worries about friends so lit up by being able to build anything that they do nothing else, then launch to no users. The empty launch is fine; the trap is vanishing into the build and losing the people around you. Be careful, talk to loved ones, ask if anyone actually wants what you're making (a tool just for you is okay). If you want an audience, it's the Gary Vaynerchuk path — start posting into the ether, build from one person to thousands; nobody starts at thousands.

HACKS: Take breaks. Touch grass. Talk to your loved ones. Build something people want, even if "people" is just you.

22. This article was written this way. A markdown file, Claude Code in cmux, talking into Monologue ("evolve the no-IDE opener," "make the don't-read-the-plan section spicier," "add the Tesla and Instacart story") — it rewrites, he reacts, reviewed in Proof, with last30days feeding fresh material. No Zed this time (he stopped using it). No IDE, no typing code — talk, plan, build, from a desk, couch, car, or soccer field.

HACKS: Copy the whole article, paste into your agent, and tell it to set up everything it can.

Quick reference — tools & links mentioned
Compound Engineering plugin (EveryInc/compound-engineering-plugin, commands /ce-plan, /ce-work, /ce-brainstorm, --codex); last30days (@slashlast30days, needs a ScrapeCreators key); Printing Press (printingpress.dev, @ppressdev) + Granola CLI + Codex mode; Agent Cookie; AgentMail + github.com/mvanhorn/agentmail-to-claude-code; cmux; Ghostty; Orca; Monologue (Every) / Wispr Flow / Apple dictation; Codex (CLI, IDE extension, --yolo); HyperFrames; catbox (GIF hosting); Bear + Bear CLI, Obsidian, gbrain, supermemory; Mosh, tmux; Hermes, OpenClaw; Proof (proofeditor.ai, from Every); Granola.
