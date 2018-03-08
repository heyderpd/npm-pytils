import { path } from './path'
import { isUN, isAOF, isFunction } from './type'

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
  if (isUN(obj)) {
    return []

  } else {
    return partialKeys(obj)
  }
}

export const hasProp = (obj, item) => keys(obj).indexOf(item) >= 0
