import { curry } from './curry'
import {
  isUN,
  isAOF,
  isString,
  isNumber,
  isArray,
  isObject,
  isNull,
  isUndefined,
  isFunction
} from './type'

export const ifThrow = (Throw, text) => {
  if (Throw) {
    throw text
  }
}

const essentialDict = {
  'UN':  isUN,
  'AOF': isAOF,
  'string': isString,
  'number': isNumber,
  'array':  isArray,
  'object': isObject,
  'null':   isNull,
  'undefined': isUndefined,
  'function':  isFunction
}

const essentialErro = (name, type) => `pytils: Params[x].${name} is a essential! and need to be a valid '${type}'.`

export const isEssential = curry(function (moduleName, Params) {
  const getErro = (name, type) => `${moduleName}: ${name} is a essential! and need to be a valid '${type}'.`
  mapx(Params,
    data => {
      const name  = path([0], keys(data))
      const param = path([name], data)
      const _type  = path(['t'], data) || path(['type'], data)
      const _func = essentialDict[_type]
      const func  = _func ? _func : path(['f'], data) || path(['func'], data)

      ifThrow(
        !isString(_type),
        essentialErro('type', 'string'))
      ifThrow(
        !isFunction(func),
        essentialErro('func', 'type function'))
      ifThrow(
        !func(param),
        getErro(name, _type))
    })
})
