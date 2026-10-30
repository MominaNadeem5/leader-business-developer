import { Fragment } from "react";
import {
  FileSignature, PenLine, BadgeCheck, Handshake, PieChart, ShieldCheck, Lock, EyeOff, ClipboardCheck, Wallet, Check,
  Receipt, Send, FileText, Download, Layers, Sparkles, Landmark, Building2, Users, Store, Newspaper, Hash, CalendarCheck, Bell,
} from "lucide-react";
import useTick from "../../hooks/useTick";
import { Sample, Chip } from "../merchant/MerchantVisual";
import "../merchant/Merchant.css";
import "./FormsVisual.css";

/* Tick-driven scenes freeze on their finished frame when the user prefers less motion. */
const REDUCED = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/* Animated hero visuals for the Legal Form pages. They sit in the same .mv-stage/.mv-card
   frame as every other service hero; only the animation inside differs per page.
   Most motion is pure CSS (see FormsVisual.css); all names and amounts are samples. */

/* ---------- Business Contract: clauses highlight one by one, then a signature is drawn ---------- */
const CLAUSES = ["Parties", "Scope of work", "Payment terms", "Liability", "Termination"];
export function ContractVisual() {
  return (
    <div className="mv-stage">
      <div className="mv-card fv-contract">
        <div className="mv-top"><FileSignature size={13} /> <small>Business contract</small><Sample /></div>
        <ol className="fv-contract__clauses">
          {CLAUSES.map((c, i) => (
            <li key={c} style={{ "--i": i }}>
              <em>{i + 1}</em>
              <span><b>{c}</b><i /><i /></span>
              <u><Check size={11} strokeWidth={3} /></u>
            </li>
          ))}
        </ol>
        <div className="fv-contract__sign">
          <svg viewBox="0 0 150 40" aria-hidden="true">
            <path pathLength="1" d="M4 30 C12 6 22 4 20 26 S30 38 40 18 S54 8 52 28 S66 34 76 16 C82 8 88 26 96 22 S112 10 122 22 S136 30 146 18" />
          </svg>
          <span>Authorized signature</span>
          <strong className="fv-contract__seal"><BadgeCheck size={14} /> Signed</strong>
        </div>
      </div>
      <Chip pos="tr" icon={<PenLine size={14} />}>11 key clauses</Chip>
      <Chip pos="bl" icon={<Check size={14} />} tone="green">Ready to sign</Chip>
    </div>
  );
}

/* ---------- Partnership: two partners connect, ownership donut splits ---------- */
export function PartnershipVisual() {
  return (
    <div className="mv-stage">
      <div className="mv-card fv-partner">
        <div className="mv-top"><Handshake size={13} /> <small>Partnership</small><Sample /></div>
        <div className="fv-partner__link">
          <span className="fv-partner__p fv-partner__p--a">A</span>
          <svg viewBox="0 0 160 30" aria-hidden="true"><path d="M8 15 Q80 -8 152 15" /><circle r="4" /></svg>
          <span className="fv-partner__hand"><Handshake size={18} /></span>
          <span className="fv-partner__p fv-partner__p--b">B</span>
        </div>
        <div className="fv-partner__split">
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r="38" className="track" />
            <circle cx="50" cy="50" r="38" pathLength="100" className="seg seg--a" />
            <circle cx="50" cy="50" r="38" pathLength="100" className="seg seg--b" />
          </svg>
          <div className="fv-partner__center"><PieChart size={14} /><b>100%</b><small>ownership</small></div>
        </div>
        <ul className="fv-partner__legend">
          <li><i className="a" /> Alex <b>60%</b></li>
          <li><i className="b" /> Sam <b>40%</b></li>
        </ul>
      </div>
      <Chip pos="tr" icon={<PieChart size={14} />}>Profit split agreed</Chip>
      <Chip pos="bl" icon={<Check size={14} />} tone="green">Signed by both</Chip>
    </div>
  );
}

