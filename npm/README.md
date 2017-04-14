# pytils: functions utils like python
many functions that use to simplify my javascript and that the syntax is inspired by python and ramda

## I will help if you have any difficulty =)
Contact me by [github:heyderpd](https://github.com/heyderpd). I'll be glad to help you.

## Thanks for [npm~lucasmreis](https://www.npmjs.com/~lucasmreis)
```javascript
npm install --save pytils
```

## Example:
```terminal
const p = require('pytils')

p.compose  = function ( _arrayOfFunctions ) // return function waiting for input
p.curry    = function ( _function ) // return function waiting for input
p.prop     = function ( _arrProps, _object ) // return prop of _object in path or undefined

p.type     = function ( _object ) // return type of var in a string
p.isType   = function ( _object , _type_need) // return true or false
p.isString = function ( _object ) // return true or false
p.isNumber = function ( _object ) // return true or false
p.isArray  = function ( _object ) // return true or false
p.isObject = function ( _object ) // return true or false
p.isFunction = function ( _object ) // return true or false
p.isAOF = function ( _object ) // return true or false if is isArray OR isObject OR isFunction
p.isNull   = function ( _object ) // return true or false
p.isUndefined = function ( _object ) // return true or false

p.copy   = ( _object ) // copy any types
p.length = ( _object ) // get length of any type, return -1 if can't
p.keys   = ( _object ) // get keys of any type, return [] if can't
p.values   = ( _object ) // get values of any type, return [] if can't
p.hasProp = ( _object , prop ) // of any type, return true or false

p.fx = function( key, value ) { console.log('item: ', keys, ' = ', value) }
p.map   = ( _object , fx ) // do each of any type, pass to function var's (key, value)

p.toObject = ( _array ) // convert array to object, return object have values of array in keys of object
p.arrayDiff = ( _array base , _array compare ) // compare two array and return the diff values of base
```
