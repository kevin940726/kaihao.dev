// @ts-check
import { visit } from 'unist-util-visit';

/**
 * @typedef {import('hast').Root} Root
 * @typedef {import('hast').Element} Element
 */

/**
 * Assigns the `data-meta` property to code block's `code` elements.
 */
export default function rehypeCodeBlockMeta() {
  /**
   * @param {Root} tree
   */
  return (tree) => {
    visit(tree, 'element', (node, _index, parent) => {
      if (
        !parent ||
        /** @type {Element} */ (parent).tagName !== 'pre' ||
        node.tagName !== 'code'
      ) {
        return;
      }

      if (node.data?.meta && node.properties) {
        node.properties['data-meta'] = /** @type {string} */ (node.data.meta);
      }
    });
  };
}
