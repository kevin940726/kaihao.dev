import type {
  Root,
  Text,
  InlineCode,
  Emphasis,
  Strong,
  Link,
  Delete,
} from 'mdast';
import { visit, EXIT } from 'unist-util-visit';
import type { Node } from 'unist-util-visit';
import type {
  MDXFlowExpression,
  MDXJSEsm,
  MDXTextExpression,
  MDXJsxFlowElement,
  MDXJsxTextElement,
} from 'mdast-util-mdx';
import stringWidth from 'string-width';
import GraphemeSplitter from 'grapheme-splitter';

const splitter = new GraphemeSplitter();

type ContentNode =
  | Node
  | MDXFlowExpression
  | MDXJSEsm
  | MDXTextExpression
  | MDXJsxFlowElement
  | MDXJsxTextElement;

export interface RemarkMdxExcerptOptions {
  exportName?: string;
  marker?:
    | string
    | ((
        node: ContentNode,
        index: number | null,
        parent: ContentNode | null
      ) => void)
    | null;
  maxWidth?: number;
  ellipsis?: string;
}

function isInlineNode(
  node: ContentNode
): node is Text | Emphasis | Strong | InlineCode | Link | Delete {
  return [
    'text',
    'emphasis',
    'strong',
    'inlineCode',
    'link',
    'delete',
  ].includes(node.type);
}

function isMdxEsm(node: ContentNode): node is MDXJSEsm {
  return node.type === 'mdxjsEsm';
}

function isMdxFlowExpression(node: ContentNode): node is MDXFlowExpression {
  return node.type === 'mdxFlowExpression';
}

function getHasExcerptDefined(node: ContentNode, exportName: string) {
  return (
    isMdxEsm(node) &&
    !!node.data?.estree?.body.some(
      (body) =>
        body.type === 'ExportNamedDeclaration' &&
        body.declaration?.type === 'VariableDeclaration' &&
        body.declaration.declarations.some(
          (variableDeclarator) =>
            variableDeclarator.id.type === 'Identifier' &&
            variableDeclarator.id.name === exportName
        )
    )
  );
}

export default function remarkMdxExcerpt({
  exportName = 'excerpt',
  marker = 'excerpt',
  maxWidth = 180,
  ellipsis = '…',
}: RemarkMdxExcerptOptions = {}) {
  return function transformer(tree: Root) {
    let excerpt = '';
    let width = 0;
    let isLastNodeInlineText = false;
    let hasMarker = false;
    let hasExcerptDefined = false;

    visit(tree, (node: ContentNode, index, parent) => {
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
      } else if (typeof marker === 'function' && marker(node, index, parent)) {
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
    });

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
    } as MDXJSEsm);
  };
}
