import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';
import truncate from 'lodash.truncate';

export interface RemarkMdxExcerptOptions {
  maxLength?: number;
}

// Inspired from: https://github.com/gatsbyjs/gatsby/blob/f5c8c2034c4cb77cfde0265b3477a054a24be93a/packages/gatsby-plugin-mdx/gatsby/create-schema-customization.js#L160-L195
export default function remarkMdxExcerpt({
  maxLength = 180,
}: RemarkMdxExcerptOptions = {}) {
  return function transformer(tree: Root) {
    const excerptNodes: string[] = [];

    visit(tree, (node) => {
      if (node.type === 'text' || node.type === 'inlineCode') {
        excerptNodes.push(node.value);
      }
    });

    const excerptValue = truncate(excerptNodes.join(' '), {
      length: maxLength,
      omission: '…',
    });

    tree.children.unshift({
      // @ts-ignore
      type: 'mdxjsEsm',
      value: '',
      data: {
        estree: {
          type: 'Program',
          sourceType: 'module',
          body: [
            {
              type: 'ExportNamedDeclaration',
              source: null,
              specifiers: [],
              declaration: {
                type: 'VariableDeclaration',
                kind: 'const',
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    id: { type: 'Identifier', name: 'excerpt' },
                    init: {
                      type: 'Literal',
                      value: '',
                      raw: JSON.stringify(excerptValue),
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    });
  };
}
