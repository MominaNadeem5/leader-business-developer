import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Check, Minus, ChevronDown, ArrowRight, /* Star, */ ShieldCheck, Phone, Clock, MessageSquare, FileText,
  Landmark, Building2, MapPin, FileCheck, BadgeCheck, Trophy, Zap, Target, PiggyBank, Smile,
  Coffee, ShoppingBag, Home, Hammer, Briefcase, Store, Bell, FolderOpen, Sparkles,
} from "lucide-react";
import Button from "../../../components/common/Button";
import useInView from "../../../hooks/useInView";
import { Reveal, FaqList, Testimonials, ContactCards, ServiceFooter, CtaBand } from "../../../components/service";
import { CONTACT } from "../../../data/site";
import "./Businesslicenses.css";

/* ---- EDIT THESE ---- */
// const TRUSTPILOT_URL = "https://www.trustpilot.com/review/leaderbusiness.com"; // your real Trustpilot page
// const TRUST_LABEL = "Excellent"; // keep only if it matches your real rating
const PRICES = { report: "$99", compliance: "$299", manager: "$999" }; // placeholder prices, set your own
const LINKS = { start: "/get-started?service=business-license", attorney: "/contact" };
const BILLING_NOTE = "Billed yearly. Terms shown at checkout.";

const EXAMPLES = [
  { biz: "Café", place: "Austin, TX", items: [["General business license", "Local"], ["Food service permit", "State"], ["Health department permit", "Local"], ["Seller's permit", "State"]] },
  { biz: "Online store", place: "Denver, CO", items: [["Seller's permit", "State"], ["General business license", "Local"], ["Business registration", "State"], ["Home occupation permit", "Local"]] },
  { biz: "Photographer", place: "Miami, FL", items: [["General business license", "Local"], ["DBA registration", "State"], ["Home occupation permit", "Local"], ["Sales tax registration", "State"]] },
];

const plans = [
  { id: "report", name: "License Report", price: PRICES.report, tagline: "Find the licenses and permits you need to operate legally, and stay on top of requirements all year.", cta: "Find my business licenses",
    features: ["A custom summary of the federal, state and local licenses, permits and registrations your business may need", "Plain-language details on each one and why it matters", "Alerts when requirements or deadlines change", "One secure place to upload, view and share your licenses", "Personal support from our licensing specialists"] },
  { id: "compliance", name: "Licenses + Compliance Filings", price: PRICES.compliance, badge: "Recommended", tagline: "A license report plus ongoing compliance, business tax preparation, attorney-tracked updates and alerts.", cta: "Get compliant now", lead: "Everything in License Report, plus:",
    features: ["Automatic annual report filing† to meet ongoing state requirements", "Amendment filings with the state for business changes", "Business taxes prepared by independent tax professionals", "Compliance alerts tailored to your business", "AI-assisted meeting minutes for your records", "Attorney-tracked updates to filing rules", "Personalized compliance support", "Accurate filing commitment‡"] },
  { id: "manager", name: "Business Manager", price: PRICES.manager, badge: "Full service", tagline: "Hand your compliance to a trained, dedicated manager who handles it start to finish.", cta: "Talk to a business manager", lead: "Everything in Licenses + Compliance, plus:", call: true,
    features: ["Hands-on management of your compliance by a dedicated Business Manager", "Unlimited phone and email access", "Regular check-ins to spot gaps and risks early", "An initial review of your standing and a plan for your needs", "Timely updates on what we're doing for you", "Quick responses when compliance issues come up", "Create, sign and manage documents online", "Access to full-service solutions such as certificates of good standing and amendments"] },
];

const compare = [
  ["Custom license report", 1, 1, 1], ["License alerts & updates", 1, 1, 1], ["Secure document storage", 1, 1, 1],
  ["Annual report auto-filing†", 0, 1, 1], ["Amendment filings", 0, 1, 1], ["Business tax preparation", 0, 1, 1],
  ["Attorney-tracked rule updates", 0, 1, 1], ["AI-assisted meeting minutes", 0, 1, 1],
  ["Dedicated Business Manager", 0, 0, 1], ["Unlimited phone & email access", 0, 0, 1],
  ["Regular compliance check-ins", 0, 0, 1], ["End-to-end filing execution", 0, 0, 1],
];

