import { useEffect, useState } from "react";
import {
  Check, ArrowRight, ShieldCheck, Search, Send, MessageSquare, FileText, Landmark, Map, Store,
  AtSign, Globe, Ear, Eye, Languages, Link2, PiggyBank, Clock, Scale, AlertTriangle, ScanSearch,
} from "lucide-react";
import Button from "../../../components/common/Button";
import {
  Reveal, CountUp, ServiceHero, Section, IconCard, PackageCard, StepPath, CompareTable,
  FaqList, Testimonials, ContactCards, CtaBand, ServiceFooter,
} from "../../../components/service";
import "./TrademarkSearch.css";

/* ---- EDIT THESE ---- */
const PRICES = { federal: "$99", comprehensive: "$249", bundle: "$449" }; // placeholder prices, set your own
const LINKS = {
  start: "/get-started?service=trademark-search",
  register: "/business/trademark",
  attorney: "/contact",
};
const TURNAROUND = "3–5 business days"; // placeholder, set your real turnaround

const SAMPLE_QUERY = "BRIGHTLEAF";
const SOURCES = [
  { label: "USPTO federal register", found: 2 },
  { label: "State trademark records", found: 1 },
  { label: "Business name filings", found: 3 },
  { label: "Web & common-law use", found: 4 },
  { label: "Domains & social handles", found: 2 },
];

const whyUs = [
  { icon: <PiggyBank size={24} />, title: "Protect your filing fees", text: "Federal fees are non-refundable. A search shows the risky conflicts before you pay to file, not after an examiner refuses you." },
  { icon: <Scale size={24} />, title: "Avoid a costly dispute", text: "Using a name that's too close to someone else's can mean a cease-and-desist letter, a rebrand or worse. Find out now, while changing course is cheap." },
  { icon: <ScanSearch size={24} />, title: "Beyond exact matches", text: "We look for marks that sound alike, look alike or mean the same thing, which a quick database lookup usually misses." },
];

const packages = [
  {
    name: "Federal Search",
    price: PRICES.federal,
    tagline: "A focused check of registered and pending federal trademarks.",
    cta: { label: "Start Federal Search", to: `${LINKS.start}&plan=federal` },
    features: ["USPTO registered and pending marks", "Exact and similar-name matches", "Search in up to 2 classes", "Plain-language summary"],
  },
  {
    name: "Comprehensive Search",
    price: PRICES.comprehensive,
    badge: "Most popular",
    featured: true,
    tagline: "The full picture: federal, state and common-law use across the U.S.",
    cta: { label: "Start Comprehensive", to: `${LINKS.start}&plan=comprehensive` },
    features: ["Everything in Federal Search", "All 50 state trademark registers", "Business name and DBA filings", "Common-law use on the web", "Domain names and social handles", "Detailed report with risk rating"],
  },
  {
    name: "Search + Registration",
    price: PRICES.bundle,
    tagline: "Search first, then we prepare and file your application if it's clear.",
    cta: { label: "Start Search + File", to: `${LINKS.start}&plan=bundle` },
    features: ["Everything in Comprehensive", "Class and description review", "Application prepared and e-filed", "Free second search if your first name has issues‡", "Status alerts until registration"],
  },
];

const steps = [
  { icon: <MessageSquare size={20} />, title: "Tell us your mark", text: "Enter the name, logo or slogan and describe what you sell. It takes about 5 minutes." },
  { icon: <Search size={20} />, title: "We run the search", text: "We check federal, state and common-law sources for identical and confusingly similar marks." },
  { icon: <FileText size={20} />, title: "Get your report", text: `Within ${TURNAROUND} you get a clear report with the conflicts we found and what they mean.` },
];

const coverage = [
  {
    id: "federal",
    icon: <Landmark size={18} />,
    label: "Federal",
    title: "USPTO register",
    text: "Registered and pending applications on the federal register. These are the marks a USPTO examiner will compare yours against.",
    points: ["Live registrations", "Pending applications", "Related goods and services classes"],
  },
  {
    id: "state",
    icon: <Map size={18} />,
    label: "State",
    title: "State registers",
    text: "Marks registered with individual states. They're not on the federal register, but they can still block or limit your use in that state.",
    points: ["All 50 state trademark offices", "State-level service marks", "Local brand conflicts"],
  },
  {
    id: "common",
    icon: <Store size={18} />,
    label: "Common law",
    title: "Unregistered use",
    text: "Businesses can gain rights just by using a name, without registering it. We look for real-world use that could come back to bite you.",
    points: ["Business name and DBA filings", "Industry directories", "Websites and online stores"],
  },
  {
    id: "online",
    icon: <AtSign size={18} />,
    label: "Online",
    title: "Domains & social",
    text: "Even if a name is legally clear, you'll want to own it online. We check whether matching domains and social handles are taken.",
    points: ["Common domain extensions", "Major social platforms", "App store listings"],
  },
];

