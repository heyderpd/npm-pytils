import { type } from './type'
import { keys } from './keys'

const getReduce = (obj, fx, initial, reduceToRight) => {
  if (initial !== undefined) {
    return reduceToRight
      ? obj.reduceRight(fx, initial)
      : obj.reduce(fx, initial)

  } else {
    return reduceToRight
      ? obj.reduceRight(fx)
      : obj.reduce(fx)
  }
}

const objectReduce = (obj, fx) => (acc, key) => fx(acc, obj[key], key)

const partialReduce = function ({ obj, fx, initial = undefined, reduceToRight = false }) {
  switch(type(obj)) {
    case 'array':
      return getReduce(
        obj,
        fx,
        initial,
        reduceToRight
      )

    case 'object':
    case 'function':
      return getReduce(
        keys(obj),
        objectReduce(obj, fx),
        initial,
        reduceToRight
      )

    default:
      return undefined
  }
}

export const reduce = function (obj, fx, initial) {
  return partialReduce({ obj, fx, initial, reduceToRight: false })
}

export const reduceRight = function (obj, fx, initial) {
  return partialReduce({ obj, fx, initial, reduceToRight: true })
}
