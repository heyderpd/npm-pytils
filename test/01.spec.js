const assert = require('assert')

import { type, isString, isNumber, isArray, isObject, isAOF, isNull, isUndefined, mapx, map, copy, hasProp } from '../src/main'

let test
const o = {a:3, b:2, c:1}
const list = {
  u:  { v: undefined,        t: 'undefined' },
  n:  { v: null,             t: 'null'      },
  p:  { v: 'sdf',            t: 'string'    },
  d:  { v: 1266,             t: 'number'    },
  a:  { v: [0, 1, 2],        t: 'array'     },
  o:  { v: o,                t: 'object'    },
  do: { v: {o: o, z: 123},   t: 'object'    },
  f:  { v: () => { oi = 1 }, t: 'function'  }
}
list.f.v.a = 13

const rollTest = (fx, param) => (val, key) => {
  const { v, t } = val
  const exp = test[key]
  const res = fx(v, param)
  it(String(key), () => assert.deepEqual(res, exp))
}

describe('type\'s', () => {
  mapx(
    list, (val, key) => {
      const { v, t } = val
      it(String(key), () => assert.deepEqual(t, type(v)))
    })
})

describe('copy', () => {
  map(
    (val, key) => {
      const { v, t } = val
      const _v = v
      const clone = copy(v)
      if (isAOF(v)) {
        it(String(key), () => assert.equal(true, clone !== v && _v === v ))
      } else {
        it(String(key), () => assert.equal(true, clone === v ))
      }
    }, list)
})

describe('hasProp a', function() {
  test = { u: false, n: false, p: false, d: false, a: false, o: true, do: false, f:  true }
  mapx(list, rollTest(hasProp, 'a'))
})

describe('hasProp o', function() {
  test = { u: false, n: false, p: false, d: false, a: false, o: false, do: true, f:  false }
  mapx(list, rollTest(hasProp, 'o'))
})
