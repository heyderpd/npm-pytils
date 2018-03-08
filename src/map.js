import { isUN } from './type'
import { keys } from './keys'

export const mapx = (list, func) => {
  if (isUN(list)) {
    return []

  } else {
    return keys(list)
      .map(key => func(list[key], key))
  }
}

export const map = curry(function (func, list) {
  return mapx(list, func)
})
