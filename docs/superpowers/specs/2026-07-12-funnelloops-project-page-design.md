# FunnelLoops project page design

Date: 2026-07-12
Status: Approved for implementation

## Goal

Add a second flagship case study project, FunnelLoops, to the portfolio, following the structural conventions established by the Grivara OPS project page (data-driven case study in `lib/content.ts`, chapter diagrams in `CaseStudyDiagram`, audience lens, principles, closing) without being limited by them.

## Source of truth

`~/Developer/personal/ai-funnels` (pnpm + Turborepo monorepo). The featured AI architecture is `apps/ai-next` (Rivet agentOS + Pi agent). The deprecated `apps/ai` (VoltAgent) and the earlier Mastra system are explicitly excluded from the story: no rewrite narrative, no references to prior agent frameworks. Every architectural claim must be verifiable against `apps/ai-next` source, `packages/backend` (Convex), `packages/integration-sdk`, `packages/integrations/hubspot`, `packages/analytics-sdk`, `packages/tinybird`, and `apps/web`.

## Honesty constraints

- Stage is "Pre-launch"; do not claim production traffic or customers.
- Benchmarks: 11/11 natural-language operations pass (from repo evidence); 64 unit tests in the agent service. Do not invent latency numbers.
- HubSpot is the production-ready connector; other connectors exist but are not claimed as complete.
- Public link: https://funnelloops.com.
- Writing style: no em-dashes; periods, colons, commas. Natural first-person voice matching the Grivara case study register.

## Narrative

Lede: the agent edits a file instead of generating perfect output. Thesis: a funnel is a typed document with strict semantics; the agent works like an engineer (read spec, load skill, surgical jq edit, submit to a validator that rejects broken structure). The platform around it is built on the same document: canvas builder, versioned publishing, canonical CRM sync, real-time decision analytics.

## Case study structure

Architecture (system map, 4 layers): Surfaces (builder, published runtime, agent share one spec) / Agent runtime (micro-VM, /funnel.json, markdown skills) / Data authority (Convex owns funnels, versions, teams, submissions) / Pipelines (integration CDC outbox, Tinybird analytics).

Chapters (7), each with a new diagram kind:

1. 01 / Product model — "A funnel is a typed document, not a pile of pages" — visual `funnel-spec`. Flat v2 spec, inline discriminated-union routing (linear, conditional, split-test, multi-path), actions reference trigger steps, 18 field types, editor state kept out of the spec.
2. 02 / Agent runtime — "Give the agent a filesystem, not a flowchart" — visual `skill-runtime`. Pi agent in sandboxed agentOS micro-VM, /funnel.json edited with jq, seven markdown skills behind SKILLS.md index, short system prompt, model routing via Vercel AI Gateway, no credentials inside the VM.
3. 03 / Correctness boundary — "Validate and reject beats generate and repair" — visual `validation-gate`. Zod schema plus structural validator: terminal step, targets exist, DFS cycle check, BFS reachability, split weights sum to 100, conditional fallback required. Rejections carry actionable messages; the platform never repairs agent output.
4. 04 / State and streaming — "The database is the product; the stream is presentation" — visual `artifact-sync`. Host toolkit (sync, publish, analytics, load) through an authenticated agent-tools gateway into Convex; debounced, content-hash-deduped auto-sync; builder subscribes to Convex; stream adapter translates agent events to the AI SDK wire protocol for the chat UI only.
5. 05 / Integrations — "One canonical contact, many CRMs" — visual `integration-outbox`. Declarative integration SDK (config generates adapters, manifests, tools), canonical entities (contact, lead, company, deal) with external refs, CDC outbox with payload-hash dedup and bounded retries, signature-verified idempotent webhooks, HubSpot as the production-ready reference, contract tests.
6. 06 / Analytics — "Every visitor decision becomes a queryable event" — visual `event-pipeline`. 18-type event taxonomy, batching SDK, Tinybird raw datasources and materialized views, pipes for conversion funnel, step breakdown, time series, journey Sankey; routing decisions recorded as events; read-only analytics command feeds insight back to the agent.
7. 07 / Verification — "Benchmarks that speak the user's language" — visual `benchmark-harness`. Natural-language-only benchmark harness, 11 operations across 4 categories with programmatic verifiers, 11/11 pass; 64 unit tests including tests over the skill markdown itself. Related article: designing-evaluations-that-catch-real-regressions.

Closing: the product is a document system with several editors (canvas for humans, sandboxed agent for language, runtime for visitors) converging on one validated spec; agent capability grows by writing skills while the validation and gateway boundaries stay fixed.

## Implementation

- `lib/content.ts`: extend the chapter `visual` union with the 7 new kinds; add the `funnelloops` project entry (slug `funnelloops`, year 2026, color `cyan`, icon `Filter`, link to funnelloops.com) positioned after `grivara-ops`.
- `components/FunnelLoopsDiagrams.tsx`: new file exporting the 7 diagram components, using the existing visual language (box/plane/arrow primitives, diagram color tokens).
- `components/CaseStudyDiagram.tsx`: extend `insights`, `titles`, and the switch to cover the new kinds, importing from `FunnelLoopsDiagrams`.
- No changes needed to listing pages: home, /projects, and /projects/[slug] render from the `projects` array.
- Verify with a production build.
