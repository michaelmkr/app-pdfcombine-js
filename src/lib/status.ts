import type { Messages } from '../i18n'
import type { AppStatus } from '../types'

/** Human-readable progress copy for the status banner. */
export function statusMessage(
  status: AppStatus,
  t: Messages['status'],
): string | null {
  switch (status.phase) {
    case 'idle':
      return null
    case 'loading':
      return t.opening(status.current, status.total)
    case 'thumbs':
      return t.thumbs
    case 'merging': {
      const pct =
        status.total > 0
          ? Math.round((status.current / status.total) * 100)
          : 0
      return t.combining(status.current, status.total, pct)
    }
    case 'saving':
      return t.saving
  }
}

/** Short label for the merge button while work is in progress. */
export function busyButtonLabel(
  status: AppStatus,
  t: Messages['status'],
  mergeLabel: string,
): string {
  switch (status.phase) {
    case 'loading':
      return t.busyOpening
    case 'thumbs':
      return t.busyThumbs
    case 'merging':
      return t.busyCombining
    case 'saving':
      return t.busySaving
    default:
      return mergeLabel
  }
}

/** 0–1 progress for the merge-bar meter; null when indeterminate. */
export function progressRatio(status: AppStatus): number | null {
  if (status.phase === 'merging' && status.total > 0) {
    return Math.min(1, status.current / status.total)
  }
  if (status.phase === 'loading' && status.total > 0) {
    return Math.min(1, status.current / status.total)
  }
  if (status.phase === 'saving') return 0.95
  return null
}
