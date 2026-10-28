import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowRight, ArrowLeft, Scale } from "lucide-react";
import Reveal from "../../components/service/Reveal";
import ServiceHero from "../../components/service/ServiceHero";
import { LEGAL_FORMS, DISCLAIMER, FORMS_HUB } from "./forms";

/* The site-standard service banner (same as every other service page).
   Only the text and the right-side `visual` change per Legal Form page. */
export function FormHero({ label, title, subtitle, primary, secondary, visual }) {
  const crumbs = label
    ? [{ label: "Home", to: "/" }, { label: "Legal Forms", to: FORMS_HUB }, { label }]
    : [{ label: "Home", to: "/" }, { label: "Legal Forms" }];
  return (
    <ServiceHero
      crumbs={crumbs}
      title={title}
      subtitle={subtitle}
      showTrust={false}
      actions={<>
        <a href={primary.href} className="btn btn--primary btn--md">{primary.label} <ArrowRight size={18} /></a>
        {secondary && <a href={secondary.href} className="svc-ghost-btn">{secondary.label}</a>}
      </>}
      visual={visual}
    />
  );
}

/* Labelled text input used by the fillable templates. */
export function Field({ label, value, onChange, type = "text", placeholder, ...rest }) {
  return (
    <label className="lf-field">
      <span>{label}</span>
      <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(type === "number" ? Number(e.target.value) : e.target.value)} {...rest} />
    </label>
  );
}

/* Segmented choice buttons. options: [[value, label], ...] */
export function Segmented({ label, value, options, onChange }) {
  return (
    <div className="lf-seg-wrap">
      {label && <span className="lf-seg-label">{label}</span>}
      <div className="lf-seg" role="group" aria-label={label}>
        {options.map(([v, l]) => (
          <button key={v} type="button" aria-pressed={v === value} className={v === value ? "is-on" : ""} onClick={() => onChange(v)}>{l}</button>
        ))}
      </div>
    </div>
  );
}

/* FAQs in a few layouts so each page reads differently.
   variant: "accordion" | "grid" | "split" | "numbered" | "cards"   faqs: [question, answer][] */
export function FaqBlock({ faqs, title = "Frequently asked questions", variant = "accordion", tone = "white" }) {
  const [open, setOpen] = useState(0);
  return (
    <section className={`svc-section svc-section--${tone} lf-faq lf-faq--${variant}`}>
      <div className={`container ${variant === "accordion" || variant === "numbered" ? "svc-narrow" : ""}`}>
        <h2 className="svc-title">{title}</h2>
        {variant === "articles" ? (
          <Reveal className="lf-art">
            <nav className="lf-art__list" role="tablist" aria-label={title}>
              {faqs.map(([q], i) => (
                <button key={q} type="button" role="tab" aria-selected={open === i} className={open === i ? "is-on" : ""} onClick={() => setOpen(i)}>
                  <em>{String(i + 1).padStart(2, "0")}</em><span>{q}</span>
                </button>
              ))}
            </nav>
            <article className="lf-art__body" key={open} role="tabpanel">
              <p className="lf-art__eyebrow">
                <b>Article {String(open + 1).padStart(2, "0")}</b>
                <span>{Math.max(1, Math.ceil(faqs[open][1].split(/\s+/).length / 200))} min read</span>
              </p>
              <h3>{faqs[open][0]}</h3>
              <p className="lf-art__text">{faqs[open][1]}</p>
              <div className="lf-art__nav">
                <button type="button" disabled={open === 0} onClick={() => setOpen(open - 1)}><ArrowLeft size={16} /> Previous</button>
                <span aria-live="polite">{open + 1} of {faqs.length}</span>
                <button type="button" disabled={open === faqs.length - 1} onClick={() => setOpen(open + 1)}>Next <ArrowRight size={16} /></button>
              </div>
            </article>
          </Reveal>
        ) : variant === "split" ? (
          <Reveal className="lf-faq__split">
            <div className="lf-faq__qs" role="tablist">
              {faqs.map(([q], i) => (
                <button key={q} type="button" role="tab" aria-selected={open === i} className={open === i ? "is-on" : ""} onClick={() => setOpen(i)}>{q}</button>
              ))}
            </div>
            <div className="lf-faq__a" key={open} role="tabpanel"><h3>{faqs[open][0]}</h3><p>{faqs[open][1]}</p></div>
          </Reveal>
        ) : variant === "grid" || variant === "cards" ? (
          <Reveal className="lf-faq__grid">
            {faqs.map(([q, a], i) => <article key={q} style={{ "--i": i }}><h3>{q}</h3><p>{a}</p></article>)}
          </Reveal>
        ) : (
          <div className="lf-faq__list">
            {faqs.map(([q, a], i) => (
              <details key={q} open={variant === "numbered" && i === 0}>
                <summary>{variant === "numbered" && <em>{String(i + 1).padStart(2, "0")}</em>}<span>{q}</span><ChevronDown size={18} /></summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* Short legal disclaimer box. */
export function LegalNote({ className = "" }) {
  return (
    <p className={`lf-note ${className}`.trim()}><Scale size={16} /><span><strong>Disclaimer:</strong> {DISCLAIMER}</span></p>
  );
}

/* Internal links to the other Legal Form pages.
   variant: "chips" (inline pills) | "list" (rows with descriptions) | "tiles" (compact cards) */
export function RelatedForms({ current, variant = "chips", title = "Related legal forms", group = LEGAL_FORMS }) {
  const items = group.filter((f) => f.path !== current);
  return (
    <div className={`lf-related lf-related--${variant}`}>
      <h3>{title}</h3>
      <div>
        {items.map((f) => (
          <Link key={f.path} to={f.path}>
            <f.icon size={variant === "chips" ? 15 : 20} />
            <span><strong>{f.title}</strong>{variant !== "chips" && <small>{f.short}</small>}</span>
            {variant !== "chips" && <ArrowRight size={15} />}
          </Link>
        ))}
        <Link to="/forms/legal" className="lf-related__all">View all legal forms <ArrowRight size={14} /></Link>
      </div>
    </div>
  );
}
