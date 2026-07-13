// Isometric chapter visuals for the Grivara OPS case study
// (see skill: isometric-blueprint-illustration).
//
// Shape vocabulary: square slab = step / record / component,
// diamond = action / event, triangle = trigger / function / gate,
// large iso plane = boundary/sandbox, dashed ghost + red ✕ = forbidden path.
// Exactly one accent element per diagram (the authority / load-bearing
// element); everything else is neutral geometry with thin strokes.

import {
  EventDiamond,
  FlowLine,
  FnTriangle,
  ForbiddenX,
  IsoLabel,
  IsoSlab,
  IsoStage,
  ShapeLegend,
  isoLeft,
  isoRight,
  isoTop,
} from "@/components/isoDiagramKit";

const svgClass = "block h-auto w-full overflow-visible";
const glowClass =
  "opgraph-glow fill-primary opacity-30 [transition:opacity_0.55s_ease] motion-reduce:transition-none";

// ---- 02 / tenant-boundary: trusted scope before business logic -----------
export function TenantBoundaryVisual() {
  return (
    <svg
      className={svgClass}
      viewBox="0 0 640 322"
      role="img"
      aria-label="Tenancy: a browser request climbs through session resolution and an org-scoped procedure boundary before reaching a domain query; a browser-supplied organization id is barred and cannot establish tenant scope."
    >
      <IsoStage id="tb" />

      {/* accent glow under the org-scoped procedure boundary */}
      <path className={glowClass} d={isoTop(320, 125, 72)} filter="url(#tbGlow)" />

      {/* the climb: request -> session -> org scope (boundary) -> domain query */}
      <FlowLine from={[115, 232.5]} to={[448, 66]} />
      <IsoSlab x={100} y={235} />
      <FnTriangle x={210} y={180} r={20} />
      <IsoSlab x={320} y={125} rx={36} accent />
      <IsoSlab x={440} y={70} />

      {/* forbidden: a browser-supplied org id can never reach the boundary */}
      <line x1={500} y1={245} x2={372} y2={152} stroke="rgba(238,238,234,0.18)" strokeWidth={1} strokeDasharray="3 3" />
      <ForbiddenX x={432} y={196} />
      <path d={isoTop(505, 255, 26)} fill="none" stroke="rgba(238,238,234,0.28)" strokeWidth={1} strokeDasharray="3 3" />
      <path d={isoTop(505, 255, 13)} fill="none" stroke="rgba(238,238,234,0.1)" strokeWidth={1} strokeDasharray="3 3" />

      {/* labels */}
      <IsoLabel x={100} y={272} title="REQUEST" sub="browser input · zod-validated" />
      <IsoLabel x={168} y={168} title="SESSION" sub="resolves org + role" anchor="end" />
      <IsoLabel x={320} y={96} title="ORG SCOPE" sub="server-injected boundary" accent />
      <IsoLabel x={468} y={64} title="DOMAIN QUERY" sub="db handle + trusted org" anchor="start" />
      <IsoLabel x={505} y={288} title="BROWSER ORG ID" sub="cannot set tenant scope" />

      <ShapeLegend x={60} y={54} />
    </svg>
  );
}

// ---- 03 / extension-stack: stable core, governed variation ----------------
// A true stacked-slab hero: proposal on top, governed variation in the middle,
// the typed native core as the accented load-bearing base.
const ES_CX = 208;
const ES_RX = 66;
const ES_DEPTH = 15;
const ES_CY = [66, 128, 190, 252];
const ES_LAYERS = [
  { name: "PROPOSAL", sub: "agent or human drafts", marker: "diamond", accent: false },
  { name: "GOVERNANCE", sub: "validate · simulate · publish", marker: "triangle", accent: false },
  { name: "EXTENSIONS", sub: "schemas · relations · workflows · packages", marker: "ring", accent: false },
  { name: "NATIVE CORE", sub: "assets · work orders · budgets", marker: "core", accent: true },
] as const;
// literal hover-lift classes (upper slabs travel more; the accent base stays put)
const ES_LIFT = [
  "[.chapter-visual:hover_&]:-translate-y-[11px]",
  "[.chapter-visual:hover_&]:-translate-y-[7px]",
  "[.chapter-visual:hover_&]:-translate-y-[3px]",
  "",
];

function EsMarker({ kind, x, y }: { kind: string; x: number; y: number }) {
  const d = `M ${x} ${y - 5.5} L ${x + 5.5} ${y} L ${x} ${y + 5.5} L ${x - 5.5} ${y} Z`;
  if (kind === "core") return <path d={d} className="fill-primary" />;
  if (kind === "diamond") return <path d={d} fill="none" stroke="var(--color-dim)" strokeWidth={1.1} />;
  if (kind === "triangle")
    return (
      <path
        d={`M ${x} ${y - 5.5} L ${x + 5} ${y + 4} L ${x - 5} ${y + 4} Z`}
        fill="none"
        stroke="var(--color-dim)"
        strokeWidth={1.1}
        strokeLinejoin="round"
      />
    );
  // ring: a bundle
  return <circle cx={x} cy={y} r={5} fill="none" stroke="var(--color-dim)" strokeWidth={1.1} />;
}

