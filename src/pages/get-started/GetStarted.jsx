import { startTransition, useEffect, useRef, useState } from "react";
import { Link, Navigate, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, Building2, MapPin, LayoutGrid, FileText, Wallet, UserRound, ClipboardCheck, Mail, Phone, Globe,
  Briefcase, Tag, Check, Pencil, ShieldAlert, Clock, MessageSquare, Sparkles, ChevronDown, AlertCircle, Info, Loader2,
  Search, CalendarCheck, Rocket, LogIn,
} from "lucide-react";
import Seo from "../../components/common/Seo";
import { Field, Checkbox, Alert } from "../auth/AuthBits";
import { CONTACT } from "../../data/site";
import { StepScene, SuccessScene } from "./StepVisuals";
import {
  STEPS, TOTAL, STAGES, ENTITIES, INDUSTRIES, COUNTRIES, US_STATES, PK_REGIONS, SERVICES, TIMELINES, BUDGETS, CONTACT_METHODS,
  EMPTY, VALIDATORS, REQ_MAX, stepPath, DONE_PATH, firstIncomplete, loadDraft, saveDraft, clearDraft, prefillFromParams,
  serviceName, budgetName, makeRef,
} from "./quoteData";
import { submitQuote } from "./quoteApi";
import "../auth/Auth.css";
import "./GetStarted.css";

const STEP_ICONS = [Building2, MapPin, LayoutGrid, FileText, Wallet, UserRound, ClipboardCheck];
const CAPTIONS = [
  "Every great business starts with the basics.",
  "Requirements and fees depend on where you operate.",
  "Pick everything you need. We'll bundle it into one plan.",
  "A clear brief means a faster, more accurate scope.",
  "Your budget shapes the scope, not the final invoice.",
  "A real person from our team will reach out.",
  "One last look before it goes to our team.",
];
const TEL = `tel:${CONTACT.phone.replace(/[^\d+]/g, "")}`;

/* ===== /get-started : apply ?service= / ?entity= / ?state= from the button that was clicked, then open step 1 ===== */
export function GetStartedEntry() {
  const [params] = useSearchParams();
  const [prefill] = useState(() => {
    const next = prefillFromParams(params, loadDraft());
    saveDraft(next);
    return next;
  });
  return <Navigate to={stepPath(1)} replace state={{ prefill }} />;
}

/* ===== small form pieces (same look as the auth pages' fields) ===== */
const Opt = () => <span className="gs-opt-tag">Optional</span>;
const Req = () => <span className="gs-req" aria-hidden="true">*</span>;

function Msg({ id, error, hint }) {
  if (error) return <p className="au-msg au-msg--err" id={id}><AlertCircle size={14} aria-hidden="true" />{error}</p>;
  if (hint) return <p className="au-msg" id={id}>{hint}</p>;
  return null;
}

function Select({ id, label, icon, placeholder, options, error, hint, value, ...rest }) {
  const msgId = error || hint ? `${id}-msg` : undefined;
  return (
    <div className={`au-field${error ? " is-err" : ""}`}>
      <div className="au-field__top"><label htmlFor={id}>{label}</label></div>
      <div className="au-input gs-select">
        <span className="au-input__icon" aria-hidden="true">{icon}</span>
        <select id={id} value={value} className={value ? "" : "is-empty"} aria-invalid={error ? true : undefined} aria-describedby={msgId} {...rest}>
          <option value="" disabled>{placeholder}</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={18} className="gs-select__chev" aria-hidden="true" />
      </div>
      <Msg id={msgId} error={error} hint={hint} />
    </div>
  );
}

/* Card-style radio or checkbox group with a real fieldset/legend and native inputs (keyboard works as usual). */
function Choices({ type = "radio", name, legend, options, isOn, onToggle, error, cols = 2, aside }) {
  const errId = `gs-${name}-msg`;
  return (
    <fieldset className={`gs-choice gs-choice--${cols}${error ? " is-err" : ""}`} aria-describedby={error ? errId : undefined}>
      <legend>
        <span>{legend}<Req /></span>
        {aside}
      </legend>
      <div className="gs-choice__grid">
        {options.map(([val, title, desc], i) => {
          const on = isOn(val);
          return (
            <label key={val} className={`gs-opt gs-opt--${type}${on ? " is-on" : ""}`} style={{ "--i": i }}>
              <input type={type} name={name} value={val} checked={on} onChange={() => onToggle(val)} aria-invalid={error ? true : undefined} />
              <span className="gs-opt__mark" aria-hidden="true"><Check size={12} strokeWidth={3.5} /></span>
              <span className="gs-opt__text"><b>{title}</b>{desc && <small>{desc}</small>}</span>
            </label>
          );
        })}
      </div>
      <Msg id={errId} error={error} />
    </fieldset>
  );
}

