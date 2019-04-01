import React from 'react';
import { css } from '@emotion/core';
import twitterIcon from '../images/twitter-icon.svg';
import githubIcon from '../images/github-icon.svg';
import linkedinIcon from '../images/linkedin-icon.svg';

const SocialLink = ({ title, icon, to, children, ...props }) => (
  <a
    title={title}
    aria-label={title}
    css={css`
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
  </a>
);

const TwitterLink = () => (
  <SocialLink
    title="twitter"
    icon={twitterIcon}
    to="https://twitter.com/kevin940726"
  />
);
const GithubLink = () => (
  <SocialLink
    title="twitter"
    icon={githubIcon}
    to="https://github.com/kevin940726"
  />
);
const LinkedInLink = () => (
  <SocialLink
    title="twitter"
    icon={linkedinIcon}
    to="https://linkedin.com/in/kai-hao"
  />
);

const SocialLinks = () => (
  <ul
    css={css`
      padding: 0;
      display: flex;
      justify-content: center;
      margin: 0;

      a {
        margin: 0 15px;
      }
    `}
  >
    <TwitterLink />
    <GithubLink />
    <LinkedInLink />
  </ul>
);

export default SocialLinks;
