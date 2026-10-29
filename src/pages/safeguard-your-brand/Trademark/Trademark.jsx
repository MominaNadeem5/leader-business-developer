import { useEffect, useState } from "react";
import {
  Check, X, ArrowRight, ShieldCheck, Search, Layers, Send, BadgeCheck, MessageSquare, Bell,
  Copy, Sparkles, Crown, Gavel, Globe, Lock, Type, Image, Quote, Ban, AlertTriangle, FileWarning,
  Scale, Stamp, CalendarClock, ScanSearch,
} from "lucide-react";
import Button from "../../../components/common/Button";
import {
  Reveal, CountUp, ServiceHero, Section, IconCard, PackageCard, StepPath, CompareTable,
  Checklist, FaqList, Testimonials, ContactCards, CtaBand, ServiceFooter,
} from "../../../components/service";
import "./Trademark.css";

/* ---- EDIT THESE ---- */
const PRICES = { basic: "$199", standard: "$399", complete: "$699" }; // placeholder prices, set your own
const LINKS = {
  start: "/get-started?service=trademark",
  search: "/business/trademark-search",
  attorney: "/contact",
};
const FEDERAL_FEE = "$350"; // USPTO base application fee per class (2025). Check uspto.gov before publishing.

const STAGES = [
  ["Clearance search", "Checked for conflicts"],
  ["Classes selected", "Goods & services mapped"],
  ["Filed with the USPTO", "Application submitted"],
  ["Examination", "Reviewed by an examiner"],
  ["Registered", "® ready to use"],
];
const SAMPLE_MARKS = ["BRIGHTLEAF", "NORTHWIND", "BLUE OTTER"];

const whyUs = [
  { icon: <ScanSearch size={24} />, title: "Search before you file", text: "We look for conflicting federal and common-law marks first, so you don't spend filing fees on a name that's likely to be refused." },
  { icon: <Layers size={24} />, title: "The right classes", text: "We map what you actually sell to the right USPTO classes and wording, which is where many DIY applications go wrong." },
  { icon: <Bell size={24} />, title: "Tracked to the finish", text: "We watch your application, send you status updates and remind you about deadlines so nothing lapses quietly." },
];

const packages = [
  {
    name: "Basic Filing",
    price: PRICES.basic,
    tagline: "You already know your mark is clear. We prepare and file the application.",
    cta: { label: "Start Basic", to: `${LINKS.start}&plan=basic` },
    features: ["Application prepared for you", "Electronic filing with the USPTO", "Help choosing one class", "Filing confirmation and serial number"],
  },
  {
    name: "Standard",
    price: PRICES.standard,
    badge: "Most popular",
    featured: true,
    tagline: "Search first, then file. The safest way to start for most businesses.",
    cta: { label: "Start Standard", to: `${LINKS.start}&plan=standard` },
    features: ["Everything in Basic", "Federal trademark search", "State and common-law search", "Search report in plain language", "Class and description review", "Status alerts until registration"],
  },
  {
    name: "Complete Protection",
    price: PRICES.complete,
    tagline: "Full support from search to registration, plus help after you file.",
    cta: { label: "Start Complete", to: `${LINKS.start}&plan=complete` },
    features: ["Everything in Standard", "Free second search if your first name has issues‡", "Guidance on minor procedural office actions", "3 months of brand watch alerts", "Cease-and-desist letter template", "Priority support"],
  },
];

const steps = [
  { icon: <MessageSquare size={20} />, title: "Tell us about your brand", text: "Share your name, logo or slogan and what you sell. It takes about 10 minutes online." },
  { icon: <Search size={20} />, title: "We search and advise", text: "We check for conflicts and similar marks, then send a clear report so you can decide with confidence." },
  { icon: <Send size={20} />, title: "We file with the USPTO", text: "We prepare and e-file your application, then track it and keep you updated until a decision." },
];

const compareCols = ["", "Leader Business Developer", "Do it yourself", "Traditional law firm"];
const compareRows = [
  ["Conflict search before filing", true, false, true],
  ["Help choosing classes and wording", true, false, true],
  ["Application prepared and e-filed", true, "You do it", true],
  ["Status alerts and deadline reminders", true, false, "Varies"],
  ["Plain-language guidance", true, false, "Varies"],
  ["Typical service cost", `From ${PRICES.basic}`, "Federal fees only", "Often $1,000+"],
];

