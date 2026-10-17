import { useEffect, useMemo, useState } from "react";
import {
  Check, X, ArrowRight, Search, ShieldCheck, AlertTriangle, Sparkles, Globe, Type, Crown,
  ScanSearch, Ruler, ExternalLink, RotateCcw, Copy, Building2, Clock, Layers, FileSearch, Gavel,
} from "lucide-react";
import Button from "../../../components/common/Button";
import {
  Reveal, ServiceHero, Section, IconCard, StepPath, CompareTable, FaqList, ContactCards, CtaBand, ServiceFooter,
} from "../../../components/service";
import "./NameCheck.css";

/* ---- EDIT THESE ---- */
const LINKS = {
  deepSearch: "/business/trademark-search",
  register: "/business/trademark",
  attorney: "/contact",
  uspto: "https://tmsearch.uspto.gov/",
};

const SAMPLE_NAMES = ["Brightleaf Coffee", "Northwind Labs", "Blue Otter Apparel", "Zentrova"];

/* Words that weaken a name for each kind of business. Lowercase, single words. */
const CATEGORIES = {
  general: { label: "Any / not sure", words: [] },
  food: { label: "Food & drink", words: ["food", "foods", "kitchen", "cafe", "coffee", "bakery", "bake", "pizza", "grill", "eats", "bistro", "tea", "juice", "burger", "catering", "restaurant"] },
  apparel: { label: "Clothing & fashion", words: ["apparel", "clothing", "clothes", "wear", "tees", "fashion", "boutique", "style", "threads", "shoes"] },
  tech: { label: "Software & tech", words: ["tech", "software", "app", "apps", "digital", "data", "cloud", "cyber", "ai", "systems", "labs", "web", "online", "net", "it"] },
  beauty: { label: "Beauty & wellness", words: ["beauty", "salon", "spa", "skin", "skincare", "hair", "nails", "cosmetics", "wellness", "fitness", "gym", "health", "yoga"] },
  services: { label: "Professional services", words: ["consulting", "services", "solutions", "cleaning", "repair", "plumbing", "marketing", "accounting", "legal", "staffing", "construction", "realty", "insurance"] },
  retail: { label: "Retail & e-commerce", words: ["shop", "store", "mart", "goods", "supply", "supplies", "outlet", "market", "deals", "trading"] },
};

const GENERIC = ["company", "co", "inc", "llc", "corp", "group", "enterprises", "business", "services", "solutions", "shop", "store", "products", "the", "and", "of"];
const LAUDATORY = ["best", "top", "premier", "premium", "quality", "elite", "super", "ultimate", "great", "perfect", "first", "pro", "prime", "royal", "number", "one"];
const GEOGRAPHIC = [
  "american", "america", "usa", "us", "national", "global", "international", "world", "worldwide", "united", "states", "northern", "southern", "eastern", "western",
  "alabama", "alaska", "arizona", "arkansas", "california", "colorado", "connecticut", "delaware", "florida", "georgia", "hawaii", "idaho", "illinois", "indiana",
  "iowa", "kansas", "kentucky", "louisiana", "maine", "maryland", "massachusetts", "michigan", "minnesota", "mississippi", "missouri", "montana", "nebraska",
  "nevada", "hampshire", "jersey", "mexico", "york", "carolina", "dakota", "ohio", "oklahoma", "oregon", "pennsylvania", "rhode", "tennessee", "texas", "utah",
  "vermont", "virginia", "washington", "wisconsin", "wyoming", "chicago", "boston", "miami", "dallas", "houston", "atlanta", "seattle", "brooklyn", "manhattan",
];
const FAMOUS = [
  "apple", "google", "nike", "amazon", "cocacola", "coke", "pepsi", "disney", "starbucks", "mcdonalds", "microsoft", "tesla", "facebook", "instagram", "adidas",
  "walmart", "netflix", "uber", "airbnb", "youtube", "samsung", "sony", "toyota", "ford", "chanel", "gucci", "rolex", "lego", "visa", "paypal", "spotify",
  "tiktok", "twitter", "oracle", "intel", "ikea", "nestle", "kodak", "xerox", "harley", "playstation", "xbox", "nintendo", "pokemon", "barbie", "subway",
];

const SCAN_STEPS = ["Reading your name", "Comparing famous brands", "Checking word strength", "Scoring your results"];

