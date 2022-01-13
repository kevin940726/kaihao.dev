import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import themeVariables from './theme';

const themeValues: { colors: Partial<typeof themeVariables.colors> } = {
  colors: {},
};
for (let color of Object.keys(themeVariables.colors)) {
  const colorKey = color as keyof typeof themeVariables.colors;
  themeValues.colors[colorKey] = `var(${themeVariables.colors[colorKey]})`;
}

const themeWithToggle = {
  ...(themeValues as typeof themeVariables),
  toggleDarkMode: () => window.__THEME_MODE_HOOK.toggleDarkMode(),
};

const ThemeProvider = ({ children }: { children: JSX.Element }) => {
  return (
    <EmotionThemeProvider theme={themeWithToggle}>
      {children}
    </EmotionThemeProvider>
  );
};

export default ThemeProvider;
