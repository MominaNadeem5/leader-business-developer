import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Flag, CircleDot, CheckCircle2, X, Check, AlertOctagon, ListChecks, Package, Wallet,
} from "lucide-react";
import Seo from "../../components/common/Seo";
import { Reveal, Section, ServiceFooter } from "../../components/service";
import { Segmented, FaqBlock, LegalNote, RelatedForms, FormHero } from "./FormBits";
import { ServiceVisual } from "./FormsVisual";
import { FORMS_SEO, FORMS_START, DISCLAIMER } from "./forms";
import DocWizard from "./DocWizard";
import { SERVICE } from "./docConfigs";
import "./Forms.css";

const PATH = "/forms/templates/service-agreement";
const money = (n) => `$${Math.round(n).toLocaleString()}`;

const PILLARS = {
  scope: {
    icon: <ListChecks size={18} />, label: "Scope of work",
    text: "The scope defines exactly what work is included and, just as importantly, what isn't. Unclear scope is the number-one cause of service disputes and unpaid extra work.",
    vague: "Provide website design services as needed.",
    clear: "Design and build a 5-page marketing website (Home, About, Services, Blog, Contact) on WordPress, including 2 rounds of revisions. Copywriting, hosting and logo design are not included.",
    tips: ["List what's out of scope", "Cap revision rounds", "Require written change orders for extras"],
  },
  deliverables: {
    icon: <Package size={18} />, label: "Deliverables",
    text: "Deliverables are the specific outputs the client receives, with formats, deadlines and how they'll be approved. Clear acceptance criteria stop projects from dragging on forever.",
    vague: "Deliver the final designs when ready.",
    clear: "Deliver homepage mockup (Figma) by March 10. Client has 5 business days to approve or request changes; silence counts as approval.",
    tips: ["Name the file formats", "Set a date for each deliverable", "Define how and when work is approved"],
  },
  payment: {
    icon: <Wallet size={18} />, label: "Payment terms",
    text: "Payment terms set the fee structure (fixed, hourly or retainer), the schedule, due dates, late fees and what happens to payment if the project is cancelled.",
    vague: "Client will pay upon completion.",
    clear: "$6,000 fixed fee: 40% deposit before work starts, 30% on design approval, 30% on launch. Invoices due Net 15; 1.5% monthly late fee. Ownership transfers on full payment.",
    tips: ["Take a deposit up front", "Tie IP transfer to final payment", "Add a kill fee for cancellations"],
  },
};

const RED_FLAGS = [
  ["Unlimited revisions", "A set number of revision rounds, with extra rounds billed hourly."],
  ["\"Payment on completion\" only", "A deposit plus milestone payments throughout the project."],
  ["Net 60 or 90 with no late fee", "Net 15 or 30 terms with a stated late fee."],
  ["IP transfers when you sign", "IP transfers only once the final invoice is paid."],
  ["Client can cancel with no payment", "A kill fee covering work done plus a share of the remainder."],
  ["One-sided termination rights", "Either party can terminate with written notice."],
  ["Unlimited liability for you", "Liability capped at the fees paid under the agreement."],
  ["Rules on your hours, tools and location", "Control over how you work, which protects contractor status."],
];

const FAQS = [
  ["What's the difference between a service agreement and a statement of work?", "A service agreement (sometimes called a master services agreement) sets the overall legal terms, such as payment, liability, IP and termination. A statement of work (SOW) describes a specific project's scope, deliverables and timeline. Many businesses sign one service agreement, then add a new SOW for each project."],
  ["Who owns the work under a service agreement?", "It depends on the agreement. Without a written assignment, an independent contractor often keeps copyright in what they create. Most clients require ownership to transfer to them, and providers commonly make that transfer conditional on full payment."],
  ["Should I charge a fixed fee or hourly in my service agreement?", "Fixed fees suit well-defined projects and give the client cost certainty. Hourly or daily rates suit open-ended or evolving work. Retainers suit ongoing services like bookkeeping or marketing. Whatever you choose, state how extra work outside the scope will be priced."],
  ["Can a service agreement affect contractor vs. employee status?", "Yes. If the agreement controls when, where and how the work is done, it can look more like employment. A well-drafted service agreement focuses on results and deliverables, lets the provider choose their own methods and tools, and confirms they're an independent contractor."],
  ["What should happen if the client wants to cancel mid-project?", "A termination clause should require written notice and payment for all work completed up to that date, plus any non-refundable expenses. Many providers also include a kill fee, such as 25% of the remaining project value, to cover time they reserved for the project."],
];

function MilestonePlanner() {
  const [fee, setFee] = useState(6000);
  const [deposit, setDeposit] = useState(40);
  const [stages, setStages] = useState(2);
  const [terms, setTerms] = useState("15");
  const rest = fee * (1 - deposit / 100);
  const rows = [{ name: "Deposit (before work starts)", amt: fee * deposit / 100 }, ...Array.from({ length: stages }, (_, i) => ({ name: i === stages - 1 ? "Final delivery & handover" : `Milestone ${i + 1} approval`, amt: rest / stages }))];

  return (
    <Reveal className="lf-s-plan">
      <div className="lf-s-plan__inputs">
        <label className="lf-range"><span>Total project fee<b>{money(fee)}</b></span>
          <input type="range" min="500" max="50000" step="500" value={fee} onChange={(e) => setFee(Number(e.target.value))} style={{ "--fill": `${((fee - 500) / 49500) * 100}%` }} /></label>
        <label className="lf-range"><span>Upfront deposit<b>{deposit}%</b></span>
          <input type="range" min="0" max="60" step="5" value={deposit} onChange={(e) => setDeposit(Number(e.target.value))} style={{ "--fill": `${(deposit / 60) * 100}%` }} /></label>
        <Segmented label="Payments after deposit" value={stages} onChange={setStages} options={[[1, "1"], [2, "2"], [3, "3"], [4, "4"]]} />
        <Segmented label="Invoice due" value={terms} onChange={setTerms} options={[["7", "Net 7"], ["15", "Net 15"], ["30", "Net 30"]]} />
      </div>
      <div className="lf-s-plan__out" aria-live="polite">
        <span className="lf-eyebrow">Your payment schedule</span>
        <ol>
          {rows.map((r, i) => (
            <li key={r.name} style={{ "--i": i }}><span>{i === 0 ? <CircleDot size={16} /> : <CheckCircle2 size={16} />}</span><strong>{r.name}</strong><b>{money(r.amt)}</b></li>
          ))}
        </ol>
        <p>Each invoice due within <strong>{terms} days</strong>. {deposit < 20 ? "A deposit under 20% leaves you exposed if the client disappears early." : deposit > 50 ? "A high deposit protects you, but some clients will push back." : "This deposit is in a typical range for project work."}</p>
      </div>
    </Reveal>
  );
}

