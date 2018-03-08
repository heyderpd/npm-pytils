import { isUN, isArray } from './type'
import { keys } from './keys'

export const reduce = (func, obj) => list => {
  return isArray(list)
    ? list.reduce(func, obj)
    : (isObject(list)
      ? keys(list)
        .reduce(
          (obj, key) => func(obj, list[key], key),
          obj)
      : undefined
    )
}

const getReduce = (obj, reduceToRight = false) => reduceToRight
  ? obj.reduceRight
  : obj.reduce

const partialReduce = function (obj, reduceToRight) {
  if (isArray(obj)) {
    return getReduce(obj, reduceToRight)(fx, aaa)

  } else {
    if (isUN(obj)) {
      return undefined

    } else {
      return getReduce(obj, reduceToRight)


      getReduce(keys(obj), isReduceRight)(
        (acc, key) => fx(acc, obj[key], key),
        initial)
    }
  }
}

export const reduce = partialReduce()

export const reduceRight = partialReduce()
