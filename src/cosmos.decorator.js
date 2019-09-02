import React from 'react';
import { Global, css } from '@emotion/core';
import ThemeProvider from './components/ThemeProvider';
import GlobalStyles from './components/GlobalStyles';

export default ({ children }) => (
  <ThemeProvider>
    <Global
      styles={css`
        @import url('https://fonts.googleapis.com/css?family=Open+Sans');
      `}
    />
    <GlobalStyles />
    {children}
  </ThemeProvider>
);
