"use strict";

/*!
 * pytils
 * Copyright (c) 2016 heyderpd <heyderpd@gmail.com>
 * ISC Licensed
*/

var copy = function copy(obj) {
  return Object.assign(obj);
};

var length = function length(obj) {
  return getKeys(obj).length;
};

var keys = function keys(obj) {
  return Object.keys(obj);
};

var each = function each(obj, func) {
  return getKeys(obj).forEach(function (n) {
    return func(n, obj[n]);
  });
};

module.exports = {
  copy: copy,
  length: length,
  keys: keys,
  each: each
};