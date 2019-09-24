import React from 'react';
import { Global, css } from '@emotion/core';
import Root from './components/Root';
import GlobalStyles from './components/GlobalStyles';
import '../scripts/themeMode';

export default ({ children }) => (
  <Root>
    <Global
      styles={css`
        @import url('https://fonts.googleapis.com/css?family=Open+Sans');
      `}
    />
    <GlobalStyles />
    {children}
  </Root>
);
