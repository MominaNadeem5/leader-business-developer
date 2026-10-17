import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Check, ArrowRight, /* Star, */ ShieldCheck, MapPin,
  Package, FileText, Landmark, Search, Lock, Smartphone, Globe, Home, Laptop, Rocket, Briefcase, Filter,
  Plug, Banknote, Send, Building2, Inbox, Users, Scale, BadgeCheck, Sparkles,
} from "lucide-react";
import Button from "../../../components/common/Button";
import useInView from "../../../hooks/useInView";
import { Reveal, FaqList, Testimonials, ContactCards, ServiceFooter, CtaBand } from "../../../components/service";
import "./Virtualaddress.css";

/* ---- EDIT THESE: this is the section to make match your real service ---- */
// const TRUSTPILOT_URL = "https://www.trustpilot.com/review/leaderbusiness.com"; // your real Trustpilot page
// const TRUST_LABEL = "Excellent"; // keep only if it matches your real rating
const LINKS = { start: "/get-started?service=virtual-address", attorney: "/contact" };
const ROUTES = { agent: "/business/registered-agent", llc: "/business/llc", ein: "/business/ein" };

// PLACEHOLDER plans and limits. Replace with your real prices and what each plan includes.
const PLANS = [
  { id: "address", name: "Virtual Address", price: "$19", items: 0, tagline: "A professional street address for your business, with mail scanned when you ask.", cta: "Get an address",
    features: ["1 business street address of your choice", "Mail received and held securely", "Scan any item on request", "Online account to view your mail", "Support from our team"] },
  { id: "mailbox", name: "Virtual Mailbox", price: "$39", items: 25, badge: "Most popular", tagline: "Your address plus everyday mail handling, so you can run things from anywhere.", cta: "Get a mailbox", lead: "Everything in Virtual Address, plus:",
    features: ["25 mail items scanned each month", "Junk mail filtering", "Secure cloud storage for scanned mail", "Mail forwarding on request", "Multiple recipients"] },
  { id: "mailroom", name: "Business Mailroom", price: "$99", items: 100, badge: "High volume", tagline: "For teams that handle a lot of mail and want everything digitized.", cta: "Get a mailroom", lead: "Everything in Virtual Mailbox, plus:",
    features: ["100 mail items scanned each month", "Unlimited team recipients", "Priority handling", "Onboarding session with our team"] },
];

// PLACEHOLDER locations. Replace with the cities you actually offer. Add a real `street` to show it on the card.
const ADDRESSES = [
  { state: "California", city: "Los Angeles", street: "" }, { state: "California", city: "San Francisco", street: "" },
  { state: "Delaware", city: "Newark", street: "" }, { state: "Florida", city: "Miami", street: "" },
  { state: "Georgia", city: "Atlanta", street: "" }, { state: "Illinois", city: "Chicago", street: "" },
  { state: "Nevada", city: "Las Vegas", street: "" }, { state: "New York", city: "New York", street: "" },
  { state: "Texas", city: "Austin", street: "" }, { state: "Texas", city: "Houston", street: "" },
  { state: "Washington", city: "Seattle", street: "" }, { state: "Wyoming", city: "Cheyenne", street: "" },
];

const CITIES = ["New York, NY", "Miami, FL", "Houston, TX", "Cheyenne, WY"];
const ITEMS = [
  { icon: <Landmark size={18} />, title: "Bank statement" },
  { icon: <FileText size={18} />, title: "State notice" },
  { icon: <Package size={18} />, title: "Package" },
];

const marquee = ["Real street address", "Your home stays private", "Read mail from anywhere", "Junk mail filtered", "Secure scanning", "Forward what you need"];

const pillars = [
  { icon: <Lock size={24} />, title: "Private", text: "Put a business address on public records instead of exposing your own home to the world." },
  { icon: <ShieldCheck size={24} />, title: "Secure", text: "Your mail is handled with care and protected with encryption and two-factor sign-in." },
  { icon: <Smartphone size={24} />, title: "Convenient", text: "Open your business mail online, wherever work takes you." },
  { icon: <BadgeCheck size={24} />, title: "Credible", text: "A professional street address helps customers take your business seriously." },
];

