import type { Project } from "@/lib/content";
import {
  ArtifactSync,
  BenchmarkHarness,
  EventPipeline,
  FunnelSpec,
  IntegrationOutbox,
  SkillRuntime,
  ValidationGate,
} from "@/components/FunnelLoopsDiagrams";
import {
  AgentBoundary,
  DispatchFunnel,
  ExtensionStack,
  OfflineReplay,
  TenantBoundary,
  WorkflowKernel,
} from "@/components/GrivaraOpsDiagrams";
import { OperationalGraphVisual } from "@/components/OperationalGraphVisual";

type DiagramKind = NonNullable<Project["caseStudy"]>["chapters"][number]["visual"];

type AudienceInsights = {
  ceo: string;
  cto: string;
  engineering: string;
};

const insights: Record<DiagramKind, AudienceInsights> = {
  "operational-graph": {
    ceo: "One operating picture replaces tool reconciliation and hidden handoffs.",
    cto: "Shared entities make cross-domain decisions possible without duplicated state.",
    engineering: "Every surface reads the same typed relationships instead of rebuilding joins in the UI.",
  },
  "tenant-boundary": {
    ceo: "Customer data separation is a product guarantee, not a team convention.",
    cto: "Tenant context and permissions are established before domain code can execute.",
    engineering: "Procedures receive trusted organization scope from the session; browser input cannot override it.",
  },
  "extension-stack": {
    ceo: "The platform adapts to a customer without turning into a one-off implementation.",
    cto: "A stable native core and governed extension layer preserve upgradeability.",
    engineering: "Schemas, relations, workflows, and packages are versioned artifacts with explicit publication gates.",
  },
  "workflow-kernel": {
    ceo: "Critical processes remain explainable, recoverable, and approval-aware as automation grows.",
    cto: "Postgres owns workflow truth while workers provide replaceable delivery and compute.",
    engineering: "Revision pins, idempotency keys, immutable events, leases, and bounded transitions contain failure.",
  },
  "dispatch-funnel": {
    ceo: "Dispatchers spend less time searching while retaining control of the final assignment.",
    cto: "Deterministic ranking provides a measurable baseline before introducing learned models.",
    engineering: "Hard qualification precedes weighted signals, preventing proximity from outranking competence.",
  },
  "agent-boundary": {
    ceo: "Agents can create leverage without receiving unlimited authority over the business.",
    cto: "Models and runtimes can change while the capability, policy, and audit boundaries remain stable.",
    engineering: "Every tool call is typed, scoped, permission-checked, limited, and recorded before execution.",
  },
  "offline-replay": {
    ceo: "Field work continues through poor connectivity without losing technician intent.",
    cto: "The mobile client converges on server authority instead of becoming a second source of truth.",
    engineering: "Persisted optimistic caches and a durable mutation outbox survive restarts and replay in order.",
  },
  "funnel-spec": {
    ceo: "Every surface of the product agrees on what the funnel does, so revisions stop breaking campaigns.",
    cto: "One flat spec with inline routing keeps the builder, runtime, and analytics from drifting apart.",
    engineering: "A discriminated routing union and top-level trigger-referenced actions make the document patchable with one query language.",
  },
  "skill-runtime": {
    ceo: "The AI improves by writing better playbooks, not by rebuilding the product.",
    cto: "A sandboxed VM bounds what the agent can touch, and gateway routing keeps model choice a config change.",
    engineering: "Skills are markdown with jq recipes; the agent loads one per task and edits /funnel.json surgically.",
  },
  "validation-gate": {
    ceo: "Customers never receive a funnel that routes visitors into a dead end.",
    cto: "Correctness lives in a versioned, testable validator instead of scattered repair code.",
    engineering: "Schema plus graph checks reject cycles, orphans, bad weights, and missing fallbacks with errors the agent can act on.",
  },
  "artifact-sync": {
    ceo: "What users see on the canvas is always what was actually saved.",
    cto: "The database is the single source of truth; the chat stream carries no state.",
    engineering: "Debounced, hash-deduped auto-sync persists through an authenticated gateway; the builder re-renders from Convex subscriptions.",
  },
  "integration-outbox": {
    ceo: "Leads reach the CRM the team already uses, reliably, without duplicate records.",
    cto: "Connectors are declarative configs held to one contract-test suite, so the catalog can grow safely.",
    engineering: "Canonical entities with external refs sync through a CDC outbox with hash dedupe; webhooks are signature-verified and idempotent.",
  },
  "event-pipeline": {
    ceo: "Teams see where visitors leak out of the funnel and which variant actually wins.",
    cto: "A real-time pipeline serves both dashboards and the agent from the same measured events.",
    engineering: "Eighteen event types, denormalized rows, and materialized views make routing decisions queryable ground truth.",
  },
  "benchmark-harness": {
    ceo: "The AI is measured on the sentences customers actually type, not on developer demos.",
    cto: "Programmatic verifiers give a pass rate that can gate releases and compare models.",
    engineering: "Natural-language prompts exercise skill discovery end to end, and the skill markdown itself is under test.",
  },
};

