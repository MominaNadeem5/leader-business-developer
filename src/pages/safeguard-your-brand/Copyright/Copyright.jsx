import { useEffect, useState } from "react";
import {
  ArrowRight, Gavel, Landmark, BadgeCheck, BookOpen, Music, Image, Camera, Code2, Clapperboard,
  PenTool, Upload, Send, Lightbulb, Type, Database, Globe, Ban, Check, FileText, Stamp, Copyright as CopyrightIcon,
} from "lucide-react";
import Button from "../../../components/common/Button";
import {
  Reveal, ServiceHero, Section, IconCard, PackageCard, StepPath, CompareTable, Explorer, StatStack,
  Checklist, FaqList, Testimonials, ContactCards, CtaBand, ServiceFooter,
} from "../../../components/service";
import "./Copyright.css";

/* ---- EDIT THESE ---- */
const PRICES = { single: "$149", standard: "$249", bundle: "$549" }; // placeholder prices, set your own
const LINKS = {
  start: "/get-started?service=copyright",
  trademark: "/business/trademark",
  attorney: "/contact",
};
/* U.S. Copyright Office electronic filing fees (2025). Check copyright.gov before publishing. */
const OFFICE_FEES = { single: "$45", standard: "$65" };

/* Works that rotate through the hero certificate. */
const WORKS = [
  { kind: "song", title: "Midnight Drive", type: "Sound recording", code: "SR", icon: <Music size={18} /> },
  { kind: "book", title: "The Quiet Harbor", type: "Literary work", code: "TX", icon: <BookOpen size={18} /> },
  { kind: "photo", title: "Golden Hour, Lake", type: "Visual art", code: "VA", icon: <Camera size={18} /> },
  { kind: "code", title: "Brightleaf App v2", type: "Computer program", code: "TX", icon: <Code2 size={18} /> },
];

const whyUs = [
  { icon: <Gavel size={24} />, title: "Unlock your right to sue", text: "For U.S. works, you generally need a registration before you can file an infringement lawsuit in federal court." },
  { icon: <BadgeCheck size={24} />, title: "Bigger damages", text: "Register on time and you may claim statutory damages and attorney's fees, without having to prove exact losses." },
  { icon: <Landmark size={24} />, title: "A public record", text: "Registration puts your ownership on the public record and serves as strong evidence that the work is yours." },
];

const packages = [
  {
    name: "Single Work",
    price: PRICES.single,
    tagline: "One work by one author, who is also the owner. Simple and fast.",
    cta: { label: "Register one work", to: `${LINKS.start}&plan=single` },
    features: ["Eligibility check", "Application prepared for you", "Deposit copy uploaded", "Filed with the U.S. Copyright Office", "Status updates until decision"],
  },
  {
    name: "Standard",
    price: PRICES.standard,
    badge: "Most popular",
    featured: true,
    tagline: "Any type of work, including co-authors, companies and works made for hire.",
    cta: { label: "Start Standard", to: `${LINKS.start}&plan=standard` },
    features: ["Everything in Single Work", "Multiple authors or business owners", "Work-made-for-hire review", "Help describing new vs. existing material", "Correspondence with the Office"],
  },
  {
    name: "Creator Bundle",
    price: PRICES.bundle,
    tagline: "Register three separate works and save. Great for growing portfolios.",
    cta: { label: "Start Bundle", to: `${LINKS.start}&plan=bundle` },
    features: ["3 Standard registrations", "Portfolio review call", "Advice on group registration options", "Infringement letter template", "Priority support"],
  },
];

const steps = [
  { icon: <PenTool size={20} />, title: "Tell us about your work", text: "Answer a few questions about the work, the authors and who owns it. It takes about 10 minutes." },
  { icon: <Upload size={20} />, title: "Upload your copy", text: "Send us the file or copy of the work. We check it meets the Copyright Office's deposit rules." },
  { icon: <Send size={20} />, title: "We file and follow up", text: "We file your application, track it and send you the certificate details once it's registered." },
];

