import React from 'react';
import { css } from '@emotion/core';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import { MAIN_TEXT, SUB_TEXT } from '../constants';

const PostLink = ({ children, ...props }) => (
  <OutboundLink
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
  </OutboundLink>
);

export default PostLink;
