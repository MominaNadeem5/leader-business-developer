import { Link } from "react-router-dom";
import { ArrowRight, Info } from "lucide-react";
import ServiceHero from "../../components/service/ServiceHero";
import { RES_DISCLAIMER } from "./resources";

export { Field, Segmented, FaqBlock } from "../forms/FormBits";

/* The site-standard service banner. Only text and the right-side visual change per page.
   hub: { path, label } for the middle crumb; omit `label` on hub pages. */
export function ResHero({ hub, label, title, subtitle, primary, secondary, visual }) {
  const crumbs = [{ label: "Home", to: "/" }, ...(label ? [{ label: hub.label, to: hub.path }, { label }] : [{ label: hub.label }])];
  const btn = (p) => (p.to
    ? <Link to={p.to} className="btn btn--primary btn--md">{p.label} <ArrowRight size={18} /></Link>
    : <a href={p.href} className="btn btn--primary btn--md">{p.label} <ArrowRight size={18} /></a>);
  return (
    <ServiceHero
      crumbs={crumbs}
      title={title}
      subtitle={subtitle}
      showTrust={false}
      actions={<>
        {btn(primary)}
        {secondary && (secondary.to
          ? <Link to={secondary.to} className="svc-ghost-btn">{secondary.label}</Link>
          : <a href={secondary.href} className="svc-ghost-btn">{secondary.label}</a>)}
      </>}
      visual={visual}
    />
  );
}

/* Short disclaimer note shown near tools and guides. */
export function ResNote({ children }) {
  return <p className="lf-note"><Info size={16} /><span>{children || RES_DISCLAIMER}</span></p>;
}

/* Internal links to sibling pages. variant: "chips" | "list" | "tiles" (styles from Forms.css) */
export function RelatedLinks({ items, current, title, variant = "tiles", hub }) {
  return (
    <div className={`lf-related lf-related--${variant}`}>
      <h3>{title}</h3>
      <div>
        {items.filter((x) => x.path !== current).map((x) => (
          <Link key={x.path} to={x.path}>
            <x.icon size={variant === "chips" ? 15 : 20} />
            <span><strong>{x.title}</strong>{variant !== "chips" && <small>{x.short}</small>}</span>
            {variant !== "chips" && <ArrowRight size={15} />}
          </Link>
        ))}
        {hub && <Link to={hub.path} className="lf-related__all">View all {hub.label.toLowerCase()} <ArrowRight size={14} /></Link>}
      </div>
    </div>
  );
}
