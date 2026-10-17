import Reveal from "./Reveal";

/* Numbered steps joined by a line that draws itself on scroll.
   steps: [{ icon, title, text }] */
export default function StepPath({ steps }) {
  return (
    <Reveal className="svc-path" style={{ "--n": steps.length }}>
      {steps.map((s, i) => (
        <div key={s.title} className="svc-path__step" style={{ "--i": i }}>
          <span className="svc-path__icon">{s.icon}</span>
          <b>Step {i + 1}</b>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </div>
      ))}
    </Reveal>
  );
}
