import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Check, ArrowRight, /* Star, */ ShieldCheck, Phone, Mail, Clock, MessageSquare, 
  Gavel, Landmark, CalendarClock, Trash2, Bell, Lock, Rocket, AlertTriangle, Filter, Cloud, Building2,
  UserRound, Send,
} from "lucide-react";
import Button from "../../../components/common/Button";
import useInView from "../../../hooks/useInView";
import { Reveal, FaqList, Testimonials, ContactCards, CtaBand, ServiceFooter } from "../../../components/service";
import { CONTACT } from "../../../data/site";
import "./Registeredagent.css";

/* ---- EDIT THESE ---- */
// const TRUSTPILOT_URL = "https://www.trustpilot.com/review/leaderbusiness.com"; // your real Trustpilot page
// const TRUST_LABEL = "Excellent"; // keep only if it matches your real rating
const PRICE = "$149"; // placeholder price per year, set your own
const BILLING_NOTE = "Renews yearly. Cancel anytime.*";
const LINKS = { start: "/get-started?service=registered-agent", attorney: "/contact" };

const MAIL = [
  { icon: <Gavel size={18} />, title: "Service of process", sub: "Urgent legal notice", urgent: true },
  { icon: <Landmark size={18} />, title: "State correspondence", sub: "Official state mail" },
  { icon: <CalendarClock size={18} />, title: "Annual report notice", sub: "Deadline reminder" },
  { icon: <Trash2 size={18} />, title: "Junk mail", sub: "Filtered out", junk: true },
];

const whyChoose = [
  { icon: <Bell size={24} />, title: "Alerts & reminders", text: "Get an alert as soon as official mail arrives for you, plus reminders as annual report deadlines approach." },
  { icon: <Clock size={24} />, title: "Reliability & flexibility", text: "Work from anywhere and set your own hours, knowing someone is available to receive physical notices." },
  { icon: <ShieldCheck size={24} />, title: "Peace of mind", text: "Our address, not yours, appears as the registered agent on the public record, and we receive any service of process for you." },
];

const planFeatures = [
  "Documents scanned and uploaded so you can read them from anywhere",
  "Email reminders about annual report deadlines",
  "Cloud storage for your business documents",
  "Paperwork to switch registered agents completed for you",
  "Our address listed on the public record instead of yours",
  "Junk mail filtered out",
];

const steps = [
  { icon: <Building2 size={20} />, title: "Tell us your business name", text: "Start by sharing your legal business name." },
  { icon: <MessageSquare size={20} />, title: "Answer a few questions", text: "We'll ask for some details, such as your contact information." },
  { icon: <Send size={20} />, title: "We complete and file the paperwork", text: "We tell your state we're your new registered agent. If you're switching, we handle that paperwork too." },
];

const whyService = [
  { icon: <AlertTriangle size={24} />, title: "Avoid penalties", text: "Know your legal notices are in good hands, so you never miss critical legal mail." },
  { icon: <Lock size={24} />, title: "Protect your privacy", text: "Put an agent's address on the public record instead of yours, and keep private legal matters private." },
  { icon: <Rocket size={24} />, title: "Free up your time", text: "Spend your hours running and growing the company instead of waiting around for notices during business hours." },
];

const features = [
  { icon: <Gavel size={20} />, title: "Notices go to our address", text: "Critical legal notices are delivered to us instead of your home or workplace." },
  { icon: <Bell size={20} />, title: "Time-sensitive alerts", text: "We alert you when important mail arrives." },
  { icon: <Clock size={20} />, title: "Available in business hours", text: "We're there to receive official mail, which meets the legal requirement." },
  { icon: <Lock size={20} />, title: "Extra privacy", text: "Our address is on public records instead of yours." },
  { icon: <Cloud size={20} />, title: "Secure cloud storage", text: "Reach critical documents anytime, from anywhere." },
  { icon: <Filter size={20} />, title: "Junk mail filtering", text: "Save time and effort by skipping the clutter." },
];

const requirements = [
  "Is a resident of the state, or is an authorized service provider",
  "Is at least 18 years old",
  "Has a physical address in the same state as your business and is present there during regular business hours",
  "Can receive documents delivered by hand or by mail at that address",
];

