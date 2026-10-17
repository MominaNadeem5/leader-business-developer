import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Download, AlertTriangle, Check, X, Plus, Trash2, Users, PiggyBank, Vote,
  DoorOpen, Scale, Briefcase, Clock, HeartPulse,
} from "lucide-react";
import Seo from "../../components/common/Seo";
import { Reveal, Section, ServiceFooter } from "../../components/service";
import { Field, Segmented, FaqBlock, LegalNote, RelatedForms, FormHero } from "./FormBits";
import { PartnershipVisual } from "./FormsVisual";
import { FORMS_SEO, FORMS_START, DISCLAIMER, downloadDoc, fill, esc } from "./forms";
import "./Forms.css";

const PATH = "/forms/templates/partnership";
const COLORS = ["#2fa24f", "#0a3a2a", "#c9a227", "#3b82f6"];
const money = (n) => `$${Math.round(n).toLocaleString()}`;

const STRUCTURES = [
  {
    name: "General Partnership (GP)", tag: "Simplest",
    text: "Formed as soon as two or more people run a business together for profit, even without paperwork.",
    rows: [["All partners manage", true], ["Personal assets protected", false], ["State filing required", false], ["Pass-through taxation", true]],
    fit: "Low-risk ventures between partners who fully trust each other.",
  },
  {
    name: "Limited Partnership (LP)", tag: "For investors",
    text: "At least one general partner runs the business; limited partners invest but stay out of management.",
    rows: [["All partners manage", false], ["Personal assets protected", "Limited partners only"], ["State filing required", true], ["Pass-through taxation", true]],
    fit: "Raising money from silent investors, real estate and fund structures.",
  },
  {
    name: "Limited Liability Partnership (LLP)", tag: "Professionals",
    text: "All partners can manage and each is generally shielded from the others' mistakes and many business debts.",
    rows: [["All partners manage", true], ["Personal assets protected", true], ["State filing required", true], ["Pass-through taxation", true]],
    fit: "Licensed professionals like lawyers, accountants and architects (some states restrict LLPs to these).",
  },
];

const DECISIONS = [
  { icon: <PiggyBank size={20} />, q: "Capital", text: "Who contributes what money, equipment or IP, and what happens if more is needed later?" },
  { icon: <Scale size={20} />, q: "Profit & loss", text: "Split equally, by contribution, or by a custom formula? When are distributions paid?" },
  { icon: <Briefcase size={20} />, q: "Roles", text: "Who handles sales, finance, operations? Are partners paid a salary (guaranteed payment)?" },
  { icon: <Vote size={20} />, q: "Decisions", text: "Which decisions need a majority, and which need everyone? How are deadlocks broken?" },
  { icon: <Clock size={20} />, q: "Time commitment", text: "Is anyone part-time? Can partners run other businesses or compete?" },
  { icon: <Users size={20} />, q: "New partners", text: "How is a new partner admitted, and how are existing shares diluted?" },
  { icon: <DoorOpen size={20} />, q: "Exit & buyout", text: "How does a partner leave? How is their share valued and paid out?" },
  { icon: <HeartPulse size={20} />, q: "Death or disability", text: "What happens to a partner's share? Is there insurance to fund a buyout?" },
];

const FAQS = [
  ["Is a partnership agreement legally required?", "In most states, a general partnership can exist without any written agreement. Limited partnerships and LLPs must file with the state, and LLPs are generally expected to have a written agreement. Even when it's optional, a written agreement is strongly recommended."],
  ["What happens if partners don't have a written agreement?", "Your state's partnership law fills the gaps. Under the Revised Uniform Partnership Act, used by most states, partners generally share profits equally regardless of how much each invested, and each partner can bind the business in ordinary matters. Those defaults rarely match what partners actually intend."],
  ["Should ownership always match how much money each partner invests?", "Not necessarily. Many partnerships value time, skills, clients or intellectual property alongside cash. The key is agreeing on a formula in writing, for example a blend of capital and work contribution, and revisiting it if roles change."],
  ["How is a departing partner's share valued?", "Common methods are a fixed price agreed annually, a formula such as a multiple of earnings, book value, or an independent appraisal. A buy-sell clause should also set payment terms, such as installments over two to five years, so a buyout doesn't drain the business."],
  ["How are partnerships taxed?", "Partnerships are usually pass-through entities. The business files an informational return (IRS Form 1065) and gives each partner a Schedule K-1 showing their share of income, which they report on their personal returns. Partners typically also pay self-employment tax on their share."],
];

