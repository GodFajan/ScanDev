import { useMemo, useState } from "react";

export function useRepoFilters(scans) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  const filteredScans = useMemo(() => {
    return scans.filter((scan) => {
      const matchesQuery = [scan.projectName, scan.repoUrl]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase());

      const matchesStatus =
        status === "all" ? true : status === "bookmarked" ? scan.bookmarked : scan.score >= 8;

      return matchesQuery && matchesStatus;
    });
  }, [query, scans, status]);

  return {
    query,
    status,
    setQuery,
    setStatus,
    filteredScans,
  };
}
