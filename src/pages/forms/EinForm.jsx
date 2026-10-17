import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Download, Search, Check, Monitor, Printer, Mail, Phone, BadgeDollarSign, AlertTriangle, Hash } from "lucide-react";
import Seo from "../../components/common/Seo";
import { Reveal, Section, ServiceFooter } from "../../components/service";
import { Field, Segmented, FaqBlock, LegalNote, RelatedForms, FormHero } from "./FormBits";
import { EinVisual } from "./FormsVisual";
import { FORMS_SEO, DISCLAIMER, LEGAL_FILINGS, downloadDoc, fill, esc } from "./forms";
import "./Forms.css";

const PATH = "/forms/legal/ein";

const NEEDS = [
  { id: "emp", label: "I have or will hire employees", req: true },
  { id: "entity", label: "My business is a corporation, partnership or multi-member LLC", req: true },
  { id: "tax", label: "I file employment, excise, or alcohol, tobacco & firearms tax returns", req: true },
  { id: "plan", label: "I have a Keogh or solo 401(k) retirement plan", req: true },
  { id: "bank", label: "I want a business bank account", req: false },
  { id: "privacy", label: "I'd rather not give clients my Social Security number", req: false },
];

const LINES = [
  ["1", "Legal name of entity", "Identity", "Exactly as on your formation documents, or your own name if you're a sole proprietor."],
  ["2", "Trade name", "Identity", "Your DBA, if different from the legal name. Leave blank if none."],
  ["3", "Executor, administrator, trustee, \"care of\" name", "Identity", "Mainly for estates and trusts. Most businesses leave this blank."],
  ["4a–4b", "Mailing address", "Identity", "Where the IRS should send letters. A P.O. box is acceptable here."],
  ["5a–5b", "Street address", "Identity", "Physical business location if different from the mailing address. No P.O. boxes."],
  ["6", "County and state of principal business", "Identity", "Where the business is mainly located."],
  ["7a–7b", "Responsible party & SSN/ITIN/EIN", "Ownership", "The individual who ultimately owns or controls the entity. Generally must be a person, not another company."],
  ["8a–8c", "LLC questions", "Ownership", "Whether it's an LLC, the number of members, and whether it was organized in the United States."],
  ["9a–9b", "Type of entity", "Ownership", "Sole proprietor, partnership, corporation, etc. Single-member LLCs often choose \"Other\" and enter \"disregarded entity\" unless electing corporate tax treatment."],
  ["10", "Reason for applying", "Business details", "Usually \"Started new business\", \"Hired employees\" or \"Banking purpose\"."],
  ["11", "Date business started or acquired", "Business details", "The formation date or the date you began operating."],
  ["12", "Closing month of accounting year", "Business details", "December for most small businesses using a calendar year."],
  ["13", "Highest number of employees expected", "Employment", "Expected in the next 12 months, by type. Enter 0 if none."],
  ["14", "Form 944 election", "Employment", "Check if you expect $1,000 or less in annual employment tax liability and want to file annually."],
  ["15", "First date wages paid", "Employment", "Leave blank or N/A if you won't have employees."],
  ["16", "Principal activity", "Business details", "The category that best describes your business, such as retail or construction."],
  ["17", "Principal line of merchandise or services", "Business details", "A short specific description, e.g. \"custom cakes and pastries\"."],
  ["18", "Applied for an EIN before?", "Business details", "Answer yes and give the previous EIN if this entity already applied."],
];
const GROUPS = ["All", "Identity", "Ownership", "Business details", "Employment"];

const METHODS = [
  { icon: <Monitor size={22} />, name: "Online", speed: "Immediately", note: "Fastest. For applicants with a U.S. address, available on weekdays during set hours; complete it in one session.", best: true },
  { icon: <Printer size={22} />, name: "Fax", speed: "About 4 business days", note: "Fax a completed SS-4 to the IRS number in the instructions. Include a fax number for the reply." },
  { icon: <Mail size={22} />, name: "Mail", speed: "About 4–5 weeks", note: "Slowest option. Use it only if you're in no hurry and can't apply online or by fax." },
  { icon: <Phone size={22} />, name: "Phone", speed: "During the call", note: "Available to international applicants without a U.S. location or principal office." },
];

