import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Check, ArrowRight, /* Star, */ ShieldCheck, MessageSquare, FileText,
  FileCheck, Users, Building2, Landmark, Briefcase, UserRound, Handshake, Globe, Lock, CreditCard,
  BadgeCheck, Send, Fingerprint, Hash, Sparkles,
} from "lucide-react";
import Button from "../../../components/common/Button";
import useInView from "../../../hooks/useInView";
import { Reveal, CountUp, FaqList, Testimonials, ContactCards, CtaBand, ServiceFooter } from "../../../components/service";
import "./Einitin.css";

/* ---- EDIT THESE ---- */
// const TRUSTPILOT_URL = "https://www.trustpilot.com/review/leaderbusiness.com"; // your real Trustpilot page
// const TRUST_LABEL = "Excellent"; // keep only if it matches your real rating
const PRICES = { ein: "$79", itin: "Custom quote" }; // placeholder prices, set your own
const LINKS = { ein: "/get-started?service=ein", itin: "/get-started?service=itin", attorney: "/contact" };

const STAGES = [
  ["Business details", "A few quick questions"],
  ["Application prepared", "Completed for you"],
  ["Filed with the IRS", "Submitted on your behalf"],
  ["EIN confirmed", "Official documentation"],
];
const SAMPLE_EIN = "12-3456789";

const whyUs = [
  { icon: <FileText size={24} />, title: "Seamless application", text: "Skip the confusion of IRS forms and rules. We turn your answers into a complete EIN application, prepared to meet federal requirements." },
  { icon: <Send size={24} />, title: "Effortless filing", text: "We file your application with the IRS for you.* No need to chase the process or worry about getting every requirement right." },
  { icon: <BadgeCheck size={24} />, title: "Verified completion", text: "We follow the approval through and send you the official documentation with your confirmed identification number." },
];

const einFeatures = ["Completed EIN application", "Filing with the IRS on your behalf*", "Official documentation with your EIN", "Accurate filing commitment‡"];
const itinFeatures = ["Eligibility and document review", "Form W-7 preparation support", "Supporting-document guidance", "Application follow-up guidance"];

const steps = [
  { icon: <MessageSquare size={20} />, title: "Tell us about your business", text: "Answer a few basic questions online to give us the information the IRS requires." },
  { icon: <Send size={20} />, title: "We prepare and file", text: "Using your answers, we complete the application and file it with the IRS.*" },
  { icon: <BadgeCheck size={20} />, title: "You receive your EIN", text: "Once the application is approved, we send the official documentation with your confirmed number." },
];

const needs = [
  { icon: <Landmark size={24} />, title: "File taxes and avoid penalties", text: "An EIN keeps business taxes apart from personal ones, which simplifies filing, helps you avoid late penalties and signals that you run a real business." },
  { icon: <Users size={24} />, title: "Hire employees", text: "You need an EIN to hire. It lets you withhold payroll taxes and report employee information to the IRS." },
  { icon: <Lock size={24} />, title: "Protect your identity", text: "Give clients and vendors your EIN instead of your Social Security number, and keep personal and business finances separate." },
  { icon: <CreditCard size={24} />, title: "Build business credit", text: "Many banks require an EIN to open a business account, and it's key to building credit history and applying for loans." },
];

const ENT = [
  { id: "multi", icon: <Users size={20} />, label: "Multi-member LLC", verdict: "Required", text: "A multi-member LLC is generally treated as a partnership for tax purposes, so it needs its own EIN.", bullets: [] },
  { id: "single", icon: <UserRound size={20} />, label: "Single-member LLC", verdict: "It depends", text: "You'll need an EIN if any of the following applies:", bullets: ["The LLC has employees, or you plan to hire within the next 12 months", "The LLC is taxed as a corporation", "Your bank or state asks for one, which is common"] },
  { id: "corp", icon: <Building2 size={20} />, label: "Corporation", verdict: "Required", text: "A corporation needs an EIN even if it has no employees.", bullets: [] },
  { id: "partner", icon: <Handshake size={20} />, label: "Partnership", verdict: "Required", text: "A partnership needs an EIN even if it has no employees.", bullets: [] },
  { id: "sole", icon: <Briefcase size={20} />, label: "Sole proprietorship", verdict: "It depends", text: "You'll need an EIN if any of the following applies:", bullets: ["You have employees, or plan to hire within the next 12 months", "You have a tax-deferred retirement plan for individuals or small businesses", "You must file federal employment, excise, or alcohol, tobacco and firearms tax returns"] },
];

