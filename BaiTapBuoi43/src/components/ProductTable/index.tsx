import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Column, Row } from "../../utils";

interface Props {
  columns: Column[];
  rows: Row[];
  onClickEdit?: (id: number) => void;
  onClickDelete?: (id: number) => void;
}

const ProductTable = ({ columns, rows, onClickEdit, onClickDelete }: Props) => {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          {columns.map((col) => (
            <TableCell style={col.style} key={col.value}>
              {col.text}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            {columns.map((col) => {
              if (col.value === "action") {
                return (
                  <TableCell key="action">
                    <EditOutlinedIcon
                      sx={{ cursor: "pointer" }}
                      color="success"
                      onClick={() => onClickEdit?.(row.id)}
                    />
                    <DeleteIcon
                      sx={{ cursor: "pointer" }}
                      color="error"
                      onClick={() => onClickDelete?.(row.id)}
                    />
                  </TableCell>
                );
              }
              return (
                <TableCell style={col.style} key={col.value}>
                  {row[col.value]}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
