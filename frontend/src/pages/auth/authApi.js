/* Auth API client.
   Set VITE_API_URL (e.g. https://api.leaderbusinessdeveloper.com) to talk to a real backend.
   Without it, every call resolves after a short delay so the UI can be previewed end to end.

   Expected endpoints (JSON in, JSON out, errors as { message }):
     POST /auth/login            { email, password, remember }
     POST /auth/register         { name, email, password }
     POST /auth/forgot-password  { email }
     POST /auth/reset-password   { token, password }
     GET  /auth/oauth/:provider  (redirect to Google / Apple / Facebook) */

const API = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
export const DEMO = !API;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function post(path, body) {
  if (DEMO) {
    await wait(900);
    return { ok: true, demo: true };
  }
  let res;
  try {
    res = await fetch(`${API}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("We couldn't reach the server. Check your connection and try again.");
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || "Something went wrong. Please try again.");
    err.status = res.status;
    throw err;
  }
  return data;
}

export const login = ({ email, password, remember }) =>
  post("/auth/login", { email: email.trim(), password, remember });

export const register = ({ name, email, password }) =>
  post("/auth/register", { name: name.trim(), email: email.trim(), password });

/* Never reveal whether an account exists: any server answer counts as "sent".
   Only a network failure surfaces as an error. */
export const requestPasswordReset = async (email) => {
  try {
    await post("/auth/forgot-password", { email: email.trim() });
  } catch (err) {
    if (err.status === undefined) throw err;
  }
  return { ok: true };
};

export const resetPassword = ({ token, password }) => post("/auth/reset-password", { token, password });

export function startOAuth(provider) {
  if (DEMO) return false;
  window.location.assign(`${API}/auth/oauth/${provider}`);
  return true;
}
