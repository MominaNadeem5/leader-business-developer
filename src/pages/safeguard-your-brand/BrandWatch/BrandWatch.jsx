import { useEffect, useState } from "react";
import {
  ArrowRight, ShieldCheck, Radar, Bell, Eye, Landmark, Map, Globe, ShoppingBag, AtSign, Search,
  Settings2, Gavel, FileWarning, Mail, Ban, Clock, Siren, Layers, Activity,
} from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../../components/common/Button";
import {
  Reveal, ServiceHero, Section, IconCard, PackageCard, StepPath, CompareTable, Explorer, Timeline,
  StatStack, FaqList, Testimonials, ContactCards, CtaBand, ServiceFooter,
} from "../../../components/service";
import "./BrandWatch.css";

/* ---- EDIT THESE ---- */
const PRICES = { essential: "$149", pro: "$299", portfolio: "$599" }; // placeholder yearly prices, set your own
const LINKS = {
  start: "/get-started?service=brand-watch",
  register: "/business/trademark",
  attorney: "/contact",
};

/* Sample alerts that stream into the hero card (illustration only). */
const ALERTS = [
  { mark: "BRIGHTLEEF", where: "USPTO · Class 25", score: 92 },
  { mark: "brightleaf-shop.com", where: "New domain", score: 88 },
  { mark: "Bright Leaf Co.", where: "State filing · TX", score: 76 },
  { mark: "@brightleaf.store", where: "Social handle", score: 81 },
  { mark: "BRITELEAF", where: "Marketplace listing", score: 69 },
];

const whyUs = [
  { icon: <Radar size={24} />, title: "Always watching", text: "We scan new trademark filings and the wider web for marks that look, sound or read like yours, so you don't have to." },
  { icon: <Bell size={24} />, title: "Only alerts that matter", text: "Every hit is reviewed and scored for risk. You get clear, ranked alerts, not a flood of noise." },
  { icon: <Clock size={24} />, title: "Time to act", text: "Catching a conflict early keeps cheaper options open, like an opposition before a rival mark registers." },
];

const packages = [
  {
    name: "Essential Watch",
    price: PRICES.essential,
    fees: "/ year",
    tagline: "Federal monitoring for one mark. Ideal once your trademark is filed.",
    cta: { label: "Start Essential", to: `${LINKS.start}&plan=essential` },
    features: ["1 mark, up to 2 classes", "USPTO new-filing watch", "Monthly alert digest", "Risk score on every hit"],
  },
  {
    name: "Pro Watch",
    price: PRICES.pro,
    fees: "/ year",
    badge: "Best coverage",
    featured: true,
    tagline: "Federal, state, domain and online monitoring with faster alerts.",
    cta: { label: "Start Pro", to: `${LINKS.start}&plan=pro` },
    features: ["Everything in Essential", "State trademark & business filings", "New domains and social handles", "Marketplace listing checks", "Weekly alerts, urgent ones same day", "Opposition deadline reminders"],
  },
  {
    name: "Portfolio Watch",
    price: PRICES.portfolio,
    fees: "/ year",
    tagline: "For brands with several names, logos or product lines.",
    cta: { label: "Start Portfolio", to: `${LINKS.start}&plan=portfolio` },
    features: ["Everything in Pro", "Up to 5 marks", "Logo and design similarity checks", "Quarterly brand-health report", "Dedicated specialist", "Cease-and-desist letter template"],
  },
];

const steps = [
  { icon: <Settings2 size={20} />, title: "Set up your watch", text: "Tell us your marks, classes and the markets you care about. Setup takes a few minutes." },
  { icon: <Radar size={20} />, title: "We scan continuously", text: "New filings, domains and listings are compared against your marks for look, sound and meaning." },
  { icon: <Bell size={20} />, title: "You get ranked alerts", text: "We review each hit, score its risk and explain your options in plain language." },
];

const preview = (Icon, label, sub) => (
  <span className="bw-mini">
    <i><Icon size={22} /></i>
    <b>{label}</b>
    <small>{sub}</small>
  </span>
);

