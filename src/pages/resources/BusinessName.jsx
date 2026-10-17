import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, X, Mic, SpellCheck, Brain, Compass, Expand, Fingerprint, Globe, Building2, Hash, AtSign, Sparkles } from "lucide-react";
import Seo from "../../components/common/Seo";
import { Reveal, Section, ServiceFooter } from "../../components/service";
import { ResHero, FaqBlock, RelatedLinks } from "./ResBits";
import { NameTilesVisual } from "./ResourcesVisual";
import { RES_SEO, RES_DISCLAIMER, LEARN_GUIDES, HUBS } from "./resources";
import "../forms/Forms.css";
import "./Resources.css";

const PATH = "/resources/learn/business-name";

const TRAITS = [
  [<Mic size={18} key="1" />, "Easy to say", "Passes the “radio test”: people can repeat it after hearing it once."],
  [<SpellCheck size={18} key="2" />, "Easy to spell", "No odd spellings that send customers to a competitor's website."],
  [<Brain size={18} key="3" />, "Memorable", "Short, vivid and different from everyone else in your market."],
  [<Compass size={18} key="4" />, "Meaningful", "Hints at your value, personality or the feeling you want to create."],
  [<Expand size={18} key="5" />, "Room to grow", "Won't box you in if you add products or move to a new city."],
  [<Fingerprint size={18} key="6" />, "Distinctive", "Unique enough to protect as a trademark, not just descriptive."],
  [<Globe size={18} key="7" />, "Available", "Clear in your state, with a usable domain and social handles."],
];

const STYLES = {
  descriptive: { label: "Descriptive", ex: "Austin Family Plumbing", pro: "Instantly clear what you do; helps local search.", con: "Hard to trademark and easy to confuse with competitors." },
  compound: { label: "Compound", ex: "BrightLeaf", pro: "Combines real words into something distinctive and friendly.", con: "Popular combos are often already taken." },
  invented: { label: "Invented", ex: "Zentiq", pro: "Highly unique and the easiest to trademark and get a domain for.", con: "Means nothing at first, so it needs marketing to build meaning." },
  metaphor: { label: "Metaphor", ex: "Northstar Advisors", pro: "Evokes a feeling or benefit; memorable storytelling.", con: "Common metaphors are crowded in many industries." },
  founder: { label: "Founder", ex: "Rivera & Sons", pro: "Personal, trustworthy and naturally unique to you.", con: "Harder to sell the business later, and says little about what you do." },
  acronym: { label: "Acronym", ex: "BLX Logistics", pro: "Short and works well for established brands.", con: "Easily forgotten; letters alone rarely build meaning for new businesses." },
};

const SPECTRUM = [
  ["Generic", "“The Bakery”", "Not protectable"],
  ["Descriptive", "“Fresh Bread Co.”", "Weak"],
  ["Suggestive", "“Rise & Shine Bakery”", "Good"],
  ["Arbitrary", "“Granite Bakery”", "Strong"],
  ["Fanciful", "“Brelora”", "Strongest"],
];

const FAQS = [
  ["Should my business name describe what I do?", "It helps people understand you quickly, but purely descriptive names are hard to trademark and easy to confuse with competitors. A good compromise is a distinctive name paired with a descriptive tagline, like “BrightLeaf: Custom Cakes & Pastries”."],
  ["Is registering my LLC name the same as trademarking it?", "No. Registering an LLC only reserves the name with your state's business registry. It doesn't give you trademark rights or stop a business in another state, or a federal trademark owner, from challenging your use. A trademark protects your brand in the marketplace."],
  ["What if the .com domain for my name is taken?", "Consider a small, natural variation such as adding a word (getbrightleaf.com, brightleafbakery.com) before switching to a less familiar extension. Avoid hyphens and creative misspellings that make the address hard to share verbally."],
  ["Can I use my own name as my business name?", "Yes. Sole proprietors can trade under their legal name without registering a DBA. If you add words, like “Jordan Lee Design”, or form an LLC with a different name, you may need to register it."],
  ["How do I know if a name infringes a trademark?", "Search the USPTO's trademark database for identical and similar names in related industries, then run a general web search for unregistered users. Similar-sounding names for similar goods can still conflict. For a name you'll invest heavily in, a professional clearance search is worth it."],
];

