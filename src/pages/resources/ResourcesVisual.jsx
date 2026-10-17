import {
  Flag, Lightbulb, ClipboardList, Landmark, Rocket, Scale, Type, Globe, BadgeCheck, CalendarCheck, ShieldCheck,
  Sparkles, Radar, Hash, AtSign, Building2, Check, HeartPulse, Calculator, Search, MessageCircle, HelpCircle, Video,
  CalendarClock, Send, Mail, BookOpen, Wrench, Headphones, Clock, Users, Coins, Star,
} from "lucide-react";
import useTick from "../../hooks/useTick";
import { Sample, Chip } from "../merchant/MerchantVisual";
import "../merchant/Merchant.css";
import "./ResourcesVisual.css";

/* Animated hero visuals for the Resources pages, inside the shared .mv-stage/.mv-card frame.
   Most motion is CSS (ResourcesVisual.css); every name and number is a sample. */

const REDUCED = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/* ---------- Starting a business: marker travels a roadmap ---------- */
const STOPS = [[Lightbulb, "Idea"], [ClipboardList, "Plan"], [Landmark, "Register"], [Rocket, "Launch"]];
export function RoadmapVisual() {
  return (
    <div className="mv-stage">
      <div className="mv-card rv-road">
        <div className="mv-top"><Flag size={13} /> <small>Your launch roadmap</small><Sample /></div>
        <div className="rv-road__map">
        <svg viewBox="0 0 280 150" className="rv-road__svg" aria-hidden="true">
          <path className="track" d="M20 130 C80 130 60 70 120 70 S170 20 230 24" />
          <path className="done" pathLength="1" d="M20 130 C80 130 60 70 120 70 S170 20 230 24" />
          <circle className="dot" r="7" />
        </svg>
        {STOPS.map(([Icon, label], i) => (
          <span key={label} className={`rv-road__stop s${i}`} style={{ "--i": i }}><Icon size={14} /><small>{label}</small></span>
        ))}
        <span className="rv-road__flag" aria-hidden="true"><Flag size={18} /></span>
        </div>
      </div>
      <Chip pos="tr" icon={<ClipboardList size={14} />}>10 clear steps</Chip>
      <Chip pos="bl" icon={<Rocket size={14} />} tone="green">Open for business</Chip>
    </div>
  );
}

/* ---------- LLC vs Corporation: a balance scale weighs the two ---------- */
export function ScaleVisual() {
  return (
    <div className="mv-stage">
      <div className="mv-card rv-scale">
        <div className="mv-top"><Scale size={13} /> <small>Weighing your options</small><Sample /></div>
        <div className="rv-scale__rig" aria-hidden="true">
          <span className="rv-scale__post" />
          <div className="rv-scale__beam">
            <div className="rv-scale__pan l"><b>LLC</b><i>Flexible</i><i>Pass-through</i></div>
            <div className="rv-scale__pan r"><b>Corp</b><i>Investors</i><i>Stock</i></div>
          </div>
          <span className="rv-scale__base" />
        </div>
      </div>
      <Chip pos="tr" icon={<ShieldCheck size={14} />}>Both limit liability</Chip>
      <Chip pos="bl" icon={<BadgeCheck size={14} />} tone="green">Find your fit</Chip>
    </div>
  );
}

/* ---------- Picking a name: letter tiles fly into place ---------- */
export function NameTilesVisual() {
  const word = "BRIGHTLEAF".split("");
  return (
    <div className="mv-stage">
      <div className="mv-card rv-tiles">
        <div className="mv-top"><Type size={13} /> <small>Name builder</small><Sample /></div>
        <div className="rv-tiles__row" aria-label="BrightLeaf">
          {word.map((l, i) => <span key={i} style={{ "--i": i }} className={i === 6 ? "gap" : ""}>{l}</span>)}
        </div>
        <div className="rv-tiles__badges">
          <span className="b1"><Globe size={12} /> brightleaf.com <Check size={12} /></span>
          <span className="b2"><BadgeCheck size={12} /> No ™ conflicts</span>
        </div>
      </div>
      <Chip pos="tr" icon={<Sparkles size={14} />}>Memorable</Chip>
      <Chip pos="bl" icon={<Check size={14} />} tone="green">Legally clear</Chip>
    </div>
  );
}

