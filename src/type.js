export const type = obj => {
  if (obj === null) {
    return 'null'
  }

  if (obj === undefined) {
    return 'undefined'
  }

  const _typeOf = typeof(obj)

  switch (_typeOf) {
    case 'function':
      return 'function'

    case 'number':
      return isNaN(obj)
        ? 'NaN'
        : 'number'

    case 'object':
      const _type = obj.constructor

      if (_type === Object) {
        return 'object'
      }

      if (_type === Array) {
        return 'array'
      }

    default:
      return _typeOf
  }
}

export const isType = (obj, _type) => type(obj) === _type

export const isString = obj => isType(obj, 'string')

export const isNumber = obj => isType(obj, 'number')

export const isArray = obj => isType(obj, 'array')

export const isObject = obj => isType(obj, 'object')

export const isFunction = obj => isType(obj, 'function')

export const isAOF = obj => obj !== null && ['object', 'function'].indexOf(typeof(obj)) >= 0

export const isUN = obj => obj === undefined || obj === null

export const isNull = obj => obj === null

export const isUndefined = obj => obj === undefined
