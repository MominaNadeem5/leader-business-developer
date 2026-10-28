import { ArrowUp } from "lucide-react";

/* Footnotes + legal disclaimer + back-to-top at the end of a service page.
   footnotes: strings or JSX   disclaimer: string or JSX */
export default function ServiceFooter({ footnotes = [], disclaimer }) {
  return (
    <section className="svc-foot">
      <div className="container">
        {footnotes.map((f, i) => <p key={i} className="svc-footnote">{f}</p>)}
        {disclaimer && <p className="svc-disclaimer">{disclaimer}</p>}
        <div className="svc-top-wrap">
          <button
            type="button"
            className="svc-top-btn"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