/* ---------- Staying compliant: a year wheel ticks off each month ---------- */
const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
export function YearWheelVisual() {
  return (
    <div className="mv-stage">
      <div className="mv-card rv-wheel">
        <div className="mv-top"><CalendarCheck size={13} /> <small>Compliance year</small><Sample /></div>
        <div className="rv-wheel__ring" aria-hidden="true">
          {MONTHS.map((m, i) => <span key={i} style={{ "--i": i }}><b>{m}</b><Check size={10} strokeWidth={3} /></span>)}
          <i className="rv-wheel__hand" />
          <div className="rv-wheel__core"><ShieldCheck size={22} /><small>Good standing</small></div>
        </div>
      </div>
      <Chip pos="tr" icon={<CalendarCheck size={14} />}>Deadlines tracked</Chip>
      <Chip pos="bl" icon={<ShieldCheck size={14} />} tone="green">Always compliant</Chip>
    </div>
  );
}

/* ---------- Name generator: slot-machine reels ---------- */
const REELS = [["Nova", "Bright", "Pure", "Atlas", "Nova"], ["Leaf", "Forge", "Wave", "Peak", "Leaf"], ["Co", "Labs", "Studio", "Hub", "Co"]];
export function SlotVisual() {
  return (
    <div className="mv-stage">
      <div className="mv-card rv-slot">
        <div className="mv-top"><Sparkles size={13} /> <small>Name generator</small><Sample /></div>
        <div className="rv-slot__reels" aria-label="NovaLeaf Co">
          {REELS.map((words, r) => (
            <div key={r} className="rv-slot__reel" style={{ "--r": r }}><div>{words.map((w, i) => <b key={i}>{w}</b>)}</div></div>
          ))}
        </div>
        <div className="rv-slot__out"><Star size={13} /> NovaLeaf Co <em>saved</em></div>
      </div>
      <Chip pos="tr" icon={<Sparkles size={14} />}>Hundreds of ideas</Chip>
      <Chip pos="bl" icon={<Star size={14} />} tone="green">Save favorites</Chip>
    </div>
  );
}

/* ---------- Name check: radar sweep finds results ---------- */
const BLIPS = [[Building2, "State records"], [Hash, "Trademarks"], [Globe, ".com domain"], [AtSign, "Social handles"]];
export function RadarVisual() {
  return (
    <div className="mv-stage">
      <div className="mv-card rv-radar">
        <div className="mv-top"><Radar size={13} /> <small>Scanning “BrightLeaf”</small><Sample /></div>
        <div className="rv-radar__body">
          <div className="rv-radar__scope" aria-hidden="true"><i className="sweep" />{[0, 1, 2, 3].map((i) => <i key={i} className={`blip b${i}`} />)}</div>
          <ul>{BLIPS.map(([Icon, l], i) => <li key={l} style={{ "--i": i }}><Icon size={13} />{l}<span><Check size={11} strokeWidth={3} /></span></li>)}</ul>
        </div>
      </div>
      <Chip pos="tr" icon={<Search size={14} />}>4 checks</Chip>
      <Chip pos="bl" icon={<Check size={14} />} tone="green">Looks available</Chip>
    </div>
  );
}

/* ---------- Compliance health check: pulse line + gauge ---------- */
export function PulseGaugeVisual() {
  return (
    <div className="mv-stage">
      <div className="mv-card rv-pulse">
        <div className="mv-top"><HeartPulse size={13} /> <small>Compliance health</small><Sample /></div>
        <svg viewBox="0 0 260 60" className="rv-pulse__ecg" aria-hidden="true"><path pathLength="1" d="M0 34 H60 L72 34 L80 12 L90 52 L100 22 L108 34 H160 L170 34 L178 18 L188 46 L196 34 H260" /></svg>
        <div className="rv-pulse__gauge" aria-hidden="true">
          <svg viewBox="0 0 120 66"><path className="bg" d="M10 60 A50 50 0 0 1 110 60" /><path className="fg" pathLength="1" d="M10 60 A50 50 0 0 1 110 60" /></svg>
          <i className="needle" />
          <b>86<small>/100</small></b>
        </div>
      </div>
      <Chip pos="tr" icon={<ShieldCheck size={14} />}>12 checks</Chip>
      <Chip pos="bl" icon={<HeartPulse size={14} />} tone="green">Healthy</Chip>
    </div>
  );
}

