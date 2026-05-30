---
id: article-2026-05-30-aya-conformis-app-template-design-system
type: source
title: "Aya + Conformis App Template And Design System"
path: raw/articles/internal-codebases/2026-05-30-aya-conformis-app-template-design-system.md
author: AYA Labs, Conformis
publisher: Local repositories
url:
date_published:
date_added: 2026-05-30
tags: [internal-codebases, design-system, design-tokens, app-template, frontend, nextjs, react, tailwind, react-query, accessibility, aya, conformis]
status: active
quality: high
summary: "Two internal Next.js 16 / React 19 web apps converge on a reusable app-starting default: token-first CSS custom-property design systems, a small role-driven UI component set, server-seed + React Query data routing, theme/locale switching, and accessibility/motion/state-grammar rules that future apps and features can inherit."
related: [ai-interface-design, codebase-architecture, internal-engineering-conventions, repo-local-knowledge-bases]
---

# Aya + Conformis App Template And Design System

## Source Metadata

- Path: raw/articles/internal-codebases/2026-05-30-aya-conformis-app-template-design-system.md
- Author: AYA Labs (Aya), Conformis (Conformis)
- Published: Unknown
- Publisher: Local repositories
- URL:
- Local repos inspected: `/Users/josemanuelcerqueira/Desktop/aya` and `/Users/josemanuelcerqueira/Desktop/conformis`, on 2026-05-30.
- Working tree note: this note records durable frontend/template/design-system lessons for reuse, not a clean-release snapshot; it does not modify either repo.
- Aya files read: `apps/web/package.json`, `docs/DESIGN.md`, `docs/WEB_DATA_ROUTING.md`, `apps/web/src/app/tokens.css`, `apps/web/src/app/globals.css`, `apps/web/src/lib/ui/controls.ts`, and representative components `apps/web/src/components/ui/{button,field,badge,status-pill,card,tabs}.tsx`, `apps/web/src/components/{workbench-shell,empty-state,theme-provider,language-switcher}.tsx`.
- Conformis files read: `apps/web/package.json`, `apps/web/src/app/globals.css` (token surface + shell rules), `apps/web/src/app/_components/{app-shell,app-sidebar,app-topbar,theme-toggle,locale-switcher,query-provider}.tsx` (listing + app-shell.tsx), `apps/web/src/theme/theme.ts`, and vault pages `conformis-knowledge/design/{principles,tokens}.md`, `conformis-knowledge/design/patterns/operational-surfaces.md`, `conformis-knowledge/codebase/stack.md`.
- Explicitly excluded: `.env`, `.env.*`, `accounts.json`, secret values, `node_modules`, `.next`, `.turbo`, generated caches, and full private source dumps. No proprietary product copy or large code blocks copied.
- Verification attempted: source inspection only; apps were not built or run, and no screenshots were taken.

## TL;DR

Aya and Conformis are two different internal products (a Portuguese real-estate voice receptionist and a GRC/audit platform) that independently converged on the same frontend starting defaults: a Next.js 16 / React 19 web app, a token-first design system expressed entirely in CSS custom properties, a small role-driven component set, server-rendered seed plus React Query for data, cookie/localStorage theme switching with an SSR-stable default, and a shared discipline around accessibility, motion, density, and complete interaction states. The reusable artifact is not either product's visual identity — it is the shared scaffold: pick pinned dependencies, define semantic role tokens before pixels, ship a minimum component set with a full state grammar, route data through a server seed plus a client cache, and treat empty/loading/error states, accessibility, and anti-aesthetic guardrails as part of "done."

## Key Claims

