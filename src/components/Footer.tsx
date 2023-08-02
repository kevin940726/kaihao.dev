import type { ComponentPropsWithRef } from 'react';
import { TWITTER_LINK, GITHUB_LINK, LINKEDIN_LINK } from './links';

const Link = ({ children, ...props }: ComponentPropsWithRef<'a'>) => (
  <a
    className="mx-2 text-contentText"
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  >
    {children}
  </a>
);

const Footer = () => (
  <footer className="flex justify-center items-center h-[30px] text-xs text-[#999999] text-center">
    © {new Date().getFullYear()}, Find me on{' '}
    <Link href={TWITTER_LINK}>Twitter</Link>
    {' ・ '}
    <Link href={GITHUB_LINK}>GitHub</Link>
    {' ・ '}
    <Link href={LINKEDIN_LINK}>LinkedIn</Link>
  </footer>
);

export default Footer;
