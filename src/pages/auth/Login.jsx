import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import Seo from "../../components/common/Seo";
import { AuthLayout, SideCopy, Field, PasswordField, Checkbox, SubmitButton, SocialButtons, Divider, Alert } from "./AuthBits";
import { useAuthForm, emailError } from "./authUtils";
import { LoginVisual } from "./AuthVisuals";
import { login, startOAuth } from "./authApi";
import "./Auth.css";

const PATH = "/login";

const validate = (v) => {
  const e = {};
  const email = emailError(v.email);
  if (email) e.email = email;
  if (!v.password) e.password = "Enter your password.";
  return e;
};

export default function Login() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const f = useAuthForm({ email: state?.email || "", password: "", remember: true }, validate);
  const [status, setStatus] = useState("idle"); // idle | loading | success
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (status !== "success") return;
    const t = setTimeout(() => navigate(state?.from || "/"), 1400);
    return () => clearTimeout(t);
  }, [status, navigate, state]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!f.check(e.currentTarget)) return;
    setStatus("loading");
    try {
      await login(f.values);
      setStatus("success");
    } catch (err) {
      setStatus("idle");
      setError(err.status === 401 ? "That email and password don't match. Try again or reset your password." : err.message);
    }
  };

  const onSocial = (name, key) => {
    if (!startOAuth(key)) setNotice(`${name} sign-in will be available once your account system is connected.`);
  };

  const busy = status !== "idle";

  return (
    <AuthLayout
      visual={<LoginVisual />}
      side={
        <SideCopy
          title="Your business, right where you left it"
          text="Track filings, orders and documents for every company you run, all from one secure dashboard."
          points={["Bank-level encryption", "Filing status in real time", "Support from real people"]}
        />
      }
    >
      <Seo
        title="Log In | Leader Business Developer"
        description="Sign in to your Leader Business Developer account to track business filings, orders, documents and compliance deadlines in one secure place."
        path={PATH}
      />


      <h1 className="sr-only">Sign in to your account</h1>
      {state?.reset && <Alert tone="ok">Your password was updated. Sign in with your new password.</Alert>}
      {error && <Alert>{error}</Alert>}
      {notice && <Alert tone="info">{notice}</Alert>}

      <SocialButtons verb="Sign in" onSelect={onSocial} disabled={busy} />
      <Divider>or sign in with email</Divider>

      <form action="/api/auth/login" method="post" noValidate onSubmit={onSubmit}>
        <Field
          id="login-email"
          label="Email address"
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
        <PasswordField
          id="login-password"
          label="Password"
          autoComplete="current-password"
          placeholder="Enter your password"
          required
          aside={<Link to="/reset-password" className="au-link au-link--sm">Forgot password?</Link>}
          error={f.err("password")}
          {...f.bind("password")}
        />

        <div className="au-row">
          <Checkbox id="login-remember" {...f.bindCheck("remember")}>Remember me for 30 days</Checkbox>
        </div>

        <SubmitButton loading={status === "loading"} success={status === "success"} loadingText="Signing in…" successText="Signed in, redirecting…">
          Sign in
        </SubmitButton>
      </form>

      <p className="au-switch">
        Don't have an account? <Link to="/register" className="au-link">Sign up free</Link>
      </p>
    </AuthLayout>
  );
}
