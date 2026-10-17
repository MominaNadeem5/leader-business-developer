import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, X, Minus, Zap, Building2, TrendingUp, Landmark, Users } from "lucide-react";
import Seo from "../../components/common/Seo";
import { Reveal, Section, ServiceFooter } from "../../components/service";
import { ResHero, FaqBlock, RelatedLinks } from "./ResBits";
import { ScaleVisual } from "./ResourcesVisual";
import { RES_SEO, RES_DISCLAIMER, LEARN_GUIDES, HUBS } from "./resources";
import "../forms/Forms.css";
import "./Resources.css";

const PATH = "/resources/learn/llc-vs-corporation";
const money = (n) => `$${Math.round(n).toLocaleString()}`;

const QUIZ = [
  ["How many owners will you have?", [["Just me", { llc: 3, s: 2, c: 0 }], ["2–10 partners", { llc: 3, s: 2, c: 1 }], ["Many, including investors", { llc: 0, s: 0, c: 3 }]]],
  ["Do you plan to raise venture capital?", [["No", { llc: 3, s: 2, c: 0 }], ["Maybe later", { llc: 1, s: 1, c: 2 }], ["Yes, soon", { llc: 0, s: 0, c: 4 }]]],
  ["Expected yearly profit after expenses?", [["Under $40k", { llc: 3, s: 0, c: 0 }], ["$40k–$100k", { llc: 2, s: 3, c: 0 }], ["Over $100k", { llc: 1, s: 3, c: 1 }]]],
  ["How do you feel about paperwork?", [["Keep it minimal", { llc: 3, s: 1, c: 0 }], ["Fine with some", { llc: 2, s: 2, c: 1 }], ["Happy with formalities", { llc: 1, s: 2, c: 2 }]]],
  ["Will any owners be non-U.S. persons or companies?", [["No", { llc: 2, s: 2, c: 1 }], ["Yes", { llc: 2, s: 0, c: 2 }]]],
  ["Will you reinvest most profits in the business?", [["No, I'll take most out", { llc: 2, s: 3, c: 0 }], ["About half", { llc: 2, s: 2, c: 1 }], ["Yes, almost all", { llc: 1, s: 1, c: 3 }]]],
];
const RESULT = {
  llc: { name: "LLC", icon: <Building2 size={24} />, text: "Flexible, simple to run and taxed as a pass-through by default. A strong fit for most owner-operated small businesses." },
  s: { name: "LLC taxed as an S corp", icon: <TrendingUp size={24} />, text: "Form an LLC (or corporation) and elect S corp tax treatment to potentially save on self-employment tax once profits are steady." },
  c: { name: "C corporation", icon: <Landmark size={24} />, text: "The standard choice for startups raising outside investment, issuing stock options or planning an eventual sale or IPO." },
};

const ROWS = [
  ["Personal liability protection", true, true, true],
  ["Default federal tax", "Pass-through", "Pass-through (election)", "21% corporate rate"],
  ["Double taxation on profits", false, false, true],
  ["Self-employment tax on all profit", true, "Salary only", false],
  ["Owners and shareholders", "Unlimited, any type", "Up to 100, U.S. only, one class of stock", "Unlimited, multiple share classes"],
  ["Raising venture capital", "Harder", "Very limited", "Preferred"],
  ["Ongoing formalities", "Low", "Medium (payroll)", "High (board, minutes, bylaws)"],
  ["Flexible profit splits", true, false, false],
];

