import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck, Lock, ArrowRight, ArrowLeftRight, Download, Building2, UserPlus, Presentation, Code2,
  Factory, Users, Megaphone, Coffee, Check, X, Info, Infinity as InfinityIcon,
} from "lucide-react";
import Seo from "../../components/common/Seo";
import { Reveal, Section, ServiceFooter } from "../../components/service";
import { Field, Segmented, FaqBlock, LegalNote, RelatedForms, FormHero } from "./FormBits";
import { NdaVisual } from "./FormsVisual";
import { FORMS_SEO, FORMS_START, DISCLAIMER, downloadDoc, fill, esc } from "./forms";
import "./Forms.css";

const PATH = "/forms/templates/nda";

const SCENARIOS = [
  { icon: <UserPlus size={20} />, label: "Hiring a contractor or freelancer", verdict: "one", why: "You share customer data, code or processes; they share little back. A one-way NDA (or a confidentiality clause in their contract) fits." },
  { icon: <Building2 size={20} />, label: "Exploring a merger or joint venture", verdict: "mutual", why: "Both companies will open their books, plans and pricing, so both need protection." },
  { icon: <Presentation size={20} />, label: "Pitching to investors", verdict: "none", why: "Many venture investors won't sign NDAs for early pitches. Share a high-level deck and save sensitive details for due diligence, under an NDA then." },
  { icon: <Factory size={20} />, label: "Sending designs to a manufacturer", verdict: "one", why: "Your specs, drawings and prototypes are the valuable secret. Protect them before you request quotes." },
  { icon: <Code2 size={20} />, label: "Co-developing software with a partner", verdict: "mutual", why: "Both sides contribute code, roadmaps and technical know-how worth protecting." },
  { icon: <Users size={20} />, label: "Onboarding a new employee", verdict: "one", why: "Employees access trade secrets and client lists. Include the federal whistleblower immunity notice." },
  { icon: <Megaphone size={20} />, label: "Briefing a marketing agency", verdict: "one", why: "They'll see unreleased products, sales data and launch dates before the public does." },
  { icon: <Coffee size={20} />, label: "Casual networking chat", verdict: "none", why: "An NDA is impractical here. Simply don't share anything you'd regret seeing published." },
];
const VERDICTS = { one: "One-way NDA", mutual: "Mutual NDA", none: "An NDA may not help" };

const FAQS = [
  ["How long should an NDA last?", "For ordinary business information, one to five years is typical, with two to three years most common. Trade secrets are different: protection usually continues for as long as the information remains a trade secret, so many NDAs give trade secrets an open-ended term."],
  ["What's the difference between an NDA and a confidentiality agreement?", "Usually nothing legally. \"Non-disclosure agreement\", \"confidentiality agreement\" and \"confidential disclosure agreement\" are different names for the same type of contract. What matters is the content: what's protected, the exclusions, the duration and the remedies."],
  ["Can an NDA stop someone from reporting illegal activity?", "No. Under the federal Defend Trade Secrets Act, individuals can disclose trade secrets in confidence to government officials or attorneys to report suspected legal violations. Employers should include a notice of this immunity in employee and contractor NDAs to keep certain remedies available."],
  ["Do I need an NDA if I already have a confidentiality clause in my contract?", "Not always. If the main agreement has a strong confidentiality clause, a separate NDA may be unnecessary. A standalone NDA is useful before any main contract exists, such as during early discussions, quotes or due diligence."],
  ["What can I do if someone breaks an NDA?", "Remedies may include a court order (injunction) to stop further disclosure, money damages for losses, and sometimes attorney's fees if the NDA provides for them. Act quickly and document the breach. An attorney can help you send a demand letter or seek an injunction."],
];

