import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { OutboundLink } from 'gatsby-plugin-google-gtag';

const StyledLink = styled.a(
  props => css`
    border-bottom: 1px dashed ${props.theme.colors.mainText};
    color: ${props.theme.colors.subText};

    &:hover {
      border-bottom-style: solid;
      text-decoration: none;
    }
  `
);

const PostLink = ({ children, href, ...props }) =>
  href.startsWith('#') ? (
    <StyledLink href={href} {...props}>
      {children}
    </StyledLink>
  ) : (
    <StyledLink
      as={OutboundLink}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </StyledLink>
  );

export default PostLink;
