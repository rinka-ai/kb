---
id: summary-2026-05-30-app-template-design-system-blueprint
type: summary
title: App Template And Design-System Blueprint
tags: [design-system, design-tokens, app-template, frontend, nextjs, react, tailwind, react-query, accessibility, component-library, themes, blueprint]
summary: A reusable, retrieve-before-you-build blueprint for starting a new web app or feature — default stack, token-first design contract, minimum component set, data-routing and state rules, accessibility/motion/density baselines, component/theme source selection, anti-patterns, and authoritative references — distilled from the Aya and Conformis internal apps.
source_count: 4
canonical_for: [app template, design system blueprint, new app defaults, design tokens starter, frontend starting defaults, UI component minimum set, how to start a new app, how to prompt agents to build UI]
review_status: reviewed
last_reviewed: 2026-05-30
review_due: 2026-08-30
confidence: "0.82"
---

# App Template And Design-System Blueprint

## Summary

This page is the practical blueprint a future agent (or human) should retrieve **before creating a new web app or feature**. It distills the convergent defaults of two internal apps — [[2026-05-27-aya|Aya]] and [[2026-05-27-conformis|Conformis]] (see the combined teardown [[2026-05-30-aya-conformis-app-template-design-system]]) — into a stack, a token contract, a component set, and a rule set, then points at authoritative external docs for the parts a teardown should not re-derive. Pair it with [[2026-05-30-component-theme-source-library]] when the agent needs stronger visual direction, reusable component/theme sources, or license-aware borrowing rules.

The thesis: a good app does not start from a blank `globals.css` and a component-library install. It starts from a **token contract** (semantic roles before pixels), a **minimum component set** with a complete **interaction-state grammar**, a **data-routing contract** (server seed + client cache), and **accessibility/motion/density baselines** treated as part of "done." Aesthetics are a per-product choice layered on top; the scaffold is reusable.

For the deeper architecture/convention lessons behind these apps (package boundaries, provider-neutral cores, durable state, repo-local knowledge), see [[2026-05-27-aya-conformis-internal-codebase-patterns]] and [[ai-interface-design]]. This page is the frontend-starting complement to those.

## When To Use This Blueprint

- Starting a new web app, dashboard, admin panel, or operator/SaaS tool.
- Adding a substantial new feature surface (a new workbench, settings area, or table view) to an existing app.
- Setting up or auditing a design-token layer, theme system, or component library.
- Briefing a coding agent to build UI so it produces token-first, accessible, state-complete output instead of generic AI aesthetics.

Skip it for tiny one-off scripts, pure-backend work, or throwaway prototypes where ceremony costs more than it saves.

## Recommended Default Stack

Both apps independently pin the same frontend baseline; treat the intersection as the default and deviate only with a reason.

| Layer | Default | Why (pinned-pattern reasoning) |
|---|---|---|
| Framework | **Next.js 16, App Router** | Both apps. Server Components cut client JS for table/list-heavy operational screens; App Router enables the server-seed data pattern below. |
| UI runtime | **React 19** | Both apps (19.2.x). |
| Styling | **Tailwind CSS v4, CSS-first** (`@import "tailwindcss"` + `@theme`) *or* hand-authored semantic `globals.css` | Aya uses Tailwind v4 mapping tokens into utilities; Conformis hand-authors CSS. Either works — the **token contract is required, the utility framework is a swappable choice**. |
| Server state / data | **TanStack React Query `5.100.9`** | Both apps pin the same version. Owns reads, mutations, optimistic updates, and cache invalidation (see Data Routing). |
| Icons | **lucide-react `1.14.0`** | Both apps pin the same version. One icon family at a time; icons are labels, not decoration. |
| Toasts / skeletons | `sonner` (Aya) / `react-loading-skeleton` (Conformis) | Pick one toast lib and one skeleton approach; keep them token-driven. |
| Class utilities | `clsx` + `tailwind-merge` (if using Tailwind) | Prevents competing `text-*`/`bg-*` utilities from silently dropping. |
| Lint/format | **Biome** (Aya) or **ESLint + eslint-config-next** (Conformis) | Use repo-native tooling; do not mix both in one app. |
| E2E / UI verification | **Playwright** | Both apps. Required for screenshot/interaction verification of UI work. |
| Runtime / monorepo | **Bun + Turborepo**, package manager **Bun** (Aya) or **pnpm** (Conformis) | Adopt the monorepo + workspace-package split only when there is a real second app/package; do not scaffold an empty monorepo for a single app. |
| Auth (if needed) | WorkOS AuthKit (Conformis) / Better Auth (Aya) | Choose per product; keep the SDK behind an adapter, not in components. |