const FAQS = [
  ["Is an LLC or a corporation better for a small business?", "For most owner-operated small businesses, an LLC is simpler and more flexible, with pass-through taxation and fewer formalities. A corporation, usually a C corp, tends to be better if you plan to raise venture capital, offer stock options or take the company public."],
  ["What's the difference between an S corp and an LLC?", "An LLC is a legal entity created under state law. An S corporation is a federal tax status. An LLC can elect to be taxed as an S corp, which can reduce self-employment taxes once profits are high enough to justify running payroll and paying yourself a reasonable salary."],
  ["Why do investors prefer C corporations?", "C corps can issue different classes of stock, such as preferred shares, accept unlimited and foreign shareholders, and are familiar to investors and their lawyers. Many venture funds can't or won't invest in LLCs because of how pass-through income affects their own investors."],
  ["Can I convert my LLC to a corporation later?", "Yes. Most states allow a statutory conversion, or you can merge the LLC into a new corporation. It's common to start as an LLC and convert before a priced funding round. Conversions can have tax consequences, so plan them with an accountant."],
  ["Does a corporation really pay tax twice?", "A C corporation pays corporate income tax on its profits, currently a flat 21% federal rate, and shareholders pay tax again on dividends they receive. LLCs and S corps generally avoid this because profits pass through to the owners' personal returns."],
];

