
/*!
 * pytils
 * Copyright (c) 2016 heyderpd <heyderpd@gmail.com>
 * ISC Licensed
*/

const compose = (...args) => {
  return input => args
    .reduce(
      (obj, func) => func(obj), input)
}

const curry = func => {
  return (...args) => {
    if (args.length >= func.length) {
      return func(...args)
    }
    const store = args
    return (...args) => curry(func)(...[...store, ...args])
  }
}

const pureProp = (props, obj) => keys(props)
  .reduce((obj, prop) => hasProp(obj, prop)
    ? obj[prop]
    : undefined)

const prop = curry(pureProp)

const type = obj => {
  if (obj === null) {
    return 'null'
  }
  if (obj === undefined) {
    return 'null'
  }
  const _typeOf = typeof(obj)
  switch (_typeOf) {
    case 'function':
      return 'function'

    case 'object':
      const _type = (obj && obj.constructor) ? obj.constructor : null
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

const hasProp = (obj, item) => isAOF(obj)
  ? keys(obj).indexOf(item) >= 0
  : false

const isType = (obj, _type) => type(obj) === _type

const isString = obj => isType(obj, 'string')

const isNumber = obj => isType(obj, 'number')

const isArray = obj => isType(obj, 'array')

const isObject = obj => isType(obj, 'object')

const isFunction = obj => isType(obj, 'function')

const isAOF = obj => ['array', 'object', 'function'].indexOf(type(obj)) >= 0

const isNull = obj => isType(obj, 'null')

const isUndefined = obj => isType(obj, 'undefined')

const copy = obj => {
  if(isAOF(obj)) {
    return copyObject(obj)
  }
  return Object.assign(obj)
}

const copyObject = (obj, R = 0) => {
  if (R++ > 42)
    throw "Limit recursive exceeded in pytils.copyObject"

  if(isAOF(obj)) {
    const nObj = new obj.constructor()
    map(
      obj,
      (v, k) => nObj[k] = copyObject(v, R))
    return nObj
  }

  return obj
}

const length = obj => {
  switch(type(obj)) {
    case 'number':
    case 'object':
      return keys(obj).length

    case 'string':
    case 'array':
    case 'function':
      return obj.length

    case 'null':
    case 'undefined':
    default:
      return -1
  }
}

const keys = obj => {
  switch(type(obj)) {
    case 'number':
      obj = String(obj)

    case 'string':
      obj = obj.split('')

    case 'array':
    case 'object':
    case 'function':
      return Object.keys(obj)

    case 'null':
    case 'undefined':
    default:
      return []
  }
}

const values = obj => {
  switch(type(obj)) {
    case 'number':
      return String(obj)
        .split('')
        .map(n => parseInt(n))

    case 'string':
      return obj.split('')

    case 'object':
    case 'function':
      return map(obj, k => obj[k])

    case 'array':
    case 'null':
    case 'undefined':
    default:
      return []
  }
}

const toObject = input => {
  if (isArray(input) && length(v) <= 0) {
    return {}
  }

  return copy(input)
    .reduce((obj, v, k) => {
      obj[v] = k
      return obj
    }, {})
}

const arrayDiff = (list, compare) => {
  if (length(compare) <= 0) {
    return copy(list)
  }
  if (length(list) <= 0) {
    return copy(compare)
  }
  const obj = toObject(list)
  compare
    .map(k => delete obj[k])
  return keys(obj)
}

const map = (obj, func) => keys(obj).map(k => func(obj[k], k, obj))

module.exports = {
  compose,
  curry,
  prop,
  type,
  isType,
  isString,
  isNumber,
  isArray,
  isObject,
  isFunction,
  isAOF,
  isNull,
  isUndefined,
  copy,
  length,
  keys,
  values,
  hasProp,
  map,
  toObject,
  arrayDiff
}
