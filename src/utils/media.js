import { css } from '@emotion/core';

export const mobile = style => css`
  @media screen and (max-width: 760px) {
    ${style}
  }
`;