/* ===== progress: "Step n of 7" + bar + clickable step list ===== */
function Progress({ n, reach }) {
  return (
    <nav className="gs-progress" aria-label="Quote request progress">
      <div className="gs-progress__top">
        <p><b>Step {n} of {TOTAL}</b> · {STEPS[n - 1].label}</p>
        <span>{Math.round(((n - 1) / TOTAL) * 100)}% complete</span>
      </div>
      <div className="gs-progress__bar" aria-hidden="true"><span style={{ transform: `scaleX(${(n - 1) / TOTAL})` }} /></div>
      <ol className="gs-steps">
        {STEPS.map((s, i) => {
          const k = i + 1;
          const state = k < n ? "done" : k === n ? "current" : "todo";
          const inner = (
            <>
              <span className="gs-steps__dot">{state === "done" ? <Check size={14} strokeWidth={3} aria-hidden="true" /> : k}</span>
              <span className="gs-steps__label">{s.label}</span>
              {state === "done" && <span className="sr-only"> (completed)</span>}
            </>
          );
          return (
            <li key={s.key} className={`is-${state}`}>
              {k !== n && k <= reach ? (
                <Link to={stepPath(k)} state={{ dir: k < n ? "back" : "fwd" }}>{inner}</Link>
              ) : (
                <span aria-current={state === "current" ? "step" : undefined}>{inner}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ===== sidebar: animated scene, live summary, help ===== */
function Sidebar({ n, data }) {
  const stage = STAGES.find(([k]) => k === data.stage)?.[1];
  const rows = [
    [Building2, data.businessName || stage, 1],
    [MapPin, [data.region, data.country].filter(Boolean).join(", "), 2],
    [LayoutGrid, data.services.length ? `${data.services.length} service${data.services.length > 1 ? "s" : ""}: ${data.services.map(serviceName).join(", ")}` : "", 3],
    [Clock, data.timeline, 4],
    [Wallet, budgetName(data.budget), 5],
    [UserRound, [data.firstName, data.lastName].filter(Boolean).join(" ") || data.email, 6],
  ].filter(([, text]) => text);

  return (
    <aside className="gs-side" aria-label="Your request">
      <div className="gs-viz">
        <StepScene step={n} />
        <p><b>{STEPS[n - 1].label}.</b> {CAPTIONS[n - 1]}</p>
      </div>
      <div className="gs-panel gs-sum">
        <h3>Your request</h3>
        {rows.length ? (
          <ul>
            {rows.map(([Icon, text, step]) => (
              <li key={step}><Icon size={16} aria-hidden="true" /><span>{text}</span></li>
            ))}
          </ul>
        ) : (
          <p className="gs-muted">Your answers will appear here as you go.</p>
        )}
      </div>
      <div className="gs-panel gs-help">
        <h3>Need a hand?</h3>
        <a href={TEL}><Phone size={16} aria-hidden="true" />{CONTACT.phone}</a>
        <a href={`mailto:${CONTACT.email}`}><Mail size={16} aria-hidden="true" />{CONTACT.email}</a>
        <p className="gs-muted">
          Already a client? <Link to="/login" state={{ from: stepPath(n) }} className="au-link">Sign in</Link> · New here? <Link to="/register" className="au-link">Create an account</Link>
        </p>
      </div>
    </aside>
  );
}

/* ===== confirmation ===== */
function Success({ info }) {
  const headingRef = useRef(null);
  useEffect(() => { headingRef.current?.focus({ preventScroll: true }); }, []);
  if (!info?.ref) return <Navigate to={stepPath(1)} replace />;
  const method = { Email: " by email", "Phone Call": " by phone", WhatsApp: " on WhatsApp", "Video Meeting": " to set up a video meeting" }[info.method] || "";
  return (
    <div className="svc au gs">
      <Seo title="Request Received | Get Started | Leader Business Developer" description="Your quote request has been received by Leader Business Developer." path={DONE_PATH} robots="noindex, nofollow" />
      <div className="gs__wrap">
        <div className="gs-card gs-done">
          <SuccessScene />
          <h1 ref={headingRef} tabIndex={-1}>Thanks{info.firstName ? `, ${info.firstName}` : ""}! Your request is in.</h1>
          <p className="au-sub">
            A specialist will review your requirements and reply to <b className="au-email">{info.email}</b> within one business day{method}.
          </p>
          <p className="gs-done__ref">Reference number <b>{info.ref}</b></p>
          <ol className="gs-done__next">
            {[[Search, "We review", "Our team reads your brief and checks state or provider requirements."], [CalendarCheck, "You get a custom scope", "A clear plan with services, timeline and your final service amount."], [Rocket, "We get to work", "Approve the scope and we start, with updates at every step."]].map(([Icon, t, d], i) => (
              <li key={t} style={{ "--i": i }}><span><Icon size={18} aria-hidden="true" /></span><b>{t}</b><small>{d}</small></li>
            ))}
          </ol>
          <div className="gs-done__actions">
            <Link to="/register" className="au-btn">Create an account to track it <ArrowRight size={18} className="au-btn__arrow" aria-hidden="true" /></Link>
            <Link to="/" className="au-btn au-btn--ghost">Back to home</Link>
          </div>
          <p className="gs-muted gs-done__signin">Already have an account? <Link to="/login" className="au-link">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}

/* ===== the flow: /get-started/step-1 … step-7 and /get-started/submitted ===== */
export default function GetStarted() {
  const { step: param } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(() => location.state?.prefill || loadDraft());
  const [touched, setTouched] = useState({});
  const [tried, setTried] = useState({});
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const headingRef = useRef(null);
  const formRef = useRef(null);

  const match = /^step-([1-7])$/.exec(param || "");
  const n = match ? Number(match[1]) : 0;
  const prevN = useRef(n);

  useEffect(() => { saveDraft(data); }, [data]);

  // Announce each new step to screen readers by moving focus to its heading (not on first load).
  useEffect(() => {
    if (prevN.current === n) return;
    prevN.current = n;
    headingRef.current?.focus({ preventScroll: true });
  }, [n]);

  if (param === "submitted") return <Success info={location.state} />;
  if (!n) return <Navigate to={stepPath(1)} replace />;
  const gate = firstIncomplete(data, n - 1);
  if (gate < n) return <Navigate to={stepPath(gate)} replace />;

  const S = STEPS[n - 1];
  const Icon = STEP_ICONS[n - 1];
  const errors = VALIDATORS[n - 1](data);
  const valid = Object.keys(errors).length === 0;
  const dir = location.state?.dir;
  const loading = status === "loading";

  const set = (name, value) => setData((d) => ({ ...d, [name]: value }));
  const touch = (name) => setTouched((t) => ({ ...t, [name]: true }));
  const err = (name) => (touched[name] || tried[n] ? errors[name] : undefined);
  const bind = (name) => ({ name, value: data[name], onChange: (e) => set(name, e.target.value), onBlur: () => touch(name) });
  const bindSelect = (name) => ({ name, value: data[name], onChange: (e) => { set(name, e.target.value); touch(name); } });
  const go = (k, d) => navigate(stepPath(k), { state: { dir: d } });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!valid) {
      setTried((t) => ({ ...t, [n]: true }));
      formRef.current?.querySelector(`[name="${Object.keys(errors)[0]}"]`)?.focus();
      return;
    }
    if (n < TOTAL) return go(n + 1, "fwd");

    setError("");
    setStatus("loading");
    try {
      const ref = makeRef();
      await submitQuote({ ...data, ref: undefined, source: data.ref || undefined, reference: ref, submittedAt: new Date().toISOString() });
      clearDraft();
      // One transition, so the cleared answers and the new URL render together (otherwise the step guard
      // would see empty answers on step 7 and bounce back to step 1).
      startTransition(() => {
        navigate(DONE_PATH, { state: { ref, firstName: data.firstName.trim(), email: data.email.trim(), method: data.contactMethod } });
        setData({ ...EMPTY });
        setTouched({});
        setTried({});
      });
    } catch (ex) {
      setError(ex.message);
    } finally {
      setStatus("idle");
    }
  };

  const regionOptions = data.country === "United States" ? US_STATES : data.country === "Pakistan" ? PK_REGIONS : null;

  const review = [
    [1, "Business", [["Business name", data.businessName || "Not chosen yet"], ["Stage", STAGES.find(([k]) => k === data.stage)?.[1]], ["Entity", data.entity || "Not specified"], ["Industry", data.industry || "Not specified"]]],
    [2, "Location", [["Country / region", data.country], ["State / province", data.region]]],
    [3, "Services", [["Selected", data.services.map(serviceName).join(", ")]]],
    [4, "Requirements", [["Requirements", data.requirements], ["Existing website", data.website || "None"], ["Timeline", data.timeline || "Not specified"]]],
    [5, "Budget & Scope", [["Estimated budget", budgetName(data.budget)]]],
    [6, "Contact", [["Name", `${data.firstName} ${data.lastName}`.trim()], ["Email", data.email], ["Phone / WhatsApp", data.phone], ["Preferred contact", data.contactMethod || "No preference"]]],
  ];

  return (
    <div className="svc au gs">
      <Seo
        title={`Get Started – Step ${n} of ${TOTAL}: ${S.label} | Leader Business Developer`}
        description={n === 1
          ? "Get started with Leader Business Developer. Tell us about your business and request a custom quote for formation, compliance, banking, website and marketing services."
          : `Step ${n} of ${TOTAL} of your quote request: ${S.title}`}
        path={stepPath(n)}
        robots={n === 1 ? undefined : "noindex, nofollow"}
      />

      <div className="gs__wrap">
        <header className="gs-hero">
          <span className="au-eyebrow"><Sparkles size={14} aria-hidden="true" />Request a quote</span>
          <h1>Build the right solution for your business</h1>
          <p className="au-sub">
            Tell us about your business and select the services you need. Our team will review your requirements and prepare a customized scope and final service amount.
          </p>
        </header>

        <Progress n={n} reach={firstIncomplete(data)} />

        <div className="gs__grid">
          <section className="gs-card">
            <form ref={formRef} action="/api/quotes" method="post" noValidate onSubmit={onSubmit} aria-labelledby="gs-step-title">
              <div key={n} className={`gs-step${dir ? ` gs-step--${dir}` : ""}`}>
                <div className="gs-step__head">
                  <span className="gs-step__icon" aria-hidden="true"><Icon size={22} /></span>
                  <div>
                    <p className="gs-step__count">Step {n} of {TOTAL} · {S.label}</p>
                    <h2 id="gs-step-title" ref={headingRef} tabIndex={-1}>{S.title}</h2>
                    <p className="gs-step__sub">{S.sub}</p>
                  </div>
                </div>

                {n === 1 && (
                  <>
                    <Field
                      id="gs-bname" label={<>Business / Proposed Name <Opt /></>} icon={<Briefcase size={18} />}
                      autoComplete="organization" placeholder="e.g. Northwind Studio LLC" maxLength={120}
                      hint="You can leave this blank if you haven't chosen a name yet." {...bind("businessName")}
                    />
                    <Choices
                      name="stage" legend="Business Stage" options={STAGES} isOn={(v) => data.stage === v}
                      onToggle={(v) => { set("stage", v); touch("stage"); }} error={err("stage")}
                    />
                    <div className="au-2col">
                      <Select id="gs-entity" label={<>Current / Intended Entity <Opt /></>} icon={<Building2 size={18} />} placeholder="Select entity type" options={ENTITIES} {...bindSelect("entity")} />
                      <Field id="gs-industry" label={<>Business Industry <Opt /></>} icon={<Tag size={18} />} list="gs-industries" placeholder="e.g. Ecommerce & retail" maxLength={80} autoComplete="off" {...bind("industry")} />
                    </div>
                    <datalist id="gs-industries">{INDUSTRIES.map((x) => <option key={x} value={x} />)}</datalist>
                  </>
                )}

                {n === 2 && (
                  <div className="au-2col">
                    <Select
                      id="gs-country" label={<>Country / Region <Req /></>} icon={<Globe size={18} />} placeholder="Select country" options={COUNTRIES}
                      autoComplete="country-name" error={err("country")} name="country" value={data.country}
                      onChange={(e) => {
                        const country = e.target.value;
                        const list = country === "United States" ? US_STATES : country === "Pakistan" ? PK_REGIONS : null;
                        setData((d) => ({ ...d, country, region: list && !list.includes(d.region) ? "" : list ? d.region : "" }));
                        touch("country");
                      }}
                    />
                    {regionOptions || !data.country ? (
                      <Select
                        id="gs-region" label={<>State / Province / Region <Req /></>} icon={<MapPin size={18} />}
                        placeholder={data.country ? "Select location" : "Select a country first"} options={regionOptions || []}
                        disabled={!data.country} autoComplete="address-level1" error={err("region")} {...bindSelect("region")}
                      />
                    ) : (
                      <Field
                        id="gs-region" label={<>Country & State / Region <Req /></>} icon={<MapPin size={18} />}
                        placeholder="e.g. Ontario, Canada" autoComplete="address-level1" maxLength={80} error={err("region")} {...bind("region")}
                      />
                    )}
                  </div>
                )}

                {n === 3 && (
                  <Choices
                    type="checkbox" name="services" legend="Services" options={SERVICES} cols={3}
                    isOn={(v) => data.services.includes(v)}
                    onToggle={(v) => { setData((d) => ({ ...d, services: d.services.includes(v) ? d.services.filter((x) => x !== v) : [...d.services, v] })); touch("services"); }}
                    error={err("services")}
                    aside={<span className="gs-count" aria-live="polite">{data.services.length} selected</span>}
                  />
                )}

                {n === 4 && (
                  <>
                    {data.ref && <p className="gs-chip"><Info size={14} aria-hidden="true" /> You came from <b>{data.ref}</b>. We've noted it on your request.</p>}
                    <div className={`au-field${err("requirements") ? " is-err" : ""}`}>
                      <div className="au-field__top">
                        <label htmlFor="gs-req">Business / Project Requirements <Req /></label>
                        <span className="gs-count" aria-hidden="true">{data.requirements.length}/{REQ_MAX}</span>
                      </div>
                      <textarea
                        id="gs-req" className="gs-textarea" rows={6} maxLength={REQ_MAX}
                        placeholder="For example: I want to form an LLC in Texas, get an EIN, open a business bank account and launch a Shopify store."
                        aria-invalid={err("requirements") ? true : undefined} aria-describedby={err("requirements") ? "gs-req-msg" : undefined}
                        {...bind("requirements")}
                      />
                      <Msg id="gs-req-msg" error={err("requirements")} />
                    </div>
                    <div className="au-2col">
                      <Field
                        id="gs-site" label={<>Existing Website <Opt /></>} icon={<Globe size={18} />} inputMode="url" autoComplete="url"
                        autoCapitalize="none" spellCheck={false} placeholder="yourbusiness.com" hint="Leave blank if you don't have one."
                        error={err("website")} {...bind("website")}
                      />
                      <Select id="gs-timeline" label={<>Preferred Timeline <Opt /></>} icon={<Clock size={18} />} placeholder="Select timeline" options={TIMELINES} {...bindSelect("timeline")} />
                    </div>
                  </>
                )}

                {n === 5 && (
                  <>
                    <Choices
                      name="budget" legend="Estimated budget" options={BUDGETS} cols={1}
                      isOn={(v) => data.budget === v} onToggle={(v) => { set("budget", v); touch("budget"); }} error={err("budget")}
                    />
                    <p className="gs-note"><Info size={16} aria-hidden="true" /><span>This helps us understand the likely project scope. It is <b>not your final invoice amount</b>. Government, bank, payment-provider and other third-party fees may be charged separately.</span></p>
                  </>
                )}

                {n === 6 && (
                  <>
                    <div className="au-2col">
                      <Field id="gs-first" label={<>First Name <Req /></>} icon={<UserRound size={18} />} autoComplete="given-name" maxLength={60} error={err("firstName")} {...bind("firstName")} />
                      <Field id="gs-last" label={<>Last Name <Req /></>} icon={<UserRound size={18} />} autoComplete="family-name" maxLength={60} error={err("lastName")} {...bind("lastName")} />
                    </div>
                    <div className="au-2col">
                      <Field
                        id="gs-email" type="email" label={<>Email Address <Req /></>} icon={<Mail size={18} />} autoComplete="email" inputMode="email"
                        autoCapitalize="none" spellCheck={false} placeholder="name@company.com" error={err("email")} {...bind("email")}
                      />
                      <Field
                        id="gs-phone" type="tel" label={<>Phone / WhatsApp <Req /></>} icon={<Phone size={18} />} autoComplete="tel" inputMode="tel"
                        placeholder="+1 (555) 123-4567" error={err("phone")} hint="Include your country code if you're outside the U.S." {...bind("phone")}
                      />
                    </div>
                    <Select id="gs-method" label={<>Preferred Contact Method <Opt /></>} icon={<MessageSquare size={18} />} placeholder="Select contact method" options={CONTACT_METHODS} {...bindSelect("contactMethod")} />
                    <p className="gs-xlink"><LogIn size={16} aria-hidden="true" /><span>Have an account? <Link to="/login" state={{ from: stepPath(6) }} className="au-link">Sign in</Link> to track this request, or <Link to="/register" className="au-link">create one</Link> after you submit.</span></p>
                  </>
                )}

                {n === 7 && (
                  <>
                    {review.map(([k, title, items]) => (
                      <section key={k} className="gs-rev" aria-labelledby={`gs-rev-${k}`}>
                        <header>
                          <h3 id={`gs-rev-${k}`}>{title}</h3>
                          <Link to={stepPath(k)} state={{ dir: "back" }} className="gs-rev__edit" aria-label={`Edit ${title}`}><Pencil size={14} aria-hidden="true" /> Edit</Link>
                        </header>
                        <dl>
                          {items.map(([dt, dd]) => <div key={dt}><dt>{dt}</dt><dd>{dd}</dd></div>)}
                        </dl>
                      </section>
                    ))}
                    <div className="gs-warn" role="note">
                      <ShieldAlert size={18} aria-hidden="true" />
                      <p><b>Keep sensitive data out.</b> Do not submit passwords, banking login credentials, card information, OTPs, API secret keys, access tokens, SSNs, ITIN numbers or passport numbers. If we need documents, we'll request them securely.</p>
                    </div>
                    <Checkbox id="gs-consent" name="consent" checked={data.consent} error={err("consent")} onChange={(e) => { set("consent", e.target.checked); touch("consent"); }}>
                      I agree that Leader Business Developer may contact me regarding this quote request. I understand that submitting a request does not guarantee government, bank, payment-provider or third-party approval.
                    </Checkbox>
                  </>
                )}
              </div>

              {error && <Alert>{error}</Alert>}

              <div className="gs-nav">
                {n > 1 ? (
                  <button type="button" className="au-btn au-btn--ghost gs-back" onClick={() => go(n - 1, "back")} disabled={loading}>
                    <ArrowLeft size={18} aria-hidden="true" /> Back
                  </button>
                ) : <span />}
                <button type="submit" className={`au-btn gs-next${valid ? "" : " is-off"}`} aria-disabled={!valid || undefined} aria-describedby="gs-next-hint" aria-busy={loading || undefined}>
                  {loading ? (
                    <><Loader2 size={18} className="au-spin" aria-hidden="true" />Sending request…</>
                  ) : n < TOTAL ? (
                    <>Next<span className="gs-next__to">: {STEPS[n].label}</span><ArrowRight size={18} className="au-btn__arrow" aria-hidden="true" /></>
                  ) : (
                    <>Submit quote request<ArrowRight size={18} className="au-btn__arrow" aria-hidden="true" /></>
                  )}
                </button>
              </div>
              <p id="gs-next-hint" className={`gs-hint${valid ? " is-hidden" : ""}`}>
                {n === TOTAL ? "Confirm the consent box to submit." : "Complete the required fields to continue."}
              </p>
            </form>
          </section>

          <Sidebar n={n} data={data} />
        </div>
      </div>
    </div>
  );
}
