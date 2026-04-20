function ScoreGauge({ score = 0 }) {
  const normalized = Math.min(100, Math.max(0, score * 10));
  const angle = (normalized / 100) * 180;

  return (
    <div className="panel p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Project quality</p>
      <div className="relative mx-auto mt-8 flex h-52 w-full max-w-xs items-end justify-center overflow-hidden">
        <div className="absolute bottom-0 h-44 w-80 rounded-t-full bg-slate-100" />
        <div className="absolute bottom-0 h-36 w-64 rounded-t-full bg-white" />
        <div
          className="absolute bottom-3 h-20 w-1 origin-bottom rounded-full bg-slate-900 transition-transform duration-700"
          style={{ transform: `rotate(${angle - 90}deg)` }}
        />
        <div className="absolute bottom-14 text-center">
          <p className="font-display text-5xl font-bold">{score.toFixed(1)}</p>
          <p className="mt-2 text-sm text-slate-500">Overall score out of 10</p>
        </div>
      </div>
    </div>
  );
}

export default ScoreGauge;
