import { curry } from './curry'

export const composeDown = curry(function (funcs, input) {
  return funcs.reduce(
      (obj, fx) => fx(obj), input)
})

export const compose = curry(function (funcs, input) {
  return funcs.reduceRight(
      (obj, fx) => fx(obj), input)
})
