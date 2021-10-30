import axios from 'axios'
import set from 'lodash.set'
import save from './save'

export default ({ url, method, data, headers, urlParams, saveAs, actionOnSuccess, actionOnError }) => {
  axios.request({ url, method: method || 'get', data, headers, params: urlParams })
    .then(({ data }) => {
      if (saveAs) {
        save({ as: saveAs, data })
      }

      if (actionOnSuccess) {
        window.webflawless.action(actionOnSuccess)
      }
    })
    .catch(error => {
      console.log(error)

      if (error.name) {
        set(window.webflawless.data.context.error, 'name', error.name)
      }

      if (error.message) {
        window.webflawless.data.context.error.message = error.message
      } else {
        window.webflawless.data.context.error.message = error
      }

      if (actionOnError) {
        window.webflawless.action(actionOnError)
      }
    })
}
