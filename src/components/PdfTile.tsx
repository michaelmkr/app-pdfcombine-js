import type { MouseEvent } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { MergeItem, PdfDocument } from '../types'

type PdfTileProps = {
  item: MergeItem
  doc: PdfDocument | undefined
  index: number
  selected: boolean
  onRemove: (id: string) => void
  onExpand?: (id: string) => void
  onSelect: (id: string, event: MouseEvent) => void
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

function ThumbSpinner() {
  return (
    <div className="pdf-tile__spinner" aria-hidden="true">
      <span className="status-banner__spinner" />
    </div>
  )
}

export function PdfTile({
  item,
  doc,
  index,
  selected,
  onRemove,
  onExpand,
  onSelect,
  disabled,
}: PdfTileProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id, disabled })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const name = doc?.name ?? 'Unknown'
  const isPage = item.kind === 'page'
  const pageLabel = isPage ? (item.pageIndex ?? 0) + 1 : null
  const subtitle = isPage
    ? `${name} · p. ${pageLabel}`
    : `${doc?.pageCount ?? '?'} ${(doc?.pageCount ?? 0) === 1 ? 'page' : 'pages'}`
  const canExpand =
    item.kind === 'file' && doc != null && doc.pageCount > 1 && onExpand != null

  const className = [
    'pdf-tile',
    isDragging ? 'pdf-tile--dragging' : '',
    disabled ? '' : 'pdf-tile--sortable',
    selected ? 'pdf-tile--selected' : '',
    isPage ? 'pdf-tile--page' : 'pdf-tile--file',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={className}
      data-selected={selected ? 'true' : undefined}
      aria-selected={selected}
      onClick={(e) => {
        // Don't select when clicking interactive controls.
        const target = e.target as HTMLElement
        if (target.closest('button')) return
        onSelect(item.id, e)
      }}
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
        onClick={(e) => {
          e.stopPropagation()
          onRemove(item.id)
        }}
        aria-label={
          isPage ? `Remove page ${pageLabel} of ${name}` : `Remove ${name}`
        }
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

      <div
        className="pdf-tile__thumb"
        role="img"
        aria-label={
          isPage ? `Preview of ${name} page ${pageLabel}` : `Preview of ${name}`
        }
      >
        {item.thumbLoading ? (
          <ThumbSpinner />
        ) : item.thumbnailUrl ? (
          <img src={item.thumbnailUrl} alt="" draggable={false} />
        ) : (
          <div className="pdf-tile__placeholder">
            <PdfPlaceholderIcon />
          </div>
        )}
      </div>

      <div className="pdf-tile__meta">
        <span className="pdf-tile__name" title={isPage ? subtitle : name}>
          {isPage ? `Page ${pageLabel}` : name}
        </span>
        <span className="pdf-tile__details">{subtitle}</span>
        {canExpand ? (
          <button
            type="button"
            className="pdf-tile__expand"
            disabled={disabled}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation()
              onExpand(item.id)
            }}
          >
            Expand {doc?.pageCount} pages
          </button>
        ) : null}
      </div>
    </li>
  )
}
