import {
  Check, Lock, CreditCard, Wallet, Landmark, ShoppingCart, Package, Bell, Code2, Webhook, Zap,
  SlidersHorizontal, Plug, Store, ShieldCheck, RefreshCw,
} from "lucide-react";
import useTick from "../../hooks/useTick";
import { Sample, Chip } from "../merchant/MerchantVisual";

/* Animated hero mockups for the Payment Integration pages.
   Every brand, number and order shown is a sample, and each card is labelled as one. */

/* ---------- overview: hub with connected services ---------- */
const HUB_NODES = [
  { label: "Checkout", icon: SlidersHorizontal, x: 50, y: 10 },
  { label: "Provider", icon: Plug, x: 90, y: 50 },
  { label: "Store", icon: ShoppingCart, x: 50, y: 90 },
  { label: "API", icon: Code2, x: 10, y: 50 },
];
export function HubVisual() {
  const tick = useTick(1400);
  const active = tick % HUB_NODES.length;
  return (
    <div className="mv-stage">
      <div className="pi-hub">
        <svg viewBox="0 0 100 100" className="pi-hub__lines" aria-hidden="true">
          {HUB_NODES.map((n, i) => (
            <line key={n.label} x1="50" y1="50" x2={n.x} y2={n.y} className={i === active ? "is-on" : ""} />
          ))}
        </svg>
        <div className="pi-hub__core"><Zap size={22} /><small>Your business</small></div>
        {HUB_NODES.map((n, i) => (
          <div key={n.label} className={`pi-hub__node ${i === active ? "is-on" : ""}`} style={{ left: `${n.x}%`, top: `${n.y}%` }}>
            <n.icon size={18} /><span>{n.label}</span>
          </div>
        ))}
        <div className="pi-hub__sample"><Sample /></div>
      </div>
      <Chip pos="tr" icon={<RefreshCw size={14} />}>Everything synced</Chip>
      <Chip pos="bl" icon={<ShieldCheck size={14} />} tone="green">Secure by design</Chip>
    </div>
  );
}

/* ---------- gateway: branded checkout cycling themes ---------- */
const THEMES = [
  { name: "Forest", color: "#2fa24f" },
  { name: "Ocean", color: "#2563eb" },
  { name: "Sunset", color: "#ea580c" },
  { name: "Plum", color: "#7c3aed" },
];
export function GatewayVisual() {
  const tick = useTick(1800);
  const theme = THEMES[tick % THEMES.length];
  const method = tick % 3;
  return (
    <div className="mv-stage">
      <div className="mv-card pi-checkout" style={{ "--brand": theme.color }}>
        <div className="mv-browser"><i /><i /><i /><span><Lock size={10} /> checkout</span></div>
        <div className="pi-checkout__brand"><span className="pi-logo" /> <b>Your Brand</b><Sample /></div>
        <div className="pi-checkout__methods">
          {[[CreditCard, "Card"], [Wallet, "Wallet"], [Landmark, "Bank"]].map(([Icon, label], i) => (
            <span key={label} className={i === method ? "is-on" : ""}><Icon size={14} />{label}</span>
          ))}
        </div>
        <div className="mv-field is-on"><small>Email</small><b>alex@example.com</b></div>
        <div className="pi-checkout__total"><span>Total</span><strong>$129.00</strong></div>
        <button type="button" tabIndex={-1} className="pi-checkout__pay" key={theme.name}>Pay securely</button>
      </div>
      <Chip pos="tr" icon={<SlidersHorizontal size={14} />}>Theme: {theme.name}</Chip>
      <Chip pos="bl" icon={<ShieldCheck size={14} />} tone="green">Hosted card fields</Chip>
    </div>
  );
}

