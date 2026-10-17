import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight, ChevronRight, Download, RotateCcw, FileText, Sparkles, Compass } from "lucide-react";
import Seo from "../../components/common/Seo";
import { Reveal, Section, ServiceFooter } from "../../components/service";
import { FaqBlock, LegalNote, FormHero } from "./FormBits";
import { FormsHubVisual } from "./FormsVisual";
import { LEGAL_FORMS, LEGAL_FILINGS, FORMS_SEO, FORMS_START, DISCLAIMER, downloadDoc } from "./forms";
import "./Forms.css";

const PATH = "/forms/legal";
const ALL_FORMS = [...LEGAL_FORMS, ...LEGAL_FILINGS];
const byPath = Object.fromEntries(ALL_FORMS.map((f) => [f.path, f]));
const GROUPS = [
  ["all", "All forms", ALL_FORMS],
  ["contracts", "Contracts & billing", LEGAL_FORMS],
  ["filings", "Business filings", LEGAL_FILINGS],
];

/* "Which document do I need?" decision tree. Leaves point at a form path. */
const TREE = {
  start: { q: "What are you trying to do?", options: [
    ["Agree a deal with another business or customer", "deal"],
    ["Go into business with someone", { to: "/forms/templates/partnership", why: "Co-owners need written rules for ownership, profits, decisions and exits." }],
    ["Share sensitive information safely", { to: "/forms/templates/nda", why: "An NDA keeps your ideas, data and plans confidential before you share them." }],
    ["Get paid or record a payment", "pay"],
    ["Start, register or maintain a business", "biz"],
  ] },
  biz: { q: "Which step are you on?", options: [
    ["Officially creating an LLC", { to: "/forms/legal/articles-of-organization", why: "Articles of organization are the state filing that legally creates your LLC." }],
    ["Setting the rules for my LLC's owners", { to: "/forms/legal/operating-agreement", why: "An operating agreement covers ownership, management, profits and exits for your LLC." }],
    ["Operating under a brand name", { to: "/forms/legal/dba", why: "A DBA registration lets you trade under a name other than your legal name." }],
    ["Getting a federal tax ID", { to: "/forms/legal/ein", why: "Form SS-4 is how you apply for an EIN for banking, hiring and taxes." }],
    ["Keeping my company in good standing", { to: "/forms/legal/annual-report", why: "Your state's annual or biennial report keeps your company active and compliant." }],
  ] },
  deal: { q: "What's the deal mainly about?", options: [
    ["Selling or buying goods, supplies or assets", { to: "/forms/contract", why: "A business contract covers price, delivery, warranties and liability for commercial deals." }],
    ["Providing or hiring services or a project", { to: "/forms/templates/service-agreement", why: "A service agreement pins down scope, deliverables, revisions and milestone payments." }],
  ] },
  pay: { q: "Has the customer paid yet?", options: [
    ["Not yet: I need to request payment", { to: "/forms/invoice", why: "Send an invoice with the amount owed, due date and how to pay.", label: "Create an invoice" }],
    ["Yes: I need to confirm it", { to: "/forms/invoice", why: "Issue a receipt showing the amount paid, the date and the payment method.", label: "Create a receipt" }],
  ] },
};

const GLANCE = [
  ["Business Contract", "Businesses or a business and customer", "Before goods or obligations are exchanged", "2–6"],
  ["Partnership Agreement", "All partners", "When forming the partnership", "5–15"],
  ["NDA", "Discloser and recipient (or both)", "Before sharing confidential information", "2–4"],
  ["Service Agreement", "Service provider and client", "Before work begins", "3–8"],
  ["Invoice & Receipt", "Issued by the seller", "After delivery (invoice) / after payment (receipt)", "1"],
  ["Articles of Organization", "Organizer, filed with the state", "To create an LLC", "1–3"],
  ["LLC Operating Agreement", "All LLC members", "At or soon after formation", "8–25"],
  ["DBA Registration", "Business owner, filed with county or state", "Before using a trade name", "1–2"],
  ["EIN Application (SS-4)", "Responsible party, filed with the IRS", "After formation, before hiring or banking", "1"],
  ["Annual Report", "Authorized member, manager or officer", "Every year or two, by the state deadline", "1–2"],
];