const stats = [
  { to: 9, label: "digits", text: "Your EIN is a unique 9-digit number, formatted XX-XXXXXXX." },
  { to: 1, label: "per business", text: "Assigned to your business by the IRS and never reissued to another." },
  { to: 0, label: "expiry", text: "Once assigned, an EIN never expires." },
];

const crucial = [
  { icon: <Lock size={22} />, title: "Avoid identity theft", text: "Keeps your Social Security number for personal use only." },
  { icon: <FileCheck size={22} />, title: "Apply for licenses", text: "Many states require an EIN before you can be licensed." },
  { icon: <Landmark size={22} />, title: "Bank accounts and loans", text: "Banks commonly ask for an EIN to open a business account." },
  { icon: <Users size={22} />, title: "Hire employees", text: "Required before you can set up payroll." },
  { icon: <FileText size={22} />, title: "File your taxes", text: "Needing an EIN and not having one can lead to penalties." },
  { icon: <BadgeCheck size={22} />, title: "Boost credibility", text: "Shows vendors and partners that your business is legitimate." },
];

const needsList = [
  "Name of the owner, principal officer, partner or trustor",
  "SSN or ITIN of the responsible party (for IRS online filing)",
  "Type of business, such as LLC, partnership or sole proprietorship",
  "Reason for applying, such as starting a new business",
  "Date the business was formed",
  "Business industry",
];

const ssnPoints = [
  ["Generally limited", "Mostly for sole proprietorships and single-member LLCs with no employees."],
  ["Exposes personal data", "Using your SSN for business and personal taxes raises theft risk."],
  ["Extra explanation", "You may need to explain to the IRS why you don't have an EIN."],
];
const einPoints = [
  ["Required for most", "Especially if you have, or plan to hire, employees."],
  ["Separates finances", "Keeps business and personal finances apart and protects your personal info."],
  ["No extra paperwork", "No need to explain a missing EIN to the IRS."],
];

const itinCards = [
  { icon: <UserRound size={22} />, title: "Who needs one", text: "Individuals who must file or report U.S. taxes but aren't eligible for a Social Security number, such as some non-resident owners, investors and dependants." },
  { icon: <FileText size={22} />, title: "How you apply", text: "Applications go to the IRS on Form W-7 with supporting identity and foreign-status documents. We help you get the paperwork organized." },
  { icon: <ShieldCheck size={22} />, title: "What it isn't", text: "An ITIN is for federal tax reporting only. It doesn't authorize work in the U.S. or qualify you for Social Security benefits." },
];

const idTable = [
  ["Used for", "Identifying an individual for federal tax", "Identifying an individual who can't get an SSN", "Identifying a business for tax"],
  ["Who gets one", "U.S. citizens and eligible residents", "Individuals who need a taxpayer ID but aren't SSN-eligible", "Businesses, trusts, estates and other entities"],
  ["Format", "XXX-XX-XXXX", "9XX-XX-XXXX", "XX-XXXXXXX"],
  ["Issued by", "Social Security Administration", "IRS", "IRS"],
  ["Application", "SSA application", "IRS Form W-7", "IRS Form SS-4 or IRS online"],
];

