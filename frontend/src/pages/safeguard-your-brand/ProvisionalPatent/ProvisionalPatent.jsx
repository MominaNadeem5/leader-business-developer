import { useEffect, useState } from "react";
import {
  ArrowRight, ShieldCheck, Lightbulb, Clock, Wallet, FileText, PenTool, Send, Search, Cog, Factory,
  FlaskConical, Workflow, Ban, Brain, Leaf, Megaphone, CalendarClock, Hourglass, Rocket, Building2, User, Users,
} from "lucide-react";
import Button from "../../../components/common/Button";
import {
  Reveal, CountUp, ServiceHero, Section, IconCard, PackageCard, StepPath, CompareTable, Explorer, Timeline,
  StatStack, Checklist, FaqList, Testimonials, ContactCards, CtaBand, ServiceFooter,
} from "../../../components/service";
import "./ProvisionalPatent.css";

/* ---- EDIT THESE ---- */
const PRICES = { basic: "$399", standard: "$799", complete: "$1,299" }; // placeholder prices, set your own
const LINKS = {
  start: "/get-started?service=provisional-patent",
  attorney: "/contact",
};
/* USPTO provisional application filing fee by entity size (2025). Check uspto.gov before publishing. */
const USPTO_FEES = [
  { id: "large", icon: <Building2 size={18} />, label: "Large entity", fee: 325, text: "Companies with more than 500 employees, or anyone who has licensed the invention to a large company." },
  { id: "small", icon: <Users size={18} />, label: "Small entity", fee: 130, text: "Most startups, small businesses with 500 or fewer employees, nonprofits and universities." },
  { id: "micro", icon: <User size={18} />, label: "Micro entity", fee: 65, text: "Small-entity inventors who also meet income limits and haven't filed many applications before." },
];

const whyUs = [
  { icon: <Clock size={24} />, title: "Lock in your date fast", text: "A provisional application gives your invention an early filing date while you keep building, testing and pitching." },
  { icon: <Wallet size={24} />, title: "Lower cost to start", text: "It's simpler and cheaper than a full patent application, and buys you 12 months to decide if the idea is worth it." },
  { icon: <ShieldCheck size={24} />, title: "Say \"patent pending\"", text: "Once filed, you can mark your product as patent pending, which signals to investors and copycats that you're serious." },
];

const packages = [
  {
    name: "Provisional Filing",
    price: PRICES.basic,
    tagline: "You have a clear write-up and drawings. We organize and file them.",
    cta: { label: "Start Filing", to: `${LINKS.start}&plan=basic` },
    features: ["Invention questionnaire", "Cover sheet and forms prepared", "Electronic filing with the USPTO†", "Filing receipt and priority date", "12-month deadline reminders"],
  },
  {
    name: "Search + File",
    price: PRICES.standard,
    badge: "Most popular",
    featured: true,
    tagline: "Check what already exists, then file a stronger application.",
    cta: { label: "Start Search + File", to: `${LINKS.start}&plan=standard` },
    features: ["Everything in Provisional Filing", "Prior-art search report", "Help writing a detailed description", "Review for missing details", "Nonprovisional planning call"],
  },
  {
    name: "Complete Package",
    price: PRICES.complete,
    tagline: "Everything you need, including professional patent drawings.",
    cta: { label: "Start Complete", to: `${LINKS.start}&plan=complete` },
    features: ["Everything in Search + File", "Up to 5 professional drawings", "Review by a registered patent practitioner†", "Invention confidentiality (NDA) template", "Priority support"],
  },
];

const steps = [
  { icon: <Lightbulb size={20} />, title: "Describe your invention", text: "Answer guided questions about what it is, how it works and what makes it new. Add sketches or photos." },
  { icon: <PenTool size={20} />, title: "We build the application", text: "We turn your answers into a clear written description and drawings that support future claims." },
  { icon: <Send size={20} />, title: "Filed with the USPTO", text: "Your provisional is filed electronically. You get a filing receipt and can start saying patent pending." },
];