/* Outlines for the blank downloadable templates. */
const BLANKS = {
  "/forms/contract": ["Parties", "Scope of goods or services", "Price and payment terms", "Term", "Warranties", "Limitation of liability", "Confidentiality", "Termination", "Governing law and disputes", "Entire agreement"],
  "/forms/templates/partnership": ["Name, purpose and type of partnership", "Partners and capital contributions", "Ownership percentages", "Profit and loss allocation", "Management and voting", "Duties and compensation", "Admission of new partners", "Withdrawal, death or disability and buyout", "Dispute resolution", "Dissolution"],
  "/forms/templates/nda": ["Parties", "Purpose", "Definition of confidential information", "Exclusions", "Obligations of the recipient", "Required disclosure", "Term", "Return of information", "No license", "Remedies"],
  "/forms/templates/service-agreement": ["Parties", "Services and scope (including out of scope)", "Deliverables and acceptance", "Revisions and change orders", "Fees, deposit and payment schedule", "Ownership of work", "Independent contractor status", "Confidentiality", "Termination and cancellation fee", "Limitation of liability"],
  "/forms/invoice": ["Your business details", "Invoice number and date", "Due date and payment terms", "Bill to", "Line items: description, quantity, rate, amount", "Subtotal, tax and total due", "Payment methods"],
  "/forms/legal/articles-of-organization": ["LLC name", "Registered agent name and address", "Principal office address", "Mailing address", "Management structure", "Purpose", "Effective date", "Organizer name and signature"],
  "/forms/legal/operating-agreement": ["Formation and purpose", "Members, contributions and ownership", "Management and voting", "Distributions and allocations", "Tax classification", "Books, records and banking", "Transfers and new members", "Withdrawal, death and buyout", "Dissolution", "Indemnification"],
  "/forms/legal/dba": ["Assumed name", "Legal name of owner(s)", "Entity type", "Business address and county", "Nature of business", "Date name first used", "Publication details (if required)", "Renewal date"],
  "/forms/legal/ein": ["Line 1: Legal name", "Line 2: Trade name", "Lines 4–6: Addresses and county", "Line 7: Responsible party", "Lines 8–9: LLC details and entity type", "Line 10: Reason for applying", "Lines 11–15: Dates and employees", "Lines 16–18: Activity and prior EIN"],
  "/forms/legal/annual-report": ["Legal name and entity number", "Principal office address", "Mailing address", "Registered agent", "Members, managers or officers", "Changes since last report", "Fee paid and confirmation", "Authorized signature"],
};

const FAQS = [
  ["Are these legal form templates really free?", "Yes. You can fill in and download every template on these pages at no cost. If you want a document customized for your situation or reviewed by an attorney, that's available as a paid service."],
  ["Can I edit a template after downloading it?", "Yes. Templates download as Word-compatible documents, so you can edit them in Microsoft Word, Google Docs, Pages or LibreOffice. Review every clause and replace any blank lines before anyone signs."],
  ["Do I need a lawyer to use these legal forms?", "For many routine, low-risk agreements, a well-completed template is enough. For high-value deals, complex ownership arrangements, employment matters or anything you don't fully understand, a licensed attorney's review is worth the cost."],
  ["Do these forms need to be notarized?", "Most business contracts, NDAs, service agreements and partnership agreements are valid when signed by the parties, without notarization. Some documents, such as those involving real estate or filed with certain agencies, may require a notary."],
  ["Which legal forms should a new small business have ready?", "Most new businesses benefit from a service agreement or business contract for customers, an NDA for sharing sensitive information, an invoice template for billing, and, if there's more than one owner, a partnership or operating agreement."],
];

