import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Check, ArrowRight, ArrowDown, /* Star, */ ShieldCheck, Search, Newspaper,
  RefreshCw, Lock, Scale, ListChecks, Store, FileCheck, Megaphone, BadgeCheck, Landmark,
  CheckCircle2, 
} from "lucide-react";
import Button from "../../../components/common/Button";
import useInView from "../../../hooks/useInView";
import { Reveal, FaqList, Testimonials, ContactCards, CtaBand, ServiceFooter } from "../../../components/service";
import "./DBA.css"; // shared, fully scoped styles (.llc-page)

/* ---- EDIT THESE: prices, links, hours ---- */
const PRICE = { standard: "$79", premium: "$129" }; // placeholder prices, set your own
const LINKS = { register: "/get-started?service=dba", samples: "/sample-documents", attorney: "/contact" };

const packages = [
  {
    id: "standard", name: "Standard", price: PRICE.standard,
    tagline: "Everything you need to file and publish your DBA name.",
    groups: [
      { title: "Filing & publication", items: ["Preliminary name search*", "DBA application filing", "Newspaper publication of your DBA name*", "Proof of publication filing*"] },
      { title: "Extras", items: ["Tax savings consult with 1-800Accountant", "Customizable website powered by Wix"] },
    ],
  },
  {
    id: "premium", name: "Premium", price: PRICE.premium, badge: "Most complete",
    tagline: "Everything in Standard, plus attorney guidance on new legal matters.",
    groups: [
      { title: "Attorney access", items: ["Unlimited 30-minute attorney consultations on new legal matters (first 30 days)†"] },
      { title: "Filing & publication", items: ["Preliminary name search*", "DBA application filing", "Newspaper publication of your DBA name*", "Proof of publication filing*"] },
      { title: "Extras", items: ["Tax savings consult with 1-800Accountant", "Customizable website powered by Wix"] },
    ],
  },
];

const whyUs = [
  { icon: <ShieldCheck size={24} />, title: "Peace of mind", text: "We handle the back-and-forth with state and local agencies and file your DBA directly with the right office." },
  { icon: <Search size={24} />, title: "Thorough name search", text: "Where your state requires it, we first check the official records to confirm the name you want is available." },
  { icon: <Newspaper size={24} />, title: "Business name publication", text: "In states that require newspaper notice, we publish your DBA statement and send you the proof of publication plus a copy of your statement." },
];

const akaTerms = ["Doing business as (DBA)", "Fictitious business name", "Trade name", "Assumed business name"];

const reasons = [
  { icon: <RefreshCw size={24} />, title: "Rebranding", text: "Taking your business in a new direction? A DBA lets you launch new products or services under a fresh name without setting up a brand-new LLC or corporation." },
  { icon: <Lock size={24} />, title: "Privacy", text: "Unregistered businesses like sole proprietorships operate under the owner's legal name, so it shows up on every transaction. A DBA keeps your personal name out of the spotlight." },
  { icon: <Scale size={24} />, title: "Legal requirement", text: "State law usually requires a DBA when you operate under any name other than your legal name or a registered business name." },
];

const steps = [
  { icon: <Search />, title: "Search your name", text: "Confirm nobody else is already using it. A business entity search on your Secretary of State's website is the usual starting point." },
  { icon: <ListChecks />, title: "Check your state's naming rules", text: "For example, many states block banking-related words and terms that suggest a government connection." },
  { icon: <Store />, title: "Meet operating requirements", text: "Some states want you to operate under the name before registering it. Ask the county clerk where you do business." },
  { icon: <FileCheck />, title: "File with the state or local agency", text: "Submit your DBA form online or by mail to the Secretary of State or the local government office." },
];

const dbaPoints = [
  ["Simple and affordable", "Want an official business name without creating a new legal entity? A DBA is the quick route."],
  ["Grow and personalize", "Brand each location on its own, such as one name per town for a chain of ice cream shops."],
  ["Low upkeep", "Most DBAs only need renewing every few years, so there is far less ongoing paperwork than an LLC."],
];
const llcPoints = [
  ["Protects personal assets", "Keeping your finances separate shields your personal assets from business liabilities."],
  ["Tax flexibility", "Choose how your business is taxed to improve savings and reduce what you owe."],
  ["More upkeep", "LLC record-keeping is fairly simple, but annual reports and filings still add more work than a DBA."],
];

