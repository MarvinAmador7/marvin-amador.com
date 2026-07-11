// Isometric operational-graph illustration (see skill: isometric-blueprint-illustration).
// A central WORK ORDER hub (the one accented element) referenced by entity nodes on an
// isometric floor plane, wired with spoke + ring edges so it reads as a graph, not a flow.

const HUB = { x: 300, y: 175, rx: 42, depth: 16 };

type Node = { id: string; label: string; x: number; y: number; lx: number; ly: number; anchor: "start" | "middle" | "end" };

const NODES: Node[] = [
  { id: "location", label: "LOCATION", x: 300, y: 65, lx: 300, ly: 43, anchor: "middle" },
  { id: "asset", label: "ASSET", x: 150, y: 100, lx: 116, ly: 103, anchor: "end" },
  { id: "crew", label: "CREW", x: 450, y: 100, lx: 484, ly: 103, anchor: "start" },
  { id: "parts", label: "PARTS", x: 150, y: 250, lx: 116, ly: 253, anchor: "end" },
  { id: "skills", label: "SKILLS", x: 450, y: 250, lx: 484, ly: 253, anchor: "start" },
  { id: "budget", label: "BUDGET", x: 300, y: 285, lx: 300, ly: 307, anchor: "middle" },
];

const NODE_RX = 26;
const NODE_DEPTH = 8;

// hub -> each entity (everything references the work order)
const SPOKES = NODES.map((n) => [HUB, n] as const);

// entity <-> entity (the relationships that make it a graph, not a star)
const RING: Array<[string, string]> = [
  ["location", "asset"],
  ["location", "crew"],
  ["asset", "parts"],
  ["crew", "skills"],
  ["parts", "budget"],
  ["budget", "skills"],
];
const byId = (id: string) => NODES.find((n) => n.id === id)!;

// ---- isometric primitives (rx horizontal, ry = rx/2 for true 2:1) ----
const top = (x: number, y: number, rx: number) =>
  `M ${x} ${y - rx / 2} L ${x + rx} ${y} L ${x} ${y + rx / 2} L ${x - rx} ${y} Z`;
const right = (x: number, y: number, rx: number, d: number) =>
  `M ${x + rx} ${y} L ${x} ${y + rx / 2} L ${x} ${y + rx / 2 + d} L ${x + rx} ${y + d} Z`;
const left = (x: number, y: number, rx: number, d: number) =>
  `M ${x - rx} ${y} L ${x} ${y + rx / 2} L ${x} ${y + rx / 2 + d} L ${x - rx} ${y + d} Z`;

// ---- isometric floor grid (slopes +/-0.5), radial fade under the hub ----
const W = 640;
const H = 360;
const STEP = 26;
function buildFloor(): Array<[number, number, number, number]> {
  const lines: Array<[number, number, number, number]> = [];
  for (let b = -W / 2; b <= H; b += STEP) {
    const x1 = Math.max(0, -2 * b);
    const x2 = Math.min(W, 2 * (H - b));
    if (x2 - x1 > 0.5) lines.push([x1, 0.5 * x1 + b, x2, 0.5 * x2 + b]);
  }
  for (let c = 0; c <= H + W / 2; c += STEP) {
    const x1 = Math.max(0, 2 * (c - H));
    const x2 = Math.min(W, 2 * c);
    if (x2 - x1 > 0.5) lines.push([x1, -0.5 * x1 + c, x2, -0.5 * x2 + c]);
  }
  return lines;
}
const FLOOR = buildFloor();

function EntityNode({ node }: { node: Node }) {
  return (
    <g>
      <path d={left(node.x, node.y, NODE_RX, NODE_DEPTH)} fill="#0b0b0d" stroke="rgba(238,238,234,0.07)" strokeWidth={1} />
      <path d={right(node.x, node.y, NODE_RX, NODE_DEPTH)} fill="#101013" stroke="rgba(238,238,234,0.07)" strokeWidth={1} />
      <path d={top(node.x, node.y, NODE_RX)} fill="#17171a" stroke="rgba(238,238,234,0.16)" strokeWidth={1} />
      <path d={top(node.x, node.y, NODE_RX * 0.5)} fill="none" stroke="rgba(238,238,234,0.08)" strokeWidth={1} />
      <text
        x={node.lx}
        y={node.ly}
        textAnchor={node.anchor}
        className="fill-text font-ui text-[10px] tracking-[1.2px]"
      >
        {node.label}
      </text>
    </g>
  );
}

