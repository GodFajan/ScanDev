function ChecklistPanel({ scan, onToggle }) {
  if (!scan) {
    return null;
  }

  return (
    <section className="panel p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Improvement checklist</p>
      <div className="mt-6 space-y-3">
        {scan.checklist.map((item) => (
          <label
            key={item.id}
            className={`flex cursor-pointer items-center gap-4 rounded-[24px] border px-4 py-4 transition ${
              item.checked
                ? "border-emerald-200 bg-emerald-50"
                : "border-slate-200 bg-white hover:border-accent/35"
            }`}
          >
            <input
              type="checkbox"
              checked={item.checked}
              onChange={(event) => onToggle(scan.id, item.id, event.target.checked)}
              className="h-5 w-5 rounded border-slate-300 text-accent focus:ring-accent"
            />
            <span className="text-sm font-semibold text-slate-700">{item.label}</span>
          </label>
        ))}
      </div>
    </section>
  );
}

export default ChecklistPanel;
