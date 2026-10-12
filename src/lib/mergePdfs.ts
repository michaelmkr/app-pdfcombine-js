import { PDFDocument } from 'pdf-lib'
import type { PdfDocument } from '../types'

/** Concatenate source PDFs in list order into a single PDF blob. */
export async function mergePdfs(docs: PdfDocument[]): Promise<Blob> {
  const merged = await PDFDocument.create()

  for (const doc of docs) {
    const src = await PDFDocument.load(doc.bytes.slice(0), {
      ignoreEncryption: false,
    })
    const pageIndices = src.getPageIndices()
    const pages = await merged.copyPages(src, pageIndices)
    for (const page of pages) {
      merged.addPage(page)
    }
  }

  const bytes = await merged.save()
  // Copy into a plain ArrayBuffer for Blob typing across TS lib versions.
  const copy = new Uint8Array(bytes)
  return new Blob([copy.buffer], { type: 'application/pdf' })
}
