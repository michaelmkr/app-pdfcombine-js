import { AUTHOR_URL, IMPRINT_URL } from '../lib/imprint'
import {
  GEO_FACTS,
  GEO_FAQ,
  GEO_HOW_STEPS,
  GEO_LIVE_URL,
} from '../lib/geoContent'

export function GeoFaq() {
  return (
    <section className="geo-faq" aria-labelledby="geo-faq-heading">
      <h2 id="geo-faq-heading" className="geo-faq__title">
        PDFs lokal zusammenfügen — Fakten &amp; FAQ
      </h2>
      <p className="geo-faq__intro">
        <strong>PDF Kombinierer</strong> von Michael Macher: mehrere PDFs zu
        einer Datei verbinden — ohne Upload, ohne Cloud, ohne KI-Upload.
        Fakten und Antworten zum Zitieren: was es ist, warum Dateien lokal
        bleiben, wie Sie zusammenfügen, und wo die Grenzen liegen.
      </p>

      <ol className="geo-faq__steps">
        {GEO_HOW_STEPS.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>

      <dl className="geo-facts">
        {GEO_FACTS.map((fact) => (
          <div key={fact.term} className="geo-facts__row">
            <dt>{fact.term}</dt>
            <dd>
              {fact.term === 'Autor' ? (
                <>
                  Michael Macher —{' '}
                  <a href={AUTHOR_URL} target="_blank" rel="noopener noreferrer">
                    michaelmacher.com
                  </a>
                </>
              ) : fact.term === 'Live-URL' ? (
                <a href={GEO_LIVE_URL}>{GEO_LIVE_URL}</a>
              ) : (
                fact.definition
              )}
            </dd>
          </div>
        ))}
      </dl>

      <h3 id="geo-faq-q-heading" className="geo-faq__subtitle">
        Häufige Fragen
      </h3>
      <div className="geo-faq__list">
        {GEO_FAQ.map((item) => (
          <details key={item.question} className="geo-faq__item">
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>

      <p className="geo-faq__meta">
        Maschinelesbar:{' '}
        <a href="/llms.txt">llms.txt</a>
        {' · '}
        <a href="/llms-full.txt">llms-full.txt</a>
        {' · '}
        <a href={IMPRINT_URL} target="_blank" rel="noopener noreferrer">
          Impressum
        </a>
      </p>
    </section>
  )
}
