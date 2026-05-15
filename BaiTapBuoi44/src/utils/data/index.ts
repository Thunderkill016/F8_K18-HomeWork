import type { Order, OrderStatus } from "../type";

const productNames = [
  "Ao thun",
  "Giay sneaker",
  "Tai nghe",
  "Balo laptop",
  "Ban phim co",
  "Chuot khong day",
  "Dong ho thong minh",
  "May anh mini",
];

const customerNames = [
  "Nguyen Van An",
  "Tran Bao Ngoc",
  "Le Minh Quan",
  "Pham Nhat Linh",
  "Hoang Gia Huy",
  "Vu Khanh Vy",
  "Dang Thanh Tam",
  "Bui Mai Anh",
  "Do Quang Hieu",
  "Phan Tue Minh",
];

const statuses: OrderStatus[] = ["pending", "shipping", "done", "canceled"];

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getRecentDate = (index: number) => {
  const date = new Date();
  date.setDate(date.getDate() - (index % 90));

  return formatDate(date);
};

const createOrder = (id: number): Order => {
  const totalPrice = ((id * 379_000) % 5_500_000) + 400_000;

  return {
    id: `ORD-${String(id).padStart(3, "0")}`,
    customerName: customerNames[id % customerNames.length],
    productName: productNames[(id * 3) % productNames.length],
    totalPrice,
    createdAt: getRecentDate(id),
    status: statuses[id % statuses.length],
  };
};

const createOrders = (total: number) =>
  Array.from({ length: total }, (_, index) => createOrder(index + 1));

export { createOrder, createOrders, statuses };
