import React from 'react';
import { css } from '@emotion/core';
import CopyButton from '../CopyButton';

export default (
  <CopyButton
    code="I'm Mr. Meeseeks!"
    css={css`
      transform: translateY(0%);
      opacity: 1;
    `}
  />
);
