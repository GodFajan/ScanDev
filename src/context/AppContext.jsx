import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuth } from "./AuthContext";
import {
  createScan,
  deleteScan,
  getAnalytics,
  getScansByUser,
  toggleBookmark,
  updateChecklistItem,
} from "../services/scanService";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const { user } = useAuth();
  const [scans, setScans] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [activeScanId, setActiveScanId] = useState(null);
  const [booting, setBooting] = useState(true);

  const hydrate = useCallback(async () => {
    if (!user) {
      setScans([]);
      setAnalytics(null);
      setActiveScanId(null);
      setBooting(false);
      return;
    }

    setBooting(true);
    const nextScans = await getScansByUser(user.id);
    setScans(nextScans);
    setActiveScanId((currentId) => currentId ?? nextScans[0]?.id ?? null);
    setAnalytics(getAnalytics(nextScans));
    setBooting(false);
  }, [user]);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const addScan = useCallback(
    async (repoUrl) => {
      if (!user) {
        throw new Error("A signed-in user is required.");
      }

      const nextScan = await createScan(user.id, repoUrl);
      setScans((current) => [nextScan, ...current]);
      setActiveScanId(nextScan.id);
      return nextScan;
    },
    [user]
  );

  const removeScan = useCallback(async (scanId) => {
    await deleteScan(scanId);
    setScans((current) => current.filter((scan) => scan.id !== scanId));
    setActiveScanId((currentId) => (currentId === scanId ? null : currentId));
  }, []);

  const saveChecklist = useCallback(async (scanId, itemId, checked) => {
    const updated = await updateChecklistItem(scanId, itemId, checked);
    setScans((current) =>
      current.map((scan) => (scan.id === updated.id ? updated : scan))
    );
  }, []);

  const saveBookmark = useCallback(async (scanId) => {
    const updated = await toggleBookmark(scanId);
    setScans((current) =>
      current.map((scan) => (scan.id === updated.id ? updated : scan))
    );
  }, []);

  useEffect(() => {
    setAnalytics(getAnalytics(scans));
  }, [scans]);

  const activeScan = useMemo(
    () => scans.find((scan) => scan.id === activeScanId) ?? scans[0] ?? null,
    [activeScanId, scans]
  );

  const value = useMemo(
    () => ({
      scans,
      analytics,
      activeScan,
      activeScanId,
      booting,
      setActiveScanId,
      addScan,
      removeScan,
      saveChecklist,
      saveBookmark,
      refreshScans: hydrate,
    }),
    [
      activeScan,
      activeScanId,
      addScan,
      analytics,
      booting,
      hydrate,
      removeScan,
      saveBookmark,
      saveChecklist,
      scans,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }

  return context;
}
