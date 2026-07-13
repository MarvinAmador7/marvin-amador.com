// Isometric chapter visuals for the FunnelLoops case study
// (see skill: isometric-blueprint-illustration).
//
// Shape vocabulary: square slab = step / record / component,
// diamond = action / event, triangle = trigger / function.
// Exactly one accent element per diagram; the rest is neutral geometry.

import {
  EventDiamond,
  FlowLine,
  FnTriangle,
  ForbiddenX,
  IsoLabel,
  IsoSlab,
  IsoStage,
  ShapeLegend,
  diamondPath,
  isoLeft,
  isoRight,
  isoTop,
} from "@/components/isoDiagramKit";

const svgClass = "block h-auto w-full overflow-visible";

// ---- 02 / skill-runtime: a VM, a file, and seven skills -------------------
export function SkillRuntimeVisual() {
  return (
    <svg
      className={svgClass}
      viewBox="0 0 640 322"
      role="img"
      aria-label="The agent runtime: inside a sandboxed micro-VM plane, the Pi agent loads one markdown skill at a time and edits funnel.json with jq; model calls exit through a gateway, and credentials never exist inside the VM."
    >
      <IsoStage id="sr" />

      {/* the micro-VM: a dashed sandbox plane */}
      <g>
        <path d={isoLeft(250, 170, 190, 8)} fill="rgba(238,238,234,0.015)" stroke="rgba(238,238,234,0.12)" strokeWidth={1} strokeDasharray="4 4" />
        <path d={isoRight(250, 170, 190, 8)} fill="rgba(238,238,234,0.02)" stroke="rgba(238,238,234,0.12)" strokeWidth={1} strokeDasharray="4 4" />
        <path d={isoTop(250, 170, 190)} fill="rgba(238,238,234,0.02)" stroke="rgba(238,238,234,0.28)" strokeWidth={1} strokeDasharray="4 4" />
      </g>

      {/* accent glow under funnel.json */}
      <path className="opgraph-glow fill-primary opacity-30 [transition:opacity_0.55s_ease] motion-reduce:transition-none" d={isoTop(280, 205, 70)} filter="url(#srGlow)" />

      {/* skills stack: SKILLS.md index + seven markdown skills */}
      <g>
        <IsoSlab x={110} y={160} rx={26} depth={4} />
        <IsoSlab x={110} y={170} rx={26} depth={4} />
        <IsoSlab x={110} y={180} rx={26} depth={4} />
      </g>
      <FlowLine from={[125, 172.5]} to={[155, 157.5]} dashed />

      {/* agent -> jq -> funnel.json, one iso line down the plane */}
      <FlowLine from={[185, 157.5]} to={[265, 197.5]} />
      <IsoSlab x={170} y={150} />
      <FnTriangle x={225} y={177.5} />
      <IsoSlab x={280} y={205} accent />

      {/* model calls exit through the gateway, outside the sandbox */}
      <FlowLine from={[185, 142.5]} to={[365, 52.5]} dashed />
      <IsoSlab x={380} y={45} rx={26} depth={6} />

      {/* credentials: a flat dashed ghost that never crosses the boundary */}
      <line x1={121} y1={258} x2={178.5} y2={229.25} stroke="rgba(238,238,234,0.18)" strokeWidth={1} strokeDasharray="3 3" />
      <ForbiddenX x={150} y={244} />
      <path d={isoTop(95, 258, 26)} fill="none" stroke="rgba(238,238,234,0.28)" strokeWidth={1} strokeDasharray="3 3" />

      {/* labels */}
      <IsoLabel x={170} y={112} title="PI AGENT" sub="short prompt · reads the index" />
      <IsoLabel x={110} y={215} title="SKILLS ×7" sub="SKILLS.md · one per task" />
      <IsoLabel x={225} y={140} title="JQ" sub="surgical patches" />
      <IsoLabel x={280} y={245} title="FUNNEL.JSON" sub="the document as a file" accent />
      <IsoLabel x={415} y={42} title="GATEWAY" sub="model routing · host calls" anchor="start" />
      <IsoLabel x={95} y={287} title="CREDENTIALS" sub="do not exist inside the VM" />

      <line x1={345} y1={217.5} x2={470} y2={217.5} stroke="rgba(238,238,234,0.18)" strokeWidth={1} />
      <IsoLabel x={478} y={214} title="MICRO-VM" sub="sandboxed virtual filesystem" sub2="effects exit via host commands" anchor="start" />

      <ShapeLegend x={484} y={288} />
    </svg>
  );
}

