import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, BadgeCheck, Send, CreditCard, Archive, FileClock, Check, UserRound, CalendarDays, ListChecks, Download } from "lucide-react";
import Seo from "../../components/common/Seo";
import { Reveal, Section, ServiceFooter } from "../../components/service";
import { FaqBlock, LegalNote, RelatedForms, FormHero } from "./FormBits";
import { InvoiceVisual } from "./FormsVisual";
import InvoiceEditor from "./InvoiceEditor";
import { FORMS_SEO, FORMS_START, DISCLAIMER } from "./forms";
import "./Forms.css";

const PATH = "/forms/invoice";

const ANNOTATIONS = [
  "Your business name, address and contact details",
  "The word \"Invoice\" with a unique invoice number",
  "Invoice date and payment due date",
  "Client's name and billing address",
  "Itemized description, quantity, rate and amount",
  "Subtotal, sales tax (shown separately) and total due",
  "Payment terms and accepted payment methods",
];

const INVOICE_FIELDS = ["Your business name, address, email and phone", "Unique, sequential invoice number", "Issue date", "Payment due date or terms (e.g. Net 15)", "Client's name and billing address", "Itemized products or services with quantities and rates", "Subtotal, discounts and taxes listed separately", "Total amount due and currency", "Accepted payment methods and instructions", "Late fee policy (if any)"];
const RECEIPT_FIELDS = ["Your business name and contact details", "Receipt or transaction number", "Date payment was received", "Customer name", "Items or services paid for", "Amount paid, including tax", "Payment method (card, cash, transfer)", "Reference to the original invoice number", "Balance remaining (if partial payment)"];

const FAQS = [
  ["Is an invoice the same as a receipt?", "No. An invoice is a request for payment sent before the customer pays. A receipt is proof that payment was received, issued after the customer pays. Many businesses send an invoice first, then mark it paid or issue a receipt once the money arrives."],
  ["How should I number my invoices?", "Use a unique, sequential system so no two invoices share a number, for example INV-2026-001, INV-2026-002. Sequential numbering makes it easy to track unpaid invoices, spot gaps and match payments during bookkeeping or a tax review."],
  ["Do I have to charge sales tax on my invoices?", "It depends on your state, what you sell and where your customer is. Many services are exempt in some states but taxable in others, while most physical goods are taxable. If you charge sales tax, show it as a separate line. Check your state's revenue department or ask your accountant."],
  ["How long should I keep invoices and receipts?", "The IRS generally recommends keeping records that support your tax return for at least three years from filing, and longer in some situations, such as six years if income was underreported. Many businesses keep invoices and receipts for seven years to be safe. Digital copies are acceptable if they're legible and complete."],
  ["Can I charge a late fee on an unpaid invoice?", "Generally yes, if the fee was agreed in advance, for example in your contract or stated on the invoice before the work, and it complies with your state's limits on interest and fees. A common approach is 1% to 1.5% per month on overdue balances."],
];

const STEPS = [
  [UserRound, "Add your details", "Upload a logo and fill in your business and your customer's details."],
  [CalendarDays, "Set the invoice basics", "Choose an invoice number, date, payment terms and due date."],
  [ListChecks, "List what you're charging for", "Add each item with a quantity and rate, then apply tax, discounts and shipping."],
  [Download, "Review and download", "Check the balance due, then download a PDF to send to your client."],
];

