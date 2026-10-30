import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Download, Plus, Trash2, User, Users, UserCog, Building, ChevronDown, AlertTriangle, Check } from "lucide-react";
import Seo from "../../components/common/Seo";
import { Reveal, Section, ServiceFooter } from "../../components/service";
import { Field, Segmented, FaqBlock, LegalNote, RelatedForms, FormHero } from "./FormBits";
import { OperatingVisual } from "./FormsVisual";
import { FORMS_SEO, DISCLAIMER, LEGAL_FILINGS, downloadDoc, fill, esc } from "./forms";
import "./Forms.css";

const PATH = "/forms/legal/operating-agreement";

const MATRIX = {
  "single-member": { title: "Single-member, member-managed", text: "The most common setup for solo founders. You own 100% and run everything, so the agreement focuses on proving the LLC is separate from you.", focus: ["Separateness: business and personal finances kept apart", "Authority to sign contracts and open accounts", "Succession: who takes over if you die or become incapacitated", "How to admit future members"] },
  "single-manager": { title: "Single-member, manager-managed", text: "One owner appoints a manager, which can be useful for holding companies or when an owner wants someone else to run operations.", focus: ["Manager's powers and limits", "How the manager is appointed, paid and removed", "Decisions reserved for the owner", "Succession and transfer of the membership interest"] },
  "multi-member": { title: "Multi-member, member-managed", text: "All owners take part in running the business. The agreement must prevent deadlocks and money disputes between partners.", focus: ["Capital contributions and ownership percentages", "Voting thresholds: majority vs. unanimous", "Profit distributions and tax allocations", "Buy-sell terms when a member leaves"] },
  "multi-manager": { title: "Multi-member, manager-managed", text: "Best when some owners are passive investors. Managers handle daily operations; members vote only on major decisions.", focus: ["Clear split between manager and member authority", "Manager duties, compensation and removal", "Investor protections and reporting rights", "Restrictions on transferring membership interests"] },
};

const ARTICLES = [
  ["Formation & purpose", "LLC name, state, principal office, registered agent and business purpose. Confirms the articles of organization were filed."],
  ["Members & ownership", "Each member's name, capital contribution and percentage interest, plus how additional contributions are handled."],
  ["Management & voting", "Member- or manager-managed, who can sign contracts, and which decisions need a majority or unanimous vote."],
  ["Distributions & allocations", "When and how profits are distributed and how profits, losses and tax items are allocated among members."],
  ["Tax classification", "How the LLC is taxed (disregarded entity, partnership or S corporation election) and who acts as the tax contact."],
  ["Books, records & banking", "Where records are kept, members' inspection rights, fiscal year and bank account authority."],
  ["Transfers & new members", "Restrictions on selling interests, rights of first refusal, and how new members are admitted."],
  ["Withdrawal, death & buyout", "What happens when a member leaves, dies, divorces or becomes disabled, and how their interest is valued and paid."],
  ["Dissolution", "Events that end the LLC and the order for paying debts and distributing remaining assets."],
  ["Indemnification & liability", "Protection for members and managers acting in good faith, and limits on personal liability."],
];

const DEFAULTS = [
  ["Profit sharing", "Often split equally or by contribution, depending on your state", "Any split you agree, e.g. 60/40"],
  ["Management", "Usually member-managed with equal votes", "Member- or manager-managed, weighted votes"],
  ["Member leaves", "State rules on buyout or dissolution", "Your own valuation and payment terms"],
  ["Member dies", "Heirs may receive economic rights only, with uncertainty", "Clear succession or buyout funded by insurance"],
  ["Disputes", "Courts apply the state LLC act", "Mediation, buy-sell or deadlock clauses"],
];

