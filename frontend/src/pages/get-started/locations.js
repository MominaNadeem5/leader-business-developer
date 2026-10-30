/* States / provinces and cities for the quote form, from the free CountriesNow API (https://countriesnow.space).
   United States and Pakistan keep their built-in state lists (see quoteData.js); cities for every country come from here.
   Every lookup fails soft: if the API is down or doesn't know a place, the form falls back to a plain text box. */
import { useEffect, useState } from "react";

const API = "https://countriesnow.space/api/v0.1/countries";

/* our country name -> the name the API uses, where they differ */
const ALIAS = {
  Czechia: "Czech Republic",
  Eswatini: "Swaziland",
  Fiji: "Fiji Islands",
  Gambia: "Gambia The",
  "Hong Kong": "Hong Kong S.A.R.",
  Macau: "Macau S.A.R.",
  "North Macedonia": "Macedonia",
  Palestine: "Palestinian Territory Occupied",
  "Republic of the Congo": "Congo",
  "Vatican City": "Vatican City State (Holy See)",
};

const cache = new Map();
const sortNames = (a) => [...new Set(a)].sort((x, y) => x.localeCompare(y, "en"));

async function getJson(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 10000);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    const body = await res.json();
    return body && !body.error ? body.data : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/* Resolves to a sorted list of names, or [] when nothing is available. Successful answers are cached. */
function cached(key, fetcher) {
  if (!cache.has(key)) {
    cache.set(key, fetcher().then((list) => {
      if (!list.length) cache.delete(key); // don't remember failures or empty answers
      return list;
    }));
  }
  return cache.get(key);
}

export const loadStates = (country) =>
  cached(`s|${country}`, async () => {
    const data = await getJson(`${API}/states/q?country=${encodeURIComponent(ALIAS[country] || country)}`);
    return sortNames((data?.states || []).map((s) => s.name).filter(Boolean));
  });

export const loadCities = (country, state) =>
  cached(`c|${country}|${state}`, async () => {
    const data = await getJson(`${API}/state/cities/q?country=${encodeURIComponent(ALIAS[country] || country)}&state=${encodeURIComponent(state)}`);
    return sortNames(Array.isArray(data) ? data.filter(Boolean) : []);
  });

function useAsyncList(key, loader) {
  const [res, setRes] = useState({ key: "", list: [], loading: false });
  useEffect(() => {
    if (!key) { setRes({ key: "", list: [], loading: false }); return undefined; }
    let live = true;
    setRes({ key, list: [], loading: true });
    loader().then((list) => { if (live) setRes({ key, list, loading: false }); });
    return () => { live = false; };
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps
  return res.key === key ? res : { list: [], loading: Boolean(key) };
}

/* { list, loading } — pass "" to skip the lookup. */
export const useStates = (country) => useAsyncList(country, () => loadStates(country));
export const useCities = (country, state) => useAsyncList(country && state ? `${country}|${state}` : "", () => loadCities(country, state));
