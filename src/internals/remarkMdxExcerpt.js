// @ts-check
import { visit, EXIT } from 'unist-util-visit';
import stringWidth from 'string-width';
import GraphemeSplitter from 'grapheme-splitter';

/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast').Text} Text
 * @typedef {import('mdast').InlineCode} InlineCode
 * @typedef {import('mdast').Emphasis} Emphasis
 * @typedef {import('mdast').Strong} Strong
 * @typedef {import('mdast').Link} Link
 * @typedef {import('mdast').Delete} Delete
 * @typedef {import('unist').Node} Node
 * @typedef {import('mdast-util-mdx').MdxFlowExpression} MdxFlowExpression
 * @typedef {import('mdast-util-mdx').MdxjsEsm} MdxjsEsm
 * @typedef {import('mdast-util-mdx').MdxTextExpression} MdxTextExpression
 * @typedef {import('mdast-util-mdx').MdxJsxFlowElement} MdxJsxFlowElement
 * @typedef {import('mdast-util-mdx').MdxJsxTextElement} MdxJsxTextElement
 */

const splitter = new GraphemeSplitter();

/**
 * @typedef {Node | MdxFlowExpression | MdxjsEsm | MdxTextExpression | MdxJsxFlowElement | MdxJsxTextElement} ContentNode
 */

/**
 * @param {ContentNode} node
 * @return {node is Text | Emphasis | Strong | InlineCode | Link | Delete}
 */
function isInlineNode(node) {
  return [
    'text',
    'emphasis',
    'strong',
    'inlineCode',
    'link',
    'delete',
  ].includes(node.type);
}

/**
 * @param {ContentNode} node
 * @return {node is MdxjsEsm}
 */
function isMdxEsm(node) {
  return node.type === 'mdxjsEsm';
}

/**
 * @param {ContentNode} node
 * @return {node is MdxFlowExpression}
 */
function isMdxFlowExpression(node) {
  return node.type === 'mdxFlowExpression';
}

/**
 * @param {ContentNode} node
 * @param {string} exportName
 * @return {boolean}
 */
function getHasExcerptDefined(node, exportName) {
  return (
    isMdxEsm(node) &&
    !!node.data?.estree?.body.some(
      (body) =>
        body.type === 'ExportNamedDeclaration' &&
        body.declaration?.type === 'VariableDeclaration' &&
        body.declaration.declarations.some(
          (variableDeclarator) =>
            variableDeclarator.id.type === 'Identifier' &&
            variableDeclarator.id.name === exportName,
        ),
    )
  );
}

/**
 * @typedef {Object} RemarkMdxExcerptOptions
 * @property {string} [exportName='excerpt']
 * @property {string | ((node: ContentNode, index: number | null, parent: ContentNode | null) => boolean) | null} [marker='excerpt']
 * @property {number} [maxWidth=180]
 * @property {string} [ellipsis='…']
 *
 * @param {RemarkMdxExcerptOptions} options
 * @returns
 */
export default function remarkMdxExcerpt({
  exportName = 'excerpt',
  marker = 'excerpt',
  maxWidth = 180,
  ellipsis = '…',
} = {}) {
  /**
   * @param {Root} tree
   */
  return function transformer(tree) {
    let excerpt = '';
    let width = 0;
    let isLastNodeInlineText = false;
    let hasMarker = false;
    let hasExcerptDefined = false;

    visit(
      tree,
      /**
       * @param {ContentNode} node
       * @param {number|null} index
       * @param {ContentNode|null} parent
       */
      (node, index, parent) => {
        if (getHasExcerptDefined(node, exportName)) {
          hasExcerptDefined = true;
          return EXIT;
        } else if (typeof marker === 'string' && isMdxFlowExpression(node)) {
          const commentValue = node.value.match(/^\/\*+\s*(.+?)\s*\*+\/$/);
          // Found comment marker, abort the loop
          if (commentValue && commentValue[1] === marker) {
            hasMarker = true;
            return EXIT;
          }
        } else if (
          typeof marker === 'function' &&
          marker(node, index, parent)
        ) {
          hasMarker = true;
          return EXIT;
        } else if (isInlineNode(node)) {
          // Add delimiter
          if (!isLastNodeInlineText && excerpt !== '') {
            excerpt += ' ';
            width += 1;
          }

          isLastNodeInlineText = true;

          if (node.type === 'text' || node.type === 'inlineCode') {
            excerpt += node.value;
            width += stringWidth(node.value);
          }

          // Abort early if users opt-out of marker comment.
          if (width > maxWidth && marker === null) {
            return EXIT;
          }
        } else {
          isLastNodeInlineText = false;
        }
      },
    );

    // Abort if the user has already defined the "excerpt" export.
    if (hasExcerptDefined) {
      return;
    }

    if (!hasMarker && width > maxWidth) {
      const excerptChars = splitter.splitGraphemes(excerpt);
      while (true) {
        const [removedChar] = excerptChars.splice(-1, 1);
        const removedWidth = stringWidth(removedChar);

        width -= removedWidth;

        if (!removedChar.match(/\s/) && removedWidth === 1) {
          continue;
        }

        if (width <= maxWidth) {
          break;
        }
      }
      excerpt = excerptChars.join('');
      excerpt += ellipsis;
    }

    tree.children.unshift({
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
                    id: { type: 'Identifier', name: exportName },
                    init: {
                      type: 'Literal',
                      value: '',
                      raw: JSON.stringify(excerpt),
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
