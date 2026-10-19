/* Data, validation and persistence for the 7-step "Get Started" quote flow (/get-started/step-1 … step-7).
   Steps, fields and options follow the Request a Quote form step for step. */

export const BASE = "/get-started";
export const stepPath = (n) => `${BASE}/step-${n}`;
export const THANK_YOU_PATH = "/thank-you";

export const STEPS = [
  { key: "business", label: "Business", title: "Tell us about your business", sub: "A few basics so we can tailor the right solution." },
  { key: "location", label: "Location", title: "Where is your business located?", sub: "Requirements, fees and timelines depend on where you operate." },
  { key: "services", label: "Services", title: "What do you need help with?", sub: "Select every service you're interested in. You can choose more than one." },
  { key: "requirements", label: "Requirements", title: "Tell us what you're trying to achieve", sub: "The more detail you share, the more accurate your scope will be." },
  { key: "budget", label: "Budget & Scope", title: "What's your estimated service budget?", sub: "Pick the range that's closest. It only helps us size the scope." },
  { key: "contact", label: "Contact", title: "Who should we contact about this request?", sub: "We'll only use these details to reply about your quote." },
  { key: "review", label: "Review", title: "Review your quote request", sub: "Check your answers, then send your request to our team." },
];
export const TOTAL = STEPS.length;

export const STAGES = [
  ["new", "Starting New", "I'm setting up a new business"],
  ["existing", "Existing Business", "My business is already operating"],
];
export const ENTITIES = ["Not Sure Yet", "LLC", "Corporation", "S Corporation", "Partnership", "Sole Proprietorship", "Other"];
export const INDUSTRIES = [
  "Consulting & professional services", "Ecommerce & retail", "Technology & software", "Food & hospitality", "Health & wellness",
  "Construction & trades", "Real estate", "Transportation & logistics", "Beauty & personal care", "Education & coaching",
  "Creative & media", "Finance & insurance", "Import & export", "Nonprofit",
];

export const COUNTRIES = ["United States", "Pakistan", "Other / International"];
export const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida",
  "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts",
  "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
  "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
];
export const PK_REGIONS = [
  "Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan", "Islamabad Capital Territory", "Gilgit-Baltistan", "Azad Jammu & Kashmir",
];

export const SERVICES = [
  ["formation", "Business Formation", "LLC, corporation and formation support"],
  ["ein", "EIN / ITIN Assistance", "Application and documentation support"],
  ["tax", "Tax & Compliance", "Registration and filing assistance"],
  ["filings", "State Filings", "Amendments, records and filing support"],
  ["banking", "Banking Guidance", "Business account preparation guidance"],
  ["merchant", "Merchant Solutions", "Payment-provider setup guidance"],
  ["website", "Website & Ecommerce", "WordPress, Shopify, WooCommerce and more"],
  ["automation", "API / CRM / Automation", "Integrations, APIs and workflows"],
  ["branding", "Branding", "Logo, identity and digital business assets"],
  ["marketing", "Digital Marketing", "Online marketing support"],
  ["documents", "Document Support", "Administrative document preparation"],
  ["custom", "Custom / Other", "Tell us what you need"],
];
export const serviceName = (id) => SERVICES.find(([k]) => k === id)?.[1] || id;

export const TIMELINES = ["As Soon As Possible", "Within 1 Week", "Within 2 – 4 Weeks", "Within 1 – 3 Months", "Flexible / Not Sure"];
export const BUDGETS = [
  ["under-500", "Under $500", "Single filings and quick setups"],
  ["500-1500", "$500 – $1,500", "Formation plus a few add-ons"],
  ["1500-5000", "$1,500 – $5,000", "Multi-service launch packages"],
  ["5000-plus", "$5,000+", "Custom builds and integrations"],
  ["recommend", "Need Recommendation", "Let our team suggest a scope"],
];
export const budgetName = (id) => BUDGETS.find(([k]) => k === id)?.[1] || "";
export const CONTACT_METHODS = ["Email", "Phone Call", "WhatsApp", "Video Meeting"];

export const EMPTY = {
  businessName: "", stage: "", entity: "", industry: "",
  country: "", region: "",
  services: [],
  requirements: "", website: "", timeline: "",
  budget: "",
  firstName: "", lastName: "", email: "", phone: "", contactMethod: "",
  consent: false,
  ref: "",
};

/* ---------- validation: one function per step, returns { field: message } ---------- */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const URL_RE = /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i;
export const REQ_MIN = 20;
export const REQ_MAX = 2000;

