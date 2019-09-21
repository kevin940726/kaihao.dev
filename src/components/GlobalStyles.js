import React from 'react';
import 'modern-normalize';
import { Global, css } from '@emotion/core';
import 'focus-visible';

const GlobalStyles = () => (
  <Global
    styles={theme =>
      css`
        html,
        body {
          height: 100%;
          color: ${theme.colors.contentText};
          background-color: ${theme.colors.contentBackground};
          font-family: 'Open Sans', 'sans-serif';
        }

        a {
          color: ${theme.colors.subText};
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }

        #___gatsby {
          height: 100%;

          & > div[role='group'] {
            height: 100%;
            min-height: 100%;
          }
        }
      `
    }
  />
);

export default GlobalStyles;
