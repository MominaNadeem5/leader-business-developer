import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight, Handshake, HandCoins, UserCheck, Scale } from "lucide-react";
import Seo from "../../components/common/Seo";
import { Reveal, Section, ServiceFooter } from "../../components/service";
import { FaqBlock, LegalNote, RelatedForms, FormHero } from "./FormBits";
import { ContractVisual } from "./FormsVisual";
import { FORMS_SEO, FORMS_START, DISCLAIMER } from "./forms";
import DocWizard from "./DocWizard";
import { CONTRACT } from "./docConfigs";
import "./Forms.css";

const PATH = "/forms/contract";

const ESSENTIALS = [
  { icon: <Handshake size={20} />, title: "Offer & acceptance", text: "One party proposes clear terms and the other agrees to them, without changing them." },
  { icon: <HandCoins size={20} />, title: "Consideration", text: "Each side gives something of value: money, goods, services or a promise to act." },
  { icon: <UserCheck size={20} />, title: "Capacity & consent", text: "Both parties are legally able to contract and agree freely, without pressure or fraud." },
  { icon: <Scale size={20} />, title: "Lawful purpose", text: "The agreement is for something legal. Courts won't enforce a contract for an unlawful act." },
];

const CLAUSES = [
  { name: "Parties & recitals", why: "Names each party with its full legal name, entity type and address, and briefly explains why the agreement exists.", tip: "Use the exact registered name, for example \"Bright Leaf LLC\", not a trading name or a person's first name." },
  { name: "Scope & obligations", why: "Describes exactly what each side will deliver or do. This is the heart of the contract and the most common source of disputes.", tip: "Prefer measurable terms like quantities, specifications and dates over phrases like \"as needed\"." },
  { name: "Price & payment terms", why: "Sets the price, currency, invoicing schedule, due dates, accepted payment methods and any late fees.", tip: "Write \"due within 15 days of invoice\" instead of \"prompt payment\"." },
  { name: "Term & timeline", why: "States when the contract starts, how long it lasts, key deadlines and whether it renews automatically.", tip: "If it auto-renews, include how much notice is needed to cancel." },
  { name: "Warranties", why: "Promises about quality or facts, for example that goods meet a specification or that a party has the right to sell them.", tip: "Say how long warranties last and what the remedy is: repair, replacement or refund." },
  { name: "Limitation of liability", why: "Caps how much either party can owe if something goes wrong, often at the contract value, and excludes indirect losses.", tip: "Make sure the cap is mutual unless there's a good reason it isn't." },
  { name: "Indemnification", why: "One party agrees to cover the other's costs if third-party claims arise from its actions, such as IP infringement.", tip: "Read this one twice. Broad indemnities can expose you to costs far larger than the deal." },
  { name: "Confidentiality", why: "Keeps pricing, customer lists and other sensitive information private during and after the deal.", tip: "For deep disclosures, use a standalone NDA alongside the contract." },
  { name: "Termination", why: "Explains how either party can end the contract: for convenience with notice, or immediately for a serious breach.", tip: "Cover what happens to work in progress and money already paid." },
  { name: "Disputes & governing law", why: "Chooses which state's law applies and how disagreements are handled: negotiation, mediation, arbitration or court.", tip: "A step-by-step process (talk first, then mediate) often saves time and legal fees." },
  { name: "Entire agreement & signatures", why: "Confirms the written contract replaces earlier promises, sets how changes are made, and records who signed and when.", tip: "Require changes to be in writing and signed by both parties." },
];

const TYPES = [
  ["Sales / purchase agreement", "One-off sale of goods or assets", "Price, delivery, title transfer, warranties", "Low"],
  ["Supply agreement", "Ongoing delivery of products", "Volumes, pricing changes, quality, lead times", "Medium"],
  ["Distribution agreement", "Someone resells your products", "Territory, exclusivity, minimums, branding", "High"],
  ["Licensing agreement", "Letting others use your IP", "Scope of use, royalties, duration, ownership", "High"],
  ["Joint venture agreement", "Two businesses on one project", "Contributions, control, profit sharing, exit", "High"],
];