**Deps discipline:** keep frontend-safe constants/types free of runtime validators (Zod). Aya imports zod-free constants from `@aya/types/constants`; Conformis splits zod-free `@conformis/contracts` from Zod-backed `@conformis/validation`. This keeps the client bundle lean.

## Design Token Hierarchy

Define the system as CSS custom properties. Components read **role tokens**, never raw values. A theme is a **role remap on a root attribute** (`[data-theme="dark"]`), not a second component system — typography, spacing, radius, density, and motion stay invariant across themes so switching never reflows layout.

Token layers, in dependency order:

1. **Primitives** (optional, internal): raw hex/px values. Exist to make roles inspectable; components should not reference them directly.
2. **Semantic role tokens** (required, what components consume):
   - **Surfaces:** `--surface` (page), `--surface-raised` (panels/cards/tables), `--surface-sunken` (table headers, recessed UI); Aya splits further into canvas/paper layers.
   - **Ink/text:** `--text-primary`, `--text-secondary`, `--text-muted`, `--text-subtle`, `--text-inverse` (Conformis derives the scale from ink alpha).
   - **Accent:** one `--accent` (+ `--accent-hover`, `--accent-soft`, `--accent-ink`). **One accent does forward-action work per screen**; never spend it on decoration.
   - **Borders/lines:** `--border`, `--border-strong`, `--border-focus`.
   - **State (semantic) colors:** success / warning / danger(error) / info, each as a **quadruplet** — solid, soft fill, border, ink. Used **only** for state/validation/destructive, never as brand or decoration, never color-alone.
   - **Elevation:** a small, named shadow set (`hairline`, `popover/raised`, `modal/overlay`). Prefer surface/border shifts over heavy blur.
   - **Focus ring:** one `--focus-ring` token reused everywhere.
3. **Scale tokens:** spacing (4px base, e.g. `--space-1..--space-10/12`), radius (small set — Conformis uses 4px everywhere; Aya defaults 8px with 4/6/8/12), motion (`fast/base/slow` ≈ 120/180/240ms + one easing), typography (named size+line-height+weight roles, not inline literals).
4. **Component/interaction tokens:** field border/hover/focus, row hover/selected/focus-ring, density row heights. Centralize these so the state grammar lives in one place (Aya: `lib/ui/controls.ts`; Conformis: semantic classes in `globals.css`).

### Starter Token Contract (minimum)

```
--surface / --surface-raised / --surface-sunken
--text-primary / --text-secondary / --text-muted / --text-subtle / --text-inverse
--accent / --accent-hover / --accent-soft / --accent-ink
--border / --border-strong / --focus-ring
--success(+soft/border/ink)  --warning(+…)  --danger(+…)  --info(+…)
--shadow-hairline / --shadow-popover / --shadow-modal
--space-1..--space-10            (4px base scale)
--radius-input / --radius-card   (+ --radius-circle: 9999px for true circles only)
--motion-fast/base/slow + --easing
type roles: display / h1 / h2 / h3 / body / label / caption / mono
--field-border(+hover/focus)  --row-hover/--row-selected/--row-focus-ring
density rows: --row-compact / --row-default / --row-comfortable
[data-theme="dark"] { /* remap surfaces, ink, accent, state, shadows only */ }
```

