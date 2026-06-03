---
id: 2026-06-03-claude-use-cases-full-digest
type: source
title: "Claude Use Cases — Full Digest (94)"
path: raw/articles/user-provided/2026-06-03-claude-use-cases-full-digest.md
author: Anthropic
publisher: Claude
url: file:///Users/josemanuelcerqueira/Downloads/claude-use-cases-full-digest.html
date_published:
date_added: 2026-06-03
tags: [claude, use-cases, workflows, computer-use, web-agents, skills, projects, enterprise-ai]
status: active
quality: medium
summary: "Local HTML digest of 94 Anthropic Claude use cases across Cowork, Chrome, Office/file creation, domain workflows, Projects, Skills, Memory, connectors, web search, research, and computer-control surfaces."
related: [workflows, agent-tools, agent-skills, computer-use, web-agents, enterprise-agent-deployment-failure-modes]
superseded_by:
---

# Claude Use Cases — Full Digest (94)

## Source Metadata

- Path: raw/articles/user-provided/2026-06-03-claude-use-cases-full-digest.md
- Local source: file:///Users/josemanuelcerqueira/Downloads/claude-use-cases-full-digest.html
- Author: Anthropic
- Publisher: Claude
- Published: Unknown
- Captured in HTML: 2026-06-03
- Date added: 2026-06-03
- Source type: Local HTML digest of Claude resource pages
- Cases captured: 94

## TL;DR

Anthropic’s use-case digest frames Claude less as a generic chatbot and more as a workflow surface spanning folder-scale Cowork jobs, browser actions through Claude in Chrome, computer control through Dispatch, document and spreadsheet generation, project memory, custom skills, connectors, web search, and domain-specific operating templates. Its durable KB value is not any single prompt but the pattern: successful Claude use cases package task boundaries, required context, output artifacts, follow-up actions, and troubleshooting into repeatable work units.

## Key Claims

- Claude use cases are increasingly described as end-to-end workflows with context requirements, output artifacts, follow-up actions, and operational tips rather than one-off chat prompts.
- Cowork and Dispatch shift Claude toward asynchronous, folder-scale, and remote computer-control work where the product surface owns long-running context and task execution.
- Claude in Chrome positions the browser as an action environment for CRM logging, product comparison, calendar prep, email cleanup, dashboard metric extraction, and Google Drive organization.
- Skills, Projects, Memory, connectors, web search, Research, and file generation appear as recurring scaffolds that make workflows reusable and context-rich.
- The highest-value examples combine model judgment with structured inputs and concrete artifacts: memos, decks, spreadsheets, trackers, policies, reports, forms, flowcharts, battle cards, and course materials.
- The digest implicitly argues that adoption depends on packaging AI around recognizable jobs-to-be-done for finance, education, nonprofits, legal, research, sales, marketing, life sciences, HR, professional, and personal workflows.

## Important Details

- Category counts: Cowork (6); Finance (8); Education (11); Nonprofits (12); Professional (17); Personal (16); Legal (4); Research (4); Sales (4); Marketing (3); Life Sciences (2); HR (1); Claude in Chrome (6).
- Model labels in the digest: Sonnet 4.5 (52); Sonnet 4.6 (17); Opus 4.5 (11); Haiku 4.5 (6); Opus 4.6 (5); Opus 4.7 (2); Sonnnet 4.5 (1).
- The HTML states it is a lossless capture of all 94 use cases from `claude.com/resources/use-cases`, including detail pages with task descriptions, example prompts, sample outputs, follow-ups, and tips.
- Many examples separate required context from optional context, making the use cases useful as workflow-design templates for agent systems.
- Several workflows end by routing outputs into downstream tools or repeatable routines: Asana, Linear, Slack, Google Drive, CRM systems, calendars, analytics dashboards, scheduled tasks, and reusable skills.

## Entities

- Companies: Anthropic, Claude
- Products and surfaces: Claude, Claude Cowork, Claude in Chrome, Dispatch, Projects, Memory, Skills, Research, Web Search, Extended Thinking, connectors, Google Drive, Asana, Linear, Slack, CRM tools, Excel, PowerPoint, Google Docs
- Models mentioned: Opus 4.7, Sonnet 4.6, Opus 4.6, Opus 4.5, Sonnet 4.5, Sonnnet 4.5, Haiku 4.5
- Domains: finance, education, nonprofits, legal, research, sales, marketing, life sciences, HR, professional productivity, personal productivity
- Concepts: workflows, computer-use agents, web agents, agent tools, agent skills, project memory, connectors, file generation, domain-specific AI adoption

## My Notes

- Strong source for [[workflows]] because each use case is a miniature workflow specification: task, context, created artifact, follow-up prompts, and operating tips.
- Strong source for [[agent-tools]], [[computer-use]], and [[web-agents]] because it shows Anthropic packaging tool use around ordinary work surfaces: folders, browsers, SaaS apps, documents, spreadsheets, and remote desktops.
- Useful for [[agent-skills]] because several cases explicitly convert repeated procedures into skills, project instructions, or scheduled Cowork tasks.
- Useful for [[enterprise-agent-deployment-failure-modes]] because it shows what enterprise-friendly packaging looks like: explicit context, bounded outputs, integrations, confidence labeling, handoffs, and repeatability.
- This is a product/use-case corpus rather than independent evidence of performance. Treat it as evidence of Anthropic’s packaging strategy and intended workflows, not proof that every workflow works reliably in production.

## Open Questions

- Which of these use cases have independent production evidence beyond Anthropic’s marketing-resource pages?
- Which product surfaces are doing the real work in each case: model capability, tool access, persistent project context, file generation, browser/computer control, or workflow packaging?
- Which use cases should become benchmark/eval templates because their outputs are concrete enough to verify?
- How should enterprise teams govern scheduled Cowork tasks and browser/computer-control actions when they touch live accounts?

## Related

- [[workflows]]
- [[agent-tools]]
- [[agent-skills]]
- [[computer-use]]
- [[web-agents]]
- [[enterprise-agent-deployment-failure-modes]]

## Source Text

> Rendered text extracted from the local HTML digest. The local HTML source remains identified in Source Metadata; this section preserves the digest content in readable markdown form for KB search and Obsidian navigation.

### Cowork (6)

#### Audit a folder of visual assets against your guidelines

- Author: Anthropic
- Category: Cowork
- Model: Opus 4.7
- Source URL: https://claude.com/resources/use-cases/audit-a-folder-of-visual-assets-against-your-guidelines

##### Describe the task

With Claude Opus 4.7, any folder of images can be checked against a written set of rules — brand guidelines for marketing assets, accessibility rules for UI screenshots, a style guide for a batch of design exports.

Opus 4.7 reads images at higher resolution than prior Claude models, so the small details that decide a match — a hex value, a logo version, a line of legal text — come through clearly. It can hold the rules document and the images together and check one against the other across the whole folder.

Here, a folder of live marketing assets gets checked against a brand-guidelines PDF and a legal-compliance sheet.

Audit every PNG and JPG in this folder against brand-meridian-2025-q2.pdf and legal-required-copy.txt.

Flag:

the old 2024 logo

off-brand hex codes (#0052B3 instead of #004B9F, #D4AF37 instead of #C9A961)

missing or undersized legal copy

Group by violation type. For each one give me filename, issue, guideline value, asset value, and confidence. End with how many assets passed all checks.

##### Give Claude context

In Claude Cowork, point your project at the folder that holds the brand-guidelines PDF, the legal sheet, and the asset exports.

Make sure Opus 4.7 is selected in the model picker. Opus 4.7 has improved vision which helps while reading small text in the guide and matching it against the same detail across hundreds of images.

Required context

A Claude Cowork project pointed at the folder holding the brand-guidelines PDF, legal sheet, and asset exports (PNG/JPEG)

Optional context

Asana or Linear — file each high-confidence violation as a task.

Slack connector — post a summary to a channel.

A note in the project instructions ranking which rules are mandatory (legal copy) versus tolerable (a hex within a few points), so Claude weights them.

##### What Claude creates

Claude reads the guide and the legal sheet, then checks every asset in the folder against them. You get a grouped violation list (filename, issue, guideline vs asset value, confidence per item), a compliant count, and a short "less certain" block for the items worth opening yourself.

From Claude:

> Audited 200 PNG/JPG files against brand-meridian-2025-q2.pdf and legal-required-copy.txt.
> Logo & lockup — 3 violations
> q1-social-tile-14.png · 2024 logo still in use · high
> partner-onepager-emea.pdf · clear space 8px (min is 20px) · high
> product-hero.png · tagline reads "Better Decisions" (approved: "Always On") · high
> Color — 2 violations
> email-header-march.png · banner is #0052B3 (guide: #004B9F) · high
> social-tile-feb.png · gold reads close to #D4AF37 (guide: #C9A961) · medium — estimated from tone, not a printed hex
> Typography — 2 violations
> case-study-onepager.pdf · body is Helvetica (guide: Manrope) · high
> q2-email-template.html · H1 at 16pt (guide: 18pt+) · high
> Required legal copy — 3 violations
> partner-onepager-emea.pdf · footer at 7pt (min 8pt) · high
> event-banner-sf.png · "© 2024" (should be 2025) · high
> webinar-promo-9.png · footer missing · high
> Unapproved claims — 1 violation
> product-comparison.png · "3× faster" not in approved-claims list · high
> Compliant: 189 assets pass all checks.
> Less certain: the gold on social-tile-feb.png may be a JPG compression shift rather than the old hex; partner-deck-asia.pptx uses a green not in the guide, possibly an approved regional variant.
> Want me to file the 10 high-confidence items as Asana tasks, or save the full report to the folder?

##### Follow-up prompts

Check the live pages where these assets appear

The exports are one step removed from what customers see. With Claude in Chrome, Claude can open the live pages and run the same checks against what's rendering there — catching cases where the file was fixed but the page still shows the old version.

For each high-confidence violation, open the live page listed in asset-urls.csv in Chrome and tell me whether the published version has the same issue or has already been corrected.

File each high-confidence violation as a task

With Asana or Linear connected, Claude turns each finding into a task with the filename, the rule, and the fix, so the audit ends in your tracker instead of a chat.

Create an Asana task in the Brand Compliance project for every high-confidence violation, assigned to the asset owner, with the filename, the guideline, and the corrected value in the description.

Save the audit as a skill and put it on a schedule

When the rules and grouping are right, save them as a skill so the check is one line. Then set that skill as a scheduled task in Claude Cowork — every Friday, Claude runs the same audit on whatever is new in the folder and posts the result to Slack, with the rules already written down.

Save this as a skill called brand-compliance-audit, then schedule it to run every Friday at 2pm and post the summary to #brand-ops.

##### Tricks, tips, and troubleshooting

Name the deliverable and the grouping in your prompt

Tell Claude how to group the findings (Logo, Color, Legal, Claims) and what to return per item (filename, issue, guideline value, asset value, confidence). Opus 4.7 follows a format instruction like that closely, so you get a structured list you can act on rather than prose.

Opus 4.7 reads images with more precision; Claude Cowork is what lets it work through the whole folder

The high-resolution reading is a property of the model. Claude Cowork is what gives the model the entire folder — assets and reference documents together — and the working context to process all 200 in one task. You'd get the same reading quality on a handful of uploads in a claude.ai chat with Opus 4.7 selected; Claude Cowork is what makes it practical at folder scale and lets you schedule it.

Tell Claude which rules are mandatory and which are tolerable

If legal copy is non-negotiable but a hex within a few points is acceptable, say so in the prompt or the project instructions. Opus 4.7 will weight legal violations as high priority and near-miss colors as lower, and your output will already be sorted the way you'd triage it.

Ready to try for yourself?

Audit at the scale and pace your team can act on: high-confidence violations go to Asana, the items worth a second look stay in the folder, and the summary lands in Slack — from one prompt in Claude Cowork.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Adapt a standard textbook page to every reading level

- Author: Anthropic
- Category: Cowork
- Model: Opus 4.7
- Source URL: https://claude.com/resources/use-cases/adapt-a-standard-textbook-page-to-every-reading-level

##### Describe the task

Opus 4.7 reads a photographed or scanned page closely enough to pick up the small text, diagram labels, and captions, and produces several versions of the materials the way you describe. That applies whether it's a lesson at three reading levels, a training doc for different experience levels, onboarding guides for different roles, or customer docs for different audiences. And Opus 4.7 is stronger at producing and reviewing its own document and slide output, so the files come back more complete and correct on the first pass.

Here, a single textbook spread on plate tectonics becomes a slide deck and three reading handouts for one class period.

I've attached:

tectonics-textbook-p214-215.jpg (the source spread, including the diagram and sidebar)

state-standards-ess2.txt (the standards these need to map to)

my-class-roster-levels.csv (which students are at which reading level — A below grade, B at grade, C above)

From the textbook spread, build me:

One slide deck (8–10 slides) covering the core ideas, with the diagram redrawn simply on its own slide

Three versions of a one-page reading handout — Level A, B, C — same concepts, different vocabulary and sentence length

A short exit-ticket worksheet (3 questions) that checks the standard, same questions for everyone

Keep every version on the same concepts and the same standard. List the vocabulary you simplified for Level A.

##### Give Claude context

Attach the page as a photo or scan, the standards or learning objectives it needs to map to, and your rules for each version. Opus 4.7 reads the small text and diagram labels reliably at this resolution, so the full spread works without cropping to the section you want.

Make sure the model picket is set to Opus 4.7. With file creation, the deck and handouts come back as real .pptx and .docx files.

Required context

The page as a photo, scan, or PDF

The standards or learning objectives the materials should map to

In the prompt, your rules for each version: how many, what changes, what stays the same

Optional context

A class roster with reading-level groupings, so the handouts can be labeled by group

A claude.ai Project with your standards and version rules in project instructions, so they carry to every lesson

An example of a past handout in your preferred format

##### What Claude creates

Claude reads the page, including the diagram and any sidebar text, and builds the materials the way you described. You get a slide deck, the three reading handouts as separate .docx files, and the exit ticket — each mapped to the standard you named. A short note lists what vocabulary was simplified at each level and anything from the page that didn't fit.

From Claude:

> Built from tectonics-textbook-p214-215.jpg, mapped to ESS2-1 and ESS2-2.
> Attached: tectonics-slides.pptx (9 slides) · tectonics-reading-A.docx · tectonics-reading-B.docx · tectonics-reading-C.docx · tectonics-exit-ticket.docx
> All three handouts cover: plate boundaries (convergent, divergent, transform), what drives plate motion, two surface results (mountains, trenches). Level C adds the mantle-convection sidebar; A and B leave it out.
> Vocabulary simplified for Level A: lithosphere → "Earth's outer shell" · asthenosphere → "the softer layer below" · subduction → "one plate slides under another." Sentence length kept under 15 words.
> Left out of all versions: the textbook's "Careers in Geology" box (not part of the standard you named).
> The diagram on slide 4 is a simplified redraw — three boundary types, labeled, no extra annotation. The original's small inset map didn't reproduce clearly enough to include.

##### Follow-up prompts

Add additional versions for more learners

The rules for each version are already stated, so adding a fourth is one line. Opus 4.7 keeps to your earlier rules while adding the new version.

Add a Level A-EL version: same as Level A, with a glossary box of the five key terms in both English and Spanish, and one labeled-diagram question instead of question 3.

Rebuild the deck with a different emphasis

When the slides need to lead with a different idea, ask for the reorder. The file output stays complete on the rebuild.

Rebuild the slide deck so it opens with the surface results (mountains, trenches, earthquakes) and gets to boundary types second. Keep it to 9 slides.

Set it up to repeat in Cowork

In claude.ai chat, you upload the page and restate your rules in each new conversation. In a Cowork project, Claude reads from a folder on your computer and the rules sit in project instructions. Point the project at the unit's folder, write the standards and version rules into project instructions once, and every page in that folder is one short prompt away from the full set of files.

Build the deck, three reading handouts, and exit ticket for tectonics-textbook-p218-219.jpg. Use the standards and version rules in project instructions.

##### Tricks, tips, and troubleshooting

Match the model to the work

Opus models are built for tasks that need close reading and a finished file at the end, like this one. Sonnet models are the everyday choice for drafting, planning, and back-and-forth on a lesson idea. Haiku models are the quick option for a fast answer or a simple rewrite. Here, the input is a dense page image and the output is a set of documents, so Opus 4.7 is the fit.

For more than one lesson, point a Cowork project at the folder

In claude.ai you attach one page at a time. In Claude Cowork, a project can read a whole folder on your computer. Put your standards and version rules in project instructions, drop each unit's source pages into the folder, and the same prompt produces the deck and handouts for every page.

Ask Claude to list its changes alongside the output

Whenever Claude is rewriting, simplifying, or adapting something you gave it, add a line to the prompt asking for a list of what it changed and what it left out. That list is what you review. You check the decisions Claude made rather than comparing every output to the original yourself.

Ready to try for yourself?

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Remote control your computer with Dispatch

- Author: Anthropic
- Category: Cowork
- Model: Sonnet 4.6
- Source URL: https://claude.com/resources/use-cases/remote-control-your-computer-with-dispatch

##### Describe the task

Dispatch turns your phone into a remote control for Claude on your computer. You send a message from the Claude mobile app, and Claude runs the task on your machine — reading local files, pulling data through connectors, searching the web, and compiling results. When you get back to your desk, the work is done and waiting.

The key requirement: your computer needs to be awake and running the Claude desktop app. The keep-awake toggle in Dispatch settings prevents your computer from sleeping while you are away. Turn that on before you leave.

Dispatch works best when you give Claude a prompt with complete instruction upfront — what to read, where to look, and what format you want back. On your computer, Claude can read files, pull from Google Drive, check Gmail, and search the web. This can all occur locally until you ask Claude to send them.

Here, one message from your phone turns a local spreadsheet and a set of web searches into a finished competitive landscape report, saved to Google Drive before you sit down.

I need a competitive landscape summary for our Q2 planning meeting. Start with the spreadsheet at in my Sales folder - I think it’s called competitor-tracker.xlsx — that has our current list of competitors and their pricing.

For each competitor listed there, search the web for any product launches, pricing changes, or funding announcements from the last 90 days.

Put together a report with one section per competitor: what they have changed since our last update, how their pricing compares to the figures in the spreadsheet, and anything we should flag for the planning meeting. Save the report as a Google Doc in my Strategy folder on Drive.

##### Give Claude context

Claude reads the local spreadsheet on your computer and uses web search to gather recent competitor information. The Google Drive connector saves the finished report directly to your Drive.

Required context

These connectors give Claude the access needed to complete the task:

Google Drive — to save the finished report as a Google Doc in your Strategy folder.

Local files — to read the competitor tracking spreadsheet from your Documents folder.

Google Drive

Optional context

These connectors are not required but can add useful context:

Gmail — Claude can check recent emails for competitor mentions or forwarded articles your team has shared.

Google Calendar — Claude can confirm the date of the Q2 planning meeting and note the deadline in the report.

##### What Claude creates

Claude reads the spreadsheet, searches for recent news on each competitor, and produces a structured report. Here is an example of what Claude sends back to your phone when the work is finished:

From Claude:

> I read competitor-tracker.xlsx and found 6 competitors listed. I searched for recent activity on each one. Here is a summary — the full report is saved as Q2 Competitive Landscape in your Strategy folder on Google Drive.
> Competitor A — Prismatic
> Raised a $40M Series C on February 12, 2026. Their blog post mentions expanding into enterprise integrations.
> Pricing unchanged from the spreadsheet ($49/seat/mo for Pro). No public changes since January.
> Flag: The new funding and enterprise push puts them closer to our mid-market segment.
> Competitor B — Conduit Labs
> Launched a new API management tier on March 3, 2026.
> Pricing increased: the Growth plan moved from $29/seat/mo to $39/seat/mo. The spreadsheet still shows the old price.
> Flag: Their price increase narrows the gap with our Standard plan ($45/seat/mo). Could be a positioning advantage for us.
> Competitor C — Stackline
> No major announcements in the last 90 days. Last press mention was a December 2025 partnership with Datadog.
> Pricing matches the spreadsheet ($99/seat/mo Enterprise only).
> Flag: None. Stable quarter.
> Competitors D–F: Runo, Pipeshift, and Arcway had no pricing changes or notable announcements. Full details are in the Google Doc.
> The report includes a comparison table with current pricing for all 6 competitors alongside our plans. Let me know if you want me to add anything before the planning meeting.

##### Follow-up prompts

Make this a recurring Monday report

Any Dispatch task can become a scheduled task that runs on a cadence. Instead of remembering to send this prompt each week, set it once and Claude runs it automatically.

/Schedule Run this every Monday morning so the report is ready when I sit down.

Review the report at your desk

After Dispatch finishes a task on your computer, you can pick up the work on your laptop. The report is already saved — now open it on your desktop to review, edit, and finalize.

I'm back at my desk now. Open the report so I can review and edit it.

Share key findings on Slack

Claude can route output to connected tools like Slack, Gmail, or Google Drive. Once the report is done, send the highlights to your team without copying and pasting.

Post a summary of the key findings to #strategy on Slack.

##### Tricks, tips, and troubleshooting

Turn on keep-awake before stepping away

The keep-awake toggle in Dispatch settings prevents your computer from sleeping so Claude can finish tasks while you are gone. It does not keep the screen on — just the machine. Turn it on before you leave your desk.

Set connector permissions deliberately

For connectors like Slack and Gmail, set read access to always-allow and send access to needs-approval. This lets Claude gather information freely but check with you before posting or emailing on your behalf.

Include the file path when you know it

Claude can search for files by name, but including the path (like ~/Documents/Sales/competitor-tracker.xlsx) saves time and avoids ambiguity when multiple files have similar names.

Scheduled tasks keep your reports fresh

Once you have a prompt that works, save it as a scheduled task to run weekly or monthly. Claude runs the same instructions on the latest data, so the report stays current without you re-typing the request.

Ready to try for yourself?

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Kick off long-running computer tasks from the Claude mobile app

- Author: Anthropic
- Category: Cowork
- Model: Sonnet 4.6
- Source URL: https://claude.com/resources/use-cases/kick-off-long-running-computer-tasks-from-the-claude-mobile-app

##### Describe the task

Some tasks take time. Processing a folder of invoices, cleaning a large dataset, reorganizing hundreds of files — these jobs can run for minutes after you start them. You do not need to sit and watch.

Dispatch keeps one persistent conversation between your phone and your computer. When you send Claude a task from your desk and walk away, Claude keeps working. Later, from your phone, you can ask Claude what happened, review the results, and send the next instruction. Claude remembers every previous message and every file it touched in the conversation.

The key detail: your computer must stay awake while Claude works. Turn on the keep-awake toggle in Dispatch settings before you leave your desk.

This starts with a batch job — extracting invoice data from a folder of PDFs into a spreadsheet. After walking away, you check in from your phone and start the next step.

Go through every PDF in ~/Documents/Invoices/March-2026 and pull out the vendor name, invoice number, date, and total amount. Put all of it into a spreadsheet called march-invoices.csv in the same folder. Let me know when you're done.

##### Give Claude context

Claude needs access to the folder where the invoices are stored. Grant folder access during Dispatch setup on your computer. No connectors are required for this use case — Claude works directly with files on your machine.

Required context

No connectors are required. Claude reads the PDF files and creates the CSV directly on your computer.

Optional context

If you want Claude to email the finished spreadsheet or post a summary to Slack, enable the Gmail or Slack connector. Otherwise, the file stays on your computer and you can grab it when you get back.

##### What Claude creates

You sent the first message from your desk and walked to a meeting. Twenty minutes later, you open the Claude app on your phone and check in.

From Claude:

> Done. I processed 47 PDF invoices from ~/Documents/Invoices/March-2026.
> Here is a summary:
> Total invoices processed: 47
> Unique vendors: 18
> Date range: March 1 – March 28, 2026
> Grand total across all invoices: $34,219.57
> Largest invoice: $8,400.00 from Redwood Design Co (invoice #RDC-2026-0342) The spreadsheet is saved at ~/Documents/Invoices/March-2026/march-invoices.csv. Each row has four columns: Vendor Name, Invoice Number, Date, and Total Amount.
> Three invoices had formatting I want to flag:
> scan_031.pdf — the total was handwritten and hard to read. I recorded $215.00 but you may want to double-check.
> consolidated_march.pdf — this file contained two separate invoices. I split them into two rows.
> draft_invoice.pdf — marked as DRAFT. I included it but added a note in a fifth column.

##### Follow-up prompts

Build on the data Claude already has

Dispatch keeps a persistent conversation. Claude already processed the invoices and has every vendor, amount, and date in memory. Your next question can reference that data directly — no need to re-describe the file.

Now compare the totals by vendor against the Q1 budget forecast and flag anything over 15%.

Create a summary file from the results

Claude can create new files on your computer from the data it has already processed. Ask for a formatted report and tell Claude where to save it.

Create a summary PDF with the top 10 vendors by spend and save it to my Finance folder.

Run this batch job every month

A Dispatch prompt can become a scheduled task that runs on a recurring cadence. Set it once and Claude processes the new invoices automatically each month.

Set this up to run on the first of every month with the new invoices folder.

##### Tricks, tips, and troubleshooting

Turn on keep-awake before starting a long task

Batch processing can take minutes. The keep-awake toggle prevents your computer from sleeping while Claude works through the files. It does not keep the screen on — just the machine.

Dispatch remembers what it did

Claude keeps full context of every file it processed and every result it produced. When you check in later, Claude can answer follow-up questions, compare data, or build on its earlier work without starting over.

Describe the file location clearly

Include the full path when you know it (like ~/Documents/Invoices/March-2026). If you are not sure of the exact path, describe the folder name and location — Claude searches the folders you granted access to.

Scheduled tasks turn one-off jobs into routines

Once a batch prompt works, save it as a scheduled task. Claude runs the same instructions on the cadence you set, processing new files each time without you sending the prompt again.

Ready to try for yourself?

Get started with Dispatch: download the Claude desktop app and the Claude mobile app, open Cowork, and tap Dispatch in the sidebar.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Handle a request while away from your keyboard

- Author: Anthropic
- Category: Cowork
- Model: Sonnet 4.6
- Source URL: https://claude.com/resources/use-cases/handle-a-request-while-away-from-your-keyboard

##### Describe the task

Work does not pause when you step away from your computer. A teammate asks for a file. A client sends a question that requires information from a document on your computer. A deadline moves up. Dispatch lets you respond using everything on your computer, from your phone.

This works when your computer is awake and the Claude desktop app is running. The keep-awake toggle in Dispatch settings prevents your computer from sleeping when you step out. Turn it on once and your computer stays reachable whether you are in a car, at a coffee shop, on a plane with wifi, or simply across the office without your laptop.

Dispatch is also useful when your computer is nearby but your phone is more practical. In tight spaces, on a call, or when opening a laptop would be awkward, you can send a quick instruction from your phone and Claude handles the rest on your computer.

A teammate asks for a budget spreadsheet over Slack. From your phone, you tell Claude where the file is and where to send it — Claude finds it and posts it with your note.

Jamie just asked me on Slack for the latest Q2 budget spreadsheet. Find it in my Documents/Finance folder on my computer — the file with “Q2” and “budget” in the name. Post it to Jamie in the #proj-planning Slack channel. Add a note that the tab labeled “Revised” has the current numbers.

##### Give Claude context

Claude reads the file from your computer and posts it through the Slack connector. No file uploads, no cloud sync — Claude reads the document in place on your machine and sends it through the connected tool.

Required context

For this task, Claude needs access to your local files and one connector:

Local files — to find and read the spreadsheet in your Documents/Finance folder.

Slack — to post the file and your note to the #proj-planning channel.

Slack

Optional context

No additional connectors are needed for a file-and-send task. If the request involves drafting a reply or forwarding a document, connecting Gmail lets Claude draft and send email on your behalf (with your approval before sending).

##### What Claude creates

Claude locates the file, prepares the message, and — if you have Slack set to needs-approval for sending — shows you the message before posting. Here is what the exchange looks like on your phone:

From Claude:

> I found Q2-Budget-Revised-v3.xlsx in Documents/Finance.
> Before I post, here is the message I will send to #proj-planning:
> Hi Jamie — here is the Q2 budget spreadsheet you asked for. The tab labeled “Revised” has the latest numbers.
> [Attached: Q2-Budget-Revised-v3.xlsx]
> Should I go ahead and post this?

##### Follow-up prompts

Draft a reply with approval before sending

Claude can draft messages using files on your computer, then wait for your approval before sending. This keeps you in control of what goes out while Claude does the research and writing.

Draft a reply to the client email about pricing. Use the proposal in my Documents folder for the numbers, but don't send until I approve.

Pick up the thread on your laptop

When you get back to your desk, continue in the same Dispatch conversation. Claude remembers everything it did while you were away — what it found, what it sent, and any requests that came in.

I'm back at my desk. Show me what you sent and any other requests that came in while I was out.

Use computer use to reach a desktop app

Computer use lets Claude operate desktop applications that have no connector and no web version. If the information you need lives in a native desktop app, Claude can open it and pull what you need.

There's a report I need from the analytics dashboard app on my computer. Open it and screenshot the Q1 summary.

##### Tricks, tips, and troubleshooting

Set send permissions to needs-approval

For connectors like Slack and Gmail, set send access to needs-approval. Claude drafts the message and shows it to you before posting or emailing — so nothing goes out without your sign-off.

Turn on keep-awake before stepping away

The keep-awake toggle prevents your computer from sleeping while you are out. Turn it on before you leave so Claude can respond to requests on your machine at any time.

Files stay local when Claude reads them

Claude reads documents in place on your computer. When it posts a file to Slack or references data in an email, the source document stays on your machine — nothing gets uploaded to a cloud service.

Computer use is a separate toggle

Computer use is off by default and must be enabled in Dispatch settings. Claude asks for your approval before controlling each new application.

Ready to try for yourself?

Get started with Dispatch: download the Claude desktop app and the Claude mobile app, open Claude Cowork, and tap Dispatch in the sidebar

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Operate any computer app from your phone with Dispatch

- Author: Anthropic
- Category: Cowork
- Model: Sonnet 4.6
- Source URL: https://claude.com/resources/use-cases/operate-any-computer-app-from-your-phone-with-dispatch

##### Describe the task

Dispatch connects Claude to your tools through three methods, each with different speed. Connectors give Claude direct access in seconds. The Chrome extension lets Claude read and interact with web applications. Computer use lets Claude operate your mouse and keyboard to control any desktop application on your computer.

Most Dispatch tasks run through connectors or the Chrome extension. But some applications have no connector and no web version. A desktop accounting program, an installed inventory system, a locally-run reporting tool — these applications only exist on your computer's screen. Computer use reaches them.

Computer use is off by default. You turn it on in Dispatch settings, and Claude asks for your approval before controlling each application. Claude sees your screen, moves the cursor, clicks buttons, and types — the same way you would, but slower than a connector. Use computer use when no faster method exists.

In this example, Claude opens an accounting application on your computer, navigates to overdue invoices, and pulls the data — all from a single message on your phone.

Open my accounting app and pull the outstanding invoices report for March. List every invoice over 60 days past due with the client name, invoice number, and amount. Send me the totals by client.

##### Give Claude context

Computer use does not need a connector — Claude operates the application through your computer's screen. Before sending this request, confirm two things: the desktop accounting application is open (or pinned to your taskbar/Dock), and computer use is enabled in your desktop app settings.

Required context

No connectors are required. Claude uses computer use to operate the desktop application directly. You need to enable the computer use toggle in Dispatch settings before sending your request. Claude will ask for permission to control the accounting application the first time it interacts with that app in a session.

Optional context

If you want Claude to send the results somewhere beyond your Dispatch conversation — for example, emailing the overdue list to your collections team — connect Gmail or Slack so Claude can deliver the information without a separate step.

##### What Claude creates

Claude opens the accounting application, navigates to the reports section, runs the outstanding invoices report for March, and reads the results from the screen. Here is an example of what Claude sends back to your phone.

From Claude:

> I opened your accounting app and pulled the outstanding invoices report for March. Here are all invoices more than 60 days past due:
> Overdue invoices — 60+ days
> Meridian Construction INV-2024-0892 — $14,250.00 (78 days) INV-2024-0915 — $8,400.00 (72 days) Subtotal: $22,650.00
> Lakeview Property Group INV-2024-0901 — $31,500.00 (75 days) Subtotal: $31,500.00
> Barnett & Associates INV-2024-0878 — $5,200.00 (84 days) INV-2024-0886 — $5,200.00 (80 days) INV-2024-0934 — $3,100.00 (66 days) Subtotal: $13,500.00 Total outstanding (60+ days): $67,650.00 across 6 invoices from 3 clients.
> Barnett & Associates has the most overdue invoices (3), but Lakeview Property Group has the largest single balance. Want me to draft a follow-up email to any of these clients?

##### Follow-up prompts

Check a web portal in Chrome

Claude in Chrome handles web applications, while computer use handles desktop apps. You can combine both in one conversation — desktop app for the accounting data, browser for vendor portals.

Now open Chrome and check our vendor portal for the latest invoice status.

Review the report at your desk

After Dispatch pulls data on your computer, you can continue the work on your laptop. Open the results Claude already gathered and review them before taking action.

I'm at my desk now. Open the report you pulled so I can review it before sending.

Email the results to your team

Claude can route output through connected tools like Gmail. Take the data from the desktop app and deliver it to the right people without copying it yourself.

Email the overdue report to our finance team with a note about the top three items.

##### Tricks, tips, and troubleshooting

Computer use is opt-in and off by default

You must enable the computer use toggle in Dispatch settings before Claude can control desktop applications. Claude also asks for your approval the first time it interacts with each app in a session.

Turn on keep-awake before stepping away

Computer use tasks can take longer than connector-based tasks because Claude navigates the application visually. Keep your computer awake so Claude can finish without interruption.

Use connectors first, computer use when needed

Connectors and the Chrome extension are faster than computer use. Reserve computer use for desktop applications that have no connector and no web version — it reaches apps nothing else can, but connectors handle most tasks more quickly.

Ready to try for yourself?

Get started with Dispatch: download the Claude desktop app and the Claude mobile app, open Claude Cowork, and tap Dispatch in the sidebar.

Open artifact in new windowOpen artifact in new window

↑ back to top


### Finance (8)

#### Draft a credit memo from spreads and statements with Claude for Excel

- Author: Anthropic
- Category: Finance
- Model: Sonnet 4.6
- Source URL: https://claude.com/resources/use-cases/draft-a-credit-memo-from-spreads-and-statements-with-claude-for-excel

##### Describe the task

The deal goes to committee Thursday. You've got three years of statements in the deal folder, a half-built spread in Excel, a covenant package the relationship manager sent over Friday, and a borrower that doesn't quite look like the last one you underwrote.

In Cowork, Claude pulls the borrower's filings and peer spreads through the S&P Capital IQ connector, reads your underwriting workbook from the deal folder, and tells you where the ratios trip your policy thresholds — and which assumptions in the model don't square with what's in the statements. You take that brief into Claude for Excel to update the spread and run the covenants, then open the memo template in Claude for Word. The Excel-to-Word handoff carries the conversation, so Claude already knows which ratios moved when you draft the writeup.

Claude pulls the spreads and runs the ratios; you make the credit decision.

Prompt

Acme Manufacturing — $25M revolver renewal, committee Thursday. Walk me through the credit before I touch the spread.

Steps:

Pull three years of financials and peer spreads from S&P Capital IQ

Read the underwriting workbook in the deal folder and flag where ratios trip policy

Tell me which assumptions in the model don't match what's in the statements

Give me a brief I can take into Excel — cell refs, what to change, why

Show me the exceptions before I touch anything.

##### Give Claude context

Cowork pulls borrower data through the S&P Capital IQ connector and reads your spread from the deal folder — that's where the ratio analysis and policy check happen. Cell edits happen in Claude for Excel with the workbook open, and the conversation carries into Claude for Word so the memo draft picks up where you left off.

Required context

Attach the deal folder with the underwriting workbook. Enable the S&P Capital IQ connector. Have the Claude for Excel and Claude for Word add-ins installed — that's where the spread updates and memo drafts happen.

S&P Global

Acme spread workbook

XSLX

Credit memo template

DOC

Acme spread workbook

XSLX

Optional context

Claude can run the standard underwriting loop — ratio analysis, covenant compliance, risk rating recommendation, and the formal memo draft. The Financial Analysis plugin adds DCF, comps, and stress-testing skills if you need them for the downside cases.

##### What Claude creates

A brief you can act on: where the borrower stands against policy, which ratios moved since last review, and the exact cells to look at when you open the spread.

From Claude:

> Acme Manufacturing — $25M revolver renewal, FY25 review
> Where it stands vs. policy
> DSCR: 1.42x — passes 1.25x minimum, down from 1.68x last review
> Funded debt / EBITDA: 3.1x — passes 3.5x ceiling, up from 2.4x
> Fixed charge coverage: 1.18x — fails 1.20x minimum
> Current ratio: 1.35x — passes 1.20x minimum
> 2 exceptions to flag for committee
> FCCR!D14 — Fixed charge coverage at 1.18x Tripping the covenant by 2bp. Driver is the new equipment lease ($840K annual) that started in March; rent is now in fixed charges but the lease wasn't in the FY24 base. If you add back one quarter of pre-lease run-rate, FCCR comes to 1.23x. Your call on whether that warrants a waiver request or a covenant reset.
> Assumptions!B22 — FY26E revenue growth at 8% Borrower's own forward guidance in the Q4 commentary is "mid-single digits, 4-6%." Your 8% is above their own range. RM notes from the site visit mention a contract with their largest customer is up for rebid in Q2 — not in the model.
> In your Excel workbook
> With the Claude for Excel add-in installed, paste this into the sidebar with the spread open:
> FY25 spread done. FCCR at 1.18x fails 1.20x — driver is the equipment lease. Walk me through FCCR!D14, then build me a covenant cushion view at +/- 5% revenue and +/- 100bp on the lease assumption.
> Also flag Assumptions!B22 — my 8% growth is above the 4-6% the borrower guided to. Show me what base/downside looks like at their range.
> Once you've signed off on the spread, open the memo template in Claude for Word. The conversation carries from Excel, so the memo draft already knows which ratios flipped and which exceptions need committee narrative.

##### Follow-up prompts

Compare to last review

In Cowork, ask what's moved since the last credit cycle.

what changed vs. the FY24 review — leverage, coverage, working capital

Pressure-test an assumption against the call

See if anything in the borrower's own commentary should move a cell.

is my 8% FY26 growth too rich? what did the borrower actually say about the pipeline in their Q4 narrative

Build the downside case

In Claude for Excel, once you've signed off on the base.

build me a downside scenario in a new tab — revenue down 10%, gross margin down 200bp, hold opex flat. show me where covenants break

##### Tricks, tips, and troubleshooting

Ask Cowork for the Excel-ready brief

End your Cowork session by asking for a one-paragraph brief with the cell refs and the policy exceptions — that's what you paste into the Claude for Excel sidebar. Tighter than scrolling back through the chat.

Click the cell reference

When Claude flags FCCR!D14 in the Excel sidebar, click it and Excel jumps to that cell. Check the formula and the inputs before you agree to change anything.

Excel to Word carries the conversation

When you open the memo template in Claude for Word, it already knows which ratios moved and which exceptions you decided to surface. You're not re-explaining the deal — just say "draft the credit summary and the exceptions section."

Save it as a skill

Renewal underwriting is the same loop every cycle. Once the Cowork conversation works for one deal, save it as a skill so the next renewal in the portfolio starts one click in.

Ready to try for yourself?

Try it on your next renewal. Attach the deal folder in Cowork, ask where the borrower stands against policy, and review the exceptions before anything changes.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Validate reserves and draft filing narrative with Claude for Excel

- Author: Anthropic
- Category: Finance
- Model: Sonnet 4.6
- Source URL: https://claude.com/resources/use-cases/validate-reserves-and-draft-filing-narrative-with-claude-for-excel

##### Describe the task

The valuation cutoff was last Friday. You’ve got the reserve workbook with five tabs of triangles, the prior-year filing memo open in another window, the appointed actuary asking about IBNR movement, and the state filing due in two weeks.

In Cowork, Claude reads your reserve workbook from the valuation folder, pulls your prior filings and the latest state bulletins through the NAIC connector, and tells you where the development factors look off — and which formulas reference the wrong roll-forward column. You take the flags into Claude for Excel to fix the workbook, then open the filing memo in Claude for Word. The Excel-to-Word handoff carries the conversation, so the narrative draft already knows which reserve segments moved and why.

Claude validates the formulas and flags the anomalies; you sign off on the reserves.

Q1 reserve review for Personal Auto BI — appointed actuary review next week, filing due in two. Walk me through the workbook before I lock the numbers.

Steps:

Read the reserve workbook in the valuation folder and validate the formulas

Pull the FY24 filing and any new bulletins from NAIC

Flag development factors and tail assumptions that look off vs. prior

Give me a brief I can take into Excel — sheet refs, what's broken, what's just a movement to explain

Show me the flags before I touch anything.

##### Give Claude context

Cowork reads the reserve workbook from the attached folder and pulls historical filings through the NAIC connector — that's where the formula validation and prior-period comparison happen. Workbook fixes happen in Claude for Excel with the file open, and the conversation carries into Claude for Word so the filing narrative picks up where you left off.

Required context

Attach the valuation folder with the reserve workbook. Enable the NAIC connector. Have the Claude for Excel and Claude for Word add-ins installed — that's where the workbook fixes and filing narrative happen.

Q1 reserve workbook (Personal Auto BI)

XSLX

Prior-year filing memo

DOC

Q1 reserve workbook (Personal Auto BI)

XSLX

Optional context

Claude can run the standard reserve validation loop — formula audit, link-checking across triangles and roll-forward, anomaly detection on development factors, and the filing narrative draft. The Financial Analysis plugin adds scenario and stress-testing skills if you need them for sensitivity exhibits.

##### What Claude creates

A brief you can act on: where the workbook is broken, where the reserves moved, and the exact cells to look at when you open the file.

From Claude:

> Personal Auto BI — Q1 reserve review
> Reserve walk vs. Q4 prior
> Ultimate losses: $487.2M — up $6.4M from $480.8M
> Case reserves: $142.1M — down $3.2M
> IBNR: $89.6M — up $9.6M
> Paid-to-date: $255.5M — up $11.2M (in line with expected)
> 3 formula issues to fix
> Triangles!K47 — Hard-coded 0.987 development factor The 24-36 month link ratio for AY 2022 is hard-coded. Every other cell in column K pulls from the LDF table on Methodology!B14. This was probably a one-time override that didn't get reverted. The driver-derived value is 1.024 — using 0.987 understates IBNR by ~$2.1M for that accident year.
> Roll-forward!E22 — References wrong column Q1 paid-to-date for AY 2023 is pulling from the AY 2022 column. Off by $890K. The pattern in the rest of the row is correct; just this one cell drifted.
> BF Method!D38 — Tail factor not flowing through The 120-month tail factor on the input tab updated to 1.015, but the BF calculation still uses the prior 1.012. Three references didn't get linked when the tail tab was rebuilt last quarter.
> 1 movement to explain in the narrative
> IBNR up $9.6M (+12%) on Personal Auto BI Drivers: claim count emergence on AY 2024 ran 8% above expected in Q1, and the LDF refresh added ~50bp to the 12-24 month link ratio. Both are real movements, not formula issues — they just need narrative in the filing.
> In your Excel workbook
> With the Claude for Excel add-in installed, paste this into the sidebar with the workbook open:
> Q1 reserve review — IBNR up $9.6M, ultimate up $6.4M.
> Three formula fixes: Triangles!K47 (hard-coded LDF), Roll-forward!E22 (wrong column ref), BF Method!D38 (tail not flowing). Walk me through each, show me the corrected number, then re-run the reserve walk so I can see the clean ultimate.
> Once you've signed off on the workbook, open the filing memo in Claude for Word. The conversation carries from Excel, so the narrative already knows the IBNR movement and the LDF refresh — you just need it to draft the reserve adequacy section and the methodology change disclosure.

##### Follow-up prompts

Pressure-test the development factors

In Cowork, ask whether the LDFs look consistent with industry data.

are my 12-24 and 24-36 link ratios in line with the industry benchmarks NAIC published last quarter for Personal Auto BI?

Run a sensitivity on the tail

In Claude for Excel, once the workbook is clean.

rebuild the tail sensitivity — show ultimate at tail factors of 1.010, 1.015, 1.020, 1.025, hold everything else constant

Draft the methodology change disclosure

In Claude for Word, once the reserves are locked.

draft the methodology change section for the filing — we updated the tail factor and added one accident year to the LDF selection window. keep it ASOP 36 compliant

##### Tricks, tips, and troubleshooting

Ask Cowork for the Excel-ready brief

End your Cowork session by asking for a one-paragraph brief with the sheet refs and the formula flags — that's what you paste into the Claude for Excel sidebar. Tighter than scrolling back through the chat.

Click the sheet reference

When Claude flags Triangles!K47 in the Excel sidebar, click it and Excel jumps to that cell. Check the formula and the surrounding pattern before you agree to change anything.

Excel to Word carries the conversation

When you open the filing memo in Claude for Word, it already knows which formulas you fixed and which movements need narrative. You're not re-explaining the reserve walk — just say "draft the reserve adequacy section and the methodology disclosure."

Save it as a skill

Quarterly reserve review is the same loop every cycle. Once the Cowork conversation works for one segment, save it as a skill so the next quarter's review across all your lines starts one click in.

Ready to try for yourself?

Try it on your next reserve cycle. Attach the valuation folder in Cowork, ask where the workbook needs fixing, and review the flags before anything moves.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Update your financial model after earnings

- Author: Anthropic
- Category: Finance
- Model: Opus 4.6
- Source URL: https://claude.com/resources/use-cases/update-your-financial-model-after-earnings

##### Describe the task

The print drops after hours and the stock is moving. You've got the model in a folder somewhere, the release open in one tab, the transcript in another, and a PM meeting in the morning.

In Cowork, Claude pulls the earnings release and call transcript through the S&P Global connector, reads your model from the attached folder, and tells you where your forecast was off — and which assumptions the transcript doesn't back up. You take that brief into Claude for Excel to make the cell changes, then open the deck in Claude for PowerPoint. The Excel-to-PowerPoint handoff carries the conversation, so Claude already knows which cells you changed when you build the page.

Claude handles the data pull and the cross-referencing; you make the call on what moves.

ACME just jumped 8% after hours — what's driving this? I need to update my model and build a page for tomorrow's PM meeting.

Steps:

Pull the earnings release and call transcript from S&P

Read my model in the folder and flag where my forecast was off

Tell me which assumptions the transcript doesn't support

Give me a brief I can take into Excel — cell refs, what to change, why

Show me the flags before I touch anything.

##### Give Claude context

Cowork pulls earnings data through the S&P Global connector and reads your model from the attached folder — that's where the cross-referencing happens. Cell edits happen in Claude for Excel with the workbook open, and the conversation carries into Claude for PowerPoint so the deck build picks up where you left off.

Required context

Attach your portfolio folder with the model. Enable the S&P Global connector. Have Claude for Excel and PowerPoint add-in installed — that's where the cell edits and slide builds happen.

S&P Global

ACME valuation model

XSLX

Prior PM deck

PPTX

ACME valuation model

XSLX

Optional context

The earnings-analysis skill runs the full post-earnings loop — beat/miss, estimate revisions, and the formal client report. The Financial Analysis plugin adds DCF, comps, and LBO skills if you need them for the scenarios.

Skill: earnings-analysis

Plugins: financial-analysis

##### What Claude creates

A brief you can act on: what moved the stock, where your forecast was off, and the exact cells to look at when you open the workbook.

From Claude:

> What moved the stock — Q4 FY26
> Revenue: $2.72B — beat $2.58B guide, $130M above your $2.61B forecast
> Adj. EPS: $2.05 — beat $1.90 Street
> Gross margin: 45.7% vs. your 42.4% implied — this is the driver
> 1 assumption to review
> Assumptions!C7 — FY28E gross margin at 43.0%
> Management didn't guide FY28 on the call. Baird asked about out-year margin durability; CFO said "2026 is an investment year, benefits build into 2027" — nothing past that. Your 60bp expansion in FY28E is your call, not theirs.
> In your Excel workbook
> With the Claude for Excel add-in installed, paste this into the sidebar with the workbook open:
> Q4 print: rev $2.72B (beat), GM 45.7% vs my 42.4%.
> Flag on Assumptions!C7 — FY28E GM at 43.0%, mgmt didn't guide past FY27. Walk me through C7, then build best/base/worst scenarios on the margin range.
> Once you've signed off on the cells, open the deck in Claude for PowerPoint. The conversation carries from Excel, so the page build already knows what changed.

##### Follow-up prompts

Compare to your forecast

In Cowork, ask where the actual landed against what you had.

oh ok how does the actual number compare to what I had in my model?

Check an assumption against the call

See if management said anything that should move a specific cell.

is my FY28 gross margin too aggressive? what did they actually say about out-year margins on the call

Build scenarios in the workbook

In Claude for Excel, once you've signed off on the assumptions.

ok keep the 43% — build me best/base/worst around the margin range in a new Scenarios tab

##### Tricks, tips, and troubleshooting

Ask Cowork for the Excel-ready brief

End your Cowork session by asking for a one-paragraph brief with the cell refs — that's what you paste into the Claude for Excel sidebar. Tighter than scrolling back through the chat.

Click the cell reference

When Claude flags Assumptions!C7 in the Excel sidebar, click it and Excel jumps to that cell. Check the number before you agree to change anything.

Excel to PowerPoint carries the conversation

When you open the deck in Claude for PowerPoint, it already knows what you changed in Excel. You're not re-explaining the print or the thesis — just say "build me the page."

Save it as a skill

Post-earnings is the same loop every quarter. Once the Cowork conversation works, save it as a skill so the next print starts one click in.

Ready to try for yourself?

Try it on your next earnings print. Attach your model folder in Cowork, ask what moved the stock, and review the flags before anything changes.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Understand and extend an inherited spreadsheet

- Author: Anthropic
- Category: Finance
- Model: Opus 4.5
- Source URL: https://claude.com/resources/use-cases/understand-and-extend-an-inherited-spreadsheet

##### Describe the task

Inherited spreadsheets carry hidden complexity—formulas referencing other formulas, assumptions buried across tabs, calculations that cascade in undocumented ways. Before extending a model, you need to understand how it works.

Claude reads your spreadsheet's formulas and any existing documentation, then explains what it finds. Claude can annotate the spreadsheet itself, adding cell comments that explain complex formulas, documenting assumptions, and flagging logic that wasn't clear before. You get both an explanation and a marked-up file you can reference later.

Once you understand the structure, Claude extends the model following the original patterns and comments any new formulas it adds.

I inherited this SaaS revenue model when Marcus left. Finance needs Q1-Q3 2026 projections by Thursday. There's a Legend tab with some basics, and a few cell comments on formulas. Can you read through those, then help me understand the rest? Specifically:

How the four tabs connect to each other

What the seasonality adjustment and CAC Payback formulas are actually doing

Anything important that isn't documented

Add some visual elements so I can see the trends at a glance—data bars on the margins, or a column showing growth from baseline. And add comments explaining any complex formulas. Then extend the model through Q3 2026, following Marcus's patterns.

##### Give Claude context

Upload the spreadsheet so Claude can read formulas and trace cell references directly.

Required context

Make sure file creation is enabled in settings so Claude can produce an extended version with working formulas.

Click the (+) button in the chat bar to browse through your files or, alternatively, drag and drop the spreadsheet and any additional data files you want to analyze into the chat box area.

Revenue Model

XSLX

Revenue Model

XSLX

Optional context

Turn on Extended Thinking for Claude to develop sophisticated layouts and logic during multi-step tasks.

Extended Thinking

##### What Claude creates

Claude explains the tab structure and hidden logic, adds sparklines to surface trends and comments to explain formulas, then extends the model. The new spreadsheet matches the original conventions so the file stays coherent.

From Claude:

> I've read Marcus's Legend tab and cell comments. Here's the full picture.
> The color coding (from Legend):
> Blue = hardcoded inputs you can edit
> Black = formulas calculating within the same sheet
> Green = formulas pulling from other tabs (change the source, these update)
> Yellow highlight = key assumptions to review each quarter
> What the cell comments explain:
> Seasonality adjustment (Customer Metrics F4): Marcus's comment: "The division normalizes out last quarter's seasonality before applying this quarter's." The formula =E4*1.1*B$24/B$27 takes prior quarter × growth × (current season ÷ prior season). This prevents double-counting when moving from Q4's 1.15 factor to Q1's 0.88.
> CAC Payback (P&L B26): The comment flags an important caveat: "Uses total S&M, not just direct acquisition costs." If S&M includes brand marketing, this metric looks worse than a pure CAC calculation.
> What Marcus didn't document:
> Average customer revenue: The formula (Beginning + Ending)/2 * ARPU averages customer count because customers acquired mid-quarter generate partial revenue. Not explained anywhere.
> Headcount lag: Actual headcount in 2025 references the prior quarter's required number, modeling hiring delay. The comment mentions the lag but not why it matters for forecasting.
> Tax edge case: MAX(Operating Income, 0) prevents negative taxes on losses. Easy to miss.
> What I preserved:
> All 348 original formulas and cross-sheet references
> Legend tab and existing cell comments
> Color coding conventions throughout
> What I added:
> Q1 2026 through Q3 2026 in columns J through L across all tabs
> Sparklines in a "Trend" column showing patterns at a glance: Line sparklines for customer counts—you can see Q4 spikes and Q1 dips clearly; Column sparklines for revenue—the varying bar heights show seasonality; Line sparklines with high/low markers on margins—spots your best and worst quarters
> "vs Q1'24" column showing growth from baseline (Total customers +100%, revenue +96%)
> Cell comments explaining undocumented patterns (revenue averaging, Q1 slowdowns, CAC methodology)
> Comments on complex formulas I extended
> The sparklines show seasonality patterns—Q4 spikes, Q1 dips—without you scanning numbers. Hover over cells with red corners to see the comments. Test the model: change Enterprise churn in Assumptions and watch it cascade through all tabs.

##### Follow-up prompts

Create a changelog for what you modified

When you extend or modify a model, documenting what changed makes future handoffs cleaner and protects you if questions arise.

Can you create a summary of every change made to this file? List what was added, what formulas were extended, and what assumptions I should call out as new.

Update with actuals and analyze variance

The quarter closed. Now you need to replace projections with actual results and understand where the forecast diverged from reality.

Q4 2025 closed at $8.2M revenue versus the $8.5M forecast. Update the model with actuals and break down the variance—how much came from customer count versus ARPU versus churn? I need to explain the miss to leadership.

##### Tricks, tips, and troubleshooting

Choose Opus for complex financial models

Sonnet handles simple spreadsheets well. But inherited models with cross-sheet dependencies—where changing one assumption cascades through four tabs—benefit from Opus 4.5's deeper reasoning. The extra time per response pays off in fewer formula errors, better pattern recognition, and polished output files with working formulas, formatting, and annotations intact.

Ask Claude to annotate the file

Cell comments travel with the spreadsheet—unlike external docs that get separated and lost. Ask Claude to add comments explaining complex formulas directly in the file, so the explanation lives where you need it.

Add features to visualize patterns

Ask Claude to add sparklines or embed charts next to key metrics to show clear trends. You'll instantly see which quarters spike, where margins dip, how segments compare. When you present the model, stakeholders grasp the story without scanning rows.

Ready to try for yourself?

Work from previous financial models with clear understanding and logic. Upload inherited spreadsheets and ask Claude to show you how they work so you can extend with confidence.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Reconcile transactions across your accounts

- Author: Anthropic
- Category: Finance
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/reconcile-transactions-across-your-accounts

##### Describe the task

In Cowork, Claude reads your bank statements and chart of accounts from a folder, then cross-references every transaction against the source documents.

Focus your prompt on what you need back: a reconciliation report, correcting journal entries, or both. Claude handles the matching while you work on something else.

I need to reconcile my January 2024 bank statement. I've uploaded my checking account statement export and my current chart of accounts.

Can you analyze the transactions, match them to the right accounts, and flag anything that doesn't line up? If there are discrepancies, I'd love journal entries to fix them.

##### Give Claude context

Cowork is a workspace in Claude Desktop where Claude works directly with your local files. It cross-references transactions across your bank statements and chart of accounts and identifies what's off.

What to expect: After your initial prompt in Cowork, Claude may ask you clarifying questions about your accounts, then build a plan you can review in the sidebar. This helps it reconcile more thoroughly and produce a more complete output.

Required context

To get started:

Download Claude Desktop and start a Cowork session

Select Work in a folder in the chat bar to give Cowork access to the folder with your financial files, or use the + button to add individual files

Optional context

##### What Claude creates

Claude analyzes both files, matches transactions to accounts, and surfaces exactly what needs fixing. The response shows the reconciliation logic, specific discrepancies found, and correctly-formatted journal entries ready for review.

From Claude:

> Bank Statement Summary
> I've analyzed your January 2024 checking account statement:
> Total transactions: 147
> Total deposits: $45,230.00
> Total withdrawals: $38,892.45
> Transaction Matching Results
> 128 matched to existing categories (87%)
> 13 need new categorization
> 6 have discrepancies requiring journal entries
> Discrepancies Identified
> Bank fee not recorded - $35.00
> Interest income missing - $12.45
> Duplicate payment - $234.00
> Journal Entries to Correct
> I've prepared 13 journal entries totaling $2,563.23 in adjustments. All entries balance and use your chart of accounts IDs.

##### Follow-up prompts

Export journal entries as CSV

Get a CSV file you can import into your accounting system.

"These entries look correct. Please export them as a CSV file I can import."

Create a reconciliation summary

Generate a formal reconciliation report for your records or auditor.

"Create a reconciliation summary document I can save for my January records."

Analyze adjustment patterns

Identify recurring issues in how transactions are recorded so you can fix the root cause.

"Which expense categories needed the most adjustments? Are there patterns I should address in how I record transactions?"

##### Tricks, tips, and troubleshooting

Use the sidebar panels to track progress

The Artifacts panel shows files Claude creates, like your journal entries spreadsheet, as they're generated. The Context panel shows which source files Claude is referencing.

Grant folder access for seamless file output

Before starting, point Cowork to the folder where you want the final journal entries saved. Claude can write the reconciliation output directly there.

Let Claude work through multiple months in parallel

If you're catching up on several months of reconciliation, Claude can coordinate parallel workstreams, analyzing January while also working on February.

Start another task while this one runs

Open a new session from the sidebar for other work while Cowork reconciles. You'll see a grey dot in the sidebar when it needs attention.

Ready to try for yourself?

Give Cowork your source files and let Claude do the cross-referencing. Review the matches, refine as needed, and export the result when you're ready.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Build financial models

- Author: Anthropic
- Category: Finance
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/build-financial-models

##### Describe the task

Investment analysis means pulling data from research platforms, building financial models, and formatting to firm standards—work that can occupy analysts for days. Claude connects to your data sources and generates working models based on your deal parameters. You review the assumptions and edit directly in Excel with formulas intact, rather than building from scratch.

Tell Claude about your investment opportunity and what your partners need to see. Be specific about the deal parameters, key questions, and timeline.

I'm evaluating MediTech Solutions (healthcare SaaS) and need a complete investment analysis.

Deal structure: $75M growth equity stake at 3.6x ARR entry, exit at 7.0x in year 5. Current metrics are $50M ARR growing 35% with 18% EBITDA margin.

Get the company financials from Daloopa - search for MediTech Solutions and pull their historical revenue, EBITDA margins, customer metrics, and growth rates.

Pull healthcare SaaS comparables from S&P Global - find public companies in the sector and get their current trading multiples, growth rates, and margin profiles. I need this to validate our 7.0x exit assumption.

Search the web for healthcare SaaS customer concentration benchmarks - the company mentioned their top 3 customers represent about 40% of revenue and I need to know if that's typical or concerning for this sector. Also look up recent healthcare SaaS growth trends to stress-test the 35% growth assumption.

Retrieve our IC template from Box - search the "IC Templates" folder and use the private equity model format as the structure.

Key questions to address: How do returns look if growth slows to 25% or 20%? What does the customer concentration risk mean for our downside scenario? How does our 7.0x exit assumption compare to where public healthcare SaaS companies are trading today?

Create an Excel model with scenarios (base, upside, downside), sensitivity analysis on growth and exit multiple, risk assessment focusing on customer concentration, and a comps table showing where public companies trade. Use sophisticated private equity formatting with premium visual quality, an intentional color scheme, working formulas, frozen panes, and conditional formatting.

##### Give Claude context

Connect your data platforms so Claude conducts research and analysis based on current data rather than requiring manual gathering from multiple sources.

Required context

Use connectors to give Claude access to financial data providers. Browse through the connector library in your settings to find tools from trusted financial partners.

Enable connections to S&P Global, Daloopa, and Box so Claude can access your financial research stack.

Daloopa

Box

S&P Global

Optional context

Turn on Extended Thinking for complex multi-position analysis and to produce higher-quality workbooks with working formulas and charts.

Make sure Web Search is enabled so Claude can incorporate current market context and historical scenario precedents.

Extended Thinking

Web Search

##### What Claude creates

Claude pulled financials from Daloopa, analyzed healthcare SaaS comparables from S&P Capital IQ, built three-scenario projections with sensitivity analysis, and formatted the multi-sheet model to match your IC template standards.

From Claude:

> I've created your investment analysis model.
> Data sources used:
> Pulled MediTech's financial history from Daloopa (verified the $50M ARR, 35% growth rate, 18% EBITDA margin)
> Retrieved 7 healthcare SaaS comparables from S&P Global (Veeva, Doximity, Health Catalyst, Phreesia, Certify, NextGen, HealthStream)
> Searched web for healthcare SaaS customer concentration norms - found 40-45% concentration in top 3 customers is common for companies at this scale, though concentration typically decreases as ARR crosses $100M
> Used the "Growth Equity Model Template v3" from your IC Templates folder in Drive
> Model structure:
> Executive Summary - Deal parameters, three-scenario returns (Bear: 2.2x/17% IRR, Base: 3.0x/25% IRR, Bull: 4.1x/33% IRR), investment thesis, and risk overview
> Financial Model - 5-year projections with blue-text assumption cells, automatic calculations through P&L and cash flows, exit valuation at 7.0x ($225M EV, $146M cash return on $75M invested)
> Scenario Analysis - Three scenarios varying growth (25-45% range), margin expansion (18-24% EBITDA), and exit multiples (5.5-8.5x), plus IRR sensitivity table across 25 combinations
> Risk Assessment - Seven risks mapped: customer concentration (42% in top 3), CMS reimbursement changes, Epic/Cerner competition, platform scalability, key person risk, data security compliance, and market saturation. Each includes likelihood, impact, and mitigation approach
> Comps & Valuation - Public healthcare SaaS companies trading at 4.5x median ARR multiple vs. MediTech's 3.6x entry. MediTech shows 35% growth vs. peer median of 18% and Rule of 40 score of 53 vs. peer median of 28
> Customer concentration finding: The 42% concentration matches sector norms at this revenue scale. Web research shows similar-sized healthcare SaaS companies typically see this decrease to 25-30% as they cross $100M ARR through customer base expansion.
> Exit multiple assumption: The 7.0x exit sits above current public comps (4.5x median) but below where faster-growing peers traded 18 months ago (8-10x range). Assumes market multiples recover partially and MediTech's growth premium commands a valuation spread.
> All formulas are functional. Color coding follows PE standards (blue inputs, black calculations, green cross-sheet references).
> View your financial model

##### Follow-up prompts

Create the IC memo

Turn your financial model into a written investment recommendation. Claude converts the numbers and analysis into a narrative memo that explains the returns, risks, and why this deal makes sense.

Take the key insights from this model and create an investment memo. Use our standard IC template from Drive. Structure it with these sections: Deal Overview, Investment Thesis, Returns Summary, Key Risks, Recommendation.

Validate the growth assumptions

Check if your projections match reality. Claude researches how similar companies actually grew at this stage and tells you if your forecast is reasonable or too optimistic.

These growth numbers feel optimistic. Pull actual growth trajectories from similar healthcare SaaS companies—either from our portfolio or public comps. Show me year-over-year growth rates for companies that started at $50M ARR. Does our path match reality or are we being too aggressive?

Research recent exit multiples

Use Research to find current transaction data across multiple sources. Research takes a few minutes but delivers a thorough report with verified citations. With financial data connectors enabled, Claude can cross-reference your internal knowledge with external market data.

Find healthcare SaaS exit transactions in the last 18 months for companies in the $50-100M ARR range. What multiples did they actually achieve? How does our 7.0x exit assumption compare to recent deals, not just public trading multiples?

##### Tricks, tips, and troubleshooting

Keep comps fresh with connected data

Once you connect S&P Capital IQ or Daloopa, refresh comparable company multiples without manual updates. Say: "Pull latest healthcare SaaS comps and update the valuation sheet." Your benchmarking stays current as public market multiples shift.

Work directly in your spreadsheet with Claude

Once Claude creates your financial model, download and open the file in Excel. With Claude for Excel, you can get instant explanations of any formula, test scenarios without breaking dependencies, or trace errors to their source. Claude provides cell-level citations for every calculation.Claude for Excel is currently in beta as a research preview. Join the waitlist to get access.

Unlock further capabilities

In addition to the ability to connect to financial data tools, Claude for Financial Services adds expanded services. In addition to financial data connections, receive specialized Skills for institutional-grade analysis and frameworks, such as those for financial analysis or valuation. Also receive expert implementation support through tailored onboarding, training, and best practices.

Ready to try for yourself?

Connect Claude to your data platforms, point to the deal you're evaluating, and receive working spreadsheets for financial analyses.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Draft investment memos

- Author: Anthropic
- Category: Finance
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/draft-investment-memos

##### Describe the task

Claude can connect directly to your financial tools, letting you query using natural language and receive analysis with source citations. Instead of opening multiple browser tabs to gather data, copying metrics into spreadsheets, and then formatting a Word document from scratch, you can request the complete workflow in one conversation.

Tell Claude which company you're evaluating, what metrics drive your investment decision, and what deliverable format you need.

I'm evaluating CloudBridge Technologies (ticker: CLDG) for a potential equity investment and need an initial memo for our IC meeting next week.

Pull the data I need: Using Daloopa, get CloudBridge's revenue, operating margins, and free cash flow for the last 12 quarters, plus their segment revenue breakdowns. Using Kensho, identify who CloudBridge lists as competitors in their SEC filings and pull revenue growth and margins for those competitors. Also get CloudBridge's key business relationships and major customers.

Analyze this: Calculate cloud platform segment growth versus overall company growth. Determine free cash flow conversion rate. Compare margins year-over-year. Benchmark CloudBridge against the competitors we identified. Flag customer concentration risks.

Create a professional investment memo in Word format: executive summary with recommendation, business overview with segment analysis, financial performance highlighting trends, competitive positioning, valuation assessment, and key risks. Use IC-ready formatting.

##### Give Claude context

Connect your data platforms so Claude produces memos with current data rather than requiring manual metric gathering from multiple sources.

Required context

Use connectors to give Claude access to financial data providers. Browse through the connector library in your settings to find tools from trusted financial partners.

Set up connections to Daloopa for SEC filings and fundamental data, and S&P Global for market intelligence and competitor analysis.

This workflow uses capabilities available to Claude for Enterprise customers. Financial data connectors may require existing subscriptions or licenses with the underlying providers.

Daloopa

S&P Global

Optional context

In the chat settings, make sure Web Search is turned on for additional context on the company you are evaluating.

Enable Extended Thinking for better synthesis when combining data from multiple platforms and creating higher-quality document outputs.

Web Search

Extended Thinking

##### What Claude creates

Claude pulls data from Daloopa and S&P Global, calculates growth rates and margins, compares performance across competitors, and generates a professional Word document ready for investment committee review.

From Claude:

> Perfect! I've retrieved the financial data and created your investment memo:
> Data Retrieved:
> CloudBridge quarterly data: Revenue grew from $1.8B to $2.8B over 12 quarters, operating margins expanded from 37.5% to 41.2%, free cash flow increased from $610M to $915M
> Segment breakdown: Cloud Platform Services (58% of revenue, 34% growth), Developer Tools (28%, 18% growth), Professional Services (14%, 12% growth)
> Competitors from SEC filings: DataFlow Inc. and SkyLink Corp.
> Competitive data: DataFlow growing 19% at 36% margins, SkyLink growing 15% at 28% margins
> Business relationships: 8 major customers totaling 22% of cloud revenue, largest customer at 5%
> Analysis:
> Cloud Platform segment growing 34% versus 27% overall company growth—driving mix improvement
> Free cash flow conversion at 33% margin demonstrates capital efficiency
> Margins expanded 380 basis points YoY, outpacing peers by 5-13 percentage points
> CloudBridge maintains strongest growth and margin profile among enterprise infrastructure competitors
> Customer concentration moderate and declining—no single-customer dependency risk
> Investment Memo:
> View your memo
> The document includes executive summary with BUY recommendation and $165 target (28% upside), business overview analyzing segment performance, financial highlights showing margin expansion and cash generation, competitive benchmarking table, valuation using three methodologies, and risk assessment with mitigating factors. Formatted for IC presentation with professional typography and clear visual hierarchy.

##### Follow-up prompts

Show source citations for verification

Get specific platform references and data points for every claim in the memo. Claude can trace every number and claim back to its source, showing you exactly where each piece of information came from.

Cite the exact source for each metric—I need to see platform name, date pulled, and which filing or transcript. Show me where the Q3 revenue number came from, which analyst report supports the margin expansion claim, and the specific competitor data points.

Expand on the valuation methodology

Add detailed calculations and assumptions to support your price target. Claude shows the underlying math and how your valuation changes under different scenarios.

Show me the DCF math step-by-step: revenue assumptions, margin projections, discount rate, terminal value. Then create a sensitivity table showing how the target price changes if growth rates or margins differ from base case by 5 percentage points.

Transform into presentation format

Convert your written memo into slides for your committee meeting. Claude restructures your content and creates charts to illustrate key findings.

Convert this analysis into a 6-slide PowerPoint: title slide with recommendation, business model overview, competitive comparison with charts, financial performance trends, valuation summary, and investment thesis. Visualize trends with visual elements, like graphs and charts.

##### Tricks, tips, and troubleshooting

Use specific and clear instructions

Claude has access to vast amounts of financial data when connected to multiple tools and sources. Without specific references in your prompt, you may receive more data than needed or miss specific, critical metrics. Provide clear direction to ensure Claude returns the information required for your analysis, saving time and improving accuracy.

Download the actual memo, not just the preview

The in-chat preview may not show the final typography, spacing hierarchy, and formatted tables that the document has. Open the file to see—and continue editing—the complete output.

Match model to task complexity

This example uses Claude Sonnet 4.5, the Claude model best suited for a balance of intelligence, speed, and cost for most use cases. If you need faster iteration (like rapid brainstorming or simple formatting), consider switching to Haiku 4.5, the fastest Claude model with near-frontier intelligence. To learn more about various models, visit our Model Report.

Unlock specialized capabilities

In addition to the ability to connect to financial data tools, Claude for Financial Services adds expanded services. In addition to financial data connections, receive specialized Skills for institutional-grade analysis and frameworks, such as those for financial analysis or valuation. Also receive expert implementation support through tailored onboarding, training, and best practices.

Ready to try for yourself?

Financial workflows that once required hours of data gathering and manual document formatting now collapse into focused conversations. Test the approach with one company evaluation to calibrate how Claude handles your specific analytical needs.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Organize your business finances

- Author: Anthropic
- Category: Finance
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/organize-your-business-finances

##### Describe the task

Claude can create spreadsheets tailored to your needs, applying the right features for your specific situation.

Tell Claude about your freelance business and the metrics that matter. Provide your invoice data—even if it's incomplete or messy—and ask for a dashboard that helps you make smarter business decisions.

I need help organizing my freelance invoices from this year. I'm uploading my invoice file. It has the date, client name, what the project was, and how much I invoiced. Formatting is inconsistent because I've been adding to it all year.

Can you create a cleaner version with a dashboard that shows my total income, breaks it down by month, and lists my clients by who's paid me the most. Add sparklines and data visualizations showing trends over time at a glance. I want to be able to filter and sort to find specific invoices when I need them. If you notice nuance in the data, leave cell comments for more context.

Make this a sophisticated financial dashboard with a "quiet luxury", editorial aesthetic—muted sage green accent, abundant whitespace, restrained typography. You may need to write a Python script using xlsxwriter to get the sparklines and advanced features working.

##### Give Claude context

Give Claude your business records, like invoice information, so Claude can analyze and organize your information and then add spreadsheet features that make understanding your data easy.

Required context

Upload your spreadsheet or CSV file with your invoice data.

Click the (+) in the chat bar settings to browse through your files, or alternatively, drag and drop your files into the chat box area.

Invoice files

Optional context

Turn on Extended Thinking to help Claude spend more time thinking through organization and formatting

Extended Thinking

##### What Claude creates

Claude organizes your data and adds spreadsheet features—filters, frozen headers, trend charts, and formatting—that make it functional and easy to use.

From Claude:

> Done! I've created your freelance finances dashboard tracking November 2025.
> Key highlights:
> Strong month: $22,200 income (well above your 6-month average of $8,683)
> Year-to-date: $99,000 across five active clients
> Your top performers: Acme Corp ($25,900 YTD) and Venture Design Co ($23,700 YTD)
> The dashboard shows your income allocation automatically: 30% to taxes ($6,660), 15% to your buffer ($3,330), 10% to equipment ($2,220), with $8,850 as take-home pay (39.9% of gross).
> The quarterly breakdown lets you see client trends at a glance—Venture Design Co is ramping up while others stay steady. The sage green highlights on totals make it easy to scan your key numbers quickly.
> View your dashboard

##### Follow-up prompts

Ask for additions and revisions

After seeing the dashboard, you can request improvements, like calculations, additional tabs, new features, without starting from scratch.

Can you add a column showing how many days it's been since each invoice? I want to see which pending payments are getting old.

Update with new data

Upload new invoice records along with your dashboard file and Claude will update it with the latest data while keeping the same formatting and features.

Here's my dashboard from last month and my new December invoices. Can you add the new data and update the monthly totals?

##### Tricks, tips, and troubleshooting

Download the file to see all the features

The chat preview shows basic data structure, but the formatting and features only appear once you've opened the file. From there you can see the formatting, typography, and features like frozen headers, clickable filters on each column, and small trend charts. The preview gives you a sense of the content—the actual file has all the functionality.

Request specific features

Certain advanced features require Claude to use software packages, which are like specialized tool kits. For spreadsheet files, mentioning 'xlsxwriter' in your prompt enables features like sparklines (small inline trend charts), advanced conditional formatting, and sophisticated chart styling.

Upload data as-is

Claude can work with messy data and handle inconsistent date formats, blank rows, notes in cells, and mixed formatting. If you've been tracking invoices in whatever way worked for you, upload that. Claude organizes it during the process, so focus on making sure you have all your records rather than formatting them perfectly beforehand.

Ready to try for yourself?

Claude can help you organize your data and create spreadsheets that fit how you work. Whether it's invoices, expenses, or project tracking, Claude can create files with features that make sense for your specific situation.

Open artifact in new windowOpen artifact in new window

↑ back to top


### Education (11)

#### Plan your syllabus

- Author: Anthropic
- Category: Education
- Model: Sonnet 4.6
- Source URL: https://claude.com/resources/use-cases/plan-your-syllabus-see-which-weeks-are-locked

##### Describe the task

You know every topic in the course. What's harder to see is which weeks are in that order because they have to be, and which are there because that's where you or the textbook put them. Working as a list, those look the same.

You ask Claude about the order, and the graph appears as part of its answer. It shows which weeks are locked by real prerequisites and which are there by habit — so you can see where you have room to rearrange.

Here an econ professor keeps reordering the middle of a fifteen-week intro course. Claude lays out the weeks by tier, tags each one locked, moderate, or flexible, and pulls alternative orderings from Mankiw, Blanchard, and the other standard texts.

I'm building a 15-week Intro to Macro syllabus and I keep second-guessing the order. Can you map out which topics actually depend on which — like, what do they need to get first before the later stuff makes sense? I want to see where I have flexibility and where the sequence is locked. If I click a topic, tell me if there's another common way to order it.

##### Give Claude context

Attach the working syllabus — topic list with week numbers is enough. If you're teaching from a specific book, say which; the alternative-ordering guidance gets sharper.

Required context

The syllabus.

Previous syllabus

PDF

Previous syllabus

PDF

Optional context

Google Drive if the syllabus lives there. A Project if you'll refine this across terms — come back next semester, adjust, redraw.

##### What Claude creates

Claude draws the course as a graph — locked weeks in one color, movable weeks in another. Click any topic and a panel shows what comes before it, what it unlocks, and how the major textbooks handle that same spot in the sequence. You get a second opinion on each ordering choice.

##### Follow-up prompts

Ask Claude to redraw with one thing moved

Try a reorder before you commit to it — name the move, Claude redraws, and anything that loses a prerequisite lights up.

Redraw the map with Money & Banking in Week 4 instead of Week 8. Show me what downstream topics lose a prereq.

Ask Claude to write the revised syllabus from the graph

Claude writes the week-by-week syllabus based on the order you landed on in the graph — with chapter mappings — ready to hand to students.

Write the revised schedule based on the reorder we landed on. Week by week, with chapter mappings.

##### Tricks, tips, and troubleshooting

How you word your prompt shapes what you get

"Which topics depend on which" is the phrasing that gets a graph — you're asking for structure, and a graph shows where the flex is. Works on anything you're sequencing: a training plan, an onboarding path, a reading list where some things build on others.

Check the visual against your own understanding

The locked/flexible tags are Claude's reading of the dependencies — based on standard textbook orderings and prerequisite logic. You know your course. If Claude marked a week "flexible" that you know has a hidden dependency (a concept you build on in discussion, a problem set that assumes it), that's worth catching before you reorder. Where you'd tag it differently is where your course-specific knowledge beats the generic read.

What to do with the visual next

Save as Artifact and share the dependency view with students — the map you used to plan is a study map for them. Create skill from visual has Claude remember this format for next semester's course. Or ask for the revised syllabus itself as a document, once the order's settled.

Ready to try for yourself?

Try it on the syllabus where the middle keeps moving around — attach it, ask which topics depend on which, and see where you have room to rearrange. Web or desktop at claude.ai.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Work through grant options in chat

- Author: Anthropic
- Category: Education
- Model: Sonnet 4.6
- Source URL: https://claude.com/resources/use-cases/work-through-grant-options-in-chat-with-claude

##### Describe the task

Some decisions have more dimensions than any one view can show — every sort order surfaces one thing and hides the rest. You ask Claude in chat, and the chart appears as part of its answer with all the tradeoffs visible at once. You work through it together, filtering and testing scenarios until a shortlist takes shape.

Here a researcher has a long list and needs to decide which few to write. Claude plots them on a risk-reward scatter with filters that narrow chart and table together, and buttons that turn the picture into a ranked shortlist.

I'm planning grant submissions for next year and there are a lot of funders to choose between. Can you show me the tradeoffs in a way I can actually see — like, which ones are long shots for big money versus safer bets for smaller awards? Flag anything with a deadline coming up soon.

##### Give Claude context

If you have a spreadsheet with amounts, rough success rates, and deadlines, attach it. If not, describe the landscape and Claude can populate from what it knows about the major programs.

Required context

Nothing strictly required. For a chart grounded in your actual pipeline, attach the sheet.

Optional context

If the pipeline lives in a Google Sheet, connecting Google Drive lets Claude read it directly. A Project means you can come back mid-season, add a new RFP, and ask for a re-plot without re-uploading.

##### What Claude creates

Claude folds four spreadsheet columns into position, size, and color on one chart — so all the tradeoffs are in view at once. Long shots cluster upper-left, safe bets lower-right, and the distance between those corners is where your strategy sits. The expected-value card at the top is the one number that accounts for realism, and the gap between that and the raw total tells you how much of your list is lottery tickets.

##### Follow-up prompts

Click a point on the chart to see the full profile

Click any point on the chart and Claude expands it below — the chart stays, the profile opens beneath.

The NSF CAREER dot — open it up. Deadline, page limits, what makes an application competitive.

Ask Claude to write a schedule from the chart

Claude writes a week-by-week schedule using the deadlines from the chart, with start dates calculated backward from each submission date.

Turn the next-90-days grants into a submission timeline. Work backwards from each deadline and tell me when to start each one.

Tell Claude what's changed and it redraws the chart

Claude redraws the chart with your update — the submitted grant moves to in-progress, the remaining dots re-rank.

I submitted the R03 yesterday. Redraw with that one marked as in-progress and re-rank what's left.

##### Tricks, tips, and troubleshooting

How you word your prompt shapes what you get

"Long shots for big money versus safer bets" names the tension directly — that's what gets a chart where the tradeoff is spatial, with every dimension visible at once. Works on any decision where you're holding several variables: staffing, roadmap priority, anything that doesn't sort cleanly by one column.

Check the visual against your own understanding

Ran this without a sheet, so Claude filled in the numbers? The success rates are roughly right for major federal mechanisms, less certain for foundations that don't publish. The chart shows the shape of the decision; the program page confirms any single dot before you write the application.

What to do with the visual next

Save as Artifact lets you come back mid-season — submit one, tell Claude, redraw with the new landscape. Or ask Claude to turn the deadlines into a schedule you keep. The chart is a working surface you return to as the season goes.

Ready to try for yourself?

Try it on the decision you've been re-sorting — describe the tradeoffs you're trying to hold at once, and let Claude give the decision a shape. Hover over the chart for options: copy an image, or save it as an Artifact if you want to revisit.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Apply a formula as you learn it

- Author: Anthropic
- Category: Education
- Model: Sonnet 4.6
- Source URL: https://claude.com/resources/use-cases/apply-a-formula-as-you-learn-it-in-chat-with-claude

##### Describe the task

There's a gap between doing a formula and having a feel for it. You can compute correctly and still not know what one weird value will do to the answer — that sense comes from handling: moving a point, watching what changes. Claude can build a blank canvas right in the conversation. You place the points, drag any one, watch the fit respond. Quick enough to do mid-study, and when it clicks you move on.

Here a stats student can do the calculation but doesn't have a sense of why a single bad point moves the whole fit. Claude hands them a scatter to build from scratch, with toggles for residuals and influence so the distinction shows up by dragging.

I'm learning linear regression and I can do the formula but I don't get it. Can you give me something where I can mess with the data points myself and watch what happens to the line? I want to actually feel why one weird point can throw the whole thing off. Can you help me visualize?

##### Give Claude context

No files. The prompt's verbs do the work — "mess with," "watch what happens," "feel why." That language is what gets you a blank canvas to fill rather than a pre-loaded demonstration to watch.

Required context

Nothing to upload.

Optional context

If a problem set or lecture slide shows regression a particular way, paste it. Claude can build the interactive version of that presentation, which connects back to your course material tighter.

##### What Claude creates

Claude hands you an empty canvas. You click to place points, drag to break things, watch the line respond. Placing the outlier yourself and watching the line pull toward it is what makes the squared-distance weighting click — you've read that big misses count more, and now you can see the counting happen. The influence toggle draws a halo around whichever point the fit depends on most, which is a different question from how far off the point is. Drag one to the edge and the halo grows even when the point sits right on the line.

##### Follow-up prompts

Ask Claude to show the math behind what you noticed

Something you noticed while dragging raises a question — ask for the math behind it, and Claude builds a second visual below showing the formula in action.

The influence halo grew when I moved the point sideways but barely changed when I moved it up. Show me the leverage formula and where horizontal distance shows up in it.

Ask Claude to overlay a second thing on the same canvas

Ask Claude to overlay a second thing on the canvas you built — both stay visible, and dragging shows you how they respond differently.

Overlay a robust regression on the same points I made. I want to drag the outlier and watch both lines move.

Ask Claude to turn the canvas into a prediction test

Claude generates test scatters, you predict what happens before dragging, and it tells you if your instinct was right.

Give me a few test patterns — show me a scatter and ask me to predict what one outlier will do before I drag it.

##### Tricks, tips, and troubleshooting

How you word your prompt shapes what you get

"Mess with," "watch what happens," "feel why" — that language is what gets a blank canvas. Claude reads verbs of interaction as a signal to build something you manipulate; a plain "explain" tends to produce a pre-loaded demo you watch.

Tell Claude what to adjust and it redraws

If what streams in is close but missing something — a second variable, a simpler version, a toggle for a concept the first pass skipped — say so. Claude redraws. The back-and-forth is how you get to the version that fits what you're trying to feel.

What to do with the visual next

Hover for options: copy as image drops it into your notes, Save as Artifact keeps the canvas interactive for later. Or ask Claude to write up what you now understand — the visual surfaced one gap, and putting it in words often surfaces the next.

Ready to try for yourself?

Try it on any formula you can do but don't yet have a feel for — regression, probability, anything where you can compute the answer but can't predict how it'll move. Describe the gap and let Claude build something to manipulate.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Bring your whiteboard lesson to life

- Author: Anthropic
- Category: Education
- Model: Sonnet 4.6
- Source URL: https://claude.com/resources/use-cases/bring-your-whiteboard-lesson-to-life

##### Describe the task

You're working out how to teach something — where students get stuck, what framing would land better, whether your usual sketch is doing the right work. Claude can think through that with you, and a visual streams in as part of the exchange, making the reframing concrete right alongside the advice. The drawing does two things at once. It sharpens your own articulation — seeing it move makes the teaching script write itself — and it's a first draft of something students could use, with a path from prep session to classroom tool when you want one.

Here a professor is planning supply and demand equilibrium for next week. They attach the sketch they've been using and ask Claude to help think through why students stall on it. The response is part teaching advice, part interactive graph — and the graph keeps evolving as the conversation does.

I'm prepping to teach supply and demand equilibrium next week. Here's the sketch I've been using — students tend to follow the crossing but not why the price goes there. What's a better way to frame it? And is there a way to show them the pressure toward equilibrium, not just the intersection?

##### Give Claude context

Attach what you've been using — a sketch, a slide, a half-built example. Claude reads your framing and works from it, so what comes back extends your explanation rather than replacing it.

Required context

A photo of the whiteboard, a slide, or a description of what you've been drawing.

Sketch, slide, or description

JPEG

Sketch, slide, or description

JPEG

Optional context

If you know where students typically stall — a specific misconception, a question that keeps coming up — say so. Claude's reframing gets built around that sticking point.

##### What Claude creates

The response is a teaching conversation with a visual woven through it. Claude diagnoses why the static sketch loses students — a concept about movement needs to move — offers a reframe, and the interactive version streams in where the reframe lands: your curves, a slider the student would drag, a readout that rewrites wherever they set the price. The graph is a prop for the thinking first. What you do with it comes second.

##### Follow-up prompts

Ask Claude to redraw it with one thing changed

Describe a change to the interaction and Claude redraws — you say what's different, the visual updates.

Add a step before the snap button: students predict which way the price moves first, then click to check. Show their guess next to what happened.

Click a button in the visual to see the next scenario

The buttons below the graph send follow-up prompts — click one and Claude builds a second visual for that scenario. The equilibrium graph stays above.

What happens when demand spikes? Show me the curves shifting and where the new equilibrium lands.

Ask Claude to rebuild the same format for a different concept

Claude rebuilds the same drag-predict-check interaction around the new concept — price floors this time, same snap button, different curves.

Redraw this for price floors and ceilings — same predict-then-snap format, but show why the gap doesn't close.

##### Tricks, tips, and troubleshooting

How you word your prompt shapes what you get

"Students follow the crossing but not why the price goes there" tells Claude which misconception to build around — generic framing gets a generic diagram. Attach what you've been using, say where students stall, and the visual gets shaped around that specific gap.

Check the visual against your own understanding

The predict-then-snap interaction is Claude's guess at what would help your students — it's one way to build the graph, and it might not fit your class. Try it with a few students before committing. If they click through without predicting, or the surplus zone doesn't land, that's worth knowing — tell Claude what happened and the next version gets built around what you saw.

What to do with the visual next

When the visual is close to something students could use on their own, hover over it for options. Save as Artifact turns the whiteboard draft into a link students open on their own. Create skill from visual has Claude remember the interaction shape — next time you bring a different concept and get the same drag-predict-check format without rebuilding the idea.

Ready to try for yourself?

Try it on whatever you're planning to teach — attach your sketch, say where students tend to stall, and think it through with Claude. The drawing shows up mid-conversation, useful for your own prep first, with a path to a student tool when one's worth building.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Visualize the mechanism behind an explanation mid-chat

- Author: Anthropic
- Category: Education
- Model: Sonnet 4.6
- Source URL: https://claude.com/resources/use-cases/visualize-the-mechanism-behind-an-explanation-mid-chat

##### Describe the task

Claude can build a visual as part of its answer — a diagram, a chart, something interactive — built for the question you asked and woven into the explanation around it. You drag things, click into what's still unclear, and Claude builds the next one in response. It triggers on its own when a visual would help; you can also ask for one directly. Rather than a full artifact, the diagram streams in where the text would have been, and the conversation keeps going.

Here a student knows a planet speeds up near the sun but not why. Claude builds an animated trade-off they can run themselves, with buttons to go deeper into whatever's still fuzzy.

I'm learning orbital mechanics and I understand that the planet speeds up when it's close to the sun and slows down when it's far. But I don't understand why that trade-off exists. Why can't it just go fast the whole time? Help me understand with a well crafted, interactive, dynamic visualization.

##### Give Claude context

No files needed — the prompt carries it. Stating what you already know tells Claude where not to start; naming what isn't clicking tells it what to build around.

Required context

Nothing to upload.

Optional context

If a textbook passage explains it but isn't landing, paste it. The visual gets built around what that specific explanation is missing.

##### What Claude creates

Claude builds three linked views of the same mechanism tied to one slider — the trade-off runs in all three at once. The slider hands you the variable. Drag it and the answer to "why can't it just go fast" shows itself: the energy bar pins the total, so speed and distance trade against each other.

##### Follow-up prompts

Click a button in the visual to go deeper

The buttons at the bottom of the visual send follow-up prompts — click one and a second visual streams in below, built around that narrower question. The first stays; you scroll between them.

Explain angular momentum conservation in orbits — why does the planet sweep equal areas in equal times?

Ask Claude to redraw it with one thing changed

Name a change and Claude redraws — same three panels, different input, so you see what holds and what shifts.

Would this same speed-distance trade-off work for a comet with a really eccentric orbit? Rebuild the same visual with that orbit instead and show me what changes.

Ask Claude to turn the explainer into a quiz

Claude builds a quiz using the same three panels — it asks what happens at different points in the orbit, you answer, it tells you what you got right.

Quiz me on what this animation shows. Ask me what happens at different points in the orbit and tell me if I've got the trade-off right.

##### Tricks, tips, and troubleshooting

How you word your prompt shapes what you get

Words like "interactive," "let me adjust," or "something I can play with" steer Claude toward sliders and controls; a plainer description tends to get a static image. The prompt above uses "interactive, dynamic visualization" — that phrasing is what gets a mechanism you can run. If what comes back is cramped, asking Claude to clean up the formatting usually fixes it next turn.

Tell Claude what you already understand

Mentioning what you already understand tells Claude what to skip — more of the visual ends up on the part that's unclear. One line does it: the student above already knows the planet speeds up; what they want is the why, and that's what gets animated.

What to do with the visual next

Hover over the visual for options. Copy as image drops it into your notes next to the concept. Save as Artifact keeps the interactive version if you'd reopen the sliders later. Or ask Claude to write up what clicked — you get a paragraph to edit into your notes.

Ready to try for yourself?

Try it on whatever concept isn't clicking — say where you're stuck and let Claude build something to watch. Hover over what Claude drew for options: copy an image for your notes, or save it as an Artifact if it's worth keeping past the conversation.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Map your lit review mid-conversation to surface the underlying debate

- Author: Anthropic
- Category: Education
- Model: Sonnet 4.6
- Source URL: https://claude.com/resources/use-cases/map-your-lit-review-mid-conversation

##### Describe the task

You've read the papers. Each made sense on its own. What gets hard around paper twelve is holding the shape of the whole thing — which papers are building on each other, which are in tension, what each camp is taking for granted. Claude can draw that shape inline as you work through the set: clusters by claim, tension lines where camps disagree, a panel per cluster on what it's missing. The map is one reading of the debate — something to check against your own sense of where the papers sit. Where you'd cluster differently is often where your own argument starts taking shape.

Here a grad student has read twenty papers on AI in K-12 and lost the thread. Claude draws five argument clusters with tension lines between them, and the blind-spot panels give the student something to check against their own sense of the literature.

I've read 20 papers on AI in K-12 and I've lost the thread. Can you map out who's actually agreeing with who and where the real disagreements are? I can't tell anymore which papers are building on each other and which are talking past each other. If I click into a group, give me the short version of what they've got and what they're missing.

##### Give Claude context

Attach the papers or notes. The more of each paper Claude can see — abstract, claims, who's cited — the more the map reflects what's there rather than a generic reading.

Required context

Papers or a consolidated notes file.

Paper notes

PDF

Paper notes

PDF

Optional context

Connecting Google Drive lets Claude read the papers directly. For a review that runs over weeks, a Project keeps sources available across conversations — drop in a new paper and ask Claude to update the map without re-uploading the rest.

##### What Claude creates

Claude clusters by argument — so the map is a picture of the debate, not a keyword tree. The blind-spot section in each cluster panel is Claude's reading of what that camp consistently undertheorizes, which is the kind of thing you stop seeing once you're inside a literature. The map is a position you check: where it matches your sense of the field, you've confirmed something; where it doesn't, you've found either a place you're wrong or the beginning of your own reading.

##### Follow-up prompts

Click an element in the map to go deeper

Click any element in the map and Claude expands it below — the map stays, the detail opens beneath. Here, a tension line surfaces which papers are in it.

Walk me through the assessment-vs-surveillance tension — which specific claims does the critical camp push back on, and do the analytics papers engage or talk past it?

Ask Claude to write up what the map showed

Claude writes the lit review section using the map as the outline — one paragraph per cluster, one per tension line — and you edit from there.

Draft the "state of the debate" section for my lit review from this map. One paragraph per cluster, then one per tension line.

Tell Claude where you'd draw it differently and it redraws

Tell Claude where you'd draw a boundary differently and it redraws — your correction reshapes the map.

I think the Williamson paper belongs between the analytics and critical camps, not inside analytics. Redraw with it as a bridge and show me what changes about the tension lines.

##### Tricks, tips, and troubleshooting

How you word your prompt shapes what you get

"Who's agreeing with who and where the disagreements are" asks Claude to cluster by argument — that's what gets tension lines. A plain "organize these papers" tends to produce a topic tree; this phrasing produces a map of the debate. Papers on the same subject can sit in opposite camps, and that's what you want to see.

Check the visual against your own understanding

The clusters are Claude's interpretation. If a paper you'd call a bridge ended up firmly in one camp, say so and watch the map adjust. Where you disagree is worth paying attention to — either Claude's read is sharper than yours, or yours is sharper than Claude's, and the second case is an insight you can write up.

What to do with the visual next

Save as Artifact keeps the map live — add a paper next week and redraw without re-uploading the rest. Or ask Claude to write the "state of the debate" section from the clusters. The map is an outline you've tested; the paragraphs come from what it shows.

Ready to try for yourself?

Try it on the literature that's stopped making sense as a whole — attach what you have and ask Claude to map the camps. Hover over the map for options: copy an image, or save it as an Artifact if you want to keep iterating on it across the review.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Chart your data in conversation with Claude before you commit to a reading

- Author: Anthropic
- Category: Education
- Model: Sonnet 4.6
- Source URL: https://claude.com/resources/use-cases/chart-your-data-before-you-commit

##### Describe the task

You have data and want to see what's in it before you start working. Ask Claude, and the chart comes back with a read on what stands out — from there you work through it together.

Here a researcher has survey data on study habits and GPA before a committee meeting. Claude builds a clickable matrix, opens scatters on demand, and flags two findings worth a closer look.

Show me what this data is telling me. I'm looking for the strongest relationships in here. Can you give me a correlation matrix and let me click into any pair to see the scatter? Flag anything that surprises you. Don't hold back on making this readable; I'm presenting this to a committee.

##### Give Claude context

The CSV is the context. Two lines in the prompt shape what comes back: "flag anything that surprises you" asks Claude to bring a read alongside the chart, and naming the audience ("for a committee") shapes how much the labels assume.

Required context

Upload the CSV.

Survey responses

CSV

Survey responses

CSV

Optional context

If the data lives in a Google Sheet, connecting Google Drive lets Claude read it directly.

##### What Claude creates

Claude builds the grid, then calls out what stands out. The clickable matrix shows every pair; below it Claude flags which cells cut against the expected story. The flags are worth checking — a striking cell can be real, or a confound, or a quirk of this sample, and the chart makes all three look the same. The follow-ups below are how you figure out which.

##### Follow-up prompts

Click into the visual to go deeper on one piece

Click any cell in the matrix and Claude opens a scatter for that pair below — the grid stays, the detail expands beneath. You can ask Claude to split that scatter by a third variable to see if the relationship holds.

Split the attendance-GPA relationship by study hours. For students in the top quartile of study time, does attendance still predict GPA?

Ask Claude to write up what the chart showed

Claude writes the report paragraph based on what the chart showed — including where to hedge — and you edit from there.

Write the paragraph about attendance and GPA for my report, based on what the chart shows. Flag where I should hedge.

Ask Claude to turn the chart into a quiz

Claude picks cells from the matrix, you say what you'd conclude, and it catches overclaims before the committee does.

Quiz me on the matrix. Show me a few cells and ask what I'd conclude — catch me if I read causation into a confound.

##### Tricks, tips, and troubleshooting

How you word your prompt shapes what you get

Adding "flag anything that surprises you" gets interpretation alongside the chart — which cells deserve attention, which cut against the expected story. Without that line, you get the matrix and do the reading yourself. Works on any data you're about to write about: results before a report, exported analytics before a status doc.

Check the visual against your own understanding

The pattern Claude flagged is a starting point. A striking cell can be real, or a confound, or a quirk of the sample — the chart makes all three look the same. The follow-ups are where you figure out which, and you're the one deciding what holds up.

What to do with the visual next

Hover for options: copy as image for slides, or Save as Artifact if you want something interactive to share with collaborators. Or ask Claude to write the report paragraph from what the chart showed — that's the piece you bring to the committee.

Ready to try for yourself?

Try it on the dataset you've been meaning to look at — upload the CSV, ask what's in it, and let the first chart show you where to dig. Web or desktop at claude.ai.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Turn research into presentations

- Author: Anthropic
- Category: Education
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/turn-research-into-presentations

##### Describe the task

Combine your research expertise with Claude's ability to extract themes and restructure content. Together, you'll learn to identify compelling findings, build narrative arcs, and create clarifying visuals while Claude handles the formatting details.

Tell Claude about your presentation context and then ask to extract key findings and create structured presentation materials from your research paper and any supporting data.

I'm uploading our group paper on sleep quality and academic performance. We have 12 minutes to present to a mixed audience of professors and students, with 4 presenters sharing the time. Analyze this research to:

Extract the 3-4 most compelling findings that will resonate with our audience

Create a logical narrative flow that builds from problem to insights to implications

Design visual slides that simplify complex data without losing accuracy

Then create:

A Canva slide deck outline with clean visuals, data charts, and transitions—we'll open this in Canva to refine and add our own style

Speaker notes document with minimalist design, box structures, muted color palette, and clean sans-serif hierarchy. Add elements like a split workspace/reference column layout and use a functional modernist aesthetic so this document is easy to use while preparing.

##### Give Claude context

Provide your research materials and connect tools so Claude can create visual presentation elements and structured outlines.

Required context

Upload your research paper, any research data files, and your assignment rubric. Click the (+) button in the chat bar to browse through your files, or alternatively, drag and drop files into the chat box area.

Connect the Canva connector so Claude can generate complete slide decks that you can open and edit directly.

Enable the Google Drive integration for Claude to pull relevant files without manual uploads.

Google Drive

Canva

Your completed group paper

PDF

Any data files if separate from the paper

Your completed group paper

PDF

Optional context

Enable Extended Thinking to give Claude more time to think through complex tasks—analyzing your research deeply, identifying narrative threads, prioritizing findings for your audience, and structuring information clearly.

Extended Thinking

##### What Claude creates

Claude transforms your research into presentation materials structured for clarity and impact—slides outlined with sections from your research that are ready for editing and speaker notes that distribute content logically across presenters.

From Claude:

> After analyzing your research, I've identified several compelling themes and connections:
> 1. Canva Presentation - Structured around discovered themes (ready for your refinement):
> Slides organized by the patterns that emerged from your data
> Visualizations that highlight unexpected correlations (sleep quality's 0.4 GPA impact connects to the 2.5x depression increase)
> A narrative arc that builds from individual behaviors to systemic implications
> Open in Canva to adjust design, emphasize key points, and add your own visual style
> Choose your preferred design:
> Design Option 1 | Design Option 2 | Design Option 3
> 2. DOCX Speaking Script - Maps how insights build on each other:
> Each section reveals findings that set up and reinforce the next discovery, creating a cohesive analytical journey
> Transitions that show how separate data points form a larger pattern when connected
> Natural progression where each presenter's insights become foundation for the next speaker's revelations
> Open in Word to personalize language, add your own examples, and practice your delivery style
> View your speaker notes

##### Follow-up prompts

Test your understanding

Practice articulating your findings out loud to catch unclear explanations before the actual presentation. Use voice mode on your mobile device to transcribe your presentation out loud and receive feedback.

I'm going to present my main findings as I would during the actual presentation. Tell me if my explanation is clear, if I'm missing important nuances, or if I should emphasize different aspects.

Refine specific slides

Iterate on the first output, by requesting alternative approaches for sections that aren't communicating effectively.

Slide 7 feels cluttered and the data visualization isn't clear. Here's what I want to communicate: [your idea]. Can you suggest three different visual approaches? I'll pick the one that fits best.

Prepare for Q&A

To ensure you're well-prepared for your presentation, ask Claude to help you anticipate potential questions so you can develop your thinking and practice responses beforehand.

Based on this presentation, what questions might professors ask? What are potential counter-arguments or opposing viewpoints I should prepare to address? I'll give you my responses and you can help me strengthen my answers.

##### Tricks, tips, and troubleshooting

Start with what you can't explain

When preparing for a presentation, tell Claude which parts of your own research you find hard to explain clearly. Claude can help you articulate complex concepts with clear language and relevant analogies.

Prevent formatting issues

Claude can make formatting errors, so explicitly mention to check for mistakes in your prompt. Ask Claude to verify no text or elements overlap and to use appropriate font sizes to prevent overcrowding on slides.

Use Claude for the heavy lifting

Let Claude quickly outline important sections and save you time that may have been spent copying and pasting content. After the first pass, use Claude to iterate on larger structural changes while tweaking colors and smaller details yourself.

Work iteratively

If the output isn't quite right, be specific in your request to Claude about what to change. Claude can regenerate sections, adjust color schemes, or restructure content based on your feedback.

Ready to try for yourself?

Work with Claude to understand how to best structure your research so you can present with genuine understanding and clarity.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Create custom course materials

- Author: Anthropic
- Category: Education
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/create-custom-course-materials

##### Describe the task

Claude can process visual content and translate mathematical notation into proper LaTeX syntax, which allows you to focus on refining pedagogy rather than wrestling with typesetting commands and box formatting.

Describe the kind of course materials you want Claude to create using your handwritten notes and course objectives.

I'm a math professor converting my handwritten integration notes into a professional course materials. I have:

Handwritten notes with equations

A typed outline of topics

Craft a professional-looking LaTeX document, resembling a published textbook page with colored boxes and precise equations, then convert it to PDF.

##### Give Claude context

To begin, provide context needed to create your course content.

Required context

Upload photos of handwritten notes or equations or any relevant existing course materials.

Click the (+) button in the chat bar to browse and upload your files, or alternatively, drag and drop files into the chat box area.

Handwritten notes

JPEG

Class syllabus

PDF

Handwritten notes

JPEG

Optional context

Enable Extended Thinking for more complex tasks, like working with mathematical content, and for creating high quality outputs, like compiling LaTeX documents into PDFs.

Extended Thinking

##### What Claude creates

Claude generates a complete LaTeX document ready to print as a PDF with professional formatting, colored boxes, formulas and typography ready for students.

From Claude:

> I've created your professional calculus textbook chapter on Integration Techniques with the visual design you requested.
> Documents Created:
> LaTeX Source Code
> View calculus-integration-chapter.tex Complete LaTeX document with all the packages configured for colored boxes, professional fonts, and mathematical notation. You can edit this directly or use it as a template for additional chapters.
> Compiled PDF
> View calculus-integration-chapter.pdf 6-page professional textbook showing the final formatted result with all visual elements rendered.
> The document compiles cleanly and matches the visual quality of published calculus textbooks. All your whiteboard content has been converted to proper LaTeX with the colored boxes and professional design you wanted.
> View your PDF

##### Follow-up prompts

Enhance visual design

Add additional design elements beyond the basics—margin notes, visual hierarchies, call-out boxes. Claude applies design thinking to make content more functional and engaging.

Add margin notes with key insights, a visual table of contents at the chapter start, and use different shading for 'Quick Check' boxes where students can test understanding before moving forward.

Generate matching problem sets

Create practice materials that complement educational content. Claude generates exercises organized by difficulty with appropriate scaffolding or solution frameworks.

Create a separate homework assignment document with 15 integration by parts problems organized by difficulty. Include worked solution templates showing the u and dv selection, but leave the actual integration steps blank for students to complete.

##### Tricks, tips, and troubleshooting

Explicitly specify certain visual elements

For a polished, publisher-quality look, tell Claude to use the tcolorbox package for colored theorem and example boxes, instead of standard LaTeX rectangles. The package gives you control over colors, borders, rounded corners, and spacing that makes materials look professionally typeset.

Activate design excellence through framing

Use specific prompting techniques to avoid default outputs. Instead of "create a LaTeX document," say "design this like a premium calculus textbook from a major publisher" or "match the visual sophistication of Stewart's Calculus."

Use projects for consistency across chapters

If you're converting multiple chapters, create a Project that maintains context across conversations. Claude remembers your visual preferences, theorem numbering scheme, color choices, and formatting standards.

Ready to try for yourself?

Use Claude to turn your handwritten notes and whiteboard lectures accessible to every student with professional, text-book quality materials.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Practice case interviews with feedback

- Author: Anthropic
- Category: Education
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/practice-case-interviews-with-feedback

##### Describe the task

Claude's ability to extract data from case materials, build financial models, and analyze your work allows you to practice cases and receive feedback. Let Claude take care of repetitive data entry and spreadsheet organization, so you can focus on the strategic thinking.

Upload your practice case study and tell Claude what you're working toward, whether that's interview prep, skill development, or learning proven frameworks.

I'm practicing for consulting interviews. Set up this practice scenario for me—using case I've uploaded, extract the data into an spreadsheet model with formulas and frameworks. Then, tell me what questions I should focus on.

After I finish my analysis and write my recommendation, I'll share it for feedback. Review it like a senior partner would: check my numbers, evaluate my logic, and tell me specifically what needs improvement.

##### Give Claude context

To receive tailored practice materials, provide Claude with your case materials for context.

Required context

Upload your practice study files so that Claude can analyze the case, find relevant data points, and build the tools you need to practice effectively.

Practice case problem

PDF

Practice case problem

PDF

Optional context

Turn on Extended Thinking so Claude can spend more time building high quality outputs and reasoning through complex problems.

Extended Thinking

##### What Claude creates

Claude builds a complete practice environment: a spreadsheet model with extracted data and analytical frameworks, plus structured guidance on what to analyze and how to approach your recommendation.

From Claude:

> I've set up your complete case practice workspace. Here's what I've created:
> 1. Financial Analysis Model
> Your spreadsheet includes:
> Data extraction sheet: All key metrics from the case (revenue, costs, market data, customer segments) organized and labeled
> Calculation sheets: Profitability analysis with breakdown by business line, margin calculations, and growth projections
> Framework templates: Pre-built structures for break-even analysis, market sizing, and competitive positioning
> Scenario analysis: Adjustable assumption cells so you can test different strategies
> Dashboard summary: Key findings and metrics that should drive your recommendation
> 2. Your Practice Guide
> Key Questions to Answer:
> What's driving the current profitability issue? (Use the data to quantify)
> Which business segment offers the best growth opportunity?
> What are the risks and how do you mitigate them?
> What does success look like in 12 months?
> Analyses You Should Complete:
> Profitability breakdown by product line (the data's ready in your model)
> Customer segment economics (CAC vs. LTV by segment)
> Competitive positioning (use the market data I've extracted)
> Growth scenario modeling (adjust the assumptions and see impact)
> Next Steps:
> Work through your analysis using the Excel model—test scenarios, identify patterns in the data, and develop your strategic point of view. Once you've written your recommendation (even if it's rough), share it with me and I'll review it with senior partner-level feedback on both your analytical approach and strategic reasoning.
> I'll look for: analytical rigor, logical structure, data usage, strategic insight, and practical implementability.

##### Follow-up prompts

Compare your approach to alternative solutions

Ask Claude to describe other valid approaches so you can understand new ways to solve the same case. This helps to identify gaps in your methodology and expand your analytical toolkit.

What would a different but equally strong approach look like? Show me an alternative analytical path I could have taken.

Dive deeper into certain frameworks

Learn specific analytical techniques and how to apply them effectively when being tested or under pressure.

Walk me through how to use a profitability tree for this case. What should I be calculating at each branch? Show me what insights I'm looking for at each level.

Request a review on your work

Get specific feedback on logical gaps, weak conclusions, or missing analysis before you finalize your recommendation.

Here's my draft recommendation for the restaurant expansion case: [paste your analysis]. Is my logic sound? What assumptions am I making that I haven't tested? What would make this recommendation stronger?

##### Tricks, tips, and troubleshooting

Practice different case types

Use Claude to generate different types: profitability cases, market entry, growth strategy, pricing cases. This variety will enhance your learning by exposing you to different patterns and frameworks.

Store practice cases in a Project

Create a "Case Practice" Project and keep all your work there. You can compare across cases and see your progress over time. With Memory in Projects, Claude can remember and track your level of understanding to give more targeted feedback—like identifying which concepts or frameworks you often struggle with.

Enable Extended Thinking for detailed reviews

When you want thorough feedback on a complex recommendation, turn on Extended Thinking before asking. You get deeper analysis of your logic and more nuanced suggestions.

Ready to try for yourself?

Whether you're preparing for interviews at top consulting firms or simply building your strategic problem-solving muscles, the best way to improve is to practice with feedback. Upload a case PDF and start.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Plan your career path

- Author: Anthropic
- Category: Education
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/Plan-your-career-path

##### Describe the task

Claude brings deep knowledge of job markets, industry trajectories, and skill trends that aren't obvious from job postings alone. Paired with your resume and goals, this expands your career horizons while developing the strategic thinking skills to navigate future transitions.

Tell Claude about your career goals and provide your resume—it will map out a strategic path forward.

I'm a sophomore at UC Berkeley targeting these roles:

Associate Product Manager at a music streaming company - https://musicstreaming.com/careers/apm

Product Designer at a design collaboration platform - https://designplatform.com/careers/designer

UX Researcher at a travel platform - https://travelplatform.com/careers/researcher

After analyzing my resume against these roles, build:

Action Tracker (Google Doc): Forward-looking planner showing what to do next. Include skill gaps with projects to build, timeline with semester/year/grad milestones, networking targets, learning roadmap, and local resources. Tight spacing, scannable, built for weekly planning.

Skills Portfolio Log (Excel): Backward-looking evidence bank showing what I've done. Log completed projects with metrics, skills inventory with proof points, quantified achievements, learning completions, and STAR stories tagged by competency. Built for mining resume bullets and cover letters.

##### Give Claude context

Equip Claude with your career materials and enable the tools it needs to analyze real-time job markets and provide strategic, personalized recommendations.

Required context

Toggle on the Google Drive integration to give Claude access to your resume.

The Google Drive integration grants Claude access to your resume as a working document, ensuring it's always updated with your current information, rather than uploading it as a static PDF.

Google Drive

Resume

DOC

Resume

DOC

Optional context

Turn on Extended Thinking to allow Claude extra time to reason through your career planning and produce high quality outputs.

Make sure Web Search is enabled so Claude can search the web for current information.

Extended Thinking

Web Search

##### What Claude creates

Claude will analyze your resume against your target jobs and create two planning documents: an action-oriented roadmap and a detailed skills tracking system—both professionally formatted and built for ongoing use.

From Claude:

> Perfect! I've created a complete career planning system for you. Here's what I built:
> Career Action Tracker (DOCX) Forward-looking planning tool - Dense, scannable, built for weekly review:
> Target Roles Analysis: Side-by-side gap analysis for APM (music streaming), Product Designer, and UX Researcher positions with color-coded priority levels
> Skill-Building Projects: 5 concrete projects with timelines and status tracking:
> Music Mood Predictor (Python/ML - Feb-Mar 2025)
> SQL for Product Analytics (Jan-Feb 2025)
> PRD: Campus Discovery Feed (Mar 2025)
> Design System Component (Apr 2025)
> Travel Survey Research (Summer 2025)
> Timeline & Milestones: Semester-by-semester roadmap from Spring 2025 → Graduation May 2027 with critical deadlines
> Networking Strategy: Target companies (Spotify, Figma, Airbnb, SoundCloud) with specific contact angles and status tracking
> Learning Roadmap: 5 key topics (SQL, PRDs, A/B testing, Statistics, Design Systems) with time estimates and checkboxes
> Local Resources: Berkeley-specific on-campus resources and Bay Area networking events
> Skills Portfolio Log (XLSX) Backward-looking evidence bank - 5 comprehensive tabs:
> Project Log: 5 completed projects with metrics, tools, deliverables, team size, and portfolio links
> Skills Inventory: 19 skills across categories with proficiency levels (color-coded), proof points, and evidence. Includes: Design Tools (Figma, XD, Miro, Canva), Research Methods (interviews, usability testing, surveys), Technical Skills (Python, SQL, JavaScript, HTML/CSS), Soft Skills (presentation, collaboration, writing)
> Quantified Achievements: 12 resume-ready bullets with context and metrics
> STAR Stories: 7 detailed behavioral interview stories mapped to competencies (Problem Solving, Leadership, Ambiguity, Collaboration, Feedback, Data-Driven, Initiative)
> Learning Log: 12 completed/in-progress courses, books, and workshops with dates and certifications
> Both documents are dense, functional, and interconnected - the tracker tells you what to build next, the portfolio logs what you've already done for easy mining when writing applications.
> View your Career Action Tracker

##### Follow-up prompts

Prepare for coffee chats

Come prepared with informed questions and connect your experience to what matters for that conversation. Ask Claude to help research the role context, company, and industry.

I'm meeting a product manager from the streaming company next week. Research the company's product philosophy and competitive positioning, and then create a prep sheet with questions to help me understand their challenges, as well as aspects of my background that are important to highlight.

Draft differentiated application materials

Claude can teach you how to adapt your materials for different roles and what makes them effective.

Using my portfolio log, show me how to adapt my resume for PM, design, and research roles—what should I emphasize for each?

Update with new goals

Claude can revise your career plan when priorities shift or new opportunities emerge, maintaining the structure while adapting content to changed circumstances.

I just discovered UX writing roles that combine my interests. Can you analyze this job posting and update my action plan to include this career path?

##### Tricks, tips, and troubleshooting

Understand AI's role in your target career

While exploring your career path, learn how AI is already reshaping that field. The Anthropic Economic Index lets you see AI adoption patterns across hundreds of occupations—revealing whether people in your target roles are using AI to augment their work (collaborating with AI as a thinking partner) or automate tasks (delegating routine work entirely).

Understanding this distinction helps you build the right skills: roles heavy on augmentation require strong judgment and creative direction, while automation-focused work demands technical fluency in managing AI systems. Use the job explorer to investigate your target occupations, then ask Claude to help you identify which skills will matter most as AI transforms the field.

Use styles in your career conversations

Create a custom style to shape how Claude engages with your questions. For example, set a style that responds like a career counselor—when you express doubts, Claude asks clarifying questions; when you propose ideas, Claude helps you think through trade-offs. This back-and-forth refines both the plan and your own thinking. Go to "Use style" in the search and tools menu, then "Create & edit styles" to describe the kind of conversational partner you need for career decisions.

Track your ongoing career work

Create a Project and upload your resume, action tracker, and skills log once to the Project Knowledge. Every conversation in that Project automatically has access to everything—you won't need to re-upload or re-explain context. Claude's Memory feature allows it to learn from your conversations within a project, remembering your career priorities, target roles, and preferences to build upon previous discussions.

Research your target roles and companies

Use Web Search when you need quick, specific answers to ground your planning—like details on target companies, recent industry events, or potential skill-building programs. For more in-depth analysis, enable Research in the chat settings. Rather than piecing together information yourself, Research searches across your tools and the web to deliver a thorough report with source citations.

Ready to try for yourself?

Work with Claude to discover how to navigate your ideal career path and create a plan tailored to your experience and goals.

Open artifact in new windowOpen artifact in new window

↑ back to top


### Nonprofits (12)

#### See your theory of change in chat with Claude

- Author: Anthropic
- Category: Nonprofits
- Model: Sonnet 4.6
- Source URL: https://claude.com/resources/use-cases/see-your-theory-of-change-in-chat-with-claude

##### Describe the task

Most nonprofits have a theory of change somewhere, either implicit in how the team talks about the work or drawn up once for a funder and rarely revisited. The boxes in a logic model are usually easy to fill in. What's harder, and where programs tend to fall apart, are the arrows between those boxes, because each arrow rests on assumptions that rarely get written down. Claude can draw the whole chain inline as you describe your program, making every arrow clickable so you see what each link is actually assuming, and the act of clicking through them is often the first time those assumptions get stated plainly.

Here a program officer runs a youth mentoring program and wants to see where the logic might be thin before the next evaluation conversation. Claude draws the chain from inputs to graduation rates, and clicking any arrow surfaces what has to be true for that step to hold.

I run a youth mentoring program. We pair high schoolers with adult mentors for weekly meetings over a year, and the goal is higher graduation rates. Show me our theory of change, and I want to be able to click the arrows between boxes to see what assumption each one is riding on. Where are the weak links?

##### Give Claude context

No files are needed for this. A sentence or two about who you serve, what you do, and what outcome you're aiming for is enough for Claude to fill in the causal logic between, and asking "where are the weak links" in the prompt tells Claude to focus on the arrows rather than just drawing boxes.

Required context

Nothing to upload.

Optional context

If you have a formal logic model or a paragraph from a grant narrative handy, paste it so the chain gets built from your framing rather than a generic one. That said, starting vague often surfaces assumptions you didn't realize you were making.

##### What Claude creates

Claude draws your program's causal chain as five connected boxes running left to right, with every arrow between them clickable. The boxes will look familiar since they're the standard logic model categories, but the arrows are where the real work happens. Click one and a short note surfaces naming the assumption that link depends on, which is often the first time you've seen it written down.

##### Follow-up prompts

Click an arrow to go deeper on one link

Click any arrow and Claude expands on what's underneath it, naming the assumption, the things that typically break it, and what early signal would tell you whether it's holding.

Focus on the link between contact hours and stronger school connection. What would have to be true for that to hold, and what would the early warning signs be if it isn't?

Ask Claude to redraw with one thing added

Describe a change to the program and Claude redraws the chain with the new component slotted in, surfacing the assumptions you've just introduced alongside the ones you already had.

Redraw this with a family engagement component added alongside the mentoring. What new assumptions does that introduce, and does it change any of the existing arrows?

Ask Claude to turn the weak links into a measurement plan

Claude takes the assumptions it flagged as shakiest and proposes one concrete thing to track for each, turning the theory of change into a data plan you can bring to an evaluation conversation.

For each of the arrows you flagged as weak, give me one thing I could measure this year to know whether the assumption is holding.

##### Tricks, tips, and troubleshooting

How you word your prompt shapes what you get

Asking "where are the weak links" is what gets you clickable arrows with assumptions under them rather than just a static diagram. A plain "draw my theory of change" tends to produce the boxes without the stress-test. The same phrasing works on any chain of cause and effect, whether that's a policy argument, a product strategy, or anything where the steps sound right but haven't been pushed on.

Check the visual against your own understanding

The assumptions Claude surfaces are a reading of your program, not a verdict. If Claude marks an arrow weak that you've got solid data on, that's useful confirmation. If Claude marks strong an arrow you've been privately worried about, it's worth telling Claude what you've seen so the note under that arrow can be rewritten around your evidence.

What to do with the visual next

Hover over the chain for options to copy it as an image for a slide or save it as an Artifact if you'd reopen it later to click through again. You can also ask Claude to write the narrative version, which turns the boxes and arrows into paragraphs and gives you a starting draft for the logic model section of your next proposal.

Ready to try for yourself?

Try it on the program you run but have never drawn. Describe it in a sentence or two and let Claude show you which arrows are carrying the most weight. Hover over the chain for options to copy an image or save it as an Artifact.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### See what your campaign goal actually requires

- Author: Anthropic
- Category: Nonprofits
- Model: Sonnet 4.6
- Source URL: https://claude.com/resources/use-cases/see-what-your-campaign-goal-actually-requires

##### Describe the task

Every development director has built a gift pyramid at some point, usually in a spreadsheet the week before a feasibility study. The tiers themselves are simple enough to fill in, but what the spreadsheet tends to hide is the prospect math sitting behind each tier. Closing three gifts at the $100K level means having nine to twelve qualified prospects at that level, and most mid-size organizations have four or five. That gap is the actual feasibility question, and it's the number that doesn't show up until someone forces it to.

Here a development director is weighing a $2M capital campaign and wants to see the shape of what that requires before committing to a feasibility study. Claude draws the pyramid inline with the prospect math visible at every tier, and clicking any tier names the gap between what the campaign needs and what a typical organization that size actually has.

We're thinking about a $2M capital campaign. Show me what the gift pyramid needs to look like, meaning how many donors at each tier and how many qualified prospects I'd realistically need behind each one. Let me drag the goal and watch the shape change, and flag the tiers where I'm probably thin.

##### Give Claude context

A goal number is enough to get the shape. Claude uses standard campaign math (roughly a third of the goal from the top one or two gifts, tapering down through five or six tiers, with a 3-to-1 or 4-to-1 prospect-to-gift ratio at each level) to fill in the rest. Asking Claude to "flag where I'm probably thin" is what gets you the prospect gap called out rather than just the gift counts.

Required context

Nothing to upload. Type the numbers directly in your prompt.

Prospect list

XSLX

Prospect list

XSLX

Optional context

If you have a rough sense of how many qualified major gift prospects you actually have (or a wealth screening export), mention the numbers and Claude will compare your real pipeline against what each tier needs. Without that, Claude uses sector benchmarks for an organization your size, which is usually close enough to spot the gap.

##### What Claude creates

Claude draws a five- or six-tier pyramid with each tier showing three numbers: the gift range, the number of gifts the campaign needs at that level, and the number of qualified prospects that realistically takes. A slider above lets you drag the goal and watch every tier rebuild. Click any tier and a short note compares the prospect requirement against a typical pipeline, which is where the feasibility question actually lives.

##### Follow-up prompts

Click a tier to see the gap

Click any tier and Claude compares the prospect requirement against a typical pipeline for an organization your size, naming the gap and the two or three ways campaigns usually close it.

Focus on the $100K to $250K tier. How many qualified prospects do I realistically need, how many does a typical org my size have at that level, and what do campaigns usually do when the gap is that big?

Ask Claude to redraw with a constraint

The top of the pyramid carries most of the weight, so telling Claude your lead gift is capped changes everything below it.

Redraw this assuming our lead gift tops out at $250K. What does that do to the rest of the pyramid, and where does the pressure move?

Ask Claude to turn the pyramid into a cultivation timeline

A gift pyramid is a snapshot, but the feasibility question is really about time. Claude can stretch each tier across the months it typically takes to cultivate and close.

For each tier, give me a rough cultivation timeline, meaning how long from first real conversation to close, and lay it out so I can see whether an 18-month campaign is realistic given where our pipeline actually is today.

##### Tricks, tips, and troubleshooting

How you word your prompt shapes what you get

Asking for "qualified prospects I'd realistically need" is what surfaces the 3-to-1 math rather than just the gift counts. A plainer "show me a gift pyramid" tends to produce the tiers without the pipeline reality check, which is the spreadsheet you already know how to build. "Flag where I'm thin" tells Claude to do the comparison for you rather than just stating the requirements.

Check the visual against your own understanding

The prospect ratios Claude uses are sector rules of thumb, and your actual close rate might be better or worse. If you've run a campaign before and know your top-tier conversion is closer to 2-to-1, tell Claude and the prospect counts will tighten accordingly. The pyramid is a stress test, not a verdict on whether to launch.

What to do with the visual next

Hover over the pyramid for options to copy it as an image for a board or campaign committee deck. Save as Artifact if you want to bring it into a feasibility conversation live and drag the goal while stakeholders watch the prospect requirements move. You can also ask Claude to write the feasibility memo version, turning each tier's gap into a paragraph you'd hand to a consultant or board chair.

Ready to try for yourself?

Try it on the campaign number someone floated in a board meeting. Type the goal and let Claude show you what it actually requires at every tier, then click into the ones where you suspect you're thin.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### See budget futures side by side, in chat with Claude

- Author: Anthropic
- Category: Nonprofits
- Model: Sonnet 4.6
- Source URL: https://claude.com/resources/use-cases/see-budget-futures-side-by-side

##### Describe the task

Scenario planning is more tedious than hard, since it mostly comes down to opening the spreadsheet, cloning the tab, adjusting the numbers, and comparing. When the board call is in an hour, what you actually want is to look at multiple futures side by side and see at a glance which one hurts most. Tell Claude your budget in a sentence along with the thing that might change, and stacked bars stream in next to each other with a toggle between dollars and percentages. Clicking any scenario gets you a one-line read on what it actually means for the organization, which is usually the sentence you need for the board.

Here an ED might lose a major grant and needs to walk into a board call with a clear picture of what that looks like against flat and slight growth. Claude draws side by side, and the proportional cut to programs shows up as a flag before the ED has even clicked in.

We might lose our $400K federal grant next year. Current budget is about $2.1M: Roughly 60% programs, 25% ops, 15% fundraising. Show me three scenarios side by side: We lose the grant, we stay flat, it grows a bit. I want to flip between dollars and percentages, and if I click a scenario give me the one-line version of what it actually means.

##### Give Claude context

The numbers you type in the prompt are the context, and rough is fine since this is a shape comparison rather than a budget. A total figure with a percentage split across your main categories is enough, and if you know which categories are fixed (for example, "ops is mostly rent"), mention it so Claude holds that line steady across scenarios.

Required context

Nothing to upload. Type the numbers directly in your prompt.

Current budget

XSLX

Current budget

XSLX

Optional context

If the actual budget lives in a Google Sheet, connecting Google Drive lets Claude read the real splits. For the quick shape comparison you're after here though, the rough version is usually enough.

##### What Claude creates

Claude draws three stacked bar charts side by side with a toggle at the top that switches between dollar amounts and percentage splits. The dollar view shows you what gets smaller, while the percentage view shows whether the balance of the organization shifts or just shrinks proportionally. Categories that drop get flagged, and clicking any scenario opens a one-sentence note below that translates the numbers into what it would actually mean for operations.

##### Follow-up prompts

Click a button to redraw with a constraint

A proportional cut is rarely what you'd actually do, so the button holds one category fixed and redistributes the gap, showing you where the pressure really lands.

Rerun Scenario A but hold fundraising at the current dollar amount. Show me where the extra cut goes and rewrite the one-liner.

Ask Claude to stretch one scenario across time

A one-time cut looks different from a taper, so asking Claude to redraw with a second year can change the read on what's survivable.

What if the grant doesn't drop all at once? Say we lose half in year one and the rest in year two. Redraw Scenario A across two years and tell me if that changes the read.

Ask Claude to write the board-ready version

The bars show you the shape, but what the board needs is a sentence, and Claude can translate each scenario into what you'd actually say.

For each of the three scenarios, write me the one sentence I'd say to the board. The real tradeoff, not the numbers.

##### Tricks, tips, and troubleshooting

How you word your prompt shapes what you get

Asking for scenarios "side by side" with a toggle "between dollars and percentages" is what gets a comparison view rather than three separate charts. Naming the decision context ("board call in an hour") tells Claude this is about seeing the shape fast, not building a model you'd hand to finance. The same approach works on any multi-scenario question, whether that's staffing plans, program expansion, or anything else where you're weighing three futures and need to see which one hurts.

Check the visual against your own understanding

The proportional cut Claude draws first is a starting point rather than a recommendation, since you know which categories have slack and which are mostly fixed costs. If Scenario A's one-liner doesn't match your sense of where the pain would actually land, tell Claude what you're seeing and the next version gets closer to what you'd actually present.

What to do with the visual next

Hover for options to copy the three-bar comparison as an image for a board deck, or save it as an Artifact if you want to pull it up live in the meeting and click through scenarios with the board watching. You can also ask Claude to write the talking-points version as one sentence per scenario so you walk in ready.

Ready to try for yourself?

Try it on the budget question you've been re-cutting in a spreadsheet. Type your rough split and the thing that might change, and let Claude show you the scenarios side by side. Hover over the chart for options to copy an image for the deck.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### See why donor retention beats acquisition, in chat with Claude

- Author: Anthropic
- Category: Nonprofits
- Model: Sonnet 4.6
- Source URL: https://claude.com/resources/use-cases/see-why-donor-retention-beats-acquisition

##### Describe the task

Most fundraisers know that keeping a donor costs less than finding a new one, but the argument tends to stay abstract until you see the numbers compound. Claude can build a five-year donor projection with sliders for retention and acquisition, and a one-sentence note under the chart updates each time you drag to explain what the new numbers mean in plain terms. The part that usually surprises people is how much harder acquisition has to work to match even a small retention improvement, which becomes obvious after a few drags.

Here a development director wants to understand the retention math well enough to make the case internally. Claude builds a five-year projection with two sliders, and dragging retention up ten points turns out to do more than doubling the acquisition spend.

Everyone keeps telling me donor retention matters more than acquisition and I understand the argument but I don't really get it. Show me. Start with 100 donors and let me play with the numbers. I want to drag things and watch what happens.

##### Give Claude context

No files needed. The prompt deliberately starts with a round number because this is about feeling the shape of the math rather than modeling your actual base. The phrase "let me play with the numbers" is what signals Claude to build sliders rather than a static chart.

Required context

Nothing to upload.

Optional context

If you know your real retention rate and rough annual acquisition count, mention them in the prompt and Claude will start the sliders where you actually are. Round numbers work fine for the lesson though.

##### What Claude creates

Claude draws a five-year line chart with two sliders underneath, one for retention rate and one for new donors per year. Dragging either slider bends the curve and rewrites a one-sentence note below that explains what the new numbers mean in plain terms. What becomes obvious after a few drags is how much harder acquisition has to work to match even a modest retention improvement, and seeing that gap is most of the lesson.

##### Follow-up prompts

Click a button in the visual to add a layer

The button rebuilds the chart with a third slider for average gift size, switching the y-axis to revenue so you're watching dollars move instead of headcount.

Add an average gift slider and switch the y-axis to revenue. I want to see how retention plays out in dollars, not just donor count.

Ask Claude to find the threshold

There's a retention rate where piling on more acquisition spend stops making much difference, and Claude can find it and redraw the curve at that point.

At what retention rate does doubling my acquisition budget stop making a visible difference to the five-year line? Show me that curve.

Ask Claude to count the churn

The hidden cost of low retention is the sheer number of individual donors you cycle through just to stay flat, and Claude can surface that number.

Over five years at 45% retention and 30 new a year, how many total individual donors have come and gone just to keep me around the same count I started with?

##### Tricks, tips, and troubleshooting

How you word your prompt shapes what you get

Phrases like "let me play with the numbers" and "drag things and watch what happens" signal that you want sliders rather than a static chart. Claude reads verbs of interaction as a cue to hand you the controls, while a plainer "explain why retention matters" tends to produce the paragraph you've already read elsewhere.

Check the visual against your own understanding

The math here is clean, but real donor behavior isn't always as clean. Retention varies by gift size, by acquisition channel, and by how long someone's been giving, so the chart teaches you the shape of the argument rather than a forecast. Ask Claude to split the sliders by donor tier if you want a version closer to how your actual base behaves.

What to do with the visual next

Save as Artifact keeps the sliders live so you can pull it up in a board meeting and let someone else drag. Watching a board member discover the gap themselves tends to land harder than any slide you could build. Or ask Claude to write the one-paragraph version for your next fundraising plan.

Ready to try for yourself?

Try it on whatever fundraising math isn't landing as a spreadsheet. Tell Claude what you want to understand and let it build something you can drag. Hover over the chart for options to copy an image or save it as an Artifact.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Workflow improvement planner

- Author: Anthropic
- Category: Nonprofits
- Model: Sonnnet 4.5
- Source URL: https://claude.com/resources/use-cases/workflow-improvement-planner

##### Describe the task

Ask Claude to create an artifact that results in a comprehensive planning template that guides you through defining your workflow improvement opportunity.

I need help defining a workflow improvement opportunity at my nonprofit. Can you create a detailed artifact that asks me questions to capture all the important context about a process we want to improve?

The artifact should help me think through:

What the current workflow looks like

Where the pain points and bottlenecks are

What inputs and outputs are involved

What success would look like

Any constraints we're working within

Make this comprehensive enough that when I complete it, it provides me with a file that I can give back to Claude with all the information needed to design a practical solution. Include clear instructions at the end for how to use the completed template with Claude.

Format this as a well-designed artifact that's easy to fill out—with clear sections, fill-in-the-blank areas, and helpful prompts that make sure I don't miss important details.

##### Give Claude context

Required context

Upload files so Claude has real context to work with—not just a generic template.

monthly-donor-report-process

PDF

volunteer-intake-form

PDF

monthly-donor-report-process

PDF

Optional context

Enable Extended Thinking to help Claude design a more comprehensive and structured planning tool.

Extended Thinking

##### What Claude creates

Claude produces an artifact with fill-in-the-blank sections covering various aspects of workflow improvement planning. The template includes clear instructions for completion and detailed guidance on how to use your finished document with Claude to design solutions.

From Claude:

> I've recreated the Nonprofit Workflow Improvement Assessment tool! This is a comprehensive multi-step form that helps document workflow improvement opportunities and generates a structured prompt for Claude.
> View the Workflow Assessment
> The tool includes:
> 10 sections covering identification, current state, challenges, inputs/outputs, constraints, technical details, decision points, metrics, additional context, and review
> Progress tracking with a visual progress bar and percentage
> Smart form fields with conditional inputs (checkboxes that reveal text fields when selected)
> Navigation between sections with back/continue buttons
> Export functionality that generates a comprehensive, formatted prompt you can copy or download
> Professional design with a clean, nonprofit-friendly aesthetic using stone and amber colors
> The final section provides a formatted request that captures all the details entered throughout the assessment, ready to be used with Claude for workflow improvement recommendations.

##### Follow-up prompts

Get solution recommendations

Find out which parts of your process Claude can improve and what features make the most sense for your situation. See what the workflow would look like in practice with examples that match your needs.

I've completed the workflow improvement template. Please review my responses and help me understand: (1) How Claude can specifically address the challenges I've outlined, (2) Which Claude features would be most valuable (Extended Thinking, file creation, MCP connections), (3) A practical step-by-step workflow I can implement, (4) Any templates or examples I'll need.

Create implementation materials

Receive example prompts you can start using right away, along with any template files that would help. You'll also get instructions for connecting tools and a step-by-step guide to walk you through setup.

Based on the workflow improvement I've defined, create the specific materials I need to implement this: example prompts I'll use, any template files I should have, specific MCP connections to set up, and a step-by-step guide I can follow.

Refine for your constraints

Adjust everything for your real constraints—whether that's free tools only, limited tech expertise on staff, or team members who are new to AI.

The solution you suggested sounds great, but I need to adjust for our reality. We can only use free tools, we don't have technical expertise on staff, and I need this to work for someone with limited AI experience. Can you simplify this and make it more accessible?

##### Tricks, tips, and troubleshooting

Be specific about frequency and volume

When completing the template, don't just say "monthly reports." Specify: "15-page donor report, created by 5th of each month, typically takes development director 8 hours, uses data from 3 different spreadsheets." This specificity helps Claude design solutions that actually match your scale.

Include examples or samples if possible

The most effective workflow improvements come when Claude can see what you're working with. If you have a sample report (anonymized), a template you currently use, or example data, mention that in the template and upload those files alongside it. Claude designs better solutions when working from real artifacts.

Don't self-censor workflow problems

Be honest about what's broken. "Takes forever" isn't helpful, but "requires manually copying 200 donor records from Salesforce into Excel, then reformatting each one" gives Claude specific inefficiency to address. The more candid you are about pain points, the better the solution.

Think beyond time savings

Workflow improvements aren't just about speed. Note where quality suffers ("errors creep in during manual data entry"), where knowledge is trapped ("only Sarah knows how to do this"), where scaling fails ("works for 50 clients but breaks at 100"), or where stress peaks ("always a rush right before board meetings"). These insights lead to better solutions.

Connect your data sources for deeper solutions

If your workflow involves pulling data from Google Drive, coordinating via Gmail, or checking Google Calendar, enable those MCP connections before working with Claude on solutions. This lets Claude design workflows that directly access your systems rather than requiring manual file exports. Visit the MCP directory to see available connections for nonprofit tools.

Ready to try for yourself?

Start by getting your planning template, work through it thoughtfully to capture your workflow challenge, then bring it back to Claude to design a solution that fits your nonprofit's needs and constraints.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Grant proposal assembly line

- Author: GivingTuesday
- Category: Nonprofits
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/grant-proposal-assembly-line

##### Describe the task

Claude's ability to analyze documents and identify reusable patterns, paired with your grant writing expertise, lets you transform chaotic proposal archives into systematic content libraries that scale. Instead of rewriting similar content for each funder, you assemble proven modules and customize language to match each funder's priorities—shifting your role from drafter to strategist.

First, tell Claude about your core programs and upload any existing grant content. Claude will organize this into a modular library. Then, for each new grant opportunity, share the RFP and Claude will assemble a customized proposal using your library components, write fresh funder-specific sections, and create required attachments like budgets and logic models.

I need to build a grant proposal assembly line system to handle our 20+ annual grant applications more efficiently. We apply to foundations, government agencies, and corporate funders for youth programs, workforce development, and education initiatives. Start by creating a modular content library from the materials I'm providing: 3 recent successful proposals, our annual report, program one-pagers, and outcome data spreadsheets.

Step 1: Build the Content Library

Organize reusable modules including:

Program descriptions (3 versions: brief/standard/detailed for each program)

Need statements with current statistics and community data

Organizational capacity sections (history, leadership, fiscal health)

Evaluation methodologies and past outcome results

Standard attachments (board list, audit, IRS letter)

Save everything to Google Drive in a "Grant Content Library" folder with clear naming conventions.

Step 2: Create First Proposal

Now generate a proposal for the Morrison Foundation Youth Innovation Grant ($75,000) using the library. The RFP requires:

Executive summary (1 page)

Problem statement linking to community needs (2 pages)

Proposed program and innovation approach (3 pages)

Budget with detailed narrative (2 pages)

Logic model showing theory of change

Evaluation plan with specific metrics

Pull relevant modules from the library, customize language to emphasize "innovation" and "youth voice" (their key priorities), and create new content where needed.

Step 3: Set Up the Assembly System

Create templates and tracking tools:

Master tracking spreadsheet for all grants (deadlines, requirements, amounts, status)

Funder research template to capture priorities before writing

Module selection guide showing which content blocks work for different funder types

Budget template that auto-calculates indirect costs and matches funder categories

Email templates for submitting proposals and following up

Make this a true assembly line where I can produce proposals 60% faster by mixing and matching proven content.

##### Give Claude context

Connect Google Drive to store your modular library and access past proposals. Connect Gmail to draft submission emails and funder correspondence. This creates an integrated system where all grant content lives in one organized, accessible place.

Your assembly line works best when Claude can access your full grant history, pull successful language that's worked before, and organize everything systematically for future reuse.

Required context

Enable Google Drive integration: Enable Google Drive access so Claude can create organized folder structure for your content library, save modular components in easily accessible formats, pull from past proposals when assembling new ones, and store templates and tracking tools.

Enable Gmail integration: Connect Gmail so Claude can draft proposal submission emails with proper attachments, create funder follow-up sequences, and access funder correspondence for context.

Initial materials: Upload 2-3 successful past proposals, current program descriptions, organizational background documents, and recent outcome data or impact reports.

Enable code execution file creation: For producing Excel library and different formats.

Google Drive

Gmail

Past successful proposals

DOC

Program descriptions

DOC

Past successful proposals

DOC

Optional context

Consider adding additional inputs for a stronger, enhanced library:

Annual reports from past 2 years

Board-approved strategic plan

Audited financials or 990s

Program evaluation reports

Funder feedback on past proposals

Style guide or brand guidelines

Letters of support from partners

Web Search

##### What Claude creates

Claude builds a complete grant proposal assembly line system with three integrated components that work together to dramatically reduce writing time.

From Claude:

> 1. Modular Content Library (Google Drive)
> Organized folder structure with reusable components:
> Program Modules: Each program gets 3 versions (elevator pitch - 1 paragraph, standard - 1 page, detailed - 3 pages) with consistent messaging but varying detail levels
> Need Statements: Geographic-specific (city/county/state) and issue-specific (education gaps, workforce needs, youth development) modules with updated statistics
> Organizational Capacity: Governance (board strength), fiscal (financial health), programmatic (track record), and partnership (collaboration evidence) modules
> Outcome Data Bank: Impact statistics, success stories, testimonials, and evaluation results organized by program and year
> Boilerplate Library: Mission/vision/values, DEI commitments, sustainability plans, and standard certifications
> All modules are tagged with metadata (last updated, funder types, word counts) for easy selection.
> 2. Customized Grant Proposal
> Complete proposal for Morrison Foundation using the assembly approach:
> Executive Summary: Pulls mission from boilerplate + youth program description + innovation elements written fresh for this funder
> Problem Statement: Combines community needs module + youth statistics module + localized data for Morrison's geographic focus
> Program Description: Merges youth program detailed version + innovation components + customization emphasizing "youth voice" throughout
> Budget & Narrative: Creates detailed $75,000 budget with 15% indirect, narrative explaining cost-effectiveness, and alignment with Morrison's funding priorities
> Logic Model: Generates visual showing inputs → activities → outputs → short-term outcomes → long-term impact
> Evaluation Plan: Adapts standard evaluation module with Morrison-specific metrics they track across portfolio
> All sections maintain consistent voice while emphasizing funder priorities. Includes margin notes showing which modules were used.
> 3. Assembly Line Infrastructure
> Grant Tracking Dashboard (Excel): Master spreadsheet tracking all opportunities with deadlines, requirements, amounts, win rates, and time spent. Includes formulas for ROI analysis.
> Funder Intelligence Template: Research capture tool for each funder's priorities, past grants, review criteria, and preferences
> Module Selection Matrix: Quick reference showing which content modules work best for different funder types (foundation vs. government vs. corporate)
> Proposal Assembly Checklist: Step-by-step process for combining modules, customizing content, and ensuring compliance
> Email Templates: Submission emails, thank you notes, follow-up sequences, and award acceptance letters
> Time Savings Metrics: The system tracks that reusing modules cuts writing time from 40 hours to 16 hours per proposal. The Morrison proposal that would typically take 3 days took 1 day using the assembly line approach.
> EXECUTIVE SUMMARY
> Community Pathways Initiative requests $75,000 from the Morrison Foundation to launch the Youth Innovation Lab—a transformative program empowering 150 young people ages 14-19 to design and deploy community solutions using human-centered design and emerging technologies.
> Metro County youth face compounding barriers: 42% unemployment among 16-19 year olds, 67% lacking reliable technology access, and limited pathways to leadership. Yet these same young people possess intimate knowledge of their communities and untapped capacity for innovation. The Youth Innovation Lab transforms this potential into action.
> Our youth-driven model distinguishes this program from traditional youth services. Participants don't simply receive programming—they design it. Youth hold 50% of advisory committee seats, co-facilitate workshops, and make decisions about resource allocation. Over nine intensive months, they progress from community researchers to solution architects to change agents.
> Innovation is embedded throughout: Youth learn ethnographic research methods, prototype with 3D printers and digital tools, and iterate solutions based on community feedback. Last year's pilot yielded twelve youth-designed projects including a multilingual resource app and peer mental health platform—concrete innovations addressing real needs.
> With Morrison Foundation support, we will scale this proven approach, engage diverse youth populations, and create a replicable model demonstrating that young people aren't just the future—they're essential partners in solving today's challenges.

##### Follow-up prompts

Expand library with new modules

Add new reusable components as programs evolve and successes accumulate.

Create 3 new modules for our content library based on this quarter's outcomes: (1) COVID recovery impact statement showing how we've adapted programs, (2) DEI advancement section with new board diversity metrics, (3) Climate resilience component for environmental funders. Format them to match existing modules and save to appropriate library folders.

Generate batch proposals

Create multiple proposals simultaneously when similar deadlines hit.

Three grants are due next month. Using our content library, create customized proposals for: (1) State Education grant emphasizing academic outcomes, (2) Community Foundation grant focusing on equity, (3) Corporate foundation grant highlighting workforce preparation. Pull from the same program modules but customize framing, metrics, and language for each funder's priorities.

Optimize based on success patterns

Analyze wins and losses to improve your library.

Review these 5 winning proposals and 3 rejections from last year. Identify which module language correlates with success, what funder feedback suggests we should emphasize more, and which sections need refreshing. Update the content library modules based on these insights and create a 'winning language' guide for future proposals.

##### Tricks, tips, and troubleshooting

Version control prevents content drift.

As you customize modules for different funders, successful variations should flow back into your library. After each win, ask Claude: "Extract any improved language from this winning proposal and update the relevant library modules. Mark the version date and which funder responded positively." This ensures your library evolves based on what actually works.

Batch similar funders for efficiency.

When you have multiple education funders, ask Claude to create a comparison matrix first: "Analyze these 4 education funder RFPs and identify common requirements, unique elements, and priority differences." Then generate proposals in batches, making small adjustments rather than full rewrites. This can cut time by another 30%.

Track module performance metrics.

Add tracking codes to each module so you know which content contributes to wins. Ask Claude: "Create a tracking system where each module gets a unique ID. When we win grants, log which modules were used so we can identify our highest-performing content blocks." Over time, you'll know exactly which descriptions and need statements resonate most.

Set up funder intelligence alerts.

Before using the assembly line, gather intelligence: "Search for this funder's recent grants, board members, strategic plan, and stated priorities. How should we adjust our standard modules to align with what they actually fund versus what the RFP says?" This context makes customization more strategic.

Maintain freshness with quarterly updates.

Reused content can become stale. Set quarterly reviews: "Flag any modules older than 6 months. Update statistics, refresh examples, and add recent outcomes. Mark updated versions with the current date." Fresh statistics and recent success stories keep proposals competitive even when using library content.

Ready to try for yourself?

Transform grant writing from a time-consuming scramble into an efficient assembly line. Start by building your modular library with existing content, then watch as new proposals come together in hours instead of days. Every successful grant makes your library stronger, creating a compounding advantage that grows with each application cycle.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Develop a program toolkit

- Author: GivingTuesday
- Category: Nonprofits
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/develop-a-program-toolkit

##### Describe the task

Claude's ability to synthesize program logic and create structured frameworks, combined with your expertise, lets you rapidly develop comprehensive program documentation that typically requires significant coordination and synthesis.

I'm designing a tech workforce preparation program for young adults ages 18-26 from underserved Detroit communities. We'll serve 120 participants annually, helping them prepare for entry-level IT careers.

Program Structure:

6-hour virtual course covering IT career pathways, resume building, interview skills, and professional networking

4 one-on-one career coaching sessions to support job search and applications

Target Outcomes: 80% course completion, 60% job placement within 90 days, $40K average starting salary.

Create a comprehensive program design toolkit in Excel with: program description with mission and goals, logic model (inputs → activities → outputs → outcomes), SWOT analysis with recommendations, evaluation framework with indicators and data collection methods, resource planning (staffing, budget), and executive dashboard.

Make this consulting-grade with premium formatting, sophisticated design, and advanced Excel features. Use a professional color scheme—avoid default Excel colors.

##### Give Claude context

Extended Thinking helps Claude develop more sophisticated program frameworks by planning structure, considering implementation challenges, and testing logic connections before building the toolkit.

Required context

Enable Extended Thinking in the conversation settings before starting. This gives Claude space to think through your program's theory of change, identify potential evaluation challenges, and design a comprehensive framework that anticipates real world implementation needs. The extra reasoning time produces significantly more thoughtful program logic and strategic recommendations.

Provide Claude with information on your Theory of Change Model or share documentation that talks about your inputs, outputs, immediate outcomes, and goals. Consider sharing something in the form of: "If we do X → then Y happens → leading to Z impact".

Program Logic Model and Impact Framework

PDF

Program Logic Model and Impact Framework

PDF

Optional context

To get the most out of your tailored toolkit, consider providing Claude with the following:

Current program or service offerings demonstrating what you already offer and where this program fits

Organizations strategy, goals, and/or mission statement

Existing partnership information what could potentially be leveraged

##### What Claude creates

Claude generates a multi-sheet Excel workbook that serves as your complete program planning resource. Each sheet functions as a standalone tool while connecting to create an integrated framework.

From Claude:

> I've created a comprehensive program planning Excel workbook. Here's what's included across six interconnected sheets:
> Sheet 1: Executive Dashboard A visual summary of your tech training program with key metrics, timeline, and participant outcomes. Clean, professional layout shows annual capacity (120 participants), program phases, and target outcomes including 81% completion rate, 90% certification attainment, and 75% job placement.
> Sheet 2: Program Design Template Complete program narrative covering mission (empowering Detroit youth through tech careers), target population (ages 18-26 from underserved communities), theoretical framework (closing opportunity gap through training + certifications + internships), and detailed breakdown of all three phases plus wraparound services. Structured for easy adaptation into grant proposals.
> Sheet 3: Logic Model Visual framework mapping your inputs (budget, staff, partnerships) → activities (technical training, professional development, internships, support services) → outputs (120 enrolled, 97 completers, 87 certified, 73 placed in jobs) → short-term outcomes (industry certifications, IT employment, living wages, professional networks) → long-term impact (economic mobility, poverty reduction, Detroit talent retention). Color-coded by category with clear causal pathways.
> Sheet 4: SWOT Analysis Matrix Strategic planning tool. Each quadrant includes specific strategic recommendations for leveraging strengths, addressing weaknesses, pursuing aspirations, and mitigating threats.
> Sheet 5: Evaluation Framework Comprehensive measurement plan with 12 outcome indicators including: process measures, outcome measures, impact measures, and satisfaction measures. Each indicator shows target, data source, collection method, frequency, responsible party, and current status. Includes data validation dropdowns for tracking progress (On Track/Needs Attention/In Progress) with color-coded status visualization.
> Sheet 6: Resource Planning Detailed breakdown including staffing and operating budget.

##### Follow-up prompts

Create implementation timeline

Use this to create an implementation timeline that can be leveraged to get the program off the ground.

Add a new sheet with a detailed implementation timeline. Break down the first year into phases: planning/partnership development, staff hiring and training, participant recruitment, program launch, and ongoing operations. Include key milestones, dependencies, and decision points. Use Gantt-style visual formatting.

Create external facing program materials

Leverage for multiple use cases including external facing program resources

Using the program design toolkit, create external-facing materials to recruit participants and engage stakeholders. I need:

A one-page program overview for potential participants explaining what TechBridge offers, eligibility, benefits, and how to apply—make it visually appealing and accessible for young adults.

An FAQ document addressing common questions from participants, employers, and funders about program structure, expectations, costs, and outcomes.

Build data tracking system

Ensure you have proper measurement in place to track progress towards outcomes.

Design a participant tracking sheet that connects to the evaluation framework. Include fields for intake data, training progress, certification completion, job placement details, and retention milestones. Add dropdown menus for status tracking and automatic calculations showing progress toward outcome targets.

##### Tricks, tips, and troubleshooting

Open the actual Excel file to see the full sophistication

The preview in chat shows basic structure, but the file contains advanced formulas, conditional formatting with color scales, data validation dropdowns, frozen header rows, and professional typography that don't appear in previews. The real workbook is significantly more polished.

For tech workforce programs, specific details matter

Rather than generic "training program," describe the actual model: 20-week virtual instruction + paid corporate internships + industry certifications. Include employer partnership commitments, wraparound services provided, and realistic outcome targets. Specificity produces frameworks grounded in implementation reality rather than abstract concepts.

Iterate to perfect the design

After reviewing the file, refine specific elements: "Make the logic model more visual with icons," "Tighten the resource budget categories," "Add a theory of change narrative to Sheet 2," or "Create dropdown filters on the evaluation framework." Each round of feedback produces increasingly sophisticated results. Don't accept the first draft as final—push for portfolio-quality outputs.

Use integrated approaches for consistency

Most people create program planning documents separately and struggle with consistency. This integrated approach ensures your logic model aligns with your evaluation plan, your resources match your activities, and your SWOT drives strategic decisions. Everything connects. When you update one element, related sections stay coherent because they're in one framework.

Ready to try for yourself?

Whether you're launching a workforce reentry program, building an apprenticeship pipeline, or designing skills training for career changers, a well-structured planning toolkit transforms abstract ideas into actionable frameworks that guide implementation and demonstrate impact to funders.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Visualize program data

- Author: GivingTuesday
- Category: Nonprofits
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/visualize-program-data

##### Describe the task

Bring your data to life. Claude's ability to analyze patterns in your program data, combined with professional file creation tools, lets you transform raw statistics into visual stories that move stakeholders to action. Instead of presenting numbers in static spreadsheets, you can generate sophisticated dashboards, trend analyses, and impact visualizations that communicate program satisfaction and organizational performance at a glance.

The uploaded CSV contains quarterly metrics for six programs: Youth Nutrition Workshop, Adult Wellness Seminar, Senior Health Education, Community CPR Training, Mental Health First Aid, and Diabetes Prevention Program.

The data includes: participants enrolled and completed, completion rates, satisfaction scores (1-5 scale), Net Promoter Scores, pre/post-test averages, knowledge gains, repeat participants, referrals, volunteer hours, and cost per participant.

I need to create a comprehensive visualization suite for our board meeting next week. Create:

An Excel dashboard with multiple analysis sheets showing program satisfaction trends, learning outcomes, and quarterly comparisons. Use sophisticated formatting with professional color schemes, frozen headers, and clear data hierarchies. Include summary metrics and trend indicators.

A PowerPoint presentation (8-10 slides) that tells our impact story visually. Show satisfaction rankings, participation trends, knowledge gains by program, and key insights. Use premium design with charts that are immediately readable.

The board cares most about program satisfaction, completion rates, and demonstrable learning outcomes. They want to see which programs perform best and where we're improving quarter over quarter. Make the visualizations clear enough for quick comprehension but detailed enough to support strategic decisions.

Design these with consulting-firm quality and use colors that feel professional but warm (we're a health nonprofit, not a corporate consultancy).

##### Give Claude context

Connect your data sources and enable key features. Provide your program data so Claude can identify patterns, calculate key metrics, and create visualizations that highlight your most important outcomes. Claude will identify missing values, inconsistent formats, and outliers, then suggest fixes before visualization.

Upload your program data as a XLSX or CSV file with columns for metrics you track. Include time periods (quarters, months, years), program names, and the specific measurements that matter to your stakeholders. The more complete your data, the richer Claude's analysis and visualizations.

Required context

In addition to the raw data files containing the information you are looking to analyze and discuss, enable the Google Drive integration to provide Claude with more information.

Click the (+) button in the chat bar to browse files that contain additional information you may want to include:

Context about your audience Board members? Funders? Staff? This shapes visualization complexity and emphasis

Your key questions: What decisions will these visualizations inform? What patterns do you want to surface?

Enable Extended Thinking to improves how Claude analyzes patterns across multiple programs and time periods, resulting in more sophisticated dashboard designs

Make sure code execution and file creation is enabled in settings. This is essential for creating working Excel dashboards with formulas, charts, conditional formatting, and interactive elements.

Google Drive

Program Data and Metrics 2024

XSLX

Board Presentation Context and Audience Notes

DOC

Program Data and Metrics 2024

XSLX

Optional context

Think about what supplementary context would help Claude understand your organization's story: previous annual reports showing historical performance, grant proposals with promised outcomes you're now measuring, or board presentation slides demonstrating your current visualization style. These reference materials help Claude match your organization's voice and adapt visualizations to your existing reporting rhythms.

Recommended tools and features:

Google Drive Connector (optional): Access master files, templates, and historical reports without manual uploads through the drive document upload

Gmail Connector (optional): Pull campaign metrics from automated reporting emails● Slack Connector (optional): Retrieve team feedback and internal program assessments

##### What Claude creates

Claude analyzes your program data to identify trends, calculate performance metrics, and create a comprehensive visualization suite tailored to your stakeholder needs.

From Claude:

> Here's what I've created for your board presentation:
> 1. Excel Dashboard: Wellness_Reach_Program_Visualization_Suite.xlsx
> Executive Dashboard with annual key metrics and top performers
> Program Data sheet with all source data, frozen headers, and filters
> Satisfaction Analysis showing trends by program and quarter
> Learning Outcomes with pre/post test comparisons and effectiveness scores
> Quarterly Comparison with growth indicators and trend analysis
> 2. PowerPoint Presentation: Wellness_Reach_Impact_Presentation.pptx
> Title slide and 2024 overview with key metrics
> Program satisfaction rankings (horizontal bar chart)
> Quarterly participation trends (line chart)
> Knowledge gains by program (clustered column chart)
> Top performers showcase with detailed metrics
> Key insights and recommendations slide
> Key findings: Your programs achieved a 94% completion rate and 4.7/5.0 satisfaction score across 2,600+ participants. Senior Health Education and Diabetes Prevention Program lead in satisfaction (4.9/5.0). Community CPR Training shows the strongest growth trajectory with 24% enrollment increase from Q1 to Q3. Knowledge gains average 25+ points across all programs, demonstrating measurable learning impact.

##### Follow-up prompts

Add demographic breakdowns

Understand which communities you're serving most effectively.

Create an additional analysis sheet showing how satisfaction and completion rates vary by participant age group and zip code. This will help us understand which communities we're serving most effectively.

Focus on specific programs

Generate a deep-dive analysis for a specific program.

Generate a deep-dive PowerPoint specifically for our Mental Health First Aid program. Show quarterly trends, participant testimonial themes, and compare our results to national certification standards.

Leverage Research to Understand Benchmarks

Use Research mode to find nonprofit sector benchmarks for comparison.

Use Research mode to find nonprofit sector benchmarks for our key metrics. I need comparison points for: donor retention rates for organizations in our budget range ($500K-$1M annual), average gift sizes for similar mission areas, and program satisfaction scores for workforce development nonprofits. Then add these benchmarks as reference lines on our existing charts.

##### Tricks, tips, and troubleshooting

Open the actual files to see full design quality

File previews in chat show basic structure but miss the details that make these outputs impressive. The Excel dashboard contains working formulas, conditional formatting with color scales, frozen header rows for easy navigation, and carefully selected typography that doesn't appear in previews. Download and open both files to experience the full professional quality and continue editing with complete fidelity.

Treat your first version as a strong foundation, then refine iteratively

Claude's initial outputs establish excellent structure and professional design, but you'll spot opportunities for enhancement once you work with the real files. Request specific improvements: "Tighten the spacing on the trend analysis tab," "Add a chart showing donor acquisition cost over time," or "Include margin notes explaining what each metric means." Each round of targeted feedback produces increasingly polished results.

Push beyond defaults with specific design direction

Claude defaults to professional but conservative aesthetics. When visual impact matters, request elevated design: "Choose a sophisticated color palette with unexpected combinations that still feel trustworthy," "Use premium typography with strong hierarchy—this should look expensive," or "Design like you're preparing this for a major foundation's investment committee." Including phrases like "consulting-grade quality" or "portfolio-worthy execution" in your prompts activates higher design standards.

Consider which data stories matter most to different stakeholders

Board members want financial health and risk indicators. Major donors seek impact narratives and return on investment. Grant officers need evaluation data and sustainability metrics. Staff and volunteers respond to program performance and participant feedback. Before finalizing your visualizations, identify your primary audience and emphasize the metrics that resonate with their priorities.

Build incremental visualization capacity rather than attempting everything at once

Start with a single dashboard covering your most important program or campaign. Get comfortable with regular updates. Let it become part of your quarterly routine. Once that feels effortless, expand to additional programs, more sophisticated analysis, or audience-specific reports. Organizations that try to visualize everything simultaneously often abandon the effort when it becomes overwhelming.

Ready to try for yourself?

<p>Your program data already contains compelling impact stories. This visualization suite helps you surface those stories in formats that board members can understand at a glance, donors find inspiring, and funders see as evidence of your capacity. Start with the data you have today, see what patterns emerge, then build on that foundation.</p>

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Create a volunteer management system

- Author: GivingTuesday
- Category: Nonprofits
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/create-a-volunteer-management-system

##### Describe the task

Claude's ability to process complex information and synthesize frameworks lets you develop a volunteer management system with depth and sophistication. Instead of piecing together documents over weeks, you develop complete systems in hours.

I run a nonprofit that provides tutoring and reading programs to elementary students in underserved communities. We currently have 45 volunteers but our systems are fragmented—role descriptions are outdated, onboarding is inconsistent, and we track volunteers in scattered spreadsheets.

I need a complete volunteer program infrastructure that includes:

Role descriptions for:

Reading Tutors (work one-on-one with students weekly)

Reading Buddies (lead small group reading circles)

Event Coordinators (organize book fairs and literacy events

Administrative Volunteers (data entry, scheduling, communications support)

Onboarding system including:

Welcome packet with program overview

Step-by-step onboarding process document

Training requirements and timelines

Background check procedures

Volunteer handbook with policies

Communication templates for:

Initial welcome email

Training reminders

Monthly volunteer newsletters

Recognition and appreciation messages

Check-in and feedback requests

Tracking system:

Volunteer database with contact info, roles, hours, certifications

Hours tracking and reporting

Training completion tracker

Impact metrics (students served, hours contributed)

Our volunteers range from college students to retirees. Most commit 2-4 hours per week. We require background checks for all roles and role-specific training. We serve 200 students across 3 schools.

Create professional, comprehensive documents that make our volunteer program feel organized and legitimate. Use clear formatting, maintain a warm but professional tone, and include practical guidance that both volunteers and staff can follow easily. Make these documents detailed enough to use immediately without extensive revision.

##### Give Claude context

To create volunteer infrastructure that matches your organization's specific needs and brand, provide context about your program structure and existing materials.

Required context

Provide Claude with any relevant information:

Organization name, mission, and program overview

Specific volunteer roles and responsibilities

Current volunteer numbers and student/client populations served

Training requirements and background check policies

Any existing branding, logos, or style guides (if available)

Communication preferences and organizational culture

Current background check providers

Foundation Organizational Overview

PDF

Volunteer Program Handbook and Role Descriptions

PDF

Foundation Organizational Overview

PDF

Optional context

Google Drive (if you store volunteer materials there and want Claude to reference existing templates)

Gmail (if you want Claude to draft volunteer communications that integrate with your email system)

##### What Claude creates

Claude creates a complete volunteer program infrastructure with 4 core deliverables.

From Claude:

> I've created a comprehensive volunteer program infrastructure with 4 core deliverables:
> This document includes detailed descriptions for all four volunteer positions—Reading Tutors, Reading Buddies, Event Coordinators, and Administrative Volunteers. Each role includes purpose, key responsibilities, time commitment, qualifications, training requirements, and benefits. The descriptions are specific enough to set clear expectations while remaining welcoming to diverse applicants.
> Complete Onboarding Guide
> The onboarding guide provides a step-by-step process from initial inquiry through first assignment. It includes welcome materials, the full 4-week onboarding timeline with phase-by-phase activities, background check procedures, training modules, and a 15-page volunteer handbook covering policies, procedures, safety protocols, and program information.
> Communication Templates
> This template library includes 12 ready-to-use email and message templates covering welcome sequences, training reminders, monthly newsletters, check-in requests, appreciation messages, event invitations, and emergency communications. Each template includes customization guidance and suggested sending schedules.
> Volunteer Tracking System
> The Excel workbook provides a professional database system with five interconnected tabs: Volunteer Directory (contact info and roles), Hours Tracking (monthly logs with auto-calculations), Training Tracker (certification status with conditional formatting), Impact Dashboard (summary metrics and charts), and Reference Data (dropdown lists and lookup tables). The system includes formulas for automatic totals, visual indicators for status, and filtered views for easy reporting.
> Together, these documents create a professional volunteer management system that scales with your program growth.

##### Follow-up prompts

Customize for Additional Roles

Add specialized volunteer positions to your program

Add role descriptions for two new positions: Curriculum Developer (volunteers who create lesson plans and reading activities) and Family Engagement Coordinator (volunteers who lead parent workshops and family literacy events). Use the same detailed format as the existing roles.

Build Program Evaluation

Measure volunteer program effectiveness

Create an evaluation system for our volunteer program including quarterly volunteer satisfaction surveys, annual program impact assessment, volunteer retention metrics tracker, and program improvement planning template. Include specific questions and analysis frameworks.

Generate Volunteer Recruitment Materials

Create materials to attract quality volunteers

Design volunteer recruitment materials including a one-page program overview flyer, social media post templates with different angles (student impact, volunteer experience, community benefit), a volunteer interest form, and talking points for recruitment presentations. Make them compelling and specific about impact.

##### Tricks, tips, and troubleshooting

Maintaining consistency across documents

These interconnected materials reference each other—the onboarding guide mentions roles from the role descriptions document, templates use language from the handbook, and tracking systems align with defined roles. When you update one document, review related materials to maintain alignment. You can ask Claude to "update the training timeline in the onboarding guide to reflect the new 6-week schedule" when policies change.

Training staff to use the system

These documents are detailed enough that staff new to volunteer management can implement them. The onboarding guide walks through processes step-by-step, templates include customization instructions, and the Excel system uses clear labels and notes. Consider creating a simple "How to Use This System" overview document that orients staff to which materials to use when.

Scaling for program growth

Start with the core infrastructure for your current volunteer roles and numbers. As your program expands, ask Claude to "add materials for [new role]" or "expand the tracking system to include [new metric]." Building incrementally with Claude maintaining consistency is faster than creating everything at once or hiring consultants for each expansion phase.

Ready to try for yourself?

Transform your volunteer program from scattered systems to professional infrastructure. Claude creates the comprehensive, interconnected materials that make volunteer management scalable and effective.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Analyze fundraising performance

- Author: GivingTuesday
- Category: Nonprofits
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/analyze-fundraising-performance

##### Describe the task

Claude can analyze fundraising data across all your channels to identify which investments deliver the strongest returns, enabling you to allocate resources based on evidence rather than intuition.

Tell Claude about your fundraising channels, provide your performance data, and describe what insights you need to inform how you maximize your time and resources.

I run development for a regional nonprofit with 25-30 annual fundraising events plus ongoing email, direct mail, social media, and corporate sponsorship programs. I need to analyze which channels drive the best ROI to inform next year's $500K+ budget decisions.

I'm uploading our fundraising data from the past two years, broken down by channel and quarter. The data includes revenue, costs, donor counts, and event-specific details for our major galas, community events, and smaller donor appreciation gatherings.

Here's what I need to understand:

1. Which channels deserve increased investment based on ROI?

2. Where can we reallocate inefficient spending?

3. Which event types generate the best returns?

4. What's our donor acquisition cost by channel?

5. Which high-performing channels are currently underfunded?

Deliverable: Comprehensive Excel workbook with consulting-firm quality—I'm presenting this to our board, so visual sophistication matters as much as analytical rigor.

Required sheets:

Executive dashboard: KPIs, year-over-year comparisons, performance rankings

Channel details: Quarterly breakdowns with formulas for all key metrics

Strategic recommendations: Three-tier investment framework (grow/optimize/restructure)

Event analysis: Individual event performance since events consume 40% of our budget

Design requirements: Make an extreme effort on visual quality—premium formatting, sophisticated color palette (not Excel defaults), consulting-grade typography, conditional formatting, data bars, color scales, frozen panes, and filters. Every element should look intentional and polished and include professional charts/graphs showing channel comparisons and performance trends.

##### Give Claude context

Required context

Enable Extended Thinking so Claude can reason through your data patterns, identify non-obvious insights across multiple variables, and build a sophisticated analysis workbook with proper structure and formulas.

If you track your fundraising data in platforms like Microsoft 365, Benevity, or Blackbaud, connect the relevant MCP connector to pull current performance data directly. This eliminates manual exports and ensures Claude analyzes your most up-to-date information.

For most organizations, uploading exported CSV or Excel files works perfectly—just gather your revenue, cost, donor, and event data by channel and time period.

fundraising_data_2025.md

CSV

fundraising_data_2024.md

CSV

fundraising_data_2025.md

CSV

Optional context

Enable Extended Thinking so Claude can reason through your data patterns, identify non-obvious insights across multiple variables, and build a sophisticated analysis workbook with proper structure and formulas.

Extended Thinking

##### What Claude creates

Claude produces a comprehensive Excel workbook with multiple interconnected sheets featuring sophisticated visual design and advanced analytical features.

From Claude:

> The workbook includes:
> Executive Dashboard: High-level performance summary with key metrics including total revenue, ROI, donor acquisition costs, and retention rates. Features year-over-year comparisons with variance calculations, channel performance rankings with visual scoring, and sophisticated conditional formatting using color scales and data bars to highlight top and bottom performers instantly.
> Channel Details: Comprehensive quarterly breakdown for each fundraising channel with calculated metrics for net return, ROI, average gift size, donor acquisition costs, retention rates, engagement rates, and strategic notes. Includes working formulas that automatically update when you input new data, filterable columns for custom analysis, and color-scaled ROI visualization showing performance patterns at a glance.
> Strategic Recommendations: Three-tier investment framework organizing all channels into clear action categories—Tier 1 (Maximize Investment) for high-performing channels, Tier 2 (Optimize Efficiency) for channels needing cost improvements, and Tier 3 (Restructure or Sunset) for underperforming initiatives. Each tier includes specific action items, recommended budget shifts, projected revenue impact, implementation timelines, and priority levels with color-coded visual indicators.
> Event Performance: Event-specific tracking showing individual event ROI, attendee metrics, cost per attendee, revenue per attendee, and staff hour investments for all major galas, community events, and donor gatherings. Enables comparison across event types to identify which formats deliver strongest returns.

##### Follow-up prompts

Deeper Event Analysis

Better understand one form of fundraising in order to make data-driven decisions.

I want to compare our gala events vs. community events vs. small donor gatherings more systematically. Create an analysis showing average ROI, cost structure breakdown, revenue potential, and donor retention by event type. Help me decide which event categories to expand and which to reduce. Make it visually compelling with charts.

Add an Executive Briefing Document

Synthesize analysis to build transparency and gain buy-in.

Create a polished 2-page Word document pulling the key findings from this analysis. Focus on the three biggest opportunities for improving ROI, the dollar impact of recommended changes, and specific action items with timeline. Use sophisticated document design—think McKinsey deliverable quality with professional typography, strategic use of color, and data visualization elements. This goes directly to our board.

Build in donor lifetime value analysis

Understand the impact of different investment models by building out value analysis.

Build a forecasting model for next fiscal year based on the ROI patterns you've identified. Show me projected revenue by channel if we implement your reallocation recommendations, with quarterly targets, variance tracking, and confidence intervals. Include scenario toggles so I can model different investment levels.

##### Tricks, tips, and troubleshooting

Design language in prompts drives visual quality

Notice how the example prompt uses phrases like "premium formatting," "sophisticated design," "consulting-grade formatting," and "make an extreme effort on visual sophistication." Claude responds to these design cues with intentional color choices, professional typography, and elevated formatting. Without this design language, outputs default to functional but generic styling. When visual quality matters for stakeholder presentations, be explicit about design expectations.

Verify key financial calculations

Claude excels at analyzing patterns and structuring analysis, but always verify critical financial calculations before presenting to leadership. Check that formulas calculate correctly, revenue totals match your source data, and ROI calculations use your preferred methodology. Build verification into your workflow for any quantitative decision-making—especially when driving six-figure budget shifts.

Create a skill for recurring analysis

Once you refine this analysis approach, turn it into a reusable skill. Include your data structure preferences, key metrics you track, visual design requirements, and the specific insights your board needs. Then trigger this analysis quarterly or semi-annually by uploading new data—Claude applies the same sophisticated analytical framework automatically without rebuilding from scratch.

Ready to try for yourself?

Gather your fundraising data by channel and let Claude transform it into strategic insights with presentation-quality design. Open your analysis, review the recommendations, and start optimizing your fundraising portfolio based on evidence rather than intuition.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Generate an AI policy

- Author: GivingTuesday
- Category: Nonprofits
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/generate-an-ai-policy

##### Describe the task

Claude's ability to research regulatory requirements and nonprofit-specific considerations, combined with your knowledge of your organization's mission and values, lets you create comprehensive AI governance policies without expensive consultants.

I need to develop an AI usage policy for our nonprofit that serves vulnerable populations. We're a mid-sized organization (75 staff, 200 volunteers) focused on youth mental health services. We're starting to use AI tools for administrative tasks, donor communications, and some program operations, and we need clear governance.

First, use Research to find examples of AI policies from other nonprofits, particularly those serving vulnerable populations or working with youth. I want to understand what governance frameworks are emerging in the sector and what specific protections other organizations are implementing.

Key context about our organization:

We work with minors (ages 12-18) receiving mental health support

We handle sensitive health information, family data, and personal stories

Our donors expect transparency about how we use technology

Staff skill levels with AI vary widely

We're concerned about bias in AI systems affecting vulnerable populations

I'm uploading our existing data privacy policy and code of ethics so the AI policy aligns with our current standards.

Create a comprehensive AI usage policy that includes:

Governance structure:

Who approves AI tool adoption

Risk assessment framework

Oversight responsibilities

Data privacy and protection:

What data can/cannot be used with AI tools

Beneficiary information safeguards

Donor data protections

Data retention and deletion protocols

Appropriate use cases:

Approved applications (administrative, communications, analysis)

Prohibited uses (clinical decisions, automated beneficiary assessments)

Gray areas requiring case-by-case review

Staff guidelines:

Training requirements

Verification responsibilities

When to escalate decisions to humans

Documentation requirements

Ethical considerations:

Bias detection and mitigation

Transparency with beneficiaries and donors

Mission alignment assessment

Community impact evaluation

I need a comprehensive policy document (Word) and a simpler version for our website (md). Make these professional and board-ready with sophisticated formatting.

##### Give Claude context

Provide your existing organizational policies and connect relevant tools so Claude creates governance that fits seamlessly into your current infrastructure and aligns with your values.

Required context

Start by uploading any existing policies that should inform the AI governance framework - your data privacy policy, code of ethics, whistleblower policy, or donor bill of rights. These help Claude understand your organization's existing commitments and language.

These may include:

Existing data privacy or security policies

Organizational code of ethics or values statement

Donor privacy policies or stewardship agreements

Employee handbook sections on technology use

Any vendor management or procurement policies

Program overview or policy documents

Data Privacy and Security Policy

PDF

Organizational Code of Ethics and Values Statement

PDF

Data Privacy and Security Policy

PDF

Optional context

Make sure web search is enabled to help Claude gather relevant context about nonprofit AI governance best practices, common policy frameworks, and sector-specific considerations before drafting your customized policy.

Web Search

##### What Claude creates

Claude develops a complete AI governance system with two professional deliverables that work together.

From Claude:

> Done! The Word document provides your comprehensive policy framework with executive summary, detailed policy sections covering data privacy and ethical use, staff guidelines with clear dos and don'ts, governance structure defining roles and responsibilities, implementation timeline, and appendices with templates and forms. The document uses sophisticated formatting with a professional color palette, clear hierarchy, and consulting-grade polish suitable for board presentation.
> The Excel workbook becomes your implementation and tracking tool with tabs for: use case request intake and approval workflow, risk assessment matrix with scoring rubrics, training completion tracking with staff roster, vendor evaluation checklist for AI tool procurement, compliance monitoring with quarterly review schedule, and policy exception log. The workbook includes data validation dropdowns, conditional formatting highlighting risks, working formulas for scoring, frozen headers for navigation, and an executive dashboard summarizing governance status.
> Both deliverables are immediately usable and require minimal editing.
> The policy includes the following sections: Governance Framework, Data Privacy & Protection, Appropriate Use Cases, Staff Guidelines, Ethical Standards, and Implementation Plans.
> The implementation workbook includes: use case requests, risk assessment, training tracker, vendor evaluation, compliance monitoring, and exception logs.

##### Follow-up prompts

Develop staff training materials

Provide staff with a high level understanding of the AI policy and pull out information that is most important to them.

Create training slides and handouts covering: policy highlights, practical examples relevant to our work, common scenarios staff will encounter, and clear decision trees for when to use AI versus when to escalate to human judgment.

Add board presentation deck

Create a PowerPoint presentation to introduce this policy to the board.

Create a PowerPoint presentation I can use to introduce this policy to our board. Focus on: why AI governance matters for nonprofits serving vulnerable populations, key policy provisions and rationale, implementation timeline, how this protects our mission, and how we'll measure compliance.

Develop donor communication strategy

Draft messaging for donors explaining your approach to AI.

Help me draft messaging for donors explaining our approach to AI - emphasizing data protection, ethical use, and mission alignment. Include language for annual reports, website FAQs, and responses to direct questions.

##### Tricks, tips, and troubleshooting

Review jurisdiction-specific legal requirements

This policy template addresses common considerations like HIPAA for health information, but legal compliance varies significantly by location. Ask Claude to research regulations specific to your state or country: "What AI-related regulations apply to nonprofits in [your state/region]?" Then have legal counsel review the policy to ensure it meets your jurisdiction's requirements before board adoption.

Iterate the policy for your specific concerns

This creates a comprehensive foundation, but you know your organization's unique risks. After reviewing, ask Claude to strengthen specific sections: "Add more detail about volunteer use of AI tools" or "Expand the section on handling images of minors" or "Include specific language about our advocacy work and AI-generated content."

Create role-specific policy summaries

Different staff need different levels of detail. Ask Claude to create condensed versions for specific roles: "Create a one-page summary for program staff focused on beneficiary data protection" or "Draft guidelines for development team covering donor communications and prospect research." This makes the policy more actionable.

Build in policy review triggers

The AI landscape changes rapidly. The policy includes an annual review schedule, but also add triggers for interim updates: when adopting new AI tools, after policy violations, when regulations change, or based on sector guidance. Ask Claude to add a "Policy Amendment Process" section if you want to formalize this.

Start with approved use cases before restrictions

When presenting to staff, lead with what they can do with AI tools (donor communications, grant research, administrative tasks) before covering restrictions. This frames the policy as enabling responsible use rather than just limiting behavior. Claude can help you reorder sections if the default structure feels too restrictive.

Ready to try for yourself?

Create a framework that protects your mission, respects your community, and enables your team to use AI responsibly and effectively.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Write an impact report

- Author: GivingTuesday
- Category: Nonprofits
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/write-an-impact-report

##### Describe the task

AI can transform spreadsheets of outcomes into stories that resonate with donors, boards, and funders. By combining data analysis with narrative development, you get reports that both prove impact and inspire continued support.

I'm the Program Director at Bright Futures Learning Center, a nonprofit providing after-school tutoring and enrichment programs for middle school students in underserved Seattle neighborhoods. I need to create our annual impact report that will go to our board, major donors, and foundation funders.

I'm uploading our program data: student enrollment and demographics, attendance records, academic assessment results (pre/post test scores), volunteer hours, and our financial summary. We served 347 students this year across three locations.

For the report, I need:

An executive summary with our biggest wins and key metrics

Compelling data visualizations that show academic growth, attendance trends, and program reach

Narrative sections that tell the story of what we accomplished

Student demographics and community impact data

Financial overview showing how funds were used

A forward-looking section on next year's goals

Make this board-ready and donor-worthy. Use sophisticated design that matches the quality of professional nonprofit reports—this goes to foundation program officers who see dozens of these. Include charts and visual elements that make the data immediately clear. The tone should be confident about our achievements while staying authentic and mission-focused.

##### Give Claude context

Provide your raw program data so Claude can analyze outcomes, identify patterns, and build compelling narratives around real results.

Required context

Upload spreadsheets, databases, or documents containing your program metrics.

This typically includes: participant enrollment and demographics, attendance or engagement tracking, pre/post assessment scores or skill development measures, volunteer or staff hours, program satisfaction surveys, financial data (revenue sources, expenses, cost per participant), and any qualitative feedback from participants or families.

Participant Enrollment Demographics and Attendance

XSLX

Program Outcomes and Assessment Data

XSLX

Participant Enrollment Demographics and Attendance

XSLX

Optional context

Consider the following:● Enrollment & demographics spreadsheets: Student/participant counts by location, grade level, ethnicity, income level, or other relevant categories● Outcome measurement data: Test scores, skill assessments, attendance records, completion rates, or program-specific metrics● Financial summaries: Revenue by source, expense categories, cost-per-participant calculations● Qualitative data: Survey responses, testimonials, case study notes, or participant feedback● Historical comparison data: Previous year metrics to show growth or trends

##### What Claude creates

Claude analyzes your data to find the strongest evidence of impact, then creates a comprehensive report that tells your story through both numbers and narrative.

From Claude:

> Your impact report includes:
> Executive Summary: Opening section that highlights your biggest achievements, key metrics, and overall impact. Written for busy executives who need the highlights immediately.
> Program Overview: Clear description of what you do, who you serve, and how your programs work. Establishes context for readers unfamiliar with your organization.
> Outcomes & Impact: Data-driven section with tables and charts showing participant results. Includes before/after comparisons, year-over-year growth, and achievement against goals. Claude identifies your strongest metrics and presents them visually.
> Participant Demographics: Breakdown of who you served with relevant context about community need and reach. Demonstrates you're reaching your target population.
> Narrative Elements: Stories and quotes that bring the data to life. Claude weaves in context that helps stakeholders understand what the numbers mean in real human terms.
> Financial Overview: Transparent summary of revenue sources and how funds were used. Shows stewardship and sustainability.
> Forward-Looking Goals: Next year's objectives grounded in this year's learnings. Demonstrates strategic thinking and continuous improvement.
> The report uses sophisticated formatting with intentional typography, a cohesive color palette, professional data visualizations, and clear information hierarchy. Every section balances comprehensive data with scannable presentation—detailed enough for board members who want depth, visual enough for donors who skim.

##### Follow-up prompts

Add specific stakeholder versions

Ensure a unified voice while tailoring your output for various audiences

Create a foundation-focused version emphasizing measurable outcomes and cost-effectiveness, a donor version highlighting individual stories and community impact, and a board version with strategic insights and operational metrics.

Generate presentation materials

Convert this report into a 10-slide PowerPoint presentation for our board meeting.

Convert this report into a 10-slide PowerPoint presentation for our board meeting. Lead with impact, use visuals heavily, keep text minimal. Include the key data points but focus on story and achievement.

Create social media content

Pull out compelling statistics for shareable social content.

Pull out our 5-6 most compelling statistics and create social media posts. For each metric, write a short caption that explains why it matters. Make them shareable—the kind of content that helps donors understand our impact quickly.

##### Tricks, tips, and troubleshooting

Verify information before sharing with funders

Always verify critical metrics against your source records before distribution. Claude excels at analyzing and transforming data into compelling narratives, but always cross-check critical metrics. Correct information will help ensure stakeholder trust.

Upload raw data, not pre-summarized reports

Claude can handle messy spreadsheets, incomplete datasets, and varied formats. Providing the actual source data allows Claude to spot trends, calculate metrics, and create visualizations you might not have considered. If you have 500 rows of participant outcomes, upload all 500—Claude can find patterns across the complete dataset that wouldn't be visible in samples.

Specify your audience's priorities

Foundation officers care about cost-effectiveness and scalability. Board members need strategic insights and risk assessment. Individual donors respond to personal stories and community impact. Tell Claude who will read this and what matters to them. The same data tells different stories depending on who needs to be convinced.

Build incrementally for complex reports

If you're creating a 40-page annual report covering multiple programs, build in stages. First: "Analyze the data and create an executive summary with key metrics." Review that. Then: "Now develop the program outcome sections with visualizations." Then: "Add the financial overview and forward-looking goals." Staged development provides checkpoints and lets you redirect before investing in full execution.

Ready to try for yourself?

Your program data contains powerful stories about lives changed and communities strengthened. Turn those numbers into narratives that inspire continued support and demonstrate the real value of your work.

Open artifact in new windowOpen artifact in new window

↑ back to top


### Professional (17)

#### Create brand assets

- Author: Anthropic
- Category: Professional
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/Create-brand-assets

##### Describe the task

Claude's ability to read images, process design references and write code allows it to quickly generate visual materials that capture your preferred style across formats. Claude can turn ideas, handwritten sketches, or brand documents into custom assets and QR codes—ready to edit or print.

Tell Claude what materials you need and upload your branding guidelines so Claude can match your visual identity.

I need two things for my coffee shop, Morning Ritual:

1. Business card (3.5" × 2") with:

My contact info: 125 Hudson Street, New York, NY 10013, morningritualnyc.com

QR code to my website (make this with rounded corners instead of blocky squares—more organic and unqiue)

Print specs: 32pt cardstock, soft-touch coating, with bleeds and crop marks

2. Matching flyer (18" × 24") that I can:

Edit in the future if needed

Print professionally for our storefront

Match my branding guidelines document I've uploaded. Follow the typography, colors, and spacing exactly. The design should feel dawn-inspired with soft watercolor circles, paper grain, and organic dispersion with a premium, hand-crafted feel. Make sure no elements overlap or run off the page. Evaluate and grade your work to make sure all these standards are met. If there is room for improvement in your designs, iterate until you've reached success.

##### Give Claude context

Your brand guidelines document tells Claude the specific details to maintain visual consistency. This can include your typography choices (fonts, sizes, weights), color palette (hex codes and when to use each color), spacing rules (margins, padding, hierarchy), and aesthetic direction (mood, style, design principles).

Required context

Upload your brand or style guidelines so Claude can match your exact visual identity—typography, colors, spacing, and overall aesthetic.

In this case, the style guide is uploaded as a PDF.

Style guide

PDF

Style guide

PDF

Optional context

Turn on Extended Thinking for higher-quality file creation.

##### What Claude creates

Claude generates files that match your branding guidelines—ready to send to the printer or edit yourself.

From Claude:

> I'll create your Morning Ritual materials following your branding guidelines.
> Your deliverables:
> Business Card PDF – morning_ritual_business_card.pdf
> Print-ready 3.5" × 2" with 1/8" bleeds, crop marks, watercolor-style dispersed background circles (inspired by painterly aesthetics), paper grain texture, layered typography with letterpress-style depth, and an elegant QR code with rounded corners. Specs included for 32pt cardstock with soft-touch coating.
> QR Code – morning_ritual_qr.png
> High-resolution QR code with rounded corners for organic, elegant appearance. Link to your website.
> Promotional Flyer PDF – morning_ritual_poster.pdf
> Print-ready 18" × 24" with watercolor-inspired dispersed circles, paper grain texture, layered typography with depth, brand values, and complete contact details. CMYK color, 300 DPI, ready for professional printing.
> All materials feature painterly watercolor aesthetics with soft dispersed circles, paper grain texture for tactile feel, and layered typography that creates letterpress-style depth. Warm browns (#5F4738, #8B7355), cream backgrounds (#F9F7F3), terracotta and beige accents. No overlapping elements, proper spacing throughout, print-ready specifications included.

##### Follow-up prompts

Create a brand document for future work

After your design collaboration, instruct Claude to create a reference document from the insights shared throughout the chat. This transforms your conversation into reusable knowledge you can provide as reference when working with Claude in the future.

Based on our conversation and the materials you just created, write a comprehensive brand guidelines document that captures: color palette with exact hex codes and usage rules, typography specifications (fonts, sizes, weights, spacing), the watercolor and letterpress aesthetic principles, paper grain texture approach, and how to maintain this handcrafted quality. Save this so future conversations can reference it instead of the original files.

Extend your brand to digital

Ask Claude to digitize your existing print materials and develop new digital content to develop an online presence.

Create an HTML page that matches the aesthetic of these print materials—same watercolor circles, paper grain texture effect, layered typography. Include: hero section with the logo, menu with prices, location and hours, and the same elegant feel as the cards. Then walk me through how to deploy it on Netlify or GitHub Pages.

##### Tricks, tips, and troubleshooting

Prevent layout issues upfront

Include audit instructions in your initial prompt: "Make sure no elements overlap, nothing extends past the bleed area, all text stays within safe margins, and the QR code has clear space around it." This prompts Claude to review its work thoroughly on the first attempt, reducing the need for revisions.

Use reference files to bypass lengthy prompts

Upload brand styling documents and screenshots of designs you want to match rather than describing them in words. Tell Claude "match this visual approach" and it quickly interprets the aesthetic—typography style, color relationships, spacing rhythm, overall mood. Visual examples capture subtle qualities that are difficult to articulate in text.

Create a Skill for consistent quality

After refining these materials to your satisfaction, turn the workflow into a reusable Skill. Have a conversation with Claude about creating a skill that captures your specific branding approach, then upload your style guidelines and reference documents to it. Future design requests automatically apply this expertise without re-explaining.

Ready to try for yourself?

Bring your ideas to Claude and create brand materials you can edit or send to production.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Package your brand guidelines in a skill

- Author: Anthropic
- Category: Professional
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/package-your-brand-guidelines-in-a-skill

##### Describe the task

Skills let you package expertise, like your complete brand identity, for Claude to automatically apply across conversations. Upload your color palette, define your typography standards, and specify when to use which elements. Claude can then apply your brand guidelines automatically in any chat, whether it's for a quarterly report, client presentation, or internal spreadsheet.

Creating this skill takes minutes. To start, walk through your brand fonts, colors, and other stylistic choices. Ask Claude to structure the information into a reusable skill that activates whenever you need brand-consistent outputs.

I want to create a skill that applies our company's brand styling to any presentation, document, or spreadsheet I create in Claude. Here's what I need to encode:

Color Palette:

Dark: #141413 (primary text, dark backgrounds)

Light: #faf9f5 (light backgrounds, text on dark)

Mid Gray: #b0aea5 (secondary elements)

Light Gray: #e8e6dc (subtle backgrounds)

Orange: #d97757 (primary accent for important elements)

Blue: #6a9bcc (secondary accent)

Green: #788c5d (tertiary accent)

Typography:

Headings (24pt and larger): Poppins font, bold weight

Body text: Lora font, regular weight

Fallbacks: Arial for headings if Poppins unavailable, Georgia for body if Lora unavailable

Application Rules:

Apply Poppins to all slide titles and document headings

Apply Lora to body text and paragraphs

Use accent colors (orange, blue, green) for shapes, charts, and visual elements

Cycle through accent colors to maintain visual interest

Use dark color for primary text on light backgrounds

Use light color for text on dark backgrounds

Create a complete skill with proper structure that I can use whenever I need brand-consistent presentations. Include the SKILL.md file with clear instructions for when to use it and how it applies the styling.

##### Give Claude context

Upload any existing brand guidelines, style sheets, or design documentation to serve as examples that Claude can reference within the skill. Enable file creation and Skills in your settings so Claude can build the complete skill package with proper structure, code, and documentation.

Required context

Enable the Google Drive integration so Claude can access your brand reference file to further enhance your skill.

Google Drive

brand-reference-file

DOC

brand-reference-file

DOC

Optional context

Turn on Extended Thinking to help Claude make sophisticated decisions about when to apply which brand elements based on visual hierarchy and content importance.

Extended Thinking

##### What Claude creates

Claude produces a complete, working skill package with clear instructions for when the skill applies, brand color specifications with hex values, typography guidelines with fallback fonts, and implementation details. The skill activates automatically when you request your brand styling.

From Claude:

> I've created a comprehensive skill that will automatically apply your company's brand guidelines to every presentation, document, and spreadsheet you create in Claude.
> View your brand-guidelines.skill
> The skill includes:
> SKILL.md - The core skill document with complete brand specifications
> color-typography-specs.md - Detailed technical specifications with Python code examples
> usage-examples.md - Practical examples showing how the skill works
> brand_utils.py - Python utility module for easy implementation
> Your Brand System
> Color Palette:
> Dark (#141413) - primary text
> Light (#faf9f5) - backgrounds
> Orange (#d97757) - primary accent
> Blue (#6a9bcc) - secondary accent
> Green (#788c5d) - tertiary accent
> Plus mid gray and light gray for supporting elements
> Typography:
> Poppins Bold for all headings (fallback: Arial)
> Lora Regular for all body text (fallback: Georgia)
> How It Works
> The skill activates automatically whenever you:
> Create a new presentation, document, or spreadsheet
> Edit existing .pptx, .docx, or .xlsx files
> Request any business document creation
> You don't need to mention brand guidelines - it just works! Just ask for what you need:
> "Create a 10-slide presentation about Q4 results"
> "Write a project proposal document"
> "Make a budget tracking spreadsheet"
> And the brand guidelines are automatically applied with:
> Correct fonts and sizes
> Brand color palette
> Proper contrast ratios
> Professional spacing
> Accent colors in sequence
> Additional Resources
> I've also created helpful reference materials:
> View README - Complete package overview
> View Quick Reference - Color and typography at a glance
> Key Features
> Smart & Automatic:
> Triggers on document creation/editing without explicit commands
> Applies brand standards seamlessly
> Cycles through accent colors intelligently
> Comprehensive:
> Covers presentations, documents, and spreadsheets
> Includes Python code utilities for advanced users
> Provides fallback fonts when needed
> Professional Quality:
> WCAG AA accessible color contrasts
> Typography hierarchy that scales
> Consistent visual identity across all outputs
> Next Steps
> Install the skill - Upload brand-guidelines.skill to Claude
> Start creating - Just ask for documents normally
> Watch the magic - Brand guidelines apply automatically!
> You can also upload the brand PDF you mentioned if you'd like me to cross-reference or enhance the skill with additional assets from it. But as it stands, the skill is fully functional and ready to use with all the specifications you provided!

##### Follow-up prompts

Test the skill

Create new content and watch your brand apply automatically without specifying colors or fonts. Claude handles all visual styling decisions based on your uploaded guidelines, letting you focus on content rather than formatting details.

Create a quarterly business review presentation covering revenue growth, customer acquisition, and market expansion. Use our brand guidelines.

Update the skill

Make changes or add additional visual standards to your skill as your brand evolves. Simply tell Claude your desired output, and it will edit your Skills as your needs evolve.

Update my brand guidelines skill. Use the dark background with light text for all title slides, but keep content slides light. Make the heading font size 28pt instead of 24pt. Also, add our new product colors to the brand guidelines skill: Purple #8B7AB8 for premium features, Teal #4A9B9B for analytics content. These should be used in charts when presenting those specific topics.

Stack your skills

Skills are composable, meaning they can reference each other for Claude to use them together. Your ‘brand-guidelines’ skill can work with other skills you've created—like product-research or writing-standards—to produce work that's both visually sophisticated and aligned with your other requirements

Create a pitch deck for our new product launch. Use my brand-guidelines skill for formatting and apply the product-research skill to find relevant information.

##### Tricks, tips, and troubleshooting

Understand how progressive disclosure works

When Claude evaluates a task, it first scans skill metadata (the description at the top) to see if the skill is relevant. Only if it matches does Claude load the full instructions. Reference files load only when actually needed. This means you can have many skills available without overwhelming Claude's context.

Add bundled scripts for deterministic execution

Instructions allow interpretation variance. Scripts execute identically every time. If your brand skill says "apply orange accent #d97757," Claude interprets how to apply it. If your skill includes scripts/apply_brand_colors.py with exact RGB values and application logic, execution is deterministic. Use scripts for specific color application, file transformations, data formatting, or anything where consistency matters more than flexibility. Keep instructions for decision-making, creative choices, and context-dependent behavior.

Learn more about skill creation

When you ask Claude to create a skill, Claude is using a skill-creator skill under the hood. This skill teaches Claude how to package your workflow into proper SKILL.md format, organize your files correctly, and package everything into a ZIP file. You describe your process in conversation and Claude uses the skill-creator skill to handle the translation of "I want bullets here and prose there" into the proper structure. To learn more about creating skills in Claude.ai, see How to create a skill with Claude.

Ready to try for yourself?

Create a skill once, and Claude applies that expertise automatically. Start with something you explain often, like your brand colors or your preferred report format, and watch how the skill activates exactly when you need it.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Explore what Claude can do for you

- Author: Anthropic
- Category: Professional
- Model: Opus 4.5
- Source URL: https://claude.com/resources/use-cases/explore-what-claude-can-do-for-you

##### Describe the task

Most people start with Claude by asking a random question and hoping for the best. But Claude can do far more than answer questions, and the most useful capabilities depend on what you actually do every day.

This prompt gives you a personalized starting point. Tell Claude your role, and optionally give it access to your working documents. Claude will surface the features and workflows most relevant to your work, complete with example prompts you can try immediately.

I'm a product manager at a B2B SaaS startup. I mostly work on roadmap prioritization and customer research.

I'm new to Claude. How can I use you most efficiently? Can you give me 5 examples I can try right now, ideally things that would actually make a difference in my daily work. Surprise me with one of them!

I’ve given you access to my docs (I think) to help you understand better what I do. Thanks!

##### Give Claude context

The more context Claude has about your work, the more specific its suggestions become. Sharing your role is the minimum. Sharing your actual documents lets Claude tailor examples to projects you're already working on.

Required context

None. This prompt works with just a role description.

Optional context

Add specifics about your work: Mentioning your industry, team size, or daily tasks helps Claude prioritize the most relevant capabilities.

Connect Google Drive: If your documents live in Drive, Claude can pull relevant context without manual uploads.

Enable Extended Thinking: For a more thorough breakdown of capabilities and how they connect to your workflow.

Extended Thinking

Connectors

##### What Claude creates

Claude produces a personalized starter guide based on your role and documents. Each suggestion includes a specific example prompt you can try immediately. If you've shared documents, Claude references your actual projects and offers to demonstrate a capability on the spot.

From Claude:

> Let me take a quick look at your docs to give you examples that are actually relevant to your work.
> I found your PM docs. You're working on onboarding optimization with a focus on activation and retention. Here are 5 practical examples based on your actual work:
> 1. Synthesize customer interview themes
> You have interview notes from Marcus, and likely others. Paste a batch of interview notes and ask: "What are the top 3 friction points across these interviews? Include direct quotes as evidence." I'll find patterns you might miss when reading them one by one.
> 2. Stress-test your prioritization
> Your roadmap shows you're weighing "Skip Team Invite" vs "Sample Project" vs "Progressive Disclosure." Ask me: "Here's our current prioritization. Poke holes in it. What are we underweighting?" I'll push back constructively.
> 3. Draft a quick competitive teardown
> You have a competitive doc on Clovant and Fynch. If a new competitor emerges, send me their marketing site or a few screenshots and ask: "How does their onboarding compare to ours? What should we steal?"
> 4. Turn rough notes into a tight 1-pager
> When you need to communicate a decision to stakeholders, paste your messy notes and ask: "Turn this into a 1-page decision doc with problem, options considered, recommendation, and risks." I'll structure it cleanly.
> 5. The surprise: Let me analyze your interview notes right now
> I noticed your Customer Interview Notes doc has feedback from Marcus Webb. Want me to pull the full doc and surface patterns, contradictions, or insights you might act on? I can do that in about 30 seconds. Just say "go."
> Which one do you want to try first?

##### Follow-up prompts

Try it with a real deliverable you're stuck on

Move from examples to your actual work. Bring Claude something you need to produce this week.

Let's try the 1-pager. I need to get buy-in for simplifying our onboarding flow. Here are my rough notes from the last few weeks. Turn this into something I can send to leadership by end of day.

Ask Claude to interview you about a problem

If you're not sure what you need, let Claude ask the questions instead.

I'm not sure how to frame the onboarding problem for leadership. Can you interview me about it? Ask me questions that will help us figure out the right angle.

Learn about features beyond chat

Claude has capabilities like Projects (persistent context), web search, file creation, and integrations. Ask what might be useful for your workflow.

What Claude features should I know about beyond this chat? From all of your tools, what would be most helpful to me in my role?

##### Tricks, tips, and troubleshooting

Share your documents, not just your title

"Product manager" gets generic suggestions. Uploading your roadmap, interview notes, and strategy docs lets Claude reference your actual projects.

Be specific about what takes up your time

Adding "I spend hours on status updates" or "I struggle to synthesize interview feedback" helps Claude prioritize capabilities that address your actual pain points.

Keep learning with Claude 101

If you want a more structured way to learn, this free course walks you through Claude's full toolkit. You'll move past the basics and into building Claude into your real workflow—plus a certificate when you finish.

Use Claude as a thinking partner

Some of the best uses aren't about getting Claude to produce something. Try "Help me think through this decision" or "What am I not considering?" when you're stuck.

Ready to try for yourself?

Whether you're a product manager, teacher, butcher, baker, or candlestick maker (really, we tried it), start a new conversation and tell Claude what you do. You'll have a personalized guide to the features that matter for your work in under a minute.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Build analysis from browser charts and folder data

- Author: Anthropic
- Category: Professional
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/build-analysis-from-browser-charts-and-folder-data

##### Describe the task

In Cowork, Claude reads files from your folders and pulls live data from the web in a single session. Point it at a folder of board decks and a data source like FRED. It extracts the revenue figures directly, no prep needed.

Tell Claude what comparison you're making and what format you want the deliverable in. It builds the analysis and saves the finished file to your computer.

I'm preparing for our board meeting and need to show how our growth compares to the broader economy.

Pull our revenue figures Q1-Q4 2025 board decks

Using Claude in Chrome to open FRED in my browser and grab GDP growth and inflation for the same quarters.

Create a chart comparing our revenue growth to these economic indicators.

Save the chart and a summary to my desktop folder.

##### Give Claude context

Cowork is a workspace in Claude Desktop that reads your local files and connects to websites through Claude in Chrome. For this workflow, it extracts data from your PowerPoint decks and pulls live economic data from sites like FRED, then combines them into a single deliverable.

What to expect: After your initial prompt in Cowork, Claude may ask you questions, like what to focus on or how to structure the output, then build a plan you can review in the sidebar. This helps it work longer and produce a more finished result.

Required context

To get started:

Download Claude Desktop and start a Cowork session

Select Work in a folder in the chat bar and choose the folder containing your PowerPoint files

Install Claude in Chrome and add it as a connector to pull live data from FRED

Optional context

Additional economic indicators you want to track (unemployment, consumer confidence)

Competitor data from public sources for additional comparison

##### What Claude creates

Cowork extracts the revenue figures from each deck and produces a comparison chart with supporting analysis. Using the Claude in Chrome connector, Claude opens FRED in a new browser tab and pulls the economic indicators directly from the site, then combines everything into a single deliverable.

From Claude:

> I've extracted the revenue data from your four board decks and pulled economic indicators from FRED. Here's the comparison:
> Your Revenue (from board decks)
> Q1 2025: $12.4M (+18% YoY)
> Q2 2025: $14.2M (+22% YoY)
> Q3 2025: $15.8M (+19% YoY)
> Q4 2025: $17.1M (+16% YoY)
> Full year: $59.5M, representing 19% average quarterly growth.
> Economic Context (from FRED)
> GDP Growth: 2.1% → 2.4% → 2.2% → 1.9% (averaging 2.2%)
> Inflation (CPI): 3.2% → 3.0% → 2.8% → 2.6% (declining trend)
> The Story
> Your 19% average growth significantly outpaced the 2.2% GDP growth rate. You're growing roughly 9x faster than the broader economy.
> Files Created
> Revenue-vs-Economy-Chart.png — Comparison chart ready for your deck
> Economic-Context-Summary.md — Talking points for the board discussion

##### Follow-up prompts

Compare against multiple economic indicators

Add more context in one pass. Cowork pulls additional indicators from FRED and updates the chart with all of them.

"Add unemployment rate and consumer confidence to the comparison. Update the chart to show all four indicators against our revenue growth."

Extend to prior years

Show the longer trend. If you have older board decks, Cowork reads those too and builds a multi-year comparison.

"I also have 2024 and 2023 board decks in the archive folder. Pull those and extend the chart to show a 3-year trend of our growth vs the economy."

Create a board-ready slide

Go straight to the deliverable. Cowork creates a formatted PowerPoint slide with the chart and key takeaways.

"Create a single PowerPoint slide with the chart, the key numbers, and three bullet points I can use as talking points. Save it to my board-prep folder."

##### Tricks, tips, and troubleshooting

Claude in Chrome reads visual data

When you point Cowork at a chart in your browser, it extracts the underlying numbers, not just what's labeled. This works on dashboards, reports, and data tools that don't offer easy exports.

Local files plus web data in one workflow

The combination is the point. Cowork reads your scattered internal documents and pulls live web data in the same session, then merges them into a single output.

Everything saves to your folder

Charts, summaries, and slide decks land directly in your working folder. No downloading from chat, no extra steps.

Start another task while this one runs

If Cowork is pulling data from multiple sources, open a new session from the sidebar for other work. You'll see a grey dot in the sidebar when it needs attention.

Ready to try for yourself?

Use Cowork to connect internal data with external context — and deliver the full picture.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Build a daily briefing across your tools

- Author: Anthropic
- Category: Professional
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/build-a-daily-briefing-across-your-tools

##### Describe the task

In Cowork, Claude connects to your messaging, task tools, and dashboards at the same time, reading full conversation histories, surfacing discussions you weren't part of, and tying metrics to the threads behind them.

In your prompt, describe how you want the briefing structured and what counts as urgent. Claude pulls together what matters into a single briefing.

I need my morning briefing. Pull from Slack and Notion, and visit my team dashboard: https://metrics.acme-corp.com/ops-team

Structure it as:

Urgent items from the dashboard (anything red or trending down)

Slack threads where I'm mentioned — read the full threads for context

Threads I'm not in but should probably know about based on my current tasks

Tasks due this week and anything blocking them

For urgent items, pull the deeper context: who's involved, what's been discussed, what's still unresolved.

##### Give Claude context

Cowork is a workspace in Claude Desktop that connects to your tools via connectors and reads from browser tabs via Claude in Chrome. Add your messaging, tasks, and dashboard sources. Cowork queries them in parallel.

What to expect: After your initial prompt in Cowork, Claude may ask you questions, like which channels matter most, what timeframe to cover, or how to format the briefing. It then builds a plan you can review in the sidebar. This helps it run more independently and deliver something closer to finished.

Required context

To get started:

Download Claude Desktop and start a Cowork session

Add connectors for Slack, Notion, and any other tools you want in the briefing

Install Claude in Chrome and add it as a connector for dashboard access

Optional context

Calendar for meeting context

Email for external communications

##### What Claude creates

Cowork creates a structured briefing organized by priority, with cross-platform context synthesized into single items where relevant. Using the Claude in Chrome connector, Claude opens your dashboard in a new browser tab and reads it directly, pulling metrics and context alongside your Slack and Notion data.

From Claude:

> Here's your morning briefing for January 22:
> Dashboard alerts
> Pipeline velocity is down 15% this week — I found a related thread in #sales where Maria mentioned two deals slipping to next quarter.
> Support ticket volume trending up — 23% increase over the last 3 days.
> Threads where you're needed
> #ops-team — Lisa tagged you about the vendor contract renewal. Related to your Notion task due Friday.
> #leadership — Discussion about headcount planning. You weren't tagged but it relates to your hiring request.
> Tasks due this week
> "Finalize Q1 vendor agreements" — due Friday, blocked on budget confirmation
> "Review marketing brief" — due tomorrow

##### Follow-up prompts

Go deeper on a dashboard alert

Get the full context behind a metric. Cowork pulls the related threads, tasks, and history so you understand what's driving the number.

"Tell me more about the pipeline velocity drop. Pull the full thread from #sales, any related tasks, and what's been discussed about those slipping deals."

Draft a response with full context

Move from briefing to action. Cowork drafts a reply using everything it knows about the topic — the thread history, related tasks, and your current priorities.

"Draft a response to Lisa's vendor contract thread. I want to confirm we're moving forward but need to flag the budget dependency."

Surface everything on one topic

Pull together all mentions of a project, person, or issue across sources.

"What else has been said about headcount planning? Pull from Slack, Notion, and anything on the dashboard related to hiring or team size."

##### Tricks, tips, and troubleshooting

Watch the progress panel

Cowork shows which connectors are being queried in real-time. If your briefing is taking longer than expected, you can see which platform is the bottleneck.

Iterate in the same conversation

Your first briefing request establishes context. Follow-up prompts can refine without re-querying everything.

Data stays on your machine

Cowork processes briefings locally. Internal Slack discussions, roadmap debates, and task details never leave your computer.

Ready to try for yourself?

Connect your platforms to Cowork and start your day knowing where your attention is needed most.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Process batches of vendors with Cowork

- Author: Anthropic
- Category: Professional
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/process-batches-of-vendors-with-cowork

##### Describe the task

In Cowork, Claude works across your local files and browser in a single session. It reads your vendor tracker, contract templates, and vendor documents from a folder, then fills intake forms in your procurement portal through Claude in Chrome.

In your prompt, describe the end state you want. Claude plans the onboarding steps from there, and when parts of the workflow are independent, it runs them in parallel.

I need to onboard several vendors. Their documents spread across my desktop.

For each new vendor:

Create an NDAs and MSAs from the templates

Fill out an onboarding form

Afterwards, add all information to the vendor tracker spreadsheet

Organize all the new documents on my desktop.

##### Give Claude context

Cowork is a workspace in Claude Desktop where Claude works directly with your local files, so there's no copying and pasting into the conversation. For browser work like filling portal forms, it uses Claude in Chrome.

What to expect: After your initial prompt in Cowork, Claude may ask you questions about how to handle the batch, then build a plan you can review in the sidebar. This front-loading helps it run end-to-end with fewer interruptions.

Required context

To get started:

Download Claude Desktop and start a Cowork session

Select Work in a folder in the chat bar and choose the folder with your vendor tracker, contract templates, and vendor details

Install Claude in Chrome and add it as a connector, then log into your procurement portal

Optional context

Portal tab already open to the intake form

##### What Claude creates

Claude works through each step, moving between your local files and your browser to complete the full onboarding. Using the Claude in Chrome connector, Claude opens your procurement portal in a new browser tab and fills out intake forms directly, while reading vendor details and generating contracts from the files in your folder.

From Claude:

> I'll work through the onboarding in three parts — updating your spreadsheet, completing the portal form, and generating the MSA.
> 1. Vendor Tracker Updated
> I've added Meridian Solutions to your vendor tracker:
> Vendor Name: Meridian Solutions
> Primary Contact: David Chen
> Service Category: IT Consulting
> Annual Value: $150,000
> Status: Pending MSA
> 2. Procurement Portal Form
> I've completed the vendor intake form in your Chrome tab. The form is ready for you to review and submit.
> 3. Master Service Agreement Generated
> I've created the MSA from your template and saved it to your Documents folder.
> I'll now continue with the remaining vendors…

##### Follow-up prompts

Generate additional documents

Create more contracts from your templates. NDAs, SOWs, or other vendor documents using the same vendor details.

"Also generate an NDA from our template at ~/Documents/Templates/NDA-Template.docx and save it in the same folder as the MSA."

Organize vendor files

Create a vendor folder with everything in one place. Move or copy all onboarding documents to a dedicated folder.

"Create a folder called Meridian-Solutions in ~/Documents/Vendors and move the MSA there. Also save a copy of their contact details as a text file."

##### Tricks, tips, and troubleshooting

Subagents can handle independent tasks at the same time

Updating the vendor tracker and generating the contract don't depend on each other — so you can ask Claude to spin up subagents and run them in parallel.

Add Claude for Chrome as a connector before starting

Install Claude in Chrome and add it as a connector in your Cowork session. Log into your procurement portal before you start — Claude works within your authenticated session.

The progress panel shows what Claude is working on

Cowork displays which files Claude is reading and what it's doing at each step. If something looks off, you can steer the work in progress.

Ready to try for yourself?

Use Cowork to handle vendor onboarding in one session — updating your tracker, generating contracts, and filling portal forms.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Size a market using your research

- Author: Anthropic
- Category: Professional
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/size-a-market-using-your-research

##### Describe the task

In Cowork, Claude runs market sizing end-to-end: research, analysis, and formatted deliverables. Feed it existing research or company data as a starting point, or let it work from scratch.

Describe the market you're sizing and specify your outputs: a presentation, an Excel workbook, a source document with citations. Claude handles the methodology and saves finished files to your computer.

I need a market sizing analysis for the enterprise project management software space in North America.

Include TAM/SAM/SOM calculations with your methodology, key market drivers and growth projections, competitive landscape overview, and investment implications.

Output as:

Executive PowerPoint (10-12 slides)

Excel workbook with detailed calculations

Markdown source document with all citations

Source all claims.

##### Give Claude context

Cowork is a workspace in Claude Desktop where Claude works directly with your local files and saves deliverables to your computer. The more context you provide, the more targeted the analysis.

What to expect: After your initial prompt in Cowork, Claude may ask you questions, like market focus, geographic scope, time horizon, and existing assumptions. It then builds a plan you can review in the sidebar. This helps it produce more targeted, finished analysis with less back-and-forth.

Required context

To get started:

Download Claude Desktop and start a Cowork session

Select Work in a folder in the chat bar to give Cowork access to your existing research, company data, or templates

You can also use the + button to add individual files

Optional context

Existing research, analyst reports, or internal data to incorporate

Company or product context for more tailored SOM calculations

##### What Claude creates

Claude researches the market, applies the TAM/SAM/SOM framework, and generates three coordinated deliverables.

From Claude:

> I'll research the North American enterprise project management software market.
> Done. I've created three files:
> 1. Enterprise_PM_Market_Sizing.pptx
> TAM: $12.4B (2024), growing 11.2% annually
> SAM: $4.8B (enterprise segment)
> SOM: $720M
> 2. PM_Market_Calculations.xlsx
> All calculations with methodology
> 3. Market_Sizing_Sources.md
> All data points cited

##### Follow-up prompts

Drill into a specific segment

Go deeper on the most attractive market. Focus research on a particular vertical, company size, or geographic sub-market.

"Drill into the mid-market segment (100-500 employees). What's the specific opportunity there and who's winning that space?"

Build a sensitivity model

Make the calculations interactive. Create an Excel model where you can adjust key assumptions and see how the market size changes.

"Turn the Excel into a sensitivity model. Let me adjust the growth rate, market penetration, and competitive capture assumptions to see different scenarios."

Generate competitor profiles

Research the competitive landscape in detail. Pull together profiles on the key players with recent moves, positioning, and market share estimates.

"Create detailed competitor profiles for the top 5 players. Include recent product launches, funding, reported revenue if available, and positioning."

##### Tricks, tips, and troubleshooting

Start another task while this one runs

Cowork handles the full research and formatting loop. Open a new session from the sidebar for other work. You'll see a grey dot in the sidebar when it needs attention.

Review the plan before it runs

Cowork builds a research plan visible in the sidebar. Check that it's covering the right segments, geographies, and frameworks before it starts pulling data.

Triangulate estimates

Cross-check bottom-up calculations against analyst reports. Claude surfaces data; you decide what it means.

Ready to try for yourself?

Give Cowork a market sizing question. Come back to a deck, a model, and sourced documentation ready to present.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Source insights from your tools to build a deck

- Author: Anthropic
- Category: Professional
- Model: Opus 4.6
- Source URL: https://claude.com/resources/use-cases/source-insights-from-your-tools-to-build-a-deck

##### Describe the task

Opus 4.6 follows leads across your connected tools without needing direction at each step. Give it a starting point and it pulls search terms from what it finds, follows people to their updates, follows updates to the data they reference, and reconciles sources that disagree. By the time it builds the deck, it's working from evidence it gathered and cross-referenced itself.

Once the deck exists, Claude in PowerPoint lets you keep refining directly in your slides — restructuring sections, adjusting talking points, or adding charts.

I’m prepping for board meeting Friday. Q3 was the quarter where everything happened at once: we shipped the platform consolidation, closed the Apex partnership, and lost two enterprise accounts.

Start with the Q3 project tracker in my local files — it has the key people, channels, and documents. Follow each person across their channels, emails, and documents they reference. When you find data, check it against other sources — the revenue numbers probably don’t agree. Figure out which is current.

The board needs to understand whether the consolidation bet is paying off despite the churn. Create a PowerPoint deck (12–15 slides) with speaker notes, an Excel data appendix, and a two-page Word brief. Make an argument, not a summary.

##### Give Claude context

Through Cowork in Claude Desktop [Research Preview], connect your local files and tools. Point Claude at a Slack channel, a Drive folder, or an email thread to give it a starting point.

Connect Slack and Google Drive through connectors. Claude in Chrome [beta] grabs current data from live dashboards.

Extended Thinking lets Opus 4.6 scale its reasoning to match the complexity of the task — more sources and more conflicting data means deeper thinking before it starts building.

Required context

Cowork with access to local files (supported formats)

At least one connected source: Slack, Google Drive, or email

Adaptive Thinking: ON

Slack

Gmail

G Suite

Optional context

Extended Thinking lets Opus 4.6 scale its reasoning to match the complexity of the task — more sources and more conflicting data means deeper thinking before it starts building.

Claude in Chrome (for live dashboard data from analytics or revenue platforms)

Previous quarter’s board deck (for continuity and comparison)

Extended Thinking

##### What Claude creates

Opus 4.6 works outward from the starting point you give it, pulls context from each source it finds, and saves three files locally: a presentation with narrative structure, a supporting data appendix, and an executive pre-read. If Claude in Chrome is connected, Claude opens relevant pages in new browser tabs to pull live data from dashboards and analytics platforms directly.

From Claude:

> Here’s what I found and how I pieced it together:
> I started in #platform-consolidation on Slack. The kickoff thread from July identified the core team: @maria (engineering), @james (partnerships), and @priya (customer success). From there:
> @maria’s weekly updates in #engineering-updates gave me the velocity metrics and the 22% cost reduction from consolidation.
> @james’s messages in #partnerships led me to the Apex term sheet in your local files and the close date (September 28).
> @priya flagged the two enterprise losses in #customer-success. I found the full churn details in a CSV on your desktop and the related email thread where both customers cited migration friction.
> The finance team’s Q3 report on Drive shows $4.2M revenue, but I pulled the Looker dashboard via Chrome and it shows $4.6M — the difference is the Apex revenue that closed after the report was finalized. I used $4.6M and noted the discrepancy in the appendix.
> Current NPS from Delighted (via Chrome): 47, down from 52 last quarter. The drop tracks with the two enterprise losses.
> The quarter’s argument in one sentence: The platform consolidation cut engineering costs 22% and landed the Apex partnership, but migration friction cost you two enterprise accounts — and the retention data shows that’s a fixable execution problem, not a product problem.
> I’ve saved three files:
> Q3 Board Presentation (q3-board-deck.pptx): 14 slides with speaker notes and anticipated board questions.
> Data Appendix (q3-data-appendix.xlsx): Six tabs covering revenue reconciliation, customer retention, NPS trends, engineering velocity, pipeline, and Apex partnership economics.
> Executive Brief (q3-executive-brief.docx): Two-page pre-read framing the consolidation bet and what the churn data actually shows.

##### Follow-up prompts

Turn the deck into an interactive board briefing

Static slides work in the room. An interactive version lets board members explore the data on their own time.

Take the board deck and build an interactive HTML briefing I can share as a link. Each section should have the narrative up top with expandable charts underneath — let them click into the revenue reconciliation, the NPS trend, the churn timeline. Make the Apex partnership economics explorable so they can adjust assumptions.

Pre-brief each board member on what matters to them

Opus 4.6 already knows the quarter’s full context. Use that to draft targeted pre-reads before the meeting.

Draft a Slack message for each board member based on what they’ll care about most. The CFO gets the revenue reconciliation and Apex economics. The product lead gets the consolidation impact and engineering velocity. The customer advocate gets the churn story and the NPS data. Personalize each one — don’t just cut the same deck three ways.

Stress-test the narrative before you present it

The hardest board questions come from the data you glossed over. Opus 4.6 has read every source and knows where the weak points are.

You’ve seen all the raw data. Play devil’s advocate — what are the three toughest questions the board could ask about this quarter, and where is our narrative weakest? Then update the speaker notes with how to handle each one, citing specific data points from the appendix.

##### Tricks, tips, and troubleshooting

Point Opus 4.6 at a starting resource and tell it to follow what it finds

Opus 4.6 can pull search terms from what it reads, so a document that names people, channels, and files gives it more threads to follow across your tools. A project tracker or kickoff doc works well. Once you have the tools you'd like Claude to access, tell it to work outward: "Follow each person across their channels, emails, and documents they reference. Check data against other sources." Paired with Cowork, it sustains that work across as many steps as the task requires.

Keep refining in PowerPoint

Once Claude has finished the task, the output files save to your working folder through Cowork. Open the deck in PowerPoint and use Claude in PowerPoint to make pinpoint edits, restructure slides, or add charts. Ask Claude to update the appendix or brief to match.

Build a plugin for recurring presentations

If your team builds quarterly decks with a consistent structure, you can package that process as a Cowork plugin. A plugin teaches Claude your specific framework: which sources to check, which metrics the board expects, how to structure the argument, and what format the deliverables should follow.

Start another task while this one runs

Cross-source research and deck building runs across many steps. Open a new session from the sidebar for other work. You'll see a grey dot in the sidebar when this one needs attention.

Ready to try for yourself?

Point Opus 4.6 at your quarter.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Evaluate a company from the science to the balance sheet

- Author: Anthropic
- Category: Professional
- Model: Opus 4.6
- Source URL: https://claude.com/resources/use-cases/evaluate-a-company-from-the-science-to-the-balance-sheet

##### Describe the task

Opus 4.6 reads across SEC filings, trial protocols, and patent documents simultaneously, reasoning through the dependencies between them. It catches where one document contradicts another — a risk factor in the 10-K that doesn't match revenue assumptions in the 10-Q, or an undisclosed regulatory requirement that changes the timeline.

Describe your investment question and what you're trying to evaluate. The filings you provide in the next section give Opus the specifics — your prompt can stay broad and Opus works through the analysis on its own.

I'm evaluating Meridian Therapeutics (~$4B mid-cap biotech) ahead of their Phase III readout. I've uploaded the 10-K, 10-Q, proxy, trial protocol, and patent filings.

Evaluate the science and trial design. Build a risk-adjusted pipeline valuation. Flag anything in the filings that contradicts management's guidance or earnings narrative. Model the downside scenarios I should be stress-testing.

Produce a research memo and a downloadable model. Tell me what I should be worried about that I haven't asked about.

##### Give Claude context

Upload the full filing set together. Cross-document connections are where the critical findings live.

Required context

SEC filings (10-K, 10-Q, proxy)

PDF

Clinical trial protocol

PDF

SEC filings (10-K, 10-Q, proxy)

PDF

Optional context

If your filings are already on your computer, Cowork in Claude Desktop [research preview] can read them directly from a folder rather than uploading individually.

If you connect Claude in Chrome, Claude can open SEC filings, earnings transcripts, or patent databases in new browser tabs and pull data directly from those sites.

Extended Thinking lets Claude scale how deeply it reasons based on task complexity. For multi-document financial analysis, it's worth turning on.

Extended Thinking

##### What Claude creates

Claude produces an integrated research memo, a downloadable financial model, an interactive scenario dashboard, and a patent cliff timeline. Opus 4.6 reads across all five documents simultaneously, and one finding it surfaced on its own is the kind of detail that could change the risk assessment.

From Claude:

> Research memo: Meridian Therapeutics
> 1. Mechanism and Phase II signal
> MRD-4420 is a selective JAK1 inhibitor targeting the IL-6/STAT3 axis in rheumatoid arthritis. The selectivity matters — first-generation JAK inhibitors hit multiple isoforms, triggering the 2021 FDA boxed warning. Phase II showed ACR50 response rates of 48% vs. 32% for adalimumab (n=340), clinically meaningful but not powered for cardiovascular safety.
> 2. Phase III risk
> The superiority design (n=1200) requires wider margins than non-inferiority. At the Phase II effect size, power is ~88%. If the effect attenuates 25% (common in Phase II-to-III transitions), power drops to ~62%.
> 3. Buried regulatory finding
> Page 187 of the 10-K discloses an FDA request for a 52-week cardiovascular safety assessment — not in the original protocol. Cross-referencing the 10-Q, R&D guidance increased $45M without explanation. This likely means an additional safety extension study: 12–18 months added to timeline, $40–50M in costs, pushing earliest revenue to late 2028 vs. management’s mid-2027 guidance. At $68M quarterly burn, cash runway narrows from 14 months post-filing to roughly 8.
> 4. Scenario summary
> The model maps three scenarios based on the assumptions above:
> Clean data, on-timeline: highest valuation range. Ambiguous data with 6-month delay and dilutive raise: mid-range. Failed superiority with pivot to non-inferiority: lowest range.
> Per-share estimates depend on your discount rate, probability weights, and dilution assumptions. Adjust these in the downloadable model below.
> Interactive scenario dashboard
> [View the scenario dashboard]
> Toggle between scenarios and adjust key variables (probability of success, peak sales, discount rate, timeline delay) and watch the valuation recalculate in real time.
> Patent cliff and cash runway timeline
> [View the timeline]
> Core composition-of-matter patent expiration in 2036, method-of-use extension to 2039, mapped against cash runway and projected revenue ramp under each scenario.
> [Download: meridian-therapeutics-pipeline-model.xlsx]
> Adjustable inputs for all key variables. Changing any assumption recalculates pipeline NPV and dilution scenarios automatically.
> Important: Claude is a research tool, not a financial advisor. This analysis surfaces findings and structures scenarios based on the documents and assumptions you provide. All projections reflect those inputs and may not match actual outcomes. Consult a qualified financial professional before making investment decisions.

##### Follow-up prompts

Search deeper with Research

Opus 4.6 is the strongest model at surfacing answers from dense document sets. With Research, Opus 4.6 goes off on its own, pulls from dozens of sources across competitor pipelines, FDA advisory committee meetings, analyst reports, and more, then comes back with a full, structured report ready for review.

Research the competitive landscape for JAK inhibitors in autoimmune. Who else is in Phase II or III with selective JAK1 programs? How does MRD-4420’s selectivity compare, and is there a risk a competitor reaches market first?

Push the analysis further

Opus 4.6 holds both the science and the financials in context at once, which means it can reason through multi-step problems where a change in one domain cascades into another.

Model what happens if Phase III misses the superiority endpoint by a narrow margin. Walk through the decision tree: does management pivot to non-inferiority? How does that cascade through the timeline, cash runway, and valuation?

Take the outputs into Claude in Excel

Opus 4.6 produces financial models and scenario analyses structured for direct use. Export to Claude in Excel to stress-test assumptions interactively and integrate with your own models.

Export the pipeline valuation model to Excel. I want to adjust the discount rates and approval probabilities myself and run additional sensitivity analysis.

##### Tricks, tips, and troubleshooting

Front-load your context

Opus 4.6 reads across your full document set before surfacing findings. The quality of what you share upfront directly shapes the quality of what you get back. Upload the complete filing set at once. The cross-document connections are where the critical findings live.

Build a Cowork plugin for your due diligence workflow

If your team runs due diligence with a standard set of steps, checklists, or evaluation criteria, you can package that process as a Cowork plugin. A plugin teaches Claude your specific methodology — what to look for in filings, how to weight risk factors, which red flags to escalate — so the analysis follows your framework, not a generic one. You could set up a /due-diligence command that runs your full process against any new set of filings, or a skill that applies your firm’s valuation standards automatically whenever Claude builds a model.

Let Claude flag what you missed

Opus 4.6 works through more of the analysis before asking for direction, and it reads across documents in ways that catch what a surface read won’t. An instruction like “flag anything that changes the investment thesis” often surfaces findings you didn’t know to look for.

Ready to try for yourself?

Try Opus 4.6 with your filings and see the full picture that emerges.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Generate project status reports

- Author: Anthropic
- Category: Professional
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/generate-project-status-reports

##### Describe the task

Status reporting often means sifting through your various tools and messages to find updates and decisions. Claude simplifies this by querying multiple data sources at once, extracting information from different formats, and creating organized reports. This turns hours of manual work into minutes.

Ask Claude to pull information from your connected tools and create a tracker that consolidates everything. The key is being specific about what you need tracked and where to look.

I need to consolidate project status from multiple sources into a task tracker.

Pull information from:

Gmail (past 2 weeks, search "Project Hermes")

Slack #hermes-sprint channel

Google Drive "Project Hermes" folder

Recent calendar meetings

For each task, I need to see:

Who owns it and what they're working on

Current status (not started, in progress, blocked, done)

Any blockers and how long they've been stuck

Notes from their updates about plans and challenges

Create an Excel tracker and include these features: visual status indicators, cell comments with context from sources (so I can hover and see the details), dropdown menus for status and priority (to make updates easy), and data bars showing progress visually.

The tracker should make it obvious at a glance where the problems are and who needs help.

##### Give Claude context

Enable connectors and integrations to give Claude direct access to your tools as live data sources, not just pasted snippets.

Required context

Once you’ve connected your Google Drive, Gmail, Google Calendar, and Slack tools, make sure they are toggled on in the chat bar settings.

Claude can then access your email threads, Drive file updates, calendar events, and Slack conversations to piece together what's actually happening with your project.

Google Drive

Gmail

Optional context

Use Extended Thinking for better results when making Word, Excel, and PowerPoint files.

Extended Thinking

##### What Claude creates

Claude searches your connected tools, finds status updates from different sources, reconciles them into a single view, and creates an Excel tracker with visual indicators and context in cell comments.

From Claude:

> I've searched your connected tools for Project Hermes updates and created a consolidated tracker.
> Found across your tools:
> 147 Gmail messages mentioning Project Hermes
> 312 Slack messages in #hermes-sprint
> 23 documents in Google Drive /Project Hermes folder
> 18 calendar meetings with "Hermes" in the title
> Key insights from consolidation:
> Sarah said "80% done" in Slack but mentioned complexity in her 1-on-1 notes, so I adjusted to 45% in the tracker
> Mike's been blocked on API spec for 4 days (mentioned in Slack Nov 1, still blocked Nov 4)
> Lisa's approval escalated to VP Engineering (email thread shows 3 escalation attempts)
> Team consensus from standup: data migration is highest risk item
> I’ve created a spreadsheet file with 25 tasks, visual indicators, and cell comments with context from all sources.

##### Follow-up prompts

Deep dive blockers

Pull all related conversations about a blocker to understand the full context.

The tracker shows Lisa's been blocked on approval for 4 days. Find every mention of this blocker across Slack, email, and meeting notes. I need to see the complete escalation history and current status.

Create weekly status report

Generate an executive summary from the tracker data.

Using the task tracker data, create a one-page status report for leadership. Include: overall progress percentage, number of blockers, which workstreams are at risk, and top 3 items that need executive attention.

##### Tricks, tips, and troubleshooting

Create a Skill for recurring reports

Create a custom skill for generating status reports to embed all the steps involved in the process. Once created, you can use the skill anywhere in Claude by referencing its name or description. This triggers Claude to run the workflow automatically.

Specify how to handle missing information

If Claude can't find certain information—maybe there's no Slack discussion or Drive files haven't been updated—it's better to say "no progress documented" than to have gaps silently smoothed over. In your prompt, you can specify: "If you don't find information for a work stream, note that explicitly rather than omitting it."

Add visual polish

Claude can opt for certain default fonts, colors, and styles. For differentiated outputs, you can request changes: "Choose a color scheme that's unique and aesthetically beautiful—avoid standard blues and grays," or "Select typography that feels modern and confident, not generic corporate." Specificity drives better design.

Ready to try for yourself?

Work with Claude to consolidate information between your project tools so you can focus on making decisions instead of copy and pasting into documents.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Analyze patterns in user feedback

- Author: Anthropic
- Category: Professional
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/analyze-patterns-in-user-feedback

##### Describe the task

Claude can read through all your customer feedback to aggregate and analyze your data in one place. Let Claude do the exhaustive reading and sorting so you can spend time focusing on improving user experience.

Tell Claude which feedback sources to analyze and the questions you're trying to answer. Claude reads all your data at once and identifies themes across hundreds of comments. It then synthesizes everything into workbooks that make qualitative feedback actionable.

Pull all Intercom conversations from the past 90 days. I'm also uploading our Q2 NPS survey responses (CSV) and notes from six user interviews we did last month (PDFs).

Read everything and tell me what patterns you're seeing:

What issues keep showing up across different feedback sources?

When people ask for different things, are they actually pointing to the same underlying need?

Which complaints seem most urgent based on how users describe them?

What's worth prioritizing vs what's noise?

Create a data workbook (Excel) organizing all the feedback by theme with filters so I can dig into specific issues. Include the source for each piece of feedback (Intercom, NPS, or interview) and use professional formatting with frozen headers

##### Give Claude context

Connect tools where your support and feedback lives using connectors so Claude can access and analyze your data.

Required context

In Settings > Connectors, find and enable your Intercom connector.

Upload supplementary feedback that lives outside your tools—NPS responses, interview transcripts, feedback forms, user research notes.

Click the (+) button in the chat bar to browse through your files, or alternatively, drag and drop files into the chat box area.

Intercom

Customer feedback data

XSLX

User transcripts

PDF

Customer feedback data

XSLX

Optional context

Turn on Extended Thinking for deeper pattern recognition across hundreds of feedback points.

Extended Thinking

##### What Claude creates

Claude connects dots between your feedback sources and organizes everything into data workbooks that make qualitative feedback actionable.

From Claude:

> I've analyzed 347 feedback points across your support tickets, NPS responses, and interview transcripts.
> Spreadsheet Data Breakdown:
> The theme classification tab lets you audit Claude's work—see which feedback got tagged with which themes, check if anything was miscategorized, identify edge cases. This is your validation layer before presenting findings to stakeholders.
> Trend analysis reveals velocity and direction. A complaint that appeared 5 times three months ago but 40 times last month tells a different story than one that's been steady. Claude tracks both the absolute numbers and the rate of change.
> The quote repository is for persuasion—when you're pitching a roadmap item to leadership or writing a PRD, you need user voice, not summary statistics. This tab gives you the most representative, compelling quotes for each theme.
> Feature request tracker helps you group related asks, estimate impact, and build a case for why something deserves prioritization (or doesn't).
> View your data workbook

##### Follow-up prompts

Improve the file output

Claude responds to design language and quality cues by applying sophisticated formatting, typography, and visual elements. Review first outputs, then request elevated quality with specific design direction.

Add visual polish to these files. For the document, refine with premium typography, sophisticated color schemes, and tighter formatting. For the spreadsheet, add charts to visualize trends, comparison tables, and callout boxes for key insights.

Compare segments

Break analysis down by meaningful groups to see how patterns differ. Claude identifies which issues matter most to specific segments, helping you prioritize high-value users or unique needs.

Take the top three pain points and show me how they differ between enterprise and SMB customers. Are we solving the right problems for our highest-value segment?

Create a repeatable workflow

Turn workflows you’ve refined into reusable skills that bundle your instructions, templates, and preferences. Skills eliminate repetitive explanations and ensure consistent outputs for tasks you do regularly.

Help me create a skill for analyzing user feedback. I want to capture where I pull data from, my analysis methodology, and the output structure I prefer—so I can reuse this process without re-explaining it every time.

##### Tricks, tips, and troubleshooting

Work with messy data

Don't spend time formatting feedback into perfect columns before uploading. Claude handles messy data, like mixed formats, incomplete fields, typos, even handwritten notes you've transcribed. Focus your energy on collecting comprehensive feedback, not cleaning it.

Watch for echo chamber effects

Claude will tell you what's in the data, but you need to interpret whether the sample represents your actual user base. Power users may leave more feedback than typical users. Enterprise customers have dedicated account managers to channel complaints. Promoters write thoughtful NPS comments while detractors just pick a number. Ask Claude: "What's the breakdown of feedback by user segment? Are we over-indexed on hearing from any particular group?"

Combine with quantitative data for the full picture

Feedback tells you what users say; usage data tells you what they do. The most powerful insights come from connecting both. Upload your feedback analysis to a Claude Project along with usage analytics, then ask: "Users complain about Feature X being slow, but our logs show it averages a fast response time. What's actually happening?"

Ready to try for yourself?

Collaborate with Claude to source and analyze user feedback, so you can get to insights and actions quicker.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Quickly prep for your week

- Author: Anthropic
- Category: Professional
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/quickly-prep-for-your-week

##### Describe the task

Planning your week typically means opening your calendar, scanning your inbox, maybe checking a few documents—then trying to mentally synthesize which meetings need prep, what's urgent, and how to distribute your time. Claude can read through your calendar and inbox simultaneously, identify connections you'd miss while context-switching between tools, and create a structured overview showing what needs attention and when you actually have time to handle it.

To start, tell Claude which dates to analyze, where to search, and what the format for the output document.

Help me plan my upcoming week: October 27-31.

Using my M365 connector look at my Outlook calendar and find all meetings that need prep, or where I'm making decisions. Show me where I'm overbooked, where I have real focus time, and any scheduling problems I need to fix now.

From my Outlook inbox and summarize any weekend emails I need to handle, any threads from last week that become urgent this week if ignored, and anyone blocked waiting for my response.

Create an overview document of my must-dos, daily structure, preparation I still need to do, blocks of time I need for deep work, and email triage of high-priority vs can-wait.

##### Give Claude context

To help Claude analyze your week effectively, give Claude access to your workspaces. Use the Microsoft 365 connector to give Claude access to your Outlook calendar, email, SharePoint documents, OneDrive files, and Teams conversations.

Required context

In Settings > Connectors, you’ll find the Microsoft 365 connector.

Claude can then search across your connected tools simultaneously—identifying which meetings need prep, what's urgent in your inbox, and how your schedule and communications relate to each other.

Microsoft 365

Optional context

##### What Claude creates

Claude reads your sources simultaneously, analyzing what matters, and showing you how to prepare for the week ahead.

From Claude:

> Done! I've searched your calendar and found 10 events through October 21-25:
> Monday 10/21:
> Engineering Sync - 10:00 AM to 10:30 AM (30 minutes)
> Notes: No prep needed
> Marketing Planning - 2:00 PM to 3:00 PM (60 minutes)
> Tuesday 10/22:
> Product Strategy - 11:00 AM to 12:30 PM (90 minutes)
> Notes: Q4 resource allocation, 12-page pre-read unread
> VP Check-in - 3:00 PM to 3:30 PM (30 minutes)
> Wednesday 10/23:
> Board Meeting - 9:00 AM to 11:00 AM (2 hours)
> Notes: Presenting budget section
> Customer Success - 1:00 PM to 1:45 PM (45 minutes)
> Notes: Can reschedule if needed
> Thursday 10/24:
> Design Review - 10:00 AM to 10:30 AM (30 minutes)
> Finance Sync - 3:00 PM to 3:30 PM (30 minutes)
> Friday 10/25:
> Retro + One-on-ones - 9:00 AM to 1:00 PM (4 hours)
> Calendar shows 65% booked. Reality: 85% with prep time. Monday 11 AM-12:30 PM is your only 90-minute focus block before Wednesday's board meeting.
> Your Emails:
> Found 11 emails requiring action:
> Urgent (respond today): Sarah Chen: budget data - sent Fri 4:47 PM, 2 follow-ups, blocking Q4 forecast, Legal: contract signature - Tuesday deadline, IT: software access - 2 weeks old, likely blocking someone
> High priority (this week): Engineering roadmap comments - Tuesday meeting agenda depends on this, CFO Q3 numbers - needs tonight for Wed board presentation, Design team: rebrand timeline - before Thu meeting, Customer Success: expansion deal - time-sensitive
> Medium priority (batch Thursday): 8 threads - industry updates, partnership intros
> 3 threads become urgent by Wednesday if you don't handle them Monday.
> Week Analysis:
> Critical gap: Board presentation Wed 9 AM, zero prep time Tuesday. Board deck (47 slides) sent Friday evening, unreviewed.
> Fix this: Block Tuesday 7-9 PM for review, OR arrive Wed 7 AM. Don't wing it.
> Thursday is your only real focus day: 4+ hours unstructured time. First substantial block all week. Protect this for Q4 plan draft and batch email processing.
> Action Items Right Now:
> Block Tuesday 7-9 PM or Wed 7 AM for board prep
> Respond to Sarah Chen
> Open Marcus's product strategy doc
> Protect Thursday from new meetings
> View your formatted document

##### Follow-up prompts

Draft out urgent responses

Ask Claude to write replies based on dashboard triage. Claude can identify urgent emails and draft replies based on the email thread and relevant documents. You can then easily copy these drafts to your inbox. Specify which emails to respond to and what each response should accomplish.

Draft three email responses: Reply to Finance (confirm I'll send the Q3 budget variance data by end of day Tuesday, apologize for delay). Reply to Legal (confirm vendor agreement will be signed and returned by Tuesday 3 PM). Reply to IT (approve contractor access request for the staging environment, apologize for 4-day response delay).

Create meeting prep materials

After seeing which meetings need prep, Claude can search email threads, SharePoint documents, and OneDrive files to gather relevant background. It pulls context from where your work actually lives rather than you hunting through each system.

For my Thursday board meeting, search my emails and documents for budget discussions, Q3 performance data, and board questions sent ahead. Create a one-page brief: decisions they expect, questions raised in advance, key numbers needed, topics requiring more input.

Adjust the output to your needs

Claude can quickly restructure the format of your document. If you want it more compact, more detailed, or different styling, Claude adjusts to match how you actually work.

Refine the output to have tighter spacing so more content fits on one page. Change the font and use Arial instead of Times New Roman. For each meeting, add who's attending and their email address.

##### Tricks, tips, and troubleshooting

Use your organization's search project for company-wide information

When you connect tools like calendar and email individually, Claude searches only your personal files and messages. If you need information from across your organization—team documents in SharePoint, company-wide Slack channels, other people's shared files—look for a project in your sidebar named "Ask [Your Company Name]". This is a separate project your admin sets up that connects to company-wide sources, not just your individual accounts. When you use that project, Claude searches across all the tools your organization has connected: everyone's shared documents, team channels, company knowledge bases.

Be specific about timeframes and priorities

Claude searches more effectively when you provide clear parameters. "Plan my week" searches all meetings and emails. "Plan my week, focusing on client meetings and budget proposal items" tells Claude exactly which calendar entries and email threads to prioritize.

Create a variety of outputs.

Beyond creating a Word document, Claude can save your weekly plan as a spreadsheet, add it to your Notion workspace, or send it as a Slack message to yourself. The file is convenient for reference, but if you want your plan living in the tools you use daily, enable those connectors and ask Claude to output there instead.

Turn this workflow into a Skill

Once you’ve refined this workflow, create and save it as a Skill so Claude can automatically complete the task in any chat. Skills teach Claude how to complete a task the same way you do, searching through the right sources, including the right information and styling, and saving it in the correct format. Learn more about how to create a custom skill using Claude.

Ready to try for yourself?

Connect Claude to your Microsoft 365 workspaces and prepare for the week ahead. Claude can search your calendar, email and other tools to show what needs attention and when you have time to handle it.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Compare and analyze competing options

- Author: Anthropic
- Category: Professional
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/compare-and-analyze-competing-options

##### Describe the task

Comparing vendor proposals means reading through multiple PDFs, tracking different pricing structures, noting what's included versus add-ons, and catching the differences in contract terms buried in fine print. Claude reads all the proposals, extracts the details you need for decision-making, and creates a comparison spreadsheet.

Upload your vendor proposals and tell Claude what matters for your decision. Claude identifies pricing structures, highlights meaningful differences, and flags terms that need attention.

I'm evaluating three payroll providers and need to decide by Friday. I've uploaded proposals from PayFlow Pro, TeamSync HR, and WorkForce Central.

Extract and compare base monthly costs and fees, onboarding timelines, contract lengths and terms, key feature differences, and support options. Create a comparison spreadsheet that shows everything side-by-side. Make it easy to scan—I need to present this to our CFO and we need to make a decision fast. Flag anything important I should know: hidden fees, concerning contract terms, major feature gaps.

This spreadsheet should be extremely well-designed. Think: professional not playful, expert-grade execution, and surgical precision and craft.

##### Give Claude context

Provide the vendor proposals you received so Claude can use them to compare terms and conduct analysis.

Required context

Click the (+) button in the chat to upload files, or drag them directly into the conversation. Claude can work with a variety of formats and types of data, so you don’t need to organize or clean up the documents first.

Vendor proposals

PDF

Vendor proposals

PDF

Optional context

Enable Extended Thinking for Claude to spend more time analyzing complex proposals or comparisons and developing high quality outputs.

Extended Thinking

##### What Claude creates

Claude reads each proposal completely, extracts pricing and terms, identifies differences that matter for your decision, and creates a comparison spreadsheet.

From Claude:

> I've analyzed all three payroll proposals. Here's what you need to know:
> [View your vendor comparison spreadsheet]
> The spreadsheet has four tabs:
> Pricing Comparison: Monthly costs broken down by component, annual total with first-year costs including onboarding, cost per employee calculated for easy scaling analysis
> Features Matrix: Side-by-side comparison of what's included versus paid add-ons. PayFlow Pro includes benefits admin in base price; TeamSync HR charges $5/employee extra. WorkForce Central bundles time tracking; others charge separately.
> Contract Terms: Length (PayFlow Pro: month-to-month, TeamSync HR: 12 months, WorkForce Central: 24 months), cancellation notice requirements, penalties for early termination, and price lock guarantees.
> Integration & Support: QuickBooks integration (all three supported), Slack integration (only TeamSync HR native, others via Zapier), support hours, and whether you get a dedicated rep.
> Red flags to discuss:
> WorkForce's 24-month contract with 90-day cancellation notice—you're locked in for 2+ years
> TeamSync’s implementation fee is $500, buried on page 8 of their proposal
> PayFlow Pro’s benefits admin requires 5+ employees; you're at 20 so you qualify, but worth noting
> My recommendation based purely on the numbers: If you value flexibility, PayFlow Pro gives you month-to-month with solid features. If you're certain you're scaling past 30 employees this year, WorkForce Central's flat rate becomes attractive. TeamSync HR is most expensive but has the tightest Slack integration if that workflow matters to your team.

##### Follow-up prompts

Draft the decision memo from the analysis

Claude synthesizes the comparison data into a recommendation document you can share with your CFO or team. This saves you from manually writing up the analysis and ensures you're communicating the trade-offs clearly

Write a memo recommending which vendor we should choose. Include the cost comparison, why this vendor fits our needs better than the alternatives, what we're giving up by not choosing the others, and what we need to negotiate before signing. Make it professionally formatted and include visual elements like tables or charts, if needed.

Create questions for vendor calls after reviewing the comparison

Easily spot unclear terms, missing information, and potential concerns within the proposals. Turn those findings into a prep document for your vendor meetings so you can negotiate better terms or clarify what matters before signing.

I'm meeting with each vendor this week. Based on what you found in the proposals, what questions should I ask? Focus on the unclear terms, the add-on costs, and anything that needs clarification before we commit.

Calculate costs for your business

Claude can find and extract important data from the vendor proposals to build financial models that project future costs as your business scales.

At what team size does WorkForces flat rate become cheaper than TeamSync’s per-employee model? Show me the breakeven point and create a chart showing total cost as we scale from 20 to 50 employees.

##### Tricks, tips, and troubleshooting

Download the actual spreadsheet

The chat preview shows basic structure, but the Excel file has proper formatting, color-coding for easy scanning, and notes in cells highlighting concerns. Open the file to see the complete comparison.

Use specific design language

The prompt includes specific design standards like "expert-grade execution" and “surgical precision and craft”. These cues push Claude toward stronger execution rather than its default output.

Ready to try for yourself?

Claude reads unstructured documents, extracts what matters for your decision, and creates structured comparisons you can use immediately. Upload any set of competing proposals—software vendors, insurance quotes, contractor bids—and get clear analysis to inform your decision.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Create interactive PDF forms

- Author: Anthropic
- Category: Professional
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/create-interactive-pdf-forms

##### Describe the task

Claude can design and build interactive forms with clickable links, drop-downs, checkboxes, and multi-page layouts for you, handling the technical details while you focus on what information you need to collect.

Tell Claude what kind of form you need to create. Describe the information you want to gather, who will fill it out, and any specific fields or sections it should include.

I'm organizing a three-day conference in June (Innovation Summit 2025) and need a professional registration form that attendees can fill out digitally.

Create an interactive PDF registration form with these sections:

Attendee Information: Full name, email (required fields), company/organization and job title (optional)

Registration Details: Dropdown for ticket type: Full Conference Pass ($899), Single Day Pass ($349), Virtual Access ($199), Student Pass ($99); Dietary preferences with checkboxes: Vegetarian, Vegan, Gluten-Free, Other; Text field for additional dietary requirements

Session Interests: Checkboxes for conference tracks (AI & Machine Learning, Sustainability, Leadership, Product Innovation, Design & UX, Data Science)

Communication Preferences: Checkbox for event updates, checkbox for sharing info with sponsors

Use a professional color scheme with a branded header. The event is "2025 Innovation Summit" at San Francisco Convention Center, June 15-17. Include contact info: [email protected].

##### Give Claude context

Given reference files or examples, Claude can match your style or design preferences, making your PDF feel cohesive with the rest of your event materials.

Required context

Upload relevant brand materials, style preferences so Claude can match color, text, or layout.

Event_Branding_Guidelines

PDF

Event_Branding_Flyer

PDF

Event_Branding_Guidelines

PDF

Optional context

Enable Extended Thinking to give Claude more time to think through and produce high quality file outputs.

Extended Thinking

##### What Claude creates

Claude creates an interactive PDF with all your specified form fields and information, ready to distribute. Recipients can open it in any PDF reader to fill in their information and send it back.

From Claude:

> I'll create a professional event registration form with all the sections and fields you specified. This will be an interactive PDF that attendees can fill out digitally in any PDF reader.
> Your registration form is ready. It includes:
> A branded header with event details and location
> All requested form fields with appropriate input types (text fields, dropdowns, checkboxes)
> Clear section organization with "Attendee Information," "Registration Details," "Session Interests," and "Communication Preferences"
> Required field indicators
> Professional styling with a cohesive color palette
> Contact information in the footer
> The form is fully interactive. When people open this PDF, they can click into any field to type, select from dropdowns, or check boxes. Their responses save with the PDF when they complete it.
> View the registration form

##### Follow-up prompts

Personalize the design

Specify any additional design or formatting changes you’d like Claude to make to enhance the form.

I've uploaded our company logo and brand colors—can you update the PDF to include both? Keep the current layout but match our style guide.

Collect and organize responses

Upload the completed forms and ask Claude to create a spreadsheet for a quick overview of responses and cumulative totals.

Extract all the data from my completed registration forms and create an Excel spreadsheet with one row per attendee and columns for all form fields. Include a summary tab showing response distributions and totals.

Tailor for different audiences

Adapt the form to your needs: translate for global audiences, customize for different user groups, or modify for specific events.

Create a Spanish version of this registration form, translating all labels and dropdown options while keeping the same structure and design.

##### Tricks, tips, and troubleshooting

Convert your existing static forms

Upload prior forms and have Claude make batch edits to add interactive elements. For simple forms, try using Haiku 4.5, which is our fastest model for more straightforward work. Use Sonnet 4.5 for when you are working with more complex layouts or unique design elements. To learn more, visit our Model Report.

Download and test before distributing

The preview in chat shows visual design, but you need to download the actual PDF to test interactivity. Click fields, try dropdowns, check tab order to ensure all works correctly before sharing.

Ready to try for yourself?

Whether you need event registration, client intake, feedback surveys, or application forms, Claude can design professional interactive PDFs tailored to your exact requirements.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Create a process flowchart

- Author: Anthropic
- Category: Professional
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/create-a-process-flowchart

##### Describe the task

Work with Claude to transform dense process documentation into flowing visual diagrams that show how your system actually works. Through conversation, you'll map out decision points, alternative paths, and volume distributions—turning dense documents into clear visualizations your team can use in real-time.

I'm uploading our enterprise software implementation playbook—42 pages of customer onboarding procedures that nobody can navigate in real-time. We have a few different paths based on data quality, integration capability, resources, and deployment readiness.

Can you help me visualize this so we can see the whole system in one view and understand how customer volume distributes across the different paths.

Create a Sankey flow diagram with organic curved paths. Make it screenshot-worthy with professional, bold typography and a natural color palette. Enable interactive zoom and pan with smooth Bezier curves. Apply Tufte-level information design.

##### Give Claude context

Provide your process document so Claude can identify the structure, decision points, and flow logic that make up your procedure to map it out visually.

Required context

Upload a file of your procedure document. Click the (+) button in the chat bar to browse through your files, or alternatively, drag and drop files into the chat box area.

Procedure document

PDF

Procedure document

PDF

Optional context

Enable Extended Thinking for Claude to think through more complex processes and produce higher quality outputs.

Extended Thinking

##### What Claude creates

Claude analyzes your process documentation and transforms it into an interactive Sankey flow diagram that visualizes implementation pathways and volume distribution across paths. Each implementation phase becomes a clickable card that reveals the detailed documentation behind it.

From Claude:

> Done! I've created a flowchart of your customer onboarding process. Let me show you what I've mapped out.
> Here's what the visualization shows:
> The Flow Structure
> I've used flowing bands where the width shows you volume—so you can immediately see that most customers (62%) take the primary path, while smaller percentages take the alternatives:
> Primary Path (sage green, 62%) — Widest band, most common route
> Alternative Path (terracotta, 23%) — Medium band for data prep
> Enhanced Path (plum, 12%) — Narrower band for premium service
> Exit Path (red, 3%) — Thin band showing where customers drop off
> Interactive Phase Cards
> Click any phase card to see detailed documentation including:
> Full process overview and qualification criteria
> Key activities and deliverables
> Common issues and success factors
> Timeline and resource requirements
> Next steps: Review the flow with your team and let me know if any decision points need adjustment or if there are edge cases I should add.
> View your implementation flow visualization

##### Follow-up prompts

Export to other formats and platforms

Using connectors like Mermaid Chart, Claude converts artifact diagrams to editable formats, generates shareable links, and provides portable code for cross-platform embedding and team collaboration

Can you convert this artifact flowchart to Mermaid.js format using the Mermaid Chart connector? I'd like an editable playground link to share with my team and the raw Mermaid code so we can embed it in our docs or export to other platforms.

Add detail to specific sections

Claude can expand on specific parts of the diagram while keeping other sections at their current level of detail, providing deeper understanding where you need it.

The implementation phase has a lot more steps than shown. Can you expand that section to include: technical discovery call, sandbox setup, data mapping session, initial configuration, testing phase, and training? Keep the other sections at their current level of detail.

Adjust the visual style

Claude can reorganize flow direction and apply color coding systems to separate different owners or stages in your diagram.

Can you reorganize this to flow left-to-right instead of top-to-bottom? Also use colors to distinguish different team owners—sales in blue, customer success in green, implementation in orange.

##### Tricks, tips, and troubleshooting

Extract structure from messy documentation

Your process document doesn't need perfect formatting. Claude identifies decision points, parallel workflows, and conditional logic from narrative descriptions, bullet lists, scattered emails, or step-by-step instructions. Upload what exists and Claude can map the underlying process structure. You can continue to work with Claude to revise and refine the process as needed.

Make edits as the process evolves

Set up a dedicated Project for process mapping. Then, upload your process documents and flowchart standards to Project Knowledge. When procedures change, start a new conversation in that Project and describe the updates—Claude maintains context on existing diagrams and your conventions, so it updates specific sections while preserving consistency. This transforms flowcharts from static snapshots into living documentation that evolves with your organization, rather than starting from scratch each time something changes.

Ready to try for yourself?

Upload any procedure document and see how quickly text-based processes become clear visual workflows your whole team can follow.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Turn emails into an event tracker

- Author: Anthropic
- Category: Professional
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/turn-emails-into-an-event-tracker

##### Describe the task

Claude connects to external tools like your email to access information at its source, then processes multiple unstructured documents simultaneously - extracting specific data in varied formats and turning them into outputs, like spreadsheets, that you can immediately use.

Tell Claude what speaker information you need pulled from your inbox and what you need created.

I'm organizing our annual conference in March and sent speaker invitations about three weeks ago to around 45 people. Used "Speaker Invitation: Summit 2025" in the subject but people replied with all different subject lines - some just said "sounds great," others replied to old email threads we had going.

Search my Gmail for speaker confirmations and extract their name and company, what session topic they confirmed, time preference if mentioned, A/V needs, travel arrangements if they brought it up, whether they've sent their bio and headshot

We're locking in the agenda next week. Build me a tracker with formulas, color-coded cells, and clear sections.Make the spreadsheet look like a boutique design studio created a data visualization piece, not like someone filled out an Excel template. The typography and color should look editorial and refined with modern professionalism. Include professional spreadsheet elements like frozen headers, sortable columns, and working formulas.

##### Give Claude context

Enable access to your tools so Claude can search for and collect the relevant information.

Required context

In Setting > Connectors, enable the Gmail integration and make sure it is toggled on in the chat bar. This allows Claude to search through your recent emails, extract details related to your upcoming event, and organize the logistics you're tracking.

Gmail

Optional context

Enable Extended Thinking to help Claude complete complex tasks and create higher quality outputs.

Extended Thinking

##### What Claude creates

Claude searches your inbox for the confirmation emails, reads through each response to find the specific details you requested, and structures all of the answers into a spreadsheet.

From Claude:

> I found 38 speaker confirmations in your inbox. Here's your coordination tracker:
> View your speaker spreadsheet
> Overview:
> 38 speakers confirmed for 32 sessions (6 panels with multiple presenters)
> Morning slots: 14 sessions | Afternoon slots: 18 sessions
> 8 sessions have complex A/V (live demos or video) - need rehearsal time
> 24 sessions are standard slide presentations
> 11 speakers still need to send bios and headshots
> Speaker Directory tab: Everyone's listed with name, company, session title, time preference, and A/V requirements. Bio status is color-coded - green if submitted, yellow if pending. Travel arrangements noted where people mentioned them.
> Production Overview: Session counts by time slot with automatic formulas. Technical requirements broken down by complexity (high/medium/standard) so you can assign rooms strategically. The 8 high-complexity sessions should go in your main room with full production support.
> Technical Production sheet: Formatted for your A/V vendor - lists sessions needing rehearsal, equipment requirements, and complexity scores. Clean enough to send directly to your tech team.
> Materials Tracking: Shows the 11 speakers who haven't submitted bios yet, with their contact info. Sorted by when they're presenting so you can prioritize Day 1 speakers for immediate follow-up.

##### Follow-up prompts

Add events to your calendar

With Google Calendar connected, Claude can create calendar events from your event tracker and add them directly to your Google calendar

Create calendar events for each confirmed speaker session on [conference dates]. Extract the speaker name, session title, and duration from the tracker and create a basic schedule into my calendar so I can start visualizing logistics.

Draft follow-up messages

Claude can help with the repetitive work of drafting similar emails for multiple recipients, while you review, personalize, and send each one.

For the 11 speakers missing bios, write friendly follow-up emails that reference their specific session topic and deadline. For the 8 sessions with complex A/V needs, draft separate emails about scheduling rehearsal time with our tech team.

Ensure spreadsheets are dynamic

If Claude created a spreadsheet with hardcoded totals, ask it to rebuild those sections with dynamic formulas that update automatically.

The speaker count and session totals should use formulas like =COUNTIF() and =SUMIF(), not static numbers. When I add new speakers or update session types, I need everything to recalculate automatically.

##### Tricks, tips, and troubleshooting

Specify how to search your inbox

Claude understands context and can find related emails even without exact keyword matches, but it needs clear direction about what you're looking for. Instead of "find important emails," try "emails from speakers about their session needs" or "customer emails mentioning billing issues in the last week." The more context you provide about what matters, the better Claude can filter what's relevant.

Download and open the actual file, not just the preview.

The preview in chat shows basic structure, but the real spreadsheet file has the formulas, color-coding, and formatting. Open the spreadsheet to see—and continue editing—the complete output.

Ready to try for yourself?

Integrate Claude with your various tools to quickly locate information within your inbox and transform it into a functional spreadsheet tracker in just minutes.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Create a company newsletter

- Author: Anthropic
- Category: Professional
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/create-a-company-newsletter

##### Describe the task

Claude can read across your company channels, identify what matters to you, and package it into a publication-style digest. You get curated company intelligence delivered in a format you'll actually want to read.

Tell Claude which week to summarize and point to the channels or topics that matter most. Ask for an interactive publication with data visualizations showing data and trends.

Create a weekly digest for Oct 14-20 for my company.

Pull information from relevant channels in my Slack, such as #company-announcements, #product-updates, #leadership, and any other channels where major decisions happened.

Include data visualizations where useful. Use a dense but readable layout. Pack information efficiently and use sophisticated typography and spacing.

Go for a British newspaper aesthetic: no gradients, shadows, rounded corners, or bright colors. Print-like typography with tight leading. Include institutional publishing elements—standfirsts, pull quotes with left borders, desk attributions, sourced charts using Chart.js. This should look hand-crafted by an editorial designer. Include substantive developments formatted like a real publication I'd read on Sunday evening.

##### Give Claude context

To create your digest, Claude needs access to your workspaces. Claude can read across all your channels to identify which updates are important to include.

For a more complete view, add additional sources where company information that you want to include lives.

Required context

In Settings > Connectors, find and enable your Slack connector and Google Drive and Gmail integrations.

Google Drive documents, coupled with Gmail and Slack discussions, offer both informal and formal information for complete coverage.

Google Drive

Gmail

Slack

Optional context

Turn on Extended Thinking so Claude can better analyze your information and create high quality outputs.

Extended Thinking

##### What Claude creates

Claude reads across all your channels, filters for important discussions, and organizes updates into topic-based sections. You'll receive a clear summary of events, without needing to piece together information from various messages.

From Claude:

> Here's your digest for October 27-31:
> View your Interactive HTML artifact
> The publication includes:
> Lead story at top with three-tier headline structure and key metrics
> Section navigation (Briefing, Product, Customers, Company, Outlook)
> Feature request trends chart comparing Q3 to Q4 (interactive Chart.js bar chart)
> Customer feedback volume over time (line chart showing requests, positive feedback, issues)
> Article summaries with desk attribution and read times
> Metric cards showing revenue closed, pipeline status, key numbers
> Deal activity cards organized by outcome (closed, pipeline, lost)
> You can share the artifact link, convert to PDF for printing, or ask me to post a condensed version to Slack.

##### Follow-up prompts

Expand coverage and depth

Add more pages and mimic a full publication. Tell Claude to include more channels in its search and create corresponding sections for each.

Turn this artifact into a complete online publication with clickable sections and full articles. Give each department its own section with more in-depth analysis, charts, pull quotes, and context.

Add visualizations

Include charts, tables, or other visual elements to make new data and trends immediately visible.

Add Chart.js visualizations: customer sentiment (positive vs issues, 4-week trend), engineering velocity (features shipped per week), pipeline breakdown by stage with values. Use line charts for trends, bar charts for comparisons.

##### Tricks, tips, and troubleshooting

Use prompting techniques to trigger specific designs

The prompt includes phrases like "Print-like typography" or "Institutional publishing elements". These descriptions help inspire Claude to design and format your information in a way that mimics digital publications and online news sites. Without them, Claude may default to more basic formatting.

Publish and share the artifact

After Claude creates an artifact, publish and share it through the URL. Others can open it in the browser, without needing a Claude account. If someone requests changes, you can ask Claude to update the artifact and republish to display the new version.

Tune preferences over time and create skills

As you discover how you like your content formatted and which channels for sourcing information work best, give Claude feedback and ask to create a Skill. Learn more about how to create a custom skill using Claude.

Ready to try for yourself?

Connect your company tools and get a readable digest, turning minutes of curated reading instead of hours catching up across channels and platforms.

Open artifact in new windowOpen artifact in new window

↑ back to top


### Personal (16)

#### Create a custom webpage

- Author: Anthropic
- Category: Personal
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/create-a-custom-webpage

##### Describe the task

Claude's vision and coding abilities work together to transform your descriptions and images into working web interfaces. Paired with your resume and past projects, Claude can create a portfolio that reflects both your professional narrative and preferred design style.

Tell Claude to build your portfolio site using your uploaded resume and project files. Specify your design preferences and that you need guidance on how to eventually deploy it.

Help me create a professional portfolio HTML page to showcase my professional career and accomplishments. I've uploaded my resume, project descriptions, and some design inspiration files. Use those to understand my background and aesthetic preferences.

For the design direction, I want something sophisticated and editorial—think high-end creative agency, not corporate template. Avoid generic layouts, AI-looking gradients, or too much symmetry. The sites I admire (in the uploads) have an organic, hand-crafted quality with unexpected details.

After you create it, walk me through publishing it live on the internet. Assume I've never deployed a website—I need exact steps that don't require any coding knowledge.

##### Give Claude context

Provide Claude with information on your professional background and design preferences to create a site that authentically represents your work.

Required context

Upload files that capture your professional story, like your resume, past projects, and other achievements you want to highlight.

Also include any files that convey your aesthetic preferences. Screenshots of portfolios you admire or even UI code snippets from designs you like help Claude understand your aesthetic direction.

Resume

PDF

Project descriptions (3-5 detailed examples of your best work)

PDF

Resume

PDF

Optional context

Turn on Extended Thinking so Claude can spend more time creating high quality outputs.

Extended Thinking

##### What Claude creates

Claude builds a complete portfolio page as an HTML artifact. The artifact includes your professional information, project showcases, and design choices to match your aesthetic preferences.

From Claude:

> I've created your portfolio site. The design pulls from the editorial, hand-crafted aesthetic in your inspiration files—I avoided symmetrical layouts and corporate templates in favor of something that feels more organic. The tape effects you mentioned appear on project cards, and I added subtle scroll animations that activate as you move through the page.
> Your resume information structures the About section, while your project descriptions each get their own showcase area with space for images and details. The typography uses a serif-sans pairing that matches the sophisticated tone you wanted, and the color palette comes from analyzing your design references.
> View your portfolio webpage
> You can open this in any browser to see how it looks. If you want to adjust colors, change project order, or modify any of the text, let me know what you'd like different.

##### Follow-up prompts

Deploy your site live

Claude can connect to Netlify to take your artifact's code and deploy it as a live website—no coding required on your end. From your artifact's HTML code, Claude can teach you how to handle the technical deployment process.

Using the code from my portfolio artifact, I want to create a real site. Use my Netlify connector, create a new site project directly in Netlify and walk me through deploying this live. I'm sharing the code from my portfolio artifact. Use my Netlify connector to create a new site project and deploy this as a live website. Give me the URL once it's live, and explain how I can update the site later if I want to make changes.

Build interactive effects

Add polish through coded animations and interactions. Claude can write HTML, CSS, and JavaScript to add functional behavior to your site—hover effects, scroll animations, or interactive elements that respond to user actions.

Add hover effects on the project cards—maybe a subtle shift or border change. When I scroll to a section, have the heading fade in slightly. Nothing flashy, just refined interactions that show attention to detail.

Expand one project into a detailed case study

Deep-dive into your most important work with the full design process.

Take the Infrastructure Monitoring Dashboard project and expand it into a full case study page. Include the problem, research phase, design process, iterations, challenges we faced, how we solved them, and measurable impact. Add sections for wireframes, user feedback, and lessons learned.

##### Tricks, tips, and troubleshooting

Improve the design of your outputs

Claude can sometimes opt for more functional design choices—standard fonts, default colors, adequate spacing. For more varied outputs, try using different prompting techniques. Reference quality benchmarks ("top-tier consulting report," "premium SaaS product"), frame Claude as a domain expert ("approach this as a senior designer would"), or ask Claude to grade and refine its own output against high quality standards. You can also tell Claude what not to do ("avoid generic corporate blue," "don't use default typography"). Getting to your final result can take iteration—after the first output, assess what's missing and prompt for improvements.

Use Skills for consistent design standards

Create a Skill that packages your visual references, successful examples, and specific design preferences so Claude can apply your established standards without re-explaining your preferences every time. Ask Claude to help create a content design skill to bundle your formatting preferences, aesthetic direction, and quality standards into a reusable workflow. Learn more about creating Skills.

Ready to try for yourself?

Work with Claude to build a portfolio page that represents your work and learn to deploy it live—all without writing code.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Elevate Claude's design using skills

- Author: Anthropic
- Category: Personal
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/elevate-claudes-design-using-skills

##### Describe the task

Claude is capable of generating great visual designs when given clear instructions and examples. However, routinely achieving high-quality results often requires detailed prompting and iterative refinements, which can be time-consuming and context-heavy. With Skills, you can package that process once, then activate high quality design thinking quickly in any conversation.

Tell Claude you want to create the ultimate design skill that will elevate any visual work to higher standards. Share what you want included in the skill, like certain frameworks, standards and processes Claude should adhere to when designing outputs.

I create a lot of visual outputs with Claude—presentations, dashboards, reports, HTML pages. They're functional but always feel generic, like first drafts rather than polished work. I want them to look like they've been through multiple rounds of professional design refinement.

I'd like to create a skill that automatically applies design thinking to any visual output I request. Something that makes Claude interrogate design choices, reference best practices, and push for excellence before delivering anything.

The skill should activate whenever I ask for presentations, spreadsheets, HTML artifacts, PDFs, or anything visual. Claude should:

Start with a functional version, then elevate it

Question every design choice (typography, color, layout, spacing)

Draw from professional design references (Stripe, Linear, Apple, Bauhaus, Swiss design)

Apply specific visual techniques rather than generic defaults

Balance bold choices with tasteful restraint

Ensure the final output looks hand-crafted, not template-based

I want the skill to have reference files that Claude consults:

A design interrogation checklist (questions to ask before delivering)

A technique catalog (specific visual moves organized by what they achieve)

A reference library (design exemplars and principles to draw from)

An elevation protocol (systematic process for refinement)

A design philosophy (principles for balancing expertise with restraint)

The goal is that when I ask "create a sales dashboard" or "make a presentation deck," Claude automatically thinks like a design director who wouldn't accept generic output. The user sees only the polished result unless they specifically ask to see the design thinking process. Help me create this skill with all the necessary reference files.

##### Give Claude context

Required context

This workflow leverages Claude's Skills system. In Settings > Capabilities > Skills, make sure code execution and file creation is turned on so Claude has the ability to create and use Skills.

Optional context

Turn on Extended Thinking for deeper strategic thinking about design frameworks and quality standards.

Extended Thinking

##### What Claude creates

Claude produces a complete skill structure with a main instruction file and supporting references. The skill is immediately usable once added to your Claude Skills library. Once you refer to ‘design excellence’ in a chat, Claude will automatically apply the skill’s visual thinking to whatever you're creating.

From Claude:

> I've created your design elevation skill. This includes a main SKILL.md file that defines when and how the skill activates, plus five reference files to consult.
> View your design-elevation/SKILL.md
> Reference Files:
> View DESIGN_INTERROGATION.md
> Five levels of questioning Claude runs before delivering any design: first principles (what's this for?), element-by-element analysis (typography, color, layout), reference checking (what could this learn from?), uniqueness assessment, and removal testing.
> View TECHNIQUE_CATALOG.md
> A comprehensive vocabulary of 400+ visual techniques organized by what they achieve—typography as form, color phenomena, depth illusion, texture quality, motion, spatial composition. Claude selects 1-2 techniques to apply strongly rather than many weakly.
> View REFERENCE_LIBRARY.md
> Curated design exemplars from modern companies (Stripe, Linear, Airbnb), historical movements (Bauhaus, Swiss Design), natural patterns (Fibonacci, Voronoi), and proven typography combinations. Claude consults this to inform design direction.
> View ELEVATION_PROTOCOL.md
> An 8-phase systematic process: foundation assessment, initial interrogation, technique selection, reference checking, disciplined application, restraint verification, final polish, and uniqueness confirmation.
> View DESIGN_PHILOSOPHY.md
> Core principles for balancing impressive expertise with restraint—when to be bold versus subtle, how expertise shows in details, why unique doesn't mean busy, and making design feel inevitable.
> How to use this skill:
> Add the entire design-elevation folder to your skills directory
> Next time you request any visual output, Claude will automatically consult these files
> You'll receive elevated outputs without needing to specify design requirements each time
> Want me to adjust any of the reference content or add additional techniques to the catalog?

##### Follow-up prompts

See the skill in action

Use this skill to evaluate and enhance existing work. Claude can recreate the output by applying the integrated techniques from the skill.

Let's test this skill. Create a quarterly performance dashboard. Use the design elevation process and show me both the initial functional version and the elevated result so I can see the difference.

Combine with MCP connections

See how your packaged expertise within Skills combines and works alongside your tools once enabled through connectors.

I have Google Drive connected via MCP. How would this design skill work when I ask you to pull an existing presentation from my Drive and improve it? Show me how the skill and the MCP connection work together.

Expand the technique catalog

Deepen the skill's vocabulary in specific areas. Or, incorporate your quality standards and specific examples into the skill instructions or framework. This helps Claude understand your desired output more clearly.

Add techniques for data visualization specifically—chart styling, dashboard layouts, and ways to make numbers more compelling visually. I also work in fintech. Add industry-leading financial design exemplars to the reference library.

##### Tricks, tips, and troubleshooting

Evolve the skill through use and refinement

After applying the skill several times, you'll notice patterns: maybe you consistently want bolder color choices, or tighter information density, or specific typography preferences. Use that feedback to update the skill file itself to embed your evolving standards. Add new quality gates that matter to you. Incorporate screenshots of work you love as reference examples. The skill can become more personalized over time.

Skills use progressive disclosure to stay efficient

When Claude works on a task, it first scans skill metadata (the description at the top) to see if the skill is relevant. Only if it matches does Claude load the full instructions. Reference files load only when actually needed. This means you can have many skills available without overwhelming Claude's context. Your design skill's 400+ techniques don't load until Claude actually needs to select techniques for a specific weakness.

Quality standard questions push beyond defaults into intentional choices

The skill forces Claude to evaluate against quality standards and benchmarks. The skill also embeds iteration as a process within the skill, rather than several rounds of prompting. This technique is used to make Claude reject generic choices and opt for more creative and unique design decisions.

Ready to try for yourself?

Create your design excellence skill and watch every visual output transform from functional to portfolio-worthy. Build the skill once, then activate world-class design thinking in any conversation

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Build interactive diagram tools

- Author: Anthropic
- Category: Personal
- Model: Opus 4.5
- Source URL: https://claude.com/resources/use-cases/build-interactive-diagram-tools

##### Describe the task

Claude can build interactive tools that let you engage with material directly, whether that's anatomy, chemistry diagrams, or historical timelines. The precision of your prompt shapes the sophistication of the result.

Describe the experience you want: what you're learning, how you want to interact with it, where the data comes from, and your aesthetic standards. Think of your prompt as a design brief.

Build an interactive anatomy explorer using @ebi-gene-expression-group/anatomogram from npm. Use homo_sapiens.male.svg and homo_sapiens.brain.svg. Don't generate diagrams yourself—these SVGs contain accurate illustrations with UBERON ontology IDs already embedded. Embed the SVGs directly into the HTML—no fetch requests needed.

Critical: The SVGs style all elements with fill:none;stroke:none by default, making them invisible. After loading, apply default fills and strokes before any other styling. Also set cleanupIds: false when optimizing (the UBERON IDs are how you target elements) and remove the visibility:hidden attribute in JavaScript.

Design requirements: Restrained and sophisticated. No glows, no emojis, no neon. Warm colors over cold. Serif headings, sans-serif body, monospace for data. Think premium medical reference, not generic AI output.

Add tabbed information panels, physical-feeling sound feedback, and content rich enough to actually learn from. Build to flagship quality from the start—I'll iterate until this is exceptional.

##### Give Claude context

For creating interactive learning tools, after describing both what you want to learn and how you want to interact with it, make sure you have the correct capabilities and features enabled.

Required context

Make sure file creation is enabled in settings for Claude to create artifacts.

Optional context

For complex multi-component apps, turn on Extended Thinking so Claude can plan architecture before building.

Extended Thinking

##### What Claude creates

Claude builds a fully functional React application with the visual design, interaction patterns, and educational content you specified, ready to use immediately in the artifact viewer.

From Claude:

> Done! I've built your anatomy explorer with the medical-grade SVGs, proper UBERON targeting, and the restrained design system you described.
> What's included:
> 1. Dual-view explorer
> Toggle between full-body and brain views. The full-body view organizes systems by color (skeletal, muscular, nervous, circulatory, respiratory, digestive) with proper anatomical positioning.
> 2. Interactive elements
> Hover any structure to see its name, UBERON ID, and primary function. Click for deeper information: clinical relevance, related structures, and quick facts. I've populated approximately 40 structures with learning-grade content.
> 3. System filters
> Tabs let you isolate individual body systems. When you select "Skeletal," non-skeletal structures fade while relevant bones gain emphasis and become interactive.
> 4. Sound design
> Subtle audio feedback on hover and selection. Soft clicks and tones that feel physical, not digital. Muted by default; toggle in the corner.
> 5. Design details
> Warm beige background, terracotta and slate accents, no harsh colors. Playfair Display for headings, Inter for body text, IBM Plex Mono for data. Generous whitespace, no visual clutter.

##### Follow-up prompts

Add self-testing

Layer in more functionality, like an active learning mode that reinforces retention.

Add a quiz mode where I'm shown a description or function and have to identify the correct structure. Track my accuracy and show which systems I struggle with.

Add advanced features

Ask Claude to expand anatomical detail where you want more granularity.

Add more body systems to the diagram. Also make the brain view more detailed.

Generate companion materials from the same session

Continue learning from different mediums. The app and study materials can share a source of truth.

From the anatomical data in this explorer, generate a printable PDF study guide with the same structures organized by system, plus a set of Anki-compatible flashcards I can import. Keep the terminology and clinical correlations consistent with what's in the app.

##### Tricks, tips, and troubleshooting

Paste errors directly into chat

When something breaks, share the error message or describe the issue. Claude can trace the logic and troubleshoot to identify the issue so you don't need to debug yourself.

Long sessions compound rather than drift

Opus 4.5 maintains your design decisions and technical context across extended conversations. Your tenth iteration still remembers your original aesthetic requirements, technical constraints, and every refinement in between. You can plan for sustained building sessions rather than trying to specify everything upfront.

Include known troubleshooting upfront

If you've hit quirks before—from previous Claude sessions or your own debugging—mention them in the prompt. This example notes that the anatomogram SVGs render invisible by default and that UBERON IDs get stripped during optimization. Without those notes, Claude writes working code that produces a blank screen, then spends iterations diagnosing.

Add sources to make it yours

Opus 4.5's context window handles substantial material. If you have a textbook chapter, lecture notes, or syllabus you want the app to cover, paste the whole thing rather than summarizing. Claude extracts structure and prioritizes content more effectively from complete sources than from your condensed version.

Ready to try for yourself?

Pick something you've been meaning to understand. Claude builds the tool; you do the learning.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Organize files across your desktop

- Author: Anthropic
- Category: Personal
- Model: Opus 4.5
- Source URL: https://claude.com/resources/use-cases/organize-files-by-whats-in-them

##### Describe the task

Grant Claude access to your desktop. In Cowork, it sees the same chaos you do: scattered screenshots, project folders with cryptic names, downloads you never moved. It reads through everything and sorts it into a clean folder structure.

Come back to a tidy desktop and a summary of what went where.

Please help organize my desktop. Evaluate all of the scattered files and organize based on the contents inside of them.

##### Give Claude context

Cowork is a workspace in Claude Desktop that works directly with your local files. Grant it access to your desktop and it navigates and moves files the same way you would — no uploading required.

Required context

To get started:

Download Claude Desktop and start a Cowork session

Grant desktop or folder access when prompted

Optional context

Specific folder structure you prefer (by date, by project, by file type)

Rules for what to keep vs. archive vs. delete

##### What Claude creates

Cowork scans your desktop, categorizes each file, and creates a folder structure. You'll see progress updates as it works and a summary of what changed.

From Claude:

> I'd be happy to help organize your desktop! Let me first take a look at what's currently there.
> Running command...
> That's quite a cluttered desktop! I can see you have a mix of project folders, screenshots, photos, and documents scattered around. Let me sort through these.
> Before: 180+ items scattered across your desktop
> After: 5 clean folders
> Screenshots — 19 screenshots
> Photos — 53 photos
> Videos — 18 video files
> Documents — 24 items (notes, CSVs, forms)
> Projects — 75 code project folders
> Cleaned up
> Removed 3 empty junk files
> Removed 4 empty folders
> Consolidated backup folders into Documents
> Your desktop should now be much easier to navigate!

##### Follow-up prompts

Reorganize by your own logic

Apply your own categories instead of the defaults. If you organize by client, by date, or by project phase, tell Cowork and it will restructure.

"Actually, split the Projects folder by language — Python projects in one folder, JavaScript in another, and everything else in misc."

Find something you lost

Cowork remembers what it moved and where. If you're hunting for a file in the new structure, ask.

"Where did that budget spreadsheet end up? I think it was called Q3_budget or something like that."

Create an ongoing system

Set up folder conventions you can maintain. One cleanup helps, but a system keeps things tidy going forward.

"Set up a Downloads folder too, and show me a simple system for where new files should go so this doesn't pile up again."

##### Tricks, tips, and troubleshooting

Your files stay on your computer

Cowork runs locally. It can see and move your files, but nothing gets uploaded anywhere. The organization happens right on your machine, same as if you did it yourself.

Start with one area if you're nervous

If granting full desktop access feels like too much, use "Work in a folder" to point Cowork at just your Downloads or Documents folder first. You can always expand access once you see how it works.

Be specific about what you want to keep

Cowork will ask before deleting anything that looks important, but if you know certain file types are always junk (like .tmp files or duplicate downloads), mention that upfront. The clearer your rules, the more Cowork can do without checking in.

Start another task while this one runs

Organizing a full desktop takes a while. Open a new session from the sidebar for other work. You'll see a grey dot in the sidebar when this one needs attention.

Ready to try for yourself?

The next time your desktop gets cluttered, open Cowork and let it handle the sorting.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Map your understanding and build lessons from the gaps

- Author: Anthropic
- Category: Personal
- Model: Opus 4.6
- Source URL: https://claude.com/resources/use-cases/map-your-understanding-and-build-lessons-from-the-gaps

##### Describe the task

Opus 4.6 maps what you already understand before trying to explain anything. It asks diagnostic questions, finds the specific point where your reasoning breaks, and builds the explanation from that gap.

From a single conversation, it produces three artifacts: an interactive lesson built around your misconception, a workbook that applies the concept to your own data, and a concept map connecting forward. Describe the concept you're stuck on and what you do understand. Your prompt doesn't need to be precise — Claude narrows it down from there.

I keep running into “Bayesian reasoning” in things I read—essays, podcasts, even conversations at work. People say “update your priors” or “you’re ignoring the base rate” and I nod along, but I can’t actually follow the logic when it gets specific. I understand basic probability fine. I can calculate odds, I know what a conditional probability is in the abstract. But when someone explains why a 99% accurate test doesn’t mean a 99% chance you’re sick, I lose the thread halfway through.

Help me understand this. Then build me an interactive lesson, a workbook I can use to audit which signals in my hiring pipeline actually predict success, and a concept map connecting it to what I’ll encounter next.

##### Give Claude context

The diagnostic works from conversation alone. If you have data you'd like Claude to apply the concept to, the sections below cover what to upload.

Required context

No files needed for the diagnostic itself. If you want a personalized workbook, upload a CSV or XLSX export of your data. Opus 4.6 scans across the full dataset and builds the analysis around your actual figures.

Optional context

Your screening or pipeline data: CSV or XLSX with candidate records, interview scores, hiring decisions, and outcomes, or any data where you're using a signal to screen or sort a population

Extended Thinking gives Opus 4.6 space to think step by step before responding. For a task like this, where Claude needs to reason carefully about your knowledge structure to find a hidden misconception, that extra reasoning depth makes the diagnostic more precise. You can see Claude's thinking process as it works through the problem.

Extended Thinking

##### What Claude creates

Claude asks diagnostic questions first, probing what you know until it identifies the specific misconception. Then it rebuilds from the gap and produces all three artifacts. Opus 4.6 stays persistent through this entire sequence, and its writing keeps pace—the explanation, lesson, workbook, and concept map all maintain a consistent voice calibrated to your actual comprehension level.

From Claude:

> Let me figure out where your understanding is solid and where it breaks.
> You said you understand basic probability and conditional probability in the abstract. Quick scenario: a disease affects 1 in 1,000 people. A test is 99% accurate. You test positive. What's the probability you actually have the disease?
> [After your response]
> You said about 99%. That's the exact misconception I was looking for.
> The answer is about 9%. Imagine testing 1,000 people. One has the disease, and the test catches them. But of the 999 healthy people, 1% get false positives. That's about 10 people. So you have 11 positive results, and only 1 is actually sick.
> The core confusion: people treat the accuracy of a signal as the probability of the conclusion, without asking how common the thing they're looking for is. A hiring manager sees that 90% of successful hires had a certain trait, so they screen for it. But if 90% of all candidates have that trait, it predicts nothing.
> Now let me build you three things you can keep.
> Interactive lesson: Base rate explorer
> [View the interactive lesson]
> A simulator where you adjust base rates, test accuracy, and specificity across domains and watch how the ratio of true positives to false positives shifts in real time.
> Signal audit workbook: your hiring pipeline
> Since you uploaded your spreadsheet, I pulled your team's hiring data directly. Three tabs: your pipeline with base rates at each stage, a signal audit showing which interview criteria actually predict success (your technical assessment moves the needle from 8% to 34%; your culture fit score barely moves it), and a decision framework for evaluating any screening criterion.
> [Download: signal-audit-workbook.xlsx]
> Concept map: how Bayesian reasoning connects forward
> A one-page visual connecting base rate reasoning to signal detection theory, the prosecutor's fallacy, information gain, and why A/B tests need control groups. Each concept links to the reasoning chain that explains it.
> [View the concept map]

##### Follow-up prompts

Test it against your own data

Upload your pipeline or screening data and ask Claude to separate real signals from noise. Opus 4.6 scans across large files and datasets before responding, so it handles messy real-world numbers without oversimplifying.

Here’s my team’s full hiring pipeline from the last 2 years—applications through 12-month retention. Walk me through which interview criteria actually predict success once you factor in the base rates. I especially want to know about our new case study exercise—we added it in Q3 and our hire quality seems better. Is the case study a real signal or are we seeing what we want to see?

Keep working in your spreadsheet

Open the workbook in Excel and continue the analysis with Claude in Excel. Claude works directly in a sidebar in Excel—it can read your data, modify formulas, and build on the workbook without leaving your spreadsheet.

I downloaded the signal audit workbook. Can you add a tab that checks whether any of our interview signals are redundant—measuring the same thing as another signal we already screen for? I want to cut the ones that aren’t adding new information.

Build a longer learning sequence

Connect this concept into a multi-session learning project. Opus 4.6 carries instructions through longer sessions without drifting, so your diagnostic context holds as you move through related topics.

Now that I understand base rates, I want to build out my understanding of the related concepts on the map—signal detection theory, information gain, and the prosecutor's fallacy. Can you create a learning sequence that covers one per session, with a workbook for each?

##### Tricks, tips, and troubleshooting

Front-load what you know

Opus 4.6 invests in understanding your knowledge structure before trying to change it. The more clearly you describe where your understanding is solid, the faster Claude can locate where it breaks. “I understand basic probability but I can’t follow base rate arguments” is a sharper starting point than “I don’t understand statistics.” The gap between what clicks and what doesn’t is usually where the misconception lives.

Say it once

You don’t need to repeat your requirements or add “and remember to...” reminders. Opus 4.6 follows instructions precisely through the full diagnostic, the artifact construction, and any follow-ups. State what you want upfront and trust that it carries through.

Start in chat, expand in Cowork

The diagnostic conversation and interactive artifacts work well in Claude.ai chat on your web browser. If you want to build a longer learning project that spans multiple sessions (covering related concepts and building workbooks from different datasets), use Cowork in Claude Desktop [Research Preview]. Opus 4.6 stays persistent across extended projects, and Cowork maintains context across conversations and saves files directly to your machine.

Ready to try for yourself?

Describe a concept you're stuck on and what you do understand. Claude builds the explanation from there.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Stress-test your financial plan across scenarios

- Author: Anthropic
- Category: Personal
- Model: Opus 4.6
- Source URL: https://claude.com/resources/use-cases/stress-test-your-financial-plan-across-scenarios

##### Describe the task

Opus 4.6 synthesizes across your full set of financial documents before building anything. It connects variables that most calculators treat independently — tax brackets, withdrawal sequences, Social Security timing — and reasons through how they cascade over decades.

Describe your situation and what you want to understand. Your financial documents, covered in the next section, provide the detail. Opus 4.6 determines the approach, runs the analysis, and produces working spreadsheets and scenario explorers. From there, you can keep working in Claude in Excel.

I’m 52, hoping to retire at 62. My partner and I have about $1.2M across a 401(k), Roth IRA, and taxable brokerage. I make $185K, he makes $95K, we spend about $8,500/month. Mortgage is paid off in 2031. Not sure if we should be doing Roth conversions now while we’re in a lower bracket.

I’ve uploaded our tax returns, investment statements, Social Security estimates, and budget. Where does this plan break and what are the highest-leverage moves?

##### Give Claude context

The more complete your uploads, the more connections Claude can find across your tax situation, investment accounts, and benefit estimates.

Required context

Upload your financial documents: tax returns, investment account statements, Social Security benefit estimates, and a monthly expense breakdown.

Tax Return

PDF

Account Statement

PDF

Tax Return

PDF

Optional context

Extended Thinking lets Claude scale how deeply it reasons based on task complexity. Turning it on gives Claude more room to reason through complex, interdependent variables before producing results.

Extended Thinking

##### What Claude creates

Opus 4.6 produces a working financial model with probability distributions across a range of modeled scenarios, an interactive scenario explorer, and a clear action plan. Keep in mind, Claude produces outputs based on the documents you provide. You should review any strategies with a qualified financial professional before acting on them. Here’s the kind of analysis you’ll get:

From Claude:

> I’ve read through all your documents. Before building anything, I want to flag something: your mortgage payoff in 2031, your peak earnings window, and the Roth conversion opportunity all overlap. That’s actually a timing advantage most calculators would miss. Here’s what I found.
> Financial snapshot: Combined income, savings by account type, monthly spending, savings rate, and estimated Social Security benefits.
> Monte Carlo results: Estimated success rate to age 92 based on historical return distributions, median portfolio at key ages, and the 10th-percentile downside. These results shift meaningfully when you change the underlying assumptions, which the scenario explorer lets you do.
> Potential vulnerabilities in the model: Sequence-of-returns risk. A bear market in your first two retirement years drops estimated success rates significantly. The same downturn a decade later barely registers.
> Three strategies with the largest impact on estimated success rate: Roth conversion ladder, delaying Social Security to 70, and a two-year cash buffer, each with a modeled impact on the probability distribution.
> Interactive scenario explorer: Toggle strategies on and off and watch the probability distribution shift. Adjust returns, inflation, and spending assumptions.
> Downloadable spreadsheet: Adjustable inputs, Monte Carlo results, Roth conversion schedule, withdrawal sequence, and year-by-year tax projections.
> Important: This analysis models scenarios based on the inputs you provided and general financial principles. It does not account for your full financial picture, tax situation, or personal circumstances the way a licensed advisor would. Review any strategies with a fee-only financial planner or CPA before making changes to your plan.

##### Follow-up prompts

Stress-test a life change

Opus 4.6 stays with the full complexity when you throw a wrench in the plan. Describe a scenario and it re-runs the entire analysis, tracing how one variable ripples through income, taxes, withdrawal sequences, and long-term success rate without simplifying away the interactions.

What if I lose my job at 57 and can only find work at $120K? How does that change the Roth conversion window?

Take the model into Excel

Opus 4.6 produces downloadable spreadsheets you can open in Claude in Excel to keep adjusting. Change an assumption, test a new scenario, or extend the projections without rebuilding anything from scratch.

I want to play with the inflation assumptions. What happens to the withdrawal sequence if we get a 5% inflation year in 2029?

Ask what you’re missing

Opus 4.6 reasons across finance and tax at domain-expert level and will surface things you didn’t think to ask about, like a narrow window for conversions created by a tax bracket transition or a withdrawal order that saves you money over decades. Push it further.

What would a financial planner flag about this plan that I haven’t asked about?

##### Tricks, tips, and troubleshooting

Start with your situation

If you aren't sure about the approach you'd like to take, describe your financial situation and what you want to understand. Opus 4.6 identifies an analytical approach from your context on its own.

Upload everything at once

Opus 4.6 synthesizes across your full document set before building anything, finding interactions between your tax returns, investment statements, and Social Security estimates that cascade through each other. The more complete the picture, the stronger the analysis.

Run longer analyses through Cowork

If your financial documents are already on your computer, Cowork in Claude Desktop [Research Preview] can read them directly from a folder rather than uploading individually. For complex plans with many accounts, tax considerations, and interdependent variables, Cowork handles longer-running analysis without hitting context limits, spinning up sub-agents to model different scenarios in parallel before synthesizing the results.

Start another task while this one runs

Financial modeling runs across many variables and scenarios. Open a new session from the sidebar for other work. You'll see a grey dot in the sidebar when this one needs attention.

Ready to try for yourself?

Try Opus 4.6 with your financial plan and see how changing one input ripples through the entire model.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Thoughtful gift giving with Claude

- Author: Anthropic
- Category: Personal
- Model: Opus 4.5
- Source URL: https://claude.com/resources/use-cases/thoughtful-gift-giving-with-claude

##### Describe the task

The best gifts show you've been paying attention. Claude helps you think through gift ideas that actually fit each person, not just generic suggestions by category. From there, you can search your notes and messages for hints you've forgotten, use web search to find specific products locally, and use Claude for Chrome to buy, book pickup, and coordinate with others.

I always forget stocking stuffers until the last minute and end up panic-buying junk. This year I want to fill stockings with small things people will actually use or enjoy. Help me think through good stocking stuffer ideas for my family that I can find locally this week:

Wife (38) — really into skincare lately, drinks a lot of tea, always cold

Son (12) — obsessed with basketball, just started getting into music

Daughter (9) — loves art projects, reads constantly, very into her pet hamster

Dad (67) — impossible to buy for, likes golf and grilling, diabetic so no candy

Mom (65) — does crossword puzzles every morning, into bird watching, practical about gifts

Can you put this together in a shopping list I can reference?

##### Give Claude context

The more context you share about each person, the more specific and thoughtful Claude's suggestions become. Even small details help Claude move beyond generic category gifts to items that show you've been paying attention.

Required context

None.

Optional context

Enable Web Search: Claude can find specific products, check local store availability, and surface gift ideas based on current trends and reviews.

Enable iOS Connectors (Notes, iMessages): In Claude for Desktop, Claude can access additional tools, like iOS apps. It can search your notes and messages for gift hints you've forgotten, like when your mom mentioned wanting a specific bird feeder or your son texted about a new album he loves.

Enable Extended Thinking: For large families or complex gift logistics, Extended Thinking helps Claude consider constraints like budget limits, avoiding duplicates, and coordinating across multiple stores.

Extended Thinking

Web Search

Connectors

##### What Claude creates

Claude generates a personalized shopping list organized by recipient, with specific product suggestions, reasoning for each choice, and a store-run strategy that minimizes trips.

From Claude:

> What a great goal. The best stocking stuffers usually hit one of three notes: they show you noticed something specific about the person, they upgrade something they already use, or they remove a small friction from their daily life.
> Let me put together a practical list with that lens.
> Here's your list. A few things that made these choices land better:
> The pattern I used: For each person, I looked for items that either upgrade something they already do daily (mom's crossword pens, wife's tea), show you noticed a specific thing about them (daughter's hamster, son's new music interest), or solve a small annoyance (hand warmers for someone always cold, book light for a kid who reads past bedtime).
> For your dad specifically: "Impossible to buy for" often means someone who just buys what they need. Consumables work well here because they don't add clutter. Golf gloves wear out, nuts get eaten, spice rubs get used up. He doesn't have to find a place for them.
> One store strategy: If you're short on time, Target + one sporting goods store gets you about 80% of this list. Add a quick pet store stop for the hamster treats and you're covered.

##### Follow-up prompts

Search your notes and messages for forgotten hints

You've probably captured gift ideas throughout the year without realizing it. Claude can search your notes and messages to find those moments when someone mentioned wanting something specific.

Can you search through my notes and messages from the last few months? I feel like my wife mentioned a specific skincare brand she wanted to try, and I think my son texted me about some basketball shoes. Pull out anything that looks like a gift hint.

Find specific products you can actually buy

Move from general ideas to specific items with prices and availability. Claude can search for products that match your criteria and fit stocking-stuffer budgets.

For the loose leaf tea sampler and the rechargeable hand warmers on my wife's list, can you search the web to find specific products under $25 that have good reviews? I'd prefer options I can pick up at stores near me this week, but show me online options too in case I need to order.

Let Claude interview you about someone you're stuck on

If you're drawing a blank on someone, let Claude ask the questions. Sometimes the right gift surfaces when you're prompted to think about the person differently.

I'm completely stuck on my brother-in-law. I don't know him that well and I never know what to get him. Can you interview me about him? Ask me questions that might help surface a good gift idea.

##### Tricks, tips, and troubleshooting

Share specific details, not just categories

Really into skincare lately" is good. "Just started using retinol and complains about dry winter skin" is better. The more specific your context, the more targeted Claude's suggestions.

Set a per-person budget upfront

Tell Claude your stocking stuffer budget (e.g., "$50 per person" or "$15-20 per item") and it will filter suggestions accordingly. This prevents great ideas you can't actually use.

Check your messages before you start

Enable iMessage search first and ask Claude to look for gift hints. You might already have the perfect ideas buried in conversations from months ago.

Group your list by store before you go

Once Claude generates ideas, ask it to reorganize the list by store type rather than by person. This makes it easier to see everything you need from Target in one place versus bouncing between sections of the list.

Ready to try for yourself?

Next time gift-giving stress hits, open Claude and describe who you're shopping for. Start with the basics, let Claude search for ideas, then execute the shopping run without the usual scramble.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Build a custom bucket list

- Author: Anthropic
- Category: Personal
- Model: Opus 4.5
- Source URL: https://claude.com/resources/use-cases/build-a-custom-bucket-list-app

##### Describe the task

Claude can build custom interactive tools tailored to your individual goals. Describe the experience and interface you want and Claude designs a custom app with the features and feel you have in mind.

Tell Claude what you want to track, organize, or build, and how you want it to look and feel.

I want to create an interactive "bucket list builder" that feels like browsing a beautiful, high-end boutique, but for life experiences instead of products.

The concept: Transform "I should make a future goals list" into something more joyful. Instead of just a normal list, I want an experience.

Design: This needs to look like a world-class iOS app. Clean, intentional graphic design. Every detail (typography, spacing, hierarchy) should feel curated and thought-through. The end result should be stunning.

Include: Experiences by category; saving certain experiences to "My List"; toggles between browsing and viewing saved items, satisfying interactions when selecting items.

Populate it with beautiful life experiences to browse. Then, add in some additional fun surprises!

##### Give Claude context

Claude can build interactive apps directly in conversation. No uploads or external tools needed. For more sophisticated designs, giving Claude direction about the aesthetic you want produces dramatically better results.

Required context

Optional context

Turn on Extended Thinking to give Claude more time to reason through creating its outputs.

Extended Thinking

##### What Claude creates

Claude builds a fully interactive application matching your specifications, browsable, clickable, and styled to your design standards.

From Claude:

> I've created your bucket list builder with that high-end boutique feel. Here's what I built:
> Design approach: Clean iOS-style aesthetics with SF Pro typography sensibility, generous whitespace, and subtle elevation changes on hover. The color palette stays neutral (#1C1C1E, #8E8E93, #F2F2F7) so the experience descriptions become the color, through imagination.
> Features:
> Category filtering across Wonder, Adventure, Craft, and Achievement
> Toggle between Browse and My List views, each experience card shows timeframe and relative cost, and smooth hover states and satisfying save interactions
> Various curated experiences from Northern Lights to Japanese tea ceremonies
> Click any card to add it to your list. The saved count updates automatically. Try filtering by category, then switching to My List to see your curated collection.
> Want me to adjust the styling, add more experiences, or change how the categories work?

##### Follow-up prompts

Turn dreams into plans

Make the app a launchpad, not just a list. Add a button that generates a ready-to-use prompt for a future Claude conversation, pre-filled with context about the experience you want to pursue.

Add a 'Make this happen' button on each saved card. When I click it, show me a prompt I can copy into a new Claude chat. The prompt should include the experience name and my description, then ask Claude to help me research to help me accomplish it.

Receive suggestions for what's next

Embed Claude's intelligence directly in your app. Artifacts can call Claude to analyze your choices and generate fresh recommendations on the fly. This isn't static logic—it's Claude thinking inside your tool.

Add a 'Surprise me with something new' button. When I tap it, have the app send my saved experiences to Claude and ask it to suggest one I haven't considered—something that fits the patterns in what I've chosen and show Claude's reasoning.

Add animation and personalization

Motion and small personal touches make the difference between a prototype and something you want to use. Ask for intro animations, hover effects, or a setup screen that tailors the experience to you.

Add a first-time setup that asks my name and birthday. Use my name in the header and calculate my age somewhere subtle. When I mark something complete, animate the card to explode into hundreds of tiny, dissolving particles that keep the card's colors. Make it satisfying.

##### Tricks, tips, and troubleshooting

Use pictures as quick references

Upload a screenshot of an app you love. "Make it feel like this" gives Claude more to work with than describing aesthetics from scratch. You can also screenshot your artifact and circle something specific: "This part. Fix this."

Your artifact can think

Artifacts can call Claude directly—not just display static content. This means your app can analyze what you've saved, generate personalized suggestions, write custom text, or respond to what you're doing. Ask Claude to "embed AI in the app" or "have the app call Claude" when you want your tool to reason, not just display.

Reuse what works

Once you have an aesthetic you like, ask Claude to apply it elsewhere. "Use this same design system for a reading list tracker" or "Make me a gift ideas app with this exact visual style." You've already done the hard work of defining the feel.

Ready to try for yourself?

Create interactive tools with custom interfaces, tailored to how you like to explore and learn. Describe and refine your ideas with Claude to make tools useful for you.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Design a local foraging guide

- Author: Anthropic
- Category: Personal
- Model: Opus 4.5
- Source URL: https://claude.com/resources/use-cases/design-a-local-foraging-guide

##### Describe the task

Build a location-aware guide to wild plants in your region. Select your state on an interactive map, browse plants by category, see what's in season now, and export a printable field reference.

Tell Claude the tool's purpose, the interaction flow, and your design direction. Specific functional requirements and aesthetic cues produce more polished results.

I want to build a foraging guide for someone new to wild edibles and unsure where to start.

What it should do:

Let users click their state on an interactive US map to see regional foraging data (fetch map data from the us-atlas TopoJSON CDN at https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json and render with D3's geoAlbersUsa projection)

Browse edible plants by category and show a 12-month season bar for each species so users see harvest windows at a glance

Let users tap any plant to expand details, then let users add plants to a personal foraging list and export a printable field guide with their selected species and safety reminders

Design: Quiet and organic. Warm cream, muted sage, soft olive. Think field journal meets editorial magazine—sophisticated but approachable. Smooth transitions, rounded corners, good type hierarchy.

##### Give Claude context

Claude builds working artifacts directly in conversation. Enable Artifacts in settings so Claude can create interactive applications you can use immediately.

Turn on Artifacts in your settings. This lets Claude generate apps with full interactivity—maps, state management, data visualization—that render right in the chat. No setup or deployment needed.

Required context

For complex, multi-component apps, turn on Extended Thinking so Claude can plan architecture before building.

Optional context

Extended Thinking

##### What Claude creates

Claude produces a complete, working foraging guide beginning with an interactive US map where clicking a state reveals regional plant data.

From Claude:

> I've built your Wild Edibles Field Guide. Here's what you can do:
> Explore by region — Click any highlighted state on the map. The guide currently includes data for the Pacific Northwest (Washington, Oregon, Idaho) and Northeast (Maine through Maryland). Other regions show as coming soon.
> Browse by category — Once you've selected a state, use the tabs to explore wild greens, berries, mushrooms, roots, and nuts available in your region.
> Check seasonality — Each plant card shows a 12-month bar indicating harvest windows. The current month is highlighted so you immediately see what's in season.
> Dig deeper — Tap any card to expand details: where to find it, how to prepare it, and any look-alikes to watch for. Plants with dangerous look-alikes show a warning panel.
> Build your list — Click the + button to add plants to your foraging list. Your selections appear in a floating panel that tracks your count.
> Export a field guide — When you're ready, export generates a printable reference with your selected species, preparation notes, and safety reminders.
> View your Field Guide

##### Follow-up prompts

Swap in verified information

The guide uses sample data to demonstrate how it works. Once you're happy with how it looks and feels, ask Claude to research real species for your region—actual harvest seasons, verified identification details, up to date safety warnings.

Replace the examples in the artifact with current foraging data for my region. Research verified harvest windows, accurate identification tips, and documented look-alikes. I want to use this in the field.

Identify something in the field

Upload a photo and work backwards from what's in front of you.

I've attached a photo of something I've found along the trail. Based on the image and my region, what could it be? What should I check in person—gill structure, spore print, smell—to confirm? Tell me what you can and can't determine from the photo alone.

##### Tricks, tips, and troubleshooting

Learn from what Claude builds—or reuse it directly

Ask Claude to walk through the logic so you understand the pattern, not just the output. Or skip the explanation and copy the code directly from the artifact as a starting point for something new. See an example that reuses this pattern to create an interactive gardening guide.

Keep refining in the same conversation

Claude holds context across many exchanges, so you can iterate extensively without starting over. Add a feature, test it, notice something off, describe the issue, get a fix. This back-and-forth—sometimes dozens of rounds—is how complex tools come together. You're not bothering Claude by asking for changes; that's how the process works.

Interactive maps work best with a data source

Claude doesn't have precise geographic boundaries memorized—state outlines, coastlines, county borders. Without a pointer to real cartographic data, it sometimes approximates with placeholder shapes instead of accurate maps. The prompt solves this by specifying a TopoJSON source (a standard format for map data). Claude fetches the real boundaries and renders them correctly. If your map looks off, check whether you've pointed to actual geographic data.

Ready to try for yourself?

Create interactive tools with custom interfaces, tailored to how you like to explore and learn. Describe and refine your ideas with Claude to make tools useful for you.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Turn text threads to researched notes

- Author: Anthropic
- Category: Personal
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/turn-text-threads-to-researched-notes

##### Describe the task

Using model context protocol (MCP), Claude can connect to your everyday tools and apps. When you enable connectors, Claude pulls context directly from Messages or Notes and saves organized information back to your apps, eliminating the need for copying, pasting, or switching between tools.

Point Claude to a message thread. It'll find the relevant conversation, research solutions, and then write to your notes for structured, organized information you can access anywhere.

I just got a text from Sarah asking me to bring dessert to Saturday's potluck—there will be about 15 people.

Can you read my Messages to see the full context, then help me figure out what to make? I need something that's impressive but not too complicated, travels well, and can be made Friday night since Saturday morning I'll be busy.

Research dessert options that fit those criteriasave recipe opping list to my Notes app—group the shopping list by store section so I'm not running back and forth, and include any technique tips that'll help me nail it.

To ensure correct formatting in my notes, using HTML tags to create natural line breaks. Use abbreviations and concise language so the note isn't overly long.

##### Give Claude context

Claude can connect to Messages to understand the full thread context, search the web for current dessert recipes that match what you're looking for, and save the organized recipe and shopping list directly to your Notes app.

Required context

To access system-level connectors, download Claude for Desktop.

Then, in Settings > Connectors, click ‘Browse Connectors’, and enable the Messages and Notes connectors under ‘Desktop extensions’.

Turn on Web Search in the chat bar so Claude can search for recipes and reviews online as a next step.

iOS Messages

iOS Notes App

Optional context

Make sure Web Search is turned on in the chat bar so Claude can search for recipes and reviews online as a next step.

Web Search

##### What Claude creates

Claude analyzes your messages for key details within conversation threads, then uses Web Search to find relevant options online. Finally, it stores organized notes in your Notes app, accessible across all your devices.

From Claude:

> Got it! I read through your messages with Sarah and picked up the important stuff—there are a couple vegetarians coming, one person needs gluten-free, and it's a casual backyard thing on Saturday afternoon.
> So I looked up desserts that travel well and can be prepped ahead, since you mentioned you're busy Saturday morning. Salted Caramel Swirl Brownies would be perfect here. They're the kind of thing that looks impressive but isn't actually complicated, they taste even better the next day (so Friday night baking works great), and you can easily make a small separate batch for your gluten-free guest.
> ✓I've saved a note to your Apple Notes:
> "Brownies - Sarah's Party"
> All your ingredients are organized by where you'll find them in the store—baking aisle, then dairy, then condiments. No running back and forth. I noted quantities and threw in some optional touches if you want to make them extra nice. Should be about 50 minutes of hands-on work plus 30 minutes in the oven. And honestly, letting them sit overnight makes them even fudgier, so Friday night timing is actually ideal. You can check your Notes app whenever you're ready to shop or bake.
> Below the shopping list is the step-by-step recipe with timing notes so you know what to expect. I included tips on getting that swirl pattern right and how to test when they're done. Also added a mini-recipe for the gluten-free version using almond flour.

##### Follow-up prompts

Send replies and set reminders

Ask Claude to reply to the host with what you're bringing and to set a reminder to go shopping. Claude can both read and write to your Messages and Reminders app.

Please send Sarah a message back saying I'll bring brownies for 15 people. Let her know I can make a small gluten-free batch too. Then, set a reminder for 6pm to stop at the grocery store on the way home from work.

Adapt to new information

Have Claude intelligently adjust the output when details change.

Sarah just texted that it's 25 people now. Update my Notes with 1.5x quantities for both the recipe and shopping list.

Try it out in other platforms

Claude can connect to a variety of your communication tools. Apply this workflow wherever you work.

My team's been chatting about a workshop in Slack. Read those messages, research venue options nearby, and save a planning timeline to my Notes.

##### Tricks, tips, and troubleshooting

Connect to your iOS or Android apps

Claude can now connect with your device's system apps to help you take action directly from your conversations. When you chat with Claude, it can draft messages, emails, or calendar events, find locations, and manage reminders — all seamlessly integrated with your mobile apps.

Formatting for Notes

Keep in mind the Notes app may need different structure than a normal file output. For better formatting when creating content for Apple Notes, ask Claude to use HTML breaks for spacing between lines and sections, abbreviations to keep notes brief, and to prioritize quick reference information, so the content is easily viewable on mobile formats.

Privacy control stays with you

Each connection you enable expands what Claude can access and where it can do work, but you stay in control. Claude only reads conversations you allow it to and only saves to apps you've connected when granted permission.

Ready to try for yourself?

Next time you're juggling requests and scattered information, point Claude to your messages to find and organize small details, saving you time and hassle.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Turn inspiration into design plans

- Author: Anthropic
- Category: Personal
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/turn-inspiration-to-design-plans

##### Describe the task

Claude can analyze images to identify design styles across your saved inspirations—pinning down the specific aesthetic so you can find matching pieces and communicate your vision to contractors. It can then search across price ranges to show you where to save and where it's worth investing.

Ask Claude to identify the style in your saved images, explain what defines it, and find furniture you can actually buy. Request a spreadsheet organized by furniture type so you can compare costs, quality, and which pieces are worth investing in.

I'm planning a kitchen reno and I've saved images of kitchens I love, but I'm overwhelmed by the choices. Figure out what style I'm going for and help me make smart purchase decisions about where to spend and where to invest.

Analyze my images and identify the style. Break down what defines it and how it differs from similar styles. Research materials across countertops, cabinets, flooring, backsplash, and hardware. Find 3-5 options per category at budget, mid-range, and premium levels with brands, pricing, quality ratings, and investment priorities.

Create an workbook with:

Style guide—color palette with hex codes, signature materials, style distinctions, shopping strategy

Material database—all options with pricing, quality scores, investment priorities color-coded

Three packages with material selections and auto-calculating formulas

ROI sheet with financial projections, splurge-vs-save guidance color-coded, implementation timeline

Use elegant formatting with premium typography (Garamond headers, Inter body) and incorporate the aesthetic's color palette into the workbook with sophisticated visual hierarchy, and gallery-level design quality.

##### Give Claude context

Claude can analyze reference images to identify your design inspiration and find pieces that match your style and are worth the investment.

Required context

Upload your saved design inspiration images—Pinterest boards, screenshots of interior design you love, or photos of specific elements that catch your eye.

mood board screenshot

JPEG

product reference image

JPEG

mood board screenshot

JPEG

Optional context

Claude can search the web to find retailers that match your design style at different price points.

Web Search

##### What Claude creates

Claude provides a spreadsheet that consolidates all research from your preferences, including style definitions, furniture options by type, price comparisons, and direct links, enabling you to make informed decisions and edit as needed.

From Claude:

> Done! Here's Your Kitchen Renovation Strategy
> What I Created:
> I identified your style (Modern Organic—clean minimalism with warm natural materials) and built you a 4-sheet workbook:
> Sheet 1: Style Guide: Color palette with hex codes for all signature colors Material hierarchy (60% foundational, 25% secondary, 15% accents) Style distinctions: vs Scandinavian, Japanese, Modern Farmhouse, Industrial Retailer strategy by budget tier Common mistakes to avoid
> Sheet 2: Material Database: (22 curated options) Every category researched with real products
> Sheet 3: Three Complete Packages :Budget ($8,540): 80% of the look—smart trades, best if selling in 3-5 years Mid-Range ($24,313): 95% of the look—best ROI at 74% recovery Premium ($37,748): Full authentic version—for 10+ year ownership
> Sheet 4: Investment Strategy & ROI Financial projections with formulas
> View your renovation spreadsheet

##### Follow-up prompts

Conduct further research

Use Research to learn more about different products and materials before committing.

Research the quartz countertop brands in my mid-range package. What do contractors say about installation issues? Are there common staining or etching complaints after a few years? Have any of these brands had quality problems or recalls? I want to know the reality before I order.

Adjust the format

Turn your research into a clear plan to share with contractors. Claude can synthesize information from multiple formats—spreadsheets, images, style guides—into a single structured document.

Create a contractor brief document with the style breakdown, selected materials with specs and sources, budget allocation by category, must-haves versus flexible items, and key questions about their experience with these specific materials. Make it something I can send to get accurate bids.

Implement your ideas

Use your spreadsheet to map out the actual installation sequence and understand each step.

Walk me through the actual installation sequence for this renovation. What happens first, what can't start until something else is done, and where do contractors typically wait on each other? If my cabinet delivery is delayed by three weeks, what does that do to the timeline?

##### Tricks, tips, and troubleshooting

Open the actual Excel file, not just the preview

The chat preview shows basic table structure, but the actual spreadsheet contains working formulas, formatting, color-coded cells, and typography that may not appear in chat. Download and open the file to see the full sheet with all formatting intact before requesting changes.

Specify design quality expectations

When you ask Claude to "Create a spreadsheet," it might default to basic formatting. For more interesting spreadsheets, specify certain elements like custom typography, specific color palettes, color-coded priorities, clean section headers, and tight visual hierarchy. Claude can produce this level of quality but needs explicit prompting that design matters alongside functionality.

Track progress in a Project

Keep all your decisions, quotes, and progress organized as the renovation unfolds. Projects remember your complete context—the style guide, material choices, budget decisions—so you can ask questions weeks later without re-explaining everything.

Ready to try for yourself?

Upload your inspiration images and Claude consolidates research into a spreadsheet where you can identify options, compare choices, and make edits.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Create health and exercise notes

- Author: Anthropic
- Category: Personal
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/create-health-and-exercise-notes

##### Describe the task

Claude on your desktop can research exercises for specific needs—physical therapy, general fitness, injury recovery, or flexibility—and create structured routines saved directly to your Notes app. Instead of piecing together advice from multiple websites, you get organized programs you can reference during workouts.

Tell Claude what you're working on, any limitations or goals, and what format would help you follow through.

I've been dealing with knee pain, and my doctor recommended I strengthen the muscles around it. I'd like to research appropriate exercises and create a routine I can do on my own.

Save this to my Notes app as "Knee Strengthening Routine" so I can pull it up on my phone while I'm exercising. I want to show it to my physical therapist next week to make sure I'm on the right track.

Format for Apple Notes on my phone. Use HTML <br> tags in order to create natural line breaks. Use abbreviations and keep it scannable - clear headers, quick reference info only, cut verbose explanations. Optimize for mobile, not desktop.

##### Give Claude context

Claude can search the web for current exercise information and physical therapy best practices, then saves the routine directly to your Notes app where it syncs across all your devices.

Required context

The Notes connector works on Claude for desktop, where Claude has access to system-level integrations like iOS apps.

Connect your Notes app in Settings > Connectors > Browse connectors > Desktop extensions so Claude can save content directly—no downloading or manual copying required.

iOS Notes App

Optional context

Turn on Web Search to provide Claude the ability to browse online for recent information.

Web Search

##### What Claude creates

Claude searches for current exercise information and physical therapy best practices, and then structures findings into a clear routine saved directly to your Notes app. You can reference it across devices or during workouts and healthcare appointments.

From Claude:

> I've researched knee-strengthening exercises from physical therapy sources and created a complete routine for you.
> Research Summary
> Based on current PT guidance for medial knee pain, I found exercises targeting the quadriceps, hamstrings, and hip stabilizers—all crucial for knee support. These are specifically chosen to be low-impact and safe for people with existing knee discomfort when done with proper form.
> ✓ Saved to Apple Notes as "Knee Strengthening Routine"
> Your routine is ready to pull up on your phone. It includes 6 low-impact exercises targeting quads, hamstrings, and supporting muscles, with a warm-up and cool-down. Everything's abbreviated and formatted for quick reference while you're exercising.
> The routine starts conservatively (3× weekly) with built-in progression for weeks 3-5+. I included a checkbox for your PT appointment date so you can fill that in.

##### Follow-up prompts

Create a progress tracker

Build a spreadsheet to log workouts and track improvement over time. Claude can create a structured log with dates, exercises, reps, pain levels, and notes—making it easy to see patterns and share progress with your PT.

Create an Excel spreadsheet to track this routine. Include columns for date, each exercise with sets/reps, pain level before and after (1-10 scale), notes about how it felt, and any modifications I made. Add a summary sheet that calculates weekly totals and shows progress trends over time.

Learn the science behind it

Understand what's actually happening in your knee and why it hurts. Claude can research the biomechanics, explain which structures are involved in your injury, and show how each exercise targets specific problems.

Explain the anatomy of patellar tendinitis—what structures are damaged, why do they get inflamed, and what's the mechanical problem causing pain? Then show me how each exercise in this routine addresses a specific part of the issue. I want to understand what I'm fixing, not just follow instructions.

Adapt the routine as you improve

Modify exercises when they become too easy or your situation changes. Claude can progress the difficulty, swap exercises that aren't working, or scale back if you're experiencing setbacks.

These exercises are getting easier—I can do the full sets without much effort now. Progress this routine to the next level: harder variations, more resistance, or additional exercises that build on what I've mastered. Keep it appropriate for continuing knee rehab.

##### Tricks, tips, and troubleshooting

Formatting for Notes

Keep in mind the notes app needs different structure than a normal file output. For better formatting when creating content for Apple Notes, ask Claude to use HTML breaks for spacing between lines and sections, abbreviations to keep things brief, and to prioritize quick reference information, so the content is easily viewable on mobile formats.

Always consult healthcare providers first

Claude researches exercise information from reputable sources, but this doesn't replace medical advice. Before starting any routine—especially for injury recovery or pain management—show it to your doctor or physical therapist. They can confirm exercises are appropriate for your specific condition, suggest modifications based on your assessment, and warn you about movements to avoid. Think of Claude's research as a starting point for discussion with your healthcare team, not as a replacement for professional guidance.

Ready to try for yourself?

Whether you're recovering from injury, building strength, or just trying to move better, Claude helps you research and structure exercise advice into organized routines you'll actually use.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Create digital recipe cards

- Author: Anthropic
- Category: Personal
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/create-digital-recipe-cards

##### Describe the task

Claude can analyze and understand images—photos, screenshots, diagrams, handwritten notes—through vision capabilities. Upload your recipe content and Claude extracts text, adds helpful context about ingredients or techniques, and creates digital recipe cards to use and share.

Ask Claude to create a clean, typed version of the recipe, or request a formatted card that preserves the recipe's vintage character while making it readable.

Read this recipe and turn it into something I can share with family. Decode the handwriting, convert vague measurements into precise amounts, and write clear steps.

Create an interactive recipe artifact (for digital sharing). Include:

A serving size adjuster that dynamically scales ingredient amounts

A small, elegantly integrated "Explore the Tradition" box with buttons that fetch cultural facts when clicked

The original handwritten recipe displayed at the end in a museum-quality frame.

##### Give Claude context

Provide the recipe so Claude can read the handwriting, interpret abbreviations, and understand the recipe structure even from faded or damaged recipes.

Required context

Upload a photo or file of your recipe card.

Click the (+) button in the chat bar to browse through your files, or alternatively, drag and drop files into the chat box area. Claude supports various upload formats.

Recipe image

JPEG

Recipe image

JPEG

Optional context

Turn on Extended Thinking for higher-quality file creation.

Extended Thinking

##### What Claude creates

Claude delivers a recipe artifact, complete with an interactive serving size adjuster, clear instructions, and cooking insights that honor the original while making it practical for cooking and sharing.

From Claude:

> Perfect! I've created your family recipe in two complete formats:
> What you're getting:
> 1. Interactive HTML artifact — Share this link with family or view on any device. Includes:
> Complete recipe with scaled ingredient measurements
> Serving size adjuster that automatically recalculates quantities
> "Explore the Tradition" section with cultural context about the dish
> Your original handwritten recipe displayed at the bottom in a museum-quality presentation
> The artifact preserves the recipe's character while making it fully usable for modern cooking.

##### Follow-up prompts

Request culinary deep-dives

Turn any recipe into a cooking lesson. Claude can explain the reasoning and science behind cooking steps, turning instructions into learning opportunities that help you understand what's actually happening in the pan.

Give me a more detailed walkthrough of the entire recipe. Explain the technique behind the sofrito base—why does the order of adding vegetables matter? What's happening chemically when I brown the rice first?

Quickly create shopping lists

Create and save to-do or shopping lists directly to your Notes or Reminders apps using Claude on mobile. Claude can pull out specific pieces from longer content and reorganize them for a different purpose—like turning a recipe into a categorized shopping list that saves directly to your phone.

I'm making this recipe this week. Create a shopping list with all the ingredients I need and save it to my Notes app, organized by store section. Then, add a reminder to go to the grocery store after work in my Reminders app.

Create a complete recipe collection

Build a family cookbook from multiple recipes, with matching structure, tone, and detail level. Claude can take documents in different formats and make them look like they belong together—applying the same design, layout, and structure across everything.

I'm uploading five more family recipes. Format them to match this first one exactly—same layout, typography, color palette—so they feel like a cohesive collection. Create a table of contents page too.

##### Tricks, tips, and troubleshooting

Learn more about the recipe

Missing ingredients or steps? Enable Web Search and specify to Claude that you want to search online: "The ingredient list is water-damaged. Search the web for traditional recipes and intelligently fill gaps based on what's visible and authentic preparation methods."

For a more thorough deep dive, enable Research in the chat settings. It pulls from all relevant connected tools and the web, delivering comprehensive answers with citations in 1-3 minutes. In this case, use Research when you want to learn more about the full context around a recipe. Claude can pull from culinary databases, historical sources, and your own saved recipes across connected tools, then synthesizes everything into a cited report.

Elevate visual quality to your preference

Claude can opt for generic outputs by default. For more unique designs, guide it toward your quality bar. For example, you can try referencing the standard you're aiming for ("make this look like work from a top design agency"), framing the task through expert perspective ("approach this as an experienced designer would"), or asking Claude to grade its output against quality criteria. Getting to your preferred design can take iteration—when something feels basic, pinpoint what's missing and ask for targeted improvements.

Process batches of recipes with consistent formatting

When you need Claude to format multiple items the same way, you can upload them together and specify "use the same template, typography, and color scheme across all of these." Claude will apply consistent formatting. This works for recipe cards, product sheets, team profiles, or any collection where visual consistency matters.

Vary the format to suit your purpose

Claude can create the same content in multiple formats depending on how you'll use it. Request an HTML artifact for digital sharing—you can publish it and send the link to others. Request a PDF when you need something to print or download.

Ready to try for yourself?

Work with Claude to transform handwritten family recipes into beautifully formatted versions to share, print, frame, or use for cooking.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Create a daily travel itinerary

- Author: Anthropic
- Category: Personal
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/create-a-daily-travel-itinerary

##### Describe the task

Claude builds an itinerary designed for day-to-day use while traveling — formatted for mobile with realistic timing, navigation tips and addresses that work with map apps, and alternatives for when your first choice is full. You get a document that works when you're on the move and deciding what to do next.

Tell Claude your destination, trip length, and specific interests that go beyond generic categories—the particular experiences, neighborhoods, or styles you care about. Ask Claude to search the web for current recommendations. Include practical details like your travel pace, group size, and budget that affect scheduling decisions. Request realistic timing built around actual distances and movement throughout the day.

Create a 5-day trip itinerary for my visit to Lisbon in early June.

I want authentic neighborhood restaurants where locals eat, Manueline and Pombaline architecture at the actual monuments, genuine fado experiences, to walk 8-10 miles daily instead of using transit, and to visit only truly exceptional museums like Gulbenkian while skipping generic collections.

Research current recommendations and build a realistic 5-day itinerary with actual walking times, meal schedules, and weather considerations.

Create a Word document designed for mobile use: day-by-day timing, addresses, alternatives when places are full, daily budget estimates, and neighborhood context. Include small thumbnail photos (160x120px) at key locations paired with clickable links to real photo galleries so I can preview places visually and browse full image sets.

Design this document like something a top-tier travel agency produces Think high-end travel magazine meets bespoke concierge service, not generic travel guide. Use a sophisticated color system, elegant typography, and organized text that feels expensive. Make every design choice serve both aesthetics and utility.

##### Give Claude context

Make sure Claude has the right tools to accurately research and build your itinerary, by enabling web search and extended thinking.

Required context

Optional context

Make sure Web search is enabled. This lets Claude find current travel information, reviews, and operating hours.

Turn on Extended Thinking to enable Claude to think through creating detailed, well-organized itinerary documents.

Extended Thinking

##### What Claude creates

Claude searches the web to find current recommendations, then filters research through your specific criteria—identifying the architecture styles, food experiences, and museums you actually care about, instead of comprehensive attraction lists. It then builds a day-by-day itinerary with realistic timing, actual walking distances, and backup options — in an editable format you can update as plans change.

From Claude:

> I've researched current Lisbon recommendations through the lens of your specific interests and created a 5-day itinerary that respects how solo travelers actually move through a city.
> The itinerary balances your obsession with Manueline and Pombaline architecture with authentic fado experiences at venues where locals actually go.
> Each day includes realistic walking times, meal timing that matches Portuguese culture, built-in flexibility for when you're tired, and backup options for weather.
> The document is designed for mobile use—clear visual hierarchy with color-coded sections and generous white space for easy scanning while you're actually navigating the city.
> View your Day-by-Day Itinerary

##### Follow-up prompts

Elevate the design

Provide specific aesthetic instructions and ask Claude to push beyond defaults to receive more artistic outputs.

The color scheme feels generic. Choose something unique and aesthetically beautiful—design this like you're a creative director at a top branding agency—every choice should be intentional and elevated. Tighten the formatting to reduce white space and pack in more detail without losing readability.

Research local context

Understand customs, etiquette, and practical details before you arrive. Use Research searches across multiple sources to give you a complete report.

Research practical local knowledge for Lisbon. What should I know about tipping culture, restaurant etiquette, how transit actually works, common tourist mistakes to avoid, and any customs I should respect? I want the full picture from multiple sources, not just one travel blog's take.

Build it into your actual schedule

Turn itinerary ideas into calendar events with realistic timing. Claude can create event entries directly in your calendar.

Add all activities from my itinerary to my Google Calendar with location details and event notes.

##### Tricks, tips, and troubleshooting

Ask Claude to cite sources

Tell Claude: "Include sources for your recommendations—which blogs, reviews, or websites you're pulling from." This helps you verify recommendations and find more details later.

Add features and elevate design quality

To add photos, tell Claude: "Include small thumbnail images at key locations with links to photo galleries." To trigger premium design, use phrasing like "Design this like something a high-end travel agency" or "Make this look like a magazine itinerary." This triggers Claude to use sophisticated typography, professional color systems, and polished layout instead of default formatting.

Send to travel companions

Claude creates artifacts that can be published and shared, and files that open up directly in your work spaces, like Google Drive. Easily share the itinerary with your group and collect their input. You can either make adjustments directly in your file or revisit your chat with Claude to conduct additional research or make changes.

Ready to try for yourself?

Tell Claude where you're going and what matters to you—it researches current recommendations and builds an itinerary that fits how you actually travel.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Debate practice with feedback

- Author: Anthropic
- Category: Personal
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/debate-practice-with-feedback

##### Describe the task

Claude takes your position and can research opposing viewpoints at depth. It can then turn that research into an interactive practice environment where you test your responses and get immediate feedback.

Tell Claude your debate topic and any arguments you've already encountered. Ask it to create an interactive simulator and specify you want performance feedback after each round.

I have a debate coming up and need to prepare. I want to be able to state my topic and position, then get challenged with real counterarguments and evidence so I can test my responses.

Can you create an artifact where I can practice debating any topic against the strongest possible opponent? Make it genuinely tough - I need practice against the best case for the other side, not weak strawman arguments.

The artifact's design should be offwhite with grayscale foundation with desaturated watercolor punctuation and analog fidelity through blueprint grids and paper textures. Think editorial refinement meets architectural drawing with transparency modulation, atmospheric zoning, and layered warmth.

##### Give Claude context

Enable the right capabilities for Claude to build interactive tools.

Required context

In Settings under Capabilities, enable AI-powered artifacts.

This lets Claude create interactive web applications that use Claude's reasoning—your debate simulator will generate counterarguments and evaluate your responses in real-time, all within the tool itself.

Optional context

Turn on Extended Thinking for higher-quality file creation.

Extended Thinking

##### What Claude creates

Claude researches the strongest intellectual opposition to your position, then creates an interactive practice simulator where you defend your arguments against a challenging opponent. The artifact uses Claude's API to generate intelligent counterarguments in real-time, evaluate your responses, and adapt the difficulty based on your performance.

From Claude:

> Done! I've created a Debate Practice Simulator (React Artifact).
> This Simulator has three phases:
> Research Phase:
> Claude generates a research brief analyzing the 3 strongest opposing arguments with evidence
> Creates an intelligent opponent persona that genuinely believes the opposing view
> Practice Interface:
> Visual performance dashboard tracking strong arguments, weak responses, and dodged questions
> Opponent challenges presented in cards with torn-paper aesthetic and flame icon
> Response input with paper-grain texture and organic focus effects
> Real-time evaluation from Claude analyzing your logic, evidence, and rhetoric
> Adaptive difficulty that presses harder on dodges and acknowledges strong points
> Analysis Phase:
> Performance breakdown with color-coded statistics across all three rounds
> Round-by-round history showing each challenge, your response, and evaluation
> Opposition research brief displaying Claude's analysis of the strongest counterarguments
> View your interactive debate artifact

##### Follow-up prompts

Analyze your weaknesses

Get detailed feedback on where your arguments fell short

Review my responses from the practice session. From each weak point you identified, explain: (1) why it was weak, (2) what assumption I made that was flawed, (3) show how a skilled debater would have exploited that gap, and (4) a stronger version of what I could've said.

Create response cards for predictable questions

Identify the 5-10 topics or questions you're most likely to get and prepare strong answers. Claude can predict common challenges based on your position, then help you craft concise responses you can practice until they're natural.

Based on my position, what are the 5 questions I'm most likely to get asked? For each one, draft a 30-second response that directly answers the question, uses evidence, and doesn't sound rehearsed. I want to practice these until they feel conversational.

Handle specific rhetorical tactics

Prepare for the ways opponents actually derail arguments—emotional appeals, false equivalencies, moving goalposts. Claude can simulate these tactics and show you how to redirect without appearing defensive or dismissive.

My opponent tends to pivot to emotional stories when data doesn't support their position. Practice that scenario—when I present evidence, respond with an emotional anecdote that sounds compelling. Then show me how to acknowledge the story while returning to the actual question without seeming cold.

##### Tricks, tips, and troubleshooting

Ask for the research first, then practice

Don't jump straight into the practice tool. Say: "Show me the research brief first, then create the simulator." This gives you time to understand the strongest opposing arguments before you start defending your position.

Customize the artifact's design

To add unique styling to your debate artifact, tell Claude about your favorite brands, design works, or aesthetic preferences—or paste in code snippets from designs you like. Browse the artifact gallery to see what's possible and find inspiration. When you find an artifact you like, click on it and select "View full chat" to see the code used to build it. You can copy and paste this code into Claude and ask to adapt the style for your artifact

AI-powered artifacts

This debate simulator uses Claude within the tools in real-time, so the opposing arguments adapt to your specific position, generating intelligent counterarguments on demand—not pre-written responses. Learn more about AI-powered artifacts.

Ready to try for yourself?

Practice against the strongest opposition before the real debate—Claude researches counterarguments and builds you an interactive tool that shows exactly where your reasoning breaks down.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Research and compare travel destinations

- Author: Anthropic
- Category: Personal
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/research-and-compare-travel-destinations

##### Describe the task

With Claude, you can conduct research that would typically take hours across multiple tools—searching sites, taking notes, and organizing data—all within a single conversation. Describe the options you're comparing and get back structured spreadsheets.

Tell Claude which destinations you're considering, when you're traveling, and what matters most to you. Ask for a comparison spreadsheet that covers the dimensions you care about—culture, costs, activities, food, relaxation, ideal trip length, and more.

I'm planning a June vacation leaving from San Francisco, and I'm deciding between 5 destinations: Lisbon, Reykjavik, Dubrovnik, Kyoto, and Oaxaca.

Can you research these places and create a comparison spreadsheet that helps me visualize the differences across various dimensions? I want to see them side-by-side so I can compare easily.

Use color-coding or visual indicators to help me spot patterns quickly (like heat maps). Include hyperlinks to official tourism sites so I can learn more, and add cell comments explaining ratings when it's helpful and a small image of the place at the top (small, thumbnail sized photos - verify and resize if too big).

Make it look really polished and professional - something I'd feel confident sharing with my travel group. The layout should be clean and sophisticated - think premium travel magazine quality, not a basic spreadsheet. I want all five destinations visible at once so I can compare them easily.

##### Give Claude context

Claude can use search online to find current travel information and generate a sophisticated spreadsheet file, with features like conditional formatting, formulas, and embedded images.

Required context

Optional context

Toggle Web Search on in the chat bar before starting. Claude will handle the research and design the spreadsheet simultaneously.

For deeper analysis and more thoughtful design decisions, turn on Extended Thinking.

Extended Thinking

Web Search

##### What Claude creates

Claude researches each destination comprehensively and produces a multi-sheet spreadsheet file with visual comparisons, detailed ratings across 10+ dimensions, cost breakdowns, and direct links to tourism resources—all correctly formatted with design elements that make your decision clear.

From Claude:

> I've researched all five destinations and created a side-by-side comparison spreadsheet for your June trip.
> What's inside:
> Layout: All five destinations appear as columns so you can compare at a glance. Each destination has a small thumbnail image at the top, then ratings, travel logistics, and budget details flow down the rows.
> Sections included:
> Travel Logistics: Flight times, costs, June weather, ideal trip duration
> Experience Ratings: Overall scores plus individual ratings for culture, food, relaxation, adventure, nightlife, shopping, safety (with heat map visualization)
> Best For: Family-friendliness and couples appeal ratings
> Budget Analysis: Hotel per night, daily expenses, 7-day total with automatic cost calculations
> Key Highlights: One-line summaries of what makes each place special
> Official Links: Clickable links to tourism websites
> Visual features:
> Heat maps across all rating rows (warm colors = high scores, cool = lower)
> Icon indicators on overall scores (green circles for top performers)
> Data bars on 7-day costs for instant budget comparison
> Cell comments explaining how ratings were determined
> Clean luxury editorial design (cream-bronze palette, sophisticated typography)
> Frozen panes so headers stay visible as you scroll
> View your destination comparison

##### Follow-up prompts

Refine the comparison

If certain factors matter more to you—like adventure activities or family-friendliness—Claude can reweight the analysis, add new dimensions you care about, or adjust the criteria to match your specific priorities.

The current ratings weigh all factors equally, but I care most about culture and food. Can you add a 'weighted score' column that emphasizes those dimensions? Also add a 'language barrier' rating since I don't speak these languages.

Generate a presentation

Claude can transform the spreadsheet data into a visual presentation for group decision-making.

Create a PowerPoint presentation from this analysis—one slide per destination with key stats, images, and pros/cons. Make it visual and compelling since I'll be presenting to my family to decide together.

Create a detailed itinerary

Once you've chosen a destination, Claude can research and build a day-by-day itinerary.

I've decided on Lisbon! Can you create a 7-day itinerary with specific recommendations for temples to visit, neighborhoods to explore, restaurants for each meal, and day-trip options? Include approximate costs and booking information.

##### Tricks, tips, and troubleshooting

Request advanced spreadsheet features

If you want a specific Excel feature, just ask for it by name. Claude can add heat maps, frozen panes, data bars, dropdown filters, conditional formatting, clickable links, cell comments, formulas, charts, and more. Simply mentioning what you need—"add heat maps to show patterns" or "include dropdown menus for filtering"—ensures you get the functionality that makes your spreadsheet work the way you want.

Ask Claude to verify layout before finishing

For better results the first time, include a quality check in your prompt: "Make sure column widths and row heights accommodate the content, and images are properly sized as small thumbnails that don't overlap text." This prompts Claude to review its own work and catch common spreadsheet issues—text getting cut off, images covering data, cells that are too cramped or too spacious. Adding "verify everything displays correctly" to your request helps Claude catch these details before you open the file.

Use Web Search for current data

Travel information changes constantly—prices fluctuate, attractions update hours, conditions vary. With Web Search enabled, Claude researches current information from multiple sources rather than using older training data. This matters especially for costs, seasonal weather, recent reviews, and travel advisories.

Ready to try for yourself?

Claude can research and structure comparisons for any decision where you're weighing multiple options, whether that's destinations, products, investments, or job offers.

Open artifact in new windowOpen artifact in new window

↑ back to top


### Legal (4)

#### Contract redlining and negotiation

- Author: Anthropic
- Category: Legal
- Model: Opus 4.5
- Source URL: https://claude.com/resources/use-cases/contract-redlining-and-negotiation

##### Describe the task

Claude’s understanding of contract terms and their business implications allows it to read contracts like a legal team would. It can flag risks, suggest protective edits, and explain implications in plain English so you can negotiate with confidence.

Ask Claude to review your contract and protect you from any surprises. Provide your business context and any aspects of the contract you're worried about.

I'm reviewing a vendor services agreement for our marketing automation platform. We're a Series B startup with limited budget flexibility.

Create a redlined version that protects us from getting locked into something we can't get out of, ensures we keep ownership of our data and any work we pay for, and gives us flexibility to adjust or leave if things don't work out.

Create a new file that is an exact copy of the contract with track changes enabled. The redlines should show deletions (strikethrough red text) and insertions (underlined colored text). Use a script to create real comments or suggestions in the margins of the doc for each edit explaining the issue. Flag anything that could bite us later.

##### Give Claude context

Share your business context and the contract to review, so Claude can identify what matters most for your situation.

Required context

Enable the Google Drive integration, click the (+) button in the chat bar to browse through your Drive files, and select the contract that needs redlining.

Alternatively, paste the Google Doc link in your prompt or drag and drop the file into the chat box area.

Google Drive

Vendor Contract

DOC

Vendor Contract

DOC

Optional context

Turn on Extended Thinking for Claude to spend more time on complex tasks, like conducting thorough analysis.

Extended Thinking

##### What Claude creates

Claude creates a redlined contract with tracked changes and margin comments explaining each edit—like having your legal team mark up the document with both what to change and why it matters.

From Claude:

> I'll review this vendor agreement through your Series B startup lens, focusing on flexibility and protection. Let me create a fully redlined version.
> [View your redlined contract]
> I've made 19 strategic edits to protect your interests:
> Major Wins:
> Removed the auto-renewal clause that would have locked you in for 2 more years
> Capped liability at 12 months of fees (was unlimited)
> Added your right to export data in usable formats
> Ensured you own all custom work you're paying for
> Flexibility Added:
> Monthly scaling rights instead of annual lock-in
> 30-day termination for convenience with pro-rated refund
> Quarterly performance reviews with exit rights if SLAs aren't met

##### Follow-up prompts

Turn redlines into negotiation strategy

Ask Claude to convert your marked-up contract into an approach for your negotiation conversation.

Based on the edits, create a negotiation email that's collaborative but clear about our requirements. Prioritize the edits by what matters most, explain why we need each change, and suggest compromise language where we have flexibility.

Adapt the format for easier comparison

Ask Claude to create a comparison table to see all proposed changes in one view.

Create a comparison table showing their original terms, our requested changes, and business impact for each item. Organize by priority so I know what to push hardest on and where we can be flexible.

##### Tricks, tips, and troubleshooting

Request actual redlined documents with tracked changes

If Claude summarizes edits instead of marking them in the document itself, ask explicitly for "a redlined Word document with tracked changes and margin comments." Claude can write a script to programmatically insert tracked changes and comments into the file. The result is an editable document where you can see exact language changes, accept or reject suggested edits, and share markup with your team.

Improve recommendations with more context

Claude can give more relevant advice when you detail your situation. For contract negotiations, explain what makes you valuable to the vendor, whether the deal is urgent, and what other options you have. The more specific details you provide about your circumstances, the more useful Claude's recommendations become—you get advice that fits your situation instead of generic guidance.

Use Projects for consistency

Projects allow you to upload relevant context and set instructions that Claude follows in each project chat. Upload your contract standards, deal-breakers, and review criteria once—Claude remembers them for every future contract review within the project without re-explaining. You can also set instructions like "always flag unlimited liability clauses" or "prioritize payment terms in your analysis." This works for any recurring workflow where you want Claude to apply consistent standards, follow specific approaches, or remember important context.

Ready to try for yourself?

Upload any contract and Claude breaks down what matters, spots issues, and helps you decide what to push back on before you sign, turning legal complexity into clear business decisions you can make with confidence.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Prep scattered documents for a compliance audit

- Author: Anthropic
- Category: Legal
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/prep-scattered-documents-for-a-compliance-audit

##### Describe the task

In Cowork, Claude processes an entire folder of audit documents at once: policies, procedures, contracts, evidence, scans. It reads each file to understand what it is, so there's no renaming or sorting beforehand.

Your prompt just needs the audit framework and scope. Claude categorizes everything, renames files to match, and flags gaps in your documentation while you move on to something else.

I have 100+ documents for our upcoming SOC 2 audit in this folder. Right now they're scattered with names like "policy_v2_final.docx" and "scan0042.pdf". I need to organize them before the auditors arrive:

Rename files with clear titles showing document type, effective date, and which control area they cover

Group by control category (Access Control, Change Management, Incident Response, etc.)

Flag any control areas where we seem to have gaps in documentation

Our audit scope covers security, availability, and confidentiality. The audit period is January through December 2024.

##### Give Claude context

Cowork is a workspace in Claude Desktop that works directly with your local files. Point it at your audit folder and it reads everything inside, including PDFs, Word docs, spreadsheets, and scans.

What to expect: After your initial prompt in Cowork, Claude may ask you questions about your audit scope and requirements, then build a plan you can review in the sidebar. This helps it work more independently and produce results closer to finished.

Required context

To get started:

Download Claude Desktop and start a Cowork session

Select Work in a folder in the chat bar and choose the folder containing your audit documents, or use the + button to add individual files

Include your audit scope or control framework so Cowork can categorize documents against it

Optional context

Control matrix or checklist

Naming convention preference

Claude in Chrome — for pulling evidence from web-based tools

##### What Claude creates

Cowork reviews the entire document folder, produces a rename mapping organized by control area, identifies coverage, and flags potential gaps.

From Claude:

> I've reviewed all 156 documents in your audit folder. Here's what I found:
> Document Inventory
> Policies: 24 documents
> Procedures: 31 documents
> Contracts and agreements: 18 documents
> Evidence and logs: 67 documents
> Training records: 16 documents
> Coverage by Control Area
> Well covered: Access Control (28), Change Management (22), Vendor Management (18)
> May need attention: Incident Response (8), Data Backup & Recovery (6)
> Gaps Identified
> Incident Response: No evidence of testing or tabletop exercises
> Backup & Recovery: No restoration test evidence
> Business Continuity: Not in inventory
> Want me to proceed with the reorganization?

##### Follow-up prompts

Create the control matrix as a spreadsheet

Cowork writes files directly to your folder. Instead of copying output from chat, have it create the matrix as an Excel file you can share with auditors.

"Create a spreadsheet in this folder mapping each SOC 2 control to the documents that support it. Include columns for control ID, description, evidence documents, and coverage status."

Pull evidence from your ticketing system

Use Claude in Chrome for web-based tools. If your change management or incident response evidence lives in Jira, ServiceNow, or another web tool, Cowork can read it directly from the browser.

"I have Jira open with our change management tickets. Pull the last 6 months of change requests and create a summary document showing we follow our change management procedure."

Generate policy summaries for the walkthrough

Create a reference doc for your audit conversations. Cowork reads each policy and writes a cheat sheet you can use when auditors ask questions.

"Read our policies folder and create a one-page reference doc. For each policy: what it covers, last updated date, and the 2-3 key requirements I should be able to explain."

##### Tricks, tips, and troubleshooting

Your documents stay on your machine

Cowork runs locally. Sensitive policies, contracts, and evidence files never leave your computer.

Point Cowork at the mess, not just the polished files

If you have a "to be organized" folder with random scans and downloads, that's exactly where to start. Cowork can make sense of poorly named files from their content.

Use your existing framework as a guide

If you have a control matrix, audit checklist, or framework mapping, include it in the folder. Cowork uses it to categorize documents more accurately.

Ready to try for yourself?

Give Cowork folder access and get organized documentation, identified gaps, and a clear picture of your audit readiness.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Organize your legal workflows using Projects

- Author: Anthropic
- Category: Legal
- Model: Opus 4.5
- Source URL: https://claude.com/resources/use-cases/organize-your-legal-workflows-using-projects

##### Describe the task

Contract reviews at scale demand consistency, but playbooks live in shared drives and tribal knowledge stays in senior associates' heads. Projects in Claude solve this by giving you persistent context. Upload your playbook, templates, and term lists once, and Claude references them automatically in every conversation within that Project. This prompt will help you create project instructions for your team.

I'm setting up a Project for NDA reviews at our firm. We handle about 30 NDAs a week and I want Claude to reference our standard terms, flag deviations, and maintain consistency in our review comments.

I've uploaded our NDA playbook, our standard mutual NDA template, and our list of unacceptable terms. Analyze these documents and create an NDA Review Standards Guide that captures our voice, tone, and structure we use throughout our writing. Make this a professional reference document I can upload to the Project knowledge, so Claude can reference it during every review.

Then help me craft optimized project instructions I can paste into the custom instructions field—instructions that tell Claude to reference the standards guide and apply our approach.

##### Give Claude context

Add your documents or connect your document storage so Claude can access your playbooks, templates, and term lists directly. The more complete your reference materials, the more accurately Claude captures your firm's standards and approach.

Required context

Upload core reference materials: At minimum, provide your review playbook or guidelines, a standard template showing your preferred language, and any lists of prohibited or flagged terms.

Optional context

Enable Google Drive integration: Claude can pull your playbooks, templates, and term lists directly from shared drives.

Other Document connectors. If you use other document storage, you can connect Microsoft 365, Notion, and Box accounts, or use other connectors to access your documentation.

Sample redlines or review comments: If you have examples of completed reviews, these help Claude learn your commenting style and severity calibrations.

Enable Extended Thinking: For complex document analysis and pattern extraction, Extended Thinking helps Claude produce more thorough and nuanced standards guides.

Extended Thinking

##### What Claude creates

Claude analyzes your reference materials, identifies patterns in your review approach, and produces two files: a standards guide for your Project knowledge and ready-to-paste custom instructions.

From Claude:

> I've analyzed your NDA playbook, mutual template, and unacceptable terms list. Here's what I found:
> Patterns in your review approach:
> Your firm uses a direct, business-impact focused tone that's solution-oriented rather than just flagging problems. Comments follow a consistent three-part structure: issue identification, risk level, and recommendation with alternative language. Severity indicators are calibrated to actual risk, and terminology stays consistent across documents.
> I've created two files for your NDA Review Project:
> 1. NDA Review Standards Guide (Word document)
> A 7-page professional reference document that captures Meridian's approach, including:
> Voice and tone principles with specific examples
> Three-part comment structure with sample markup
> Severity indicator definitions and usage guidelines
> Complete standard terms reference (confidential information definition, carve-outs, survival periods, return/destruction standards)
> Unacceptable terms tables organized by Critical and High risk
> Inappropriate scope expansion flags
> Escalation triggers
> Quality standards checklist
> 2. Project Instructions (Markdown file)
> Ready-to-paste custom instructions that tell Claude to reference the Standards Guide for every review, apply the three-part comment structure consistently, use correct severity indicators, flag escalation triggers explicitly, and run a quality checklist before delivering.
> [Project instructions .md]
> To set up your Project:
> Create a new Project in Claude
> Upload the Standards Guide to Project knowledge
> Paste the instructions from the markdown file into the custom instructions field
> Optionally add your standard mutual NDA template for comparison reference
> Each review will now reference your standards automatically.

##### Follow-up prompts

Test the setup with a real NDA in a Project

Create a new Project, upload the Standards Guide to the knowledge base, and paste your custom instructions into the Project settings. Upload an NDA to see how Claude applies your standards, then refine any instructions that need adjustment.

Here's an NDA we received yesterday from a potential vendor. Review it against our standards guide and flag any deviations. Format your comments the way our associates would, with risk level and recommended alternative language for each issue.

Expand to other contract types

Once your NDA workflow is running, replicate the approach for other high-volume agreements.

We also review about 15 MSAs per month. I'm uploading our MSA playbook and template. Create a separate standards guide for MSA reviews following the same structure as the NDA guide, and give me project instructions I can use for a new MSA Review Project.

Create a training resource for new associates

Turn your systematized approach into onboarding material.

Based on the NDA standards guide, create a training document for new associates joining the contracts team. It should explain our review philosophy, walk through the workflow, and include 3-4 annotated examples showing how we'd handle common issues. Make it something they can reference during their first few weeks.

##### Tricks, tips, and troubleshooting

Start with your best-documented process

If your playbook is thorough and your templates are up to date, Claude's standards guide will be stronger. If you're working from informal tribal knowledge, consider using this as an opportunity to formalize your approach first, then have Claude systematize it.

Teams can share Projects and their configurations

On Team and Enterprise plans, share the Project so colleagues get the same setup. Everyone reviews against identical standards without each person configuring their own approach. When standards change, update the knowledge base once, and the change propagates to all users.

Test with real documents before going live

After setup, run 3-5 already reviewed NDAs through the Project and compare Claude's output to how your actual associates handled them. Note where Claude misses nuance or applies the wrong severity level, then refine your custom instructions. Ten minutes of calibration prevents hundreds of inconsistent reviews.

Claude can work in your file formats

Legal documents typically need to stay in .docx for redlining and collaboration. Claude can analyze Word documents and produce outputs in the same format, so deliverables slot directly into your existing workflow without conversion.

This pattern extends beyond legal work

Marketing teams can document brand voice. Finance teams can capture reporting standards. Research teams can codify methodology. The output becomes infrastructure for consistent AI-assisted work across any domain with established practices.

Ready to try for yourself?

Upload your NDA playbook and get started with your first Project. Once you've calibrated the workflow, you can expand to MSAs, vendor agreements, employee contracts, and build Projects for every high-volume legal process.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Track discovery timelines and analyze patterns

- Author: Anthropic
- Category: Legal
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/track-discovery-timelines-and-analyze-patterns

##### Describe the task

Claude's ability to synthesize information across multiple documents, paired with your legal expertise, lets you build comprehensive case chronologies and spot patterns that might take days to identify manually.

Upload your discovery documents and tell Claude what you need to understand about the case.

I'm representing a small software company in a contract dispute with a vendor. We hired them to build a custom inventory management system, but the project failed and we're in litigation. I've got about 40 discovery documents—contracts, change orders, email threads, project status reports, invoices, and technical documentation from the 12-month project timeline.

Create a chronological timeline with document citations, analyze patterns around scope changes and deliverables, and identify our strongest evidence and key witnesses for depositions. Generate a professional legal memo with clear sections, proper citations to source documents, and formatting suitable for sharing with co-counsel.

This needs to be a top of class legal document with exceptional formatting and structure. Opt for elevated, elegant typography, tight spacing, and muted color instead of using your default styling. Take your time developing an extremely high quality legal document that has coherent structure, and articulate legal expertise throughout.

##### Give Claude context

Provide Claude your discovery documents so it can identify patterns across the entire record, not just summarize individual files.

Required context

Connect the tools where your discovery documents are stored. By enabling Gmail and Google Drive integrations, Claude can search all relevant materials: contracts, amendments, email threads, invoices, and other documentation.

If you have additional files, upload them in their native formats—PDFs, Word files, Excel spreadsheets, or emails. Claude can work with a variety of file types.

Discovery documents

PDF

Discovery documents

PDF

Optional context

Turn on Extended Thinking for better cross-document pattern recognition and higher quality file creation.

Extended Thinking

##### What Claude creates

Claude produces a comprehensive legal analysis document (.docx format) organized into clear sections.

From Claude:

> I've analyzed the 40 discovery documents and created a detailed analysis document. The chronology spans from contract signing (January 15, 2023) through project termination (June 30, 2024), with 52 key events documented.
> Several significant patterns emerged: The scope changed substantially three times during the project, but only the first change was documented with a formal change order. The vendor verbally agreed to the second and third scope expansions in emails (Documents 15, 17, 29) but never provided updated timelines or budgets. Meanwhile, invoices increased 40% beyond the original contract amount.
> The timeline reveals a pattern: the vendor missed every major milestone by 2-4 weeks, consistently blaming your team for delayed feedback—but our email records show response times averaged 2-3 business days, well within the contract's 5-day requirement.
> I've organized all findings in the attached document with full citations, making it easy to locate source materials for briefing or settlement discussions.
> View the contract analysis document

##### Follow-up prompts

Extract direct quotes

Pull the actual vendor emails about delays, without having to manually sift through large documents.

Show me the specific emails where VendorTech blamed us for each missed milestone. I want to see their exact words about why they were late, organized by milestone, so I can compare what they said then versus what they're claiming now.

Condense and reformat findings

Create a one-page executive summary for leadership. Claude can easily convert your information into other formats, like a document or memo.

Condense this analysis into a one-page memo for our managing partner. Focus on: the three biggest problems with their case, our strongest evidence, and recommended next steps. Make it scannable—they need to grasp the situation in 90 seconds.

Deep-dive on violations

Claude can conduct additional research in areas where you need more information. For instance, ask Claude to concentrate specifically on violations related to change orders within a project or contract.

Zoom in on the two scope changes where they didn't issue change orders. Pull every email and document related to those requests. I need the complete story on each one—what we asked for, how they responded, and when they later cited these as causing delays.

##### Tricks, tips, and troubleshooting

Always verify dates and citations before using them in filings

Claude is excellent at identifying patterns and organizing information across hundreds of documents, but double-check that cited document numbers match your discovery index, dates align with your case timeline, and quotes are accurate before including anything in briefs or client communications. For chronologies specifically, verify the temporal relationships and confirm no key events are missing. Think of Claude as accelerating your review process, not replacing it.

Protect sensitive client information appropriately

For cases involving truly confidential information (trade secrets, highly sensitive personal data), consider redacting sensitive details before upload or using this approach for the non-sensitive portions of discovery only. Claude doesn't store uploaded documents after your conversation ends and you control what information you provide. Learn more about our privacy policy

Specify professional legal formatting

Notice how the prompt includes "professional legal memo format". Claude responds to these cues with appropriate formality, proper section headings, and citation style. Without this direction, outputs may default to more casual formatting. For court filings or client deliverables, specify the level of formality you need or provide template documents from your firm.

Ready to try for yourself?

Turn your discovery review process from tedious document-by-document reading into strategic pattern analysis. Upload your discovery and get started.

Open artifact in new windowOpen artifact in new window

↑ back to top


### Research (4)

#### Surface themes from all your feedback channels

- Author: Anthropic
- Category: Research
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/surface-themes-from-all-your-feedback-channels

##### Describe the task

In Cowork, Claude connects to multiple feedback sources at once (call transcripts in a folder, Slack, your CRM, Linear) and pulls from all of them in parallel to spot patterns across platforms.

Tell Claude what you're looking for: theme frequency, cross-platform patterns, representative quotes. It structures the feedback analysis around your priorities.

I need to understand what customers are really asking for by synthesizing feedback from multiple sources.

Sources:

Call transcripts: Scattered across my downloads folder

Slack in channels like #customer-feedback and #support-questions

Salesforce: Opportunity notes and lost deal reasons

Linear: Open feature requests and bug reports

Find the main themes and patterns across all sources — what keeps coming up? Give me counts by source, cross-platform patterns, and representative quotes. Then prioritize into product ideas based on frequency and business impact.

##### Give Claude context

Cowork is a workspace in Claude Desktop that connects to your tools via connectors and works with your local files. Give it access to your call transcripts and connect your other feedback sources. Cowork pulls from all of them in parallel.

What to expect: After your initial prompt in Cowork, Claude may ask you questions about what themes matter most or how to prioritize, then build a plan you can review in the sidebar. This helps it work more independently and surface more useful patterns.

Required context

To get started:

Download Claude Desktop and start a Cowork session

Select Work in a folder in the chat bar to give Cowork access to your call transcripts

Add connectors for Slack, CRM, and Linear

Optional context

Theme taxonomy your team already uses

Customer segment definitions for filtering

##### What Claude creates

Claude synthesizes feedback from all connected sources, identifies themes with counts and attribution, highlights patterns that appear across multiple platforms, and suggests prioritized product ideas.

From Claude:

> I analyzed feedback from all four sources. Here's what emerged:
> Top Themes by Frequency
> Mobile app issues (57 total) — Calls: 11 | Slack: 31 | CRM: 1 | Linear: 14
> Reporting limitations (45 total) — Calls: 15 | Slack: 23 | CRM: 2 | Linear: 5
> Salesforce integration (41 total) — Calls: 18 | Slack: 12 | CRM: 8 | Linear: 3
> Cross-Platform Patterns
> Mobile app (High Signal): Appears in ALL four sources — this is genuine pain, not just vocal users.
> SSO integration (Revenue Signal): Low volume overall but appears heavily in CRM lost deal notes. This is a deal-blocker, not a usage issue.
> Prioritized Product Ideas
> Priority 1: Mobile app stability
> Priority 2: Okta SSO integration
> Priority 3: Report customization

##### Follow-up prompts

Pull everything on one theme

Go deep on what matters most. Get every mention across all sources with full context — who said it, when, and what they were trying to do.

"Pull every mention of mobile app issues across all four sources. For each one, give me the full context — who said it, when, what they were trying to accomplish, and how frustrated they seemed."

Build a roadmap proposal

Turn insights into a document for stakeholders. Cowork writes directly to your folder. Have it create a roadmap doc with evidence from the synthesis, ready to share with leadership.

"Based on this analysis, draft a one-page roadmap proposal for Q1. Prioritize by cross-platform signal strength and business impact. Include the key quotes that support each recommendation."

Track what specific customers said

Follow up with customers who raised issues. See everything a specific customer mentioned across sources to prepare for a conversation.

"What did Acme Corp say across all these sources? Pull everything they mentioned in calls, Slack, and CRM notes so I can follow up with them directly."

##### Tricks, tips, and troubleshooting

Try asking Claude to spin up subagents for parallel pulls

When pulling from multiple sources, you can ask Claude to spin up subagents to query Slack, Linear, and Salesforce simultaneously.

Watch the progress panel and steer as Claude works

Cowork shows which sources Claude is querying and what it's finding in real time. If one platform is returning less than expected, you can adjust mid-process.

Your feedback data stays on your machine

Cowork runs in an isolated environment locally. Call transcripts, CRM notes, and Slack exports stay on your computer.

Ready to try for yourself?

Use Cowork to connect your feedback sources and discover patterns you'd miss analyzing each one separately.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Turn transit time into research time

- Author: Anthropic
- Category: Research
- Model: Opus 4.5
- Source URL: https://claude.com/resources/use-cases/turn-transit-time-into-research-time

##### Describe the task

Good ideas don't wait for your desk. They surface during commutes, between meetings, and on walks. But by the time you're back at your computer, you've either forgotten the thread or lost the momentum to dig in.

Using Claude, you can start ideas on mobile, and finish them on desktop. Start a conversation using voice to describe what you're thinking about and what you need to know. While you're still on the move, Claude searches for relevant data, pulls in documents you reference, and synthesizes what it finds. When you reach your desk, the research is done and organized, ready to become a polished deliverable.

[using voice, on mobile]

I just had a thought for the product meeting later. I want to look into what our competitors are doing with their onboarding flows. I feel like everybody's moving towards a simpler experience.

Can you pull in our Q1 planning doc because I need to remember where we landed on roadmap priorities. I think we might be overcomplicating our onboarding flow, and I want to make sure that if I make that case in the meeting, I have the data to back it up.

Can you please look through the doc, do some competitor research on their onboarding flows, find any good onboarding stats, and prep me for later? Thanks.

##### Give Claude context

Claude saves conversations across devices, so you can start on your phone and pick up on your laptop without losing context.

Required context

Enable web search: Claude can research best practices, find frameworks, and gather external information while you're still in brainstorm mode. By the time you're at your desk, the research is done.

Optional context

Enable Extended Thinking: For complex planning tasks, Extended Thinking helps Claude develop more thorough structures and anticipate gaps in your thinking.

Extended Thinking

Web Search

##### What Claude creates

Claude delivers a research-backed meeting prep while you're still in transit. By the time you reach your desk, you have organized findings, relevant stats, competitor analysis, and suggested talking points ready to refine and present.

From Claude:

> I've got your Q1 planning doc in front of me. Let me pull in some fresh research on competitor onboarding flows to supplement what's already in there. I've got a solid picture now. Let me put together your meeting prep.
> Meeting Prep: The Case for Simplifying Onboarding
> Your Current State (from Q1 Doc)
> Your doc identified three main friction points:
> Asking for workspace name before showing any value
> Team invitation step causing 28% abandonment (users want to try solo first)
> Integration setup feels mandatory even though it's optional
> The most common exit survey feedback: "I just wanted to see what this does"
> Industry Benchmarks That Support Your Case
> Completion Rates:
> The average onboarding checklist completion rate across SaaS companies is 19.2%, with a median of 10.1%. Your 34% is actually above average, but your target of 60% aligns with top performers.
> Top-performing SaaS companies achieve completion rates of 70-80%, while average companies see 40-60%.
> Time to Value:
> Top performers achieve Time to Value in under 7 days, leading to trial-to-paid conversion rates of 15-30%. Your 8.2 minutes to first value action is actually measuring something different (first action vs. full value realization), but the principle holds: faster is better.
> Customer onboarding takes less than a day for 40.43% of SaaS businesses, fast-tracking time to value.
> The Stakes:
> 80% of users who don't complete onboarding disappear after day one.
> What Competitors Are Actually Doing
> Clovant. Your doc says "zero-step onboarding," but the reality is more nuanced. Clovant's onboarding actually consists of 10+ steps, but it doesn't feel that many due to clean visuals and hands-on activities. Their approach: one input per step to help users set up their workspace and get started. The key insight is that Clovant makes each step feel lightweight and purposeful rather than eliminating steps entirely.
> Fynch. Fynch's onboarding flow takes less than 1 minute (around 50 seconds) for personal use and school accounts. Their strategy:
> The signup flow helps Fynch personalize the workspace according to each user's specific needs, depending on the function they'll use it for and whether they'll use individually or as a team.
> The Getting Started page is a great example of learn-by-doing onboarding that lets new users learn how to use the product by using the product.
> Instead of overwhelming users with the full list of templates, Fynch uses information provided during signup to offer a personalized selection of 5 templates.
> Tessract. The moment you open up Tessract, there isn't some elaborate tutorial or seemingly endless guide to using every feature. Their philosophy: show, not tell. Customers want to jump in and experience the product rather than feel they're sitting back in a classroom. Tessract smartly gives you bite-sized tooltips and lets you explore and create right from the very beginning.
> The Industry Shift Toward Adaptive Onboarding
> The broader trend isn't just "fewer steps." It's moving away from rigid linear flows entirely.
> People don't learn by following instructions step-by-step. They explore, tinker, jump around, ask questions mid-way, get distracted, and return with context. Good onboarding should reflect that. But traditional flows push users through a rigid experience where skipping a step can break the whole flow.
> Fynch doesn't force users down a checklist path. The minute you sign up, you land in a usable workspace with subtle prompts that adapt based on your behavior.
> Clovant checklists treat everyone the same. Adaptive onboarding treats users based on needs, use case, and behavior. And users notice the difference, with higher activation and more retained value.
> Your Argument, Backed by Data
> 1. Your completion rate is underperforming relative to your target, not the industry average. You're at 34% vs. industry average of 19%. But top performers hit 70-80%. The gap isn't about being "bad" but about leaving significant upside on the table.
> 2. The specific friction points you identified align with industry best practices.
> Team invites causing abandonment? Fynch and Tessract both defer collaboration setup until after users experience solo value.
> Workspace naming before showing value? Clovant and Fynch both get users into a functional workspace first, then ask for configuration.
> "I just wanted to see what this does"? This is the exact problem Tessract solved by dropping users straight into a canvas.
> 3. The trend is toward contextual, progressive disclosure rather than just "fewer steps." The goal isn't just cutting steps 7→3. It's restructuring so users can experience value first, then complete setup tasks contextually. Your doc already notes this with Clovant's "zero-step" approach, but the key is that setup happens after users see value, not before.
> 4. Addressing Mike's concern about personalization data. By segmenting users based on their intended use case, Fynch creates a tailored experience that only surfaces relevant features and templates. You can still collect personalization data, just do it in a way that immediately delivers visible value (like Fynch showing relevant templates based on one question) rather than collecting data speculatively.
> Suggested Talking Points for the Meeting
> Frame it around time-to-value, not just "simplification." The research consistently shows that getting users to their "aha moment" faster drives retention. Your 8.2 minutes vs. <3 minute target is the real metric to focus on.
> Propose a "value-first" restructure. Instead of: signup → workspace name → team invite → integrations → product, consider: signup → immediately into a sample project (like Clovant) → contextual prompts for setup as relevant.
> Address the viral growth concern directly. The doc mentions deferring team invites might hurt viral growth. Counter: users who abandon at the team invite step (28%) never become viral advocates anyway. Users who experience value first are more likely to invite teammates with conviction.
> Suggest defining "first value action." Your doc notes this is "currently undefined." This is the first thing to lock down. What's the single simplest thing a user can do that proves your product works?
> Need me to dig deeper into any of these areas or put together slides?

##### Follow-up prompts

Continue on desktop with full context

Pick up exactly where you left off. Claude remembers the context and is ready to produce polished output now that you have full editing capabilities.

I'm at my desk now. That research is exactly what I needed. Can you create a one-page summary doc I can share with the team before the meeting? Include the key stats, the competitor examples, and my proposed talking points.

Dig deeper on a specific finding

Ask Claude to expand on the most relevant piece of research. If one insight stood out, Claude can search for more examples, case studies, or data points to strengthen that specific angle.

The adaptive onboarding trend is interesting. Can you find more examples of companies that moved from linear checklists to contextual onboarding? I want to know what their results looked like before and after.

Pressure-test the argument

Strengthen your argument by understanding what the research says on the other side. Knowing the best case against your position helps you address it proactively rather than getting caught off guard.

What does the research say about when longer onboarding actually works better? Are there cases where more steps improved retention? I don't want to be blindsided if someone brings up a study that contradicts my point.

##### Tricks, tips, and troubleshooting

Voice input doesn't need to be polished

Talk the way you think. Claude parses intent from rough, stream-of-consciousness input. Save the editing for desktop.

Upload reference docs from mobile

You can attach files on mobile just like desktop. Give Claude your planning docs, prior research, or notes so it has full context for the research task.

Be explicit about your timeline

Telling Claude "I have a meeting in two hours" helps it calibrate what to prioritize and how much depth to provide.

Desktop unlocks file creation

Mobile is ideal for capture and research. When you need polished outputs like slide decks, documents, or spreadsheets, continue on desktop where Claude can create downloadable files.

Ready to try for yourself?

Next time an idea hits while you're away from your desk, open Claude on your phone and start talking. Capture the thought, let Claude research in the background, then pick up the same conversation when you're ready to build.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Verify statistics from raw data

- Author: Anthropic
- Category: Research
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/verify-statistics-from-raw-data

##### Describe the task

Claude's ability to parse manuscripts while simultaneously running statistical analyses on raw data helps you develop a deeper understanding of how to assess research methods and build critical reading skills you'll use throughout your career.

Ask Claude to examine a paper by extracting every statistical claim and rerunning each analysis on the provided data files. This hands-on verification teaches you what to watch for and helps you understand whether the study's conclusions are supported by its data.

I'm reading this paper that's central to my literature review, and I want to understand it more deeply before citing it extensively. I've got the published manuscript and their supplementary data files.

Can you help me verify their statistical claims? Go through the paper systematically and pull out every p-value, mean, standard error, sample size, and test result they report. Then run each analysis yourself using their actual data.

For each statistical claim, show me three things: what the paper states, what you calculated from their data, and whether these match. Flag any problems you notice - things like using wrong tests for the data type, sample sizes that don't add up, or p-values that seem mathematically questionable.

Then build me a detailed Excel workbook where I can see your complete verification. Create separate sheets for each analysis showing your calculations step by step, plus a summary sheet highlighting any issues I should understand before relying on this work.

Make the spreadsheet well-designed and easy to navigate - professional formatting, frozen headers, filtered columns, and clear notes explaining what you found.

##### Give Claude context

Provide the published manuscript and its underlying raw data so Claude can verify every statistical claim and help you understand how thoroughly the analysis supports the conclusions.

Required context

Click the (+) button in the chat bar to browse through your files or, alternatively, drag and drop the manuscript and any additional data files you want to analyze into the chat box area.

Manuscript

PDF

Data files

XSLX

Manuscript

PDF

Optional context

For more thorough statistical verification and high quality outputs, enable Extended Thinking.

Extended Thinking

##### What Claude creates

Claude creates a comprehensive audit workbook documenting every statistical check, showing you exactly what to watch for and building your ability to critically evaluate research methods.

From Claude:

> Statistical Reproducibility Check Complete
> I've verified the statistical claims in "Effects of Chronic Sleep Deprivation on Spatial Memory and Anxiety-like Behavior in C57BL/6 Mice" against the experimental data. Here's what I found:
> Verification Summary:
> 31 statistical claims checked
> ✓ 22 verified correctly
> ⚠ 3 minor discrepancies
> ✗ 6 require attention
> Critical Issues to Understand:
> 1. Sample Size Discrepancy (throughout manuscript)
> Manuscript states: n=12 per group
> Data shows: n=11 for control group
> Implication: This affects the statistical power and validity of all control group comparisons. The paper should have explained any subject exclusions.
> 2. Unit Conversion Error (Open Field - Total Distance)
> Manuscript reports: 2456 ± 234 cm (control), 1834 ± 187 cm (SD)
> Data shows: 24.43 ± 1.8 meters (control), 18.38 ± 1.1 meters (SD)
> Issue: Values off by factor of 100 - data stored in meters but reported as centimeters
> Why this matters: This type of error suggests inadequate data checking, which raises questions about other results
> 3. Inappropriate Statistical Test (Corticosterone)
> Issue: Used unpaired t-test for before/after measurements from same mice
> Should use: Paired t-test accounting for baseline values
> Manuscript p-value: 0.003
> Correct paired test: p<0.001
> Implication: The effect is actually stronger than reported, but the methodological choice shows limited statistical understanding
> 4. P-value Precision Errors
> Target quadrant time: Reports p=0.004, actual p=0.0001
> Day 5 latency: Reports p=0.02, actual p=0.026
> Why this matters: Exact p-values matter for meta-analyses and understanding effect strength
> 5. Methods Description Inconsistency
> Methods state "unpaired t-tests for between-group comparisons"
> Problem: Corticosterone data are paired samples (baseline and final from same mice)
> This suggests either unclear writing or misunderstanding of their own analysis
> View your statistical audit workbook

##### Follow-up prompts

Go beyond numbers and check the figures

Verify that visual representations match the underlying data. Claude compares graphs, charts, and tables to raw data values to catch misrepresentations or errors.

Check that all bar heights, error bars, and data points in Figure 2 match the actual data values. Show me any discrepancies.

Learn what to watch for next time

Claude can explain which red flags are worth investigating when you're reading papers without access to raw data - like methodological inconsistencies, suspiciously round numbers, or statistical choices that don't match study designs.

Based on what we found here, teach me what warning signs I should look for when reading other papers in my field. What patterns suggest I should be skeptical, even when I can't verify the raw data?

Draft reviewer comments

Frame statistical or methodological issues constructively so authors understand what needs fixing without getting defensive. Claude can help balance specificity with encouragement.

Turn these statistical problems into helpful reviewer comments that are clear about what needs correcting but encouraging about how to fix it.

##### Tricks, tips, and troubleshooting

Start where you already have domain expertise

You'll quickly grasp the best practices for working with Claude by verifying papers in your field, as your expertise will help you discern what is plausible. When Claude flags an issue, your domain knowledge helps you judge whether it's a real error or a misunderstanding of field-specific practice. Conversely, when Claude says everything checks out, you can assess whether it tested the right assumptions.

Open the actual Excel file

The preview in chat shows structure, but the real workbook contains working formulas, conditional formatting that highlights issues, dropdown filters for exploring results, and detailed calculation notes. Download and open the file to see how verification works and to learn techniques you can apply when checking other papers.

Ready to try for yourself?

Upload any paper with its supplementary data files, describe why you're examining it ("I'm considering citing this extensively" or "these results seem surprising and I want to understand them better"), and let Claude help you build the critical analysis skills that strengthen your research.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Plan your literature review

- Author: Anthropic
- Category: Research
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/plan-your-literature-review

##### Describe the task

Thorough literature reviews require reading hundreds of papers to identify the dozen that matter. Claude accelerates this process by systematically searching databases, evaluating relevance against your specific research questions, and organizing findings so you can focus on synthesis and original analysis rather than mechanical sorting.

Tell Claude your research question. Claude searches the database for relevant papers, helps you identify which ones are most important to read, then organizes findings as you upload and work through each paper.

I'm beginning a literature review on the gut-brain axis and its role in mood disorders, specifically depression and anxiety. I need to understand:

Mechanisms linking gut microbiome changes to mood regulation

Evidence for probiotic interventions in clinical trials

The role of inflammation and neurotransmitter production

Search PubMed for the most relevant papers from the last 5 years and create a structured reading guide that helps me prioritize what to read first.

Organize everything into a beautifully designed Word document that serves as my research roadmap—something that feels like a premium research tool with clear visual hierarchy, color-coding by study type, and space for my notes as I work through the papers.

##### Give Claude context

Connect Claude to relevant research tools and enable the specific features that make this workflow powerful.

Required context

Connect PubMed to allow Claude to search the full PubMed database, not just work with papers you already have.

PubMed

Optional context

Turn on Extended Thinking so Claude can spend more time evaluating research and creating high-quality outputs.

Extended Thinking

##### What Claude creates

Claude researches PubMed’s database to find relevant papers and creates a guide to help you through your entire research process—from initial discovery through final synthesis.

From Claude:

> I've created a comprehensive research roadmap for your literature review on the gut-brain axis and mood disorders. I searched PubMed and curated 42 high-impact papers—12 systematic reviews, 18 RCTs, and 12 mechanistic studies—organizing them into a strategic three-phase reading plan.
> Phase 1: Foundation Papers (Week 1) are the high-impact systematic reviews and meta-analyses that establish foundational understanding. These papers synthesize hundreds of studies and provide the theoretical framework for your review.
> Phase 2: Mechanism & Evidence (Weeks 2-3) includes the mechanistic studies explaining how the gut-brain axis works, plus the strongest clinical trials showing intervention effects.
> Phase 3: Gap Analysis (Week 4) covers emerging research and contradictory findings that will strengthen your critical analysis.
> The document includes a visual landscape overview showing how papers distribute across study types, detailed profiles for each priority paper with relevance ratings and key findings, and space for your notes throughout. I've color-coded the categories and designed it as a professional research tool you can use throughout your review process.
> View your research roadmap

##### Follow-up prompts

Validate a claim you develop

Test whether patterns you notice actually hold across your full dataset. Claude analyzes whether trends are real or coincidental and identifies exceptions or contradictions.

I want to say most recent studies focus on X while older ones focused on Y. Does this hold across these papers, or are there contradictions? Help me understand why or why not, and flag any papers that contradict this pattern.

Understand contradicting sources

When you notice sources conflict, Claude can help investigate why and search for additional sources that might help you understand and resolve the discrepancy.

Paper A claims [finding] while Paper B claims the opposite. Analyze why they contradict and search for other papers that might resolve or explain this contradiction.

Search for missing coverage

If you spot gaps of knowledge as you read, ask Claude to search for relevant sources to try to fill them and show where new findings might fit into your research.

I'm seeing a gap in my coverage of [specific mechanism/population/intervention]. Search PubMed for papers specifically addressing this, evaluate them, and add the most relevant ones to my roadmap. Where do they fit in my reading sequence?

##### Tricks, tips, and troubleshooting

Always verify critical citations

Claude is excellent at tracking evidence, but double-check any quote that's central to your argument against the original paper before submitting your work. Use Claude to help you find the relevant passages quickly, but verify the exact wording yourself.

Open the actual file, not just the preview

Claude's in-chat previews show basic structure, but the actual Word document contains full formatting, color-coding, and design elements that don't appear in previews. Download and open the file to see the true form and make edits.

Expand your research infrastructure

Connect the Google Drive integration so Claude can search your existing collection, identify papers you've already read, and organize new findings alongside your current library—no manual uploading required. For databases beyond PubMed, check the directory for more connectors.

Use design language for better outputs

The prompt includes design language throughout, with phrases like "beautifully designed”, “professional formatting”, and “premium research tool”. Without design cues, Claude opts for default styling. With specific prompting, Claude can apply unique typography, color, and formatting choices.

Ready to try for yourself?

Work through your literature review process with Claude, from discovery to synthesis, so you can focus on developing original arguments rather than drowning in search results.

Open artifact in new windowOpen artifact in new window

↑ back to top


### Sales (4)

#### Create a sales proposal presentation

- Author: Anthropic
- Category: Sales
- Model: Opus 4.5
- Source URL: https://claude.com/resources/use-cases/create-a-sales-proposal-presentation

##### Describe the task

Claude can build complete presentation decks with thoughtful slide layouts, clean data visualizations, and consistent typography. Describe your proposal content and design preferences, and Claude creates a professional deck you can refine through iteration.

With Opus 4.5, the conversation can continue as long as the work requires—so you can reference earlier decisions, reuse approaches that worked, and maintain consistency across rounds of feedback without starting over or re-explaining context.

I'm putting together a proposal deck for Midwest Regional Health, a healthcare network we've been in conversations with about our patient engagement platform.

Search my Google Drive for documents with "Midwest Regional" in the title—there should be discovery call notes, their RFP, and a competitive analysis we did.

Pull the relevant information to build out these slides: Make sure to include executive summary, their challenges, our solution and how it addresses their specific situation, implementation approach, pricing, case study (find a similar healthcare client we can reference), timeline and next steps.

Design direction: Clean and professional, but not sterile. I want something modern and approachable while still appropriate for hospital executives. Use premium typography (not default fonts) and our brand colors from the logo I'm uploading. Make sure text is conservatively sized so nothing gets cut off, and verify that no elements overlap.

##### Give Claude context

Connect Claude to your files and provide brand assets so the proposal pulls from your actual client materials and reflects your visual identity.

Required context

Enable the Google Drive integration so Claude can search for and pull from your discovery notes, RFPs, competitive analysis, and past proposals. Upload your company logo for color extraction and brand consistency. If you have a past deck with the look you want, share it as a style reference—showing works better than describing.

Enable Extended Thinking in settings to help Claude synthesize information across multiple source documents and plan cohesive slide layouts.

Google Drive

Past proposal slides

PPTX

Discovery call notes

DOC

Past proposal slides

PPTX

Optional context

For more complex, multi-step tasks turn on Extended Thinking for Claude to consider sophisticated layouts and narrative structure throughout the slides.

Extended Thinking

##### What Claude creates

Claude searches your connected files, synthesizes the relevant information, and delivers a complete proposal deck with professional layouts and consistent design, ready for refinement based on your feedback.

From Claude:

> I found several relevant documents in your Drive: the Midwest Regional discovery call notes from October, their RFP response, your competitive analysis, and your standard pricing sheet. I've synthesized these into a proposal deck.
> Sales Proposal – Midwest Regional Health (7 slides)
> The design uses your brand's navy blue as the primary color with a warm teal accent. I've kept text conservatively sized throughout for projector readability and verified that no elements overlap.
> Here's how I structured the content from your documents:
> Executive summary pulls from your RFP response's recommendation section
> Challenges slide uses the three pain points from your discovery notes: fragmented patient communication, 23% no-show rate, and staff burnout from manual outreach
> Case study features Northern Health Partners (34% improvement in appointment adherence)—the closest match to their situation from your past work
> Let me know what's working and what you'd like adjusted.

##### Follow-up prompts

Generate or embed visual assets directly into your slides

If you need visuals—a logo, product screenshot, chart, or diagram—describe what you need and Claude can generate and embed them directly in your slides.

Iterate when something feels off

You don't need to know exactly what's wrong. Describe what you're noticing—"this slide feels too busy" or "something's off about the flow"—and Claude can offer alternatives or diagnose the issue.

Save your preferences for future materials

After several rounds of iteration, Claude has learned your taste. Ask it to document what worked, color choices, layout principles, and what you rejected, so you or a teammate can start from those preferences to create follow up materials or on the next proposal.

Create a style guide based on what we landed on. Include the design choices that worked and the things I asked you to change. Additionally, create a one-page PDF summary I can email after the meeting in the same visual style.

##### Tricks, tips, and troubleshooting

Reference earlier decisions as you iterate

With Opus 4.5, the conversation holds context across many rounds of feedback. You can say "use the same layout approach as the challenges slide" or "go back to the color we used before" without re-explaining. This keeps iterations faster and more consistent.

Extended Thinking helps when synthesizing multiple sources

When Claude needs to pull from discovery notes, RFPs, and past proposals to build a cohesive narrative, Extended Thinking gives it time to plan how the pieces fit together. The model also reasons through visual hierarchy and slide structure more carefully, so you spend less time fixing layouts and formatting. For decks with data visualizations or complex information, the difference in polish is noticeable.

Ready to try for yourself?

Connect your Drive, point Claude to your client materials, and describe the deck you need. Claude synthesizes the content and handles the design while you shape it through feedback until it's suited to your standards and ready to present.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Prepare for sales deals

- Author: Anthropic
- Category: Sales
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/prepare-for-sales-deals

##### Describe the task

Instead of manually searching through your CRM to remember similar deals, Claude analyzes comparable opportunities in seconds and shows you the patterns that matter for your current conversation.

Tell Claude about the deal you're working on and what you want to understand from similar opportunities.

I'm working on a healthcare deal - mid-market, around 180 employees, about $60K. They're interested in our patient engagement platform but worried about integration into their current system and how long implementation takes.

Can you pull similar healthcare deals we've closed in the last year or two? I want to see what these typically look like - how long they take, what we usually close at and typical issues that come up. If there are reps who've done deals like this, I should probably talk to them.

Create an artifact I can scan before my next call to feel the most prepared. This artifact should follow top-tier design standards. Create a industry-leading MedTech company meets top creative agency aesthetic.

##### Give Claude context

Claude needs access to your CRM to find and analyze comparable opportunities so you understand what's worked in similar situations.

Required context

In Settings > Capabilities, find and enable your HubSpot connector so Claude can search opportunities and pull deal data.

HubSpot

Optional context

Turn on Extended Thinking to improve the quality of your analysis.

Extended Thinking

##### What Claude creates

Claude searches your CRM for comparable deals, identifies patterns in wins vs. losses, and creates a deal preparation artifact with the key insights and data points that help you go into the conversation prepared.

From Claude:

> I found 9 comparable healthcare deals ($45K-$95K, 150-250 employees) closed in the last 18 months. 6 won, 3 lost. Creating your prep artifact now. View your deal prep artifact Key patterns: Wins: Average 87-day cycle, 12% average discount, all included professional services in Year 1 Losses: Longer cycles (110+ days), price was primary objection in notes, two lost to competitor after extended evaluation Integration concerns: Showed up in 7 of 9 deals. Reps Sarah Chen and Marcus Rodriguez both closed deals with Epic integration concerns—they're good people to talk to Cycle velocity: Deals that moved to contract within 90 days had 75% win rate vs. 33% for longer cycles The brief includes deal-by-deal breakdown, rep names for the wins you can learn from, and specific notes excerpts showing how integration and timeline concerns surfaced.

##### Follow-up prompts

Pull specific deal details

Dive deeper into a similar, relevant opportunity.

The Meridian Health deal looks most similar to what I'm working on. Pull the full details from my CRM—all the notes, timeline of activities, who was involved, how the deal progressed through stages, and final contract terms. I want to understand that deal thoroughly since it's the closest match.

Create talking points

Turn your deal intelligence into actual conversation prep

Based on the patterns from similar healthcare deals, create 5-6 talking points I can use in my next call. Focus on approaches that worked in comparable wins. Make these conversational—how I'd actually say them, not formal scripts.

Conduct further research

Research your competitor and create head-to-head comparison guidance that shows where you win on what matters to this buyer.

They're evaluating us against [Competitor B]. Search the web to research their current positioning and messaging, then create a comparison doc: where we genuinely win for this buyer's priorities, how to differentiate without attacking, and specific language for handling "how are you different from them?" questions.

##### Tricks, tips, and troubleshooting

Connect other tools for more context

Your CRM captures structured data (deal size, stage, close date), but sources like your email or Slack contain more informal thinking and notes. Connect more tools so Claude can find and synthesize structured and unstructured intelligence.

Create a skill to package this workflow

Streamline your sales preparation by transforming this workflow into a Skill. Simply instruct Claude to create a skill based on your preferred process, including how you want to pull, analyze and format data. From there, each time you request a sales prep artifact, Claude will automatically conduct the research and analysis using new data.

Sets the quality bar with design language

The prompt includes specific markers like "top-tier design" and "industry-leading aesthetic." These cues push Claude toward stronger execution rather than its default output.

Ready to try for yourself?

Connect Claude to your CRM to pull comparable deals in seconds, understand what worked, and walk into sales conversations with context about matters for this situation.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Create sales reports

- Author: Anthropic
- Category: Sales
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/create-sales-reports

##### Describe the task

Claude's ability to pull live data from your CRM and synthesize it with your business context enables you to generate full reports in minutes.

Connect your CRM and tell Claude what timeframe, metrics, and segments you want analyzed. Describe your audience and any specific questions the report should answer.

I need a Q4 sales report for our exec team meeting next week. Pull October through December from HubSpot.

Show me:

Total revenue vs Q3—how much did we grow, and was it from more deals or bigger deals?

Break it down by segment: Enterprise, Mid-Market, and SMB. For each one, show revenue, number of deals, and win rate

How long are sales cycles taking now compared to Q3?

Current pipeline value and health

Top 3 reps by revenue with their numbers

What's actually working and what needs to change

Create this as a professional document with clean serif fonts, information dense with tight spacing, proper text hierarchy, and embedded charts PNGs that seamlessly integrate into the layout as opposed to looking pasted in. Use proper business style. Opt out of using your default styles.

##### Give Claude context

Connect your CRM using connectors so Claude can pull current sales data directly, eliminating manual exports and ensuring the report reflects your latest metrics.

Required context

In Settings > Capabilities, find and enable your HubSpot connector. Once connected, Claude can read sales data and pull metrics on demand without you exporting files or copying data manually. Add any additional context your CRM doesn't capture to help Claude conduct analysis more tailored to your business.

Q4 Sales Goals document

Optional context

Turn on Extended Thinking so Claude can better reason through your analysis and create high quality outputs.

Extended Thinking

##### What Claude creates

Claude analyzes your sales performance data to create a document with an executive summary, data tables showing key metrics with visual indicators, segment-by-segment breakdowns, trend analysis, and actionable recommendations.

From Claude:

> I pulled your Q4 data from HubSpot and created a professional sales report. Here's what stands out:
> The numbers:
> Revenue: $2.8M (up 18% from Q3)
> 47 deals closed, $59,500 average value
> Enterprise drove 62% of revenue—that's where the momentum is
> Sales cycles got 8 days faster
> SMB win rates dropped from 24% to 19%—this needs attention
> What's in the report:
> Executive summary with the key takeaways
> Revenue trend chart showing the month-by-month climb
> Segment comparison bar chart (Enterprise, Mid-Market, SMB)
> Metrics table showing Q4 vs Q3 with color coding
> Analysis of what's working and what's not
> Top 3 rep performance
> Specific recommendations for Q1
> View your sales performance report
> The report is professionally designed and ready to download and edit. You can share it directly or ask me to adjust the visualizations or analysis.

##### Follow-up prompts

Test your understanding

After generating the report, ask Claude to question you on the findings. This ensures you've absorbed the analysis and understand the overall picture.

Quiz me on the findings from this report like your manager. In addition to just the numbers, test me with questions about trends, what's driving them, and why it matters.

Combine internal data with external intelligence

Enable Research and request market context for Claude to compare your data with current market intelligence.

Pull my metrics, then research industry benchmarks for SaaS companies our size. How do we compare on win rate and sales cycle?

Deep dive by segment

After reading the report, zoom in on an area of particular interest to analyze specific findings and implications.

Take the Enterprise segment data and create a detailed analysis document. Break down performance by rep, identify which industries or company sizes are converting best, and analyze deal characteristics for our highest-value wins. I want to understand what's making Enterprise work so we can replicate it.

##### Tricks, tips, and troubleshooting

Request professional formatting

Ask Claude for "professional design" or "sophisticated formatting" and specify you want documents with visual hierarchy, strategic color accents, and proper whitespace. Claude can generate charts and graphs directly from your numbers and embed them into your report, so trends and comparisons are immediately visible without switching to separate files. You can also request companion spreadsheets with editable charts and visualizations that refer to the data in your document.

Stay current with live information

Unlike uploaded CSV files (static snapshots), connectors allow Claude to access current data from your tools. Ask Claude to pull the latest Q4 data from HubSpot whenever you need an update, and generate a report with the latest numbers without re-exporting files.

Expand analysis across tools

If you store market research in Google Drive or track initiatives in Asana, add those connectors so Claude can correlate additional factors with sales performance. For example: pull competitive intelligence from Drive while analyzing win rates to understand what's influencing deals, or cross-reference Asana milestones with pipeline velocity to see how product launches affect sales momentum.

Ready to try for yourself?

Connect your CRM, describe the information you need to display, and let Claude handle the analysis and formatting work.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Build a battle card library

- Author: Anthropic
- Category: Sales
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/build-a-battle-card-library

##### Describe the task

Claude can read through hundreds of deal notes and identify recurring themes in minutes. Using your strategic insight and refinement, you can create several competitive intelligence battlecards that reveal larger patterns and live in one spot.

Ask Claude to create a competitive dashboard for multiple competitors, with individual battlecards featuring specific talk tracks, objection handling scripts, and positioning strategies, all based on relevant information from your CRM and competitive intelligence sources.

Pull our HubSpot closed-lost deals from the last 6 months where DataGuard, BackupPro, or SecureVault appear in the competitor field. Read the deal notes for each competitor and tell me what patterns you see for each one. Search the web for their websites, G2 reviews, and recent positioning to find additional information.

Then, build a React-based competitive intelligence dashboard with a list view showing all three competitors and detailed battlecards for each. Build it like a modern analytics dashboard - clean, flat, metric-dense, with that tech meets creative minimalism. Think calculator app but for competitive intelligence.

##### Give Claude context

Claude needs details about your product, your competitor, and your typical sales scenarios to create battlecards that reflect real selling situations.

Required context

Connect your CRM, like HubSpot, so Claude can pull your closed-lost deals automatically.

Make sure Web Search is turned on so Claude can research competitor sites and reviews.

Upload a screenshot of your website or sales materials if you want the battlecard to match your brand's colors and fonts.

HubSpot

Website reference photo

Optional context

Turn on Extended Thinking for Claude to spend more time analyzing your sources and creating high quality outputs.

Extended Thinking

##### What Claude creates

Claude produces a comprehensive battlecard structured for quick reference during sales calls, including competitive positioning, differentiation strategies, objection handling scripts, and proven talk tracks that help sales teams win more competitive deals.

From Claude:

> II've created a competitive intelligence dashboard tracking DataGuard, BackupPro, and SecureVault based on your HubSpot data and competitive research.
> Overview page:
> Competitor cards - Each competitor shows their win rate, trend direction, average deal size, and sales cycle at a glance
> Pattern detection - Highlighted key patterns like "Security hooks early, decisions turn on 'more customers' + 'too simple'" with frequency data
> Comparative metrics - See your win rate against each competitor side-by-side (72% vs DataGuard, 81% vs BackupPro, 68% vs SecureVault)
> Center content - Tabbed sections:
> Vulnerabilities - Three major weak points with specific ask questions: "Show me day-one deployment" exposes their 12-week implementation gap
> Talk tracks - Power positioning with exact wording: "DataGuard confuses complexity with sophistication. Apple secures 2 billion devices with one button."
> Discovery questions - Trap questions in grid format: "Can you restore files in-app?" forces them to admit they'll send an engineer
> Objections - Common objections you'll hear → what to say → proof points to reference
> Positioning - How to reframe their claims: "enterprise-grade" → operational excellence, "military security" → recovery speed
> Right sidebar:
> Red flags - When to walk away from a deal (no timeline, purely feature-driven decisions, zero incumbent dissatisfaction).
> Win metrics - Your success rates when using the battlecard (72% win rate, 2.4× faster close, $147K average won deal)
> View your battlecard dashboard

##### Follow-up prompts

Generate training scenarios

Use the competitive intelligence to create realistic role-play scenarios for new sales team members, pulling from actual objections in your loss data.

Create three realistic sales call scenarios using actual objections from our BackupPro losses. Include the objection, our response, and likely follow-up questions.

Analyze competitive trends over time

Claude can track how competitor positioning changes quarter over quarter, helping you anticipate their next moves and adjust your strategy.

Compare our current DataGuard intelligence to the battlecard from Q2. What has changed in their positioning, and should we update our counter-messaging?

##### Tricks, tips, and troubleshooting

Combine multiple data sources for better intelligence

Connect your CRM for sales data, Google Drive for competitive research documents, and Slack for team discussions about competitor challenges. Claude finds patterns across all three sources, creating richer battlecards with more context. For example, if your Slack #sales channel mentions DataGuard's implementation delays and your HubSpot notes confirm it, Claude will emphasize that vulnerability.

Always verify specific facts before sharing

Claude excels at identifying patterns in your deal notes and synthesizing information across competitors. However, if the battlecard contains specific competitor pricing, feature launch dates, or customer names, always double-check those details. Instruct Claude to include citations and reference links for easy verification.

Ready to try for yourself?

Equip your sales team with unified competitive intelligence. Work with Claude to synthesize your market knowledge across multiple competitors into a dashboard that helps you close more deals.

Open artifact in new windowOpen artifact in new window

↑ back to top


### Marketing (3)

#### Adapt content across platforms

- Author: Anthropic
- Category: Marketing
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/adapt-content-across-platforms

##### Describe the task

Claude understands how different platforms work—the tone that resonates on social media, the brevity needed for email subject lines, the conversational style for podcasts. You bring the core ideas and strategic thinking; Claude helps you adjust the format and tone for each channel. Together, you can reshape content for different platforms without starting over each time.

Ask Claude to repurpose your blog post, whitepaper, or presentation into multi-channel copy and create an interactive artifact where you can see all the outputs. Include additional reference files or context so Claude creates copy that feels cohesive to your brand and audience.

Repurpose this blog post about AI-powered marketing analytics into multi-channel content:

LinkedIn carousel

Twitter thread

Email nurture sequence (5 emails)

Podcast talking points

Infographic outline

All content should feel cohesive to my brand but fitting for the platform. To better understand our brand voice, review past work in my Google Drive's 'Social' folder.

Create a beautiful interactive artifact first so I can review everything in one place. Match the design style that I included in the attached screenshots. Also, provide individual files for each format.

##### Give Claude context

To access your content, enable integrations and connectors that give Claude access to the tools where your work is stored.

Required context

Connect to your Google Drive so Claude has access to your source content and any of your previous work. Claude can study these references to make sure the work matches your writing style.

Google Drive

Source content

DOC

Communication style guide

DOC

Source content

DOC

Optional context

Enable Extended Thinking for better results completing complex tasks like analyzing across several sources and creating multiple files.

Extended Thinking

##### What Claude creates

Claude generates individual content files tailored for each platform, ready for your review and edits. Additionally, it provides a single artifact that showcases all deliverables in one place.

From Claude:

> All Done! Here's Your Complete Copy Package
> The repurposed content includes complete deliverables:
> LinkedIn Carousel PowerPoint — Professional 8-slide carousel with world-class design (Deep Blue, Teal, perfect typography hierarchy)
> Twitter Thread — 10 tweets with momentum-building structure, specific data, conversational tone
> Email Sequence — 5 emails that progressively build trust from problem → solution → evidence → implementation
> Podcast Talking Points — interview outline with stories, data, bridges for tough questions
> Infographic Outline — Detailed visual specification with exact colors, typography, layout, techniques
> Interactive HTML Showcase — Beautiful website demonstrating all deliverables with tabbed navigation

##### Follow-up prompts

Adjust for audience

Review the output and tailor tone and complexity as needed. Claude adapts writing style across technical, professional, or general audiences without you needing to specify every change.

This carousel copy feels too technical for my audience. Rewrite it for everyday users who want main takeaways, not intricate details.

Match existing brand voice

Claude learns your voice from examples and applies it consistently. Upload 2-3 pieces that represent your style, and Claude mirrors tone, structure, and phrasing patterns.

I'm uploading three emails from last quarter that performed well. Compare my draft to these and revise to match our actual voice.

Explore effective platform strategies

Generate multiple strategic variations to test different approaches. Claude creates distinct versions—from consensus-building to thought-provoking—so you can choose what fits your goals.

This thread needs to be more thought-provoking. Give me three versions: safe, debatable, and contrarian.

##### Tricks, tips, and troubleshooting

Use Projects for ongoing tasks

Create a "Content Production" project with brand guidelines, past examples, and platform best practices in Project Knowledge. Add project instructions about maintaining brand voice (casual but expert, specific not generic). Now every repurposing task happens faster and more on-brand.

Allow time for multiple files

This task will produce several files so may take longer than usual. Claude creates each deliverable individually, so expect a few minutes for the complete package.

Outline with Claude, then personalize

Leverage Claude to generate the structure of the content, then personalize with your own unique insights. The content artifact can help to streamline the process of viewing all outputs together and pinpointing areas needing refinement.

Publish and share artifacts

After creating the artifact, publish it to create a shareable URL you can send to others. This can be perfect for brainstorming and sharing ideas with teammates and other stakeholders. Recipients don't need Claude accounts to view published artifacts.

Ready to try for yourself?

Work with Claude to learn how to adapt content strategically across platforms—understanding how structure, tone, and format need to shift for each channel while your core message and brand voice stay consistent.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Analyze campaign performance

- Author: Anthropic
- Category: Marketing
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/analyze-campaign-performance

##### Describe the task

Compiling campaign data across multiple channels into a unified view takes hours of work. Claude handles the consolidation and analysis together, processing multiple data sources to spot channel patterns, identify reallocation opportunities, and deliver actionable recommendations.

Tell Claude to analyze your data and create Excel dashboards and Word documents. Be explicit that you need actionable recommendations for next quarter, not just historical summaries. Ask Claude to identify patterns and opportunities in the data—what's working, what's not, and where to reallocate resources.

I'm running three campaigns targeting different customer segments. I have Q3 data showing impressions, clicks, conversions, and spend across social, search, and email.

Analyze performance and tell me:

Which campaigns and channels are working

Where to reallocate budget for Q4

What patterns I'm missing across segments

Create a dashboard and analysis report. I need to know what to do differently next quarter.

Context: Our target ROI is 300%+. Enterprise customers have 3x higher LTV than SMB. Industry benchmark is 200-250% ROI. I can shift up to 30% of budget based on performance.

##### Give Claude context

To make helpful recommendations, give Claude your business context, such as your current and target metrics, as well as industry benchmarks.

Required context

Upload any data relating to your campaign performance. Click the (+) button in the chat bar to browse through your files, or alternatively, drag and drop files into the chat box area.

Campaign data

XSLX

Campaign data

XSLX

Optional context

Use Extended Thinking for better results completing complex tasks like analyzing data and creating high quality spreadsheets.

Extended Thinking

##### What Claude creates

Claude analyzes your marketing data and turns it into a strategic review that tells you where and how you can improve.

From Claude:

> I've analyzed the Q3 campaign data across three campaigns, three channels, and three customer segments to identify performance patterns and budget optimization opportunities.
> I created an Excel dashboard with executive metrics, campaign rankings using performance-based color coding, and channel breakdowns, plus a detailed analysis document detailing what's working, what's not, hidden opportunities like the enterprise-email synergy, and specific Q4 budget reallocation recommendations projected to increase net profit by $185K.
> Excel Performance Dashboard:
> Campaign Overview - ROI, CPA, conversion rate by campaign with conditional formatting highlighting top/bottom performers
> Channel Analysis - Performance breakdown by channel with cross-channel attribution insights
> Budget Optimization Model - Reallocation recommendations with projected impact
> Word Detailed Analysis (10-15 pages):
> Executive Summary
> What Is Working: Top Performers & Success Patterns
> What Is Not Working: Underperformers & Root Causes
> Strategic Recommendations: Q4 Action Plan

##### Follow-up prompts

Update past work

Ask Claude to reformat previous analyses so all your dashboards are consistent. Claude preserves your data and insights while restructuring everything to match, creating consistency across your work.

I’'m attaching performance reviews from years prior. Reformat these older reports to match the new structure—keep all the original data and insights, just reorganize into the current template format.

Add visual polish

Request visual touches that improve the quality of your outputs.

Enhance the spreadsheet by adding data visualizations ( heat maps to show patterns, charts for larger trends) and dropdown menus for easy filtering.

##### Tricks, tips, and troubleshooting

Perform competitive benchmarking

Use Research to find industry benchmarks and compare performance. Research works differently from a simple search—Claude deep dives across all your connected tools and online sources. This process takes a few minutes but delivers a thorough report with citations you can verify. Having multiple integrations connected gives Research more context to work with, allowing Claude to cross-reference internal knowledge with external market data.

Open the actual Excel file, not just the preview

The chat preview shows basic table structure, but the actual spreadsheet contains working formulas, formatting, color-coded cells, and typography that may not appear in chat. Download and open the file to see the full sheet with all formatting intact before requesting changes.

Work with messy data

Claude handles messy data so upload data as-is—mixed formats, inconsistent naming, incomplete fields. Focus your energy on collecting comprehensive information from several channels rather than making everything perfectly formatted.

Ready to try for yourself?

Work with Claude to transform campaign data into strategic recommendations that help you decide where to invest next quarter.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Build customer personas

- Author: Anthropic
- Category: Marketing
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/build-customer-personas

##### Describe the task

Building customer personas usually means manually reviewing interviews, surveys, and support tickets to find patterns. Claude analyzes all your research data simultaneously—spotting behavioral trends across hundreds of data points that you'd miss reviewing files one by one—then builds personas based on how customers actually use your product.

Tell Claude what you're trying to understand about your customers, then ask for data-driven personas with journey maps showing where people struggle.

I've uploaded customer feedback from different sources—could be sales call notes, support conversations, survey responses, whatever we've collected. Figure out what types of customers we have based on their actual behavior and problems.

Create an interactive artifact where I can explore each persona and see their journey. Show their goals, what frustrates them, and include actual quotes from customers. Make the artifact professionally and elegantly designed, as it will be shared with others. Focus on creating analytical and helpful content. Take time to analyze thoroughly, outline carefully, and validate your work.

##### Give Claude context

To create personas grounded in actual behavior rather than assumptions, provide Claude with data that reflects real customer behavior. This includes customer descriptions of their problems, frequently asked support questions, peak times for seeking assistance, mentioned and unmentioned features, and how they discuss competitor solutions.

Upload your customer research files and connect your CRM and customer experience tools so Claude can analyze patterns across all your data sources to create personas grounded in actual behavior rather than assumptions.

Required context

Upload your customer research files and enable access to your CRM, like HubSpot, and to your customer service data, like Intercom, so Claude can analyze patterns across all your data sources.

HubSpot

Intercom

Customer interview transcripts

PDF

Survey responses

Customer interview transcripts

PDF

Optional context

Turn on Extended Thinking so it can analyze thoroughly and spot patterns across all your sources at once.

Extended Thinking

##### What Claude creates

Claude analyzes your customer data across Intercom conversations, HubSpot deal notes, interview transcripts, and survey responses and finds behavioral segments that explain the mixed feature adoption. Claude then creates an interactive artifact where you can explore each persona, click through their journey stages, and see the data that defines each behavioral pattern.

From Claude:

> I've analyzed your customer feedback and built an interactive persona explorer. Here's what I found:
> View your Customer Persona Explorer
> The artifact shows 3 distinct customer types based on behavioral patterns in your data. Click between personas to see:
> Who they are and what they're trying to accomplish
> Their journey from first contact through daily use
> Specific pain points at each stage with actual customer quotes
> Where they get stuck and why
> Each journey stage is clickable so you can navigate through the timeline and see the quotes that define each moment. The patterns are based on recurring themes across your feedback—not assumptions about who we think customers are, but what the data actually shows about how different groups use your product and where they struggle.

##### Follow-up prompts

Create a written report for distribution

Convert the interactive visualization into a document format for distribution. Claude creates a narrative report that leadership can read asynchronously, with the findings and implications spelled out clearly rather than requiring exploration of the artifact.

Create a written report from your analysis that I can share with our executive team. Include the behavioral segments you found, what each segment needs, journey friction points, and specific recommendations for our product roadmap.

Identify the biggest revenue opportunity

Translate persona insights into concrete product decisions by identifying which segment to focus on and what specific changes would improve their experience and increase value realization.

Which segment represents the biggest revenue opportunity if we optimized the product experience for them? Walk through what we'd need to change.

Find quick wins from support tickets

Identify quick wins that would reduce support volume and improve experience for your biggest customer group, making the research immediately actionable.

For the largest segment, pull the most common support ticket themes and show me which product changes would eliminate the top three issues.

##### Tricks, tips, and troubleshooting

Check the actual files before requesting changes

Claude's in-chat preview shows a simplified version of what it created. The actual file—Word document, spreadsheet, or artifact—contains formatting, features, and design elements that may not show up in the preview. Open the real file to see the complete work before asking Claude to revise anything.

Connect your tools to avoid stale data

Uploading files gives Claude a snapshot of your data at one moment. If you store customer interviews in Google Drive, support tickets in Zendesk, or feedback in Intercom, add those connectors so Claude can pull data directly. Your personas reflect current information without manually exporting and uploading files each time.

Use Projects for ongoing work

Maintain context—uploaded files, previous work, ongoing decisions— across all conversations within that Project through the Project Knowledge and Memory.This can be helpful for work that develops over time. Upload initial customer research to a Project, and when you add new interviews weeks later, Claude still has access to the original data. Your personas evolve with previous context rather than starting fresh each conversation. Projects work like persistent workspaces instead of isolated chats.

Ready to try for yourself?

Connect your customer data sources and see what behavioral patterns Claude finds across interactions, helping you to segment customers by how they actually behave rather than assumptions.

Open artifact in new windowOpen artifact in new window

↑ back to top


### Life Sciences (2)

#### Preclinical study analysis

- Author: Anthropic
- Category: Life Sciences
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/preclinical-study-analysis

##### Describe the task

Claude connects directly to research platforms like Benchling, allowing you to query complex experimental data as naturally as asking a colleague. It retrieves data from multiple notebook entries and sources, synthesizes comparisons, and creates polished reports, saving hours of tedious compilation work.

Start by telling Claude what studies you need to compare and what you want to understand about them.

Summarize the study designs for ST042 and ST043 and how they're different, including a table indicating key differences. Link all my notebook entries and sources.

##### Give Claude context

To enable this workflow, you'll need Claude connected to your research data management system, like Benchling or other platforms.

Required context

To pull data directly from your Benchling workspace, use the Benchling connector. This connector requires you to have Claude for Desktop.

After connecting, Claude will be able to access your electronic lab notebooks, experimental protocols, and study data.

Benchling

Optional context

##### What Claude creates

Claude connects to Benchling's agents to retrieve your study data, then synthesizes a comprehensive summary with key differences highlighted.

From Claude:

> Perfect! The research is complete. Here's a comprehensive summary of studies ST042 and ST043:
> Study Overview
> Both ST042 and ST043 are preclinical validation studies evaluating the same LNP003-L006 therapeutic formulation for hepatic phosphoglycerate mutase (PGM) protein restoration. They were run in parallel with identical test articles and analytical methods but used different animal models and dose ranges.
> ST042: Restoring PGM Levels with LNP003
> Study ID: bfi_ZWJIMRJbt
> Duration: February 12, 2024 - March 6, 2025
> Animal Model: Apolipoprotein E knockout (Apoe−/−) mice (n=14)
> Study Context: Disease model for atherosclerosis/cardiovascular applications
> Principal Investigator: Cecilia Cheng
> ST043: Efficacy of PGM
> Study ID: bfi_1cQtyNuu
> Duration: January 8, 2024 - March 7, 2025
> Animal Model: C57BL/6 wild-type mice (n=12)
> Study Context: Standard efficacy assessment for baseline therapeutic evaluation
> Principal Investigator: Cecilia Cheng
> Key Differences Table
> How They Differ
> 1. Animal Models
> ST042 used a disease model (Apoe−/− mice) with validated amyloid pathology to assess efficacy in a context relevant to atherosclerosis and cardiovascular translational applications. ST043 used standard wild-type mice to establish baseline therapeutic efficacy without disease confounders.
> 2. Dosing Strategy
> ST043 explored higher dose ranges (0.75-1.5 mg/kg) compared to ST042 (0.5-1.0 mg/kg), providing dose-response data across an expanded therapeutic window.
> 3. Tissue Collection Scope
> ST042 had more comprehensive tissue collection (64 samples from liver, blood, and spleen), while ST043 had focused collection (14 samples) with enhanced brain tissue analysis for potential neurological applications.
> 4. Strategic Purpose
> ST042 validated efficacy in a disease-relevant model, while ST043 provided clean therapeutic signal data for establishing the baseline therapeutic window.
> Shared Elements
> Both studies used:
> Identical LNP003-L006 formulation (bfi_nQkcz2Zb2)
> Same analytical methods (HPLC, ELISA, histology)
> Oral administration based on body weight
> Three-group design (control, low dose, high dose)
> Same sampling timepoints (D2 T0 and D7)
> Key Documentation
> ST042 Notebook Entries
> EXP25000831 - Primary study report
> EXP25000829 - IND application report
> EXP24000468 - HPLC analytical protocol
> ST043 Notebook Entries
> EXP24000469 - HPLC analytical protocol
> Cross-Study Documentation
> Comparative analysis template for ST041, ST042, and ST043
> Conclusion
> These complementary studies demonstrate that LNP003-L006 effectively restores hepatic PGM protein levels in both wild-type and disease models, with robust dose-dependent efficacy. ST042's 3.5-fold increase in protein levels between dose groups and peak response of 511 µg/mL validates therapeutic potential in a disease-relevant context, while ST043 confirms activity across higher dose ranges in standard models.

##### Follow-up prompts

Generate regulatory documentation

After reviewing the study comparison, ask Claude to create a polished report.

From these results, generate a Study Report that I can include in my regulatory submission.

##### Tricks, tips, and troubleshooting

Connects directly to your source data

When you ask Claude to "link all my notebook entries," it queries Benchling's database and retrieves actual entry IDs with clickable links. This maintains full traceability back to raw experimental data, which is essential for regulatory compliance and internal validation.

Open external links to verify and interact with content

Claude provides Benchling notebook URLs (like benchling.com/entry/bfi_ZWJIMRJbt) so you can click through to review the original experiment protocols, attachments, results, and visualizations. This gives you full context beyond what appears in the summary.

Ready to try for yourself?

What used to take days of compiling and validating across tools now happens in minutes. Connect Claude to your research platform and start querying your experimental data like you'd ask a colleague—with full traceability and regulatory-ready outputs.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Genomic data analysis

- Author: Anthropic
- Category: Life Sciences
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/genomic-data-analysis

##### Describe the task

Claude's ability to process large datasets and search scientific literature, combined with your domain expertise, lets you move from raw data to validated hypotheses in a fraction of the time it would take manually.

Share your genomic data with Claude and describe what you want to explore. Claude can analyze differential expression patterns, create visualizations, and search scientific databases to contextualize your findings.

My colleagues recently published the attached single-cell dataset that describes gene expression differences between adult and pediatric liver samples with a focus on the immune system. I would like to explore these samples but focus on the parenchymal cells and differences between adult and pediatric liver. Can you help me first go through the differentially expressed genes and create a heatmap and then also identify pathways or sets of genes that are enriched in each sample?

##### Give Claude context

To help Claude analyze your genomic data effectively, you'll need to provide your datasets and optionally connect to research databases.

Required context

Upload CSV or TSV files containing differential expression results, normalized counts, or other quantitative genomics data. Click the (+) button in the chat bar to browse through your files, or alternatively, drag and drop files into the chat box area.

Use connectors to give Claude access to research databases. You can browse through a variety of tools from trusted partners, built for Model Context Protocol, or add custom ones. Keep in mind, some connectors are only available using Claude for Desktop.

Claude can then use your genomic data files to perform computational analysis and generate visualizations.

Differential expression data files

CSV

Differential expression data files

CSV

Optional context

Enable Extended thinking for Claude to think through more complex tasks, like creating analysis reports and visualizations.

Extended Thinking

##### What Claude creates

Claude examines your datasets, performs pathway enrichment analysis, creates visual representations of gene expression patterns, and identifies key biological processes enriched in each condition.

From Claude:

> I'd be happy to help you analyze these differentially expressed genes between adult and pediatric liver parenchymal cells! Let me start by examining the datasets you've uploaded.
> Perfect! I can see we have two datasets:
> Pediatric-enriched genes: 2000 genes with positive log fold changes
> Adult-enriched genes: 818 genes with positive log fold changes
> Now let me create a comprehensive analysis including:
> A heatmap visualization of top differentially expressed genes
> Pathway enrichment analysis for both conditions
> Excellent! I've completed a comprehensive analysis of the differentially expressed genes between adult and pediatric liver parenchymal cells. Here's what I found:
> Key Findings:
> Dataset Overview:
> Pediatric-enriched: 1,999 genes with significantly higher expression
> Adult-enriched: 817 genes with significantly higher expression
> Top Pediatric-Enriched Genes:
> The most striking pediatric markers show extremely high fold changes (15-25 log2FC):
> KCNA5 (voltage-gated potassium channel) - 24.9 log2FC
> HSPB7 (heat shock protein) - 24.7 log2FC
> MYOZ1 (muscle development) - 24.3 log2FC
> HAPLN2 (ECM proteoglycan) - 8.7 log2FC
> CASQ2 (cardiac calcium sequestration) - 8.1 log2FC
> Top Adult-Enriched Genes:
> Adult liver shows moderate enrichment (4-5 log2FC) in mature metabolic functions:
> APOA4 (lipid metabolism) - 5.3 log2FC
> CYP2A7 (drug metabolism) - 4.6 log2FC
> CHI3L1 (inflammatory marker) - 4.4 log2FC
> F9 (coagulation factor IX) - 4.1 log2FC
> CYP3A4 (primary drug metabolizing enzyme) - 3.6 log2FC
> Pathway Enrichment Analysis:
> Strongly Pediatric-Biased (>75%):
> Cardiac/Smooth Muscle (89% pediatric) - developmental contractile machinery
> Muscle/Contractile proteins (86%) - cytoskeletal maturation
> Extracellular Matrix (85%) - tissue remodeling
> Chemokines/Cytokines (81%) - immune recruitment
> Heat Shock Proteins (80%) - stress response/development
> Coagulation/Blood (78%) - hemostasis development
> Strongly Adult-Biased (>75%):
> CYP450/Drug Metabolism (87% adult) - mature xenobiotic processing
> Secreted Proteins (83%) - hepatic synthetic function
> Lipid Metabolism (80%) - mature lipid homeostasis
> Glucose Metabolism (67%) - gluconeogenesis capacity
> Ion Channels/Transport (65%) - mature hepatocyte function
> Biological Insights:
> Pediatric liver is characterized by:
> Strong developmental programs (muscle, ECM, contractile proteins)
> Active tissue remodeling and growth
> Elevated stress response (HSPs)
> Immune system recruitment signatures
> Immature metabolic capacity
> Adult liver demonstrates:
> Mature metabolic specialization (CYP450s, lipid/glucose metabolism)
> Established synthetic functions (coagulation factors, complement)
> Reduced developmental signaling
> Functional hepatocyte differentiation
> Files Generated:
> View heatmap - Top 50 genes from each group
> View pathway analysis - Pathway enrichment comparison
> View detailed summary - Gene statistics
> View full pathway analysis - Complete pathway details
> View pathway summary table - Summary statistics

##### Follow-up prompts

Literature validation

Claude can search PubMed to distinguish which of your findings are well-documented in literature versus novel discoveries, helping you identify the most promising avenues for further research.

I'd like to focus on the extracellular matrix and its remodeling or function in the pediatric liver. I want to understand what is expected in these findings vs. what is new. Can you look at the ECM and remodeling proteins and explore the literature in PubMed to clarify citations of well-understood matrix proteins in the pediatric liver v. ECM components that do not currently have known functions in developmental or pediatric liver?

##### Tricks, tips, and troubleshooting

Connect PubMed for real-time literature integration

When Claude is connected to PubMed, it can access actual papers, extract specific experimental details, and find citations you might miss. This turns literature review from a multi-day task into a conversation. Claude provides reference links to all the articles it mentions, including identifying specific sections that you can deep dive on your own for further review.

Build your analysis incrementally

Start with exploratory data analysis and visualization, review the patterns, then dive deeper into specific pathways. This checkpoint approach lets you steer the analysis toward the most interesting findings rather than trying to do everything at once.

Ask Claude to show its computational methods

Request "show me the code" or "explain your analytical approach" to verify Claude is using appropriate statistical methods for your data type. This builds confidence in results and helps you explain your analysis to reviewers.

Continue working in your files

The files Claude creates are fully editable. Download the heat maps, pathway comparisons, and summary documents to continue working in your preferred tools.

Ready to try for yourself?

Whether you're exploring differential expression, validating findings against literature, or designing follow-up experiments, Claude can handle the computational heavy lifting while you focus on the creative work of scientific discovery.

Open artifact in new windowOpen artifact in new window

↑ back to top


### HR (1)

#### Create new hire onboarding guides

- Author: Anthropic
- Category: HR
- Model: Sonnet 4.5
- Source URL: https://claude.com/resources/use-cases/create-new-hire-onboarding-guides

##### Describe the task

Claude's ability to combine standard information with personalized details, paired with your knowledge of what new hires actually need, lets you create welcoming, practical guides without manually assembling the same pieces each time.

Tell Claude about the new hire (name, role, start date, team, manager) and point to your standard company information. Ask for a first week guide that combines everything they need to know in one place.

Create a first week guide for Sarah Chen, starting as Senior Product Designer on our Design Systems team this Monday, November 4th. Her manager is Michael Torres.

Include:

Welcome and what to expect their first week

Her specific onboarding schedule

Office logistics

Team introductions

Tools and access she'll receive

Common first-week questions

To find relevant information, search my Google Calendar for onboarding events, her team's slack channel #design-systems, and all the documents I've uploaded.

Make it information-dense but beautifully organized—a senior designer should look at this and think "they have great taste here." Use sophisticated typography and layout, not generic HR formatting. She should be able to scan it quickly but find everything she needs.

##### Give Claude context

Provide your standard company information and the new hire's specific details so Claude can create a guide that feels informational, welcoming, and personally relevant.

Required context

Enable the Google Calendar integration so Claude can reformat your onboarding calendar events into a schedule for the new hire.

Upload your company handbook, office logistics documents, and any role-specific onboarding information.

Google Drive

Company policy handbook

PDF

Office logistics

DOC

Company policy handbook

PDF

Optional context

Turn on Extended Thinking so Claude can spend more time thinking through information across your tools and creating high quality file outputs.

Extended Thinking

##### What Claude creates

Claude combines your standard company information with personalized details into a single, welcoming guide that equips new hires with helpful, specific onboarding information.

From Claude:

> Done! I've created Sarah's first week guide with everything she needs to feel prepared.
> The guide includes:
> Personal welcome addressing her role and team
> Day-by-day breakdown of her first week with specific meetings and orientations
> Office essentials (parking in Lot C, building access via badge pickup, nearby lunch spots)
> Her team structure with names, roles, and what each person works on
> Tools she'll get access to and when (Figma, Miro, Jira, Slack channels)
> Quick answers to common questions (What to wear? When do I get paid? Who do I ask for help?)
> Key contacts organized by need (IT issues → Jake, expense questions → Finance team)
> The document balances being informative without overwhelming—she can read it Sunday night and feel confident about Monday morning.
> View Sarah's first week guide

##### Follow-up prompts

Batch create for multiple new hires

Generate personalized versions for different recipients from a single template. Claude customizes content for each person's role, team, or context while maintaining consistency.

I have four people starting Monday: Alex (Engineering), Maria (Sales), Jordan (Marketing), Sam (Customer Success). Find their details and schedules across my Google Drive and Calendar. Then, create a personalized first week guide for each person—same company logistics but customized for their role, team, and what matters for their position.

Add additional features

Embed images, diagrams, or hyperlinks into your documents. Claude handles both the upload and formatting.

Using the files I just uploaded, add our team photo to the 'Your Team' section and the Floor 3 office map. Also include hyperlinks for helpful context and navigation (our office building address, relevant email addresses, our company website).

Convert to other formats

Take one source document and create versions optimized for different uses—reading, presenting, emailing, printing. Claude adapts structure and formatting for each purpose.

Convert this word document into a PDF for printing, a bulleted list of urgent information and action items for email, and a powerpoint slide deck for presenting.

##### Tricks, tips, and troubleshooting

Iterate on design with specific feedback

If the first version doesn't look right, give Claude specific direction: "make it more information-dense, the first page has too much wasted space", “this looks too generic, create something that looks like a high-end creative agency made it not HR” or "the boxes aren't rendering correctly, simplify the table structure." Claude can quickly adjust typography, layout, spacing, or restructure entirely. Design iteration is fast.

Personalize the design

Clarify how you want your document to look by describing your design preferences to Claude—whether that's clean and minimal, bold and modern, or sophisticated and corporate. For even better results, upload your brand guidelines or screenshots of your company website so Claude can match your specific color schemes, typography, and overall design aesthetic.

Create a reusable template

Once you've created your initial guide, save its structure as a template within a 'New Hire Guide' Project. This project should include instructions on which tools to use for gathering company information and emphasize a warm yet practical tone. For each new hire, simply input their specific details, and Claude will personalize the template accordingly.

Ready to try for yourself?

Create a first week guide that helps your next hire walk in feeling confident instead of overwhelmed.

Open artifact in new windowOpen artifact in new window

↑ back to top


### Claude in Chrome (6)

#### Log sales calls to your CRM

- Author: Anthropic
- Category: Claude in Chrome
- Model: Haiku 4.5
- Source URL: https://claude.com/resources/use-cases/log-sales-calls-to-your-crm

##### Describe the task

Claude reads your Google Calendar, finds each meeting's attendees in Salesforce, and drafts activity logs. You provide notes on what was discussed and review everything before Claude creates the records.

This works for logging a single day or catching up on a backlog. Claude handles the cross-referencing and formatting; you add the context that makes the logs useful.

Log my calls from today in Salesforce.

Steps:

Go to my Google Calendar and find today's external meetings (skip internal)

For each meeting, look up the attendees in Salesforce

Create an activity log for each call—I'll provide a quick summary of what was discussed

Format each log with next steps included

Do not submit. Show me everything for review before saving to Salesforce.

##### Give Claude context

Claude uses browser use to work across your calendar and CRM through your existing browser sessions. If you're logged into Google Calendar and Salesforce, Claude can read your meetings, look up contacts, and create activity records. No API configuration or IT tickets required.

Required context

Log into Google Calendar and Salesforce in Chrome before starting. Claude navigates between them using your existing sessions.

Optional context

If you take notes during calls—in a doc, notepad, or even bullet points—have them accessible. Claude can format rough notes into structured activity descriptions.

##### What Claude creates

Claude shows what it found on your calendar, matches attendees to Salesforce contacts, and drafts activity logs for your review.

From Claude:

> External Meetings Today
> 5 found — Here's the status:
> 9:00 AM — Intro call - Acme Corp
> - Salesforce match: Sarah Chen (VP Ops)
> - Status: Ready to log
> 10:30 AM — Demo - TechStart
> - Salesforce match: Marcus Johnson
> - Status: Ready to log
> 1:00 PM — Follow-up - Blue Sky
> - Salesforce match: Rachel Torres
> - Status: Ready to log
> 2:30 PM — Pricing - Orion Systems
> - Salesforce match: James Park
> - Status: Ready to log
> 4:00 PM — Discovery - NewCo
> - Salesforce match: No match found
> - Status: Needs input
> Ready to Log (4 calls)
> Give me a quick summary for each and I'll format the activity log.
> 1. Acme Corp — Sarah Chen
> You: "Good discovery call. Evaluating us vs Competitor X. Pain point is reporting—current tool takes 2 hours for what should take 5 minutes. Decision by end of Q1. Next step is technical demo with ops team."
> Draft Activity Log:
> - Subject: Discovery Call - Acme Corp
> - Type: Call
> - Related To: Acme Corp - New Business
> Description:
> Discovery call with Sarah Chen (VP Operations).
> Discussion:
> - Evaluating our solution against Competitor X
> - Primary pain point: reporting inefficiency (2 hours for reports that should take 5 minutes)
> - Decision timeline: End of Q1
> Next Steps:
> - Schedule technical demo with operations team
> - Send competitive comparison materials
> Needs Your Input
> 5. NewCo Discovery
> No contact found matching the attendee email ([email protected]).
> Options:
> - Create a new contact record
> - Log the activity against the Account only
> - Skip this one
> Once you confirm and give me the remaining summaries, I'll show the complete batch for final review.

##### Follow-up prompts

Update opportunity stages

While logging activities, update the opportunity records based on what you learned.

For Acme Corp, move the opportunity to "Demo Scheduled" and update the close date to end of Q1. Add Competitor X to the competitors field.

Catch up on the week

Process multiple days of calls at once before a pipeline review.

I've fallen behind on logging. Can you do this for all my external meetings from the past week? I'll review everything before our Monday pipeline meeting.

Create missing contacts

Add new contacts when attendees don't exist in Salesforce yet. Claude can create them and link the activity in one step.

Go ahead and create a contact for Alex at NewCo. His title is Director of Partnerships—you can pull the rest from his email signature in the calendar invite. Then log the activity against that new record.

##### Tricks, tips, and troubleshooting

Drag Calendar and Salesforce into the same tab group

For cross-app workflows, drag both Google Calendar and Salesforce into Claude's tab group. You'll see a tab group highlighting the tabs Claude can access. Now Claude can read calendar attendees and look up Salesforce contacts simultaneously—no tab switching. Before visiting new sites, Claude asks for permission. You can grant site-level permissions for websites you trust, allowing Claude to work without repeated approvals on those specific domains.

Permissions before taking actions

Before clicking "send," "publish," "post," "submit," or similar action buttons, Claude asks for approval. This includes sending emails, posting to social media, submitting forms, or messaging others on your behalf.

Save your workflow as a shortcut

Once you have an activity log format that works, save the prompt as a shortcut by clicking on the shortcut icon below a successful prompt. You can also set a schedule for when you want the workflow to run next. Alternatively, manually trigger the workflow, by typing "/" and selecting the shortcut.

Ready to try for yourself?

Claude in Chrome is available to all paid plan users. Install the extension, log into Google Calendar and Salesforce, and ask Claude to log today's calls. It works with your existing browser sessions—no integrations to configure.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Compare products across sites

- Author: Anthropic
- Category: Claude in Chrome
- Model: Haiku 4.5
- Source URL: https://claude.com/resources/use-cases/compare-products-across-sites

##### Describe the task

You've got four browser tabs open with different laptops—or TVs, or vacuums, or whatever you're comparing. Each site shows specs differently: one says "RAM," another says "Memory," a third buries it in a collapsible section. You're switching back and forth, trying to remember which one had better battery life. Claude in Chrome can read each product page, pull the specs, normalize the labels, and build a comparison table in Google Docs.

Open the product pages you want to compare. Tell Claude which specs matter to you, and it handles the rest.

I'm trying to decide between a few laptops and I have the product pages open in different tabs. Can you look at each one, pull out the specs, and put them in a Google Doc so I can compare them side by side?

I care most about: processor, RAM, storage, screen size, battery life, and weight. Let me know which one wins on each category.

##### Give Claude context

Claude reads directly from the product pages you have open—switching between tabs to extract the specs, then creating a spreadsheet with everything normalized into consistent columns.

Required context

Tell Claude which products you're wanting to compare or open the product pages in separate browser tabs. Log into Google Docs so Claude can draft the comparison there. Claude navigates between tabs on its own—you just need everything accessible in your browser.

If you're comparing several products, consider telling Claude which specs matter most upfront. Otherwise it will pull everything it finds, which can make the spreadsheet wider than you need.

Optional context

##### What Claude creates

Claude analyzes and extracts information from across tabs, drafting a comparison doc that highlights which product wins each category, and gives a quick recommendation.

From Claude:

> 4 Laptops Compared
> Spreadsheet created
> I found these products across your open tabs:
> Dell XPS 15 (dell.com) — $1,499
> MacBook Pro 14" (apple.com) — $1,999
> Lenovo ThinkPad X1 Carbon (lenovo.com) — $1,649
> HP Spectre x360 (hp.com) — $1,399
> Spec Comparison
> Here's the comparison based on the specs you care about:
> Price
> - Dell XPS 15: $1,499
> - MacBook Pro 14": $1,999
> - ThinkPad X1: $1,649
> - HP Spectre: $1,399
> - Winner: HP Spectre
> Processor
> - Dell XPS 15: Intel i7-13700H
> - MacBook Pro 14": Apple M3 Pro
> - ThinkPad X1: Intel i7-1365U
> - HP Spectre: Intel i7-1360P
> - Winner: MacBook (M3 Pro)
> RAM
> - Dell XPS 15: 16 GB
> - MacBook Pro 14": 18 GB
> - ThinkPad X1: 16 GB
> - HP Spectre: 16 GB
> - Winner: MacBook (18 GB)
> Storage
> - Dell XPS 15: 512 GB SSD
> - MacBook Pro 14": 512 GB SSD
> - ThinkPad X1: 512 GB SSD
> - HP Spectre: 1 TB SSD
> - Winner: HP Spectre (1 TB)
> Screen
> - Dell XPS 15: 15.6" OLED
> - MacBook Pro 14": 14.2" Liquid Retina
> - ThinkPad X1: 14" IPS
> - HP Spectre: 13.5" OLED
> - Winner: Dell (15.6" OLED)
> Battery
> - Dell XPS 15: 13 hours
> - MacBook Pro 14": 17 hours
> - ThinkPad X1: 15 hours
> - HP Spectre: 12 hours
> - Winner: MacBook (17 hrs)
> Weight
> - Dell XPS 15: 4.2 lbs
> - MacBook Pro 14": 3.4 lbs
> - ThinkPad X1: 2.48 lbs
> - HP Spectre: 3.01 lbs
> - Winner: ThinkPad (2.48 lbs)
> Quick Notes
> Lenovo listed battery as "up to 15 hours" and HP said "12 hrs mixed use"—I normalized both to comparable estimates
> Dell's page said "Memory" instead of RAM; HP buried it in the "Tech Specs" accordion
> The Intel laptops have upgradeable RAM (user-accessible slots); the MacBook's 18GB is soldered and fixed
> The ThinkPad keyboard is consistently rated best-in-class if you type a lot—worth considering beyond just specs
> I've created the comparison in Google Sheets with conditional formatting highlighting the winner in each row.
> Bottom Line
> The MacBook wins the most categories (processor, RAM, battery) but costs $350–600 more than the others.
> If portability is your priority: The ThinkPad is the clear choice—it's nearly 2 lbs lighter and $350 less than the MacBook.
> If you want the best performance and battery regardless of price: The MacBook is hard to beat.
> I can also pull real-world battery tests from reviews if you want—manufacturer claims are often optimistic.

##### Follow-up prompts

Add another option

Expand your comparison as you find more candidates. Claude adds new products to the existing doc without starting over.

I just found one more laptop option. Can you add it to the doc and update the comparison?

Check reviews for the top pick

Before deciding, see what actual buyers say. Claude can scan reviews and summarize common praise and complaints.

The MacBook looks like the best specs, but what are people saying about it? Can you check reviews and tell me if there are any common complaints I should know about?

Find the best price

Once you've picked a winner, Claude can check multiple retailers to find the lowest current price.

I think I want the MacBook Pro. Can you check a few sites and find where it's cheapest right now?

##### Tricks, tips, and troubleshooting

Drag tabs into Claude's tab group

If you already have relevant product page tabs open, you can drag them into Claude's designated tab group. You'll see a banner highlighting the group of tabs that Claude is active in. Claude can read and work across all tabs in the group simultaneously—no tab-switching required. Before visiting new sites, Claude asks for permission. You can grant site-level permissions for websites you trust, allowing Claude to work without repeated approvals on those specific domains.

Save your comparison template as a shortcut

If you research products regularly, save your workflow as a shortcut by clicking on the shortcut icon below a previous prompt. Next time you're comparing options, just type "/" and select the shortcut for Claude to follow the same directions.

Ready to try for yourself?

Claude in Chrome is available to all paid plan subscribers. Install the extension, describe or open a few product pages you're comparing, and ask Claude to build your spreadsheet.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Prepare and plan from your calendar

- Author: Anthropic
- Category: Claude in Chrome
- Model: Haiku 4.5
- Source URL: https://claude.com/resources/use-cases/prepare-and-plan-from-your-calendar

##### Describe the task

Claude for Chrome lets Claude interact directly with web pages—reading content, clicking, typing, and navigating sites on your behalf. For calendar prep, this means Claude can open your Google Calendar, check each meeting's attendee list, switch to Gmail to search for relevant threads with those people, and even book conference rooms.

Point Claude at your Google Calendar and tell it what to look for. It handles the cross-referencing between calendar and email, surfaces what needs your attention, and can fix the gaps.

Look at my calendar and help me get ready for tomorrow.

For each meeting:

Tell me if it's internal or external (check the attendee domains)

Find any recent email threads with those attendees about this topic

Flag if the meeting is missing a room (for in-person) or a video link (for remote). If it is, assign one to the meeting.

For external meetings, note anything I should review beforehand, like relevant docs attached to the meeting or related emails.

Give me a quick prep summary for the day, finding what needs my attention before I show up.

##### Give Claude context

Claude reads your calendar and email directly in Chrome. It cross-references attendees, threads, and meeting details to build context.

Required context

Required: Open Google Calendar showing tomorrow's date and Gmail in another tab. Claude navigates between them to gather context for each meeting. Make sure you're logged into both.

Optional context

Optional: If you take notes during calls—in a doc, notepad, or even bullet points—have them accessible. Claude can format rough notes into structured activity descriptions.

##### What Claude creates

Claude reviews each meeting and gives you a prep summary organized by what needs attention.

From Claude:

> Tomorrow: Wednesday, December 18
> You have 6 meetings. Here's what I found:
> Needs Prep (External Meetings)
> MeetingTimeContextAcme Corp quarterly review10:00 AMExternal (3 attendees from @acme.com). Found email thread from Dec 12 where they asked about API rate limits—might come up. No room booked.Vendor intro - DataFlow2:00 PMExternal (new contact). They sent a capabilities deck on Dec 15 you haven't opened. Zoom link is in the invite.
> Missing Logistics
> MeetingIssueSuggested FixAcme Corp quarterly reviewNo roomBook Sequoia (seats 6) — availableTeam planning syncNo roomBook Birch (seats 8) — availableDesign reviewNo video linkFound Meet link in thread with Sarah—add to invite?
> Ready to Go (No Action Needed)
> Standup — 9:00 AM, has Zoom link, recurring
> Marcus 1:1 — 11:30 AM, internal, has room (Aspen)
> End of day sync — 4:30 PM, internal, has Meet link
> Quick Prep Summary
> Review the API rate limits thread before Acme call (I can pull the key points if helpful)
> Open the DataFlow deck before the 2pm—it's 12 slides
> Book rooms for Acme and Team planning
> Add Meet link to Design review
> Want me to book those rooms and add the video link now?

##### Follow-up prompts

Fix the logistics

Claude can book rooms and add links directly to calendar events. Once you've reviewed what needs fixing, approve the changes.

Yes, book those rooms and add the Meet link. Use a room on the 6th floor if available—that's where I sit.

Get deeper prep for the external meeting

For important calls, Claude can summarize recent correspondence with those contacts. This surfaces what's been discussed and what might come up.

For the Acme meeting, can you summarize the last few email threads I've had with them? I want to know what's been discussed recently and what they might bring up.

Make this a nightly routine

Claude in Chrome can run tasks on a schedule. Set this to run every evening so you start each morning with prep done.

Can you save this as a shortcut I run every evening at 6pm? Call it "Prep tomorrow" and have it review my calendar, flag external meetings, and check for missing rooms or links.

##### Tricks, tips, and troubleshooting

Save and automate your workflow as a shortcut

Save the prompt as a shortcut by clicking on the shortcut icon below a successful prompt. You can also set a schedule for when you want the workflow to run next. Alternatively, manually trigger the workflow, by typing "/" and selecting the shortcut.

Navigating to new sites

Claude asks for permission before visiting new sites. You can grant site-level permissions for websites you trust, allowing Claude to work without repeated approvals on those specific domains.

Permissions before taking actions

Before clicking "send," "publish," "post," "submit," or similar action buttons, Claude asks for approval. This includes sending emails, posting to social media, submitting forms, or messaging others on your behalf.

Ready to try for yourself?

Install the Claude in Chrome extension and watch Claude scan tomorrow's meetings, find what you need to know, and fix what's missing—prep done before tomorrow arrives.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Clean up promotional emails

- Author: Anthropic
- Category: Claude in Chrome
- Model: Haiku 4.5
- Source URL: https://claude.com/resources/use-cases/clean-up-promotional-emails

##### Describe the task

Promotional emails accumulate faster than you can unsubscribe. Claude in Chrome can scan through your inbox, identify marketing emails, newsletters, and automated notifications, then present them as a list for you to review before deleting in bulk.

Tell Claude what to look for and what to leave alone. It flags candidates for deletion and waits for your approval before taking action.

Find emails I likely don't need so I can review and bulk delete.

Flag these:

Promotional emails from retailers/brands

Newsletters I haven't opened in 3+ months

Automated notifications (delivered shipping updates, expired calendar reminders)

Marketing emails from SaaS products

Don't flag:

Emails from actual people (not automated)

Anything with attachments

Anything from [my company domain]

Output: Show me the list organized by sender so I can review before deleting.

##### Give Claude context

Claude works within your Gmail session. It can read email content, see sender information, and check whether you've opened messages. It only takes action when you confirm.

Required context

Before starting your Claude in Chrome session, make sure you're logged into your Gmail account.

Optional context

##### What Claude creates

Claude uses your session to scan and sort through your inbox. Claude presents what it found, organized for your review.

From Claude:

> I've scanned your inbox and found 847 emails that match your criteria. Here's the breakdown by sender:
> Retailers and brands (312 emails)
> Amazon promotional: 89 emails
> Target Circle: 45 emails
> Nordstrom: 38 emails
> Best Buy deals: 31 emails
> Various other retailers: 109 emails
> Unopened newsletters (203 emails)
> Morning Brew: 67 emails (last opened 4 months ago)
> The Hustle: 52 emails (never opened)
> Various Substack newsletters: 84 emails
> Automated notifications (198 emails)
> Amazon shipping updates: 76 emails (all delivered)
> Google Calendar reminders: 44 emails (past events)
> LinkedIn notifications: 78 emails
> SaaS marketing (134 emails)
> Notion tips: 23 emails
> Figma updates: 19 emails
> Various trial follow-ups: 92 emails
> I left alone:
> All emails from people (not automated senders)
> 34 emails with attachments
> Everything from your company domain
> Ready to delete all 847, or would you like to keep any of these senders?

##### Follow-up prompts

Adjust and proceed

Keep certain senders or categories, then confirm the deletion.

Keep Morning Brew and the Figma updates. Delete everything else.

Unsubscribe from unwanted messages

For senders that keep filling your inbox, have Claude unsubscribe instead of just deleting.

For the retailers with more than 15 emails, go through and unsubscribe me instead of just deleting. I don't want to continue receiving these messages.

Flag subscription emails you may have missed

While scanning emails, Claude can spot receipts and payment confirmations from services you might have forgotten about.

While you're in there, can you find any recurring payment emails? I want to see which subscriptions I'm paying for and see if there are some I forgot to cancel.

##### Tricks, tips, and troubleshooting

Permissions before taking actions

Before clicking "send," "publish," "post," "submit," or similar action buttons, Claude asks for approval. This includes sending emails, posting to social media, submitting forms, or messaging others on your behalf.

Save and schedule tasks with shortcut

Once your cleanup prompt works well, click the shortcut button below the prompt to save it as a shortcut. Next time, just type "/" to view the command instead of rewriting the whole prompt. Alternatively, you can schedule the shortcut to run automatically.

Claude keeps working in the background

Claude keeps scanning even when you switch to other tabs—as long as Chrome is open. Turn on notifications in extension settings to get alerted when Claude finishes or needs your approval. You'll see a desktop notification when the cleanup list is ready.

Ready to try for yourself?

Claude in Chrome is available to all paid plan users. Install the extension, sign in with your Claude account, and try this workflow on your inbox today. Pin the extension to your toolbar for quick access.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Pull metrics from analytics dashboards

- Author: Anthropic
- Category: Claude in Chrome
- Model: Haiku 4.5
- Source URL: https://claude.com/resources/use-cases/pull-metrics-from-analytics-dashboards

##### Describe the task

Claude navigates your analytics dashboards—Amplitude, Mixpanel, or other tools—and extracts the metrics you specify. It reads the same reports you would, pulls the numbers, and compiles them into a summary you can paste into a team update or Slack.

Specify which metrics matter and from which tools. Claude handles the navigation and extraction.

Pull my weekly metrics from both my Amplitude and Mixpanel open tabs.

From Amplitude:

Weekly active users (WAU) — past 4 weeks

New user signups — this week vs. last week

Retention (Day 1, Day 7, Day 30) — for the cohort from 30 days ago

From Mixpanel:

Feature adoption rate for new dashboard (% of WAU who used it)

Conversion rate through onboarding flow

Top 5 events by volume this week

Output: Format as a summary I can paste into our weekly product update.

##### Give Claude context

Claude uses browser use to navigate your analytics tools through your existing browser sessions. If you're logged into Amplitude and Mixpanel, Claude can access the same dashboards and reports you see—no API keys or integrations to configure.

Required context

Log into your analytics tools in Chrome before starting. Claude navigates to the dashboards and reports using your sessions.

Optional context

If you have saved dashboards or reports in your analytics tools, mention them by name. Claude can navigate directly to a saved report rather than building queries from scratch.

##### What Claude creates

Claude compiles metrics from both tools into a single summary.

From Claude:

> Weekly Product Metrics Summary
> User Growth
> Source: Amplitude
> WeekWAUChange4 weeks ago24,312—3 weeks ago25,891+6.5%2 weeks ago26,455+2.2%This week27,102+2.4%
> Key Stats:
> New signups: 1,847 this week vs 1,623 last week (+13.8%)
> Retention (30-day-old cohort): Day 1: 68% → Day 7: 41% → Day 30: 23%
> Feature Engagement
> Source: Mixpanel
> New dashboard adoption: 34% of WAU (up from 28% last week)
> Onboarding conversion: 71% complete the full flow
> Top Events This Week:
> EventCountDashboard viewed45,221Report exported12,847Filter applied11,293Team member invited4,891Integration connected3,442
> Summary for Your Update
> WAU grew 11.5% over the past month to 27.1K. New signups are up 14% week-over-week. The new dashboard is seeing solid adoption at 34% of active users. Retention remains steady with 23% of users still active at Day 30.

##### Follow-up prompts

Dig into a specific metric

Have Claude investigate before you share the report and get more detail when something looks off.

The onboarding conversion dropped from 78% last week. Can you go into Mixpanel and show me where in the flow people are dropping off? I need to understand this before the meeting.

Share the output in a different channel

Once your summary is ready, have Claude format it and post it directly to your team channel.

This looks good. Can you turn it into a few bullet points and post it to #product-weekly in Slack? Just the highlights and anything that changed significantly.

Add another data source

Pull in another data source without starting over. Claude can look in a new tab and add to your summary.

Can you also pull our revenue metrics from Stripe? I need MRR, new subscriptions this week, and churn rate. Add them to the summary.

##### Tricks, tips, and troubleshooting

Schedule weekly metrics pulls

Click the clock icon in the extension panel to schedule this workflow. Set it to run Monday morning and Claude will have your metrics summary ready before your weekly product sync. No more scrambling to pull numbers before the meeting.

Drag all your analytics tabs into one group

For multi-tool metrics, drag Amplitude, Mixpanel, and any other dashboards into Claude's tab group. You'll see a green banner confirming Claude can access all of them. Now Claude reads across every tool simultaneously—no manual switching.

Save your workflow as a shortcut

Once you have a metrics pull that covers what you need, save it as a shortcut by clicking on the shortcut icon below a successful prompt. You can also set a schedule for when you want the workflow to run next. Alternatively, manually trigger the workflow, by typing "/" and selecting the shortcut.

Grant permission to your analytics platforms

If Claude asks for permission on every dashboard page, go to Settings → Permissions and enable "Always allow actions on this site" for Amplitude, Mixpanel, and other trusted work tools. Persistent access speeds up multi-page navigation significantly.

Ready to try for yourself?

Claude in Chrome is available to all paid plan users. Install the extension, log into your analytics tools, and describe the metrics you need. Claude navigates the dashboards and compiles a summary ready to paste into your team update.

Open artifact in new windowOpen artifact in new window

↑ back to top


#### Organize files in Google Drive

- Author: Anthropic
- Category: Claude in Chrome
- Model: Haiku 4.5
- Source URL: https://claude.com/resources/use-cases/organize-files-in-google-drive

##### Describe the task

Years of files piling up in Google Drive—downloads you never sorted, documents people shared with you, old project folders mixed with random screenshots. The task of organizing it feels endless, so it never happens. Claude in Chrome can navigate your Drive, create a folder structure, and move files where they belong while you do something else.

Tell Claude what kind of organization you want, or let it figure out a structure based on what's there. You review the results instead of doing the sorting yourself.

I need to organize my Google Drive by reviewing all files and creating a logical folder structure.

What to do:

Scan through my Drive including Downloads, Shared with me, and the root level

Create appropriately named folders based on what you find (e.g., by project, file type, or year)

Move files into the folders you create

Flag anything you're unsure about or think I should delete

Before moving files: Show me your proposed folder structure and any files you're uncertain about. I'll review before you finalize.

##### Give Claude context

Claude works directly in your Google Drive through the browser—the same interface you'd use. It can see your files, create folders, and move things around without downloading or uploading anything.

Required context

Log into Google Drive before starting. If you have specific folders you want to preserve or a naming convention you prefer, mention that in your prompt.

If your Drive is very large, consider asking Claude to start with one section—like just your Downloads or just files from the past year. You can expand from there.

Optional context

##### What Claude creates

Claude reports what it organized, what it moved, and what needs your decision before going further.

From Claude:

> Drive Organized
> 847 files sorted | 12 folders created | 23 items need your review
> I went through everything in your Drive and created a structure based on what I found. Here's the new layout:
> New Folder Structure
> FolderFilesWhat's in itWork156Documents with company names, meeting notes, presentationsFinance89Tax docs, receipts, bank statements, invoicesPhotos234Images and screenshots, organized by yearPersonal67Travel docs, medical records, insuranceProjects145Grouped by project name where I could identify oneReference52Manuals, guides, saved articlesShared With Me73Files owned by others (can't move these, but grouped the view)Archive0Empty for now—waiting for your approval on old files
> Needs Your Review
> Duplicates Found (8 sets)
> Budget_2023.xlsx — 3 versions, newest is from October 2023
> Resume.pdf — 4 versions across folders
> Project_Proposal.docx — 2 identical copies
> I haven't deleted anything. Say the word and I'll keep the newest version of each.
> Old Files to Consider Archiving (12 files)
> 6 documents last opened in 2021 or earlier
> 4 spreadsheets from a project that looks finished
> 2 PDFs that appear to be outdated versions of current docs
> Couldn't Categorize (3 files)
> Document (3).docx — Appears to be meeting notes but no clear project
> Untitled.gdoc — Blank document
> scan0042.pdf — Scanned document, can't determine content
> Everything Else
> Sorted and in place.
> Want me to handle the duplicates, move the old files to Archive, or rename the unclear ones?

##### Follow-up prompts

Remove the duplicates

Clean up redundant copies once you've confirmed which version to keep. Claude can delete in bulk or one at a time.

Go ahead and delete the duplicate files you found. Keep the most recent version of each.

Archive old files

Move untouched files out of your main view without deleting them. Useful for anything you might need later but don't want cluttering your folders.

Move everything that hasn't been opened in over a year to an Archive folder. I'll look through it later but get it out of my main view.

Rename files consistently

Replace generic names with descriptive ones based on file contents. Easier to search later.

A lot of these files have useless names like 'Document (3)' or 'Screenshot 2023-04-12'. Can you rename them based on what's actually in them?

##### Tricks, tips, and troubleshooting

Save your organization system as a shortcut

Once you've refined your folder structure preferences, save your prompt as a shortcut (type "/" and create one like /drive-organize). Include your preferred folder names and file categories so future cleanups match your system.

Schedule monthly maintenance

Turn on the schedule toggle for the ability to schedule this workflow. Claude runs the workflow automatically and notifies you when there's something to review. This keeps a regular scan for new unsorted files and duplicates to keep your Drive organized long term.

Claude asks before deleting anything

File deletion is a high-risk action. Even in "Act without asking" mode, Claude will pause and request approval before permanently removing files. Duplicates and old files get flagged for review—nothing disappears without your explicit confirmation.

Ready to try for yourself?

Claude in Chrome is available to all paid subscribers. Install the extension and open Google Drive in Chrome. Claude works with your existing login—no API keys or integrations to set up. Start with one folder to see how it organizes before tackling your whole Drive.

Open artifact in new windowOpen artifact in new window

↑ back to top
