import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Check, ArrowRight, /* Star, */ ShieldCheck, MessageSquare, 
  FileSignature, ScrollText, Users, Lock, Banknote, Handshake, Shield, ClipboardCheck, PenLine,
  AlertTriangle, Zap, Layers, LogOut, Briefcase, Sparkles, Crown,
} from "lucide-react";
import Button from "../../../components/common/Button";
import useInView from "../../../hooks/useInView";
import { Reveal, FaqList, Testimonials, ContactCards, CtaBand, ServiceFooter } from "../../../components/service";
import "./Operatingagreement.css";

/* ---- EDIT THESE ---- */
// const TRUSTPILOT_URL = "https://www.trustpilot.com/review/leaderbusiness.com"; // your real Trustpilot page
// const TRUST_LABEL = "Excellent"; // keep only if it matches your real rating
const PRICES = { standard: "$99", rush: "$199" }; // placeholder prices, set your own
const LINKS = { start: "/get-started?service=operating-agreement", attorney: "/contact" };

const DOC_CLAUSES = ["Members & ownership", "Management structure", "Capital contributions", "Profit sharing", "Admitting new members"];

const plans = [
  { id: "standard", name: "Standard", price: PRICES.standard, tagline: "Your custom operating agreement, prepared from your answers.", cta: "Get started",
    features: ["A custom operating agreement based on your answers", "Ready-to-sign digital copy", "Support if you have questions"] },
  { id: "rush", name: "Rush", price: PRICES.rush, badge: "Fastest service", tagline: "The same agreement with priority handling when you're in a hurry.", cta: "Get started fast",
    features: ["A custom operating agreement based on your answers", "Expedited processing of your paperwork", "Priority delivery of your final document"] },
];

const whyUs = [
  { icon: <Zap size={24} />, title: "Convenience", text: "Set up your operating agreement in 3 simple steps, from anywhere. Tell us about your business and we prepare your document." },
  { icon: <ShieldCheck size={24} />, title: "Peace of mind", text: "Feel confident your agreement helps protect company assets and supports your limited liability status." },
  { icon: <Layers size={24} />, title: "Experienced support", text: "We lean on our experience with LLC paperwork to help safeguard your company and its members." },
];

const steps = [
  { icon: <MessageSquare size={20} />, title: "You tell us about your business", text: "Answer a few simple questions about your LLC and how you plan to run it." },
  { icon: <ScrollText size={20} />, title: "We prepare the paperwork", text: "We create a personalized operating agreement from your answers." },
  { icon: <PenLine size={20} />, title: "You get it signed", text: "Share it with your fellow members and have everyone sign to make it official." },
];

const purposes = [
  { icon: <Users size={24} />, title: "Member control", text: "Without your own agreement, your LLC is governed by your state's default rules, which may not fit how you want to run things." },
  { icon: <Shield size={24} />, title: "Liability protection", text: "Without one, members could face personal liability if the business appears to operate like a sole proprietorship or partnership." },
  { icon: <ClipboardCheck size={24} />, title: "Business clarity", text: "A written agreement makes the arrangement clear to every member and minimizes misunderstandings." },
];

const benefits = [
  { icon: <Lock size={22} />, title: "Personal protection", text: "Helps show the LLC is separate from its owners, which supports limited liability." },
  { icon: <Banknote size={22} />, title: "Financial clarity", text: "Financial provisions set out who can make money decisions." },
  { icon: <Sparkles size={22} />, title: "Trade secret security", text: "Confidentiality or non-compete terms can help protect your intellectual property." },
  { icon: <Handshake size={22} />, title: "Conflict prevention", text: "Spell out possible conflicts of interest to avoid issues later." },
];

const SCEN = [
  ["Splitting profits", "State default rules decide, and they may not match your deal.", "Your agreement spells out who receives what, and when."],
  ["Making decisions", "Default state rules govern voting and management.", "You decide who manages and how members vote."],
  ["Adding a member", "There's no agreed process, which can lead to disputes.", "You define when and how new members can join."],
  ["A member leaves", "The state's default process applies.", "You've agreed in advance what happens to their share."],
];

