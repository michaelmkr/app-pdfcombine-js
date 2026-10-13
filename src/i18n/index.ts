import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { de } from './de'
import { en } from './en'
import type { Locale, Messages } from './types'

export type { Locale, Messages, GeoFact, GeoFaqItem } from './types'

const STORAGE_KEY = 'pdf-kombinierer-locale'

const dictionaries: Record<Locale, Messages> = { de, en }

export function detectBrowserLocale(): Locale {
  try {
    const lang =
      typeof navigator !== 'undefined'
        ? navigator.language || navigator.languages?.[0]
        : undefined
    if (lang && /^de\b/i.test(lang)) return 'de'
    if (lang) return 'en'
  } catch {
    // ignore
  }
  return 'de'
}

export function readStoredLocale(): Locale | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === 'de' || raw === 'en') return raw
  } catch {
    // private mode / blocked storage
  }
  return null
}

export function writeStoredLocale(locale: Locale): void {
  try {
    localStorage.setItem(STORAGE_KEY, locale)
  } catch {
    // ignore quota / private mode
  }
}

export function resolveInitialLocale(): Locale {
  return readStoredLocale() ?? detectBrowserLocale()
}

function applyDocumentLang(locale: Locale): void {
  document.documentElement.lang = locale
}

function applyDocumentMeta(messages: Messages): void {
  document.title = messages.meta.title
  const desc = document.querySelector('meta[name="description"]')
  if (desc) desc.setAttribute('content', messages.meta.description)
  const ogTitle = document.querySelector('meta[property="og:title"]')
  if (ogTitle) ogTitle.setAttribute('content', messages.meta.title)
  const ogDesc = document.querySelector('meta[property="og:description"]')
  if (ogDesc) ogDesc.setAttribute('content', messages.meta.description)
  const twTitle = document.querySelector('meta[name="twitter:title"]')
  if (twTitle) twTitle.setAttribute('content', messages.meta.title)
  const twDesc = document.querySelector('meta[name="twitter:description"]')
  if (twDesc) twDesc.setAttribute('content', messages.meta.description)
}

type LocaleContextValue = {
  locale: Locale
  t: Messages
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => resolveInitialLocale())

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    writeStoredLocale(next)
  }, [])

  const t = dictionaries[locale]

  useEffect(() => {
    applyDocumentLang(locale)
    applyDocumentMeta(t)
  }, [locale, t])

  const value = useMemo(
    () => ({ locale, t, setLocale }),
    [locale, t, setLocale],
  )

  return createElement(LocaleContext.Provider, { value }, children)
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext)
  if (!ctx) {
    throw new Error('useLocale must be used within LocaleProvider')
  }
  return ctx
}

export function getMessages(locale: Locale): Messages {
  return dictionaries[locale]
}
