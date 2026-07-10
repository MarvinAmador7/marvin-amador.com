# shadcn + Tailwind Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the hand-authored CSS portfolio to idiomatic Tailwind v4 utilities + shadcn primitives with no intended visual change, and unify the brand orange `#e56f46` as the theme's `--primary`.

**Architecture:** Register the existing design tokens in Tailwind's `@theme` so utilities carry exact current values; convert each component/page's semantic classes to utilities leaf-first; use shadcn `Button`/`Separator`/`Badge` only where they map cleanly; delete each block of component CSS as its markup is converted. Verification is `next build` + before/after screenshot comparison per phase (this is a visual migration, so the "test" is the rendered page, not unit tests).

**Tech Stack:** Next.js 16 (App Router, RSC), Tailwind CSS v4, shadcn/ui (nova style, `@` alias), lucide-react, next/font (Geist / Geist Mono).

## Global Constraints

- No visual redesign. Rendered output must match the pre-migration site. Any visible difference is a regression to reconcile before moving on.
- No content/copy changes, no routing changes, no edits to `lib/content.ts`.
- Brand orange is `#e56f46`. It is set once as shadcn `--primary` (light + dark) and `--ring`; every former `var(--accent)` usage becomes `text-primary` / `bg-primary` / `border-primary`.
- No new global CSS classes. Layout/typography become utilities; only the small global base rules survive in `globals.css`.
- Run `npx next build` after every task; it must compile with no type errors.
- Commit after every task.
- `"use client"` is only needed for components using state/effects/handlers/browser APIs. These components are static server components today — do not add the directive unless a converted file introduces interactivity (none should).

### Conversion Reference (recurring class → utility mappings)

Use these throughout. `px-7` = 28px, `gap-6` = 24px, `font-medium` = 500. Prefer registered token utilities; use arbitrary values (`text-[6.5rem]`) for exact metrics not on Tailwind's scale.

| Current CSS | Tailwind utilities |
| --- | --- |
| `color: var(--text)` | `text-text` |
| `color: var(--muted)` | `text-dim` |
| `color: var(--quiet)` | `text-quiet` |
| `color: var(--accent)` | `text-primary` |
| `background: var(--canvas)` | `bg-canvas` |
| `background: var(--surface)` | `bg-surface` |
| `background: var(--surface-raised)` | `bg-surface-raised` |
| `border / border-top: 1px solid var(--line)` | `border-line` + `border` / `border-t` |
| `font-family: var(--font-heading)` | `font-heading` |
| `font-family: var(--font-ui)` | `font-ui` |
| `text-transform: uppercase` | `uppercase` |
| `.site-header/.home-shell/.page-shell/... (mx-auto max-width 1040 pad 28)` | `mx-auto max-w-[1040px] px-7` |
| container `padding: 116px 0 132px` (section-block) | `border-t border-line pt-[116px] pb-[132px]` |
| `.availability span` dot | `inline-block size-[7px] rounded-full bg-[#65b978] mr-2 shadow-[0_0_0_4px_rgba(101,185,120,0.1)]` |

Colocate exact one-off values (diagram coordinates, shadows, gradients) as arbitrary utilities. When a rule is genuinely un-utility-able (complex `::before`/`::after` pseudo-content on diagrams), keep it as a scoped rule inside a `@layer components` block in `globals.css` keyed to a single class — but prefer utilities + real elements first.

---

## Task 1: Theme foundation (tokens, primary color, base rules, fonts)

**Files:**
- Modify: `app/globals.css` (add `@theme` design tokens; set `--primary`/`--ring`; reconcile base layer; keep global rules)
- Modify: `app/layout.tsx:7` (remove redundant `geistHeading`; simplify html font classes)

**Interfaces:**
- Produces (utilities available to all later tasks): `bg-canvas`, `bg-surface`, `bg-surface-raised`, `text-text`, `text-dim`, `text-quiet`, `border-line`, `bg-diagram-blue|green|amber|red`, `bg-diagram-blue-dim|green-dim|amber-dim|red-dim`, `font-heading`, `font-ui`, and `bg-primary`/`text-primary` = `#e56f46`.