export function ExtensionStackVisual() {
  return (
    <svg
      className={svgClass}
      viewBox="0 0 640 322"
      role="img"
      aria-label="Extensibility as a stack: a proposal layer and a governance layer sit above a versioned extension layer, all resting on the typed native core that owns operational truth."
    >
      <IsoStage id="es" />

      {/* dashed spine tying the stack together */}
      <line x1={ES_CX} y1={ES_CY[0]} x2={ES_CX} y2={ES_CY[3]} stroke="rgba(238,238,234,0.14)" strokeWidth={1} strokeDasharray="2 4" />

      {/* one soft accent glow behind the base only */}
      <path className={glowClass} d={isoTop(ES_CX, ES_CY[3], ES_RX)} filter="url(#esGlow)" />

      {/* slabs, top-of-screen first so nearer (lower) slabs paint over */}
      {ES_LAYERS.map((layer, i) => {
        const cy = ES_CY[i];
        const a = layer.accent;
        return (
          <g
            key={layer.name}
            className={[
              "[transition:translate_0.55s_cubic-bezier(0.2,0.7,0.15,1)]",
              ES_LIFT[i],
              "motion-reduce:transition-none motion-reduce:[.chapter-visual:hover_&]:translate-y-0",
            ].join(" ")}
          >
            <path d={isoLeft(ES_CX, cy, ES_RX, ES_DEPTH)} fill={a ? "rgba(229,111,70,0.11)" : "#0b0b0d"} stroke={a ? "rgba(229,111,70,0.4)" : "rgba(238,238,234,0.07)"} strokeWidth={1} />
            <path d={isoRight(ES_CX, cy, ES_RX, ES_DEPTH)} fill={a ? "rgba(229,111,70,0.24)" : "#101013"} stroke={a ? "rgba(229,111,70,0.4)" : "rgba(238,238,234,0.07)"} strokeWidth={1} />
            <path d={isoTop(ES_CX, cy, ES_RX)} className={a ? "stroke-primary" : undefined} fill={a ? "rgba(229,111,70,0.16)" : "#17171a"} stroke={a ? undefined : "rgba(238,238,234,0.16)"} strokeWidth={1} />
            <path d={isoTop(ES_CX, cy, ES_RX * 0.5)} fill="none" stroke={a ? "rgba(229,111,70,0.5)" : "rgba(238,238,234,0.08)"} strokeWidth={1} />

            <line x1={ES_CX + ES_RX} y1={cy} x2={ES_CX + ES_RX + 22} y2={cy} stroke="rgba(238,238,234,0.18)" strokeWidth={1} />
            <EsMarker kind={layer.marker} x={ES_CX + ES_RX + 34} y={cy} />
            <text x={ES_CX + ES_RX + 46} y={cy - 2.5} className={`${a ? "fill-primary" : "fill-text"} font-ui text-[11px] tracking-[1.5px]`}>
              {layer.name}
            </text>
            <text x={ES_CX + ES_RX + 46} y={cy + 10} className="fill-dim font-ui text-[8px] tracking-[0.3px]">
              {layer.sub}
            </text>
          </g>
        );
      })}

      <ShapeLegend x={70} y={276} />
    </svg>
  );
}

