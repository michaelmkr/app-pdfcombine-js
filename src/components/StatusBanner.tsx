import { useLocale } from '../i18n'
import type { AppStatus } from '../types'
import { statusMessage } from '../lib/status'

type StatusBannerProps = {
  status: AppStatus
}

export function StatusBanner({ status }: StatusBannerProps) {
  const { t } = useLocale()
  const message = statusMessage(status, t.status)
  if (!message) return null

  return (
    <p className="status-banner" role="status" aria-live="polite">
      <span className="status-banner__spinner" aria-hidden="true" />
      {message}
    </p>
  )
}
