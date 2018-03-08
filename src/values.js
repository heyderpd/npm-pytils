import { type } from './type'
import { mapx } from './map'

const partialValues = obj => mapx(obj, val => val)

export const values = obj => {
  switch(type(obj)) {
    case 'null':
    case 'undefined':
      return []

    case 'array':
      return obj

    default:
      return partialValues(obj)
  }
}

export const hasValue = (obj, item) => values(obj).indexOf(item) >= 0
