import { startTransition, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, Building2, MapPin, UsersRound, UserRound, ClipboardCheck, Mail, Phone, Briefcase, FileText, Pencil, Plus, Trash2,
  ShieldAlert, MessageSquare, Sparkles, Loader2, Landmark, User, Tag, Info, Check, Store, CalendarDays, Hash, ExternalLink, FileCheck,
} from "lucide-react";
import Seo from "../../../components/common/Seo";
import { Field, Checkbox, Alert } from "../../auth/AuthBits";
import { CONTACT } from "../../../data/site";
import { Opt, Req, Msg, Select, Choices, Progress } from "../FormBits";
import { submitQuote } from "../quoteApi";
import {
  STEPS, TOTAL, ENTITY_TYPES, OWNERSHIP, TITLES, STARTED, PURPOSES, CONTACT_METHODS, US_STATES, MAX_PARTNERS, DBA_PATH, DBA_THANK_YOU_PATH, HAS_API,
  VALIDATORS, firstIncomplete, loadDraft, saveDraft, clearDraft, blankDraft, toPayload, makeRef, filingInfo, countyRequired, entityLabel,
  isEntity, legalNameLabel, ownerNameLabel,
} from "./dbaData";
import "../../auth/Auth.css";
import "../GetStarted.css";
import "../llc/LlcForm.css";
import "./DbaForm.css";

const STEP_ICONS = [Store, Building2, UserRound, FileCheck, ClipboardCheck];
const OPT_ICONS = { sole: User, partnership: UsersRound, llc: Building2, corp: Landmark, other: FileText, single: User, multiple: UsersRound, no: Tag, yes: CalendarDays };
const TEL = `tel:${CONTACT.phone.replace(/[^\d+]/g, "")}`;
const TIPS = [
  "Pick a name that's easy to spell and not already used by a similar business in your state.",
  "Your DBA doesn't create a new company. It's another name for the business you already have.",
  "The person we list should be allowed to sign for the business.",
  "Some states file DBAs with the county, so the county where you operate can matter.",
  "One last look before it goes to our team.",
];

const addrLine = (street, city, state, zip) => [street, [city, state].filter(Boolean).join(", "), zip].filter(Boolean).join(", ");
const todayISO = () => new Date().toISOString().slice(0, 10);

/* Summary + help beside the form (hidden on small screens, like the other flows). */
function Sidebar({ n, data }) {
  const info = filingInfo(data.state, data.entity);
  const rows = [
    [Store, data.dbaName.trim() && `“${data.dbaName.trim()}”`],
    [MapPin, data.state && `Registering in ${data.state}`],
    [Building2, data.entity && entityLabel(data.entity)],
    [Briefcase, data.legalName.trim() && `Legal name: ${data.legalName.trim()}`],
    [Landmark, info.known && data.entity && (info.level === "county" ? "Filed with the county" : info.level === "state" ? "Filed with the state" : "")],
  ].filter(([, text]) => text);
  return (
    <aside className="gs-side" aria-label="Your application">
      <div className="gs-panel llc-tip">
        <h3><Sparkles size={16} aria-hidden="true" /> Tip</h3>
        <p className="gs-muted">{TIPS[n - 1]}</p>
      </div>
      <div className="gs-panel gs-sum">
        <h3>Your DBA</h3>
        {rows.length ? (
          <ul>{rows.map(([Icon, text], i) => <li key={i}><Icon size={16} aria-hidden="true" /><span>{text}</span></li>)}</ul>
        ) : (
          <p className="gs-muted">Your answers will appear here as you go.</p>
        )}
      </div>
      <div className="gs-panel gs-help">
        <h3>Need a hand?</h3>
        <a href={TEL}><Phone size={16} aria-hidden="true" />{CONTACT.phone}</a>
        <a href={`mailto:${CONTACT.email}`}><Mail size={16} aria-hidden="true" />{CONTACT.email}</a>
        <p className="gs-muted">Not sure you need a DBA? <Link to="/business/dba" className="au-link">Learn how DBAs work</Link>.</p>
      </div>
    </aside>
  );
}

