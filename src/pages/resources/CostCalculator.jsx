import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Plus, Trash2, Download, ShoppingBag, Briefcase, Coffee, Store, EyeOff, PiggyBank, Lightbulb } from "lucide-react";
import Seo from "../../components/common/Seo";
import { Reveal, Section, ServiceFooter } from "../../components/service";
import { ResHero, FaqBlock, RelatedLinks, ResNote } from "./ResBits";
import { CoinsVisual } from "./ResourcesVisual";
import { RES_SEO, RES_DISCLAIMER, FREE_TOOLS, HUBS, downloadText } from "./resources";
import "../forms/Forms.css";
import "./Resources.css";

const PATH = "/resources/tools/cost-calculator";
const usd = (n) => `$${Math.round(n).toLocaleString()}`;
const COLORS = ["#2fa24f", "#0a3a2a", "#c9a227", "#3b82f6", "#e0457b", "#14b8a6", "#f97316", "#8b5cf6"];

/* Sample starting points only. Users edit every line. */
const PRESETS = {
  online: { label: "Online store", icon: <ShoppingBag size={18} />, once: [["LLC formation & EIN", 400], ["Logo & branding", 500], ["Website / store setup", 1200], ["Starting inventory", 3000], ["Product photography", 400]], monthly: [["Ecommerce platform & apps", 80], ["Marketing & ads", 600], ["Shipping supplies", 150], ["Accounting software", 30]] },
  service: { label: "Service business", icon: <Briefcase size={18} />, once: [["LLC formation & EIN", 400], ["Logo & website", 900], ["Laptop & equipment", 1500], ["Business insurance (first year)", 600]], monthly: [["Software & subscriptions", 120], ["Marketing", 300], ["Phone & internet", 90], ["Accounting & bookkeeping", 100]] },
  cafe: { label: "Café / food", icon: <Coffee size={18} />, once: [["LLC formation & licenses", 1200], ["Kitchen equipment", 25000], ["Build-out & furniture", 20000], ["Initial food inventory", 4000], ["Signage & branding", 2500]], monthly: [["Rent", 4000], ["Payroll", 9000], ["Food & supplies", 5000], ["Utilities", 900], ["Insurance", 300]] },
  retail: { label: "Retail shop", icon: <Store size={18} />, once: [["LLC formation & permits", 800], ["Lease deposit", 6000], ["Fixtures & build-out", 12000], ["Opening inventory", 15000], ["POS system", 1500]], monthly: [["Rent", 3500], ["Staff wages", 6000], ["Utilities & internet", 600], ["Marketing", 800], ["Insurance", 250]] },
};

const FAQS = [
  ["How much does it cost to start a small business?", "It ranges from a few hundred dollars for a home-based service business to six figures for a restaurant or retail store with a physical location. The biggest drivers are premises, equipment, inventory and staff. Building your own estimate line by line is far more useful than an average."],
  ["What's the difference between one-time and monthly startup costs?", "One-time costs are paid once to get started, such as formation fees, equipment, build-out and opening inventory. Monthly costs recur, such as rent, software, payroll and marketing. Until revenue covers monthly costs, you need cash to pay them, which is why runway matters."],
  ["How many months of expenses should I budget for?", "Many advisors suggest enough to cover three to six months of operating expenses, and longer for businesses that take time to build a customer base, like restaurants or B2B services. Use the runway slider to see how the total changes."],
  ["Why add a contingency buffer?", "Costs almost always run higher than planned, from permit delays to equipment surprises. A 10–20% buffer helps you absorb the unexpected without running out of cash at the worst moment."],
  ["Can I deduct my startup costs on my taxes?", "Often, yes. Federal rules generally let you deduct up to $5,000 of startup costs (and separately up to $5,000 of organizational costs) in your first year, with the deduction reduced once costs exceed $50,000. The rest is amortized over 15 years. Ask a tax professional how this applies to you."],
];