**Theming choices observed:** Aya ships 2 themes (light default, dark opt-in) persisted per-tenant in `localStorage`. Conformis ships 3 preferences (`system`/`light`/`dark`) persisted in a cookie, with `system` resolving to `light` on the server so SSR is stable and the client flips post-mount. Pick the cookie+SSR model when first paint must match the eventual theme without flash.

## UI Component Minimum Set

Ship these before product-specific components. Each must implement the full state grammar (below).

- **Button** — variants: primary (one forward action/screen), secondary, ghost, danger, icon-only (square, accessible name). 36–44px tall; ≥44px touch.
- **Field / Input** — label above, help text below (caption/muted), inline error as `role="alert" aria-live="polite"`, `aria-describedby` wiring, required marker as a dot (not `*`), adornment slots. Hairline focus, no fill change.
- **Select** — mirrors Field focus/hover so input/select pairs look identical.
- **Card / Panel** — Workbench (one top-level work surface/page) vs Card (repeated item/section) vs Panel (overlay body). **Never nest cards**; subdivide with dividers.
- **Badge / Chip** — small status/metadata token (Badge) and selectable filter (Chip with ≥2 selected cues).
- **StatusPill** — one recipe: small radius, ~22px tall, state-soft fill + state text + leading dot. Never icon-only or color-only.
- **Tabs / Segmented control** — persistent active indicator plus text/icon color; hover must not equal selected.
- **EmptyState** — icon tile + title + body + optional hint + real action slot. Not a marketing hero. Distinguish empty vs filtered-empty.
- **DataTable / List** — primary text column `minmax(min, 1fr)`, secondary columns hug content; full-row hover; tabular numerals; designed loading/empty/filtered-empty/error states; mobile stacks rows; row drill-down via `role="link"` + keyboard handlers + an `sr-only` `<Link>` for middle-click/copy-link.
- **Dialog / Drawer / Sheet** — Popover (small radius, line border, raised shadow), Dialog (constrained width, modal shadow), bottom Sheet on mobile (≥44px rows). Never blur dense data behind an overlay.
- **AppShell** — persistent frame: collapsible **Sidebar** (nav-only), **Topbar** (workspace identity, search/⌘K, theme, account/sign-out), and **mobile nav** (bottom tab bar or sheet). Build nav from a single `NAV_LINKS` array grouped into sections; pass a role-derived `visibleHrefs` allow-list while keeping the server authoritative.
- **ThemeToggle** — writes the theme preference (cookie or localStorage), applies `data-theme` on `<html>`, respects an SSR-stable default.
- **LocaleSwitcher** (when bilingual/i18n) — persists locale via a server action, then `router.refresh()` so the server re-renders with the new dictionary; keep dictionaries server-side and enforce copy parity.
- Plus: **CommandPalette** (lists currently-visible routes only), **Toaster** (polite live region), **skeleton** primitives that mirror final layouts.

## Interaction-State Grammar (every interactive component)

Default · Hover (≥2 cues) · Active/pressed · Focus-visible · Selected (distinct from hover) · Open (trigger stays connected) · Disabled (stable size, legible, no fake hover) · Loading (preserves width/icon placement) · Error (plain-language message near source). **State is never conveyed by color alone.** Centralize these as shared class strings/tokens, not per-component ad hoc styles. Focus is component-specific: fields use a hairline border + ~0.5px inset ring; rows use a 1px inset ring; buttons/controls use a contained focus ring.

## Rules That Travel With The Blueprint

