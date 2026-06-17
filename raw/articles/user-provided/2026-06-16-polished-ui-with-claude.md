---
id: article-2026-06-16-polished-ui-with-claude
type: source
title: "The 10 Rules To Ship Truly Polished UI With Claude"
path: raw/articles/user-provided/2026-06-16-polished-ui-with-claude.md
author: "Kevin (@kvnkld)"
publisher: "X article, user-provided capture"
url: https://x.com/kvnkld/status/2066863634949779464?s=46
date_published: 2026-06-16
date_added: 2026-06-17
tags: [claude, ai-ui, ui-polish, frontend, design-system, design-tokens, motion-design, interaction-design, prompting, accessibility]
status: active
quality: medium
summary: Kevin's practitioner article argues that polished Claude-built UI comes from human-owned taste translated into exact design tokens, motion curves, tactile states, physical interactions, layered depth, accessibility constraints, and iterative state discovery rather than vague "make it premium" prompting.
related: [ai-interface-design, 2026-05-30-app-template-design-system-blueprint, 2026-05-30-component-theme-source-library]
---

# The 10 Rules To Ship Truly Polished UI With Claude

## Source Metadata

- Path: raw/articles/user-provided/2026-06-16-polished-ui-with-claude.md
- Author: Kevin (@kvnkld)
- Published: 2026-06-16
- Publisher: X article, user-provided capture
- URL: https://x.com/kvnkld/status/2066863634949779464?s=46
- Public article shell: https://x.com/kvnkld/article/2066863634949779464
- Local capture: /Users/josemanuelcerqueira/.codex/attachments/4dfc1c98-dbeb-4251-a6aa-9fd5f909858c/pasted-text.txt
- Provenance note: the public X page did not expose full article text without login during ingest; the tweet/article ID decodes to 2026-06-16T12:41:05Z, matching the public search result date.

## TL;DR

This practitioner article is useful because it converts "taste" for AI-built frontend work into concrete constraints a coding agent can execute: exact easing curves, design tokens, physical drag behavior, magnetic snap points, blur-plus-rise entrances, layered shadow stacks, tactile press states, correct expand/collapse mechanics, reduced-motion support, and explicit component state models. Treat it as high-signal craft guidance, not as controlled evidence that these exact values are universally optimal.

## Key Claims

- Polished UI is not produced by vague prompts such as "premium" or "smooth"; the human must supply taste, rules, and exact constraints.
- Browser default easing curves make AI-built UI feel generic; projects should define a small house set of custom easing variables and reuse them.
- Design-system variables should be defined before component work so the model stops inventing one-off radius, duration, color, and shadow values.
- Draggable controls should use physics-like behavior: velocity tracking, release momentum, and soft boundaries rather than simple timed fades or slides.
- Snap points can simulate tactile feedback on the web when they use a smaller pull-in zone, a larger release zone, and a visible catch response.
- Entrances should combine opacity, small translation, and clearing blur rather than relying on plain fades.
- Depth should come from layered low-opacity shadows and hairline rings, not one heavy drop shadow or a generic border.
- Clickable elements should have tactile active states, such as a subtle scale-down, plus non-instant tooltip entrances.
- Expand/collapse should animate to real content height using grid row transitions; moving elements across layout should use FLIP animation.
- Polish includes performance and accessibility: respect reduced-motion preferences and avoid animating expensive properties across large surfaces.
- Real component quality comes from state-driven design: idle, hover, pressed, loading, disabled, success, working, and transition states should be deliberately designed and often discovered through use.

## Important Details

- The article's most reusable prompting rule is "give numbers, never adjectives": exact curves, durations, offsets, blur values, and shadow stacks are more executable than taste words.
- The proposed easing variables are `--ease-smooth`, `--ease-out`, `--ease-spring`, and `--ease-in-out`; the author explicitly says the exact values are tuned by feel rather than sacred constants.
- The design-token advice maps directly onto this KB's app-template rule that components should consume semantic role tokens instead of raw values.
- The physical-interaction advice is most relevant for sliders, drag handles, live counters, and controls whose value changes continuously; it should not be applied as decorative motion to dense tables or nav rows.
- The snap-point pattern has two parts: a tight zone where the control catches and a wider zone required to break free after catching.
- The entrance recipe is opacity plus a 6px rise plus about 2px blur clearing over roughly 280-320ms.
- The shadow recipe emphasizes hairline rings and multiple faint layers with very low opacity, which aligns with restrained product UI more than heavy Material-style elevation.
- The grid-row expand/collapse technique avoids fake `max-height: 9999px` transitions; FLIP handles cross-layout movement by measuring start/end positions and animating the visual inversion.
- The accessibility rule is explicit: decorative motion must stop or collapse under `prefers-reduced-motion`, and performance-sensitive effects should favor transform/opacity over shadow/height animation.
- The state-driven rule is the durable mindset: the build process reveals missing states, and those discoveries are where much of the polish lives.

