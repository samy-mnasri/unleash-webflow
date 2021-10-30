import save from '../helpers/save'
import getInputs from '../helpers/getInputs'

export default ({ params: { data, map, as } }) => {
  const value = getInputs({ inputs: data, map: map })
  save({ as, data: value })
}
