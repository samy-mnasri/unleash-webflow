import hide from '../actions/hide'
import replaceText from '../actions/replaceText'
import openUrl from '../actions/openUrl'
import save from '../actions/save'
import request from '../actions/request'
import setUrlParams from '../actions/setUrlParams'
import iterate from '../actions/iterate'
import triggerAction from '../helpers/triggerAction'

export default args => {
  const { type, selector, trigger, condition, params } = args
  console.log('action', args)

  const action = () => {
    if (typeof condition === 'undefined' || condition) {
      if (type === 'hide') {
        hide({ selector })
      } else if (type === 'request') {
        request({
          params: {
            url: params.url,
            method: params.method,
            data: params.data,
            map: params.map,
            headers: params.headers,
            urlParams: params.urlParams,
            saveAs: params.saveAs,
            actionOnError: params.actionOnError,
            actionOnSuccess: params.actionOnSuccess
          }
        })
      } else if (type === 'replaceText') {
        replaceText({
          selector,
          params: { value: params.value }
        })
      } else if (type === 'openUrl') {
        openUrl({
          params: {
            newTab: params.newTab,
            value: params.value
          }
        })
      } else if (type === 'save') {
        save({
          params: {
            data: params.data,
            map: params.map,
            as: params.as
          }
        })
      } else if (type === 'setUrlParams') {
        setUrlParams({
          selector,
          params: {
            data: params.data,
            map: params.map
          }
        })
      } else if (type === 'iterate') {
        iterate({
          selector,
          params: {
            items: params.items,
            map: params.map,
            iterations: params.iterations
          }
        })
      }
    }
  }

  const triggerActionWithArgs = () => {
    triggerAction({
      trigger,
      action,
      type,
      selector,
      condition,
      params
    })
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    triggerActionWithArgs()
  } else {
    document.addEventListener('DOMContentLoaded', triggerActionWithArgs)
  }
}
