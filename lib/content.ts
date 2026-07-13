import {
  ArrowRight,
  Boxes,
  Braces,
  Cpu,
  Database,
  Filter,
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
    architectureTitle: string;
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
        | "offline-replay"
        | "funnel-spec"
        | "skill-runtime"
        | "validation-gate"
        | "artifact-sync"
        | "integration-outbox"
        | "event-pipeline"
        | "benchmark-harness";
      body: string[];
      principle?: string;
      details?: string[];
      relatedArticle?: { slug: string; label: string };
    }[];
    closing: {
      title: string;
      body: string[];
      cta: string;
    };
  };
};

// Official site per stack label; items without an entry render as plain text.
// Composite labels ("X + Y") link to the primary product.
export const stackLinks: Record<string, string> = {
  "TanStack Start": "https://tanstack.com/start",
  TypeScript: "https://www.typescriptlang.org",
  ORPC: "https://orpc.unnoq.com",
  "PostgreSQL + PostGIS": "https://postgis.net",
  Drizzle: "https://orm.drizzle.team",
  "Better Auth": "https://www.better-auth.com",
  "Trigger.dev": "https://trigger.dev",
  Expo: "https://expo.dev",
  "Smithers + Pi": "https://smithers.sh",
  "Next.js 16": "https://nextjs.org",
  Convex: "https://www.convex.dev",
  "Rivet agentOS + Pi": "https://rivet.dev/agent-os/",
  "Vercel AI Gateway": "https://vercel.com/ai-gateway",
  Zod: "https://zod.dev",
  Tinybird: "https://www.tinybird.co",
  "Better Auth + Polar": "https://www.better-auth.com",
  "React Flow": "https://reactflow.dev",
};

