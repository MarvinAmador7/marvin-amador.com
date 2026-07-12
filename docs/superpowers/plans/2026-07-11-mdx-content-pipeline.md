# MDX Content Pipeline (Articles) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Author articles as `.mdx` files with markdown-style prose and embedded components, replacing the typed `articles` array in `lib/content.ts`.

**Architecture:** Content lives in `content/articles/<slug>.mdx` with zod-validated frontmatter. A loader (`lib/articles.ts`) reads frontmatter for list pages and `compileMDX` (next-mdx-remote/rsc) renders the body in a Server Component. A component map (`components/mdx-components.tsx`) styles standard markdown to match the site and exposes `<Diagram>`/`<ArticleRef>`. Fully static (SSG).

**Tech Stack:** Next 16 (App Router, RSC), React 19, TypeScript, Tailwind v4, `next-mdx-remote`, `gray-matter`, `zod`.

## Global Constraints

- No test runner in this repo. The verification cycle for every task is: `npx tsc --noEmit`, then `npx next build`, then (where a page changes) load it via a running `next start` and confirm render. Treat a clean typecheck + successful static generation of the affected route as the passing gate.
- No em-dash (`—`) characters in any authored article prose. Use periods, colons, or commas. (Verify per file: `grep -c "—" content/articles/<slug>.mdx` must print `0`.)
- Voice: first person, direct, no AI-slop tics (house style, see `MEMORY.md`).
- Do not change article copy during migration; move the existing text verbatim (minus structural wrappers).
- Fully static: every route must appear under "○ (Static)" or "● (SSG)" in `next build` output; nothing dynamic.
- Keep `profile`, `navItems`, `principles`, and `projects` in `lib/content.ts`. Only the `articles` array and `Article` type are removed (Task 5).

---

### Task 1: Pipeline foundation (deps, schema, loader, component map)

**Files:**
- Modify: `package.json` (add deps)
- Create: `content/articles/.gitkeep`
- Create: `lib/articles.ts`
- Create: `components/mdx-components.tsx`

**Interfaces:**
- Produces:
  - `articleFrontmatterSchema` (zod), `type ArticleFrontmatter = z.infer<...>`, `type ArticleMeta = ArticleFrontmatter & { slug: string }`
  - `getArticleSlugs(): string[]`
  - `getArticleMeta(slug: string): ArticleMeta`
  - `getAllArticleMeta(): ArticleMeta[]` (excludes `draft`, sorted date desc)
  - `getArticleSource(slug: string): string`
  - `mdxComponents` (object passed to `compileMDX`)

- [ ] **Step 1: Install dependencies**

Run:
```bash
npm install next-mdx-remote gray-matter zod
```
Expected: added to `dependencies`, no peer-dep errors that block install.

- [ ] **Step 2: Create the content directory**

Run:
```bash
mkdir -p content/articles && touch content/articles/.gitkeep
```

- [ ] **Step 3: Write the loader `lib/articles.ts`**

```ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");

export const articleFrontmatterSchema = z.object({
  title: z.string(),
  deck: z.string(),
  date: z.string(),
  readTime: z.string(),
  tags: z.array(z.string()),
  heroLogos: z.array(z.enum(["pi", "smithers"])).optional(),
  references: z.array(z.object({ label: z.string(), href: z.string() })).optional(),
  draft: z.boolean().optional().default(false),
});

export type ArticleFrontmatter = z.infer<typeof articleFrontmatterSchema>;
export type ArticleMeta = ArticleFrontmatter & { slug: string };

function readArticleFile(slug: string): string {
  return fs.readFileSync(path.join(ARTICLES_DIR, `${slug}.mdx`), "utf8");
}

export function getArticleSlugs(): string[] {
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getArticleMeta(slug: string): ArticleMeta {
  const { data } = matter(readArticleFile(slug));
  const frontmatter = articleFrontmatterSchema.parse(data);
  return { ...frontmatter, slug };
}

export function getAllArticleMeta(): ArticleMeta[] {
  return getArticleSlugs()
    .map(getArticleMeta)
    .filter((meta) => !meta.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticleSource(slug: string): string {
  return readArticleFile(slug);
}
```