- **Density:** make row height the **only** density variable (compact/default/comfortable); hold padding, font, and icon sizes fixed so tables never reflow between modes.
- **Mobile / responsive:** stack page title + primary CTA at narrow widths (CTA goes full-width, never steals title space); fixed mobile nav must reserve bottom padding incl. `env(safe-area-inset-bottom)`; use breakpoints, not fluid type scaling; prefer container/media queries over JS measurement.
- **Accessibility (baseline, not optional):** WCAG 2.2 AA contrast; visible focus on all interactive elements; semantic HTML before ARIA; state never by color alone; icon-only controls have accessible names; touch targets ≥44px (Aya) / ≥40px (Conformis); focus order follows visual order; polite live regions for non-focus-changing confirmations, assertive only for system failures.
- **Motion:** short and physical (≈80–320ms), used only to clarify state; always guard with `@media (prefers-reduced-motion: reduce)` (drop transforms, keep color/border feedback); no parallax, bounce, or decorative loops; tables and nav rows should not move.
- **Data routing (App Router contract):** server-rendered **seed** for first paint → pass as `initialData` → **React Query** owns reads/mutations/refresh with tenant-scoped, normalized query keys; optimistic `onMutate`/`onError`/`onSettled`; `router.refresh()` **only** for global server-context changes (auth, locale); URL sync for filters/search/pagination via a no-navigation replace, not `router.push`.
- **Empty / loading / error states:** design all four table states (loading skeleton mirroring final columns, empty, filtered-empty, error with retry); skeletons must not cause a layout jump; add route-level `loading.tsx` only when the route awaits page-shaping async data, not on stable settings/preference routes.
- **Verification:** verify UI changes by running the app and viewing them, not just by reading code. Use **Playwright** for interaction/screenshot checks; do a screenshot review for any HTML/CSS change. Add token-usage and data-routing guard scripts as CI checks (Aya ships `check:design-tokens` and `check:data-routing`).

## Anti-Patterns To Reject

Generic blue SaaS palettes · purple AI gradients · glassmorphism · decorative blobs/orbs · pill-heavy toy UI · low-contrast pastel mush · literal images behind dense text · card-heavy dashboards where tables/lists are clearer · nested cards · fluid type scaling with viewport width · raw hex/px in components instead of tokens · accent spent on decoration · semantic state colors used as brand/decoration · color-only status · exposing raw JSON/UUIDs/internal ids in user-facing history · `router.refresh()` as a data-refresh hammer · component-local re-implementations of hover/focus/disabled instead of the shared grammar.

## How To Prompt A Coding Agent With This Blueprint

Give the agent this page (or its retrieval) as a precondition, then constrain:

1. **Retrieve first:** "Before writing UI, read `wiki/summaries/2026-05-30-app-template-design-system-blueprint.md` and follow its stack, token contract, component set, and rules."
2. **Tokens before pixels:** "Define/extend semantic role tokens in the token layer; components must read role tokens, never raw hex/px. Add a `[data-theme="dark"]` remap for any new surface/ink/accent/state token."
3. **Reuse the component set:** "Use the existing Button/Field/Select/Card/Badge/StatusPill/Tabs/EmptyState/DataTable/Dialog/AppShell primitives; extend them rather than hand-rolling new one-off styles. Every interactive element implements the full state grammar."
4. **Data routing:** "Fetch the first paint as a server seed and hand it to React Query as `initialData`; do not call `router.refresh()` except for auth/locale."
5. **States and a11y are part of done:** "Ship loading/empty/filtered-empty/error states; meet WCAG AA; visible focus; ≥44px touch; `prefers-reduced-motion` guard; no color-only state."
6. **Verify:** "Run the app and screenshot the change with Playwright; do not report done from code-reading alone."
7. **Reject the anti-patterns list** explicitly in the prompt so the agent does not drift to generic AI aesthetics.
8. **Choose a source lane:** "Read `wiki/summaries/2026-05-30-component-theme-source-library.md`, use Refero only as visual context, choose one component/theme implementation lane, verify license before copying code, and translate all external patterns into the local token/component grammar."

## Component And Theme Source Selection

For new app work, retrieve [[2026-05-30-component-theme-source-library]] alongside this blueprint. This adds the missing "where should the agent borrow from?" layer:

