import { useEffect, useMemo, useRef, useState } from "react";
import SheetCell from "./SheetCell.jsx";

const ROW_COUNT = 12;
const COLUMNS = ["A", "B", "C", "D", "E", "F"];

const createInitialData = () =>
  Array.from({ length: ROW_COUNT }, (_, rowIndex) =>
    COLUMNS.map((column, columnIndex) => {
      if (rowIndex === 0 && columnIndex === 0) return "Kế hoạch học";
      if (rowIndex === 1 && columnIndex === 0) return "HTML/CSS";
      if (rowIndex === 1 && columnIndex === 1) return "Ôn selector";
      if (rowIndex === 2 && columnIndex === 0) return "JavaScript";
      if (rowIndex === 2 && columnIndex === 1) return "Làm bài DOM";
      if (rowIndex === 3 && columnIndex === 0) return "React";
      if (rowIndex === 3 && columnIndex === 1) return "Context API";

      return "";
    }),
  );

const isTypingKey = (event) => {
  if (event.ctrlKey || event.metaKey || event.altKey) return false;
  if (event.key.length === 1) return true;

  return event.key === "Backspace" || event.key === "Delete";
};

const getCellKey = (rowIndex, columnIndex) => `${rowIndex}-${columnIndex}`;

const Spreadsheet = () => {
  const [sheetData, setSheetData] = useState(createInitialData);
  const [selectedCell, setSelectedCell] = useState({ row: 0, column: 0 });
  const [editingCell, setEditingCell] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [shouldSelectInput, setShouldSelectInput] = useState(true);

  const cellRefs = useRef({});
  const inputRef = useRef(null);

  const selectedCellKey = useMemo(
    () => getCellKey(selectedCell.row, selectedCell.column),
    [selectedCell],
  );

  const startEditing = (rowIndex, columnIndex, initialValue, shouldSelect = true) => {
    setSelectedCell({ row: rowIndex, column: columnIndex });
    setEditingCell({ row: rowIndex, column: columnIndex });
    setEditingValue(initialValue);
    setShouldSelectInput(shouldSelect);
  };

  const commitEditing = () => {
    if (!editingCell) return;

    setSheetData((currentData) =>
      currentData.map((row, rowIndex) =>
        rowIndex === editingCell.row
          ? row.map((cell, columnIndex) =>
              columnIndex === editingCell.column ? editingValue : cell,
            )
          : row,
      ),
    );

    const nextColumn = Math.min(editingCell.column + 1, COLUMNS.length - 1);
    const nextCell = { row: editingCell.row, column: nextColumn };

    setEditingCell(null);
    setEditingValue("");
    setShouldSelectInput(true);
    setSelectedCell(nextCell);

    window.requestAnimationFrame(() => {
      cellRefs.current[getCellKey(nextCell.row, nextCell.column)]?.focus();
    });
  };

  const cancelEditing = () => {
    if (!editingCell) return;

    const currentCell = { row: editingCell.row, column: editingCell.column };
    setEditingCell(null);
    setEditingValue("");
    setShouldSelectInput(true);
    setSelectedCell(currentCell);

    window.requestAnimationFrame(() => {
      cellRefs.current[getCellKey(currentCell.row, currentCell.column)]?.focus();
    });
  };

  const onCellKeyDown = (event, rowIndex, columnIndex) => {
    if (editingCell) return;

    if (event.key === "Enter") {
      event.preventDefault();
      startEditing(rowIndex, columnIndex, sheetData[rowIndex][columnIndex]);
      return;
    }

    if (!isTypingKey(event)) return;

    event.preventDefault();
    const nextValue =
      event.key === "Backspace" || event.key === "Delete" ? "" : event.key;

    startEditing(rowIndex, columnIndex, nextValue, false);
  };

  const onInputKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      commitEditing();
    }

    if (event.key === "Escape") {
      event.preventDefault();
      cancelEditing();
    }
  };

  useEffect(() => {
    if (!editingCell) return;

    inputRef.current?.focus();
    if (shouldSelectInput) {
      inputRef.current?.select();
      return;
    }

    const cursorPosition = inputRef.current?.value.length ?? 0;
    inputRef.current?.setSelectionRange(cursorPosition, cursorPosition);
  }, [editingCell, shouldSelectInput]);

  return (
    <div className="sheet-panel">
      <div className="formula-bar">
        <span className="active-cell-name">
          {COLUMNS[selectedCell.column]}
          {selectedCell.row + 1}
        </span>
        <span className="formula-value">
          {editingCell ? editingValue : sheetData[selectedCell.row][selectedCell.column]}
        </span>
      </div>

      <div className="sheet-scroll">
        <table className="sheet-table">
          <thead>
            <tr>
              <th className="corner-cell" />
              {COLUMNS.map((column) => (
                <th key={column} className="column-header">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sheetData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <th className="row-header">{rowIndex + 1}</th>
                {row.map((cell, columnIndex) => {
                  const cellKey = getCellKey(rowIndex, columnIndex);
                  const isSelected = selectedCellKey === cellKey;
                  const isEditing =
                    editingCell?.row === rowIndex &&
                    editingCell?.column === columnIndex;

                  return (
                    <SheetCell
                      key={cellKey}
                      ref={(element) => {
                        cellRefs.current[cellKey] = element;
                      }}
                      cell={cell}
                      isSelected={isSelected}
                      isEditing={isEditing}
                      editingValue={editingValue}
                      inputRef={inputRef}
                      onSelect={() => {
                        setSelectedCell({ row: rowIndex, column: columnIndex });
                      }}
                      onStartEditing={() => {
                        startEditing(rowIndex, columnIndex, cell);
                      }}
                      onCellKeyDown={(event) => {
                        onCellKeyDown(event, rowIndex, columnIndex);
                      }}
                      onEditingValueChange={setEditingValue}
                      onCommitEditing={commitEditing}
                      onInputKeyDown={onInputKeyDown}
                    />
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Spreadsheet;
