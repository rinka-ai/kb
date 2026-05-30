---
id: summary-2026-05-30-component-theme-source-library
type: summary
title: Component And Theme Source Library
tags: [design-system, component-library, themes, frontend, tailwind, shadcn, radix, accessibility, ai-ui, blueprint]
summary: A retrieve-before-you-build source map for improving AI-built apps with curated style references, reusable component systems, licensed Tailwind recipes, and mature public design systems without copying brands or mixing incompatible UI vocabularies.
source_count: 1
canonical_for: [component source library, theme source library, world class components, UI references for agents, Refero Styles, shadcn themes, Radix components, Tailwind UI, Catalyst, design system references]
review_status: reviewed
last_reviewed: 2026-05-30
review_due: 2026-08-30
confidence: "0.8"
---

# Component And Theme Source Library

## Summary

This page is the retrieval companion to [[2026-05-30-app-template-design-system-blueprint]]. Use it when a future agent is about to build a new app, page, dashboard, mobile-responsive surface, or component set and needs better starting taste than a blank Tailwind/shadcn default.

The rule: **choose a source lane before implementation**. Refero Styles gives the agent visual direction and DESIGN.md-style constraints. shadcn/ui, Radix, Tailwind Plus/Catalyst, and mature public design systems give implementation or calibration sources. Everything still maps back into the local token contract, component set, interaction-state grammar, accessibility baseline, and verification workflow.

## Source Lanes

| Lane | Use For | Primary Sources | Copy Policy |
|---|---|---|---|
| Taste / visual reference | Mood, density, typography, color direction, component weight, page rhythm | Refero Styles | Use as context and prompt material. Do not clone brands, screenshots, or proprietary visual systems. |
| Open-code component scaffold | Editable React/Tailwind components, app shells, dashboards, forms, registries | shadcn/ui docs, theming, blocks, registry | Good implementation lane when the project chooses shadcn. Map tokens into local roles and prune generated blocks. |
| Third-party shadcn themes/blocks | Non-default palettes, extra app blocks, faster visual exploration | shadcn.io themes, Shadcnblocks themes, Origin UI-style component collections | Unofficial sources. Verify license, accessibility, maintenance, and brand safety before copying. |
| Headless behavior primitives | Accessible dialogs, menus, tabs, selects, popovers, tooltips, sliders, switches | Radix Primitives | Prefer over hand-rolled ARIA for hard controls when custom styling is needed. |
| Pre-styled component system | Fast consistent app UI with an owned Theme provider | Radix Themes | Use when adopting Radix's component and theme vocabulary is acceptable. Avoid mixing with another styled system. |
| Tailwind production recipes | Application shells, marketing sections, ecommerce, forms, tables, dialogs, auth layouts | Tailwind Plus UI Blocks, Catalyst | Licensed/commercial lane. Copy only when the project has rights; otherwise use as structural inspiration. |
| Enterprise/product calibration | Dense product UI, tokens, accessibility, data surfaces, admin shells, content rules | Carbon, Primer, Polaris, Atlassian | Use as quality calibration and pattern reference, not as brand skins. |
| Government/service calibration | Forms, validation, service tasks, task lists, accessibility, plain-language content | GOV.UK Design System, USWDS | Use for serious service flows where clarity beats novelty. |
| Platform interaction calibration | Touch, hierarchy, motion, navigation, controls, input behavior | Apple HIG, Material Design | Use for platform expectations. Do not force iOS/Android visuals onto unrelated web apps. |

## Decision Rules