export default function LlcVsCorporation() {
  const [ans, setAns] = useState({});
  const [profit, setProfit] = useState(100000);
  const score = { llc: 0, s: 0, c: 0 };
  Object.entries(ans).forEach(([q, o]) => { const w = QUIZ[q][1][o][1]; Object.keys(score).forEach((k) => { score[k] += w[k]; }); });
  const answered = Object.keys(ans).length;
  const max = Math.max(1, ...Object.values(score));
  const best = answered ? Object.keys(score).reduce((a, b) => (score[b] > score[a] ? b : a)) : null;
  const corpTax = profit * 0.21;
  const divTax = (profit - corpTax) * 0.15;

  return (
    <div className="svc mc-page lf-page rs-page rs-llc">
      <Seo {...RES_SEO[PATH]} path={PATH} faqs={FAQS} />

      <ResHero
        hub={HUBS.learn}
        label="LLC or Corporation?"
        title="LLC or corporation? How to choose the right structure"
        subtitle={<>Both protect your personal assets, but they differ in <strong>taxes, paperwork and how easily you can raise money</strong>. Compare them side by side and take a two-minute quiz to find your fit.</>}
        primary={{ label: "Take the quiz", href: "#rs-quiz" }}
        secondary={{ label: "Compare side by side", href: "#rs-compare" }}
        visual={<ScaleVisual />}
      />

      {/* short answer */}
      <Section>
        <Reveal className="rs-llc__short">
          <span className="rs-llc__tag"><Zap size={15} /> The short answer</span>
          <h2>Most small businesses choose an LLC. Startups raising venture capital choose a C corporation.</h2>
          <p>An <strong>LLC</strong> (limited liability company) gives you liability protection with minimal formalities and pass-through taxation: profits are taxed once, on your personal return. A <strong>corporation</strong> is a more formal structure with shareholders, a board of directors and bylaws. A standard C corporation pays its own income tax, which is why it's associated with "double taxation", but it's also the structure investors know and prefer.</p>
          <p>And the <strong>S corporation</strong>? It's not a separate entity, it's a tax election an LLC or corporation can make with the IRS to potentially reduce self-employment taxes. Not sure about naming yet? Read <Link to="/resources/learn/business-name">picking a business name</Link> next.</p>
        </Reveal>
      </Section>

      {/* quiz */}
      <Section id="rs-quiz" tone="gray" title="Which structure fits you?" subtitle="Answer as many questions as you like. Your result updates as you go.">
        <Reveal className="rs-quiz">
          <ol className="rs-quiz__qs">
            {QUIZ.map(([q, opts], qi) => (
              <li key={q}>
                <b><em>{qi + 1}</em>{q}</b>
                <div>{opts.map(([o], oi) => <button key={o} type="button" aria-pressed={ans[qi] === oi} className={ans[qi] === oi ? "is-on" : ""} onClick={() => setAns((a) => ({ ...a, [qi]: oi }))}>{o}</button>)}</div>
              </li>
            ))}
          </ol>
          <div className="rs-quiz__out" aria-live="polite">
            <span className="lf-eyebrow">{answered ? `Based on ${answered} of ${QUIZ.length} answers` : "Your result"}</span>
            {best ? <><div className="rs-quiz__best">{RESULT[best].icon}<h3>{RESULT[best].name}</h3></div><p>{RESULT[best].text}</p></> : <p>Pick an answer to see which structure leans your way.</p>}
            {Object.keys(score).map((k) => (
              <div key={k} className={`rs-quiz__bar ${best === k ? "is-best" : ""}`}><span>{RESULT[k].name}</span><div><i style={{ width: `${answered ? (score[k] / max) * 100 : 0}%` }} /></div></div>
            ))}
            {answered > 0 && <button type="button" className="rs-quiz__reset" onClick={() => setAns({})}>Reset answers</button>}
          </div>
        </Reveal>
      </Section>

      {/* compare */}
      <Section id="rs-compare" title="LLC vs. S corp vs. C corp at a glance">
        <Reveal className="lf-table-wrap">
          <table className="lf-table rs-llc__table">
            <thead><tr><th>Feature</th><th>LLC</th><th>S corp (tax election)</th><th>C corporation</th></tr></thead>
            <tbody>{ROWS.map(([f, ...cells]) => <tr key={f}><td><strong>{f}</strong></td>{cells.map((c, i) => <td key={i}>{c === true ? <Check size={18} className="rs-yes" /> : c === false ? <X size={18} className="rs-no" /> : c}</td>)}</tr>)}</tbody>
          </table>
        </Reveal>
      </Section>

      {/* double tax example */}
      <Section tone="soft" title="What “double taxation” looks like" subtitle="A simplified example of how C corporation profits are taxed when paid out as dividends.">
        <Reveal className="rs-dtax">
          <label className="lf-range"><span>Annual profit<b>{money(profit)}</b></span>
            <input type="range" min="20000" max="500000" step="5000" value={profit} onChange={(e) => setProfit(Number(e.target.value))} style={{ "--fill": `${((profit - 20000) / 480000) * 100}%` }} /></label>
          <div className="rs-dtax__flow">
            <div><small>Company profit</small><b>{money(profit)}</b></div>
            <Minus size={18} />
            <div className="t"><small>Corporate tax (21%)</small><b>{money(corpTax)}</b></div>
            <Minus size={18} />
            <div className="t"><small>Dividend tax (15%)</small><b>{money(divTax)}</b></div>
            <span>=</span>
            <div className="k"><small>Left for owners</small><b>{money(profit - corpTax - divTax)}</b></div>
          </div>
          <p>With an LLC or S corp, the business generally pays no federal income tax itself; the profit is taxed once on the owners' returns at their personal rates, plus self-employment tax where it applies. Which costs less depends on your income, state and how much you reinvest. This example assumes the 21% federal corporate rate and a 15% qualified dividend rate, and ignores state taxes.</p>
        </Reveal>
      </Section>

      {/* evolution */}
      <Section title="Your structure can grow with you">
        <Reveal className="rs-evo">
          {[[<Users size={20} key="a" />, "Start", "Sole proprietor or single-member LLC while you test the idea."], [<Building2 size={20} key="b" />, "Protect", "Form an LLC once you have customers, contracts or risk."], [<TrendingUp size={20} key="c" />, "Optimize", "Elect S corp taxation when profits are steady and healthy."], [<Landmark size={20} key="d" />, "Scale", "Convert to a C corp before raising venture capital."]].map(([ic, t, d], i) => (
            <div key={t} style={{ "--i": i }}><span>{ic}</span><b>{t}</b><small>{d}</small></div>
          ))}
        </Reveal>
      </Section>

      <FaqBlock faqs={FAQS} title="LLC vs. corporation FAQs" variant="split" tone="gray" />

      <Section>
        <Reveal className="rs-band rs-band--split">
          <div><h2>Made your choice?</h2><p>We can form your LLC or corporation and help with your EIN and registered agent.</p></div>
          <div className="lf-actions"><Link to="/business/llc" className="lf-btn">Form an LLC <ArrowRight size={16} /></Link><Link to="/business/corporation" className="svc-ghost-btn">Form a corporation</Link></div>
        </Reveal>
        <RelatedLinks items={LEARN_GUIDES} current={PATH} title="More guides" variant="chips" hub={HUBS.learn} />
      </Section>

      <ServiceFooter disclaimer={RES_DISCLAIMER} />
    </div>
  );
}
