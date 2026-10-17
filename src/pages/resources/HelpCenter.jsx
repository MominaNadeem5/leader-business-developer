import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, ArrowRight, ChevronDown, Rocket, FileCheck2, Hash, UserCheck, FolderOpen, CreditCard, MessageCircleQuestion, CalendarClock, Mail, TrendingUp, X } from "lucide-react";
import Seo from "../../components/common/Seo";
import { Reveal, Section, ServiceFooter } from "../../components/service";
import { ResHero, FaqBlock, RelatedLinks } from "./ResBits";
import { HelpSearchVisual } from "./ResourcesVisual";
import { RES_SEO, RES_DISCLAIMER, SUPPORT_LINKS, HUBS } from "./resources";
import "../forms/Forms.css";
import "./Resources.css";

const PATH = "/resources/support/help";

const CATS = {
  start: ["Getting started", <Rocket size={20} key="a" />],
  filings: ["Orders & filings", <FileCheck2 size={20} key="b" />],
  tax: ["EIN & taxes", <Hash size={20} key="c" />],
  agent: ["Registered agent & mail", <UserCheck size={20} key="d" />],
  docs: ["Documents", <FolderOpen size={20} key="e" />],
  billing: ["Payments & billing", <CreditCard size={20} key="f" />],
};

const ARTICLES = [
  ["start", "Which service should I start with?", ["Not sure where to begin? Most new businesses start by forming an LLC.", "Read our guide on choosing between an LLC and a corporation.", "Or book a free consultation and we'll recommend the right next step."], ["/resources/learn/llc-vs-corporation", "LLC vs. corporation"]],
  ["start", "What information do I need to form my business?", ["Your preferred business name and a backup option.", "The names and addresses of all owners (members).", "A principal business address and registered agent.", "Your management structure: member- or manager-managed."], ["/forms/legal/articles-of-organization", "Articles of organization guide"]],
  ["start", "How do I check if my business name is available?", ["Use our free name availability check to search state records, trademarks, domains and social handles.", "Have a second-choice name ready in case your first is taken."], ["/resources/tools/name-check", "Name availability check"]],
  ["filings", "How long does it take to form an LLC?", ["Timing depends mostly on your state's processing times and filing method.", "Online filings are often approved within days; mailed filings can take weeks.", "Many states offer expedited processing for an extra fee."], ["/business/llc", "LLC formation"]],
  ["filings", "How do I check the status of my order?", ["Look for the confirmation email sent after you placed your order. Check spam or promotions folders too.", "Keep an eye on your inbox for updates as your filing moves forward.", "Contact us with your order number for a personal update."], ["/contact", "Contact support"]],
  ["filings", "The state rejected my filing. What happens now?", ["Rejections usually involve a name conflict or missing information.", "We'll explain the reason and what's needed to correct and resubmit.", "Have an alternative name ready to speed things up."], ["/resources/tools/name-check", "Check alternative names"]],
  ["tax", "When will I receive my EIN?", ["An EIN can only be issued after your business is formed.", "Online IRS applications are typically issued immediately once submitted.", "Applicants without a U.S. Social Security number may face longer processing."], ["/forms/legal/ein", "EIN (SS-4) guide"]],
  ["tax", "I lost my EIN. How do I find it?", ["Check the IRS confirmation letter (CP 575) and past tax returns.", "Your bank, loan or license paperwork often lists it.", "The IRS can provide it to an authorized person after verifying identity."], ["/forms/legal/ein", "EIN guide"]],
  ["tax", "Should my LLC elect S corp taxation?", ["An S corp election can reduce self-employment taxes once profits are steady.", "It requires paying yourself a reasonable salary through payroll.", "Discuss the numbers with a CPA before electing."], ["/resources/learn/llc-vs-corporation", "LLC vs. corporation guide"]],
  ["agent", "What does a registered agent do?", ["Receives lawsuits (service of process) and official state notices for your company.", "Must have a physical address in the state and be available during business hours.", "Keeps your home address off public records if you use a service."], ["/business/registered-agent", "Registered agent service"]],
  ["agent", "How do I change my registered agent?", ["Most states require a change of registered agent form and a small fee.", "Some states let you update the agent on your annual report.", "Make sure the new agent has agreed to serve before filing."], ["/business/registered-agent", "Registered agent service"]],
  ["docs", "Where are my formation documents?", ["Once the state approves your filing, your documents are delivered to you. Check the email you used when ordering.", "Save copies in a secure place with your operating agreement and EIN letter.", "Need another copy? Contact us with your order details."], ["/contact", "Request a copy"]],
  ["docs", "How do I get a certificate of good standing?", ["Certificates are issued by your state's business filing office.", "Your company must be current on annual reports and fees.", "Many states let you order one online for a small fee."], ["/forms/legal/annual-report", "Annual report guide"]],
  ["docs", "How do I create an operating agreement?", ["Use our free fillable operating agreement template.", "Add every member, ownership percentages and how decisions are made.", "Have all members sign and keep it with your company records."], ["/forms/legal/operating-agreement", "Operating agreement template"]],
  ["billing", "Are state fees included in the price?", ["State filing fees are set by each state and vary widely.", "Ask us for a breakdown of service fees and state fees for your state.", "We're happy to give you a full cost estimate before you order."], ["/get-started", "Get a quote"]],
  ["billing", "How do I update my payment details or get a receipt?", ["Reply to your order confirmation email or contact our support team.", "We can resend receipts and help with billing questions.", "Never share full card numbers by email."], ["/contact", "Contact billing"]],
];
const POPULAR = [3, 6, 9, 4];

