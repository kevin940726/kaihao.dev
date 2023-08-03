import { useMemo, useRef } from 'react';
import type { HTMLAttributes, ReactElement } from 'react';
import cx from 'classnames';
import 'prism-themes/themes/prism-dracula.css';
import CopyButton from './CopyButton';
import CodeSandboxButton from './CodeSandboxButton';
import Actions from './Actions';
import parseMetaString from './parseMetaString';
import type InlineCode from './InlineCode';

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

const Highlight = ({ children, ...props }: HighlightProps) => {
  const preRef = useRef<HTMLPreElement>(null);

  const {
    html,
    metastring,
    'data-codesandbox-url': codesandboxURL,
    ...codeProps
  } = children.props;
  // Assign a default class name so prismjs can highlight the code
  const codeClassName = codeProps.className || 'language-plaintext';

  const metaProps = useMemo(() => parseMetaString(metastring), [metastring]);

  const { highlightLines } = metaProps;

  const codeElements = useMemo(() => {
    const lines = html.split('\n');

    return lines.map((line, index) => (
      <div
        key={index}
        className={cx(
          'highlight-line',
          'px-1.5 md:px-5 min-h-[1.4rem]',
          highlightLines && highlightLines.has(index + 1)
            ? 'bg-[#414458]'
            : 'bg-transparent',
          'before:[counter-increment:lines-number] before:content-[counter(lines-number)] before:inline-block before:-ml-2.5 before:mr-2.5 md:before:mr-4 before:text-right before:w-8 before:text-[#666666] before:align-middle',
          'selection:bg-subText selection:bg-opacity-30 selection:text-backgroundWhite',
          '[.prompt_.sign]:relative'
        )}
        dangerouslySetInnerHTML={{
          __html: index < lines.length - 1 ? line + '\n' : line,
        }}
      />
    ));
  }, [html, highlightLines]);

  const getCodeAsString = () => preRef.current?.textContent || '';

  return (
    <div className="group relative overflow-hidden mb-8 -mx-5 md:rounded border-y md:border-x border-border isolate">
      <div className="overflow-auto">
        <pre
          className={cx(
            'relative !overflow-visible float-left !rounded-none md:!rounded !m-0 !py-5 !px-0 min-w-full text-sm !leading-relaxed [counter-reset:lines-number] !font-mono',
            codeClassName
          )}
          tabIndex={-1}
          {...props}
          ref={preRef}
        >
          <code {...codeProps} className={cx(codeClassName, '!font-mono')}>
            {codeElements}
          </code>
        </pre>
      </div>

      <CopyButton getCode={getCodeAsString} />

      <Actions>
        {codesandboxURL && <CodeSandboxButton href={codesandboxURL} />}
      </Actions>
    </div>
  );
};

export default Highlight;