const stats = [
  { to: 45, label: "classes", text: "Goods and services are grouped into 45 classes. You pay a federal fee for each one." },
  { to: 10, label: "year terms", text: "A registration can last forever, as long as you keep using it and renew every 10 years." },
  { to: 6, label: "year check-in", text: "Between years 5 and 6 you must file a declaration that the mark is still in use." },
];

const markTypes = [
  {
    id: "name",
    icon: <Type size={18} />,
    label: "Business or product name",
    preview: <span className="tm-mark tm-mark--word">BRIGHTLEAF</span>,
    text: "A word mark protects the name itself, in any font, color or style. It's usually the first and most valuable mark to register.",
    points: ["Covers the words regardless of design", "Strongest when the name is unique or invented", "Can't simply describe what you sell"],
  },
  {
    id: "logo",
    icon: <Image size={18} />,
    label: "Logo or design",
    preview: <span className="tm-mark tm-mark--logo"><Sparkles size={34} /><b>Brightleaf</b></span>,
    text: "A design mark protects the look of your logo. If the logo contains your name, register the name separately too, so changing the design later doesn't leave you exposed.",
    points: ["Protects the specific visual design", "Submitted as a clear image file", "Changing the logo may need a new filing"],
  },
  {
    id: "slogan",
    icon: <Quote size={18} />,
    label: "Slogan or tagline",
    preview: <span className="tm-mark tm-mark--slogan">"Grow something good."</span>,
    text: "A catchy phrase can be registered when customers link it to your brand. Everyday phrases or plain descriptions of quality are hard to register.",
    points: ["Must point to you as the source", "Works best when it's distinctive", "Common sayings are usually refused"],
  },
];

const notTrademark = [
  { icon: <Copy size={18} />, title: "Creative works", text: "Books, music, photos, art and software code are protected by copyright." },
  { icon: <Sparkles size={18} />, title: "Inventions", text: "New products, machines and processes are protected by patents." },
  { icon: <Ban size={18} />, title: "Generic words", text: "\"Coffee\" for a coffee shop can't belong to anyone." },
];

const benefits = [
  { icon: <ShieldCheck size={22} />, title: "Stop copycats", text: "Gives you clear legal grounds to act against confusing look-alikes." },
  { icon: <Globe size={22} />, title: "Nationwide rights", text: "Your rights cover all 50 states, not just where you operate today." },
  { icon: <Crown size={22} />, title: "Own your brand", text: "A registered mark is a business asset you can license or sell." },
  { icon: <BadgeCheck size={22} />, title: "Use the ® symbol", text: "Show the world your mark is federally registered." },
  { icon: <Gavel size={22} />, title: "Stronger in court", text: "Registration is presumed evidence that you own the mark." },
  { icon: <Lock size={22} />, title: "Block imports", text: "Record with U.S. Customs to help stop counterfeit goods at the border." },
];

const rejections = [
  { icon: <Scale size={22} />, title: "Too close to an existing mark", text: "If your mark looks, sounds or means something similar to a registered mark for related goods, the examiner may find a likelihood of confusion." },
  { icon: <FileWarning size={22} />, title: "Merely descriptive", text: "Names that just describe the product, like \"Fresh Bakery\" for a bakery, are hard to register without proof that customers already link them to you." },
  { icon: <Ban size={22} />, title: "Generic terms", text: "A common name for the product itself can never be registered, because everyone needs to be able to use it." },
  { icon: <AlertTriangle size={22} />, title: "Use or specimen problems", text: "The mark must be used in commerce, or you must intend to use it. A weak or digitally altered specimen is a common reason for refusal." },
];

const fees = [
  { when: "Filing", title: "Application", amount: `${FEDERAL_FEE} / class`, text: "Paid to the USPTO when you file. Extra surcharges can apply for incomplete info or custom descriptions." },
  { when: "Years 5–6", title: "Declaration of use", amount: "$325 / class", text: "Confirms the mark is still in use. Miss it and the registration is cancelled." },
  { when: "Year 10", title: "First renewal", amount: "$650 / class", text: "Declaration of use plus renewal. Repeat every 10 years to keep your rights." },
];

