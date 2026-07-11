# 003 — Tokenize the duplicated hover easing

- **Status**: DONE
- **Commit**: bc57d6e
- **Severity**: LOW
- **Category**: Cohesion & tokens
- **Estimated scope**: 5 files, 1 token + ~11 literal swaps (mechanical)

## Problem

The soft hover curve `cubic-bezier(0.25,0.1,0.25,1)` is hand-typed as a magic
value at 11 call sites, while the repo already tokenizes its other curve as
`--ease-fluid` (`app/globals.css:27`). This is a consolidation finding: one
curve, one token. The curve itself is correct for color hovers (AUDIT §2), so
this change is **behavior-preserving** — value stays identical, only the spelling
becomes a token.

Current literal `ease-[cubic-bezier(0.25,0.1,0.25,1)]` appears at:

```
app/page.tsx:11
app/page.tsx:13
components/SiteHeader.tsx:29
components/SiteFooter.tsx:8
components/SiteFooter.tsx:11
components/SiteFooter.tsx:14
app/projects/[slug]/page.tsx:26
app/projects/[slug]/page.tsx:42
app/projects/[slug]/page.tsx:209
app/articles/[slug]/page.tsx:36
```

`components/SiteHeader.tsx:13` (the logo box) also contains the literal but is
**owned by plan 002** — exclude it here.

## Target

Introduce a token `--ease-hover: cubic-bezier(0.25, 0.1, 0.25, 1);` next to the
existing `--ease-fluid`, then replace every `ease-[cubic-bezier(0.25,0.1,0.25,1)]`
utility (except SiteHeader line 13) with `ease-[var(--ease-hover)]`.

Token, added to the `@theme` block in `app/globals.css` right after `--ease-fluid`:

```css
/* app/globals.css — inside @theme, after --ease-fluid (line 27) */
--ease-fluid: cubic-bezier(0.23, 1, 0.32, 1);
/* Soft built-in `ease`, correct for color hovers (starts/ends gently).
   Deliberately weaker than --ease-fluid — do not use it for movement. */
--ease-hover: cubic-bezier(0.25, 0.1, 0.25, 1);
```

Each call site, e.g. `app/page.tsx:11`:

```tsx
/* current */  "… transition-colors duration-[160ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:text-text";
/* target  */  "… transition-colors duration-[160ms] ease-[var(--ease-hover)] hover:text-text";
```

## Repo conventions to follow

- Motion tokens live in the `@theme` block of `app/globals.css` alongside
  `--ease-fluid` (line 27), and are consumed in `className` strings as
  `ease-[var(--token)]` — exemplar `components/ProjectCard.tsx:33`:
  `ease-[var(--ease-fluid)]`.
- Keep the existing `transition-*` and `duration-*` utilities on each element
  exactly as they are; only the `ease-[…]` utility changes.

## Steps

1. In `app/globals.css`, inside the `@theme { … }` block, immediately after the
   `--ease-fluid: cubic-bezier(0.23, 1, 0.32, 1);` line (line 27), add:
   `--ease-hover: cubic-bezier(0.25, 0.1, 0.25, 1);` (a comment above it is
   encouraged, per the Target excerpt).
2. In each file/line below, replace the exact substring
   `ease-[cubic-bezier(0.25,0.1,0.25,1)]` with `ease-[var(--ease-hover)]`:
   - `app/page.tsx` lines 11, 13
   - `components/SiteHeader.tsx` line 29 **only** (NOT line 13)
   - `components/SiteFooter.tsx` lines 8, 11, 14
   - `app/projects/[slug]/page.tsx` lines 26, 42, 209
   - `app/articles/[slug]/page.tsx` line 36
3. Do a final grep to confirm no `ease-[cubic-bezier(0.25,0.1,0.25,1)]` remains
   except `components/SiteHeader.tsx:13`.

## Boundaries

- Do NOT touch `components/SiteHeader.tsx:13` — plan 002 owns it.
- Do NOT change the curve's numeric value, durations, `transition-*` property
  lists, or any hover/active values. This is a pure spelling swap.
- Do NOT touch `--ease-fluid` or any `ease-[var(--ease-fluid)]` usage.
- On `app/projects/[slug]/page.tsx:209` the element also animates `scale` on this
  curve; leaving `scale` on `--ease-hover` here is intentional and in scope for
  this plan (behavior-preserving). Do NOT "upgrade" it to `--ease-fluid` — that
  would be a behavior change outside this finding.
- Do NOT add dependencies.
- If any listed line does not contain the exact literal (drift since commit
  bc57d6e), STOP and report which lines mismatched instead of guessing.

## Verification

- **Mechanical**:
  - `grep -rn "cubic-bezier(0.25,0.1,0.25,1)" app components` returns **only**
    `components/SiteHeader.tsx:13`.
  - `grep -n "\-\-ease-hover" app/globals.css` shows the new token.
  - Typecheck and `next build` pass.
- **Feel check**: run the app and hover nav links, footer links, hero profile
  links, and the "View all / Read all" links. The color fade must look
  **identical to before** — this change is invisible if done right. Any visible
  difference means a wrong value was substituted.
- **Done when**: the token exists, all 10 listed sites reference
  `ease-[var(--ease-hover)]`, only SiteHeader line 13 still holds the literal,
  and hovers look unchanged.
