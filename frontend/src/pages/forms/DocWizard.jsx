import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, ArrowLeft, ArrowRight, Check, Download, Pencil, Plus, RotateCcw, Scale, Trash2 } from "lucide-react";
import Reveal from "../../components/service/Reveal";
import { downloadDoc, DISCLAIMER } from "./forms";
import { fmtDate, isBlank, num, usd } from "./wizardKit";
import "./Wizard.css";

/* Guided questionnaire for a legal document.
   config = {
     id, title, initial(): values,
     steps: [{ id, title, intro, fields: [Field] }],
     document(values): { filename, title, html }     // the same function builds the preview and the download
   }
   Field = { name, label, type, required, help, placeholder, options, showIf(values), validate(value, values), min, max, rows, width, ... }
   type: text (default) | textarea | select | choice | checks | check | date | number | money | email | tel | heading | group
   group = repeatable list of sub-fields (item: [Field], min, max, addLabel, itemLabel, validate(list, values)). */

const draftKey = (id) => `lbd-doc-draft-${id}`;
const visible = (f, v) => (f.showIf ? f.showIf(v) : true);
const lab = (f, v) => (typeof f.label === "function" ? f.label(v) : f.label);
const isEmpty = (val) => (Array.isArray(val) ? val.length === 0 : isBlank(val));

function loadDraft(config) {
  const base = config.initial();
  try {
    const saved = JSON.parse(localStorage.getItem(draftKey(config.id)) || "null");
    if (saved?.v) return { v: { ...base, ...saved.v }, step: Math.min(saved.step || 0, config.steps.length), restored: true };
  } catch { /* storage unavailable */ }
  return { v: base, step: 0, restored: false };
}

/* Returns an error message ("" when valid) for one field value. */
function check(f, val, v) {
  if (f.type === "heading") return "";
  if (f.type === "check") return f.required && !val ? "Please confirm to continue." : "";
  if (f.required && isEmpty(val)) {
    if (f.type === "select" || f.type === "choice") return "Choose an option.";
    if (f.type === "date") return "Choose a date.";
    if (f.type === "money") return "Enter an amount.";
    if (f.type === "number") return "Enter a number.";
    return f.requiredMsg || `${lab(f, v)} is required.`;
  }
  if (isEmpty(val)) return "";
  const s = String(val).trim();
  if (f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s)) return "Enter a valid email, like name@company.com.";
  if (f.type === "tel" && !/^[+()\-.\s\d]{7,20}$/.test(s)) return "Enter a valid phone number.";
  if (f.type === "date") {
    if (Number.isNaN(Date.parse(s))) return "Enter a valid date.";
    const min = typeof f.min === "function" ? f.min(v) : f.min;
    if (min && s < min) return f.minMsg || "This date is too early.";
    const max = typeof f.max === "function" ? f.max(v) : f.max;
    if (max && s > max) return "This date is too late.";
  }
  if (f.type === "number" || f.type === "money") {
    const n = num(s);
    if (!Number.isFinite(n) || !/^[$\s]*-?[\d,]*\.?\d+\s*%?$/.test(s)) return f.type === "money" ? "Enter an amount like 2500 or 2,500.00." : "Enter a number.";
    if (f.min !== undefined && n < f.min) return f.minMsg || (f.type === "money" ? `Enter an amount of at least ${usd(f.min)}.` : `Enter a number of at least ${f.min}.`);
    if (f.max !== undefined && n > f.max) return f.maxMsg || `Enter a number no higher than ${f.max}.`;
    if (f.type === "number" && f.integer && !Number.isInteger(n)) return "Enter a whole number.";
  }
  if (f.maxLength && s.length > f.maxLength) return `Keep this under ${f.maxLength} characters.`;
  if (f.validate) return f.validate(val, v) || "";
  return "";
}

