import { FileSignature, Handshake, ShieldCheck, ClipboardCheck, Receipt, Landmark, Users, Store, Hash, CalendarCheck } from "lucide-react";

/* The five documents in the navbar's "Legal Form" column (routes match Navbar.jsx). */
export const LEGAL_FORMS = [
  {
    path: "/forms/contract", title: "Business Contract", icon: FileSignature,
    short: "A general-purpose agreement for sales, supply and everyday deals between two businesses.",
    best: "Any deal where money, goods or obligations change hands",
  },
  {
    path: "/forms/templates/partnership", title: "Partnership Agreement", icon: Handshake,
    short: "Sets out ownership, profit sharing, decision-making and exits for business partners.",
    best: "Two or more people running a business together",
  },
  {
    path: "/forms/templates/nda", title: "Non-Disclosure Agreement (NDA)", icon: ShieldCheck,
    short: "Keeps confidential information private when you share it with others.",
    best: "Pitching, hiring, or sharing ideas, data or trade secrets",
  },
  {
    path: "/forms/templates/service-agreement", title: "Service Agreement", icon: ClipboardCheck,
    short: "Defines scope, deliverables, timelines and payment for services you provide or hire.",
    best: "Freelancers, agencies, consultants and contractors",
  },
  {
    path: "/forms/invoice", title: "Invoice & Receipt", icon: Receipt,
    short: "Request payment professionally, then confirm it with a clear receipt.",
    best: "Billing clients and keeping tax-ready records",
  },
];

/* The five documents in the navbar's "Legal Forms" column (state and IRS filings). */
export const LEGAL_FILINGS = [
  {
    path: "/forms/legal/articles-of-organization", title: "Articles of Organization", icon: Landmark,
    short: "The state filing that officially creates your LLC, with every field explained.",
    best: "Anyone forming a new LLC",
  },
  {
    path: "/forms/legal/operating-agreement", title: "LLC Operating Agreement", icon: Users,
    short: "Your LLC's internal rulebook for ownership, management, money and exits.",
    best: "Every LLC, single-member or multi-member",
  },
  {
    path: "/forms/legal/dba", title: "DBA Registration Form", icon: Store,
    short: "Register a trade name so you can operate under a brand other than your legal name.",
    best: "Sole proprietors and companies using a brand name",
  },
  {
    path: "/forms/legal/ein", title: "EIN Application (SS-4)", icon: Hash,
    short: "Apply for your federal tax ID with a line-by-line guide to IRS Form SS-4.",
    best: "Hiring, banking, LLCs and corporations",
  },
  {
    path: "/forms/legal/annual-report", title: "Annual Report Form", icon: CalendarCheck,
    short: "The yearly or biennial state filing that keeps your business in good standing.",
    best: "Registered LLCs and corporations",
  },
];

export const FORMS_HUB = "/forms/legal";
export const FORMS_START = (form) => `/get-started?service=${form}`;

