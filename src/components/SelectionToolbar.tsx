type SelectionToolbarProps = {
  selectedCount: number
  onRemoveSelected: () => void
  disabled?: boolean
}

export function SelectionToolbar({
  selectedCount,
  onRemoveSelected,
  disabled,
}: SelectionToolbarProps) {
  if (selectedCount === 0) return null

  return (
    <div className="selection-toolbar" role="toolbar" aria-label="Selection">
      <span className="selection-toolbar__count">
        {selectedCount} selected
      </span>
      <button
        type="button"
        className="btn btn--ghost btn--sm"
        disabled={disabled}
        onClick={onRemoveSelected}
      >
        Remove selected
      </button>
    </div>
  )
}