function NameScorer() {
  const [name, setName] = useState("BrightLeaf Bakery");
  const n = name.trim();
  const core = n.replace(/\b(llc|inc|co|company|corp)\.?$/i, "").trim();
  const letters = core.replace(/[^a-z]/gi, "");
  const words = core.split(/\s+/).filter(Boolean);
  const vowels = (letters.match(/[aeiouy]/gi) || []).length;
  const ratio = letters.length ? vowels / letters.length : 0;
  const checks = [
    ["Length", letters.length >= 4 && letters.length <= 14 ? 20 : letters.length <= 20 ? 12 : 4, letters.length > 14 ? "Shorter names are easier to remember and fit on a logo." : "Good length."],
    ["Word count", words.length <= 2 ? 15 : words.length === 3 ? 10 : 4, words.length > 3 ? "Try trimming to one or two key words." : "Nice and concise."],
    ["Pronounceable", ratio >= .28 && ratio <= .6 ? 20 : 10, ratio < .28 ? "Few vowels can make it hard to say." : "Flows well when spoken."],
    ["No numbers or hyphens", /[\d-]/.test(core) ? 0 : 15, /[\d-]/.test(core) ? "Numbers and hyphens cause spelling confusion." : "Clean and easy to type."],
    ["Easy to spell", /(.)\1\1|ph|ck|q(?!u)|xx|zz/i.test(letters) ? 8 : 15, "Avoid unusual letter combinations people may misspell."],
    ["Distinctive", /\b(best|quality|services|solutions|pro|global|the)\b/i.test(core) ? 5 : 15, /\b(best|quality|services|solutions|pro|global)\b/i.test(core) ? "Generic words make it harder to stand out or trademark." : "Avoids overused generic words."],
  ];
  const total = n ? checks.reduce((a, c) => a + c[1], 0) : 0;
  const maxes = [20, 15, 20, 15, 15, 15];
  const verdict = total >= 85 ? "Excellent" : total >= 65 ? "Promising" : total >= 45 ? "Needs work" : "Rethink it";

  return (
    <Reveal className="rs-scorer">
      <div className="rs-scorer__in">
        <label className="rs-scorer__field"><span>Type a business name</span><input value={name} maxLength={60} onChange={(e) => setName(e.target.value)} placeholder="e.g. BrightLeaf Bakery" /></label>
        <ul>
          {checks.map(([l, s, tip], i) => (
            <li key={l}><div><b>{l}</b><small>{tip}</small></div><span className="rs-scorer__bar"><i style={{ width: n ? `${(s / maxes[i]) * 100}%` : 0 }} /></span></li>
          ))}
        </ul>
      </div>
      <div className="rs-scorer__out" aria-live="polite">
        <div className="rs-scorer__num" style={{ "--p": total / 100 }}><b>{total}</b><small>/100</small></div>
        <h3>{n ? verdict : "Type a name"}</h3>
        <p>This scores how easy the name is to say, spell and remember. It doesn't check legal availability.</p>
        <Link to={`/resources/tools/name-check${n ? `?name=${encodeURIComponent(n)}` : ""}`} className="lf-btn lf-btn--sm">Check availability <ArrowRight size={15} /></Link>
      </div>
    </Reveal>
  );
}

