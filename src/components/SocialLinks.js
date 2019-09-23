import React from 'react';
import { css } from '@emotion/core';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import {
  TWITTER_LINK,
  GITHUB_LINK,
  LINKEDIN_LINK,
  DIM_WHITE,
} from '../constants';
import { darkMode } from '../utils/media';
// They will all get inlined so no need to use gatsby-image
import twitterIcon from '../images/twitter-icon.svg';
import githubIcon from '../images/github-icon.png';
import linkedinIcon from '../images/linkedin-icon.svg';

const SocialLink = ({ title, icon, to, children, ...props }) => (
  <OutboundLink
    title={title}
    aria-label={title}
    css={theme => css`
      display: inline-block;
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
    style={{
      backgroundImage: `url(${icon})`,
    }}
    href={to}
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  >
    {title}
  </OutboundLink>
);

const TwitterLink = () => (
  <SocialLink title="Twitter" icon={twitterIcon} to={TWITTER_LINK} />
);
const GithubLink = () => (
  <SocialLink title="Github" icon={githubIcon} to={GITHUB_LINK} />
);
const LinkedInLink = () => (
  <SocialLink title="LinkedIn" icon={linkedinIcon} to={LINKEDIN_LINK} />
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
