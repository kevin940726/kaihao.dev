import { useState, useEffect } from 'react';

type ThemeMode = 'dark' | 'light';

const useThemeMode = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode | null>(null);

  useEffect(() => {
    setThemeMode(window.__THEME_MODE_HOOK.getThemeMode());

    return window.__THEME_MODE_HOOK.addListener(setThemeMode);
  }, [setThemeMode]);

  return themeMode;
};

export default useThemeMode;
