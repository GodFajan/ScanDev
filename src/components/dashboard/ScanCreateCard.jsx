import { LoaderCircle, Search } from "lucide-react";
import { useRef, useState } from "react";
import { useAppContext } from "../../context/AppContext";

function ScanCreateCard() {
  const inputRef = useRef(null);
  const { addScan } = useAppContext();
  const [repoUrl, setRepoUrl] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleScan = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await addScan(repoUrl.trim());
      setRepoUrl("");
    } catch (submitError) {
      setError(submitError.message);
      inputRef.current?.focus();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="panel overflow-hidden p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Repo analyzer</p>
          <h2 className="mt-2 font-display text-3xl font-bold">Run a new GitHub scan</h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">
            Paste a public repository URL to generate product, UX, and engineering recommendations with a quality score.
          </p>
        </div>
      </div>

      <form onSubmit={handleScan} className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto]">
        <div className="space-y-2">
          <input
            ref={inputRef}
            type="url"
            className="input-base"
            placeholder="https://github.com/owner/repository"
            value={repoUrl}
            onChange={(event) => setRepoUrl(event.target.value)}
            required
          />
          {error ? <p className="text-sm font-medium text-danger">{error}</p> : null}
        </div>
        <button type="submit" className="button-primary gap-2" disabled={submitting}>
          {submitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          {submitting ? "Analyzing..." : "Analyze repo"}
        </button>
      </form>
    </section>
  );
}

export default ScanCreateCard;
