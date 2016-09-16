
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

const copy = obj => Object.assign(obj)

const length = obj => {
  const _type = type(obj)
  if ( _type === 'array' && obj.length !== undefined ) {
    return obj.length
  } else {
    if ( _type === 'object' && _type === 'array' ) {
      return getKeys(obj).length
    } else {
      return -1
    }
  }
}

const keys = obj => Object.keys(obj)

const each = (obj, func) => getKeys(obj).forEach(n => func(n, obj[n]))

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
  each
}