- Both web apps run Next.js 16 + React 19 with `@tanstack/react-query@5.100.9` and `lucide-react@1.14.0` pinned to identical versions, signalling a workspace-standard frontend baseline rather than per-project drift.
- Both use a Bun-based Turborepo monorepo; Aya's package manager is Bun, Conformis' is pnpm 9.15.4. App vs server vs shared-package separation is shared.
- Both express the entire design system as CSS custom properties: color, spacing, radius, shadow/elevation, motion, and typography are tokens, and components read role tokens (`--color-accent`, `--surface`, `--text-muted`) rather than raw hex.
- Theme switching is a role remap on a root attribute (`[data-theme="dark"]`), never a second component system. Typography, spacing, radius, density, and motion stay invariant across themes so switching never reflows layout.
- Aya ships exactly two themes (Light default, Dark opt-in), persisted per-operator-per-tenant in `localStorage`, with only a constrained set of tokens allowed to differ between themes.
- Conformis ships three theme preferences (`system`/`light`/`dark`) persisted in a cookie, with `system` resolving to `light` on the server so SSR renders a stable surface before the client flips to the OS choice.
- Aya uses Tailwind v4 CSS-first: `@import "tailwindcss"` plus an `@theme` block maps the published tokens into Tailwind utility names. Conformis hand-authors `globals.css` with semantic class names and no Tailwind. Both are token-first; the utility layer is a choice, not the system.
- Color discipline differs but rhymes: Aya budgets one accent per screen inside a painterly multi-hue palette; Conformis is neutral-first with a single electric-blue accent. Both forbid spending the accent on decoration, and both define semantic state colors (success/warning/danger-error/info) as soft/border/ink/solid quadruplets used only for state.
- Both ship the same minimum component set: Button (primary/secondary/ghost/danger/icon), Field/Input (label + help + error + adornments), Select, Card/Panel, Badge/Chip, StatusPill, Tabs, EmptyState, DataTable/List, Dialog/Drawer/Sheet, AppShell with collapsible Sidebar + Topbar + mobile nav, ThemeToggle, and LocaleSwitcher.
- Both encode an explicit interaction-state grammar: every interactive control defines default, hover, active/pressed, focus-visible, selected, open, disabled, loading, and error states, and state is never conveyed by color alone.
- Focus treatment is component-specific: fields use a hairline border + 0.5px inset ring, rows use a 1px inset ring, buttons/controls use a contained focus ring. Icon-only controls keep accessible names and visible focus.
- Density is a single variable: Aya makes row height the only thing that changes between compact/default/comfortable, holding padding, font, and icon sizes fixed so tables never reflow.
- Data routing is a contract, not a default: Aya's `WEB_DATA_ROUTING.md` mandates a server-rendered seed for first paint, then React Query owning reads/mutations/refresh, with `router.refresh()` reserved for global server-context changes (auth, locale). Conformis uses the same `@tanstack/react-query` provider plus a query-provider wrapper.
- Tables ship designed loading (skeletons mirroring final columns), empty, filtered-empty, and error states; skeletons must not cause a layout jump when real data arrives.
- Frontend-safe constants stay free of runtime validators (Zod): Aya imports zod-free constants from `@aya/types/constants`; Conformis splits zod-free `@conformis/contracts` from Zod-backed `@conformis/validation`.
- Accessibility is a baseline rule set in both: WCAG AA contrast, visible focus on all interactive elements, semantic HTML before ARIA, state never by color alone, polite live regions for non-focus-changing confirmations, and minimum touch targets (Aya ≥44px, Conformis ≥40px).
- Motion is short and physical (roughly 80–320ms), used only to clarify state, always guarded by `prefers-reduced-motion: reduce`, with no parallax/bounce/decorative loops.
- Both share an explicit anti-aesthetic: no generic blue SaaS palettes, purple AI gradients, glassmorphism, decorative blobs/orbs, pill-heavy toy UI, or card-heavy dashboards where tables/lists are clearer.

## Important Details