/* Collects { path: message } for the visible fields of one step (or of one repeated item). */
function validateFields(fields, v, prefix = "", item = null, out = {}) {
  const ctx = item ? { ...v, ...item } : v;
  fields.forEach((f) => {
    if (!visible(f, ctx)) return;
    if (f.type === "group") {
      const list = v[f.name] || [];
      if (f.min && list.length < f.min) out[`${prefix}${f.name}`] = `Add at least ${f.min} ${f.itemLabel.toLowerCase()}${f.min > 1 ? "s" : ""}.`;
      list.forEach((it, i) => validateFields(f.item, v, `${prefix}${f.name}.${i}.`, it, out));
      const msg = f.validate ? f.validate(list, v) : "";
      if (msg && !out[`${prefix}${f.name}`]) out[`${prefix}${f.name}`] = msg;
      return;
    }
    const msg = check(f, (item || v)[f.name], ctx);
    if (msg) out[`${prefix}${f.name}`] = msg;
  });
  return out;
}

/* Human-readable value for the review screen */
function show(f, val) {
  if (Array.isArray(val)) return val.map((x) => f.options?.find(([k]) => k === x)?.[1] || x).join(", ");
  if (f.type === "date") return fmtDate(val);
  if (f.type === "money") return usd(val);
  if (f.type === "number" && f.unit) return f.unit === "%" ? `${val}%` : `${val} ${f.unit}`;
  if (f.type === "check") return val ? "Yes" : "No";
  if (f.options) return f.options.find(([k]) => k === val)?.[1] ?? String(val);
  return String(val);
}

function Control({ f, id, value, onChange, error, describedBy }) {
  const common = { id, "aria-invalid": error ? "true" : undefined, "aria-describedby": describedBy || undefined };
  switch (f.type) {
    case "textarea":
      return <textarea {...common} rows={f.rows || 3} value={value ?? ""} placeholder={f.placeholder} onChange={(e) => onChange(e.target.value)} />;
    case "select":
      return (
        <select {...common} value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
          <option value="">Select…</option>
          {f.options.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
        </select>
      );
    case "choice":
      return (
        <div className="lf-wiz__pills" role="radiogroup" aria-labelledby={`${id}-label`} aria-describedby={describedBy || undefined}>
          {f.options.map(([k, l]) => (
            <label key={k} className={value === k ? "is-on" : ""}>
              <input type="radio" name={id} value={k} checked={value === k} onChange={() => onChange(k)} />
              <span>{l}</span>
            </label>
          ))}
        </div>
      );
    case "checks":
      return (
        <div className="lf-wiz__pills lf-wiz__pills--multi" role="group" aria-labelledby={`${id}-label`}>
          {f.options.map(([k, l]) => {
            const on = (value || []).includes(k);
            return (
              <label key={k} className={on ? "is-on" : ""}>
                <input type="checkbox" checked={on} onChange={() => onChange(on ? value.filter((x) => x !== k) : [...(value || []), k])} />
                <span>{on && <Check size={13} />}{l}</span>
              </label>
            );
          })}
        </div>
      );
    case "check":
      return (
        <label className="lf-wiz__check">
          <input {...common} type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} />
          <span>{f.checkLabel}</span>
        </label>
      );
    case "money":
      return (
        <div className="lf-wiz__affix">
          <span aria-hidden="true">$</span>
          <input {...common} type="text" inputMode="decimal" value={value ?? ""} placeholder={f.placeholder || "0.00"} onChange={(e) => onChange(e.target.value)} />
        </div>
      );
    case "number":
      return (
        <div className="lf-wiz__affix">
          <input {...common} type="text" inputMode="numeric" value={value ?? ""} placeholder={f.placeholder} onChange={(e) => onChange(e.target.value)} />
          {f.unit && <span aria-hidden="true">{f.unit}</span>}
        </div>
      );
    case "date":
      return <input {...common} type="date" value={value ?? ""} min={typeof f.min === "string" ? f.min : undefined} onChange={(e) => onChange(e.target.value)} />;
    default:
      return <input {...common} type={f.type === "email" ? "email" : f.type === "tel" ? "tel" : "text"} value={value ?? ""} placeholder={f.placeholder} maxLength={f.maxLength} onChange={(e) => onChange(e.target.value)} />;
  }
}

