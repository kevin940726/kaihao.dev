import React, { useMemo } from 'react';
import { css } from '@emotion/core';
import slugify from 'slugify';
import getTextContent from '../utils/getTextContent';
import { SUB_TEXT } from '../constants';

slugify.extend({
  '<': '',
  '>': '',
});

const Header = RenderComponent => ({ children }) => {
  const fragment = useMemo(
    () =>
      slugify(getTextContent(children), {
        lower: true,
      }),
    [children]
  );

  return (
    <RenderComponent
      id={fragment}
      css={css`
        position: relative;
        line-height: 2;
        color: ${SUB_TEXT};
        border-bottom: 1px solid #eeeeee;
        scroll-margin-top: 50px;

        @media screen and (min-width: 760px) {
          &:hover > a {
            opacity: 1;
          }
        }
      `}
    >
      <a
        href={`#${fragment}`}
        css={css`
          position: absolute;
          left: 0px;
          top: 0;
          bottom: 0;
          color: #28232d;
          transform: translateX(-100%);
          opacity: 0;
          padding-right: 10px;
        `}
      >
        #
      </a>
      {children}
    </RenderComponent>
  );
};

export const H1 = Header('h1');
export const H2 = Header('h2');
export const H3 = Header('h3');
export const H4 = Header('h4');
export const H5 = Header('h5');
export const H6 = Header('h6');
