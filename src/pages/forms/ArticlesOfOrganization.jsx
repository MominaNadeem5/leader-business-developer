import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Download, Check, X, AlertTriangle, Landmark, Lock, Globe2 } from "lucide-react";
import Seo from "../../components/common/Seo";
import { Reveal, Section, ServiceFooter } from "../../components/service";
import { Field, Segmented, FaqBlock, LegalNote, RelatedForms, FormHero } from "./FormBits";
import { ArticlesVisual } from "./FormsVisual";
import { FORMS_SEO, DISCLAIMER, LEGAL_FILINGS, downloadDoc, fill, esc } from "./forms";
import "./Forms.css";

const PATH = "/forms/legal/articles-of-organization";

const FIELDS = [
  { name: "LLC name", req: true, text: "Your full legal business name. It must be distinguishable from other businesses registered in your state and end with a designator such as \"LLC\" or \"Limited Liability Company\".", tip: "Search your state's business database first. Names that differ only by punctuation or \"The\" are usually rejected." },
  { name: "Registered agent", req: true, text: "The person or company that accepts lawsuits and official state mail for your LLC. Most states require a physical street address in the state and availability during business hours.", tip: "You can be your own agent, but a registered agent service keeps your home address off public records." },
  { name: "Principal office address", req: true, text: "Where the business is primarily run. Many states publish this address, so some owners use a business or virtual address instead of a home address.", tip: "A P.O. box is often not accepted as the principal office. Check your state's rules." },
  { name: "Mailing address", req: false, text: "Where the state should send correspondence, such as annual report reminders, if different from the principal office.", tip: "Use an address you check regularly. Missed state mail is a common cause of late filings." },
  { name: "Management structure", req: true, text: "Whether the LLC is member-managed (owners run it) or manager-managed (appointed managers run it). Some states ask you to list members or managers.", tip: "Choose manager-managed if you have passive investors who shouldn't bind the company." },
  { name: "Organizer", req: true, text: "The person or company preparing and submitting the filing. The organizer doesn't have to be an owner, and a formation service can act as organizer.", tip: "The organizer's role usually ends once the LLC is formed and members take over." },
  { name: "Purpose", req: false, text: "Many states let you state a general purpose, such as \"any lawful business\", while licensed professions may need a specific purpose.", tip: "A general purpose clause gives you flexibility to expand later without amending." },
  { name: "Effective date & duration", req: false, text: "Most LLCs become effective on the filing date and last perpetually, but you can often choose a delayed effective date.", tip: "A January 1 effective date can avoid a short first tax year for a late-December formation." },
];

const FEES = [
  ["California", "Articles of Organization", "$70", "Statement of Information due within 90 days"],
  ["Texas", "Certificate of Formation", "$300", "Annual franchise tax reports"],
  ["Florida", "Articles of Organization", "$125", "Includes registered agent designation"],
  ["New York", "Articles of Organization", "$200", "Publication requirement after formation"],
  ["Delaware", "Certificate of Formation", "$110", "Annual LLC tax applies"],
  ["Arizona", "Articles of Organization", "$50", "Publication may be required in some counties"],
  ["Massachusetts", "Certificate of Organization", "$500", "Among the highest filing fees"],
];

const RESTRICTED = ["bank", "banking", "insurance", "trust", "university", "college", "attorney", "engineer", "engineering", "cpa", "medical", "pharmacy"];
const BANNED = ["fbi", "treasury", "secret service", "federal reserve", "state department"];

const FAQS = [
  ["Are articles of organization the same as a certificate of formation?", "Yes, they serve the same purpose. States use different names for the document that creates an LLC: Texas and Delaware call it a certificate of formation, Massachusetts uses certificate of organization, and many states use articles of organization."],
  ["How long does it take for articles of organization to be approved?", "It depends on the state and filing method. Online filings are often processed within a few business days, while mailed filings can take several weeks. Many states offer expedited processing for an extra fee."],
  ["Can I change my articles of organization after filing?", "Yes. You file articles of amendment (or a certificate of amendment) with the same state office, usually with a fee. Common changes include the LLC's name, management structure or principal address. Registered agent changes often use a separate form."],
  ["Do articles of organization list the owners of the LLC?", "Not always. Many states don't require members' names, while others ask for members or managers. Because articles are public records, some owners use a registered agent and business address to limit what's published."],
  ["What should I do after my articles of organization are approved?", "Get an EIN from the IRS, sign an operating agreement, open a business bank account, and check for business licenses and any publication requirement. Then put your annual report due date on the calendar."],
];

