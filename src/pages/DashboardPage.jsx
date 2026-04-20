import AnalyticsChart from "../components/dashboard/AnalyticsChart";
import ChecklistPanel from "../components/dashboard/ChecklistPanel";
import HistoryList from "../components/dashboard/HistoryList";
import InsightList from "../components/dashboard/InsightList";
import RepoSummaryCard from "../components/dashboard/RepoSummaryCard";
import ScanCreateCard from "../components/dashboard/ScanCreateCard";
import ScoreGauge from "../components/dashboard/ScoreGauge";
import SkeletonPanel from "../components/dashboard/SkeletonPanel";
import StatCard from "../components/dashboard/StatCard";
import SuggestionsPanel from "../components/dashboard/SuggestionsPanel";
import { useAppContext } from "../context/AppContext";

function DashboardPage() {
  const {
    activeScan,
    activeScanId,
    analytics,
    booting,
    removeScan,
    saveBookmark,
    saveChecklist,
    scans,
    setActiveScanId,
  } = useAppContext();

  if (booting) {
    return (
      <div className="space-y-6">
        <SkeletonPanel className="h-44" />
        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
          <SkeletonPanel className="h-[420px]" />
          <SkeletonPanel className="h-[420px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ScanCreateCard />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total scans" value={analytics?.totalScans ?? 0} hint="Persistent analysis history per user" />
        <StatCard label="Average score" value={analytics?.averageScore ?? "0.0"} hint="Quality trend across repositories" />
        <StatCard label="Saved reports" value={analytics?.bookmarked ?? 0} hint="Bookmarked scans for faster revisit" />
        <StatCard label="Top score" value={analytics?.topScore ?? 0} hint="Best current project health signal" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <RepoSummaryCard scan={activeScan} onToggleBookmark={saveBookmark} />
        <ScoreGauge score={activeScan?.score ?? 0} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <HistoryList scans={scans} activeScanId={activeScanId} onSelect={setActiveScanId} onDelete={removeScan} />
        <AnalyticsChart points={analytics?.trend ?? []} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <SuggestionsPanel scan={activeScan} />
        <ChecklistPanel scan={activeScan} onToggle={saveChecklist} />
      </section>

      <InsightList scan={activeScan} />
    </div>
  );
}

export default DashboardPage;