function DocFinder() {
  const [path, setPath] = useState(["start"]);
  const [result, setResult] = useState(null);
  const node = TREE[path[path.length - 1]];
  const reset = () => { setPath(["start"]); setResult(null); };

  return (
    <Reveal className="lf-a-finder">
      <div className="lf-a-finder__progress">{["Goal", "Details", "Your document"].map((s, i) => <span key={s} className={result || i < path.length ? "is-on" : ""}>{s}</span>)}</div>
      {result ? (
        <div className="lf-a-finder__result" key="r">
          <span className="lf-eyebrow">You probably need</span>
          {(() => { const f = byPath[result.to]; return <><h3><f.icon size={24} />{f.title}</h3><p>{result.why}</p><div className="lf-actions"><Link to={result.to} className="lf-btn">{result.label || "Use this form"} <ArrowRight size={16} /></Link><button type="button" className="svc-ghost-btn" onClick={reset}><RotateCcw size={15} /> Start over</button></div></>; })()}
        </div>
      ) : (
        <div className="lf-a-finder__q" key={path.join()}>
          <h3>{node.q}</h3>
          <div>
            {node.options.map(([label, next]) => (
              <button key={label} type="button" onClick={() => (typeof next === "string" ? setPath((p) => [...p, next]) : setResult(next))}>{label}<ChevronRight size={18} /></button>
            ))}
          </div>
          {path.length > 1 && <button type="button" className="lf-a-finder__back" onClick={() => setPath((p) => p.slice(0, -1))}>← Back</button>}
        </div>
      )}
    </Reveal>
  );
}