const FAQS = [
  ["How much does it cost to get an EIN?", "Nothing. The IRS issues EINs free of charge. Some websites charge to submit the application for you. That's legal if they're transparent, but you never have to pay the IRS for an EIN."],
  ["Who can be the responsible party on Form SS-4?", "The responsible party is the individual who ultimately owns or controls the entity and its funds, usually an owner, principal officer or general partner. In most cases it must be a person with an SSN or ITIN, not another business. Report changes within 60 days on Form 8822-B."],
  ["Can I get more than one EIN in a day?", "No. The IRS limits EIN issuance to one per responsible party per day, whether you apply online, by fax, mail or phone. If you're forming several entities, plan to apply on different days."],
  ["Does a single-member LLC need an EIN?", "Not always for federal tax purposes. A single-member LLC with no employees and no excise tax obligations can use the owner's SSN. In practice, most get an EIN anyway because banks, payment processors and some states ask for one."],
  ["I lost my EIN. How do I find it?", "Check your IRS confirmation notice (CP 575), old tax returns, bank or loan paperwork, or business license applications. You can also call the IRS Business & Specialty Tax Line, and they'll give it to an authorized person after verifying identity."],
];

function NeedCheck() {
  const [on, setOn] = useState(["bank"]);
  const toggle = (id) => setOn((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]));
  const required = NEEDS.some((n) => n.req && on.includes(n.id));
  const helpful = NEEDS.some((n) => !n.req && on.includes(n.id));
  const verdict = required ? ["req", "Yes, you need an EIN", "At least one of your answers makes an EIN mandatory under IRS rules."]
    : helpful ? ["rec", "Recommended", "It isn't strictly required, but an EIN makes banking easier and keeps your SSN private."]
    : ["opt", "Probably optional", "A sole proprietor or single-member LLC with no employees can usually use their SSN."];

  return (
    <Reveal className="lf-ein-need">
      <div className="lf-ein-need__qs">
        {NEEDS.map((n) => (
          <button key={n.id} type="button" aria-pressed={on.includes(n.id)} className={on.includes(n.id) ? "is-on" : ""} onClick={() => toggle(n.id)}>
            <span className="sw"><i /></span>{n.label}{n.req && <em>IRS rule</em>}
          </button>
        ))}
      </div>
      <div className={`lf-ein-need__out is-${verdict[0]}`} aria-live="polite">
        <Hash size={26} />
        <h3>{verdict[1]}</h3>
        <p>{verdict[2]}</p>
        <a href="#lf-template" className="lf-btn lf-btn--sm">Prepare my SS-4 <ArrowRight size={15} /></a>
      </div>
    </Reveal>
  );
}

function LineFinder() {
  const [q, setQ] = useState("");
  const [g, setG] = useState("All");
  const rows = LINES.filter(([n, t, grp, d]) => (g === "All" || grp === g) && `${n} ${t} ${d}`.toLowerCase().includes(q.trim().toLowerCase()));
  return (
    <Reveal className="lf-ein-lines">
      <div className="lf-ein-lines__bar">
        <label><Search size={17} /><input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search a line, e.g. 7a or responsible" aria-label="Search SS-4 lines" /></label>
        <div>{GROUPS.map((x) => <button key={x} type="button" className={g === x ? "is-on" : ""} aria-pressed={g === x} onClick={() => setG(x)}>{x}</button>)}</div>
      </div>
      <div className="lf-ein-lines__list">
        {rows.length ? rows.map(([n, t, grp, d]) => (
          <div key={n}><b>Line {n}</b><span><strong>{t}</strong><small>{d}</small></span><em>{grp}</em></div>
        )) : <p className="lf-small">No lines match. Try another word.</p>}
      </div>
    </Reveal>
  );
}

