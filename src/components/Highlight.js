import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import PrismHighlight, { defaultProps } from 'prism-react-renderer';
import dracula from 'prism-react-renderer/themes/dracula';
import CopyButton from './CopyButton';

const Pre = styled.pre`
  && {
    font-family: 'Fira Code', 'Open Sans', sans-serif;
    position: relative;
    overflow: auto;
    border-radius: 4px;
    margin: 0;
    padding: 20px;
    line-height: 1.6;
    font-size: 14px;
    margin-bottom: 2rem;
    counter-reset: lines-number;

    @media screen and (max-width: 760px) {
      border-radius: 0;
    }
  }
`;

const Line = styled.span`
  min-height: 1.6em;

  &:before {
    counter-increment: lines-number;
    content: counter(lines-number);
    display: inline-block;
    margin-left: -10px;
    margin-right: 15px;
    text-align: right;
    width: 2em;
    color: #666666;
  }

  &::selection {
    background-color: #eee;
  }
`;

const Highlight = ({ children }) => (
  <PrismHighlight
    {...defaultProps}
    code={children.trim()}
    language="jsx"
    theme={dracula}
  >
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <div
        css={css`
          position: relative;
          overflow: hidden;
          margin: 0 -20px;

          &:hover ${CopyButton} {
            transform: translateY(0%);
            opacity: 1;
          }
        `}
      >
        <Pre className={className} style={style}>
          {tokens.map((line, i) => (
            <Line {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
              {'\n'}
            </Line>
          ))}
        </Pre>
        <CopyButton code={children} />
      </div>
    )}
  </PrismHighlight>
);

export default Highlight;
