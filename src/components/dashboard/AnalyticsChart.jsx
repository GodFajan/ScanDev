function AnalyticsChart({ points = [] }) {
  const max = Math.max(...points.map((point) => point.value), 10);

  return (
    <div className="panel h-full p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Trend line</p>
          <h3 className="mt-2 font-display text-2xl font-bold">Recent repo scores</h3>
        </div>
      </div>
      <div className="mt-8 flex h-64 items-end gap-4">
        {points.length ? (
          points.map((point) => {
            const height = `${Math.max(24, (point.value / max) * 100)}%`;

            return (
              <div key={point.label} className="flex flex-1 flex-col items-center gap-3">
                <div className="relative flex h-full w-full items-end justify-center rounded-[28px] bg-slate-100 p-3">
                  <div
                    className="w-full rounded-[20px] bg-gradient-to-t from-accent to-sky-300 transition-all duration-500"
                    style={{ height }}
                  />
                  <span className="absolute top-3 text-xs font-bold text-accent">{point.value}</span>
                </div>
                <span className="line-clamp-2 text-center text-xs font-semibold text-slate-500">{point.label}</span>
              </div>
            );
          })
        ) : (
          <div className="flex w-full items-center justify-center rounded-[28px] border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500">
            Run a scan to populate analytics.
          </div>
        )}
      </div>
    </div>
  );
}

export default AnalyticsChart;