// ---- 03 / validation-gate: accept valid funnels, reject the rest ----------
export function ValidationGateVisual() {
  return (
    <svg
      className={svgClass}
      viewBox="0 0 640 322"
      role="img"
      aria-label="The correctness boundary: an agent edit climbs through the validator function; only valid funnels persist to Convex, violations bounce back as errors the agent can act on, and the platform never silently repairs model output."
    >
      <IsoStage id="vg" />

      {/* accent glow under the persisted document */}
      <path className="opgraph-glow fill-primary opacity-30 [transition:opacity_0.55s_ease] motion-reduce:transition-none" d={isoTop(430, 70, 70)} filter="url(#vgGlow)" />

      {/* the climb: agent edit -> sync event -> validator -> persisted truth */}
      <FlowLine from={[115, 227.5]} to={[400, 85]} />
      <IsoSlab x={100} y={235} />
      <EventDiamond x={210} y={180} />
      <FnTriangle x={320} y={125} r={24} />
      <IsoSlab x={430} y={70} rx={36} accent />

      {/* rejection lane: violations return to the agent with an actionable error */}
      <FlowLine from={[285, 150]} to={[105, 240]} dashed />
      <ForbiddenX x={160} y={212} />

      {/* silent repair does not exist */}
      <path d={isoTop(520, 245, 26)} fill="none" stroke="rgba(238,238,234,0.28)" strokeWidth={1} strokeDasharray="3 3" />
      <ForbiddenX x={520} y={245} />

      {/* labels */}
      <IsoLabel x={100} y={272} title="AGENT EDIT" sub="jq patch + sync" />
      <IsoLabel x={320} y={152} title="VALIDATOR" sub="zod schema · graph checks" />
      <IsoLabel x={430} y={110} title="CONVEX" sub="persists only valid funnels" accent />
      <IsoLabel x={250} y={262} title="" sub="violation → error the agent acts on" />
      <IsoLabel x={520} y={285} title="SILENT REPAIR" sub="never patches model output" />

      <ShapeLegend x={60} y={50} />
    </svg>
  );
}

