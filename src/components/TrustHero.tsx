const IMPRINT_URL = 'https://michaelmacher.com/imprint'

function IconLock() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5zm3 8H9V7a3 3 0 1 1 6 0v3z"
      />
    </svg>
  )
}

function IconMonitor() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-5l1 2v1H8v-1l1-2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v9h16V6H4z"
      />
    </svg>
  )
}

function IconOffline() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 2a7 7 0 0 1 6.32 4H5.68A7 7 0 0 1 12 5zm-7 7h14a7 7 0 0 1-14 0z"
      />
    </svg>
  )
}

export function TrustHero() {
  return (
    <section className="trust-hero" aria-label="Datenschutz und Funktionsweise">
      <p className="trust-hero__lead">
        Dateien bleiben hier. Der Server sieht nur die Website — Zusammenfügen
        läuft ausschließlich in Ihrem Browser.
      </p>

      <div className="trust-hero__strip" role="list">
        <div className="trust-hero__claim" role="listitem">
          <span className="trust-hero__icon" aria-hidden="true">
            <IconLock />
          </span>
          <div className="trust-hero__claim-text">
            <strong>Kein Upload</strong>
            <span>PDFs verlassen dieses Gerät nicht</span>
          </div>
        </div>
        <div className="trust-hero__claim" role="listitem">
          <span className="trust-hero__icon" aria-hidden="true">
            <IconMonitor />
          </span>
          <div className="trust-hero__claim-text">
            <strong>Nur lokal</strong>
            <span>Verarbeitung im Browser, kein Konto</span>
          </div>
        </div>
        <div className="trust-hero__claim" role="listitem">
          <span className="trust-hero__icon" aria-hidden="true">
            <IconOffline />
          </span>
          <div className="trust-hero__claim-text">
            <strong>Offline tauglich</strong>
            <span>Nach dem Laden ohne Netz nutzbar</span>
          </div>
        </div>
      </div>

      <p className="trust-hero__imprint">
        <a href={IMPRINT_URL} target="_blank" rel="noopener noreferrer">
          Impressum
        </a>
      </p>
    </section>
  )
}
