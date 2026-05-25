---
id: article-2026-05-25-uniswap-interface
type: source
title: "Uniswap Interface"
path: raw/articles/github-repos/2026-05-25-uniswap-interface.md
author: Uniswap Labs
publisher: GitHub
url: https://github.com/Uniswap/interface
date_published:
date_added: 2026-05-25
tags: [uniswap, frontend, ui-ux, design-system, web3, cross-platform, product-ux, github-repos]
status: active
quality: high
summary: Uniswap/interface is a large production frontend monorepo whose UI/UX strength comes from shared design primitives, cross-platform domain flows, typed transaction state, telemetry, feature gating, localization, and extensive visual/flow testing.
related: [ai-interface-design]
---

# Uniswap Interface

## Source Metadata

- Path: raw/articles/github-repos/2026-05-25-uniswap-interface.md
- Author: Uniswap Labs
- Published: Unknown
- Publisher: GitHub
- URL: https://github.com/Uniswap/interface
- Inspected revision: `b8dbf44f553afb0cd20f5cebe75421f5574f3109` on 2026-05-25.
- Code read: `README.md`, `package.json`, `nx.json`, `tsconfig.base.json`, `oxlint.config.ts`, `apps/web/src/**`, `apps/mobile/.maestro/**`, `packages/ui/src/**`, `packages/uniswap/src/**`, `packages/wallet/src/**`, and `packages/gating/src/**`, focusing on source organization, UI primitives, transaction flows, route metadata, testing, telemetry, feature flags, and localization.
- Verification attempted: source inspection only; tests were not run.

## TL;DR

Uniswap/interface is most useful as a reference for production-grade UI/UX organization, not just web3. The repo separates app shells (`apps/web`, `apps/mobile`, `apps/extension`) from shared product/domain packages (`packages/uniswap`, `packages/wallet`) and from a universal design-system package (`packages/ui`). Its strongest UI lesson is that polish is encoded as code contracts: typed tokens, constrained components, platform-specific implementations behind common interfaces, explicit transaction state, test IDs, localized copy, typed telemetry, feature-gated rollout, Storybook, Playwright, Anvil, snapshots, and mobile performance flows.

## Key Claims

- The repo is a "universe" monorepo: standalone apps live under `apps/`, reusable product and infrastructure code lives under `packages/`, and Nx/Bun coordinate build, lint, typecheck, test, Storybook, and e2e workflows.
- `packages/ui` is the UI/UX foundation. It owns tokens, themes, typography, spacing, icon sizes, radii, animation presets, layout primitives, buttons, text, segmented controls, touchables, modals, tooltips, loaders, icons, and universal image handling.
- `packages/uniswap` is the shared product layer. It owns cross-app domain components and flows such as token selectors, currency inputs, transaction modals, swap form/review, warnings, network controls, activity details, wallet/account surfaces, settings, i18n, telemetry, and data clients.
- `apps/web` is a web shell plus web-specific pages, routes, provider composition, state updaters, Playwright fixtures, web theme bridging, and product-specific page composition.
- `apps/mobile` and `apps/extension` reuse shared UI/domain layers but own platform shells, native folders, extension entrypoints, local stores, and e2e harnesses.
- Platform splits use `.web.tsx`, `.native.tsx`, and stub files so one feature can preserve shared semantics while rendering differently on web, native, and extension surfaces.
- The design system enforces more than visual tokens. `Button`, `TouchableArea`, `Text`, `SegmentedControl`, and `DynamicSizeText` encode interaction states, loading states, accessibility semantics, hit slop, hover/press/focus behavior, and text-fitting behavior.
- High-stakes UX flows are not ad hoc component state. Swap is modeled through providers, scoped Zustand stores, transaction modal context, form/review screens, active plans, warnings, submit state, timers, and cleanup hooks.
- Routing is treated as product metadata. Web route definitions combine enabled gates, page components, nested paths, static SEO titles/descriptions, redirects, and lazy-loading decisions.
- Feature flags are first-class product architecture. They gate new chains, swap behaviors, wallet surfaces, portfolio tabs, liquidity revamps, pricing, fees, session infrastructure, and experimental UI.
- Telemetry is typed and structural. Trace context carries page/screen/section/modal/element fields, and event payload types encode product-specific analytics data.
- UX quality is guarded by multiple test surfaces: Vitest/JSDOM and snapshots, Playwright e2e, Anvil blockchain-backed e2e, Storybook/Chromatic-oriented component review, TestID enum discipline, and Maestro mobile performance flows.

## Important Details

