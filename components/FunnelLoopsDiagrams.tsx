import {
  Activity,
  ArrowDown,
  ArrowRight,
  BarChart3,
  Bot,
  Braces,
  Check,
  Database,
  FileCheck2,
  FileJson2,
  FileText,
  GitBranch,
  Gauge,
  KeyRound,
  Layers3,
  ListChecks,
  LockKeyhole,
  MessageSquareText,
  Network,
  PackageCheck,
  RefreshCw,
  ShieldCheck,
  Split,
  TerminalSquare,
  Webhook,
  Workflow,
  X,
} from "lucide-react";

// Shared treatments mirroring CaseStudyDiagram's visual language.
const gridBg =
  "bg-[image:linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[length:24px_24px]";
const boxBase =
  "flex min-h-[110px] flex-col items-center justify-center border border-line bg-surface-raised px-2.5 py-3.5 text-center";
const boxStrong = "text-[0.67rem] font-medium leading-[1.35]";
const boxSmall = "mt-1.5 text-[0.6rem] leading-[1.45] text-quiet";
const deepBoxBase =
  "flex min-h-[58px] flex-col items-center justify-center border border-line p-[7px] text-center";
const deepBoxStrong = "text-[0.55rem] font-medium";
const deepBoxSmall = "mt-1 text-center text-[0.47rem] leading-[1.35] text-quiet";
const deepIsAuthority = "border-diagram-green/42 bg-diagram-green-dim";
const deepArrowMobile = "max-[640px]:min-h-[20px] max-[640px]:rotate-90";
const planeBase = "border border-line bg-[rgba(12,12,12,0.88)] p-3";
const planeHeading =
  "mb-2.5 flex items-center justify-between max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-1";
const planeHeadingSpan = "text-[0.5rem] uppercase text-primary";
const planeHeadingStrong = "text-[0.56rem] font-normal text-dim";
const deepFlowGrid =
  "grid grid-cols-[1fr_18px_1fr_18px_1.18fr_18px_1fr] items-stretch max-[640px]:grid-cols-1";
const chip =
  "flex min-h-[25px] items-center gap-1.5 border border-line px-[7px] text-[0.57rem] text-dim";
const forbiddenStrip =
  "grid min-h-[42px] grid-cols-[auto_1fr_auto] items-center gap-[9px] border border-dashed border-diagram-red/50 bg-diagram-red-dim px-3 py-2 text-[0.62rem] text-diagram-red max-[640px]:items-start max-[640px]:grid-cols-[auto_1fr]";

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

