import { useEffect, useRef, useState } from 'react'

type GlobalDropOverlayProps = {
  onFiles: (files: FileList | File[]) => void
  disabled?: boolean
}

function dragHasFiles(e: DragEvent): boolean {
  return Array.from(e.dataTransfer?.types ?? []).includes('Files')
}

/**
 * Full-viewport drop target: listen on window so PDFs can be dropped anywhere.
 * Shows an overlay while files are dragged over the page.
 */
export function GlobalDropOverlay({ onFiles, disabled }: GlobalDropOverlayProps) {
  const [active, setActive] = useState(false)
  const depthRef = useRef(0)
  const onFilesRef = useRef(onFiles)
  const disabledRef = useRef(disabled)

  // Clear overlay when the app becomes busy (prop-driven state adjust).
  if (disabled && active) {
    setActive(false)
  }

  useEffect(() => {
    onFilesRef.current = onFiles
  }, [onFiles])

  useEffect(() => {
    disabledRef.current = disabled
    if (disabled) depthRef.current = 0
  }, [disabled])

  useEffect(() => {
    const reset = () => {
      depthRef.current = 0
      setActive(false)
    }

    const onDragEnter = (e: DragEvent) => {
      if (!dragHasFiles(e)) return
      e.preventDefault()
      if (disabledRef.current) return
      depthRef.current += 1
      setActive(true)
    }

    const onDragLeave = (e: DragEvent) => {
      if (!dragHasFiles(e)) return
      e.preventDefault()
      depthRef.current = Math.max(0, depthRef.current - 1)
      if (depthRef.current === 0) setActive(false)
    }

    const onDragOver = (e: DragEvent) => {
      if (!dragHasFiles(e)) return
      e.preventDefault()
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = disabledRef.current ? 'none' : 'copy'
      }
    }

    const onDrop = (e: DragEvent) => {
      if (!dragHasFiles(e)) return
      e.preventDefault()
      reset()
      if (disabledRef.current) return
      if (e.dataTransfer?.files?.length) {
        onFilesRef.current(e.dataTransfer.files)
      }
    }

    const onDragEnd = () => reset()

    window.addEventListener('dragenter', onDragEnter)
    window.addEventListener('dragleave', onDragLeave)
    window.addEventListener('dragover', onDragOver)
    window.addEventListener('drop', onDrop)
    window.addEventListener('dragend', onDragEnd)

    return () => {
      window.removeEventListener('dragenter', onDragEnter)
      window.removeEventListener('dragleave', onDragLeave)
      window.removeEventListener('dragover', onDragOver)
      window.removeEventListener('drop', onDrop)
      window.removeEventListener('dragend', onDragEnd)
    }
  }, [])

  if (!active || disabled) return null

  return (
    <div className="global-drop" role="presentation" aria-hidden="true">
      <div className="global-drop__panel">
        <p className="global-drop__title">Drop to add</p>
        <p className="global-drop__hint">
          Your files stay on this computer — nothing is uploaded
        </p>
      </div>
    </div>
  )
}
