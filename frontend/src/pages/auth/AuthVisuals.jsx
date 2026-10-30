/* Animated right-hand visuals for the auth pages.
   Inline SVG + CSS keyframes (Auth.css), transform/opacity only, no images or libraries.
   Each element's resting style is its final state, so prefers-reduced-motion just shows the end frame. */
import { Check, User, ShieldCheck, Building2, Landmark, Globe, BellRing, Mail, KeyRound, Sparkles } from "lucide-react";

const SPARKS = [
  [62, 92, 0], [300, 70, 0.8], [318, 250, 1.6], [48, 268, 2.2], [250, 318, 1.1],
];
/* Position lives on the <g> so the CSS transform on the path doesn't override it. */
const Spark = ({ x, y, d, cls }) => (
  <g transform={`translate(${x} ${y})`}>
    <path className={cls} style={{ "--d": `${d}s` }} d="M0-7 1.6-1.6 7 0 1.6 1.6 0 7-1.6 1.6-7 0-1.6-1.6Z" fill="#dcfce7" />
  </g>
);

/* ===== Login: shield + padlock that unlocks, then a "welcome back" card ===== */
export function LoginVisual() {
  return (
    <div className="au-v au-v--login">
      <svg className="au-v__svg" viewBox="0 0 360 360" focusable="false">
        <defs>
          <linearGradient id="lv-shield" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2fa24f" />
            <stop offset="1" stopColor="#2fa24f" />
          </linearGradient>
          <radialGradient id="lv-glow">
            <stop offset="0" stopColor="#2fa24f" stopOpacity=".45" />
            <stop offset="1" stopColor="#2fa24f" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle className="lv-glow" cx="180" cy="180" r="170" fill="url(#lv-glow)" />
        <g fill="none" stroke="#2fa24f" strokeWidth="1.5">
          <circle className="lv-ring" cx="180" cy="180" r="104" />
          <circle className="lv-ring lv-ring--2" cx="180" cy="180" r="104" />
          <circle className="lv-ring lv-ring--3" cx="180" cy="180" r="104" />
        </g>
        <g className="lv-orbit">
          <circle cx="180" cy="180" r="146" fill="none" stroke="rgba(255,255,255,.14)" strokeDasharray="2 8" />
          <circle cx="180" cy="34" r="5" fill="#2fa24f" />
          <circle cx="326" cy="180" r="3.5" fill="#2fa24f" />
          <circle cx="76" cy="283" r="4" fill="#dcfce7" />
        </g>

        <g className="lv-shield">
          <path d="M180 66 264 99v78c0 55-36 94-84 115-48-21-84-60-84-115V99Z" fill="url(#lv-shield)" />
          <path d="M180 82 250 109v68c0 46-29 79-70 98" fill="none" stroke="rgba(255,255,255,.28)" strokeWidth="3" strokeLinecap="round" />
          <path className="lv-shackle" d="M157 170v-22a23 23 0 0 1 46 0v22" fill="none" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" />
          <rect x="143" y="164" width="74" height="62" rx="13" fill="#ffffff" />
          <g className="lv-keyhole" fill="#000000">
            <circle cx="180" cy="189" r="8" />
            <rect x="176" y="191" width="8" height="19" rx="4" />
          </g>
          <path className="lv-check" d="M164 195l11 11 22-22" fill="none" stroke="#2fa24f" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {SPARKS.map(([x, y, d]) => <Spark key={`${x}-${y}`} x={x} y={y} d={d} cls="au-spark" />)}
      </svg>

      <div className="au-v__card lv-card">
        <span className="lv-card__avatar"><User size={18} /></span>
        <span>
          <b>Welcome back</b>
          <small><i /> Identity verified · Session secured</small>
        </span>
      </div>
      <div className="au-v__chip lv-chip"><ShieldCheck size={14} /> 2-step protected</div>
    </div>
  );
}

/* ===== Register: a profile card that builds itself, with floating feature badges.
   Plays a looping demo until the visitor starts typing, then mirrors their progress live. ===== */
const BADGES = [
  ["Form your LLC", Building2, "rv-b1"],
  ["Business banking", Landmark, "rv-b2"],
  ["Compliance alerts", BellRing, "rv-b3"],
  ["Website & brand", Globe, "rv-b4"],
];

