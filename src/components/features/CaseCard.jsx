import { useEffect, useState } from "react";
import {
  Check,
  Building2,
  FileText,
  Landmark,
  Globe,
  CreditCard,
} from "lucide-react";
import "./CaseCard.css";

/* ---------- Timeline (seconds) ----------
   Har row ek ek karke aati hai, uske sath uska popup.
   Sab ke baad progress bar 0 -> 75% chalta hai.            */
const T0 = 0.7; // pehli row kab aaye
const GAP = 1; // do rows ke beech gap
const PSTART = T0 + 3 * GAP + 1.2; // progress bar kab shuru ho
const PDUR = 2; // progress bar kitni der chale
const TARGET = 75;

const steps = [
  { label: "Company formed", status: "Done" },
  { label: "EIN issued", status: "Done" },
  { label: "Bank application", status: "Done" },
  { label: "Payments and website", status: "Next" },
];

// row = kis row ke sath ye popup aayega, order = same row ke andar kaun pehle
const chips = [
  { text: "Company formed", Icon: Building2, cls: "c0", row: 0 },
  { text: "EIN issued", Icon: FileText, cls: "c1", row: 1 },
  { text: "Bank account opened", Icon: Landmark, cls: "c2", row: 2 },
  { text: "Stripe connected", Icon: CreditCard, cls: "c3", row: 3, order: 0 },
  { text: "Website live", Icon: Globe, cls: "c4", row: 3, order: 1 },
];

export default function CaseCard({ active = true }) {
  const [pct, setPct] = useState(0);

  // progress bar + number ek sath chalte hain
  useEffect(() => {
    if (!active) {
      setPct(0);
      return;
    }
    let raf;
    let start = null;
    const tick = (now) => {
      if (start === null) start = now;
      const elapsed = (now - start) / 1000 - PSTART;
      const p = Math.min(Math.max(elapsed / PDUR, 0), 1);
      const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      setPct(Math.round(eased * TARGET));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  return (
    <div
      className={`case-stage ${active ? "is-play" : ""}`}
      style={{ "--t0": `${T0}s`, "--gap": `${GAP}s` }}
    >
      <div className="case-box">
        {/* Main Case Card */}
        <div className="case">
          <div className="case__top">
            <div>
              <div className="case__no">Case LBD-1048</div>
              <h3>GrowSoft LLC</h3>
            </div>

            <span className="case__pill">
              <span className="pill-dot" />
              In progress
            </span>
          </div>

          {/* Steps */}
          <div className="steps">
            {steps.map((s, i) => {
              const next = s.status === "Next";

              return (
                <div
                  key={s.label}
                  className={`case__row ${next ? "is-next" : ""}`}
                  style={{ "--i": i }}
                >
                  <span className={`case__dot ${next ? "is-empty" : "is-done"}`}>
                    {!next && <Check size={14} strokeWidth={3} />}
                  </span>

                  <span className="step-label">{s.label}</span>

                  <span className="case__status">{s.status}</span>
                </div>
              );
            })}
          </div>

          {/* Progress */}
          <div className="case__progress">
            <div className="case__progress-label">
              <span>Progress</span>
              <span>{pct}%</span>
            </div>
            <div className="case__bar">
              <i style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>

        {/* Floating popups (row ke sath sync) */}
        {chips.map(({ text, Icon, cls, row, order = 0 }) => (
          <div
            key={text}
            className={`chip ${cls}`}
            style={{ "--i": row, "--o": order }}
          >
            <b>
              <Icon size={16} strokeWidth={2.3} />
            </b>

            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}