/* A short state-specific note (what the state calls it, where it's filed). */
function StateNote({ data }) {
  if (!data.state || !data.entity) return null;
  const info = filingInfo(data.state, data.entity);
  return (
    <p className={`gs-note dba-state${info.known ? "" : " is-unknown"}`} aria-live="polite">
      <Info size={16} aria-hidden="true" />
      <span>{info.text}</span>
    </p>
  );
}

function AddressFields({ prefix, keys, err, bind, bindSelect, streetLabel = "Street Address", withUnit = false, hint }) {
  const [street, street2, city, state, zip] = keys;
  return (
    <>
      <Field id={`${prefix}-street`} label={<>{streetLabel} <Req /></>} icon={<MapPin size={18} />} autoComplete="address-line1" maxLength={120} hint={hint} error={err(street)} {...bind(street)} />
      {withUnit && <Field id={`${prefix}-street2`} label={<>Apt, Suite, Unit <Opt /></>} icon={<Building2 size={18} />} autoComplete="address-line2" maxLength={60} {...bind(street2)} />}
      <div className="llc-3col">
        <Field id={`${prefix}-city`} label={<>City <Req /></>} autoComplete="address-level2" maxLength={60} error={err(city)} {...bind(city)} />
        <Select id={`${prefix}-state`} label={<>State <Req /></>} icon={<MapPin size={18} />} placeholder="State" options={US_STATES} error={err(state)} {...bindSelect(state)} />
        <Field id={`${prefix}-zip`} label={<>ZIP Code <Req /></>} autoComplete="postal-code" inputMode="numeric" maxLength={10} placeholder="78701" error={err(zip)} {...bind(zip)} />
      </div>
    </>
  );
}

