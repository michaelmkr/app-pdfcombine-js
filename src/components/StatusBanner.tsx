import type { AppStatus } from '../types'

type StatusBannerProps = {
  status: AppStatus
}

function statusMessage(status: AppStatus): string | null {
  switch (status.phase) {
    case 'idle':
      return null
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
  }
}

export function StatusBanner({ status }: StatusBannerProps) {
  const message = statusMessage(status)
  if (!message) return null

  return (
    <p className="status-banner" role="status" aria-live="polite">
      <span className="status-banner__spinner" aria-hidden="true" />
      {message}
    </p>
  )
}
