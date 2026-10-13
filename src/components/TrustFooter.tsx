const IMPRINT_URL = 'https://michaelmacher.com/imprint'

export function TrustFooter() {
  return (
    <footer className="trust-footer" aria-label="Datenschutzhinweis">
      <p className="trust-footer__text">
        Ihre PDFs verlassen dieses Gerät nicht. Zusammenfügen läuft nur im
        Browser — kein Upload, kein Konto.
        {' '}
        <a
          href={IMPRINT_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Impressum
        </a>
      </p>
    </footer>
  )
}
