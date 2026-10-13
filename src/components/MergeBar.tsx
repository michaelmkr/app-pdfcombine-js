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

  return (
    <section className="merge-bar" aria-label="Merge and download">
      <div className="merge-bar__inner">
        {itemCount > 0 ? (
          <p className="merge-bar__totals">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} · {pageCount}{' '}
            {pageCount === 1 ? 'page' : 'pages'} · ~{formatBytes(totalSizeBytes)}
          </p>
        ) : null}
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
            {busy ? busyLabel(status) : 'Merge & download'}
          </button>
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
