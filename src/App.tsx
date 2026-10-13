import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { MouseEvent as ReactMouseEvent } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import { DropZone } from './components/DropZone'
import { GlobalDropOverlay } from './components/GlobalDropOverlay'
import { PdfList } from './components/PdfList'
import { MergeBar } from './components/MergeBar'
import { TrustHero } from './components/TrustHero'
import { TrustFooter } from './components/TrustFooter'
import { GeoFaq } from './components/GeoFaq'
import { StatusBanner } from './components/StatusBanner'
import { WarningList } from './components/WarningList'
import { AUTHOR_URL } from './lib/imprint'
import {
  loadPdfFiles,
  revokeDocThumbnails,
} from './lib/loadPdf'
import { countMergePages, mergePdfs } from './lib/mergePdfs'
import { savePdf, ensurePdfExtension } from './lib/download'
import { getLastFilename, setLastFilename } from './lib/prefs'
import { renderPageThumbnail } from './lib/thumbnail'
import type { AppStatus, MergeItem, PdfDocument, SkippedFile } from './types'

function fileItemFromDoc(doc: PdfDocument): MergeItem {
  return {
    id: crypto.randomUUID(),
    docId: doc.id,
    kind: 'file',
    thumbnailUrl: doc.thumbnailUrl,
  }
}

