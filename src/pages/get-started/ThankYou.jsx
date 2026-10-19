import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Check, FileText, Search, MessageSquare, Info, Home, UserRound, Phone, Mail } from "lucide-react";
import Seo from "../../components/common/Seo";
import { CONTACT } from "../../data/site";
import { THANK_YOU_PATH } from "./quoteData";
import "../auth/Auth.css";
import "./GetStarted.css";

const TEL = `tel:${CONTACT.phone.replace(/[^d+]/g, "")}`;

export default function ThankYou() {
  const headingRef = useRef(null);
  useEffect(() => { headingRef.current?.focus({ preventScroll: true }); }, []);
  return (
    <div className="svc au gs">
      <Seo title="Request Received | Get Started | Leader Business Developer" description="Your quote request has been received by Leader Business Developer." path={THANK_YOU_PATH} robots="noindex, nofollow" />
      <div className="gs__wrap">
        <div className="gs-ty">
          <span className="gs-ty__badge" aria-hidden="true"><span><Check size={34} strokeWidth={3} /></span></span>
          <p className="gs-ty__pill"><Check size={12} strokeWidth={3.5} aria-hidden="true" />Request successfully received</p>
          <h1 ref={headingRef} tabIndex={-1}>Thank You for Contacting <span>Leader Business Developer</span></h1>
          <p className="gs-ty__lead">Your request has been submitted successfully. Our team will review the information you provided and contact you regarding the appropriate next steps.</p>
          <ul className="gs-ty__steps">
            {[[FileText, "Request Received", "Your information has been submitted for review."], [Search, "Team Review", "We will review the service and project details."], [MessageSquare, "Follow-Up", "Our team will contact you if additional information is needed."]].map(([Icon, t, d]) => (
              <li key={t}><span><Icon size={18} aria-hidden="true" /></span><b>{t}</b><small>{d}</small></li>
            ))}
          </ul>
          <div className="gs-ty__note">
            <span><Info size={18} aria-hidden="true" /></span>
            <p><b>What should you do now?</b>You do not need to submit the same request again. Please keep an eye on your email, phone or WhatsApp based on the contact information you provided. If our team needs documents, payment or additional project information, we will provide the appropriate next step.</p>
          </div>
          <div className="gs-ty__actions">
            <Link to="/" className="au-btn"><Home size={16} aria-hidden="true" />Return to Home</Link>
            <Link to="/login" className="au-btn au-btn--ghost"><UserRound size={16} aria-hidden="true" />My Account</Link>
          </div>
          <div className="gs-ty__foot">
            <p>Need to contact our team about your submission?</p>
            <div><a href={TEL}><Phone size={14} aria-hidden="true" />{CONTACT.phone}</a><a href={`mailto:${CONTACT.email}`}><Mail size={14} aria-hidden="true" />{CONTACT.email}</a></div>
            <small>Submission of a request does not by itself create a government filing, account approval, payment-provider approval, legal engagement or guarantee of service completion. Leader Business Developer will review the submitted information and confirm applicable scope, requirements, pricing and next steps where necessary.</small>
          </div>
        </div>
      </div>
    </div>
  );
}