// ---- 04 / workflow-kernel: author, execute, recover -----------------------
export function WorkflowKernelVisual() {
  return (
    <svg
      className={svgClass}
      viewBox="0 0 640 322"
      role="img"
      aria-label="The workflow kernel: many kinds of intent descend into one deterministic transition planner and commit atomically to Postgres, which owns truth; the capability outbox and workers only deliver effects, and a failed worker is recoverable from the database lease."
    >
      <IsoStage id="wk" />

      {/* accent glow under Postgres (the authority) */}
      <path className={glowClass} d={isoTop(360, 232, 74)} filter="url(#wkGlow)" />

      {/* descent: intent -> kernel -> atomic commit to Postgres */}
      <FlowLine from={[120, 106]} to={[214, 160]} />
      <FlowLine from={[254, 190]} to={[330, 218]} />
      <EventDiamond x={108} y={96} />
      <FnTriangle x={234} y={176} r={24} />
      <IsoSlab x={360} y={232} rx={40} accent />

      {/* ascent: outbox -> worker -> allowlisted capability effect */}
      <FlowLine from={[392, 220]} to={[452, 190]} />
      <FlowLine from={[486, 174]} to={[522, 156]} />
      <FlowLine from={[556, 138]} to={[586, 122]} />
      <EventDiamond x={470} y={182} />
      <FnTriangle x={540} y={146} r={18} />
      <IsoSlab x={598} y={112} rx={26} depth={6} />

      {/* recovery: a failed worker is recoverable from the db lease (dashed) */}
      <FlowLine from={[528, 160]} to={[398, 224]} dashed />

      {/* labels */}
      <IsoLabel x={128} y={70} title="INTENT" sub="command · event · approval · timer" />
      <IsoLabel x={198} y={150} title="KERNEL" sub="guard · idempotency · bound" anchor="end" />
      <IsoLabel x={330} y={286} title="POSTGRES" sub="atomic commit · owns truth" accent />
      <IsoLabel x={470} y={160} title="OUTBOX" sub="planned effects" />
      <IsoLabel x={556} y={172} title="TRIGGER.DEV" sub="delivery · lease" anchor="start" />
      <IsoLabel x={588} y={92} title="CAPABILITY" sub="allowlisted effect" anchor="end" />

      <ShapeLegend x={60} y={278} />
    </svg>
  );
}

// ---- 05 / dispatch-funnel: qualify first, rank second ---------------------
export function DispatchFunnelVisual() {
  return (
    <svg
      className={svgClass}
      viewBox="0 0 640 322"
      role="img"
      aria-label="Dispatch: every candidate passes a hard qualification gate; unqualified candidates are dropped, the qualified set is ranked by weighted signals into a shortlist, and the dispatcher keeps the final assignment decision."
    >
      <IsoStage id="df" />

      {/* accent glow under the human decision */}
      <path className={glowClass} d={isoTop(520, 34, 66)} filter="url(#dfGlow)" />

      {/* the climb: candidates -> qualify (gate) -> rank -> shortlist -> human */}
      <FlowLine from={[135, 233]} to={[527, 26]} />
      <IsoSlab x={120} y={240} />
      <FnTriangle x={225} y={187} r={22} />
      <FnTriangle x={330} y={135} r={22} />
      <IsoSlab x={432} y={83} />
      <IsoSlab x={520} y={34} rx={34} accent />

      {/* rejection: unqualified candidates drop at the gate */}
      <line x1={218} y1={200} x2={262} y2={262} stroke="rgba(238,238,234,0.18)" strokeWidth={1} strokeDasharray="3 3" />
      <ForbiddenX x={240} y={231} />
      <path d={isoTop(278, 280, 24)} fill="none" stroke="rgba(238,238,234,0.28)" strokeWidth={1} strokeDasharray="3 3" />

      {/* labels */}
      <IsoLabel x={120} y={277} title="CANDIDATES" sub="all technicians · teams" />
      <IsoLabel x={188} y={172} title="QUALIFY" sub="hard skill gate" anchor="end" />
      <IsoLabel x={352} y={150} title="RANK" sub="availability · workload" sub2="distance · reliability" anchor="start" />
      <IsoLabel x={408} y={62} title="SHORTLIST" sub="short sorted list" anchor="end" />
      <IsoLabel x={520} y={78} title="HUMAN ASSIGNS" sub="keeps the decision" accent />
      <IsoLabel x={306} y={286} title="UNQUALIFIED" sub="dropped at the gate" anchor="start" />

      <ShapeLegend x={60} y={62} />
    </svg>
  );
}