/* ---------- NDA: lines get redacted, a shield draws and the lock snaps shut ---------- */
export function NdaVisual() {
  return (
    <div className="mv-stage">
      <div className="mv-card fv-nda">
        <div className="mv-top"><ShieldCheck size={13} /> <small>Non-disclosure</small><Sample /></div>
        <div className="fv-nda__doc">
          <span className="fv-nda__stamp">Confidential</span>
          {[86, 70, 92, 64, 80, 54].map((w, i) => <p key={i} style={{ "--w": `${w}%`, "--i": i }}><i /></p>)}
          <div className="fv-nda__guard" aria-hidden="true">
            <svg viewBox="0 0 80 92">
              <path className="shield" pathLength="1" d="M40 4 L74 16 V44 C74 66 58 80 40 88 C22 80 6 66 6 44 V16 Z" />
              <path className="shackle" d="M30 46 V38 a10 10 0 0 1 20 0 V46" />
              <rect className="body" x="25" y="45" width="30" height="24" rx="5" />
              <circle className="hole" cx="40" cy="57" r="3" />
            </svg>
          </div>
        </div>
        <div className="fv-nda__status"><span className="off"><EyeOff size={13} /> Sharing…</span><span className="on"><Lock size={13} /> Protected</span></div>
      </div>
      <Chip pos="tr" icon={<EyeOff size={14} />}>Mutual or one-way</Chip>
      <Chip pos="bl" icon={<Lock size={14} />} tone="green">Information secured</Chip>
    </div>
  );
}

/* ---------- Service Agreement: deliverables tick off, payment milestones fill ---------- */
const DELIVERABLES = ["Kickoff & project plan", "Homepage design", "Full site build", "Launch & handover"];
const MILESTONES = [["Deposit", 2400], ["M1", 1200], ["M2", 1200], ["Final", 1200]];
export function ServiceVisual() {
  const tick = useTick(1100);
  const step = REDUCED ? 4 : tick % 7;
  const done = Math.min(step, DELIVERABLES.length);
  const paid = MILESTONES.slice(0, done).reduce((a, [, v]) => a + v, 0);
  return (
    <div className="mv-stage">
      <div className="mv-card fv-service">
        <div className="mv-top"><ClipboardCheck size={13} /> <small>Project deliverables</small><Sample /></div>
        <ul className="fv-service__list">
          {DELIVERABLES.map((d, i) => (
            <li key={d} className={i < done ? "is-done" : i === done ? "is-next" : ""}>
              <span><Check size={12} strokeWidth={3} /></span>{d}
            </li>
          ))}
        </ul>
        <div className="fv-service__pay">
          <div className="fv-service__head"><Wallet size={13} /><small>Payment milestones</small><b key={paid}>${paid.toLocaleString()}<em> / $6,000</em></b></div>
          <div className="fv-service__bar">
            {MILESTONES.map(([m, v], i) => <span key={m} style={{ flex: v }} className={i < done ? "is-on" : ""}><i /></span>)}
          </div>
          <div className="fv-service__labels">{MILESTONES.map(([m, v]) => <small key={m} style={{ flex: v }}>{m}</small>)}</div>
        </div>
      </div>
      <Chip pos="tr" icon={<ClipboardCheck size={14} />}>Scope agreed</Chip>
      <Chip pos="bl" icon={<Wallet size={14} />} tone="green">Paid on milestones</Chip>
    </div>
  );
}

