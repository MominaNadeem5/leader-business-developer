import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Check, ArrowRight, /* Star, */ ShieldCheck, Phone, MessageSquare, FileText,
  CalendarClock, PencilLine, Globe, RotateCcw, LogOut, Landmark, Search, FileCheck, CalendarCheck,
  MapPin, Users, Tag, Wrench, Headset, Layers, ClipboardCheck, Building2, Sparkles,
} from "lucide-react";
import Button from "../../../components/common/Button";
import useInView from "../../../hooks/useInView";
import { Reveal, FaqList, ServiceFooter, CtaBand, ContactCards } from "../../../components/service";
import { CONTACT } from "../../../data/site";
import "./StateFederalFilings.css";

/* ---- EDIT THESE ---- */
// const TRUSTPILOT_URL = "https://www.trustpilot.com/review/leaderbusiness.com"; // your real Trustpilot page
// const TRUST_LABEL = "Excellent"; // keep only if it matches your real rating
const LINKS = { request: "/get-started?service=state-federal-filings", contact: "/contact" };

const heroChips = ["State filing assistance", "Federal filing support", "Amendments & business updates", "Annual & periodic report support"];
const strip = ["Annual reports", "Amendments", "Address changes", "Registered agent changes", "Foreign qualification", "Reinstatement", "Dissolution & withdrawal", "Federal forms"];

const FILINGS = [
  { name: "Annual report", place: "Texas" },
  { name: "Address change", place: "Florida" },
  { name: "Foreign qualification", place: "Nevada" },
  { name: "Reinstatement", place: "California" },
];
const STAGES = [
  ["Request received", "Tell us what changed"],
  ["Records reviewed", "Company details checked"],
  ["Documents prepared", "Information organized"],
  ["Submitted & follow-up", "Next-step guidance"],
];

const support = [
  { icon: <Search size={22} />, title: "Information review", text: "We review the business details relevant to the requested filing." },
  { icon: <FileCheck size={22} />, title: "Document preparation", text: "Required information is organized for the appropriate filing process." },
  { icon: <CalendarCheck size={22} />, title: "Deadline awareness", text: "We help identify applicable dates and filing steps based on your request." },
];

const services = [
  { icon: <CalendarClock size={24} />, title: "Annual & periodic reports", text: "Support preparing business information for recurring state reporting requirements.", items: ["Annual report assistance", "Periodic report support", "Business-information review", "Officer or manager updates", "Address information review"] },
  { icon: <PencilLine size={24} />, title: "Amendments & corrections", text: "Assistance when company records need to be corrected or formally updated.", items: ["Business name amendments", "Address changes", "Member or manager changes", "Officer information updates", "Filing correction support"] },
  { icon: <Globe size={24} />, title: "Foreign qualification", text: "Support for eligible companies registering to do business in an additional U.S. state.", items: ["Entity information review", "Target-state filing preparation", "Registered agent information review", "Supporting-document guidance", "Qualification filing support"] },
  { icon: <RotateCcw size={24} />, title: "Reinstatement support", text: "Help reviewing business status and preparing information for eligible reinstatement matters.", items: ["Entity status review", "Outstanding filing review", "Business information preparation", "Reinstatement filing support", "Next-step guidance"] },
  { icon: <LogOut size={24} />, title: "Dissolution & withdrawal", text: "Administrative filing support for eligible businesses closing or withdrawing from a jurisdiction.", items: ["Dissolution filing support", "Withdrawal assistance", "Entity-information review", "Document preparation", "Status follow-up guidance"] },
  { icon: <Landmark size={24} />, title: "Federal filing support", text: "Administrative help with applicable federal business forms, updates and correspondence.", items: ["Business information review", "Applicable form preparation support", "Supporting-document organization", "Correction and update assistance", "Agency correspondence guidance"] },
];

