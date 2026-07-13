import {
  Activity,
  ArrowDown,
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  Check,
  CloudOff,
  Code2,
  Cpu,
  Database,
  FileCheck2,
  Gauge,
  GitBranch,
  HardDrive,
  KeyRound,
  Layers3,
  LockKeyhole,
  MapPin,
  PackageCheck,
  RefreshCw,
  RotateCcw,
  ServerCog,
  ShieldCheck,
  Smartphone,
  Timer,
  Unplug,
  UserCheck,
  Wrench,
  X,
} from "lucide-react";
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

// Shared box treatment for .diagram-box / .dispatch-stage (icon + strong + small, centered).
const boxBase =
  "flex min-h-[110px] flex-col items-center justify-center border border-line bg-surface-raised px-2.5 py-3.5 text-center";
const boxStrong = "text-[0.67rem] font-medium leading-[1.35]";
const boxSmall = "mt-1.5 text-[0.6rem] leading-[1.45] text-quiet";

// Shared "deep system" box treatment (.workflow-authoring > div, .authority-execution > div, .reconcile-flow > div).
const deepBoxBase =
  "flex min-h-[58px] flex-col items-center justify-center border border-line p-[7px] text-center";
const deepBoxStrong = "text-[0.55rem] font-medium";
const deepBoxSmall = "mt-1 text-center text-[0.47rem] leading-[1.35] text-quiet";
const deepIsAuthority = "border-diagram-green/42 bg-diagram-green-dim";
const deepArrowMobile = "max-[640px]:min-h-[20px] max-[640px]:rotate-90";

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