// ---- 06 / agent-boundary: the governed agent harness ----------------------
export function AgentBoundaryVisual() {
  return (
    <svg
      className={svgClass}
      viewBox="0 0 640 322"
      role="img"
      aria-label="The agent boundary: the agent reasons inside a sandboxed runtime and exchanges an opaque run id for a short-lived capability, every tool call re-checked against RBAC, allowlist, and run limits before it touches business truth; database credentials and raw SQL never enter the runtime."
    >
      <IsoStage id="ab" />

      {/* the sandbox: a dashed boundary plane holding the agent */}
      <g>
        <path d={isoLeft(168, 205, 128, 8)} fill="rgba(238,238,234,0.015)" stroke="rgba(238,238,234,0.12)" strokeWidth={1} strokeDasharray="4 4" />
        <path d={isoRight(168, 205, 128, 8)} fill="rgba(238,238,234,0.02)" stroke="rgba(238,238,234,0.12)" strokeWidth={1} strokeDasharray="4 4" />
        <path d={isoTop(168, 205, 128)} fill="rgba(238,238,234,0.02)" stroke="rgba(238,238,234,0.28)" strokeWidth={1} strokeDasharray="4 4" />
      </g>

      {/* accent glow under business truth (the authority) */}
      <path className={glowClass} d={isoTop(492, 62, 72)} filter="url(#abGlow)" />

      {/* the climb out: agent -> run id -> capability gate -> business truth */}
      <FlowLine from={[168, 198]} to={[500, 52]} />
      <IsoSlab x={150} y={205} />
      <EventDiamond x={278} y={148} />
      <FnTriangle x={378} y={100} r={22} />
      <IsoSlab x={492} y={62} rx={38} accent />

      {/* forbidden: credentials / raw SQL never reach the authority */}
      <line x1={556} y1={228} x2={510} y2={110} stroke="rgba(238,238,234,0.18)" strokeWidth={1} strokeDasharray="3 3" />
      <ForbiddenX x={536} y={168} />
      <path d={isoTop(566, 238, 26)} fill="none" stroke="rgba(238,238,234,0.28)" strokeWidth={1} strokeDasharray="3 3" />

      {/* labels */}
      <IsoLabel x={150} y={242} title="PI AGENT" sub="reasoning only" />
      <IsoLabel x={95} y={280} title="SANDBOXED RUNTIME" sub="no db credentials" anchor="start" />
      <IsoLabel x={258} y={116} title="RUN ID" sub="opaque · short-lived token" anchor="end" />
      <IsoLabel x={378} y={142} title="CAPABILITY GATE" sub="rbac ∩ allowlist ∩ limit" anchor="middle" />
      <line x1={530} y1={60} x2={540} y2={60} stroke="rgba(238,238,234,0.18)" strokeWidth={1} />
      <IsoLabel x={544} y={57} title="BUSINESS TRUTH" sub="tenant state + audit" accent anchor="start" />
      <IsoLabel x={566} y={272} title="DB CREDENTIALS" sub="raw sql never enters" anchor="middle" />

      <ShapeLegend x={60} y={62} />
    </svg>
  );
}

// ---- 07 / offline-replay: two durable channels, one authority -------------
export function OfflineReplayVisual() {
  return (
    <svg
      className={svgClass}
      viewBox="0 0 640 322"
      role="img"
      aria-label="Field reliability: one technician action enters two durable channels, an optimistic visible cache and a persisted mutation outbox that both survive a cold restart; on reconnect the outbox drains in order and the app converges on server truth with one final refetch."
    >
      <IsoStage id="or" />

      {/* accent glow under server truth (the authority) */}
      <path className={glowClass} d={isoTop(500, 112, 68)} filter="url(#orGlow)" />

      {/* one intent splits into two parallel durable lanes */}
      <FlowLine from={[118, 150]} to={[222, 112]} />
      <FlowLine from={[118, 172]} to={[222, 210]} />
      <IsoSlab x={100} y={161} rx={28} />
      <IsoSlab x={240} y={108} />
      <IsoSlab x={240} y={214} />

      {/* the lanes converge on reconnect, then one hop to server truth */}
      <FlowLine from={[270, 112]} to={[382, 152]} />
      <FlowLine from={[270, 210]} to={[382, 170]} />
      <FnTriangle x={400} y={161} r={22} />
      <FlowLine from={[420, 152]} to={[478, 120]} />
      <IsoSlab x={500} y={112} rx={34} accent />

      {/* connectivity authority gates the drain */}
      <line x1={400} y1={139} x2={400} y2={112} stroke="rgba(238,238,234,0.22)" strokeWidth={1} strokeDasharray="3 3" />
      <EventDiamond x={400} y={98} r={12} />

      {/* forbidden: a stale snapshot never rolls back a later queued write */}
      <path d={isoTop(255, 285, 24)} fill="none" stroke="rgba(238,238,234,0.28)" strokeWidth={1} strokeDasharray="3 3" />
      <ForbiddenX x={255} y={285} />

      {/* labels */}
      <IsoLabel x={78} y={158} title="INTENT" sub="tap = intent" anchor="end" />
      <IsoLabel x={240} y={78} title="VISIBLE CACHE" sub="optimistic · persisted" />
      <IsoLabel x={240} y={250} title="MUTATION OUTBOX" sub="ordered · persisted" />
      <IsoLabel x={400} y={78} title="ONLINE MANAGER" sub="connectivity authority" />
      <IsoLabel x={400} y={205} title="RECONNECT" sub="ordered drain · queue gate" />
      <line x1={534} y1={110} x2={544} y2={110} stroke="rgba(238,238,234,0.18)" strokeWidth={1} />
      <IsoLabel x={548} y={107} title="SERVER TRUTH" sub="one final refetch" accent anchor="start" />
      <IsoLabel x={255} y={306} title="STALE SNAPSHOT" sub="never rolls back a queued write" />

      <ShapeLegend x={70} y={276} />
    </svg>
  );
}
