import { generateScanReport } from "./mockData";
import { readAppState, writeAppState } from "./storage";

export async function getScansByUser(userId) {
  const state = readAppState();
  return state.scans
    .filter((scan) => scan.userId === userId)
    .sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt));
}

export async function createScan(userId, repoUrl) {
  if (!repoUrl.includes("github.com/")) {
    throw new Error("Enter a valid GitHub repository URL.");
  }

  const nextScan = {
    ...generateScanReport(repoUrl),
    userId,
  };

  const state = readAppState();
  writeAppState({
    ...state,
    scans: [nextScan, ...state.scans],
  });
  return nextScan;
}

export async function deleteScan(scanId) {
  const state = readAppState();
  writeAppState({
    ...state,
    scans: state.scans.filter((scan) => scan.id !== scanId),
  });
}

export async function toggleBookmark(scanId) {
  const state = readAppState();
  let updatedScan = null;

  const scans = state.scans.map((scan) => {
    if (scan.id !== scanId) {
      return scan;
    }

    updatedScan = {
      ...scan,
      bookmarked: !scan.bookmarked,
    };
    return updatedScan;
  });

  writeAppState({ ...state, scans });
  return updatedScan;
}

export async function updateChecklistItem(scanId, itemId, checked) {
  const state = readAppState();
  let updatedScan = null;

  const scans = state.scans.map((scan) => {
    if (scan.id !== scanId) {
      return scan;
    }

    updatedScan = {
      ...scan,
      checklist: scan.checklist.map((item) =>
        item.id === itemId ? { ...item, checked } : item
      ),
    };
    return updatedScan;
  });

  writeAppState({ ...state, scans });
  return updatedScan;
}

export function getAnalytics(scans) {
  const totalScans = scans.length;
  const averageScore = totalScans
    ? (scans.reduce((sum, scan) => sum + scan.score, 0) / totalScans).toFixed(1)
    : "0.0";
  const bookmarked = scans.filter((scan) => scan.bookmarked).length;
  const topScore = scans[0]?.score ?? 0;

  return {
    totalScans,
    averageScore,
    bookmarked,
    topScore,
    trend: scans.slice(0, 5).map((scan) => ({
      label: scan.projectName,
      value: scan.score,
    })),
  };
}
