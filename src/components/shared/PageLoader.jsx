function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas">
      <div className="panel flex items-center gap-4 px-8 py-6">
        <div className="h-4 w-4 rounded-full bg-accent animate-pulse-soft" />
        <p className="text-sm font-semibold text-slate-500">Loading ScanDev...</p>
      </div>
    </div>
  );
}

export default PageLoader;
