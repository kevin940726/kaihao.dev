import React from 'react';
import { css } from '@emotion/core';
import { rgba } from 'polished';
import GlobalStyles from '../components/GlobalStyles';
import Nav from '../components/Nav';
import { BACKGROUND_BLACK } from '../constants';

const PostMetaLayout = () => {
  const title = React.useMemo(
    () => new URLSearchParams(window.location.search).get('title'),
    []
  );

  return (
    <div
      css={css`
        display: flex;
        position: relative;
        flex-direction: column;
        width: 1200px;
        height: 626px;
        background: linear-gradient(
          105.18deg,
          rgba(242, 153, 74, 0.97) 0%,
          rgba(242, 153, 74, 0.76) 78.72%
        );

        nav {
          position: absolute;
          height: 80px;
          box-shadow: 0 6px 3px ${rgba(BACKGROUND_BLACK, 0.1)};

          > div {
            width: 1150px;
          }

          h3 {
            font-size: 38px;

            img {
              height: 64px;
              width: 64px;
              margin-right: 16px;
            }
          }

          ul {
            display: none;
          }

          input[type='checkbox'] + label {
            display: none;
          }
        }
      `}
    >
      <GlobalStyles />
      <Nav />

      <h1
        css={css`
          display: flex;
          flex-grow: 1;
          align-items: center;
          font-size: 72px;
          color: #ffffff;
          text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
          margin: 1em;
          text-align: center;
        `}
      >
        {title}
      </h1>
    </div>
  );
};

export default PostMetaLayout;
