/** Source PDF document held entirely in browser memory. */
export type PdfDocument = {
  id: string
  name: string
  /** Raw PDF bytes held in memory for client-side merge. */
  bytes: ArrayBuffer
  pageCount: number
  sizeBytes: number
  /** First-page thumbnail for file tiles (also cached as page 0). */
  thumbnailUrl: string | null
  /** Per-page thumbnail object URLs (0-based page index). */
  pageThumbs: Map<number, string | null>
}

/** One entry in the ordered merge gallery — a whole file or a single page. */
export type MergeItem = {
  id: string
  docId: string
  kind: 'file' | 'page'
  /** 0-based page index when kind === 'page'. */
  pageIndex?: number
  thumbnailUrl: string | null
  /** True while a lazy page thumbnail is rendering. */
  thumbLoading?: boolean
}

export type SkipReason = 'encrypted' | 'corrupt' | 'not-pdf'

export type SkippedFile = {
  name: string
  reason: SkipReason
}

export type AppStatus =
  | { phase: 'idle' }
  | { phase: 'loading'; current: number; total: number }
  | { phase: 'thumbs' }
  | { phase: 'merging'; current: number; total: number }
  | { phase: 'saving' }

/** Stable keys for user-facing errors (translated at render time). */
export type AppErrorKey =
  | 'noPdfsSelected'
  | 'noUsablePdfs'
  | 'openFailed'
  | 'mergeFailed'
  | 'passwordProtected'