const titles: Record<DiagramKind, string> = {
  "operational-graph": "A single operational graph",
  "tenant-boundary": "Trusted scope before business logic",
  "extension-stack": "Stable core, governed variation",
  "workflow-kernel": "Author, execute, recover",
  "dispatch-funnel": "Qualify first, rank second",
  "agent-boundary": "The governed agent harness",
  "offline-replay": "Two durable channels, one authority",
  "funnel-spec": "One document, four routing shapes",
  "skill-runtime": "A VM, a file, and seven skills",
  "validation-gate": "Accept valid funnels, reject the rest",
  "artifact-sync": "Truth and presentation, separated",
  "integration-outbox": "Canonical entities, contract edges",
  "event-pipeline": "From visitor decision to query",
  "benchmark-harness": "Measured the way users ask",
};

function AudienceLens({ value }: { value: AudienceInsights }) {
  return (
    <div
      className="grid grid-cols-3 divide-x divide-line border-t border-line max-[640px]:grid-cols-1 max-[640px]:divide-x-0 max-[640px]:divide-y"
      aria-label="Audience interpretation"
    >
      <div className="min-h-[130px] p-[17px] max-[640px]:min-h-0">
        <p className="m-0 text-[0.62rem] leading-[1.65] text-dim">{value.ceo}</p>
      </div>
      <div className="min-h-[130px] p-[17px] max-[640px]:min-h-0">
        <p className="m-0 text-[0.62rem] leading-[1.65] text-dim">{value.cto}</p>
      </div>
      <div className="min-h-[130px] p-[17px] max-[640px]:min-h-0">
        <p className="m-0 text-[0.62rem] leading-[1.65] text-dim">{value.engineering}</p>
      </div>
    </div>
  );
}

function OperationalGraph() {
  return (
    <div className="min-h-[280px] bg-none px-3 pb-0 pt-2 max-[640px]:min-h-0 max-[640px]:px-3.5 max-[640px]:py-5">
      <OperationalGraphVisual />
      <p className="mt-[22px] text-center text-[0.6rem] leading-[1.55] text-quiet">
        Every surface resolves through the same records and relationships.
      </p>
    </div>
  );
}

function DiagramContent({ kind }: { kind: DiagramKind }) {
  switch (kind) {
    case "operational-graph": return <OperationalGraph />;
    case "tenant-boundary": return <TenantBoundary />;
    case "extension-stack": return <ExtensionStack />;
    case "workflow-kernel": return <WorkflowKernel />;
    case "dispatch-funnel": return <DispatchFunnel />;
    case "agent-boundary": return <AgentBoundary />;
    case "offline-replay": return <OfflineReplay />;
    case "funnel-spec": return <FunnelSpec />;
    case "skill-runtime": return <SkillRuntime />;
    case "validation-gate": return <ValidationGate />;
    case "artifact-sync": return <ArtifactSync />;
    case "integration-outbox": return <IntegrationOutbox />;
    case "event-pipeline": return <EventPipeline />;
    case "benchmark-harness": return <BenchmarkHarness />;
  }
}

export function CaseStudyDiagram({ kind }: { kind: DiagramKind }) {
  return (
    <figure className="chapter-visual m-0 mb-[42px] border border-line bg-surface [&_*]:min-w-0">
      <figcaption className="flex min-h-[52px] items-center justify-between border-b border-line px-[17px] max-[640px]:flex-col max-[640px]:items-start max-[640px]:justify-center max-[640px]:px-3.5 max-[640px]:py-2.5">
        <span className="text-[0.6rem] uppercase text-quiet">Decision model</span>
        <strong className="text-[0.68rem] font-medium max-[640px]:mt-1">{titles[kind]}</strong>
      </figcaption>
      <DiagramContent kind={kind} />
      <AudienceLens value={insights[kind]} />
    </figure>
  );
}
