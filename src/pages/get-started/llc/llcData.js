/* Data, validation and persistence for the 7-step LLC application (/get-started/llc). */
import { US_STATES } from "../quoteData";

export { US_STATES };
export const LLC_PATH = "/get-started/llc";

export const STEPS = [
  { key: "name", label: "Name & State", title: "Name your LLC and choose a state", sub: "Your LLC's legal name and the state where it will be formed." },
  { key: "business", label: "Business", title: "Tell us about your business", sub: "What your company does and where it operates." },
  { key: "management", label: "Management", title: "How will your LLC be managed?", sub: "This sets who makes decisions and signs on the company's behalf." },
  { key: "owners", label: "Owners", title: "Who owns the LLC?", sub: "List every member and the percentage each one owns." },
  { key: "agent", label: "Registered Agent", title: "Choose your registered agent", sub: "Every LLC needs a registered agent in its state to receive legal and tax notices." },
  { key: "contact", label: "Contact", title: "Who should we contact about this application?", sub: "We'll use these details to confirm your order and send updates." },
  { key: "review", label: "Review", title: "Review your LLC application", sub: "Check your answers, then submit your application to our team." },
];
export const TOTAL = STEPS.length;

export const PURPOSES = [
  "Consulting & professional services", "Ecommerce & retail", "Technology & software", "Food & hospitality", "Health & wellness",
  "Construction & trades", "Real estate", "Transportation & logistics", "Beauty & personal care", "Education & coaching",
  "Creative & media", "Finance & insurance", "Import & export", "Any lawful purpose (general)", "Other",
];
export const MANAGEMENT = [
  ["member", "Member-managed", "Owners run the business day to day. Most common for small LLCs."],
  ["manager", "Manager-managed", "Named managers run the business; some owners can stay passive."],
];
export const MEMBER_COUNTS = [
  ["single", "Single member", "One owner"],
  ["multi", "Multiple members", "Two or more owners"],
];
export const AGENTS = [
  ["ours", "Use Leader Business Developer", "We act as your agent. Your address stays off public records."],
  ["own", "I'll act as my own agent", "You need a physical address in the state and must be available during business hours."],
  ["other", "I already have a registered agent", "Enter the details of your existing agent or company."],
];
export const CONTACT_METHODS = ["Email", "Phone Call", "WhatsApp", "Video Meeting"];
export const MAX_MEMBERS = 10;
export const MAX_MANAGERS = 5;

export const blankMember = () => ({ name: "", email: "", percent: "" });
export const EMPTY = {
  name: "", altName: "", state: "",
  purpose: "", purposeOther: "", description: "",
  street: "", street2: "", city: "", bizState: "", zip: "", mailingSame: true,
  mStreet: "", mCity: "", mState: "", mZip: "",
  management: "", memberCount: "",
  managers: [""],
  members: [blankMember()],
  agent: "", agentName: "", agentStreet: "", agentCity: "", agentZip: "", agentEmail: "",
  firstName: "", lastName: "", email: "", phone: "", contactMethod: "", notes: "",
  consent: false,
};

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const ZIP_RE = /^\d{5}(-\d{4})?$/;
const DESIGNATOR_RE = /(\bllc\b|\bl\.l\.c\.?|\blimited liability company\b|\bltd\.? liability co\b)/i;
const norm = (s) => s.trim().replace(/\s+/g, " ").toLowerCase();

const NAME_RULE = "LLC names must include “LLC”, “L.L.C.” or “Limited Liability Company”.";
const checkName = (v, e, key, what) => {
  const t = v.trim();
  if (t.length < 3) e[key] = `Enter ${what} (at least 3 characters).`;
  else if (!DESIGNATOR_RE.test(t)) e[key] = NAME_RULE;
};
/* keys = { street, city, zip } field names in the form data */
export const checkAddress = (d, e, keys) => {
  if (!d[keys.street].trim()) e[keys.street] = "Enter a street address.";
  if (!d[keys.city].trim()) e[keys.city] = "Enter a city.";
  if (!d[keys.zip].trim()) e[keys.zip] = "Enter a ZIP code.";
  else if (!ZIP_RE.test(d[keys.zip].trim())) e[keys.zip] = "Enter a valid ZIP code, like 78701.";
};

export const isMulti = (d) => d.memberCount === "multi";
export const isManagerManaged = (d) => d.management === "manager";
export const percentTotal = (d) => d.members.reduce((sum, m) => sum + (Number(m.percent) || 0), 0);
export const visibleMembers = (d) => (isMulti(d) ? d.members : d.members.slice(0, 1));

