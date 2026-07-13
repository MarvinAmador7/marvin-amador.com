const RX = 54;
const RY = 27;
const DEPTH = 13;
const GATE_DEPTH = 5; // the validator reads as a thin gate, not a floor
const CX = 96;

// Base -> top is rendered top -> bottom on screen: index 0 sits highest.
const LAYERS = [
  { key: "surfaces", name: "SURFACES", sub: "canvas · agent · visitors", marker: "stack", depth: DEPTH, accent: false },
  { key: "runtime", name: "AGENT RUNTIME", sub: "micro-VM · jq · skills", marker: "hexagon", depth: DEPTH, accent: false },
  { key: "validator", name: "VALIDATOR", sub: "validate · reject · never repair", marker: "gate", depth: GATE_DEPTH, accent: false },
  { key: "document", name: "DOCUMENT", sub: "one funnel spec · convex truth", marker: "core", depth: DEPTH, accent: true },
] as const;

const CY = [34, 80, 126, 172];

// Isometric floor grid covering the full surface (slopes +/-0.5), clipped to the box.
const FLOOR_W = 356;
const FLOOR_H = 250;
const FLOOR_STEP = 24;

function buildFloor() {
  const lines: Array<[number, number, number, number]> = [];

  // right-descending lines (slope +0.5): y = 0.5x + b
  for (let b = -FLOOR_W / 2; b <= FLOOR_H; b += FLOOR_STEP) {
    const x1 = Math.max(0, -2 * b);
    const x2 = Math.min(FLOOR_W, 2 * (FLOOR_H - b));
    if (x2 - x1 > 0.5) lines.push([x1, 0.5 * x1 + b, x2, 0.5 * x2 + b]);
  }

  // left-descending lines (slope -0.5): y = -0.5x + c
  for (let c = 0; c <= FLOOR_H + FLOOR_W / 2; c += FLOOR_STEP) {
    const x1 = Math.max(0, 2 * (c - FLOOR_H));
    const x2 = Math.min(FLOOR_W, 2 * c);
    if (x2 - x1 > 0.5) lines.push([x1, -0.5 * x1 + c, x2, -0.5 * x2 + c]);
  }

  return lines;
}

const FLOOR_LINES = buildFloor();

const LABEL_X = 184;
const MARKER_X = 172;
const LEADER_FROM = CX + RX;
const LEADER_TO = 164;

function topFace(cy: number) {
  return `M ${CX} ${cy - RY} L ${CX + RX} ${cy} L ${CX} ${cy + RY} L ${CX - RX} ${cy} Z`;
}

function rightFace(cy: number, depth: number) {
  return `M ${CX + RX} ${cy} L ${CX} ${cy + RY} L ${CX} ${cy + RY + depth} L ${CX + RX} ${cy + depth} Z`;
}

function leftFace(cy: number, depth: number) {
  return `M ${CX - RX} ${cy} L ${CX} ${cy + RY} L ${CX} ${cy + RY + depth} L ${CX - RX} ${cy + depth} Z`;
}

function insetRhombus(cy: number, scale = 0.6) {
  const rx = RX * scale;
  const ry = RY * scale;
  return `M ${CX} ${cy - ry} L ${CX + rx} ${cy} L ${CX} ${cy + ry} L ${CX - rx} ${cy} Z`;
}

function Marker({ kind, x, y }: { kind: string; x: number; y: number }) {
  if (kind === "core") {
    return <path d={`M ${x} ${y - 5.5} L ${x + 5.5} ${y} L ${x} ${y + 5.5} L ${x - 5.5} ${y} Z`} fill="var(--primary)" />;
  }
  if (kind === "stack") {
    // two nested rhombus outlines: several surfaces over one document
    return (
      <g fill="none" stroke="var(--color-dim)" strokeWidth={1.1}>
        <path d={`M ${x} ${y - 5.5} L ${x + 5.5} ${y - 2.75} L ${x} ${y} L ${x - 5.5} ${y - 2.75} Z`} />
        <path d={`M ${x - 5.5} ${y + 1.5} L ${x} ${y + 4.25} L ${x + 5.5} ${y + 1.5}`} strokeLinecap="round" />
      </g>
    );
  }
  if (kind === "hexagon") {
    const pts = [0, 1, 2, 3, 4, 5]
      .map((i) => {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        return `${(x + Math.cos(a) * 6).toFixed(2)} ${(y + Math.sin(a) * 6).toFixed(2)}`;
      })
      .join(" L ");
    return <path d={`M ${pts} Z`} fill="none" stroke="var(--color-dim)" strokeWidth={1.1} />;
  }
  // gate (validator): two posts with a small diamond that must pass between them
  return (
    <g fill="none" stroke="var(--color-dim)" strokeWidth={1.1}>
      <line x1={x - 5.5} y1={y - 5} x2={x - 5.5} y2={y + 5} />
      <line x1={x + 5.5} y1={y - 5} x2={x + 5.5} y2={y + 5} />
      <path d={`M ${x} ${y - 3} L ${x + 3} ${y} L ${x} ${y + 3} L ${x - 3} ${y} Z`} />
    </g>
  );
}

