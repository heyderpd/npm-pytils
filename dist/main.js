'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/*!
 * pytils
 * Copyright (c) 2016 heyderpd <heyderpd@gmail.com>
 * ISC Licensed
*/

var type = function type(obj) {
  var _typeOf = typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
  if (_typeOf === 'function') {
    return 'function';
  } else if (_typeOf === 'object') {
    if (obj === null) {
      return 'null';
    }
    var _type = obj && obj.constructor ? obj.constructor : undefined;
    if (_type === Object) {
      return _typeOf;
    } else {
      return _type === Array ? 'array' : _type;
    }
  } else {
    return _typeOf;
  }
};

var isType = function isType(obj, _type) {
  return type(obj) === _type;
};

var isString = function isString(obj) {
  return isType(obj, 'string');
};

var isNumber = function isNumber(obj) {
  return isType(obj, 'number');
};

var isArray = function isArray(obj) {
  return isType(obj, 'array');
};

var isObject = function isObject(obj) {
  return isType(obj, 'object');
};

var isNull = function isNull(obj) {
  return isType(obj, 'null');
};

var isUndefined = function isUndefined(obj) {
  return isType(obj, 'undefined');
};

var copy = function copy(obj) {
  return Object.assign(obj);
};

var length = function length(obj) {
  var _type = type(obj);
  if (_type === 'array' && obj.length !== undefined) {
    return obj.length;
  } else {
    if (_type === 'object' || _type === 'array') {
      return keys(obj).length;
    } else {
      return -1;
    }
  }
};

var keys = function keys(obj) {
  return Object.keys(obj);
};

var each = function each(obj, func) {
  return keys(obj).forEach(function (n) {
    return func(n, obj[n]);
  });
};

module.exports = {
  type: type,
  isType: isType,
  isString: isString,
  isNumber: isNumber,
  isArray: isArray,
  isObject: isObject,
  isNull: isNull,
  isUndefined: isUndefined,
  copy: copy,
  length: length,
  keys: keys,
  each: each
};