function NdaTemplate() {
  const [v, setV] = useState({ kind: "mutual", a: "", b: "", purpose: "", years: "2", state: "", employee: "no" });
  const set = (k) => (val) => setV((o) => ({ ...o, [k]: val }));
  const mutual = v.kind === "mutual";
  const role = mutual ? "each party" : "the Receiving Party";

  const download = () => downloadDoc(`${mutual ? "mutual" : "one-way"}-nda.doc`, "Non-Disclosure Agreement", `
<h1>${mutual ? "Mutual " : ""}Non-Disclosure Agreement</h1>
<p>This Agreement is made on ____________ between <b>${fill(v.a)}</b>${mutual ? "" : ' ("Disclosing Party")'} and <b>${fill(v.b)}</b>${mutual ? "" : ' ("Receiving Party")'}${mutual ? ' (each a "Party")' : ""}.</p>
<h2>1. Purpose</h2><p>The parties wish to share information to ${fill(v.purpose, "evaluate a potential business relationship")} (the "Purpose").</p>
<h2>2. Confidential Information</h2><p>"Confidential Information" means non-public business, technical, financial or customer information disclosed ${mutual ? "by either Party" : "by the Disclosing Party"}, in any form, that is marked confidential or would reasonably be understood to be confidential.</p>
<h2>3. Exclusions</h2><p>Confidential Information does not include information that: (a) is or becomes public through no fault of the recipient; (b) was already known to the recipient without restriction; (c) is independently developed without use of the Confidential Information; or (d) is lawfully received from a third party without a duty of confidentiality.</p>
<h2>4. Obligations</h2><p>${mutual ? "Each Party" : "The Receiving Party"} will use Confidential Information only for the Purpose, protect it with at least reasonable care, and share it only with employees or advisors who need to know it and are bound by similar duties.</p>
<h2>5. Required Disclosure</h2><p>If disclosure is required by law or court order, ${role} will give prompt notice (where legally allowed) and disclose only what is required.</p>
<h2>6. Term</h2><p>Confidentiality obligations last ${esc(v.years)} year(s) from the date of disclosure, except that obligations for trade secrets continue for as long as the information remains a trade secret under applicable law.</p>
<h2>7. Return of Information</h2><p>On request, ${role} will return or destroy Confidential Information and confirm this in writing.</p>
<h2>8. No License</h2><p>No ownership or license rights are granted except the limited right to use information for the Purpose.</p>
<h2>9. Remedies</h2><p>Unauthorized disclosure may cause irreparable harm, and the disclosing party may seek injunctive relief in addition to other remedies.</p>
${v.employee === "yes" ? "<h2>10. Whistleblower Immunity Notice</h2><p>Under 18 U.S.C. § 1833(b), an individual will not be held liable under any federal or state trade secret law for disclosing a trade secret (a) in confidence to a government official or an attorney solely for the purpose of reporting or investigating a suspected violation of law, or (b) in a complaint or other document filed under seal in a lawsuit or other proceeding.</p>" : ""}
<h2>Governing Law</h2><p>This Agreement is governed by the laws of the State of ${fill(v.state)}.</p>
<table><tr><th>${fill(v.a)}</th><th>${fill(v.b)}</th></tr><tr><td>Signature:<br><br>Name & title:<br>Date:</td><td>Signature:<br><br>Name & title:<br>Date:</td></tr></table>`);

  return (
    <Reveal className="lf-n-tpl">
      <div className="lf-n-tpl__controls">
        <Segmented label="NDA type" value={v.kind} onChange={set("kind")} options={[["mutual", "Mutual"], ["one", "One-way"]]} />
        <div className="lf-grid-2">
          <Field label={mutual ? "Party one" : "Disclosing party (you)"} value={v.a} onChange={set("a")} placeholder="Bright Leaf LLC" />
          <Field label={mutual ? "Party two" : "Receiving party"} value={v.b} onChange={set("b")} placeholder="Northwind Studio" />
        </div>
        <Field label="Purpose of sharing" value={v.purpose} onChange={set("purpose")} placeholder="discuss a co-branded product launch" />
        <div className="lf-grid-2">
          <Segmented label="Confidentiality term" value={v.years} onChange={set("years")} options={[["1", "1 yr"], ["2", "2 yrs"], ["3", "3 yrs"], ["5", "5 yrs"]]} />
          <Field label="Governing state" value={v.state} onChange={set("state")} placeholder="Delaware" />
        </div>
        <Segmented label="Is the recipient an employee or contractor?" value={v.employee} onChange={set("employee")} options={[["no", "No"], ["yes", "Yes, add DTSA notice"]]} />
        <button type="button" className="lf-btn" onClick={download}><Download size={17} /> Download {mutual ? "mutual" : "one-way"} NDA (.doc)</button>
      </div>
      <div className="lf-n-tpl__summary" aria-live="polite">
        <Lock size={22} />
        <h3>Your NDA at a glance</h3>
        <dl>
          <dt>Type</dt><dd>{mutual ? "Mutual: both sides protected" : "One-way: only your information protected"}</dd>
          <dt>Parties</dt><dd>{v.a || "Party one"} {mutual ? "⇄" : "→"} {v.b || "Party two"}</dd>
          <dt>Purpose</dt><dd>{v.purpose || "Evaluate a potential business relationship"}</dd>
          <dt>Term</dt><dd>{v.years} year{v.years === "1" ? "" : "s"}, trade secrets indefinitely</dd>
          <dt>Includes</dt><dd>Standard exclusions, return of information, remedies{v.employee === "yes" ? ", whistleblower notice" : ""}</dd>
        </dl>
      </div>
    </Reveal>
  );
}

