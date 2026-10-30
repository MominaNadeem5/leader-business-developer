import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Eye, EyeOff, AlertCircle, Check, Lock, Loader2, ArrowRight, ShieldCheck, Info } from "lucide-react";
import { PASSWORD_RULES, scorePassword } from "./authUtils";

/* ---------- layout: form on the left, animated visual on the right ---------- */
export function AuthLayout({ visual, side, children }) {
  return (
    <div className="svc au">
      <div className="au__grid">
        <section className="au__main">
          <div className="au__panel">{children}</div>
        </section>
        <aside className="au__side">
          <div className="au__side-inner">
            <div className="au__visual" aria-hidden="true">{visual}</div>
            {side}
          </div>
        </aside>
      </div>
    </div>
  );
}

export function AuthHead({ icon, eyebrow, title, headingRef, children }) {
  return (
    <header className="au-head">
      <span className="au-eyebrow">{icon}{eyebrow}</span>
      <h1 ref={headingRef} tabIndex={headingRef ? -1 : undefined}>{title}</h1>
      {children && <p className="au-sub">{children}</p>}
    </header>
  );
}

export function SideCopy({ title, text, points }) {
  return (
    <div className="au-side-copy">
      <h2>{title}</h2>
      <p>{text}</p>
      <ul>
        {points.map((p) => (
          <li key={p}><Check size={14} aria-hidden="true" />{p}</li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- inputs ---------- */
export function Field({ id, label, error, hint, hintTone, icon, aside, end, "aria-describedby": extraDesc, ...input }) {
  const msgId = error || hint ? `${id}-msg` : undefined;
  const describedBy = [msgId, extraDesc].filter(Boolean).join(" ") || undefined;
  return (
    <div className={`au-field${error ? " is-err" : ""}`}>
      <div className="au-field__top">
        <label htmlFor={id}>{label}</label>
        {aside}
      </div>
      <div className={`au-input${end ? " has-end" : ""}`}>
        {icon && <span className="au-input__icon" aria-hidden="true">{icon}</span>}
        <input id={id} aria-invalid={error ? true : undefined} aria-describedby={describedBy} {...input} />
        {end}
      </div>
      {error ? (
        <p className="au-msg au-msg--err" id={msgId}><AlertCircle size={14} aria-hidden="true" />{error}</p>
      ) : hint ? (
        <p className={`au-msg${hintTone ? ` au-msg--${hintTone}` : ""}`} id={msgId}>{hint}</p>
      ) : null}
    </div>
  );
}

export function PasswordField({ id, hint, hintTone, ...props }) {
  const [show, setShow] = useState(false);
  const [caps, setCaps] = useState(false);
  const onKey = (e) => setCaps(Boolean(e.getModifierState?.("CapsLock")));
  return (
    <Field
      id={id}
      type={show ? "text" : "password"}
      icon={<Lock size={18} />}
      spellCheck={false}
      autoCapitalize="none"
      onKeyDown={onKey}
      onKeyUp={onKey}
      hint={caps ? "Caps Lock is on." : hint}
      hintTone={caps ? "warn" : hintTone}
      end={
        <button
          type="button"
          className="au-eye"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
          aria-pressed={show}
          aria-controls={id}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      }
      {...props}
    />
  );
}

export function Checkbox({ children, error, id, ...input }) {
  return (
    <div className={`au-checkwrap${error ? " is-err" : ""}`}>
      <label className="au-check" htmlFor={id}>
        <input type="checkbox" id={id} aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-msg` : undefined} {...input} />
        <span>{children}</span>
      </label>
      {error && <p className="au-msg au-msg--err" id={`${id}-msg`}><AlertCircle size={14} aria-hidden="true" />{error}</p>}
    </div>
  );
}

/* ---------- password strength ---------- */
const LEVELS = ["", "Weak", "Fair", "Good", "Strong"];

export function StrengthMeter({ id, password, extras }) {
  const level = scorePassword(password, extras);
  return (
    <div className="au-strength" data-level={level} id={id}>
      <div className="au-strength__top">
        <div className="au-strength__bar" aria-hidden="true">
          {[1, 2, 3, 4].map((i) => <span key={i} className={i <= level ? "is-on" : ""} />)}
        </div>
        <p className="au-strength__label" aria-live="polite">
          {password ? <><span className="sr-only">Password strength: </span><b>{LEVELS[level]}</b></> : "Strength"}
        </p>
      </div>
      <ul className="au-rules" aria-label="Password requirements">
        {PASSWORD_RULES.map(([key, text, test]) => {
          const ok = test(password);
          return (
            <li key={key} className={ok ? "is-ok" : ""}>
              <span className="au-rules__dot" aria-hidden="true"><Check size={11} strokeWidth={3.5} /></span>
              {text}
              <span className="sr-only">{ok ? " (done)" : " (not yet)"}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ---------- buttons ---------- */
export function SubmitButton({ loading, success, loadingText, successText, children }) {
  return (
    <button type="submit" className={`au-btn${success ? " is-success" : ""}`} disabled={loading || success} aria-busy={loading || undefined}>
      {loading ? (
        <><Loader2 size={18} className="au-spin" aria-hidden="true" />{loadingText}</>
      ) : success ? (
        <><Check size={18} aria-hidden="true" />{successText}</>
      ) : (
        <>{children}<ArrowRight size={18} className="au-btn__arrow" aria-hidden="true" /></>
      )}
    </button>
  );
}

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
  </svg>
);
const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path fill="currentColor" d="M16.37 12.6c-.02-2.3 1.88-3.4 1.97-3.46-1.07-1.57-2.74-1.78-3.33-1.8-1.42-.14-2.77.83-3.49.83-.72 0-1.83-.81-3.01-.79-1.55.02-2.98.9-3.78 2.29-1.61 2.8-.41 6.94 1.16 9.21.77 1.11 1.68 2.36 2.88 2.31 1.16-.05 1.6-.75 3-.75s1.79.75 3.01.72c1.24-.02 2.03-1.13 2.79-2.25.88-1.29 1.24-2.54 1.26-2.6-.03-.01-2.42-.93-2.46-3.71zM14.08 5.85c.64-.77 1.07-1.85.95-2.92-.92.04-2.03.61-2.69 1.38-.59.68-1.11 1.78-.97 2.83 1.02.08 2.07-.52 2.71-1.29z" />
  </svg>
);
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path fill="#1877F2" d="M24 12a12 12 0 1 0-13.88 11.85v-8.38H7.08V12h3.04V9.36c0-3 1.79-4.67 4.53-4.67 1.31 0 2.69.24 2.69.24v2.95h-1.52c-1.49 0-1.96.93-1.96 1.88V12h3.33l-.53 3.47h-2.8v8.38A12 12 0 0 0 24 12z" />
  </svg>
);

const PROVIDERS = [
  ["google", "Google", GoogleIcon],
  ["apple", "Apple", AppleIcon],
  ["facebook", "Facebook", FacebookIcon],
];

export function SocialButtons({ verb, onSelect, disabled }) {
  return (
    <div className="au-social" role="group" aria-label={`${verb} with a social account`}>
      {PROVIDERS.map(([key, name, Icon]) => (
        <button key={key} type="button" className="au-social__btn" onClick={() => onSelect(name, key)} disabled={disabled} aria-label={`${verb} with ${name}`}>
          <Icon />
          <span>{name}</span>
        </button>
      ))}
    </div>
  );
}

export function Divider({ children }) {
  return <div className="au-or"><span>{children}</span></div>;
}

export function Alert({ tone = "err", children }) {
  const Icon = tone === "ok" ? ShieldCheck : tone === "info" ? Info : AlertCircle;
  return (
    <div className={`au-alert au-alert--${tone}`} role={tone === "err" ? "alert" : "status"}>
      <Icon size={18} aria-hidden="true" />
      <div>{children}</div>
    </div>
  );
}

/* ---------- footer: security note + links between the three auth pages ---------- */
const AUTH_LINKS = [
  ["/login", "Sign in"],
  ["/register", "Create account"],
  ["/reset-password", "Reset password"],
];

export function AuthFooter() {
  const { pathname } = useLocation();
  return (
    <footer className="au-foot">
      <p className="au-secure"><Lock size={13} aria-hidden="true" /> Protected with 256-bit SSL encryption</p>
      <nav aria-label="Account pages">
        {AUTH_LINKS.map(([to, label]) => (
          <Link key={to} to={to} aria-current={pathname === to ? "page" : undefined}>{label}</Link>
        ))}
        <Link to="/contact">Need help?</Link>
      </nav>
    </footer>
  );
}
