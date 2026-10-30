import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Check, ArrowRight, /* Star, */ ShieldCheck, Scale,
  UserRound, FileSignature, BadgeCheck, Landmark, Shield, TrendingDown, Receipt, Handshake,
  Rocket, Tag, Briefcase, RotateCcw, Sparkles,
} from "lucide-react";
import Button from "../../../components/common/Button";
import useInView from "../../../hooks/useInView";
import { Reveal, CountUp, FaqList, ContactCards, CtaBand, ServiceFooter } from "../../../components/service";
import "./SoleProprietorship.css";

/* ---- EDIT THESE ---- */
// const TRUSTPILOT_URL = "https://www.trustpilot.com/review/leaderbusiness.com"; // your real Trustpilot page
// const TRUST_LABEL = "Excellent"; // keep only if it matches your real rating
const ROUTES = { dba: "/get-started/dba", dbaInfo: "/business/dba", llc: "/business/llc", corp: "/business/corporation", licenses: "/business-licenses", attorney: "/contact" };

const NODES = [
  { icon: <FileSignature size={20} />, title: "Register a DBA", text: "Trade under a business name instead of your own." },
  { icon: <BadgeCheck size={20} />, title: "Get your licenses", text: "Hold the permits your city, county or state requires." },
  { icon: <Landmark size={20} />, title: "Open a business account", text: "Keep business and personal money apart." },
  { icon: <Shield size={20} />, title: "Add protection", text: "Move to an LLC when you want liability protection." },
];

const strip = ["No federal registration needed", "You keep full control", "Simple tax filing", "Low startup cost", "Add a DBA anytime", "Upgrade to an LLC when ready"];

const stats = [
  { to: 1, suffix: "", label: "owner", text: "One person owns and runs the business." },
  { to: 0, prefix: "", suffix: "", label: "federal forms", text: "No federal registration to get started." },
  { to: 100, suffix: "%", label: "control", text: "Every decision, and every dollar of profit, is yours." },
];

const challenges = [
  { icon: <TrendingDown size={24} />, title: "More personal risk", text: "You and the business are the same in the eyes of the law, so lawsuits and debts can reach your personal assets." },
  { icon: <Receipt size={24} />, title: "Taxes on you", text: "Business profit is reported as personal income, and you generally owe self-employment tax on top." },
  { icon: <Handshake size={24} />, title: "Harder to raise money", text: "With no partners, shares or membership interests to offer, attracting investors is tougher." },
];

const builds = [
  { icon: <FileSignature size={24} />, title: "Register a DBA", text: "Operate under a name other than your own, open a bank account in it, and build a brand.", link: ROUTES.dbaInfo, cta: "Learn about DBAs" },
  { icon: <BadgeCheck size={24} />, title: "Business licenses", text: "Make sure you hold every permit and license needed to run legally where you work.", link: ROUTES.licenses, cta: "Learn about licenses" },
  { icon: <Shield size={24} />, title: "Liability protection", text: "Run as an LLC to shield personal assets if the business is ever sued or takes on debt.", link: ROUTES.llc, cta: "Learn about LLCs" },
];

const pathSteps = [
  { icon: <Rocket size={20} />, title: "Start", text: "You're automatically a sole proprietor when you earn income on your own." },
  { icon: <Tag size={20} />, title: "Brand it", text: "File a DBA so customers see your business name." },
  { icon: <Briefcase size={20} />, title: "Operate", text: "Add licenses, a business bank account and insurance." },
  { icon: <Shield size={20} />, title: "Protect and grow", text: "Convert to an LLC or corporation as your risks and ambitions grow." },
];

const todo = [
  "Choose a business name",
  "Register a DBA if you use a different name",
  "Get required licenses and permits",
  "Open a separate business bank account",
  "Track income and expenses every month",
  "Set aside money for self-employment tax",
  "Look into business insurance",
  "Review your structure as you grow",
];

const compare = [
  ["Setup", "Automatic once you start earning", "File articles with the state"],
  ["Personal liability", "Unlimited, you are the business", "Generally limited to what you invest"],
  ["Taxes", "Profit on your personal return, plus self-employment tax", "Flexible, with several tax options"],
  ["Ongoing paperwork", "Minimal", "Annual reports and fees in many states"],
  ["Credibility", "Good, better with a DBA", "Seen as more established"],
  ["Raising capital", "Difficult", "Easier, members and investors can join"],
];

