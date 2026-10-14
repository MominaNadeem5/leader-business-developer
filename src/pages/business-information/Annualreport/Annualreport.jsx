import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Check, ChevronDown, ArrowRight, Star, ShieldCheck, Phone, Mail, Clock, MessageSquare,
  FileText, FileCheck, Send, Eye, Users, Briefcase, Bell,
  Calendar, CalendarCheck, Hourglass, AlertTriangle, BadgeCheck, Handshake, Shield, Ban,
  Sparkles, Search, Layers,
} from "lucide-react";
import Button from "../../../components/common/Button";
import useInView from "../../../hooks/useInView";
import "./AnnualReport.css";

/* ---- EDIT THESE ---- */
const TRUSTPILOT_URL = "https://www.trustpilot.com/review/leaderbusiness.com"; // your real Trustpilot page
const TRUST_LABEL = "Excellent"; // keep only if it matches your real rating
const ROUTES = {
  plans: "#ar-plans",
  start: "/get-started?service=annual-report",
  compliance: "/business/compliance",
  licenses: "/business-licenses",
  attorney: "/contact",
};
const HOURS = ["Mon–Fri: 9 a.m.–6 p.m.", "Weekends: closed"]; // placeholder hours
const contactInfo = { phone: "(855) 787-1221", email: "support@leaderbusiness.com" };

/* Prices are placeholders: replace with your real pricing (price: null shows "Custom") */
const PLANS = [
  {
    name: "Single Report",
    tag: "One annual report prepared, filed and delivered for you.",
    price: 89, per: "one time", note: "State filing fees are extra.",
    cta: "File my report", featured: false,
    features: [
      "Your state's required report prepared from details you already gave us",
      "Amendments for business changes",
      "Tax preparation through independent tax professionals",
      "Compliance alerts and notifications",
      "Attorney-monitored rule changes",
      "Filed copy delivered digitally and by mail, with optional rush handling",
      "Support from a compliance specialist",
    ],
  },
  {
    name: "Filings Plan",
    tag: "Ongoing coverage so no yearly deadline ever slips by.",
    price: 149, per: "/yr", note: "Renews automatically. Cancel anytime.",
    cta: "Get covered", featured: true,
    features: [
      "Initial and annual reports filed every year",
      "Amendments filed when your details change",
      "AI-assisted meeting minutes for your records",
      "Alerts built around your filing calendar",
      "Attorney-reviewed updates in plain language",
      "Specialist support all year",
    ],
  },
  {
    name: "Filings + Licenses",
    tag: "Reports plus a full map of the licenses and permits you need.",
    price: 249, per: "/yr", note: "Renews automatically. Cancel anytime.",
    cta: "Get covered", featured: false,
    features: [
      "Everything in the Filings Plan",
      "A custom list of federal, state and local licenses and permits",
      "Direct access to each application",
      "A place to store and share your license documents",
      "Alerts before licenses expire",
    ],
  },
  {
    name: "Compliance Manager",
    tag: "A dedicated manager who runs your compliance from start to finish.",
    price: null, per: "", note: "Talk to us about your needs.",
    cta: "Talk to a manager", featured: false,
    features: [
      "Everything in Filings + Licenses",
      "A dedicated manager with unlimited phone and email access",
      "Regular check-ins that spot gaps and risks early",
      "Fast action when a compliance issue appears",
      "Document management and e-signing",
      "Help with certificates like good standing and foreign qualification",
    ],
  },
];

const strip = ["State reports prepared for you", "Filed on time, every time", "Digital and mailed copies", "Rush handling available", "Deadline reminders by email and text", "Specialists who know your state"];

const aka = ["Statement of Information", "Public Information Report", "Biennial Statement", "Business Annual Report", "Yearly Statement"];

const whoInfo = {
  LLC: {
    icon: <Users size={20} />,
    lead: "Most LLCs need to confirm a short list of details with the state.",
    items: [
      "The company's current name and address",
      "Your registered agent",
      "The people who manage the company",
    ],
    note: "A manager runs the LLC day to day and can sign contracts on its behalf.",
  },
  Corporation: {
    icon: <Briefcase size={20} />,
    lead: "Corporations usually report who is in charge, and sometimes how shares are set up.",
    items: [
      "The corporation's current name and address",
      "Its officers and directors",
      "Stock information, in some states",
    ],
    note: "A director sits on the board of the corporation.",
  },
};