export default function DbaForm() {
  const [params, setParams] = useSearchParams();
  const [data, setData] = useState(() => {
    const d = loadDraft();
    const state = params.get("state") || "";
    const name = (params.get("name") || "").trim().slice(0, 120);
    return { ...d, ...(US_STATES.includes(state) ? { state } : {}), ...(name ? { dbaName: name } : {}) };
  });
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState();
  const [touched, setTouched] = useState({});
  const [tried, setTried] = useState({});
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const headingRef = useRef(null);
  const formRef = useRef(null);

  // Never show a step whose earlier steps are incomplete.
  const n = Math.min(step, firstIncomplete(data, step - 1));
  const prevN = useRef(n);

  useEffect(() => { saveDraft(data); }, [data]);
  useEffect(() => { if ([...params.keys()].length) setParams({}, { replace: true }); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Announce each new step to screen readers by moving focus to its heading (not on first load).
  useEffect(() => {
    if (prevN.current === n) return;
    prevN.current = n;
    window.scrollTo(0, 0);
    headingRef.current?.focus({ preventScroll: true });
  }, [n]);

  const S = STEPS[n - 1];
  const Icon = STEP_ICONS[n - 1];
  const errors = VALIDATORS[n - 1](data);
  const valid = Object.keys(errors).length === 0;
  const loading = status === "loading";
  const info = filingInfo(data.state, data.entity);
  const entity = isEntity(data);

  const set = (name, value) => setData((d) => ({ ...d, [name]: value }));
  const touch = (name) => setTouched((t) => ({ ...t, [name]: true }));
  const err = (name) => (touched[name] || tried[n] ? errors[name] : undefined);
  const bind = (name) => ({ name, value: data[name], onChange: (e) => set(name, e.target.value), onBlur: () => touch(name) });
  const bindSelect = (name) => ({ name, value: data[name], onChange: (e) => { set(name, e.target.value); touch(name); } });
  const go = (k, d) => { setDir(d); setStep(k); };

  // Changing the business type changes later questions, so clear answers that no longer apply.
  const pickEntity = (v) => {
    setData((d) => ({
      ...d, entity: v,
      ownerTitle: v === d.entity ? d.ownerTitle : "", ownership: v === d.entity ? d.ownership : "",
      formState: v === "llc" || v === "corp" || v === "other" ? d.formState : "", formId: v === "llc" || v === "corp" || v === "other" ? d.formId : "",
    }));
    touch("entity");
  };

  const setPartner = (i, value) => setData((d) => ({ ...d, partners: d.partners.map((p, j) => (j === i ? value : p)) }));

  const next = (k) => {
    // The owner is usually the person already named as the sole proprietor, so save them retyping it.
    if (k === 3) setData((d) => (d.ownerName.trim() || d.entity !== "sole" ? d : { ...d, ownerName: d.legalName.trim() }));
    go(k, "fwd");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!valid) {
      setTried((t) => ({ ...t, [n]: true }));
      const first = Object.keys(errors)[0];
      (formRef.current?.querySelector(`[name="${first}"]`) || formRef.current?.querySelector(".llc-add"))?.focus();
      return;
    }
    if (n < TOTAL) return next(n + 1);

    setError("");
    setStatus("loading");
    try {
      const reference = makeRef();
      const res = await submitQuote({ ...toPayload(data), reference, submittedAt: new Date().toISOString() });
      const summary = { reference, dbaName: data.dbaName.trim(), state: data.state, entity: entityLabel(data.entity), email: data.email.trim(), term: info.term, level: info.level, publication: info.publication, demo: Boolean(res?.demo) };
      clearDraft();
      // One transition, so the cleared answers and the new page render together (the step guard would otherwise bounce us back).
      startTransition(() => {
        navigate(DBA_THANK_YOU_PATH, { replace: true, state: summary });
        setData(blankDraft());
        setTouched({});
        setTried({});
      });
    } catch (ex) {
      setError(ex.message);
    } finally {
      setStatus("idle");
    }
  };

  const purposeText = data.purpose === "Other" ? data.purposeOther.trim() : data.purpose;
  const bizAddr = addrLine([data.street, data.street2].map((s) => s.trim()).filter(Boolean).join(", "), data.city.trim(), data.bizState, data.zip.trim());
  const review = [
    [1, "Business", [
      ["DBA name", data.dbaName.trim()], ["Backup name", data.altName.trim() || "None"], ["State", data.state],
      ["Business type", entityLabel(data.entity)], ["Filing", info.known ? `${info.term}, ${info.level === "county" ? "county level" : info.level === "state" ? "state level" : "state or county"}` : "We'll confirm for your state"],
    ]],
    [2, "Legal Details", [
      [legalNameLabel(data), data.legalName.trim()],
      ...(data.formState ? [["Formed in", data.formState]] : []),
      ...(data.formId.trim() ? [["Entity number", data.formId.trim()]] : []),
      ...(data.ein.trim() ? [["EIN", data.ein.trim()]] : []),
      ["Business address", bizAddr],
    ]],
    [3, "Owner", [
      [ownerNameLabel(data), data.ownerName.trim()],
      ...(data.ownerTitle ? [["Role", data.ownerTitle]] : []),
      ...(entity ? [["Ownership", OWNERSHIP.find(([k]) => k === data.ownership)?.[1]]] : []),
      ...(data.entity === "partnership" ? [["Partners", data.partners.map((p) => p.trim()).join("\n")]] : []),
      ["Mailing address", data.mailingSame ? "Same as business address" : addrLine(data.mStreet.trim(), data.mCity.trim(), data.mState, data.mZip.trim())],
      ["Email", data.email.trim()], ["Phone", data.phone.trim()], ["Preferred contact", data.contactMethod || "No preference"],
    ]],
    [4, "DBA Details", [
      ["Business activity", purposeText], ["Description", data.description.trim() || "None"],
      ["Operating address", data.opSame ? "Same as business address" : addrLine([data.oStreet, data.oStreet2].map((s) => s.trim()).filter(Boolean).join(", "), data.oCity.trim(), data.oState, data.oZip.trim())],
      ["County", data.county.trim() || "Not provided"],
      ["Already using the name", data.started === "yes" ? `Yes, since ${data.startDate}` : "Not yet"],
      ...(data.state === "Washington" && data.ubi.trim() ? [["UBI number", data.ubi.trim()]] : []),
      ...(data.notes.trim() ? [["Notes", data.notes.trim()]] : []),
    ]],
  ];

  return (
    <div className="svc au gs llc dba">
      <Seo
        title={`Register Your DBA – Step ${n} of ${TOTAL}: ${S.label} | Leader Business Developer`}
        description="Start your DBA (doing business as) registration online. Choose your name and state, add your business details, and review everything before you submit."
        path={DBA_PATH}
        robots={n === 1 ? undefined : "noindex, nofollow"}
      />

      <div className="gs__wrap">
        <header className="gs-hero">
          <span className="au-eyebrow"><Store size={14} aria-hidden="true" />DBA application</span>
          <h1>Register your DBA in a few simple steps</h1>
          <p className="au-sub">Tell us about the business and the name you want to use. You can review everything before it goes to our team, and we'll prepare the filing for your state.</p>
        </header>

        <Progress label="DBA application progress" steps={STEPS} n={n} reach={firstIncomplete(data)} onStep={go} />

        <div className="gs__grid">
          <section className="gs-card">
            <form ref={formRef} noValidate onSubmit={onSubmit} aria-labelledby="gs-step-title">
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
                      id="dba-name" label={<>DBA Name <Req /></>} icon={<Store size={18} />} placeholder="e.g. Brightleaf Bakery" maxLength={120}
                      autoComplete="off" error={err("dbaName")} {...bind("dbaName")}
                      hint={<>The name customers will see. <a className="au-link" href={`/resources/tools/name-check?name=${encodeURIComponent(data.dbaName.trim())}`} target="_blank" rel="noopener noreferrer">Check trademark &amp; domain availability <ExternalLink size={11} aria-hidden="true" /></a></>}
                    />
                    <Field
                      id="dba-alt" label={<>Backup Name <Opt /></>} icon={<Tag size={18} />} placeholder="e.g. Brightleaf Baking Co." maxLength={120}
                      autoComplete="off" hint="We'll suggest this if your first choice isn't available." error={err("altName")} {...bind("altName")}
                    />
                    <Select
                      id="dba-state" label={<>State <Req /></>} icon={<MapPin size={18} />} placeholder="Select a state" options={US_STATES}
                      error={err("state")} hint="Register in the state where the business operates." {...bindSelect("state")}
                    />
                    <Choices
                      name="entity" legend="Type of business that will use this name" options={ENTITY_TYPES} icons={OPT_ICONS} cols={1}
                      isOn={(v) => data.entity === v} onToggle={pickEntity} error={err("entity")}
                    />
                    <StateNote data={data} />
                  </>
                )}

                {n === 2 && (
                  <>
                    <Field
                      id="dba-legal" label={<>{legalNameLabel(data)} <Req /></>} icon={data.entity === "sole" ? <UserRound size={18} /> : <Briefcase size={18} />} maxLength={120}
                      autoComplete={data.entity === "sole" ? "name" : "organization"} error={err("legalName")} {...bind("legalName")}
                      placeholder={data.entity === "llc" ? "e.g. Northwind Holdings LLC" : data.entity === "corp" ? "e.g. Northwind Holdings, Inc." : data.entity === "sole" ? "First and last name" : ""}
                      hint={data.entity === "sole" ? "Use the name on your ID, not your business name." : "Enter it exactly as it appears on your state formation records."}
                    />
                    {(data.entity === "llc" || data.entity === "corp" || data.entity === "other") && (
                      <div className="llc-cond">
                        <h3 className="llc-sub">Registration details</h3>
                        <Select
                          id="dba-formstate" label={<>State Where It Was Formed {data.entity === "other" ? <Opt /> : <Req />}</>} icon={<MapPin size={18} />}
                          placeholder="Select a state" options={US_STATES} error={err("formState")} {...bindSelect("formState")}
                        />
                        <Field
                          id="dba-formid" label={<>State File / Entity Number <Opt /></>} icon={<Hash size={18} />} maxLength={40} autoComplete="off"
                          hint="Found on your formation documents. It helps us match your record." {...bind("formId")}
                        />
                      </div>
                    )}
                    {data.entity !== "other" && (
                      <Field
                        id="dba-ein" label={<>EIN <Opt /></>} icon={<Hash size={18} />} maxLength={10} inputMode="numeric" autoComplete="off" placeholder="12-3456789"
                        hint="Your employer ID number, if you have one. Never enter a Social Security number." error={err("ein")} {...bind("ein")}
                      />
                    )}

                    <h3 className="llc-sub">Business address</h3>
                    <AddressFields prefix="dba" keys={["street", "street2", "city", "bizState", "zip"]} err={err} bind={bind} bindSelect={bindSelect} withUnit hint="The main address where the business is run." />
                  </>
                )}

                {n === 3 && (
                  <>
                    <Field
                      id="dba-owner" label={<>{ownerNameLabel(data)} <Req /></>} icon={<UserRound size={18} />} maxLength={80} autoComplete="name"
                      error={err("ownerName")} {...bind("ownerName")}
                    />
                    {(data.entity === "llc" || data.entity === "corp") && (
                      <Select id="dba-title" label={<>Role in the {data.entity === "llc" ? "LLC" : "Corporation"} <Req /></>} icon={<Briefcase size={18} />} placeholder="Select a role" options={TITLES[data.entity]} error={err("ownerTitle")} {...bindSelect("ownerTitle")} />
                    )}
                    {entity && (
                      <Choices
                        name="ownership" legend="Number of owners" options={OWNERSHIP} icons={OPT_ICONS}
                        isOn={(v) => data.ownership === v} onToggle={(v) => { set("ownership", v); touch("ownership"); }} error={err("ownership")}
                      />
                    )}
                    {data.entity === "partnership" && (
                      <div className="llc-cond">
                        <h3 className="llc-sub">Partners</h3>
                        <p className="gs-muted llc-sub-note">List every partner, including the person named above.</p>
                        {data.partners.map((p, i) => (
                          <div className="llc-row" key={i}>
                            <Field
                              id={`dba-partner-${i}`} label={<>Partner {i + 1} full name <Req /></>} icon={<UserRound size={18} />} maxLength={80} autoComplete="off"
                              name={`partner${i}`} value={p} error={err(`partner${i}`)} onChange={(e) => setPartner(i, e.target.value)} onBlur={() => touch(`partner${i}`)}
                            />
                            {data.partners.length > 2 && (
                              <button type="button" className="llc-remove" onClick={() => setData((d) => ({ ...d, partners: d.partners.filter((_, j) => j !== i) }))} aria-label={`Remove partner ${i + 1}`}>
                                <Trash2 size={18} aria-hidden="true" />
                              </button>
                            )}
                          </div>
                        ))}
                        {data.partners.length < MAX_PARTNERS && (
                          <button type="button" className="llc-add" onClick={() => setData((d) => ({ ...d, partners: [...d.partners, ""] }))}><Plus size={16} aria-hidden="true" /> Add another partner</button>
                        )}
                        <Msg id="dba-partners-msg" error={err("partners")} />
                      </div>
                    )}

                    <h3 className="llc-sub">Contact details</h3>
                    <div className="au-2col">
                      <Field
                        id="dba-email" type="email" label={<>Email Address <Req /></>} icon={<Mail size={18} />} autoComplete="email" inputMode="email"
                        autoCapitalize="none" spellCheck={false} placeholder="name@company.com" error={err("email")} {...bind("email")}
                      />
                      <Field id="dba-phone" type="tel" label={<>Phone <Req /></>} icon={<Phone size={18} />} autoComplete="tel" inputMode="tel" placeholder="+1 (555) 123-4567" error={err("phone")} {...bind("phone")} />
                    </div>
                    <Select id="dba-method" label={<>Preferred Contact Method <Opt /></>} icon={<MessageSquare size={18} />} placeholder="Select contact method" options={CONTACT_METHODS} {...bindSelect("contactMethod")} />
                    <Checkbox id="dba-mail" name="mailingSame" checked={data.mailingSame} onChange={(e) => set("mailingSame", e.target.checked)}>
                      My mailing address is the same as my business address.
                    </Checkbox>
                    {!data.mailingSame && (
                      <div className="llc-cond">
                        <h3 className="llc-sub">Mailing address</h3>
                        <AddressFields prefix="dba-m" keys={["mStreet", "", "mCity", "mState", "mZip"]} err={err} bind={bind} bindSelect={bindSelect} streetLabel="Street Address / P.O. Box" />
                      </div>
                    )}
                  </>
                )}

                {n === 4 && (
                  <>
                    <StateNote data={data} />
                    <Select id="dba-purpose" label={<>What does the business do under this name? <Req /></>} icon={<Briefcase size={18} />} placeholder="Select business activity" options={PURPOSES} error={err("purpose")} {...bindSelect("purpose")} />
                    {data.purpose === "Other" && (
                      <Field id="dba-purpose-other" label={<>Describe the Activity <Req /></>} icon={<FileText size={18} />} maxLength={120} placeholder="e.g. Mobile pet grooming" error={err("purposeOther")} {...bind("purposeOther")} />
                    )}
                    <div className="au-field">
                      <div className="au-field__top">
                        <label htmlFor="dba-desc">Short Description <Opt /></label>
                        <span className="gs-count" aria-hidden="true">{data.description.length}/500</span>
                      </div>
                      <textarea id="dba-desc" className="gs-textarea" rows={3} maxLength={500} placeholder="A sentence or two about what you sell or do." {...bind("description")} />
                    </div>

                    <h3 className="llc-sub">Where the business operates</h3>
                    <Checkbox id="dba-op" name="opSame" checked={data.opSame} onChange={(e) => set("opSame", e.target.checked)}>
                      The business operates from the business address I entered earlier.
                    </Checkbox>
                    {!data.opSame && (
                      <div className="llc-cond">
                        <h3 className="llc-sub">Operating address</h3>
                        <AddressFields prefix="dba-o" keys={["oStreet", "oStreet2", "oCity", "oState", "oZip"]} err={err} bind={bind} bindSelect={bindSelect} withUnit hint="Must be a physical address, not a P.O. box." />
                      </div>
                    )}
                    <Field
                      id="dba-county" label={<>County where the business operates {countyRequired(data) ? <Req /> : <Opt />}</>} icon={<MapPin size={18} />} maxLength={60} autoComplete="off"
                      placeholder="e.g. Travis County" error={err("county")}
                      hint={countyRequired(data) ? `Required: ${data.state} files DBAs with the county.` : "Many states file at the county level, so this helps us confirm where to file."}
                      {...bind("county")}
                    />

                    <Choices
                      name="started" legend="Have you already used this name with customers?" options={STARTED} icons={OPT_ICONS}
                      isOn={(v) => data.started === v} onToggle={(v) => { set("started", v); touch("started"); }} error={err("started")}
                    />
                    {data.started === "yes" && (
                      <Field
                        id="dba-start" type="date" max={todayISO()} label={<>Date You Started Using the Name <Req /></>} icon={<CalendarDays size={18} />}
                        error={err("startDate")} {...bind("startDate")}
                      />
                    )}

                    {data.state === "Washington" && (
                      <Field id="dba-ubi" label={<>UBI Number <Opt /></>} icon={<Hash size={18} />} maxLength={15} autoComplete="off" hint="Washington's Unified Business Identifier, if the business already has one." {...bind("ubi")} />
                    )}
                    {info.publication && (
                      <Checkbox id="dba-pub" name="pubAck" checked={data.pubAck} error={err("pubAck")} onChange={(e) => { set("pubAck", e.target.checked); touch("pubAck"); }}>
                        I understand {data.state} requires a notice of my DBA to be published in a local newspaper after filing, and that publication costs are separate.
                      </Checkbox>
                    )}
                    <div className="au-field">
                      <div className="au-field__top"><label htmlFor="dba-notes">Anything else we should know? <Opt /></label><span className="gs-count" aria-hidden="true">{data.notes.length}/500</span></div>
                      <textarea id="dba-notes" className="gs-textarea" rows={3} maxLength={500} {...bind("notes")} />
                    </div>
                  </>
                )}

                {n === 5 && (
                  <>
                    {review.map(([k, title, items]) => (
                      <section key={k} className="gs-rev" aria-labelledby={`dba-rev-${k}`}>
                        <header>
                          <h3 id={`dba-rev-${k}`}>{title}</h3>
                          <button type="button" onClick={() => go(k, "back")} className="gs-rev__edit" aria-label={`Edit ${title}`}><Pencil size={14} aria-hidden="true" /> Edit</button>
                        </header>
                        <dl>{items.map(([dt, dd]) => <div key={dt}><dt>{dt}</dt><dd>{dd}</dd></div>)}</dl>
                      </section>
                    ))}
                    <div className="gs-warn" role="note">
                      <ShieldAlert size={18} aria-hidden="true" />
                      <p><b>Keep sensitive data out.</b> Do not submit passwords, card details, SSNs, ITIN or passport numbers here. If we need them, we'll request them through a secure channel.</p>
                    </div>
                    {!HAS_API && (
                      <p className="gs-note dba-state is-unknown" role="note">
                        <Info size={16} aria-hidden="true" />
                        <span><b>Preview mode:</b> no application server is connected to this site yet, so submitting won't send your application to anyone.</span>
                      </p>
                    )}
                    <Checkbox id="dba-consent" name="consent" checked={data.consent} error={err("consent")} onChange={(e) => { set("consent", e.target.checked); touch("consent"); }}>
                      I confirm the information above is accurate and that Leader Business Developer may contact me about this application. I understand that submitting does not file my DBA with the state, that state filing fees are separate, and that the state decides whether to accept the name.
                    </Checkbox>
                  </>
                )}
              </div>

              {error && <Alert>{error}</Alert>}

              <div className="gs-nav">
                {n > 1 ? (
                  <button type="button" className="au-btn au-btn--ghost gs-back" onClick={() => go(n - 1, "back")} disabled={loading}>
                    <ArrowLeft size={18} aria-hidden="true" /> Previous
                  </button>
                ) : <span />}
                <button type="submit" className={`au-btn gs-next${valid ? "" : " is-off"}`} aria-disabled={!valid || undefined} aria-describedby="dba-next-hint" aria-busy={loading || undefined}>
                  {loading ? (
                    <><Loader2 size={18} className="au-spin" aria-hidden="true" />Submitting…</>
                  ) : n < TOTAL ? (
                    <>Continue<ArrowRight size={18} className="au-btn__arrow" aria-hidden="true" /></>
                  ) : (
                    <>Submit application<Check size={18} aria-hidden="true" /></>
                  )}
                </button>
              </div>
              <p id="dba-next-hint" className={`gs-hint${valid ? " is-hidden" : ""}`}>
                {n === TOTAL ? "Confirm the box above to submit." : "Complete the required fields to continue."}
              </p>
            </form>
          </section>

          <Sidebar n={n} data={data} />
        </div>
      </div>
    </div>
  );
}