/* ---------- Invoice & Receipt: line items appear, total adds up, PAID stamp lands ---------- */
const LINES = [["Website design", 2400], ["Logo refresh", 650], ["Revision hours", 255]];
export function InvoiceVisual() {
  const tick = useTick(750);
  const phase = REDUCED ? 7 : tick % 11;
  const shown = Math.min(Math.max(phase, 0), LINES.length);
  const sub = LINES.slice(0, shown).reduce((a, [, v]) => a + v, 0);
  const total = Math.round(sub * 1.0825 * 100) / 100;
  const paid = phase >= 6 && phase < 10;
  return (
    <div className="mv-stage">
      <div className={`mv-card fv-invoice ${phase === 10 ? "is-reset" : ""}`}>
        <div className="fv-invoice__top">
          <div><b>INVOICE</b><small>#INV-2026-014</small></div>
          <Sample />
        </div>
        <ul className="fv-invoice__lines">
          {LINES.map(([d, v], i) => (
            <li key={d} className={i < shown ? "is-on" : ""}><span>{d}</span><b>${v.toLocaleString()}</b></li>
          ))}
        </ul>
        <div className="fv-invoice__sum">
          <span>Tax 8.25%</span><b>${(total - sub).toFixed(2)}</b>
          <strong>Total</strong><strong key={total} className="fv-invoice__total">${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
        </div>
        {paid && <span className="fv-invoice__stamp">PAID</span>}
      </div>
      <Chip pos="tr" icon={<Send size={14} />}>{paid ? "Receipt sent" : "Invoice sent"}</Chip>
      <Chip pos="bl" icon={<Receipt size={14} />} tone="green">Tax-ready records</Chip>
    </div>
  );
}

/* ---------- View All: document cards cycling through a floating stack ---------- */
const DOCS = [
  [FileSignature, "Business Contract"],
  [Handshake, "Partnership Agreement"],
  [ShieldCheck, "NDA"],
  [ClipboardCheck, "Service Agreement"],
  [Receipt, "Invoice & Receipt"],
];
export function FormsHubVisual() {
  return (
    <div className="mv-stage">
      <div className="fv-hub" aria-hidden="true">
        <div className="fv-hub__orbit"><i /><i /><i /></div>
        {DOCS.map(([Icon, title], i) => (
          <div key={title} className="fv-hub__card" style={{ "--i": i }}>
            <div className="fv-hub__head"><span><Icon size={16} /></span><b>{title}</b></div>
            <i /><i /><i />
            <div className="fv-hub__foot"><FileText size={11} /> Free template <Download size={11} /></div>
          </div>
        ))}
      </div>
      <Chip pos="tr" icon={<Layers size={14} />}>5 free templates</Chip>
      <Chip pos="bl" icon={<Sparkles size={14} />} tone="green">Fill in & download</Chip>
    </div>
  );
}

/* ---------- Articles of Organization: fields type in, filing moves through review, state seal lands ---------- */
const AOO_FIELDS = [["LLC name", "Bright Leaf Bakery LLC"], ["Registered agent", "Leader Registered Agent"], ["Principal office", "120 Main St, Austin"], ["Management", "Member-managed"]];
export function ArticlesVisual() {
  return (
    <div className="mv-stage">
      <div className="mv-card fv-aoo">
        <div className="mv-top"><Landmark size={13} /> <small>Articles of Organization</small><Sample /></div>
        <div className="fv-aoo__fields">
          {AOO_FIELDS.map(([k, v], i) => (
            <div key={k} style={{ "--i": i }}><small>{k}</small><b><span>{v}</span></b></div>
          ))}
        </div>
        <ol className="fv-aoo__track">
          {["Submitted", "In review", "Approved"].map((s, i) => <li key={s} style={{ "--i": i }}><span />{s}</li>)}
        </ol>
        <span className="fv-aoo__seal" aria-hidden="true"><Landmark size={18} /><b>FILED</b><small>Secretary of State</small></span>
      </div>
      <Chip pos="tr" icon={<Building2 size={14} />}>LLC formed</Chip>
      <Chip pos="bl" icon={<Check size={14} />} tone="green">State approved</Chip>
    </div>
  );
}

/* ---------- Operating Agreement: LLC org chart grows, ownership badges appear, management type toggles ---------- */
const MEMBERS = [["JL", "50%"], ["SC", "30%"], ["AR", "20%"]];
export function OperatingVisual() {
  return (
    <div className="mv-stage">
      <div className="mv-card fv-oa">
        <div className="mv-top"><Users size={13} /> <small>Operating agreement</small><Sample /></div>
        <div className="fv-oa__root"><Building2 size={15} /> Bright Leaf LLC</div>
        <svg className="fv-oa__lines" viewBox="0 0 240 46" aria-hidden="true">
          <path pathLength="1" d="M120 0 V18 H40 V46" /><path pathLength="1" d="M120 18 V46" /><path pathLength="1" d="M120 18 H200 V46" />
        </svg>
        <div className="fv-oa__members">
          {MEMBERS.map(([n, p], i) => <div key={n} style={{ "--i": i }}><span>{n}</span><em>{p}</em></div>)}
        </div>
        <div className="fv-oa__mode"><span className="a"><Users size={12} /> Member-managed</span><span className="b"><BadgeCheck size={12} /> Manager-managed</span></div>
      </div>
      <Chip pos="tr" icon={<PieChart size={14} />}>100% allocated</Chip>
      <Chip pos="bl" icon={<ShieldCheck size={14} />} tone="green">Liability shield</Chip>
    </div>
  );
}

/* ---------- DBA: the storefront sign flips from legal name to trade name ---------- */
export function DbaVisual() {
  return (
    <div className="mv-stage">
      <div className="mv-card fv-dba">
        <div className="fv-dba__awning" aria-hidden="true">{Array.from({ length: 8 }, (_, i) => <i key={i} />)}</div>
        <div className="fv-dba__sign">
          <div className="fv-dba__flip">
            <div className="front"><small>Legal name</small><b>Jordan Lee</b></div>
            <div className="back"><small>Doing business as</small><b>Sunrise Bakery</b></div>
          </div>
        </div>
        <div className="fv-dba__shop" aria-hidden="true"><span /><span className="door" /><span /></div>
        <div className="fv-dba__foot"><span className="fv-dba__tag">d/b/a</span><small>Registered trade name</small><Sample /></div>
      </div>
      <Chip pos="tr" icon={<Newspaper size={14} />}>Published notice</Chip>
      <Chip pos="bl" icon={<Store size={14} />} tone="green">Open for business</Chip>
    </div>
  );
}

/* ---------- EIN (SS-4): form lines fill, then the nine EIN digits roll into place ---------- */
const EIN_DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export function EinVisual() {
  return (
    <div className="mv-stage">
      <div className="mv-card fv-ein">
        <div className="mv-top"><Hash size={13} /> <small>Form SS-4</small><Sample /></div>
        <ul className="fv-ein__lines">
          {[["1", "Legal name"], ["7a", "Responsible party"], ["9a", "Type of entity"], ["10", "Reason for applying"]].map(([n, l], i) => (
            <li key={n} style={{ "--i": i }}><em>{n}</em><small>{l}</small><i /></li>
          ))}
        </ul>
        <div className="fv-ein__out">
          <small>Your EIN</small>
          <div className="fv-ein__digits" aria-label="Sample EIN 12-3456789">
            {EIN_DIGITS.map((d, i) => (
              <Fragment key={i}>
                {i === 2 && <i className="fv-ein__dash">–</i>}
                <span style={{ "--d": d, "--i": i }}><span>{Array.from({ length: 10 }, (_, k) => <b key={k}>{k}</b>)}</span></span>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
      <Chip pos="tr" icon={<FileText size={14} />}>IRS Form SS-4</Chip>
      <Chip pos="bl" icon={<BadgeCheck size={14} />} tone="green">EIN assigned</Chip>
    </div>
  );
}

/* ---------- Annual Report: due date circled, countdown runs, status turns to good standing ---------- */
export function AnnualVisual() {
  const tick = useTick(450);
  const phase = REDUCED ? 16 : tick % 18;
  const days = Math.max(0, 30 - phase * 3);
  const filed = phase >= 11;
  return (
    <div className="mv-stage">
      <div className="mv-card fv-ar">
        <div className="mv-top"><CalendarCheck size={13} /> <small>Annual report · May</small><Sample /></div>
        <div className="fv-ar__cal">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <b key={i}>{d}</b>)}
          {Array.from({ length: 28 }, (_, i) => <span key={i} className={i === 14 ? "due" : ""}>{i + 1}</span>)}
        </div>
        <div className={`fv-ar__status ${filed ? "is-ok" : days <= 9 ? "is-warn" : ""}`}>
          <span className="ring" style={{ "--p": filed ? 1 : 1 - days / 30 }}><svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="15" /><circle cx="18" cy="18" r="15" pathLength="1" /></svg>{filed ? <Check size={14} /> : <b key={days}>{days}</b>}</span>
          <div><strong>{filed ? "Filed: good standing" : `${days} days until due`}</strong><small>{filed ? "Next report due next May" : "Report, fee and agent details"}</small></div>
        </div>
      </div>
      <Chip pos="tr" icon={<Bell size={14} />}>Reminder set</Chip>
      <Chip pos="bl" icon={<BadgeCheck size={14} />} tone="green">Good standing</Chip>
    </div>
  );
}
