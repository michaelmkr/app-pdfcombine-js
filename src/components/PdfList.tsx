import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import type { PdfDocument } from '../types'
import { PdfTile } from './PdfTile'

type PdfListProps = {
  docs: PdfDocument[]
  onReorder: (activeId: string, overId: string) => void
  onRemove: (id: string) => void
  onClear: () => void
  disabled?: boolean
}

export function PdfList({ docs, onReorder, onRemove, onClear, disabled }: PdfListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    onReorder(String(active.id), String(over.id))
  }

  if (docs.length === 0) {
    return (
      <p className="pdf-list__empty">No PDFs added yet. Drop or choose files above.</p>
    )
  }

  const totalPages = docs.reduce((sum, d) => sum + d.pageCount, 0)

  return (
    <section className="pdf-list" aria-label="PDF merge order">
      <div className="pdf-list__header">
        <h2>
          Merge order
          <span className="pdf-list__count">
            {docs.length} {docs.length === 1 ? 'file' : 'files'} · {totalPages}{' '}
            {totalPages === 1 ? 'page' : 'pages'}
          </span>
        </h2>
        <button
          type="button"
          className="btn btn--ghost btn--sm"
          disabled={disabled}
          onClick={onClear}
        >
          Clear all
        </button>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={docs.map((d) => d.id)}
          strategy={rectSortingStrategy}
        >
          <ul className="pdf-list__grid">
            {docs.map((doc, index) => (
              <PdfTile
                key={doc.id}
                doc={doc}
                index={index}
                onRemove={onRemove}
                disabled={disabled}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </section>
  )
}
