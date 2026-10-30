import { useEffect, useMemo, useRef, useState } from "react";
import { Download, Plus, Trash2, ImagePlus, X, Printer, RotateCcw, Save, Check, AlertCircle } from "lucide-react";
import { downloadDoc, fill, esc } from "./forms";
import "./InvoiceEditor.css";

/* Editable invoice sheet + sidebar (layout modelled on invoice-generator.com, in this site's styling).
   Fill the sheet in place, pick a currency, and download a PDF (browser print) or a Word file. */

const STORE = "lbd-invoice-default";
const CURRENCIES = [
  ["USD", "US Dollar"], ["EUR", "Euro"], ["GBP", "British Pound"], ["CAD", "Canadian Dollar"], ["AUD", "Australian Dollar"],
  ["NZD", "New Zealand Dollar"], ["PKR", "Pakistani Rupee"], ["INR", "Indian Rupee"], ["AED", "UAE Dirham"], ["SAR", "Saudi Riyal"],
  ["QAR", "Qatari Riyal"], ["TRY", "Turkish Lira"], ["CHF", "Swiss Franc"], ["JPY", "Japanese Yen"], ["CNY", "Chinese Yuan"],
  ["SGD", "Singapore Dollar"], ["MYR", "Malaysian Ringgit"], ["ZAR", "South African Rand"], ["NGN", "Nigerian Naira"], ["MXN", "Mexican Peso"],
  ["BRL", "Brazilian Real"], ["SEK", "Swedish Krona"], ["NOK", "Norwegian Krone"], ["DKK", "Danish Krone"],
];

const today = () => new Date().toISOString().slice(0, 10);
const blankItem = () => ({ d: "", q: 1, r: 0 });
const fresh = () => ({
  type: "invoice", title: "INVOICE", logo: "", number: "1", from: "", billTo: "", shipTo: "", date: today(), terms: "", due: "", po: "",
  notes: "", termsText: "", currency: "USD", taxId: "", payInfo: "", payMethod: "", paidDate: "",
  discType: "percent", discount: 0, taxType: "percent", tax: 0, shipping: 0, paid: 0,
  items: [{ d: "", q: 1, r: 0 }],
});

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE) || "null");
    return saved ? { ...fresh(), ...saved, date: today(), items: saved.items?.length ? saved.items : fresh().items } : fresh();
  } catch {
    return fresh();
  }
}

const num = (x) => (Number.isFinite(Number(x)) ? Number(x) : 0);

function Auto({ value, onChange, rows = 2, ...rest }) {
  return <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} {...rest} />;
}

/* "Discount" / "Tax" row: a number box with a % / flat-amount switch */
function Adjust({ label, type, value, onType, onValue, symbol }) {
  return (
    <div className="lf-iv-tot__row">
      <span>{label}</span>
      <div className="lf-iv-adj">
        <input type="number" min="0" step="any" inputMode="decimal" aria-label={label} value={value} onChange={(e) => onValue(e.target.value)} />
        <button type="button" className="lf-iv-no-print" aria-label={`${label}: switch between percent and flat amount`} onClick={() => onType(type === "percent" ? "flat" : "percent")}>
          {type === "percent" ? "%" : symbol}
        </button>
        <b className="lf-iv-print-only">{type === "percent" ? "%" : ""}</b>
      </div>
    </div>
  );
}