const quiz = [
  "Would a lawsuit or business debt put your home or savings at risk?",
  "Do you plan to hire staff or bring in partners or investors?",
  "Is your business low-risk and just getting started?",
];

const faqs = [
  ["Do I have to use my own name, or can I use another business name?", "By default your business name is your own legal name. You can operate under a different one, called a fictitious business name or DBA. Most states ask you to file an application for it."],
  ["Do I need to register a sole proprietorship with the government?", "No federal filing is needed. If you do business on your own, you're automatically a sole proprietor. Some states and counties do require licenses or permits, and most states require a DBA if you use a name other than your own."],
  ["Can I open a business bank account as a sole proprietor?", "Yes, and you should keep business and personal money separate. Many banks allow it with your Social Security number. If you use a DBA, they will usually ask for proof that it was filed."],
  ["Can I change to an LLC or corporation later?", "Yes. You can restructure whenever you outgrow a sole proprietorship, for example to add partners or investors, or to get liability protection and different tax options."],
  ["Do I need an EIN if I file a DBA?", "That depends on your structure, not on whether you have a DBA. Sole proprietors without employees usually use their Social Security number. You need an EIN to hire employees, and many banks and entities require one."],
  ["Do sole proprietors pay self-employment tax?", "Generally yes. Net business earnings are subject to self-employment tax in addition to income tax. Speak with a qualified tax professional about your situation."],
];

function OrbitCard() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((n) => (n + 1) % NODES.length), 2800);
    return () => clearInterval(id);
  }, []);
  const node = NODES[active];
  return (
    <div className="llc-hero__card sp-orbit">
      <div className="sp-orbit__stage">
        <span className="sp-orbit__ring" />
        <span className="sp-orbit__ring sp-orbit__ring--2" />
        <div className="sp-orbit__core"><UserRound size={26} /><b>You</b><small>Sole proprietor</small></div>
        {NODES.map((n, i) => (
          <button
            type="button" key={n.title} aria-label={n.title}
            className={`sp-orbit__node ${i === active ? "is-active" : ""}`}
            style={{ "--a": `${i * 90 - 45}deg` }}
            onClick={() => setActive(i)}
          >{n.icon}</button>
        ))}
      </div>
      <div className="sp-orbit__caption" key={active}>
        <strong>{node.title}</strong><span>{node.text}</span>
      </div>
    </div>
  );
}

