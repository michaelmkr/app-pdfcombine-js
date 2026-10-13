import { PDFDocument } from 'pdf-lib'
import type { PdfDocument, SkipReason, SkippedFile } from '../types'
import { renderPageThumbnail, revokeThumbnail } from './thumbnail'

function isPdfFile(file: File): boolean {
  if (file.type === 'application/pdf') return true
  return file.name.toLowerCase().endsWith('.pdf')
}

function classifyError(err: unknown): Exclude<SkipReason, 'not-pdf'> {
  const msg = err instanceof Error ? err.message : String(err)
  if (/encrypt|password/i.test(msg)) return 'encrypted'
  return 'corrupt'
}

/** Read a File into a PdfDocument (bytes + page count + thumbnail). */
export async function loadPdfFile(
  file: File,
): Promise<{ doc: PdfDocument } | { skipped: SkippedFile }> {
  if (!isPdfFile(file)) {
    return { skipped: { name: file.name, reason: 'not-pdf' } }
  }

  const bytes = await file.arrayBuffer()
  try {
    const pdf = await PDFDocument.load(bytes.slice(0), {
      ignoreEncryption: false,
    })
    const thumbnailUrl = await renderPageThumbnail(bytes, 0)
    const pageThumbs = new Map<number, string | null>()
    pageThumbs.set(0, thumbnailUrl)
    return {
      doc: {
        id: crypto.randomUUID(),
        name: file.name,
        bytes,
        pageCount: pdf.getPageCount(),
        sizeBytes: file.size,
        thumbnailUrl,
        pageThumbs,
      },
    }
  } catch (err) {
    console.warn(`Could not load PDF: ${file.name}`, err)
    return { skipped: { name: file.name, reason: classifyError(err) } }
  }
}

export type LoadProgress = { current: number; total: number }

/** Load multiple files; returns successfully parsed PDFs and structured skips. */
export async function loadPdfFiles(
  files: FileList | File[],
  onProgress?: (p: LoadProgress) => void,
): Promise<{
  docs: PdfDocument[]
  skipped: SkippedFile[]
}> {
  const list = Array.from(files)
  const docs: PdfDocument[] = []
  const skipped: SkippedFile[] = []
  const total = list.length

  for (let i = 0; i < list.length; i += 1) {
    onProgress?.({ current: i + 1, total })
    const file = list[i]!
    const result = await loadPdfFile(file)
    if ('doc' in result) {
      docs.push(result.doc)
    } else {
      skipped.push(result.skipped)
    }
  }

  return { docs, skipped }
}

/** Revoke all cached thumbnails for documents (file + page thumbs). */
export function revokeDocThumbnails(docs: PdfDocument[]): void {
  for (const doc of docs) {
    const seen = new Set<string>()
    if (doc.thumbnailUrl) {
      revokeThumbnail(doc.thumbnailUrl)
      seen.add(doc.thumbnailUrl)
    }
    for (const url of doc.pageThumbs.values()) {
      if (url && !seen.has(url)) {
        revokeThumbnail(url)
        seen.add(url)
      }
    }
    doc.pageThumbs.clear()
  }
}

