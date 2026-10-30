import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, ChevronDown, Users, DollarSign, Target, RotateCcw, Lightbulb, Wrench, Rocket } from "lucide-react";
import Seo from "../../components/common/Seo";
import { Reveal, Section, ServiceFooter } from "../../components/service";
import { ResHero, FaqBlock, RelatedLinks } from "./ResBits";
import { RoadmapVisual } from "./ResourcesVisual";
import { RES_SEO, LEARN_GUIDES, HUBS, store } from "./resources";
import "../forms/Forms.css";
import "./Resources.css";

const PATH = "/resources/learn/start-business";
const KEY = "lbd-roadmap";

const PHASES = [
  { id: "validate", icon: <Lightbulb size={17} />, label: "Validate", steps: [
    ["Test your idea", "Talk to at least ten potential customers before spending money. Ask about the problem, not your solution. Look at competitors' reviews to find gaps you can fill.", null],
    ["Write a one-page plan", "Capture your customer, offer, pricing, how you'll reach buyers and what success looks like in 12 months. A lean plan you'll actually update beats a 40-page document.", null],
    ["Estimate your startup costs", "List one-time costs, monthly expenses and a cash cushion. Many new owners underestimate how long it takes to reach steady revenue.", ["/resources/tools/cost-calculator", "Startup cost calculator"]],
  ] },
  { id: "setup", icon: <Wrench size={17} />, label: "Set up", steps: [
    ["Choose a business structure", "Sole proprietorship, LLC or corporation. The choice affects personal liability, taxes and paperwork. Most small businesses start as an LLC.", ["/resources/learn/llc-vs-corporation", "LLC vs. corporation guide"]],
    ["Pick and check your name", "Make sure it's memorable, available in your state, free of trademark conflicts, and that a matching domain and social handles exist.", ["/resources/tools/name-check", "Name availability check"]],
    ["Register your business", "File formation documents, such as articles of organization for an LLC, with your state and appoint a registered agent.", ["/business/llc", "Form an LLC"]],
    ["Get an EIN", "Your free federal tax ID from the IRS, needed for hiring, banking and most business tax filings.", ["/forms/legal/ein", "EIN (SS-4) guide"]],
    ["Open a business bank account", "Keep business and personal money separate from day one. It simplifies taxes and helps protect your liability shield.", ["/banking", "Business banking"]],
  ] },
  { id: "launch", icon: <Rocket size={17} />, label: "Launch", steps: [
    ["Get licenses, permits & insurance", "Requirements depend on your industry, city and state. General liability insurance is a sensible baseline for most businesses.", ["/business/licenses", "Business licenses"]],
    ["Build your brand & stay compliant", "Set up a website, logo and online profiles, then put annual reports and tax deadlines on your calendar.", ["/resources/learn/compliance", "Staying compliant guide"]],
  ] },
];
const ALL = PHASES.flatMap((p) => p.steps.map((s) => s[0]));

const MYTHS = [
  ["You need a big idea", "Most successful small businesses do something familiar, better or more conveniently for a specific group of customers."],
  ["You need lots of money", "Many service businesses start for a few hundred dollars. What you need is enough runway to reach paying customers."],
  ["Register first, figure it out later", "Validate demand first. Forming an entity is quick; unwinding a business nobody wants is expensive."],
  ["An LLC means no paperwork", "LLCs still have annual reports, tax filings and record-keeping. They're simpler than corporations, not maintenance-free."],
];

const FAQS = [
  ["What's the first step to starting a business?", "Validate the idea before anything else. Speak with potential customers, confirm they have the problem you're solving and would pay for your solution. Registration, branding and websites come after you know there's demand."],
  ["Do I need to register my business before I start selling?", "Sole proprietors can often start under their own legal name without registering an entity, though licenses and a DBA may still be needed. Forming an LLC or corporation before you take on real risk, like signing leases or hiring, gives you liability protection."],
  ["How long does it take to start a business?", "Paperwork can take days to a few weeks, depending on your state's processing times. Validating your idea, building your offer and finding first customers usually takes longer, often a few months."],
  ["Can I start a business while keeping my full-time job?", "Yes, many people do. Check your employment agreement for non-compete, moonlighting or intellectual property clauses, avoid using your employer's time or equipment, and keep the two strictly separate."],
  ["Can I deduct the costs of starting a business?", "Often, yes. Under federal tax rules you may be able to deduct up to $5,000 of startup costs in your first year, reduced once total startup costs exceed $50,000, with the rest deducted over 15 years. Ask a tax professional how it applies to you."],
];

