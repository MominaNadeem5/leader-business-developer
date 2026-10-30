import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, X, Minus, Zap, Building2, TrendingUp, Landmark, Users } from "lucide-react";
import Seo from "../../components/common/Seo";
import { Reveal, Section, ServiceFooter } from "../../components/service";
import { ResHero, FaqBlock, RelatedLinks } from "./ResBits";
import { ScaleVisual } from "./ResourcesVisual";
import { RES_SEO, LEARN_GUIDES, HUBS } from "./resources";
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
  ["Is an LLC or a corporation better for a small business?", "For most owner-operated small businesses, an LLC is the better starting point. It is quick to set up, has few ongoing formalities and gives you flexible pass-through taxation, so profits are taxed once on your personal return. A corporation, usually a C corp, makes more sense if you plan to raise venture capital, issue stock options to employees or eventually go public."],
  ["What's the difference between an S corp and an LLC?", "They are not the same kind of thing. An LLC is a legal entity created under state law, while an S corporation is a tax status granted by the IRS. An LLC can elect S corp taxation, which can lower self-employment tax once profits are high enough to justify running payroll and paying yourself a reasonable salary. The election has requirements, including no more than 100 shareholders and no nonresident alien owners."],
  ["Why do investors prefer C corporations?", "C corporations can issue several classes of stock, such as preferred shares, and can have unlimited shareholders, including foreign investors and funds. Investors and their lawyers also know the structure well, and Delaware C corps in particular have standard, well-tested documents. Many venture funds cannot or will not invest in LLCs, because pass-through income creates tax filings for their own investors."],
  ["Does an LLC or a corporation protect my personal assets?", "Yes, both give you limited liability, which generally keeps business debts and lawsuits separate from your home, savings and personal property. The protection has limits. It does not cover debts you personally guarantee or your own wrongful acts, and a court can set it aside if you mix personal and business money or ignore required formalities. Keep separate bank accounts, clear records and a signed operating agreement or bylaws."],
  ["Does a corporation really pay tax twice?", "A C corporation does. It pays corporate income tax on its profits (a flat 21% federal rate), and shareholders pay tax again on any dividends they receive. LLCs and S corps generally avoid this double layer because profits pass through to the owners' personal tax returns. For a growing company that reinvests its profits instead of paying dividends, the second layer of tax may never come into play."],
  ["Which costs less to form and maintain?", "An LLC usually costs less. Formation is a single state filing, and upkeep is typically an annual report and fee. A corporation adds bylaws, a board, shareholder meetings and minutes, plus payroll for officers who work in the business. State fees vary widely, and some states charge a minimum annual franchise tax to both LLCs and corporations, so check your state's costs before deciding."],
  ["Can non-U.S. residents own an LLC or a corporation?", "Yes. People who live outside the United States can own and run an LLC or a C corporation, and neither requires U.S. citizenship or residency. An S corporation is the exception, since nonresident aliens cannot be shareholders. Foreign owners still need an EIN and have U.S. tax filing obligations, so it is worth getting guidance on the setup before you form."],
  ["Can I convert my LLC to a corporation later?", "Yes. Most states allow a statutory conversion, or you can merge the LLC into a newly formed corporation. Many founders start as an LLC and convert just before a priced funding round or once outside investors are involved. A conversion can trigger tax and legal consequences, so plan the timing and structure with an accountant or attorney first."],
  ["Which should I choose if I'm just starting out?", "Pick based on your next two to three years. If you are a solo owner or a small partnership running a service, retail or online business, start with an LLC and revisit an S corp election when profits grow. If you are building a startup that will raise outside capital or grant equity, form a C corporation from the start. When you are unsure, an LLC is easier to change later than most people expect."],
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

      <FaqBlock faqs={FAQS} title="LLC vs. corporation articles" variant="articles" tone="gray" />

      <Section>
        <Reveal className="rs-band rs-band--split">
          <div><h2>Made your choice?</h2><p>We can form your LLC or corporation and help with your EIN and registered agent.</p></div>
          <div className="lf-actions"><Link to="/business/llc" className="lf-btn">Form an LLC <ArrowRight size={16} /></Link><Link to="/business/corporation" className="svc-ghost-btn">Form a corporation</Link></div>
        </Reveal>
        <RelatedLinks items={LEARN_GUIDES} current={PATH} title="More guides" variant="chips" hub={HUBS.learn} />
      </Section>

      <ServiceFooter />
    </div>
  );
}
