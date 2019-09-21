import { useContext } from 'react';
import { ThemeContext } from '@emotion/core';

const useDarkMode = () => {
  const { themeName } = useContext(ThemeContext);

  return themeName === 'dark';
};

export default useDarkMode;
