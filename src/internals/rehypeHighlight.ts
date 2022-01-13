import { visit } from 'unist-util-visit';
import Prism from 'prismjs';
import loadLanguages from 'prismjs/components/index';
import 'prismjs/components/prism-shell-session';
import type { Root, Element, Text } from 'hast';

globalThis.Prism = Prism;

loadLanguages.silent = true;
loadLanguages();

function getLanguage(node: Element) {
  const classNames = node.properties!.className as string[] | undefined;
  return (
    classNames
      ?.find((className) => className.startsWith('language-'))!
      .slice('language-'.length) || 'none'
  );
}

export default function rehypeHighlight() {
  Prism.languages['sh'] = Prism.languages.extend('bash', {
    // @ts-expect-error: Not sure why yet
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

  return function (tree: Root) {
    visit(tree, 'element', (node, _index, parent) => {
      if (
        !parent ||
        (parent as Element).tagName !== 'pre' ||
        node.tagName !== 'code'
      ) {
        return;
      }

      if (node.data?.meta) {
        node.properties!.metastring = node.data.meta as string;
      }

      let code = (node.children[0] as Text).value;
      // Remove the trailing linebreak introduced when transforming from mdast to hast:
      // https://github.com/syntax-tree/mdast-util-to-hast/blob/b2571b9c728f43ca2a048e6189f5fe318eb044ba/lib/handlers/code.js#L15
      if (code.endsWith('\n')) {
        code = code.slice(0, -1);
      }
      const language = getLanguage(node);

      try {
        require(`prismjs/components/prism-${language}`);
      } catch (err) {
        // Ignore errors
      }

      const html = Prism.languages[language]
        ? Prism.highlight(code, Prism.languages[language], language)
        : code;

      node.properties!.html = html;
      node.children = [];
    });
  };
}
