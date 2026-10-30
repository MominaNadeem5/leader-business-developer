import { Check } from "lucide-react";
import Button from "../common/Button";

/* Pricing card. features: string[]  cta: { label, to } */
export default function PackageCard({ name, price, fees, tagline, badge, featured = false, cta, features = [] }) {
  return (
    <article className={`svc-package ${featured ? "is-featured" : ""}`}>
      {badge && <span className="svc-package__badge">{badge}</span>}
      <h3 className="svc-package__name">{name}</h3>
      <div className="svc-package__price">
        <span className="svc-package__amount">{price}</span>
        {fees && <span className="svc-package__fees">{fees}</span>}
      </div>
      {tagline && <p className="svc-package__tagline">{tagline}</p>}
      {cta && (
        <Button variant={featured ? "primary" : "outline"} to={cta.to} className="svc-package__btn">
          {cta.label}
        </Button>
      )}
      <ul className="svc-package__list">
        {features.map((f) => <li key={f}><Check size={16} />{f}</li>)}
      </ul>
    </article>
  );
}
