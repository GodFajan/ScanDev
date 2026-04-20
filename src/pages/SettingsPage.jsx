import { Database, ShieldCheck, Sparkles } from "lucide-react";
import { hasFirebase } from "../services/firebaseClient";

function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="panel p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Workspace settings</p>
        <h1 className="mt-2 font-display text-4xl font-bold">Environment and product configuration</h1>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="panel p-6">
          <div className="inline-flex rounded-2xl bg-accent-soft p-3 text-accent">
            <Database className="h-5 w-5" />
          </div>
          <h2 className="mt-5 font-display text-2xl font-bold">Backend mode</h2>
          <p className="mt-3 leading-7 text-slate-600">
            {hasFirebase
              ? "Firebase configuration detected. Authentication is running through your Firebase project."
              : "Firebase config is not present, so ScanDev is using persistent local storage for demo auth and scan data."}
          </p>
        </div>

        <div className="panel p-6">
          <div className="inline-flex rounded-2xl bg-emerald-100 p-3 text-emerald-700">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h2 className="mt-5 font-display text-2xl font-bold">Protected access</h2>
          <p className="mt-3 leading-7 text-slate-600">
            Login, signup, route protection, session persistence, and per-user scan history are enabled.
          </p>
        </div>

        <div className="panel p-6">
          <div className="inline-flex rounded-2xl bg-amber-100 p-3 text-amber-700">
            <Sparkles className="h-5 w-5" />
          </div>
          <h2 className="mt-5 font-display text-2xl font-bold">Future scope</h2>
          <p className="mt-3 leading-7 text-slate-600">
            Add GitHub API integration, true code parsing, AI-generated recommendations, and team collaboration workflows.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
