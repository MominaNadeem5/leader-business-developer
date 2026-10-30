import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Mail, KeyRound, MailCheck, ShieldCheck, ArrowLeft, ArrowRight, RotateCw, ExternalLink } from "lucide-react";
import Seo from "../../components/common/Seo";
import { AuthLayout, AuthHead, SideCopy, Field, PasswordField, StrengthMeter, SubmitButton, Alert } from "./AuthBits";
import { useAuthForm, emailError, passwordOk } from "./authUtils";
import { ResetVisual } from "./AuthVisuals";
import { requestPasswordReset, resetPassword, DEMO } from "./authApi";
import "./Auth.css";

const PATH = "/reset-password";
const RESEND_SECONDS = 30;
const STEPS = ["Verify email", "New password", "Done"];
const STEP_INDEX = { request: 0, sent: 0, new: 1, done: 2 };

const validateEmail = (v) => {
  const e = {};
  const email = emailError(v.email);
  if (email) e.email = email;
  return e;
};
const validatePassword = (v) => {
  const e = {};
  if (!v.password) e.password = "Create a new password.";
  else if (!passwordOk(v.password)) e.password = "Your password needs to meet all the requirements below.";
  if (!v.confirm) e.confirm = "Re-enter your new password.";
  else if (v.confirm !== v.password) e.confirm = "Passwords don't match.";
  return e;
};

function Stepper({ step }) {
  const current = STEP_INDEX[step];
  const complete = step === "sent" ? 1 : step === "done" ? 3 : current;
  return (
    <ol className="au-steps" aria-label="Reset progress">
      {STEPS.map((label, i) => (
        <li key={label} className={i < complete ? "is-done" : i === current ? "is-current" : ""} aria-current={i === current ? "step" : undefined}>
          <span className="au-steps__bar" />
          {label}
        </li>
      ))}
    </ol>
  );
}