export const profile = {
  name: "Marvin",
  role: "I build agentic systems that do real work without losing control",
  location: "Costa Rica",
  availability: "Available to design and build new agentic products",
  email: "marvin.ac.cr@gmail.com",
  github: "https://github.com/marvinamador7",
  linkedin: "https://www.linkedin.com/in/marvinamadorcampos/",
  x: "https://x.com/marv_amador",
  intro:
    "If you're building an AI-native product or a new agentic business, this is the work I do end to end: the data model that becomes the source of truth, the boundaries that make agents safe to trust, and the product people actually use. The case studies below show how, decision by decision.",
  heroCta: "Discuss your agentic product",
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
      architectureTitle: "One authority, multiple execution surfaces.",
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
        cta: "Discuss an agentic platform",
      },
    },
  },
  {
    slug: "funnelloops",
    title: "FunnelLoops",
    year: "2026",
    eyebrow: "AI funnel platform",
    summary:
      "An AI-native funnel platform where a sandboxed agent and a visual builder edit the same validated funnel spec, with versioned publishing, CRM sync, and real-time analytics.",
    problem:
      "Funnel tools make marketers assemble pages, logic, integrations, and analytics by hand. AI generators promise to do it for them, but they produce one-shot output that cannot be edited safely afterwards, so every revision risks breaking the flow it sits in.",
    outcome:
      "A production-shaped SaaS spanning a visual canvas builder, a published funnel runtime, a skills-driven agent service, a declarative integration platform, and a real-time analytics pipeline. FunnelLoops is in pre-launch development.",
    stack: [
      "Next.js 16",
      "TypeScript",
      "Convex",
      "Rivet agentOS + Pi",
      "Vercel AI Gateway",
      "Zod",
      "Tinybird",
      "Better Auth + Polar",
      "React Flow",
    ],
    metrics: [
      "Skills-driven agent runtime",
      "Validate-and-reject spec boundary",
      "Real-time decision analytics",
    ],
    links: [{ label: "Visit FunnelLoops", href: "https://funnelloops.com" }],
    color: "cyan",
    icon: Filter,
    caseStudy: {
      stage: "Pre-launch",
      role: "Product architecture · Full-stack engineering · Agent runtime design",
      lede: "I stopped asking the model for perfect output and gave it a file to edit instead.",
      thesis:
        "FunnelLoops treats a marketing funnel as a typed document with strict semantics: steps, fields, routing, and actions in one flat spec. The agent works the way an engineer does. It reads the document, loads the skill the task needs, makes a surgical edit, and submits the result to a validator that rejects anything structurally broken. Everything else in the product, the canvas builder, versioned publishing, CRM integrations, and analytics, is built around that single document and the events it produces.",
      architectureTitle: "One validated document, three kinds of editors.",
      architecture: [
        {
          label: "01 / Surfaces",
          title: "Three editors, one spec",
          detail:
            "A visual canvas builder for humans, a sandboxed agent for language, and a published runtime for visitors all read and write the same funnel document.",
        },
        {
          label: "02 / Agent runtime",
          title: "A VM, a file, and skills",
          detail:
            "A coding agent runs inside a micro-VM where the funnel is a JSON file it edits with jq, guided by markdown skill files loaded on demand.",
        },
        {
          label: "03 / Data authority",
          title: "Convex owns the truth",
          detail:
            "Funnels, immutable versions, teams, submissions, and integration state live in one reactive backend; interfaces subscribe instead of parsing streams.",
        },
        {
          label: "04 / Pipelines",
          title: "Contracts at the edges",
          detail:
            "Canonical CRM entities sync through a change-data-capture outbox, and a Tinybird event pipeline turns funnel traffic into queryable decisions.",
        },
      ],
      chapters: [
        {
          kicker: "01 / Product model",
          title: "A funnel is a typed document, not a pile of pages",
          visual: "funnel-spec",
          body: [
            "The visible promise is simple: describe a campaign and get a working funnel with landing pages, forms, routing, and follow-up actions. The difficult part is that a funnel is control flow. Conditional branches route a visitor by their answers, split tests weight traffic across variants, and actions fire when specific steps complete. Represent that as a loose collection of page configurations and every feature ends up fighting the data model.",
            "So the spec is a single flat JSON document with strict semantics. Each step carries its routing inline as a discriminated union: linear with one next step, conditional with grouped conditions and a required fallback, split-test with weighted variants, and multi-path choices. Actions are top-level records that reference the step that triggers them. Eighteen typed field kinds cover capture. Editor concerns like generation status stay out of the spec entirely; the document describes the funnel, not the editing session that produced it.",
            "Flatness was a deliberate decision about who edits this document. A deeply nested schema is pleasant to render and miserable to modify surgically. A flat document with inline routing can be navigated and patched with a single query language, which is exactly how the agent works on it. And because the published runtime executes the same routing the builder draws and the analytics pipeline records, the three surfaces cannot drift into different opinions about what the funnel does.",
          ],
          principle: "Design the artifact for the hands that will edit it, human or model.",
          details: [
            "Inline discriminated-union routing",
            "Actions reference their trigger steps",
            "Eighteen typed field kinds",
            "No editor state inside the spec",
          ],
        },
        {
          kicker: "02 / Agent runtime",
          title: "Give the agent a filesystem, not a flowchart",
          visual: "skill-runtime",
          body: [
            "Most AI builders hardcode a chain: prompt in, structured output out, merge and hope. Every product change means re-engineering the chain. FunnelLoops runs a coding agent inside a sandboxed micro-VM instead. The funnel spec is mounted at /funnel.json, and the agent edits it with bash and jq: surgical patches to the fields that changed, never a rewrite of the whole file.",
            "Domain knowledge lives in seven markdown skill files behind an index. The agent reads the index first, then loads only the skill the task needs: planning a funnel from scratch, editing fields, routing, field types, action intents, layout, or publishing. Skills contain literal jq recipes for common operations. Changing how the product builds funnels means editing prose, not redeploying orchestration code.",
            "The system prompt is a few sentences that point at the index and set the working rules. Model choice is a gateway configuration, not an architecture decision, so models can be swapped and benchmarked without touching the runtime. Inside the VM, permission prompts are auto-approved because the sandbox is the boundary that matters: the VM holds no credentials and no network access to the business. Every effect leaves through explicit host commands.",
          ],
          principle: "Ship knowledge as documents the agent loads, not chains you recompile.",
          details: [
            "Sandboxed micro-VM with a virtual filesystem",
            "Seven markdown skills behind an index",
            "Surgical jq edits over full rewrites",
            "Model routing through one gateway config",
          ],
        },
        {
          kicker: "03 / Correctness boundary",
          title: "Validate and reject beats generate and repair",
          visual: "validation-gate",
          body: [
            "The common failure mode of AI builders is accepting whatever the model returns and patching it afterwards with repair code that grows forever and still misses cases. FunnelLoops inverts that: the platform never repairs agent output. Every sync runs the document through the schema and then through a structural validator that understands what a funnel must be.",
            "Structure means real graph properties. At least one step must terminate the funnel. Every routing target must exist. A depth-first search rejects cycles, and a breadth-first walk from the entry step rejects orphans a visitor could never reach. Split-test weights must sum to one hundred. Conditional routing must declare a fallback. A violation rejects the sync with an error message written for the agent to act on, and the agent retries with a fix.",
            "This moves the correctness contract into the platform, where it is testable and versioned, and it makes the agent allowed to be wrong cheaply. A rejected edit costs one round trip. A silently repaired edit costs trust, because the funnel that ships is no longer the funnel anyone asked for. The same validator guards the human path from the builder, so there is exactly one definition of a well-formed funnel.",
          ],
          principle: "Reject broken output with an explanation; never silently repair it.",
        },
        {
          kicker: "04 / State and streaming",
          title: "The database is the product; the stream is presentation",
          visual: "artifact-sync",
          body: [
            "Streaming generated JSON to the browser and reconstructing state there is a race condition dressed up as UX: partial data on disconnect, duplicate application on retry, and a client that has to understand the model's output format. FunnelLoops persists artifact-first. The agent's toolkit exposes four commands, sync, publish, analytics, and load, and each executes on the host through an authenticated gateway into Convex. The VM never sees a credential.",
            "After every turn, an auto-sync pass reads the file, debounces rapid edits, deduplicates with a content hash so identical states never write twice, validates, and only then persists. The builder does not parse the chat stream for state. It subscribes to Convex and re-renders when the document actually changed, which is the same path it uses when a human edits on the canvas.",
            "The chat still streams, because watching the work happen is part of the product. An adapter translates agent events into the AI SDK wire protocol so a standard chat client renders tokens and tool calls, plus one custom event that tells the canvas the funnel changed. The presentation channel and the truth channel stay separate, and only one of them can create facts.",
          ],
          principle: "Let the stream animate the work; let the database own the outcome.",
          details: [
            "Four host commands behind an authenticated gateway",
            "Debounced, hash-deduped auto-sync",
            "Convex subscriptions drive the canvas",
            "Wire-protocol adapter for the chat UI only",
          ],
        },
        {
          kicker: "05 / Integrations",
          title: "One canonical contact, many CRMs",
          visual: "integration-outbox",
          body: [
            "A funnel that captures leads is only useful if the leads land where the team works, which means CRM integrations, which is where most platforms accumulate bespoke connector code. FunnelLoops has an integration SDK where a connector is a declarative configuration: auth, field maps, object capabilities, and webhook handling. Adapters, manifests, and tools are generated from that config, and contract tests hold every connector to the same behavioral suite.",
            "Sync is built on canonical entities. Contacts, leads, companies, and deals have typed core fields plus provider references, so one record can be linked to several external systems with per-provider sync state. Outbound changes flow through a change-data-capture outbox with payload-hash deduplication and bounded retries. Inbound webhooks are signature-verified, made idempotent by event ID, and resolved back to the canonical record.",
            "HubSpot is the production-ready reference: OAuth, upsert-by-email semantics, deletes that treat an already-missing record as success, and cursor pagination. The point of the SDK is that the second connector is configuration plus a thin override file, not a fork of the first one.",
          ],
          principle: "Meet external systems with contracts and idempotency, not bespoke glue.",
        },
        {
          kicker: "06 / Analytics",
          title: "Every visitor decision becomes a queryable event",
          visual: "event-pipeline",
          body: [
            "A funnel is an experiment, and an experiment without measurement is decoration. Published funnels emit an eighteen-type event taxonomy through a batching SDK: views, starts, submits, completes, and abandons, field-level focus and error events, routing decisions, and automation and integration outcomes. Each row is denormalized with device, geography, and attribution so questions do not require joins at query time.",
            "Tinybird ingests those events into raw datasources and materialized views, and a set of pipes serves the product surfaces: the conversion funnel, per-step breakdowns, time series, and a journey view that renders the paths visitors actually took as a Sankey diagram.",
            "Recording routing decisions as events is the detail that matters. Because the runtime logs which branch fired and why, the journey view is ground truth rather than inference, and a split test can be read directly from the data. The same pipeline feeds back into the agent through a read-only analytics command: ask where the funnel leaks, and it answers from measurements instead of guessing.",
          ],
          principle: "Instrument decisions, not just pageviews; that is what makes analytics actionable.",
        },
        {
          kicker: "07 / Verification",
          title: "Benchmarks that speak the user's language",
          visual: "benchmark-harness",
          body: [
            "The failure mode of agent demos is testing the happy path with developer-shaped prompts. The FunnelLoops benchmark harness drives the agent with natural language only, the way a customer would type it: make the email field in the contact form optional. The agent has to read the skill index, load the right skill, derive the jq edit, and execute it. Nothing in the harness hints at the mechanism.",
            "Eleven operations across four categories, field editing, routing changes, step operations, and full funnel creation, each end with a programmatic verifier that reads the resulting document back and asserts the change actually happened. The current suite passes eleven of eleven. Underneath, sixty-four unit tests cover the schema, the structural validator, migration, the stream adapter, and auto-sync.",
            "The tests I care most about are the ones over the skill files themselves. When product knowledge is prose, prose becomes an interface, and an interface needs tests: frontmatter shape, index consistency, and referenced commands. A skill edit that would confuse the agent fails in CI before it ever reaches one.",
          ],
          principle: "If users will ask in natural language, benchmark in natural language.",
        },
      ],
      closing: {
        title: "The real product is a document three kinds of editors can trust",
        body: [
          "FunnelLoops looks like an AI funnel builder because that is the job users hire it for. Underneath, it is a document system with strict semantics and several editors: a canvas for humans, a sandboxed agent for language, and a runtime for visitors, all converging on one validated spec in one reactive database, with contracts at every edge that touches the outside world.",
          "The sequence was deliberate. The spec, the validator, and the persistence gateway came first; only then did the agent get its filesystem, its jq, and its skills. That ordering is what makes the system safe to grow. New capability is a new markdown skill, and it arrives without weakening anything, because validation and the gateway do not move.",
          "This is the kind of work I want to keep doing: finding the representation that makes a hard product tractable, then building the boundaries that let humans, runtimes, and models edit it without stepping on each other.",
        ],
        cta: "Discuss an AI-native product",
      },
    },
  },
];

export const principles = [
  {
    title: "Your problem first, my stack second",
    body: "Before writing code I get inside the actual operation: where time dies, where money leaks, what a win looks like in numbers. The architecture follows from that, not the other way around.",
    icon: Braces,
  },
  {
    title: "Working software, early",
    body: "You see something real running in the first weeks, then we iterate on what actual usage teaches. Roadmaps and decks don't survive contact with the operation. Deployed software does.",
    icon: Boxes,
  },
  {
    title: "No AI theater",
    body: "If a deterministic rule beats a model, you get the rule. Agents earn autonomy in small, reversible steps behind validation and audit. You're paying for outcomes, not for a demo.",
    icon: Database,
  },
  {
    title: "Built to hand over",
    body: "A feature is done when your team can run it without me: observable, debuggable, documented. I measure success by what keeps working after I leave.",
    icon: ShieldCheck,
  },
];

export const navItems = [
  { label: "Projects", href: "/projects" },
  { label: "Articles", href: "/articles" },
  { label: "Contact", href: `mailto:${profile.email}` },
];

export const arrowIcon = ArrowRight;
export const terminalIcon = TerminalSquare;
