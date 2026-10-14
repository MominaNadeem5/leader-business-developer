import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Check, ChevronDown, ArrowRight, Star, ShieldCheck, Phone, Mail, Clock, MessageSquare,
  FileText, BadgeCheck, Bell, Landmark, MapPin, Building2, Flag, RefreshCw, Mic,
  ClipboardList, CalendarCheck, Home, Utensils, ShoppingBag, LayoutGrid,
  AlertTriangle, Eye, RotateCcw, Sparkles, Layers,
} from "lucide-react";
import Button from "../../../components/common/Button";
import useInView from "../../../hooks/useInView";
import "./Compliance.css";

/* ---- EDIT THESE ---- */
const TRUSTPILOT_URL = "https://www.trustpilot.com/review/leaderbusiness.com"; // your real Trustpilot page
const TRUST_LABEL = "Excellent"; // keep only if it matches your real rating
const ROUTES = {
  plans: "#cp-plans",
  start: "/get-started?service=compliance",
  annual: "/business/annual-report",
  licenses: "/business-licenses",
  attorney: "/contact",
};
const HOURS = ["Mon–Fri: 9 a.m.–6 p.m.", "Weekends: closed"]; // placeholder hours
const contactInfo = { phone: "(855) 787-1221", email: "support@leaderbusiness.com" };

/* Prices are placeholders: replace with your real pricing (or set price to null to hide) */
const PLANS = [
  {
    name: "Filings Only",
    tag: "Stay ahead of fines and lapses by keeping every state filing and business tax on track.",
    price: 149,
    cta: "Get compliant now",
    featured: false,
    features: [
      "Initial report plus automatic yearly report filing wherever your state requires it",
      "Amendments filed with the Secretary of State when your business details change",
      "Tax preparation handled by independent tax professionals",
      "Live status updates as soon as your state office confirms a filing",
      "Alerts built around your own filing calendar",
      "AI-assisted meeting minutes, turned into proper records",
      "Attorney-monitored rule changes, shared with you in plain language",
      "Hands-on help from a compliance specialist",
    ],
  },
  {
    name: "Filings + Licenses",
    tag: "Everything in Filings Only, plus a full map of the licenses and permits your business needs.",
    price: 249,
    cta: "Get compliant now",
    featured: true,
    features: [
      "Everything in Filings Only",
      "A personal summary of the federal, state and local licenses and permits you must hold",
      "A clear explanation of what each one is and why it matters",
      "Direct links to every application with simplified instructions",
      "One place to upload, view and share your licenses",
      "AI-assisted scanning of government sources for changes to your list",
      "Early warnings before anything expires or changes",
      "Specialist support for both filings and licensing",
    ],
  },
  {
    name: "Compliance Manager",
    tag: "A dedicated person who handles your compliance from the first review to the final filing.",
    price: null,
    cta: "Talk to a manager",
    featured: false,
    features: [
      "Everything in Filings + Licenses",
      "A trained, dedicated manager who runs your compliance for you",
      "Unlimited phone and email access to that manager",
      "Regular check-ins that catch gaps and risks early",
      "An opening review of your standing, a plan, and full filing execution",
      "Progress updates on every action taken for you",
      "Fast turnaround when an issue pops up",
      "Create, sign and manage documents online",
      "Extras recommended when needed, such as good standing certificates and amendments",
    ],
  },
];

const strip = ["Annual reports on time", "Amendments filed for you", "License renewals tracked", "Alerts before deadlines", "Attorney-watched rule changes", "Meeting minutes made easy", "Real specialists on call"];

const reasons = [
  { icon: <Landmark size={24} />, title: "Compliance, start to finish", text: "Yearly reports, amendments and reminders in one place, so penalties never sneak up on you." },
  { icon: <ShieldCheck size={24} />, title: "Filing support you can lean on", text: "Backed by an accuracy promise and a specialist who knows your state's rules." },
  { icon: <Eye size={24} />, title: "Always in the loop", text: "Our attorneys watch rule changes and we keep an eye on your state's status updates for you." },
];

