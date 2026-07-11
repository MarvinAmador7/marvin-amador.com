const RX = 54;
const RY = 27;
const DEPTH = 13;
const CX = 96;

// Base -> top is rendered top -> bottom on screen: index 0 sits highest.
const LAYERS = [
  { key: "autonomy", name: "AUTONOMY", sub: "reason · propose · act", marker: "diamond", accent: false },
  { key: "governance", name: "GOVERNANCE", sub: "RBAC ∩ allowlist ∩ policy", marker: "hexagon", accent: false },
  { key: "durability", name: "DURABILITY", sub: "idempotent · recoverable", marker: "ring", accent: false },
  { key: "authority", name: "AUTHORITY", sub: "postgres truth · immutable audit", marker: "core", accent: true },
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

function rightFace(cy: number) {
  return `M ${CX + RX} ${cy} L ${CX} ${cy + RY} L ${CX} ${cy + RY + DEPTH} L ${CX + RX} ${cy + DEPTH} Z`;
}

function leftFace(cy: number) {
  return `M ${CX - RX} ${cy} L ${CX} ${cy + RY} L ${CX} ${cy + RY + DEPTH} L ${CX - RX} ${cy + DEPTH} Z`;
}

function insetRhombus(cy: number, scale = 0.6) {
  const rx = RX * scale;
  const ry = RY * scale;
  return `M ${CX} ${cy - ry} L ${CX + rx} ${cy} L ${CX} ${cy + ry} L ${CX - rx} ${cy} Z`;
}

function Marker({ kind, x, y }: { kind: string; x: number; y: number }) {
  if (kind === "core") {
    return <path d={`M ${x} ${y - 5.5} L ${x + 5.5} ${y} L ${x} ${y + 5.5} L ${x - 5.5} ${y} Z`} fill="var(--accent)" />;
  }
  if (kind === "diamond") {
    return (
      <path
        d={`M ${x} ${y - 5.5} L ${x + 5.5} ${y} L ${x} ${y + 5.5} L ${x - 5.5} ${y} Z`}
        fill="none"
        stroke="var(--muted)"
        strokeWidth={1.1}
      />
    );
  }
  if (kind === "hexagon") {
    const pts = [0, 1, 2, 3, 4, 5]
      .map((i) => {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        return `${(x + Math.cos(a) * 6).toFixed(2)} ${(y + Math.sin(a) * 6).toFixed(2)}`;
      })
      .join(" L ");
    return <path d={`M ${pts} Z`} fill="none" stroke="var(--muted)" strokeWidth={1.1} />;
  }
  // ring (durability)
  return (
    <g fill="none" stroke="var(--muted)" strokeWidth={1.1}>
      <path d={`M ${x + 5} ${y - 1.6} A 5.2 5.2 0 1 1 ${x - 3.6} ${y - 3.6}`} strokeLinecap="round" />
      <path d={`M ${x - 3.6} ${y - 5.8} L ${x - 3.6} ${y - 3.2} L ${x - 1} ${y - 3.4}`} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

export function IsometricStack() {
  return (
    <svg
      className="block h-auto w-full overflow-visible"
      viewBox="0 0 356 250"
      role="img"
      aria-label="Grivara OPS layered system: a durable postgres authority at the base carrying durability, governance, and autonomous agents."
    >
      <defs>
        <filter id="isoGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <clipPath id="isoClip">
          <rect x="0" y="0" width="356" height="250" />
        </clipPath>
        <linearGradient id="floorFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0.12" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.95" />
        </linearGradient>
        <mask id="floorMask">
          <rect x="0" y="0" width="356" height="250" fill="url(#floorFade)" />
        </mask>
      </defs>

      {/* isometric floor grid the stack rests on */}
      <g clipPath="url(#isoClip)" mask="url(#floorMask)">
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

      {/* authority glow footprint */}
      <path
        className="iso-glow opacity-40 [transition:opacity_0.55s_ease] motion-reduce:[transition:none]"
        d={topFace(CY[3])}
        fill="var(--accent)"
        filter="url(#isoGlow)"
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
            <path d={leftFace(cy)} fill={leftFill} stroke={sideEdge} strokeWidth={1} />
            <path d={rightFace(cy)} fill={rightFill} stroke={sideEdge} strokeWidth={1} />
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
              fill={accent ? "var(--accent)" : "var(--text)"}
              style={{ fontFamily: "var(--font-ui)", fontSize: "11px", letterSpacing: "1.5px" }}
            >
              {layer.name}
            </text>
            <text
              x={LABEL_X}
              y={cy + 10}
              fill="var(--muted)"
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