function SplitCalculator() {
  const [partners, setPartners] = useState([
    { name: "Alex", capital: 30000, hours: 40 },
    { name: "Sam", capital: 10000, hours: 40 },
  ]);
  const [method, setMethod] = useState("blend");
  const [profit, setProfit] = useState(120000);

  const totalCap = partners.reduce((a, p) => a + p.capital, 0) || 1;
  const totalHrs = partners.reduce((a, p) => a + p.hours, 0) || 1;
  const shares = partners.map((p) => {
    if (method === "equal") return 1 / partners.length;
    if (method === "capital") return p.capital / totalCap;
    return 0.5 * (p.capital / totalCap) + 0.5 * (p.hours / totalHrs);
  });
  const update = (i, k, v) => setPartners((ps) => ps.map((p, j) => (j === i ? { ...p, [k]: v } : p)));

  return (
    <Reveal className="lf-p-calc">
      <div className="lf-p-calc__inputs">
        <Segmented label="Split method" value={method} onChange={setMethod}
          options={[["equal", "Equal"], ["capital", "By capital"], ["blend", "Capital + time"]]} />
        <div className="lf-p-calc__rows">
          <div className="lf-p-calc__head"><span>Partner</span><span>Capital ($)</span><span>Hours/week</span><span /></div>
          {partners.map((p, i) => (
            <div key={i} className="lf-p-calc__row">
              <input aria-label="Partner name" value={p.name} onChange={(e) => update(i, "name", e.target.value)} style={{ borderLeftColor: COLORS[i] }} />
              <input aria-label="Capital" type="number" min="0" step="1000" value={p.capital} onChange={(e) => update(i, "capital", Math.max(0, Number(e.target.value)))} />
              <input aria-label="Hours per week" type="number" min="0" max="80" value={p.hours} onChange={(e) => update(i, "hours", Math.max(0, Number(e.target.value)))} />
              <button type="button" aria-label="Remove partner" disabled={partners.length <= 2} onClick={() => setPartners((ps) => ps.filter((_, j) => j !== i))}><Trash2 size={15} /></button>
            </div>
          ))}
          {partners.length < 4 && <button type="button" className="lf-p-calc__add" onClick={() => setPartners((ps) => [...ps, { name: `Partner ${ps.length + 1}`, capital: 10000, hours: 20 }])}><Plus size={15} /> Add partner</button>}
        </div>
        <label className="lf-range">
          <span>Annual profit to distribute<b>{money(profit)}</b></span>
          <input type="range" min="10000" max="500000" step="5000" value={profit} onChange={(e) => setProfit(Number(e.target.value))} style={{ "--fill": `${((profit - 10000) / 490000) * 100}%` }} />
        </label>
      </div>
      <div className="lf-p-calc__out" aria-live="polite">
        <span className="lf-eyebrow">Ownership & profit split</span>
        <div className="lf-p-bar">{shares.map((s, i) => <i key={i} style={{ width: `${s * 100}%`, background: COLORS[i] }} title={`${partners[i].name}: ${(s * 100).toFixed(1)}%`} />)}</div>
        <ul>
          {partners.map((p, i) => (
            <li key={i}><span className="lf-dot" style={{ background: COLORS[i] }} /><strong>{p.name || `Partner ${i + 1}`}</strong><em>{(shares[i] * 100).toFixed(1)}%</em><b>{money(profit * shares[i])}</b></li>
          ))}
        </ul>
        <p>{method === "equal" ? "Equal splits are simple, and match most states' default rule, but can feel unfair if one partner invests far more." : method === "capital" ? "Splitting by capital rewards money invested, but ignores the value of a partner's time and skills." : "A blend weights capital and working time 50/50, a common compromise when one partner brings money and another brings labor."}</p>
      </div>
    </Reveal>
  );
}

