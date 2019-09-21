import React, { useMemo } from 'react';
import { css } from '@emotion/core';
import slugify from 'slugify';
import getTextContent from '../utils/getTextContent';
import { desktop } from '../utils/media';

slugify.extend({
  '<': '',
  '>': '',
});

const createHeader = (RenderComponent, options = {}) => ({ children }) => {
  const { hideBorderBottom, hideAnchor } = options;

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
      css={theme =>
        css`
          position: relative;
          line-height: 2;
          color: ${theme.colors.subText};
          ${!hideBorderBottom &&
            css`
              border-bottom: 1px solid ${theme.colors.horizontal};
            `}
          scroll-margin-top: 50px;
          margin-bottom: 1em;

          ${desktop(css`
            &:hover > a {
              opacity: 1;
            }
          `)}
        `
      }
    >
      {hideAnchor || (
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

            &:active,
            &:focus {
              opacity: 1;
            }
          `}
        >
          #
        </a>
      )}

      {children}
    </RenderComponent>
  );
};

export const H1 = createHeader('h1', { hideAnchor: true });
export const H2 = createHeader('h2');
export const H3 = createHeader('h3');
export const H4 = createHeader('h4', { hideBorderBottom: true });
export const H5 = createHeader('h5', { hideBorderBottom: true });
export const H6 = createHeader('h6', { hideBorderBottom: true });
