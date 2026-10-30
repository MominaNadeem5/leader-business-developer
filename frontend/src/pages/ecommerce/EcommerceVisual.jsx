import {
  Check, Store, Globe, Tags, Image, Search, CreditCard, Truck, Package, Bell, MapPin,
  Boxes, AlertTriangle, RefreshCw, ShieldCheck, BadgeCheck, Star, Lock,
} from "lucide-react";
import useTick from "../../hooks/useTick";
import { Sample, Chip } from "../merchant/MerchantVisual";

/* Animated hero mockups for the Ecommerce Solution pages.
   Every product, number and order shown is a sample, and each card is labelled as one. */

/* ---------- overview: one store, many channels ---------- */
const CHANNELS = ["Your website", "Amazon", "eBay", "Etsy", "Walmart"];
export function ChannelVisual() {
  const tick = useTick(1200);
  const active = tick % CHANNELS.length;
  return (
    <div className="mv-stage">
      <div className="mv-card ec-channels">
        <div className="mv-top"><Store size={13} /> <small>Sales channels</small><Sample /></div>
        <div className="ec-channels__orders">
          <strong key={tick}>{128 + tick}</strong><span>orders this week</span>
        </div>
        <ul>
          {CHANNELS.map((c, i) => (
            <li key={c} className={i === active ? "is-on" : ""}>
              <Globe size={14} /><span>{c}</span>
              <i style={{ "--w": `${[82, 64, 38, 30, 22][i]}%` }} />
              {i === active && <em><Bell size={11} /> New order</em>}
            </li>
          ))}
        </ul>
      </div>
      <Chip pos="tr" icon={<RefreshCw size={14} />}>Stock synced</Chip>
      <Chip pos="bl" icon={<Truck size={14} />} tone="green">Ships today</Chip>
    </div>
  );
}

/* ---------- product listing: a listing filling in ---------- */
const LISTING = ["Photos", "SEO title", "Description", "Variants", "Price & SKU", "Category"];
export function CatalogVisual() {
  const tick = useTick(900);
  const step = tick % (LISTING.length + 3);
  const score = Math.round((Math.min(step, LISTING.length) / LISTING.length) * 100);
  return (
    <div className="mv-stage">
      <div className="mv-card ec-listing">
        <div className="mv-top"><Tags size={13} /> <small>Product listing</small><Sample /></div>
        <div className={`ec-listing__img ${step > 0 ? "is-on" : ""}`}><Image size={28} /></div>
        <div className={`ec-listing__title ${step > 1 ? "is-on" : ""}`}>Organic Cotton Tote Bag – Reusable Grocery Bag</div>
        <div className={`ec-listing__line ${step > 2 ? "is-on" : ""}`} />
        <div className={`ec-listing__line is-short ${step > 2 ? "is-on" : ""}`} />
        <div className="ec-listing__variants">
          {["Natural", "Black", "Sage"].map((v, i) => <span key={v} className={step > 3 ? "is-on" : ""} style={{ "--i": i }}>{v}</span>)}
        </div>
        <div className={`ec-listing__meta ${step > 4 ? "is-on" : ""}`}><b>$24.00</b><small>SKU TOTE-NAT-01</small></div>
        <div className="ec-score"><span>Listing quality</span><div><i style={{ width: `${score}%` }} /></div><b>{score}%</b></div>
      </div>
      <Chip pos="tr" icon={<Search size={14} />}>Search friendly</Chip>
      <Chip pos="bl" icon={<Star size={14} />} tone="green">Ready to publish</Chip>
    </div>
  );
}

/* ---------- cart & checkout: steps progressing ---------- */
const CHECKOUT = ["Cart", "Details", "Shipping", "Payment", "Done"];
export function CheckoutVisual() {
  const tick = useTick(1300);
  const step = tick % CHECKOUT.length;
  return (
    <div className="mv-stage">
      <div className="mv-card ec-cart">
        <div className="mv-browser"><i /><i /><i /><span><Lock size={10} /> checkout</span></div>
        <div className="ec-steps">
          {CHECKOUT.map((s, i) => <span key={s} className={i < step ? "is-done" : i === step ? "is-on" : ""}><b>{i < step ? <Check size={10} /> : i + 1}</b>{s}</span>)}
        </div>
        <div className="ec-cart__item"><span className="ec-thumb" /><div><b>Ceramic Mug</b><small>Qty 2</small></div><strong>$32.00</strong></div>
        <div className="ec-cart__item"><span className="ec-thumb is-b" /><div><b>Coffee Beans</b><small>Qty 1</small></div><strong>$18.00</strong></div>
        <div className="ec-cart__row"><span>Shipping</span><span>Free</span></div>
        <div className="ec-cart__row is-total"><span>Total</span><strong>$50.00</strong></div>
        <div className={`ec-cart__btn ${step === CHECKOUT.length - 1 ? "is-done" : ""}`} key={step}>
          {step === CHECKOUT.length - 1 ? <><Check size={15} /> Order confirmed</> : `Continue to ${CHECKOUT[step + 1].toLowerCase()}`}
        </div>
      </div>
      <Chip pos="tr" icon={<CreditCard size={14} />}>Wallets enabled</Chip>
      <Chip pos="bl" icon={<ShieldCheck size={14} />} tone="green">Guest checkout</Chip>
    </div>
  );
}

