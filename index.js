import get from 'lodash.get'
import set from 'lodash.set'
import axios from 'axios'

const webflawless = { data: {} }

const listeners = { saved: {} }

const helpers = {
  getNodesFromSelector: ({ selector, contextNode }) => {
    if (typeof selector === 'string' || selector.type === 'css') {
      return Array.from(document.querySelectorAll(selector))
    } else if (selector.type === 'id') {
      return [document.getElementById(selector.value)]
    } else if (selector.type === 'class') {
      return Array.from(document.getElementsByClassName(selector.value.toLowerCase().replace(/\s/g, '-')))
    } else if (selector.type === 'tag') {
      const nodes = []

      const snapshotTags = document.evaluate(`descendant-or-self::*[contains(text(), "[${'webflawless'}:")]`, contextNode, null, window.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
      const snapshotAttributes = document.evaluate(`descendant-or-self::*/@*[contains(., "[${'webflawless'}:")]`, contextNode, null, window.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)

      for (const index in [...new Array(snapshotTags.snapshotLength)]) {
        nodes.push(snapshotTags.snapshotItem(index))
      }

      for (const index in [...new Array(snapshotAttributes.snapshotLength)]) {
        nodes.push(snapshotAttributes.snapshotItem(index))
      }

      return nodes
    }

    return null
  },
  replaceValueFromNode: ({ node, inputs }) => {
    if (node.innerText) {
      (node.innerText.match(/\[webflawless:[^\]]+\]/g) || []).map(tag => {
        const input = tag.replace('[webflawless:', '').replace(']', '')

        if (input && typeof inputs[input] !== 'undefined') {
          node.innerText = node.innerText.replace(new RegExp(`\\[webflawless:${input}\\]`, 'g'), inputs[input])
        }

        return null
      })
    }

    if (node.value) {
      (node.value.match(/\[webflawless:[^\]]+\]/g) || []).map(tag => {
        const input = tag.replace('[webflawless:', '').replace(']', '')

        if (input && typeof inputs[input] !== 'undefined') {
          node.value = node.value.replace(new RegExp(`\\[webflawless:${input}\\]`, 'g'), inputs[input])

          if (node.name === 'webflawless-checked' && inputs[input]) {
            node.ownerElement.checked = true
          } else if (node.name === 'webflawless-src' && inputs[input]) {
            node.ownerElement.src = inputs[input]
            node.ownerElement.srcset = inputs[input]
          } else if (node.name === 'webflawless-href' && inputs[input]) {
            node.ownerElement.href = inputs[input]
          } else if (node.name === 'webflawless-value' && inputs[input]) {
            node.ownerElement.value = inputs[input]
          }
        }

        return null
      })
    }
  },
  getInputs: ({ inputs, map }) => {
    let data

    if (typeof inputs === 'string' && (inputs.startsWith('data.') || inputs.startsWith('data['))) {
      data = get(webflawless, inputs)
      // } else if (typeof inputs === 'number') {
      //   data = [...Array(inputs)].map((_, index) => ({ index }))
    } else {
      data = JSON.parse(JSON.stringify(inputs))
    }

    if (!Array.isArray(data) && typeof data === 'object') {
      for (const key in data) {
        if (typeof data[key] === 'string' && (data[key].startsWith('data.') || data[key].startsWith('data['))) {
          data[key] = get(webflawless, data[key])
        }
      }
    }

    if (map) {
      if (Array.isArray(data)) {
        data = data.map(item => {
          const newItem = {}

          for (const key in map) {
            newItem[key] = get(item, map[key])
          }

          return newItem
        })
      } else if (typeof data === 'object') {
        for (const key in map) {
          data[key] = get(data, map[key])
        }
      }
    }

    return data
  },
  insertNodeAfter: ({ newNode, referenceNode }) => {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
  },
  request: ({ url, method, data, headers, urlParams, saveAs, actionOnLoad }) => {
    axios.request({ url, method: method || 'get', data, headers, params: urlParams })
      .then(({ data }) => {
        if (saveAs) {
          webflawless.data.saved[saveAs] = data

          if (listeners.saved[saveAs]) {
            listeners.saved[saveAs].map(action => webflawless.action(action))
          }

          if (saveAs === 'local') {
            window.localStorage.setItem('webflawless', JSON.stringify(webflawless.data.saved.local))
          } else if (saveAs === 'session') {
            window.localStorage.setItem('webflawless', JSON.stringify(webflawless.data.saved.session))
          }
        }

        if (actionOnLoad) {
          webflawless.action(actionOnLoad)
        }
      })
  }
}

webflawless.condition = (left, condition, right) => {
  if (condition === 'equals') {
    return helpers.getInputs({ inputs: left }) === helpers.getInputs({ inputs: right })
  } else if (condition === 'does not equal') {
    return helpers.getInputs({ inputs: left }) !== helpers.getInputs({ inputs: right })
  } else if (condition === 'exists') {
    return helpers.getInputs({ inputs: left })
  } else if (condition === 'does not exist') {
    return !helpers.getInputs({ inputs: left })
  } else if (condition === 'less than') {
    return helpers.getInputs({ inputs: left }) < helpers.getInputs({ inputs: right })
  } else if (condition === 'more than') {
    return helpers.getInputs({ inputs: left }) > helpers.getInputs({ inputs: right })
  } else if (condition === 'contains') {
    return helpers.getInputs({ inputs: left }).includes(helpers.getInputs({ inputs: right }))
  } else if (condition === 'does not contain') {
    return !helpers.getInputs({ inputs: left }).includes(helpers.getInputs({ inputs: right }))
  } else if (condition === 'and') {
    return helpers.getInputs({ inputs: left }) && helpers.getInputs({ inputs: right })
  } else if (condition === 'or') {
    return helpers.getInputs({ inputs: left }) || helpers.getInputs({ inputs: right })
  }
}

