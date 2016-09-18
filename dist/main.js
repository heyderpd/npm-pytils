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

var hasProp = function hasProp(obj, item) {
  if (obj !== null && obj !== undefined && item !== undefined) {
    if (obj[item] !== undefined) {
      return true;
    } else {
      return keys(obj).indexOf(item) >= 0 ? true : false;
    }
  } else {
    return false;
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
  switch (type(obj)) {
    case 'array':
    case 'object':
    case 'function':
      // Object.assign don't suport deep cloning!
      // is not the best way, I will improve it later
      return JSON.parse(JSON.stringify(obj));

    default:
      return Object.assign(obj);
  }
};

var length = function length(obj) {
  var _length = void 0;
  switch (type(obj)) {
    case 'object':
      _length = keys(obj).length;
      break;

    case 'null':
    case 'undefined':
      _length = -1;
      break;

    case 'number':
      obj = String(obj);
    case 'array':
    case 'function':
    default:
      _length = obj.length;
      break;
  }
  return _length;
};

var keys = function keys(obj) {
  var _type = type(obj);
  switch (_type) {
    case 'array':
    case 'object':
    case 'function':
      return Object.keys(obj);

    case 'null':
    case 'undefined':
      return [];

    case 'number':
      obj = String(obj);
    case 'string':
    default:
      return obj.split('');
  }
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
  hasProp: hasProp,
  each: each
};