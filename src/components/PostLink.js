import React from 'react';
import { css } from '@emotion/core';
import { MAIN_TEXT, SUB_TEXT } from '../constants';

const PostLink = ({ children, ...props }) => (
  <a
    css={css`
      border-bottom: 1px dashed ${MAIN_TEXT};
      color: ${SUB_TEXT};

      &:hover {
        border-bottom-style: solid;
        text-decoration: none;
      }
    `}
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  >
    {children}
  </a>
);

export default PostLink;
