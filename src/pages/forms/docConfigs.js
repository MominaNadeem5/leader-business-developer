import { esc, fill } from "./forms";
import {
  STATE_OPTIONS, YES_NO, PAYMENT_METHODS, partyFields, partyInit, partyText, signatureTable, notaryBlock, disputeFields, disputeClause,
  methodsText, num, isBlank, usd, usdOrBlank, dateOrBlank, fmtDate, br,
} from "./wizardKit";

/* Questionnaires for the four fillable agreements. Each `document(v)` uses every answer the steps collect,
   so the preview, the review summary and the downloaded Word file always agree. */

const numbered = (sections) => sections.filter(Boolean).map(([t, b], i) => `<h2>${i + 1}. ${esc(t)}</h2>${b}`).join("\n");
const days = (n) => `${esc(n)} day${String(n) === "1" ? "" : "s"}`;
const pct = (s) => `${esc(String(s).replace(/%/g, "").trim())}%`;
const slug = (s, fallback) => (String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || fallback);

const signStep = (extra = []) => ({
  id: "sign",
  title: "Signatures",
  intro: "Signature lines are added for each party. Print and sign, or sign electronically.",
  fields: [
    { name: "signDate", label: "Date of signing", type: "date", help: "Optional. Leave blank to write the date by hand when you sign." },
    ...extra,
    { name: "esign", label: "Electronic signatures", type: "check", checkLabel: "Allow electronic signatures and signing in separate counterparts", help: "Most e-signatures are valid for business agreements, but a few document types have exceptions." },
    { name: "notary", label: "Notary block", type: "check", checkLabel: "Add an optional notary acknowledgment block", help: "Not needed for most business agreements. Add it only if you or your attorney want the signatures notarized." },
  ],
});
const closing = (v, parties) => `${v.esign ? "<p>The parties may sign this Agreement electronically and in separate counterparts, each of which is an original and all of which together form one agreement.</p>" : ""}${signatureTable(v, parties)}${v.notary ? notaryBlock : ""}`;

/* =====================================================================
   BUSINESS CONTRACT
   ===================================================================== */
