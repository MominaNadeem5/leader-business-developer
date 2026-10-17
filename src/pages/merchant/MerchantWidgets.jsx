import Reveal from "../../components/service/Reveal";
import { TiltCard } from "./MerchantPage";

/* Compact grid of payment methods / use cases. items: [{ icon, title, text }] */
export function MethodGrid({ items, cols = 3 }) {
  return (
    <Reveal className="mc-methods" style={{ "--cols": cols }}>
      {items.map((m, i) => (
        <TiltCard key={m.title} className="mc-method" style={{ "--i": i }}>
          <span className="mc-method__icon">{m.icon}</span>
          <div><strong>{m.title}</strong><small>{m.text}</small></div>
        </TiltCard>
      ))}
    </Reveal>
  );
}