export default function ResetPassword() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const token = params.get("token");
  const [rawStep, setStep] = useState("request"); // request | sent | new | done
  // A ?token= from the emailed link always lands on "set a new password" until it succeeds.
  const step = token && rawStep !== "done" ? "new" : rawStep;
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const headingRef = useRef(null);
  const prevStep = useRef(step);

  const emailForm = useAuthForm({ email: "" }, validateEmail);
  const passForm = useAuthForm({ password: "", confirm: "" }, validatePassword);
  const email = emailForm.values.email.trim();

  // Move focus to the new heading whenever the step changes, so screen readers announce it.
  useEffect(() => {
    if (prevStep.current === step) return;
    prevStep.current = step;
    headingRef.current?.focus();
  }, [step]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const sendLink = async () => {
    setError("");
    setStatus("loading");
    try {
      await requestPasswordReset(email);
      setStep("sent");
      setCooldown(RESEND_SECONDS);
    } catch (err) {
      setError(err.message);
    } finally {
      setStatus("idle");
    }
  };

  const onRequest = (e) => {
    e.preventDefault();
    if (emailForm.check(e.currentTarget)) sendLink();
  };

  const onReset = async (e) => {
    e.preventDefault();
    setError("");
    if (!passForm.check(e.currentTarget)) return;
    setStatus("loading");
    try {
      await resetPassword({ token, password: passForm.values.password });
      setStep("done");
    } catch (err) {
      setError(err.status === 400 || err.status === 410
        ? "This reset link is invalid or has expired. Request a new one below."
        : err.message);
    } finally {
      setStatus("idle");
    }
  };

  const restart = () => {
    setError("");
    setStep("request");
    navigate(PATH, { replace: true });
  };

  const sideCopy = {
    request: ["Locked out? It happens.", "Enter your email and we'll send a secure, one-time link to reset your password."],
    sent: ["Check your inbox", "Your secure reset link is on its way. It works once and expires after 30 minutes."],
    new: ["Choose a fresh password", "Pick something strong and unique. You'll use it to sign in from now on."],
    done: ["You're back in", "Your password has been updated and other sessions have been signed out for safety."],
  }[step];

  const loading = status === "loading";

  return (
    <AuthLayout
      visual={<ResetVisual step={step} />}
      side={<SideCopy title={sideCopy[0]} text={sideCopy[1]} points={["One-time secure link", "Expires in 30 minutes", "Encrypted end to end"]} />}
    >
      <Seo
        title="Reset Your Password | Leader Business Developer"
        description="Forgot your password? Request a secure link to reset your Leader Business Developer account password and get back to managing your business."
        path={PATH}
        robots="noindex, nofollow"
      />

      <Stepper step={step} />

      {step === "request" && (
        <>
          <AuthHead icon={<KeyRound size={14} aria-hidden="true" />} eyebrow="Password help" headingRef={headingRef} title="Forgot your password?">
            No worries. Enter the email you signed up with and we'll send you a link to reset it.
          </AuthHead>
          {error && <Alert>{error}</Alert>}
          <form action="/api/auth/forgot-password" method="post" noValidate onSubmit={onRequest}>
            <Field
              id="reset-email"
              label="Email address"
              type="email"
              icon={<Mail size={18} />}
              autoComplete="email"
              inputMode="email"
              autoCapitalize="none"
              spellCheck={false}
              placeholder="name@company.com"
              required
              autoFocus
              error={emailForm.err("email")}
              {...emailForm.bind("email")}
            />
            <SubmitButton loading={loading} loadingText="Sending link…">Send reset link</SubmitButton>
          </form>
        </>
      )}

      {step === "sent" && (
        <div className="au-done">
          <span className="au-done__icon"><MailCheck size={32} aria-hidden="true" /></span>
          <h1 ref={headingRef} tabIndex={-1}>Check your inbox</h1>
          <p className="au-sub">
            If an account exists for <b className="au-email">{email}</b>, you'll receive an email with a link to reset your password within a few minutes.
          </p>
          <div className="au-mailapps">
            <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer" className="au-btn au-btn--ghost">Open Gmail <ExternalLink size={15} aria-hidden="true" /></a>
            <a href="https://outlook.live.com/mail/" target="_blank" rel="noopener noreferrer" className="au-btn au-btn--ghost">Open Outlook <ExternalLink size={15} aria-hidden="true" /></a>
          </div>
          {error && <Alert>{error}</Alert>}
          <p className="au-tip">Can't find it? Check your spam or promotions folder.</p>
          <div className="au-inline-actions">
            <button type="button" className="au-textbtn" onClick={sendLink} disabled={cooldown > 0 || loading}>
              <RotateCw size={14} aria-hidden="true" className={loading ? "au-spin" : ""} />
              {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend email"}
            </button>
            <span aria-hidden="true">·</span>
            <button type="button" className="au-textbtn" onClick={restart}>Use a different email</button>
          </div>
          {DEMO && (
            <Link to={`${PATH}?token=demo`} className="au-demo">
              Preview mode: open the reset link <ArrowRight size={14} aria-hidden="true" />
            </Link>
          )}
        </div>
      )}

      {step === "new" && (
        <>
          <AuthHead icon={<KeyRound size={14} aria-hidden="true" />} eyebrow="Almost there" headingRef={headingRef} title="Set a new password">
            Your new password must be different from passwords you've used before.
          </AuthHead>
          {error && (
            <Alert>
              {error}{" "}
              {!token || error.includes("expired") ? <button type="button" className="au-textbtn au-textbtn--inline" onClick={restart}>Request a new link</button> : null}
            </Alert>
          )}
          <form action="/api/auth/reset-password" method="post" noValidate onSubmit={onReset}>
            <input type="hidden" name="token" value={token || ""} />
            {/* hidden username helps password managers update the right saved login */}
            <input type="email" name="username" autoComplete="username" value={email} readOnly hidden />
            <PasswordField
              id="reset-password"
              label="New password"
              autoComplete="new-password"
              placeholder="Create a strong password"
              required
              aria-describedby="reset-strength"
              error={passForm.err("password")}
              {...passForm.bind("password")}
            />
            <StrengthMeter id="reset-strength" password={passForm.values.password} extras={[email.split("@")[0]]} />
            <PasswordField
              id="reset-confirm"
              label="Confirm new password"
              autoComplete="new-password"
              placeholder="Re-enter your new password"
              required
              error={passForm.err("confirm")}
              hint={passForm.values.confirm && passForm.values.confirm === passForm.values.password ? "Passwords match." : undefined}
              hintTone="ok"
              {...passForm.bind("confirm")}
            />
            <SubmitButton loading={loading} loadingText="Updating password…">Reset password</SubmitButton>
          </form>
        </>
      )}

      {step === "done" && (
        <div className="au-done">
          <span className="au-done__icon au-done__icon--solid"><ShieldCheck size={32} aria-hidden="true" /></span>
          <h1 ref={headingRef} tabIndex={-1}>Password reset successfully</h1>
          <p className="au-sub">Your password has been changed. For your security, you've been signed out of other devices.</p>
          <div className="au-stack">
            <Link to="/login" state={{ reset: true, email }} className="au-btn">Back to login <ArrowRight size={18} className="au-btn__arrow" aria-hidden="true" /></Link>
          </div>
        </div>
      )}

      {step !== "done" && (
        <p className="au-switch">
          <Link to="/login" className="au-link au-back"><ArrowLeft size={16} aria-hidden="true" /> Back to login</Link>
        </p>
      )}
      
    </AuthLayout>
  );
}