function FieldRow({ f, idBase, value, onChange, error, values }) {
  const id = `${idBase}-${f.name}`;
  const label = lab(f, values);
  if (f.type === "heading") return <h3 className="lf-wiz__heading">{label}</h3>;
  const describedBy = [f.help ? `${id}-help` : "", error ? `${id}-err` : ""].filter(Boolean).join(" ");
  const isGroupish = f.type === "choice" || f.type === "checks";
  return (
    <div className={`lf-wiz__field lf-wiz__field--${f.width || "full"}${error ? " has-error" : ""}`} data-invalid={error ? "true" : undefined}>
      {f.type === "check" ? null : (
        isGroupish
          ? <span className="lf-wiz__label" id={`${id}-label`}>{label}<em>{f.required ? " *" : " (optional)"}</em></span>
          : <label className="lf-wiz__label" id={`${id}-label`} htmlFor={id}>{label}<em>{f.required ? " *" : " (optional)"}</em></label>
      )}
      <Control f={f} id={id} value={value} onChange={onChange} error={error} describedBy={describedBy} />
      {f.help && <p className="lf-wiz__help" id={`${id}-help`}>{f.help}</p>}
      {error && <p className="lf-wiz__error" id={`${id}-err`} role="alert"><AlertCircle size={14} aria-hidden="true" /> {error}</p>}
    </div>
  );
}

function Group({ f, idBase, list, onChange, errors, values }) {
  const blank = () => Object.fromEntries(f.item.filter((x) => x.type !== "heading").map((x) => [x.name, x.default ?? (x.type === "checks" ? [] : "")]));
  const max = f.max || 8;
  const groupErr = errors[f.name];
  return (
    <div className={`lf-wiz__group${groupErr ? " has-error" : ""}`} data-invalid={groupErr ? "true" : undefined}>
      <h3 className="lf-wiz__heading">{f.label}</h3>
      {f.help && <p className="lf-wiz__help">{f.help}</p>}
      {list.map((item, i) => (
        <fieldset key={i} className="lf-wiz__item">
          <legend>{f.itemLabel} {i + 1}</legend>
          <div className="lf-wiz__grid">
            {f.item.filter((x) => visible(x, { ...values, ...item })).map((sub) => (
              <FieldRow
                key={sub.name || String(sub.label)}
                f={sub}
                values={{ ...values, ...item }}
                idBase={`${idBase}-${f.name}-${i}`}
                value={item[sub.name]}
                error={errors[`${f.name}.${i}.${sub.name}`]}
                onChange={(val) => onChange(list.map((x, j) => (j === i ? { ...x, [sub.name]: val } : x)))}
              />
            ))}
          </div>
          {list.length > (f.min || 0) && (
            <button type="button" className="lf-wiz__link" onClick={() => onChange(list.filter((_, j) => j !== i))}><Trash2 size={14} /> Remove {f.itemLabel.toLowerCase()} {i + 1}</button>
          )}
        </fieldset>
      ))}
      {groupErr && <p className="lf-wiz__error" role="alert"><AlertCircle size={14} aria-hidden="true" /> {groupErr}</p>}
      {list.length < max && <button type="button" className="svc-ghost-btn lf-wiz__add" onClick={() => onChange([...list, blank()])}><Plus size={15} /> {f.addLabel || `Add ${f.itemLabel.toLowerCase()}`}</button>}
    </div>
  );
}