export default function NdaAgreement() {
  const [pick, setPick] = useState(0);
  const s = SCENARIOS[pick];

  return (
    <div className="svc mc-page lf-page lf-nda">
      <Seo {...FORMS_SEO[PATH]} path={PATH} faqs={FAQS} />

      <FormHero
        label="Non-Disclosure Agreement (NDA)"
        title="Non-disclosure agreement (NDA) template, mutual or one-way"
        subtitle={<>Before you share a product idea, client list, source code or financials, <strong>put an NDA in place</strong>. Find out whether you need one, pick the right type and term, then generate your own in minutes.</>}
        primary={{ label: "Create my NDA", href: "#lf-template" }}
        secondary={{ label: "Do I need one?", href: "#lf-when" }}
        visual={<NdaVisual />}
      />

      {/* explanation strip */}
      <section className="lf-n-facts">
        <div className="container">
          <p>An <strong>NDA</strong> is a contract in which one or both parties promise to keep certain information secret and use it only for an agreed purpose. It defines what counts as confidential, what doesn't, how long the duty lasts and what happens if it's broken. A clear NDA also helps show that you took reasonable steps to keep information secret, which matters if you ever need to protect it as a trade secret.</p>
          <div>
            <span><b>Who</b>Disclosing and receiving parties</span>
            <span><b>What</b>Defined confidential information</span>
            <span><b>How long</b>Usually 1–5 years</span>
          </div>
        </div>
      </section>

      {/* scenarios */}
      <Section id="lf-when" title="When do you need an NDA?" subtitle="Pick the situation closest to yours.">
        <Reveal className="lf-n-scen">
          <div className="lf-n-scen__grid">
            {SCENARIOS.map((x, i) => (
              <button key={x.label} type="button" aria-pressed={pick === i} className={pick === i ? "is-on" : ""} onClick={() => setPick(i)}>{x.icon}<span>{x.label}</span></button>
            ))}
          </div>
          <div className={`lf-n-scen__verdict is-${s.verdict}`} key={pick} aria-live="polite">
            <span className="lf-eyebrow">Our suggestion</span>
            <h3>{s.verdict === "none" ? <X size={20} /> : <Check size={20} />}{VERDICTS[s.verdict]}</h3>
            <p>{s.why}</p>
          </div>
        </Reveal>
      </Section>

      {/* one-way vs mutual */}
      <Section tone="gray" title="One-way vs. mutual NDA" subtitle="The right choice depends on who is sharing what.">
        <Reveal className="lf-n-vs">
          <article>
            <div className="lf-n-flow"><span>You</span><ArrowRight size={22} /><span>Them</span></div>
            <h3>One-way (unilateral) NDA</h3>
            <p>Only one party discloses confidential information, and only the recipient takes on obligations.</p>
            <ul><li>Hiring employees, contractors or agencies</li><li>Requesting quotes from manufacturers</li><li>Sharing data with a vendor</li></ul>
          </article>
          <div className="lf-n-vs__or">or</div>
          <article>
            <div className="lf-n-flow"><span>You</span><ArrowLeftRight size={22} /><span>Them</span></div>
            <h3>Mutual (bilateral) NDA</h3>
            <p>Both parties share sensitive information and both promise to protect what they receive.</p>
            <ul><li>Mergers, acquisitions and joint ventures</li><li>Strategic partnerships and co-development</li><li>Two-way technical integrations</li></ul>
          </article>
        </Reveal>
        <p className="lf-small">Don't use a mutual NDA when only you are disclosing. It adds obligations for no benefit and can make negotiation slower.</p>
      </Section>

      {/* duration + scope */}
      <Section title="Confidentiality terms and duration, explained">
        <Reveal className="lf-n-dur">
          <div className="lf-n-dur__scale">
            <span style={{ "--x": "8%" }}><b>1 yr</b>Fast-moving info</span>
            <span style={{ "--x": "38%" }} className="is-hl"><b>2–3 yrs</b>Most common</span>
            <span style={{ "--x": "68%" }}><b>5 yrs</b>Long-term deals</span>
            <span style={{ "--x": "94%" }}><b><InfinityIcon size={18} /></b>Trade secrets</span>
          </div>
          <p>Choose a term that matches how long the information stays valuable. Pricing for a single bid may be stale within a year, while a product roadmap might matter for three. Trade secrets, like a recipe, algorithm or manufacturing process, should be protected for as long as they remain secret, so good NDAs carve them out from the fixed term. Courts may refuse to enforce terms that seem unreasonably long for ordinary information.</p>
        </Reveal>
        <Reveal className="lf-n-scope">
          <div><h3><Check size={18} /> Usually confidential</h3><ul><li>Business plans, pricing and financials</li><li>Customer and supplier lists</li><li>Source code, designs and formulas</li><li>Marketing strategies and unreleased products</li></ul></div>
          <div><h3><X size={18} /> Standard exclusions</h3><ul><li>Information that's already public</li><li>Information the recipient already knew</li><li>Information developed independently</li><li>Information disclosure required by law or court order</li></ul></div>
        </Reveal>
      </Section>

      {/* fine print */}
      <Section tone="soft">
        <Reveal className="lf-n-fine">
          <Info size={22} />
          <div>
            <h3>Legal fine print worth knowing</h3>
            <p><strong>Whistleblower notice:</strong> NDAs with employees and contractors should include the Defend Trade Secrets Act immunity notice to preserve certain remedies. <strong>Harassment claims:</strong> the federal Speak Out Act limits pre-dispute NDAs from silencing sexual harassment or assault claims. <strong>Workplace rights:</strong> employee NDAs can't stop staff from discussing wages or working conditions as protected by labor law.</p>
          </div>
        </Reveal>
      </Section>

      {/* template */}
      <Section id="lf-template" title="Create your NDA" subtitle="Choose the type and term, add the details, and download an editable document.">
        <NdaTemplate />
        <LegalNote />
      </Section>

      <FaqBlock faqs={FAQS} title="NDA questions, answered" variant="split" tone="gray" />

      <Section>
        <RelatedForms current={PATH} variant="tiles" title="Pair your NDA with" />
      </Section>

      {/* CTA: dark lock panel */}
      <section className="lf-n-cta">
        <div className="container">
          <Reveal className="lf-n-cta__box">
            <ShieldCheck size={40} />
            <h2>Protecting something truly valuable?</h2>
            <p>Combine your NDA with trademark, copyright or patent protection for your brand and ideas.</p>
            <div className="lf-actions lf-actions--center">
              <Link to={FORMS_START("nda")} className="lf-btn lf-btn--light">Get a custom NDA <ArrowRight size={17} /></Link>
              <Link to="/business/trademark" className="lf-n-cta__link">Explore brand protection</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <ServiceFooter disclaimer={DISCLAIMER} />
    </div>
  );
}
