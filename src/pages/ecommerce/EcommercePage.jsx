import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import Button from "../../components/common/Button";
import Seo from "../../components/common/Seo";
import {
  Reveal, ServiceHero, Section, IconCard, StepPath, Checklist, FaqList, ContactCards, CtaBand, ServiceFooter,
} from "../../components/service";
import { TiltCard } from "../merchant/MerchantPage";
import { MethodGrid } from "../merchant/MerchantWidgets";
import { ECOMMERCE_SECTION } from "./services";
import "../merchant/Merchant.css";
import "./Ecommerce.css";

/* Links to the other pages in the section (everything except the current one). */
function ServiceLinks({ current, services }) {
  return (
    <Reveal className="mc-links">
      {services.filter((s) => s.path !== current).map((s, i) => (
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

/* Template shared by every Ecommerce Solution page, and by other sections
   (e.g. Website Setup) that pass their own `section` config from their services.js.
   Unique per-page sections go in `children` (rendered after the service cards). */
export default function EcommercePage({
  path, title, subtitle, primary, secondary, visual, highlights = [], overview,
  services, steps, benefits, tools, checklist, faqs, cta, section = ECOMMERCE_SECTION, children,
}) {
  const isHub = path === section.hubPath;
  const crumbs = isHub
    ? [{ label: "Home", to: "/" }, { label: section.hubLabel }]
    : [{ label: "Home", to: "/" }, { label: section.hubLabel, to: section.hubPath }, { label: title.short || title.text }];

  return (
    <div className="svc mc-page ec-page">
      <Seo {...section.seo[path]} path={path} faqs={faqs} />
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

      <Section id="ec-overview">
        <Reveal className="ec-overview">
          <div className="ec-overview__text">
            <span className="ec-eyebrow">Overview</span>
            <h2>{overview.title}</h2>
            {overview.body.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <TiltCard as="aside" className="ec-glance">
            <h3>{overview.glance.title}</h3>
            <ul>{overview.glance.items.map((g, i) => <li key={g} style={{ "--i": i }}><span><Check size={13} /></span>{g}</li>)}</ul>
            <Link to={primary.to} className="mc-option__cta">{primary.label} <ArrowRight size={15} /></Link>
          </TiltCard>
        </Reveal>
      </Section>

      <Section id="ec-services" tone="gray" title={services.title} subtitle={services.subtitle}>
        <Reveal className={`svc-grid svc-grid-${services.cols || 3} svc-mt mc-cards`}>
          {services.items.map((c, i) => (
            c.to ? (
              <TiltCard as={Link} key={c.title} to={c.to} className="mc-card ec-card ec-card-link" style={{ "--i": i }}>
                <div className="svc-card__icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <em>Explore <ArrowRight size={14} /></em>
              </TiltCard>
            ) : (
              <TiltCard key={c.title} className="mc-card ec-card" style={{ "--i": i }}>
                <div className="svc-card__icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </TiltCard>
            )
          ))}
        </Reveal>
      </Section>

      {children}

      <Section id="ec-process" tone="gray" title={steps.title || "Our process"} subtitle={steps.subtitle}>
        <StepPath steps={steps.items} />
        <div className="svc-center"><Button to={primary.to}>{primary.label} <ArrowRight size={18} /></Button></div>
      </Section>

      <Section tone="soft" title={benefits.title} subtitle={benefits.subtitle}>
        <Reveal className="svc-grid svc-grid-3">
          {benefits.items.map((b, i) => <IconCard key={b.title} variant="tile" {...b} style={{ "--i": i }} />)}
        </Reveal>
      </Section>

      <Section id="ec-tools" title={tools.title} subtitle={tools.subtitle}>
        <MethodGrid items={tools.items} />
        {tools.note && <p className="mc-small">{tools.note}</p>}
      </Section>

      {checklist && (
        <Section tone="gray" title={checklist.title} subtitle={checklist.subtitle}>
          <Reveal><Checklist items={checklist.items} title={checklist.side || "What you'll need"} doneTitle="You're ready" cta={{ label: primary.label, to: primary.to }} /></Reveal>
          {checklist.note && <p className="mc-small">{checklist.note}</p>}
        </Section>
      )}

      {!isHub && (
        <Section tone="soft" title={section.relatedTitle} subtitle="Most businesses combine several of these. Explore what fits next.">
          <ServiceLinks current={path} services={section.services} />
          <div className="svc-center"><Link to={section.hubPath} className="svc-link">{section.viewAllLabel} <ArrowRight size={16} /></Link></div>
        </Section>
      )}

      <FaqList faqs={faqs} />
      <CtaBand title={cta.title} label={cta.label || primary.label} to={cta.to || primary.to} />
      <ContactCards
        helpTitle={section.helpTitle}
        helpText={section.helpText}
        helpLabel="Contact us"
        helpTo={section.helpTo}
      />
      <ServiceFooter disclaimer={section.disclaimer} />
    </div>
  );
}
