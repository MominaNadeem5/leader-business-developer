import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, BarChart3, Search, BookOpen, X } from "lucide-react";
import Seo from "../../components/common/Seo";
import { Reveal, Section, ServiceFooter } from "../../components/service";
import { ResHero, FaqBlock, RelatedLinks } from "./ResBits";
import { BooksVisual } from "./ResourcesVisual";
import { RES_SEO, LEARN_GUIDES, FREE_TOOLS, HUBS } from "./resources";
import "../forms/Forms.css";
import "./Resources.css";

const PATH = "/resources/learn";

const GLOSSARY = [
  ["Articles of organization", "The document filed with the state to create an LLC.", "/forms/legal/articles-of-organization"],
  ["Beneficial owner", "A person who ultimately owns or controls a company."],
  ["C corporation", "A corporation taxed separately from its owners at the corporate rate."],
  ["DBA", "“Doing business as”: a registered trade name different from your legal name.", "/forms/legal/dba"],
  ["EIN", "Employer Identification Number, your business's federal tax ID.", "/forms/legal/ein"],
  ["Foreign qualification", "Registering your company to do business in a state other than where it was formed."],
  ["Good standing", "Status showing your company is current on state filings and fees."],
  ["LLC", "Limited liability company: a flexible entity that protects owners' personal assets.", "/resources/learn/llc-vs-corporation"],
  ["Operating agreement", "An LLC's internal rulebook covering ownership, management and exits.", "/forms/legal/operating-agreement"],
  ["Pass-through taxation", "Business profits are taxed on owners' personal returns, not at the entity level."],
  ["Registered agent", "The person or company that receives legal notices for your business.", "/business/registered-agent"],
  ["S corporation", "A tax election that can reduce self-employment taxes for eligible businesses."],
  ["Sole proprietorship", "A one-owner business with no separate legal entity or liability protection."],
  ["Annual report", "A periodic state filing that keeps your company's information current.", "/forms/legal/annual-report"],
].sort((a, b) => a[0].localeCompare(b[0]));

const FAQS = [
  ["Who are these business guides written for?", "First-time founders and small business owners who want clear, practical explanations without legal jargon. Each guide assumes no prior knowledge and links to tools and forms for the next step."],
  ["In what order should I read the guides?", "Start with Starting Your First Business for the big picture, then LLC or Corporation? to choose a structure, Picking a Business Name before you file, and Staying Compliant once you're up and running."],
  ["Are the guides kept up to date?", "We review guides regularly and update them when rules change, such as federal reporting requirements or common state fees. Each guide notes where details vary by state so you know what to double-check."],
  ["Can I use these guides instead of a lawyer or accountant?", "They're a great way to understand your options and prepare good questions, but they're general information, not legal or tax advice. For decisions specific to your situation, talk to a licensed professional."],
  ["Is there a glossary of business terms?", "Yes. The A–Z glossary on this page explains the terms you'll see most often when forming and running a business, with links to deeper guides and forms."],
];

export default function LearnHub() {
  const [q, setQ] = useState("");
  const term = q.trim().toLowerCase();
  const terms = GLOSSARY.filter(([t, d]) => !term || `${t} ${d}`.toLowerCase().includes(term));
  const [feat, ...rest] = LEARN_GUIDES;

  return (
    <div className="svc mc-page lf-page rs-page rs-learn">
      <Seo {...RES_SEO[PATH]} path={PATH} faqs={FAQS} />

      <ResHero
        hub={HUBS.learn}
        title="Learn: practical guides for starting and running your business"
        subtitle={<>Plain-English guides that take you from first idea to a compliant, growing company. <strong>Each takes under ten minutes</strong> and ends with a clear next step.</>}
        primary={{ label: "Start with the basics", to: feat.path }}
        secondary={{ label: "Browse the glossary", href: "#rs-glossary" }}
        visual={<BooksVisual />}
      />

      {/* featured + cards */}
      <Section>
        <Reveal className="rs-learn__feat">
          <span className="rs-learn__badge">Start here</span>
          <div className="rs-learn__icon"><feat.icon size={34} /></div>
          <div>
            <h2><Link to={feat.path}>{feat.title}</Link></h2>
            <p>{feat.short} Validate your idea, choose a structure, register, get your EIN and launch, with progress tracking along the way.</p>
            <div className="rs-learn__meta"><span><Clock size={14} /> {feat.minutes} min read</span><span><BarChart3 size={14} /> {feat.level}</span></div>
          </div>
          <Link to={feat.path} className="lf-btn">Read the guide <ArrowRight size={16} /></Link>
        </Reveal>
        <Reveal className="rs-learn__grid">
          {rest.map((g, i) => (
            <Link key={g.path} to={g.path} style={{ "--i": i }}>
              <span className="ic"><g.icon size={24} /></span>
              <b>{g.title}</b>
              <small>{g.short}</small>
              <div className="rs-learn__meta"><span><Clock size={13} /> {g.minutes} min</span><span><BarChart3 size={13} /> {g.level}</span></div>
            </Link>
          ))}
        </Reveal>
      </Section>

      {/* learning path */}
      <Section tone="gray" title="Your learning path" subtitle="Read them in this order for the smoothest start.">
        <Reveal className="rs-path">
          {LEARN_GUIDES.map((g, i) => (
            <Link key={g.path} to={g.path} style={{ "--i": i }}>
              <em>{i + 1}</em><span><g.icon size={18} /></span><b>{g.title}</b><small>{["See the big picture", "Choose your structure", "Name it right", "Keep it running"][i]}</small>
            </Link>
          ))}
        </Reveal>
        <p className="lf-small">Prefer to learn by doing? Our <Link to="/resources/tools">free tools</Link> turn each guide into an interactive checklist or calculator.</p>
      </Section>

      {/* glossary */}
      <Section id="rs-glossary" title="Business terms, A to Z" subtitle="Quick definitions for the words you'll meet most often.">
        <Reveal className="rs-gloss">
          <label className="rs-faqs__search"><Search size={17} /><input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Find a term" aria-label="Search glossary" />{q && <button type="button" aria-label="Clear" onClick={() => setQ("")}><X size={14} /></button>}</label>
          <dl>
            {terms.map(([t, d, link]) => (
              <div key={t}><dt><span>{t[0]}</span>{t}</dt><dd>{d}{link && <> <Link to={link}>Learn more <ArrowRight size={12} /></Link></>}</dd></div>
            ))}
          </dl>
          {!terms.length && <p className="lf-small">No terms match “{q}”.</p>}
        </Reveal>
      </Section>

      <FaqBlock faqs={FAQS} title="About our guides" variant="accordion" tone="gray" />

      <Section>
        <Reveal className="rs-band">
          <div><h2><BookOpen size={22} /> Rather talk it through?</h2><p>Book a free consultation and get answers specific to your business.</p></div>
          <Link to="/consultation" className="lf-btn">Book a consultation <ArrowRight size={16} /></Link>
        </Reveal>
        <RelatedLinks items={FREE_TOOLS} title="Put it into practice with free tools" hub={HUBS.tools} />
      </Section>

      <ServiceFooter />
    </div>
  );
}
