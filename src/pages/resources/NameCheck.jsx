import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Building2, Hash, Globe, AtSign, ExternalLink, Check, X, HelpCircle, AlertTriangle, PlusCircle, Repeat, Store, Handshake, Search } from "lucide-react";
import Seo from "../../components/common/Seo";
import { Reveal, Section, ServiceFooter } from "../../components/service";
import { ResHero, FaqBlock, RelatedLinks, ResNote } from "./ResBits";
import { RadarVisual } from "./ResourcesVisual";
import { RES_SEO, RES_DISCLAIMER, FREE_TOOLS, HUBS } from "./resources";
import "../forms/Forms.css";
import "./Resources.css";

const PATH = "/resources/tools/name-check";
const STATUS = [["free", "Available", <Check size={13} key="c" />], ["taken", "Taken", <X size={13} key="x" />], ["unsure", "Not sure", <HelpCircle size={13} key="h" />]];

const FAQS = [
  ["Does this tool search state records and trademarks automatically?", "No. Official databases don't allow automatic public searches from a webpage like this, so the tool prepares your name and opens each official search for you. You mark each result, and the tool gives you an overall verdict and next steps."],
  ["If my name is available in my state, can I use it everywhere?", "Not necessarily. State availability only means no other entity in that state has registered the same or a confusingly similar name. Someone else may hold a federal trademark or use the name in another state, which could still create conflicts."],
  ["What counts as “too similar” to an existing name?", "States usually reject names that are only different by punctuation, spacing, “The”, or the entity designator. For trademarks, the test is broader: whether customers could be confused, considering how the names look, sound and what goods or services they cover."],
  ["Should I buy the domain before registering my business?", "If the domain is available, buying it early is inexpensive insurance, even before you file. Do the same with your key social handles. Just make sure the name also clears your state and trademark checks before you invest in branding."],
  ["What should I do if my preferred name is taken?", "Try a modifier (adding your city, a descriptive word or “Co.”), a different but natural variation, or a brand-new name. For a name you're set on, a professional search can show whether the existing use really conflicts with yours."],
];

