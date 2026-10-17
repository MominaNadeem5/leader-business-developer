import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Download, Check, X, Search, FileText, Newspaper, FileCheck2, Landmark, RefreshCw, Building, MapPin,
  User, Users, Briefcase, Building2, Store,
} from "lucide-react";
import Seo from "../../components/common/Seo";
import { Reveal, Section, ServiceFooter } from "../../components/service";
import { Field, Segmented, FaqBlock, LegalNote, RelatedForms, FormHero } from "./FormBits";
import { DbaVisual } from "./FormsVisual";
import { FORMS_SEO, DISCLAIMER, LEGAL_FILINGS, downloadDoc, fill, esc } from "./forms";
import "./Forms.css";

const PATH = "/forms/legal/dba";

const ENTITIES = {
  sole: { icon: <User size={18} />, label: "Sole proprietor", where: "county", text: "Sole proprietors usually file with the county clerk where the business operates. A few states use a statewide registry instead." },
  partnership: { icon: <Users size={18} />, label: "General partnership", where: "county", text: "General partnerships typically file at the county level, sometimes listing every partner's name and address." },
  llc: { icon: <Briefcase size={18} />, label: "LLC", where: "state", text: "LLCs usually file an assumed or fictitious name with the Secretary of State, and some states also require a county filing." },
  corp: { icon: <Building2 size={18} />, label: "Corporation", where: "state", text: "Corporations generally register trade names with the Secretary of State. Some states add county filing or publication." },
};

const LIFE = [
  { icon: <Search size={18} />, t: "Search the name", d: "Check state and county records and trademarks." },
  { icon: <FileText size={18} />, t: "File the form", d: "Submit to the county or state with the fee." },
  { icon: <Newspaper size={18} />, t: "Publish (if required)", d: "Some states require a newspaper notice." },
  { icon: <FileCheck2 size={18} />, t: "File proof", d: "Submit the affidavit of publication where needed." },
  { icon: <Landmark size={18} />, t: "Use the name", d: "Open a bank account and market under it." },
  { icon: <RefreshCw size={18} />, t: "Renew", d: "Many registrations expire, e.g. every 5 years in California." },
];

const FORM_FIELDS = [
  ["Assumed / fictitious name", "Sunrise Bakery"],
  ["Legal name of owner(s)", "Jordan Lee"],
  ["Business entity type", "Sole proprietorship"],
  ["Business address", "120 Main St, Austin, TX"],
  ["County of operation", "Travis County"],
  ["Nature of business", "Retail bakery"],
  ["Date name first used", "03/01/2026"],
  ["Signature & date", "Jordan Lee · 02/15/2026"],
];

const FAQS = [
  ["Does a DBA protect my business name?", "Only in a limited way. A DBA registration puts your use of the name on public record, but it doesn't give you exclusive rights the way a trademark does, and it usually doesn't stop someone in another county or state from using the same name."],
  ["Do I need a DBA if I have an LLC?", "Only if you want to do business under a name different from your LLC's registered name. For example, \"Bright Leaf Bakery LLC\" would need a DBA to operate as \"Sunrise Bakery\". Using the exact LLC name requires no DBA."],
  ["Why do some states require publishing a DBA in a newspaper?", "Publication gives the public notice of who is behind a business name. Where required, you usually publish the notice for several consecutive weeks and then file an affidavit of publication with the filing office within a set deadline."],
  ["Can I open a business bank account with a DBA?", "Usually, yes. Banks typically ask for your filed DBA certificate plus your EIN or Social Security number, and for LLCs and corporations, formation documents. This lets you accept payments made out to your trade name."],
  ["What happens if my DBA expires?", "In states with expiration dates, an expired DBA can mean you're no longer authorized to use the name, and someone else may register it. Some states allow a short grace period. After that, you may need to refile as new, including any publication."],
];

