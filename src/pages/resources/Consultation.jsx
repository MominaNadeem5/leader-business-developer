import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowRight, ArrowLeft, Check, Building2, ShieldCheck, Landmark, Palette, TrendingUp, HelpCircle, Sun, Sunset, Coffee,
  Mail, Copy, Video, ClipboardList, MessageSquare, ListChecks,
} from "lucide-react";
import Seo from "../../components/common/Seo";
import { Reveal, Section, ServiceFooter } from "../../components/service";
import { ResHero, Field, Segmented, FaqBlock, RelatedLinks } from "./ResBits";
import { BookingVisual } from "./ResourcesVisual";
import { RES_SEO, RES_DISCLAIMER, SUPPORT_LINKS, HUBS } from "./resources";
import { CONTACT } from "../../data/site";
import "../forms/Forms.css";
import "./Resources.css";

const PATH = "/consultation";

const TOPICS = {
  formation: ["Start or form a business", <Building2 size={20} key="a" />],
  compliance: ["Compliance & filings", <ShieldCheck size={20} key="b" />],
  banking: ["Banking & payments", <Landmark size={20} key="c" />],
  brand: ["Branding & website", <Palette size={20} key="d" />],
  marketing: ["Marketing & growth", <TrendingUp size={20} key="e" />],
  other: ["Something else", <HelpCircle size={20} key="f" />],
};
const WINDOWS = [["morning", "Morning", "9 a.m.–12 p.m.", <Coffee size={16} key="m" />], ["midday", "Midday", "12–3 p.m.", <Sun size={16} key="d" />], ["afternoon", "Late afternoon", "3–6 p.m.", <Sunset size={16} key="a" />]];

/* Maps ?service= values used across the site to a topic. */
function topicFor(service = "") {
  if (/llc|corp|dba|formation|business|partnership|operating|articles/.test(service)) return "formation";
  if (/compliance|annual|agent|license|ein|report/.test(service)) return "compliance";
  if (/bank|payment|merchant|invoice/.test(service)) return "banking";
  if (/brand|logo|website|wordpress|shopify|domain|profile|email/.test(service)) return "brand";
  if (/ads|marketing|ecommerce|amazon/.test(service)) return "marketing";
  return service ? "other" : "formation";
}
const pretty = (s) => s.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const FAQS = [
  ["What happens during the consultation?", "A business specialist talks through your goals, answers your questions and recommends practical next steps, whether that's forming an entity, fixing compliance gaps or setting up banking and branding. You'll leave with a clear plan, whether or not you work with us."],
  ["How long is a consultation call?", "Most consultations last about 30 minutes. If your situation needs more time, we'll schedule a follow-up rather than rush."],
  ["How do I choose a time?", "Pick a preferred day and time window in the form. After you send your request, our team replies by email to confirm an exact time, or to suggest the nearest available slot."],
  ["Will the consultation be by phone or video?", "Your choice. Pick phone or video in the form. For video calls we'll send a link along with your confirmation."],
  ["What should I prepare before my consultation?", "A short description of your business idea or current setup, the state you're in, any deadlines, and your questions. If you already have formation documents or notices from the state or IRS, have them handy."],
];

