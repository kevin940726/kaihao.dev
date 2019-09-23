import { css } from '@emotion/core';

const THRESHOLD_WIDTH = '760px';

export const mobile = style => css`
  @media screen and (max-width: ${THRESHOLD_WIDTH}) {
    ${style}
  }
`;

export const desktop = style => css`
  @media screen and (min-width: ${THRESHOLD_WIDTH}) {
    ${style}
  }
`;

export const darkMode = style => css`
  body[data-theme-mode='dark'] & {
    ${style}
  }
`;
