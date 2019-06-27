import React from 'react';
import 'modern-normalize';
import { Global, css } from '@emotion/core';
import { SUB_TEXT, CONTENT_TEXT } from '../constants';

const GlobalStyles = () => (
  <Global
    styles={css`
      html,
      body {
        height: 100%;
        color: ${CONTENT_TEXT};
        font-family: 'Open Sans', 'sans-serif';
      }

      a {
        color: ${SUB_TEXT};
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
    `}
  />
);

export default GlobalStyles;
