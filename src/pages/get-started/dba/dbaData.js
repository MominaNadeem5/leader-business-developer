/* Data, validation and persistence for the 5-step DBA application (/get-started/dba). */
import { US_STATES } from "../quoteData";
import { PURPOSES, CONTACT_METHODS, EMAIL_RE, checkAddress } from "../llc/llcData";

export { US_STATES, PURPOSES, CONTACT_METHODS };
export const DBA_PATH = "/get-started/dba";
export const DBA_THANK_YOU_PATH = "/get-started/dba/thank-you";
export const HAS_API = Boolean(import.meta.env.VITE_API_URL);

export const STEPS = [
  { key: "name", label: "Business", title: "Choose your DBA name and state", sub: "The name customers will see, the state you're registering in, and the kind of business that owns it." },
  { key: "existing", label: "Legal Details", title: "Tell us about your existing business", sub: "A DBA is another name for a business that already exists, so we need its legal details." },
  { key: "owner", label: "Owner", title: "Who is the owner or representative?", sub: "The person we'll list on the registration, and how to reach them." },
  { key: "details", label: "DBA Details", title: "DBA registration details", sub: "What the business does under this name, where it operates, and anything your state asks for." },
  { key: "review", label: "Review", title: "Review your DBA application", sub: "Check your answers, then submit your application to our team." },
];
export const TOTAL = STEPS.length;

export const ENTITY_TYPES = [
  ["sole", "Sole proprietorship", "You own the business personally. No LLC or corporation."],
  ["partnership", "Partnership", "Two or more people own the business together."],
  ["llc", "LLC", "A limited liability company that's already formed."],
  ["corp", "Corporation", "A corporation (C corp or S corp) that's already formed."],
  ["other", "Other", "Nonprofit, trust or another type of organization."],
];
export const entityLabel = (id) => ENTITY_TYPES.find(([k]) => k === id)?.[1] || "";
export const isEntity = (d) => d.entity === "llc" || d.entity === "corp" || d.entity === "other";
export const isIndividual = (d) => d.entity === "sole" || d.entity === "partnership";

export const OWNERSHIP = [
  ["single", "Single owner", "One person or company owns it."],
  ["multiple", "Multiple owners", "Two or more owners."],
];
export const TITLES = {
  llc: ["Member", "Manager", "Authorized signer"],
  corp: ["President", "Officer", "Director", "Authorized signer"],
};
export const STARTED = [
  ["no", "Not yet", "I haven't used this name publicly."],
  ["yes", "Yes, already", "I've already been doing business under this name."],
];
export const MAX_PARTNERS = 10;

/* How each state handles a DBA. Only states we're sure about are listed; every other state
   falls back to a "we'll confirm" message instead of a guess.
   office: "state" | "county" | "mixed" (people file with the county, LLCs and corporations with the state) */
const STATE_RULES = {
  California: { term: "Fictitious Business Name", office: "county", publication: true },
  Florida: { term: "Fictitious Name", office: "state" },
  Texas: { term: "Assumed Name", office: "mixed" },
  "New York": { term: "Assumed Name", office: "mixed" },
  Illinois: { term: "Assumed Name", office: "mixed" },
  Washington: { term: "Trade Name", office: "state" },
  Arizona: { term: "Trade Name", office: "state" },
  Nevada: { term: "Fictitious Firm Name", office: "county" },
};

/* What we can say about filing a DBA in this state for this kind of business. */
export function filingInfo(state, entity) {
  const rule = STATE_RULES[state];
  if (!state) return { known: false, level: "unknown", term: "DBA", publication: false, text: "" };
  if (!rule) {
    return { known: false, level: "unknown", term: "DBA", publication: false, text: `Where and how a DBA is filed varies by state. We'll confirm the filing office, fees and any extra steps (such as newspaper publication) for ${state} before we file anything.` };
  }
  let level = rule.office;
  if (level === "mixed") level = entity === "sole" || entity === "partnership" ? "county" : entity === "llc" || entity === "corp" ? "state" : "unknown";
  const where = level === "state" ? "filed at the state level" : level === "county" ? "filed with the county clerk (or the equivalent county office)" : "filed with the state or the county, depending on your business type";
  const pub = rule.publication ? " A notice must also be published in a local newspaper after filing, which has its own fee." : "";
  return {
    known: true, level, term: rule.term, publication: Boolean(rule.publication),
    text: `In ${state}, a DBA is called “${rule.term}” and is ${where}.${pub} Rules change, so we confirm the current requirements before we file.`,
  };
}
export const countyRequired = (d) => filingInfo(d.state, d.entity).level === "county";

