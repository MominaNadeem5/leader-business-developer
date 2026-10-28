import { useEffect, useId, useMemo, useRef, useState } from "react";
import { FileText, Check, ChevronDown, AlertCircle, Search, X } from "lucide-react";

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

/* Searchable dropdown in the same field style as <Select>. It looks and behaves like a normal select (a button that
   opens a white list), with a search box at the top of the list. It is a button, not a text input, so the browser's
   address-autofill popup never appears over it.
   allowCustom: lets the person use text that isn't in the list ("Use “…”" row), for free-form answers like Industry.
   field: name used to find the control when validation focuses the first error. */
export function SearchSelect({
  id, label, icon, placeholder, searchPlaceholder = "Search…", options, value, onChange, onBlur, error, hint, field,
  disabled = false, allowCustom = false, emptyText = "No matches found",
}) {
  const msgId = error || hint ? `${id}-msg` : undefined;
  const listId = useId();
  const wrapRef = useRef(null);
  const btnRef = useRef(null);
  const searchRef = useRef(null);
  const listRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const q = query.trim();
  const ql = q.toLowerCase();
  const rows = useMemo(() => {
    const found = ql ? options.filter((o) => o.toLowerCase().includes(ql)) : options;
    const exact = options.some((o) => o.toLowerCase() === ql);
    return allowCustom && q && !exact ? [...found, { custom: q }] : found;
  }, [options, ql, q, allowCustom]);
  const text = (r) => (typeof r === "string" ? r : r.custom);

  useEffect(() => { if (disabled) setOpen(false); }, [disabled]);

  useEffect(() => {
    if (!open) return;
    searchRef.current?.focus({ preventScroll: true });
    listRef.current?.querySelector(".is-active")?.scrollIntoView({ block: "nearest" });
  }, [open, active, rows]);

  const openList = () => {
    if (disabled) return;
    setQuery("");
    setActive(Math.max(0, options.indexOf(value)));
    setOpen(true);
  };
  const closeList = (refocus) => {
    setOpen(false);
    setQuery("");
    if (refocus) btnRef.current?.focus();
  };
  const choose = (r) => { onChange(text(r)); closeList(true); };

  // leaving the whole control (not just moving between its button and search box) closes the list
  const onWrapBlur = (e) => {
    if (wrapRef.current?.contains(e.relatedTarget)) return;
    if (open) closeList(false);
    onBlur?.();
  };

  const onBtnKey = (e) => {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) { e.preventDefault(); openList(); }
  };
  const onSearchKey = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((i) => (rows.length ? (i + 1) % rows.length : 0)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((i) => (rows.length ? (i - 1 + rows.length) % rows.length : 0)); }
    else if (e.key === "Home") { e.preventDefault(); setActive(0); }
    else if (e.key === "End") { e.preventDefault(); setActive(Math.max(0, rows.length - 1)); }
    else if (e.key === "Enter") { e.preventDefault(); if (rows[active] !== undefined) choose(rows[active]); }
    else if (e.key === "Escape") { e.preventDefault(); closeList(true); }
    else if (e.key === "Tab") closeList(false);
  };

  return (
    <div className={`au-field${error ? " is-err" : ""}`}>
      <div className="au-field__top"><label htmlFor={id}>{label}</label></div>
      <div ref={wrapRef} className={`au-input gs-select gs-combo${open ? " is-open" : ""}`} onBlur={onWrapBlur}>
        <span className="au-input__icon" aria-hidden="true">{icon}</span>
        <button
          ref={btnRef} id={id} type="button" role="combobox" data-field={field} disabled={disabled}
          aria-haspopup="listbox" aria-expanded={open} aria-controls={open ? listId : undefined}
          aria-invalid={error ? true : undefined} aria-describedby={msgId}
          className={`gs-combo__btn${value ? "" : " is-empty"}`}
          onClick={() => (open ? closeList(false) : openList())} onKeyDown={onBtnKey}
        >{value || placeholder}</button>
        <ChevronDown size={18} className="gs-select__chev" aria-hidden="true" />
        {open && (
          <div className="gs-combo__panel" onMouseDown={(e) => { if (e.target.tagName !== "INPUT") e.preventDefault(); }}>
            <div className="gs-combo__search">
              <Search size={16} aria-hidden="true" />
              <input
                ref={searchRef} type="text" name={`${id}-filter`} value={query} placeholder={searchPlaceholder}
                autoComplete="off" autoCorrect="off" spellCheck={false} aria-label={searchPlaceholder}
                aria-controls={listId} aria-activedescendant={rows[active] !== undefined ? `${listId}-${active}` : undefined}
                onChange={(e) => { setQuery(e.target.value); setActive(0); }} onKeyDown={onSearchKey}
              />
            </div>
            <ul ref={listRef} id={listId} role="listbox" className="gs-combo__list">
              {rows.length ? rows.map((r, i) => {
                const t = text(r);
                const custom = typeof r !== "string";
                return (
                  <li
                    key={custom ? `custom-${t}` : t} id={`${listId}-${i}`} role="option" aria-selected={!custom && t === value}
                    className={`${i === active ? "is-active " : ""}${!custom && t === value ? "is-selected " : ""}${custom ? "is-custom" : ""}`.trim()}
                    onMouseDown={(e) => { e.preventDefault(); choose(r); }} onMouseEnter={() => setActive(i)}
                  >{custom ? <>Use “{t}”</> : t}</li>
                );
              }) : <li className="gs-combo__empty" role="presentation">{emptyText}</li>}
            </ul>
          </div>
        )}
      </div>
      <Msg id={msgId} error={error} hint={hint} />
    </div>
  );
}

