import { useContext } from "react";
import { ThemeContext } from "../ThemeContext.js";

const Content = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <main className={`book-content ${theme}`}>
      <article className="book-page">
        <p className="chapter-label">Chương 1</p>
        <h2>React và cách giao diện thay đổi theo trạng thái</h2>

        <p>
          Khi xây dựng giao diện bằng React, điều quan trọng nhất không phải là
          thay đổi từng thẻ HTML bằng tay, mà là mô tả giao diện dựa trên trạng
          thái hiện tại của ứng dụng. Khi state thay đổi, React sẽ tính toán lại
          phần giao diện cần cập nhật và hiển thị kết quả mới cho người dùng.
        </p>

        <p>
          Ví dụ, một trang đọc sách có thể có hai trạng thái giao diện là sáng
          và tối. Thay vì viết hai trang riêng biệt, ta chỉ cần lưu giá trị
          <code>theme</code> trong state. Nếu theme là <code>light</code>, trang
          dùng nền sáng và chữ tối. Nếu theme là <code>dark</code>, trang đổi
          sang nền tối và chữ sáng.
        </p>

        <blockquote>
          Giao diện tốt là giao diện phản ánh đúng trạng thái của dữ liệu, không
          phải giao diện được chỉnh sửa thủ công ở quá nhiều nơi.
        </blockquote>

        <p>
          Vấn đề bắt đầu xuất hiện khi nhiều component cùng cần biết theme hiện
          tại. Header cần đổi màu nền, Content cần đổi màu chữ, Footer cũng cần
          đi theo giao diện chung. Nếu truyền theme qua props từ component cha
          xuống từng component con, code vẫn chạy được nhưng sẽ dài và khó mở
          rộng khi ứng dụng lớn hơn.
        </p>

        <p>
          Context API giải quyết tình huống này bằng cách đặt dữ liệu dùng chung
          vào một Provider. Các component bên trong có thể dùng
          <code>useContext</code> để lấy theme và hàm đổi theme mà không cần nhận
          props trực tiếp. Nhờ vậy, logic quản lý theme nằm ở một nơi, còn từng
          phần giao diện chỉ tập trung vào việc hiển thị đúng theo theme đang có.
        </p>

        <section className="references">
          <h3>Tài liệu tham khảo</h3>
          <ul>
            <li>
              React Documentation: phần Passing Data Deeply with Context.
            </li>
            <li>
              React Documentation: phần useContext Hook.
            </li>
            <li>
              React Documentation: phần State as a Snapshot.
            </li>
          </ul>
        </section>
      </article>
    </main>
  );
};

export default Content;