const glyph = (Icon, cls) => <span className={`cr-glyph ${cls || ""}`}><Icon size={44} strokeWidth={1.5} /></span>;
const workTypes = [
  { id: "literary", icon: <BookOpen size={18} />, label: "Writing", preview: glyph(BookOpen), title: "Literary works", text: "Books, articles, blog posts, poems, scripts, course materials and even website copy.", points: ["Fiction and non-fiction", "Online content and newsletters", "Manuals and training guides"] },
  { id: "music", icon: <Music size={18} />, label: "Music", preview: glyph(Music, "is-music"), title: "Music and sound recordings", text: "Songs and the recordings of them are separate works. You can protect the composition, the recording, or both.", points: ["Lyrics and compositions", "Sound recordings and albums", "Podcasts and audio content"] },
  { id: "art", icon: <Image size={18} />, label: "Art & design", preview: glyph(Image), title: "Visual arts", text: "Illustrations, paintings, graphic designs, sculptures and artwork on products.", points: ["Illustrations and digital art", "Fabric and product designs", "Logos with artistic expression*"] },
  { id: "photo", icon: <Camera size={18} />, label: "Photos", preview: glyph(Camera), title: "Photographs", text: "Each photo is a work. Photographers often use group options to register many images at once.", points: ["Published and unpublished photos", "Group options for photographers", "Product and stock photography"] },
  { id: "code", icon: <Code2 size={18} />, label: "Software", preview: glyph(Code2), title: "Software and apps", text: "Source code, apps, games and websites are protected as literary works. Your code is protected, not the idea behind it.", points: ["Source and object code", "Apps, games and websites", "Trade-secret-friendly deposit options"] },
  { id: "film", icon: <Clapperboard size={18} />, label: "Video", preview: glyph(Clapperboard), title: "Films and video", text: "Movies, YouTube videos, ads, animations and online courses are motion pictures.", points: ["Short and long-form video", "Animation and motion graphics", "Online course videos"] },
];

const compareCols = ["", "Automatic copyright", "Registered copyright"];
const compareRows = [
  ["Protection starts when the work is created", true, true],
  ["Public record of your ownership", false, true],
  ["Can sue for infringement (U.S. works)", false, true],
  ["Statutory damages and attorney's fees", false, "If registered in time"],
  ["Strong evidence the work is yours", false, "If registered within 5 years"],
  ["Record with U.S. Customs to stop imports", false, true],
];

const ipCols = ["", "Copyright", "Trademark", "Patent"];
const ipRows = [
  ["Protects", "Creative works", "Brand names, logos, slogans", "Inventions"],
  ["Example", "A song, book or photo", "Your business name", "A new device or process"],
  ["Starts", "When the work is created", "When you use the mark", "When the patent is granted"],
  ["Typical length", "Author's life + 70 years", "As long as you use it", "About 20 years"],
  ["Registered with", "U.S. Copyright Office", "USPTO", "USPTO"],
];

const durations = [
  { who: "You created it", text: "Your lifetime plus 70 years", years: 70, extra: "life +" },
  { who: "Joint authors", text: "Last surviving author's life plus 70 years", years: 70, extra: "life +" },
  { who: "Work made for hire", text: "95 years from publication or 120 from creation, whichever ends first", years: 95 },
];

const notCovered = [
  { icon: <Lightbulb size={18} />, title: "Ideas and methods", text: "Copyright protects how you express an idea, not the idea or system itself." },
  { icon: <Type size={18} />, title: "Names, titles and slogans", text: "Short phrases aren't copyrightable. Protect brand names with a trademark." },
  { icon: <Database size={18} />, title: "Facts and data", text: "Facts are free to all. A creative selection or arrangement of them may be protected." },
  { icon: <Globe size={18} />, title: "Public domain works", text: "Works whose copyright has expired, or that were never protected, belong to everyone." },
];

const stats = [
  { to: 70, label: "years after life", text: "For most works by individual authors, protection lasts the author's lifetime plus 70 years." },
  { to: 3, label: "month window", text: "Register within 3 months of publication to keep statutory damages and fees available for earlier infringements." },
  { to: 150, prefix: "$", suffix: "K", label: "max per work", text: "The maximum statutory damages a court can award for willful infringement of a registered work." },
];

const needsList = [
  "A copy of the work (file, link or physical copy)",
  "The title, and any previous or alternative titles",
  "Name and details of every author",
  "Who owns the copyright now, if not the author",
  "Year the work was finished, and publication date if published",
];

