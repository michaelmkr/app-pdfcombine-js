import type { AppStatus } from '../types'
import { busyButtonLabel, progressRatio } from '../lib/status'

type MergeBarProps = {
  filename: string
  onFilenameChange: (value: string) => void
  onMerge: () => void
  canMerge: boolean
  status: AppStatus
  error: string | null
  itemCount: number
  pageCount: number
  totalSizeBytes: number
}

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / (1024 * 1024)).toFixed(1)} MB`
}

export function MergeBar({
  filename,
  onFilenameChange,
  onMerge,
  canMerge,
  status,
  error,
  itemCount,
  pageCount,
  totalSizeBytes,
}: MergeBarProps) {
  const busy = status.phase !== 'idle'
  const ratio = progressRatio(status)

  return (
    <section className="merge-bar" aria-label="Merge PDFs">
      {ratio != null ? (
        <div
          className="merge-bar__progress"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(ratio * 100)}
        >
          <div
            className="merge-bar__progress-fill"
            style={{ transform: `scaleX(${ratio})` }}
          />
        </div>
      ) : null}
      <div className="merge-bar__inner">
        <div className="merge-bar__row">
          <div className="merge-bar__stats" aria-live="polite">
            <div className="merge-bar__stat">
              <span className="merge-bar__stat-value">{itemCount}</span>
              <span className="merge-bar__stat-label">
                {itemCount === 1 ? 'item' : 'items'}
              </span>
            </div>
            <div className="merge-bar__stat">
              <span className="merge-bar__stat-value">{pageCount}</span>
              <span className="merge-bar__stat-label">
                {pageCount === 1 ? 'page' : 'pages'}
              </span>
            </div>
            <div className="merge-bar__stat">
              <span className="merge-bar__stat-value">
                {itemCount > 0 ? formatBytes(totalSizeBytes) : '—'}
              </span>
              <span className="merge-bar__stat-label">size</span>
            </div>
          </div>

          <div className="merge-bar__controls">
            <div className="merge-bar__field">
              <label className="merge-bar__label" htmlFor="output-filename">
                Save as
              </label>
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
            </div>
            <button
              type="button"
              className="btn btn--primary btn--lg merge-bar__action"
              disabled={!canMerge || busy}
              onClick={onMerge}
            >
              {busy ? busyButtonLabel(status) : 'Merge PDFs'}
            </button>
          </div>
        </div>

        {error ? (
          <p className="merge-bar__error" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </section>
  )
}
