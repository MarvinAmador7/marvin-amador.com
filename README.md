# Marvin Portfolio

A Next.js portfolio for presenting selected projects and deep technical articles.

## Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Edit Content

Most portfolio content lives in `lib/content.ts`:

- `profile` controls the hero copy and contact links.
- `projects` controls project cards and case study pages.
- `articles` controls writing cards and article pages.
- `principles` controls the bottom homepage section.

Each project and article uses a `slug`; changing a slug changes its URL.

## Useful Commands

```bash
npm run lint
npm run build
npm audit --omit=dev
```
