import { useLocale } from '../i18n'
import { AUTHOR_URL, IMPRINT_URL } from '../lib/imprint'
import { GEO_LIVE_URL } from '../lib/geoContent'

export function GeoFaq() {
  const { t } = useLocale()
  const { geo } = t

  return (
    <section className="geo-faq" aria-labelledby="geo-faq-heading">
      <h2 id="geo-faq-heading" className="geo-faq__title">
        {geo.title}
      </h2>
      <p className="geo-faq__intro">{geo.intro}</p>

      <ol className="geo-faq__steps">
        {geo.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>

      <dl className="geo-facts">
        {geo.facts.map((fact) => (
          <div key={fact.id} className="geo-facts__row">
            <dt>{fact.term}</dt>
            <dd>
              {fact.id === 'author' ? (
                <>
                  Michael Macher —{' '}
                  <a href={AUTHOR_URL} target="_blank" rel="noopener noreferrer">
                    michaelmacher.com
                  </a>
                </>
              ) : fact.id === 'liveUrl' ? (
                <a href={GEO_LIVE_URL}>{GEO_LIVE_URL}</a>
              ) : (
                fact.definition
              )}
            </dd>
          </div>
        ))}
      </dl>

      <h3 id="geo-faq-q-heading" className="geo-faq__subtitle">
        {geo.faqHeading}
      </h3>
      <div className="geo-faq__list">
        {geo.faq.map((item) => (
          <details key={item.question} className="geo-faq__item">
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>

      <p className="geo-faq__meta">
        {geo.machineReadable}{' '}
        <a href="/llms.txt">llms.txt</a>
        {' · '}
        <a href="/llms-full.txt">llms-full.txt</a>
        {' · '}
        <a href={IMPRINT_URL} target="_blank" rel="noopener noreferrer">
          {geo.imprint}
        </a>
      </p>
    </section>
  )
}
