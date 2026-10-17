/* Quote request submission.
   Set VITE_API_URL to post to a real backend: POST {VITE_API_URL}/quotes with the answers as JSON.
   Without it the request resolves after a short delay so the flow can be previewed end to end. */

const API = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

export async function submitQuote(data) {
  if (!API) {
    await new Promise((resolve) => setTimeout(resolve, 1100));
    return { ok: true, demo: true };
  }
  let res;
  try {
    res = await fetch(`${API}/quotes`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
  } catch {
    throw new Error("We couldn't reach our server. Check your connection and try again. Your answers are saved.");
  }
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.message || "Something went wrong sending your request. Please try again.");
  return body;
}
