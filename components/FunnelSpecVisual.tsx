// Isometric funnel-spec illustration (see skill: isometric-blueprint-illustration).
// One accented document plane (funnel.json) carries the step tiles and their inline
// routing; ACTIONS floats above as a top-level record referencing its trigger step;
// editor state is a flat dashed ghost outside the document, barred at the edge.

const PLANE = { x: 262, y: 175, rx: 200, depth: 10 };

type Tile = { id: string; label: string; sub: string; x: number; y: number; ly: number };

const TILE_RX = 30;
const TILE_DEPTH = 8;

const TILES: Tile[] = [
  { id: "landing", label: "LANDING", sub: "routing inline", x: 152, y: 155, ly: 192 },
  { id: "form", label: "FORM", sub: "typed fields", x: 232, y: 195, ly: 232 },
  { id: "branch", label: "BRANCH", sub: "conditions + fallback", x: 312, y: 155, ly: 192 },
  { id: "end", label: "END", sub: "terminal step", x: 386, y: 192, ly: 229 },
];

const ACTIONS = { x: 232, y: 105, rx: 34, depth: 8 };
const GHOST = { x: 100, y: 258, rx: 26 };

// ---- isometric primitives (rx horizontal, ry = rx/2 for true 2:1) ----
const top = (x: number, y: number, rx: number) =>
  `M ${x} ${y - rx / 2} L ${x + rx} ${y} L ${x} ${y + rx / 2} L ${x - rx} ${y} Z`;
const right = (x: number, y: number, rx: number, d: number) =>
  `M ${x + rx} ${y} L ${x} ${y + rx / 2} L ${x} ${y + rx / 2 + d} L ${x + rx} ${y + d} Z`;
const left = (x: number, y: number, rx: number, d: number) =>
  `M ${x - rx} ${y} L ${x} ${y + rx / 2} L ${x} ${y + rx / 2 + d} L ${x - rx} ${y + d} Z`;

// Flow edges run tile-edge-midpoint to tile-edge-midpoint on the plane's iso axes.
const FLOW: Array<{ from: [number, number]; to: [number, number]; dashed?: boolean }> = [
  { from: [167, 162.5], to: [217, 187.5] }, // landing -> form (+u)
  { from: [247, 187.5], to: [297, 162.5] }, // form -> branch (+v up)
  { from: [327, 162.5], to: [371, 184.5] }, // branch -> end, matched condition
  { from: [342, 155], to: [386, 177], dashed: true }, // branch -> end, required fallback
];

function chevron(x: number, y: number, angle: number) {
  const a1 = angle - 0.5;
  const a2 = angle + 0.5;
  return `M ${(x - 6 * Math.cos(a1)).toFixed(2)} ${(y - 6 * Math.sin(a1)).toFixed(2)} L ${x} ${y} L ${(x - 6 * Math.cos(a2)).toFixed(2)} ${(y - 6 * Math.sin(a2)).toFixed(2)}`;
}

// ---- isometric floor grid (slopes +/-0.5), radial fade under the plane ----
const W = 640;
const H = 322;
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

// Shape vocabulary: diamond = action / event, triangle = trigger / function.
// On-line glyphs take the surface fill so the line behind them is masked.
function DiamondGlyph({ x, y, r = 4.5, fill = "none" }: { x: number; y: number; r?: number; fill?: string }) {
  return (
    <path
      d={`M ${x} ${y - r} L ${x + r} ${y} L ${x} ${y + r} L ${x - r} ${y} Z`}
      fill={fill}
      stroke="var(--color-dim)"
      strokeWidth={1.1}
    />
  );
}

function TriangleGlyph({ x, y, r = 4.5, fill = "none" }: { x: number; y: number; r?: number; fill?: string }) {
  return (
    <path
      d={`M ${x} ${y - r} L ${(x + 0.866 * r).toFixed(2)} ${y + r / 2} L ${(x - 0.866 * r).toFixed(2)} ${y + r / 2} Z`}
      fill={fill}
      stroke="var(--color-dim)"
      strokeWidth={1.1}
      strokeLinejoin="round"
    />
  );
}

