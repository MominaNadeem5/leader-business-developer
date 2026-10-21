import { startTransition, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, Building2, MapPin, UsersRound, UserRound, ClipboardCheck, Mail, Phone, Briefcase, FileText, Pencil, Plus, Trash2,
  ShieldAlert, ShieldCheck, MessageSquare, Sparkles, Loader2, Landmark, Percent, Crown, Users, UserCog, User, Home, Tag, Info, Check,
} from "lucide-react";
import Seo from "../../../components/common/Seo";
import { Field, Checkbox, Alert } from "../../auth/AuthBits";
import { CONTACT } from "../../../data/site";
import { Opt, Req, Msg, Select, Choices, Progress } from "../FormBits";
import { submitQuote } from "../quoteApi";
import { THANK_YOU_PATH } from "../quoteData";
import {
  STEPS, TOTAL, PURPOSES, MANAGEMENT, MEMBER_COUNTS, AGENTS, CONTACT_METHODS, US_STATES, MAX_MEMBERS, MAX_MANAGERS, LLC_PATH,
  EMPTY, VALIDATORS, blankMember, isMulti, isManagerManaged, percentTotal, visibleMembers, firstIncomplete, loadDraft, saveDraft, clearDraft,
  toPayload, makeRef,
} from "./llcData";
import "../../auth/Auth.css";
import "../GetStarted.css";
import "./LlcForm.css";

const STEP_ICONS = [Building2, Briefcase, UserCog, UsersRound, Landmark, UserRound, ClipboardCheck];
const OPT_ICONS = { member: Users, manager: Crown, single: User, multi: UsersRound, ours: ShieldCheck, own: Home, other: Landmark };
const TEL = `tel:${CONTACT.phone.replace(/[^\d+]/g, "")}`;
const TIPS = [
  "Use the exact name you want on state records, including the LLC ending.",
  "Your purpose can be broad. You can change how you operate later.",
  "Member-managed is simplest. Choose manager-managed if some owners are passive investors.",
  "Ownership percentages must total exactly 100%.",
  "The agent must have a physical street address in your formation state. P.O. boxes aren't allowed.",
  "A real person from our team will reach out about your filing.",
  "One last look before it goes to our team.",
];

const addrLine = (street, city, state, zip) => [street, [city, state].filter(Boolean).join(", "), zip].filter(Boolean).join(", ");

/* Summary + help beside the form (hidden on small screens, like the quote flow). */
function Sidebar({ n, data }) {
  const members = visibleMembers(data).filter((m) => m.name.trim());
  const rows = [
    [Building2, data.name.trim()],
    [MapPin, data.state && `Formed in ${data.state}`],
    [Briefcase, data.purpose === "Other" ? data.purposeOther.trim() : data.purpose],
    [UserCog, data.management && `${data.management === "member" ? "Member" : "Manager"}-managed`],
    [UsersRound, members.length ? `${members.length} member${members.length > 1 ? "s" : ""}: ${members.map((m) => m.name.trim()).join(", ")}` : ""],
    [Landmark, data.agent && AGENTS.find(([k]) => k === data.agent)[1]],
  ].filter(([, text]) => text);
  return (
    <aside className="gs-side" aria-label="Your application">
      <div className="gs-panel llc-tip">
        <h3><Sparkles size={16} aria-hidden="true" /> Tip</h3>
        <p className="gs-muted">{TIPS[n - 1]}</p>
      </div>
      <div className="gs-panel gs-sum">
        <h3>Your LLC</h3>
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
        <p className="gs-muted">Not sure an LLC is right for you? <Link to="/resources/learn/llc-vs-corporation" className="au-link">Compare LLC vs corporation</Link>.</p>
      </div>
    </aside>
  );
}