const BUILD = [
  { id: "members", label: "Number of members", sample: "Identifies each member and records who owns the LLC." },
  { id: "mgmt", label: "Management structure", sample: "States whether members or appointed managers run the business." },
  { id: "capital", label: "Member investments", sample: "Records what each member contributes in cash or property." },
  { id: "profit", label: "Profit sharing", sample: "Sets how profits and losses are shared and paid out." },
  { id: "tax", label: "Tax considerations", sample: "Notes how the LLC will be treated for tax purposes." },
  { id: "admit", label: "Admitting new members", sample: "Explains when and how new members can be brought in." },
  { id: "dissolve", label: "Dissolution", sample: "Plans how the LLC is wound up and assets are distributed." },
];

const compareRows = [
  ["Purpose", "Internal rules that guide how your LLC runs and how members work together.", "Officially creates your LLC with the state."],
  ["State fees", "Generally none, since it isn't filed with the state.", "A state filing fee applies, and it varies by state."],
  ["Required?", "Required in a few states, such as California, New York, Missouri, Maine and Delaware. A good idea everywhere.", "Required in every state to form an LLC."],
  ["Who uses it", "Members, banks and investors who want proof of ownership and structure.", "The state, as the record that your LLC exists."],
];

const single = [
  { icon: <Crown size={22} />, title: "Ownership", text: "State that you're the sole owner and that you have limited liability." },
  { icon: <Briefcase size={22} />, title: "Management", text: "Describe your role as sole manager, or what you delegate to hired managers." },
  { icon: <Banknote size={22} />, title: "Contributions & distributions", text: "Record what you put in and how profits and losses go to you." },
  { icon: <ScrollText size={22} />, title: "General rules", text: "Set basic rules for running the LLC, including meetings and note-taking." },
  { icon: <LogOut size={22} />, title: "Dissolution", text: "Plan how you'd wind up the LLC and distribute assets if needed." },
  { icon: <PenLine size={22} />, title: "Signature", text: "Sign it, keep it somewhere safe, and make a few copies." },
];

const faqs = [
  ["What should an operating agreement include?", "It varies with the business and membership, but even single-member LLCs usually cover member identification, a statement of intent, business purposes, the term of the agreement, tax treatment and how new members are admitted. Optional extras include capital contributions, member meetings and voting, and dissolution procedures."],
  ["How important is an operating agreement for an LLC?", "Very. Without one you can't set binding rules for your LLC, protect your assets as well, or settle misunderstandings with other members, and the LLC defaults to your state's operating rules."],
  ["What is the purpose of an operating agreement?", "To set the rules and guidelines for the business. It can also help guard against personal liability, financial liability, trade secret sharing and conflicts of interest."],
  ["Do I need an operating agreement if it's just me?", "It's wise to have one. It can protect your assets and interests, replace default state provisions, serve as an extra document for lenders, name who takes over management, and reinforce the separation between you and the business."],
  ["Can I make my own operating agreement?", "Yes, you can draft one yourself. Working with us helps you feel confident it is done properly and covers your members, and it's a quick way to get there by answering a few questions online."],
  ["What is membership interest?", "It's a person's ownership stake in an LLC. A member with membership interest is entitled to a share of profits and to voting rights."],
  ["What is a limited liability company?", "An LLC is a business entity authorized by state law, designed to offer some of a corporation's benefits with less formality."],
  ["Do I need an attorney to review it?", "It isn't required, but an attorney can tailor the agreement to complex situations, such as several owners with unequal contributions. We are not a law firm, so consider legal advice for special circumstances."],
];

// Add real customer reviews here. The grid grows automatically.
const testimonials = [
  { quote: "Leader Business Developer was an incredible partner. The process was smooth, and the support team was always available when I needed help.", name: "Shannon Greevy", role: "Customer, California" },
];