- [ ] **Step 1: Capture before-screenshots** (drift baseline)

Start the dev server and screenshot the four representative routes using the agent-browser tool: `/`, `/projects`, `/projects/grivara-ops` (has a diagram), `/articles/operational-interfaces-for-engineers`. Save to `docs/superpowers/plans/screenshots/before-*.png`.

Run: `npx next dev` (background), then drive the browser tool to each URL at a fixed viewport (e.g. 1440px) and full-page screenshot.

- [ ] **Step 2: Add the `@theme` design-token block**

Insert immediately after the `@import`/`@custom-variant` lines at the top of `app/globals.css` (before `:root`):

```css
@theme {
  --color-canvas: #080808;
  --color-surface: #0e0e0e;
  --color-surface-raised: #131313;
  --color-text: #eeeeea;
  --color-dim: #858582;
  --color-quiet: #5d5d59;
  --color-line: #292927;
  --color-diagram-blue: #7396b8;
  --color-diagram-blue-dim: rgba(115, 150, 184, 0.12);
  --color-diagram-green: #75a383;
  --color-diagram-green-dim: rgba(117, 163, 131, 0.12);
  --color-diagram-amber: #ca9958;
  --color-diagram-amber-dim: rgba(202, 153, 88, 0.12);
  --color-diagram-red: #c5655b;
  --color-diagram-red-dim: rgba(197, 101, 91, 0.1);
  --font-heading: var(--font-geist-sans), sans-serif;
  --font-ui: var(--font-geist-mono), monospace;
}
```

- [ ] **Step 3: Set the brand orange as `--primary` (light + dark) and `--ring`**

In `:root` (near line 32) set `--primary: #e56f46;` and `--ring: #e56f46;` and `--sidebar-primary: #e56f46;`. In `.dark` (near line 2677) set the same three to `#e56f46`. Leave `--primary-foreground` as-is (light text on orange reads fine).

- [ ] **Step 4: Remove the now-duplicated design tokens from `:root`**