function DbaWorksheet() {
  const [v, setV] = useState({ dba: "", owner: "", type: "Sole proprietorship", addr: "", county: "", state: "", activity: "", first: "" });
  const set = (k) => (val) => setV((o) => ({ ...o, [k]: val }));
  const download = () => downloadDoc("dba-registration-worksheet.doc", "DBA Registration", `
<h1>Assumed Business Name (DBA) Registration</h1>
<p><i>Filing worksheet. Transfer these details to your county or state's official form.</i></p>
<table>
<tr><td><b>Assumed name</b></td><td>${fill(v.dba)}</td></tr>
<tr><td><b>Legal name of registrant(s)</b></td><td>${fill(v.owner)}</td></tr>
<tr><td><b>Entity type</b></td><td>${esc(v.type)}</td></tr>
<tr><td><b>Principal business address</b></td><td>${fill(v.addr)}</td></tr>
<tr><td><b>County</b></td><td>${fill(v.county)}</td></tr>
<tr><td><b>State</b></td><td>${fill(v.state)}</td></tr>
<tr><td><b>Nature of business</b></td><td>${fill(v.activity)}</td></tr>
<tr><td><b>Date name first used</b></td><td>${fill(v.first)}</td></tr>
</table>
<h2>Checklist</h2><p>☐ Name searched in state, county and trademark records<br>☐ Filed with: county clerk / Secretary of State (circle)<br>☐ Publication required? Yes / No. Newspaper: ____________ Dates: ____________<br>☐ Affidavit of publication filed on ________<br>☐ Renewal date: ________</p>
<p>I declare the information above is true and correct.<br>Signature: ____________________ Date: ________</p>`);

  return (
    <Reveal className="lf-dba-ws">
      <div className="lf-dba-ws__form">
        <Field label="Trade name you want to use" value={v.dba} onChange={set("dba")} placeholder="Sunrise Bakery" />
        <Field label="Legal name of owner or company" value={v.owner} onChange={set("owner")} placeholder="Jordan Lee / Bright Leaf LLC" />
        <Segmented label="Entity type" value={v.type} onChange={set("type")} options={[["Sole proprietorship", "Sole prop"], ["Partnership", "Partnership"], ["LLC", "LLC"], ["Corporation", "Corp"]]} />
        <Field label="Business address" value={v.addr} onChange={set("addr")} placeholder="Street, city, ZIP" />
        <div className="lf-grid-2">
          <Field label="County" value={v.county} onChange={set("county")} placeholder="Travis" />
          <Field label="State" value={v.state} onChange={set("state")} placeholder="Texas" />
          <Field label="Nature of business" value={v.activity} onChange={set("activity")} placeholder="Retail bakery" />
          <Field label="Date first used" type="date" value={v.first} onChange={set("first")} />
        </div>
        <button type="button" className="lf-btn" onClick={download}><Download size={17} /> Download DBA worksheet (.doc)</button>
      </div>
      <div className="lf-dba-ws__card" aria-live="polite">
        <span className="lf-eyebrow">How you'll appear</span>
        <p className="lf-dba-ws__legal">{v.owner || "Your legal name"}</p>
        <span className="lf-dba-ws__dba">d/b/a</span>
        <p className="lf-dba-ws__trade">{v.dba || "Your trade name"}</p>
        <small>Use this exact format on contracts and bank paperwork.</small>
      </div>
    </Reveal>
  );
}

