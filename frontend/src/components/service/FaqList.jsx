import { ChevronDown } from "lucide-react";

/* Accordion FAQ. faqs: [question, answer][]   tone: "gray" | "white" */
export default function FaqList({ faqs, title = "Frequently asked questions", tone = "gray" }) {
  return (
    <section className={`svc-faq svc-faq--${tone}`}>
      <div className="container svc-narrow">
        <h2 className="svc-title">{title}</h2>
        <div className="svc-faq__list">
          {faqs.map(([q, a]) => (
            <details key={q} className="svc-faq__item">
              <summary><span>{q}</span><ChevronDown size={20} /></summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
