import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Landmark, Building2, MapPin, FolderLock, Info, CalendarCheck, Bell, PiggyBank, FileText, UserCheck, HeartPulse } from "lucide-react";
import Seo from "../../components/common/Seo";
import { Reveal, Section, ServiceFooter } from "../../components/service";
import { ResHero, FaqBlock, RelatedLinks } from "./ResBits";
import { YearWheelVisual } from "./ResourcesVisual";
import { RES_SEO, LEARN_GUIDES, HUBS } from "./resources";
import "../forms/Forms.css";
import "./Resources.css";

const PATH = "/resources/learn/compliance";
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/* Typical federal dates for calendar-year businesses; state examples are labeled. */
const CAL = [
  [["15", "Fed", "Final estimated tax payment for the prior year"], ["31", "Fed", "W-2s to employees and 1099-NECs to contractors (and to the SSA/IRS)"], ["31", "Fed", "Form 941 for Q4 and annual Form 940 (FUTA)"]],
  [["—", "Tip", "Close last year's books and gather documents for your accountant"], ["—", "State", "Some states' annual reports fall early in the year. Check yours"]],
  [["15", "Fed", "Partnership (1065) and S corp (1120-S) returns, and K-1s to owners"], ["—", "Tip", "File an extension if your return won't be ready"]],
  [["15", "Fed", "Individual returns (incl. Schedule C and single-member LLCs) and C corp returns"], ["15", "Fed", "Q1 estimated tax payment"], ["30", "Fed", "Form 941 for Q1"]],
  [["1", "State", "Example: Florida annual reports due by May 1"], ["15", "State", "Example: Texas franchise tax report due May 15"]],
  [["1", "State", "Example: Delaware LLC annual tax due June 1"], ["15", "Fed", "Q2 estimated tax payment"]],
  [["31", "Fed", "Form 941 for Q2"], ["—", "Tip", "Mid-year check: licenses, permits and insurance renewals"]],
  [["—", "Tip", "Review your books and projected tax bill before Q3"], ["—", "Local", "Check local business tax and license renewal dates"]],
  [["15", "Fed", "Q3 estimated tax payment"], ["15", "Fed", "Extended partnership and S corp returns due"]],
  [["15", "Fed", "Extended individual and C corp returns due"], ["31", "Fed", "Form 941 for Q3"]],
  [["—", "Tip", "Collect W-9s from every contractor you paid this year"], ["—", "Tip", "Decide on tax elections (e.g. S corp) for next year with your CPA"]],
  [["—", "Internal", "Corporations: hold and document the annual meeting"], ["—", "Internal", "Update ownership records, minutes and registered agent details"]],
];

const LAYERS = [
  { icon: <Landmark size={20} />, t: "Federal", items: ["Income tax returns", "Estimated tax payments", "Payroll taxes and forms", "Information returns (1099s, W-2s)"] },
  { icon: <Building2 size={20} />, t: "State", items: ["Annual or biennial reports", "Registered agent requirement", "State income or franchise tax", "Sales tax permits and returns"] },
  { icon: <MapPin size={20} />, t: "Local", items: ["City or county business licenses", "Zoning and occupancy permits", "Local business taxes", "Industry-specific permits"] },
  { icon: <FolderLock size={20} />, t: "Internal", items: ["Operating agreement or bylaws", "Meeting minutes and resolutions", "Separate business bank account", "Ownership and contract records"] },
];

const FAQS = [
  ["What does it mean to be “in good standing”?", "It means your company is up to date with its state obligations, typically annual reports, fees, franchise taxes and a registered agent on file. Banks, lenders and partners often ask for a certificate of good standing before doing business with you."],
  ["What happens if my business misses a compliance deadline?", "Consequences escalate: late fees and interest first, then loss of good standing, and eventually administrative dissolution by the state. A dissolved company can lose its liability protection and even its name until it's reinstated, which usually costs more than filing on time."],
  ["Does a single-member LLC have compliance requirements?", "Yes. A single-member LLC still files its state's annual report (where required), keeps a registered agent, reports income on the owner's tax return, and should keep business finances and records separate from personal ones to protect its liability shield."],
  ["Do I still need to file a beneficial ownership (BOI) report?", "As of FinCEN's March 2025 interim final rule, companies created in the United States and their U.S. beneficial owners are exempt from BOI reporting. Foreign companies registered to do business in the U.S. may still need to report. Check FinCEN's website for the latest status."],
  ["Do I need to collect sales tax?", "It depends on what you sell and where your customers are. Most states tax physical goods, and some tax certain services and digital products. Online sellers may owe tax in states where they meet economic nexus thresholds. Register for a sales tax permit before you start collecting."],
];