function Checklist() {
  const [done, setDone] = useState([]);
  const toggle = (i) => setDone((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]));
  const pct = Math.round((done.length / todo.length) * 100);
  return (
    <div className="sp-check">
      <div className="sp-check__side">
        <div className="sp-check__ring" style={{ "--sp-p": pct }}><span>{pct}%</span></div>
        <h3>{pct === 100 ? "You're all set!" : "Your starter checklist"}</h3>
        <p>{done.length} of {todo.length} done. Tap an item to tick it off.</p>
        {done.length > 0 && <button type="button" className="llc-link-btn" onClick={() => setDone([])}><RotateCcw size={14} /> Reset</button>}
      </div>
      <ul className="sp-check__list">
        {todo.map((t, i) => (
          <li key={t}>
            <button type="button" className={done.includes(i) ? "is-done" : ""} onClick={() => toggle(i)} aria-pressed={done.includes(i)}>
              <span className="sp-check__box"><Check size={14} /></span>{t}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Quiz() {
  const [answers, setAnswers] = useState([]);
  const step = answers.length;
  const answer = (v) => setAnswers((a) => [...a, v]);
  let result = null;
  if (step === quiz.length) {
    const [risk, growth] = answers;
    if (growth) result = { title: "Look at an LLC or corporation", text: "Hiring, partners or investors usually call for a more formal structure. A corporation suits outside investment, and an LLC suits flexible ownership.", links: [["Explore LLCs", ROUTES.llc], ["Explore corporations", ROUTES.corp]] };
    else if (risk) result = { title: "Consider an LLC for protection", text: "If personal assets are at stake, an LLC can separate them from business liabilities while staying simple to run.", links: [["Explore LLCs", ROUTES.llc]] };
    else result = { title: "A sole proprietorship plus a DBA may fit", text: "With low risk and a simple setup, staying a sole proprietor and registering a DBA is a light way to get going. Revisit as you grow.", links: [["Register a DBA", ROUTES.dba]] };
  }
  return (
    <div className="sp-quiz">
      <div className="sp-quiz__bar"><b style={{ width: `${(step / quiz.length) * 100}%` }} /></div>
      {!result ? (
        <div className="sp-quiz__q" key={step}>
          <span>Question {step + 1} of {quiz.length}</span>
          <h3>{quiz[step]}</h3>
          <div className="sp-quiz__btns">
            <button type="button" onClick={() => answer(true)}>Yes</button>
            <button type="button" onClick={() => answer(false)}>No</button>
          </div>
        </div>
      ) : (
        <div className="sp-quiz__result" key="result">
          <Sparkles size={28} />
          <h3>{result.title}</h3>
          <p>{result.text}</p>
          <div className="sp-quiz__links">
            {result.links.map(([label, to]) => <Link key={label} to={to} className="llc-cta__btn llc-cta__btn--gold">{label} <ArrowRight size={16} /></Link>)}
            <button type="button" className="llc-link-btn" onClick={() => setAnswers([])}><RotateCcw size={14} /> Start over</button>
          </div>
          <small>General information only, not legal or tax advice.</small>
        </div>
      )}
    </div>
  );
}

export default function SoleProprietorship() {
  const [heroRef, heroInView] = useInView();
  const marquee = [...strip, ...strip];

  return (
    <div className="svc biz-page sp-page">
      {/* HERO */}
      <section className="llc-hero" ref={heroRef}>
        <span className="sp-blob sp-blob--a" aria-hidden="true" />
        <span className="sp-blob sp-blob--b" aria-hidden="true" />
        <div className="container">
          <nav className="dba-crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link> / <Link to="/business">Business formation</Link> / <span>Sole proprietorship</span>
          </nav>
          <div className="llc-hero__grid">
            <div className={`llc-hero__content ${heroInView ? "is-in" : ""}`}>
              <h1 className="llc-hero__title" style={{ "--d": 0 }}>Run your business your way, with backup when you need it</h1>
              <p className="llc-hero__subtitle" style={{ "--d": 1 }}>
                A sole proprietorship is all yours, but protecting and growing it doesn't have to fall on you alone. We can help you file a DBA, sort out licenses, find legal help and even move up to an LLC.
              </p>
              <div className="sp-cta-row" style={{ "--d": 2 }}>
                <Button to={ROUTES.dba}>Register my DBA <ArrowRight size={18} /></Button>
                <a href="#sp-compare" className="sp-ghost">Compare structures</a>
              </div>
              <div className="llc-hero__trust" style={{ "--d": 3 }}>
                {/* Trustpilot rating hidden for now
                <strong>{TRUST_LABEL}</strong>
                <span className="llc-hero__stars">{[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#2fa24f" color="#2fa24f" />)}</span>
                <a className="llc-hero__badge corp-tp" href={TRUSTPILOT_URL} target="_blank" rel="noopener noreferrer"><Star size={12} fill="#ffffff" color="#ffffff" /> Trustpilot</a>
                <span className="llc-hero__sep" />
                */}
                <span className="llc-hero__trust-item"><ShieldCheck size={16} /> Filing support from real people</span>
              </div>
            </div>
            <div className={`llc-hero__visual ${heroInView ? "is-in" : ""}`}><OrbitCard /></div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="sp-marquee" aria-hidden="true">
        <div className="sp-marquee__track">{marquee.map((t, i) => <span key={i}><Check size={14} />{t}</span>)}</div>
      </div>

      {/* WHAT IS IT */}
      <section className="dba-section">
        <div className="container">
          <Reveal className="dba-split">
            <div>
              <h2 className="dba-h2">What is a sole proprietorship?</h2>
              <p>It's the simplest way to run a business: one owner, no separate legal entity. If you earn income on your own without setting up another structure, you're a sole proprietor automatically.</p>
              <p>That makes it quick and cheap to start, but it also means you and the business are treated as one, which affects liability and taxes.</p>
            </div>
            <div className="sp-stats">
              {stats.map((s) => (
                <div key={s.label} className="sp-stat">
                  <strong><CountUp to={s.to} suffix={s.suffix} /></strong>
                  <span>{s.label}</span>
                  <small>{s.text}</small>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CHALLENGES */}
      <section className="dba-section dba-section--gray">
        <div className="container">
          <h2 className="llc-section__title">Challenges sole proprietors often face</h2>
          <Reveal className="dba-grid dba-grid-3 dba-mt">
            {challenges.map((r) => (
              <div key={r.title} className="llc-reason sp-challenge"><div className="llc-reason__icon">{r.icon}</div><h3>{r.title}</h3><p>{r.text}</p></div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* BUILD */}
      <section className="dba-section">
        <div className="container">
          <h2 className="llc-section__title">How you can build your business</h2>
          <p className="llc-section__subtitle">Pick the upgrades that match where you are right now.</p>
          <Reveal className="dba-grid dba-grid-3">
            {builds.map((r) => (
              <div key={r.title} className="llc-reason">
                <div className="llc-reason__icon">{r.icon}</div><h3>{r.title}</h3><p>{r.text}</p>
                <Link to={r.link} className="sp-link">{r.cta} <ArrowRight size={16} /></Link>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* GROWTH PATH */}
      <section className="dba-section dba-section--soft">
        <div className="container">
          <h2 className="llc-section__title">Your growth path</h2>
          <p className="llc-section__subtitle">Most sole proprietors don't do everything on day one. Here is a common way to build up.</p>
          <Reveal className="sp-path">
            {pathSteps.map((s, i) => (
              <div key={s.title} className="sp-path__step" style={{ "--i": i }}>
                <span className="sp-path__icon">{s.icon}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CHECKLIST */}
      <section className="dba-section">
        <div className="container">
          <h2 className="llc-section__title">Sole proprietor starter checklist</h2>
          <p className="llc-section__subtitle">Track what's done and what's next.</p>
          <Reveal><Checklist /></Reveal>
        </div>
      </section>

      {/* COMPARE */}
      <section className="llc-states dba-section--gray" id="sp-compare">
        <div className="container">
          <h2 className="llc-section__title">Sole proprietorship vs. LLC</h2>
          <p className="llc-section__subtitle">A quick side-by-side of the two structures sole proprietors compare most.</p>
          <Reveal>
            <div className="llc-table-wrap">
              <table className="llc-table sp-table">
                <thead><tr><th>&nbsp;</th><th>Sole proprietorship</th><th>LLC</th></tr></thead>
                <tbody>{compare.map(([a, b, c]) => <tr key={a}><td><strong>{a}</strong></td><td>{b}</td><td>{c}</td></tr>)}</tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* QUIZ */}
      <section className="dba-section">
        <div className="container dba-narrow">
          <h2 className="llc-section__title">Not sure which structure fits?</h2>
          <p className="llc-section__subtitle">Answer three quick questions for a starting point.</p>
          <Reveal><Quiz /></Reveal>
        </div>
      </section>

      {/* LEGAL ADVICE */}
      <section className="dba-section dba-section--soft">
        <div className="container">
          <Reveal className="sp-advice">
            <Scale size={34} />
            <div>
              <h2>Need legal advice?</h2>
              <p>Talk to an attorney about liability, contracts or whether it's time to restructure.</p>
            </div>
            <Link to={ROUTES.attorney} className="llc-cta__btn llc-cta__btn--gold">Get advice <ArrowRight size={16} /></Link>
          </Reveal>
        </div>
      </section>

      <FaqList faqs={faqs} />

      <CtaBand title="Ready to put your business name on the record?" label="Register my DBA" to={ROUTES.dba} />

      <ContactCards helpTo={ROUTES.attorney} />

      <ServiceFooter
        disclaimer={<>Leader Business Developer provides business formation and administrative filing support. Requirements, fees and processing times vary by jurisdiction. This page is for general information and is not legal or tax advice.</>}
      />
    </div>
  );
}