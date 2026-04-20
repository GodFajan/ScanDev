import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await signup(form);
      navigate("/app");
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-[1fr_440px]">
      <div className="panel hidden p-8 lg:block">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">Launch your workspace</p>
        <h1 className="mt-5 font-display text-4xl font-bold leading-tight">
          Build a developer analysis workflow that looks portfolio-ready from day one.
        </h1>
        <p className="mt-4 max-w-lg leading-8 text-slate-600">
          Persistent reports, protected routes, analytics, and clean UI polish are all wired into the platform architecture.
        </p>
      </div>

      <div className="panel p-8">
        <h2 className="font-display text-3xl font-bold">Create account</h2>
        <p className="mt-2 text-sm text-slate-500">Set up your ScanDev workspace.</p>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">Full name</label>
            <input
              type="text"
              className="input-base"
              placeholder="Aarav Sharma"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-600">Email</label>
            <input
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
              placeholder="Create a secure password"
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
              required
            />
          </div>
          {error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-danger">{error}</p> : null}
          <button type="submit" className="button-primary w-full" disabled={submitting}>
            {submitting ? "Creating account..." : "Create workspace"}
          </button>
        </form>
        <p className="mt-6 text-sm text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-accent">
            Login instead
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
