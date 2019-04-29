import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import PrismHighlight, { defaultProps, Prism } from 'prism-react-renderer';
import dracula from 'prism-react-renderer/themes/dracula';
import { mobile } from '../utils/media';
import CopyButton from './CopyButton';
import parseMetaString from '../utils/parseMetaString';

const bash = { ...Prism.languages.bash };
Prism.languages.sh = {
  prompt: {
    pattern: /^\$(?=\s).*/m,
    inside: {
      sign: {
        pattern: /^\$(?=\s)/,
        lookbehind: true,
      },
      rest: bash,
    },
  },
  comment: bash.comment,
  shebang: bash.shebang,
  string: bash.string,
  punctuation: bash.punctuation,
};

const Container = styled.div`
  position: relative;
  overflow: hidden;
  margin: 0 -20px 2rem;
  border-radius: 4px;

  &:hover ${CopyButton} {
    transform: translateY(0%);
    opacity: 1;
  }

  ${mobile(css`
    border-radius: 0;
  `)}
`;

const Pre = styled.pre`
  && {
    position: relative;
    overflow: initial;
    float: left;
    border-radius: 4px;
    margin: 0;
    padding: 20px 0;
    min-width: 100%;
    line-height: 1.6;
    font-size: 14px;
    counter-reset: lines-number;

    ${mobile(css`
      border-radius: 0;
    `)}
  }
`;

const Line = styled.div`
  padding: 0 20px;
  min-height: 1.6em;
  background-color: ${props => (props.highlight ? '#414458' : 'transparent')};

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

  > .prompt.sign {
    color: #000000;
    background-color: #417ab3;
    padding: 0 0.5em;
    user-select: none;
    font-size: 12px;
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
  }

  ${mobile(css`
    padding: 0 10px;
  `)}
`;

const Highlight = ({ children, metastring, ...props }) => {
  const metaProps = useMemo(() => parseMetaString(metastring), [metastring]);

  const { highlightLines } = metaProps;

  const language = props.className && props.className.split('-')[1];

  return (
    <PrismHighlight
      {...defaultProps}
      code={children.trim()}
      language={language}
      theme={dracula}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Container>
          <div
            css={css`
              overflow: auto;
            `}
          >
            <Pre className={className} style={style}>
              {tokens.map((line, i) => (
                <Line
                  {...getLineProps({ line, key: i })}
                  highlight={highlightLines && highlightLines.has(i + 1)}
                >
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                  {'\n'}
                </Line>
              ))}
            </Pre>
          </div>
          <CopyButton code={children} />
        </Container>
      )}
    </PrismHighlight>
  );
};

export default Highlight;
