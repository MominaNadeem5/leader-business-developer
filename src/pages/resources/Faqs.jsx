import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronDown, ThumbsUp, ThumbsDown, Building2, ShieldCheck, Hash, Landmark, Palette, Handshake, ArrowRight, X } from "lucide-react";
import Seo from "../../components/common/Seo";
import { Reveal, Section, ServiceFooter } from "../../components/service";
import { ResHero, RelatedLinks } from "./ResBits";
import { FaqStackVisual } from "./ResourcesVisual";
import { RES_SEO, RES_DISCLAIMER, SUPPORT_LINKS, HUBS } from "./resources";
import "../forms/Forms.css";
import "./Resources.css";

const PATH = "/resources/support/faqs";

const GROUPS = [
  { id: "formation", label: "Forming a business", icon: <Building2 size={17} />, link: ["/business/llc", "Form an LLC"], qs: [
    ["Which business structure is right for me?", "Most owner-operated small businesses choose an LLC for its liability protection, flexibility and pass-through taxes. Corporations suit businesses raising venture capital. Our LLC vs. corporation guide and quiz can help you decide."],
    ["How long does it take to form an LLC?", "It depends on your state. Online filings are often approved within a few business days, while mailed filings can take several weeks. Expedited processing is available in many states for an additional state fee."],
    ["Can I form an LLC in a state where I don't live?", "Yes. You can form an LLC in any state, but if you do business in your home state you'll usually also need to register there as a foreign LLC, which means two sets of fees and filings. Most small businesses form in the state where they operate."],
    ["Do I need a lawyer to start a business?", "Not usually for a straightforward LLC formation. Filing services and templates cover routine setups. A lawyer is worth it for complex ownership structures, investor deals, regulated industries or disputes."],
    ["Can I form a business if I'm not a U.S. citizen?", "Yes. Non-U.S. residents can generally own a U.S. LLC or corporation. You'll need a U.S. registered agent and address for filings, and getting an EIN and a bank account may take extra steps."],
  ] },
  { id: "compliance", label: "Compliance", icon: <ShieldCheck size={17} />, link: ["/resources/learn/compliance", "Compliance guide"], qs: [
    ["What is an annual report?", "A short filing most states require every year or two to keep your company's details current and keep it in good standing. Missing it can lead to late fees and eventually administrative dissolution."],
    ["What is a registered agent and do I need one?", "A registered agent receives legal papers and official state mail for your company. Every LLC and corporation must have one in each state where it's registered, with a physical address in that state."],
    ["What happens if my company is administratively dissolved?", "The state can end your company's active status, which may affect your liability protection and right to the name. Most states allow reinstatement by filing missed reports and paying fees and penalties."],
    ["Do I still need to file a BOI report?", "Under FinCEN's March 2025 interim final rule, companies formed in the U.S. and their U.S. beneficial owners are exempt. Foreign companies registered to do business in the U.S. may still need to report. Check FinCEN for updates."],
    ["Do I need a business license?", "Most businesses need at least one license or permit, depending on industry and location: city, county, state or federal. Requirements vary widely, so check with your local government or let us research them for you."],
  ] },
  { id: "tax", label: "EIN & taxes", icon: <Hash size={17} />, link: ["/forms/legal/ein", "EIN guide"], qs: [
    ["Do I need an EIN?", "You need one if you have employees, operate as a corporation or partnership (including multi-member LLCs), or file certain excise or employment taxes. Most single-member LLCs get one anyway for banking."],
    ["Is getting an EIN free?", "Yes. The IRS doesn't charge for an EIN. Services that apply for you charge for their time and convenience, not the EIN itself."],
    ["How are LLCs taxed?", "By default, single-member LLCs are taxed like sole proprietorships and multi-member LLCs like partnerships, with profits passing through to owners. An LLC can also elect to be taxed as an S or C corporation."],
    ["What is an S corp election?", "A federal tax election (Form 2553) that lets an eligible LLC or corporation pass income to owners while potentially reducing self-employment taxes. Owners who work in the business must take a reasonable salary."],
  ] },
  { id: "banking", label: "Banking & payments", icon: <Landmark size={17} />, link: ["/banking", "Business banking"], qs: [
    ["Why do I need a separate business bank account?", "It keeps business and personal finances apart, which simplifies bookkeeping and taxes and helps protect your limited liability. Mixing funds is one of the most common reasons courts disregard an LLC's protection."],
    ["What do I need to open a business bank account?", "Typically your formation documents, EIN, operating agreement and identification for each owner. Some banks also ask for a business license or proof of address."],
    ["How do I start accepting card payments?", "You'll need a payment processor or merchant account, plus a way to take payments: a point-of-sale device, online checkout or invoices with payment links. We can help you compare options."],
  ] },
  { id: "brand", label: "Brand & online", icon: <Palette size={17} />, link: ["/branding", "Branding services"], qs: [
    ["Should I trademark my business name?", "If your name is central to your brand and you plan to grow, a federal trademark gives stronger nationwide rights than state registration alone. Run a trademark search first to avoid conflicts."],
    ["What's the difference between a DBA and an LLC?", "A DBA is just a registered trade name. It doesn't create a separate legal entity or protect your personal assets. An LLC is a legal entity that provides liability protection and can have its own DBAs."],
    ["Do I need a website to start a business?", "Not strictly, but most customers look you up online before buying. Even a simple, professional site and an optimized Google Business Profile make you more credible and easier to find."],
  ] },
  { id: "working", label: "Working with us", icon: <Handshake size={17} />, link: ["/consultation", "Book a consultation"], qs: [
    ["How do I get started with Leader Business Developer?", "Pick a service from our menu, or book a free consultation and we'll recommend the right next steps for your business and your budget."],
    ["Is the consultation really free?", "Yes. The initial consultation is free and there's no obligation to buy anything. It's a chance to ask questions and get a clear plan."],
    ["Do you provide legal or tax advice?", "We're a business services provider, not a law firm or accounting firm. We handle filings, setup and compliance tasks and provide general information. For legal or tax advice, we recommend a licensed attorney or CPA."],
    ["How can I contact your team?", "Call or email us, or use the contact form. You'll find all the details, along with our support hours, on the contact page."],
  ] },
];