const faqs = [
  ["How do I get an EIN?", "You apply to the IRS using Form SS-4, either online or by other methods, and you must be the \"responsible party,\" meaning the owner or person who controls the entity. We can prepare and file the application for you and send you the final paperwork."],
  ["Can I get an EIN without an SSN?", "Often yes. The IRS online system generally asks for a valid SSN or ITIN for the responsible party. Without either, the application is submitted another way, such as by fax, mail or phone, using Form SS-4. We can help you prepare it. IRS rules can change, so we confirm the current process for your case."],
  ["How do I find my EIN if I forgot it?", "Check the IRS confirmation letter, then look at previously filed tax returns, business loan applications or your business credit report. Your state's Secretary of State site may also list business information."],
  ["Does getting an EIN cost money?", `Applying directly with the IRS is free. Our service costs ${PRICES.ein}, and it saves you time by preparing the application for you, filing it, and delivering your official documentation.`],
  ["What does having an EIN mean?", "It means your business can hire employees, open a business bank account, apply for loans and establish credit. It also shows vendors and partners that your business is legitimate."],
  ["Is an EIN the same as an SSN?", "No. An SSN identifies an individual. It can be used for a business that doesn't need an EIN, such as a single-member LLC without employees, but an EIN is still safer for privacy."],
  ["What is an ITIN, and how is it different from an EIN?", "An ITIN is an individual taxpayer ID for people who need one but can't get an SSN. An EIN identifies a business. Some owners need both: an ITIN for themselves, then an EIN for the business."],
  ["Does an ITIN let me work in the U.S.?", "No. An ITIN is only for federal tax reporting. It doesn't give work authorization or Social Security eligibility."],
  ["What are the requirements for an EIN?", "You'll need the owner or officer's name, the responsible party's SSN or ITIN where required, the business type, the reason you're applying, the formation date and the industry. To apply online, the business must be located in the U.S. or a U.S. territory."],
];

// Add real customer reviews here. The grid grows automatically.
const testimonials = [
  { quote: "Leader Business Developer was an incredible partner. The process was smooth, and the support team was always available when I needed help.", name: "Shannon Greevy", role: "Customer, California" },
];

function EinCard() {
  const [tick, setTick] = useState(2);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const step = Math.min(tick % 8, 4);
  const done = step === 4;
  return (
    <div className="llc-hero__card ein-card">
      <div className="ein-card__top">
        <span className="ein-card__icon"><Hash size={20} /></span>
        <span className={`ein-card__pill ${done ? "is-done" : ""}`}><i />{done ? "EIN CONFIRMED" : "IN PROGRESS"}</span>
      </div>
      <div className="ein-cert">
        <small>EMPLOYER IDENTIFICATION NUMBER</small>
        {done ? (
          <span className="ein-num" key={`on-${tick}`}>{SAMPLE_EIN.split("").map((d, i) => <i key={i} style={{ "--i": i }}>{d}</i>)}</span>
        ) : (
          <span className="ein-num is-off">••-•••••••</span>
        )}
        <em>Sample number for illustration</em>
      </div>
      <ul className="ein-card__rows">
        {STAGES.map(([title, detail], i) => {
          const state = i < step ? "is-done" : i === step ? "is-active" : "";
          return (
            <li key={title} className={`ein-card__row ${state}`}>
              <span className="ein-card__num">{i < step || (done && i === 3) ? <Check size={14} /> : i + 1}</span>
              <div><strong>{title}</strong><small>{detail}</small></div>
              {i === step && !done && <span className="ein-card__dot" />}
            </li>
          );
        })}
      </ul>
      <div className="ein-card__bar"><b style={{ width: `${(step / 4) * 100}%` }} /></div>
      <p className="ein-card__note">Illustration only. The IRS issues all EINs.</p>
    </div>
  );
}

function Finder() {
  const [id, setId] = useState("single");
  const e = ENT.find((x) => x.id === id);
  return (
    <div className="ein-finder">
      <div className="ein-finder__chips">
        {ENT.map((x) => (
          <button type="button" key={x.id} className={id === x.id ? "is-selected" : ""} onClick={() => setId(x.id)} aria-pressed={id === x.id}><span>{x.icon}</span>{x.label}</button>
        ))}
      </div>
      <div className="ein-finder__panel" key={e.id}>
        <div className="ein-finder__head">
          <h3>{e.label}</h3>
          <span className={`ein-verdict ${e.verdict === "Required" ? "is-yes" : "is-maybe"}`}>{e.verdict === "Required" ? <Check size={14} /> : <Sparkles size={14} />}EIN: {e.verdict}</span>
        </div>
        <p>{e.text}</p>
        {e.bullets.length > 0 && <ul>{e.bullets.map((b, i) => <li key={b} style={{ "--i": i }}><Check size={16} />{b}</li>)}</ul>}
        <Button to={LINKS.ein}>Start my EIN <ArrowRight size={18} /></Button>
      </div>
    </div>
  );
}

