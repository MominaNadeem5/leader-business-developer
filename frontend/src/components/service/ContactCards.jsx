import { Link } from "react-router-dom";
import { MessageSquare, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import Section from "./Section";
import { CONTACT } from "../../data/site";

/* "Questions?" block: help link card + phone/email card. */
export default function ContactCards({
  helpTitle = "Ask an attorney",
  helpText = "Get the right guidance with an attorney by your side.",
  helpLabel = "Get legal help",
  helpTo = "/contact",
  phoneLabel = "Call an agent at",
}) {
  return (
    <Section tone="gray" title="Questions?">
      <Reveal className="svc-grid svc-grid-2 svc-ask">
        <div className="svc-ask__card">
          <MessageSquare size={30} />
          <h3>{helpTitle}</h3>
          <p>{helpText}</p>
          <Link to={helpTo} className="svc-gold-btn">{helpLabel} <ArrowRight size={16} /></Link>
        </div>
        <div className="svc-ask__card">
          <Phone size={30} />
          <h3>{phoneLabel} <a href={`tel:${CONTACT.phone}`}>{CONTACT.phone}</a></h3>
          <p className="svc-hours"><Clock size={14} /> {CONTACT.hours[0]}<br />{CONTACT.hours[1]}</p>
          <a href={`mailto:${CONTACT.email}`} className="svc-link"><Mail size={16} /> {CONTACT.email}</a>
        </div>
      </Reveal>
    </Section>
  );
}
