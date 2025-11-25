import React, { useMemo, useState, useEffect } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { arEG } from "@mui/material/locale";
import baseTheme from "../theme/theme";
import ColorModeContext from "./colorModeContext";

// Avoid exporting non-component symbols to satisfy fast-refresh lint rule
// export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function ColorModeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    try {
      const saved = localStorage.getItem("colorMode");
      return saved === "dark" ? "dark" : "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("colorMode", mode);
    } catch {
      // ignore write errors
    }
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => {
    // merge base theme with mode
    return createTheme(
      {
        ...baseTheme,
        palette: {
          ...baseTheme.palette,
          mode,
          background: {
            ...(baseTheme.palette?.background || {}),
            default:
              mode === "dark"
                ? "#121212"
                : baseTheme.palette?.background?.default,
            paper:
              mode === "dark"
                ? "#1e1e1e"
                : baseTheme.palette?.background?.paper,
          },
        },
      },
      arEG
    );
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
