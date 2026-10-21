/* Business name availability: backend call + offline naming-rule screening.

   Set VITE_API_URL to use a real registry lookup: POST {VITE_API_URL}/name-availability
   with { name, state, entity } and respond with JSON:
     { status: "available" | "unavailable" | "uncertain", verified: true,
       source: "Texas Secretary of State", checkedAt: ISO string,
       similar: [{ name, status }], message?: string }
   "available" is only trusted when the response also says verified: true.

   Without VITE_API_URL there is no way to read state records from the browser, so nothing here
   ever reports a name as "available". Offline results are either "unavailable" (the name breaks
   a naming rule and can't be filed as written) or "uncertain" (passes our screening, not yet
   confirmed against the state registry). */

import { US_STATES } from "../get-started/quoteData";

const API = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
export const HAS_API = Boolean(API);

export { US_STATES };
export const ENTITIES = [
  { id: "llc", label: "LLC", full: "Limited Liability Company", ending: "LLC" },
  { id: "corporation", label: "Corporation", full: "Corporation", ending: "Inc." },
];

/* Official business-entity searches we're sure of; every other state falls back to a search for it. */
const SOS_SEARCH = {
  California: "https://bizfileonline.sos.ca.gov/search/business",
  Delaware: "https://icis.corp.delaware.gov/ecorp/entitysearch/namesearch.aspx",
  Florida: "https://search.sunbiz.org/",
  Georgia: "https://ecorp.sos.ga.gov/BusinessSearch",
  Illinois: "https://apps.ilsos.gov/businessentitysearch/",
  Nevada: "https://esos.nv.gov/EntitySearch/OnlineEntitySearch",
  "New York": "https://apps.dos.ny.gov/publicInquiry/",
  Washington: "https://ccfs.sos.wa.gov/",
};

export function registryLink(state) {
  return SOS_SEARCH[state] || `https://www.google.com/search?q=${encodeURIComponent(`${state} secretary of state business entity search`)}`;
}
export const hasDirectRegistryLink = (state) => Boolean(SOS_SEARCH[state]);

const DESIGNATORS = {
  llc: /(^|[\s,])(l\.?\s?l\.?\s?c\.?|limited liability company|limited liability co\.?|ltd\.? liability co\.?)\s*$/i,
  corporation: /(^|[\s,])(inc\.?|incorporated|corp\.?|corporation|company|co\.?|limited|ltd\.?)\s*$/i,
};
const ANY_DESIGNATOR = /(^|[\s,])(l\.?\s?l\.?\s?c\.?|limited liability company|inc\.?|incorporated|corp\.?|corporation|company|co\.?|limited|ltd\.?)\s*$/i;

/* Words most states restrict or send for extra approval or a license. */
const RESTRICTED = ["bank", "banking", "trust", "insurance", "assurance", "university", "college", "credit union", "cooperative", "federal", "fdic", "treasury", "attorney", "lawyer", "law firm", "engineering", "architect", "medical", "pharmacy"];
const GENERIC = ["consulting", "services", "solutions", "group", "holdings", "enterprises", "business", "company", "products", "global", "international", "the", "and", "of", "co", "inc", "llc", "corp"];
const FAMOUS = ["apple", "google", "nike", "amazon", "coca cola", "pepsi", "disney", "starbucks", "mcdonalds", "microsoft", "tesla", "facebook", "instagram", "adidas", "walmart", "netflix", "uber", "airbnb", "youtube", "samsung", "sony", "toyota", "paypal", "spotify", "tiktok", "ikea", "lego"];

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
const has = (text, word) => new RegExp(`(^|\\s)${word}(\\s|$)`).test(text);

/* The name without its LLC/Inc. ending: what state "too similar" rules and brand checks look at. */
export function coreName(name) {
  let s = name.trim().replace(/\s+/g, " ");
  for (let i = 0; i < 2; i++) s = s.replace(ANY_DESIGNATOR, "").replace(/[,\s]+$/, "");
  return s;
}
export const slugOf = (name) => coreName(name).toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]/g, "");

/* Form validation. Returns { name?, state? } messages. */
export function validateForm({ name, state }) {
  const errors = {};
  const n = name.trim();
  if (!n) errors.name = "Enter the business name you'd like to check.";
  else if (n.length < 2 || !/[\p{L}\p{N}]/u.test(n)) errors.name = "A business name needs at least two characters, including a letter or number.";
  else if (n.length > 120) errors.name = "That name is too long. Most states cap names at around 120 characters.";
  if (!state) errors.state = "Choose the state where you'll register.";
  else if (!US_STATES.includes(state)) errors.state = "Choose a state from the list.";
  return errors;
}

