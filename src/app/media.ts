import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';

const THRESHOLD_WIDTH = '760px';

export const mobile = (style: SerializedStyles) => css`
  @media screen and (max-width: ${THRESHOLD_WIDTH}) {
    ${style}
  }
`;

export const desktop = (style: SerializedStyles) => css`
  @media screen and (min-width: ${THRESHOLD_WIDTH}) {
    ${style}
  }
`;

export const darkMode = (style: SerializedStyles) => css`
  body[data-theme-mode='dark'] & {
    ${style}
  }
`;
