import { useRef } from 'react'

type DropZoneProps = {
  onFiles: (files: FileList | File[]) => void
  disabled?: boolean
}

/** Secondary add controls — global window drop handles drag-and-drop. */
export function DropZone({ onFiles, disabled }: DropZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const folderInputRef = useRef<HTMLInputElement>(null)

  return (
    <div
      className={`dropzone${disabled ? ' dropzone--disabled' : ''}`}
      role="region"
      aria-label="Add PDF files"
    >
      <p className="dropzone__title">Drop PDFs anywhere on this page</p>
      <p className="dropzone__hint">or choose files from your device</p>
      <div className="dropzone__actions">
        <button
          type="button"
          className="btn btn--primary"
          disabled={disabled}
          onClick={() => fileInputRef.current?.click()}
        >
          Choose files
        </button>
        <button
          type="button"
          className="btn btn--ghost"
          disabled={disabled}
          onClick={() => folderInputRef.current?.click()}
          title="Select a folder (Chrome / Edge)"
        >
          Choose folder
        </button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf,.pdf"
        multiple
        hidden
        onChange={(e) => {
          if (e.target.files?.length) onFiles(e.target.files)
          e.target.value = ''
        }}
      />
      <input
        ref={(el) => {
          folderInputRef.current = el
          if (el) {
            el.setAttribute('webkitdirectory', '')
            el.setAttribute('directory', '')
          }
        }}
        type="file"
        multiple
        hidden
        onChange={(e) => {
          if (e.target.files?.length) onFiles(e.target.files)
          e.target.value = ''
        }}
      />
    </div>
  )
}
