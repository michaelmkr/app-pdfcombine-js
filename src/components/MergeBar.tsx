type MergeBarProps = {
  filename: string
  onFilenameChange: (value: string) => void
  onMerge: () => void
  canMerge: boolean
  busy: boolean
  error: string | null
}

export function MergeBar({
  filename,
  onFilenameChange,
  onMerge,
  canMerge,
  busy,
  error,
}: MergeBarProps) {
  return (
    <section className="merge-bar" aria-label="Merge and download">
      <div className="merge-bar__inner">
        <label className="merge-bar__label" htmlFor="output-filename">
          Output filename
        </label>
        <div className="merge-bar__row">
          <input
            id="output-filename"
            type="text"
            className="merge-bar__input"
            value={filename}
            onChange={(e) => onFilenameChange(e.target.value)}
            disabled={busy}
            spellCheck={false}
            autoComplete="off"
          />
          <button
            type="button"
            className="btn btn--primary"
            disabled={!canMerge || busy}
            onClick={onMerge}
          >
            {busy ? 'Working…' : 'Merge & download'}
          </button>
        </div>
        {error ? (
          <p className="merge-bar__error" role="alert">
            {error}
          </p>
        ) : null}
        {busy ? (
          <p className="merge-bar__status" aria-live="polite">
            Working in your browser…
          </p>
        ) : null}
      </div>
    </section>
  )
}
