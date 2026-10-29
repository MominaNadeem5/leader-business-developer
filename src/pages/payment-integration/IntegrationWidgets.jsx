import { useState } from "react";
import {
  Check, Lock, CreditCard, Wallet, Landmark, ShieldCheck, Play, RotateCcw, Smartphone,
} from "lucide-react";
import Reveal from "../../components/service/Reveal";
import { TiltCard } from "../merchant/MerchantPage";

/* ---------- live checkout builder (gateway page) ---------- */
const SWATCHES = ["#2fa24f", "#000000", "#2fa24f", "#2fa24f", "#2fa24f", "#2fa24f"];
const SHAPES = [["Rounded", 12], ["Pill", 999], ["Square", 4]];
const METHODS = [
  ["card", "Cards", CreditCard],
  ["wallet", "Digital wallets", Smartphone],
  ["bank", "Bank transfer", Landmark],
  ["later", "Pay later", Wallet],
];

export function CheckoutBuilder() {
  const [color, setColor] = useState(SWATCHES[0]);
  const [radius, setRadius] = useState(12);
  const [methods, setMethods] = useState(["card", "wallet"]);
  const [trust, setTrust] = useState(true);
  const [paid, setPaid] = useState(false);

  const toggle = (id) => {
    setPaid(false);
    setMethods((m) => (m.includes(id) ? (m.length > 1 ? m.filter((x) => x !== id) : m) : [...m, id]));
  };

  return (
    <Reveal className="pi-builder" style={{ "--brand": color, "--r": `${radius}px` }}>
      <div className="pi-builder__controls">
        <fieldset>
          <legend>Brand color</legend>
          <div className="pi-swatches">
            {SWATCHES.map((c) => (
              <button key={c} type="button" aria-label={`Use color ${c}`} aria-pressed={c === color}
                className={c === color ? "is-on" : ""} style={{ background: c }} onClick={() => { setColor(c); setPaid(false); }}>
                {c === color && <Check size={14} />}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>Button shape</legend>
          <div className="pi-seg">
            {SHAPES.map(([label, r]) => (
              <button key={label} type="button" aria-pressed={r === radius} className={r === radius ? "is-on" : ""} onClick={() => setRadius(r)}>{label}</button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>Payment methods</legend>
          <div className="pi-toggles">
            {METHODS.map(([id, label, Icon]) => (
              <button key={id} type="button" aria-pressed={methods.includes(id)} className={methods.includes(id) ? "is-on" : ""} onClick={() => toggle(id)}>
                <Icon size={16} />{label}<span className="pi-switch" />
              </button>
            ))}
          </div>
        </fieldset>
        <label className="pi-check">
          <input type="checkbox" checked={trust} onChange={(e) => setTrust(e.target.checked)} />
          <span className="pi-switch" /> Show security reassurance
        </label>
      </div>

      <div className="pi-builder__preview">
        <div className="pi-preview">
          <div className="mv-browser"><i /><i /><i /><span><Lock size={10} /> yourbrand.com/checkout</span></div>
          <div className="pi-preview__head"><span className="pi-logo" /><b>Your Brand</b><em className="mv-sample">Preview</em></div>
          <div className="pi-preview__line"><span>Starter plan</span><span>$49.00</span></div>
          <div className="pi-preview__line is-total"><span>Total</span><strong>$49.00</strong></div>
          <div className="pi-preview__methods">
            {METHODS.filter(([id]) => methods.includes(id)).map(([id, label, Icon]) => (
              <span key={id}><Icon size={14} />{label}</span>
            ))}
          </div>
          <div className="pi-preview__field" />
          <div className="pi-preview__field is-half" />
          <button type="button" className={`pi-preview__pay ${paid ? "is-paid" : ""}`} onClick={() => setPaid((p) => !p)}>
            {paid ? <><Check size={16} /> Payment successful</> : "Pay $49.00"}
          </button>
          {trust && <p className="pi-preview__trust"><ShieldCheck size={13} /> Card details are encrypted and handled by your payment provider</p>}
        </div>
        <p className="mc-small">Try it: pick a color, shape and methods, then press the pay button. This is a design preview only, and no payment is taken.</p>
      </div>
    </Reveal>
  );
}

/* ---------- provider matcher (Stripe / Square / PayPal page) ---------- */
const NEEDS = [
  { id: "inperson", label: "Sell in person (counter, market, events)", s: { Stripe: 1, Square: 3, PayPal: 1 } },
  { id: "pos", label: "All-in-one POS with inventory and staff", s: { Stripe: 0, Square: 3, PayPal: 1 } },
  { id: "online", label: "Custom website or app checkout", s: { Stripe: 3, Square: 1, PayPal: 2 } },
  { id: "subs", label: "Subscriptions and recurring billing", s: { Stripe: 3, Square: 1, PayPal: 2 } },
  { id: "paypal", label: "Customers who like paying with PayPal or Venmo", s: { Stripe: 0, Square: 0, PayPal: 3 } },
  { id: "invoice", label: "Send invoices to clients", s: { Stripe: 2, Square: 2, PayPal: 2 } },
  { id: "global", label: "Sell to customers in other countries", s: { Stripe: 2, Square: 0, PayPal: 2 } },
];
const PROVIDER_NOTES = {
  Stripe: "Developer-friendly and flexible, popular for online checkouts, subscriptions and platforms.",
  Square: "Known for easy in-person selling, with POS hardware, inventory and team tools in one place.",
  PayPal: "A widely recognized checkout button that many shoppers already trust and have an account for.",
};

export function ProviderMatcher() {
  const [picked, setPicked] = useState(["online"]);
  const toggle = (id) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const scores = Object.keys(PROVIDER_NOTES).map((name) => {
    const max = picked.length * 3 || 1;
    const got = NEEDS.filter((n) => picked.includes(n.id)).reduce((a, n) => a + n.s[name], 0);
    return { name, pct: picked.length ? Math.round((got / max) * 100) : 0 };
  });
  const best = Math.max(...scores.map((s) => s.pct));

  return (
    <Reveal className="pi-matcher">
      <div className="pi-matcher__needs">
        <h3>What do you need?</h3>
        <p>Pick everything that applies.</p>
        {NEEDS.map((n, i) => (
          <button key={n.id} type="button" aria-pressed={picked.includes(n.id)} style={{ "--i": i }}
            className={`pi-need ${picked.includes(n.id) ? "is-on" : ""}`} onClick={() => toggle(n.id)}>
            <span className="pi-need__box"><Check size={13} /></span>{n.label}
          </button>
        ))}
      </div>
      <div className="pi-matcher__result" aria-live="polite">
        <h3>Your likely starting point</h3>
        {scores.map((s) => (
          <div key={s.name} className={`pi-fit ${picked.length && s.pct === best ? "is-best" : ""}`}>
            <div className="pi-fit__head">
              <strong>{s.name}</strong>
              {picked.length > 0 && s.pct === best && <em>Strong fit</em>}
              <span>{s.pct}%</span>
            </div>
            <div className="pi-fit__bar"><i style={{ width: `${s.pct}%` }} /></div>
            <small>{PROVIDER_NOTES[s.name]}</small>
          </div>
        ))}
        <p className="pi-matcher__note">
          {picked.length ? "A rough guide based on what each provider is generally known for. Many businesses use two, such as one for in-person sales and PayPal as an extra online option." : "Select at least one need to see a match."}
        </p>
      </div>
    </Reveal>
  );
}

/* ---------- API playground (API page) ---------- */
const SNIPPETS = {
  create: {
    label: "Create a payment",
    code: `// Server-side: never expose your secret key in the browser
const payment = await provider.payments.create({
  amount: 4900,            // in cents
  currency: "usd",
  customer: "cus_123",
  metadata: { order_id: "A-1043" },
  idempotencyKey: "order-A-1043",
});`,
    res: `{ "id": "pay_8xK2", "status": "requires_confirmation" }`,
  },
  webhook: {
    label: "Handle a webhook",
    code: `app.post("/webhooks/payments", (req, res) => {
  const event = verifySignature(req.rawBody, req.headers);
  if (event.type === "payment.succeeded") {
    markOrderPaid(event.data.metadata.order_id);
  }
  res.sendStatus(200); // acknowledge quickly
});`,
    res: `200 OK  ·  order A-1043 marked paid`,
  },
  refund: {
    label: "Issue a refund",
    code: `const refund = await provider.refunds.create({
  payment: "pay_8xK2",
  amount: 1500,            // partial refund
  reason: "requested_by_customer",
});`,
    res: `{ "id": "re_41Q", "status": "succeeded", "amount": 1500 }`,
  },
};

export function ApiPlayground() {
  const [tab, setTab] = useState("create");
  const [state, setState] = useState("idle"); // idle | running | done
  const s = SNIPPETS[tab];

  const run = () => {
    setState("running");
    setTimeout(() => setState("done"), 900);
  };

  return (
    <Reveal className="pi-play">
      <div className="pi-play__tabs" role="tablist">
        {Object.entries(SNIPPETS).map(([id, x]) => (
          <button key={id} type="button" role="tab" aria-selected={tab === id} className={tab === id ? "is-on" : ""}
            onClick={() => { setTab(id); setState("idle"); }}>{x.label}</button>
        ))}
      </div>
      <div className="pi-term pi-term--big">
        <div className="pi-term__bar"><i /><i /><i /><span>illustrative example</span></div>
        <pre className="pi-term__code" key={tab}>{s.code}</pre>
        <div className="pi-play__run">
          <button type="button" onClick={run} disabled={state === "running"}>
            {state === "done" ? <><RotateCcw size={14} /> Run again</> : state === "running" ? <><span className="mv-spin" /> Running…</> : <><Play size={14} /> Run sample</>}
          </button>
          <code className={state === "done" ? "is-on" : ""}>{state === "done" ? s.res : "Response will appear here"}</code>
        </div>
      </div>
      <p className="mc-small">Simplified pseudocode to show the shape of an integration. Real code follows your provider's official SDK and documentation.</p>
    </Reveal>
  );
}

/* ---------- platform split (Shopify / WooCommerce page) ---------- */
export function PlatformSplit({ items }) {
  return (
    <Reveal className="pi-platforms">
      {items.map((p, i) => (
        <TiltCard as="article" key={p.name} className="pi-platform" style={{ "--i": i, "--tone": p.tone }}>
          <span className="pi-platform__icon">{p.icon}</span>
          <h3>{p.name}</h3>
          <p className="mc-option__best"><b>Best for:</b> {p.best}</p>
          <p>{p.text}</p>
          <ul>{p.points.map((x) => <li key={x}><Check size={15} />{x}</li>)}</ul>
        </TiltCard>
      ))}
    </Reveal>
  );
}
