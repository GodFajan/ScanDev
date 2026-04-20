function FilterBar({ query, status, onQueryChange, onStatusChange }) {
  return (
    <div className="panel flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
      <input
        type="search"
        className="input-base max-w-xl"
        placeholder="Search by project name or repository URL"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />
      <div className="flex flex-wrap gap-2">
        {[
          { value: "all", label: "All scans" },
          { value: "bookmarked", label: "Bookmarked" },
          { value: "high-score", label: "High score" },
        ].map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onStatusChange(option.value)}
            className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
              status === option.value
                ? "bg-ink text-white"
                : "border border-slate-200 bg-white text-slate-500 hover:border-accent hover:text-accent"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterBar;