export default function NameCheck() {
  const [params] = useSearchParams();
  const [name, setName] = useState(params.get("name") || "BrightLeaf Bakery");
  const [res, setRes] = useState({});
  const core = name.trim().replace(/\b(llc|l\.l\.c\.|inc|corp|co|company)\.?$/i, "").trim();
  const slug = core.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]/g, "");
  const flags = [
    !core && "Enter a name to begin.",
    /[^a-z0-9&'\-. ]/i.test(core) && "Special characters may not be allowed in state filings.",
    slug.length > 20 && "Long names make domains and handles harder to get.",
    /\b(bank|insurance|trust|university)\b/i.test(core) && "This word may require state approval or licensing.",
  ].filter(Boolean);

  const CHECKS = [
    { id: "state", icon: <Building2 size={20} />, t: "State business registry", d: "Is an LLC or corporation already registered under this name in your state?", links: [["Use our free name check", "/business/free-name-check", true]] },
    { id: "tm", icon: <Hash size={20} />, t: "Federal trademarks", d: `Search “${core || "your name"}” and similar spellings for related goods and services.`, links: [["USPTO trademark search", "https://tmsearch.uspto.gov/"]] },
    { id: "domain", icon: <Globe size={20} />, t: "Domain name", d: `Look up ${slug || "yourname"}.com to see if it's registered.`, links: [[`Look up ${slug || "name"}.com`, `https://lookup.icann.org/en/lookup?name=${slug || "example"}.com`]] },
    { id: "social", icon: <AtSign size={20} />, t: "Social handles", d: `Open each profile for @${slug || "yourname"}. A “page not found” usually means it's free.`, links: [["Instagram", `https://www.instagram.com/${slug}`], ["X", `https://x.com/${slug}`], ["Facebook", `https://www.facebook.com/${slug}`], ["TikTok", `https://www.tiktok.com/@${slug}`]] },
  ];
  const vals = CHECKS.map((c) => res[c.id]);
  const taken = vals.filter((v) => v === "taken").length;
  const free = vals.filter((v) => v === "free").length;
  const verdict = !vals.some(Boolean) ? ["idle", "Run the four checks", "Open each search, then mark what you found."]
    : res.state === "taken" || res.tm === "taken" ? ["bad", "Likely conflict", "A state registration or trademark conflict is a serious red flag. Consider a different name or a professional search."]
    : taken ? ["warn", "Usable with tweaks", "The legal checks look OK, but some online names are taken. A small variation could solve it."]
    : free === 4 ? ["good", "Looks available", "All four checks came back clear. Secure the name quickly: register it, buy the domain and claim handles."]
    : ["warn", "Keep checking", "Finish the remaining checks to get a confident answer."];

  return (
    <div className="svc mc-page lf-page rs-page rs-check">
      <Seo {...RES_SEO[PATH]} path={PATH} faqs={FAQS} />

      <ResHero
        hub={HUBS.tools}
        label="Name Availability Check"
        title="Business name availability check: state, trademark, domain & social"
        subtitle={<>Run the four checks that matter before you commit to a name. We prepare every search for you, <strong>open the official databases in one click</strong>, and give you a clear verdict.</>}
        primary={{ label: "Check my name", href: "#rs-check" }}
        secondary={{ label: "Name taken? See options", href: "#rs-options" }}
        visual={<RadarVisual />}
      />

      {/* tool */}
      <Section id="rs-check" tone="gray">
        <Reveal className="rs-check__tool">
          <label className="rs-check__name"><Search size={20} /><input value={name} maxLength={70} onChange={(e) => { setName(e.target.value); setRes({}); }} placeholder="Enter your business name" aria-label="Business name" /></label>
          {flags.length > 0 && <ul className="rs-check__flags">{flags.map((f) => <li key={f}><AlertTriangle size={14} />{f}</li>)}</ul>}
          <div className="rs-check__grid">
            {CHECKS.map((c, i) => (
              <article key={c.id} className={res[c.id] ? `is-${res[c.id]}` : ""} style={{ "--i": i }}>
                <div className="rs-check__head"><span>{c.icon}</span><div><em>Check {i + 1}</em><h3>{c.t}</h3></div></div>
                <p>{c.d}</p>
                <div className="rs-check__links">
                  {c.links.map(([l, href, internal]) => internal
                    ? <Link key={l} to={href}>{l} <ArrowRight size={13} /></Link>
                    : <a key={l} href={href} target="_blank" rel="noopener noreferrer">{l} <ExternalLink size={12} /></a>)}
                </div>
                <div className="rs-check__mark" role="group" aria-label={`${c.t} result`}>
                  {STATUS.map(([v, l, ic]) => <button key={v} type="button" aria-pressed={res[c.id] === v} className={res[c.id] === v ? `is-${v}` : ""} onClick={() => setRes((r) => ({ ...r, [c.id]: v }))}>{ic}{l}</button>)}
                </div>
              </article>
            ))}
          </div>
          <div className={`rs-check__verdict is-${verdict[0]}`} aria-live="polite">
            <div className="rs-check__dots">{CHECKS.map((c) => <i key={c.id} className={res[c.id] || ""} title={c.t} />)}</div>
            <div><h3>{verdict[1]}</h3><p>{verdict[2]}</p></div>
          </div>
        </Reveal>
        <ResNote>This tool links to official and third-party search pages and doesn't access their data. Results you mark aren't stored or verified. A clear result here isn't a legal guarantee that a name is available.</ResNote>
      </Section>

      {/* explainer table */}
      <Section title="What each check tells you">
        <Reveal className="lf-table-wrap">
          <table className="lf-table">
            <thead><tr><th>Check</th><th>Where to search</th><th>What a match means</th><th>How serious?</th></tr></thead>
            <tbody>
              <tr><td><strong>State registry</strong></td><td>Secretary of State business search</td><td>The state will likely reject your filing</td><td><span className="lf-pill lf-pill--high">Blocker</span></td></tr>
              <tr><td><strong>Trademarks</strong></td><td>USPTO trademark database</td><td>Using the name could infringe someone's rights</td><td><span className="lf-pill lf-pill--high">Blocker</span></td></tr>
              <tr><td><strong>Domain</strong></td><td>Domain lookup (WHOIS/RDAP)</td><td>You'll need a variation or to buy it</td><td><span className="lf-pill lf-pill--medium">Workable</span></td></tr>
              <tr><td><strong>Social handles</strong></td><td>Each platform's profile URL</td><td>Use a consistent variation across platforms</td><td><span className="lf-pill lf-pill--low">Minor</span></td></tr>
            </tbody>
          </table>
        </Reveal>
        <p className="lf-small">Also run a quick web search for the name plus your industry. Unregistered businesses can still have rights in their local area.</p>
      </Section>

      {/* options */}
      <Section id="rs-options" tone="soft" title="Name taken? Your options">
        <Reveal className="rs-options">
          {[[<PlusCircle size={22} key="a" />, "Add a modifier", "Add your city, a descriptive word or a suffix: BrightLeaf Bakery Austin."],
            [<Repeat size={22} key="b" />, "Try a variation", "Swap one word for a synonym or reorder the words, without misspellings."],
            [<Store size={22} key="c" />, "Use a DBA", "Register your entity under one name and trade under another available brand name."],
            [<Handshake size={22} key="d" />, "Approach the owner", "Unused domains and handles can sometimes be bought, sometimes cheaply."]].map(([ic, t, d], i) => (
            <div key={t} style={{ "--i": i }}><span>{ic}</span><b>{t}</b><small>{d}</small></div>
          ))}
        </Reveal>
        <p className="lf-small">Need fresh ideas? Try the <Link to="/resources/tools/name-generator">business name generator</Link>. Using a brand name? See our <Link to="/forms/legal/dba">DBA guide</Link>.</p>
      </Section>

      <FaqBlock faqs={FAQS} title="Name availability FAQs" variant="grid" />

      <Section tone="gray">
        <Reveal className="rs-band">
          <div><h2>Want a professional search?</h2><p>Our team checks state records and runs a comprehensive trademark search before you invest in your brand.</p></div>
          <div className="lf-actions"><Link to="/business/trademark-search" className="lf-btn">Trademark search <ArrowRight size={16} /></Link><Link to="/business/free-name-check" className="svc-ghost-btn">Free name check</Link></div>
        </Reveal>
        <RelatedLinks items={FREE_TOOLS} current={PATH} title="More free tools" variant="chips" hub={HUBS.tools} />
      </Section>

      <ServiceFooter disclaimer={RES_DISCLAIMER} />
    </div>
  );
}