const needsList = [
  "Owner's legal name and address (you or your business)",
  "The exact mark: words, or a clean logo image",
  "A list of the goods or services you sell under it",
  "First-use dates, or that you intend to use it soon",
  "A specimen showing the mark in real use",
];

const faqs = [
  ["Do I need a lawyer to register a trademark?", "U.S.-based owners can file on their own, and many do. The hard parts are searching for conflicts, picking the right classes and wording, and answering any office actions. That's where professional help saves time and money. Foreign-domiciled applicants must use a U.S.-licensed attorney."],
  ["I found a similar trademark. Can I still register mine?", "Maybe. What matters is whether customers are likely to be confused, which depends on how close the marks are and whether the goods or services are related. A careful search report helps you judge the risk before you pay filing fees."],
  ["Do I register my name and logo separately?", "They're separate filings. If you can only do one, the name (word mark) usually gives broader protection, because it covers the words in any style."],
  ["How many classes do I need?", "One for each category of goods or services you actually sell or plan to sell under the mark. Many small businesses need one or two. We help you choose so you don't overpay or leave gaps."],
  ["How long does registration take?", "It commonly takes around a year or longer, depending on USPTO backlogs and whether the examiner raises issues. Your rights date back to your filing date once the mark registers."],
  ["Can my application be refused?", "Yes. Common reasons are conflict with an existing mark, a descriptive or generic name, or problems with the specimen. Many refusals can be answered with a response, and searching first lowers the risk."],
  ["Can I use ™ before I'm registered?", "Yes. Anyone can use ™ (or ℠ for services) to claim a mark. Only use ® after the USPTO registers your mark. Using it before then can cause legal problems."],
  ["What if someone infringes my trademark?", "Keep records and evidence, then usually start with a cease-and-desist letter. If that fails, a registered mark puts you in a much stronger position for further action."],
  ["How much are the federal filing fees?", `The USPTO base application fee is ${FEDERAL_FEE} per class as of 2025. Extra surcharges can apply. Federal fees are separate from our service fee and may change.`],
];

// Add real customer reviews here. The grid grows automatically.
const testimonials = [
  { quote: "Leader Business Developer was an incredible partner. The process was smooth, and the support team was always available when I needed help.", name: "Shannon Greevy", role: "Customer, California" },
];

/* Animated "application" card in the hero: types a sample mark, walks the
   stages, then stamps ® when it reaches Registered. Loops through names. */
function TrademarkCard() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1100);
    return () => clearInterval(id);
  }, []);
  const cycle = 8;
  const step = Math.min(tick % cycle, STAGES.length - 1);
  const done = step === STAGES.length - 1;
  const mark = SAMPLE_MARKS[Math.floor(tick / cycle) % SAMPLE_MARKS.length];

  return (
    <div className="tm-card">
      <div className="tm-card__top">
        <span className="tm-card__icon"><Stamp size={20} /></span>
        <span className={`tm-card__pill ${done ? "is-done" : ""}`}><i />{done ? "REGISTERED" : "IN PROGRESS"}</span>
      </div>
      <div className="tm-card__mark">
        <small>YOUR MARK</small>
        <strong key={mark}>{mark}<sup className={done ? "is-on" : ""}>{done ? "®" : "™"}</sup></strong>
        <div className="tm-card__classes">
          <span>Class 25 · Apparel</span><span>Class 35 · Retail</span>
        </div>
        {done && <span className="tm-card__stamp">Approved</span>}
      </div>
      <ul className="tm-card__rows">
        {STAGES.map(([title, detail], i) => {
          const state = i < step || (done && i === step) ? "is-done" : i === step ? "is-active" : "";
          return (
            <li key={title} className={`tm-card__row ${state}`}>
              <span className="tm-card__num">{state === "is-done" ? <Check size={14} /> : i + 1}</span>
              <div><strong>{title}</strong><small>{detail}</small></div>
              {state === "is-active" && <span className="tm-card__dot" />}
            </li>
          );
        })}
      </ul>
      <div className="tm-card__bar"><b style={{ width: `${(step / (STAGES.length - 1)) * 100}%` }} /></div>
      <p className="tm-card__note">Sample marks for illustration only.</p>
    </div>
  );
}