const conflicts = [
  { icon: <Ear size={20} />, title: "Sounds alike", a: "KWIK KLEEN", b: "QUICK CLEAN", text: "Different spelling, same sound when spoken." },
  { icon: <Eye size={20} />, title: "Looks alike", a: "NIKOLA", b: "NIKOIA", text: "Small visual changes don't make a mark new." },
  { icon: <Languages size={20} />, title: "Means the same", a: "RED HORSE", b: "CABALLO ROJO", text: "Translations and synonyms can still conflict." },
  { icon: <Link2 size={20} />, title: "Related goods", a: "LUNA · Coffee", b: "LUNA · Cafés", text: "Similar names on related products can confuse buyers." },
];

const report = [
  { label: "Identical marks", value: 0, tone: "low" },
  { label: "Similar federal marks", value: 2, tone: "mid" },
  { label: "State registrations", value: 1, tone: "low" },
  { label: "Common-law uses", value: 4, tone: "mid" },
];

const compareCols = ["", "Our deep search", "Free USPTO lookup", "Traditional law firm"];
const compareRows = [
  ["Federal registered and pending marks", true, true, true],
  ["Sound-alike and look-alike matches", true, "Manual", true],
  ["State trademark registers", true, false, true],
  ["Common-law and web use", true, false, true],
  ["Domains and social handles", true, false, "Varies"],
  ["Plain-language report with risk rating", true, false, "Varies"],
  ["Typical cost", `From ${PRICES.federal}`, "Free", "Often $500+"],
];

const stats = [
  { to: 45, label: "classes", text: "Goods and services are split into 45 classes. We focus your search on the ones you'll use." },
  { to: 50, label: "state registers", text: "Our comprehensive search covers every state, not just the federal database." },
  { to: 5, label: "source types", text: "Federal, state, business filings, web use, plus domains and social handles." },
];

const faqs = [
  ["Why can't I just search the USPTO database myself?", "You can, and it's a good first step. But the free database only shows federal filings, and it's easy to miss marks that are spelled differently or sound alike. It also won't show state registrations or businesses using a name without registering it, which can still cause problems."],
  ["What's the difference between federal and comprehensive searches?", "A federal search checks registered and pending USPTO trademarks only. A comprehensive search adds all state registers, business name filings, common-law use online, and domain and social handle availability. If you're investing in a brand, comprehensive is usually worth it."],
  ["How long does a search take?", `Most reports are delivered within ${TURNAROUND} after you submit your details. Rush options may be available, just ask.`],
  ["Does a clear search guarantee my trademark will be approved?", "No. A search lowers your risk but can't guarantee registration. The USPTO examiner makes the final decision and can refuse a mark for other reasons, like being descriptive. A search helps you avoid the most common reason for refusal: conflict with an existing mark."],
  ["Can you search a logo, not just a name?", "Yes. Tell us about the design elements and we'll search for similar words and design codes. Logo searches are less exact than word searches, so we explain the results carefully."],
  ["What if the search finds a conflict?", "Your report explains how serious each match is. Sometimes the risk is low because the goods are unrelated. If it's high, you can tweak the name and search again. With our Search + Registration plan, the second search is free.‡"],
  ["Is my search confidential?", "Yes. We don't publish or share the names you search. Nothing is filed with the USPTO unless you ask us to file."],
];

// Add real customer reviews here. The grid grows automatically.
const testimonials = [
  { quote: "The search report caught a similar name in our industry that we would have missed. We adjusted our brand before spending a cent on filing.", name: "Placeholder Customer", role: "Customer, Texas" },
];

/* Hero card: types a sample name, scans each source in turn, then shows a
   risk score. Loops. */
