import { css } from '@emotion/react';
import Image from 'next/legacy/image';
import { darkMode } from './media';
import githubIcon from './github-icon.png';
import PostLink from './PostLink';
import siteMetadata from '@/siteMetadata.json';

const getEditURL = (slug: string) =>
  `${siteMetadata.repo}/edit/main/src/posts/${slug}/index.mdx`;

const EditOnGithub = ({ slug }: { slug: string }) => {
  return (
    <PostLink
      href={getEditURL(slug)}
      css={css`
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
      <span
        css={css`
          display: inline-flex;
          margin-right: 0.5em;
        `}
      >
        <Image
          src={githubIcon}
          height={21}
          width={21}
          alt="github"
          css={css`
            border-radius: 50%;
          `}
        />
      </span>
      Edit on Github
    </PostLink>
  );
};

export default EditOnGithub;