/* ---------- quick, offline screening ---------- */
function editDistance(a, b) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
  }
  return dp[a.length][b.length];
}

function analyzeName(raw, category) {
  const name = raw.trim().replace(/\s+/g, " ");
  const words = name.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
  const joined = words.join("");
  const catWords = CATEGORIES[category].words;
  const checks = [];
  let score = 100;

  const famous = FAMOUS.find((f) =>
    joined.includes(f) || words.some((w) => w.length >= 4 && Math.abs(w.length - f.length) <= 1 && editDistance(w, f) <= 1));
  if (famous) {
    score -= 45;
    checks.push({ status: "fail", icon: <Crown size={16} />, title: "Close to a famous brand", text: `Your name looks or sounds like "${famous}". Well-known brands get extra protection, so this is a high-risk choice.` });
  } else {
    checks.push({ status: "pass", icon: <Crown size={16} />, title: "No famous brand match", text: "We didn't spot a close match to well-known brands on our list." });
  }

  const generic = words.filter((w) => GENERIC.includes(w) || catWords.includes(w));
  const core = words.filter((w) => !GENERIC.includes(w) && !catWords.includes(w));
  if (core.length === 0) {
    score -= 40;
    checks.push({ status: "fail", icon: <Type size={16} />, title: "Only common or descriptive words", text: "Every word just describes the business. Names like this are usually refused because no one can own plain descriptions." });
  } else if (generic.length) {
    score -= 10;
    checks.push({ status: "warn", icon: <Type size={16} />, title: "Includes descriptive words", text: `"${[...new Set(generic)].join(", ")}" describe what you do. That's fine, but you'd likely have to disclaim them. Your protection rests on "${core.join(" ")}".` });
  } else {
    checks.push({ status: "pass", icon: <Type size={16} />, title: "Not merely descriptive", text: "The words don't simply describe your goods or services, which helps a lot." });
  }

  const lauds = words.filter((w) => LAUDATORY.includes(w));
  const geos = words.filter((w) => GEOGRAPHIC.includes(w));
  if (lauds.length || geos.length) {
    score -= 10 * Math.min(lauds.length + geos.length, 2);
    const parts = [];
    if (lauds.length) parts.push(`praise words (${lauds.join(", ")})`);
    if (geos.length) parts.push(`place names (${geos.join(", ")})`);
    checks.push({ status: "warn", icon: <Globe size={16} />, title: "Praise or place words", text: `Contains ${parts.join(" and ")}. These are weak on their own and are often refused or disclaimed.` });
  } else {
    checks.push({ status: "pass", icon: <Globe size={16} />, title: "No praise or place words", text: "No words like \"best\" or state names that examiners treat as weak." });
  }

  const letters = joined.length;
  if (letters < 3) {
    score -= 15;
    checks.push({ status: "warn", icon: <Ruler size={16} />, title: "Very short", text: "Two-letter names and initials are crowded and hard to protect." });
  } else if (letters > 28 || words.length > 5) {
    score -= 8;
    checks.push({ status: "warn", icon: <Ruler size={16} />, title: "Long name", text: "Long names are harder for customers to remember. Consider a shorter core brand." });
  } else {
    checks.push({ status: "pass", icon: <Ruler size={16} />, title: "Good length", text: "Easy to say, spell and remember." });
  }

  const invented = core.some((w) => w.length >= 5 && !/(ing|er|ers|ly|s)$/.test(w));
  if (!famous && core.length && invented && !lauds.length && !geos.length) score = Math.min(100, score + 5);

  score = Math.max(5, Math.min(97, score));
  const verdict = score >= 75 ? "good" : score >= 45 ? "fair" : "risky";
  return { name, score, verdict, checks };
}

const VERDICTS = {
  good: { label: "Looks promising", text: "No obvious red flags. Next, confirm it against official USPTO records before you invest in the brand." },
  fair: { label: "Some concerns", text: "Usable, but parts of this name are weak. A deep search will show whether anyone else already claims something similar." },
  risky: { label: "High risk", text: "This name has issues that often lead to refusal or disputes. Consider a more distinctive name, or talk to us first." },
};

