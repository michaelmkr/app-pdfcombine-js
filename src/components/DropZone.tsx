import { useRef } from 'react'
import { useLocale } from '../i18n'

type DropZoneProps = {
  onFiles: (files: FileList | File[]) => void
  disabled?: boolean
  /** Compact strip when the merge queue already has files */
  compact?: boolean
}

/** Secondary add controls — global window drop handles drag-and-drop. */
export function DropZone({ onFiles, disabled, compact }: DropZoneProps) {
  const { t } = useLocale()
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
    <div className={className} role="region" aria-label={t.dropzone.aria}>
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
          {compact ? t.dropzone.titleCompact : t.dropzone.title}
        </p>
        <p className="dropzone__hint">
          {compact ? t.dropzone.hintCompact : t.dropzone.hint}
        </p>
      </div>
      <div className="dropzone__actions">
        <button
          type="button"
          className={`btn btn--primary${compact ? '' : ' btn--lg'}`}
          disabled={disabled}
          onClick={() => fileInputRef.current?.click()}
        >
          {t.dropzone.chooseFiles}
        </button>
        <button
          type="button"
          className="btn btn--secondary"
          disabled={disabled}
          onClick={() => folderInputRef.current?.click()}
          title={t.dropzone.folderTitle}
        >
          {t.dropzone.chooseFolder}
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
