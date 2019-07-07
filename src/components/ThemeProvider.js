import React, { useState, useMemo } from 'react';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import { lightTheme, darkTheme } from '../constants/theme';

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  const themeWithToggle = useMemo(
    () => ({
      ...theme,
      toggleTheme: () =>
        setTheme(theme === lightTheme ? darkTheme : lightTheme),
    }),
    [theme]
  );

  return (
    <EmotionThemeProvider theme={themeWithToggle}>
      {children}
    </EmotionThemeProvider>
  );
};

export default ThemeProvider;