export default function BusinessName() {
  const [style, setStyle] = useState("compound");
  const st = STYLES[style];

  return (
    <div className="svc mc-page lf-page rs-page rs-name">
      <Seo {...RES_SEO[PATH]} path={PATH} faqs={FAQS} />

      <ResHero
        hub={HUBS.learn}
        label="Picking a Business Name"
        title="Picking a business name customers remember and you can protect"
        subtitle={<>A great name is easy to say, hard to forget and <strong>legally yours to use</strong>. Learn what makes names work, score your ideas, and run the checks that prevent a costly rebrand later.</>}
        primary={{ label: "Score my name", href: "#rs-scorer" }}
        secondary={{ label: "Generate ideas", to: "/resources/tools/name-generator" }}
        visual={<NameTilesVisual />}
      />

      {/* intro + traits */}
      <Section>
        <div className="rs-name__intro">
          <div>
            <h2>Why your name matters more than you think</h2>
            <p>Your business name appears on everything: your website, invoices, signage, social profiles and every conversation where someone recommends you. It shapes first impressions and how easily customers find you again. Changing it later means new signage, a new domain, lost search rankings and confused customers, so a little extra care up front pays off.</p>
            <p>The best names balance creativity with practicality. They're memorable without being confusing, meaningful without being generic, and, crucially, legally available in your state and free of trademark conflicts.</p>
          </div>
          <Reveal className="rs-traits">
            <h3>7 traits of a strong name</h3>
            {TRAITS.map(([ic, t, d], i) => <div key={t} style={{ "--i": i }}><span>{ic}</span><b>{t}</b><small>{d}</small></div>)}
          </Reveal>
        </div>
      </Section>

      {/* scorer */}
      <Section id="rs-scorer" tone="gray" title="Free business name scorer" subtitle="Test any name idea and see where it shines and where it could improve.">
        <NameScorer />
      </Section>

      {/* styles */}
      <Section title="Six naming styles to explore" subtitle="Most great names fall into one of these styles. Pick one to see the trade-offs.">
        <Reveal className="rs-styles">
          <div className="rs-styles__tabs" role="tablist">
            {Object.entries(STYLES).map(([k, x]) => <button key={k} type="button" role="tab" aria-selected={style === k} className={style === k ? "is-on" : ""} onClick={() => setStyle(k)}>{x.label}</button>)}
          </div>
          <div className="rs-styles__card" key={style}>
            <span className="rs-styles__ex">{st.ex}</span>
            <div className="rs-styles__pc">
              <p><Check size={16} /><span><b>Pros:</b> {st.pro}</span></p>
              <p><X size={16} /><span><b>Cons:</b> {st.con}</span></p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* spectrum */}
      <Section tone="soft" title="The trademark strength spectrum" subtitle="The more distinctive the name, the easier it is to protect, using a bakery as the example.">
        <Reveal className="rs-spec">
          {SPECTRUM.map(([t, ex, s], i) => <div key={t} style={{ "--i": i }}><b>{t}</b><em>{ex}</em><small>{s}</small></div>)}
        </Reveal>
        <p className="lf-small">Aim for suggestive, arbitrary or fanciful names if brand protection matters to you. Learn more about our <Link to="/business/trademark">trademark registration</Link> service.</p>
      </Section>

      {/* checks */}
      <Section title="Four checks before you commit">
        <Reveal className="rs-name__checks">
          {[[<Building2 size={22} key="a" />, "State business registry", "Is the name available to register in your state?", "/business/free-name-check", "Free name check"],
            [<Hash size={22} key="b" />, "Federal trademarks", "Is anyone using a similar mark for similar goods or services?", "/business/trademark-search", "Trademark search"],
            [<Globe size={22} key="c" />, "Domain name", "Can you get a matching .com or a close, natural variation?", "/resources/tools/name-check", "Check domains"],
            [<AtSign size={22} key="d" />, "Social handles", "Are the usernames free on the platforms your customers use?", "/resources/tools/name-check", "Check handles"]].map(([ic, t, d, to, l], i) => (
            <div key={t} style={{ "--i": i }}><span>{ic}</span><b>{t}</b><small>{d}</small><Link to={to}>{l} <ArrowRight size={14} /></Link></div>
          ))}
        </Reveal>
      </Section>

      <FaqBlock faqs={FAQS} title="Business naming FAQs" variant="numbered" tone="gray" />

      <Section>
        <Reveal className="rs-band">
          <div><h2><Sparkles size={22} /> Stuck for ideas?</h2><p>Our free name generator creates dozens of brandable names from a few keywords.</p></div>
          <Link to="/resources/tools/name-generator" className="lf-btn">Open the name generator <ArrowRight size={16} /></Link>
        </Reveal>
        <RelatedLinks items={LEARN_GUIDES} current={PATH} title="Related guides" variant="list" hub={HUBS.learn} />
      </Section>

      <ServiceFooter disclaimer={RES_DISCLAIMER} />
    </div>
  );
}