/* SEO metadata (title ≤ 60 chars, description ≤ 155 chars). */
export const FORMS_SEO = {
  "/forms/legal": {
    title: "Free Legal Forms & Business Filing Templates | Leader",
    description: "Free legal forms for small business: contracts, NDAs, invoices, plus articles of organization, operating agreements, DBA, EIN and annual report guides.",
    keywords: ["legal form templates", "small business legal forms", "business filing forms", "free business contract templates", "LLC forms", "which legal document do I need"],
  },
  "/forms/legal/articles-of-organization": {
    title: "Articles of Organization: LLC Form Guide & Template",
    description: "What goes on your LLC's articles of organization, field by field. Check your LLC name, compare state filing fees and prepare your filing worksheet free.",
    keywords: ["articles of organization", "LLC articles of organization", "certificate of formation", "how to file articles of organization", "LLC filing fee by state"],
  },
  "/forms/legal/operating-agreement": {
    title: "LLC Operating Agreement Template (Free & Fillable)",
    description: "Free LLC operating agreement template for single- or multi-member LLCs. Choose your management type, split ownership and download an editable copy.",
    keywords: ["LLC operating agreement template", "operating agreement", "single member LLC operating agreement", "multi-member operating agreement", "manager-managed LLC"],
  },
  "/forms/legal/dba": {
    title: "DBA Registration Form: How to File a Trade Name",
    description: "How to fill out a DBA (doing business as) registration form: where to file, publication rules, renewals, and a free worksheet to prepare your filing.",
    keywords: ["DBA registration form", "doing business as", "assumed name certificate", "fictitious business name", "trade name registration", "how to file a DBA"],
  },
  "/forms/legal/ein": {
    title: "EIN Application (Form SS-4): Line-by-Line Guide",
    description: "Apply for an EIN with confidence. Line-by-line help for IRS Form SS-4, a quick 'do I need an EIN?' check, ways to apply, and a free prep worksheet.",
    keywords: ["EIN application", "Form SS-4", "SS-4 instructions", "apply for EIN", "federal tax ID number", "responsible party EIN"],
  },
  "/forms/legal/annual-report": {
    title: "LLC Annual Report Form: Due Dates, Fees & Guide",
    description: "What's on a state annual report, when it's due and what happens if you miss it. Calculate your next due date and download a free annual report worksheet.",
    keywords: ["annual report form", "LLC annual report", "annual report due date", "statement of information", "good standing", "biennial report"],
  },
  "/forms/contract": {
    title: "Business Contract Template: Key Clauses Explained",
    description: "Free business contract template with a key clauses checklist, clause-by-clause guide and contract types comparison. Fill it in and download as Word.",
    keywords: ["business contract template", "contract clauses checklist", "small business contract", "commercial agreement template", "how to write a business contract"],
  },
  "/forms/templates/partnership": {
    title: "Partnership Agreement Template (Free & Fillable)",
    description: "Fillable partnership agreement template. Model ownership and profit splits, compare general, limited and LLP structures, and know what to decide first.",
    keywords: ["partnership agreement template", "business partnership agreement", "profit sharing agreement", "general vs limited partnership", "LLP agreement"],
  },
  "/forms/templates/nda": {
    title: "NDA Template: Mutual & One-Way Non-Disclosure",
    description: "Free NDA template. Compare one-way and mutual NDAs, see when you need one, and choose sensible confidentiality terms and duration before you share.",
    keywords: ["NDA template", "non-disclosure agreement template", "mutual NDA", "one-way NDA", "confidentiality agreement", "NDA duration"],
  },
  "/forms/templates/service-agreement": {
    title: "Service Agreement Template for Freelancers & Firms",
    description: "Service agreement template covering scope of work, deliverables and payment terms, with a milestone planner and the red flags to avoid before signing.",
    keywords: ["service agreement template", "scope of work template", "freelance contract", "consulting agreement", "payment terms contract"],
  },
  "/forms/invoice": {
    title: "Free Invoice & Receipt Template (Fillable)",
    description: "Create a professional invoice or receipt free. See a sample layout, learn invoice vs receipt differences and check every required field before you send.",
    keywords: ["invoice template", "receipt template", "invoice vs receipt", "free invoice generator", "what to include on an invoice", "small business invoice"],
  },
};

export const DISCLAIMER =
  "This is a general template and not legal advice. Laws differ by state and situation, and Leader Business Developer is not a law firm. For important or high-value agreements, have a licensed attorney in your state review the final document before signing.";

/* Download an HTML fragment as a Word-compatible .doc file. */
export function downloadDoc(filename, title, bodyHtml) {
  const html = `<html><head><meta charset="utf-8"><title>${title}</title>
<style>body{font-family:Calibri,Arial,sans-serif;font-size:11pt;line-height:1.5;color:#111}h1{font-size:18pt}h2{font-size:12pt;margin-top:16pt}table{border-collapse:collapse;width:100%}td,th{border:1px solid #999;padding:6px;text-align:left}.r{text-align:right}</style>
</head><body>${bodyHtml}<p style="margin-top:24pt;font-size:9pt;color:#555">${DISCLAIMER}</p></body></html>`;
  const blob = new Blob(["﻿", html], { type: "application/msword" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/* Escape user-typed text before placing it in generated HTML. */
export const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* Blank-line placeholder when a field is empty. */
export const fill = (v, blank = "____________") => (String(v ?? "").trim() ? esc(v) : blank);
