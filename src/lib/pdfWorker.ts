import { GlobalWorkerOptions } from 'pdfjs-dist'
import PdfJsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?worker'

/**
 * One shared PDF.js worker for the whole session.
 * Avoids spawning a new worker (and a Network-tab request) per thumbnail.
 * Worker code is bundled with the app — never loaded from a third-party CDN.
 */
let started = false

export function ensurePdfWorker(): void {
  if (started) return
  started = true
  GlobalWorkerOptions.workerPort = new PdfJsWorker()
}