const tracks = [
  { icon: <Gavel size={22} />, title: "Legal & urgent mail", steps: ["Scanned and uploaded to your account", "Email alert, with reminders if it's unopened", "Postcard notice mailed to your address on file"], tone: "hot" },
  { icon: <Landmark size={22} />, title: "State & other official mail", steps: ["Scanned and uploaded to your account", "Email alert so you can act on it"], tone: "warm" },
  { icon: <Trash2 size={22} />, title: "Junk mail", steps: ["Identified and filtered out", "Shredded so it never clutters your inbox"], tone: "cool" },
];

const compareRows = [
  ["Privacy", "The agent's address is on public records, and they receive any service of process for you.", "Your home or business address is public. You could be served in front of family or co-workers."],
  ["Freedom", "Work from anywhere, on flexible hours.", "You must be at your registered address during business hours, typically Monday to Friday."],
  ["Deadlines", "You're notified when notices arrive and reminded of important dates.", "You track every notice and filing deadline yourself, or risk penalties."],
];

const faqs = [
  ["Who needs a registered agent?", "Businesses in most states are required to have one. Beyond the legal requirement, an agent helps busy owners: they're available in business hours for legal notices and state mail. Many documents have strict deadlines, and missing them can bring penalties. An agent service also keeps your personal address off the public record."],
  ["Why do I need a registered agent?", "Most states require one, sometimes called statutory representation. It helps ensure you never miss legal notices, official state mail or service of process, which helps you avoid penalties and potentially a judgment against your business."],
  ["How do I appoint a registered agent?", "On your own, you'd complete the right formation paperwork for your entity and state, list the agent's name, then submit it and pay the fee to the Secretary of State (some states need in-person or mailed delivery). If you use our service, we take care of that for you after you answer a few questions."],
  ["What happens if my business has no registered agent?", "You risk losing good standing with your state, which can mean fees and penalties. If no one is there to receive service of process, a lawsuit could be filed without you knowing, and you might be unable to respond in time."],
  ["Can I change my registered agent?", "Yes. Depending on your state, you may need to file paperwork and pay a fee. If you choose us as your new agent, we complete that paperwork and update your information with the Secretary of State."],
  ["What kind of mail could I receive?", "Legal mail including service of process, official state correspondence, annual report notices and junk mail. Urgent mail is uploaded, emailed to you and followed by a postcard. Other official mail is uploaded and emailed. Junk is shredded."],
  ["Can I talk to an attorney if I get court documents?", "Yes. You can add an attorney-advice option, which gives you calls with vetted attorneys on new legal matters. Ask our team about how it works and the cost."],
  ["Resident agent, agent for service of process or registered agent: what's the difference?", "Different states use different names, but all three refer to the same role."],
  ["What is a registered agent for an LLC?", "Every LLC must have one. The role is the same for LLCs, corporations and other entities: receive legal notices, official state mail, compliance documents and service of process on the business's behalf."],
  ["What if my agent isn't there during business hours?", "They must be at the address on file with your state during regular hours. If they're not, serious problems can follow. For example, a lawsuit could go to court without your knowledge, leading to a default judgment."],
  ["What if I have several businesses, or operate in more than one state?", "You need a registered agent for every business you own, and in each state where you do business."],
  ["Do limited liability partnerships need one?", "Yes, limited liability partnerships need a registered agent just like LLCs do."],
];

// Add real customer reviews here. The grid grows automatically.
const testimonials = [
  { quote: "Leader Business Developer was an incredible partner. The process was smooth, and the support team was always available when I needed help.", name: "Shannon Greevy", role: "Customer, California" },
];