/* Tabs: what kind of mark are you protecting? */
function MarkExplorer() {
  const [id, setId] = useState("name");
  const m = markTypes.find((x) => x.id === id);
  return (
    <div className="tm-explorer">
      <div className="tm-explorer__tabs" role="tablist">
        {markTypes.map((x) => (
          <button key={x.id} type="button" role="tab" aria-selected={id === x.id} className={id === x.id ? "is-selected" : ""} onClick={() => setId(x.id)}>
            <span>{x.icon}</span>{x.label}
          </button>
        ))}
      </div>
      <div className="tm-explorer__panel" key={m.id}>
        <div className="tm-explorer__preview">{m.preview}</div>
        <div>
          <h3>{m.label}</h3>
          <p>{m.text}</p>
          <ul>{m.points.map((p, i) => <li key={p} style={{ "--i": i }}><Check size={16} />{p}</li>)}</ul>
        </div>
      </div>
    </div>
  );
}

export default function Trademark() {
  return (
    <div className="svc biz-page tm-page">
      <ServiceHero
        crumbs={[{ label: "Home", to: "/" }, { label: "Business", to: "/business" }, { label: "Trademark Registration" }]}
        title="Protect your brand name with a federal trademark"
        subtitle={<>Lock in your business name, logo or slogan before someone else does. We search for conflicts, prepare your application and file it with the USPTO. Plans from <strong>{PRICES.basic}</strong> plus federal fees.</>}
        actions={<>
          <Button to={LINKS.start}>Register my trademark <ArrowRight size={18} /></Button>
          <a href="#tm-pricing" className="svc-ghost-btn">Compare plans</a>
        </>}
        guaranteeHref="#tm-guarantee"
        visual={<TrademarkCard />}
      />

      <Section title="Why register your trademark with us?">
        <Reveal className="svc-grid svc-grid-3 svc-mt">
          {whyUs.map((r, i) => <IconCard key={r.title} {...r} style={{ "--i": i }} />)}
        </Reveal>
      </Section>

      <Section id="tm-pricing" tone="gray" title="Choose your trademark package" subtitle={`All plans plus USPTO filing fees (${FEDERAL_FEE} per class). Not sure which you need? Call us and we'll help you pick.`}>
        <Reveal className="svc-packages">
          {packages.map((p) => <PackageCard key={p.name} {...p} fees="+ federal fees" />)}
        </Reveal>
        <Reveal>
          <div className="svc-guarantee" id="tm-guarantee">
            <ShieldCheck size={40} />
            <p><strong>Accurate filing commitment.</strong> If your application is rejected because of a filing mistake we made, we'll fix it and refile at no extra service cost.‡</p>
          </div>
        </Reveal>
      </Section>

      <Section title="How it works" subtitle="Three simple steps from idea to filed application.">
        <StepPath steps={steps} />
        <div className="svc-center"><Button to={LINKS.start}>Get started <ArrowRight size={18} /></Button></div>
      </Section>

      <Section tone="soft" title="Expert help without law-firm prices" subtitle="See how we compare with filing alone or hiring a traditional firm.">
        <Reveal><CompareTable columns={compareCols} rows={compareRows} highlight={1} /></Reveal>
      </Section>

      <Section>
        <Reveal className="tm-split">
          <div>
            <h2 className="svc-h2">What is a trademark?</h2>
            <p>A trademark is a word, phrase, symbol or design that tells customers who a product or service comes from. Think of the name on the box or the logo on the sign.</p>
            <p>You start building some rights just by using your mark, but those rights are limited to where you do business. A federal registration with the USPTO gives you nationwide rights, public notice of your ownership and the right to use ®.</p>
            <Button to={LINKS.start}>Register my trademark <ArrowRight size={18} /></Button>
          </div>
          <div className="tm-stats">
            {stats.map((s) => (
              <div key={s.label} className="tm-stat">
                <strong><CountUp to={s.to} /></strong>
                <span>{s.label}</span>
                <small>{s.text}</small>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section tone="gray" title="What can you trademark?" subtitle="Pick what you want to protect. Many businesses register their name first, then their logo.">
        <Reveal><MarkExplorer /></Reveal>
        <h3 className="tm-sub">What a trademark doesn't cover</h3>
        <Reveal className="svc-grid svc-grid-3">
          {notTrademark.map((t, i) => (
            <div key={t.title} className="tm-dont" style={{ "--i": i }}>
              <span><X size={14} /></span>
              <div><strong>{t.icon}{t.title}</strong><small>{t.text}</small></div>
            </div>
          ))}
        </Reveal>
      </Section>

      <Section title="™ or ®? Know the difference">
        <Reveal className="tm-symbols">
          <div className="tm-symbol">
            <b>™</b>
            <h3>Trademark symbol</h3>
            <p>Use it any time to claim a name, logo or slogan as yours, even before you file. It puts others on notice but gives no federal registration.</p>
          </div>
          <span className="tm-symbols__arrow"><ArrowRight size={26} /></span>
          <div className="tm-symbol is-reg">
            <b>®</b>
            <h3>Registered symbol</h3>
            <p>Only allowed once the USPTO registers your mark. It signals nationwide rights and makes it easier to recover damages from infringers.</p>
          </div>
        </Reveal>
      </Section>

      <Section tone="soft" title="Benefits of registering your trademark" subtitle="A registered mark does a lot more than look official.">
        <Reveal className="svc-grid svc-grid-3">
          {benefits.map((b, i) => <IconCard key={b.title} variant="tile" {...b} style={{ "--i": i }} />)}
        </Reveal>
      </Section>

      <Section title="Common reasons applications are refused" subtitle="Knowing these up front is the easiest way to avoid them.">
        <Reveal className="svc-grid svc-grid-2 tm-rejects">
          {rejections.map((r, i) => (
            <div key={r.title} className="tm-reject" style={{ "--i": i }}>
              <span className="tm-reject__num">0{i + 1}</span>
              <span className="tm-reject__icon">{r.icon}</span>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </div>
          ))}
        </Reveal>
        <div className="svc-center"><Button variant="outline" to={LINKS.search}>Run a trademark search first <ArrowRight size={18} /></Button></div>
      </Section>

      <Section tone="gray" title="What you need to apply" subtitle="Gather these and we'll take care of the rest.">
        <Reveal><Checklist items={needsList} cta={{ label: "Register my trademark", to: LINKS.start }} /></Reveal>
      </Section>

      <Section title="Federal fees over the life of your trademark" subtitle="These go to the USPTO and are separate from our service fee. Amounts are per class.">
        <Reveal className="tm-timeline">
          {fees.map((f, i) => (
            <div key={f.title} className="tm-fee" style={{ "--i": i }}>
              <span className="tm-fee__dot"><CalendarClock size={18} /></span>
              <em>{f.when}</em>
              <h3>{f.title}</h3>
              <strong>{f.amount}</strong>
              <p>{f.text}</p>
            </div>
          ))}
        </Reveal>
        <p className="tm-small">Fees shown are USPTO amounts as of 2025 and can change. Check uspto.gov for current figures.</p>
      </Section>

      <FaqList faqs={faqs} />
      <CtaBand title="Ready to protect your brand?" label="Register my trademark" to={LINKS.start} />
      <Testimonials items={testimonials} />
      <ContactCards helpTo={LINKS.attorney} />
      <ServiceFooter
        footnotes={[
          "‡Free second search and refiling apply only to issues found during our process or caused by our error. Federal fees paid to the USPTO are non-refundable.",
        ]}
        disclaimer="Leader Business Developer is an independent business-services provider offering administrative, document-preparation and filing-support assistance. We are not a law firm or a government agency and do not give legal advice. Trademarks are registered by the United States Patent and Trademark Office (USPTO), and you can file with the USPTO directly. Registration is never guaranteed. Requirements, fees and processing times are set by the USPTO and may change."
      />
    </div>
  );
}
