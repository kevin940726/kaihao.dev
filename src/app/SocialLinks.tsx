import type { ComponentPropsWithRef } from 'react';
import type { ImageProps } from 'next/legacy/image';
import { css } from '@emotion/react';
import Image from 'next/legacy/image';
import { TWITTER_LINK, GITHUB_LINK, LINKEDIN_LINK } from './links';
import { DIM_WHITE } from './colors';
import { darkMode } from './media';
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
  icon: ImageProps['src'];
}) => (
  <a
    title={title}
    aria-label={title}
    css={css`
      display: inline-block;
      box-sizing: content-box;
      position: relative;
      font-size: 0;
      height: 35px;
      width: 35px;
      border-radius: 50%;
      box-shadow: 1px 2px 1px 0 rgba(0, 0, 0, 0.15);
      background-size: cover;
      background-color: #ffffff;
      cursor: pointer;
      transition: transform 0.15s ease-out;
      overflow: hidden;

      ${darkMode(css`
        border: 1px solid ${DIM_WHITE};
      `)}

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        border-radius: 50%;
        box-shadow: 1px 2px 1px 2px rgba(0, 0, 0, 0.15);
        opacity: 0;
        transition: opacity 0.15s ease-out;
      }

      &:hover {
        transform: translateY(-1px);

        &:before {
          opacity: 1;
        }
      }
    `}
    href={href}
    target="_blank"
    rel="noopener noreferrer nofollower"
    {...props}
  >
    <Image
      src={icon}
      width={35}
      height={35}
      alt={title}
      layout="fixed"
      objectFit="fill"
      priority
    />
  </a>
);

const TwitterLink = () => (
  <SocialLink title="Twitter" icon={twitterIcon} href={TWITTER_LINK} />
);
const GithubLink = () => (
  <SocialLink title="Github" icon={githubIcon} href={GITHUB_LINK} />
);
const LinkedInLink = () => (
  <SocialLink title="LinkedIn" icon={linkedinIcon} href={LINKEDIN_LINK} />
);

const SocialLinks = () => (
  <ul
    css={css`
      list-style: none;
      padding: 0;
      display: flex;
      justify-content: center;
      margin: 0;

      > li {
        display: inline-flex;
        margin: 0 15px;
      }
    `}
  >
    <li>
      <TwitterLink />
    </li>
    <li>
      <GithubLink />
    </li>
    <li>
      <LinkedInLink />
    </li>
  </ul>
);

export default SocialLinks;
