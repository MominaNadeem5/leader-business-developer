/* Country list for the quote form.
   A bundled list is always available (works offline and if the API is down). On load we also ask the free
   REST Countries API (https://restcountries.com) for the current list and use it when it answers; the result is
   cached for the tab so it is requested once. Only the public country list is requested: no user data is sent. */
import { useEffect, useState } from "react";

const FALLBACK = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
  "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada",
  "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Costa Rica", "Croatia", "Cuba", "Cyprus",
  "Czechia", "DR Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
  "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece",
  "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India",
  "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya",
  "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
  "Luxembourg", "Macau", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius",
  "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal",
  "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau",
  "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar",
  "Republic of the Congo", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines",
  "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
  "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan",
  "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga",
  "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
  "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe",
];

const API_URL = "https://restcountries.com/v3.1/all?fields=name";
const CACHE_KEY = "lbd-countries";
const byName = (a, b) => a.localeCompare(b, "en");

let current = [...FALLBACK].sort(byName);
let known = new Set(current.map((c) => c.toLowerCase()));
let pending = null;

function adopt(list) {
  current = [...new Set(list)].sort(byName);
  known = new Set(current.map((c) => c.toLowerCase()));
}

function readCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    const list = raw ? JSON.parse(raw) : null;
    return Array.isArray(list) && list.length > 150 ? list : null;
  } catch {
    return null;
  }
}

/* Resolves to the best available list; never rejects. */
function loadCountries() {
  if (pending) return pending;
  const cached = readCache();
  if (cached) { adopt(cached); return (pending = Promise.resolve(current)); }
  pending = (async () => {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 6000);
    try {
      const res = await fetch(API_URL, { signal: ctrl.signal });
      if (!res.ok) throw new Error("bad status");
      const names = (await res.json()).map((c) => c?.name?.common).filter(Boolean);
      if (names.length > 150) {
        adopt([...names, ...FALLBACK]);
        try { sessionStorage.setItem(CACHE_KEY, JSON.stringify(current)); } catch { /* storage blocked */ }
      }
    } catch { /* offline or API down: keep the bundled list */ } finally { clearTimeout(timer); }
    return current;
  })();
  return pending;
}

/* Hook: the full list right away (bundled), upgraded in place when the API answers. */
export function useCountries() {
  const [list, setList] = useState(current);
  useEffect(() => {
    let live = true;
    loadCountries().then((l) => { if (live) setList(l); });
    return () => { live = false; };
  }, []);
  return list;
}

/* Canonical spelling for what the person typed ("united states" -> "United States"), or "" if it isn't a country. */
export const matchCountry = (value) => {
  const v = (value || "").trim().toLowerCase();
  return v && known.has(v) ? current.find((c) => c.toLowerCase() === v) : "";
};