function SearchCard() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 900);
    return () => clearInterval(id);
  }, []);
  const cycle = SOURCES.length + 5;
  const t = tick % cycle;
  const step = t - 1; // first tick is typing
  const done = step >= SOURCES.length;
  const total = SOURCES.slice(0, Math.max(0, Math.min(step, SOURCES.length))).reduce((n, s) => n + s.found, 0);

  return (
    <div className="ts-card">
      <div className="ts-card__bar">
        <Search size={18} />
        <span key={Math.floor(tick / cycle)} className="ts-card__query">{SAMPLE_QUERY}</span>
        <span className={`ts-card__btn ${done ? "is-done" : ""}`}>{done ? "Done" : "Searching"}</span>
      </div>
      <ul className="ts-card__rows">
        {SOURCES.map((s, i) => {
          const state = i < step ? "is-done" : i === step ? "is-active" : "";
          return (
            <li key={s.label} className={`ts-card__row ${state}`}>
              <span className="ts-card__icon">{state === "is-done" ? <Check size={14} /> : <Globe size={14} />}</span>
              <strong>{s.label}</strong>
              {state === "is-done" && <em>{s.found} found</em>}
              {state === "is-active" && <span className="ts-card__scan" />}
            </li>
          );
        })}
      </ul>
      <div className={`ts-card__result ${done ? "is-on" : ""}`}>
        <div>
          <small>Possible conflicts</small>
          <strong>{total}</strong>
        </div>
        <div className="ts-card__risk">
          <small>Risk level</small>
          <div className="ts-meter"><b style={{ width: done ? "42%" : "0%" }} /></div>
          <span>{done ? "Moderate. Review advised." : "Calculating..."}</span>
        </div>
      </div>
      <p className="ts-card__note">Sample search for illustration only.</p>
    </div>
  );
}

/* Rings diagram: each search scope widens the circle. */
function CoverageRings() {
  const [id, setId] = useState("federal");
  const idx = coverage.findIndex((c) => c.id === id);
  const c = coverage[idx];
  return (
    <div className="ts-cover">
      <div className="ts-rings" aria-hidden="true">
        {coverage.map((x, i) => (
          <span key={x.id} className={`ts-ring ts-ring--${i} ${i <= idx ? "is-on" : ""}`} onMouseEnter={() => setId(x.id)} />
        ))}
        <span className="ts-rings__core"><Search size={26} /></span>
        <span className="ts-rings__sweep" />
      </div>
      <div>
        <div className="ts-cover__tabs" role="tablist">
          {coverage.map((x) => (
            <button key={x.id} type="button" role="tab" aria-selected={id === x.id} className={id === x.id ? "is-selected" : ""} onClick={() => setId(x.id)}>
              <span>{x.icon}</span>{x.label}
            </button>
          ))}
        </div>
        <div className="ts-cover__panel" key={c.id}>
          <h3>{c.title}</h3>
          <p>{c.text}</p>
          <ul>{c.points.map((p, i) => <li key={p} style={{ "--i": i }}><Check size={16} />{p}</li>)}</ul>
        </div>
      </div>
    </div>
  );
}

