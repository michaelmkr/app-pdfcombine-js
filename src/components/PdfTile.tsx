import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { PdfDocument } from '../types'

type PdfTileProps = {
  doc: PdfDocument
  index: number
  onRemove: (id: string) => void
  disabled?: boolean
}

function PdfPlaceholderIcon() {
  return (
    <svg
      className="pdf-tile__placeholder-icon"
      width="36"
      height="36"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm1 7V3.5L18.5 9H15zM8 13h8v1.5H8V13zm0 3h8v1.5H8V16zm0-6h5v1.5H8V10z"
      />
    </svg>
  )
}

export function PdfTile({ doc, index, onRemove, disabled }: PdfTileProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: doc.id, disabled })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`pdf-tile${isDragging ? ' pdf-tile--dragging' : ''}${disabled ? '' : ' pdf-tile--sortable'}`}
      {...attributes}
      {...listeners}
    >
      <span className="pdf-tile__handle" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 16 16">
          <circle cx="5" cy="4" r="1.25" fill="currentColor" />
          <circle cx="11" cy="4" r="1.25" fill="currentColor" />
          <circle cx="5" cy="8" r="1.25" fill="currentColor" />
          <circle cx="11" cy="8" r="1.25" fill="currentColor" />
          <circle cx="5" cy="12" r="1.25" fill="currentColor" />
          <circle cx="11" cy="12" r="1.25" fill="currentColor" />
        </svg>
      </span>

      <span className="pdf-tile__badge" aria-hidden="true">
        {index + 1}
      </span>

      <button
        type="button"
        className="pdf-tile__remove"
        disabled={disabled}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={() => onRemove(doc.id)}
        aria-label={`Remove ${doc.name}`}
        title="Remove"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="M4 4l8 8M12 4l-8 8"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <div className="pdf-tile__thumb" role="img" aria-label={`Preview of ${doc.name}`}>
        {doc.thumbnailUrl ? (
          <img src={doc.thumbnailUrl} alt="" draggable={false} />
        ) : (
          <div className="pdf-tile__placeholder">
            <PdfPlaceholderIcon />
          </div>
        )}
      </div>

      <div className="pdf-tile__meta">
        <span className="pdf-tile__name" title={doc.name}>
          {doc.name}
        </span>
        <span className="pdf-tile__details">
          {doc.pageCount} {doc.pageCount === 1 ? 'page' : 'pages'}
        </span>
      </div>
    </li>
  )
}
