import { CalendarClock } from "lucide-react";
import Reveal from "./Reveal";

/* Horizontal milestones joined by a line that draws on scroll.
   items: [{ when, title, value?, text, icon? }]   value = big highlighted figure */
export default function Timeline({ items }) {
  return (
    <Reveal className="svc-timeline" style={{ "--n": items.length }}>
      {items.map((t, i) => (
        <div key={t.title} className="svc-timeline__item" style={{ "--i": i }}>
          <span className="svc-timeline__dot">{t.icon || <CalendarClock size={18} />}</span>
          <em>{t.when}</em>
          <h3>{t.title}</h3>
          {t.value && <strong>{t.value}</strong>}
          <p>{t.text}</p>
        </div>
      ))}
    </Reveal>
  );
}
