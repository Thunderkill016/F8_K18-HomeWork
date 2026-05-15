import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { memo } from "react";
import type { Column, Order } from "../../utils";
import OrderRow from "../OrderRow";

interface Props {
  columns: Column<Order>[];
  rows: Order[];
}

const TableContainer = ({ columns, rows }: Props) => {
  return (
    <Table stickyHeader size="small" aria-label="order table">
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell
              key={String(column.value)}
              align={column.align}
              style={column.style}
            >
              {column.text}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <OrderRow key={row.id} columns={columns} row={row} />
        ))}
      </TableBody>
    </Table>
  );
};

export default memo(TableContainer);