/* ---------- animated score ring ---------- */
function ScoreRing({ score, verdict }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / 1100, 1);
      setN(Math.round(score * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [score]);
  const c = 2 * Math.PI * 34;
  return (
    <div className={`nc-ring is-${verdict}`}>
      <svg viewBox="0 0 80 80" aria-hidden="true">
        <circle cx="40" cy="40" r="34" className="nc-ring__track" />
        <circle cx="40" cy="40" r="34" className="nc-ring__bar" strokeDasharray={c} strokeDashoffset={c * (1 - n / 100)} />
      </svg>
      <strong>{n}</strong>
      <small>/ 100</small>
    </div>
  );
}

/* ---------- the checker (hero card) ---------- */
function NameChecker() {
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("general");
  const [checking, setChecking] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [result, setResult] = useState(null);
  const [hint, setHint] = useState(0);
  const [copied, setCopied] = useState(false);
  const phase = !checking ? "idle" : scanStep < SCAN_STEPS.length ? "scanning" : "done";

  // Rotate the example in the placeholder while the box is empty.
  useEffect(() => {
    if (value || phase !== "idle") return undefined;
    const id = setInterval(() => setHint((h) => h + 1), 2600);
    return () => clearInterval(id);
  }, [value, phase]);

  // Walk the scan steps, then show the result.
  useEffect(() => {
    if (phase !== "scanning") return undefined;
    const id = setTimeout(() => setScanStep((s) => s + 1), 520);
    return () => clearTimeout(id);
  }, [phase, scanStep]);

  const submit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    setResult(analyzeName(value, category));
    setScanStep(0);
    setCopied(false);
    setChecking(true);
  };

  const reset = () => { setChecking(false); setResult(null); setValue(""); };

  const copyAndOpen = () => {
    navigator.clipboard?.writeText(result.name).then(() => setCopied(true)).catch(() => {});
  };

  const domain = result ? result.name.toLowerCase().replace(/[^a-z0-9]/g, "") : "";

  return (
    <div className={`nc-card is-${phase}`}>
      <div className="nc-card__top">
        <span className="nc-card__icon"><ScanSearch size={20} /></span>
        <div>
          <strong>Quick Name Check</strong>
          <small>Free · instant · no sign-up</small>
        </div>
      </div>

      {phase === "idle" && (
        <form className="nc-form" onSubmit={submit}>
          <label htmlFor="nc-name">Business or brand name</label>
          <div className="nc-input">
            <Search size={18} />
            <input
              id="nc-name"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={`e.g. ${SAMPLE_NAMES[hint % SAMPLE_NAMES.length]}`}
              maxLength={60}
              autoComplete="off"
            />
          </div>
          <label htmlFor="nc-cat">What do you sell?</label>
          <select id="nc-cat" value={category} onChange={(e) => setCategory(e.target.value)}>
            {Object.entries(CATEGORIES).map(([k, c]) => <option key={k} value={k}>{c.label}</option>)}
          </select>
          <Button type="submit" className="nc-form__btn" disabled={!value.trim()}>
            Check my name <ArrowRight size={18} />
          </Button>
          <p className="nc-card__note">A quick screening, not a legal search.</p>
        </form>
      )}

      {phase === "scanning" && (
        <div className="nc-scan" aria-live="polite">
          <div className="nc-radar"><span className="nc-radar__sweep" /><Search size={22} /></div>
          <p className="nc-scan__name">“{result.name}”</p>
          <ul>
            {SCAN_STEPS.map((s, i) => (
              <li key={s} className={i < scanStep ? "is-done" : i === scanStep ? "is-active" : ""}>
                <span>{i < scanStep ? <Check size={13} /> : i + 1}</span>{s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {phase === "done" && result && (
        <div className="nc-result" aria-live="polite">
          <div className="nc-result__head">
            <ScoreRing score={result.score} verdict={result.verdict} />
            <div>
              <small>RESULT FOR</small>
              <h3>{result.name}</h3>
              <span className={`nc-badge is-${result.verdict}`}>{VERDICTS[result.verdict].label}</span>
            </div>
          </div>
          <p className="nc-result__text">{VERDICTS[result.verdict].text}</p>
          <ul className="nc-checks">
            {result.checks.map((c, i) => (
              <li key={c.title} className={`is-${c.status}`} style={{ "--i": i }}>
                <span className="nc-checks__state">
                  {c.status === "pass" ? <Check size={13} /> : c.status === "warn" ? <AlertTriangle size={13} /> : <X size={13} />}
                </span>
                <div><strong>{c.title}</strong><small>{c.text}</small></div>
              </li>
            ))}
          </ul>
          <div className="nc-next">
            <a href={LINKS.uspto} target="_blank" rel="noopener noreferrer" onClick={copyAndOpen}>
              <FileSearch size={16} /> {copied ? "Name copied! Paste it in USPTO search" : "Search USPTO records"} <ExternalLink size={13} />
            </a>
            {domain && (
              <a href={`https://www.whois.com/whois/${domain}.com`} target="_blank" rel="noopener noreferrer">
                <Globe size={16} /> Is {domain}.com taken? <ExternalLink size={13} />
              </a>
            )}
          </div>
          <Button to={LINKS.deepSearch} className="nc-form__btn">Get a deep trademark search <ArrowRight size={18} /></Button>
          <button type="button" className="nc-reset" onClick={reset}><RotateCcw size={14} /> Check another name</button>
        </div>
      )}
    </div>
  );
}

/* ---------- strength spectrum ---------- */
const SPECTRUM = [
  { id: "generic", label: "Generic", example: "\"Shoes\" for a shoe store", note: "Can never be registered." },
  { id: "descriptive", label: "Descriptive", example: "\"Fresh Bakes\" for a bakery", note: "Hard to register without years of use." },
  { id: "suggestive", label: "Suggestive", example: "\"Greyhound\" for buses", note: "Hints at the product. Usually registrable." },
  { id: "arbitrary", label: "Arbitrary", example: "\"Apple\" for computers", note: "Real word, unrelated use. Strong." },
  { id: "fanciful", label: "Fanciful", example: "\"Kodak\" for cameras", note: "Invented word. The strongest kind." },
];

function StrengthSpectrum() {
  const [active, setActive] = useState(4);
  const pos = useMemo(() => ((active + 0.5) / SPECTRUM.length) * 100, [active]);
  const s = SPECTRUM[active];
  return (
    <div className="nc-spectrum">
      <div className="nc-spectrum__bar">
        <span className="nc-spectrum__marker" style={{ left: `${pos}%` }} />
      </div>
      <div className="nc-spectrum__labels" role="tablist">
        {SPECTRUM.map((x, i) => (
          <button key={x.id} type="button" role="tab" aria-selected={i === active} className={i === active ? "is-selected" : ""} onClick={() => setActive(i)}>
            {x.label}
          </button>
        ))}
      </div>
      <div className="nc-spectrum__ends"><span>Weakest</span><span>Strongest</span></div>
      <div className="nc-spectrum__panel" key={s.id}>
        <strong>{s.example}</strong>
        <p>{s.note}</p>
      </div>
    </div>
  );
}

/* ---------- page content ---------- */
const looksAt = [
  { icon: <Crown size={24} />, title: "Famous brand look-alikes", text: "Names that look or sound like big brands draw extra scrutiny and legal risk." },
  { icon: <Type size={24} />, title: "Descriptive words", text: "Words that just describe what you sell are weak and often refused." },
  { icon: <Globe size={24} />, title: "Praise and place words", text: "Terms like \"Best\" or \"Texas\" rarely work as the main part of a mark." },
  { icon: <Ruler size={24} />, title: "Length and memorability", text: "Very short or very long names are harder to protect and to remember." },
];

const steps = [
  { icon: <Sparkles size={20} />, title: "Run a free name check", text: "Screen your idea in seconds and weed out names with obvious problems." },
  { icon: <FileSearch size={20} />, title: "Order a deep search", text: "We search federal, state and common-law sources for similar names and send a plain-language report." },
  { icon: <ShieldCheck size={20} />, title: "Register your trademark", text: "Once you're confident, we prepare and file your application with the USPTO." },
];

const compareCols = ["", "Quick Free Name Check", "Deep Trademark Search"];
const compareRows = [
  ["Instant results", true, false],
  ["Spots weak and descriptive words", true, true],
  ["Famous brand look-alike screening", true, true],
  ["Searches federal USPTO records", false, true],
  ["State registrations and common-law use", false, true],
  ["Similar spellings and sound-alikes", "Basic", true],
  ["Written report with risk rating", false, true],
  ["Cost", "Free", "See plans"],
];

const whySearch = [
  { icon: <Gavel size={22} />, title: "Avoid disputes", text: "Using a name someone already owns can mean a cease-and-desist or a forced rebrand." },
  { icon: <Clock size={22} />, title: "Save months", text: "A refused application can cost you a year of waiting. Find problems first." },
  { icon: <Layers size={22} />, title: "Protect your spend", text: "Don't print signs, packaging and ads for a name you can't keep." },
  { icon: <Building2 size={22} />, title: "Plan your next step", text: "Know whether to register, adjust the name or pick a new one." },
  { icon: <Copy size={22} />, title: "Spot copycats", text: "See who else uses similar names in your industry." },
  { icon: <ShieldCheck size={22} />, title: "File with confidence", text: "Go into your trademark filing knowing the path is clear." },
];

const faqs = [
  ["Is this name check really free?", "Yes. There's no cost and no sign-up. It's a quick screening tool to help you spot obvious problems before paying for a full search or filing."],
  ["Does the free check search the USPTO database?", "No. It screens the name itself for common weaknesses and famous brand look-alikes. To check official records, use the USPTO link in your results or order a deep trademark search."],
  ["My name scored well. Can I start using it?", "A good score means we didn't find obvious red flags, not that the name is available. Someone could still have a similar registered or unregistered mark, so confirm with a full search first."],
  ["Is a business name the same as a trademark?", "No. Registering an LLC or corporation name with your state doesn't give you trademark rights. A trademark protects your brand for the goods or services you sell, nationwide if federally registered."],
  ["What does a deep trademark search include?", "We look through federal USPTO records, state registrations and common-law sources such as websites and directories for similar names, spellings and sound-alikes, then send a report in plain language."],
  ["What if my name is too similar to another mark?", "It depends on how close the names are and whether the goods or services are related. Small changes are sometimes enough. We can help you weigh options before you file."],
];

export default function NameCheck() {
  return (
    <div className="svc nc-page">
      <ServiceHero
        crumbs={[{ label: "Home", to: "/" }, { label: "Business", to: "/business" }, { label: "Quick Free Name Check" }]}
        title="Free business name & trademark check"
        subtitle={<>Got a name in mind? Check it in seconds. We'll flag famous look-alikes and weak words so you can pick a stronger brand before you <strong>register a trademark</strong>.</>}
        actions={<>
          <a href="#nc-name" className="svc-ghost-btn" onClick={() => document.getElementById("nc-name")?.focus()}>Start free check</a>
          <Button to={LINKS.deepSearch}>Get a deep search <ArrowRight size={18} /></Button>
        </>}
        visual={<NameChecker />}
      />

      <Section title="What our free check looks at" subtitle="A fast first pass on the things that most often sink a new brand name.">
        <Reveal className="svc-grid svc-grid-4 svc-mt">
          {looksAt.map((r, i) => <IconCard key={r.title} {...r} style={{ "--i": i }} />)}
        </Reveal>
      </Section>

      <Section tone="gray" title="How strong is your name?" subtitle="Trademarks fall on a scale from weak to strong. Tap each one to see an example.">
        <Reveal><StrengthSpectrum /></Reveal>
      </Section>

      <Section title="From idea to protected brand" subtitle="The free check is step one. Here's the path most businesses take.">
        <StepPath steps={steps} />
        <div className="svc-center"><Button to={LINKS.deepSearch}>Order a deep search <ArrowRight size={18} /></Button></div>
      </Section>

      <Section tone="soft" title="Free check vs. deep trademark search" subtitle="Use the free check to narrow your ideas. Use a deep search before you commit.">
        <Reveal><CompareTable columns={compareCols} rows={compareRows} highlight={2} /></Reveal>
      </Section>

      <Section title="Why search before you launch?" subtitle="A few minutes now can save a costly rebrand later.">
        <Reveal className="svc-grid svc-grid-3">
          {whySearch.map((b, i) => <IconCard key={b.title} variant="tile" {...b} style={{ "--i": i }} />)}
        </Reveal>
      </Section>

      <FaqList faqs={faqs} />
      <CtaBand title="Found a name you love? Make sure it's yours." label="Register my trademark" to={LINKS.register} />
      <ContactCards helpTo={LINKS.attorney} />
      <ServiceFooter
        disclaimer="The Quick Free Name Check is an automated screening tool for general information only. It does not search USPTO, state or common-law records and does not mean a name is available or registrable. Leader Business Developer is an independent business-services provider, not a law firm or government agency, and does not give legal advice."
      />
    </div>
  );
}
