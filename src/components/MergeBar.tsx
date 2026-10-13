import type { AppStatus } from '../types'
import { formatBytes } from '../lib/loadPdf'

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

function busyLabel(status: AppStatus): string {
  switch (status.phase) {
    case 'loading':
      return 'Reading…'
    case 'thumbs':
      return 'Thumbnails…'
    case 'merging':
      return 'Merging…'
    case 'saving':
      return 'Saving…'
    default:
      return 'Merge & download'
  }
}

function statusLine(status: AppStatus): string | null {
  switch (status.phase) {
    case 'loading':
      return `Reading PDF ${status.current}/${status.total}…`
    case 'thumbs':
      return 'Rendering page thumbnails…'
    case 'merging': {
      const pct =
        status.total > 0
          ? Math.round((status.current / status.total) * 100)
          : 0
      return `Merging page ${status.current}/${status.total}… (${pct}%)`
    }
    case 'saving':
      return 'Saving…'
    default:
      return null
  }
}

function progressRatio(status: AppStatus): number | null {
  if (status.phase === 'merging' && status.total > 0) {
    return Math.min(1, status.current / status.total)
  }
  if (status.phase === 'loading' && status.total > 0) {
    return Math.min(1, status.current / status.total)
  }
  if (status.phase === 'saving') return 0.95
  if (status.phase === 'thumbs') return null
  return null
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
  const line = statusLine(status)
  const ratio = progressRatio(status)

  return (
    <section className="merge-bar" aria-label="Merge and download">
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
                Output filename
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
              {busy ? busyLabel(status) : 'Merge & download'}
            </button>
          </div>
        </div>

        {error ? (
          <p className="merge-bar__error" role="alert">
            {error}
          </p>
        ) : null}
        {line ? (
          <p className="merge-bar__status" aria-live="polite">
            {line}
          </p>
        ) : null}
      </div>
    </section>
  )
}