const FAQS = [
  ["How do I search the help center?", "Type a few words into the search box, like “EIN” or “registered agent”. Results update as you type and search both article titles and steps. You can also browse by category using the tiles below the search."],
  ["What if I can't find an answer in the help center?", "Check our FAQs page for quick answers, book a free consultation for advice about your situation, or contact our support team by phone or email. We're glad to help."],
  ["Are help center articles legal or tax advice?", "No. Articles explain general processes and how our services work. For advice about your specific legal or tax situation, consult a licensed attorney or CPA."],
  ["How often is the help center updated?", "We review articles regularly and update them when state rules, IRS processes or our services change. If something looks out of date, let us know through the contact page."],
  ["Can I link to a help article?", "Yes. You can share the help center page, and include your search term so others land on the same results, for example /resources/support/help?q=EIN."],
];

export default function HelpCenter() {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");
  const [cat, setCat] = useState("all");
  const [open, setOpen] = useState(null);
  const term = q.trim().toLowerCase();
  const list = ARTICLES.map((a, i) => ({ a, i })).filter(({ a }) => (cat === "all" || a[0] === cat) && (!term || `${a[1]} ${a[2].join(" ")}`.toLowerCase().includes(term)));
  const updateQ = (v) => { setQ(v); setParams(v ? { q: v } : {}, { replace: true }); };

  return (
    <div className="svc mc-page lf-page rs-page rs-help">
      <Seo {...RES_SEO[PATH]} path={PATH} faqs={FAQS} />

      <ResHero
        hub={HUBS.support}
        label="Help Center"
        title="Help Center: answers and how-tos for your business"
        subtitle={<>Search step-by-step guides on <strong>orders, filings, EINs, registered agents, documents and billing</strong>. Most answers take less than a minute to read.</>}
        primary={{ label: "Search the help center", href: "#rs-help" }}
        secondary={{ label: "Contact support", to: "/contact" }}
        visual={<HelpSearchVisual />}
      />

      <Section id="rs-help" tone="gray">
        <Reveal className="rs-help__search">
          <Search size={22} />
          <input type="search" value={q} onChange={(e) => updateQ(e.target.value)} placeholder="Search for answers, e.g. EIN, registered agent, order status" aria-label="Search help articles" />
          {q && <button type="button" aria-label="Clear search" onClick={() => updateQ("")}><X size={16} /></button>}
        </Reveal>
        <Reveal className="rs-help__cats">
          <button type="button" aria-pressed={cat === "all"} className={cat === "all" ? "is-on" : ""} onClick={() => setCat("all")}><MessageCircleQuestion size={20} /><b>All topics</b><small>{ARTICLES.length} articles</small></button>
          {Object.entries(CATS).map(([k, [l, ic]]) => (
            <button key={k} type="button" aria-pressed={cat === k} className={cat === k ? "is-on" : ""} onClick={() => setCat(k)}>{ic}<b>{l}</b><small>{ARTICLES.filter((a) => a[0] === k).length} articles</small></button>
          ))}
        </Reveal>
        <div className="rs-help__list" aria-live="polite">
          <p className="rs-help__count">{list.length} result{list.length === 1 ? "" : "s"}{term && <> for “{q}”</>}</p>
          {list.map(({ a: [c, t, steps, link], i }) => (
            <article key={t} className={open === i ? "is-open" : ""}>
              <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
                <span className="ic">{CATS[c][1]}</span><span><b>{t}</b><small>{CATS[c][0]}</small></span><ChevronDown size={18} />
              </button>
              {open === i && <div className="rs-help__body"><ol>{steps.map((s) => <li key={s}>{s}</li>)}</ol><Link to={link[0]}>{link[1]} <ArrowRight size={14} /></Link></div>}
            </article>
          ))}
          {!list.length && <div className="rs-help__empty"><p>No articles match. Try a shorter search, or ask us directly.</p><Link to="/contact" className="lf-btn lf-btn--sm">Contact support <ArrowRight size={14} /></Link></div>}
        </div>
      </Section>

      {/* popular */}
      <Section title="Popular right now">
        <Reveal className="rs-help__pop">
          {POPULAR.map((i, n) => (
            <button key={i} type="button" style={{ "--i": n }} onClick={() => { setCat("all"); updateQ(""); setOpen(i); document.getElementById("rs-help")?.scrollIntoView({ behavior: "smooth" }); }}>
              <TrendingUp size={16} /><b>{ARTICLES[i][1]}</b><small>{CATS[ARTICLES[i][0]][0]}</small>
            </button>
          ))}
        </Reveal>
      </Section>

      {/* still stuck */}
      <Section tone="soft" title="Still need help?" subtitle="Our team is here for anything the articles don't cover.">
        <Reveal className="rs-help__more">
          {[[<MessageCircleQuestion size={24} key="a" />, "Browse FAQs", "Quick answers to common questions.", "/resources/support/faqs"], [<CalendarClock size={24} key="b" />, "Book a consultation", "Free call with a business specialist.", "/consultation"], [<Mail size={24} key="c" />, "Contact us", "Phone, email or send a message.", "/contact"]].map(([ic, t, d, to]) => (
            <Link key={t} to={to}>{ic}<b>{t}</b><small>{d}</small><ArrowRight size={16} /></Link>
          ))}
        </Reveal>
      </Section>

      <FaqBlock faqs={FAQS} title="About the help center" variant="grid" />

      <Section tone="gray">
        <RelatedLinks items={SUPPORT_LINKS} current={PATH} title="Other ways to get support" variant="chips" hub={HUBS.support} />
      </Section>

      <ServiceFooter disclaimer={RES_DISCLAIMER} />
    </div>
  );
}
