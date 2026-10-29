/* Client for the AI business-name endpoint on the Laravel backend (POST /api/tools/name-ideas).
   The Gemini API key lives only on the server. Set VITE_TOOLS_API_URL (or the shared VITE_API_URL) to your backend's address,
   e.g. https://api.leaderbusinessdeveloper.com. Without it, or on any error, this returns null and the page keeps
   using its built-in generator. */

const API = (import.meta.env.VITE_TOOLS_API_URL || import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

export const AI_NAMES_ENABLED = Boolean(API);
const TIMEOUT_MS = 12000;

/* Resolves to an array of names, or null when the AI service can't be used. */
export async function fetchNameIdeas({ keywords, industry, style, maxLen, variation, exclude }, signal) {
  if (!API) return null;
  const timer = new AbortController();
  const t = setTimeout(() => timer.abort(), TIMEOUT_MS);
  const onAbort = () => timer.abort();
  signal?.addEventListener("abort", onAbort);
  try {
    const res = await fetch(`${API}/api/tools/name-ideas`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ keywords, industry, style, max_len: maxLen, variation, exclude: exclude.slice(0, 60) }),
      signal: timer.signal,
    });
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data.names) ? data.names.filter((n) => typeof n === "string") : null;
  } catch {
    return null;
  } finally {
    clearTimeout(t);
    signal?.removeEventListener("abort", onAbort);
  }
}