const duties = [
  { icon: <FileText size={20} />, title: "Annual reports", text: "A yearly filing that confirms your business details with the state. Windows and deadlines differ everywhere, so tracking them matters.", tip: "Miss it and late fees can follow." },
  { icon: <RefreshCw size={20} />, title: "Amendments", text: "Changed your name, address or how the company is managed? The Secretary of State needs to hear about it.", tip: "Keeps your public record accurate." },
  { icon: <BadgeCheck size={20} />, title: "License renewals", text: "Know which licenses and permits you hold, and renew each one before it lapses.", tip: "Avoid interruptions to your operations." },
  { icon: <Mic size={20} />, title: "Meeting minutes", text: "An AI-powered tool turns your discussion notes into official records for your files.", tip: "Clean records with almost no effort." },
];

const steps = [
  { icon: <ClipboardList size={22} />, title: "Tell us about your business", text: "Share your structure and where you operate so everything we prepare fits your situation." },
  { icon: <FileText size={22} />, title: "Get a tailored plan", text: "Receive a custom list of filings, and with the licensing plan, a personal license report with renewal reminders." },
  { icon: <CalendarCheck size={22} />, title: "Stay covered all year", text: "Alerts and attorney-reviewed updates tell you when to file, renew or update, plus a tool for meeting minutes." },
];

const help = [
  { icon: <Clock size={24} />, title: "Save time", text: "We know the rules in every state, so you skip hours of digging through legal requirements." },
  { icon: <AlertTriangle size={24} />, title: "Dodge penalties", text: "Late filings, mistakes and expired licenses are costly. We keep you on schedule and file on your behalf." },
  { icon: <Bell size={24} />, title: "Stay informed", text: "Rules keep changing. Attorney-reviewed notices keep you up to date on deadlines and renewals." },
];


const reportFields = [
  ["Business name", "Northwind Studio LLC"],
  ["Business address", "214 Market Street"],
  ["Managers / officers", "A. Rahman, S. Khan"],
  ["Registered agent", "Leader Agent Services"],
];

const levels = [
  { icon: <Flag size={18} />, name: "Federal", text: "For regulated activities such as certain industries, imports or special trades.", eg: "Industry-specific federal licenses" },
  { icon: <Building2 size={18} />, name: "State", text: "Professional licenses, seller's permits and state tax registrations.", eg: "Seller's permit, state tax account" },
  { icon: <MapPin size={18} />, name: "County", text: "Local health, building or operating approvals set by your county.", eg: "Health or building permits" },
  { icon: <Landmark size={18} />, name: "City", text: "General business licenses and neighborhood-level rules.", eg: "City business license" },
];

const permits = [
  { icon: <Home size={22} />, title: "Home occupation permit", text: "If you run the business from your residence." },
  { icon: <LayoutGrid size={22} />, title: "Zoning permit", text: "Confirms your location is allowed to host the business." },
  { icon: <ShoppingBag size={22} />, title: "Seller's permit", text: "Lets you collect sales tax on taxable goods." },
  { icon: <Utensils size={22} />, title: "Health permit", text: "Needed for food service to meet safety standards." },
];