/* Offline screening against common naming rules. Each item: { level: "block" | "warn" | "pass", title, text }. */
export function screenName(name, entityId) {
  const entity = ENTITIES.find((e) => e.id === entityId) || ENTITIES[0];
  const n = name.trim().replace(/\s+/g, " ");
  const core = coreName(n);
  const text = norm(core);
  const items = [];

  const bad = [...new Set(n.match(/[^\p{L}\p{N}&'.,\-! ]/gu) || [])];
  if (bad.length) items.push({ level: "block", title: "Characters states don't accept", text: `Remove ${bad.map((c) => `“${c}”`).join(" ")}. Most states allow only letters, numbers and basic punctuation (& . , ' - !).` });
  else items.push({ level: "pass", title: "Allowed characters only", text: "Uses letters, numbers and standard punctuation." });

  if (!text) {
    items.push({ level: "block", title: "No distinctive name", text: "The name is only an ending like “LLC” or “Inc.” Add the name that makes your business yours." });
  } else if (text.split(" ").every((w) => GENERIC.includes(w))) {
    items.push({ level: "warn", title: "Very generic", text: "Names made only of common business words are often rejected for lacking a distinguishing word." });
  } else {
    items.push({ level: "pass", title: "Has a distinguishing word", text: "There's something here that sets the name apart." });
  }

  if (DESIGNATORS[entity.id].test(n)) items.push({ level: "pass", title: `${entity.label} ending included`, text: `Ends with a designator the state recognizes for a ${entity.label}.` });
  else if (ANY_DESIGNATOR.test(n)) items.push({ level: "warn", title: `Ending doesn't match ${entity.id === "llc" ? "an LLC" : "a corporation"}`, text: `The ending looks like a different entity type. A ${entity.label} usually needs “${entity.ending}”${entity.id === "llc" ? " or “Limited Liability Company”" : ", “Corp.” or “Incorporated”"}.` });
  else items.push({ level: "warn", title: `Add “${entity.ending}”`, text: `Most states require ${entity.id === "llc" ? "an LLC" : "a corporation"} name to end with a designator like “${entity.ending}”. We'll add it when we file.` });

  const restricted = RESTRICTED.filter((w) => has(text, w));
  if (restricted.length) items.push({ level: "warn", title: "Restricted wording", text: `“${restricted.join("”, “")}” usually needs extra approval or a license before a state will accept it.` });

  const famous = FAMOUS.find((f) => has(text, f));
  if (famous) items.push({ level: "warn", title: "Resembles a famous brand", text: `“${famous}” is a well-known trademark. Even if a state accepts the name, using it could cause a legal dispute.` });

  if (text && (n.length > 60)) items.push({ level: "warn", title: "Long name", text: "Long names are harder to fit on forms, domains and signage." });

  return { items, core, entity };
}

/* Suggested alternatives for a name that is taken or can't be used. */
export function variations(name, state, entityId) {
  const entity = ENTITIES.find((e) => e.id === entityId) || ENTITIES[0];
  const core = coreName(name);
  if (!core) return [];
  const abbr = state && state.split(" ").length === 1 ? state : "";
  const out = [`${core} Co.`, `${core} Group`, `${core} Studio`, abbr && `${core} ${abbr}`, `Get ${core}`, `${core} & Co.`].filter(Boolean);
  return [...new Set(out)].slice(0, 5).map((v) => `${v} ${entity.ending}`);
}

/* Full check. Returns { status, source, screen, similar, message, checkedAt, verified }. */
export async function checkAvailability({ name, state, entity, preview }, signal) {
  const screen = screenName(name, entity);

  // Dev-only design preview (never reachable in a production build).
  if (import.meta.env.DEV && ["available", "unavailable", "uncertain"].includes(preview)) {
    return {
      status: preview, reason: preview === "unavailable" ? "registry" : "unverified", verified: preview !== "uncertain", source: "Preview data (dev only)",
      screen, similar: preview === "unavailable" ? [{ name: `${coreName(name)} Inc.`, status: "Active" }] : [], checkedAt: new Date().toISOString(),
    };
  }
  const blocked = screen.items.some((i) => i.level === "block");

  if (blocked) {
    return { status: "unavailable", reason: "rules", verified: false, source: "Naming-rule screening", screen, similar: [], checkedAt: new Date().toISOString() };
  }

  if (!API) {
    await new Promise((resolve, reject) => {
      const t = setTimeout(resolve, 1500);
      signal?.addEventListener("abort", () => { clearTimeout(t); reject(new DOMException("Aborted", "AbortError")); });
    });
    return { status: "uncertain", reason: "unverified", verified: false, source: "Naming-rule screening", screen, similar: [], checkedAt: new Date().toISOString() };
  }

  let res;
  try {
    res = await fetch(`${API}/name-availability`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ name: name.trim(), state, entity }),
      signal,
    });
  } catch (e) {
    if (e.name === "AbortError") throw e;
    throw new Error("We couldn't reach the name lookup service. Check your connection and try again.", { cause: e });
  }
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.message || "The name lookup service had a problem. Please try again in a moment.");

  const ok = ["available", "unavailable", "uncertain"].includes(body.status);
  // Never show "available" unless the backend says it actually verified against the registry.
  const status = !ok ? "uncertain" : body.status === "available" && body.verified !== true ? "uncertain" : body.status;
  return {
    status,
    reason: status === "uncertain" && body.status === "available" ? "unverified" : body.reason || (status === "uncertain" ? "unverified" : "registry"),
    verified: status !== "uncertain" && body.verified === true,
    source: body.source || `${state} registry`,
    screen,
    similar: Array.isArray(body.similar) ? body.similar.slice(0, 6) : [],
    message: body.message,
    checkedAt: body.checkedAt || new Date().toISOString(),
  };
}