- Use **Refero Styles** as taste/context before implementation: choose the closest product category, compare density/tone/color/type/component weight, and pass the relevant DESIGN.md-style context into the agent brief.
- Choose **one implementation lane**: shadcn/ui open-code components, Radix Primitives plus local styling, Radix Themes, or a licensed Tailwind kit such as Tailwind Plus/Catalyst.
- Use mature public systems as **calibration**, not skins: Carbon, Primer, Polaris, Atlassian, GOV.UK, USWDS, Apple HIG, and Material sharpen decisions around tokens, tables, forms, navigation, touch, accessibility, and motion.
- Verify license and brand restrictions before copying components, blocks, tokens, icons, screenshots, or templates.
- Map every borrowed pattern back into this page's token contract, component set, interaction-state grammar, data-routing contract, and Playwright verification workflow.

## Authoritative Resources Inventory

Concise reference set for the parts this teardown should not re-derive. Use the primary source over blog summaries.

- **Next.js App Router docs** — https://nextjs.org/docs/app — canonical for Server Components, `loading.tsx`/`error.tsx`, data fetching, and the routing model behind the server-seed pattern.
- **React docs** — https://react.dev — current component model, hooks, and React 19 APIs (Actions, `use`, form status).
- **Tailwind CSS v4 docs** — https://tailwindcss.com/docs — CSS-first config, the `@theme` directive, and mapping design tokens into utilities.
- **TanStack Query docs** — https://tanstack.com/query/latest — query keys, mutations, optimistic updates, and SSR hydration for the data-routing contract.
- **W3C WCAG 2.2** — https://www.w3.org/TR/WCAG22/ — the contrast, focus-appearance, and target-size success criteria the accessibility baseline encodes.
- **WAI-ARIA Authoring Practices Guide (APG)** — https://www.w3.org/WAI/ARIA/apg/ — correct roles, keyboard interaction, and focus management for dialogs, tabs, menus, listboxes, and comboboxes.
- **MDN — Using CSS custom properties** — https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties — the variable mechanics the whole token contract relies on.
- **MDN — Container queries** — https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries — component-level responsiveness preferred over JS width measurement.
- **MDN — Using media queries** — https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries — breakpoints and `prefers-reduced-motion` / `prefers-color-scheme`.
- **web.dev — Core Web Vitals** — https://web.dev/articles/vitals — LCP/INP/CLS targets; the "skeletons must not cause layout jump" rule maps to CLS.
- **W3C Design Tokens Community Group** — https://www.w3.org/community/design-tokens/ (format: https://tr.designtokens.org/format/) — a portable token format if tokens are ever extracted into a shared package.
- **IBM Carbon Design System** — https://carbondesignsystem.com/ — mature reference for token naming and accessibility-first component specs.
- **Material Design 3 foundations** — https://m3.material.io/foundations — reference for layout, state layers, and motion vocabulary (adapt, don't copy the look).
- **Apple Human Interface Guidelines** — https://developer.apple.com/design/human-interface-guidelines — touch targets, hierarchy, and platform interaction expectations.
- **Component And Theme Source Library** — [[2026-05-30-component-theme-source-library]] — local retrieval map for Refero Styles, shadcn/ui, Radix, Tailwind Plus/Catalyst, and mature public design systems.

## Source Notes

- [[2026-05-30-aya-conformis-app-template-design-system]] — combined frontend/design-system teardown this blueprint distills.
- [[2026-05-27-aya]] — Aya internal codebase (Monet token system, workbench shell, data-routing contract).
- [[2026-05-27-conformis]] — Conformis internal codebase (neutral single-accent tokens, WorkOS-inspired app shell, operational-surface patterns).
- [[2026-05-30-component-theme-source-library]] — external style/component/theme source-selection map for better AI-built app starts.
- [[2026-05-27-aya-conformis-internal-codebase-patterns]] — architecture/convention synthesis behind these apps.
- [[2026-05-25-uniswap-interface-ui-ux-source-teardown]] — external corroboration that UI quality is sourced from shared primitives, typed state, and verification, not sprinkled on.

## Related

- [[ai-interface-design]]
- [[codebase-architecture]]
- [[internal-engineering-conventions]]
- [[repo-local-knowledge-bases]]
