import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";

/* Tick-off checklist with a progress ring.
   items: string[]   cta: { label, to } shown at 100% */
export default function Checklist({ items, title = "What you'll need", doneTitle = "You're ready to apply", cta }) {
  const [done, setDone] = useState([]);
  const toggle = (i) => setDone((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]));
  const pct = Math.round((done.length / items.length) * 100);

  return (
    <div className="svc-check">
      <div className="svc-check__side">
        <div className="svc-check__ring" style={{ "--svc-p": pct }}><span>{pct}%</span></div>
        <h3>{pct === 100 ? doneTitle : title}</h3>
        <p>{done.length} of {items.length} items ready. Tap to tick them off.</p>
        {pct === 100 && cta && (
          <Link to={cta.to} className="svc-gold-btn">{cta.label} <ArrowRight size={16} /></Link>
        )}
      </div>
      <ul className="svc-check__list">
        {items.map((t, i) => (
          <li key={t}>
            <button type="button" className={done.includes(i) ? "is-done" : ""} onClick={() => toggle(i)} aria-pressed={done.includes(i)}>
              <span className="svc-check__box"><Check size={14} /></span>{t}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
