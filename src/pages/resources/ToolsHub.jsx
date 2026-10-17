import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Lock, MonitorSmartphone, BadgeDollarSign, Check } from "lucide-react";
import Seo from "../../components/common/Seo";
import { Reveal, Section, ServiceFooter } from "../../components/service";
import { ResHero, FaqBlock, RelatedLinks } from "./ResBits";
import { ToolboxVisual } from "./ResourcesVisual";
import { RES_SEO, RES_DISCLAIMER, FREE_TOOLS, LEARN_GUIDES, HUBS } from "./resources";
import "../forms/Forms.css";
import "./Resources.css";

const PATH = "/resources/tools";

const GOALS = [
  ["Come up with a business name", 0],
  ["See if my name is taken", 1],
  ["Make sure my business is compliant", 2],
  ["Figure out how much I need to start", 3],
];
const PREVIEWS = [
  <div className="rs-tp rs-tp--gen" key="a"><i>NovaLeaf</i><i>BrightForge</i><i>Sunwise</i><i>PeakNest</i></div>,
  <div className="rs-tp rs-tp--check" key="b"><span className="ok">State</span><span className="ok">™</span><span className="ok">.com</span><span className="mid">@</span></div>,
  <div className="rs-tp rs-tp--cc" key="c"><svg viewBox="0 0 120 66"><path d="M10 60 A50 50 0 0 1 110 60" /><path pathLength="1" d="M10 60 A50 50 0 0 1 110 60" /></svg><b>86</b></div>,
  <div className="rs-tp rs-tp--cost" key="d">{[40, 75, 55, 90].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div>,
];
const TABLE = [
  ["Business Name Generator", "1 min", "24 name ideas per batch", "Favorites in your browser"],
  ["Name Availability Check", "5 min", "Verdict across 4 checks", "Nothing stored"],
  ["Compliance Health Check", "3 min", "Score + action plan", "Downloadable plan"],
  ["Startup Cost Calculator", "4 min", "Total budget + breakdown", "Downloadable CSV"],
];

const FAQS = [
  ["Are these business tools really free?", "Yes. Every tool on this page is free to use as often as you like, with no sign-up, credit card or email required."],
  ["Do the tools save or share my information?", "No. The tools run in your browser. A few conveniences, like saved name favorites, are stored only on your own device, and downloads are created locally. Nothing you type is sent to us."],
  ["How accurate are the results?", "The tools give estimates and guidance based on common rules and your inputs. They're a strong starting point, but they don't replace official searches, quotes or professional advice for your specific situation."],
  ["Which tool should I use first?", "If you're just starting, use the name generator and name availability check together, then the startup cost calculator. If your business is already running, start with the compliance health check."],
  ["Can I use the tools on my phone?", "Yes. All four tools are designed to work on phones, tablets and desktops."],
];

export default function ToolsHub() {
  const [goal, setGoal] = useState(null);

  return (
    <div className="svc mc-page lf-page rs-page rs-tools">
      <Seo {...RES_SEO[PATH]} path={PATH} faqs={FAQS} />

      <ResHero
        hub={HUBS.tools}
        title="Free tools to name, plan and protect your business"
        subtitle={<>Four practical tools for the decisions every founder faces: <strong>naming, availability, compliance and startup costs</strong>. No sign-up, nothing to install, results in minutes.</>}
        primary={{ label: "Explore the tools", href: "#rs-tools" }}
        secondary={{ label: "Which tool do I need?", href: "#rs-goal" }}
        visual={<ToolboxVisual />}
      />

      {/* goal picker */}
      <Section id="rs-goal">
        <Reveal className="rs-goal">
          <h2>I want to…</h2>
          <div>{GOALS.map(([g, i]) => <button key={g} type="button" aria-pressed={goal === i} className={goal === i ? "is-on" : ""} onClick={() => setGoal(i)}>{g}</button>)}</div>
          {goal !== null && (() => { const t = FREE_TOOLS[goal]; return (
            <div className="rs-goal__res" key={goal}><span><t.icon size={22} /></span><div><b>Use the {t.title}</b><small>{t.short}</small></div><Link to={t.path} className="lf-btn lf-btn--sm">Open tool <ArrowRight size={14} /></Link></div>
          ); })()}
        </Reveal>
      </Section>

      {/* tool cards */}
      <Section id="rs-tools" tone="gray" title="All free tools">
        <Reveal className="rs-tools__grid">
          {FREE_TOOLS.map((t, i) => (
            <article key={t.path} style={{ "--i": i }}>
              <div className="rs-tools__preview">{PREVIEWS[i]}</div>
              <div className="rs-tools__body">
                <div className="rs-tools__title"><span><t.icon size={20} /></span><h3><Link to={t.path}>{t.title}</Link></h3><em><Clock size={12} /> {t.time}</em></div>
                <p>{t.short}</p>
                <Link to={t.path} className="lf-btn lf-btn--sm">Launch tool <ArrowRight size={14} /></Link>
              </div>
            </article>
          ))}
        </Reveal>
      </Section>

      {/* table */}
      <Section title="What each tool gives you">
        <Reveal className="lf-table-wrap">
          <table className="lf-table">
            <thead><tr><th>Tool</th><th>Time</th><th>You get</th><th>Saved data</th></tr></thead>
            <tbody>{TABLE.map(([t, tm, o, s], i) => <tr key={t}><td><Link to={FREE_TOOLS[i].path}><strong>{t}</strong></Link></td><td>{tm}</td><td>{o}</td><td>{s}</td></tr>)}</tbody>
          </table>
        </Reveal>
      </Section>

      {/* privacy */}
      <Section tone="soft">
        <Reveal className="rs-priv">
          {[[<BadgeDollarSign size={22} key="a" />, "Always free", "No trials, paywalls or credit cards."], [<Lock size={22} key="b" />, "Private by design", "Your inputs stay in your browser."], [<MonitorSmartphone size={22} key="c" />, "Works anywhere", "Phone, tablet or desktop."], [<Check size={22} key="d" />, "Built by specialists", "Based on the questions our clients ask most."]].map(([ic, t, d], i) => (
            <div key={t} style={{ "--i": i }}><span>{ic}</span><b>{t}</b><small>{d}</small></div>
          ))}
        </Reveal>
      </Section>

      <FaqBlock faqs={FAQS} title="Free tools FAQs" variant="numbered" />

      <Section tone="gray">
        <RelatedLinks items={LEARN_GUIDES} title="Learn the why behind each tool" variant="list" hub={HUBS.learn} />
      </Section>

      <ServiceFooter disclaimer={RES_DISCLAIMER} />
    </div>
  );
}
