/**
 * Isometric "blueprint" vignettes, one per article section.
 *
 * Shared vocabulary (see components/IsometricStack.tsx and the skill):
 * extruded 2:1 isometric tiles on an isometric floor grid, thin 1px strokes,
 * monospace micro-labels, and ONE reserved accent (var(--primary)) on the
 * single load-bearing element of each scene. Styled with Tailwind utilities;
 * hover lift is gated with motion-reduce. No companion stylesheet.
 */

// ---- palette (face shades are illustration-internal, not brand tokens) ----
const F_TOP = "#17171a";
const F_RIGHT = "#101013";
const F_LEFT = "#0b0b0d";
const EDGE = "rgba(238,238,234,0.16)";
const SIDE = "rgba(238,238,234,0.07)";
const INSET = "rgba(238,238,234,0.08)";
const GHOST = "rgba(238,238,234,0.14)";

const ACCENT = "var(--primary)";
const A_TOP = "rgba(229,111,70,0.16)";
const A_RIGHT = "rgba(229,111,70,0.24)";
const A_LEFT = "rgba(229,111,70,0.11)";
const A_EDGE = "rgba(229,111,70,0.75)";
const A_SIDE = "rgba(229,111,70,0.4)";
const A_INSET = "rgba(229,111,70,0.45)";

const TEXT = "var(--text)";
const MUTED = "var(--color-dim)";

const MONO = { fontFamily: "var(--font-ui)" } as const;

// ---- isometric floor grid (slopes +/-0.5, clipped to the panel) -----------
const VB_W = 720;
const VB_H = 280;
const FLOOR_STEP = 26;

function buildFloor(): Array<[number, number, number, number]> {
  const lines: Array<[number, number, number, number]> = [];
  for (let b = -VB_W / 2; b <= VB_H; b += FLOOR_STEP) {
    const x1 = Math.max(0, -2 * b);
    const x2 = Math.min(VB_W, 2 * (VB_H - b));
    if (x2 - x1 > 0.5) lines.push([x1, 0.5 * x1 + b, x2, 0.5 * x2 + b]);
  }
  for (let c = 0; c <= VB_H + VB_W / 2; c += FLOOR_STEP) {
    const x1 = Math.max(0, 2 * (c - VB_H));
    const x2 = Math.min(VB_W, 2 * c);
    if (x2 - x1 > 0.5) lines.push([x1, -0.5 * x1 + c, x2, -0.5 * x2 + c]);
  }
  return lines;
}
const FLOOR_LINES = buildFloor();

