import FilterBar from "../components/dashboard/FilterBar";
import HistoryList from "../components/dashboard/HistoryList";
import { useAppContext } from "../context/AppContext";
import { useRepoFilters } from "../hooks/useRepoFilters";

function ScanHistoryPage() {
  const { scans, activeScanId, removeScan, setActiveScanId } = useAppContext();
  const { filteredScans, query, setQuery, setStatus, status } = useRepoFilters(scans);

  return (
    <div className="space-y-6">
      <div className="panel p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">History explorer</p>
        <h1 className="mt-2 font-display text-4xl font-bold">Search and filter every repo scan</h1>
        <p className="mt-3 max-w-2xl leading-7 text-slate-500">
          Review past scans, focus on top-performing projects, and quickly navigate to the reports that matter most.
        </p>
      </div>
      <FilterBar query={query} status={status} onQueryChange={setQuery} onStatusChange={setStatus} />
      <HistoryList
        scans={filteredScans}
        activeScanId={activeScanId}
        onSelect={setActiveScanId}
        onDelete={removeScan}
      />
    </div>
  );
}

export default ScanHistoryPage;
