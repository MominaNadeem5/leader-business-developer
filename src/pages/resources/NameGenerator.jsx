import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Copy, Check, RefreshCw, SearchCheck, Sparkles, Trash2, Wand2, ListFilter, Trophy } from "lucide-react";
import Seo from "../../components/common/Seo";
import { Reveal, Section, ServiceFooter } from "../../components/service";
import { ResHero, Segmented, FaqBlock, RelatedLinks, ResNote } from "./ResBits";
import { SlotVisual } from "./ResourcesVisual";
import { RES_SEO, FREE_TOOLS, HUBS, store } from "./resources";
import "../forms/Forms.css";
import "./Resources.css";

const PATH = "/resources/tools/name-generator";
const FAV_KEY = "lbd-name-favs";

const INDUSTRY = {
  general: [],
  food: ["Kitchen", "Table", "Harvest", "Crumb", "Spoon", "Pantry", "Bakehouse", "Bistro", "Oven", "Fork", "Feast", "Roast"],
  tech: ["Labs", "Stack", "Logic", "Byte", "Cloud", "Pixel", "Code", "Grid", "Sync", "Node", "Forge", "Ware"],
  beauty: ["Glow", "Bloom", "Studio", "Silk", "Aura", "Muse", "Velvet", "Radiance", "Petal", "Luxe", "Serene", "Spa"],
  home: ["Nest", "Haven", "Craft", "Hearth", "Works", "Builders", "Abode", "Roofing", "Fixers", "Cornerstone", "Timber", "Homestead"],
  finance: ["Capital", "Ledger", "Partners", "Trust", "Advisory", "Wealth", "Equity", "Fiduciary", "Assets", "Treasury", "Vantage", "Counsel"],
  fitness: ["Motion", "Strong", "Pulse", "Fit", "Peak", "Iron", "Stride", "Flex", "Sprint", "Endure", "Vital", "Athletics"],
  retail: ["Market", "Boutique", "Shop", "Emporium", "Goods", "Supply", "Trading", "Outlet", "Mercantile", "Bazaar", "Collective", "Finds"],
  health: ["Care", "Health", "Wellness", "Clinic", "Remedy", "Vita", "Thrive", "Balance", "Healing", "Cura", "Mend", "Nourish"],
  creative: ["Studio", "Design", "Canvas", "Story", "Pixel", "Frame", "Ink", "Palette", "Media", "Atelier", "Spark", "Craftwork"],
  education: ["Academy", "Learn", "Scholar", "Mentor", "Campus", "Tutor", "Wisdom", "Bright", "Minds", "Lesson", "Path", "Classroom"],
  travel: ["Voyage", "Journey", "Escape", "Trails", "Roam", "Wander", "Compass", "Getaway", "Atlas", "Horizon", "Excursion", "Nomad"],
  realestate: ["Realty", "Properties", "Estates", "Homes", "Landmark", "Keystone", "Residences", "Holdings", "Acres", "Equity", "Dwell", "Metro"],
};
const STYLE = {
  modern: {
    pre: ["Nova", "Zen", "Flux", "Neo", "Vibe", "Kin", "Hyper", "Omni", "Uni", "Veri", "Luma", "Zeta", "Evo", "Apex", "Arc"],
    suf: ["ly", "ify", "io", "hub", "lab", "wise", "ora", "ium", "ex", "ora", "able", "ster", "scape", "ify"],
    words: ["Spark", "Shift", "Loop", "Bolt", "Wave", "Drift", "Pulse", "Link", "Beam", "Orbit", "Glide", "Rise"],
  },
  classic: {
    pre: ["Heritage", "Crown", "Oak", "Liberty", "Sterling", "Union", "Royal", "Anchor", "Cedar", "Legacy", "Paramount", "Beacon", "Harbor", "Pioneer", "Eagle"],
    suf: [" & Co.", " Company", " Group", " House", " Guild", " Supply", " & Sons", " Brothers", " Trading Co.", " Works", " Mercantile", " Society"],
    words: ["Bridge", "Stone", "Field", "Mill", "Gate", "Grove", "Ridge", "Harbor", "Forge", "Lane", "Hill", "Brook"],
  },
  playful: {
    pre: ["Happy", "Little", "Sunny", "Jolly", "Bright", "Bubbly", "Giddy", "Zippy", "Cheery", "Wiggle", "Peppy", "Funky", "Lucky", "Merry", "Snappy"],
    suf: ["oo", "y", "ster", "pop", "ville", "ish", "ino", "ie", "zilla", "doodle", "ly", "bug"],
    words: ["Pickle", "Puddle", "Doodle", "Sprout", "Button", "Bean", "Noodle", "Biscuit", "Bubble", "Pebble", "Pop", "Giggle"],
  },
  pro: {
    pre: ["Prime", "Summit", "Apex", "Core", "Keystone", "Meridian", "Pinnacle", "Vertex", "Cornerstone", "Paragon", "Vanguard", "Strategic", "Premier", "Clarity", "Landmark"],
    suf: [" Partners", " Advisors", " Solutions", " Consulting", " Associates", " Group", " Strategies", " Collective", " Services", " Holdings", " & Associates", " Advisory"],
    words: ["North", "Clear", "True", "Point", "Bridge", "Axis", "Pillar", "Compass", "Stride", "Insight", "Anchor", "Vector"],
  },
};

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
function rng(seed) { let s = seed || 1; return () => (s = (s * 16807) % 2147483647) / 2147483647; }
function hash(str) { let h = 7; for (const c of str) h = (h * 31 + c.charCodeAt(0)) % 2147483647; return h; }