export const CONTRACT = {
  id: "contract",
  title: "Business Contract",
  initial: () => ({
    ...partyInit("a"), ...partyInit("b"),
    kind: "", scope: "", deliveryDate: "", deliveryTerms: "seller", inspectDays: "5",
    start: "", termType: "completion", end: "", renewTerm: "year", renewNotice: "30",
    price: "", basis: "fixed", unitName: "", schedule: "net", deposit: "", milestones: "", dueDays: "15", lateFee: "", methods: ["ach", "check"],
    warrantyDays: "30", cap: "paid", capAmount: "", confidentiality: true, noticeDays: "30", cureDays: "10", legalFees: "own",
    state: "", dispute: "mediation", venue: "", signDate: "", esign: true, notary: false,
  }),
  steps: [
    {
      id: "parties", title: "Parties", intro: "Who is making this agreement? Use legal names exactly as they appear on registrations or IDs.",
      fields: [...partyFields("a", "First party (seller or provider)"), ...partyFields("b", "Second party (buyer or client)")],
    },
    {
      id: "deal", title: "The deal", intro: "Describe what each side will deliver, and when the agreement starts and ends.",
      fields: [
        { name: "kind", label: "What is being provided?", type: "choice", required: true, options: [["goods", "Goods or products"], ["services", "Services"], ["both", "Both"]] },
        { name: "scope", label: "Describe the goods or services", type: "textarea", rows: 4, required: true, maxLength: 1500, placeholder: "500 branded gift boxes, 8x8 inch, matte black, delivered in two shipments", help: "Be specific: quantities, specifications, standards and deadlines prevent most disputes." },
        { type: "heading", label: "Delivery", showIf: (v) => v.kind === "goods" || v.kind === "both" },
        { name: "deliveryDate", label: "Delivery date", type: "date", required: true, showIf: (v) => v.kind === "goods" || v.kind === "both", width: "half", min: (v) => v.start || "", minMsg: "Delivery can't be before the start date." },
        { name: "inspectDays", label: "Days to inspect goods", type: "number", integer: true, min: 0, max: 60, required: true, showIf: (v) => v.kind === "goods" || v.kind === "both", width: "half", unit: "days", help: "How long the buyer has to report problems after delivery." },
        { name: "deliveryTerms", label: "Who arranges delivery?", type: "choice", required: true, showIf: (v) => v.kind === "goods" || v.kind === "both", options: [["seller", "Seller delivers"], ["pickup", "Buyer picks up"], ["carrier", "Shipped by carrier at buyer's cost"]] },
        { type: "heading", label: "Dates and duration" },
        { name: "start", label: "Effective date", type: "date", required: true, width: "half" },
        { name: "termType", label: "How long does it last?", type: "choice", required: true, options: [["completion", "Until the work is complete"], ["fixed", "Fixed end date"], ["ongoing", "Ongoing, renews automatically"]] },
        { name: "end", label: "End date", type: "date", required: true, showIf: (v) => v.termType === "fixed", width: "half", min: (v) => v.start || "", minMsg: "The end date must be after the effective date." },
        { name: "renewTerm", label: "Renews for", type: "choice", required: true, showIf: (v) => v.termType === "ongoing", options: [["month", "1 month at a time"], ["year", "1 year at a time"]] },
        { name: "renewNotice", label: "Days' notice to stop renewal", type: "number", integer: true, min: 1, max: 180, required: true, showIf: (v) => v.termType === "ongoing", width: "half", unit: "days" },
      ],
    },
    {
      id: "payment", title: "Price & payment", intro: "How much, how it is calculated and when it is paid. Amounts are in U.S. dollars.",
      fields: [
        { name: "basis", label: "How is the price set?", type: "choice", required: true, options: [["fixed", "Fixed total price"], ["unit", "Price per unit"], ["hourly", "Hourly rate"]] },
        { name: "price", label: (v) => (v.basis === "hourly" ? "Hourly rate" : v.basis === "unit" ? "Price per unit" : "Total price"), type: "money", required: true, min: 0.01, width: "half" },
        { name: "unitName", label: "What is one unit?", required: true, showIf: (v) => v.basis === "unit", placeholder: "gift box", width: "half" },
        { name: "schedule", label: "When is payment due?", type: "choice", required: true, options: [["full", "Paid in full up front"], ["deposit", "Deposit, then balance"], ["milestones", "Milestone payments"], ["net", "After invoice"]] },
        { name: "deposit", label: "Deposit amount", type: "money", required: true, min: 0.01, showIf: (v) => v.schedule === "deposit", width: "half", validate: (val, v) => (v.basis === "fixed" && !isBlank(v.price) && num(val) > num(v.price) ? "The deposit can't be more than the total price." : "") },
        { name: "milestones", label: "Milestones and amounts", type: "textarea", rows: 3, required: true, showIf: (v) => v.schedule === "milestones", placeholder: "Design approved: $2,000\nFirst shipment: $2,000\nFinal delivery: $2,000", help: "One per line: what triggers the payment and how much." },
        { name: "dueDays", label: "Invoices are due within", type: "number", integer: true, min: 1, max: 120, required: true, showIf: (v) => v.schedule !== "full", width: "half", unit: "days" },
        { name: "lateFee", label: "Late fee per month", type: "number", min: 0, max: 25, showIf: (v) => v.schedule !== "full", width: "half", unit: "%", help: "Optional. Limits on late fees and interest vary by state." },
        { name: "methods", label: "Accepted payment methods", type: "checks", required: true, options: PAYMENT_METHODS },
      ],
    },
    {
      id: "terms", title: "Protections & disputes", intro: "Standard protections. Choose how much risk each side takes and how problems get resolved.",
      fields: [
        { name: "warrantyDays", label: "Warranty period", type: "number", integer: true, min: 0, max: 365, required: true, unit: "days", width: "half", help: "How long work or goods are covered. Enter 0 for no stated warranty." },
        { name: "cap", label: "Limit on liability", type: "choice", required: true, options: [["paid", "Total amount paid under the contract"], ["fixed", "A fixed dollar amount"]] },
        { name: "capAmount", label: "Liability limit", type: "money", required: true, min: 1, showIf: (v) => v.cap === "fixed", width: "half" },
        { name: "confidentiality", label: "Confidentiality", type: "check", checkLabel: "Include a confidentiality clause for both parties" },
        { name: "noticeDays", label: "Days' notice to end the contract", type: "number", integer: true, min: 0, max: 180, required: true, unit: "days", width: "half", help: "Either party can end it with this notice." },
        { name: "cureDays", label: "Time to fix a serious breach", type: "number", integer: true, min: 0, max: 60, required: true, unit: "days", width: "half" },
        { name: "legalFees", label: "Legal fees if there is a dispute", type: "choice", required: true, options: [["own", "Each side pays its own"], ["prevail", "The losing side pays"]] },
        ...disputeFields,
      ],
    },
    signStep(),
  ],
  document(v) {
    const goods = v.kind === "goods" || v.kind === "both";
    const priceText = v.basis === "hourly" ? `${usdOrBlank(v.price)} per hour` : v.basis === "unit" ? `${usdOrBlank(v.price)} per ${fill(v.unitName, "unit")}` : usdOrBlank(v.price);
    const due = days(v.dueDays || "____");
    const lateFee = !isBlank(v.lateFee) && num(v.lateFee) > 0 ? ` Overdue amounts may incur a late fee of ${pct(v.lateFee)} per month, where permitted by law.` : "";
    const schedule = {
      full: "Payment is due in full before work or delivery begins.",
      deposit: `A deposit of ${usdOrBlank(v.deposit)} is due on signing and the balance is due within ${due} of invoice.`,
      milestones: `Payment is due in stages as follows (each invoiced when reached and due within ${due}):<br>${br(v.milestones)}`,
      net: `Invoices are due within ${due} of receipt.`,
    }[v.schedule];
    const termText = {
      completion: "This Agreement begins on the effective date and continues until each party has completed its obligations, unless ended earlier under the Termination section.",
      fixed: `This Agreement begins on the effective date and ends on ${dateOrBlank(v.end)}, unless ended earlier under the Termination section.`,
      ongoing: `This Agreement begins on the effective date and renews automatically for successive ${v.renewTerm === "month" ? "one-month" : "one-year"} terms unless either party gives written notice at least ${days(v.renewNotice)} before the current term ends.`,
    }[v.termType];
    const deliveryText = { seller: "Seller will deliver the goods to Buyer's address.", pickup: "Buyer will collect the goods from Seller.", carrier: "Seller will ship the goods by carrier at Buyer's cost." }[v.deliveryTerms];
    const cap = v.cap === "fixed" ? `${usdOrBlank(v.capAmount)}` : "the total amount paid under this Agreement";
    const sections = [
      ["Scope", `<p>${v.kind === "goods" ? "First Party will supply the following goods" : v.kind === "services" ? "First Party will provide the following services" : "First Party will supply the following goods and services"} to Second Party: ${br(v.scope)}</p>${goods ? `<p>Delivery is due by ${dateOrBlank(v.deliveryDate)}. ${deliveryText} Second Party has ${days(v.inspectDays)} after delivery to inspect the goods and notify First Party in writing of any defect or shortfall.</p>` : ""}`],
      ["Price and Payment", `<p>Second Party will pay First Party ${priceText}. ${schedule} Payments may be made by ${esc(methodsText(v.methods))}.${lateFee}</p>`],
      ["Term", `<p>${termText}</p>`],
      ["Warranties", `<p>Each party warrants that it has authority to enter into this Agreement. ${Number(v.warrantyDays) > 0 ? `First Party warrants that the ${({ goods: "goods", services: "services", both: "goods and services" })[v.kind]} will conform to the description in the Scope section for ${days(v.warrantyDays)} after ${goods ? "delivery" : "completion"}, and will repair, replace or refund any that do not.` : "No other warranty is stated in this Agreement."}</p>`],
      ["Limitation of Liability", `<p>Neither party is liable for indirect or consequential damages. Each party's total liability under this Agreement is limited to ${cap}.</p>`],
      v.confidentiality ? ["Confidentiality", "<p>Each party will keep the other's non-public business information confidential, use it only to perform this Agreement, and return or delete it on request.</p>"] : null,
      ["Termination", `<p>Either party may end this Agreement with ${days(v.noticeDays)}' written notice, or immediately if the other party materially breaches and does not fix the breach within ${days(v.cureDays)} of written notice. Amounts owed for work done or goods delivered before termination remain payable.</p>`],
      ["Governing Law and Disputes", `<p>${disputeClause(v)} ${v.legalFees === "prevail" ? "In any legal proceeding, the prevailing party may recover its reasonable legal fees and costs." : "Each party bears its own legal fees and costs."}</p>`],
      ["Entire Agreement", "<p>This is the entire agreement between the parties and replaces earlier discussions. Changes must be in writing and signed by both parties.</p>"],
    ];
    return {
      filename: `business-contract-${slug(v.aName, "draft")}.doc`,
      title: "Business Contract",
      html: `<h1>Business Contract</h1>
<p>This Business Contract ("Agreement") is made on ${dateOrBlank(v.start)} between ${partyText(v, "a")} ("First Party") and ${partyText(v, "b")} ("Second Party").</p>
${numbered(sections)}
${closing(v, [["a", "First Party"], ["b", "Second Party"]])}`,
    };
  },
};