- [ ] **Step 4: Write the component map `components/mdx-components.tsx`**

```tsx
import type { MDXComponents } from "mdx/types";
import { ArticleDiagram, type ArticleDiagramKind } from "@/components/ArticleDiagram";
import { ArticleRef } from "@/components/ArticleRef";

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-[68px] mb-6 font-heading text-[2.1rem] font-medium leading-[1.12] max-[640px]:text-[1.75rem]"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="mt-10 mb-4 font-heading text-[1.4rem] font-medium leading-[1.2]" {...props} />
  ),
  p: (props) => (
    <p className="mb-6 font-ui text-[0.94rem] leading-[1.9] text-[#aaa9a4]" {...props} />
  ),
  ul: (props) => <ul className="mb-6 list-none p-0" {...props} />,
  li: (props) => (
    <li
      className="mb-2 pl-4 text-[0.9rem] leading-[1.8] text-dim before:mr-2 before:-ml-4 before:text-primary before:content-['+']"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-9 border-l-2 border-primary pl-[26px] font-heading text-[1.5rem] font-medium leading-[1.3] text-text max-[640px]:pl-5 max-[640px]:text-[1.25rem]"
      {...props}
    />
  ),
  a: (props) => (
    <a className="text-primary underline underline-offset-[3px] hover:opacity-80" {...props} />
  ),
  pre: (props) => (
    <pre
      className="mb-6 mt-[30px] overflow-x-auto border border-line bg-surface-raised p-6 font-ui text-[0.78rem] leading-[1.75] text-[#d7d7d1]"
      {...props}
    />
  ),
  Diagram: ({ kind }: { kind: ArticleDiagramKind }) => <ArticleDiagram kind={kind} />,
  ArticleRef,
};
```

- [ ] **Step 5: Verify typecheck**

Run: `npx tsc --noEmit`
Expected: exits 0 (no errors). `getAllArticleMeta` over an empty dir returns `[]` at runtime, which is fine for now.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json content/articles/.gitkeep lib/articles.ts components/mdx-components.tsx
git commit -m "feat(content): add MDX article pipeline foundation (loader, schema, component map)"
```

---

### Task 2: Article layout + page rendering + first migrated article

**Files:**
- Create: `components/ArticleLayout.tsx`
- Create: `content/articles/durable-agentic-workflows-surviving-the-crash-mid-run.mdx`
- Modify: `app/articles/[slug]/page.tsx` (full rewrite of body)
- Modify: `app/globals.css` (add `.article-body` section-number counter)

**Interfaces:**
- Consumes: `articleFrontmatterSchema`, `getArticleSource`, `getArticleSlugs`, `getArticleMeta`, `mdxComponents` (Task 1); `toolLogos` (`components/ToolLogos.tsx`); `ArticleRef`.
- Produces: `ArticleLayout({ frontmatter, children })`.

- [ ] **Step 1: Add the section-number counter to `app/globals.css`**

Append (keeps the current "01 / 02" numbered-heading look now that sections are freeform):
```css
.article-body {
  counter-reset: article-section;
}
.article-body h2 {
  position: relative;
}
.article-body h2::before {
  counter-increment: article-section;
  content: counter(article-section, decimal-leading-zero);
  display: block;
  margin-bottom: 14px;
  font-family: var(--font-ui);
  font-size: 0.7rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--quiet);
}
```

- [ ] **Step 2: Write `components/ArticleLayout.tsx`**

```tsx
import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ArticleRef } from "@/components/ArticleRef";
import { toolLogos } from "@/components/ToolLogos";
import type { ArticleFrontmatter } from "@/lib/articles";