- `README.md` identifies the public repo as Uniswap Labs' frontend interfaces for the Web App, Wallet Mobile App, and Wallet Extension, with `apps/`, `config/`, and `packages/` as the top-level structure.
- Root `package.json` names the workspace `universe`, uses Bun and Nx, and exposes shortcuts for app/package workspaces such as `web`, `mobile`, `extension`, `ui`, `uniswap`, `wallet`, and infrastructure packages.
- `nx.json` defines cached targets for build, format, lint, typecheck, dependency checks, tests, snapshots, Storybook, GraphQL generation, and production builds across the workspace.
- `tsconfig.base.json` maps package aliases including `ui/*`, `uniswap/*`, `wallet/*`, `utilities/*`, and multiple `@universe/*` packages, keeping shared code importable without long relative paths.
- `oxlint.config.ts` acts as architecture governance: it blocks deep package imports, direct SVG imports, deprecated styled-components use in web source, direct Playwright imports outside fixtures, raw safe-area hooks, and several root barrels that cause circular imports.
- `packages/ui/src/theme/tokens.ts` builds Tamagui tokens from colors, spacing, fonts, icons, image sizes, z-indexes, and radii, and includes dev-time validation for color values.
- `packages/ui/src/theme/config.ts` uses strict-ish Tamagui settings (`onlyAllowShorthands`, token autocomplete, strict web values in the base config), while `apps/web/src/tamagui.config.ts` loosens web-specific CSS values.
- `packages/ui/src/theme/fonts.ts` handles platform-specific Basel font naming, font weights, line heights, max font-size multipliers, and font families. This is the kind of detail that makes a cross-platform design system feel intentional.
- `packages/ui/src/components/buttons/Button/*` turns button design into a small grammar: `variant` (`default`, `branded`, `critical`, `warning`), `emphasis` (`primary`, `secondary`, `tertiary`, `text-only`), size, icon position, loading, disabled, and focus-scaling.
- `packages/ui/src/components/touchable/TouchableArea/TouchableArea.tsx` separates generic pressable areas from standard buttons, handles hit slop and minimum dimensions, injects hover colors on web, and has platform-specific blur behavior.
- `packages/ui/src/components/text/Text.tsx` centralizes text variants, accessible loading placeholders, skeleton wrapping, heading tags, line-height exceptions for Vietnamese, and font scaling controls.
- `packages/ui/src/components/text/DynamicSizeText/DynamicSizeText.web.tsx` uses canvas measurement, ResizeObserver, and binary search to fit long numeric text inside available width.
- `packages/ui/src/components/SegmentedControl/SegmentedControl.tsx` encodes option limits, sizes, roving indicator animation, disabled state, active/hover text color, and optional link semantics when tabs sync to URLs.
- `apps/web/src/pages/RouteDefinitions.tsx` registers pages with enabled conditions, lazy-loaded components, route redirects, static titles/descriptions, nested paths, and feature-gated routes.
- `apps/web/src/pages/App.tsx` wraps the app in an error boundary, dynamic/static meta tags, trace context, page-scroll reset, portfolio-chain reset, theme logic, and layout override handling.
- `apps/web/src/index.tsx` composes providers for Redux, query persistence, router, Privy, i18n, language, Web3/wagmi, Statsig, wallet capabilities, external wallet connection, account store, Uniswap context, prices, GraphQL, live prices, localization, block numbers, theme, Tamagui, portals, notifications, and app updaters.
- `apps/web/src/pages/Swap/index.tsx` turns `/swap`, `/limit`, `/buy`, `/sell`, and `/send` into one coordinated surface with segmented tabs, URL sync, deferred components, passkey status, embedded-wallet nudges, and shared swap providers.
- `packages/uniswap/src/features/transactions/swap/SwapFlow/SwapFlow.tsx` wraps swap in a `TransactionModal`, re-provides stores across portal boundaries, tracks manual timing, and cleans up active plans when closing.
- `packages/uniswap/src/features/transactions/swap/form/SwapFormScreen/SwapFormScreen.tsx` composes the form from input panel, switch button, output panel, details, decimal pad, settings, and token selector, while filtering settings by platform and trade routing.
- `packages/uniswap/src/features/transactions/swap/review/SwapReviewScreen/SwapReviewScreen.tsx` treats review as its own provider stack and explicitly handles loading, missing params, submission errors, warnings, progress steps, wrap details, swap details, and footer.
- `packages/uniswap/src/features/transactions/components/TransactionModal/TransactionModal.web.tsx` and `.native.tsx` share context but adapt rendering: web uses flex/modal composition, native uses bottom sheet, insets, dynamic sizing, keyboard/footer behavior, gradients, and animated border radii.
- `packages/uniswap/src/features/transactions/swap/stores/swapFormStore/*` uses scoped Zustand stores plus derived swap info, freeze-while-submitting behavior, debounced amount calculations, prefilled URL state, max spend, analytics, and Redux side effects.
- `packages/gating/src/flags.ts` centralizes shared/web/wallet feature flag enums and Statsig gate-name mappings; `packages/gating/src/hooks.ts` exposes typed hooks and getters with fallbacks.
- `packages/uniswap/src/features/telemetry/*` wraps typed trace context, typed analytics dispatch, product event enums, and product-specific event payload types.
- `i18next-parser.config.js` extracts translation keys from all app and package TypeScript/TSX files into the source locale file; `packages/uniswap/src/i18n/locales/translations/` contains many locale files.
- `apps/web/playwright.config.ts` configures web e2e with CI retries, trace/video retention on failure, Chromium, localhost base URL, and platform-specific module resolution.
- `apps/web/src/playwright/fixtures/index.ts` merges GraphQL, amplitude, trading API, data API, and optional Anvil fixtures so e2e tests run with realistic but controlled dependencies.
- `apps/mobile/.maestro/flows/swap/swap-base.yaml` captures an actual mobile swap journey with action-level performance tracking and Datadog upload.

