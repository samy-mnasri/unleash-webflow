export default ({ selector, contextNode }) => {
  if (typeof selector === 'string' || selector.type === 'css') {
    return Array.from(document.querySelectorAll(selector))
  } else if (selector.type === 'id') {
    return [document.getElementById(selector.value)]
  } else if (selector.type === 'class') {
    return Array.from(document.getElementsByClassName(selector.value.toLowerCase().replace(/\s/g, '-')))
  } else if (selector.type === 'tag') {
    const nodes = []

    const snapshotTags = document.evaluate(`descendant-or-self::*[contains(text(), "[${'webflawless'}:")]`, contextNode, null, window.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
    const snapshotAttributes = document.evaluate(`descendant-or-self::*/@*[contains(., "[${'webflawless'}:")]`, contextNode, null, window.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)

    for (const index in [...new Array(snapshotTags.snapshotLength)]) {
      nodes.push(snapshotTags.snapshotItem(index))
    }

    for (const index in [...new Array(snapshotAttributes.snapshotLength)]) {
      nodes.push(snapshotAttributes.snapshotItem(index))
    }

    return nodes
  }

  return null
}