const runway = [
  { when: "Day 1", title: "File provisional", value: "Priority date", text: "Your invention's filing date is set. Patent pending starts now.", icon: <Rocket size={18} /> },
  { when: "Months 1–8", title: "Build and test", value: "Refine", text: "Prototype, talk to customers and investors. Keep notes on improvements.", icon: <Workflow size={18} /> },
  { when: "Months 9–11", title: "Decide and prepare", value: "Go / no-go", text: "If it's worth it, start the full nonprovisional application with the details you've added.", icon: <Hourglass size={18} /> },
  { when: "Month 12", title: "Hard deadline", value: "File or lose it", text: "The nonprovisional must be filed within 12 months to claim your provisional date.", icon: <CalendarClock size={18} /> },
];

const compareCols = ["", "Provisional application", "Nonprovisional (full) application"];
const compareRows = [
  ["Examined by the USPTO", "No", "Yes"],
  ["Can become a patent on its own", false, true],
  ["Claims required", "No", "Yes"],
  ["Lets you use \"patent pending\"", true, true],
  ["How long it lasts", "12 months, then expires", "Until granted or abandoned"],
  ["Relative cost", "Lower", "Higher"],
];

const icon = (Icon) => <span className="pp-glyph"><Icon size={46} strokeWidth={1.5} /></span>;
const patentable = [
  {
    id: "process", icon: <Workflow size={18} />, label: "Process", preview: icon(Workflow),
    title: "A process or method",
    text: "A new way of doing something, like a manufacturing technique, a business-to-device method or a way of treating a material.",
    points: ["Series of steps that produce a result", "Must be more than an abstract idea", "Software-related methods need care"],
  },
  {
    id: "machine", icon: <Cog size={18} />, label: "Machine", preview: icon(Cog),
    title: "A machine or device",
    text: "Something with moving or working parts that performs a function, from kitchen gadgets to industrial equipment.",
    points: ["Devices, tools and apparatus", "Improvements to existing machines", "Describe how the parts work together"],
  },
  {
    id: "manufacture", icon: <Factory size={18} />, label: "Manufactured item", preview: icon(Factory),
    title: "An article of manufacture",
    text: "A made object without moving parts, like a new kind of container, packaging, tool handle or fabric.",
    points: ["Physical products and components", "New shapes that serve a function", "Looks-only changes may suit a design patent instead"],
  },
  {
    id: "composition", icon: <FlaskConical size={18} />, label: "Composition", preview: icon(FlaskConical),
    title: "A composition of matter",
    text: "A new mixture or compound, such as a formula, coating, material blend or chemical product.",
    points: ["Formulas and recipes with a new effect", "New materials and compounds", "Include amounts and ranges"],
  },
];

const notPatentable = [
  { icon: <Brain size={18} />, title: "Abstract ideas", text: "Mental processes, math formulas and pure business ideas on their own." },
  { icon: <Leaf size={18} />, title: "Laws of nature", text: "Natural phenomena and things found in nature as they are." },
  { icon: <Megaphone size={18} />, title: "Already public too long", text: "In the U.S., you generally have one year after your own public disclosure to file." },
];

const stats = [
  { to: 12, label: "months of pending", text: "A provisional lasts 12 months. It can't be extended in the normal course." },
  { to: 20, label: "year patent term", text: "A utility patent typically lasts 20 years from the nonprovisional filing date. The provisional year doesn't count." },
  { to: 1, label: "year grace period", text: "U.S. law gives a limited grace period after your own disclosure. Many other countries give none." },
];

const disclosure = [
  "A clear title and a short summary of the invention",
  "The problem it solves and how people solve it today",
  "How it works, step by step or part by part",
  "Sketches, photos or CAD files of each view",
  "Variations and alternative versions you can imagine",
  "Names of every inventor who contributed to the idea",
];

const faqs = [
  ["What is a provisional patent application?", "It's a simpler, lower-cost filing with the USPTO that gives your invention an early filing date. It isn't examined and won't become a patent by itself, but it lets you say \"patent pending\" for 12 months."],
  ["What happens after 12 months?", "The provisional expires. To keep your early date, you must file a nonprovisional application (and any foreign applications you want) within those 12 months that claims the provisional."],
  ["Does a provisional protect my invention?", "Not directly. You can't sue anyone with a provisional. Its value is the early filing date it gives a later patent, plus the deterrent effect of \"patent pending\"."],
  ["How detailed does it need to be?", "Very. Your later patent can only rely on the provisional date for what the provisional actually describes. A thin filing can mean a weak or lost priority date, so include drawings, variations and how it works."],
  ["Should I file before I talk about my idea?", "Ideally, yes. The U.S. has a limited grace period, but most other countries require that the invention wasn't public before filing. Filing first keeps more options open."],
  ["Can I file a provisional for a design?", "No. Provisional applications are only for utility inventions. A product's ornamental look is protected through a design patent application instead."],
  ["How much are USPTO fees?", "The provisional filing fee depends on your entity size: about $325 for large entities, $130 for small entities and $65 for micro entities as of 2025. Fees change, so we confirm the current amount before filing."],
  ["Who prepares my application?", "We guide you through the process and organize your materials. Any patent application filed on your behalf is prepared and reviewed by a USPTO-registered patent practitioner, as the law requires."],
];