/* ---------- inventory: stock levels moving ---------- */
const SKUS = [["Tote – Natural", 64], ["Tote – Black", 41], ["Mug – White", 18], ["Apron – Sage", 27]];
export function InventoryVisual() {
  const tick = useTick(1100);
  return (
    <div className="mv-stage">
      <div className="mv-card ec-stock">
        <div className="mv-top"><Boxes size={13} /> <small>Inventory</small><Sample /></div>
        {SKUS.map(([name, base], i) => {
          const qty = Math.max(base - ((tick * (i + 1)) % 22), 3);
          const low = qty <= 10;
          return (
            <div key={name} className={`ec-stock__row ${low ? "is-low" : ""}`}>
              <span>{name}</span>
              <div><i style={{ width: `${Math.min(qty, 70) / 0.7}%` }} /></div>
              <b>{qty}</b>
            </div>
          );
        })}
        <div className="ec-stock__foot"><RefreshCw size={12} /> Synced across 4 channels</div>
      </div>
      <Chip pos="tr" icon={<AlertTriangle size={14} />}>Low-stock alert</Chip>
      <Chip pos="bl" icon={<Package size={14} />} tone="green">Order routed</Chip>
    </div>
  );
}

/* ---------- shipping: parcel moving along a route ---------- */
const SHIP = ["Label created", "Picked up", "In transit", "Out for delivery", "Delivered"];
export function ShippingVisual() {
  const tick = useTick(1200);
  const step = tick % SHIP.length;
  return (
    <div className="mv-stage">
      <div className="mv-card ec-ship">
        <div className="mv-top"><Truck size={13} /> <small>Shipment tracking</small><Sample /></div>
        <div className="ec-route" style={{ "--p": step / (SHIP.length - 1) }}>
          <span className="ec-route__line"><i /></span>
          <span className="ec-route__truck"><Truck size={16} /></span>
          <MapPin size={16} className="ec-route__pin" />
        </div>
        <ul className="ec-ship__list">
          {SHIP.map((s, i) => <li key={s} className={i <= step ? "is-on" : ""}><span><Check size={10} /></span>{s}</li>)}
        </ul>
      </div>
      <Chip pos="tr" icon={<Bell size={14} />}>Tracking email sent</Chip>
      <Chip pos="bl" icon={<Package size={14} />} tone="green">Label printed</Chip>
    </div>
  );
}

/* ---------- marketplaces: one product syncing to channels ---------- */
const MARKETS = ["eBay", "Etsy", "Walmart"];
export function MarketplaceVisual() {
  const tick = useTick(1000);
  const live = tick % (MARKETS.length + 3);
  return (
    <div className="mv-stage">
      <div className="mv-card ec-market">
        <div className="mv-top"><Store size={13} /> <small>Listing sync</small><Sample /></div>
        <div className="ec-market__src"><span className="ec-thumb" /><div><b>Linen Apron – Sage</b><small>Stock: 27</small></div></div>
        <div className="ec-market__arrow"><i className="ec-flow" /></div>
        <div className="ec-market__grid">
          {MARKETS.map((m, i) => (
            <span key={m} className={i < live ? "is-on" : ""}>
              <b>{m}</b>{i < live ? <em><Check size={10} /> Live</em> : <em>Syncing…</em>}
            </span>
          ))}
        </div>
      </div>
      <Chip pos="tr" icon={<RefreshCw size={14} />}>One inventory</Chip>
      <Chip pos="bl" icon={<Bell size={14} />} tone="green">Orders in one place</Chip>
    </div>
  );
}

/* ---------- Amazon: setup checklist ---------- */
const AMZ = ["Seller account verified", "Tax & bank details", "Listings created", "Brand Registry prep", "Fulfillment chosen"];
export function AmazonVisual() {
  const tick = useTick(1000);
  const done = tick % (AMZ.length + 3);
  const ready = done > AMZ.length;
  return (
    <div className="mv-stage">
      <div className="mv-card ec-amz">
        <div className="mv-top"><Package size={13} /> <small>Marketplace launch</small><Sample /></div>
        <ul className="mv-ticks">
          {AMZ.map((r, i) => <li key={r} className={i < done ? "is-on" : ""}><span><Check size={11} /></span>{r}</li>)}
        </ul>
        <div className={`ec-amz__status ${ready ? "is-live" : ""}`}>
          {ready ? <><BadgeCheck size={15} /> Ready to launch</> : <><span className="mv-spin" /> Setting up…</>}
        </div>
      </div>
      <Chip pos="tr" icon={<Star size={14} />}>Optimized listings</Chip>
      <Chip pos="bl" icon={<Truck size={14} />} tone="green">FBA or FBM</Chip>
    </div>
  );
}
