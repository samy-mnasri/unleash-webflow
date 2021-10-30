import get from 'lodash.get'
import set from 'lodash.set'
import getNodesFromSelector from './getNodesFromSelector'

export default ({ trigger, action, type, selector, condition, params }) => {
  if (trigger) {
    if (trigger.event === 'saved') {
      if (get(window.webflawless.data.saved, trigger.selector) && !trigger.selector.startsWith('local.') && !trigger.selector.startsWith('session.')) {
        action()
      }

      if (!get(window.webflawless.listeners.saved, trigger.selector)) {
        set(window.webflawless.listeners.saved, trigger.selector, [])
      }

      get(window.webflawless.listeners.saved, trigger.selector).push({ type, selector, condition, params })
    } else {
      (getNodesFromSelector({ selector: trigger.selector }) || [window]).map(node => {
        node.addEventListener(trigger.event, event => {
          if (trigger.event === 'submit') {
            event.preventDefault()
            event.stopPropagation()
            window.webflawless.data.context.form = Object.fromEntries(new window.FormData(event.target))
          }

          window.webflawless.data.context.input = node.value
          const iterateContainer = node.closest('[webflawless-data]')

          if (iterateContainer) {
            window.webflawless.data.context.item = JSON.parse(iterateContainer.getAttribute('webflawless-data'))
          }

          action()
        })

        return null
      })
    }
  } else {
    action()
  }
}