const FAQS = [
  ["Does a business contract have to be in writing to be valid?", "Many verbal agreements are legally binding, but they're hard to prove. Certain contracts, such as real estate sales and agreements that can't be completed within a year, usually must be in writing under each state's \"statute of frauds\". A written contract is always the safer choice."],
  ["Are electronic signatures valid on business contracts?", "Yes, in most cases. The federal ESIGN Act and state laws based on the Uniform Electronic Transactions Act give e-signatures the same legal effect as handwritten ones for most commercial contracts. A few document types, like wills, have exceptions."],
  ["Who should sign a contract for an LLC or corporation?", "An authorized person, usually an owner, member, manager or officer, should sign in their business capacity, for example \"Jane Doe, Managing Member, Bright Leaf LLC\". Signing without the title can blur the line between personal and business liability."],
  ["Can I change a contract after it has been signed?", "Yes, through a written amendment signed by both parties. Most contracts include a clause requiring changes to be in writing, so emails or verbal agreements to change terms may not hold up."],
  ["What happens if the other party breaches the contract?", "Start with the contract itself: check the notice, cure period and dispute resolution clauses. Usually you send written notice and allow time to fix the issue. If that fails, remedies can include damages, termination or, in some cases, a court order to perform."],
];

const CHECK_ITEMS = ["Full legal names and addresses of both parties", "Specific, measurable scope of work or goods", "Price, payment schedule, due dates and late fees", "Start date, end date and renewal terms", "Warranties and what happens if they're broken", "Limitation of liability and indemnities", "Confidentiality obligations", "Termination rights and notice periods", "Governing law and dispute resolution", "Signatures, names, titles and dates"];