const faqs = [
  ["If copyright is automatic, why register?", "You own copyright the moment you create an original work. Registration adds the tools to enforce it: for U.S. works it's generally required before you can sue, and timely registration makes statutory damages and attorney's fees available."],
  ["How long does registration take?", "Online applications are usually processed in a few months, but times vary. Your registration takes effect on the date the Copyright Office receives a complete application, not when it's approved."],
  ["What does it cost?", `Our service fee plus the Copyright Office fee. Electronic filing fees are ${OFFICE_FEES.single} for a Single Application and ${OFFICE_FEES.standard} for a Standard Application as of 2025, and may change.`],
  ["Can I copyright my business name or logo?", "Names and short slogans can't be copyrighted. A logo with enough original artwork might be, but a trademark is usually the right protection for brand names and logos."],
  ["Do I need to put © on my work?", "It isn't required for works published today, but it's a smart, free warning. Use ©, the year of first publication and the owner's name."],
  ["Who owns work created by employees or freelancers?", "Work created by employees within their job is usually owned by the employer. Freelance work is owned by the freelancer unless there's a written agreement that transfers it or qualifies it as a work made for hire."],
  ["Can I register published and unpublished work?", "Yes. The rules and options differ slightly, and there are group options for some unpublished works, photos and short online pieces."],
  ["Does a U.S. registration protect me abroad?", "Most countries protect U.S. works automatically under international treaties, without local registration. Enforcement rules vary by country."],
];

// Add real customer reviews here. The grid grows automatically.
const testimonials = [
  { quote: "Leader Business Developer was an incredible partner. The process was smooth, and the support team was always available when I needed help.", name: "Shannon Greevy", role: "Customer, California" },
];

/* Small animated artwork for each kind of work. */
function Artwork({ kind }) {
  if (kind === "song") return <div className="cr-art cr-art--song">{[...Array(14)].map((_, i) => <i key={i} style={{ "--i": i }} />)}</div>;
  if (kind === "book") return <div className="cr-art cr-art--book"><b /><b /><b /><span>Chapter 1</span></div>;
  if (kind === "photo") return <div className="cr-art cr-art--photo"><span className="cr-sun" /><span className="cr-hill" /><span className="cr-hill cr-hill--b" /></div>;
  return (
    <div className="cr-art cr-art--code">
      {["const leaf = new Brand();", "leaf.grow({ fast: true });", "export default leaf;"].map((l, i) => <code key={l} style={{ "--i": i }}>{l}</code>)}
    </div>
  );
}

/* Hero: a registration certificate that cycles through kinds of work. */
function CertificateCard() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 900);
    return () => clearInterval(id);
  }, []);
  const work = WORKS[Math.floor(tick / 5) % WORKS.length];
  const stage = tick % 5; // 0-1 created, 2-3 filed, 4 registered
  const registered = stage === 4;

  return (
    <div className="cr-card">
      <div className="cr-card__top">
        <span className="cr-card__type">{work.icon}{work.type}</span>
        <span className={`cr-card__pill ${registered ? "is-done" : ""}`}><i />{registered ? "REGISTERED" : stage >= 2 ? "FILED" : "CREATED"}</span>
      </div>
      <div className="cr-card__art" key={work.title}><Artwork kind={work.kind} /></div>
      <div className="cr-card__cert">
        <span className="cr-card__seal"><CopyrightIcon size={22} /></span>
        <div>
          <small>Certificate of registration</small>
          <strong key={work.title}>{work.title}</strong>
          <em>{registered ? `${work.code} 1-•••-•••` : `${work.code} pending`}</em>
        </div>
        {registered && <span className="cr-card__stamp"><Stamp size={14} /> Registered</span>}
      </div>
      <ol className="cr-card__steps">
        {["Created", "Filed", "Registered"].map((s, i) => {
          const on = (i === 0) || (i === 1 && stage >= 2) || (i === 2 && registered);
          return <li key={s} className={on ? "is-on" : ""}><span>{on ? <Check size={12} /> : i + 1}</span>{s}</li>;
        })}
      </ol>
      <p className="cr-card__note">Sample works for illustration only.</p>
    </div>
  );
}

