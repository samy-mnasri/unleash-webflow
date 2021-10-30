import get from 'lodash.get'
import cloneDeep from 'lodash.clonedeep'

export default ({ inputs, map }) => {
  let data

  if (typeof inputs === 'string' && (inputs.startsWith('data.') || inputs.startsWith('data['))) {
    data = get(window.webflawless, inputs)
    // } else if (typeof inputs === 'number') {
    //   data = [...Array(inputs)].map((_, index) => ({ index }))
  } else if (typeof inputs === 'function') {
    data = inputs()
  } else {
    data = cloneDeep(inputs)
  }

  if (!Array.isArray(data) && typeof data === 'object') {
    for (const key in data) {
      if (typeof data[key] === 'string' && (data[key].startsWith('data.') || data[key].startsWith('data['))) {
        data[key] = get(window.webflawless, data[key])
      } else if (typeof data[key] === 'function') {
        data[key] = data[key]()
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
}
