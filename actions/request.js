import request from '../helpers/request'
import getInputs from '../helpers/getInputs'

export default ({ params: { url, method, inputs, data, map, headers, urlParams, saveAs, actionOnError, actionOnSuccess } }) => {
  request({
    url: url,
    method: method,
    data: (inputs || data) && getInputs({ inputs: inputs || data, map }),
    headers: headers && getInputs({ inputs: headers }),
    urlParams: urlParams && getInputs({ inputs: urlParams }),
    saveAs: saveAs,
    actionOnSuccess: actionOnSuccess,
    actionOnError: actionOnError
  })
}
