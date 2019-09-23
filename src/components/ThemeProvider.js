import React from 'react';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import themeVariables from '../constants/theme';

const themeValues = { colors: {} };
for (let color of Object.keys(themeVariables.colors)) {
  themeValues.colors[color] = `var(${themeVariables.colors[color]})`;
}

const themeWithToggle = {
  ...themeValues,
  toggleDarkMode: () => window.__THEME_MODE_HOOK.toggleDarkMode(),
};

const ThemeProvider = ({ children }) => {
  return (
    <EmotionThemeProvider theme={themeWithToggle}>
      {children}
    </EmotionThemeProvider>
  );
};

export default ThemeProvider;