const watchAreas = [
  {
    id: "uspto", icon: <Landmark size={18} />, label: "Federal filings",
    preview: preview(Landmark, "BRIGHTLEEF", "Serial 98•••••• · Class 25"),
    title: "New USPTO applications",
    text: "The most important place to watch. We flag new applications that could be confused with your mark, while there's still time to oppose them.",
    points: ["Exact, phonetic and misspelled variations", "Related goods and services, not just your class", "Publication dates tracked for you"],
  },
  {
    id: "state", icon: <Map size={18} />, label: "State records",
    preview: preview(Map, "Bright Leaf LLC", "Texas · Business filing"),
    title: "State trademarks and business names",
    text: "Local businesses often register similar names at the state level. These can block your growth into new markets.",
    points: ["State trademark registers", "New business entity names", "DBA and trade-name filings"],
  },
  {
    id: "domains", icon: <Globe size={18} />, label: "Domains",
    preview: preview(Globe, "brightleaf-shop.com", "Registered 2 days ago"),
    title: "Look-alike domains",
    text: "Copycat domains are a common start of phishing and counterfeit sales. We spot new registrations that borrow your name.",
    points: ["New registrations across major extensions", "Typo and hyphen variations", "Early warning before a site goes live"],
  },
  {
    id: "market", icon: <ShoppingBag size={18} />, label: "Marketplaces",
    preview: preview(ShoppingBag, "BRITELEAF Tee", "New listing · 4.2★"),
    title: "Online marketplace listings",
    text: "Knock-offs often appear on large marketplaces first. We look for listings that use your brand or something confusingly close.",
    points: ["Product titles and brand fields", "Seller storefront names", "Evidence captured for takedown requests"],
  },
  {
    id: "social", icon: <AtSign size={18} />, label: "Social handles",
    preview: preview(AtSign, "@brightleaf.store", "New account"),
    title: "Social media impersonation",
    text: "Fake accounts can mislead your customers. We watch for new handles and pages that use your name.",
    points: ["Handle and page name matches", "Profile names that copy yours", "Help with platform reporting"],
  },
];

const stats = [
  { to: 30, label: "days to oppose", text: "After a mark is published, you normally have 30 days to file an opposition or ask for more time." },
  { to: 180, label: "days max extension", text: "Extensions can stretch the window to up to 180 days from publication, if you ask in time." },
  { to: 5, label: "places watched", text: "Pro Watch covers federal, state, domain, marketplace and social sources." },
];

const journey = [
  { when: "Day 0", title: "Rival files", text: "Someone applies for a mark similar to yours. Our watch picks it up shortly after it appears.", icon: <FileWarning size={18} /> },
  { when: "Months later", title: "Examination", text: "A USPTO examiner reviews it. Examiners don't always catch conflicts with your mark.", icon: <Search size={18} /> },
  { when: "Publication", title: "30-day window", text: "The mark is published for opposition. This is the key moment to object, and we remind you before it closes.", icon: <Siren size={18} /> },
  { when: "After the window", title: "Registration", text: "If nobody objects, it can register. Challenging it later usually costs far more.", icon: <Ban size={18} /> },
];

const ladder = [
  { level: 1, icon: <Eye size={20} />, title: "Keep watching", text: "Low-risk hits are logged and tracked, so you can see if they grow into a real problem." },
  { level: 2, icon: <Mail size={20} />, title: "Friendly letter", text: "Many conflicts end with a polite letter explaining your rights and asking for a change." },
  { level: 3, icon: <FileWarning size={20} />, title: "Cease and desist", text: "A firmer, formal demand to stop using a confusing mark, backed by your evidence." },
  { level: 4, icon: <Gavel size={20} />, title: "Opposition or cancellation", text: "Formal proceedings before the Trademark Trial and Appeal Board, handled by an attorney." },
];

const compareCols = ["", "Leader Brand Watch", "Search alerts yourself", "Law-firm watch service"];
const compareRows = [
  ["Watches new USPTO filings", true, false, true],
  ["Phonetic and misspelling matches", true, false, true],
  ["Domains, marketplaces and social", true, "Partly", "Varies"],
  ["Every hit reviewed and risk-scored", true, false, true],
  ["Opposition deadline reminders", true, false, true],
  ["Typical cost", `From ${PRICES.essential}/yr`, "Your time", "Often much higher"],
];