function MailCard() {
  const [tick, setTick] = useState(4);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 900);
    return () => clearInterval(id);
  }, []);
  const t = tick % 14;
  const round = Math.floor(tick / 14);
  const handled = MAIL.filter((m, i) => t - (i * 2 + 1) >= 2).length;
  const allDone = handled === MAIL.length;
  return (
    <div className="llc-hero__card ra-mail">
      <div className="ra-mail__top">
        <span className="ra-mail__icon"><Mail size={20} /></span>
        <span className={`ra-mail__pill ${allDone ? "is-done" : ""}`}><i />{allDone ? "ALL HANDLED" : "NEW MAIL"}</span>
      </div>
      <h2 className="ra-mail__title">Your registered agent inbox</h2>
      <small className="ra-mail__sub">Delivered to our address, not yours</small>
      <ul className="ra-mail__rows">
        {MAIL.map((m, i) => {
          const s = t - (i * 2 + 1);
          const visible = s >= 0;
          const label = s < 1 ? "Received" : s < 2 ? "Scanned & uploaded" : m.junk ? "Shredded" : "You're alerted";
          const cls = s < 1 ? "is-recv" : s < 2 ? "is-scan" : m.junk ? "is-junk" : "is-done";
          return (
            <li key={`${round}-${m.title}`} className={`ra-mail__row ${visible ? "is-in" : ""} ${m.urgent ? "is-urgent" : ""}`}>
              <span className="ra-mail__ric">{m.icon}</span>
              <div><strong>{m.title}{m.urgent && <em>URGENT</em>}</strong><small>{m.sub}</small></div>
              {visible && <span className={`ra-chip ${cls}`} key={cls}>{s >= 2 && !m.junk && <Check size={12} />}{label}</span>}
            </li>
          );
        })}
      </ul>
      <div className="ra-mail__foot"><span>{handled} of {MAIL.length} handled</span><span className="ra-mail__bar"><b style={{ width: `${(handled / MAIL.length) * 100}%` }} /></span></div>
      <p className="ra-mail__note">Illustration only.</p>
    </div>
  );
}

function Week() {
  const [own, setOwn] = useState(true);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <div className="ra-week">
      <div className="ra-switch" role="tablist">
        <button type="button" role="tab" aria-selected={own} className={own ? "is-active is-warn" : ""} onClick={() => setOwn(true)}><UserRound size={16} /> Be your own agent</button>
        <button type="button" role="tab" aria-selected={!own} className={!own ? "is-active is-good" : ""} onClick={() => setOwn(false)}><ShieldCheck size={16} /> Use an agent service</button>
      </div>
      <div className="ra-week__chart">
        {days.map((d, i) => {
          const tied = own && i < 5;
          return (
            <div key={d} className="ra-week__col">
              <span className={`ra-week__bar ${tied ? "is-tied" : ""}`}><b style={{ height: tied ? "100%" : "8%" }} /></span>
              <small>{d}</small>
            </div>
          );
        })}
      </div>
      <p className={`ra-week__msg ${own ? "is-warn" : "is-good"}`} key={String(own)}>
        {own ? <><strong>About 40 hours a week</strong> tied to one address, so you can receive legal papers in person.</> : <><strong>0 hours tied down.</strong> Your agent is on hand, and you work wherever you like.</>}
      </p>
    </div>
  );
}

