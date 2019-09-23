import { useState, useEffect } from 'react';
import { getThemeMode, addListener } from '../utils/themeMode';

const useThemeMode = () => {
  const [themeMode, setThemeMode] = useState(() => getThemeMode());

  useEffect(() => {
    return addListener(setThemeMode);
  }, [setThemeMode]);

  return themeMode;
};

export default useThemeMode;
