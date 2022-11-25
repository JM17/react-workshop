import React from "react";
import "./App.css";
import { createTheme, PaletteMode, ThemeProvider } from "@mui/material";
import { useThemeMode } from "./hooks/useThemeMode";
import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { routes } from "./routes";

function App() {
  const PLAY_BRANDING = "#6c43bf";
  /** The default route */
  const LANDING_PAGE = "/welcome";
  /** It's used as a fallback, when none of the routes is resolved */
  const NOT_FOUND = "/notFound";

  /** Mui theme configuration */
  const theme = (themeMode: PaletteMode) =>
    createTheme({
      palette: {
        primary: {
          main: PLAY_BRANDING,
        },
        mode: themeMode,
      },
    });

  const { themeMode, toggleTheme } = useThemeMode();

  return (
    <ThemeProvider theme={theme(themeMode)}>
      <Routes>
        <Route path="/" element={<Navigate replace to={LANDING_PAGE} />} />
        <Route path={"/*"} element={<Layout onClick={toggleTheme} />}>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element()}
            />
          ))}
        </Route>
        <Route path="*" element={<Navigate replace to={NOT_FOUND} />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
