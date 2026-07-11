# 001 — Stop animating `padding` on ProjectCard hover

- **Status**: DONE
- **Commit**: bc57d6e
- **Severity**: MEDIUM
- **Category**: Performance
- **Estimated scope**: 1 file, one className edit

## Problem

`components/ProjectCard.tsx:15` animates `padding` on hover. `padding` is a
layout-triggering property (layout → paint → composite), and it runs on a
hover-frequency list row. Worse, the padding change narrows the card's content
box by 28px (14px each side), which can force the summary paragraph to **re-wrap
mid-animation** — a visible jank, not just an off-GPU cost.

```tsx
{/* components/ProjectCard.tsx:15 — current */}
<Link
  href={`/projects/${project.slug}`}
  className="group grid grid-cols-[58px_minmax(0,1fr)_24px] gap-6 min-h-[200px] py-[30px] origin-center transition-[background-color,padding,scale] duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:bg-surface hover:px-[14px] active:scale-[0.995] max-[640px]:grid-cols-[30px_minmax(0,1fr)_18px] max-[640px]:gap-3 max-[640px]:min-h-0 max-[640px]:py-[26px] max-[640px]:hover:px-0"
>
```

The animated properties are `background-color`, `padding`, and `scale`. Only
`padding` is problematic — `background-color` and `scale` (transform) are fine.

## Target

Remove `padding` from the animated set and remove the `hover:px-[14px]` inset.
The hover affordance becomes the surface-fill (`hover:bg-surface`) + the arrow
slide (already on the `<ArrowUpRight>` at line 33) + the `active:scale` press
feedback. Only `transform` and `opacity`/`background-color` animate — no layout.

```tsx
{/* target — components/ProjectCard.tsx:15 */}
<Link
  href={`/projects/${project.slug}`}
  className="group grid grid-cols-[58px_minmax(0,1fr)_24px] gap-6 min-h-[200px] py-[30px] px-[14px] origin-center transition-[background-color,scale] duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:bg-surface active:scale-[0.995] max-[640px]:grid-cols-[30px_minmax(0,1fr)_18px] max-[640px]:gap-3 max-[640px]:min-h-0 max-[640px]:py-[26px] max-[640px]:px-0"
>
```

Exact changes to the className string:

1. Remove `padding` from `transition-[background-color,padding,scale]` →
   `transition-[background-color,scale]`.
2. Remove the hover inset `hover:px-[14px]` and its mobile reset
   `max-[640px]:hover:px-0`.
3. To preserve the inset look **without animating it**, make the padding
   constant: add `px-[14px]` to the base classes (next to `py-[30px]`) and
   `max-[640px]:px-0` to the mobile group (next to `max-[640px]:py-[26px]`).
   Content is now always inset by 14px on desktop; the box no longer reflows on
   hover.

> Note on the visual change: content is now *permanently* inset 14px on desktop
> instead of sliding in on hover. This is the intended trade — a static inset
> costs nothing; an animated one reflows. The `01`/summary columns will sit 14px
> further from the section rule at rest. If the reviewer decides the resting
> inset looks wrong and the sliding inset must return, the only correct way to
> keep it GPU-cheap is to not animate it — so the fallback is: keep `px-0` at
> rest (no base padding, no hover inset) and rely on `bg-surface` + arrow + press
> scale alone. Do NOT re-add `padding` to the transition.

## Repo conventions to follow

- This component uses Tailwind arbitrary values inline in the `className` string
  (no CSS module). Keep the same style — edit the string only.
- Transform-based press feedback is already the house pattern: `active:scale-[0.995]`
  here, `active:scale-[0.97]` on buttons. Leave it untouched.
- The sibling `components/ArticleCard.tsx:15` is the exemplar for a card that
  hovers **without** any layout animation — it animates only `transform`
  (`transition-transform … active:scale-[0.995]`). Match that discipline.

## Steps

1. Open `components/ProjectCard.tsx`.
2. In the `<Link>` className on line 15, replace
   `transition-[background-color,padding,scale]` with
   `transition-[background-color,scale]`.
3. In the same string, delete `hover:px-[14px]` and `max-[640px]:hover:px-0`.
4. In the same string, add `px-[14px]` immediately after `py-[30px]`, and add
   `max-[640px]:px-0` immediately after `max-[640px]:py-[26px]`.
5. Save. No other file changes.

## Boundaries

- Do NOT touch any other file. Only `components/ProjectCard.tsx`.
- Do NOT change the grid structure, the arrow markup/animation (line 33), or the
  `active:scale` press feedback.
- Do NOT re-introduce `padding` (or any of `width`/`height`/`margin`/`top`/`left`)
  into a `transition-[…]` list.
- Do NOT add dependencies.
- If line 15 does not match the "current" excerpt above (drift since commit
  bc57d6e), STOP and report instead of improvising.

## Verification

- **Mechanical**: `npx tsc --noEmit` (or the repo's typecheck) passes; `npm run
  build` (or `next build`) succeeds. No new lint errors from the changed file.
- **Feel check**: run the app, go to `/` (Selected work) or `/projects`, and
  hover a project row:
  - The summary text must **not re-wrap or shift horizontally** during the hover
    — content position is now static; only the background fills in.
  - Open DevTools → Performance/Rendering, enable "Paint flashing" and
    "Layout Shift Regions". Hovering a row should show **no layout-shift region**
    on the row (previously the padding animation flagged one).
  - Confirm the arrow still slides up-right and turns primary on hover, and the
    row still scales down slightly on click.
  - Toggle `prefers-reduced-motion: reduce` (Rendering panel): hover still fills
    the background instantly, no motion — unchanged behavior.
- **Done when**: hovering a project row produces zero layout shift and no text
  re-wrap, while the background-fill + arrow + press-scale affordances remain.
