import React, {
  useState,
  useMemo,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import { lightTheme, darkTheme } from '../constants/theme';

const matchDarkMedia =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-color-scheme: dark)');

const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState(() =>
    matchDarkMedia && matchDarkMedia.matches ? 'dark' : 'light'
  );
  const hasSetTheme = useRef(false);

  const toggleDarkMode = useCallback(() => {
    setThemeName(themeName => (themeName === 'dark' ? 'light' : 'dark'));
    hasSetTheme.current = true;
  }, [setThemeName, hasSetTheme]);

  useEffect(() => {
    function handleMediaMatch(e) {
      if (!hasSetTheme.current) {
        setThemeName(e.matches ? 'dark' : 'light');
      }
    }

    matchDarkMedia.addListener(handleMediaMatch);

    return () => {
      matchDarkMedia.removeListener(handleMediaMatch);
    };
  }, [setThemeName, hasSetTheme]);

  const themeWithToggle = useMemo(
    () => ({
      themeName,
      ...(themeName === 'dark' ? darkTheme : lightTheme),
      toggleDarkMode,
    }),
    [themeName, toggleDarkMode]
  );

  return (
    <EmotionThemeProvider theme={themeWithToggle}>
      {children}
    </EmotionThemeProvider>
  );
};

export default ThemeProvider;