/* ---------- Startup cost calculator: cost bars stack up, total counts ---------- */
const COSTS = [["Formation", 450, "#2fa24f"], ["Equipment", 2400, "#0a3a2a"], ["Website", 900, "#c9a227"], ["Marketing", 1200, "#3b82f6"]];
export function CoinsVisual() {
  const tick = useTick(700);
  const n = REDUCED ? COSTS.length : Math.min(tick % 8, COSTS.length);
  const total = COSTS.slice(0, n).reduce((a, [, v]) => a + v, 0);
  return (
    <div className="mv-stage">
      <div className="mv-card rv-coins">
        <div className="mv-top"><Calculator size={13} /> <small>Startup budget</small><Sample /></div>
        <div className="rv-coins__bars">
          {COSTS.map(([l, v, c], i) => (
            <div key={l} className={i < n ? "is-on" : ""}><span style={{ "--h": `${(v / 2400) * 100}%`, background: c }} /><small>{l}</small></div>
          ))}
        </div>
        <div className="rv-coins__total"><Coins size={16} /><span>One-time total</span><b key={total}>${total.toLocaleString()}</b></div>
      </div>
      <Chip pos="tr" icon={<Calculator size={14} />}>Itemized</Chip>
      <Chip pos="bl" icon={<Clock size={14} />} tone="green">6-month runway</Chip>
    </div>
  );
}

/* ---------- Help center: query types, answers slide in ---------- */
export function HelpSearchVisual() {
  return (
    <div className="mv-stage">
      <div className="mv-card rv-help">
        <div className="rv-help__search"><Search size={14} /><span className="typed">How do I get my EIN?</span></div>
        <ul className="rv-help__results">
          {["Getting your EIN after formation", "Where to find your EIN letter", "EIN for non-U.S. owners"].map((r, i) => <li key={r} style={{ "--i": i }}><BookOpen size={13} />{r}</li>)}
        </ul>
        <div className="rv-help__chat"><MessageCircle size={14} /><span>Still stuck? Chat with us</span><Sample /></div>
      </div>
      <Chip pos="tr" icon={<BookOpen size={14} />}>Step-by-step guides</Chip>
      <Chip pos="bl" icon={<Check size={14} />} tone="green">Answer found</Chip>
    </div>
  );
}

/* ---------- FAQs: accordion rows open one by one ---------- */
export function FaqStackVisual() {
  return (
    <div className="mv-stage">
      <div className="mv-card rv-faq">
        <div className="mv-top"><HelpCircle size={13} /> <small>Frequently asked</small><Sample /></div>
        {["How long does an LLC take?", "Do I need an EIN?", "What's a registered agent?"].map((q, i) => (
          <div key={q} className="rv-faq__row" style={{ "--i": i }}>
            <div className="q"><span className="ic"><HelpCircle size={13} className="a" /><Check size={13} className="b" /></span>{q}</div>
            <div className="ans"><div><i /><i /></div></div>
          </div>
        ))}
      </div>
      <Chip pos="tr" icon={<HelpCircle size={14} />}>30+ answers</Chip>
      <Chip pos="bl" icon={<Check size={14} />} tone="green">Clear & quick</Chip>
    </div>
  );
}

/* ---------- Book a consultation: a slot is picked and confirmed ---------- */
export function BookingVisual() {
  return (
    <div className="mv-stage">
      <div className="mv-card rv-book">
        <div className="mv-top"><CalendarClock size={13} /> <small>Pick a time</small><Sample /></div>
        <div className="rv-book__days">{["Mon", "Tue", "Wed", "Thu", "Fri"].map((d, i) => <span key={d} className={i === 2 ? "pick" : ""}><small>{d}</small><b>{12 + i}</b></span>)}</div>
        <div className="rv-book__slots">{["9:30", "11:00", "2:00", "4:30"].map((t, i) => <span key={t} className={i === 2 ? "pick" : ""}>{t}</span>)}</div>
        <div className="rv-book__ok"><Video size={15} /><span><b>Consultation requested</b><small>Wed 14 · 2:00 p.m.</small></span><Check size={16} /></div>
      </div>
      <Chip pos="tr" icon={<Clock size={14} />}>30-minute call</Chip>
      <Chip pos="bl" icon={<Users size={14} />} tone="green">Free, no obligation</Chip>
    </div>
  );
}