function Checklist() {
  const [done, setDone] = useState([]);
  const toggle = (i) => setDone((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]));
  const pct = Math.round((done.length / needsList.length) * 100);
  return (
    <div className="ein-check">
      <div className="ein-check__side">
        <div className="ein-check__ring" style={{ "--ein-p": pct }}><span>{pct}%</span></div>
        <h3>{pct === 100 ? "You're ready to apply" : "What you'll need"}</h3>
        <p>{done.length} of {needsList.length} items ready. Tap to tick them off.</p>
        {pct === 100 && <Link to={LINKS.ein} className="llc-cta__btn llc-cta__btn--gold">Start my EIN <ArrowRight size={16} /></Link>}
      </div>
      <ul className="ein-check__list">
        {needsList.map((t, i) => (
          <li key={t}>
            <button type="button" className={done.includes(i) ? "is-done" : ""} onClick={() => toggle(i)} aria-pressed={done.includes(i)}>
              <span className="ein-check__box"><Check size={14} /></span>{t}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function EinItin() {
  const [heroRef, heroInView] = useInView();

  return (
    <div className="svc biz-page ein-page">
      {/* HERO */}
      <section className="llc-hero" ref={heroRef}>
        <span className="ein-blob ein-blob--a" aria-hidden="true" />
        <span className="ein-blob ein-blob--b" aria-hidden="true" />
        <div className="container">
          <nav className="dba-crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link> / <Link to="/business">Business</Link> / <span>EIN &amp; ITIN</span>
          </nav>
          <div className="llc-hero__grid">
            <div className={`llc-hero__content ${heroInView ? "is-in" : ""}`}>
              <h1 className="llc-hero__title" style={{ "--d": 0 }}>Get your EIN &amp; ITIN sorted, the stress-free way</h1>
              <p className="llc-hero__subtitle" style={{ "--d": 1 }}>
                An EIN is your business's federal tax ID, used to file taxes, hire employees and open a bank account. Need an individual taxpayer ID instead? We help with ITINs too. EIN service from <strong className="dba-price">{PRICES.ein}</strong>.
              </p>
              <div className="ein-cta-row" style={{ "--d": 2 }}>
                <Button to={LINKS.ein}>Start my EIN <ArrowRight size={18} /></Button>
                <a href="#itin" className="ein-ghost"><Fingerprint size={16} /> I need an ITIN</a>
              </div>
              <div className="llc-hero__trust" style={{ "--d": 3 }}>
                {/* Trustpilot rating hidden for now
                <strong>{TRUST_LABEL}</strong>
                <span className="llc-hero__stars">{[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#2fa24f" color="#2fa24f" />)}</span>
                <a className="llc-hero__badge corp-tp" href={TRUSTPILOT_URL} target="_blank" rel="noopener noreferrer"><Star size={12} fill="#ffffff" color="#ffffff" /> Trustpilot</a>
                <span className="llc-hero__sep" />
                */}
                <a href="#ein-guarantee" className="dba-guarantee-link"><ShieldCheck size={16} /> Learn about our guarantee</a>
              </div>
            </div>
            <div className={`llc-hero__visual ${heroInView ? "is-in" : ""}`}><EinCard /></div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="dba-section">
        <div className="container">
          <h2 className="llc-section__title">Why get your EIN with us?</h2>
          <Reveal className="dba-grid dba-grid-3 dba-mt">
            {whyUs.map((r) => (
              <div key={r.title} className="llc-reason"><div className="llc-reason__icon">{r.icon}</div><h3>{r.title}</h3><p>{r.text}</p></div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* PRICING */}
      <section className="llc-packages dba-section--gray" id="pricing">
        <div className="container">
          <h2 className="llc-section__title">Get started with your EIN or ITIN</h2>
          <p className="llc-section__subtitle">Pick what you need. Not sure? Call us and we'll point you the right way.</p>
          <Reveal className="dba-grid dba-grid-2">
            <article className="llc-package-card is-featured">
              <span className="llc-package-card__badge">Most requested</span>
              <h3 className="llc-package-card__name">EIN (federal tax ID)</h3>
              <div className="llc-package-card__price"><span className="llc-package-card__amount">{PRICES.ein}</span></div>
              <p className="llc-package-card__tagline">For your business: we prepare and file your application and send the official paperwork.</p>
              <Button variant="primary" to={LINKS.ein} className="llc-package-card__btn">Start my EIN</Button>
              <div className="llc-package-card__group"><ul>{einFeatures.map((f) => <li key={f}><Check size={16} />{f}</li>)}</ul></div>
            </article>
            <article className="llc-package-card">
              <h3 className="llc-package-card__name">ITIN assistance</h3>
              <div className="llc-package-card__price"><span className="llc-package-card__amount ein-quote">{PRICES.itin}</span></div>
              <p className="llc-package-card__tagline">For individuals who need a taxpayer ID but aren't eligible for an SSN.</p>
              <Button variant="outline" to={LINKS.itin} className="llc-package-card__btn">Request ITIN help</Button>
              <div className="llc-package-card__group"><ul>{itinFeatures.map((f) => <li key={f}><Check size={16} />{f}</li>)}</ul></div>
            </article>
          </Reveal>
          <Reveal>
            <div className="dba-guarantee" id="ein-guarantee">
              <ShieldCheck size={40} />
              <p><strong>Accurate filing commitment.</strong> If your filing is rejected or incorrect because of our error, we'll correct it with the government agency at no extra cost to you.‡</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STEPS */}
      <section className="dba-section dba-section--soft">
        <div className="container">
          <h2 className="llc-section__title">How to get an EIN with us</h2>
          <p className="llc-section__subtitle">Three simple steps from first question to confirmed number.</p>
          <Reveal className="ein-path">
            {steps.map((s, i) => (
              <div key={s.title} className="ein-path__step" style={{ "--i": i }}>
                <span className="ein-path__icon">{s.icon}</span>
                <b>Step {i + 1}</b>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </Reveal>
          <div className="llc-center"><Button to={LINKS.ein}>Start my EIN <ArrowRight size={18} /></Button></div>
        </div>
      </section>

      {/* WHY NEED */}
      <section className="dba-section">
        <div className="container">
          <h2 className="llc-section__title">Why does my business need an EIN?</h2>
          <p className="llc-section__subtitle">Even when it isn't required, there are real benefits to having one.</p>
          <Reveal className="dba-grid dba-grid-4">
            {needs.map((r) => (
              <div key={r.title} className="llc-reason"><div className="llc-reason__icon">{r.icon}</div><h3>{r.title}</h3><p>{r.text}</p></div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* DO I NEED ONE */}
      <section className="dba-section dba-section--gray">
        <div className="container">
          <h2 className="llc-section__title">Does my business need an EIN?</h2>
          <p className="llc-section__subtitle">Pick your business type to see whether the IRS requires one.</p>
          <Reveal><Finder /></Reveal>
        </div>
      </section>

      {/* WHAT IS AN EIN */}
      <section className="dba-section">
        <div className="container">
          <Reveal className="dba-split">
            <div>
              <h2 className="dba-h2">What is an EIN?</h2>
              <p>An EIN, or federal tax ID number, is a unique 9-digit number the IRS assigns to a business or organization. It identifies you for tax purposes and looks like XX-XXXXXXX.</p>
              <p>You generally need it to pay employees, open a business bank account, withhold taxes, complete W-9 forms as a contractor, and pay taxes. Once assigned, it never expires and is never reissued to another business.</p>
              <Button to={LINKS.ein}>Start my EIN <ArrowRight size={18} /></Button>
            </div>
            <div className="ein-stats">
              {stats.map((s) => (
                <div key={s.label} className="ein-stat">
                  <strong><CountUp to={s.to} /></strong>
                  <span>{s.label}</span>
                  <small>{s.text}</small>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CRUCIAL */}
      <section className="dba-section dba-section--soft">
        <div className="container">
          <h2 className="llc-section__title">Why an EIN is crucial to your business</h2>
          <p className="llc-section__subtitle">When the IRS requires it, you have no choice. When it doesn't, an EIN still makes these things easier.</p>
          <Reveal className="dba-grid dba-grid-3">
            {crucial.map((c) => (
              <div key={c.title} className="ein-tile"><span>{c.icon}</span><div><strong>{c.title}</strong><small>{c.text}</small></div></div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* HOW TO APPLY + CHECKLIST */}
      <section className="dba-section">
        <div className="container">
          <h2 className="llc-section__title">How to apply for an EIN</h2>
          <p className="llc-section__subtitle">We keep it simple. You only need basic details about the business, and we handle the rest.</p>
          <Reveal><Checklist /></Reveal>
          <p className="ein-small">To apply online, the business must be located in the U.S. or a U.S. territory. Owners without an SSN or ITIN can still apply by another route, see the FAQ below.</p>
        </div>
      </section>

      {/* SSN VS EIN */}
      <section className="llc-vs">
        <div className="container">
          <h2 className="llc-section__title">Filing taxes with an SSN vs. an EIN</h2>
          <Reveal className="dba-grid dba-grid-2 dba-mt">
            {[["Social Security number (SSN)", ssnPoints], ["Employer identification number (EIN)", einPoints]].map(([title, pts]) => (
              <div key={title} className="llc-vs__col">
                <h3>{title}</h3>
                <ul>{pts.map(([h, t]) => <li key={h}><Check size={18} /><div><strong>{h}</strong><span>{t}</span></div></li>)}</ul>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ITIN */}
      <section className="dba-section" id="itin">
        <div className="container">
          <h2 className="llc-section__title">Need an ITIN instead?</h2>
          <p className="llc-section__subtitle">An Individual Taxpayer Identification Number is a tax ID for people who must report U.S. taxes but can't get a Social Security number.</p>
          <Reveal className="dba-grid dba-grid-3">
            {itinCards.map((r) => (
              <div key={r.title} className="llc-reason"><div className="llc-reason__icon">{r.icon}</div><h3>{r.title}</h3><p>{r.text}</p></div>
            ))}
          </Reveal>

          <h3 className="ein-sub">SSN, ITIN and EIN at a glance</h3>
          <Reveal>
            <div className="llc-table-wrap">
              <table className="llc-table ein-table">
                <thead><tr><th>&nbsp;</th><th>SSN</th><th>ITIN</th><th>EIN</th></tr></thead>
                <tbody>{idTable.map(([a, b, c, d]) => <tr key={a}><td><strong>{a}</strong></td><td>{b}</td><td>{c}</td><td>{d}</td></tr>)}</tbody>
              </table>
            </div>
          </Reveal>

          <Reveal>
            <div className="ein-intl">
              <Globe size={34} />
              <div>
                <h3>Non-U.S. owner? You may still be able to get an EIN.</h3>
                <p>Many international founders form U.S. companies without an SSN. The IRS online system generally asks for an SSN or ITIN, so these applications usually go by fax, mail or phone instead. We help you prepare them correctly.</p>
              </div>
              <Link to={LINKS.itin} className="llc-cta__btn llc-cta__btn--gold">Get guidance <ArrowRight size={16} /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      <FaqList faqs={faqs} />

      <CtaBand title="Ready to start your EIN?" label="Start my EIN" to={LINKS.ein} />

      <Testimonials items={testimonials} />

      <ContactCards helpTo={LINKS.attorney} />

      <ServiceFooter
        footnotes={[
          <>*If the IRS online system isn't available, we prepare the SS-4 form and send it to you with simple instructions to submit.</>,
          <>‡If a filing we prepare is rejected or incorrect due to our error, we'll correct it with the government agency at no additional cost to you.</>,
        ]}
        disclaimer={<>Leader Business Developer is an independent business-services provider offering administrative, document-preparation and filing-support assistance. We are not a law firm, a tax advisor or a government agency. EINs and ITINs are issued by the IRS, and you can apply to the IRS directly at no charge. Requirements, deadlines and processing times are set by the IRS and may change. Nothing on this page constitutes legal or tax advice.</>}
      />
    </div>
  );
}