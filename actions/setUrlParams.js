import getNodesFromSelector from '../helpers/getNodesFromSelector'
import getInputs from '../helpers/getInputs'

export default ({ selector, params: { data, map } }) => {
  if (selector) {
    getNodesFromSelector({ selector }).map(node => {
      if (node.href) {
        const url = new URL(node.href)
        const inputsData = getInputs({ inputs: data, map })

        for (const key in inputsData) {
          url.searchParams.set(key, inputsData[key])
        }

        node.href = url.href
      }

      return null
    })
  } else {
    const url = new URL(window.location.href)
    const inputsData = getInputs({ inputs: data, map: map })

    for (const key in inputsData) {
      url.searchParams.set(key, inputsData[key])
    }

    window.history.replaceState(null, null, url)
    window.webflawless.data.url.params = Object.fromEntries(new URLSearchParams(url.search).entries())
  }
}