function SS4Worksheet() {
  const [v, setV] = useState({ legal: "", trade: "", addr: "", county: "", rp: "", type: "LLC (single-member)", members: "1", reason: "Started new business", start: "", emp: "0", activity: "" });
  const set = (k) => (val) => setV((o) => ({ ...o, [k]: val }));
  const download = () => downloadDoc("ss-4-prep-worksheet.doc", "Form SS-4 Worksheet", `
<h1>Form SS-4 Preparation Worksheet</h1>
<p><i>Gather these answers before applying for your EIN on IRS.gov. Do not include full SSNs in shared copies.</i></p>
<table>
<tr><th>Line</th><th>Question</th><th>Your answer</th></tr>
<tr><td>1</td><td>Legal name of entity</td><td>${fill(v.legal)}</td></tr>
<tr><td>2</td><td>Trade name (DBA)</td><td>${fill(v.trade, "None")}</td></tr>
<tr><td>4a–5b</td><td>Mailing / street address</td><td>${fill(v.addr)}</td></tr>
<tr><td>6</td><td>County and state</td><td>${fill(v.county)}</td></tr>
<tr><td>7a</td><td>Responsible party</td><td>${fill(v.rp)}</td></tr>
<tr><td>7b</td><td>SSN / ITIN</td><td>___-__-____ (enter when applying)</td></tr>
<tr><td>8a–8b</td><td>LLC? Number of members</td><td>${v.type.startsWith("LLC") ? `Yes, ${esc(v.members)}` : "No"}</td></tr>
<tr><td>9a</td><td>Type of entity</td><td>${esc(v.type)}</td></tr>
<tr><td>10</td><td>Reason for applying</td><td>${esc(v.reason)}</td></tr>
<tr><td>11</td><td>Date business started</td><td>${fill(v.start)}</td></tr>
<tr><td>12</td><td>Closing month of accounting year</td><td>December</td></tr>
<tr><td>13</td><td>Employees expected (12 months)</td><td>${esc(v.emp)}</td></tr>
<tr><td>16–17</td><td>Principal activity / products or services</td><td>${fill(v.activity)}</td></tr>
<tr><td>18</td><td>Applied for an EIN before?</td><td>No / Yes: ____________</td></tr>
</table>`);

  return (
    <Reveal className="lf-ein-ws">
      <div className="lf-ein-ws__grid">
        <Field label="Line 1 · Legal name" value={v.legal} onChange={set("legal")} placeholder="Bright Leaf Bakery LLC" />
        <Field label="Line 2 · Trade name (if any)" value={v.trade} onChange={set("trade")} placeholder="Sunrise Bakery" />
        <Field label="Lines 4–5 · Address" value={v.addr} onChange={set("addr")} placeholder="120 Main St, Austin, TX 78701" />
        <Field label="Line 6 · County & state" value={v.county} onChange={set("county")} placeholder="Travis County, TX" />
        <Field label="Line 7a · Responsible party" value={v.rp} onChange={set("rp")} placeholder="Jordan Lee" />
        <Field label="Line 11 · Start date" type="date" value={v.start} onChange={set("start")} />
        <Segmented label="Line 9a · Entity type" value={v.type} onChange={set("type")} options={[["Sole proprietor", "Sole prop"], ["LLC (single-member)", "SMLLC"], ["LLC (multi-member)", "MMLLC"], ["Corporation", "Corp"]]} />
        <Segmented label="Line 10 · Reason" value={v.reason} onChange={set("reason")} options={[["Started new business", "New business"], ["Hired employees", "Hiring"], ["Banking purpose", "Banking"]]} />
        {v.type === "LLC (multi-member)" && <Field label="Line 8b · Number of members" value={v.members} onChange={set("members")} inputMode="numeric" />}
        <Field label="Line 13 · Employees expected" value={v.emp} onChange={set("emp")} inputMode="numeric" />
        <Field label="Lines 16–17 · What you do" value={v.activity} onChange={set("activity")} placeholder="Retail bakery: custom cakes and pastries" />
      </div>
      <button type="button" className="lf-btn" onClick={download}><Download size={17} /> Download SS-4 worksheet (.doc)</button>
    </Reveal>
  );
}