/* =====================================================================
   NON-DISCLOSURE AGREEMENT
   ===================================================================== */
const NDA_CATEGORIES = [
  ["plans", "Business plans and strategy"], ["financial", "Financial information"], ["customers", "Customer and supplier lists"],
  ["technical", "Technical data and source code"], ["designs", "Product designs and prototypes"], ["pricing", "Pricing and costs"], ["marketing", "Marketing plans"],
];
const NDA_RELATIONS = [["business", "Business partner or vendor"], ["investor", "Investor or lender"], ["employee", "Employee"], ["contractor", "Contractor or consultant"], ["other", "Other"]];
const recipientIsWorker = (v) => v.relation === "employee" || v.relation === "contractor";

export const NDA = {
  id: "nda",
  title: "Non-Disclosure Agreement",
  initial: () => ({
    kind: "", ...partyInit("a"), ...partyInit("b"), discloser: "a", relation: "",
    purpose: "", start: "", scope: "broad", categories: [], other: "", sharing: true,
    years: "2", tradeSecrets: true, returnMethod: "either", injunctive: true, dtsa: true,
    state: "", dispute: "courts", venue: "", signDate: "", esign: true, notary: false,
  }),
  steps: [
    {
      id: "parties", title: "Type & parties", intro: "Choose who is sharing information. In a mutual NDA both sides protect each other's information.",
      fields: [
        { name: "kind", label: "Type of NDA", type: "choice", required: true, options: [["mutual", "Mutual (both sides share)"], ["one", "One-way (only one side shares)"]], help: "Not sure? Use mutual if both sides will exchange sensitive information." },
        ...partyFields("a", "First party"),
        ...partyFields("b", "Second party"),
        { name: "discloser", label: "Who is sharing the information?", type: "choice", required: true, showIf: (v) => v.kind === "one", options: [["a", "The first party"], ["b", "The second party"]], help: "The other party receives it and promises to keep it private." },
        { name: "relation", label: "What is the recipient's relationship to the sharer?", type: "select", required: true, options: NDA_RELATIONS },
      ],
    },
    {
      id: "scope", title: "What's protected", intro: "Define why information is being shared and what counts as confidential.",
      fields: [
        { name: "purpose", label: "Purpose of sharing", required: true, maxLength: 300, placeholder: "discuss a co-branded product launch", help: "Information may be used only for this purpose." },
        { name: "start", label: "Effective date", type: "date", required: true, width: "half" },
        { name: "scope", label: "What is confidential?", type: "choice", required: true, options: [["broad", "All non-public information shared"], ["marked", "Only information marked confidential"]], help: "Marked-only is narrower and easier to dispute, so use it only if you will label everything." },
        { name: "categories", label: "Examples to include", type: "checks", options: NDA_CATEGORIES, help: "Optional. Listing examples makes the definition clearer." },
        { name: "other", label: "Anything else to name", type: "textarea", rows: 2, maxLength: 400, placeholder: "the Orion prototype and related test results" },
        { name: "sharing", label: "Who else may see it", type: "check", checkLabel: "Allow the recipient to share it with employees, contractors and advisors who need to know it and are bound by confidentiality" },
      ],
    },
    {
      id: "terms", title: "Duration & remedies", intro: "How long the promise lasts and what happens when the information is no longer needed.",
      fields: [
        { name: "years", label: "Confidentiality period", type: "number", integer: true, min: 1, max: 10, required: true, unit: "years", width: "half", help: "How long after disclosure the information must stay private. Many NDAs use 1 to 5 years." },
        { name: "tradeSecrets", label: "Trade secrets", type: "check", checkLabel: "Keep trade secrets protected for as long as they remain trade secrets" },
        { name: "returnMethod", label: "When asked, the recipient will", type: "choice", required: true, options: [["return", "Return the information"], ["destroy", "Destroy the information"], ["either", "Return or destroy, at its choice"]] },
        { name: "injunctive", label: "Court orders", type: "check", checkLabel: "Allow the sharing party to ask a court to stop a leak (injunctive relief)" },
        { name: "dtsa", label: "Whistleblower notice", type: "check", showIf: recipientIsWorker, checkLabel: "Include the federal whistleblower-immunity notice (recommended for employees and contractors)" },
        ...disputeFields,
      ],
    },
    signStep(),
  ],
  document(v) {
    const mutual = v.kind === "mutual";
    const disc = v.discloser === "b" ? "b" : "a";
    const rec = disc === "a" ? "b" : "a";
    const roleA = mutual ? "" : v.discloser === "b" ? ' ("Receiving Party")' : ' ("Disclosing Party")';
    const roleB = mutual ? "" : v.discloser === "b" ? ' ("Disclosing Party")' : ' ("Receiving Party")';
    const who = mutual ? "each Party" : "the Receiving Party";
    const cats = NDA_CATEGORIES.filter(([k]) => v.categories.includes(k)).map(([, l]) => l.toLowerCase());
    if (!isBlank(v.other)) cats.push(esc(v.other.trim()));
    const sections = [
      ["Purpose", `<p>The parties wish to share information to ${fill(v.purpose)} (the "Purpose"). ${NDA_RELATIONS.find(([k]) => k === v.relation) ? `${mutual ? "The parties' relationship" : "The recipient's relationship to the sharing party"} is: ${esc(NDA_RELATIONS.find(([k]) => k === v.relation)[1].toLowerCase())}.` : ""}</p>`],
      ["Confidential Information", `<p>"Confidential Information" means non-public business, technical, financial or customer information disclosed ${mutual ? "by either Party" : "by the Disclosing Party"}, in any form, ${v.scope === "marked" ? "that is marked or identified as confidential at the time of disclosure" : "that is marked confidential or that a reasonable person would understand to be confidential"}.${cats.length ? ` It includes, for example: ${cats.join("; ")}.` : ""}</p>`],
      ["Exclusions", "<p>Confidential Information does not include information that: (a) is or becomes public through no fault of the recipient; (b) was already known to the recipient without restriction; (c) is independently developed without using the Confidential Information; or (d) is lawfully received from a third party without a duty of confidentiality.</p>"],
      ["Obligations", `<p>${mutual ? "Each Party" : "The Receiving Party"} will use Confidential Information only for the Purpose, protect it with at least reasonable care, and ${v.sharing ? "share it only with its employees, contractors and advisors who need to know it and are bound by duties of confidentiality at least as protective as this Agreement" : "not share it with anyone else without the discloser's written consent"}.</p>`],
      ["Required Disclosure", `<p>If disclosure is required by law or court order, ${who} will give prompt notice where legally allowed and disclose only what is required.</p>`],
      ["Term", `<p>Confidentiality obligations last ${esc(v.years)} year${String(v.years) === "1" ? "" : "s"} from the date of each disclosure${v.tradeSecrets ? ", except that obligations for trade secrets continue for as long as the information remains a trade secret under applicable law" : ""}.</p>`],
      ["Return of Information", `<p>On written request, ${who} will ${v.returnMethod === "return" ? "return" : v.returnMethod === "destroy" ? "destroy" : "return or destroy, at its choice,"} all Confidential Information and confirm this in writing.</p>`],
      ["No License", "<p>No ownership or license rights are granted, other than the limited right to use information for the Purpose.</p>"],
      v.injunctive ? ["Remedies", "<p>Unauthorized disclosure may cause harm that money cannot fix, so the disclosing party may ask a court for an order to stop it, in addition to other remedies.</p>"] : null,
      recipientIsWorker(v) && v.dtsa ? ["Whistleblower Immunity Notice", "<p>Under 18 U.S.C. § 1833(b), an individual will not be held liable under any federal or state trade secret law for disclosing a trade secret (a) in confidence to a government official or an attorney solely to report or investigate a suspected violation of law, or (b) in a complaint or other document filed under seal in a lawsuit or other proceeding.</p>"] : null,
      ["Governing Law and Disputes", `<p>${disputeClause(v)}</p>`],
    ];
    return {
      filename: `${mutual ? "mutual" : "one-way"}-nda-${slug(v.aName, "draft")}.doc`,
      title: "Non-Disclosure Agreement",
      html: `<h1>${mutual ? "Mutual " : ""}Non-Disclosure Agreement</h1>
<p>This Agreement is made on ${dateOrBlank(v.start)} between ${partyText(v, "a")}${roleA} and ${partyText(v, "b")}${roleB}${mutual ? ' (each a "Party")' : ""}.</p>
${numbered(sections)}
${closing(v, [["a", mutual ? "Party one" : disc === "a" ? "Disclosing Party" : "Receiving Party"], ["b", mutual ? "Party two" : rec === "b" ? "Receiving Party" : "Disclosing Party"]])}`,
    };
  },
};