const whyUs = [
  { icon: <Trophy size={24} />, title: "Confidence", text: "Operate knowing you hold the licenses and permits you need. We look at federal, state and local requirements and give you a report built around your operations." },
  { icon: <Zap size={24} />, title: "Speed", text: "Skip hours of digging through government sites. Get a clear summary of what applies to you so you can go straight to applying." },
  { icon: <ShieldCheck size={24} />, title: "End-to-end compliance", text: "From government filings to annual reports and alerts, we help you steer clear of penalties, and specialists are on hand for questions." },
];

const steps = [
  { icon: <MessageSquare size={20} />, title: "Tell us about your business", text: "Answer a few questions about what you do and where you operate so your report fits you." },
  { icon: <FileText size={20} />, title: "Receive your custom report", text: "Get a personalized report explaining each license, permit and registration you may need." },
  { icon: <BadgeCheck size={20} />, title: "Apply for your licenses", text: "Your report links to each application and includes tips for filling it in well." },
];

const examples = ["Home occupation permit", "Health department permit", "Seller's permit", "Sales tax license", "Zoning permit", "Building permit", "Music license", "Alcohol license"];

const helpWhy = [
  { icon: <Target size={24} />, title: "Focus on what matters", text: "Most small businesses need several licenses. We help you pinpoint yours so you can get back to running the business." },
  { icon: <PiggyBank size={24} />, title: "Avoid fines", text: "Missing licenses and permits can bring penalties and fines, and even put your business at risk of closing." },
  { icon: <Smile size={24} />, title: "Enjoy peace of mind", text: "Feel secure that you're operating legally, with the licenses, permits and registrations your business really needs." },
];

const LEVELS = [
  { id: "federal", icon: <Landmark size={20} />, title: "Federal", text: "You need a federal license when a federal agency regulates your specific business activity. These are mostly industry-specific.", ex: ["Alcohol manufacturing", "Commercial fishing", "Firearms", "Broadcasting"] },
  { id: "state", icon: <Building2 size={20} />, title: "State", text: "Your state may require a license when it regulates part of what you do. Requirements vary by industry, and often include seller's permits, liquor licenses and environmental approvals.", ex: ["Seller's permit", "Liquor license", "Professional license", "Environmental permit"] },
  { id: "local", icon: <MapPin size={20} />, title: "Local", text: "City and county governments regulate many everyday activities. Rules differ by location, and often cover zoning, building, fire safety and local tax registration.", ex: ["Zoning permit", "Building permit", "Fire permit", "Local tax registration"] },
];

const BIZ = [
  { id: "cafe", icon: <Coffee size={20} />, label: "Café / restaurant", list: ["General business license", "Food service / health permit", "Seller's (sales tax) permit", "Zoning or occupancy approval", "Alcohol license, if you serve it"] },
  { id: "online", icon: <ShoppingBag size={20} />, label: "Online store", list: ["Seller's (sales tax) permit", "General business license", "Business registration or DBA", "Home occupation permit, if home-based"] },
  { id: "home", icon: <Home size={20} />, label: "Home-based business", list: ["Home occupation permit", "General business license", "Zoning approval", "DBA, if using a trade name"] },
  { id: "contractor", icon: <Hammer size={20} />, label: "Contractor", list: ["State contractor license", "Local business license", "Building permits per project", "Trade-specific certifications"] },
  { id: "freelance", icon: <Briefcase size={20} />, label: "Consulting / freelance", list: ["General business license", "DBA, if using a trade name", "Professional license, if your field is regulated", "Home occupation permit, if home-based"] },
  { id: "retail", icon: <Store size={20} />, label: "Retail shop", list: ["General business license", "Seller's (sales tax) permit", "Zoning or occupancy approval", "Fire and safety inspection", "Signage permit"] },
];

const wallet = [
  { name: "Health permit", level: "Local", days: 12, w: 92 },
  { name: "Seller's permit", level: "State", days: 45, w: 62 },
  { name: "General business license", level: "Local", days: 120, w: 28 },
];

