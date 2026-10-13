import { useLocale } from '../i18n'
import { IMPRINT_URL } from '../lib/imprint'

export function TrustFooter() {
  const { t } = useLocale()

  return (
    <footer className="trust-footer" aria-label={t.footer.aria}>
      <p className="trust-footer__text">
        <span className="trust-footer__mark" aria-hidden="true" />
        {t.footer.text}
        {' · '}
        <a href={IMPRINT_URL} target="_blank" rel="noopener noreferrer">
          {t.footer.imprint}
        </a>
        {' · '}
        <a href="/llms.txt">llms.txt</a>
      </p>
    </footer>
  )
}