function NameChecker() {
  const [name, setName] = useState("Bright Leaf Bakery");
  const n = name.trim();
  const lower = ` ${n.toLowerCase()} `;
  const hasDesignator = /\b(llc|l\.l\.c\.|limited liability company|limited liability co\.?|ltd\.? liability co\.?)$/i.test(n);
  const corpWord = /\b(inc|incorporated|corp|corporation)\b\.?/i.test(n);
  const restricted = RESTRICTED.filter((w) => lower.includes(` ${w} `));
  const banned = BANNED.filter((w) => lower.includes(w));
  const checks = [
    { ok: n.length > 2, label: "Name entered" },
    { ok: hasDesignator, label: hasDesignator ? "Ends with an LLC designator" : "Missing a designator like \"LLC\"" },
    { ok: !corpWord, label: corpWord ? "Uses a corporation word (Inc., Corp.)" : "No corporation words" },
    { ok: !banned.length, label: banned.length ? "Implies a government agency" : "No government-agency terms" },
    { ok: !restricted.length, warn: restricted.length > 0, label: restricted.length ? `Restricted word: "${restricted[0]}" may need approval` : "No restricted words" },
  ];
  const suggestion = n && !hasDesignator ? `${n.replace(/[,\s]+$/, "").replace(/\b(inc|incorporated|corp|corporation)\.?$/i, "").trim()} LLC` : null;

  return (
    <Reveal className="lf-ao-name">
      <label className="lf-ao-name__input">
        <Landmark size={20} />
        <input value={name} maxLength={80} onChange={(e) => setName(e.target.value)} placeholder="Type your LLC name" aria-label="LLC name" />
      </label>
      <ul>
        {checks.map((c) => (
          <li key={c.label} className={c.ok ? "ok" : c.warn ? "warn" : "no"}><span>{c.ok ? <Check size={13} /> : c.warn ? <AlertTriangle size={13} /> : <X size={13} />}</span>{c.label}</li>
        ))}
      </ul>
      {suggestion && <p className="lf-ao-name__sug">Try: <button type="button" onClick={() => setName(suggestion)}>{suggestion}</button></p>}
      <p className="lf-small">This checks common naming rules only. Availability depends on your state's records, so search the Secretary of State database, and consider a <Link to="/business/trademark-search">trademark search</Link>.</p>
    </Reveal>
  );
}

