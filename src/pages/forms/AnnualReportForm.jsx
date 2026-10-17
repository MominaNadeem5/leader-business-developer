import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Download, CalendarClock, Bell, Building2, MapPin, UserCheck, Users, Mail, PenLine, CreditCard, Hash,
  CalendarCheck,
} from "lucide-react";
import Seo from "../../components/common/Seo";
import { Reveal, Section, ServiceFooter } from "../../components/service";
import { Field, Segmented, FaqBlock, LegalNote, RelatedForms, FormHero } from "./FormBits";
import { AnnualVisual } from "./FormsVisual";
import { FORMS_SEO, DISCLAIMER, LEGAL_FILINGS, downloadDoc, fill, esc } from "./forms";
import "./Forms.css";

const PATH = "/forms/legal/annual-report";
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const NAMES = ["Annual Report", "Biennial Report", "Statement of Information", "Annual Registration", "Periodic Report", "Annual List", "Public Information Report"];

const ON_FORM = [
  { icon: <Building2 size={20} />, t: "Legal name & ID number", d: "Your exact registered name and state entity number." },
  { icon: <MapPin size={20} />, t: "Principal office address", d: "Where the business operates today." },
  { icon: <Mail size={20} />, t: "Mailing address", d: "Where the state should send notices." },
  { icon: <UserCheck size={20} />, t: "Registered agent", d: "Name and in-state street address, confirmed or updated." },
  { icon: <Users size={20} />, t: "Members, managers or officers", d: "Names and addresses of those who run the business." },
  { icon: <Hash size={20} />, t: "Business activity / EIN", d: "Some states ask for a short description or tax ID." },
  { icon: <PenLine size={20} />, t: "Authorized signature", d: "Signed by a member, manager, officer or agent." },
  { icon: <CreditCard size={20} />, t: "Filing fee", d: "Paid online or by check with the report." },
];

const LADDER = [
  ["Reminder", "The state (or your registered agent) sends a notice before the due date."],
  ["Late fee", "Miss the deadline and many states add a penalty on top of the regular fee."],
  ["Not in good standing", "Your status changes, which can block loans, contracts and certificates of good standing."],
  ["Administrative dissolution", "After continued non-filing, the state may dissolve or revoke your company, risking your liability shield and your name."],
  ["Reinstatement", "Getting back usually means filing all missed reports, paying every fee and penalty, plus a reinstatement fee."],
];

const STATES = [
  ["California", "Statement of Information", "Every 2 years (LLCs)", "$20", "Separate $800 annual franchise tax"],
  ["Florida", "Annual Report", "Jan 1 – May 1, yearly", "$138.75 (LLC)", "Steep late fee after May 1"],
  ["New York", "Biennial Statement", "Every 2 years", "$9", "Due in your formation month"],
  ["Georgia", "Annual Registration", "Jan 1 – Apr 1, yearly", "$50", "Can prepay multiple years"],
  ["Delaware", "No annual report for LLCs", "June 1, yearly", "$300 annual tax", "Corporations file an annual report"],
  ["Texas", "Public Information Report", "May 15, yearly", "No report fee", "Filed with the franchise tax report"],
];

const FAQS = [
  ["Is an annual report the same as a tax return?", "No. A state annual report updates your company's basic information, such as addresses, registered agent and managers, so the state's records stay current. Tax returns report income to the IRS and state tax agencies. Some states collect a franchise tax alongside the report, but they're separate obligations."],
  ["When is my LLC's annual report due?", "It depends on your state. Some set the same deadline for every company (for example, Florida's May 1), while others base it on the month you formed. Some require a report only every two years. Use the calculator above, then confirm with your Secretary of State."],
  ["What happens if I file my annual report late?", "Expect a late fee in many states, and your company may fall out of good standing. If you still don't file, the state can administratively dissolve your LLC, which can put your liability protection and business name at risk until you reinstate."],
  ["Can I change information on my annual report?", "Often, yes. Many states let you update addresses, managers or officers when you file. Some changes, such as the company's name or registered agent in certain states, require a separate amendment or change form."],
  ["Do I need to file an annual report if my LLC had no income?", "Usually, yes. The requirement depends on the company being registered with the state, not on whether it earned money. To stop filing, you generally need to formally dissolve the LLC."],
];

