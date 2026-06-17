---
id: article-2026-06-17-apple-human-interface-guidelines
type: source
title: "Apple Human Interface Guidelines"
path: raw/articles/design-systems/2026-06-17-apple-human-interface-guidelines.md
author: Apple
publisher: Apple Developer Documentation
url: https://developer.apple.com/design/human-interface-guidelines/
date_published:
date_added: 2026-06-17
tags: [design-system, platform-design, apple, hig, accessibility, motion-design, typography, layout, components, interaction-design, ai-ui]
status: active
quality: high
summary: "Apple's Human Interface Guidelines are best used in this KB as platform-interaction calibration: accessibility, layout, typography, motion, navigation, system components, inputs, symbols, and platform conventions for iOS, iPadOS, macOS, watchOS, tvOS, and visionOS, not as a visual skin for unrelated web apps."
related: [ai-interface-design, 2026-05-30-component-theme-source-library, 2026-05-30-app-template-design-system-blueprint]
---

# Apple Human Interface Guidelines

## Source Metadata

- Path: raw/articles/design-systems/2026-06-17-apple-human-interface-guidelines.md
- Author: Apple
- Published: Unknown / living documentation
- Publisher: Apple Developer Documentation
- URL: https://developer.apple.com/design/human-interface-guidelines/
- Additional official URLs reviewed:
  - Foundations: https://developer.apple.com/design/human-interface-guidelines/foundations
  - Design principles: https://developer.apple.com/design/human-interface-guidelines/design-principles
  - Accessibility: https://developer.apple.com/design/human-interface-guidelines/accessibility
  - Layout: https://developer.apple.com/design/human-interface-guidelines/layout
  - Typography: https://developer.apple.com/design/human-interface-guidelines/typography
  - Motion: https://developer.apple.com/design/human-interface-guidelines/motion
  - Components: https://developer.apple.com/design/human-interface-guidelines/components
  - Patterns: https://developer.apple.com/design/human-interface-guidelines/patterns
  - Designing for iOS: https://developer.apple.com/design/human-interface-guidelines/designing-for-ios
  - Designing for macOS: https://developer.apple.com/design/human-interface-guidelines/designing-for-macos
  - Designing for watchOS: https://developer.apple.com/design/human-interface-guidelines/designing-for-watchos
  - Materials: https://developer.apple.com/design/human-interface-guidelines/materials
  - SF Symbols: https://developer.apple.com/design/human-interface-guidelines/sf-symbols
- Date reviewed: 2026-06-17
- Verification attempted: official Apple Developer URLs and search-result snippets. The Apple documentation pages require JavaScript in a plain text fetch, so this note preserves source metadata and synthesis rather than copied page text.
- Copyright/licensing note: do not copy Apple HIG prose, screenshots, symbols, assets, or platform branding into local app work. Use the official docs as calibration and verify current terms before implementing Apple-specific assets or platform conventions.

## TL;DR

Apple HIG is useful to this KB as a platform-expectation source. It helps future agents calibrate touch, hierarchy, navigation, motion, typography, accessibility, component behavior, symbols, and platform-specific interaction defaults. It should not be used to make general web dashboards "look like Apple"; it should shape decisions when the product is native Apple, mobile-heavy, touch-heavy, or intentionally borrowing platform behavior.

## Key Claims

- Apple HIG provides guidance and best practices for designing experiences across Apple platforms.
- The durable value for this KB is platform fluency: know what users expect from iOS, iPadOS, macOS, watchOS, tvOS, and visionOS before inventing controls or navigation.
- Accessibility is a first-class design constraint rather than an afterthought; interfaces should work across assistive technologies, visual abilities, motor abilities, language directions, and cognitive contexts.
- Layout grounds people in content and establishes familiar relationships between controls and content.
- Typography is not decoration; it supports legibility, hierarchy, meaning, and brand expression.
- Motion should reinforce continuity, state, orientation, and feedback rather than becoming decorative activity.
- System-defined components and patterns help users transfer existing knowledge across apps.
- Symbols, materials, navigation, controls, inputs, and platform patterns should be used consistently with the platform, not mixed arbitrarily into non-Apple web UI.

## Important Details

- Treat Apple HIG as a calibration source in the same lane as Material Design: it teaches interaction quality, hierarchy, touch behavior, platform navigation, and motion expectations.
- Use Apple HIG strongly when building native Apple apps, iOS-style mobile flows, touch-first controls, sheets, menus, tab bars, split views, input flows, and platform-specific settings/preferences.
- Use Apple HIG lightly when building web SaaS, admin tools, dashboards, and developer consoles. Borrow principles, not surfaces.
- HIG should influence component behavior before visual styling: focus order, affordance, target size, gesture alternatives, state feedback, keyboard and pointer behavior, and readable hierarchy matter more than translucent materials or iOS-like chrome.
- The Apple source strengthens the KB's "do not mix systems" rule. A Carbon table, shadcn form, Apple sheet, and Material navigation rail in one screen will usually feel incoherent unless translated into one local token/component grammar.
- For AI-built UI, Apple HIG is especially useful for avoiding generic model defaults around mobile navigation, input modality, spatial hierarchy, and motion.

## Entities

- Organization: Apple
- Source: Apple Human Interface Guidelines
- Platforms: iOS, iPadOS, macOS, watchOS, tvOS, visionOS
- Topics: accessibility, layout, typography, motion, components, patterns, materials, SF Symbols, navigation, controls, inputs, platform adaptation
- Local KB anchors: AI Interface Design, App Template And Design-System Blueprint, Component And Theme Source Library

## My Notes

- This source should be kept as an official reference note rather than a copied archive. Apple documentation is living, JS-rendered, and asset-heavy; the local KB should preserve the durable design rules and point agents back to current official pages.
- The main lesson for agentic UI work is that platform conventions are context. A model asked to build a mobile or native-feeling UI should be told which platform expectations matter before it chooses controls.
- Apple HIG complements [[2026-06-17-carbon-design-system]]: Apple is strongest for platform behavior and user expectations; Carbon is strongest for enterprise design-system completeness, tokens, accessibility, and structured AI/MCP access.
- For future app prompts, retrieve HIG when the requested interface involves mobile-first behavior, native app idioms, gestures, touch targets, motion continuity, or Apple-platform deliverables.

## Open Questions

- Should this KB eventually split Apple HIG into separate iOS/macOS/visionOS calibration notes if native app work becomes common?
- Which HIG rules should become hard checks in future UI review prompts, especially around accessibility, target size, motion, and keyboard alternatives?
- How should agents translate Apple platform conventions into web components without copying Apple branding or creating mismatched platform cosplay?

## Related

- [[ai-interface-design]]
- [[2026-05-30-component-theme-source-library]]
- [[2026-05-30-app-template-design-system-blueprint]]
- [[2026-06-17-carbon-design-system]]

## Source Text

Not copied locally. Use the official Apple Developer URLs above for current source text, assets, and platform-specific requirements.
