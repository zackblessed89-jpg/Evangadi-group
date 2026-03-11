import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

function ThemeToggle() {
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    const theme = isDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        display: "flex",
      }}
    >
      {isDark ? (
        <Sun size={22} color="#fe8402" />
      ) : (
        <Moon size={22} color="#516cf0" />
      )}
    </button>
  );
}

export default ThemeToggle;
