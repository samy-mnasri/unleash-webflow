import getInputs from '../../helpers/getInputs'

export default {
  concatenate: (...inputs) => {
    const executeLater = () => inputs.map(input => getInputs({ inputs: input })).join('')
    return executeLater
  }
}
