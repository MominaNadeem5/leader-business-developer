import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Download, RotateCcw, Check, AlertTriangle, Building2, Landmark, Receipt, FolderLock } from "lucide-react";
import Seo from "../../components/common/Seo";
import { Reveal, Section, ServiceFooter } from "../../components/service";
import { ResHero, Segmented, FaqBlock, RelatedLinks, ResNote } from "./ResBits";
import { PulseGaugeVisual } from "./ResourcesVisual";
import { RES_SEO, FREE_TOOLS, HUBS, downloadText } from "./resources";
import "../forms/Forms.css";
import "./Resources.css";

const PATH = "/resources/tools/compliance-check";
const CATS = { state: ["State", <Building2 size={16} key="s" />], tax: ["Tax", <Landmark size={16} key="t" />], ops: ["Operations", <Receipt size={16} key="o" />], records: ["Records", <FolderLock size={16} key="r" />] };

/* when(profile) decides whether a question applies. w = weight. */
const QUESTIONS = [
  { id: "agent", cat: "state", w: 3, q: "Your registered agent is current and receives mail reliably", when: (p) => p.entity !== "sole", fix: ["Appoint or update your registered agent", "/business/registered-agent"] },
  { id: "report", cat: "state", w: 3, q: "Your latest annual or biennial report was filed on time", when: (p) => p.entity !== "sole", fix: ["File any outstanding annual reports", "/business/annual-report"] },
  { id: "foreign", cat: "state", w: 2, q: "You're registered (foreign-qualified) in every state where you do business", when: (p) => p.states !== "1", fix: ["Register in each state where you operate", "/business/compliance"] },
  { id: "license", cat: "ops", w: 2, q: "Your business licenses and permits are current", when: () => true, fix: ["Renew or obtain required licenses", "/business/licenses"] },
  { id: "ein", cat: "tax", w: 2, q: "You have an EIN (federal tax ID) for the business", when: (p) => p.entity !== "sole" || p.employees === "yes", fix: ["Apply for an EIN", "/business/ein"] },
  { id: "returns", cat: "tax", w: 3, q: "Last year's federal and state tax returns were filed on time", when: () => true, fix: ["File or extend overdue tax returns with a CPA", "/get-started"] },
  { id: "estimated", cat: "tax", w: 2, q: "You make quarterly estimated tax payments when required", when: () => true, fix: ["Set up quarterly estimated payments", "/resources/learn/compliance"] },
  { id: "payroll", cat: "tax", w: 3, q: "Payroll taxes and forms (941, W-2) are filed and deposited on time", when: (p) => p.employees === "yes", fix: ["Get payroll filings up to date", "/get-started"] },
  { id: "wc", cat: "ops", w: 2, q: "You carry workers' compensation insurance where required", when: (p) => p.employees === "yes", fix: ["Check your state's workers' comp rules", "/get-started"] },
  { id: "sales", cat: "tax", w: 2, q: "You hold sales tax permits and file sales tax returns", when: (p) => p.sales === "yes", fix: ["Register for sales tax and file returns", "/get-started"] },
  { id: "bank", cat: "records", w: 3, q: "Business and personal money are kept in separate accounts", when: () => true, fix: ["Open a dedicated business bank account", "/banking"] },
  { id: "agreement", cat: "records", w: 2, q: "You have a signed operating agreement or corporate bylaws", when: (p) => p.entity !== "sole", fix: ["Create your operating agreement", "/forms/legal/operating-agreement"] },
  { id: "minutes", cat: "records", w: 2, q: "Annual meetings are held and minutes recorded", when: (p) => p.entity === "corp", fix: ["Hold and document your annual meeting", "/business/compliance"] },
  { id: "books", cat: "records", w: 2, q: "Bookkeeping is reconciled at least monthly", when: () => true, fix: ["Set up monthly bookkeeping", "/get-started"] },
];

const FAQS = [
  ["How is my compliance health score calculated?", "Each question that applies to your business carries a weight based on how serious the consequences of missing it are. Your score is the share of weighted items you answered “Yes”. “Not sure” counts as a gap, because uncertainty is itself a risk worth checking."],
  ["Is this compliance check a legal audit?", "No. It's a quick self-assessment covering the most common obligations for U.S. small businesses. Your industry, location and size may add requirements. Use it to spot gaps, then confirm details with your accountant or an attorney."],
  ["Is my information saved or shared?", "No. Your answers stay in your browser while you use the tool and aren't sent to us. If you download your action plan, the file is created on your device."],
  ["How often should I check my business's compliance?", "Run a check at least once a year, ideally before tax season, and any time something changes: hiring your first employee, selling in a new state, adding owners or moving locations."],
  ["What should I fix first?", "Start with high-weight state items, like annual reports and registered agent, because they affect your good standing. Then tackle tax filings, and finally record-keeping habits. Your action plan lists gaps in that priority order."],
];

