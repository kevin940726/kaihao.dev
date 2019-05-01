import React from 'react';
import FontFaceObserver from 'fontfaceobserver';
import 'modern-normalize';
import { Global, css } from '@emotion/core';
import { SUB_TEXT, CONTENT_TEXT } from '../constants';

const font = new FontFaceObserver('Open Sans');

font
  .load()
  .then(() => {
    if (typeof document !== 'undefined') {
      document.body.classList.add('font-loaded');
    }
  })
  .catch(err => {
    if (typeof document !== 'undefined') {
      // For whatever reason it failed, we still want the font to be appended.
      document.body.classList.add('font-loaded');
    }
  });

const GlobalStyles = () => (
  <Global
    styles={css`
      html,
      body {
        height: 100%;
        color: ${CONTENT_TEXT};
        font-family: 'sans-serif';
      }

      body.font-loaded {
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
