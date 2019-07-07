import React from 'react';
import { css } from '@emotion/core';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

const PostLink = ({ children, ...props }) => (
  <OutboundLink
    css={theme => css`
      border-bottom: 1px dashed ${theme.colors.mainText};
      color: ${theme.colors.subText};

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