export default function ComplianceCheck() {
  const [step, setStep] = useState(0);
  const [p, setP] = useState({ entity: "llc", states: "1", employees: "no", sales: "no" });
  const [a, setA] = useState({});
  const setPf = (k) => (v) => setP((o) => ({ ...o, [k]: v }));
  const qs = QUESTIONS.filter((q) => q.when(p));
  const total = qs.reduce((s, q) => s + q.w, 0);
  const got = qs.filter((q) => a[q.id] === "yes").reduce((s, q) => s + q.w, 0);
  const score = Math.round((got / total) * 100);
  const answered = qs.filter((q) => a[q.id]).length;
  const gaps = qs.filter((q) => a[q.id] !== "yes").sort((x, y) => y.w - x.w || Object.keys(CATS).indexOf(x.cat) - Object.keys(CATS).indexOf(y.cat));
  const verdict = score >= 85 ? "Healthy" : score >= 60 ? "Some risks" : "Needs attention";
  const catScore = (c) => { const items = qs.filter((q) => q.cat === c); const t = items.reduce((s, q) => s + q.w, 0); return t ? Math.round((items.filter((q) => a[q.id] === "yes").reduce((s, q) => s + q.w, 0) / t) * 100) : null; };

  const exportPlan = () => downloadText("compliance-action-plan.txt",
    `Compliance Health Check: ${score}/100 (${verdict})\nGenerated ${new Date().toLocaleDateString()}\n\nACTION PLAN (highest priority first)\n${gaps.map((g, i) => `${i + 1}. ${g.fix[0]}  [${CATS[g.cat][0]}${a[g.id] === "unsure" ? ", not sure" : ""}]\n   ${g.q}`).join("\n")}\n\nThis is a self-assessment, not legal or tax advice.`);

  return (
    <div className="svc mc-page lf-page rs-page rs-cc">
      <Seo {...RES_SEO[PATH]} path={PATH} faqs={FAQS} />

      <ResHero
        hub={HUBS.tools}
        label="Compliance Health Check"
        title="Compliance health check: find gaps before they become problems"
        subtitle={<>Answer a few quick questions about your business and get a <strong>compliance score, a category breakdown and a prioritized action plan</strong>. Takes about three minutes, with no sign-up.</>}
        primary={{ label: "Start my check", href: "#rs-cc" }}
        secondary={{ label: "Read the compliance guide", to: "/resources/learn/compliance" }}
        visual={<PulseGaugeVisual />}
      />

      <Section id="rs-cc" tone="gray">
        <Reveal className="rs-cc__tool">
          <ol className="rs-cc__steps">{["Your business", "Quick questions", "Your results"].map((s, i) => <li key={s} className={i === step ? "is-on" : i < step ? "is-done" : ""}><span>{i < step ? <Check size={13} /> : i + 1}</span>{s}</li>)}</ol>

          {step === 0 && (
            <div className="rs-cc__body">
              <Segmented label="Business type" value={p.entity} onChange={setPf("entity")} options={[["sole", "Sole proprietor"], ["llc", "LLC"], ["corp", "Corporation"]]} />
              <Segmented label="States where you're registered or operate" value={p.states} onChange={setPf("states")} options={[["1", "Just one"], ["2", "2–3"], ["4", "4 or more"]]} />
              <Segmented label="Do you have employees?" value={p.employees} onChange={setPf("employees")} options={[["no", "No"], ["yes", "Yes"]]} />
              <Segmented label="Do you sell taxable products or services?" value={p.sales} onChange={setPf("sales")} options={[["no", "No"], ["yes", "Yes"], ["unsure", "Not sure"]]} />
              <div className="rs-cc__nav"><span>{qs.length} questions apply to you</span><button type="button" className="lf-btn" onClick={() => setStep(1)}>Next <ArrowRight size={16} /></button></div>
            </div>
          )}

          {step === 1 && (
            <div className="rs-cc__body">
              <div className="rs-cc__qs">
                {qs.map((q, i) => (
                  <div key={q.id} className={`rs-cc__q ${a[q.id] ? `is-${a[q.id]}` : ""}`} style={{ "--i": i }}>
                    <span className="cat">{CATS[q.cat][1]}</span>
                    <p>{q.q}</p>
                    <div role="group" aria-label={q.q}>
                      {[["yes", "Yes"], ["no", "No"], ["unsure", "Not sure"]].map(([v, l]) => <button key={v} type="button" aria-pressed={a[q.id] === v} className={a[q.id] === v ? `is-${v}` : ""} onClick={() => setA((o) => ({ ...o, [q.id]: v }))}>{l}</button>)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="rs-cc__nav">
                <button type="button" className="svc-ghost-btn" onClick={() => setStep(0)}><ArrowLeft size={16} /> Back</button>
                <span>{answered}/{qs.length} answered</span>
                <button type="button" className="lf-btn" onClick={() => setStep(2)}>See my results <ArrowRight size={16} /></button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="rs-cc__res">
              <div className="rs-cc__score">
                <div className="rs-cc__gauge" style={{ "--p": score / 100 }}>
                  <svg viewBox="0 0 120 66" aria-hidden="true"><path className="bg" d="M10 60 A50 50 0 0 1 110 60" /><path className="fg" pathLength="1" d="M10 60 A50 50 0 0 1 110 60" /></svg>
                  <b>{score}<small>/100</small></b>
                </div>
                <h3 className={score >= 85 ? "ok" : score >= 60 ? "mid" : "low"}>{verdict}</h3>
                <div className="rs-cc__cats">
                  {Object.keys(CATS).map((c) => { const s = catScore(c); return s === null ? null : <div key={c}><span>{CATS[c][1]}{CATS[c][0]}</span><i><b style={{ width: `${s}%` }} /></i><em>{s}%</em></div>; })}
                </div>
              </div>
              <div className="rs-cc__plan">
                <h3>Your action plan</h3>
                {gaps.length ? (
                  <ol>{gaps.map((g) => <li key={g.id}><AlertTriangle size={16} /><span><b>{g.fix[0]}</b><small>{a[g.id] === "unsure" ? "Not sure: worth confirming. " : ""}{g.q}</small></span><Link to={g.fix[1]} aria-label={g.fix[0]}><ArrowRight size={16} /></Link></li>)}</ol>
                ) : <p className="rs-cc__clean"><Check size={18} /> No gaps found. Keep up the good habits and re-check yearly.</p>}
                <div className="lf-actions">
                  <button type="button" className="lf-btn" onClick={exportPlan}><Download size={16} /> Download plan</button>
                  <button type="button" className="svc-ghost-btn" onClick={() => { setA({}); setStep(0); }}><RotateCcw size={15} /> Start over</button>
                </div>
              </div>
            </div>
          )}
        </Reveal>
        <ResNote>A self-assessment for general guidance only. Answers stay in your browser and aren't sent anywhere.</ResNote>
      </Section>

      {/* how scoring works */}
      <Section title="What the check covers">
        <Reveal className="rs-cc__cover">
          {[["state", "Keeps your entity active: registered agent, annual reports and foreign registrations."], ["tax", "Federal and state returns, estimated payments, payroll and sales tax."], ["ops", "Licenses, permits and required insurance for operating legally."], ["records", "The separation and documentation that protect your liability shield."]].map(([c, d], i) => (
            <div key={c} style={{ "--i": i }}><span>{CATS[c][1]}</span><b>{CATS[c][0]}</b><small>{d}</small></div>
          ))}
        </Reveal>
        <p className="lf-small">Each item is weighted by how serious the consequences of missing it are. Want the full picture? Read <Link to="/resources/learn/compliance">staying compliant</Link>.</p>
      </Section>

      <FaqBlock faqs={FAQS} title="Compliance check FAQs" variant="twocol" tone="gray" />

      <Section>
        <Reveal className="rs-band">
          <div><h2>Found some gaps?</h2><p>Our compliance team can file overdue reports, act as your registered agent and track every deadline for you.</p></div>
          <Link to="/business/compliance" className="lf-btn">Get compliance help <ArrowRight size={16} /></Link>
        </Reveal>
        <RelatedLinks items={FREE_TOOLS} current={PATH} title="More free tools" variant="list" hub={HUBS.tools} />
      </Section>

      <ServiceFooter />
    </div>
  );
}
