import {
  Check, Lock, Globe, Server, Mail, ShieldCheck, Gauge, RefreshCw, HardDrive, Puzzle, LayoutTemplate,
  ShoppingBag, Bell, Rocket, Activity,
} from "lucide-react";
import useTick from "../../hooks/useTick";
import { Sample, Chip } from "../merchant/MerchantVisual";

/* Animated hero mockups for the Website Setup pages.
   Every domain, number and screen shown is a sample, and each card is labelled as one. */

/* ---------- overview: a website assembling itself ---------- */
export function SiteBuildVisual() {
  const tick = useTick(900);
  const step = tick % 8;
  return (
    <div className="mv-stage">
      <div className="mv-card ws-build">
        <div className="mv-browser"><i /><i /><i /><span><Lock size={10} /> yourbusiness.com</span></div>
        <div className={`ws-build__nav ${step > 0 ? "is-on" : ""}`}><span className="ws-dot" /><i /><i /><i /></div>
        <div className={`ws-build__hero ${step > 1 ? "is-on" : ""}`}><b /><small /><em /></div>
        <div className="ws-build__cols">
          {[0, 1, 2].map((i) => <span key={i} className={step > 2 + i ? "is-on" : ""} style={{ "--i": i }} />)}
        </div>
        <div className={`ws-live ${step > 5 ? "is-on" : ""}`}>{step > 5 ? <><Check size={13} /> Website live</> : <><span className="mv-spin" /> Building…</>}</div>
        <div className="ws-sample"><Sample /></div>
      </div>
      <Chip pos="tr" icon={<Gauge size={14} />}>Fast loading</Chip>
      <Chip pos="bl" icon={<ShieldCheck size={14} />} tone="green">SSL secured</Chip>
    </div>
  );
}

/* ---------- domain & hosting: domain search + setup ---------- */
const TLDS = [[".com", true], [".co", true], [".net", false]];
const NAME = "brightleafbakery";
const DNS = ["Domain registered", "DNS pointed to host", "SSL certificate active", "Business email ready"];
export function DomainVisual() {
  const tick = useTick(420);
  const cycle = NAME.length + 16;
  const t = tick % cycle;
  const typed = NAME.slice(0, Math.min(t, NAME.length));
  const shown = t > NAME.length + 1;
  const dns = Math.max(0, Math.min(DNS.length, Math.floor((t - NAME.length - 4) / 2)));
  return (
    <div className="mv-stage">
      <div className="mv-card ws-domain">
        <div className="mv-top"><Globe size={13} /> <small>Domain search</small><Sample /></div>
        <div className="ws-search"><Globe size={14} /><span>{typed}<i className="ws-caret" /></span></div>
        <ul className="ws-tlds">
          {TLDS.map(([tld, ok], i) => (
            <li key={tld} className={shown ? (ok ? "is-ok" : "is-no") : ""} style={{ "--i": i }}>
              <b>{NAME}{tld}</b><em>{shown ? (ok ? "Available" : "Taken") : "…"}</em>
            </li>
          ))}
        </ul>
        <ul className="mv-ticks">
          {DNS.map((d, i) => <li key={d} className={i < dns ? "is-on" : ""}><span><Check size={11} /></span>{d}</li>)}
        </ul>
      </div>
      <Chip pos="tr" icon={<Server size={14} />}>Hosting ready</Chip>
      <Chip pos="bl" icon={<Mail size={14} />} tone="green">you@yourbusiness.com</Chip>
    </div>
  );
}

/* ---------- WordPress: plugins installing ---------- */
const PLUGINS = ["SEO", "Security", "Backups", "Contact forms", "Caching", "Analytics"];
export function WordPressVisual() {
  const tick = useTick(800);
  const done = tick % (PLUGINS.length + 3);
  const pct = Math.round((Math.min(done, PLUGINS.length) / PLUGINS.length) * 100);
  return (
    <div className="mv-stage">
      <div className="mv-card ws-wp">
        <div className="mv-top"><LayoutTemplate size={13} /> <small>Site setup</small><Sample /></div>
        <div className="ws-wp__grid">
          {PLUGINS.map((p, i) => (
            <span key={p} className={i < done ? "is-on" : ""}><Puzzle size={14} />{p}{i < done && <Check size={11} />}</span>
          ))}
        </div>
        <div className="ec-score"><span>Setup progress</span><div><i style={{ width: `${pct}%` }} /></div><b>{pct}%</b></div>
      </div>
      <Chip pos="tr" icon={<LayoutTemplate size={14} />}>Theme customized</Chip>
      <Chip pos="bl" icon={<ShieldCheck size={14} />} tone="green">Hardened &amp; backed up</Chip>
    </div>
  );
}

/* ---------- Shopify: storefront going live ---------- */
export function ShopifyVisual() {
  const tick = useTick(1300);
  const sales = 3 + (tick % 9);
  return (
    <div className="mv-stage">
      <div className="mv-card ws-shop">
        <div className="mv-browser"><i /><i /><i /><span><Lock size={10} /> yourstore.com</span></div>
        <div className="ws-shop__head"><span className="ws-dot" /><b>Your Store</b><ShoppingBag size={14} /></div>
        <div className="ws-shop__grid">
          {[0, 1, 2, 3].map((i) => <span key={i} className={i === tick % 4 ? "is-on" : ""}><i /><b /><em /></span>)}
        </div>
        <div className="ws-shop__foot"><Bell size={12} /><span key={tick}>{sales} orders today</span><Sample /></div>
      </div>
      <Chip pos="tr" icon={<Rocket size={14} />}>Store launched</Chip>
      <Chip pos="bl" icon={<Check size={14} />} tone="green">Payments on</Chip>
    </div>
  );
}

/* ---------- maintenance: site health dashboard ---------- */
export function MaintenanceVisual() {
  const tick = useTick(1500);
  const speed = [92, 95, 97, 94][tick % 4];
  const tasks = ["Core & plugin updates", "Daily backup", "Security scan", "Uptime check"];
  const active = tick % tasks.length;
  return (
    <div className="mv-stage">
      <div className="mv-card ws-health">
        <div className="mv-top"><Activity size={13} /> <small>Site health</small><Sample /></div>
        <div className="ws-health__stats">
          <span><b>99.9%</b><small>Uptime</small></span>
          <span><b key={speed}>{speed}</b><small>Speed score</small></span>
          <span><b>0</b><small>Threats</small></span>
        </div>
        <ul className="ws-health__tasks">
          {tasks.map((t, i) => (
            <li key={t} className={i === active ? "is-run" : i < active ? "is-on" : ""}>
              {i === active ? <span className="mv-spin" /> : <Check size={12} />}{t}
            </li>
          ))}
        </ul>
      </div>
      <Chip pos="tr" icon={<RefreshCw size={14} />}>Updated weekly</Chip>
      <Chip pos="bl" icon={<HardDrive size={14} />} tone="green">Backed up daily</Chip>
    </div>
  );
}