const stateItems = [
  { icon: <CalendarClock size={20} />, title: "Annual reports", text: "Recurring state business reporting assistance." },
  { icon: <Users size={20} />, title: "Officer / manager updates", text: "Support for applicable management-information changes." },
  { icon: <MapPin size={20} />, title: "Address changes", text: "Business and mailing address filing assistance." },
  { icon: <ShieldCheck size={20} />, title: "Registered agent changes", text: "Support for applicable registered-agent updates." },
  { icon: <Tag size={20} />, title: "Business name changes", text: "Amendment support when an entity changes its legal name." },
  { icon: <ClipboardCheck size={20} />, title: "Entity status matters", text: "Administrative support for eligible status and reinstatement matters." },
];

const federalItems = [
  "Business and entity information review",
  "Applicable form-preparation assistance",
  "Supporting business-document organization",
  "Business information update and correction support",
  "Administrative correspondence and response preparation, where applicable",
  "Clear next-step guidance based on your filing request",
];

const CHANGES = [
  { icon: <Tag size={22} />, title: "Company name change", slug: "name-change", filing: "Usually handled through an amendment to your formation documents.", ready: ["Current legal name", "New name", "Entity ID"] },
  { icon: <MapPin size={22} />, title: "Address change", slug: "address-change", filing: "An update to principal, mailing or registered-office details.", ready: ["Old and new address", "Entity ID"] },
  { icon: <Users size={22} />, title: "Management changes", slug: "management-change", filing: "An update to member, manager, officer or director records.", ready: ["Names and titles", "Effective date"] },
  { icon: <ShieldCheck size={22} />, title: "Registered agent change", slug: "agent-change", filing: "A registered-agent update filed with the state.", ready: ["New agent's details", "Consent where required"] },
  { icon: <Globe size={22} />, title: "New state activity", slug: "foreign-qualification", filing: "Often handled as a foreign qualification in the new state.", ready: ["Home-state good standing", "New-state agent"] },
  { icon: <RotateCcw size={22} />, title: "Reinstatement", slug: "reinstatement", filing: "Starts with a review of status, outstanding filings and fees.", ready: ["Entity ID", "Any notice from the state"] },
  { icon: <LogOut size={22} />, title: "Business closure", slug: "dissolution", filing: "Dissolution, or withdrawal from a state, for eligible entities.", ready: ["Owner approval", "Final tax status"] },
  { icon: <Wrench size={22} />, title: "Filing correction", slug: "correction", filing: "A review of the earlier filing, then a corrective filing if applicable.", ready: ["Copy of earlier filing", "What needs fixing"] },
];

const prep = [
  { icon: <Building2 size={22} />, title: "Entity details", text: "Legal company name, entity type and jurisdiction are reviewed." },
  { icon: <MapPin size={22} />, title: "Address information", text: "Applicable principal, mailing and registered-office details are organized." },
  { icon: <Users size={22} />, title: "Management information", text: "Relevant owner, member, manager, officer or director details are reviewed." },
  { icon: <FileText size={22} />, title: "Supporting records", text: "Formation or prior filing documents may be reviewed when relevant." },
];
const ready = [
  "Exact legal name of the business",
  "Entity type and state of formation",
  "Principal and mailing addresses",
  "Registered agent details",
  "Owner, member, manager or officer names",
  "Copies of formation or earlier filings",
];

const process = [
  { icon: <MessageSquare size={20} />, title: "Tell us what changed", text: "Explain the filing, report, update or correction you need." },
  { icon: <Search size={20} />, title: "Review business records", text: "We review the available company information for the request." },
  { icon: <FileText size={20} />, title: "Prepare filing details", text: "Applicable information and supporting documents are organized." },
  { icon: <FileCheck size={20} />, title: "Submission & follow-up", text: "We assist with the filing process and give next-step guidance." },
];

const why = [
  { icon: <Search size={22} />, title: "Business information review", text: "Relevant company details are reviewed before preparation." },
  { icon: <Layers size={22} />, title: "Organized documentation", text: "Information and supporting records are structured clearly." },
  { icon: <Headset size={22} />, title: "Clear communication", text: "Our team explains required information and next steps." },
  { icon: <Globe size={22} />, title: "Multi-state support", text: "Administrative filing support for businesses across U.S. jurisdictions." },
];

