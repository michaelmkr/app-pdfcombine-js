import type { SkipReason, SkippedFile } from '../types'

type WarningListProps = {
  skipped: SkippedFile[]
  addedCount: number
  onDismiss: () => void
}

function skipReasonMessage(reason: SkipReason): string {
  switch (reason) {
    case 'encrypted':
      return 'password-protected. This tool cannot open encrypted PDFs.'
    case 'corrupt':
      return 'could not be read (corrupt or unsupported).'
    case 'not-pdf':
      return 'is not a PDF file.'
  }
}

export function WarningList({ skipped, addedCount, onDismiss }: WarningListProps) {
  if (skipped.length === 0) return null

  return (
    <div className="warning-list" role="alert">
      <div className="warning-list__header">
        <p className="warning-list__summary">
          Added {addedCount} PDF{addedCount === 1 ? '' : 's'}; skipped{' '}
          {skipped.length} file{skipped.length === 1 ? '' : 's'}.
        </p>
        <button
          type="button"
          className="btn btn--ghost btn--sm"
          onClick={onDismiss}
        >
          Dismiss
        </button>
      </div>
      <ul className="warning-list__items">
        {skipped.map((s, i) => (
          <li key={`${s.name}-${s.reason}-${i}`}>
            <strong>{s.name}</strong> — {skipReasonMessage(s.reason)}
          </li>
        ))}
      </ul>
    </div>
  )
}
