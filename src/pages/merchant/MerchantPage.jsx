import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, X, Sparkles } from "lucide-react";
import Button from "../../components/common/Button";
import {
  Reveal, ServiceHero, Section, IconCard, StepPath, CompareTable, Checklist, FaqList,
  ContactCards, CtaBand, ServiceFooter,
} from "../../components/service";
import { MERCHANT_SERVICES, MERCHANT_LINKS } from "./services";
import "./Merchant.css";

const DISCLAIMER =
  "Leader Business Developer is an independent business-services provider. We are not a bank, payment processor, payment facilitator, independent sales organization or money transmitter, and we never handle or settle your funds. Merchant accounts and payment services are provided by the banks and processors you choose, which set their own pricing, reserves and requirements and make every approval decision. We don't guarantee approval, rates, fees, funding times or features, and we don't currently claim any formal partnership with the providers named on this page. Card-brand and platform names are trademarks of their owners. Nothing on this page is legal, tax or financial advice.";

/* Card with a mouse-follow spotlight and gentle 3D tilt. */
export function TiltCard({ as: Tag = "div", className = "", children, style, ...rest }) {
  const ref = useRef(null);
  const move = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    el.style.setProperty("--rx", `${(0.5 - y) * 6}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * 8}deg`);
  };
  const leave = () => {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  };
  return (
    <Tag ref={ref} className={`mc-tilt ${className}`.trim()} onMouseMove={move} onMouseLeave={leave} style={style} {...rest}>
      {children}
    </Tag>
  );
}

/* Links to the other merchant pages (everything except the current one). */
function ServiceLinks({ current }) {
  return (
    <Reveal className="mc-links mc-links--2">
      {MERCHANT_SERVICES.filter((s) => s.path !== current).map((s, i) => (
        <TiltCard as={Link} key={s.path} to={s.path} className="mc-link" style={{ "--i": i }}>
          <span className="mc-link__icon"><s.icon size={22} /></span>
          <strong>{s.title}</strong>
          <small>{s.short}</small>
          <em>Learn more <ArrowRight size={14} /></em>
        </TiltCard>
      ))}
    </Reveal>
  );
}

/* Honest "how we help / what we don't do" panel shown on every merchant page. */
export function RoleSplit({ helps, dont: dontItems, note = "Providers make every account decision. We help you prepare, compare and set up." }) {
  const dont = dontItems || [
    "Process, hold or settle your payments",
    "Decide whether a provider approves you",
    "Set or promise rates, reserves or funding times",
    "Give legal, tax or financial advice",
  ];
  return (
    <Reveal className="mc-role">
      <div className="mc-role__col is-yes">
        <h3>How we help</h3>
        <ul>{helps.map((h, i) => <li key={h} style={{ "--i": i }}><span><Check size={14} /></span>{h}</li>)}</ul>
      </div>
      <div className="mc-role__col is-no">
        <h3>What we don't do</h3>
        <ul>{dont.map((h, i) => <li key={h} style={{ "--i": i }}><span><X size={14} /></span>{h}</li>)}</ul>
        <p>{note}</p>
      </div>
    </Reveal>
  );
}

/* Option / plan cards without invented prices.
   items: [{ name, badge?, best, text, points[], featured? }] */
export function OptionCards({ items, ctaLabel = "Discuss this option", ctaTo = MERCHANT_LINKS.help }) {
  return (
    <Reveal className="mc-options" style={{ "--cols": Math.min(items.length, 4) }}>
      {items.map((o, i) => (
        <TiltCard as="article" key={o.name} className={`mc-option ${o.featured ? "is-featured" : ""}`} style={{ "--i": i }}>
          {o.badge && <span className="mc-option__badge"><Sparkles size={12} /> {o.badge}</span>}
          {o.icon && <span className="mc-option__icon">{o.icon}</span>}
          <h3>{o.name}</h3>
          {o.best && <p className="mc-option__best"><b>Best for:</b> {o.best}</p>}
          <p className="mc-option__text">{o.text}</p>
          <ul>{o.points.map((p) => <li key={p}><Check size={15} />{p}</li>)}</ul>
          <Link to={o.to || ctaTo} className="mc-option__cta">{o.cta || ctaLabel} <ArrowRight size={15} /></Link>
        </TiltCard>
      ))}
    </Reveal>
  );
}

