import React, { useMemo, Children } from 'react';
import { css } from '@emotion/core';
import slugify from 'slugify';

slugify.extend({
  '<': '',
  '>': '',
});

type Props = {
  children: string | string[];
};

const Heading = (RenderComponent: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') => ({
  children,
}: Props) => {
  const fragment = useMemo(
    () =>
      slugify(Children.toArray(children).join(''), {
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
        border-bottom: 1px solid #eeeeee;

        &:hover > a {
          opacity: 1;
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

export const H1 = Heading('h1');
export const H2 = Heading('h2');
export const H3 = Heading('h3');
export const H4 = Heading('h4');
export const H5 = Heading('h5');
export const H6 = Heading('h6');
