import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, X, ArrowRight, AlertTriangle } from "lucide-react";
import Reveal from "../../components/service/Reveal";

/* ---------- platform picker (overview page) ---------- */
const NEEDS = [
  { id: "sell", label: "Selling products online is my main goal", s: { wp: 0, shop: 3 } },
  { id: "content", label: "I'll publish lots of content (blog, guides, news)", s: { wp: 3, shop: 1 } },
  { id: "easy", label: "I want hosting, security and updates handled for me", s: { wp: 1, shop: 3 } },
  { id: "control", label: "I want full control and maximum flexibility", s: { wp: 3, shop: 1 } },
  { id: "services", label: "I offer services, bookings or appointments", s: { wp: 3, shop: 1 } },
  { id: "inventory", label: "I need inventory, shipping and POS tools", s: { wp: 1, shop: 3 } },
];
const PLATFORMS = {
  wp: { name: "WordPress", to: "/website/wordpress", text: "Flexible and content-friendly. Ideal for service businesses, blogs and sites that need custom features." },
  shop: { name: "Shopify", to: "/website/shopify", text: "An all-in-one hosted platform built for selling, with payments, inventory and shipping included." },
};

export function PlatformPicker() {
  const [picked, setPicked] = useState(["services"]);
  const toggle = (id) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const score = (k) => NEEDS.filter((n) => picked.includes(n.id)).reduce((a, n) => a + n.s[k], 0);
  const max = picked.length * 3 || 1;
  const rows = Object.keys(PLATFORMS).map((k) => ({ k, pct: picked.length ? Math.round((score(k) / max) * 100) : 0 }));
  const best = picked.length ? rows.reduce((a, b) => (b.pct > a.pct ? b : a)).k : null;

  return (
    <Reveal className="ec-tool">
      <div className="ec-tool__panel">
        <h3>What do you need from your website?</h3>
        <p>Tick everything that applies.</p>
        {NEEDS.map((n, i) => (
          <button key={n.id} type="button" aria-pressed={picked.includes(n.id)} style={{ "--i": i }}
            className={`ec-need ${picked.includes(n.id) ? "is-on" : ""}`} onClick={() => toggle(n.id)}>
            <span className="ec-need__box"><Check size={13} /></span>{n.label}
          </button>
        ))}
      </div>
      <div className="ec-tool__result" aria-live="polite">
        <span className="ec-eyebrow">Your likely best fit</span>
        <div className="ec-big ec-big--sm">{best ? PLATFORMS[best].name : "Pick a need"}</div>
        {rows.map(({ k, pct }) => (
          <div key={k} className={`ws-fit ${best === k ? "is-best" : ""}`}>
            <div className="ws-fit__head"><strong>{PLATFORMS[k].name}</strong><span>{pct}%</span></div>
            <div className="ec-score ws-fit__bar"><div><i style={{ width: `${pct}%` }} /></div></div>
            <small>{PLATFORMS[k].text}</small>
          </div>
        ))}
        {best && <Link to={PLATFORMS[best].to} className="mc-option__cta ws-fit__cta">Explore {PLATFORMS[best].name} setup <ArrowRight size={15} /></Link>}
        <p className="mc-small ec-left">Selling products but love WordPress? WooCommerce adds a store to WordPress. We'll help you weigh it up.</p>
      </div>
    </Reveal>
  );
}

/* ---------- domain name checker (domain page) ---------- */
const TLD_TIPS = {
  ".com": "The most recognized extension, and usually the first choice.",
  ".co": "Short and modern, but sometimes mistyped as .com.",
  ".net": "A solid alternative when the .com is taken.",
  ".org": "Best suited to nonprofits and organizations.",
  ".io": "Popular with tech startups.",
  ".shop": "Signals ecommerce at a glance.",
};