/* ---------- provider setup: connect three providers ---------- */
const PROVIDERS = [
  { name: "Stripe", tone: "#635bff" },
  { name: "Square", tone: "#111827" },
  { name: "PayPal", tone: "#003087" },
];
const SETUP_STEPS = ["Account verified", "Payouts linked", "Webhooks on", "Test payment passed"];
export function ProviderVisual() {
  const tick = useTick(900);
  const round = Math.floor(tick / (SETUP_STEPS.length + 2));
  const step = tick % (SETUP_STEPS.length + 2);
  const p = PROVIDERS[round % PROVIDERS.length];
  return (
    <div className="mv-stage">
      <div className="mv-card pi-provider">
        <div className="mv-top"><Plug size={13} /> <small>Provider setup</small><Sample /></div>
        <div className="pi-provider__tabs">
          {PROVIDERS.map((x) => (
            <span key={x.name} className={x.name === p.name ? "is-on" : ""} style={{ "--tone": x.tone }}>{x.name}</span>
          ))}
        </div>
        <ul className="mv-ticks">
          {SETUP_STEPS.map((s, i) => <li key={s} className={i < step ? "is-on" : ""}><span><Check size={11} /></span>{s}</li>)}
        </ul>
        <div className={`pi-provider__status ${step > SETUP_STEPS.length ? "is-live" : ""}`}>
          {step > SETUP_STEPS.length ? <><Check size={14} /> {p.name} connected</> : <><span className="mv-spin" /> Configuring {p.name}…</>}
        </div>
      </div>
      <Chip pos="tr" icon={<Store size={14} />}>Online + in person</Chip>
      <Chip pos="bl" icon={<Landmark size={14} />} tone="green">Payouts to your bank</Chip>
    </div>
  );
}

/* ---------- store integration: orders flowing in ---------- */
const ORDERS = [
  ["#1041", "Canvas tote", "$34.00"],
  ["#1042", "Ceramic mug ×2", "$28.00"],
  ["#1043", "Linen apron", "$46.00"],
  ["#1044", "Gift card", "$50.00"],
];
export function StoreVisual() {
  const tick = useTick(1600);
  const shown = [0, 1, 2].map((k) => ORDERS[(tick + k) % ORDERS.length]);
  return (
    <div className="mv-stage">
      <div className="mv-card pi-store">
        <div className="mv-top"><ShoppingCart size={13} /> <small>Store orders</small><Sample /></div>
        <div className="pi-store__sync">
          <span>Storefront</span><i className="pi-flow" /><span>Payments</span><i className="pi-flow" /><span>Inventory</span>
        </div>
        <ul className="pi-store__orders" key={tick}>
          {shown.map(([id, item, amt], i) => (
            <li key={id} style={{ "--i": i }}>
              <Package size={15} />
              <div><b>{id}</b><small>{item}</small></div>
              <strong>{amt}</strong>
              <em><Check size={11} /> Paid</em>
            </li>
          ))}
        </ul>
      </div>
      <Chip pos="tr" icon={<Bell size={14} />}>New order</Chip>
      <Chip pos="bl" icon={<RefreshCw size={14} />} tone="green">Stock updated</Chip>
    </div>
  );
}

/* ---------- API: request + response terminal ---------- */
const API_LINES = [
  ["k", "POST"], ["s", " /v1/payments"],
  ["n", "\n{"],
  ["n", "\n  "], ["p", "\"amount\""], ["n", ": "], ["v", "4900"], ["n", ","],
  ["n", "\n  "], ["p", "\"currency\""], ["n", ": "], ["s", "\"usd\""], ["n", ","],
  ["n", "\n  "], ["p", "\"order_id\""], ["n", ": "], ["s", "\"A-1043\""],
  ["n", "\n}"],
];
export function ApiVisual() {
  const tick = useTick(260);
  const total = API_LINES.length;
  const cycle = total + 12;
  const shown = Math.min(tick % cycle, total);
  const done = tick % cycle > total + 1;
  return (
    <div className="mv-stage">
      <div className="pi-term">
        <div className="pi-term__bar"><i /><i /><i /><span>request.http</span><Sample /></div>
        <pre className="pi-term__code">
          {API_LINES.slice(0, shown).map(([t, s], i) => <span key={i} className={`t-${t}`}>{s}</span>)}
          {!done && <span className="pi-caret" />}
        </pre>
        <div className={`pi-term__res ${done ? "is-on" : ""}`}>
          <span className="pi-badge">200 OK</span>
          <code>{"{ \"status\": \"succeeded\" }"}</code>
        </div>
      </div>
      <Chip pos="tr" icon={<Webhook size={14} />}>payment.succeeded</Chip>
      <Chip pos="bl" icon={<Lock size={14} />} tone="green">Signed &amp; verified</Chip>
    </div>
  );
}
