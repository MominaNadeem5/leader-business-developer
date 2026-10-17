import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Check, Minus, ChevronDown, ArrowRight, /* Star, */ ShieldCheck, Users, FileCheck, Tag,
  TrendingUp, Landmark, BriefcaseBusiness, BadgeCheck, Clock, SlidersHorizontal, MessageSquare,
  ClipboardList, Building2, Award,
} from "lucide-react";
import Button from "../../../components/common/Button";
import useInView from "../../../hooks/useInView";
import { Reveal, FaqList, Testimonials, ContactCards, CtaBand, ServiceFooter } from "../../../components/service";
import "./Corporation.css";

/* ---- EDIT THESE ---- */
// const TRUSTPILOT_URL = "https://www.trustpilot.com/review/leaderbusiness.com"; // put your real Trustpilot page
// const TRUST_LABEL = "Excellent"; // only keep if it matches your real rating
const LINKS = { start: "/get-started?entity=corporation", samples: "/sample-documents", attorney: "/contact" };

const states = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
  "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
  "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
];

const packages = [
  { id: "essential", name: "Essential", price: "$0", tagline: "Get the core paperwork to start your corporation.",
    groups: [{ title: "Formation essentials", items: ["Corporation name guidance", "Articles of Incorporation preparation", "State filing instructions", "Digital formation checklist"] }] },
  { id: "growth", name: "Growth", price: "$249", badge: "Popular choice", tagline: "Build a stronger foundation for ownership and governance.",
    groups: [{ title: "Everything in Essential, plus", items: ["Corporate bylaws template", "Initial board resolutions template", "Stock issuance guidance", "EIN application guidance"] }] },
  { id: "complete", name: "Complete", price: "$399", badge: "Extra support", tagline: "More tools to organize and maintain your corporation.",
    groups: [{ title: "Everything in Growth, plus", items: ["Corporate records checklist", "Annual compliance reminders checklist", "Business document library", "Registered agent planning guidance"] }] },
];

const comparison = [
  { group: "Corporation formation", icon: <Landmark size={18} />, rows: [
    ["Corporation formation checklist", 1, 1, 1], ["Articles of Incorporation guidance", 1, 1, 1],
    ["State filing instructions", 1, 1, 1], ["Digital document checklist", 1, 1, 1],
    ["Corporate bylaws template", 0, 1, 1], ["Initial board resolutions template", 0, 1, 1],
  ]},
  { group: "Ownership and governance", icon: <Users size={18} />, rows: [
    ["Stock issuance guidance", 0, 1, 1], ["Shareholder record checklist", 0, 1, 1],
    ["Corporate records checklist", 0, 0, 1], ["Annual compliance checklist", 0, 0, 1],
  ]},
  { group: "Getting started", icon: <BriefcaseBusiness size={18} />, rows: [
    ["EIN application guidance", 0, 1, 1], ["Registered agent planning guidance", 0, 0, 1], ["Business document library", 0, 0, 1],
  ]},
];

const whyUs = [
  { icon: <Clock size={24} />, title: "Get going in minutes", text: "Answer a few questions and start your incorporation in three simple steps." },
  { icon: <SlidersHorizontal size={24} />, title: "Set it up the right way", text: "Step-by-step tools guide you through launching and protecting your new company." },
  { icon: <MessageSquare size={24} />, title: "Help when you need it", text: "Our team and network of professionals can support your launch and your growth." },
];

const whyCorp = [
  { icon: <TrendingUp size={24} />, title: "Attract investors", text: "Many investors favor corporations because you can offer them stock in your company." },
  { icon: <Award size={24} />, title: "Reward your team", text: "Draw in and keep strong talent with benefits packages that include company shares." },
  { icon: <BadgeCheck size={24} />, title: "Look more established", text: "Corporations are often viewed as more credible, which can make dealing with other companies easier." },
];

const sPoints = [
  ["Tax on profits only", "Income passes through to owners rather than being taxed at both company and shareholder level, which avoids double taxation."],
  ["Capped shareholders", "An S corp can have up to 100 shareholders, and all must be U.S. citizens or residents."],
  ["Common stock only", "Owners can hold only common stock, which carries voting rights."],
];
const cPoints = [
  ["Tax on income and profits", "The company pays corporate income tax, and shareholders then pay personal tax on what they receive."],
  ["No shareholder cap", "There is no limit on how many people can hold shares, or on who they can be."],
  ["Preferred stock available", "Preferred shares usually have no vote but are paid dividends before common shareholders."],
];

