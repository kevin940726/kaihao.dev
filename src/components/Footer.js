import React from 'react';
import { css } from '@emotion/core';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import {
  CONTENT_TEXT,
  TWITTER_LINK,
  GITHUB_LINK,
  LINKEDIN_LINK,
} from '../constants';

const Link = ({ children, ...props }) => (
  <OutboundLink
    css={css`
      margin: 0 0.5em;
      color: ${CONTENT_TEXT};
    `}
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  >
    {children}
  </OutboundLink>
);

const Footer = () => (
  <footer
    css={css`
      display: flex;
      justify-content: center;
      align-items: center;
      height: 30px;
      font-size: 12px;
      color: '#999999';
      text-align: center;
    `}
  >
    © {new Date().getFullYear()}, Find me on{' '}
    <Link href={TWITTER_LINK}>Twitter</Link>
    {' ・ '}
    <Link href={GITHUB_LINK}>Github</Link>
    {' ・ '}
    <Link href={LINKEDIN_LINK}>LinkedIn</Link>
  </footer>
);

export default Footer;