export default function DocWizard({ config }) {
  const initial = useMemo(() => loadDraft(config), [config]);
  const [v, setV] = useState(initial.v);
  const [step, setStep] = useState(initial.step);
  const [reached, setReached] = useState(initial.step);
  const [errors, setErrors] = useState({});
  const [restored, setRestored] = useState(initial.restored);
  const [savedAt, setSavedAt] = useState(null);
  const root = useRef(null);
  const total = config.steps.length;
  const onReview = step === total;
  const idBase = `wiz-${config.id}`;

  /* autosave the draft on this device */
  useEffect(() => {
    const t = setTimeout(() => {
      try { localStorage.setItem(draftKey(config.id), JSON.stringify({ v, step })); setSavedAt(new Date()); } catch { /* storage unavailable */ }
    }, 400);
    return () => clearTimeout(t);
  }, [v, step, config.id]);

  const set = (name) => (val) => {
    setV((o) => ({ ...o, [name]: val }));
    setErrors((e) => {
      if (!Object.keys(e).some((k) => k === name || k.startsWith(`${name}.`))) return e;
      const next = { ...e };
      Object.keys(next).forEach((k) => { if (k === name || k.startsWith(`${name}.`)) delete next[k]; });
      return next;
    });
  };

  const stepErrors = useCallback((i) => validateFields(config.steps[i].fields, v), [config.steps, v]);
  const allErrors = useMemo(() => config.steps.map((_, i) => validateFields(config.steps[i].fields, v)), [config.steps, v]);
  const firstBadStep = allErrors.findIndex((e) => Object.keys(e).length);

  const focusFirstInvalid = () => {
    requestAnimationFrame(() => {
      const el = root.current?.querySelector('[data-invalid="true"]');
      const input = el?.querySelector("input, select, textarea");
      (input || el)?.scrollIntoView?.({ behavior: "smooth", block: "center" });
      input?.focus?.({ preventScroll: true });
    });
  };
  const toTop = () => root.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const goTo = (i) => { setStep(i); setReached((r) => Math.max(r, i)); setErrors({}); toTop(); };
  const next = () => {
    const e = stepErrors(step);
    if (Object.keys(e).length) { setErrors(e); focusFirstInvalid(); return; }
    goTo(step + 1);
  };
  const back = () => goTo(Math.max(0, step - 1));

  const doc = useMemo(() => (onReview ? config.document(v) : null), [onReview, v, config]);
  const download = () => {
    if (firstBadStep >= 0) { setStep(firstBadStep); setErrors(allErrors[firstBadStep]); focusFirstInvalid(); return; }
    downloadDoc(doc.filename, doc.title, doc.html);
  };
  const startOver = () => {
    if (!window.confirm("Clear everything you've entered and start over?")) return;
    try { localStorage.removeItem(draftKey(config.id)); } catch { /* ignore */ }
    setV(config.initial()); setStep(0); setReached(0); setErrors({}); setRestored(false); setSavedAt(null);
  };

  const labels = [...config.steps.map((s) => s.title), "Review & download"];
  const pct = Math.round((step / total) * 100);

  return (
    <Reveal className="lf-wiz">
      <div ref={root} className="lf-wiz__top">
        <p className="lf-wiz__count" aria-live="polite">Step {step + 1} of {total + 1}: <b>{labels[step]}</b></p>
        <div className="lf-wiz__bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Form progress"><i style={{ width: `${pct}%` }} /></div>
        <ol className="lf-wiz__steps">
          {labels.map((l, i) => {
            const bad = i < total && i < reached && Object.keys(allErrors[i]).length > 0 && i !== step;
            return (
              <li key={l} className={`${i === step ? "is-on" : ""}${i < step ? " is-done" : ""}${bad ? " has-issue" : ""}`}>
                <button type="button" disabled={i > reached} aria-current={i === step ? "step" : undefined} onClick={() => goTo(i)}>
                  <span>{i < step && !bad ? <Check size={13} /> : bad ? "!" : i + 1}</span><em>{l}</em>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {restored && step === 0 && (
        <p className="lf-wiz__restored"><RotateCcw size={14} /> We restored your saved draft from this device. <button type="button" className="lf-wiz__link" onClick={startOver}>Start over</button></p>
      )}

      {!onReview ? (
        <form className="lf-wiz__card" key={step} noValidate onSubmit={(e) => { e.preventDefault(); next(); }}>
          <h3 className="lf-wiz__title">{config.steps[step].title}</h3>
          {config.steps[step].intro && <p className="lf-wiz__intro">{config.steps[step].intro}</p>}
          {Object.keys(errors).length > 0 && <p className="lf-wiz__summary" role="alert"><AlertCircle size={16} aria-hidden="true" /> Please fix {Object.keys(errors).length === 1 ? "the field" : `the ${Object.keys(errors).length} fields`} marked below to continue.</p>}
          <div className="lf-wiz__grid">
            {config.steps[step].fields.filter((f) => visible(f, v)).map((f) => (
              f.type === "group"
                ? <div className="lf-wiz__field lf-wiz__field--full" key={f.name}><Group f={f} idBase={idBase} list={v[f.name] || []} onChange={set(f.name)} errors={errors} values={v} /></div>
                : <FieldRow key={f.name || String(f.label)} f={f} idBase={idBase} value={v[f.name]} onChange={set(f.name)} error={errors[f.name]} values={v} />
            ))}
          </div>
          <div className="lf-wiz__nav">
            <button type="button" className="svc-ghost-btn" disabled={step === 0} onClick={back}><ArrowLeft size={16} /> Back</button>
            <span className="lf-wiz__saved">{savedAt ? "Draft saved on this device" : ""}</span>
            <button type="submit" className="lf-btn">{step === total - 1 ? "Review document" : "Next"} <ArrowRight size={16} /></button>
          </div>
        </form>
      ) : (
        <div className="lf-wiz__review" key="review">
          <div className="lf-wiz__card">
            <h3 className="lf-wiz__title">Review your answers</h3>
            <p className="lf-wiz__intro">Check each section. Use Edit to change an answer. The document on the right updates as you edit.</p>
            {firstBadStep >= 0 && (
              <p className="lf-wiz__summary" role="alert"><AlertCircle size={16} aria-hidden="true" /> Some required answers are missing or invalid. <button type="button" className="lf-wiz__link" onClick={() => { setStep(firstBadStep); setErrors(allErrors[firstBadStep]); focusFirstInvalid(); }}>Fix them in “{config.steps[firstBadStep].title}”</button></p>
            )}
            {config.steps.map((s, i) => {
              const rows = [];
              s.fields.forEach((f) => {
                if (f.type === "heading" || !visible(f, v)) return;
                if (f.type === "group") {
                  (v[f.name] || []).forEach((item, j) => {
                    const parts = f.item.filter((x) => x.type !== "heading" && visible(x, { ...v, ...item }) && !isEmpty(item[x.name])).map((x) => `${lab(x, v)}: ${show(x, item[x.name])}`);
                    if (parts.length) rows.push([`${f.itemLabel} ${j + 1}`, parts.join(" · ")]);
                  });
                  return;
                }
                if (isEmpty(v[f.name]) || (f.type === "check" && !v[f.name])) return;
                rows.push([lab(f, v), show(f, v[f.name])]);
              });
              return (
                <section key={s.id} className="lf-wiz__sum">
                  <header><h4>{s.title}</h4><button type="button" className="lf-wiz__link" onClick={() => goTo(i)}><Pencil size={13} /> Edit</button></header>
                  {rows.length ? <dl>{rows.map(([k, val], n) => <div key={`${n}-${k}`}><dt>{k}</dt><dd>{val}</dd></div>)}</dl> : <p className="lf-wiz__help">Nothing entered in this section.</p>}
                </section>
              );
            })}
          </div>

          <div className="lf-wiz__docwrap">
            <h3 className="lf-wiz__title">Document preview</h3>
            <div className="lf-wiz__paper" aria-label="Document preview" dangerouslySetInnerHTML={{ __html: doc.html }} />
            <p className="lf-wiz__legal"><Scale size={16} aria-hidden="true" /><span><b>Disclaimer:</b> {DISCLAIMER} Some agreements have extra requirements in certain states, so consider a legal review before you sign.</span></p>
            <div className="lf-wiz__nav">
              <button type="button" className="svc-ghost-btn" onClick={back}><ArrowLeft size={16} /> Back</button>
              <span className="lf-wiz__saved">{savedAt ? "Draft saved on this device" : ""}</span>
              <button type="button" className="lf-btn" onClick={download}><Download size={16} /> Download (.doc)</button>
            </div>
            <button type="button" className="lf-wiz__link lf-wiz__reset" onClick={startOver}><RotateCcw size={13} /> Clear my answers</button>
          </div>
        </div>
      )}
    </Reveal>
  );
}