/* =====================================================================
   PARTNERSHIP AGREEMENT
   ===================================================================== */
const PARTNER_TYPES = [["General Partnership", "General partnership"], ["Limited Partnership", "Limited partnership"], ["Limited Liability Partnership", "Limited liability partnership (LLP)"]];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const UNANIMOUS = [["admit", "Admitting a new partner"], ["sell", "Selling substantially all assets"], ["borrow", "Borrowing above a set amount"], ["amend", "Changing this agreement"], ["dissolve", "Dissolving the partnership"], ["purpose", "Changing the business purpose"]];
const isLP = (v) => v.type === "Limited Partnership";

export const PARTNERSHIP = {
  id: "partnership",
  title: "Partnership Agreement",
  initial: () => ({
    name: "", type: "", state: "", purpose: "", address: "", start: "", term: "indefinite", end: "",
    partners: [{ pName: "", pAddress: "", pRole: "general", pContribType: "cash", pContribution: "", pShare: "", pHours: "" }, { pName: "", pAddress: "", pRole: "general", pContribType: "cash", pContribution: "", pShare: "", pHours: "" }],
    alloc: "share", customAlloc: "", distributions: "quarterly", fiscalMonth: "December", pay: "none", payDetails: "", capitalCalls: "unanimous",
    vote: "share", unanimous: ["admit", "sell", "amend", "dissolve"], borrowLimit: "", manager: "", spendLimit: "", noncompete: true,
    withdrawNotice: "90", buyout: "appraisal", buyoutMonths: "12", death: "buy", rofr: true,
    dispute: "mediation", venue: "", signDate: "", notary: false,
  }),
  steps: [
    {
      id: "basics", title: "Partnership basics", intro: "The name, type and purpose of the partnership.",
      fields: [
        { name: "name", label: "Partnership name", required: true, placeholder: "Bright Leaf Partners", maxLength: 120 },
        { name: "type", label: "Partnership type", type: "choice", required: true, options: PARTNER_TYPES, help: "A limited partnership or LLP usually has to be registered with the state, so check your state's rules before relying on that structure. A general partnership forms by agreement." },
        { name: "state", label: "State", type: "select", required: true, options: STATE_OPTIONS, width: "half", help: "The state whose law governs the agreement." },
        { name: "start", label: "Effective date", type: "date", required: true, width: "half" },
        { name: "address", label: "Principal business address", required: true, placeholder: "123 Main St, Miami, FL 33101", validate: (val) => (String(val).trim().length < 8 || !/\d/.test(val) ? "Enter a full address with street, city and state." : "") },
        { name: "purpose", label: "Business purpose", type: "textarea", rows: 2, required: true, maxLength: 400, placeholder: "operate a specialty bakery and catering business" },
        { name: "term", label: "How long will it last?", type: "choice", required: true, options: [["indefinite", "No set end date"], ["fixed", "Fixed term"]] },
        { name: "end", label: "End date", type: "date", required: true, showIf: (v) => v.term === "fixed", width: "half", min: (v) => v.start || "", minMsg: "The end date must be after the effective date." },
      ],
    },
    {
      id: "partners", title: "Partners", intro: "Add every partner, what each contributes and each person's ownership share. Shares must total 100%.",
      fields: [
        {
          type: "group", name: "partners", label: "Partners", itemLabel: "Partner", addLabel: "Add another partner", min: 2, max: 6,
          item: [
            { name: "pName", label: "Full legal name", required: true, placeholder: "Alex Rivera", width: "half" },
            { name: "pRole", label: "Partner role", type: "select", required: true, default: "general", showIf: isLP, options: [["general", "General partner (manages, personally liable)"], ["limited", "Limited partner (investor)"]], width: "half" },
            { name: "pAddress", label: "Address", required: true, placeholder: "123 Main St, Miami, FL 33101", validate: (val) => (String(val).trim().length < 8 || !/\d/.test(val) ? "Enter a full address with street, city and state." : "") },
            { name: "pContribType", label: "Contributes", type: "select", required: true, default: "cash", options: [["cash", "Cash"], ["property", "Property or equipment"], ["services", "Services or skills"]], width: "half" },
            { name: "pContribution", label: "Value of contribution", type: "money", required: true, min: 0, width: "half" },
            { name: "pShare", label: "Ownership share", type: "number", required: true, min: 0.01, max: 100, unit: "%", width: "half" },
            { name: "pHours", label: "Hours per week", type: "number", min: 0, max: 80, unit: "hrs", width: "half", help: "Optional. The time the partner commits." },
          ],
          validate: (list, v) => {
            const total = list.reduce((a, p) => a + (Number.isFinite(num(p.pShare)) ? num(p.pShare) : 0), 0);
            if (list.every((p) => !isBlank(p.pShare)) && Math.abs(total - 100) > 0.01) return `Ownership shares total ${Math.round(total * 100) / 100}%. They must add up to exactly 100%.`;
            const names = list.map((p) => p.pName.trim().toLowerCase()).filter(Boolean);
            if (new Set(names).size !== names.length) return "Each partner needs a different name.";
            if (isLP(v) && list.every((p) => p.pRole && p.pName)) {
              if (!list.some((p) => p.pRole === "general")) return "A limited partnership needs at least one general partner.";
              if (!list.some((p) => p.pRole === "limited")) return "A limited partnership needs at least one limited partner.";
            }
            return "";
          },
        },
      ],
    },
    {
      id: "money", title: "Profits & money", intro: "How profits, losses and cash are shared.",
      fields: [
        { name: "alloc", label: "Profits and losses are shared", type: "choice", required: true, options: [["share", "By ownership share"], ["custom", "Another way"]] },
        { name: "customAlloc", label: "Describe the split", type: "textarea", rows: 2, required: true, showIf: (v) => v.alloc === "custom", maxLength: 400, placeholder: "60% to Alex Rivera and 40% to Sam Chen until costs are recovered, then 50/50" },
        { name: "distributions", label: "Profits are paid out", type: "select", required: true, options: [["monthly", "Monthly"], ["quarterly", "Quarterly"], ["annually", "Annually"], ["discretion", "When the partners decide"]], width: "half" },
        { name: "fiscalMonth", label: "Fiscal year ends in", type: "select", required: true, options: MONTHS.map((m) => [m, m]), width: "half" },
        { name: "pay", label: "Partner pay", type: "choice", required: true, options: [["none", "No salaries or guaranteed payments"], ["fixed", "Some partners receive a set payment"]] },
        { name: "payDetails", label: "Who is paid, how much and how often", type: "textarea", rows: 2, required: true, showIf: (v) => v.pay === "fixed", maxLength: 400, placeholder: "Sam Chen: $3,000 per month for managing day-to-day operations" },
        { name: "capitalCalls", label: "If more money is needed", type: "choice", required: true, options: [["unanimous", "Only if every partner agrees"], ["majority", "By majority vote"], ["none", "No extra contributions required"]] },
      ],
    },
    {
      id: "decisions", title: "Decisions & management", intro: "Who decides what, and the limits on a single partner's authority.",
      fields: [
        { name: "vote", label: "Everyday decisions need", type: "choice", required: true, options: [["share", "Majority by ownership share"], ["head", "Majority of partners (one vote each)"], ["unanimous", "Every partner's agreement"]] },
        { name: "unanimous", label: "These always need every partner's agreement", type: "checks", options: UNANIMOUS },
        { name: "borrowLimit", label: "Borrowing limit", type: "money", required: true, min: 1, showIf: (v) => v.unanimous.includes("borrow"), width: "half", help: "Borrowing above this amount needs every partner's agreement." },
        { name: "manager", label: "Managing partner", placeholder: "Sam Chen", maxLength: 120, width: "half", help: "Optional. Runs day-to-day operations." },
        { name: "spendLimit", label: "Single-partner spending limit", type: "money", min: 0, width: "half", help: "Optional. A partner may commit the partnership up to this amount alone." },
        { name: "noncompete", label: "Competing businesses", type: "check", checkLabel: "Partners will not run a competing business while they are partners" },
      ],
    },
    {
      id: "exit", title: "Leaving & disputes", intro: "What happens when a partner leaves, dies or the partners disagree.",
      fields: [
        { name: "withdrawNotice", label: "Notice to withdraw", type: "number", integer: true, min: 0, max: 365, required: true, unit: "days", width: "half" },
        { name: "buyout", label: "A leaving partner's share is valued by", type: "select", required: true, options: [["appraisal", "Independent appraisal"], ["agreed", "Agreed annual value"], ["book", "Book value"]], width: "half" },
        { name: "buyoutMonths", label: "Buyout is paid over", type: "number", integer: true, min: 1, max: 60, required: true, unit: "months", width: "half" },
        { name: "death", label: "If a partner dies or becomes disabled", type: "choice", required: true, options: [["buy", "Remaining partners may buy the share"], ["estate", "Their estate receives its value"], ["dissolve", "The partnership ends"]] },
        { name: "rofr", label: "Selling a share", type: "check", checkLabel: "A partner must first offer a share to the other partners before selling it to an outsider" },
        ...disputeFields.filter((f) => f.name !== "state"),
      ],
    },
    { ...signStep(), fields: signStep().fields.filter((f) => f.name !== "esign") },
  ],
  document(v) {
    const partners = v.partners.filter((p) => !isBlank(p.pName));
    const rows = (partners.length ? partners : [{}, {}]);
    const lp = isLP(v);
    const unanimousTexts = UNANIMOUS.filter(([k]) => v.unanimous.includes(k)).map(([k, l]) => (k === "borrow" ? `borrowing more than ${usdOrBlank(v.borrowLimit)}` : l.charAt(0).toLowerCase() + l.slice(1)));
    const sections = [
      ["Purpose", `<p>The Partnership will ${fill(v.purpose)}. Its principal place of business is ${fill(v.address)}. The Partnership begins on ${dateOrBlank(v.start)} and ${v.term === "fixed" ? `ends on ${dateOrBlank(v.end)}, unless extended in writing or ended earlier under this Agreement` : "continues until it is dissolved under this Agreement"}.</p>`],
      ["Partners and Capital Contributions", `<table><tr><th>Partner</th>${lp ? "<th>Role</th>" : ""}<th>Contribution</th><th>Ownership</th><th>Time commitment</th></tr>${rows.map((p) => `<tr><td>${fill(p.pName)}${p.pAddress ? `<br><small>${esc(p.pAddress)}</small>` : ""}</td>${lp ? `<td>${p.pRole === "limited" ? "Limited partner" : "General partner"}</td>` : ""}<td>${p.pContribution ? `${esc(usd(p.pContribution))} (${esc(({ cash: "cash", property: "property or equipment", services: "services" })[p.pContribType] || "")})` : "$________"}</td><td>${p.pShare ? `${esc(String(p.pShare).replace(/%/g, ""))}%` : "____%"}</td><td>${p.pHours ? `${esc(p.pHours)} hrs/week` : "As needed"}</td></tr>`).join("")}</table>${lp ? "<p>General partners manage the business and are personally liable for its obligations. Limited partners are passive investors and do not take part in management.</p>" : ""}`],
      ["Profits, Losses and Distributions", `<p>Profits and losses will be shared ${v.alloc === "custom" ? esc(v.customAlloc) : "in proportion to each partner's ownership percentage"}. Profits will be distributed ${({ monthly: "monthly", quarterly: "quarterly", annually: "annually", discretion: "when the partners decide" })[v.distributions]}. The fiscal year ends in ${esc(v.fiscalMonth)}. ${v.pay === "fixed" ? `The following partner payments apply: ${br(v.payDetails)}` : "No partner receives a salary or guaranteed payment unless agreed in writing."}</p><p>${({ unanimous: "Additional capital contributions require every partner's agreement.", majority: "Additional capital contributions may be required by majority vote.", none: "No partner is required to contribute more than the amounts above." })[v.capitalCalls]}</p>`],
      ["Management and Voting", `<p>Everyday decisions require ${({ share: "a majority by ownership percentage", head: "a majority of the partners, each with one vote", unanimous: "the agreement of every partner" })[v.vote]}. ${unanimousTexts.length ? `The agreement of every partner is required for: ${unanimousTexts.join("; ")}.` : ""} ${isBlank(v.manager) ? "" : `${esc(v.manager)} will manage day-to-day operations.`} ${isBlank(v.spendLimit) ? "" : `Any single partner may commit the Partnership to expenses of up to ${usdOrBlank(v.spendLimit)}; larger commitments need approval under this section.`} ${v.noncompete ? "While a partner, no partner will own or operate a business that competes with the Partnership without the other partners' written consent." : ""}</p>`],
      ["Withdrawal, Death or Disability", `<p>A partner may withdraw with ${days(v.withdrawNotice)}' written notice. The departing partner's interest will be valued by ${({ appraisal: "independent appraisal", agreed: "the agreed annual value", book: "book value" })[v.buyout]} and, if purchased, paid over ${esc(v.buyoutMonths)} month${String(v.buyoutMonths) === "1" ? "" : "s"}. ${({ buy: "If a partner dies or becomes unable to act, the remaining partners may buy that partner's interest on the same terms.", estate: "If a partner dies, that partner's estate will receive the value of the interest, determined in the same way.", dissolve: "If a partner dies or becomes unable to act, the Partnership dissolves unless the remaining partners agree otherwise in writing." })[v.death]} ${v.rofr ? "Before selling an interest to an outsider, a partner must first offer it to the other partners on the same terms." : ""}</p>`],
      ["Governing Law and Disputes", `<p>${disputeClause(v)}</p>`],
      ["Dissolution", "<p>On dissolution, the Partnership's assets will be used to pay its debts and expenses, then returned to the partners according to their capital accounts and ownership percentages.</p>"],
    ];
    return {
      filename: `partnership-agreement-${slug(v.name, "draft")}.doc`,
      title: "Partnership Agreement",
      html: `<h1>Partnership Agreement</h1>
<p>This Partnership Agreement is made on ${dateOrBlank(v.start)} by the partners named below to form a ${esc(v.type || "partnership").toLowerCase()} called <b>${fill(v.name)}</b> (the "Partnership") under the laws of the State of ${fill(v.state)}.</p>
${numbered(sections)}
<h2>Signatures</h2>
<table>${rows.map((p) => `<tr><td>${fill(p.pName)}${lp && p.pRole ? ` (${p.pRole === "limited" ? "limited" : "general"} partner)` : ""}</td><td>Signature: ____________________</td><td>Date: ${v.signDate ? esc(fmtDate(v.signDate)) : "____________"}</td></tr>`).join("")}</table>
${v.notary ? notaryBlock : ""}`,
    };
  },
};

