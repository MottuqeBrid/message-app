import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeProvider";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <label
      className="swap swap-rotate btn btn-ghost btn-circle"
      aria-label="Toggle theme"
    >
      <input type="checkbox" checked={isDark} onChange={toggleTheme} />
      <span className="swap-off text-lg" aria-hidden="true">
        {/* ☀️ */}
        <FaSun />
      </span>
      <span className="swap-on text-lg" aria-hidden="true">
        {/* 🌙 */}
        <FaMoon />
      </span>
    </label>
  );
};

export default ThemeToggle;
