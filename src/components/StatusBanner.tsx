import type { AppStatus } from '../types'
import { statusMessage } from '../lib/status'

type StatusBannerProps = {
  status: AppStatus
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
