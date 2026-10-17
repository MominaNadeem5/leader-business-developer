import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Download, Plus, Trash2, FileText, BadgeCheck, Send, CreditCard, Archive, FileClock, Check,
} from "lucide-react";
import Seo from "../../components/common/Seo";
import { Reveal, Section, ServiceFooter } from "../../components/service";
import { Field, Segmented, FaqBlock, LegalNote, RelatedForms, FormHero } from "./FormBits";
import { InvoiceVisual } from "./FormsVisual";
import { FORMS_SEO, FORMS_START, DISCLAIMER, downloadDoc, fill, esc } from "./forms";
import "./Forms.css";

const PATH = "/forms/invoice";
const usd = (n) => `$${(Number(n) || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

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

function InvoiceBuilder() {
  const [mode, setMode] = useState("invoice");
  const [v, setV] = useState({ from: "Bright Leaf Studio", fromAddr: "120 Main St, Austin, TX", to: "Northwind Inc.", toAddr: "45 Market Ave, Dallas, TX", num: "INV-2026-014", date: "", due: "Net 15", tax: 8.25, method: "Bank transfer" });
  const [items, setItems] = useState([{ d: "Website design (5 pages)", q: 1, r: 2400 }, { d: "Logo refresh", q: 1, r: 650 }, { d: "Extra revision hours", q: 3, r: 85 }]);
  const set = (k) => (val) => setV((o) => ({ ...o, [k]: val }));
  const setItem = (i, k, val) => setItems((it) => it.map((x, j) => (j === i ? { ...x, [k]: val } : x)));
  const sub = items.reduce((a, x) => a + (Number(x.q) || 0) * (Number(x.r) || 0), 0);
  const tax = sub * ((Number(v.tax) || 0) / 100);
  const total = sub + tax;
  const isInv = mode === "invoice";
  const docNum = isInv ? v.num : v.num.replace(/^INV/, "RCPT");

  const download = () => downloadDoc(`${isInv ? "invoice" : "receipt"}-${docNum || "draft"}.doc`, isInv ? "Invoice" : "Receipt", `
