import { generateScanReport } from "./mockData";
import { readAppState, writeAppState } from "./storage";
import { hasSupabase, supabase } from "./supabaseClient";

export async function getScansByUser(userId) {
  if (hasSupabase) {
    const { data, error } = await supabase
      .from("scans")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data.map(mapSupabaseScan);
  }

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

  if (hasSupabase) {
    const payload = mapLocalScanToSupabase(nextScan);
    const { data, error } = await supabase.from("scans").insert(payload).select().single();

    if (error) {
      throw new Error(error.message);
    }

    return mapSupabaseScan(data);
  }

  const state = readAppState();
  writeAppState({
    ...state,
    scans: [nextScan, ...state.scans],
  });
  return nextScan;
}

export async function deleteScan(scanId) {
  if (hasSupabase) {
    const { error } = await supabase.from("scans").delete().eq("id", scanId);

    if (error) {
      throw new Error(error.message);
    }

    return;
  }

  const state = readAppState();
  writeAppState({
    ...state,
    scans: state.scans.filter((scan) => scan.id !== scanId),
  });
}

export async function toggleBookmark(scanId) {
  if (hasSupabase) {
    const { data: existing, error: fetchError } = await supabase
      .from("scans")
      .select("*")
      .eq("id", scanId)
      .single();

    if (fetchError) {
      throw new Error(fetchError.message);
    }

    const { data, error } = await supabase
      .from("scans")
      .update({ bookmarked: !existing.bookmarked })
      .eq("id", scanId)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return mapSupabaseScan(data);
  }

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
  if (hasSupabase) {
    const { data: existing, error: fetchError } = await supabase
      .from("scans")
      .select("*")
      .eq("id", scanId)
      .single();

    if (fetchError) {
      throw new Error(fetchError.message);
    }

    const checklist = existing.checklist.map((item) =>
      item.id === itemId ? { ...item, checked } : item
    );
    const { data, error } = await supabase
      .from("scans")
      .update({ checklist })
      .eq("id", scanId)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return mapSupabaseScan(data);
  }

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

function mapSupabaseScan(scan) {
  return {
    id: scan.id,
    userId: scan.user_id,
    repoUrl: scan.repo_url,
    projectName: scan.project_name,
    createdAt: scan.created_at,
    score: scan.score,
    status: scan.status,
    bookmarked: scan.bookmarked,
    summary: scan.summary,
    metrics: scan.metrics,
    insights: scan.insights,
    suggestions: scan.suggestions,
    checklist: scan.checklist,
  };
}

function mapLocalScanToSupabase(scan) {
  return {
    id: scan.id,
    user_id: scan.userId,
    repo_url: scan.repoUrl,
    project_name: scan.projectName,
    created_at: scan.createdAt,
    score: scan.score,
    status: scan.status,
    bookmarked: scan.bookmarked,
    summary: scan.summary,
    metrics: scan.metrics,
    insights: scan.insights,
    suggestions: scan.suggestions,
    checklist: scan.checklist,
  };
}
