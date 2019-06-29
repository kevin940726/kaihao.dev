import React from 'react';
import { css } from '@emotion/core';
import Nav from './Nav';

const PostMetaImage = ({ children }) => (
  <div
    css={css`
      display: flex;
      position: relative;
      flex-direction: column;
      width: 600px;
      height: 313px;
      background: linear-gradient(
        105.18deg,
        rgba(242, 153, 74, 0.97) 0%,
        rgba(242, 153, 74, 0.76) 78.72%
      );

      nav {
        position: absolute;

        ul {
          display: none;
        }
      }
    `}
  >
    <Nav />

    <h1
      css={css`
        display: flex;
        flex-grow: 1;
        align-items: center;
        font-size: 36px;
        color: #ffffff;
        text-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
        margin: 1em;
        text-align: center;
      `}
    >
      {children}
    </h1>
  </div>
);

export default PostMetaImage;