function DueCalc() {
  const [formed, setFormed] = useState("2025-03-12");
  const [rule, setRule] = useState("anniversary");
  const [fixedM, setFixedM] = useState(4);
  const [fixedD, setFixedD] = useState(1);
  const [freq, setFreq] = useState("1");

  const base = formed ? new Date(`${formed}T12:00:00`) : null;
  let due = null;
  if (base && !Number.isNaN(base.getTime())) {
    const today = new Date(); today.setHours(12, 0, 0, 0);
    const step = Number(freq);
    let y = base.getFullYear() + 1;
    const mk = (yr) => (rule === "anniversary" ? new Date(yr, base.getMonth() + 1, 0, 12) : new Date(yr, fixedM, Math.min(fixedD, new Date(yr, fixedM + 1, 0).getDate()), 12));
    due = mk(y);
    while (due < today) { y += step; due = mk(y); }
  }
  const fmt = (d) => d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const minus = (days) => new Date(due.getTime() - days * 86400000);
  const daysLeft = due ? Math.ceil((due - new Date()) / 86400000) : 0;

  return (
    <Reveal className="lf-ar-calc">
      <div className="lf-ar-calc__in">
        <Field label="Date your company was formed" type="date" value={formed} onChange={setFormed} />
        <Segmented label="Your state's deadline rule" value={rule} onChange={setRule} options={[["anniversary", "End of formation month"], ["fixed", "Fixed date each year"]]} />
        {rule === "fixed" && (
          <div className="lf-grid-2">
            <label className="lf-field"><span>Due month</span><select value={fixedM} onChange={(e) => setFixedM(Number(e.target.value))}>{MONTHS.map((m, i) => <option key={m} value={i}>{m}</option>)}</select></label>
            <Field label="Due day" type="number" min="1" max="31" value={fixedD} onChange={(n) => setFixedD(Math.min(31, Math.max(1, n || 1)))} />
          </div>
        )}
        <Segmented label="How often" value={freq} onChange={setFreq} options={[["1", "Every year"], ["2", "Every 2 years"]]} />
      </div>
      <div className="lf-ar-calc__out" aria-live="polite">
        {due ? <>
          <span className="lf-eyebrow">Your next report is due</span>
          <div className="lf-ar-calc__date"><CalendarCheck size={26} /><b>{fmt(due)}</b></div>
          <p>{daysLeft} day{daysLeft === 1 ? "" : "s"} from today</p>
          <ol>
            {[[60, "Gather info & check for changes"], [30, "File early: many states accept it now"], [7, "Final reminder"]].map(([d, t]) => (
              <li key={d}><Bell size={14} /><span><b>{fmt(minus(d))}</b>{t}</span></li>
            ))}
          </ol>
        </> : <p>Enter your formation date to see your due date.</p>}
        <small>An estimate based on the rule you chose. Some states use the anniversary date itself or a quarter instead, so confirm with your Secretary of State.</small>
      </div>
    </Reveal>
  );
}

function ArWorksheet() {
  const [v, setV] = useState({ name: "", id: "", state: "", office: "", agent: "", people: "", year: String(new Date().getFullYear()) });
  const [changed, setChanged] = useState([]);
  const set = (k) => (val) => setV((o) => ({ ...o, [k]: val }));
  const opts = ["Principal address", "Mailing address", "Registered agent", "Members / managers", "Officers", "Business activity"];
  const toggle = (o) => setChanged((c) => (c.includes(o) ? c.filter((x) => x !== o) : [...c, o]));
  const download = () => downloadDoc(`annual-report-worksheet-${esc(v.year)}.doc`, "Annual Report Worksheet", `
<h1>Annual Report Worksheet: ${esc(v.year)}</h1>
<p><i>Collect these details, then file on your Secretary of State's website.</i></p>
<table>
<tr><td><b>Legal name</b></td><td>${fill(v.name)}</td></tr>
<tr><td><b>State entity / file number</b></td><td>${fill(v.id)}</td></tr>
<tr><td><b>State of registration</b></td><td>${fill(v.state)}</td></tr>
<tr><td><b>Principal office address</b></td><td>${fill(v.office)}</td></tr>
<tr><td><b>Registered agent</b></td><td>${fill(v.agent)}</td></tr>
<tr><td><b>Members / managers / officers</b></td><td>${fill(v.people)}</td></tr>
</table>
<h2>Changes since last report</h2><p>${changed.length ? changed.map(esc).join(", ") : "None"}</p>
<h2>Filing record</h2><p>Due date: ________ Filed on: ________ Fee paid: $______ Confirmation #: ____________</p>
<p>Signed by: ____________________ Title: ____________ Date: ________</p>`);

  return (
    <Reveal className="lf-ar-ws">
      <div className="lf-grid-2">
        <Field label="Legal company name" value={v.name} onChange={set("name")} placeholder="Bright Leaf Bakery LLC" />
        <Field label="State entity number" value={v.id} onChange={set("id")} placeholder="L26000012345" />
        <Field label="State" value={v.state} onChange={set("state")} placeholder="Florida" />
        <Field label="Report year" value={v.year} onChange={set("year")} inputMode="numeric" />
        <Field label="Principal office address" value={v.office} onChange={set("office")} placeholder="Street, city, ZIP" />
        <Field label="Registered agent" value={v.agent} onChange={set("agent")} placeholder="Leader Registered Agent" />
      </div>
      <Field label="Members, managers or officers" value={v.people} onChange={set("people")} placeholder="Jordan Lee (Managing Member), Sam Chen (Member)" />
      <span className="lf-seg-label">What changed since your last report?</span>
      <div className="lf-ar-ws__chips">
        {opts.map((o) => <button key={o} type="button" aria-pressed={changed.includes(o)} className={changed.includes(o) ? "is-on" : ""} onClick={() => toggle(o)}>{o}</button>)}
      </div>
      <button type="button" className="lf-btn" onClick={download}><Download size={17} /> Download annual report worksheet (.doc)</button>
    </Reveal>
  );
}

