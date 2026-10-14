import { useEffect, useState } from "react";
import "./FormationCard.css";

const STAGES = [
  { label: "Order", title: "Your order is confirmed.", now: "Order review", next: "State filing", needs: "Nothing", badge: "FORMING" },
  { label: "Filing", title: "We're filing your LLC with the state.", now: "State filing", next: "State approval", needs: "Nothing", badge: "FORMING" },
  { label: "Approval", title: "Waiting for state approval.", now: "State approval", next: "EIN", needs: "Nothing", badge: "FORMING" },
  { label: "EIN", title: "Your EIN application is in progress.", now: "EIN application", next: "Operating Agreement", needs: "Nothing", badge: "FORMING" },
  { label: "Agreement", title: "Your Operating Agreement is in your documents.", now: "Operating Agreement", next: "Bank documents", needs: "Nothing", badge: "FORMING" },
  { label: "Done", title: "Your LLC is ready to go.", now: "All set", next: "Open bank account", needs: "Nothing", badge: "ACTIVE" },
];

export default function FormationCard() {
  const [active, setActive] = useState(4); // starts at "Agreement" like the screenshot

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % STAGES.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  const stage = STAGES[active];
  const done = stage.badge === "ACTIVE";

  return (
    <div className="llc-hero__card llc-flow">
      <div className="llc-flow__inner">
        <div className="llc-flow__top">
          <div key={`t-${active}`} className="llc-flow__headline">
            <span className="llc-flow__eyebrow">
              Stage {active + 1} of {STAGES.length} · Drafted for you
            </span>
            <h4 className="llc-flow__title">{stage.title}</h4>
          </div>
          <span className={`llc-flow__badge ${done ? "is-done" : ""}`}>
            <i className="llc-flow__dot" />
            {stage.badge}
          </span>
        </div>

        <div className="llc-flow__steps">
          {STAGES.map((s, i) => {
            const state = i < active ? "is-complete" : i === active ? "is-current" : "";
            return (
              <div key={s.label} className={`llc-flow__step ${state}`}>
                <div className="llc-flow__bar">
                  <span className="llc-flow__fill" />
                </div>
                <span className="llc-flow__label">{s.label}</span>
              </div>
            );
          })}
        </div>

        <div key={`m-${active}`} className="llc-flow__meta">
          <div>
            <span className="llc-flow__meta-label">Now</span>
            <strong>{stage.now}</strong>
          </div>
          <div>
            <span className="llc-flow__meta-label">Next</span>
            <strong>{stage.next}</strong>
          </div>
          <div>
            <span className="llc-flow__meta-label">Needs you</span>
            <strong>{stage.needs}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}