import {
  ArrowRight,
  Boxes,
  Braces,
  Cpu,
  Database,
  GitBranch,
  Network,
  ShieldCheck,
  TerminalSquare,
} from "lucide-react";

export type Project = {
  slug: string;
  title: string;
  year: string;
  eyebrow: string;
  summary: string;
  problem: string;
  outcome: string;
  stack: string[];
  metrics: string[];
  links: {
    label: string;
    href: string;
  }[];
  color: "oxide" | "cyan" | "olive" | "ink";
  icon: typeof Cpu;
  caseStudy?: {
    stage: string;
    role: string;
    lede: string;
    thesis: string;
    architecture: {
      label: string;
      title: string;
      detail: string;
    }[];
    chapters: {
      kicker: string;
      title: string;
      visual:
        | "operational-graph"
        | "tenant-boundary"
        | "extension-stack"
        | "workflow-kernel"
        | "dispatch-funnel"
        | "agent-boundary"
        | "offline-replay";
      body: string[];
      principle?: string;
      details?: string[];
      relatedArticle?: { slug: string; label: string };
    }[];
    closing: {
      title: string;
      body: string[];
    };
  };
};

export type Article = {
  slug: string;
  title: string;
  deck: string;
  date: string;
  readTime: string;
  tags: string[];
  sections: {
    heading: string;
    body: string[];
    code?: string;
    visual?: "crash" | "run-id" | "delivery" | "contention" | "budget" | "trust";
  }[];
  references?: {
    label: string;
    href: string;
  }[];
  heroLogos?: ("pi" | "smithers")[];
};

export const profile = {
  name: "Marvin",
  role: "Software engineer building reliable product systems",
  location: "Costa Rica",
  availability: "Open to product engineering and AI infrastructure work",
  email: "marvin.ac.cr@gmail.com",
  github: "https://github.com/marvinamador7",
  linkedin: "https://www.linkedin.com/in/marvinamadorcampos/",
  x: "https://x.com/marv_amador",
  intro:
    "I design and ship full-stack systems with a bias for durable architecture, clear interfaces, and operational visibility. This portfolio is built to show the work behind the work: project decisions, tradeoffs, and technical writing.",
};

