import { isUN } from './type'
import { keys, hasProp } from './keys'

export const length = obj => {
  if (isUN(obj)) {
    return -1
  }

  if (hasProp(obj, 'length')) {
    return obj.length

  } else {
    return keys(obj).length
  }
}