function generate(keywords, industry, style, seed, maxLen) {
  const kws = keywords.split(/[,\s]+/).map((k) => k.replace(/[^a-z]/gi, "")).filter((k) => k.length > 1).map(cap);
  const base = kws.length ? kws : ["Bright"];
  const S = STYLE[style];
  const extra = INDUSTRY[industry];
  const r = rng(hash(`${keywords}${industry}${style}`) + seed * 7919);
  const pick = (a) => a[Math.floor(r() * a.length)];
  const out = new Set();
  for (let i = 0; i < 1500 && out.size < 60; i++) {
    const k = pick(base);
    const t = Math.floor(r() * 11);
    let n;
    if (t === 0) n = `${k}${pick(S.suf)}`;
    else if (t === 1) n = `${pick(S.pre)}${k}`;
    else if (t === 2) n = `${k} ${pick(extra.length ? extra : S.words)}`;
    else if (t === 3) n = `${k.slice(0, Math.max(3, Math.ceil(k.length * .6)))}${pick(S.suf).trim().toLowerCase()}`;
    else if (t === 4) n = `${pick(S.words)}${k}`;
    else if (t === 5) n = extra.length ? `${pick(S.pre)} ${pick(extra)}` : `${k}${pick(S.words)}`;
    else if (t === 6) n = base.length > 1 ? `${base[0]}${base[1]}` : `${pick(S.pre)}${pick(S.words)}`;
    else if (t === 7) n = `${pick(S.pre)} ${k}${extra.length ? ` ${pick(extra)}` : ""}`;
    else if (t === 8) { const o = pick(base.length > 1 ? base.filter((x) => x !== k) : S.words); n = `${k} & ${o}`; }
    else if (t === 9) n = `The ${k} ${pick(extra.length ? extra : S.words)}`;
    else n = `${k}${pick(extra.length ? extra : S.words)}`;
    n = n.replace(/\s+/g, " ").trim();
    n = n.charAt(0).toUpperCase() + n.slice(1);
    if (n.replace(/[^a-z]/gi, "").length <= maxLen) out.add(n);
  }
  return [...out];
}