const faqs = [
  ["What types of state filings can you assist with?", "Depending on the jurisdiction and your situation, assistance may include annual or periodic reports, amendments, registered-agent changes, address updates, foreign qualification, reinstatement, dissolution, withdrawal and other administrative entity filings."],
  ["Do filing requirements differ by state?", "Yes. Forms, deadlines, fees, required information and processing procedures vary by jurisdiction and by the type of business entity."],
  ["Can you help update my registered agent or business address?", "Yes, we can assist with applicable administrative filings for registered-agent or business-address changes, subject to the requirements of the relevant jurisdiction."],
  ["Can you help if my company is not in good standing?", "We can review the basic status situation and assist with applicable administrative steps such as outstanding filings or eligible reinstatement requests."],
  ["Do you assist with federal business filings?", "We provide administrative preparation and filing support for applicable federal business matters, based on your specific request and the information you provide."],
  ["Can filing approval or processing time be guaranteed?", "No. Acceptance, processing times and final decisions are controlled by the applicable government authority. Our role is independent preparation and administrative support."],
];

function FilingCard() {
  const [tick, setTick] = useState(2);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const filing = FILINGS[Math.floor(tick / 7) % FILINGS.length];
  const step = Math.min(tick % 7, 4);
  const finished = step === 4;
  return (
    <div className="llc-hero__card sf-card">
      <div className="sf-card__top">
        <span className="sf-card__icon"><FileText size={20} /></span>
        <span className={`sf-card__pill ${finished ? "is-done" : ""}`}><i />{finished ? "SUBMITTED" : "IN PROGRESS"}</span>
      </div>
      <div className="sf-card__head" key={filing.name}>
        <small>Filing request</small>
        <h2>{filing.name}</h2>
        <span>{filing.place} · preparation & support</span>
      </div>
      <ul className="sf-card__rows">
        {STAGES.map(([title, detail], i) => {
          const state = i < step ? "is-done" : i === step ? "is-active" : "";
          return (
            <li key={title} className={`sf-card__row ${state}`}>
              <span className="sf-card__num">{i < step ? <Check size={14} /> : i + 1}</span>
              <div><strong>{title}</strong><small>{detail}</small></div>
              {i === step && <span className="sf-card__dot" />}
            </li>
          );
        })}
      </ul>
      <div className="sf-card__bar"><b style={{ width: `${(step / 4) * 100}%` }} /></div>
      <p className="sf-card__note">Illustration only. Processing times are set by the agency.</p>
    </div>
  );
}

function ChangeFinder() {
  const [sel, setSel] = useState(0);
  const c = CHANGES[sel];
  return (
    <div className="sf-finder">
      <div className="sf-finder__grid">
        {CHANGES.map((x, i) => (
          <button type="button" key={x.title} className={`sf-change ${i === sel ? "is-selected" : ""}`} onClick={() => setSel(i)} aria-pressed={i === sel}>
            <span>{x.icon}</span>{x.title}
          </button>
        ))}
      </div>
      <div className="sf-panel" key={c.slug}>
        <div className="sf-panel__icon"><Sparkles size={22} /></div>
        <div className="sf-panel__body">
          <h3>{c.title}</h3>
          <p>{c.filing}</p>
          <div className="sf-panel__ready"><b>Have ready:</b>{c.ready.map((r) => <span key={r}>{r}</span>)}</div>
        </div>
        <Link to={`${LINKS.request}&topic=${c.slug}`} className="llc-cta__btn llc-cta__btn--gold">Get help with this <ArrowRight size={16} /></Link>
      </div>
    </div>
  );
}

