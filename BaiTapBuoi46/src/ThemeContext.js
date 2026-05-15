import { createContext, createElement, useState } from "react";

const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  return createElement(
    ThemeContext.Provider,
    { value: { theme, toggleTheme } },
    children,
  );
};

export { ThemeContext, ThemeProvider };