export default function TrademarkSearch() {
  return (
    <div className="svc biz-page ts-page">
      <ServiceHero
        crumbs={[{ label: "Home", to: "/" }, { label: "Business", to: "/business" }, { label: "Deep Trademark Search" }]}
        title="Search before you file. Know your name is safe."
        subtitle={<>A deep trademark search checks federal, state and common-law sources for names that could block yours. Get a clear report with a risk rating, from <strong>{PRICES.federal}</strong>.</>}
        actions={<>
          <Button to={LINKS.start}>Start my search <ArrowRight size={18} /></Button>
          <a href="#ts-pricing" className="svc-ghost-btn">Compare searches</a>
        </>}
        visual={<SearchCard />}
      />

      <Section title="Why search before you register?">
        <Reveal className="svc-grid svc-grid-3 svc-mt">
          {whyUs.map((r, i) => <IconCard key={r.title} {...r} style={{ "--i": i }} />)}
        </Reveal>
      </Section>

      <Section id="ts-pricing" tone="gray" title="Choose your trademark search" subtitle="Every search comes with a plain-language report. No federal fees are due for a search.">
        <Reveal className="svc-packages">
          {packages.map((p) => <PackageCard key={p.name} {...p} />)}
        </Reveal>
      </Section>

      <Section title="How it works" subtitle="From name idea to clear answer in three steps.">
        <StepPath steps={steps} />
        <div className="svc-center"><Button to={LINKS.start}>Start my search <ArrowRight size={18} /></Button></div>
      </Section>

      <Section tone="soft" title="What our deep search covers" subtitle="Each layer widens the net. Tap a layer to see what we check.">
        <Reveal><CoverageRings /></Reveal>
      </Section>

      <Section title="How trademarks can conflict" subtitle="An exact match isn't the only problem. These pairs could all be refused or challenged.">
        <Reveal className="svc-grid svc-grid-2 ts-conflicts">
          {conflicts.map((c, i) => (
            <div key={c.title} className="ts-conflict" style={{ "--i": i }}>
              <div className="ts-conflict__head"><span>{c.icon}</span><h3>{c.title}</h3></div>
              <div className="ts-conflict__pair">
                <b>{c.a}</b>
                <i><AlertTriangle size={16} /></i>
                <b>{c.b}</b>
              </div>
              <p>{c.text}</p>
            </div>
          ))}
        </Reveal>
        <p className="ts-small">Example marks for illustration only.</p>
      </Section>

      <Section tone="gray">
        <Reveal className="ts-split">
          <div>
            <h2 className="svc-h2">What's in your search report?</h2>
            <p>Your report lists every relevant match we found, where we found it and how close it is to your mark. Each one is rated so you can see at a glance what matters and what doesn't.</p>
            <ul className="ts-ticks">
              <li><Check size={16} />Summary with an overall risk rating</li>
              <li><Check size={16} />Details of each similar mark and its owner</li>
              <li><Check size={16} />Classes and goods each mark covers</li>
              <li><Check size={16} />Domain and social handle availability</li>
            </ul>
            <Button to={LINKS.start}>Get my report <ArrowRight size={18} /></Button>
          </div>
          <div className="ts-report">
            <div className="ts-report__top">
              <span><FileText size={18} /></span>
              <div><small>SEARCH REPORT</small><strong>{SAMPLE_QUERY}</strong></div>
              <em>Sample</em>
            </div>
            {report.map((r, i) => (
              <div key={r.label} className={`ts-report__row is-${r.tone}`} style={{ "--i": i, "--w": `${Math.max(r.value, 0.3) * 20}%` }}>
                <span>{r.label}</span>
                <div className="ts-report__bar"><b /></div>
                <strong><CountUp to={r.value} /></strong>
              </div>
            ))}
            <div className="ts-gauge">
              <svg viewBox="0 0 120 66" aria-hidden="true">
                <path className="ts-gauge__track" d="M10 60 A50 50 0 0 1 110 60" />
                <path className="ts-gauge__fill" d="M10 60 A50 50 0 0 1 110 60" pathLength="100" />
              </svg>
              <div><strong>Moderate</strong><small>Overall risk</small></div>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section title="A deeper search than the free database" subtitle="See how we compare with searching on your own or hiring a firm.">
        <Reveal><CompareTable columns={compareCols} rows={compareRows} highlight={1} /></Reveal>
      </Section>

      <Section tone="soft">
        <Reveal className="ts-stats">
          {stats.map((s, i) => (
            <div key={s.label} className="ts-stat" style={{ "--i": i }}>
              <strong><CountUp to={s.to} /></strong>
              <span>{s.label}</span>
              <small>{s.text}</small>
            </div>
          ))}
        </Reveal>
      </Section>

      <Section>
        <Reveal className="ts-next">
          <span className="ts-next__icon"><ShieldCheck size={34} /></span>
          <div>
            <h2 className="svc-h2">Search came back clear? Lock it in.</h2>
            <p>Once you know your name is available, register it with the USPTO for nationwide rights and the ® symbol. We can prepare and file it for you.</p>
          </div>
          <div className="ts-next__actions">
            <Button to={LINKS.register}>Register my trademark <Send size={16} /></Button>
            <span><Clock size={14} /> Rights date back to your filing date</span>
          </div>
        </Reveal>
      </Section>

      <FaqList faqs={faqs} />
      <CtaBand title="Ready to check your name?" label="Start my search" to={LINKS.start} />
      <Testimonials items={testimonials} />
      <ContactCards helpTo={LINKS.attorney} />
      <ServiceFooter
        footnotes={[
          "‡Free second search applies only to the Search + Registration plan, for one alternative name submitted before filing.",
        ]}
        disclaimer="Leader Business Developer is an independent business-services provider offering administrative, document-preparation and filing-support assistance. We are not a law firm or a government agency and do not give legal advice. A trademark search reduces risk but cannot guarantee that a mark is available or will be registered. Trademarks are registered by the United States Patent and Trademark Office (USPTO), and you can search the USPTO database directly for free."
      />
    </div>
  );
}
