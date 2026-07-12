# Design: MDX content pipeline (articles)

**Date:** 2026-07-11
**Status:** Approved (brainstorming complete)
**Scope this spec:** Phase 1 — migrate articles to MDX. Projects/case studies are a
separate follow-up (Phase 2) using the same pipeline plus a chapter component vocabulary.

## Goal

Author articles as `.mdx` files with markdown-style prose and embedded components,
instead of editing a typed data array in `lib/content.ts`. Each piece composes its own
structure (freeform body); typed frontmatter drives list/card metadata.

User decisions:
- Authoring model: **markdown-style (MDX)**.
- Structure: **freeform per piece** (body), with typed frontmatter at the boundary.
- Library: **next-mdx-remote/rsc** (+ gray-matter + zod). Velite is the upgrade path if
  the collection grows past ~15–20 pieces.
- Scope: **Phase 1 (articles) now**, Phase 2 (projects) later.

## Architecture

Content lives in `content/articles/<slug>.mdx`. The slug is the filename.

A loader (`lib/articles.ts`) provides:
- `getAllArticleMeta()` → validated frontmatter for every non-draft article, sorted by
  date desc. Reads frontmatter only (no MDX compile) for list/card pages.
- `getArticleSlugs()` → for `generateStaticParams`.
- `getArticleBySlug(slug)` → `{ frontmatter, content }` where `content` is compiled via
  `compileMDX` in a Server Component.

Fully static: `generateStaticParams` enumerates the content dir; nothing is dynamic.

## Frontmatter schema (zod)

```
title: string
deck: string
date: string (YYYY-MM-DD)
readTime: string
tags: string[]
heroLogos?: ("pi" | "smithers")[]
references?: { label: string; href: string }[]
draft?: boolean            // default false; excluded from lists and params
```
Zod validation runs at load; a malformed file fails the build. Body is freeform.

## Component layer (the "abstract content elements" piece)

- `mdx-components.tsx` — maps standard markdown to site typography so authored prose
  renders natively:
  - `h2` → section heading (`font-heading` size/leading used today)
  - `h3` → sub-heading
  - `p`  → prose paragraph (`mb-6 font-ui text-[0.94rem] leading-[1.9] text-[#aaa9a4]`)
  - `pre`/`code` → bordered code panel (`bg-surface-raised`, `overflow-x-auto`)
  - `ul`/`li`, `blockquote`, `a` (styled link)
- Custom components available in MDX bodies:
  - `<Diagram kind="crash" />` → existing `ArticleDiagram`
  - `<ArticleRef href label />` → existing component
  - (room for `<Callout>`, `<Figure>` later)

## Layout

`components/ArticleLayout.tsx` renders:
- hero: kicker (`Article / {readTime}`), title, deck, date, tags, `heroLogos` (via
  `toolLogos`) — from frontmatter
- the compiled MDX body (slot)
- references footer (from frontmatter) using `ArticleRef`

`app/articles/[slug]/page.tsx` becomes thin: resolve slug → `getArticleBySlug` →
`<ArticleLayout frontmatter={fm}>{content}</ArticleLayout>`. `generateMetadata` reads
frontmatter.

`app/articles/page.tsx` (list) switches to `getAllArticleMeta()`; `ArticleCard` keeps its
current props (title, deck, date, readTime, slug) sourced from frontmatter.

## Migration

Convert the 4 existing articles from the `articles` array into `.mdx`:
- body string-arrays → markdown paragraphs
- `section.visual` → `<Diagram kind="..." />` placed after each `##` heading
- `section.code` → fenced code block
- `heroLogos`, `references`, `tags`, etc. → frontmatter

After migration: remove the `articles` export and `Article` type from `lib/content.ts`.
Keep `profile`, `navItems`, `principles`, and (for now) `projects`.

House style stays: no em-dash characters; first-person, direct voice.

## Out of scope (Phase 2)

Projects/case studies to MDX. Same pipeline, plus components for the structured chapter
layout: `<Chapter>`, `<Principle>`, `<DetailList>`, `<StatSidebar>`, and the
project-diagram vocabulary. Tracked separately.

## Risks / notes

- `next-mdx-remote` v5 `/rsc` entry must compile under Next 16 / React 19 RSC. Verify with
  a build before migrating all four articles (migrate one first, build, then the rest).
- Reveal animation (`data-reveal`) currently wraps each `<section>`. In freeform MDX the
  body is one stream; decide whether to keep per-section reveal (wrap `h2` groups) or
  reveal the body once. Default: reveal the body once to avoid coupling authoring to markup.