export default function Copyright() {
  return (
    <div className="svc biz-page cr-page">
      <ServiceHero
        crumbs={[{ label: "Home", to: "/" }, { label: "Business", to: "/business" }, { label: "Copyright Protection" }]}
        title="Protect your creative work with a copyright registration"
        subtitle={<>Your writing, music, art, photos and code are yours the moment you create them. Registering makes them enforceable. We prepare and file your application with the U.S. Copyright Office. Plans from <strong>{PRICES.single}</strong> plus Office fees.</>}
        actions={<>
          <Button to={LINKS.start}>Register my work <ArrowRight size={18} /></Button>
          <a href="#cr-pricing" className="svc-ghost-btn">Compare plans</a>
        </>}
        visual={<CertificateCard />}
      />

      <Section title="Why register your copyright?">
        <Reveal className="svc-grid svc-grid-3 svc-mt">
          {whyUs.map((r, i) => <IconCard key={r.title} {...r} style={{ "--i": i }} />)}
        </Reveal>
      </Section>

      <Section id="cr-pricing" tone="gray" title="Choose your registration" subtitle={`All plans plus Copyright Office fees (from ${OFFICE_FEES.single}). Not sure which you need? Call us and we'll help.`}>
        <Reveal className="svc-packages">
          {packages.map((p) => <PackageCard key={p.name} {...p} fees="+ Office fees" />)}
        </Reveal>
      </Section>

      <Section title="How it works" subtitle="From finished work to registered copyright in three steps.">
        <StepPath steps={steps} />
        <div className="svc-center"><Button to={LINKS.start}>Register my work <ArrowRight size={18} /></Button></div>
      </Section>

      <Section tone="soft" title="What can you copyright?" subtitle="If you made it and it's original, it's probably protected. Tap a type to learn more.">
        <Reveal><Explorer items={workTypes} /></Reveal>
        <p className="cr-small">*A logo can be protected by copyright only if it has enough original artwork. Brand names and logos are usually better protected by a trademark.</p>
      </Section>

      <Section title="Automatic vs. registered copyright" subtitle="You get some rights for free. Registration is what lets you enforce them.">
        <Reveal><CompareTable columns={compareCols} rows={compareRows} highlight={2} /></Reveal>
      </Section>

      <Section tone="gray">
        <div className="svc-split">
          <Reveal>
            <h2 className="svc-h2">Timing matters more than you think</h2>
            <p>Registering early isn't just tidy paperwork. If someone copies your work before you register, you may lose the right to statutory damages and attorney's fees for that infringement.</p>
            <p>Register within three months of publishing, or before any infringement starts, to keep every option open.</p>
            <Button to={LINKS.start}>Register now <ArrowRight size={18} /></Button>
          </Reveal>
          <Reveal><StatStack stats={stats} /></Reveal>
        </div>
      </Section>

      <Section title="How long does copyright last?" subtitle="Much longer than most people expect.">
        <Reveal className="cr-duration">
          {durations.map((d, i) => (
            <div key={d.who} className="cr-duration__row" style={{ "--i": i, "--w": `${(d.years / 120) * 100}%` }}>
              <div className="cr-duration__label"><strong>{d.who}</strong><small>{d.text}</small></div>
              <div className="cr-duration__track">
                {d.extra && <span className="cr-duration__life">life</span>}
                <b><span>{d.extra ? `+${d.years} yrs` : `up to ${d.years}–120 yrs`}</span></b>
              </div>
            </div>
          ))}
        </Reveal>
      </Section>

      <Section tone="soft" title="Copyright, trademark or patent?" subtitle="Each one protects something different. Many businesses need more than one.">
        <Reveal><CompareTable columns={ipCols} rows={ipRows} highlight={1} /></Reveal>
        <div className="svc-center"><Button variant="outline" to={LINKS.trademark}>Protect your brand name instead <ArrowRight size={18} /></Button></div>
      </Section>

      <Section title="What copyright doesn't cover">
        <Reveal className="svc-grid svc-grid-4 svc-mt">
          {notCovered.map((t, i) => (
            <div key={t.title} className="cr-dont" style={{ "--i": i }}>
              <span className="cr-dont__x"><Ban size={14} /></span>
              <span className="cr-dont__icon">{t.icon}</span>
              <strong>{t.title}</strong>
              <small>{t.text}</small>
            </div>
          ))}
        </Reveal>
      </Section>

      <Section tone="gray" title="What you need to register" subtitle="Have these ready and the application takes minutes.">
        <Reveal><Checklist items={needsList} doneTitle="Ready to register" cta={{ label: "Register my work", to: LINKS.start }} /></Reveal>
        <div className="cr-tip">
          <FileText size={22} />
          <p><strong>Free tip:</strong> mark your work with © {new Date().getFullYear()} and your name. It's not required, but it tells people the work is protected.</p>
        </div>
      </Section>

      <FaqList faqs={faqs} />
      <CtaBand title="Ready to protect your creative work?" label="Register my work" to={LINKS.start} />
      <Testimonials items={testimonials} />
      <ContactCards helpTo={LINKS.attorney} helpTitle="Someone copied your work?" helpText="Get guidance on your options with an attorney by your side." />
      <ServiceFooter
        footnotes={[<>Registration is not guaranteed. The U.S. Copyright Office decides whether a work can be registered. Office fees are separate and non-refundable.</>]}
        disclaimer="Leader Business Developer is an independent business-services provider offering administrative and document-preparation support. We are not a law firm or a government agency and do not give legal advice. You can register directly with the U.S. Copyright Office. Fees, processing times and rules are set by the Office and may change."
      />
    </div>
  );
}