export function OperationalGraphVisual() {
  return (
    <svg className="block h-auto w-full overflow-visible" viewBox="0 0 640 360" role="img" aria-label="The operation as a graph: a central work order node referenced by asset, location, crew, skills, parts, and budget, with relationships between them.">
      <defs>
        <filter id="opGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <clipPath id="opClip">
          <rect x="0" y="0" width="640" height="360" />
        </clipPath>
        <radialGradient id="opFade" cx="0.47" cy="0.49" r="0.6">
          <stop offset="0" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="opMask">
          <rect x="0" y="0" width="640" height="360" fill="url(#opFade)" />
        </mask>
      </defs>

      {/* 1. isometric floor grid */}
      <g clipPath="url(#opClip)" mask="url(#opMask)">
        {FLOOR.map((l, i) => (
          <line key={i} x1={l[0].toFixed(2)} y1={l[1].toFixed(2)} x2={l[2].toFixed(2)} y2={l[3].toFixed(2)} stroke="rgba(238,238,234,0.22)" strokeWidth={0.75} />
        ))}
      </g>

      {/* 2. entity <-> entity relationships (dim) */}
      {RING.map(([a, b], i) => {
        const na = byId(a);
        const nb = byId(b);
        return <line key={`r${i}`} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke="rgba(238,238,234,0.1)" strokeWidth={1} />;
      })}

      {/* 3. hub -> entity spokes (brighter; everything references the work order) */}
      {SPOKES.map(([h, n], i) => (
        <line key={`s${i}`} x1={h.x} y1={h.y} x2={n.x} y2={n.y} stroke="rgba(238,238,234,0.2)" strokeWidth={1} />
      ))}

      {/* 4. entity nodes */}
      {NODES.map((n) => (
        <EntityNode key={n.id} node={n} />
      ))}

      {/* 5. the accented hub: WORK ORDER */}
      <path
        className="opgraph-glow fill-primary opacity-45 [transition:opacity_0.55s_ease] motion-reduce:transition-none"
        d={top(HUB.x, HUB.y, HUB.rx)}
        filter="url(#opGlow)"
      />
      <g>
        <path d={left(HUB.x, HUB.y, HUB.rx, HUB.depth)} fill="rgba(229,111,70,0.11)" stroke="rgba(229,111,70,0.4)" strokeWidth={1} />
        <path d={right(HUB.x, HUB.y, HUB.rx, HUB.depth)} fill="rgba(229,111,70,0.24)" stroke="rgba(229,111,70,0.4)" strokeWidth={1} />
        <path d={top(HUB.x, HUB.y, HUB.rx)} className="stroke-primary" fill="rgba(229,111,70,0.16)" strokeWidth={1} />
        <path d={top(HUB.x, HUB.y, HUB.rx * 0.55)} fill="none" stroke="rgba(229,111,70,0.5)" strokeWidth={1} />
        <path d={`M ${HUB.x} ${HUB.y - 5.5} L ${HUB.x + 5.5} ${HUB.y} L ${HUB.x} ${HUB.y + 5.5} L ${HUB.x - 5.5} ${HUB.y} Z`} className="fill-primary" />
      </g>

      {/* 6. hub leader label */}
      <line x1={HUB.x + HUB.rx} y1={HUB.y} x2={472} y2={HUB.y} stroke="rgba(238,238,234,0.18)" strokeWidth={1} />
      <text x={480} y={HUB.y - 2} className="fill-primary font-ui text-[11px] tracking-[1.5px]">
        WORK ORDER
      </text>
      <text x={480} y={HUB.y + 11} className="fill-dim font-ui text-[8px] tracking-[0.3px]">
        the operational junction
      </text>
    </svg>
  );
}
