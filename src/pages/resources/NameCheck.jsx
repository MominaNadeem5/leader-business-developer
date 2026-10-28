import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowRight, Building2, Hash, Globe, AtSign, ExternalLink, Check, X, HelpCircle, AlertTriangle, PlusCircle, Repeat, Store, Handshake,
  Search, ShieldCheck, Clock, FileSearch, Gavel, Layers, Lightbulb, MapPin, RotateCcw, PencilLine, Sparkles, Type,
} from "lucide-react";
import Seo from "../../components/common/Seo";
import ServiceHero from "../../components/service/ServiceHero";
import { Reveal, Section, IconCard, StepPath, ServiceFooter, CtaBand } from "../../components/service";
import { FaqBlock, RelatedLinks } from "./ResBits";
import { RadarVisual } from "./ResourcesVisual";
import { RES_SEO, FREE_TOOLS, HUBS } from "./resources";
import {
  US_STATES, ENTITIES, HAS_API, validateForm, checkAvailability, variations, slugOf, coreName, registryLink, hasDirectRegistryLink,
} from "./availability";
import "../forms/Forms.css";
import "./Resources.css";
import "./NameCheck.css";

const PATH = "/resources/tools/name-check";
const STEPS_LOADING = (state) => ["Preparing your name", `Applying ${state || "state"} naming rules`, HAS_API ? "Searching the state registry" : "Screening for common problems", "Putting your results together"];

const FAQS = [
  ["Is this check the same as a search of my state's records?", HAS_API
    ? "When our lookup service can read your state's registry, the result says so and names the source. If it can't, we tell you the name is not confirmed instead of guessing."
    : "Not yet. From a webpage we can't read official state databases, so we screen your name against common naming rules and send you to your state's official search to confirm. We only call a name available when the registry has actually been checked."],
  ["If my name is available in my state, can I use it everywhere?", "Not necessarily. State availability only means no other entity in that state has registered the same or a confusingly similar name. Someone may hold a federal trademark or use the name in another state, which can still cause conflicts."],
  ["What counts as “too similar” to an existing name?", "States usually reject names that differ only by punctuation, spacing, “The”, or the LLC/Inc. ending. Trademark law is broader: it asks whether customers could be confused, based on how the names look, sound and what they sell."],
  ["Does checking a name reserve it?", "No. A check never holds a name. Until your formation documents are accepted (or you file a separate name reservation, where your state offers one), anyone can register it. If you've found a good one, move quickly."],
  ["Do I have to include “LLC” or “Inc.” in the name?", "Almost always. Most states require an LLC name to include “LLC” or “Limited Liability Company”, and a corporation name to include a word like “Inc.”, “Corp.” or “Company”. We show this in your results."],
  ["What should I do if my preferred name is taken?", "Try a modifier (a city, a descriptive word or “Co.”), a natural variation, or a new name. If you're set on it, you can also register under another name and operate under yours with a DBA, or ask us to review the conflict."],
];

const HOW = [
  { icon: <PencilLine size={20} />, title: "Enter your name and state", text: "Choose your entity type, type the name exactly as you want it on the filing, and pick the state." },
  { icon: <Search size={20} />, title: "We screen it", text: "We check it against your state's naming rules and, when a registry lookup is available, against existing entities." },
  { icon: <ShieldCheck size={20} />, title: "Get a clear result and next step", text: "See whether the name is available, taken or needs confirming, then continue to file or adjust the name." },
];

const WHY = [
  { icon: <Gavel size={22} />, title: "Avoid a rejected filing", text: "A name conflict is one of the most common reasons states send a filing back." },
  { icon: <Clock size={22} />, title: "Save weeks", text: "Fixing a name before you file is far quicker than refiling after a rejection." },
  { icon: <Layers size={22} />, title: "Protect your branding spend", text: "Don't print signs, cards or a website for a name you might not be able to register." },
  { icon: <Building2 size={22} />, title: "Know the rules up front", text: "See required endings and restricted words for your entity type before you commit." },
  { icon: <Globe size={22} />, title: "Plan for the whole brand", text: "Get quick links to check the trademark, domain and social handles at the same time." },
  { icon: <Sparkles size={22} />, title: "Free, with no sign-up", text: "Check as many names as you like. Nothing is saved or shared." },
];