const faqs = [
  ["Do I need licenses for my business?", "Most likely you'll need a general business license to operate legally and meet local, county, state and federal rules. Depending on your industry, location and activities, you may need more. Many small businesses end up needing several."],
  ["When do I need a business license?", "Typically before you start operating or open to the public. Otherwise you could face fines. Once you have your permits, display them properly, keep copies and track renewal dates."],
  ["Who issues business licenses?", "Every level of government: city, county, state and federal. You may need to apply with several agencies. A custom report shows which ones apply to you."],
  ["What are some common licenses and permits?", "Common examples include home occupation, zoning, building, seller's, fire and police department and health permits."],
  ["What is a seller's permit?", "Also called a sales tax permit, it's a state-issued license that lets you collect sales tax on taxable sales. It matters for anyone selling physical goods, in person or online. The tax you collect is then remitted to the state."],
  ["How much does a business license cost?", `Our report service starts at ${PRICES.report}/year, but government fees for each license vary by location, business type and permit. Some cost nothing and others are expensive. Having the right licenses protects you from fines and possible closure.`],
  ["Do I need a license to run a business from home?", "It depends on your business and location. Many places require a home occupation permit. Working from home doesn't automatically exempt you from licenses or permits, and can add requirements."],
  ["Do I need a license to sell online or on Etsy?", "That depends on what you sell and where you are. Online sellers generally need a seller's permit or sales tax permit. If the IRS treats your shop as a business, expect state, county and local requirements too."],
  ["How do I stay compliant over time?", "Keep records of all your licenses, track expiration dates, renew before they lapse, and watch for changes in requirements. Our alerts and document storage are built to help with exactly that."],
  ["How long does it take to get a license?", "It varies by whether the license is local, state or federal, and by industry. A custom report saves research time so you can get straight to applying."],
];

// Add real customer reviews here. The grid grows automatically.
const testimonials = [
  { quote: "Leader Business Developer was an incredible partner. The process was smooth, and the support team was always available when I needed help.", name: "Shannon Greevy", role: "Customer, California" },
];

function ReportCard() {
  const [tick, setTick] = useState(3);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 900);
    return () => clearInterval(id);
  }, []);
  const ex = EXAMPLES[Math.floor(tick / 8) % EXAMPLES.length];
  const shown = Math.min(tick % 8, 4);
  const ready = shown === 4;
  return (
    <div className="llc-hero__card bl-card">
      <div className="bl-card__top">
        <span className="bl-card__icon"><FileText size={20} /></span>
        <span className={`bl-card__pill ${ready ? "is-done" : ""}`}><i />{ready ? "REPORT READY" : "BUILDING REPORT"}</span>
      </div>
      <div className="bl-card__head" key={ex.biz}>
        <small>License report</small>
        <h2>{ex.biz}</h2>
        <span><MapPin size={12} /> {ex.place}</span>
      </div>
      <ul className="bl-card__rows">
        {ex.items.map(([name, level], i) => (
          <li key={ex.biz + name} className={`bl-card__row ${i < shown ? "is-in" : ""}`}>
            <span className="bl-card__tick"><Check size={13} /></span>
            <strong>{name}</strong>
            <em className={`bl-lvl bl-lvl--${level.toLowerCase()}`}>{level}</em>
          </li>
        ))}
      </ul>
      <div className="bl-card__foot">
        <span>{shown} of {ex.items.length} found</span>
        <span className="bl-card__bar"><b style={{ width: `${(shown / ex.items.length) * 100}%` }} /></span>
      </div>
      <p className="bl-card__note">Illustration only. Real requirements vary by location and activity.</p>
    </div>
  );
}