export default function InvoiceReceipt() {
  const [hot, setHot] = useState(null);
  const [tab, setTab] = useState("invoice");
  const list = tab === "invoice" ? INVOICE_FIELDS : RECEIPT_FIELDS;

  return (
    <div className="svc mc-page lf-page lf-invoice">
      <Seo {...FORMS_SEO[PATH]} path={PATH} faqs={FAQS} />

      <FormHero
        label="Invoice & Receipt"
        title="Free invoice & receipt template, ready in under a minute"
        subtitle={<>Create a professional invoice, <strong>switch it to a receipt once you're paid</strong>, and download it ready to send. No sign-up needed.</>}
        primary={{ label: "Create my invoice", href: "#lf-builder" }}
        secondary={{ label: "Invoice vs. receipt", href: "#lf-diff" }}
        visual={<InvoiceVisual />}
      />

      {/* the editor comes straight after the banner */}
      <Section id="lf-builder" tone="gray" title="Free invoice generator" subtitle="Fill in the invoice below, pick your currency and download it as a PDF. No sign-up needed.">
        <InvoiceEditor />
        <LegalNote className="lf-note--center" />
      </Section>

      {/* how it works */}
      <Section title="How to make an invoice" subtitle="Four quick steps from a blank page to a professional invoice.">
        <Reveal className="lf-iv-steps">
          {STEPS.map(([Icon, title, text], i) => (
            <div key={title} style={{ "--i": i }}><span><Icon size={20} /></span><em>{i + 1}</em><h3>{title}</h3><p>{text}</p></div>
          ))}
        </Reveal>
      </Section>

      {/* annotated sample */}
      <Section tone="gray" title="Sample invoice layout, explained" subtitle="Hover or tap a number to see what belongs in each part of a professional invoice.">
        <Reveal className="lf-i-anno">
          <div className="lf-i-anno__sheet">
            {ANNOTATIONS.map((_, i) => (
              <button key={i} type="button" className={`lf-i-anno__pin p${i + 1} ${hot === i ? "is-on" : ""}`} onMouseEnter={() => setHot(i)} onFocus={() => setHot(i)} onClick={() => setHot(i)} aria-label={ANNOTATIONS[i]}>{i + 1}</button>
            ))}
            <div className="a1"><b>Bright Leaf Studio</b><i /><i /></div>
            <div className="a2"><b>INVOICE</b><i /></div>
            <div className="a3"><i /><i /></div>
            <div className="a4"><i /><i /><i /></div>
            <div className="a5">{[0, 1, 2].map((k) => <span key={k}><i /><i /><i /></span>)}</div>
            <div className="a6"><i /><i /><b /></div>
            <div className="a7"><i /><i /></div>
          </div>
          <ol className="lf-i-anno__list">
            {ANNOTATIONS.map((a, i) => <li key={a} className={hot === i ? "is-on" : ""} onMouseEnter={() => setHot(i)}><span>{i + 1}</span>{a}</li>)}
          </ol>
        </Reveal>
      </Section>

      {/* explanation + invoice vs receipt */}
      <Section id="lf-diff" title="Invoice vs. receipt: what's the difference?">
        <div className="lf-i-diff">
          <p className="lf-i-diff__lead">An <strong>invoice</strong> asks for payment; a <strong>receipt</strong> proves it was made. You send an invoice after delivering goods or services and before the customer pays. You issue a receipt once payment arrives. Both are essential records: invoices track what you're owed, and receipts back up the income and expenses on your tax return.</p>
          <Reveal className="lf-i-flow">
            {[[<FileText size={20} />, "Quote or contract", "Agree price and scope"], [<Send size={20} />, "Invoice", "Request payment"], [<CreditCard size={20} />, "Payment", "Customer pays"], [<BadgeCheck size={20} />, "Receipt", "Confirm payment"], [<Archive size={20} />, "Records", "Keep for taxes"]].map(([ic, t, s], i) => (
              <div key={t} style={{ "--i": i }} className={t === "Invoice" || t === "Receipt" ? "is-key" : ""}><span>{ic}</span><strong>{t}</strong><small>{s}</small></div>
            ))}
          </Reveal>
          <div className="lf-i-diff__cols">
            <div><h3><FileClock size={18} /> Invoice</h3><ul><li>Sent <strong>before</strong> payment</li><li>Shows amount <strong>owed</strong> and due date</li><li>Includes payment terms and methods</li><li>Tracked as accounts receivable</li></ul></div>
            <div><h3><BadgeCheck size={18} /> Receipt</h3><ul><li>Issued <strong>after</strong> payment</li><li>Shows amount <strong>paid</strong> and how</li><li>References the original invoice</li><li>Proof of purchase for the customer</li></ul></div>
          </div>
        </div>
      </Section>

      {/* required fields checklist */}
      <Section tone="soft" title="Required fields checklist" subtitle="Before you hit send, make sure every one of these is on your document.">
        <Reveal className="lf-i-req">
          <div className="lf-i-req__tabs" role="tablist">
            <button type="button" role="tab" aria-selected={tab === "invoice"} className={tab === "invoice" ? "is-on" : ""} onClick={() => setTab("invoice")}>Invoice ({INVOICE_FIELDS.length})</button>
            <button type="button" role="tab" aria-selected={tab === "receipt"} className={tab === "receipt" ? "is-on" : ""} onClick={() => setTab("receipt")}>Receipt ({RECEIPT_FIELDS.length})</button>
          </div>
          <ul key={tab}>{list.map((f, i) => <li key={f} style={{ "--i": i }}><Check size={15} />{f}</li>)}</ul>
        </Reveal>
        <p className="lf-small">Getting paid for ongoing work? Set your payment terms in a <Link to="/forms/templates/service-agreement">service agreement</Link> first, so your invoices simply follow what the client already agreed to.</p>
      </Section>

      {/* record keeping tips: compact row */}
      <Section>
        <Reveal className="lf-i-tips">
          <h2>Invoicing habits that get you paid faster</h2>
          <div>
            <p><strong>Invoice promptly.</strong> Send the invoice the day work is delivered, while the value is fresh.</p>
            <p><strong>Use short terms.</strong> Net 15 typically gets paid faster than Net 30, and "due on receipt" faster still.</p>
            <p><strong>Make paying easy.</strong> Offer card or online payment and put a payment link right on the invoice.</p>
            <p><strong>Follow up on a schedule.</strong> A polite reminder at 3 days overdue, then 10 and 30, is more effective than waiting.</p>
          </div>
        </Reveal>
      </Section>

      <FaqBlock faqs={FAQS} title="Invoice & receipt FAQs" variant="cards" tone="gray" />

      {/* CTA: receipt-style ticket */}
      <section className="lf-i-cta">
        <div className="container">
          <Reveal className="lf-i-cta__ticket">
            <span>Next step</span>
            <h2>Get paid online, automatically</h2>
            <p>We set up payment processing, merchant accounts and invoicing tools so customers can pay your invoices in one click.</p>
            <div className="lf-actions lf-actions--center">
              <Link to="/payment-integration" className="lf-btn">Set up online payments <ArrowRight size={17} /></Link>
              <Link to={FORMS_START("invoicing")} className="svc-ghost-btn">Talk to us</Link>
            </div>
          </Reveal>
          <RelatedForms current={PATH} variant="tiles" />
        </div>
      </section>

      <ServiceFooter disclaimer={DISCLAIMER} />
    </div>
  );
}