function DocCard() {
  const [tick, setTick] = useState(3);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 800);
    return () => clearInterval(id);
  }, []);
  const stage = tick % 11;
  const shown = Math.min(stage, 5);
  const sig1 = stage >= 6;
  const sig2 = stage >= 7;
  const signed = stage >= 8;
  const round = Math.floor(tick / 11);
  return (
    <div className="llc-hero__card oa-doc">
      <div className="oa-doc__top">
        <span className="oa-doc__icon"><FileSignature size={20} /></span>
        <span className={`oa-doc__pill ${signed ? "is-done" : ""}`}><i />{signed ? "SIGNED" : "DRAFTING"}</span>
      </div>
      <div className="oa-paper">
        <h2>Operating Agreement</h2>
        <small>Sample LLC · illustration</small>
        <ul>
          {DOC_CLAUSES.map((c, i) => (
            <li key={`${round}-${c}`} className={i < shown ? "is-in" : ""}>
              <span className="oa-paper__n">{i + 1}</span>
              <div><strong>{c}</strong><span className="oa-paper__lines"><b /><b /></span></div>
              <Check size={14} />
            </li>
          ))}
        </ul>
        <div className="oa-sigs">
          {[["Member 1", sig1, "M4 24 C 12 2, 22 2, 20 22 S 34 30, 42 10 S 58 20, 70 12"], ["Member 2", sig2, "M4 18 C 14 30, 20 4, 28 18 S 44 4, 50 22 S 62 12, 72 20"]].map(([label, on, path]) => (
            <div key={`${round}-${label}`} className="oa-sig">
              <svg viewBox="0 0 76 34" aria-hidden="true">{on && <path d={path} />}</svg>
              <i /><small>{label}</small>
            </div>
          ))}
        </div>
        {signed && <span className="oa-stamp" key={`s-${round}`}>Signed</span>}
      </div>
    </div>
  );
}