const steps = [
  { icon: <Tag />, title: "Pick and reserve a name", text: "A catchy, memorable name helps customers choose you. A name check is part of formation, and where your state allows it you can reserve the name." },
  { icon: <Users />, title: "Appoint a registered agent", text: "Most states require someone to accept lawsuits, subpoenas and official mail for your company. You can name us for the role to keep things easy." },
  { icon: <FileCheck />, title: "File articles of incorporation", text: "These form the charter of your company and usually go to the Secretary of State. Requirements differ by state." },
];
const afterFiling = ["Adopt bylaws", "Issue shares", "Hold board meetings", "Apply for an EIN", "File annual reports"];

const faqs = [
  ["How much does it cost to incorporate?", "Expect several kinds of cost: your state's fee to file the articles, a possible first-year franchise tax prepayment, assorted government filing fees, and attorney fees if you hire one. Our package prices exclude state fees."],
  ["S corp vs. LLC: what's the difference?", "Both protect owners from personal liability for business debts. LLCs have members, while corporations have shareholders and generally more formal record-keeping and reporting. LLCs are easier to run, but investors often prefer corporations."],
  ["How does a corporation protect my assets?", "It helps ensure that you and the other shareholders are not personally responsible for the company's debts and liabilities, subject to applicable law."],
  ["What are articles of incorporation?", "They are the document that creates your corporation as its own legal entity. They become a public record and typically list the name, contact details and share information. Exact content varies by state."],
  ["What are shares, and what types exist?", "Shares are units of ownership. Common shares carry voting rights and may receive dividends. Preferred shares are paid ahead of common shares for dividends and, if the company becomes insolvent, for payouts."],
  ["Does a corporation need a board of directors?", "Corporations generally have a board, although the rules and permitted arrangements depend on your state and the type of corporation."],
  ["Does a corporation need an EIN?", "Most do, for federal tax purposes, hiring employees or opening bank accounts. Check IRS guidance for your situation."],
  ["Are there ongoing requirements?", "Often, yes. Depending on your state you may need annual reports, fees, meeting minutes and corporate records."],
];

// Add real customer reviews here. The grid grows automatically.
const testimonials = [
  { quote: "Leader Business Developer was an incredible partner. The process was smooth, and the support team was always available when I needed help.", name: "Shannon Greevy", role: "Customer, California" },
];

const ROAD = [
  ["Choose a name", "Name check and reservation"],
  ["Appoint an agent", "Registered agent"],
  ["File your articles", "Articles of incorporation"],
  ["Set up governance", "Bylaws, board and shares"],
  ["Prepare to operate", "EIN and compliance"],
];

function CorpCard() {
  const [active, setActive] = useState(2);
  useEffect(() => {
    const id = setInterval(() => setActive((n) => (n + 1) % (ROAD.length + 1)), 2400);
    return () => clearInterval(id);
  }, []);
  const finished = active === ROAD.length;
  return (
    <div className="llc-hero__card corp-card">
      <div className="corp-card__top">
        <span className="corp-card__icon"><Landmark size={20} /></span>
        <span className={`corp-card__pill ${finished ? "is-done" : ""}`}><i />{finished ? "READY TO OPERATE" : "FORMATION ROADMAP"}</span>
      </div>
      <h2 className="corp-card__title">Your corporation, step by step</h2>
      <ul className="corp-card__rows">
        {ROAD.map(([title, detail], i) => {
          const state = i < active ? "is-done" : i === active ? "is-active" : "";
          return (
            <li key={title} className={`corp-card__row ${state}`}>
              <span className="corp-card__num">{i < active ? <Check size={14} /> : i + 1}</span>
              <div><strong>{title}</strong><small>{detail}</small></div>
              {i === active && <span className="corp-card__dot" />}
            </li>
          );
        })}
      </ul>
      <div className="corp-card__foot">
        <span>{finished ? "All steps complete" : `${active} of ${ROAD.length} complete`}</span>
        <span className="corp-card__bar"><b style={{ width: `${(active / ROAD.length) * 100}%` }} /></span>
      </div>
    </div>
  );
}

