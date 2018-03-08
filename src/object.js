import { curry } from './curry'

export const scopedObject = (obj = {}, fxs) => _keys(fxs)
  .reduce(
    (acc, key) => {
      const value = fxs[key]
      acc[key] = value(obj)
      return acc
    },
    obj)

export const toObject = input => {
  if (isArray(input) && length(v) <= 0) {
    return {}
  }
  return input
    .reduce((obj, v, k) => {
      obj[v] = copy(k)
      return obj
    }, {})
}

export const invertObj = input => {
  return reduce(
    (obj, val, key) => {
      obj[val] = key
      return obj
    }, {})(input)
}

export const ojbFromVals = arrKeys => arrKeys
  .reduce(
    (obj, val) => {
      obj[val] = val
      return obj
    }, {})

export const translate = curry(
  dictionary => original => {
    return reduce(
      (obj, ori, des) => {
        obj[des] = path([ori], original)
        return obj
      }, {})(dictionary)
  })

export const uniqObject = (A, B) => compose(
    arr => arr && arr.length === 1 && arr[0] === true,
    uniq,
    map(key => path([key], A) === path([key], B)),
    keys
  )(A)
