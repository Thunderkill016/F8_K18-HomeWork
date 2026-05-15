import type { OrderStatus } from "../type";

const moneyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

const statusText: Record<OrderStatus, string> = {
  pending: "Đang xử lý",
  shipping: "Đang giao",
  done: "Hoàn thành",
  canceled: "Đã hủy",
};

export { moneyFormatter, statusText };
