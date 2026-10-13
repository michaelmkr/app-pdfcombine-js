const IMPRINT_URL = 'https://michaelmacher.com/imprint'

export function TrustHero() {
  return (
    <section className="trust-hero" aria-label="Datenschutz und Funktionsweise">
      <p className="trust-hero__lead">
        Dateien bleiben auf diesem Computer. Der Server liefert nur die Website
        (HTML und JavaScript). Zusammenfügen passiert im Browser — nichts wird
        hochgeladen.
      </p>

      <ol className="trust-hero__steps">
        <li>
          <span className="trust-hero__step-label">Hochladen</span>
          <span className="trust-hero__step-hint">nur lokal</span>
        </li>
        <li>
          <span className="trust-hero__step-label">Sortieren</span>
          <span className="trust-hero__step-hint">Seiten &amp; Dateien</span>
        </li>
        <li>
          <span className="trust-hero__step-label">Herunterladen</span>
          <span className="trust-hero__step-hint">fertige PDF</span>
        </li>
      </ol>

      <ul className="trust-hero__cues">
        <li>Kein Account</li>
        <li>Kein Upload</li>
        <li>Offline nach dem Laden</li>
        <li>
          <a
            href={IMPRINT_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Impressum
          </a>
        </li>
      </ul>
    </section>
  )
}