function Floor({ id }: { id: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`ff-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.06" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.6" />
        </linearGradient>
        <mask id={`fm-${id}`}>
          <rect x="0" y="0" width={VB_W} height={VB_H} fill={`url(#ff-${id})`} />
        </mask>
        <filter id={`glow-${id}`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>
      <g mask={`url(#fm-${id})`}>
        {FLOOR_LINES.map((l, i) => (
          <line
            key={i}
            x1={l[0].toFixed(2)}
            y1={l[1].toFixed(2)}
            x2={l[2].toFixed(2)}
            y2={l[3].toFixed(2)}
            stroke="rgba(238,238,234,0.13)"
            strokeWidth={0.7}
          />
        ))}
      </g>
    </>
  );
}

// ---- isometric tile -------------------------------------------------------
type Variant = "solid" | "accent" | "ghost";

function Tile({
  cx,
  cy,
  rx = 40,
  depth = 12,
  variant = "solid",
}: {
  cx: number;
  cy: number;
  rx?: number;
  depth?: number;
  variant?: Variant;
}) {
  const ry = rx / 2;
  const top = `M ${cx} ${cy - ry} L ${cx + rx} ${cy} L ${cx} ${cy + ry} L ${cx - rx} ${cy} Z`;
  const right = `M ${cx + rx} ${cy} L ${cx} ${cy + ry} L ${cx} ${cy + ry + depth} L ${cx + rx} ${cy + depth} Z`;
  const left = `M ${cx - rx} ${cy} L ${cx} ${cy + ry} L ${cx} ${cy + ry + depth} L ${cx - rx} ${cy + depth} Z`;
  const s = 0.58;
  const inset = `M ${cx} ${cy - ry * s} L ${cx + rx * s} ${cy} L ${cx} ${cy + ry * s} L ${cx - rx * s} ${cy} Z`;

  if (variant === "ghost") {
    return (
      <g>
        <path d={left} fill="none" stroke={GHOST} strokeWidth={1} strokeDasharray="2 3" />
        <path d={right} fill="none" stroke={GHOST} strokeWidth={1} strokeDasharray="2 3" />
        <path d={top} fill="rgba(238,238,234,0.02)" stroke={GHOST} strokeWidth={1} strokeDasharray="2 3" />
      </g>
    );
  }

  const accent = variant === "accent";
  return (
    <g>
      <path d={left} fill={accent ? A_LEFT : F_LEFT} stroke={accent ? A_SIDE : SIDE} strokeWidth={1} />
      <path d={right} fill={accent ? A_RIGHT : F_RIGHT} stroke={accent ? A_SIDE : SIDE} strokeWidth={1} />
      <path d={top} fill={accent ? A_TOP : F_TOP} stroke={accent ? A_EDGE : EDGE} strokeWidth={1} />
      <path d={inset} fill="none" stroke={accent ? A_INSET : INSET} strokeWidth={1} />
    </g>
  );
}

function Glow({ cx, cy, rx = 40, id }: { cx: number; cy: number; rx?: number; id: string }) {
  const ry = rx / 2;
  const d = `M ${cx} ${cy - ry} L ${cx + rx} ${cy} L ${cx} ${cy + ry} L ${cx - rx} ${cy} Z`;
  return (
    <path
      className="opacity-40 [transition:opacity_0.55s_ease] group-hover:opacity-70 motion-reduce:[transition:none]"
      d={d}
      fill={ACCENT}
      filter={`url(#glow-${id})`}
    />
  );
}

// ---- labels & connectors --------------------------------------------------
function Label({
  x,
  y,
  name,
  sub,
  accent,
  anchor = "middle",
}: {
  x: number;
  y: number;
  name: string;
  sub?: string;
  accent?: boolean;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <>
      <text
        x={x}
        y={y}
        textAnchor={anchor}
        fill={accent ? ACCENT : TEXT}
        style={{ ...MONO, fontSize: "10.5px", letterSpacing: "1.4px" }}
      >
        {name}
      </text>
      {sub ? (
        <text
          x={x}
          y={y + 12}
          textAnchor={anchor}
          fill={MUTED}
          style={{ ...MONO, fontSize: "8px", letterSpacing: "0.3px" }}
        >
          {sub}
        </text>
      ) : null}
    </>
  );
}

function Leader({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(238,238,234,0.18)" strokeWidth={1} />;
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  accent,
  dashed,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  accent?: boolean;
  dashed?: boolean;
}) {
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const h = 7.5;
  const w = 3.4;
  const bx = x2 - Math.cos(ang) * h;
  const by = y2 - Math.sin(ang) * h;
  const nx = Math.cos(ang + Math.PI / 2);
  const ny = Math.sin(ang + Math.PI / 2);
  const color = accent ? ACCENT : "rgba(238,238,234,0.42)";
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={bx}
        y2={by}
        stroke={color}
        strokeWidth={1.2}
        strokeDasharray={dashed ? "3 3" : undefined}
      />
      <path
        d={`M ${x2} ${y2} L ${bx + nx * w} ${by + ny * w} L ${bx - nx * w} ${by - ny * w} Z`}
        fill={color}
      />
    </g>
  );
}

// tiny geometric markers (not icon-library glyphs)
function Ring({ x, y, accent }: { x: number; y: number; accent?: boolean }) {
  return <circle cx={x} cy={y} r={5.5} fill="none" stroke={accent ? ACCENT : MUTED} strokeWidth={1.2} />;
}
function Cross({ x, y }: { x: number; y: number }) {
  return (
    <g stroke={ACCENT} strokeWidth={1.4} strokeLinecap="round">
      <line x1={x - 4.5} y1={y - 4.5} x2={x + 4.5} y2={y + 4.5} />
      <line x1={x - 4.5} y1={y + 4.5} x2={x + 4.5} y2={y - 4.5} />
    </g>
  );
}
function Check({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M ${x - 5} ${y} L ${x - 1.5} ${y + 3.5} L ${x + 5.5} ${y - 4}`}
      fill="none"
      stroke={ACCENT}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

// ---- scenes ---------------------------------------------------------------
function Crash() {
  const id = "crash";
  // ascending iso run: cx +82, cy -34 per step
  const step = (i: number) => ({ cx: 150 + 82 * i, cy: 205 - 34 * i });
  const solid = [0, 1, 2].map(step);
  const ghost = [3, 4].map(step);
  const crash = solid[2];
  return (
    <>
      <Floor id={id} />
      {/* run path spine */}
      <path
        d={`M ${solid[0].cx} ${solid[0].cy} L ${crash.cx} ${crash.cy}`}
        stroke="rgba(238,238,234,0.16)"
        strokeWidth={1}
      />
      <path
        d={`M ${crash.cx} ${crash.cy} L ${ghost[1].cx} ${ghost[1].cy}`}
        stroke="rgba(238,238,234,0.12)"
        strokeWidth={1}
        strokeDasharray="3 4"
      />
      {ghost.map((g, i) => (
        <Tile key={i} cx={g.cx} cy={g.cy} rx={38} variant="ghost" />
      ))}
      <Tile cx={solid[0].cx} cy={solid[0].cy} rx={38} />
      <Tile cx={solid[1].cx} cy={solid[1].cy} rx={38} />
      <Glow cx={crash.cx} cy={crash.cy} rx={38} id={id} />
      <Tile cx={crash.cx} cy={crash.cy} rx={38} variant="accent" />
      {/* fracture through the crash tile */}
      <path
        d={`M ${crash.cx - 20} ${crash.cy - 8} L ${crash.cx - 4} ${crash.cy} L ${crash.cx + 6} ${crash.cy - 6} L ${crash.cx + 20} ${crash.cy + 8}`}
        fill="none"
        stroke={ACCENT}
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
      <Leader x1={crash.cx} y1={crash.cy - 19} x2={crash.cx} y2={72} />
      <Label x={crash.cx} y={60} name="VM RESTART" sub="run dies mid-flight" accent />
      <Label x={150} y={252} name="RUN START" sub="tool calls in flight" />
      <Label x={560} y={130} name="WORK LOST" sub="never reached" />
    </>
  );
}

function RunId() {
  const id = "runid";
  const c = { cx: 360, cy: 150 };
  const sat = [
    { cx: 178, cy: 96, name: "CHECKPOINT", sub: "resume point", nx: 178, ny: 66, anchor: "middle" as const },
    { cx: 542, cy: 96, name: "CREDENTIAL", sub: "5-min token", nx: 542, ny: 66, anchor: "middle" as const },
    { cx: 542, cy: 208, name: "POLICY", sub: "model · limits", nx: 542, ny: 244, anchor: "middle" as const },
    { cx: 178, cy: 208, name: "CALLBACK", sub: "terminal effect", nx: 178, ny: 244, anchor: "middle" as const },
  ];
  return (
    <>
      <Floor id={id} />
      {sat.map((s) => (
        <Leader key={`l-${s.name}`} x1={c.cx} y1={c.cy} x2={s.cx} y2={s.cy} />
      ))}
      {sat.map((s) => (
        <g key={s.name}>
          <Tile cx={s.cx} cy={s.cy} rx={26} depth={10} />
          <Label x={s.nx} y={s.ny} name={s.name} sub={s.sub} anchor={s.anchor} />
        </g>
      ))}
      <Glow cx={c.cx} cy={c.cy} rx={50} id={id} />
      <Tile cx={c.cx} cy={c.cy} rx={50} variant="accent" />
      <text
        x={c.cx}
        y={c.cy + 3}
        textAnchor="middle"
        fill={ACCENT}
        style={{ ...MONO, fontSize: "12px", letterSpacing: "2px" }}
      >
        RUN ID
      </text>
    </>
  );
}

function Delivery() {
  const id = "delivery";
  const runner = { cx: 296, cy: 150 };
  const effect = { cx: 560, cy: 150 };
  return (
    <>
      <Floor id={id} />
      <Arrow x1={120} y1={112} x2={runner.cx - 44} y2={runner.cy - 6} />
      <Arrow x1={120} y1={188} x2={runner.cx - 44} y2={runner.cy + 6} />
      <Label x={116} y={92} name="DELIVER ×N" sub="retries + recovery" anchor="start" />
      <Tile cx={runner.cx} cy={runner.cy} rx={44} />
      <Label x={runner.cx} y={210} name="RUNNER" sub="de-dupes in flight" />
      <Arrow x1={runner.cx + 46} y1={runner.cy} x2={effect.cx - 48} y2={effect.cy} accent />
      <Glow cx={effect.cx} cy={effect.cy} rx={44} id={id} />
      <Tile cx={effect.cx} cy={effect.cy} rx={44} variant="accent" />
      <Ring x={effect.cx} y={effect.cy} accent />
      <Label x={effect.cx} y={210} name="EFFECT ×1" sub="idempotent" accent />
    </>
  );
}

function Contention() {
  const id = "contention";
  const run = { cx: 360, cy: 150 };
  const left = { cx: 150, cy: 150 };
  const right = { cx: 570, cy: 150 };
  return (
    <>
      <Floor id={id} />
      <Arrow x1={left.cx + 32} y1={left.cy} x2={run.cx - 50} y2={run.cy} accent />
      <Arrow x1={right.cx - 32} y1={right.cy} x2={run.cx + 50} y2={run.cy} dashed />
      <Tile cx={left.cx} cy={left.cy} rx={30} depth={10} />
      <Label x={left.cx} y={106} name="OWNER" sub="holds the claim" accent />
      <Tile cx={right.cx} cy={right.cy} rx={30} depth={10} variant="ghost" />
      <Label x={right.cx} y={106} name="BACKS OFF" sub="sees the claim" />
      <Glow cx={run.cx} cy={run.cy} rx={48} id={id} />
      <Tile cx={run.cx} cy={run.cy} rx={48} variant="accent" />
      <Ring x={run.cx} y={run.cy} accent />
      <Label x={run.cx} y={212} name="ONE RUN" sub="single terminal callback" accent />
    </>
  );
}

function Budget() {
  const id = "budget";
  const cx = 250;
  const cys = [214, 180, 146, 112, 78];
  const ceiling = 96;
  const top = cys[cys.length - 1];
  return (
    <>
      <Floor id={id} />
      {/* ceiling */}
      <line x1={150} y1={ceiling} x2={545} y2={ceiling} stroke="rgba(238,238,234,0.28)" strokeWidth={1} strokeDasharray="4 4" />
      <Label x={706} y={ceiling - 18} name="CEILING" sub="$0.10 · 6 turns" anchor="end" />
      {/* accumulating stack, top tile trips the limit */}
      {cys.map((cy, i) => {
        const isTop = i === cys.length - 1;
        if (isTop) return <Glow key="g" cx={cx} cy={cy} rx={46} id={id} />;
        return <Tile key={i} cx={cx} cy={cy} rx={46} variant="solid" />;
      })}
      <Tile cx={cx} cy={top} rx={46} variant="accent" />
      <Cross x={cx} y={top} />
      <Label x={cx} y={252} name="COST ACCRUES" sub="tokens · turns · usd" />
      <Leader x1={cx + 47} y1={top} x2={430} y2={54} />
      <Label x={436} y={50} name="ABORT" sub="controller fires" accent anchor="start" />
    </>
  );
}

function Trust() {
  const id = "trust";
  const claim = { cx: 190, cy: 150 };
  const truth = { cx: 540, cy: 150 };
  const gx = 365;
  return (
    <>
      <Floor id={id} />
      <Tile cx={claim.cx} cy={claim.cy} rx={40} variant="ghost" />
      <Label x={claim.cx} y={210} name="CLAIM" sub="agent output" />
      <Arrow x1={claim.cx + 42} y1={claim.cy} x2={gx - 16} y2={claim.cy} />
      {/* validation gate */}
      <line x1={gx} y1={72} x2={gx} y2={228} stroke="rgba(238,238,234,0.28)" strokeWidth={1} strokeDasharray="4 4" />
      <circle cx={gx} cy={claim.cy} r={11} fill="var(--surface-raised)" stroke={A_EDGE} strokeWidth={1.2} />
      <Check x={gx} y={claim.cy} />
      <Label x={gx} y={54} name="RE-VALIDATE" sub="server-side" />
      <Arrow x1={gx + 16} y1={claim.cy} x2={truth.cx - 42} y2={truth.cy} accent />
      <Glow cx={truth.cx} cy={truth.cy} rx={40} id={id} />
      <Tile cx={truth.cx} cy={truth.cy} rx={40} variant="accent" />
      <Label x={truth.cx} y={210} name="TRUTH" sub="written state" accent />
    </>
  );
}

const SCENES: Record<string, { fig: string; caption: string; aria: string; Scene: () => React.JSX.Element }> = {
  crash: {
    fig: "Fig. 01",
    caption: "One restart, work lost",
    aria: "An in-flight agent run of tool-call tiles ascending, ruptured at the middle tile by a VM restart, with the remaining steps shown as never-reached ghosts.",
    Scene: Crash,
  },
  "run-id": {
    fig: "Fig. 02",
    caption: "One ID keys every step",
    aria: "A central accented run-ID tile with leader lines to four satellite tiles: checkpoint, credential, policy, and callback.",
    Scene: RunId,
  },
  delivery: {
    fig: "Fig. 03",
    caption: "At-least-once in, exactly-once out",
    aria: "Multiple delivery arrows entering a runner tile that de-duplicates them into a single accented idempotent effect.",
    Scene: Delivery,
  },
  contention: {
    fig: "Fig. 04",
    caption: "One owner wins, the other stays silent",
    aria: "Two worker tiles reaching for one accented run tile; one holds the claim, the other backs off without reporting failure.",
    Scene: Contention,
  },
  budget: {
    fig: "Fig. 05",
    caption: "The limit trips inside the run",
    aria: "A stack of accumulating cost tiles rising past a dashed spending ceiling; the crossing tile is accented and marked aborted.",
    Scene: Budget,
  },
  trust: {
    fig: "Fig. 06",
    caption: "Claim checked before it counts",
    aria: "A ghosted claim tile passing through a re-validation gate to become an accented tile of verified truth.",
    Scene: Trust,
  },
};

export type ArticleDiagramKind = keyof typeof SCENES;

export function ArticleDiagram({ kind }: { kind: ArticleDiagramKind }) {
  const scene = SCENES[kind];
  if (!scene) return null;
  const { fig, caption, aria, Scene } = scene;
  return (
    <figure className="group relative my-[38px] overflow-hidden border border-line bg-surface-raised px-5 pt-[18px] pb-4">
      <figcaption className="mb-2 flex items-baseline justify-between font-ui text-[0.6rem] uppercase tracking-[0.16em] text-quiet">
        <span>{fig}</span>
        <span className="text-dim">{caption}</span>
      </figcaption>
      <svg className="block h-auto w-full overflow-visible" viewBox={`0 0 ${VB_W} ${VB_H}`} role="img" aria-label={aria}>
        <Scene />
      </svg>
    </figure>
  );
}