## Entities

- Person: Kevin (@kvnkld)
- Platform: X
- Tool/product: Claude
- Concepts: AI-built UI, UI polish, design tokens, easing curves, cubic-bezier, drag physics, magnetic snap points, blur entrances, layered shadows, tactile states, grid-row reveal, FLIP animation, reduced motion, state-driven design, Figma handoff
- Technologies: CSS custom properties, CSS Grid, `prefers-reduced-motion`, Figma variables

## My Notes

- This source strengthens the KB's AI-interface/design-system lane because it captures the craft layer between "use tokens" and "ship states": exact motion and tactile behavior can be prompted, tokenized, and verified.
- The article is especially useful as agent-prompt material. It gives coding agents concrete recipes: curve values, timing ranges, press scale, shadow stack structure, reveal technique, and state inventory.
- The source should not override the existing app-template caution against decorative motion. It is best read as "when motion clarifies interaction, specify it precisely" rather than "animate everything."
- The exact easing/shadow values are opinionated defaults. Future UI work should tune them to product context, accessibility, and performance rather than copying them mechanically.
- The strongest durable idea is that human taste becomes useful to an LLM when it is externalized as a small set of reusable tokens, state rules, and iteration prompts.

## Open Questions

- Which of these motion and shadow recipes should become default tokens in future internal app templates?
- How should a UI verification checklist test whether motion feels tactile without becoming subjective theater?
- When should physical drag/snap behavior be implemented with a dedicated animation library rather than hand-authored CSS/JS?
- How should a design-system spec distinguish required interaction states from optional delight states?

## Related

- [[ai-interface-design]]
- [[2026-05-30-app-template-design-system-blueprint]]
- [[2026-05-30-component-theme-source-library]]
- [[internal-engineering-conventions]]

## Source Text

The 10 rules to ship truly polished UI with Claude
People keep asking how the UI components I post end up looking so polished, or what prompts I use. So here’s a breakdown of the most important things:
Polish is not a feature you prompt for. You can't type "make it premium and smooth" and get there. The model is a phenomenal pair of hands, but the taste, the rules, and the hundred tiny decisions are still yours. Everything below is the system I use, the same principles baked into the components I've been sharing. Steal all of it.
I'll give you each rule three ways: the rule, how to prompt it, and how to prep it in Figma where it matters.
Rule 1: Easing is everything. The default ease is banned.
The single biggest difference between "an LLM built this" and "a human with taste built this" is the easing curve, how movement starts, speeds up, and settles. The browser's built-in defaults (ease, ease-in-out) scream generic. I never use them.
I keep one house easing set as design variables and reuse it across every project:
css
:root {
  --ease-smooth: cubic-bezier(0.22, 1, 0.36, 1);  /* default for almost everything */
  --ease-out:    cubic-bezier(0.17, 1, 0.32, 1);   /* decorative entrances */
  --ease-spring: cubic-bezier(0.35, 1.55, 0.65, 1); /* badges, pops, overshoot */
  --ease-in-out: cubic-bezier(0.66, 0, 0.34, 1);   /* symmetric moves */
}
These aren't sacred numbers. They're tuned by feel. I nudged every one of them until presses, reveals, and entrances felt right to me. That tuning is the work. A curve that's 0.02 off feels subtly wrong even if you can't name why.
Prompt it: Never say "smooth." Give the exact curve: "Use cubic-bezier(0.22, 1, 0.36, 1) for all transitions, and a slight overshoot curve cubic-bezier(0.35, 1.55, 0.65, 1) for anything that pops in, like a badge appearing with a tiny bounce." Specificity is the whole game.
Rule 2: Define your design system variables before you build a single component.
Polish reads as consistency. Consistency comes from a shared vocabulary: your design tokens. Before any component, I define variables for colors, corner radius, durations, motion curves, and shadow stacks. Every state, hover, and dark-mode variant then pulls from the same set.
css
:root {
  /* Corner radius */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 24px;

  /* Duration */
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 280ms;
}
Once these exist, the model stops inventing one-off 13px corner radius values and random 0.3s timings. Your whole UI snaps into rhythm.
Prompt it: Hand the model your variable block first and say "use only these tokens, no one-off values." This one instruction kills 80% of the "AI slop" look.
Figma prep: Build Figma variables that mirror your design tokens 1:1 (same names). Now design and build is a translation, not a reinvention.
Rule 3: For anything draggable, use real physics, not simple fades and slides.
A basic timed animation on a drag handle feels dead. Real interfaces have momentum, friction, and resistance.

