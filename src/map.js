import { type } from './type'
import { keys } from './keys'
import { curry } from './curry'

export const mapx = (list, func) => {
  switch (type(list)) {
    case 'null':
    case 'undefined':
      return []

    case 'array':
      return list.map(func)

    default:
      return keys(list).map(key => func(list[key], key))
  }
}

export const map = curry(function (func, list) {
  return mapx(list, func)
})
