import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Check, Minus, ChevronDown, ArrowRight, /* Star, */ Award, ShieldCheck, Shield, Scale, FileText,
  Phone, Mail, Users, Building2, FileCheck, BookOpen, CreditCard, Building, Tag, TrendingUp, Landmark,
} from "lucide-react";
import Button from "../../../components/common/Button";
import useInView from "../../../hooks/useInView";
import FormationCard from "../FormationCard/FormationCard";
import { FaqList } from "../../../components/service";
import { CONTACT } from "../../../data/site";
import "./StartLLC.css";


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
  {
    id: "basic", name: "Basic", price: "$0",
    tagline: "I only need what it takes to make my business official.",
    groups: [{ title: "Formation essentials", items: ["Name check service", "State filing (Articles of Organization)", "Tax consult from 1-800Accountant"] }],
  },
  {
    id: "pro", name: "Pro", price: "$249", badge: "Most popular",
    tagline: "Attorney guidance when you need it, plus a full business starter kit.",
    groups: [
      { title: "Everything in Basic, plus", items: ["Operating agreement", "EIN (federal tax ID)", "Unlimited 30-min attorney consultations (30 days)"] },
      { title: "Service & support", items: ["Guidance from experienced business attorneys", "150+ customizable legal documents", "Unlimited eSignatures (1 year)", "Customizable website powered by Wix"] },
    ],
  },
  {
    id: "premium", name: "Premium", price: "$299", badge: "Full toolkit",
    tagline: "Operate your business and manage cash flow with ease.",
    groups: [
      { title: "Everything in Pro, plus", items: ["Bookkeeping tools (6 months)", "Unlimited proposals and invoices", "Income and expense tracking", "Automatic mileage capture"] },
    ],
  },
];

// [feature, basic, pro, premium]
const comparison = [
  { group: "Business formation essentials", icon: <Landmark size={18} />, rows: [
    ["Articles of organization", 1, 1, 1], ["Name check service", 1, 1, 1],
    ["Business filing service", 1, 1, 1], ["Digital welcome packet", 1, 1, 1],
    ["Operating agreement", 0, 1, 1], ["Federal Tax ID Number (EIN)", 0, 1, 1],
  ]},
  { group: "Service & support", icon: <Scale size={18} />, rows: [
    ["Unlimited 30-min attorney consultations", 0, 1, 1], ["Attorney review of legal contracts", 0, 1, 1],
    ["One-time tax savings consult (1-800Accountant)", 1, 1, 1], ["Unlimited year-round tax consults", 0, 1, 1],
  ]},
  { group: "Additional business services", icon: <TrendingUp size={18} />, rows: [
    ["Business insurance quote from NEXT", 1, 1, 1], ["Customizable website powered by Wix", 0, 1, 1],
    ["Library of 150+ legal forms (1 year)", 0, 1, 1], ["Unlimited eSignatures (1 year)", 0, 1, 1],
    ["Bookkeeping app (invoices, expenses, deductions)", 0, 0, 1], ["One copyright registration per month", 0, 1, 1],
  ]},
];

const reasons = [
  { icon: <Shield size={24} />, title: "Protect your assets", text: "Keep personal finances separate and shield your home, car and savings from business debts and lawsuits." },
  { icon: <FileText size={24} />, title: "Make things easier", text: "An LLC is simpler to form than a corporation, with lighter rules for record-keeping and meetings." },
  { icon: <TrendingUp size={24} />, title: "Get tax flexibility", text: "Choose how you're taxed, as a pass-through entity or a corporation, to keep more of what you earn." },
];

const llcPoints = [
  ["Flexible management", "Owners decide how the business is run, with no board required."],
  ["More taxation options", "Profits pass through to your personal return, or elect corporate treatment."],
  ["Minimal record-keeping", "No annual shareholder meeting or corporate minutes."],
];
const corpPoints = [
  ["Owned by shareholders", "Corporations issue stock to shareholders instead of having members."],
  ["Look more official", "Often seen as more credible when dealing with larger companies."],
  ["Appealing to investors", "A C corp can issue stock and raise capital more easily."],
];

const steps = [
  { icon: <Tag />, title: "Choose & check a name", text: "Pick a unique name that follows your state's rules. We check availability for you." },
  { icon: <Users />, title: "Pick a registered agent", text: "Someone who receives legal notices for your LLC. Most states require it, and we can do it for you." },
  { icon: <FileCheck />, title: "File articles of organization", text: "The official form with your business details, filed with your Secretary of State." },
  { icon: <BookOpen />, title: "Craft an operating agreement", text: "Define ownership, voting and profit distribution to limit disagreements later." },
  { icon: <CreditCard />, title: "Get an EIN", text: "Your federal tax ID for banking, taxes and hiring." },
  { icon: <Building />, title: "Open a business bank account", text: "Keep finances separate to maintain your liability protection." },
];