export function ArticleLayout({
  frontmatter,
  children,
}: {
  frontmatter: ArticleFrontmatter;
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto min-h-[calc(100vh-88px)] max-w-[830px] px-7 pb-[112px] max-[640px]:px-5">
        <Link
          href="/articles"
          className="flex w-fit items-center gap-[7px] pt-[38px] text-[0.72rem] text-dim transition-colors duration-[160ms] ease-[var(--ease-hover)] hover:text-text"
        >
          <ArrowLeft size={16} /> Articles
        </Link>

        <article className="pt-[74px]">
          <header data-reveal className="border-b border-line pb-[54px]">
            <p className="m-0 text-[0.7rem] uppercase text-quiet">Article / {frontmatter.readTime}</p>
            <h1 className="mt-6 mb-[30px] font-heading text-[4.35rem] font-medium leading-[0.96] max-[640px]:mt-[22px] max-[640px]:text-[3rem]">
              {frontmatter.title}
            </h1>
            <p className="mb-0 max-w-[650px] text-dim leading-[1.75]">{frontmatter.deck}</p>
            <div className="mt-9 flex items-center gap-5 text-[0.68rem] uppercase text-quiet max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-[9px]">
              <time dateTime={frontmatter.date}>{frontmatter.date}</time>
              <span>{frontmatter.tags.join(" · ")}</span>
              {frontmatter.heroLogos?.length ? (
                <span className="ml-auto flex items-center gap-4 max-[640px]:ml-0">
                  {frontmatter.heroLogos.map((kind) => {
                    const { Logo, href, label } = toolLogos[kind];
                    return (
                      <a
                        key={kind}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={label}
                        className="text-quiet transition-colors duration-[160ms] ease-[var(--ease-fluid)] hover:text-text"
                      >
                        <Logo size={22} />
                      </a>
                    );
                  })}
                </span>
              ) : null}
            </div>
          </header>

          <div data-reveal className="article-body pt-[68px]" style={{ "--reveal-delay": "60ms" } as CSSProperties}>
            {children}
          </div>

          {frontmatter.references?.length ? (
            <footer data-reveal className="mt-[74px] border-t border-line pt-[38px]">
              <p className="m-0 mb-5 text-[0.7rem] uppercase text-quiet">References</p>
              <div className="flex flex-col items-start gap-[9px]">
                {frontmatter.references.map((reference) => (
                  <ArticleRef key={reference.href} href={reference.href} label={reference.label} />
                ))}
              </div>
            </footer>
          ) : null}
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
```

- [ ] **Step 3: Create the first MDX article**

Create `content/articles/durable-agentic-workflows-surviving-the-crash-mid-run.mdx`. Frontmatter mirrors the current `articles[0]` entry in `lib/content.ts`; body converts each section as: `## {heading}`, then `<Diagram kind="{visual}" />`, then each `body[]` paragraph as its own markdown paragraph, then a fenced ```` ```tsx ```` block for `code` if present.

```mdx
---
title: "Durable agentic workflows: surviving the crash mid-run"
deck: "Agents fail constantly. The interesting engineering in Grivara OPS wasn't the prompts. It was making every agent run resumable, budgeted, and verifiable after any failure."
date: "2026-07-11"
readTime: "14 min"
tags: ["agents", "durability", "systems"]
heroLogos: ["smithers", "pi"]
references:
  - { label: "Smithers, the durable workflow orchestrator", href: "https://smithers.sh" }
  - { label: "Pi, the coding agent library", href: "https://pi.dev/" }
---

## An agent run is a durable workflow, not a request

<Diagram kind="crash" />

In Grivara OPS, an administrator can ask an agent to draft an extension package: a proposed set of custom records, relations, and workflows that changes how work orders behave. A single draft makes four or five tool calls and takes a couple of minutes. During development, one of these runs was interrupted partway through when its VM restarted.

By default, an interrupted run is lost. The system starts over from the first tool call, spends the tokens again, and can return a different result the second time. That is acceptable in a demo. It is not acceptable in a product where someone is waiting on the output and every attempt costs money.

So the execution layer treats each run as a durable workflow. The stack is small. Pi, an open source coding agent library, runs the model-and-tools loop. Smithers, a workflow orchestrator, wraps that loop in checkpointed workflows persisted to Postgres. Both run inside one Bun service on a single always-on machine.

Every run makes the same trip: the product API records the run and hands the runner an ID, the runner exchanges that ID for credentials and a spending policy, the workflow executes the agent against the product's tools, and a terminal callback reports the result. The rest of this article covers how each step survives an interruption, which is where most of the design work went.

## The run ID is the unit of truth

<Diagram kind="run-id" />

The runner's HTTP surface accepts almost nothing. A run starts when the product API posts an opaque run ID. No prompt, no credentials, no tool config. The runner calls back to the product to exchange that ID for everything else: the request, a short-lived capability token for tool access, and a policy carrying the model, timeout, and spending limits. Secrets arrive just in time, scoped to one run, and are never written anywhere. The token expires in five minutes, and the tool surface it unlocks is read-only: the agent can inspect business objects and run previews, but every durable write happens in the product, after validation.

The same ID becomes the Smithers workflow ID, which keys every checkpoint in Postgres. That one decision carries most of the durability story. Identity is stable from the user's click to the last checkpoint, so resuming a dead run means starting the workflow again with the same ID and letting Smithers skip everything that already completed.

Workflows themselves are JSX. The prompt is the task's children, the output contract is a Zod schema, and the agent is a prop. I was skeptical of JSX as a workflow language until I had to read one six weeks later: the tree makes the structure obvious, and binding the schema at the task level means the model's answer is validated before the workflow ever sees it.

```tsx
export default smithers(() => (
  <Workflow name="package-composer">
    <Task
      id="compose-package"
      agent={piAgent}
      output={outputs.blueprint}
      retries={0}
    >
      Draft a package blueprint for the pinned work
      order context. Preview it with the preview tool
      before returning. Return only JSON matching the
      blueprint contract.
    </Task>
  </Workflow>
));
```

## At-least-once execution, exactly-once effect

<Diagram kind="delivery" />

Resumability is useless if nothing notices the run died. On boot, and every fifteen seconds after, the runner asks the product API for runs that are queued or have gone stale mid-execution, and posts them back to itself.

This loop is deliberately dumb. It does not track why a run stopped or whether some other process might also retry it. It relies on two properties instead. Re-posting an in-flight run is a no-op: the handler keeps a set of accepted run IDs and answers duplicates without launching anything. And re-running an interrupted run replays from the last checkpoint, so the only work repeated is the terminal callback, which is idempotent on the API side.

This is also the honest answer to why the design is not a job queue with retries. A queue restarts work from zero: same tokens spent again, same tool calls repeated, possibly a different answer at the end. A checkpointed workflow resumes work where it stopped. For jobs where every step costs real money, that difference is the whole argument.

The pattern is old: at-least-once delivery with idempotent effects. What surprised me was how much design pressure it removed. Once duplicate delivery is harmless, you stop writing careful code to prevent it.

```ts
async function recoverInterruptedRuns() {
  const { runIds } = await api.recoverable({ limit: 4 });
  for (const runId of runIds) {
    // Re-posting an active run is a harmless duplicate.
    await enqueue(runId);
  }
}

recoverInterruptedRuns();
setInterval(recoverInterruptedRuns, 15_000);
```

## Contention is not failure

<Diagram kind="contention" />

The recovery loop creates its own race. If a run looks stale because the original worker is slow rather than dead, the retry and the original end up fighting over the same run. Smithers arbitrates ownership with claim codes, and the loser has to know how to lose.

The failure mode this prevents is quiet and nasty: the losing worker reports the run as failed, the product marks it failed, and moments later the winning worker completes it. The user sees a failure that mutates into a success, or a success overwritten by a failure. Classifying contention as not-yours instead of broken keeps the losing worker silent, while real model errors still propagate to the user.

The test suite pins this distinction explicitly, because it is exactly the kind of behavior a refactor destroys without anyone noticing until production.

```ts
const RESUME_CONTENTION = new Set([
  "RUN_OWNER_ALIVE",
  "RUN_STILL_RUNNING",
  "RUN_RESUME_CLAIM_FAILED",
  "RUN_RESUME_CLAIM_LOST",
]);

if (isResumeContention(error)) {
  // Another worker owns this run. Say nothing.
  throw error;
}
await api.failed({ runId, code: classify(error) });
```

## Budgets are abort conditions, not dashboards

<Diagram kind="budget" />

A run that can survive any crash can also, in principle, run forever. Durability makes runaway cost easier, not harder, so the limits have to live inside the execution loop. Smithers streams progress events during a run: token usage, completed turns, tool activity. The runner folds them into counters checked on every event.

When a limit trips, the abort controller kills the run mid-flight and the failure callback tells the product exactly which budget was exceeded. The budgets are small on purpose: a package draft gets six turns and ten cents. If the agent cannot finish inside that, the answer is to fix the task, not raise the ceiling.

I have seen plenty of cost dashboards for LLM systems. They are useful for finance and useless for control, because by the time a human reads one the money is spent. Enforcement inside the run is the difference between knowing you overspent and not overspending.

```ts
// Both passed to the workflow run, alongside an AbortController.
onProgress: (event) => {
  if (event.type === "TokenUsageReported") {
    spentUsd += costOf(event.usage);
  }
  if (event.type === "turn:completed") {
    turns += 1;
  }
  if (spentUsd > policy.maxCostUsd || turns > policy.maxTurns) {
    controller.abort(limitCode(spentUsd, turns));
  }
},
```

## Never trust the agent's own report

<Diagram kind="trust" />

The last boundary is the terminal callback. When a run completes, the runner reports the output, but the product API treats that report as a claim, not a fact. It re-parses the blueprint against the schema, re-runs the preview validation server-side, and enforces the cost ceiling again on its own accounting. The agent is instructed to preview its own work before returning, and it usually does. The system is not built on usually.

That also closes the loop on the run from the opening section. It resumed from its checkpoint after the restart, finished the remaining tool calls, and the draft it produced was re-validated before any administrator saw it. The total user-visible impact of the crash was that the run took a little longer.

None of this is free, and it is worth being honest about the bill. The machine stays warm even when idle, because the recovery loop is what notices dead runs. Every workflow step pays a checkpoint write. And the whole design rests on a discipline that a refactor can quietly break: terminal effects must stay idempotent, because the system is allowed to deliver them twice. I consider all three cheap against the alternative, which is explaining to a user why their run vanished.

None of this is exotic. Checkpointed workflows, idempotent handlers, lease arbitration, and server-side validation are standard distributed-systems furniture. What building this taught me is that agents do not exempt you from any of it. They raise the stakes, because every retry costs real money and every unverified output carries a model's confidence. Prompts got the demo working. Durability made it a product.
```

- [ ] **Step 4: Rewrite `app/articles/[slug]/page.tsx`**

```tsx
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { ArticleLayout } from "@/components/ArticleLayout";
import { mdxComponents } from "@/components/mdx-components";
import {
  articleFrontmatterSchema,
  getArticleMeta,
  getArticleSlugs,
  getArticleSource,
  type ArticleFrontmatter,
} from "@/lib/articles";

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const meta = getArticleMeta(slug);
    return { title: `${meta.title} | Marvin`, description: meta.deck };
  } catch {
    return { title: "Article | Marvin" };
  }
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getArticleSlugs().includes(slug)) {
    notFound();
  }

  const { content, frontmatter } = await compileMDX<ArticleFrontmatter>({
    source: getArticleSource(slug),
    components: mdxComponents,
    options: { parseFrontmatter: true },
  });

  const validated = articleFrontmatterSchema.parse(frontmatter);

  return <ArticleLayout frontmatter={validated}>{content}</ArticleLayout>;
}
```

- [ ] **Step 5: Verify no em-dash in the new article**

Run: `grep -c "—" content/articles/durable-agentic-workflows-surviving-the-crash-mid-run.mdx`
Expected: `0`

- [ ] **Step 6: Typecheck and build**

Run: `npx tsc --noEmit && npx next build`
Expected: typecheck exits 0; build lists `/articles/durable-agentic-workflows-surviving-the-crash-mid-run` under the SSG routes with no errors.

- [ ] **Step 7: Render check**

Run: `(PORT=4322 npx next start >/tmp/next.log 2>&1 &) ; sleep 4 ; curl -s http://localhost:4322/articles/durable-agentic-workflows-surviving-the-crash-mid-run | grep -o "RUN ID\|References\|pi.dev" | sort -u ; pkill -f "next start"`
Expected: output contains `References` and `pi.dev` (hero logos + references render) and the page returns styled prose. Optionally screenshot to confirm the six diagrams and the numbered headings.

- [ ] **Step 8: Commit**

```bash
git add app/globals.css components/ArticleLayout.tsx app/articles/[slug]/page.tsx content/articles/durable-agentic-workflows-surviving-the-crash-mid-run.mdx
git commit -m "feat(content): render articles from MDX; migrate durable-workflows article"
```

---

### Task 3: Migrate the remaining three articles

**Files:**
- Create: `content/articles/designing-evaluations-that-catch-real-regressions.mdx`
- Create: `content/articles/event-sourced-workflows-without-the-ceremony.mdx`
- Create: `content/articles/operational-interfaces-for-engineers.mdx`

**Interfaces:**
- Consumes: the pipeline from Tasks 1-2. No new exports.

**Conversion rule (apply to each remaining entry in the `articles` array of `lib/content.ts`):**
1. Frontmatter keys from the entry: `title`, `deck`, `date`, `readTime`, `tags`, and `heroLogos`/`references` only if present. Quote all string values. `slug` is the filename, not a frontmatter key.
2. For each object in `sections`: emit `## {heading}`, then (if `visual` present) `<Diagram kind="{visual}" />`, then each string in `body` as its own paragraph separated by a blank line, then (if `code` present) a fenced block. Use ```` ```tsx ```` when the code contains JSX/`type`, otherwise ```` ```ts ````.
3. These three articles currently have no `visual` on their sections, so no `<Diagram>` lines. Only `designing-evaluations-that-catch-real-regressions` has a `code` block (in its "Make regressions diffable" section).

- [ ] **Step 1: Create the three MDX files**

For each of the three slugs, open the matching entry in `lib/content.ts` and apply the conversion rule above. Example shape (do not invent copy; copy the existing text verbatim):

```mdx
---
title: "Designing evaluations that catch real regressions"
deck: "How I structure AI product evaluations around observable failure modes instead of abstract benchmark scores."
date: "2026-06-18"
readTime: "9 min"
tags: ["AI quality", "testing", "systems"]
---

## Start from the failure budget

{body paragraph 1, verbatim}

{body paragraph 2, verbatim}

## Make regressions diffable

{body paragraph 1, verbatim}

{body paragraph 2, verbatim}

```ts
type EvaluationResult = {
  caseId: string;
  answerScore: number;
  citationCoverage: number;
  changedFromBaseline: boolean;
  reviewerNote?: string;
};
```

## Keep humans in the loop where judgment matters

{body paragraph 1, verbatim}

{body paragraph 2, verbatim}
```

- [ ] **Step 2: Verify no em-dash across all articles**

Run: `grep -rc "—" content/articles/ | grep -v ":0$" || echo "clean"`
Expected: prints `clean`.

- [ ] **Step 3: Build**

Run: `npx next build`
Expected: all four `/articles/<slug>` routes generate with no errors.

- [ ] **Step 4: Commit**

```bash
git add content/articles/designing-evaluations-that-catch-real-regressions.mdx content/articles/event-sourced-workflows-without-the-ceremony.mdx content/articles/operational-interfaces-for-engineers.mdx
git commit -m "feat(content): migrate remaining three articles to MDX"
```

---

### Task 4: Switch the list page and card to frontmatter

**Files:**
- Modify: `app/articles/page.tsx`
- Modify: `components/ArticleCard.tsx`

**Interfaces:**
- Consumes: `getAllArticleMeta`, `type ArticleMeta` (Task 1).
- Produces: `ArticleCard` now takes `article: ArticleMeta`.

- [ ] **Step 1: Update `components/ArticleCard.tsx` import and prop type**

Change the import line and the component signature. Replace:
```tsx
import { Article } from "@/lib/content";

export function ArticleCard({ article, index = 0 }: { article: Article; index?: number }) {
```
with:
```tsx
import type { ArticleMeta } from "@/lib/articles";

export function ArticleCard({ article, index = 0 }: { article: ArticleMeta; index?: number }) {
```
No other change: `ArticleCard` reads `article.slug`, `article.date`, `article.readTime`, `article.title`, `article.deck`, all present on `ArticleMeta`.

- [ ] **Step 2: Update `app/articles/page.tsx` data source**

Replace:
```tsx
import { articles } from "@/lib/content";
```
with:
```tsx
import { getAllArticleMeta } from "@/lib/articles";
```
Inside the component, before `return`, add:
```tsx
  const articles = getAllArticleMeta();
```
The existing `articles.map((article, index) => <ArticleCard ... />)` is unchanged.

- [ ] **Step 3: Typecheck and build**

Run: `npx tsc --noEmit && npx next build`
Expected: exits 0; `/articles` lists all four cards, newest first.

- [ ] **Step 4: Render check**

Run: `(PORT=4322 npx next start >/tmp/next.log 2>&1 &) ; sleep 4 ; curl -s http://localhost:4322/articles | grep -o "durable-agentic-workflows\|designing-evaluations" | sort -u ; pkill -f "next start"`
Expected: both slugs appear (cards link out correctly).

- [ ] **Step 5: Commit**

```bash
git add app/articles/page.tsx components/ArticleCard.tsx
git commit -m "feat(content): source articles list from MDX frontmatter"
```

---

### Task 5: Remove the legacy article data

**Files:**
- Modify: `lib/content.ts` (remove `Article` type + `articles` array)

**Interfaces:**
- Removes: `Article`, `articles` from `lib/content.ts`. Nothing may import them after Task 4.

- [ ] **Step 1: Confirm no remaining importers**

Run: `grep -rn "from \"@/lib/content\"" app components | grep -v node_modules` then inspect: no file should use `articles` or the `Article` type. Also run `grep -rn "\barticles\b\|\bArticle\b" app/articles components/ArticleCard.tsx` to confirm all references now point at `@/lib/articles`.
Expected: only `@/lib/articles` usages remain for article data.

- [ ] **Step 2: Delete the `Article` type and `articles` array from `lib/content.ts`**

Remove the `export type Article = { ... }` block and the entire `export const articles: Article[] = [ ... ];` block. Leave `profile`, `projects`, `Project`, `principles`, `navItems`, and the icon exports intact.

- [ ] **Step 3: Typecheck and build**

Run: `npx tsc --noEmit && npx next build`
Expected: exits 0; all 12 routes still generate (4 article routes now sourced from MDX).

- [ ] **Step 4: Commit**

```bash
git add lib/content.ts
git commit -m "refactor(content): drop legacy articles array now served from MDX"
```

---

## Self-Review

**Spec coverage:**
- Pipeline (next-mdx-remote/rsc + gray-matter + zod) → Task 1. ✓
- Frontmatter schema (all fields incl. `draft` default) → Task 1 Step 3. ✓
- Component layer (markdown element map + `<Diagram>`/`<ArticleRef>`) → Task 1 Step 4. ✓
- `ArticleLayout` (hero from frontmatter, body slot, references footer) → Task 2 Step 2. ✓
- Thin `[slug]/page.tsx` via `compileMDX` → Task 2 Step 4. ✓
- List page reads frontmatter only → Task 4. ✓
- Migration of all 4 articles → Tasks 2-3. ✓
- Remove `articles`/`Article` from `content.ts`, keep the rest → Task 5. ✓
- Reveal-once decision (body wrapped in a single `data-reveal`) → Task 2 Step 2. ✓
- Section-number look preserved via CSS counter → Task 2 Step 1. ✓
- No-em-dash constraint enforced per file → Tasks 2-3 grep steps. ✓
- Fully static → build gates in every task. ✓

**Placeholder scan:** The three-article bodies in Task 3 reference existing verbatim copy in `lib/content.ts` rather than reprinting all of it; the conversion rule + example shape make the transform mechanical and unambiguous. The durable article (Task 2) is reproduced in full. No TBD/TODO steps.

**Type consistency:** `ArticleFrontmatter`/`ArticleMeta` used identically across loader (Task 1), layout (Task 2), page (Task 2), card (Task 4). `mdxComponents` key `Diagram` maps to `ArticleDiagramKind`, matching `content.ts`'s current `visual` union. `getArticleSlugs`/`getArticleMeta`/`getArticleSource`/`getAllArticleMeta` names are stable across tasks.
