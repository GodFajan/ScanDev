import { ArrowRight, ChartNoAxesCombined, CheckCheck, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: ChartNoAxesCombined,
    title: "Actionable repo intelligence",
    detail: "Turn raw repositories into scores, issue clusters, improvement plans, and presentation-ready insights.",
  },
  {
    icon: CheckCheck,
    title: "Improvement checklist system",
    detail: "Track fixes across UX, code quality, missing features, and structural debt with a living progress layer.",
  },
  {
    icon: ShieldCheck,
    title: "Built for academic and portfolio review",
    detail: "Explainable metrics, persistent history, and premium polish make it strong for viva and hiring screens.",
  },
];

function LandingPage() {
  return (
    <div className="relative overflow-hidden bg-canvas text-ink">
      <div className="absolute inset-0 bg-grid-fade bg-[size:60px_60px] opacity-70" />
      <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-emerald-100 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 py-8">
        <header className="flex items-center justify-between">
          <div className="inline-flex items-center gap-3 rounded-full border border-accent/15 bg-white/80 px-4 py-2 text-sm font-semibold text-accent shadow-sm">
            <Sparkles className="h-4 w-4" />
            ScanDev
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="button-secondary">
              Login
            </Link>
            <Link to="/signup" className="button-primary">
              Start scanning
            </Link>
          </div>
        </header>

        <section className="grid gap-10 pb-24 pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/90 px-4 py-2 text-sm text-emerald-700 shadow-sm">
              SaaS-grade GitHub project intelligence
            </div>
            <h1 className="mt-6 max-w-3xl font-display text-5xl font-extrabold leading-tight md:text-6xl">
              Analyze repositories like a product team, not a checklist.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              ScanDev turns GitHub repositories into premium review reports with project scoring, UX critiques,
              missing-feature suggestions, architecture feedback, and persistent improvement tracking.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/signup" className="button-primary gap-2">
                Create account
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#features" className="button-secondary">
                Explore features
              </a>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
              {[
                { label: "Avg review time", value: "90s" },
                { label: "Insight categories", value: "12" },
                { label: "Checklist coverage", value: "Full CRUD" },
              ].map((item) => (
                <div key={item.label} className="panel p-4">
                  <p className="text-xl font-bold">{item.value}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel animate-float overflow-hidden p-4">
            <div className="rounded-[26px] bg-slate-950 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/60">Latest report</p>
                  <p className="mt-1 text-xl font-semibold">ScanDev portfolio dashboard</p>
                </div>
                <div className="rounded-2xl bg-white/10 px-4 py-2 text-right">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/45">Project score</p>
                  <p className="mt-1 text-3xl font-bold">8.8</p>
                </div>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {["Code Quality", "Product Scope", "UI/UX", "Architecture"].map((metric, index) => (
                  <div key={metric} className="rounded-3xl bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-white/70">{metric}</p>
                      <p className="text-sm font-semibold">{82 + index * 4}%</p>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-white/10">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-sky-400 to-emerald-300"
                        style={{ width: `${82 + index * 4}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="grid gap-6 pb-20 md:grid-cols-3">
          {features.map(({ icon: Icon, title, detail }, index) => (
            <article
              key={title}
              className={`panel animate-rise p-6 ${index === 1 ? "stagger-1" : index === 2 ? "stagger-2" : ""}`}
            >
              <div className="inline-flex rounded-2xl bg-accent-soft p-3 text-accent">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-5 font-display text-2xl font-bold">{title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{detail}</p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}

export default LandingPage;
