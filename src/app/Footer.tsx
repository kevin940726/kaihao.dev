import type { ComponentPropsWithRef } from 'react';
import { css } from '@emotion/react';
import { TWITTER_LINK, GITHUB_LINK, LINKEDIN_LINK } from './links';

const Link = ({ children, ...props }: ComponentPropsWithRef<'a'>) => (
  <a
    css={(theme) => css`
      margin: 0 0.5em;
      color: ${theme.colors.contentText};
    `}
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  >
    {children}
  </a>
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
