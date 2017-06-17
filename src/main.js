
/*!
 * pytils
 * Copyright (c) 2016 heyderpd <heyderpd@gmail.com>
 * ISC Licensed
*/

/* TYPE */

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
      const _type = path(['constructor'], obj)
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

export const isAOF = obj => ['array', 'object', 'function'].indexOf(type(obj)) >= 0

export const isUN = obj => ['undefined', 'null'].indexOf(type(obj)) >= 0

export const isNull = obj => isType(obj, 'null')

export const isUndefined = obj => isType(obj, 'undefined')

/* TYPE */
/* RAMDA LIKE */

export const compose = (...funcs) => input => {
  return funcs
    .reverse()
    .reduce(
      (obj, fx) => fx(obj), input)
}

export const curry = func => (...args) =>
  args.reduce(
    (fx, arg) => fx(arg),
    func)

export const path = curry(
  path => obj => {
    return path
      .reduce(
        (acc, item) => {
          return acc !== null && acc !== undefined && typeof(acc) === 'object'
            ? acc[item]
            : undefined
        }, obj)
  })

export const mapx = (list, func) => isArray(list)
  ? list.map(func)
  : (isObject(list)
    ? keys(list).map(
        key => func(list[key], key))
    : undefined)

export const map = curry(func => list => mapx(list, func))

export const reduce = (func, obj) => list => {
    return isArray(list)
      ? list.reduce(func, obj)
      : (isObject(list)
        ? keys(list)
          .reduce(
            (obj, key) => func(obj, list[key], key),
            obj)
        : undefined
      )
  }

export const uniqWith = (comparator, list) => {
  const outputList = []
  map(
    itemA => {
      const equals = map(
          itemB => comparator(itemA, itemB)
        )(outputList)
        .filter(item => item)

      equals && equals.length === 0 && outputList.push(itemA)
    })(list)
  return outputList
}

export const uniq = list => {
  return values(createObj(list))
}

export const eq1True = list => isArray(list) && list.length === 1 && list[0] === true

/* RAMDA LIKE */
/* PYTILS */

export const arrayDiff = (list, compare) => {
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

export const toObject = input => {
  if (isArray(input) && length(v) <= 0) {
    return {}
  }
  return input
    .reduce((obj, v, k) => {
      obj[v] = copy(k)
      return obj
    }, {})
}

export const invertObj = input => {
  return reduce(
    (obj, val, key) => {
      obj[val] = key
      return obj
    }, {})(input)
}

export const ojbFromVals = arrKeys => arrKeys
  .reduce(
    (obj, val) => {
      obj[val] = val
      return obj
    }, {})

export const translate = curry(
  dictionary => original => {
    return reduce(
      (obj, ori, des) => {
        obj[des] = path([ori], original)
        return obj
      }, {})(dictionary)
  })

export const uniqObject = (A, B) => compose(
    eq1True,
    uniq,
    map(
      key => path([key], A) === path([key], B)),
    keys
  )(A)

export const ifThrow = (Throw, text) => {
  if (Throw) {
    throw text
  }
}

/* PYTILS */
/* OBJECT */

const _keys = (() => {
  const ObjectHas = path(['prototype', 'hasOwnProperty'], Object)

  return obj => {
    if (isAOF(obj)) {
      const props = []
      for (let p in obj) {
        props.push(p)
      }
      const has = ObjectHas ? ObjectHas : path(['hasOwnProperty'], obj)
      return isFunction(has)
        ? props
          .filter(
            p => has.call(obj, p))
        : props
    }
    return []
  }
})()

export const keys = obj => {
  switch(type(obj)) {
    case 'number':
      obj = String(obj)

    case 'string':
      obj = obj.split('')

    case 'array':
    case 'object':
    case 'function':
      return _keys(obj)

    case 'null':
    case 'undefined':
    default:
      return []
  }
}

export const values = obj => {
  switch(type(obj)) {
    case 'number':
      return String(obj)
        .split('')
        .map(n => parseInt(n))

    case 'string':
      return obj.split('')

    case 'object':
    case 'function':
      return map(
        val => val,
        obj)

    case 'array':
    case 'null':
    case 'undefined':
    default:
      return []
  }
}

export const _copy = (obj, R = 0) => {
  ifThrow(
    R++ > 42,
    'Limit recursive exceeded in pytils.copyObject')

  if (isAOF(obj)) {
    const nObj = new obj.constructor()
    map(
      (v, k) => nObj[k] = _copy(v, R),
      obj)
    return nObj
  }
  
  return obj
}

export const copy = obj => _copy(obj)

export const hasProp = (obj, item) => isAOF(obj)
  ? keys(obj).indexOf(item) >= 0
  : false

export const length = obj => {
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

/* OBJECT */