/* Fill-in-the-blanks template: inputs sit inside the agreement text. */
export default function ServiceAgreement() {
  const [tab, setTab] = useState("scope");
  const p = PILLARS[tab];

  return (
    <div className="svc mc-page lf-page lf-service">
      <Seo {...FORMS_SEO[PATH]} path={PATH} faqs={FAQS} />

      <FormHero
        label="Service Agreement"
        title="Service agreement template that protects your time and your fee"
        subtitle={<>Define the scope, lock in deliverables and <strong>get paid on schedule</strong>. Plan your milestone payments, check for red flags, then fill in a professional service agreement in plain English.</>}
        primary={{ label: "Fill in the agreement", href: "#lf-template" }}
        secondary={{ label: "See the red flags", href: "#lf-flags" }}
        visual={<ServiceVisual />}
      />

      {/* explanation */}
      <Section>
        <div className="lf-s-intro">
          <h2>What is a service agreement?</h2>
          <p>A service agreement is a contract between a service provider and a client that sets out the work to be done, what will be delivered, when, and how much it costs. It's used by freelancers, consultants, agencies, contractors and any business hiring them, from web designers and bookkeepers to cleaners and IT support.</p>
          <p>Unlike a general <Link to="/forms/contract">business contract</Link>, which often covers a sale of goods, a service agreement focuses on <em>work over time</em>: how scope changes are handled, how many revisions are included, when payments fall due, who owns the finished work and what happens if the project stops halfway. If you'll be sharing sensitive information during the project, add an <Link to="/forms/templates/nda">NDA</Link>. To bill for completed work, use our <Link to="/forms/invoice">invoice template</Link>.</p>
        </div>
      </Section>

      {/* three pillars with vague vs clear */}
      <Section tone="gray" title="Scope of work, deliverables and payment terms" subtitle="The three sections that decide whether a project goes smoothly. Compare vague wording with clear wording.">
        <Reveal className="lf-s-pillars">
          <div className="lf-s-pillars__tabs" role="tablist">
            {Object.entries(PILLARS).map(([k, x]) => <button key={k} type="button" role="tab" aria-selected={tab === k} className={tab === k ? "is-on" : ""} onClick={() => setTab(k)}>{x.icon}{x.label}</button>)}
          </div>
          <div className="lf-s-pillars__panel" key={tab} role="tabpanel">
            <p>{p.text}</p>
            <div className="lf-s-compare">
              <div className="is-bad"><span><X size={14} /> Vague</span><q>{p.vague}</q></div>
              <div className="is-good"><span><Check size={14} /> Clear</span><q>{p.clear}</q></div>
            </div>
            <ul className="lf-s-tips">{p.tips.map((t) => <li key={t}><Check size={14} />{t}</li>)}</ul>
          </div>
        </Reveal>
      </Section>

      {/* milestone planner */}
      <Section title="Plan your milestone payments" subtitle="Splitting payments across the project protects both sides. Try a schedule.">
        <MilestonePlanner />
      </Section>

      {/* red flags */}
      <Section id="lf-flags" tone="soft">
        <Reveal className="lf-s-flags">
          <div className="lf-s-flags__head"><AlertOctagon size={28} /><div><h2>Red flags to avoid</h2><p>Spot any of these in an agreement you've been sent? Ask for the fix before you sign.</p></div></div>
          <div className="lf-s-flags__grid">
            {RED_FLAGS.map(([bad, good], i) => (
              <div key={bad} style={{ "--i": i }}><span className="bad"><Flag size={14} />{bad}</span><span className="good"><Check size={14} />{good}</span></div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* template */}
      <Section id="lf-template" title="Build your service agreement" subtitle="Answer the guided questions, review the agreement and download the complete version.">
        <DocWizard config={SERVICE} />
        <LegalNote />
      </Section>

      <FaqBlock faqs={FAQS} title="Service agreement FAQs" variant="numbered" tone="gray" />

      {/* CTA: checklist panel with related links */}
      <section className="lf-s-cta">
        <div className="container lf-s-cta__row">
          <div>
            <h2>Need a service agreement built for your business?</h2>
            <ul><li><Check size={15} /> Custom scope and SOW templates</li><li><Check size={15} /> Payment terms that get you paid</li><li><Check size={15} /> Optional attorney review</li></ul>
            <Link to={FORMS_START("service-agreement")} className="lf-btn">Get a custom agreement <ArrowRight size={17} /></Link>
          </div>
          <RelatedForms current={PATH} variant="chips" title="More legal forms" />
        </div>
      </section>

      <ServiceFooter disclaimer={DISCLAIMER} />
    </div>
  );
}
