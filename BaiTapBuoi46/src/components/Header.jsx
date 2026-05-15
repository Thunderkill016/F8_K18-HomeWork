import { useContext } from "react";
import { ThemeContext } from "../ThemeContext.js";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <header className={`site-header ${theme}`}>
      <div className="header-brand">
        <span className="book-icon" aria-hidden="true">
          ▭
        </span>
        <h1>Ứng dụng Đọc Sách</h1>
      </div>

      <button
        className="theme-toggle"
        type="button"
        onClick={toggleTheme}
        aria-label="Chuyển đổi giao diện"
        title="Chuyển đổi giao diện"
      >
        <span aria-hidden="true">{isDark ? "☀" : "☾"}</span>
        <span>Chuyển đổi giao diện</span>
      </button>
    </header>
  );
};

export default Header;