const faqs = [
  ["What is an LLC?", "An LLC (Limited Liability Company) combines the liability protection of a corporation with the tax flexibility of a partnership. It is formed at the state level and recognized in all 50 states."],
  ["How much does it cost to form an LLC?", "Our plans start at $0 plus state filing fees. State fees range from roughly $40 to $500 depending on where you form, and some states charge annual report fees or franchise taxes."],
  ["How long does it take?", "Standard state processing typically takes 1-4 weeks, while expedited filing can take 1-3 business days in most states."],
  ["Do I need a lawyer to form an LLC?", "No. Our platform guides you step by step. If you have multiple owners or complex needs, the Pro and Premium packages include attorney guidance."],
  ["What is a registered agent?", "A person or entity designated to receive legal documents on behalf of your business. Every LLC needs one in the state where it is formed."],
  ["Do I need an operating agreement?", "It isn't always required by law, but it is highly recommended. It outlines ownership, voting rights and profit distribution. Pro and Premium include one."],
  ["LLC vs. S corp: what's the difference?", "An LLC is a business entity, while an S corp is a special federal tax election. An LLC or C corp that meets certain requirements can elect S corp tax treatment."],
  ["How do I get an EIN?", "An EIN is like a Social Security number for your business. Pro and Premium include EIN service, or you can apply directly to the IRS for free."],
];