export function FunnelSpec() {
  return (
    <div className={`grid min-h-[280px] gap-3 ${gridBg} p-[22px] max-[640px]:min-h-0 max-[640px]:gap-2.5 max-[640px]:p-3`}>
      <div className={planeBase}>
        <div className={planeHeading}>
          <span className={planeHeadingSpan}>01 / One flat document</span>
          <strong className={planeHeadingStrong}>funnel.json carries the whole funnel</strong>
        </div>
        <div className={deepFlowGrid}>
          <div className={deepBoxBase}>
            <FileJson2 size={15} className="mb-[5px] text-diagram-blue" />
            <strong className={deepBoxStrong}>Landing</strong>
            <small className={deepBoxSmall}>routing inline</small>
          </div>
          <FlowArrow className={deepArrowMobile} />
          <div className={deepBoxBase}>
            <ListChecks size={15} className="mb-[5px] text-diagram-blue" />
            <strong className={deepBoxStrong}>Form</strong>
            <small className={deepBoxSmall}>typed fields</small>
          </div>
          <FlowArrow className={deepArrowMobile} />
          <div className={deepBoxBase}>
            <Split size={15} className="mb-[5px] text-diagram-blue" />
            <strong className={deepBoxStrong}>Branch</strong>
            <small className={deepBoxSmall}>conditions + fallback</small>
          </div>
          <FlowArrow className={deepArrowMobile} />
          <div className={`${deepBoxBase} ${deepIsAuthority}`}>
            <Check size={15} className="mb-[5px] text-diagram-green" />
            <strong className={deepBoxStrong}>Thank-you</strong>
            <small className={deepBoxSmall}>terminal step</small>
          </div>
        </div>
      </div>

      <div className={planeBase}>
        <div className={planeHeading}>
          <span className={planeHeadingSpan}>02 / Routing union</span>
          <strong className={planeHeadingStrong}>One discriminated union, four shapes</strong>
        </div>
        <div className="grid grid-cols-4 gap-1.5 max-[640px]:grid-cols-2">
          <div className="flex min-h-9 items-center justify-center gap-[5px] border border-line p-1.5 text-center text-[0.49rem] text-dim">
            <ArrowRight size={14} className="shrink-0 text-diagram-blue" />
            <span>Linear · next</span>
          </div>
          <div className="flex min-h-9 items-center justify-center gap-[5px] border border-line p-1.5 text-center text-[0.49rem] text-dim">
            <GitBranch size={14} className="shrink-0 text-diagram-blue" />
            <span>Conditional · fallback required</span>
          </div>
          <div className="flex min-h-9 items-center justify-center gap-[5px] border border-line p-1.5 text-center text-[0.49rem] text-dim">
            <Split size={14} className="shrink-0 text-diagram-blue" />
            <span>Split-test · weights = 100</span>
          </div>
          <div className="flex min-h-9 items-center justify-center gap-[5px] border border-line p-1.5 text-center text-[0.49rem] text-dim">
            <Network size={14} className="shrink-0 text-diagram-blue" />
            <span>Multi-path · labeled choices</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-[9px] border border-diagram-amber/38 bg-[rgba(12,12,12,0.88)] px-[11px] py-[9px] max-[640px]:flex-wrap max-[640px]:items-start">
        <Workflow size={15} className="text-diagram-amber" />
        <div className="flex flex-col gap-[3px]">
          <span className="text-[0.56rem] font-medium">Actions are top-level records</span>
          <small className="text-[0.48rem] leading-[1.4] text-quiet">
            each references its trigger step · field mappings by step and field name
          </small>
        </div>
        <strong className="ml-auto border border-diagram-amber/35 p-[7px] font-mono text-[0.52rem] font-medium text-diagram-amber max-[640px]:ml-6">
          {'trigger: "after:<stepId>"'}
        </strong>
      </div>

      <div className={forbiddenStrip}>
        <X size={15} />
        <span>Generation status · progress · editor selection</span>
        <strong className="text-[0.58rem] font-normal text-dim max-[640px]:col-start-2">
          never enter the spec
        </strong>
      </div>
    </div>
  );
}