## Entities

- Repository: `Uniswap/interface`
- Organization: Uniswap Labs
- Workspace name: `universe`
- Apps: `apps/web`, `apps/mobile`, `apps/extension`
- Shared product packages: `packages/uniswap`, `packages/wallet`
- Design system package: `packages/ui`
- Infrastructure packages: `packages/gating`, `packages/environment`, `packages/api`, `packages/chains`, `packages/sessions`, `packages/react-query`, `packages/logger`, `packages/utilities`
- UI libraries and tooling: React, React Native, React Native Web, Tamagui, styled-components during migration, Vite, Nx, Bun, Storybook, Playwright, Vitest, Maestro, Anvil
- Product surfaces: swap, limit, buy, sell, send, liquidity, portfolio, explore, token details, pool details, wallet modal, account drawer, notifications
- UX systems: tokens, themes, typography, icons, layout, buttons, touchables, modals/sheets, settings, warnings, skeletons, telemetry, feature flags, localization, e2e fixtures

## My Notes

- The main lesson is that 10/10 UI/UX does not live only in component appearance. It lives in a source tree that makes good product behavior the easy path.
- Uniswap's design system is intentionally small at the callsite but deep internally: product engineers mostly reach for `Flex`, `Text`, `Button`, `TouchableArea`, `SegmentedControl`, tokens, and shared domain components, while the package absorbs platform quirks, focus, hover, hit targets, loading, and typography.
- The repo keeps a useful split between "universal product semantics" and "platform-specific presentation." Transaction modal context is shared, but native and web render through different bottom-sheet/modal implementations.
- The swap flow shows that a flagship UX needs an explicit state architecture. Form state, derived quote state, review state, warnings, transaction steps, active plans, timers, settings, and cleanup all have named homes.
- Routing, SEO metadata, redirects, and feature gates sit beside page definitions. That keeps navigation behavior reviewable instead of scattered across components and effects.
- The testing stack is product-shaped: ordinary component tests are not enough for a crypto interface. They also test URL prefill, token selector behavior, chain support, wallet connection, Anvil-backed transaction flows, and mobile journey performance.
- Lint rules are part of UI quality. Restricting deep imports, raw SVG imports, direct Playwright imports, deprecated style layers, and circular-prone barrels prevents architectural drift that would later show up as inconsistent UI.
- The most portable design lesson for AI-generated apps is to encode UX standards as reusable primitives and forbidden paths, not only as prose design guidelines.

## Open Questions

- How much of Uniswap's current complexity is unavoidable product depth versus migration cost from older web-only layers?
- Which parts of `packages/uniswap` should remain domain-specific, and which could be promoted into a more generic fintech/product-operation UI kit?
- How should teams decide when a universal cross-platform component is worth the abstraction cost versus separate native and web implementations?
- Could the KB benefit from a dedicated concept page for "frontend source architecture for product UX" separate from `[[ai-interface-design]]`?

## Related

- [[ai-interface-design]]
- [[2026-05-25-uniswap-interface-ui-ux-source-teardown]]

## Source Text

Selected source text and code anchors inspected:

