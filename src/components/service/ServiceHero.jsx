import { Fragment } from "react";
import { Link } from "react-router-dom";
import { /* Star, */ ShieldCheck } from "lucide-react";
import useInView from "../../hooks/useInView";
// import { TRUST } from "../../data/site"; // re-enable with the Trustpilot rating below

/* Hero used at the top of every service page.
   crumbs: [{ label, to? }]  (last item is the current page, no link)
   actions: buttons row    visual: animated card on the right
   guaranteeHref: optional "#id" for the "Learn about our guarantee" link */
export default function ServiceHero({ crumbs = [], title, subtitle, actions, visual, guaranteeHref, showTrust = true }) {
  const [ref, inView] = useInView();

  return (
    <section className="svc-hero" ref={ref}>
      <span className="svc-blob svc-blob--a" aria-hidden="true" />
      <span className="svc-blob svc-blob--b" aria-hidden="true" />
      <div className="container">
        {crumbs.length > 0 && (
          <nav className="svc-crumbs" aria-label="Breadcrumb">
            {crumbs.map((c, i) => (
              <Fragment key={c.label}>
                {i > 0 && " / "}
                {c.to ? <Link to={c.to}>{c.label}</Link> : <span>{c.label}</span>}
              </Fragment>
            ))}
          </nav>
        )}
        <div className="svc-hero__grid">
          <div className={`svc-hero__content ${inView ? "is-in" : ""}`}>
            <h1 className="svc-hero__title" style={{ "--d": 0 }}>{title}</h1>
            {subtitle && <p className="svc-hero__subtitle" style={{ "--d": 1 }}>{subtitle}</p>}
            {actions && <div className="svc-hero__actions" style={{ "--d": 2 }}>{actions}</div>}
            {showTrust && (
              <div className="svc-hero__trust" style={{ "--d": 3 }}>
                {/* Trustpilot rating hidden for now
                <strong>{TRUST.label}</strong>
                <span className="svc-hero__stars">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#2fa24f" color="#2fa24f" />)}
                </span>
                <a className="svc-hero__badge" href={TRUST.url} target="_blank" rel="noopener noreferrer">
                  <Star size={12} fill="#ffffff" color="#ffffff" /> Trustpilot
                </a>
                <span className="svc-hero__sep" />
                */}
                {guaranteeHref && (
                  <a href={guaranteeHref} className="svc-link"><ShieldCheck size={16} /> Learn about our guarantee</a>
                )}
              </div>
            )}
          </div>
          {visual && <div className={`svc-hero__visual ${inView ? "is-in" : ""}`}>{visual}</div>}
        </div>
      </div>
    </section>
  );
}