<table style="border:0"><tr><td style="border:0"><h1>${isInv ? "INVOICE" : "RECEIPT"}</h1><p><b>${fill(v.from)}</b><br>${fill(v.fromAddr)}</p></td>
<td style="border:0" class="r"><p><b>${isInv ? "Invoice" : "Receipt"} #:</b> ${fill(docNum)}<br><b>Date:</b> ${fill(v.date)}<br>${isInv ? `<b>Terms:</b> ${esc(v.due)}` : `<b>Paid via:</b> ${esc(v.method)}<br><b>For invoice:</b> ${fill(v.num)}`}</p></td></tr></table>
<h2>${isInv ? "Bill to" : "Received from"}</h2><p>${fill(v.to)}<br>${fill(v.toAddr)}</p>
<table><tr><th>Description</th><th class="r">Qty</th><th class="r">Rate</th><th class="r">Amount</th></tr>
${items.map((x) => `<tr><td>${fill(x.d)}</td><td class="r">${esc(x.q)}</td><td class="r">${usd(x.r)}</td><td class="r">${usd(x.q * x.r)}</td></tr>`).join("")}
<tr><td colspan="3" class="r">Subtotal</td><td class="r">${usd(sub)}</td></tr>
<tr><td colspan="3" class="r">Sales tax (${esc(v.tax)}%)</td><td class="r">${usd(tax)}</td></tr>
<tr><td colspan="3" class="r"><b>${isInv ? "Total due" : "Total paid"}</b></td><td class="r"><b>${usd(total)}</b></td></tr></table>
<p>${isInv ? `Payment due ${esc(v.due)}. Pay by ${esc(v.method)}. Late payments may incur a 1.5% monthly fee.` : "Thank you for your payment. Balance remaining: $0.00."}</p>`);

  return (
    <Reveal className="lf-i-build">
      <div className="lf-i-build__form">
        <Segmented label="Create a" value={mode} onChange={setMode} options={[["invoice", "Invoice"], ["receipt", "Receipt"]]} />
        <div className="lf-grid-2">
          <Field label="Your business" value={v.from} onChange={set("from")} />
          <Field label="Client" value={v.to} onChange={set("to")} />
          <Field label="Your address" value={v.fromAddr} onChange={set("fromAddr")} />
          <Field label="Client address" value={v.toAddr} onChange={set("toAddr")} />
          <Field label="Invoice number" value={v.num} onChange={set("num")} />
          <Field label={isInv ? "Invoice date" : "Payment date"} type="date" value={v.date} onChange={set("date")} />
          {isInv ? <Field label="Payment terms" value={v.due} onChange={set("due")} /> : <Field label="Payment method" value={v.method} onChange={set("method")} />}
          <Field label="Sales tax %" type="number" min="0" step="0.25" value={v.tax} onChange={set("tax")} />
        </div>
        <div className="lf-i-items">
          <span className="lf-seg-label">Line items</span>
          {items.map((x, i) => (
            <div key={i} className="lf-i-items__row">
              <input aria-label="Description" value={x.d} onChange={(e) => setItem(i, "d", e.target.value)} />
              <input aria-label="Quantity" type="number" min="0" value={x.q} onChange={(e) => setItem(i, "q", Number(e.target.value))} />
              <input aria-label="Rate" type="number" min="0" value={x.r} onChange={(e) => setItem(i, "r", Number(e.target.value))} />
              <button type="button" aria-label="Remove item" disabled={items.length <= 1} onClick={() => setItems((it) => it.filter((_, j) => j !== i))}><Trash2 size={15} /></button>
            </div>
          ))}
          {items.length < 8 && <button type="button" className="lf-p-calc__add" onClick={() => setItems((it) => [...it, { d: "", q: 1, r: 0 }])}><Plus size={15} /> Add line</button>}
        </div>
      </div>
      <div className="lf-i-sheet-wrap">
        <div className={`lf-i-sheet ${isInv ? "" : "is-paid"}`}>
          {!isInv && <span className="lf-i-stamp">PAID</span>}
          <div className="lf-i-sheet__top"><div><b>{v.from || "Your Business"}</b><small>{v.fromAddr}</small></div><div className="r"><h4>{isInv ? "INVOICE" : "RECEIPT"}</h4><small>#{docNum}</small><small>{v.date || "Date"}</small></div></div>
          <div className="lf-i-sheet__to"><small>{isInv ? "Bill to" : "Received from"}</small><b>{v.to || "Client"}</b><small>{v.toAddr}</small></div>
          <table><thead><tr><th>Item</th><th>Qty</th><th>Amount</th></tr></thead>
            <tbody>{items.map((x, i) => <tr key={i}><td>{x.d || "—"}</td><td>{x.q}</td><td>{usd(x.q * x.r)}</td></tr>)}</tbody></table>
          <dl><dt>Subtotal</dt><dd>{usd(sub)}</dd><dt>Tax ({v.tax}%)</dt><dd>{usd(tax)}</dd><dt className="t">{isInv ? "Total due" : "Total paid"}</dt><dd className="t">{usd(total)}</dd></dl>
          <p className="lf-i-sheet__foot">{isInv ? `Terms: ${v.due} · Pay by ${v.method}` : `Paid via ${v.method} · Ref ${v.num}`}</p>
        </div>
        <button type="button" className="lf-btn" onClick={download}><Download size={17} /> Download {isInv ? "invoice" : "receipt"} (.doc)</button>
      </div>
    </Reveal>
  );
}

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

      {/* builder comes straight after the banner */}
      <Section id="lf-builder" title="Invoice & receipt generator" subtitle="Edit any field and the document updates instantly. Switch to a receipt once you've been paid.">
        <InvoiceBuilder />
        <LegalNote className="lf-note--center" />
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
