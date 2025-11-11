import { useState, useEffect } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 lg:p-3 rounded-2xl shadow-lg hover:text-white border border-LightBorder dark:border-DarkBorder bg-LightSecondary dark:bg-DarkSecondary hover:bg-Accent dark:hover:bg-Accent transition-colors duration-300"
    >
      {theme === "light" ? (
        <MoonIcon className="w-6 h-6" />
      ) : (
        <SunIcon className="w-6 h-6" />
      )}
    </button>
  );
};

export default ThemeToggle;
