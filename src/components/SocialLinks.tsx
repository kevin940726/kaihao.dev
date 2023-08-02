import type { ComponentPropsWithRef } from 'react';
import type { ImageProps } from 'next/image';
import Image from 'next/image';
import cx from 'classnames';
import { TWITTER_LINK, GITHUB_LINK, LINKEDIN_LINK } from './links';
import twitterIcon from './twitter-icon.svg';
import githubIcon from './github-icon.png';
import linkedinIcon from './linkedin-icon.svg';

const SocialLink = ({
  title,
  icon,
  href,
  children,
  ...props
}: ComponentPropsWithRef<'a'> & {
  title: string;
  icon: ImageProps['src'];
}) => (
  <a
    title={title}
    aria-label={title}
    className={cx(
      'inline-flex box-content relative text-[0] h-[35px] w-[35px] rounded-full shadow bg-cover bg-backgroundWhite cursor-pointer transition-transform overflow-hidden',
      'dark:border dark:border-dimWhite',
      'before:absolute before:top-0 before:left-0 before:h-full before:w-full before:rounded-full before:shadow before:opacity-0 before:transition-opacity',
      'hover:translate-y-[-1px] hover:before:opacity-100'
    )}
    href={href}
    target="_blank"
    rel="noopener noreferrer nofollower"
    {...props}
  >
    <Image src={icon} width={35} height={35} alt={title} priority />
  </a>
);

const TwitterLink = () => (
  <SocialLink title="Twitter" icon={twitterIcon} href={TWITTER_LINK} />
);
const GitHubLink = () => (
  <SocialLink title="GitHub" icon={githubIcon} href={GITHUB_LINK} />
);
const LinkedInLink = () => (
  <SocialLink title="LinkedIn" icon={linkedinIcon} href={LINKEDIN_LINK} />
);

const SocialLinks = () => (
  <ul className="flex justify-center">
    <li className="inline-flex mx-4">
      <TwitterLink />
    </li>
    <li className="inline-flex mx-4">
      <GitHubLink />
    </li>
    <li className="inline-flex mx-4">
      <LinkedInLink />
    </li>
  </ul>
);

export default SocialLinks;
