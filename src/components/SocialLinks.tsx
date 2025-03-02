import type { ComponentPropsWithRef, ReactElement } from 'react';
import type { ImageProps } from 'next/image';
import Image from 'next/image';
import cx from 'classnames';
import { X_LINK, GITHUB_LINK, LINKEDIN_LINK, BLUESKY_LINK } from './links';
import XLogo from './XLogo';
import githubIcon from './github-icon.png';
import linkedinIcon from './linkedin-icon.svg';
import blueskyIcon from './bluesky-icon.svg';

type SocialLinkProps = ComponentPropsWithRef<'a'> & {
  title: string;
  href: string;
  className?: string;
} & (
    | { icon: ImageProps['src']; children?: never }
    | { icon?: never; children: ReactElement }
  );

const SocialLink = ({
  title,
  icon,
  href,
  children,
  className,
  ...props
}: SocialLinkProps) => (
  <a
    title={title}
    aria-label={title}
    className={cx(
      'inline-flex box-content relative text-[0] h-[35px] w-[35px] cursor-pointer transition-transform overflow-hidden',
      'before:absolute before:top-0 before:left-0 before:h-full before:w-full before:rounded-full before:shadow before:opacity-0 before:transition-opacity',
      'hover:translate-y-[-1px] hover:before:opacity-100',
      className,
    )}
    href={href}
    target="_blank"
    rel="noopener noreferrer nofollower"
    {...props}
  >
    {children ?? (
      <Image src={icon} width={35} height={35} alt={title} priority />
    )}
  </a>
);

const XLink = () => (
  <SocialLink
    title="X (Twitter)"
    href={X_LINK}
    // X logo looks bigger than other icons
    className="h-[30px] w-[30px] text-black dark:text-white"
  >
    <XLogo />
  </SocialLink>
);
const GitHubLink = () => (
  <SocialLink
    title="GitHub"
    icon={githubIcon}
    href={GITHUB_LINK}
    className="rounded-full"
  />
);
const BlueskyLink = () => (
  <SocialLink title="Bluesky" icon={blueskyIcon} href={BLUESKY_LINK} />
);
const LinkedInLink = () => (
  <SocialLink title="LinkedIn" icon={linkedinIcon} href={LINKEDIN_LINK} />
);

const SocialLinks = () => (
  <ul className="flex justify-center align-center">
    <li className="inline-flex mx-4">
      <XLink />
    </li>
    <li className="inline-flex mx-4">
      <GitHubLink />
    </li>
    <li className="inline-flex mx-4">
      <BlueskyLink />
    </li>
    <li className="inline-flex mx-4">
      <LinkedInLink />
    </li>
  </ul>
);

export default SocialLinks;
