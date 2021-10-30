import getInputs from '../helpers/getInputs'

export default (left, condition, right) => {
  if (condition === 'equals') {
    return getInputs({ inputs: left }) === getInputs({ inputs: right })
  } else if (condition === 'does not equal') {
    return getInputs({ inputs: left }) !== getInputs({ inputs: right })
  } else if (condition === 'exists') {
    return getInputs({ inputs: left })
  } else if (condition === 'does not exist') {
    return !getInputs({ inputs: left })
  } else if (condition === 'less than') {
    return getInputs({ inputs: left }) < getInputs({ inputs: right })
  } else if (condition === 'more than') {
    return getInputs({ inputs: left }) > getInputs({ inputs: right })
  } else if (condition === 'contains') {
    return getInputs({ inputs: left }).includes(getInputs({ inputs: right }))
  } else if (condition === 'does not contain') {
    return !getInputs({ inputs: left }).includes(getInputs({ inputs: right }))
  } else if (condition === 'and') {
    return getInputs({ inputs: left }) && getInputs({ inputs: right })
  } else if (condition === 'or') {
    return getInputs({ inputs: left }) || getInputs({ inputs: right })
  }
}
