import { FileText, Check, ChevronDown, AlertCircle } from "lucide-react";

/* Pieces shared by the multi-step flows (quote request, LLC application). Styles live in GetStarted.css / Auth.css. */
export const Opt = () => <span className="gs-opt-tag">Optional</span>;
export const Req = () => <span className="gs-req" aria-hidden="true">*</span>;

export function Msg({ id, error, hint }) {
  if (error) return <p className="au-msg au-msg--err" id={id}><AlertCircle size={14} aria-hidden="true" />{error}</p>;
  if (hint) return <p className="au-msg" id={id}>{hint}</p>;
  return null;
}

export function Select({ id, label, icon, placeholder, options, error, hint, value, ...rest }) {
  const msgId = error || hint ? `${id}-msg` : undefined;
  return (
    <div className={`au-field${error ? " is-err" : ""}`}>
      <div className="au-field__top"><label htmlFor={id}>{label}</label></div>
      <div className="au-input gs-select">
        <span className="au-input__icon" aria-hidden="true">{icon}</span>
        <select id={id} value={value} className={value ? "" : "is-empty"} aria-invalid={error ? true : undefined} aria-describedby={msgId} {...rest}>
          <option value="" disabled>{placeholder}</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={18} className="gs-select__chev" aria-hidden="true" />
      </div>
      <Msg id={msgId} error={error} hint={hint} />
    </div>
  );
}

/* Card-style radio or checkbox group with a real fieldset/legend and native inputs (keyboard works as usual).
   `icons` maps an option value to its lucide icon. */
export function Choices({ type = "radio", name, legend, options, isOn, onToggle, error, cols = 2, aside, icons = {}, required = true }) {
  const errId = `gs-${name}-msg`;
  return (
    <fieldset className={`gs-choice gs-choice--${cols}${error ? " is-err" : ""}`} aria-describedby={error ? errId : undefined}>
      <legend>
        <span>{legend}{required && <Req />}</span>
        {aside}
      </legend>
      <div className="gs-choice__grid">
        {options.map(([val, title, desc], i) => {
          const on = isOn(val);
          const OptIcon = icons[val] || FileText;
          return (
            <label key={val} className={`gs-opt gs-opt--${type}${on ? " is-on" : ""}`} style={{ "--i": i }}>
              <input type={type} name={name} value={val} checked={on} onChange={() => onToggle(val)} aria-invalid={error ? true : undefined} />
              <span className="gs-opt__icon" aria-hidden="true"><OptIcon size={20} /></span>
              <span className="gs-opt__text"><b>{title}</b>{desc && <small>{desc}</small>}</span>
            </label>
          );
        })}
      </div>
      <Msg id={errId} error={error} />
    </fieldset>
  );
}

/* "Step n of N" + bar + clickable step list. Steps up to `reach` can be revisited. */
export function Progress({ steps, n, reach, onStep, label }) {
  const total = steps.length;
  return (
    <nav className="gs-progress" aria-label={label}>
      <div className="gs-progress__top">
        <p><b>Step {n} of {total}</b> · {steps[n - 1].label}</p>
        <span>{Math.round(((n - 1) / total) * 100)}% complete</span>
      </div>
      <div className="gs-progress__bar" aria-hidden="true"><span style={{ transform: `scaleX(${(n - 1) / total})` }} /></div>
      <ol className="gs-steps" style={{ "--cols": total }}>
        {steps.map((s, i) => {
          const k = i + 1;
          const state = k < n ? "done" : k === n ? "current" : "todo";
          const inner = (
            <>
              <span className="gs-steps__dot">{state === "done" ? <Check size={14} strokeWidth={3} aria-hidden="true" /> : k}</span>
              <span className="gs-steps__label">{s.label}</span>
              {state === "done" && <span className="sr-only"> (completed)</span>}
            </>
          );
          return (
            <li key={s.key} className={`is-${state}`}>
              {k !== n && k <= reach ? (
                <button type="button" onClick={() => onStep(k, k < n ? "back" : "fwd")}>{inner}</button>
              ) : (
                <span aria-current={state === "current" ? "step" : undefined}>{inner}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
