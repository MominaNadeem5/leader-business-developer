import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Button from "../../components/common/Button";
import {
  Reveal, ServiceHero, Section, IconCard, StepPath, CompareTable, Checklist, FaqList,
  ContactCards, CtaBand, ServiceFooter,
} from "../../components/service";
import { TiltCard, RoleSplit, OptionCards } from "../merchant/MerchantPage";
import { INTEGRATION_SERVICES, INTEGRATION_LINKS } from "./services";
import "../merchant/Merchant.css";
import "./PaymentIntegration.css";

const DISCLAIMER =
  "Leader Business Developer is an independent business-services provider. We are not a bank, payment processor, payment gateway or money transmitter, and we never handle, hold or settle your funds. Payment services are provided by the companies you choose, which set their own pricing and requirements and make every account decision. We don't guarantee approval, rates, fees, payout times or features, and we don't claim any formal partnership with the providers or platforms named on this page. Stripe, Square, PayPal, Shopify, WooCommerce and card-brand names are trademarks of their owners. Code and screens shown are illustrative samples. Nothing on this page is legal, tax or financial advice.";

const DONT = [
  "Process, hold or settle your payments",
  "Decide whether a provider approves your account",
  "Set or promise rates, fees or payout times",
  "Store your customers' full card numbers",
];

/* Links to the other integration pages (everything except the current one). */
function ServiceLinks({ current }) {
  return (
    <Reveal className="mc-links">
      {INTEGRATION_SERVICES.filter((s) => s.path !== current).map((s, i) => (
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

/* Template shared by every Payment Integration page.
   Unique per-page sections go in `children` (rendered after the service cards). */
export default function IntegrationPage({
  path, title, subtitle, primary, secondary, visual, highlights = [],
  services, options, benefits, helps, steps, compare, checklist, faqs, cta, footnotes = [], children,
}) {
  const isHub = path === "/payment-integration";
  const crumbs = isHub
    ? [{ label: "Home", to: "/" }, { label: "Payment Integration" }]
    : [{ label: "Home", to: "/" }, { label: "Payment Integration", to: "/payment-integration" }, { label: title.short || title.text }];

  return (
    <div className="svc mc-page pi-page">
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

      <Section id="pi-services" title={services.title} subtitle={services.subtitle}>
        <Reveal className={`svc-grid svc-grid-${services.cols || 3} svc-mt mc-cards`}>
          {services.items.map((c, i) => (
            c.to ? (
              <TiltCard as={Link} key={c.title} to={c.to} className="mc-card pi-card-link" style={{ "--i": i }}>
                <div className="svc-card__icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <em>Explore <ArrowRight size={14} /></em>
              </TiltCard>
            ) : (
              <TiltCard key={c.title} className="mc-card" style={{ "--i": i }}>
                <div className="svc-card__icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </TiltCard>
            )
          ))}
        </Reveal>
      </Section>

      {children}

      {options && (
        <Section id="pi-options" tone="gray" title={options.title} subtitle={options.subtitle}>
          <OptionCards items={options.items} ctaLabel={options.ctaLabel} ctaTo={options.ctaTo || INTEGRATION_LINKS.help} />
          {options.note && <p className="mc-small">{options.note}</p>}
        </Section>
      )}

      <Section tone="soft" title={benefits.title} subtitle={benefits.subtitle}>
        <Reveal className="svc-grid svc-grid-3">
          {benefits.items.map((b, i) => <IconCard key={b.title} variant="tile" {...b} style={{ "--i": i }} />)}
        </Reveal>
      </Section>

      <Section title="Clear about our role" subtitle="We plan, build and connect your payment setup. Your provider moves the money.">
        <RoleSplit helps={helps} dont={DONT} note="Your provider approves your account and processes every payment. We help you choose, configure and connect." />
      </Section>

      <Section id="pi-process" tone="gray" title={steps.title || "How it works"} subtitle={steps.subtitle}>
        <StepPath steps={steps.items} />
        <div className="svc-center"><Button to={primary.to}>{primary.label} <ArrowRight size={18} /></Button></div>
      </Section>

      {compare && (
        <Section id="pi-compare" title={compare.title} subtitle={compare.subtitle}>
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

      {!isHub && (
        <Section tone="soft" title="Related integration services" subtitle="Most projects combine more than one. Here's where to go next.">
          <ServiceLinks current={path} />
        </Section>
      )}

      <FaqList faqs={faqs} />
      <CtaBand title={cta.title} label={cta.label || primary.label} to={cta.to || primary.to} />
      <ContactCards
        helpTitle="Talk to an integration specialist"
        helpText="Not sure what you need? Tell us how you sell and what tools you use, and we'll map out the setup."
        helpLabel="Contact us"
        helpTo={INTEGRATION_LINKS.help}
      />
      <ServiceFooter footnotes={footnotes} disclaimer={DISCLAIMER} />
    </div>
  );
}
