# 002 — Give the header logo's rotate/scale a stronger easing

- **Status**: DONE
- **Commit**: bc57d6e
- **Severity**: LOW–MEDIUM
- **Category**: Easing & duration
- **Estimated scope**: 1 file, one className edit
- **Depends on**: 003 (introduces the `--ease-hover` token this plan references)

## Problem

The header logo box (`components/SiteHeader.tsx:13`) animates a **movement** —
`rotate` and `scale` — on the same soft built-in `ease` curve
`cubic-bezier(0.25,0.1,0.25,1)` used for its color change. That curve is the one
`app/globals.css:25–26` explicitly calls out as "too soft to read as
intentional." For color changes the soft curve is fine (AUDIT §2: hover/color →
`ease`), but rotate/scale are on-screen movement and want the repo's strong
ease-out so the motion reads as deliberate.

```tsx
{/* components/SiteHeader.tsx:13 — current */}
<span
  className="inline-flex size-7 items-center justify-center border border-text transition-[background-color,color,rotate,scale] duration-[180ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:bg-text group-hover:text-canvas group-hover:-rotate-[7deg] group-active:scale-90"
  aria-hidden="true"
>
  M
</span>
```

All four properties (`background-color`, `color`, `rotate`, `scale`) currently
share one easing utility. We want the two **transform** channels (`rotate`,
`scale`) on `--ease-fluid` and the two **color** channels on the soft hover
curve.

## Target

Tailwind's `ease-[…]` utility applies a single curve to the whole transition, so
split it into a full arbitrary `transition` shorthand (the same style the repo
already uses in `components/IsometricStack.tsx:169`). Colors → `var(--ease-hover)`;
transforms → `var(--ease-fluid)`. Keep the 180ms duration.

```tsx
{/* target — components/SiteHeader.tsx:13 */}
<span
  className="inline-flex size-7 items-center justify-center border border-text [transition:background-color_180ms_var(--ease-hover),color_180ms_var(--ease-hover),rotate_180ms_var(--ease-fluid),scale_180ms_var(--ease-fluid)] group-hover:bg-text group-hover:text-canvas group-hover:-rotate-[7deg] group-active:scale-90"
  aria-hidden="true"
>
  M
</span>
```

The removed utilities are `transition-[background-color,color,rotate,scale]`,
`duration-[180ms]`, and `ease-[cubic-bezier(0.25,0.1,0.25,1)]`; they are replaced
by the single `[transition:…]` arbitrary utility. Everything else on the element
is unchanged.

- `--ease-fluid` is defined at `app/globals.css:27` → `cubic-bezier(0.23, 1, 0.32, 1)`.
- `--ease-hover` is defined by **plan 003**. If it is not present, see Boundaries.

## Repo conventions to follow

- Per-property easing is expressed with a full arbitrary `transition` utility,
  not stacked `transition-/duration-/ease-` utilities. Exemplar —
  `components/IsometricStack.tsx:169`:
  `[transition:transform_0.55s_cubic-bezier(0.2,0.7,0.15,1)]`.
- Motion tokens are CSS variables referenced as `var(--ease-fluid)` (see
  `components/ProjectCard.tsx:33`). Reference tokens; do not inline new
  cubic-beziers.

## Steps

1. Confirm the token exists: grep `--ease-hover` in `app/globals.css`. If it is
   missing, STOP and run plan 003 first (see Boundaries).
2. Open `components/SiteHeader.tsx`.
3. On line 13, delete the three utilities
   `transition-[background-color,color,rotate,scale]`, `duration-[180ms]`, and
   `ease-[cubic-bezier(0.25,0.1,0.25,1)]`.
4. In their place (same spot in the string, after `border border-text`) insert:
   `[transition:background-color_180ms_var(--ease-hover),color_180ms_var(--ease-hover),rotate_180ms_var(--ease-fluid),scale_180ms_var(--ease-fluid)]`
5. Leave the `group-hover:*` and `group-active:scale-90` classes exactly as they
   are. Save.

## Boundaries

- Only `components/SiteHeader.tsx`, only line 13 (the logo `<span>`). Do NOT
  touch the nav `<Link>` on line 29 — that is plan 003's.
- Do NOT change durations, the hover/active values, or the markup.
- Do NOT inline a raw cubic-bezier — reference `var(--ease-fluid)` and
  `var(--ease-hover)`.
- **Dependency**: this plan references `var(--ease-hover)`, created by plan 003.
  If `--ease-hover` is not defined in `app/globals.css`, STOP and run plan 003
  first — do not invent the token here.
- If line 13 does not match either the "current" excerpt above or the same
  element with `ease-[var(--ease-hover)]` (if plan 003 already swapped it), STOP
  and report drift.

## Verification

- **Mechanical**: typecheck and `next build` pass; the class string is a single
  unbroken token with no spaces inside the `[transition:…]` brackets (spaces
  break Tailwind arbitrary values — use underscores).
- **Feel check**: run the app, hover the header logo (top-left "M"):
  - The box should rotate ~7° and, on click, scale down — and that motion should
    feel crisper/snappier than before (strong ease-out), while the black/white
    color swap stays smooth.
  - DevTools → Animations panel, set speed to 10%: confirm the rotate/scale
    channels ease out (fast start, gentle settle) distinctly from the color
    fade. They should no longer look identical.
  - Toggle `prefers-reduced-motion: reduce`: the global rule at
    `app/globals.css:203–215` collapses transition durations — confirm the hover
    still recolors with no perceptible movement.
- **Done when**: the logo's rotate/scale run on `var(--ease-fluid)` and the color
  channels on `var(--ease-hover)`, with no raw cubic-bezier left on line 13.
