function SuggestionsPanel({ scan }) {
  if (!scan) {
    return null;
  }

  return (
    <section className="panel p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Recommendations</p>
      <div className="mt-6 space-y-4">
        {scan.suggestions.map((item) => (
          <article key={item.title} className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-display text-xl font-bold">{item.title}</h3>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-accent">
                {item.type}
              </span>
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-600">{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default SuggestionsPanel;