export default function EinForm() {
  return (
    <div className="svc mc-page lf-page lf-ein">
      <Seo {...FORMS_SEO[PATH]} path={PATH} faqs={FAQS} />

      <FormHero
        label="EIN Application (SS-4)"
        title="EIN application (Form SS-4), explained line by line"
        subtitle={<>Get your federal tax ID right the first time. Check whether you need an EIN, <strong>look up any line of Form SS-4</strong>, choose how to apply and prepare your answers in advance.</>}
        primary={{ label: "Prepare my SS-4", href: "#lf-template" }}
        secondary={{ label: "Do I need an EIN?", href: "#lf-need" }}
        visual={<EinVisual />}
      />

      {/* explanation + free notice */}
      <Section>
        <div className="lf-ein-intro">
          <div>
            <h2>What is Form SS-4?</h2>
            <p>Form SS-4 is the IRS application for an Employer Identification Number (EIN), the nine-digit federal tax ID for businesses, written as XX-XXXXXXX. You'll use your EIN to file business tax returns, run payroll, open business bank accounts, apply for licenses and loans, and give clients a tax ID instead of your Social Security number.</p>
            <p>Most applicants never print the form. They answer the same questions in the IRS's online application and receive the EIN at the end of the session. Either way, the questions are identical, and a few of them, especially the responsible party and entity type, regularly trip people up. Forming an LLC? Get your <Link to="/forms/legal/articles-of-organization">articles of organization</Link> approved first, so your legal name and start date match.</p>
          </div>
          <Reveal as="aside" className="lf-ein-free">
            <BadgeDollarSign size={30} />
            <h3>The IRS never charges for an EIN</h3>
            <p>Apply directly on IRS.gov for free. Paid services, including ours, charge only for preparing and submitting the application for you.</p>
          </Reveal>
        </div>
      </Section>

      {/* need check */}
      <Section id="lf-need" tone="gray" title="Do you need an EIN?" subtitle="Switch on everything that applies to your business.">
        <NeedCheck />
      </Section>

      {/* line finder */}
      <Section title="Form SS-4 line-by-line guide" subtitle="Search or filter to find exactly what each line is asking.">
        <LineFinder />
      </Section>

      {/* methods */}
      <Section tone="soft" title="Four ways to apply">
        <Reveal className="lf-ein-ways">
          {METHODS.map((m, i) => (
            <article key={m.name} style={{ "--i": i }} className={m.best ? "is-best" : ""}>
              {m.best && <em>Recommended</em>}
              <span>{m.icon}</span>
              <h3>{m.name}</h3>
              <b>{m.speed}</b>
              <p>{m.note}</p>
            </article>
          ))}
        </Reveal>
        <p className="lf-small">Processing times are IRS estimates and can change. Check the current Instructions for Form SS-4 on IRS.gov.</p>
      </Section>

      {/* mistakes */}
      <Section title="Common SS-4 mistakes to avoid">
        <Reveal className="lf-ein-mist">
          {[
            ["Listing a company as the responsible party", "The responsible party should generally be an individual who owns or controls the entity."],
            ["Choosing the wrong entity type for an LLC", "A single-member LLC isn't a sole proprietorship on line 9a unless it's disregarded and you apply as the owner."],
            ["Mismatched legal name", "Line 1 must match your filed articles exactly, including \"LLC\"."],
            ["Applying twice", "Duplicate applications create multiple EINs and IRS confusion. One per responsible party per day."],
            ["Using a P.O. box as the street address", "Lines 5a–5b need a physical location; a P.O. box goes only in the mailing address."],
          ].map(([t, d], i) => <div key={t} style={{ "--i": i }}><AlertTriangle size={18} /><span><strong>{t}</strong><small>{d}</small></span></div>)}
        </Reveal>
      </Section>

      {/* template */}
      <Section id="lf-template" tone="gray" title="SS-4 preparation worksheet" subtitle="Answer each line here, then download your answers to have them ready when you apply.">
        <SS4Worksheet />
        <LegalNote />
      </Section>

      <FaqBlock faqs={FAQS} title="EIN & Form SS-4 FAQs" variant="accordion" />

      {/* CTA */}
      <section className="lf-ein-cta">
        <div className="container">
          <Reveal className="lf-ein-cta__box">
            <div><span className="lf-eyebrow"><Check size={13} /> Done for you</span><h2>Prefer we handle your EIN?</h2><p>We prepare and submit your SS-4 correctly, including for non-U.S. owners without an SSN.</p></div>
            <Link to="/business/ein" className="lf-btn">Get my EIN <ArrowRight size={17} /></Link>
          </Reveal>
          <RelatedForms current={PATH} group={LEGAL_FILINGS} variant="tiles" title="Related filings" />
        </div>
      </section>

      <ServiceFooter disclaimer={DISCLAIMER} />
    </div>
  );
}
