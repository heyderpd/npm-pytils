'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/*!
 * pytils
 * Copyright (c) 2016 heyderpd <heyderpd@gmail.com>
 * ISC Licensed
*/

/* TYPE */

var type = exports.type = function type(obj) {
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
    var _type = path(['obj', 'constructor'], obj);
    if (_type === Object) {
      return 'object';
    }
    if (_type === Array) {
      return 'array';
    }
  }

  return _typeOf;
};

var isType = exports.isType = function isType(obj, _type) {
  return type(obj) === _type;
};

var isString = exports.isString = function isString(obj) {
  return isType(obj, 'string');
};

var isNumber = exports.isNumber = function isNumber(obj) {
  return isType(obj, 'number');
};

var isArray = exports.isArray = function isArray(obj) {
  return isType(obj, 'array');
};

var isObject = exports.isObject = function isObject(obj) {
  return isType(obj, 'object');
};

var isFunction = exports.isFunction = function isFunction(obj) {
  return isType(obj, 'function');
};

var isAOF = exports.isAOF = function isAOF(obj) {
  return ['array', 'object', 'function'].indexOf(type(obj)) >= 0;
};

var isNull = exports.isNull = function isNull(obj) {
  return isType(obj, 'null');
};

var isUndefined = exports.isUndefined = function isUndefined(obj) {
  return isType(obj, 'undefined');
};

/* TYPE */
/* RAMDA LIKE */

var compose = exports.compose = function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  return function (input) {
    return funcs.reverse().reduce(function (obj, fx) {
      return fx(obj);
    }, input);
  };
};

var curry = exports.curry = function curry(func) {
  return function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    if (args.length >= func.length) {
      return func.apply(undefined, args);
    }
    return function () {
      for (var _len3 = arguments.length, nextArgs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        nextArgs[_key3] = arguments[_key3];
      }

      return curry(func).apply(undefined, _toConsumableArray(args.concat(nextArgs)));
    };
  };
};

var path = exports.path = curry(function (path) {
  return function (obj) {
    return path.reduce(function (acc, item) {
      return acc !== null && acc !== undefined && (typeof acc === 'undefined' ? 'undefined' : _typeof(acc)) === 'object' ? acc[item] : undefined;
    }, obj);
  };
});

var map = exports.map = curry(function (func) {
  return function (list) {
    return isArray(list) ? list.map(func) : isObject(list) ? keys(list).map(function (key) {
      return func(list[key], key);
    }) : undefined;
  };
});

var reduce = exports.reduce = function reduce(func, obj) {
  return function (list) {
    return isArray(list) ? list.reduce(func, obj) : isObject(list) ? keys(list).reduce(function (obj, key) {
      return func(obj, list[key], key);
    }, obj) : undefined;
  };
};

var uniqWith = exports.uniqWith = function uniqWith(comparator, list) {
  var outputList = [];
  map(function (itemA) {
    var equals = map(function (itemB) {
      return comparator(itemA, itemB);
    })(outputList).filter(function (item) {
      return item;
    });

    equals && equals.length === 0 && outputList.push(itemA);
  })(list);
  return outputList;
};

var uniq = exports.uniq = function uniq(list) {
  return values(createObj(list));
};

var eq1True = exports.eq1True = function eq1True(list) {
  return isArray(list) && list.length === 1 && list[0] === true;
};

/* RAMDA LIKE */
/* PYTILS */

var arrayDiff = exports.arrayDiff = function arrayDiff(list, compare) {
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

var toObject = exports.toObject = function toObject(input) {
  if (isArray(input) && length(v) <= 0) {
    return {};
  }
  return input.reduce(function (obj, v, k) {
    obj[v] = copy(k);
    return obj;
  }, {});
};

var invertObj = exports.invertObj = function invertObj(input) {
  return reduce(function (obj, val, key) {
    obj[val] = key;
    return obj;
  }, {})(input);
};

var ojbFromVals = exports.ojbFromVals = function ojbFromVals(arrKeys) {
  return arrKeys.reduce(function (obj, val) {
    obj[val] = val;
    return obj;
  }, {});
};

var translate = exports.translate = curry(function (dictionary) {
  return function (original) {
    return reduce(function (obj, ori, des) {
      obj[des] = path([ori], original);
      return obj;
    }, {})(dictionary);
  };
});

var uniqObject = exports.uniqObject = function uniqObject(A, B) {
  return compose(eq1True, uniq, map(function (key) {
    return path([key], A) === path([key], B);
  }), keys)(A);
};

/* PYTILS */
/* OBJECT */

var _keys = function () {
  var has = path(['prototype', 'hasOwnProperty'], Object);
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

var keys = exports.keys = function keys(obj) {
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

var values = exports.values = function values(obj) {
  switch (type(obj)) {
    case 'number':
      return String(obj).split('').map(function (n) {
        return parseInt(n);
      });

    case 'string':
      return obj.split('');

    case 'object':
    case 'function':
      return map(obj, function (key) {
        return obj[key];
      });

    case 'array':
    case 'null':
    case 'undefined':
    default:
      return [];
  }
};

var _copy = function _copy(obj) {
  var R = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  if (R++ > 42) {
    throw "Limit recursive exceeded in pytils.copyObject";
  }

  if (isAOF(obj)) {
    var nObj = new obj.constructor();
    map(obj, function (v, k) {
      return nObj[k] = _copy(v, R);
    });
    return nObj;
  }

  return obj;
};

var copy = exports.copy = function copy(obj) {
  if (isAOF(obj)) {
    return _copy(obj);
  }
  return Object.assign(obj);
};

var hasProp = exports.hasProp = function hasProp(obj, item) {
  return isAOF(obj) ? keys(obj).indexOf(item) >= 0 : false;
};

var length = exports.length = function length(obj) {
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

/* OBJECT */
