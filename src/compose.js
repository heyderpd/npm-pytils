import { curry } from './curry'
import { reduce, reduceRight } from './reduce'

const composePass = (obj, fx) => fx(obj)

export const composeDown = curry(function (funcs, input) {
  return reduce(funcs, composePass, input)
})

export const compose = curry(function (funcs, input) {
  return reduceRight(funcs, composePass, input)
})
