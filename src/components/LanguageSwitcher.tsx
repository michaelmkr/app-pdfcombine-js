import { useLocale, type Locale } from '../i18n'

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale()

  function select(next: Locale) {
    if (next === locale) return
    setLocale(next)
  }

  return (
    <div className="lang-switch" role="group" aria-label={t.lang.aria}>
      <button
        type="button"
        className={`lang-switch__btn${locale === 'de' ? ' lang-switch__btn--active' : ''}`}
        aria-pressed={locale === 'de'}
        onClick={() => select('de')}
      >
        {t.lang.de}
      </button>
      <button
        type="button"
        className={`lang-switch__btn${locale === 'en' ? ' lang-switch__btn--active' : ''}`}
        aria-pressed={locale === 'en'}
        onClick={() => select('en')}
      >
        {t.lang.en}
      </button>
    </div>
  )
}