export default function Compliance() {
  const [m, setM] = useState(new Date().getMonth());

  return (
    <div className="svc mc-page lf-page rs-page rs-comp">
      <Seo {...RES_SEO[PATH]} path={PATH} faqs={FAQS} />

      <ResHero
        hub={HUBS.learn}
        label="Staying Compliant"
        title="Staying compliant: the small business guide to deadlines and good standing"
        subtitle={<>Compliance isn't one filing, it's a rhythm. See <strong>what's due each month</strong>, understand your federal, state, local and internal obligations, and build habits that keep you out of trouble.</>}
        primary={{ label: "See the calendar", href: "#rs-cal" }}
        secondary={{ label: "Check my compliance", to: "/resources/tools/compliance-check" }}
        visual={<YearWheelVisual />}
      />

      {/* layers */}
      <Section>
        <div className="rs-comp__intro">
          <Reveal className="rs-rings" aria-hidden="true">
            {["Internal", "Local", "State", "Federal"].map((l, i) => <span key={l} style={{ "--i": i }}><b>{l}</b></span>)}
          </Reveal>
          <div>
            <h2>What “compliance” actually means</h2>
            <p>Business compliance is everything you must do to keep your company legally active and in good standing: filing reports and tax returns on time, holding the right licenses, keeping a registered agent and maintaining proper records. Miss enough of it and the state can dissolve your company, removing the liability protection you formed it for.</p>
            <p>It helps to think in four layers. <strong>Federal</strong> obligations are mostly taxes. <strong>State</strong> obligations keep your entity alive. <strong>Local</strong> rules cover licenses and permits where you operate. <strong>Internal</strong> records prove your company is a real, separate business. Need the forms? See our <Link to="/forms/legal/annual-report">annual report guide</Link>.</p>
          </div>
        </div>
      </Section>

      {/* calendar */}
      <Section id="rs-cal" tone="gray" title="Month-by-month compliance calendar" subtitle="Typical deadlines for calendar-year businesses. Pick a month.">
        <Reveal className="rs-cal">
          <div className="rs-cal__months">
            {MONTHS.map((x, i) => <button key={x} type="button" aria-pressed={m === i} className={`${m === i ? "is-on" : ""} ${i === new Date().getMonth() ? "is-now" : ""}`} onClick={() => setM(i)}>{x}</button>)}
          </div>
          <div className="rs-cal__list" key={m}>
            <h3><CalendarCheck size={20} /> {new Date(2026, m, 1).toLocaleString("en-US", { month: "long" })}</h3>
            {CAL[m].map(([d, tag, t], i) => (
              <div key={t} style={{ "--i": i }}><span className="day">{d}</span><em className={`tag ${tag.toLowerCase()}`}>{tag}</em><p>{t}</p></div>
            ))}
          </div>
        </Reveal>
        <p className="lf-small">Deadlines falling on a weekend or holiday move to the next business day. Fiscal-year businesses and state deadlines differ, so confirm your dates with your accountant and Secretary of State.</p>
      </Section>

      {/* layers detail */}
      <Section title="Your ongoing obligations, layer by layer">
        <Reveal className="rs-layers">
          {LAYERS.map((l, i) => (
            <div key={l.t} style={{ "--i": i }}>
              <span>{l.icon}</span><h3>{l.t}</h3>
              <ul>{l.items.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          ))}
        </Reveal>
      </Section>

      {/* BOI */}
      <Section tone="soft">
        <Reveal className="rs-boi">
          <Info size={24} />
          <div>
            <h3>Update: beneficial ownership (BOI) reporting</h3>
            <p>Under FinCEN's interim final rule issued in March 2025, companies formed in the United States and their U.S. beneficial owners are no longer required to file BOI reports under the Corporate Transparency Act. Foreign companies registered to do business in a U.S. state may still need to report. Rules in this area have changed several times, so check FinCEN's official BOI page for the current status.</p>
          </div>
        </Reveal>
      </Section>

      {/* habits */}
      <Section title="Five habits of compliant businesses">
        <Reveal className="rs-habits">
          {[[<Bell size={18} key="1" />, "Calendar every deadline", "Add state, federal and local dates with reminders 30 and 7 days ahead."],
            [<PiggyBank size={18} key="2" />, "Set aside tax money", "Move a percentage of every payment into a separate tax savings account."],
            [<FileText size={18} key="3" />, "Keep records monthly", "Reconcile your books every month instead of scrambling at tax time."],
            [<UserCheck size={18} key="4" />, "Use a registered agent", "Never miss legal notices, and keep your home address off public records."],
            [<HeartPulse size={18} key="5" />, "Run a yearly check-up", "Review licenses, insurance, agreements and filings once a year."]].map(([ic, t, d], i) => (
            <div key={t} style={{ "--i": i }}><em>{i + 1}</em><span>{ic}</span><b>{t}</b><small>{d}</small></div>
          ))}
        </Reveal>
      </Section>

      <FaqBlock faqs={FAQS} title="Compliance FAQs" variant="cards" tone="gray" />

      <Section>
        <Reveal className="rs-band">
          <div><h2>How compliant are you right now?</h2><p>Take our free 3-minute compliance health check for a score and a personalized action plan.</p></div>
          <div className="lf-actions"><Link to="/resources/tools/compliance-check" className="lf-btn">Check my compliance <ArrowRight size={16} /></Link><Link to="/business/compliance" className="svc-ghost-btn">Compliance services</Link></div>
        </Reveal>
        <RelatedLinks items={LEARN_GUIDES} current={PATH} title="More guides" hub={HUBS.learn} />
      </Section>

      <ServiceFooter />
    </div>
  );
}