function List({ title, rows, setRows, suffix }) {
  const upd = (i, k, v) => setRows((r) => r.map((x, j) => (j === i ? (k === 0 ? [v, x[1]] : [x[0], v]) : x)));
  return (
    <div className="rs-cost__list">
      <h3>{title}</h3>
      {rows.map(([n, v], i) => (
        <div key={i} className="rs-cost__row">
          <i style={{ background: COLORS[i % COLORS.length] }} />
          <input aria-label="Cost name" value={n} onChange={(e) => upd(i, 0, e.target.value)} />
          <label><span>$</span><input aria-label="Amount" type="number" min="0" step="50" value={v} onChange={(e) => upd(i, 1, Math.max(0, Number(e.target.value)))} /></label>
          {suffix && <small>{suffix}</small>}
          <button type="button" aria-label={`Remove ${n}`} onClick={() => setRows((r) => r.filter((_, j) => j !== i))}><Trash2 size={14} /></button>
        </div>
      ))}
      {rows.length < 12 && <button type="button" className="lf-p-calc__add" onClick={() => setRows((r) => [...r, ["New item", 0]])}><Plus size={15} /> Add item</button>}
    </div>
  );
}

export default function CostCalculator() {
  const [preset, setPreset] = useState("service");
  const [once, setOnce] = useState(PRESETS.service.once);
  const [monthly, setMonthly] = useState(PRESETS.service.monthly);
  const [months, setMonths] = useState(6);
  const [buffer, setBuffer] = useState(15);
  const choose = (k) => { setPreset(k); setOnce(PRESETS[k].once); setMonthly(PRESETS[k].monthly); };

  const oneTotal = once.reduce((a, [, v]) => a + (Number(v) || 0), 0);
  const moTotal = monthly.reduce((a, [, v]) => a + (Number(v) || 0), 0);
  const runway = moTotal * months;
  const contingency = (oneTotal + runway) * (buffer / 100);
  const total = oneTotal + runway + contingency;
  const parts = [["One-time costs", oneTotal, "#2fa24f"], [`${months} months of expenses`, runway, "#0a3a2a"], ["Contingency", contingency, "#c9a227"]];
  let acc = 0;
  const conic = total ? parts.map(([, v, c]) => { const s = acc; acc += (v / total) * 100; return `${c} ${s}% ${acc}%`; }).join(", ") : "#e5efe8 0 100%";

  const exportCsv = () => {
    const esc = (s) => `"${String(s).replace(/"/g, '""')}"`;
    const lines = [["Type", "Item", "Amount"], ...once.map(([n, v]) => ["One-time", n, v]), ...monthly.map(([n, v]) => ["Monthly", n, v]),
      [], ["Summary", "One-time total", oneTotal], ["Summary", `Monthly x ${months}`, runway], ["Summary", `Contingency ${buffer}%`, Math.round(contingency)], ["Summary", "Total needed", Math.round(total)]];
    downloadText("startup-cost-estimate.csv", lines.map((l) => l.map(esc).join(",")).join("\n"), "text/csv");
  };

  return (
    <div className="svc mc-page lf-page rs-page rs-cost">
      <Seo {...RES_SEO[PATH]} path={PATH} faqs={FAQS} />

      <ResHero
        hub={HUBS.tools}
        label="Startup Cost Calculator"
        title="Startup cost calculator: know exactly how much you need"
        subtitle={<>Start from a template for your type of business, adjust every line, and see your <strong>one-time costs, monthly burn and total budget</strong> with a safety buffer. Download it as a spreadsheet.</>}
        primary={{ label: "Calculate my costs", href: "#rs-cost" }}
        secondary={{ label: "Costs people forget", href: "#rs-forget" }}
        visual={<CoinsVisual />}
      />

      <Section id="rs-cost" tone="gray">
        <Reveal className="rs-cost__presets">
          <span>Start from:</span>
          {Object.entries(PRESETS).map(([k, x]) => <button key={k} type="button" aria-pressed={preset === k} className={preset === k ? "is-on" : ""} onClick={() => choose(k)}>{x.icon}{x.label}</button>)}
        </Reveal>
        <Reveal className="rs-cost__tool">
          <div className="rs-cost__lists">
            <List title="One-time costs" rows={once} setRows={setOnce} />
            <List title="Monthly costs" rows={monthly} setRows={setMonthly} suffix="/mo" />
          </div>
          <aside className="rs-cost__sum" aria-live="polite">
            <label className="lf-range"><span>Months of runway<b>{months}</b></span>
              <input type="range" min="1" max="18" value={months} onChange={(e) => setMonths(Number(e.target.value))} style={{ "--fill": `${((months - 1) / 17) * 100}%` }} /></label>
            <label className="lf-range"><span>Contingency buffer<b>{buffer}%</b></span>
              <input type="range" min="0" max="30" step="5" value={buffer} onChange={(e) => setBuffer(Number(e.target.value))} style={{ "--fill": `${(buffer / 30) * 100}%` }} /></label>
            <div className="rs-cost__donut" style={{ background: `conic-gradient(${conic})` }}><div><small>Total needed</small><b>{usd(total)}</b></div></div>
            <ul>{parts.map(([l, v, c]) => <li key={l}><i style={{ background: c }} />{l}<b>{usd(v)}</b></li>)}</ul>
            <p className="rs-cost__mo">Monthly burn: <b>{usd(moTotal)}</b></p>
            <button type="button" className="lf-btn" onClick={exportCsv}><Download size={16} /> Download CSV</button>
          </aside>
        </Reveal>
        <ResNote>Template amounts are rough examples to get you started, not quotes or benchmarks. Replace them with real prices for your area.</ResNote>
      </Section>

      {/* forgotten costs + savings */}
      <Section id="rs-forget" title="Costs first-time founders forget, and ways to spend less">
        <Reveal className="rs-cost__two">
          <div className="forgot">
            <h3><EyeOff size={19} /> Often forgotten</h3>
            <ul>
              <li>Registered agent and annual report fees</li>
              <li>Business insurance and professional liability</li>
              <li>Payment processing fees (often around 3% per sale)</li>
              <li>Accounting, tax prep and legal reviews</li>
              <li>Software subscriptions that add up month after month</li>
              <li>Your own living expenses before you can pay yourself</li>
            </ul>
          </div>
          <div className="save">
            <h3><Lightbulb size={19} /> Ways to lower startup costs</h3>
            <ul>
              <li>Start from home or a shared workspace before signing a lease</li>
              <li>Buy quality used equipment instead of new</li>
              <li>Pre-sell or take deposits to fund early inventory</li>
              <li>Launch with a lean website and grow it with revenue</li>
              <li>Use free tiers of software until you outgrow them</li>
              <li>Compare business bank accounts with low or no monthly fees</li>
            </ul>
          </div>
        </Reveal>
      </Section>

      {/* tax tip */}
      <Section tone="soft">
        <Reveal className="rs-cost__tax">
          <PiggyBank size={30} />
          <div><h3>Startup costs may be tax deductible</h3><p>Federal tax rules generally let new businesses deduct up to <strong>$5,000</strong> of startup costs in the first year, reduced dollar-for-dollar once total startup costs exceed $50,000, with the remainder deducted over 15 years. Keep receipts for everything you spend before opening, and ask your tax professional how to claim it.</p></div>
        </Reveal>
      </Section>

      <FaqBlock faqs={FAQS} title="Startup cost FAQs" variant="cards" tone="gray" />

      <Section>
        <Reveal className="rs-band">
          <div><h2>Budget ready? Make it official.</h2><p>Formation costs are on your list. Let us handle the LLC filing, EIN and registered agent for you.</p></div>
          <div className="lf-actions"><Link to="/business/llc" className="lf-btn">Start my LLC <ArrowRight size={16} /></Link><Link to="/resources/learn/start-business" className="svc-ghost-btn">Startup roadmap</Link></div>
        </Reveal>
        <RelatedLinks items={FREE_TOOLS} current={PATH} title="More free tools" hub={HUBS.tools} />
      </Section>

      <ServiceFooter disclaimer={RES_DISCLAIMER} />
    </div>
  );
}
