// src/context/ThemeContext.jsx

import React, { useState, useMemo, createContext, useContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles'; // ✅ استيراد ThemeProvider هنا
import { arEG } from '@mui/material/locale';

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: 'light',
});

const lightPalette = {
  primary: { main: '#2E7D32' },
  background: { default: '#F4F6F8', paper: '#FFFFFF' },
  text: { primary: '#333333', secondary: '#666666' },
};

const darkPalette = {
  primary: { main: '#60AD5E' },
  background: { default: '#121212', paper: '#1E1E1E' },
  text: { primary: '#FFFFFF', secondary: '#B0B0B0' },
};

const components = {
  MuiCard: { styleOverrides: { root: { borderRadius: 12 } } },
  MuiButton: { styleOverrides: { root: { borderRadius: 8, textTransform: 'none' } } },
};

export const ColorModeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('colorMode');
    return savedMode || 'light';
  });

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('colorMode', newMode);
          return newMode;
        });
      },
      mode,
    }),
    [mode],
  );

  const theme = useMemo(
    () =>
      createTheme({
        direction: 'rtl',
        palette: {
          mode: mode,
          ...(mode === 'light' ? lightPalette : darkPalette),
        },
        typography: { fontFamily: '"Cairo", "Roboto", "Arial", sans-serif' },
        components: components,
      }, arEG),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => useContext(ColorModeContext);
