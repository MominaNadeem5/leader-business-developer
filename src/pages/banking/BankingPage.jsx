import { Link } from "react-router-dom";
import { ArrowRight, Check, X } from "lucide-react";
import Button from "../../components/common/Button";
import {
  Reveal, ServiceHero, Section, IconCard, StepPath, CompareTable, Checklist, FaqList,
  ContactCards, CtaBand, ServiceFooter,
} from "../../components/service";
import { BANKING_SERVICES, BANKING_LINKS } from "./services";
import "./Banking.css";

const DISCLAIMER =
  "Leader Business Developer is an independent business-services provider. We are not a bank, credit union, payment processor or money transmitter, and we don't hold deposits or move money. Accounts and payment services are provided by the financial institutions you choose, which set their own requirements and make every approval decision. We don't guarantee approval, account terms, fees or features. Deposit insurance, where it applies, comes from the FDIC or NCUA for eligible deposits at insured institutions, up to legal limits. Nothing on this page is legal, tax or financial advice.";

/* Grid of links to other banking pages. paths: which pages to show (defaults to all except current). */
export function ServiceLinks({ current, paths, limit }) {
  let list = paths ? paths.map((p) => BANKING_SERVICES.find((s) => s.path === p)).filter(Boolean) : BANKING_SERVICES.filter((s) => s.path !== current && s.path !== "/banking");
  if (limit) list = list.slice(0, limit);
  return (
    <Reveal className="bk-links">
      {list.map((s, i) => (
        <Link key={s.path} to={s.path} className="bk-link" style={{ "--i": i }}>
          <span className="bk-link__icon"><s.icon size={22} /></span>
          <strong>{s.title}</strong>
          <small>{s.short}</small>
          <em>Learn more <ArrowRight size={14} /></em>
        </Link>
      ))}
    </Reveal>
  );
}

/* Honest "what we do / what we don't" panel shown on every banking page. */
function TrustSplit({ helps }) {
  const dont = [
    "Hold your money or open accounts in our name",
    "Decide whether a bank approves you",
    "Promise specific fees, rates or features",
    "Give legal, tax or investment advice",
  ];
  return (
    <Reveal className="bk-trust">
      <div className="bk-trust__col is-yes">
        <h3>How we help</h3>
        <ul>{helps.map((h, i) => <li key={h} style={{ "--i": i }}><span><Check size={14} /></span>{h}</li>)}</ul>
      </div>
      <div className="bk-trust__col is-no">
        <h3>What we don't do</h3>
        <ul>{dont.map((h, i) => <li key={h} style={{ "--i": i }}><span><X size={14} /></span>{h}</li>)}</ul>
        <p>Banks make every account decision. We make sure you're ready for it.</p>
      </div>
    </Reveal>
  );
}

/* Template shared by every Banking Solutions page.
   Unique per-page sections go in `children` (rendered after the service cards). */
export default function BankingPage({
  path, title, subtitle, primary, secondary, visual,
  services, benefits, helps, steps, compare, checklist, faqs, cta, related, footnotes = [], children,
}) {
  const isHub = path === "/banking";
  const crumbs = isHub
    ? [{ label: "Home", to: "/" }, { label: "Business Banking" }]
    : [{ label: "Home", to: "/" }, { label: "Business Banking", to: "/banking" }, { label: title.short || title.text }];

  return (
    <div className="svc bk-page">
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

      <Section id="bk-services" title={services.title} subtitle={services.subtitle}>
        <Reveal className={`svc-grid svc-grid-${services.cols || 3} svc-mt bk-cards`}>
          {services.items.map((c, i) => <IconCard key={c.title} {...c} style={{ "--i": i }} />)}
        </Reveal>
      </Section>

      {children}

      <Section tone="soft" title={benefits.title} subtitle={benefits.subtitle}>
        <Reveal className="svc-grid svc-grid-3">
          {benefits.items.map((b, i) => <IconCard key={b.title} variant="tile" {...b} style={{ "--i": i }} />)}
        </Reveal>
      </Section>

      <Section title="Clear about our role" subtitle="We're your guide through the process, not your bank.">
        <TrustSplit helps={helps} />
      </Section>

      <Section tone="gray" title={steps.title || "How it works"} subtitle={steps.subtitle}>
        <StepPath steps={steps.items} />
        <div className="svc-center"><Button to={primary.to}>{primary.label} <ArrowRight size={18} /></Button></div>
      </Section>

      {compare && (
        <Section title={compare.title} subtitle={compare.subtitle}>
          <Reveal><CompareTable columns={compare.columns} rows={compare.rows} highlight={compare.highlight} /></Reveal>
          {compare.note && <p className="bk-small">{compare.note}</p>}
        </Section>
      )}

      {checklist && (
        <Section id="bk-checklist" tone={compare ? "gray" : "white"} title={checklist.title} subtitle={checklist.subtitle}>
          <Reveal><Checklist items={checklist.items} title={checklist.side || "What you'll need"} doneTitle="You're ready" cta={{ label: primary.label, to: primary.to }} /></Reveal>
          {checklist.note && <p className="bk-small">{checklist.note}</p>}
        </Section>
      )}

      <Section tone="soft" title={isHub ? "Explore every banking service" : "Related banking services"} subtitle={isHub ? undefined : "Most businesses use more than one. Here's where to go next."}>
        <ServiceLinks current={path} paths={related} limit={isHub ? undefined : 3} />
      </Section>

      <FaqList faqs={faqs} />
      <CtaBand title={cta.title} label={cta.label || primary.label} to={cta.to || primary.to} />
      <ContactCards
        helpTitle="Talk to a banking specialist"
        helpText="Not sure where to start? We'll walk through your situation and options."
        helpLabel="Book a consultation"
        helpTo={BANKING_LINKS.consult}
      />
      <ServiceFooter footnotes={footnotes} disclaimer={DISCLAIMER} />
    </div>
  );
}