const faqs = [
  ["When is my annual report due?", "Every state sets its own filing window and deadline, and filing outside it can bring late fees. Some states open the window months before your business anniversary, so check yours early. Our reminders by email and text also cover annual reports and business income tax filings."],
  ["What are filing fees?", "Filing fees are the government charges for submitting a document. They can include required state fees along with optional extras such as expedited handling, name reservation or walk-in service. Fees differ by state and by entity type."],
  ["What information do I need to file my annual report?", "LLCs usually need the current company name and address, the registered agent and the managers. Corporations typically list officers and directors, and sometimes stock details. We help you work out exactly what your state wants for your business type."],
  ["Do I need licenses for my business?", "Almost certainly, starting with a general business license that covers some local, county, state and federal rules. Depending on your industry, location and activities, you may need more permits on top of it. Many businesses end up holding several."],
  ["When do I need a business license?", "Before you open. Getting licensed first protects you from penalties, and we help you find out which ones apply so you can operate legally from day one, then keep track of renewals."],
  ["Who issues business licenses?", "Several levels of government do: city, county, state and federal. Depending on your business you may apply to more than one agency. We identify the licenses you need at each level and link you to the right applications."],
  ["Do all businesses need licenses?", "Most do, and often more than one. What you need depends on your industry, location and activities, which makes it tricky to figure out alone. A personalized license report removes the guesswork."],
  ["What are some common licenses and permits?", "Common examples include a home occupation permit for businesses run from a residence, a zoning permit for local land-use rules, a seller's permit for collecting sales tax, and a health permit for food service. We help pinpoint the ones that apply to you."],
  ["How do I stay compliant with licenses over time?", "Track expiration dates, renew on time and watch for rule changes that affect your business. Our subscription sends renewal reminders and change notices, and keeps your licenses in one organized place."],
  ["What is the difference between the plans?", "Filings Only covers your state filing duties: reports, amendments, alerts and meeting minutes. Filings + Licenses adds a custom license report with application help and renewal tracking. The Compliance Manager plan gives you a dedicated person who runs everything for you."],
];

function Reveal({ children, className = "" }) {
  const [ref, inView] = useInView();
  return <div ref={ref} className={`cp-reveal ${inView ? "is-in" : ""} ${className}`}>{children}</div>;
}

/* Hero card: items tick off one by one while the gauge fills up */
const RADAR = [
  { icon: <FileText size={16} />, label: "Annual report", note: "Filed" },
  { icon: <RefreshCw size={16} />, label: "Address amendment", note: "Accepted" },
  { icon: <BadgeCheck size={16} />, label: "City license", note: "Renewed" },
  { icon: <Mic size={16} />, label: "Meeting minutes", note: "Saved" },
];