const FAQS = [
  ["Is an LLC operating agreement legally required?", "A handful of states, including California, Delaware, Maine, Missouri and New York, require LLCs to have an operating agreement in some form. Elsewhere it's optional, but banks, lenders and investors often ask for one, and it helps protect your limited liability."],
  ["Does a single-member LLC need an operating agreement?", "It's strongly recommended. It shows the LLC is a separate entity from you, which supports your personal liability protection, and it records what happens to the business if you die or become incapacitated."],
  ["Do I file my operating agreement with the state?", "No. Unlike articles of organization, the operating agreement is an internal document. Keep the signed copy with your company records and share it with your bank, accountant or investors when needed."],
  ["Can ownership percentages differ from capital contributions?", "Yes. Members can agree on percentages that reflect money, work, skills or intellectual property. Just document the agreed percentages and how they were determined, and consider tax advice for unequal arrangements."],
  ["How do I change an LLC operating agreement?", "Follow the amendment process written in the agreement, which usually requires a vote or unanimous written consent of the members. Sign a written amendment and keep it with the original."],
];

function OaTemplate() {
  const [llc, setLlc] = useState("");
  const [state, setState] = useState("");
  const [mgmt, setMgmt] = useState("member");
  const [vote, setVote] = useState("Majority");
  const [members, setMembers] = useState([{ name: "", pct: 100, cap: "" }]);
  const total = members.reduce((a, m) => a + (Number(m.pct) || 0), 0);
  const upd = (i, k, val) => setMembers((ms) => ms.map((m, j) => (j === i ? { ...m, [k]: val } : m)));
  const single = members.length === 1;

  const download = () => downloadDoc(`${single ? "single" : "multi"}-member-operating-agreement.doc`, "Operating Agreement", `
<h1>Operating Agreement of ${fill(llc)}</h1>
<p>A ${esc(single ? "single-member" : "multi-member")}, ${mgmt === "member" ? "member-managed" : "manager-managed"} limited liability company organized under the laws of the State of ${fill(state)}.</p>
<h2>1. Formation</h2><p>The Company was formed by filing articles of organization with the State of ${fill(state)}. This Agreement governs the Company's affairs.</p>
<h2>2. Members, Contributions and Ownership</h2><table><tr><th>Member</th><th>Capital contribution</th><th>Ownership %</th></tr>${members.map((m) => `<tr><td>${fill(m.name)}</td><td>${fill(m.cap, "$________")}</td><td>${esc(m.pct)}%</td></tr>`).join("")}</table>
<h2>3. Management</h2><p>${mgmt === "member" ? "The Company is managed by its Members." : "The Company is managed by one or more Managers appointed by the Members, who may remove a Manager by majority vote."} ${single ? "The sole Member has full authority to act for the Company." : `Ordinary decisions require a ${esc(vote.toLowerCase())} vote of Members by ownership percentage. Unanimous consent is required to admit new Members, sell substantially all assets, merge, or amend this Agreement.`}</p>
<h2>4. Distributions and Allocations</h2><p>Profits, losses and distributions are allocated in proportion to ownership percentages, at times determined by ${mgmt === "member" ? "the Members" : "the Managers"}.</p>
<h2>5. Tax Treatment</h2><p>${single ? "The Company will be treated as a disregarded entity for federal tax purposes unless it elects otherwise." : "The Company will be treated as a partnership for federal tax purposes unless it elects otherwise."}</p>
<h2>6. Records and Banking</h2><p>The Company will keep its funds in its own accounts, separate from any Member's personal funds, and maintain books and records at its principal office.</p>
<h2>7. Transfers</h2><p>No Member may transfer an interest without ${single ? "complying with this Agreement" : "first offering it to the other Members on the same terms"}.</p>
<h2>8. Withdrawal, Death or Incapacity</h2><p>${single ? "If the sole Member dies or becomes incapacitated, the Member's designated successor, ____________________, may continue the Company." : "The Company or remaining Members may purchase the interest of a departing, deceased or incapacitated Member at fair market value, payable over ____ months."}</p>
<h2>9. Dissolution</h2><p>On dissolution, assets will be used to pay debts and then distributed to Members according to their capital accounts.</p>
<h2>10. Liability and Indemnification</h2><p>No Member or Manager is personally liable for the Company's debts solely by reason of that role. The Company will indemnify those acting in good faith on its behalf.</p>
<h2>Signatures</h2><table>${members.map((m) => `<tr><td>${fill(m.name)}</td><td>Signature: ____________________</td><td>Date: ________</td></tr>`).join("")}</table>`);

  return (
    <Reveal className="lf-oa-tpl">
      <div className="lf-grid-2">
        <Field label="LLC name" value={llc} onChange={setLlc} placeholder="Bright Leaf Bakery LLC" />
        <Field label="State" value={state} onChange={setState} placeholder="New York" />
      </div>
      <Segmented label="Management" value={mgmt} onChange={setMgmt} options={[["member", "Member-managed"], ["manager", "Manager-managed"]]} />
      <div className="lf-oa-tpl__members">
        <div className="lf-oa-tpl__head"><span>Member</span><span>Contribution</span><span>Ownership %</span><span /></div>
        {members.map((m, i) => (
          <div key={i} className="lf-oa-tpl__row">
            <input aria-label="Member name" value={m.name} placeholder={`Member ${i + 1}`} onChange={(e) => upd(i, "name", e.target.value)} />
            <input aria-label="Capital contribution" value={m.cap} placeholder="$10,000" onChange={(e) => upd(i, "cap", e.target.value)} />
            <input aria-label="Ownership percent" type="number" min="0" max="100" value={m.pct} onChange={(e) => upd(i, "pct", Number(e.target.value))} />
            <button type="button" aria-label="Remove member" disabled={single} onClick={() => setMembers((ms) => ms.filter((_, j) => j !== i))}><Trash2 size={15} /></button>
          </div>
        ))}
        <div className="lf-oa-tpl__total">
          {members.length < 6 && <button type="button" className="lf-p-calc__add" onClick={() => setMembers((ms) => [...ms, { name: "", pct: 0, cap: "" }])}><Plus size={15} /> Add member</button>}
          <span className={total === 100 ? "ok" : "bad"}>{total === 100 ? <Check size={14} /> : <AlertTriangle size={14} />} Total: {total}%{total !== 100 && " (must equal 100%)"}</span>
        </div>
      </div>
      {!single && <Segmented label="Ordinary decisions need" value={vote} onChange={setVote} options={[["Majority", "Majority"], ["Supermajority (two-thirds)", "Two-thirds"], ["Unanimous", "Unanimous"]]} />}
      <button type="button" className="lf-btn" disabled={total !== 100} onClick={download}><Download size={17} /> Download {single ? "single-member" : "multi-member"} agreement (.doc)</button>
    </Reveal>
  );
}

