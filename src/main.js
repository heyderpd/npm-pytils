
/*!
 * pytils
 * Copyright (c) 2016 heyderpd <heyderpd@gmail.com>
 * ISC Licensed
*/

const copy = obj => Object.assign(obj)

const length = obj => getKeys(obj).length

const keys = obj => Object.keys(obj)

const each = (obj, func) => getKeys(obj).forEach(n => func(n, obj[n]))

module.exports = {
  copy,
  length,
  keys,
  each
}
