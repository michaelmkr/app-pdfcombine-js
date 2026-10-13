import { useLocale } from '../i18n'
import type { SkipReason, SkippedFile } from '../types'

type WarningListProps = {
  skipped: SkippedFile[]
  addedCount: number
  onDismiss: () => void
}

export function WarningList({ skipped, addedCount, onDismiss }: WarningListProps) {
  const { t } = useLocale()

  if (skipped.length === 0) return null

  function skipReasonMessage(reason: SkipReason): string {
    switch (reason) {
      case 'encrypted':
        return t.warnings.encrypted
      case 'corrupt':
        return t.warnings.corrupt
      case 'not-pdf':
        return t.warnings.notPdf
    }
  }

  return (
    <div className="warning-list" role="alert">
      <div className="warning-list__header">
        <p className="warning-list__summary">
          {t.warnings.summary(addedCount, skipped.length)}
        </p>
        <button
          type="button"
          className="btn btn--ghost btn--sm"
          onClick={onDismiss}
        >
          {t.warnings.dismiss}
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
