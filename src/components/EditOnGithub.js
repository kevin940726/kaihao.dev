import React from 'react';
import { css } from '@emotion/core';
import { useStaticQuery, graphql } from 'gatsby';
import { darkMode } from '../utils/media';
import githubIcon from '../images/github-icon.png';
import PostLink from './PostLink';

const getEditURL = (repoURL, postFileName) =>
  `${repoURL}/edit/master/src/posts/${postFileName}`;

const EditOnGithub = ({ postFileName }) => {
  const {
    site: {
      siteMetadata: { repo },
    },
  } = useStaticQuery(graphql`
    query getRepoURL {
      site {
        siteMetadata {
          repo
        }
      }
    }
  `);

  return (
    <PostLink
      href={getEditURL(repo, postFileName)}
      css={theme => css`
        display: inline-flex;
        align-items: center;
        align-self: flex-end;
        font-size: 14px;
        line-height: 1.8;
        color: #000000;
        border-color: currentColor;
        padding-right: 0.2em;

        ${darkMode(css`
          color: #ffffff;
        `)}
      `}
    >
      <img
        src={githubIcon}
        alt="github"
        css={css`
          border-radius: 50%;
          height: 1.5em;
          width: 1.5em;
          margin-right: 0.5em;
        `}
      />
      Edit on Github
    </PostLink>
  );
};

export default EditOnGithub;
