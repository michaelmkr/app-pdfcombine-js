import { useRef } from 'react'

type DropZoneProps = {
  onFiles: (files: FileList | File[]) => void
  disabled?: boolean
  /** Compact strip when the merge queue already has files */
  compact?: boolean
}

/** Secondary add controls — global window drop handles drag-and-drop. */
export function DropZone({ onFiles, disabled, compact }: DropZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const folderInputRef = useRef<HTMLInputElement>(null)

  const className = [
    'dropzone',
    compact ? 'dropzone--compact' : 'dropzone--hero',
    disabled ? 'dropzone--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={className} role="region" aria-label="Add PDF files">
      <div className="dropzone__visual" aria-hidden="true">
        <svg
          className="dropzone__glyph"
          width="48"
          height="48"
          viewBox="0 0 48 48"
        >
          <rect
            x="10"
            y="6"
            width="22"
            height="28"
            rx="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M26 6v8h8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M28 22h12M34 16v12"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="dropzone__copy">
        <p className="dropzone__title">
          {compact
            ? 'Add more PDFs'
            : 'Drop PDFs anywhere on this page'}
        </p>
        <p className="dropzone__hint">
          {compact
            ? 'or choose files / a folder'
            : 'Your merge queue is empty. Choose files or a folder to get started.'}
        </p>
      </div>
      <div className="dropzone__actions">
        <button
          type="button"
          className={`btn btn--primary${compact ? '' : ' btn--lg'}`}
          disabled={disabled}
          onClick={() => fileInputRef.current?.click()}
        >
          Choose files
        </button>
        <button
          type="button"
          className="btn btn--secondary"
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