export default function Faqs() {
  const [q, setQ] = useState("");
  const [g, setG] = useState("all");
  const [open, setOpen] = useState({});
  const [vote, setVote] = useState({});
  const term = q.trim().toLowerCase();
  const allFaqs = useMemo(() => GROUPS.flatMap((x) => x.qs), []);
  const shown = GROUPS.filter((x) => g === "all" || x.id === g)
    .map((x) => ({ ...x, qs: x.qs.filter(([qq, a]) => !term || `${qq} ${a}`.toLowerCase().includes(term)) }))
    .filter((x) => x.qs.length);
  const count = shown.reduce((a, x) => a + x.qs.length, 0);

  return (
    <div className="svc mc-page lf-page rs-page rs-faqs">
      <Seo {...RES_SEO[PATH]} path={PATH} faqs={allFaqs} />

      <ResHero
        hub={HUBS.support}
        label="FAQs"
        title="Frequently asked questions about starting and running a business"
        subtitle={<>Quick, plain-English answers about <strong>forming a business, compliance, EINs, banking, branding</strong> and working with our team. Search or browse by topic.</>}
        primary={{ label: "Browse FAQs", href: "#rs-faqs" }}
        secondary={{ label: "Ask us directly", to: "/contact" }}
        visual={<FaqStackVisual />}
      />

      <Section id="rs-faqs" tone="gray">
        <div className="rs-faqs__layout">
          <aside className="rs-faqs__side">
            <label className="rs-faqs__search"><Search size={17} /><input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search questions" aria-label="Search FAQs" />{q && <button type="button" aria-label="Clear" onClick={() => setQ("")}><X size={14} /></button>}</label>
            <nav aria-label="FAQ topics">
              <button type="button" aria-pressed={g === "all"} className={g === "all" ? "is-on" : ""} onClick={() => setG("all")}>All topics<em>{allFaqs.length}</em></button>
              {GROUPS.map((x) => <button key={x.id} type="button" aria-pressed={g === x.id} className={g === x.id ? "is-on" : ""} onClick={() => setG(x.id)}>{x.icon}{x.label}<em>{x.qs.length}</em></button>)}
            </nav>
          </aside>
          <div className="rs-faqs__main" aria-live="polite">
            <p className="rs-help__count">{count} question{count === 1 ? "" : "s"}{term && <> matching “{q}”</>}</p>
            {shown.map((x) => (
              <Reveal key={x.id} className="rs-faqs__group">
                <h2>{x.icon}{x.label}</h2>
                {x.qs.map(([qq, a]) => {
                  const k = qq; const isOpen = open[k] || !!term;
                  return (
                    <div key={k} className={`rs-faqs__item ${isOpen ? "is-open" : ""}`}>
                      <button type="button" aria-expanded={isOpen} onClick={() => setOpen((o) => ({ ...o, [k]: !o[k] }))}><span>{qq}</span><ChevronDown size={18} /></button>
                      {isOpen && (
                        <div className="rs-faqs__a">
                          <p>{a}</p>
                          <div className="rs-faqs__vote">
                            {vote[k] ? <small>Thanks for your feedback!</small> : <><small>Was this helpful?</small><button type="button" aria-label="Yes" onClick={() => setVote((v) => ({ ...v, [k]: "y" }))}><ThumbsUp size={14} /></button><button type="button" aria-label="No" onClick={() => setVote((v) => ({ ...v, [k]: "n" }))}><ThumbsDown size={14} /></button></>}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
                <Link to={x.link[0]} className="rs-faqs__more">{x.link[1]} <ArrowRight size={14} /></Link>
              </Reveal>
            ))}
            {!count && <div className="rs-help__empty"><p>No questions match your search. Try different words, or send us your question.</p><Link to="/contact" className="lf-btn lf-btn--sm">Ask our team <ArrowRight size={14} /></Link></div>}
          </div>
        </div>
      </Section>

      <Section>
        <Reveal className="rs-band rs-band--split">
          <div><h2>Didn't find your answer?</h2><p>Book a free call with a business specialist, or search our step-by-step help center.</p></div>
          <div className="lf-actions"><Link to="/consultation" className="lf-btn">Book a consultation <ArrowRight size={16} /></Link><Link to="/resources/support/help" className="svc-ghost-btn">Help center</Link></div>
        </Reveal>
        <RelatedLinks items={SUPPORT_LINKS} current={PATH} title="More support options" hub={HUBS.support} />
      </Section>

      <ServiceFooter disclaimer={RES_DISCLAIMER} />
    </div>
  );
}
