import { length } from './length'
import { deepCopy } from './copy'

export const empty = obj => {
  obj.length = 0
  return obj
}

export const removeEmpty = obj => {
  return obj.reduce(
    (acc, item) => (acc.push(item), acc),
    new Array()
  )
}

export const remove = (obj, values) => {
  const newObj = deepCopy(obj)
  newObj.map(
    (item, key) => values.indexOf(item) >= 0 && delete newObj[key])
  return removeEmpty(newObj)
}

export const arrayDiff = (list, compare) => {
  if (length(compare) <= 0) {
    return deepCopy(list)
  }
  if (length(list) <= 0) {
    return deepCopy(compare)
  }
  const obj = toObject(list)
  compare
    .map(k => delete obj[k])
  return remove(list, keys(obj))
}