- Aya `apps/web/package.json`: `next@16.2.4`, `react@19.2.5`, `@tanstack/react-query@5.100.9`, `lucide-react@1.14.0`, `clsx`, `tailwind-merge`, `sonner` (toasts), `server-only`; dev deps `tailwindcss@4.2.4` + `@tailwindcss/postcss`. Scripts include `check:data-routing` and `check:design-tokens` guard scripts and `lint` via `biome check`.
- Conformis `apps/web/package.json`: `next@16.2.6`, `react@19.2.4`, `@tanstack/react-query@5.100.9`, `lucide-react@1.14.0`, `@workos-inc/authkit-nextjs`, `react-loading-skeleton`; lint via `eslint` + `eslint-config-next`; `test:e2e` via Playwright; smoke tests via `bun test`.
- Aya token files: `apps/web/src/app/tokens.css` publishes raw values for light/dark; `globals.css` maps them into Tailwind `@theme` variables and defines the full role vocabulary — surfaces, ink, accent, state triplets, chart scales, field/row hairline tokens, density rows, type scale, motion, and ~25 shadow roles. Spacing is a 4px scale `--space-0..--space-12`. Radius default is 8px (`xs 4 / sm 6 / md 8 / lg 12`).
- Aya `docs/DESIGN.md` is a complete design spec: direction ("Monet vibes, operator-grade software"), themes, color roles + accent budget, state colors, typography roles (Newsreader display, IBM Plex Sans body, IBM Plex Mono utility), spacing/radius/density, elevation, container taxonomy (Workbench/Card/Panel, never nest cards), navigation, component recipes (buttons, fields, status pills, chips/tabs, checkboxes, toolbars/search, tables/lists, forms, overlays, loading), interaction states + motion tokens, copy voice, accessibility, and a quality bar.
- Aya `lib/ui/controls.ts` centralizes shared control class strings (`BUTTON_PRIMARY/SECONDARY/ICON/DANGER`, `FIELD_INPUT/SELECT/WRAPPER/INPUT_INNER`, filter-toolbar classes) so the state grammar lives in one place instead of per-component Tailwind soup; buttons keep a press model, text fields use a hairline focus model with no fill change.
- Aya `status-pill.tsx`: one recipe per `docs/DESIGN.md` — 22px tall, 4px radius, `body-sm` 500, state-soft fill, state text, 8px leading dot, never icon-only or color-only.
- Aya `field.tsx`: label above input, required marker is a rose dot (not asterisk), error is `role="alert"` + `aria-live="polite"`, `aria-describedby` wires help + error ids, focus drawn on the shared wrapper so adorned fields read as one control.
- Aya `workbench-shell.tsx`: persistent shell with mobile top bar + bottom tab nav, a `768–1023px` forced 56px icon rail, and a `≥1024px` collapsible 248px sidebar persisted in `localStorage`; mounts CommandPalette, ThemeProvider, and a `sonner` Toaster.
- Aya `empty-state.tsx`: subdued surface with icon tile, title, body, optional muted hint, and a real action slot — explicitly "not a marketing hero."
- Aya `theme-provider.tsx`: reads stored theme, applies `data-theme` on `<html>`, namespaces persistence by tenant, and resets to default on unmount so unauthenticated pages stay light.
- Aya `language-switcher.tsx`: persists locale via a server action then calls `router.refresh()` so the server re-renders with the new dictionary; disabled while pending.
- Conformis `globals.css` token surface (lines ~1–200): single `--accent: #0066ff`; `--surface`/`--surface-raised`/`--surface-sunken`; ink-alpha text scale; semantic info/success/warning/error each with soft/border/ink/solid; `--border`/`--border-strong`/`--focus-ring`; near-flat elevation (`--shadow-hairline/popover/modal`); 4px radii (`input`/`card`/`pill` all 4px, `circle` 9999px for true circles only); 10-step spacing scale; motion `fast/base/slow` 120/180/240ms with one easing; layout container + shell tokens; responsive `--layout-gutter` that shrinks at narrow widths; dark theme as a `:root[data-theme="dark"]` remap.
- Conformis `design/tokens.md` mirrors the implementation source of truth and documents type scale (Inter only, 400/500 weights, negative tracking only on display/headings), semantic-color rules, and the v1.6 WorkOS-inspired app-shell density (fixed sidebar, 56px topbar, command palette, 4px radii, electric blue retained, indigo rejected).
- Conformis `design/principles.md`: "modern, exacting, calm"; ink does the work, electric blue marks wayfinding/focus; no decoration without function; tables/lists preferred over card-heavy dashboards; semantic colors only for status/validation/destructive.
- Conformis `design/patterns/operational-surfaces.md`: WorkOS-inspired two-column shell (sidebar nav-only, topbar owns identity/search/theme/account); first text column is the primary reading column (`minmax(min, 1fr)`); overflow → details modal from a full-cell hit target; human-facing history (no raw JSON/ids); mobile fixed-nav safe-area padding; skeletons mirror the final grid; route-level `loading.tsx` only when the route awaits page-shaping async data.
- Conformis `app-shell.tsx`: `AppShellChrome` composes `AppSidebar` + `AppTopbar` + scrollable workspace from a single `NAV_LINKS` array grouped into sections (planWork/governance/account); pages pass a role-derived `visibleHrefs` allow-list (server stays authoritative); `AppShell` renders breadcrumbs + a header with one inline primary `action` slot.
- Conformis `theme/theme.ts`: `THEME_PREFERENCES = ['system','light','dark']`, cookie `conformis_theme`, `resolveSsrTheme` renders `light` for `system`/`light` so SSR is stable and the client flips post-mount.
- Both repos keep i18n dictionaries server-side and switch locale via a server action + refresh; Aya enforces EN/PT copy parity in operator-facing strings.

