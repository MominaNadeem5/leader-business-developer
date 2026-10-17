/* One small animated scene per step (inline SVG, transform/opacity only; keyframes in GetStarted.css).
   Each scene remounts when the step changes, so its animation replays. Resting styles are final frames,
   so prefers-reduced-motion shows a still image. */

const Svg = ({ children }) => (
  <svg className="gv" viewBox="0 0 240 160" aria-hidden="true" focusable="false">{children}</svg>
);
const d = (s) => ({ "--d": `${s}s` });

/* 1 · Business: buildings rise, windows light up, flag waves */
function BusinessScene() {
  const windows = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 2; c++) windows.push([108 + c * 18, 56 + r * 16, (r * 2 + c) * 0.35]);
  return (
    <Svg>
      <path d="M24 140h192" stroke="rgba(255,255,255,.25)" strokeWidth="2" strokeLinecap="round" />
      <rect className="gv-rise" style={d(0.1)} x="42" y="84" width="44" height="56" rx="5" fill="#2fa24f" />
      <rect className="gv-rise" style={d(0.3)} x="96" y="44" width="52" height="96" rx="5" fill="#3ebf5f" />
      <rect className="gv-rise" style={d(0.5)} x="158" y="98" width="40" height="42" rx="5" fill="#1f7a3a" />
      <g fill="#eafff0">
        {windows.map(([x, y, delay]) => <rect key={`${x}-${y}`} className="gv-win" style={d(delay + 0.8)} x={x} y={y} width="10" height="8" rx="2" />)}
        <rect className="gv-win" style={d(1.1)} x="52" y="96" width="10" height="8" rx="2" />
        <rect className="gv-win" style={d(1.5)} x="68" y="96" width="10" height="8" rx="2" />
        <rect className="gv-win" style={d(1.3)} x="168" y="108" width="20" height="8" rx="2" />
      </g>
      <rect x="114" y="122" width="16" height="18" rx="3" fill="#0a3a2a" />
      <path d="M122 44V18" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      <path className="gv-flag" d="M123 19h22l-6 7 6 7h-22Z" fill="#c9a227" />
    </Svg>
  );
}

/* 2 · Location: spinning dotted globe and a pin that drops with a ripple */
const LAND = [[0, 1, 1, 0, 0, 1, 1, 0], [1, 1, 1, 0, 1, 1, 1, 1], [1, 1, 0, 0, 1, 1, 1, 1], [0, 1, 0, 0, 0, 1, 1, 0], [0, 1, 1, 0, 0, 0, 1, 0], [0, 0, 1, 0, 0, 0, 1, 1], [0, 0, 1, 0, 0, 0, 0, 1]];
function LocationScene() {
  const dots = [];
  LAND.forEach((row, r) => {
    for (let c = 0; c < 24; c++) if (row[c % 8]) dots.push([60 + c * 13, 46 + r * 12]);
  });
  return (
    <Svg>
      <defs><clipPath id="gv-globe-clip"><circle cx="112" cy="84" r="52" /></clipPath></defs>
      <circle cx="112" cy="84" r="52" fill="#0f4d37" stroke="#5bbb5b" strokeWidth="2" />
      <g clipPath="url(#gv-globe-clip)">
        <g className="gv-globe" fill="#5bbb5b">
          {dots.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="3" />)}
        </g>
        <g fill="none" stroke="rgba(255,255,255,.14)">
          <ellipse cx="112" cy="84" rx="52" ry="18" />
          <ellipse cx="112" cy="84" rx="22" ry="52" />
        </g>
      </g>
      <ellipse className="gv-ripple" cx="160" cy="74" rx="16" ry="5" fill="none" stroke="#c9f5d6" strokeWidth="2" />
      <g transform="translate(160 26)">
        <g className="gv-pin">
          <path d="M0 0C-10 0-17 7-17 17c0 13 17 31 17 31s17-18 17-31C17 7 10 0 0 0Z" fill="#c9a227" />
          <circle cx="0" cy="17" r="6" fill="#fff" />
        </g>
      </g>
    </Svg>
  );
}