const features = [
  { icon: <MapPin size={20} />, title: "Real U.S. street addresses", text: "Choose from our network of real street addresses. Your virtual address receives and processes your mail." },
  { icon: <Inbox size={20} />, title: "Fast, secure mail scanning", text: "Mail is digitized and sent to your inbox so you can read it from any device." },
  { icon: <Send size={20} />, title: "Storage & forwarding", text: "We hold your mail safely. Keep the digital copy, or have physical items forwarded wherever you need." },
  { icon: <Banknote size={20} />, title: "Check deposit", text: "Have checks sent straight to your bank, an easier way to manage payments remotely." },
  { icon: <Sparkles size={20} />, title: "AI summaries & labels", text: "Get quick summaries and automatic labels so you can see what matters at a glance." },
  { icon: <Plug size={20} />, title: "Connect your tools", text: "Link your mailbox to the apps you already use so documents stay in sync." },
  { icon: <Users size={20} />, title: "Multiple recipients", text: "Give teammates access for shared visibility into your mail." },
  { icon: <Filter size={20} />, title: "Junk mail filtering", text: "Filter out the clutter so you only see the mail that matters." },
];

const steps = [
  { icon: <MapPin size={20} />, title: "Pick your address", text: "Browse our locations and choose the business address that suits you." },
  { icon: <ShieldCheck size={20} />, title: "Verify your identity", text: "A short verification step is required for mail-handling services under USPS rules." },
  { icon: <Inbox size={20} />, title: "Start receiving mail online", text: "Use your new address and watch your mail show up in your digital inbox." },
];

const USE = [
  { id: "home", icon: <Home size={20} />, title: "Home-based", text: "Keep your residential address off public records and away from unwanted visitors, while giving customers a professional address." },
  { id: "remote", icon: <Laptop size={20} />, title: "Remote teams", text: "Give employees across the country one central digital place to see and share business mail." },
  { id: "nomad", icon: <Globe size={20} />, title: "Frequent travelers", text: "Read and manage your mail from anywhere in the world, day or night." },
  { id: "startup", icon: <Rocket size={20} />, title: "Startups & international", text: "Set up a presence in a new market without paying for office space." },
  { id: "pro", icon: <Briefcase size={20} />, title: "Professional services", text: "Consultants, finance startups and boutique firms use a commercial address to look established." },
];

const compare = [
  ["Access", "Online, any time, from any device", "In person at the post office, in its hours", "At your home"],
  ["Carriers", "Packages from major carriers, such as FedEx, UPS, DHL and USPS", "Usually USPS only", "All carriers"],
  ["Looks", "A real street address that looks professional", "Can look less established", "Reveals where you live"],
  ["Business registration", "Meets physical-address rules in most states*", "Many states don't accept a P.O. box", "Accepted, but it becomes public"],
  ["Privacy", "Your home address stays off the record", "Fairly private", "Public on registrations"],
];

const pair = [
  { icon: <Scale size={22} />, title: "Registered agent", text: "A virtual address isn't a registered agent. Pair them so legal notices are covered too.", to: ROUTES.agent, cta: "Learn about registered agents" },
  { icon: <Building2 size={22} />, title: "Form your LLC", text: "Use your new address when you register your company.", to: ROUTES.llc, cta: "Start an LLC" },
  { icon: <BadgeCheck size={22} />, title: "Get your EIN", text: "Add a federal tax ID for banking, taxes and hiring.", to: ROUTES.ein, cta: "Get an EIN" },
];