## Entities

- Repositories: `/Users/josemanuelcerqueira/Desktop/aya`, `/Users/josemanuelcerqueira/Desktop/conformis`
- Products: Aya (real-estate voice receptionist), Conformis (GRC/audit platform)
- Frameworks/libraries: Next.js 16 (App Router), React 19, Tailwind CSS v4 (Aya), `@tanstack/react-query` 5.100.9, `lucide-react` 1.14.0, `sonner` (Aya toasts), `react-loading-skeleton` (Conformis), `clsx` + `tailwind-merge` (Aya), `@workos-inc/authkit-nextjs` (Conformis auth)
- Tooling: Bun, Turborepo, TypeScript strict, Biome (Aya), ESLint + eslint-config-next (Conformis), Playwright (both), pnpm (Conformis), design-token + data-routing guard scripts (Aya)
- Design-system artifacts: Aya `docs/DESIGN.md`, `tokens.css`, `globals.css`, `lib/ui/controls.ts`; Conformis `globals.css`, `docs/BRAND.html`, `conformis-knowledge/design/*`
- Reusable component set: Button, Field/Input, Select, Card/Panel, Badge/Chip, StatusPill, Tabs, EmptyState, DataTable/List, Dialog/Drawer/Sheet, AppShell, Topbar/Sidebar/mobile nav, ThemeToggle, LocaleSwitcher, CommandPalette
- Reusable patterns: token-first design system, role-token theming, server-seed + React Query data routing, full interaction-state grammar, single-variable density, designed empty/loading/error states, zod-free client constants, accessibility/motion baselines, anti-aesthetic guardrails

## My Notes

- The strongest reuse signal is convergence: two unrelated products, built for very different domains and audiences, landed on the same Next 16 / React 19 / React Query / lucide baseline and the same "tokens before pixels, role tokens before raw values" discipline. That makes the intersection a credible default for a third app, not a one-off taste.
- The two repos disagree productively on the surface layer and that disagreement is itself the lesson: Aya proves a Tailwind-v4 `@theme` mapping can stay token-first; Conformis proves hand-authored semantic CSS can too. The blueprint should treat the token contract as required and the utility framework as a swappable choice.
- The color philosophies (painterly multi-hue vs neutral single-accent) look opposite but encode the same rule: one accent does forward-action work, everything else is structure, and semantic colors are reserved for state. A new app can pick either palette and keep the rule.
- Both repos move the state grammar out of components: Aya into `controls.ts` class strings, Conformis into `globals.css` semantic classes. Centralizing the grammar is what keeps hover/focus/disabled/loading consistent as the component count grows — worth copying regardless of framework.
- The data-routing contract is the most transferable non-visual artifact. "Server seed + React Query, `router.refresh()` only for auth/locale" prevents the exact RSC-latency regression Aya's latency audit found, and it generalizes to any App Router product with operational tables.
- Density-as-one-variable and skeletons-mirror-the-grid are small rules with outsized payoff: they keep dense tables from reflowing and keep first paint from jumping, which is where operator-grade software usually breaks.

## Open Questions

