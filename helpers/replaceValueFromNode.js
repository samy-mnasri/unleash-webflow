export default ({ node, inputs }) => {
  if (node.innerText) {
    (node.innerText.match(/\[webflawless:[^\]]+\]/g) || []).map(tag => {
      const input = tag.replace('[webflawless:', '').replace(']', '')

      if (input && typeof inputs[input] !== 'undefined') {
        node.innerText = node.innerText.replace(new RegExp(`\\[webflawless:${input}\\]`, 'g'), inputs[input])
      }

      return null
    })
  }

  if (node.value) {
    (node.value.match(/\[webflawless:[^\]]+\]/g) || []).map(tag => {
      const input = tag.replace('[webflawless:', '').replace(']', '')

      if (input && typeof inputs[input] !== 'undefined') {
        node.value = node.value.replace(new RegExp(`\\[webflawless:${input}\\]`, 'g'), inputs[input])

        if (node.name === 'webflawless-checked' && inputs[input]) {
          node.ownerElement.checked = true
        } else if (node.name === 'webflawless-src' && inputs[input]) {
          node.ownerElement.src = inputs[input]
          node.ownerElement.srcset = inputs[input]
        } else if (node.name === 'webflawless-href' && inputs[input]) {
          node.ownerElement.href = inputs[input]
        } else if (node.name === 'webflawless-value' && inputs[input]) {
          node.ownerElement.value = inputs[input]
        }
      }

      return null
    })
  }
}
