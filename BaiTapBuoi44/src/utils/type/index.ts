import type { CSSProperties, ReactNode } from "react";

type OrderStatus = "pending" | "shipping" | "done" | "canceled";

interface Order {
  id: string;
  customerName: string;
  productName: string;
  totalPrice: number;
  createdAt: string;
  status: OrderStatus;
}

interface Column<T> {
  text: string;
  value: keyof T;
  align?: "left" | "right" | "center";
  style?: CSSProperties;
  render?: (row: T) => ReactNode;
}

export type { Column, Order, OrderStatus };