const timing = [
  { icon: <Calendar size={18} />, title: "Every year", text: "Many states want a report each year. Check your due date as soon as you form." },
  { icon: <Hourglass size={18} />, title: "Every two years", text: "Some states use a two-year cycle, so the deadline is easy to forget." },
  { icon: <CalendarCheck size={18} />, title: "Formation anniversary", text: "The due date follows the month your business was formed." },
  { icon: <Clock size={18} />, title: "Fixed date or fiscal year", text: "Others set one calendar date for everyone, or tie it to your fiscal year." },
];

const ladder = [
  { icon: <Clock size={18} />, title: "Late fees and penalties", text: "Extra charges begin as soon as you miss the window." },
  { icon: <BadgeCheck size={18} />, title: "Loss of good standing", text: "Your company is flagged as not in compliance." },
  { icon: <Handshake size={18} />, title: "Lost contracts", text: "Partners and customers may refuse to work with you." },
  { icon: <Shield size={18} />, title: "Liability protection at risk", text: "Your personal assets can lose their shield." },
  { icon: <Ban size={18} />, title: "Administrative dissolution", text: "The state can end your company's legal existence." },
];

/* Examples only: confirm every fee and date against the current state rules before publishing */
const STATES = [
  { code: "CA", name: "California", title: "Statement of Information", facts: ["Required, and filed every two years", "Filed within a six-month window tied to your original registration"] },
  { code: "FL", name: "Florida", title: "Annual report", facts: ["Due May 1 each year", "A $400 late fee applies", "Ignoring it can lead to dissolution by the third Friday of September"] },
  { code: "NJ", name: "New Jersey", title: "Annual report", facts: ["Required for all businesses", "Covers your registered agent and address", "$75 fee, due the last day of your formation month", "Two years without filing can void the charter"] },
  { code: "PA", name: "Pennsylvania", title: "Annual report", facts: ["All LLCs file from 2025 onward", "Filed with the Department of State by September 30", "Non-filing can mean dissolution and loss of name protection"] },
  { code: "MS", name: "Mississippi", title: "Annual report", facts: ["File between January 1 and April 15", "Online filing only", "Domestic LLCs file free, corporations pay $25"] },
  { code: "ND", name: "North Dakota", title: "Annual report", facts: ["File by mail or through the state's FirstStop service", "$50 if filed by November 15, $100 after"] },
  { code: "WI", name: "Wisconsin", title: "Annual report", facts: ["Forms go to your registered agent", "File by mail or online with the state's DFI"] },
];

const diy = [
  { icon: <Search size={20} />, title: "Learn your state's rules", text: "Work out whether you must file, when, and for which entity type." },
  { icon: <FileText size={20} />, title: "Complete the forms", text: "In some cases every LLC member has to sign." },
  { icon: <Send size={20} />, title: "Submit with the fee", text: "By mail or online, depending on your state." },
  { icon: <Bell size={20} />, title: "Set your own reminders", text: "Then repeat it all again before next year's deadline." },
];
const withUs = [
  { icon: <FileText size={20} />, title: "We prepare your report", text: "Built from information we already have, ready for you to review." },
  { icon: <Send size={20} />, title: "We file it with the state", text: "Submitted correctly and on time, with rush handling if you need it." },
  { icon: <Mail size={20} />, title: "You get the filed copy", text: "Delivered digitally and by mail for your records." },
];

const why = [
  { icon: <Clock size={24} />, title: "Skip the research", text: "State rules are tricky and they differ everywhere. We already know them." },
  { icon: <AlertTriangle size={24} />, title: "Avoid costly slips", text: "No missed deadlines, no fines, no risk to your liability protection." },
  { icon: <ShieldCheck size={24} />, title: "Fewer filing errors", text: "Details are checked before submission, so reports are accepted the first time." },
];

const compare = [
  ["Checks your state's requirements", "Included", "You research it"],
  ["Reviews the report for accuracy", "Included", "You double-check it"],
  ["Submits it to the state", "We do it", "You mail or upload it"],
  ["Tracks next year's deadline", "Reminders by email and text", "Your own calendar"],
  ["If something is rejected", "Corrected at no cost when it is our error", "You fix it and refile"],
];

