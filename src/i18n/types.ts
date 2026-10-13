export type Locale = 'de' | 'en'

export type GeoFact = {
  id: 'name' | 'author' | 'liveUrl' | 'license' | 'privacy'
  term: string
  definition: string
}

export type GeoFaqItem = {
  question: string
  answer: string
}

export type Messages = {
  meta: {
    title: string
    description: string
  }
  brand: {
    by: string
    productName: string
  }
  lang: {
    aria: string
    de: string
    en: string
  }
  trust: {
    aria: string
    lead: string
    gdprTitle: string
    gdprBody: string
    localTitle: string
    localBody: string
    noAiTitle: string
    noAiBody: string
  }
  footer: {
    aria: string
    text: string
    imprint: string
  }
  dropzone: {
    aria: string
    title: string
    titleCompact: string
    hint: string
    hintCompact: string
    chooseFiles: string
    chooseFolder: string
    folderTitle: string
  }
  dropOverlay: {
    title: string
    hint: string
  }
  gallery: {
    aria: string
    title: string
    clearAll: string
    file: string
    files: string
    item: string
    items: string
    page: string
    pages: string
  }
  selection: {
    aria: string
    selected: (n: number) => string
    removeSelected: string
  }
  tile: {
    unknown: string
    pageAbbrev: (n: number) => string
    pageLabel: (n: number) => string
    pagesCount: (n: number) => string
    remove: string
    removeNamed: (name: string) => string
    removePage: (page: number, name: string) => string
    preview: (name: string) => string
    previewPage: (name: string, page: number) => string
    showPages: (n: number) => string
  }
  merge: {
    aria: string
    item: string
    items: string
    page: string
    pages: string
    size: string
    saveAs: string
    mergePdfs: string
  }
  status: {
    opening: (current: number, total: number) => string
    thumbs: string
    combining: (current: number, total: number, pct: number) => string
    saving: string
    busyOpening: string
    busyThumbs: string
    busyCombining: string
    busySaving: string
  }
  warnings: {
    summary: (added: number, skipped: number) => string
    dismiss: string
    encrypted: string
    corrupt: string
    notPdf: string
  }
  errors: {
    noPdfsSelected: string
    noUsablePdfs: string
    openFailed: string
    mergeFailed: string
    passwordProtected: string
  }
  download: {
    pdfDocument: string
  }
  geo: {
    title: string
    intro: string
    faqHeading: string
    machineReadable: string
    imprint: string
    steps: string[]
    facts: GeoFact[]
    faq: GeoFaqItem[]
  }
}