/* Template shared by every Merchant Solutions page.
   Unique per-page sections go in `children` (rendered after the service cards). */
export default function MerchantPage({
  path, title, subtitle, primary, secondary, visual, highlights = [],
  services, options, benefits, helps, steps, compare, checklist, faqs, cta, footnotes = [], children,
}) {
  const crumbs = [{ label: "Home", to: "/" }, { label: "Merchant Solutions" }, { label: title.short || title.text }];

  return (
    <div className="svc mc-page">
      <ServiceHero
        crumbs={crumbs}
        title={title.text}
        subtitle={subtitle}
        showTrust={false}
        actions={<>
          <Button to={primary.to}>{primary.label} <ArrowRight size={18} /></Button>
          {secondary && <a href={secondary.href} className="svc-ghost-btn">{secondary.label}</a>}
        </>}
        visual={visual}
      />
      {highlights.length > 0 && (
        <div className="mc-strip">
          <div className="container mc-strip__row">
            {highlights.map((h, i) => <span key={h.text} style={{ "--i": i }}>{h.icon}{h.text}</span>)}
          </div>
        </div>
      )}

      <Section id="mc-services" title={services.title} subtitle={services.subtitle}>
        <Reveal className={`svc-grid svc-grid-${services.cols || 3} svc-mt mc-cards`}>
          {services.items.map((c, i) => (
            <TiltCard key={c.title} className="mc-card" style={{ "--i": i }}>
              <div className="svc-card__icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </TiltCard>
          ))}
        </Reveal>
      </Section>

      {children}

      {options && (
        <Section id="mc-options" tone="gray" title={options.title} subtitle={options.subtitle}>
          <OptionCards items={options.items} ctaLabel={options.ctaLabel} ctaTo={options.ctaTo} />
          {options.note && <p className="mc-small">{options.note}</p>}
        </Section>
      )}

      <Section tone="soft" title={benefits.title} subtitle={benefits.subtitle}>
        <Reveal className="svc-grid svc-grid-3">
          {benefits.items.map((b, i) => <IconCard key={b.title} variant="tile" {...b} style={{ "--i": i }} />)}
        </Reveal>
      </Section>

      <Section title="Clear about our role" subtitle="We're your guide through merchant services, not your processor.">
        <RoleSplit helps={helps} />
      </Section>

      <Section id="mc-process" tone="gray" title={steps.title || "How it works"} subtitle={steps.subtitle}>
        <StepPath steps={steps.items} />
        <div className="svc-center"><Button to={primary.to}>{primary.label} <ArrowRight size={18} /></Button></div>
      </Section>

      {compare && (
        <Section id="mc-compare" title={compare.title} subtitle={compare.subtitle}>
          <Reveal><CompareTable columns={compare.columns} rows={compare.rows} highlight={compare.highlight} /></Reveal>
          {compare.note && <p className="mc-small">{compare.note}</p>}
        </Section>
      )}

      {checklist && (
        <Section tone={compare ? "gray" : "white"} title={checklist.title} subtitle={checklist.subtitle}>
          <Reveal><Checklist items={checklist.items} title={checklist.side || "What you'll need"} doneTitle="You're ready" cta={{ label: primary.label, to: primary.to }} /></Reveal>
          {checklist.note && <p className="mc-small">{checklist.note}</p>}
        </Section>
      )}

      <Section tone="soft" title="Related merchant services" subtitle="Many businesses combine more than one. Here's where to go next.">
        <ServiceLinks current={path} />
      </Section>

      <FaqList faqs={faqs} />
      <CtaBand title={cta.title} label={cta.label || primary.label} to={cta.to || primary.to} />
      <ContactCards
        helpTitle="Talk to a merchant specialist"
        helpText="Not sure which setup fits? We'll walk through how you sell and what to look for."
        helpLabel="Contact us"
        helpTo={MERCHANT_LINKS.help}
      />
      <ServiceFooter footnotes={footnotes} disclaimer={DISCLAIMER} />
    </div>
  );
}