export default function InvoiceEditor() {
  const [v, setV] = useState(load);
  const [saved, setSaved] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const fileRef = useRef(null);
  const set = (k) => (val) => setV((o) => ({ ...o, [k]: val }));
  const setItem = (i, k, val) => setV((o) => ({ ...o, items: o.items.map((x, j) => (j === i ? { ...x, [k]: val } : x)) }));

  const money = useMemo(() => {
    let f;
    try { f = new Intl.NumberFormat(undefined, { style: "currency", currency: v.currency }); } catch { f = new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }); }
    return (n) => f.format(num(n));
  }, [v.currency]);
  const symbol = useMemo(() => {
    try { return new Intl.NumberFormat(undefined, { style: "currency", currency: v.currency, currencyDisplay: "narrowSymbol" }).formatToParts(0).find((p) => p.type === "currency")?.value || "$"; } catch { return "$"; }
  }, [v.currency]);

  const isInv = v.type === "invoice";
  const subtotal = v.items.reduce((a, x) => a + num(x.q) * num(x.r), 0);
  const discount = Math.min(subtotal, v.discType === "percent" ? subtotal * (num(v.discount) / 100) : num(v.discount));
  const taxable = subtotal - discount;
  const tax = v.taxType === "percent" ? taxable * (num(v.tax) / 100) : num(v.tax);
  const total = taxable + tax + num(v.shipping);
  const balance = total - num(v.paid);

  /* Required and format checks, shown when the user tries to download. Keys match the inputs below. */
  const problems = useMemo(() => {
    const list = [];
    if (!v.from.trim()) list.push(["from", "Add your business name and contact details under “Who is this from?”."]);
    if (!v.billTo.trim()) list.push(["billTo", isInv ? "Add who you are billing in “Bill To”." : "Add who the payment was received from."]);
    if (!v.number.trim()) list.push(["number", `Add ${isInv ? "an invoice" : "a receipt"} number.`]);
    if (!v.date) list.push(["date", "Choose the document date."]);
    if (v.due && v.date && v.due < v.date) list.push(["due", "The due date can't be before the document date."]);
    const lines = v.items.filter((x) => x.d.trim() || num(x.r) > 0);
    if (!lines.length) list.push(["items", "Add at least one line item with a description and a rate."]);
    lines.forEach((x, i) => {
      if (!x.d.trim()) list.push(["items", `Line item ${i + 1} needs a description.`]);
      if (!(num(x.q) > 0)) list.push(["items", `Line item ${i + 1} needs a quantity greater than 0.`]);
      if (!(num(x.r) > 0)) list.push(["items", `Line item ${i + 1} needs a rate greater than 0.`]);
    });
    if (v.discType === "percent" && num(v.discount) > 100) list.push(["discount", "A percentage discount can't be more than 100%."]);
    if (v.taxType === "percent" && num(v.tax) > 100) list.push(["tax", "Tax can't be more than 100%."]);
    if (num(v.discount) < 0 || num(v.tax) < 0 || num(v.shipping) < 0 || num(v.paid) < 0) list.push(["amounts", "Amounts can't be negative."]);
    if (!isInv && !(num(v.paid) > 0)) list.push(["paid", "Enter the amount received in “Amount Paid” for a receipt."]);
    if (!isInv && !v.payMethod) list.push(["payMethod", "Choose how the payment was made."]);
    return list;
  }, [v, isInv]);
  const bad = (k) => (showErrors && problems.some(([f]) => f === k) ? { "aria-invalid": "true" } : {});
  const guard = (fn) => () => { if (problems.length) { setShowErrors(true); return; } setShowErrors(false); fn(); };

  useEffect(() => { if (saved) { const t = setTimeout(() => setSaved(false), 1800); return () => clearTimeout(t); } return undefined; }, [saved]);

  const pickLogo = (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !file.type.startsWith("image/") || file.size > 1.5 * 1024 * 1024) return;
    const reader = new FileReader();
    reader.onload = () => set("logo")(String(reader.result));
    reader.readAsDataURL(file);
  };

  const setMode = (type) => setV((o) => ({ ...o, type, title: type === "invoice" ? (o.title === "RECEIPT" ? "INVOICE" : o.title) : (o.title === "INVOICE" ? "RECEIPT" : o.title) }));
  const saveDefault = () => { try { const { date, ...rest } = v; localStorage.setItem(STORE, JSON.stringify(rest)); setSaved(true); } catch { /* storage blocked */ } };
  const reset = () => { try { localStorage.removeItem(STORE); } catch { /* ignore */ } setV(fresh()); };
  const br = (s) => esc(s).replace(/\n/g, "<br>");

  const downloadWord = () => downloadDoc(`${isInv ? "invoice" : "receipt"}-${(v.number || "draft").replace(/[^\w-]+/g, "-")}.doc`, isInv ? "Invoice" : "Receipt", `
<table style="border:0"><tr><td style="border:0"><h1>${esc(v.title || (isInv ? "INVOICE" : "RECEIPT"))}</h1><p><b>${isInv ? "Invoice" : "Receipt"} #:</b> ${fill(v.number)}</p><p>${v.from.trim() ? br(v.from) : "____________"}</p></td>
<td style="border:0" class="r"><p><b>Date:</b> ${fill(v.date)}<br>${v.terms.trim() ? `<b>Payment terms:</b> ${esc(v.terms)}<br>` : ""}${v.due ? `<b>Due date:</b> ${esc(v.due)}<br>` : ""}${v.po.trim() ? `<b>PO number:</b> ${esc(v.po)}<br>` : ""}${v.taxId.trim() ? `<b>Tax ID:</b> ${esc(v.taxId)}<br>` : ""}${!isInv && v.payMethod ? `<b>Payment method:</b> ${esc(v.payMethod)}<br>` : ""}${!isInv && v.paidDate ? `<b>Paid on:</b> ${esc(v.paidDate)}` : ""}</p></td></tr></table>
<table style="border:0"><tr><td style="border:0"><h2>${isInv ? "Bill to" : "Received from"}</h2><p>${v.billTo.trim() ? br(v.billTo) : "____________"}</p></td>${v.shipTo.trim() ? `<td style="border:0"><h2>Ship to</h2><p>${br(v.shipTo)}</p></td>` : ""}</tr></table>
<table><tr><th>Description</th><th class="r">Quantity</th><th class="r">Rate</th><th class="r">Amount</th></tr>
${v.items.map((x) => `<tr><td>${fill(x.d, "&nbsp;")}</td><td class="r">${esc(x.q)}</td><td class="r">${esc(money(x.r))}</td><td class="r">${esc(money(num(x.q) * num(x.r)))}</td></tr>`).join("")}
<tr><td colspan="3" class="r">Subtotal</td><td class="r">${esc(money(subtotal))}</td></tr>
${discount ? `<tr><td colspan="3" class="r">Discount${v.discType === "percent" ? ` (${esc(v.discount)}%)` : ""}</td><td class="r">-${esc(money(discount))}</td></tr>` : ""}
${tax ? `<tr><td colspan="3" class="r">Tax${v.taxType === "percent" ? ` (${esc(v.tax)}%)` : ""}</td><td class="r">${esc(money(tax))}</td></tr>` : ""}
${num(v.shipping) ? `<tr><td colspan="3" class="r">Shipping</td><td class="r">${esc(money(v.shipping))}</td></tr>` : ""}
<tr><td colspan="3" class="r"><b>Total</b></td><td class="r"><b>${esc(money(total))}</b></td></tr>
${num(v.paid) ? `<tr><td colspan="3" class="r">Amount paid</td><td class="r">${esc(money(v.paid))}</td></tr>` : ""}
<tr><td colspan="3" class="r"><b>${isInv ? "Balance due" : "Balance"}</b></td><td class="r"><b>${esc(money(balance))}</b></td></tr></table>
${isInv && v.payInfo.trim() ? `<h2>Payment instructions</h2><p>${br(v.payInfo)}</p>` : ""}${v.notes.trim() ? `<h2>Notes</h2><p>${br(v.notes)}</p>` : ""}${v.termsText.trim() ? `<h2>Terms</h2><p>${br(v.termsText)}</p>` : ""}`);

  return (
    <div className="lf-iv">
      {/* ---------- the invoice sheet ---------- */}
      <article className="lf-iv-paper" aria-label={isInv ? "Invoice" : "Receipt"}>
        {!isInv && <span className="lf-iv-stamp">PAID</span>}

        <header className="lf-iv-top">
          <div className="lf-iv-logo">
            {v.logo ? (
              <div className="lf-iv-logo__img">
                <img src={v.logo} alt="Your logo" />
                <button type="button" className="lf-iv-no-print" aria-label="Remove logo" onClick={() => set("logo")("")}><X size={14} /></button>
              </div>
            ) : (
              <button type="button" className="lf-iv-logo__add lf-iv-no-print" onClick={() => fileRef.current?.click()}><ImagePlus size={22} /><span>+ Logo</span></button>
            )}
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={pickLogo} />
          </div>
          <div className="lf-iv-title">
            <input aria-label="Document title" className="lf-iv-h1" value={v.title} onChange={(e) => set("title")(e.target.value)} />
            <label className="lf-iv-num"><span>#</span><input aria-label="Number" value={v.number} onChange={(e) => set("number")(e.target.value)} {...bad("number")} /></label>
          </div>
        </header>

        <section className="lf-iv-parties">
          <div className="lf-iv-col">
            <label className="lf-iv-field"><span>Who is this from?</span>
              <Auto value={v.from} onChange={set("from")} rows={3} placeholder="Business name, address, email, phone" {...bad("from")} /></label>
            <div className="lf-iv-pair">
              <label className="lf-iv-field"><span>{isInv ? "Bill To" : "Received From"}</span>
                <Auto value={v.billTo} onChange={set("billTo")} rows={3} placeholder="Who is this to?" {...bad("billTo")} /></label>
              <label className="lf-iv-field"><span>Ship To</span>
                <Auto value={v.shipTo} onChange={set("shipTo")} rows={3} placeholder="(optional)" /></label>
            </div>
          </div>
          <dl className="lf-iv-meta">
            <div><dt>Date</dt><dd><input type="date" value={v.date} onChange={(e) => set("date")(e.target.value)} {...bad("date")} /></dd></div>
            <div><dt>Payment Terms</dt><dd><input value={v.terms} onChange={(e) => set("terms")(e.target.value)} placeholder="e.g. Net 15" /></dd></div>
            <div><dt>Due Date</dt><dd><input type="date" value={v.due} onChange={(e) => set("due")(e.target.value)} {...bad("due")} /></dd></div>
            <div><dt>PO Number</dt><dd><input value={v.po} onChange={(e) => set("po")(e.target.value)} /></dd></div>
            <div><dt>Tax ID / EIN</dt><dd><input value={v.taxId} onChange={(e) => set("taxId")(e.target.value)} placeholder="optional" /></dd></div>
            {!isInv && <div><dt>Payment Method</dt><dd><select {...bad("payMethod")} value={v.payMethod} onChange={(e) => set("payMethod")(e.target.value)}><option value="">Select…</option>{["Cash", "Check", "Bank transfer", "Credit or debit card", "Other"].map((m) => <option key={m}>{m}</option>)}</select></dd></div>}
            {!isInv && <div><dt>Paid On</dt><dd><input type="date" value={v.paidDate} onChange={(e) => set("paidDate")(e.target.value)} /></dd></div>}
          </dl>
        </section>

        <div className="lf-iv-items" role="table" aria-label="Line items" {...bad("items")}>
          <div className="lf-iv-items__head" role="row"><span role="columnheader">Item</span><span role="columnheader">Quantity</span><span role="columnheader">Rate</span><span role="columnheader">Amount</span><span /></div>
          {v.items.map((x, i) => (
            <div key={i} className="lf-iv-items__row" role="row">
              <textarea rows={1} aria-label={`Item ${i + 1} description`} placeholder="Description of item/service..." value={x.d} onChange={(e) => setItem(i, "d", e.target.value)} />
              <input type="number" min="0" step="any" inputMode="decimal" aria-label={`Item ${i + 1} quantity`} value={x.q} onChange={(e) => setItem(i, "q", e.target.value)} />
              <label className="lf-iv-money"><i>{symbol}</i><input type="number" min="0" step="any" inputMode="decimal" aria-label={`Item ${i + 1} rate`} value={x.r} onChange={(e) => setItem(i, "r", e.target.value)} /></label>
              <output className="lf-iv-amt">{money(num(x.q) * num(x.r))}</output>
              <button type="button" className="lf-iv-del lf-iv-no-print" aria-label={`Remove item ${i + 1}`} disabled={v.items.length <= 1} onClick={() => setV((o) => ({ ...o, items: o.items.filter((_, j) => j !== i) }))}><Trash2 size={15} /></button>
            </div>
          ))}
        </div>
        <button type="button" className="lf-iv-add lf-iv-no-print" onClick={() => setV((o) => ({ ...o, items: [...o.items, blankItem()] }))}><Plus size={16} /> Line Item</button>

        <section className="lf-iv-foot">
          <div className="lf-iv-col">
            <label className="lf-iv-field"><span>Notes</span><Auto value={v.notes} onChange={set("notes")} rows={3} placeholder="Notes: any relevant information not already covered" /></label>
            {isInv && <label className="lf-iv-field"><span>Payment Instructions</span><Auto value={v.payInfo} onChange={set("payInfo")} rows={3} placeholder="How to pay: bank transfer details, payment link, or where to mail a check" /></label>}
            <label className="lf-iv-field"><span>Terms</span><Auto value={v.termsText} onChange={set("termsText")} rows={3} placeholder="Terms and conditions: late fees, payment methods, delivery schedule" /></label>
          </div>
          <div className="lf-iv-tot">
            <div className="lf-iv-tot__row"><span>Subtotal</span><b>{money(subtotal)}</b></div>
            <Adjust label="Discount" type={v.discType} value={v.discount} onType={set("discType")} onValue={set("discount")} symbol={symbol} />
            <Adjust label="Tax" type={v.taxType} value={v.tax} onType={set("taxType")} onValue={set("tax")} symbol={symbol} />
            <div className="lf-iv-tot__row"><span>Shipping</span>
              <label className="lf-iv-money"><i>{symbol}</i><input type="number" min="0" step="any" inputMode="decimal" aria-label="Shipping" value={v.shipping} onChange={(e) => set("shipping")(e.target.value)} /></label></div>
            <div className="lf-iv-tot__row is-total"><span>Total</span><b>{money(total)}</b></div>
            <div className="lf-iv-tot__row"><span>Amount Paid</span>
              <label className="lf-iv-money"><i>{symbol}</i><input type="number" min="0" step="any" inputMode="decimal" aria-label="Amount paid" value={v.paid} onChange={(e) => set("paid")(e.target.value)} /></label></div>
            <div className="lf-iv-tot__row is-balance"><span>{isInv ? "Balance Due" : "Balance"}</span><b>{money(balance)}</b></div>
          </div>
        </section>
      </article>

      {/* ---------- sidebar ---------- */}
      <aside className="lf-iv-side lf-iv-no-print" aria-label="Invoice options">
        <button type="button" className="lf-iv-dl" onClick={guard(() => window.print())}><Printer size={18} /> Download PDF</button>
        <p className="lf-iv-hint">Opens your print dialog. Choose <b>Save as PDF</b> as the destination.</p>
        <button type="button" className="lf-iv-dl lf-iv-dl--ghost" onClick={guard(downloadWord)}><Download size={17} /> Download Word (.doc)</button>
        {showErrors && problems.length > 0 && (
          <div className="lf-iv-errors" role="alert">
            <b><AlertCircle size={15} aria-hidden="true" /> Fix {problems.length === 1 ? "this" : "these"} before downloading</b>
            <ul>{problems.map(([k, m], i) => <li key={k + i}>{m}</li>)}</ul>
          </div>
        )}

        <div className="lf-iv-side__block">
          <span className="lf-iv-side__label">Document</span>
          <div className="lf-iv-seg" role="group" aria-label="Document type">
            {[["invoice", "Invoice"], ["receipt", "Receipt"]].map(([k, l]) => (
              <button key={k} type="button" aria-pressed={v.type === k} className={v.type === k ? "is-on" : ""} onClick={() => setMode(k)}>{l}</button>
            ))}
          </div>
        </div>

        <label className="lf-iv-side__block"><span className="lf-iv-side__label">Currency</span>
          <select value={v.currency} onChange={(e) => set("currency")(e.target.value)}>
            {CURRENCIES.map(([c, n]) => <option key={c} value={c}>{c} ({n})</option>)}
          </select>
        </label>

        <div className="lf-iv-side__block lf-iv-side__row">
          <button type="button" onClick={saveDefault}>{saved ? <><Check size={15} /> Saved</> : <><Save size={15} /> Save as default</>}</button>
          <button type="button" onClick={reset}><RotateCcw size={15} /> Clear</button>
        </div>
        <p className="lf-iv-hint">Nothing is uploaded. Your invoice stays in this browser.</p>
      </aside>
    </div>
  );
}