const faqs = [
  ["What are other names for an annual report?", "Depending on the state it can be called a Statement of Information, Public Information Report, Biennial Statement, business annual report or yearly statement. They all serve the same purpose."],
  ["What is annual report compliance?", "It means keeping your business details current with the state, usually through a yearly filing. Doing so keeps your company in good standing."],
  ["Is an annual report mandatory?", "It depends on your state and your business type. Most states require some kind of report from LLCs and corporations, while a few do not, so check where you operate."],
  ["What information do I need to file?", "LLCs generally need the company name and address, the registered agent and the managers. Corporations usually list officers and directors, and in some states stock details as well."],
  ["What do manager and director mean?", "A manager handles an LLC's day-to-day operations and can bind it in contracts. A director is a member of a corporation's board."],
  ["When is my annual report due?", "That varies by state and entity. Filing late can mean fees, so we send reminders by email and text to keep you ahead of the date."],
  ["Is there a template I must submit?", "No. We ask a few questions to confirm your details, then prepare and file the report for you."],
  ["How do requirements differ by state?", "States differ on whether a report is required, which entity types must file, how often, how much it costs and what it must contain."],
  ["What are filing fees?", "They are the state's required fees, plus any optional extras like rush handling, name reservation or walk-in service. They are paid separately from our service fee."],
  ["Can I rush my filing?", "Yes. Rush service puts your report at the front of the line and speeds up delivery of the filed copy."],
  ["What happens if I miss the deadline?", "You may face late fees, loss of good standing and, if it goes on, administrative dissolution. Getting back into compliance is easier the sooner you act."],
  ["Which plan should I choose?", "Pick a Single Report for a one-time filing, the Filings Plan if you want every year handled, Filings + Licenses to cover permits as well, or the Compliance Manager for full hands-on service."],
];

function Reveal({ children, className = "" }) {
  const [ref, inView] = useInView();
  return <div ref={ref} className={`ar-reveal ${inView ? "is-in" : ""} ${className}`}>{children}</div>;
}

/* Hero: a filing tracker that moves through four stages on a loop */
const STAGES = [
  { icon: <FileText size={16} />, label: "Prepared", msg: "Report drafted from your details" },
  { icon: <Eye size={16} />, label: "Reviewed", msg: "Accuracy check completed" },
  { icon: <Send size={16} />, label: "Filed", msg: "Submitted to the state" },
  { icon: <Mail size={16} />, label: "Delivered", msg: "Copy sent digitally and by mail" },
];

function TrackerCard() {
  const [s, setS] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setS((n) => (n >= STAGES.length + 1 ? 0 : n + 1)), 1500);
    return () => clearInterval(id);
  }, []);
  const at = Math.min(s, STAGES.length - 1);
  const finished = s >= STAGES.length;
  const pct = Math.min(s, STAGES.length) / STAGES.length * 100;
  return (
    <div className="ar-track">
      <div className="ar-track__doc">
        <span className="ar-track__file"><FileText size={22} /></span>
        <div>
          <small>Annual report</small>
          <strong>Northwind Studio LLC</strong>
        </div>
        <span className={`ar-track__pill ${finished ? "is-ok" : ""}`}><i />{finished ? "COMPLETE" : "IN PROGRESS"}</span>
      </div>
      <div className="ar-track__bar"><b style={{ width: `${pct}%` }} /></div>
      <ol className="ar-track__steps">
        {STAGES.map((x, i) => (
          <li key={x.label} className={i < s ? "is-done" : i === s ? "is-now" : ""}>
            <span>{i < s ? <Check size={15} /> : x.icon}</span>
            <em>{x.label}</em>
          </li>
        ))}
      </ol>
      <p className="ar-track__msg" key={s}>
        {finished ? <><Sparkles size={15} /> All done. You stay in good standing.</> : <>{STAGES[at].icon} {STAGES[at].msg}</>}
      </p>
    </div>
  );
}

function Plans() {
  const [open, setOpen] = useState(PLANS.map(() => false));
  const toggle = (i) => setOpen((o) => o.map((v, k) => (k === i ? !v : v)));
  return (
    <div className="ar-plans">
      {PLANS.map((p, i) => (
        <article key={p.name} className={`ar-plan ${p.featured ? "is-featured" : ""}`}>
          {p.featured && <span className="ar-plan__badge"><Sparkles size={13} /> Most popular</span>}
          <h3>{p.name}</h3>
          <p className="ar-plan__tag">{p.tag}</p>
          {p.price !== null ? (
            <div className="ar-plan__price"><b>${p.price}</b><span>{p.per}</span><small>{p.note}</small></div>
          ) : (
            <div className="ar-plan__price"><b className="ar-plan__call">Custom</b><small>{p.note}</small></div>
          )}
          {p.price !== null ? (
            <Button to={ROUTES.start}>{p.cta} <ArrowRight size={16} /></Button>
          ) : (
            <a className="ar-plan__phone" href={`tel:${contactInfo.phone}`}><Phone size={16} /> {contactInfo.phone}</a>
          )}
          <button type="button" className={`ar-plan__toggle ${open[i] ? "is-open" : ""}`} onClick={() => toggle(i)} aria-expanded={open[i]}>
            {open[i] ? "Hide features" : "View features"} <ChevronDown size={16} />
          </button>
          <div className={`ar-plan__features ${open[i] ? "is-open" : ""}`}>
            <ul>{p.features.map((f) => <li key={f}><Check size={14} />{f}</li>)}</ul>
          </div>
        </article>
      ))}
    </div>
  );
}

