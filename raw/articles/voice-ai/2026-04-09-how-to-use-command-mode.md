---
id: article-2026-04-09-how-to-use-command-mode
type: source
title: "How to use Command Mode"
path: raw/articles/voice-ai/2026-04-09-how-to-use-command-mode.md
author: Unknown
publisher: docs.wisprflow.ai
url: https://docs.wisprflow.ai/articles/4816967992-how-to-use-command-mode
date_published: 
date_added: 2026-04-09
tags: [voice-ai, wispr-flow, commands, voice-interface]
status: processed
quality: high
summary: "Wispr Flow's Command Mode turns dictation into an editing interface, letting users highlight text and speak transformation instructions such as rewrite, translate, summarize, or search."
related: [voice-ai, wispr-flow, commands, voice-interface]
---

# How to use Command Mode

## Source Metadata

- Path: raw/articles/voice-ai/2026-04-09-how-to-use-command-mode.md
- Author: Unknown
- Published: Unknown
- Publisher: docs.wisprflow.ai
- URL: https://docs.wisprflow.ai/articles/4816967992-how-to-use-command-mode

## TL;DR

Available on: Mac, Windows, iOS (partial — search commands work via voice triggers; text editing commands are currently unreliable on iOS)

## Key Claims

- Available on: Mac, Windows, iOS (partial — search commands work via voice triggers; text editing commands are currently unreliable on iOS)

## Important Details

- Source captured from docs.wisprflow.ai.
- Section heading: How to enable Command Mode
- Section heading: Keyboard shortcuts
- Section heading: How to use Command Mode
- Section heading: With highlighted text
- Section heading: Without highlighted text

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
- [[voice-dictation]]
- [[claude-code]]

## Source Text

Available on: Mac, Windows, iOS (partial — search commands work via voice triggers; text editing commands are currently unreliable on iOS)Command Mode lets you transform text with your voice — rewrite a paragraph, translate content, or search the web by speaking. Highlight text and give a command to edit it instantly, or ask a question to get answers via Perplexity.Important: Command Mode requires a paid subscription (including trials) and must be enabled in Settings before use.Open Wispr Flow and go to Settings → Experimental.Toggle on Command Mode.You'll see a confirmation that Command Mode is now active.Note: The Experimental settings page is only visible to paying users, including those on a free trial. If you don't see it, check that your subscription or trial is active in Settings → Plans & Billing. Enterprise users with an active subscription can also access this page.Keyboard shortcutsPress and hold the shortcut, speak your command, then release:Mac: Fn + CtrlMac (backup): Cmd + Ctrl + Option (use this if your keyboard doesn't have an Fn key)Windows: Ctrl + Win + AltTo cancel Command Mode, press ESC.Tip: You can bind a mouse button to activate Command Mode. Go to Settings → Shortcuts → Command Mode to assign a key or mouse button — up to 4 shortcuts with up to 3 keys each. Supported mouse buttons include Middle Click and Mouse 4–10.How to use Command ModeWith highlighted textHighlight text in any app.Activate Command Mode using your shortcut.Speak your command (e.g., "Make this more concise").Release the shortcut. Flow replaces the highlighted text with the result.Warning: The edited text replaces your highlighted selection. Select exactly what you want transformed. You can undo with Cmd+Z (Mac) or Ctrl+Z (Windows).Without highlighted textActivate Command Mode without selecting any text to ask questions. On desktop, Flow opens Perplexity in your browser with your query. If you have text highlighted, it is appended as context to the search query.Example: "Who won the San Francisco Giants game this weekend?""Press enter" voice commandSay "press enter" at the end of a dictation to have Flow automatically press the Enter key after pasting your text. The words "press enter" are removed from the output — only your dictated text is pasted, followed by an Enter keystroke.Flow handles punctuation automatically, so saying "Hello world. Press enter." will paste "Hello world." and then press Enter. The command is case-insensitive and only recognized at the end of your dictation.Note: The first time you say "press enter," Flow shows a notification asking if you'd like to enable the feature. Flow won't press Enter until you enable it in Settings → Experimental. If you choose not to enable it, subsequent dictations will keep "press enter" as literal text in your output.ExamplesRewriting text to be more conciseYou highlight: A long paragraph in an email draft.You say: "Make this more assertive and concise"Flow does: Replaces your selection with a shorter, punchier version.Translating contentYou highlight: A paragraph in English.You say: "Translate to Polish"Flow does: Replaces the selected text with a Polish translation.Expanding an outline into proseYou highlight: A bulleted outline of key points.You say: "Turn this outline into an essay"Flow does: Replaces the outline with a fully written essay.Searching the web with your voiceYou do: Activate Command Mode without highlighting any text.You say: "Who won the San Francisco Giants game this weekend?"Flow does: Opens Perplexity in your browser with the search query.Text limits and behaviorsText length: Selected text must be between 1 and 1,000 words. If your selection exceeds 1,000 words, Flow shows "Oops, too long to polish — Try again with under 1000 words."Cancel in progress: Press ESC to cancel a transformation while it's processing.No changes needed: If the transformation produces text identical to your original, Flow shows a "Your text looks good!" notification.During processing: Command Mode cannot be activated while a previous transcription is still being processed. Wait for it to complete first.Non-editable fields: If Flow can't paste into the current field, your transformed text is saved to the clipboard with a notification.FAQsDo I need to say "Hey Flow" on desktop?No. On Mac and Windows, use the keyboard shortcut and speak your command directly. Flow understands what you're trying to do without trigger phrases.What happens when I try to use Command Mode while it's disabled?You'll see a "Command mode is toggled off" notification with a "Go to settings" button that opens the Experimental settings page. This notification appears up to 3 times, at most once per day.What if I see "Command Mode Servers Are Busy"?Wait a few minutes and try again. The servers are experiencing high demand.Can I undo a Command Mode transformation?Yes. Press Cmd+Z (Mac) or Ctrl+Z (Windows) to restore your original text.Can I disable the "press enter" voice command?Yes. Go to Settings → Experimental and toggle off the "press enter" feature.Limitations and notesSubscription required: Command Mode requires a paid subscription or active free trial.iOS support is partial: Search commands work via voice triggers, but text editing commands are currently unreliable on iOS.Experimental feature: This feature may change based on feedback.Shortcut requirements: All shortcuts (except ESC for dismiss) must include at least one modifier key (Fn, Ctrl, Cmd, Opt, Shift, Alt, or Win) or a valid mouse button.