function WithWithout() {
  const [on, setOn] = useState(false);
  return (
    <div className="oa-vs">
      <div className="oa-switch" role="tablist">
        <button type="button" role="tab" aria-selected={!on} className={!on ? "is-active is-warn" : ""} onClick={() => setOn(false)}><AlertTriangle size={16} /> Without an agreement</button>
        <button type="button" role="tab" aria-selected={on} className={on ? "is-active is-good" : ""} onClick={() => setOn(true)}><ShieldCheck size={16} /> With an agreement</button>
      </div>
      <ul className={`oa-vs__list ${on ? "is-good" : "is-warn"}`}>
        {SCEN.map(([t, a, b], i) => (
          <li key={`${t}-${on}`} style={{ "--i": i }}>
            <span>{on ? <Check size={18} /> : <AlertTriangle size={18} />}</span>
            <div><strong>{t}</strong><small>{on ? b : a}</small></div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Builder() {
  const [sel, setSel] = useState(["members", "mgmt", "profit"]);
  const toggle = (id) => setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const chosen = BUILD.filter((b) => sel.includes(b.id));
  return (
    <div className="oa-build">
      <div className="oa-build__picker">
        <h3>Pick what to include</h3>
        <p>Tap sections to add them to your sample agreement.</p>
        {BUILD.map((b) => (
          <button type="button" key={b.id} className={sel.includes(b.id) ? "is-on" : ""} onClick={() => toggle(b.id)} aria-pressed={sel.includes(b.id)}>
            <span className="oa-build__box"><Check size={14} /></span>{b.label}
          </button>
        ))}
      </div>
      <div className="oa-build__paper">
        <div className="oa-build__head"><FileSignature size={18} /><b>Your agreement preview</b><em>{chosen.length} {chosen.length === 1 ? "section" : "sections"}</em></div>
        {chosen.length === 0 ? <p className="oa-build__empty">Select at least one section to see it appear here.</p> : (
          <ol>{chosen.map((b) => <li key={b.id}><strong>{b.label}</strong><span>{b.sample}</span></li>)}</ol>
        )}
        <small>Illustration only. Your final agreement is prepared from your answers.</small>
      </div>
    </div>
  );
}

export default function OperatingAgreement() {
  const [heroRef, heroInView] = useInView();

  return (
    <div className="svc oa-page">
      {/* HERO */}
      <section className="llc-hero" ref={heroRef}>
        <span className="oa-blob oa-blob--a" aria-hidden="true" />
        <span className="oa-blob oa-blob--b" aria-hidden="true" />
        <div className="container">
          <nav className="dba-crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link> / <Link to="/business">Business</Link> / <span>Operating agreement</span>
          </nav>
          <div className="llc-hero__grid">
            <div className={`llc-hero__content ${heroInView ? "is-in" : ""}`}>
              <h1 className="llc-hero__title" style={{ "--d": 0 }}>Put your LLC's ground rules in writing</h1>
              <p className="llc-hero__subtitle" style={{ "--d": 1 }}>
                An operating agreement sets the structure, finances and rules of your LLC, whether you're just starting or already established. Starts at <strong className="dba-price">{PRICES.standard}</strong>.
              </p>
              <div className="oa-cta-row" style={{ "--d": 2 }}>
                <Button to={LINKS.start}>Start my operating agreement <ArrowRight size={18} /></Button>
                <a href="#pricing" className="oa-ghost">Compare packages</a>
              </div>
              <div className="llc-hero__trust" style={{ "--d": 3 }}>
                {/* Trustpilot rating hidden for now
                <strong>{TRUST_LABEL}</strong>
                <span className="llc-hero__stars">{[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#00b67a" color="#00b67a" />)}</span>
                <a className="llc-hero__badge corp-tp" href={TRUSTPILOT_URL} target="_blank" rel="noopener noreferrer"><Star size={12} fill="#fff" color="#fff" /> Trustpilot</a>
                <span className="llc-hero__sep" />
                */}
                <a href="#oa-guarantee" className="dba-guarantee-link"><ShieldCheck size={16} /> Learn about our guarantee</a>
              </div>
            </div>
            <div className={`llc-hero__visual ${heroInView ? "is-in" : ""}`}><DocCard /></div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="llc-packages" id="pricing">
        <div className="container">
          <h2 className="llc-section__title">Choose the right operating agreement package</h2>
          <p className="llc-section__subtitle">Same custom document, with a faster option when time matters.</p>
          <Reveal className="dba-grid dba-grid-2">
            {plans.map((p) => (
              <article key={p.id} className={`llc-package-card ${p.id === "rush" ? "is-featured" : ""}`}>
                {p.badge && <span className="llc-package-card__badge">{p.badge}</span>}
                <h3 className="llc-package-card__name">{p.name}</h3>
                <div className="llc-package-card__price"><span className="llc-package-card__amount">{p.price}</span></div>
                <p className="llc-package-card__tagline">{p.tagline}</p>
                <Button variant={p.id === "rush" ? "primary" : "outline"} to={`${LINKS.start}&package=${p.id}`} className="llc-package-card__btn">{p.cta}</Button>
                <div className="llc-package-card__group"><ul>{p.features.map((f) => <li key={f}><Check size={16} />{f}</li>)}</ul></div>
              </article>
            ))}
          </Reveal>
          <Reveal>
            <div className="dba-guarantee" id="oa-guarantee">
              <ShieldCheck size={40} />
              <p><strong>Accurate document commitment.</strong> If your agreement contains an error caused by our mistake, we'll correct it at no additional cost to you.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHY US */}
      <section className="dba-section dba-section--gray">
        <div className="container">
          <h2 className="llc-section__title">Why create your operating agreement with us?</h2>
          <Reveal className="dba-grid dba-grid-3 dba-mt">
            {whyUs.map((r) => (
              <div key={r.title} className="llc-reason"><div className="llc-reason__icon">{r.icon}</div><h3>{r.title}</h3><p>{r.text}</p></div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* STEPS */}
      <section className="dba-section dba-section--soft">
        <div className="container">
          <h2 className="llc-section__title">Create your operating agreement in 3 easy steps</h2>
          <Reveal className="oa-path">
            {steps.map((s, i) => (
              <div key={s.title} className="oa-path__step" style={{ "--i": i }}>
                <span className="oa-path__icon">{s.icon}</span>
                <b>Step {i + 1}</b>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </Reveal>
          <div className="llc-center"><Button to={LINKS.start}>Start my operating agreement <ArrowRight size={18} /></Button></div>
        </div>
      </section>

      {/* WHAT IS IT + TOGGLE */}
      <section className="dba-section">
        <div className="container">
          <Reveal className="dba-split">
            <div>
              <h2 className="dba-h2">What is an LLC operating agreement?</h2>
              <p>It defines how your LLC is organized, sets expectations around finances and ways of working, and explains how the company will grow, especially when and how new members can join. It can also help show banks and investors who owns the LLC, and works for both single-member and multi-member LLCs.</p>
              <p>Without one, your LLC is governed by your state's default rules. See the difference for yourself on the right.</p>
              <Button to={LINKS.start}>Start my operating agreement <ArrowRight size={18} /></Button>
            </div>
            <WithWithout />
          </Reveal>
        </div>
      </section>

      {/* WHY SHOULD I HAVE ONE */}
      <section className="dba-section dba-section--gray">
        <div className="container">
          <h2 className="llc-section__title">Why should I have an operating agreement?</h2>
          <p className="llc-section__subtitle">It serves three important purposes for your LLC.</p>
          <Reveal className="dba-grid dba-grid-3">
            {purposes.map((r, i) => (
              <div key={r.title} className="llc-reason oa-numbered"><span className="oa-numbered__n">{i + 1}</span><div className="llc-reason__icon">{r.icon}</div><h3>{r.title}</h3><p>{r.text}</p></div>
            ))}
          </Reveal>
          <Reveal className="dba-grid dba-grid-4 dba-mt">
            {benefits.map((c) => (
              <div key={c.title} className="oa-tile"><span>{c.icon}</span><div><strong>{c.title}</strong><small>{c.text}</small></div></div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* COMPARE */}
      <section className="dba-section">
        <div className="container">
          <h2 className="llc-section__title">Operating agreement vs. articles of organization</h2>
          <p className="llc-section__subtitle">They sound alike, but they do very different jobs.</p>
          <Reveal>
            <div className="llc-table-wrap">
              <table className="llc-table oa-table">
                <thead><tr><th>&nbsp;</th><th>LLC operating agreement</th><th>Articles of organization</th></tr></thead>
                <tbody>{compareRows.map(([a, b, c]) => <tr key={a}><td><strong>{a}</strong></td><td>{b}</td><td>{c}</td></tr>)}</tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BUILDER */}
      <section className="dba-section dba-section--soft">
        <div className="container">
          <h2 className="llc-section__title">What goes into an operating agreement?</h2>
          <p className="llc-section__subtitle">Agreements typically cover tax considerations, number of members, management, member investments and profit sharing. Build a sample to see how it comes together.</p>
          <Reveal><Builder /></Reveal>
          <div className="llc-center"><Button to={LINKS.start}>Create mine <ArrowRight size={18} /></Button></div>
        </div>
      </section>

      {/* TEMPLATE QUESTION */}
      <section className="dba-section">
        <div className="container dba-narrow">
          <Reveal className="dba-callout">
            <h2 className="dba-h2">Should I use an operating agreement template?</h2>
            <p>Not every online template is current or fits your situation. Answering a few questions so your agreement is prepared around your LLC helps make sure it protects you and your members.</p>
            <Button to={LINKS.start}>Start my operating agreement <ArrowRight size={18} /></Button>
          </Reveal>
        </div>
      </section>

      {/* SINGLE MEMBER */}
      <section className="dba-section dba-section--gray">
        <div className="container">
          <h2 className="llc-section__title">Operating agreement for a single-member LLC</h2>
          <p className="llc-section__subtitle">You have complete freedom, since nobody else has to agree. Still cover these topics, especially if you'll show it to lenders or add members later.</p>
          <Reveal className="dba-grid dba-grid-3">
            {single.map((s, i) => (
              <div key={s.title} className="oa-topic"><span className="oa-topic__no">{String(i + 1).padStart(2, "0")}</span><div className="oa-topic__icon">{s.icon}</div><h3>{s.title}</h3><p>{s.text}</p></div>
            ))}
          </Reveal>
        </div>
      </section>

      <FaqList faqs={faqs} />

      <CtaBand title="Ready to create your operating agreement?" label="Start my operating agreement" to={LINKS.start} />

      <Testimonials items={testimonials} title="What our customers are saying" />

      <ContactCards helpTo={LINKS.attorney} />

      <ServiceFooter
        disclaimer={<>Leader Business Developer is an independent business-services provider offering administrative and document-preparation assistance. We are not a law firm and do not provide legal advice. Operating agreement requirements vary by state, and the examples on this page are illustrative. Consider consulting a qualified attorney for your specific situation.</>}
      />
    </div>
  );
}