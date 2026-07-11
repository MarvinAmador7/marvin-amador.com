# Article design: Durable agentic workflows — surviving the crash mid-run

**Date:** 2026-07-11
**Status:** Approved (brainstorming complete)
**Deliverable:** One new `Article` entry prepended to `articles` in `lib/content.ts`. No schema changes.

## Thesis

Durability is the unlock. Agents fail constantly; the interesting engineering in a production
agent system is making every run resumable, budgeted, and verifiable after any failure — not
writing better prompts.

## Source material

The Grivara OPS agent execution layer: a small Bun service running Pi coding agents
(`@earendil-works/pi-coding-agent`) inside Smithers durable workflows (`smithers-orchestrator`),
checkpointing to Postgres, deployed on Fly.io. Verified against the real codebase
(private repo, codename omitted from the article).

## Confidentiality (user decision: option B)

- Grivara OPS is named (already public on the portfolio).
- All code excerpts are sanitized illustrations of real patterns: simplified names, no internal
  URLs, env var names, route paths, codenames, or vendor-specific credentials.
- Smithers and Pi are named as the open-source building blocks.

## Metadata

- **Title:** Durable agentic workflows: surviving the crash mid-run
- **Deck:** Agents fail constantly. The interesting engineering in Grivara OPS wasn't the
  prompts — it was making every agent run resumable, budgeted, and verifiable after any failure.
- **Slug:** `durable-agentic-workflows-surviving-the-crash-mid-run`
- **Date:** 2026-07-11 · **Read time:** ~13 min · **Tags:** `agents`, `durability`, `systems`
- **Position:** first in the `articles` array (list is newest-first).

## Structure (6 sections, 2–4 paragraphs each)

1. **The failure that shaped the architecture** — narrative open, no code. Mid-run crash
   scenario; claim that interruption-survival, not prompt quality, is the hard problem.
   Brief sketch of the stack as setting.
2. **The run ID is the unit of truth** — opaque `agentRunId` is the only thing that crosses
   the wire; same ID keys Smithers checkpoints, making resume trivial. Capability exchange:
   credentials/request/policy pulled just-in-time, never persisted. *Code:* minimal
   `<Workflow><Task>` JSX with prompt-as-children, Zod output contract, agent binding.
3. **At-least-once execution, exactly-once effect** — 15s recovery poll re-enqueues
   interrupted runs; in-flight de-dupe makes re-delivery harmless; checkpoint resume makes
   crashes invisible. *Code:* recovery loop sketch.
4. **Contention is not failure** — two workers racing to resume one run; claim-arbitration
   codes classified as "not yours" and never reported as failure, while real model errors
   still propagate. *Code:* contention classifier.
5. **Budgets are abort conditions, not dashboards** — streamed usage events feed live
   enforcement; exceeding `maxTurns`/`maxCostUsd` aborts mid-run with a labeled limit code.
   *Code:* `onProgress` budget enforcement.
6. **Never trust the agent's own report** — idempotent terminal callback; API independently
   re-validates output (re-parses schema, re-runs preview server-side). Closes by resolving
   the opening crash. Code optional.

## Voice & format

- First-person, decision-oriented, matching the three existing articles.
- Fits the existing `Article` type exactly (`sections: {heading, body, code?}[]`).

## Follow-up (out of scope for this article)

Link the Grivara OPS case study's agent-governance chapter to this article using the new
`ArticleRef` component (`components/ArticleRef.tsx`).
