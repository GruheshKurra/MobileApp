import React, { createContext, useState, useContext } from 'react';
import { MD3DarkTheme, Provider as PaperProvider } from 'react-native-paper';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const theme = MD3DarkTheme;

  return (
    <ThemeContext.Provider value={{ theme }}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);