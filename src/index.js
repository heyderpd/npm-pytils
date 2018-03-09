import * as _answer      from './answer'
import * as _array       from './array'
import * as _compose     from './compose'
import * as _copy        from './copy'
import * as _curry       from './curry'
import * as _getArgs     from './get-args'
import * as _isEssential from './is-essential'
import * as _keys        from './keys'
import * as _length      from './length'
import * as _map         from './map'
import * as _object      from './object'
import * as _path        from './path'
import * as _reduce      from './reduce'
import * as _regex       from './regex'
import * as _type        from './type'
import * as _uniq        from './uniq'
import * as _values      from './values'

// _answer
export const answerToTheUniverse = _answer.answerToTheUniverse

// _array
export const empty = _array.empty
export const removeEmpty = _array.removeEmpty
export const remove = _array.remove
export const arrayDiff = _array.arrayDiff

// _compose
export const composeDown = _compose.composeDown
export const compose = _compose.compose

// _copy
export const shallowCopy = _copy.shallowCopy
export const deepCopy = _copy.deepCopy

// _curry
export const curry = _curry.curry

// _getArgs
export const getArgs = _getArgs.getArgs

// _isEssential
export const ifThrow = _isEssential.ifThrow
export const isEssential = _isEssential.isEssential

// _keys
export const keys = _keys.keys
export const hasProp = _keys.hasProp

// _length
export const length = _length.length

// _map
export const mapx = _map.mapx
export const map = _map.map

// _object
export const scopedObject = _object.scopedObject
export const toObject = _object.toObject
export const invertObj = _object.invertObj
export const ojbFromVals = _object.ojbFromVals
export const translate = _object.translate
export const uniqObject = _object.uniqObject

// _path
export const path = _path.path
export const pathOr = _path.pathOr

// _reduce
export const reduce = _reduce.reduce
export const reduceRight = _reduce.reduceRight

// _regex
export const toArray = _regex.toArray
export const unmountRegEx = _regex.unmountRegEx
export const reCompile = _regex.reCompile
export const ifMatch = _regex.ifMatch
export const whileMatch = _regex.whileMatch

// _type
export const type = _type.type
export const isType = _type.isType
export const isString = _type.isString
export const isNumber = _type.isNumber
export const isArray = _type.isArray
export const isObject = _type.isObject
export const isFunction = _type.isFunction
export const isAOF = _type.isAOF
export const isUN = _type.isUN
export const isNull = _type.isNull
export const isUndefined = _type.isUndefined

// _uniq
export const uniqWith = _uniq.uniqWith
export const uniq = _uniq.uniq

// _values
export const values = _values.values
export const hasValue = _values.hasValue