/* 3 · Services: a cursor picks tiles from a grid and each one gets ticked */
const TILES = [0, 1, 2, 3, 4, 5].map((k) => [52 + (k % 3) * 48, 34 + Math.floor(k / 3) * 48]);
const PICKED = { 0: "gv-sel1", 4: "gv-sel2", 2: "gv-sel3" };
function ServicesScene() {
  return (
    <Svg>
      {TILES.map(([x, y], k) => (
        <g key={k}>
          <rect className="gv-tile" style={d(k * 0.07)} x={x} y={y} width="40" height="40" rx="10" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.22)" />
          <rect x={x + 10} y={y + 12} width="20" height="4" rx="2" fill="rgba(255,255,255,.35)" />
          <rect x={x + 10} y={y + 22} width="14" height="4" rx="2" fill="rgba(255,255,255,.2)" />
          {PICKED[k] && (
            <g className={PICKED[k]}>
              <rect x={x} y={y} width="40" height="40" rx="10" fill="rgba(47,162,79,.35)" stroke="#5bbb5b" strokeWidth="2" />
              <circle cx={x + 36} cy={y + 4} r="9" fill="#2fa24f" stroke="#0a3a2a" strokeWidth="2" />
              <path d={`M${x + 32} ${y + 4}l3 3 5-6`} fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          )}
        </g>
      ))}
      <g className="gv-cursor">
        <path d="M0 0v20l5-5 4 9 4-2-4-9h7Z" fill="#fff" stroke="#0a3a2a" strokeWidth="1.5" strokeLinejoin="round" />
      </g>
    </Svg>
  );
}

/* 4 · Requirements: a brief writes itself line by line while a pencil works */
const LINES = [[68, 0.3], [58, 0.7], [66, 1.1], [44, 1.5], [54, 1.9]];
function RequirementsScene() {
  return (
    <Svg>
      <rect className="gv-sheet" x="70" y="16" width="100" height="128" rx="9" fill="#fff" />
      <rect x="84" y="30" width="44" height="8" rx="4" fill="#2fa24f" />
      {LINES.map(([w, delay], i) => (
        <rect key={i} className="gv-line" style={d(delay)} x="84" y={50 + i * 16} width={w} height="6" rx="3" fill="#cfe3d6" />
      ))}
      <g className="gv-pen-y">
        <g className="gv-pen-x">
          <g transform="translate(150 40) rotate(40)">
            <rect x="-4" y="-30" width="8" height="26" rx="2" fill="#c9a227" />
            <rect x="-4" y="-34" width="8" height="6" rx="2" fill="#f3d36b" />
            <path d="M-4-4h8L0 6Z" fill="#0a3a2a" />
          </g>
        </g>
      </g>
    </Svg>
  );
}

/* 5 · Budget: bars grow into a rising chart, a coin spins in */
const BARS = [[58, 30], [88, 52], [118, 74], [148, 98]];
function BudgetScene() {
  return (
    <Svg>
      <path d="M44 136h150" stroke="rgba(255,255,255,.25)" strokeWidth="2" strokeLinecap="round" />
      {BARS.map(([x, h], i) => (
        <rect key={x} className="gv-bar" style={d(0.1 + i * 0.15)} x={x} y={136 - h} width="22" height={h} rx="5" fill={i === 3 ? "#5bbb5b" : "#2fa24f"} opacity={0.55 + i * 0.15} />
      ))}
      <path className="gv-trend" d="M66 98 96 80l30-18 30-26" fill="none" stroke="#c9f5d6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 5" />
      <g transform="translate(196 40)">
        <g className="gv-coin">
          <circle r="17" fill="#c9a227" />
          <circle r="12" fill="none" stroke="#f3d36b" strokeWidth="2" />
          <path d="M3-7h-5a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-6M0-10v20" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      </g>
    </Svg>
  );
}

