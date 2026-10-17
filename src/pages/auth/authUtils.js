import { useState } from "react";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function emailError(value) {
  if (!value.trim()) return "Enter your email address.";
  if (!EMAIL_RE.test(value.trim())) return "Enter a valid email, like name@company.com.";
  return undefined;
}

/* ---------- form state: values, touched fields and errors shown after blur or submit ---------- */
export function useAuthForm(initial, validate) {
  const [values, setValues] = useState(initial);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const errors = validate(values);

  const bind = (name) => ({
    name,
    value: values[name],
    onChange: (e) => setValues((v) => ({ ...v, [name]: e.target.value })),
    onBlur: () => setTouched((t) => ({ ...t, [name]: true })),
  });
  const bindCheck = (name) => ({
    name,
    checked: values[name],
    onChange: (e) => setValues((v) => ({ ...v, [name]: e.target.checked })),
  });
  const err = (name) => (touched[name] || submitted ? errors[name] : undefined);

  /* Call on submit: reveals every error and focuses the first invalid field. */
  const check = (form) => {
    setSubmitted(true);
    const first = Object.keys(errors)[0];
    if (!first) return true;
    form.querySelector(`[name="${first}"]`)?.focus();
    return false;
  };

  return { values, setValues, errors, bind, bindCheck, err, check };
}

/* ---------- password strength ---------- */
export const PASSWORD_RULES = [
  ["len", "At least 8 characters", (p) => p.length >= 8],
  ["case", "Upper & lowercase letters", (p) => /[a-z]/.test(p) && /[A-Z]/.test(p)],
  ["num", "At least one number", (p) => /\d/.test(p)],
  ["sym", "At least one symbol", (p) => /[^A-Za-z0-9]/.test(p)],
];
const COMMON = ["password", "12345678", "qwerty", "letmein", "welcome", "iloveyou", "admin", "abc123", "111111"];

export const passwordOk = (p) => PASSWORD_RULES.every(([, , test]) => test(p));

/* 0 = empty, 1 weak … 4 strong. `extras` are personal strings (name, email) to penalise. */
export function scorePassword(p, extras = []) {
  if (!p) return 0;
  let raw = PASSWORD_RULES.filter(([, , test]) => test(p)).length + (p.length >= 12 ? 1 : 0);
  const lower = p.toLowerCase();
  const personal = extras.some((x) => x && x.length >= 3 && lower.includes(x.toLowerCase()));
  if (personal || COMMON.some((c) => lower.includes(c))) raw -= 2;
  if (/^(.)\1+$/.test(p) || p.length < 8) raw = Math.min(raw, 1);
  return Math.min(4, Math.max(1, raw - 1));
}