export default function OperatingAgreementForm() {
  const [members, setMembers] = useState("multi");
  const [mgr, setMgr] = useState("member");
  const key = `${members === "single" ? "single" : "multi"}-${mgr === "member" ? "member" : "manager"}`;
  const pick = MATRIX[key];

  return (
    <div className="svc mc-page lf-page lf-oa">
      <Seo {...FORMS_SEO[PATH]} path={PATH} faqs={FAQS} />

      <FormHero
        label="LLC Operating Agreement"
        title="LLC operating agreement template for single- and multi-member LLCs"
        subtitle={<>Set the rules for <strong>ownership, management, money and exits</strong> before you need them. Find the right agreement type, review each article and download an editable copy free.</>}
        primary={{ label: "Create my agreement", href: "#lf-template" }}
        secondary={{ label: "Which type do I need?", href: "#lf-matrix" }}
        visual={<OperatingVisual />}
      />

      {/* explanation + required states */}
      <Section>
        <div className="lf-oa-intro">
          <div>
            <h2>Your LLC's internal rulebook</h2>
            <p>An operating agreement is a private contract among an LLC's members that explains how the company is owned and run. It covers who owns what, who makes decisions, how profits are shared, and what happens when a member joins, leaves or passes away. You don't file it with the state. You keep it with your company records.</p>
            <p>Without one, your state's default LLC rules decide those questions for you, and they rarely match what owners actually want. A written agreement also helps show that your LLC is a genuinely separate business, which supports the liability protection you formed it for. Already filed your <Link to="/forms/legal/articles-of-organization">articles of organization</Link>? This is the next document to sign.</p>
          </div>
          <Reveal as="aside" className="lf-oa-req">
            <h3>Required in some form in:</h3>
            <div>{["California", "Delaware", "Maine", "Missouri", "New York"].map((s) => <span key={s}>{s}</span>)}</div>
            <p>Optional elsewhere, but banks and investors often ask for it.</p>
          </Reveal>
        </div>
      </Section>

      {/* 2x2 matrix */}
      <Section id="lf-matrix" tone="gray" title="Which operating agreement fits your LLC?" subtitle="Pick your number of members and management style.">
        <Reveal className="lf-oa-matrix">
          <div className="lf-oa-matrix__grid">
            <span className="lf-oa-matrix__corner" />
            <span className="lf-oa-matrix__col"><Users size={15} /> Member-managed</span>
            <span className="lf-oa-matrix__col"><UserCog size={15} /> Manager-managed</span>
            {[["single", "Single member", <User size={15} key="u" />], ["multi", "Multiple members", <Users size={15} key="us" />]].map(([m, label, ic]) => (
              <div key={m} className="lf-oa-matrix__row">
                <span className="lf-oa-matrix__rowhead">{ic}{label}</span>
                {["member", "manager"].map((g) => (
                  <button key={g} type="button" aria-pressed={members === m && mgr === g} className={members === m && mgr === g ? "is-on" : ""} onClick={() => { setMembers(m); setMgr(g); }}>
                    {MATRIX[`${m}-${g}`].title.split(", ")[0]}<small>{g === "member" ? "owners run it" : "managers run it"}</small>
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div className="lf-oa-matrix__out" key={key}>
            <span className="lf-eyebrow">Your setup</span>
            <h3>{pick.title}</h3>
            <p>{pick.text}</p>
            <strong>Clauses to get right:</strong>
            <ul>{pick.focus.map((x) => <li key={x}><Check size={14} />{x}</li>)}</ul>
          </div>
        </Reveal>
      </Section>

      {/* table of contents */}
      <Section title="Inside a complete operating agreement" subtitle="Tap an article to see what it covers.">
        <Reveal className="lf-oa-toc">
          <div className="lf-oa-toc__head"><Building size={18} /><b>Operating Agreement</b><small>Table of contents</small></div>
          {ARTICLES.map(([t, d], i) => (
            <details key={t}>
              <summary><em>Article {i + 1}</em><span>{t}</span><i /><ChevronDown size={16} /></summary>
              <p>{d}</p>
            </details>
          ))}
        </Reveal>
      </Section>

      {/* defaults vs agreement */}
      <Section tone="soft" title="State default rules vs. your own agreement" subtitle="What happens if you stay silent, and what you can choose instead.">
        <Reveal className="lf-oa-def">
          <div className="lf-oa-def__head"><span>Topic</span><span>No agreement: state defaults</span><span>With your agreement</span></div>
          {DEFAULTS.map(([t, d, a]) => <div key={t} className="lf-oa-def__row"><strong>{t}</strong><span className="d">{d}</span><span className="a"><Check size={14} />{a}</span></div>)}
        </Reveal>
        <p className="lf-small">Default rules vary by state. Running a business with a partner but not as an LLC? See our <Link to="/forms/templates/partnership">partnership agreement</Link>.</p>
      </Section>

      {/* template */}
      <Section id="lf-template" title="Build your operating agreement" subtitle="Add your members and ownership, choose how decisions are made, and download.">
        <OaTemplate />
        <LegalNote />
      </Section>

      <FaqBlock faqs={FAQS} title="Operating agreement FAQs" variant="cards" tone="gray" />

      {/* CTA */}
      <section className="lf-oa-cta">
        <div className="container lf-oa-cta__row">
          <div>
            <h2>Want an operating agreement tailored to your LLC?</h2>
            <p>We draft custom agreements for multi-member LLCs, investor deals and S corporation elections.</p>
            <Link to="/business/operating-agreement" className="lf-btn">Get a custom agreement <ArrowRight size={17} /></Link>
          </div>
          <RelatedForms current={PATH} group={LEGAL_FILINGS} variant="list" title="Other LLC filings" />
        </div>
      </section>

      <ServiceFooter disclaimer={DISCLAIMER} />
    </div>
  );
}