const faqs = [
  ["Do I need a registered trademark to use Brand Watch?", "No. You can watch a pending application or even an unregistered name you use. That said, a federal registration gives you much stronger tools to act on what we find."],
  ["Doesn't the USPTO stop similar marks for me?", "Examiners do check for conflicts, but they can miss marks that are similar in sound or meaning, or in related classes. It's the owner's job to police their mark, which is what monitoring helps with."],
  ["What is an opposition?", "It's a formal objection to someone else's application, filed with the Trademark Trial and Appeal Board after the mark is published. The normal window is 30 days from publication, and extensions are possible if requested in time."],
  ["How do you decide what's a real risk?", "We compare how the marks look, sound and what they mean, and whether the goods or services are related. Each hit gets a risk score and a short explanation so you can focus on what matters."],
  ["What happens when you find a conflict?", "We explain your options, from simply monitoring to sending a letter or opposing the mark. Formal legal action is handled by a licensed attorney if you choose to go that way."],
  ["Can I cancel?", "Yes. Plans renew each year and you can cancel before renewal. Your alerts history stays available to download."],
  ["Does it cover other countries?", "Our standard plans focus on the U.S. If you sell abroad, ask us about adding international registers."],
];

// Add real customer reviews here. The grid grows automatically.
const testimonials = [
  { quote: "Leader Business Developer was an incredible partner. The process was smooth, and the support team was always available when I needed help.", name: "Shannon Greevy", role: "Customer, California" },
];

/* Hero: radar sweep with blips + a live alert feed. */
function RadarCard() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2200);
    return () => clearInterval(id);
  }, []);
  const feed = [0, 1, 2].map((k) => ALERTS[(tick + k) % ALERTS.length]);

  return (
    <div className="bw-card">
      <div className="bw-card__top">
        <span className="bw-card__title"><Activity size={16} /> Brand Watch</span>
        <span className="bw-card__live"><i /> LIVE</span>
      </div>
      <div className="bw-radar" aria-hidden="true">
        <span className="bw-radar__ring" /><span className="bw-radar__ring" /><span className="bw-radar__ring" />
        <span className="bw-radar__sweep" />
        <span className="bw-radar__core"><ShieldCheck size={18} /></span>
        {[[22, 30], [68, 24], [74, 64], [30, 72], [52, 46]].map(([x, y], i) => (
          <span key={i} className="bw-radar__blip" style={{ left: `${x}%`, top: `${y}%`, "--i": i }} />
        ))}
      </div>
      <ul className="bw-feed">
        {feed.map((a, i) => (
          <li key={`${tick}-${a.mark}`} className={i === 0 ? "is-new" : ""}>
            <div><strong>{a.mark}</strong><small>{a.where}</small></div>
            <span className={`bw-score ${a.score >= 85 ? "is-high" : a.score >= 75 ? "is-mid" : ""}`}>{a.score}%</span>
          </li>
        ))}
      </ul>
      <p className="bw-card__note">Sample alerts for illustration only.</p>
    </div>
  );
}

/* A single alert, broken down. Meter fills when scrolled into view. */
function AlertAnatomy() {
  const factors = [["Sounds alike", 95], ["Looks alike", 88], ["Related goods", 90], ["Meaning", 70]];
  return (
    <Reveal className="bw-anatomy">
      <div className="bw-anatomy__head">
        <span className="bw-anatomy__badge"><Siren size={14} /> High risk</span>
        <small>Alert #1042</small>
      </div>
      <div className="bw-anatomy__vs">
        <div><small>Your mark</small><strong>BRIGHTLEAF</strong></div>
        <span>vs</span>
        <div><small>New filing</small><strong>BRIGHTLEEF</strong></div>
      </div>
      <ul className="bw-anatomy__factors">
        {factors.map(([label, v], i) => (
          <li key={label} style={{ "--i": i, "--w": `${v}%` }}>
            <span>{label}</span><b><i /></b><em>{v}%</em>
          </li>
        ))}
      </ul>
      <div className="bw-anatomy__action">
        <Clock size={16} /> Opposition window closes in <strong>21 days</strong>
      </div>
    </Reveal>
  );
}