const faqs = [
  ["What is a virtual address and how does it work?", "It's a real street address you use for your business. When mail arrives, trained staff receive and sort it. Depending on your plan, each piece is scanned and posted to your online mailbox, where you can read it, forward it, or have it shredded, from any device."],
  ["What's the difference between a virtual address and a virtual mailbox?", "They're often used interchangeably, but the service levels differ. A virtual address mainly gives you a professional street address for marketing or business registration, with scanning often handled item by item. A virtual mailbox includes the address and adds full mail processing, so you can view and manage everything online."],
  ["How is a virtual address different from a USPS P.O. box?", "A virtual mailbox is available 24/7 online, while a P.O. box needs a trip to the post office. A street address also accepts packages from all major carriers, looks more professional on cards and websites, and, unlike a P.O. box, is accepted for business registration in most states."],
  ["Can I use a virtual address to register my LLC?", "In most states, yes, it meets the physical-address requirement better than a P.O. box. Rules vary, so check your state. A virtual address does not replace a registered agent, which you still need to receive legal notices."],
  ["Is a digital mailbox safe?", "Mail is handled in controlled facilities, scans are protected by encryption and password-protected cloud storage, and unwanted mail is securely shredded."],
  ["Can you deposit checks for my business?", "Where the feature is included in your plan, checks can be mailed straight to your bank for deposit into your business account. Ask our team what's available on your plan."],
  ["Can I get packages from FedEx, UPS and DHL?", "Yes. Shipments from major carriers can be received at your virtual address. You'll be notified in your online mailbox and can ask for the item to be forwarded to an address you choose."],
  ["Do I have to pick up my mail in person?", "No. The service is designed for managing mail remotely, so you don't visit the location. You read scans online and have physical items forwarded when needed."],
  ["Why use a virtual address instead of my home address?", "Privacy, since your residence stays off public records and away from visitors and identity theft risks. And professionalism, since a commercial street address builds credibility with customers."],
  ["Can I have more than one address?", "Yes. You can add addresses in different cities or regions to build a local presence while managing all your mail from one online account."],
  ["Which businesses benefit most?", "Home-based businesses, remote or hybrid teams, frequent travelers, startups and international firms entering new markets, and professional services that want a credible commercial address."],
  ["Is a virtual address the same as a registered agent?", "No. A virtual address receives your day-to-day business mail. A registered agent is a separate role that receives legal notices and service of process on your company's behalf."],
];

// Add real customer reviews here. The grid grows automatically.
const testimonials = [
  { quote: "Leader Business Developer was an incredible partner. The process was smooth, and the support team was always available when I needed help.", name: "Shannon Greevy", role: "Customer, California" },
];

function AddressCard() {
  const [tick, setTick] = useState(3);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const t = tick % 12;
  const round = Math.floor(tick / 12);
  const city = CITIES[round % CITIES.length];
  const delivered = ITEMS.filter((_, i) => t - (i * 2 + 1) >= 2).length;
  return (
    <div className="llc-hero__card va-card">
      <div className="va-card__top">
        <span className="va-card__icon"><MapPin size={20} /></span>
        <span className={`va-card__pill ${delivered === ITEMS.length ? "is-done" : ""}`}><i />{delivered === ITEMS.length ? "ALL IN YOUR INBOX" : "MAIL ARRIVING"}</span>
      </div>
      <div className="va-addr">
        <small>YOUR BUSINESS ADDRESS</small>
        <strong key={city}>{city}</strong>
        <em>A real street address, your choice of city</em>
      </div>
      <ul className="va-card__rows">
        {ITEMS.map((m, i) => {
          const s = t - (i * 2 + 1);
          const visible = s >= 0;
          const label = s < 1 ? "Arrived" : s < 2 ? "Scanning" : m.title === "Package" ? "Ready to forward" : "In your inbox";
          const cls = s < 1 ? "is-recv" : s < 2 ? "is-scan" : "is-done";
          return (
            <li key={`${round}-${m.title}`} className={`va-card__row ${visible ? "is-in" : ""} ${s === 1 ? "is-scanning" : ""}`}>
              <span className="va-card__ric">{m.icon}<b /></span>
              <div><strong>{m.title}</strong><small>Handled for you</small></div>
              {visible && <span className={`va-chip ${cls}`} key={cls}>{s >= 2 && <Check size={12} />}{label}</span>}
            </li>
          );
        })}
      </ul>
      <div className="va-card__foot"><span>{delivered} of {ITEMS.length} delivered</span><span className="va-card__bar"><b style={{ width: `${(delivered / ITEMS.length) * 100}%` }} /></span></div>
      <p className="va-card__note">Illustration only.</p>
    </div>
  );
}

