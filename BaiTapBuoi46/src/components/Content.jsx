import { useContext } from "react";
import { ThemeContext } from "../ThemeContext.js";

const Content = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <main className={`book-content ${theme}`}>
      <article className="book-page">
        <p className="chapter-label">Chương 1</p>
        <h2>React: xây giao diện từ những phần nhỏ</h2>

        <p>
          Trên trang chủ React, có một ý rất dễ nhớ: React giúp tạo giao diện từ
          các phần riêng lẻ gọi là component. Một trang lớn có thể được ghép từ
          nhiều mảnh nhỏ như thumbnail, nút thích, danh sách video, thanh tìm
          kiếm hoặc một form nhập liệu. Khi mỗi phần được tách rõ nhiệm vụ, việc
          đọc code và sửa giao diện sẽ nhẹ hơn nhiều.
        </p>

        <p>
          Component trong React là các hàm JavaScript trả về phần giao diện cần
          hiển thị. Nếu cần hiển thị theo điều kiện, có thể dùng <code>if</code>.
          Nếu cần render danh sách, có thể dùng <code>map()</code>. Vì vậy học
          React không tách rời JavaScript, mà là dùng JavaScript để mô tả giao
          diện rõ ràng hơn.
        </p>

        <blockquote>
          “The library for web and native user interfaces”
        </blockquote>

        <p>
          React cũng tập trung nhiều vào phần tương tác. Khi người dùng nhập vào
          ô tìm kiếm, bấm nút hoặc chọn một giá trị, dữ liệu trong component thay
          đổi và màn hình được cập nhật theo dữ liệu mới. Cách làm này giúp giao
          diện bám sát trạng thái hiện tại thay vì phải tự sửa từng thẻ HTML.
        </p>

        <p>
          Khi cần xây cả ứng dụng lớn, React có thể đi cùng các framework để xử
          lý routing, lấy dữ liệu và render phía server. Ngoài web, cùng một
          cách tư duy component còn có thể dùng cho ứng dụng native. Điểm hay là
          kỹ năng viết component, quản lý state và tổ chức giao diện vẫn được
          dùng lại ở nhiều môi trường khác nhau.
        </p>
      </article>
    </main>
  );
};

export default Content;
