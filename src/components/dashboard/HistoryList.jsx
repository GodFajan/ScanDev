import { Bookmark, Trash2 } from "lucide-react";

function HistoryList({ scans, activeScanId, onSelect, onDelete }) {
  return (
    <section className="panel p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Scan history</p>
          <h3 className="mt-2 font-display text-2xl font-bold">Recent project analyses</h3>
        </div>
      </div>
      <div className="mt-6 space-y-3">
        {scans.length ? (
          scans.map((scan) => (
            <article
              key={scan.id}
              className={`rounded-[24px] border p-4 transition ${
                scan.id === activeScanId
                  ? "border-accent bg-accent/5"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <button type="button" className="min-w-0 flex-1 text-left" onClick={() => onSelect(scan.id)}>
                  <div className="flex items-center gap-2">
                    <p className="truncate font-display text-lg font-bold capitalize">{scan.projectName}</p>
                    {scan.bookmarked ? <Bookmark className="h-4 w-4 fill-current text-amber-500" /> : null}
                  </div>
                  <p className="mt-1 truncate text-sm text-slate-500">{scan.repoUrl}</p>
                  <div className="mt-3 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    <span>{new Date(scan.createdAt).toLocaleDateString()}</span>
                    <span>Score {scan.score}</span>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(scan.id)}
                  className="rounded-2xl bg-slate-100 p-3 text-slate-500 transition hover:bg-red-50 hover:text-danger"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-[24px] border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
            No scan history yet. Analyze your first GitHub repository to populate this view.
          </div>
        )}
      </div>
    </section>
  );
}

export default HistoryList;
