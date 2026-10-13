import type { AppStatus } from '../types'

/** Human-readable progress copy for the status banner. */
export function statusMessage(status: AppStatus): string | null {
  switch (status.phase) {
    case 'idle':
      return null
    case 'loading':
      return `Opening PDF ${status.current} of ${status.total}…`
    case 'thumbs':
      return 'Creating page previews…'
    case 'merging': {
      const pct =
        status.total > 0
          ? Math.round((status.current / status.total) * 100)
          : 0
      return `Combining page ${status.current} of ${status.total}… (${pct}%)`
    }
    case 'saving':
      return 'Saving your PDF…'
  }
}

/** Short label for the merge button while work is in progress. */
export function busyButtonLabel(status: AppStatus): string {
  switch (status.phase) {
    case 'loading':
      return 'Opening…'
    case 'thumbs':
      return 'Previews…'
    case 'merging':
      return 'Combining…'
    case 'saving':
      return 'Saving…'
    default:
      return 'Merge PDFs'
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