export function DomainChecker() {
  const [name, setName] = useState("Bright Leaf Bakery");
  const [tld, setTld] = useState(".com");
  const slug = name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9-]+/g, "");
  const checks = [
    { ok: slug.length > 0 && slug.length <= 15, label: "Short (15 characters or fewer)", warn: slug.length > 15 && slug.length <= 22 },
    { ok: !/-/.test(slug), label: "No hyphens" },
    { ok: !/\d/.test(slug), label: "No numbers (easier to say out loud)" },
    { ok: !/(.)\1/.test(slug), label: "No doubled letters that cause typos" },
    { ok: tld === ".com", label: "Uses the familiar .com extension", warn: tld !== ".com" },
  ];
  const score = checks.filter((c) => c.ok).length;
  const ideas = slug ? [`${slug}${tld}`, `get${slug}.com`, `${slug}hq.com`, `${slug.slice(0, 12)}co.com`] : [];

  return (
    <Reveal className="ec-tool">
      <div className="ec-tool__panel">
        <h3>Test a domain name idea</h3>
        <p>Type your business name and pick an extension.</p>
        <label className="ws-input">
          <span>Business or brand name</span>
          <input value={name} maxLength={40} onChange={(e) => setName(e.target.value)} placeholder="e.g. Bright Leaf Bakery" />
        </label>
        <div className="ws-tld-seg" role="group" aria-label="Domain extension">
          {Object.keys(TLD_TIPS).map((t) => (
            <button key={t} type="button" aria-pressed={t === tld} className={t === tld ? "is-on" : ""} onClick={() => setTld(t)}>{t}</button>
          ))}
        </div>
        <p className="mc-small ec-left">{TLD_TIPS[tld]}</p>
      </div>
      <div className="ec-tool__result" aria-live="polite">
        <span className="ec-eyebrow">Your domain</span>
        <div className="ws-domain-out">{slug || "yourname"}<em>{tld}</em></div>
        <ul className="ws-checks">
          {checks.map((c) => (
            <li key={c.label} className={c.ok ? "is-ok" : c.warn ? "is-warn" : "is-no"}>
              <span>{c.ok ? <Check size={12} /> : c.warn ? <AlertTriangle size={12} /> : <X size={12} />}</span>{c.label}
            </li>
          ))}
        </ul>
        <p><b>{score}/5</b> best-practice checks passed.</p>
        {ideas.length > 0 && <div className="ws-ideas"><small>Other ideas to check:</small>{ideas.slice(1).map((d) => <span key={d}>{d}</span>)}</div>}
        <p className="mc-small ec-left">This checks naming best practices only, not availability. We check live availability and trademark conflicts before registering.</p>
      </div>
    </Reveal>
  );
}

/* ---------- site health check (maintenance page) ---------- */
const HEALTH = [
  { id: "updates", label: "Software, themes and plugins updated this month", pts: 20 },
  { id: "backups", label: "Automatic backups stored off-site", pts: 20 },
  { id: "ssl", label: "SSL certificate active (https everywhere)", pts: 15 },
  { id: "security", label: "Security scanning and firewall in place", pts: 15 },
  { id: "uptime", label: "Uptime monitoring with alerts", pts: 10 },
  { id: "speed", label: "Pages load quickly on mobile", pts: 10 },
  { id: "forms", label: "Contact forms tested recently", pts: 5 },
  { id: "links", label: "No broken links or outdated content", pts: 5 },
];

export function HealthCheck() {
  const [on, setOn] = useState(["ssl"]);
  const toggle = (id) => setOn((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]));
  const score = HEALTH.filter((h) => on.includes(h.id)).reduce((a, h) => a + h.pts, 0);
  const verdict = score >= 85 ? "Healthy: keep it that way" : score >= 50 ? "At risk: a few important gaps" : "Vulnerable: needs attention soon";
  const missing = HEALTH.filter((h) => !on.includes(h.id)).slice(0, 3);

  return (
    <Reveal className="ec-tool">
      <div className="ec-tool__panel">
        <h3>Quick website health check</h3>
        <p>Tick what's true for your website today.</p>
        {HEALTH.map((h, i) => (
          <button key={h.id} type="button" aria-pressed={on.includes(h.id)} style={{ "--i": i }}
            className={`ec-need ${on.includes(h.id) ? "is-on" : ""}`} onClick={() => toggle(h.id)}>
            <span className="ec-need__box"><Check size={13} /></span>{h.label}
          </button>
        ))}
      </div>
      <div className="ec-tool__result" aria-live="polite">
        <div className="ec-ring" style={{ "--p": score / 100 }}>
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r="52" className="ec-ring__track" />
            <circle cx="60" cy="60" r="52" className="ec-ring__fill" pathLength="1" />
          </svg>
          <strong>{score}<small>/100</small></strong>
        </div>
        <h3>{verdict}</h3>
        {missing.length > 0 && (
          <ul className="ws-checks">
            {missing.map((m) => <li key={m.id} className="is-warn"><span><AlertTriangle size={12} /></span>{m.label}</li>)}
          </ul>
        )}
        <p>A maintenance plan takes care of all of these for you, every month.</p>
      </div>
    </Reveal>
  );
}