function Worksheet() {
  const [v, setV] = useState({ name: "", state: "", agent: "", agentAddr: "", office: "", mgmt: "Member-managed", organizer: "", members: "", effective: "" });
  const set = (k) => (val) => setV((o) => ({ ...o, [k]: val }));
  const download = () => downloadDoc("articles-of-organization-worksheet.doc", "Articles of Organization", `
<h1>Articles of Organization</h1>
<p><i>Filing worksheet. Transfer these details to your state's official form or online filing portal.</i></p>
<p><b>State of formation:</b> ${fill(v.state)}</p>
<h2>Article I. Name</h2><p>The name of the limited liability company is ${fill(v.name)}.</p>
<h2>Article II. Registered Agent</h2><p>The registered agent is ${fill(v.agent)}, located at ${fill(v.agentAddr)}.</p>
<h2>Article III. Principal Office</h2><p>The principal office address is ${fill(v.office)}.</p>
<h2>Article IV. Management</h2><p>The company is ${esc(v.mgmt.toLowerCase())}.${v.members.trim() ? ` The initial ${v.mgmt === "Manager-managed" ? "managers" : "members"} are: ${esc(v.members)}.` : ""}</p>
<h2>Article V. Purpose</h2><p>The purpose of the company is to engage in any lawful business for which an LLC may be organized in this state.</p>
<h2>Article VI. Effective Date</h2><p>These articles are effective ${v.effective ? `on ${esc(v.effective)}` : "upon filing"}.</p>
<h2>Organizer</h2><p>Name: ${fill(v.organizer)}<br>Signature: ____________________ Date: ________</p>`);

  return (
    <Reveal className="lf-ao-ws">
      <div className="lf-ao-ws__grid">
        <Field label="LLC name (with designator)" value={v.name} onChange={set("name")} placeholder="Bright Leaf Bakery LLC" />
        <Field label="State of formation" value={v.state} onChange={set("state")} placeholder="Florida" />
        <Field label="Registered agent name" value={v.agent} onChange={set("agent")} placeholder="Leader Registered Agent Inc." />
        <Field label="Registered agent street address" value={v.agentAddr} onChange={set("agentAddr")} placeholder="Street, city, state, ZIP" />
        <Field label="Principal office address" value={v.office} onChange={set("office")} placeholder="Street, city, state, ZIP" />
        <Field label="Organizer name" value={v.organizer} onChange={set("organizer")} placeholder="Jordan Lee" />
        <Segmented label="Management" value={v.mgmt} onChange={set("mgmt")} options={[["Member-managed", "Member-managed"], ["Manager-managed", "Manager-managed"]]} />
        <Field label="Members or managers (optional)" value={v.members} onChange={set("members")} placeholder="Jordan Lee, Sam Chen" />
        <Field label="Delayed effective date (optional)" type="date" value={v.effective} onChange={set("effective")} />
      </div>
      <div className="lf-ao-ws__foot">
        <button type="button" className="lf-btn" onClick={download}><Download size={17} /> Download worksheet (.doc)</button>
        <span>Most states require their own form or online portal. Use this worksheet to gather everything first.</span>
      </div>
    </Reveal>
  );
}