/* Dropdown for picking one or more options, each with its own icon and description. Same field style as <Select>;
   the list stays open while you tick items, and the picks show as removable chips under the field.
   options: [value, title, description][]   icons: value -> lucide icon   field: name used to focus the control on error. */
export function MultiSelect({ id, label, icon, placeholder, options, icons = {}, selected, onToggle, onBlur, error, hint, field, noun = "selected" }) {
  const msgId = error || hint ? `${id}-msg` : undefined;
  const listId = useId();
  const wrapRef = useRef(null);
  const btnRef = useRef(null);
  const listRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const titleOf = (v) => options.find(([k]) => k === v)?.[1] || v;
  const count = selected.length;

  useEffect(() => {
    if (open) listRef.current?.querySelector(".is-active")?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const openList = () => { setActive(Math.max(0, options.findIndex(([k]) => selected.includes(k)))); setOpen(true); };
  const closeList = (refocus) => { setOpen(false); if (refocus) btnRef.current?.focus(); };
  const onWrapBlur = (e) => {
    if (wrapRef.current?.contains(e.relatedTarget)) return;
    if (open) setOpen(false);
    onBlur?.();
  };
  const onKey = (e) => {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) { e.preventDefault(); openList(); }
      return;
    }
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((i) => (i + 1) % options.length); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((i) => (i - 1 + options.length) % options.length); }
    else if (e.key === "Home") { e.preventDefault(); setActive(0); }
    else if (e.key === "End") { e.preventDefault(); setActive(options.length - 1); }
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggle(options[active][0]); }
    else if (e.key === "Escape") { e.preventDefault(); closeList(true); }
    else if (e.key === "Tab") setOpen(false);
  };

  return (
    <div className={`au-field${error ? " is-err" : ""}`}>
      <div className="au-field__top">
        <label htmlFor={id}>{label}</label>
        <span className="gs-count" aria-live="polite">{count} {noun}</span>
      </div>
      <div ref={wrapRef} className={`au-input gs-select gs-combo gs-multi${open ? " is-open" : ""}`} onBlur={onWrapBlur}>
        <span className="au-input__icon" aria-hidden="true">{icon}</span>
        <button
          ref={btnRef} id={id} type="button" role="combobox" data-field={field}
          aria-haspopup="listbox" aria-expanded={open} aria-controls={open ? listId : undefined}
          aria-invalid={error ? true : undefined} aria-describedby={msgId}
          className={`gs-combo__btn${count ? "" : " is-empty"}`}
          onClick={() => (open ? closeList(false) : openList())} onKeyDown={onKey}
        >{count === 0 ? placeholder : count === 1 ? titleOf(selected[0]) : `${count} services selected`}</button>
        <ChevronDown size={18} className="gs-select__chev" aria-hidden="true" />
        {open && (
          <div className="gs-combo__panel" onMouseDown={(e) => e.preventDefault()}>
            <ul ref={listRef} id={listId} role="listbox" aria-multiselectable="true" className="gs-combo__list gs-multi__list">
              {options.map(([val, title, desc], i) => {
                const on = selected.includes(val);
                const OptIcon = icons[val] || FileText;
                return (
                  <li
                    key={val} id={`${listId}-${i}`} role="option" aria-selected={on}
                    className={`gs-multi__row${i === active ? " is-active" : ""}${on ? " is-on" : ""}`}
                    onClick={() => onToggle(val)} onMouseEnter={() => setActive(i)}
                  >
                    <span className="gs-multi__icon" aria-hidden="true"><OptIcon size={18} /></span>
                    <span className="gs-multi__text"><b>{title}</b>{desc && <small>{desc}</small>}</span>
                    <span className="gs-multi__check" aria-hidden="true">{on && <Check size={13} strokeWidth={3} />}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      {count > 0 && (
        <ul className="gs-chips" aria-label="Selected services">
          {selected.map((v) => {
            const ChipIcon = icons[v] || FileText;
            return (
              <li key={v}>
                <ChipIcon size={14} aria-hidden="true" />
                <span>{titleOf(v)}</span>
                <button type="button" aria-label={`Remove ${titleOf(v)}`} onClick={() => onToggle(v)}><X size={13} aria-hidden="true" /></button>
              </li>
            );
          })}
        </ul>
      )}
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
