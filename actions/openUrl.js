import getInputs from '../helpers/getInputs'

export default ({ params: { newTab, value } }) => {
  if (newTab) {
    window.open(getInputs({ inputs: value }), '_blank').focus()
  } else {
    window.location.href = getInputs({ inputs: value })
  }
}
