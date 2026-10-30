import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, AlertTriangle, Mail, Phone, Globe } from "lucide-react";
import Reveal from "../../components/service/Reveal";

/* ---------- brand consistency check (overview page) ---------- */
const BRAND_ITEMS = [
  { id: "logo", label: "A professional logo in high-quality file formats", pts: 20 },
  { id: "colors", label: "Defined brand colors and fonts used everywhere", pts: 15 },
  { id: "gbp", label: "A verified, complete Google Business Profile", pts: 15 },
  { id: "nap", label: "Same name, address and phone on every listing", pts: 15 },
  { id: "social", label: "Social profiles with matching photos and bios", pts: 10 },
  { id: "email", label: "Email on your own domain (not a free address)", pts: 15 },
  { id: "card", label: "A business card or digital card you can share", pts: 5 },
  { id: "sig", label: "A branded email signature", pts: 5 },
];
const FIXES = {
  logo: "/branding/logo-design", colors: "/branding/logo-design", gbp: "/branding/profile-optimization", nap: "/branding/profile-optimization",
  social: "/branding/profile-optimization", email: "/branding/email-digital-cards", card: "/branding/email-digital-cards", sig: "/branding/email-digital-cards",
};

export function BrandCheck() {
  const [on, setOn] = useState(["social"]);
  const toggle = (id) => setOn((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]));
  const score = BRAND_ITEMS.filter((b) => on.includes(b.id)).reduce((a, b) => a + b.pts, 0);
  const verdict = score >= 85 ? "Strong: your brand looks the part" : score >= 50 ? "Getting there: a few gaps customers notice" : "Inconsistent: easy wins available";
  const missing = BRAND_ITEMS.filter((b) => !on.includes(b.id)).sort((a, b) => b.pts - a.pts).slice(0, 3);

  return (
    <Reveal className="ec-tool">
      <div className="ec-tool__panel">
        <h3>How consistent is your brand?</h3>
        <p>Tick what your business already has.</p>
        {BRAND_ITEMS.map((b, i) => (
          <button key={b.id} type="button" aria-pressed={on.includes(b.id)} style={{ "--i": i }}
            className={`ec-need ${on.includes(b.id) ? "is-on" : ""}`} onClick={() => toggle(b.id)}>
            <span className="ec-need__box"><Check size={13} /></span>{b.label}
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
            {missing.map((m) => <li key={m.id} className="is-warn"><span><AlertTriangle size={12} /></span><Link to={FIXES[m.id]} className="br-fix">{m.label}</Link></li>)}
          </ul>
        )}
        <p>Customers judge credibility in seconds. Closing these gaps is usually quick and inexpensive.</p>
      </div>
    </Reveal>
  );
}

/* ---------- email signature / digital card builder (email page) ---------- */
const THEMES = { green: ["#000000", "#2fa24f"], navy: ["#000000", "#2fa24f"], plum: ["#000000", "#2fa24f"], charcoal: ["#222", "#2fa24f"] };

export function SignatureBuilder() {
  const [name, setName] = useState("Jordan Lee");
  const [role, setRole] = useState("Founder");
  const [company, setCompany] = useState("Bright Leaf Bakery");
  const [theme, setTheme] = useState("green");
  const [ink, accent] = THEMES[theme];
  const slug = company.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "") || "yourbusiness";
  const first = name.trim().split(/\s+/)[0]?.toLowerCase().replace(/[^a-z]/g, "") || "you";
  const initials = company.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("") || "YB";

  return (
    <Reveal className="ec-tool">
      <div className="ec-tool__panel">
        <h3>Preview your email signature</h3>
        <p>Type your details and pick a color theme.</p>
        <label className="ws-input"><span>Your name</span><input value={name} maxLength={40} onChange={(e) => setName(e.target.value)} /></label>
        <label className="ws-input"><span>Job title</span><input value={role} maxLength={40} onChange={(e) => setRole(e.target.value)} /></label>
        <label className="ws-input"><span>Business name</span><input value={company} maxLength={40} onChange={(e) => setCompany(e.target.value)} /></label>
        <div className="ws-tld-seg br-theme-seg" role="group" aria-label="Color theme">
          {Object.keys(THEMES).map((t) => (
            <button key={t} type="button" aria-pressed={t === theme} className={t === theme ? "is-on" : ""} onClick={() => setTheme(t)}>
              <i className="br-dot" style={{ background: THEMES[t][1] }} />{t}
            </button>
          ))}
        </div>
      </div>
      <div className="ec-tool__result" aria-live="polite">
        <span className="ec-eyebrow">Your signature</span>
        <div className="br-sig" style={{ "--ink": ink, "--accent": accent }}>
          <span className="br-sig__mark">{initials}</span>
          <div>
            <b>{name || "Your Name"}</b>
            <small>{role || "Title"}, {company || "Your Business"}</small>
            <ul>
              <li><Mail size={12} /> {first}@{slug}.com</li>
              <li><Phone size={12} /> (555) 010-2040</li>
              <li><Globe size={12} /> {slug}.com</li>
            </ul>
          </div>
        </div>
        <p className="mc-small ec-left">A preview only. We build signatures that render correctly in popular email apps, and a matching digital business card with a QR code.</p>
      </div>
    </Reveal>
  );
}
