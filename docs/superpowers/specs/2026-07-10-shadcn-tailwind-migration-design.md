# Design: Migrate marvin-portfolio to shadcn + Tailwind CSS

**Date:** 2026-07-10
**Status:** Approved (design), pending spec review

## Goal

Migrate the portfolio site from its hand-authored CSS design system (~2,756 lines of
global CSS, hundreds of semantic class names) to idiomatic Tailwind CSS v4 utilities +
shadcn/ui primitives, while keeping the current design as visually identical as possible.
Additionally, unify the site's existing brand orange (`#e56f46`) into the theme as the
main color (`--primary`).

**Scope decisions (confirmed with user):**
- Full rewrite to Tailwind utilities — *including* the bespoke diagram components.
- Main theme color = existing brand orange `#e56f46`, mapped to shadcn `--primary`.
- Pixel drift is an accepted, understood risk; screenshots used to minimize it.

## Non-goals

- No redesign. Visual output should match the current site.
- No content/copy changes, no new pages, no new features.
- No changes to `lib/content.ts` data or routing structure.

## Token Strategy

The existing design runs on CSS custom properties. Rather than discard them, register them
in Tailwind v4's `@theme` block so they become real utilities carrying the *exact* current
values. This is the foundation everything else builds on.

| Current token        | Value                | Tailwind utility            | Notes                                   |
| -------------------- | -------------------- | --------------------------- | --------------------------------------- |
| `--canvas`           | `#080808`            | `bg-canvas`                 | no collision                            |
| `--surface`          | `#0e0e0e`            | `bg-surface`                | no collision                            |
| `--surface-raised`   | `#131313`            | `bg-surface-raised`         | no collision                            |
| `--text`             | `#eeeeea`            | `text-text`                 | no collision                            |
| `--quiet`            | `#5d5d59`            | `text-quiet`                | no collision                            |
| `--line`             | `#292927`            | `border-line`               | no collision                            |
| `--muted`            | `#858582`            | `text-dim`                  | **renamed** — `muted` collides w/ shadcn |
| `--accent`           | `#e56f46`            | `text-primary` / `bg-primary` | **unified into shadcn `--primary`**    |
| `--diagram-blue`     | `#7396b8`            | `bg-diagram-blue` etc.      | + `-dim` rgba variants                  |
| `--diagram-green`    | `#75a383`            | `bg-diagram-green` etc.     |                                         |
| `--diagram-amber`    | `#ca9958`            | `bg-diagram-amber` etc.     |                                         |
| `--diagram-red`      | `#c5655b`            | `bg-diagram-red` etc.       |                                         |
| `--font-heading`     | geist-sans           | `font-heading`              |                                         |
| `--font-ui`          | geist-mono           | `font-ui`                   |                                         |

### Color unification (the user's color request)

- Set shadcn `--primary` = the orange `#e56f46` (as oklch, matching shadcn's format),
  and `--ring` / `--sidebar-primary` accordingly.
- Every current `color: var(--accent)` usage → `text-primary`; `background: var(--accent)`
  → `bg-primary`. Result: the theme's main color and the site's brand accent are the same
  variable, and any future shadcn component is on-brand automatically.

### Collision handling

Only two current tokens collide with shadcn's semantic tokens:
- `--accent` → resolved by unifying into `--primary` (above). No design `--color-accent`
  utility is registered.
- `--muted` → resolved by registering the design's gray under `--color-dim` (utility
  `text-dim`). shadcn keeps its own `--muted` / `--muted-foreground`.

The `--diagram-*-dim` rgba overlay colors are registered as their own `--color-*` tokens so
`bg-diagram-blue-dim` etc. exist.

## Component & Page Migration

Every component/page's `className`s convert from semantic names to Tailwind utilities using
the theme tokens above plus arbitrary values (`text-[6.5rem]`, `leading-[0.86]`,
`min-h-[calc(100svh-88px)]`, `grid-cols-[58px_minmax(0,1fr)_auto]`) to preserve exact metrics.

### shadcn primitives — used only where they map cleanly

Forcing shadcn everywhere would fight the custom design. Use it where it genuinely fits:

- **`Button`** — real CTAs and links-styled-as-buttons (hero links, contact links). Styled
  via variants + utilities to match the current understated treatment.
- **`Separator`** — the `border-top` divider rules and any `<hr>`.
- **`Badge`** — `.tag` / `.tag-row` chips.

Everything else — `SiteHeader`, hero, card grids, lists, typography, page shells, and all
four diagram components (`CaseStudyDiagram`, `IsometricStack`, `OperationalGraphVisual`,
`ProjectVisual`) — becomes utility-class markup. No new global CSS classes are introduced.

### Files in scope

Components: `SiteHeader`, `SiteFooter`, `ArticleCard`, `ProjectCard`, `ProjectVisual`,
`OperationalGraphVisual`, `IsometricStack`, `CaseStudyDiagram`.
Pages: `app/page.tsx`, `app/projects/page.tsx`, `app/articles/page.tsx`,
`app/projects/[slug]/page.tsx`, `app/articles/[slug]/page.tsx`, `app/layout.tsx`.

### globals.css end state

Shrinks from ~2,756 lines to: the `@import "tailwindcss"` lines, the `@theme` block (design
tokens above), the shadcn `:root`/`.dark` token block + `@theme inline` mapping, and a small
set of genuinely-global rules: `::selection`, base `html`/`body` background+font, global
`box-sizing`, link reset, and `a:focus-visible` outline. Every component-specific rule is
deleted as its markup is converted.

## Migration Order (leaf-first)

Convert leaves before their consumers so each step is independently verifiable, and delete
each block of CSS only *after* its markup is converted. Run `next build` after each phase.

1. **Theme setup** — register `@theme` tokens; set `--primary` to orange. No markup change
   yet; verify build + existing site still renders (old classes still present).
2. **Chrome** — `SiteHeader`, `SiteFooter`, `layout.tsx`.
3. **Cards** — `ArticleCard`, `ProjectCard`, `ProjectVisual`.
4. **Index pages** — `app/page.tsx`, `projects/page.tsx`, `articles/page.tsx`.
5. **Detail pages** — `projects/[slug]`, `articles/[slug]` (non-diagram markup).
6. **Diagrams** — `OperationalGraphVisual`, `IsometricStack`, `CaseStudyDiagram`.
7. **Cleanup** — delete remaining dead CSS; final `globals.css` is only theme + globals.

## Verification / Drift Guard

- Capture before-screenshots of key pages (home, projects index, a project detail with a
  diagram, an article detail) using the browser tool, at the start.
- After each phase: `next build` must pass; re-screenshot the affected pages and compare
  against the before-shots; reconcile any visible difference before moving on.
- Final check: full `next build`, plus a visual pass over every route.

## Risks

- **Pixel drift** on finely-tuned metrics — mitigated by arbitrary values + screenshot
  comparison. Accepted risk per user.
- **Diagram fidelity** — the diagram CSS is intricate; utilities with arbitrary values must
  reproduce exact positions/sizes. Highest-risk phase; screenshot comparison is essential.
- **Tailwind preflight** — Tailwind's base reset is already active (import added earlier);
  base `html`/`body`/link resets are kept explicitly to preserve current look.