export const projects: Project[] = [
  {
    slug: "grivara-ops",
    title: "Grivara OPS",
    year: "2026",
    eyebrow: "Agentic operations platform",
    summary:
      "A multi-tenant operating system connecting equipment, crews, work orders, maintenance, budgets, and governed agents in one operational model.",
    problem:
      "Equipment-heavy field teams run the asset, the work, the people, and the money in separate systems. The result is not just fragmented software; it is an operation without a shared understanding of what is true now.",
    outcome:
      "A production-shaped platform spanning a web operations console, an offline-capable field app, a deterministic workflow kernel, and a governed agent execution layer. Grivara OPS is currently in early access.",
    stack: [
      "TanStack Start",
      "TypeScript",
      "ORPC",
      "PostgreSQL + PostGIS",
      "Drizzle",
      "Better Auth",
      "Trigger.dev",
      "Expo",
      "Smithers + Pi",
    ],
    metrics: [
      "Autonomous agent execution",
      "Governed capability boundary",
      "Durable + recoverable workflows",
    ],
    links: [
      { label: "Visit Grivara OPS", href: "https://getops.grivara.com/en" },
    ],
    color: "oxide",
    icon: Network,
    caseStudy: {
      stage: "Early access",
      role: "Product architecture · Full-stack engineering · Agent systems",
      lede: "Most teams start an agentic product with a chat box. I started with authority.",
      thesis:
        "An agent is only as trustworthy as the system that defines what it can know, what it may change, and how every decision can be reconstructed. I built Grivara OPS from that premise: first model the operation, then make it durable, then expose carefully governed capabilities to agents. The intelligence sits on top of the truth; it never replaces it.",
      architecture: [
        {
          label: "01 / Surfaces",
          title: "One operation, three interfaces",
          detail: "A web command center for managers, an offline-capable mobile app for field crews, and a constrained runtime for specialized agents.",
        },
        {
          label: "02 / Contract",
          title: "Typed at every boundary",
          detail: "ORPC and Zod carry one contract from React clients into organization-scoped procedures, with no client-trusted tenant identifiers.",
        },
        {
          label: "03 / Operational core",
          title: "Shared domain truth",
          detail: "Assets, work orders, skills, calendars, dispatch, maintenance, parts, budgets, and workflows reference the same records.",
        },
        {
          label: "04 / Execution",
          title: "Postgres owns the state",
          detail: "PostgreSQL and PostGIS hold business truth; transactional outboxes and background workers deliver effects without becoming the authority.",
        },
      ],
      chapters: [
        {
          kicker: "01 / Product model",
          title: "The operation is a graph, not a collection of screens",
          visual: "operational-graph",
          body: [
            "The visible product promise is simple: know where every asset is, keep maintenance on schedule, send the right crew, and understand what the work is costing. The difficult part is that none of those questions belongs to a single module. Availability depends on bookings and maintenance. Dispatch depends on skills, calendars, geography, workload, and the work order itself. Budget depends on the asset and on every open or completed job around it.",
            "I resisted the familiar SaaS pattern of building isolated feature areas and reconciling them later. Equipment, field work, and cost control were modeled as one operational graph. A work order is not a ticket floating in space; it can reference equipment, a location, required skills, assigned people or teams, parts, stops, evidence, SLA state, and a budget allocation. That shared model is what lets the map, calendar, maintenance history, and financial view agree with one another.",
            "This decision made the product harder to fake and easier to extend. Every new surface inherits the same truth instead of creating a parallel version of it. More importantly, an agent can reason across the operation because the relationships already exist in the product model. Retrieval is not being asked to invent structure that the application failed to capture.",
          ],
          principle: "Model the decisions the operation makes, not the pages the software happens to show.",
        },
        {
          kicker: "02 / Tenancy and access",
          title: "Make unsafe access structurally difficult",
          visual: "tenant-boundary",
          body: [
            "Multi-tenancy is not middleware sprinkled onto handlers. Grivara OPS has an organization-scoped procedure builder that resolves the active organization and membership from the authenticated session, then injects authorization helpers into the request context. Domain procedures do not accept an organization ID from the browser. The trusted tenant boundary arrives from the server, and query functions receive it as an explicit argument.",
            "I separated transport from business access. Routers validate input, enforce the permission required for the operation, and shape the response. Query functions own database behavior and accept a database handle, which keeps them testable and usable from both request paths and background tasks. Better Auth owns sessions and organization membership; a role-resource-action matrix owns what a member may do inside that organization.",
            "This is not the most glamorous part of an agentic platform, but it is the part that determines whether autonomy can ever be trusted. When tools and agents arrived later, they inherited the same organization and permission boundary. There was no second security model to reconcile and no privileged shortcut around the application.",
          ],
          principle: "If a boundary matters, encode it in the construction of the API instead of relying on every caller to remember it.",
          details: [
            "Session-derived organization scope",
            "Role, resource, and action permissions",
            "Zod validation at procedure boundaries",
            "Pure query functions with injected database access",
          ],
        },
        {
          kicker: "03 / Extensibility",
          title: "Configurable without becoming shapeless",
          visual: "extension-stack",
          body: [
            "Operations software always meets the same tension: every company is different, but turning every record into untyped JSON makes the core product impossible to reason about. I kept equipment, work orders, budgets, and their support tables as typed native entities because scheduling, assignments, cost rollups, SLA behavior, and reporting need stable semantics.",
            "Above that core, I designed business schemas for customer-specific fields and custom records, first-class relations between native and custom objects, versioned workflows, and packages that bundle those capabilities. A customer can model a specialized intake process or connect a custom commercial object to a work order without weakening the universal field-service model underneath it.",
            "That package layer also creates the right handoff for generative systems. An agent may compose a draft package, but it cannot silently redefine the live business. Draft artifacts are validated, versioned, reviewed, and published through the same governance path as human-authored configuration. The model proposes; the platform decides what becomes real.",
          ],
          principle: "Generative flexibility belongs in a governed extension layer, not in the tables that carry operational truth.",
        },
        {
          kicker: "04 / Workflow kernel",
          title: "Durable workflows before autonomous agents",
          visual: "workflow-kernel",
          body: [
            "I built the workflow engine as a deterministic state machine with immutable versions and revision-pinned runs. Commands, domain events, approvals, automatic transitions, and timers all enter the same transition planner. Guards are evaluated against the current business record, ambiguous transitions fail closed, and automatic chains are bounded so a definition cannot spin forever.",
            "Every accepted transition writes the run revision, append-only event, planned capability actions, and idempotency evidence transactionally. External effects move through a Postgres outbox and leased workers. Trigger.dev provides delivery and compute, but it never becomes the workflow state authority. If a worker retries, the idempotency key prevents the business action from being applied twice. If a worker disappears, the database lease can be recovered.",
            "Approvals, timers, and incoming events follow the same philosophy. Approval decisions are immutable and revalidate membership and permission at vote time. Timers are pinned to the workflow revision that created them. Event ingress is a durable, idempotent inbox. Before publication, definitions can be simulated without side effects and analyzed against the active version; blocking findings stop publication and warnings require explicit acknowledgement.",
            "The result is a substrate that can accept instructions from people, system events, or agents without changing the meaning of execution. That was the goal: agents should be another governed source of intent, not a special bypass around the application.",
          ],
          principle: "The workflow runtime owns truth; queues and workers only deliver work.",
          details: [
            "Immutable workflow versions and append-only run events",
            "Idempotent commands and transactional capability outbox",
            "Permission-aware approvals, revision-pinned timers, durable event ingress",
            "Side-effect-free simulation and publish governance",
          ],
        },
        {
          kicker: "05 / Dispatch intelligence",
          title: "Explainable recommendations beat theatrical AI",
          visual: "dispatch-funnel",
          body: [
            "Dispatch is where the operational graph becomes a decision. For each work order, Grivara OPS first removes technicians and teams that do not satisfy every required skill or minimum proficiency. It then ranks the qualified set using schedule conflicts, open assignments, recent workload, PostGIS distance from the job, and available quality signals. The dispatcher receives a short, sorted list and keeps the final assignment decision.",
            "The order of operations matters. Qualification is a hard gate, not a score that can be outweighed by proximity. Availability conflicts carry a meaningful penalty. Distance is bounded so geography informs the decision without dominating every other signal. When the work is a shipment, the ranker changes its explanation and emphasizes availability, workload, and proximity to pickup instead of pretending that equipment-service skills are relevant.",
            "I deliberately describe this as intelligent matching, not AI dispatch. The behavior is deterministic, inspectable, and testable. A dispatcher can understand why a candidate ranked well, and the rules can evolve as the operation produces better signals. That honesty makes the feature more useful today and creates a clean baseline against which a future learned ranker can be evaluated.",
          ],
          principle: "Use models where uncertainty creates value. Use explicit rules where the business needs an explanation.",
        },
        {
          kicker: "06 / Agent execution",
          title: "Agents get capabilities, never the database",
          visual: "agent-boundary",
          body: [
            "The agent layer began with a boundary decision: the agent runtime executes reasoning, while Grivara OPS remains the authority for tenants, permissions, business data, workflow state, money, and audit. The runtime receives an opaque run identifier, not database credentials or tenant claims. It exchanges that identifier for a short-lived capability token, and the platform reconstructs the organization, requesting user, membership, allowlist, policy, and run limits on every tool call.",
            "Capabilities are exposed through a typed MCP surface. Tool input is validated, the same role-based permission is enforced again, the per-run allowlist is checked, and the call is claimed against a run limit before it executes. The audit stores the tool, sequence, outcome, duration, and an evidence hash without persisting raw credentials or sensitive payloads. A bearer credential that fails validation never falls back to a browser session.",
            "I introduced autonomy in narrow, reversible increments. The first tools are read-only. Deterministic services calculate official values such as budget forecasts; the agent explains the result and cites the pinned snapshot instead of inventing a number. Package-composition agents can produce drafts, but publication remains governed by validation and human approval. The end-to-end runner path has been live-verified in an isolated environment before any production rollout decision.",
            "This separation is the central architectural bet of Grivara OPS. Models, providers, and agent harnesses can change. The capability boundary, business authority, audit trail, and approval semantics must remain stable. That is what turns an impressive demo into a platform a company can trust with real operations.",
          ],
          principle: "LLMs are replaceable. Authority boundaries are architecture.",
          details: [
            "Typed MCP capabilities with existing RBAC enforcement",
            "Short-lived, run-scoped credentials and fail-closed authentication",
            "Per-run tool, turn, runtime, and cost ceilings",
            "Pinned context, append-only tool evidence, and idempotent callbacks",
          ],
          relatedArticle: {
            slug: "durable-agentic-workflows-surviving-the-crash-mid-run",
            label: "Deep dive: how the durable agent harness survives a crash mid-run",
          },
        },
        {
          kicker: "07 / Field reliability",
          title: "The network is a dependency, not an assumption",
          visual: "offline-replay",
          body: [
            "Field software fails when it is designed from an office connection. The mobile app treats connectivity as a changing system state. TanStack Query is wired to the device network signal, paused mutations are persisted as an outbox, and their mutation functions are registered again at boot so a queued action can survive the process that created it.",
            "For visible field actions, I built one optimistic mutation path that patches the same persisted query caches read by the interface. Completing a work order, recording a task outcome, delivering a stop, logging a part, or capturing calibration state can update immediately while offline and remain visible after a cold restart. When connectivity returns, mutations resume in order and the app waits for the outbox to drain before reconciling with server truth, avoiding the flicker that appears when a mid-queue refetch erases later optimistic changes.",
            "This is more than offline support. It is a product decision about trust. A technician should never wonder whether tapping Complete did anything. The interface reflects intent immediately, exposes queued and failed states honestly, and eventually converges on the server authority. The same architecture that governs agents also governs humans in unreliable environments: intent is durable, execution is bounded, and the final state is auditable.",
          ],
          principle: "Reliable systems preserve user intent across the failures they know will happen.",
        },
      ],
      closing: {
        title: "The real product is the foundation for safe autonomy",
        body: [
          "Grivara OPS looks like a field-operations product because that is the problem users need solved. Underneath, it is a carefully layered decision system: a shared operational model, structural tenancy, deterministic workflows, explainable recommendation engines, offline intent, and a capability boundary that lets agents participate without becoming the authority.",
          "That sequence was deliberate. I did not add governance after an agent demo became dangerous. I designed the truth, permissions, durability, simulation, and audit surfaces first, then gave models the smallest useful window into them. It is slower than building a chatbot and calling it a platform. It is also how you build an agentic system that can earn more autonomy over time.",
          "This is the kind of work I want to keep doing: finding the small set of architectural decisions that let a complex product move quickly without losing control, then carrying those decisions all the way from database invariants to the interface in a technician's hand.",
        ],
      },
    },
  },
  {
    slug: "rag-evaluation-harness",
    title: "RAG Evaluation Harness",
    year: "2026",
    eyebrow: "AI quality system",
    summary:
      "A test harness for retrieval-augmented generation pipelines with repeatable datasets, regression scoring, and reviewer workflows.",
    problem:
      "Model updates improved some answers while silently degrading source coverage and factual consistency elsewhere.",
    outcome:
      "Added scenario suites, citation checks, and diffable scorecards so changes could be reviewed before release.",
    stack: ["Python", "FastAPI", "LangChain", "pgvector", "Playwright"],
    metrics: ["240 eval cases", "4 rubric dimensions", "CI gated releases"],
    links: [
      { label: "Case study", href: "/projects/rag-evaluation-harness" },
      { label: "Repository", href: "https://github.com/" },
    ],
    color: "oxide",
    icon: Network,
  },
  {
    slug: "billing-workflow-engine",
    title: "Billing Workflow Engine",
    year: "2025",
    eyebrow: "Backend architecture",
    summary:
      "A rules-driven billing workflow that handles subscriptions, prorations, invoice previews, and audit trails.",
    problem:
      "Billing behavior lived in scattered conditionals, making pricing changes risky and hard to explain to support.",
    outcome:
      "Moved policy into explicit workflow steps with event history, deterministic previews, and safer migrations.",
    stack: ["Node.js", "Drizzle", "Postgres", "Stripe", "Temporal"],
    metrics: ["99.98% job success", "18 workflow states", "full audit trail"],
    links: [
      { label: "Case study", href: "/projects/billing-workflow-engine" },
      { label: "Repository", href: "https://github.com/" },
    ],
    color: "olive",
    icon: GitBranch,
  },
];

