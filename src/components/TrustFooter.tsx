import { IMPRINT_URL } from '../lib/imprint'

export function TrustFooter() {
  return (
    <footer className="trust-footer" aria-label="Datenschutzhinweis">
      <p className="trust-footer__text">
        <span className="trust-footer__mark" aria-hidden="true" />
        Kein Upload · DSGVO-freundlich · kein KI-Upload · Dateien bleiben auf
        Ihrem Computer
        {' · '}
        <a href={IMPRINT_URL} target="_blank" rel="noopener noreferrer">
          Impressum
        </a>
        {' · '}
        <a href="/llms.txt">llms.txt</a>
      </p>
    </footer>
  )
}