/* =====================================================================
   SERVICE AGREEMENT
   ===================================================================== */
const SERVICE_MODELS = [["fixed", "Fixed-price project"], ["hourly", "Hourly"], ["retainer", "Monthly retainer"]];

export const SERVICE = {
  id: "service",
  title: "Service Agreement",
  initial: () => ({
    ...partyInit("a"), ...partyInit("b"),
    model: "", service: "", deliverables: "", outOfScope: "", location: "remote", siteAddress: "", start: "", deadline: "", retainerMonths: "6",
    revisions: "2", acceptDays: "5", clientDuties: "", changeOrders: true,
    fee: "", deposit: "", payPlan: "completion", milestones: [{ mName: "", mAmount: "", mDue: "" }], rate: "", hoursCap: "", billing: "monthly",
    retainerFee: "", hoursIncluded: "", expenses: "client", dueDays: "15", lateFee: "", cancelFee: "",
    ip: "client", portfolio: "yes", confidentiality: true, cap: "fees", capAmount: "", noticeDays: "14",
    state: "", dispute: "mediation", venue: "", signDate: "", esign: true, notary: false,
  }),
  steps: [
    {
      id: "parties", title: "Parties", intro: "Who is providing the services and who is paying for them.",
      fields: [...partyFields("a", "Service provider"), ...partyFields("b", "Client")],
    },
    {
      id: "scope", title: "Services & timeline", intro: "What will be done, what is included and when.",
      fields: [
        { name: "model", label: "How is the work priced?", type: "choice", required: true, options: SERVICE_MODELS },
        { name: "service", label: "Services to be performed", type: "textarea", rows: 3, required: true, maxLength: 1200, placeholder: "Design and build a 5-page marketing website", help: "Describe the work in plain terms." },
        { name: "deliverables", label: "Deliverables", type: "textarea", rows: 3, required: true, maxLength: 1200, placeholder: "Homepage, About, Services, Pricing and Contact pages; source files; launch support", help: "List what the client will receive. One item per line works well." },
        { name: "outOfScope", label: "Not included", type: "textarea", rows: 2, maxLength: 800, placeholder: "Copywriting, photography, hosting fees", help: "Optional, but it prevents disputes about extra work." },
        { name: "location", label: "Where is the work done?", type: "choice", required: true, options: [["remote", "Remotely"], ["onsite", "At the client's location"], ["hybrid", "Both"]] },
        { name: "siteAddress", label: "Work location address", required: true, showIf: (v) => v.location !== "remote", placeholder: "123 Main St, Denver, CO 80202" },
        { type: "heading", label: "Dates" },
        { name: "start", label: "Start date", type: "date", required: true, width: "half" },
        { name: "deadline", label: "Completion date", type: "date", required: true, showIf: (v) => v.model !== "retainer", width: "half", min: (v) => v.start || "", minMsg: "The completion date must be after the start date." },
        { name: "retainerMonths", label: "Retainer length", type: "number", integer: true, min: 1, max: 36, required: true, showIf: (v) => v.model === "retainer", unit: "months", width: "half" },
        { type: "heading", label: "Reviews and changes" },
        { name: "revisions", label: "Rounds of revisions included", type: "number", integer: true, min: 0, max: 20, required: true, showIf: (v) => v.model === "fixed", width: "half" },
        { name: "acceptDays", label: "Client review time per delivery", type: "number", integer: true, min: 1, max: 30, required: true, showIf: (v) => v.model === "fixed", unit: "business days", width: "half", help: "If the client does not respond in this time, the work counts as approved." },
        { name: "clientDuties", label: "What the client must provide", type: "textarea", rows: 2, maxLength: 600, placeholder: "Logo files, brand guidelines and content by the start date" },
        { name: "changeOrders", label: "Extra work", type: "check", checkLabel: "Work outside the scope needs a written change order signed by both parties" },
      ],
    },
    {
      id: "fees", title: "Fees & payment", intro: "What the client pays and when. Amounts are in U.S. dollars.",
      fields: [
        { name: "fee", label: "Total project fee", type: "money", required: true, min: 0.01, showIf: (v) => v.model === "fixed", width: "half" },
        { name: "deposit", label: "Deposit due before work starts", type: "money", min: 0, showIf: (v) => v.model === "fixed", width: "half", help: "Optional.", validate: (val, v) => (!isBlank(v.fee) && num(val) > num(v.fee) ? "The deposit can't be more than the total fee." : "") },
        { name: "payPlan", label: "Remaining balance is paid", type: "choice", required: true, showIf: (v) => v.model === "fixed", options: [["completion", "On completion"], ["milestones", "In milestone payments"]] },
        {
          type: "group", name: "milestones", label: "Milestones", itemLabel: "Milestone", addLabel: "Add a milestone", min: 1, max: 8, showIf: (v) => v.model === "fixed" && v.payPlan === "milestones",
          item: [
            { name: "mName", label: "Milestone", required: true, placeholder: "Design approved", width: "half" },
            { name: "mAmount", label: "Amount", type: "money", required: true, min: 0.01, width: "half" },
            { name: "mDue", label: "Due date", type: "date", required: true, width: "half", help: "When the payment is due." },
          ],
          validate: (list, v) => {
            if (isBlank(v.fee) || list.some((m) => isBlank(m.mAmount))) return "";
            const sum = list.reduce((a, m) => a + num(m.mAmount), 0) + (isBlank(v.deposit) ? 0 : num(v.deposit));
            return Math.abs(sum - num(v.fee)) > 0.009 ? `Milestones${isBlank(v.deposit) ? "" : " plus the deposit"} total ${usd(sum)}, but the project fee is ${usd(v.fee)}. They must match.` : "";
          },
        },
        { name: "rate", label: "Hourly rate", type: "money", required: true, min: 0.01, showIf: (v) => v.model === "hourly", width: "half" },
        { name: "hoursCap", label: "Maximum hours without approval", type: "number", min: 1, showIf: (v) => v.model === "hourly", unit: "hours", width: "half", help: "Optional. The client must approve any hours beyond this." },
        { name: "billing", label: "Invoiced", type: "select", required: true, showIf: (v) => v.model === "hourly", options: [["weekly", "Weekly"], ["biweekly", "Every two weeks"], ["monthly", "Monthly"]], width: "half" },
        { name: "retainerFee", label: "Monthly retainer", type: "money", required: true, min: 0.01, showIf: (v) => v.model === "retainer", width: "half" },
        { name: "hoursIncluded", label: "Hours included each month", type: "number", min: 1, showIf: (v) => v.model === "retainer", unit: "hours", width: "half", help: "Optional. Leave blank if the retainer covers an agreed scope instead." },
        { name: "expenses", label: "Expenses", type: "choice", required: true, options: [["client", "Client reimburses pre-approved expenses"], ["included", "Expenses are included in the fee"]] },
        { name: "dueDays", label: "Invoices are due within", type: "number", integer: true, min: 1, max: 120, required: true, unit: "days", width: "half" },
        { name: "lateFee", label: "Late fee per month", type: "number", min: 0, max: 25, unit: "%", width: "half", help: "Optional. Limits on late fees vary by state." },
        { name: "cancelFee", label: "Cancellation fee", type: "number", min: 0, max: 100, showIf: (v) => v.model === "fixed", unit: "%", width: "half", help: "Optional. A share of the unpaid fee owed if the client cancels." },
      ],
    },
    {
      id: "legal", title: "Ownership & legal terms", intro: "Who owns the work and how the relationship can end.",
      fields: [
        { name: "ip", label: "Who owns the final work?", type: "choice", required: true, options: [["client", "Client, once paid in full"], ["provider", "Provider keeps it and licenses it to the client"]] },
        { name: "portfolio", label: "May the provider show the work in a portfolio?", type: "choice", required: true, options: YES_NO },
        { name: "confidentiality", label: "Confidentiality", type: "check", checkLabel: "Include a confidentiality clause for both parties" },
        { name: "cap", label: "Limit on the provider's liability", type: "choice", required: true, options: [["fees", "Fees paid under the agreement"], ["fixed", "A fixed dollar amount"]] },
        { name: "capAmount", label: "Liability limit", type: "money", required: true, min: 1, showIf: (v) => v.cap === "fixed", width: "half" },
        { name: "noticeDays", label: "Days' notice to end the agreement", type: "number", integer: true, min: 0, max: 180, required: true, unit: "days", width: "half" },
        ...disputeFields,
      ],
    },
    signStep(),
  ],
  document(v) {
    const fixed = v.model === "fixed";
    const due = days(v.dueDays || "____");
    const where = v.location === "remote" ? "The services will be performed remotely." : `The services will be performed ${v.location === "hybrid" ? "remotely and " : ""}at ${fill(v.siteAddress)}.`;
    const fees = fixed
      ? `<p>Client will pay a total fee of ${usdOrBlank(v.fee)}.${isBlank(v.deposit) || num(v.deposit) <= 0 ? "" : ` A non-refundable deposit of ${usdOrBlank(v.deposit)} is due before work begins and is credited against the fee.`} ${v.payPlan === "milestones" ? `The balance is payable in milestones:</p><table><tr><th>Milestone</th><th>Amount</th><th>Due</th></tr>${v.milestones.map((m) => `<tr><td>${fill(m.mName)}</td><td>${usdOrBlank(m.mAmount)}</td><td>${dateOrBlank(m.mDue)}</td></tr>`).join("")}</table><p>` : "The balance is due on completion. "}Invoices are due within ${due}.`
      : v.model === "hourly"
        ? `<p>Client will pay ${usdOrBlank(v.rate)} per hour for time spent on the services, invoiced ${({ weekly: "weekly", biweekly: "every two weeks", monthly: "monthly" })[v.billing]}.${isBlank(v.hoursCap) ? "" : ` Provider will not work more than ${esc(v.hoursCap)} hours without Client's written approval.`} Invoices are due within ${due}.`
        : `<p>Client will pay a retainer of ${usdOrBlank(v.retainerFee)} per month for ${esc(v.retainerMonths)} month${String(v.retainerMonths) === "1" ? "" : "s"}, invoiced in advance.${isBlank(v.hoursIncluded) ? "" : ` The retainer includes up to ${esc(v.hoursIncluded)} hours each month; additional time needs Client's written approval.`} Invoices are due within ${due}.`;
    const lateFee = !isBlank(v.lateFee) && num(v.lateFee) > 0 ? ` Overdue amounts may incur a late fee of ${pct(v.lateFee)} per month, where permitted by law.` : "";
    const sections = [
      ["Services and Scope", `<p>Provider will perform the following services: ${br(v.service)}</p><p>Deliverables: ${br(v.deliverables)}</p><p>Not included: ${isBlank(v.outOfScope) ? "anything not listed above" : br(v.outOfScope)}. ${v.changeOrders ? "Additional work requires a written change order signed by both parties." : ""} ${where}</p>${isBlank(v.clientDuties) ? "" : `<p>Client will provide: ${br(v.clientDuties)}</p>`}`],
      ["Schedule", `<p>Work begins on ${dateOrBlank(v.start)}${v.model === "retainer" ? ` and continues for ${esc(v.retainerMonths)} month${String(v.retainerMonths) === "1" ? "" : "s"}` : ` and is due to be completed by ${dateOrBlank(v.deadline)}`}, subject to Client providing the items above on time.</p>`],
      fixed ? ["Review and Acceptance", `<p>The fee includes ${esc(v.revisions)} round${String(v.revisions) === "1" ? "" : "s"} of revisions. Client will approve each delivery or request changes within ${esc(v.acceptDays)} business day${String(v.acceptDays) === "1" ? "" : "s"}; no response counts as approval.</p>`] : null,
      ["Fees and Payment", `${fees}${lateFee} ${v.expenses === "client" ? "Client will reimburse reasonable expenses approved in advance." : "Expenses are included in the fees above."}</p>`],
      ["Ownership", v.ip === "client" ? "<p>On receipt of full payment, Provider assigns to Client all rights in the final deliverables. Provider keeps its pre-existing tools and know-how.</p>" : "<p>Provider keeps ownership of the deliverables and grants Client a non-exclusive license to use them for Client's business. Provider keeps its pre-existing tools and know-how.</p>"],
      v.portfolio === "yes" ? ["Portfolio", "<p>Provider may show the work in its portfolio and marketing unless Client objects in writing.</p>"] : ["Portfolio", "<p>Provider will not display the work publicly without Client's written permission.</p>"],
      ["Independent Contractor", "<p>Provider is an independent contractor and controls how and when the services are performed. Provider is responsible for its own taxes, insurance and equipment. Nothing here creates an employment, partnership or agency relationship.</p>"],
      v.confidentiality ? ["Confidentiality", "<p>Each party will keep the other's non-public information confidential and use it only to perform this Agreement.</p>"] : null,
      ["Termination", `<p>Either party may end this Agreement with ${days(v.noticeDays)}' written notice. Client will pay for all work performed through the termination date${fixed && !isBlank(v.cancelFee) && num(v.cancelFee) > 0 ? `, plus a cancellation fee of ${pct(v.cancelFee)} of the unpaid portion of the fee` : ""}.</p>`],
      ["Limitation of Liability", `<p>Provider's total liability is limited to ${v.cap === "fixed" ? usdOrBlank(v.capAmount) : "the fees paid under this Agreement"}. Neither party is liable for indirect or consequential damages.</p>`],
      ["Governing Law and Disputes", `<p>${disputeClause(v)}</p>`],
    ];
    return {
      filename: `service-agreement-${slug(v.aName, "draft")}.doc`,
      title: "Service Agreement",
      html: `<h1>Service Agreement</h1>
<p>This Service Agreement is made on ${dateOrBlank(v.start)} between ${partyText(v, "a")} ("Provider") and ${partyText(v, "b")} ("Client").</p>
${numbered(sections)}
${closing(v, [["a", "Provider"], ["b", "Client"]])}`,
    };
  },
};

