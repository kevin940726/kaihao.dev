import React from 'react';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import themeVariables from '../constants/theme';
import { toggleDarkMode } from '../utils/themeMode';

const themeValues = { colors: {} };
for (let color of Object.keys(themeVariables.colors)) {
  themeValues.colors[color] = `var(${themeVariables.colors[color]})`;
}

const themeWithToggle = {
  ...themeValues,
  toggleDarkMode,
};

const ThemeProvider = ({ children }) => {
  return (
    <EmotionThemeProvider theme={themeWithToggle}>
      {children}
    </EmotionThemeProvider>
  );
};

export default ThemeProvider;
