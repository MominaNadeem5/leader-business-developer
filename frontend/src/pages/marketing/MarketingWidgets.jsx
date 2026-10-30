import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import Reveal from "../../components/service/Reveal";

/* ---------- channel picker (overview page) ---------- */
const GOALS = [
  { id: "intent", label: "Reach people actively searching for what I sell", s: { google: 3, x: 0, meta: 1 } },
  { id: "local", label: "Get more calls and visits from local customers", s: { google: 3, x: 0, meta: 2 } },
  { id: "visual", label: "My product or service looks great in photos and video", s: { google: 1, x: 1, meta: 3 } },
  { id: "aware", label: "Build awareness with people who don't know me yet", s: { google: 1, x: 2, meta: 3 } },
  { id: "news", label: "Join timely conversations, news, events or trends", s: { google: 0, x: 3, meta: 1 } },
  { id: "b2b", label: "Reach professionals, tech or industry audiences", s: { google: 2, x: 3, meta: 1 } },
  { id: "retarget", label: "Win back people who visited my website", s: { google: 2, x: 1, meta: 3 } },
];
const CHANNELS = {
  google: { name: "Google Ads", to: "/marketing/google-ads", text: "Search, Maps, Shopping and YouTube. Best for capturing people who already want what you offer." },
  x: { name: "Twitter (X) Ads", to: "/marketing/twitter-ads", text: "Promoted posts in a real-time feed. Best for timely offers, events and engaged niche audiences." },
  meta: { name: "Meta Ads", to: "/marketing/meta-ads", text: "Facebook and Instagram. Best for visual products, awareness and precise audience targeting." },
};

export function ChannelPicker() {
  const [picked, setPicked] = useState(["local"]);
  const toggle = (id) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const score = (k) => GOALS.filter((g) => picked.includes(g.id)).reduce((a, g) => a + g.s[k], 0);
  const max = picked.length * 3 || 1;
  const rows = Object.keys(CHANNELS).map((k) => ({ k, pct: picked.length ? Math.round((score(k) / max) * 100) : 0 }));
  const best = picked.length ? rows.reduce((a, b) => (b.pct > a.pct ? b : a)).k : null;

  return (
    <Reveal className="ec-tool">
      <div className="ec-tool__panel">
        <h3>What do you want your ads to do?</h3>
        <p>Tick every goal that applies.</p>
        {GOALS.map((g, i) => (
          <button key={g.id} type="button" aria-pressed={picked.includes(g.id)} style={{ "--i": i }}
            className={`ec-need ${picked.includes(g.id) ? "is-on" : ""}`} onClick={() => toggle(g.id)}>
            <span className="ec-need__box"><Check size={13} /></span>{g.label}
          </button>
        ))}
      </div>
      <div className="ec-tool__result" aria-live="polite">
        <span className="ec-eyebrow">Where to start</span>
        <div className="ec-big ec-big--sm">{best ? CHANNELS[best].name : "Pick a goal"}</div>
        {rows.map(({ k, pct }) => (
          <div key={k} className={`ws-fit ${best === k ? "is-best" : ""}`}>
            <div className="ws-fit__head"><strong>{CHANNELS[k].name}</strong><span>{pct}%</span></div>
            <div className="ec-score ws-fit__bar"><div><i style={{ width: `${pct}%` }} /></div></div>
            <small>{CHANNELS[k].text}</small>
          </div>
        ))}
        {best && <Link to={CHANNELS[best].to} className="mc-option__cta ws-fit__cta">Explore {CHANNELS[best].name} <ArrowRight size={15} /></Link>}
        <p className="mc-small ec-left">Many businesses do best with two channels working together, for example search to capture demand and social to create it.</p>
      </div>
    </Reveal>
  );
}

/* ---------- ad budget estimator (channel pages) ---------- */
function Slider({ label, value, min, max, step = 1, prefix = "", unit = "", onChange }) {
  return (
    <label className="ec-slider">
      <span>{label}<b>{prefix}{value}{unit}</b></span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))}
        style={{ "--fill": `${((value - min) / (max - min)) * 100}%` }} />
    </label>
  );
}

/* defaults are rough illustrations for each channel, not benchmarks */
export function BudgetEstimator({ channel = "Google Ads", budget: b0 = 1500, cpc: c0 = 2.5, conv: v0 = 4, cpcMax = 10 }) {
  const [budget, setBudget] = useState(b0);
  const [cpc, setCpc] = useState(c0);
  const [conv, setConv] = useState(v0);
  const clicks = Math.round(budget / cpc);
  const leads = Math.round(clicks * (conv / 100));
  const cpl = leads ? budget / leads : 0;

  return (
    <Reveal className="ec-tool">
      <div className="ec-tool__panel">
        <h3>{channel} budget estimator</h3>
        <p>Move the sliders to see what a monthly budget could deliver.</p>
        <Slider label="Monthly ad budget" value={budget} min={300} max={10000} step={100} prefix="$" onChange={setBudget} />
        <Slider label="Average cost per click" value={cpc} min={0.25} max={cpcMax} step={0.25} prefix="$" onChange={setCpc} />
        <Slider label="Visitors who become leads" value={conv} min={0.5} max={15} step={0.5} unit="%" onChange={setConv} />
      </div>
      <div className="ec-tool__result" aria-live="polite">
        <span className="ec-eyebrow">Estimated each month</span>
        <div className="ec-big">{leads.toLocaleString()} <small>leads</small></div>
        <p className="ec-formula">${budget.toLocaleString()} ÷ ${cpc.toFixed(2)} per click = {clicks.toLocaleString()} clicks × {conv}% conversion</p>
        <div className="mk-kpis">
          <span><b>{clicks.toLocaleString()}</b><small>Clicks</small></span>
          <span><b>{cpl ? `$${cpl.toFixed(0)}` : "–"}</b><small>Cost per lead</small></span>
        </div>
        <p>Our job is to push both numbers the right way: lower cost per click through better targeting and ads, and a higher conversion rate through better landing pages.</p>
        <p className="mc-small ec-left">An illustration only. Real costs vary by industry, location, competition and season, and ad spend is paid directly to the platform.</p>
      </div>
    </Reveal>
  );
}