export default function DbaForm() {
  const [ent, setEnt] = useState("sole");
  const e = ENTITIES[ent];

  return (
    <div className="svc mc-page lf-page lf-dba">
      <Seo {...FORMS_SEO[PATH]} path={PATH} faqs={FAQS} />

      <FormHero
        label="DBA Registration Form"
        title="DBA registration form: operate under the brand name you want"
        subtitle={<>Register a <strong>"doing business as" trade name</strong> the right way. Learn where to file, whether you must publish, how renewals work, and prepare your form with our free worksheet.</>}
        primary={{ label: "Prepare my DBA", href: "#lf-template" }}
        secondary={{ label: "Where do I file?", href: "#lf-where" }}
        visual={<DbaVisual />}
      />

      {/* equation */}
      <Section>
        <Reveal className="lf-dba-eq">
          <div><small>Legal name</small><b>Bright Leaf LLC</b></div>
          <span>+</span>
          <div className="tag"><small>Registration</small><b>d/b/a</b></div>
          <span>=</span>
          <div className="out"><small>Trade name</small><b>Sunrise Bakery</b></div>
        </Reveal>
        <div className="lf-dba-intro">
          <p>A <strong>DBA</strong> ("doing business as"), also called an assumed name, fictitious business name or trade name, lets a person or company legally operate under a name other than their own legal name. A sole proprietor named Jordan Lee needs one to trade as "Sunrise Bakery". An LLC needs one to sell under a brand that differs from its registered name.</p>
          <p>The registration form itself is simple, but the rules around it vary a lot: who you file with, whether you must publish a newspaper notice, and when it expires. Registering also lets you open a bank account and accept payments in your brand's name. Forming an LLC instead? The name goes on your <Link to="/forms/legal/articles-of-organization">articles of organization</Link>, and no DBA is needed if you use that exact name.</p>
        </div>
      </Section>

      {/* where to file */}
      <Section id="lf-where" tone="gray" title="Where do you file a DBA?" subtitle="It depends mostly on your business type and your state. Pick yours.">
        <Reveal className="lf-dba-where">
          <div className="lf-dba-where__pick">
            {Object.entries(ENTITIES).map(([k, x]) => (
              <button key={k} type="button" aria-pressed={ent === k} className={ent === k ? "is-on" : ""} onClick={() => setEnt(k)}>{x.icon}{x.label}</button>
            ))}
          </div>
          <div className="lf-dba-where__flow" key={ent}>
            <div className={`node ${e.where === "county" ? "is-on" : ""}`}><MapPin size={20} /><b>County clerk</b><small>Common for sole props & partnerships</small></div>
            <div className={`node ${e.where === "state" ? "is-on" : ""}`}><Building size={20} /><b>Secretary of State</b><small>Common for LLCs & corporations</small></div>
            <div className="node node--both"><Newspaper size={20} /><b>Plus, in some states</b><small>County filing and/or newspaper publication</small></div>
            <p>{e.text}</p>
          </div>
        </Reveal>
      </Section>

      {/* does / doesn't */}
      <Section title="What a DBA does, and what it doesn't">
        <Reveal className="lf-dba-dd">
          <div className="yes"><h3><Check size={18} /> A DBA does</h3><ul><li>Let you legally use a brand name</li><li>Help you open a bank account in that name</li><li>Let customers pay your trade name</li><li>Put the name's owner on public record</li></ul></div>
          <div className="no"><h3><X size={18} /> A DBA doesn't</h3><ul><li>Create a separate legal entity</li><li>Protect your personal assets</li><li>Give exclusive rights like a trademark</li><li>Change how your business is taxed</li></ul></div>
        </Reveal>
        <p className="lf-small">Want liability protection? Form an <Link to="/business/llc">LLC</Link>. Want to stop others using your name? Look into a <Link to="/business/trademark">trademark</Link>.</p>
      </Section>

      {/* lifecycle */}
      <Section tone="soft" title="The life of a DBA">
        <Reveal className="lf-dba-life">
          {LIFE.map((l, i) => <div key={l.t} style={{ "--i": i }}><span>{l.icon}</span><em>{i + 1}</em><b>{l.t}</b><small>{l.d}</small></div>)}
        </Reveal>
      </Section>

      {/* form fields */}
      <Section title="What the DBA form asks for" subtitle="Field names vary by office, but most forms request the same core details.">
        <Reveal className="lf-dba-fields">
          {FORM_FIELDS.map(([k, ex], i) => <label key={k} style={{ "--i": i }}><span>{k}</span><input readOnly tabIndex={-1} value={ex} aria-label={`${k} example`} /></label>)}
        </Reveal>
      </Section>

      {/* template */}
      <Section id="lf-template" tone="gray" title="DBA registration worksheet" subtitle="Fill it in, preview how your name will appear, and download a checklist for filing.">
        <DbaWorksheet />
        <LegalNote />
      </Section>

      <FaqBlock faqs={FAQS} title="DBA registration FAQs" variant="numbered" />

      {/* CTA */}
      <section className="lf-dba-cta">
        <div className="container">
          <Reveal className="lf-dba-cta__box">
            <Store size={30} />
            <h2>Let us register your DBA</h2>
            <p>We search the name, file with the right office, and handle publication where your state requires it.</p>
            <Link to="/business/dba" className="lf-btn lf-btn--light">File my DBA <ArrowRight size={17} /></Link>
          </Reveal>
          <RelatedForms current={PATH} group={LEGAL_FILINGS} variant="chips" title="Related filings" />
        </div>
      </section>

      <ServiceFooter disclaimer={DISCLAIMER} />
    </div>
  );
}