export default function Consultation() {
  const [params] = useSearchParams();
  const service = params.get("service") || "";
  const [step, setStep] = useState(0);
  const [topic, setTopic] = useState(() => topicFor(service));
  const [day, setDay] = useState(null);
  const [win, setWin] = useState("morning");
  const [mode, setMode] = useState("video");
  const [v, setV] = useState({ name: "", email: "", phone: "", stage: "Idea stage", notes: "" });
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const set = (k) => (val) => setV((o) => ({ ...o, [k]: val }));
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "your time zone";

  const days = useMemo(() => {
    const out = []; const d = new Date(); d.setHours(12, 0, 0, 0);
    while (out.length < 10) { d.setDate(d.getDate() + 1); if (d.getDay() !== 0 && d.getDay() !== 6) out.push(new Date(d)); }
    return out;
  }, []);
  const dayLabel = day !== null ? days[day].toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }) : "";
  const validEmail = /\S+@\S+\.\S+/.test(v.email);
  const canSend = v.name.trim() && validEmail;
  const winLabel = WINDOWS.find((w) => w[0] === win);

  const body = `Consultation request\n\nTopic: ${TOPICS[topic][0]}${service ? ` (from: ${pretty(service)})` : ""}\nPreferred day: ${dayLabel || "Flexible"}\nTime window: ${winLabel[1]} (${winLabel[2]}), ${tz}\nCall type: ${mode === "video" ? "Video" : "Phone"}\n\nName: ${v.name}\nEmail: ${v.email}\nPhone: ${v.phone || "-"}\nBusiness stage: ${v.stage}\n\nNotes:\n${v.notes || "-"}`;
  const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(`Consultation request: ${TOPICS[topic][0]}`)}&body=${encodeURIComponent(body)}`;
  const copy = async () => { try { await navigator.clipboard.writeText(body); setCopied(true); } catch { /* clipboard blocked */ } };

  return (
    <div className="svc mc-page lf-page rs-page rs-book">
      <Seo {...RES_SEO[PATH]} path={PATH} faqs={FAQS} />

      <ResHero
        hub={HUBS.support}
        label="Book a Consultation"
        title="Book a free consultation with a business specialist"
        subtitle={<>Tell us what you're working on and when suits you. We'll confirm a time and <strong>walk you through clear, practical next steps</strong>, with no pressure and no obligation.</>}
        primary={{ label: "Request my call", href: "#rs-book" }}
        secondary={{ label: "What to expect", href: "#rs-expect" }}
        visual={<BookingVisual />}
      />

      <Section id="rs-book" tone="gray">
        <Reveal className="rs-book__tool">
          <ol className="rs-cc__steps">{["Topic", "Preferred time", "Your details"].map((s, i) => <li key={s} className={i === step ? "is-on" : i < step || sent ? "is-done" : ""}><span>{i < step || sent ? <Check size={13} /> : i + 1}</span>{s}</li>)}</ol>

          {sent ? (
            <div className="rs-book__sent">
              <Mail size={34} />
              <h3>Almost done: send the email to finish</h3>
              <p>Your email app should have opened with your request addressed to <b>{CONTACT.email}</b>. Press send, and we'll reply to confirm your time. If nothing opened, copy your request and email it to us, or call <a href={`tel:${CONTACT.phone.replace(/[^\d+]/g, "")}`}>{CONTACT.phone}</a>.</p>
              <pre>{body}</pre>
              <div className="lf-actions lf-actions--center">
                <a href={mailto} className="lf-btn"><Mail size={16} /> Open email again</a>
                <button type="button" className="svc-ghost-btn" onClick={copy}>{copied ? <Check size={15} /> : <Copy size={15} />} {copied ? "Copied" : "Copy request"}</button>
                <button type="button" className="svc-ghost-btn" onClick={() => { setSent(false); setStep(0); }}>Edit request</button>
              </div>
            </div>
          ) : (
            <>
              {step === 0 && (
                <div className="rs-book__body">
                  {service && <p className="rs-book__from">You came from <b>{pretty(service)}</b>, so we've pre-selected a topic. Change it if you like.</p>}
                  <div className="rs-book__topics">
                    {Object.entries(TOPICS).map(([k, [l, ic]]) => <button key={k} type="button" aria-pressed={topic === k} className={topic === k ? "is-on" : ""} onClick={() => setTopic(k)}>{ic}{l}</button>)}
                  </div>
                </div>
              )}
              {step === 1 && (
                <div className="rs-book__body">
                  <span className="lf-seg-label">Preferred day</span>
                  <div className="rs-book__days">
                    {days.map((d, i) => <button key={i} type="button" aria-pressed={day === i} className={day === i ? "is-on" : ""} onClick={() => setDay(i)}><small>{d.toLocaleDateString("en-US", { weekday: "short" })}</small><b>{d.getDate()}</b><small>{d.toLocaleDateString("en-US", { month: "short" })}</small></button>)}
                  </div>
                  <span className="lf-seg-label">Time window <small>({tz})</small></span>
                  <div className="rs-book__wins">
                    {WINDOWS.map(([k, l, t, ic]) => <button key={k} type="button" aria-pressed={win === k} className={win === k ? "is-on" : ""} onClick={() => setWin(k)}>{ic}<b>{l}</b><small>{t}</small></button>)}
                  </div>
                  <Segmented label="Call type" value={mode} onChange={setMode} options={[["video", "Video call"], ["phone", "Phone call"]]} />
                </div>
              )}
              {step === 2 && (
                <div className="rs-book__body">
                  <div className="lf-grid-2">
                    <Field label="Full name *" value={v.name} onChange={set("name")} placeholder="Jordan Lee" autoComplete="name" />
                    <Field label="Email *" type="email" value={v.email} onChange={set("email")} placeholder="you@example.com" autoComplete="email" />
                    <Field label="Phone (optional)" type="tel" value={v.phone} onChange={set("phone")} placeholder="(555) 010-2040" autoComplete="tel" />
                    <label className="lf-field"><span>Business stage</span><select value={v.stage} onChange={(e) => set("stage")(e.target.value)}>{["Idea stage", "Starting now", "Operating under 1 year", "Operating 1+ years"].map((s) => <option key={s}>{s}</option>)}</select></label>
                  </div>
                  <label className="lf-field"><span>What would you like to discuss?</span><textarea rows={4} value={v.notes} maxLength={1200} onChange={(e) => set("notes")(e.target.value)} placeholder="A few lines about your business and questions" /></label>
                  <div className="rs-book__review"><b>Your request:</b> {TOPICS[topic][0]} · {dayLabel || "Flexible day"} · {winLabel[1]} · {mode === "video" ? "Video" : "Phone"}</div>
                </div>
              )}
              <div className="rs-cc__nav">
                {step > 0 ? <button type="button" className="svc-ghost-btn" onClick={() => setStep(step - 1)}><ArrowLeft size={16} /> Back</button> : <span />}
                {step < 2 ? <button type="button" className="lf-btn" onClick={() => setStep(step + 1)}>Next <ArrowRight size={16} /></button>
                  : <a href={canSend ? mailto : undefined} className={`lf-btn ${canSend ? "" : "is-disabled"}`} aria-disabled={!canSend} onClick={(e) => { if (!canSend) { e.preventDefault(); return; } setSent(true); }}>Send request <ArrowRight size={16} /></a>}
              </div>
              {step === 2 && !canSend && <p className="rs-book__hint">Add your name and a valid email to send your request.</p>}
            </>
          )}
        </Reveal>
      </Section>

      {/* expect */}
      <Section id="rs-expect" title="What to expect">
        <Reveal className="rs-expect">
          {[[<ClipboardList size={22} key="a" />, "Send your request", "Choose a topic and preferred time. It takes about a minute."], [<Mail size={22} key="b" />, "We confirm a time", "Our team replies by email to lock in your slot and share a call link."], [<Video size={22} key="c" />, "Talk it through", "A focused conversation about your goals, questions and options."], [<ListChecks size={22} key="d" />, "Leave with a plan", "Clear next steps, whether you do them yourself or with us."]].map(([ic, t, d], i) => (
            <div key={t} style={{ "--i": i }}><span>{ic}</span><em>{i + 1}</em><b>{t}</b><small>{d}</small></div>
          ))}
        </Reveal>
      </Section>

      {/* prep */}
      <Section tone="soft">
        <Reveal className="rs-prep">
          <MessageSquare size={28} />
          <div>
            <h3>Make the most of your call</h3>
            <ul>
              <li>Have a one-sentence description of your business or idea ready</li>
              <li>Know which state you're in (or plan to form in)</li>
              <li>Write down your top three questions</li>
              <li>Keep any state, IRS or bank letters handy</li>
            </ul>
          </div>
          <Link to="/resources/learn/start-business" className="svc-ghost-btn">Read the startup roadmap</Link>
        </Reveal>
      </Section>

      <FaqBlock faqs={FAQS} title="Consultation FAQs" variant="split" tone="gray" />

      <Section>
        <RelatedLinks items={SUPPORT_LINKS} current={PATH} title="Other ways to reach us" variant="list" hub={HUBS.support} />
      </Section>

      <ServiceFooter disclaimer={RES_DISCLAIMER} />
    </div>
  );
}
