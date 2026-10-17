import useTick from "../../hooks/useTick";
import {
  Check, Wifi, ShieldCheck, Bell, Store, Gauge, FileText, Keyboard, Receipt, Package, Lock,
} from "lucide-react";

/* Animated "floating dashboard" mockups for merchant page heroes.
   Every number, name and card is a sample, and each card is labelled as one. */

const money = (n, cur = "$") => `${cur}${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export function Sample() {
  return <em className="mv-sample"><ShieldCheck size={11} /> Sample</em>;
}

/* Small floating badge around the main card. pos: tl | tr | bl | br */
export function Chip({ pos, icon, children, tone }) {
  return <div className={`mv-chip mv-chip--${pos} ${tone ? `is-${tone}` : ""}`}>{icon}<span>{children}</span></div>;
}

/* ---------- POS terminal ---------- */
const POS_AMOUNTS = [18.4, 42.0, 7.25, 63.9];
export function PosTerminal() {
  const tick = useTick(2600);
  const phase = tick % 3; // 0 = waiting, 1 = reading, 2 = approved
  const amount = POS_AMOUNTS[Math.floor(tick / 3) % POS_AMOUNTS.length];
  return (
    <div className="mv-stage">
      <div className="mv-pos">
        <div className="mv-pos__screen">
          <Sample />
          <small>Total due</small>
          <strong>{money(amount)}</strong>
          <div className={`mv-pos__state is-${phase}`} key={tick}>
            {phase === 0 && <><Wifi size={16} /> Tap, insert or swipe</>}
            {phase === 1 && <><span className="mv-spin" /> Processing…</>}
            {phase === 2 && <><Check size={16} /> Approved</>}
          </div>
        </div>
        <div className="mv-pos__keys" aria-hidden="true">{[...Array(12)].map((_, i) => <span key={i} />)}</div>
        <div className={`mv-waves ${phase === 0 ? "is-on" : ""}`} aria-hidden="true"><i /><i /><i /></div>
        {phase === 2 && <div className="mv-receipt" key={`r${tick}`}><Receipt size={12} /> Receipt sent</div>}
      </div>
      <Chip pos="tr" icon={<Store size={14} />}>Front counter</Chip>
      <Chip pos="bl" icon={<Package size={14} />} tone="green">Inventory synced</Chip>
    </div>
  );
}

/* ---------- underwriting readiness ---------- */
const RISK_ITEMS = ["Business documents", "Processing history", "Refund & billing policy", "Website compliance", "Chargeback plan"];
export function RiskMeter() {
  const tick = useTick(1500);
  const done = (tick % (RISK_ITEMS.length + 2)) ;
  const pct = Math.min(done, RISK_ITEMS.length) / RISK_ITEMS.length;
  return (
    <div className="mv-stage">
      <div className="mv-card mv-risk">
        <div className="mv-top"><Gauge size={13} /> <small>Application readiness</small><Sample /></div>
        <div className="mv-gauge" style={{ "--p": pct }}>
          <svg viewBox="0 0 120 66" aria-hidden="true">
            <path d="M10 60 A50 50 0 0 1 110 60" className="mv-gauge__track" />
            <path d="M10 60 A50 50 0 0 1 110 60" className="mv-gauge__fill" pathLength="1" />
          </svg>
          <strong>{Math.round(pct * 100)}%</strong>
        </div>
        <ul className="mv-ticks">
          {RISK_ITEMS.map((r, i) => <li key={r} className={i < done ? "is-on" : ""}><span><Check size={11} /></span>{r}</li>)}
        </ul>
      </div>
      <Chip pos="tr" icon={<FileText size={14} />}>Underwriting file</Chip>
      <Chip pos="bl" icon={<ShieldCheck size={14} />} tone="green">Policies in place</Chip>
    </div>
  );
}

/* ---------- virtual terminal ---------- */
const VT_FIELDS = [["Card number", "4242 4242 4242 4242"], ["Expiry", "12 / 29"], ["Amount", "$275.00"], ["Invoice #", "INV-1042"]];
export function VirtualTerminalVisual() {
  const tick = useTick(1100);
  const filled = tick % (VT_FIELDS.length + 3);
  const done = filled > VT_FIELDS.length;
  return (
    <div className="mv-stage">
      <div className="mv-card mv-vt">
        <div className="mv-browser"><i /><i /><i /><span><Lock size={10} /> virtual terminal</span></div>
        <div className="mv-top"><Keyboard size={13} /> <small>Keyed payment</small><Sample /></div>
        {VT_FIELDS.map(([k, v], i) => (
          <div key={k} className={`mv-field ${i < filled ? "is-on" : ""}`}><small>{k}</small><b>{i < filled ? v : ""}</b></div>
        ))}
        <button type="button" tabIndex={-1} className={`mv-pay ${done ? "is-paid" : ""}`}>
          {done ? <><Check size={16} /> Approved</> : "Charge card"}
        </button>
      </div>
      <Chip pos="tr" icon={<Bell size={14} />}>Phone order</Chip>
      <Chip pos="bl" icon={<Receipt size={14} />} tone="green">Email receipt</Chip>
    </div>
  );
}

