import { useCallback, useEffect, useRef, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import { DropZone } from './components/DropZone'
import { GlobalDropOverlay } from './components/GlobalDropOverlay'
import { PdfList } from './components/PdfList'
import { MergeBar } from './components/MergeBar'
import { loadPdfFiles, revokeDocThumbnails } from './lib/loadPdf'
import { mergePdfs } from './lib/mergePdfs'
import { savePdf } from './lib/download'
import type { PdfDocument } from './types'

export default function App() {
  const [docs, setDocs] = useState<PdfDocument[]>([])
  const [filename, setFilename] = useState('combined.pdf')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const docsRef = useRef(docs)

  useEffect(() => {
    docsRef.current = docs
  }, [docs])

  useEffect(() => {
    return () => {
      revokeDocThumbnails(docsRef.current)
    }
  }, [])

  const handleFiles = useCallback(async (files: FileList | File[]) => {
    setError(null)
    setNotice(null)
    setBusy(true)
    try {
      const { docs: loaded, skipped } = await loadPdfFiles(files)
      if (loaded.length === 0) {
        setError(
          skipped > 0
            ? 'No valid PDFs found. Encrypted or corrupt files are skipped.'
            : 'No PDF files selected.',
        )
        return
      }
      setDocs((prev) => [...prev, ...loaded])
      if (skipped > 0) {
        setNotice(
          `Added ${loaded.length} PDF${loaded.length === 1 ? '' : 's'}; skipped ${skipped} non-PDF or unreadable file${skipped === 1 ? '' : 's'}.`,
        )
      }
    } catch {
      setError('Failed to read one or more files.')
    } finally {
      setBusy(false)
    }
  }, [])

  const handleReorder = useCallback((activeId: string, overId: string) => {
    setDocs((prev) => {
      const oldIndex = prev.findIndex((d) => d.id === activeId)
      const newIndex = prev.findIndex((d) => d.id === overId)
      if (oldIndex < 0 || newIndex < 0) return prev
      return arrayMove(prev, oldIndex, newIndex)
    })
  }, [])

  const handleRemove = useCallback((id: string) => {
    setDocs((prev) => {
      const removed = prev.find((d) => d.id === id)
      if (removed) revokeDocThumbnails([removed])
      return prev.filter((d) => d.id !== id)
    })
  }, [])

  const handleClear = useCallback(() => {
    setDocs((prev) => {
      revokeDocThumbnails(prev)
      return []
    })
    setError(null)
    setNotice(null)
  }, [])

  const handleMerge = useCallback(async () => {
    if (docs.length === 0) return
    setError(null)
    setNotice(null)
    setBusy(true)
    try {
      const blob = await mergePdfs(docs)
      await savePdf(blob, filename)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Merge failed. Try fewer or different PDFs.'
      setError(
        /encrypted|password/i.test(message)
          ? 'One or more PDFs are password-protected and cannot be merged in v1.'
          : message,
      )
    } finally {
      setBusy(false)
    }
  }, [docs, filename])

  return (
    <div className="app">
      <GlobalDropOverlay onFiles={handleFiles} disabled={busy} />

      <header className="app__header">
        <h1>Local PDF Combiner</h1>
        <p className="app__privacy">
          Files never leave your device. Merging runs entirely in your browser —
          nothing is uploaded to a server.
        </p>
      </header>

      <main className="app__main">
        <DropZone onFiles={handleFiles} disabled={busy} />
        {notice ? (
          <p className="app__notice" role="status">
            {notice}
          </p>
        ) : null}
        <PdfList
          docs={docs}
          onReorder={handleReorder}
          onRemove={handleRemove}
          onClear={handleClear}
          disabled={busy}
        />
      </main>

      <MergeBar
        filename={filename}
        onFilenameChange={setFilename}
        onMerge={handleMerge}
        canMerge={docs.length >= 1}
        busy={busy}
        error={error}
      />
    </div>
  )
}
