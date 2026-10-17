/* Footnotes + legal disclaimer + back-to-top at the end of a service page.
   footnotes: strings or JSX   disclaimer: string or JSX */
export default function ServiceFooter({ footnotes = [], disclaimer }) {
  return (
    <section className="svc-foot">
      <div className="container">
        {footnotes.map((f, i) => <p key={i} className="svc-footnote">{f}</p>)}
        {disclaimer && <p className="svc-disclaimer">{disclaimer}</p>}
        <div className="svc-center">
          <button type="button" className="svc-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Back to top ↑
          </button>
        </div>
      </div>
    </section>
  );
}
