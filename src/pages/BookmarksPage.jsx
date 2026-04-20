import { useMemo } from "react";
import HistoryList from "../components/dashboard/HistoryList";
import { useAppContext } from "../context/AppContext";

function BookmarksPage() {
  const { scans, activeScanId, removeScan, setActiveScanId } = useAppContext();
  const bookmarkedScans = useMemo(() => scans.filter((scan) => scan.bookmarked), [scans]);

  return (
    <div className="space-y-6">
      <div className="panel p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Saved reports</p>
        <h1 className="mt-2 font-display text-4xl font-bold">Bookmark the repos worth revisiting</h1>
        <p className="mt-3 max-w-2xl leading-7 text-slate-500">
          Keep your strongest analyses ready for demos, evaluation, and iteration planning.
        </p>
      </div>
      <HistoryList
        scans={bookmarkedScans}
        activeScanId={activeScanId}
        onSelect={setActiveScanId}
        onDelete={removeScan}
      />
    </div>
  );
}

export default BookmarksPage;