const TIPS = [
  ["Make it distinctive", "A made-up or unusual name is easier to register and easier to protect than plain descriptions like “Austin Cleaning Company”."],
  ["Keep it easy to say and spell", "If you have to spell it out on the phone, customers will mistype your website and email too."],
  ["Include the right ending", "Add LLC, Inc. or the ending your state requires. It's part of the legal name."],
  ["Avoid restricted words", "Words like bank, insurance, trust or university often need a license or approval."],
  ["Think beyond the state", "Check the trademark, the .com and the social handles before you fall in love with a name."],
  ["Have two or three backups", "If your first choice is taken, you can move straight to the next without starting over."],
];

const OPTIONS = [
  [<PlusCircle size={22} key="a" />, "Add a modifier", "Add your city, a descriptive word or a suffix to set it apart."],
  [<Repeat size={22} key="b" />, "Try a variation", "Swap a word for a synonym or reorder it, without misspellings."],
  [<Store size={22} key="c" />, "Use a DBA", "Register under one name and trade under another available brand name."],
  [<Handshake size={22} key="d" />, "Ask for a review", "Our team can look at whether an existing name really conflicts with yours."],
];

const STATUS_VIEW = {
  available: { icon: <Check size={26} />, label: "Available" },
  unavailable: { icon: <X size={26} />, label: "Not available" },
  uncertain: { icon: <HelpCircle size={26} />, label: "Not confirmed yet" },
};

const filingLink = (v) => (v.entity === "llc"
  ? `/get-started/llc?state=${encodeURIComponent(v.state)}&name=${encodeURIComponent(v.name.trim())}`
  : `/get-started?entity=corporation&state=${encodeURIComponent(v.state)}`);

