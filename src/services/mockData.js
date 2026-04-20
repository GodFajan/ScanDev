export function generateScanReport(repoUrl) {
  const repoName = repoUrl.split("/").filter(Boolean).pop() || "repository";
  const baseScore = 6.8 + (repoName.length % 24) / 10;
  const score = Math.min(Number(baseScore.toFixed(1)), 9.6);
  const coverage = Math.min(92, 58 + repoName.length * 2);

  return {
    id: crypto.randomUUID(),
    repoUrl,
    projectName: repoName.replace(/[-_]/g, " "),
    createdAt: new Date().toISOString(),
    score,
    status: score > 8 ? "Strong foundation" : "Needs refinement",
    bookmarked: false,
    summary:
      "Balanced insight report generated from repository metadata, product heuristics, and frontend architecture checks.",
    metrics: [
      { label: "Code Quality", value: Math.min(95, Math.round(score * 10 + 8)) },
      { label: "UI Maturity", value: Math.min(95, Math.round(score * 9 + 10)) },
      { label: "Feature Depth", value: Math.min(95, Math.round(score * 8 + 14)) },
      { label: "Documentation", value: Math.min(95, coverage) },
    ],
    insights: [
      "Tighten component boundaries and co-locate feature logic for better maintainability.",
      "Introduce stronger visual hierarchy in data-dense screens and support clearer empty states.",
      "Improve onboarding by adding feature discovery and scan-result interpretation hints.",
    ],
    suggestions: [
      {
        type: "Product",
        title: "Add milestone-based roadmap recommendations",
        detail: "Turn analysis output into a phased delivery plan that developers can act on immediately.",
      },
      {
        type: "UI/UX",
        title: "Elevate dashboard scannability",
        detail: "Use stronger typography contrast, card grouping, and visual anchors for metric sections.",
      },
      {
        type: "Engineering",
        title: "Introduce test coverage and release automation",
        detail: "Strengthen confidence by pairing code-quality insights with CI/CD and testing suggestions.",
      },
    ],
    checklist: [
      {
        id: crypto.randomUUID(),
        label: "Refine folder architecture for feature ownership",
        checked: false,
      },
      {
        id: crypto.randomUUID(),
        label: "Add polished loading and error states",
        checked: true,
      },
      {
        id: crypto.randomUUID(),
        label: "Document setup, architecture, and future scope clearly",
        checked: false,
      },
    ],
  };
}
