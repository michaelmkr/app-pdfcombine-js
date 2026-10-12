/** Source PDF document held entirely in browser memory. */
export type PdfDocument = {
  id: string
  name: string
  /** Raw PDF bytes held in memory for client-side merge. */
  bytes: ArrayBuffer
  pageCount: number
  sizeBytes: number
  /** Object URL of a JPEG first-page thumbnail, or null if render failed. */
  thumbnailUrl: string | null
}
