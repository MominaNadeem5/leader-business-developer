import { Check, Star, MapPin, Phone, Globe, Mail, QrCode, Palette, BadgeCheck, Sparkles, Share2, Type } from "lucide-react";
import useTick from "../../hooks/useTick";
import { Sample, Chip } from "../merchant/MerchantVisual";

/* Animated hero mockups for the Branding pages.
   Every name, number and screen shown is a sample, and each card is labelled as one. */

const SWATCHES = ["#000000", "#2fa24f", "#2fa24f", "#f0fdf4"];

/* ---------- overview: a brand kit coming together ---------- */
export function BrandKitVisual() {
  const tick = useTick(900);
  const step = tick % 7;
  return (
    <div className="mv-stage">
      <div className="mv-card br-kit">
        <div className="mv-top"><Palette size={13} /> <small>Brand kit</small><Sample /></div>
        <div className={`br-kit__logo ${step > 0 ? "is-on" : ""}`}><span className="br-mark">BL</span><b>Bright Leaf</b></div>
        <div className="br-kit__swatches">
          {SWATCHES.map((c, i) => <span key={c} className={step > 1 + i ? "is-on" : ""} style={{ background: c, "--i": i }} />)}
        </div>
        <div className={`br-kit__type ${step > 5 ? "is-on" : ""}`}><Type size={13} /><b>Aa</b><small>Heading &amp; body fonts</small></div>
      </div>
      <Chip pos="tr" icon={<Sparkles size={14} />}>Consistent everywhere</Chip>
      <Chip pos="bl" icon={<BadgeCheck size={14} />} tone="green">Profiles optimized</Chip>
    </div>
  );
}

/* ---------- profile optimization: completeness climbing ---------- */
const FIELDS = ["Business name & category", "Hours & service area", "Photos & logo", "Description with keywords", "Reviews answered"];
export function ProfileVisual() {
  const tick = useTick(800);
  const done = tick % (FIELDS.length + 3);
  const pct = 40 + Math.round((Math.min(done, FIELDS.length) / FIELDS.length) * 60);
  return (
    <div className="mv-stage">
      <div className="mv-card br-profile">
        <div className="br-profile__head">
          <span className="br-mark">BL</span>
          <div><b>Bright Leaf Bakery</b><small><Star size={11} /> 4.8 · Bakery</small></div>
          <Sample />
        </div>
        <div className="br-profile__meta"><span><MapPin size={11} /> Directions</span><span><Phone size={11} /> Call</span><span><Globe size={11} /> Website</span></div>
        <ul className="mv-ticks">
          {FIELDS.map((f, i) => <li key={f} className={i < done ? "is-on" : ""}><span><Check size={11} /></span>{f}</li>)}
        </ul>
        <div className="ec-score"><span>Profile strength</span><div><i style={{ width: `${pct}%` }} /></div><b>{pct}%</b></div>
      </div>
      <Chip pos="tr" icon={<BadgeCheck size={14} />}>Verified</Chip>
      <Chip pos="bl" icon={<Share2 size={14} />} tone="green">Same info everywhere</Chip>
    </div>
  );
}

/* ---------- logo design: concepts cycling ---------- */
const CONCEPTS = [
  { cls: "is-round", label: "Emblem" },
  { cls: "is-leaf", label: "Symbol" },
  { cls: "is-word", label: "Wordmark" },
];
export function LogoVisual() {
  const tick = useTick(1400);
  const pick = tick % CONCEPTS.length;
  return (
    <div className="mv-stage">
      <div className="mv-card br-logo">
        <div className="mv-top"><Palette size={13} /> <small>Logo concepts</small><Sample /></div>
        <div className="br-logo__stage" key={pick}>
          <span className={`br-logo__mark ${CONCEPTS[pick].cls}`}>{pick === 2 ? "brightleaf" : "BL"}</span>
        </div>
        <div className="br-logo__tabs">
          {CONCEPTS.map((c, i) => <span key={c.label} className={i === pick ? "is-on" : ""}>{c.label}</span>)}
        </div>
        <div className="br-kit__swatches br-kit__swatches--sm">
          {SWATCHES.map((c) => <span key={c} className="is-on" style={{ background: c }} />)}
        </div>
      </div>
      <Chip pos="tr" icon={<Sparkles size={14} />}>3 original concepts</Chip>
      <Chip pos="bl" icon={<Check size={14} />} tone="green">All file formats</Chip>
    </div>
  );
}

/* ---------- business email & digital card: card flipping to QR ---------- */
export function EmailCardVisual() {
  const tick = useTick(1800);
  const flipped = tick % 2 === 1;
  return (
    <div className="mv-stage">
      <div className="mv-card br-card">
        <div className={`br-card__inner ${flipped ? "is-flipped" : ""}`}>
          <div className="br-card__face">
            <span className="br-mark">BL</span>
            <b>Jordan Lee</b>
            <small>Founder, Bright Leaf Bakery</small>
            <ul>
              <li><Mail size={11} /> jordan@brightleaf.com</li>
              <li><Phone size={11} /> (555) 010-2040</li>
              <li><Globe size={11} /> brightleaf.com</li>
            </ul>
          </div>
          <div className="br-card__face br-card__back">
            <QrCode size={78} strokeWidth={1.4} />
            <small>Scan to save contact</small>
          </div>
        </div>
        <div className="br-card__foot"><Sample /></div>
      </div>
      <Chip pos="tr" icon={<Mail size={14} />}>you@yourbusiness.com</Chip>
      <Chip pos="bl" icon={<QrCode size={14} />} tone="green">Tap or scan to share</Chip>
    </div>
  );
}