- `README.md`: the repo is for Uniswap Labs' front-end interfaces, including the Web App, Wallet Mobile App, and Wallet Extension.
- `README.md`: top-level structure is `apps/`, `config/`, and `packages/`.
- `package.json`: workspace name is `universe`; scripts route global and package-specific tasks through Bun and Nx.
- `package.json`: workspaces include `apps/*`, `packages/*`, `config/*`, `tools/uniswap-nx`, and `labs/*`.
- `nx.json`: target defaults encode cached build, lint, typecheck, test, snapshot, Storybook, and GraphQL-generation workflows.
- `tsconfig.base.json`: package aliases include `ui/*`, `uniswap/*`, `wallet/*`, `utilities/*`, and many `@universe/*` packages.
- `oxlint.config.ts`: web source blocks direct `styled-components` imports and points developers toward `Flex` or `styled` from `ui/src`.
- `oxlint.config.ts`: e2e tests must import Playwright through fixtures, and `getByTestId` calls must use the `TestID` enum.
- `packages/ui/src/theme/tokens.ts`: Tamagui tokens are generated from color, space, size, font, icon, image, z-index, and radius values.
- `packages/ui/src/theme/config.ts`: the base Tamagui config only allows shorthands and uses somewhat strict web style values.
- `packages/ui/src/theme/fonts.ts`: platform-specific font names, weights, line heights, and max font-size multipliers are encoded in one place.
- `packages/ui/src/components/buttons/Button/types.ts`: buttons are typed through variant, emphasis, size, loading, disabled, and icon props.
- `packages/ui/src/components/buttons/Button/components/CustomButtonFrame/variantEmphasisHash.ts`: button states are a matrix of default/branded/critical/warning and primary/secondary/tertiary/text-only.
- `packages/ui/src/components/touchable/TouchableArea/TouchableArea.tsx`: standard buttons should use `Button`, while generic pressable regions use `TouchableArea` with hit slop, minimum dimensions, hover, press, and platform behavior.
- `packages/ui/src/components/text/Text.tsx`: text variants, skeleton loading placeholders, heading tags, Vietnamese line-height handling, and font scaling are centralized.
- `packages/ui/src/components/text/DynamicSizeText/DynamicSizeText.web.tsx`: text fitting uses canvas measurement and ResizeObserver.
- `packages/ui/src/components/SegmentedControl/SegmentedControl.tsx`: segmented controls require 2-6 options and support optional `href` for link semantics.
- `apps/web/src/pages/RouteDefinitions.tsx`: route definitions include path, nested paths, title, description, enabled predicate, and element factory.
- `apps/web/src/pages/RouteDefinitions.tsx`: high-traffic routes such as index and `/swap` are not lazy-loaded.
- `apps/web/src/index.tsx`: the root app composes providers for router, Redux, query persistence, Privy, i18n, Web3, Statsig, accounts, prices, GraphQL, localization, block numbers, theme, Tamagui, portals, notifications, and updaters.
- `apps/web/src/pages/Swap/index.tsx`: swap tabs map `/swap`, `/limit`, `/buy`, and `/sell` to one surface with labels, URL sync, analytics, and deferred components.
- `packages/uniswap/src/features/transactions/swap/SwapFlow/SwapFlow.tsx`: swap re-provides stores across portals and tracks manual timing.
- `packages/uniswap/src/features/transactions/swap/form/SwapFormScreen/SwapFormScreen.tsx`: swap form content is input, switch, output, details, and decimal pad, with settings and token selector around it.
- `packages/uniswap/src/features/transactions/swap/review/SwapReviewScreen/SwapReviewScreen.tsx`: review distinguishes loading, missing params, submission error, warning modal, progress steps, wrap details, swap details, and footer.
- `packages/uniswap/src/features/transactions/components/TransactionModal/TransactionModal.web.tsx`: web transaction modal keeps shared context but uses web flex/modal presentation.
- `packages/uniswap/src/features/transactions/components/TransactionModal/TransactionModal.native.tsx`: native transaction modal uses bottom sheet, insets, keyboard-aware footer, gradient background, and animated radius behavior.
- `packages/uniswap/src/features/transactions/swap/stores/swapFormStore/createSwapFormStore.ts`: form state is a scoped Zustand store with initial state, actions, derived info, subscriptions, and cleanup.
- `packages/gating/src/flags.ts`: feature flags are centralized and mapped to Statsig gate names for shared, web, and wallet clients.
- `packages/uniswap/src/features/telemetry/Trace.tsx`: trace context is typed around page, screen, section, modal, and element.
- `apps/web/playwright.config.ts`: e2e tests use CI retries, traces and videos on failure, and localhost base URL.
- `apps/mobile/.maestro/flows/swap/swap-base.yaml`: the mobile swap flow tracks interaction phases and uploads performance metrics.
