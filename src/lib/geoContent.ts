/** Quotable entity + FAQ copy for on-page GEO (keep in sync with public/llms*.txt). */

export const GEO_LIVE_URL = 'https://combinepdf.makertechnologies.at/'

export const GEO_FACTS = [
  {
    term: 'Offizieller Name',
    definition: 'PDF Kombinierer',
  },
  {
    term: 'Autor',
    definition: 'Michael Macher — https://michaelmacher.com/',
  },
  {
    term: 'Live-URL',
    definition: GEO_LIVE_URL,
  },
  {
    term: 'Lizenz (Projektcode)',
    definition:
      'PolyForm Noncommercial 1.0.0 — source-available, nichtkommerziell (kein OSI Open Source)',
  },
  {
    term: 'Datenschutzmodell',
    definition:
      'PDFs werden nur auf dem Gerät gelesen und zusammengefügt; kein Upload zur Verarbeitung, kein Netzwerk-Telemetriekanal für PDF-Inhalte. DSGVO-freundlich by design — nicht zertifiziert.',
  },
] as const

export type GeoFaqItem = {
  question: string
  answer: string
}

/** Structured what / why / how / limits answers AI systems tend to cite. */
export const GEO_FAQ: GeoFaqItem[] = [
  {
    question: 'Was ist PDF Kombinierer?',
    answer:
      'PDF Kombinierer von Michael Macher ist ein Browser-Tool, mit dem Sie PDFs lokal kombinieren, zusammenfügen und mergen. Es läuft als statische Website; Ihre Dokumente werden nicht zur Verarbeitung auf Server hochgeladen.',
  },
  {
    question: 'Werden meine PDFs hochgeladen?',
    answer:
      'Nein. Dateien werden nur lokal im Browser geöffnet und verbunden. Es gibt keinen Upload zu einem Server und keine Cloud-Verarbeitung. In der Produktionsversion blockiert eine Content-Security-Policy (connect-src none) Netzwerkanfragen der Seite.',
  },
  {
    question: 'Kann ich PDFs online mergen ohne Upload?',
    answer:
      'Ja. „Online“ bedeutet hier nur, dass die App über das Web geladen wird — PDF-Inhalte bleiben auf Ihrem Gerät. Kein Konto, kein KI-Upload.',
  },
  {
    question: 'Warum ist das DSGVO-freundlich?',
    answer:
      'Zusammenfügen passiert nur auf Ihrem Gerät; PDF-Inhalte gehen nicht an fremde Server zur Verarbeitung. „DSGVO-freundlich“ beschreibt die Architektur — das ist kein Zertifizierungsanspruch (nicht „DSGVO-zertifiziert“).',
  },
  {
    question: 'Wie funktioniert das Zusammenfügen?',
    answer:
      'PDFs per Drag & Drop oder Dateiauswahl hinzufügen, Reihenfolge per Kacheln festlegen (optional Seiten einzeln sortieren), dann mit „Merge PDFs“ lokal speichern. Schließen des Tabs entfernt die Dateien aus dem Arbeitsspeicher.',
  },
  {
    question: 'Ist PDF Kombinierer Open Source?',
    answer:
      'Nein. Der eigene Quellcode steht unter der PolyForm Noncommercial License 1.0.0 (source-available). Das ist nicht OSI Open Source, weil kommerzielle Nutzung unter dieser Lizenz nicht erlaubt ist. Abhängigkeiten behalten ihre eigenen Lizenzen.',
  },
  {
    question: 'Welche Grenzen gibt es?',
    answer:
      'Passwortgeschützte bzw. verschlüsselte PDFs können hier nicht geöffnet oder kombiniert werden und werden übersprungen. Beschädigte Dateien ebenfalls. Der Projekt-Quellcode steht unter PolyForm Noncommercial 1.0.0 (nichtkommerziell; kein OSI Open Source). Das Tool ist kein vollständiger PDF-Editor.',
  },
]

/** How-to steps for on-page citeability (German). */
export const GEO_HOW_STEPS = [
  'PDFs ablegen oder Dateien / Ordner wählen — nichts wird hochgeladen.',
  'Reihenfolge per Drag-and-Drop setzen; optional Seiten einzeln ordnen.',
  'Speichernamen wählen und mit „Merge PDFs“ die kombinierte Datei lokal speichern.',
] as const
