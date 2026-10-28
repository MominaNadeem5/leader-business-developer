import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Search, Phone, Mail, Clock, HelpCircle } from "lucide-react";
import Seo from "../../components/common/Seo";
import { Reveal, Section, ServiceFooter } from "../../components/service";
import { ResHero, FaqBlock, RelatedLinks } from "./ResBits";
import { HeadsetVisual } from "./ResourcesVisual";
import { RES_SEO, SUPPORT_LINKS, LEARN_GUIDES, HUBS } from "./resources";
import { CONTACT } from "../../data/site";
import "../forms/Forms.css";
import "./Resources.css";

const PATH = "/resources/support";
const POPULAR = [["How long does it take to form an LLC?", "LLC"], ["When will I receive my EIN?", "EIN"], ["What does a registered agent do?", "registered agent"], ["How do I check the status of my order?", "order"], ["How do I get a certificate of good standing?", "good standing"]];
const WHEN = [
  ["Quick how-to question", "Help Center", "/resources/support/help"],
  ["General question about business setup", "FAQs", "/resources/support/faqs"],
  ["Planning a new business or project", "Book a consultation", "/consultation"],
  ["Existing order, billing or urgent issue", "Contact us", "/contact"],
];

const FAQS = [
  ["What's the best way to get support?", "For quick how-tos, search the Help Center. For general questions, check the FAQs. To plan something new, book a free consultation. For existing orders, billing or anything urgent, contact our team directly by phone or email."],
  ["What are your support hours?", `Our team is available ${CONTACT.hours.join(", ").toLowerCase()}. The Help Center and FAQs are available around the clock.`],
  ["Do I need an account to get help?", "No. Anyone can use the Help Center, FAQs and free tools, book a consultation or contact our team. If you're an existing customer, including your order number helps us find your details faster."],
  ["Can you help with something that isn't listed on your website?", "Often, yes. If it relates to starting, running or growing a small business, get in touch and we'll either help or point you to the right resource."],
  ["How do I give feedback about your service?", "We'd love to hear it. Send a message through the contact page and choose “General question”. Your feedback goes straight to the team."],
];

export default function SupportHub() {
  const [q, setQ] = useState("");
  const nav = useNavigate();
  const go = (term) => nav(`/resources/support/help${term ? `?q=${encodeURIComponent(term)}` : ""}`);

  return (
    <div className="svc mc-page lf-page rs-page rs-support">
      <Seo {...RES_SEO[PATH]} path={PATH} faqs={FAQS} />

      <ResHero
        hub={HUBS.support}
        title="Support: get the help you need, your way"
        subtitle={<>Search the help center, browse FAQs, <strong>book a free consultation</strong> or talk to our team directly. Whatever you're working on, we'll help you get it done.</>}
        primary={{ label: "Find an answer", href: "#rs-support" }}
        secondary={{ label: "Contact us", to: "/contact" }}
        visual={<HeadsetVisual />}
      />

      {/* search + paths */}
      <Section id="rs-support">
        <Reveal as="form" className="rs-sup__search" onSubmit={(e) => { e.preventDefault(); go(q.trim()); }}>
          <h2>How can we help today?</h2>
          <label><Search size={22} /><input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Describe your question, e.g. registered agent" aria-label="Search support" /><button type="submit" className="lf-btn lf-btn--sm">Search</button></label>
        </Reveal>
        <Reveal className="rs-sup__paths">
          {SUPPORT_LINKS.map((s, i) => (
            <Link key={s.path} to={s.path} style={{ "--i": i }}><span><s.icon size={26} /></span><b>{s.title}</b><small>{s.short}</small><em>Go <ArrowRight size={14} /></em></Link>
          ))}
        </Reveal>
      </Section>

      {/* contact strip */}
      <Section tone="gray">
        <Reveal className="rs-sup__strip">
          <div><Clock size={22} /><span><b>Support hours</b><small>{CONTACT.hours.join(" · ")}</small></span></div>
          <a href={`tel:${CONTACT.phone.replace(/[^\d+]/g, "")}`}><Phone size={22} /><span><b>{CONTACT.phone}</b><small>Call us</small></span></a>
          <a href={`mailto:${CONTACT.email}`}><Mail size={22} /><span><b>{CONTACT.email}</b><small>Email us</small></span></a>
        </Reveal>
      </Section>

      {/* where to go */}
      <Section title="Not sure where to go?">
        <Reveal className="rs-sup__when">
          {WHEN.map(([need, where, to], i) => <Link key={need} to={to} style={{ "--i": i }}><span>{need}</span><ArrowRight size={16} /><b>{where}</b></Link>)}
        </Reveal>
      </Section>

      {/* popular */}
      <Section tone="soft" title="Popular questions">
        <Reveal className="rs-sup__pop">
          {POPULAR.map(([t, term]) => <button key={t} type="button" onClick={() => go(term)}><HelpCircle size={16} />{t}<ArrowRight size={14} /></button>)}
        </Reveal>
      </Section>

      <FaqBlock faqs={FAQS} title="Support FAQs" variant="twocol" />

      <Section tone="gray">
        <RelatedLinks items={LEARN_GUIDES} title="Learn at your own pace" variant="chips" hub={HUBS.learn} />
      </Section>

      <ServiceFooter />
    </div>
  );
}