function AkaChips() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % aka.length), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="ar-aka">
      <small>Also known as</small>
      <div className="ar-aka__chips">
        {aka.map((a, k) => <button type="button" key={a} className={k === i ? "is-on" : ""} onClick={() => setI(k)}>{a}</button>)}
      </div>
    </div>
  );
}

function WhoInfo() {
  const [t, setT] = useState("LLC");
  const d = whoInfo[t];
  return (
    <div className="ar-who">
      <div className="ar-who__seg" role="tablist">
        {Object.keys(whoInfo).map((k) => (
          <button type="button" role="tab" aria-selected={k === t} key={k} className={k === t ? "is-on" : ""} onClick={() => setT(k)}>{whoInfo[k].icon}{k}</button>
        ))}
      </div>
      <div className="ar-who__panel" key={t}>
        <p>{d.lead}</p>
        <ul>{d.items.map((x, i) => <li key={x} style={{ "--k": i }}><Check size={16} />{x}</li>)}</ul>
        <em>{d.note}</em>
      </div>
    </div>
  );
}

function Deadlines() {
  const [a, setA] = useState(0);
  return (
    <div className="ar-dead">
      <div className="ar-dead__left">
        <h3>When is it due?</h3>
        <p className="ar-dead__sub">Timing depends on your state and entity. Pick a pattern:</p>
        {timing.map((x, i) => (
          <button type="button" key={x.title} className={i === a ? "is-on" : ""} onClick={() => setA(i)}>
            <span>{x.icon}</span>
            <div><strong>{x.title}</strong>{i === a && <small>{x.text}</small>}</div>
          </button>
        ))}
      </div>
      <div className="ar-dead__right">
        <h3>What happens if you miss it</h3>
        <ol className="ar-ladder">
          {ladder.map((x, i) => (
            <li key={x.title} style={{ "--i": i }}>
              <span className="ar-ladder__ico">{x.icon}</span>
              <div><strong>{x.title}</strong><small>{x.text}</small></div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function StateExplorer() {
  const [a, setA] = useState(0);
  const s = STATES[a];
  return (
    <div className="ar-states">
      <div className="ar-states__pills">
        {STATES.map((x, i) => (
          <button type="button" key={x.code} className={i === a ? "is-on" : ""} onClick={() => setA(i)}><b>{x.code}</b>{x.name}</button>
        ))}
      </div>
      <div className="ar-states__card" key={a}>
        <span className="ar-states__code">{s.code}</span>
        <div>
          <h3>{s.name}</h3>
          <small>{s.title}</small>
          <ul>{s.facts.map((f, i) => <li key={f} style={{ "--k": i }}><Check size={15} />{f}</li>)}</ul>
        </div>
      </div>
      <p className="ar-states__note">Examples only. Rules, dates and fees change, so we confirm the current requirements for your state when we file.</p>
    </div>
  );
}

function HowItWorks() {
  const [mode, setMode] = useState("us");
  const list = mode === "us" ? withUs : diy;
  return (
    <div className="ar-how">
      <div className="ar-how__switch" role="tablist">
        <button type="button" role="tab" aria-selected={mode === "diy"} className={mode === "diy" ? "is-on" : ""} onClick={() => setMode("diy")}>File it yourself</button>
        <button type="button" role="tab" aria-selected={mode === "us"} className={mode === "us" ? "is-on" : ""} onClick={() => setMode("us")}>With Leader</button>
        <span className={`ar-how__thumb ${mode === "us" ? "is-right" : ""}`} aria-hidden="true" />
      </div>
      <div className={`ar-how__steps is-${list.length}`} key={mode}>
        {list.map((s, i) => (
          <div key={s.title} className="ar-how__step" style={{ "--i": i }}>
            <span className="ar-how__num">{i + 1}</span>
            <span className="ar-how__ico">{s.icon}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </div>
        ))}
      </div>
      <p className="ar-how__foot">
        {mode === "us" ? "Three steps, and you only review." : "Four steps, and it repeats every year."}
      </p>
    </div>
  );
}

export default function AnnualReport() {
  const [heroRef, heroInView] = useInView();
  const marquee = [...strip, ...strip];

  return (
    <div className="ar-page">
      {/* HERO */}
      <section className="ar-hero" ref={heroRef}>
        <span className="ar-blob ar-blob--a" aria-hidden="true" />
        <span className="ar-blob ar-blob--b" aria-hidden="true" />
        <div className="container">
          <nav className="ar-crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link> / <Link to="/business">Business</Link> / <span>Annual report</span>
          </nav>
          <div className="ar-hero__grid">
            <div className={`ar-hero__content ${heroInView ? "is-in" : ""}`}>
              <h1 className="ar-hero__title" style={{ "--d": 0 }}>Get your annual report filed right, and filed on time</h1>
              <p className="ar-hero__subtitle" style={{ "--d": 1 }}>
                Most businesses must file a report with their state every year or two. We prepare it, submit it and send you the filed copy, so your company stays in good standing.
              </p>
              <div className="ar-cta-row" style={{ "--d": 2 }}>
                <Button to={ROUTES.plans}>See plans <ArrowRight size={18} /></Button>
                <a href="#ar-deadlines" className="ar-ghost">Check deadlines</a>
              </div>
              <div className="ar-hero__trust" style={{ "--d": 3 }}>
                <strong>{TRUST_LABEL}</strong>
                <span className="ar-hero__stars">{[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#00b67a" color="#00b67a" />)}</span>
                <a className="ar-hero__badge" href={TRUSTPILOT_URL} target="_blank" rel="noopener noreferrer"><Star size={12} fill="#fff" color="#fff" /> Trustpilot</a>
                <span className="ar-hero__sep" />
                <span className="ar-hero__trust-item"><ShieldCheck size={16} /> Accuracy-first filing support</span>
              </div>
            </div>
            <div className={`ar-hero__visual ${heroInView ? "is-in" : ""}`}><TrackerCard /></div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="ar-marquee" aria-hidden="true">
        <div className="ar-marquee__track">{marquee.map((t, i) => <span key={i}><Check size={14} />{t}</span>)}</div>
      </div>

      {/* PLANS */}
      <section className="ar-section" id="ar-plans">
        <div className="container">
          <h2 className="ar-title">Choose how much help you want</h2>
          <p className="ar-subtitle">File a single report, or let us cover every deadline for the year.</p>
          <Reveal><Plans /></Reveal>
          <Reveal className="ar-guarantee">
            <ShieldCheck size={36} />
            <p><strong>Accurate filing promise.</strong> If a filing we prepare is rejected or wrong because of our mistake, we correct it with the agency at no extra cost. Government fees are paid by you.</p>
          </Reveal>
        </div>
      </section>

      {/* WHAT IS IT */}
      <section className="ar-section ar-section--gray">
        <div className="container">
          <Reveal className="ar-split">
            <div>
              <h2 className="ar-h2">What is an annual report?</h2>
              <p>It is a document filed with your state that updates the public record about your business: its name and address, the people who run it and its registered agent.</p>
              <p>Most companies file one to keep operating legally. Public companies also use theirs to share operating results with investors and analysts.</p>
              <AkaChips />
            </div>
            <div className="ar-report" aria-hidden="true">
              <span className="ar-report__eyebrow"><FileCheck size={14} /> Annual report</span>
              {[["Business name", "Northwind Studio LLC"], ["Business address", "214 Market Street"], ["Managers", "A. Rahman, S. Khan"], ["Registered agent", "Leader Agent Services"]].map(([k, v], i) => (
                <div key={k} className="ar-report__row" style={{ "--k": i }}><span>{k}</span><strong>{v}</strong></div>
              ))}
              <span className="ar-report__stamp">FILED</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHO + INFO */}
      <section className="ar-section">
        <div className="container">
          <h2 className="ar-title">Who files, and what do you need?</h2>
          <p className="ar-subtitle">
            LLCs, corporations and nonprofits generally have to file, depending on state law. Most states ask small businesses for some kind of report to stay in good standing. It keeps the state and the public informed and holds businesses accountable.
          </p>
          <Reveal><WhoInfo /></Reveal>
        </div>
      </section>

      {/* DEADLINES */}
      <section className="ar-section ar-section--soft" id="ar-deadlines">
        <div className="container">
          <h2 className="ar-title">Deadlines and penalties</h2>
          <p className="ar-subtitle">Due dates vary by state and entity type. Some states have no LLC requirement at all, so always confirm where you operate.</p>
          <Reveal><Deadlines /></Reveal>
        </div>
      </section>

      {/* STATES */}
      <section className="ar-section">
        <div className="container">
          <h2 className="ar-title">See how states differ</h2>
          <p className="ar-subtitle">Whether you file, how often and how much it costs changes from state to state. Here are a few examples.</p>
          <Reveal><StateExplorer /></Reveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="ar-section ar-section--gray">
        <div className="container">
          <h2 className="ar-title">How filing works</h2>
          <p className="ar-subtitle">Switch between doing it alone and letting us handle it.</p>
          <Reveal><HowItWorks /></Reveal>
          <div className="ar-center"><Button to={ROUTES.plans}>Start my filing <ArrowRight size={18} /></Button></div>
        </div>
      </section>

      {/* WHY US */}
      <section className="ar-section">
        <div className="container">
          <h2 className="ar-title">Why file with us?</h2>
          <Reveal className="ar-grid ar-grid-3 ar-mt">
            {why.map((r, i) => (
              <div key={r.title} className={`ar-card ${i === 1 ? "ar-card--warn" : ""}`}><div className="ar-card__icon">{r.icon}</div><h3>{r.title}</h3><p>{r.text}</p></div>
            ))}
          </Reveal>
          <p className="ar-note">For LLCs in states where a report is required, we can also file automatically each year (not available in every state).</p>
        </div>
      </section>

      {/* COMPARE */}
      <section className="ar-section ar-section--gray">
        <div className="container">
          <h2 className="ar-title">With us vs. doing it yourself</h2>
          <Reveal>
            <div className="ar-table-wrap">
              <table className="ar-table">
                <thead><tr><th>&nbsp;</th><th>With Leader</th><th>Filing yourself</th></tr></thead>
                <tbody>{compare.map(([a, b, c]) => <tr key={a}><td><strong>{a}</strong></td><td><Check size={15} /> {b}</td><td>{c}</td></tr>)}</tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ALSO */}
      <section className="ar-section ar-section--soft">
        <div className="container">
          <Reveal className="ar-also">
            <Layers size={34} />
            <div>
              <h2>Want everything covered?</h2>
              <p>Pair annual reports with amendments, license tracking and meeting minutes in one compliance plan.</p>
            </div>
            <Link to={ROUTES.compliance} className="ar-btn-gold">See compliance plans <ArrowRight size={16} /></Link>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="ar-faq">
        <div className="container ar-faq__inner">
          <h2 className="ar-title">Frequently asked questions</h2>
          <div className="ar-faq__list">
            {faqs.map(([q, a]) => (
              <details key={q} className="ar-faq-item"><summary><span>{q}</span><ChevronDown size={20} /></summary><p>{a}</p></details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="ar-section ar-section--soft">
        <div className="container">
          <Reveal className="ar-band">
            <h2>Ready to file your annual report?</h2>
            <Button to={ROUTES.plans}>Select my plan <ArrowRight size={18} /></Button>
          </Reveal>
        </div>
      </section>

      {/* QUESTIONS */}
      <section className="ar-section ar-section--gray">
        <div className="container">
          <h2 className="ar-title">Questions?</h2>
          <Reveal className="ar-grid ar-grid-2 ar-ask ar-mt">
            <div className="ar-ask__card">
              <MessageSquare size={30} />
              <h3>Ask an attorney</h3>
              <p>Get the right guidance with an attorney by your side.</p>
              <Link to={ROUTES.attorney} className="ar-btn-gold">Get legal help <ArrowRight size={16} /></Link>
            </div>
            <div className="ar-ask__card">
              <Phone size={30} />
              <h3>Call an agent at <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a></h3>
              <p className="ar-hours"><Clock size={14} /> {HOURS[0]}<br />{HOURS[1]}</p>
              <a href={`mailto:${contactInfo.email}`} className="ar-ask__mail"><Mail size={16} /> {contactInfo.email}</a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="ar-foot">
        <div className="container">
          <p>
            Leader Business Developer provides business formation and administrative filing support. Requirements, fees and processing times vary by jurisdiction, and government filing fees are paid separately. This page is for general information and is not legal or tax advice.
          </p>
          <div className="ar-center">
            <button type="button" className="ar-link-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Back to top ↑</button>
          </div>
        </div>
      </section>
    </div>
  );
}