Three things make a drag feel alive:
Tracking how fast the user is moving, smoothed over time, so a flick has weight.
Momentum on release. Keep moving and slow down gradually until it rests, like something sliding across a table.
Soft boundaries. When you hit the edge, don't stop hard. Let it stretch a little and spring back. That single touch is the difference between "web slider" and "iOS."
For values that can't be animated with a simple duration (counters, live numbers), I use a spring animation, tuned for how stiff, bouncy, and heavy the movement should feel, instead of a fixed time.
Prompt it: Forget the jargon. Just describe how it should feel: "Make the slider feel like a real physical object, not a web input. When I flick it, it should keep gliding and slowly coast to a stop on its own, like sliding something across a table. And when it hits the edge, it shouldn't stop dead, it should stretch a little and spring back." The model already knows the physics. It just needs to know what you want it to feel like.
Rule 4: Add snap points. Magnetic snapping is free haptics.
Hardware gives you haptic clicks. On the web you fake the same satisfaction with snap points: as the handle nears a meaningful value (a month boundary, a preset), it gently magnetizes to it.
The trick that makes it feel real is a two-zone system: a tight pull-in zone to snap in, and a larger release zone to break free. Once snapped, you have to mean it to pull away. When it catches, I pulse the label for a micro flash of feedback. That tiny resistance reads, subconsciously, as quality.
Prompt it: "Add magnetic snap points at [these values]. Use a smaller pull-in zone and a larger release zone so it locks and resists, and flash the label when it catches."
Rule 5: Entrances blur in. They never just fade.
A plain fade is the most overused entrance and the least premium. Mine almost always combine three things: opacity, a small upward shift, and a tiny blur that clears.
opacity: 0 to 1
translateY: 6px to 0
filter: blur(2px) to blur(0)
duration: ~280ms with --ease-smooth
Notice there's no new easing here: the curve is just your smooth preset from Rule 1. That's the point of the motion set: you define the feel once and every entrance, hover, and reveal inherits it. The blur is the secret ingredient. It makes content feel like it focuses into place instead of flicking on.
Prompt it: "Entrance = fade + 6px rise + a 2px blur that clears, ~320ms on the smooth curve."
Figma prep: Design the "before" frame explicitly (offset plus your blur effect) so the motion intent is visible to anyone reading the file.
Rule 6: One shadow is a sticker. Real depth is layered light.
A flat single-blur shadow is an instant tell. Physical objects cast several shadows at once: a hairline where they meet the surface, a tight contact shadow, and a wide soft ambient. I keep two standard presets and reuse them on everything.
The everyday card (a panel sitting on a surface):
css
--shadow-card:
  0 1px 2px rgba(0, 0, 0, 0.05),       /* close drop  */
  0 2px 4px rgba(0, 0, 0, 0.02),       /* soft spread */
  0 0 0 0.5px rgba(0, 0, 0, 0.08);     /* hairline ring, not a border */
The elevated version (modals, lifted cards). Same idea, more layers:
css
--shadow-elevated:
  0 4px 8px rgba(0, 0, 0, 0.02),    /* spread        */
  0 8px 12px rgba(0, 0, 0, 0.02),   /* wide ambient  */
  0 2px 4px rgba(0, 0, 0, 0.02),    /* mid           */
  0 1px 2px rgba(0, 0, 0, 0.04),    /* contact       */
  0 0 0 0.5px #e0e0e0;              /* hairline ring */
