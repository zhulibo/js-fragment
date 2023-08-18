/**
 * Gets a node iterator that filters nodes based on the filterNode function.
 *
 * @param {function} filterNode - A function that returns true if the node should be accepted.
 * @returns {NodeIterator} A node iterator that filters nodes based on the filterNode function.
 */
export function getNodeIterator(filterNode: (node: Node) => boolean) : NodeIterator {
  return document.createNodeIterator(
    document.body,
    NodeFilter.SHOW_ELEMENT,
    {
      acceptNode(node) {
        return filterNode(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    }
  )
}
