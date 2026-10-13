import { getDocument } from 'pdfjs-dist'
import { ensurePdfWorker } from './pdfWorker'

/** Target thumbnail width in CSS pixels (low scale for ~30–50 files). */
const THUMB_WIDTH = 140

/**
 * Render a PDF page to a blob URL thumbnail.
 * `pageIndex` is 0-based. Uses a copy of `bytes` so pdf.js cannot transfer
 * ownership of the merge buffer. Returns null on failure.
 */
export async function renderPageThumbnail(
  bytes: ArrayBuffer,
  pageIndex = 0,
): Promise<string | null> {
  ensurePdfWorker()
  try {
    const data = new Uint8Array(bytes.slice(0))
    const loadingTask = getDocument({
      data,
      disableAutoFetch: true,
      disableStream: true,
      useSystemFonts: true,
      // Do not set cMapUrl / standardFontDataUrl / wasmUrl — those would fetch remotely.
    })
    const pdf = await loadingTask.promise
    const pageNumber = pageIndex + 1
    if (pageNumber < 1 || pageNumber > pdf.numPages) {
      await pdf.cleanup()
      return null
    }
    const page = await pdf.getPage(pageNumber)

    const base = page.getViewport({ scale: 1 })
    const scale = THUMB_WIDTH / base.width
    const viewport = page.getViewport({ scale })

    const canvas = document.createElement('canvas')
    canvas.width = Math.max(1, Math.floor(viewport.width))
    canvas.height = Math.max(1, Math.floor(viewport.height))
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      await pdf.cleanup()
      return null
    }

    await page.render({ canvas, canvasContext: ctx, viewport }).promise
    await pdf.cleanup()

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/jpeg', 0.72),
    )
    if (!blob) return null
    // blob: URLs are local memory only — they appear in DevTools Network but never leave the device.
    return URL.createObjectURL(blob)
  } catch (err) {
    console.warn('Thumbnail render failed', err)
    return null
  }
}

/** Convenience: first-page thumbnail. */
export async function renderFirstPageThumbnail(
  bytes: ArrayBuffer,
): Promise<string | null> {
  return renderPageThumbnail(bytes, 0)
}

export function revokeThumbnail(url: string | null | undefined): void {
  if (url) URL.revokeObjectURL(url)
}