function PartnershipTemplate() {
  const [step, setStep] = useState(0);
  const [v, setV] = useState({ name: "", type: "General Partnership", state: "", purpose: "", partners: "", split: "", vote: "Majority", buyout: "Independent appraisal", start: "" });
  const set = (k) => (val) => setV((o) => ({ ...o, [k]: val }));
  const steps = ["Basics", "Money", "Rules"];

  const download = () => {
    const names = v.partners.split(",").map((s) => s.trim()).filter(Boolean);
    downloadDoc("partnership-agreement.doc", "Partnership Agreement", `
<h1>Partnership Agreement</h1>
<p>This Partnership Agreement is made on ${fill(v.start)} by the partners listed below to form a ${esc(v.type)} named <b>${fill(v.name)}</b> (the "Partnership") under the laws of the State of ${fill(v.state)}.</p>
<h2>1. Purpose</h2><p>The Partnership will ${fill(v.purpose, "describe the business activity")}.</p>
<h2>2. Partners and Capital Contributions</h2><table><tr><th>Partner</th><th>Capital contribution</th><th>Ownership %</th></tr>${(names.length ? names : ["", ""]).map((n) => `<tr><td>${fill(n)}</td><td>$________</td><td>____%</td></tr>`).join("")}</table>
<h2>3. Profits and Losses</h2><p>Profits and losses will be allocated ${fill(v.split, "in proportion to each partner's ownership percentage")}. Distributions will be made ________ (e.g. quarterly) as the partners decide.</p>
<h2>4. Management and Voting</h2><p>Ordinary decisions require a ${esc(v.vote.toLowerCase())} vote of the partners. Unanimous consent is required to admit new partners, sell substantially all assets, borrow more than $________, or amend this Agreement.</p>
<h2>5. Duties and Compensation</h2><p>Each partner will devote ________ hours per week to the business. No partner will receive a salary unless agreed in writing.</p>
<h2>6. Withdrawal, Death or Disability</h2><p>A partner may withdraw with ________ days' written notice. The remaining partners may buy the departing partner's interest, valued by ${esc(v.buyout.toLowerCase())}, payable over ________ months.</p>
<h2>7. Dispute Resolution</h2><p>Partners will try to resolve disputes by negotiation, then mediation, before any legal action.</p>
<h2>8. Dissolution</h2><p>On dissolution, assets will be used to pay debts, then returned to partners according to their capital accounts.</p>
<h2>Signatures</h2><table>${(names.length ? names : ["", ""]).map((n) => `<tr><td>${fill(n)}</td><td>Signature: ____________________</td><td>Date: ________</td></tr>`).join("")}</table>`);
  };

  return (
    <Reveal className="lf-p-tpl">
      <ol className="lf-p-steps">
        {steps.map((s, i) => <li key={s} className={i === step ? "is-on" : i < step ? "is-done" : ""}><button type="button" onClick={() => setStep(i)}><span>{i < step ? <Check size={13} /> : i + 1}</span>{s}</button></li>)}
      </ol>
      <div className="lf-p-tpl__body" key={step}>
        {step === 0 && <>
          <Field label="Partnership name" value={v.name} onChange={set("name")} placeholder="Bright Leaf Partners" />
          <Segmented label="Partnership type" value={v.type} onChange={set("type")} options={[["General Partnership", "General"], ["Limited Partnership", "Limited"], ["Limited Liability Partnership", "LLP"]]} />
          <div className="lf-grid-2"><Field label="State" value={v.state} onChange={set("state")} placeholder="Florida" /><Field label="Start date" type="date" value={v.start} onChange={set("start")} /></div>
          <Field label="Business purpose" value={v.purpose} onChange={set("purpose")} placeholder="operate a specialty bakery and catering business" />
        </>}
        {step === 1 && <>
          <Field label="Partner names (comma separated)" value={v.partners} onChange={set("partners")} placeholder="Alex Rivera, Sam Chen" />
          <Field label="How profits and losses are split" value={v.split} onChange={set("split")} placeholder="60% to Alex Rivera and 40% to Sam Chen" />
          <p className="lf-small">Tip: use the split calculator above to agree percentages first.</p>
        </>}
        {step === 2 && <>
          <Segmented label="Everyday decisions need" value={v.vote} onChange={set("vote")} options={[["Majority", "Majority"], ["Unanimous", "Unanimous"]]} />
          <Segmented label="Buyout valuation method" value={v.buyout} onChange={set("buyout")} options={[["Independent appraisal", "Appraisal"], ["Agreed annual value", "Agreed value"], ["Book value", "Book value"]]} />
        </>}
      </div>
      <div className="lf-p-tpl__nav">
        <button type="button" className="svc-ghost-btn" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</button>
        {step < 2 ? <button type="button" className="lf-btn" onClick={() => setStep(step + 1)}>Next <ArrowRight size={16} /></button>
          : <button type="button" className="lf-btn" onClick={download}><Download size={16} /> Download agreement (.doc)</button>}
      </div>
    </Reveal>
  );
}