export default function AnnualReportForm() {
  return (
    <div className="svc mc-page lf-page lf-ar">
      <Seo {...FORMS_SEO[PATH]} path={PATH} faqs={FAQS} />

      <FormHero
        label="Annual Report Form"
        title="Annual report form: stay compliant and in good standing"
        subtitle={<>Most states require LLCs and corporations to file a yearly or biennial report. <strong>Find your next due date</strong>, see what the form asks for, and keep your details ready with a free worksheet.</>}
        primary={{ label: "Find my due date", href: "#lf-due" }}
        secondary={{ label: "Get the worksheet", href: "#lf-template" }}
        visual={<AnnualVisual />}
      />

      {/* explanation + names */}
      <Section>
        <div className="lf-ar-intro">
          <h2>What is an annual report?</h2>
          <p>An annual report is a short filing that updates your state on your company's key information: its addresses, registered agent, and the people who manage it. It isn't a financial statement and it isn't a tax return. It's how the state confirms your business still exists and how it reaches you. Filing it on time, with the fee, keeps your company <strong>in good standing</strong>.</p>
          <p>Nearly every state requires some version of it for LLCs and corporations, though a few states have no LLC report and some only ask every two years. Deadlines are the tricky part: some states use a single date for everyone, others use your formation month. The details you filed in your <Link to="/forms/legal/articles-of-organization">articles of organization</Link> are the starting point.</p>
          <div className="lf-ar-names"><span>Also called:</span>{NAMES.map((n) => <em key={n}>{n}</em>)}</div>
        </div>
      </Section>

      {/* calculator */}
      <Section id="lf-due" tone="gray" title="Annual report due date calculator" subtitle="Enter your formation date and your state's rule to estimate your next deadline and reminders.">
        <DueCalc />
      </Section>

      {/* on the form */}
      <Section title="What the annual report form asks for" subtitle="Forms differ by state, but these items appear on most of them.">
        <Reveal className="lf-ar-on">
          {ON_FORM.map((x, i) => <div key={x.t} style={{ "--i": i }}><span>{x.icon}</span><b>{x.t}</b><small>{x.d}</small></div>)}
        </Reveal>
      </Section>

      {/* ladder */}
      <Section tone="soft" title="What happens if you miss it" subtitle="Consequences escalate the longer a report goes unfiled.">
        <Reveal className="lf-ar-ladder">
          {LADDER.map(([t, d], i) => <div key={t} style={{ "--i": i }}><em>{i + 1}</em><b>{t}</b><small>{d}</small></div>)}
        </Reveal>
      </Section>

      {/* states */}
      <Section title="How it works in a few states" subtitle="Names, deadlines and fees vary widely. Some examples for LLCs:">
        <Reveal className="lf-table-wrap">
          <table className="lf-table">
            <thead><tr><th>State</th><th>Filing name</th><th>When</th><th>Fee</th><th>Note</th></tr></thead>
            <tbody>{STATES.map(([s, n, w, f, note]) => <tr key={s}><td><strong>{s}</strong></td><td>{n}</td><td>{w}</td><td>{f}</td><td>{note}</td></tr>)}</tbody>
          </table>
        </Reveal>
        <p className="lf-small">For illustration only. Fees and deadlines change, so always confirm on your state's official website before filing.</p>
      </Section>

      {/* template */}
      <Section id="lf-template" tone="gray" title="Annual report worksheet" subtitle="Keep your current details in one place, flag what changed, and download a record for your files.">
        <ArWorksheet />
        <LegalNote />
      </Section>

      <FaqBlock faqs={FAQS} title="Annual report FAQs" variant="twocol" />

      {/* CTA */}
      <section className="lf-ar-cta">
        <div className="container">
          <Reveal className="lf-ar-cta__box">
            <CalendarClock size={36} />
            <h2>Never miss a state deadline again</h2>
            <p>We track your due dates, file your annual reports and keep you in good standing every year.</p>
            <div className="lf-actions lf-actions--center">
              <Link to="/business/annual-report" className="lf-btn lf-btn--light">File my annual report <ArrowRight size={17} /></Link>
              <Link to="/business/compliance" className="lf-ar-cta__link">Explore compliance services</Link>
            </div>
          </Reveal>
          <RelatedForms current={PATH} group={LEGAL_FILINGS} variant="list" title="Other business filings" />
        </div>
      </section>

      <ServiceFooter disclaimer={DISCLAIMER} />
    </div>
  );
}