// Add real customer reviews here. The grid grows automatically.
const testimonials = [
  { quote: "Leader Business Developer was an incredible partner. The process was smooth, and the support team was always available when I needed help.", name: "Shannon Greevy", role: "Customer, California" },
];

/* Hero: an invention sketch draws itself on blueprint paper, gets stamped,
   and a 12-month ring ticks round. Loops. */
function BlueprintCard() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 650);
    return () => clearInterval(id);
  }, []);
  const month = tick % 16;
  const cycle = Math.floor(tick / 16);
  const shown = Math.min(month, 12);
  const pending = month >= 3;

  return (
    <div className="pp-card">
      <div className="pp-card__top">
        <span><FileText size={15} /> Provisional application</span>
        <em>No. 63/•••,•••</em>
      </div>
      <div className="pp-blueprint">
        <svg key={`draw-${cycle}`} viewBox="0 0 220 140" className="pp-draw" aria-hidden="true">
          <circle cx="78" cy="58" r="30" />
          <path d="M66 86 h24 v14 h-24 z M70 104 h16" />
          <path d="M78 28 v-10 M48 58 h-10 M108 58 h10 M57 37 l-7 -7 M99 37 l7 -7" />
          <circle cx="160" cy="70" r="20" />
          <circle cx="160" cy="70" r="7" />
          <path d="M160 44 v6 M160 90 v6 M134 70 h6 M180 70 h6 M142 52 l4 4 M174 84 l4 4 M142 88 l4 -4 M174 56 l4 -4" />
          <path d="M108 70 C 120 70, 125 70, 134 70" className="pp-draw__link" />
          <text x="18" y="132">FIG. 1</text>
          <text x="150" y="122">12</text>
        </svg>
        {pending && <span className="pp-stamp" key={`stamp-${cycle}`}>Patent pending</span>}
      </div>
      <div className="pp-card__foot">
        <div className="pp-ring" style={{ "--pp-p": (shown / 12) * 100 }}>
          <span><b>{shown}</b>/12</span>
        </div>
        <div>
          <strong>{shown < 12 ? "Months of pending used" : "Time to file the full application"}</strong>
          <small>Priority date locked on day 1</small>
        </div>
      </div>
      <p className="pp-card__note">Illustration only.</p>
    </div>
  );
}

/* Pick an entity size to see the USPTO provisional fee. */
function FeePicker() {
  const [id, setId] = useState("small");
  const e = USPTO_FEES.find((x) => x.id === id);
  return (
    <div className="pp-fees">
      <div className="pp-fees__tabs" role="radiogroup" aria-label="Entity size">
        {USPTO_FEES.map((x) => (
          <button key={x.id} type="button" role="radio" aria-checked={id === x.id} className={id === x.id ? "is-selected" : ""} onClick={() => setId(x.id)}>
            {x.icon}{x.label}
          </button>
        ))}
      </div>
      <div className="pp-fees__panel" key={e.id}>
        <small>USPTO provisional filing fee</small>
        <strong><CountUp to={e.fee} prefix="$" duration={700} /></strong>
        <p>{e.text}</p>
      </div>
      <p className="pp-fees__note">Government fee only, paid to the USPTO and separate from our service fee. 2025 amounts, subject to change.</p>
    </div>
  );
}