function Plans() {
  const [open, setOpen] = useState({});
  return (
    <Reveal className="dba-grid dba-grid-3 bl-plans">
      {plans.map((p) => (
        <article key={p.id} className={`llc-package-card ${p.id === "compliance" ? "is-featured" : ""}`}>
          {p.badge && <span className="llc-package-card__badge">{p.badge}</span>}
          <h3 className="llc-package-card__name">{p.name}</h3>
          <div className="llc-package-card__price">
            <span className="llc-package-card__amount">{p.price}</span>
            <span className="llc-package-card__fees">/yr*</span>
          </div>
          <small className="bl-billing">{BILLING_NOTE}</small>
          <p className="llc-package-card__tagline">{p.tagline}</p>
          {p.call ? (
            <a href={`tel:${CONTACT.phone}`} className="llc-cta__btn llc-cta__btn--gold bl-call"><Phone size={16} /> {CONTACT.phone}</a>
          ) : null}
          <Button variant={p.id === "compliance" ? "primary" : "outline"} to={`${LINKS.start}&plan=${p.id}`} className="llc-package-card__btn">{p.cta}</Button>
          <button type="button" className={`bl-toggle ${open[p.id] ? "is-open" : ""}`} onClick={() => setOpen((o) => ({ ...o, [p.id]: !o[p.id] }))} aria-expanded={!!open[p.id]}>
            {open[p.id] ? "Hide features" : "View features"} <ChevronDown size={16} />
          </button>
          <div className={`bl-feat ${open[p.id] ? "is-open" : ""}`}>
            <div>
              {p.lead && <h4>{p.lead}</h4>}
              <ul>{p.features.map((f) => <li key={f}><Check size={16} />{f}</li>)}</ul>
            </div>
          </div>
        </article>
      ))}
    </Reveal>
  );
}

function LevelTabs() {
  const [active, setActive] = useState("state");
  const lv = LEVELS.find((l) => l.id === active);
  return (
    <div className="bl-levels">
      <div className="bl-tabs" role="tablist">
        {LEVELS.map((l) => (
          <button type="button" role="tab" aria-selected={active === l.id} key={l.id} className={active === l.id ? "is-active" : ""} onClick={() => setActive(l.id)}>{l.icon}{l.title}</button>
        ))}
      </div>
      <div className="bl-levels__panel" key={lv.id}>
        <h3>What is a {lv.title.toLowerCase()} business license?</h3>
        <p>{lv.text}</p>
        <div className="dba-chips bl-chips-left">{lv.ex.map((e) => <span key={e}>{e}</span>)}</div>
      </div>
    </div>
  );
}

function Finder() {
  const [id, setId] = useState("cafe");
  const b = BIZ.find((x) => x.id === id);
  return (
    <div className="bl-finder">
      <div className="bl-finder__chips">
        {BIZ.map((x) => (
          <button type="button" key={x.id} className={id === x.id ? "is-selected" : ""} onClick={() => setId(x.id)} aria-pressed={id === x.id}><span>{x.icon}</span>{x.label}</button>
        ))}
      </div>
      <div className="bl-finder__panel" key={b.id}>
        <div className="bl-finder__head"><Sparkles size={20} /><h3>Licenses a {b.label.toLowerCase()} often needs</h3></div>
        <ul>{b.list.map((l, i) => <li key={l} style={{ "--i": i }}><Check size={16} />{l}</li>)}</ul>
        <p>This is a general preview. Your exact list depends on where you operate and what you do.</p>
        <Button to={`${LINKS.start}&plan=report`}>Get my full custom report <ArrowRight size={18} /></Button>
      </div>
    </div>
  );
}

