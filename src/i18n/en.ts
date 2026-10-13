import type { Messages } from './types'

export const en: Messages = {
  meta: {
    title: 'Combine & merge PDFs — online without upload | PDF Kombinierer',
    description:
      'Combine, join and merge PDFs — locally in your browser, no upload. GDPR-friendly by design (not certified), no AI upload, no cloud. PDF Kombinierer by Michael Macher.',
    ogImageAlt: 'PDF Kombinierer — merge PDFs without upload',
  },
  brand: {
    by: 'by',
    productName: 'PDF Kombinierer',
  },
  lang: {
    aria: 'Language',
    de: 'DE',
    en: 'EN',
  },
  trust: {
    aria: 'Privacy and how it works',
    lead:
      'Merge without upload — GDPR-friendly. Your files are not sent to third-party servers; nothing is processed in the cloud. Other online tools often send PDFs to servers (sometimes including AI) — here merging happens only locally on your device, with no AI upload.',
    gdprTitle: 'GDPR-friendly',
    gdprBody: 'No data sent to servers — suitable for sensitive documents',
    localTitle: 'Everything on your device',
    localBody: 'Merge only locally — no account, no cloud upload',
    noAiTitle: 'No AI upload',
    noAiBody: 'No AI processing of your PDFs — only merging in the browser',
  },
  footer: {
    aria: 'Privacy notice',
    text: 'No upload · GDPR-friendly · no AI upload · files stay on your computer',
    imprint: 'Imprint',
  },
  dropzone: {
    aria: 'Add PDF files',
    title: 'Drop PDFs anywhere on this page',
    titleCompact: 'Add more PDFs',
    hint: 'Nothing here yet. Pick files or a folder to start. Your PDFs stay on this computer — no server upload, no AI processing.',
    hintCompact: 'or pick files or a folder — nothing uploaded, no AI cloud',
    chooseFiles: 'Choose files',
    chooseFolder: 'Choose folder',
    folderTitle: 'Pick a whole folder (works best in Chrome or Edge)',
  },
  dropOverlay: {
    title: 'Drop to add',
    hint: 'Your files stay on this computer — no upload, no AI cloud',
  },
  gallery: {
    aria: 'Your PDFs',
    title: 'Your PDFs',
    clearAll: 'Clear all',
    file: 'file',
    files: 'files',
    item: 'item',
    items: 'items',
    page: 'page',
    pages: 'pages',
  },
  selection: {
    aria: 'Selection',
    selected: (n) => `${n} selected`,
    removeSelected: 'Remove selected',
  },
  tile: {
    unknown: 'Unknown',
    pageAbbrev: (n) => `p. ${n}`,
    pageLabel: (n) => `Page ${n}`,
    pagesCount: (n) => (n === 1 ? '1 page' : `${n} pages`),
    remove: 'Remove',
    removeNamed: (name) => `Remove ${name}`,
    removePage: (page, name) => `Remove page ${page} of ${name}`,
    preview: (name) => `Preview of ${name}`,
    previewPage: (name, page) => `Preview of ${name} page ${page}`,
    showPages: (n) => `Show ${n} pages`,
  },
  merge: {
    aria: 'Merge PDFs',
    item: 'item',
    items: 'items',
    page: 'page',
    pages: 'pages',
    size: 'size',
    saveAs: 'Save as',
    mergePdfs: 'Merge PDFs',
  },
  status: {
    opening: (current, total) => `Opening PDF ${current} of ${total}…`,
    thumbs: 'Creating page previews…',
    combining: (current, total, pct) =>
      `Combining page ${current} of ${total}… (${pct}%)`,
    saving: 'Saving your PDF…',
    busyOpening: 'Opening…',
    busyThumbs: 'Previews…',
    busyCombining: 'Combining…',
    busySaving: 'Saving…',
  },
  warnings: {
    summary: (added, skipped) =>
      `Added ${added} PDF${added === 1 ? '' : 's'}; skipped ${skipped} file${skipped === 1 ? '' : 's'}.`,
    dismiss: 'Dismiss',
    encrypted:
      'needs a password. Password-protected PDFs cannot be opened here.',
    corrupt: 'could not be opened (damaged or not supported).',
    notPdf: 'is not a PDF file.',
  },
  errors: {
    noPdfsSelected: 'No PDF files selected. Choose PDF files to continue.',
    noUsablePdfs:
      'No usable PDFs found. Password-protected or damaged files were skipped.',
    openFailed: 'Could not open one or more files. Try different PDFs.',
    mergeFailed:
      'Could not combine these PDFs. Try fewer files or different ones.',
    passwordProtected:
      'One or more PDFs need a password and cannot be combined here.',
  },
  download: {
    pdfDocument: 'PDF document',
  },
  geo: {
    title: 'Merge PDFs locally — facts & FAQ',
    intro:
      'PDF Kombinierer by Michael Macher: combine several PDFs into one file — no upload, no cloud, no AI upload. Facts and answers you can cite: what it is, why files stay local, how to merge, and where the limits are.',
    faqHeading: 'Frequently asked questions',
    machineReadable: 'Machine-readable:',
    imprint: 'Imprint',
    authorName: 'Michael Macher',
    authorSiteLabel: 'michaelmacher.com',
    steps: [
      'Drop PDFs or choose files / a folder — nothing is uploaded.',
      'Set the order by drag-and-drop; optionally arrange individual pages.',
      'Choose a save name and save the combined file locally with “Merge PDFs”.',
    ],
    facts: [
      {
        id: 'name',
        term: 'Official name',
        definition: 'PDF Kombinierer',
      },
      {
        id: 'author',
        term: 'Author',
        definition: 'Michael Macher — https://michaelmacher.com/',
      },
      {
        id: 'liveUrl',
        term: 'Live URL',
        definition: 'https://combinepdf.makertechnologies.at/',
      },
      {
        id: 'license',
        term: 'License (project code)',
        definition:
          'PolyForm Noncommercial 1.0.0 — source-available, noncommercial (not OSI Open Source)',
      },
      {
        id: 'privacy',
        term: 'Privacy model',
        definition:
          'PDFs are read and merged only on the device; no upload for processing, no network telemetry channel for PDF contents. GDPR-friendly by architecture — not certified.',
      },
      {
        id: 'languages',
        term: 'Languages',
        definition:
          'German and English — full UI with a header language switcher; preference stored locally in the browser (one language at a time, no mixed DE/EN chrome).',
      },
    ],
    faq: [
      {
        question: 'What is PDF Kombinierer?',
        answer:
          'PDF Kombinierer by Michael Macher is a browser tool to combine, join and merge PDFs locally. It runs as a static website; your documents are not uploaded to a server for processing.',
      },
      {
        question: 'Are my PDFs uploaded?',
        answer:
          'No. Files are opened and joined only locally in the browser. There is no upload to a server and no cloud processing. In production, a Content-Security-Policy (connect-src none) blocks network requests from the page.',
      },
      {
        question: 'Can I merge PDFs online without upload?',
        answer:
          'Yes. “Online” here only means the app is loaded over the web — PDF contents stay on your device. No account, no AI upload.',
      },
      {
        question: 'Why is this GDPR-friendly?',
        answer:
          'Merging happens only on your device; PDF contents are not sent to third-party servers for processing. “GDPR-friendly” describes the architecture — it is not a certification claim (not “GDPR-certified”).',
      },
      {
        question: 'How does merging work?',
        answer:
          'Add PDFs via drag & drop or file picker, set the order with tiles (optionally sort individual pages), then save locally with “Merge PDFs”. Closing the tab clears the files from memory.',
      },
      {
        question: 'Is PDF Kombinierer open source?',
        answer:
          'No. The project’s own source code is under the PolyForm Noncommercial License 1.0.0 (source-available). That is not OSI Open Source, because commercial use is not allowed under this license. Dependencies keep their own licenses.',
      },
      {
        question: 'What are the limits?',
        answer:
          'Password-protected or encrypted PDFs cannot be opened or combined here and are skipped. Damaged files likewise. Project source code is under PolyForm Noncommercial 1.0.0 (noncommercial; not OSI Open Source). The tool is not a full PDF editor.',
      },
      {
        question: 'Is there AI upload?',
        answer:
          'No. No AI upload and no cloud AI processing of your PDFs. The tool is not an AI system.',
      },
      {
        question: 'What languages are available?',
        answer:
          'German and English — full UI including trust/privacy copy, tool chrome, errors, and FAQ. Header language switcher; preference stored locally in the browser. One URL; no separate English landing page.',
      },
    ],
  },
}