export default function BusinessContract() {
  const [clause, setClause] = useState(0);
  const [done, setDone] = useState([]);
  const toggle = (i) => setDone((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]));
  const pct = Math.round((done.length / CHECK_ITEMS.length) * 100);

  return (
    <div className="svc mc-page lf-page lf-contract">
      <Seo {...FORMS_SEO[PATH]} path={PATH} faqs={FAQS} />

      <FormHero
        label="Business Contract"
        title="Business contract template, with every key clause explained"
        subtitle={<>Put your deal in writing with a clear, balanced business contract. Work through the essential clauses, check nothing's missing, then <strong>fill in our free template and download it as a Word document</strong>.</>}
        primary={{ label: "Fill in the template", href: "#lf-template" }}
        secondary={{ label: "Key clauses checklist", href: "#lf-checklist" }}
        visual={<ContractVisual />}
      />

      {/* explanation + essentials */}
      <Section>
        <div className="lf-c-intro">
          <div>
            <h2>What is a business contract?</h2>
            <p>A business contract is a legally binding agreement between two or more parties that sets out who will do what, for how much, and by when. It can cover a one-off sale, an ongoing supply relationship, a licensing deal or almost any commercial arrangement. Its real job is to turn assumptions into written commitments, so both sides know exactly where they stand if something changes.</p>
            <p>Most contract disputes don't come from bad intentions. They come from vague wording: a scope that was never pinned down, a payment date nobody wrote down, or no plan for ending the relationship. A well-structured contract prevents those gaps. For services specifically, our <Link to="/forms/templates/service-agreement">service agreement template</Link> goes deeper on deliverables and milestones.</p>
          </div>
          <Reveal className="lf-c-ess">
            <h3>Four things every enforceable contract needs</h3>
            {ESSENTIALS.map((e, i) => <div key={e.title} style={{ "--i": i }}><span>{e.icon}</span><div><strong>{e.title}</strong><p>{e.text}</p></div></div>)}
          </Reveal>
        </div>
      </Section>

      {/* clause-by-clause navigator */}
      <Section tone="gray" title="Clause-by-clause breakdown" subtitle="Pick a clause to see what it does and how to get it right.">
        <Reveal className="lf-c-clauses">
          <ol role="tablist">
            {CLAUSES.map((c, i) => (
              <li key={c.name}><button type="button" role="tab" aria-selected={clause === i} className={clause === i ? "is-on" : ""} onClick={() => setClause(i)}><em>{String(i + 1).padStart(2, "0")}</em>{c.name}</button></li>
            ))}
          </ol>
          <div className="lf-c-clauses__panel" key={clause} role="tabpanel">
            <span className="lf-c-clauses__num">Clause {clause + 1} of {CLAUSES.length}</span>
            <h3>{CLAUSES[clause].name}</h3>
            <p>{CLAUSES[clause].why}</p>
            <div className="lf-tip"><strong>Drafting tip</strong>{CLAUSES[clause].tip}</div>
            <div className="lf-c-clauses__nav">
              <button type="button" disabled={clause === 0} onClick={() => setClause(clause - 1)}>← Previous</button>
              <button type="button" disabled={clause === CLAUSES.length - 1} onClick={() => setClause(clause + 1)}>Next clause →</button>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* checklist */}
      <Section id="lf-checklist" title="Key clauses checklist" subtitle="Reviewing a contract someone sent you? Tick off each item as you confirm it's covered.">
        <Reveal className="lf-c-check">
          <div className="lf-c-check__bar"><span>{done.length} of {CHECK_ITEMS.length} covered</span><div><i style={{ width: `${pct}%` }} /></div><b>{pct}%</b></div>
          <ul>
            {CHECK_ITEMS.map((c, i) => (
              <li key={c}><button type="button" aria-pressed={done.includes(i)} className={done.includes(i) ? "is-on" : ""} onClick={() => toggle(i)}><span><Check size={13} /></span>{c}</button></li>
            ))}
          </ul>
          <p className="lf-c-check__msg">{pct === 100 ? "Every key clause is covered. Now read the details carefully before signing." : "Missing items aren't always deal-breakers, but ask the other party about each one before you sign."}</p>
        </Reveal>
      </Section>

      {/* contract types */}
      <Section tone="soft" title="Common contract types compared" subtitle="A general business contract fits many deals, but some situations call for a specialized agreement.">
        <Reveal className="lf-table-wrap">
          <table className="lf-table">
            <thead><tr><th>Contract type</th><th>Use it for</th><th>Key terms to include</th><th>Complexity</th></tr></thead>
            <tbody>{TYPES.map(([t, u, k, c]) => <tr key={t}><td><strong>{t}</strong></td><td>{u}</td><td>{k}</td><td><span className={`lf-pill lf-pill--${c.toLowerCase()}`}>{c}</span></td></tr>)}</tbody>
          </table>
        </Reveal>
        <p className="lf-small">Going into business with someone rather than just trading with them? You need a <Link to="/forms/templates/partnership">partnership agreement</Link>. Sharing sensitive plans first? Start with an <Link to="/forms/templates/nda">NDA</Link>.</p>
      </Section>

      {/* template */}
      <Section id="lf-template" title="Free business contract template" subtitle="Answer a few guided questions, review the finished contract and download an editable Word file.">
        <DocWizard config={CONTRACT} />
        <LegalNote />
      </Section>

      <FaqBlock faqs={FAQS} title="Business contract FAQs" variant="accordion" tone="gray" />

      <Section>
        <RelatedForms current={PATH} variant="chips" />
      </Section>

      {/* CTA: signature line */}
      <section className="lf-c-cta">
        <div className="container">
          <Reveal className="lf-c-cta__box">
            <div><h2>Want a contract drafted for your exact deal?</h2><p>Our team can prepare a custom contract and coordinate attorney review for high-value agreements.</p></div>
            <div className="lf-c-cta__sign"><span>Sign here</span><Link to={FORMS_START("business-contract")} className="lf-btn lf-btn--light">Get a custom contract <ArrowRight size={17} /></Link></div>
          </Reveal>
        </div>
      </section>

      <ServiceFooter disclaimer={DISCLAIMER} />
    </div>
  );
}

