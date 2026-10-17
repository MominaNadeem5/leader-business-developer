import { ArrowRight, ChevronDown } from "lucide-react";
import Button from "../common/Button";
import Reveal from "./Reveal";

/* Slim "Ready to start?" strip with one action.
   to   = route  -> green button with arrow
   href = "#id"  -> gold in-page link with chevron (e.g. jump to pricing) */
export default function CtaBand({ title, label, to, href }) {
  return (
    <section className="svc-section svc-section--soft">
      <div className="container">
        <Reveal className="svc-band">
          <h2>{title}</h2>
          {href ? (
            <a href={href} className="svc-gold-btn">{label} <ChevronDown size={16} /></a>
          ) : (
            <Button to={to}>{label} <ArrowRight size={18} /></Button>
          )}
        </Reveal>
      </div>
    </section>
  );
}