export default function LegalForms() {
  const [q, setQ] = useState("");
  const [group, setGroup] = useState("all");
  const pool = GROUPS.find(([k]) => k === group)[2];
  const shown = pool.filter((f) => `${f.title} ${f.short} ${f.best}`.toLowerCase().includes(q.trim().toLowerCase()));

  const blank = (f) => downloadDoc(`${f.title.toLowerCase().replace(/[^a-z]+/g, "-").replace(/-$/, "")}-blank.doc`, f.title,
    `<h1>${f.title}</h1><p>Date: ____________</p>${BLANKS[f.path].map((h, i) => `<h2>${i + 1}. ${h}</h2><p>______________________________________________<br>______________________________________________</p>`).join("")}<h2>Signatures</h2><p>Name: ________________ Signature: ________________ Date: ________</p><p>Name: ________________ Signature: ________________ Date: ________</p>`);

  return (
    <div className="svc mc-page lf-page lf-all">
      <Seo {...FORMS_SEO[PATH]} path={PATH} faqs={FAQS} />

      <FormHero
        title="Free legal forms and business filing templates"
        subtitle={<>Contracts, agreements, invoices and state and IRS filing guides written in plain English. Find the form you need, <strong>fill it in online and download an editable copy</strong> in minutes.</>}
        primary={{ label: "Browse all forms", href: "#lf-forms" }}
        secondary={{ label: "Which document do I need?", href: "#lf-finder" }}
        visual={<FormsHubVisual />}
      />

      {/* search + card grid */}
      <Section id="lf-forms">
        <label className="lf-a-search">
          <Search size={20} />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search forms, e.g. confidential, payment, partner" aria-label="Search legal forms" />
          <span>{shown.length} form{shown.length === 1 ? "" : "s"}</span>
        </label>
        <div className="lf-a-groups" role="group" aria-label="Filter forms">
          {GROUPS.map(([k, label, list]) => (
            <button key={k} type="button" aria-pressed={group === k} className={group === k ? "is-on" : ""} onClick={() => setGroup(k)}>{label}<em>{list.length}</em></button>
          ))}
        </div>
        {shown.length ? (
          <Reveal className="lf-a-grid">
            {shown.map((f, i) => (
              <article key={f.path} style={{ "--i": i }}>
                <span className="lf-a-grid__icon"><f.icon size={24} /></span>
                <h2><Link to={f.path}>{f.title}</Link></h2>
                <p>{f.short}</p>
                <small><strong>Best for:</strong> {f.best}</small>
                <Link to={f.path} className="lf-btn lf-btn--sm">Use this form <ArrowRight size={15} /></Link>
              </article>
            ))}
            <article className="lf-a-grid__custom">
              <Sparkles size={26} />
              <h2>Need something custom?</h2>
              <p>We can draft or adapt any business document for your situation.</p>
              <Link to={FORMS_START("custom-legal-form")} className="lf-a-grid__link">Request a document <ArrowRight size={15} /></Link>
            </article>
          </Reveal>
        ) : (
          <p className="lf-a-empty">No forms match "{q}". <button type="button" onClick={() => setQ("")}>Clear search</button></p>
        )}
      </Section>

      {/* explanation */}
      <Section tone="gray">
        <div className="lf-a-why">
          <h2>Why put it in writing?</h2>
          <p>Handshake deals feel friendly until something goes wrong. A written agreement records exactly what each side promised, which prevents misunderstandings, speeds up resolving disagreements and shows customers, partners and investors that you run a professional business. Clear invoices and receipts do the same for your money: they help you get paid on time and give you the records you need at tax time.</p>
          <p>Each template on this page includes a plain-English guide to the document, the questions people most often ask, and a fillable version you can download. Start with the <Link to="/forms/contract">business contract</Link> for everyday deals, or the <Link to="/forms/templates/service-agreement">service agreement</Link> if you sell your time and skills.</p>
          <p>Setting up a company? Our business filing guides walk you through the official paperwork in order: <Link to="/forms/legal/articles-of-organization">articles of organization</Link>, an <Link to="/forms/legal/operating-agreement">operating agreement</Link>, your <Link to="/forms/legal/ein">EIN application</Link>, a <Link to="/forms/legal/dba">DBA</Link> if you use a brand name, and your yearly <Link to="/forms/legal/annual-report">annual report</Link>.</p>
        </div>
      </Section>

      {/* finder */}
      <Section id="lf-finder" title="Which document do I need?" subtitle="Answer one or two quick questions and we'll point you to the right form.">
        <DocFinder />
      </Section>

      {/* at a glance */}
      <Section tone="soft" title="Legal forms at a glance">
        <Reveal className="lf-table-wrap">
          <table className="lf-table lf-table--glance">
            <thead><tr><th>Document</th><th>Who signs or issues it</th><th>When to use it</th><th>Typical pages</th></tr></thead>
            <tbody>{GLANCE.map(([d, w, t, p]) => <tr key={d}><td><strong>{d}</strong></td><td>{w}</td><td>{t}</td><td>{p}</td></tr>)}</tbody>
          </table>
        </Reveal>
      </Section>

      {/* blank downloads */}
      <Section title="Download blank templates" subtitle="Prefer to fill it in by hand or in your own editor? Grab a blank outline with every key section.">
        <Reveal className="lf-a-blanks">
          {ALL_FORMS.map((f) => (
            <div key={f.path}>
              <FileText size={20} />
              <span><strong>{f.title}</strong><small>{BLANKS[f.path].length} sections · Word (.doc)</small></span>
              <button type="button" onClick={() => blank(f)} aria-label={`Download blank ${f.title}`}><Download size={16} /> Blank</button>
              <Link to={f.path}>Guided version <ArrowRight size={14} /></Link>
            </div>
          ))}
        </Reveal>
        <LegalNote />
      </Section>

      <FaqBlock faqs={FAQS} title="Legal forms FAQs" variant="twocol" tone="gray" />

      {/* CTA: three paths */}
      <section className="lf-a-cta">
        <div className="container">
          <h2>Not sure where to start?</h2>
          <Reveal className="lf-a-cta__paths">
            <a href="#lf-finder"><Compass size={22} /><strong>Use the finder</strong><small>Two questions, one answer</small></a>
            <Link to={FORMS_START("custom-legal-form")}><Sparkles size={22} /><strong>Get a custom document</strong><small>Drafted for your business</small></Link>
            <Link to="/business/llc"><FileText size={22} /><strong>Form your business</strong><small>LLC, corporation or DBA</small></Link>
          </Reveal>
        </div>
      </section>

      <ServiceFooter disclaimer={DISCLAIMER} />
    </div>
  );
}