export function SkillRuntime() {
  const railText = "flex flex-col gap-[3px]";
  const railStrong = "text-[0.56rem] font-medium";
  const railSmall = "text-[0.48rem] leading-[1.4] text-quiet";
  return (
    <div className={`grid min-h-[280px] gap-3 ${gridBg} p-[22px] max-[640px]:min-h-0 max-[640px]:gap-2.5 max-[640px]:p-3`}>
      <div className={planeBase}>
        <div className={planeHeading}>
          <span className={planeHeadingSpan}>Host session</span>
          <strong className={planeHeadingStrong}>Hydrate the VM before the agent wakes</strong>
        </div>
        <div className="grid grid-cols-3 gap-1.5 max-[640px]:grid-cols-1">
          <div className="flex min-h-9 items-center justify-center gap-[5px] border border-line p-1.5 text-center text-[0.49rem] text-dim">
            <FileText size={14} className="shrink-0 text-diagram-blue" />
            <span>Mount /skills/*.md</span>
          </div>
          <div className="flex min-h-9 items-center justify-center gap-[5px] border border-line p-1.5 text-center text-[0.49rem] text-dim">
            <FileJson2 size={14} className="shrink-0 text-diagram-blue" />
            <span>Load funnel → /funnel.json</span>
          </div>
          <div className="flex min-h-9 items-center justify-center gap-[5px] border border-line p-1.5 text-center text-[0.49rem] text-dim">
            <KeyRound size={14} className="shrink-0 text-diagram-blue" />
            <span>Model via gateway config</span>
          </div>
        </div>
      </div>

      <div className="border border-diagram-blue/40 bg-[rgba(12,12,12,0.88)] p-2.5">
        <div className="flex items-center gap-[9px] border-b border-line pb-2.5">
          <span className="inline-flex h-[26px] w-[26px] shrink-0 items-center justify-center border border-current font-heading text-[0.5rem] font-[650] text-dim">
            VM
          </span>
          <div className={railText}>
            <strong className={railStrong}>Sandboxed micro-VM</strong>
            <small className={railSmall}>virtual filesystem · no credentials · effects leave through host commands</small>
          </div>
        </div>
        <div className="grid grid-cols-[1fr_22px_1fr] items-stretch py-2.5 max-[640px]:grid-cols-1">
          <div className="flex items-center gap-[9px] border border-primary/30 bg-primary/6 p-[9px]">
            <Bot size={16} className="shrink-0 text-primary" />
            <div className={railText}>
              <strong className={railStrong}>Pi coding agent</strong>
              <small className={railSmall}>reads the skill index first · loads one skill per task</small>
            </div>
          </div>
          <FlowArrow className={deepArrowMobile} />
          <div className="flex items-center gap-[9px] border border-diagram-blue/30 bg-diagram-blue-dim p-[9px]">
            <TerminalSquare size={16} className="shrink-0 text-diagram-blue" />
            <div className={railText}>
              <strong className={railStrong}>jq edits /funnel.json</strong>
              <small className={railSmall}>surgical patches · never rewrites the file</small>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-[7px]">
          <span className={chip}>
            <FileText size={13} className="text-diagram-amber" /> SKILLS.md index
          </span>
          <span className={chip}>planning</span>
          <span className={chip}>editing</span>
          <span className={chip}>routing</span>
          <span className={chip}>field types</span>
          <span className={chip}>action intents</span>
          <span className={chip}>layout</span>
          <span className={chip}>publishing</span>
        </div>
      </div>

      <div className={forbiddenStrip}>
        <X size={15} />
        <span>Database credentials · business network · hidden side effects</span>
        <strong className="text-[0.58rem] font-normal text-dim max-[640px]:col-start-2">
          do not exist inside the VM
        </strong>
      </div>
    </div>
  );
}

export function ValidationGate() {
  const checkCell =
    "flex min-h-[35px] items-center gap-[7px] border border-line p-1.5 text-[0.48rem] text-dim";
  return (
    <div className={`grid min-h-[280px] gap-3 ${gridBg} p-[22px] max-[640px]:min-h-0 max-[640px]:gap-2.5 max-[640px]:p-3`}>
      <div className={deepFlowGrid}>
        <div className={deepBoxBase}>
          <Bot size={14} className="mb-[5px] text-diagram-blue" />
          <strong className={deepBoxStrong}>Agent edit</strong>
          <small className={deepBoxSmall}>jq patch + sync</small>
        </div>
        <FlowArrow className={deepArrowMobile} />
        <div className={deepBoxBase}>
          <Braces size={14} className="mb-[5px] text-diagram-blue" />
          <strong className={deepBoxStrong}>Schema</strong>
          <small className={deepBoxSmall}>Zod contract</small>
        </div>
        <FlowArrow className={deepArrowMobile} />
        <div className={deepBoxBase}>
          <ShieldCheck size={14} className="mb-[5px] text-diagram-blue" />
          <strong className={deepBoxStrong}>Structural validator</strong>
          <small className={deepBoxSmall}>graph properties</small>
        </div>
        <FlowArrow className={deepArrowMobile} />
        <div className={`${deepBoxBase} ${deepIsAuthority}`}>
          <Database size={14} className="mb-[5px] text-diagram-green" />
          <strong className={deepBoxStrong}>Persist</strong>
          <small className={deepBoxSmall}>only valid funnels</small>
        </div>
      </div>

      <div className={planeBase}>
        <div className={planeHeading}>
          <span className={planeHeadingSpan}>What structure means</span>
          <strong className={planeHeadingStrong}>Six properties every funnel must hold</strong>
        </div>
        <div className="grid grid-cols-3 gap-1.5 max-[640px]:grid-cols-1">
          <div className={checkCell}>
            <b className="text-[0.5rem] font-medium text-primary">1</b>
            <span>A terminal step exists</span>
          </div>
          <div className={checkCell}>
            <b className="text-[0.5rem] font-medium text-primary">2</b>
            <span>Every routing target resolves</span>
          </div>
          <div className={checkCell}>
            <b className="text-[0.5rem] font-medium text-primary">3</b>
            <span>No cycles · depth-first search</span>
          </div>
          <div className={checkCell}>
            <b className="text-[0.5rem] font-medium text-primary">4</b>
            <span>No unreachable steps · walk from entry</span>
          </div>
          <div className={checkCell}>
            <b className="text-[0.5rem] font-medium text-primary">5</b>
            <span>Split weights sum to 100</span>
          </div>
          <div className={checkCell}>
            <b className="text-[0.5rem] font-medium text-primary">6</b>
            <span>Conditionals declare a fallback</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[auto_auto_18px_auto_1fr] items-center gap-[7px] border border-diagram-amber/38 bg-[rgba(12,12,12,0.88)] px-2.5 py-2 text-[0.48rem] text-diagram-amber max-[640px]:grid-cols-[auto_1fr] max-[640px]:items-start">
        <RefreshCw size={14} />
        <span>Violation rejects the sync</span>
        <FlowArrow className="max-[640px]:hidden" />
        <strong className="text-[0.49rem] font-medium text-dim max-[640px]:col-start-2 max-[640px]:ml-0 max-[640px]:text-left">
          Error written for the agent to act on
        </strong>
        <small className="ml-auto text-right text-[0.6rem] text-quiet max-[640px]:col-start-2 max-[640px]:ml-0 max-[640px]:text-left">
          One rejected edit costs one round trip.
        </small>
      </div>

      <div className={forbiddenStrip}>
        <X size={15} />
        <span>Silent repair of model output</span>
        <strong className="text-[0.58rem] font-normal text-dim max-[640px]:col-start-2">
          the platform never patches what it did not ask for
        </strong>
      </div>
    </div>
  );
}

export function ArtifactSync() {
  const laneFlowChild =
    "flex min-h-[48px] flex-col items-center justify-center border border-line p-[7px] text-center";
  return (
    <div className={`grid min-h-[280px] gap-3 ${gridBg} p-[22px] max-[640px]:min-h-0 max-[640px]:gap-2.5 max-[640px]:p-3`}>
      <div className="grid gap-2">
        <div className="grid grid-cols-[116px_1fr] border border-diagram-green/38 bg-[rgba(12,12,12,0.88)] p-2 max-[640px]:grid-cols-1">
          <div className="flex flex-col items-start justify-center gap-[5px] border-r border-line py-1.5 pl-1 pr-2.5 max-[640px]:flex-row max-[640px]:justify-start max-[640px]:border-b max-[640px]:border-r-0 max-[640px]:px-1 max-[640px]:pb-2 max-[640px]:pt-1">
            <Database size={15} className="text-diagram-green" />
            <span className="text-[0.47rem] text-quiet">Truth channel</span>
            <strong className="text-[0.56rem] font-medium max-[640px]:ml-auto">Creates facts</strong>
          </div>
          <div className="grid grid-cols-[1fr_18px_1fr_18px_1fr_18px_1fr] items-stretch pl-2 max-[640px]:grid-cols-1 max-[640px]:pl-0 max-[640px]:pt-2">
            <div className={laneFlowChild}>
              <span className="text-[0.5rem]">/funnel.json</span>
              <small className="mt-1 text-center text-[0.47rem] leading-[1.35] text-quiet">read after each turn</small>
            </div>
            <FlowArrow className="max-[640px]:min-h-[18px] max-[640px]:rotate-90" />
            <div className={laneFlowChild}>
              <span className="text-[0.5rem]">Auto-sync</span>
              <small className="mt-1 text-center text-[0.47rem] leading-[1.35] text-quiet">debounce · hash dedupe · validate</small>
            </div>
            <FlowArrow className="max-[640px]:min-h-[18px] max-[640px]:rotate-90" />
            <div className={laneFlowChild}>
              <span className="text-[0.5rem]">Gateway</span>
              <small className="mt-1 text-center text-[0.47rem] leading-[1.35] text-quiet">authenticated host call</small>
            </div>
            <FlowArrow className="max-[640px]:min-h-[18px] max-[640px]:rotate-90" />
            <div className={`${laneFlowChild} ${deepIsAuthority}`}>
              <span className="text-[0.5rem]">Convex</span>
              <small className="mt-1 text-center text-[0.47rem] leading-[1.35] text-quiet">builder subscribes</small>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-[116px_1fr] border border-diagram-blue/38 bg-[rgba(12,12,12,0.88)] p-2 max-[640px]:grid-cols-1">
          <div className="flex flex-col items-start justify-center gap-[5px] border-r border-line py-1.5 pl-1 pr-2.5 max-[640px]:flex-row max-[640px]:justify-start max-[640px]:border-b max-[640px]:border-r-0 max-[640px]:px-1 max-[640px]:pb-2 max-[640px]:pt-1">
            <MessageSquareText size={15} className="text-diagram-blue" />
            <span className="text-[0.47rem] text-quiet">Presentation channel</span>
            <strong className="text-[0.56rem] font-medium max-[640px]:ml-auto">Animates work</strong>
          </div>
          <div className="grid grid-cols-[1fr_18px_1fr_18px_1fr_18px_1fr] items-stretch pl-2 max-[640px]:grid-cols-1 max-[640px]:pl-0 max-[640px]:pt-2">
            <div className={laneFlowChild}>
              <span className="text-[0.5rem]">Agent events</span>
              <small className="mt-1 text-center text-[0.47rem] leading-[1.35] text-quiet">text · tool calls</small>
            </div>
            <FlowArrow className="max-[640px]:min-h-[18px] max-[640px]:rotate-90" />
            <div className={laneFlowChild}>
              <span className="text-[0.5rem]">Stream adapter</span>
              <small className="mt-1 text-center text-[0.47rem] leading-[1.35] text-quiet">AI SDK wire protocol</small>
            </div>
            <FlowArrow className="max-[640px]:min-h-[18px] max-[640px]:rotate-90" />
            <div className={laneFlowChild}>
              <span className="text-[0.5rem]">Chat UI</span>
              <small className="mt-1 text-center text-[0.47rem] leading-[1.35] text-quiet">standard useChat client</small>
            </div>
            <FlowArrow className="max-[640px]:min-h-[18px] max-[640px]:rotate-90" />
            <div className={laneFlowChild}>
              <span className="text-[0.5rem]">Canvas cue</span>
              <small className="mt-1 text-center text-[0.47rem] leading-[1.35] text-quiet">funnel-updated event</small>
            </div>
          </div>
        </div>
      </div>

      <div className={planeBase}>
        <div className={planeHeading}>
          <span className={planeHeadingSpan}>Host toolkit</span>
          <strong className={planeHeadingStrong}>Four commands are the only exits from the VM</strong>
        </div>
        <div className="grid grid-cols-4 gap-1.5 max-[640px]:grid-cols-2">
          <div className="flex min-h-9 items-center justify-center gap-[5px] border border-line p-1.5 text-center text-[0.49rem] text-dim">
            <RefreshCw size={14} className="shrink-0 text-diagram-amber" />
            <span>sync</span>
          </div>
          <div className="flex min-h-9 items-center justify-center gap-[5px] border border-line p-1.5 text-center text-[0.49rem] text-dim">
            <PackageCheck size={14} className="shrink-0 text-diagram-amber" />
            <span>publish</span>
          </div>
          <div className="flex min-h-9 items-center justify-center gap-[5px] border border-line p-1.5 text-center text-[0.49rem] text-dim">
            <BarChart3 size={14} className="shrink-0 text-diagram-amber" />
            <span>analytics</span>
          </div>
          <div className="flex min-h-9 items-center justify-center gap-[5px] border border-line p-1.5 text-center text-[0.49rem] text-dim">
            <Database size={14} className="shrink-0 text-diagram-amber" />
            <span>load</span>
          </div>
        </div>
      </div>

      <div className={forbiddenStrip}>
        <X size={15} />
        <span>Parsing the chat stream to reconstruct state</span>
        <strong className="text-[0.58rem] font-normal text-dim max-[640px]:col-start-2">
          the canvas only trusts the database
        </strong>
      </div>
    </div>
  );
}

export function IntegrationOutbox() {
  return (
    <div className={`grid min-h-[280px] gap-3 ${gridBg} p-[22px] max-[640px]:min-h-0 max-[640px]:gap-2.5 max-[640px]:p-3`}>
      <div className="flex items-center gap-[9px] border border-line bg-[rgba(12,12,12,0.88)] p-2.5 max-[640px]:flex-wrap max-[640px]:items-start">
        <Layers3 size={16} className="text-diagram-blue" />
        <div className="flex flex-col gap-[3px]">
          <span className="text-[0.56rem] font-medium">Canonical entities</span>
          <small className="text-[0.48rem] leading-[1.4] text-quiet">
            contact · lead · company · deal: typed core fields + per-provider external refs
          </small>
        </div>
        <small className="ml-auto max-w-[200px] text-right text-[0.48rem] leading-[1.4] text-quiet max-[640px]:ml-[25px] max-[640px]:max-w-none max-[640px]:text-left">
          one record, several CRMs, independent sync state
        </small>
      </div>

      <div className={planeBase}>
        <div className={planeHeading}>
          <span className={planeHeadingSpan}>Outbound</span>
          <strong className={planeHeadingStrong}>Changes leave through a durable outbox</strong>
        </div>
        <div className={deepFlowGrid}>
          <div className={deepBoxBase}>
            <Activity size={14} className="mb-[5px] text-diagram-blue" />
            <strong className={deepBoxStrong}>Entity change</strong>
            <small className={deepBoxSmall}>create · update · delete</small>
          </div>
          <FlowArrow className={deepArrowMobile} />
          <div className={deepBoxBase}>
            <Database size={14} className="mb-[5px] text-diagram-blue" />
            <strong className={deepBoxStrong}>CDC outbox</strong>
            <small className={deepBoxSmall}>payload-hash dedupe · bounded retries</small>
          </div>
          <FlowArrow className={deepArrowMobile} />
          <div className={deepBoxBase}>
            <PackageCheck size={14} className="mb-[5px] text-diagram-blue" />
            <strong className={deepBoxStrong}>Generated adapter</strong>
            <small className={deepBoxSmall}>from declarative config</small>
          </div>
          <FlowArrow className={deepArrowMobile} />
          <div className={`${deepBoxBase} ${deepIsAuthority}`}>
            <Network size={14} className="mb-[5px] text-diagram-green" />
            <strong className={deepBoxStrong}>Provider CRM</strong>
            <small className={deepBoxSmall}>upsert semantics</small>
          </div>
        </div>
      </div>

      <div className={planeBase}>
        <div className={planeHeading}>
          <span className={planeHeadingSpan}>Inbound</span>
          <strong className={planeHeadingStrong}>Webhooks are verified, then made idempotent</strong>
        </div>
        <div className={deepFlowGrid}>
          <div className={deepBoxBase}>
            <Webhook size={14} className="mb-[5px] text-diagram-amber" />
            <strong className={deepBoxStrong}>Webhook</strong>
            <small className={deepBoxSmall}>raw payload stored</small>
          </div>
          <FlowArrow className={deepArrowMobile} />
          <div className={deepBoxBase}>
            <LockKeyhole size={14} className="mb-[5px] text-diagram-amber" />
            <strong className={deepBoxStrong}>Signature check</strong>
            <small className={deepBoxSmall}>fail-closed</small>
          </div>
          <FlowArrow className={deepArrowMobile} />
          <div className={deepBoxBase}>
            <KeyRound size={14} className="mb-[5px] text-diagram-amber" />
            <strong className={deepBoxStrong}>Event ID dedupe</strong>
            <small className={deepBoxSmall}>duplicates skipped</small>
          </div>
          <FlowArrow className={deepArrowMobile} />
          <div className={`${deepBoxBase} ${deepIsAuthority}`}>
            <Layers3 size={14} className="mb-[5px] text-diagram-green" />
            <strong className={deepBoxStrong}>Canonical record</strong>
            <small className={deepBoxSmall}>linked by external ref</small>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-x-[15px] gap-y-[7px]">
        <span className="flex items-center gap-[5px] text-[0.48rem] text-quiet">
          <FileCheck2 size={13} className="text-primary" /> Contract tests hold every connector to one suite
        </span>
        <span className="flex items-center gap-[5px] text-[0.48rem] text-quiet">
          <Check size={13} className="text-primary" /> HubSpot = production-ready reference
        </span>
        <span className="flex items-center gap-[5px] text-[0.48rem] text-quiet">
          <Braces size={13} className="text-primary" /> Next connector = config + thin overrides
        </span>
      </div>
    </div>
  );
}

export function EventPipeline() {
  return (
    <div className={`grid min-h-[280px] gap-3 ${gridBg} p-[22px] max-[640px]:min-h-0 max-[640px]:gap-2.5 max-[640px]:p-3`}>
      <div className="mb-[2px] flex flex-wrap justify-start gap-[7px]">
        <span className={chip}>
          <Activity size={13} className="text-diagram-blue" /> view · start · submit · complete · abandon
        </span>
        <span className={chip}>
          <ListChecks size={13} className="text-diagram-blue" /> field focus · blur · change · error
        </span>
        <span className={chip}>
          <GitBranch size={13} className="text-diagram-blue" /> routing decisions
        </span>
        <span className={chip}>
          <Workflow size={13} className="text-diagram-blue" /> automation + integration outcomes
        </span>
      </div>

      <div className={deepFlowGrid}>
        <div className={deepBoxBase}>
          <Network size={14} className="mb-[5px] text-diagram-blue" />
          <strong className={deepBoxStrong}>Published funnel</strong>
          <small className={deepBoxSmall}>18-type taxonomy</small>
        </div>
        <FlowArrow className={deepArrowMobile} />
        <div className={deepBoxBase}>
          <RefreshCw size={14} className="mb-[5px] text-diagram-blue" />
          <strong className={deepBoxStrong}>Batching SDK</strong>
          <small className={deepBoxSmall}>device · geo · attribution</small>
        </div>
        <FlowArrow className={deepArrowMobile} />
        <div className={deepBoxBase}>
          <Database size={14} className="mb-[5px] text-diagram-blue" />
          <strong className={deepBoxStrong}>Tinybird</strong>
          <small className={deepBoxSmall}>raw + materialized views</small>
        </div>
        <FlowArrow className={deepArrowMobile} />
        <div className={`${deepBoxBase} ${deepIsAuthority}`}>
          <BarChart3 size={14} className="mb-[5px] text-diagram-green" />
          <strong className={deepBoxStrong}>Pipes</strong>
          <small className={deepBoxSmall}>queryable decisions</small>
        </div>
      </div>

      <div className={planeBase}>
        <div className={planeHeading}>
          <span className={planeHeadingSpan}>Served surfaces</span>
          <strong className={planeHeadingStrong}>The same pipeline answers humans and the agent</strong>
        </div>
        <div className="grid grid-cols-4 gap-1.5 max-[640px]:grid-cols-2">
          <div className="flex min-h-9 items-center justify-center gap-[5px] border border-line p-1.5 text-center text-[0.49rem] text-dim">
            <Gauge size={14} className="shrink-0 text-diagram-amber" />
            <span>Conversion funnel</span>
          </div>
          <div className="flex min-h-9 items-center justify-center gap-[5px] border border-line p-1.5 text-center text-[0.49rem] text-dim">
            <ListChecks size={14} className="shrink-0 text-diagram-amber" />
            <span>Step breakdown</span>
          </div>
          <div className="flex min-h-9 items-center justify-center gap-[5px] border border-line p-1.5 text-center text-[0.49rem] text-dim">
            <Split size={14} className="shrink-0 text-diagram-amber" />
            <span>Journey Sankey</span>
          </div>
          <div className="flex min-h-9 items-center justify-center gap-[5px] border border-line p-1.5 text-center text-[0.49rem] text-dim">
            <Bot size={14} className="shrink-0 text-diagram-amber" />
            <span>Agent analytics command</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-[9px] border border-line bg-[rgba(12,12,12,0.88)] px-[11px] py-[9px] max-[640px]:flex-wrap max-[640px]:items-start">
        <GitBranch size={15} className="text-diagram-blue" />
        <div className="flex flex-col gap-[3px]">
          <span className="text-[0.56rem] font-medium">Routing decisions are recorded events</span>
          <small className="text-[0.48rem] leading-[1.4] text-quiet">
            the runtime logs which branch fired and why
          </small>
        </div>
        <strong className="ml-auto border border-diagram-blue/35 p-[7px] text-[0.56rem] font-medium text-diagram-blue max-[640px]:ml-6">
          ground truth, not inference
        </strong>
      </div>
    </div>
  );
}

export function BenchmarkHarness() {
  const categoryCell =
    "flex min-h-[54px] flex-col items-center justify-center gap-[5px] border border-line p-1.5 text-center text-[0.49rem] text-dim";
  return (
    <div className={`grid min-h-[280px] gap-3 ${gridBg} p-[22px] max-[640px]:min-h-0 max-[640px]:gap-2.5 max-[640px]:p-3`}>
      <div className={deepFlowGrid}>
        <div className={deepBoxBase}>
          <MessageSquareText size={14} className="mb-[5px] text-diagram-blue" />
          <strong className={deepBoxStrong}>Natural language</strong>
          <small className={deepBoxSmall}>&quot;make email optional&quot;</small>
        </div>
        <FlowArrow className={deepArrowMobile} />
        <div className={deepBoxBase}>
          <Bot size={14} className="mb-[5px] text-diagram-blue" />
          <strong className={deepBoxStrong}>Agent</strong>
          <small className={deepBoxSmall}>finds the skill itself</small>
        </div>
        <FlowArrow className={deepArrowMobile} />
        <div className={deepBoxBase}>
          <TerminalSquare size={14} className="mb-[5px] text-diagram-blue" />
          <strong className={deepBoxStrong}>jq edit in the VM</strong>
          <small className={deepBoxSmall}>no mechanism hints</small>
        </div>
        <FlowArrow className={deepArrowMobile} />
        <div className={`${deepBoxBase} ${deepIsAuthority}`}>
          <FileCheck2 size={14} className="mb-[5px] text-diagram-green" />
          <strong className={deepBoxStrong}>Verifier</strong>
          <small className={deepBoxSmall}>reads the document back</small>
        </div>
      </div>

      <div className={planeBase}>
        <div className={planeHeading}>
          <span className={planeHeadingSpan}>Suite</span>
          <strong className={planeHeadingStrong}>Eleven operations, four categories, 11/11 passing</strong>
        </div>
        <div className="grid grid-cols-4 gap-1.5 max-[640px]:grid-cols-2">
          <div className={categoryCell}>
            <ListChecks size={14} className="text-diagram-amber" />
            <span>Field editing</span>
          </div>
          <div className={categoryCell}>
            <GitBranch size={14} className="text-diagram-amber" />
            <span>Routing changes</span>
          </div>
          <div className={categoryCell}>
            <Layers3 size={14} className="text-diagram-amber" />
            <span>Step operations</span>
          </div>
          <div className={categoryCell}>
            <Workflow size={14} className="text-diagram-amber" />
            <span>Funnel creation</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-[9px] border border-line bg-[rgba(12,12,12,0.88)] px-[11px] py-[9px] max-[640px]:flex-wrap max-[640px]:items-start">
        <FileText size={15} className="text-diagram-amber" />
        <div className="flex flex-col gap-[3px]">
          <span className="text-[0.56rem] font-medium">The skill markdown has tests too</span>
          <small className="text-[0.48rem] leading-[1.4] text-quiet">
            frontmatter shape · index consistency · referenced commands
          </small>
        </div>
        <strong className="ml-auto border border-diagram-amber/35 p-[7px] text-[0.56rem] font-medium text-diagram-amber max-[640px]:ml-6">
          64 unit tests
        </strong>
      </div>

      <div className="flex flex-wrap justify-center gap-x-[15px] gap-y-[7px]">
        <span className="flex items-center gap-[5px] text-[0.48rem] text-quiet">
          <Check size={13} className="text-primary" /> Verifiers are programmatic, not model-graded
        </span>
        <span className="flex items-center gap-[5px] text-[0.48rem] text-quiet">
          <RefreshCw size={13} className="text-primary" /> Models swap via gateway for comparison runs
        </span>
      </div>
    </div>
  );
}
