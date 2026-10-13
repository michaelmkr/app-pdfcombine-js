import { IMPRINT_URL } from '../lib/imprint'

export function TrustFooter() {
  return (
    <footer className="trust-footer" aria-label="Datenschutzhinweis">
      <p className="trust-footer__text">
        <span className="trust-footer__mark" aria-hidden="true" />
        Kein Upload · Dateien bleiben auf Ihrem Computer · kein Konto
        {' · '}
        <a href={IMPRINT_URL} target="_blank" rel="noopener noreferrer">
          Impressum
        </a>
      </p>
    </footer>
  )
}