export const articles: Article[] = [
  {
    slug: "durable-agentic-workflows-surviving-the-crash-mid-run",
    title: "Durable agentic workflows: surviving the crash mid-run",
    deck:
      "Agents fail constantly. The interesting engineering in Grivara OPS wasn't the prompts. It was making every agent run resumable, budgeted, and verifiable after any failure.",
    date: "2026-07-11",
    readTime: "14 min",
    tags: ["agents", "durability", "systems"],
    heroLogos: ["smithers", "pi"],
    sections: [
      {
        heading: "An agent run is a durable workflow, not a request",
        visual: "crash",
        body: [
          "In Grivara OPS, an administrator can ask an agent to draft an extension package: a proposed set of custom records, relations, and workflows that changes how work orders behave. A single draft makes four or five tool calls and takes a couple of minutes. During development, one of these runs was interrupted partway through when its VM restarted.",
          "By default, an interrupted run is lost. The system starts over from the first tool call, spends the tokens again, and can return a different result the second time. That is acceptable in a demo. It is not acceptable in a product where someone is waiting on the output and every attempt costs money.",
          "So the execution layer treats each run as a durable workflow. The stack is small. Pi, an open source coding agent library, runs the model-and-tools loop. Smithers, a workflow orchestrator, wraps that loop in checkpointed workflows persisted to Postgres. Both run inside one Bun service on a single always-on machine.",
          "Every run makes the same trip: the product API records the run and hands the runner an ID, the runner exchanges that ID for credentials and a spending policy, the workflow executes the agent against the product's tools, and a terminal callback reports the result. The rest of this article covers how each step survives an interruption, which is where most of the design work went.",
        ],
      },
      {
        heading: "The run ID is the unit of truth",
        visual: "run-id",
        body: [
          "The runner's HTTP surface accepts almost nothing. A run starts when the product API posts an opaque run ID. No prompt, no credentials, no tool config. The runner calls back to the product to exchange that ID for everything else: the request, a short-lived capability token for tool access, and a policy carrying the model, timeout, and spending limits. Secrets arrive just in time, scoped to one run, and are never written anywhere. The token expires in five minutes, and the tool surface it unlocks is read-only: the agent can inspect business objects and run previews, but every durable write happens in the product, after validation.",
          "The same ID becomes the Smithers workflow ID, which keys every checkpoint in Postgres. That one decision carries most of the durability story. Identity is stable from the user's click to the last checkpoint, so resuming a dead run means starting the workflow again with the same ID and letting Smithers skip everything that already completed.",
          "Workflows themselves are JSX. The prompt is the task's children, the output contract is a Zod schema, and the agent is a prop. I was skeptical of JSX as a workflow language until I had to read one six weeks later: the tree makes the structure obvious, and binding the schema at the task level means the model's answer is validated before the workflow ever sees it.",
        ],
        code: `export default smithers(() => (
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
));`,
      },
      {
        heading: "At-least-once execution, exactly-once effect",
        visual: "delivery",
        body: [
          "Resumability is useless if nothing notices the run died. On boot, and every fifteen seconds after, the runner asks the product API for runs that are queued or have gone stale mid-execution, and posts them back to itself.",
          "This loop is deliberately dumb. It does not track why a run stopped or whether some other process might also retry it. It relies on two properties instead. Re-posting an in-flight run is a no-op: the handler keeps a set of accepted run IDs and answers duplicates without launching anything. And re-running an interrupted run replays from the last checkpoint, so the only work repeated is the terminal callback, which is idempotent on the API side.",
          "This is also the honest answer to why the design is not a job queue with retries. A queue restarts work from zero: same tokens spent again, same tool calls repeated, possibly a different answer at the end. A checkpointed workflow resumes work where it stopped. For jobs where every step costs real money, that difference is the whole argument.",
          "The pattern is old: at-least-once delivery with idempotent effects. What surprised me was how much design pressure it removed. Once duplicate delivery is harmless, you stop writing careful code to prevent it.",
        ],
        code: `async function recoverInterruptedRuns() {
  const { runIds } = await api.recoverable({ limit: 4 });
  for (const runId of runIds) {
    // Re-posting an active run is a harmless duplicate.
    await enqueue(runId);
  }
}

recoverInterruptedRuns();
setInterval(recoverInterruptedRuns, 15_000);`,
      },
      {
        heading: "Contention is not failure",
        visual: "contention",
        body: [
          "The recovery loop creates its own race. If a run looks stale because the original worker is slow rather than dead, the retry and the original end up fighting over the same run. Smithers arbitrates ownership with claim codes, and the loser has to know how to lose.",
          "The failure mode this prevents is quiet and nasty: the losing worker reports the run as failed, the product marks it failed, and moments later the winning worker completes it. The user sees a failure that mutates into a success, or a success overwritten by a failure. Classifying contention as not-yours instead of broken keeps the losing worker silent, while real model errors still propagate to the user.",
          "The test suite pins this distinction explicitly, because it is exactly the kind of behavior a refactor destroys without anyone noticing until production.",
        ],
        code: `const RESUME_CONTENTION = new Set([
  "RUN_OWNER_ALIVE",
  "RUN_STILL_RUNNING",
  "RUN_RESUME_CLAIM_FAILED",
  "RUN_RESUME_CLAIM_LOST",
]);

if (isResumeContention(error)) {
  // Another worker owns this run. Say nothing.
  throw error;
}
await api.failed({ runId, code: classify(error) });`,
      },
      {
        heading: "Budgets are abort conditions, not dashboards",
        visual: "budget",
        body: [
          "A run that can survive any crash can also, in principle, run forever. Durability makes runaway cost easier, not harder, so the limits have to live inside the execution loop. Smithers streams progress events during a run: token usage, completed turns, tool activity. The runner folds them into counters checked on every event.",
          "When a limit trips, the abort controller kills the run mid-flight and the failure callback tells the product exactly which budget was exceeded. The budgets are small on purpose: a package draft gets six turns and ten cents. If the agent cannot finish inside that, the answer is to fix the task, not raise the ceiling.",
          "I have seen plenty of cost dashboards for LLM systems. They are useful for finance and useless for control, because by the time a human reads one the money is spent. Enforcement inside the run is the difference between knowing you overspent and not overspending.",
        ],
        code: `// Both passed to the workflow run, alongside an AbortController.
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
},`,
      },
      {
        heading: "Never trust the agent's own report",
        visual: "trust",
        body: [
          "The last boundary is the terminal callback. When a run completes, the runner reports the output, but the product API treats that report as a claim, not a fact. It re-parses the blueprint against the schema, re-runs the preview validation server-side, and enforces the cost ceiling again on its own accounting. The agent is instructed to preview its own work before returning, and it usually does. The system is not built on usually.",
          "That also closes the loop on the run from the opening section. It resumed from its checkpoint after the restart, finished the remaining tool calls, and the draft it produced was re-validated before any administrator saw it. The total user-visible impact of the crash was that the run took a little longer.",
          "None of this is free, and it is worth being honest about the bill. The machine stays warm even when idle, because the recovery loop is what notices dead runs. Every workflow step pays a checkpoint write. And the whole design rests on a discipline that a refactor can quietly break: terminal effects must stay idempotent, because the system is allowed to deliver them twice. I consider all three cheap against the alternative, which is explaining to a user why their run vanished.",
          "None of this is exotic. Checkpointed workflows, idempotent handlers, lease arbitration, and server-side validation are standard distributed-systems furniture. What building this taught me is that agents do not exempt you from any of it. They raise the stakes, because every retry costs real money and every unverified output carries a model's confidence. Prompts got the demo working. Durability made it a product.",
        ],
      },
    ],
    references: [
      { label: "Smithers, the durable workflow orchestrator", href: "https://smithers.sh" },
      { label: "Pi, the coding agent library", href: "https://pi.dev/" },
    ],
  },
  {
    slug: "designing-evaluations-that-catch-real-regressions",
    title: "Designing evaluations that catch real regressions",
    deck:
      "How I structure AI product evaluations around observable failure modes instead of abstract benchmark scores.",
    date: "2026-06-18",
    readTime: "9 min",
    tags: ["AI quality", "testing", "systems"],
    sections: [
      {
        heading: "Start from the failure budget",
        body: [
          "A useful evaluation suite begins with the ways the product is allowed to fail. For a support assistant, a missed citation may be tolerable in a draft response, while a fabricated refund policy is a release blocker.",
          "I group cases by product promise, failure severity, and the system boundary that can realistically fix the issue. That keeps the suite small enough to run often while still being specific enough to guide engineering work.",
        ],
      },
      {
        heading: "Make regressions diffable",
        body: [
          "The most important output is not a single score. It is a reviewable diff that shows which examples changed, which rubric dimension moved, and whether the source context supports the answer.",
          "That changes the team conversation from whether the model feels better to whether the release improves the product contract.",
        ],
        code: `type EvaluationResult = {
  caseId: string;
  answerScore: number;
  citationCoverage: number;
  changedFromBaseline: boolean;
  reviewerNote?: string;
};`,
      },
      {
        heading: "Keep humans in the loop where judgment matters",
        body: [
          "Automated checks are excellent for structure, citations, latency, and obvious contradictions. Human review is still better for tone, prioritization, and whether an answer resolves the actual user intent.",
          "The right system separates those concerns so reviewers spend time on judgment rather than re-checking mechanical constraints.",
        ],
      },
    ],
  },
  {
    slug: "event-sourced-workflows-without-the-ceremony",
    title: "Event-sourced workflows without the ceremony",
    deck:
      "A practical approach to workflow history, replay, and auditability for product teams that do not need a full platform rewrite.",
    date: "2026-05-27",
    readTime: "11 min",
    tags: ["architecture", "backend", "databases"],
    sections: [
      {
        heading: "Use events to explain decisions",
        body: [
          "The strongest argument for event history is not theoretical purity. It is the ability to answer why the system did something after a customer or operator asks.",
          "For billing, provisioning, and compliance workflows, a compact event stream can make the difference between a guess and a defensible explanation.",
        ],
      },
      {
        heading: "Persist the facts, derive the views",
        body: [
          "A workflow table can store the current state for fast reads, while an append-only event table stores every transition. The state is an optimization; the events are the record.",
          "This lets you rebuild views, inspect edge cases, and add new reporting without changing the core product flow.",
        ],
        code: `await db.transaction(async (tx) => {
  await tx.workflowEvents.insert({
    workflowId,
    type: "invoice.previewed",
    payload: preview,
  });

  await tx.workflows.update(workflowId, {
    status: "waiting_for_approval",
  });
});`,
      },
      {
        heading: "Avoid making every object an event store",
        body: [
          "Event sourcing is a tool for places where history is product behavior. Applying it everywhere adds operational drag and cognitive overhead.",
          "The pragmatic line is simple: if the business will ask why, when, and from which inputs, keep the event.",
        ],
      },
    ],
  },
  {
    slug: "operational-interfaces-for-engineers",
    title: "Operational interfaces for engineers",
    deck:
      "The UI patterns that help engineering teams scan production state, compare signals, and act without losing context.",
    date: "2026-04-09",
    readTime: "7 min",
    tags: ["frontend", "ops", "product design"],
    sections: [
      {
        heading: "Density is a feature",
        body: [
          "Operational tools should be calm, dense, and easy to scan. Engineers return to the same surfaces repeatedly, so the interface should reward familiarity instead of theatrical first impressions.",
          "I prefer restrained cards, stable grids, compact controls, and comparison-friendly spacing for this kind of product.",
        ],
      },
      {
        heading: "Design for the second action",
        body: [
          "The first action is usually obvious: open the failed job, view the trace, inspect the deployment. The second action is where tools often fall apart.",
          "Good operational interfaces keep adjacent context close: recent deploys near errors, ownership near alerts, and historical baselines near current metrics.",
        ],
      },
    ],
  },
];

export const principles = [
  {
    title: "Traceable decisions",
    body: "Technical choices should leave a trail: constraints, alternatives, and the reason a path won.",
    icon: Braces,
  },
  {
    title: "Interfaces over glue",
    body: "I prefer clear boundaries between systems, typed contracts, and explicit ownership over clever integration code.",
    icon: Boxes,
  },
  {
    title: "Operational empathy",
    body: "A feature is not done until the team can observe it, debug it, migrate it, and explain it.",
    icon: ShieldCheck,
  },
  {
    title: "Data that earns trust",
    body: "Metrics and AI outputs need provenance, review paths, and failure modes that are visible to humans.",
    icon: Database,
  },
];

export const navItems = [
  { label: "Projects", href: "/projects" },
  { label: "Articles", href: "/articles" },
  { label: "Contact", href: `mailto:${profile.email}` },
];

export const arrowIcon = ArrowRight;
export const terminalIcon = TerminalSquare;