const soleProp = [
  { icon: <Lock size={24} />, title: "Keep your private life separate", text: "A DBA lets you promote your business without putting your legal name on every day-to-day transaction." },
  { icon: <Megaphone size={24} />, title: "Branding and marketing", text: "Pick a name that clearly describes what you sell, which makes marketing much easier." },
  { icon: <BadgeCheck size={24} />, title: "More credibility", text: "A registered business name looks professional to customers, and it doesn't take a big investment." },
  { icon: <Landmark size={24} />, title: "Open a bank account", text: "Many banks ask sole proprietors for a DBA before opening a business checking account under the business name." },
];

const faqs = [
  ["How much does a DBA cost?", "There are initial filing fees and sometimes renewal fees, and both vary by business type and state. Because a DBA isn't a formal business structure, there are usually no annual fees or ongoing filing requirements."],
  ["How do I add a DBA to an LLC?", "Look up the DBA rules for your state or ask the agency where you registered your LLC. You can often register online by giving your LLC's name and the new name you want. Names that match or closely resemble an existing DBA are typically not allowed."],
  ["Can an LLC have multiple DBAs?", "Yes. If you want several names, file a separate registration for each one."],
  ["Does a DBA need an EIN?", "No, a DBA by itself doesn't need an EIN. Whether you need one depends on how your business is organized."],
  ["How long does a DBA last?", "In most states and counties you renew every 5-10 years. A few states, such as Indiana, Iowa and New York, never expire DBAs."],
  ["Does a DBA offer liability protection?", "No. A DBA doesn't protect your personal assets. To get liability protection you need to form an LLC, corporation or nonprofit."],
  ["How do I turn a DBA into an LLC?", "Go through the normal LLC registration process with the state, including a name search. Holding a DBA doesn't guarantee the name will be available for a new entity."],
];

// Add real customer reviews here. The grid grows automatically.
const testimonials = [
  { quote: "Leader Business Developer was an incredible partner. The process was smooth, and the support team was always available when I needed help.", name: "Shannon Greevy", role: "Customer, California" },
];

const EXAMPLES = [
  { legal: "Jordan Smith", dba: "Sunny Side Bakery" },
  { legal: "Northwind Holdings LLC", dba: "Northwind Coffee Co." },
  { legal: "A. Rahman", dba: "Rahman Design Studio" },
];

function DBACard() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % EXAMPLES.length), 5200);
    return () => clearInterval(id);
  }, []);
  const ex = EXAMPLES[i];
  return (
    <div className="llc-hero__card dba-card">
      <div className="dba-card__inner" key={i}>
        <span className="dba-card__eyebrow">Assumed name registration</span>
        <div className="dba-card__row"><span>Legal name</span><strong>{ex.legal}</strong></div>
        <div className="dba-card__arrow"><ArrowDown size={16} /></div>
        <div className="dba-card__row is-dba"><span>Doing business as</span><strong>{ex.dba}</strong></div>
        <ul className="dba-card__checks">
          {["Name search", "DBA filing", "Publication"].map((t, k) => (
            <li key={t} style={{ "--k": k }}><CheckCircle2 size={16} />{t}<em>Done</em></li>
          ))}
        </ul>
        <span className="dba-card__stamp">Registered</span>
      </div>
    </div>
  );
}

