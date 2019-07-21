import React from 'react';
import 'modern-normalize';
import { Global, css } from '@emotion/core';

const GlobalStyles = () => (
  <Global
    styles={theme =>
      css`
        html,
        body {
          height: 100%;
          color: ${theme.colors.contentText};
          background-color: ${theme.colors.background};
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
          }
        }
      `
    }
  />
);

export default GlobalStyles;
