import { useMemo, useRef } from 'react';
import type { HTMLAttributes, ReactElement } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import 'prism-themes/themes/prism-dracula.css';
import { darkTheme } from './theme';
import { mobile } from './media';
import CopyButton from './CopyButton';
import CodeSandboxButton from './CodeSandboxButton';
import Actions from './Actions';
import parseMetaString from './parseMetaString';
import type InlineCode from './InlineCode';

interface LineProps extends HTMLAttributes<HTMLDivElement> {
  highlight?: boolean;
}

interface HighlightProps extends HTMLAttributes<HTMLPreElement> {
  children: ReactElement<
    HTMLAttributes<HTMLElement> & {
      html: string;
      metastring?: string;
      'data-codesandbox-url'?: string;
    },
    typeof InlineCode
  >;
}

const Container = styled.div(
  (props) => css`
    position: relative;
    overflow: hidden;
    margin: 0 -20px 2rem;
    border-radius: 4px;
    border: 1px solid ${props.theme.colors.border};
    /* Create a new stacking context to correctly show the border-radius */
    perspective: 1px;

    &:hover [data-copy-button] {
      transform: translateY(0%);
      opacity: 1;
    }

    ${mobile(css`
      border-radius: 0;
      border-left: none;
      border-right: none;
    `)}
  `
);

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

const Line = styled.div<LineProps>`
  padding: 0 20px;
  min-height: 1.6em;
  background-color: ${(props) => (props.highlight ? '#414458' : 'transparent')};

  ${mobile(css`
    padding: 0 6px;
  `)}

  &:before {
    counter-increment: lines-number;
    content: counter(lines-number);
    display: inline-block;
    margin-left: -10px;
    margin-right: 15px;
    text-align: right;
    width: 2em;
    color: #666666;

    ${mobile(css`
      margin-right: 10px;
    `)}
  }

  &,
  * {
    &::selection {
      background-color: ${darkTheme.colors.inlineCodeBackground};
      color: ${darkTheme.colors.contentText};
    }
  }

  > .prompt .sign {
    position: relative;
    display: inline-block;
    height: 14px;
    line-height: 14px;
    padding: 0 0.4em 0 0.5em;
    margin-right: 0.2em;
    user-select: none;
    font-size: 12px;
    color: #000000;
    background-color: #417ab3;

    &:after {
      content: '';
      position: absolute;
      left: 100%;
      top: 0;
      bottom: 0;
      height: 0;
      width: 0;
      border-left: 5px solid #417ab3;
      border-top: 7px solid transparent;
      border-bottom: 7px solid transparent;
    }
  }
`;

const Highlight = ({ children, ...props }: HighlightProps) => {
  const preRef = useRef<HTMLPreElement>(null);

  const {
    html,
    metastring,
    'data-codesandbox-url': codesandboxURL,
    ...codeProps
  } = children.props;

  const metaProps = useMemo(() => parseMetaString(metastring), [metastring]);

  const { highlightLines } = metaProps;

  const codeElements = useMemo(() => {
    const lines = html.split('\n');

    return lines.map((line, index) => (
      <Line
        key={index}
        highlight={highlightLines && highlightLines.has(index + 1)}
        dangerouslySetInnerHTML={{
          __html: index < lines.length - 1 ? line + '\n' : line,
        }}
      />
    ));
  }, [html, highlightLines]);

  const getCodeAsString = () => preRef.current?.textContent || '';

  return (
    <Container>
      <div
        css={css`
          overflow: auto;
        `}
      >
        <Pre
          className={codeProps.className}
          tabIndex={-1}
          {...props}
          ref={preRef}
        >
          <code {...codeProps}>{codeElements}</code>
        </Pre>
      </div>

      <CopyButton getCode={getCodeAsString} />

      <Actions>
        {codesandboxURL && (
          // @ts-expect-error
          <Actions.Item as={CodeSandboxButton} href={codesandboxURL} />
        )}
      </Actions>
    </Container>
  );
};

export default Highlight;
