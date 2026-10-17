import { useEffect, useState } from "react";
import {
  ArrowDownLeft, ArrowUpRight, Wifi, Check, Send, FileCheck, CalendarCheck, Clock,
  CreditCard, Smartphone, Landmark, Link2, Sparkles, ShieldCheck,
} from "lucide-react";

/* Animated "floating dashboard" mockups for the banking hero.
   All numbers and names are samples, labelled as illustrations. */

function useTick(ms) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), ms);
    return () => clearInterval(id);
  }, [ms]);
  return tick;
}

const money = (n) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/* ---------- account dashboard ---------- */
const DEFAULT_TXS = [
  { name: "Client payment", amount: 2400, icon: <ArrowDownLeft size={14} /> },
  { name: "Software subscription", amount: -89, icon: <ArrowUpRight size={14} /> },
  { name: "Marketplace payout", amount: 1260, icon: <ArrowDownLeft size={14} /> },
  { name: "Supplier invoice", amount: -730, icon: <ArrowUpRight size={14} /> },
  { name: "Card refund", amount: 45, icon: <ArrowDownLeft size={14} /> },
];

function Dashboard({ label = "Operating account", start = 48250, txs = DEFAULT_TXS, accounts = ["Checking", "Savings", "Tax reserve"] }) {
  const tick = useTick(2300);
  const applied = txs.slice(0, (tick % txs.length) + 1).reduce((sum, t) => sum + t.amount, 0);
  const recent = [0, 1, 2].map((k) => txs[(tick - k + txs.length * 10) % txs.length]);
  const active = tick % accounts.length;

  return (
    <div className="bv-card bv-dash">
      <div className="bv-dash__top">
        <span className="bv-dot" /> <small>{label}</small>
        <em><ShieldCheck size={12} /> Sample</em>
      </div>
      <strong className="bv-dash__balance" key={applied}>{money(start + applied)}</strong>
      <svg className="bv-chart" viewBox="0 0 240 70" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="bvArea" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#2fa24f" stopOpacity=".35" />
            <stop offset="100%" stopColor="#2fa24f" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path className="bv-chart__area" d="M0 60 L30 52 L60 55 L90 40 L120 44 L150 30 L180 34 L210 18 L240 12 L240 70 L0 70 Z" />
        <path className="bv-chart__line" d="M0 60 L30 52 L60 55 L90 40 L120 44 L150 30 L180 34 L210 18 L240 12" />
        <circle className="bv-chart__dot" cx="240" cy="12" r="4" />
      </svg>
      <div className="bv-dash__tabs">
        {accounts.map((a, i) => <span key={a} className={i === active ? "is-on" : ""}>{a}</span>)}
      </div>
      <ul className="bv-dash__txs">
        {recent.map((t, i) => (
          <li key={`${tick}-${i}`} className={i === 0 ? "is-new" : ""}>
            <span className={`bv-tx-icon ${t.amount > 0 ? "is-in" : "is-out"}`}>{t.icon}</span>
            <b>{t.name}</b>
            <em className={t.amount > 0 ? "is-in" : ""}>{t.amount > 0 ? "+" : "−"}{money(Math.abs(t.amount))}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- debit card + spend controls ---------- */
function CardView({ name = "BRIGHTLEAF LLC", spend = [["Software", 62], ["Travel", 38], ["Supplies", 74]], alerts = ["Card used at Office Supply Co.", "Monthly limit 60% used", "New card issued to Sam"] }) {
  const tick = useTick(2600);
  return (
    <div className="bv-card bv-cardview">
      <div className="bv-debit">
        <div className="bv-debit__top"><span className="bv-debit__chip" /><Wifi size={18} /></div>
        <span className="bv-debit__num">•••• •••• •••• 4821</span>
        <div className="bv-debit__bottom"><b>{name}</b><em>DEBIT</em></div>
      </div>
      <div className="bv-toast" key={tick}><CreditCard size={14} /> {alerts[tick % alerts.length]}</div>
      <ul className="bv-spend">
        {spend.map(([k, v], i) => (
          <li key={k} style={{ "--w": `${v}%`, "--i": i }}><span>{k}</span><b><i /></b></li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- global transfers ---------- */
const CURRENCIES = ["USD", "EUR", "GBP", "CAD", "AED", "JPY"];
function GlobalView({ route = ["USD", "EUR"], title = "Wire to supplier", steps = ["Initiated", "In transit", "Delivered"] }) {
  const tick = useTick(1400);
  const stage = tick % (steps.length + 1);
  return (
    <div className="bv-card bv-global">
      <div className="bv-globe" aria-hidden="true">
        <span className="bv-globe__sphere" />
        <div className="bv-globe__orbit">
          {CURRENCIES.map((c, i) => <span key={c} style={{ "--i": i, "--n": CURRENCIES.length }}><b>{c}</b></span>)}
        </div>
      </div>
      <div className="bv-transfer">
        <div className="bv-transfer__head">
          <Send size={14} /> <b>{title}</b>
          <span className="bv-transfer__route">{route[0]} <i /> {route[1]}</span>
        </div>
        <div className="bv-transfer__bar"><b style={{ width: `${(Math.min(stage, steps.length) / steps.length) * 100}%` }} /></div>
        <ol className="bv-transfer__steps">
          {steps.map((s, i) => <li key={s} className={i < stage ? "is-done" : ""}>{i < stage ? <Check size={11} /> : <i />}{s}</li>)}
        </ol>
      </div>
    </div>
  );
}

/* ---------- application tracker ---------- */
function ChecklistView({ title = "Account application", steps = ["Business details", "Formation documents", "Ownership information", "ID verification", "Ready for bank review"], docs = ["EIN letter", "Articles", "Owner ID"] }) {
  const tick = useTick(1100);
  const done = tick % (steps.length + 3);
  const shown = Math.min(done, steps.length);
  return (
    <div className="bv-card bv-check">
      <div className="bv-check__head">
        <span className="bv-check__icon"><FileCheck size={18} /></span>
        <div><b>{title}</b><small>{shown}/{steps.length} complete</small></div>
      </div>
      <div className="bv-check__bar"><b style={{ width: `${(shown / steps.length) * 100}%` }} /></div>
      <ul className="bv-check__steps">
        {steps.map((s, i) => (
          <li key={s} className={i < shown ? "is-done" : i === shown ? "is-active" : ""}>
            <span>{i < shown ? <Check size={12} /> : i + 1}</span>{s}
          </li>
        ))}
      </ul>
      <div className="bv-check__docs">
        {docs.map((d, i) => <span key={d} style={{ "--i": i }}><FileCheck size={12} /> {d}</span>)}
      </div>
    </div>
  );
}

/* ---------- payments terminal ---------- */
const METHODS = [
  { icon: <CreditCard size={16} />, label: "Card" },
  { icon: <Smartphone size={16} />, label: "Wallet" },
  { icon: <Landmark size={16} />, label: "ACH" },
  { icon: <Link2 size={16} />, label: "Pay link" },
];
function PaymentsView({ amount = 128, feed = [["Online order #1042", 64], ["Invoice paid", 1250], ["In-store sale", 18.5], ["Subscription", 29]] }) {
  const tick = useTick(1800);
  const method = tick % METHODS.length;
  const items = [0, 1, 2].map((k) => feed[(tick - k + feed.length * 10) % feed.length]);
  return (
    <div className="bv-card bv-pay">
      <div className="bv-pay__screen">
        <small>Amount due</small>
        <strong>{money(amount)}</strong>
        <span className="bv-pay__tap" aria-hidden="true"><i /><i /><i /><Wifi size={22} /></span>
        <em key={tick}>Paid with {METHODS[method].label}</em>
      </div>
      <div className="bv-pay__methods">
        {METHODS.map((m, i) => <span key={m.label} className={i === method ? "is-on" : ""}>{m.icon}{m.label}</span>)}
      </div>
      <ul className="bv-pay__feed">
        {items.map(([n, v], i) => (
          <li key={`${tick}-${i}`} className={i === 0 ? "is-new" : ""}><ArrowDownLeft size={13} /><b>{n}</b><em>+{money(v)}</em></li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- account comparison ---------- */
function CompareView({ options = ["Traditional", "Online", "Credit union"], metrics = ["Branches", "Low fees", "Integrations", "Cash deposits"] }) {
  const tick = useTick(2400);
  const best = tick % options.length;
  const score = (o, m) => 30 + (((o + 1) * 37 + (m + 1) * 23 + tick * 11) % 65);
  return (
    <div className="bv-card bv-compare">
      <div className="bv-compare__head"><Sparkles size={14} /> <b>Account match</b><small>Sample comparison</small></div>
      <div className="bv-compare__cols">
        {options.map((o, oi) => (
          <div key={o} className={`bv-compare__col ${oi === best ? "is-best" : ""}`}>
            {oi === best && <span className="bv-compare__badge" key={tick}>Best fit</span>}
            <div className="bv-compare__bars">
              {metrics.map((m, mi) => <i key={m} style={{ "--h": `${score(oi, mi)}%`, "--i": mi }} title={m} />)}
            </div>
            <b>{o}</b>
          </div>
        ))}
      </div>
      <div className="bv-compare__legend">{metrics.map((m, i) => <span key={m} style={{ "--i": i }}><i />{m}</span>)}</div>
    </div>
  );
}

/* ---------- consultation booking ---------- */
function CalendarView({ heading = "Book a consultation", agenda = ["Your business and goals", "Account types that fit", "Documents to prepare", "Next steps"] }) {
  const tick = useTick(1500);
  const days = [...Array(28)].map((_, i) => i + 1);
  const picked = [9, 14, 17, 22][Math.floor(tick / 4) % 4];
  const stage = tick % 4;
  return (
    <div className="bv-card bv-cal">
      <div className="bv-cal__head"><CalendarCheck size={16} /> <b>{heading}</b></div>
      <div className="bv-cal__grid">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <small key={i}>{d}</small>)}
        {days.map((d) => <span key={d} className={d === picked ? "is-picked" : (d % 7 === 6 || d % 7 === 0) ? "is-off" : ""}>{d}</span>)}
      </div>
      <div className="bv-cal__slots">
        {["10:00", "13:30", "16:00"].map((s, i) => <span key={s} className={stage >= 1 && i === 1 ? "is-on" : ""}><Clock size={11} /> {s}</span>)}
      </div>
      {stage >= 2 ? (
        <ul className="bv-cal__agenda" key={picked}>
          {agenda.map((a, i) => <li key={a} style={{ "--i": i }}><Check size={12} /> {a}</li>)}
        </ul>
      ) : <p className="bv-cal__hint">Pick a time that suits you</p>}
    </div>
  );
}

const VIEWS = { dashboard: Dashboard, card: CardView, global: GlobalView, checklist: ChecklistView, payments: PaymentsView, compare: CompareView, calendar: CalendarView };

/* chips: [{ icon, label }] small badges that float around the card */
export default function BankVisual({ variant = "dashboard", chips = [], ...props }) {
  const View = VIEWS[variant] || Dashboard;
  return (
    <div className="bv">
      <View {...props} />
      {chips.map((c, i) => (
        <span key={c.label} className={`bv-chip bv-chip--${i}`}>{c.icon || <Check size={13} />}{c.label}</span>
      ))}
      <p className="bv-note">Illustration with sample data.</p>
    </div>
  );
}

