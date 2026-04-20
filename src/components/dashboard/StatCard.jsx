function StatCard({ label, value, hint }) {
  return (
    <div className="panel p-5">
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className="mt-3 font-display text-4xl font-bold">{value}</p>
      <p className="mt-3 text-sm text-slate-500">{hint}</p>
    </div>
  );
}

export default StatCard;