export default function StartBusiness() {
  const [phase, setPhase] = useState("validate");
  const [done, setDone] = useState(() => store.get(KEY, []));
  const [open, setOpen] = useState(null);
  const [flipped, setFlipped] = useState([]);
  useEffect(() => store.set(KEY, done), [done]);
  const toggle = (s) => setDone((d) => (d.includes(s) ? d.filter((x) => x !== s) : [...d, s]));
  const pct = Math.round((done.filter((d) => ALL.includes(d)).length / ALL.length) * 100);
  const cur = PHASES.find((p) => p.id === phase);
  const offset = PHASES.slice(0, PHASES.indexOf(cur)).reduce((a, p) => a + p.steps.length, 0);

  return (
    <div className="svc mc-page lf-page rs-page rs-start">
      <Seo {...RES_SEO[PATH]} path={PATH} faqs={FAQS} />

      <ResHero
        hub={HUBS.learn}
        label="Starting Your First Business"
        title="Starting your first business: a clear roadmap from idea to launch"
        subtitle={<>Ten practical steps, in the right order. <strong>Track your progress as you go</strong>, avoid the mistakes most first-time founders make, and get the forms and tools you need at each stage.</>}
        primary={{ label: "Start the roadmap", href: "#rs-roadmap" }}
        secondary={{ label: "Estimate my costs", to: "/resources/tools/cost-calculator" }}
        visual={<RoadmapVisual />}
      />

      {/* intro: three questions */}
      <Section>
        <div className="rs-start__intro">
          <div>
            <h2>Before you begin</h2>
            <p>Starting a business is less about one big leap and more about a sequence of small, sensible decisions. The founders who struggle usually skip the early ones: they register a company, build a website and order business cards before confirming anyone will buy. The ones who succeed spend their first weeks talking to customers and running the numbers.</p>
            <p>This guide walks you through each step in order, from testing your idea to opening your doors. Every step links to a deeper guide, a free tool or the form you'll need, so you're never guessing what comes next.</p>
          </div>
          <Reveal className="rs-start__qs">
            {[[<Users size={20} key="u" />, "Who is it for?", "Describe your ideal customer in one sentence."], [<Target size={20} key="t" />, "Why will they buy?", "What problem do you solve better than the alternatives?"], [<DollarSign size={20} key="d" />, "How will it pay?", "Price, costs and how many sales you need to break even."]].map(([ic, q, d], i) => (
              <div key={q} style={{ "--i": i }}><span>{ic}</span><b>{q}</b><small>{d}</small></div>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* roadmap */}
      <Section id="rs-roadmap" tone="gray" title="Your 10-step launch roadmap" subtitle="Tick steps off as you complete them. Your progress is saved in this browser.">
        <Reveal className="rs-road">
          <div className="rs-road__top">
            <div className="rs-road__phases" role="tablist">
              {PHASES.map((p) => {
                const n = p.steps.filter((s) => done.includes(s[0])).length;
                return <button key={p.id} type="button" role="tab" aria-selected={phase === p.id} className={phase === p.id ? "is-on" : ""} onClick={() => setPhase(p.id)}>{p.icon}{p.label}<em>{n}/{p.steps.length}</em></button>;
              })}
            </div>
            <div className="rs-road__prog"><div><i style={{ width: `${pct}%` }} /></div><b>{pct}%</b>{done.length > 0 && <button type="button" onClick={() => setDone([])} aria-label="Reset progress"><RotateCcw size={14} /></button>}</div>
          </div>
          <ol className="rs-road__steps" key={phase}>
            {cur.steps.map(([t, d, link], i) => (
              <li key={t} className={`${done.includes(t) ? "is-done" : ""} ${open === t ? "is-open" : ""}`} style={{ "--i": i }}>
                <button type="button" className="rs-road__check" aria-pressed={done.includes(t)} aria-label={`Mark "${t}" done`} onClick={() => toggle(t)}>{done.includes(t) ? <Check size={15} /> : offset + i + 1}</button>
                <div>
                  <button type="button" className="rs-road__title" aria-expanded={open === t} onClick={() => setOpen(open === t ? null : t)}>{t}<ChevronDown size={17} /></button>
                  {open === t && <div className="rs-road__body"><p>{d}</p>{link && <Link to={link[0]}>{link[1]} <ArrowRight size={14} /></Link>}</div>}
                </div>
              </li>
            ))}
          </ol>
          {pct === 100 && <p className="rs-road__done"><Rocket size={18} /> All ten steps complete. Congratulations, you're open for business!</p>}
        </Reveal>
      </Section>

      {/* myths */}
      <Section title="First-timer myths, busted" subtitle="Tap a card to see the reality.">
        <Reveal className="rs-myths">
          {MYTHS.map(([m, r], i) => (
            <button key={m} type="button" className={`rs-myth ${flipped.includes(i) ? "is-flipped" : ""}`} aria-pressed={flipped.includes(i)} onClick={() => setFlipped((f) => (f.includes(i) ? f.filter((x) => x !== i) : [...f, i]))}>
              <span className="front"><em>Myth</em><b>“{m}”</b><small>Tap to flip</small></span>
              <span className="back"><em>Reality</em><small>{r}</small></span>
            </button>
          ))}
        </Reveal>
      </Section>

      {/* cost note */}
      <Section tone="soft">
        <Reveal className="rs-start__cost">
          <DollarSign size={28} />
          <div>
            <h3>Budget before you build</h3>
            <p>Your startup budget should cover one-time costs (formation fees, equipment, a website), monthly costs (software, rent, marketing) and a cash cushion of several months. Some startup costs may be tax deductible: federal rules can allow up to $5,000 in the first year, phasing out above $50,000 in total startup costs.</p>
          </div>
          <Link to="/resources/tools/cost-calculator" className="lf-btn">Open the cost calculator <ArrowRight size={16} /></Link>
        </Reveal>
      </Section>

      <FaqBlock faqs={FAQS} title="Starting a business: FAQs" variant="grid" tone="gray" />

      <Section>
        <RelatedLinks items={LEARN_GUIDES} current={PATH} title="Keep learning" hub={HUBS.learn} />
        <Reveal className="rs-band">
          <div><h2>Ready to make it official?</h2><p>We'll form your LLC, get your EIN and set up your registered agent, so you can focus on customers.</p></div>
          <div className="lf-actions"><Link to="/business/llc" className="lf-btn">Start my business <ArrowRight size={16} /></Link><Link to="/consultation" className="svc-ghost-btn">Talk to a specialist</Link></div>
        </Reveal>
      </Section>

      <ServiceFooter />
    </div>
  );
}