const FAQS = [
  ["Are the names from this generator free to use?", "Yes, you're free to use any name the generator suggests. But the generator doesn't check legal availability. Before you commit, confirm the name with your state's business registry, search federal trademarks, and check domains and social handles."],
  ["How does the business name generator work?", "It combines your keywords with word banks tuned to your chosen industry and style, using patterns that real brands use: suffixes, prefixes, compound words and blends. Change any input or press “More ideas” for a fresh batch."],
  ["How many keywords should I enter?", "Two to four works best. Use words tied to what you do, the feeling you want, or where you're based. Mix literal words, like “bake”, with emotional ones, like “sunny”, for more interesting combinations."],
  ["Can I save the names I like?", "Yes. Tap the heart on any suggestion to add it to your shortlist. Favorites are saved in this browser, so they'll still be here when you come back on the same device."],
  ["What should I do after choosing a name?", "Run it through our name availability check, ask a few potential customers how it sounds, and then secure it: register the business or a DBA, buy the domain and claim social handles before someone else does."],
];

export default function NameGenerator() {
  const [kw, setKw] = useState("sunrise, bake");
  const [industry, setIndustry] = useState("food");
  const [style, setStyle] = useState("modern");
  const [maxLen, setMaxLen] = useState(16);
  const [seed, setSeed] = useState(1);
  const [favs, setFavs] = useState(() => store.get(FAV_KEY, []));
  const [copied, setCopied] = useState("");
  useEffect(() => store.set(FAV_KEY, favs), [favs]);
  const names = useMemo(() => generate(kw, industry, style, seed, maxLen), [kw, industry, style, seed, maxLen]);
  const fav = (n) => setFavs((f) => (f.includes(n) ? f.filter((x) => x !== n) : [...f, n]));
  const copy = async (n) => { try { await navigator.clipboard.writeText(n); setCopied(n); setTimeout(() => setCopied(""), 1400); } catch { /* clipboard blocked */ } };

  return (
    <div className="svc mc-page lf-page rs-page rs-gen">
      <Seo {...RES_SEO[PATH]} path={PATH} faqs={FAQS} />

      <ResHero
        hub={HUBS.tools}
        label="Business Name Generator"
        title="Free business name generator: brandable ideas in seconds"
        subtitle={<>Add a few keywords, choose your industry and style, and get <strong>dozens of fresh name ideas</strong>. Save favorites, copy with one tap and check availability before you commit.</>}
        primary={{ label: "Generate names", href: "#rs-gen" }}
        secondary={{ label: "How to pick the winner", href: "#rs-pick" }}
        visual={<SlotVisual />}
      />

      {/* tool */}
      <Section id="rs-gen" tone="gray">
        <Reveal className="rs-gen__tool">
          <div className="rs-gen__controls">
            <label className="lf-field"><span>Keywords (comma separated)</span><input value={kw} maxLength={60} onChange={(e) => setKw(e.target.value)} placeholder="e.g. sunrise, bake, cozy" /></label>
            <label className="lf-field"><span>Industry</span>
              <select value={industry} onChange={(e) => setIndustry(e.target.value)}>
                {[["general", "General / other"], ["food", "Food & drink"], ["tech", "Tech & software"], ["beauty", "Beauty & wellness"], ["home", "Home & trades"], ["finance", "Finance & consulting"], ["fitness", "Fitness & sports"], ["retail", "Retail & ecommerce"], ["health", "Health & medical"], ["creative", "Creative & media"], ["education", "Education & coaching"], ["travel", "Travel & hospitality"], ["realestate", "Real estate"]].map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </label>
            <Segmented label="Style" value={style} onChange={setStyle} options={[["modern", "Modern"], ["classic", "Classic"], ["playful", "Playful"], ["pro", "Professional"]]} />
            <label className="lf-range"><span>Max letters<b>{maxLen}</b></span>
              <input type="range" min="6" max="24" value={maxLen} onChange={(e) => setMaxLen(Number(e.target.value))} style={{ "--fill": `${((maxLen - 6) / 18) * 100}%` }} /></label>
            <button type="button" className="lf-btn" onClick={() => setSeed((s) => s + 1)}><RefreshCw size={16} /> More ideas</button>
          </div>
          <div className="rs-gen__results">
            <div className="rs-gen__head"><Sparkles size={16} /><b>{names.length} ideas</b><small>Tap ♥ to shortlist</small></div>
            <div className="rs-gen__grid" key={`${seed}${style}${industry}`}>
              {names.map((n, i) => (
                <div key={n} className={`rs-gen__card ${favs.includes(n) ? "is-fav" : ""}`} style={{ "--i": i }}>
                  <b>{n}</b>
                  <div>
                    <button type="button" aria-label={`Save ${n}`} aria-pressed={favs.includes(n)} onClick={() => fav(n)}><Heart size={15} /></button>
                    <button type="button" aria-label={`Copy ${n}`} onClick={() => copy(n)}>{copied === n ? <Check size={15} /> : <Copy size={15} />}</button>
                    <Link to={`/resources/tools/name-check?name=${encodeURIComponent(n)}`} aria-label={`Check ${n}`}><SearchCheck size={15} /></Link>
                  </div>
                </div>
              ))}
              {!names.length && <p className="lf-small">No names fit that length. Try raising “Max letters”.</p>}
            </div>
          </div>
        </Reveal>
        {favs.length > 0 && (
          <Reveal className="rs-gen__favs">
            <h3><Heart size={18} /> Your shortlist ({favs.length})</h3>
            <div>{favs.map((f) => <span key={f}>{f}<Link to={`/resources/tools/name-check?name=${encodeURIComponent(f)}`}>Check</Link><button type="button" aria-label={`Remove ${f}`} onClick={() => fav(f)}><Trash2 size={13} /></button></span>)}</div>
          </Reveal>
        )}
        <ResNote>Suggestions are generated automatically and aren't checked for legal availability or trademark conflicts.</ResNote>
      </Section>

      {/* how it works */}
      <Section title="How the generator works">
        <Reveal className="rs-gen__how">
          {[[<Wand2 size={22} key="a" />, "Your keywords", "We start with the words you enter: what you do, how you want to feel, where you are."],
            [<ListFilter size={22} key="b" />, "Industry & style", "We blend them with word banks tuned to your industry and the tone you picked."],
            [<Sparkles size={22} key="c" />, "Proven patterns", "Names are built with patterns real brands use: compounds, blends, prefixes and suffixes."]].map(([ic, t, d], i) => (
            <div key={t} style={{ "--i": i }}><span>{ic}</span><em>{i + 1}</em><b>{t}</b><small>{d}</small></div>
          ))}
        </Reveal>
      </Section>

      {/* pick method */}
      <Section id="rs-pick" tone="soft" title="The 10-3-1 method for picking a winner" subtitle="Turn a long list into one confident choice.">
        <Reveal className="rs-funnel">
          <div style={{ "--w": "100%" }}><b>10</b><span>Shortlist ten names you like at first glance. Don't overthink it.</span></div>
          <div style={{ "--w": "78%" }}><b>3</b><span>Say each aloud, spell it for a friend and check availability. Keep the best three.</span></div>
          <div style={{ "--w": "56%" }}><b>1</b><Trophy size={18} /><span>Ask a few target customers which they remember a day later. That's your name.</span></div>
        </Reveal>
        <p className="lf-small">Want the theory behind great names? Read our guide to <Link to="/resources/learn/business-name">picking a business name</Link>.</p>
      </Section>

      <FaqBlock faqs={FAQS} title="Name generator FAQs" variant="accordion" />

      <Section tone="gray">
        <RelatedLinks items={FREE_TOOLS} current={PATH} title="More free tools" hub={HUBS.tools} />
      </Section>

      <ServiceFooter />
    </div>
  );
}

