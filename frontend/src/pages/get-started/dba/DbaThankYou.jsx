import { useEffect, useRef } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { Check, FileText, Search, ClipboardCheck, Landmark, Info, Home, UserRound, Phone, Mail, AlertTriangle, Newspaper } from "lucide-react";
import Seo from "../../../components/common/Seo";
import { CONTACT } from "../../../data/site";
import { DBA_PATH, DBA_THANK_YOU_PATH } from "./dbaData";
import "../../auth/Auth.css";
import "../GetStarted.css";
import "./DbaForm.css";

const TEL = `tel:${CONTACT.phone.replace(/[^\d+]/g, "")}`;

export default function DbaThankYou() {
  const { state: sub } = useLocation();
  const headingRef = useRef(null);
  useEffect(() => { headingRef.current?.focus({ preventScroll: true }); }, [sub]);

  // Opened directly (not from a submission): there's nothing to confirm, so send them to the application.
  if (!sub?.reference) return <Navigate to={DBA_PATH} replace />;

  const where = sub.level === "county" ? "the county office" : sub.level === "state" ? "the state filing office" : "the right state or county office";
  const steps = [
    [FileText, "Application received", sub.demo ? "Not sent: no server is connected yet." : "Your details are with our team."],
    [Search, "We review it", `We check the name and your ${sub.state} requirements.`],
    [ClipboardCheck, "We confirm fees", "You'll see the filing fees and approve before we file."],
    [Landmark, "Filing", `After your approval, we file with ${where}.`],
  ];

  return (
    <div className="svc au gs dba">
      <Seo title="DBA Application Received | Leader Business Developer" description="Your DBA application has been received by Leader Business Developer." path={DBA_THANK_YOU_PATH} robots="noindex, nofollow" />
      <div className="gs__wrap">
        <div className="gs-ty dba-ty">
          <span className="gs-ty__badge" aria-hidden="true"><span><Check size={34} strokeWidth={3} /></span></span>
          <p className="gs-ty__pill"><Check size={12} strokeWidth={3.5} aria-hidden="true" />{sub.demo ? "Preview submission" : "Application received"}</p>
          <h1 ref={headingRef} tabIndex={-1}>{sub.demo ? "Your DBA application is ready" : "Thank you. We've got your DBA application"}<span>“{sub.dbaName}”</span></h1>
          <p className="gs-ty__lead">
            {sub.demo
              ? "This site isn't connected to an application server yet, so nothing was sent to our team."
              : `Our team will review your application and contact you at ${sub.email} about next steps.`}
          </p>

          {sub.demo && (
            <div className="dba-ty__demo" role="alert">
              <AlertTriangle size={18} aria-hidden="true" />
              <p><b>Not submitted.</b> You're seeing this because the site has no backend configured (<code>VITE_API_URL</code>). Your answers were not stored or sent anywhere. To request your DBA, please contact us directly below.</p>
            </div>
          )}

          <dl className="dba-ty__facts">
            <div><dt>Reference</dt><dd>{sub.reference}</dd></div>
            <div><dt>DBA name</dt><dd>{sub.dbaName}</dd></div>
            <div><dt>State</dt><dd>{sub.state}</dd></div>
            <div><dt>Business type</dt><dd>{sub.entity}</dd></div>
          </dl>

          <h2 className="dba-ty__h">What happens next</h2>
          <ol className="dba-ty__steps">
            {steps.map(([Icon, t, d], i) => (
              <li key={t}><span><Icon size={18} aria-hidden="true" /></span><div><b>{i + 1}. {t}</b><small>{d}</small></div></li>
            ))}
          </ol>

          {sub.publication && (
            <div className="gs-ty__note">
              <span><Newspaper size={18} aria-hidden="true" /></span>
              <p><b>Newspaper notice required in {sub.state}</b>After the DBA is filed, {sub.state} requires a notice to be published in a local newspaper. We'll explain how and what it costs when we confirm your fees.</p>
            </div>
          )}
          <div className="gs-ty__note">
            <span><Info size={18} aria-hidden="true" /></span>
            <p><b>Your DBA is not filed yet</b>This application is a request to our team. Nothing has been filed with the state or county, and the name isn't registered until the government office accepts it. You don't need to submit this application again.</p>
          </div>

          <div className="gs-ty__actions">
            <Link to="/" className="au-btn"><Home size={16} aria-hidden="true" />Return to Home</Link>
            <Link to="/login" className="au-btn au-btn--ghost"><UserRound size={16} aria-hidden="true" />My Account</Link>
          </div>
          <div className="gs-ty__foot">
            <p>Questions about your application? Mention reference <b>{sub.reference}</b>.</p>
            <div><a href={TEL}><Phone size={14} aria-hidden="true" />{CONTACT.phone}</a><a href={`mailto:${CONTACT.email}`}><Mail size={14} aria-hidden="true" />{CONTACT.email}</a></div>
            <small>Submitting this application does not by itself create a government filing, legal engagement or guarantee that a state will accept your name. Leader Business Developer will review your information and confirm the scope, requirements, fees and next steps. We are not a law firm and do not give legal advice.</small>
          </div>
        </div>
      </div>
    </div>
  );
}
