import 'server-only';
import { useId } from 'react';
import cx from 'classnames';
import Prism from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-shell-session';
import 'prism-themes/themes/prism-dracula.css';
import CopyButton from './CopyButton';
import CodeSandboxButton from './CodeSandboxButton';
import Actions from './Actions';
import parseMetaString from './parseMetaString';
import type { HTMLAttributes, ReactElement } from 'react';
import type InlineCode from './InlineCode';

Prism.languages['sh'] = Prism.languages.extend('bash', {
  prompt: {
    pattern: /^\$(?=\s).*/m,
    inside: {
      sign: {
        pattern: /^\$(?=\s)/,
        lookbehind: true,
      },
      rest: Prism.languages.bash,
    },
  },
});

interface HighlightProps extends HTMLAttributes<HTMLPreElement> {
  children: ReactElement<
    HTMLAttributes<HTMLElement> & {
      'data-meta'?: string;
      'data-codesandbox-url'?: string;
      children: string;
    },
    typeof InlineCode
  >;
}

const Highlight = async ({ children, ...props }: HighlightProps) => {
  const {
    'data-meta': meta,
    'data-codesandbox-url': codesandboxURL,
    ...codeProps
  } = children.props;
  // Assign a default class name so prismjs can highlight the code
  const codeClassName = codeProps.className || 'language-plaintext';
  const lang = codeClassName.slice('language-'.length) || 'plaintext';
  // `useId` is a static/stateless hook so it's safe to use in async RSC
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const codeId = useId();

  if (lang !== 'js' && lang !== 'javascript') {
    try {
      await import(`prismjs/components/prism-${lang}`);
    } catch {
      // Ignore not found languages
    }
  }

  const { highlightLines } = parseMetaString(meta);

  let code = codeProps.children;
  // Remove the trailing linebreak introduced when transforming from mdast to hast:
  // https://github.com/syntax-tree/mdast-util-to-hast/blob/b2571b9c728f43ca2a048e6189f5fe318eb044ba/lib/handlers/code.js#L15
  if (code.endsWith('\n')) {
    code = code.slice(0, -1);
  }

  const html = Prism.languages[lang]
    ? Prism.highlight(code, Prism.languages[lang], lang)
    : code;
  const lines = html.split('\n');
  const codeElements = lines.map((line, index) => (
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
        '[.prompt_.sign]:relative',
      )}
      dangerouslySetInnerHTML={{
        __html: index < lines.length - 1 ? line + '\n' : line,
      }}
    />
  ));

  return (
    <div className="group relative overflow-hidden mb-8 -mx-5 md:rounded border-y md:border-x border-border isolate">
      <div className="overflow-auto">
        <pre
          className={cx(
            'relative !overflow-visible float-left !rounded-none md:!rounded !m-0 !py-5 !px-0 min-w-full text-sm !leading-relaxed [counter-reset:lines-number] !font-mono',
            codeClassName,
          )}
          tabIndex={-1}
          {...props}
        >
          <code
            {...codeProps}
            id={codeId}
            className={cx(codeClassName, '!font-mono')}
          >
            {codeElements}
          </code>
        </pre>
      </div>

      <CopyButton codeId={codeId} />

      <Actions>
        {codesandboxURL && <CodeSandboxButton href={codesandboxURL} />}
      </Actions>
    </div>
  );
};

export default Highlight;
