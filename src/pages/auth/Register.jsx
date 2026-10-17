import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Mail, User, MailCheck, ArrowRight } from "lucide-react";
import Seo from "../../components/common/Seo";
import { AuthLayout, SideCopy, Field, PasswordField, Checkbox, StrengthMeter, SubmitButton, SocialButtons, Divider, Alert } from "./AuthBits";
import { useAuthForm, emailError, passwordOk } from "./authUtils";
import { RegisterVisual } from "./AuthVisuals";
import { register, startOAuth } from "./authApi";
import "./Auth.css";

const PATH = "/register";

const validate = (v) => {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Enter your full name.";
  const email = emailError(v.email);
  if (email) e.email = email;
  if (!v.password) e.password = "Create a password.";
  else if (!passwordOk(v.password)) e.password = "Your password needs to meet all the requirements below.";
  if (!v.confirm) e.confirm = "Re-enter your password.";
  else if (v.confirm !== v.password) e.confirm = "Passwords don't match.";
  if (!v.terms) e.terms = "Please accept the Terms of Service and Privacy Policy to continue.";
  return e;
};

export default function Register() {
  const f = useAuthForm({ name: "", email: "", password: "", confirm: "", terms: false }, validate);
  const [status, setStatus] = useState("idle"); // idle | loading | done
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const doneRef = useRef(null);
  const { values: v, errors } = f;

  useEffect(() => {
    if (status === "done") doneRef.current?.focus();
  }, [status]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!f.check(e.currentTarget)) return;
    setStatus("loading");
    try {
      await register(v);
      setStatus("done");
    } catch (err) {
      setStatus("idle");
      setError(err.status === 409 ? "We couldn't create an account with that email. If you already have one, sign in or reset your password." : err.message);
    }
  };

  const onSocial = (name, key) => {
    if (!startOAuth(key)) setNotice(`${name} sign-up will be available once your account system is connected.`);
  };

  const firstName = v.name.trim().split(/\s+/)[0];

  return (
    <AuthLayout
      visual={<RegisterVisual name={v.name} emailOk={!errors.email} passOk={passwordOk(v.password)} terms={v.terms} />}
      side={
        <SideCopy
          title="Everything your business needs, in one account"
          text="Form your company, open banking, stay compliant and grow online, with experts guiding every step."
          points={["Free to create", "No credit card needed", "Cancel anytime"]}
        />
      }
    >
      <Seo
        title="Create an Account | Leader Business Developer"
        description="Create your free Leader Business Developer account to form your business, manage filings and compliance, and access banking, payment and website services."
        path={PATH}
      />

      {status === "done" ? (
        <div className="au-done">
          <span className="au-done__icon"><MailCheck size={32} aria-hidden="true" /></span>
          <h1 ref={doneRef} tabIndex={-1}>You're all set{firstName ? `, ${firstName}` : ""}!</h1>
          <p className="au-sub">
            We sent a verification link to <b className="au-email">{v.email.trim()}</b>. Confirm your email to unlock your dashboard.
          </p>
          <div className="au-stack">
            <Link to="/get-started" className="au-btn">Start your first project <ArrowRight size={18} className="au-btn__arrow" aria-hidden="true" /></Link>
            <Link to="/login" state={{ email: v.email.trim() }} className="au-btn au-btn--ghost">Go to sign in</Link>
          </div>
        </div>
      ) : (
        <>
        

          <h1 className="sr-only">Create your account</h1>
          {error && <Alert>{error}</Alert>}
          {notice && <Alert tone="info">{notice}</Alert>}

          <SocialButtons verb="Sign up" onSelect={onSocial} disabled={status === "loading"} />
          <Divider>or sign up with email</Divider>

          <form action="/api/auth/register" method="post" noValidate onSubmit={onSubmit}>
            <div className="au-2col">
            <Field
              id="reg-name"
              label="Full name"
              icon={<User size={18} />}
              autoComplete="name"
              autoCapitalize="words"
              placeholder="Jane Smith"
              maxLength={80}
              required
              error={f.err("name")}
              {...f.bind("name")}
            />
            <Field
              id="reg-email"
              label="Work email"
              type="email"
              icon={<Mail size={18} />}
              autoComplete="email"
              inputMode="email"
              autoCapitalize="none"
              spellCheck={false}
              placeholder="name@company.com"
              required
              error={f.err("email")}
              {...f.bind("email")}
            />
            </div>
            <PasswordField
              id="reg-password"
              label="Password"
              autoComplete="new-password"
              placeholder="Create a strong password"
              required
              aria-describedby="reg-strength"
              error={f.err("password")}
              {...f.bind("password")}
            />
            <StrengthMeter id="reg-strength" password={v.password} extras={[firstName, v.email.split("@")[0]]} />
            <PasswordField
              id="reg-confirm"
              label="Confirm password"
              autoComplete="new-password"
              placeholder="Re-enter your password"
              required
              error={f.err("confirm")}
              hint={v.confirm && v.confirm === v.password ? "Passwords match." : undefined}
              hintTone="ok"
              {...f.bind("confirm")}
            />

            <Checkbox id="reg-terms" error={f.err("terms")} {...f.bindCheck("terms")}>
              I agree to the <Link to="/terms" className="au-link">Terms of Service</Link> and <Link to="/privacy" className="au-link">Privacy Policy</Link>.
            </Checkbox>

            <SubmitButton loading={status === "loading"} loadingText="Creating your account…">
              Create account
            </SubmitButton>
          </form>

          <p className="au-switch">
            Already a member? <Link to="/login" className="au-link">Sign in instead</Link>
          </p>
        </>
      )}
    </AuthLayout>
  );
}
