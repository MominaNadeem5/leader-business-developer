import { esc, fill } from "./forms";
import { US_STATES } from "../get-started/quoteData";

/* Shared building blocks for the guided legal-document questionnaires (see DocWizard.jsx).
   Field specs live here and in docConfigs.js; every field a user fills in is used by that document's generator. */

export const STATE_OPTIONS = US_STATES.map((s) => [s, s]);

export const PARTY_KINDS = [
  ["individual", "Individual"],
  ["llc", "LLC"],
  ["corp", "Corporation"],
  ["partnership", "Partnership"],
  ["other", "Other entity"],
];
const KIND_TEXT = {
  individual: "an individual",
  llc: "a limited liability company",
  corp: "a corporation",
  partnership: "a partnership",
  other: "an entity",
};
export const isEntity = (k) => Boolean(k) && k !== "individual";

/* ---------- formatting ---------- */
export const num = (s) => Number(String(s ?? "").replace(/[$,%\s,]/g, ""));
export const isBlank = (s) => String(s ?? "").trim() === "";
export const fmtDate = (iso) => (iso ? new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }) : "");
export const dateOrBlank = (iso) => (iso ? esc(fmtDate(iso)) : "____________");
export const usd = (s) => (isBlank(s) || !Number.isFinite(num(s)) ? "" : num(s).toLocaleString("en-US", { style: "currency", currency: "USD" }));
export const usdOrBlank = (s) => (usd(s) ? esc(usd(s)) : "$________");
export const todayIso = () => new Date().toISOString().slice(0, 10);
export const br = (s) => esc(s).replace(/\n/g, "<br>");

/* ---------- field helpers ---------- */
const ADDRESS_MSG = "Enter a full address with street, city and state.";
export const validAddress = (val) => (String(val).trim().length < 8 || !/\d/.test(val) ? ADDRESS_MSG : "");

/* The fields that identify one party to an agreement. p = key prefix ("a", "b", "provider"…), who = on-screen label */
export function partyFields(p, who) {
  return [
    { type: "heading", label: who },
    { name: `${p}Name`, label: "Full legal name", required: true, placeholder: "Bright Leaf LLC", help: "For a business, use the exact name on its registration, not a nickname." },
    { name: `${p}Kind`, label: "Type", type: "select", required: true, options: PARTY_KINDS, width: "half" },
    { name: `${p}Email`, label: "Email", type: "email", placeholder: "name@company.com", width: "half", help: "Optional. Used for notices if you add it." },
    { name: `${p}Address`, label: "Address", required: true, placeholder: "123 Main St, Austin, TX 78701", validate: validAddress },
    { name: `${p}Signer`, label: "Authorized signer", required: true, showIf: (v) => isEntity(v[`${p}Kind`]), placeholder: "Jane Doe", width: "half", help: "The person who signs for the business." },
    { name: `${p}Title`, label: "Signer's title", required: true, showIf: (v) => isEntity(v[`${p}Kind`]), placeholder: "Managing Member", width: "half" },
  ];
}

export const partyInit = (p) => ({ [`${p}Name`]: "", [`${p}Kind`]: "llc", [`${p}Email`]: "", [`${p}Address`]: "", [`${p}Signer`]: "", [`${p}Title`]: "" });

/* "<b>Name</b>, a limited liability company, of 123 Main St" */
export function partyText(v, p) {
  const addr = isBlank(v[`${p}Address`]) ? "" : `, of ${esc(v[`${p}Address`])}`;
  return `<b>${fill(v[`${p}Name`])}</b>, ${KIND_TEXT[v[`${p}Kind`]] || "a party"}${addr}`;
}

/* Name and title line for a signature block */
export function signerLine(v, p) {
  const name = isEntity(v[`${p}Kind`]) ? v[`${p}Signer`] : v[`${p}Name`];
  const title = isEntity(v[`${p}Kind`]) ? v[`${p}Title`] : "";
  return `${fill(name)}${title ? `, ${esc(title)}` : ""}`;
}

/* Signature table: parties = [[prefix, role label], ...] */
export function signatureTable(v, parties) {
  const date = v.signDate ? esc(fmtDate(v.signDate)) : "____________";
  return `<table><tr>${parties.map(([p, role]) => `<th>${esc(role)}: ${fill(v[`${p}Name`])}</th>`).join("")}</tr>
<tr>${parties.map(([p]) => `<td>Signature:<br><br>________________________<br>Name &amp; title: ${signerLine(v, p)}<br>Date: ${date}</td>`).join("")}</tr></table>`;
}

/* Optional notary acknowledgment block (not needed for most business agreements) */
export const notaryBlock = `<h2>Notary Acknowledgment (optional)</h2><p>State of ____________, County of ____________. On ____________ before me personally appeared the signer(s) named above, who proved their identity to me and acknowledged signing this document.</p><p>Notary public: ______________________ &nbsp; My commission expires: ____________ &nbsp; [Seal]</p>`;

export const YES_NO = [["yes", "Yes"], ["no", "No"]];

export const PAYMENT_METHODS = [["ach", "Bank transfer (ACH)"], ["wire", "Wire transfer"], ["check", "Check"], ["card", "Credit or debit card"], ["other", "Other (agreed in writing)"]];
export const methodsText = (list = []) => {
  const names = PAYMENT_METHODS.filter(([k]) => list.includes(k)).map(([, l]) => l.charAt(0).toLowerCase() + l.slice(1));
  return names.length ? names.join(", ").replace(/, ([^,]*)$/, " or $1") : "any method the parties agree in writing";
};

export const DISPUTE_OPTIONS = [
  ["mediation", "Talk first, then mediation"],
  ["arbitration", "Binding arbitration"],
  ["courts", "Go to court"],
];
/* Governing-law + dispute clause text. v.state, v.dispute, v.venue */
export function disputeClause(v) {
  const law = `This Agreement is governed by the laws of the State of ${fill(v.state)}.`;
  if (v.dispute === "arbitration") return `${law} Any dispute will be resolved by binding arbitration under the rules of a recognized arbitration provider agreed by the parties, in ${fill(v.venue, "a location agreed by the parties")}, after the parties first try in good faith to resolve it by negotiation.`;
  if (v.dispute === "courts") return `${law} The parties will first try to resolve any dispute by good-faith negotiation. If that fails, the courts located in ${fill(v.venue, `the State of ${v.state || "____________"}`)} will have jurisdiction.`;
  return `${law} The parties will first try to resolve any dispute by good-faith negotiation, then by mediation, before starting any legal action.`;
}
export const disputeFields = [
  { name: "state", label: "Governing state", type: "select", required: true, options: STATE_OPTIONS, width: "half", help: "The state whose law will apply. Rules and enforceability differ by state." },
  { name: "dispute", label: "If there is a dispute", type: "choice", required: true, options: DISPUTE_OPTIONS, width: "full" },
  { name: "venue", label: "Where disputes will be heard", required: true, showIf: (v) => v.dispute === "arbitration" || v.dispute === "courts", placeholder: "Travis County, Texas", help: "City, county or state." },
];
