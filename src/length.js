import { type } from './type'
import { keys, hasProp } from './keys'

export const length = obj => {
  switch (type(obj)) {
    case 'NaN':
    case 'null':
    case 'undefined':
      return -1

    case 'number':
      return keys(String(obj)).length

    default:
      return keys(obj).length
  }
}
