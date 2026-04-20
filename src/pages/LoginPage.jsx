import { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const emailRef = useRef(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await login(form);
      navigate(location.state?.from?.pathname || "/app");
    } catch (submitError) {
      setError(submitError.message);
      emailRef.current?.focus();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-[1fr_440px]">
      <div className="panel hidden p-8 lg:block">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">Welcome back</p>
        <h1 className="mt-5 font-display text-4xl font-bold leading-tight">
          Review every project like a senior product engineer.
        </h1>
        <p className="mt-4 max-w-lg leading-8 text-slate-600">
          Access scan history, bookmark the strongest repos, and keep a clean narrative for portfolio and academic evaluation.
        </p>
      </div>

      <div className="panel p-8">
        <h2 className="font-display text-3xl font-bold">Login</h2>
        <p className="mt-2 text-sm text-slate-500">Use your ScanDev account to continue.</p>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">Email</label>
            <input
              ref={emailRef}
              type="email"
              className="input-base"
              placeholder="you@example.com"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">Password</label>
            <input
              type="password"
              className="input-base"
              placeholder="Enter your password"
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
              required
            />
          </div>
          {error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-danger">{error}</p> : null}
          <button type="submit" className="button-primary w-full" disabled={submitting}>
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p className="mt-6 text-sm text-slate-500">
          New here?{" "}
          <Link to="/signup" className="font-semibold text-accent">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