function Finder() {
  const [q, setQ] = useState("");
  const [all, setAll] = useState(false);
  const list = useMemo(() => ADDRESSES.filter((a) => `${a.city} ${a.state}`.toLowerCase().includes(q.trim().toLowerCase())), [q]);
  const shown = all || q ? list : list.slice(0, 8);
  const slug = (a) => encodeURIComponent(`${a.city}-${a.state}`.toLowerCase().replace(/\s+/g, "-"));
  return (
    <div className="va-finder">
      <label className="va-search">
        <Search size={18} />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by city or state" aria-label="Search addresses" />
        <em>{list.length} {list.length === 1 ? "address" : "addresses"}</em>
      </label>
      <div className="va-finder__grid">
        {shown.map((a) => (
          <div key={`${a.city}-${a.state}`} className="va-loc">
            <span className="va-loc__pin"><MapPin size={18} /></span>
            <small>{a.state}</small>
            <strong>{a.city}</strong>
            <p>{a.street || "Full street address shown when you select it"}</p>
            <Link to={`${LINKS.start}&address=${slug(a)}`} className="va-loc__cta">Use this address <ArrowRight size={14} /></Link>
          </div>
        ))}
        {shown.length === 0 && <p className="va-finder__empty">No matching address yet. Contact us and we'll help you find one.</p>}
      </div>
      {!q && list.length > 8 && (
        <div className="llc-center"><button type="button" className="llc-link-btn" onClick={() => setAll((o) => !o)}>{all ? "Show fewer" : `Show all ${list.length}`}</button></div>
      )}
    </div>
  );
}

function Picker() {
  const [n, setN] = useState(15);
  const rec = n <= 0 ? PLANS[0] : n <= PLANS[1].items ? PLANS[1] : PLANS[2];
  const pct = (n / 150) * 100;
  return (
    <div className="va-pick">
      <div className="va-pick__top">
        <h3>How much mail do you get?</h3>
        <p>Drag to estimate the mail items you receive each month.</p>
      </div>
      <div className="va-pick__count"><strong>{n}</strong><span>{n === 1 ? "item" : "items"} / month</span></div>
      <input type="range" min="0" max="150" step="1" value={n} onChange={(e) => setN(Number(e.target.value))} style={{ "--pct": `${pct}%` }} aria-label="Mail items per month" />
      <div className="va-pick__scale"><span>Just an address</span><span>A few letters</span><span>Busy team</span></div>
      <div className="va-pick__result" key={rec.id}>
        <Sparkles size={22} />
        <div><small>We'd suggest</small><strong>{rec.name}</strong><span>{rec.price}/mo · {rec.items ? `${rec.items} scanned items included` : "scan items on request"}</span></div>
        <Link to={`${LINKS.start}&plan=${rec.id}`} className="llc-cta__btn llc-cta__btn--gold">Choose {rec.name} <ArrowRight size={16} /></Link>
      </div>
    </div>
  );
}

function UseTabs() {
  const [id, setId] = useState("home");
  const u = USE.find((x) => x.id === id);
  return (
    <div className="va-use">
      <div className="va-tabs" role="tablist">
        {USE.map((x) => <button type="button" role="tab" key={x.id} aria-selected={id === x.id} className={id === x.id ? "is-active" : ""} onClick={() => setId(x.id)}>{x.icon}{x.title}</button>)}
      </div>
      <div className="va-use__panel" key={u.id}><h3>{u.title}</h3><p>{u.text}</p></div>
    </div>
  );
}

export default function VirtualAddress() {
  const [heroRef, heroInView] = useInView();
  const track = [...marquee, ...marquee];

  return (
    <div className="svc va-page">
      {/* HERO */}
      <section className="llc-hero" ref={heroRef}>
        <span className="va-blob va-blob--a" aria-hidden="true" />
        <span className="va-blob va-blob--b" aria-hidden="true" />
        <div className="container">
          <nav className="dba-crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link> / <Link to="/business">Business</Link> / <span>Virtual address</span>
          </nav>
          <div className="llc-hero__grid">
            <div className={`llc-hero__content ${heroInView ? "is-in" : ""}`}>
              <h1 className="llc-hero__title" style={{ "--d": 0 }}>Protect your privacy with a professional virtual address</h1>
              <p className="llc-hero__subtitle" style={{ "--d": 1 }}>
                Receive and manage your business mail from anywhere, using a real street address you choose. Plans from <strong className="dba-price">{PLANS[0].price}/month</strong>.
              </p>
              <div className="va-cta-row" style={{ "--d": 2 }}>
                <a href="#pricing" className="va-btn">See plans <ArrowRight size={18} /></a>
                <a href="#addresses" className="va-ghost"><MapPin size={16} /> Choose an address</a>
              </div>
              <div className="llc-hero__trust" style={{ "--d": 3 }}>
                {/* Trustpilot rating hidden for now
                <strong>{TRUST_LABEL}</strong>
                <span className="llc-hero__stars">{[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#00b67a" color="#00b67a" />)}</span>
                <a className="llc-hero__badge corp-tp" href={TRUSTPILOT_URL} target="_blank" rel="noopener noreferrer"><Star size={12} fill="#fff" color="#fff" /> Trustpilot</a>
                <span className="llc-hero__sep" />
                */}
                <span className="llc-hero__trust-item"><ShieldCheck size={16} /> Secure mail handling</span>
              </div>
            </div>
            <div className={`llc-hero__visual ${heroInView ? "is-in" : ""}`}><AddressCard /></div>
          </div>
        </div>
      </section>

      <div className="va-marquee" aria-hidden="true">
        <div className="va-marquee__track">{track.map((t, i) => <span key={i}><Check size={14} />{t}</span>)}</div>
      </div>

      {/* PLANS */}
      <section className="llc-packages" id="pricing">
        <div className="container">
          <h2 className="llc-section__title">Plans that fit your business</h2>
          <p className="llc-section__subtitle">Start with an address, or add scanning and storage as your mail grows. Fees for extra services are shown at checkout.</p>
          <Reveal className="dba-grid dba-grid-3 va-plans">
            {PLANS.map((p) => (
              <article key={p.id} className={`llc-package-card ${p.id === "mailbox" ? "is-featured" : ""}`}>
                {p.badge && <span className="llc-package-card__badge">{p.badge}</span>}
                <h3 className="llc-package-card__name">{p.name}</h3>
                <div className="llc-package-card__price"><span className="llc-package-card__amount">{p.price}</span><span className="llc-package-card__fees">/mo</span></div>
                <p className="llc-package-card__tagline">{p.tagline}</p>
                <Button variant={p.id === "mailbox" ? "primary" : "outline"} to={`${LINKS.start}&plan=${p.id}`} className="llc-package-card__btn">{p.cta}</Button>
                <div className="llc-package-card__group">{p.lead && <h4>{p.lead}</h4>}<ul>{p.features.map((f) => <li key={f}><Check size={16} />{f}</li>)}</ul></div>
              </article>
            ))}
          </Reveal>
          <Reveal><Picker /></Reveal>
        </div>
      </section>

      {/* PILLARS */}
      <section className="dba-section dba-section--gray">
        <div className="container">
          <h2 className="llc-section__title">Simplify your business mail</h2>
          <p className="llc-section__subtitle">A real address and an online mailbox, so mail never ties you to one place.</p>
          <Reveal className="dba-grid dba-grid-4">
            {pillars.map((r) => (
              <div key={r.title} className="llc-reason"><div className="llc-reason__icon">{r.icon}</div><h3>{r.title}</h3><p>{r.text}</p></div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* FEATURES */}
      <section className="dba-section">
        <div className="container">
          <h2 className="llc-section__title">Spend less time managing mail and more time running your business</h2>
          <Reveal className="dba-grid dba-grid-4 dba-mt">
            {features.map((f) => (
              <div key={f.title} className="va-tile"><span>{f.icon}</span><div><strong>{f.title}</strong><small>{f.text}</small></div></div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* STEPS */}
      <section className="dba-section dba-section--soft">
        <div className="container">
          <h2 className="llc-section__title">How to get a virtual address</h2>
          <p className="llc-section__subtitle">Getting set up is quick. Choose your address, complete a few simple steps, and start receiving mail online.</p>
          <Reveal className="va-path">
            {steps.map((s, i) => (
              <div key={s.title} className="va-path__step" style={{ "--i": i }}>
                <span className="va-path__icon">{s.icon}</span>
                <b>Step {i + 1}</b>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </Reveal>
          <div className="llc-center"><a href="#addresses" className="va-btn">Choose my address <ArrowRight size={18} /></a></div>
        </div>
      </section>

      {/* ADDRESS FINDER */}
      <section className="dba-section" id="addresses">
        <div className="container">
          <h2 className="llc-section__title">Choose your preferred virtual address</h2>
          <p className="llc-section__subtitle">Pick from our network of locations to find the one that meets your needs.</p>
          <Reveal><Finder /></Reveal>
        </div>
      </section>

      {/* COMPARE */}
      <section className="dba-section dba-section--gray">
        <div className="container">
          <h2 className="llc-section__title">Virtual address vs. P.O. box vs. home address</h2>
          <p className="llc-section__subtitle">Here's how the three common options stack up for a business.</p>
          <Reveal>
            <div className="llc-table-wrap">
              <table className="llc-table va-table">
                <thead><tr><th>&nbsp;</th><th className="is-us">Virtual address</th><th>USPS P.O. box</th><th>Home address</th></tr></thead>
                <tbody>{compare.map(([a, b, c, d]) => <tr key={a}><td><strong>{a}</strong></td><td className="is-us">{b}</td><td>{c}</td><td>{d}</td></tr>)}</tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* USE CASES */}
      <section className="dba-section">
        <div className="container dba-narrow">
          <h2 className="llc-section__title">Who benefits most from a virtual address?</h2>
          <p className="llc-section__subtitle">Any business that wants to separate personal and professional life, look credible without an office, or manage mail remotely.</p>
          <Reveal><UseTabs /></Reveal>
        </div>
      </section>

      {/* PAIR WITH */}
      <section className="dba-section dba-section--soft">
        <div className="container">
          <h2 className="llc-section__title">Pair it with these services</h2>
          <Reveal className="dba-grid dba-grid-3 dba-mt">
            {pair.map((p) => (
              <div key={p.title} className="llc-reason"><div className="llc-reason__icon">{p.icon}</div><h3>{p.title}</h3><p>{p.text}</p><Link to={p.to} className="va-link">{p.cta} <ArrowRight size={16} /></Link></div>
            ))}
          </Reveal>
        </div>
      </section>

      <FaqList faqs={faqs} />

      <CtaBand title="Ready to get your virtual address?" label="See plans" href="#pricing" />

      <Testimonials items={testimonials} />

      <ContactCards helpTo={LINKS.attorney} />

      <ServiceFooter
        footnotes={[
          <>*Rules about acceptable business addresses vary by state. A virtual address does not replace a registered agent.</>,
        ]}
        disclaimer={<>Leader Business Developer is an independent business-services provider. We are not a law firm or a government agency and do not provide legal advice. Mail-handling services are subject to USPS rules, including identity verification. Locations, plans, prices and features shown are subject to change and may differ at checkout.</>}
      />
    </div>
  );
}