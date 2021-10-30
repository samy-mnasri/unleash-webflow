import getNodesFromSelector from '../helpers/getNodesFromSelector'

export default ({ selector }) => {
  getNodesFromSelector({ selector }).map(el => {
    el.style.display = 'none'
    return null
  })
}
