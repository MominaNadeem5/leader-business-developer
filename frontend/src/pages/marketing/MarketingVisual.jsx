import {
  Search, MousePointerClick, TrendingUp, Target, BarChart3, MessageCircle, Repeat2, Heart, Eye, ThumbsUp, Share2,
  ShoppingBag, Users, Megaphone,
} from "lucide-react";
import useTick from "../../hooks/useTick";
import { Sample, Chip } from "../merchant/MerchantVisual";

/* Animated hero mockups for the Marketing pages.
   Every brand, number and ad shown is a sample, and each card is labelled as one. */

/* ---------- overview: multi-channel results dashboard ---------- */
const CHANNELS = [["Search", 64], ["Social", 48], ["Video", 30]];
export function AdsDashboardVisual() {
  const tick = useTick(1300);
  const bump = [0, 6, 12, 9][tick % 4];
  return (
    <div className="mv-stage">
      <div className="mv-card mk-dash">
        <div className="mv-top"><BarChart3 size={13} /> <small>Campaign results</small><Sample /></div>
        <div className="ws-health__stats">
          <span><b key={`c${tick}`}>{(1240 + bump * 11).toLocaleString()}</b><small>Clicks</small></span>
          <span><b key={`l${tick}`}>{86 + bump}</b><small>Leads</small></span>
          <span><b>4.1%</b><small>Conv. rate</small></span>
        </div>
        <div className="mk-bars">
          {CHANNELS.map(([c, v], i) => (
            <div key={c}><small>{c}</small><span><i style={{ width: `${v + (i === tick % 3 ? 10 : 0)}%` }} /></span></div>
          ))}
        </div>
      </div>
      <Chip pos="tr" icon={<Target size={14} />}>Right audience</Chip>
      <Chip pos="bl" icon={<TrendingUp size={14} />} tone="green">Optimized weekly</Chip>
    </div>
  );
}

/* ---------- Google Ads: search query and sponsored result ---------- */
const QUERY = "bakery near me";
export function SearchAdVisual() {
  const tick = useTick(260);
  const cycle = QUERY.length + 18;
  const t = tick % cycle;
  const typed = QUERY.slice(0, Math.min(t, QUERY.length));
  const shown = t > QUERY.length + 2;
  const clicked = t > QUERY.length + 9;
  return (
    <div className="mv-stage">
      <div className="mv-card mk-search">
        <div className="ws-search"><Search size={14} /><span>{typed}<i className="ws-caret" /></span></div>
        <div className={`mk-ad ${shown ? "is-on" : ""} ${clicked ? "is-clicked" : ""}`}>
          <small><b>Sponsored</b> · brightleaf.com</small>
          <strong>Fresh Sourdough Baked Daily | Order Online</strong>
          <p>Local bakery open 7am to 6pm. Pre-order cakes and pastries for same-day pickup.</p>
          <div className="mk-ad__links"><span>Order now</span><span>Custom cakes</span><span>Directions</span></div>
          {clicked && <MousePointerClick size={20} className="mk-cursor" />}
        </div>
        <div className="mk-organic"><i /><i /><i /></div>
        <div className="ws-sample"><Sample /></div>
      </div>
      <Chip pos="tr" icon={<Search size={14} />}>High-intent searches</Chip>
      <Chip pos="bl" icon={<MousePointerClick size={14} />} tone="green">Conversions tracked</Chip>
    </div>
  );
}

/* ---------- Twitter (X) Ads: promoted post with live engagement ---------- */
export function PromotedPostVisual() {
  const tick = useTick(900);
  const n = tick % 20;
  return (
    <div className="mv-stage">
      <div className="mv-card mk-post">
        <div className="mk-post__head">
          <span className="br-mark mk-avatar">BL</span>
          <div><b>Bright Leaf Bakery</b><small>@brightleaf</small></div>
          <Sample />
        </div>
        <p>Weekend special: buy any loaf, get a pastry free. Just show this post at the counter. 🥐</p>
        <div className="mk-post__media"><Megaphone size={28} /></div>
        <div className="mk-post__stats">
          <span><MessageCircle size={13} /> {12 + Math.floor(n / 3)}</span>
          <span><Repeat2 size={13} /> {38 + n}</span>
          <span><Heart size={13} /> {214 + n * 4}</span>
          <span><Eye size={13} /> {(18.2 + n * 0.3).toFixed(1)}K</span>
        </div>
        <small className="mk-promoted">Promoted</small>
      </div>
      <Chip pos="tr" icon={<Target size={14} />}>Keyword targeting</Chip>
      <Chip pos="bl" icon={<Users size={14} />} tone="green">New followers</Chip>
    </div>
  );
}

/* ---------- Meta Ads: sponsored feed post with rotating carousel ---------- */
const SLIDES = ["Sourdough", "Croissants", "Celebration cakes"];
export function FeedAdVisual() {
  const tick = useTick(1500);
  const s = tick % SLIDES.length;
  return (
    <div className="mv-stage">
      <div className="mv-card mk-feed">
        <div className="mk-post__head">
          <span className="br-mark mk-avatar">BL</span>
          <div><b>Bright Leaf Bakery</b><small>Sponsored</small></div>
          <Sample />
        </div>
        <div className="mk-feed__media">
          {SLIDES.map((label, i) => <span key={label} className={i === s ? "is-on" : ""} style={{ "--i": i }}><ShoppingBag size={22} />{label}</span>)}
        </div>
        <div className="mk-feed__dots">{SLIDES.map((l, i) => <i key={l} className={i === s ? "is-on" : ""} />)}</div>
        <div className="mk-feed__cta"><span>Order for pickup today</span><b>Shop now</b></div>
        <div className="mk-post__stats"><span><ThumbsUp size={13} /> {320 + tick % 40}</span><span><MessageCircle size={13} /> 41</span><span><Share2 size={13} /> 18</span></div>
      </div>
      <Chip pos="tr" icon={<Users size={14} />}>Lookalike audiences</Chip>
      <Chip pos="bl" icon={<Repeat2 size={14} />} tone="green">Retargeting on</Chip>
    </div>
  );
}