export default function ArticlesOfOrganization() {
  const [f, setF] = useState(0);
  const field = FIELDS[f];

  return (
    <div className="svc mc-page lf-page lf-aoo">
      <Seo {...FORMS_SEO[PATH]} path={PATH} faqs={FAQS} />

      <FormHero
        label="Articles of Organization"
        title="Articles of organization: the form that brings your LLC to life"
        subtitle={<>See exactly what goes on the form, check your LLC name, compare state fees and <strong>prepare every detail before you file</strong> with your Secretary of State.</>}
        primary={{ label: "Prepare my filing", href: "#lf-template" }}
        secondary={{ label: "Check my LLC name", href: "#lf-name" }}
        visual={<ArticlesVisual />}
      />

      {/* explanation + also known as */}
      <Section>
        <div className="lf-ao-intro">
          <div>
            <h2>What are articles of organization?</h2>
            <p>Articles of organization are the official document you file with your state to create a limited liability company. Once the state approves them, your LLC legally exists: it can open a bank account, sign contracts and protect its owners' personal assets from business debts.</p>
            <p>The form itself is usually short, often one or two pages, but every field matters. A rejected name, a registered agent without a physical address, or the wrong management structure can delay your formation or create problems later. Articles are public records, so they also decide what information about you appears online. Remember that articles only create the LLC. How it's run belongs in your <Link to="/forms/legal/operating-agreement">operating agreement</Link>.</p>
          </div>
          <Reveal as="aside" className="lf-ao-aka">
            <h3>Also called…</h3>
            <ul>
              <li><b>Certificate of Formation</b><span>Texas, Delaware, New Jersey</span></li>
              <li><b>Certificate of Organization</b><span>Massachusetts and others</span></li>
              <li><b>Articles of Organization</b><span>California, Florida, New York and most states</span></li>
            </ul>
            <p>Same purpose, different name. Filed with the Secretary of State (or equivalent).</p>
          </Reveal>
        </div>
      </Section>

      {/* field carousel */}
      <Section tone="gray" title="What goes on the form, field by field" subtitle="Step through each field you'll typically complete.">
        <Reveal className="lf-ao-car">
          <div className="lf-ao-car__card" key={f}>
            <div className="lf-ao-car__top"><span>Field {f + 1} / {FIELDS.length}</span><em className={field.req ? "req" : "opt"}>{field.req ? "Usually required" : "Often optional"}</em></div>
            <h3>{field.name}</h3>
            <p>{field.text}</p>
            <div className="lf-tip"><strong>Pro tip</strong>{field.tip}</div>
          </div>
          <div className="lf-ao-car__nav">
            <button type="button" aria-label="Previous field" onClick={() => setF((f - 1 + FIELDS.length) % FIELDS.length)}><ArrowLeft size={18} /></button>
            <div className="lf-ao-car__dots">{FIELDS.map((x, i) => <button key={x.name} type="button" aria-label={x.name} className={i === f ? "is-on" : ""} onClick={() => setF(i)} />)}</div>
            <button type="button" aria-label="Next field" onClick={() => setF((f + 1) % FIELDS.length)}><ArrowRight size={18} /></button>
          </div>
        </Reveal>
      </Section>

      {/* name checker */}
      <Section id="lf-name" title="LLC name checker" subtitle="Test your name against the naming rules most states share.">
        <NameChecker />
      </Section>

      {/* articles vs operating agreement */}
      <Section tone="soft" title="Articles of organization vs. operating agreement">
        <Reveal className="lf-ao-vs">
          <div>
            <span className="lf-ao-vs__ic"><Globe2 size={22} /></span>
            <h3>Articles of organization</h3>
            <ul><li>Filed with the state</li><li>Public record</li><li>Creates the LLC</li><li>Short: basic facts only</li></ul>
          </div>
          <div>
            <span className="lf-ao-vs__ic"><Lock size={22} /></span>
            <h3>Operating agreement</h3>
            <ul><li>Kept by the members</li><li>Private document</li><li>Governs how the LLC runs</li><li>Detailed: ownership, votes, exits</li></ul>
          </div>
        </Reveal>
        <p className="lf-small">You need both. Draft yours with our <Link to="/forms/legal/operating-agreement">operating agreement template</Link>.</p>
      </Section>

      {/* fees */}
      <Section title="Filing fee examples by state" subtitle="State fees vary widely. Here are some common examples.">
        <Reveal className="lf-table-wrap">
          <table className="lf-table">
            <thead><tr><th>State</th><th>Document name</th><th>Standard filing fee</th><th>Worth knowing</th></tr></thead>
            <tbody>{FEES.map(([s, d, fee, note]) => <tr key={s}><td><strong>{s}</strong></td><td>{d}</td><td><b className="lf-ao-fee">{fee}</b></td><td>{note}</td></tr>)}</tbody>
          </table>
        </Reveal>
        <p className="lf-small">Fees are standard online or mail fees and change from time to time; expedited service costs extra. Always confirm the current fee on your Secretary of State's website before filing.</p>
      </Section>

      {/* template */}
      <Section id="lf-template" tone="gray" title="Articles of organization filing worksheet" subtitle="Fill in your details and download a ready-to-transfer worksheet in standard articles format.">
        <Worksheet />
        <LegalNote />
      </Section>

      <FaqBlock faqs={FAQS} title="Articles of organization FAQs" variant="split" />

      {/* CTA */}
      <section className="lf-ao-cta">
        <div className="container">
          <Reveal className="lf-ao-cta__box">
            <Landmark size={34} />
            <div><h2>Rather not deal with state paperwork?</h2><p>We prepare and file your articles, act as your registered agent and send your EIN, all in one order.</p></div>
            <Link to="/business/llc" className="lf-btn lf-btn--light">Form my LLC <ArrowRight size={17} /></Link>
          </Reveal>
          <RelatedForms current={PATH} group={LEGAL_FILINGS} variant="tiles" title="Next filings for your LLC" />
        </div>
      </section>

      <ServiceFooter disclaimer={DISCLAIMER} />
    </div>
  );
}
