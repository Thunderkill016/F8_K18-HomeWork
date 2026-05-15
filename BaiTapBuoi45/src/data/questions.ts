import type { Question } from "../types";

const questions: Question[] = [
  {
    id: 10,
    text: "Khái niệm 'đường bộ' được hiểu như thế nào là đúng?",
    options: [
      "Đường, cầu đường bộ.",
      "Hầm đường bộ, bến phà đường bộ.",
      "Đường, cầu đường bộ, hầm đường bộ, bến phà đường bộ và các công trình phụ trợ.",
    ],
    correct: 2,
  },
  {
    id: 4,
    text: "Người lái xe được hiểu như thế nào trong các khái niệm dưới đây?",
    options: [
      "Là người điều khiển xe cơ giới.",
      "Là người điều khiển xe thô sơ.",
      "Là người điều khiển xe có súc vật kéo.",
    ],
    correct: 0,
  },
  {
    id: 2,
    text: "Trong các khái niệm dưới đây, 'dải phân cách' được hiểu thế nào là đúng?",
    options: [
      "Là bộ phận của đường để ngăn cách không cho các loại xe vào những nơi không được phép.",
      "Là bộ phận của đường để phân chia mặt đường thành hai chiều xe chạy riêng biệt hoặc để phân chia phần đường của xe cơ giới và xe thô sơ.",
      "Là bộ phận của đường để phân tách phần đường xe chạy và hành lang an toàn giao thông.",
    ],
    correct: 1,
  },
  {
    id: 40,
    text: "Người tham gia giao thông đường bộ gồm những đối tượng nào?",
    options: [
      "Người điều khiển, người sử dụng phương tiện tham gia giao thông đường bộ.",
      "Người điều khiển, dẫn dắt súc vật; người đi bộ trên đường bộ.",
      "Cả ý 1 và ý 2.",
    ],
    correct: 2,
  },
  {
    id: 1,
    text: "Theo Luật Giao thông đường bộ, tín hiệu vàng báo hiệu điều gì?",
    options: [
      "Phải dừng lại trước vạch dừng, trừ trường hợp đã đi quá vạch dừng thì được đi tiếp.",
      "Báo hiệu sự thay đổi tín hiệu của đèn xanh sang đèn đỏ.",
      "Cả 2 ý trên.",
    ],
    correct: 0,
  },
];

export default questions;
