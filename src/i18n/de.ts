import type { Messages } from './types'

export const de: Messages = {
  meta: {
    title: 'PDF kombinieren & mergen — online ohne Upload | PDF Kombinierer',
    description:
      'PDFs kombinieren, zusammenfügen und mergen — lokal im Browser, ohne Upload. DSGVO-freundlich by design (nicht zertifiziert), kein KI-Upload, keine Cloud. PDF Kombinierer von Michael Macher.',
  },
  brand: {
    by: 'von',
    productName: 'PDF Kombinierer',
  },
  lang: {
    aria: 'Sprache',
    de: 'DE',
    en: 'EN',
  },
  trust: {
    aria: 'Datenschutz und Funktionsweise',
    lead:
      'Zusammenfügen ohne Upload — DSGVO-freundlich. Ihre Dateien gehen nicht an fremde Server; nichts wird in der Cloud verarbeitet. Andere Online-Tools schicken PDFs oft an Server (manchmal inkl. KI) — hier passiert das Zusammenfügen nur lokal auf Ihrem Gerät, ohne KI-Upload.',
    gdprTitle: 'DSGVO-freundlich',
    gdprBody: 'Keine Datenweitergabe an Server — gut für sensible Dokumente',
    localTitle: 'Alles auf Ihrem Gerät',
    localBody: 'Zusammenfügen nur lokal — kein Konto, kein Cloud-Upload',
    noAiTitle: 'Kein KI-Upload',
    noAiBody:
      'Keine KI-Verarbeitung Ihrer PDFs — nur Zusammenfügen im Browser',
  },
  footer: {
    aria: 'Datenschutzhinweis',
    text: 'Kein Upload · DSGVO-freundlich · kein KI-Upload · Dateien bleiben auf Ihrem Computer',
    imprint: 'Impressum',
  },
  dropzone: {
    aria: 'PDF-Dateien hinzufügen',
    title: 'PDFs irgendwo auf dieser Seite ablegen',
    titleCompact: 'Weitere PDFs hinzufügen',
    hint: 'Noch nichts hier. Dateien oder Ordner wählen zum Starten. Ihre PDFs bleiben auf diesem Computer — kein Server-Upload, keine KI-Verarbeitung.',
    hintCompact:
      'oder Dateien bzw. Ordner wählen — nichts wird hochgeladen, keine KI-Cloud',
    chooseFiles: 'Dateien wählen',
    chooseFolder: 'Ordner wählen',
    folderTitle: 'Ganzen Ordner wählen (am besten in Chrome oder Edge)',
  },
  dropOverlay: {
    title: 'Ablegen zum Hinzufügen',
    hint: 'Ihre Dateien bleiben auf diesem Computer — kein Upload, keine KI-Cloud',
  },
  gallery: {
    aria: 'Ihre PDFs',
    title: 'Ihre PDFs',
    clearAll: 'Alles leeren',
    file: 'Datei',
    files: 'Dateien',
    item: 'Element',
    items: 'Elemente',
    page: 'Seite',
    pages: 'Seiten',
  },
  selection: {
    aria: 'Auswahl',
    selected: (n) => `${n} ausgewählt`,
    removeSelected: 'Auswahl entfernen',
  },
  tile: {
    unknown: 'Unbekannt',
    pageAbbrev: (n) => `S. ${n}`,
    pageLabel: (n) => `Seite ${n}`,
    pagesCount: (n) => (n === 1 ? '1 Seite' : `${n} Seiten`),
    remove: 'Entfernen',
    removeNamed: (name) => `${name} entfernen`,
    removePage: (page, name) => `Seite ${page} von ${name} entfernen`,
    preview: (name) => `Vorschau von ${name}`,
    previewPage: (name, page) => `Vorschau von ${name}, Seite ${page}`,
    showPages: (n) => `${n} Seiten anzeigen`,
  },
  merge: {
    aria: 'PDFs zusammenfügen',
    item: 'Element',
    items: 'Elemente',
    page: 'Seite',
    pages: 'Seiten',
    size: 'Größe',
    saveAs: 'Speichern als',
    mergePdfs: 'PDFs zusammenfügen',
  },
  status: {
    opening: (current, total) => `PDF ${current} von ${total} wird geöffnet…`,
    thumbs: 'Seitenvorschauen werden erstellt…',
    combining: (current, total, pct) =>
      `Seite ${current} von ${total} wird verbunden… (${pct}%)`,
    saving: 'PDF wird gespeichert…',
    busyOpening: 'Öffnen…',
    busyThumbs: 'Vorschauen…',
    busyCombining: 'Verbinden…',
    busySaving: 'Speichern…',
  },
  warnings: {
    summary: (added, skipped) =>
      `${added} PDF${added === 1 ? '' : 's'} hinzugefügt; ${skipped} Datei${skipped === 1 ? '' : 'en'} übersprungen.`,
    dismiss: 'Schließen',
    encrypted:
      'benötigt ein Passwort. Passwortgeschützte PDFs können hier nicht geöffnet werden.',
    corrupt: 'konnte nicht geöffnet werden (beschädigt oder nicht unterstützt).',
    notPdf: 'ist keine PDF-Datei.',
  },
  errors: {
    noPdfsSelected:
      'Keine PDF-Dateien ausgewählt. Bitte PDFs wählen, um fortzufahren.',
    noUsablePdfs:
      'Keine verwendbaren PDFs gefunden. Passwortgeschützte oder beschädigte Dateien wurden übersprungen.',
    openFailed:
      'Eine oder mehrere Dateien konnten nicht geöffnet werden. Bitte andere PDFs versuchen.',
    mergeFailed:
      'Diese PDFs konnten nicht kombiniert werden. Bitte weniger oder andere Dateien versuchen.',
    passwordProtected:
      'Ein oder mehrere PDFs benötigen ein Passwort und können hier nicht kombiniert werden.',
  },
  download: {
    pdfDocument: 'PDF-Dokument',
  },
  geo: {
    title: 'PDFs lokal zusammenfügen — Fakten & FAQ',
    intro:
      'PDF Kombinierer von Michael Macher: mehrere PDFs zu einer Datei verbinden — ohne Upload, ohne Cloud, ohne KI-Upload. Fakten und Antworten zum Zitieren: was es ist, warum Dateien lokal bleiben, wie Sie zusammenfügen, und wo die Grenzen liegen.',
    faqHeading: 'Häufige Fragen',
    machineReadable: 'Maschinelesbar:',
    imprint: 'Impressum',
    steps: [
      'PDFs ablegen oder Dateien / Ordner wählen — nichts wird hochgeladen.',
      'Reihenfolge per Drag-and-Drop setzen; optional Seiten einzeln ordnen.',
      'Speichernamen wählen und mit „PDFs zusammenfügen“ die kombinierte Datei lokal speichern.',
    ],
    facts: [
      {
        id: 'name',
        term: 'Offizieller Name',
        definition: 'PDF Kombinierer',
      },
      {
        id: 'author',
        term: 'Autor',
        definition: 'Michael Macher — https://michaelmacher.com/',
      },
      {
        id: 'liveUrl',
        term: 'Live-URL',
        definition: 'https://combinepdf.makertechnologies.at/',
      },
      {
        id: 'license',
        term: 'Lizenz (Projektcode)',
        definition:
          'PolyForm Noncommercial 1.0.0 — source-available, nichtkommerziell (kein OSI Open Source)',
      },
      {
        id: 'privacy',
        term: 'Datenschutzmodell',
        definition:
          'PDFs werden nur auf dem Gerät gelesen und zusammengefügt; kein Upload zur Verarbeitung, kein Netzwerk-Telemetriekanal für PDF-Inhalte. DSGVO-freundlich by design — nicht zertifiziert.',
      },
    ],
    faq: [
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
          'PDFs per Drag & Drop oder Dateiauswahl hinzufügen, Reihenfolge per Kacheln festlegen (optional Seiten einzeln sortieren), dann mit „PDFs zusammenfügen“ lokal speichern. Schließen des Tabs entfernt die Dateien aus dem Arbeitsspeicher.',
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
    ],
  },
}
