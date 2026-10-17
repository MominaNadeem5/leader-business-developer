/* Page section with an optional centered title + subtitle.
   tone: "white" | "gray" | "soft"  */
export default function Section({ id, tone = "white", title, subtitle, narrow = false, className = "", children }) {
  return (
    <section id={id} className={`svc-section svc-section--${tone} ${className}`.trim()}>
      <div className={`container ${narrow ? "svc-narrow" : ""}`}>
        {title && <h2 className="svc-title">{title}</h2>}
        {subtitle && <p className="svc-subtitle">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