webflawless.data.url = {
  value: window.location.href,
  href: window.location.href,
  params: Object.fromEntries(new URLSearchParams(window.location.search).entries()),
  pathname: window.location.pathname,
  origin: window.location.origin,
  host: window.location.host,
  hash: window.location.hash
}

webflawless.data.context = {
  item: null,
  input: null
}

webflawless.data.saved = {
  local: window.localStorage.getItem('webflawless') || {},
  session: window.sessionStorage.getItem('webflawless') || {}
}

webflawless.data.getCookie = (name) => {
  return document.cookie.split(name + '=')[1]
    ? decodeURIComponent(document.cookie.split(name + '=')[1].split(';')[0])
    : null
}

webflawless.data.setCookie = ({ name, value }) => {
  document.cookie = name + '=' + encodeURIComponent(value)
}

webflawless.action = ({ type, selector, trigger, condition, params }) => {
  console.log({ type, selector, trigger, condition, params })

  const action = () => {
    if (typeof condition === 'undefined' || condition) {
      if (type === 'hide') {
        helpers.getNodesFromSelector({ selector }).map(el => {
          el.style.display = 'none'
          return null
        })
      } else if (type === 'request') {
        helpers.request({
          url: params.url,
          method: params.method,
          data: (params.inputs || params.data) && helpers.getInputs({ inputs: params.inputs || params.data, map: params.map }),
          headers: params.headers && helpers.getInputs({ inputs: params.headers }),
          urlParams: params.urlParams && helpers.getInputs({ inputs: params.urlParams }),
          saveAs: params.saveAs,
          actionOnLoad: params.actionOnLoad
        })
      } else if (type === 'replaceText') {
        helpers.getNodesFromSelector({ selector }).map(el => {
          el.innerText = helpers.getInputs({ inputs: params.value })
          return null
        })
      } else if (type === 'messageToIframeParent') {
        window.parent.postMessage(helpers.getInputs({ inputs: params.value }), '*')
      } else if (type === 'save') {
        const value = helpers.getInputs({ inputs: params.data, map: params.map })
        set(webflawless, params.as, value)
      } else if (type === 'setUrlParams') {
        if (selector) {
          helpers.getNodesFromSelector({ selector }).map(node => {
            if (node.href) {
              const url = new URL(node.href)
              const inputsData = helpers.getInputs({ inputs: params.inputs, map: params.map })

              for (const key in inputsData) {
                url.searchParams.set(key, inputsData[key])
              }

              node.href = url.href
            }

            return null
          })
        } else {
          const url = new URL(window.location.href)
          const inputsData = helpers.getInputs({ inputs: params.inputs, map: params.map })

          for (const key in inputsData) {
            url.searchParams.set(key, inputsData[key])
          }

          window.history.replaceState(null, null, url)
        }
      } else if (type === 'iterate') {
        const contextNodes = helpers.getNodesFromSelector({ selector })
        const inputsData = helpers.getInputs({ inputs: params.inputs, map: params.map })

        contextNodes.map(contextNode => {
          if (contextNode.getAttribute('webflawless-clone')) {
            contextNode.remove()
          } else {
            inputsData.map((inputsItem, index) => {
              const newNode = contextNode.cloneNode(true)
              newNode.setAttribute('webflawless-index', index)
              newNode.setAttribute('webflawless-clone', true)
              newNode.setAttribute('webflawless-data', JSON.stringify(inputsItem))
              helpers.insertNodeAfter({ newNode, referenceNode: contextNode })

              const nodes = helpers.getNodesFromSelector({ selector: { type: 'tag' }, contextNode: newNode })

              nodes.map(node => helpers.replaceValueFromNode({
                node,
                inputs: inputsItem
              }))

              return null
            })

            contextNode.style.display = 'none'
          }

          return null
        })
      }
    }
  }

  const triggerAction = () => {
    if (trigger) {
      if (trigger.event === 'saved') {
        if (webflawless.data.saved[trigger.selector]) {
          action()
        }

        if (!listeners.saved[trigger.selector]) {
          listeners.saved[trigger.selector] = []
        }

        listeners.saved[trigger.selector].push({ type, selector, condition, params })
      } else {
        (helpers.getNodesFromSelector({ selector: trigger.selector }) || [window]).map(node => {
          node.addEventListener(trigger.event, () => {
            webflawless.data.context.input = node.value
            const iterateContainer = node.closest('[webflawless-data]')

            if (iterateContainer) {
              webflawless.data.context.item = JSON.parse(iterateContainer.getAttribute('webflawless-data'))
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

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    triggerAction()
  } else {
    document.addEventListener('DOMContentLoaded', triggerAction)
  }
}

export default webflawless