function FlowArrow({ down = false, className = "" }: { down?: boolean; className?: string }) {
  return (
    <span
      className={`flex items-center justify-center text-quiet ${down ? "min-h-[28px]" : ""} ${className}`.trim()}
      aria-hidden="true"
    >
      {down ? <ArrowDown size={16} /> : <ArrowRight size={16} />}
    </span>
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

function TenantBoundary() {
  return (
    <div className="min-h-[280px] bg-[image:linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[length:24px_24px] p-7 max-[640px]:min-h-0 max-[640px]:px-3.5 max-[640px]:py-5">
      <div className="grid grid-cols-[1fr_24px_1fr_24px_1fr_24px_1fr] items-stretch max-[640px]:grid-cols-1">
        <div className={boxBase}>
          <Code2 size={18} className="mb-[11px] text-dim" />
          <strong className={boxStrong}>Typed request</strong>
          <small className={boxSmall}>validated input</small>
        </div>
        <FlowArrow className="max-[640px]:min-h-[27px] max-[640px]:rotate-90" />
        <div className={`${boxBase} border-diagram-blue/42 bg-diagram-blue-dim`}>
          <KeyRound size={18} className="mb-[11px] text-diagram-blue" />
          <strong className={boxStrong}>Session</strong>
          <small className={boxSmall}>user + membership</small>
        </div>
        <FlowArrow className="max-[640px]:min-h-[27px] max-[640px]:rotate-90" />
        <div className={`${boxBase} border-primary/42 bg-primary/7`}>
          <ShieldCheck size={18} className="mb-[11px] text-primary" />
          <strong className={boxStrong}>Org scope</strong>
          <small className={boxSmall}>permission context</small>
        </div>
        <FlowArrow className="max-[640px]:min-h-[27px] max-[640px]:rotate-90" />
        <div className={`${boxBase} border-diagram-green/42 bg-diagram-green-dim`}>
          <Database size={18} className="mb-[11px] text-diagram-green" />
          <strong className={boxStrong}>Domain query</strong>
          <small className={boxSmall}>db + trusted org</small>
        </div>
      </div>
      <div className="mt-5 grid min-h-[42px] grid-cols-[auto_1fr_auto] items-center gap-[9px] border border-dashed border-diagram-red/50 bg-diagram-red-dim px-3 py-2 text-[0.62rem] text-diagram-red max-[640px]:items-start max-[640px]:grid-cols-[auto_1fr]">
        <X size={15} />
        <span>Browser-supplied organization ID</span>
        <strong className="text-[0.58rem] font-normal text-dim max-[640px]:col-start-2">
          cannot establish tenant scope
        </strong>
      </div>
    </div>
  );
}

function ExtensionStack() {
  const layerLabel = "mb-1 block text-[0.56rem] uppercase text-quiet";
  const layerStrong = "text-[0.65rem] font-medium";
  const layerBase = "grid w-full max-w-[480px] grid-cols-[24px_1fr] items-center gap-[13px] border px-4 py-[13px]";
  return (
    <div className="flex min-h-[280px] flex-col items-center bg-[image:linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[length:24px_24px] p-7 max-[640px]:min-h-0 max-[640px]:px-3.5 max-[640px]:py-5">
      <div className={`${layerBase} border-diagram-blue/38 bg-diagram-blue-dim`}>
        <Bot size={18} className="text-diagram-blue" />
        <div>
          <span className={layerLabel}>Proposal layer</span>
          <strong className={layerStrong}>Agent or human composes a package draft</strong>
        </div>
      </div>
      <FlowArrow down />
      <div className={`${layerBase} border-diagram-amber/38 bg-diagram-amber-dim`}>
        <FileCheck2 size={18} className="text-diagram-amber" />
        <div>
          <span className={layerLabel}>Governance layer</span>
          <strong className={layerStrong}>Validate · simulate · review · publish</strong>
        </div>
      </div>
      <FlowArrow down />
      <div className="grid w-full max-w-[570px] grid-cols-4 gap-[7px] max-[640px]:grid-cols-2">
        <div className="flex min-h-[62px] flex-col items-center justify-center gap-[7px] border border-line p-2 text-[0.56rem] text-dim">
          <Layers3 size={16} className="text-diagram-green" />
          <span>Extensions</span>
        </div>
        <div className="flex min-h-[62px] flex-col items-center justify-center gap-[7px] border border-line p-2 text-[0.56rem] text-dim">
          <GitBranch size={16} className="text-diagram-green" />
          <span>Relations</span>
        </div>
        <div className="flex min-h-[62px] flex-col items-center justify-center gap-[7px] border border-line p-2 text-[0.56rem] text-dim">
          <Activity size={16} className="text-diagram-green" />
          <span>Workflows</span>
        </div>
        <div className="flex min-h-[62px] flex-col items-center justify-center gap-[7px] border border-line p-2 text-[0.56rem] text-dim">
          <PackageCheck size={16} className="text-diagram-green" />
          <span>Packages</span>
        </div>
      </div>
      <div className={`${layerBase} mt-2 max-w-[570px] border-line bg-surface-raised`}>
        <Database size={18} />
        <div>
          <span className={layerLabel}>Typed native core</span>
          <strong className={layerStrong}>Assets · work orders · budgets · scheduling</strong>
        </div>
      </div>
    </div>
  );
}

function WorkflowKernel() {
  const planeBase = "border border-line bg-[rgba(12,12,12,0.88)] p-3";
  const planeHeading =
    "mb-2.5 flex items-center justify-between max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-1";
  const planeHeadingSpan = "text-[0.5rem] uppercase text-primary";
  const planeHeadingStrong = "text-[0.56rem] font-normal text-dim";
  const deepFlowGrid = "grid grid-cols-[1fr_18px_1fr_18px_1.18fr_18px_1fr] items-stretch max-[640px]:grid-cols-1";
  return (
    <div className="grid min-h-[280px] gap-3 bg-[image:linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[length:24px_24px] p-[22px] max-[640px]:min-h-0 max-[640px]:gap-2.5 max-[640px]:p-3">
      <div className={planeBase}>
        <div className={planeHeading}>
          <span className={planeHeadingSpan}>01 / Definition plane</span>
          <strong className={planeHeadingStrong}>Govern change before runtime</strong>
        </div>
        <div className={deepFlowGrid}>
          <div className={deepBoxBase}>
            <Code2 size={15} className="mb-[5px] text-diagram-blue" />
            <strong className={deepBoxStrong}>Draft</strong>
            <small className={deepBoxSmall}>versioned definition</small>
          </div>
          <FlowArrow className={deepArrowMobile} />
          <div className={deepBoxBase}>
            <Cpu size={15} className="mb-[5px] text-diagram-blue" />
            <strong className={deepBoxStrong}>Compile</strong>
            <small className={deepBoxSmall}>typed transition graph</small>
          </div>
          <FlowArrow className={deepArrowMobile} />
          <div className={deepBoxBase}>
            <Activity size={15} className="mb-[5px] text-diagram-blue" />
            <strong className={deepBoxStrong}>Analyze</strong>
            <small className={deepBoxSmall}>pure simulation + findings</small>
          </div>
          <FlowArrow className={deepArrowMobile} />
          <div className={`${deepBoxBase} ${deepIsAuthority}`}>
            <FileCheck2 size={15} className="mb-[5px] text-diagram-blue" />
            <strong className={deepBoxStrong}>Publish</strong>
            <small className={deepBoxSmall}>immutable revision</small>
          </div>
        </div>
      </div>

      <div className={planeBase}>
        <div className={planeHeading}>
          <span className={planeHeadingSpan}>02 / Transition kernel</span>
          <strong className={planeHeadingStrong}>One deterministic decision path</strong>
        </div>
        <div className="mb-[9px] flex flex-wrap justify-start gap-[7px]">
          <span className="flex min-h-[25px] items-center gap-1.5 border border-line px-[7px] text-[0.57rem] text-dim">
            <Code2 size={13} className="text-diagram-blue" /> Command
          </span>
          <span className="flex min-h-[25px] items-center gap-1.5 border border-line px-[7px] text-[0.57rem] text-dim">
            <Activity size={13} className="text-diagram-blue" /> Event
          </span>
          <span className="flex min-h-[25px] items-center gap-1.5 border border-line px-[7px] text-[0.57rem] text-dim">
            <UserCheck size={13} className="text-diagram-blue" /> Approval
          </span>
          <span className="flex min-h-[25px] items-center gap-1.5 border border-line px-[7px] text-[0.57rem] text-dim">
            <Timer size={13} className="text-diagram-blue" /> Timer
          </span>
          <span className="flex min-h-[25px] items-center gap-1.5 border border-line px-[7px] text-[0.57rem] text-dim">
            <RefreshCw size={13} className="text-diagram-blue" /> Automatic
          </span>
        </div>
        <div className="grid grid-cols-[82px_1fr] items-stretch border border-diagram-blue/42 bg-diagram-blue-dim max-[640px]:grid-cols-1">
          <div className="flex flex-col items-center justify-center gap-1.5 border-r border-r-diagram-blue/28 text-[0.56rem] text-diagram-blue max-[640px]:flex-row max-[640px]:border-b max-[640px]:border-b-diagram-blue/28 max-[640px]:border-r-0 max-[640px]:min-h-[36px]">
            <GitBranch size={17} />
            <span>Kernel</span>
          </div>
          <ol className="m-0 grid list-none grid-cols-5 gap-0 p-0 max-[640px]:grid-cols-2">
            <li className="flex min-h-[54px] flex-col items-center justify-center gap-[5px] border-r border-line p-1.5 text-center text-[0.49rem] text-dim max-[640px]:min-h-[46px] max-[640px]:border-b max-[640px]:border-line">
              <b className="text-[0.5rem] font-medium text-primary">1</b> Lock idempotency
            </li>
            <li className="flex min-h-[54px] flex-col items-center justify-center gap-[5px] border-r border-line p-1.5 text-center text-[0.49rem] text-dim max-[640px]:min-h-[46px] max-[640px]:border-b max-[640px]:border-line max-[640px]:border-r-0">
              <b className="text-[0.5rem] font-medium text-primary">2</b> Pin revision
            </li>
            <li className="flex min-h-[54px] flex-col items-center justify-center gap-[5px] border-r border-line p-1.5 text-center text-[0.49rem] text-dim max-[640px]:min-h-[46px] max-[640px]:border-b max-[640px]:border-line">
              <b className="text-[0.5rem] font-medium text-primary">3</b> Evaluate guard
            </li>
            <li className="flex min-h-[54px] flex-col items-center justify-center gap-[5px] border-r border-line p-1.5 text-center text-[0.49rem] text-dim max-[640px]:min-h-[46px] max-[640px]:border-b max-[640px]:border-line max-[640px]:border-r-0">
              <b className="text-[0.5rem] font-medium text-primary">4</b> Reject ambiguity
            </li>
            <li className="flex min-h-[54px] flex-col items-center justify-center gap-[5px] p-1.5 text-center text-[0.49rem] text-dim max-[640px]:col-span-2 max-[640px]:min-h-[46px]">
              <b className="text-[0.5rem] font-medium text-primary">5</b> Bound auto-chain
            </li>
          </ol>
        </div>
      </div>

      <div className={`${planeBase} border-diagram-amber/34 bg-diagram-amber-dim`}>
        <div className={planeHeading}>
          <span className={planeHeadingSpan}>03 / Atomic commit</span>
          <strong className={planeHeadingStrong}>State and intent become durable together</strong>
        </div>
        <div className="grid grid-cols-4 gap-1.5 max-[640px]:grid-cols-2">
          <div className="flex min-h-9 items-center justify-center gap-[5px] border border-diagram-amber/28 p-1.5 text-center text-[0.49rem] text-dim">
            <Database size={14} className="shrink-0 text-diagram-amber" />
            <span>Run + pinned revision</span>
          </div>
          <div className="flex min-h-9 items-center justify-center gap-[5px] border border-diagram-amber/28 p-1.5 text-center text-[0.49rem] text-dim">
            <HardDrive size={14} className="shrink-0 text-diagram-amber" />
            <span>Append-only event</span>
          </div>
          <div className="flex min-h-9 items-center justify-center gap-[5px] border border-diagram-amber/28 p-1.5 text-center text-[0.49rem] text-dim">
            <UserCheck size={14} className="shrink-0 text-diagram-amber" />
            <span>Approval / timer rows</span>
          </div>
          <div className="flex min-h-9 items-center justify-center gap-[5px] border border-diagram-amber/28 p-1.5 text-center text-[0.49rem] text-dim">
            <RefreshCw size={14} className="shrink-0 text-diagram-amber" />
            <span>Capability outbox</span>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-center gap-1.5 text-[0.49rem] text-diagram-amber">
          <LockKeyhole size={14} className="shrink-0" /> One PostgreSQL transaction
        </div>
      </div>

      <div className={deepFlowGrid}>
        <div className={deepBoxBase}>
          <Database size={14} className="mb-[5px] text-diagram-blue" />
          <strong className={deepBoxStrong}>Outbox</strong>
          <small className={deepBoxSmall}>authority</small>
        </div>
        <FlowArrow className={deepArrowMobile} />
        <div className={deepBoxBase}>
          <Activity size={14} className="mb-[5px] text-diagram-blue" />
          <strong className={deepBoxStrong}>Trigger.dev</strong>
          <small className={deepBoxSmall}>dispatcher</small>
        </div>
        <FlowArrow className={deepArrowMobile} />
        <div className={deepBoxBase}>
          <ServerCog size={14} className="mb-[5px] text-diagram-blue" />
          <strong className={deepBoxStrong}>Lease</strong>
          <small className={deepBoxSmall}>retry + recovery</small>
        </div>
        <FlowArrow className={deepArrowMobile} />
        <div className={`${deepBoxBase} ${deepIsAuthority}`}>
          <ShieldCheck size={14} className="mb-[5px] text-diagram-blue" />
          <strong className={deepBoxStrong}>Capability</strong>
          <small className={deepBoxSmall}>allowlisted effect</small>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-x-[15px] gap-y-[7px]">
        <span className="flex items-center gap-[5px] text-[0.48rem] text-quiet">
          <Database size={13} className="text-primary" /> Postgres = authority
        </span>
        <span className="flex items-center gap-[5px] text-[0.48rem] text-quiet">
          <Activity size={13} className="text-primary" /> Trigger.dev = delivery
        </span>
        <span className="flex items-center gap-[5px] text-[0.48rem] text-quiet">
          <RotateCcw size={13} className="text-primary" /> Failure = recoverable evidence
        </span>
      </div>
    </div>
  );
}

function DispatchFunnel() {
  const stageBase =
    "flex min-h-[150px] flex-col items-center justify-center border border-line bg-surface-raised px-2.5 py-3.5 text-center";
  const stageLabel = "mb-1 block text-[0.56rem] uppercase text-quiet";
  const mobileArrow = "max-[640px]:min-h-[27px] max-[640px]:rotate-90";
  return (
    <div className="grid min-h-[280px] grid-cols-[1fr_22px_1.2fr_22px_0.9fr_22px_1fr] items-stretch bg-[image:linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[length:24px_24px] p-7 max-[640px]:min-h-0 max-[640px]:grid-cols-1 max-[640px]:px-3.5 max-[640px]:py-5">
      <div className={`${stageBase} border-diagram-red/38 bg-diagram-red-dim`}>
        <span className={stageLabel}>Hard gate</span>
        <strong className={boxStrong}>Qualified candidates only</strong>
        <small className={boxSmall}>required skills · minimum proficiency</small>
      </div>
      <FlowArrow className={mobileArrow} />
      <div className={`${stageBase} border-diagram-blue/38 bg-diagram-blue-dim`}>
        <span className={stageLabel}>Rank signals</span>
        <div className="mt-3 grid w-full gap-1.5">
          <small className="m-0 flex items-center justify-center gap-[5px] text-[0.6rem] leading-[1.45] text-quiet">
            <CalendarClock size={13} /> availability
          </small>
          <small className="m-0 flex items-center justify-center gap-[5px] text-[0.6rem] leading-[1.45] text-quiet">
            <BriefcaseBusiness size={13} /> workload
          </small>
          <small className="m-0 flex items-center justify-center gap-[5px] text-[0.6rem] leading-[1.45] text-quiet">
            <MapPin size={13} /> distance
          </small>
          <small className="m-0 flex items-center justify-center gap-[5px] text-[0.6rem] leading-[1.45] text-quiet">
            <Gauge size={13} /> reliability
          </small>
        </div>
      </div>
      <FlowArrow className={mobileArrow} />
      <div className={stageBase}>
        <span className={stageLabel}>Shortlist</span>
        <ol className="mt-2.5 list-none pl-[18px] text-left text-[0.58rem] leading-[1.8] text-dim">
          <li>Candidate 01</li>
          <li>Candidate 02</li>
          <li>Candidate 03</li>
        </ol>
      </div>
      <FlowArrow className={mobileArrow} />
      <div className={`${stageBase} border-primary/42 bg-primary/7`}>
        <UserCheck size={20} className="mb-[11px] text-primary" />
        <strong className={boxStrong}>Human assigns</strong>
        <small className={boxSmall}>one-click decision</small>
      </div>
    </div>
  );
}

function AgentBoundary() {
  const planeBase = "border border-line bg-[rgba(12,12,12,0.88)] p-3";
  const planeHeading =
    "mb-2.5 flex items-center justify-between max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-1";
  const planeHeadingSpan = "text-[0.5rem] uppercase text-primary";
  const planeHeadingStrong = "text-[0.56rem] font-normal text-dim";
  const railText = "flex flex-col gap-[3px]";
  const railStrong = "text-[0.56rem] font-medium";
  const railSmall = "text-[0.48rem] leading-[1.4] text-quiet";
  const glyphBase =
    "inline-flex h-[26px] w-[26px] shrink-0 items-center justify-center border border-current font-heading text-[0.65rem] font-[650]";
  const deepFlowGrid = "grid grid-cols-[1fr_18px_1fr_18px_1.18fr_18px_1fr] items-stretch max-[640px]:grid-cols-1";
  return (
    <div className="grid min-h-[280px] gap-3 bg-[image:linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[length:24px_24px] p-[22px] max-[640px]:min-h-0 max-[640px]:gap-2.5 max-[640px]:p-3">
      <div className={`${planeBase} pb-2.5`}>
        <div className={planeHeading}>
          <span className={planeHeadingSpan}>Control plane</span>
          <strong className={planeHeadingStrong}>Devigear creates the run contract</strong>
        </div>
        <div className="grid grid-cols-[1fr_16px_1fr_1.2fr_1fr] items-stretch gap-1.5 max-[640px]:grid-cols-2">
          <div className="flex min-h-9 items-center justify-center gap-[5px] border border-line p-1.5 text-center text-[0.49rem] text-dim">
            <Bot size={15} className="shrink-0 text-diagram-blue" />
            <span>Agent request</span>
          </div>
          <FlowArrow className="max-[640px]:hidden" />
          <div className="flex min-h-9 items-center justify-center gap-[5px] border border-line p-1.5 text-center text-[0.49rem] text-dim">
            <GitBranch size={15} className="shrink-0 text-diagram-blue" />
            <span>Pinned context</span>
          </div>
          <div className="flex min-h-9 items-center justify-center gap-[5px] border border-line p-1.5 text-center text-[0.49rem] text-dim">
            <Gauge size={15} className="shrink-0 text-diagram-blue" />
            <span>Turn / tool / cost limits</span>
          </div>
          <div className="flex min-h-9 items-center justify-center gap-[5px] border border-line p-1.5 text-center text-[0.49rem] text-dim">
            <KeyRound size={15} className="shrink-0 text-diagram-blue" />
            <span>Opaque run ID</span>
          </div>
        </div>
      </div>

      <div className="border border-diagram-blue/40 bg-[rgba(12,12,12,0.88)] p-2.5">
        <div className="flex items-center gap-[9px] border-b border-line pb-2.5">
          <span className={`${glyphBase} text-[0.5rem] text-dim`}>VM</span>
          <div className={railText}>
            <strong className={railStrong}>Isolated Bun runner</strong>
            <small className={railSmall}>network denied by default · concurrency bounded</small>
          </div>
        </div>
        <div className="grid grid-cols-[1fr_22px_1fr] items-stretch py-2.5 max-[640px]:grid-cols-1">
          <div className="flex items-center gap-[9px] border border-diagram-blue/30 bg-diagram-blue-dim p-[9px]">
            <span className={`${glyphBase} text-diagram-blue`}>S</span>
            <div className={railText}>
              <strong className={railStrong}>Smithers harness</strong>
              <small className={railSmall}>durable checkpoints · recovery poll · terminal callbacks</small>
            </div>
          </div>
          <FlowArrow className={deepArrowMobile} />
          <div className="flex items-center gap-[9px] border border-primary/30 bg-primary/6 p-[9px]">
            <span className={`${glyphBase} text-[0.95rem] text-primary`}>π</span>
            <div className={railText}>
              <strong className={railStrong}>Pi agent</strong>
              <small className={railSmall}>model gateway · JSON mode · no shell / filesystem</small>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1.5 max-[640px]:grid-cols-2">
          <div className="grid grid-cols-[auto_1fr] gap-x-[6px] gap-y-[2px] border border-line p-[7px]">
            <PackageCheck size={14} className="row-span-2 text-diagram-amber" />
            <span className="text-[0.5rem]">Skill package</span>
            <small className="text-[0.44rem] text-quiet">task-specific instructions</small>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-x-[6px] gap-y-[2px] border border-line p-[7px]">
            <Wrench size={14} className="row-span-2 text-diagram-amber" />
            <span className="text-[0.5rem]">Fixed tool set</span>
            <small className="text-[0.44rem] text-quiet">projected per workflow</small>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-x-[6px] gap-y-[2px] border border-line p-[7px]">
            <FileCheck2 size={14} className="row-span-2 text-diagram-amber" />
            <span className="text-[0.5rem]">Run evidence</span>
            <small className="text-[0.44rem] text-quiet">turns · tokens · cost</small>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2.5 border border-diagram-green/38 bg-[rgba(12,12,12,0.88)] p-2.5 max-[640px]:flex-wrap max-[640px]:items-start">
        <span className={`${glyphBase} text-diagram-green text-[0.44rem]`}>MCP</span>
        <div className={`${railText} flex-1`}>
          <strong className={railStrong}>Short-lived capability exchange</strong>
          <small className={railSmall}>Streamable HTTP · explicit tool projection · fail-closed bearer auth</small>
        </div>
        <FlowArrow className="max-[640px]:hidden" />
        <div className="flex max-w-[230px] flex-wrap items-center justify-end gap-[5px] text-[0.46rem] text-dim max-[640px]:w-full max-[640px]:max-w-none max-[640px]:justify-start max-[640px]:border-t max-[640px]:border-line max-[640px]:pt-2">
          <LockKeyhole size={15} className="text-diagram-amber" />
          <span>RBAC</span>
          <b className="font-normal text-primary">∩</b>
          <span>run allowlist</span>
          <b className="font-normal text-primary">∩</b>
          <span>org policy</span>
        </div>
      </div>

      <div className={`${deepFlowGrid} border border-line bg-[rgba(12,12,12,0.88)]`}>
        <div className={deepBoxBase}>
          <Code2 size={14} className="mb-[5px] text-diagram-blue" />
          <strong className={deepBoxStrong}>Zod input</strong>
          <small className={deepBoxSmall}>typed contract</small>
        </div>
        <FlowArrow className={deepArrowMobile} />
        <div className={deepBoxBase}>
          <Gauge size={14} className="mb-[5px] text-diagram-blue" />
          <strong className={deepBoxStrong}>Claim limit</strong>
          <small className={deepBoxSmall}>before execution</small>
        </div>
        <FlowArrow className={deepArrowMobile} />
        <div className={deepBoxBase}>
          <Building2 size={14} className="mb-[5px] text-diagram-blue" />
          <strong className={deepBoxStrong}>Domain capability</strong>
          <small className={deepBoxSmall}>deterministic service</small>
        </div>
        <FlowArrow className={deepArrowMobile} />
        <div className={`${deepBoxBase} ${deepIsAuthority}`}>
          <Database size={14} className="mb-[5px] text-diagram-blue" />
          <strong className={deepBoxStrong}>Business truth</strong>
          <small className={deepBoxSmall}>tenant state + audit</small>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-[7px] max-[640px]:grid-cols-1">
        <div className="flex min-h-[34px] items-center justify-between border border-line px-[9px] py-[7px]">
          <span className="text-[0.47rem] text-quiet">Smithers DB</span>
          <strong className="text-[0.49rem] font-medium">checkpoints only</strong>
        </div>
        <div className="flex min-h-[34px] items-center justify-between border border-line px-[9px] py-[7px]">
          <span className="text-[0.47rem] text-quiet">Devigear DB</span>
          <strong className="text-[0.49rem] font-medium">business truth + audit</strong>
        </div>
      </div>
      <div className="mt-5 grid min-h-[42px] grid-cols-[auto_1fr_auto] items-center gap-[9px] border border-dashed border-diagram-red/50 bg-diagram-red-dim px-3 py-2 text-[0.62rem] text-diagram-red max-[640px]:items-start max-[640px]:grid-cols-[auto_1fr]">
        <X size={15} />
        <span>Raw SQL · database credentials · arbitrary tools</span>
        <strong className="text-[0.58rem] font-normal text-dim max-[640px]:col-start-2">
          never enter the model boundary
        </strong>
      </div>
    </div>
  );
}

function OfflineReplay() {
  const laneFlowChild = "flex min-h-[48px] flex-col items-center justify-center border border-line p-[7px] text-center";
  return (
    <div className="grid min-h-[280px] gap-3 bg-[image:linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[length:24px_24px] p-[22px] max-[640px]:min-h-0 max-[640px]:gap-2.5 max-[640px]:p-3">
      <div className="flex items-center gap-[9px] border border-line bg-[rgba(12,12,12,0.88)] p-2.5 max-[640px]:flex-wrap max-[640px]:items-start">
        <Smartphone size={16} className="text-diagram-blue" />
        <div className="flex flex-col gap-[3px]">
          <span>Technician intent</span>
          <strong className="text-[0.56rem] font-medium">useOptimisticFieldMutation</strong>
        </div>
        <small className="ml-auto max-w-[190px] text-right text-[0.48rem] leading-[1.4] text-quiet max-[640px]:ml-[25px] max-[640px]:max-w-none max-[640px]:text-left">
          one action enters two durable channels
        </small>
      </div>
      <div className="grid gap-2">
        <div className="grid grid-cols-[116px_1fr] border border-diagram-green/38 bg-[rgba(12,12,12,0.88)] p-2 max-[640px]:grid-cols-1">
          <div className="flex flex-col items-start justify-center gap-[5px] border-r border-line py-1.5 pl-1 pr-2.5 max-[640px]:flex-row max-[640px]:justify-start max-[640px]:border-b max-[640px]:border-r-0 max-[640px]:px-1 max-[640px]:pb-2 max-[640px]:pt-1">
            <Check size={15} className="text-diagram-green" />
            <span className="text-[0.47rem] text-quiet">Visible state</span>
            <strong className="text-[0.56rem] font-medium max-[640px]:ml-auto">Durable UX</strong>
          </div>
          <div className="grid grid-cols-[1fr_18px_1fr_18px_1fr] items-stretch pl-2 max-[640px]:grid-cols-1 max-[640px]:pl-0 max-[640px]:pt-2">
            <div className={laneFlowChild}>
              <span className="text-[0.5rem]">Pure patch</span>
              <small className="mt-1 text-center text-[0.47rem] leading-[1.35] text-quiet">immediate</small>
            </div>
            <FlowArrow className="max-[640px]:min-h-[18px] max-[640px]:rotate-90" />
            <div className={laneFlowChild}>
              <span className="text-[0.5rem]">Query cache</span>
              <small className="mt-1 text-center text-[0.47rem] leading-[1.35] text-quiet">optimistic view</small>
            </div>
            <FlowArrow className="max-[640px]:min-h-[18px] max-[640px]:rotate-90" />
            <div className={laneFlowChild}>
              <span className="text-[0.5rem]">Persisted cache</span>
              <small className="mt-1 text-center text-[0.47rem] leading-[1.35] text-quiet">survives restart</small>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-[116px_1fr] border border-diagram-amber/38 bg-[rgba(12,12,12,0.88)] p-2 max-[640px]:grid-cols-1">
          <div className="flex flex-col items-start justify-center gap-[5px] border-r border-line py-1.5 pl-1 pr-2.5 max-[640px]:flex-row max-[640px]:justify-start max-[640px]:border-b max-[640px]:border-r-0 max-[640px]:px-1 max-[640px]:pb-2 max-[640px]:pt-1">
            <HardDrive size={15} className="text-diagram-amber" />
            <span className="text-[0.47rem] text-quiet">Executable intent</span>
            <strong className="text-[0.56rem] font-medium max-[640px]:ml-auto">Durable work</strong>
          </div>
          <div className="grid grid-cols-[1fr_18px_1fr_18px_1fr] items-stretch pl-2 max-[640px]:grid-cols-1 max-[640px]:pl-0 max-[640px]:pt-2">
            <div className={laneFlowChild}>
              <span className="text-[0.5rem]">Mutation key</span>
              <small className="mt-1 text-center text-[0.47rem] leading-[1.35] text-quiet">+ variables</small>
            </div>
            <FlowArrow className="max-[640px]:min-h-[18px] max-[640px]:rotate-90" />
            <div className={laneFlowChild}>
              <span className="text-[0.5rem]">Paused mutation</span>
              <small className="mt-1 text-center text-[0.47rem] leading-[1.35] text-quiet">ordered queue</small>
            </div>
            <FlowArrow className="max-[640px]:min-h-[18px] max-[640px]:rotate-90" />
            <div className={laneFlowChild}>
              <span className="text-[0.5rem]">Persisted outbox</span>
              <small className="mt-1 text-center text-[0.47rem] leading-[1.35] text-quiet">survives restart</small>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-[9px] border border-line bg-[rgba(12,12,12,0.88)] px-[11px] py-[9px] max-[640px]:flex-wrap max-[640px]:items-start">
        <Activity size={15} className="text-diagram-blue" />
        <div className="flex flex-col gap-[3px]">
          <span>Single connectivity authority</span>
          <small className="text-[0.48rem] leading-[1.4] text-quiet">Expo network + foreground check + recovery poll</small>
        </div>
        <FlowArrow className="ml-auto max-[640px]:hidden" />
        <strong className="border border-diagram-blue/35 p-[7px] text-[0.56rem] font-medium text-diagram-blue max-[640px]:ml-6">
          onlineManager
        </strong>
      </div>

      <div className="border border-diagram-red/42 bg-[rgba(12,12,12,0.88)] p-2.5">
        <div className="mb-2 flex items-center gap-[7px] text-[0.53rem] text-diagram-red">
          <CloudOff size={16} />
          <span>Cold restart while offline</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 max-[640px]:grid-cols-1">
          <div className="flex min-h-[35px] items-center gap-[7px] border border-line p-1.5 text-[0.48rem]">
            <b className="text-[0.5rem] font-medium text-primary">1</b>
            <span>Hydrate visible cache</span>
          </div>
          <div className="flex min-h-[35px] items-center gap-[7px] border border-line p-1.5 text-[0.48rem]">
            <b className="text-[0.5rem] font-medium text-primary">2</b>
            <span>Register mutation functions</span>
          </div>
          <div className="flex min-h-[35px] items-center gap-[7px] border border-line p-1.5 text-[0.48rem]">
            <b className="text-[0.5rem] font-medium text-primary">3</b>
            <span>Hydrate paused mutations</span>
          </div>
        </div>
        <p className="m-0 mt-2 flex items-center gap-[5px] text-[0.46rem] text-quiet">
          <Unplug size={13} /> Optimistic patches are not applied twice after boot.
        </p>
      </div>

      <div className="grid grid-cols-[1fr_18px_1fr_18px_1.18fr_18px_1fr] items-stretch border border-line bg-[rgba(12,12,12,0.88)] max-[640px]:grid-cols-1">
        <div className={deepBoxBase}>
          <RefreshCw size={14} className="mb-[5px] text-diagram-blue" />
          <strong className={deepBoxStrong}>Reconnect</strong>
          <small className={deepBoxSmall}>resume paused</small>
        </div>
        <FlowArrow className={deepArrowMobile} />
        <div className={deepBoxBase}>
          <GitBranch size={14} className="mb-[5px] text-diagram-blue" />
          <strong className={deepBoxStrong}>Ordered drain</strong>
          <small className={deepBoxSmall}>preserve intent</small>
        </div>
        <FlowArrow className={deepArrowMobile} />
        <div className={deepBoxBase}>
          <Gauge size={14} className="mb-[5px] text-diagram-blue" />
          <strong className={deepBoxStrong}>Queue gate</strong>
          <small className={deepBoxSmall}>wait for last mutation</small>
        </div>
        <FlowArrow className={deepArrowMobile} />
        <div className={`${deepBoxBase} ${deepIsAuthority}`}>
          <Database size={14} className="mb-[5px] text-diagram-blue" />
          <strong className={deepBoxStrong}>Server truth</strong>
          <small className={deepBoxSmall}>one final refetch</small>
        </div>
      </div>
      <div className="grid grid-cols-[auto_auto_18px_auto_1fr] items-center gap-[7px] border border-diagram-red/34 bg-[rgba(12,12,12,0.88)] px-2.5 py-2 text-[0.48rem] text-diagram-red max-[640px]:grid-cols-[auto_1fr] max-[640px]:items-start">
        <X size={14} />
        <span>Online rejection</span>
        <FlowArrow className="max-[640px]:hidden" />
        <strong className="text-[0.49rem] font-medium text-dim max-[640px]:col-start-2 max-[640px]:ml-0 max-[640px]:text-left">
          Refetch authority + mark failure
        </strong>
        <small className="ml-auto text-right text-[0.6rem] text-quiet max-[640px]:col-start-2 max-[640px]:ml-0 max-[640px]:text-left">
          No stale snapshot rolls back a later queued write.
        </small>
      </div>
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