- Pick **one implementation lane** per app surface: shadcn/open-code, Radix headless + local styling, Radix Themes, or a licensed Tailwind kit.
- Pick **one token vocabulary** and translate all sources into it. External tokens should become local semantic roles such as `--surface`, `--text-muted`, `--accent`, `--danger-soft`, `--row-hover`, and `--focus-ring`.
- Use Refero before prompting when taste matters. Choose the closest product category first: operational SaaS, devtool, fintech/trust, ecommerce, editorial, agency/portfolio, AI startup, or dark-mode tool.
- Do not mix styled systems in one screen. A shadcn table, Radix Theme dialog, Tailwind Plus sidebar, and Carbon-style form will usually feel stitched together.
- Copy code only when license and project policy allow it. Tailwind Plus/Catalyst are especially license-sensitive; brand systems may also restrict brand assets, icons, names, or exact visual identity.
- Treat third-party theme galleries as exploration tools. A theme is only production-ready after contrast, dark mode, state colors, focus rings, brand fit, and licensing pass review.
- Prefer headless primitives for complex behavior. Dialogs, menus, listboxes, comboboxes, tabs, selects, tooltips, popovers, and sliders are where accessibility bugs hide.
- Treat public systems as calibration, not costumes. Carbon, Primer, Polaris, Atlassian, GOV.UK, USWDS, Apple, and Material should sharpen choices around hierarchy, state, forms, tables, motion, touch, and content.
- Verify every imported or inspired component against the local quality bar: states, focus, keyboard behavior, dark mode, responsive layout, loading/empty/error, reduced motion, and screenshot review.

## Agent Prompt Add-On

Add this to future app/feature prompts after retrieving the Aya/Conformis blueprint:

```text
Before building UI, choose a source lane from `wiki/summaries/2026-05-30-component-theme-source-library.md`.

Use Refero Styles only as visual/DESIGN.md context. Choose one implementation lane: shadcn/open-code, Radix headless + local styling, Radix Themes, or a licensed Tailwind kit. Do not mix multiple styled component systems.

Map every borrowed pattern into the local token contract and component grammar from `wiki/summaries/2026-05-30-app-template-design-system-blueprint.md`. Verify license before copying code, tokens, blocks, icons, or brand assets. Ship full states, keyboard/focus behavior, dark mode, responsive behavior, loading/empty/error states, and Playwright screenshot verification.
```

## Practical Defaults

- **New serious web app/dashboard:** Aya/Conformis blueprint + shadcn/ui or Radix Primitives + local tokens. Use Refero for taste and Primer/Carbon/Polaris/Atlassian for product-system calibration.
- **Fast polished prototype:** shadcn/ui blocks, a vetted third-party shadcn theme, or Radix Themes, then prune and re-tokenize. Add real empty/loading/error states before showing it as product work.
- **Licensed Tailwind build:** Catalyst for app UI and Tailwind Plus for marketing/application recipes, with explicit license verification.
- **High-accessibility service flow:** GOV.UK or USWDS as the first calibration source, with local brand restrained until forms and validation are excellent.
- **Mobile-heavy app:** Apple HIG and Material for touch, navigation, hierarchy, and motion expectations; still implement in the local web stack unless building native.

## Integration With The App Blueprint

The source library answers **where to borrow from**. The app blueprint answers **how to turn that borrowing into our system**.

When a future app points to `desktop/ai-research`, retrieve both pages:

1. [[2026-05-30-app-template-design-system-blueprint]] for stack, tokens, component set, interaction states, data routing, accessibility, and verification.
2. [[2026-05-30-component-theme-source-library]] for Refero/style references, implementation lanes, component/theme sources, and license-aware borrowing rules.

That combination should produce better first drafts because the agent no longer starts from a vague aesthetic prompt. It starts from local architecture plus external taste and component priors.

## Anti-Patterns

- Starting from a screenshot or moodboard without mapping it into tokens and components.
- Copying a commercial or brand-specific component because it looks good.
- Combining several styled systems on one screen.
- Letting shadcn defaults become the product identity without a deliberate theme pass.
- Using Refero as decoration after the layout is built, instead of context before the first draft.
- Treating Apple/Material/Carbon/Polaris as skins rather than interaction-quality references.
- Importing blocks without deleting irrelevant content, demo data, fake charts, and decorative cards.

## Source Notes

- [[2026-05-30-refero-component-theme-source-library]]
- [[2026-05-30-app-template-design-system-blueprint]]

## Related

- [[ai-interface-design]]
- [[codebase-architecture]]
- [[internal-engineering-conventions]]
- [[repo-local-knowledge-bases]]