export default function RegisteredAgent() {
  const [heroRef, heroInView] = useInView();

  return (
    <div className="svc biz-page ra-page">
      {/* HERO */}
      <section className="llc-hero" ref={heroRef}>
        <span className="ra-blob ra-blob--a" aria-hidden="true" />
        <span className="ra-blob ra-blob--b" aria-hidden="true" />
        <div className="container">
          <nav className="dba-crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link> / <Link to="/business">Business</Link> / <span>Registered agent</span>
          </nav>
          <div className="llc-hero__grid">
            <div className={`llc-hero__content ${heroInView ? "is-in" : ""}`}>
              <h1 className="llc-hero__title" style={{ "--d": 0 }}>Stay compliant with a registered agent you can count on</h1>
              <p className="llc-hero__subtitle" style={{ "--d": 1 }}>
                Protect your business, keep your address private and free up your time. A registered agent is legally required in most states. Service from <strong className="dba-price">{PRICE}/year</strong>.*
              </p>
              <div className="ra-cta-row" style={{ "--d": 2 }}>
                <Button to={LINKS.start}>Get a registered agent <ArrowRight size={18} /></Button>
                <a href={`tel:${CONTACT.phone}`} className="ra-ghost"><Phone size={16} /> Talk to us</a>
              </div>
              <div className="llc-hero__trust" style={{ "--d": 3 }}>
                {/* Trustpilot rating hidden for now
                <strong>{TRUST_LABEL}</strong>
                <span className="llc-hero__stars">{[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#2fa24f" color="#2fa24f" />)}</span>
                <a className="llc-hero__badge corp-tp" href={TRUSTPILOT_URL} target="_blank" rel="noopener noreferrer"><Star size={12} fill="#ffffff" color="#ffffff" /> Trustpilot</a>
                <span className="llc-hero__sep" />
                */}
                <a href="#ra-guarantee" className="dba-guarantee-link"><ShieldCheck size={16} /> Learn about our guarantee</a>
              </div>
            </div>
            <div className={`llc-hero__visual ${heroInView ? "is-in" : ""}`}><MailCard /></div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="dba-section">
        <div className="container">
          <h2 className="llc-section__title">Why choose us as your registered agent?</h2>
          <p className="llc-section__subtitle">Focus on your business while we focus on keeping you compliant. We'll promptly alert you to legal notices and other official mail.</p>
          <Reveal className="dba-grid dba-grid-3">
            {whyChoose.map((r) => (
              <div key={r.title} className="llc-reason"><div className="llc-reason__icon">{r.icon}</div><h3>{r.title}</h3><p>{r.text}</p></div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* PRICING */}
      <section className="llc-packages dba-section--gray" id="pricing">
        <div className="container">
          <h2 className="llc-section__title">Protect your business with our registered agent service</h2>
          <Reveal className="ra-plan-wrap">
            <article className="llc-package-card is-featured ra-plan">
              <span className="llc-package-card__badge">Everything included</span>
              <h3 className="llc-package-card__name">Registered agent service</h3>
              <div className="llc-package-card__price"><span className="llc-package-card__amount">{PRICE}</span><span className="llc-package-card__fees">/year*</span></div>
              <small className="ra-billing">{BILLING_NOTE}</small>
              <Button variant="primary" to={LINKS.start} className="llc-package-card__btn">Get started</Button>
              <div className="llc-package-card__group"><h4>Included</h4><ul>{planFeatures.map((f) => <li key={f}><Check size={16} />{f}</li>)}</ul></div>
            </article>
          </Reveal>
          <Reveal>
            <div className="dba-guarantee" id="ra-guarantee">
              <ShieldCheck size={40} />
              <p><strong>Accurate filing commitment.</strong> If a filing we prepare is rejected or incorrect because of our error, we'll correct it with the government agency at no extra cost to you.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STEPS */}
      <section className="dba-section dba-section--soft">
        <div className="container">
          <h2 className="llc-section__title">How to get a registered agent in 3 easy steps</h2>
          <Reveal className="ra-path">
            {steps.map((s, i) => (
              <div key={s.title} className="ra-path__step" style={{ "--i": i }}>
                <span className="ra-path__icon">{s.icon}</span>
                <b>Step {i + 1}</b>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </Reveal>
          <div className="llc-center"><Button to={LINKS.start}>Get a registered agent <ArrowRight size={18} /></Button></div>
        </div>
      </section>

      {/* WHY USE A SERVICE */}
      <section className="dba-section">
        <div className="container">
          <h2 className="llc-section__title">Why use a registered agent service?</h2>
          <p className="llc-section__subtitle">Most states require every business to have a registered agent. Instead of taking on the task yourself, leave it to a professional.</p>
          <Reveal className="dba-grid dba-grid-3">
            {whyService.map((r) => (
              <div key={r.title} className="llc-reason"><div className="llc-reason__icon">{r.icon}</div><h3>{r.title}</h3><p>{r.text}</p></div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* FEATURES */}
      <section className="dba-section dba-section--gray">
        <div className="container">
          <h2 className="llc-section__title">What our registered agent service includes</h2>
          <Reveal className="dba-grid dba-grid-3 dba-mt">
            {features.map((f) => (
              <div key={f.title} className="ra-tile"><span>{f.icon}</span><div><strong>{f.title}</strong><small>{f.text}</small></div></div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHAT IS IT + FLOW */}
      <section className="dba-section">
        <div className="container">
          <Reveal className="dba-split">
            <div>
              <h2 className="dba-h2">What is a registered agent?</h2>
              <p>By law, a registered agent is a service, or a person over 18, available during regular business hours at a physical address to receive critical mail and legal notices on the company's behalf, such as service of process.</p>
              <p>Agents must be officially designated with the Secretary of State's office.</p>
              <Button to={LINKS.start}>Get a registered agent <ArrowRight size={18} /></Button>
            </div>
            <div className="ra-flow" aria-hidden="true">
              <div className="ra-flow__node"><span><Landmark size={22} /></span><b>Court or state</b><small>Sends notices</small></div>
              <div className="ra-flow__link"><i /></div>
              <div className="ra-flow__node is-agent"><span><Building2 size={22} /></span><b>Registered agent</b><small>Receives and forwards</small></div>
              <div className="ra-flow__link"><i /></div>
              <div className="ra-flow__node"><span><UserRound size={22} /></span><b>You</b><small>Alerted right away</small></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* DO I NEED ONE */}
      <section className="dba-section dba-section--soft">
        <div className="container dba-narrow">
          <Reveal className="dba-callout">
            <h2 className="dba-h2">Do I need a registered agent for my LLC, corporation or nonprofit?</h2>
            <p>Any active registered business entity needs one, sometimes called a statutory agent. They accept and forward legal notices and official state mail, and act as the agent for service of process. You need one in every state where your business operates.</p>
            <p>It gives courts and your state a physical place to send notices and filings. If you never learn that a lawsuit has gone to court, you could lose your chance to defend yourself.</p>
            <Button to={LINKS.start}>Get a registered agent <ArrowRight size={18} /></Button>
          </Reveal>
        </div>
      </section>

      {/* REQUIREMENTS */}
      <section className="dba-section">
        <div className="container">
          <Reveal className="dba-split">
            <div>
              <h2 className="dba-h2">What's required to be a registered agent?</h2>
              <p>To meet legal requirements, an agent must be an authorized service provider like us, or an individual who:</p>
            </div>
            <ul className="ra-checks">
              {requirements.map((r, i) => <li key={r} style={{ "--i": i }}><span><Check size={15} /></span>{r}</li>)}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* MAIL TRACKS */}
      <section className="dba-section dba-section--gray">
        <div className="container">
          <h2 className="llc-section__title">What happens when mail arrives?</h2>
          <p className="llc-section__subtitle">Different mail gets different handling, so urgent items never get buried.</p>
          <Reveal className="dba-grid dba-grid-3">
            {tracks.map((t) => (
              <div key={t.title} className={`ra-track is-${t.tone}`}>
                <span className="ra-track__icon">{t.icon}</span>
                <h3>{t.title}</h3>
                <ol>{t.steps.map((s) => <li key={s}>{s}</li>)}</ol>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* COMPARE */}
      <section className="dba-section">
        <div className="container">
          <h2 className="llc-section__title">Using a registered agent service vs. being your own</h2>
          <p className="llc-section__subtitle">Serving as your own registered agent may not be the best option for you and your business.</p>
          <Reveal className="dba-split ra-compare">
            <Week />
            <div className="llc-table-wrap">
              <table className="llc-table ra-table">
                <thead><tr><th>&nbsp;</th><th>Agent service</th><th>Being your own</th></tr></thead>
                <tbody>{compareRows.map(([a, b, c]) => <tr key={a}><td><strong>{a}</strong></td><td>{b}</td><td>{c}</td></tr>)}</tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand title="Ready to get a registered agent?" label="Get a registered agent" to={LINKS.start} />

      <FaqList faqs={faqs} />

      <CtaBand title="Ready to get a registered agent?" label="Get a registered agent" to={LINKS.start} />

      <Testimonials items={testimonials} title="What our customers are saying" />

      <ContactCards helpTo={LINKS.attorney} />

      <ServiceFooter
        footnotes={[
          <>*The service renews each year until you cancel, and the renewal rate may change. If you cancel, we may ask for proof that a new registered agent has been designated with your state.</>,
        ]}
        disclaimer={<>Leader Business Developer is an independent business-services provider. We are not a law firm or a government agency and do not provide legal advice. Registered agent requirements, fees and filing procedures vary by state. Mail handling shown on this page is illustrative of our standard process.</>}
      />
    </div>
  );
}