function RadarCard() {
  const [done, setDone] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setDone((n) => (n >= RADAR.length + 1 ? 0 : n + 1)), 1300);
    return () => clearInterval(id);
  }, []);
  const shown = Math.min(done, RADAR.length);
  const pct = Math.round((shown / RADAR.length) * 100);
  return (
    <div className="cp-radar">
      <div className="cp-radar__top">
        <div className="cp-radar__ring" style={{ "--cp-p": pct }}><span>{pct}%</span></div>
        <div>
          <small>Compliance health</small>
          <strong>{pct === 100 ? "In good standing" : "Working on it…"}</strong>
        </div>
        <span className={`cp-radar__pill ${pct === 100 ? "is-ok" : ""}`}><i />{pct === 100 ? "ALL CLEAR" : "IN PROGRESS"}</span>
      </div>
      <ul className="cp-radar__list">
        {RADAR.map((r, i) => (
          <li key={r.label} className={i < shown ? "is-done" : i === shown ? "is-now" : ""}>
            <span className="cp-radar__icon">{r.icon}</span>
            <b>{r.label}</b>
            <em>{i < shown ? <><Check size={12} /> {r.note}</> : i === shown ? "Due soon" : "Upcoming"}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Plans() {
  const [open, setOpen] = useState([false, false, false]);
  const toggle = (i) => setOpen((o) => o.map((v, k) => (k === i ? !v : v)));
  return (
    <div className="cp-plans">
      {PLANS.map((p, i) => (
        <article key={p.name} className={`cp-plan ${p.featured ? "is-featured" : ""}`}>
          {p.featured && <span className="cp-plan__badge"><Sparkles size={13} /> Most popular</span>}
          {i === 2 && <span className="cp-plan__eyebrow">FULL SERVICE</span>}
          <h3>{p.name}</h3>
          <p className="cp-plan__tag">{p.tag}</p>
          {p.price !== null ? (
            <div className="cp-plan__price"><b>${p.price}</b><span>/yr</span><small>Renews automatically. Cancel anytime. Government fees are separate.</small></div>
          ) : (
            <div className="cp-plan__price"><b className="cp-plan__call">Custom</b><small>Talk to us about your needs.</small></div>
          )}
          {p.price !== null ? (
            <Button to={ROUTES.start}>{p.cta} <ArrowRight size={16} /></Button>
          ) : (
            <a className="cp-plan__phone" href={`tel:${contactInfo.phone}`}><Phone size={16} /> {contactInfo.phone}</a>
          )}
          <button type="button" className={`cp-plan__toggle ${open[i] ? "is-open" : ""}`} onClick={() => toggle(i)} aria-expanded={open[i]}>
            {open[i] ? "Hide features" : "View features"} <ChevronDown size={16} />
          </button>
          <div className={`cp-plan__features ${open[i] ? "is-open" : ""}`}>
            <ul>{p.features.map((f) => <li key={f}><Check size={14} />{f}</li>)}</ul>
          </div>
        </article>
      ))}
    </div>
  );
}

function Duties() {
  const [i, setI] = useState(0);
  const d = duties[i];
  return (
    <div className="cp-duties">
      <div className="cp-duties__tabs" role="tablist">
        {duties.map((x, k) => (
          <button type="button" role="tab" aria-selected={k === i} key={x.title} className={k === i ? "is-active" : ""} onClick={() => setI(k)}>
            {x.icon}<span>{x.title}</span>
          </button>
        ))}
      </div>
      <div className="cp-duties__panel" key={i}>
        <span className="cp-duties__icon">{d.icon}</span>
        <h3>{d.title}</h3>
        <p>{d.text}</p>
        <em><Check size={14} /> {d.tip}</em>
      </div>
    </div>
  );
}

const ARC = 251.33; /* length of the gauge arc */

const selfCheck = [
  { icon: <FileText size={20} />, title: "Annual report filed", text: "This year's report is submitted on time.", fix: "Let us file your annual report automatically each year." },
  { icon: <RefreshCw size={20} />, title: "State records are current", text: "Name, address and managers match what the state has.", fix: "File an amendment so your public record is accurate." },
  { icon: <BadgeCheck size={20} />, title: "I know my licenses", text: "I know every license and permit my business needs.", fix: "Get a custom report of the licenses you need." },
  { icon: <Bell size={20} />, title: "Renewals are tracked", text: "Expiry dates are saved and I get reminders.", fix: "Turn on renewal reminders so nothing lapses." },
  { icon: <Mic size={20} />, title: "Meeting records kept", text: "Decisions are written up and stored safely.", fix: "Use the meeting minutes tool to create records fast." },
  { icon: <CalendarCheck size={20} />, title: "Next deadlines known", text: "I can name my filing dates for the coming year.", fix: "Get a personal filing calendar with alerts." },
];

function levelFor(n, total) {
  if (n === 0) return { tone: "idle", label: "Let's start", text: "Flip the switches that match your business and watch your score move." };
  if (n <= 2) return { tone: "bad", label: "At risk", text: "Several duties are uncovered. Missing them can mean fines or lost standing." };
  if (n < total - 1) return { tone: "warn", label: "Getting there", text: "You have the basics. A few gaps are still worth closing soon." };
  if (n === total - 1) return { tone: "good", label: "Almost there", text: "Just one gap left. Close it and you are fully covered." };
  return { tone: "ok", label: "In good standing", text: "Everything is covered. Keep it tracked so it stays that way." };
}

function SelfCheck() {
  const [on, setOn] = useState([]);
  const toggle = (i) => setOn((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]));
  const total = selfCheck.length;
  const n = on.length;
  const pct = Math.round((n / total) * 100);
  const lv = levelFor(n, total);
  const gap = selfCheck.findIndex((_, i) => !on.includes(i));
  return (
    <div className={`cp-scan is-${lv.tone}`}>
      <div className="cp-scan__meter">
        <div className="cp-scan__gauge">
          <svg viewBox="0 0 200 116" role="img" aria-label={`Compliance score ${pct} percent`}>
            <path className="cp-scan__track" d="M20 100 A80 80 0 0 1 180 100" />
            <path className="cp-scan__arc" d="M20 100 A80 80 0 0 1 180 100" style={{ strokeDashoffset: ARC * (1 - pct / 100) }} />
            <g className="cp-scan__needle" style={{ transform: `rotate(${pct * 1.8 - 90}deg)` }}>
              <line x1="100" y1="100" x2="100" y2="36" />
              <circle cx="100" cy="100" r="7" />
            </g>
          </svg>
          <div className="cp-scan__score"><b>{pct}%</b></div>
        </div>
        <span className="cp-scan__label">{lv.label}</span>
        <p className="cp-scan__text">{lv.text}</p>
        <div className="cp-scan__next" key={gap}>
          {gap === -1 ? (
            <><Check size={16} /> <span>All six areas covered.</span></>
          ) : n === 0 ? (
            <><Sparkles size={16} /> <span>{n} of {total} covered so far.</span></>
          ) : (
            <><ArrowRight size={16} /> <span><b>Next step:</b> {selfCheck[gap].fix}</span></>
          )}
        </div>
        <div className="cp-scan__actions">
          <a href="#cp-plans" className="cp-btn-gold">See plans <ArrowRight size={16} /></a>
          {n > 0 && <button type="button" className="cp-scan__reset" onClick={() => setOn([])}><RotateCcw size={14} /> Reset</button>}
        </div>
      </div>
      <div className="cp-scan__grid">
        {selfCheck.map((t, i) => {
          const active = on.includes(i);
          return (
            <button key={t.title} type="button" role="switch" aria-checked={active} className={`cp-scan__tile ${active ? "is-on" : ""}`} onClick={() => toggle(i)}>
              <span className="cp-scan__ico">{t.icon}</span>
              <span className="cp-scan__body">
                <strong>{t.title}</strong>
                <small>{t.text}</small>
              </span>
              <span className="cp-scan__switch" aria-hidden="true"><i /></span>
              <span className="cp-scan__tag">{active ? "Covered" : "Gap"}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Levels() {
  const [a, setA] = useState(3);
  const l = levels[a];
  return (
    <div className="cp-levels">
      <div className="cp-levels__stack">
        {levels.map((x, i) => (
          <button type="button" key={x.name} className={`cp-levels__bar ${i === a ? "is-active" : ""}`} style={{ "--w": `${100 - i * 8}%` }} onClick={() => setA(i)}>
            {x.icon}<b>{x.name}</b>
          </button>
        ))}
      </div>
      <div className="cp-levels__info" key={a}>
        <Layers size={22} />
        <h3>{l.name} level</h3>
        <p>{l.text}</p>
        <small>Example: {l.eg}</small>
      </div>
    </div>
  );
}

export default function Compliance() {
  const [heroRef, heroInView] = useInView();
  const marquee = [...strip, ...strip];

  return (
    <div className="cp-page">
      {/* HERO */}
      <section className="cp-hero" ref={heroRef}>
        <span className="cp-blob cp-blob--a" aria-hidden="true" />
        <span className="cp-blob cp-blob--b" aria-hidden="true" />
        <div className="container">
          <nav className="cp-crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link> / <Link to="/business">Business</Link> / <span>Compliance</span>
          </nav>
          <div className="cp-hero__grid">
            <div className={`cp-hero__content ${heroInView ? "is-in" : ""}`}>
              <h1 className="cp-hero__title" style={{ "--d": 0 }}>Keep your company in good standing, without chasing deadlines</h1>
              <p className="cp-hero__subtitle" style={{ "--d": 1 }}>
                Annual reports, amendments, licenses and renewals all in one place. We track what your state expects, file what needs filing and warn you before anything lapses.
              </p>
              <div className="cp-cta-row" style={{ "--d": 2 }}>
                <Button to={ROUTES.plans}>Choose my plan <ArrowRight size={18} /></Button>
                <a href={`tel:${contactInfo.phone}`} className="cp-ghost"><Phone size={15} /> Talk to a manager</a>
              </div>
              <div className="cp-hero__trust" style={{ "--d": 3 }}>
                <strong>{TRUST_LABEL}</strong>
                <span className="cp-hero__stars">{[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#00b67a" color="#00b67a" />)}</span>
                <a className="cp-hero__badge" href={TRUSTPILOT_URL} target="_blank" rel="noopener noreferrer"><Star size={12} fill="#fff" color="#fff" /> Trustpilot</a>
                <span className="cp-hero__sep" />
                <span className="cp-hero__trust-item"><ShieldCheck size={16} /> Accuracy-first filing support</span>
              </div>
            </div>
            <div className={`cp-hero__visual ${heroInView ? "is-in" : ""}`}><RadarCard /></div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="cp-marquee" aria-hidden="true">
        <div className="cp-marquee__track">{marquee.map((t, i) => <span key={i}><Check size={14} />{t}</span>)}</div>
      </div>

      {/* PLANS */}
      <section className="cp-section" id="cp-plans">
        <div className="container">
          <h2 className="cp-title">Pick the plan that fits your business</h2>
          <p className="cp-subtitle">Start with filings, add licensing, or hand the whole thing to a dedicated manager.</p>
          <Reveal><Plans /></Reveal>
          <Reveal className="cp-guarantee">
            <ShieldCheck size={36} />
            <p><strong>Accurate filing promise.</strong> If a filing we prepare is rejected or wrong because of our mistake, we fix it with the agency at no extra cost to you.</p>
          </Reveal>
        </div>
      </section>

      {/* WHY US */}
      <section className="cp-section cp-section--gray">
        <div className="container">
          <h2 className="cp-title">Why handle compliance with us?</h2>
          <p className="cp-subtitle">Rules can feel overwhelming. We make them manageable so you can focus on growing.</p>
          <Reveal className="cp-grid cp-grid-3">
            {reasons.map((r) => (
              <div key={r.title} className="cp-card"><div className="cp-card__icon">{r.icon}</div><h3>{r.title}</h3><p>{r.text}</p></div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHAT IS COMPLIANCE */}
      <section className="cp-section">
        <div className="container">
          <Reveal className="cp-split">
            <div>
              <h2 className="cp-h2">What does business compliance really mean?</h2>
              <p>Whether you run an LLC, a corporation, a nonprofit or operate under a DBA, you have to meet certain legal duties to stay in good standing with the government.</p>
              <p>For an LLC that means regular state and federal filings plus licensing rules at the local, state and federal levels. Skipping them can lead to fines, suspension or even closure, while staying on top of them builds trust with customers and partners.</p>
              <p>We track your requirements, manage the dates and give you support shaped around your business.</p>
            </div>
            <Duties />
          </Reveal>
        </div>
      </section>

      {/* STEPS */}
      <section className="cp-section cp-section--soft">
        <div className="container">
          <h2 className="cp-title">Manage compliance in three easy steps</h2>
          <p className="cp-subtitle">The same simple flow works for LLCs, corporations and nonprofits.</p>
          <Reveal className="cp-steps">
            {steps.map((s, i) => (
              <div key={s.title} className="cp-step" style={{ "--i": i }}>
                <span className="cp-step__num">{i + 1}</span>
                <span className="cp-step__icon">{s.icon}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </Reveal>
          <div className="cp-center"><Button to={ROUTES.plans}>Select my plan <ArrowRight size={18} /></Button></div>
        </div>
      </section>

      {/* WHY HELP */}
      <section className="cp-section">
        <div className="container">
          <h2 className="cp-title">Why get help with filings and licenses?</h2>
          <Reveal className="cp-grid cp-grid-3 cp-mt">
            {help.map((r, i) => (
              <div key={r.title} className={`cp-card ${i === 1 ? "cp-card--warn" : ""}`}><div className="cp-card__icon">{r.icon}</div><h3>{r.title}</h3><p>{r.text}</p></div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* SELF CHECK */}
      <section className="cp-section cp-section--gray">
        <div className="container">
          <h2 className="cp-title">How compliant are you today?</h2>
          <p className="cp-subtitle">Flip the switches that match your business. A rough guide only, not a legal review.</p>
          <Reveal><SelfCheck /></Reveal>
        </div>
      </section>

      {/* ANNUAL REPORT */}
      <section className="cp-section">
        <div className="container">
          <Reveal className="cp-split cp-split--rev">
            <div className="cp-report" aria-hidden="true">
              <span className="cp-report__eyebrow"><FileText size={14} /> Annual report</span>
              {reportFields.map(([k, v], i) => (
                <div key={k} className="cp-report__row" style={{ "--k": i }}><span>{k}</span><strong>{v}</strong></div>
              ))}
              <span className="cp-report__stamp">FILED</span>
            </div>
            <div>
              <h2 className="cp-h2">What is an annual report?</h2>
              <p>It is a document submitted to your state that refreshes the key facts about your business: its name and address, who runs it and who its registered agent is.</p>
              <p>Most companies must file one to keep operating legally in their state. For public companies, it also gives investors and analysts a view of how the business is doing.</p>
              <Link to={ROUTES.annual} className="cp-link">Learn about annual reports <ArrowRight size={16} /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* LICENSES */}
      <section className="cp-section cp-section--soft">
        <div className="container">
          <h2 className="cp-title">What is a business license?</h2>
          <p className="cp-subtitle">
            It is official permission to run a business in a specific area, and nearly every business needs at least one. Most end up with several, since rules stack up across city, county, state and federal levels.
          </p>
          <Reveal><Levels /></Reveal>
          <Reveal className="cp-grid cp-grid-4 cp-mt">
            {permits.map((p) => (
              <div key={p.title} className="cp-permit"><span>{p.icon}</span><h3>{p.title}</h3><p>{p.text}</p></div>
            ))}
          </Reveal>
          <p className="cp-note">Licenses and permits shield you from penalties and possible closure, and show customers it is safe to do business with you.</p>
          <div className="cp-center"><Link to={ROUTES.licenses} className="cp-ghost">Learn about licenses <ArrowRight size={15} /></Link></div>
        </div>
      </section>

      {/* FAQ */}
      <section className="cp-faq">
        <div className="container cp-faq__inner">
          <h2 className="cp-title">Frequently asked questions</h2>
          <div className="cp-faq__list">
            {faqs.map(([q, a]) => (
              <details key={q} className="cp-faq-item"><summary><span>{q}</span><ChevronDown size={20} /></summary><p>{a}</p></details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="cp-section cp-section--soft">
        <div className="container">
          <Reveal className="cp-band">
            <h2>Ready to get compliant?</h2>
            <Button to={ROUTES.plans}>Select my plan <ArrowRight size={18} /></Button>
          </Reveal>
        </div>
      </section>

      {/* QUESTIONS */}
      <section className="cp-section cp-section--gray">
        <div className="container">
          <h2 className="cp-title">Questions?</h2>
          <Reveal className="cp-grid cp-grid-2 cp-ask cp-mt">
            <div className="cp-ask__card">
              <MessageSquare size={30} />
              <h3>Ask an attorney</h3>
              <p>Get the right guidance with an attorney by your side.</p>
              <Link to={ROUTES.attorney} className="cp-btn-gold">Get legal help <ArrowRight size={16} /></Link>
            </div>
            <div className="cp-ask__card">
              <Phone size={30} />
              <h3>Call an agent at <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a></h3>
              <p className="cp-hours"><Clock size={14} /> {HOURS[0]}<br />{HOURS[1]}</p>
              <a href={`mailto:${contactInfo.email}`} className="cp-ask__mail"><Mail size={16} /> {contactInfo.email}</a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cp-foot">
        <div className="container">
          <p>
            Leader Business Developer provides business formation and administrative filing support. Requirements, fees and processing times vary by jurisdiction, and government filing fees are paid separately. This page is for general information and is not legal or tax advice.
          </p>
          <div className="cp-center">
            <button type="button" className="cp-link-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Back to top ↑</button>
          </div>
        </div>
      </section>
    </div>
  );
}