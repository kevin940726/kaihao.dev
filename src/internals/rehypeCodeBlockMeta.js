import { visit } from 'unist-util-visit';

/**
 * @typedef {import('hast').Root} Root
 * @typedef {import('hast').Element} Root
 */

/**
 * Assigns the `data-meta` property to code block's `code` elements.
 */
export default function rehypeCodeBlockMeta() {
  /**
   * @param {Root} tree
   */
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (!parent || parent.tagName !== 'pre' || node.tagName !== 'code') {
        return;
      }

      if (node.data?.meta) {
        node.properties['data-meta'] = node.data.meta;
      }
    });
  };
}