export default function PartnershipAgreement() {
  return (
    <div className="svc mc-page lf-page lf-partner">
      <Seo {...FORMS_SEO[PATH]} path={PATH} faqs={FAQS} />

      <FormHero
        label="Partnership Agreement"
        title="Partnership agreement template for partners who plan ahead"
        subtitle={<>Agree how you'll share <strong>ownership, profits, decisions and exits</strong> while everyone is still on the same page. Model your split, choose your structure and build your agreement in three short steps.</>}
        primary={{ label: "Build my agreement", href: "#lf-template" }}
        secondary={{ label: "Model our profit split", href: "#lf-split" }}
        visual={<PartnershipVisual />}
      />

      {/* explanation */}
      <Section>
        <div className="lf-p-intro">
          <div>
            <h2>What a partnership agreement does</h2>
            <p>A partnership agreement is a written contract between business partners that sets out how the business is owned and run. It records what each partner contributes, how profits and losses are divided, who makes which decisions, and what happens when a partner wants to leave, retires, becomes ill or passes away.</p>
            <p>The best time to write one is at the start, when goodwill is high. Disagreements about money, workload and exits are the most common reasons partnerships fail, and nearly all of them are easier to settle on paper in advance than in the middle of a dispute. If you're forming an LLC instead, the equivalent document is an <Link to="/business/operating-agreement">operating agreement</Link>.</p>
          </div>
          <Reveal className="lf-p-warn">
            <AlertTriangle size={22} />
            <h3>No agreement? State law decides for you.</h3>
            <p>Under the default rules most states follow:</p>
            <ul>
              <li>Profits are typically split <strong>equally</strong>, no matter who invested more.</li>
              <li>Every partner can usually <strong>bind the business</strong> to ordinary contracts.</li>
              <li>In a general partnership, each partner can be <strong>personally liable</strong> for business debts.</li>
              <li>A partner leaving can trigger <strong>buyout or wind-up rules</strong> nobody chose.</li>
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* split calculator */}
      <Section id="lf-split" tone="soft" title="Profit and ownership split example" subtitle="Enter each partner's contribution to see how different split methods play out.">
        <SplitCalculator />
      </Section>

      {/* structures */}
      <Section title="General vs. limited vs. LLP" subtitle="Your partnership type changes who manages the business and who is personally on the hook.">
        <Reveal className="lf-p-structs">
          {STRUCTURES.map((s, i) => (
            <article key={s.name} style={{ "--i": i }} className={i === 2 ? "is-hl" : ""}>
              <em>{s.tag}</em>
              <h3>{s.name}</h3>
              <p>{s.text}</p>
              <ul>{s.rows.map(([k, val]) => <li key={k}><span className={val === true ? "y" : val === false ? "n" : "m"}>{val === true ? <Check size={13} /> : val === false ? <X size={13} /> : "~"}</span>{k}{typeof val === "string" && <small>{val}</small>}</li>)}</ul>
              <div className="lf-p-structs__fit"><strong>Best for:</strong> {s.fit}</div>
            </article>
          ))}
        </Reveal>
        <p className="lf-small">Liability protections and filing rules vary by state. Want liability protection with simpler management? Many small partnerships choose an <Link to="/business/llc">LLC</Link> instead.</p>
      </Section>

      {/* decisions */}
      <Section tone="gray" title="What to decide before signing" subtitle="Sit down together and agree on each of these. Your answers become the clauses of your agreement.">
        <Reveal className="lf-p-decide">
          {DECISIONS.map((d, i) => <div key={d.q} style={{ "--i": i }}><span>{d.icon}</span><em>{String(i + 1).padStart(2, "0")}</em><h3>{d.q}</h3><p>{d.text}</p></div>)}
        </Reveal>
      </Section>

      {/* template */}
      <Section id="lf-template" title="Build your partnership agreement" subtitle="Three quick steps, then download an editable Word document.">
        <PartnershipTemplate />
        <LegalNote />
      </Section>

      <FaqBlock faqs={FAQS} title="Partnership agreement questions" variant="grid" tone="soft" />

      <Section>
        <RelatedForms current={PATH} variant="list" title="Other documents partners often need" />
      </Section>

      {/* CTA: two-tone split */}
      <section className="lf-p-cta">
        <div className="container lf-p-cta__row">
          <div><h2>Starting a business with a partner?</h2><p>We can draft your agreement, form your partnership or LLC, and get your EIN in one go.</p></div>
          <Link to={FORMS_START("partnership-agreement")} className="lf-btn lf-btn--light">Get started together <ArrowRight size={17} /></Link>
        </div>
      </section>

      <ServiceFooter disclaimer={DISCLAIMER} />
    </div>
  );
}