export function FunnelLoopsIsoStack() {
  return (
    <svg
      className="block h-auto w-full overflow-visible"
      viewBox="0 0 356 250"
      role="img"
      aria-label="FunnelLoops layered system: one validated funnel document at the base, guarded by a validation gate, carrying the agent runtime and the editing surfaces."
    >
      <defs>
        <filter id="flIsoGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <clipPath id="flIsoClip">
          <rect x="0" y="0" width="356" height="250" />
        </clipPath>
        <linearGradient id="flFloorFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0.12" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.95" />
        </linearGradient>
        <mask id="flFloorMask">
          <rect x="0" y="0" width="356" height="250" fill="url(#flFloorFade)" />
        </mask>
      </defs>

      {/* isometric floor grid the stack rests on */}
      <g clipPath="url(#flIsoClip)" mask="url(#flFloorMask)">
        {FLOOR_LINES.map((l, i) => (
          <line
            key={i}
            x1={l[0].toFixed(2)}
            y1={l[1].toFixed(2)}
            x2={l[2].toFixed(2)}
            y2={l[3].toFixed(2)}
            stroke="rgba(238,238,234,0.28)"
            strokeWidth={0.75}
          />
        ))}
      </g>

      {/* spine connecting the stack */}
      <line
        x1={CX}
        y1={CY[0]}
        x2={CX}
        y2={CY[3]}
        stroke="rgba(238,238,234,0.14)"
        strokeWidth={1}
        strokeDasharray="2 4"
      />

      {/* document glow footprint */}
      <path
        className="iso-glow opacity-40 [transition:opacity_0.55s_ease] motion-reduce:[transition:none]"
        d={topFace(CY[3])}
        fill="var(--primary)"
        filter="url(#flIsoGlow)"
      />

      {LAYERS.map((layer, i) => {
        const cy = CY[i];
        const accent = layer.accent;
        const topFill = accent ? "rgba(229,111,70,0.16)" : "#17171a";
        const rightFill = accent ? "rgba(229,111,70,0.24)" : "#101013";
        const leftFill = accent ? "rgba(229,111,70,0.11)" : "#0b0b0d";
        const edge = accent ? "rgba(229,111,70,0.7)" : "rgba(238,238,234,0.16)";
        const sideEdge = accent ? "rgba(229,111,70,0.4)" : "rgba(238,238,234,0.07)";

        return (
          <g
            key={layer.key}
            className="iso-slab [transition:transform_0.55s_cubic-bezier(0.2,0.7,0.15,1)] motion-reduce:[transition:none]"
            data-layer={i}
          >
            <path d={leftFace(cy, layer.depth)} fill={leftFill} stroke={sideEdge} strokeWidth={1} />
            <path d={rightFace(cy, layer.depth)} fill={rightFill} stroke={sideEdge} strokeWidth={1} />
            <path d={topFace(cy)} fill={topFill} stroke={edge} strokeWidth={1} />
            <path
              d={insetRhombus(cy)}
              fill="none"
              stroke={accent ? "rgba(229,111,70,0.45)" : "rgba(238,238,234,0.08)"}
              strokeWidth={1}
            />

            {/* leader + label */}
            <line x1={LEADER_FROM} y1={cy} x2={LEADER_TO} y2={cy} stroke="rgba(238,238,234,0.18)" strokeWidth={1} />
            <Marker kind={layer.marker} x={MARKER_X} y={cy} />
            <text
              x={LABEL_X}
              y={cy - 2.5}
              fill={accent ? "var(--primary)" : "var(--text)"}
              style={{ fontFamily: "var(--font-ui)", fontSize: "11px", letterSpacing: "1.5px" }}
            >
              {layer.name}
            </text>
            <text
              x={LABEL_X}
              y={cy + 10}
              fill="var(--color-dim)"
              style={{ fontFamily: "var(--font-ui)", fontSize: "8px", letterSpacing: "0.3px" }}
            >
              {layer.sub}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
