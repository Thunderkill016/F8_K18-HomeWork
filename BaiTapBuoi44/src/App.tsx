import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { TableContainer } from "./components";
import { createOrders, moneyFormatter } from "./utils";
import type { Column, Order } from "./utils";

const defaultOrders = createOrders(1000);

function App() {
  const [orders] = useState<Order[]>(defaultOrders);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [counter, setCounter] = useState(0);

  const columns: Column<Order>[] = useMemo(
    () => [
      { text: "Mã ĐH", value: "id", style: { width: 120 } },
      { text: "Khách hàng", value: "customerName" },
      { text: "Ngày tạo", value: "createdAt", style: { width: 150 } },
      {
        text: "Giá trị",
        value: "totalPrice",
        align: "right",
        render: (order) => moneyFormatter.format(order.totalPrice),
      },
      { text: "Trạng thái", value: "status", style: { width: 160 } },
    ],
    [],
  );

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const isAfterStart = !fromDate || order.createdAt >= fromDate;
      const isBeforeEnd = !toDate || order.createdAt <= toDate;

      return isAfterStart && isBeforeEnd;
    });
  }, [orders, fromDate, toDate]);

  const completedRevenue = useMemo(() => {
    return filteredOrders.reduce((total, order) => {
      if (order.status !== "done") return total;
      return total + order.totalPrice;
    }, 0);
  }, [filteredOrders]);

  const handleReset = () => {
    setFromDate("");
    setToDate("");
  };

  return (
    <Box className="app-shell">
      <Container maxWidth="lg" className="workspace">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          className="toolbar"
          sx={{ justifyContent: "space-between" }}
        >
          <Box>
            <Typography variant="h4" component="h1" className="page-title">
              Dashboard đơn hàng
            </Typography>
          </Box>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
            <Button variant="outlined" onClick={() => setCounter(counter + 1)}>
              Counter: {counter}
            </Button>
          </Stack>
        </Stack>

        <Box className="summary-grid">
          <Paper className="summary-card">
            <Typography variant="body2">Số lượng đơn hàng</Typography>
            <Typography variant="h6">{filteredOrders.length} đơn</Typography>
          </Paper>
          <Paper className="summary-card">
            <Typography variant="body2">Tổng doanh thu (Hoàn thành)</Typography>
            <Typography variant="h6">
              {moneyFormatter.format(completedRevenue)}
            </Typography>
          </Paper>
        </Box>

        <Paper className="filter-panel">
          <Typography variant="h6">Bộ lọc theo ngày</Typography>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            className="date-filters"
            sx={{ alignItems: { xs: "stretch", md: "end" } }}
          >
            <Box className="date-field">
              <Typography variant="body2">Từ ngày</Typography>
              <TextField
                type="date"
                value={fromDate}
                onChange={(event) => setFromDate(event.target.value)}
                size="small"
                fullWidth
              />
            </Box>
            <Box className="date-field">
              <Typography variant="body2">Đến ngày</Typography>
              <TextField
                type="date"
                value={toDate}
                onChange={(event) => setToDate(event.target.value)}
                size="small"
                fullWidth
              />
            </Box>
            <Button className="clear-button" onClick={handleReset}>
              Xóa bộ lọc
            </Button>
          </Stack>
        </Paper>

        <Paper className="table-panel">
          <Box className="table-title">
            <Typography variant="h6">Danh sách đơn hàng</Typography>
          </Box>
          <Box className="table-wrap">
            <TableContainer columns={columns} rows={filteredOrders} />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default App;
