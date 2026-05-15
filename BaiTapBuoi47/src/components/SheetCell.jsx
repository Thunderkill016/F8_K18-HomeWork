import { forwardRef } from "react";

const SheetCell = forwardRef(
  (
    {
      cell,
      isSelected,
      isEditing,
      editingValue,
      onSelect,
      onStartEditing,
      onCellKeyDown,
      onEditingValueChange,
      onCommitEditing,
      onInputKeyDown,
      inputRef,
    },
    ref,
  ) => {
    return (
      <td
        ref={ref}
        className={[
          "sheet-cell",
          isSelected ? "selected" : "",
          isEditing ? "editing" : "",
        ].join(" ")}
        tabIndex={0}
        onClick={(event) => {
          onSelect();
          event.currentTarget.focus();
        }}
        onDoubleClick={onStartEditing}
        onKeyDown={onCellKeyDown}
      >
        {isEditing ? (
          <input
            ref={inputRef}
            className="cell-input"
            value={editingValue}
            onChange={(event) => onEditingValueChange(event.target.value)}
            onBlur={onCommitEditing}
            onKeyDown={onInputKeyDown}
          />
        ) : (
          <span>{cell}</span>
        )}
      </td>
    );
  },
);

SheetCell.displayName = "SheetCell";

export default SheetCell;
