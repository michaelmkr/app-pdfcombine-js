import { PDFDocument } from 'pdf-lib'
import type { MergeItem, PdfDocument } from '../types'

export type MergePageRef = {
  docId: string
  pageIndex: number
}

/** Expand merge items into ordered page refs (file → all pages). */
export function expandMergeItems(
  items: MergeItem[],
  docsById: Record<string, PdfDocument>,
): MergePageRef[] {
  const refs: MergePageRef[] = []
  for (const item of items) {
    const doc = docsById[item.docId]
    if (!doc) continue
    if (item.kind === 'page') {
      const pageIndex = item.pageIndex ?? 0
      if (pageIndex >= 0 && pageIndex < doc.pageCount) {
        refs.push({ docId: item.docId, pageIndex })
      }
      continue
    }
    for (let i = 0; i < doc.pageCount; i += 1) {
      refs.push({ docId: item.docId, pageIndex: i })
    }
  }
  return refs
}

export function countMergePages(
  items: MergeItem[],
  docsById: Record<string, PdfDocument>,
): number {
  return expandMergeItems(items, docsById).length
}

/**
 * Build a merged PDF from ordered page refs, copying only selected pages.
 * Groups consecutive pages from the same source doc for fewer pdf-lib loads.
 */
export async function mergePdfs(
  docsById: Record<string, PdfDocument>,
  items: MergeItem[],
  onProgress?: (current: number, total: number) => void,
): Promise<Blob> {
  const refs = expandMergeItems(items, docsById)
  if (refs.length === 0) {
    throw new Error('Nothing to merge.')
  }

  const merged = await PDFDocument.create()
  const total = refs.length
  let done = 0

  // Cache loaded source docs for this merge pass.
  const srcCache = new Map<string, PDFDocument>()

  async function getSrc(docId: string): Promise<PDFDocument> {
    const cached = srcCache.get(docId)
    if (cached) return cached
    const doc = docsById[docId]
    if (!doc) throw new Error('Missing source PDF.')
    const src = await PDFDocument.load(doc.bytes.slice(0), {
      ignoreEncryption: false,
    })
    srcCache.set(docId, src)
    return src
  }

  let i = 0
  while (i < refs.length) {
    const { docId } = refs[i]!
    const indices: number[] = []
    while (i < refs.length && refs[i]!.docId === docId) {
      indices.push(refs[i]!.pageIndex)
      i += 1
    }
    const src = await getSrc(docId)
    const pages = await merged.copyPages(src, indices)
    for (const page of pages) {
      merged.addPage(page)
      done += 1
      onProgress?.(done, total)
    }
  }

  const bytes = await merged.save()
  const copy = new Uint8Array(bytes)
  return new Blob([copy.buffer], { type: 'application/pdf' })
}