function Loading({ snap }) {
  const steps = STEPS_LOADING(snap.state);
  const [i, setI] = useState(0);
  useEffect(() => {
    if (i >= steps.length - 1) return undefined;
    const t = setTimeout(() => setI((s) => s + 1), 520);
    return () => clearTimeout(t);
  }, [i, steps.length]);
  return (
    <div className="rs-av-loading" role="status" aria-live="polite">
      <span className="rs-av-spinner" aria-hidden="true" />
      <h2>Checking “{snap.name.trim()}”</h2>
      <ul>
        {steps.map((s, n) => (
          <li key={s} className={n < i ? "is-done" : n === i ? "is-active" : ""}>
            <span>{n < i ? <Check size={12} strokeWidth={3} /> : n + 1}</span>{s}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Result({ result, snap, onPick, onEdit, headingRef }) {
  const { status, screen } = result;
  const view = STATUS_VIEW[status];
  const entity = ENTITIES.find((e) => e.id === snap.entity);
  const rules = result.reason === "rules";
  const slug = slugOf(snap.name);
  const alts = status === "available" ? [] : variations(snap.name, snap.state, snap.entity);

  const lead = {
    available: `We found no matching or confusingly similar ${entity.label} name in ${result.source} when we checked. Names can be registered by someone else at any time, so file soon.`,
    unavailable: rules
      ? "This name breaks a naming rule, so a state would very likely reject it as written. Fix the items below, then check again."
      : `${result.source} shows an existing name that matches or is very close to this one, so you can't register it as is.`,
    uncertain: `This name passed our naming-rule screening, but we can't read ${snap.state}'s official records from this page, so we can't say it's available. Confirm it in the state's own search below, or let our team check before you file.`,
  }[status];
  const label = status === "available" ? `Available in ${snap.state}` : status === "unavailable" ? (rules ? "Can't be filed as written" : `Taken in ${snap.state}`) : view.label;

  const rows = [...screen.items];
  if (result.verified) rows.push({ level: "pass", title: `${snap.state} registry checked`, text: `Searched ${result.source}${result.checkedAt ? ` on ${new Date(result.checkedAt).toLocaleDateString(undefined, { dateStyle: "medium" })}` : ""}.` });
  else rows.push({ level: "todo", title: `${snap.state} registry not checked`, text: "Official state records haven't been searched, which is the check that decides if a name is available." });

  const ICON = { block: <X size={13} />, warn: <AlertTriangle size={13} />, pass: <Check size={13} />, todo: <Clock size={13} /> };

  return (
    <div className={`rs-av-result is-${status}`}>
      <div className="rs-av-result__head">
        <span className="rs-av-result__icon" aria-hidden="true">{view.icon}</span>
        <div>
          <small><MapPin size={12} /> {snap.state} · {entity.label}</small>
          <h2 ref={headingRef} tabIndex={-1}>{snap.name.trim()}</h2>
          <span className="rs-av-badge">{label}</span>
        </div>
      </div>
      <p className="rs-av-result__lead" role="status" aria-live="polite">{lead}{result.message ? ` ${result.message}` : ""}</p>

      <div className="rs-av-result__cols">
        <div>
          <h3>What we checked</h3>
          <ul className="rs-av-list">
            {rows.map((r, i) => (
              <li key={r.title} className={`is-${r.level}`} style={{ "--i": i }}>
                <span>{ICON[r.level]}</span>
                <div><strong>{r.title}</strong><small>{r.text}</small></div>
              </li>
            ))}
          </ul>

          {result.similar.length > 0 && (
            <>
              <h3>Similar names on record</h3>
              <ul className="rs-av-similar">
                {result.similar.map((s) => <li key={s.name}>{s.name}{s.status && <em>{s.status}</em>}</li>)}
              </ul>
            </>
          )}

          {alts.length > 0 && (
            <>
              <h3>{status === "uncertain" ? "Want a backup? Try a variation" : "Try one of these instead"}</h3>
              <div className="rs-av-chips">
                {alts.map((a) => <button key={a} type="button" onClick={() => onPick(a)}><Search size={13} />{a}</button>)}
              </div>
            </>
          )}
        </div>

        <aside className="rs-av-next">
          <h3>Your next step</h3>
          {status === "available" && (
            <>
              <Link to={filingLink(snap)} className="lf-btn">Start my {entity.label} <ArrowRight size={16} /></Link>
              <p>We'll carry your name and state into the application and confirm the name again when we prepare your filing.</p>
            </>
          )}
          {status === "uncertain" && (
            <>
              <a href={registryLink(snap.state)} target="_blank" rel="noopener noreferrer" className="lf-btn">
                {hasDirectRegistryLink(snap.state) ? `Search ${snap.state} records` : `Find ${snap.state} business search`} <ExternalLink size={15} />
              </a>
              <Link to={filingLink(snap)} className="svc-ghost-btn">Start my {entity.label} anyway</Link>
              <p>Search the official records for your exact name and close variations. We'll also review the name for conflicts before we file anything.</p>
            </>
          )}
          {status === "unavailable" && (
            <>
              <button type="button" className="lf-btn" onClick={onEdit}><PencilLine size={16} /> Change the name</button>
              <Link to="/resources/tools/name-generator" className="svc-ghost-btn">Get name ideas</Link>
              <p>{rules ? "Most naming-rule problems are quick to fix. Adjust the name and check again." : "Try a variation, or talk to us about a DBA or a review of the conflict."}</p>
            </>
          )}
          <button type="button" className="rs-av-link" onClick={onEdit}><RotateCcw size={14} /> Check another name</button>

          <div className="rs-av-also">
            <h4>Also check before you commit</h4>
            <a href="https://tmsearch.uspto.gov/" target="_blank" rel="noopener noreferrer"><Hash size={15} /> USPTO trademark search <ExternalLink size={12} /></a>
            <a href={`https://lookup.icann.org/en/lookup?name=${slug || "example"}.com`} target="_blank" rel="noopener noreferrer"><Globe size={15} /> Look up {slug || "name"}.com <ExternalLink size={12} /></a>
            <a href={`https://www.instagram.com/${slug}`} target="_blank" rel="noopener noreferrer"><AtSign size={15} /> Instagram @{slug || "name"} <ExternalLink size={12} /></a>
            <Link to="/business/free-name-check"><Type size={15} /> Free trademark screening <ArrowRight size={12} /></Link>
          </div>
        </aside>
      </div>

      <p className="rs-av-result__meta">
        Source: {result.source}. {result.verified ? "Names can change status at any time. " : ""}This is not legal advice and isn't a guarantee a state will approve your filing.
      </p>
    </div>
  );
}

export default function NameCheck() {
  const [params] = useSearchParams();
  const initState = US_STATES.includes(params.get("state")) ? params.get("state") : "";
  const initEntity = ENTITIES.some((e) => e.id === params.get("entity")) ? params.get("entity") : "llc";

  const [form, setForm] = useState({ name: (params.get("name") || "").slice(0, 120), state: initState, entity: initEntity });
  const [tried, setTried] = useState(false);
  const [phase, setPhase] = useState("idle"); // idle | loading | done | error
  const [snap, setSnap] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const abortRef = useRef(null);
  const resultsRef = useRef(null);
  const headingRef = useRef(null);
  const nameRef = useRef(null);
  const autoRan = useRef(false);

  const errors = validateForm(form);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const run = async (vals) => {
    abortRef.current?.abort();
    const ctl = new AbortController();
    abortRef.current = ctl;
    setSnap(vals);
    setResult(null);
    setError("");
    setPhase("loading");
    try {
      const r = await checkAvailability(vals, ctl.signal);
      if (ctl.signal.aborted) return;
      setResult(r);
      setPhase("done");
    } catch (e) {
      if (e.name === "AbortError") return;
      setError(e.message || "Something went wrong. Please try again.");
      setPhase("error");
    }
  };

  const submit = (e) => {
    e?.preventDefault();
    setTried(true);
    if (Object.keys(errors).length) {
      document.querySelector(errors.name ? "#rs-av-name" : "#rs-av-state")?.focus();
      return;
    }
    run({ ...form });
  };

  // Links like ?name=Acme&state=Texas run the check straight away. Name-only links just prefill the form.
  useEffect(() => {
    if (autoRan.current) return;
    autoRan.current = true;
    // Dev only: ?preview=available|unavailable|uncertain shows each result design without a backend.
    const pre = import.meta.env.DEV && params.get("preview");
    /* eslint-disable react-hooks/set-state-in-effect -- one-time start of a check from the URL */
    if (pre) run({ name: form.name || "Brightleaf Bakery LLC", state: form.state || "Texas", entity: form.entity, preview: pre });
    else if (form.name.trim() && form.state) run({ ...form });
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Bring the results into view, and move focus to the name for screen readers once they're ready.
  useEffect(() => {
    if (phase === "idle") return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    resultsRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    if (phase === "done") headingRef.current?.focus({ preventScroll: true });
  }, [phase]);

  const pick = (name) => {
    const next = { ...form, name };
    setForm(next);
    setTried(true);
    run(next);
  };

  const edit = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    nameRef.current?.focus({ preventScroll: true });
    nameRef.current?.select();
  };

  const showErr = (k) => (tried ? errors[k] : undefined);
  const core = coreName(form.name);

  const hero = (
    <form className="rs-av-form" onSubmit={submit} noValidate>
      <div className="rs-av-seg" role="radiogroup" aria-label="Entity type">
        {ENTITIES.map((en) => (
          <label key={en.id} className={form.entity === en.id ? "is-on" : ""}>
            <input type="radio" name="entity" value={en.id} checked={form.entity === en.id} onChange={() => set("entity", en.id)} />
            {en.label}
          </label>
        ))}
      </div>

      <div className="rs-av-row">
        <div className={`rs-av-field ${showErr("name") ? "has-error" : ""}`}>
          <label htmlFor="rs-av-name">Business name</label>
          <div className="rs-av-input">
            <Search size={18} aria-hidden="true" />
            <input
              id="rs-av-name" ref={nameRef} value={form.name} maxLength={120} autoComplete="off"
              placeholder={form.entity === "llc" ? "e.g. Brightleaf Bakery LLC" : "e.g. Brightleaf Bakery, Inc."}
              onChange={(e) => set("name", e.target.value)}
              aria-invalid={showErr("name") ? true : undefined} aria-describedby={showErr("name") ? "rs-av-name-err" : undefined}
            />
          </div>
          {showErr("name") && <p id="rs-av-name-err" className="rs-av-err" role="alert"><AlertTriangle size={14} />{errors.name}</p>}
        </div>

        <div className={`rs-av-field rs-av-field--state ${showErr("state") ? "has-error" : ""}`}>
          <label htmlFor="rs-av-state">State</label>
          <select
            id="rs-av-state" value={form.state} onChange={(e) => set("state", e.target.value)}
            aria-invalid={showErr("state") ? true : undefined} aria-describedby={showErr("state") ? "rs-av-state-err" : undefined}
          >
            <option value="">Select state</option>
            {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          {showErr("state") && <p id="rs-av-state-err" className="rs-av-err" role="alert"><AlertTriangle size={14} />{errors.state}</p>}
        </div>
      </div>

      <button type="submit" className="rs-av-submit" disabled={phase === "loading"}>
        {phase === "loading" ? <>Checking<span className="rs-av-dots" aria-hidden="true" /></> : <>Check availability <ArrowRight size={18} /></>}
      </button>
      <p className="rs-av-note">Free, no sign-up. We never claim a name is available unless a state registry has actually been checked.</p>
    </form>
  );

  return (
    <div className="svc mc-page lf-page rs-page rs-namecheck rs-av">
      <Seo {...RES_SEO[PATH]} path={PATH} faqs={FAQS} />

      <ServiceHero
        crumbs={[{ label: "Home", to: "/" }, { label: HUBS.tools.label, to: HUBS.tools.path }, { label: "Name Availability Check" }]}
        title="Check if your business name is available"
        subtitle={<>Search your LLC or corporation name for your state. We screen it against <strong>state naming rules</strong> and tell you exactly what to do next.</>}
        actions={hero}
        showTrust={false}
        visual={<RadarVisual />}
      />

      {phase !== "idle" && (
        <Section id="rs-av-results" tone="gray" className="rs-av-results">
          <div ref={resultsRef} className="rs-av-scroll">
            {phase === "loading" && snap && <Loading snap={snap} />}
            {phase === "error" && (
              <div className="rs-av-error" role="alert">
                <span><AlertTriangle size={26} /></span>
                <h2>We couldn't finish the check</h2>
                <p>{error}</p>
                <div className="lf-actions lf-actions--center">
                  <button type="button" className="lf-btn" onClick={() => run(snap)}><RotateCcw size={16} /> Try again</button>
                  <a href={registryLink(snap.state)} target="_blank" rel="noopener noreferrer" className="svc-ghost-btn">Search {snap.state} records <ExternalLink size={14} /></a>
                </div>
              </div>
            )}
            {phase === "done" && result && <Result result={result} snap={snap} onPick={pick} onEdit={edit} headingRef={headingRef} />}
          </div>
        </Section>
      )}

      <Section title="How the availability check works" subtitle="Three quick steps, and you'll know where your name stands.">
        <StepPath steps={HOW} />
      </Section>

      <Section tone="gray" title="Why check before you file?" subtitle="A few seconds now can save you a rejected filing and a costly rebrand.">
        <Reveal className="svc-grid svc-grid-3 svc-mt">
          {WHY.map((b, i) => <IconCard key={b.title} variant="tile" {...b} style={{ "--i": i }} />)}
        </Reveal>
      </Section>

      <Section title="Tips for choosing a strong business name" subtitle="Good names are easy to register, easy to remember and easy to find online.">
        <Reveal className="rs-av-tips">
          {TIPS.map(([t, d], i) => (
            <div key={t} style={{ "--i": i }}>
              <span><Lightbulb size={18} /></span>
              <div><strong>{t}</strong><small>{d}</small></div>
            </div>
          ))}
        </Reveal>
      </Section>

      <Section id="rs-options" tone="soft" title="Name taken? Your options">
        <Reveal className="rs-options">
          {OPTIONS.map(([ic, t, d], i) => <div key={t} style={{ "--i": i }}><span>{ic}</span><b>{t}</b><small>{d}</small></div>)}
        </Reveal>
        <p className="lf-small">Need fresh ideas? Try the <Link to="/resources/tools/name-generator">business name generator</Link>. Using a brand name? See our <Link to="/forms/legal/dba">DBA guide</Link>.</p>
      </Section>

      <Section tone="gray" title="Also look beyond the state" subtitle={core ? `Quick links for “${core}”.` : "A name has to work in more places than the state registry."}>
        <Reveal className="rs-av-beyond">
          {[
            [<Hash size={20} key="t" />, "Federal trademarks", "A state OK doesn't stop someone holding a trademark on a similar name.", ["USPTO search", "https://tmsearch.uspto.gov/"]],
            [<Globe size={20} key="d" />, "Domain name", "Check the .com or a close, natural variation.", [`Look up ${slugOf(form.name) || "yourname"}.com`, `https://lookup.icann.org/en/lookup?name=${slugOf(form.name) || "example"}.com`]],
            [<AtSign size={20} key="s" />, "Social handles", "Claim the same handle on the platforms your customers use.", ["Instagram", `https://www.instagram.com/${slugOf(form.name)}`]],
            [<FileSearch size={20} key="p" />, "Professional search", "We can run a comprehensive trademark and common-law search.", null],
          ].map(([ic, t, d, link], i) => (
            <article key={t} style={{ "--i": i }}>
              <span>{ic}</span><h3>{t}</h3><p>{d}</p>
              {link
                ? <a href={link[1]} target="_blank" rel="noopener noreferrer">{link[0]} <ExternalLink size={12} /></a>
                : <Link to="/business/trademark-search">Trademark search <ArrowRight size={12} /></Link>}
            </article>
          ))}
        </Reveal>
      </Section>

      <FaqBlock faqs={FAQS} title="Name availability FAQs" variant="grid" />

      <CtaBand title="Found a name you like? Let's make it official." label="Start my LLC" to="/get-started/llc" />
      <Section tone="gray">
        <RelatedLinks items={FREE_TOOLS} current={PATH} title="More free tools" variant="chips" hub={HUBS.tools} />
      </Section>

      <ServiceFooter disclaimer={`Results show whether a name appears to meet naming rules and, where stated, whether a registry search found a conflict. Only your state can approve a name.`} />
    </div>
  );
}