Delete `--muted`, `--accent` from `:root` **only if** no remaining selector references `var(--muted)`/`var(--accent)` yet. Since component CSS still references them at this stage, KEEP them for now; they are removed in the final cleanup task. (No change this step — noted so the implementer doesn't jump ahead.)

- [ ] **Step 5: Fix the base layer + fonts so nothing regresses**

The shadcn `@layer base` block sets `body { @apply bg-background text-foreground }` and `html { @apply font-mono }`, which would override the design once component CSS is deleted. Replace that block's body/html rules to match the design:

```css
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-canvas text-text font-ui;
  }
  html {
    @apply bg-canvas;
  }
}
```

In `app/layout.tsx`: delete the `geistHeading` declaration (line 7) and its use; the html element keeps `cn(geistSans.variable, geistMono.variable)`. The `@theme` `--font-heading`/`--font-ui` now resolve via `--font-geist-sans` / `--font-geist-mono`. Also remove the self-referential `--font-mono: var(--font-mono)` line in `@theme inline`.

- [ ] **Step 6: Build + visual check**

Run: `npx next build`
Expected: compiles, no type errors. Re-screenshot the four routes; they must match the before-shots (nothing has been converted yet, so this confirms the theme/base changes are visually inert).

- [ ] **Step 7: Commit**

```bash
git add app/globals.css app/layout.tsx docs/superpowers/plans/screenshots
git commit -m "feat(theme): register design tokens in @theme, set brand primary"
```

---

## Task 2: Chrome — SiteHeader, SiteFooter

**Files:**
- Modify: `components/SiteHeader.tsx`, `components/SiteFooter.tsx`
- Modify: `app/globals.css` (delete `.site-header`, `.brand*`, `.nav-links*`, `.site-footer*` rules after conversion)

**Interfaces:**
- Consumes: token utilities from Task 1.
- Produces: converted header/footer used by every page.

- [ ] **Step 1: Convert `SiteHeader.tsx`**

Replace semantic classes with utilities. Key metrics from current CSS: header is `sticky top-0 z-20 flex h-[88px] items-center justify-between` with `bg-canvas/[.88] backdrop-blur-[14px]` and the shell `mx-auto max-w-[1040px] px-7`. `.brand` → `flex items-center gap-[11px] text-[0.8rem] font-semibold uppercase`; `.brand-mark` → `inline-flex size-7 items-center justify-center border border-text transition-[background-color,color,transform] duration-[180ms]` with hover `hover:bg-text hover:text-canvas hover:-rotate-[7deg]` (apply hover on the brand group with `group`/`group-hover:`). `.nav-links` → `flex items-center gap-7`; nav links → `text-dim text-[0.76rem] transition-colors hover:text-text`.

- [ ] **Step 2: Convert `SiteFooter.tsx`**

Same shell (`mx-auto max-w-[1040px] px-7`); footer links → `text-dim text-[0.76rem] hover:text-text`. Use `<Separator />` (shadcn) in place of any top border rule if one exists, else `border-t border-line`.

- [ ] **Step 3: Delete converted CSS**

Remove `.site-header`, `.brand`, `.brand-mark`, `.nav-links`, `.hero-links`/footer-shared selectors that are now unused (check each is not referenced elsewhere before deleting — some selectors are grouped, e.g. `.brand, .nav-links, .hero-links, ...`; split the group and keep parts still in use).

- [ ] **Step 4: Build + visual check**

Run: `npx next build`. Re-screenshot `/`; header + footer must match before-shot.

- [ ] **Step 5: Commit**

```bash
git add components/SiteHeader.tsx components/SiteFooter.tsx app/globals.css
git commit -m "refactor(chrome): convert SiteHeader/SiteFooter to Tailwind utilities"
```

---

## Task 3: Cards — ArticleCard, ProjectCard, ProjectVisual

**Files:**
- Modify: `components/ArticleCard.tsx`, `components/ProjectCard.tsx`, `components/ProjectVisual.tsx`
- Modify: `app/globals.css` (delete `.project-card*`, `.article-card*`, `.card-copy*`, `.tag*`, ProjectVisual rules)

**Interfaces:**
- Consumes: token utilities.
- Produces: cards used by index pages (Task 4).

- [ ] **Step 1: Convert `ProjectCard.tsx`**

`.project-card` → `border-b border-line`. `.project-card-link` → `grid grid-cols-[58px_minmax(0,1fr)_24px] gap-6 min-h-[200px] py-[30px] transition-[background-color,padding] duration-[180ms]` with hover `hover:bg-surface hover:px-[14px]`. `.card-copy` → `grid gap-x-[42px] gap-y-[18px] grid-cols-[minmax(180px,0.8fr)_minmax(260px,1.2fr)]`. `.row-index`/`.row-meta` → `text-quiet text-[0.7rem] uppercase`. Tags → shadcn `Badge` (variant `secondary` or `outline`) styled to the current chip look, replacing `.tag`/`.tag-row`.

- [ ] **Step 2: Convert `ArticleCard.tsx`**

`.article-card` → `border-b border-line`; `.article-card-link` grid/padding per its current CSS; headings `text-base font-medium leading-[1.4]`.

- [ ] **Step 3: Convert `ProjectVisual.tsx`**

Convert its wrapper/box classes to utilities with arbitrary values matching current sizes/colors (use `bg-diagram-*` tokens where the CSS uses `var(--diagram-*)`).

- [ ] **Step 4: Delete converted CSS**; **Step 5: Build + screenshot `/projects`**; **Step 6: Commit**

```bash
git add components/ArticleCard.tsx components/ProjectCard.tsx components/ProjectVisual.tsx app/globals.css
git commit -m "refactor(cards): convert card components to Tailwind + Badge"
```

---

## Task 4: Index pages — home, projects, articles

**Files:**
- Modify: `app/page.tsx`, `app/projects/page.tsx`, `app/articles/page.tsx`
- Modify: `app/globals.css` (delete `.hero-*`, `.section-*`, `.availability*`, `.index-hero*`, `.eyebrow`, list-container rules)

**Interfaces:** Consumes cards (Task 3) + token utilities.

- [ ] **Step 1: Convert `app/page.tsx` (home / hero)**

Shell `mx-auto max-w-[1040px] px-7`. `.hero-section` → `flex flex-col justify-between min-h-[calc(100svh-88px)] pt-[70px] pb-[54px]`. `.hero-copy` → `my-[78px] mb-[90px] max-w-[810px]` (margin 78px 0 90px → `mt-[78px] mb-[90px]`). `.hero-copy h1` → `font-heading text-[6.5rem] font-medium leading-[0.86] m-0 mb-[38px]`, and its `span` → `text-primary`. `.hero-role` → `font-heading text-[1.85rem] font-medium leading-[1.2] max-w-[690px] mb-5`. `.hero-intro` → `text-dim leading-[1.75] max-w-[680px]`. `.availability` → `text-dim text-[0.72rem] uppercase` with the status dot span per the Conversion Reference. `.hero-links` → `grid grid-cols-4 min-h-[58px] border-y border-line`; CTA links styled as shadcn `Button variant="ghost"`/`link` where they are actions.

- [ ] **Step 2: Convert `.section-block` / `.section-heading` / `.eyebrow`**

`.section-block` → `border-t border-line pt-[116px] pb-[132px]`. `.section-heading` → `grid grid-cols-[58px_minmax(0,1fr)_auto] gap-6 items-start mb-[62px]`. `.section-number`/index → `text-quiet text-[0.7rem] uppercase`. `.eyebrow` → `text-primary text-[0.7rem] uppercase mb-[15px]`. `.section-heading h2` → `font-heading font-medium text-[2.55rem] leading-[1.08] max-w-[650px]`. `.section-intro` → `text-dim leading-[1.7] max-w-[560px] mt-6`.

- [ ] **Step 3: Convert `projects/page.tsx` and `articles/page.tsx`**

Index shells + `.index-hero`/`.content-index` headings to utilities; lists use the converted cards. Use `<Separator />` or `border-t border-line` for the list top borders.

- [ ] **Step 4: Delete converted CSS**; **Step 5: Build + screenshot `/`, `/projects`, `/articles`**; **Step 6: Commit**

```bash
git add app/page.tsx app/projects/page.tsx app/articles/page.tsx app/globals.css
git commit -m "refactor(pages): convert index pages to Tailwind utilities"
```

---

## Task 5: Detail pages (non-diagram markup)

**Files:**
- Modify: `app/projects/[slug]/page.tsx`, `app/articles/[slug]/page.tsx`
- Modify: `app/globals.css` (delete `.detail-*`, `.article-detail*`, `.case-study-*` text/layout rules — NOT the diagram-specific rules yet)

**Interfaces:** Consumes token utilities; diagrams still use their CSS until Task 6.

- [ ] **Step 1: Convert `app/articles/[slug]/page.tsx`**

`.article-shell` → `mx-auto max-w-[1040px] px-7`. `.article-detail h1`/`h2` → `font-heading font-medium` at their current sizes. `.article-byline`/`.article-meta` → `flex items-center text-quiet text-[0.7rem] uppercase`. `.back-link` → shadcn `Button variant="link"` or `text-dim text-[0.72rem] gap-[7px] hover:text-text` with a lucide arrow icon.

- [ ] **Step 2: Convert `app/projects/[slug]/page.tsx` (case-study layout)**

`.case-study-layout` grid, `.case-study-essay`/`.case-study-aside`/`.case-study-facts`/`.case-study-contact` → utilities matching current grid/spacing. Leave the `<CaseStudyDiagram>`/`<IsometricStack>`/`<OperationalGraphVisual>` component usages untouched (converted in Task 6).

- [ ] **Step 3: Delete converted (non-diagram) CSS**; **Step 4: Build + screenshot both detail routes**; **Step 5: Commit**

```bash
git add "app/projects/[slug]/page.tsx" "app/articles/[slug]/page.tsx" app/globals.css
git commit -m "refactor(detail): convert detail page layouts to Tailwind utilities"
```

---

## Task 6: Diagram components

**Files:**
- Modify: `components/OperationalGraphVisual.tsx`, `components/IsometricStack.tsx`, `components/CaseStudyDiagram.tsx`
- Modify: `app/globals.css` (delete all remaining `.diagram-*`, `.architecture-*`, `.durability-*`, `.dispatch-*`, `.agent-*`, `.harness-*`, `.capability-*`, `.boundary-*`, `.commit-*`, `.domain-*`, `.extension-*`, `.isometric*`, `.chapter-*`, etc. rules)

**Interfaces:** Consumes `bg-diagram-*` tokens.

- [ ] **Step 1: Convert `OperationalGraphVisual.tsx`** (147 lines) — box/arrow classes → utilities with arbitrary values for exact positions, sizes, borders; `var(--diagram-*)` → `bg-diagram-*`/`text-diagram-*`/`border-diagram-*`. Where a `::before`/`::after` connector can't be expressed as a utility on a real element, add a pseudo-element via arbitrary variant (`before:content-[''] before:absolute ...`).

- [ ] **Step 2: Convert `IsometricStack.tsx`** (192 lines) — same approach; preserve transforms (`rotate`, `skew`, `translate`) via arbitrary `[transform:...]` utilities and stacking via `z-*`/arbitrary z.

- [ ] **Step 3: Convert `CaseStudyDiagram.tsx`** (402 lines) — largest; work box-group by box-group, screenshotting after each sub-diagram if needed. This is the highest drift-risk file — compare against before-shot at high zoom.

- [ ] **Step 4: Build + screenshot every route containing a diagram**; reconcile pixel differences.

- [ ] **Step 5: Commit**

```bash
git add components/OperationalGraphVisual.tsx components/IsometricStack.tsx components/CaseStudyDiagram.tsx app/globals.css
git commit -m "refactor(diagrams): convert diagram components to Tailwind utilities"
```

---

## Task 7: Final cleanup + full verification

**Files:** Modify: `app/globals.css`

- [ ] **Step 1: Remove dead tokens + confirm globals.css end-state**

Delete `--muted` and `--accent` from `:root` (now unreferenced). Confirm `globals.css` contains only: `@import` lines, `@custom-variant`, `@theme` (design tokens), the design `:root` tokens still in use (`--canvas`, `--surface`, `--surface-raised`, `--text`, `--quiet`, `--line`, `--diagram-*`, `--font-*`) + shadcn tokens, the shadcn `.dark` block, `@theme inline`, `@layer base`, and the genuinely-global rules: `::selection`, `a` reset, `button/input/textarea/select { font: inherit }` (or `font-[inherit]` handled globally), `a:focus-visible` outline, global `box-sizing`.

Verify no component/layout selectors remain:

Run: `grep -nE '^\.(hero|section|project|article|card|diagram|detail|case-study|agent|harness|durability|dispatch|architecture|brand|nav|site-|isometric)' app/globals.css`
Expected: no output.

- [ ] **Step 2: Full build**

Run: `npx next build`
Expected: all 11 routes compile; no type errors.

- [ ] **Step 3: Full visual pass**

Screenshot all routes; compare each against its before-shot. Reconcile any regression.

- [ ] **Step 4: Verify color request**

Confirm the brand orange appears via `--primary` (hero highlight `text-primary`, eyebrows) and that a scratch shadcn `<Button>` renders orange. Remove any scratch code.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css
git commit -m "chore: remove dead CSS, finalize Tailwind migration"
```

---

## Self-Review Notes

- **Spec coverage:** token strategy (Task 1) ✓, color unification (Task 1 Step 3 + all `text-primary` conversions) ✓, `--muted`→`text-dim` (Task 1 + reference table) ✓, per-component conversion (Tasks 2–6) ✓, shadcn Button/Separator/Badge only (Tasks 2–5) ✓, globals.css end-state (Task 7) ✓, screenshot drift-guard (every task) ✓, diagrams converted (Task 6) ✓.
- **No unit tests by design:** this is a visual migration; the verification loop is `next build` + screenshot comparison, stated per task.
- **Ordering:** leaf-first (chrome → cards → index → detail → diagrams → cleanup); CSS deleted only after its markup is converted; `--muted`/`--accent` tokens kept until Task 7 because component CSS references them until then.