export const VALIDATORS = [
  (d) => (d.stage ? {} : { stage: "Choose whether you're starting new or already operating." }),
  (d) => {
    const e = {};
    if (!d.country) e.country = "Select your country or region.";
    if (!d.region.trim()) e.region = d.country === "Other / International" ? "Enter your country and state or region." : "Select your state, province or region.";
    return e;
  },
  (d) => (d.services.length ? {} : { services: "Select at least one service." }),
  (d) => {
    const e = {};
    const len = d.requirements.trim().length;
    if (!len) e.requirements = "Describe what you need so we can scope it.";
    else if (len < REQ_MIN) e.requirements = `Add a little more detail (at least ${REQ_MIN} characters).`;
    if (d.website.trim() && !URL_RE.test(d.website.trim())) e.website = "Enter a valid web address, like yourbusiness.com.";
    return e;
  },
  (d) => (d.budget ? {} : { budget: "Choose the budget range that fits best." }),
  (d) => {
    const e = {};
    if (!d.firstName.trim()) e.firstName = "Enter your first name.";
    if (!d.lastName.trim()) e.lastName = "Enter your last name.";
    if (!d.email.trim()) e.email = "Enter your email address.";
    else if (!EMAIL_RE.test(d.email.trim())) e.email = "Enter a valid email, like name@company.com.";
    const digits = d.phone.replace(/\D/g, "");
    if (!d.phone.trim()) e.phone = "Enter a phone or WhatsApp number.";
    else if (digits.length < 7 || digits.length > 15 || /[^\d\s+()\-.]/.test(d.phone)) e.phone = "Enter a valid number, including country code if outside the U.S.";
    return e;
  },
  (d) => (d.consent ? {} : { consent: "Please confirm we may contact you about this request." }),
];

/* First step (1-based) whose answers are incomplete, or TOTAL + 1 if all are valid. */
export function firstIncomplete(d, upTo = TOTAL) {
  for (let i = 0; i < upTo; i++) if (Object.keys(VALIDATORS[i](d)).length) return i + 1;
  return upTo + 1;
}

/* ---------- persistence: answers survive reloads and back/forward within the tab ---------- */
const KEY = "lbd-quote-draft";
export function loadDraft() {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : { ...EMPTY };
  } catch {
    return { ...EMPTY };
  }
}
export function saveDraft(d) {
  try { sessionStorage.setItem(KEY, JSON.stringify(d)); } catch { /* storage blocked: answers still live in memory */ }
}
export function clearDraft() {
  try { sessionStorage.removeItem(KEY); } catch { /* ignore */ }
}

/* ---------- pre-fill from the "Get Started" buttons across the site (?service= / ?entity= / ?state=) ---------- */
const SERVICE_MAP = [
  [/^(itin|ein)$/, "ein"],
  [/compliance|business-license/, "tax"],
  [/annual-report|state-federal|registered-agent/, "filings"],
  [/merchant|^pos$|virtual-terminal|payment|gateway|provider-setup/, "merchant"],
  [/bank|account|checking|compare-accounts/, "banking"],
  [/dba|llc|corporation|operating-agreement|formation/, "formation"],
  [/api|crm|automation/, "automation"],
  [/website|wordpress|shopify|domain|maintenance|ecommerce|cart|product|inventory|shipping|marketplace|amazon/, "website"],
  [/brand|logo|profile|email-digital|trademark|copyright|patent/, "branding"],
  [/marketing|ads/, "marketing"],
  [/contract|nda|agreement|invoic|legal-form/, "documents"],
];
const pretty = (s) => s.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export function prefillFromParams(params, draft) {
  const next = { ...draft, services: [...draft.services] };
  const service = (params.get("service") || "").toLowerCase();
  const entity = (params.get("entity") || "").toLowerCase();
  const state = params.get("state") || "";

  if (service) {
    const id = SERVICE_MAP.find(([re]) => re.test(service))?.[1] || "custom";
    if (!next.services.includes(id)) next.services.push(id);
    next.ref = pretty(service);
  }
  if (entity) {
    const match = ENTITIES.find((e) => e.toLowerCase().replace(/\s/g, "") === entity.replace(/[-\s]/g, ""));
    if (match) next.entity = match;
    if (!next.services.includes("formation")) next.services.push("formation");
  }
  if (state && US_STATES.includes(state)) {
    next.country = "United States";
    next.region = state;
    if (!next.entity) next.entity = "LLC";
    if (!next.services.includes("formation")) next.services.push("formation");
  }
  return next;
}

/* Short, human-friendly reference shown on the confirmation screen. */
export const makeRef = () => `LBD-${Date.now().toString(36).slice(-4).toUpperCase()}${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
