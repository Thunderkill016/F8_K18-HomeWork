import { useContext } from "react";
import { ThemeContext } from "../ThemeContext.js";

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <footer className={`site-footer ${theme}`}>
      <p>Bản quyền © 2026</p>
    </footer>
  );
};

export default Footer;
