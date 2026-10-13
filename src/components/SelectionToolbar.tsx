import { useLocale } from '../i18n'

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
  const { t } = useLocale()

  if (selectedCount === 0) return null

  return (
    <div className="selection-toolbar" role="toolbar" aria-label={t.selection.aria}>
      <span className="selection-toolbar__count">
        {t.selection.selected(selectedCount)}
      </span>
      <button
        type="button"
        className="btn btn--ghost btn--sm"
        disabled={disabled}
        onClick={onRemoveSelected}
      >
        {t.selection.removeSelected}
      </button>
    </div>
  )
}
