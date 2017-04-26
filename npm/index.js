'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * pytils
 * Copyright (c) 2016 heyderpd <heyderpd@gmail.com>
 * ISC Licensed
*/

var compose = function compose() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return function (input) {
    return args.reduce(function (obj, func) {
      return func(obj);
    }, input);
  };
};

var curry = function curry(func) {
  return function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    if (args.length >= func.length) {
      return func.apply(undefined, args);
    }
    var store = args;
    return function () {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return curry(func).apply(undefined, [].concat(store, args));
    };
  };
};

var pureProp = function pureProp(props, obj) {
  return keys(props).reduce(function (obj, prop) {
    return hasProp(obj, prop) ? obj[prop] : undefined;
  });
};

var prop = curry(pureProp);

var type = function type(obj) {
  if (obj === null) {
    return 'null';
  }
  if (obj === undefined) {
    return 'undefined';
  }

  var _typeOf = typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
  if (_typeOf === 'function') {
    return 'function';
  }

  if (_typeOf === 'object') {
    var _type = prop(['obj', 'constructor'], obj);
    if (_type === Object) {
      return 'object';
    }
    if (_type === Array) {
      return 'array';
    }
  }

  return _typeOf;
};

var hasProp = function hasProp(obj, item) {
  return isAOF(obj) ? keys(obj).indexOf(item) >= 0 : false;
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

var isFunction = function isFunction(obj) {
  return isType(obj, 'function');
};

var isAOF = function isAOF(obj) {
  return ['array', 'object', 'function'].indexOf(type(obj)) >= 0;
};

var isNull = function isNull(obj) {
  return isType(obj, 'null');
};

var isUndefined = function isUndefined(obj) {
  return isType(obj, 'undefined');
};

var copy = function copy(obj) {
  if (isAOF(obj)) {
    return copyObject(obj);
  }
  return Object.assign(obj);
};

var copyObject = function copyObject(obj) {
  var R = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  if (R++ > 42) {
    throw "Limit recursive exceeded in pytils.copyObject";
  }

  if (isAOF(obj)) {
    var nObj = new obj.constructor();
    map(obj, function (v, k) {
      return nObj[k] = copyObject(v, R);
    });
    return nObj;
  }

  return obj;
};

var length = function length(obj) {
  switch (type(obj)) {
    case 'number':
    case 'object':
      return keys(obj).length;

    case 'string':
    case 'array':
    case 'function':
      return obj.length;

    case 'null':
    case 'undefined':
    default:
      return -1;
  }
};

var _keys = function () {
  var has = prop(['prototype', 'hasOwnProperty'], Object);
  if (!isFunction(has)) {
    throw "Cant't get Object.prototype.hasOwnProperty";
  }

  return function (obj) {
    if (isAOF(obj)) {
      var props = [];
      for (var p in obj) {
        props.push(p);
      }
      return props.filter(function (p) {
        return has.call(obj, p);
      });
    }
    return [];
  };
}();

var keys = function keys(obj) {
  switch (type(obj)) {
    case 'number':
      obj = String(obj);

    case 'string':
      obj = obj.split('');

    case 'array':
    case 'object':
    case 'function':
      return _keys(obj);

    case 'null':
    case 'undefined':
    default:
      return [];
  }
};

var values = function values(obj) {
  switch (type(obj)) {
    case 'number':
      return String(obj).split('').map(function (n) {
        return parseInt(n);
      });

    case 'string':
      return obj.split('');

    case 'object':
    case 'function':
      return map(obj, function (k) {
        return obj[k];
      });

    case 'array':
    case 'null':
    case 'undefined':
    default:
      return [];
  }
};

var toObject = function toObject(input) {
  if (isArray(input) && length(v) <= 0) {
    return {};
  }

  return copy(input).reduce(function (obj, v, k) {
    obj[v] = k;
    return obj;
  }, {});
};

var arrayDiff = function arrayDiff(list, compare) {
  if (length(compare) <= 0) {
    return copy(list);
  }
  if (length(list) <= 0) {
    return copy(compare);
  }
  var obj = toObject(list);
  compare.map(function (k) {
    return delete obj[k];
  });
  return keys(obj);
};

var map = function map(obj, func) {
  return keys(obj).map(function (k) {
    return func(obj[k], k, obj);
  });
};

module.exports = {
  compose: compose,
  curry: curry,
  prop: prop,
  type: type,
  isType: isType,
  isString: isString,
  isNumber: isNumber,
  isArray: isArray,
  isObject: isObject,
  isFunction: isFunction,
  isAOF: isAOF,
  isNull: isNull,
  isUndefined: isUndefined,
  copy: copy,
  length: length,
  keys: keys,
  values: values,
  hasProp: hasProp,
  map: map,
  toObject: toObject,
  arrayDiff: arrayDiff
};
