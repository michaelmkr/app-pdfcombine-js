import { PDFDocument } from 'pdf-lib'
import type { PdfDocument } from '../types'
import { renderFirstPageThumbnail, revokeThumbnail } from './thumbnail'

function isPdfFile(file: File): boolean {
  if (file.type === 'application/pdf') return true
  return file.name.toLowerCase().endsWith('.pdf')
}

function newId(): string {
  return crypto.randomUUID()
}

/** Read a File into a PdfDocument (bytes + page count + thumbnail). Skips non-PDFs. */
export async function loadPdfFile(file: File): Promise<PdfDocument | null> {
  if (!isPdfFile(file)) return null

  const bytes = await file.arrayBuffer()
  try {
    const pdf = await PDFDocument.load(bytes.slice(0), {
      ignoreEncryption: false,
    })
    const thumbnailUrl = await renderFirstPageThumbnail(bytes)
    return {
      id: newId(),
      name: file.name,
      bytes,
      pageCount: pdf.getPageCount(),
      sizeBytes: file.size,
      thumbnailUrl,
    }
  } catch {
    // Encrypted or corrupt PDF — skip rather than crash the batch.
    console.warn(`Could not load PDF: ${file.name}`)
    return null
  }
}

/** Load multiple files; returns successfully parsed PDFs only. */
export async function loadPdfFiles(files: FileList | File[]): Promise<{
  docs: PdfDocument[]
  skipped: number
}> {
  const list = Array.from(files)
  const docs: PdfDocument[] = []
  let skipped = 0

  for (const file of list) {
    if (!isPdfFile(file)) {
      skipped += 1
      continue
    }
    const doc = await loadPdfFile(file)
    if (doc) {
      docs.push(doc)
    } else {
      skipped += 1
    }
  }

  return { docs, skipped }
}

export function revokeDocThumbnails(docs: PdfDocument[]): void {
  for (const doc of docs) {
    revokeThumbnail(doc.thumbnailUrl)
  }
}

export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / (1024 * 1024)).toFixed(1)} MB`
}