export function RegisterVisual({ name = "", emailOk, passOk, terms }) {
  const live = Boolean(name.trim() || emailOk || passOk || terms);
  const shownName = live ? name.trim() : "Alex Morgan";
  const initials = shownName.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
  const steps = [["Email added", emailOk], ["Password secured", passOk], ["Terms accepted", terms]];
  const done = steps.filter(([, ok]) => ok).length;

  return (
    <div className={`au-v au-v--reg${live ? " is-live" : " is-demo"}`}>
      <svg className="au-v__svg" viewBox="0 0 360 360" focusable="false">
        <circle className="rv-halo" cx="180" cy="180" r="150" fill="none" stroke="rgba(255,255,255,.1)" strokeDasharray="1 7" strokeWidth="2" />
        <circle cx="180" cy="180" r="112" fill="none" stroke="rgba(47, 162, 79, .22)" />
        <g stroke="rgba(47, 162, 79, .28)" strokeDasharray="3 5" fill="none">
          <path className="rv-link" d="M124 112 74 46" />
          <path className="rv-link" d="M236 112 290 72" style={{ "--d": ".2s" }} />
          <path className="rv-link" d="M124 248 70 304" style={{ "--d": ".4s" }} />
          <path className="rv-link" d="M236 248 286 334" style={{ "--d": ".6s" }} />
        </g>
        {SPARKS.slice(0, 3).map(([x, y, d]) => <Spark key={`${x}-${y}`} x={x} y={y} d={d} cls="au-spark" />)}
      </svg>

      <div className="rv-card">
        <div className="rv-card__head">
          <span className="rv-avatar">
            <span className="rv-avatar__ring" />
            {initials ? <b>{initials}</b> : <User size={20} />}
          </span>
          <span className="rv-id">
            {shownName ? <b>{shownName}</b> : <i className="rv-skel" />}
            <small>New member profile</small>
          </span>
          <span className="rv-count">{live ? `${done}/3` : <Sparkles size={14} />}</span>
        </div>
        <div className="rv-progress"><span style={live ? { transform: `scaleX(${done / 3})` } : undefined} /></div>
        <ul className="rv-steps">
          {steps.map(([text, ok], i) => (
            <li key={text} className={ok ? "is-ok" : ""} style={{ "--i": i }}>
              <span className="rv-tick"><Check size={12} strokeWidth={3.5} /></span>
              {text}
            </li>
          ))}
        </ul>
      </div>

      {BADGES.map(([label, Icon, cls], i) => (
        <span key={label} className={`rv-badge ${cls}`} style={{ "--i": i }}>
          <span><Icon size={14} /></span>{label}
        </span>
      ))}
    </div>
  );
}

/* ===== Reset: key + rotating dial; reacts to the current step
   request → key waits · sent → envelope flies out · new → key turns the dial · done → unlocked ===== */
const TOASTS = {
  request: [KeyRound, "Secure reset link", "Expires in 30 minutes"],
  sent: [Mail, "Reset link sent", "Check your inbox"],
  new: [KeyRound, "Resetting access", "Choose a strong password"],
  done: [ShieldCheck, "Password updated", "You're good to go"],
};

export function ResetVisual({ step }) {
  const [Icon, title, sub] = TOASTS[step] || TOASTS.request;
  return (
    <div className="au-v au-v--reset" data-step={step}>
      <svg className="au-v__svg" viewBox="0 0 360 360" focusable="false">
        <defs>
          <radialGradient id="rs-glow">
            <stop offset="0" stopColor="#2fa24f" stopOpacity=".4" />
            <stop offset="1" stopColor="#2fa24f" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="rs-key" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2fa24f" />
            <stop offset="1" stopColor="#2fa24f" />
          </linearGradient>
        </defs>

        <circle className="rs-glow" cx="180" cy="180" r="160" fill="url(#rs-glow)" />
        <circle className="rs-dash" cx="180" cy="180" r="128" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="2" strokeDasharray="10 12" />

        {/* circular "reset" arrows, visible while the new password is being set */}
        <g className="rs-arrows" fill="none" stroke="#2fa24f" strokeWidth="5" strokeLinecap="round">
          <path d="M180 76a104 104 0 0 1 98 70" />
          <path d="M271 132l8 15 13-11" strokeLinejoin="round" />
          <path d="M180 284a104 104 0 0 1-98-70" />
          <path d="M89 228l-8-15-13 11" strokeLinejoin="round" />
        </g>

        {/* the dial with keyhole; turns when the key goes in */}
        <circle cx="180" cy="180" r="70" fill="rgba(0, 0, 0, .18)" transform="translate(0 8)" />
        <g className="rs-dial">
          <circle cx="180" cy="180" r="70" fill="#ffffff" />
          <g stroke="#dcfce7" strokeWidth="4" strokeLinecap="round">
            <path d="M180 120v10M180 230v10M120 180h10M230 180h10" />
          </g>
          <g className="rs-keyhole" fill="#000000">
            <circle cx="180" cy="172" r="12" />
            <path d="M173 178h14l5 28h-24Z" />
          </g>
        </g>
        <circle className="rs-done" cx="180" cy="180" r="70" fill="#2fa24f" />
        <path className="rs-check" d="M152 182l19 19 37-37" fill="none" stroke="#ffffff" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />

        {/* key */}
        <g className="rs-key">
          <circle cx="40" cy="300" r="22" fill="url(#rs-key)" />
          <circle cx="40" cy="300" r="9" fill="#000000" />
          <path d="M60 300h66v10h-10v10h-10v-10h-8v8h-10v-8H60Z" fill="url(#rs-key)" />
        </g>

        {/* envelope that flies out when the link is sent */}
        <g className="rs-env">
          <rect x="240" y="44" width="76" height="54" rx="9" fill="#ffffff" />
          <path d="M243 50l35 26 35-26" fill="none" stroke="#2fa24f" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="312" cy="48" r="11" fill="#2fa24f" />
          <path d="M307 48l4 4 6-7" fill="none" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <g className="rs-trail" fill="#dcfce7">
          <circle cx="214" cy="118" r="3" style={{ "--d": ".05s" }} />
          <circle cx="198" cy="136" r="2.4" style={{ "--d": ".12s" }} />
          <circle cx="186" cy="152" r="1.8" style={{ "--d": ".19s" }} />
        </g>

        {SPARKS.slice(1, 4).map(([x, y, d]) => <Spark key={`${x}-${y}`} x={x} y={y} d={d} cls="au-spark" />)}
      </svg>

      <div className="au-v__card rs-toast" key={step}>
        <span className="rs-toast__icon"><Icon size={17} /></span>
        <span><b>{title}</b><small>{sub}</small></span>
      </div>
    </div>
  );
}
