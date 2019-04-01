import React from 'react';
import { css } from '@emotion/core';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

import './prism-theme.css';

const Live = ({ children, live }) => (
  <LiveProvider
    css={css`
      margin-bottom: 2em;
    `}
    code={children}
  >
    <LiveEditor
      className="line-numbers"
      css={css`
        && {
          overflow: auto;
          margin: 0 -20px;
          border-radius: 4px;
          padding: 20px;
          line-height: 1.6;
          font-size: 14px;
          border-bottom-left-radius: ${live ? 0 : 4}px;
          border-bottom-right-radius: ${live ? 0 : 4}px;
        }
      `}
    />
    {live && <LiveError />}
    {live && (
      <LivePreview
        css={css`
          margin: 0 -20px;
          overflow: auto;
          padding: 20px;
          border: 1px solid #dddddd;
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
        `}
      />
    )}
  </LiveProvider>
);

export default Live;