export default function BrandWatch() {
  return (
    <div className="svc bw-page">
      <ServiceHero
        crumbs={[{ label: "Home", to: "/" }, { label: "Business", to: "/business" }, { label: "Brand Watch Alerts" }]}
        title="Spot copycats before they cost you customers"
        subtitle={<>Brand Watch keeps an eye on new trademark filings, domains, marketplaces and social media, then alerts you when something looks too close to your brand. Plans from <strong>{PRICES.essential}</strong> a year.</>}
        actions={<>
          <Button to={LINKS.start}>Start monitoring <ArrowRight size={18} /></Button>
          <a href="#bw-pricing" className="svc-ghost-btn">Compare plans</a>
        </>}
        visual={<RadarCard />}
      />

      <Section title="Why monitor your brand?">
        <Reveal className="svc-grid svc-grid-3 svc-mt">
          {whyUs.map((r, i) => <IconCard key={r.title} {...r} style={{ "--i": i }} />)}
        </Reveal>
      </Section>

      <Section id="bw-pricing" tone="gray" title="Choose your watch plan" subtitle="Billed yearly. Upgrade or cancel before renewal any time.">
        <Reveal className="svc-packages">
          {packages.map((p) => <PackageCard key={p.name} {...p} />)}
        </Reveal>
      </Section>

      <Section title="How it works" subtitle="Set it up once. We keep watching all year.">
        <StepPath steps={steps} />
        <div className="svc-center"><Button to={LINKS.start}>Start monitoring <ArrowRight size={18} /></Button></div>
      </Section>

      <Section tone="soft" title="Where we watch" subtitle="Copycats don't only show up at the trademark office. Tap a source to see what we check.">
        <Reveal><Explorer items={watchAreas} /></Reveal>
      </Section>

      <Section>
        <div className="svc-split">
          <Reveal>
            <h2 className="svc-h2">Every alert, explained</h2>
            <p>We don't just send you a list of names. Each alert shows why it was flagged, how risky it looks and how long you have to act.</p>
            <p>Similarity is judged the way examiners and courts do it: how the marks look and sound, what they mean, and whether the goods or services are related.</p>
            <Button to={LINKS.start}>Get alerts like this <ArrowRight size={18} /></Button>
          </Reveal>
          <AlertAnatomy />
        </div>
      </Section>

      <Section tone="gray" title="Timing is everything" subtitle="The cheapest moment to stop a rival mark is before it registers.">
        <Timeline items={journey} />
      </Section>

      <Section>
        <div className="svc-split">
          <Reveal>
            <h2 className="svc-h2">Don't miss the window</h2>
            <p>Once a similar mark is published, the clock starts. Miss the window and your options get slower and more expensive.</p>
            <p>Brand Watch tracks these dates for you and sends reminders well before they close.</p>
          </Reveal>
          <Reveal><StatStack stats={stats} /></Reveal>
        </div>
      </Section>

      <Section tone="soft" title="What you can do when we find something" subtitle="Most conflicts never reach a courtroom. Start gentle and step up only if needed.">
        <Reveal className="bw-ladder">
          {ladder.map((l) => (
            <div key={l.title} className="bw-ladder__step" style={{ "--i": l.level - 1 }}>
              <span className="bw-ladder__bar"><b /></span>
              <span className="bw-ladder__icon">{l.icon}</span>
              <em>Level {l.level}</em>
              <h3>{l.title}</h3>
              <p>{l.text}</p>
            </div>
          ))}
        </Reveal>
      </Section>

      <Section title="Smarter than a search alert" subtitle="See how Brand Watch compares.">
        <Reveal><CompareTable columns={compareCols} rows={compareRows} highlight={1} /></Reveal>
        <div className="bw-tip">
          <Layers size={22} />
          <p><strong>No trademark yet?</strong> Monitoring works best alongside a federal registration. <Link to={LINKS.register}>Register your trademark first</Link>, then add a watch.</p>
        </div>
      </Section>

      <FaqList faqs={faqs} />
      <CtaBand title="Ready to protect what you've built?" label="Start monitoring" to={LINKS.start} />
      <Testimonials items={testimonials} />
      <ContactCards helpTo={LINKS.attorney} helpTitle="Found a copycat already?" helpText="Talk to us about your options, from a letter to an opposition." helpLabel="Get help now" />
      <ServiceFooter
        footnotes={["Alerts depend on public data sources, which can be delayed or incomplete. No monitoring service can catch every possible conflict."]}
        disclaimer="Leader Business Developer is an independent business-services provider offering monitoring, administrative and document-preparation support. We are not a law firm and do not give legal advice. Oppositions, cancellations and other legal proceedings are handled by licensed attorneys. Deadlines and procedures are set by the USPTO and may change."
      />
    </div>
  );
}
