function InsightList({ scan }) {
  if (!scan) {
    return null;
  }

  return (
    <section className="panel p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Key insights</p>
      <div className="mt-6 space-y-4">
        {scan.insights.map((insight, index) => (
          <div key={insight} className="flex gap-4 rounded-[24px] border border-slate-200 bg-white p-5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-accent text-sm font-bold text-white">
              {index + 1}
            </div>
            <p className="text-sm leading-7 text-slate-600">{insight}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default InsightList;
