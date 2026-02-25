import { createContext, useEffect, useState } from "react";

const LIGHT_THEME = "messageapp-light";
const DARK_THEME = "messageapp-dark";
const THEME_KEY = "messageapp-theme";

const ThemeContext = createContext({
  theme: LIGHT_THEME,
  isDark: false,
  toggleTheme: () => {},
});

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") {
      return LIGHT_THEME;
    }

    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === LIGHT_THEME || savedTheme === DARK_THEME) {
      return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? DARK_THEME
      : LIGHT_THEME;
  });

  const toggleTheme = () => {
    const newTheme = theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
    setTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{ theme, isDark: theme === DARK_THEME, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