export default function BusinessLicenses() {
  const [heroRef, heroInView] = useInView();
  const [showCompare, setShowCompare] = useState(false);

  return (
    <div className="svc bl-page">
      {/* HERO */}
      <section className="llc-hero" ref={heroRef}>
        <span className="bl-blob bl-blob--a" aria-hidden="true" />
        <span className="bl-blob bl-blob--b" aria-hidden="true" />
        <div className="container">
          <nav className="dba-crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link> / <Link to="/business">Business</Link> / <span>Business licenses</span>
          </nav>
          <div className="llc-hero__grid">
            <div className={`llc-hero__content ${heroInView ? "is-in" : ""}`}>
              <h1 className="llc-hero__title" style={{ "--d": 0 }}>Get the right licenses and stay compliant, without the guesswork</h1>
              <p className="llc-hero__subtitle" style={{ "--d": 1 }}>
                We help you find the licenses and permits you need to operate legally, and keep up with ongoing requirements. Plans start at <strong className="dba-price">{PRICES.report}/year</strong>.
              </p>
              <div className="bl-cta-row" style={{ "--d": 2 }}>
                <a href="#pricing" className="corp-submit">Select my plan <ArrowRight size={18} /></a>
                <a href={`tel:${CONTACT.phone}`} className="bl-ghost"><Phone size={16} /> Talk to a specialist</a>
              </div>
              <div className="llc-hero__trust" style={{ "--d": 3 }}>
                {/* Trustpilot rating hidden for now
                <strong>{TRUST_LABEL}</strong>
                <span className="llc-hero__stars">{[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#00b67a" color="#00b67a" />)}</span>
                <a className="llc-hero__badge corp-tp" href={TRUSTPILOT_URL} target="_blank" rel="noopener noreferrer"><Star size={12} fill="#fff" color="#fff" /> Trustpilot</a>
                <span className="llc-hero__sep" />
                */}
                <a href="#bl-guarantee" className="dba-guarantee-link"><ShieldCheck size={16} /> Learn about our guarantee</a>
              </div>
            </div>
            <div className={`llc-hero__visual ${heroInView ? "is-in" : ""}`}><ReportCard /></div>
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section className="llc-packages" id="pricing">
        <div className="container">
          <h2 className="llc-section__title">Choose a plan for your compliance needs</h2>
          <p className="llc-section__subtitle">Start with a license report, add ongoing compliance, or hand it all to a dedicated manager.</p>
          <Plans />
          <div className="llc-features-toggle-wrap">
            <button type="button" className={`llc-features-toggle ${showCompare ? "is-open" : ""}`} onClick={() => setShowCompare((o) => !o)} aria-expanded={showCompare}>
              {showCompare ? "Hide plan comparison" : "Compare all plan features"} <ChevronDown size={18} />
            </button>
          </div>
          {showCompare && (
            <div className="llc-table-wrap">
              <table className="llc-table">
                <thead><tr><th>Included features</th>{plans.map((p) => <th key={p.id}>{p.name}<span>{p.price}</span></th>)}</tr></thead>
                <tbody>
                  {compare.map(([label, a, b, c]) => (
                    <tr key={label}><td>{label}</td>{[a, b, c].map((v, i) => <td key={i}>{v ? <Check size={18} className="llc-yes" /> : <Minus size={18} className="llc-no" />}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* WHY US + GUARANTEE */}
      <section className="dba-section dba-section--gray">
        <div className="container">
          <h2 className="llc-section__title">Why use us for your licensing and compliance?</h2>
          <p className="llc-section__subtitle">Licensing rules can feel overwhelming. Our license report pinpoints what you need, and our compliance filings keep you on track year-round.</p>
          <Reveal className="dba-grid dba-grid-3">
            {whyUs.map((r) => (
              <div key={r.title} className="llc-reason"><div className="llc-reason__icon">{r.icon}</div><h3>{r.title}</h3><p>{r.text}</p></div>
            ))}
          </Reveal>
          <Reveal>
            <div className="dba-guarantee" id="bl-guarantee">
              <ShieldCheck size={40} />
              <p><strong>Accurate filing commitment.</strong> If a filing we prepare is rejected or incorrect because of our error, we'll correct it with the government agency at no extra cost to you.‡</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3 STEPS */}
      <section className="dba-section dba-section--soft">
        <div className="container">
          <h2 className="llc-section__title">Get your licenses and permits in 3 easy steps</h2>
          <p className="llc-section__subtitle">Knowing which licenses you need, and applying for them correctly, is key to running legally. Our report helps you skip hours of research.</p>
          <Reveal className="bl-path">
            {steps.map((s, i) => (
              <div key={s.title} className="bl-path__step" style={{ "--i": i }}>
                <span className="bl-path__icon">{s.icon}</span>
                <b>Step {i + 1}</b>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHAT IS A LICENSE */}
      <section className="dba-section">
        <div className="container">
          <Reveal className="dba-split">
            <div>
              <h2 className="dba-h2">What is a business license?</h2>
              <p>Nearly every business needs at least one license to operate. Run your business from home and you may need a home occupation permit. Open a restaurant and you could need a health permit, a food service license and maybe an alcohol or music license. Open a shop and a seller's permit and sales tax license may come into play.</p>
              <p>Licenses and permits protect you from penalties and the risk of closure, and reassure customers that it's safe to do business with you.</p>
              <a href="#pricing" className="corp-submit bl-inline">Select my plan <ArrowRight size={18} /></a>
            </div>
            <div className="bl-example-cloud">
              {examples.map((e, i) => <span key={e} style={{ "--i": i }}><BadgeCheck size={15} />{e}</span>)}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINDER TOOL */}
      <section className="dba-section dba-section--gray">
        <div className="container">
          <h2 className="llc-section__title">What licenses might your business need?</h2>
          <p className="llc-section__subtitle">Pick the kind of business you run for a quick preview of common licenses and permits.</p>
          <Reveal><Finder /></Reveal>
        </div>
      </section>

      {/* WHY HELP */}
      <section className="dba-section">
        <div className="container">
          <h2 className="llc-section__title">Why get help with your business licenses?</h2>
          <Reveal className="dba-grid dba-grid-3 dba-mt">
            {helpWhy.map((r) => (
              <div key={r.title} className="llc-reason"><div className="llc-reason__icon">{r.icon}</div><h3>{r.title}</h3><p>{r.text}</p></div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* LEVELS */}
      <section className="dba-section dba-section--soft">
        <div className="container dba-narrow">
          <h2 className="llc-section__title">Federal, state and local licenses</h2>
          <p className="llc-section__subtitle">Different levels of government regulate different parts of your business.</p>
          <Reveal><LevelTabs /></Reveal>
        </div>
      </section>

      {/* RENEWAL TRACKER */}
      <section className="dba-section">
        <div className="container">
          <Reveal className="dba-split">
            <div>
              <h2 className="dba-h2">Never miss a renewal</h2>
              <p>Licenses expire. Keep every one in a single place, get alerts as renewal dates approach, and hear about changes in your jurisdiction's rules.</p>
              <ul className="bl-ticks">
                <li><Bell size={18} />Timely renewal reminders</li>
                <li><FolderOpen size={18} />Secure storage for all your licenses</li>
                <li><ShieldCheck size={18} />Updates when requirements change</li>
              </ul>
            </div>
            <div className="bl-wallet" aria-hidden="true">
              <div className="bl-wallet__top"><Bell size={16} /> UPCOMING RENEWALS <em>Sample</em></div>
              {wallet.map((w) => (
                <div key={w.name} className="bl-wallet__item" style={{ "--w": `${w.w}%` }}>
                  <div><strong>{w.name}</strong><small>{w.level} · renews in {w.days} days</small></div>
                  <span className={`bl-wallet__bar ${w.days < 15 ? "is-hot" : w.days < 60 ? "is-warm" : ""}`}><b /></span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* HOW + HOW LONG */}
      <section className="dba-section dba-section--gray">
        <div className="container">
          <Reveal className="dba-grid dba-grid-2 corp-info">
            <div className="corp-info__card">
              <FileCheck size={28} />
              <h2>How do I get a business license?</h2>
              <p>Once you know which licenses, permits and registrations apply, you apply on each authority's website. You may need documents such as your tax ID, financial details and proof of insurance. With our service you get a personalized report plus direct links to each application and tips for completing it.</p>
            </div>
            <div className="corp-info__card">
              <Clock size={28} />
              <h2>How long does it take?</h2>
              <p>It depends on whether the license is local, state or federal, and on your industry. A custom report speeds things up by saving you research time, so you can head straight to applying.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <FaqList faqs={faqs} />

      <CtaBand title="Ready to get your licenses sorted?" label="Select my plan" href="#pricing" />

      <Testimonials items={testimonials} title="What our customers are saying" />

      <ContactCards helpTo={LINKS.attorney} />

      <ServiceFooter
        footnotes={[
          <>*You are responsible for any government filing and license fees.</>,
          <>†Where applicable in your state.</>,
          <>‡If a filing we prepare is rejected or incorrect due to our error, we'll correct it with the government agency at no additional cost to you.</>,
        ]}
        disclaimer={<>Leader Business Developer is an independent business-services provider offering administrative, document-preparation and filing-support assistance. We are not a law firm or a government agency. Requirements, fees, deadlines and processing times vary by jurisdiction, and example licenses shown here are illustrative. Nothing on this page constitutes legal or tax advice.</>}
      />
    </div>
  );
}