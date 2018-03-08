import { curry } from './curry'
import { isUN } from './type'

const partialPath = function (path, obj) {
  return path.reduce(
    (acc, item) => {
      if (isUN(acc)) {
        throw new Error('can\'t get prop from it')

      } else {
        return acc[item]
      }

    }, obj)
}

export const path = curry(function (path, obj) {
  try {
    return partialPath(path, obj)

  } catch (error) {
    return undefined
  }
})

export const pathOr = curry(function (orValue, path, obj) {
  try {
    return partialPath(path, obj)

  } catch (error) {
    return orValue
  }
})
