import type { MouseEvent } from 'react'
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
import { useLocale } from '../i18n'
import type { MergeItem, PdfDocument } from '../types'
import { countMergePages } from '../lib/mergePdfs'
import { PdfTile } from './PdfTile'
import { SelectionToolbar } from './SelectionToolbar'

type PdfListProps = {
  items: MergeItem[]
  docsById: Record<string, PdfDocument>
  selectedIds: Set<string>
  onReorder: (activeId: string, overId: string) => void
  onRemove: (id: string) => void
  onClear: () => void
  onExpand: (id: string) => void
  onSelect: (id: string, event: MouseEvent) => void
  onRemoveSelected: () => void
  disabled?: boolean
}

export function PdfList({
  items,
  docsById,
  selectedIds,
  onReorder,
  onRemove,
  onClear,
  onExpand,
  onSelect,
  onRemoveSelected,
  disabled,
}: PdfListProps) {
  const { t } = useLocale()
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

  if (items.length === 0) return null

  const fileCount = new Set(items.map((i) => i.docId)).size
  const totalPages = countMergePages(items, docsById)

  return (
    <section className="pdf-list" aria-label={t.gallery.aria}>
      <div className="pdf-list__header">
        <h2>
          {t.gallery.title}
          <span className="pdf-list__count">
            {fileCount} {fileCount === 1 ? t.gallery.file : t.gallery.files} ·{' '}
            {items.length}{' '}
            {items.length === 1 ? t.gallery.item : t.gallery.items} ·{' '}
            {totalPages} {totalPages === 1 ? t.gallery.page : t.gallery.pages}
          </span>
        </h2>
        <button
          type="button"
          className="btn btn--ghost btn--sm"
          disabled={disabled}
          onClick={onClear}
        >
          {t.gallery.clearAll}
        </button>
      </div>

      <SelectionToolbar
        selectedCount={selectedIds.size}
        onRemoveSelected={onRemoveSelected}
        disabled={disabled}
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((d) => d.id)}
          strategy={rectSortingStrategy}
        >
          <ul className="pdf-list__grid">
            {items.map((item, index) => (
              <PdfTile
                key={item.id}
                item={item}
                doc={docsById[item.docId]}
                index={index}
                selected={selectedIds.has(item.id)}
                onRemove={onRemove}
                onExpand={onExpand}
                onSelect={onSelect}
                disabled={disabled}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </section>
  )
}
