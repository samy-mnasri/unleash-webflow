import getNodesFromSelector from '../helpers/getNodesFromSelector'
import getInputs from '../helpers/getInputs'

export default ({ selector, params: { value } }) => {
  getNodesFromSelector({ selector }).map(el => {
    el.innerText = getInputs({ inputs: value })
    return null
  })
}