/* ---------- Contact: paper plane flies into the inbox ---------- */
export function PlaneVisual() {
  return (
    <div className="mv-stage">
      <div className="mv-card rv-plane">
        <div className="mv-top"><Send size={13} /> <small>Message</small><Sample /></div>
        <div className="rv-plane__sky" aria-hidden="true">
          <svg viewBox="0 0 260 120"><path d="M14 100 C70 100 80 30 140 40 S220 80 236 34" /></svg>
          <span className="plane"><Send size={20} /></span>
          <span className="inbox"><Mail size={22} /><i>1</i></span>
        </div>
        <div className="rv-plane__note"><Check size={14} /> Delivered · we'll reply within one business day</div>
      </div>
      <Chip pos="tr" icon={<Mail size={14} />}>Email or call</Chip>
      <Chip pos="bl" icon={<Users size={14} />} tone="green">Real people</Chip>
    </div>
  );
}

/* ---------- Learn hub: a book slides off the shelf and opens ---------- */
export function BooksVisual() {
  return (
    <div className="mv-stage">
      <div className="mv-card rv-books">
        <div className="mv-top"><BookOpen size={13} /> <small>Business guides</small><Sample /></div>
        <div className="rv-books__shelf" aria-hidden="true">
          {["#2fa24f", "#0a3a2a", "#c9a227", "#3b82f6", "#1f7a3a"].map((c, i) => <span key={c} className={i === 1 ? "pull" : ""} style={{ background: c, "--i": i }} />)}
        </div>
        <div className="rv-books__open" aria-hidden="true">
          <div className="pg l"><b>LLC or Corporation?</b><i /><i /><i /></div>
          <div className="pg r"><i /><i /><i /><i /></div>
          <div className="pg flip" />
        </div>
      </div>
      <Chip pos="tr" icon={<BookOpen size={14} />}>Plain-English guides</Chip>
      <Chip pos="bl" icon={<Clock size={14} />} tone="green">Under 10 min each</Chip>
    </div>
  );
}

/* ---------- Tools hub: tool tiles light up one after another ---------- */
const TOOL_TILES = [[Sparkles, "Names"], [Search, "Check"], [HeartPulse, "Health"], [Calculator, "Costs"]];
export function ToolboxVisual() {
  return (
    <div className="mv-stage">
      <div className="mv-card rv-tools">
        <div className="mv-top"><Wrench size={13} /> <small>Free toolkit</small><Sample /></div>
        <div className="rv-tools__grid">
          {TOOL_TILES.map(([Icon, l], i) => <span key={l} style={{ "--i": i }}><Icon size={22} /><small>{l}</small></span>)}
        </div>
        <div className="rv-tools__bar"><i /></div>
      </div>
      <Chip pos="tr" icon={<Wrench size={14} />}>4 free tools</Chip>
      <Chip pos="bl" icon={<Check size={14} />} tone="green">No sign-up</Chip>
    </div>
  );
}

/* ---------- Support hub: an agent is online, waves pulse out ---------- */
export function HeadsetVisual() {
  return (
    <div className="mv-stage">
      <div className="mv-card rv-agent">
        <div className="mv-top"><Headphones size={13} /> <small>Support team</small><Sample /></div>
        <div className="rv-agent__core" aria-hidden="true">
          <i /><i /><i />
          <span><Headphones size={30} /></span>
        </div>
        <div className="rv-agent__status"><em /> Online now<small>Mon–Fri business hours</small></div>
        <div className="rv-agent__msg"><MessageCircle size={13} /><span className="t1">Hi! How can we help?</span></div>
      </div>
      <Chip pos="tr" icon={<Clock size={14} />}>Fast replies</Chip>
      <Chip pos="bl" icon={<Users size={14} />} tone="green">Real specialists</Chip>
    </div>
  );
}
