import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, CalendarClock, LifeBuoy, Clock, Send, Check, Copy, ArrowRight, Zap, Hourglass, Inbox } from "lucide-react";
import Seo from "../../components/common/Seo";
import { Reveal, Section, ServiceFooter } from "../../components/service";
import { ResHero, Field, FaqBlock } from "./ResBits";
import { PlaneVisual } from "./ResourcesVisual";
import { RES_SEO, HUBS } from "./resources";
import { CONTACT } from "../../data/site";
import "../forms/Forms.css";
import "./Resources.css";

const PATH = "/contact";
const TEL = `tel:${CONTACT.phone.replace(/[^\d+]/g, "")}`;
const DEPTS = ["General question", "Business formation", "Compliance & filings", "Banking & payments", "Branding & marketing", "Billing & orders"];

const FAQS = [
  ["What's the fastest way to reach Leader Business Developer?", "Calling during business hours is quickest for urgent questions. For anything that needs documents or details, email works best, since it gives our team everything needed to help in one go."],
  ["How quickly will you reply to my message?", "We aim to reply to emails and messages within one business day. Messages sent on weekends or holidays are answered on the next business day."],
  ["What should I include when I contact you?", "Your name, the business name, your order number if you have one, and a short description of what you need. For filing questions, mention your state."],
  ["Can I get help outside business hours?", "Our help center and FAQs are available anytime and answer many common questions. Send us a message after hours and we'll pick it up the next business day."],
  ["I want to discuss a new project. Should I contact you or book a consultation?", "Book a consultation for a focused conversation about a new business, project or service. Use the contact form for quick questions, existing orders or anything else."],
];

export default function Contact() {
  const [v, setV] = useState({ name: "", email: "", dept: DEPTS[0], order: "", msg: "" });
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const set = (k) => (val) => setV((o) => ({ ...o, [k]: val }));
  const ok = v.name.trim() && /\S+@\S+\.\S+/.test(v.email) && v.msg.trim().length >= 10;
  const body = `${v.msg}\n\n---\nName: ${v.name}\nEmail: ${v.email}\nTopic: ${v.dept}${v.order ? `\nOrder number: ${v.order}` : ""}`;
  const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(`[${v.dept}] Message from ${v.name || "website visitor"}`)}&body=${encodeURIComponent(body)}`;

  return (
    <div className="svc mc-page lf-page rs-page rs-contact">
      <Seo {...RES_SEO[PATH]} path={PATH} faqs={FAQS} />

      <ResHero
        hub={HUBS.support}
        label="Contact Us"
        title="Contact us: we're here to help your business"
        subtitle={<>Questions about forming a company, a filing, banking or your order? <strong>Call, email or send us a message</strong> and a real member of our team will get back to you.</>}
        primary={{ label: "Send a message", href: "#rs-form" }}
        secondary={{ label: `Call ${CONTACT.phone}`, href: TEL }}
        visual={<PlaneVisual />}
      />

      {/* methods */}
      <Section>
        <Reveal className="rs-contact__ways">
          <a href={TEL}><span><Phone size={22} /></span><b>Call us</b><strong>{CONTACT.phone}</strong><small>Best for quick or urgent questions</small></a>
          <a href={`mailto:${CONTACT.email}`}><span><Mail size={22} /></span><b>Email us</b><strong>{CONTACT.email}</strong><small>Best for documents and details</small></a>
          <Link to="/consultation"><span><CalendarClock size={22} /></span><b>Book a call</b><strong>Free consultation</strong><small>Best for new projects and advice</small></Link>
          <Link to="/resources/support/help"><span><LifeBuoy size={22} /></span><b>Help center</b><strong>Answers 24/7</strong><small>Best for common how-to questions</small></Link>
        </Reveal>
        <div className="rs-contact__hours"><Clock size={16} /> <b>Support hours:</b> {CONTACT.hours.join(" · ")}</div>
      </Section>

      {/* form */}
      <Section id="rs-form" tone="gray" title="Send us a message" subtitle="Choose a topic so your message reaches the right specialist.">
        <Reveal className="rs-contact__form">
          {sent ? (
            <div className="rs-book__sent">
              <Send size={32} />
              <h3>Your email is ready to send</h3>
              <p>Your email app should have opened with your message to <b>{CONTACT.email}</b>. Press send to deliver it. If nothing opened, copy your message and email it, or give us a call.</p>
              <div className="lf-actions lf-actions--center">
                <a href={mailto} className="lf-btn"><Mail size={16} /> Open email again</a>
                <button type="button" className="svc-ghost-btn" onClick={async () => { try { await navigator.clipboard.writeText(body); setCopied(true); } catch { /* blocked */ } }}>{copied ? <Check size={15} /> : <Copy size={15} />} {copied ? "Copied" : "Copy message"}</button>
                <button type="button" className="svc-ghost-btn" onClick={() => setSent(false)}>Edit message</button>
              </div>
            </div>
          ) : (
            <>
              <div className="rs-contact__depts" role="group" aria-label="Topic">
                {DEPTS.map((d) => <button key={d} type="button" aria-pressed={v.dept === d} className={v.dept === d ? "is-on" : ""} onClick={() => set("dept")(d)}>{d}</button>)}
              </div>
              <div className="lf-grid-2">
                <Field label="Your name *" value={v.name} onChange={set("name")} autoComplete="name" />
                <Field label="Email *" type="email" value={v.email} onChange={set("email")} autoComplete="email" />
              </div>
              {v.dept === "Billing & orders" && <Field label="Order number (if you have one)" value={v.order} onChange={set("order")} />}
              <label className="lf-field"><span>Message *</span><textarea rows={6} maxLength={2000} value={v.msg} onChange={(e) => set("msg")(e.target.value)} placeholder="How can we help?" /></label>
              <div className="rs-contact__send">
                <small>{v.msg.length}/2000 · We'll reply to the email you enter.</small>
                <a href={ok ? mailto : undefined} aria-disabled={!ok} className={`lf-btn ${ok ? "" : "is-disabled"}`} onClick={(e) => { if (!ok) { e.preventDefault(); return; } setSent(true); }}><Send size={16} /> Send message</a>
              </div>
            </>
          )}
        </Reveal>
      </Section>

      {/* response times */}
      <Section title="What happens next">
        <Reveal className="rs-contact__next">
          {[[<Inbox size={20} key="a" />, "We receive it", "Your message lands with the team handling your topic."], [<Hourglass size={20} key="b" />, "Within one business day", "A specialist replies with an answer or next steps."], [<Zap size={20} key="c" />, "Urgent?", "Call us during business hours for the fastest help."]].map(([ic, t, d], i) => (
            <div key={t} style={{ "--i": i }}><span>{ic}</span><b>{t}</b><small>{d}</small></div>
          ))}
        </Reveal>
      </Section>

      <FaqBlock faqs={FAQS} title="Contact FAQs" variant="cards" tone="gray" />

      <Section>
        <Reveal className="rs-band">
          <div><h2>Planning something new?</h2><p>A free consultation is the best way to talk through a new business, project or service.</p></div>
          <Link to="/consultation" className="lf-btn">Book a consultation <ArrowRight size={16} /></Link>
        </Reveal>
      </Section>

      <ServiceFooter />
    </div>
  );
}
