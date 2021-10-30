import get from 'lodash.get'
import set from 'lodash.set'

export default ({ data, as }) => {
  set(window.webflawless.data.saved, as, data)

  if (get(window.webflawless.listeners.saved, as)) {
    get(window.webflawless.listeners.saved, as).map(action => window.webflawless.action(action))
  }

  if (as.includes('local')) {
    window.localStorage.setItem('webflawless', JSON.stringify(window.webflawless.data.saved.local))
  } else if (as.includes('session')) {
    window.localStorage.setItem('webflawless', JSON.stringify(window.webflawless.data.saved.session))
  }
}