Three things make these read as real and not "default Material elevation":
A hairline ring replaces the border. This is the single biggest tell of a hand-made UI. The edge is defined by light, not a 1px stroke.
Opacities stay tiny, roughly 2% to 8%. Heavy shadows look cheap. Depth is the sum of many faint layers, not one dark one.
Stack several blurs at different sizes. A tight one for the contact edge, a wider soft one for the ambient spread. The overlap of many faint layers is what reads as real depth, never one single blur.
Prompt it: "Don't use a single drop shadow. Stack a hairline ring instead of a border, a tight contact shadow, and a wide soft ambient, all at very low opacity (2% to 8%). Use 0 1px 2px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.02), 0 0 0 0.5px rgba(0,0,0,0.08) and animate the whole stack on hover."
Rule 7: Make everything tactile. Press should be felt.
Every interactive element gets a press response. My default is a subtle scale-down when pressed:
css
.button:active { transform: scale(0.98); }
0.98, not 0.9, so it registers as a firm press, not a collapse. Buttons, swatches, tabs, footer rows: all of them. Combine with hover state shifts and tooltips that blur + lift in (not instant pop-in) and the whole surface starts to feel responsive to touch.
Prompt it: "Every clickable element scales down slightly (to 98%) when pressed, using the fast duration. Tooltips fade + lift 4px + clear a 2px blur, never appear instantly."
Rule 8: Reveal height the right way. No fake expand tricks.
Animating expand/collapse with max-height: 9999px is jittery and times wrong. The clean modern technique is animating CSS grid rows:
css
.reveal { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .22s var(--ease-smooth); }
.reveal[data-open="true"] { grid-template-rows: 1fr; }
.reveal > * { overflow: hidden; }
It animates to the content's real height, perfectly smooth, no guesswork. For elements that move across the layout (a card flying into a different container), use the First → Last → Invert → Play technique (FLIP): measure where it starts, measure where it ends, jump it back to the start visually, then animate to the end. It looks impossibly smooth and it's just two position measurements.
Prompt it: "Use the grid-template-rows: 0fr to 1fr technique for expand/collapse, not a max-height hack. For the card moving between containers, use a FLIP (First-Last-Invert-Play) animation."
Rule 9: Respect performance and accessibility, or it's not polished.
Polish includes the people who prefer less motion. Every animation system I ship honors the reduced motion accessibility setting. Animations collapse to instant, decorative loops stop entirely.
And for smooth 60fps playback, favor the lightweight properties, movement and opacity, over heavy ones like shadow stacks and height reveals. Those heavier effects are worth it in small, deliberate moments; just don't animate them across long lists or large surfaces.
Prompt it: "Honor reduced motion preferences everywhere. Favor movement and fade for anything on long lists or large surfaces."
Rule 10: State-driven design is the actual job.
This is the one nobody tells you, and it's the most important. A component is not a picture. It's a system of states. A button isn't "a button," it's idle / hover / pressed / loading / disabled / success.
And here's the real insight: You might not know all the states you need until you start building it. The Figma concept always looks complete. Then you start building, you drag the thing, and you immediately feel the holes: "this needs a working state," "the number should roll, not swap," "this label should shimmer while busy," "the icon should cross-fade between play and pause." Those micro-interactions are discovered through use, never specced up front.
Examples that came straight out of building, not designing:
Numbers that roll digit-by-digit instead of hard-cutting.
A shimmer sweep across a label while a task is working.
Play/pause icons that cross-fade and scale between each other rather than swapping.
Prompt it: "While it's working, don't add a spinner. Let the label text itself glow softly, like a light slowly sweeping across the word from one side to the other and back, looping about every 2 seconds. It should feel calm and alive, not flashy."
Figma prep: Use component variants for the states you know. Then accept that the build will surface two or three more, and that's where the polish actually lives. This is the rule that separates a mockup from a product, so treat it as the mindset you carry into all nine above.
How to actually prompt for this
Give numbers, never adjectives. "Smooth" is meaningless; a specific curve at 280ms is buildable.
Lead with your design tokens. Paste the variable block first and forbid one-off values.
Think in states, then list them. The model builds exactly the states you name and no more.
Isolate when iterating. "Now only tune the shadow stack." "Now only the entrance." One variable at a time is how you reach polish without thrashing.
Describe the feeling and a reference. "Should feel like an iOS sheet: weighty, slightly springy, settles fast." Reference-anchored requests land far better than abstract ones.
Handing off from Figma? Name every property to copy. Point it at the current selection and list what to read off it: padding, gaps, tokens, colors, corner radius, type sizes and weights. Never assume the handoff tool carries it all over on its own perfectly.