function StepTile({ tile }: { tile: Tile }) {
  return (
    <g>
      <path d={left(tile.x, tile.y, TILE_RX, TILE_DEPTH)} fill="#0b0b0d" stroke="rgba(238,238,234,0.07)" strokeWidth={1} />
      <path d={right(tile.x, tile.y, TILE_RX, TILE_DEPTH)} fill="#101013" stroke="rgba(238,238,234,0.07)" strokeWidth={1} />
      <path d={top(tile.x, tile.y, TILE_RX)} fill="#17171a" stroke="rgba(238,238,234,0.16)" strokeWidth={1} />
      <path d={top(tile.x, tile.y, TILE_RX * 0.5)} fill="none" stroke="rgba(238,238,234,0.08)" strokeWidth={1} />
      <text x={tile.x} y={tile.ly} textAnchor="middle" className="fill-text font-ui text-[10px] tracking-[1.2px]">
        {tile.label}
      </text>
      <text x={tile.x} y={tile.ly + 11} textAnchor="middle" className="fill-quiet font-ui text-[7px] tracking-[0.3px]">
        {tile.sub}
      </text>
    </g>
  );
}

export function FunnelSpecVisual() {
  return (
    <svg
      className="block h-auto w-full overflow-visible"
      viewBox="0 0 640 322"
      role="img"
      aria-label="The funnel as one typed document: a funnel.json plane carrying landing, form, branch, and end steps with inline routing, a floating top-level actions record referencing its trigger step, and editor state excluded outside the document."
    >
      <defs>
        <filter id="fsGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <clipPath id="fsClip">
          <rect x="0" y="0" width="640" height="322" />
        </clipPath>
        <radialGradient id="fsFade" cx="0.42" cy="0.52" r="0.62">
          <stop offset="0" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="fsMask">
          <rect x="0" y="0" width="640" height="322" fill="url(#fsFade)" />
        </mask>
      </defs>

      {/* 1. isometric floor grid */}
      <g clipPath="url(#fsClip)" mask="url(#fsMask)">
        {FLOOR.map((l, i) => (
          <line key={i} x1={l[0].toFixed(2)} y1={l[1].toFixed(2)} x2={l[2].toFixed(2)} y2={l[3].toFixed(2)} stroke="rgba(238,238,234,0.22)" strokeWidth={0.75} />
        ))}
      </g>

      {/* 2. editor state: a flat dashed ghost on the floor, outside the document */}
      <g>
        <line x1={126} y1={258} x2={176} y2={233} stroke="rgba(238,238,234,0.18)" strokeWidth={1} strokeDasharray="3 3" />
        <path
          d={`M ${146.5} ${241} L ${155.5} ${250} M ${155.5} ${241} L ${146.5} ${250}`}
          stroke="var(--diagram-red)"
          strokeWidth={1.2}
          strokeLinecap="round"
        />
        <path d={top(GHOST.x, GHOST.y, GHOST.rx)} fill="none" stroke="rgba(238,238,234,0.28)" strokeWidth={1} strokeDasharray="3 3" />
        <path d={top(GHOST.x, GHOST.y, GHOST.rx * 0.5)} fill="none" stroke="rgba(238,238,234,0.1)" strokeWidth={1} strokeDasharray="3 3" />
        <text x={GHOST.x} y={287} textAnchor="middle" className="fill-dim font-ui text-[10px] tracking-[1.2px]">
          EDITOR STATE
        </text>
        <text x={GHOST.x} y={298} textAnchor="middle" className="fill-quiet font-ui text-[7px] tracking-[0.3px]">
          never enters the spec
        </text>
      </g>

      {/* 3. one soft accent glow under the document — brightens on chapter hover */}
      <path className="opgraph-glow fill-primary opacity-30 [transition:opacity_0.55s_ease] motion-reduce:transition-none" d={top(PLANE.x, PLANE.y, 120)} filter="url(#fsGlow)" />

      {/* 4. the accented document plane: funnel.json */}
      <g>
        <path d={left(PLANE.x, PLANE.y, PLANE.rx, PLANE.depth)} fill="rgba(229,111,70,0.08)" stroke="rgba(229,111,70,0.35)" strokeWidth={1} />
        <path d={right(PLANE.x, PLANE.y, PLANE.rx, PLANE.depth)} fill="rgba(229,111,70,0.14)" stroke="rgba(229,111,70,0.35)" strokeWidth={1} />
        <path d={top(PLANE.x, PLANE.y, PLANE.rx)} className="stroke-primary" fill="rgba(229,111,70,0.06)" strokeWidth={1} />
        <path d={top(PLANE.x, PLANE.y, PLANE.rx * 0.93)} fill="none" stroke="rgba(229,111,70,0.25)" strokeWidth={1} />
      </g>

      {/* 5. inline routing: flow edges on the document's iso axes */}
      {FLOW.map((edge, i) => {
        const angle = Math.atan2(edge.to[1] - edge.from[1], edge.to[0] - edge.from[0]);
        return (
          <g key={i} stroke="rgba(238,238,234,0.3)" strokeWidth={1} fill="none">
            <line x1={edge.from[0]} y1={edge.from[1]} x2={edge.to[0]} y2={edge.to[1]} strokeDasharray={edge.dashed ? "3 3" : undefined} />
            <path d={chevron(edge.to[0], edge.to[1], angle)} />
          </g>
        );
      })}

      {/* condition function picking the matched path out of BRANCH */}
      <TriangleGlyph x={349} y={172} r={4.5} fill="#0e0e0e" />

      {/* 6. step tiles riding on the document */}
      {TILES.map((tile) => (
        <StepTile key={tile.id} tile={tile} />
      ))}

      {/* 7. ACTIONS: a top-level record floating above, referencing its trigger step.
             On the reference line, the step emits an event (diamond) and the trigger
             (triangle) fires the action; the slab face carries the action diamond. */}
      <line x1={ACTIONS.x} y1={ACTIONS.y + ACTIONS.rx / 2} x2={ACTIONS.x} y2={180} stroke="rgba(238,238,234,0.22)" strokeWidth={1} strokeDasharray="3 3" />
      <DiamondGlyph x={ACTIONS.x} y={174} r={4} fill="#0e0e0e" />
      <TriangleGlyph x={ACTIONS.x} y={131} r={4.5} fill="#0e0e0e" />
      <g className="[transition:translate_0.55s_cubic-bezier(0.2,0.7,0.15,1)] [.chapter-visual:hover_&]:-translate-y-[5px] motion-reduce:transition-none motion-reduce:[.chapter-visual:hover_&]:translate-y-0">
        <path d={left(ACTIONS.x, ACTIONS.y, ACTIONS.rx, ACTIONS.depth)} fill="#0b0b0d" stroke="rgba(238,238,234,0.07)" strokeWidth={1} />
        <path d={right(ACTIONS.x, ACTIONS.y, ACTIONS.rx, ACTIONS.depth)} fill="#101013" stroke="rgba(238,238,234,0.07)" strokeWidth={1} />
        <path d={top(ACTIONS.x, ACTIONS.y, ACTIONS.rx)} fill="#17171a" stroke="rgba(238,238,234,0.16)" strokeWidth={1} />
        <DiamondGlyph x={ACTIONS.x} y={ACTIONS.y} r={5} />
      </g>

      {/* 8. leader labels */}
      <line x1={266} y1={105} x2={472} y2={105} stroke="rgba(238,238,234,0.18)" strokeWidth={1} />
      <text x={480} y={102} className="fill-text font-ui text-[11px] tracking-[1.5px]">
        ACTIONS
      </text>
      <text x={480} y={115} className="fill-dim font-ui text-[8px] tracking-[0.3px]">
        top-level records
      </text>
      <text x={480} y={126} className="fill-dim font-ui text-[8px] tracking-[0.3px]">
        {'trigger: after:<stepId>'}
      </text>

      <line x1={462} y1={175} x2={472} y2={175} stroke="rgba(238,238,234,0.18)" strokeWidth={1} />
      <text x={480} y={172} className="fill-primary font-ui text-[11px] tracking-[1.5px]">
        FUNNEL.JSON
      </text>
      <text x={480} y={186} className="fill-dim font-ui text-[8px] tracking-[0.3px]">
        one flat typed spec
      </text>
      <text x={480} y={197} className="fill-dim font-ui text-[8px] tracking-[0.3px]">
        18 field types · 4 routing shapes
      </text>

      {/* 9. shape legend */}
      <DiamondGlyph x={484} y={222} r={4} />
      <text x={494} y={225} className="fill-quiet font-ui text-[7px] tracking-[0.3px]">
        action · event
      </text>
      <TriangleGlyph x={484} y={236} r={4} />
      <text x={494} y={239} className="fill-quiet font-ui text-[7px] tracking-[0.3px]">
        trigger · function
      </text>
    </svg>
  );
}