- Should the workspace promote the shared baseline (`next@16`, `react@19`, `react-query@5.100.9`, `lucide@1.14.0`, Bun + Turbo) into an actual `create-app` template or starter package, or keep it as a documented blueprint future agents reconstruct per project?
- Should design tokens themselves be extracted into a shared `@workspace/tokens` package so a third app inherits the role vocabulary, or does per-app `globals.css`/`tokens.css` better preserve each product's identity?
- Is Aya's two-theme localStorage model or Conformis' three-mode cookie + SSR-resolve model the better default for a new app, and when does per-tenant theme persistence justify the extra complexity?
- Where is the line for adopting a headless primitive library (dialogs, menus, listboxes) versus hand-building, given both repos currently hand-build most primitives to keep the bundle and token control tight?
- Should the data-routing contract and design-token guard scripts (Aya's `check:data-routing`, `check:design-tokens`) be lifted into the blueprint as enforced CI checks for any new app?

## Related

- [[ai-interface-design]]
- [[codebase-architecture]]
- [[internal-engineering-conventions]]
- [[repo-local-knowledge-bases]]
- [[2026-05-27-aya]]
- [[2026-05-27-conformis]]
- [[2026-05-27-aya-conformis-internal-codebase-patterns]]
- [[2026-05-25-uniswap-interface-ui-ux-source-teardown]]

## Source Text

Selected source anchors inspected (no large code or secrets copied):

- Aya `apps/web/package.json`: `next 16.2.4`, `react 19.2.5`, `@tanstack/react-query 5.100.9`, `lucide-react 1.14.0`, `tailwindcss 4.2.4`; scripts `check:data-routing`, `check:design-tokens`, `lint: biome check .`.
- Conformis `apps/web/package.json`: `next 16.2.6`, `react 19.2.4`, `@tanstack/react-query 5.100.9`, `lucide-react 1.14.0`, `@workos-inc/authkit-nextjs`, `react-loading-skeleton`; `test:e2e: playwright test`.
- Aya `docs/DESIGN.md`: "Monet vibes, operator-grade software"; "Design from roles, not raw color"; "Aya uses one primary action color per screen"; "Row height is the only density variable"; "State color is never the only cue."
- Aya `apps/web/src/app/globals.css`: `@import "tailwindcss"` + `@theme` mapping `tokens.css` values into utility names; field/row hairline tokens; `prefers-reduced-motion` block zeroes transforms while keeping color/border feedback.
- Aya `apps/web/src/app/tokens.css`: 4px `--space-*` scale; `--radius xs/sm/md/lg = 4/6/8/12`; light/dark raw values under `[data-theme]`.
- Aya `docs/WEB_DATA_ROUTING.md`: "server seed for first paint, then React Query owns reads, mutations, and refreshes"; "`router.refresh()` is allowed only at global server-context boundaries: sign-in/session and locale-cookie changes."
- Aya `lib/ui/controls.ts`: shared control class strings encoding the state grammar; "Buttons keep their press model; text fields use the field hairline model with no active or fill state."
- Aya `components/ui/status-pill.tsx`: "Single recipe per docs/DESIGN.md: 4px radius, ~22px height, body-sm 500, state-soft fill, state text, 8px leading dot — never icon alone, never colour alone."
- Conformis `apps/web/src/app/globals.css`: `--accent: #0066ff`; semantic info/success/warning/error soft/border/ink/solid; `--radius-input/card/pill: 4px`; `--focus-ring: 0 0 0 2px var(--surface), 0 0 0 4px var(--accent)`; `:root[data-theme="dark"]` remap.
- Conformis `design/principles.md`: "Conformis should feel modern, exacting, and calm"; "Minimal color. Ink does the work; electric blue marks wayfinding and focus."
- Conformis `design/patterns/operational-surfaces.md`: "navigation stays in the left sidebar, while workspace identity, search, theme, and account actions live in the topbar"; "Skeletons mirror the final grid."
- Conformis `theme/theme.ts`: `THEME_PREFERENCES = ['system', 'light', 'dark']`; "`system` resolves to `light` on the server so we always render a stable surface."
- Conformis `app-shell.tsx`: single `NAV_LINKS` array grouped into planWork/governance/account sections; pages pass role-derived `visibleHrefs` while "the server is still authoritative."