// ---- 04 / artifact-sync: truth and presentation, separated ----------------
export function ArtifactSyncVisual() {
  return (
    <svg
      className={svgClass}
      viewBox="0 0 640 322"
      role="img"
      aria-label="State and streaming: the agent VM persists funnel.json through an authenticated sync gateway into Convex, the builder renders from database subscriptions, and agent events stream to the chat UI as presentation only."
    >
      <IsoStage id="as" />

      {/* accent glow under Convex */}
      <path className="opgraph-glow fill-primary opacity-30 [transition:opacity_0.55s_ease] motion-reduce:transition-none" d={isoTop(330, 230, 75)} filter="url(#asGlow)" />

      {/* truth channel: agent -> sync gateway -> convex -> builder subscription */}
      <FlowLine from={[125, 127.5]} to={[295, 212.5]} />
      <FlowLine from={[370, 210]} to={[435, 177.5]} />
      <IsoSlab x={110} y={120} />
      <FnTriangle x={220} y={175} />
      <IsoSlab x={330} y={230} rx={40} accent />
      <IsoSlab x={450} y={170} />

      {/* presentation channel: agent events stream to the chat UI only */}
      <FlowLine from={[125, 112.5]} to={[258, 46]} dashed />
      <EventDiamond x={180} y={84} />
      <IsoSlab x={288} y={40} rx={26} depth={6} />

      {/* the canvas never reconstructs state from the stream */}
      <line x1={310} y1={58} x2={425} y2={148} stroke="rgba(238,238,234,0.14)" strokeWidth={1} strokeDasharray="3 3" />
      <ForbiddenX x={368} y={103} />

      {/* labels */}
      <IsoLabel x={110} y={157} title="AGENT VM" sub="/funnel.json after each turn" />
      <IsoLabel x={220} y={210} title="SYNC" sub="debounce · hash dedupe" sub2="authenticated gateway" />
      <IsoLabel x={330} y={272} title="CONVEX" sub="the database is the product" accent />
      <IsoLabel x={450} y={205} title="BUILDER" sub="renders from subscriptions" />
      <IsoLabel x={180} y={118} title="AGENT EVENTS" sub="text · tool calls" />
      <IsoLabel x={323} y={38} title="CHAT UI" sub="presentation only" anchor="start" />
      <text x={378} y={97} className="fill-quiet font-ui text-[7px] tracking-[0.3px]">
        never parsed for state
      </text>

      <ShapeLegend x={520} y={288} />
    </svg>
  );
}

// ---- 05 / integration-outbox: canonical entities, contract edges ----------
export function IntegrationOutboxVisual() {
  return (
    <svg
      className={svgClass}
      viewBox="0 0 640 322"
      role="img"
      aria-label="The integration platform: one canonical record emits change events through a CDC outbox and a generated adapter to the provider CRM; webhooks come back signature-verified and deduplicated into the same canonical record."
    >
      <IsoStage id="io" />

      {/* accent glow under the canonical record */}
      <path className="opgraph-glow fill-primary opacity-30 [transition:opacity_0.55s_ease] motion-reduce:transition-none" d={isoTop(140, 250, 70)} filter="url(#ioGlow)" />

      {/* outbound: change event -> outbox -> adapter -> CRM */}
      <FlowLine from={[159, 240.5]} to={[462, 89]} />
      <IsoSlab x={140} y={250} rx={38} accent />
      <EventDiamond x={240} y={200} />
      <IsoSlab x={320} y={160} />
      <FnTriangle x={400} y={120} />
      <IsoSlab x={480} y={80} />

      {/* inbound: webhook event -> signature + dedupe -> canonical record */}
      <FlowLine from={[505, 100]} to={[205, 250]} dashed />
      <FlowLine from={[205, 250]} to={[186, 240.5]} dashed />
      <EventDiamond x={425} y={140} />
      <FnTriangle x={345} y={180} />

      {/* labels */}
      <IsoLabel x={140} y={294} title="CANONICAL RECORD" sub="contact · lead · company · deal" sub2="per-provider external refs" accent />
      <IsoLabel x={215} y={188} title="ENTITY CHANGE" sub="create · update · delete" anchor="end" />
      <IsoLabel x={283} y={140} title="CDC OUTBOX" sub="hash dedupe · bounded retries" anchor="end" />
      <IsoLabel x={368} y={95} title="ADAPTER" sub="generated from config" anchor="end" />
      <IsoLabel x={518} y={72} title="HUBSPOT CRM" sub="production-ready · upsert" anchor="start" />
      <IsoLabel x={452} y={143} title="WEBHOOK" sub="raw payload stored" anchor="start" />
      <IsoLabel x={372} y={192} title="SIGNATURE + DEDUPE" sub="fail-closed · duplicates skipped" anchor="start" />

      <ShapeLegend x={60} y={50} />
    </svg>
  );
}