export const blankPartner = () => "";
export const EMPTY = {
  dbaName: "", altName: "", state: "", entity: "",
  legalName: "", formState: "", formId: "", ein: "",
  street: "", street2: "", city: "", bizState: "", zip: "",
  ownerName: "", ownerTitle: "", ownership: "", partners: ["", ""],
  mailingSame: true, mStreet: "", mCity: "", mState: "", mZip: "",
  email: "", phone: "", contactMethod: "",
  purpose: "", purposeOther: "", description: "",
  opSame: true, oStreet: "", oStreet2: "", oCity: "", oState: "", oZip: "", county: "",
  started: "", startDate: "",
  ubi: "", pubAck: false, notes: "",
  consent: false,
};

const norm = (s) => s.trim().replace(/\s+/g, " ").toLowerCase();
const NAME_CHARS = /[^\p{L}\p{N}&'.,\-! ]/u;
const IMPLIES_ENTITY = /(\bllc\b|\bl\.l\.c\b|\binc\b|\bincorporated\b|\bcorp\b|\bcorporation\b|\blimited\b|\bltd\b)/i;
const todayISO = () => new Date().toISOString().slice(0, 10);

/* Wording that changes with the business type. */
export const legalNameLabel = (d) => (d.entity === "sole" ? "Owner's full legal name" : d.entity === "partnership" ? "Partnership's legal name" : d.entity === "llc" ? "LLC's legal name" : d.entity === "corp" ? "Corporation's legal name" : "Legal name of the organization");
export const ownerNameLabel = (d) => (d.entity === "sole" ? "Owner's full name" : d.entity === "partnership" ? "Authorized partner's full name" : "Authorized representative's full name");

export const VALIDATORS = [
  (d) => {
    const e = {};
    const n = d.dbaName.trim();
    if (n.length < 2) e.dbaName = "Enter the DBA name you want to register (at least 2 characters).";
    else if (NAME_CHARS.test(n)) e.dbaName = "Use only letters, numbers and basic punctuation (& . , ' - !).";
    else if ((d.entity === "sole" || d.entity === "partnership") && IMPLIES_ENTITY.test(n)) e.dbaName = "A DBA for a sole proprietorship or partnership can't include words like LLC, Inc., Corp. or Limited.";
    if (d.altName.trim()) {
      if (NAME_CHARS.test(d.altName)) e.altName = "Use only letters, numbers and basic punctuation (& . , ' - !).";
      else if (norm(d.altName) === norm(d.dbaName)) e.altName = "Your backup name must be different from your first choice.";
    }
    if (!d.state) e.state = "Select the state where you're registering the DBA.";
    if (!d.entity) e.entity = "Choose the type of business that will use this DBA.";
    return e;
  },
  (d) => {
    const e = {};
    if (d.legalName.trim().length < 2) e.legalName = `Enter ${legalNameLabel(d).toLowerCase()}.`;
    else if (isEntity(d) && norm(d.legalName) === norm(d.dbaName)) e.legalName = "The DBA name must be different from the legal name. Otherwise you don't need a DBA.";
    if ((d.entity === "llc" || d.entity === "corp") && !d.formState) e.formState = "Select the state where it was formed.";
    if (d.ein.trim() && !/^\d{2}-?\d{7}$/.test(d.ein.trim())) e.ein = "An EIN has 9 digits, like 12-3456789. Don't enter a Social Security number.";
    checkAddress(d, e, { street: "street", city: "city", zip: "zip" });
    if (!d.bizState) e.bizState = "Select a state.";
    return e;
  },
  (d) => {
    const e = {};
    if (d.ownerName.trim().length < 2) e.ownerName = "Enter the full name.";
    if (d.entity === "llc" || d.entity === "corp") {
      if (!d.ownerTitle) e.ownerTitle = "Select this person's role.";
    }
    if (isEntity(d) && !d.ownership) e.ownership = "Choose how many owners there are.";
    if (d.entity === "partnership") {
      const names = d.partners.map((p) => p.trim());
      names.forEach((p, i) => { if (!p) e[`partner${i}`] = "Enter the partner's full name."; });
      if (names.length < 2) e.partners = "A partnership needs at least two partners.";
    }
    if (!d.mailingSame) {
      checkAddress(d, e, { street: "mStreet", city: "mCity", zip: "mZip" });
      if (!d.mState) e.mState = "Select a state.";
    }
    if (!d.email.trim()) e.email = "Enter an email address.";
    else if (!EMAIL_RE.test(d.email.trim())) e.email = "Enter a valid email, like name@company.com.";
    const digits = d.phone.replace(/\D/g, "");
    if (!d.phone.trim()) e.phone = "Enter a phone number.";
    else if (digits.length < 7 || digits.length > 15 || /[^\d\s+()\-.]/.test(d.phone)) e.phone = "Enter a valid number, including country code if outside the U.S.";
    return e;
  },
  (d) => {
    const e = {};
    if (!d.purpose) e.purpose = "Select what the business does under this name.";
    if (d.purpose === "Other" && !d.purposeOther.trim()) e.purposeOther = "Describe what the business does.";
    if (!d.opSame) {
      checkAddress(d, e, { street: "oStreet", city: "oCity", zip: "oZip" });
      if (!d.oState) e.oState = "Select a state.";
    }
    if (countyRequired(d) && !d.county.trim()) e.county = `${d.state} files DBAs at the county level. Enter the county where the business operates.`;
    if (!d.started) e.started = "Tell us whether you've already used this name.";
    if (d.started === "yes") {
      if (!d.startDate) e.startDate = "Enter the date you started using this name.";
      else if (d.startDate > todayISO()) e.startDate = "The start date can't be in the future.";
      else if (d.startDate < "1900-01-01") e.startDate = "Enter a valid date.";
    }
    if (filingInfo(d.state, d.entity).publication && !d.pubAck) e.pubAck = `${d.state} requires a newspaper notice. Please confirm you understand.`;
    return e;
  },
  (d) => (d.consent ? {} : { consent: "Please confirm the information is accurate and that we may contact you." }),
];

/* First step (1-based) whose answers are incomplete, or upTo + 1 if all are valid. */
export function firstIncomplete(d, upTo = TOTAL) {
  for (let i = 0; i < upTo; i++) if (Object.keys(VALIDATORS[i](d)).length) return i + 1;
  return upTo + 1;
}

/* Answers survive reloads within the tab. */
const KEY = "lbd-dba-draft";
const fresh = () => ({ ...EMPTY, partners: ["", ""] });
export function loadDraft() {
  try {
    const raw = sessionStorage.getItem(KEY);
    const saved = raw ? JSON.parse(raw) : {};
    return { ...fresh(), ...saved, partners: saved.partners?.length ? saved.partners : ["", ""] };
  } catch {
    return fresh();
  }
}
export function saveDraft(d) {
  try { sessionStorage.setItem(KEY, JSON.stringify(d)); } catch { /* storage blocked: answers still live in memory */ }
}
export function clearDraft() {
  try { sessionStorage.removeItem(KEY); } catch { /* ignore */ }
}
export const blankDraft = fresh;

const addr = (street, street2, city, state, zip) => ({ street: [street.trim(), street2.trim()].filter(Boolean).join(", "), city: city.trim(), state, zip: zip.trim() });

/* The payload sent to the backend: only what applies to the chosen options. */
export function toPayload(d) {
  const info = filingInfo(d.state, d.entity);
  return {
    type: "dba-registration",
    dba: { name: d.dbaName.trim(), alternateName: d.altName.trim() || undefined, state: d.state, startedUsing: d.started === "yes" ? d.startDate : undefined },
    filing: { term: info.term, level: info.level, publicationRequired: info.publication, county: d.county.trim() || undefined, ubi: d.state === "Washington" && d.ubi.trim() ? d.ubi.trim() : undefined },
    business: {
      entityType: d.entity,
      legalName: d.legalName.trim(),
      formationState: d.formState || undefined,
      entityNumber: d.formId.trim() || undefined,
      ein: d.ein.trim() || undefined,
      ownership: isEntity(d) ? d.ownership : undefined,
      address: addr(d.street, d.street2, d.city, d.bizState, d.zip),
      activity: d.purpose === "Other" ? d.purposeOther.trim() : d.purpose,
      description: d.description.trim() || undefined,
      operatingAddress: d.opSame ? undefined : addr(d.oStreet, d.oStreet2, d.oCity, d.oState, d.oZip),
    },
    owner: {
      name: d.ownerName.trim(),
      role: d.ownerTitle || undefined,
      partners: d.entity === "partnership" ? d.partners.map((p) => p.trim()) : undefined,
      mailingAddress: d.mailingSame ? undefined : addr(d.mStreet, "", d.mCity, d.mState, d.mZip),
      email: d.email.trim(),
      phone: d.phone.trim(),
      preferredMethod: d.contactMethod || undefined,
    },
    notes: d.notes.trim() || undefined,
    consent: d.consent,
  };
}

export const makeRef = () => `DBA-${Date.now().toString(36).slice(-4).toUpperCase()}${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