export default function StartDBA() {
  const [heroRef, heroInView] = useInView();

  return (
    <div className="svc llc-page dba-page">
      {/* HERO */}
      <section className="llc-hero" ref={heroRef}>
        <div className="container">
          <nav className="dba-crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link> / <Link to="/business">Business formation</Link> / <span>DBA</span>
          </nav>
          <div className="llc-hero__grid">
            <div className={`llc-hero__content ${heroInView ? "is-in" : ""}`}>
              <h1 className="llc-hero__title" style={{ "--d": 0 }}>Register your DBA and make your business name official</h1>
              <p className="llc-hero__subtitle" style={{ "--d": 1 }}>
                Your business name is the face of your brand. File a “doing business as” (DBA) name and make it one people remember.
                Starts at <strong className="dba-price">{PRICE.standard}</strong> + filing fees.
              </p>
              <div className="llc-hero__form" style={{ "--d": 2 }}>
                <Button to={LINKS.register}>Register my DBA <ArrowRight size={18} /></Button>
              </div>
              <div className="llc-hero__trust" style={{ "--d": 3 }}>
                {/* Trustpilot rating hidden for now
                <span className="llc-hero__stars">{[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />)}</span>
                <strong>Excellent</strong>
                <span className="llc-hero__badge">Trustpilot</span>
                <span className="llc-hero__sep" />
                */}
                <a href="#dba-guarantee" className="dba-guarantee-link"><ShieldCheck size={16} /> Learn about our guarantee</a>
              </div>
            </div>
            <div className={`llc-hero__visual ${heroInView ? "is-in" : ""}`}><DBACard /></div>
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="llc-packages" id="dba-pricing">
        <div className="container">
          <h2 className="llc-section__title">File your DBA online</h2>
          <p className="llc-section__subtitle">Pick the level of support that fits your business.</p>
          <Reveal className="dba-grid dba-grid-2">
            {packages.map((pkg) => (
              <article key={pkg.id} className={`llc-package-card ${pkg.id === "premium" ? "is-featured" : ""}`}>
                {pkg.badge && <span className="llc-package-card__badge">{pkg.badge}</span>}
                <h3 className="llc-package-card__name">{pkg.name}</h3>
                <div className="llc-package-card__price">
                  <span className="llc-package-card__amount">{pkg.price}</span>
                  <span className="llc-package-card__fees">+ filing fees</span>
                </div>
                <p className="llc-package-card__tagline">{pkg.tagline}</p>
                <Button variant={pkg.id === "premium" ? "primary" : "outline"} to={LINKS.register} className="llc-package-card__btn">Register my DBA</Button>
                {pkg.groups.map((g) => (
                  <div key={g.title} className="llc-package-card__group">
                    <h4>{g.title}</h4>
                    <ul>{g.items.map((it) => <li key={it}><Check size={16} />{it}</li>)}</ul>
                  </div>
                ))}
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHY US + GUARANTEE */}
      <section className="dba-section dba-section--gray">
        <div className="container">
          <h2 className="llc-section__title">Why file your DBA with us?</h2>
          <Reveal className="dba-grid dba-grid-3 dba-mt">
            {whyUs.map((r) => (
              <div key={r.title} className="llc-reason"><div className="llc-reason__icon">{r.icon}</div><h3>{r.title}</h3><p>{r.text}</p></div>
            ))}
          </Reveal>
          <Reveal>
            <div className="dba-guarantee" id="dba-guarantee">
              <ShieldCheck size={40} />
              <p><strong>100% accurate filing commitment.</strong> If your filing is rejected or incorrect because of our error, we'll correct it with the government agency at no extra cost to you.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHAT IS A DBA */}
      <section className="dba-section">
        <div className="container">
          <Reveal className="dba-split">
            <div>
              <h2 className="dba-h2">What is DBA registration?</h2>
              <p>DBA stands for “doing business as.” Registering one lets your business operate under a name that differs from your personal name or the registered name of your company.</p>
              <p>For instance, if your legal business name is long or hard to remember, a shorter, catchier DBA can make it easier to market and build your brand.</p>
            </div>
            <div className="dba-diagram" aria-hidden="true">
              <div className="dba-diagram__tag">Legal name<strong>Jordan Smith</strong></div>
              <ArrowDown size={22} />
              <div className="dba-diagram__tag is-brand">Brand name<strong>Sunny Side Bakery</strong></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* AKA */}
      <section className="dba-section dba-section--soft">
        <div className="container dba-narrow">
          <Reveal>
            <h2 className="dba-h2 dba-center-text">Fictitious business name: another name for a DBA</h2>
            <p className="dba-center-text">Depending on your state, a DBA may go by a different label. These terms are generally used interchangeably and all mean the same thing.</p>
            <div className="dba-chips">{akaTerms.map((t) => <span key={t}>{t}</span>)}</div>
          </Reveal>
        </div>
      </section>

      {/* DO I NEED ONE */}
      <section className="dba-section">
        <div className="container dba-narrow">
          <Reveal className="dba-callout">
            <h2 className="dba-h2">Do I need to register a DBA?</h2>
            <p>If you plan to operate under any name other than your own legal name or your entity's registered name, you will likely need one. It isn't required for every business, but it can be a handy tool.</p>
            <Button to={LINKS.register}>Register my DBA <ArrowRight size={18} /></Button>
          </Reveal>
        </div>
      </section>

      {/* 3 REASONS */}
      <section className="dba-section dba-section--gray">
        <div className="container">
          <h2 className="llc-section__title">3 reasons a DBA could benefit your business</h2>
          <Reveal className="dba-grid dba-grid-3 dba-mt">
            {reasons.map((r) => (
              <div key={r.title} className="llc-reason"><div className="llc-reason__icon">{r.icon}</div><h3>{r.title}</h3><p>{r.text}</p></div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* HOW TO REGISTER */}
      <section className="llc-steps">
        <div className="container">
          <h2 className="llc-section__title">How to register a DBA</h2>
          <p className="llc-section__subtitle">These are the general steps. Your state may add its own requirements, usually listed on the Secretary of State's website.</p>
          <Reveal className="dba-grid dba-grid-4">
            {steps.map((s, i) => (
              <div key={s.title} className="llc-step">
                <span className="llc-step__num">{i + 1}</span>
                <div className="llc-step__icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </Reveal>
          <div className="llc-center dba-actions">
            <Link to={LINKS.samples} className="llc-link-btn">See sample documents</Link>
            <Button to={LINKS.register}>Register my DBA <ArrowRight size={18} /></Button>
          </div>
        </div>
      </section>

      {/* DBA VS LLC */}
      <section className="llc-vs">
        <div className="container">
          <h2 className="llc-section__title">DBA vs. LLC: what's the difference?</h2>
          <p className="llc-section__subtitle">A DBA lets an LLC, corporation or sole proprietorship operate under a registered alternate name. Here is how a DBA and an LLC compare.</p>
          <Reveal className="dba-grid dba-grid-2">
            {[["Doing business as (DBA)", dbaPoints], ["Limited liability company (LLC)", llcPoints]].map(([title, pts]) => (
              <div key={title} className="llc-vs__col">
                <h3>{title}</h3>
                <ul>{pts.map(([h, t]) => <li key={h}><Check size={18} /><div><strong>{h}</strong><span>{t}</span></div></li>)}</ul>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand title="Ready to register your DBA?" label="Register my DBA" to={LINKS.register} />

      {/* DBA VS SOLE PROP */}
      <section className="dba-section">
        <div className="container">
          <h2 className="llc-section__title">DBA vs. sole proprietorship: what to know</h2>
          <p className="llc-section__subtitle">A DBA and a sole proprietorship are different things, and a DBA can help a sole proprietor in several ways.</p>
          <Reveal className="dba-grid dba-grid-4">
            {soleProp.map((r) => (
              <div key={r.title} className="llc-reason"><div className="llc-reason__icon">{r.icon}</div><h3>{r.title}</h3><p>{r.text}</p></div>
            ))}
          </Reveal>
        </div>
      </section>

      <FaqList faqs={faqs} />

      <CtaBand title="Ready to register your DBA?" label="Register my DBA" to={LINKS.register} />

      <Testimonials items={testimonials} title="What our customers are saying" />

      <ContactCards helpTo={LINKS.attorney} />

      <ServiceFooter
        footnotes={[
          <>*If required in your county or state.</>,
          <>†Attorney consultation access and any ongoing plan terms are shown at checkout.</>,
        ]}
        disclaimer={<>Leader Business Developer provides business formation and administrative filing support. State filing fees, requirements, processing times and available documents vary by jurisdiction. Government acceptance and processing are controlled by the applicable state authority. Nothing on this page constitutes legal or tax advice.</>}
      />
    </div>
  );
}