export default function Corporation() {
  const navigate = useNavigate();
  const [heroRef, heroInView] = useInView();
  const [businessName, setBusinessName] = useState("");
  const [nameError, setNameError] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [showFeatures, setShowFeatures] = useState(false);
  const [showAllStates, setShowAllStates] = useState(false);

  const formLink = selectedState ? `${LINKS.start}&state=${encodeURIComponent(selectedState)}` : LINKS.start;

  const checkName = (e) => {
    e.preventDefault();
    if (!businessName.trim()) { setNameError("Enter the name you'd like to check."); return; }
    navigate(`${LINKS.start}&name=${encodeURIComponent(businessName.trim())}`);
  };

  return (
    <div className="svc corp-page">
      {/* HERO */}
      <section className="llc-hero" ref={heroRef}>
        <div className="container">
          <nav className="dba-crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link> / <Link to="/business">Business formation</Link> / <span>Corporation</span>
          </nav>
          <div className="llc-hero__grid">
            <div className={`llc-hero__content ${heroInView ? "is-in" : ""}`}>
              <h1 className="llc-hero__title" style={{ "--d": 0 }}>Incorporating your business has never been simpler</h1>
              <p className="llc-hero__subtitle" style={{ "--d": 1 }}>
                Launching as a corporation, whether you're eyeing crowdfunding or an eventual public offering? We'll support you at every step.
                Starts at <strong className="dba-price">{packages[0].price}</strong> + state filing fees.
              </p>

              <form className="llc-hero__form corp-name-form" style={{ "--d": 2 }} onSubmit={checkName}>
                <input
                  className="llc-hero__select"
                  value={businessName}
                  onChange={(e) => { setBusinessName(e.target.value); setNameError(""); }}
                  placeholder="Enter your corporation name"
                  aria-label="Proposed corporation name"
                />
                <button type="submit" className="corp-submit">Check availability <ArrowRight size={18} /></button>
              </form>
              {nameError && <p className="corp-name-error" role="alert">{nameError}</p>}
              <p className="corp-hero__note" style={{ "--d": 3 }}>
                <a href="#corp-pricing">See pricing options.</a> Formation costs may be tax deductible, so ask your tax advisor.
              </p>

              {/* Trustpilot */}
              <div className="llc-hero__trust" style={{ "--d": 4 }}>
                {/* Trustpilot rating hidden for now
                <strong>{TRUST_LABEL}</strong>
                <span className="llc-hero__stars">{[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#00b67a" color="#00b67a" />)}</span>
                <a className="llc-hero__badge corp-tp" href={TRUSTPILOT_URL} target="_blank" rel="noopener noreferrer">
                  <Star size={12} fill="#fff" color="#fff" /> Trustpilot
                </a>
                <span className="llc-hero__sep" />
                */}
                <a href="#corp-guarantee" className="dba-guarantee-link"><ShieldCheck size={16} /> Learn about our guarantee</a>
              </div>
            </div>
            <div className={`llc-hero__visual ${heroInView ? "is-in" : ""}`}><CorpCard /></div>
          </div>
        </div>
      </section>

      {/* WHY US + GUARANTEE */}
      <section className="dba-section">
        <div className="container">
          <h2 className="llc-section__title">Why incorporate with us?</h2>
          <Reveal className="dba-grid dba-grid-3 dba-mt">
            {whyUs.map((r) => (
              <div key={r.title} className="llc-reason"><div className="llc-reason__icon">{r.icon}</div><h3>{r.title}</h3><p>{r.text}</p></div>
            ))}
          </Reveal>
          <Reveal>
            <div className="dba-guarantee" id="corp-guarantee">
              <ShieldCheck size={40} />
              <p><strong>100% accurate filing commitment.</strong> If your filing is rejected or incorrect because of our error, we'll correct it with the government agency at no extra cost to you.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="llc-packages dba-section--gray" id="corp-pricing">
        <div className="container">
          <h2 className="llc-section__title">Choose the support that fits your plans</h2>
          <p className="llc-section__subtitle">Compare starting options for your corporation. State filing fees and third-party costs may be additional.</p>
          <Reveal className="dba-grid dba-grid-3">
            {packages.map((pkg) => (
              <article key={pkg.id} className={`llc-package-card ${pkg.id === "growth" ? "is-featured" : ""}`}>
                {pkg.badge && <span className="llc-package-card__badge">{pkg.badge}</span>}
                <h3 className="llc-package-card__name">{pkg.name}</h3>
                <div className="llc-package-card__price">
                  <span className="llc-package-card__amount">{pkg.price}</span>
                  <span className="llc-package-card__fees">+ state fees</span>
                </div>
                <p className="llc-package-card__tagline">{pkg.tagline}</p>
                <Button variant={pkg.id === "growth" ? "primary" : "outline"} to={`${formLink}&package=${pkg.id}`} className="llc-package-card__btn">Choose {pkg.name}</Button>
                {pkg.groups.map((g) => (
                  <div key={g.title} className="llc-package-card__group">
                    <h4>{g.title}</h4>
                    <ul>{g.items.map((it) => <li key={it}><Check size={16} />{it}</li>)}</ul>
                  </div>
                ))}
              </article>
            ))}
          </Reveal>

          <div className="llc-features-toggle-wrap">
            <button type="button" className={`llc-features-toggle ${showFeatures ? "is-open" : ""}`} onClick={() => setShowFeatures((o) => !o)} aria-expanded={showFeatures}>
              {showFeatures ? "Hide package comparison" : "Compare all package features"} <ChevronDown size={18} />
            </button>
          </div>
          {showFeatures && (
            <div className="llc-table-wrap">
              <table className="llc-table">
                <thead><tr><th>Included features</th>{packages.map((p) => <th key={p.id}>{p.name}<span>{p.price}</span></th>)}</tr></thead>
                {comparison.map((g) => (
                  <tbody key={g.group}>
                    <tr className="llc-table__group"><td colSpan={4}>{g.icon}{g.group}</td></tr>
                    {g.rows.map(([label, a, b, c]) => (
                      <tr key={label}>
                        <td>{label}</td>
                        {[a, b, c].map((v, i) => <td key={i}>{v ? <Check size={18} className="llc-yes" /> : <Minus size={18} className="llc-no" />}</td>)}
                      </tr>
                    ))}
                  </tbody>
                ))}
              </table>
            </div>
          )}
        </div>
      </section>

      {/* WHAT IS A CORPORATION */}
      <section className="dba-section">
        <div className="container">
          <Reveal className="dba-split">
            <div>
              <h2 className="dba-h2">What is a corporation?</h2>
              <p>A corporation is a business entity created by filing formation documents with the state, a process known as incorporation.</p>
              <p>Like an LLC, a corporation is a legal entity separate from its owners, which can shield you from business debts and liabilities. Corporations add further advantages, such as shareholders and the ability to bring in outside investors.</p>
              <Button to={LINKS.start}>Start my corporation <ArrowRight size={18} /></Button>
            </div>
            <div className="corp-org" aria-hidden="true">
              <div className="corp-org__top"><Building2 size={18} /> HOW A CORPORATION IS ORGANIZED</div>
              <div className="corp-org__level is-top"><Users size={18} /><div><strong>Shareholders</strong><small>Own shares in the company</small></div></div>
              <span className="corp-org__line" />
              <div className="corp-org__level"><Landmark size={18} /><div><strong>Board of directors</strong><small>Sets the company's direction</small></div></div>
              <span className="corp-org__line" />
              <div className="corp-org__level"><BriefcaseBusiness size={18} /><div><strong>Officers and team</strong><small>Run day-to-day operations</small></div></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHY START */}
      <section className="dba-section dba-section--gray">
        <div className="container">
          <h2 className="llc-section__title">Why start a corporation?</h2>
          <Reveal className="dba-grid dba-grid-3 dba-mt">
            {whyCorp.map((r) => (
              <div key={r.title} className="llc-reason"><div className="llc-reason__icon">{r.icon}</div><h3>{r.title}</h3><p>{r.text}</p></div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* BENEFITS + REQUIREMENTS */}
      <section className="dba-section">
        <div className="container">
          <Reveal className="dba-grid dba-grid-2 corp-info">
            <div className="corp-info__card">
              <ShieldCheck size={28} />
              <h2>Corporation benefits</h2>
              <p>Incorporating brings liability protection, meaning owners are generally not personally responsible for business obligations such as debts or lawsuits. It also lets you add shareholders and raise money from outside investors.</p>
            </div>
            <div className="corp-info__card">
              <ClipboardList size={28} />
              <h2>Corporation requirements</h2>
              <p>Corporations typically adopt bylaws, hold annual shareholder meetings, record written resolutions for major decisions and file annual reports. Our service helps you form correctly, and our packages include documents to help you stay compliant.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* LLC VS CORP CALLOUT */}
      <section className="dba-section dba-section--soft">
        <div className="container dba-narrow">
          <Reveal className="dba-callout">
            <h2 className="dba-h2">Is a limited liability company a corporation?</h2>
            <p>No, an LLC is a different type of entity with its own formation, tax and ownership rules. LLCs usually offer more flexible taxation and lighter reporting, while corporations make it easier to transfer ownership through shares and to attract outside investors.</p>
            <Button to={LINKS.start}>Start my corporation <ArrowRight size={18} /></Button>
          </Reveal>
        </div>
      </section>

      {/* S VS C */}
      <section className="llc-vs">
        <div className="container">
          <h2 className="llc-section__title">S corporation vs. C corporation: what's the difference?</h2>
          <p className="llc-section__subtitle">Both are valid choices when you incorporate, and we can help with either. Weigh the pros and cons first. S corp status is a tax election, and tax outcomes depend on your circumstances.</p>
          <Reveal className="dba-grid dba-grid-2">
            {[["S corporation", sPoints], ["C corporation", cPoints]].map(([title, pts]) => (
              <div key={title} className="llc-vs__col">
                <h3>{title}</h3>
                <ul>{pts.map(([h, t]) => <li key={h}><Check size={18} /><div><strong>{h}</strong><span>{t}</span></div></li>)}</ul>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand title="Ready to start your corporation?" label="Start my corporation" to={LINKS.start} />

      {/* HOW TO INCORPORATE */}
      <section className="llc-steps">
        <div className="container">
          <h2 className="llc-section__title">How to incorporate</h2>
          <p className="llc-section__subtitle">Three core steps get your corporation on the books. Requirements vary by state.</p>
          <Reveal className="dba-grid dba-grid-3">
            {steps.map((s, i) => (
              <div key={s.title} className="llc-step">
                <span className="llc-step__num">{i + 1}</span>
                <div className="llc-step__icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </Reveal>
          <p className="corp-after-title">After you file</p>
          <div className="dba-chips">{afterFiling.map((t) => <span key={t}>{t}</span>)}</div>
          <div className="llc-center dba-actions">
            <Link to={LINKS.samples} className="llc-link-btn">See sample documents</Link>
            <Button to={LINKS.start}>Start my corporation <ArrowRight size={18} /></Button>
          </div>
        </div>
      </section>

      {/* STATES */}
      <section className="llc-states dba-section--gray">
        <div className="container">
          <h2 className="llc-section__title">Where will you incorporate?</h2>
          <p className="llc-section__subtitle">Fees, naming rules and reporting duties differ by state. Pick yours to continue.</p>
          <div className="llc-states__grid">
            {(showAllStates ? states : states.slice(0, 12)).map((s) => (
              <button key={s} type="button" className={`llc-state ${selectedState === s ? "is-selected" : ""}`} onClick={() => setSelectedState(s)}>
                {s} {selectedState === s ? <Check size={15} /> : <span>INC</span>}
              </button>
            ))}
          </div>
          <div className="llc-center dba-actions">
            <button type="button" className="llc-link-btn" onClick={() => setShowAllStates((o) => !o)}>{showAllStates ? "Show less" : "Show all 50 states"}</button>
            <Button to={formLink} disabled={!selectedState}>{selectedState ? `Continue with ${selectedState}` : "Select a state to continue"} <ArrowRight size={18} /></Button>
          </div>
        </div>
      </section>

      <FaqList faqs={faqs} />

      <CtaBand title="Ready to start your corporation?" label="Start my corporation" to={LINKS.start} />

      <Testimonials items={testimonials} title="What our customers are saying" />

      <ContactCards helpTo={LINKS.attorney} />

      <ServiceFooter
        disclaimer={<>Leader Business Developer provides business formation and administrative filing support. Requirements, fees and processing times vary by jurisdiction. Package information is illustrative unless confirmed by the business. This page is for general information and is not legal or tax advice.</>}
      />
    </div>
  );
}