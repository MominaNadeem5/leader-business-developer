import { Quote } from "lucide-react";
import Reveal from "./Reveal";
import Section from "./Section";

/* items: [{ quote, name, role }]. Only add real customer reviews. */
export default function Testimonials({ items, title = "How we've helped our customers" }) {
  return (
    <Section title={title}>
      <Reveal className="svc-testimonials">
        {items.map((t, i) => (
          <figure key={t.name} className="svc-testimonial" style={{ "--i": i }}>
            <Quote size={28} />
            <blockquote>{t.quote}</blockquote>
            <figcaption><strong>{t.name}</strong><span>{t.role}</span></figcaption>
          </figure>
        ))}
      </Reveal>
    </Section>
  );
}
