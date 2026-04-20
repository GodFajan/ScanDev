import { useMemo, useState } from "react";
import { useAppContext } from "../context/AppContext";

function ComparePage() {
  const { scans } = useAppContext();
  const [leftId, setLeftId] = useState(scans[0]?.id ?? "");
  const [rightId, setRightId] = useState(scans[1]?.id ?? scans[0]?.id ?? "");

  const [leftScan, rightScan] = useMemo(() => {
    return [scans.find((scan) => scan.id === leftId), scans.find((scan) => scan.id === rightId)];
  }, [leftId, rightId, scans]);

  return (
    <div className="space-y-6">
      <div className="panel p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Comparison lab</p>
        <h1 className="mt-2 font-display text-4xl font-bold">Compare two repositories side by side</h1>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {[{ value: leftId, setter: setLeftId, label: "Repository A" }, { value: rightId, setter: setRightId, label: "Repository B" }].map((field) => (
          <div key={field.label} className="panel p-5">
            <label className="mb-3 block text-sm font-semibold text-slate-500">{field.label}</label>
            <select
              className="input-base"
              value={field.value}
              onChange={(event) => field.setter(event.target.value)}
            >
              {scans.map((scan) => (
                <option key={scan.id} value={scan.id}>
                  {scan.projectName} ({scan.score})
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {[leftScan, rightScan].map((scan, index) => (
          <div key={scan?.id ?? index} className="panel p-6">
            {scan ? (
              <>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
                  {index === 0 ? "Repository A" : "Repository B"}
                </p>
                <h2 className="mt-2 font-display text-3xl font-bold capitalize">{scan.projectName}</h2>
                <p className="mt-4 text-sm text-slate-500">{scan.repoUrl}</p>
                <div className="mt-6 grid gap-3">
                  {scan.metrics.map((metric) => (
                    <div key={metric.label}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold text-slate-600">{metric.label}</span>
                        <span className="font-bold text-ink">{metric.value}%</span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-slate-100">
                        <div className="h-2 rounded-full bg-gradient-to-r from-accent to-emerald-400" style={{ width: `${metric.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-sm text-slate-500">Create at least one scan to enable comparison.</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComparePage;
