// requided's

const assert = require('assert')
const fs = require('fs')

const { type, isType, isString, isNumber, isArray, isObject, isNull, isUndefined, copy, length, keys, hasProp, each, eachVal } = require('../npm/index')


// start test

const o = {a:3, b:2, c:1}
const list = {
  u:  undefined,
  n:  null,
  p:  'sdf',
  d:  1266,
  a:  [0, 1, 2],
  o:  o,
  bo: {o: o, z: 123},
  f:  () => { oi = 1 }
}
list.f.a = 13

const ref = {
  u:  0,
  n:  1,
  p:  2,
  d:  3,
  a:  4,
  o:  5,
  bo: 6,
  f:  7
}

let test

const rollTest = function (test, fx, p2) {
  return function (key, item) {
    const p = ref[key]
    const t = test[p]
    const r = fx(item, p2)
    it( String(key) , function() {
      assert.deepEqual(r, t)
    })
  }
}

describe('each', function() {
  each(list, function (test, fx, p2) {
    return function (key, item) {
      const obj = list[key]
      it( String(key) , function() {
        assert.deepEqual(item, obj)
      })
    }
  }(test, x => x))
})

describe('eachVal', function() {
  eachVal(list, function (test, fx, p2) {
    return function (key, item) {
      const obj = list[key]
      it( String(key) , function() {
        assert.deepEqual(item, obj)
      })
    }
  }(test, x => x))
})

describe('type', function() {
  test = [ 'undefined', 'null', 'string', 'number', 'array', 'object', 'object', 'function' ]
  each(list, rollTest(test, type))
})

describe('length', function() {
  test = [ -1, -1, 3, 4, 3, 3, 2, 0 ]
  each(list, rollTest(test, length))
})

describe('keys', function() {
  test = [
    [],
    [],
    [ 's', 'd', 'f' ],
    [ '1', '2', '6', '6' ],
    [ '0', '1', '2' ],
    [ 'a', 'b', 'c' ],
    [ 'o', 'z' ],
    [ 'a' ]
  ]
  each(list, rollTest(test, keys))
})

describe('hasProp a', function() {
  test = [ false, false, false, false, false, true, false, true ]
  each(list, rollTest(test, hasProp, 'a'))
})

describe('hasProp o', function() {
  test = [ false, false, false, false, false, false, true, false ]
  each(list, rollTest(test, hasProp, 'o'))
})

describe('copy', function() {
  let bo2 = copy(list.bo)
  it('bo.o.b', function() {
    assert.deepEqual(list.bo.o.b, bo2.o.b)
    bo2.o.b = 22
    assert.deepEqual(list.bo.o.b, 2)
    assert.deepEqual(bo2.o.b, 22)
  })
})
