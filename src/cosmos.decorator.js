import React from 'react';
import { Global, css } from '@emotion/core';
import GlobalStyles from './components/GlobalStyles';

export default ({ children }) => (
  <>
    <Global
      styles={css`
        @import url('https://fonts.googleapis.com/css?family=Open+Sans');
      `}
    />
    <GlobalStyles />
    {children}
  </>
);
