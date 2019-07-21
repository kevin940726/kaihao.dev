import React, { useState, useMemo } from 'react';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import { lightTheme, darkTheme } from '../constants/theme';

const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState('light');

  const themeWithToggle = useMemo(
    () => ({
      themeName,
      ...(themeName === 'dark' ? darkTheme : lightTheme),
      toggleDarkMode: () => {
        setThemeName(themeName === 'dark' ? 'light' : 'dark');
      },
    }),
    [themeName]
  );

  return (
    <EmotionThemeProvider theme={themeWithToggle}>
      {children}
    </EmotionThemeProvider>
  );
};

export default ThemeProvider;
