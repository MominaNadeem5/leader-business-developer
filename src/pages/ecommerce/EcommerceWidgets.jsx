import { useState } from "react";
import { Check, Package, AlertTriangle } from "lucide-react";
import Reveal from "../../components/service/Reveal";

/* ---------- listing quality checker (product listing page) ---------- */
const LISTING_ITEMS = [
  { id: "title", label: "Keyword-rich, readable product title", pts: 20 },
  { id: "photos", label: "5+ high-quality photos, including lifestyle shots", pts: 20 },
  { id: "desc", label: "Benefit-led description with scannable bullets", pts: 15 },
  { id: "specs", label: "Complete specs: size, material, weight, care", pts: 10 },
  { id: "variants", label: "Variants grouped under one product", pts: 10 },
  { id: "gtin", label: "GTIN / UPC and unique SKU", pts: 10 },
  { id: "alt", label: "Image alt text and meta description", pts: 10 },
  { id: "reviews", label: "Reviews or social proof shown", pts: 5 },
];

export function ListingScore() {
  const [on, setOn] = useState(["title", "photos"]);
  const toggle = (id) => setOn((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]));
  const score = LISTING_ITEMS.filter((i) => on.includes(i.id)).reduce((a, i) => a + i.pts, 0);
  const verdict = score >= 85 ? "Excellent: ready to rank and convert" : score >= 60 ? "Good: a few gaps to close" : "Needs work: shoppers may bounce";

  return (
    <Reveal className="ec-tool">
      <div className="ec-tool__panel">
        <h3>Score a product listing</h3>
        <p>Tick what your current listing already has.</p>
        {LISTING_ITEMS.map((i, n) => (
          <button key={i.id} type="button" aria-pressed={on.includes(i.id)} style={{ "--i": n }}
            className={`ec-need ${on.includes(i.id) ? "is-on" : ""}`} onClick={() => toggle(i.id)}>
            <span className="ec-need__box"><Check size={13} /></span>{i.label}<em>+{i.pts}</em>
          </button>
        ))}
      </div>
      <div className="ec-tool__result" aria-live="polite">
        <div className="ec-ring" style={{ "--p": score / 100 }}>
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r="52" className="ec-ring__track" />
            <circle cx="60" cy="60" r="52" className="ec-ring__fill" pathLength="1" />
          </svg>
          <strong>{score}<small>/100</small></strong>
        </div>
        <h3>{verdict}</h3>
        <p>Strong listings help shoppers decide faster and give search engines and marketplaces the details they need to show your products.</p>
      </div>
    </Reveal>
  );
}

/* ---------- reorder point calculator (inventory page) ---------- */
function Slider({ label, value, min, max, step = 1, unit, onChange }) {
  return (
    <label className="ec-slider">
      <span>{label}<b>{value}{unit}</b></span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))}
        style={{ "--fill": `${((value - min) / (max - min)) * 100}%` }} />
    </label>
  );
}

export function ReorderCalculator() {
  const [daily, setDaily] = useState(12);
  const [lead, setLead] = useState(10);
  const [safety, setSafety] = useState(5);
  const [stock, setStock] = useState(200);
  const safetyUnits = daily * safety;
  const reorder = daily * lead + safetyUnits;
  const daysLeft = Math.floor((stock - reorder) / daily);
  const urgent = stock <= reorder;

  return (
    <Reveal className="ec-tool">
      <div className="ec-tool__panel">
        <h3>Reorder point calculator</h3>
        <p>Move the sliders to match one of your products.</p>
        <Slider label="Average units sold per day" value={daily} min={1} max={60} onChange={setDaily} />
        <Slider label="Supplier lead time" value={lead} min={1} max={60} unit=" days" onChange={setLead} />
        <Slider label="Safety stock" value={safety} min={0} max={30} unit=" days" onChange={setSafety} />
        <Slider label="Units in stock now" value={stock} min={0} max={1500} step={10} onChange={setStock} />
      </div>
      <div className="ec-tool__result" aria-live="polite">
        <span className="ec-eyebrow">Reorder when stock hits</span>
        <div className="ec-big">{reorder.toLocaleString()} <small>units</small></div>
        <p className="ec-formula">({daily}/day × {lead} days lead time) + {safetyUnits} safety units</p>
        <div className={`ec-alert ${urgent ? "is-urgent" : ""}`}>
          {urgent ? <><AlertTriangle size={16} /> Reorder now: you're at or below your reorder point.</> : <><Package size={16} /> About {daysLeft} day{daysLeft === 1 ? "" : "s"} until you need to reorder.</>}
        </div>
        <p>We set up alerts like this automatically in your inventory system, so you restock before you sell out.</p>
      </div>
    </Reveal>
  );
}

/* ---------- Amazon plan chooser (Amazon page) ---------- */
const PRO_FEE = 39.99;
const PER_ITEM = 0.99;

export function AmazonPlanChooser() {
  const [units, setUnits] = useState(25);
  const individual = units * PER_ITEM;
  const pro = units >= 40;

  return (
    <Reveal className="ec-tool">
      <div className="ec-tool__panel">
        <h3>Individual or Professional plan?</h3>
        <p>Estimate how many items you'll sell on Amazon each month.</p>
        <Slider label="Items sold per month" value={units} min={0} max={200} onChange={setUnits} />
        <div className="ec-plans">
          <div className={`ec-plan ${!pro ? "is-best" : ""}`}>
            <small>Individual</small>
            <strong>${individual.toFixed(2)}</strong>
            <span>{units} × ${PER_ITEM} per item</span>
          </div>
          <div className={`ec-plan ${pro ? "is-best" : ""}`}>
            <small>Professional</small>
            <strong>${PRO_FEE}</strong>
            <span>flat monthly subscription</span>
          </div>
        </div>
      </div>
      <div className="ec-tool__result" aria-live="polite">
        <span className="ec-eyebrow">Our suggestion</span>
        <div className="ec-big ec-big--sm">{pro ? "Professional plan" : "Individual plan"}</div>
        <p>{pro
          ? "At this volume the flat subscription usually costs less than per-item fees, and it unlocks tools like advertising, bulk listing and reports."
          : "At low volume, paying per item can cost less. If you plan to advertise, use bulk listing tools or grow quickly, Professional is often worth it anyway."}
        </p>
        <p className="mc-small ec-left">Plan fees only, based on Amazon's commonly published U.S. pricing at the time of writing. Referral and fulfillment fees apply on both plans. Always check Seller Central for current fees.</p>
      </div>
    </Reveal>
  );
}