/* 6 · Contact: phone rings, a chat bubble types, an email slides in */
function ContactScene() {
  return (
    <Svg>
      <g className="gv-phone">
        <rect x="46" y="34" width="46" height="84" rx="10" fill="#fff" />
        <rect x="52" y="44" width="34" height="58" rx="4" fill="#e6f3ea" />
        <circle cx="69" cy="110" r="3.5" fill="#cfe3d6" />
        <circle cx="69" cy="72" r="10" fill="#2fa24f" />
        <path d="M64 70c1 4 4 7 8 8l2-2-3-2-1 1c-1-1-2-2-3-3l1-1-2-3Z" fill="#fff" />
      </g>
      <g fill="none" stroke="#5bbb5b" strokeWidth="3" strokeLinecap="round">
        <path className="gv-wave" style={d(0)} d="M100 62a14 14 0 0 1 0 22" />
        <path className="gv-wave" style={d(0.3)} d="M108 54a26 26 0 0 1 0 38" />
      </g>
      <g className="gv-bubble">
        <path d="M130 30h74a10 10 0 0 1 10 10v26a10 10 0 0 1-10 10h-56l-12 10v-10h-6a10 10 0 0 1-10-10V40a10 10 0 0 1 10-10Z" fill="#2fa24f" />
        <circle className="gv-dot" style={d(0)} cx="152" cy="53" r="4.5" fill="#fff" />
        <circle className="gv-dot" style={d(0.15)} cx="167" cy="53" r="4.5" fill="#fff" />
        <circle className="gv-dot" style={d(0.3)} cx="182" cy="53" r="4.5" fill="#fff" />
      </g>
      <g className="gv-mail">
        <rect x="144" y="98" width="62" height="42" rx="7" fill="#fff" />
        <path d="M147 102l28 20 28-20" fill="none" stroke="#2fa24f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </Svg>
  );
}

/* 7 · Review: checklist ticks in order while a magnifier scans it */
function ReviewScene() {
  return (
    <Svg>
      <rect x="74" y="20" width="92" height="126" rx="9" fill="#fff" />
      <rect x="98" y="12" width="44" height="16" rx="6" fill="#2fa24f" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle cx="94" cy={50 + i * 24} r="7" fill="none" stroke="#cfe3d6" strokeWidth="2" />
          <g className={`gv-check gv-check--${i}`}>
            <circle cx="94" cy={50 + i * 24} r="8" fill="#2fa24f" />
            <path d={`M90 ${50 + i * 24}l3 3 5-6`} fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <rect x="108" y={47 + i * 24} width={i % 2 ? 36 : 46} height="6" rx="3" fill="#cfe3d6" />
        </g>
      ))}
      <g className="gv-lens">
        <circle cx="168" cy="54" r="15" fill="rgba(201,245,214,.18)" stroke="#c9a227" strokeWidth="5" />
        <path d="M179 65l13 13" stroke="#c9a227" strokeWidth="7" strokeLinecap="round" />
      </g>
    </Svg>
  );
}

const SCENES = [BusinessScene, LocationScene, ServicesScene, RequirementsScene, BudgetScene, ContactScene, ReviewScene];

export function StepScene({ step }) {
  const Scene = SCENES[step - 1] || BusinessScene;
  return <Scene key={step} />;
}

/* Confirmation: a check that pops in with a burst of confetti */
const CONFETTI = [
  [-70, -46, "#2fa24f", 0], [-46, -70, "#c9a227", 0.04], [0, -80, "#5bbb5b", 0.02], [48, -68, "#c9a227", 0.06], [74, -40, "#2fa24f", 0.03],
  [80, 6, "#5bbb5b", 0.05], [62, 50, "#c9a227", 0.02], [-60, 52, "#5bbb5b", 0.06], [-82, 4, "#c9a227", 0.01], [20, 70, "#2fa24f", 0.04],
];
export function SuccessScene() {
  return (
    <svg className="gv gv--success" viewBox="0 0 240 160" aria-hidden="true" focusable="false">
      <g transform="translate(120 80)">
        {CONFETTI.map(([x, y, fill, delay], i) => (
          <rect key={i} className="gv-confetti" style={{ "--x": `${x}px`, "--y": `${y}px`, "--r": `${i * 47}deg`, "--d": `${0.25 + delay}s` }} x="-4" y="-2" width="8" height="4" rx="1.5" fill={fill} />
        ))}
        <circle className="gv-halo" r="44" fill="rgba(47,162,79,.14)" />
        <g className="gv-badge">
          <circle r="34" fill="#23843f" />
          <path d="M-14 1l9 9 19-20" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
    </svg>
  );
}
