import CountUp from "./CountUp";

/* Stacked stat rows with a counting number.
   stats: [{ to, prefix?, suffix?, label, text }] */
export default function StatStack({ stats }) {
  return (
    <div className="svc-stats">
      {stats.map((s) => (
        <div key={s.label} className="svc-stat">
          <strong><CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} /></strong>
          <span>{s.label}</span>
          <small>{s.text}</small>
        </div>
      ))}
    </div>
  );
}