export default function App() {
  const [docsById, setDocsById] = useState<Record<string, PdfDocument>>({})
  const [items, setItems] = useState<MergeItem[]>([])
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set())
  const [filename, setFilename] = useState(() => getLastFilename())
  const [status, setStatus] = useState<AppStatus>({ phase: 'idle' })
  const [error, setError] = useState<string | null>(null)
  const [skipped, setSkipped] = useState<SkippedFile[]>([])
  const [lastAddedCount, setLastAddedCount] = useState(0)
  const lastAnchorRef = useRef<string | null>(null)
  const docsByIdRef = useRef(docsById)
  const itemsRef = useRef(items)
  const expandGenRef = useRef(0)

  useEffect(() => {
    docsByIdRef.current = docsById
  }, [docsById])

  useEffect(() => {
    itemsRef.current = items
  }, [items])

  useEffect(() => {
    return () => {
      revokeDocThumbnails(Object.values(docsByIdRef.current))
    }
  }, [])

  const busy = status.phase !== 'idle'

  const pageCount = useMemo(
    () => countMergePages(items, docsById),
    [items, docsById],
  )

  const totalSizeBytes = useMemo(() => {
    const seen = new Set<string>()
    let sum = 0
    for (const item of items) {
      if (seen.has(item.docId)) continue
      seen.add(item.docId)
      sum += docsById[item.docId]?.sizeBytes ?? 0
    }
    return sum
  }, [items, docsById])

  const handleFiles = useCallback(async (files: FileList | File[]) => {
    setError(null)
    setSkipped([])
    const list = Array.from(files)
    if (list.length === 0) {
      setError('No PDF files selected. Choose PDF files to continue.')
      return
    }
    setStatus({ phase: 'loading', current: 0, total: list.length })
    try {
      const { docs: loaded, skipped: skippedFiles } = await loadPdfFiles(
        list,
        ({ current, total }) => {
          setStatus({ phase: 'loading', current, total })
        },
      )
      if (loaded.length === 0) {
        setSkipped(skippedFiles)
        setLastAddedCount(0)
        setError(
          skippedFiles.length > 0
            ? 'No usable PDFs found. Password-protected or damaged files were skipped.'
            : 'No PDF files selected. Choose PDF files to continue.',
        )
        return
      }
      setDocsById((prev) => {
        const next = { ...prev }
        for (const doc of loaded) next[doc.id] = doc
        return next
      })
      setItems((prev) => [...prev, ...loaded.map(fileItemFromDoc)])
      setSkipped(skippedFiles)
      setLastAddedCount(loaded.length)
    } catch {
      setError('Could not open one or more files. Try different PDFs.')
    } finally {
      setStatus({ phase: 'idle' })
    }
  }, [])

  const handleReorder = useCallback((activeId: string, overId: string) => {
    setItems((prev) => {
      const oldIndex = prev.findIndex((d) => d.id === activeId)
      const newIndex = prev.findIndex((d) => d.id === overId)
      if (oldIndex < 0 || newIndex < 0) return prev
      return arrayMove(prev, oldIndex, newIndex)
    })
  }, [])

  const pruneOrphanDocs = useCallback(
    (nextItems: MergeItem[], prevDocs: Record<string, PdfDocument>) => {
      const used = new Set(nextItems.map((i) => i.docId))
      const nextDocs: Record<string, PdfDocument> = {}
      const toRevoke: PdfDocument[] = []
      for (const [id, doc] of Object.entries(prevDocs)) {
        if (used.has(id)) {
          nextDocs[id] = doc
        } else {
          toRevoke.push(doc)
        }
      }
      if (toRevoke.length) revokeDocThumbnails(toRevoke)
      return nextDocs
    },
    [],
  )

  const handleRemove = useCallback(
    (id: string) => {
      setItems((prev) => {
        const next = prev.filter((d) => d.id !== id)
        setDocsById((docs) => pruneOrphanDocs(next, docs))
        return next
      })
      setSelectedIds((prev) => {
        if (!prev.has(id)) return prev
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    },
    [pruneOrphanDocs],
  )

  const handleRemoveSelected = useCallback(() => {
    setItems((prev) => {
      const next = prev.filter((d) => !selectedIds.has(d.id))
      setDocsById((docs) => pruneOrphanDocs(next, docs))
      return next
    })
    setSelectedIds(new Set())
    lastAnchorRef.current = null
  }, [selectedIds, pruneOrphanDocs])

  const handleClear = useCallback(() => {
    setItems([])
    setDocsById((prev) => {
      revokeDocThumbnails(Object.values(prev))
      return {}
    })
    setSelectedIds(new Set())
    lastAnchorRef.current = null
    setError(null)
    setSkipped([])
  }, [])

  const handleSelect = useCallback(
    (id: string, event: ReactMouseEvent) => {
      setSelectedIds((prev) => {
        const next = new Set(prev)
        if (event.shiftKey && lastAnchorRef.current) {
          const ids = itemsRef.current.map((i) => i.id)
          const a = ids.indexOf(lastAnchorRef.current)
          const b = ids.indexOf(id)
          if (a >= 0 && b >= 0) {
            const [lo, hi] = a < b ? [a, b] : [b, a]
            if (!event.metaKey && !event.ctrlKey) next.clear()
            for (let i = lo; i <= hi; i += 1) next.add(ids[i]!)
            return next
          }
        }
        if (event.metaKey || event.ctrlKey) {
          if (next.has(id)) next.delete(id)
          else next.add(id)
        } else {
          next.clear()
          next.add(id)
        }
        lastAnchorRef.current = id
        return next
      })
    },
    [],
  )

  const handleExpand = useCallback(async (itemId: string) => {
    const currentItems = itemsRef.current
    const item = currentItems.find((i) => i.id === itemId)
    if (!item || item.kind !== 'file') return
    const doc = docsByIdRef.current[item.docId]
    if (!doc || doc.pageCount < 2) return

    const gen = ++expandGenRef.current
    const pageItems: MergeItem[] = []
    for (let i = 0; i < doc.pageCount; i += 1) {
      const cached = doc.pageThumbs.get(i)
      pageItems.push({
        id: crypto.randomUUID(),
        docId: doc.id,
        kind: 'page',
        pageIndex: i,
        thumbnailUrl: cached ?? (i === 0 ? doc.thumbnailUrl : null),
        thumbLoading: cached === undefined && i !== 0,
      })
    }

    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === itemId)
      if (idx < 0) return prev
      const next = [...prev]
      next.splice(idx, 1, ...pageItems)
      return next
    })
    setSelectedIds(new Set())
    setStatus({ phase: 'thumbs' })

    try {
      for (let i = 0; i < doc.pageCount; i += 1) {
        if (gen !== expandGenRef.current) return
        if (doc.pageThumbs.has(i)) {
          const url = doc.pageThumbs.get(i) ?? null
          setItems((prev) =>
            prev.map((it) =>
              it.docId === doc.id &&
              it.kind === 'page' &&
              it.pageIndex === i
                ? { ...it, thumbnailUrl: url, thumbLoading: false }
                : it,
            ),
          )
          continue
        }
        const url = await renderPageThumbnail(doc.bytes, i)
        if (gen !== expandGenRef.current) return
        doc.pageThumbs.set(i, url)
        if (i === 0 && url && !doc.thumbnailUrl) {
          doc.thumbnailUrl = url
        }
        setItems((prev) =>
          prev.map((it) =>
            it.docId === doc.id && it.kind === 'page' && it.pageIndex === i
              ? { ...it, thumbnailUrl: url, thumbLoading: false }
              : it,
          ),
        )
      }
    } finally {
      if (gen === expandGenRef.current) {
        setStatus({ phase: 'idle' })
      }
    }
  }, [])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return
      }
      if (busy) return

      const meta = e.metaKey || e.ctrlKey
      if (meta && e.key.toLowerCase() === 'a') {
        e.preventDefault()
        setSelectedIds(new Set(itemsRef.current.map((i) => i.id)))
        return
      }
      if (e.key === 'Escape') {
        setSelectedIds(new Set())
        lastAnchorRef.current = null
        return
      }
      if (
        (e.key === 'Delete' || e.key === 'Backspace') &&
        selectedIds.size > 0
      ) {
        e.preventDefault()
        handleRemoveSelected()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [busy, selectedIds, handleRemoveSelected])

  const handleMerge = useCallback(async () => {
    if (items.length === 0) return
    setError(null)
    setStatus({ phase: 'merging', current: 0, total: pageCount || 1 })
    try {
      const blob = await mergePdfs(docsById, items, (current, total) => {
        setStatus({ phase: 'merging', current, total })
      })
      setStatus({ phase: 'saving' })
      const name = ensurePdfExtension(filename)
      const saved = await savePdf(blob, name)
      if (saved) {
        setFilename(name)
        setLastFilename(name)
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Could not combine these PDFs. Try fewer files or different ones.'
      setError(
        /encrypted|password/i.test(message)
          ? 'One or more PDFs need a password and cannot be combined here.'
          : message,
      )
    } finally {
      setStatus({ phase: 'idle' })
    }
  }, [docsById, items, filename, pageCount])

  const hasFiles = items.length > 0

  return (
    <div className={`app${hasFiles ? ' app--filled' : ' app--empty'}`}>
      <GlobalDropOverlay onFiles={handleFiles} disabled={busy} />

      <div className="app__atmosphere" aria-hidden="true" />

      <header className="app__header">
        <p className="app__eyebrow">
          von{' '}
          <a
            href={AUTHOR_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Michael Macher
          </a>
        </p>
        <h1>
          PDF <span className="app__accent">Kombinierer</span>
        </h1>
        <TrustHero />
      </header>

      <main className="app__main">
        <DropZone
          onFiles={handleFiles}
          disabled={busy}
          compact={hasFiles}
        />
        <StatusBanner status={status} />
        <WarningList
          skipped={skipped}
          addedCount={lastAddedCount}
          onDismiss={() => setSkipped([])}
        />
        <PdfList
          items={items}
          docsById={docsById}
          selectedIds={selectedIds}
          onReorder={handleReorder}
          onRemove={handleRemove}
          onClear={handleClear}
          onExpand={handleExpand}
          onSelect={handleSelect}
          onRemoveSelected={handleRemoveSelected}
          disabled={busy}
        />
      </main>

      <GeoFaq />
      <TrustFooter />

      <MergeBar
        filename={filename}
        onFilenameChange={setFilename}
        onMerge={handleMerge}
        canMerge={items.length >= 1}
        status={status}
        error={error}
        itemCount={items.length}
        pageCount={pageCount}
        totalSizeBytes={totalSizeBytes}
      />
    </div>
  )
}
