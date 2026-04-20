import { ExternalLink, Star } from "lucide-react";

function RepoSummaryCard({ scan, onToggleBookmark }) {
  if (!scan) {
    return (
      <div className="panel flex min-h-[280px] items-center justify-center p-6 text-center text-slate-500">
        Add your first repository to start building insight history.
      </div>
    );
  }

  return (
    <div className="panel p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Summary</p>
          <h3 className="mt-2 font-display text-3xl font-bold capitalize">{scan.projectName}</h3>
          <a
            href={scan.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-accent"
          >
            Open repository
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
        <button
          type="button"
          onClick={() => onToggleBookmark(scan.id)}
          className={`inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
            scan.bookmarked ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          <Star className={`h-4 w-4 ${scan.bookmarked ? "fill-current" : ""}`} />
          {scan.bookmarked ? "Saved report" : "Save report"}
        </button>
      </div>

      <p className="mt-5 max-w-3xl leading-7 text-slate-600">{scan.summary}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {scan.metrics.map((metric) => (
          <div key={metric.label} className="panel-muted p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-500">{metric.label}</p>
              <span className="text-sm font-bold text-ink">{metric.value}%</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-white">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-accent to-emerald-400"
                style={{ width: `${metric.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RepoSummaryCard;
