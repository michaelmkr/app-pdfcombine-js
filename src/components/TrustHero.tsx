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

function IconNoAi() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2a8 8 0 0 1 6.32 12.9L7.1 5.68A7.96 7.96 0 0 1 12 4zM4 12a8 8 0 0 1 1.68-4.9l11.22 11.22A8 8 0 0 1 4 12z"
      />
    </svg>
  )
}

export function TrustHero() {
  return (
    <section className="trust-hero" aria-label="Datenschutz und Funktionsweise">
      <p className="trust-hero__lead">
        Zusammenfügen ohne Upload — DSGVO-freundlich. Ihre Dateien gehen nicht
        an fremde Server; nichts wird in der Cloud verarbeitet. Andere
        Online-Tools schicken PDFs oft an Server (manchmal inkl. KI) — hier
        passiert das Zusammenfügen nur lokal auf Ihrem Gerät, ohne KI-Upload.
      </p>

      <div className="trust-hero__strip" role="list">
        <div className="trust-hero__claim" role="listitem">
          <span className="trust-hero__icon" aria-hidden="true">
            <IconLock />
          </span>
          <div className="trust-hero__claim-text">
            <strong>DSGVO-freundlich</strong>
            <span>Keine Datenweitergabe an Server — gut für sensible Dokumente</span>
          </div>
        </div>
        <div className="trust-hero__claim" role="listitem">
          <span className="trust-hero__icon" aria-hidden="true">
            <IconMonitor />
          </span>
          <div className="trust-hero__claim-text">
            <strong>Alles auf Ihrem Gerät</strong>
            <span>Zusammenfügen nur lokal — kein Konto, kein Cloud-Upload</span>
          </div>
        </div>
        <div className="trust-hero__claim" role="listitem">
          <span className="trust-hero__icon" aria-hidden="true">
            <IconNoAi />
          </span>
          <div className="trust-hero__claim-text">
            <strong>Kein KI-Upload</strong>
            <span>Keine KI-Verarbeitung Ihrer PDFs — nur Zusammenfügen im Browser</span>
          </div>
        </div>
      </div>
    </section>
  )
}