export default function LlcForm() {
  const [params, setParams] = useSearchParams();
  const [data, setData] = useState(() => {
    const d = loadDraft();
    const state = params.get("state") || "";
    const name = (params.get("name") || "").trim().slice(0, 120);
    return { ...d, ...(US_STATES.includes(state) ? { state } : {}), ...(name ? { name } : {}) };
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
  const multi = isMulti(data);
  const members = visibleMembers(data);

  const set = (name, value) => setData((d) => ({ ...d, [name]: value }));
  const touch = (name) => setTouched((t) => ({ ...t, [name]: true }));
  const err = (name) => (touched[name] || tried[n] ? errors[name] : undefined);
  const bind = (name) => ({ name, value: data[name], onChange: (e) => set(name, e.target.value), onBlur: () => touch(name) });
  const bindSelect = (name) => ({ name, value: data[name], onChange: (e) => { set(name, e.target.value); touch(name); } });
  const go = (k, d) => { setDir(d); setStep(k); };

  const setMember = (i, field, value) => setData((d) => ({ ...d, members: d.members.map((m, j) => (j === i ? { ...m, [field]: value } : m)) }));
  const bindMember = (i, field, errKey) => ({
    name: errKey, value: data.members[i][field], onChange: (e) => setMember(i, field, e.target.value), onBlur: () => touch(errKey),
  });
  const addMember = () => setData((d) => ({ ...d, members: [...d.members, blankMember()] }));
  const removeMember = (i) => setData((d) => ({ ...d, members: d.members.filter((_, j) => j !== i) }));
  const splitEvenly = () => setData((d) => {
    const count = d.members.length;
    const base = Math.floor((100 / count) * 100) / 100;
    return { ...d, members: d.members.map((m, j) => ({ ...m, percent: String(j === count - 1 ? +(100 - base * (count - 1)).toFixed(2) : base) })) };
  });
  const setManager = (i, value) => setData((d) => ({ ...d, managers: d.managers.map((m, j) => (j === i ? value : m)) }));

  const pickMemberCount = (v) => {
    setData((d) => ({ ...d, memberCount: v, members: v === "multi" && d.members.length < 2 ? [...d.members, blankMember()] : d.members }));
    touch("memberCount");
  };

  const useBusinessAddress = () => setData((d) => ({ ...d, agentStreet: d.street, agentCity: d.city, agentZip: d.zip }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!valid) {
      setTried((t) => ({ ...t, [n]: true }));
      const first = Object.keys(errors)[0];
      (formRef.current?.querySelector(`[name="${first}"]`) || formRef.current?.querySelector(".llc-add"))?.focus();
      return;
    }
    if (n < TOTAL) return go(n + 1, "fwd");

    setError("");
    setStatus("loading");
    try {
      await submitQuote({ ...toPayload(data), reference: makeRef(), submittedAt: new Date().toISOString() });
      clearDraft();
      // One transition, so the cleared answers and the new page render together (the step guard would otherwise bounce us back).
      startTransition(() => {
        navigate(THANK_YOU_PATH, { replace: true });
        setData({ ...EMPTY, members: [blankMember()], managers: [""] });
        setTouched({});
        setTried({});
      });
    } catch (ex) {
      setError(ex.message);
    } finally {
      setStatus("idle");
    }
  };

  const agentOwn = data.agent === "own" || data.agent === "other";
  const purposeText = data.purpose === "Other" ? data.purposeOther.trim() : data.purpose;
  const review = [
    [1, "Name & State", [["LLC name", data.name.trim()], ["Backup name", data.altName.trim() || "None"], ["State of formation", data.state]]],
    [2, "Business", [
      ["Purpose", purposeText], ["Description", data.description.trim() || "None"],
      ["Principal address", addrLine([data.street, data.street2].map((s) => s.trim()).filter(Boolean).join(", "), data.city.trim(), data.bizState, data.zip.trim())],
      ["Mailing address", data.mailingSame ? "Same as principal address" : addrLine(data.mStreet.trim(), data.mCity.trim(), data.mState, data.mZip.trim())],
    ]],
    [3, "Management", [
      ["Structure", MANAGEMENT.find(([k]) => k === data.management)?.[1]],
      ["Owners", MEMBER_COUNTS.find(([k]) => k === data.memberCount)?.[1]],
      ...(isManagerManaged(data) ? [["Managers", data.managers.map((m) => m.trim()).join("\n")]] : []),
    ]],
    [4, "Owners", members.map((m, i) => [`Member ${i + 1}`, `${m.name.trim()}${m.email.trim() ? `\n${m.email.trim()}` : ""}\n${multi ? Number(m.percent) : 100}% ownership`])],
    [5, "Registered Agent", [
      ["Agent", AGENTS.find(([k]) => k === data.agent)?.[1]],
      ...(agentOwn ? [["Name", data.agentName.trim()], ["Address", addrLine(data.agentStreet.trim(), data.agentCity.trim(), data.state, data.agentZip.trim())], ["Email", data.agentEmail.trim() || "None"]] : []),
    ]],
    [6, "Contact", [
      ["Name", `${data.firstName} ${data.lastName}`.trim()], ["Email", data.email.trim()], ["Phone", data.phone.trim()],
      ["Preferred contact", data.contactMethod || "No preference"], ["Notes", data.notes.trim() || "None"],
    ]],
  ];

  const total = percentTotal(data);

  return (
    <div className="svc au gs llc">
      <Seo
        title={`Form Your LLC – Step ${n} of ${TOTAL}: ${S.label} | Leader Business Developer`}
        description="Start your LLC application online. Choose your name and state, add owners and a registered agent, and review everything before you submit."
        path={LLC_PATH}
        robots={n === 1 ? undefined : "noindex, nofollow"}
      />

      <div className="gs__wrap">
        <header className="gs-hero">
          <span className="au-eyebrow"><Building2 size={14} aria-hidden="true" />LLC application</span>
          <h1>Form your LLC in a few simple steps</h1>
          <p className="au-sub">Answer a few questions about your company. You can review everything before it goes to our team, and we'll handle the state filing.</p>
        </header>

        <Progress label="LLC application progress" steps={STEPS} n={n} reach={firstIncomplete(data)} onStep={go} />

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
                      id="llc-name" label={<>LLC Name <Req /></>} icon={<Briefcase size={18} />} placeholder="e.g. Northwind Studio LLC" maxLength={120}
                      autoComplete="organization" hint="Must end with LLC, L.L.C. or Limited Liability Company." error={err("name")} {...bind("name")}
                    />
                    <Field
                      id="llc-alt" label={<>Backup Name <Opt /></>} icon={<Tag size={18} />} placeholder="e.g. Northwind Creative LLC" maxLength={120}
                      autoComplete="off" hint="We'll use this if your first choice isn't available in your state." error={err("altName")} {...bind("altName")}
                    />
                    <Select
                      id="llc-state" label={<>State of Formation <Req /></>} icon={<MapPin size={18} />} placeholder="Select a state" options={US_STATES}
                      error={err("state")} hint="Most owners form in the state where they live and do business." {...bindSelect("state")}
                    />
                  </>
                )}

                {n === 2 && (
                  <>
                    <Select id="llc-purpose" label={<>Business Purpose <Req /></>} icon={<Briefcase size={18} />} placeholder="What does your business do?" options={PURPOSES} error={err("purpose")} {...bindSelect("purpose")} />
                    {data.purpose === "Other" && (
                      <Field id="llc-purpose-other" label={<>Describe Your Purpose <Req /></>} icon={<FileText size={18} />} maxLength={120} placeholder="e.g. Mobile app development" error={err("purposeOther")} {...bind("purposeOther")} />
                    )}
                    <div className={`au-field${err("description") ? " is-err" : ""}`}>
                      <div className="au-field__top">
                        <label htmlFor="llc-desc">Business Description <Opt /></label>
                        <span className="gs-count" aria-hidden="true">{data.description.length}/500</span>
                      </div>
                      <textarea id="llc-desc" className="gs-textarea" rows={4} maxLength={500} placeholder="A sentence or two about what your company will do." {...bind("description")} />
                    </div>

                    <h3 className="llc-sub">Principal business address</h3>
                    <Field id="llc-street" label={<>Street Address <Req /></>} icon={<MapPin size={18} />} autoComplete="address-line1" maxLength={120} error={err("street")} {...bind("street")} />
                    <Field id="llc-street2" label={<>Apt, Suite, Unit <Opt /></>} icon={<Building2 size={18} />} autoComplete="address-line2" maxLength={60} {...bind("street2")} />
                    <div className="llc-3col">
                      <Field id="llc-city" label={<>City <Req /></>} autoComplete="address-level2" maxLength={60} error={err("city")} {...bind("city")} />
                      <Select id="llc-bstate" label={<>State <Req /></>} icon={<MapPin size={18} />} placeholder="State" options={US_STATES} autoComplete="address-level1" error={err("bizState")} {...bindSelect("bizState")} />
                      <Field id="llc-zip" label={<>ZIP Code <Req /></>} autoComplete="postal-code" inputMode="numeric" maxLength={10} placeholder="78701" error={err("zip")} {...bind("zip")} />
                    </div>
                    <Checkbox id="llc-mail" name="mailingSame" checked={data.mailingSame} onChange={(e) => set("mailingSame", e.target.checked)}>
                      My mailing address is the same as my principal address.
                    </Checkbox>
                    {!data.mailingSame && (
                      <div className="llc-cond">
                        <h3 className="llc-sub">Mailing address</h3>
                        <Field id="llc-mstreet" label={<>Street Address / P.O. Box <Req /></>} icon={<MapPin size={18} />} maxLength={120} error={err("mStreet")} {...bind("mStreet")} />
                        <div className="llc-3col">
                          <Field id="llc-mcity" label={<>City <Req /></>} maxLength={60} error={err("mCity")} {...bind("mCity")} />
                          <Select id="llc-mstate" label={<>State <Req /></>} icon={<MapPin size={18} />} placeholder="State" options={US_STATES} error={err("mState")} {...bindSelect("mState")} />
                          <Field id="llc-mzip" label={<>ZIP Code <Req /></>} inputMode="numeric" maxLength={10} error={err("mZip")} {...bind("mZip")} />
                        </div>
                      </div>
                    )}
                  </>
                )}

                {n === 3 && (
                  <>
                    <Choices
                      name="management" legend="Management structure" options={MANAGEMENT} icons={OPT_ICONS} cols={1}
                      isOn={(v) => data.management === v} onToggle={(v) => { set("management", v); touch("management"); }} error={err("management")}
                    />
                    <Choices
                      name="memberCount" legend="Number of owners" options={MEMBER_COUNTS} icons={OPT_ICONS}
                      isOn={(v) => data.memberCount === v} onToggle={pickMemberCount} error={err("memberCount")}
                    />
                    {isManagerManaged(data) && (
                      <div className="llc-cond">
                        <h3 className="llc-sub">Managers</h3>
                        <p className="gs-muted llc-sub-note">Who will run the company? Managers can be owners or outside people.</p>
                        {data.managers.map((m, i) => (
                          <div className="llc-row" key={i}>
                            <Field
                              id={`llc-manager-${i}`} label={<>Manager {i + 1} full name <Req /></>} icon={<UserRound size={18} />} maxLength={80}
                              autoComplete="off" name={`manager${i}`} value={m} error={err(`manager${i}`)}
                              onChange={(e) => setManager(i, e.target.value)} onBlur={() => touch(`manager${i}`)}
                            />
                            {data.managers.length > 1 && (
                              <button type="button" className="llc-remove" onClick={() => setData((d) => ({ ...d, managers: d.managers.filter((_, j) => j !== i) }))} aria-label={`Remove manager ${i + 1}`}>
                                <Trash2 size={18} aria-hidden="true" />
                              </button>
                            )}
                          </div>
                        ))}
                        {data.managers.length < MAX_MANAGERS && (
                          <button type="button" className="llc-add" onClick={() => setData((d) => ({ ...d, managers: [...d.managers, ""] }))}><Plus size={16} aria-hidden="true" /> Add another manager</button>
                        )}
                      </div>
                    )}
                  </>
                )}

                {n === 4 && (
                  <>
                    {members.map((m, i) => (
                      <div className="llc-member" key={i} role="group" aria-label={`Member ${i + 1}`}>
                        <div className="llc-member__head">
                          <b>{multi ? `Member ${i + 1}` : "Owner"}</b>
                          {multi && members.length > 2 && (
                            <button type="button" className="llc-remove" onClick={() => removeMember(i)} aria-label={`Remove member ${i + 1}`}><Trash2 size={16} aria-hidden="true" /></button>
                          )}
                        </div>
                        <Field id={`llc-m${i}-name`} label={<>Full Name <Req /></>} icon={<UserRound size={18} />} maxLength={80} autoComplete="off" error={err(`member${i}Name`)} {...bindMember(i, "name", `member${i}Name`)} />
                        <div className={multi ? "llc-2col" : undefined}>
                          <Field
                            id={`llc-m${i}-email`} type="email" label={<>Email <Opt /></>} icon={<Mail size={18} />} autoCapitalize="none" spellCheck={false} autoComplete="off"
                            error={err(`member${i}Email`)} {...bindMember(i, "email", `member${i}Email`)}
                          />
                          {multi && (
                            <Field
                              id={`llc-m${i}-pct`} type="number" min="0" max="100" step="any" inputMode="decimal" label={<>Ownership % <Req /></>} icon={<Percent size={18} />}
                              error={err(`member${i}Percent`)} {...bindMember(i, "percent", `member${i}Percent`)}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                    {multi && (
                      <>
                        <div className="llc-tools">
                          {members.length < MAX_MEMBERS && <button type="button" className="llc-add" onClick={addMember}><Plus size={16} aria-hidden="true" /> Add member</button>}
                          <button type="button" className="llc-add llc-add--ghost" onClick={splitEvenly}>Split evenly</button>
                          <span className={`llc-total${Math.abs(total - 100) < 0.001 ? " is-ok" : ""}`} aria-live="polite">{+total.toFixed(2)}% of 100%</span>
                        </div>
                        <Msg id="llc-members-msg" error={err("members")} />
                      </>
                    )}
                    {!multi && <p className="gs-note"><Info size={16} aria-hidden="true" /><span>As the only member, you own 100% of the LLC.</span></p>}
                  </>
                )}

                {n === 5 && (
                  <>
                    <Choices
                      name="agent" legend="Registered agent" options={AGENTS} icons={OPT_ICONS} cols={1}
                      isOn={(v) => data.agent === v} onToggle={(v) => { set("agent", v); touch("agent"); }} error={err("agent")}
                    />
                    {data.agent === "ours" && (
                      <p className="gs-note"><ShieldCheck size={16} aria-hidden="true" /><span>We'll appoint a registered agent in <b>{data.state}</b> and forward any legal or government notices to you. Pricing is confirmed in your quote.</span></p>
                    )}
                    {agentOwn && (
                      <div className="llc-cond">
                        <h3 className="llc-sub">Agent details <small>(in {data.state})</small></h3>
                        <Field id="llc-agent-name" label={<>Agent Name or Company <Req /></>} icon={<UserRound size={18} />} maxLength={100} error={err("agentName")} {...bind("agentName")} />
                        <Field id="llc-agent-street" label={<>Street Address <Req /></>} icon={<MapPin size={18} />} maxLength={120} hint="Must be a physical address, not a P.O. box." error={err("agentStreet")} {...bind("agentStreet")} />
                        {data.agent === "own" && data.bizState === data.state && data.street.trim() && (
                          <button type="button" className="llc-add llc-add--ghost llc-fill" onClick={useBusinessAddress}>Use my business address</button>
                        )}
                        <div className="llc-2col">
                          <Field id="llc-agent-city" label={<>City <Req /></>} maxLength={60} error={err("agentCity")} {...bind("agentCity")} />
                          <Field id="llc-agent-zip" label={<>ZIP Code <Req /></>} inputMode="numeric" maxLength={10} error={err("agentZip")} {...bind("agentZip")} />
                        </div>
                        <Field
                          id="llc-agent-email" type="email" label={<>Agent Email <Opt /></>} icon={<Mail size={18} />} autoCapitalize="none" spellCheck={false}
                          error={err("agentEmail")} {...bind("agentEmail")}
                        />
                      </div>
                    )}
                  </>
                )}

                {n === 6 && (
                  <>
                    <div className="au-2col">
                      <Field id="llc-first" label={<>First Name <Req /></>} icon={<UserRound size={18} />} autoComplete="given-name" maxLength={60} error={err("firstName")} {...bind("firstName")} />
                      <Field id="llc-last" label={<>Last Name <Req /></>} icon={<UserRound size={18} />} autoComplete="family-name" maxLength={60} error={err("lastName")} {...bind("lastName")} />
                    </div>
                    <div className="au-2col">
                      <Field
                        id="llc-email" type="email" label={<>Email Address <Req /></>} icon={<Mail size={18} />} autoComplete="email" inputMode="email"
                        autoCapitalize="none" spellCheck={false} placeholder="name@company.com" error={err("email")} {...bind("email")}
                      />
                      <Field
                        id="llc-phone" type="tel" label={<>Phone <Req /></>} icon={<Phone size={18} />} autoComplete="tel" inputMode="tel"
                        placeholder="+1 (555) 123-4567" error={err("phone")} {...bind("phone")}
                      />
                    </div>
                    <Select id="llc-method" label={<>Preferred Contact Method <Opt /></>} icon={<MessageSquare size={18} />} placeholder="Select contact method" options={CONTACT_METHODS} {...bindSelect("contactMethod")} />
                    <div className="au-field">
                      <div className="au-field__top"><label htmlFor="llc-notes">Anything else we should know? <Opt /></label><span className="gs-count" aria-hidden="true">{data.notes.length}/500</span></div>
                      <textarea id="llc-notes" className="gs-textarea" rows={3} maxLength={500} {...bind("notes")} />
                    </div>
                  </>
                )}

                {n === 7 && (
                  <>
                    {review.map(([k, title, items]) => (
                      <section key={k} className="gs-rev" aria-labelledby={`llc-rev-${k}`}>
                        <header>
                          <h3 id={`llc-rev-${k}`}>{title}</h3>
                          <button type="button" onClick={() => go(k, "back")} className="gs-rev__edit" aria-label={`Edit ${title}`}><Pencil size={14} aria-hidden="true" /> Edit</button>
                        </header>
                        <dl>{items.map(([dt, dd]) => <div key={dt}><dt>{dt}</dt><dd>{dd}</dd></div>)}</dl>
                      </section>
                    ))}
                    <div className="gs-warn" role="note">
                      <ShieldAlert size={18} aria-hidden="true" />
                      <p><b>Keep sensitive data out.</b> Do not submit passwords, card details, SSNs, ITIN or passport numbers here. If we need them, we'll request them through a secure channel.</p>
                    </div>
                    <Checkbox id="llc-consent" name="consent" checked={data.consent} error={err("consent")} onChange={(e) => { set("consent", e.target.checked); touch("consent"); }}>
                      I confirm the information above is accurate and that Leader Business Developer may contact me about this application. I understand that state filing fees are separate and that name availability and approval are decided by the state.
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
                <button type="submit" className={`au-btn gs-next${valid ? "" : " is-off"}`} aria-disabled={!valid || undefined} aria-describedby="llc-next-hint" aria-busy={loading || undefined}>
                  {loading ? (
                    <><Loader2 size={18} className="au-spin" aria-hidden="true" />Submitting…</>
                  ) : n < TOTAL ? (
                    <>Continue<ArrowRight size={18} className="au-btn__arrow" aria-hidden="true" /></>
                  ) : (
                    <>Submit application<Check size={18} aria-hidden="true" /></>
                  )}
                </button>
              </div>
              <p id="llc-next-hint" className={`gs-hint${valid ? " is-hidden" : ""}`}>
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
