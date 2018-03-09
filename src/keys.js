import { path, pathOr } from './path'
import { isUN, isAOF, isFunction } from './type'

const simpleObjectKeys = () => {
  const ObjectHas = pathOr(false, ['prototype', 'hasOwnProperty'], Object)

  return obj => {
    const has = ObjectHas ? ObjectHas : path(['hasOwnProperty'], obj)
    const props = []
    for (let p in obj) {
      props.push(p)
    }
    if (isFunction(has)) {
      return props
        .filter(
          p => has.call(obj, p))

    } else {
      return props
    }
  }
}

const partialKeys = (() => {
  const objectKeys = path(['keys'], Object)
  if (isFunction(objectKeys)) {
    return objectKeys

  } else {
    return simpleObjectKeys()
  }
})

export const keys = obj => {
  if (isUN(obj)) {
    return []

  } else {
    return Object.keys(obj)

    return partialKeys(obj)
  }
}

export const hasProp = (obj, item) => keys(obj).indexOf(item) >= 0
