const assert = require('assert')

import { type, isString, isNumber, isArray, isObject, isAOF, isNull, isUndefined, mapx, map, copy, hasProp, length } from '../src/main'

let test
const o = {a:3, b:2, c:1}
const list = {
  u:  undefined,
  n:  null,
  p:  'sdf',
  d:  1266,
  a:  [0, 1, 2],
  o:  o,
  do: {o: o, z: 123},
  f:  () => { oi = 1 }
}
list.f.a = 13

const expect = {
  u:  { type: 'undefined', copy: true,  has: { a: false, o: false }, len: -1 },
  n:  { type: 'null'     , copy: true,  has: { a: false, o: false }, len: -1 },
  p:  { type: 'string'   , copy: true,  has: { a: false, o: false }, len:  3 },
  d:  { type: 'number'   , copy: true,  has: { a: false, o: false }, len:  4 },
  a:  { type: 'array'    , copy: false, has: { a: false, o: false }, len:  3 },
  o:  { type: 'object'   , copy: false, has: { a: true,  o: false }, len:  3 },
  do: { type: 'object'   , copy: false, has: { a: false, o: true  }, len:  2 },
  f:  { type: 'function' , copy: false, has: { a: true,  o: false }, len:  1 }
}

const rollTest = (fx, test, param, comp) => (val, key) => {
  const x = fx(val, param)
  const res = comp
    ? comp(val, x)
    : x
  const exp = param
    ? expect[key][test][param]
    : expect[key][test]
  it(key, () => assert.equal(res, exp))
}

describe('type', () => {
  mapx(list, rollTest(type, 'type'))
})

describe('copy', () => {
  mapx(list, rollTest(copy, 'copy', false, (a,b)=>a===b))
})

describe('hasProp a', function() {
  mapx(list, rollTest(hasProp, 'has', 'a'))
})

describe('hasProp o', function() {
  mapx(list, rollTest(hasProp, 'has', 'o'))
})

describe('length', function() {
  mapx(list, rollTest(length, 'len'))
})