export default function StartLLC() {
  const [selectedState, setSelectedState] = useState("");
  const [showFeatures, setShowFeatures] = useState(false);
  const [showAllStates, setShowAllStates] = useState(false);
  const [heroRef, heroInView] = useInView();
  const [pricingRef, pricingInView] = useInView();
  const [reasonsRef, reasonsInView] = useInView();

  const formLink = selectedState ? `/get-started?state=${encodeURIComponent(selectedState)}` : "#";
  const pickState = (s) => {
    setSelectedState(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="svc llc-page">
      {/* HERO (compact) */}
      <section className="llc-hero" ref={heroRef}>
        
        <div className="container llc-hero__grid">
          
          <div className={`llc-hero__content ${heroInView ? "is-in" : ""}`}>
            <h1 className="llc-hero__title" style={{ "--d": 0 }}>
              Whether you're ready to form an LLC on your own—or want advice every step of the way—we've got your back.
            </h1>
            <p className="llc-hero__subtitle" style={{ "--d": 1 }}>
              Have questions? Call <a href={`tel:${CONTACT.phone}`}>{CONTACT.phone}</a> or email{" "}
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> to speak with a business specialist.
            </p>

            <div className="llc-hero__form" style={{ "--d": 2 }}>
              <select className="llc-hero__select" value={selectedState} onChange={(e) => setSelectedState(e.target.value)} aria-label="Select your state">
                <option value="">Select your state</option>
                {states.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <Button to={formLink} disabled={!selectedState}>Form my LLC <ArrowRight size={18} /></Button>
            </div>

            <div className="llc-hero__trust" style={{ "--d": 3 }}>
              {/* Trustpilot rating hidden for now
              <span className="llc-hero__stars">{[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />)}</span>
              <strong>Excellent</strong>
              <span className="llc-hero__badge">Trustpilot</span>
              <span className="llc-hero__sep" />
              */}
              <span className="llc-hero__trust-item"><Award size={16} /> 50,000+ businesses formed</span>
            </div>
          </div>

          <div className={`llc-hero__visual ${heroInView ? "is-in" : ""}`}>
            <FormationCard />
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="llc-packages" id="llc-pricing" ref={pricingRef}>
        <div className="container">
          <h2 className="llc-section__title">Find the right fit for your business</h2>
          <p className="llc-section__subtitle">Choose the level of support that matches your needs and budget.</p>

          <div className={`llc-packages__grid ${pricingInView ? "is-in" : ""}`}>
            {packages.map((pkg) => (
              <article key={pkg.id} className={`llc-package-card ${pkg.id === "pro" ? "is-featured" : ""}`}>
                {pkg.badge && <span className="llc-package-card__badge">{pkg.badge}</span>}
                <h3 className="llc-package-card__name">{pkg.name}</h3>
                <div className="llc-package-card__price">
                  <span className="llc-package-card__amount">{pkg.price}</span>
                  <span className="llc-package-card__fees">+ state filing fees</span>
                </div>
                <p className="llc-package-card__tagline">{pkg.tagline}</p>
                <Button variant={pkg.id === "pro" ? "primary" : "outline"} to="/get-started" className="llc-package-card__btn">Form my LLC</Button>
                {pkg.groups.map((g) => (
                  <div key={g.title} className="llc-package-card__group">
                    <h4>{g.title}</h4>
                    <ul>{g.items.map((it) => <li key={it}><Check size={16} />{it}</li>)}</ul>
                  </div>
                ))}
              </article>
            ))}
          </div>

          <div className="llc-features-toggle-wrap">
            <button type="button" className={`llc-features-toggle ${showFeatures ? "is-open" : ""}`} onClick={() => setShowFeatures((o) => !o)} aria-expanded={showFeatures}>
              {showFeatures ? "Hide detailed features" : "See detailed features"} <ChevronDown size={18} />
            </button>
          </div>

          {showFeatures && (
            <div className="llc-table-wrap">
              <table className="llc-table">
                <thead>
                  <tr>
                    <th>What's included</th>
                    {packages.map((p) => <th key={p.id}>{p.name}<span>{p.price}</span></th>)}
                  </tr>
                </thead>
                {comparison.map((g) => (
                  <tbody key={g.group}>
                    <tr className="llc-table__group"><td colSpan={4}>{g.icon}{g.group}</td></tr>
                    {g.rows.map(([name, b, p, pr]) => (
                      <tr key={name}>
                        <td>{name}</td>
                        {[b, p, pr].map((v, i) => (
                          <td key={i}>{v ? <Check size={18} className="llc-yes" /> : <Minus size={18} className="llc-no" />}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                ))}
              </table>
            </div>
          )}
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="llc-guarantee">
        <div className="container llc-guarantee__inner">
          <ShieldCheck size={40} />
          <p><strong>Accurate filing commitment.</strong> If your filing is rejected or incorrect due to our error, we'll correct it with the state agency at no additional cost to you.</p>
        </div>
      </section>

      {/* 3 REASONS */}
      <section className="llc-reasons" ref={reasonsRef}>
        <div className="container">
          <h2 className="llc-section__title">3 reasons for creating an LLC</h2>
          <div className={`llc-reasons__grid ${reasonsInView ? "is-in" : ""}`}>
            {reasons.map((r) => (
              <div key={r.title} className="llc-reason">
                <div className="llc-reason__icon">{r.icon}</div>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </div>
            ))}
          </div>
          <div className="llc-center"><Button to="/get-started">Start my LLC <ArrowRight size={18} /></Button></div>
        </div>
      </section>

      {/* LLC VS CORP */}
      <section className="llc-vs">
        <div className="container">
          <h2 className="llc-section__title">LLC vs. corporation: what's the difference?</h2>
          <div className="llc-vs__grid">
            {[["LLC", llcPoints, <Building2 size={20} key="a" />], ["Corporation", corpPoints, <Landmark size={20} key="b" />]].map(([title, pts, icon]) => (
              <div key={title} className="llc-vs__col">
                <h3>{icon}{title}</h3>
                <ul>{pts.map(([h, t]) => <li key={h}><Check size={18} /><div><strong>{h}</strong><span>{t}</span></div></li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW TO START */}
      <section className="llc-steps">
        <div className="container">
          <h2 className="llc-section__title">How to start an LLC</h2>
          <p className="llc-section__subtitle">To form an LLC you file articles of organization with the state. Here's the path from idea to open for business.</p>
          <div className="llc-steps__grid">
            {steps.map((s, i) => (
              <div key={s.title} className="llc-step">
                <span className="llc-step__num">{i + 1}</span>
                <div className="llc-step__icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqList faqs={faqs} />

      {/* STATES */}
      <section className="llc-states">
        <div className="container">
          <h2 className="llc-section__title">Find the right state to form an LLC</h2>
          <p className="llc-section__subtitle">Every state has different rules, costs and considerations. Pick yours to get started.</p>
          <div className="llc-states__grid">
            {(showAllStates ? states : states.slice(0, 12)).map((s) => (
              <button key={s} type="button" className={`llc-state ${selectedState === s ? "is-selected" : ""}`} onClick={() => pickState(s)}>
                {s} <span>LLC</span>
              </button>
            ))}
          </div>
          <div className="llc-center">
            <button type="button" className="llc-link-btn" onClick={() => setShowAllStates((o) => !o)}>
              {showAllStates ? "Show less" : "Show all 50 states"}
            </button>
          </div>
        </div>
      </section>

      {/* CTA + CONTACT */}
      <section className="llc-cta">
        <div className="container">
          <div className="llc-cta__banner">
            <div>
              <h2>Ready to get your LLC?</h2>
              <p>Pick your package, tell us your state, and our team will guide you through the next steps.</p>
            </div>
            <div className="llc-cta__actions">
              <a href="#llc-pricing" className="llc-cta__btn llc-cta__btn--gold">View pricing <ChevronDown size={16} /></a>
              <Link to="/contact" className="llc-cta__btn llc-cta__btn--ghost">Contact our team <ArrowRight size={16} /></Link>
            </div>
          </div>

          <div className="llc-contact">
            <h3>Questions?</h3>
            <p>Talk to a business specialist. We're happy to help.</p>
            <div className="llc-contact__links">
              <a href={`tel:${CONTACT.phone}`}><Phone size={18} />{CONTACT.phone}</a>
              <a href={`mailto:${CONTACT.email}`}><Mail size={18} />{CONTACT.email}</a>
            </div>
          </div>

          <p className="llc-cta__disclaimer">
            Leader Business Developer provides business formation and administrative filing support. State filing fees, requirements, processing times and available documents vary by jurisdiction. Government acceptance and processing are controlled by the applicable state authority. Nothing on this page constitutes legal or tax advice.
          </p>
        </div>
      </section>
    </div>
  );
}