function Readiness() {
  const [done, setDone] = useState([]);
  const toggle = (i) => setDone((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]));
  const pct = Math.round((done.length / ready.length) * 100);
  return (
    <div className="sf-check">
      <div className="sf-check__side">
        <div className="sf-check__ring" style={{ "--sf-p": pct }}><span>{pct}%</span></div>
        <h3>{pct === 100 ? "You're ready to go" : "Filing readiness"}</h3>
        <p>{done.length} of {ready.length} items gathered. Tap to tick them off.</p>
        {pct === 100 && <Link to={LINKS.request} className="llc-cta__btn llc-cta__btn--gold">Request filing help <ArrowRight size={16} /></Link>}
      </div>
      <ul className="sf-check__list">
        {ready.map((t, i) => (
          <li key={t}>
            <button type="button" className={done.includes(i) ? "is-done" : ""} onClick={() => toggle(i)} aria-pressed={done.includes(i)}>
              <span className="sf-check__box"><Check size={14} /></span>{t}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function StateFederalFilings() {
  const [heroRef, heroInView] = useInView();
  const marquee = [...strip, ...strip];

  return (
    <div className="svc biz-page sf-page">
      {/* HERO */}
      <section className="llc-hero" ref={heroRef}>
        <span className="sf-blob sf-blob--a" aria-hidden="true" />
        <span className="sf-blob sf-blob--b" aria-hidden="true" />
        <div className="container">
          <nav className="dba-crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link> / <Link to="/business">Services</Link> / <span>State &amp; federal filings</span>
          </nav>
          <div className="llc-hero__grid">
            <div className={`llc-hero__content ${heroInView ? "is-in" : ""}`}>
              <h1 className="llc-hero__title" style={{ "--d": 0 }}>Keep your business records accurate and up to date.</h1>
              <p className="llc-hero__subtitle" style={{ "--d": 1 }}>
                We help with state and federal filing preparation, updates, amendments, periodic reports, business-record changes and other administrative filing needs.
              </p>
              <div className="sf-chips" style={{ "--d": 2 }}>{heroChips.map((t) => <span key={t}><Check size={14} />{t}</span>)}</div>
              <div className="sf-cta-row" style={{ "--d": 3 }}>
                <Button to={LINKS.request}>Request filing assistance <ArrowRight size={18} /></Button>
                <a href={`tel:${CONTACT.phone}`} className="sf-ghost"><Phone size={16} /> Speak with our team</a>
              </div>
              {/* Trustpilot rating hidden for now
              <div className="llc-hero__trust" style={{ "--d": 4 }}>
                <strong>{TRUST_LABEL}</strong>
                <span className="llc-hero__stars">{[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#2fa24f" color="#2fa24f" />)}</span>
                <a className="llc-hero__badge corp-tp" href={TRUSTPILOT_URL} target="_blank" rel="noopener noreferrer"><Star size={12} fill="#ffffff" color="#ffffff" /> Trustpilot</a>
              </div>
              */}
            </div>
            <div className={`llc-hero__visual ${heroInView ? "is-in" : ""}`}><FilingCard /></div>
          </div>
        </div>
      </section>

      <div className="sf-marquee" aria-hidden="true">
        <div className="sf-marquee__track">{marquee.map((t, i) => <span key={i}><Check size={14} />{t}</span>)}</div>
      </div>

      {/* BUSINESS FILING SUPPORT */}
      <section className="dba-section">
        <div className="container">
          <Reveal className="dba-split">
            <div>
              <h2 className="dba-h2">Business records change as your company grows</h2>
              <p>You may need to file when company details change, when periodic reports come due, when you expand into another state, or when administrative matters need updating.</p>
              <p>Our team helps organize the information and documents needed for your filing request.</p>
            </div>
            <div className="sf-stack">
              {support.map((s) => (
                <div key={s.title} className="sf-stack__item"><span>{s.icon}</span><div><strong>{s.title}</strong><small>{s.text}</small></div></div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section className="dba-section dba-section--gray" id="sf-services">
        <div className="container">
          <h2 className="llc-section__title">State &amp; federal filing assistance</h2>
          <p className="llc-section__subtitle">From routine updates to more involved administrative filings, we assist with a range of business-record and compliance requests.</p>
          <Reveal className="dba-grid dba-grid-3">
            {services.map((s, i) => (
              <article key={s.title} className="sf-service">
                <span className="sf-service__no">{String(i + 1).padStart(2, "0")}</span>
                <div className="llc-reason__icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <ul>{s.items.map((it) => <li key={it}><Check size={15} />{it}</li>)}</ul>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* STATE SUPPORT */}
      <section className="dba-section">
        <div className="container">
          <h2 className="llc-section__title">Keep your state business records current</h2>
          <p className="llc-section__subtitle">Records may need updating when ownership, management, addresses, registered-agent details or other information change. Requirements vary by state, so each request is reviewed for the business and state involved.</p>
          <Reveal className="dba-grid dba-grid-3">
            {stateItems.map((s) => (
              <div key={s.title} className="sf-tile"><span>{s.icon}</span><div><strong>{s.title}</strong><small>{s.text}</small></div></div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* FEDERAL */}
      <section className="dba-section dba-section--soft">
        <div className="container">
          <Reveal className="dba-split">
            <div>
              <h2 className="dba-h2">Administrative support for applicable federal filings</h2>
              <p>Some business matters call for filings, updates, forms or correspondence with federal agencies. Our role is to help you organize your business information and prepare the applicable administrative documents.</p>
              <Button to={LINKS.request}>Request filing assistance <ArrowRight size={18} /></Button>
            </div>
            <ul className="sf-fed">
              {federalItems.map((t, i) => <li key={t} style={{ "--i": i }}><span><Check size={15} /></span>{t}</li>)}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* CHANGE FINDER */}
      <section className="dba-section">
        <div className="container">
          <h2 className="llc-section__title">When your business changes, your records may too</h2>
          <p className="llc-section__subtitle">Pick what changed to see how it's usually handled and what to have ready.</p>
          <Reveal><ChangeFinder /></Reveal>
        </div>
      </section>

      {/* DOCUMENT PREP + READINESS */}
      <section className="dba-section dba-section--gray">
        <div className="container">
          <h2 className="llc-section__title">Clear information before the filing is prepared</h2>
          <p className="llc-section__subtitle">Filing errors often come from incomplete or inconsistent details, so we start by reviewing what you have.</p>
          <Reveal className="dba-grid dba-grid-4">
            {prep.map((r) => (
              <div key={r.title} className="llc-reason"><div className="llc-reason__icon">{r.icon}</div><h3>{r.title}</h3><p>{r.text}</p></div>
            ))}
          </Reveal>
          <h3 className="sf-sub">Gather these before you start</h3>
          <Reveal><Readiness /></Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="dba-section dba-section--soft">
        <div className="container">
          <h2 className="llc-section__title">A simple filing assistance process</h2>
          <p className="llc-section__subtitle">We keep things organized from your first request through document preparation and filing support.</p>
          <Reveal className="sf-path">
            {process.map((s, i) => (
              <div key={s.title} className="sf-path__step" style={{ "--i": i }}>
                <span className="sf-path__icon">{s.icon}</span>
                <b>Step {i + 1}</b>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHY */}
      <section className="dba-section">
        <div className="container">
          <h2 className="llc-section__title">Professional filing support with clear communication</h2>
          <p className="llc-section__subtitle">Filings vary by state, agency, entity type and situation. Our process helps you understand what is needed and keeps your request organized.</p>
          <Reveal className="dba-grid dba-grid-4">
            {why.map((r) => (
              <div key={r.title} className="llc-reason"><div className="llc-reason__icon">{r.icon}</div><h3>{r.title}</h3><p>{r.text}</p></div>
            ))}
          </Reveal>
        </div>
      </section>

      <FaqList faqs={faqs} title="State &amp; federal filing FAQs" />

      <CtaBand title="Need help with a state or federal filing?" label="Request filing assistance" to={LINKS.request} />

      <ContactCards
        helpTitle="Tell us what you need to file"
        helpText="Share what you need to file, update or correct, and we'll help identify the next steps."
        helpLabel="Request filing assistance"
        helpTo={LINKS.request}
        phoneLabel="Call our team at"
      />

      <ServiceFooter
        disclaimer={<>Leader Business Developer is an independent business-services provider offering administrative, document-preparation and filing-support assistance. We are not a government agency. Filing requirements, government fees, deadlines, eligibility, acceptance and processing times vary by jurisdiction and applicable authority. Nothing on this page constitutes legal or tax advice.</>}
      />
    </div>
  );
}