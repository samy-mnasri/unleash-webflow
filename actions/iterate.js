import getNodesFromSelector from '../helpers/getNodesFromSelector'
import getInputs from '../helpers/getInputs'
import insertNodeAfter from '../helpers/insertNodeAfter'
import replaceValueFromNode from '../helpers/replaceValueFromNode'

export default ({ selector, params: { inputs, map, iterations } }) => {
  const contextNodes = getNodesFromSelector({ selector })

  const inputsData = iterations
    ? [...new Array(parseInt(iterations, 10))].map((_, index) => ({ iteration: index + 1 }))
    : getInputs({ inputs, map })

  contextNodes.map(contextNode => {
    if (contextNode.getAttribute('webflawless-clone')) {
      contextNode.remove()
    } else {
      inputsData.map((inputsItem, index) => {
        const newNode = contextNode.cloneNode(true)
        newNode.setAttribute('webflawless-index', index)
        newNode.setAttribute('webflawless-clone', true)
        newNode.setAttribute('webflawless-data', JSON.stringify(inputsItem))
        insertNodeAfter({ newNode, referenceNode: contextNode })

        const nodes = getNodesFromSelector({ selector: { type: 'tag' }, contextNode: newNode })

        nodes.map(node => replaceValueFromNode({
          node,
          inputs: inputsItem
        }))

        return null
      })

      contextNode.style.display = 'none'
    }

    return null
  })
}