export const VALIDATORS = [
  (d) => {
    const e = {};
    checkName(d.name, e, "name", "your LLC name");
    if (d.altName.trim()) {
      checkName(d.altName, e, "altName", "a backup name");
      if (!e.altName && norm(d.altName) === norm(d.name)) e.altName = "Your backup name must be different from your first choice.";
    }
    if (!d.state) e.state = "Select the state where you're forming your LLC.";
    return e;
  },
  (d) => {
    const e = {};
    if (!d.purpose) e.purpose = "Select the main purpose of your business.";
    if (d.purpose === "Other" && !d.purposeOther.trim()) e.purposeOther = "Describe your business purpose.";
    checkAddress(d, e, { street: "street", city: "city", zip: "zip" });
    if (!d.bizState) e.bizState = "Select a state.";
    if (!d.mailingSame) {
      checkAddress(d, e, { street: "mStreet", city: "mCity", zip: "mZip" });
      if (!d.mState) e.mState = "Select a state.";
    }
    return e;
  },
  (d) => {
    const e = {};
    if (!d.management) e.management = "Choose how your LLC will be managed.";
    if (!d.memberCount) e.memberCount = "Choose how many owners your LLC will have.";
    if (isManagerManaged(d)) {
      d.managers.forEach((m, i) => { if (!m.trim()) e[`manager${i}`] = "Enter the manager's full name."; });
    }
    return e;
  },
  (d) => {
    const e = {};
    const list = visibleMembers(d);
    list.forEach((m, i) => {
      if (m.name.trim().length < 2) e[`member${i}Name`] = "Enter the member's full name.";
      if (m.email.trim() && !EMAIL_RE.test(m.email.trim())) e[`member${i}Email`] = "Enter a valid email, like name@company.com.";
      if (isMulti(d)) {
        const p = Number(m.percent);
        if (m.percent === "") e[`member${i}Percent`] = "Enter a percentage.";
        else if (!(p > 0 && p <= 100)) e[`member${i}Percent`] = "Enter 1 to 100.";
      }
    });
    if (isMulti(d)) {
      if (list.length < 2) e.members = "Add at least two members for a multi-member LLC.";
      else if (!Object.keys(e).some((k) => k.endsWith("Percent")) && Math.abs(percentTotal(d) - 100) > 0.001) {
        e.members = `Ownership must add up to 100%. It currently totals ${+percentTotal(d).toFixed(2)}%.`;
      }
    }
    return e;
  },
  (d) => {
    const e = {};
    if (!d.agent) e.agent = "Choose a registered agent option.";
    if (d.agent === "own" || d.agent === "other") {
      if (d.agentName.trim().length < 2) e.agentName = "Enter the registered agent's full name or company.";
      checkAddress(d, e, { street: "agentStreet", city: "agentCity", zip: "agentZip" });
      if (d.agentEmail.trim() && !EMAIL_RE.test(d.agentEmail.trim())) e.agentEmail = "Enter a valid email, like name@company.com.";
    }
    return e;
  },
  (d) => {
    const e = {};
    if (!d.firstName.trim()) e.firstName = "Enter your first name.";
    if (!d.lastName.trim()) e.lastName = "Enter your last name.";
    if (!d.email.trim()) e.email = "Enter your email address.";
    else if (!EMAIL_RE.test(d.email.trim())) e.email = "Enter a valid email, like name@company.com.";
    const digits = d.phone.replace(/\D/g, "");
    if (!d.phone.trim()) e.phone = "Enter a phone number.";
    else if (digits.length < 7 || digits.length > 15 || /[^\d\s+()\-.]/.test(d.phone)) e.phone = "Enter a valid number, including country code if outside the U.S.";
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
const KEY = "lbd-llc-draft";
export function loadDraft() {
  try {
    const raw = sessionStorage.getItem(KEY);
    const saved = raw ? JSON.parse(raw) : {};
    return { ...EMPTY, ...saved, members: saved.members?.length ? saved.members : [blankMember()], managers: saved.managers?.length ? saved.managers : [""] };
  } catch {
    return { ...EMPTY, members: [blankMember()], managers: [""] };
  }
}
export function saveDraft(d) {
  try { sessionStorage.setItem(KEY, JSON.stringify(d)); } catch { /* storage blocked: answers still live in memory */ }
}
export function clearDraft() {
  try { sessionStorage.removeItem(KEY); } catch { /* ignore */ }
}

/* The payload sent to the backend: only what applies to the chosen options. */
export function toPayload(d) {
  const members = visibleMembers(d).map((m) => ({
    name: m.name.trim(), email: m.email.trim() || undefined, ownershipPercent: isMulti(d) ? Number(m.percent) : 100,
  }));
  const ownAgent = d.agent === "own" || d.agent === "other";
  return {
    type: "llc-formation",
    llc: { name: d.name.trim(), alternateName: d.altName.trim() || undefined, state: d.state },
    business: {
      purpose: d.purpose === "Other" ? d.purposeOther.trim() : d.purpose,
      description: d.description.trim() || undefined,
      principalAddress: { street: [d.street.trim(), d.street2.trim()].filter(Boolean).join(", "), city: d.city.trim(), state: d.bizState, zip: d.zip.trim() },
      mailingAddress: d.mailingSame ? undefined : { street: d.mStreet.trim(), city: d.mCity.trim(), state: d.mState, zip: d.mZip.trim() },
    },
    management: d.management,
    memberCount: d.memberCount,
    managers: isManagerManaged(d) ? d.managers.map((m) => m.trim()) : undefined,
    members,
    registeredAgent: ownAgent
      ? { option: d.agent, name: d.agentName.trim(), street: d.agentStreet.trim(), city: d.agentCity.trim(), state: d.state, zip: d.agentZip.trim(), email: d.agentEmail.trim() || undefined }
      : { option: d.agent },
    contact: {
      firstName: d.firstName.trim(), lastName: d.lastName.trim(), email: d.email.trim(), phone: d.phone.trim(),
      preferredMethod: d.contactMethod || undefined, notes: d.notes.trim() || undefined,
    },
    consent: d.consent,
  };
}

export const makeRef = () => `LLC-${Date.now().toString(36).slice(-4).toUpperCase()}${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
