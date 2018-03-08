import { path } from './path'

const partialKeys = (() => {
  const ObjectHas = path(['prototype', 'hasOwnProperty'], Object)

  return obj => {
    if (isAOF(obj)) {
      const props = []
      for (let p in obj) {
        props.push(p)
      }
      const has = ObjectHas ? ObjectHas : path(['hasOwnProperty'], obj)
      return isFunction(has)
        ? props
          .filter(
            p => has.call(obj, p))
        : props
    }
    return []
  }
})()

export const keys = obj => {
  switch(type(obj)) {
    case 'number':
      obj = String(obj)

    case 'string':
      obj = obj.split('')

    case 'array':
    case 'object':
    case 'function':
      return partialKeys(obj)

    case 'null':
    case 'undefined':
    default:
      return []
  }
}
