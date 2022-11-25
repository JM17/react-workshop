import { useState } from "react";
import { PaletteMode } from "@mui/material";

const THEME_MODE = "theme_mode";

export const useThemeMode = () => {
  const themeFromStorage = localStorage.getItem(THEME_MODE);

  const [themeMode, setThemeMode] = useState<PaletteMode>(
    (themeFromStorage as PaletteMode) || "light"
  );

  const toggleThemeMode = () => {
    setThemeMode(themeMode === "light" ? "dark" : "light");
    localStorage.setItem(THEME_MODE, themeMode === "light" ? "dark" : "light");
  };

  return { themeMode, toggleTheme: toggleThemeMode };
};