// ---- 06 / event-pipeline: from visitor decision to query ------------------
export function EventPipelineVisual() {
  return (
    <svg
      className={svgClass}
      viewBox="0 0 640 322"
      role="img"
      aria-label="The analytics pipeline: the published funnel emits decision events through the batching SDK into Tinybird, whose materialized views serve dashboards and the agent's read-only analytics command from the same measured events."
    >
      <IsoStage id="ep" />

      {/* accent glow under Tinybird */}
      <path className="opgraph-glow fill-primary opacity-30 [transition:opacity_0.55s_ease] motion-reduce:transition-none" d={isoTop(400, 225, 75)} filter="url(#epGlow)" />

      {/* the stream: funnel -> decision events -> batching SDK -> tinybird */}
      <FlowLine from={[125, 87.5]} to={[365, 207.5]} />
      <IsoSlab x={110} y={80} />
      <path d={diamondPath(180, 115, 7)} fill="#101013" stroke="rgba(238,238,234,0.18)" strokeWidth={1} />
      <EventDiamond x={220} y={135} />
      <path d={diamondPath(258, 154, 7)} fill="#101013" stroke="rgba(238,238,234,0.18)" strokeWidth={1} />
      <FnTriangle x={300} y={175} />
      <IsoSlab x={400} y={225} rx={40} accent />

      {/* served surfaces: the same pipeline answers humans and the agent */}
      <FlowLine from={[420, 215]} to={[510, 170]} />
      <FlowLine from={[430, 245]} to={[540, 190]} />
      <IsoSlab x={536} y={157} />
      <IsoSlab x={566} y={211} />

      {/* labels */}
      <IsoLabel x={110} y={117} title="PUBLISHED FUNNEL" sub="visitor decisions" />
      <IsoLabel x={245} y={126} title="DECISION EVENTS" sub="18-type taxonomy" anchor="start" />
      <IsoLabel x={272} y={192} title="BATCHING SDK" sub="device · geo · attribution" anchor="end" />
      <IsoLabel x={400} y={272} title="TINYBIRD" sub="raw + materialized views" accent />
      <IsoLabel x={536} y={120} title="DASHBOARDS" sub="funnel · breakdown · sankey" />
      <IsoLabel x={566} y={248} title="AGENT" sub="read-only analytics command" />

      <ShapeLegend x={60} y={288} />
    </svg>
  );
}

// ---- 07 / benchmark-harness: measured the way users ask -------------------
export function BenchmarkHarnessVisual() {
  return (
    <svg
      className={svgClass}
      viewBox="0 0 640 322"
      role="img"
      aria-label="The benchmark harness: a natural-language prompt goes to the agent, which edits funnel.json in the VM with no mechanism hints; a programmatic verifier reads the document back, and the suite passes eleven of eleven operations."
    >
      <IsoStage id="bh" />

      {/* accent glow under the verdict */}
      <path className="opgraph-glow fill-primary opacity-30 [transition:opacity_0.55s_ease] motion-reduce:transition-none" d={isoTop(535, 110, 65)} filter="url(#bhGlow)" />

      {/* the V: prompt descends into the edit, the proof climbs back out */}
      <FlowLine from={[110, 117.5]} to={[300, 212.5]} />
      <FlowLine from={[330, 212.5]} to={[505, 125]} />
      <IsoSlab x={95} y={110} />
      <IsoSlab x={205} y={165} />
      <IsoSlab x={315} y={220} />
      <FnTriangle x={425} y={165} />
      <IsoSlab x={535} y={110} rx={34} accent />

      {/* labels */}
      <IsoLabel x={95} y={147} title="PROMPT" sub={'"make email optional"'} />
      <IsoLabel x={205} y={202} title="AGENT" sub="finds the skill itself" />
      <IsoLabel x={315} y={257} title="FUNNEL.JSON" sub="jq edit · no mechanism hints" />
      <IsoLabel x={425} y={200} title="VERIFIER" sub="programmatic · reads the file back" />
      <IsoLabel x={535} y={150} title="11/11 PASS" sub="eleven operations · four categories" sub2="64 unit tests · skills under test" accent />

      <ShapeLegend x={60} y={288} />
    </svg>
  );
}
