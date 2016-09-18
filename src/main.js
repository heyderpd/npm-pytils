
/*!
 * pytils
 * Copyright (c) 2016 heyderpd <heyderpd@gmail.com>
 * ISC Licensed
*/

const type = (obj) => {
  const _typeOf = typeof(obj)
  if (_typeOf === 'function') {
    return 'function'
  } else if (_typeOf === 'object') {
    if (obj === null) {
      return 'null'
    }
    const _type = (obj && obj.constructor) ? obj.constructor : undefined
    if (_type === Object) {
      return _typeOf
    } else {
      return (_type === Array) ? 'array' : _type
    }
  } else {
    return _typeOf
  }
}

const hasProp = (obj, item) => {
  if (obj !== null && obj !== undefined && item !== undefined) {
    if (obj[item] !== undefined) {
      return true
    } else {
      return keys(obj).indexOf(item) >= 0
        ? true
        : false
    }
  } else {
    return false
  }
}

const isType = (obj, _type) => {
  return type(obj) === _type
}

const isString = (obj) => {
  return isType(obj, 'string')
}

const isNumber = (obj) => {
  return isType(obj, 'number')
}

const isArray = (obj) => {
  return isType(obj, 'array')
}

const isObject = (obj) => {
  return isType(obj, 'object')
}

const isNull = (obj) => {
  return isType(obj, 'null')
}

const isUndefined = (obj) => {
  return isType(obj, 'undefined')
}

const copy = obj => {
  switch(type(obj)) {
    case 'array':
    case 'object':
    case 'function':
      // Object.assign don't suport deep cloning!
      // is not the best way, I will improve it later
      return JSON.parse( JSON.stringify(obj) )
    
    default:
      return Object.assign(obj)
  }
}

const length = obj => {
  let _length
  switch(type(obj)) {
    case 'object':
      _length = keys(obj).length
      break

    case 'null':
    case 'undefined':
      _length = -1
      break

    case 'number':
      obj = String(obj)
    case 'array':
    case 'function':
    default:
      _length = obj.length
      break
  }
  return _length
}

const keys = obj => {
  const _type = type(obj)
  switch(_type) {
    case 'array':
    case 'object':
    case 'function':
      return Object.keys(obj)

    case 'null':
    case 'undefined':
      return []

    case 'number':
      obj = String(obj)
    case 'string':
    default:
      return obj.split('')
  }
}

const eachManipulate = (obj, func, manipulate) => keys(obj).forEach( (n) => manipulate(func, n, obj) )

const each = (obj, func) => eachManipulate(
  obj,
  func,
  (fx, k, l) => fx( k, l[k] ) )

const eachVal = (obj, func) => eachManipulate(
  obj,
  func,
  (fx, k, l) => fx( l[k] ) )

module.exports = {
  type,
  isType,
  isString,
  isNumber,
  isArray,
  isObject,
  isNull,
  isUndefined,
  copy,
  length,
  keys,
  hasProp,
  each,
  eachVal
}
