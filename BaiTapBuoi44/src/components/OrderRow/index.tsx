import { Chip, TableCell, TableRow } from "@mui/material";
import { memo } from "react";
import type { Column, Order, OrderStatus } from "../../utils";
import { statusText } from "../../utils";

interface Props {
  columns: Column<Order>[];
  row: Order;
}

const statusStyle: Record<OrderStatus, { color: string; background: string; border: string }> = {
  pending: {
    color: "#c2410c",
    background: "#fff4ed",
    border: "#ffb088",
  },
  shipping: {
    color: "#0369a1",
    background: "#e0f2fe",
    border: "#7dd3fc",
  },
  done: {
    color: "#15803d",
    background: "#dcfce7",
    border: "#86efac",
  },
  canceled: {
    color: "#dc2626",
    background: "#fee2e2",
    border: "#fca5a5",
  },
};

const OrderRow = ({ columns, row }: Props) => {
  return (
    <TableRow hover>
      {columns.map((column) => {
        if (column.render) {
          return (
            <TableCell key={String(column.value)} align={column.align}>
              {column.render(row)}
            </TableCell>
          );
        }

        if (column.value === "status") {
          return (
            <TableCell key="status">
              <Chip
                size="small"
                label={statusText[row.status]}
                variant="outlined"
                sx={{
                  color: statusStyle[row.status].color,
                  backgroundColor: statusStyle[row.status].background,
                  borderColor: statusStyle[row.status].border,
                  fontWeight: 700,
                }}
              />
            </TableCell>
          );
        }

        return (
          <TableCell
            key={String(column.value)}
            align={column.align}
            style={column.style}
          >
            {String(row[column.value])}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default memo(OrderRow);