export default function ProvisionalPatent() {
  return (
    <div className="svc biz-page pp-page">
      <ServiceHero
        crumbs={[{ label: "Home", to: "/" }, { label: "Business", to: "/business" }, { label: "Patent-Pending Filing" }]}
        title="Get your invention to patent pending, fast"
        subtitle={<>File a provisional patent application to lock in your filing date and buy 12 months to test, pitch and perfect your idea. Plans from <strong>{PRICES.basic}</strong> plus USPTO fees.</>}
        actions={<>
          <Button to={LINKS.start}>Start my filing <ArrowRight size={18} /></Button>
          <a href="#pp-pricing" className="svc-ghost-btn">Compare plans</a>
        </>}
        visual={<BlueprintCard />}
      />

      <Section title="Why start with a provisional?">
        <Reveal className="svc-grid svc-grid-3 svc-mt">
          {whyUs.map((r, i) => <IconCard key={r.title} {...r} style={{ "--i": i }} />)}
        </Reveal>
      </Section>

      <Section id="pp-pricing" tone="gray" title="Choose your filing package" subtitle="All plans plus USPTO filing fees. Not sure what you need? Call us and we'll help you choose.">
        <Reveal className="svc-packages">
          {packages.map((p) => <PackageCard key={p.name} {...p} fees="+ USPTO fees" />)}
        </Reveal>
      </Section>

      <Section title="How it works" subtitle="From idea to patent pending in three steps.">
        <StepPath steps={steps} />
        <div className="svc-center"><Button to={LINKS.start}>Start my filing <ArrowRight size={18} /></Button></div>
      </Section>

      <Section tone="soft" title="Your 12-month runway" subtitle="A provisional starts a clock. Here's how to use the year well.">
        <Timeline items={runway} />
      </Section>

      <Section>
        <div className="svc-split">
          <Reveal>
            <h2 className="svc-h2">What does "patent pending" really mean?</h2>
            <p>It means you've filed a patent application that hasn't been decided yet. It tells the world you've claimed the idea first, and it can scare off copycats and reassure investors.</p>
            <p>It isn't a patent. You can't enforce it in court until a patent is granted, which is why the 12-month follow-up matters so much.</p>
            <Button to={LINKS.start}>Get patent pending <ArrowRight size={18} /></Button>
          </Reveal>
          <Reveal><StatStack stats={stats} /></Reveal>
        </div>
      </Section>

      <Section tone="gray" title="Provisional vs. full patent application" subtitle="Two different tools. Most inventors use the first to get to the second.">
        <Reveal><CompareTable columns={compareCols} rows={compareRows} highlight={1} /></Reveal>
      </Section>

      <Section title="What can you patent?" subtitle="Utility patents cover four kinds of inventions. Tap one to learn more.">
        <Reveal><Explorer items={patentable} /></Reveal>
        <h3 className="pp-sub">What you can't patent</h3>
        <Reveal className="svc-grid svc-grid-3">
          {notPatentable.map((t, i) => (
            <div key={t.title} className="pp-dont" style={{ "--i": i }}>
              <span><Ban size={14} /></span>
              <div><strong>{t.icon}{t.title}</strong><small>{t.text}</small></div>
            </div>
          ))}
        </Reveal>
      </Section>

      <Section tone="soft" title="USPTO filing fees" subtitle="The government fee depends on who owns the invention. Pick yours.">
        <Reveal><FeePicker /></Reveal>
      </Section>

      <Section tone="gray" title="Build your invention disclosure" subtitle="The more you include now, the stronger your priority date. Tick off what you have.">
        <Reveal><Checklist items={disclosure} title="Your disclosure" doneTitle="Ready to file" cta={{ label: "Start my filing", to: LINKS.start }} /></Reveal>
        <div className="pp-tip">
          <Search size={22} />
          <p><strong>Not sure your idea is new?</strong> Our Search + File plan includes a prior-art search, so you know what's already out there before you invest.</p>
        </div>
      </Section>

      <FaqList faqs={faqs} />
      <CtaBand title="Ready to protect your invention?" label="Start my filing" to={LINKS.start} />
      <Testimonials items={testimonials} />
      <ContactCards helpTo={LINKS.attorney} helpTitle="Talk to a patent professional" helpText="Get guidance from a registered patent practitioner." helpLabel="Book a consultation" />
      <ServiceFooter
        footnotes={["†Patent applications filed for you are prepared and reviewed by a USPTO-registered patent attorney or agent. USPTO fees are separate and non-refundable."]}
        disclaimer="Leader Business Developer is an independent business-services provider. We are not a law firm and do not give legal advice. Patent services are provided through USPTO-registered patent practitioners. A provisional application does not by itself grant any patent rights, and no outcome is guaranteed. Fees, deadlines and rules are set by the USPTO and may change."
      />
    </div>
  );
}
